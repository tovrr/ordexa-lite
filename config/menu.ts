/**
 * Navigation configuration.
 *
 * The sidebar and the ⌘K command menu are both rendered from `menuConfig` —
 * there is no hardcoded navigation anywhere in the template. To add, remove,
 * or reorder menu entries, edit this file only.
 *
 * Three building blocks are available:
 *
 * - {@link NavItem}    — a plain link with an icon and optional badge.
 * - {@link NavGroup}   — a collapsible entry that expands into sub-links.
 * - {@link NavSection} — a titled group of the two above (renders as a
 *                        labeled sidebar section).
 *
 * The "Pro" section entries link to the full Ordexa template (set the URL
 * in `config/site.ts` → `links.pro`). Replace them with your own pages as
 * you build — see the README's "Adding a page" walkthrough.
 */
import {
  BarChart3,
  Gauge,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Settings,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";

import { siteConfig } from "@/config/site";

/** A single navigation link rendered in the sidebar. */
export interface NavItem {
  /** Visible label. */
  title: string;
  /** Route the item links to. Use `#` for not-yet-built pages. */
  href: string;
  /** Icon shown before the label (any `lucide-react` icon). */
  icon: LucideIcon;
  /** Optional badge rendered at the end of the row (e.g. a count or "New"). */
  badge?: string | number;
  /** Open in a new tab with `rel="noreferrer"`. */
  external?: boolean;
}

/** A sub-link nested inside a collapsible {@link NavGroup}. */
export interface NavSubItem {
  title: string;
  href: string;
  badge?: string | number;
}

/** A collapsible sidebar entry that expands to reveal {@link NavSubItem}s. */
export interface NavGroup {
  title: string;
  icon: LucideIcon;
  badge?: string | number;
  items: NavSubItem[];
}

/** Any renderable sidebar entry. */
export type NavEntry = NavItem | NavGroup;

/** A titled sidebar section containing a list of entries. */
export interface NavSection {
  title?: string;
  items: NavEntry[];
}

/** The full navigation tree consumed by the sidebar and command menu. */
export interface MenuConfig {
  sections: NavSection[];
}

/**
 * Type guard distinguishing collapsible groups from plain links.
 * Prefer this over ad-hoc `"items" in entry` checks in components.
 */
export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}

/** Shorthand for the Pro upsell entries below. */
const pro = (title: string, icon: LucideIcon): NavItem => ({
  title,
  href: siteConfig.links.pro,
  icon,
  badge: "Pro",
  external: true,
});

export const menuConfig: MenuConfig = {
  sections: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Pro",
      items: [
        pro("SaaS Dashboard", Gauge),
        pro("Analytics", BarChart3),
        pro("Orders", ShoppingCart),
        pro("Products", Package),
        pro("Customers", Users),
        pro("Settings", Settings),
      ],
    },
    {
      title: "General",
      items: [
        {
          title: "Support",
          href: "#",
          icon: LifeBuoy,
        },
      ],
    },
  ],
};
