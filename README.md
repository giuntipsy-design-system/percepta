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

All documentation is written in **English** due to the company’s international scope and to avoid misunderstandings across interdisciplinary teams.

---

## Recent additions

- **Modal component** (system-owned) and **Modal usage & behavior** pattern
- **Modal documentation page** under Components
- **VOL profile prototype** with unsaved changes confirmation flow

---

## Prototype layout & scroll behavior

For prototype pages (e.g., VOL flows), we use **window/page scroll** as the single scroll container.
This avoids nested scroll areas and keeps the footer behavior predictable. As a result:

- Headers in prototypes can use `position: sticky` and apply a subtle shadow when `window.scrollY > 0`.
- Sidebars are `position: sticky` and may have their own `overflow-y: auto` only when they exceed the viewport.
- Prototype layouts should avoid wrapping content in scrollable containers unless strictly necessary.

This behavior is enforced by the prototype layout shell styles.

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
