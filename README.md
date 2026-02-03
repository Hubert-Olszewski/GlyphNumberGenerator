# Glyph Number Generator

App that generates a single scalable SVG symbol for a natural number.

## Requirements

- Node.js version from `.nvmrc`
- npm

## Install

```bash
nvm i
npm i
```

## Run (dev)

```bash
npm run dev
```

Open: http://localhost:5173

## Build & Preview

```bash
npm run build
npm run preview
```

## Formatting & Linting

- Format + ESLint autofix:

```bash
npm run format
```

- Prettier only:

```bash
npm run prettier:fix
```

- Prettier check

```bash
npm run prettier:check
```

- ESLint:

```bash
npm run lint
```

## Tests

```bash
npm test
```

## Git hooks

This project uses Husky to run checks on commit.

If hooks are not installed automatically after `npm i`, run:

```bash
npm run prepare
```

## Tech stack

- React 19 + TypeScript
- Vite
- SVG generated as stroke-only polylines
- Vitest (unit tests)
- ESLint + Prettier
- Husky
