// app/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  GraduationCap,
  LogIn,
  UserPlus,
  User,
  LogOut,
  School,
  Building2,
  BadgeCheck,
  ShieldCheck,
  Brain, // ✅ NEW (Tutor)
  FileText
} from "lucide-react";

type SidebarProps = {
  access: any;
  open: boolean;
  onToggle: () => void;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

type LinkItem = {
  kind?: "link";
  href: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
};

type DividerItem = {
  kind: "divider";
  label: string;
  icon?: React.ReactNode;
};

type Item = LinkItem | DividerItem;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

function isLoggedFromAccess(access: any) {
  return Boolean(
    access?.isLoggedIn ||
      access?.userEmail ||
      access?.user?.email ||
      access?.email ||
      access?.role === "user" ||
      access?.role === "admin" ||
      access?.kind === "email_free" ||
      access?.kind === "email_paid"
  );
}

function SectionDivider({
  label,
  open,
  icon,
}: {
  label: string;
  open: boolean;
  icon?: React.ReactNode;
}) {
  const isEntreprise = label.toLowerCase().includes("entreprise");
  return (
    <div className="px-2 py-2">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-slate-800" />
        <span
          className={[
            "flex items-center gap-1.5 text-[10px] uppercase tracking-wider",
            isEntreprise ? "text-orange-300/70" : "text-slate-500",
            "transition-all duration-200",
            open
              ? "opacity-100"
              : "opacity-0 pointer-events-none w-0 overflow-hidden",
          ].join(" ")}
        >
          {icon ? <span className="opacity-90">{icon}</span> : null}
          {label}
        </span>
        <div className="h-px flex-1 bg-slate-800" />
      </div>
    </div>
  );
}

function SideItem({
  href,
  label,
  description,
  icon,
  open,
  active,
  onClick,
}: {
  href: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  open: boolean;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "group flex items-start gap-3 rounded-xl px-2.5 py-2 transition",
        active
          ? "bg-slate-900 border border-slate-700"
          : "border border-transparent hover:bg-slate-900/60 hover:border-slate-800",
      ].join(" ")}
      title={!open ? label : undefined}
    >
      <span
        className={[
          "mt-0.5 shrink-0 rounded-lg p-1.5",
          active ? "bg-slate-800/70" : "bg-slate-900/40 group-hover:bg-slate-800/40",
        ].join(" ")}
      >
        {icon}
      </span>

      <span
        className={[
          "min-w-0 flex-1",
          "transition-all duration-200",
          open ? "opacity-100" : "opacity-0 pointer-events-none w-0 overflow-hidden",
        ].join(" ")}
      >
        <span className="block text-sm font-semibold text-slate-100 truncate">
          {label}
        </span>
        {description ? (
          <span className="mt-0.5 block text-[12px] leading-snug text-slate-400 line-clamp-2">
            {description}
          </span>
        ) : null}
      </span>
    </Link>
  );
}

export default function Sidebar({
  access,
  open,
  onToggle,
  variant = "desktop",
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();
  const isLoggedIn = isLoggedFromAccess(access);

  /**
   * NAV : alignée “Éducation + Entreprise”
   * - Valeria Optimiseur (score / optimisation)
   * - section Éducation : Profs / Élèves
   * - section Entreprise : Consulting + Gouvernance IA (ISO)
   */
  const itemsApp: Item[] = useMemo(
    () => [
      {
        kind: "link",
        href: "/optimiseur",
        label: "Valeria ",
        // ✅ mieux : “inspirée ISO / AIMS” (pas “ISO” tout court)
        description: "Optimisation mesurable de prompts ",
        icon: <BadgeCheck className="h-4 w-4 text-yellow-400" />,
      },

      {
        kind: "divider",
        label: "Éducation",
        icon: <School className="h-3.5 w-3.5" />,
      },

      {
        kind: "link",
        href: "/espace-profs",
        label: "Espace Professeurs",
        description: "Séances • évaluations • différenciation • conformité BO.",
        icon: <Users className="h-4 w-4 text-blue-400" />,
      },

      {
        kind: "link",
        href: "/espace-eleves",
        label: "Espace Élèves",
        description: "Méthode encadrée • traces IA • progression réelle.",
        icon: <GraduationCap className="h-4 w-4 text-green-400" />,
      },
      {
        kind: "link",
        href: "/tutor-v4",
        label: "Tutor IA",
        description: "Saphir s'adapte à ton niveau",
        icon: <Brain className="h-4 w-4 text-purple-300" />,
      },

      {
        kind: "divider",
        label: "Entreprise",
        icon: <Building2 className="h-3.5 w-3.5" />,
      },

      {
        kind: "link",
        href: "/valeria",
        label: "Valeria Consulting",
        description: "Audit IA • Indicateurs • Gouvernance",
        icon: <Building2 className="h-4 w-4 text-orange-400" />,
      },

      // ✅ NEW : page ISO / Gouvernance IA
      {
        kind: "link",
        href: "/iso-42001",
        label: "Gouvernance IA (ISO/IEC 42001)",
        description: "Notre philosophie : supervision humaine, traçabilité, amélioration continue.",
        icon: <ShieldCheck className="h-4 w-4 text-emerald-300" />,
      },
      {
        kind: "link",
        href: "/tutor-developpement/iso",
        label: "Tutor — ISO (développement)",
        description: "Journal de conception : risques, contrôles, traçabilité.",
        icon: <FileText className="h-4 w-4 text-emerald-200" />,
      },
    ],
    []
  );

  const wrapperClass =
    variant === "mobile"
      ? "h-full w-full"
      : "sticky top-[var(--app-header-h)] h-[calc(100vh-var(--app-header-h))]";

  const widthClass =
    variant === "mobile" ? "w-full" : open ? "w-[280px]" : "w-[72px]";

  return (
    <aside
      className={[
        wrapperClass,
        widthClass,
        "self-start flex flex-col min-h-0",
        "rounded-2xl border border-slate-800",
        "bg-slate-950/90 backdrop-blur",
        "shadow-xl shadow-black/20",
        "transition-[width] duration-300 ease-out",
        "overflow-hidden",
      ].join(" ")}
    >
      {/* HEADER */}
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

      {/* NAV */}
      <nav className="flex-1 min-h-0 px-2 py-3 space-y-1 overflow-auto">
        {itemsApp.map((item, idx) => {
          if (item.kind === "divider") {
            return (
              <SectionDivider
                key={`div-${idx}-${item.label}`}
                label={item.label}
                open={open}
                icon={item.icon}
              />
            );
          }

          return (
            <SideItem
              key={item.href}
              href={item.href}
              label={item.label}
              description={item.description}
              icon={item.icon}
              open={open}
              active={isActive(pathname, item.href)}
              onClick={onNavigate}
            />
          );
        })}
      </nav>

      {/* FOOTER AUTH */}
      {/* 
      <div className="mt-auto border-t border-slate-800 p-2 space-y-1">
        {!isLoggedIn ? (
          <>
            <SideItem
              href="/auth/signin"
              label="Connexion"
              description="Se connecter à EleveAI."
              icon={<LogIn className="h-4 w-4" />}
              open={open}
              active={isActive(pathname, "/auth/signin")}
              onClick={onNavigate}
            />
            <SideItem
              href="/auth/signup"
              label="Inscription"
              description="Créer un compte en 1 minute."
              icon={<UserPlus className="h-4 w-4" />}
              open={open}
              active={isActive(pathname, "/auth/signup")}
              onClick={onNavigate}
            />
          </>
        ) : (
          <>
            <SideItem
              href="/dashboard"
              label="Compte"
              description="Gérer ton compte et tes accès."
              icon={<User className="h-4 w-4" />}
              open={open}
              active={isActive(pathname, "/dashboard")}
              onClick={onNavigate}
            />
            <SideItem
              href="/auth/signout"
              label="Déconnexion"
              description="Se déconnecter en sécurité."
              icon={<LogOut className="h-4 w-4" />}
              open={open}
              active={false}
              onClick={onNavigate}
            />
          </>
        )}

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
      */}
    </aside>
  );
}
