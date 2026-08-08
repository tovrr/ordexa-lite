"use client";

/**
 * Last-resort error boundary — catches errors thrown by the root layout
 * itself, where no app CSS or providers are guaranteed to exist. It must
 * render its own <html>/<body>, and styling is inlined for the same
 * reason. Everyday page errors are handled by `(dashboard)/error.tsx`.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          background: "#0f0f11",
          color: "#fafafa",
        }}
      >
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <h1 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "0.875rem" }}>
            {error.digest
              ? `Error digest: ${error.digest}`
              : "An unexpected application error occurred."}
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#6d5ce7",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
