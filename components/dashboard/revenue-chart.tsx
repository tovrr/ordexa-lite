"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  revenueByRange,
  type ChartRange,
  type RevenuePoint,
} from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Series configuration for the revenue chart. The `color` maps to the
 * CVD-validated `--chart-1` token defined in `app/globals.css`, which
 * automatically re-steps for dark mode.
 */
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

/** Range switcher options shown in the card header. */
const ranges: { value: ChartRange; label: string }[] = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
];

/** Format an ISO date (YYYY-MM-DD) as a short axis/tooltip label ("Jul 28"). */
function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Large revenue area chart with a 7/30/90-day range switcher.
 *
 * Data comes from `revenueByRange` in `lib/mock-data.ts`; swap that import
 * for your API and the chart works unchanged as long as the data satisfies
 * `RevenuePoint[]`.
 */
export function RevenueChart() {
  const [range, setRange] = React.useState<ChartRange>("30d");
  const data: RevenuePoint[] = revenueByRange[range];

  const total = React.useMemo(
    () => data.reduce((sum, point) => sum + point.revenue, 0),
    [data]
  );

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Revenue</CardTitle>
        <CardDescription>
          {formatCurrency(total, { maximumFractionDigits: 0 })} total for the
          last {ranges.find((r) => r.value === range)?.label}
        </CardDescription>
        <CardAction>
          <Tabs
            value={range}
            onValueChange={(value) => setRange(value as ChartRange)}
          >
            <TabsList>
              {ranges.map((r) => (
                <TabsTrigger key={r.value} value={r.value}>
                  {r.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={data} margin={{ left: 4, right: 4 }}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={formatDate}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={48}
              tickFormatter={(value: number) =>
                formatCurrency(value, {
                  notation: "compact",
                  maximumFractionDigits: 1,
                })
              }
            />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) => {
                    const iso = payload?.[0]?.payload?.date;
                    return typeof iso === "string" ? formatDate(iso) : null;
                  }}
                  formatter={(value) => (
                    <div className="flex w-full items-center justify-between gap-4">
                      <span className="text-muted-foreground">Revenue</span>
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {formatCurrency(Number(value))}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Area
              dataKey="revenue"
              type="monotone"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
