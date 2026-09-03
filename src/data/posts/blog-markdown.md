---
slug: blog-markdown
title: Blog com Markdown - Implementando leitura de arquivos reais com Antigravity
excerpt: Como implementei a possibilidade de indexar e processar arquivos .md no projeto com ajuda do Antigravity
date: 2024-09-02
image_path:
tags:
  - Frontend
  - IA
---
Este post descreve todo o processo de implementação da feature de Posts utilizando arquivos markdown reais alocados no projeto, além das correções e melhorias implementadas no carregamento de arquivos .md, na apresentação em layout de cards e na experiência de leitura no projeto raeccoon.dev.

Como desenvolvedora predominantemente Backend e que não atua no dia a dia com Front-end, fazer a manutenção do blog com posts hard-coded em arquivos TypeScript era desafiador. Eu queria, de algum modo, melhorar e facilitar minha vida, escrevendo diretamente em Markdown.

Para resolver isso sem me afundar em configurações complexas, decidi usar inteligência artificial ao meu favor. O resultado foi a transformação completa da engenharia de conteúdo do meu site — tudo de forma limpa, dinâmica e modular.

## Primeira Ideia: Substituindo Bundlers Rígidos por Parsing Dinâmico

O desafio inicial parecia pedir integrações tradicionais como plugins de Rollup/MDX para transformar arquivos Markdown em módulos React individuais. No entanto, essa abordagem traz uma complexidade desnecessária de configuração e dificulta o carregamento dinâmico.

### Contexto e Problema Identificado

* **Problema:** Os arquivos .md criados em `src/data/posts/` não apareciam na página do Blog.
* **Causa Raiz:** O arquivo `index.ts` tentava importar arquivos via `import.meta.glob('./posts/*.md')` em vez de referenciar a pasta atual `./*.md`.

### Abordagem Escolhida

A solução mais inteligente foi combinar o import.meta.glob nativo do Vite com as bibliotecas gray-matter + react-markdown.

```ts
const modules = import.meta.glob('./posts/*.md', { as: 'raw', eager: true })
```

- Optei por **não usar `@mdx-js/rollup`** como plugin de bundler principal, pois ele exige transformar cada `.md` individualmente como módulo React (`.mdx`), o que complica o `import.meta.glob` e o carregamento dinâmico. 
- A combinação `gray-matter` (parse do frontmatter) + `react-markdown` (renderização) é igualmente poderosa, mais simples de configurar, e permite componentes React customizados via a prop `components` do `react-markdown`.

## Dependências Necessárias

| Pacote | Versão | Função |
|---|---|---|
| gray-matter | ^4.0.3 | Parseia o frontmatter YAML dos arquivos .md |
| react-markdown | ^9.x | Renderiza Markdown como JSX |
| remark-gfm | ^4.x | GitHub Flavored Markdown |
| rehype-highlight | ^7.x | Syntax highlighting |
| highlight.js | ^11.x | Engine de highlight |

## Arquitetura

```md
src/
├── data/
│   └── posts/
│       ├── index.ts
│       └── blog-markdown.md
├── components/
│   └── blog/
│       └── MarkdownRenderer.tsx
└── pages/
    └── BlogPost.tsx
```

## Mudanças Realizadas no Código

### Camada de dados

#### index.ts
- Manteve a interface `Post` idêntica (compatibilidade total)
- Adicionei a função `loadPosts()` que usa `import.meta.glob` para importar todos os `*.md` como strings raw
- Usei o `gray-matter` para parsear cada arquivo: extrai frontmatter como metadados e o resto como `content`
- Calculei `readTime` automaticamente baseado na contagem de palavras (se não fornecido no frontmatter)
- Exportei `posts` como array já processado (mesmo contrato de antes)

```ts
// Leitura dos arquivos .md em build time
const modules = import.meta.glob('./posts/*.md', { as: 'raw', eager: true })

// Para cada arquivo: gray-matter(rawContent) → { data: frontmatter, content: markdown }
// content é armazenado como string markdown e passado para MarkdownRenderer no BlogPost
```

### Componentes

#### MarkdownRenderer.tsx
- Componente que recebe `content: string` (markdown) e renderiza via `react-markdown`
- Configura `remarkPlugins: [remarkGfm]` e `rehypePlugins: [rehypeHighlight]`
- Define mapa de componentes customizados para estilizar `h1`, `h2`, `p`, `code`, `blockquote`, etc. com as classes Tailwind do projeto
- Importa tema de highlight (`highlight.js/styles/github-dark.css`)

---

### Páginas

#### BlogPost.tsx
- Passou a importar e usar `<MarkdownRenderer content={post.content} />` no lugar do `<div>` com `whitespace-pre-line`
- Adicionado o suporte à exibição da imagem do post (`image_path`) no topo do artigo
- Adicionado o botão "Voltar ao blog" no topo para melhor navegação

---

## Segunda Ideia: Capas de Posts e Filtro Busca por Tags no Blog

Gerenciar mídias em aplicações estáticas costuma exigir indexar as mídias nos diretórios dentro do projeto. Mas eu amo deixar as coisas bonitinhas, então não poderia deixar isso passar.

Como a nova feature de importar arquivos .md no Blog já passará a exigir uma adição grande de novos arquivos ao projeto a partir de agora, pensei em uma alternativa para evitar ficar colocando mais arquivos localmente no projeto, mas quando não tiver outro jeito, possibilitar a adição das capas de forma simples!

Dessa forma, a nova arquitetura passa a mapear e resolver automaticamente múltiplos formatos de origem para as capas dos artigos no atributo `image_path`:

- **URLs Externas:** Endereços externos diretos da web (`https://...`).
- **Diretório Público:** Caminhos absolutos para arquivos estáticos (`/imagens/post.png`).
- **Mídias Co-localizadas:** Imagens locais salvas diretamente na pasta dos artigos, resolvidas via padrão de busca global do Vite.

**⚠️Notas**
> As imagens de capa poderão ser informadas no frontmatter Markdown usando `image_path: 'https://...'` (URL da internet), `/caminho.png` (pasta `public/`) ou imagens locais em `src/data/posts/`. Também haverá suporte para aliases como `cover:` ou `image:`.
> As tags poderão ser informadas no frontmatter como lista YAML (`tags: [React, TypeScript]`), lista multilinha ou string separada por vírgulas (`tags: React, TypeScript`).


Essa abordagem unificou a exibição das capas nos cards da página inicial, no topo do artigo e nas prévias do blog, permitindo total liberdade na organização dos arquivos da forma que eu quiser.

**Tags Híbridas e Busca em Tempo Real sem Dependências Pesadas**
Tratar entradas de dados em arquivos estáticos costuma gerar erros quando diferentes autores — ou a mesma pessoa em dias diferentes — formatam metadados de maneiras distintas. A camada de tratamento de dados foi desenhada para aceitar tags no YAML em lista inline (`[React, Dev]`), lista multilinha ou string separada por vírgulas, padronizando tudo em arrays do TypeScript.

Com esses dados limpos, a interface do blog ganhou uma barra de busca dinâmica e chips interativos de filtro por tags com contagem em tempo real. Toda essa lógica roda no lado do cliente, integrada ao sistema de internacionalização (PT/EN) do site.

## Detalhes das Mudanças no Código

### Dados dos Posts (src/data/posts/)

**index.ts**
- Adicionar campo `tags: string[]` à interface `Post`.
- Suportar carregamento de imagens locais em `src/data/posts/` via `import.meta.glob` (`./*.{png,jpg,jpeg,webp,svg,gif,avif}`).
- Atualizar `parseFrontmatter` para suportar arrays de tags (formatos `[tag1, tag2]`, multilinha `- tag1`, ou texto separado por vírgula).
- Atualizar `parsePost` para resolver URLs da internet (`http://`, `https://`), caminhos absolutos (`/img.png`) e imagens relativas da pasta de posts.

```ts
// Carrega imagens locais da pasta de posts
const imageModules = import.meta.glob<string>('./*.{png,jpg,jpeg,webp,svg,gif,avif}', {
  query: '?url',
  import: 'default',
  eager: true,
})

// Tratamento de imagens com múltiplos formatos
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
    image_path = trimmedPath // URL externa ou caminho absoluto
  } else {
    // Busca imagem local na pasta de posts
    const normalizedLocalKey = `./${trimmedPath.replace(/^\.\//, '')}`
    if (imageModules[normalizedLocalKey]) {
      image_path = imageModules[normalizedLocalKey]
    } else {
      image_path = trimmedPath
    }
  }
}

// Tratamento de tags em múltiplos formatos
let tags: string[] = []
if (Array.isArray(data.tags)) {
  tags = data.tags.map(String).map((t) => t.trim()).filter(Boolean)
} else if (typeof data.tags === 'string' && data.tags.trim()) {
  tags = data.tags.split(',').map((t) => t.trim()).filter(Boolean)
}
```

### 1. Suporte a Imagens de Capa (Internet e Local)
- **URLs da Internet:** No frontmatter de qualquer arquivo Markdown (`.md`), é possível usar `image_path: 'https://...'` (ou aliases como `cover:`, `image:`).
- **Imagens Locais:** Suporte para imagens armazenadas na própria pasta `src/data/posts/` (ex: `image_path: './minha-imagem.png'` ou `image_path: 'minha-imagem.png'`) via `import.meta.glob` do Vite, ou caminhos da pasta `public/` (ex: `image_path: '/icon.png'`).
- **Exibição:** Renderizadas com animação de hover e gradiente nos cards do Blog (`src/pages/Blog.tsx`), no topo do artigo (`src/pages/BlogPost.tsx`) e no post em destaque da página principal `Home.tsx`.

### 2. Tags e Sistema de Busca/Filtragem
- **Frontmatter com Tags:** Suporta múltiplos formatos nos arquivos `.md`:
```yaml
tags:
  - Markdown
  - Tutorial
  - Dev
# Ou em linha:
tags: [Markdown, Tutorial, Dev]
# Ou separados por vírgula:
tags: Markdown, Tutorial, Dev
```
- **Barra de Busca Textual:** Pesquisa dinâmica em tempo real por título, resumo, conteúdo e tags do post.
- **Chips de Filtro por Tag:** Lista interativa com "Todos" e cada tag única com sua respectiva contagem de posts associados.
- **Tags nos Cards e Artigos:** Tags exibidas como mini-pills clicáveis nos cards para filtragem rápida, e exibidas no cabeçalho do artigo individual.
- **Tratamento de Busca Vazia:** Exibição amigável de estado vazio com botão "LIMPAR FILTROS" para restaurar a listagem.
- **Suporte a Idiomas:** Totalmente traduzido para Português e Inglês de acordo com a seleção de idioma do site.

---

### Componentes e Páginas (src/pages/)

**Blog.tsx**
- Adicionar barra de busca por texto (filtra por título, resumo e tags) com ícone de pesquisa e botão de limpar.
- Adicionar barra de filtros por tag com chips interativos ("Todos" + tags extraídas dinamicamente dos posts).
- Exibir tags nos cards dos posts com clique interativo para filtrar.
- Exibir imagens de capa nos cards com efeitos de hover e transição suaves.
- Adicionar estado visual quando nenhum resultado for encontrado com botão "Limpar Busca / Filtros".
- Suporte a i18n (PT / EN) para todos os novos textos da interface.

```tsx
// Extração dinâmica de tags com contagem
const allTags = useMemo(() => {
  const tagsMap = new Map<string, number>()
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1)
    })
  })
  return Array.from(tagsMap.entries()).sort((a, b) => b[1] - a[1])
}, [])

// Filtro combinado por busca e tag
const filteredPosts = useMemo(() => {
  const normalizedQuery = searchQuery.trim().toLowerCase()
  return posts.filter((blogPost) => {
    if (selectedTag && !blogPost.tags.includes(selectedTag)) return false
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
```

**BlogPost.tsx**
- Exibir a imagem de capa em destaque no topo do post.
- Exibir as tags do post no cabeçalho/metadados com ícones correspondentes.
- Suporte a i18n (PT / EN).

```tsx
{/* Imagem de capa com destaque */}
{post.image_path && (
  <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-black/10 dark:border-white/10 shadow-sm">
    <img
      src={post.image_path}
      alt={post.title}
      className="w-full h-full object-cover"
    />
  </div>
)}

{/* Tags no cabeçalho com ícones */}
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
```

---

# Troubleshooting: Markdownrender

## Problema
Para escrever esse artigo, estava tendo um problema onde o conteúdo simplesmente não era processado pela página. Testei com outro arquivo .md menor, e também com a metade do conteúdo que existia aqui e encontrei a causa raíz:

> O blog não conseguia processar posts com conteúdo grande (10+ minutos de leitura ≈ 13.000+ caracteres). 

O comportamento observado foi:
- Posts pequenos (5 min de leitura) funcionavam corretamente
- Posts grandes (10+ min de leitura) não apareciam na página
- Não havia erros óbvios no console durante o parsing
- O conteúdo era processado corretamente pelo `gray-matter` mas falhava na renderização

## Causa Raiz

O `react-markdown` estava travando ao processar conteúdo grande com todos os plugins ativos:
- `remark-gfm` (GitHub Flavored Markdown)
- `remark-github-alerts` (Alertas do GitHub)
- `rehype-highlight` (Syntax highlighting)

O travamento ocorria durante a renderização síncrona do componente, sem tratamento de erros ou feedback visual.

## Solução Implementada

### 1. Estado de Carregamento
Adicionado estado de carregamento no `MarkdownRenderer` para evitar travamento da interface:

```tsx
const [isRendering, setIsRendering] = useState(true)

useEffect(() => {
  setIsRendering(true)
  // Pequeno delay para evitar travamento ao processar conteúdo grande
  const timer = setTimeout(() => {
    setIsRendering(false)
  }, 100)
  return () => clearTimeout(timer)
}, [content])
```

### 2. Tratamento de Erros
Adicionado try-catch ao redor do `ReactMarkdown` com feedback visual:

```tsx
try {
  return <ReactMarkdown>{content}</ReactMarkdown>
} catch (error) {
  console.error('Erro ao renderizar Markdown:', error)
  return <ErrorMessage error={error} />
}
```

### 3. Feedback Visual
- Estado de "Carregando conteúdo..." durante processamento
- Mensagem de erro amigável caso a renderização falhe
- Logs de erro no console para debugging

## Arquivos Modificados

- `src/components/blog/MarkdownRenderer.tsx` - Adicionado tratamento de erros e estado de carregamento
- `src/data/posts/index.ts` - Mantido tratamento de erros no parsing (já existia)

## Testes Realizados

- ✅ Posts pequenos (5 min leitura) funcionam normalmente
- ✅ Posts grandes (10+ min leitura) funcionam corretamente
- ✅ Posts muito grandes (20+ min leitura) funcionam
- ✅ Feedback visual durante carregamento
- ✅ Tratamento de erros funciona corretamente

## Prevenção de Problemas Futuros

1. **Sempre tratar erros** em componentes que processam conteúdo externo
2. **Adicionar feedback visual** durante operações pesadas
3. **Testar com conteúdo de diferentes tamanhos** durante desenvolvimento
4. **Manter logs de erro** para debugging rápido

### Limitações Conhecidas

- O delay de 100ms é um compromisso entre performance e UX
- Para conteúdo extremamente grande (50+ min leitura), pode ser necessário:
  - Aumentar o delay
  - Implementar renderização por chunks
  - Considerar lazy loading de seções

## Referências

- `react-markdown` documentation: https://github.com/remarkjs/react-markdown
- `remark-gfm` plugin: https://github.com/remarkjs/remark-gfm
- `rehype-highlight` plugin: https://github.com/rehypejs/rehype-highlight
- `remark-github-alerts` plugin: https://github.com/delca85/remark-github-alerts

---
# Conclusão

Delegar a reestruturação da arquitetura para uma ferramenta de IA acelerou a transição para um ecossistema estático de alto desempenho. Hoje, publicar um novo artigo no blog exige apenas a criação de um arquivo `.md` simples e um commit no repositório, deixando toda a renderização e categorização a cargo da pipeline automatizada.

Qual foi a última vez que você usou uma ferramenta de inteligência artificial não apenas para gerar código rápido, mas para repensar a arquitetura de um projeto pessoal?

# Links Úteis
- [Antigravity](https://antigravity.dev) - Ferramenta de IA utilizada para implementar as novas features
- Devin - Ferramenta de IA utilizada para resolução dos problemas
- [Vite](https://vitejs.dev) - Build tool e dev server
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Parser de frontmatter YAML
- [react-markdown](https://github.com/remarkjs/react-markdown) - Renderizador de Markdown para React
