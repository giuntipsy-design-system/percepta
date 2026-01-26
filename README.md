# Percepta

**Percepta** is the design system for Giunti Psychometrics digital products.

It provides a shared foundation to build consistent, accessible and scalable user interfaces across platforms.

---

## What this repository is

This repository contains the **technical implementation** of the Percepta design system.

Here you will find:
- Design tokens (semantic and technical)
- Component implementations
- Documentation for developers
- Integration guidelines (Angular / PrimeNG)

This repo is intended primarily for **frontend developers**.

---

## What this repository is NOT

This repository does **not** contain:
- Brand guidelines
- Visual foundations (color, typography, spacing)
- Design principles or UI decisions

All design-related documentation lives here:

👉 **https://design.giuntipsy.com**

That site is the **single source of truth for design**.

---

## Documentation

The documentation site is structured as follows:

- **Getting started**  
  Overview of the system, scope, and design → code workflow.

- **Tokens**  
  Token architecture, semantics, theming and platform mappings.

- **Components**  
  Component usage, APIs, states, and implementation details.

Each section is focused on *how to use and implement* the system, not on visual design decisions.

---

## Tech stack

- Angular
- PrimeNG
- SCSS
- Design tokens (JSON / CSS variables)

---

## Project structure (high level)

```text
apps/
  docs/          → Documentation site
packages/
  tokens/        → Design tokens
  components/    → Component implementations
