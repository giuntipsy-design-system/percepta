# Percepta

**Percepta** is the design system for Giunti Psychometrics digital products.

It provides a shared foundation to build consistent, accessible and scalable user interfaces, with a clear separation between **design decisions** and **technical implementation**.

---

## What this repository is

This repository contains the **technical implementation** of the Percepta design system.

Here you will find:
- Design tokens (JSON, semantic and technical)
- Global styles and token consumption
- An Angular-based documentation site
- Implementation guidelines for frontend development

This repository is primarily intended for **frontend developers**.

---

## What this repository is NOT

This repository does **not** contain:
- Brand guidelines
- Visual foundations (color, typography, spacing)
- Design principles or UI decisions

All design-related documentation lives here and is the **single source of truth for design**:

👉 **https://design.giuntipsy.com**

---

## Documentation

The documentation site focuses on *how to use and implement* the system.

It is structured around:
- **Getting started** – system overview, scope and design → code workflow
- **Tokens** – token architecture, semantics and theming
- **Components** – usage and implementation details
- **Patterns** – interaction and layout guidance (e.g. Modal usage & behavior)

Visual design guidelines are always referenced externally.

---

## Recent additions

- **Modal component** (system-owned) and **Modal usage & behavior** pattern
- **Modal documentation page** under Components
- **VOL profile prototype** with unsaved changes confirmation flow

---

## Tech stack

- Angular
- PrimeNG
- SCSS
- Design tokens (JSON)

---

## Token build

When changing tokens, regenerate compiled outputs:

```bash
npm run build:tokens
```

---

## Deploy docs

```bash
npx ng build docs --base-href /percepta/
npx angular-cli-ghpages --dir=dist/docs/browser
```

---

## Project structure (high level)

```text
apps/
  docs/                → Angular documentation site
    src/
      app/              → Pages, layouts and routing
      styles.scss       → Global styles
      tokens.scss       → Token consumption
tokens/
  *.json                → Design tokens (implementation source of truth)

.angular/               → Angular cache
node_modules/           → Dependencies
