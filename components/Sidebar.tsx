// components/Sidebar.tsx
"use client";

import Link from "next/link";
import type { Access } from "@/lib/access/access";
import { getRemainingToday } from "@/lib/access/access.mock";

type Props = {
  access: Access & {
    usedToday?: number;
    userLabel?: string;
    collegeName?: string;
  };
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

function NavItem({
  href,
  icon,
  label,
  onNavigate,
}: {
  href: string;
  icon: string;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={() => onNavigate?.()}
      className="
        flex items-center gap-2 rounded-xl px-3 py-2 text-sm
        text-slate-100 hover:bg-slate-900/60
        transition
      "
    >
      <span>{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

export default function Sidebar({
  access,
  variant = "desktop",
  onNavigate,
}: Props) {
  const isAnon = access.uiMode === "anon";
  const isSubscribed = access.uiMode === "subscribed";

  const usedToday = access.usedToday ?? 0;
  const remaining = getRemainingToday({
    dailyLimit: access.dailyLimit,
    usedToday,
  });

  const isDesktop = variant === "desktop";

  return (
    <aside
      className={`
        ${isDesktop ? "sticky" : ""}
        top-[var(--app-header-h,72px)]
        h-[calc(100vh-var(--app-header-h,72px))]
      `}
    >
      <div
        className="
          h-full flex flex-col
          rounded-2xl border border-slate-800
          bg-slate-950/70 backdrop-blur
        "
      >
        {/* ===== HEADER SIDEBAR ===== */}
        <div className="px-4 py-3 border-b border-slate-800">
          <p className="text-xs text-slate-400">Espace</p>
          <p className="text-sm font-semibold text-slate-100">
            {access.userLabel ??
              (isAnon ? "Invité" : isSubscribed ? "Abonné" : "Connecté")}
          </p>
          {access.collegeName && (
            <p className="text-[11px] text-slate-400 truncate">
              🏫 {access.collegeName}
            </p>
          )}
        </div>

        {/* ===== CONTENU SCROLLABLE ===== */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-2 py-3 space-y-4">
          {/* Bouton principal */}
          <div className="px-2">
            <Link
              href="#"
              onClick={(e) => {
                if (isAnon) e.preventDefault();
                else onNavigate?.();
              }}
              className={`
                w-full inline-flex justify-center items-center
                rounded-xl px-3 py-2 text-sm font-semibold
                ${
                  isAnon
                    ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                    : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                }
              `}
            >
              ✨ Générer une requête
            </Link>

            <p className="mt-2 text-xs text-slate-400">
              {isSubscribed ? (
                <>📚 Ajoutée à ton historique</>
              ) : (
                <>
                  🕒 Il te reste{" "}
                  <span className="font-semibold text-slate-200">
                    {remaining}
                  </span>{" "}
                  requêtes aujourd’hui
                </>
              )}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-1">
            <NavItem href="/espace-eleves" icon="🎓" label="Espace Élèves" onNavigate={onNavigate} />
            <NavItem href="/espace-profs" icon="🧑‍🏫" label="Espace Profs" onNavigate={onNavigate} />
            <NavItem href="/espace-parents" icon="👨‍👩‍👧" label="Espace Parents" onNavigate={onNavigate} />
            <NavItem href="/atelier-IA" icon="🧠" label="Atelier-IA" onNavigate={onNavigate} />
            {!isAnon && (
              <NavItem
                href="/dashboard/presets"
                icon="📚"
                label="Mes presets"
                onNavigate={onNavigate}
              />
            )}
          </div>
        </div>

        {/* ===== BAS FIXE ===== */}
        <div className="border-t border-slate-800 px-3 py-3 space-y-1">
          {isAnon ? (
            <>
              <NavItem href="/auth/signin" icon="🔑" label="Connexion" onNavigate={onNavigate} />
              <NavItem href="/auth/signup" icon="✨" label="Créer un compte" onNavigate={onNavigate} />
            </>
          ) : (
            <NavItem
              href="/dashboard/compte"
              icon="👤"
              label="Compte"
              onNavigate={onNavigate}
            />
          )}
        </div>
      </div>
    </aside>
  );
}

