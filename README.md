# Portfolio website

A playground for my creativity. Everytime I have an idea and time, I will add something interesting or funny.

It should be fairly up to date with my GitHub/Linkedin profiles.

## 🚀 Noteable features

- **Excelent LightHouse performance**
- **Modern design**
- **Maximum responsivenes** [In progres...]
- **Natural animations** [In progress...]

## ⚙️ Technologies
- **[QwikCity](https://qwik.dev/qwikcity/overview/)** - A meta-framework built on top of [Qwik](https://qwik.dev/)
- **[Bun](https://bun.com/)** - A fast JavaScript runtime
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - A free-to-use deployment platform.

## Project Structure

[In progress...]

## 📖 Deployment

[In progress...]

Build the app
```shell
bun run build
```

(Optional) Preview the production build - a little bit more accurate than `bun preview`
```shell
bun serve
```

### Function Invocation Routes

Cloudflare Page's [function-invocation-routes config](https://developers.cloudflare.com/pages/platform/functions/routing/#functions-invocation-routes) can be used to include, or exclude, certain paths to be used by the worker functions. Having a `_routes.json` file gives developers more granular control over when your Function is invoked.
This is useful to determine if a page response should be Server-Side Rendered (SSR) or if the response should use a static-site generated (SSG) `index.html` file.

By default, the Cloudflare pages adaptor _does not_ include a `public/_routes.json` config, but rather it is auto-generated from the build by the Cloudflare adaptor. An example of an auto-generate `dist/_routes.json` would be:

```
{
  "include": [
    "/*"
  ],
  "exclude": [
    "/_headers",
    "/_redirects",
    "/build/*",
    "/favicon.ico",
    "/manifest.json",
    "/service-worker.js",
    "/about"
  ],
  "version": 1
}
```

In the above example, it's saying _all_ pages should be SSR'd. However, the root static files such as `/favicon.ico` and any static assets in `/build/*` should be excluded from the Functions, and instead treated as a static file.

In most cases the generated `dist/_routes.json` file is ideal. However, if you need more granular control over each path, you can instead provide you're own `public/_routes.json` file. When the project provides its own `public/_routes.json` file, then the Cloudflare adaptor will not auto-generate the routes config and instead use the committed one within the `public` directory.


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

To add a new component:
```shell
bun qwik new --barrel componentName
```

### Add Qwik Integration

Add additional functionality from the [Qwik Integration Store](https://qwik.dev/docs/integrations/)
```shell
bun qwik add <name>
```