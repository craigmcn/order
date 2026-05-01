[![Netlify Status](https://api.netlify.com/api/v1/badges/51cb579a-2de3-439d-93b3-163931385cc7/deploy-status)](https://app.netlify.com/sites/bejewelled-baklava-c860a7/deploys)

# order

Generate a randomized speaking order from a list of participant names.

## Usage

1. Enter participant names in the textarea — comma- or space-separated, or one per line. Names that contain spaces can be quoted (e.g. `"Jane Doe"`).
2. Optionally toggle **Remember this list** to save the list for next time.
3. Click **Generate** to produce a randomized order.
4. Use the **Copy** button to copy the result to the clipboard.

Settings (prefix, separators, Oxford comma, dark/light theme) are available in the sidebar.

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) — strict mode
- [Vite 8](https://vite.dev/) with [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react)
- [Tailwind CSS v4](https://tailwindcss.com/) — class-based dark mode
- [Headless UI](https://headlessui.com/) — accessible dialog/switch primitives
- [Font Awesome](https://fontawesome.com/) icons via a private kit

## Development

Requires Node 24 and Yarn 4. A `FONTAWESOME_NPM_AUTH_TOKEN` environment variable is needed to install the private Font Awesome kit.

```bash
yarn install
yarn dev       # start dev server
yarn lint      # ESLint (no auto-fix)
yarn test      # Vitest in watch mode
yarn test:run  # single-pass test run
yarn coverage  # coverage report
yarn build     # type-check then build to dist/
```

## Deployment

Deployed automatically to [Netlify](https://www.netlify.com/) on push to `main`. The production build is also served at [www.craigmcn.com/order/](https://www.craigmcn.com/order/) via the parent `craigmcnaughton` app.
