---
slug: exemplo-post
title: Exemplo — Recursos do Blog
excerpt: Um post de demonstração mostrando todos os elementos suportados pelo sistema de blog com Markdown.
date: '2024-09-01'
image_path: ''
---

Bem-vindo ao exemplo de post! Este arquivo demonstra todos os elementos suportados pelo sistema de blog baseado em Markdown.

## Texto e Parágrafos

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Você pode escrever parágrafos normalmente, e eles serão formatados automaticamente com espaçamento e tipografia adequados.

Parágrafos separados por uma linha em branco tornam-se blocos distintos.

## Formatação Inline

Você pode usar **negrito**, *itálico*, ~~riscado~~ e `código inline` diretamente no texto.

Links também funcionam: [visite o GitHub](https://github.com/xssrae).

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
