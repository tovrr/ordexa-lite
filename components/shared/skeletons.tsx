import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Composable loading skeletons matching the template's page anatomy.
 *
 * Used by the route-group `loading.tsx` files; reuse them (or compose new
 * ones from `<Skeleton>`) for any page that fetches real data. Keeping the
 * skeleton shapes close to the real layout avoids layout shift when the
 * content streams in.
 */

/** Mirrors `PageHeader`: title, description, and an action button. */
export function PageHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-9 w-36" />
    </div>
  );
}

/** Mirrors the 4-column `StatCard` grid. */
export function StatGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }, (_, i) => (
        <Card key={i} className="gap-2 py-5">
          <CardHeader className="px-5">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent className="space-y-2 px-5">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-3.5 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/** A large card with a chart-sized body. */
export function ChartCardSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[280px] w-full" />
      </CardContent>
    </Card>
  );
}

/** A card containing a toolbar row and table-like rows. */
export function TableCardSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 pb-4">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="ms-auto h-8 w-20" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-8 w-full" />
          {Array.from({ length: rows }, (_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
