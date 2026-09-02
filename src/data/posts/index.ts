export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image_path?: string
  tags: string[]
  content: string
}

// Carrega todos os arquivos .md desta pasta em build/bundle time via Vite glob import
const modules = import.meta.glob<string>('./*.md', { query: '?raw', import: 'default', eager: true })

// Carrega possíveis imagens locais armazenadas nesta mesma pasta (src/data/posts)
const imageModules = import.meta.glob<string>('./*.{png,jpg,jpeg,webp,svg,gif,avif}', {
  query: '?url',
  import: 'default',
  eager: true,
})

function estimateReadTime(text: string): string {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))
  return `${minutes} min`
}

function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
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
  const data: Record<string, string | string[]> = {}

  const lines = frontmatterBlock.split('\n')
  let currentKey = ''
  let isList = false

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine || trimmedLine.startsWith('#')) continue

    // Verifica se é item de lista multilinha (ex: "- tag")
    if (trimmedLine.startsWith('- ') && currentKey && isList) {
      let item = trimmedLine.slice(2).trim()
      if ((item.startsWith("'") && item.endsWith("'")) || (item.startsWith('"') && item.endsWith('"'))) {
        item = item.slice(1, -1)
      }
      if (Array.isArray(data[currentKey])) {
        data[currentKey].push(item)
      }
      continue
    }

    const colonIndex = line.indexOf(':')
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()

      // Caso a chave não tenha valor na mesma linha, pode ser início de lista
      if (!value) {
        currentKey = key
        isList = true
        data[key] = []
        continue
      }

      isList = false
      currentKey = key

      // Suporte a array inline [tag1, tag2]
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayItems = value
          .slice(1, -1)
          .split(',')
          .map((item) => {
            let s = item.trim()
            if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
              s = s.slice(1, -1)
            }
            return s
          })
          .filter(Boolean)
        data[key] = arrayItems
      } else {
        if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
          value = value.slice(1, -1)
        }
        data[key] = value
      }
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

  // Suporte a image_path, cover, image ou cover_image
  const rawImagePath = data.image_path || data.cover || data.image || data.cover_image
  let image_path: string | undefined = undefined
  if (typeof rawImagePath === 'string' && rawImagePath.trim()) {
    const trimmedPath = rawImagePath.trim()
    if (
      trimmedPath.startsWith('http://') ||
      trimmedPath.startsWith('https://') ||
      trimmedPath.startsWith('data:') ||
      trimmedPath.startsWith('/')
    ) {
      image_path = trimmedPath
    } else {
      // Procura arquivo local correspondente na pasta de posts
      const normalizedLocalKey = `./${trimmedPath.replace(/^\.\//, '')}`
      if (imageModules[normalizedLocalKey]) {
        image_path = imageModules[normalizedLocalKey]
      } else {
        image_path = trimmedPath
      }
    }
  }

  // Tratamento de tags
  let tags: string[] = []
  if (Array.isArray(data.tags)) {
    tags = data.tags.map(String).map((t) => t.trim()).filter(Boolean)
  } else if (typeof data.tags === 'string' && data.tags.trim()) {
    tags = data.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
  }

  return { slug, title, excerpt, date, readTime, image_path, tags, content }
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