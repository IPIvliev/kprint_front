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

## Testing Strategy
- `Unit`: utility functions and service-layer request wrappers.
- `Smoke`: key routes and critical user flows surface checks (route map and endpoint contracts).
- `Regression rule`: each bugfix must include at least one automated test reproducing the bug.
- `Feature rule`: each new feature must include happy-path and negative-path tests.

Detailed policy and rollout plan: `docs/testing-strategy.md`.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
