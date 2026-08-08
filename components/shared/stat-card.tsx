import { TrendingDown, TrendingUp } from "lucide-react";

import type { Stat } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/** Props for {@link StatCard} — accepts any {@link Stat}-shaped object. */
export interface StatCardProps {
  stat: Stat;
  className?: string;
}

/**
 * KPI tile with a trend indicator.
 *
 * The value arrives pre-formatted (see `lib/mock-data.ts`) so the card stays
 * a pure presentation component; the trend direction picks the arrow and its
 * color (emerald for up, red for down).
 */
export function StatCard({ stat, className }: StatCardProps) {
  const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

  return (
    <Card className={cn("gap-2 py-5", className)}>
      <CardHeader className="flex flex-row items-center justify-between px-5">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {stat.title}
        </CardTitle>
        <stat.icon className="text-muted-foreground size-4" aria-hidden />
      </CardHeader>
      <CardContent className="px-5">
        <div className="text-2xl font-semibold tracking-tight tabular-nums">
          {stat.value}
        </div>
        <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              stat.trend === "up"
                ? "text-emerald-600 dark:text-emerald-500"
                : "text-red-600 dark:text-red-500"
            )}
          >
            <TrendIcon className="size-3.5" aria-hidden />
            {stat.change}
          </span>
          {stat.caption}
        </p>
      </CardContent>
    </Card>
  );
}
