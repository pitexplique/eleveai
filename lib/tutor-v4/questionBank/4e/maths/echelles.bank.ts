// lib/tutor-v4/questionBank/4e/maths/echelles.bank.ts
//
// ⭐ NOTION OUVERTE LE 28/08/2026 : `prop_echelle`, agrandissement, réduction et
// échelles. Elle ferme DEUX trous du BO et complète DEUX partiels — le meilleur
// rapport de tout ce qui restait au programme de 4e :
//   · 4e-C-transformations-2 « Utiliser un rapport de réduction ou
//     d'agrandissement (architecture, maquettes) pour calculer des longueurs,
//     des aires, des volumes » ;
//   · 4e-C-transformations-3 « Utiliser l'échelle d'une carte » ;
//   · 4e-C-transformations-1, dont l'effet sur les aires et les volumes
//     manquait ; 4e-B-proportionnalite-8, qui n'avait que les pourcentages.
//
// ⭐ TROIS MICROS RÉACTIVENT LA 6e, avec ses identifiants exacts
// (`echelle_comprendre`, `echelle_distance_reelle`, `echelle_distance_plan`).
// ⛔ Frédéric, 28/08 : « on garde le rappel de 6e ». Renvoyer un élève de 4e
// vers une fiche de 6e serait un jugement ; le moteur d'étoiles fait le tri
// sans rien dire à personne. Les ÉNONCÉS, eux, sont de 4e : cartes IGN,
// maquettes d'architecte, plans de terrain — pas le plan de la salle de classe.
//
// ⭐ ET LE SAUT DE LA 4e TIENT EN UNE PHRASE, déroulée sur trois micros : les
// LONGUEURS sont multipliées par k, donc les AIRES par k², donc les VOLUMES par
// k³. Le k² est le plus cher à admettre — c'est là que les items insistent, et
// c'est le seul endroit où l'on pose un dessin qui se compte.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux VALEURS PARTICULIÈRES :
// le sens d'une échelle inférieure à 1 (une réduction), et le cas emblématique
// k = 2 où l'aire quadruple — celui-là se montre, il ne se calcule pas.
//
// ⛔⛔ 30/09/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Les élèves de 4e
// reconnaissaient la PHRASE, pas les nombres : 2 à 13 squelettes d'énoncé par
// micro, 10 à 19 répétitions sur une série de 20. Chaque gabarit compose
// désormais une SITUATION (tables ci-dessous : plans, cartes, maquettes,
// photos, surfaces, contenants…) × une TOURNURE (4 ou 5 façons de poser la même
// question). Mesure : scripts/mesurer-squelettes-coach.ts 4e prop_echelle.
// La Réunion reste UN contexte parmi d'autres (une carte de l'île), pas le décor.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type {
  EchelleCanvasData,
  FigureLibreCanvasData,
  TableauDonneesCanvasData,
} from "@/lib/tutor-v4/types_canvas";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** 1500 → « 1 500 ». L'élève lit des nombres français. */
function fr(n: number): string {
  return Number.isInteger(n)
    ? n.toLocaleString("fr-FR").replace(/[  ]/g, " ")
    : String(n).replace(".", ",");
}

/* ---------------------------------------------------------------------------
   Petite grammaire : les tables écrivent leurs groupes nominaux AVEC l'article
   (« le plan d'un jardin », « une citerne », « l'allée »), ces fonctions font
   les contractions et les accords.
--------------------------------------------------------------------------- */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « le plan » → « du plan », « la cour » → « de la cour », « une photo » → « d'une photo ». */
function de(gn: string): string {
  if (gn.startsWith("le ")) return "du " + gn.slice(3);
  if (gn.startsWith("les ")) return "des " + gn.slice(4);
  if (/^(un|une) /.test(gn)) return "d'" + gn;
  return "de " + gn;
}
/** « le grand » → « au grand », « la grande » → « à la grande ». */
function a(gn: string): string {
  if (gn.startsWith("le ")) return "au " + gn.slice(3);
  if (gn.startsWith("les ")) return "aux " + gn.slice(4);
  return "à " + gn;
}
/** Un groupe nominal féminin (article « une » ou « la »). */
const fem = (gn: string) => /^(une|la) /.test(gn);
/** « de » devant un nom sans article, avec élision : « de citerne », « d'aquarium ». */
const deNu = (n: string) => (/^[aeiouyéèêh]/i.test(n) ? "d'" + n : "de " + n);

// ⭐ LA TABLE DES ÉCHELLES, écrite à la main plutôt que tirée au hasard : chaque
// ligne donne une correspondance JUSTE et LISIBLE pour 1 cm sur le plan. Un
// tirage libre du dénominateur produirait « 1 cm pour 3,7 m », qui n'existe sur
// aucune carte et n'apprend rien.
const ECHELLES = [
  { d: 100, reel: "1 m", cm: 100, contexte: "un plan d'appartement" },
  { d: 200, reel: "2 m", cm: 200, contexte: "un plan de maison" },
  { d: 500, reel: "5 m", cm: 500, contexte: "un plan de terrain" },
  { d: 1000, reel: "10 m", cm: 1000, contexte: "un plan de quartier" },
  { d: 2000, reel: "20 m", cm: 2000, contexte: "un plan de lotissement" },
  { d: 5000, reel: "50 m", cm: 5000, contexte: "un plan de ville" },
  { d: 10000, reel: "100 m", cm: 10000, contexte: "une carte de randonnée" },
  { d: 25000, reel: "250 m", cm: 25000, contexte: "une carte IGN" },
  { d: 50000, reel: "500 m", cm: 50000, contexte: "une carte routière" },
  { d: 100000, reel: "1 km", cm: 100000, contexte: "une carte départementale" },
] as const;

const echelleDe = (d: number) => ECHELLES.find((x) => x.d === d)!;

// ⛔ Frédéric (06/10/2026) : l'échelle « 1/200 » est gardée, mais TOUJOURS
// expliquée dans l'énoncé : « 1 cm sur le plan représente 200 cm en vrai ».
const surDoc = (doc: string) => (/carte/.test(doc) ? "la carte" : /maquette/.test(doc) ? "la maquette" : "le plan");
const sens = (doc: string, D: string) => `1 cm sur ${surDoc(doc)} représente ${D} cm en vrai`;
/** Virgule décimale, SANS espace des milliers : la forme que l'élève tape. */
const dec = (n: number) => String(n).replace(".", ",");

// ⭐ LES PLANS, chacun avec les échelles qui lui vont et des objets qu'on y
// mesure. `cms` borne la mesure sur le plan quand un grand nombre rendrait
// l'objet absurde (un couloir de 24 m).
const PLANS: {
  doc: string;
  ds: number[];
  objets: string[];
  cms?: number[];
}[] = [
  { doc: "le plan d'un appartement", ds: [100], objets: ["le couloir", "la cuisine", "le séjour"], cms: [2, 3, 4, 5, 6, 8] },
  { doc: "le plan d'une maison", ds: [100, 200], objets: ["la terrasse", "la façade", "le salon"], cms: [2, 3, 4, 5, 6, 8] },
  { doc: "le plan d'un jardin", ds: [100, 200], objets: ["la haie", "l'allée", "le potager"], cms: [2, 3, 4, 5, 6, 8] },
  { doc: "le plan d'une piscine", ds: [100, 200], objets: ["le bassin d'apprentissage", "la pataugeoire"], cms: [2, 3, 4, 5, 6, 8] },
  { doc: "le plan d'une école", ds: [200, 500], objets: ["la cour", "le préau", "le couloir du rez-de-chaussée"] },
  { doc: "le plan d'un gymnase", ds: [200, 500], objets: ["la salle de musculation", "la tribune"] },
  { doc: "le plan d'un chantier", ds: [200, 500], objets: ["la tranchée", "le mur de clôture"] },
  { doc: "le plan d'un stade", ds: [500, 1000], objets: ["le parking du stade", "la tribune principale"] },
  { doc: "le plan d'un camping", ds: [500, 1000], objets: ["l'allée principale", "la rangée d'emplacements"] },
  { doc: "le plan d'une ferme", ds: [500, 1000], objets: ["la clôture du pré", "le hangar"] },
  { doc: "le plan d'un parc", ds: [1000, 2000], objets: ["le bassin", "la promenade"] },
  { doc: "le plan d'un port de plaisance", ds: [1000, 2000], objets: ["la jetée", "le quai"] },
  { doc: "le plan d'un zoo", ds: [1000, 2000], objets: ["l'enclos des girafes", "le chemin des visiteurs"] },
  { doc: "le plan d'un quartier", ds: [1000, 2000, 5000], objets: ["la rue principale", "l'avenue"] },
  { doc: "le plan d'une ville", ds: [5000, 10000], objets: ["le boulevard", "le canal"] },
  { doc: "une carte de randonnée", ds: [10000], objets: ["le sentier", "la montée au col"] },
  { doc: "la carte d'un parc national", ds: [10000], objets: ["le sentier du lac", "la route forestière"] },
];

// Les documents dont on LIT l'échelle : les plans, plus des cartes.
const DOCUMENTS: { doc: string; ds: number[] }[] = [
  ...PLANS.map((p) => ({ doc: p.doc, ds: p.ds })),
  { doc: "une carte IGN", ds: [25000] },
  { doc: "une carte de course d'orientation", ds: [5000, 10000] },
  { doc: "une carte routière", ds: [50000, 100000] },
  { doc: "une carte des pistes cyclables", ds: [25000, 50000] },
  { doc: "une carte départementale", ds: [100000] },
];

// ⭐ DEUX LIEUX SUR UNE CARTE. `petit` : des lieux proches (refuges, lacs),
// servis à grande échelle ; les autres acceptent des cartes plus réduites.
const LIEUX: { paire: string; f: boolean; carte: string; petit: boolean }[] = [
  { paire: "deux villages", f: false, carte: "une carte de La Réunion", petit: false },
  { paire: "deux refuges", f: false, carte: "une carte de montagne", petit: true },
  { paire: "deux phares", f: false, carte: "une carte du littoral", petit: false },
  { paire: "deux gares", f: true, carte: "une carte ferroviaire", petit: false },
  { paire: "deux campings", f: false, carte: "une carte touristique", petit: true },
  { paire: "deux sommets", f: false, carte: "une carte IGN", petit: true },
  { paire: "deux lacs", f: false, carte: "une carte de randonnée", petit: true },
  { paire: "deux ports", f: false, carte: "une carte marine", petit: false },
  { paire: "deux châteaux", f: false, carte: "une carte de la vallée de la Loire", petit: false },
  { paire: "deux écluses", f: true, carte: "la carte d'un canal", petit: true },
  { paire: "deux aires de repos", f: true, carte: "une carte routière", petit: false },
  { paire: "deux îles", f: true, carte: "la carte d'un archipel", petit: false },
  { paire: "deux stations de ski", f: true, carte: "une carte des Alpes", petit: false },
  { paire: "deux villes", f: true, carte: "une carte départementale", petit: false },
  { paire: "deux points de ravitaillement", f: false, carte: "la carte d'un trail", petit: true },
  { paire: "deux cabanes de berger", f: true, carte: "une carte des Pyrénées", petit: true },
];

// ⭐ DES SURFACES qu'on agrandit. Les petites se comptent en cm², les grandes en
// m² — et celles-là n'acceptent que de petits rapports, sinon la terrasse
// devient un stade.
const SURFACES: { obj: string; u: "cm²" | "m²" }[] = [
  { obj: "une photo", u: "cm²" },
  { obj: "un logo", u: "cm²" },
  { obj: "un autocollant", u: "cm²" },
  { obj: "une vignette de BD", u: "cm²" },
  { obj: "un triangle", u: "cm²" },
  { obj: "un motif de tissu", u: "cm²" },
  { obj: "une carte postale", u: "cm²" },
  { obj: "un badge", u: "cm²" },
  { obj: "une étiquette", u: "cm²" },
  { obj: "un potager", u: "m²" },
  { obj: "une terrasse", u: "m²" },
  { obj: "une pelouse", u: "m²" },
  { obj: "un bassin", u: "m²" },
  { obj: "un parterre de fleurs", u: "m²" },
  { obj: "un enclos", u: "m²" },
  { obj: "une cour", u: "m²" },
];

function canvasEchelle(params: {
  variant: EchelleCanvasData["variant"];
  echelle?: string;
  plan?: string;
  reel?: string;
  question?: string;
}): EchelleCanvasData {
  return {
    kind: "echelle",
    variant: params.variant,
    echelleLabel: params.echelle,
    planLabel: "sur le plan",
    reelLabel: "dans la réalité",
    planDistance: params.plan,
    reelDistance: params.reel,
    questionLabel: params.question,
    display: {
      showEchelle: true,
      showLabels: true,
      showQuestion: Boolean(params.question),
    },
    size: { width: 300, height: 200 },
  };
}

function tableau(
  headers: string[],
  rows: { values: (string | number)[] }[],
  caption?: string,
  highlight?: { row?: number; col?: number }
): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    headers,
    rows,
    caption,
    highlight,
    display: { compact: true, striped: true },
  };
}

// ⭐ LE DESSIN QUI FAIT ADMETTRE LE k². Un carré de côté 2 tient dans un carré
// de côté 4 exactement QUATRE fois — on les compte, on ne les calcule pas.
// C'est le seul argument qui tienne devant l'intuition « ×2 partout ».
const CARRE_4 = Array.from({ length: 4 }, (_, r) =>
  Array.from({ length: 4 }, (_, c) => [r, c] as [number, number])
).flat();

const carreDouble: FigureLibreCanvasData = {
  kind: "figure_libre",
  grid: { rows: 4, cols: 4, filledCells: CARRE_4 },
  display: { showGrid: true, showFilled: true, showPerimeter: true },
  colors: { filled: "#dbeafe", grid: "#94a3b8", perimeter: "#2563eb" },
  size: { cellSize: 34, padding: 16 },
};

export const echellesBank: TutorBankItemV4[] = [
  /* =========================================================================
     ECHELLE_COMPRENDRE — réactivation de la 6e, énoncés de 4e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_echelle_comprendre_tpl_1_lire",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le dénominateur dit combien de centimètres réels valent 1 cm du plan.",
    tags: ["echelle", "lire", "qcm", "template", "canvas"],
    generate: () => {
      const doc = randomChoice(DOCUMENTS);
      const e = echelleDe(randomChoice(doc.ds));
      const D = fr(e.d);
      // ⛔ 07/10 : l'échelle est expliquée en centimètres ; la question porte
      // sur la CONVERSION de ces centimètres en mètres ou en kilomètres.
      const S = sens(doc.doc, D);
      const text = randomChoice([
        () => `Sur ${doc.doc} à l'échelle 1/${D}, ${S}. Quelle distance réelle cela fait-il, en m ou en km ?`,
        () => `${cap(doc.doc)} porte l'échelle 1/${D} : ${S}. Écris cette distance réelle en m ou en km.`,
        () => `Échelle 1/${D} sur ${doc.doc} : ${S}. À quelle longueur réelle, en m ou en km, correspond 1 cm mesuré dessus ?`,
        () => `Tu lis « 1/${D} » dans le coin ${de(doc.doc)}. Cela veut dire que ${S}. Que vaut ce centimètre en vrai, en m ou en km ?`,
        () => `Pour lire ${doc.doc} au 1/${D}, il faut savoir que ${S}. Combien cela fait-il, en m ou en km ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: makeChoices(e.reel, [
          ...ECHELLES.filter((x) => x.reel !== e.reel)
            .slice(0, 6)
            .map((x) => x.reel),
        ]),
        expected: [e.reel],
        comparator: "mcq_exact",
        explanation:
          "Définition : une échelle 1/d signifie que 1 unité sur le plan représente d unités dans la réalité — les DEUX dans la même unité.\n\n" +
          `Méthode : 1 cm sur le plan vaut donc ${D} cm en vrai, qu'on convertit ensuite.\n\n` +
          `Calcul : ${fr(e.cm)} cm = ${e.reel}.\n\n` +
          `Conclusion : sur ${doc.doc}, 1 cm représente ${e.reel}.`,
        canvas: canvasEchelle({
          variant: "correspondance",
          echelle: `1/${D}`,
          plan: "1 cm",
          reel: "?",
          question: `1 cm sur le plan, combien en vrai ?`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_echelle_comprendre_tpl_2_comparer",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Plus le dénominateur est GRAND, plus la carte montre grand… ou petit ?",
    tags: ["echelle", "comparer", "qcm", "template"],
    generate: () => {
      // Deux échelles distinctes entre 1/1 000 et 1/100 000 : des cartes, pas des plans d'appartement.
      const i = randomInt(3, 8);
      const j = randomInt(i + 1, 9);
      const petit = ECHELLES[i];
      const grand = ECHELLES[j];
      const lieu = randomChoice([
        "de la même région",
        "du même massif",
        "du même parc naturel",
        "de la même vallée",
        "de la même forêt",
        "de la même île",
        "du même lac",
        "du même département",
        "de la même côte",
        "du même circuit de trail",
        "du même domaine skiable",
        "de la même baie",
        "du même vignoble",
        "de la même presqu'île",
        "du même estuaire",
      ]);
      const [x, y] = Math.random() < 0.5 ? [petit, grand] : [grand, petit];
      // ⛔ Chaque échelle est expliquée (Frédéric, 06/10).
      const sensDeux = `Sur la première, 1 cm représente ${fr(x.d)} cm en vrai ; sur la seconde, 1 cm représente ${fr(y.d)} cm en vrai.`;
      const intro = randomChoice([
        `Deux cartes ${lieu} : l'une au 1/${fr(x.d)}, l'autre au 1/${fr(y.d)}. ${sensDeux}`,
        `On compare deux cartes ${lieu}, au 1/${fr(x.d)} et au 1/${fr(y.d)}. ${sensDeux}`,
      ]);
      const q = randomChoice([
        { t: "Laquelle montre le plus de DÉTAILS ?", bonne: petit, fin: "le PLUS PETIT dénominateur donne la carte la plus détaillée" },
        { t: "Sur laquelle une même route est-elle dessinée le plus LONGUE ?", bonne: petit, fin: "le PLUS PETIT dénominateur dessine les distances en plus grand" },
        { t: "Laquelle représente la plus grande RÉGION sur une feuille de même taille ?", bonne: grand, fin: "le PLUS GRAND dénominateur fait tenir le plus de terrain sur la feuille" },
        { t: "Laquelle RÉDUIT le plus la réalité ?", bonne: grand, fin: "le PLUS GRAND dénominateur correspond à la réduction la plus forte" },
      ]);
      const correct = `1/${fr(q.bonne.d)}`;
      return {
        text: `${intro} ${q.t}`,
        format: "qcm",
        choices: shuffle([`1/${fr(petit.d)}`, `1/${fr(grand.d)}`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : le dénominateur dit de combien la réalité a été RÉDUITE.\n\n" +
          `Méthode : au 1/${fr(petit.d)}, 1 cm vaut ${petit.reel} ; au 1/${fr(grand.d)}, 1 cm vaut ${grand.reel}. La seconde tasse donc bien plus de terrain dans le même centimètre.\n\n` +
          `Calcul : ${fr(petit.d)} < ${fr(grand.d)}, donc la réduction est plus FAIBLE au 1/${fr(petit.d)}.\n\n` +
          `Conclusion : la réponse est ${correct}. ⚠️ C'est souvent le contraire de l'intuition — ${q.fin}.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : le sens même d'une échelle inférieure à 1. C'est
    // une convention de lecture, pas un calcul — donc figée.
    kind: "fixed",
    id: "4e_echelle_comprendre_fixed_reduction",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Sur un plan à l'échelle 1/500, 1 cm sur le plan représente 500 cm en vrai. Cette échelle correspond à quoi ?",
    format: "qcm",
    choices: [
      "une réduction : le dessin est plus petit que la réalité",
      "un agrandissement : le dessin est plus grand que la réalité",
      "la taille réelle, sans changement",
      "une réduction de 500 centimètres",
    ],
    expected: ["une réduction : le dessin est plus petit que la réalité"],
    comparator: "mcq_exact",
    hint: "Le dessin fait 1 quand la réalité fait 500.",
    explanation:
      "Définition : dans une échelle 1/d, le premier nombre est le PLAN et le second la RÉALITÉ.\n\n" +
      "Méthode : on compare les deux. Ici 1 contre 500.\n\n" +
      "Calcul : le plan est 500 fois plus petit que la réalité.\n\n" +
      "Conclusion : une échelle plus petite que 1 est une RÉDUCTION. Une échelle plus grande que 1 — comme 20/1 pour dessiner une fourmi — serait un agrandissement.",
    tags: ["echelle", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     ECHELLE_DISTANCE_REELLE — du plan vers la réalité
  ========================================================================= */
  {
    kind: "template",
    id: "4e_echelle_distance_reelle_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie la mesure du plan par le dénominateur de l'échelle.",
    tags: ["echelle", "plan_vers_reel", "template", "canvas"],
    generate: () => {
      const p = randomChoice(PLANS);
      const objet = randomChoice(p.objets);
      const d = randomChoice(p.ds);
      const D = fr(d);
      const cmPlan = randomChoice(p.cms ?? [2, 3, 4, 5, 6, 8, 12]);
      const reelCm = cmPlan * d;
      const reelM = reelCm / 100;
      const S = sens(p.doc, D);
      const text = randomChoice([
        () => `Sur ${p.doc} à l'échelle 1/${D}, ${objet} mesure ${cmPlan} cm. Ici, ${S}. Quelle est sa longueur réelle, en mètres ?`,
        () => `${cap(p.doc)} est à l'échelle 1/${D} : ${S}. On y mesure ${objet} : ${cmPlan} cm. Quelle longueur cela représente-t-il en réalité, en mètres ?`,
        () => `Sur ${p.doc} au 1/${D}, on mesure ${cmPlan} cm pour ${objet}. On sait que ${S}. Calcule sa longueur réelle, en mètres.`,
        () => `Échelle : 1/${D}, donc ${S}. Sur ${p.doc}, ${objet} fait ${cmPlan} cm. Quelle est sa vraie longueur, en m ?`,
      ])();
      return {
        text,
        format: "short",
        // L'unité dans la réponse ; la forme « 1 500 » (espace des milliers)
        // est acceptée en plus, nue, car le comparateur ne lit pas « 1 500 m ».
        expected: [`${dec(reelM)} m`, `${fr(reelM)} m`, fr(reelM)],
        comparator: "number_equal",
        explanation:
          "Définition : du plan vers la réalité, on AGRANDIT — donc on multiplie.\n\n" +
          `Méthode : on multiplie par le dénominateur, puis on convertit les centimètres en mètres.\n\n` +
          `Calcul : ${cmPlan} × ${D} = ${fr(reelCm)} cm, et ${fr(reelCm)} ÷ 100 = ${fr(reelM)} m.\n\n` +
          `Conclusion : ${objet} mesure ${fr(reelM)} m. ⚠️ Oublier la conversion donnerait ${fr(reelCm)}, un nombre cent fois trop grand.`,
        canvas: canvasEchelle({
          variant: "distance_reelle",
          echelle: `1/${D}`,
          plan: `${cmPlan} cm`,
          reel: "?",
          question: "on multiplie par le dénominateur",
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_echelle_distance_reelle_tpl_2_km",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplie d'abord, convertis ensuite — et vise le kilomètre.",
    tags: ["echelle", "plan_vers_reel", "carte", "qcm", "template"],
    generate: () => {
      const l = randomChoice(LIEUX);
      const e = randomChoice(ECHELLES.slice(7));
      const D = fr(e.d);
      const cmPlan = randomChoice([2, 4, 5, 8, 10]);
      const reelCm = cmPlan * e.d;
      const reelKm = reelCm / 100000;
      const correct = `${fr(reelKm)} km`;
      const un = l.f ? "l'une de l'autre" : "l'un de l'autre";
      const S = sens(l.carte, D);
      const text = randomChoice([
        () => `Sur ${l.carte} au 1/${D}, ${l.paire} sont distant${l.f ? "es" : "s"} de ${cmPlan} cm. Ici, ${S}. Quelle distance les sépare réellement ?`,
        () => `Sur ${l.carte} au 1/${D}, ${cmPlan} cm séparent ${l.paire}. On sait que ${S}. Quelle est la distance réelle ?`,
        () => `${cap(l.carte)}, à l'échelle 1/${D}, place ${l.paire} à ${cmPlan} cm ${un}. Ici, ${S}. Combien de kilomètres en vrai ?`,
        () => `On mesure ${cmPlan} cm entre ${l.paire} sur ${l.carte} (échelle 1/${D} : ${S}). À quelle distance réelle cela correspond-il ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${fr(reelKm * 10)} km`,
          `${fr(reelKm / 10)} km`,
          `${fr(reelCm / 100)} km`,
          `${fr(cmPlan * e.d)} m`,
          `${fr(reelKm)} m`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la distance réelle vaut la distance du plan multipliée par le dénominateur.\n\n" +
          "Méthode : on multiplie, puis on convertit — 1 km vaut 100 000 cm.\n\n" +
          `Calcul : ${cmPlan} × ${D} = ${fr(reelCm)} cm, soit ${fr(reelKm)} km.\n\n` +
          `Conclusion : ${l.paire} sont à ${correct} ${un}. ⚠️ Le piège n'est pas la multiplication, c'est la CONVERSION : une erreur d'un facteur 100 est la plus fréquente.`,
      };
    },
  },

  /* =========================================================================
     ECHELLE_DISTANCE_PLAN — de la réalité vers le plan
  ========================================================================= */
  {
    kind: "template",
    id: "4e_echelle_distance_plan_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 4,
    theme: "neutral",
    hint: "De la réalité vers le plan, on RÉDUIT — donc on divise.",
    tags: ["echelle", "reel_vers_plan", "template", "canvas"],
    generate: () => {
      const p = randomChoice(PLANS);
      const objet = randomChoice(p.objets);
      const d = randomChoice(p.ds);
      const D = fr(d);
      const cmPlan = randomChoice(p.cms ? [3, 4, 5, 6, 7] : [3, 4, 5, 6, 7, 9]);
      const reelCm = cmPlan * d;
      const reelM = reelCm / 100;
      const M = fr(reelM);
      const S = sens(p.doc, D);
      const text = randomChoice([
        () => `On dessine ${p.doc} à l'échelle 1/${D} : ${S}. ${cap(objet)} mesure ${M} m en vrai. Quelle longueur faut-il tracer, en cm ?`,
        () => `${cap(objet)} mesure ${M} m. Sur ${p.doc} au 1/${D}, ${S}. Quelle longueur lui donne-t-on, en cm ?`,
        () => `Sur ${p.doc} au 1/${D}, ${S}. Calcule en cm la longueur à tracer pour ${objet}, qui mesure ${M} m en réalité.`,
        () => `Échelle 1/${D}, donc ${S}. Dans la réalité, ${objet} fait ${M} m. Quelle sera sa longueur sur ${p.doc}, en centimètres ?`,
      ])();
      return {
        text,
        format: "short",
        expected: [`${cmPlan} cm`],
        comparator: "number_equal",
        explanation:
          "Définition : de la réalité vers le plan, on RÉDUIT — donc on divise.\n\n" +
          "Méthode : on convertit d'abord la mesure réelle en centimètres, puis on divise par le dénominateur.\n\n" +
          `Calcul : ${M} m = ${fr(reelCm)} cm, et ${fr(reelCm)} ÷ ${D} = ${cmPlan} cm.\n\n` +
          `Conclusion : ${objet} mesure ${cmPlan} cm sur le plan. ⚠️ Convertir AVANT de diviser : diviser des mètres par un dénominateur en centimètres n'a aucun sens.`,
        canvas: canvasEchelle({
          variant: "distance_plan",
          echelle: `1/${D}`,
          plan: "?",
          reel: `${M} m`,
          question: "on divise par le dénominateur",
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_echelle_distance_plan_tpl_2_choisir",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 4,
    theme: "neutral",
    hint: "Le dessin doit tenir sur la feuille : cherche l'échelle qui va bien.",
    tags: ["echelle", "reel_vers_plan", "choisir", "qcm", "template"],
    generate: () => {
      const o = randomChoice([
        { obj: "une maison", ds: [100] },
        { obj: "une piscine", ds: [100, 200] },
        { obj: "un gymnase", ds: [200, 500] },
        { obj: "un hangar", ds: [200, 500] },
        { obj: "un immeuble", ds: [200, 500] },
        { obj: "un terrain de football", ds: [500] },
        { obj: "un parking", ds: [500, 1000] },
        { obj: "une place de village", ds: [500] },
        { obj: "un stade", ds: [1000] },
        { obj: "un parc", ds: [1000, 2000] },
        { obj: "un camping", ds: [1000, 2000] },
        { obj: "un lac", ds: [2000, 5000] },
        { obj: "un quartier", ds: [2000, 5000] },
        { obj: "un village", ds: [5000] },
        { obj: "un golf", ds: [5000] },
        { obj: "une forêt", ds: [5000] },
      ]);
      const d = randomChoice(o.ds);
      const cmPlan = randomChoice([10, 12, 15, 20]);
      const reelM = (cmPlan * d) / 100;
      const M = fr(reelM);
      const correct = `1/${fr(d)}`;
      const qui = randomChoice([
        { qui: "un architecte", il: "il" },
        { qui: "une géomètre", il: "elle" },
        { qui: "un paysagiste", il: "il" },
        { qui: "une élève", il: "elle" },
      ]);
      const text = randomChoice([
        () => `${cap(o.obj)} de ${M} m de long doit tenir sur ${cmPlan} cm de papier. Quelle échelle faut-il choisir ?`,
        () => `On veut représenter ${o.obj} de ${M} m de long par un segment de ${cmPlan} cm. Quelle échelle utiliser ?`,
        () => `${cap(qui.qui)} dessine ${o.obj} de ${M} m de long sur ${cmPlan} cm. À quelle échelle travaille-t-${qui.il} ?`,
        () => `Quelle échelle permet de dessiner ${o.obj} de ${M} m de long avec ${cmPlan} cm sur la feuille ?`,
        () => `Sur une feuille, ${o.obj} de ${M} m de long doit mesurer ${cmPlan} cm. Quelle est l'échelle du dessin ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `1/${fr(d * 10)}`,
          `1/${fr(d / 10)}`,
          `1/${fr(d * 2)}`,
          `1/${fr(cmPlan)}`,
          `1/${fr(reelM)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'échelle est le rapport entre la mesure du plan et la mesure réelle, dans la MÊME unité.\n\n" +
          "Méthode : on met tout en centimètres, puis on divise le réel par le plan.\n\n" +
          `Calcul : ${M} m = ${fr(reelM * 100)} cm. Et ${fr(reelM * 100)} ÷ ${cmPlan} = ${fr(d)}, donc l'échelle est 1/${fr(d)} : 1 cm sur le plan représente ${fr(d)} cm en vrai.\n\n` +
          "Conclusion : choisir une échelle, c'est répondre à « par combien dois-je réduire ? ».",
      };
    },
  },

  /* =========================================================================
     AGRANDISSEMENT_RAPPORT — ⭐ le saut de la 4e commence ici
  ========================================================================= */
  {
    kind: "template",
    id: "4e_agrandissement_rapport_tpl_1_longueurs",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Un agrandissement multiplie TOUTES les longueurs par le même nombre.",
    tags: ["agrandissement", "longueur", "template"],
    generate: () => {
      const obj = randomChoice([
        "une photo",
        "un timbre",
        "une carte postale",
        "un logo",
        "un croquis",
        "une étiquette",
        "un autocollant",
        "une vignette de BD",
        "un badge",
        "un marque-page",
        "un ticket de cinéma",
        "un motif de tissu",
        "une carte à jouer",
        "un pochoir",
        "un schéma d'insecte",
        "une image de manuel",
      ]);
      const k = randomChoice([2, 3, 4, 5]);
      const l = randomInt(3, 9);
      const L = l + randomInt(2, 6);
      const dim = randomChoice(["largeur", "longueur"] as const);
      const rep = dim === "largeur" ? l * k : L * k;
      const text = randomChoice([
        () => `On agrandit ${obj} de ${l} cm sur ${L} cm avec un rapport ${k}. Quelle est sa nouvelle ${dim}, en cm ?`,
        () => `${cap(obj)} mesure ${l} cm de large et ${L} cm de long. Après un agrandissement de rapport ${k}, combien mesure sa ${dim}, en cm ?`,
        () => `Rapport d'agrandissement : ${k}. ${cap(obj)} fait ${l} cm sur ${L} cm au départ. Calcule sa nouvelle ${dim}, en cm.`,
        () => `On multiplie par ${k} toutes les dimensions ${de(obj)} de ${l} cm sur ${L} cm. Quelle ${dim} obtient-on, en cm ?`,
      ])();
      return {
        text,
        format: "short",
        expected: [`${rep} cm`],
        comparator: "number_equal",
        explanation:
          "Définition : un agrandissement de rapport k multiplie toutes les longueurs par k, et ne change aucun angle.\n\n" +
          "Méthode : on multiplie chaque dimension par le rapport.\n\n" +
          `Calcul : ${l} × ${k} = ${l * k} cm de large, et ${L} × ${k} = ${L * k} cm de long.\n\n` +
          `Conclusion : la nouvelle ${dim} est ${rep} cm. La figure garde exactement la même FORME.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_agrandissement_rapport_tpl_2_trouver_k",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_rapport",
    difficulty: 4,
    theme: "neutral",
    hint: "Le rapport se lit en divisant une longueur de l'image par celle du modèle.",
    tags: ["agrandissement", "rapport", "qcm", "template"],
    generate: () => {
      const s = randomChoice([
        { paire: "deux maquettes du même bâtiment", petit: "la petite", grand: "la grande", dim: "de haut" },
        { paire: "deux maquettes du même avion", petit: "la petite", grand: "la grande", dim: "d'envergure" },
        { paire: "deux modèles réduits du même train", petit: "le petit", grand: "le grand", dim: "de long" },
        { paire: "deux figurines du même personnage", petit: "la petite", grand: "la grande", dim: "de haut" },
        { paire: "deux tirages de la même photo", petit: "le petit", grand: "le grand", dim: "de large" },
        { paire: "deux versions du même logo", petit: "la petite", grand: "la grande", dim: "de large" },
        { paire: "deux maquettes du même voilier", petit: "la petite", grand: "la grande", dim: "de long" },
        { paire: "deux statuettes du même cheval", petit: "la petite", grand: "la grande", dim: "de haut" },
        { paire: "deux dessins du même insecte", petit: "le petit", grand: "le grand", dim: "de long" },
        { paire: "deux affiches du même film", petit: "la petite", grand: "la grande", dim: "de haut" },
        { paire: "deux jouets du même camion", petit: "le petit", grand: "le grand", dim: "de long" },
        { paire: "deux cerfs-volants de même forme", petit: "le petit", grand: "le grand", dim: "d'envergure" },
        { paire: "deux tapis de même forme", petit: "le petit", grand: "le grand", dim: "de large" },
        { paire: "deux copies du même tableau", petit: "la petite", grand: "la grande", dim: "de large" },
        { paire: "deux maquettes de la même fusée", petit: "la petite", grand: "la grande", dim: "de haut" },
      ]);
      const k = randomChoice([2, 3, 4, 5, 6]);
      const p = randomInt(3, 10);
      const g = p * k;
      const correct = String(k);
      const text = randomChoice([
        () => `${cap(s.paire)} : ${s.petit} mesure ${p} cm ${s.dim}, ${s.grand} ${g} cm. Quel est le rapport d'agrandissement ${de(s.petit)} vers ${s.grand} ?`,
        () => `On compare ${s.paire} : ${p} cm ${s.dim} pour ${s.petit}, ${g} cm pour ${s.grand}. Par quel nombre a-t-on multiplié les longueurs ?`,
        () => `${cap(s.paire)} sont semblables. ${cap(s.grand)} mesure ${g} cm ${s.dim} et ${s.petit} ${p} cm. Calcule le rapport d'agrandissement.`,
        () => `${cap(s.grand)} mesure ${g} cm ${s.dim}, ${s.petit} seulement ${p} cm : ce sont ${s.paire}. Quel rapport d'agrandissement fait passer ${de(s.petit)} ${a(s.grand)} ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          String(g - p),
          String(g + p),
          String(p),
          String(g),
          String(k + 1),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : le rapport d'agrandissement est le nombre par lequel on multiplie les longueurs.\n\n" +
          "Méthode : on DIVISE une longueur de l'image par la longueur correspondante du modèle.\n\n" +
          `Calcul : ${g} ÷ ${p} = ${k}.\n\n` +
          `Conclusion : le rapport vaut ${k}. ⚠️ ${g} − ${p} = ${g - p} serait l'ÉCART, pas le rapport — et l'écart ne se conserve pas d'une dimension à l'autre.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_agrandissement_rapport_tpl_3_reduction",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_rapport",
    difficulty: 4,
    theme: "neutral",
    hint: "Une réduction, c'est un rapport plus petit que 1.",
    tags: ["agrandissement", "reduction", "template"],
    generate: () => {
      const s = randomChoice([
        { obj: "une affiche", part: "la hauteur" },
        { obj: "une photo", part: "la largeur" },
        { obj: "un triangle", part: "le plus grand côté" },
        { obj: "un plan de façade", part: "la largeur" },
        { obj: "un tableau", part: "la largeur" },
        { obj: "une carte du monde", part: "la largeur" },
        { obj: "un logo", part: "la hauteur" },
        { obj: "un patron de couture", part: "la longueur de la manche" },
        { obj: "un schéma de vélo", part: "le cadre" },
        { obj: "un drapeau", part: "la longueur" },
        { obj: "une planche de BD", part: "la hauteur" },
        { obj: "un croquis de vitrail", part: "la hauteur" },
        { obj: "un panneau de signalisation", part: "la largeur" },
        { obj: "une frise", part: "la longueur" },
        { obj: "un pentagone", part: "un côté" },
      ]);
      const k = randomChoice([2, 3, 4, 5]);
      const g = randomInt(3, 9) * k;
      const r = g / k;
      const pron = fem(s.part) ? "elle" : "il";
      const text = randomChoice([
        () => `On réduit ${s.obj} avec un rapport 1/${k}. Sur l'original, ${s.part} mesure ${g} cm. Quelle longueur obtient-on après réduction, en cm ?`,
        () => `Rapport de réduction : 1/${k}. ${cap(s.part)} ${de(s.obj)} mesure ${g} cm. Combien de centimètres après réduction ?`,
        () => `On fabrique une copie réduite ${de(s.obj)} au rapport 1/${k}. Si ${s.part} mesurait ${g} cm, combien mesure-t-${pron} sur la copie ?`,
        () => `On veut une version ${k} fois plus petite ${de(s.obj)}. ${cap(s.part)} mesure ${g} cm sur l'original : quelle sera sa mesure sur la version réduite, en cm ?`,
      ])();
      return {
        text,
        format: "short",
        expected: [`${r} cm`],
        comparator: "number_equal",
        explanation:
          `Définition : réduire d'un rapport 1/${k}, c'est multiplier les longueurs par 1/${k} — donc les diviser par ${k}.\n\n` +
          "Méthode : agrandissement et réduction sont la même opération, avec un rapport plus grand ou plus petit que 1.\n\n" +
          `Calcul : ${g} ÷ ${k} = ${r} cm.\n\n` +
          `Conclusion : ${s.part} mesure ${r} cm après réduction. ⭐ Une échelle 1/${k} EST une réduction de rapport 1/${k} — c'est le même objet que sur une carte.`,
      };
    },
  },

  /* =========================================================================
     AGRANDISSEMENT_AIRE — ⭐⭐ le point qui coûte le plus cher de la notion
  ========================================================================= */
  {
    // ⭐ VALEUR PARTICULIÈRE, ET ELLE SE MONTRE. k = 2 est le cas emblématique :
    // l'élève est certain que l'aire double. Le dessin le contredit sans une
    // phrase — un carré de côté 2 tient QUATRE fois dans un carré de côté 4, et
    // les carreaux se comptent.
    kind: "fixed",
    id: "4e_agrandissement_aire_fixed_double",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_aire",
    difficulty: 2,
    theme: "neutral",
    text: "On double toutes les longueurs d'un carré. Par combien son AIRE est-elle multipliée ?",
    format: "qcm",
    choices: ["2", "4", "8", "16"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Compte les carreaux : combien de petits carrés dans le grand ?",
    explanation:
      "Définition : l'aire d'un carré vaut côté × côté. Si le côté est multiplié par 2, l'aire l'est DEUX FOIS.\n\n" +
      "Méthode : on compte. Un carré de côté 2 tient quatre fois dans un carré de côté 4.\n\n" +
      "Calcul : (2 × côté) × (2 × côté) = 4 × côté². L'aire est multipliée par 2² = 4.\n\n" +
      "Conclusion : ⚠️ doubler les longueurs ne double PAS l'aire, il la quadruple. C'est l'erreur la plus fréquente du chapitre.",
    canvas: carreDouble,
    tags: ["agrandissement", "aire", "valeur_particuliere", "qcm", "canvas"],
  },
  {
    // ⭐ 30/09 : l'étoile 2 n'avait QUE l'item figé ci-dessus — l'élève le
    // revoyait dix-neuf fois sur vingt. Ce gabarit pose la même idée (le
    // facteur k² de l'aire) sur des surfaces variées, sans calcul d'aire.
    kind: "template",
    id: "4e_agrandissement_aire_tpl_3_facteur",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_aire",
    difficulty: 2,
    theme: "neutral",
    hint: "Une aire, c'est une longueur × une longueur : le rapport compte deux fois.",
    tags: ["agrandissement", "aire", "facteur", "qcm", "template"],
    generate: () => {
      const s = randomChoice(SURFACES);
      const k = randomChoice([2, 3, 4, 5, 10]);
      const f = fem(s.obj);
      const e = f ? "e" : "";
      const text = randomChoice([
        () => `On multiplie par ${k} toutes les longueurs ${de(s.obj)}. Par combien son aire est-elle multipliée ?`,
        () => `On remplace ${s.obj} par ${f ? "une" : "un"} autre, ${k} fois plus long${e} et ${k} fois plus large. Par combien l'aire est-elle multipliée ?`,
        () => `Après un agrandissement de rapport ${k}, par quel nombre faut-il multiplier l'aire ${de(s.obj)} ?`,
        () => `Les dimensions ${de(s.obj)} sont toutes multipliées par ${k}. Son aire est multipliée par combien ?`,
        () => `${cap(s.obj)} est agrandi${e} : chaque longueur est multipliée par ${k}. Par quel nombre son aire est-elle multipliée ?`,
      ])();
      const correct = fr(k * k);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          fr(k),
          fr(2 * k),
          fr(k * k * k),
          fr(k * k + k),
          fr(k * k - 1),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une aire est le produit de DEUX longueurs. Chacune est multipliée par le rapport.\n\n" +
          `Méthode : l'aire est donc multipliée par ${k} × ${k}.\n\n` +
          `Calcul : ${k}² = ${k} × ${k} = ${k * k}.\n\n` +
          `Conclusion : l'aire ${de(s.obj)} est multipliée par ${k * k}. ⚠️ Répondre ${k}, c'est traiter l'aire comme une longueur.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_agrandissement_aire_tpl_1_calculer",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_aire",
    difficulty: 4,
    theme: "neutral",
    hint: "Les longueurs sont multipliées par k, l'aire par k².",
    tags: ["agrandissement", "aire", "template"],
    generate: () => {
      const s = randomChoice(SURFACES);
      const grande = s.u === "m²";
      const k = randomChoice(grande ? [2, 3] : [2, 3, 4, 5]);
      const aire = randomChoice(grande ? [4, 5, 6, 8, 10, 12] : [12, 15, 18, 20, 24, 30, 36]);
      const u = s.u;
      const text = randomChoice([
        () => `${cap(s.obj)} a une aire de ${aire} ${u}. On l'agrandit avec un rapport ${k}. Quelle est sa nouvelle aire, en ${u} ?`,
        () => `On agrandit ${s.obj} de ${aire} ${u} : toutes ses longueurs sont multipliées par ${k}. Calcule sa nouvelle aire, en ${u}.`,
        () => `Aire de départ : ${aire} ${u}. Rapport d'agrandissement : ${k}. Quelle aire obtient-on pour ${s.obj}, en ${u} ?`,
        () => `Les dimensions ${de(s.obj)} d'aire ${aire} ${u} sont toutes multipliées par ${k}. Quelle est l'aire obtenue, en ${u} ?`,
      ])();
      return {
        text,
        format: "short",
        expected: [`${aire * k * k} ${u}`],
        comparator: "number_equal",
        explanation:
          "Définition : une aire est un produit de DEUX longueurs. Chacune étant multipliée par k, l'aire l'est par k × k.\n\n" +
          `Méthode : on multiplie l'aire par k², et non par k.\n\n` +
          `Calcul : k² = ${k}² = ${k * k}, donc ${aire} × ${k * k} = ${aire * k * k} ${u}.\n\n` +
          `Conclusion : ⚠️ ${aire} × ${k} = ${aire * k} est l'erreur à éviter — ce serait vrai pour une LONGUEUR, pas pour une aire.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_agrandissement_aire_tpl_2_retrouver_k",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_aire",
    difficulty: 5,
    theme: "neutral",
    hint: "Si l'aire est multipliée par 9, par combien les longueurs le sont-elles ?",
    tags: ["agrandissement", "aire", "inverse", "qcm", "template"],
    generate: () => {
      const s = randomChoice(SURFACES);
      const grande = s.u === "m²";
      const k = randomChoice(grande ? [2, 3, 4] : [2, 3, 4, 5, 6]);
      const aire = randomChoice(grande ? [3, 4, 5, 6, 8] : [4, 5, 6, 8, 10, 12]);
      const K2 = k * k;
      const correct = String(k);
      const text = randomChoice([
        () => `L'aire ${de(s.obj)} a été multipliée par ${K2} lors d'un agrandissement. Par combien ses LONGUEURS ont-elles été multipliées ?`,
        () => `Après agrandissement, ${s.obj} occupe ${K2} fois plus de surface. Par quel nombre ses longueurs ont-elles été multipliées ?`,
        () => `On agrandit ${s.obj} : son aire passe de ${aire} ${s.u} à ${aire * K2} ${s.u}. Quel est le rapport d'agrandissement des longueurs ?`,
        () => `Un agrandissement a multiplié par ${K2} l'aire ${de(s.obj)}. Quel est le rapport d'agrandissement ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          String(K2),
          String(K2 * k),
          String(k * 2),
          String(k + 1),
          String(K2 - k),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'aire est multipliée par k² quand les longueurs le sont par k.\n\n" +
          `Méthode : l'aire a été multipliée par ${K2} ; on cherche le nombre qui, multiplié par lui-même, donne ${K2}.\n\n` +
          `Calcul : ${k} × ${k} = ${K2}, donc k = ${k}.\n\n` +
          `Conclusion : les longueurs ${de(s.obj)} ont été multipliées par ${k}. ⚠️ Répondre ${K2} revient à confondre le rapport des longueurs et celui des aires.`,
      };
    },
  },

  /* =========================================================================
     AGRANDISSEMENT_VOLUME — la même idée, une dimension plus haut
  ========================================================================= */
  {
    kind: "template",
    id: "4e_agrandissement_volume_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_volume",
    difficulty: 5,
    theme: "neutral",
    hint: "Un volume est un produit de TROIS longueurs.",
    tags: ["agrandissement", "volume", "template", "canvas"],
    generate: () => {
      const obj = randomChoice([
        "un cube en bois",
        "une boîte",
        "un pavé de pâte à modeler",
        "une bougie",
        "un savon",
        "un moule à gâteau",
        "un vase",
        "une figurine en résine",
        "une brique de jeu de construction",
        "un flacon",
        "une pyramide en bois",
        "une sculpture en plâtre",
        "un bloc de glace",
        "une tirelire",
        "un pot de fleurs",
        "une maquette de maison",
      ]);
      const k = randomChoice([2, 3, 4]);
      const volume = randomChoice([5, 8, 10, 12, 20, 25]);
      const K3 = k * k * k;
      const text = randomChoice([
        () => `${cap(obj)} a un volume de ${volume} cm³. On l'agrandit avec un rapport ${k}. Quel est son nouveau volume, en cm³ ?`,
        () => `On fabrique une version ${k} fois plus grande, dans chaque dimension, ${de(obj)} de ${volume} cm³. Quel volume aura-t-elle, en cm³ ?`,
        () => `Volume de départ : ${volume} cm³. Toutes les longueurs ${de(obj)} sont multipliées par ${k}. Calcule le nouveau volume, en cm³.`,
        () => `Que devient, après un agrandissement de rapport ${k}, le volume ${de(obj)} de ${volume} cm³ ? Donne-le en cm³.`,
      ])();
      return {
        text,
        format: "short",
        expected: [`${volume * K3} cm³`],
        comparator: "number_equal",
        explanation:
          "Définition : un volume est un produit de TROIS longueurs. Chacune multipliée par k, le volume l'est par k × k × k.\n\n" +
          `Méthode : on multiplie le volume par k³.\n\n` +
          `Calcul : k³ = ${k}³ = ${K3}, donc ${volume} × ${K3} = ${fr(volume * K3)} cm³.\n\n` +
          `Conclusion : ⭐ la règle monte d'une dimension à chaque fois — longueurs × ${k}, aires × ${k * k}, volumes × ${K3}.`,
        canvas: tableau(
          ["ce qu'on mesure", `avec un rapport ${k}`],
          [
            { values: ["une longueur", `× ${k}`] },
            { values: ["une aire", `× ${k * k}`] },
            { values: ["un volume", `× ${K3}`] },
          ],
          "une dimension de plus, un facteur k de plus",
          { row: 2 }
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_agrandissement_volume_tpl_2_maquette",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_volume",
    difficulty: 5,
    theme: "neutral",
    hint: "L'échelle porte sur les longueurs, pas sur le volume.",
    tags: ["agrandissement", "volume", "maquette", "qcm", "template"],
    generate: () => {
      const c = randomChoice([
        { n: "réservoir", f: false },
        { n: "citerne", f: true },
        { n: "cuve", f: true },
        { n: "château d'eau", f: false },
        { n: "aquarium", f: false },
        { n: "bassin", f: false },
        { n: "piscine", f: true },
        { n: "tonneau", f: false },
        { n: "cuve de brasserie", f: true },
        { n: "cuve à fioul", f: true },
        { n: "bac de récupération d'eau de pluie", f: false },
        { n: "abreuvoir", f: false },
        { n: "vivier", f: false },
        { n: "fontaine", f: true },
      ]);
      const k = randomChoice([2, 3, 5, 10]);
      const v = randomChoice([2, 3, 4, 6]);
      const K3 = k * k * k;
      const V = v * K3;
      const leVrai = c.f ? "la vraie" : "le vrai";
      const grand = c.f ? "grande" : "grand";
      const il = c.f ? "elle" : "il";
      const un = c.f ? "une" : "un";
      const sens = randomChoice(["direct", "direct", "direct", "inverse"] as const);
      if (sens === "inverse") {
        const correct = `${fr(v)} L`;
        return {
          text: `${cap(un)} ${c.n} contient ${fr(V)} L. Sa maquette est ${k} fois plus petite dans chaque dimension. Combien de litres contient la maquette ?`,
          format: "qcm",
          choices: makeChoices(correct, [
            `${fr(v * k * k)} L`,
            `${fr(v * k)} L`,
            `${fr(V)} L`,
            `${fr(v + 1)} L`,
          ]),
          expected: [correct],
          comparator: "mcq_exact",
          explanation:
            "Définition : « k fois plus petite dans chaque dimension » divise les trois dimensions par k.\n\n" +
            "Méthode : le volume est donc divisé par k³.\n\n" +
            `Calcul : ${k}³ = ${K3}, donc ${fr(V)} ÷ ${K3} = ${fr(v)} L.\n\n` +
            `Conclusion : la maquette contient ${correct}. ⚠️ Diviser seulement par ${k} donnerait ${fr(v * k * k)} L : c'est traiter le volume comme une longueur.`,
        };
      }
      const correct = `${fr(V)} L`;
      const text = randomChoice([
        () => `Une maquette ${deNu(c.n)} contient ${v} L. ${cap(leVrai)} ${c.n} est ${k} fois plus ${grand} EN LONGUEUR. Combien contient-${il} ?`,
        () => `${cap(leVrai)} ${c.n} est ${k} fois plus ${grand} que sa maquette dans chaque dimension. La maquette contient ${v} L : combien de litres contient ${leVrai} ${c.n} ?`,
        () => `Maquette au 1/${k} d'${un} ${c.n} : 1 cm sur la maquette représente ${k} cm en vrai. Elle contient ${v} L. Quelle est la contenance réelle ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${fr(v * k)} L`,
          `${fr(v * k * k)} L`,
          `${fr(v + k)} L`,
          `${fr(v * k * 3)} L`,
          `${fr(V * k)} L`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : « k fois plus grand en longueur » multiplie les trois dimensions par k.\n\n" +
          "Méthode : le volume est donc multiplié par k³.\n\n" +
          `Calcul : ${k}³ = ${K3}, donc ${v} × ${K3} = ${fr(V)} L.\n\n` +
          `Conclusion : ⚠️ répondre ${fr(v * k)} L revient à traiter le volume comme une longueur. C'est pour ça qu'une maquette au 1/10 ne contient pas un dixième, mais un MILLIÈME.`,
      };
    },
  },

  /* =========================================================================
     ECHELLE_DEFI — des situations, et le contrôle de vraisemblance
  ========================================================================= */
  {
    kind: "template",
    id: "4e_echelle_defi_tpl_1_carte_reunion",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Convertis tout en centimètres avant de diviser.",
    tags: ["echelle", "defi", "carte", "template"],
    generate: () => {
      const l = randomChoice(LIEUX);
      // km entier garanti : d/100 000 vaut 0,5 ; 1 ; 2 ; 2,5 ou 5, et cm est pair.
      const d = randomChoice(l.petit ? [50000, 100000] : [100000, 200000, 250000, 500000]);
      const cm = randomChoice(l.petit ? [2, 4, 6, 8, 10] : [2, 4, 6, 8, 10, 12]);
      const km = (d * cm) / 100000;
      const un = l.f ? "l'une de l'autre" : "l'un de l'autre";
      const ils = l.f ? "elles" : "ils";
      const text = randomChoice([
        () => `${cap(l.paire)} sont distant${l.f ? "es" : "s"} de ${km} km. Sur ${l.carte}, ${ils} sont à ${cm} cm ${un}. Quelle est l'échelle de la carte ? Donne le dénominateur.`,
        () => `Sur ${l.carte}, ${cm} cm séparent ${l.paire}, qui sont en réalité à ${km} km ${un}. Quel est le dénominateur de l'échelle ?`,
        () => `Dans la réalité, ${km} km ; sur ${l.carte}, ${cm} cm : c'est la distance entre ${l.paire}. Calcule le dénominateur de l'échelle.`,
        () => `On mesure ${cm} cm entre ${l.paire} sur ${l.carte}. On sait qu'${ils} sont à ${km} km ${un}. L'échelle s'écrit 1/d : combien vaut d ?`,
      ])();
      return {
        text,
        format: "short",
        expected: [String(d), fr(d)],
        comparator: "number_equal",
        explanation:
          "Définition : l'échelle est le rapport plan / réalité, dans la MÊME unité.\n\n" +
          "Méthode : on convertit la distance réelle en centimètres, puis on divise par la mesure du plan.\n\n" +
          `Calcul : ${km} km = ${fr(km * 100000)} cm. Et ${fr(km * 100000)} ÷ ${cm} = ${fr(d)}.\n\n` +
          `Conclusion : l'échelle est 1/${fr(d)} : 1 cm sur la carte représente ${fr(d)} cm en vrai.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_echelle_defi_tpl_2_vraisemblance",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde si le résultat est plausible avant de le valider.",
    tags: ["echelle", "defi", "piege", "qcm", "template"],
    generate: () => {
      const s = randomChoice(SURFACES);
      const grande = s.u === "m²";
      const u = s.u;
      const p = randomChoice(
        grande
          ? [
              { qui: "une paysagiste", il: "elle" },
              { qui: "une architecte", il: "elle" },
              { qui: "Inès", il: "elle" },
              { qui: "un jardinier", il: "il" },
            ]
          : [
              { qui: "un élève", il: "il" },
              { qui: "Léa", il: "elle" },
              { qui: "un graphiste", il: "il" },
              { qui: "un imprimeur", il: "il" },
              { qui: "Karim", il: "il" },
            ]
      );
      const k = randomChoice(grande ? [2, 3] : [2, 3, 4]);
      const aire = randomChoice(grande ? [6, 8, 10, 12] : [20, 24, 30, 40]);
      const faux = aire * k;
      const vrai = aire * k * k;
      const correct = `non : l'aire vaut ${fr(vrai)} ${u}`;
      const text = randomChoice([
        () => `${cap(p.qui)} agrandit ${s.obj} de ${aire} ${u} avec un rapport ${k}, et annonce ${fr(faux)} ${u}. A-t-${p.il} raison ?`,
        () => `« Rapport ${k}, donc l'aire passe de ${aire} à ${fr(faux)} ${u} », affirme ${p.qui} à propos ${de(s.obj)} qu'${p.il} agrandit. Est-ce juste ?`,
        () => `${cap(p.qui)} doit agrandir ${s.obj} de ${aire} ${u} avec un rapport ${k}. ${cap(p.il)} prévoit ${fr(faux)} ${u}. Qu'en penses-tu ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `oui : ${fr(faux)} ${u} est correct`,
          `non : l'aire vaut ${fr(aire * k * k * k)} ${u}`,
          `non : l'aire vaut ${fr(aire + k)} ${u}`,
          `non : l'aire vaut ${fr(aire * 2 * k)} ${u}`,
          `non : l'aire ne change pas`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les longueurs sont multipliées par k, l'aire par k².\n\n" +
          `Méthode : l'aire annoncée, ${fr(faux)} ${u}, vient d'une multiplication par ${k} au lieu de ${k}² = ${k * k}.\n\n` +
          `Calcul : ${aire} × ${k * k} = ${fr(vrai)} ${u}.\n\n` +
          `Conclusion : ⭐ le contrôle de vraisemblance suffit à repérer l'erreur — une surface ${k} fois plus longue ET ${k} fois plus large occupe visiblement bien plus que ${k} fois la place.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_echelle_defi_tpl_3_peinture",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Ce qui couvre une surface se compte à l'aire, pas à la longueur.",
    tags: ["echelle", "defi", "aire", "probleme", "template"],
    generate: () => {
      const r = randomChoice([
        { qte: "pots de peinture", action: "repeindre", obj: "un panneau" },
        { qte: "sacs d'engrais", action: "fertiliser", obj: "une pelouse" },
        { qte: "rouleaux de papier peint", action: "tapisser", obj: "un mur" },
        { qte: "sacs de gravier", action: "couvrir", obj: "une allée" },
        { qte: "kilos de semences", action: "ensemencer", obj: "une parcelle", u: "kg" },
        { qte: "litres de vernis", action: "vernir", obj: "un parquet", u: "L" },
        { qte: "boîtes de carrelage", action: "carreler", obj: "une terrasse" },
        { qte: "palettes de gazon", action: "engazonner", obj: "un terrain de jeu" },
        { qte: "sachets de graines de fleurs", action: "semer", obj: "un parterre" },
        { qte: "pots de lasure", action: "traiter", obj: "une palissade" },
        { qte: "sacs de terreau", action: "recouvrir", obj: "un potager" },
        { qte: "rouleaux de moquette", action: "recouvrir", obj: "une salle" },
        { qte: "tubes de peinture", action: "peindre", obj: "une fresque" },
        { qte: "bidons d'antimousse", action: "traiter", obj: "un toit" },
        { qte: "sacs de sable", action: "couvrir", obj: "un terrain de beach-volley" },
      ]);
      const k = randomChoice([2, 3]);
      const n = randomChoice([3, 4, 5, 6]);
      const f = fem(r.obj);
      const e = f ? "e" : "";
      const text = randomChoice([
        () => `Il faut ${n} ${r.qte} pour ${r.action} ${r.obj}. Combien en faut-il pour ${r.obj} ${k} fois plus grand${e} en longueur ET en largeur ?`,
        () => `On a utilisé ${n} ${r.qte} pour ${r.action} ${r.obj}. On recommence sur ${f ? "une" : "un"} autre, semblable, dont les longueurs sont multipliées par ${k}. Combien de ${r.qte} faut-il ?`,
        () => `${cap(r.obj)} demande ${n} ${r.qte}. Combien de ${r.qte} faut-il pour ${r.action} ${r.obj} ${k} fois plus grand${e} dans chaque dimension ?`,
        () => `Pour ${r.action} ${r.obj}, ${n} ${r.qte} suffisent. Combien en faut-il pour ${r.obj} agrandi${e} avec un rapport ${k} ?`,
      ])();
      return {
        text,
        format: "short",
        // Une mesure porte son unité (« 12 L ») ; un compte de pots reste nu.
        expected: ["u" in r && r.u ? `${n * k * k} ${r.u}` : String(n * k * k)],
        comparator: "number_equal",
        explanation:
          `Définition : la quantité de ${r.qte} est proportionnelle à l'AIRE à couvrir, pas aux longueurs.\n\n` +
          `Méthode : les deux dimensions sont multipliées par ${k}, donc l'aire par ${k}² = ${k * k}.\n\n` +
          `Calcul : ${n} × ${k * k} = ${n * k * k} ${r.qte}.\n\n` +
          `Conclusion : ⚠️ ${n} × ${k} = ${n * k} ne suffirait pas — c'est ce genre d'erreur qui coûte un aller-retour au magasin.`,
      };
    },
  },
];
