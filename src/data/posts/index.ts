import matter from 'gray-matter'

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image_path?: string
  content: string
}

// Carrega todos os arquivos .md da pasta posts em build time via Vite glob import
const modules = import.meta.glob('./posts/*.md', { as: 'raw', eager: true })

function estimateReadTime(text: string): string {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))
  return `${minutes} min`
}

function parsePost(rawContent: string, filename: string): Post {
  const { data, content } = matter(rawContent)

  // Infere o slug pelo nome do arquivo caso não esteja no frontmatter
  const fileSlug = filename
    .replace(/^.*[\\/]/, '')  // remove o caminho
    .replace(/\.md$/, '')     // remove a extensão

  const slug: string = data.slug ?? fileSlug
  const title: string = data.title ?? slug
  const excerpt: string = data.excerpt ?? ''
  const date: string = data.date ? String(data.date) : ''
  const readTime: string = data.readTime
    ? String(data.readTime)
    : content.trim()
    ? estimateReadTime(content)
    : ''
  const image_path: string | undefined = data.image_path ?? undefined

  return { slug, title, excerpt, date, readTime, image_path, content }
}

export const posts: Post[] = Object.entries(modules)
  .map(([filename, rawContent]) => parsePost(rawContent as string, filename))
  .sort((a, b) => {
    // Posts com data aparecem primeiro (mais recentes primeiro), posts sem data por último
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })