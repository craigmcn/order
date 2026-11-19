# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start dev server at http://localhost:3090
yarn build        # Type-check (tsc -b) then build to dist/
yarn build:netlify # Two-pass Vite build to netlify/ and netlify/order/
yarn preview      # Preview the production build locally
yarn lint         # ESLint on src/
yarn format       # Prettier --write on all files
yarn format:check # Prettier --check (used in CI)
yarn test         # Vitest in watch mode
yarn test:run     # Vitest single pass
yarn coverage     # Vitest with coverage report
yarn test:e2e     # Playwright E2E tests (requires `yarn playwright install chromium` once)
```

**Tests:** Vitest 4 + Testing Library. Co-located alongside source files (`*.test.tsx` / `*.test.ts` next to the component or module they test). An automated `vitest-axe` accessibility scan of the rendered `App` runs as part of the normal unit-test suite. Vitest uses jsdom and runs workers with `--no-experimental-webstorage`: on Node 25+, Node's own global `localStorage` otherwise overrides jsdom's and breaks every `useLocalStorage` component.

**E2E:** Playwright (`playwright.config.ts`, Chromium only), specs in `e2e/`. Runs against `yarn dev` on port 3090. Excluded from Vitest's glob (`vitest.config.ts` adds `e2e/**` to `configDefaults.exclude`); run in CI only, not pre-commit (browser install + startup too slow for a hook).

## Architecture

A single-page React 19 + TypeScript app (Vite 8) that generates a randomized speaking order from a list of participant names.

**Data flow:**

1. `Form` collects participant names from a textarea, and optionally saves the list to `localStorage` via the "Remember this list" switch.
2. Submitting the form calls `parseNames()` on the textarea value, then stores the result in `NamesContext` via `setCurrentNames`.
3. `Results` reads `currentNames` from context, calls `generate()` (which shuffles the names and joins them with configured separators), and displays the output.
4. `CopyButton` copies the generated result to the clipboard.
5. `Aside` (slide-in panel on mobile, always-visible sidebar on md+) hosts `StoredNames` (list of saved name sets) and `Settings` (prefix, separators, oxford comma, theme).

**Context:** `NamesContext` / `NamesProvider` hold a single piece of state: `currentNames: INamesEntry | null` (`{ id: string | null; names: string[] }`). The `id` is a UUID that links a set of names to a `localStorage` key.

**Core utilities — `src/utils/index.ts`:**

- `parseNames(text)` — parses comma/space-delimited input; quoted strings with spaces (e.g. `"Jane Doe"`) are preserved as a single name.
- `shuffle<T>(array)` — Fisher-Yates in-place shuffle on a copy.
- `joinAnd(array, options)` — joins an array with a separator and last separator, with optional Oxford comma.
- `generate(names, options)` — calls `shuffle` then `joinAnd`; returns `null` if `names` is not an array.
- `copyToClipboard(text)` — async wrapper around `navigator.clipboard.writeText`.

**Options — `src/utils/constants.ts`:** `DEFAULT_OPTIONS` (`prefix`, `separator`, `lastSeparator`, `oxfordComma`) are persisted per-user in `localStorage` under the key `'options'`. `IOptions` is exported as `typeof DEFAULT_OPTIONS`.

**Stored lists:** Saved under `localStorage` key `'names'` as `Record<string, string[]>` (UUID → names array). `StoredNames` renders these as `ListItem` rows; deleting opens a `ConfirmDialog` (Headless UI `Dialog`).

## Security headers

`netlify.toml` sets only `[[headers]]` (build settings stay in the Netlify UI): a same-origin CSP (`'self'` everywhere, no `'unsafe-inline'`), `nosniff`, `Referrer-Policy` and `Permissions-Policy`. Netlify only; GitHub Pages can't set headers. `index.html`'s inline redirect/theme script is allowed by its SHA-256 hash, so editing it means updating the hash. `src/securityHeaders.test.ts` fails if they drift apart. Anything new that loads cross-origin needs a CSP change.

## Styling

Tailwind CSS v4 (`@tailwindcss/vite` plugin — no `tailwind.config.js` content array needed in v4). Dark mode is class-based (`dark:` variants toggled by adding/removing `dark` on `document.documentElement`). Theme preference is persisted in `localStorage` under `'theme'` (`'dark'` | `'light'` | `undefined` for system).

Icons are Font Awesome 7 Pro **Sharp Duotone Light** (`@fortawesome/sharp-duotone-light-svg-icons`), the cross-repo default. Re-export each icon from `src/icons.ts` (which sets `autoAddCss = false` and bundles the CSS) and render `<FontAwesomeIcon icon={faX} />`; don't add other icon styles or a kit. Icons are fixed width by default in v7, so `fixedWidth` isn't needed. Installing needs `FONTAWESOME_NPM_AUTH_TOKEN` in the environment (CI uses `secrets.FONTAWESOME_NPM_AUTH_TOKEN`).

## TypeScript conventions

- Interfaces are prefixed with `I` (e.g. `IOptions`, `INamesEntry`).
- When extending HTML element attribute interfaces and overriding a property type (e.g. allowing `id?: string | null`), use `Omit<HTMLAttributes<HTMLElement>, 'id'>` before adding the narrower type.
- Strict mode is on (`tsconfig.app.json`). No `any`.
- `tsconfig.app.json` declares `"types": ["vite/client"]` so `?raw` imports (used by `securityHeaders.test.ts`) type-check.
- Jest-dom and vitest-axe matchers are augmented via `/// <reference types="..." />` in `src/types/vitest.d.ts`.
- `tsconfig.node.json` covers `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`, and `e2e/`; it declares `"types": ["node"]` (via `@types/node`) so `process.env` resolves in those config/test files.

## ESLint

Config: `eslint.config.mjs` (ESLint 9 flat config, `typescript-eslint` recommended rules). Formatting rules are delegated to Prettier via `eslint-config-prettier`. Run `yarn lint` — no auto-fix flag, intentional.

## Prettier

Config: `.prettierrc` (`{}` — all defaults). Run `yarn format` to reformat, `yarn format:check` to verify. The pre-commit hook runs `format:check` before committing.

## Husky

Pre-commit hook (`.husky/pre-commit`) runs: `prettier --check`, `eslint src`, `tsc -b`, `vitest --run`. Install with `yarn install` (the `prepare` script runs Husky automatically).

## Progress

### Completed

- **PR #4** — initial modernization: Node 24, Vite 6→8, JS→TypeScript (strict), ESLint 9 flat config, Vitest 4, 82 tests, `test.yml` CI, CLAUDE.md, branch protection
- **PR #5** — follow-up: CODEOWNERS, README, remove unused deps (`test-console`, `eslint-plugin-import`, `eslint-plugin-promise`), delete `tailwind.config.js`, fix `handleNamesChange` throttle, add form tests (83 tests total)
- **PR #6** — favicon (standard icon set pointing to parent-app assets), remove `eslint-plugin-n`, error-recovery form test, fix `<title>` ordering in `index.html`
- **PR #7** — delete legacy `.eslintrc.cjs`, fix dev port 5510→3090 in `vite.config.ts`, bump Yarn 4.9.1→4.14.1
- **PR #8** — Husky pre-commit hook, reset `.prettierrc` to `{}` (Prettier defaults), add `eslint-config-prettier`, remove `@stylistic/eslint-plugin-js`, add `format`/`format:check` scripts, `format:check` step in CI, full reformat
- **PR #9 (merged)** — remove `enableScripts` + `approvedGitRepositories` from `.yarnrc.yml`; add `build:netlify` script; replace non-standard `rollupOptions` dual-output in `vite.config.ts` with `base: "./"` only; add `netlify/` to `.gitignore`
- **PR #14 (merged)** — bump `actions/checkout` and `actions/setup-node` to v7 in `test.yml`
- **PR #15 (merged)** — add `vitest-axe`, wire it into `tests/setup.ts` + `src/types/vitest.d.ts`, add an accessibility scan test to `src/App.test.tsx`
- **PR #16 (merged)** — add Playwright E2E testing: `playwright.config.ts`, `e2e/order.spec.ts` (golden-path generate + clear), `test:e2e` script, `tsconfig.node.json` covers `e2e/` + `@types/node`, `vitest.config.ts` excludes `e2e/**`, CI installs/caches Chromium and runs `yarn test:e2e`
- **PR #19** — replace the Font Awesome kit with Font Awesome 7 Pro Sharp Duotone Light (npm); `src/icons.ts` re-exports icons with `autoAddCss = false` (CSP-friendly); drop the `awesome.me` scope and kit typings
- **PR #21** — Yarn via Corepack only: remove `yarnPath` and the committed `.yarn/releases` bundle; CI runs `corepack enable` before `setup-node` (closes #20)

### Outstanding

All three open TODOs (GitHub Actions bump, axe tooling, Playwright E2E) are resolved. Check the [order GitHub Project](https://github.com/users/craigmcn/projects/9) for any newly filed issues.

### Key decisions

- `.prettierrc` is `{}` — Prettier defaults apply (double quotes, 80-char print width, `trailingComma: "all"`); single quotes used previously are gone
- `eslint-config-prettier` is the last entry in `eslint.config.mjs` — disables all ESLint rules that could conflict with Prettier formatting
- `@stylistic/eslint-plugin-js` removed — was imported but no rules were actually using the `@stylistic/js/` prefix; formatting is Prettier's job
- Husky hook uses `yarn tsc -b` (not bare `tsc -b`) — bare command relies on a global TypeScript install; `yarn` prefix resolves from `node_modules/.bin/`
- `lint` script has no `--fix` flag — intentional; fixes must be deliberate, not automatic
- `build:netlify` omits `tsc -b` — type checking is covered by `yarn build` in CI; Netlify only needs the Vite output
- `build:netlify` runs two separate `vite build` passes (not Rollup `output` array) — cleaner and consistent with the cross-repo standard (`currency` pattern)
