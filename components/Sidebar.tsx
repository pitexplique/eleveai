// components/Sidebar.tsx
"use client";

import Link from "next/link";
import type { Access } from "@/lib/access/access";
import { getRemainingToday } from "@/lib/access/access.mock";

type Props = {
  access: Access & { usedToday?: number; userLabel?: string; collegeName?: string };
  variant?: "desktop" | "mobile";
  onNavigate?: () => void; // ferme le drawer après clic (mobile)
};

function DisabledItem({
  label,
  hint,
}: {
  label: string;
  hint: string;
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400
                 opacity-60 cursor-not-allowed select-none border border-slate-800 bg-slate-900/30"
      title={hint}
      aria-disabled="true"
    >
      <span>📚</span>
      <span className="truncate">{label}</span>
      <span className="ml-auto text-[10px] rounded-full border border-slate-700 px-2 py-0.5 text-slate-300">
        Connexion requise
      </span>
    </div>
  );
}

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
      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-100
                 hover:bg-slate-900/60 border border-transparent hover:border-slate-800 transition"
    >
      <span>{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

export default function Sidebar({ access, variant = "desktop", onNavigate }: Props) {
  const isAnon = access.uiMode === "anon";
  const isSubscribed = access.uiMode === "subscribed";

  const usedToday = typeof access.usedToday === "number" ? access.usedToday : 0;

  const remaining = getRemainingToday({
    dailyLimit: access.dailyLimit,
    usedToday,
  });

  // Hauteur sticky uniquement en desktop
  const wrapClass =
    variant === "desktop"
      ? "h-[calc(100vh-120px)] sticky top-20"
      : "h-auto";

  return (
    <div className={wrapClass}>
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 flex flex-col">
        {/* Haut : statut */}
        <div className="px-2 pt-1 pb-3">
          <p className="text-xs text-slate-400">Espace</p>
          <p className="text-sm font-semibold text-slate-100">
            {access.userLabel ?? (isAnon ? "Invité" : isSubscribed ? "Abonné" : "Connecté")}
          </p>
          {access.collegeName && (
            <p className="text-[11px] text-slate-400 truncate">
              🏫 {access.collegeName}
            </p>
          )}
        </div>

        {/* Bouton principal */}
        <div className="px-2">
          <Link
            href="#"
            className={[
              "w-full inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold transition",
              isAnon
                ? "bg-slate-800 text-slate-300 cursor-not-allowed"
                : "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
            ].join(" ")}
            aria-disabled={isAnon}
            title={isAnon ? "Connecte-toi pour générer" : "Générer une requête"}
            onClick={(e) => {
              if (isAnon) e.preventDefault();
              else onNavigate?.(); // sur mobile, on ferme après action si tu veux
            }}
          >
            ✨ Générer une requête
          </Link>

          <p className="mt-2 text-xs text-slate-400">
            {isSubscribed ? (
              <>📚 Cette requête sera ajoutée à ta bibliothèque</>
            ) : (
              <>
                🕒 Il te reste{" "}
                <span className="font-semibold text-slate-200">{remaining}</span>{" "}
                requêtes aujourd’hui
              </>
            )}
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-4 px-1 space-y-1">
          <NavItem onNavigate={onNavigate} href="/espace-eleves" icon="🎓" label="Espace Élèves" />
          <NavItem onNavigate={onNavigate} href="/espace-profs" icon="🧑‍🏫" label="Espace Profs" />
          <NavItem onNavigate={onNavigate} href="/espace-parents" icon="👨‍👩‍👧" label="Espace Parents" />
          <NavItem onNavigate={onNavigate} href="/atelier-IA" icon="🧠" label="Atelier-IA" />
        </div>

        {/* Bibliothèque */}
        <div className="mt-4 px-1 space-y-1">
          <p className="px-2 pt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Bibliothèque
          </p>

          {isAnon ? (
            <DisabledItem
              label="Enregistrements"
              hint="Connecte-toi pour enregistrer tes requêtes dans ta bibliothèque"
            />
          ) : (
            <NavItem onNavigate={onNavigate} href="/bibliotheque" icon="📚" label="Enregistrements" />
          )}
        </div>

        {/* Bas : compte */}
        <div className="mt-6 pt-4 px-1 space-y-1">
          <div className="border-t border-slate-800 my-2" />

          {isAnon ? (
            <>
              <NavItem onNavigate={onNavigate} href="/auth/signin" icon="🔑" label="Connexion" />
              <NavItem onNavigate={onNavigate} href="/auth/signup" icon="✨" label="Créer un compte" />
            </>
          ) : (
            <>
              <NavItem onNavigate={onNavigate} href="/compte" icon="👤" label="Compte" />
              <NavItem onNavigate={onNavigate} href="/auth/signin" icon="🚪" label="Déconnexion" />
            </>
          )}

          <p className="px-2 pt-2 text-[10px] text-slate-600">
            Démo : <span className="text-slate-500">?mock=email_free</span>
          </p>
        </div>
      </div>
    </div>
  );
}
