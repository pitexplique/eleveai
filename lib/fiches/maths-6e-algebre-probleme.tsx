// ─── Fiche de cours : problèmes à nombres cachés et motifs (6e) ───────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/algebre.bank.ts (notionId algebre_probleme).
//
// ⛔ PRÉ-ALGÈBRE : AUCUNE LETTRE, AUCUNE ÉQUATION. Le programme de 6e demande des
// « modèles pré-algébriques » : on DESSINE la relation (le schéma en barres) au
// lieu de l'écrire. La « part » joue le rôle que la lettre jouera en 5e — mais
// elle ne s'écrit jamais x ici, ni dans le texte, ni dans les dessins.
//
// ⭐ ÉCRITE POUR DES 6e QUI LISENT DIFFICILEMENT (consignes du 30/09/2026) :
// phrases courtes, un dessin sur CHAQUE bloc, Ti Margo en mode classe.
//
// Micro-compétences 4/4 :
// - algebre_barres    → définition + figure (somme 48, écart 12), propriété 1
//                       (36 ÷ 2 = 18), méthodes 1 (90, le double) et 2 (les
//                       primes), exemple 1 (les primes, 110 €), entraînement 1
// - algebre_inconnues → propriété 2 (pastèques et ananas), usage « deux paniers »
//                       (mangues et letchis), exemple 2 (goyave et mangues),
//                       entraînement 2 et 4
// - algebre_motif     → propriété 3 (6, 11, 16 : +5), usage « le tableau des
//                       maisons », exemple 3 (25 maisons, 126), entraînement 3
// - algebre_defi      → propriété 4 (60 billes en 6 parts), usage « 51
//                       allumettes », exemple 4 (31 bâtonnets), entraînement 5
// Tous les nombres sortent de la banque (le BO : les primes de 320 €, les
// maisons en allumettes).
//
// ⚠️ `schema_barre` : dès qu'une part est inconnue, toutes les parts ont la même
// largeur. Et une part trop petite est élargie à 12 % : son étiquette doit
// rester courte (« 1re », pas « 1re maison »), sinon elle sort par la gauche.
// ⚠️ `suite` imprime « Suite » en dur : un motif EST une suite, c'est le seul
// chapitre de 6e où ce canvas est à sa place. Ses « terme 1, terme 2 » sont en
// 10 px : on les coupe (`showLabels: false`).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

type Part = { label: string; value?: string; unknown?: boolean; color?: string };

/** Le schéma en barres de la fiche : 240 de large → étiquettes à 11,3 px. */
const barre = (total: string, parts: Part[], question?: string) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 240, height: question ? 190 : 160 },
      total,
      parts,
      questionLabel: question,
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: Boolean(question) },
    }}
  />
);

const motif = (termes: (number | string)[], fleches: string[], regle: string) => (
  <CanvasRenderer
    figure={{
      kind: "suite",
      theme: "nombre",
      terms: termes,
      arrows: fleches,
      rule: regle,
      display: { showArrows: true, showRule: true, showLabels: false },
    }}
  />
);

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

const inconnu = (label: string): Part => ({ label, unknown: true });

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : le grand, c'est un petit et 12 de plus. Deux « ? » et un 12.
const figure48 = barre("48", [inconnu("petit"), inconnu("petit"), { label: "écart", value: "12", color: "#fef3c7" }], "le grand a 12 de plus");

// PROPRIÉTÉ 1 : on a coupé les 12 qui dépassent. Il reste deux parts égales.
const deuxPartsEgales = barre(
  "36",
  [
    { label: "petit", value: "18" },
    { label: "petit", value: "18" },
  ],
  "48 − 12 = 36, puis 36 ÷ 2 = 18"
);

const pasteques = barre("20 €", [inconnu("pastèque"), inconnu("pastèque"), { label: "ananas", value: "4" }], "20 − 4 = 16 € pour 2 pastèques");

const maisons = motif([6, 11, 16, "?"], ["+5", "+5", "+5"], "6 au départ, puis +5 par maison");

const billes = barre(
  "60",
  [
    { label: "1er", value: "10", color: "#dbeafe" },
    { label: "2e", value: "10", color: "#dcfce7" },
    { label: "2e", value: "10", color: "#dcfce7" },
    { label: "3e", value: "10", color: "#fef3c7" },
    { label: "3e", value: "10", color: "#fef3c7" },
    { label: "3e", value: "10", color: "#fef3c7" },
  ],
  "6 parts égales : 60 ÷ 6 = 10"
);

const le90 = barre("90", [inconnu("petit"), inconnu("grand"), inconnu("grand")], "le grand vaut 2 parts");

const primes = barre("320 €", [inconnu("or"), inconnu("argent"), inconnu("bronze")], "or : +70 € · bronze : −80 €");

const verifier = barre(
  "48",
  [
    { label: "petit", value: "18" },
    { label: "grand", value: "30" },
  ],
  "18 + 30 = 48 : c'est juste"
);

const paniers = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["panier", "prix"],
      rows: [
        { values: ["3 mangues + 2 letchis", "19 €"] },
        { values: ["3 mangues + 5 letchis", "28 €"] },
        { values: ["3 letchis de plus", "9 €"] },
      ],
      highlight: { row: 2 },
    }}
  />
);

const tableauMaisons = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["maisons", "allumettes"],
      rows: [
        { values: ["1", "6"] },
        { values: ["2", "6 + 5 = 11"] },
        { values: ["3", "6 + 2 × 5 = 16"] },
        { values: ["4", "6 + 3 × 5 = 21"] },
      ],
      highlight: { row: 3 },
    }}
  />
);

const allumettes51 = barre(
  "51",
  [
    { label: "1re", value: "6", color: "#fef3c7" },
    { label: "9 maisons de plus", value: "45" },
  ],
  "45 ÷ 5 = 9, donc 10 maisons"
);

const primesEgales = barre(
  "330 €",
  [
    { label: "argent", value: "110" },
    { label: "argent", value: "110" },
    { label: "argent", value: "110" },
  ],
  "320 − 70 + 80 = 330"
);

const goyave = barre("23 €", [{ label: "goyave", value: "2" }, inconnu("mangue"), inconnu("mangue"), inconnu("mangue")], "23 − 2 = 21 € pour 3 mangues");

const vingtCinqMaisons = barre(
  "126",
  [
    { label: "1re", value: "6", color: "#fef3c7" },
    { label: "24 ajouts de 5", value: "120" },
  ],
  "6 + 24 × 5 = 126"
);

const batonnets = motif([4, 7, 10, "…", 31], ["+3", "+3", "", ""], "4 au départ, puis +3");

// EXERCICE FLASH : les 60 billes, rien n'est donné.
const billesQuestion = barre("60", [inconnu("1er"), inconnu("2e"), inconnu("2e"), inconnu("3e"), inconnu("3e"), inconnu("3e")]);

const pieges = [
  "Diviser le total tout de suite : 48 ÷ 2 = 24 ne donne pas le petit. On retire d'abord l'écart.",
  "Pour 25 maisons, calculer 25 × 5 + 6. La 1re maison est déjà dans le 6 : il n'y a que 24 ajouts.",
  "Chercher deux prix avec une seule information. Il en faut deux.",
];

const aRetenir = [
  "Je dessine une barre par nombre caché, et le total au-dessus.",
  "J'enlève ce qui dépasse : il reste des parts égales, je divise.",
  "Un motif : le départ, puis toujours le même ajout.",
];

export const ficheAlgebreProbleme6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "algebre-probleme",
  titre: "Problèmes à nombres cachés et motifs",
  accroche:
    "Deux nombres cachés, un seul total : impossible ? Non ! On les dessine, et la réponse apparaît.",
  identite: [
    { label: "Le mot clé", valeur: "La part : le nombre caché" },
    { label: "Le secret", valeur: "Enlever ce qui dépasse" },
    { label: "Outil", valeur: "Le schéma en barres" },
  ],
  definition: {
    texte:
      "Un problème cache parfois un nombre qu'on ne connaît pas. On le dessine par une barre : c'est une part. Ensuite, on calcule avec les parts, sans deviner.",
  },
  figure: {
    schema: legende(figure48, "Deux nombres font 48. Le grand a 12 de plus que le petit."),
    legende: "Chaque « ? » est un nombre caché. Le dessin montre ce qu'on sait.",
  },
  proprietes: [
    {
      titre: "J'enlève ce qui dépasse",
      micros: ["algebre_barres"],
      texte: "J'enlève les 12 en trop : 48 − 12 = 36. Il reste 2 parts égales : 36 ÷ 2 = 18.",
      schema: deuxPartsEgales,
    },
    {
      titre: "J'enlève ce que je connais",
      micros: ["algebre_inconnues"],
      texte: "2 pastèques et un ananas à 4 € coûtent 20 €. Sans l'ananas : 16 € pour 2 pastèques.",
      schema: pasteques,
    },
    {
      titre: "Je repère ce qui se répète",
      micros: ["algebre_motif"],
      texte: "Maisons en allumettes : 6, 11, 16… On ajoute toujours 5.",
      schema: maisons,
    },
    {
      titre: "Je compte en parts",
      micros: ["algebre_defi"],
      texte: "Le 2e a le double du 1er, le 3e le triple. En tout : 1 + 2 + 3 = 6 parts.",
      schema: billes,
    },
  ],
  reel: {
    texte:
      "Au goûter, deux amis partagent 48 bonbons, mais l'un en a 12 de plus. Trois coureurs se partagent une prime. Une tour en Lego grandit en suivant un motif. À chaque fois, on dessine avant de calculer.",
  },
  historique: {
    texte:
      "Le schéma en barres vient de Singapour. Ses professeurs l'utilisent depuis les années 1980. Les élèves de Singapour sont parmi les meilleurs du monde en maths. La France l'a mis dans ses programmes.",
  },
  methode: [
    {
      titre: "Je dessine",
      micros: ["algebre_barres"],
      texte: "Une barre par nombre caché, et le total au-dessus. Le grand vaut le double du petit : il prend 2 parts.",
      schema: le90,
    },
    {
      titre: "J'égalise",
      micros: ["algebre_barres"],
      texte: "J'enlève ce qui dépasse, j'ajoute ce qui manque. Toutes les parts deviennent égales.",
      schema: primes,
    },
    {
      titre: "Je vérifie",
      micros: ["algebre_barres", "algebre_inconnues"],
      texte: "Je remets mes nombres dans l'énoncé. 18 + 30 = 48, et 30 a bien 12 de plus que 18.",
      schema: verifier,
    },
  ],
  usages: [
    {
      titre: "Comparer deux paniers",
      micros: ["algebre_inconnues"],
      detail: "Les mangues sont les mêmes. Les 3 letchis de plus coûtent 9 €, donc 3 € chacun.",
      schema: paniers,
    },
    {
      titre: "Prévoir un motif",
      micros: ["algebre_motif"],
      detail: "Le départ, puis 5 de plus à chaque maison. Le tableau montre la structure.",
      schema: tableauMaisons,
    },
    {
      titre: "Aller jusqu'où ?",
      micros: ["algebre_defi"],
      detail: "Avec 51 allumettes : 6 pour la 1re maison, il en reste 45. 45 ÷ 5 = 9 maisons de plus.",
      schema: allumettes51,
    },
  ],
  exemples: [
    {
      titre: "Les trois primes",
      micros: ["algebre_barres"],
      donnees: "Une prime de 320 € va aux trois premiers d'une course. L'or a 70 € de plus que l'argent. Le bronze a 80 € de moins.",
      question: "Combien vaut la prime d'argent ?",
      schema: primesEgales,
      solution:
        "J'enlève les 70 € en trop de l'or : 320 − 70 = 250. Je rajoute les 80 € qui manquent au bronze : 250 + 80 = 330. Il reste 3 parts égales : 330 ÷ 3 = 110. L'argent vaut 110 €, l'or 180 €, le bronze 30 €.",
    },
    {
      titre: "Un prix caché",
      micros: ["algebre_inconnues"],
      donnees: "Une goyave coûte 2 €. Un panier avec une goyave et 3 mangues coûte 23 €.",
      question: "Combien coûte une mangue ?",
      schema: goyave,
      solution: "J'enlève la goyave : 23 − 2 = 21 €. Il reste 3 mangues pour 21 €. Une mangue coûte 21 ÷ 3 = 7 €.",
    },
    {
      titre: "25 maisons",
      micros: ["algebre_motif"],
      donnees: "La 1re maison demande 6 allumettes. Chaque maison suivante en demande 5 de plus.",
      question: "Combien d'allumettes pour 25 maisons ?",
      schema: vingtCinqMaisons,
      solution:
        "La 1re maison : 6 allumettes. Il reste 24 maisons, à 5 allumettes chacune : 24 × 5 = 120. En tout : 6 + 120 = 126 allumettes.",
    },
    {
      titre: "Remonter un motif",
      micros: ["algebre_defi"],
      donnees: "Un motif commence par 4 bâtonnets. Chaque étape en ajoute 3. On a 31 bâtonnets.",
      question: "Jusqu'à quelle étape peut-on aller ?",
      schema: batonnets,
      solution:
        "J'enlève les 4 du départ : 31 − 4 = 27. Chaque étape en ajoute 3 : 27 ÷ 3 = 9 étapes de plus. Avec l'étape 1 : 1 + 9 = 10. On va jusqu'à l'étape 10.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Deux nombres font 90 en tout. Le grand vaut le double du petit. Quel est le grand ?",
      correction: "Le petit fait 1 part, le grand 2 parts : 3 parts en tout. 90 ÷ 3 = 30. Le grand vaut 2 × 30 = 60.",
      micros: ["algebre_barres"],
    },
    {
      question: "Trois ananas identiques coûtent 12 €. Combien coûte un ananas ?",
      correction: "3 parts égales : 12 ÷ 3 = 4. Un ananas coûte 4 €.",
      micros: ["algebre_inconnues"],
    },
    {
      question: "Maisons en allumettes : 6 pour la 1re, puis 5 de plus par maison. Combien pour 4 maisons ?",
      correction: "6 pour la 1re, puis 3 maisons de plus : 6 + 3 × 5 = 21 allumettes.",
      micros: ["algebre_motif"],
    },
    {
      question: "Un ananas et une pastèque coûtent 15 € ensemble. Peut-on trouver le prix de chacun ?",
      correction: "Non. 5 € et 10 €, 6 € et 9 €, 7 € et 8 €… tout marche. Il faut une deuxième information.",
      micros: ["algebre_inconnues"],
    },
    {
      question: "Trois enfants se partagent 60 billes. Le 2e a le double du 1er, le 3e le triple du 1er. Combien le 1er a-t-il de billes ?",
      correction: "1 + 2 + 3 = 6 parts égales. 60 ÷ 6 = 10. Le 1er a 10 billes, le 2e 20, le 3e 30.",
      micros: ["algebre_defi"],
    },
  ],
  tiMargo: {
    objectif: "Je dessine avant de calculer !",
    methode: "Il reste des parts égales !",
    pieges: "24 ajouts, pas 25 !",
    retenir: "J'enlève d'abord ce qui dépasse.",
    exercice: "À toi ! Compte les parts.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : le mode classe n'a pas de rendu KaTeX.
export const slidesAlgebreProbleme6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Nombres cachés - 6e",
    schema: avecMargo(figure48, "Je dessine avant de calculer !"),
    section: {
      type: "objectif",
      phrase: "Trouver un nombre caché en le dessinant",
      sousPhrase: "Deux nombres font 48. Le grand a 12 de plus. Le dessin montre ce qu'on sait.",
      encadre: { titre: "L'idée", texte: "Un nombre caché devient une barre : une part." },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: paniers,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Des bonbons à partager, des prix à retrouver, une tour en Lego qui grandit.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "Le schéma en barres vient de Singapour. Ses élèves sont parmi les meilleurs du monde en maths.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    teinte: "essentiel",
    schema: avecMargo(deuxPartsEgales, "Il reste des parts égales !", "joie"),
    section: {
      type: "objectif",
      phrase: "J'enlève ce qui dépasse",
      sousPhrase: "48 − 12 = 36. Il reste 2 parts égales : 36 ÷ 2 = 18. Le petit vaut 18.",
    },
  },
  {
    titre: "Quatre sortes de problèmes",
    badge: "Ce qu'on sait faire",
    teinte: "propriete",
    schema: maisons,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Un écart", texte: "J'enlève ce qui dépasse, puis je partage." },
        { titre: "Un prix caché", texte: "J'enlève ce que je connais déjà." },
        { titre: "Un motif", texte: "Le départ, puis toujours le même ajout : 6, 11, 16…" },
        { titre: "Des parts", texte: "Le double, c'est 2 parts. Le triple, 3 parts." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    teinte: "methode",
    schema: le90,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Je dessine", texte: "Une barre par nombre caché. Le total au-dessus." },
        { titre: "J'égalise", texte: "J'enlève ce qui dépasse, j'ajoute ce qui manque." },
        { titre: "Je vérifie", texte: "Je remets mes nombres dans l'énoncé." },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Les trois primes",
    teinte: "exemple",
    schema: primesEgales,
    section: {
      type: "exemple",
      enonce: "320 € pour trois coureurs. L'or a 70 € de plus que l'argent, le bronze 80 € de moins.",
      question: "Combien vaut l'argent ?",
      correction: "320 − 70 + 80 = 330. Trois parts égales : 330 ÷ 3 = 110 €.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Un motif",
    teinte: "exemple",
    schema: tableauMaisons,
    section: {
      type: "exemple",
      enonce: "6 allumettes pour la 1re maison, puis 5 de plus par maison.",
      question: "Combien pour 25 maisons ?",
      correction: "6 pour la 1re, puis 24 ajouts : 6 + 24 × 5 = 126 allumettes.",
    },
  },
  {
    titre: "Attention aux pièges",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(vingtCinqMaisons, "24 ajouts, pas 25 !", "attention"),
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            <li>• Diviser le total tout de suite.</li>
            <li>• Compter la 1re maison deux fois.</li>
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            <li>• J'enlève d'abord l'écart.</li>
            <li>• Le départ, puis les ajouts.</li>
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(billesQuestion, "À toi ! Compte les parts.", "joie"),
    section: {
      type: "exercice",
      enonce: "Trois enfants se partagent 60 billes. Le 2e a le double du 1er, le 3e le triple.",
      question: "Combien de billes pour le 1er ?",
      indice: "Compte les parts : 1, puis 2, puis 3.",
      correction: "6 parts égales : 60 ÷ 6 = 10. Le 1er a 10 billes.",
    },
  },
];
