import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { posts } from '@/data/posts'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { useLanguage } from '@/context/LanguageContext'

export default function BlogPost() {
  const { slug } = useParams()
  const { lang } = useLanguage()
  const post = posts.find((p) => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const texts = {
    pt: {
      backToBlog: 'Voltar para o blog',
      notFound: 'Post não encontrado.',
      readingMode: 'MODO LEITURA',
    },
    en: {
      backToBlog: 'Back to blog',
      notFound: 'Post not found.',
      readingMode: 'READING MODE',
    },
  }

  const currentTexts = texts[lang]

  if (!post) {
    return (
      <main className="relative min-h-screen px-8 pt-32 pb-16 max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
        <BookOpen size={36} className="opacity-40 mb-4 text-[var(--text-color)] dark:text-[var(--dark-text-color)]" />
        <p className="font-mono opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-6 text-lg">
          $ {currentTexts.notFound}
        </p>
        <Link
          to="/blog"
          className="ui-pill inline-flex items-center gap-2 px-6 py-2.5 font-mono text-sm text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
        >
          <ArrowLeft size={16} /> {currentTexts.backToBlog}
        </Link>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen px-6 md:px-8 pt-32 pb-24 max-w-3xl mx-auto">
      <FadeIn>
        {/* Botão voltar */}
        <Link
          to="/blog"
          className="ui-link group mb-8 inline-flex items-center gap-2 font-mono text-sm text-[var(--text-color)] opacity-60 dark:text-[var(--dark-text-color)]"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          /blog
        </Link>

        {/* Tag Modo Leitura */}
        <div className="mb-4">
          <span className="font-mono text-[0.65rem] tracking-widest uppercase px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 font-semibold text-[var(--text-color)] dark:text-[var(--dark-text-color)] opacity-70">
            {currentTexts.readingMode}
          </span>
        </div>

        {/* Imagem de capa */}
        {post.image_path && (
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-black/10 dark:border-white/10 shadow-sm">
            <img
              src={post.image_path}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Cabeçalho do post */}
        <h1 className="text-3xl md:text-5xl font-bold font-mono mt-2 mb-4 text-[var(--text-color)] dark:text-[var(--dark-text-color)] tracking-tight leading-tight">
          {post.title}
        </h1>

        {(post.date || post.readTime || post.tags.length > 0) && (
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-sm opacity-70 mb-10 pb-6 border-b border-black/10 dark:border-white/10 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
            <div className="flex flex-wrap items-center gap-4">
              {post.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {post.date}
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {post.readTime}
                </span>
              )}
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 opacity-80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Conteúdo renderizado em Markdown (Modo Leitura) */}
        <article className="prose-content">
          <MarkdownRenderer content={post.content} />
        </article>

        {/* Rodapé de navegação */}
        <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 flex justify-between items-center">
          <Link
            to="/blog"
            className="ui-pill inline-flex items-center gap-2 px-6 py-2.5 font-mono text-sm text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
          >
            <ArrowLeft size={16} />
            {currentTexts.backToBlog}
          </Link>
        </div>
      </FadeIn>
    </main>
  )
}
