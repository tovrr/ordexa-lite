"use client";

import * as React from "react";
import { Bell } from "lucide-react";

import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
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

/**
 * Header notifications bell.
 *
 * Reads from the `notifications` mock export; the unread indicator dot on
 * the trigger appears whenever at least one notification is unread. Wire
 * this to your real notification source by replacing the import.
 */
export function Notifications() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative size-8">
          <Bell className="size-4" />
          {unreadCount > 0 ? (
            <span
              className="bg-primary absolute top-1.5 end-1.5 size-2 rounded-full"
              aria-hidden
            />
          ) : null}
          <span className="sr-only">
            Notifications ({unreadCount} unread)
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifications
          {unreadCount > 0 ? (
            <span className="text-muted-foreground text-xs font-normal">
              {unreadCount} unread
            </span>
          ) : null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex items-start gap-3 py-2.5"
            >
              <span
                className={cn(
                  "mt-1.5 size-2 shrink-0 rounded-full",
                  notification.unread ? "bg-primary" : "bg-border"
                )}
                aria-hidden
              />
              <span className="grid gap-0.5">
                <span className="text-sm font-medium">
                  {notification.title}
                </span>
                <span className="text-muted-foreground line-clamp-2 text-xs">
                  {notification.description}
                </span>
                <span className="text-muted-foreground text-xs">
                  {notification.time}
                </span>
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
