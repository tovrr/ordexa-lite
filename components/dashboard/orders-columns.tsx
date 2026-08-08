"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, Eye, MoreHorizontal, Undo2 } from "lucide-react";

import type { Order, OrderStatus } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Per-status badge styling. Typed as an exhaustive record so adding a new
 * `OrderStatus` in `lib/mock-data.ts` is a compile error until it gets a
 * style here — the table can never render an unstyled status.
 */
const statusStyles: Record<OrderStatus, string> = {
  completed:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  processing:
    "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
  pending:
    "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  refunded: "bg-muted text-muted-foreground border-border",
  cancelled:
    "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
};

/** Human-readable labels per status. */
const statusLabels: Record<OrderStatus, string> = {
  completed: "Completed",
  processing: "Processing",
  pending: "Pending",
  refunded: "Refunded",
  cancelled: "Cancelled",
};

/**
 * Column set for the dashboard's "Recent Orders" card — sortable amount,
 * status badges, and a row actions menu.
 */
export const recentOrdersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order",
    cell: ({ row }) => (
      <span className="font-mono text-xs font-medium">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    id: "customer",
    accessorFn: (order) => order.customer.name,
    header: "Customer",
    cell: ({ row }) => {
      const { customer } = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback className="text-xs font-medium">
              {customer.initials}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <span className="text-sm font-medium">{customer.name}</span>
            <span className="text-muted-foreground text-xs">
              {customer.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<OrderStatus>("status");
      return (
        <Badge variant="outline" className={statusStyles[status]}>
          {statusLabels[status]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-end">
        <Button
          variant="ghost"
          size="sm"
          className="-me-3 h-8"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Amount
          <ArrowUpDown className="size-3.5" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-end font-medium tabular-nums">
        {formatCurrency(row.getValue<number>("amount"))}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="text-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
                <span className="sr-only">Open actions for {order.id}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order.id)}
              >
                <Copy />
                Copy order ID
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye />
                View details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Undo2 />
                Refund order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
