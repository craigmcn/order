# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start dev server at http://localhost:3090
yarn build        # Type-check (tsc -b) then build to dist/
yarn preview      # Preview the production build locally
yarn lint         # ESLint on src/
yarn test         # Vitest in watch mode
yarn test:run     # Vitest single pass
yarn coverage     # Vitest with coverage report
```

**Tests:** Vitest 4 + Testing Library. Co-located alongside source files (`*.test.tsx` / `*.test.ts` next to the component or module they test).

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

## Styling

Tailwind CSS v4 (`@tailwindcss/vite` plugin — no `tailwind.config.js` content array needed in v4). Dark mode is class-based (`dark:` variants toggled by adding/removing `dark` on `document.documentElement`). Theme preference is persisted in `localStorage` under `'theme'` (`'dark'` | `'light'` | `undefined` for system).

Icons are Font Awesome Light (`fal`) from a private kit (`@awesome.me/kit-84f13ff524`). The kit requires `FONTAWESOME_NPM_AUTH_TOKEN` set in the environment (CI uses `secrets.FONTAWESOME_NPM_AUTH_TOKEN`). Always access icons via `byPrefixAndName.fal['icon-name']`.

## TypeScript conventions

- Interfaces are prefixed with `I` (e.g. `IOptions`, `INamesEntry`).
- When extending HTML element attribute interfaces and overriding a property type (e.g. allowing `id?: string | null`), use `Omit<HTMLAttributes<HTMLElement>, 'id'>` before adding the narrower type.
- Strict mode is on (`tsconfig.app.json`). No `any`.
- The private FA kit has no published types — its ambient declaration is in `src/types/awesome-me.d.ts`.
- Jest-dom matchers are augmented via `/// <reference types="@testing-library/jest-dom" />` in `src/types/vitest.d.ts`.

## ESLint

Config: `eslint.config.mjs` (ESLint 9 flat config, `typescript-eslint` recommended rules). Run `yarn lint` — no auto-fix flag, intentional.

