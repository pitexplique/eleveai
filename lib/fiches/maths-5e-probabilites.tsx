// ─── Fiche de cours : les probabilités (5e) ────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/probabilites.bank.ts (notionId proba_experience).
// Dessinée par le canvas « probabilites » du coach (dé, billes, roue).
//
// Micro-compétences couvertes :
// - proba_vocabulaire      → définition, identité (issue/événement), propriété
// - proba_issue            → figure (dé), exemple 1 (issues favorables : pair)
// - proba_equiprobabilite  → propriété + exemple « roue » (non équiprobable)
// - proba_calculer         → formule + exemples 2-3 (P(3)=1/6, P(rouge)=3/5), entraînements
// - proba_defi             → pièges (P ≤ 1) + défi 974 (panier de fruits, P(mangue)=4/9)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const ROUGE = "#ef4444";
const BLEU = "#3b82f6";

const de = (surligne?: (1 | 2 | 3 | 4 | 5 | 6)[]) => (
  <CanvasRenderer
    figure={{ kind: "probabilites", variant: "de", de: { faces: [1, 2, 3, 4, 5, 6], surligne } }}
  />
);
const billes = (elements: { label?: string; couleur: string }[]) => (
  <CanvasRenderer figure={{ kind: "probabilites", variant: "billes", billes: { elements } }} />
);
const roue = (segments: { label: string; poids: number; couleur?: string }[]) => (
  <CanvasRenderer figure={{ kind: "probabilites", variant: "roue", roue: { segments } }} />
);

const sacRouge = [
  { couleur: ROUGE, label: "R" },
  { couleur: ROUGE, label: "R" },
  { couleur: ROUGE, label: "R" },
  { couleur: BLEU, label: "B" },
  { couleur: BLEU, label: "B" },
];

// Une probabilite EST une part d'un tout : 3 issues favorables sur 6, ca se
// preleve. La barre le montre a l'echelle la ou le de montre le materiel — deux
// moments differents, deux canvas (lib/canvas/CATALOGUE.md).
const part = (titre: string, total: string, fav: string, autres: string, question: string) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: titre,
      total,
      parts: [
        { label: "favorables", value: fav },
        { label: "les autres", value: autres },
      ],
      questionLabel: question,
      size: { width: 320, height: 175 },
    }}
  />
);

// Deux situations l'une SOUS l'autre (§ 2 ter : dans une carte, on empile) :
// une propriete qui oppose deux cas a besoin des deux dessins.
const duo = (haut: React.ReactNode, hautLabel: string, bas: React.ReactNode, basLabel: string) => (
  <div className="space-y-2">
    <div>
      {haut}
      <p className="mt-1 text-center text-xs font-black text-emerald-700">{hautLabel}</p>
    </div>
    <div>
      {bas}
      <p className="mt-1 text-center text-xs font-black text-rose-700">{basLabel}</p>
    </div>
  </div>
);

const pieges = [
  "Écrire une probabilité plus grande que 1 : impossible, elle est toujours entre 0 et 1.",
  "Confondre « pair » et « 2/6 » : les issues paires sont 2, 4 et 6, donc 3/6 = 1/2.",
  "Oublier que le sac peut être déséquilibré : 3 rouges et 2 bleues → ce n'est PAS 1/2.",
];

const aRetenir = [
  "Probabilité = nombre d'issues favorables ÷ nombre d'issues possibles.",
  "Une probabilité est toujours entre 0 (impossible) et 1 (certain).",
  "Équiprobable = toutes les issues ont la même chance (dé équilibré).",
];

export const ficheProbabilites5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "proba-experience",
  titre: "Les probabilités",
  accroche:
    "Quelle chance d'obtenir un 6 ? De tirer une bille rouge ? Une probabilité met un nombre, entre 0 et 1, sur le hasard.",
  identite: [
    { label: "Mots clés", valeur: "Aléatoire, issue, événement, équiprobable" },
    { label: "Le secret", valeur: "Favorables ÷ possibles" },
    { label: "Outil", valeur: "Le dé, le sac de billes, la roue" },
  ],
  definition: {
    texte:
      "Une expérience aléatoire est une expérience dont on ne connaît pas le résultat à l'avance (lancer un dé, tirer une bille). Chaque résultat possible est une issue ; un événement regroupe une ou plusieurs issues. La probabilité d'un événement mesure sa chance de se produire : c'est un nombre entre 0 (impossible) et 1 (certain).",
  },
  figure: {
    schema: de(),
    legende: "Un dé équilibré a 6 issues possibles : 1, 2, 3, 4, 5 et 6, toutes avec la même chance.",
  },
  // Un dessin sous chaque propriete (REGLES.md § 2 bis), et quatre dessins de
  // nature differente : le MATERIEL pour distinguer issue et evenement, la BARRE
  // pour le calcul (une probabilite est une part d'un tout), DEUX roues pour
  // l'equiprobabilite — qui oppose deux cas — et la droite graduee pour
  // l'encadrement 0-1, qui est une POSITION.
  proprietes: [
    {
      titre: "Issue et événement",
      texte: "Une issue = un résultat possible ; un événement (ex. « pair ») peut regrouper plusieurs issues.",
      schema: de([2, 4, 6]),
    },
    {
      titre: "Le calcul",
      texte: "Probabilité = nombre d'issues favorables ÷ nombre d'issues possibles.",
      schema: part("« Obtenir un nombre pair »", "6 issues possibles", "3", "3", "3 ÷ 6 = 1/2"),
    },
    {
      titre: "Équiprobabilité",
      texte: "Toutes les issues ont la même chance (dé équilibré). Sinon, la situation est déséquilibrée.",
      schema: duo(
        roue([
          { label: "A", poids: 1 },
          { label: "B", poids: 1 },
          { label: "C", poids: 1 },
          { label: "D", poids: 1 },
        ]),
        "4 secteurs égaux : équiprobable",
        roue([
          { label: "A", poids: 3 },
          { label: "B", poids: 1 },
          { label: "C", poids: 1 },
        ]),
        "secteurs inégaux : A a plus de chances"
      ),
    },
    {
      titre: "Entre 0 et 1",
      texte: "0 = impossible, 1 = certain. Une probabilité ne dépasse jamais 1.",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "number_line",
            size: { width: 340, height: 90 },
            min: 0,
            max: 1,
            step: 0.25,
            points: [
              { value: 0, label: "impossible", color: ROUGE },
              { value: 0.5, label: "1/2", color: BLEU },
              { value: 1, label: "certain", color: "#16a34a" },
            ],
          }}
        />
      ),
    },
  ],
  reel: {
    texte:
      "Les probabilités décrivent le hasard du quotidien : les jeux de dés et de cartes, la loterie, la météo (« 70 % de pluie »), tirer un fruit au hasard dans un panier, et même la génétique.",
  },
  historique: {
    texte:
      "La théorie des probabilités est née au XVIIᵉ siècle d'une correspondance entre Blaise Pascal et Pierre de Fermat, à propos de jeux d'argent. Un problème de dés a lancé toute une branche des mathématiques.",
  },
  formule: {
    contexte: "La probabilité d'un événement",
    expression: "P = (issues favorables) ÷ (issues possibles)",
    legende: "Exemple : P(obtenir un 3) = 1 ÷ 6 = 1/6.",
    schema: de([3]),
  },
  // Les trois gestes sur LE MEME de : toutes les faces, puis les faces paires
  // surlignees, puis le quotient. Ce qui bouge d'une carte a l'autre EST la
  // methode.
  methode: [
    {
      titre: "Je compte les possibles",
      texte: "Toutes les issues de l'expérience (un dé : 6).",
      schema: de(),
    },
    {
      titre: "Je compte les favorables",
      texte: "Les issues qui réalisent mon événement (pair : 2, 4, 6 → 3).",
      schema: de([2, 4, 6]),
    },
    {
      titre: "Je forme le quotient",
      texte: "Favorables ÷ possibles, puis je simplifie (3/6 = 1/2).",
      schema: part("Les faces paires", "6 issues possibles", "3", "3", "3/6, soit 1/2"),
    },
  ],
  usages: [
    {
      titre: "Un dé",
      detail: "6 issues. P(un nombre donné) = 1/6.",
      schema: de([5]),
    },
    {
      titre: "Un sac de billes",
      detail: "P(rouge) = nombre de rouges ÷ nombre total.",
      schema: billes(sacRouge),
    },
    {
      titre: "Une roue",
      detail: "Si les secteurs sont inégaux, les issues ne sont pas équiprobables.",
      schema: roue([
        { label: "Rouge", poids: 3 },
        { label: "Bleu", poids: 2 },
        { label: "Vert", poids: 1 },
      ]),
    },
  ],
  exemples: [
    {
      titre: "Compter les issues favorables",
      donnees: "On lance un dé et on veut un nombre pair.",
      question: "Combien d'issues favorables ?",
      schema: de([2, 4, 6]),
      solution:
        "Les nombres pairs du dé sont 2, 4 et 6 : il y a 3 issues favorables (sur 6 possibles).",
    },
    {
      titre: "Calculer une probabilité (dé)",
      donnees: "On lance un dé équilibré.",
      question: "Quelle est la probabilité d'obtenir un 3 ?",
      schema: de([3]),
      solution:
        "1 issue favorable (le 3) sur 6 issues possibles. P(3) = 1/6.",
    },
    {
      titre: "Calculer une probabilité (billes)",
      donnees: "Un sac de 3 billes rouges et 2 bleues.",
      question: "Quelle est la probabilité de tirer une bille rouge ?",
      schema: billes(sacRouge),
      solution:
        "3 billes rouges sur 5 au total. P(rouge) = 3/5.",
    },
    {
      titre: "Équiprobable ou non ?",
      donnees: "Une roue avec 3 secteurs rouges et 1 bleu.",
      question: "Les couleurs ont-elles la même chance ?",
      schema: roue([
        { label: "Rouge", poids: 3, couleur: ROUGE },
        { label: "Bleu", poids: 1, couleur: BLEU },
      ]),
      solution:
        "Non : le rouge occupe 3 parts et le bleu 1. P(rouge) = 3/4, P(bleu) = 1/4. Ce n'est pas équiprobable.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "On lance un dé. Quelle est la probabilité d'obtenir un nombre pair ?",
      correction: "Issues favorables 2, 4, 6 (3 sur 6). P = 3/6 = 1/2.",
    },
    {
      question: "Un sac contient 3 rouges et 2 bleues. Probabilité de tirer une bleue ?",
      correction: "2 bleues sur 5. P(bleue) = 2/5.",
    },
    {
      question: "Une probabilité peut-elle valoir 1,3 ?",
      correction: "Non : une probabilité est toujours comprise entre 0 et 1.",
    },
    {
      question: "Panier 974 : 4 mangues, 3 ananas, 2 letchis. Probabilité de prendre une mangue ?",
      correction: "4 mangues sur 4 + 3 + 2 = 9 fruits. P(mangue) = 4/9.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesProbabilites5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Probabilités - 5e",
    section: {
      type: "objectif",
      phrase: "Mettre un nombre sur le hasard",
      sousPhrase:
        "Une probabilité mesure la chance qu'un événement se produise : un nombre entre 0 et 1.",
      encadre: {
        titre: "L'idée",
        texte: "Probabilité = issues favorables ÷ issues possibles.",
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
          "Jeux de dés et de cartes, loterie, météo (« 70 % de pluie »), tirer un fruit au hasard, génétique.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les probabilités sont nées au XVIIᵉ siècle d'échanges entre Pascal et Fermat sur des jeux de dés.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheProbabilites5e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "La formule",
    badge: "À connaître",
    section: {
      type: "objectif",
      phrase: "P = favorables ÷ possibles",
      sousPhrase: "Exemple : P(obtenir un 3) = 1 ÷ 6 = 1/6.",
      encadre: {
        titre: "Bornes",
        texte: "Une probabilité est toujours entre 0 (impossible) et 1 (certain).",
      },
    },
  },
  {
    titre: "Calculer avec un dé",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "On lance un dé équilibré et on veut un nombre pair.",
      question: "Quelle est la probabilité ?",
      correction: "Favorables : 2, 4, 6 (3 sur 6). P = 3/6 = 1/2.",
    },
  },
  {
    titre: "Équiprobable ou non ?",
    badge: "Attention",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Équiprobable",
        contenu: "Dé équilibré : chaque face a la même chance (1/6).",
      },
      droite: {
        variante: "piege",
        titre: "Déséquilibré",
        contenu: "Sac de 3 rouges et 2 bleues : P(rouge) = 3/5, pas 1/2.",
      },
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
      enonce: "Panier 974 : 4 mangues, 3 ananas, 2 letchis.",
      question: "Quelle est la probabilité de prendre une mangue au hasard ?",
      indice: "Compte les mangues, puis le total de fruits.",
      correction: "4 mangues sur 4 + 3 + 2 = 9 fruits. P(mangue) = 4/9.",
    },
  },
];
