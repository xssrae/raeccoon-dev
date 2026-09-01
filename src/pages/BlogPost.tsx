import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { posts } from '@/data/posts'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!post) {
    return (
      <main className="relative min-h-screen px-8 pt-32 pb-16 max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
        <p className="font-mono opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-6">
          Post não encontrado.
        </p>
        <Link
          to="/blog"
          className="px-6 py-2.5 rounded-full border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-mono text-sm text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
        >
          Voltar pro blog
        </Link>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen px-6 md:px-8 pt-32 pb-16 max-w-3xl mx-auto">
      {/* Botão voltar */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 font-mono text-sm opacity-50 hover:opacity-100 transition-opacity text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-8 group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        /blog
      </Link>

      {/* Imagem de capa */}
      {post.image_path && (
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <img
            src={post.image_path}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Cabeçalho do post */}
      <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-[var(--text-color)] dark:text-[var(--dark-text-color)] tracking-tight">
        {post.title}
      </h1>

      {(post.date || post.readTime) && (
        <div className="flex items-center gap-4 font-mono text-sm opacity-50 mb-12 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
          {post.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post.readTime}
            </span>
          )}
          {post.date && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {post.date}
            </span>
          )}
        </div>
      )}

      {/* Conteúdo renderizado em Markdown */}
      <div className="prose-content">
        <MarkdownRenderer content={post.content} />
      </div>

      {/* Rodapé de navegação */}
      <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-mono text-sm text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
        >
          <ArrowLeft size={14} />
          Voltar pro blog
        </Link>
      </div>
    </main>
  )
}