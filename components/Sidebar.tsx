// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UsersRound,
  FlaskConical,
  PanelLeftClose,
  PanelLeftOpen,
  UserCircle2,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
} from "lucide-react";

type SidebarVariant = "desktop" | "mobile";

type SidebarProps = {
  access: any; // keep loose (your access.mock type)
  variant?: SidebarVariant;
  onNavigate?: () => void;

  // Desktop only
  collapsed?: boolean;
  onToggleCollapsed?: () => void;

  // Optional: if you want real logout later
  onLogout?: () => void | Promise<void>;
};

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { href: "/espace-eleves", label: "Générateur Élèves", icon: <GraduationCap className="h-5 w-5" /> },
  { href: "/espace-profs", label: "Générateur Profs", icon: <Users className="h-5 w-5" /> },
  { href: "/espace-parents", label: "Générateur Parents", icon: <UsersRound className="h-5 w-5" /> },
  { href: "/espace-atelier-IA", label: "Atelier-IA", icon: <FlaskConical className="h-5 w-5" /> },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

// --- helpers: robust detection from mock access ---
function getEmailFromAccess(access: any): string | null {
  return (
    access?.userEmail ??
    access?.email ??
    access?.user?.email ??
    access?.user?.user_email ??
    null
  );
}

function guessLoggedIn(access: any) {
  const email = getEmailFromAccess(access);
  if (email && email !== "anon" && email !== "guest") return true;
  if (access?.isLoggedIn === true) return true;
  if (access?.kind === "email_paid" || access?.kind === "email_free") return true;
  return false;
}

export default function Sidebar({
  access,
  variant = "desktop",
  onNavigate,
  collapsed = false,
  onToggleCollapsed,
  onLogout,
}: SidebarProps) {
  const pathname = usePathname();
  const isMobile = variant === "mobile";

  const email = getEmailFromAccess(access);
  const isLoggedIn = guessLoggedIn(access);

  // Desktop sticky under header (no tremblement)
  const desktopShell =
    "sticky top-[var(--app-header-h)] h-[calc(100dvh-var(--app-header-h))]";

  const baseShell =
    "rounded-2xl border border-slate-800 bg-slate-950/90 backdrop-blur shadow-sm";

  const sectionTitle = (txt: string) =>
    !collapsed ? (
      <p className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {txt}
      </p>
    ) : null;

  return (
    <div className={`${!isMobile ? desktopShell : ""} ${baseShell} flex flex-col`}>
      {/* ===== Top bar (ChatGPT-like) ===== */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 px-2 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-200">
            <span className="text-sm font-bold">AI</span>
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-50 truncate">EleveAI</p>
              <p className="text-[11px] text-slate-400 truncate">Espace “app”</p>
            </div>
          )}
        </div>

        {!isMobile && onToggleCollapsed && (
          <button
            type="button"
            onClick={onToggleCollapsed}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-200 hover:bg-slate-900"
            aria-label={collapsed ? "Ouvrir la barre latérale" : "Fermer la barre latérale"}
            title={collapsed ? "Ouvrir la barre latérale" : "Fermer la barre latérale"}
          >
            {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>
        )}
      </div>

      {/* ===== Nav ===== */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {sectionTitle("Navigation")}

        <nav className="p-2">
          <ul className="space-y-1">
            {ITEMS.map((it) => {
              const active = isActive(pathname, it.href);

              const rowBase =
                "group flex items-center gap-3 rounded-xl border px-3 py-2 text-sm transition";
              const rowActive =
                "border-emerald-500/40 bg-emerald-500/10 text-emerald-100";
              const rowIdle =
                "border-slate-800 text-slate-200 hover:bg-slate-900 hover:border-slate-700";

              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    onClick={onNavigate}
                    className={`${rowBase} ${active ? rowActive : rowIdle} ${
                      collapsed ? "justify-center px-2" : ""
                    }`}
                    title={collapsed ? it.label : undefined}
                    aria-label={it.label}
                  >
                    <span className="shrink-0">{it.icon}</span>
                    {!collapsed && (
                      <span className="min-w-0 flex-1 truncate font-semibold">
                        {it.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Hint mock (optionnel) */}
        {!collapsed ? (
          <div className="px-3 pb-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-3 text-xs text-slate-300">
              <p className="font-semibold text-slate-200">Mode test</p>
              <p className="mt-1">
                Ajoute <span className="font-mono">?mock=anon</span> ou{" "}
                <span className="font-mono">?mock=email_paid</span> dans l’URL.
              </p>
            </div>
          </div>
        ) : (
          <div
            className="mx-auto mb-3 h-8 w-8 rounded-xl border border-slate-800 bg-slate-900/30"
            title="Astuce : ?mock=anon / email_paid"
          />
        )}
      </div>

      {/* ===== Account (BOTTOM) ===== */}
      <div className="border-t border-slate-800 p-2">
        {sectionTitle("Compte")}

        {collapsed ? (
          <Link
            href={isLoggedIn ? "/dashboard" : "/auth/signin"}
            onClick={onNavigate}
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/40 text-slate-200 hover:bg-slate-900"
            title={isLoggedIn ? (email ?? "Compte") : "Connexion"}
            aria-label="Compte"
          >
            <UserCircle2 className="h-5 w-5" />
          </Link>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-3">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl border border-slate-700 bg-slate-950/40 flex items-center justify-center text-slate-200">
                <UserCircle2 className="h-6 w-6" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-50">
                  {isLoggedIn ? "Connecté" : "Invité"}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {isLoggedIn ? (email ?? "compte email") : "Connecte-toi pour sauvegarder"}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/auth/signin"
                    onClick={onNavigate}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/30 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-900"
                  >
                    <LogIn className="h-4 w-4" />
                    Connexion
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={onNavigate}
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/15"
                  >
                    <UserPlus className="h-4 w-4" />
                    Inscription
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    onClick={onNavigate}
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/15"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  <Link
                    href="dashboard/parametres"
                    onClick={onNavigate}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/30 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-900"
                  >
                    <Settings className="h-4 w-4" />
                    Paramètres
                  </Link>

                  {/* Logout: si tu veux le rendre réel plus tard, passe onLogout depuis AppShell */}
                  {onLogout ? (
                    <button
                      type="button"
                      onClick={async () => {
                        await onLogout();
                        onNavigate?.();
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/30 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-900"
                    >
                      <LogOut className="h-4 w-4" />
                      Déconnexion
                    </button>
                  ) : (
                    <Link
                      href="/auth/signin"
                      onClick={onNavigate}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/30 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-900"
                      title="(Démo) — branche plus tard un vrai logout"
                    >
                      <LogOut className="h-4 w-4" />
                      Déconnexion
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



