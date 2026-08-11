"use client";

// LES PIECES COMMUNES DU BILAN DE CLASSE.
//
// Sorties de MaClasseClient le 11/08/2026, quand le mode presentation est
// arrive : les deux vues affichent le meme anneau, les memes couleurs de
// groupe et la meme agregation par savoir-faire. Deux copies auraient diverge
// au premier ajustement — et une pastille qui ne dit pas la meme chose a
// l'ecran et au videoprojecteur, personne ne s'en apercoit avant la reunion.

import { GROUPES, type GroupeMaitrise } from "@/lib/eval-nationale/moteur";

export type BlocBilan = {
  id: string;
  label: string;
  justes: number;
  total: number;
  groupe: string;
};

export type MicroBilan = {
  microId: string;
  microLabel: string;
  notionId: string;
  notionLabel: string;
  reussi: boolean;
};

export type EleveDeLaClasse = {
  codeUtilisateur: string;
  groupe: string;
  nom: string | null;
  resultat: {
    score: number;
    total: number;
    groupe: string | null;
    dureeSec: number | null;
    chronoEcoule: boolean;
    simule: boolean;
    domaines: BlocBilan[];
    tests: BlocBilan[];
    micros: MicroBilan[];
    passeLe: string;
  } | null;
};

/**
 * UNE LIGNE PAR SAVOIR-FAIRE — la colonne de gauche de la restitution
 * officielle, celle que M. Pelka a envoyée en exemple.
 *
 * C'est la moitié de sa demande que les domaines ne servent pas : savoir que
 * « Nombres et calculs » coince ne dit pas quoi reprendre lundi. Savoir que
 * « Comparer et ordonner des nombres décimaux » est à 26 %, si.
 *
 * ⚠️ TOUS LES ÉLÈVES N'ONT PAS EU LES MÊMES QUESTIONS — le tirage est
 * individuel, contrairement au jour J où toute la France a le même sujet. Le
 * «sur combien» varie donc d'une ligne à l'autre, et il est AFFICHÉ : un
 * 100 % sur deux élèves ne se lit pas comme un 100 % sur vingt.
 */
export type SavoirFaire = {
  microId: string;
  notionId: string;
  label: string;
  notionLabel: string;
  reussites: number;
  sur: number;
  pct: number;
};

export function savoirsFaire(eleves: EleveDeLaClasse[]): SavoirFaire[] {
  const acc = new Map<string, SavoirFaire>();
  for (const e of eleves) {
    for (const m of e.resultat?.micros ?? []) {
      const v = acc.get(m.microId) ?? {
        microId: m.microId,
        notionId: m.notionId,
        label: m.microLabel,
        notionLabel: m.notionLabel,
        reussites: 0,
        sur: 0,
        pct: 0,
      };
      v.sur += 1;
      if (m.reussi) v.reussites += 1;
      acc.set(m.microId, v);
    }
  }
  return [...acc.values()]
    .map((v) => ({ ...v, pct: Math.round((v.reussites / v.sur) * 100) }))
    // ⭐ LE PLUS BAS EN PREMIER. La restitution officielle garde l'ordre des
    // questions ; nous n'en avons pas de commun puisque le tirage est
    // individuel. Trier par réussite croissante répond directement à la
    // question posée — « celles qui posent des difficultés » d'abord.
    .sort((a, b) => a.pct - b.pct || b.sur - a.sur);
}

/**
 * LES TROIS COULEURS DES GROUPES DE MAÎTRISE, en dur pour le SVG.
 *
 * Ce sont celles de la restitution officielle — orange, ocre, vert — pour que
 * M. Pelka retrouve son code couleur. ⚠️ VALIDÉES, PAS CHOISIES À L'ŒIL : le
 * premier jeu (rouge/ambre/cyan, celui des barres empilées) était refusé —
 * le cyan tombait sous le plancher de chroma et passait pour du gris.
 * Celui-ci passe le seuil de séparation daltonienne (ΔE 12,5) et le plancher
 * de vision normale (16,5). Le seul avertissement porte sur le contraste de
 * l'ocre sur fond clair : il est levé parce que chaque part porte son nombre
 * écrit à côté — la couleur ne porte jamais l'information seule.
 */
export const COULEUR_GROUPE: Record<GroupeMaitrise, string> = {
  a_besoins: "#c2410c",
  fragile: "#ca8a04",
  satisfaisant: "#166534",
};

/**
 * L'ANNEAU DES TROIS GROUPES — la forme que porte sa restitution officielle.
 *
 * Dessiné en SVG, sans aucune librairie : trois arcs, un trait de fond de la
 * couleur de la page entre eux pour qu'ils ne se touchent pas. Un camembert
 * n'est légitime que pour une part-de-tout lue d'un coup d'œil, à peu de
 * parts — trois, ici. Les nombres sont écrits à côté, jamais dans les parts.
 */
export function Anneau({
  parts,
  total,
}: {
  parts: { groupe: GroupeMaitrise; n: number }[];
  total: number;
}) {
  const R = 54;
  const C = 2 * Math.PI * R;
  let depart = 0;
  return (
    <svg viewBox="0 0 140 140" className="h-32 w-32 shrink-0" role="img"
      aria-label={parts
        .map((p) => `${GROUPES[p.groupe].label} ${p.n} sur ${total}`)
        .join(", ")}
    >
      <g transform="translate(70,70) rotate(-90)">
        <circle r={R} fill="none" stroke="#1d1c16" strokeOpacity={0.08} strokeWidth={20} />
        {parts.map((p) => {
          const part = total > 0 ? p.n / total : 0;
          const longueur = part * C;
          const el = (
            <circle
              key={p.groupe}
              r={R}
              fill="none"
              stroke={COULEUR_GROUPE[p.groupe]}
              strokeWidth={20}
              strokeDasharray={`${Math.max(longueur - 2, 0)} ${C - Math.max(longueur - 2, 0)}`}
              strokeDashoffset={-depart}
            />
          );
          depart += longueur;
          return el;
        })}
      </g>
      <text
        x="70" y="66" textAnchor="middle"
        className="fill-[#1d1c16] font-serif text-[26px] font-black"
      >
        {total}
      </text>
      <text
        x="70" y="82" textAnchor="middle"
        className="fill-[#1d1c16]/60 text-[10px] font-bold"
      >
        {total > 1 ? "élèves" : "élève"}
      </text>
    </svg>
  );
}

/** Les couleurs de la restitution officielle : rouge, orange, jaune, vert. */
export function couleurPct(pct: number) {
  if (pct < 30) return "bg-red-100 text-red-900";
  if (pct < 50) return "bg-orange-100 text-orange-900";
  if (pct < 70) return "bg-amber-100 text-amber-900";
  return "bg-emerald-100 text-emerald-900";
}

/**
 * OÙ ENVOYER RETRAVAILLER UNE COMPÉTENCE.
 *
 * ⚠️ L'épreuve porte sur l'année d'AVANT — un entrant de 6ᵉ est évalué sur le
 * CM2. Le coach doit donc s'ouvrir sur le CM2, pas sur la 6ᵉ, sans quoi on
 * enverrait l'élève réviser une notion qu'il n'a pas encore vue.
 *
 * La table est écrite ici plutôt qu'importée de la `ConfigEpreuve` : importer
 * la config embarquerait toute la banque de questions dans le bundle de cette
 * page, qui n'en pose aucune.
 */
export const CLASSE_SOURCE: Record<string, string> = { "6e": "cm2", "4e": "5e" };

export function lienRemediation(classe: string, matiere: string, sf: SavoirFaire) {
  if (!sf.notionId) return null;
  return (
    `/tutor-v4?classe=${encodeURIComponent(CLASSE_SOURCE[classe] ?? classe)}` +
    `&matiere=${encodeURIComponent(matiere)}` +
    `&notion=${encodeURIComponent(sf.notionId)}` +
    `&microId=${encodeURIComponent(sf.microId)}&display=simple`
  );
}

/**
 * L'EXPORT TABLEUR — la seconde moitié de ce que rend l'institution.
 *
 * Le document professeur de la DEPP est explicite : la restitution
 * individuelle est un PDF, celle de la classe « se présente sous la forme d'un
 * fichier tableur afin de faciliter le traitement des résultats ». Les deux ne
 * servent pas à la même chose — le PDF se transmet et s'archive, le tableur se
 * trie, se filtre, et devient un emploi du temps de groupes de besoins.
 *
 * ⚠️ TROIS DÉTAILS SANS LESQUELS EXCEL EN FRANÇAIS OUVRE UNE BOUILLIE :
 *  • le séparateur est le POINT-VIRGULE (Excel FR lit la virgule comme un
 *    séparateur décimal, pas de colonne) ;
 *  • le fichier commence par un BOM UTF-8, sans quoi « à besoins » devient
 *    « Ã  besoins » ;
 *  • les fins de ligne sont en CRLF.
 * Ce sont trois lignes de code et la différence entre un fichier utilisable et
 * un fichier qu'on nous renvoie en disant « ça ne marche pas ».
 */
export function versCsv(lignes: string[][]): string {
  const echappe = (v: string) =>
    /[";\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
  return (
    "\uFEFF" + lignes.map((l) => l.map(echappe).join(";")).join("\r\n")
  );
}

export function telecharger(nom: string, contenu: string) {
  const url = URL.createObjectURL(
    new Blob([contenu], { type: "text/csv;charset=utf-8;" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = nom;
  a.click();
  URL.revokeObjectURL(url);
}

export const ORDRE: GroupeMaitrise[] = ["a_besoins", "fragile", "satisfaisant"];

export function estGroupe(v: string | null | undefined): v is GroupeMaitrise {
  return v === "a_besoins" || v === "fragile" || v === "satisfaisant";
}

/** La pastille de couleur d'un groupe — la même sur toute la page. */
export function Pastille({ groupe }: { groupe: string }) {
  if (!estGroupe(groupe)) return null;
  const g = GROUPES[groupe];
  return (
    <span
      className={`text-[10px] font-black uppercase tracking-[0.12em] ${g.couleur}`}
    >
      {g.label}
    </span>
  );
}

