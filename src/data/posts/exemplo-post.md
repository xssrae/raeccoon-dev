---
slug: exemplo-post
title: Exemplo — Recursos do Blog
excerpt: Um post de demonstração mostrando todos os elementos suportados pelo sistema de blog com Markdown.
date: '2024-09-01'
image_path: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'
tags:
  - Markdown
  - Tutorial
  - Dev
---

Bem-vindo ao exemplo de post! Este arquivo demonstra todos os elementos suportados pelo sistema de blog baseado em Markdown.

## Texto e Parágrafos

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Você pode escrever parágrafos normalmente, e eles serão formatados automaticamente com espaçamento e tipografia adequados.

Parágrafos separados por uma linha em branco tornam-se blocos distintos.

## Formatação Inline

Você pode usar **negrito**, *itálico*, ~~riscado~~ e `código inline` diretamente no texto.

Links também funcionam: [visite o GitHub](https://github.com/xssrae).

## Imagens
Imagens da **internet** funcionam? ![teste-img](https://www.orkin.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F7bnun0x6hsse%2F62f6VCSamwop9tQZaqmiAu%2F53f35803a0f54fba208f0f82fa76848b%2FRaccoon_1280x720.png&w=1080&q=75)
> SIMMMMM!

## Listas

### Não-ordenada

- Item um
- Item dois
  - Sub-item aninhado
- Item três

### Ordenada

1. Primeiro passo
2. Segundo passo
3. Terceiro passo

## Blocos de Código

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

```typescript
// Exemplo em TypeScript
interface Post {
  slug: string
  title: string
  content: string
}

function getPost(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug)
}
```

## Citações

> "Qualquer tecnologia suficientemente avançada é indistinguível da magia."  
> — Arthur C. Clarke

## Tabelas (GitHub Flavored Markdown)

| Recurso        | Suportado |
|----------------|-----------|
| Negrito        | ✅        |
| Itálico        | ✅        |
| Código         | ✅        |
| Tabelas        | ✅        |
| Syntax Highlight | ✅      |
| Imagens        | ✅        |

## Separador

---

Pronto! Agora é só criar seus próprios arquivos `.md` na pasta `src/data/posts/` e eles aparecerão automaticamente no blog.
