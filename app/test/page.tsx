// app/test/TestClient.tsx
"use client";

/**
 * ============================================================
 *  PAGE INTERNE /test — OUTIL DEVELOPPEUR (invisible utilisateur)
 * ============================================================
 *
 * Objectif :
 * - Simuler tous les états (anon, email_free, email_paid, collège rôles...)
 * - Vérifier la "politique d'affichage" (features, quotas, bibliothèque...)
 * - Contractualiser la SIDEBAR du générateur de prompts
 *   via une section "Contrat UI — Sidebar Générateur".
 *
 * Important :
 * - Cette page est uniquement pour NOUS (dev).
 * - Elle ne pilote pas les droits réels : c’est un outil de contrôle visuel.
 * - La sidebar réelle n'apparaît pas ici : on affiche un "aperçu/contrat".
 */

import Link from "next/link";
import { useMemo, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// ⚠️ Note Next.js : "metadata" dans un composant client n'est pas pris en compte
// comme un vrai metadata App Router. Mais /test est un outil interne : on laisse.
export const metadata = {
  title: "Test Mocks — EleveAI",
  robots: { index: false, follow: false },
};

import type { MockKey, FeatureFlag, AccessMock } from "@/lib/access/access.mock";
import {
  pickAccessMock,
  getRemainingToday,
  canSeeDirection,
} from "@/lib/access/access.mock";

/* =========================================================
   0) LISTE DES ETATS (MOCKS)
========================================================= */

const MOCKS: { key: MockKey; label: string; desc: string }[] = [
  { key: "anon", label: "Anon", desc: "Invité (non connecté)" },
  { key: "email_free", label: "Email Free", desc: "Compte email gratuit" },
  { key: "email_paid", label: "Email Paid", desc: "Compte abonné" },

  // Collège
  { key: "college_eleve", label: "Élève", desc: "Élève collège (DIMITILE / eleve-demo)" },

  // ✅ NOUVEAU : prof collège (accès générateurs pédagogiques)
  { key: "college_prof", label: "Prof", desc: "Prof collège (DIMITILE / prof)" },

  { key: "college_admin", label: "Boss", desc: "Direction (DIMITILE / theboss)" },
  { key: "college_vie", label: "Vie", desc: "Vie scolaire (DIMITILE / vie)" },
  { key: "college_aesh", label: "AESH", desc: "AESH (DIMITILE / aesh)" },
  { key: "college_personnels", label: "Perso", desc: "Personnels (DIMITILE / perso)" },
  { key: "college_administration", label: "Admin", desc: "Administration (DIMITILE / admin)" },
];

/* =========================================================
   1) ROUTES (juste pour navigation rapide en test)
========================================================= */

type RouteItem = {
  href: string;
  label: string;
  /** Feature requise (si besoin) */
  requiresFeature?: FeatureFlag;
  /** Login requis ? */
  requiresLogin?: boolean;
};

const ROUTES_BASE: RouteItem[] = [
  { href: "/dashboard", label: "Dashboard", requiresLogin: true },
  { href: "/espace-atelier-IA", label: "Espace Atelier-IA" },
  { href: "/espace-profs", label: "Espace Profs" },
  { href: "/espace-eleves", label: "Espace Élèves" },
  { href: "/espace-parents", label: "Espace Parents" },
];

const ROUTES_COLLEGE: RouteItem[] = [
  {
    href: "/espace-colleges",
    label: "Espace Collèges (hub)",
    requiresLogin: true,
    requiresFeature: "canSeeCollegeHub",
  },

  // ✅ app/direction (racine)
  {
    href: "/direction",
    label: "Direction (boss)",
    requiresLogin: true,
    requiresFeature: "canSeeDirection",
  },

  {
    href: "/espace-colleges/espace-administration",
    label: "Espace Administration",
    requiresLogin: true,
    requiresFeature: "canSeeCollegeAdministration",
  },
  {
    href: "/espace-colleges/espace-vie-scolaire",
    label: "Espace Vie scolaire",
    requiresLogin: true,
    requiresFeature: "canSeeCollegeVieScolaire",
  },
  {
    href: "/espace-colleges/espace-aesh",
    label: "Espace AESH",
    requiresLogin: true,
    requiresFeature: "canSeeCollegeAesh",
  },
  {
    href: "/espace-colleges/espace-personnels",
    label: "Espace Personnels",
    requiresLogin: true,
    requiresFeature: "canSeeCollegePersonnels",
  },
];

/* =========================================================
   2) HELPERS BASIQUES
========================================================= */

function getMockFromWindow(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("mock");
}

function hasFeature(access: Pick<AccessMock, "features">, f: FeatureFlag) {
  return access.features.includes(f);
}

function renderQuotaReadable(access: { usedToday: number; dailyLimit: number }) {
  const remaining = Math.max(0, access.dailyLimit - access.usedToday);
  return (
    <span>
      {access.usedToday} / {access.dailyLimit} utilisées — reste{" "}
      <strong>{remaining}</strong> aujourd’hui
    </span>
  );
}

function renderLibraryBadge(access: {
  libraryEnabled: boolean;
  libraryRetentionDays: number | null;
}) {
  const on = access.libraryEnabled;

  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold border",
        on
          ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/25"
          : "bg-rose-500/10 text-rose-200 border-rose-500/25",
      ].join(" ")}
      title={
        on
          ? access.libraryRetentionDays === null
            ? "Bibliothèque illimitée"
            : `Bibliothèque: ${access.libraryRetentionDays} jours`
          : "Bibliothèque désactivée"
      }
    >
      📚 {on ? "Bibliothèque ON" : "Bibliothèque OFF"}
      {on ? (
        <span className="text-[11px] text-slate-300">
          {access.libraryRetentionDays === null
            ? "· illimitée"
            : `· ${access.libraryRetentionDays}j`}
        </span>
      ) : null}
    </span>
  );
}

/* =========================================================
   3) CONTRAT UI — SIDEBAR GENERATEUR (NOTRE POLITIQUE)
========================================================= */

/**
 * Ici on formalise les règles pour la sidebar "générateur de prompts".
 *
 * Rappel architecture validée :
 * - Header global : navigation principale (univers)
 * - Sidebar : UNIQUEMENT sur les pages générateur (Atelier / Élèves / Profs / Parents)
 * - Dashboard / Direction : PAS DE SIDEBAR, mais header global oui.
 *
 * Cette section crée un "aperçu" qui dépend uniquement de access (plan/auth/features).
 * /test est donc notre document vivant + garde-fou.
 */

function isLoggedInFromPlan(plan?: string | null) {
  return plan != null && plan !== "anon";
}

/**
 * Règle CTA (footer de la sidebar générateur)
 * - invité : Connexion / Inscription
 * - email : Mon compte -> /dashboard + Déconnexion
 * - collège direction : Mon compte -> /direction + Déconnexion
 * - collège non-direction (élève, prof, vie, aesh, etc.) : Mon établissement -> /espace-colleges + Déconnexion
 */
function getAccountCta(access: AccessMock) {
  const logged = isLoggedInFromPlan(access?.plan);

  if (!logged) {
    return {
      primary: { label: "Connexion", href: "/auth/signin" },
      secondary: { label: "Inscription", href: "/auth/signup" },
    };
  }

  // Collège direction -> /direction
  const isDirection =
    access.authType === "college" &&
    access.collegeRole === "direction" &&
    canSeeDirection(access);

  if (isDirection) {
    return {
      primary: { label: "Mon compte", href: "/direction" },
      secondary: { label: "Déconnexion", href: "/auth/signout" },
    };
  }

  // Collège non-direction -> hub établissement
  if (access.authType === "college") {
    return {
      primary: { label: "Mon établissement", href: "/espace-colleges" },
      secondary: { label: "Déconnexion", href: "/auth/signout" },
    };
  }

  // Email -> /dashboard
  return {
    primary: { label: "Mon compte", href: "/dashboard" },
    secondary: { label: "Déconnexion", href: "/auth/signout" },
  };
}

/**
 * Décrit ce que la sidebar générateur DOIT afficher selon l'état (access).
 * NB : ici on ne rend pas la vraie sidebar : on rend le CONTRAT (liste de sections).
 */
function getSidebarGeneratorSpec(access: AccessMock) {
  const logged = isLoggedInFromPlan(access?.plan);

  // reste aujourd’hui
  const remaining = Math.max(
    0,
    (access?.dailyLimit ?? 0) - Math.max(0, access?.usedToday ?? 0),
  );

  const quotaLine = `${access.usedToday} / ${access.dailyLimit} — reste ${remaining}`;

  const libraryLine = access.libraryEnabled
    ? `ON (${access.libraryRetentionDays === null ? "illimitée" : `${access.libraryRetentionDays} jours`})`
    : "OFF";

  // Ici on considère que l'historique est une fonctionnalité "connectée"
  // (anon = OFF, le reste = ON). Si un jour tu veux l'affiner par features,
  // on ajoutera un flag "canSeeHistory".
  const historyLine = logged ? "ON" : "OFF";

  const sections = [
    { label: "Quota du jour", value: quotaLine },
    { label: "Bibliothèque", value: libraryLine },
    { label: "Historique", value: historyLine },
    { label: "Conseils rapides", value: "ON" },
  ];

  // note fixe : rappel “où la sidebar existe réellement”
  const note =
    "Rappel : la sidebar est un outil de génération, affichée seulement sur les pages générateur (Atelier / Élèves / Profs / Parents).";

  return { sections, note };
}

/* =========================================================
   4) COMPONENT PRINCIPAL
========================================================= */

export default function TestClient() {
  const router = useRouter();
  const pathname = usePathname();

  const [mockKey, setMockKey] = useState<string | null>(null);

  useEffect(() => {
    setMockKey(getMockFromWindow());
  }, []);

  // access = la “vérité” mock (plan, quota, bibliothèque, features...)
  const access = useMemo(() => pickAccessMock(mockKey), [mockKey]);

  function setMock(key: MockKey) {
    const url = `${pathname}?mock=${encodeURIComponent(key)}`;
    router.replace(url);
    setMockKey(key);
  }

  function clearMock() {
    router.replace(pathname);
    setMockKey(null);
  }

  const pill = (active: boolean) =>
    [
      "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border transition",
      active
        ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/30"
        : "bg-slate-900/40 text-slate-200 border-slate-800 hover:bg-slate-900/70",
    ].join(" ");

  const chip = (on: boolean) =>
    [
      "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold border",
      on
        ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/25"
        : "bg-slate-900/40 text-slate-300 border-slate-800",
    ].join(" ");

  const card =
    "rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-lg shadow-black/20";

  const remainingToday =
    access?.dailyLimit != null && access?.usedToday != null
      ? getRemainingToday({
          dailyLimit: access.dailyLimit,
          usedToday: access.usedToday,
        })
      : null;

  function canSeeRoute(r: RouteItem) {
    if (r.requiresLogin && !access.isLoggedIn) return false;
    if (r.requiresFeature && !hasFeature(access, r.requiresFeature)) return false;
    return true;
  }

  const visibleBaseRoutes = ROUTES_BASE.filter(canSeeRoute);
  const visibleCollegeRoutes = ROUTES_COLLEGE.filter(canSeeRoute);

  const directionAllowed = canSeeDirection(access);

  // Contrat sidebar (générateur) pour l’état courant
  const sidebarSpec = getSidebarGeneratorSpec(access);
  const cta = getAccountCta(access);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold">Page de test — Mocks EleveAI</h1>
          <p className="text-sm text-slate-300">
            Outil interne : test piloté par{" "}
            <code className="text-slate-200">features</code> /{" "}
            <code className="text-slate-200">plan</code> /{" "}
            <code className="text-slate-200">quotas</code>.
          </p>
        </header>

        {/* ==================================================
           Sélection mock
        ================================================== */}
        <section className={card}>
          <div className="flex flex-wrap items-center gap-2">
            {MOCKS.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setMock(m.key)}
                className={pill(access?.mockKey === m.key)}
                title={m.desc}
              >
                {m.label}
              </button>
            ))}

            <button
              type="button"
              onClick={clearMock}
              className={pill(!mockKey)}
              title="Retirer ?mock=..."
            >
              Clear
            </button>
          </div>

          {/* ==================================================
             Infos access (vérité mock)
          ================================================== */}
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="text-xs text-slate-400">mockKey</div>
              <div className="font-semibold">{access?.mockKey ?? "—"}</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="text-xs text-slate-400">userLabel</div>
              <div className="font-semibold">{access?.userLabel ?? "—"}</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="text-xs text-slate-400">authType / isLoggedIn</div>
              <div className="font-semibold">
                {access?.authType ?? "—"} ·{" "}
                {access?.isLoggedIn ? "✅ connecté" : "⛔ invité"}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="text-xs text-slate-400">plan / uiMode</div>
              <div className="font-semibold">
                {access?.plan ?? "—"} · {access?.uiMode ?? "—"}
              </div>
            </div>

            {/* Quota + bibliothèque (déjà existant, utile) */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 sm:col-span-2">
              <div className="text-xs text-slate-400">quota / bibliothèque</div>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                {access?.plan === "anon" ? (
                  <>
                    <span className="font-semibold">
                      {renderQuotaReadable({
                        usedToday: access.usedToday,
                        dailyLimit: access.dailyLimit,
                      })}{" "}
                      <span className="text-xs text-slate-400">— découverte</span>
                    </span>
                    {renderLibraryBadge(access)}
                    <span className="text-xs text-slate-400">
                      → Connecte-toi pour activer la bibliothèque
                    </span>
                  </>
                ) : access?.plan === "email_free" ? (
                  <>
                    <span className="font-semibold">
                      {renderQuotaReadable({
                        usedToday: access.usedToday,
                        dailyLimit: access.dailyLimit,
                      })}{" "}
                      <span className="text-xs text-amber-300">— gratuit</span>
                    </span>
                    {renderLibraryBadge(access)}
                    <span className="text-xs text-slate-400">
                      → Bibliothèque disponible avec abonnement
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-semibold">
                      dailyLimit: {access?.dailyLimit ?? "—"} · usedToday:{" "}
                      {access?.usedToday ?? "—"} · remaining:{" "}
                      {remainingToday ?? "—"}
                    </span>
                    {renderLibraryBadge(access)}
                  </>
                )}
              </div>
            </div>

            {/* Collège infos */}
            {access?.collegeName ? (
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 sm:col-span-2">
                <div className="text-xs text-slate-400">collège</div>
                <div className="font-semibold">
                  {access.collegeName} · code: {access.collegeCode ?? "—"} ·
                  utilisateur: {access.userCode ?? "—"} · rôle:{" "}
                  {access.collegeRole ?? "—"}
                </div>
              </div>
            ) : null}

            {/* Direction */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 sm:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-400">Direction</div>
                  <div className="font-semibold">
                    {directionAllowed
                      ? "✅ autorisée (/direction visible)"
                      : "⛔ non autorisée"}
                  </div>
                </div>
                <span
                  className={[
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border",
                    directionAllowed
                      ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/25"
                      : "bg-slate-900/40 text-slate-300 border-slate-800",
                  ].join(" ")}
                >
                  {directionAllowed ? "canSeeDirection" : "no-direction"}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 sm:col-span-2">
              <div className="text-xs text-slate-400 mb-2">features</div>
              <div className="flex flex-wrap gap-2">
                {(access?.features ?? []).length === 0 ? (
                  <span className="text-xs text-slate-500">—</span>
                ) : (
                  access.features.map((f) => (
                    <span key={f} className={chip(true)}>
                      {f}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
           CONTRAT UI — Sidebar Générateur
        ================================================== */}
        <section className={card}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold">
                Contrat UI — Sidebar Générateur
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Ce bloc décrit ce que la sidebar DOIT contenir sur les pages
                générateur, selon l’état (plan/auth/features). Outil interne.
              </p>
            </div>

            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border bg-slate-900/40 text-slate-200 border-slate-800">
              {access.plan}
            </span>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {/* Sections de la sidebar (générateur) */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-xs text-slate-400 mb-3">
                Sections (dans la sidebar du générateur)
              </div>

              <div className="space-y-2">
                {sidebarSpec.sections.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-2"
                  >
                    <span className="text-sm text-slate-200">{s.label}</span>
                    <span className="text-xs text-slate-400">{s.value}</span>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[11px] text-slate-500">
                {sidebarSpec.note}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {renderLibraryBadge(access)}
                <span className="text-[11px] text-slate-500">
                  hint:{" "}
                  {access.hints?.underGeneratePaid ??
                    access.hints?.underGenerateFree ??
                    "—"}
                </span>
              </div>
            </div>

            {/* Footer auth de la sidebar générateur */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-xs text-slate-400 mb-3">
                Footer (auth) — liens attendus
              </div>

              <div className="grid gap-2">
                <Link
                  href={
                    access?.mockKey
                      ? `${cta.primary.href}?mock=${access.mockKey}`
                      : cta.primary.href
                  }
                  className="rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-100 hover:bg-slate-900/60 transition"
                >
                  {cta.primary.label}
                  <span className="ml-2 text-xs text-slate-400">
                    {cta.primary.href}
                  </span>
                </Link>

                <Link
                  href={
                    access?.mockKey
                      ? `${cta.secondary.href}?mock=${access.mockKey}`
                      : cta.secondary.href
                  }
                  className="rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-100 hover:bg-slate-900/60 transition"
                >
                  {cta.secondary.label}
                  <span className="ml-2 text-xs text-slate-400">
                    {cta.secondary.href}
                  </span>
                </Link>
              </div>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                <div className="text-xs text-slate-400">Règle d’architecture</div>
                <div className="text-sm text-slate-200 mt-1">
                  Dashboard / Direction : pas de sidebar. Header global : visible partout (retour facile vers générateurs).
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
           Liens routes (app)
        ================================================== */}
        <section className={card}>
          <h2 className="text-base font-semibold">Routes “app”</h2>
          <p className="text-xs text-slate-400 mb-3">
            Les liens ajoutent automatiquement <code>?mock=...</code>. (Dashboard
            masqué si invité.)
          </p>

          <div className="grid gap-2 sm:grid-cols-2">
            {visibleBaseRoutes.map((r) => {
              const href = access?.mockKey
                ? `${r.href}?mock=${access.mockKey}`
                : r.href;

              return (
                <Link
                  key={r.href}
                  href={href}
                  className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 hover:bg-slate-900/60 transition"
                >
                  {r.label}
                  <span className="ml-2 text-xs text-slate-400">{r.href}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ==================================================
           Liens routes (collège)
        ================================================== */}
        {visibleCollegeRoutes.length > 0 ? (
          <section className={card}>
            <h2 className="text-base font-semibold">Routes “collège”</h2>
            <p className="text-xs text-slate-400 mb-3">
              Affichage strictement basé sur <code>features</code>.
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              {visibleCollegeRoutes.map((r) => {
                const href = access?.mockKey
                  ? `${r.href}?mock=${access.mockKey}`
                  : r.href;

                return (
                  <Link
                    key={r.href}
                    href={href}
                    className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 hover:bg-slate-900/60 transition"
                  >
                    {r.label}
                    <span className="ml-2 text-xs text-slate-400">{r.href}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="text-xs text-slate-500">
          Astuce : ouvre plusieurs onglets (un par mock) pour comparer rapidement.
        </section>
      </div>
    </main>
  );
}



