# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Marketing website for "Carnaval de Barranquilla en Utah", a Colombian folk-dance academy. Next.js 15 (App Router) + React 18 + TypeScript, styled with Tailwind CSS. All user-facing copy is in Spanish (`<html lang="es">`). The site is currently a static/front-end-only prototype — there is no backend wired up yet even though `firebase`, `stripe`, `next-auth`, `react-hook-form`, and `zod` are already listed as dependencies for planned future work.

## Commands

```bash
npm install          # install dependencies
npm run dev           # start dev server at http://localhost:3000
npm run build          # production build
npm run start           # serve the production build
npm run lint            # ESLint (extends next/core-web-vitals)
npm run type-check       # tsc --noEmit
```

There is no test suite or `test` script configured yet (see `DEVELOPMENT.md`'s "Testing (Próximo)" section — Jest/RTL are not installed).

## Architecture

- **Routing**: Next.js App Router. Every top-level folder under `app/` (`clases`, `inscripcion`, `galeria`, `blog`, `tienda`, `contacto`) is a route with its own `page.tsx`; there is no nested/dynamic routing yet. `app/layout.tsx` is the root layout — it sets page `<Metadata>` and wraps every route in the shared `Header`/`Footer` from `components/`.
- **No data layer**: pages are self-contained. Each route defines its own mock data as a local array at the top of `page.tsx` (e.g. `CLASES_DATA` in `app/clases/page.tsx`, `GALLERY_ITEMS` in `app/galeria/page.tsx`, `BLOG_POSTS` in `app/blog/page.tsx`, `PRODUCTS` in `app/tienda/page.tsx`) and maps over it directly — there is no `lib/`, CMS, or API route yet. To change displayed content (classes, gallery items, blog posts, shop products), edit the corresponding array in that page file.
- **Client vs. server components**: most pages are plain server components. Anything interactive (forms, cart state, filters, modals) is a separate component marked `'use client'` at the top (e.g. `components/InscripcionForm.tsx`, `components/ClassCard.tsx`). Keep that split when adding features — put interactive state in a small client component rather than converting a whole page.
- **Forms**: `InscripcionForm.tsx` currently manages its own state with `useState` and simulates submission with `console.log` + a delay — it does not call any API or use the `react-hook-form`/`zod` deps despite them being installed. If wiring up real submission, follow the existing `formData` shape in that file.
- **Firebase/Stripe/NextAuth**: declared as dependencies but not yet initialized anywhere in the codebase (no `lib/firebase.ts`, no NextAuth config, no Stripe client). `.env.example` documents the expected env vars for when these are wired up (`NEXT_PUBLIC_FIREBASE_*`, `STRIPE_*`, `SENDGRID_API_KEY`/`RESEND_API_KEY`, `NEXTAUTH_*`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`).
- **`next.config.js`**: allows remote images from any HTTPS host (`remotePatterns: [{ protocol: 'https', hostname: '**' }]`) and sets permissive CORS headers (`Access-Control-Allow-Origin: *`) on all `/api/:path*` responses — tighten this if/when real API routes with sensitive data are added.

## Styling conventions

- Custom Tailwind theme lives in `tailwind.config.ts` under the `carnival` color namespace (`carnival-yellow #FFC600`, `carnival-red #E31E24`, `carnival-blue #003DA5`, plus `carnival-gold` as an alias of yellow, `carnival-darkBg`, `carnival-lightBg`) and `primary`/`secondary`/`accent` shade scales. Use these tokens (`bg-carnival-red`, `text-carnival-gold`, etc.) instead of raw hex values in new components — some older docs (`README.md`) reference an earlier, now-superseded palette, so treat `tailwind.config.ts` as the source of truth.
- Three font families are configured, each with a Tailwind utility: `font-display` (Playfair Display, for headings), `font-body` (Inter, default body text), `font-accent` (Montserrat, for buttons/labels/emphasis).
- Reusable style hooks are defined as `@apply`-based classes in `app/globals.css`, not as React components: `.btn-primary`, `.btn-secondary`, `.btn-outline` for buttons, `.container-max` for the centered max-width content wrapper, `.glass-effect` for the frosted-glass panels, and a set of `.animate-*` classes (`animate-fade-in`, `animate-slide-up`, `animate-float`, `animate-glow`, etc.) backed by keyframes also in that file. Prefer these over ad hoc Tailwind animation utilities to stay visually consistent.
- Client components requiring interactivity must start with `'use client';` on the first line.

## Path alias

`@/*` maps to the repo root (see `tsconfig.json`), e.g. `import Header from "@/components/Header"`.
