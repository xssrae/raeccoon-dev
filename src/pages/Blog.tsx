import { Link } from 'react-router-dom'
import FadeIn from '@/components/ui/FadeIn'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'
import { posts } from '@/data/posts'
import { useLanguage } from '@/context/LanguageContext'

export default function Blog() {
  const { lang } = useLanguage()

  const pageTexts = {
    pt: {
      label: '/BLOG',
      title: 'Meu blog',
      description: 'Um espaço para escrever sobre meus projetos, tecnologias, hobbies e ideias.',
      readPost: 'Ler artigo',
      empty: 'Nenhum post publicado ainda. Adicione arquivos .md em src/data/posts/',
    },
    en: {
      label: '/BLOG',
      title: 'My blog',
      description: 'A space to write about my projects, tech, hobbies, and ideas.',
      readPost: 'Read article',
      empty: 'No posts published yet. Add .md files in src/data/posts/',
    },
  }

  const currentTexts = pageTexts[lang]

  return (
    <main className="relative min-h-screen px-6 lg:px-10 pt-32 pb-16 w-full max-w-6xl mx-auto">
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

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((blogPost, postIndex) => (
            <FadeIn key={blogPost.slug} delay={postIndex * 0.08}>
              <Link
                to={`/blog/${blogPost.slug}`}
                className="group flex flex-col h-full bg-white dark:bg-[#12100d] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-white/5"
              >
                {blogPost.image_path && (
                  <div className="relative h-48 w-full bg-black/5 dark:bg-white/5 overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src={blogPost.image_path}
                      alt={blogPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs opacity-40 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                      #{String(postIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-xs opacity-60 text-[var(--text-color)] dark:text-[var(--dark-text-color)] group-hover:opacity-100 group-hover:text-[var(--text-color-hover)] dark:group-hover:text-[var(--dark-text-color-hover)] transition-all">
                      {currentTexts.readPost}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-3 line-clamp-2 group-hover:text-[var(--text-color-hover)] dark:group-hover:text-[var(--dark-text-color-hover)] transition-colors">
                    {blogPost.title}
                  </h2>

                  <p className="text-[var(--text-color)] dark:text-[var(--dark-text-color)] opacity-70 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blogPost.excerpt}
                  </p>

                  {(blogPost.readTime || blogPost.date) && (
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10 font-mono text-xs opacity-60 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                      <div className="flex items-center gap-4">
                        {blogPost.date && (
                          <span className="flex items-center gap-1.5">
                            <Calendar size={13} /> {blogPost.date}
                          </span>
                        )}
                        {blogPost.readTime && (
                          <span className="flex items-center gap-1.5">
                            <Clock size={13} /> {blogPost.readTime}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-6 border-t border-black/10 dark:border-white/10">
          <BookOpen size={36} className="opacity-40 mb-4 text-[var(--text-color)] dark:text-[var(--dark-text-color)]" />
          <p className="font-mono text-base opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)] text-center">
            $ {currentTexts.empty}
          </p>
        </div>
      )}
    </main>
  )
}