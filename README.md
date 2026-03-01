# printer

## Project setup
```
npm install
```

Recommended runtime for CI and tests: `Node.js 18+`.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Runs unit tests
```
npm run test:unit
```

### Runs unit tests in watch mode
```
npm run test:unit:watch
```

### Runs unit tests with coverage report
```
npm run test:unit:coverage
```

### Installs browser for e2e smoke tests
```
npm run test:e2e:install
```

### Runs e2e smoke tests
```
npm run test:e2e:smoke
```

## Testing Strategy
- `Unit`: utility functions and service-layer request wrappers.
- `Smoke`: key routes and critical user flows surface checks (route map and endpoint contracts).
- `Regression rule`: each bugfix must include at least one automated test reproducing the bug.
- `Feature rule`: each new feature must include happy-path and negative-path tests.

Detailed policy and rollout plan: `docs/testing-strategy.md`.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Deploy to Jino Shared Hosting
1. Configure production env in `.env.production` (already prepared for `gorkyliquid.ru` / `bk.gorkyliquid.ru`).
2. Build frontend:
```bash
npm install
npm run build
```
3. Upload the **contents** of `dist/` to your domain web root on Jino (`public_html` or configured site folder).
4. Keep `.htaccess` from `dist/` to enable SPA history fallback (`/news/...`, `/shop/...` direct links).
5. After upload, verify:
`/`, `/shop`, `/news`, `/dealers`, `/sitemap.xml`, `/robots.txt`.

## Gallery Page Keys (memo)
- `GalleryBlock` sends `page` filter from prop `page-key` to `/api/gallery-categories/`.
- Configure key here: `src/components/elements/GalleryBlock.vue` (`params.page = this.pageKey`).

Current usage in frontend:
- `src/views/Study/MainStudy.vue`: `page-key="study"` 
- `src/views/Print/MainPrint.vue`: `page-key="print"` 
- `src/views/About.vue`: `page-key="about-us"` 
- `src/components/GalleryPage.vue`: no `page-key`

## Companies

- `print`: `MainPrint.vue`
- `dealers`: `Dealers.vue`
- `study`: `AlreadyStudy.vue`
