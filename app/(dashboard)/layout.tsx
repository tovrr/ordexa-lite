import { cookies } from "next/headers";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";

/**
 * Dashboard shell: config-driven sidebar + sticky glass header.
 *
 * Every route inside the `(dashboard)` group renders within this chrome.
 * The sidebar's expanded/collapsed state is persisted in a cookie by the
 * sidebar itself; reading it here lets the server render the correct state
 * on the next visit (no layout flash).
 */
export default async function DashboardLayout({
  children,
}: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value;
  const defaultOpen = sidebarState === undefined || sidebarState === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
