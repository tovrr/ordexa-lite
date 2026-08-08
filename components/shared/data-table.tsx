"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/** Props for the generic {@link DataTable}. */
export interface DataTableProps<TData, TValue> {
  /** TanStack column definitions — see `components/dashboard/orders-columns.tsx`. */
  columns: ColumnDef<TData, TValue>[];
  /** Row data. Each entry is passed to the column `cell` renderers. */
  data: TData[];
  /** Message shown when `data` is empty. */
  emptyMessage?: string;
}

/**
 * Reusable, strictly-typed data table built on TanStack Table v8, with
 * sorting wired up out of the box.
 *
 * To reuse for another entity, define a `ColumnDef<YourType>[]` and render:
 *
 * ```tsx
 * <DataTable columns={yourColumns} data={yourRows} />
 * ```
 *
 * The full Ordexa template extends this same component with search,
 * composable faceted filters, column visibility, and pagination as opt-in
 * props — see the Pro links in the sidebar.
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  emptyMessage = "No results.",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="text-muted-foreground h-24 text-center"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
