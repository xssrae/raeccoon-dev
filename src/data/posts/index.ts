export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image_path?: string
  content: string
}

// Carrega todos os arquivos .md desta pasta em build/bundle time via Vite glob import
const modules = import.meta.glob<string>('./*.md', { query: '?raw', import: 'default', eager: true })

function estimateReadTime(text: string): string {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))
  return `${minutes} min`
}

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const trimmed = raw.trim()
  if (!trimmed.startsWith('---')) {
    return { data: {}, content: raw }
  }

  const endMatch = trimmed.indexOf('\n---', 3)
  if (endMatch === -1) {
    return { data: {}, content: raw }
  }

  const frontmatterBlock = trimmed.slice(3, endMatch).trim()
  const content = trimmed.slice(endMatch + 4).trim()
  const data: Record<string, string> = {}

  for (const line of frontmatterBlock.split('\n')) {
    const colonIndex = line.indexOf(':')
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()
      if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
        value = value.slice(1, -1)
      }
      data[key] = value
    }
  }

  return { data, content }
}

function parsePost(rawContent: string, filename: string): Post {
  const { data, content } = parseFrontmatter(rawContent)

  // Infere o slug pelo nome do arquivo caso não esteja no frontmatter
  const fileSlug = filename
    .replace(/^.*[\\/]/, '') // remove o caminho
    .replace(/\.md$/, '') // remove a extensão

  const slug: string = data.slug || fileSlug
  const title: string = data.title || slug
  const excerpt: string = data.excerpt || (content.slice(0, 150) + (content.length > 150 ? '...' : ''))
  const date: string = data.date ? String(data.date) : ''
  const readTime: string = data.readTime
    ? String(data.readTime)
    : content.trim()
    ? estimateReadTime(content)
    : ''
  const image_path: string | undefined = data.image_path?.trim() ? data.image_path : undefined

  return { slug, title, excerpt, date, readTime, image_path, content }
}

export const posts: Post[] = Object.entries(modules)
  .map(([filename, rawContent]) => parsePost(rawContent, filename))
  .sort((a, b) => {
    // Posts com data aparecem primeiro (mais recentes primeiro), posts sem data por último
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })