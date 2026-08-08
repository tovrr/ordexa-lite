"use client";

import * as React from "react";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CommandMenu } from "@/components/layout/command-menu";
import { Notifications } from "@/components/layout/notifications";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserNav } from "@/components/layout/user-nav";

/**
 * Sticky application header with a glassmorphism surface.
 *
 * The translucent `bg-background/60` + `backdrop-blur` combination keeps
 * content readable as it scrolls underneath. Contains the sidebar trigger,
 * the global ⌘K search, theme toggle, notifications, and the user menu.
 */
export function Header() {
  return (
    <header className="bg-background/60 sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-md">
      <SidebarTrigger className="-ms-1" />
      <Separator
        orientation="vertical"
        className="me-1 data-[orientation=vertical]:h-4"
      />

      <CommandMenu />

      <div className="ms-auto flex items-center gap-1">
        <ThemeToggle />
        <Notifications />
        <Separator
          orientation="vertical"
          className="mx-1 data-[orientation=vertical]:h-4"
        />
        <UserNav variant="header" />
      </div>
    </header>
  );
}
