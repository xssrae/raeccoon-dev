import { useEffect } from 'react'
import { BriefcaseBusiness, ArrowRight } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { useLanguage } from '@/context/LanguageContext'
import { projects_pt } from '@/data/projects/pt'
import { projects_eng } from '@/data/projects/eng'
import { Link } from 'react-router-dom'

export default function Projects() {
  const { lang } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pageTexts = {
    pt: {
      label: '/PROJETOS',
      title: 'Projetos',
      description:
        'Um recorte da minha trajetória profissional, com responsabilidades e tecnologias que usei no caminho.',
      empty: 'Adicione seus projetos em src/data/projects/pt.ts',
      technologies: 'Tecnologias',
    },
    en: {
      label: '/PROJECTS',
      title: 'Projects',
      description:
        'A quick look at my professional path, responsibilities, and technologies used along the way.',
      empty: 'Add your project entries in src/data/projects/eng.ts',
      technologies: 'Technologies',
    },
  }

  const currentTexts = pageTexts[lang]
  const projects = lang === 'pt' ? projects_pt : projects_eng

  return (
    <main className="relative min-h-screen px-6 lg:px-10 pt-32 pb-16 w-full max-w-5xl mx-auto">
      <FadeIn>
        <div className="mb-12">
          <p className="text-sm font-mono opacity-50 text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-2 uppercase tracking-wider">
            {currentTexts.label}
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-4">
            {currentTexts.title}
          </h1>
          <p className="text-lg opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)] max-w-2xl leading-relaxed">
            {currentTexts.description}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        {projects.length > 0 ? (
          <div className="flex flex-col gap-4">
            {projects.map((project, projectIndex) => (
              <Link
                key={`${project.description}-${projectIndex}`}
                to={`/projects/${project.index ?? projectIndex}`}
                className="ui-surface group grid grid-cols-1 gap-6 p-6 lg:grid-cols-[220px_1fr] lg:gap-10 lg:p-8"
              >
                <div className="hidden lg:block" aria-hidden="true" />

                <div>
                  <p className="text-xs font-mono opacity-40 text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-2">
                    #{String(projectIndex + 1).padStart(2, '0')}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)] flex items-center gap-2">
                    {project.title}
                    <ArrowRight size={20} className="-translate-x-2 text-neutral-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
                  </h2>
                  <p className="mt-5 text-base md:text-lg leading-relaxed opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)] max-w-3xl">
                    {project.summary}
                  </p>

                  {project.technologies.length > 0 && (
                    <div className="mt-6">
                      <p className="sr-only">{currentTexts.technologies}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="text-xs font-mono border border-black/15 dark:border-white/15 rounded-full px-3 py-1.5 opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)] bg-transparent"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-6 border-t border-black/10 dark:border-white/10">
            <BriefcaseBusiness size={32} className="opacity-40 mb-4 text-[var(--text-color)] dark:text-[var(--dark-text-color)]" />
            <p className="font-mono text-base opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
              $ {currentTexts.empty}
            </p>
          </div>
        )}
      </FadeIn>
    </main>
  )
}
