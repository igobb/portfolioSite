import { describe, expect, it } from 'vitest'
import { hashIp } from './hash-ip'

const SECRET = 'test-secret'

describe('hashIp', () => {
  it('gives the same IP the same hash without revealing the IP', () => {
    const hash = hashIp('83.12.34.56', SECRET)

    expect(hash).toBe(hashIp('83.12.34.56', SECRET))
    expect(hash).not.toBe(hashIp('83.12.34.57', SECRET))
    expect(hash).toMatch(/^[0-9a-f]{64}$/)
  })

  it('depends on the secret', () => {
    expect(hashIp('83.12.34.56', SECRET)).not.toBe(
      hashIp('83.12.34.56', 'another-secret'),
    )
  })

  it('gives every IPv6 address in one /64 network the same hash', () => {
    const hash = hashIp('2001:db8:1:2::1', SECRET)

    expect(hashIp('2001:db8:1:2::99', SECRET)).toBe(hash)
    expect(hashIp('2001:db8:1:3::1', SECRET)).not.toBe(hash)
  })

  it.each(['2001:db8::2', '2001:DB8:0:0::99', '2001:0db8:0000:0000:1::1'])(
    'treats %s as the same /64 network as 2001:db8::1',
    (ip) => {
      expect(hashIp(ip, SECRET)).toBe(hashIp('2001:db8::1', SECRET))
    },
  )

  it('treats an IPv4 address written as IPv6 as the IPv4 address', () => {
    expect(hashIp('::ffff:83.12.34.56', SECRET)).toBe(
      hashIp('83.12.34.56', SECRET),
    )
  })
})
