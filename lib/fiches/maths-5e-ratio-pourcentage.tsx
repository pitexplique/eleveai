// ─── Fiche de cours : ratios, pourcentages et coefficient (5e) ─────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/proportionnalite.bank.ts,
// notionId **prop_ratio_pourcentage** (la banque en porte deux :
// prop_proportionnalite a sa propre fiche, maths-5e-proportionnalite).
//
// ⚠️ NE PAS CONFONDRE AVEC `maths-5e-pourcentages.tsx`, qui est une fiche SEO
// autonome sur le calcul d'un pourcentage. Celle-ci est la NOTION DU COACH :
// elle réunit le ratio, le pourcentage et le coefficient multiplicateur —
// trois façons d'écrire un même rapport.
//
// Micro-compétences couvertes (les 4 de la notion) :
// - prop_rapport               → définition + figure (ratio 2:3), propriété
//                                « Le ratio », exemples 1 et 2, entraînements 1-2
// - prop_pourcentage           → propriété « Le pourcentage », exemples 3 et 4
//                                (20 % de 50, 30 % des 200 élèves), entraînement 3
// - prop_coeff_multiplicateur  → propriété « Le coefficient multiplicateur »,
//                                exemple 5 (hausse de 20 % → ×1,2), entraînement 4
// - prop_ratio_defi            → pièges + défi (la réduction de 10 % sur 40 €)
//
// Les nombres sont CEUX DE LA BANQUE : sirop 2:3, 4 filles pour 6 garçons,
// 20 % de 50, 25 % de 80, 30 % des 200 élèves, 10 % de 40 €, ×1,2 et ×0,85.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Un RATIO se voit comme deux longueurs bout à bout : 2 doses contre 3, ce
// n'est pas une position sur un axe, c'est un partage. Les parts sont à
// l'échelle depuis le 20/08 — donc 2:3 ne ressemble pas à 1:1.
const melange = (
  titre: string,
  total: string,
  a: { label: string; value: string },
  b: { label: string; value: string },
  question: string
) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: titre,
      total,
      parts: [a, b],
      questionLabel: question,
      size: { width: 320, height: 175 },
    }}
  />
);

// Le coefficient multiplicateur ne se DESSINE pas : il se lit sur plusieurs
// colonnes, quand on voit la même multiplication passer de ligne en ligne.
const tableau = (values: (number | string)[][], rowLabels: string[]) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      rows: values.length,
      cols: values[0].length,
      rowLabels,
      values: values.map((row) => row.map((v) => String(v))),
      missing: [],
      highlightedCells: [],
      display: { showRowLabels: true, showColLabels: false, showGrid: true },
    }}
  />
);

// La grille de cent : « pour cent », littéralement. Elle dit ce qu'EST un
// pourcentage, quand la barre dit ce qu'il DONNE sur une quantité réelle.
const grille = (p: number) => (
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "grid",
      grid: { rows: 10, cols: 10, shaded: p },
      fraction: { numerator: p, denominator: 100, label: p + " %" },
      display: { showLabel: true, showFraction: true },
    }}
  />
);

const pieges = [
  "Lire un ratio 2:3 comme « 2 sur 3 » : c'est 2 doses POUR 3 autres, donc 2 sur 5 au total.",
  "Confondre le taux et le coefficient : une hausse de 20 % donne ×1,2, pas ×0,2 ni ×20.",
  "Oublier de quoi on prend le pourcentage : 30 %, c'est toujours « de quelque chose ».",
];

const aRetenir = [
  "Un ratio a:b partage un tout en a + b parts.",
  "p % d'un nombre N vaut N × p / 100.",
  "Hausse de p % → ×(1 + p/100) ; baisse de p % → ×(1 − p/100).",
];

export const ficheRatioPourcentage5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "prop-ratio-pourcentage",
  titre: "Ratios, pourcentages et coefficient",
  accroche:
    "Un ratio, un pourcentage, un coefficient multiplicateur : trois écritures d'un même rapport. Savoir passer de l'une à l'autre, c'est tenir toute la proportionnalité par un bout.",
  identite: [
    { label: "Mots clés", valeur: "Ratio, part, pourcentage, coefficient" },
    { label: "Le secret", valeur: "Une hausse part de 1 : +20 % donne ×1,2" },
    { label: "Outil", valeur: "Le partage en parts, et la division par 100" },
  ],
  definition: {
    texte:
      "Un ratio a:b compare deux quantités : il indique combien on prend de la première pour b de la seconde. Le tout se partage alors en a + b parts égales. Un pourcentage est le cas particulier où la comparaison se fait sur 100 : p % signifie p pour cent, c'est-à-dire la fraction p/100.",
  },
  figure: {
    schema: melange(
      "Un sirop au ratio 2:3",
      "5 doses en tout",
      { label: "sirop", value: "2" },
      { label: "eau", value: "3" },
      "2 doses de sirop POUR 3 d'eau : le verre compte 5 parts."
    ),
    legende:
      "Le ratio 2:3 ne veut pas dire « 2 sur 3 » : il y a 5 parts en tout, dont 2 de sirop.",
  },
  // Un dessin sous chaque propriété (REGLES.md § 2 bis), et trois canvas
  // distincts : la BARRE pour un partage en parts, la GRILLE pour dire ce
  // qu'est « sur cent », le TABLEAU pour le coefficient — qui ne se voit que
  // d'une colonne à l'autre.
  proprietes: [
    {
      titre: "Le ratio",
      texte: "a:b partage le tout en a + b parts. Le ratio 4:6 se simplifie en 2:3.",
      schema: melange(
        "Une équipe de 4 filles et 6 garçons",
        "10 personnes",
        { label: "filles", value: "4" },
        { label: "garçons", value: "6" },
        "Ratio 4:6, soit 2:3 une fois simplifié."
      ),
    },
    {
      titre: "Le pourcentage",
      texte: "p % veut dire « p sur 100 » : c'est la fraction p/100.",
      schema: grille(25),
    },
    {
      titre: "Prendre p % d'un nombre",
      texte: "On multiplie par p/100 : 20 % de 50, c'est 50 × 0,2 = 10.",
      schema: melange(
        "20 % de 50",
        "50",
        { label: "on prend", value: "10" },
        { label: "le reste", value: "40" },
        "50 × 20 / 100 = 10"
      ),
    },
    {
      titre: "Le coefficient multiplicateur",
      texte: "Une hausse de 20 % donne ×1,2 ; une baisse de 15 % donne ×0,85. On part toujours de 1.",
      schema: tableau(
        [
          ["+20 %", "−15 %"],
          ["×1,2", "×0,85"],
        ],
        ["Évolution", "Coefficient"]
      ),
    },
  ],
  reel: {
    texte:
      "Le ratio sert dès qu'on mélange : un sirop, du béton, de l'engrais, la composition d'une équipe. Le pourcentage, lui, sert dès qu'on compare : les soldes d'un magasin, la part d'élèves demi-pensionnaires, l'humidité annoncée à la météo de La Réunion.",
  },
  historique: {
    texte:
      "Le signe % vient d'une abréviation italienne du XVᵉ siècle, « per cento ». Les marchands de Venise et de Florence l'écrivaient déjà pour calculer intérêts et taxes — bien avant qu'il n'entre dans les manuels scolaires.",
  },
  formule: {
    contexte: "Une évolution en pourcentage",
    expression: "coefficient = 1 + p/100",
    legende:
      "Hausse de 20 % → 1 + 0,2 = ×1,2. Baisse de 15 % → 1 − 0,15 = ×0,85. Le 1 représente le prix de départ, qu'on garde.",
    schema: tableau(
      [
        ["100 €", "120 €"],
        ["départ", "après +20 %"],
      ],
      ["Prix", "Étape"]
    ),
  },
  methode: [
    {
      titre: "Je compte les parts",
      texte: "Pour un ratio a:b, le tout compte a + b parts : je calcule d'abord la valeur d'une part.",
      schema: melange(
        "Un ratio 2:3 sur 15 doses",
        "15 doses",
        { label: "sirop", value: "6" },
        { label: "eau", value: "9" },
        "15 ÷ 5 = 3 par part, puis 2 × 3 = 6 et 3 × 3 = 9."
      ),
    },
    {
      titre: "Je divise par 100",
      texte: "Pour un pourcentage, p % devient p/100, donc un nombre décimal : 25 % = 0,25.",
      schema: grille(25),
    },
    {
      titre: "Je pars de 1",
      texte: "Pour une évolution, j'ajoute ou je retire le taux à 1, puis je multiplie une seule fois.",
      schema: tableau(
        [
          ["+20 %", "−15 %"],
          ["×1,2", "×0,85"],
        ],
        ["Évolution", "Coefficient"]
      ),
    },
  ],
  usages: [
    {
      titre: "Mélanger",
      detail: "Le ratio dit la recette : 2 doses de sirop pour 3 d'eau.",
      schema: melange(
        "Un sirop au ratio 2:3",
        "5 doses",
        { label: "sirop", value: "2" },
        { label: "eau", value: "3" },
        "Le verre compte 5 parts."
      ),
    },
    {
      titre: "Comparer",
      detail: "Le pourcentage ramène tout sur 100, donc tout devient comparable.",
      schema: grille(30),
    },
    {
      titre: "Faire évoluer",
      detail: "Le coefficient applique une hausse ou une baisse en une seule multiplication.",
      schema: tableau(
        [
          [40, 36],
          ["avant", "après −10 %"],
        ],
        ["Prix (€)", "Étape"]
      ),
    },
  ],
  exemples: [
    {
      titre: "Lire un ratio",
      donnees: "Dans un mélange, 2 doses de sirop pour 3 doses d'eau.",
      question: "Quel est le ratio sirop:eau, et combien de parts en tout ?",
      schema: melange(
        "Un sirop au ratio 2:3",
        "5 doses",
        { label: "sirop", value: "2" },
        { label: "eau", value: "3" },
        "2 + 3 = 5 parts"
      ),
      solution:
        "Le ratio est 2:3. Attention : cela ne fait pas « 2 sur 3 » — le verre compte 2 + 3 = 5 parts, dont 2 de sirop.",
    },
    {
      titre: "Simplifier un ratio",
      donnees: "Une équipe compte 4 filles et 6 garçons.",
      question: "Quel est le ratio filles:garçons ?",
      schema: melange(
        "4 filles et 6 garçons",
        "10 personnes",
        { label: "filles", value: "4" },
        { label: "garçons", value: "6" },
        "4:6 se simplifie en 2:3"
      ),
      solution: "Le ratio est 4:6, qui se simplifie en 2:3 (on divise les deux nombres par 2).",
    },
    {
      titre: "Prendre un pourcentage",
      donnees: "On cherche 20 % de 50.",
      question: "Combien cela fait-il ?",
      schema: melange(
        "20 % de 50",
        "50",
        { label: "on prend", value: "10" },
        { label: "le reste", value: "40" },
        "50 × 0,2 = 10"
      ),
      solution: "20 % = 20/100 = 0,2. Donc 50 × 0,2 = 10.",
    },
    {
      titre: "Un pourcentage d'un effectif",
      donnees: "Dans un collège, 30 % des 200 élèves viennent à vélo.",
      question: "Combien d'élèves cela représente-t-il ?",
      schema: melange(
        "30 % de 200 élèves",
        "200 élèves",
        { label: "à vélo", value: "60" },
        { label: "les autres", value: "140" },
        "200 × 0,3 = 60"
      ),
      solution: "200 × 30/100 = 200 × 0,3 = 60 élèves.",
    },
    {
      titre: "Une hausse",
      donnees: "Un prix augmente de 20 %.",
      question: "Par quel coefficient faut-il multiplier ?",
      schema: tableau(
        [
          ["100 €", "120 €"],
          ["départ", "après +20 %"],
        ],
        ["Prix", "Étape"]
      ),
      solution:
        "On part de 1 et on ajoute le taux : 1 + 0,2 = 1,2. Un prix de 100 € devient 100 × 1,2 = 120 €.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Dans une recette, le ratio farine:sucre est 3:1 et on utilise 400 g en tout. Quelle masse de sucre ?",
      correction: "3 + 1 = 4 parts. 400 ÷ 4 = 100 g par part. Le sucre en fait 1 : 100 g (et la farine 300 g).",
    },
    {
      question: "Combien vaut 25 % de 80 ?",
      correction: "25 % = 0,25, donc 80 × 0,25 = 20. (C'est aussi le quart de 80.)",
    },
    {
      question: "Un tee-shirt coûte 40 € avec 10 % de réduction. Quel est le montant de la réduction ?",
      correction: "40 × 10/100 = 4 €. Le tee-shirt coûte donc 40 − 4 = 36 €.",
    },
    {
      question: "À quel coefficient multiplicateur correspond une baisse de 15 % ?",
      correction: "On part de 1 et on retire le taux : 1 − 0,15 = 0,85. Donc ×0,85.",
    },
    {
      question: "Le ratio 6:9 est-il le même que 2:3 ?",
      correction: "Oui : 6:9 se simplifie en 2:3 (on divise les deux nombres par 3). Les deux mélanges ont le même goût.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

// ⚠️ Le mode classe est ENGENDRÉ depuis la fiche (lib/fiches/slidesDepuisFiche).
// Ce tableau n'est plus lu : il ne sert qu'à dire « cette fiche se projette ».
export const slidesRatioPourcentage5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Ratios & pourcentages - 5e",
    section: {
      type: "objectif",
      phrase: "Ratio, pourcentage, coefficient : trois écritures d'un même rapport",
      sousPhrase: "Un ratio partage, un pourcentage compare, un coefficient fait évoluer.",
    },
  },
];
