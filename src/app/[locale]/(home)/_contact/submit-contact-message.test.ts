import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  submitContactMessage,
  type StoredContactMessage,
  type SubmitDependencies,
} from './submit-contact-message'

const NOW = new Date('2026-10-04T12:00:00Z')

const secondsBefore = (date: Date, seconds: number) =>
  new Date(date.getTime() - seconds * 1000)

const sender = { ipHash: 'hash-a', locale: 'pl' } as const

const validInput = () => ({
  name: 'Anna Nowak',
  email: 'anna@example.com',
  message: 'Hello, I would like to talk about a role.',
  website: '',
  startedAt: secondsBefore(NOW, 60).getTime(),
})

type EarlierMessage = { ipHash: string; minutesAgo: number }

const earlier = (count: number, message: EarlierMessage) =>
  Array.from({ length: count }, () => message)

function fakeDependencies(history: EarlierMessage[] = []) {
  const saved: { message: StoredContactMessage; createdAt: Date }[] = []
  const notified: StoredContactMessage[] = []

  const sentAt = history.map(({ ipHash, minutesAgo }) => ({
    ipHash,
    createdAt: secondsBefore(NOW, minutesAgo * 60),
  }))

  const deps: SubmitDependencies = {
    store: {
      save: async (message) => {
        saved.push({ message, createdAt: NOW })
        sentAt.push({ ipHash: message.ipHash, createdAt: NOW })
      },
    },
    rateLimiter: {
      countSince: async (ipHash, since) =>
        sentAt.filter(
          (sent) => sent.ipHash === ipHash && sent.createdAt > since,
        ).length,
    },
    notifier: {
      notify: async (message) => {
        notified.push(message)
      },
    },
    now: () => NOW,
  }

  const savedMessages = () => saved.map(({ message }) => message)

  return { deps, savedMessages, notified }
}

describe('submitContactMessage', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('stores a valid Contact message and notifies the owner', async () => {
    const { deps, savedMessages, notified } = fakeDependencies()

    const result = await submitContactMessage(validInput(), sender, deps)

    const expected: StoredContactMessage = {
      name: 'Anna Nowak',
      email: 'anna@example.com',
      message: 'Hello, I would like to talk about a role.',
      locale: 'pl',
      ipHash: 'hash-a',
    }

    expect(result).toEqual({ status: 'sent' })
    expect(savedMessages()).toEqual([expected])
    expect(notified).toEqual([expected])
  })

  it('returns field errors for invalid input and stores nothing', async () => {
    const { deps, savedMessages, notified } = fakeDependencies()

    const result = await submitContactMessage(
      { ...validInput(), email: '', message: 'Hi' },
      sender,
      deps,
    )

    expect(result).toEqual({
      status: 'invalid',
      fieldErrors: { email: 'emailRequired', message: 'messageTooShort' },
    })
    expect(savedMessages()).toEqual([])
    expect(notified).toEqual([])
  })

  it('silently drops a submission with the honeypot filled in', async () => {
    const { deps, savedMessages, notified } = fakeDependencies()

    const result = await submitContactMessage(
      { ...validInput(), website: 'https://spam.example' },
      sender,
      deps,
    )

    expect(result).toEqual({ status: 'sent' })
    expect(savedMessages()).toEqual([])
    expect(notified).toEqual([])
  })

  it.each([
    ['1 second before sending', secondsBefore(NOW, 1)],
    ['in the future', secondsBefore(NOW, -3600)],
  ])('silently drops a form started %s', async (_, startedAt) => {
    const { deps, savedMessages, notified } = fakeDependencies()

    const result = await submitContactMessage(
      { ...validInput(), startedAt: startedAt.getTime() },
      sender,
      deps,
    )

    expect(result).toEqual({ status: 'sent' })
    expect(savedMessages()).toEqual([])
    expect(notified).toEqual([])
  })

  it('accepts a form started exactly the minimum fill time ago', async () => {
    const { deps, savedMessages } = fakeDependencies()

    await submitContactMessage(
      { ...validInput(), startedAt: secondsBefore(NOW, 3).getTime() },
      sender,
      deps,
    )

    expect(savedMessages()).toHaveLength(1)
  })

  it('rejects a sender with 3 messages in the last 10 minutes', async () => {
    const { deps, savedMessages, notified } = fakeDependencies(
      earlier(3, { ipHash: 'hash-a', minutesAgo: 5 }),
    )

    const result = await submitContactMessage(validInput(), sender, deps)

    expect(result).toEqual({ status: 'rate-limited' })
    expect(savedMessages()).toEqual([])
    expect(notified).toEqual([])
  })

  it('counts only the sender’s own messages from the last 10 minutes', async () => {
    const { deps, savedMessages } = fakeDependencies([
      ...earlier(2, { ipHash: 'hash-a', minutesAgo: 5 }),
      ...earlier(4, { ipHash: 'hash-a', minutesAgo: 15 }),
      ...earlier(3, { ipHash: 'hash-b', minutesAgo: 1 }),
    ])

    const result = await submitContactMessage(validInput(), sender, deps)

    expect(result).toEqual({ status: 'sent' })
    expect(savedMessages()).toHaveLength(1)
  })

  it('reports a failure and sends no notification when storing fails', async () => {
    const { deps, notified } = fakeDependencies()

    deps.store.save = async () => {
      throw new Error('Database is down')
    }

    const result = await submitContactMessage(validInput(), sender, deps)

    expect(result).toEqual({ status: 'failed' })
    expect(notified).toEqual([])
    expect(console.error).toHaveBeenCalled()
  })

  it('reports a failure and stores nothing when the rate limit check fails', async () => {
    const { deps, savedMessages, notified } = fakeDependencies()

    deps.rateLimiter.countSince = async () => {
      throw new Error('Database is down')
    }

    const result = await submitContactMessage(validInput(), sender, deps)

    expect(result).toEqual({ status: 'failed' })
    expect(savedMessages()).toEqual([])
    expect(notified).toEqual([])
    expect(console.error).toHaveBeenCalled()
  })

  it('keeps the stored message and reports the error when notifying fails', async () => {
    const { deps, savedMessages } = fakeDependencies()

    deps.notifier.notify = async () => {
      throw new Error('Resend is down')
    }

    const result = await submitContactMessage(validInput(), sender, deps)

    expect(result).toEqual({ status: 'stored-not-notified' })
    expect(savedMessages()).toHaveLength(1)
    expect(console.error).toHaveBeenCalled()
  })
})
