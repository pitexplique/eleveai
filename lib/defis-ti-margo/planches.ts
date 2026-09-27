// lib/defis-ti-margo/planches.ts
//
// ⭐ LES DÉFIS DE TI MARGO — le calcul mental en planches de BD (27/09/2026).
//
// Né des automatismes du CP, mais SANS CLASSE (Frédéric : « ce n'est pas que
// pour le CP, des élèves ont du mal même en CE2 ») : une planche se range par
// SAVOIR (compléments à 10, doubles…), jamais par âge — une étiquette « CP »
// humilierait l'élève de CE2 qui en a besoin.
//
// Les principes, tirés de la psychologie de l'enfant et arrêtés avec lui :
// - un compagnon, pas un décor : Ti Margo (le margouillat, curieux, espiègle,
//   joyeux, jamais moqueur) et son copain Pic (le paille-en-queue) posent les
//   questions dans une bulle ;
// - du concret : la dizaine est une FAMILLE de dix coccinelles sur sa feuille
//   (« je n'ai pas envie de remplir des caisses mais d'en faire une famille ») ;
// - une case à la fois, lue à voix haute ;
// - ⛔ AUCUNE réponse proposée à cliquer (« ils vont vouloir cliquer ») :
//   l'enfant tape la sienne sur un pavé de chiffres ;
// - des défis et des amis : Pic parie, Ti Margo se trompe exprès et l'enfant le
//   corrige ; des étoiles, jamais de classement.
//
// Les nombres changent à chaque partie : une planche se rejoue.

export type Parleur = "margo" | "pic";

/** Ce que la case dessine. */
export type Scene =
  /** La feuille aux dix places ; `presents` coccinelles dessus. */
  | { type: "feuille"; presents: number; gouter?: boolean }
  /** La feuille, et des feuilles tombées qui en cachent une partie. */
  | { type: "cachees"; visibles: number }
  /** Une égalité écrite en grand, la feuille en fond. */
  | { type: "egalite"; gauche: string; droite: string };

export type CaseBD = {
  qui: Parleur;
  /** L'étiquette de la case, en haut à gauche (« Le défi de Pic »). */
  etiquette: string;
  /** La bulle : la question, telle que le personnage la dit. */
  bulle: string;
  reponse: number;
  /** La relance au premier essai faux : une méthode, jamais la réponse. */
  aide: string;
  /** La réplique quand c'est juste. */
  bravo: string;
  scene: Scene;
  /** La dernière case : l'étoile dorée. */
  grandDefi?: boolean;
};

export type Planche = {
  slug: string;
  /** Le savoir travaillé — c'est ainsi que les planches se rangent. */
  savoir: string;
  titre: string;
  /** Titre et description Google. */
  titreSeo: string;
  description: string;
  /** Une partie neuve : six cases, des nombres tirés au hasard. */
  tirer: () => CaseBD[];
};

function entre(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Des nombres tous différents : deux cases ne demandent pas la même chose. */
function distincts(n: number, min: number, max: number): number[] {
  const pris = new Set<number>();
  while (pris.size < n) pris.add(entre(min, max));
  return [...pris].sort(() => Math.random() - 0.5);
}

/** « 1 est rentré » / « 3 sont rentrés » : ⛔ « 1 sont rentrés » sortait au test du 27/09. */
function selon(n: number, un: string, plusieurs: string): string {
  return n > 1 ? plusieurs : un;
}

/* ═══════════════ LA FAMILLE COCCINELLE — les compléments à 10 ═══════════════ */

function familleCoccinelle(): CaseBD[] {
  // Six « déjà là » tous différents, entre 1 et 9 : six compléments différents.
  const [a, b, c, d, e, f] = distincts(6, 1, 9);
  // Ti Margo se trompe d'une unité, jamais au point d'écrire 0 ou 10.
  let faux = 10 - c + (Math.random() < 0.5 ? 1 : -1);
  if (faux < 1 || faux > 9) faux = 10 - c + (faux < 1 ? 1 : -1);
  return [
    {
      qui: "margo",
      etiquette: "Le matin",
      bulle: `Maman Coccinelle a 10 petits. Ce matin, ${a} ${selon(a, "est rentré", "sont rentrés")} sur la feuille. Combien en manque-t-il pour que la famille soit au complet ?`,
      reponse: 10 - a,
      aide: "Compte les places vides sur la feuille !",
      bravo: `Bravo ! Il en manque ${10 - a}. ${a} et ${10 - a}, ça fait 10 !`,
      scene: { type: "feuille", presents: a },
    },
    {
      qui: "pic",
      etiquette: "Pic survole le jardin",
      bulle: `Moi, d'en haut, je vois ${b} ${selon(b, "coccinelle", "coccinelles")} sur la feuille. Combien sont encore parties se promener ?`,
      reponse: 10 - b,
      aide: "La famille, c'est 10. Regarde combien de places sont vides.",
      bravo: `Oui ! ${10 - b} ${selon(10 - b, "se promène", "se promènent")} encore. Je vais ${selon(10 - b, "la", "les")} chercher !`,
      scene: { type: "feuille", presents: b },
    },
    {
      qui: "margo",
      etiquette: "Ti Margo se trompe ?",
      bulle: `Moi, je dis que ${c} et ${faux}, ça fait 10 ! Et toi, avec ${c}, il faut combien pour faire 10 ?`,
      reponse: 10 - c,
      aide: `Il y a ${c} ${selon(c, "coccinelle", "coccinelles")} : compte les places vides, pas ce que dit Ti Margo !`,
      bravo: `Tu as raison : ${c} et ${10 - c} font 10. Je m'étais trompé exprès… tu m'as bien corrigé !`,
      scene: { type: "feuille", presents: c },
    },
    {
      qui: "margo",
      etiquette: "Le goûter",
      bulle: `C'est l'heure du goûter ! ${d} ${selon(d, "petit mange", "petits mangent")} des pucerons sur la feuille. Les autres jouent dans l'herbe. Combien jouent dans l'herbe ?`,
      reponse: 10 - d,
      aide: "Les petits qui goûtent sont sur la feuille : compte ceux qui manquent.",
      bravo: `C'est ça : ${10 - d} ${selon(10 - d, "joue", "jouent")} dans l'herbe. Miam, les pucerons !`,
      scene: { type: "feuille", presents: d, gouter: true },
    },
    {
      qui: "pic",
      etiquette: "Le défi de Pic",
      bulle: `Je parie que tu ne trouves pas : 10, c'est ${e} et combien ?`,
      reponse: 10 - e,
      aide: `Imagine ${e} ${selon(e, "coccinelle", "coccinelles")} sur la feuille : combien de places restent vides ?`,
      bravo: `Quoi ?! Tu as trouvé ${10 - e} ! D'accord… tu as gagné mon défi !`,
      scene: { type: "egalite", gauche: "10", droite: `${e} + …` },
    },
    {
      qui: "margo",
      etiquette: "⭐ Le grand défi du soir",
      bulle: `Le soir, toute la famille rentre. Mais le vent a fait tomber des feuilles ! On voit ${f} ${selon(f, "coccinelle", "coccinelles")}. Combien sont cachées sous les feuilles ?`,
      reponse: 10 - f,
      aide: "La famille est au complet : 10. Celles qu'on ne voit pas sont cachées.",
      bravo: `${10 - f} ${selon(10 - f, "était cachée", "étaient cachées")} ! Toute la famille est rentrée. Tu gagnes l'étoile dorée !`,
      scene: { type: "cachees", visibles: f },
      grandDefi: true,
    },
  ];
}

export const PLANCHES: Planche[] = [
  {
    slug: "famille-coccinelle",
    savoir: "Les compléments à 10",
    titre: "La famille Coccinelle",
    titreSeo: "La famille Coccinelle : les compléments à 10",
    description:
      "Maman Coccinelle attend ses dix petits. Combien en manque-t-il ? Six défis en BD avec Ti Margo et Pic pour savoir faire 10 sans compter sur ses doigts.",
    tirer: familleCoccinelle,
  },
];

export function getPlanche(slug: string): Planche | null {
  return PLANCHES.find((p) => p.slug === slug) ?? null;
}
