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

type FrontmatterValue = string | string[]

function parseFrontmatter(raw: string): { data: Record<string, FrontmatterValue>; content: string } {
  // Normaliza quebras de linha para evitar caracteres \r (CRLF) no Windows
  const normalizedRaw = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const lines = normalizedRaw.split('\n')

  if (lines.length === 0 || lines[0].trim() !== '---') {
    return { data: {}, content: normalizedRaw }
  }

  // Encontra a primeira linha pós-cabeçalho (a partir do índice 1) que seja estritamente '---'
  let closingIndex = -1
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      closingIndex = i
      break
    }
  }

  if (closingIndex === -1) {
    return { data: {}, content: normalizedRaw }
  }

  const frontmatterLines = lines.slice(1, closingIndex)
  const contentLines = lines.slice(closingIndex + 1)

  const content = contentLines.join('\n').trim()
  const data: Record<string, FrontmatterValue> = {}
  let currentKey = ''

  for (const line of frontmatterLines) {
    const trimmedLine = line.trim()
    if (!trimmedLine || trimmedLine.startsWith('#')) continue

    // Verifica item de lista multilinha (ex: "- tag")
    if (trimmedLine.startsWith('- ') && currentKey) {
      let item = trimmedLine.slice(2).trim()
      if ((item.startsWith("'") && item.endsWith("'")) || (item.startsWith('"') && item.endsWith('"'))) {
        item = item.slice(1, -1)
      }
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = []
      }
      const currentItems = data[currentKey]
      if (Array.isArray(currentItems)) {
        currentItems.push(item)
      }
      continue
    }

    const colonIndex = line.indexOf(':')
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()

      if (!value) {
        currentKey = key
        data[key] = []
        continue
      }

      currentKey = key

      // Array inline: [tag1, tag2]
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

  const slug: string = String(data.slug || fileSlug).trim()
  const title: string = String(data.title || slug).trim()
  const excerpt: string = String(data.excerpt || (content.slice(0, 150) + (content.length > 150 ? '...' : ''))).trim()
  const date: string = data.date ? String(data.date).trim() : ''
  const readTime: string = data.readTime
    ? String(data.readTime).trim()
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
  .map(([filename, rawContent]) => {
    try {
      return parsePost(rawContent, filename)
    } catch (error) {
      console.error(`Erro ao processar arquivo ${filename}:`, error)
      return null
    }
  })
  .filter((post): post is Post => post !== null)
  .sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
