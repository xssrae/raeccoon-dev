import { useEffect } from 'react'
import { BriefcaseBusiness, ArrowRight, FolderGit2 } from 'lucide-react'
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
        'Produtos e experimentos que transformam desafios de arquitetura em experiências úteis.',
      empty: 'Adicione seus projetos em src/data/projects/pt.ts',
      technologies: 'Tecnologias',
    },
    en: {
      label: '/PROJECTS',
      title: 'Projects',
      description:
        'Products and experiments that turn architecture challenges into useful experiences.',
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, projectIndex) => (
              <Link
                key={`${project.description}-${projectIndex}`}
                to={`/projects/${project.index ?? projectIndex}`}
                className="ui-surface ui-surface--project group flex min-h-full flex-col overflow-hidden"
              >
                <div className="project-cover relative aspect-[16/9] overflow-hidden border-b border-black/10 dark:border-white/10">
                  {project.image ? (
                    <img
                      src={project.image.src}
                      alt={project.image.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                      <FolderGit2 className="h-10 w-10 opacity-50" strokeWidth={1.4} />
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full border border-black/10 bg-[var(--bg-color)]/90 px-3 py-1 font-mono text-[0.65rem] tracking-widest text-[var(--text-color)] backdrop-blur dark:border-white/10 dark:bg-[var(--dark-bg-color)]/90 dark:text-[var(--dark-text-color)]">
                    #{String(projectIndex + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <h2 className="flex items-center justify-between gap-3 font-mono text-2xl font-bold text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                    {project.title}
                    <ArrowRight size={20} className="shrink-0 opacity-50 transition-all group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100" />
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-color)] opacity-75 dark:text-[var(--dark-text-color)]">
                    {project.description}
                  </p>

                  {project.technologies.length > 0 && (
                    <div className="mt-auto pt-6">
                      <p className="sr-only">{currentTexts.technologies}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((technology) => (
                          <span
                            key={technology}
                            className="text-xs font-mono border border-black/15 dark:border-white/15 rounded-full px-3 py-1.5 opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)] bg-transparent"
                          >
                            {technology}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-1 py-1.5 font-mono text-xs opacity-60">
                            +{project.technologies.length - 4}
                          </span>
                        )}
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
