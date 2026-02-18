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
  UsersRound,
  FlaskConical,
  LogIn,
  UserPlus,
  User,
  LogOut,
  School,
  Building2,
  Mail,
  Library,
  BadgeCheck,
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
  description?: string;
  icon: React.ReactNode;
};

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
      access?.kind === "email_paid",
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
   * - Valeria en 1er (méthode / score / optimisation)
   * - espaces : Profs / Élèves / Parents / École / Entreprise / Atelier-IA
   * - liens utiles : Contact
   */
  const itemsApp: Item[] = useMemo(
    () => [
      {
        href: "/optimiseur",
        label: "Valeria (score /20)",
        description: "Clarifier • sécuriser • optimiser (éducation & entreprise).",
        icon: <BadgeCheck className="h-4 w-4" />,
      },

      // --- ÉDUCATION ---
      {
        href: "/espace-profs",
        label: "Espace Profs",
        description: "Séances • évaluations • différenciation • corrigés.",
        icon: <Users className="h-4 w-4" />,
      },
      {
        href: "/espace-eleves",
        label: "Espace Élèves",
        description: "Apprendre sans tricher : méthode, traces, progression.",
        icon: <GraduationCap className="h-4 w-4" />,
      },
      {
        href: "/espace-parents",
        label: "Espace Parents",
        description: "Aider sans faire à la place : rassurer, cadrer, guider.",
        icon: <UsersRound className="h-4 w-4" />,
      },
      {
        href: "/espace-ecoles",
        label: "Espace École",
        description: "Cadre commun : cohérence, exigences, repères.",
        icon: <School className="h-4 w-4" />,
      },

      // --- ENTREPRISES ---
      {
        href: "/valeria-consulting",
        label: "Espace Entreprises",
        description: "Formation • procédures • qualité • checklists mesurables.",
        icon: <Building2 className="h-4 w-4" />,
      },

      // --- ATELIER ---
      {
        href: "/espace-atelier-IA",
        label: "Atelier-IA",
        description: "Explorer, réfléchir, progresser (cadre encadré).",
        icon: <FlaskConical className="h-4 w-4" />,
      },

      // --- RESSOURCES / CONTACT ---
      // (garde “presets” pour plus tard si tu veux)
      // {
      //   href: "/presets",
      //   label: "Bibliothèque",
      //   description: "Presets & modèles (bientôt).",
      //   icon: <Library className="h-4 w-4" />,
      // },
      {
        href: "/contact",
        label: "Contact",
        description: "EleveAI & Valeria Consulting.",
        icon: <Mail className="h-4 w-4" />,
      },
    ],
    [],
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
        {itemsApp.map((item) => (
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
        ))}
      </nav>

      {/* FOOTER AUTH */}
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
    </aside>
  );
}

/* ITEM */
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
      title={!open ? label : undefined}
      className={[
        "group flex items-start gap-3 rounded-xl px-3 py-2",
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
          "flex-1 min-w-0",
          "transition-all duration-200",
          open ? "opacity-100" : "opacity-0 w-0 overflow-hidden",
        ].join(" ")}
      >
        <span className="block truncate text-sm font-medium">{label}</span>

        {description ? (
          <span className="mt-0.5 block text-[11px] leading-snug text-slate-500 group-hover:text-slate-300">
            {description}
          </span>
        ) : null}
      </span>
    </Link>
  );
}

