import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from '@/components/ui/FadeIn'
import { Calendar, Clock, ArrowRight, BookOpen, Search, SearchX, RotateCcw, Tag } from 'lucide-react'
import { posts } from '@/data/posts'
import { useLanguage } from '@/context/LanguageContext'

export default function Blog() {
  const { lang } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const pageTexts = {
    pt: {
      label: '/BLOG',
      title: 'Raeccoon Blog',
      description: 'Um espaço onde escrevo sobre meus projetos, tecnologias, hobbies e ideias.',
      searchPlaceholder: 'Buscar por título, conteúdo ou tags...',
      allTags: 'Todos',
      readPost: 'Ler artigo',
      empty: 'Nenhum post publicado ainda. Adicione arquivos .md em src/data/posts/',
      nothingFound: 'Nenhum post encontrado para',
      clearSearch: 'LIMPAR FILTROS',
    },
    en: {
      label: '/BLOG',
      title: 'Raeccoon Blog',
      description: 'A space where I write about my projects, tech, hobbies, and ideas.',
      searchPlaceholder: 'Search by title, content or tags...',
      allTags: 'All',
      readPost: 'Read article',
      empty: 'No posts published yet. Add .md files in src/data/posts/',
      nothingFound: 'No posts found for',
      clearSearch: 'CLEAR FILTERS',
    },
  }

  const currentTexts = pageTexts[lang]

  // Extrai todas as tags únicas dos posts disponíveis
  const allTags = useMemo(() => {
    const tagsMap = new Map<string, number>()
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1)
      })
    })
    return Array.from(tagsMap.entries()).sort((a, b) => b[1] - a[1])
  }, [])

  // Filtra posts por busca e por tag selecionada
  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return posts.filter((blogPost) => {
      // Filtro por tag
      if (selectedTag && !blogPost.tags.includes(selectedTag)) {
        return false
      }

      // Filtro por termo de busca
      if (normalizedQuery) {
        const matchesTitle = blogPost.title.toLowerCase().includes(normalizedQuery)
        const matchesExcerpt = blogPost.excerpt.toLowerCase().includes(normalizedQuery)
        const matchesContent = blogPost.content.toLowerCase().includes(normalizedQuery)
        const matchesTags = blogPost.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
        return matchesTitle || matchesExcerpt || matchesContent || matchesTags
      }

      return true
    })
  }, [searchQuery, selectedTag])

  function handleTagClick(tag: string) {
    setSelectedTag((prev) => (prev === tag ? null : tag))
  }

  function handleClearFilters() {
    setSearchQuery('')
    setSelectedTag(null)
  }

  return (
    <main className="relative min-h-screen px-6 lg:px-10 pt-32 pb-16 w-full max-w-6xl mx-auto">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
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

          {/* Barra de Busca */}
          {posts.length > 0 && (
            <div className="relative w-full md:w-80 shrink-0">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={currentTexts.searchPlaceholder}
                className="w-full h-11 rounded-full border border-black/15 dark:border-white/10 pl-11 pr-4 font-mono text-sm placeholder:opacity-50 text-[var(--text-color)] dark:text-[var(--dark-text-color)] bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 transition-all shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Filtros por Tag */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            <span className="flex items-center gap-1.5 text-xs font-mono opacity-50 text-[var(--text-color)] dark:text-[var(--dark-text-color)] mr-1 shrink-0">
              <Tag size={13} />
            </span>
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              aria-pressed={selectedTag === null}
              className={`ui-pill shrink-0 cursor-pointer px-3.5 py-1.5 font-mono text-xs ${
                selectedTag === null
                  ? 'bg-[var(--text-color)] text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                  : 'bg-white/50 dark:bg-white/5 text-[var(--text-color)] dark:text-[var(--dark-text-color)] opacity-70'
              }`}
            >
              {currentTexts.allTags} ({posts.length})
            </button>

            {allTags.map(([tag, count]) => {
              const isSelected = selectedTag === tag
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  aria-pressed={isSelected}
                  className={`ui-pill shrink-0 cursor-pointer px-3.5 py-1.5 font-mono text-xs ${
                    isSelected
                      ? 'bg-[var(--text-color)] text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                      : 'bg-white/50 dark:bg-white/5 text-[var(--text-color)] dark:text-[var(--dark-text-color)] opacity-70'
                  }`}
                >
                  #{tag} ({count})
                </button>
              )
            })}
          </div>
        )}
      </FadeIn>

      {posts.length > 0 ? (
        filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((blogPost, postIndex) => (
              <FadeIn key={blogPost.slug} delay={postIndex * 0.06}>
                <Link
                  to={`/blog/${blogPost.slug}`}
                  className="ui-surface group flex h-full flex-col overflow-hidden bg-white dark:bg-[#12100d]"
                >
                  {blogPost.image_path && (
                    <div className="relative h-48 sm:h-52 w-full bg-black/5 dark:bg-white/5 overflow-hidden flex items-center justify-center shrink-0">
                      <img
                        src={blogPost.image_path}
                        alt={blogPost.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                    </div>
                  )}

                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs opacity-40 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                        #{String(postIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-xs opacity-60 text-[var(--text-color)] transition-all group-hover:text-[var(--text-color-hover)] group-hover:opacity-100 group-focus-visible:text-[var(--text-color-hover)] group-focus-visible:opacity-100 dark:text-[var(--dark-text-color)] dark:group-hover:text-[var(--dark-text-color-hover)] dark:group-focus-visible:text-[var(--dark-text-color-hover)]">
                        {currentTexts.readPost}
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1" />
                      </span>
                    </div>

                    <h2 className="mb-3 line-clamp-2 font-mono text-xl font-bold text-[var(--text-color)] transition-colors group-hover:text-[var(--text-color-hover)] group-focus-visible:text-[var(--text-color-hover)] dark:text-[var(--dark-text-color)] dark:group-hover:text-[var(--dark-text-color-hover)] dark:group-focus-visible:text-[var(--dark-text-color-hover)]">
                      {blogPost.title}
                    </h2>

                    <p className="text-[var(--text-color)] dark:text-[var(--dark-text-color)] opacity-70 text-sm leading-relaxed mb-4 line-clamp-3">
                      {blogPost.excerpt}
                    </p>

                    {/* Tags do post */}
                    {blogPost.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {blogPost.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleTagClick(tag)
                            }}
                            aria-pressed={selectedTag === tag}
                            className={`ui-pill cursor-pointer px-2.5 py-0.5 font-mono text-[0.7rem] ${
                              selectedTag === tag
                                ? 'bg-[var(--text-color)] text-white dark:bg-white dark:text-black border-transparent font-semibold'
                                : 'bg-black/5 dark:bg-white/5 opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)]'
                            }`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    )}

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
            <SearchX size={36} className="opacity-40 mb-4 text-[var(--text-color)] dark:text-[var(--dark-text-color)]" />
            <p className="font-mono text-base opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-6 text-center">
              $ {currentTexts.nothingFound} "{searchQuery || selectedTag}"
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="ui-pill flex cursor-pointer items-center gap-2 px-6 py-2.5 font-mono text-sm text-[var(--text-color)] dark:text-[var(--dark-text-color)]"
            >
              <RotateCcw size={16} />
              {currentTexts.clearSearch}
            </button>
          </div>
        )
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
