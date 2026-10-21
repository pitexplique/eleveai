// lib/tutor-v4/question-banks/maths/cm1/graphiques.bank.ts

import type {
  TutorBankItemV4,
  StatGraphCanvasData,
} from "@/lib/tutor-v4/types";


type GraphType = "barres" | "batons" | "camembert";


function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  // La bonne réponse ne doit JAMAIS sauter au découpage : on la met de côté,
  // on tire trois distracteurs distincts, puis on mélange l'ensemble.
  // ⚠️ 05/08/2026 — les versions précédentes jetaient la bonne réponse dans le
  // même chapeau que les pièges avant de couper à quatre. Avec quatre pièges
  // écrits, elle pouvait rester au fond : l'élève voyait alors quatre
  // propositions dont aucune n'était bonne, sans que rien ne le signale.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function statGraphCanvas(
  data: Omit<StatGraphCanvasData, "kind">
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    ...data,
  };
}

// ============================================================
// CONTEXTES ROBUSTES
// ============================================================

// ⭐ 20/10/2026 — Les maths sont TRANSVERSALES : chaque situation vient d'un
// autre domaine (sport, biologie, météo, écologie, musique, cinéma, cantine,
// transports…) et elle est portée par un MÉTIER. L'intro est écrite dans
// l'énoncé : c'est elle qui fait varier les questions d'un tirage à l'autre.
type GraphCtx = {
  intro: string;
  title: string;
  theme: "neutral" | "reunion" | "sport" | "cuisine";
  labels: string[];
  unit: string;
};

const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const PRENOMS = ["Inès", "Noah", "Lina", "Tom", "Zoé", "Enzo"];

const GRAPH_CONTEXTES_ROBUSTES: GraphCtx[] = [
  { intro: "Le professeur d'EPS note le sport préféré des élèves.", title: "Sports préférés", theme: "sport", labels: ["Football", "Danse", "Natation", "Basket", "Judo"], unit: "élèves" },
  { intro: "Une marchande du marché de Saint-Paul compte ses fruits vendus.", title: "Fruits vendus", theme: "reunion", labels: ["Mangues", "Ananas", "Bananes", "Letchis"], unit: "fruits" },
  { intro: "La bibliothécaire compte les livres empruntés.", title: "Livres empruntés", theme: "neutral", labels: ["Romans", "BD", "Documentaires", "Albums", "Contes"], unit: "livres" },
  { intro: "Une biologiste de Kélonia compte les tortues vues en mer.", title: "Tortues observées", theme: "reunion", labels: ["Janvier", "Février", "Mars", "Avril"], unit: "tortues" },
  { intro: "Un ornithologue compte les oiseaux d'un parc.", title: "Oiseaux du parc", theme: "neutral", labels: ["Merles", "Moineaux", "Martins", "Tourterelles"], unit: "oiseaux" },
  { intro: "Des bénévoles ramassent les déchets d'une plage.", title: "Déchets de la plage", theme: "reunion", labels: ["Bouteilles", "Canettes", "Sacs", "Bouchons"], unit: "déchets" },
  { intro: "Une météorologue mesure la pluie tombée à Cilaos.", title: "Pluie à Cilaos (mm)", theme: "reunion", labels: JOURS, unit: "millimètres" },
  { intro: "Le cuisinier de la cantine compte les desserts choisis.", title: "Desserts choisis", theme: "cuisine", labels: ["Yaourts", "Fruits", "Gâteaux", "Compotes"], unit: "desserts" },
  { intro: "Le chauffeur du car jaune compte ses passagers.", title: "Passagers du car jaune", theme: "reunion", labels: JOURS, unit: "passagers" },
  { intro: "Le cinéma du quartier compte les places vendues.", title: "Places vendues", theme: "neutral", labels: ["Dessin animé", "Aventure", "Comédie", "Documentaire"], unit: "places" },
  { intro: "La professeure de musique note l'instrument préféré.", title: "Instruments préférés", theme: "neutral", labels: ["Guitare", "Piano", "Batterie", "Violon", "Kayamb"], unit: "élèves" },
  { intro: "À la kermesse, on compte les tickets vendus par stand.", title: "Tickets de la kermesse", theme: "neutral", labels: ["Pêche à la ligne", "Chamboule-tout", "Maquillage", "Tombola"], unit: "tickets" },
  { intro: "Un animateur note le jeu de société préféré.", title: "Jeux préférés", theme: "neutral", labels: ["Petits chevaux", "Jeu de l'oie", "Dames", "Cartes"], unit: "votes" },
  { intro: "Dans la cour, des enfants comptent leurs billes.", title: "Billes de chaque enfant", theme: "neutral", labels: PRENOMS, unit: "billes" },
  { intro: "Une confiseuse compte les bonbons d'un bocal.", title: "Bonbons du bocal", theme: "cuisine", labels: ["Fraise", "Citron", "Menthe", "Coco"], unit: "bonbons" },
  { intro: "Une guide du Piton de la Fournaise compte ses randonneurs.", title: "Randonneurs au volcan", theme: "reunion", labels: JOURS, unit: "randonneurs" },
  { intro: "Le jardinier de l'école compte ses plants.", title: "Plants du jardin", theme: "neutral", labels: ["Tomates", "Salades", "Carottes", "Brèdes"], unit: "plants" },
  { intro: "Une vétérinaire compte les animaux soignés.", title: "Animaux soignés", theme: "neutral", labels: ["Chiens", "Chats", "Lapins", "Perruches"], unit: "animaux" },
  { intro: "Un boulanger compte ses viennoiseries vendues.", title: "Viennoiseries vendues", theme: "cuisine", labels: ["Croissants", "Brioches", "Beignets", "Chaussons"], unit: "viennoiseries" },
  { intro: "Une journaliste demande le parfum de glace préféré.", title: "Glaces préférées", theme: "cuisine", labels: ["Vanille", "Chocolat", "Fraise", "Coco"], unit: "personnes" },
  { intro: "La directrice note comment les élèves viennent à l'école.", title: "Trajet vers l'école", theme: "neutral", labels: ["À pied", "En car", "En voiture", "À vélo"], unit: "élèves" },
  { intro: "Une pompière compte les sorties de sa caserne.", title: "Sorties des pompiers", theme: "neutral", labels: JOURS, unit: "sorties" },
  { intro: "Un pêcheur de Saint-Gilles compte ses poissons.", title: "Poissons pêchés", theme: "reunion", labels: ["Thons", "Dorades", "Capitaines", "Bonites"], unit: "poissons" },
  { intro: "Une fleuriste compte les fleurs vendues.", title: "Fleurs vendues", theme: "neutral", labels: ["Roses", "Tulipes", "Orchidées", "Anthuriums"], unit: "fleurs" },
  { intro: "L'entraîneuse compte les tours de piste de chaque coureur.", title: "Tours de piste", theme: "sport", labels: PRENOMS, unit: "tours" },
  { intro: "Un soigneur de l'aquarium compte les poissons des bassins.", title: "Poissons des bassins", theme: "neutral", labels: ["Bassin rouge", "Bassin bleu", "Bassin vert", "Bassin jaune"], unit: "poissons" },
  { intro: "Une astronome compte les étoiles filantes chaque nuit.", title: "Étoiles filantes", theme: "neutral", labels: JOURS, unit: "étoiles filantes" },
  { intro: "Une éleveuse compte les œufs pondus.", title: "Œufs pondus", theme: "neutral", labels: JOURS, unit: "œufs" },
  { intro: "Le gardien de l'école compte les sacs de tri.", title: "Sacs de tri", theme: "neutral", labels: ["Papier", "Plastique", "Verre", "Compost"], unit: "sacs" },
  { intro: "La maîtresse note la couleur préférée de la classe.", title: "Couleurs préférées", theme: "neutral", labels: ["Bleu", "Rouge", "Vert", "Jaune", "Violet"], unit: "élèves" },
  { intro: "Une arbitre note les points de chaque joueuse de basket.", title: "Points marqués", theme: "sport", labels: ["Léa", "Maya", "Sarah", "Jade", "Nora"], unit: "points" },
  { intro: "Un dentiste compte ses patients de la semaine.", title: "Patients du dentiste", theme: "neutral", labels: JOURS, unit: "patients" },
  { intro: "La classe vote pour choisir son délégué.", title: "Vote du délégué", theme: "neutral", labels: PRENOMS, unit: "voix" },
  { intro: "Une guide en mer compte les baleines vues.", title: "Baleines observées", theme: "reunion", labels: ["Juin", "Juillet", "Août", "Septembre"], unit: "baleines" },
  { intro: "Une libraire compte les mangas vendus.", title: "Mangas vendus", theme: "neutral", labels: JOURS, unit: "mangas" },
  { intro: "Un apiculteur compte ses ruches dans chaque champ.", title: "Ruches par champ", theme: "reunion", labels: ["Letchis", "Baies roses", "Goyaviers", "Fleurs"], unit: "ruches" },
  { intro: "Une infirmière scolaire compte ses visites.", title: "Visites à l'infirmerie", theme: "neutral", labels: JOURS, unit: "visites" },
  { intro: "Une chanteuse compte les chansons de chaque album.", title: "Chansons par album", theme: "neutral", labels: ["Album bleu", "Album rouge", "Album vert", "Album or"], unit: "chansons" },
  { intro: "Un garde forestier compte les arbres plantés.", title: "Arbres plantés", theme: "reunion", labels: ["Tamarins", "Bois de couleur", "Palmistes", "Filaos"], unit: "arbres" },
  { intro: "Un club de natation compte les longueurs nagées.", title: "Longueurs nagées", theme: "sport", labels: PRENOMS, unit: "longueurs" },
];

function randomContext() {
  return randomChoice(GRAPH_CONTEXTES_ROBUSTES);
}

/** « de » ou « d' » devant le nom de l'unité (d'élèves, d'œufs, de billes). */
function de(unit: string) {
  return /^[aeiouyéèêàâîôœh]/i.test(unit) ? `d'${unit}` : `de ${unit}`;
}

/** Valeurs distinctes, multiples d'un pas (2, 5 ou 10) : lecture sur des nombres ronds. */
function roundValues(count: number, pas: number, minK: number, maxK: number) {
  return uniqueValues(count, minK, maxK).map((k) => k * pas);
}

/** Tirage d'une situation : contexte, 3 ou 4 catégories, valeurs rondes. */
function tirerSituation(n = 4, pas = randomChoice([1, 2, 5])) {
  const ctx = randomContext();
  const labels = shuffle(ctx.labels).slice(0, n);
  const maxK = pas === 1 ? 30 : pas === 2 ? 15 : 10;
  const values = roundValues(labels.length, pas, pas === 1 ? 3 : 2, maxK);
  return { ctx, labels, values, pas };
}

// ⭐ 20/10/2026 — LIRE sur l'AXE GRADUÉ. Avant, la valeur était écrite sur la
// barre : « lire » revenait à recopier un nombre. Ici, la valeur est cachée et
// l'élève suit la ligne jusqu'à l'axe. CM1 : un pas de 1, 2, 5 ou 10, six
// graduations utiles au plus, et la barre s'arrête TOUJOURS sur une graduation.

/** Situation à lire sur l'axe : valeurs = 1 à 6 fois le pas, distinctes. */
function tirerSituationAxe(n = 4, pas = randomChoice([2, 2, 5, 5, 10, 10, 1])) {
  const ctx = randomContext();
  const labels = shuffle(ctx.labels).slice(0, n);
  const values = roundValues(labels.length, pas, 1, 6);
  return { ctx, labels, values, pas };
}

/** Affichage « axe gradué » : pas de nombre sur les barres, un axe et sa grille. */
function displayAxe(pas: number, unit: string, highlightIndex?: number) {
  return {
    showLabels: true,
    showValues: false,
    showAxis: true,
    step: pas,
    axeY: unit,
    ...(highlightIndex === undefined ? {} : { highlightIndex }),
  };
}

/** Comment on lit, en phrases courtes. */
function lectureAxe(label: string, v: number, pas: number) {
  return `Je pars du haut de la barre « ${label} ». Je suis la ligne jusqu'à l'axe. Une graduation vaut ${pas} : je lis ${v}.`;
}

/** Leurres de lecture : la graduation voisine, et le pas lu à la place de la valeur. */
function leurresAxe(v: number, pas: number, autres: number[] = []) {
  return leurres(v, [v - pas, v + pas, pas, ...autres]);
}

const HINT_AXE = "Pars du haut de la barre. Suis la ligne jusqu'à l'axe, puis lis le nombre.";

/** Leurres numériques distincts et positifs autour d'une valeur. */
function leurres(correct: number, candidats: number[]) {
  return Array.from(new Set(candidats.filter((v) => v > 0 && v !== correct))).map(String);
}

function uniqueValues(count: number, min: number, max: number) {
  const values = new Set<number>();

  while (values.size < count) {
    values.add(randomInt(min, max));
  }

  return Array.from(values);
}

function makeData(labels: string[], values: number[]) {
  return labels.map((label, index) => ({
    label,
    value: values[index],
  }));
}

function total(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}

function maxIndex(values: number[]) {
  let index = 0;

  for (let i = 1; i < values.length; i++) {
    if (values[i] > values[index]) index = i;
  }

  return index;
}

function minIndex(values: number[]) {
  let index = 0;

  for (let i = 1; i < values.length; i++) {
    if (values[i] < values[index]) index = i;
  }

  return index;
}

function randomGraphType(): GraphType {
  return randomChoice(["barres", "batons"]);
}

// ============================================================
// BANK
// ============================================================

export const graphiquesBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un graphique en barres, la barre des bananes monte jusqu'à 28. Combien de bananes ?",
    format: "qcm",
    choices: ["28","2","8","280"],
    expected: ["28"],
    comparator: "mcq_exact",
    hint: "On lit la hauteur de la barre.",
    explanation: "La hauteur de la barre des bananes est 28 : il y a 28 bananes.",
    tags: ["cm1","graphique","graphique_lire","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_g2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un graphique en barres, la barre la plus haute représente...",
    format: "qcm",
    choices: ["la plus grande valeur","la plus petite valeur","le total","la moyenne"],
    expected: ["la plus grande valeur"],
    comparator: "mcq_exact",
    hint: "Plus la barre est haute, plus la valeur est grande.",
    explanation: "La barre la plus haute correspond à la plus grande valeur.",
    tags: ["cm1","graphique","graphique_lire","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Un graphique doit montrer 15 mangues, mais la barre est vide. À quelle hauteur faut-il la tracer ?",
    format: "qcm",
    choices: ["15","5","1","50"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "La hauteur doit correspondre à la donnée.",
    explanation: "La barre doit monter jusqu'à 15, car il y a 15 mangues.",
    tags: ["cm1","graphique","graphique_completer","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un graphique : ananas 24, bananes 28, mangues 10. Quel fruit a la barre la plus haute ?",
    format: "qcm",
    choices: ["bananes","ananas","mangues","tous pareil"],
    expected: ["bananes"],
    comparator: "mcq_exact",
    hint: "La barre la plus haute = la plus grande valeur.",
    explanation: "La plus grande valeur est 28 (bananes) : c'est la barre la plus haute.",
    tags: ["cm1","graphique","graphique_interpreter","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un graphique : ananas 24, bananes 28. Combien de bananes de plus que d'ananas ?",
    format: "qcm",
    choices: ["4","2","52","24"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Soustrais les deux valeurs.",
    explanation: "28 − 24 = 4 bananes de plus.",
    tags: ["cm1","graphique","graphique_defi","guide","qcm"],
  },

  // ============================================================
  // GRAPHIQUE_LIRE
  // Lire une valeur directe dans un graphique
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_1_activites",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "sport",
    text: "Le professeur d'EPS note l'activité choisie. Lis l'axe : combien d’élèves ont choisi la natation ?",
    format: "qcm",
    choices: ["10", "8", "12", "2"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Pars du haut de la barre Natation. Suis la ligne jusqu'à l'axe.",
    explanation: exp(
      "Un graphique représente des données avec des barres. L'axe gradué donne la hauteur.",
      "On part du haut de la barre Natation, on suit la ligne jusqu'à l'axe.",
      "Une graduation vaut 2. La barre s'arrête sur la graduation 10.",
      "10 élèves ont choisi la natation."
    ),
    tags: ["cm1", "graphique", "lire", "qcm", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Activités choisies",
      data: [
        { label: "Football", value: 12 },
        { label: "Danse", value: 8 },
        { label: "Natation", value: 10 },
      ],
      display: displayAxe(2, "élèves", 2),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_2_fruits_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Une marchande du marché de Saint-Paul compte ses fruits. Lis l'axe : combien de mangues a-t-elle vendues ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Pars du haut du bâton Mangues. Suis la ligne jusqu'à l'axe.",
    explanation: exp(
      "Lire un graphique, c'est trouver la hauteur d'un bâton sur l'axe gradué.",
      "On part du haut du bâton Mangues, on suit la ligne jusqu'à l'axe.",
      "Une graduation vaut 5. Le bâton s'arrête sur la graduation 20 (pas 15, ni 25).",
      "20 mangues ont été vendues."
    ),
    tags: ["cm1", "graphique", "lire", "reunion", "short", "canvas", "axe_gradue"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Fruits vendus au marché",
      data: [
        { label: "Mangues", value: 20 },
        { label: "Ananas", value: 10 },
        { label: "Bananes", value: 25 },
      ],
      display: displayAxe(5, "fruits", 0),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_3_livres",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de BD ont été empruntées ?",
    format: "qcm",
    choices: ["14", "9", "20", "11"],
    expected: ["14"],
    comparator: "mcq_exact",
    hint: "Cherche la barre BD.",
    explanation: exp(
      "Un graphique associe chaque catégorie à une valeur.",
      "On repère la catégorie BD.",
      "La barre BD vaut 14.",
      "14 BD ont été empruntées."
    ),
    tags: ["cm1", "graphique", "lire", "qcm", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Livres empruntés",
      data: [
        { label: "Romans", value: 9 },
        { label: "BD", value: 14 },
        { label: "Documentaires", value: 11 },
        { label: "Albums", value: 6 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 1,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_graphique_lire_tpl_1_valeur_aleatoire_short",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Repère la catégorie demandée, puis lis la valeur.",
    tags: ["cm1", "graphique", "lire", "template", "robuste", "canvas"],
    generate: () => {
      // Une fois sur deux : la valeur est cachée, on la lit sur l'axe gradué.
      if (randomChoice([true, false])) {
        const { ctx, labels, values, pas } = tirerSituationAxe(randomChoice([3, 4]));
        const index = randomInt(0, labels.length - 1);
        const v = values[index];
        const correct = String(v);
        return {
          theme: ctx.theme,
          hint: HINT_AXE,
          text: `${ctx.intro} ${randomChoice([
            `Lis l'axe : combien ${de(ctx.unit)} pour « ${labels[index]} » ?`,
            `Suis la ligne jusqu'à l'axe. Combien ${de(ctx.unit)} pour « ${labels[index]} » ?`,
            `La barre « ${labels[index]} » monte jusqu'à quelle graduation ?`,
          ])}`,
          format: "short",
          expected: [correct],
          comparator: "number_equal",
          explanation: exp(
            "Lire un graphique, c'est trouver la hauteur d'une barre sur l'axe gradué.",
            "On part du haut de la barre, on suit la ligne jusqu'à l'axe, on lit le nombre.",
            lectureAxe(labels[index], v, pas),
            `La réponse est ${v} ${ctx.unit}.`
          ),
          canvas: statGraphCanvas({
            graphType: randomGraphType(),
            title: ctx.title,
            data: makeData(labels, values),
            display: displayAxe(pas, ctx.unit, index),
          }),
        };
      }

      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);
      const values = uniqueValues(labels.length, 5, 28);
      const index = randomInt(0, labels.length - 1);
      const correct = String(values[index]);

      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${randomChoice([
          `Dans le graphique, quelle est la valeur pour « ${labels[index]} » ?`,
          `Quel nombre est écrit sur la barre « ${labels[index]} » ?`,
          `Combien ${de(ctx.unit)} pour « ${labels[index]} » ?`,
        ])}`,
        format: "short",
        expected: [correct],
        comparator: "number_equal",
        explanation: exp(
          "Lire un graphique, c’est retrouver une valeur représentée.",
          "On cherche la catégorie demandée, puis on lit le nombre écrit sur sa barre.",
          `La catégorie ${labels[index]} a pour valeur ${correct}.`,
          `La réponse est ${correct}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: index,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_lire_tpl_2_valeur_aleatoire_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    hint: HINT_AXE,
    tags: ["cm1", "graphique", "lire", "qcm", "template", "robuste", "canvas", "axe_gradue"],
    generate: () => {
      // Toujours sur l'axe gradué : les leurres sont la graduation voisine et le pas.
      const { ctx, labels, values, pas } = tirerSituationAxe(4);
      const index = randomInt(0, labels.length - 1);
      const v = values[index];
      const correct = String(v);
      const autres = values.filter((_, i) => i !== index);

      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${randomChoice([
          `Lis l'axe gradué. Quelle est la valeur de « ${labels[index]} » ?`,
          `Combien ${de(ctx.unit)} pour « ${labels[index]} » ? Suis la ligne jusqu'à l'axe.`,
          `Jusqu'où monte la barre « ${labels[index]} » sur l'axe ?`,
        ])}`,
        format: "qcm",
        choices: makeChoices(correct, leurresAxe(v, pas, autres)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un graphique permet de lire une donnée grâce à son axe gradué.",
          "On part du haut de la barre, on suit la ligne jusqu'à l'axe. On ne lit pas la graduation voisine.",
          lectureAxe(labels[index], v, pas),
          `La bonne réponse est ${v}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: displayAxe(pas, ctx.unit, index),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_lire_tpl_3_camembert_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère la part demandée et lis sa valeur.",
    tags: ["cm1", "graphique", "lire", "camembert", "template", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 3);
      const values = uniqueValues(labels.length, 5, 20);
      const index = randomInt(0, labels.length - 1);
      const correct = String(values[index]);

      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${randomChoice([
          `Dans le diagramme, combien ${de(ctx.unit)} pour « ${labels[index]} » ?`,
          `Quelle valeur est écrite sur la part « ${labels[index]} » ?`,
          `Lis la part « ${labels[index]} » : combien ${de(ctx.unit)} ?`,
        ])}`,
        format: "qcm",
        choices: makeChoices(
          correct,
          [...values.filter((_, i) => i !== index).map(String), String(total(values))]
        ),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un diagramme circulaire représente des catégories avec des parts.",
          "On repère la part demandée et sa valeur.",
          `La part ${labels[index]} vaut ${correct}.`,
          `La réponse est ${correct}.`
        ),
        canvas: statGraphCanvas({
          graphType: "camembert",
          title: ctx.title,
          data: makeData(labels, values),
          // valeursParts : depuis le 20/10/2026, le camembert n'écrit que le total par défaut.
          display: {
            showLabels: true,
            showValues: true,
            valeursParts: true,
            highlightIndex: index,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_lire_tpl_4_quelle_categorie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le nombre demandé sur le graphique, puis regarde sous quelle barre il est écrit.",
    tags: ["cm1", "graphique", "lire", "lecture_inverse", "template", "robuste", "canvas"],
    generate: () => {
      const graphType = randomChoice<GraphType>(["barres", "batons", "camembert"]);
      // Barres et bâtons : une fois sur deux, sur l'axe gradué (pas de nombre écrit).
      const surAxe = graphType !== "camembert" && randomChoice([true, false]);
      const { ctx, labels, values, pas } = surAxe ? tirerSituationAxe(4) : tirerSituation(4);
      const index = randomInt(0, labels.length - 1);
      const v = values[index];
      const correct = labels[index];
      const question = randomChoice([
        `Quelle barre monte jusqu'à ${v} ?`,
        `Pour quelle catégorie lit-on ${v} ${ctx.unit} ?`,
        `Quelle catégorie a exactement ${v} ${ctx.unit} ?`,
        `Le nombre ${v} est lu pour quelle catégorie ?`,
      ]);
      const methode = surAxe
        ? `On trouve ${v} sur l'axe (une graduation vaut ${pas}). On suit la ligne de ${v} : elle touche le haut d'une seule barre.`
        : `On cherche le nombre ${v} sur le graphique, puis on lit le nom écrit sous la barre (ou sur la part).`;
      return {
        theme: ctx.theme,
        ...(surAxe ? { hint: "Trouve le nombre sur l'axe. Suis sa ligne : quelle barre s'arrête juste là ?" } : {}),
        text: `${ctx.intro} ${question}`,
        format: "qcm",
        choices: makeChoices(correct, labels.filter((_, i) => i !== index)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Lire un graphique, c'est relier un nombre à sa catégorie.",
          methode,
          `${labels.map((l, i) => `${l} : ${values[i]}`).join(" ; ")}. Seule « ${correct} » vaut ${v}.`,
          `La réponse est « ${correct} ».`
        ),
        canvas: statGraphCanvas({
          graphType,
          title: ctx.title,
          data: makeData(labels, values),
          display: surAxe
            ? displayAxe(pas, ctx.unit)
            : { showLabels: true, showValues: true, ...(graphType === "camembert" ? { valeursParts: true } : {}) },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_lire_tpl_5_comparer_lecture",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la valeur de chaque barre, puis compare-la au nombre donné.",
    tags: ["cm1", "graphique", "lire", "compter_barres", "template", "robuste", "canvas"],
    generate: () => {
      const { ctx, labels, values } = tirerSituation(4, randomChoice([2, 5]));
      const sorted = [...values].sort((a, b) => a - b);
      // Seuil strictement entre deux valeurs : aucune égalité possible.
      const k = randomInt(0, 2);
      const seuil = Math.floor((sorted[k] + sorted[k + 1]) / 2);
      const plus = randomChoice([true, false]);
      const count = values.filter((v) => (plus ? v > seuil : v < seuil)).length;
      const question = plus
        ? randomChoice([
            `Combien de barres dépassent ${seuil} ?`,
            `Combien de catégories ont plus de ${seuil} ${ctx.unit} ?`,
          ])
        : randomChoice([
            `Combien de barres restent sous ${seuil} ?`,
            `Combien de catégories ont moins de ${seuil} ${ctx.unit} ?`,
          ]);
      const retenues = labels.filter((_, i) => (plus ? values[i] > seuil : values[i] < seuil));
      const correct = String(count);
      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${question}`,
        format: "qcm",
        choices: makeChoices(correct, ["0", "1", "2", "3", "4"].filter((c) => c !== correct)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On lit chaque valeur, puis on la compare au nombre donné.",
          `On garde les catégories ${plus ? "au-dessus de" : "en dessous de"} ${seuil}.`,
          `${labels.map((l, i) => `${l} : ${values[i]}`).join(" ; ")}. Retenues : ${retenues.join(", ")}.`,
          `Il y en a ${count}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomChoice<GraphType>(["barres", "batons"]),
          title: ctx.title,
          data: makeData(labels, values),
          display: { showLabels: true, showValues: true },
        }),
      };
    },
  },

  // ============================================================
  // GRAPHIQUE_COMPLETER
  // Retrouver une valeur manquante ou un total
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_1_total_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Le total est 40 fruits. La barre des bananes a été effacée. Lis les deux autres barres sur l'axe. Combien de bananes ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Lis Mangues et Ananas sur l'axe. Additionne, puis complète jusqu'à 40.",
    explanation: exp(
      "Compléter un graphique peut demander de retrouver une valeur manquante.",
      "Je lis chaque barre sur l'axe (une graduation vaut 5) : Mangues 15, Ananas 10. Puis j'additionne et je complète jusqu'au total.",
      "15 + 10 = 25, puis 40 − 25 = 15.",
      "Il y a 15 bananes : la barre doit monter jusqu'à 15."
    ),
    tags: ["cm1", "graphique", "completer", "total", "reunion", "canvas", "axe_gradue"],
    // La barre effacée vaut 0 : elle n'est pas dessinée, son nom reste sous l'axe.
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Fruits vendus",
      data: [
        { label: "Mangues", value: 15 },
        { label: "Ananas", value: 10 },
        { label: "Bananes", value: 0 },
      ],
      display: displayAxe(5, "fruits", 2),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_2_total_sport",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "sport",
    text: "9 élèves choisissent le football, 7 la danse et 8 la natation. Quel est le total ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Additionne les trois valeurs.",
    explanation: exp(
      "Pour compléter un total, on additionne toutes les valeurs.",
      "On ajoute les élèves de chaque activité.",
      "9 + 7 + 8 = 24.",
      "Le total est 24 élèves."
    ),
    tags: ["cm1", "graphique", "completer", "total", "sport", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Activités choisies",
      data: [
        { label: "Football", value: 9 },
        { label: "Danse", value: 7 },
        { label: "Natation", value: 8 },
      ],
      display: {
        showLabels: true,
        showValues: true,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_graphique_completer_tpl_1_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour trouver un total, additionne toutes les valeurs.",
    tags: ["cm1", "graphique", "completer", "total", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 3);
      const values = uniqueValues(labels.length, 5, 20);
      const result = total(values);

      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${randomChoice([
          `Combien ${de(ctx.unit)} en tout sur le graphique ?`,
          `Quel est le total ${de(ctx.unit)} ?`,
          `On ajoute toutes les barres : combien ${de(ctx.unit)} ?`,
        ])}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Le total d’un graphique est la somme de toutes les valeurs.",
          "On additionne les valeurs représentées.",
          `${values.join(" + ")} = ${result}.`,
          `Le total est ${result}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_completer_tpl_2_valeur_manquante_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les valeurs connues, puis soustrais au total.",
    tags: ["cm1", "graphique", "completer", "valeur_manquante", "template", "robuste", "canvas"],
    generate: () => {
      // Une fois sur deux : les barres connues se LISENT sur l'axe gradué,
      // la barre cherchée est effacée (valeur 0, son nom reste sous l'axe).
      if (randomChoice([true, false])) {
        const { ctx, labels, values, pas } = tirerSituationAxe(3);
        // La barre effacée n'est jamais la plus haute : l'axe (qui s'arrête à la
        // plus haute barre dessinée) doit permettre de la tracer.
        const plusHaute = maxIndex(values);
        const missingIndex = randomChoice(values.map((_, i) => i).filter((i) => i !== plusHaute));
        const missingValue = values[missingIndex];
        const result = total(values);
        const connus = values.filter((_, i) => i !== missingIndex);
        const nomsConnus = labels.filter((_, i) => i !== missingIndex);
        const knownSum = result - missingValue;
        const correct = String(missingValue);
        const dessin = values.map((v, i) => (i === missingIndex ? 0 : v));
        return {
          theme: ctx.theme,
          hint: "Lis les barres sur l'axe. Additionne-les, puis complète jusqu'au total.",
          text: `${ctx.intro} ${randomChoice([
            `En tout, il y a ${result} ${ctx.unit}. La barre « ${labels[missingIndex]} » a été effacée. Combien pour « ${labels[missingIndex]} » ?`,
            `Le total est ${result}. Lis les autres barres sur l'axe. Quelle valeur pour « ${labels[missingIndex]} » ?`,
            `Il manque la barre « ${labels[missingIndex]} ». Le total est ${result} ${ctx.unit}. Jusqu'où faut-il la tracer ?`,
          ])}`,
          format: "qcm",
          // Leurres : la graduation voisine, la somme des barres connues, le total.
          choices: makeChoices(correct, leurres(missingValue, [missingValue - pas, missingValue + pas, knownSum, result])),
          expected: [correct],
          comparator: "mcq_exact",
          explanation: exp(
            "Pour retrouver une valeur manquante, on utilise le total.",
            `${lectureAxe(nomsConnus[0], connus[0], pas)} ${lectureAxe(nomsConnus[1], connus[1], pas)}`,
            `${connus[0]} + ${connus[1]} = ${knownSum}, puis ${result} − ${knownSum} = ${missingValue}.`,
            `La barre « ${labels[missingIndex]} » doit monter jusqu'à ${missingValue}.`
          ),
          canvas: statGraphCanvas({
            graphType: "barres",
            title: ctx.title,
            data: makeData(labels, dessin),
            display: displayAxe(pas, ctx.unit, missingIndex),
          }),
        };
      }

      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 3);
      const values = uniqueValues(labels.length, 6, 18);

      const missingIndex = randomInt(0, labels.length - 1);
      const missingValue = values[missingIndex];
      const result = total(values);
      const knownSum = result - missingValue;

      return {
        theme: ctx.theme,
        text: `Le total est ${result}. Les autres valeurs font ${knownSum}. Quelle est la valeur de "${labels[missingIndex]}" ?`,
        format: "short",
        expected: [String(missingValue)],
        comparator: "number_equal",
        explanation: exp(
          "Pour retrouver une valeur manquante, on utilise le total.",
          "On soustrait la somme des valeurs connues au total.",
          `${result} - ${knownSum} = ${missingValue}.`,
          `La valeur manquante est ${missingValue}.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: false,
            highlightIndex: missingIndex,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_completer_tpl_3_completer_jusqua",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche combien il manque pour atteindre la valeur demandée.",
    tags: ["cm1", "graphique", "completer", "complement", "template", "canvas"],
    generate: () => {
      // Une fois sur deux : la barre de départ se LIT sur l'axe gradué.
      if (randomChoice([true, false])) {
        const { ctx, labels, values, pas } = tirerSituationAxe(3);
        const index = randomInt(0, labels.length - 1);
        const current = values[index];
        // Ce qui manque : un nombre entier de graduations, la cible reste ronde.
        const missing = pas * randomInt(1, 4);
        const target = current + missing;
        const correct = String(missing);
        return {
          theme: ctx.theme,
          hint: "Lis d'abord la barre sur l'axe. Puis cherche ce qui manque jusqu'au nombre visé.",
          text: `${ctx.intro} ${randomChoice([
            `Lis la barre « ${labels[index]} » sur l'axe. Combien faut-il ajouter pour atteindre ${target} ?`,
            `On veut que « ${labels[index]} » monte jusqu'à ${target}. Combien ${de(ctx.unit)} faut-il ajouter ?`,
            `Objectif : ${target} ${ctx.unit} pour « ${labels[index]} ». Combien en manque-t-il ?`,
          ])}`,
          format: "qcm",
          // Leurres : la graduation voisine lue au départ, la valeur de départ, la cible.
          choices: makeChoices(correct, leurres(missing, [missing - pas, missing + pas, current, target])),
          expected: [correct],
          comparator: "mcq_exact",
          explanation: exp(
            "Compléter une valeur, c'est chercher ce qui manque.",
            lectureAxe(labels[index], current, pas),
            `${target} − ${current} = ${missing}.`,
            `Il faut ajouter ${missing} ${ctx.unit}.`
          ),
          canvas: statGraphCanvas({
            graphType: randomGraphType(),
            title: ctx.title,
            data: makeData(labels, values),
            display: displayAxe(pas, ctx.unit, index),
          }),
        };
      }

      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 3);

      const current = randomInt(8, 18);
      const missing = randomInt(4, 12);
      const target = current + missing;

      const otherValues = uniqueValues(2, 5, 25);
      const values = [current, otherValues[0], otherValues[1]];

      return {
        theme: ctx.theme,
        text: `${labels[0]} vaut ${current}. Combien faut-il ajouter pour atteindre ${target} ?`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Compléter une valeur, c’est chercher ce qui manque.",
          "On soustrait la valeur actuelle à la valeur visée.",
          `${target} - ${current} = ${missing}.`,
          `Il faut ajouter ${missing}.`
        ),
        canvas: statGraphCanvas({
          graphType: "batons",
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: 0,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_completer_tpl_4_barre_effacee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la barre qui sert de repère, puis ajoute, enlève ou double.",
    tags: ["cm1", "graphique", "completer", "barre_manquante", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);
      const relation = randomChoice(["plus", "moins", "double"] as const);
      // Repère et écart ronds, la barre cherchée reste positive et distincte des autres.
      // 20/10/2026 : la barre repère se LIT sur l'axe gradué (pas de nombre écrit).
      // Repère sur une graduation, écart = un nombre entier de graduations.
      const pas = randomChoice([1, 2, 2, 5, 5, 10, 10]);
      let values: number[] = [];
      let ref = 0;
      let ecart = 0;
      let cible = 0;
      for (let essai = 0; essai < 100; essai++) {
        values = roundValues(3, pas, 1, 6);
        ref = values[randomInt(0, 2)];
        ecart = pas * randomInt(1, 3);
        cible = relation === "plus" ? ref + ecart : relation === "moins" ? ref - ecart : ref * 2;
        if (cible > 0 && !values.includes(cible)) break;
      }
      const refLabel = labels[values.indexOf(ref)];
      const missing = labels[3];
      const phrase =
        relation === "plus"
          ? `« ${missing} » a ${ecart} ${ctx.unit} de plus que « ${refLabel} ».`
          : relation === "moins"
            ? `« ${missing} » a ${ecart} ${ctx.unit} de moins que « ${refLabel} ».`
            : `« ${missing} » a deux fois plus ${de(ctx.unit)} que « ${refLabel} ».`;
      const question = randomChoice([
        `La barre « ${missing} » a été effacée. ${phrase} À quelle hauteur faut-il la tracer ?`,
        `Il manque la barre « ${missing} ». ${phrase} Quelle valeur faut-il dessiner ?`,
        `${phrase} Complète le graphique : combien pour « ${missing} » ?`,
      ]);
      const calcul =
        relation === "plus"
          ? `${ref} + ${ecart} = ${cible}`
          : relation === "moins"
            ? `${ref} − ${ecart} = ${cible}`
            : `${ref} × 2 = ${cible}`;
      const correct = String(cible);
      // Leurres : le repère lui-même, l'écart, le mauvais sens, et la graduation
      // voisine du repère (lu à côté) reportée dans le calcul.
      const voisin = ref + pas;
      const wrongs =
        relation === "double"
          ? leurres(cible, [ref, voisin * 2, ref + 2, cible + pas])
          : leurres(cible, [
              ref,
              ecart,
              relation === "plus" ? ref - ecart : ref + ecart,
              relation === "plus" ? voisin + ecart : voisin - ecart,
              cible + pas,
            ]);
      return {
        theme: ctx.theme,
        hint: "Lis d'abord la barre repère sur l'axe. Puis ajoute, enlève ou double.",
        text: `${ctx.intro} ${question}`,
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Compléter un graphique, c'est tracer la barre qui manque avec la bonne hauteur.",
          `${lectureAxe(refLabel, ref, pas)} Puis on ${relation === "plus" ? "ajoute" : relation === "moins" ? "enlève" : "double"}.`,
          `${calcul}.`,
          `La barre « ${missing} » doit monter jusqu'à ${cible}.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: ctx.title,
          data: makeData(labels.slice(0, 3), values),
          display: displayAxe(pas, ctx.unit),
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_completer_tpl_5_carreaux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque carreau vaut le même nombre : cherche combien de fois il tient dans la valeur.",
    tags: ["cm1", "graphique", "completer", "graduation", "template", "robuste", "canvas"],
    generate: () => {
      const pas = randomChoice([2, 5, 10]);
      const { ctx, labels, values } = tirerSituation(4, pas);
      const index = randomInt(0, labels.length - 1);
      const v = values[index];
      const carreaux = v / pas;
      const question = randomChoice([
        `Sur la feuille, un carreau vaut ${pas} ${ctx.unit}. Combien de carreaux faut-il colorier pour « ${labels[index]} » ?`,
        `Tom trace la barre « ${labels[index]} ». Un carreau = ${pas} ${ctx.unit}. Combien de carreaux de haut ?`,
        `Pour tracer « ${labels[index]} », chaque carreau compte pour ${pas}. Combien de carreaux faut-il ?`,
      ]);
      const correct = String(carreaux);
      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${question}`,
        format: "qcm",
        choices: makeChoices(correct, leurres(carreaux, [v, carreaux + 1, carreaux - 1, v + pas, v * pas])),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour tracer une barre, on compte combien de carreaux il faut.",
          `La valeur est ${v} et un carreau vaut ${pas} : on cherche combien de fois ${pas} dans ${v}.`,
          `${carreaux} × ${pas} = ${v}, donc ${v} ÷ ${pas} = ${carreaux}.`,
          `Il faut colorier ${carreaux} carreaux.`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: ctx.title,
          data: makeData(labels, values),
          display: { showLabels: true, showValues: true, highlightIndex: index },
        }),
      };
    },
  },

  // ============================================================
  // GRAPHIQUE_INTERPRETER
  // Comparer, trouver un maximum, minimum, écart, total
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_1_plus_grand",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "sport",
    text: "Quelle activité est la plus choisie ?",
    format: "qcm",
    choices: ["Football", "Danse", "Natation", "On ne peut pas savoir"],
    expected: ["Football"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation: exp(
      "Interpréter un graphique, c’est utiliser les données pour répondre.",
      "Pour trouver la catégorie la plus choisie, on cherche la plus grande valeur.",
      "Football : 16, Danse : 9, Natation : 12. La plus grande valeur est 16.",
      "L’activité la plus choisie est Football."
    ),
    tags: ["cm1", "graphique", "interpreter", "plus_grand", "qcm", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Activités choisies",
      data: [
        { label: "Football", value: 16 },
        { label: "Danse", value: 9 },
        { label: "Natation", value: 12 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 0,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_2_difference",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de livres de plus en BD qu’en romans ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compare 14 et 9.",
    explanation: exp(
      "Un écart se calcule avec une soustraction.",
      "On soustrait la plus petite valeur à la plus grande.",
      "14 - 9 = 5.",
      "Il y a 5 livres de plus en BD qu’en romans."
    ),
    tags: ["cm1", "graphique", "interpreter", "difference", "short", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Livres empruntés",
      data: [
        { label: "Romans", value: 9 },
        { label: "BD", value: 14 },
        { label: "Documentaires", value: 11 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 1,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_graphique_interpreter_tpl_1_plus_grand",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la barre la plus haute ou la plus grande valeur.",
    tags: ["cm1", "graphique", "interpreter", "plus_grand", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);
      const values = shuffle([
        randomInt(5, 10),
        randomInt(11, 15),
        randomInt(16, 20),
        randomInt(21, 28),
      ]);

      const index = maxIndex(values);
      const correct = labels[index];

      return {
        theme: ctx.theme,
        text: "Quelle catégorie a la plus grande valeur ?",
        format: "qcm",
        choices: makeChoices(correct, labels.filter((l) => l !== correct)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver la plus grande catégorie, on compare les valeurs.",
          "On cherche le nombre le plus grand.",
          `Le plus grand nombre est ${values[index]}, pour ${correct}.`,
          `La réponse est ${correct}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: index,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_interpreter_tpl_2_plus_petit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la barre la plus basse ou la plus petite valeur.",
    tags: ["cm1", "graphique", "interpreter", "plus_petit", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);
      const values = shuffle([
        randomInt(4, 8),
        randomInt(9, 13),
        randomInt(14, 18),
        randomInt(19, 24),
      ]);

      const index = minIndex(values);
      const correct = labels[index];

      return {
        theme: ctx.theme,
        text: "Quelle catégorie a la plus petite valeur ?",
        format: "qcm",
        choices: makeChoices(correct, labels.filter((l) => l !== correct)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver la plus petite catégorie, on compare les valeurs.",
          "On cherche le nombre le plus petit.",
          `Le plus petit nombre est ${values[index]}, pour ${correct}.`,
          `La réponse est ${correct}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
            highlightIndex: index,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_interpreter_tpl_3_difference",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour trouver une différence, fais une soustraction.",
    tags: ["cm1", "graphique", "interpreter", "difference", "template", "robuste", "canvas"],
    generate: () => {
      // Une fois sur deux, les deux valeurs se LISENT sur l'axe gradué.
      const surAxe = randomChoice([true, false]);
      let ctx = randomContext();
      let labels = shuffle(ctx.labels).slice(0, 3);
      let pas = 1;
      let small: number;
      let big: number;
      let values: number[];
      if (surAxe) {
        const s = tirerSituationAxe(3);
        ({ ctx, labels, pas } = s);
        const [a, b, c] = s.values;
        small = Math.min(a, b);
        big = Math.max(a, b);
        values = [small, big, c];
      } else {
        small = randomInt(6, 15);
        big = small + randomInt(3, 12);
        let other = randomInt(5, 25);
        while (other === small || other === big) other = randomInt(5, 25);
        values = [small, big, other];
      }
      const diff = big - small;
      const lecture = surAxe
        ? `${lectureAxe(labels[1], big, pas)} ${lectureAxe(labels[0], small, pas)} `
        : "";

      return {
        theme: ctx.theme,
        ...(surAxe ? { hint: "Lis les deux barres sur l'axe, puis fais une soustraction." } : {}),
        text: `${ctx.intro} ${randomChoice([
          `Quelle est la différence entre « ${labels[1]} » et « ${labels[0]} » ?`,
          `Combien ${de(ctx.unit)} de plus pour « ${labels[1]} » que pour « ${labels[0]} » ?`,
          `Combien ${de(ctx.unit)} de moins pour « ${labels[0]} » que pour « ${labels[1]} » ?`,
          `Quel écart entre la barre « ${labels[1]} » et la barre « ${labels[0]} » ?`,
        ])}`,
        format: "short",
        expected: [String(diff)],
        comparator: "number_equal",
        explanation: exp(
          "Une différence est l’écart entre deux valeurs.",
          surAxe
            ? "On lit les deux barres sur l'axe, puis on soustrait la plus petite valeur à la plus grande."
            : "On soustrait la plus petite valeur à la plus grande.",
          `${lecture}${big} - ${small} = ${diff}.`,
          `La différence est ${diff}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: surAxe
            ? displayAxe(pas, ctx.unit)
            : {
                showLabels: true,
                showValues: true,
              },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_interpreter_tpl_4_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les valeurs du graphique.",
    tags: ["cm1", "graphique", "interpreter", "total", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);
      const values = uniqueValues(labels.length, 4, 18);
      const result = total(values);

      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${randomChoice([
          `Combien y a-t-il ${de(ctx.unit)} en tout ?`,
          `Quel est le nombre total ${de(ctx.unit)} ?`,
          `Si on réunit toutes les catégories, combien ${de(ctx.unit)} ?`,
        ])}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Le total d’un graphique est la somme de toutes les valeurs.",
          "On additionne les nombres représentés.",
          `${values.join(" + ")} = ${result}.`,
          `Il y a ${result} ${ctx.unit} en tout.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_interpreter_tpl_5_classement",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Range les valeurs de la plus grande à la plus petite.",
    tags: ["cm1", "graphique", "interpreter", "classement", "template", "robuste", "canvas"],
    generate: () => {
      const { ctx, labels, values } = tirerSituation(4);
      const ordre = labels.map((_, i) => i).sort((a, b) => values[b] - values[a]);
      const rang = randomChoice([1, 2] as const); // 2e ou 3e place
      const cible = ordre[rang];
      const correct = labels[cible];
      const nom = rang === 1 ? "deuxième" : "troisième";
      const question = randomChoice([
        `On range les barres de la plus haute à la plus basse. Quelle catégorie est ${nom} ?`,
        `Quelle catégorie arrive en ${nom} position, de la plus grande valeur à la plus petite ?`,
        `Sur le podium des valeurs, qui est ${nom} ?`,
      ]);
      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${question}`,
        format: "qcm",
        choices: makeChoices(correct, labels.filter((_, i) => i !== cible)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Interpréter un graphique, c'est comparer les barres entre elles.",
          "On range les valeurs de la plus grande à la plus petite.",
          ordre.map((i) => `${labels[i]} (${values[i]})`).join(" > ") + ".",
          `La ${nom} est « ${correct} ».`
        ),
        canvas: statGraphCanvas({
          graphType: randomChoice<GraphType>(["barres", "batons"]),
          title: ctx.title,
          data: makeData(labels, values),
          display: { showLabels: true, showValues: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_interpreter_tpl_6_deux_ensemble",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les deux barres, puis compare avec la troisième.",
    tags: ["cm1", "graphique", "interpreter", "comparer_somme", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 3);
      const pas = randomChoice([1, 2, 5]);
      // Une fois sur deux « plus », une fois sur deux « moins » : la réponse ne se devine pas.
      const veutPlus = randomChoice([true, false]);
      let values: number[] = [];
      for (let essai = 0; essai < 200; essai++) {
        values = roundValues(3, pas, 2, pas === 1 ? 30 : pas === 2 ? 15 : 10);
        const s = values[0] + values[1];
        if (s !== values[2] && s > values[2] === veutPlus) break;
      }
      const [a, b, c] = values;
      const somme = a + b;
      const plus = somme > c;
      const correct = plus ? "plus" : "moins";
      const question = randomChoice([
        `Ensemble, les barres « ${labels[0]} » et « ${labels[1]} » font-elles plus ou moins que la barre « ${labels[2]} » ?`,
        `Si on réunit « ${labels[0]} » et « ${labels[1]} », obtient-on plus ou moins que « ${labels[2]} » ?`,
        `« ${labels[0]} » + « ${labels[1]} » : est-ce plus ou moins que « ${labels[2]} » ?`,
      ]);
      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${question}`,
        format: "qcm",
        choices: makeChoices(correct, [plus ? "moins" : "plus", "autant"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On peut comparer deux barres réunies avec une autre barre.",
          `On additionne « ${labels[0]} » et « ${labels[1]} », puis on compare avec « ${labels[2]} ».`,
          `${a} + ${b} = ${somme}, et ${somme} ${plus ? ">" : "<"} ${c}.`,
          `Ensemble, les deux barres font ${correct} que « ${labels[2]} ».`
        ),
        canvas: statGraphCanvas({
          graphType: "barres",
          title: ctx.title,
          data: makeData(labels, values),
          display: { showLabels: true, showValues: true },
        }),
      };
    },
  },

  // ============================================================
  // GRAPHIQUE_DEFI
  // Problèmes courts à 2 étapes maximum
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_1_total_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché, combien de fruits ont été vendus en tout ?",
    format: "short",
    expected: ["55"],
    comparator: "number_equal",
    hint: "Additionne les trois valeurs du graphique.",
    explanation: exp(
      "Un défi de graphique peut demander d’utiliser plusieurs valeurs.",
      "Ici, on additionne toutes les ventes.",
      "18 + 12 + 25 = 55.",
      "55 fruits ont été vendus en tout."
    ),
    tags: ["cm1", "graphique", "defi", "total", "reunion", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Fruits vendus au marché",
      data: [
        { label: "Mangues", value: 18 },
        { label: "Ananas", value: 12 },
        { label: "Bananes", value: 25 },
      ],
      display: {
        showLabels: true,
        showValues: true,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_2_difference_sports",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 3,
    theme: "sport",
    text: "Combien d’élèves de plus ont choisi le football que la danse ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Compare 16 et 9.",
    explanation: exp(
      "Pour comparer deux catégories, on calcule leur différence.",
      "On soustrait la plus petite valeur à la plus grande.",
      "16 - 9 = 7.",
      "Il y a 7 élèves de plus en football qu’en danse."
    ),
    tags: ["cm1", "graphique", "defi", "difference", "sport", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Activités sportives",
      data: [
        { label: "Football", value: 16 },
        { label: "Danse", value: 9 },
        { label: "Natation", value: 12 },
      ],
      display: {
        showLabels: true,
        showValues: true,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_3_plus_grand_et_ecart",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la différence entre la catégorie la plus grande et la plus petite ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Cherche d’abord le plus grand nombre et le plus petit nombre.",
    explanation: exp(
      "Ce défi demande deux étapes : repérer puis calculer.",
      "On cherche le plus grand nombre et le plus petit nombre.",
      "Albums : 6, Romans : 9, Documentaires : 11, BD : 18. Différence : 18 - 6 = 12.",
      "La différence est 12."
    ),
    tags: ["cm1", "graphique", "defi", "ecart_extremes", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Livres empruntés",
      data: [
        { label: "Romans", value: 9 },
        { label: "BD", value: 18 },
        { label: "Documentaires", value: 11 },
        { label: "Albums", value: 6 },
      ],
      display: {
        showLabels: true,
        showValues: true,
      },
    }),
  },

  {
    kind: "template",
    id: "cm1_graphique_defi_tpl_1_total_general",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les valeurs.",
    tags: ["cm1", "graphique", "defi", "total_general", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 4);
      const values = uniqueValues(labels.length, 4, 20);
      const result = total(values);

      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${randomChoice([
          `Combien ${de(ctx.unit)} au total sur les quatre barres ?`,
          `Quel est le total ${de(ctx.unit)} de ce graphique ?`,
          `Elle veut le total pour son rapport : combien ${de(ctx.unit)} ?`,
          `Additionne toutes les barres : combien ${de(ctx.unit)} en tout ?`,
        ])}`,
        format: "short",
        expected: [String(result)],
        comparator: "number_equal",
        explanation: exp(
          "Un total regroupe toutes les valeurs.",
          "On additionne toutes les catégories du graphique.",
          `${values.join(" + ")} = ${result}.`,
          `Le total est ${result}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: {
            showLabels: true,
            showValues: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_defi_tpl_2_ecart_extremes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche le plus grand nombre, le plus petit nombre, puis soustrais.",
    tags: ["cm1", "graphique", "defi", "ecart_extremes", "template", "robuste", "canvas"],
    generate: () => {
      // Une fois sur deux, les valeurs se LISENT sur l'axe gradué.
      const surAxe = randomChoice([true, false]);
      const axe = tirerSituationAxe(4);
      const ctx = surAxe ? axe.ctx : randomContext();
      const labels = surAxe ? axe.labels : shuffle(ctx.labels).slice(0, 4);
      const values = surAxe
        ? axe.values
        : shuffle([randomInt(4, 8), randomInt(9, 13), randomInt(14, 18), randomInt(19, 25)]);

      const max = Math.max(...values);
      const min = Math.min(...values);
      const diff = max - min;
      const lecture = surAxe
        ? `${lectureAxe(labels[values.indexOf(max)], max, axe.pas)} ${lectureAxe(labels[values.indexOf(min)], min, axe.pas)} `
        : "";

      return {
        theme: ctx.theme,
        ...(surAxe ? { hint: "Lis la barre la plus haute et la plus basse sur l'axe, puis soustrais." } : {}),
        text: `${ctx.intro} ${randomChoice([
          "Quelle est la différence entre la plus grande valeur et la plus petite valeur ?",
          `Combien ${de(ctx.unit)} d'écart entre la barre la plus haute et la plus basse ?`,
          "De combien la plus haute barre dépasse-t-elle la plus basse ?",
        ])}`,
        format: "short",
        expected: [String(diff)],
        comparator: "number_equal",
        explanation: exp(
          "La différence entre les extrêmes se calcule avec une soustraction.",
          "On repère d’abord la plus grande valeur et la plus petite valeur.",
          `${lecture}${max} - ${min} = ${diff}.`,
          `La différence est ${diff}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: surAxe
            ? displayAxe(axe.pas, ctx.unit)
            : {
                showLabels: true,
                showValues: true,
              },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_defi_tpl_3_comparer_deux_categories",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les deux valeurs demandées.",
    tags: ["cm1", "graphique", "defi", "comparer_categories", "template", "robuste", "canvas"],
    generate: () => {
      // Une fois sur deux, les deux barres se LISENT sur l'axe gradué.
      const surAxe = randomChoice([true, false]);
      const axe = tirerSituationAxe(4);
      const ctx = surAxe ? axe.ctx : randomContext();
      const labels = surAxe ? axe.labels : shuffle(ctx.labels).slice(0, 4);
      let a: number;
      let b: number;
      let values: number[];
      if (surAxe) {
        const [x, y, c, d] = axe.values;
        a = Math.min(x, y);
        b = Math.max(x, y);
        values = [a, b, c, d];
      } else {
        a = randomInt(8, 18);
        b = a + randomInt(3, 10);
        values = [a, b, randomInt(5, 25), randomInt(5, 25)];
      }
      const diff = b - a;
      const lecture = surAxe
        ? `${lectureAxe(labels[1], b, axe.pas)} ${lectureAxe(labels[0], a, axe.pas)} `
        : "";

      return {
        theme: ctx.theme,
        ...(surAxe ? { hint: "Lis les deux barres sur l'axe, puis fais une soustraction." } : {}),
        text: `${ctx.intro} ${randomChoice([
          `Combien y a-t-il ${de(ctx.unit)} de plus pour « ${labels[1]} » que pour « ${labels[0]} » ?`,
          `« ${labels[1]} » dépasse « ${labels[0]} » de combien ?`,
          `Combien faudrait-il ajouter à « ${labels[0]} » pour égaler « ${labels[1]} » ?`,
        ])}`,
        format: "short",
        expected: [String(diff)],
        comparator: "number_equal",
        explanation: exp(
          "Pour savoir combien il y a de plus, on calcule une différence.",
          "On soustrait la plus petite valeur à la plus grande.",
          `${lecture}${b} - ${a} = ${diff}.`,
          `Il y a ${diff} de plus pour ${labels[1]}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: surAxe
            ? displayAxe(axe.pas, ctx.unit)
            : {
                showLabels: true,
                showValues: true,
              },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_defi_tpl_4_objectif",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d'abord le total, puis cherche ce qui manque pour atteindre l'objectif.",
    tags: ["cm1", "graphique", "defi", "objectif", "deux_etapes", "template", "robuste", "canvas"],
    generate: () => {
      const { ctx, labels, values } = tirerSituation(randomChoice([3, 4]), randomChoice([2, 5]));
      const somme = total(values);
      const manque = randomChoice([5, 10, 15, 20, 25, 30]);
      const objectif = somme + manque;
      const question = randomChoice([
        `L'objectif était ${objectif} ${ctx.unit}. Combien en manque-t-il ?`,
        `Il en faudrait ${objectif} en tout. Combien manque-t-il encore ?`,
        `Pour atteindre ${objectif} ${ctx.unit}, combien faut-il en ajouter ?`,
      ]);
      const correct = String(manque);
      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${question}`,
        format: "qcm",
        choices: makeChoices(correct, leurres(manque, [somme, objectif, manque + 10, objectif - values[0]])),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un défi en deux étapes : d'abord le total, puis ce qui manque.",
          "On additionne toutes les barres, puis on soustrait ce total à l'objectif.",
          `${values.join(" + ")} = ${somme} ; ${objectif} − ${somme} = ${manque}.`,
          `Il manque ${manque} ${ctx.unit}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: { showLabels: true, showValues: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_defi_tpl_5_deux_contre_une",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les deux barres, puis soustrais la troisième.",
    tags: ["cm1", "graphique", "defi", "somme_puis_difference", "template", "robuste", "canvas"],
    generate: () => {
      const ctx = randomContext();
      const labels = shuffle(ctx.labels).slice(0, 3);
      const pas = randomChoice([1, 2, 5]);
      const maxK = pas === 1 ? 25 : pas === 2 ? 12 : 8;
      let values: number[] = [];
      for (let essai = 0; essai < 200; essai++) {
        values = roundValues(3, pas, 2, maxK);
        if (values[0] + values[1] > values[2]) break;
      }
      const [a, b, c] = values;
      const res = a + b - c;
      const question = randomChoice([
        `Ensemble, « ${labels[0]} » et « ${labels[1]} » font combien de plus que « ${labels[2]} » ?`,
        `On réunit « ${labels[0]} » et « ${labels[1]} ». Combien de plus que « ${labels[2]} » ?`,
        `De combien les barres « ${labels[0]} » et « ${labels[1]} » réunies dépassent-elles « ${labels[2]} » ?`,
      ]);
      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: exp(
          "Un défi en deux étapes : une addition, puis une soustraction.",
          `On additionne « ${labels[0]} » et « ${labels[1]} », puis on enlève « ${labels[2]} ».`,
          `${a} + ${b} = ${a + b} ; ${a + b} − ${c} = ${res}.`,
          `Ensemble, les deux barres font ${res} de plus.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: { showLabels: true, showValues: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_defi_tpl_6_deux_groupes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Fais le total de chaque groupe, puis compare les deux totaux.",
    tags: ["cm1", "graphique", "defi", "deux_groupes", "template", "robuste", "canvas"],
    generate: () => {
      // Pas d'égalité entre les deux groupes : on retire tant qu'ils sont égaux.
      let tirage = tirerSituation(4, randomChoice([1, 2, 5]));
      for (let essai = 0; essai < 50 && tirage.values[0] + tirage.values[1] === tirage.values[2] + tirage.values[3]; essai++) {
        tirage = tirerSituation(4, randomChoice([1, 2, 5]));
      }
      const { ctx, labels, values } = tirage;
      const s1 = values[0] + values[1];
      const s2 = values[2] + values[3];
      const grand = Math.max(s1, s2);
      const petit = Math.min(s1, s2);
      const res = grand - petit;
      const A = `« ${labels[0]} » et « ${labels[1]} »`;
      const B = `« ${labels[2]} » et « ${labels[3]} »`;
      const question = randomChoice([
        `On forme deux groupes : ${A}, puis ${B}. Quel écart entre les deux groupes ?`,
        `Groupe 1 : ${A}. Groupe 2 : ${B}. Combien ${de(ctx.unit)} d'écart entre les deux ?`,
        `Compare ${A} réunis avec ${B} réunis. Quelle est la différence ?`,
      ]);
      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: exp(
          "Un défi en trois calculs : deux totaux, puis une différence.",
          "On additionne chaque groupe, puis on soustrait le plus petit total au plus grand.",
          `${values[0]} + ${values[1]} = ${s1} ; ${values[2]} + ${values[3]} = ${s2} ; ${grand} − ${petit} = ${res}.`,
          `L'écart entre les deux groupes est ${res}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: { showLabels: true, showValues: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_graphique_defi_tpl_7_ajout_chaque_barre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Fais le total actuel, puis ajoute le même nombre pour chaque barre.",
    tags: ["cm1", "graphique", "defi", "ajout_constant", "template", "robuste", "canvas"],
    generate: () => {
      const n = randomChoice([3, 4]);
      const { ctx, labels, values } = tirerSituation(n, randomChoice([2, 5]));
      const ajout = randomChoice([2, 3, 5, 10]);
      const somme = total(values);
      const res = somme + n * ajout;
      const question = randomChoice([
        `La semaine suivante, chaque barre gagne ${ajout}. Quel sera le nouveau total ?`,
        `On ajoute ${ajout} ${ctx.unit} à chaque catégorie. Combien en tout, après l'ajout ?`,
        `Chaque barre monte de ${ajout}. Combien ${de(ctx.unit)} au total ensuite ?`,
      ]);
      return {
        theme: ctx.theme,
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: exp(
          "Un défi en deux étapes : le total, puis l'ajout sur chaque barre.",
          `Il y a ${n} barres : on ajoute ${n} fois ${ajout}.`,
          `${values.join(" + ")} = ${somme} ; ${n} × ${ajout} = ${n * ajout} ; ${somme} + ${n * ajout} = ${res}.`,
          `Le nouveau total est ${res}.`
        ),
        canvas: statGraphCanvas({
          graphType: randomGraphType(),
          title: ctx.title,
          data: makeData(labels, values),
          display: { showLabels: true, showValues: true },
        }),
      };
    },
  },

  // ============================================================
  // TOP-UP — GRAPHIQUE_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_4_basket",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "sport",
    text: "L'entraîneur du club note les activités. Lis l'axe : combien d’élèves font du basket ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Pars du haut de la barre Basket. Suis la ligne jusqu'à l'axe.",
    explanation: exp(
      "Un graphique associe chaque catégorie à une hauteur de barre. L'axe gradué donne cette hauteur.",
      "On part du haut de la barre Basket, on suit la ligne jusqu'à l'axe.",
      "Une graduation vaut 2. La barre s'arrête sur la graduation 12 (pas 10, la graduation d'en dessous).",
      "12 élèves font du basket."
    ),
    tags: ["cm1", "graphique", "lire", "sport", "short", "canvas", "axe_gradue"],
    // 21/10/2026 : 14 demandait 7 graduations ; au CM1, 6 au plus (12 = 6 × 2).
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Activités sportives",
      data: [
        { label: "Football", value: 8 },
        { label: "Danse", value: 4 },
        { label: "Natation", value: 10 },
        { label: "Basket", value: 12 },
      ],
      display: displayAxe(2, "élèves", 3),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_5_tomates",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Le jardinier de l'école compte ses plants. Lis l'axe : combien de plants de tomates ?",
    format: "qcm",
    choices: ["10", "8", "12", "2"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Pars du haut de la barre Tomates. Suis la ligne jusqu'à l'axe.",
    explanation: exp(
      "Chaque barre représente une catégorie du jardin. L'axe gradué donne sa hauteur.",
      "On part du haut de la barre Tomates, on suit la ligne jusqu'à l'axe.",
      "Une graduation vaut 2. La barre s'arrête sur la graduation 10. Attention : 2, c'est le pas, pas la valeur.",
      "Il y a 10 plants de tomates."
    ),
    tags: ["cm1", "graphique", "lire", "qcm", "canvas", "axe_gradue"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Jardin de l’école",
      data: [
        { label: "Tomates", value: 10 },
        { label: "Salades", value: 6 },
        { label: "Carottes", value: 12 },
        { label: "Fleurs", value: 4 },
      ],
      display: displayAxe(2, "plants", 0),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_6_sandwichs",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Pour la randonnée, combien de sandwichs ont été préparés ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Lis la valeur de la barre Sandwichs.",
    explanation: exp(
      "Un graphique permet de lire vite une quantité.",
      "On repère la barre Sandwichs.",
      "La barre Sandwichs vaut 9.",
      "9 sandwichs ont été préparés."
    ),
    tags: ["cm1", "graphique", "lire", "reunion", "short", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Randonnée à La Réunion",
      data: [
        { label: "Eau", value: 8 },
        { label: "Fruits", value: 6 },
        { label: "Sandwichs", value: 9 },
        { label: "Casquettes", value: 4 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 2 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_lire_fixed_7_camembert_equipe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le diagramme, combien de points a marqués l’Équipe B ?",
    format: "qcm",
    choices: ["15", "10", "8", "33"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "Repère la part de l’Équipe B.",
    explanation: exp(
      "Un diagramme circulaire représente chaque équipe par une part.",
      "On repère la part de l’Équipe B et sa valeur.",
      "La part de l’Équipe B vaut 15.",
      "L’Équipe B a marqué 15 points."
    ),
    tags: ["cm1", "graphique", "lire", "camembert", "qcm", "canvas"],
    canvas: statGraphCanvas({
      graphType: "camembert",
      title: "Défis de calcul",
      data: [
        { label: "Équipe A", value: 10 },
        { label: "Équipe B", value: 15 },
        { label: "Équipe C", value: 8 },
      ],
      display: { showLabels: true, showValues: true, valeursParts: true, highlightIndex: 1 },
    }),
  },

  // ============================================================
  // TOP-UP — GRAPHIQUE_COMPLETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_3_total_jardin",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Il y a 10 tomates, 7 salades et 12 carottes. Quel est le total de plants ?",
    format: "short",
    expected: ["29"],
    comparator: "number_equal",
    hint: "Additionne les trois valeurs.",
    explanation: exp(
      "Un total regroupe toutes les valeurs.",
      "On additionne les plants de chaque catégorie.",
      "10 + 7 + 12 = 29.",
      "Le total est 29 plants."
    ),
    tags: ["cm1", "graphique", "completer", "total", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Jardin de l’école",
      data: [
        { label: "Tomates", value: 10 },
        { label: "Salades", value: 7 },
        { label: "Carottes", value: 12 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_4_bananes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "reunion",
    text: "Le total est 40 fruits. Il y a 15 mangues et 12 ananas. Quelle est la valeur des bananes ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Additionne les fruits connus, puis complète jusqu’à 40.",
    explanation: exp(
      "On retrouve une valeur manquante grâce au total.",
      "On additionne les valeurs connues, puis on soustrait au total.",
      "15 + 12 = 27, puis 40 - 27 = 13.",
      "La barre Bananes vaut 13."
    ),
    tags: ["cm1", "graphique", "completer", "valeur_manquante", "reunion", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Fruits vendus",
      data: [
        { label: "Mangues", value: 15 },
        { label: "Ananas", value: 12 },
        { label: "Bananes", value: 13 },
      ],
      display: { showLabels: true, showValues: false, highlightIndex: 2 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_5_complement_romans",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 2,
    theme: "neutral",
    text: "La barre Romans vaut 9. Combien faut-il ajouter pour atteindre 15 ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cherche ce qui manque entre 9 et 15.",
    explanation: exp(
      "Compléter une barre, c’est chercher ce qui manque.",
      "On soustrait la valeur actuelle à la valeur visée.",
      "15 - 9 = 6.",
      "Il faut ajouter 6."
    ),
    tags: ["cm1", "graphique", "completer", "complement", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Livres empruntés",
      data: [
        { label: "Romans", value: 9 },
        { label: "BD", value: 14 },
        { label: "Albums", value: 6 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 0 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_6_total_quatre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "sport",
    text: "12 élèves font du football, 8 de la danse, 10 de la natation et 14 du basket. Quel est le total ?",
    format: "short",
    expected: ["44"],
    comparator: "number_equal",
    hint: "Additionne les quatre valeurs.",
    explanation: exp(
      "Un total regroupe toutes les valeurs.",
      "On additionne les élèves de chaque activité.",
      "12 + 8 + 10 + 14 = 44.",
      "Le total est 44 élèves."
    ),
    tags: ["cm1", "graphique", "completer", "total", "sport", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Activités sportives",
      data: [
        { label: "Football", value: 12 },
        { label: "Danse", value: 8 },
        { label: "Natation", value: 10 },
        { label: "Basket", value: 14 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_completer_fixed_7_manquante_eau",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_completer",
    difficulty: 3,
    theme: "reunion",
    text: "Le total est 27 objets. Les fruits, sandwichs et casquettes font 19 en tout. Quelle est la valeur de l’eau ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Soustrais la somme connue au total.",
    explanation: exp(
      "On retrouve une valeur manquante grâce au total.",
      "On soustrait la somme des valeurs connues au total.",
      "27 - 19 = 8.",
      "La barre Eau vaut 8."
    ),
    tags: ["cm1", "graphique", "completer", "valeur_manquante", "reunion", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Randonnée à La Réunion",
      data: [
        { label: "Eau", value: 8 },
        { label: "Fruits", value: 6 },
        { label: "Sandwichs", value: 9 },
        { label: "Casquettes", value: 4 },
      ],
      display: { showLabels: true, showValues: false, highlightIndex: 0 },
    }),
  },

  // ============================================================
  // TOP-UP — GRAPHIQUE_INTERPRETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_3_plus_grand_jardin",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quel légume est le plus cultivé dans le jardin ?",
    format: "qcm",
    choices: ["Carottes", "Tomates", "Salades", "Fleurs"],
    expected: ["Carottes"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation: exp(
      "Interpréter un graphique, c’est comparer les valeurs.",
      "Pour le plus cultivé, on cherche la plus grande barre.",
      "Tomates : 10, Salades : 7, Carottes : 12, Fleurs : 5. La plus grande est 12.",
      "Le légume le plus cultivé est la carotte."
    ),
    tags: ["cm1", "graphique", "interpreter", "plus_grand", "qcm", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Jardin de l’école",
      data: [
        { label: "Tomates", value: 10 },
        { label: "Salades", value: 7 },
        { label: "Carottes", value: 12 },
        { label: "Fleurs", value: 5 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 2 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_4_plus_petit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "De quel objet a-t-on emporté le moins pour la randonnée ?",
    format: "qcm",
    choices: ["Casquettes", "Eau", "Fruits", "Sandwichs"],
    expected: ["Casquettes"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus basse.",
    explanation: exp(
      "Pour le moins emporté, on cherche la plus petite valeur.",
      "On compare les valeurs des barres.",
      "Eau : 8, Fruits : 6, Sandwichs : 9, Casquettes : 4. La plus petite est 4.",
      "On a emporté le moins de casquettes."
    ),
    tags: ["cm1", "graphique", "interpreter", "plus_petit", "reunion", "qcm", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Randonnée à La Réunion",
      data: [
        { label: "Eau", value: 8 },
        { label: "Fruits", value: 6 },
        { label: "Sandwichs", value: 9 },
        { label: "Casquettes", value: 4 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 3 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_5_difference_legumes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Combien y a-t-il de carottes de plus que de salades ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compare 12 et 7.",
    explanation: exp(
      "Un écart se calcule avec une soustraction.",
      "On soustrait la plus petite valeur à la plus grande.",
      "12 - 7 = 5.",
      "Il y a 5 carottes de plus que de salades."
    ),
    tags: ["cm1", "graphique", "interpreter", "difference", "short", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Jardin de l’école",
      data: [
        { label: "Tomates", value: 10 },
        { label: "Salades", value: 7 },
        { label: "Carottes", value: 12 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 2 },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_interpreter_fixed_6_total_sports",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_interpreter",
    difficulty: 3,
    theme: "sport",
    text: "Combien d’élèves ont été interrogés en tout ?",
    format: "short",
    expected: ["44"],
    comparator: "number_equal",
    hint: "Additionne toutes les barres.",
    explanation: exp(
      "Le total d’un graphique est la somme de toutes les valeurs.",
      "On additionne les barres.",
      "12 + 8 + 10 + 14 = 44.",
      "44 élèves ont été interrogés en tout."
    ),
    tags: ["cm1", "graphique", "interpreter", "total", "sport", "short", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Activités sportives",
      data: [
        { label: "Football", value: 12 },
        { label: "Danse", value: 8 },
        { label: "Natation", value: 10 },
        { label: "Basket", value: 14 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },

  // ============================================================
  // TOP-UP — GRAPHIQUE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_4_total_jardin",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de plants y a-t-il en tout dans le jardin ?",
    format: "short",
    expected: ["34"],
    comparator: "number_equal",
    hint: "Additionne les quatre barres.",
    explanation: exp(
      "Un défi peut demander d’additionner toutes les valeurs.",
      "On additionne tous les plants.",
      "10 + 7 + 12 + 5 = 34.",
      "Il y a 34 plants en tout."
    ),
    tags: ["cm1", "graphique", "defi", "total_general", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Jardin de l’école",
      data: [
        { label: "Tomates", value: 10 },
        { label: "Salades", value: 7 },
        { label: "Carottes", value: 12 },
        { label: "Fleurs", value: 5 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_5_ecart_extremes_rando",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Quelle est la différence entre l’objet le plus emporté et le moins emporté ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Cherche le plus grand et le plus petit nombre, puis soustrais.",
    explanation: exp(
      "Ce défi demande deux étapes : repérer puis calculer.",
      "On cherche la plus grande valeur et la plus petite.",
      "Sandwichs : 9 (max), Casquettes : 4 (min). Différence : 9 - 4 = 5.",
      "La différence est 5."
    ),
    tags: ["cm1", "graphique", "defi", "ecart_extremes", "reunion", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      title: "Randonnée à La Réunion",
      data: [
        { label: "Eau", value: 8 },
        { label: "Fruits", value: 6 },
        { label: "Sandwichs", value: 9 },
        { label: "Casquettes", value: 4 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_6_comparer_equipes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de points l’Équipe B a-t-elle de plus que l’Équipe C ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Compare les points de l’Équipe B et de l’Équipe C.",
    explanation: exp(
      "Pour comparer deux équipes, on calcule leur différence.",
      "On soustrait la plus petite valeur à la plus grande.",
      "Équipe B : 15, Équipe C : 8. 15 - 8 = 7.",
      "L’Équipe B a 7 points de plus."
    ),
    tags: ["cm1", "graphique", "defi", "comparer_categories", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Défis de calcul",
      data: [
        { label: "Équipe A", value: 10 },
        { label: "Équipe B", value: 15 },
        { label: "Équipe C", value: 8 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },

  {
    kind: "fixed",
    id: "cm1_graphique_defi_fixed_7_deux_etapes_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "graphique",
    microId: "graphique_defi",
    difficulty: 4,
    theme: "reunion",
    text: "On a vendu 18 mangues et 12 ananas le matin, puis 25 bananes l’après-midi. Combien de fruits en tout ?",
    format: "short",
    expected: ["55"],
    comparator: "number_equal",
    hint: "Additionne toutes les valeurs.",
    explanation: exp(
      "Un défi peut combiner plusieurs valeurs du graphique.",
      "On additionne les ventes du matin et de l’après-midi.",
      "18 + 12 + 25 = 55.",
      "55 fruits ont été vendus en tout."
    ),
    tags: ["cm1", "graphique", "defi", "total", "reunion", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Fruits vendus au marché",
      data: [
        { label: "Mangues", value: 18 },
        { label: "Ananas", value: 12 },
        { label: "Bananes", value: 25 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },
];