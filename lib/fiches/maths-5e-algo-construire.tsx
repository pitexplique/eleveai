// ─── Fiche de cours : construire un programme (5e) ─────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/algorithmique.bank.ts,
// notionId **algo_construire** (la banque en porte deux : algo_programmation a
// sa propre fiche, maths-5e-algorithmique).
//
// ⚠️ LA COUPURE EN DEUX NOTIONS, ET POURQUOI ELLE COMPTE. `algo_programmation`
// apprend à LIRE un programme — je le suis, je prévois ce qu'il fait.
// `algo_construire` apprend à l'ÉCRIRE — je pars d'une intention et je pose les
// blocs. Ce sont deux gestes différents, et la fiche de lecture ne pouvait pas
// tenir lieu de fiche d'écriture. C'est la même erreur qu'on avait trouvée sur
// les fractions le 20/08 : deux notions au coach, une seule fiche.
//
// Micro-compétences couvertes (les 5 de la notion) :
// - algo_formule_bloc     → définition + figure (x + 5 en blocs), propriété
//                           « Une formule devient des blocs », exemple 1,
//                           entraînement 1
// - algo_test_condition   → propriété « La condition choisit », exemple 2,
//                           entraînement 2
// - algo_parametre        → propriété « Le paramètre se change », exemple 3,
//                           entraînement 3
// - algo_boucle           → propriété « La boucle raccourcit », exemple 4,
//                           entraînement 4
// - algo_construire_defi  → pièges + défi (le carré, puis le triangle)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

type Bloc =
  | { type: "event" }
  | { type: "move"; value: number }
  | { type: "turn"; value: number }
  | { type: "say"; text: string }
  | { type: "set_variable"; variable: string; value: number }
  | { type: "if"; condition: string; children: Bloc[] }
  | { type: "repeat"; times: number; children: Bloc[] };

const scratch = (title: string, blocks: Bloc[]) => (
  <CanvasRenderer figure={{ kind: "scratch", title, blocks } as never} />
);

// ⭐ LA FORMULE DEVENUE PROGRAMME : x + 5, ce sont deux blocs — on range x, on
// ajoute 5. C'est le passage du langage des maths à celui de la machine, et
// c'est tout l'objet de la première micro.
const progFormule = scratch("La formule x + 5", [
  { type: "event" },
  { type: "set_variable", variable: "x", value: 3 },
  { type: "set_variable", variable: "x", value: 5 },
  { type: "say", text: "x + 5 vaut 8" },
]);

const progCondition = scratch("Si le score dépasse 10", [
  { type: "event" },
  { type: "set_variable", variable: "score", value: 12 },
  {
    type: "if",
    condition: "score > 10",
    children: [{ type: "say", text: "Gagné !" }],
  },
]);

// Le MÊME programme, deux réglages : c'est le paramètre qui change la figure,
// pas la structure.
const progCarre = scratch("Un carré : 4 côtés, 90°", [
  { type: "event" },
  {
    type: "repeat",
    times: 4,
    children: [
      { type: "move", value: 100 },
      { type: "turn", value: 90 },
    ],
  },
]);

const progTriangle = scratch("Un triangle : 3 côtés, 120°", [
  { type: "event" },
  {
    type: "repeat",
    times: 3,
    children: [
      { type: "move", value: 100 },
      { type: "turn", value: 120 },
    ],
  },
]);

// Sans boucle : les mêmes blocs recopiés. C'est le contre-exemple qui donne
// tout son sens à « répéter ».
const progSansBoucle = scratch("Le même carré, sans boucle", [
  { type: "event" },
  { type: "move", value: 100 },
  { type: "turn", value: 90 },
  { type: "move", value: 100 },
  { type: "turn", value: 90 },
  { type: "move", value: 100 },
  { type: "turn", value: 90 },
  { type: "move", value: 100 },
  { type: "turn", value: 90 },
]);

// Deux programmes empilés (REGLES.md § 2 ter : dans une carte, on empile) :
// une propriété qui compare deux écritures a besoin des deux.
const duo = (haut: React.ReactNode, hautLabel: string, bas: React.ReactNode, basLabel: string) => (
  <div className="space-y-2">
    <div>
      {haut}
      <p className="mt-1 text-center text-xs font-black text-rose-700">{hautLabel}</p>
    </div>
    <div>
      {bas}
      <p className="mt-1 text-center text-xs font-black text-emerald-700">{basLabel}</p>
    </div>
  </div>
);

const pieges = [
  "Croire que les blocs d'une boucle ne s'exécutent qu'une fois : « répéter 4 fois » les refait quatre fois, du premier au dernier.",
  "Oublier de changer TOUS les paramètres : passer du carré au triangle demande de changer le nombre de côtés ET l'angle.",
  "Mettre un bloc en dehors de la condition : il s'exécutera même quand la condition est fausse.",
];

const aRetenir = [
  "Une formule se traduit en blocs : chaque opération devient une instruction.",
  "Une condition « si… alors » choisit ce qui s'exécute ; une boucle « répéter n fois » raccourcit ce qui se répète.",
  "Un paramètre est le nombre écrit dans un bloc : le changer change le résultat, pas la structure.",
];

export const ficheAlgoConstruire5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "algo-construire",
  titre: "Construire un programme",
  accroche:
    "Lire un programme et en écrire un, ce sont deux gestes différents. Ici on part d'une intention — tracer un carré, réagir à un score — et on pose les blocs qui la réalisent.",
  identite: [
    { label: "Mots clés", valeur: "Bloc, formule, condition, paramètre, boucle" },
    { label: "Le secret", valeur: "Ce qui se répète se met dans une boucle" },
    { label: "Outil", valeur: "Scratch, et ses blocs qui s'emboîtent" },
  ],
  definition: {
    texte:
      "Construire un programme, c'est traduire une intention en une suite de blocs que la machine exécutera dans l'ordre. Une formule mathématique devient une suite d'instructions ; une décision devient une condition « si… alors » ; une répétition devient une boucle « répéter n fois ». Les nombres écrits dans les blocs s'appellent des paramètres : ce sont eux qu'on modifie pour changer le résultat.",
  },
  figure: {
    schema: progFormule,
    legende:
      "La formule x + 5 devenue programme : on range une valeur dans x, on ajoute 5, on affiche le résultat.",
  },
  // Un dessin sous chaque propriété (REGLES.md § 2 bis). Ici tous les dessins
  // sont des programmes — c'est la matière même de la notion — mais aucun ne
  // montre la même chose : une traduction, un choix, un réglage, et un
  // raccourcissement montré PAR COMPARAISON.
  proprietes: [
    {
      titre: "Une formule devient des blocs",
      texte: "Chaque opération de la formule devient une instruction, dans l'ordre où on la calcule.",
      schema: progFormule,
    },
    {
      titre: "La condition choisit",
      texte: "« Si… alors » n'exécute les blocs qu'il contient que lorsque la condition est vraie.",
      schema: progCondition,
    },
    {
      titre: "Le paramètre se change",
      texte: "Le nombre écrit dans un bloc règle le programme : 4 côtés et 90° donnent un carré, 3 et 120° un triangle.",
      schema: duo(progCarre, "4 côtés, 90° → carré", progTriangle, "3 côtés, 120° → triangle"),
    },
    {
      titre: "La boucle raccourcit",
      texte: "« Répéter n fois » remplace n copies des mêmes blocs — et se relit d'un coup d'œil.",
      schema: duo(progSansBoucle, "8 blocs recopiés", progCarre, "3 blocs avec la boucle"),
    },
  ],
  reel: {
    texte:
      "Écrire un programme, c'est ce que fait un jeu vidéo quand il décide qu'un score dépasse le record, un feu tricolore qui répète toujours la même séquence, ou un robot qui trace une figure. Partout, la même idée : ce qui se répète se met dans une boucle, ce qui dépend d'une situation se met dans une condition.",
  },
  historique: {
    texte:
      "Scratch est né en 2007 au MIT, à Boston, pour que des enfants puissent programmer sans taper une ligne de code : les instructions y sont des briques qui ne s'emboîtent que si l'assemblage a un sens. Aujourd'hui, plus de cent millions de projets y ont été écrits.",
  },
  methode: [
    {
      titre: "Je décris ce que je veux",
      texte: "En français d'abord : « avancer, tourner, quatre fois ». C'est déjà le programme.",
      schema: progSansBoucle,
    },
    {
      titre: "Je repère ce qui se répète",
      texte: "Les blocs identiques qui reviennent entrent dans une boucle « répéter n fois ».",
      schema: progCarre,
    },
    {
      titre: "Je règle les paramètres",
      texte: "Je remplace les nombres jusqu'à obtenir la figure ou le résultat voulu.",
      schema: progTriangle,
    },
  ],
  usages: [
    {
      titre: "Traduire une formule",
      detail: "x + 5 devient : ranger x, puis ajouter 5.",
      schema: progFormule,
    },
    {
      titre: "Réagir à une situation",
      detail: "« Si le score dépasse 10, alors dire Gagné ».",
      schema: progCondition,
    },
    {
      titre: "Tracer une figure",
      detail: "Une boucle, un nombre de côtés, un angle : le polygone se dessine.",
      schema: progCarre,
    },
  ],
  exemples: [
    {
      titre: "Traduire x + 5",
      donnees: "La formule x + 5, avec x = 3.",
      question: "Comment l'écrire en blocs ?",
      schema: progFormule,
      solution:
        "On range 3 dans la variable x, on ajoute 5, puis on affiche : le programme répond 8. Chaque opération de la formule est devenue une instruction.",
    },
    {
      titre: "Une condition",
      donnees: "On veut afficher « Gagné ! » seulement si le score dépasse 10.",
      question: "Où placer le bloc « dire Gagné » ?",
      schema: progCondition,
      solution:
        "À l'INTÉRIEUR du bloc « si score > 10 alors ». Placé en dehors, il s'afficherait même avec un score de 2.",
    },
    {
      titre: "Du carré au triangle",
      donnees: "Un programme trace un carré : répéter 4 fois (avancer de 100, tourner de 90°).",
      question: "Que faut-il changer pour tracer un triangle équilatéral ?",
      schema: duo(progCarre, "le carré", progTriangle, "le triangle"),
      solution:
        "Deux paramètres, pas un : le nombre de répétitions passe de 4 à 3, et l'angle de 90° à 120° (360 ÷ 3). La structure du programme, elle, ne bouge pas.",
    },
    {
      titre: "Pourquoi une boucle ?",
      donnees: "Le même carré, écrit sans boucle.",
      question: "Combien de blocs faut-il, et que gagne-t-on avec « répéter » ?",
      schema: duo(progSansBoucle, "sans boucle : 8 blocs", progCarre, "avec boucle : 3 blocs"),
      solution:
        "Sans boucle, il faut recopier 8 blocs (4 fois « avancer » et 4 fois « tourner »). Avec la boucle, il en reste 3 — et si l'on veut un décagone, on change juste le 4 en 10.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Comment traduire la formule 2 × x en blocs Scratch ?",
      correction:
        "On range une valeur dans x, puis on la multiplie par 2 : « mettre x à … » puis « mettre resultat à x × 2 ».",
    },
    {
      question: "Dans « répéter 4 fois », les blocs placés à l'intérieur sont exécutés une seule fois. Vrai ou faux ?",
      correction: "Faux : ils sont exécutés quatre fois, du premier au dernier, avant de sortir de la boucle.",
    },
    {
      question: "Un programme trace un carré de côté 100. Que changer pour un carré de côté 40 ?",
      correction:
        "Un seul paramètre : le nombre dans « avancer de 100 » devient 40. L'angle reste 90° et la répétition reste 4.",
    },
    {
      question: "À quoi sert une condition dans un programme ?",
      correction:
        "À n'exécuter certains blocs que dans une situation précise : ils sont ignorés quand la condition est fausse.",
    },
    {
      question: "Écris le programme d'un triangle équilatéral de côté 50.",
      correction: "Répéter 3 fois : avancer de 50, tourner de 120° (car 360 ÷ 3 = 120).",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

// ⚠️ Le mode classe est ENGENDRÉ depuis la fiche (lib/fiches/slidesDepuisFiche).
// Ce tableau n'est plus lu : il ne sert qu'à dire « cette fiche se projette ».
export const slidesAlgoConstruire5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Construire un programme - 5e",
    section: {
      type: "objectif",
      phrase: "Partir d'une intention, poser les blocs",
      sousPhrase: "Ce qui se répète entre dans une boucle ; ce qui dépend d'une situation, dans une condition.",
    },
  },
];
