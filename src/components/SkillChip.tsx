import type { ComponentProps } from 'react'
import { Link } from '@/i18n/navigation'

const CHIP =
  'inline-flex h-10 shrink-0 items-center border-[1.5px] px-3 text-[13px] xl:h-9'
const IDLE = 'border-line hover:border-ink'
const PRESSED = 'border-ink bg-ink text-paper'

type SkillChipProps = { skill: string } & (
  | { href: ComponentProps<typeof Link>['href'] }
  | { pressed: boolean; onClick: () => void }
)

export function SkillChip(props: SkillChipProps) {
  if ('href' in props) {
    return (
      <Link href={props.href} className={`${CHIP} ${IDLE}`}>
        {props.skill}
      </Link>
    )
  }

  const { skill, pressed, onClick } = props

  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`${CHIP} ${pressed ? PRESSED : IDLE}`}
    >
      {pressed && <span aria-hidden>✓&nbsp;</span>}
      {skill}
    </button>
  )
}
