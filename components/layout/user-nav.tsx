"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";

import { currentUser } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";

/** Props for {@link UserNav}. */
export interface UserNavProps {
  /**
   * Where the trigger renders:
   * - `"header"`  — a compact avatar button in the top bar.
   * - `"sidebar"` — a full-width row in the sidebar footer (name + email).
   */
  variant: "header" | "sidebar";
}

/**
 * Signed-in user menu (profile, settings, log out).
 *
 * Reads from the `currentUser` mock export — replace that import with your
 * session/auth data when integrating a real backend. "Log out" links to the
 * `/login` page that ships with the template.
 */
export function UserNav({ variant }: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === "header" ? (
          <Button variant="ghost" className="size-8 rounded-full p-0">
            <Avatar className="size-8">
              <AvatarFallback className="text-xs font-medium">
                {currentUser.initials}
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">Open user menu</span>
          </Button>
        ) : (
          <SidebarUserTrigger />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side={variant === "sidebar" ? "top" : "bottom"}
        className="w-56"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="grid gap-0.5">
            <span className="text-sm font-medium">{currentUser.name}</span>
            <span className="text-muted-foreground text-xs">
              {currentUser.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="#">
              <User />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#">
              <Settings />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/login">
            <LogOut />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Full-width sidebar footer trigger showing avatar, name, and email.
 * Collapses to just the avatar when the sidebar is in icon mode.
 */
const SidebarUserTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof SidebarMenuButton>
>(function SidebarUserTrigger(props, ref) {
  // Consuming the sidebar context here (rather than in UserNav) keeps the
  // header variant usable outside a SidebarProvider.
  useSidebar();

  return (
    <SidebarMenuButton
      ref={ref}
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      {...props}
    >
      <Avatar className="size-8 rounded-lg">
        <AvatarFallback className="rounded-lg text-xs font-medium">
          {currentUser.initials}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-start text-sm leading-tight">
        <span className="truncate font-semibold">{currentUser.name}</span>
        <span className="text-muted-foreground truncate text-xs">
          {currentUser.email}
        </span>
      </div>
      <ChevronsUpDown className="ms-auto size-4" />
    </SidebarMenuButton>
  );
});
