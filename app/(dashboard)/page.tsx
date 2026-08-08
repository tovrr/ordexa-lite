import type { Metadata } from "next";
import { Download } from "lucide-react";

import { dashboardStats, orders } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { DataTable } from "@/components/shared/data-table";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { recentOrdersColumns } from "@/components/dashboard/orders-columns";

export const metadata: Metadata = {
  title: "Dashboard",
};

/**
 * E-commerce overview — the template's hero page.
 *
 * Composition, top to bottom:
 * 1. `PageHeader` with a right-aligned action.
 * 2. Four `StatCard` KPIs (data: `dashboardStats`).
 * 3. `RevenueChart` with a range switcher (data: `revenueByRange`).
 * 4. "Recent Orders" via the generic `DataTable` (data: `orders`,
 *    columns: `ordersColumns`).
 *
 * All data comes from `lib/mock-data.ts` — swap those imports for real
 * fetches (this is a Server Component, so `await` works directly here).
 */
export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your store's performance."
        actions={
          <Button>
            <Download />
            Download report
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      <RevenueChart />

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={recentOrdersColumns} data={orders} />
        </CardContent>
      </Card>
    </>
  );
}
