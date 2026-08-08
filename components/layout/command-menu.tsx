"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { isNavGroup, menuConfig } from "@/config/menu";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

/**
 * Global search rendered as a command palette (⌘K / Ctrl+K).
 *
 * Like the sidebar, its contents are generated from `config/menu.ts` —
 * every navigable entry becomes a searchable command, grouped by section.
 * Add app-specific actions (e.g. "Create product") by appending
 * `CommandGroup`s below the generated ones.
 */
export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  // Global keyboard shortcut: ⌘K (macOS) / Ctrl+K (Windows, Linux).
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  return (
    <>
      <Button
        variant="outline"
        className="text-muted-foreground bg-muted/40 relative h-8 w-full max-w-64 justify-start rounded-md text-sm font-normal shadow-none sm:pe-12"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" aria-hidden />
        <span className="hidden sm:inline-flex">Search...</span>
        <kbd className="bg-muted pointer-events-none absolute top-1.5 end-1.5 hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium select-none sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {menuConfig.sections.map((section, index) => (
            <CommandGroup
              key={section.title ?? index}
              heading={section.title}
            >
              {section.items.flatMap((entry) =>
                !isNavGroup(entry) && entry.external
                  ? []
                  : isNavGroup(entry)
                  ? entry.items.map((sub) => (
                      <CommandItem
                        key={`${entry.title}-${sub.title}`}
                        value={`${entry.title} ${sub.title}`}
                        onSelect={() =>
                          runCommand(() => router.push(sub.href))
                        }
                      >
                        <entry.icon />
                        <span>
                          {entry.title} / {sub.title}
                        </span>
                      </CommandItem>
                    ))
                  : [
                      <CommandItem
                        key={entry.title}
                        value={entry.title}
                        onSelect={() =>
                          runCommand(() => router.push(entry.href))
                        }
                      >
                        <entry.icon />
                        <span>{entry.title}</span>
                      </CommandItem>,
                    ]
              )}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
