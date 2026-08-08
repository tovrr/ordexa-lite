import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with conflict resolution.
 *
 * Every component in the template accepts a `className` prop and merges it
 * through `cn`, so consumer-supplied classes always win over the defaults.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as a compact USD currency string (e.g. `$45,231.89`).
 *
 * Swap the locale/currency here to localize every monetary value in the
 * template at once — all components format money through this helper.
 */
export function formatCurrency(
  value: number,
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  }).format(value);
}

/**
 * Format a number with thousands separators (e.g. `12,234`).
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
