"use client";

import { Clock3, LayoutDashboard, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, type ReactNode, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ConnectionStatus = "loading" | "connected" | "disconnected";
export const RefreshConnectionsContext = createContext<() => Promise<void>>(async () => {});

export function AppShell({ children }: { readonly children: ReactNode }) {
  const pathname = usePathname();
  const [connection, setConnection] = useState<ConnectionStatus>("loading");

  const refreshConnections = useCallback(async () => {
    setConnection("loading");
    try {
      const response = await fetch("/api/connections", { cache: "no-store" });
      const data = await response.json() as { linear?: { status?: ConnectionStatus } };
      setConnection(response.ok && data.linear?.status === "connected" ? "connected" : "disconnected");
    } catch {
      setConnection("disconnected");
    }
  }, []);

  useEffect(() => void refreshConnections(), [refreshConnections]);

  return (
    <RefreshConnectionsContext.Provider value={refreshConnections}>
      <div className="min-h-dvh bg-background text-foreground lg:grid lg:grid-cols-[220px_1fr]">
      <aside className="flex bg-sidebar text-sidebar-foreground lg:sticky lg:top-0 lg:h-dvh lg:flex-col" aria-label="Navegación principal">
        <div className="flex h-16 shrink-0 items-center gap-3 px-5 lg:h-20">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground">S</span>
          <div>
            <p className="text-sm font-semibold tracking-[-0.01em]">SplitIt</p>
            <p className="text-[11px] text-sidebar-muted">Project control</p>
          </div>
        </div>

        <nav className="flex flex-1 items-center gap-1 overflow-x-auto px-2 py-2 lg:block lg:px-3 lg:py-4" aria-label="Proyecto">
          <NavItem active={pathname === "/"} href="/" icon={LayoutDashboard}>Resumen</NavItem>
          <NavItem active={pathname.startsWith("/horas")} href="/horas" icon={Clock3}>Horas reales</NavItem>
          <NavItem active={pathname.startsWith("/skills")} href="/skills" icon={Wrench}>Skills</NavItem>
        </nav>

        <div className="hidden border-t border-sidebar-foreground/10 px-5 py-5 lg:block">
          <p className="text-[11px] text-sidebar-muted">Fuente principal</p>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className={cn("size-2 rounded-full", connection === "connected" ? "bg-primary" : connection === "loading" ? "bg-sidebar-foreground/25" : "bg-warning")} />
            Linear {connection === "connected" ? "conectado" : connection === "loading" ? "verificando" : "sin conexión"}
          </div>
        </div>
      </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </RefreshConnectionsContext.Provider>
  );
}

function NavItem({ active, children, href, icon: Icon }: { readonly active: boolean; readonly children: string; readonly href: string; readonly icon: typeof LayoutDashboard }) {
  return (
    <Link aria-current={active ? "page" : undefined} className={cn("flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-muted transition-colors hover:bg-primary/15 hover:text-sidebar-foreground lg:mb-1", active && "bg-primary font-medium text-primary-foreground hover:bg-primary hover:text-primary-foreground")} href={href}>
      <Icon className="size-4" />{children}
    </Link>
  );
}
