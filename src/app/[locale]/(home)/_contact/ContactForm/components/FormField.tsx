import { useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

type FormFieldProps = {
  label: string
  error?: string
  registration: UseFormRegisterReturn
} & (
  | { multiline: true }
  | { multiline?: false; type: 'text' | 'email'; autoComplete: string }
)

const CONTROL =
  'border-[1.5px] border-panel-ink bg-transparent px-3.5 text-base aria-invalid:border-dashed'

export function FormField({
  label,
  error,
  registration,
  ...control
}: FormFieldProps) {
  const errorId = useId()

  const errorProps = {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  }

  return (
    <div className="flex flex-col gap-1.5 xl:gap-2">
      <label className="flex flex-col gap-1.5 text-[13px] xl:gap-2 xl:text-sm">
        {label}

        {control.multiline ? (
          <textarea
            {...registration}
            {...errorProps}
            rows={5}
            className={`${CONTROL} resize-none py-2.5 xl:py-3`}
          />
        ) : (
          <input
            {...registration}
            {...errorProps}
            type={control.type}
            autoComplete={control.autoComplete}
            className={`${CONTROL} h-12`}
          />
        )}
      </label>

      {error && (
        <p id={errorId} className="text-[13px] font-bold xl:text-sm">
          <span aria-hidden>! </span>
          {error}
        </p>
      )}
    </div>
  )
}
