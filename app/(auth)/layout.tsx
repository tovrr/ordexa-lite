/**
 * Minimal centered layout for authentication pages.
 *
 * Routes in the `(auth)` group (e.g. `/login`) intentionally render without
 * the dashboard chrome — no sidebar, no header. Add `/register`,
 * `/forgot-password`, etc. alongside `login/` and they inherit this layout.
 */
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="bg-muted dark:bg-background grid min-h-svh place-items-center p-4">
      {children}
    </div>
  );
}
