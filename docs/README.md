# TicketKenya Documentation

Welcome to the project documentation. This guide covers all public APIs, components, hooks, utilities, and application routes.

## Contents
- [Routes](./routes.md)
- [Components](./components/README.md)
  - [UI Primitives](./components/ui.md)
  - [App Components](./components/app.md)
- [Hooks](./hooks.md)
- [Utilities](./utils.md)

## Quickstart

- Install and run the app:
```bash
npm i
npm run dev
```

- Ensure global providers are mounted in `src/App.tsx` (already configured):
  - `QueryClientProvider` from `@tanstack/react-query`
  - `TooltipProvider` from `@/components/ui/tooltip`
  - `Toaster` from `@/components/ui/toaster`
  - `Toaster as Sonner` from `@/components/ui/sonner`

- Import UI primitives from `@/components/ui/*` and app components from `@/components/*`.

## Conventions

- All UI primitives are accessible via files in `src/components/ui/*` and are lightweight wrappers around Radix UI and utility styles.
- Import paths in examples use the base alias `@` which maps to `src/`.