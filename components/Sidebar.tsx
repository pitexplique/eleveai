"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Sparkles,
  Users,
  GraduationCap,
  UsersRound,
  FlaskConical,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";

type SidebarProps = {
  access: any;
  open: boolean;
  onToggle: () => void;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
};

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Sidebar({
  access,
  open,
  onToggle,
  variant = "desktop",
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();

  /* ===============================
     NAVIGATION APP UNIQUEMENT
  =============================== */

  const itemsApp: Item[] = useMemo(
    () => [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
      {
        href: "/espace-atelier-IA",
        label: "Atelier-IA",
        icon: <FlaskConical className="h-4 w-4" />,
        badge: "Nouveau",
      },
      {
        href: "/espace-profs",
        label: "Profs",
        icon: <Users className="h-4 w-4" />,
        badge: "V4.2",
      },
      {
        href: "/espace-eleves",
        label: "Élèves",
        icon: <GraduationCap className="h-4 w-4" />,
        badge: "V 2.0",
      },
      {
        href: "/espace-parents",
        label: "Parents",
        icon: <UsersRound className="h-4 w-4" />,
        badge: "V 3.1",
      },
    ],
    [],
  );

  /* ===============================
     STYLES STRUCTURELS
  =============================== */

  const wrapperClass =
    variant === "mobile"
      ? "h-full w-full"
      : "h-[calc(100vh-var(--app-header-h))] sticky top-[var(--app-header-h)]";

  const widthClass =
    variant === "mobile"
      ? "w-full"
      : open
      ? "w-[280px]"
      : "w-[72px]";

  return (
    <aside
      className={[
        wrapperClass,
        widthClass,
        "flex flex-col",
        "rounded-2xl border border-slate-800",
        "bg-slate-950/90 backdrop-blur",
        "shadow-xl shadow-black/20",
        "transition-[width] duration-300 ease-out",
        "overflow-hidden",
      ].join(" ")}
    >
      {/* ===============================
         HEADER SIDEBAR
      =============================== */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
        <span
          className={[
            "text-sm font-semibold text-slate-200",
            "transition-all duration-200",
            open ? "opacity-100" : "opacity-0 pointer-events-none",
          ].join(" ")}
        >
          Menu
        </span>

        {variant === "desktop" && (
          <button
            type="button"
            onClick={onToggle}
            className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition"
            title={open ? "Réduire la barre latérale" : "Ouvrir la barre latérale"}
          >
            {open ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* ===============================
         NAVIGATION PRINCIPALE
      =============================== */}
      <nav className="flex-1 px-2 py-3 space-y-1">
        {itemsApp.map((item) => (
          <SideItem
            key={item.href}
            {...item}
            open={open}
            active={isActive(pathname, item.href)}
            onClick={onNavigate}
          />
        ))}
      </nav>

      {/* ===============================
         FOOTER — COMPTE
      =============================== */}
{/* FOOTER — COMPTE (collé en bas) */}
<div className="mt-auto border-t border-slate-800 p-2 space-y-1">
  <SideItem
    href="/compte"
    label="Compte"
    icon={<User className="h-4 w-4" />}
    open={open}
    active={isActive(pathname, "/compte")}
    onClick={onNavigate}
  />

  <SideItem
    href="/auth/signin"
    label="Connexion"
    icon={<LogIn className="h-4 w-4" />}
    open={open}
    active={isActive(pathname, "/auth/signin")}
    onClick={onNavigate}
  />

  <SideItem
    href="/auth/signup"
    label="Inscription"
    icon={<UserPlus className="h-4 w-4" />}
    open={open}
    active={isActive(pathname, "/auth/signup")}
    onClick={onNavigate}
  />

  <p
    className={[
      "mt-2 text-[11px] text-slate-500 leading-snug",
      "transition-all duration-200",
      open ? "opacity-100" : "opacity-0 h-0 overflow-hidden",
    ].join(" ")}
  >
    Astuce : réduis la barre pour gagner de la place, comme sur ChatGPT.
  </p>
</div>

    </aside>
  );
}

/* =====================================================
   ITEM
===================================================== */

function SideItem({
  href,
  label,
  icon,
  badge,
  open,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  open: boolean;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={!open ? label : undefined}
      className={[
        "group flex items-center gap-3 rounded-xl px-3 py-2",
        "transition-all duration-150",
        active
          ? "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/20"
          : "text-slate-300 hover:bg-slate-800 hover:text-slate-100",
      ].join(" ")}
    >
      <span
        className={[
          "shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-xl",
          active ? "bg-emerald-500/10" : "bg-slate-900/60",
          "border border-slate-800 group-hover:border-slate-700",
        ].join(" ")}
      >
        {icon}
      </span>

      <span
        className={[
          "flex-1 truncate text-sm font-medium",
          "transition-all duration-200",
          open ? "opacity-100" : "opacity-0 w-0 overflow-hidden",
        ].join(" ")}
      >
        {label}
      </span>

      {badge && (
        <span
          className={[
            "ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase",
            "bg-emerald-600/20 text-emerald-300 border border-emerald-500/20",
            "transition-all duration-200",
            open ? "opacity-100" : "opacity-0 w-0 overflow-hidden",
          ].join(" ")}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}




