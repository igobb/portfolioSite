import { useTranslations } from 'next-intl'
import { SkillChip } from '@/components/SkillChip'

type SkillFilterProps = {
  skills: string[]
  selectedSkills: string[]
  onToggle: (skill: string) => void
  onClear: () => void
}

export function SkillFilter({
  skills,
  selectedSkills,
  onToggle,
  onClear,
}: SkillFilterProps) {
  const t = useTranslations('ProjectsPage')

  return (
    <div
      role="group"
      aria-labelledby="skill-filter-label"
      data-testid="skill-filter"
      className="mt-6 flex flex-col gap-3 border-y-[1.5px] border-ink py-4 xl:mt-10 xl:gap-3.5 xl:py-6"
    >
      <div className="flex min-h-6 items-center justify-between px-4 text-[13px] xl:px-0 xl:text-sm">
        <span id="skill-filter-label" className="text-muted">
          {t('filterLabel')}
        </span>

        {selectedSkills.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="font-bold underline underline-offset-4"
          >
            {t('clearFilter')} <span aria-hidden>×</span>
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 whitespace-nowrap xl:flex-wrap xl:px-0">
        {skills.map((skill) => (
          <SkillChip
            key={skill}
            skill={skill}
            pressed={selectedSkills.includes(skill)}
            onClick={() => onToggle(skill)}
          />
        ))}
      </div>
    </div>
  )
}
