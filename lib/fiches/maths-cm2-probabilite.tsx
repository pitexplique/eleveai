// ─── Fiche de cours : les probabilités (CM2) ────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/probabilites.bank.ts (notionId probabilite).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec le canvas
// probabilites du coach (dé / roue / sac de billes) — comme dans les exercices.
//
// Micro-compétences couvertes (les 4 de la banque) :
// - probabilite_hasard      → definition, propriété « le hasard »
// - probabilite_vocabulaire → propriété « certain / possible / impossible », exemple dé
// - probabilite_roue_de_sac → propriété « comparer les chances », exemples roue + billes
// - probabilite_defi        → défi 974 (la tombola : gagner est possible, pas certain)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

type DiceFace = 1 | 2 | 3 | 4 | 5 | 6;

function deF(surligne: DiceFace[]) {
  const faces: DiceFace[] = [1, 2, 3, 4, 5, 6];
  return (
    <CanvasRenderer
      figure={{
        kind: "probabilites",
        variant: "de",
        de: { faces, surligne },
      }}
    />
  );
}

function roueF(segments: { label: string; poids: number; couleur: string }[]) {
  return (
    <CanvasRenderer
      figure={{ kind: "probabilites", variant: "roue", roue: { segments } }}
    />
  );
}

function billesF(elements: { couleur: string }[]) {
  return (
    <CanvasRenderer
      figure={{ kind: "probabilites", variant: "billes", billes: { elements } }}
    />
  );
}

const pieges = [
  "Confondre « possible » et « certain » : gagner à une tombola est possible, mais pas certain (il y a aussi des tickets perdants).",
  "Dire qu'un résultat est impossible alors qu'il est juste rare : sortir un 6 est peu probable mais possible.",
  "Oublier de compter : la couleur la plus probable est celle qui a le plus de billes.",
];

const aRetenir = [
  "Le hasard : une situation dont on ne connaît pas le résultat à l'avance.",
  "Un événement est certain (sûr), possible (peut arriver) ou impossible (ne peut pas arriver).",
  "Plus il y a de cas favorables, plus l'événement est probable.",
];

export const ficheProbabiliteCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "probabilite",
  titre: "Les probabilités",
  accroche:
    "Quand on lance un dé ou qu'on tire une bille sans regarder, on ne sait pas à l'avance ce qui va sortir : c'est le hasard. Les probabilités servent à dire si un événement est certain, possible ou impossible, et à comparer les chances.",
  identite: [
    { label: "Mots clés", valeur: "Hasard, certain, possible, impossible, chances, plus probable" },
    { label: "Le secret", valeur: "Compter les cas favorables pour comparer les chances" },
    { label: "Outil", valeur: "Le dé, la roue, le sac de billes" },
  ],
  definition: {
    texte:
      "Une situation de hasard est une situation dont on ne connaît pas le résultat à l'avance (lancer un dé, tirer une bille). Un événement peut être certain (il arrive à coup sûr), possible (il peut arriver) ou impossible (il ne peut pas arriver). Plus il y a de cas favorables, plus l'événement est probable.",
  },
  figure: {
    schema: billesF([
      { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" },
      { couleur: "bleu" }, { couleur: "bleu" }, { couleur: "vert" },
    ]),
    legende: "Dans ce sac : 3 rouges, 2 bleues, 1 verte. La rouge a le plus de chances d'être tirée.",
  },
  proprietes: [
    {
      titre: "Le hasard",
      texte: "C'est quand on ne peut pas prévoir le résultat avec certitude : un dé, une roue, un tirage.",
    },
    {
      titre: "Certain, possible, impossible",
      texte: "Certain : sûr d'arriver. Possible : peut arriver. Impossible : ne peut pas arriver (ex. un 7 sur un dé).",
    },
    {
      titre: "Comparer les chances",
      texte: "On compte les cas favorables. La couleur la plus nombreuse est la plus probable.",
    },
    {
      titre: "Le dé à 6 faces",
      texte: "Chaque face (1 à 6) a la même chance. Obtenir un nombre pair, c'est 3 chances sur 6.",
    },
  ],
  reel: {
    texte:
      "À La Réunion, le hasard est partout : la tombola de la kermesse de l'école, un tirage au sort pour désigner un délégué, le dé d'un jeu de société un jour de pluie, ou piocher un bonbon dans un sachet sans regarder.",
  },
  historique: {
    texte:
      "Les probabilités sont nées de jeux de hasard ! Au 17e siècle, deux mathématiciens français, Blaise Pascal et Pierre de Fermat, s'écrivaient des lettres pour comprendre comment gagner à des jeux de dés. Sans le savoir, ils inventaient une nouvelle branche des mathématiques.",
  },
  methode: [
    { titre: "Est-ce du hasard ?", texte: "Est-ce que je peux prévoir le résultat, ou pas ?" },
    { titre: "Certain, possible, impossible ?", texte: "Je me demande si l'événement peut arriver, à coup sûr ou jamais." },
    { titre: "Je compte et je compare", texte: "Je compte les cas favorables : le plus nombreux est le plus probable." },
  ],
  usages: [
    { titre: "Qualifier", detail: "Dire si un événement est certain, possible ou impossible." },
    { titre: "Comparer", detail: "Trouver la couleur (ou le résultat) le plus probable." },
    { titre: "Jouer", detail: "Comprendre ses chances à un dé, une roue, une tombola." },
  ],
  exemples: [
    {
      titre: "Certain, possible ou impossible ?",
      donnees: "On lance un dé à 6 faces (de 1 à 6).",
      question: "Obtenir un 7, est-ce possible ?",
      schema: deF([]),
      solution: "Le dé n'a pas de face 7 : obtenir 7 est impossible. Obtenir un nombre de 1 à 6 est certain.",
    },
    {
      titre: "La roue",
      donnees: "Une roue a 3 parts rouges, 2 bleues et 1 verte.",
      question: "Sur quelle couleur a-t-on le plus de chances de tomber ?",
      schema: roueF([
        { label: "R", poids: 3, couleur: "rouge" },
        { label: "B", poids: 2, couleur: "bleu" },
        { label: "V", poids: 1, couleur: "vert" },
      ]),
      solution: "Le rouge occupe le plus de place (3 parts) : c'est la couleur la plus probable.",
    },
    {
      titre: "Le sac de billes",
      donnees: "Un sac contient 3 billes rouges, 2 bleues et 1 verte.",
      question: "Quelle couleur a le plus de chances d'être tirée ?",
      schema: billesF([
        { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" },
        { couleur: "bleu" }, { couleur: "bleu" }, { couleur: "vert" },
      ]),
      solution: "Il y a plus de rouges (3) que de bleues (2) ou de vertes (1) : la rouge est la plus probable.",
    },
    {
      titre: "Le défi 974",
      donnees: "À la tombola de l'école, il y a 100 tickets dont 5 gagnants.",
      question: "Avec un ticket, est-on certain de gagner ?",
      solution:
        "Non ! Il y a 5 tickets gagnants, mais aussi 95 perdants. Gagner est possible, mais ce n'est pas certain.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Le soleil se lèvera-t-il demain ? Certain, possible ou impossible ?",
      correction: "Certain : c'est sûr d'arriver.",
    },
    {
      question: "En lançant un dé, obtenir un nombre plus grand que 6 : possible ou impossible ?",
      correction: "Impossible : les faces vont seulement de 1 à 6.",
    },
    {
      question: "Un sac a 4 billes jaunes et 1 bille rouge. Quelle couleur a le plus de chances ?",
      correction: "La jaune : il y en a plus (4 contre 1).",
    },
    {
      question: "À une tombola, 10 tickets sur 200 sont gagnants. Est-on certain de gagner ?",
      correction: "Non : gagner est possible mais pas certain (190 tickets sont perdants).",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesProbabiliteCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Probabilités - CM2",
    section: {
      type: "objectif",
      phrase: "Dire si un événement est certain, possible ou impossible",
      sousPhrase:
        "Le hasard, c'est quand on ne peut pas prévoir le résultat. On compare les chances en comptant.",
      encadre: {
        titre: "L'idée",
        texte: "Plus il y a de cas favorables, plus l'événement est probable.",
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
          "La tombola de la kermesse, un tirage au sort de délégué, le dé d'un jeu de société, piocher un bonbon sans regarder.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les probabilités sont nées de jeux de dés ! Pascal et Fermat s'écrivaient pour comprendre comment gagner.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheProbabiliteCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le dé",
    section: {
      type: "exemple",
      enonce: "On lance un dé à 6 faces (de 1 à 6).",
      question: "Obtenir un 7, est-ce possible ?",
      correction: "Non : le dé n'a pas de face 7. Obtenir 7 est impossible.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Le sac de billes",
    section: {
      type: "exemple",
      enonce: "Un sac a 3 billes rouges, 2 bleues et 1 verte.",
      question: "Quelle couleur est la plus probable ?",
      correction: "La rouge : il y en a le plus (3).",
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
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "À la tombola de l'école, il y a 100 tickets dont 5 gagnants.",
      question: "Avec un ticket, est-on certain de gagner ?",
      indice: "Compte aussi les tickets perdants.",
      correction: "Non : gagner est possible, mais pas certain (95 tickets sont perdants).",
    },
  },
];
