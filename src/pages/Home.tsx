import { useState, useMemo} from 'react'
import ScrambleText from '@/components/ui/ScrambleText'
import ParticlesBackground from '@/components/ui/ParticlesBackground'
import PhotoFrame from '@/components/ui/PhotoFrame'
import NowPlaying from '@/components/ui/NowPlaying'
import MagneticButton from '@/components/ui/MagneticButton'
import PageContainer from '@/components/layout/PageContainer'
import FadeIn from '@/components/ui/FadeIn'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { Mail, Calendar, Clock, ArrowRight, ChevronDown, BriefcaseBusiness, Code2 } from 'lucide-react'
import { profile } from '@/data/profile'
import { Link } from 'react-router-dom'
import { posts } from '@/data/posts'
import { projects_pt } from '@/data/projects/pt'
import { projects_eng } from '@/data/projects/eng'
import { jobs_pt } from '@/data/jobs/pt'
import { jobs_eng } from '@/data/jobs/eng'
import { useLanguage } from '@/context/LanguageContext'
import profileImage from '@/assets/profile.jpg'

export default function Home() {
  const { lang } = useLanguage()
  const highlightPost = posts[0]

  const interfaceTexts = {
    pt: {
      blogLabel: '/BLOG',
      blogTitle: 'Raeccoon Blog',
      featuredPost: 'POST EM DESTAQUE',
      noImage: 'sem imagem ainda',
      readMore: 'Ler mais',
      skillsLabel: '/SKILLS',
      skillsTitle: 'Skills',
      noSkills: 'Adicione suas skills em src/data/profile.ts',
      skillCategories: {
        languages: 'Linguagens',
        frameworks: 'Frameworks',
        dados: 'Dados',
        ai: 'Inteligência Artificial',
        tools: 'Ferramentas',
        architecture: 'Arquitetura',
      },
      experienceLabel: '/EXPERIENCIA',
      experienceTitle: 'Experiência',
      experienceDescription: 'Um recorte da minha trajetória profissional, com responsabilidades e tecnologias que usei no caminho.',
      noExperience: 'Adicione suas experiências em src/data/jobs/pt.ts',
      projectsLabel: '/PROJETOS',
      projectsTitle: 'Meus projetos',
      projectsDescription: 'Uma visão geral dos meus projetos, destacando tecnologias e contribuições.'
    },
    en: {
      blogLabel: '/BLOG',
      blogTitle: 'Raecoon Blog',
      featuredPost: 'FEATURED POST',
      noImage: 'no image yet',
      readMore: 'Read more',
      skillsLabel: '/SKILLS',
      skillsTitle: 'Skills',
      noSkills: 'Add your skills in src/data/profile.ts',
      skillCategories: {
        languages: 'Languages',
        frameworks: 'Frameworks',
        databases: 'Databases',
        tools: 'Tools',
        architecture: 'Architecture',
        ai: 'Inteligência Artificial',
      },
      experienceLabel: '/EXPERIENCE',
      experienceTitle: 'Experience',
      experienceDescription: 'A quick look at my professional path, responsibilities, and technologies used along the way.',
      noExperience: 'Add your experience entries in src/data/jobs/eng.ts',
      projectsLabel: '/PROJECTS',
      projectsTitle: 'My projects',
      projectsDescription: 'An overview of my projects, highlighting technologies and contributions.'
      
    }
  }

  const currentTexts = interfaceTexts[lang]
  const profileData = profile[lang]
  const jobs = lang === 'pt' ? jobs_pt : jobs_eng
  const previewJobs = jobs.slice(0, 2)
  
  
  const skillCategories = Object.entries(profile.skills).filter(([, skillItems]) => skillItems.length > 0)
  const projects = lang === 'pt' ? projects_pt : projects_eng
  const previewProjects = projects.slice(0, 2)

  /*const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    let resultProjects = projects

    if (normalizedQuery) {
      resultProjects = resultProjects.filter((projectItem) => {
        const matchesTitle = projectItem.title?.toLowerCase().includes(normalizedQuery)
        const matchesLanguage = projectItem.languages?.some((programmingLanguage) =>
          programmingLanguage.toLowerCase().includes(normalizedQuery)
        )
        return matchesTitle || matchesLanguage
      })
    }

    return normalizedQuery ? resultProjects : resultProjects.slice(0, 3)
  }, [searchQuery, projects])*/

  function scrollToSkillsSection() {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative w-full transition-colors duration-300">
      <ParticlesBackground />

      <main id="home" className="relative min-h-screen flex items-center pt-24 pb-16 scroll-mt-24">
        <PageContainer className="relative z-10 flex flex-col-reverse xl:flex-row items-center justify-center gap-10 xl:gap-16 pt-8 xl:pt-0">
          
          {/* Seção de Texto (Centralizada no Mobile/Tela Dividida, Esquerda no Desktop) */}
          <div className="flex-1 max-w-2xl flex flex-col items-center text-center xl:items-start xl:text-left">
            <ScrambleText
              text={`${profile.name}_`}
              as="h1"
              className="text-[2.5rem] md:text-5xl xl:text-6xl font-bold tracking-tight cursor-default leading-none text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
            />
            <p className="mt-4 xl:mt-5 text-base md:text-lg opacity-60 font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
              $ {profileData.role}
            </p>
            <p className="mt-5 xl:mt-7 text-lg md:text-xl leading-relaxed opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
              {profileData.bio}
            </p>

            {(profile.email || profile.github || profile.linkedin) && (
              <div className="flex flex-wrap justify-center xl:justify-start gap-3 mt-8">
                {profile.email && (
                  <MagneticButton
                    className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-black/15 dark:border-white/15 bg-transparent hover:bg-[var(--button-color-hover)] dark:hover:bg-[var(--dark-button-color-hover)] transition-colors text-xs font-mono tracking-widest uppercase text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
                    onClick={() => window.open(`mailto:${profile.email}`)}
                  >
                    <Mail size={16} strokeWidth={1.5} /> EMAIL
                  </MagneticButton>
                )}
                {profile.github && (
                  <MagneticButton
                    className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-black/15 dark:border-white/15 bg-transparent hover:bg-[var(--button-color-hover)] dark:hover:bg-[var(--dark-button-color-hover)] transition-colors text-xs font-mono tracking-widest uppercase text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
                    onClick={() => window.open(profile.github)}
                  >
                    <GithubIcon width={16} height={16} /> GITHUB
                  </MagneticButton>
                )}
                {profile.linkedin && (
                  <MagneticButton
                    className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-black/15 dark:border-white/15 bg-transparent hover:bg-[var(--button-color-hover)] dark:hover:bg-[var(--dark-button-color-hover)] transition-colors text-xs font-mono tracking-widest uppercase text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
                    onClick={() => window.open(profile.linkedin)}
                  >
                    <LinkedinIcon width={16} height={16} /> LINKEDIN
                  </MagneticButton>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-6 relative group shrink-0">
            <PhotoFrame src={profileImage} alt={profile.name} />
            <NowPlaying />
          </div>
        </PageContainer>

        <button
          onClick={scrollToSkillsSection}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50 hover:opacity-100 transition-opacity animate-bounce text-[var(--text-color)] dark:text-[var(--dark-text-color)] hidden xl:block"
        >
          <ChevronDown size={28} />
        </button>
      </main>

      <section id="skills" className="relative py-24 scroll-mt-10">
        <PageContainer>
          <FadeIn>
            <div className="mb-10 group">
              <p className="text-sm font-mono opacity-50 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">{currentTexts.skillsLabel}</p>
              <h2 className="mt-1 text-4xl lg:text-[2.75rem] font-bold font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)] group-hover:text-[var(--text-color-hover)] dark:group-hover:text-[var(--dark-text-color-hover)] transition-colors cursor-default">
                {currentTexts.skillsTitle}
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {skillCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 border-t border-black/10 dark:border-white/10 pt-8">
                {skillCategories.map(([categoryKey, skillItems]) => (
                  <article key={categoryKey} className="min-w-0">
                    <h3 className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider opacity-60 text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-4">
                      <Code2 size={16} />
                      {currentTexts.skillCategories[categoryKey as keyof typeof currentTexts.skillCategories] ?? categoryKey}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {skillItems.map((skillName) => (
                        <span
                          key={skillName}
                          className="text-xs font-mono border border-black/15 dark:border-white/20 rounded-full px-3 py-1.5 opacity-90 text-[var(--text-color)] dark:text-[var(--dark-text-color)] bg-black/5 dark:bg-black transition-colors"
                        >
                          {skillName}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-6 border-t border-black/10 dark:border-white/10">
                <Code2 size={32} className="opacity-40 mb-4 text-[var(--text-color)] dark:text-[var(--dark-text-color)]" />
                <p className="font-mono text-base opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                  $ {currentTexts.noSkills}
                </p>
              </div>
            )}
          </FadeIn>
        </PageContainer>
      </section>

      <section id="experience" className="relative py-24 scroll-mt-10">
        <PageContainer>
          <FadeIn>
            <div className="mb-10">
              <p className="text-sm font-mono opacity-50 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">{currentTexts.experienceLabel}</p>
              <Link to="/experience" className="inline-flex items-center gap-3 mt-1 group">
                <h2 className="text-4xl lg:text-[2.75rem] font-bold font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)] group-hover:text-[var(--text-color-hover)] dark:group-hover:text-[var(--dark-text-color-hover)] transition-colors">
                  {currentTexts.experienceTitle}
                </h2>
                <ArrowRight size={28} className="text-[var(--text-color)] dark:text-[var(--dark-text-color)] group-hover:translate-x-1 group-hover:text-[var(--text-color-hover)] dark:group-hover:text-[var(--dark-text-color-hover)] transition-all" />
              </Link>
              <p className="mt-4 text-lg opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)] max-w-2xl leading-relaxed">
                {currentTexts.experienceDescription}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {previewJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-black/10 dark:border-white/10 pt-8">
                {previewJobs.map((job, index) => (
                  <Link
                    key={`${job.company}-${job.role}-${job.startDate}`}
                    to={`/experience/${index}`}
                    className="group p-6 rounded-2xl border border-black/10 dark:border-white/10 hover:bg-[var(--box-color-hover)] dark:hover:bg-[var(--dark-box-color-hover)] transition-all duration-300"
                  >
                    <h3 className="text-xl md:text-2xl font-bold font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-2 transition-colors">
                      {job.role}
                    </h3>
                    <p className="mt-3 opacity-70 text-base leading-relaxed text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                      {job.summary || job.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.technologies.slice(0, 5).map((technology) => (
                        <span
                          key={technology}
                          className="text-xs font-mono border border-black/15 dark:border-white/20 rounded-full px-3 py-1.5 opacity-90 text-[var(--text-color)] dark:text-[var(--dark-text-color)] bg-black/5 dark:bg-black transition-colors"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-6 border-t border-black/10 dark:border-white/10">
                <BriefcaseBusiness size={32} className="opacity-40 mb-4 text-[var(--text-color)] dark:text-[var(--dark-text-color)]" />
                <p className="font-mono text-base opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                  $ {currentTexts.noExperience}
                </p>
              </div>
            )}
          </FadeIn>
        </PageContainer>
      </section>

      <section id="projects" className="relative py-24 scroll-mt-10">
          <PageContainer>
          <FadeIn>
            <div className="mb-10">
              <p className="text-sm font-mono opacity-50 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">{currentTexts.projectsLabel}</p>
              <Link to="/projects" className="inline-flex items-center gap-3 mt-1 group">
                <h2 className="text-4xl lg:text-[2.75rem] font-bold font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)] group-hover:text-[var(--text-color-hover)] dark:group-hover:text-[var(--dark-text-color-hover)] transition-colors">
                  {currentTexts.projectsTitle}
                </h2>
                <ArrowRight size={28} className="text-[var(--text-color)] dark:text-[var(--dark-text-color)] group-hover:translate-x-1 group-hover:text-[var(--text-color-hover)] dark:group-hover:text-[var(--dark-text-color-hover)] transition-all" />
              </Link>
              <p className="mt-4 text-lg opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)] max-w-2xl leading-relaxed">
                {currentTexts.projectsDescription}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {previewProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-black/10 dark:border-white/10 pt-8">
                {previewProjects.map((project, index) => (
                  <Link
                    key={`${project.title}-${project.description}`}
                    to={`/projects/${index}`}
                    className="group p-6 rounded-2xl border border-black/10 dark:border-white/10 hover:bg-[var(--box-color-hover)] dark:hover:bg-[var(--dark-box-color-hover)] transition-all duration-300"
                  >
                    <h3 className="text-xl md:text-2xl font-bold font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-2 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-3 opacity-70 text-base leading-relaxed text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                      {project.description}
                    </p>
                    {project.impact && (
                      <p className="mt-4 text-sm font-mono opacity-60 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                        // {project.impact}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-6 border-t border-black/10 dark:border-white/10">
                <BriefcaseBusiness size={32} className="opacity-40 mb-4 text-[var(--text-color)] dark:text-[var(--dark-text-color)]" />
                <p className="font-mono text-base opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                </p>                                  
              </div>
            )}
          </FadeIn>
        </PageContainer>
      </section>

      <section id="blog" className="relative py-24 scroll-mt-10">
        <PageContainer>
          <FadeIn>
            <div className="mb-10">
              <p className="text-sm font-mono opacity-50 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">{currentTexts.blogLabel}</p>
              <Link to="/blog" className="inline-flex items-center gap-3 mt-1 group">
                <h2 className="text-4xl lg:text-[2.75rem] font-bold font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)] group-hover:text-[var(--text-color-hover)] dark:group-hover:text-[var(--dark-text-color-hover)] transition-colors">
                  {currentTexts.blogTitle}
                </h2>
                <ArrowRight size={28} className="text-[var(--text-color)] dark:text-[var(--dark-text-color)] group-hover:translate-x-1 group-hover:text-[var(--text-color-hover)] dark:group-hover:text-[var(--dark-text-color-hover)] transition-all" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {highlightPost && (
              <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col xl:flex-row bg-white dark:bg-black">
                {highlightPost.image_path && (
                  <Link to={`/blog/${highlightPost.slug}`} className="xl:w-1/2 shrink-0 block h-80 xl:h-auto relative overflow-hidden group bg-black/5 dark:bg-white/5 flex items-center justify-center">
                    <img src={highlightPost.image_path} alt={highlightPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/60 to-transparent" />
                  </Link>
                )}

                <div className="flex-1 p-8 lg:p-10 flex flex-col bg-white dark:bg-black">
                  <span className="self-start font-mono text-[0.65rem] tracking-widest uppercase px-3 py-1.5 rounded-full mb-5 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 font-semibold text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                    {currentTexts.featuredPost}
                  </span>

                  <h3 className="text-3xl font-bold mb-4">
                    <Link
                      to={`/blog/${highlightPost.slug}`}
                      className="group/title inline-flex items-center gap-2 text-[var(--text-color)] dark:text-[var(--dark-text-color)] hover:text-[var(--text-color-hover)] dark:hover:text-[var(--dark-text-color-hover)] transition-colors"
                    >
                      {highlightPost.title}
                      <ArrowRight size={20} className="shrink-0 translate-x-0 group-hover/title:translate-x-1 transition-transform" />
                    </Link>
                  </h3>

                  <p className="opacity-70 leading-relaxed mb-6 text-[var(--text-color)] dark:text-[var(--dark-text-color)] text-lg">
                    {highlightPost.excerpt}
                  </p>

                  {highlightPost.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {highlightPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {(highlightPost.readTime || highlightPost.date) && (
                    <div className="mt-auto flex items-center justify-between pt-5 border-t border-black/10 dark:border-white/10 font-mono text-xs opacity-50 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                      <div className="flex items-center gap-4">
                        {highlightPost.date && (
                          <span className="flex items-center gap-1.5"><Calendar size={14} /> {highlightPost.date}</span>
                        )}
                        {highlightPost.readTime && (
                          <span className="flex items-center gap-1.5"><Clock size={14} /> {highlightPost.readTime}</span>
                        )}
                      </div>
                    <Link to={`/blog/${highlightPost.slug}`} className="flex items-center gap-1.5 group font-semibold text-[var(--text-grey)] hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                        {currentTexts.readMore} <ArrowRight size={14} className="group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </FadeIn>
        </PageContainer>
      </section>
    </div>
  )
}
