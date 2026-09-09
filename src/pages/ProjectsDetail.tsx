import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Check, ArrowRight, ExternalLink, GitFork } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { useLanguage } from '@/context/LanguageContext'
import { projects_pt } from '@/data/projects/pt'
import { projects_eng } from '@/data/projects/eng'

export default function ProjectsDetail() {
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
      repository: 'Ver repositório',
      notFound: 'Projeto não encontrado',
    },
    en: {
      back: 'Back',
      challenges: 'Challenges',
      features: 'Features',
      impact: 'Impact',
      technologies: 'Technologies',
      repository: 'View repository',
      notFound: 'Project not found',
    },
  }

  const currentTexts = pageTexts[lang]
  const projects = lang === 'pt' ? projects_pt : projects_eng
  const projectIndex = parseInt(id || '0')
  const project = projects.find((item) => item.index === projectIndex) ?? projects[projectIndex]

  if (!project) {
    return (
      <main className="relative min-h-screen px-6 lg:px-10 pt-32 pb-16 w-full max-w-5xl mx-auto">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-mono opacity-60 text-[var(--text-color)] dark:text-[var(--dark-text-color)] hover:opacity-100 transition-opacity mb-8"
        >
          <ArrowLeft size={16} />
          {currentTexts.back}
        </Link>
        <p className="font-mono text-base opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
          {currentTexts.notFound}
        </p>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen px-6 lg:px-10 pt-32 pb-16 w-full max-w-5xl mx-auto">
      <FadeIn>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-mono opacity-60 text-[var(--text-color)] dark:text-[var(--dark-text-color)] hover:opacity-100 transition-opacity mb-8"
        >
          <ArrowLeft size={16} />
          {currentTexts.back}
        </Link>

        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-4">
              {project.title}
            </h1>
            <p className="text-2xl opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-6">
              {project.description}
            </p>
            <p className="text-base md:text-lg leading-relaxed opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)] max-w-3xl">
              {project.summary || project.description}
            </p>
          </div>

          {/* Technologies */}
          {project.technologies.length > 0 && (
            <div className="font-mono text-sm">
              <p className="sr-only">{currentTexts.technologies}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 opacity-60 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </div>
          )}

          {/* Impact */}
          {project.impact && (
            <div className="font-mono text-sm">
              <span className="opacity-50">// {currentTexts.impact}</span>
              <p className="mt-3 opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)] leading-relaxed max-w-4xl">
                {project.impact}
              </p>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="font-mono text-sm">
              <span className="opacity-50">// {currentTexts.challenges}</span>
              <ul className="mt-3 space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2 opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                    <ArrowRight size={14} className="mt-1 shrink-0" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="font-mono text-sm">
              <span className="opacity-50">// {currentTexts.features}</span>
              <ul className="mt-3 space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                    <Check size={14} className="mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-black/20 px-6 py-2.5 font-mono text-sm text-[var(--text-color)] transition-colors hover:bg-black/5 dark:border-white/20 dark:text-[var(--dark-text-color)] dark:hover:bg-white/5"
            >
              <GitFork size={16} />
              {currentTexts.repository}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </FadeIn>
    </main>
  )
}
