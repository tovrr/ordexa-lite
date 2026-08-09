/**
 * Site-wide configuration.
 *
 * This is the first file to edit when customizing the template: the values
 * here drive the browser metadata (see `app/layout.tsx`), the sidebar
 * branding, and any place the product name appears in the UI.
 */

/** Shape of the global site configuration. */
export interface SiteConfig {
  /** Product / dashboard name, shown in the sidebar header and page titles. */
  name: string;
  /** Short tagline used for SEO metadata and the auth pages. */
  description: string;
  /** Canonical production URL (used for Open Graph metadata). */
  url: string;
  /** External links surfaced in the UI. */
  links: {
    /** Public repository of this free template. */
    repo: string;
    /** Where "Pro" menu entries link — the full Ordexa template. */
    pro: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Ordexa Lite",
  description:
    "Free admin dashboard starter built with Next.js, Tailwind CSS v4, and shadcn/ui — the open core of the Ordexa Pro template.",
  url: "https://ordexa-lite.netlify.app",
  links: {
    repo: "https://github.com/tovrr/ordexa-lite",
    pro: "https://gumroad.com/l/ordexa",
  },
};
