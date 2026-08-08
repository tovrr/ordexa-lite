"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Command } from "lucide-react";

import {
  isNavGroup,
  menuConfig,
  type NavGroup,
  type NavItem,
} from "@/config/menu";
import { siteConfig } from "@/config/site";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";

/**
 * The application sidebar.
 *
 * Fully driven by `config/menu.ts` — sections, links, collapsible groups,
 * and badges all come from `menuConfig`. Composes the shadcn/ui sidebar
 * primitives, which provide icon-only collapse (`Cmd/Ctrl+B` or the header
 * trigger), the mobile sheet drawer, and state persistence for free.
 */
export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {siteConfig.name}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    E-commerce
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {menuConfig.sections.map((section, sectionIndex) => (
          <SidebarGroup key={section.title ?? sectionIndex}>
            {section.title ? (
              <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            ) : null}
            <SidebarMenu>
              {section.items.map((entry) =>
                isNavGroup(entry) ? (
                  <NavGroupItem
                    key={entry.title}
                    group={entry}
                    pathname={pathname}
                  />
                ) : (
                  <NavLinkItem
                    key={entry.title}
                    item={entry}
                    pathname={pathname}
                  />
                )
              )}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserNav variant="sidebar" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

/** Returns true when `href` is the current route (exact match for `/`). */
function isActive(href: string, pathname: string): boolean {
  if (href === "#") return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** A plain sidebar link with icon, active state, and optional badge. */
function NavLinkItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive(item.href, pathname)}
        tooltip={item.title}
      >
        <Link
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
        >
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
      {item.badge !== undefined ? (
        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
      ) : null}
    </SidebarMenuItem>
  );
}

/** A collapsible group; opens automatically when a child route is active. */
function NavGroupItem({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  const hasActiveChild = group.items.some((sub) =>
    isActive(sub.href, pathname)
  );

  return (
    <Collapsible
      asChild
      defaultOpen={hasActiveChild}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={group.title} isActive={hasActiveChild}>
            <group.icon />
            <span>{group.title}</span>
            <ChevronRight className="ms-auto transition-transform duration-200 rtl:-scale-x-100 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {group.items.map((sub) => (
              <SidebarMenuSubItem key={sub.title}>
                <SidebarMenuSubButton
                  asChild
                  isActive={isActive(sub.href, pathname)}
                >
                  <Link href={sub.href}>
                    <span>{sub.title}</span>
                    {sub.badge !== undefined ? (
                      <span className="text-muted-foreground ms-auto text-xs tabular-nums">
                        {sub.badge}
                      </span>
                    ) : null}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
