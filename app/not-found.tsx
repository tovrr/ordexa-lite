import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Global 404 page.
 *
 * Lives at the app root, so it renders chrome-free (no sidebar/header) for
 * any unmatched route. Styled to match the auth pages.
 */
export default function NotFound() {
  return (
    <div className="bg-muted dark:bg-background grid min-h-svh place-items-center p-4">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
          <Compass className="size-6" aria-hidden />
        </div>
        <p className="text-primary font-mono text-sm font-medium">404</p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="text-muted-foreground text-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been
          moved. Check the URL, or head back to the dashboard.
        </p>
        <Button asChild className="mt-2">
          <Link href="/">
            <ArrowLeft className="rtl:-scale-x-100" />
            Back to dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
