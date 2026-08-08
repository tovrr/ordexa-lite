# Ordexa Lite — Free Next.js Admin Dashboard Starter

The free, MIT-licensed core of [Ordexa](https://gumroad.com/l/ordexa): a
production-quality admin dashboard starter built with **Next.js 16 (App
Router)**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui** — minimal,
data-dense, with flawless dark/light mode.

![Stack](https://img.shields.io/badge/Next.js-16-black) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8) ![License](https://img.shields.io/badge/license-MIT-green)

## What's inside (free, forever)

- **E-commerce dashboard** — KPI stat cards with trend indicators, a revenue
  area chart with 7/30/90-day range switching, and a recent-orders table.
- **Configuration-driven navigation** — the sidebar *and* the ⌘K command
  menu render from one typed config (`config/menu.ts`). No hardcoded menus.
- **Advanced layout** — collapsible sidebar (icon mode, `⌘/Ctrl+B`), mobile
  drawer, sticky glassmorphism header, route-aware active states.
- **Generic `DataTable`** — strictly typed on TanStack Table v8 with sorting
  wired up; reusable for any entity.
- **Colorblind-validated chart colors**, tuned separately for light & dark.
- **Auth starter** — a polished `/login` with react-hook-form + Zod.
- **Resilience** — styled 404, error boundaries, streaming skeletons.
- **Strict TypeScript + JSDoc everywhere**, zero TODOs.

## Quickstart

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customizing

- **Branding**: `config/site.ts` (name, description, links).
- **Navigation**: `config/menu.ts` — plain links, badges, and collapsible
  groups; the sidebar and ⌘K menu update automatically.
- **Theming**: every design token lives in `app/globals.css` (Tailwind v4 —
  no config file). Change `--primary` (and `--ring`/`--sidebar-primary`) to
  rebrand; `--radius` for corner rounding.
- **Adding a page**: create `app/(dashboard)/your-page/page.tsx`, point a
  menu entry at it. Active states and the command menu pick it up.
- **Real data**: `lib/mock-data.ts` exports the demo data *and its types* —
  replace the data with your API calls and keep the types as your contract.

## Ordexa Pro

Lite is the core. The full template adds, on the same architecture:

| Lite (this repo) | [Ordexa Pro](https://gumroad.com/l/ordexa) |
| --- | --- |
| E-commerce dashboard | + SaaS dashboard & full Analytics page |
| Recent-orders table (sorting) | + Search, faceted filters, column toggle, pagination |
| — | + Orders / Products / Customers management pages |
| Login page | + Register, forgot & reset password |
| — | + Settings (forms cookbook), Pricing, Invoice, Profile |
| One brand color | + 4 switchable brand presets |
| LTR | + Full RTL with a live toggle |

**[Get Ordexa Pro →](https://gumroad.com/l/ordexa)**

## License

MIT — free for personal and commercial use. See [LICENSE.md](./LICENSE.md).

Built on Next.js, React, Tailwind CSS, Radix UI, shadcn/ui, TanStack Table,
Recharts, react-hook-form, Zod, next-themes, and Lucide — all MIT.
