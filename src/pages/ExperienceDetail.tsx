import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Check, ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { useLanguage } from '@/context/LanguageContext'
import { jobs_pt } from '@/data/jobs/pt'
import { jobs_eng } from '@/data/jobs/eng'

export default function ExperienceDetail() {
  const { lang } = useLanguage()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pageTexts = {
    pt: {
      back: 'Voltar',
      challenges: 'Desafios',
      features: 'Funcionalidades',
      impact: 'Impacto',
      technologies: 'Tecnologias',
    },
    en: {
      back: 'Back',
      challenges: 'Challenges',
      features: 'Features',
      impact: 'Impact',
      technologies: 'Technologies',
    },
  }

  const currentTexts = pageTexts[lang]
  const jobs = lang === 'pt' ? jobs_pt : jobs_eng
  const jobIndex = parseInt(id || '0')
  const job = jobs[jobIndex]

  if (!job) {
    return (
      <main className="relative min-h-screen px-6 lg:px-10 pt-32 pb-16 w-full max-w-5xl mx-auto">
        <Link
          to="/experience"
          className="inline-flex items-center gap-2 text-sm font-mono opacity-60 text-[var(--text-color)] dark:text-[var(--dark-text-color)] hover:opacity-100 transition-opacity mb-8"
        >
          <ArrowLeft size={16} />
          {currentTexts.back}
        </Link>
        <p className="font-mono text-base opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
          Experience not found
        </p>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen px-6 lg:px-10 pt-32 pb-16 w-full max-w-5xl mx-auto">
      <FadeIn>
        <Link
          to="/experience"
          className="inline-flex items-center gap-2 text-sm font-mono opacity-60 text-[var(--text-color)] dark:text-[var(--dark-text-color)] hover:opacity-100 transition-opacity mb-8"
        >
          <ArrowLeft size={16} />
          {currentTexts.back}
        </Link>

        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-4">
              {job.role}
            </h1>
            <p className="text-2xl opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-6">
              {job.company}
            </p>
            
            <div className="flex flex-wrap gap-6 font-mono text-sm opacity-60 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <span>{job.startDate} - {job.endDate || (lang === 'pt' ? 'Atualmente' : 'Currently')}</span>
              </div>
              {job.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{job.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="font-mono text-sm">
            <p className="opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)] leading-relaxed max-w-4xl">
              {job.description}
            </p>
          </div>

          {/* Impact */}
          {job.impact && (
            <div className="font-mono text-sm">
              <span className="opacity-50">// {currentTexts.impact}:</span>
              <p className="mt-2 opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                {job.impact}
              </p>
            </div>
          )}

          {/* Technologies */}
          {job.technologies.length > 0 && (
            <div className="font-mono text-sm">
              <span className="opacity-50">{job.technologies.join('')}</span>
            </div>
          )}

          {/* Challenges */}
          {job.challenges && job.challenges.length > 0 && (
            <div className="font-mono text-sm">
              <span className="opacity-50">// {currentTexts.challenges}</span>
              <ul className="mt-3 space-y-2">
                {job.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2 opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                    <ArrowRight size={14} className="mt-1 shrink-0" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Features */}
          {job.features && job.features.length > 0 && (
            <div className="font-mono text-sm">
              <span className="opacity-50">// {currentTexts.features}</span>
              <ul className="mt-3 space-y-2">
                {job.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                    <Check size={14} className="mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </FadeIn>
    </main>
  )
}