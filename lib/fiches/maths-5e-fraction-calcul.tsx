// ─── Fiche de cours : calculer avec les fractions (5e) ─────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/fractions.bank.ts, notionId **fraction_calcul**
// (la banque en porte deux : fraction_nombre a sa propre fiche, maths-5e-fractions).
//
// ⚠️ POURQUOI CETTE FICHE EXISTE (20/08/2026). Frédéric, en relisant la fiche des
// fractions : « la méthode de mettre au même dénominateur est-elle au BO ? le
// calcul n'apparaît pas sur la fiche ». Il avait raison de tiquer : les quatre
// micros de CALCUL sont rangés sous une notion à part depuis que les fractions
// ont été coupées en deux (onze micros d'un bloc, personne ne s'y retrouvait),
// et cette notion-là n'avait aucune fiche. Le coach la propose, la fiche
// manquait.
//
// ⛔ NI INVERSE NI DIVISION : ils ont quitté la 5e le 04/08/2026 (les repères
// annuels les placent en 4e, où ils existent déjà). Ne pas les réintroduire ici.
//
// Micro-compétences couvertes (les 4 de la notion) :
// - fraction_additionner  → définition, figure (1/4 + 2/4), propriétés « Même
//                           dénominateur » et « Dénominateurs différents »,
//                           formule, exemples 1 et 2, entraînements 1 et 2
// - fraction_multiplier   → propriété « Multiplier », exemple 3, entraînement 3
// - fraction_quantite     → propriété « Une fraction d'une quantité »,
//                           exemple 4 (3/4 de 20), entraînement 4
// - fraction_calcul_defi  → pièges + défi dessiné (3/4 + 1/6 = 11/12) + le
//                           sentier de 12 km
//
// Les nombres sont CEUX DE LA BANQUE, sans exception : 1/4 + 2/4, 3/5 − 1/5,
// 2/3 × 3/4, 3/4 de 20, 3/4 + 1/6, le sentier de 12 km à La Réunion.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const barre = (n: number, d: number) => (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "bar", fraction: { numerator: n, denominator: d } }}
  />
);

// ⭐ LE CALCUL SE DESSINE EN ENTIER (demande de Frédéric, 20/08 : « mets un
// exemple chiffré avec de vraies fractions, pas 1/2 en visuel »). Montrer le
// seul résultat — un demi-disque sous « Multiplier » — ne montre rien du tout :
// ce qu'on veut voir, ce sont les DEUX opérandes, l'opération, et ce qui en sort.
//
// ⛔ ET ÇA S'EMPILE, ÇA NE S'ALIGNE PAS. Première version : les trois barres
// côte à côte. Dans une carte de propriété sur trois colonnes, chacune recevait
// un tiers de 250 px — Frédéric, capture à l'appui : « on voit rien ». Les
// numérateurs étaient illisibles. Empilées, les trois barres prennent chacune
// TOUTE la largeur de la carte, et le calcul se lit de haut en bas comme au
// tableau.
const operation = (
  a: [number, number],
  signe: string,
  b: [number, number],
  resultat: [number, number]
) => (
  <div className="space-y-0.5">
    {barre(a[0], a[1])}
    <p className="text-center text-xl font-black leading-none text-slate-700">{signe}</p>
    {barre(b[0], b[1])}
    <p className="text-center text-xl font-black leading-none text-slate-700">=</p>
    {barre(resultat[0], resultat[1])}
  </div>
);

// Une quantité partagée, pas un tout abstrait : 20 biscuits en 4 parts de 5,
// on en prend 3. C'est le schéma en barres, et ses parts sont à l'échelle.
const quantite = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "3/4 de 20",
      total: "20",
      parts: [
        { label: "on prend", value: "15" },
        { label: "on laisse", value: "5" },
      ],
      questionLabel: "20 ÷ 4 = 5, puis 5 × 3 = 15",
      size: { width: 320, height: 175 },
    }}
  />
);

const pieges = [
  "Additionner les dénominateurs : 1/2 + 1/3 ne fait pas 2/5. On met au même dénominateur d'abord.",
  "Chercher un dénominateur commun pour MULTIPLIER : inutile, on multiplie haut par haut et bas par bas.",
  "Oublier de simplifier le résultat à la fin (6/12 s'écrit 1/2).",
];

const aRetenir = [
  "Additionner ou soustraire : même dénominateur d'abord, puis on ne touche qu'aux numérateurs.",
  "Multiplier : haut × haut, bas × bas (aucun dénominateur commun à chercher).",
  "Une fraction d'une quantité : on divise par le dénominateur, on multiplie par le numérateur.",
];

export const ficheFractionCalcul5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "fraction-calcul",
  titre: "Calculer avec les fractions",
  accroche:
    "Additionner, soustraire, multiplier, prendre une fraction d'une quantité : quatre gestes, et une seule règle à ne jamais oublier — on n'additionne que des parts de même taille.",
  identite: [
    { label: "Mots clés", valeur: "Somme, différence, produit, dénominateur commun" },
    { label: "Le secret", valeur: "Additionner = même dénominateur ; multiplier = non" },
    { label: "Outil", valeur: "La simplification, à la fin de chaque calcul" },
  ],
  definition: {
    texte:
      "Additionner ou soustraire deux fractions n'a de sens que si elles partagent le même dénominateur : on compte alors des parts de même taille, et on additionne seulement les numérateurs. Multiplier, au contraire, ne demande aucun dénominateur commun : on multiplie les numérateurs entre eux et les dénominateurs entre eux.",
  },
  figure: {
    schema: operation([1, 4], "+", [2, 4], [3, 4]),
    legende: "1/4 + 2/4 = 3/4 : les parts ont la même taille, on en compte 1 puis 2, cela fait 3.",
  },
  // Un dessin sous chaque propriété (REGLES.md § 2 bis), et quatre dessins qui
  // montrent quatre gestes différents : compter des parts identiques, redécouper
  // pour qu'elles le deviennent, multiplier, et partager une quantité réelle.
  proprietes: [
    {
      titre: "Même dénominateur",
      texte: "On additionne (ou soustrait) les numérateurs, et on garde le dénominateur.",
      schema: operation([3, 5], "−", [1, 5], [2, 5]),
    },
    {
      titre: "Dénominateurs différents",
      texte: "On redécoupe d'abord en parts de même taille : 3/4 + 1/6 = 9/12 + 2/12.",
      schema: operation([9, 12], "+", [2, 12], [11, 12]),
    },
    {
      titre: "Multiplier",
      texte: "Haut × haut, bas × bas : 2/3 × 3/4 = 6/12, que l'on simplifie en 1/2.",
      schema: operation([2, 3], "×", [3, 4], [6, 12]),
    },
    {
      titre: "Une fraction d'une quantité",
      texte: "On divise par le dénominateur, puis on multiplie par le numérateur.",
      schema: quantite,
    },
  ],
  reel: {
    texte:
      "Calculer avec des fractions sert dès qu'on partage : une recette qu'on fait à moitié, trois quarts d'un paquet de biscuits, la part d'un sentier déjà parcourue, un rythme en musique. À La Réunion, 3/4 d'un sentier de 12 km, c'est 9 km de marche — et 3 km qui restent.",
  },
  historique: {
    texte:
      "Les Égyptiens, il y a 4000 ans, n'écrivaient presque que des fractions de numérateur 1 : pour eux, 3/4 s'écrivait 1/2 + 1/4. Additionner des fractions leur demandait donc de tout redécouper — exactement le geste qu'on fait encore aujourd'hui pour trouver un dénominateur commun.",
  },
  formule: {
    contexte: "Additionner deux fractions de même dénominateur",
    expression: "a/c + b/c = (a + b)/c",
    legende: "Exemple : 1/4 + 2/4 = 3/4. Le dénominateur ne bouge pas, il dit la taille des parts.",
    schema: operation([1, 4], "+", [2, 4], [3, 4]),
  },
  methode: [
    {
      titre: "Je regarde les dénominateurs",
      texte: "S'ils sont différents, je redécoupe pour qu'ils deviennent identiques.",
      schema: operation([3, 4], "+", [1, 6], [11, 12]),
    },
    {
      titre: "Je calcule les numérateurs",
      texte: "Pour une somme : j'additionne le haut et je garde le bas.",
      schema: operation([9, 12], "+", [2, 12], [11, 12]),
    },
    {
      titre: "Je simplifie à la fin",
      texte: "Un résultat se donne toujours sous sa forme la plus simple.",
      schema: operation([6, 12], "=", [1, 2], [1, 2]),
    },
  ],
  usages: [
    {
      titre: "Additionner",
      detail: "Même dénominateur d'abord, puis on additionne les numérateurs.",
      schema: operation([1, 4], "+", [2, 4], [3, 4]),
    },
    {
      titre: "Multiplier",
      detail: "Haut × haut, bas × bas, sans dénominateur commun.",
      schema: operation([5, 6], "×", [2, 5], [10, 30]),
    },
    {
      titre: "Fraction d'une quantité",
      detail: "On divise par le dénominateur, on multiplie par le numérateur.",
      schema: quantite,
    },
  ],
  exemples: [
    {
      titre: "Une somme simple",
      donnees: "Le calcul 1/4 + 2/4.",
      question: "Combien font 1/4 + 2/4 ?",
      schema: operation([1, 4], "+", [2, 4], [3, 4]),
      solution:
        "Les deux fractions ont le même dénominateur : les parts ont la même taille. J'additionne les numérateurs et je garde le dénominateur : 1 + 2 = 3, donc 3/4.",
    },
    {
      titre: "Une différence",
      donnees: "Le calcul 3/5 − 1/5.",
      question: "Combien font 3/5 − 1/5 ?",
      schema: operation([3, 5], "−", [1, 5], [2, 5]),
      solution: "Même dénominateur : 3 − 1 = 2, donc 2/5.",
    },
    {
      titre: "Un produit",
      donnees: "Le calcul 2/3 × 3/4.",
      question: "Combien font 2/3 × 3/4 ?",
      schema: operation([2, 3], "×", [3, 4], [6, 12]),
      solution:
        "Haut × haut : 2 × 3 = 6. Bas × bas : 3 × 4 = 12. Résultat 6/12, que l'on simplifie : 6/12 = 1/2.",
    },
    {
      titre: "Une fraction d'une quantité",
      donnees: "3/4 d'un paquet de 20 biscuits.",
      question: "Combien de biscuits cela fait-il ?",
      schema: quantite,
      solution:
        "Je divise par le dénominateur : 20 ÷ 4 = 5 (c'est un quart). Puis je multiplie par le numérateur : 5 × 3 = 15. Il en prend 15, il en reste 5.",
    },
    {
      titre: "Le défi : deux parts d'un gâteau",
      donnees: "Enzo mange 3/4 d'un gâteau le midi, puis 1/6 du même gâteau le soir.",
      question: "Quelle quantité a-t-il mangée en tout ?",
      schema: operation([9, 12], "+", [2, 12], [11, 12]),
      solution:
        "Les parts n'ont pas la même taille : je redécoupe en douzièmes. 3/4 = 9/12 et 1/6 = 2/12. J'additionne les numérateurs : 9 + 2 = 11, donc 11/12 du gâteau.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule 2/7 + 3/7.",
      correction: "Même dénominateur : 2 + 3 = 5, donc 5/7.",
    },
    {
      question: "Calcule 1/2 + 1/3.",
      correction:
        "Les parts n'ont pas la même taille : je redécoupe en sixièmes. 1/2 = 3/6 et 1/3 = 2/6, donc 3/6 + 2/6 = 5/6.",
    },
    {
      question: "Calcule 1/2 × 4/5.",
      correction: "Haut × haut : 1 × 4 = 4. Bas × bas : 2 × 5 = 10. Résultat 4/10, soit 2/5 simplifié.",
    },
    {
      question: "Calcule 2/5 de 30.",
      correction: "30 ÷ 5 = 6, puis 6 × 2 = 12.",
    },
    {
      question:
        "À La Réunion, Tom parcourt 3/4 d'un sentier de 12 km. Combien de kilomètres a-t-il parcourus ?",
      correction: "12 ÷ 4 = 3, puis 3 × 3 = 9. Tom a parcouru 9 km, il lui en reste 3.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesFractionCalcul5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Calcul de fractions - 5e",
    section: {
      type: "objectif",
      phrase: "Additionner, multiplier, prendre une fraction d'une quantité",
      sousPhrase:
        "Une seule règle commande tout : on n'additionne que des parts de même taille.",
      encadre: {
        titre: "L'idée",
        texte: "Additionner demande un dénominateur commun. Multiplier n'en demande aucun.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Une recette faite à moitié, trois quarts d'un paquet, la part d'un sentier parcourue : 3/4 d'un sentier de 12 km, c'est 9 km.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les Égyptiens écrivaient 3/4 sous la forme 1/2 + 1/4 : additionner leur demandait déjà de tout redécouper.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Je regarde les dénominateurs", texte: "Différents ? Je redécoupe en parts de même taille." },
        { titre: "Je calcule les numérateurs", texte: "J'additionne le haut, je garde le bas." },
        { titre: "Je simplifie à la fin", texte: "6/12 se donne sous la forme 1/2." },
      ],
    },
  },
  {
    titre: "La règle",
    badge: "Formule",
    section: {
      type: "objectif",
      phrase: "a/c + b/c = (a + b)/c",
      sousPhrase: "Le dénominateur ne bouge pas : il dit la taille des parts.",
      encadre: { titre: "Exemple", texte: "1/4 + 2/4 = 3/4." },
    },
  },
  {
    titre: "Trois calculs",
    badge: "Usages",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Additionner", texte: "1/4 + 2/4 = 3/4." },
        { titre: "Multiplier", texte: "2/3 × 3/4 = 6/12 = 1/2." },
        { titre: "D'une quantité", texte: "3/4 de 20 : 20 ÷ 4 = 5, puis 5 × 3 = 15." },
      ],
    },
  },
  {
    titre: "Exemple : un produit",
    badge: "Exemple",
    section: {
      type: "exemple",
      enonce: "Calcule 2/3 × 3/4.",
      question: "Quel est le résultat ?",
      correction: "2 × 3 = 6 et 3 × 4 = 12, donc 6/12 = 1/2.",
    },
  },
  {
    titre: "Exemple : une quantité",
    badge: "Exemple",
    section: {
      type: "exemple",
      enonce: "Un paquet de 20 biscuits, on en prend les 3/4.",
      question: "Combien de biscuits ?",
      correction: "20 ÷ 4 = 5, puis 5 × 3 = 15 biscuits.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu:
          "1/2 + 1/3 ne fait pas 2/5 : on ne peut pas additionner des parts de tailles différentes. Et pour multiplier, aucun dénominateur commun n'est nécessaire.",
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu:
          "Additionner : même dénominateur, puis les numérateurs. Multiplier : haut × haut, bas × bas. Et on simplifie toujours à la fin.",
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Défi",
    section: {
      type: "exercice",
      enonce: "Enzo mange 3/4 d'un gâteau le midi, puis 1/6 le soir.",
      question: "Quelle quantité a-t-il mangée en tout ?",
      indice: "Redécoupe les deux fractions en douzièmes.",
      correction: "3/4 = 9/12 et 1/6 = 2/12, donc 9/12 + 2/12 = 11/12 du gâteau.",
    },
  },
];
