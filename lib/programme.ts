// lib/programme.ts — config des pages « programme » (/programme/<classe>).
// Le moteur SEO n°2 (après les cahiers), inspiré des pages « skills » d'IXL :
// exposer à Google, en texte, TOUTES les compétences de chaque classe — la
// donnée existe déjà dans les banques tutor-v4 (bo → notions → micros).
//
// Architecture (validée avec Frédéric, 11/07/2026) :
// - la CLASSE est la porte (modèle mental du parent), les matières scolaires
//   (maths, français) y sont listées EN ENTIER ;
// - les langues/IA vivent en niveaux CECRL : la page classe fait le PONT
//   (« niveau visé en 5e : A1 → A2 ») sans dupliquer le contenu (SEO) ;
// - façon IXL : le programme d'un côté ┃ les annexes à côté (calcul rapide,
//   dictée, défis, cahier de la classe).
//
// ⚠️ SERVEUR uniquement (importe les banques via catalog) — ne jamais
// importer depuis un composant client.

import { getKnowledgePack, type Classe } from "@/lib/tutor-v4/catalog";

export type ProgrammeClasse = {
  slug: Classe;
  label: string;
  /** « en 6e », « au CP »… pour les phrases naturelles. */
  enClasse: string;
  matieres: ("maths" | "francais")[];
  /** Niveau CECRL visé (attendus Éduscol) — null = pas de bloc langue. */
  anglais: string | null;
  espagnol: string | null;
  /** Référentiel IA maison (A1→C1) — suggestion de départ. */
  ia: string | null;
  /** Slug du cahier de vacances « Vers la/le X » (préparer l'entrée). */
  cahierSlug: string | null;
  calculRapide: boolean;
};

export const PROGRAMME_CLASSES: ProgrammeClasse[] = [
  { slug: "cp",  label: "CP",  enClasse: "au CP",  matieres: ["maths", "francais"], anglais: null, espagnol: null, ia: null, cahierSlug: "vers-le-cp",  calculRapide: false },
  { slug: "ce1", label: "CE1", enClasse: "en CE1", matieres: ["maths", "francais"], anglais: null, espagnol: null, ia: null, cahierSlug: "vers-le-ce1", calculRapide: false },
  { slug: "ce2", label: "CE2", enClasse: "en CE2", matieres: ["maths", "francais"], anglais: null, espagnol: null, ia: null, cahierSlug: "vers-le-ce2", calculRapide: false },
  { slug: "cm1", label: "CM1", enClasse: "en CM1", matieres: ["maths", "francais"], anglais: "découverte → A1", espagnol: null, ia: null, cahierSlug: "vers-le-cm1", calculRapide: true },
  { slug: "cm2", label: "CM2", enClasse: "en CM2", matieres: ["maths", "francais"], anglais: "découverte → A1", espagnol: null, ia: null, cahierSlug: "vers-le-cm2", calculRapide: true },
  { slug: "6e",  label: "6e",  enClasse: "en 6e",  matieres: ["maths", "francais"], anglais: "A1",       espagnol: null,       ia: "A1",   cahierSlug: "vers-la-6e", calculRapide: true },
  { slug: "5e",  label: "5e",  enClasse: "en 5e",  matieres: ["maths", "francais"], anglais: "A1 → A2",  espagnol: "A1",       ia: "A1",   cahierSlug: "vers-la-5e", calculRapide: true },
  { slug: "4e",  label: "4e",  enClasse: "en 4e",  matieres: ["maths", "francais"], anglais: "A2",       espagnol: "A1 → A2",  ia: "A2",   cahierSlug: "vers-la-4e", calculRapide: true },
  { slug: "3e",  label: "3e",  enClasse: "en 3e",  matieres: ["maths", "francais"], anglais: "A2 (B1 pour les plus à l'aise)", espagnol: "A2", ia: "A2", cahierSlug: "vers-la-3e", calculRapide: true },
  { slug: "seconde", label: "Seconde", enClasse: "en seconde", matieres: ["maths"], anglais: "B1", espagnol: "B1", ia: "A2 et plus", cahierSlug: "vers-la-2nde", calculRapide: false },
  { slug: "premiere-spe", label: "Première spé maths", enClasse: "en première", matieres: ["maths"], anglais: "B1 → B2", espagnol: "B1", ia: "B1 et plus", cahierSlug: "vers-la-premiere", calculRapide: false },
  { slug: "terminale-spe", label: "Terminale spé maths", enClasse: "en terminale", matieres: ["maths"], anglais: "B1 → B2", espagnol: "B1 → B2", ia: "B1 et plus", cahierSlug: "vers-la-terminale", calculRapide: true },
];

export function getProgrammeClasse(slug: string): ProgrammeClasse | undefined {
  return PROGRAMME_CLASSES.find((c) => c.slug === slug);
}

export type ProgrammeMatiere = {
  matiere: "maths" | "francais";
  label: string;
  coachHref: string;
  nbNotions: number;
  nbMicros: number;
  domaines: {
    boId: string;
    label: string;
    notions: { id: string; label: string; micros: string[] }[];
  }[];
};

// Le programme d'une matière, groupé BO → notions → micro-compétences.
export function getProgrammeMatiere(
  classe: ProgrammeClasse,
  matiere: "maths" | "francais"
): ProgrammeMatiere | null {
  try {
    const pack = getKnowledgePack(classe.slug, matiere);
    const domaines = pack.bo_competences
      .map((bo) => ({
        boId: bo.boId,
        label: bo.label,
        notions: pack.notions
          .filter((n) => n.boId === bo.boId)
          .map((n) => ({
            id: n.id,
            label: n.label,
            micros: pack.microSkills
              .filter((m) => m.notionId === n.id)
              .map((m) => m.label),
          })),
      }))
      .filter((d) => d.notions.length > 0);

    return {
      matiere,
      label: matiere === "maths" ? "Mathématiques" : "Français",
      coachHref: `/coach-ia/${matiere}?classe=${classe.slug}`,
      nbNotions: pack.notions.length,
      nbMicros: pack.microSkills.length,
      domaines,
    };
  } catch {
    // Banque absente pour ce couple classe/matière : pas de section.
    return null;
  }
}
