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
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all shrink-0 cursor-pointer ${
                selectedTag === null
                  ? 'bg-[var(--text-color)] text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                  : 'border border-black/15 dark:border-white/15 bg-white/50 dark:bg-white/5 text-[var(--text-color)] dark:text-[var(--dark-text-color)] opacity-70 hover:opacity-100 hover:border-black/30 dark:hover:border-white/30'
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
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--text-color)] text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                      : 'border border-black/15 dark:border-white/15 bg-white/50 dark:bg-white/5 text-[var(--text-color)] dark:text-[var(--dark-text-color)] opacity-70 hover:opacity-100 hover:border-black/30 dark:hover:border-white/30'
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
                  className="group flex flex-col h-full bg-white dark:bg-[#12100d] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-white/5"
                >
                  {blogPost.image_path && (
                    <div className="relative h-48 sm:h-52 w-full bg-black/5 dark:bg-white/5 overflow-hidden flex items-center justify-center shrink-0">
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
                            className={`text-[0.7rem] font-mono px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                              selectedTag === tag
                                ? 'bg-[var(--text-color)] text-white dark:bg-white dark:text-black border-transparent font-semibold'
                                : 'border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 opacity-70 hover:opacity-100 text-[var(--text-color)] dark:text-[var(--dark-text-color)]'
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
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-mono text-sm text-[var(--text-color)] dark:text-[var(--dark-text-color)] cursor-pointer"
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