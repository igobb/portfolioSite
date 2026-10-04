'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CONTACT_FORM_FIELDS,
  contactMessageSchema,
  isContactFieldError,
  MESSAGE_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  NAME_MAX_LENGTH,
  type ContactFormField,
  type ContactFormValues,
} from '../contact-message-schema'
import { sendContactMessage } from '../send-contact-message'
import { FormField } from './components/FormField'

type SubmitStatus = 'idle' | 'sent' | 'failed' | 'rate-limited'

export function ContactForm() {
  const t = useTranslations('Contact')

  const locale = useLocale()

  const [status, setStatus] = useState<SubmitStatus>('idle')

  const sentRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      website: '',
      startedAt: 0,
    },
  })

  useEffect(() => {
    setValue('startedAt', Date.now())
  }, [setValue])

  useEffect(() => {
    if (status === 'sent') sentRef.current?.focus()
  }, [status])

  const send = handleSubmit(async (values) => {
    try {
      const result = await sendContactMessage(values, locale)

      if (result.status !== 'invalid') {
        setStatus(result.status)

        return
      }

      const invalidFields = CONTACT_FORM_FIELDS.filter(
        (field) => result.fieldErrors[field],
      )

      invalidFields.forEach((field) =>
        setError(field, { message: result.fieldErrors[field] }),
      )

      setStatus(invalidFields.length > 0 ? 'idle' : 'failed')
    } catch {
      setStatus('failed')
    }
  })

  const errorText = (field: ContactFormField) => {
    const key = errors[field]?.message

    return isContactFieldError(key)
      ? t(`errors.${key}`, {
          nameMax: NAME_MAX_LENGTH,
          min: MESSAGE_MIN_LENGTH,
          max: MESSAGE_MAX_LENGTH,
        })
      : undefined
  }

  if (status === 'sent') {
    return (
      <div
        ref={sentRef}
        role="status"
        tabIndex={-1}
        className="flex flex-col gap-3 border-[1.5px] border-panel-ink p-6 xl:mt-10"
      >
        <p className="text-lg font-bold">{t('sentTitle')}</p>

        <p className="text-[15px]">{t('sent')}</p>
      </div>
    )
  }

  const hasFailed = status === 'failed'

  const isRateLimited = status === 'rate-limited'

  const statusText = isSubmitting
    ? null
    : hasFailed
      ? t('failed')
      : isRateLimited
        ? t('rateLimited')
        : null

  const buttonLabel = isSubmitting
    ? t('sending')
    : hasFailed
      ? t('retry')
      : `${t('send')} →`

  return (
    <form
      noValidate
      onSubmit={(event) => {
        if (isSubmitting) {
          event.preventDefault()
          return
        }

        send(event)
      }}
      aria-busy={isSubmitting}
      className="mt-6 flex flex-col gap-3.5 xl:mt-0 xl:gap-[18px] xl:pt-10"
    >
      <p className="text-sm text-panel-muted xl:text-[15px]">
        {t('formIntro')}
      </p>

      <FormField
        label={t('name')}
        error={errorText('name')}
        registration={register('name')}
        type="text"
        autoComplete="name"
      />

      <FormField
        label={t('email')}
        error={errorText('email')}
        registration={register('email')}
        type="email"
        autoComplete="email"
      />

      <FormField
        label={t('message')}
        error={errorText('message')}
        registration={register('message')}
        multiline
      />

      <div
        aria-hidden
        className="absolute -left-[9999px] size-px overflow-hidden"
      >
        <label>
          {t('website')}

          <input
            {...register('website')}
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <p role="status" className="text-sm font-bold">
        {statusText}
      </p>

      {isRateLimited ? null : (
        <button
          type="submit"
          aria-disabled={isSubmitting}
          className={`h-[52px] bg-accent px-[26px] text-[15px] font-bold text-white xl:self-start ${
            isSubmitting ? 'cursor-wait' : ''
          }`}
        >
          {buttonLabel}
        </button>
      )}
    </form>
  )
}
