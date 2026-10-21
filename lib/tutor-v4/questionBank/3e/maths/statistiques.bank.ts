// lib/tutor-v4/question-banks/maths/3e/statistiques.bank.ts

import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  DifficultyLevel,
  StatGraphCanvasData,
  TableauDonneesCanvasData,
} from "@/lib/tutor-v4/types";

/* =========================================================================
   ⛔⛔ 21/10/2026 — LE COACH DE STATISTIQUES DE 3e, RÉÉCRIT EN GÉNÉRATEURS
   =========================================================================
   Mesure de départ (scripts/mesurer-squelettes-coach.ts 3e stat_statistique) :
   8 à 22 squelettes d'énoncé par micro, jusqu'à 18 répétitions sur 20. Les
   gabarits changeaient les NOMBRES (« catégorie A, B, C ») et gardaient la
   PHRASE ; plusieurs étoiles ne vivaient que de figé.

   Chaque gabarit compose une SITUATION tirée d'une table, portée par un
   MÉTIER (météorologue, ingénieur du son, biologiste marine, urgentiste,
   sociologue, apiculteur…) × une TOURNURE. Quatre tables :
     SERIES      une mesure par individu (températures, tailles, durées…)
     EFFECTIFS   une valeur entière comptée avec ses effectifs (tableau)
     ENQUETES    des catégories (qualitatif), avec deux groupes pour les
                 tableaux à double entrée
     COURBES     douze mois d'une grandeur (lecture d'une courbe)
   Les nombres sont tirés pour que les calculs TOMBENT JUSTE (moyennes
   entières ou au dixième, fréquences sur des totaux ronds) et restent
   plausibles pour le métier.

   Niveau 3e (révision de la 4e + approfondissement) : moyenne pondérée par
   des effectifs ou des coefficients, médiane d'une série à effectifs
   (effectifs cumulés), fréquences en %, comparer deux séries, moyenne tirée
   par une valeur extrême, axe tronqué.

   ⛔ Division : « ÷ », jamais de barre entre deux nombres (les élèves ne
   lisent pas 12/30 comme 12 ÷ 30). Les décimales s'écrivent à la française.
   ⛔ QCM : jamais deux propositions de même valeur (choixValeurs).
========================================================================= */

type Q = TutorGeneratedQuestionV4;

function rnd(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function sample<T>(arr: readonly T[], k: number): T[] {
  return shuffle(arr).slice(0, k);
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const somme = (xs: number[]) => xs.reduce((s, v) => s + v, 0);
const tri = (xs: number[]) => [...xs].sort((a, b) => a - b);
const r2 = (x: number) => Math.round(x * 100) / 100;
/** Un nombre au plus au dixième, sans arrondi caché. */
const auDixieme = (x: number) => Math.abs(x * 10 - Math.round(x * 10)) < 1e-9;

function medianeDe(xs: number[]): number {
  const s = tri(xs);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}

/** 8500 → « 8 500 », 12.5 → « 12,5 », -3 → « -3 ». L'élève lit des nombres français. */
function fr(n: number): string {
  const r = r2(n);
  const [e, d] = String(Math.abs(r)).split(".");
  return (r < 0 ? "-" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
}
const liste = (xs: number[]) => xs.map(fr).join(" ; ");
const ieme = (k: number) => (k === 1 ? "1re" : `${k}e`);

const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;

/** La VALEUR d'une proposition : « 0,25 » et « 25 % » valent toutes deux 0,25. */
function valeurChoix(s: string): number {
  const t = s.replace(/\s/g, "").replace(",", ".").replace("%", "");
  const v = Number(t);
  return s.includes("%") ? v / 100 : v;
}

/** QCM numérique : la bonne réponse mise de côté, trois leurres de VALEURS
 *  toutes différentes (entre eux et de la bonne réponse). */
function choixValeurs(correct: string, wrongs: readonly string[]): string[] {
  const vus = [valeurChoix(correct)];
  const garde: string[] = [];
  for (const w of shuffle(Array.from(new Set(wrongs)))) {
    const v = valeurChoix(w);
    if (w === correct || !Number.isFinite(v)) continue;
    if (vus.some((x) => Math.abs(x - v) < 1e-9)) continue;
    vus.push(v);
    garde.push(w);
    if (garde.length === 3) break;
  }
  return shuffle([correct, ...garde]);
}

/** QCM de phrases : trois leurres distincts de la bonne réponse. */
function choixTextes(correct: string, wrongs: readonly string[]): string[] {
  const garde = shuffle(Array.from(new Set(wrongs)).filter((w) => w.trim() !== correct.trim())).slice(0, 3);
  return shuffle([correct, ...garde]);
}

/** Réponse courte numérique (12,5 accepte aussi 12.5 au clavier). */
function num(text: string, value: number, explanation: string, canvas?: Q["canvas"]): Q {
  const v = fr(value);
  return {
    text,
    format: "short",
    expected: v.includes(",") ? [v, v.replace(",", ".")] : [v],
    comparator: "number_equal",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}
function qcmNum(text: string, value: number, wrongs: number[], explanation: string, canvas?: Q["canvas"], suffixe = ""): Q {
  const c = fr(value) + suffixe;
  return {
    text,
    format: "qcm",
    choices: choixValeurs(c, wrongs.filter((w) => Number.isFinite(w)).map((w) => fr(w) + suffixe)),
    expected: [c],
    comparator: "mcq_exact",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}
function qcmTexte(text: string, correct: string, wrongs: string[], explanation: string, canvas?: Q["canvas"]): Q {
  return { text, format: "qcm", choices: choixTextes(correct, wrongs), expected: [correct], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) };
}

/* ------------------------------ FIGURES ------------------------------ */

function tableau(headers: string[], rows: { label?: string; values: (string | number)[] }[], caption?: string): TableauDonneesCanvasData {
  return { kind: "tableau_donnees", headers, rows, ...(caption ? { caption } : {}), display: { compact: true } };
}
/** Tableau valeur / effectif (une ligne de valeurs, une ligne d'effectifs, et parfois les cumulés). */
function tableauEffectifs(carac: string, vals: number[], effs: number[], cumules = false): TableauDonneesCanvasData {
  const rows = [{ label: "Effectif", values: effs.map(fr) as (string | number)[] }];
  if (cumules) {
    let c = 0;
    rows.push({ label: "Effectif cumulé", values: effs.map((e) => fr((c += e))) });
  }
  return tableau([carac, ...vals.map(fr)], rows);
}

type OptionsGraphe = {
  type?: StatGraphCanvasData["graphType"];
  title?: string;
  axe?: { step: number; yMin?: number; axeY?: string };
  valeurs?: boolean;
  surligne?: number;
  bornes?: number[];
  parts?: "effectifs" | "pourcentages";
};
function graphe(labels: string[], vals: number[], o: OptionsGraphe = {}): StatGraphCanvasData {
  const type = o.type ?? "barres";
  return {
    kind: "stat_graph",
    graphType: type,
    ...(o.title ? { title: o.title } : {}),
    data: labels.map((label, j) => ({ label, value: vals[j] })),
    ...(o.bornes ? { bornes: o.bornes } : {}),
    display: {
      showLabels: true,
      showValues: o.valeurs ?? !o.axe,
      ...(o.axe ? { showAxis: true, step: o.axe.step, ...(o.axe.yMin ? { yMin: o.axe.yMin } : {}), ...(o.axe.axeY ? { axeY: o.axe.axeY } : {}) } : {}),
      ...(o.surligne !== undefined ? { highlightIndex: o.surligne } : {}),
      ...(o.parts ? { valeursParts: true, ...(o.parts === "pourcentages" ? { pourcentages: true } : {}) } : {}),
    },
    size: { width: 360, height: 230 },
  };
}

function gab(id: string, microId: string, difficulty: DifficultyLevel, hint: string, tags: string[], generate: () => Q): TutorBankItemV4 {
  return {
    kind: "template",
    id: `3e_stat_${id}`,
    niveau: "3e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["stat_statistique", microId, ...tags, "template"],
    generate,
  };
}

/* =========================================================================
   SERIES — une mesure par individu. `act(n)` complète « <qui> … » ; `q` est
   la série au pluriel (« ces températures ») ; `u` l'unité de la réponse.
========================================================================= */
type Serie = { qui: string; act: (n: number) => string; q: string; u: string; min: number; max: number; neg?: boolean };
const s = (qui: string, act: (n: number) => string, q: string, u: string, min: number, max: number, neg = false): Serie => ({ qui, act, q, u, min, max, neg });

const SERIES: Serie[] = [
  s("Une météorologue", (n) => `relève la température maximale, en °C, à Strasbourg pendant ${n} jours de mars`, "ces températures", "°C", 4, 19),
  s("Un entraîneur de basket", (n) => `note les points marqués par sa meneuse lors des ${n} derniers matchs`, "ces scores", "points", 6, 32),
  s("Une infirmière scolaire", (n) => `mesure la taille, en cm, de ${n} élèves de 3e`, "ces tailles", "cm", 148, 184),
  s("Un ingénieur du son", (n) => `mesure le niveau sonore maximal, en décibels, pendant ${n} concerts d'une tournée`, "ces niveaux sonores", "décibels", 84, 105),
  s("Une libraire", (n) => `compte les livres vendus chaque jour pendant ${n} jours`, "ces ventes", "livres", 24, 95),
  s("Une maraîchère", (n) => `pèse, en kg, les ${n} citrouilles qu'elle présente à un concours`, "ces masses", "kg", 4, 19),
  s("Un garde forestier", (n) => `mesure la hauteur, en m, de ${n} chênes d'une parcelle`, "ces hauteurs", "m", 14, 33),
  s("Une biologiste marine", (n) => `mesure la longueur de la carapace, en cm, de ${n} tortues vertes`, "ces longueurs", "cm", 72, 116),
  s("Une urgentiste", (n) => `note le nombre de patients reçus chaque nuit pendant ${n} nuits`, "ces nombres de patients", "patients", 12, 41),
  s("Une technicienne de la qualité de l'air", (n) => `relève la concentration de particules fines, en microgrammes par mètre cube, pendant ${n} jours`, "ces concentrations", "microgrammes par mètre cube", 8, 54),
  s("Une ingénieure en énergie", (n) => `relève la production d'un toit solaire, en kWh, pendant ${n} jours de juin`, "ces productions", "kWh", 9, 31),
  s("Un programmateur de cinéma", (n) => `note la durée, en minutes, des ${n} films à l'affiche cette semaine`, "ces durées", "minutes", 86, 152),
  s("Une compositrice", (n) => `relève la durée, en secondes, des ${n} morceaux de son album`, "ces durées", "secondes", 148, 292),
  s("Une cycliste professionnelle", (n) => `note la distance, en km, de ses ${n} dernières sorties d'entraînement`, "ces distances", "km", 42, 165),
  s("Un boulanger", (n) => `compte les baguettes vendues chaque matin pendant ${n} jours`, "ces ventes", "baguettes", 120, 260),
  s("Une hydrologue", (n) => `relève la hauteur de pluie, en mm, tombée chaque mois pendant ${n} mois`, "ces hauteurs de pluie", "mm", 18, 142),
  s("Un vétérinaire", (n) => `pèse, en kg, les ${n} chiens reçus en consultation ce matin`, "ces masses", "kg", 4, 42),
  s("Une professeure d'EPS", (n) => `chronomètre, en secondes, ${n} élèves sur un tour de piste`, "ces temps", "secondes", 68, 115),
  s("Un moniteur de ski", (n) => `relève la température, en °C, au sommet des pistes chaque matin pendant ${n} jours`, "ces températures", "°C", -14, 3, true),
  s("Une sismologue", (n) => `compte les séismes enregistrés chaque semaine sur un volcan pendant ${n} semaines`, "ces nombres de séismes", "séismes", 0, 16),
  s("Un guide de haute montagne", (n) => `note le dénivelé, en m, des ${n} randonnées qu'il propose`, "ces dénivelés", "m", 350, 980),
  s("Une glaciologue", (n) => `relève la température de l'air, en °C, sur un glacier à midi pendant ${n} jours`, "ces températures", "°C", -9, 6, true),
  s("Une streameuse de jeux vidéo", (n) => `note la durée, en minutes, de ses ${n} derniers directs`, "ces durées", "minutes", 45, 190),
  s("Un maître-nageur", (n) => `compte les entrées à la piscine chaque jour pendant ${n} jours`, "ces fréquentations", "entrées", 80, 310),
];

/** n valeurs de la série, dont la moyenne est un entier (ou au dixième si `dixieme`). */
function valeursMoyenne(c: Serie, n: number, dixieme = false): number[] {
  for (let essai = 0; essai < 400; essai++) {
    const xs = Array.from({ length: n }, () => rnd(c.min, c.max));
    const m = somme(xs) / n;
    if (dixieme ? auDixieme(m) : Number.isInteger(m)) return xs;
  }
  const m = rnd(c.min + 2, c.max - 2);
  return Array.from({ length: n }, (_, i) => m + (i % 2 ? 1 : -1) * (n % 2 && i === n - 1 ? 0 : 1));
}
/** n valeurs DISTINCTES de la série. */
function valeursDistinctes(c: Serie, n: number): number[] {
  const set = new Set<number>();
  while (set.size < n) set.add(rnd(c.min, c.max));
  return shuffle([...set]);
}
const introSerie = (c: Serie, n: number) => `${c.qui} ${c.act(n)}`;
const uniteDe = (c: Serie) => (["points", "livres", "patients", "baguettes", "séismes", "entrées"].includes(c.u) ? "" : ` ${c.u}`);

/* =========================================================================
   EFFECTIFS — une valeur entière comptée avec ses effectifs. `act(N)`
   complète « <qui> … » ; `carac` est l'en-tête court du tableau ; `moy` la
   moyenne en clair ; `ind` les individus ; valeurs consécutives de a à b.
========================================================================= */
type Eff = { qui: string; act: (N: number) => string; carac: string; ind: string; moy: string; a: number; b: number; avec?: string };
const e = (qui: string, act: (N: number) => string, carac: string, ind: string, moy: string, a: number, b: number, avec?: string): Eff => ({ qui, act, carac, ind, moy, a, b, avec });

const EFFECTIFS: Eff[] = [
  e("Une sociologue", (N) => `a interrogé ${N} familles sur leur nombre d'enfants`, "Enfants", "familles", "le nombre moyen d'enfants par famille", 0, 4, "ont N enfants"),
  e("Un arbitre de handball", (N) => `a relevé les cartons jaunes donnés lors de ${N} matchs`, "Cartons", "matchs", "le nombre moyen de cartons par match", 0, 4, "ont vu N cartons jaunes"),
  e("Une coach de tennis", (N) => `a compté les aces de sa joueuse lors de ${N} matchs`, "Aces", "matchs", "le nombre moyen d'aces par match", 2, 7, "ont compté N aces"),
  e("Un vendeur de chaussures", (N) => `a noté la pointure des ${N} paires vendues samedi`, "Pointure", "paires", "la pointure moyenne", 37, 42),
  e("Une dentiste", (N) => `a compté les caries de ${N} enfants lors d'un dépistage`, "Caries", "enfants", "le nombre moyen de caries par enfant", 0, 4, "ont N caries"),
  e("Un médecin du sport", (N) => `a demandé à ${N} adolescents combien de séances de sport ils font par semaine`, "Séances", "adolescents", "le nombre moyen de séances par semaine", 0, 5, "font N séances par semaine"),
  e("Une hôtelière", (N) => `a relevé le nombre de nuits passées par ${N} clients`, "Nuits", "clients", "le nombre moyen de nuits par client", 1, 6, "sont restés N nuits"),
  e("Une professeure de 3e", (N) => `a relevé les notes, sur 10, d'un test passé par ${N} élèves`, "Note", "élèves", "la note moyenne", 4, 10, "ont obtenu N sur 10"),
  e("Un journaliste sportif", (N) => `a compté les buts marqués lors des ${N} matchs d'un tournoi`, "Buts", "matchs", "le nombre moyen de buts par match", 0, 5, "ont vu N buts"),
  e("Une loueuse de vélos", (N) => `a noté la durée de location, en heures, de ${N} clients`, "Heures", "clients", "la durée moyenne de location", 1, 6, "ont loué un vélo N heures"),
  e("Un apiculteur", (N) => `a compté les cadres remplis de miel dans chacune de ses ${N} ruches`, "Cadres", "ruches", "le nombre moyen de cadres par ruche", 4, 9, "contiennent N cadres de miel"),
  e("Une libraire", (N) => `a demandé à ${N} lecteurs combien de livres ils ont lus cet été`, "Livres", "lecteurs", "le nombre moyen de livres lus", 0, 5, "ont lu N livres"),
  e("Un ornithologue", (N) => `a compté les œufs dans ${N} nids de mésanges`, "Œufs", "nids", "le nombre moyen d'œufs par nid", 5, 10, "contiennent N œufs"),
  e("Une agente immobilière", (N) => `a relevé le nombre de pièces des ${N} appartements qu'elle met en vente`, "Pièces", "appartements", "le nombre moyen de pièces", 1, 5, "ont N pièces"),
  e("Un professeur de conservatoire", (N) => `a demandé à ${N} élèves combien d'heures ils jouent de leur instrument par semaine`, "Heures", "élèves", "la durée moyenne de pratique", 1, 6, "jouent N heures par semaine"),
  e("Une météorologue", (N) => `a compté les jours de pluie de chaque semaine pendant ${N} semaines`, "Jours", "semaines", "le nombre moyen de jours de pluie par semaine", 0, 5, "ont compté N jours de pluie"),
  e("Une développeuse", (N) => `a compté les bugs signalés dans ${N} versions d'une application`, "Bugs", "versions", "le nombre moyen de bugs par version", 0, 5, "ont eu N bugs"),
  e("Un pédiatre", (N) => `a relevé l'âge, en mois, auquel ${N} bébés ont fait leurs premiers pas`, "Âge", "bébés", "l'âge moyen des premiers pas", 10, 15, "ont marché à N mois"),
];

/** k valeurs consécutives prises dans [a ; b] et leurs effectifs (total entre Nmin et Nmax). */
function tirerEffectifs(c: Eff, k: number, eMin: number, eMax: number): { vals: number[]; effs: number[] } {
  const k2 = Math.min(k, c.b - c.a + 1);
  const debut = rnd(c.a, c.b - k2 + 1);
  const vals = Array.from({ length: k2 }, (_, i) => debut + i);
  const effs = vals.map(() => rnd(eMin, eMax));
  return { vals, effs };
}
const deplie = (vals: number[], effs: number[]) => vals.flatMap((v, i) => Array(effs[i]).fill(v) as number[]);
const introEff = (c: Eff, N: number) => `${c.qui} ${c.act(N)}`;

/* =========================================================================
   ENQUETES — des catégories. `sujet` est une phrase complète ; `ind` les
   individus ; `pred` complète « Combien de <ind> … ? » ; `g` deux groupes
   pour un tableau à double entrée (`l` en-tête, `p` complément « en 3e A »).
========================================================================= */
type Cat = { l: string; pred: string };
type Groupe = { l: string; p: string };
type Enq = { sujet: string; ind: string; cats: Cat[]; g: [Groupe, Groupe]; min: number; max: number };
const k = (l: string, pred: string): Cat => ({ l, pred });
const gp = (l: string, p: string): Groupe => ({ l, p });
const WE: [Groupe, Groupe] = [gp("Samedi", "le samedi"), gp("Dimanche", "le dimanche")];
const FG: [Groupe, Groupe] = [gp("Filles", "chez les filles"), gp("Garçons", "chez les garçons")];

const ENQUETES: Enq[] = [
  { sujet: "Une disquaire a demandé à ses clients leur genre musical préféré.", ind: "clients", g: WE, min: 4, max: 38,
    cats: [k("Rap", "préfèrent le rap"), k("Pop", "préfèrent la pop"), k("Rock", "préfèrent le rock"), k("Jazz", "préfèrent le jazz"), k("Zouk", "préfèrent le zouk"), k("Électro", "préfèrent l'électro")] },
  { sujet: "Une diététicienne a interrogé des collégiens sur leur petit-déjeuner.", ind: "collégiens", g: FG, min: 3, max: 30,
    cats: [k("Céréales", "mangent des céréales"), k("Tartines", "mangent des tartines"), k("Fruits", "mangent des fruits"), k("Brioche", "mangent de la brioche"), k("Rien", "ne mangent rien")] },
  { sujet: "Un urbaniste a relevé le mode de transport des habitants qui vont travailler.", ind: "habitants", g: [gp("Centre", "dans le centre"), gp("Banlieue", "en banlieue")], min: 8, max: 60,
    cats: [k("À pied", "y vont à pied"), k("Bus", "y vont en bus"), k("Vélo", "y vont à vélo"), k("Voiture", "y vont en voiture"), k("Tram", "y vont en tram")] },
  { sujet: "Une éco-conseillère a trié les déchets ramassés sur une plage.", ind: "déchets", g: [gp("Matin", "le matin"), gp("Soir", "le soir")], min: 6, max: 70,
    cats: [k("Plastique", "sont en plastique"), k("Verre", "sont en verre"), k("Papier", "sont en papier"), k("Métal", "sont en métal"), k("Textile", "sont en tissu")] },
  { sujet: "Une documentaliste a classé les livres empruntés en une semaine dans un collège et un lycée.", ind: "livres", g: [gp("Collège", "au collège"), gp("Lycée", "au lycée")], min: 5, max: 45,
    cats: [k("BD", "sont des BD"), k("Manga", "sont des mangas"), k("Roman", "sont des romans"), k("Policier", "sont des policiers"), k("SF", "sont de science-fiction")] },
  { sujet: "Une vétérinaire a relevé les animaux soignés dans sa clinique en un mois.", ind: "animaux", g: [gp("Juin", "en juin"), gp("Juillet", "en juillet")], min: 4, max: 50,
    cats: [k("Chats", "sont des chats"), k("Chiens", "sont des chiens"), k("Lapins", "sont des lapins"), k("Oiseaux", "sont des oiseaux"), k("Furets", "sont des furets")] },
  { sujet: "Un ornithologue a compté les oiseaux venus à une mangeoire en une heure.", ind: "oiseaux", g: WE, min: 2, max: 28,
    cats: [k("Mésanges", "sont des mésanges"), k("Merles", "sont des merles"), k("Pinsons", "sont des pinsons"), k("Moineaux", "sont des moineaux"), k("Pies", "sont des pies")] },
  { sujet: "Le gérant d'un cinéma a noté le genre du film choisi par chaque spectateur.", ind: "spectateurs", g: WE, min: 10, max: 90,
    cats: [k("Comédie", "ont choisi une comédie"), k("Action", "ont choisi un film d'action"), k("Animé", "ont choisi un film d'animation"), k("Horreur", "ont choisi un film d'horreur"), k("Drame", "ont choisi un drame")] },
  { sujet: "Le chef d'une cantine a demandé aux élèves leur plat préféré.", ind: "élèves", g: [gp("3e A", "en 3e A"), gp("3e B", "en 3e B")], min: 2, max: 14,
    cats: [k("Pizza", "préfèrent la pizza"), k("Couscous", "préfèrent le couscous"), k("Lasagnes", "préfèrent les lasagnes"), k("Poisson", "préfèrent le poisson"), k("Curry", "préfèrent le curry")] },
  { sujet: "Un office de tourisme a relevé le pays d'origine de ses visiteurs étrangers.", ind: "visiteurs", g: [gp("Été", "en été"), gp("Hiver", "en hiver")], min: 12, max: 95,
    cats: [k("Belgique", "viennent de Belgique"), k("Suisse", "viennent de Suisse"), k("Canada", "viennent du Canada"), k("Allemagne", "viennent d'Allemagne"), k("Italie", "viennent d'Italie")] },
  { sujet: "Le responsable d'une salle de sport a relevé l'activité choisie par ses adhérents.", ind: "adhérents", g: FG, min: 6, max: 48,
    cats: [k("Muscu", "font de la musculation"), k("Yoga", "font du yoga"), k("Boxe", "font de la boxe"), k("Cardio", "font du cardio"), k("Danse", "font de la danse")] },
  { sujet: "Un glacier a relevé les parfums des cornets vendus un après-midi.", ind: "cornets", g: WE, min: 8, max: 64,
    cats: [k("Vanille", "sont à la vanille"), k("Chocolat", "sont au chocolat"), k("Fraise", "sont à la fraise"), k("Citron", "sont au citron"), k("Mangue", "sont à la mangue")] },
  { sujet: "Un garagiste a noté la couleur des voitures réparées dans son atelier.", ind: "voitures", g: [gp("Mars", "en mars"), gp("Avril", "en avril")], min: 3, max: 32,
    cats: [k("Blanche", "sont blanches"), k("Grise", "sont grises"), k("Noire", "sont noires"), k("Bleue", "sont bleues"), k("Rouge", "sont rouges")] },
  { sujet: "Une ingénieure réseau a relevé l'appareil utilisé pour chaque connexion au site du collège.", ind: "connexions", g: [gp("Lundi", "le lundi"), gp("Mardi", "le mardi")], min: 15, max: 99,
    cats: [k("Mobile", "viennent d'un téléphone"), k("Tablette", "viennent d'une tablette"), k("PC", "viennent d'un ordinateur"), k("Console", "viennent d'une console")] },
  { sujet: "L'organisatrice d'un festival a relevé l'instrument des musiciens inscrits.", ind: "musiciens", g: FG, min: 3, max: 26,
    cats: [k("Guitare", "jouent de la guitare"), k("Piano", "jouent du piano"), k("Batterie", "jouent de la batterie"), k("Violon", "jouent du violon"), k("Basse", "jouent de la basse")] },
  { sujet: "Une entraîneuse de football a relevé le poste des joueuses de son club.", ind: "joueuses", g: [gp("U15", "chez les moins de 15 ans"), gp("Seniors", "chez les seniors")], min: 2, max: 16,
    cats: [k("Gardienne", "sont gardiennes"), k("Défense", "jouent en défense"), k("Milieu", "jouent au milieu"), k("Attaque", "jouent en attaque")] },
  { sujet: "Une fleuriste a relevé les bouquets vendus pour la fête des mères.", ind: "bouquets", g: [gp("Vendredi", "le vendredi"), gp("Samedi", "le samedi")], min: 5, max: 55,
    cats: [k("Roses", "sont des roses"), k("Tulipes", "sont des tulipes"), k("Lys", "sont des lys"), k("Pivoines", "sont des pivoines"), k("Mixte", "sont des bouquets mélangés")] },
];

function tirerEnquete(c: Enq, nb: number, distincts = true): { cats: Cat[]; effs: number[] } {
  const cats = sample(c.cats, Math.min(nb, c.cats.length));
  let effs = cats.map(() => rnd(c.min, c.max));
  while (distincts && new Set(effs).size < effs.length) effs = cats.map(() => rnd(c.min, c.max));
  return { cats, effs };
}
const tabEnquete = (cats: Cat[], effs: number[]) => tableau(["Réponse", ...cats.map((x) => x.l)], [{ label: "Effectif", values: effs.map(fr) }]);

/* =========================================================================
   COURBES — six mois d'une grandeur, lus sur une courbe à axe gradué.
========================================================================= */
type Courbe = { sujet: string; q: string; u: string; axeY: string; step: number; min: number; max: number };
const MOIS = [
  ["Janv", "janvier"], ["Févr", "février"], ["Mars", "mars"], ["Avr", "avril"], ["Mai", "mai"], ["Juin", "juin"],
  ["Juil", "juillet"], ["Août", "août"], ["Sept", "septembre"], ["Oct", "octobre"], ["Nov", "novembre"], ["Déc", "décembre"],
] as const;
const COURBES: Courbe[] = [
  { sujet: "Une climatologue a tracé la température moyenne à Lille, mois par mois.", q: "la température moyenne", u: "°C", axeY: "°C", step: 2, min: 2, max: 22 },
  { sujet: "Une hydrologue a tracé la hauteur de pluie tombée à Brest, mois par mois.", q: "la hauteur de pluie", u: "mm", axeY: "mm", step: 10, min: 30, max: 150 },
  { sujet: "La directrice d'un musée a tracé le nombre de visiteurs, en milliers, mois par mois.", q: "le nombre de visiteurs, en milliers,", u: "milliers", axeY: "milliers", step: 5, min: 10, max: 65 },
  { sujet: "Une agricultrice a tracé la quantité de lait produite par sa ferme, en milliers de litres.", q: "la quantité de lait, en milliers de litres,", u: "milliers de litres", axeY: "milliers de L", step: 2, min: 12, max: 34 },
  { sujet: "Le responsable d'un parc éolien a tracé la production d'électricité, en GWh, mois par mois.", q: "la production", u: "GWh", axeY: "GWh", step: 5, min: 15, max: 70 },
  { sujet: "La gérante d'un camping a tracé le nombre de nuitées, en centaines, mois par mois.", q: "le nombre de nuitées, en centaines,", u: "centaines", axeY: "centaines", step: 10, min: 10, max: 120 },
  { sujet: "Un épidémiologiste a tracé le nombre de cas de grippe signalés, en centaines, mois par mois.", q: "le nombre de cas, en centaines,", u: "centaines", axeY: "centaines", step: 10, min: 10, max: 110 },
  { sujet: "Un loueur de kayaks a tracé le nombre de locations, mois par mois.", q: "le nombre de locations", u: "locations", axeY: "locations", step: 20, min: 20, max: 260 },
];
/** Six mois consécutifs ; valeurs sur une graduation ou au milieu de deux (si `milieux`). */
function tirerCourbe(c: Courbe, milieux: boolean) {
  const d = rnd(0, 6);
  const mois = MOIS.slice(d, d + 6);
  const pas = milieux && c.step % 2 === 0 ? c.step / 2 : c.step;
  let vals: number[] = [];
  do vals = mois.map(() => pas * rnd(Math.ceil(c.min / pas), Math.floor(c.max / pas)));
  while (new Set(vals).size < 5);
  return { mois, vals };
}

/** « de » devant un nom sans article : « d'élèves », « de clients ». */
const deNu = (n: string) => (/^(h(ab|ô|eu|ui)|[aeiouéèêâîôûœ])/i.test(n) ? "d'" + n : "de " + n);

/* =========================================================================
   STAT_LIRE_TABLEAU
========================================================================= */
const MICRO_LT = "stat_lire_tableau";

const lireTableau: TutorBankItemV4[] = [
  {
    kind: "fixed", id: "3e_stat_lire_tableau_fixed_1", niveau: "3e", matiere: "maths", notionId: "stat_statistique", microId: MICRO_LT,
    difficulty: 1, theme: "neutral",
    text: "Dans un tableau statistique, que représente l'effectif d'une catégorie ?",
    format: "qcm",
    choices: ["le nombre d'individus dans cette catégorie", "la moyenne de la série", "la plus grande valeur", "l'écart entre deux valeurs"],
    expected: ["le nombre d'individus dans cette catégorie"],
    comparator: "mcq_exact",
    hint: "L'effectif répond à la question : combien ?",
    explanation: expl("l'effectif d'une catégorie est le nombre d'individus de cette catégorie.", "on repère la catégorie, on lit le nombre associé.", "aucun calcul : c'est le sens du mot.", "l'effectif dit combien d'individus sont dans la catégorie."),
    tags: ["stat_statistique", "tableau", "effectif", "definition", "qcm"],
  },
  gab("lire_tableau_cellule", MICRO_LT, 1, "Repère la colonne de la réponse demandée, puis lis le nombre en dessous.", ["tableau", "lecture"], () => {
    const c = pick(ENQUETES);
    const { cats, effs } = tirerEnquete(c, rnd(4, 5));
    const i = rnd(0, cats.length - 1);
    const t = pick([
      `${c.sujet} Les résultats sont dans le tableau. Combien ${deNu(c.ind)} ${cats[i].pred} ?`,
      `${c.sujet} D'après le tableau, quel est l'effectif de la réponse « ${cats[i].l} » ?`,
      `${c.sujet} Lis le tableau : combien ${deNu(c.ind)} ${cats[i].pred} ?`,
    ]);
    return num(t, effs[i], expl("l'effectif d'une réponse est le nombre d'individus qui l'ont donnée.", `on cherche la colonne « ${cats[i].l} ».`, `sous « ${cats[i].l} », on lit ${fr(effs[i])}.`, `${fr(effs[i])} ${c.ind} ${cats[i].pred}.`), tabEnquete(cats, effs));
  }),
  gab("lire_tableau_extremes", MICRO_LT, 1, "Compare les effectifs : cherche le plus grand (ou le plus petit).", ["tableau", "lecture", "qcm"], () => {
    const c = pick(ENQUETES);
    const { cats, effs } = tirerEnquete(c, rnd(4, 5));
    const plus = Math.random() < 0.5;
    const j = effs.indexOf(plus ? Math.max(...effs) : Math.min(...effs));
    const t = plus
      ? pick([`${c.sujet} D'après le tableau, quelle réponse a le plus grand effectif ?`, `${c.sujet} Quelle réponse est la plus fréquente dans ce tableau ?`])
      : pick([`${c.sujet} D'après le tableau, quelle réponse a le plus petit effectif ?`, `${c.sujet} Quelle réponse est la moins fréquente dans ce tableau ?`]);
    return qcmTexte(t, cats[j].l, cats.filter((_, x) => x !== j).map((x) => x.l), expl("l'effectif le plus grand correspond à la réponse la plus fréquente.", "on compare tous les effectifs du tableau.", `${cats.map((x, y) => `${x.l} : ${fr(effs[y])}`).join(" ; ")}.`, `la réponse cherchée est « ${cats[j].l} » (${fr(effs[j])} ${c.ind}).`), tabEnquete(cats, effs));
  }),
  gab("lire_tableau_total", MICRO_LT, 2, "Additionne tous les effectifs du tableau.", ["tableau", "effectif_total"], () => {
    const c = pick(ENQUETES);
    const { cats, effs } = tirerEnquete(c, rnd(4, 5), false);
    const N = somme(effs);
    const t = pick([
      `${c.sujet} Combien ${deNu(c.ind)} ont été ${femInd(c.ind) ? "comptées" : "comptés"} en tout ?`,
      `${c.sujet} Quel est l'effectif total de ce tableau ?`,
      `${c.sujet} D'après le tableau, combien ${deNu(c.ind)} au total ?`,
    ]);
    return num(t, N, expl("l'effectif total est la somme de tous les effectifs.", "on additionne les nombres de la ligne « Effectif ».", `${effs.map(fr).join(" + ")} = ${fr(N)}.`, `l'effectif total est ${fr(N)}.`), tabEnquete(cats, effs));
  }),
  gab("lire_tableau_ecart", MICRO_LT, 2, "Lis les deux effectifs, puis fais la différence.", ["tableau", "difference"], () => {
    const c = pick(ENQUETES);
    const { cats, effs } = tirerEnquete(c, rnd(4, 5));
    const [a, b] = sample(cats.map((_, i) => i), 2).sort((x, y) => effs[y] - effs[x]);
    const t = pick([
      `${c.sujet} De combien l'effectif de « ${cats[a].l} » dépasse-t-il celui de « ${cats[b].l} » ?`,
      `${c.sujet} D'après le tableau, combien ${deNu(c.ind)} de plus pour « ${cats[a].l} » que pour « ${cats[b].l} » ?`,
      `${c.sujet} Quel est l'écart entre les effectifs de « ${cats[a].l} » et de « ${cats[b].l} » ?`,
    ]);
    const d = effs[a] - effs[b];
    return num(t, d, expl("l'écart entre deux effectifs est leur différence.", "on lit les deux effectifs, puis on soustrait le plus petit au plus grand.", `${fr(effs[a])} − ${fr(effs[b])} = ${fr(d)}.`, `l'écart est de ${fr(d)} ${c.ind}.`), tabEnquete(cats, effs));
  }),
  gab("lire_tableau_double_entree", MICRO_LT, 2, "Croise la bonne ligne et la bonne colonne ; pour un total, additionne.", ["tableau", "double_entree"], () => {
    const c = pick(ENQUETES);
    const cats = sample(c.cats, Math.min(4, c.cats.length));
    const m = [cats.map(() => rnd(c.min, c.max)), cats.map(() => rnd(c.min, c.max))];
    const i = rnd(0, cats.length - 1);
    const g = rnd(0, 1);
    const fig = tableau(["", ...cats.map((x) => x.l)], c.g.map((gr, y) => ({ label: gr.l, values: m[y].map(fr) })));
    const type = rnd(0, 2);
    if (type === 0) {
      const t = `${c.sujet} Le tableau croise deux groupes. Combien ${deNu(c.ind)} ${cats[i].pred} ${c.g[g].p} ?`;
      return num(t, m[g][i], expl("dans un tableau à double entrée, chaque case croise une ligne et une colonne.", `ligne « ${c.g[g].l} », colonne « ${cats[i].l} ».`, `on lit ${fr(m[g][i])}.`, `${fr(m[g][i])} ${c.ind} ${cats[i].pred} ${c.g[g].p}.`), fig);
    }
    if (type === 1) {
      const v = m[0][i] + m[1][i];
      const t = `${c.sujet} D'après le tableau, combien ${deNu(c.ind)} ${cats[i].pred}, les deux groupes réunis ?`;
      return num(t, v, expl("un total de colonne additionne les cases de cette colonne.", `on additionne les deux cases de la colonne « ${cats[i].l} ».`, `${fr(m[0][i])} + ${fr(m[1][i])} = ${fr(v)}.`, `${fr(v)} ${c.ind} ${cats[i].pred}.`), fig);
    }
    const v = somme(m[g]);
    const t = `${c.sujet} D'après le tableau, combien ${deNu(c.ind)} en tout ${c.g[g].p} ?`;
    return num(t, v, expl("un total de ligne additionne les cases de cette ligne.", `on additionne la ligne « ${c.g[g].l} ».`, `${m[g].map(fr).join(" + ")} = ${fr(v)}.`, `${fr(v)} ${c.ind} ${c.g[g].p}.`), fig);
  }),

  gab("lire_tableau_manquant", MICRO_LT, 3, "Effectif manquant = effectif total − somme des effectifs connus.", ["tableau", "valeur_manquante"], () => {
    const c = pick(ENQUETES);
    const { cats, effs } = tirerEnquete(c, rnd(4, 5), false);
    const N = somme(effs);
    const i = rnd(0, cats.length - 1);
    const vus = effs.filter((_, x) => x !== i);
    const t = pick([
      `${c.sujet} En tout, ${fr(N)} ${c.ind} ont été ${femInd(c.ind) ? "comptées" : "comptés"}, mais une case du tableau s'est effacée. Combien ${deNu(c.ind)} ${cats[i].pred} ?`,
      `${c.sujet} L'effectif total est ${fr(N)}. Quel est l'effectif manquant, celui de « ${cats[i].l} » ?`,
      `${c.sujet} On sait qu'il y a ${fr(N)} ${c.ind} au total. Retrouve le nombre ${deNu(c.ind)} qui ${cats[i].pred}.`,
    ]);
    const fig = tableau(["Réponse", ...cats.map((x) => x.l), "Total"], [{ label: "Effectif", values: [...effs.map((v, x) => (x === i ? "?" : fr(v))), fr(N)] }]);
    return num(t, effs[i], expl("la somme des effectifs est égale à l'effectif total.", "on retire du total la somme des effectifs connus.", `${fr(N)} − (${vus.map(fr).join(" + ")}) = ${fr(N)} − ${fr(somme(vus))} = ${fr(effs[i])}.`, `l'effectif manquant est ${fr(effs[i])}.`), fig);
  }),
  gab("lire_tableau_cumules", MICRO_LT, 3, "« Au plus 3 » : 3 compris. « Moins de 3 » : 3 exclu. Additionne les bons effectifs.", ["tableau", "effectifs_cumules"], () => {
    const c = pick(EFFECTIFS.filter((x) => x.avec));
    const { vals, effs } = tirerEffectifs(c, rnd(4, 5), 2, 15);
    const N = somme(effs);
    const v = pick([...vals.slice(1, -1).filter((x) => x >= 2), vals[vals.length - 2]]);
    const [mot, test] = pick([
      ["au plus", (x: number) => x <= v],
      ["au moins", (x: number) => x >= v],
      ["moins de", (x: number) => x < v],
      ["plus de", (x: number) => x > v],
    ] as const);
    const garde = vals.map((x, j) => (test(x) ? j : -1)).filter((j) => j >= 0);
    const rep = somme(garde.map((j) => effs[j]));
    const phrase = c.avec!.replace("N", `${mot} ${v}`);
    const t = pick([
      `${introEff(c, N)}. Combien ${deNu(c.ind)} ${phrase} ?`,
      `${introEff(c, N)} (tableau ci-dessous). D'après le tableau, combien ${deNu(c.ind)} ${phrase} ?`,
    ]);
    return num(t, rep, expl(`« ${mot} ${v} » ${mot.startsWith("au") ? `comprend la valeur ${v}` : `exclut la valeur ${v}`}.`, `on additionne les effectifs des valeurs ${garde.map((j) => fr(vals[j])).join(", ")}.`, `${garde.map((j) => fr(effs[j])).join(" + ")} = ${fr(rep)}.`, `${fr(rep)} ${c.ind} ${phrase}.`), tableauEffectifs(c.carac, vals, effs));
  }),
  gab("lire_tableau_double_manquant", MICRO_LT, 3, "Dans une colonne : total − case connue. Dans une ligne : total − les autres cases.", ["tableau", "double_entree", "valeur_manquante"], () => {
    const c = pick(ENQUETES);
    const cats = sample(c.cats, Math.min(4, c.cats.length));
    const m = [cats.map(() => rnd(c.min, c.max)), cats.map(() => rnd(c.min, c.max))];
    const i = rnd(0, cats.length - 1);
    const g = rnd(0, 1);
    const tot = cats.map((_, j) => m[0][j] + m[1][j]);
    const cell = (y: number, j: number) => (y === g && j === i ? "?" : fr(m[y][j]));
    const fig = tableau(["", ...cats.map((x) => x.l)], [
      { label: c.g[0].l, values: cats.map((_, j) => cell(0, j)) },
      { label: c.g[1].l, values: cats.map((_, j) => cell(1, j)) },
      { label: "Total", values: tot.map(fr) },
    ]);
    const t = pick([
      `${c.sujet} Une case du tableau à double entrée est effacée. Combien ${deNu(c.ind)} ${cats[i].pred} ${c.g[g].p} ?`,
      `${c.sujet} Retrouve la case manquante du tableau : l'effectif « ${cats[i].l} » ${c.g[g].p}.`,
    ]);
    return num(t, m[g][i], expl("dans chaque colonne, les deux groupes réunis donnent le total.", `on utilise la colonne « ${cats[i].l} » : total − case connue.`, `${fr(tot[i])} − ${fr(m[1 - g][i])} = ${fr(m[g][i])}.`, `la case manquante vaut ${fr(m[g][i])}.`), fig);
  }),
];

/* =========================================================================
   STAT_LIRE_GRAPHIQUE — lecture sur un axe gradué (valeurs NON écrites),
   sur une graduation ou au milieu de deux ; courbe ; camembert ;
   histogramme ; axe tronqué.
========================================================================= */
const MICRO_LG = "stat_lire_graphique";
/** Un contexte de SERIES découpé en classes de largeur w (nbMin à 5 classes, toutes dans la plage plausible). */
function classes(nbMin: number, largeurs: number[]) {
  for (const c of shuffle(SERIES))
    for (const w of largeurs) {
      const b0 = Math.floor(c.min / w) * w;
      const nb = Math.ceil((c.max - b0) / w);
      if (nb >= nbMin && nb <= 5) return { c, w, b0, nb, bornes: Array.from({ length: nb + 1 }, (_, j) => b0 + j * w) };
    }
  throw new Error("aucun contexte découpable en classes");
}
const pasPour = (max: number) => (max <= 20 ? 2 : max <= 50 ? 5 : 10);

/** Des effectifs d'enquête posés sur l'axe : multiples de `pas` (ou de pas ÷ 2). */
function enqueteSurAxe(c: Enq, nb: number, milieux = false) {
  const step = milieux ? pasPour(c.max) * 2 : pasPour(c.max);
  const unite = milieux ? step / 2 : step;
  const cats = sample(c.cats, Math.min(nb, c.cats.length));
  let effs: number[] = [];
  do effs = cats.map(() => unite * rnd(Math.max(1, Math.ceil(c.min / unite)), Math.max(2, Math.floor((c.max * (milieux ? 1.6 : 1)) / unite))));
  while (new Set(effs).size < effs.length);
  return { cats, effs, step };
}
const LIS_AXE = [
  "Les nombres ne sont pas écrits sur les barres : lis l'axe gradué.",
  "Lis la hauteur de la barre sur l'axe gradué.",
  "Sers-toi des graduations de l'axe vertical.",
];

const lireGraphique: TutorBankItemV4[] = [
  gab("lire_graphique_axe", MICRO_LG, 1, "Suis le haut de la barre jusqu'à l'axe gradué.", ["graphique", "axe_gradue", "canvas"], () => {
    const c = pick(ENQUETES);
    const { cats, effs, step } = enqueteSurAxe(c, rnd(3, 5));
    const i = rnd(0, cats.length - 1);
    const t = pick([
      `${c.sujet} ${pick(LIS_AXE)} Combien ${deNu(c.ind)} ${cats[i].pred} ?`,
      `${c.sujet} D'après le diagramme en barres, quel est l'effectif de « ${cats[i].l} » ? ${pick(LIS_AXE)}`,
      `${c.sujet} Le diagramme montre les résultats. Combien ${deNu(c.ind)} ${cats[i].pred} ?`,
    ]);
    return num(t, effs[i], expl("dans un diagramme en barres, la hauteur d'une barre donne l'effectif.", `l'axe est gradué de ${fr(step)} en ${fr(step)} ; on suit le haut de la barre « ${cats[i].l} ».`, `le haut de la barre arrive sur la graduation ${fr(effs[i])}.`, `${fr(effs[i])} ${c.ind} ${cats[i].pred}.`), graphe(cats.map((x) => x.l), effs, { axe: { step, axeY: c.ind }, surligne: i }));
  }),
  gab("lire_graphique_extremes", MICRO_LG, 1, "La barre la plus haute correspond au plus grand effectif.", ["graphique", "qcm", "canvas"], () => {
    const c = pick(ENQUETES);
    const { cats, effs, step } = enqueteSurAxe(c, rnd(4, 5));
    const plus = Math.random() < 0.5;
    const j = effs.indexOf(plus ? Math.max(...effs) : Math.min(...effs));
    const t = plus
      ? pick([`${c.sujet} D'après le diagramme, quelle réponse a été donnée le plus souvent ?`, `${c.sujet} Quelle barre du diagramme représente le plus grand effectif ?`])
      : pick([`${c.sujet} D'après le diagramme, quelle réponse a été donnée le moins souvent ?`, `${c.sujet} Quelle barre du diagramme représente le plus petit effectif ?`]);
    return qcmTexte(t, cats[j].l, cats.filter((_, x) => x !== j).map((x) => x.l), expl("la hauteur d'une barre représente l'effectif.", `on compare les hauteurs des barres.`, `${cats.map((x, y) => `${x.l} : ${fr(effs[y])}`).join(" ; ")}.`, `la réponse est « ${cats[j].l} ».`), graphe(cats.map((x) => x.l), effs, { axe: { step, axeY: c.ind } }));
  }),
  gab("lire_graphique_milieu", MICRO_LG, 2, "Le haut de la barre tombe entre deux graduations : c'est le milieu.", ["graphique", "axe_gradue", "milieu", "canvas"], () => {
    const c = pick(ENQUETES);
    const { cats, effs, step } = enqueteSurAxe(c, rnd(3, 5), true);
    let i = effs.findIndex((v) => v % step !== 0);
    if (i < 0) { i = 0; effs[0] = step / 2 + step * rnd(1, 3); }
    const t = pick([
      `${c.sujet} ${pick(LIS_AXE)} Combien ${deNu(c.ind)} ${cats[i].pred} ?`,
      `${c.sujet} Le haut de la barre « ${cats[i].l} » tombe entre deux graduations. Quel est son effectif ?`,
      `${c.sujet} D'après le diagramme, quel est l'effectif de « ${cats[i].l} » ?`,
    ]);
    return num(t, effs[i], expl("entre deux graduations, le milieu vaut leur moyenne.", `l'axe va de ${fr(step)} en ${fr(step)} ; la barre « ${cats[i].l} » s'arrête au milieu de ${fr(effs[i] - step / 2)} et ${fr(effs[i] + step / 2)}.`, `(${fr(effs[i] - step / 2)} + ${fr(effs[i] + step / 2)}) ÷ 2 = ${fr(effs[i])}.`, `l'effectif de « ${cats[i].l} » est ${fr(effs[i])}.`), graphe(cats.map((x) => x.l), effs, { axe: { step, axeY: c.ind }, surligne: i }));
  }),
  gab("lire_graphique_courbe", MICRO_LG, 2, "Repère le mois sur l'axe horizontal, monte jusqu'à la courbe, lis l'axe vertical.", ["graphique", "courbe", "canvas"], () => {
    const c = pick(COURBES);
    const { mois, vals } = tirerCourbe(c, false);
    const fig = graphe(mois.map((m) => m[0]), vals, { type: "courbe", axe: { step: c.step, axeY: c.axeY } });
    if (Math.random() < 0.6) {
      const i = rnd(0, 5);
      const t = pick([`${c.sujet} D'après la courbe, ${/^le /.test(c.q) ? "quel" : "quelle"} est ${c.q} en ${mois[i][1]} ?`, `${c.sujet} Lis sur la courbe ${c.q} du mois ${deNu(mois[i][1])}.`]);
      return num(t, vals[i], expl("un point de la courbe associe un mois à une valeur.", `on part de « ${mois[i][0]} », on monte jusqu'à la courbe, on lit l'axe gradué de ${fr(c.step)} en ${fr(c.step)}.`, `le point est sur la graduation ${fr(vals[i])}.`, `en ${mois[i][1]}, ${c.q} vaut ${fr(vals[i])} ${c.u}.`), fig);
    }
    const plus = Math.random() < 0.5;
    const top = plus ? Math.max(...vals) : Math.min(...vals);
    const j = vals.indexOf(top);
    if (vals.filter((v) => v === top).length > 1) vals[j] += plus ? c.step : -c.step;
    const t = `${c.sujet} D'après la courbe, en quel mois ${c.q} atteint-${/^le /.test(c.q) ? "il" : "elle"} sa valeur la plus ${plus ? "haute" : "basse"} ?`;
    return qcmTexte(t, mois[j][1], mois.filter((_, x) => x !== j).map((m) => m[1]), expl("le point le plus haut de la courbe donne la plus grande valeur.", "on cherche le point le plus haut (ou le plus bas).", `${mois.map((m, x) => `${m[1]} : ${fr(vals[x])}`).join(" ; ")}.`, `c'est en ${mois[j][1]}.`), graphe(mois.map((m) => m[0]), vals, { type: "courbe", axe: { step: c.step, axeY: c.axeY } }));
  }),
  gab("lire_graphique_total", MICRO_LG, 2, "Lis chaque barre sur l'axe, puis additionne.", ["graphique", "effectif_total", "canvas"], () => {
    const c = pick(ENQUETES);
    const { cats, effs, step } = enqueteSurAxe(c, rnd(3, 4));
    const N = somme(effs);
    const t = pick([
      `${c.sujet} ${pick(LIS_AXE)} Combien ${deNu(c.ind)} ont été ${femInd(c.ind) ? "comptées" : "comptés"} en tout ?`,
      `${c.sujet} D'après le diagramme, quel est l'effectif total ?`,
    ]);
    return num(t, N, expl("l'effectif total est la somme des effectifs.", "on lit chaque barre sur l'axe gradué, puis on additionne.", `${effs.map(fr).join(" + ")} = ${fr(N)}.`, `l'effectif total est ${fr(N)}.`), graphe(cats.map((x) => x.l), effs, { axe: { step, axeY: c.ind } }));
  }),

  gab("lire_graphique_camembert", MICRO_LG, 3, "Une part de camembert se lit en % ; pour un effectif : total × pourcentage ÷ 100.", ["graphique", "camembert", "pourcentage", "canvas"], () => {
    const c = pick(ENQUETES);
    const cats = sample(c.cats, 4);
    const N = pick([20, 25, 40, 50, 200, 300, 400, 500].filter((x) => x <= Math.max(50, c.max * 6)));
    const pas = N === 25 || N === 50 ? 1 : N / 20;
    let effs: number[] = [];
    do {
      const a = rnd(1, 7), b = rnd(1, 6), d = rnd(1, 5);
      const unites = N / pas;
      effs = [a, b, d, unites - a - b - d].map((u) => u * pas);
    } while (effs[3] <= 0 || new Set(effs).size < 4);
    const pc = effs.map((v) => (v * 100) / N);
    const i = rnd(0, 3);
    if (Math.random() < 0.5) {
      const t = pick([
        `${c.sujet} Le diagramme circulaire donne la part de chaque réponse, en %. Sur ${fr(N)} ${c.ind}, combien ${cats[i].pred} ?`,
        `${c.sujet} Il y a ${fr(N)} ${c.ind} en tout. D'après le diagramme, combien ${deNu(c.ind)} ${cats[i].pred} ?`,
      ]);
      return num(t, effs[i], expl("un pourcentage d'un total se calcule par total × pourcentage ÷ 100.", `la part « ${cats[i].l} » vaut ${fr(pc[i])} %.`, `${fr(N)} × ${fr(pc[i])} ÷ 100 = ${fr(effs[i])}.`, `${fr(effs[i])} ${c.ind} ${cats[i].pred}.`), graphe(cats.map((x) => x.l), pc, { type: "camembert", parts: "pourcentages" }));
    }
    const t = pick([
      `${c.sujet} Le diagramme circulaire donne les effectifs. Quel pourcentage ${deNu(c.ind)} ${cats[i].pred} ?`,
      `${c.sujet} D'après le diagramme circulaire, quelle part des ${c.ind}, en %, correspond à « ${cats[i].l} » ?`,
    ]);
    return num(t, pc[i], expl("le pourcentage d'une part est effectif ÷ effectif total × 100.", `effectif total : ${effs.map(fr).join(" + ")} = ${fr(N)}.`, `${fr(effs[i])} ÷ ${fr(N)} × 100 = ${fr(pc[i])}.`, `${fr(pc[i])} % ${deNu(c.ind)} ${cats[i].pred}.`), graphe(cats.map((x) => x.l), effs, { type: "camembert", parts: "effectifs" }));
  }),
  gab("lire_graphique_histogramme", MICRO_LG, 3, "Dans un histogramme, chaque barre est une classe : lis sa hauteur sur l'axe.", ["graphique", "histogramme", "classes", "canvas"], () => {
    const { c, nb, bornes } = classes(3, [2, 5, 10, 20, 50, 100]);
    const effs = Array.from({ length: nb }, () => rnd(1, 12));
    const i = rnd(0, nb - 1);
    const de_a = `de ${fr(bornes[i])} à ${fr(bornes[i + 1])}${uniteDe(c)}`;
    const t = pick([
      `${introSerie(c, somme(effs))}, et regroupe les résultats en classes. Combien de valeurs sont dans la classe ${de_a} (${fr(bornes[i + 1])} exclu) ?`,
      `${introSerie(c, somme(effs))}. L'histogramme regroupe les valeurs par classes. Quel est l'effectif de la classe ${de_a} ?`,
    ]);
    return num(t, effs[i], expl("dans un histogramme, chaque barre représente une classe ; sa hauteur est l'effectif de la classe.", `on repère la barre entre ${fr(bornes[i])} et ${fr(bornes[i + 1])}, puis on lit l'axe gradué.`, `la barre monte jusqu'à ${fr(effs[i])}.`, `la classe ${de_a} contient ${fr(effs[i])} valeurs.`), graphe(effs.map((_, j) => `${bornes[j]}`), effs, { type: "histogramme", bornes, axe: { step: 2, axeY: "effectif" }, surligne: i }));
  }),
  gab("lire_graphique_ecart", MICRO_LG, 3, "Lis les deux barres sur l'axe gradué, puis fais la différence.", ["graphique", "difference", "axe_gradue", "canvas"], () => {
    const c = pick(ENQUETES);
    const { cats, effs, step } = enqueteSurAxe(c, rnd(3, 5), true);
    const [a, b] = sample(cats.map((_, i) => i), 2).sort((x, y) => effs[y] - effs[x]);
    const d = effs[a] - effs[b];
    const t = pick([
      `${c.sujet} ${pick(LIS_AXE)} Combien ${deNu(c.ind)} de plus pour « ${cats[a].l} » que pour « ${cats[b].l} » ?`,
      `${c.sujet} D'après le diagramme, de combien l'effectif de « ${cats[a].l} » dépasse-t-il celui de « ${cats[b].l} » ?`,
    ]);
    return num(t, d, expl("l'écart entre deux effectifs est leur différence.", `on lit les deux barres sur l'axe gradué de ${fr(step)} en ${fr(step)} (un milieu vaut ${fr(step / 2)} de plus que la graduation du dessous).`, `${fr(effs[a])} − ${fr(effs[b])} = ${fr(d)}.`, `l'écart est de ${fr(d)} ${c.ind}.`), graphe(cats.map((x) => x.l), effs, { axe: { step, axeY: c.ind } }));
  }),

  gab("lire_graphique_tronque", MICRO_LG, 4, "Regarde d'abord où commence l'axe : s'il ne part pas de 0, les hauteurs trompent.", ["graphique", "axe_tronque", "esprit_critique", "canvas"], () => {
    const c = pick(TRONQUES);
    const v1 = pick([200, 250, 400, 500, 800, 1000]);
    const p = pick([2, 4, 5, 6, 8, 10].filter((x) => Number.isInteger((v1 * x) / 100) && ((v1 * x) / 100) % 2 === 0));
    const d = (v1 * p) / 100;
    const v2 = v1 + d;
    const step = d / 2;
    const yMin = v1 - step;
    const an = rnd(2018, 2024);
    const fig = graphe([String(an), String(an + 1)], [v1, v2], { axe: { step, yMin, axeY: c.axeY }, title: c.titre });
    if (Math.random() < 0.5) {
      const t = `${c.sujet} Sur son graphique, la barre de ${an + 1} paraît trois fois plus haute que celle de ${an}. Regarde où commence l'axe. De quel pourcentage ${c.q} a-t-il réellement augmenté ?`;
      return num(t, p, expl("une évolution en % se calcule par hausse ÷ valeur de départ × 100 ; l'axe tronqué (qui ne part pas de 0) exagère la hausse.", `on lit ${fr(v1)} puis ${fr(v2)} ; l'axe commence à ${fr(yMin)}, pas à 0.`, `hausse : ${fr(v2)} − ${fr(v1)} = ${fr(d)} ; ${fr(d)} ÷ ${fr(v1)} × 100 = ${fr(p)}.`, `la hausse réelle n'est que de ${fr(p)} %, pas un triplement.`), fig);
    }
    const t = `${c.sujet} Sur son graphique, la barre de ${an + 1} paraît trois fois plus haute que celle de ${an}. Lis l'axe : de combien ${c.q} a-t-il réellement augmenté entre ${an} et ${an + 1} ?`;
    return num(t, d, expl("l'axe tronqué (qui ne part pas de 0) exagère les écarts : on lit les VALEURS, pas les hauteurs.", `l'axe commence à ${fr(yMin)} et va de ${fr(step)} en ${fr(step)}.`, `${fr(v2)} − ${fr(v1)} = ${fr(d)}.`, `${c.q} n'a augmenté que de ${fr(d)}, alors que ${fr(v1)} × 3 = ${fr(3 * v1)}.`), fig);
  }),
  gab("lire_graphique_courbe_ecart", MICRO_LG, 4, "Lis les deux points (un milieu vaut une demi-graduation de plus), puis soustrais.", ["graphique", "courbe", "milieu", "canvas"], () => {
    const c = pick(COURBES);
    const { mois, vals } = tirerCourbe(c, true);
    let [a, b] = sample([0, 1, 2, 3, 4, 5], 2).sort((x, y) => x - y);
    if (vals[a] === vals[b]) vals[b] += c.step / 2;
    const d = Math.abs(vals[b] - vals[a]);
    const t = pick([
      `${c.sujet} D'après la courbe, quel est l'écart entre la valeur ${deNu(mois[a][1])} et celle ${deNu(mois[b][1])} (la plus grande moins la plus petite) ?`,
      `${c.sujet} Entre ${mois[a][1]} et ${mois[b][1]}, de combien ${c.q} a-t-${/^le /.test(c.q) ? "il" : "elle"} ${vals[b] > vals[a] ? "augmenté" : "diminué"} ?`,
    ]);
    return num(t, d, expl("l'écart entre deux valeurs est la plus grande moins la plus petite.", `l'axe va de ${fr(c.step)} en ${fr(c.step)} : un point entre deux graduations est au milieu.`, `${mois[a][1]} : ${fr(vals[a])} ; ${mois[b][1]} : ${fr(vals[b])} ; écart ${fr(Math.max(vals[a], vals[b]))} − ${fr(Math.min(vals[a], vals[b]))} = ${fr(d)}.`, `l'écart est de ${fr(d)} ${c.u}.`), graphe(mois.map((m) => m[0]), vals, { type: "courbe", axe: { step: c.step, axeY: c.axeY } }));
  }),
  gab("lire_graphique_histo_cumul", MICRO_LG, 4, "« Au moins a » : additionne les classes qui commencent à a et au-delà.", ["graphique", "histogramme", "cumul", "canvas"], () => {
    const { c, nb, bornes } = classes(4, [2, 5, 10, 20, 50, 100]);
    const effs = Array.from({ length: nb }, () => rnd(1, 12));
    const i = rnd(1, nb - 1);
    const haut = Math.random() < 0.5;
    const garde = haut ? effs.slice(i) : effs.slice(0, i);
    const rep = somme(garde);
    const lim = `${fr(bornes[i])}${uniteDe(c)}`;
    const t = haut
      ? `${introSerie(c, somme(effs))}. D'après l'histogramme, combien de valeurs sont supérieures ou égales à ${lim} ?`
      : `${introSerie(c, somme(effs))}. D'après l'histogramme, combien de valeurs sont strictement inférieures à ${lim} ?`;
    return num(t, rep, expl("chaque barre de l'histogramme donne l'effectif d'une classe [début ; fin[.", `on garde les classes ${haut ? `à partir de ${fr(bornes[i])}` : `qui finissent avant ou à ${fr(bornes[i])}`}.`, `${garde.map(fr).join(" + ")} = ${fr(rep)}.`, `${fr(rep)} valeurs.`), graphe(effs.map((_, j) => `${bornes[j]}`), effs, { type: "histogramme", bornes, axe: { step: 2, axeY: "effectif" } }));
  }),
];

/* Axe tronqué : une grandeur qui progresse peu, montrée pour paraître exploser. */
type Tronque = { sujet: string; q: string; axeY: string; titre: string };
const TRONQUES: Tronque[] = [
  { sujet: "Le directeur d'une médiathèque présente le nombre de ses abonnés.", q: "le nombre d'abonnés", axeY: "abonnés", titre: "Abonnés" },
  { sujet: "Un vendeur de vélos électriques fait sa publicité avec le nombre de vélos vendus.", q: "le nombre de vélos vendus", axeY: "vélos", titre: "Vélos vendus" },
  { sujet: "Un apiculteur montre sa récolte de miel, en kg, sur deux années.", q: "le nombre de kg récoltés", axeY: "kg", titre: "Miel récolté" },
  { sujet: "La présidente d'un club de rugby affiche le nombre de licenciés.", q: "le nombre de licenciés", axeY: "licenciés", titre: "Licenciés" },
  { sujet: "Une développeuse d'application montre le nombre de téléchargements par jour.", q: "le nombre de téléchargements", axeY: "téléchargements", titre: "Téléchargements" },
  { sujet: "Une mairie publie la masse de déchets recyclés, en tonnes.", q: "le nombre de tonnes recyclées", axeY: "tonnes", titre: "Déchets recyclés" },
  { sujet: "Un journaliste montre le nombre de spectateurs d'un festival de musique.", q: "le nombre de spectateurs", axeY: "spectateurs", titre: "Spectateurs" },
  { sujet: "Une infirmière coordinatrice présente le nombre de vaccinations faites dans un centre.", q: "le nombre de vaccinations", axeY: "vaccinations", titre: "Vaccinations" },
  { sujet: "Un maraîcher bio compare le nombre de paniers vendus.", q: "le nombre de paniers vendus", axeY: "paniers", titre: "Paniers vendus" },
  { sujet: "Le gérant d'un parc d'accrobranche affiche sa fréquentation.", q: "le nombre de visiteurs", axeY: "visiteurs", titre: "Visiteurs" },
];

/* =========================================================================
   STAT_EFFECTIF_FREQUENCE — effectif total, fréquence décimale, en %,
   effectif retrouvé à partir d'un %, fréquences cumulées, comparer deux
   proportions.
========================================================================= */
const MICRO_EF = "stat_effectif_frequence";
const exact2 = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-9;
/** Des effectifs d'enquête dont le total est N (nb catégories, chacune ≥ 1). */
function effectifsDeTotal(nb: number, N: number, ok: (effs: number[]) => boolean = () => true): number[] {
  for (let essai = 0; essai < 500; essai++) {
    const cuts = tri(Array.from({ length: nb - 1 }, () => rnd(1, N - 1)));
    const effs = [...cuts, N].map((v, j) => v - (j ? cuts[j - 1] : 0));
    if (effs.every((v) => v >= 1) && new Set(effs).size === nb && ok(effs)) return effs;
  }
  const base = Math.floor(N / nb);
  return Array.from({ length: nb }, (_, j) => (j === nb - 1 ? N - base * (nb - 1) : base));
}
const femInd = (ind: string) => /^(connexions|voitures|joueuses)$/.test(ind);
const listeCats = (cats: Cat[], effs: number[]) => cats.map((x, j) => `${fr(effs[j])} ${x.pred}`).join(", ");

const effectifFrequence: TutorBankItemV4[] = [
  {
    kind: "fixed", id: "3e_stat_effectif_frequence_fixed_1", niveau: "3e", matiere: "maths", notionId: "stat_statistique", microId: MICRO_EF,
    difficulty: 1, theme: "neutral",
    text: "Comment calcule-t-on la fréquence d'une valeur dans une série ?",
    format: "qcm",
    choices: ["effectif de la valeur ÷ effectif total", "effectif total ÷ effectif de la valeur", "effectif de la valeur × effectif total", "effectif total − effectif de la valeur"],
    expected: ["effectif de la valeur ÷ effectif total"],
    comparator: "mcq_exact",
    hint: "Une fréquence est une part du total : elle est comprise entre 0 et 1.",
    explanation: expl("la fréquence d'une valeur est la part du total qu'elle représente.", "on divise l'effectif de la valeur par l'effectif total.", "par exemple 6 ÷ 24 = 0,25.", "fréquence = effectif ÷ effectif total (entre 0 et 1, ou × 100 pour l'avoir en %)."),
    tags: ["stat_statistique", "frequence", "definition", "qcm"],
  },
  gab("effectif_frequence_total", MICRO_EF, 1, "L'effectif total est la somme de tous les effectifs.", ["effectif_total"], () => {
    const c = pick(ENQUETES);
    const { cats, effs } = tirerEnquete(c, rnd(3, 5), false);
    const N = somme(effs);
    const t = pick([
      `${c.sujet} Résultats : ${listeCats(cats, effs)}. Quel est l'effectif total ?`,
      `${c.sujet} On a trouvé : ${listeCats(cats, effs)}. Combien ${deNu(c.ind)} en tout ?`,
      `${c.sujet} Voici les effectifs : ${listeCats(cats, effs)}. Calcule l'effectif total.`,
    ]);
    return num(t, N, expl("l'effectif total est la somme des effectifs.", "on additionne tous les effectifs.", `${effs.map(fr).join(" + ")} = ${fr(N)}.`, `l'effectif total est ${fr(N)}.`));
  }),
  gab("effectif_frequence_complement", MICRO_EF, 1, "Retire du total les effectifs connus.", ["effectif", "complement"], () => {
    const c = pick(ENQUETES);
    const { cats, effs } = tirerEnquete(c, rnd(3, 4), false);
    const N = somme(effs);
    const der = cats.length - 1;
    const t = pick([
      `${c.sujet} Sur ${fr(N)} ${c.ind}, ${listeCats(cats.slice(0, der), effs.slice(0, der))}, et les autres ${cats[der].pred}. Combien ${deNu(c.ind)} ${cats[der].pred} ?`,
      `${c.sujet} Il y a ${fr(N)} ${c.ind} en tout : ${listeCats(cats.slice(0, der), effs.slice(0, der))} ; ${femInd(c.ind) ? "toutes" : "tous"} les autres ${cats[der].pred}. Combien ${deNu(c.ind)} ${cats[der].pred} ?`,
    ]);
    const connus = somme(effs.slice(0, der));
    return num(t, effs[der], expl("la somme des effectifs est l'effectif total.", "on retire du total les effectifs connus.", `${fr(N)} − ${fr(connus)} = ${fr(effs[der])}.`, `${fr(effs[der])} ${c.ind} ${cats[der].pred}.`));
  }),
  gab("effectif_frequence_decimale", MICRO_EF, 2, "Fréquence = effectif ÷ effectif total.", ["frequence", "decimal"], () => {
    const c = pick(ENQUETES);
    const N = pick([10, 20, 25, 40, 50, 100]);
    const cats = sample(c.cats, 4);
    const effs = effectifsDeTotal(4, N, (xs) => xs.every((v) => exact2(v / N)));
    const i = rnd(0, 3);
    const f = effs[i] / N;
    const t = pick([
      `${c.sujet} Sur ${fr(N)} ${c.ind}, ${fr(effs[i])} ${cats[i].pred}. Quelle est la fréquence de cette réponse, en écriture décimale ?`,
      `${c.sujet} D'après le tableau, quelle est la fréquence de la réponse « ${cats[i].l} » ? Donne-la en écriture décimale.`,
      `${c.sujet} Calcule la fréquence ${deNu(c.ind)} qui ${cats[i].pred} (écriture décimale).`,
    ]);
    return num(t, f, expl("fréquence = effectif ÷ effectif total.", `effectif de « ${cats[i].l} » : ${fr(effs[i])} ; effectif total : ${fr(N)}.`, `${fr(effs[i])} ÷ ${fr(N)} = ${fr(f)}.`, `la fréquence est ${fr(f)}.`), tabEnquete(cats, effs));
  }),
  gab("effectif_frequence_qcm", MICRO_EF, 2, "Divise l'effectif par l'effectif TOTAL, pas par un autre effectif.", ["frequence", "qcm"], () => {
    const c = pick(ENQUETES);
    const N = pick([20, 25, 40, 50]);
    const cats = sample(c.cats, 4);
    const effs = effectifsDeTotal(4, N, (xs) => xs.every((v) => exact2(v / N)));
    const i = rnd(0, 3);
    const j = (i + 1) % 4;
    const f = effs[i] / N;
    const t = `${c.sujet} D'après le tableau, quelle est la fréquence de la réponse « ${cats[i].l} » ?`;
    return qcmNum(t, f, [effs[i] / 100, r2(effs[i] / effs[j]), r2(N / effs[i]), effs[j] / N, r2(effs[i] / (N - effs[i]))].filter(exact2), expl("fréquence = effectif ÷ effectif total.", `effectif total : ${effs.map(fr).join(" + ")} = ${fr(N)}.`, `${fr(effs[i])} ÷ ${fr(N)} = ${fr(f)}.`, `la fréquence de « ${cats[i].l} » est ${fr(f)}.`), tabEnquete(cats, effs));
  }),
  gab("effectif_frequence_graphique", MICRO_EF, 2, "Lis les effectifs sur l'axe, calcule le total, puis effectif ÷ total.", ["frequence", "graphique", "canvas"], () => {
    const c = pick(ENQUETES);
    let r = enqueteSurAxe(c, 4);
    for (let essai = 0; essai < 50 && !r.effs.every((v) => exact2(v / somme(r.effs))); essai++) r = enqueteSurAxe(c, 4);
    if (!r.effs.every((v) => exact2(v / somme(r.effs)))) { r.effs = [2, 4, 6, 8].map((v) => v * r.step / 2); }
    const { cats, effs, step } = r;
    const N = somme(effs);
    const i = rnd(0, 3);
    const f = effs[i] / N;
    const t = `${c.sujet} ${pick(LIS_AXE)} Quelle est la fréquence de la réponse « ${cats[i].l} », en écriture décimale ?`;
    return num(t, f, expl("fréquence = effectif ÷ effectif total.", "on lit chaque barre, on calcule le total.", `total : ${effs.map(fr).join(" + ")} = ${fr(N)} ; ${fr(effs[i])} ÷ ${fr(N)} = ${fr(f)}.`, `la fréquence est ${fr(f)}.`), graphe(cats.map((x) => x.l), effs, { axe: { step, axeY: c.ind } }));
  }),

  gab("effectif_frequence_pourcentage", MICRO_EF, 3, "Pourcentage = effectif ÷ effectif total × 100.", ["frequence", "pourcentage"], () => {
    const c = pick(ENQUETES);
    const N = pick([20, 25, 40, 50, 80, 200, 250, 400, 500].filter((x) => x <= Math.max(50, c.max * 6)));
    const cats = sample(c.cats, 4);
    const effs = effectifsDeTotal(4, N, (xs) => xs.every((v) => auDixieme((v * 100) / N)));
    const i = rnd(0, 3);
    const p = (effs[i] * 100) / N;
    const t = pick([
      `${c.sujet} Sur ${fr(N)} ${c.ind}, ${fr(effs[i])} ${cats[i].pred}. Quel pourcentage ${deNu(c.ind)} cela représente-t-il ?`,
      `${c.sujet} D'après le tableau, quel pourcentage ${deNu(c.ind)} ${cats[i].pred} ?`,
      `${c.sujet} Exprime en % la fréquence de la réponse « ${cats[i].l} ».`,
    ]);
    return num(t, p, expl("une fréquence en % est effectif ÷ effectif total × 100.", `effectif total : ${fr(N)}.`, `${fr(effs[i])} ÷ ${fr(N)} × 100 = ${fr(p)}.`, `${fr(p)} % ${deNu(c.ind)} ${cats[i].pred}.`), tabEnquete(cats, effs));
  }),
  gab("effectif_frequence_depuis_pourcent", MICRO_EF, 3, "Effectif = effectif total × pourcentage ÷ 100.", ["effectif", "pourcentage"], () => {
    const c = pick(ENQUETES);
    const cat = pick(c.cats);
    let p = 0, N2 = 0;
    do { p = pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 60, 75]); N2 = 20 * rnd(2, Math.max(3, Math.floor((c.max * 6) / 20))); }
    while (!Number.isInteger((N2 * p) / 100));
    const v = (N2 * p) / 100;
    const t = pick([
      `${c.sujet} Sur ${fr(N2)} ${c.ind}, ${fr(p)} % ${cat.pred}. Combien ${deNu(c.ind)} cela fait-il ?`,
      `${c.sujet} En tout, ${fr(N2)} ${c.ind} ; parmi ${femInd(c.ind) ? "elles" : "eux"}, ${fr(p)} % ${cat.pred}. Calcule leur nombre.`,
      `${c.sujet} La fréquence de la réponse « ${cat.l} » est ${fr(p)} %, pour ${fr(N2)} ${c.ind} au total. Quel est son effectif ?`,
    ]);
    return num(t, v, expl("prendre p % d'un nombre, c'est le multiplier par p puis diviser par 100.", `${fr(p)} % de ${fr(N2)}.`, `${fr(N2)} × ${fr(p)} ÷ 100 = ${fr(v)}.`, `${fr(v)} ${c.ind} ${cat.pred}.`));
  }),
  gab("effectif_frequence_pourcent_graphique", MICRO_EF, 3, "Lis les barres, calcule le total, puis effectif ÷ total × 100.", ["frequence", "pourcentage", "graphique", "canvas"], () => {
    const c = pick(ENQUETES);
    let r = enqueteSurAxe(c, 4);
    for (let essai = 0; essai < 80 && !r.effs.every((v) => auDixieme((v * 100) / somme(r.effs))); essai++) r = enqueteSurAxe(c, 4);
    if (!r.effs.every((v) => auDixieme((v * 100) / somme(r.effs)))) r.effs = [1, 2, 3, 4].map((v) => v * r.step);
    const { cats, effs, step } = r;
    const N = somme(effs);
    const i = rnd(0, 3);
    const p = (effs[i] * 100) / N;
    const t = pick([
      `${c.sujet} ${pick(LIS_AXE)} Quel pourcentage ${deNu(c.ind)} ${cats[i].pred} ?`,
      `${c.sujet} D'après le diagramme, quelle est la fréquence, en %, de la réponse « ${cats[i].l} » ?`,
    ]);
    return num(t, p, expl("fréquence en % = effectif ÷ effectif total × 100.", "on lit chaque barre sur l'axe et on calcule le total.", `total : ${effs.map(fr).join(" + ")} = ${fr(N)} ; ${fr(effs[i])} ÷ ${fr(N)} × 100 = ${fr(p)}.`, `${fr(p)} %.`), graphe(cats.map((x) => x.l), effs, { axe: { step, axeY: c.ind } }));
  }),
  gab("effectif_frequence_cumulee", MICRO_EF, 4, "Additionne les effectifs concernés, puis ÷ effectif total × 100.", ["frequence", "cumulee", "pourcentage"], () => {
    const c = pick(EFFECTIFS.filter((x) => x.avec));
    const N = pick([20, 25, 40, 50]);
    let vals: number[] = [], effs: number[] = [];
    do ({ vals, effs } = tirerEffectifs(c, 4, 1, 20)); while (somme(effs.slice(0, 3)) >= N);
    effs[3] = N - somme(effs.slice(0, 3));
    const v = pick([...vals.slice(1, -1).filter((x) => x >= 2), vals[2]]);
    const [mot, test] = pick([
      ["au plus", (x: number) => x <= v],
      ["au moins", (x: number) => x >= v],
    ] as const);
    const garde = vals.map((x, j) => (test(x) ? j : -1)).filter((j) => j >= 0);
    const n = somme(garde.map((j) => effs[j]));
    const p = (n * 100) / N;
    const phrase = c.avec!.replace("N", `${mot} ${v}`);
    const t = pick([
      `${introEff(c, N)}. Quel pourcentage ${deNu(c.ind)} ${phrase} ?`,
      `${introEff(c, N)}. D'après le tableau, quelle est la fréquence, en %, des ${c.ind} qui ${phrase} ?`,
    ]);
    return num(t, p, expl("une fréquence cumulée additionne les effectifs de plusieurs valeurs avant de diviser par le total.", `« ${mot} ${v} » : valeurs ${garde.map((j) => fr(vals[j])).join(", ")}.`, `${garde.map((j) => fr(effs[j])).join(" + ")} = ${fr(n)} ; ${fr(n)} ÷ ${fr(N)} × 100 = ${fr(p)}.`, `${fr(p)} % ${deNu(c.ind)} ${phrase}.`), tableauEffectifs(c.carac, vals, effs));
  }),
  gab("effectif_frequence_comparer", MICRO_EF, 4, "Compare les FRÉQUENCES (en %), pas les effectifs : les groupes n'ont pas la même taille.", ["frequence", "comparer", "qcm"], () => {
    const c = pick(ENQUETES);
    const cat = pick(c.cats);
    let N1 = 0, N2 = 0, a = 0, b = 0;
    const piege = Math.random() < 0.6;
    do {
      N1 = pick([20, 25, 40, 50]); N2 = pick([20, 25, 40, 50].filter((x) => x !== N1));
      a = rnd(2, N1 - 2); b = rnd(2, N2 - 2);
    } while (!auDixieme((a * 100) / N1) || !auDixieme((b * 100) / N2) || Math.abs(a / N1 - b / N2) < 0.04 || a === b || (piege && (a > b) === (a / N1 > b / N2)));
    const pA = (a * 100) / N1, pB = (b * 100) / N2;
    const bon = pA > pB ? c.g[0].l : c.g[1].l;
    const t = `${c.sujet} ${cap(c.g[0].p)}, ${fr(a)} ${c.ind} sur ${fr(N1)} ${cat.pred} ; ${c.g[1].p}, ${fr(b)} sur ${fr(N2)}. Dans quel groupe la proportion ${deNu(c.ind)} qui ${cat.pred} est-elle la plus forte ?`;
    return qcmTexte(t, bon, [c.g[0].l, c.g[1].l, "Elle est la même dans les deux groupes"], expl("pour comparer deux groupes de tailles différentes, on compare des fréquences.", "on calcule la fréquence en % dans chaque groupe.", `${c.g[0].l} : ${fr(a)} ÷ ${fr(N1)} × 100 = ${fr(pA)} % ; ${c.g[1].l} : ${fr(b)} ÷ ${fr(N2)} × 100 = ${fr(pB)} %.`, `la proportion est la plus forte dans le groupe « ${bon} »${(a > b) === (pA > pB) ? "" : ", même si son effectif est le plus petit"}.`));
  }),
  gab("effectif_frequence_total_depuis_part", MICRO_EF, 4, "Si p % du total valent n, le total vaut n × 100 ÷ p.", ["effectif_total", "pourcentage"], () => {
    const c = pick(ENQUETES);
    const cat = pick(c.cats);
    const p = pick([5, 10, 20, 25, 40, 50]);
    const N = (100 / p) * rnd(3, Math.max(4, Math.floor((c.max * 6 * p) / 100)));
    const n = (N * p) / 100;
    const t = pick([
      `${c.sujet} Les ${fr(n)} ${c.ind} qui ${cat.pred} représentent ${fr(p)} % du total. Combien ${deNu(c.ind)} ont été ${femInd(c.ind) ? "comptées" : "comptés"} en tout ?`,
      `${c.sujet} La réponse « ${cat.l} » a un effectif de ${fr(n)} et une fréquence de ${fr(p)} %. Quel est l'effectif total ?`,
    ]);
    return num(t, N, expl("effectif = total × p ÷ 100, donc total = effectif × 100 ÷ p.", `${fr(n)} correspond à ${fr(p)} % du total.`, `${fr(n)} × 100 ÷ ${fr(p)} = ${fr(N)}.`, `l'effectif total est ${fr(N)}.`));
  }),
];

/* =========================================================================
   STAT_MOYENNE — moyenne simple, pondérée par des effectifs ou des
   coefficients, valeur manquante, deux groupes réunis, erreur de saisie.
========================================================================= */
const MICRO_MO = "stat_moyenne";
const DEMANDE_MOY = (c: Serie) => [
  `Calcule la moyenne de ${c.q}.`,
  `Quelle est la valeur moyenne de ${c.q} ?`,
  `Quelle est la moyenne de cette série ?`,
];
/** Effectifs dont la moyenne pondérée tombe au dixième. */
function effectifsMoyenneDixieme(c: Eff, k: number, eMin: number, eMax: number) {
  for (let essai = 0; essai < 300; essai++) {
    const r = tirerEffectifs(c, k, eMin, eMax);
    const m = somme(r.vals.map((v, j) => v * r.effs[j])) / somme(r.effs);
    if (auDixieme(m)) return { ...r, m };
  }
  const r = tirerEffectifs(c, k, 2, 2);
  return { ...r, m: somme(r.vals) / r.vals.length };
}
const produits = (vals: number[], effs: number[]) => vals.map((v, j) => `${fr(v)} × ${fr(effs[j])}`).join(" + ");

const moyenne: TutorBankItemV4[] = [
  {
    kind: "fixed", id: "3e_stat_moyenne_fixed_1", niveau: "3e", matiere: "maths", notionId: "stat_statistique", microId: MICRO_MO,
    difficulty: 2, theme: "neutral",
    text: "Pour calculer la moyenne d'une série de valeurs, que fait-on ?",
    format: "qcm",
    choices: ["on additionne les valeurs, puis on divise par le nombre de valeurs", "on prend la valeur du milieu", "on soustrait la plus petite valeur à la plus grande", "on prend la valeur la plus fréquente"],
    expected: ["on additionne les valeurs, puis on divise par le nombre de valeurs"],
    comparator: "mcq_exact",
    hint: "Moyenne = somme des valeurs ÷ nombre de valeurs.",
    explanation: expl("la moyenne est la somme des valeurs divisée par leur nombre.", "on additionne, puis on divise.", "par exemple (8 + 12 + 10) ÷ 3 = 10.", "moyenne = somme ÷ nombre de valeurs. (Le milieu, c'est la médiane ; l'écart max − min, l'étendue.)"),
    tags: ["stat_statistique", "moyenne", "definition", "qcm"],
  },
  gab("moyenne_liste", MICRO_MO, 2, "Additionne toutes les valeurs, puis divise par leur nombre.", ["moyenne", "liste"], () => {
    const c = pick(SERIES);
    const n = rnd(5, 8);
    const xs = valeursMoyenne(c, n);
    const S = somme(xs), m = S / n;
    const t = `${introSerie(c, n)} : ${liste(xs)}. ${pick(DEMANDE_MOY(c))}`;
    return num(t, m, expl("moyenne = somme des valeurs ÷ nombre de valeurs.", `on additionne les ${n} valeurs, puis on divise par ${n}.`, `${xs.map(fr).join(" + ")} = ${fr(S)} ; ${fr(S)} ÷ ${n} = ${fr(m)}.`, `la moyenne est ${fr(m)}${uniteDe(c)}.`));
  }),
  gab("moyenne_qcm", MICRO_MO, 2, "Moyenne = somme ÷ nombre de valeurs (pas la valeur du milieu).", ["moyenne", "qcm"], () => {
    const c = pick(SERIES);
    const n = pick([5, 7]);
    let xs = valeursMoyenne(c, n);
    for (let essai = 0; essai < 30 && medianeDe(xs) === somme(xs) / n; essai++) xs = valeursMoyenne(c, n);
    const S = somme(xs), m = S / n;
    const t = pick([
      `${introSerie(c, n)} : ${liste(xs)}. Quelle est la moyenne de ${c.q} ?`,
      `${introSerie(c, n)}. Ses relevés : ${liste(xs)}. Quelle proposition donne la moyenne ?`,
    ]);
    return qcmNum(t, m, [medianeDe(xs), S, r2(S / (n - 1)), (Math.min(...xs) + Math.max(...xs)) / 2, xs[(n - 1) / 2]], expl("moyenne = somme ÷ nombre de valeurs.", `il y a ${n} valeurs.`, `${fr(S)} ÷ ${n} = ${fr(m)}.`, `la moyenne est ${fr(m)}${uniteDe(c)} (la valeur du milieu de la série rangée est la médiane, ${fr(medianeDe(xs))}).`));
  }),
  gab("moyenne_effectifs", MICRO_MO, 3, "Multiplie chaque valeur par son effectif, additionne, puis divise par l'effectif TOTAL.", ["moyenne", "ponderee", "tableau"], () => {
    const c = pick(EFFECTIFS);
    const { vals, effs, m } = effectifsMoyenneDixieme(c, rnd(4, 5), 1, 12);
    const N = somme(effs), S = somme(vals.map((v, j) => v * effs[j]));
    const t = pick([
      `${introEff(c, N)}. Calcule ${c.moy}.`,
      `${introEff(c, N)} (voir le tableau). Quelle est la moyenne de cette série ?`,
      `${introEff(c, N)}. Quelle est la moyenne de la série donnée par le tableau ?`,
    ]);
    return num(t, m, expl("dans une série à effectifs, chaque valeur compte autant de fois que son effectif.", "moyenne = (somme des valeur × effectif) ÷ effectif total.", `${produits(vals, effs)} = ${fr(S)} ; ${fr(S)} ÷ ${fr(N)} = ${fr(m)}.`, `${c.moy} est ${fr(m)}.`), tableauEffectifs(c.carac, vals, effs));
  }),
  gab("moyenne_batons", MICRO_MO, 3, "Chaque bâton : valeur × effectif. Puis divise par l'effectif total.", ["moyenne", "ponderee", "graphique", "canvas"], () => {
    const c = pick(EFFECTIFS);
    const { vals, effs, m } = effectifsMoyenneDixieme(c, rnd(4, 5), 1, 10);
    const N = somme(effs), S = somme(vals.map((v, j) => v * effs[j]));
    const t = pick([
      `${introEff(c, N)}. Le diagramme en bâtons donne l'effectif de chaque valeur. Calcule ${c.moy}.`,
      `${introEff(c, N)}. Lis l'effectif de chaque valeur sur l'axe gradué, puis calcule la moyenne de la série.`,
    ]);
    return num(t, m, expl("une moyenne pondérée tient compte des effectifs.", "on lit chaque effectif, on fait valeur × effectif, on additionne, on divise par le total.", `${produits(vals, effs)} = ${fr(S)} ; ${fr(S)} ÷ ${fr(N)} = ${fr(m)}.`, `${c.moy} est ${fr(m)}.`), graphe(vals.map(fr), effs, { type: "batons", axe: { step: 2, axeY: c.ind } }));
  }),
  gab("moyenne_piege_effectifs", MICRO_MO, 3, "Ne fais pas la moyenne des seules valeurs : chacune compte autant de fois que son effectif.", ["moyenne", "ponderee", "qcm", "piege"], () => {
    const c = pick(EFFECTIFS);
    let r = effectifsMoyenneDixieme(c, 4, 1, 12);
    for (let essai = 0; essai < 30 && Math.abs(r.m - somme(r.vals) / 4) < 1e-9; essai++) r = effectifsMoyenneDixieme(c, 4, 1, 12);
    const { vals, effs, m } = r;
    const N = somme(effs), S = somme(vals.map((v, j) => v * effs[j]));
    const t = `${introEff(c, N)}. ${/^la /.test(c.moy) ? "Quelle" : "Quel"} est ${c.moy} ?`;
    return qcmNum(t, m, [r2(somme(vals) / 4), r2(S / 4), r2(N / 4), r2(somme(effs.map((x, j) => x + vals[j])) / N)], expl("dans une série à effectifs, on pondère chaque valeur par son effectif.", "moyenne = (somme des valeur × effectif) ÷ effectif total.", `${produits(vals, effs)} = ${fr(S)} ; ${fr(S)} ÷ ${fr(N)} = ${fr(m)}.`, `${c.moy} est ${fr(m)} (et non ${fr(r2(somme(vals) / 4))}, la moyenne des quatre valeurs sans leurs effectifs).`), tableauEffectifs(c.carac, vals, effs));
  }),

  gab("moyenne_coefficients", MICRO_MO, 4, "Note × coefficient pour chaque ligne, on additionne, puis on divise par la SOMME des coefficients.", ["moyenne", "ponderee", "coefficients"], () => {
    const c = pick(COEFS);
    const crits = sample(c.crits, rnd(3, 4));
    let coefs: number[] = [], notes: number[] = [];
    for (let essai = 0; essai < 500; essai++) {
      coefs = crits.map(() => rnd(1, 4));
      notes = crits.map(() => rnd(c.min, c.max));
      if (new Set(coefs).size > 1 && auDixieme(somme(notes.map((x, j) => x * coefs[j])) / somme(coefs))) break;
    }
    if (!auDixieme(somme(notes.map((x, j) => x * coefs[j])) / somme(coefs))) notes = notes.map(() => notes[0]);
    const C = somme(coefs);
    const mm = somme(notes.map((x, j) => x * coefs[j])) / C;
    const detail = crits.map((x, j) => `${x} : ${fr(notes[j])} (coefficient ${coefs[j]})`).join(" ; ");
    const t = pick([
      `${c.sujet} ${cap(detail)}. Quelle est la moyenne pondérée par les coefficients ?`,
      `${c.sujet} Notes et coefficients : ${detail}. Calcule la note finale (moyenne coefficientée).`,
    ]);
    const S2 = somme(notes.map((x, j) => x * coefs[j]));
    return num(t, mm, expl("une moyenne coefficientée compte chaque note autant de fois que son coefficient.", "moyenne = (somme des note × coefficient) ÷ somme des coefficients.", `${notes.map((x, j) => `${fr(x)} × ${coefs[j]}`).join(" + ")} = ${fr(S2)} ; somme des coefficients : ${C} ; ${fr(S2)} ÷ ${C} = ${fr(mm)}.`, `la moyenne coefficientée est ${fr(mm)} sur ${c.sur}.`));
  }),
  gab("moyenne_decimale_arrondie", MICRO_MO, 4, "Additionne les décimaux avec soin, divise, puis arrondis au dixième.", ["moyenne", "decimaux", "arrondi"], () => {
    const c = pick(DECIMALES);
    const n = rnd(5, 7);
    let xs: number[] = [];
    do xs = Array.from({ length: n }, () => rnd(c.min * 10, c.max * 10) / 10);
    while (auDixieme(somme(xs.map((x) => Math.round(x * 10))) / n / 10));
    const S10 = somme(xs.map((x) => Math.round(x * 10)));
    const m = Math.round(S10 / n) / 10;
    const t = pick([
      `${c.sujet(n)} : ${liste(xs)}. Calcule la moyenne de ces valeurs, arrondie au dixième.`,
      `${c.sujet(n)} : ${liste(xs)}. Quelle est la moyenne, arrondie au dixième ?`,
    ]);
    return num(t, m, expl("moyenne = somme ÷ nombre de valeurs ; on arrondit seulement à la fin.", `on additionne les ${n} valeurs, on divise par ${n}, on garde un chiffre après la virgule.`, `somme : ${fr(S10 / 10)} ; ${fr(S10 / 10)} ÷ ${n} ≈ ${String(S10 / n / 10).replace(".", ",").slice(0, 6)} ; arrondi au dixième : ${fr(m)}.`, `la moyenne est environ ${fr(m)}${c.u ? " " + c.u : ""}.`));
  }),
  gab("moyenne_valeur_manquante", MICRO_MO, 5, "Somme visée = moyenne × nombre de valeurs ; la valeur manquante = somme visée − somme connue.", ["moyenne", "valeur_manquante"], () => {
    const c = pick(SERIES.filter((x) => !x.neg));
    const n = rnd(5, 7);
    let xs: number[] = [], m = 0, x = 0;
    for (let essai = 0; essai < 500; essai++) {
      xs = Array.from({ length: n - 1 }, () => rnd(c.min, c.max));
      m = rnd(c.min + 2, c.max - 2);
      x = n * m - somme(xs);
      if (x >= c.min && x <= c.max) break;
    }
    const t = pick([
      `${introSerie(c, n)}. Les ${n - 1} premières valeurs sont : ${liste(xs)}. Quelle doit être la dernière pour que la moyenne soit égale à ${fr(m)} ?`,
      `${introSerie(c, n)}. Une valeur a été effacée ; les autres sont ${liste(xs)}, et la moyenne des ${n} valeurs est ${fr(m)}. Retrouve la valeur effacée.`,
    ]);
    return num(t, x, expl("moyenne × nombre de valeurs = somme des valeurs.", `la somme des ${n} valeurs doit être ${fr(m)} × ${n} = ${fr(n * m)}.`, `${fr(n * m)} − (${xs.map(fr).join(" + ")}) = ${fr(n * m)} − ${fr(somme(xs))} = ${fr(x)}.`, `la valeur cherchée est ${fr(x)}${uniteDe(c)}.`));
  }),
  gab("moyenne_deux_groupes", MICRO_MO, 5, "La moyenne de deux groupes n'est PAS la moyenne des deux moyennes : pondère par les tailles.", ["moyenne", "ponderee", "groupes"], () => {
    const c = pick(GROUPES);
    let n1 = 0, n2 = 0, m1 = 0, m2 = 0, M = 0;
    for (let essai = 0; essai < 500; essai++) {
      n1 = rnd(c.nMin, c.nMax); n2 = rnd(c.nMin, c.nMax);
      m1 = rnd(c.min * 2, c.max * 2) / 2; m2 = rnd(c.min * 2, c.max * 2) / 2;
      M = (n1 * m1 + n2 * m2) / (n1 + n2);
      if (n1 !== n2 && m1 !== m2 && auDixieme(M)) break;
    }
    const t = pick([
      `${c.sujet} Les ${n1} ${c.g1} ont ${c.q} de ${fr(m1)} ${c.u} ; les ${n2} ${c.g2}, de ${fr(m2)} ${c.u}. ${/^une /.test(c.q) ? "Quelle" : "Quel"} est ${c.q.replace(/^une? ([aeiouâé])/, "l'$1").replace(/^une /, "la ").replace(/^un /, "le ")} de l'ensemble des ${n1 + n2} ${c.ind} ?`,
      `${c.sujet} Groupe 1 : ${n1} ${c.g1}, moyenne ${fr(m1)} ${c.u}. Groupe 2 : ${n2} ${c.g2}, moyenne ${fr(m2)} ${c.u}. Calcule la moyenne des deux groupes réunis.`,
    ]);
    return num(t, M, expl("la somme des valeurs d'un groupe est sa moyenne × son effectif.", "on retrouve les deux sommes, on les ajoute, on divise par l'effectif total.", `${fr(m1)} × ${n1} + ${fr(m2)} × ${n2} = ${fr(n1 * m1)} + ${fr(n2 * m2)} = ${fr(n1 * m1 + n2 * m2)} ; ${fr(n1 * m1 + n2 * m2)} ÷ ${n1 + n2} = ${fr(M)}.`, `la moyenne de l'ensemble est ${fr(M)} ${c.u} (pas ${fr(r2((m1 + m2) / 2))}, la moyenne des deux moyennes).`));
  }),
  gab("moyenne_erreur_saisie", MICRO_MO, 5, "Corrige la SOMME : retire la valeur fausse, ajoute la bonne, puis divise.", ["moyenne", "correction"], () => {
    const c = pick(SERIES.filter((x) => !x.neg && x.max >= 20));
    const n = pick([5, 8, 10]);
    let xs: number[] = [], vrai = 0, faux = 0;
    for (let essai = 0; essai < 300; essai++) {
      xs = valeursMoyenne(c, n);
      vrai = xs[rnd(0, n - 1)];
      const ch = String(vrai);
      faux = ch.length >= 2 ? Number(ch.split("").reverse().join("")) : vrai * 10;
      if (faux !== vrai && auDixieme((somme(xs) - vrai + faux) / n)) break;
    }
    const Mfaux = (somme(xs) - vrai + faux) / n, Mvrai = somme(xs) / n;
    const t = `${introSerie(c, n)}. En recopiant, une valeur ${fr(vrai)} a été tapée ${fr(faux)}, et le tableur affiche une moyenne de ${fr(Mfaux)}. Quelle est la vraie moyenne ?`;
    return num(t, Mvrai, expl("moyenne × nombre de valeurs = somme.", `somme affichée : ${fr(Mfaux)} × ${n} = ${fr(Mfaux * n)} ; on remplace ${fr(faux)} par ${fr(vrai)}.`, `${fr(Mfaux * n)} − ${fr(faux)} + ${fr(vrai)} = ${fr(Mvrai * n)} ; ${fr(Mvrai * n)} ÷ ${n} = ${fr(Mvrai)}.`, `la vraie moyenne est ${fr(Mvrai)}${uniteDe(c)}.`));
  }),
];

/* Moyennes coefficientées : un jury, des critères, des notes sur `sur`. */
type Coef = { sujet: string; crits: string[]; min: number; max: number; sur: number };
const COEFS: Coef[] = [
  { sujet: "Au brevet blanc, Inès a obtenu ces notes, sur 20.", crits: ["maths", "français", "sciences", "histoire-géo", "anglais"], min: 6, max: 19, sur: 20 },
  { sujet: "Un jury de concours de pâtisserie note le gâteau de Malik, sur 20.", crits: ["goût", "présentation", "originalité", "technique"], min: 8, max: 19, sur: 20 },
  { sujet: "Une DRH note une candidate à un poste de technicienne, sur 20.", crits: ["entretien", "test pratique", "dossier", "mise en situation"], min: 7, max: 18, sur: 20 },
  { sujet: "Un jury de danse note la chorégraphie d'un groupe, sur 10.", crits: ["rythme", "technique", "expression", "costumes"], min: 4, max: 10, sur: 10 },
  { sujet: "Une critique gastronomique note un restaurant, sur 10.", crits: ["cuisine", "service", "cadre", "prix"], min: 3, max: 10, sur: 10 },
  { sujet: "Le jury d'un hackathon note le projet d'une équipe de lycéennes, sur 20.", crits: ["idée", "code", "présentation", "utilité"], min: 8, max: 20, sur: 20 },
  { sujet: "Une tutrice d'entreprise note le stage de Yanis, sur 20.", crits: ["ponctualité", "rapport", "oral", "travail en équipe"], min: 9, max: 19, sur: 20 },
  { sujet: "Un jury de concours de chorale note une prestation, sur 10.", crits: ["justesse", "ensemble", "interprétation", "choix du répertoire"], min: 4, max: 10, sur: 10 },
  { sujet: "Une architecte note un projet de cabane écologique, sur 20.", crits: ["solidité", "coût", "esthétique", "matériaux"], min: 7, max: 19, sur: 20 },
];

/* Séries à une décimale (moyenne arrondie au dixième). */
type Deci = { sujet: (n: number) => string; u: string; min: number; max: number };
const DECIMALES: Deci[] = [
  { sujet: (n) => `Une entraîneuse d'athlétisme chronomètre ${n} sprinteuses sur 100 m, en secondes`, u: "s", min: 11.5, max: 14.2 },
  { sujet: (n) => `Une sage-femme note la masse, en kg, de ${n} nouveau-nés`, u: "kg", min: 2.6, max: 4.3 },
  { sujet: (n) => `Un biologiste mesure le pH de l'eau d'un lac en ${n} points`, u: "", min: 6.1, max: 8.2 },
  { sujet: (n) => `Une pêcheuse mesure la longueur, en cm, de ${n} truites`, u: "cm", min: 23.5, max: 38.5 },
  { sujet: (n) => `Un mécanicien relève la consommation, en litres aux 100 km, de ${n} voitures`, u: "L", min: 4.2, max: 8.4 },
  { sujet: (n) => `Une professeure d'EPS mesure le saut en longueur, en m, de ${n} élèves`, u: "m", min: 3.1, max: 5.4 },
  { sujet: (n) => `Un caviste relève le degré d'alcool de ${n} cidres`, u: "degrés", min: 2.5, max: 6.5 },
  { sujet: (n) => `Une infirmière relève la température, en °C, de ${n} patients`, u: "°C", min: 36.2, max: 39.4 },
  { sujet: (n) => `Un joaillier pèse, en grammes, ${n} pépites d'or`, u: "g", min: 1.2, max: 6.8 },
  { sujet: (n) => `Une ingénieure relève la vitesse du vent, en m par seconde, en ${n} jours`, u: "m par s", min: 2.1, max: 9.8 },
];

/* Deux groupes à réunir : g1, g2 au pluriel ; q = « la note moyenne ». */
type Groupes = { sujet: string; g1: string; g2: string; ind: string; q: string; u: string; min: number; max: number; nMin: number; nMax: number };
const GROUPES: Groupes[] = [
  { sujet: "Un contrôle commun de maths est noté sur 20.", g1: "élèves de 3e A", g2: "élèves de 3e B", ind: "élèves", q: "une note moyenne", u: "points", min: 9, max: 15, nMin: 22, nMax: 30 },
  { sujet: "Un club de randonnée compare l'âge de ses adhérents.", g1: "marcheurs du samedi", g2: "marcheurs du dimanche", ind: "adhérents", q: "un âge moyen", u: "ans", min: 32, max: 61, nMin: 12, nMax: 40 },
  { sujet: "Une arboricultrice pèse les pommes de deux vergers.", g1: "pommes du verger nord", g2: "pommes du verger sud", ind: "pommes", q: "une masse moyenne", u: "g", min: 140, max: 210, nMin: 20, nMax: 60 },
  { sujet: "Un festival compare la durée d'écoute de son application.", g1: "abonnés gratuits", g2: "abonnés payants", ind: "abonnés", q: "une durée moyenne", u: "minutes", min: 20, max: 95, nMin: 30, nMax: 90 },
  { sujet: "Une urgentiste compare l'attente des patients la nuit et le jour.", g1: "patients de nuit", g2: "patients de jour", ind: "patients", q: "une attente moyenne", u: "minutes", min: 25, max: 110, nMin: 15, nMax: 60 },
  { sujet: "Un entraîneur de natation compare deux groupes au 50 m.", g1: "nageurs du groupe A", g2: "nageurs du groupe B", ind: "nageurs", q: "un temps moyen", u: "secondes", min: 28, max: 42, nMin: 6, nMax: 16 },
  { sujet: "Une libraire compare les achats de deux journées.", g1: "clients du samedi", g2: "clients du dimanche", ind: "clients", q: "une dépense moyenne", u: "euros", min: 12, max: 45, nMin: 20, nMax: 80 },
  { sujet: "Une sociologue compare le temps d'écran quotidien de deux classes.", g1: "élèves de 4e", g2: "élèves de 3e", ind: "élèves", q: "un temps d'écran moyen", u: "minutes", min: 90, max: 240, nMin: 20, nMax: 30 },
];

/* =========================================================================
   STAT_MEDIANE — série impaire, paire, rang de la médiane, série à
   effectifs (effectifs cumulés), diagramme en bâtons, valeur ajoutée.
========================================================================= */
const MICRO_ME = "stat_mediane";
const DEMANDE_MED = (c: Serie) => [
  `Quelle est la médiane de ${c.q} ?`,
  `Range les valeurs dans l'ordre croissant, puis donne la médiane.`,
  `Détermine la médiane de cette série.`,
];
function explMediane(xs: number[]): string {
  const s = tri(xs), n = s.length, m = medianeDe(xs);
  return n % 2
    ? expl("la médiane partage la série rangée en deux groupes de même effectif.", `on range les ${n} valeurs ; la médiane est la ${ieme((n + 1) / 2)} valeur.`, `${liste(s)} → ${ieme((n + 1) / 2)} valeur : ${fr(m)}.`, `la médiane est ${fr(m)}.`)
    : expl("la médiane partage la série rangée en deux groupes de même effectif.", `on range les ${n} valeurs (nombre pair) ; la médiane est la moyenne de la ${ieme(n / 2)} et de la ${ieme(n / 2 + 1)} valeur.`, `${liste(s)} → (${fr(s[n / 2 - 1])} + ${fr(s[n / 2])}) ÷ 2 = ${fr(m)}.`, `la médiane est ${fr(m)}.`);
}
/** Médiane d'une série à effectifs, expliquée par les effectifs cumulés. */
function explMedianeEffectifs(vals: number[], effs: number[]): string {
  const N = somme(effs);
  let c = 0;
  const cum = effs.map((x) => (c += x));
  const m = medianeDe(deplie(vals, effs));
  const rang = N % 2 ? `la ${ieme((N + 1) / 2)} valeur` : `la moyenne de la ${ieme(N / 2)} et de la ${ieme(N / 2 + 1)} valeur`;
  return expl("la médiane partage la série rangée en deux groupes de même effectif.", `effectif total ${fr(N)} : la médiane est ${rang}. Les effectifs cumulés situent ces rangs.`, `effectifs cumulés : ${cum.map(fr).join(" ; ")} (valeurs ${vals.map(fr).join(" ; ")}).`, `la médiane est ${fr(m)}.`);
}

const mediane: TutorBankItemV4[] = [
  gab("mediane_impaire", MICRO_ME, 2, "Range d'abord les valeurs ! Puis prends celle du milieu.", ["mediane", "impair"], () => {
    const c = pick(SERIES);
    const n = pick([5, 7, 9]);
    const xs = valeursDistinctes(c, n);
    const t = `${introSerie(c, n)} : ${liste(xs)}. ${pick(DEMANDE_MED(c))}`;
    return num(t, medianeDe(xs), explMediane(xs));
  }),
  gab("mediane_impaire_qcm", MICRO_ME, 2, "La valeur du milieu de la liste NON rangée n'est pas la médiane.", ["mediane", "impair", "qcm"], () => {
    const c = pick(SERIES);
    const n = pick([5, 7]);
    let xs = valeursDistinctes(c, n);
    for (let essai = 0; essai < 30 && xs[(n - 1) / 2] === medianeDe(xs); essai++) xs = valeursDistinctes(c, n);
    const s = tri(xs);
    const t = pick([`${introSerie(c, n)} : ${liste(xs)}. Quelle est la médiane de ${c.q} ?`, `${introSerie(c, n)}. Relevés : ${liste(xs)}. Quelle proposition donne la médiane ?`]);
    return qcmNum(t, medianeDe(xs), [xs[(n - 1) / 2], s[(n - 1) / 2 - 1], s[(n + 1) / 2], r2(somme(xs) / n)], explMediane(xs));
  }),
  gab("mediane_paire", MICRO_ME, 3, "Nombre pair de valeurs : la médiane est la moyenne des deux valeurs du milieu.", ["mediane", "pair"], () => {
    const c = pick(SERIES);
    const n = pick([6, 8, 10]);
    const xs = valeursDistinctes(c, n);
    const t = `${introSerie(c, n)} : ${liste(xs)}. ${pick(DEMANDE_MED(c))}`;
    return num(t, medianeDe(xs), explMediane(xs));
  }),
  gab("mediane_rang", MICRO_ME, 3, "N impair : rang (N + 1) ÷ 2. N pair : entre le rang N ÷ 2 et le suivant.", ["mediane", "rang"], () => {
    const c = pick(SERIES);
    const N = rnd(12, 65);
    if (N % 2) {
      const t = pick([
        `${introSerie(c, N)}, puis range les ${N} valeurs dans l'ordre croissant. Quel est le rang de la médiane ?`,
        `${introSerie(c, N)}. Une fois la série rangée, la médiane est la combientième valeur ?`,
      ]);
      return num(t, (N + 1) / 2, expl("pour un effectif impair N, la médiane est la valeur de rang (N + 1) ÷ 2.", `N = ${N}.`, `(${N} + 1) ÷ 2 = ${fr((N + 1) / 2)}.`, `la médiane est la ${ieme((N + 1) / 2)} valeur.`));
    }
    const bon = `la moyenne de la ${ieme(N / 2)} et de la ${ieme(N / 2 + 1)} valeur`;
    const t = `${introSerie(c, N)}, puis range les ${N} valeurs dans l'ordre croissant. Où se trouve la médiane ?`;
    return qcmTexte(t, bon, [`la ${ieme(N / 2)} valeur`, `la ${ieme(N / 2 + 1)} valeur`, `la moyenne de la ${ieme(N / 2 - 1)} et de la ${ieme(N / 2)} valeur`, `la ${ieme(N)} valeur`], expl("pour un effectif pair N, la médiane est la moyenne des valeurs de rang N ÷ 2 et N ÷ 2 + 1.", `N = ${N} ; ${N} ÷ 2 = ${N / 2}.`, `rangs ${N / 2} et ${N / 2 + 1}.`, `la médiane est ${bon}.`));
  }),
  gab("mediane_effectifs", MICRO_ME, 4, "Calcule l'effectif total, le rang du milieu, puis cherche ce rang avec les effectifs cumulés.", ["mediane", "effectifs", "tableau"], () => {
    const c = pick(EFFECTIFS);
    const { vals, effs } = tirerEffectifs(c, rnd(4, 5), 1, 12);
    const N = somme(effs);
    const t = pick([
      `${introEff(c, N)}. Quelle est la médiane de cette série ?`,
      `${introEff(c, N)} (tableau ci-dessous). Détermine la médiane de la série.`,
      `${introEff(c, N)}. À l'aide des effectifs cumulés, trouve la médiane.`,
    ]);
    return num(t, medianeDe(deplie(vals, effs)), explMedianeEffectifs(vals, effs), tableauEffectifs(c.carac, vals, effs));
  }),
  gab("mediane_batons", MICRO_ME, 4, "Lis les effectifs, calcule le total, puis repère la valeur du milieu.", ["mediane", "effectifs", "graphique", "canvas"], () => {
    const c = pick(EFFECTIFS);
    const { vals, effs } = tirerEffectifs(c, rnd(4, 5), 1, 10);
    const N = somme(effs);
    const t = pick([
      `${introEff(c, N)}. D'après le diagramme en bâtons, quelle est la médiane de la série ?`,
      `${introEff(c, N)}. Lis les effectifs sur l'axe gradué et détermine la médiane.`,
    ]);
    return num(t, medianeDe(deplie(vals, effs)), explMedianeEffectifs(vals, effs), graphe(vals.map(fr), effs, { type: "batons", axe: { step: 2, axeY: c.ind } }));
  }),
  gab("mediane_valeur_ajoutee", MICRO_ME, 5, "Ajoute la nouvelle valeur, range de nouveau, recompte : l'effectif a changé de parité.", ["mediane", "ajout"], () => {
    const c = pick(SERIES);
    const n = pick([5, 6, 7, 8]);
    const xs = valeursDistinctes(c, n + 1);
    const nouv = xs.pop()!;
    const tout = [...xs, nouv];
    const t = pick([
      `${introSerie(c, n)} : ${liste(xs)}. Une valeur arrive en retard : on ajoute ${fr(nouv)}. Quelle est la nouvelle médiane ?`,
      `${introSerie(c, n)} : ${liste(xs)}. On ajoute une ${ieme(n + 1)} valeur, ${fr(nouv)}. Quelle est la médiane des ${n + 1} valeurs ?`,
    ]);
    return num(t, medianeDe(tout), explMediane(tout));
  }),
  gab("mediane_cumules_grand", MICRO_ME, 5, "Avec un grand effectif, utilise les effectifs cumulés pour trouver le rang du milieu.", ["mediane", "effectifs_cumules", "tableau"], () => {
    const c = pick(EFFECTIFS);
    const { vals, effs } = tirerEffectifs(c, rnd(5, 6), 4, 30);
    const N = somme(effs);
    const t = pick([
      `${introEff(c, N)}. Le tableau donne aussi les effectifs cumulés. Quelle est la médiane ?`,
      `${introEff(c, N)}. Sers-toi des effectifs cumulés pour déterminer la médiane de la série.`,
    ]);
    return num(t, medianeDe(deplie(vals, effs)), explMedianeEffectifs(vals, effs), tableauEffectifs(c.carac, vals, effs, true));
  }),
];

/* Deux séries à comparer : deux personnes ou deux lieux (a, b), même grandeur. */
type Duo = { sujet: string; a: string; b: string; q: string; u: string; min: number; max: number };
const DUOS: Duo[] = [
  { sujet: "Une entraîneuse compare les points marqués par match par deux basketteuses.", a: "Lina", b: "Awa", q: "points", u: "points", min: 4, max: 30 },
  { sujet: "Un météorologue compare la température maximale, en °C, de deux villes pendant une semaine.", a: "Brest", b: "Nice", q: "températures", u: "°C", min: 8, max: 31 },
  { sujet: "Un boulanger compare les baguettes vendues chaque jour dans ses deux boutiques.", a: "Boutique Gare", b: "Boutique Port", q: "ventes", u: "baguettes", min: 90, max: 240 },
  { sujet: "Un entraîneur de tir à l'arc compare les points par volée de deux archers.", a: "Hugo", b: "Sami", q: "scores", u: "points", min: 12, max: 30 },
  { sujet: "Une ingénieure des transports compare le retard, en minutes, de deux lignes de bus.", a: "Ligne 1", b: "Ligne 2", q: "retards", u: "minutes", min: 0, max: 18 },
  { sujet: "Un professeur compare les notes, sur 20, de deux élèves sur le trimestre.", a: "Jade", b: "Noah", q: "notes", u: "", min: 4, max: 20 },
  { sujet: "Une responsable qualité compare les pièces défectueuses par jour dans deux usines.", a: "Usine A", b: "Usine B", q: "pièces défectueuses", u: "pièces", min: 0, max: 25 },
  { sujet: "Un maraîcher compare la récolte de tomates, en kg, de deux serres chaque semaine.", a: "Serre 1", b: "Serre 2", q: "récoltes", u: "kg", min: 20, max: 85 },
  { sujet: "Un pilote de kart compare ses temps au tour, en secondes, sur deux circuits.", a: "Circuit Nord", b: "Circuit Sud", q: "temps", u: "secondes", min: 42, max: 68 },
  { sujet: "Une coureuse de trail compare la distance parcourue, en km, chaque semaine de deux saisons.", a: "Printemps", b: "Automne", q: "distances", u: "km", min: 15, max: 70 },
  { sujet: "Un jury compare les notes, sur 50, de deux pianistes à cinq concours.", a: "Emma", b: "Malik", q: "notes", u: "", min: 25, max: 50 },
  { sujet: "Un glaciologue compare la fonte, en cm, de deux glaciers chaque mois d'été.", a: "Glacier blanc", b: "Mer de glace", q: "fontes", u: "cm", min: 5, max: 60 },
];
const etendueDe = (xs: number[]) => Math.max(...xs) - Math.min(...xs);
function explEtendue(xs: number[], u = ""): string {
  const M = Math.max(...xs), m = Math.min(...xs);
  return expl("l'étendue est la différence entre la plus grande et la plus petite valeur.", "on repère le maximum et le minimum (inutile de calculer autre chose).", `${fr(M)} − ${m < 0 ? `(${fr(m)})` : fr(m)} = ${fr(M - m)}.`, `l'étendue est ${fr(M - m)}${u}.`);
}

const MICRO_ET = "stat_etendue";
const DEMANDE_ET = (c: Serie) => [`Calcule l'étendue de ${c.q}.`, `Quelle est l'étendue de cette série ?`, `Quel écart sépare la plus grande et la plus petite valeur ?`];

const etendue: TutorBankItemV4[] = [
  {
    kind: "fixed", id: "3e_stat_etendue_fixed_1", niveau: "3e", matiere: "maths", notionId: "stat_statistique", microId: MICRO_ET,
    difficulty: 1, theme: "neutral",
    text: "Comment calcule-t-on l'étendue d'une série statistique ?",
    format: "qcm",
    choices: ["plus grande valeur − plus petite valeur", "plus grande valeur + plus petite valeur", "somme des valeurs ÷ nombre de valeurs", "la valeur du milieu de la série rangée"],
    expected: ["plus grande valeur − plus petite valeur"],
    comparator: "mcq_exact",
    hint: "L'étendue mesure l'écart entre les deux valeurs extrêmes.",
    explanation: expl("l'étendue est l'écart entre les valeurs extrêmes.", "maximum − minimum.", "par exemple 18 − 7 = 11.", "étendue = plus grande valeur − plus petite valeur."),
    tags: ["stat_statistique", "etendue", "definition", "qcm"],
  },
  gab("etendue_rangee", MICRO_ET, 1, "Étendue = dernière valeur − première valeur de la série rangée.", ["etendue"], () => {
    const c = pick(SERIES.filter((x) => !x.neg));
    const n = rnd(5, 8);
    const xs = tri(valeursDistinctes(c, n));
    const t = `${introSerie(c, n)}. Les valeurs, rangées dans l'ordre croissant : ${liste(xs)}. ${pick(DEMANDE_ET(c))}`;
    return num(t, etendueDe(xs), explEtendue(xs, uniteDe(c)));
  }),
  gab("etendue_extremes", MICRO_ET, 1, "Il suffit des deux valeurs extrêmes : la plus grande moins la plus petite.", ["etendue", "extremes"], () => {
    const c = pick(SERIES.filter((x) => !x.neg));
    const n = rnd(10, 40);
    const [m, M] = tri(valeursDistinctes(c, 2));
    const t = pick([
      `${introSerie(c, n)}. La plus grande valeur relevée est ${fr(M)}, la plus petite ${fr(m)}. Quelle est l'étendue de la série ?`,
      `${introSerie(c, n)}. Minimum : ${fr(m)} ; maximum : ${fr(M)}. Calcule l'étendue.`,
    ]);
    return num(t, M - m, explEtendue([m, M], uniteDe(c)));
  }),
  gab("etendue_non_rangee", MICRO_ET, 2, "Cherche le maximum et le minimum dans toute la liste (elle n'est pas rangée).", ["etendue", "relatifs"], () => {
    const c = Math.random() < 0.35 ? pick(SERIES.filter((x) => x.neg)) : pick(SERIES);
    const n = rnd(6, 9);
    const xs = valeursDistinctes(c, n);
    const t = `${introSerie(c, n)} : ${liste(xs)}. ${pick(DEMANDE_ET(c))}`;
    return num(t, etendueDe(xs), explEtendue(xs, uniteDe(c)));
  }),
  gab("etendue_qcm", MICRO_ET, 2, "Étendue = maximum − minimum, pas « dernière − première » d'une liste non rangée.", ["etendue", "qcm"], () => {
    const c = pick(SERIES);
    const n = rnd(5, 7);
    let xs = valeursDistinctes(c, n);
    for (let essai = 0; essai < 30 && (xs[0] === Math.min(...xs) || xs[n - 1] === Math.max(...xs)); essai++) xs = valeursDistinctes(c, n);
    const t = `${introSerie(c, n)} : ${liste(xs)}. Quelle est l'étendue de ${c.q} ?`;
    return qcmNum(t, etendueDe(xs), [Math.abs(xs[n - 1] - xs[0]), Math.max(...xs), Math.max(...xs) + Math.min(...xs), tri(xs)[n - 2] - tri(xs)[1]], explEtendue(xs, uniteDe(c)));
  }),
  gab("etendue_effectifs", MICRO_ET, 3, "L'étendue porte sur les VALEURS (première ligne), pas sur les effectifs.", ["etendue", "tableau", "piege"], () => {
    const c = pick(EFFECTIFS);
    const { vals, effs } = tirerEffectifs(c, rnd(4, 6), 1, 15);
    const N = somme(effs);
    const t = pick([`${introEff(c, N)}. Quelle est l'étendue de cette série ?`, `${introEff(c, N)} (tableau ci-dessous). Calcule l'étendue de la série.`]);
    return num(t, etendueDe(vals), expl("l'étendue est la plus grande valeur moins la plus petite ; les effectifs ne comptent pas.", `les valeurs vont de ${fr(vals[0])} à ${fr(vals[vals.length - 1])}.`, `${fr(vals[vals.length - 1])} − ${fr(vals[0])} = ${fr(etendueDe(vals))}.`, `l'étendue est ${fr(etendueDe(vals))} (et non ${fr(etendueDe(effs))}, l'écart entre les effectifs).`), tableauEffectifs(c.carac, vals, effs));
  }),
  gab("etendue_courbe", MICRO_ET, 3, "Repère le point le plus haut et le plus bas de la courbe, lis-les sur l'axe.", ["etendue", "courbe", "canvas"], () => {
    const c = pick(COURBES);
    const { mois, vals } = tirerCourbe(c, Math.random() < 0.5);
    const t = pick([
      `${c.sujet} D'après la courbe, quelle est l'étendue des six valeurs relevées ?`,
      `${c.sujet} Calcule l'étendue de la série représentée par la courbe.`,
    ]);
    return num(t, etendueDe(vals), explEtendue(vals, ` ${c.u}`), graphe(mois.map((m) => m[0]), vals, { type: "courbe", axe: { step: c.step, axeY: c.axeY } }));
  }),

  gab("etendue_extreme_manquant", MICRO_ET, 4, "Étendue = max − min, donc max = min + étendue et min = max − étendue.", ["etendue", "valeur_manquante"], () => {
    const c = pick(SERIES);
    const n = rnd(8, 30);
    const [m, M] = tri(valeursDistinctes(c, 2));
    const E = M - m;
    if (Math.random() < 0.5) {
      const t = `${introSerie(c, n)}. L'étendue de ${c.q} est ${fr(E)} et la plus petite valeur est ${fr(m)}. Quelle est la plus grande valeur ?`;
      return num(t, M, expl("étendue = maximum − minimum.", "donc maximum = minimum + étendue.", `${fr(m)} + ${fr(E)} = ${fr(M)}.`, `la plus grande valeur est ${fr(M)}${uniteDe(c)}.`));
    }
    const t = `${introSerie(c, n)}. L'étendue de ${c.q} est ${fr(E)} et la plus grande valeur est ${fr(M)}. Quelle est la plus petite valeur ?`;
    return num(t, m, expl("étendue = maximum − minimum.", "donc minimum = maximum − étendue.", `${fr(M)} − ${fr(E)} = ${fr(m)}.`, `la plus petite valeur est ${fr(m)}${uniteDe(c)}.`));
  }),
  gab("etendue_comparer", MICRO_ET, 4, "Calcule l'étendue de CHAQUE série, puis compare.", ["etendue", "comparer"], () => {
    const c = pick(DUOS);
    let A: number[] = [], B: number[] = [];
    do {
      A = Array.from({ length: rnd(5, 6) }, () => rnd(c.min, c.max));
      B = Array.from({ length: rnd(5, 6) }, () => rnd(c.min, c.max));
    } while (etendueDe(A) === etendueDe(B));
    const eA = etendueDe(A), eB = etendueDe(B);
    const ex = expl("l'étendue mesure la dispersion : plus elle est grande, plus les valeurs sont éparpillées.", "on calcule max − min pour chaque série.", `${c.a} : ${fr(Math.max(...A))} − ${fr(Math.min(...A))} = ${fr(eA)} ; ${c.b} : ${fr(Math.max(...B))} − ${fr(Math.min(...B))} = ${fr(eB)}.`, `${eA > eB ? c.a : c.b} a la plus grande étendue (écart de ${fr(Math.abs(eA - eB))}).`);
    const debut = `${c.sujet} ${c.a} : ${liste(A)}. ${c.b} : ${liste(B)}.`;
    if (Math.random() < 0.5) return qcmTexte(`${debut} Quelle série a la plus grande étendue ?`, eA > eB ? c.a : c.b, [c.a, c.b, "Les deux ont la même étendue"], ex);
    return num(`${debut} Quel est l'écart entre les deux étendues ?`, Math.abs(eA - eB), ex);
  }),
  gab("etendue_reunies", MICRO_ET, 5, "Série réunie : son maximum est le plus grand des deux maximums, son minimum le plus petit des deux minimums.", ["etendue", "reunion"], () => {
    const c = pick(DUOS);
    let A: number[] = [], B: number[] = [];
    do {
      A = Array.from({ length: rnd(4, 6) }, () => rnd(c.min, c.max));
      B = Array.from({ length: rnd(4, 6) }, () => rnd(c.min, c.max));
    } while (etendueDe([...A, ...B]) === etendueDe(A) || etendueDe([...A, ...B]) === etendueDe(B));
    const T = [...A, ...B];
    const t = pick([
      `${c.sujet} ${c.a} : ${liste(A)}. ${c.b} : ${liste(B)}. On réunit les deux séries en une seule. Quelle est son étendue ?`,
      `${c.sujet} ${c.a} : ${liste(A)} ; ${c.b} : ${liste(B)}. Quelle est l'étendue de toutes ces valeurs réunies ?`,
    ]);
    return num(t, etendueDe(T), expl("l'étendue de la série réunie se calcule avec ses propres extrêmes (on n'additionne pas les étendues).", "maximum des deux séries − minimum des deux séries.", `${fr(Math.max(...T))} − ${fr(Math.min(...T))} = ${fr(etendueDe(T))}.`, `l'étendue de la série réunie est ${fr(etendueDe(T))}.`));
  }),
  gab("etendue_decimales", MICRO_ET, 5, "Soustraction de décimaux : aligne les virgules.", ["etendue", "decimaux"], () => {
    const c = pick(DECIMALES);
    const n = rnd(5, 8);
    const set = new Set<number>();
    while (set.size < n) set.add(rnd(c.min * 10, c.max * 10));
    const xs = shuffle([...set]).map((x) => x / 10);
    const E = (Math.max(...set) - Math.min(...set)) / 10;
    const t = pick([`${c.sujet(n)} : ${liste(xs)}. Quelle est l'étendue de cette série ?`, `${c.sujet(n)} : ${liste(xs)}. Calcule l'étendue.`]);
    return num(t, E, expl("étendue = plus grande valeur − plus petite valeur.", "on repère les deux extrêmes.", `${fr(Math.max(...xs))} − ${fr(Math.min(...xs))} = ${fr(E)}.`, `l'étendue est ${fr(E)}${c.u ? " " + c.u : ""}.`));
  }),
  gab("etendue_ajout", MICRO_ET, 5, "La nouvelle valeur devient le maximum (ou le minimum) : utilise l'autre extrême.", ["etendue", "ajout"], () => {
    const c = pick(SERIES);
    const n = rnd(5, 7);
    const xs = valeursDistinctes(c, n);
    const m = Math.min(...xs), M = Math.max(...xs);
    const haut = c.neg || m >= 9 ? Math.random() < 0.5 : true;
    const ajout = haut ? M + rnd(1, 8) : m - rnd(1, 8);
    const E2 = haut ? ajout - m : M - ajout;
    const t = haut
      ? `${introSerie(c, n)} : ${liste(xs)}. On ajoute une valeur plus grande que toutes les autres, et l'étendue devient ${fr(E2)}. Quelle est cette valeur ?`
      : `${introSerie(c, n)} : ${liste(xs)}. On ajoute une valeur plus petite que toutes les autres, et l'étendue devient ${fr(E2)}. Quelle est cette valeur ?`;
    return num(t, ajout, expl("étendue = maximum − minimum.", haut ? `la nouvelle valeur est le maximum ; le minimum reste ${fr(m)}.` : `la nouvelle valeur est le minimum ; le maximum reste ${fr(M)}.`, haut ? `${fr(m)} + ${fr(E2)} = ${fr(ajout)}.` : `${fr(M)} − ${fr(E2)} = ${fr(ajout)}.`, `la valeur ajoutée est ${fr(ajout)}${uniteDe(c)}.`));
  }),
];

/* =========================================================================
   STAT_INTERPRETER — ce que dit une médiane, une moyenne, une étendue ;
   comparer deux séries ; la moyenne tirée par une valeur extrême.
========================================================================= */
const MICRO_IN = "stat_interpreter";
const moy2 = (xs: number[]) => r2(somme(xs) / xs.length);

/* Une série avec UNE valeur extrême (salaires, prix…) : la moyenne est tirée. */
type Extreme = { sujet: (n: number) => string; q: string; u: string; min: number; max: number; xMin: number; xMax: number; pas: number; extreme: string };
const EXTREMES: Extreme[] = [
  { sujet: (n) => `Dans une petite entreprise de ${n} personnes, voici les salaires mensuels, en euros`, q: "les salaires", u: "€", min: 1600, max: 2400, xMin: 7000, xMax: 9500, pas: 100, extreme: "le salaire de la directrice" },
  { sujet: (n) => `Une agente immobilière relève le prix, en milliers d'euros, des ${n} maisons vendues dans un village`, q: "les prix", u: "milliers d'euros", min: 150, max: 260, xMin: 900, xMax: 1500, pas: 10, extreme: "le prix du château" },
  { sujet: (n) => `Une urgentiste relève l'attente, en minutes, de ${n} patients`, q: "les attentes", u: "minutes", min: 10, max: 45, xMin: 200, xMax: 320, pas: 5, extreme: "l'attente d'un patient pendant une panne" },
  { sujet: (n) => `Un sociologue relève le nombre d'abonnés, en milliers, de ${n} comptes d'un réseau social`, q: "les nombres d'abonnés", u: "milliers", min: 1, max: 9, xMin: 300, xMax: 900, pas: 1, extreme: "le compte d'une star" },
  { sujet: (n) => `Une hydrologue relève la pluie, en mm, tombée chacun des ${n} jours d'une semaine`, q: "les hauteurs de pluie", u: "mm", min: 0, max: 6, xMin: 70, xMax: 120, pas: 1, extreme: "le jour de l'orage" },
  { sujet: (n) => `Un vétérinaire de zoo pèse, en kg, les ${n} animaux d'un enclos`, q: "les masses", u: "kg", min: 20, max: 60, xMin: 700, xMax: 1100, pas: 5, extreme: "la masse du rhinocéros" },
  { sujet: (n) => `Une libraire note le nombre de pages des ${n} livres d'une vitrine`, q: "les nombres de pages", u: "pages", min: 120, max: 320, xMin: 1100, xMax: 1500, pas: 10, extreme: "l'encyclopédie" },
  { sujet: (n) => `Une banquière relève l'épargne, en milliers d'euros, de ${n} clients d'une agence`, q: "les épargnes", u: "milliers d'euros", min: 2, max: 15, xMin: 250, xMax: 480, pas: 1, extreme: "l'épargne d'un client très riche" },
];
function serieExtreme(c: Extreme, n: number) {
  for (let essai = 0; essai < 500; essai++) {
    const xs = Array.from({ length: n - 1 }, () => c.pas * rnd(Math.ceil(c.min / c.pas), Math.floor(c.max / c.pas)));
    xs.push(c.pas * rnd(Math.ceil(c.xMin / c.pas), Math.floor(c.xMax / c.pas)));
    const m = somme(xs) / n;
    if (Number.isInteger(m) && Number.isInteger(medianeDe(xs)) && Number.isInteger(somme(xs.slice(0, -1)) / (n - 1))) return shuffle(xs);
  }
  const base = c.pas * Math.ceil(c.min / c.pas);
  return shuffle([...Array(n - 1).fill(base), base + c.pas * n * Math.ceil((c.xMin - base) / (c.pas * n))]);
}

const interpreter: TutorBankItemV4[] = [
  gab("interpreter_mediane_moitie", MICRO_IN, 2, "La médiane coupe la série rangée en deux : au moins la moitié des valeurs de chaque côté.", ["interpreter", "mediane"], () => {
    const c = pick(SERIES);
    const N = rnd(12, 61);
    const M = rnd(c.min + 2, c.max - 2);
    const rep = N % 2 ? (N + 1) / 2 : N / 2;
    const sens = pick(["inférieures ou égales", "supérieures ou égales"]);
    const t = pick([
      `${introSerie(c, N)}. La médiane de ${c.q} est ${fr(M)}. Au moins combien de valeurs sont ${sens} à ${fr(M)} ?`,
      `${introSerie(c, N)}. La médiane vaut ${fr(M)}${uniteDe(c)}. Combien de valeurs, au minimum, sont ${sens} à ${fr(M)} ?`,
    ]);
    return num(t, rep, expl("au moins la moitié des valeurs sont inférieures ou égales à la médiane, et au moins la moitié lui sont supérieures ou égales.", N % 2 ? `N = ${N} est impair : la médiane est la ${ieme((N + 1) / 2)} valeur, comptée des deux côtés.` : `N = ${N} est pair : la médiane est entre la ${ieme(N / 2)} et la ${ieme(N / 2 + 1)} valeur.`, N % 2 ? `(${N} + 1) ÷ 2 = ${rep}.` : `${N} ÷ 2 = ${rep}.`, `au moins ${rep} valeurs sont ${sens} à ${fr(M)}.`));
  }),
  gab("interpreter_moyenne_total", MICRO_IN, 2, "Moyenne × nombre de valeurs = total.", ["interpreter", "moyenne", "total"], () => {
    const c = pick(SERIES.filter((x) => !x.neg));
    const n = rnd(6, 30);
    const m = rnd(c.min + 1, c.max - 1);
    const t = pick([
      `${introSerie(c, n)}. La moyenne de ${c.q} est ${fr(m)}. Quelle est la somme des ${n} valeurs ?`,
      `${introSerie(c, n)}, et trouve une moyenne de ${fr(m)}${uniteDe(c)}. Quel est le total de toutes les valeurs relevées ?`,
    ]);
    return num(t, n * m, expl("la moyenne est la valeur que prendrait chaque donnée si le total était partagé également.", "total = moyenne × nombre de valeurs.", `${fr(m)} × ${n} = ${fr(n * m)}.`, `le total est ${fr(n * m)}${uniteDe(c)}.`));
  }),
  gab("interpreter_choisir_indicateur", MICRO_IN, 2, "Moyenne : partage égal. Médiane : la moitié en dessous. Étendue : écart entre extrêmes.", ["interpreter", "indicateur", "qcm"], () => {
    const c = pick(SERIES);
    const n = rnd(10, 40);
    const [bon, phrase] = pick([
      ["la moyenne", `la valeur qu'aurait chaque relevé si le total de ${c.q} était partagé également`],
      ["la médiane", `une valeur telle qu'au moins la moitié de ${c.q} lui soient inférieures ou égales`],
      ["l'étendue", `l'écart entre la plus grande et la plus petite de ${c.q}`],
    ] as const);
    const il = /^Une /.test(c.qui) ? "elle" : "il";
    const t = `${introSerie(c, n)}. ${cap(il)} veut connaître ${phrase}. Quel indicateur doit-${il} calculer ?`;
    return qcmTexte(t, bon, ["la moyenne", "la médiane", "l'étendue", "l'effectif total"], expl("chaque indicateur répond à une question précise.", "moyenne : partage égal ; médiane : milieu de la série rangée ; étendue : max − min.", `ici, on cherche ${phrase}.`, `il faut calculer ${bon}.`));
  }),

  gab("interpreter_comparer_moyennes", MICRO_IN, 3, "Calcule la moyenne de chaque série avant de comparer.", ["interpreter", "comparer", "moyenne", "qcm"], () => {
    const c = pick(DUOS);
    const n = rnd(4, 6);
    let A: number[] = [], B: number[] = [];
    do {
      A = Array.from({ length: n }, () => rnd(c.min, c.max));
      B = Array.from({ length: n }, () => rnd(c.min, c.max));
    } while (Math.abs(moy2(A) - moy2(B)) < 0.5 || (somme(A) > somme(B)) !== (moy2(A) > moy2(B)));
    const plus = Math.random() < 0.5;
    const bon = (moy2(A) > moy2(B)) === plus ? c.a : c.b;
    const t = `${c.sujet} ${c.a} : ${liste(A)}. ${c.b} : ${liste(B)}. Quelle série a la ${plus ? "plus grande" : "plus petite"} moyenne ?`;
    return qcmTexte(t, bon, [c.a, c.b, "Les deux ont la même moyenne"], expl("la moyenne résume une série par une seule valeur.", "on calcule les deux moyennes, puis on compare.", `${c.a} : ${fr(somme(A))} ÷ ${n} ≈ ${fr(moy2(A))} ; ${c.b} : ${fr(somme(B))} ÷ ${n} ≈ ${fr(moy2(B))}.`, `${bon} a la ${plus ? "plus grande" : "plus petite"} moyenne.`));
  }),
  gab("interpreter_regularite", MICRO_IN, 3, "La série la plus régulière est la moins dispersée : la plus petite étendue.", ["interpreter", "comparer", "etendue", "qcm"], () => {
    const c = pick(DUOS);
    const m = rnd(c.min + 6, c.max - 6);
    const kA = rnd(1, 3), kB = rnd(4, 6);
    const A = shuffle([-kA, kA, -rnd(0, kA - 1), 0, 0].map((d, j, arr) => m + (j === 3 ? -arr[2] : d)));
    const jB = rnd(1, kB - 1);
    const B = shuffle([-kB, kB, -jB, jB, 0].map((d) => m + d));
    const swap = Math.random() < 0.5;
    const X = swap ? B : A, Y = swap ? A : B, nX = c.a, nY = c.b;
    const bon = etendueDe(X) < etendueDe(Y) ? nX : nY;
    const t = `${c.sujet} ${nX} : ${liste(X)}. ${nY} : ${liste(Y)}. Les deux séries ont la même moyenne, ${fr(m)}. Laquelle est la plus régulière ?`;
    return qcmTexte(t, bon, [c.a, c.b, "On ne peut pas les départager"], expl("à moyenne égale, la série la plus régulière est la moins dispersée.", "on compare les étendues.", `${nX} : ${fr(etendueDe(X))} ; ${nY} : ${fr(etendueDe(Y))}.`, `${bon} est la plus régulière (plus petite étendue).`));
  }),
  gab("interpreter_comparer_medianes", MICRO_IN, 3, "Range chaque série, prends la valeur du milieu, puis compare.", ["interpreter", "comparer", "mediane"], () => {
    const c = pick(DUOS);
    let A: number[] = [], B: number[] = [];
    do {
      A = Array.from({ length: pick([5, 7]) }, () => rnd(c.min, c.max));
      B = Array.from({ length: pick([5, 7]) }, () => rnd(c.min, c.max));
    } while (medianeDe(A) === medianeDe(B));
    const d = Math.abs(medianeDe(A) - medianeDe(B));
    const t = `${c.sujet} ${c.a} : ${liste(A)}. ${c.b} : ${liste(B)}. Quel est l'écart entre les deux médianes ?`;
    return num(t, d, expl("la médiane d'une série impaire est la valeur du milieu de la série rangée.", "on range chaque série et on prend la valeur centrale.", `${c.a} : ${liste(tri(A))} → ${fr(medianeDe(A))} ; ${c.b} : ${liste(tri(B))} → ${fr(medianeDe(B))} ; écart ${fr(d)}.`, `les médianes diffèrent de ${fr(d)}.`));
  }),
  gab("interpreter_valeur_extreme", MICRO_IN, 4, "Une valeur très grande tire la moyenne vers le haut ; la médiane, elle, bouge peu.", ["interpreter", "valeur_extreme", "moyenne", "mediane"], () => {
    const c = pick(EXTREMES);
    const n = pick([5, 6, 7]);
    const xs = serieExtreme(c, n);
    const m = somme(xs) / n, me = medianeDe(xs);
    if (Math.random() < 0.5) {
      const t = `${c.sujet(n)} : ${liste(xs)}. De combien la moyenne dépasse-t-elle la médiane ?`;
      return num(t, m - me, expl("une valeur extrême tire la moyenne, pas la médiane.", "on calcule la moyenne, puis la médiane de la série rangée.", `moyenne : ${fr(somme(xs))} ÷ ${n} = ${fr(m)} ; médiane : ${fr(me)} ; ${fr(m)} − ${fr(me)} = ${fr(m - me)}.`, `la moyenne dépasse la médiane de ${fr(m - me)} ${c.u}, à cause de ${c.extreme}.`));
    }
    const bon = `la médiane (${fr(me)} ${c.u})`;
    const t = `${c.sujet(n)} : ${liste(xs)}. Quel nombre décrit le mieux une valeur « typique » de la série ?`;
    return qcmTexte(t, bon, [`la moyenne (${fr(m)} ${c.u})`, `l'étendue (${fr(etendueDe(xs))} ${c.u})`, `la plus grande valeur (${fr(Math.max(...xs))} ${c.u})`], expl("une valeur extrême tire la moyenne ; la médiane y résiste.", "on calcule les deux et on regarde laquelle ressemble aux valeurs de la série.", `moyenne ${fr(m)}, médiane ${fr(me)} ; ${n - 1} valeurs sur ${n} sont proches de la médiane.`, `${bon} décrit mieux la série : la moyenne est tirée par ${c.extreme}.`));
  }),
  gab("interpreter_retirer_extreme", MICRO_IN, 4, "Retire la valeur extrême de la somme ET du nombre de valeurs.", ["interpreter", "valeur_extreme", "moyenne"], () => {
    const c = pick(EXTREMES);
    const n = pick([5, 6, 7]);
    const xs = serieExtreme(c, n);
    const X = Math.max(...xs);
    const reste = xs.filter((x, j) => j !== xs.indexOf(X));
    const m2 = somme(reste) / (n - 1);
    const t = pick([
      `${c.sujet(n)} : ${liste(xs)}. On retire ${c.extreme}, ${fr(X)}. Quelle est la nouvelle moyenne ?`,
      `${c.sujet(n)} : ${liste(xs)}. Sans ${c.extreme} (${fr(X)}), quelle serait la moyenne ?`,
    ]);
    return num(t, m2, expl("la moyenne des valeurs restantes se calcule sur n − 1 valeurs.", `on retire ${fr(X)} de la somme, et on divise par ${n - 1}.`, `(${fr(somme(xs))} − ${fr(X)}) ÷ ${n - 1} = ${fr(somme(reste))} ÷ ${n - 1} = ${fr(m2)}.`, `sans la valeur extrême, la moyenne est ${fr(m2)} ${c.u} (contre ${fr(somme(xs) / n)} avec).`));
  }),

  gab("interpreter_affirmation_vraie", MICRO_IN, 5, "Calcule moyenne ET étendue des deux séries avant de choisir.", ["interpreter", "comparer", "qcm"], () => {
    const c = pick(DUOS);
    const m = rnd(c.min + 6, c.max - 6);
    const kA = rnd(1, 3), kB = rnd(4, 6), jA = rnd(0, kA - 1), jB = rnd(1, kB - 1);
    const A = shuffle([-kA, kA, -jA, jA, 0].map((d) => m + d));
    const B = shuffle([-kB, kB, -jB, jB, 0].map((d) => m + d));
    const swap = Math.random() < 0.5;
    const X = swap ? B : A, Y = swap ? A : B;
    const disp = swap ? c.a : c.b, reg = swap ? c.b : c.a;
    const bon = `Même moyenne (${fr(m)}), mais la série « ${disp} » est plus dispersée`;
    const t = `${c.sujet} ${c.a} : ${liste(X)}. ${c.b} : ${liste(Y)}. Quelle affirmation est exacte ?`;
    return qcmTexte(t, bon, [`${disp} a une plus grande moyenne que ${reg}`, `Même moyenne et même étendue`, `Même moyenne, mais la série « ${reg} » est plus dispersée`, `${reg} a une plus grande moyenne que ${disp}`], expl("deux séries de même moyenne peuvent être plus ou moins dispersées.", "on calcule la moyenne et l'étendue de chacune.", `moyennes : ${fr(m)} et ${fr(m)} ; étendues : ${c.a} ${fr(etendueDe(X))}, ${c.b} ${fr(etendueDe(Y))}.`, `même moyenne, mais ${disp} est plus dispersée.`));
  }),
  gab("interpreter_tous_plus_k", MICRO_IN, 5, "Ajouter k à toutes les valeurs : moyenne et médiane augmentent de k, l'étendue ne change pas.", ["interpreter", "transformation"], () => {
    const c = pick(SERIES.filter((x) => uniteDe(x) !== ""));
    const n = rnd(8, 30);
    const k = rnd(2, 6);
    const E = rnd(6, Math.max(7, Math.floor((c.max - c.min) * 0.8)));
    const m = rnd(c.min + Math.ceil(E / 2), Math.max(c.min + Math.ceil(E / 2), c.max - Math.ceil(E / 2)));
    const me = m + rnd(-Math.floor(E / 4), Math.floor(E / 4));
    const [nom, avant, apres] = pick([["moyenne", m, m + k], ["médiane", me, me + k], ["étendue", E, E]] as const);
    const t = pick([
      `${introSerie(c, n)}. Moyenne : ${fr(m)} ; médiane : ${fr(me)} ; étendue : ${fr(E)}. L'appareil de mesure était mal réglé : on doit ajouter ${k} à chaque valeur. Quelle est la nouvelle ${nom} ?`,
      `${introSerie(c, n)}. Sa série a pour moyenne ${fr(m)}, pour médiane ${fr(me)} et pour étendue ${fr(E)}. Chaque valeur est augmentée de ${k}. Que vaut maintenant ${nom === "étendue" ? "l'étendue" : "la " + nom} ?`,
    ]);
    return num(t, apres, expl("ajouter le même nombre à toutes les valeurs décale toute la série.", nom === "étendue" ? "le maximum et le minimum augmentent tous les deux : leur différence ne change pas." : `la ${nom} est décalée du même nombre.`, nom === "étendue" ? `(max + ${k}) − (min + ${k}) = max − min = ${fr(E)}.` : `${fr(avant)} + ${k} = ${fr(apres)}.`, `la nouvelle ${nom} vaut ${fr(apres)}.`));
  }),
  gab("interpreter_au_dessus_moyenne", MICRO_IN, 5, "Calcule la moyenne, compte les valeurs au-dessus, puis ÷ nombre de valeurs × 100.", ["interpreter", "moyenne", "pourcentage"], () => {
    const c = pick(SERIES);
    const n = pick([5, 10, 20]);
    let xs = valeursMoyenne(c, n);
    for (let essai = 0; essai < 50 && xs.filter((x) => x > somme(xs) / n).length === 0; essai++) xs = valeursMoyenne(c, n);
    const m = somme(xs) / n;
    const nb = xs.filter((x) => x > m).length;
    const p = (nb * 100) / n;
    const t = `${introSerie(c, n)} : ${liste(xs)}. Quel pourcentage des valeurs est strictement supérieur à la moyenne ?`;
    return num(t, p, expl("on compare chaque valeur à la moyenne.", "on calcule la moyenne, on compte les valeurs strictement au-dessus, on divise par le nombre de valeurs.", `moyenne : ${fr(somme(xs))} ÷ ${n} = ${fr(m)} ; ${nb} valeurs au-dessus ; ${nb} ÷ ${n} × 100 = ${fr(p)}.`, `${fr(p)} % des valeurs sont au-dessus de la moyenne.`));
  }),
];

/* =========================================================================
   STAT_DEFI — problèmes en plusieurs étapes, façon brevet.
========================================================================= */
const MICRO_DE = "stat_defi";
/* Un objectif de moyenne : `qui` a déjà des résultats, il en reste un. */
type Objectif = { qui: string; f: boolean; act: string; un: string; res: string; min: number; max: number; plafond: number };
const OBJECTIFS: Objectif[] = [
  { qui: "Lina", f: true, act: "a obtenu ces notes, sur 20, à ses premiers contrôles de physique", un: "la note du dernier contrôle", res: "notes sur 20", min: 7, max: 18, plafond: 20 },
  { qui: "Une vendeuse de voitures", f: true, act: "a vendu ce nombre de voitures les premiers mois du semestre", un: "le nombre de ventes du dernier mois", res: "mois de ventes", min: 8, max: 22, plafond: 40 },
  { qui: "Un basketteur", f: false, act: "a marqué ces points lors des premiers matchs du tournoi", un: "son score au dernier match", res: "matchs", min: 9, max: 28, plafond: 50 },
  { qui: "Une archère", f: true, act: "a obtenu ces scores, sur 30, à ses premières volées", un: "le score de la dernière volée", res: "volées", min: 18, max: 29, plafond: 30 },
  { qui: "Un livreur à vélo", f: false, act: "a fait ce nombre de livraisons les premiers jours de la semaine", un: "le nombre de livraisons du dernier jour", res: "journées de livraison", min: 12, max: 30, plafond: 45 },
  { qui: "Une apicultrice", f: true, act: "a récolté ces masses de miel, en kg, dans ses premières ruches", un: "la récolte de la dernière ruche", res: "ruches récoltées", min: 10, max: 26, plafond: 40 },
  { qui: "Un pianiste", f: false, act: "a reçu ces notes, sur 20, aux premières épreuves d'un concours", un: "la note de la dernière épreuve", res: "épreuves notées sur 20", min: 9, max: 19, plafond: 20 },
  { qui: "Une serveuse", f: true, act: "a reçu ces pourboires, en euros, les premiers soirs de la semaine", un: "les pourboires du dernier soir", res: "soirées de pourboires", min: 15, max: 48, plafond: 80 },
];

const defi: TutorBankItemV4[] = [
  gab("defi_note_minimale", MICRO_DE, 4, "Somme visée = moyenne visée × nombre total ; le dernier résultat doit au moins combler l'écart.", ["defi", "moyenne", "objectif"], () => {
    const c = pick(OBJECTIFS);
    const n = rnd(4, 6);
    let xs: number[] = [], m = 0, x = 0;
    for (let essai = 0; essai < 500; essai++) {
      xs = Array.from({ length: n - 1 }, () => rnd(c.min, c.max));
      m = rnd(c.min + 1, c.max);
      x = n * m - somme(xs);
      if (x > Math.max(...xs) - 6 && x <= c.plafond && x > 0) break;
    }
    const t = pick([
      `${c.qui} ${c.act} : ${liste(xs)}. Quel doit être, au minimum, ${c.un} pour que la moyenne des ${n} résultats soit d'au moins ${fr(m)} ?`,
      `${c.qui} ${c.act} : ${liste(xs)}. ${c.f ? "Elle" : "Il"} vise une moyenne d'au moins ${fr(m)} sur ${n} résultats. Quelle est la plus petite valeur possible pour ${c.un} ?`,
    ]);
    return num(t, x, expl("moyenne × nombre de résultats = somme des résultats.", `somme visée : ${fr(m)} × ${n} = ${fr(n * m)}.`, `déjà obtenu : ${xs.map(fr).join(" + ")} = ${fr(somme(xs))} ; ${fr(n * m)} − ${fr(somme(xs))} = ${fr(x)}.`, `il faut au moins ${fr(x)} pour ${c.un}.`));
  }),
  gab("defi_moyenne_et_mediane", MICRO_DE, 4, "Deux calculs : la moyenne (somme ÷ nombre) et la médiane (série rangée).", ["defi", "moyenne", "mediane", "qcm"], () => {
    const c = pick(SERIES);
    const n = pick([5, 7]);
    let xs = valeursMoyenne(c, n);
    for (let essai = 0; essai < 50 && medianeDe(xs) === somme(xs) / n; essai++) xs = valeursMoyenne(c, n);
    const m = somme(xs) / n, me = medianeDe(xs);
    const f = (a: number, b: number) => `moyenne = ${fr(a)} et médiane = ${fr(b)}`;
    const t = `${introSerie(c, n)} : ${liste(xs)}. Quelle affirmation est exacte ?`;
    return qcmTexte(t, f(m, me), [f(me, m), f(m, xs[(n - 1) / 2]), f(r2(somme(xs) / (n - 1)), me), f(m, etendueDe(xs))].filter((x) => x !== f(m, me)), expl("moyenne et médiane sont deux indicateurs différents.", "moyenne : somme ÷ nombre ; médiane : valeur du milieu de la série RANGÉE.", `somme ${fr(somme(xs))}, ${fr(somme(xs))} ÷ ${n} = ${fr(m)} ; rangée : ${liste(tri(xs))} → médiane ${fr(me)}.`, `${f(m, me)}.`));
  }),
  gab("defi_ecart_moyenne_mediane", MICRO_DE, 4, "Moyenne pondérée par les effectifs, médiane par les effectifs cumulés, puis l'écart.", ["defi", "moyenne", "mediane", "tableau"], () => {
    const c = pick(EFFECTIFS);
    let r = effectifsMoyenneDixieme(c, rnd(4, 5), 1, 12);
    for (let essai = 0; essai < 30 && r.m === medianeDe(deplie(r.vals, r.effs)); essai++) r = effectifsMoyenneDixieme(c, rnd(4, 5), 1, 12);
    const { vals, effs, m } = r;
    const me = medianeDe(deplie(vals, effs));
    const N = somme(effs);
    const d = Math.abs(m - me);
    const t = `${introEff(c, N)}. Quel est l'écart entre la moyenne et la médiane de cette série (la plus grande moins la plus petite) ?`;
    return num(t, d, expl("on calcule les deux indicateurs, puis leur différence.", "moyenne pondérée par les effectifs ; médiane grâce aux effectifs cumulés.", `moyenne : ${produits(vals, effs)} = ${fr(somme(vals.map((v, j) => v * effs[j])))} ; ÷ ${fr(N)} = ${fr(m)} ; médiane : ${fr(me)} ; écart : ${fr(d)}.`, `l'écart est ${fr(d)}.`), tableauEffectifs(c.carac, vals, effs));
  }),

  gab("defi_groupe_inconnu", MICRO_DE, 5, "Somme totale − somme du groupe connu = somme de l'autre groupe ; puis ÷ son effectif.", ["defi", "moyenne", "groupes"], () => {
    const c = pick(GROUPES);
    let n1 = 0, n2 = 0, m1 = 0, m2 = 0, M = 0;
    for (let essai = 0; essai < 800; essai++) {
      n1 = rnd(c.nMin, c.nMax); n2 = rnd(c.nMin, c.nMax);
      m1 = rnd(c.min * 2, c.max * 2) / 2; m2 = rnd(c.min * 2, c.max * 2) / 2;
      M = (n1 * m1 + n2 * m2) / (n1 + n2);
      if (n1 !== n2 && m1 !== m2 && auDixieme(M)) break;
    }
    const tot = (n1 + n2) * M;
    const t = pick([
      `${c.sujet} Sur l'ensemble des ${n1 + n2} ${c.ind}, la moyenne est ${fr(M)} ${c.u}. Les ${n1} ${c.g1} ont une moyenne de ${fr(m1)} ${c.u}. Quelle est la moyenne des ${n2} ${c.g2} ?`,
      `${c.sujet} On connaît la moyenne générale, ${fr(M)} ${c.u} pour ${n1 + n2} ${c.ind}, et celle des ${n1} ${c.g1}, ${fr(m1)} ${c.u}. Retrouve la moyenne des ${n2} autres, les ${c.g2}.`,
      `${c.sujet} ${n1} ${c.g1} : moyenne ${fr(m1)} ${c.u}. ${n2} ${c.g2} : moyenne inconnue. Tous réunis : moyenne ${fr(M)} ${c.u}. Quelle est la moyenne inconnue ?`,
    ]);
    return num(t, m2, expl("somme = moyenne × effectif, pour l'ensemble comme pour chaque groupe.", `somme totale : ${fr(M)} × ${n1 + n2} = ${fr(tot)} ; somme du premier groupe : ${fr(m1)} × ${n1} = ${fr(n1 * m1)}.`, `${fr(tot)} − ${fr(n1 * m1)} = ${fr(n2 * m2)} ; ${fr(n2 * m2)} ÷ ${n2} = ${fr(m2)}.`, `la moyenne des ${c.g2} est ${fr(m2)} ${c.u}.`));
  }),
  gab("defi_moyenne_classes", MICRO_DE, 5, "Remplace chaque classe par son centre, puis fais une moyenne pondérée par les effectifs.", ["defi", "moyenne", "classes", "histogramme", "canvas"], () => {
    const { c, w, bornes } = classes(3, [2, 10, 20, 50, 100]);
    const centres = bornes.slice(0, -1).map((b) => b + w / 2);
    let effs: number[] = [];
    for (let essai = 0; essai < 400; essai++) {
      effs = centres.map(() => rnd(1, 12));
      if (auDixieme(somme(centres.map((x, j) => x * effs[j])) / somme(effs))) break;
    }
    if (!auDixieme(somme(centres.map((x, j) => x * effs[j])) / somme(effs))) effs = centres.map(() => 2);
    const N = somme(effs), S = somme(centres.map((x, j) => x * effs[j]));
    const t = pick([
      `${introSerie(c, N)}, et regroupe les valeurs en classes (histogramme). En remplaçant chaque classe par son centre, quelle moyenne obtient-on ?`,
      `${introSerie(c, N)}. Seul l'histogramme a été gardé. Estime la moyenne de la série en prenant le centre de chaque classe.`,
    ]);
    return num(t, S / N, expl("pour une série en classes, on estime la moyenne avec le centre de chaque classe.", `centres : ${centres.map(fr).join(" ; ")} ; effectifs lus sur l'histogramme.`, `${produits(centres, effs)} = ${fr(S)} ; ${fr(S)} ÷ ${fr(N)} = ${fr(S / N)}.`, `la moyenne estimée est ${fr(S / N)}${uniteDe(c)}.`), graphe(effs.map((_, j) => `${bornes[j]}`), effs, { type: "histogramme", bornes, axe: { step: 2, axeY: "effectif" } }));
  }),
  gab("defi_combien_ajouter", MICRO_DE, 5, "Écris la nouvelle somme et le nouveau nombre de valeurs avec k inconnu, puis résous l'équation.", ["defi", "moyenne", "equation"], () => {
    const c = pick(OBJECTIFS);
    let n = 0, m = 0, M = 0, k = 0, top = c.plafond;
    for (let essai = 0; essai < 800; essai++) {
      n = rnd(4, 12); m = rnd(c.min, c.max - 2); top = rnd(m + 3, Math.min(c.plafond, c.max + 6));
      M = rnd(m + 1, top - 1);
      k = (n * (M - m)) / (top - M);
      if (Number.isInteger(k) && k >= 1 && k <= 8) break;
    }
    const t = pick([
      `${c.qui} compte déjà ${n} ${c.res}, avec une moyenne de ${fr(m)}. Combien de résultats égaux à ${fr(top)} faut-il encore pour que la moyenne atteigne exactement ${fr(M)} ?`,
      `${c.qui} a une moyenne de ${fr(m)} sur ${n} ${c.res}. ${c.f ? "Elle" : "Il"} enchaîne ensuite des résultats de ${fr(top)}. Au bout de combien de ces résultats sa moyenne vaudra-t-elle ${fr(M)} ?`,
    ]);
    return num(t, k, expl("on note k le nombre de résultats à ajouter.", `nouvelle somme : ${fr(m)} × ${n} + ${fr(top)} × k ; nouveau nombre : ${n} + k.`, `${fr(n * m)} + ${fr(top)}k = ${fr(M)} × (${n} + k) donc ${fr(top - M)}k = ${fr(n * (M - m))}, k = ${fr(n * (M - m))} ÷ ${fr(top - M)} = ${fr(k)}.`, `il faut ${fr(k)} résultats égaux à ${fr(top)}.`));
  }),
  gab("defi_hausse_pourcent", MICRO_DE, 5, "Multiplier toutes les valeurs par 1 + p ÷ 100 multiplie la moyenne ET l'étendue par ce nombre.", ["defi", "transformation", "pourcentage"], () => {
    const c = pick(HAUSSES);
    const p = pick(c.ps);
    const coef = 1 + p / 100;
    let m = 0, E = 0;
    do { m = c.pas * rnd(c.min / c.pas, c.max / c.pas); E = c.pas * rnd(2, 10); } while (!exact2(m * coef) || !exact2(E * coef));
    const [nom, avant] = pick([["la moyenne", m], ["l'étendue", E]] as const);
    const t = pick([
      `${c.sujet} La moyenne est ${fr(m)} ${c.u} et l'étendue ${fr(E)} ${c.u}. ${c.hausse(p)} Quelle est la nouvelle valeur de ${nom}, en ${c.u} ?`,
      `${c.sujet} Moyenne : ${fr(m)} ${c.u} ; étendue : ${fr(E)} ${c.u}. ${c.hausse(p)} Que devient ${nom} ?`,
    ]);
    return num(t, r2(avant * coef), expl(`augmenter de ${p} %, c'est multiplier par ${fr(coef)}.`, "toutes les valeurs sont multipliées par le même nombre : la moyenne et l'étendue aussi.", `${fr(avant)} × ${fr(coef)} = ${fr(avant * coef)}.`, `${nom} devient ${fr(avant * coef)} ${c.u}.`));
  }),
];

/* Hausses de p % appliquées à toute une série. */
type Hausse = { sujet: string; u: string; min: number; max: number; pas: number; ps: number[]; hausse: (p: number) => string };
const HAUSSES: Hausse[] = [
  { sujet: "Une DRH étudie les salaires mensuels d'une entreprise.", u: "euros", min: 1800, max: 3200, pas: 100, ps: [2, 5, 10], hausse: (p) => `Tous les salaires augmentent de ${p} %.` },
  { sujet: "Un commerçant étudie les prix des articles de son rayon.", u: "euros", min: 20, max: 120, pas: 4, ps: [5, 10, 20, 25], hausse: (p) => `Il augmente tous ses prix de ${p} %.` },
  { sujet: "Une agricultrice étudie les rendements, en quintaux par hectare, de ses parcelles.", u: "quintaux par hectare", min: 40, max: 90, pas: 2, ps: [5, 10, 20, 25, 50], hausse: (p) => `Grâce à l'irrigation, chaque rendement progresse de ${p} %.` },
  { sujet: "Un loueur de vacances étudie les loyers hebdomadaires de ses chalets.", u: "euros", min: 400, max: 1200, pas: 20, ps: [10, 20, 25, 50], hausse: (p) => `En haute saison, chaque loyer augmente de ${p} %.` },
  { sujet: "Une économiste étudie les loyers mensuels d'un quartier.", u: "euros", min: 500, max: 1100, pas: 20, ps: [2, 5, 10], hausse: (p) => `Tous les loyers sont révisés à la hausse de ${p} %.` },
  { sujet: "Un chef de chantier étudie les durées de ses chantiers, en jours.", u: "jours", min: 20, max: 80, pas: 4, ps: [5, 10, 20, 25, 50], hausse: (p) => `À cause de la pluie, chaque durée s'allonge de ${p} %.` },
];

export const statistiquesBank: TutorBankItemV4[] = [
  ...lireTableau,
  ...lireGraphique,
  ...effectifFrequence,
  ...moyenne,
  ...mediane,
  ...etendue,
  ...interpreter,
  ...defi,
];
