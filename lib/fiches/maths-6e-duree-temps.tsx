// ─── Fiche de cours : horaires et durées (6e) ──────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/durees.bank.ts, notionId duree_temps).
//
// Micro-compétences 5/5 — correspondance micro → blocs :
//   duree_calculer  → définition + figure, propriétés 1 et 2, méthodes 1 et 2,
//                     exemple 1, entraînement 1
//   duree_convertir → propriété 3, méthode 3, entraînement 2
//   duree_decimale  → propriété 4, exemple 2, entraînement 3
//   duree_probleme  → méthode 1, usages 1 et 2, entraînement 4
//   duree_defi      → usage 3, exemple 3, entraînement 5
//
// ⭐ TOUS LES NOMBRES VIENNENT DE LA BANQUE : le cours de 8 h 15 à 9 h 10
// (55 min), le cinéma de 17 h 40 et 110 min (19 h 30), le train de 14 h 25 à
// 16 h 05 (1 h 40), le film fini à 22 h 10 après 1 h 55 (20 h 15), 8 h 50 +
// 20 min = 9 h 10 (et non 8 h 70), 17 h 22 + 50 min = 18 h 12, 150 min = 2 h 30,
// 200 min = 3 h 20, 0,25 h = 15 min, 0,1 h = 6 min, 1,30 h = 1 h 18 min, le
// tableau des bus à 17 h 26, 26 séances de 55 min (23 h 50), le film de 23 h 20
// qui passe minuit, le réveil de 6 h 30 et ses trois fois 9 minutes.
// ⛔ La Diagonale des Fous et l'emprunt sur 76 mois restent dans le coach : pas
// La Réunion par défaut, et un emprunt n'est pas le monde d'un enfant de 11 ans.
//
// ⭐ LA DIFFICULTÉ DU CHAPITRE TIENT EN UNE LIGNE (en-tête de la banque) : le
// temps ne compte pas par 100. Deux propriétés sur quatre la dessinent.
//
// ⛔ DEUX DESSINS DU CANVAS `duree` NE TIENNENT PAS DANS UNE CARTE — mesuré :
//   · `frise` a un cadre FIXE de 340 et écrit en 13 px → 8,6 px dans 226 ;
//   · `double_horloge` pose deux cadrans de 220 côte à côte → 7,4 px.
// D'où le SVG local `frise` ci-dessous, dessiné pour 250 de large (lettres de
// 14 → 12,7 px), et des horloges SEULES (220 de large, lettres à 15 px).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ─── La frise du temps (SVG local, voir l'en-tête) ─────────────────────────────
//
// Les HORAIRES sont des points, écrits SOUS l'axe ; les DURÉES sont des
// morceaux d'axe, écrits AU-DESSUS. C'est la définition du chapitre dessinée :
// un horaire est un instant, une durée est un écart.
// ⚠️ Deux étiquettes voisines qui se toucheraient passent sur une seconde
// rangée : la largeur est estimée à 0,58 × la police par caractère.

type EtapeFrise = { label: string; minutes: number; couleur?: string };
const COULEURS_FRISE = ["#2563eb", "#16a34a", "#db2777"];
const POLICE_FRISE = 14;
const largeurTexte = (t: string) => t.length * POLICE_FRISE * 0.58;

/** Range des étiquettes centrées en x sur des rangées, sans qu'elles se touchent. */
function ranger(etiquettes: { x: number; texte: string }[]) {
  const fins: number[] = [];
  return etiquettes.map((e) => {
    const g = e.x - largeurTexte(e.texte) / 2;
    let rang = 0;
    while (fins[rang] !== undefined && fins[rang] + 6 > g) rang++;
    fins[rang] = e.x + largeurTexte(e.texte) / 2;
    return { ...e, rang };
  });
}

const frise = (horaires: string[], etapes: EtapeFrise[]) => {
  const W = 250;
  const x0 = 34;
  const x1 = W - 34;
  const total = etapes.reduce((s, e) => s + e.minutes, 0);
  const xs = [x0];
  etapes.forEach((e) => xs.push(xs[xs.length - 1] + ((x1 - x0) * e.minutes) / total));
  const haut = ranger(etapes.map((e, i) => ({ x: (xs[i] + xs[i + 1]) / 2, texte: e.label })));
  const bas = ranger(horaires.map((h, i) => ({ x: xs[i], texte: h })));
  const rangsHaut = Math.max(...haut.map((e) => e.rang)) + 1;
  const rangsBas = Math.max(...bas.map((e) => e.rang)) + 1;
  const axe = 14 + rangsHaut * 18 + 4;
  const H = axe + 12 + rangsBas * 18 + 6;
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-label="Frise du temps">
        <line x1={x0} y1={axe} x2={x1} y2={axe} stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
        {etapes.map((e, i) => (
          <line
            key={`s${i}`}
            x1={xs[i]}
            y1={axe}
            x2={xs[i + 1]}
            y2={axe}
            stroke={e.couleur ?? COULEURS_FRISE[i % COULEURS_FRISE.length]}
            strokeWidth="9"
          />
        ))}
        {xs.map((x, i) => (
          <circle key={`p${i}`} cx={x} cy={axe} r="5.5" fill="#0f172a" stroke="white" strokeWidth="2" />
        ))}
        {haut.map((e, i) => (
          <text
            key={`d${i}`}
            x={e.x}
            y={axe - 12 - e.rang * 18}
            textAnchor="middle"
            fontSize={POLICE_FRISE}
            fontWeight="900"
            fill={etapes[i].couleur ?? COULEURS_FRISE[i % COULEURS_FRISE.length]}
          >
            {e.texte}
          </text>
        ))}
        {bas.map((e, i) => (
          <text
            key={`h${i}`}
            x={e.x}
            y={axe + 24 + e.rang * 18}
            textAnchor="middle"
            fontSize={POLICE_FRISE}
            fontWeight="900"
            fill="#0f172a"
          >
            {e.texte}
          </text>
        ))}
      </svg>
    </div>
  );
};

// ─── Les dessins ──────────────────────────────────────────────────────────────

/** Une horloge SEULE : 220 de large, ses chiffres restent à 15 px. */
const horloge = (h: number, min: number, label: string) => (
  <CanvasRenderer
    figure={{
      kind: "duree",
      variant: "horloge",
      time: { hour: h, minute: min, label },
      display: { showNumbers: true, showMinuteTicks: true, showLabels: true },
    }}
  />
);

const barre = (
  total: string,
  parts: { label: string; value: string; color?: string }[],
  question: string,
  opts: { etiquettes?: boolean } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      total,
      parts,
      questionLabel: question,
      display: { showTotal: true, showValues: true, showPartLabels: opts.etiquettes ?? true, showQuestion: true },
      size: { width: 240, height: 190 },
    }}
  />
);

// DÉFINITION — deux horaires (points), une durée (le morceau entre les deux).
const friseCours = frise(["8 h 15", "9 h 10"], [{ label: "55 min", minutes: 55 }]);

// P1 — 8 h 50 + 20 min : l'aiguille passe 9 h. Le dessin montre 9 h 10.
const horloge910 = legende(horloge(9, 10, "9 h 10"), "8 h 50 + 20 min = 9 h 10");

// P2 — le cinéma : on coupe à l'heure ronde.
const friseCinema = frise(
  ["17 h 40", "18 h", "19 h 30"],
  [
    { label: "20 min", minutes: 20 },
    { label: "1 h 30", minutes: 90 },
  ]
);

// P3 — 150 minutes, rangées par paquets de 60.
const barre150 = barre(
  "150 min",
  [
    { label: "1 h", value: "60" },
    { label: "1 h", value: "60" },
    { label: "30 min", value: "30" },
  ],
  "150 min = 2 h 30 min"
);

// P4 — une heure coupée en quatre quarts de 15 minutes.
const barreQuarts = barre(
  "1 h",
  Array.from({ length: 4 }, () => ({ label: "0,25 h", value: "15" })),
  "0,25 h = 15 min"
);

// M1 — l'heure qu'on lit sur un écran : c'est un horaire.
const ecran1722 = (
  <CanvasRenderer figure={{ kind: "duree", variant: "digital", digital: { text: "17:22", label: "maintenant" } }} />
);

// M2 — le train : de 14 h 25 à 15 h, puis de 15 h à 16 h 05.
const friseTrain = frise(
  ["14 h 25", "15 h", "16 h 05"],
  [
    { label: "35 min", minutes: 35 },
    { label: "1 h 05", minutes: 65 },
  ]
);

// M3 — 200 minutes : combien de fois 60 ?
const division200 = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: ["200", "60"],
      division: { dividende: "200", diviseur: "60", quotient: "3", reste: "20" },
      display: { showResult: true, compact: true },
      questionLabel: "200 min = 3 h 20 min",
    }}
  />
);

// U1 — le tableau des bus, tel que le coach le montre.
const tableauBus = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Bus", "Départ"],
      rows: [
        { values: ["70", "17 h 30"] },
        { values: ["179", "17 h 25"] },
        { values: ["185", "17 h 54"] },
        { values: ["303", "17 h 42"] },
        { values: ["321", "17 h 50"] },
        { values: ["325", "17 h 24"] },
      ],
      highlight: { row: 0 },
      questionLabel: "Il est 17 h 26.",
    }}
  />
);

// U2 — 26 séances de 55 minutes, posées.
const multiplication26 = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["55", "26"],
      result: "1430",
      display: { showResult: true, compact: true },
      questionLabel: "1 430 min = 23 h 50 min",
    }}
  />
);

// U3 — le film qui passe minuit.
const friseMinuit = frise(
  ["23 h 20", "minuit", "1 h 10"],
  [
    { label: "40 min", minutes: 40 },
    { label: "1 h 10", minutes: 70 },
  ]
);

// E1 — le film fini à 22 h 10 avait commencé à 20 h 15.
const horloge2015 = legende(horloge(20, 15, "20 h 15"), "le début du film");

// E2 — une heure en dix morceaux de 6 minutes : 0,3 h, c'est trois morceaux.
// ⛔ Les « 6 » sont en ÉTIQUETTES, pas en valeurs — mesuré : avec dix valeurs
// numériques, le canvas passe en parts proportionnelles et impose à chacune un
// plancher de 12 % de la barre ; dix planchers font 120 %, et la dernière part
// sortait du cadre. Sans valeur, les dix parts sont égales et tiennent.
const barreDixiemes = barre(
  "1 h",
  Array.from({ length: 10 }, (_, i) => ({ label: "6", value: "", color: i < 3 ? "#fde68a" : "#dbeafe" })),
  "0,3 h = 3 × 6 = 18 min"
);

// E3 — le réveil : trois fois 9 minutes.
const friseReveil = frise(
  ["6 h 30", "6 h 39", "6 h 48", "6 h 57"],
  [
    { label: "9 min", minutes: 9, couleur: "#db2777" },
    { label: "9 min", minutes: 9, couleur: "#db2777" },
    { label: "9 min", minutes: 9, couleur: "#db2777" },
  ]
);

// DIAPO « À quoi ça sert » — un match de foot, deux mi-temps.
const barreMatch = barre(
  "90 min",
  [
    { label: "1re mi-temps", value: "45" },
    { label: "2e mi-temps", value: "45" },
  ],
  "90 min = 1 h 30 min"
);

// ─── Les textes ───────────────────────────────────────────────────────────────

const pieges = [
  "8 h 50 + 20 min ne fait pas 8 h 70. 60 minutes font 1 heure : c'est 9 h 10.",
  "1,30 h n'est pas 1 h 30. Après la virgule, on compte des dixièmes d'heure : 1,30 h = 1 h 18 min.",
  "Confondre un horaire et une durée. 9 h 10 est un horaire, 55 min est une durée.",
];

const aRetenir = [
  "1 h = 60 min et 1 min = 60 s. Le temps ne compte pas par 100.",
  "Pour calculer une durée, je passe par l'heure ronde.",
  "0,5 h = 30 min ; 0,25 h = 15 min ; 0,1 h = 6 min.",
];

export const ficheDureeTemps6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "duree-temps",
  titre: "Horaires et durées",
  accroche:
    "Un horaire dit QUAND. Une durée dit COMBIEN DE TEMPS. Et le temps se compte par 60, pas par 100.",
  identite: [
    { label: "Le mot clé", valeur: "Horaire = un instant. Durée = un écart." },
    { label: "La règle", valeur: "1 h = 60 min ; 1 min = 60 s" },
    { label: "L'outil", valeur: "Passer par l'heure ronde" },
  ],
  definition: {
    texte:
      "Un horaire est un instant : 8 h 15. Une durée est le temps entre deux horaires : 55 min. Une heure contient 60 minutes, et une minute 60 secondes.",
  },
  figure: {
    schema: friseCours,
    legende: "Les horaires sont des points. La durée est le morceau entre les deux.",
  },
  proprietes: [
    {
      titre: "60 minutes font 1 heure",
      micros: ["duree_calculer"],
      texte: "8 h 50 + 20 min fait 70 min après 8 h. 60 min font 1 h : il est 9 h 10.",
      schema: horloge910,
    },
    {
      titre: "Je passe par l'heure ronde",
      micros: ["duree_calculer"],
      texte: "Le film commence à 17 h 40 et dure 110 min. 20 min jusqu'à 18 h, puis 1 h 30 : fin à 19 h 30.",
      schema: friseCinema,
    },
    {
      titre: "Convertir : par paquets de 60",
      micros: ["duree_convertir"],
      texte: "Dans 150 min, il y a 2 paquets de 60, et il reste 30. Donc 150 min = 2 h 30 min.",
      schema: barre150,
    },
    {
      titre: "Les heures à virgule",
      micros: ["duree_decimale"],
      texte: "0,5 h est une demi-heure : 30 min. 0,25 h est un quart d'heure : 15 min.",
      schema: barreQuarts,
    },
  ],
  reel: {
    texte:
      "Le temps est partout dans ta journée : le bus, la sonnerie, la fin du film. Un match de foot dure 90 minutes, soit 1 h 30. Une montre de sport affiche parfois 1,5 h. C'est la même durée.",
  },
  historique: {
    texte:
      "Pourquoi 60 et pas 100 ? L'idée vient de Babylone, il y a plus de 4 000 ans. 60 se partage en 2, 3, 4, 5, 6 : c'est pratique. À la Révolution, la France a essayé des journées de 10 heures de 100 minutes, puis a vite abandonné.",
  },
  methode: [
    {
      titre: "Horaire ou durée ?",
      micros: ["duree_probleme", "duree_calculer"],
      texte: "17 h 22 est un horaire. « Dans 50 min » est une durée. J'ajoute : il sera 18 h 12.",
      schema: ecran1722,
    },
    {
      titre: "Je coupe à l'heure ronde",
      micros: ["duree_calculer"],
      texte: "Le train part à 14 h 25 et arrive à 16 h 05. 35 min jusqu'à 15 h, puis 1 h 05. Total : 1 h 40.",
      schema: friseTrain,
    },
    {
      titre: "Je convertis avec 60",
      micros: ["duree_convertir"],
      texte: "Je divise les minutes par 60. Le quotient donne les heures, le reste donne les minutes.",
      schema: division200,
    },
  ],
  usages: [
    {
      titre: "Lire un tableau d'horaires",
      micros: ["duree_probleme"],
      detail: "Il est 17 h 26. Je cherche le premier départ APRÈS 17 h 26 : le bus 70, à 17 h 30.",
      schema: tableauBus,
    },
    {
      titre: "Additionner des séances",
      micros: ["duree_probleme"],
      detail: "26 cours de 55 min font 1 430 min. 1 430 ÷ 60 = 23, reste 50 : 23 h 50 min.",
      schema: multiplication26,
    },
    {
      titre: "Passer minuit",
      micros: ["duree_defi"],
      detail: "Un film commence à 23 h 20 et dure 1 h 50. 40 min jusqu'à minuit, puis 1 h 10 : fin à 1 h 10.",
      schema: friseMinuit,
    },
  ],
  exemples: [
    {
      titre: "L'heure du début",
      micros: ["duree_calculer"],
      donnees: "Un film se termine à 22 h 10. Il a duré 1 h 55.",
      question: "À quelle heure a-t-il commencé ?",
      schema: horloge2015,
      solution:
        "Je recule. D'abord 1 h : 22 h 10 − 1 h = 21 h 10. Puis 55 min : 10 min pour aller à 21 h, puis encore 45 min. Le film a commencé à 20 h 15.",
    },
    {
      titre: "1,30 h, est-ce 1 h 30 ?",
      micros: ["duree_decimale"],
      donnees: "Sur une montre, on lit 1,30 h.",
      question: "Combien d'heures et de minutes cela fait-il ?",
      schema: barreDixiemes,
      solution:
        "0,1 h vaut 6 min, car 60 ÷ 10 = 6. 1,30 h = 1 h + 0,3 h. Et 0,3 h = 3 × 6 = 18 min. Donc 1,30 h = 1 h 18 min, pas 1 h 30.",
    },
    {
      titre: "Défi : le réveil",
      micros: ["duree_defi"],
      donnees: "Un réveil sonne à 6 h 30. On appuie 3 fois sur « répéter ». Chaque fois, il sonne 9 minutes plus tard.",
      question: "À quelle heure sonne-t-il pour de bon ?",
      schema: friseReveil,
      solution: "3 × 9 = 27 minutes. 6 h 30 + 27 min = 6 h 57. Il sonne pour de bon à 6 h 57.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un atelier commence à 9 h 40 et dure 50 minutes. À quelle heure se termine-t-il ?",
      correction: "20 min jusqu'à 10 h. Il reste 30 min : l'atelier se termine à 10 h 30.",
      micros: ["duree_calculer"],
    },
    {
      question: "Combien y a-t-il de minutes dans 3 heures ? Et de secondes dans 4 minutes ?",
      correction: "3 × 60 = 180 minutes. 4 × 60 = 240 secondes.",
      micros: ["duree_convertir"],
    },
    {
      question: "Combien de minutes valent 0,75 h ?",
      correction: "0,75 h, ce sont trois quarts d'heure : 3 × 15 = 45 minutes.",
      micros: ["duree_decimale"],
    },
    {
      question: "Il est 17 h 26. Ton ami arrive dans 12 minutes. Pouvez-vous prendre ensemble le bus de 17 h 42 ?",
      correction: "17 h 26 + 12 min = 17 h 38. Le bus part 4 minutes après : oui, vous pouvez le prendre.",
      micros: ["duree_probleme"],
    },
    {
      question: "Combien font 609 heures en semaines, jours et heures ?",
      correction:
        "Un jour fait 24 h : 609 ÷ 24 = 25 jours, reste 9 h. Une semaine fait 7 jours : 25 ÷ 7 = 3 semaines, reste 4 jours. Donc 3 semaines, 4 jours et 9 heures.",
      micros: ["duree_defi", "duree_convertir"],
    },
  ],
  tiMargo: {
    objectif: "Le temps compte par 60, pas par 100 !",
    definition: "Un horaire dit QUAND, une durée dit COMBIEN DE TEMPS.",
    methode: "Coupe à l'heure ronde, puis continue !",
    pieges: "8 h 70, ça n'existe pas ! Et 1,30 h n'est pas 1 h 30.",
    exercice: "Cherche le premier départ APRÈS l'heure qu'il est.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : `ModeClasse.tsx` n'a pas de rendu KaTeX.
// Chaque diapo porte son dessin ; Ti Margo parle sur cinq d'entre elles.
export const slidesDureeTemps6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Horaires et durées - 6e",
    teinte: "objectif",
    schema: avecMargo(friseCours, "Le temps compte par 60, pas par 100 !"),
    section: {
      type: "objectif",
      phrase: "Un horaire dit QUAND. Une durée dit COMBIEN DE TEMPS.",
      sousPhrase: "8 h 15 et 9 h 10 sont des horaires. Entre les deux : 55 min.",
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: barreMatch,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Un match de foot dure 90 min, soit 1 h 30. Le bus, la sonnerie, le film : tout se calcule.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "Compter par 60 vient de Babylone, il y a plus de 4 000 ans.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    teinte: "propriete",
    schema: avecMargo(horloge910, "8 h 70, ça n'existe pas !", "attention"),
    section: {
      type: "objectif",
      phrase: "60 minutes font 1 heure",
      sousPhrase: "8 h 50 + 20 min = 9 h 10.",
    },
  },
  {
    titre: "L'heure ronde",
    badge: "Méthode",
    teinte: "methode",
    schema: friseCinema,
    section: {
      type: "objectif",
      phrase: "Je coupe à l'heure ronde",
      sousPhrase: "17 h 40 → 18 h : 20 min. Puis 1 h 30 : fin à 19 h 30.",
    },
  },
  {
    titre: "Convertir",
    badge: "Propriété",
    teinte: "propriete",
    schema: barre150,
    section: {
      type: "objectif",
      phrase: "150 min = 2 h 30 min",
      sousPhrase: "Combien de fois 60 dans 150 ? 2 fois, et il reste 30.",
    },
  },
  {
    titre: "Les heures à virgule",
    badge: "Propriété",
    teinte: "propriete",
    schema: avecMargo(barreDixiemes, "1,30 h, ce n'est pas 1 h 30 !", "attention"),
    section: {
      type: "objectif",
      phrase: "0,1 h = 6 min",
      sousPhrase: "0,5 h = 30 min. 0,25 h = 15 min. 0,75 h = 45 min.",
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le train",
    teinte: "exemple",
    schema: friseTrain,
    section: {
      type: "exemple",
      enonce: "Un train part à 14 h 25 et arrive à 16 h 05.",
      question: "Combien de temps dure le trajet ?",
      correction: "35 min jusqu'à 15 h, puis 1 h 05. Total : 1 h 40.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(friseMinuit, "Coupe à minuit, puis continue !", "attention"),
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
    teinte: "exercice",
    // ⚠️ La ligne du bus 70 n'est PAS allumée ici : ce serait projeter la réponse.
    schema: avecMargo(
      <CanvasRenderer
        figure={{
          kind: "tableau_donnees",
          headers: ["Bus", "Départ"],
          rows: [
            { values: ["70", "17 h 30"] },
            { values: ["179", "17 h 25"] },
            { values: ["185", "17 h 54"] },
            { values: ["303", "17 h 42"] },
            { values: ["321", "17 h 50"] },
            { values: ["325", "17 h 24"] },
          ],
          questionLabel: "Il est 17 h 26.",
        }}
      />,
      "Cherche le premier départ APRÈS 17 h 26."
    ),
    section: {
      type: "exercice",
      enonce: "Il est 17 h 26.",
      question: "Quel est le prochain bus ?",
      indice: "17 h 24 et 17 h 25 sont déjà passés.",
      correction: "Le bus 70, à 17 h 30.",
    },
  },
];
