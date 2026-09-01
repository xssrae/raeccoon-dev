import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl md:text-4xl font-bold font-mono mt-10 mb-4 text-[var(--text-color)] dark:text-[var(--dark-text-color)] tracking-tight">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl md:text-3xl font-bold font-mono mt-8 mb-3 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-bold font-mono mt-6 mb-2 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-lg leading-relaxed mb-5 text-[var(--text-color)] dark:text-[var(--dark-text-color)] opacity-80">
            {children}
          </p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-black/30 dark:decoration-white/30 hover:decoration-black dark:hover:decoration-white transition-all text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
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
          <li className="leading-relaxed">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-black/20 dark:border-white/20 pl-4 my-5 italic opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)] text-lg">
            {children}
          </blockquote>
        ),
        code: ({ className, children, ...props }) => {
          const isInline = !className
          if (isInline) {
            return (
              <code
                className="bg-black/5 dark:bg-white/10 rounded px-1.5 py-0.5 font-mono text-sm text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
                {...props}
              >
                {children}
              </code>
            )
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <pre className="rounded-xl overflow-x-auto mb-6 text-sm">
            {children}
          </pre>
        ),
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="rounded-xl w-full my-6 object-cover"
          />
        ),
        hr: () => (
          <hr className="my-8 border-black/10 dark:border-white/10" />
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm font-mono border-collapse text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-black/10 dark:border-white/10 px-4 py-2 text-left font-bold bg-black/5 dark:bg-white/5">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-black/10 dark:border-white/10 px-4 py-2 opacity-80">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
