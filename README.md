# Portfolio website

A playground for my creativity. Everytime I have an idea and time, I will add something interesting or funny.

It should be fairly up to date with my GitHub/Linkedin profiles.

## 🚀 Noteable features

- **Excellent LightHouse performance**
- **Modern design**
- **Full responsiveness**
- **Natural animations**

## ⚙️ Technologies
- **[QwikCity](https://qwik.dev/qwikcity/overview/)** - A meta-framework built on top of [Qwik](https://qwik.dev/)
- **[Bun](https://bun.com/)** - A fast JavaScript runtime
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - A free-to-use deployment platform.

## Project Structure

- `public/` - Static assets, e.g. files that should be served as-is from the root
- `scripts/` - Helper scripts for various tasks, that are not part of the main application
- `src/` - The main application source code
- `src/components/` - Reusable components
- `src/routes/` - Application routes (pages)
- `src/utils/` - Utility functions
- `src/assets/` - Images, fonts, and other assets used in the application
- `src/locales/` - Translation files for different languages

## 📖 Deployment

Every commit to the `main` branch triggers a deployment to Cloudflare Pages. But in general, it does the following steps:

Build the app
```shell
bun run build
```

Deploy the `dist` folder to Cloudflare Pages
```shell
bun run deploy
```

--

(Optional) Preview the production build - a little bit more accurate than `bun preview`
```shell
bun serve
```

## 🐳 Development

### Start the server

There are different modes the application can be started in:

Without optimization
```shell
bun start # Auto-open Browser
bun dev # Don't auto-open Browser
```

With optimization
```shell
bun preview
```

### Add new Elements

To add a new route:
```shell
bun qwik new /path/to/endpoint
```

To add a new mdx page:
- Manually create a new folder in `src/routes` with an `index.mdx` file inside it. (The name of the folder is the path to the page)
- Add the following frontmatter to the top of the file:
```markdown
---
title: <some-title>
description: <some-description>
author: <some-author>
date: <some-date (YYYY-MM-DD)>
showInHeader: true
mdxLayout: true
---
import { MDXHeader } from '~/components/MDXHeader';

<MDXHeader />

<here-goes-the-content>
```

> Prefix the route with `_` to hide it from the menu.


To add a new component:
```shell
bun qwik new --barrel componentName
```

### Add Qwik Integration

Add additional functionality from the [Qwik Integration Store](https://qwik.dev/docs/integrations/)
```shell
bun qwik add <name>
```
### Translation
Currently, one has to do it semi-manually. Inline all strings that should be translated with `$localize\`<some-string>\``.
After that, simply run:

```shell
bun run i18n-extract
bun run translate-deepl # Optional. Uses the ./deepl_key.local to automatically translate all strings
```

## After publishing
- [ ] SEO optimization (for example reduce global.css size to 10kb)
- [x] Finish README.md
- [x] Translate privacy policy to all languages
- [ ] Add more projects
- [ ] Add blog posts
- [ ] Implement tests
- [ ] Improve mdx Layout (progress, jump to top, content overview, etc...)
