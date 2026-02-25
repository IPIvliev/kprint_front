# Frontend Testing Strategy

## Scope
- Cover all frontend domains: auth, panel, shop, print, study, company, gallery, contact pages, routing, and shared utilities.

## Levels
- Unit tests: utility functions and data transforms.
- Service contract tests: verify HTTP method, URL, and payload mapping for `src/services/*`.
- Route smoke tests: verify critical routes and route naming consistency.
- E2E tests (next phase): validate full user flows against running backend.

## Mandatory Rules
- Every bugfix must include a regression test.
- Every new feature must include:
  - 1 happy-path test.
  - 1 negative-path test.
- Any API endpoint change in frontend service layer must update its tests in the same PR.

## CI Policy
- On each PR:
  - `npm run check:api-types`
  - `npm run test:unit`
  - `npm run build:ci`

## Phase Plan
1. Baseline unit/service smoke suite (implemented).
2. Expand tests for store modules and critical panel components.
3. Add E2E smoke tests for top business flows:
   - Authentication.
   - Shop checkout.
   - Print order lifecycle.
   - Study lifecycle.
   - Manager panel operations.
