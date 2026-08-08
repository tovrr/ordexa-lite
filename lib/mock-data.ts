/**
 * Mock data for the demo dashboard.
 *
 * Everything rendered on the overview page comes from this file. When
 * wiring the template to a real backend, replace these exports with your
 * API calls — the types below double as the contract your data layer
 * should satisfy, so the components keep working unchanged.
 */
import {
  CreditCard,
  DollarSign,
  Percent,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Stats                                                                     */
/* -------------------------------------------------------------------------- */

/** Direction of a stat's movement versus the previous period. */
export type Trend = "up" | "down";

/** A single KPI tile on the dashboard. */
export interface Stat {
  /** Metric name, e.g. "Total Revenue". */
  title: string;
  /** Pre-formatted display value, e.g. "$45,231.89". */
  value: string;
  /** Pre-formatted delta versus the previous period, e.g. "+20.1%". */
  change: string;
  /** Whether the metric moved up or down. Drives the arrow and its color. */
  trend: Trend;
  /** Supporting copy under the delta, e.g. "vs. last month". */
  caption: string;
  /** Icon shown in the tile header. */
  icon: LucideIcon;
}

export const dashboardStats: Stat[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    caption: "vs. last month",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+12.4%",
    trend: "up",
    caption: "vs. last month",
    icon: ShoppingCart,
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "-0.4%",
    trend: "down",
    caption: "vs. last month",
    icon: Percent,
  },
  {
    title: "Net Profit",
    value: "$12,834.20",
    change: "+8.2%",
    trend: "up",
    caption: "vs. last month",
    icon: CreditCard,
  },
];

/* -------------------------------------------------------------------------- */
/*  Revenue chart                                                             */
/* -------------------------------------------------------------------------- */

/** Selectable time ranges for the revenue chart. */
export type ChartRange = "7d" | "30d" | "90d";

/** One point on the revenue chart. */
export interface RevenuePoint {
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  /** Revenue for that day in USD. */
  revenue: number;
}

/**
 * Deterministic pseudo-random revenue series (a fixed seed keeps server and
 * client renders identical — no hydration mismatch, stable screenshots).
 */
function generateRevenueSeries(days: number, base: number): RevenuePoint[] {
  const points: RevenuePoint[] = [];
  // Fixed end date so the demo data never shifts between renders/builds.
  const end = new Date("2026-08-01T00:00:00Z");
  let seed = 42;
  const random = () => {
    // Mulberry32 — tiny deterministic PRNG, plenty for demo data.
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(end);
    date.setUTCDate(end.getUTCDate() - i);
    // Weekly seasonality + noise + slight upward drift.
    const weekday = date.getUTCDay();
    const weekendDip = weekday === 0 || weekday === 6 ? 0.78 : 1;
    const drift = 1 + (days - i) * 0.004;
    const noise = 0.75 + random() * 0.5;
    points.push({
      date: date.toISOString().slice(0, 10),
      revenue: Math.round(base * weekendDip * drift * noise),
    });
  }

  return points;
}

/** Revenue series per selectable range, consumed by the revenue chart. */
export const revenueByRange: Record<ChartRange, RevenuePoint[]> = {
  "7d": generateRevenueSeries(7, 1450),
  "30d": generateRevenueSeries(30, 1380),
  "90d": generateRevenueSeries(90, 1250),
};

/* -------------------------------------------------------------------------- */
/*  Orders                                                                    */
/* -------------------------------------------------------------------------- */

/** Lifecycle states an order can be in. */
export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "refunded"
  | "cancelled";

/** Customer attached to an order. */
export interface OrderCustomer {
  /** Full display name. */
  name: string;
  /** Contact email, shown under the name in the orders table. */
  email: string;
  /** Two-letter initials used for the avatar fallback. */
  initials: string;
}

/** A single order row in the "Recent Orders" table. */
export interface Order {
  /** Human-facing order reference, e.g. "ORD-7241". */
  id: string;
  customer: OrderCustomer;
  status: OrderStatus;
  /** Order total in USD. */
  amount: number;
  /** ISO date string (YYYY-MM-DD) the order was placed. */
  date: string;
}

export const orders: Order[] = [
  {
    id: "ORD-7241",
    customer: { name: "Olivia Martin", email: "olivia.martin@email.com", initials: "OM" },
    status: "completed",
    amount: 316.0,
    date: "2026-07-31",
  },
  {
    id: "ORD-7240",
    customer: { name: "Jackson Lee", email: "jackson.lee@email.com", initials: "JL" },
    status: "processing",
    amount: 242.5,
    date: "2026-07-31",
  },
  {
    id: "ORD-7239",
    customer: { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", initials: "IN" },
    status: "completed",
    amount: 837.0,
    date: "2026-07-30",
  },
  {
    id: "ORD-7238",
    customer: { name: "William Kim", email: "will.kim@email.com", initials: "WK" },
    status: "pending",
    amount: 132.25,
    date: "2026-07-30",
  },
  {
    id: "ORD-7237",
    customer: { name: "Sofia Davis", email: "sofia.davis@email.com", initials: "SD" },
    status: "completed",
    amount: 469.99,
    date: "2026-07-29",
  },
  {
    id: "ORD-7236",
    customer: { name: "Ethan Brown", email: "ethan.brown@email.com", initials: "EB" },
    status: "refunded",
    amount: 89.0,
    date: "2026-07-29",
  },
  {
    id: "ORD-7235",
    customer: { name: "Ava Wilson", email: "ava.wilson@email.com", initials: "AW" },
    status: "completed",
    amount: 1024.0,
    date: "2026-07-28",
  },
  {
    id: "ORD-7234",
    customer: { name: "Liam Garcia", email: "liam.garcia@email.com", initials: "LG" },
    status: "cancelled",
    amount: 54.75,
    date: "2026-07-28",
  },
  {
    id: "ORD-7233",
    customer: { name: "Mia Rodriguez", email: "mia.rodriguez@email.com", initials: "MR" },
    status: "processing",
    amount: 210.4,
    date: "2026-07-27",
  },
  {
    id: "ORD-7232",
    customer: { name: "Noah Martinez", email: "noah.martinez@email.com", initials: "NM" },
    status: "completed",
    amount: 620.0,
    date: "2026-07-27",
  },
  {
    id: "ORD-7231",
    customer: { name: "Emma Anderson", email: "emma.anderson@email.com", initials: "EA" },
    status: "pending",
    amount: 178.6,
    date: "2026-07-26",
  },
  {
    id: "ORD-7230",
    customer: { name: "Lucas Thomas", email: "lucas.thomas@email.com", initials: "LT" },
    status: "completed",
    amount: 402.15,
    date: "2026-07-26",
  },
];

/* -------------------------------------------------------------------------- */
/*  Notifications                                                             */
/* -------------------------------------------------------------------------- */

/** A single entry in the header's notifications dropdown. */
export interface AppNotification {
  /** Stable unique id (used as the React key). */
  id: string;
  /** Short headline. */
  title: string;
  /** Supporting detail line. */
  description: string;
  /** Relative time label, e.g. "2 min ago". */
  time: string;
  /** Unread notifications get a highlight dot. */
  unread: boolean;
}

export const notifications: AppNotification[] = [
  {
    id: "n-1",
    title: "New order received",
    description: "Olivia Martin placed order ORD-7241 ($316.00).",
    time: "2 min ago",
    unread: true,
  },
  {
    id: "n-2",
    title: "Payout processed",
    description: "Weekly payout of $8,420.00 was sent to your bank.",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: "n-3",
    title: "Low stock warning",
    description: "“Aurora Lamp” has only 4 units left.",
    time: "3 hrs ago",
    unread: false,
  },
  {
    id: "n-4",
    title: "New review",
    description: "Jackson Lee left a 5-star review on “Linen Throw”.",
    time: "Yesterday",
    unread: false,
  },
];

/* -------------------------------------------------------------------------- */
/*  Current user                                                              */
/* -------------------------------------------------------------------------- */

/** The signed-in user shown in the sidebar footer and header dropdown. */
export interface CurrentUser {
  name: string;
  email: string;
  /** Two-letter initials used for the avatar fallback. */
  initials: string;
  /** Short profile bio. */
  bio: string;
}

export const currentUser: CurrentUser = {
  name: "Alex Morgan",
  email: "alex@ordexa.com",
  initials: "AM",
  bio: "Store manager at Ordexa. Coffee first, dashboards second.",
};
