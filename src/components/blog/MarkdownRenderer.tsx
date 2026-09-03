import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import remarkAlert from 'remark-github-alerts'
import 'highlight.js/styles/github-dark.css'
import { useState, useEffect } from 'react'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [renderError, setRenderError] = useState<string | null>(null)
  const [isRendering, setIsRendering] = useState(true)

  useEffect(() => {
    setIsRendering(true)
    setRenderError(null)
    // Simula um pequeno delay para evitar travamento ao processar conteúdo grande
    const timer = setTimeout(() => {
      setIsRendering(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [content])

  if (renderError) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
        <p className="text-red-500 font-mono">Erro ao renderizar Markdown: {renderError}</p>
      </div>
    )
  }

  if (isRendering) {
    return (
      <div className="p-4 text-center opacity-50">
        <p className="font-mono">Carregando conteúdo...</p>
      </div>
    )
  }

  try {
    return (
      <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkAlert]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl md:text-4xl font-bold font-mono mt-10 mb-4 text-[var(--text-color)] dark:text-[var(--dark-text-color)] tracking-tight break-words">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl md:text-3xl font-bold font-mono mt-8 mb-3 text-[var(--text-color)] dark:text-[var(--dark-text-color)] break-words">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl md:text-2xl font-bold font-mono mt-6 mb-2 text-[var(--text-color)] dark:text-[var(--dark-text-color)] break-words">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg md:text-xl font-bold font-mono mt-5 mb-2 text-[var(--text-color)] dark:text-[var(--dark-text-color)] break-words">
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-base md:text-lg font-bold font-mono mt-4 mb-2 text-[var(--text-color)] dark:text-[var(--dark-text-color)] break-words">
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-sm md:text-base font-bold font-mono mt-4 mb-2 text-[var(--text-color)] dark:text-[var(--dark-text-color)] break-words">
            {children}
          </h6>
        ),
        p: ({ children }) => (
          <p className="text-lg leading-relaxed mb-5 text-[var(--text-color)] dark:text-[var(--dark-text-color)] opacity-80 break-words">
            {children}
          </p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-black/30 dark:decoration-white/30 hover:decoration-black dark:hover:decoration-white transition-all text-[var(--text-color)] dark:text-[var(--dark-text-color)] break-words"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-5 space-y-1.5 text-[var(--text-color)] dark:text-[var(--dark-text-color)] opacity-80 text-lg">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-5 space-y-1.5 text-[var(--text-color)] dark:text-[var(--dark-text-color)] opacity-80 text-lg">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed break-words">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-black/20 dark:border-white/20 pl-4 my-5 italic opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)] text-lg">
            {children}
          </blockquote>
        ),
        div: ({ className, children, ...props }) => {
          if (className && className.includes('markdown-alert')) {
            const isNote = className.includes('markdown-alert-note')
            const isWarning = className.includes('markdown-alert-warning')
            const isCaution = className.includes('markdown-alert-caution')
            const isImportant = className.includes('markdown-alert-important')
            const isTip = className.includes('markdown-alert-tip')
            
            let bgClass = 'bg-black/5 dark:bg-white/5'
            let borderClass = 'border-black/20 dark:border-white/20'
            
            if (isNote) { borderClass = 'border-blue-500/50'; bgClass = 'bg-blue-500/5' }
            if (isWarning) { borderClass = 'border-yellow-500/50'; bgClass = 'bg-yellow-500/5' }
            if (isCaution) { borderClass = 'border-red-500/50'; bgClass = 'bg-red-500/5' }
            if (isImportant) { borderClass = 'border-purple-500/50'; bgClass = 'bg-purple-500/5' }
            if (isTip) { borderClass = 'border-green-500/50'; bgClass = 'bg-green-500/5' }
            
            return (
              <div className={`border-l-4 ${borderClass} ${bgClass} p-4 my-6 rounded-r-lg`} {...props}>
                {children}
              </div>
            )
          }
          return <div className={className} {...props}>{children}</div>
        },
        code: ({ className, children, ...props }) => {
          const isInline = !className
          if (isInline) {
            return (
              <code
                className="bg-black/5 dark:bg-white/10 rounded px-1.5 py-0.5 font-mono text-sm text-[var(--text-color)] dark:text-[var(--dark-text-color)] break-words"
                {...props}
              >
                {children}
              </code>
            )
          }
          return (
            <code className={`${className} block overflow-x-auto`} {...props}>
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <div className="relative w-full max-w-full my-6 overflow-hidden rounded-xl bg-[#0d1117]">
            <pre className="overflow-x-auto p-4 text-sm max-w-full">
              {children}
            </pre>
          </div>
        ),
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="rounded-xl max-w-full w-auto mx-auto my-6 object-cover"
          />
        ),
        hr: () => (
          <hr className="my-8 border-black/10 dark:border-white/10" />
        ),
        table: ({ children }) => (
          <div className="w-full overflow-x-auto mb-6">
            <table className="w-full min-w-[500px] text-sm font-mono border-collapse text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-black/10 dark:border-white/10 px-4 py-2 text-left font-bold bg-black/5 dark:bg-white/5 break-words">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-black/10 dark:border-white/10 px-4 py-2 opacity-80 break-words">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
    )
  } catch (error) {
    console.error('Erro ao renderizar Markdown:', error)
    setRenderError(error instanceof Error ? error.message : 'Erro desconhecido')
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
        <p className="text-red-500 font-mono">Erro ao renderizar Markdown: {error instanceof Error ? error.message : 'Erro desconhecido'}</p>
      </div>
    )
  }
}
