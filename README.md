# {xssrae.dev}

https://raedev.netlify.app/

---

## Tecnologias e ferramentas

O projeto foi construído utilizando as seguintes ferramentas modernas do ecossistema web:

*   **[React 19](https://react.dev/)** - Biblioteca principal para construção da interface.
*   **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para maior segurança e previsibilidade do código.
*   **[Vite](https://vitejs.dev/)** - Bundler ultra-rápido para a experiência de desenvolvimento.
*   **[Tailwind CSS](https://tailwindcss.com/)** - Estilização utilitária e design responsivo.
*   **[Framer Motion](https://www.framer.com/motion/)** - Criação de animações fluidas e interações avançadas.
*   **[Spotify API](https://developer.spotify.com/)** - Integração opcional para exibir o que está tocando em tempo real.

---

## Onde editar

*   `src/data/profile.ts` - nome, contato, bio, formação, certificações e habilidades.
*   `src/data/projects/pt.ts` e `src/data/projects/eng.ts` - projetos em português e inglês.
*   `src/data/posts/index.ts` - posts do blog.
*   `src/assets/profile.jpg` - foto de perfil.

### Capas dos projetos

Coloque a imagem em `public/projects/` e adicione o campo opcional `image` ao mesmo projeto nos dois idiomas:

```ts
image: {
  src: '/projects/nome-da-imagem.webp',
  alt: 'Descrição objetiva do conteúdo da imagem',
},
```

Quando esse campo não é informado, o card exibe uma capa gráfica padrão.

---
