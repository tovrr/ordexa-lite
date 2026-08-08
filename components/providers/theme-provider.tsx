"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Client boundary around `next-themes`.
 *
 * Kept as its own component so the root layout can stay a Server Component
 * while theme switching remains client-side. Configure default theme and
 * behavior where this is used in `app/layout.tsx`.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
