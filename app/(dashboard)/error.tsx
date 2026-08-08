"use client";

import * as React from "react";
import Link from "next/link";
import { RotateCcw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Error boundary for the `(dashboard)` route group.
 *
 * Renders inside the shell — the sidebar and header stay usable, so a
 * failure on one page never strands the user. `reset()` re-renders the
 * failed segment; the digest identifies the server-side error instance in
 * your logs.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid flex-1 place-items-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="bg-destructive/10 text-destructive mx-auto mb-2 flex size-10 items-center justify-center rounded-full">
            <TriangleAlert className="size-5" aria-hidden />
          </div>
          <CardTitle>Something went wrong</CardTitle>
          <CardDescription>
            An unexpected error occurred while loading this page. Try again,
            or head back to the dashboard.
          </CardDescription>
        </CardHeader>
        {error.digest ? (
          <CardContent>
            <p className="text-muted-foreground font-mono text-xs">
              Error digest: {error.digest}
            </p>
          </CardContent>
        ) : null}
        <CardFooter className="justify-center gap-2">
          <Button onClick={reset}>
            <RotateCcw />
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Back to dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
