"use client";

// LE RÉSUMÉ DE L'ÉLÈVE — ce que la colonne de gauche porte à la place du RÉCENT.
//
// ⭐ POURQUOI IL REMPLACE L'HISTORIQUE (29/08/2026, Frédéric : « sa fonction,
// est-ce vraiment utile de garder l'historique ? »). Le RÉCENT ne se remplissait
// que si l'on TAPAIT une question — cliquer « 6e » puis « Mathématiques » puis
// « M'entraîner », c'est-à-dire le chemin que l'écran est fait pour provoquer,
// n'écrivait rien. Il restait donc vide chez presque tout le monde, et il ne
// disait de toute façon que des GESTES passés, jamais où l'on en est.
//
// ⭐ IL S'AFFICHE CONNECTÉ **OU NON** (Frédéric, même jour). C'est la condition
// pour qu'une colonne mérite sa largeur : neuf visiteurs sur dix arrivent sans
// compte, et une colonne qui ne sert qu'aux connectés est une colonne vide pour
// eux. La liste des activités est donc la MÊME dans les deux cas — ce sont des
// portes. Le compte ne change pas la liste : il pose des chiffres dessus.
//
// ⚠️ RÈGLE DE POIDS, INCHANGÉE : sans compte, ce bloc ne déclenche AUCUNE
// requête (voir l'en-tête de ColonneGauche). Avec un compte, il en fait UNE, et
// une seule — /api/profil-eleve lit un snapshot déjà calculé (`profil_eleve`,
// une ligne). ⛔ SURTOUT PAS /api/dashboard, qui interroge onze tables à
// 5 000 lignes avec leurs `details` : c'est l'écran du dashboard, pas l'entrée
// du site.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import type { ProfilEleve } from "@/lib/profil-eleve/types";

/**
 * LES PORTES, POUR TOUT LE MONDE.
 *
 * ⭐ LE COACH ET LES PARCOURS PORTENT LEURS CINQ MATIÈRES (Frédéric, 29/08/2026 :
 * « tu as mis Coach et Parcours qui pointent sur maths, or il y a français,
 * anglais, espagnol, IA »). Une seule ligne « Coach » menait au coach de maths :
 * la colonne annonçait une activité et en ouvrait une cinquième. Quatre matières
 * sur cinq n'avaient aucune porte, alors qu'elles ont chacune la leur.
 *
 * ⚠️ LES DEUX FAMILLES N'ONT PAS LA MÊME FORME D'URL, et il n'y a rien à
 * uniformiser ici : le coach est UNE route dynamique (`/coach-ia/<matiere>`),
 * les parcours sont CINQ routes distinctes, dont celle des maths s'appelle
 * `/parcours` tout court. Écrire `/parcours-maths` par symétrie donnerait un 404.
 * ⚠️ L'anglais s'appelle `english-maths` partout dans le code (c'est le nom du
 * type `Matiere` dans `lib/tutor-v4/catalog.ts`), jamais `anglais` — sauf à
 * l'écran, où l'élève lit « Anglais ».
 * ⚠️ Le coach d'anglais reste maigre (voir la note de l'audit SEO) : la porte est
 * ouverte parce qu'elle existe, pas parce qu'elle est prête.
 */
type Activite = {
  label: string;
  href?: string;
  /** Les matières de cette activité, quand elle en a. */
  matieres?: { label: string; href: string }[];
};

const ACTIVITES: Activite[] = [
  {
    label: "Coach",
    matieres: [
      { label: "Maths", href: "/coach-ia/maths" },
      { label: "Français", href: "/coach-ia/francais" },
      { label: "Anglais", href: "/coach-ia/english-maths" },
      { label: "Espagnol", href: "/coach-ia/espagnol" },
      { label: "IA", href: "/coach-ia/ia" },
    ],
  },
  {
    label: "Parcours",
    matieres: [
      { label: "Maths", href: "/parcours" },
      { label: "Français", href: "/parcours-francais" },
      { label: "Anglais", href: "/parcours-english-maths" },
      { label: "Espagnol", href: "/parcours-espagnol" },
      { label: "IA", href: "/parcours-ia" },
    ],
  },
  { label: "Calcul rapide", href: "/calcul-rapide" },
  { label: "Dictée du jour", href: "/dictee-du-jour" },
  { label: "Défis du jour", href: "/defis-du-jour" },
];

/** Le libellé lisible d'une matière du profil. Volontairement local : ce bloc ne
 *  doit rien devoir au module de l'historique, qu'il remplace. */
const LABEL_MATIERE: Record<string, string> = {
  maths: "Maths",
  francais: "Français",
  anglais: "Anglais",
  espagnol: "Espagnol",
  ia: "IA",
};

/**
 * ⚠️ UN SEUL APPEL PAR VISITE, MÊME MONTÉ DEUX FOIS. La colonne rend son contenu
 * à deux endroits — l'aside de l'ordinateur et le tiroir du téléphone — et un
 * `useEffect` dans le composant partirait donc en double. La promesse est
 * mémorisée ici, hors de React : le second montage attend la première.
 */
let cacheToken: string | null = null;
let cachePromesse: Promise<ProfilEleve | null> | null = null;

function chargerProfil(token: string): Promise<ProfilEleve | null> {
  if (cacheToken === token && cachePromesse) return cachePromesse;
  cacheToken = token;
  cachePromesse = fetch("/api/profil-eleve", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => (d?.ok && d.profil ? (d.profil as ProfilEleve) : null))
    // Le résumé n'est pas la raison d'être de la page : s'il échoue, il
    // disparaît, il n'affiche pas d'erreur au milieu de l'entrée.
    .catch(() => null);
  return cachePromesse;
}

/** « 3 jours d'affilée · 24 activités » — la ligne qui ne peut que monter. */
function ligneRythme(p: ProfilEleve): string | null {
  const bouts: string[] = [];
  if (p.comportement.serie >= 2) bouts.push(`${p.comportement.serie} jours d'affilée`);
  if (p.comportement.total_activites > 0) {
    const n = p.comportement.total_activites;
    bouts.push(`${n} activité${n > 1 ? "s" : ""}`);
  }
  return bouts.length > 0 ? bouts.join(" · ") : null;
}

export default function ResumeEleve() {
  const { eleve } = useEleve();
  const token = eleve?.token ?? null;
  const [profil, setProfil] = useState<ProfilEleve | null>(null);

  useEffect(() => {
    if (!token) {
      setProfil(null);
      return;
    }
    let annule = false;
    chargerProfil(token).then((p) => {
      if (!annule) setProfil(p);
    });
    return () => {
      annule = true;
    };
  }, [token]);

  const reco = profil?.reco_du_jour?.principale ?? null;

  /**
   * ⚠️ AU MOINS DEUX PASSAGES POUR AFFICHER UNE MAÎTRISE. Un premier essai raté
   * sur une notion neuve donne un chiffre bas, et ce chiffre serait posé à
   * l'entrée du site à chaque visite — un bulletin qu'on ne peut plus fermer.
   * La maîtrise est pondérée par la récence : elle remonte, mais il faut lui
   * laisser de quoi remonter avant de l'écrire.
   */
  const matieres = (profil?.niveau.par_matiere ?? []).filter(
    (m) => m.nb >= 2 && m.mastery !== null
  );
  const rythme = profil ? ligneRythme(profil) : null;

  return (
    <>
      {/* ── La reprise, quand le profil en propose une ──────────────────── */}
      {reco && (
        <Link
          href={reco.lien}
          prefetch={false}
          className="mb-4 block rounded-xl border border-teal-200 bg-teal-50 px-3 py-2.5 transition hover:border-teal-400"
        >
          <span className="block text-[11px] font-medium uppercase tracking-wide text-teal-700">
            {reco.categorie}
          </span>
          <span className="mt-0.5 block text-sm font-medium leading-snug text-slate-900">
            {reco.titre}
          </span>
          {/* ⭐ LE MOTIF, ET PAS SEULEMENT LA DESTINATION (29/08/2026).
              « Reprendre — Les fractions » est ce que propose n'importe quelle
              bibliothèque de cours : la reprise d'un chapitre là où on l'avait
              laissé. Le `message` dit autre chose — « ta maîtrise sur ce point
              est autour de 42/100 » — parce qu'il vient d'une maîtrise calculée
              par notion et pondérée par la récence, pas d'un signet. Sans lui,
              la ligne ressemble à un signet, et tout ce qui la distingue reste
              invisible. */}
          <span className="mt-1 block text-xs leading-snug text-slate-600 line-clamp-3">
            {reco.message}
          </span>
          <span className="mt-1.5 block text-xs font-medium text-teal-800">{reco.cta}</span>
        </Link>
      )}

      {/* ── Où l'on en est. Le chiffre est une MAÎTRISE, jamais une note ──
          Une moyenne de score_sur_20 mélange les modes et les notions : elle
          tombe dès qu'on attaque du neuf, et l'élève la relirait à chaque
          ouverture de l'accueil. La maîtrise, elle, est pondérée par la récence
          et dit où l'on en est — pas ce que l'on vaut. */}
      {matieres.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 px-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Où tu en es
          </p>
          <ul className="space-y-1.5 px-1">
            {matieres.map((m) => (
              <li key={m.matiere}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm text-slate-600">
                    {LABEL_MATIERE[m.matiere] ?? m.matiere}
                  </span>
                  <span className="shrink-0 text-xs font-medium text-slate-500">
                    {m.mastery}
                    <span className="text-slate-400">/100</span>
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-teal-600"
                    style={{ width: `${m.mastery}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          {rythme && <p className="mt-2 px-1 text-[11px] text-slate-400">{rythme}</p>}
          <Link
            href="/dashboard-eleve"
            prefetch={false}
            className="mt-1.5 block rounded-lg px-1 py-1 text-xs text-slate-500 transition hover:text-slate-800"
          >
            Tableau de bord →
          </Link>
        </div>
      )}

      {/* ── Les portes. Toujours là, avec ou sans compte ─────────────────── */}
      <p className="mb-2 px-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
        Tes activités
      </p>
      <ul className="space-y-0.5">
        {ACTIVITES.map((a) => (
          <li key={a.label}>
            {/* Une activité à matières n'est PAS un lien : son intitulé est un
                titre, et ce sont les matières qui s'ouvrent. Le rendre cliquable
                obligerait à en élire une — c'est exactement ce qui envoyait tout
                le monde en maths. */}
            {a.href ? (
              <Link
                href={a.href}
                prefetch={false}
                className="block rounded-lg px-2 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {a.label}
              </Link>
            ) : (
              <div className="px-2 pb-1 pt-1.5">
                <span className="block text-sm text-slate-600">{a.label}</span>
                {/* ⚠️ `flex-wrap` et non une rangée qui défile : cinq matières ne
                    tiennent pas dans 256 px, et une rangée à faire glisser cache
                    l'espagnol et l'IA derrière un geste que personne ne devine. */}
                <div className="mt-1 flex flex-wrap gap-1">
                  {a.matieres?.map((m) => (
                    <Link
                      key={m.href}
                      href={m.href}
                      prefetch={false}
                      className="rounded-full bg-white px-2 py-0.5 text-[11px] text-slate-500 transition hover:bg-teal-700 hover:text-white"
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
