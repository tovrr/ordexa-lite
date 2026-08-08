import * as React from "react";

import { cn } from "@/lib/utils";

/** Props for {@link PageHeader}. */
export interface PageHeaderProps extends React.ComponentProps<"div"> {
  /** Page title, rendered as the page's `h1`. */
  title: string;
  /** Optional supporting copy under the title. */
  description?: string;
  /**
   * Optional right-aligned action area — typically one or two `<Button>`s.
   * Wraps below the title on small screens.
   */
  actions?: React.ReactNode;
}

/**
 * Standard page heading used at the top of every dashboard page.
 *
 * ```tsx
 * <PageHeader
 *   title="Dashboard"
 *   description="Overview of your store."
 *   actions={<Button>Download report</Button>}
 * />
 * ```
 */
export function PageHeader({
  title,
  description,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
