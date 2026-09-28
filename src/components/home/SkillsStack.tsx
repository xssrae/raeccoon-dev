import {
  BrainCircuit,
  Cloud,
  Code2,
  CodeXml,
  Orbit,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import type { SkillGroupKey } from '@/data/profile'

interface SkillsStackProps {
  groups: Record<SkillGroupKey, string[]>
  labels: Record<SkillGroupKey, string>
  emptyMessage: string
}

const groupIcons: Record<SkillGroupKey, LucideIcon> = {
  languagesAndFrameworks: CodeXml,
  cloudAndStorage: Cloud,
  transformationAndOrchestration: Workflow,
  ai: BrainCircuit,
  alsoUse: Orbit,
}

const groupOrder: SkillGroupKey[] = [
  'languagesAndFrameworks',
  'cloudAndStorage',
  'transformationAndOrchestration',
  'ai',
  'alsoUse',
]

export default function SkillsStack({ groups, labels, emptyMessage }: SkillsStackProps) {
  const visibleGroups = groupOrder
    .map((groupKey) => [groupKey, groups[groupKey]] as const)
    .filter(([, skillItems]) => skillItems.length > 0)

  if (visibleGroups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border-t border-black/10 px-6 py-16 dark:border-white/10">
        <Code2 size={32} className="mb-4 opacity-40 text-[var(--text-color)] dark:text-[var(--dark-text-color)]" />
        <p className="font-mono text-base opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
          $ {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-w-0 flex-col gap-4">
      {visibleGroups.map(([groupKey, skillItems], groupIndex) => {
        const GroupIcon = groupIcons[groupKey]

        return (
          <article
            key={groupKey}
            className="skill-card ui-surface ui-surface--skills grid min-w-0 gap-5 p-5 md:grid-cols-[minmax(13rem,0.42fr)_minmax(0,1fr)] md:items-center lg:grid-cols-[minmax(15rem,0.42fr)_minmax(0,1fr)]"
          >
            <header className="relative flex min-w-0 items-center gap-3 pr-8 text-left">
              <span className="skill-card-icon grid size-10 shrink-0 place-items-center rounded-xl border border-black/10 bg-black/5 text-[var(--text-color)] dark:border-white/10 dark:bg-white/5 dark:text-[var(--dark-text-color)]">
                <GroupIcon size={19} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="min-w-0 text-sm font-semibold uppercase leading-snug tracking-[0.11em] text-[var(--text-color)] dark:text-[var(--dark-text-color)] sm:text-base">
                {labels[groupKey]}
              </h3>
              <span className="absolute right-0 top-0 shrink-0 font-mono text-xs opacity-35 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                {String(groupIndex + 1).padStart(2, '0')}
              </span>
            </header>

            <ul className="flex min-w-0 flex-wrap gap-2">
              {skillItems.map((skillName) => (
                <li
                  key={skillName}
                  className="skill-item flex min-h-10 min-w-0 items-center justify-center rounded-xl border border-black/10 bg-white/20 px-4 py-2 text-center dark:border-white/10 dark:bg-black/10"
                >
                  <span className="min-w-0 text-center text-sm leading-snug text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                    {skillName}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        )
      })}
    </div>
  )
}
