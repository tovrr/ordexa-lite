import {
  PageHeaderSkeleton,
  StatGridSkeleton,
  TableCardSkeleton,
} from "@/components/shared/skeletons";

/**
 * Route-group loading state.
 *
 * Shown inside the dashboard shell (sidebar + header stay interactive)
 * while any `(dashboard)` route's server component is streaming. The demo
 * pages resolve instantly from mock data, so you'll only see this once
 * pages fetch real data — it's wired up now so nothing breaks when they do.
 */
export default function DashboardLoading() {
  return (
    <>
      <PageHeaderSkeleton />
      <StatGridSkeleton />
      <TableCardSkeleton />
    </>
  );
}
