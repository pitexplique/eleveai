// lib/tutor-v4/question-banks/maths/6e/donnees.bank.ts

import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  DifficultyLevel,
  TableauDonneesCanvasData,
  StatGraphCanvasData,
} from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de, type Prenom } from "./entiers.bank";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function tableauDonneesCanvas(
  data: Omit<TableauDonneesCanvasData, "kind">
): TableauDonneesCanvasData {
  return { kind: "tableau_donnees", ...data };
}

function statGraphCanvas(
  data: Omit<StatGraphCanvasData, "kind">
): StatGraphCanvasData {
  return { kind: "stat_graph", ...data };
}

function se(def: string, meth: string, obs: string, ccl: string) {
  return `Définition : ${def}\n\nMéthode : ${meth}\n\nObservation : ${obs}\n\nConclusion : ${ccl}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ⭐ 07/10/2026 — DES SITUATIONS, PAS UNE PHRASE (PASSATION-COACH-MATHS-6E).
   Mesuré le 07/10 avant réparation : 10 à 34 squelettes par micro, 12 à 18
   répétitions sur 20 (« Combien de livres ont été empruntés # ? » revenait à
   l'identique). Chaque gabarit compose maintenant une SITUATION (seize relevés
   de la vie d'un enfant de 11 ans, un seul à La Réunion) × une TOURNURE × un
   PRÉNOM, et dessine le tableau ou le diagramme avec les MÊMES nombres.
   Le correcteur (correcteurs/donnees.ts) relit la figure et la question, et
   refait le calcul sans passer par le gabarit.
   ⛔ Pas de barre de fraction (notion de données) : « la moitié », « ÷ 2 ».
   ═══════════════════════════════════════════════════════════════════════════ */

type Q = TutorGeneratedQuestionV4;
const il = (p: Prenom) => (p.f ? "elle" : "il");
const Il = (p: Prenom) => (p.f ? "Elle" : "Il");
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
function entre(a: number, b: number) {
  return a + Math.floor(Math.random() * (b - a + 1));
}
/** `n` éléments distincts de `arr`, dans l'ordre d'origine (les jours restent dans l'ordre). */
function tirerSans<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr.map((_, i) => i))
    .slice(0, n)
    .sort((x, y) => x - y)
    .map((i) => arr[i]);
}
function valeursDistinctes(n: number, min: number, max: number): number[] {
  const s = new Set<number>();
  while (s.size < n) s.add(entre(min, max));
  return shuffle([...s]);
}
/** « que Mai », « qu’Avril », « qu’À pied ». */
const que = (x: string) => (/^[AEIOUÉÈÊÀÂÎ]/i.test(x) ? `qu’${x}` : `que ${x}`);
/** « d’élèves », « de livres ». */
const deMot = (mot: string) => (/^[aeiouéèêh]/i.test(mot) ? `d’${mot}` : `de ${mot}`);

function gab(
  id: string,
  notionId: string,
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return { kind: "template", id, niveau: "6e", matiere: "maths", notionId, microId, difficulty, theme: "neutral", hint, tags, generate };
}

type Cat = { label: string; gn: string };
const cat = (label: string, gn: string): Cat => ({ label, gn });
const jours = (n: number) =>
  ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"].slice(0, n).map((j) => cat(j, `le ${j.toLowerCase()}`));

type CtxStat = {
  titre: string;
  entete: string;
  intro: (p: Prenom) => string;
  /** Le mot écrit après le nombre dans la réponse (« 12 élèves »). */
  unite: string;
  quel: string;
  combien: (c: Cat, p: Prenom) => string;
  tout: (p: Prenom) => string;
  cats: Cat[];
  min: number;
  max: number;
  /** ⛔ 07/10 : « effectif » seulement quand on compte des personnes ou des objets ;
   *  sinon la grandeur (« la distance », « le nombre de jours de pluie »). */
  grandeur?: { mot: string; fem: boolean };
};

const SPORTS = [
  cat("Football", "le football"), cat("Natation", "la natation"), cat("Basket", "le basket"),
  cat("Danse", "la danse"), cat("Judo", "le judo"), cat("Tennis", "le tennis"), cat("Escalade", "l’escalade"),
];
const INSTRUMENTS = [
  cat("Guitare", "la guitare"), cat("Piano", "le piano"), cat("Batterie", "la batterie"),
  cat("Violon", "le violon"), cat("Flûte", "la flûte"), cat("Trompette", "la trompette"),
];
const TRANSPORTS = [
  cat("À pied", "à pied"), cat("Bus", "en bus"), cat("Vélo", "à vélo"),
  cat("Voiture", "en voiture"), cat("Trottinette", "en trottinette"), cat("Train", "en train"),
];
const PARFUMS = [
  cat("Vanille", "à la vanille"), cat("Chocolat", "au chocolat"), cat("Fraise", "à la fraise"),
  cat("Pistache", "à la pistache"), cat("Citron", "au citron"), cat("Framboise", "à la framboise"),
];
const GARNITURES = [
  cat("Sucre", "au sucre"), cat("Chocolat", "au chocolat"), cat("Confiture", "à la confiture"),
  cat("Miel", "au miel"), cat("Citron", "au citron"), cat("Caramel", "au caramel"),
];
const LEGUMES = [
  cat("Tomates", "de tomates"), cat("Salades", "de salades"), cat("Radis", "de radis"),
  cat("Carottes", "de carottes"), cat("Courgettes", "de courgettes"), cat("Poireaux", "de poireaux"),
];
const FRUITS = [
  cat("Pommes", "de pommes"), cat("Poires", "de poires"), cat("Fraises", "de fraises"),
  cat("Cerises", "de cerises"), cat("Abricots", "d’abricots"), cat("Prunes", "de prunes"),
];
const OISEAUX = [
  cat("Moineaux", "moineaux"), cat("Merles", "merles"), cat("Pigeons", "pigeons"),
  cat("Corbeaux", "corbeaux"), cat("Pinsons", "pinsons"), cat("Rouges-gorges", "rouges-gorges"),
];

const CTX_STAT: CtxStat[] = [
  {
    titre: "Sport préféré", entete: "Nombre d’élèves", unite: "élèves", quel: "Quel sport",
    intro: (p) => `${p.nom} a demandé à chaque élève de sa classe son sport préféré.`,
    combien: (c) => `combien d’élèves ont choisi ${c.gn}`,
    tout: () => "combien d’élèves ont répondu",
    cats: SPORTS, min: 2, max: 12,
  },
  {
    titre: "Cagettes vendues au marché", entete: "Cagettes vendues", unite: "cagettes", quel: "Quel fruit",
    intro: (p) => `${p.nom} aide ses parents au marché. ${Il(p)} note les cagettes de fruits vendues.`,
    combien: (c) => `combien de cagettes ${c.gn} ont été vendues`,
    tout: () => "combien de cagettes ont été vendues",
    cats: FRUITS, min: 4, max: 30,
  },
  {
    titre: "Livres empruntés", entete: "Livres empruntés", unite: "livres", quel: "Quel jour",
    intro: (p) => `${p.nom} aide à la médiathèque. ${Il(p)} compte les livres empruntés chaque jour.`,
    combien: (c) => `combien de livres ont été empruntés ${c.gn}`,
    tout: () => "combien de livres ont été empruntés",
    cats: jours(6).slice(1), min: 12, max: 60,
  },
  {
    titre: "Oiseaux observés", entete: "Nombre d’oiseaux", unite: "oiseaux", quel: "Quel oiseau",
    intro: (p) => `Dans son jardin, ${p.nom} compte les oiseaux pendant une heure.`,
    combien: (c, p) => `combien de ${c.gn} ${p.nom} a-t-${il(p)} comptés`,
    tout: (p) => `combien d’oiseaux ${p.nom} a-t-${il(p)} comptés`,
    cats: OISEAUX, min: 2, max: 18,
  },
  {
    titre: "Instrument choisi", entete: "Nombre d’élèves", unite: "élèves", quel: "Quel instrument",
    intro: (p) => `À l’école de musique, ${p.nom} note l’instrument choisi par chaque élève.`,
    combien: (c) => `combien d’élèves ont choisi ${c.gn}`,
    tout: () => "combien d’élèves ont choisi un instrument",
    cats: INSTRUMENTS, min: 2, max: 14,
  },
  {
    titre: "Trajet jusqu’au collège", entete: "Nombre d’élèves", unite: "élèves", quel: "Quel moyen de transport",
    intro: (p) => `${p.nom} demande aux élèves de sa classe comment ils viennent au collège.`,
    combien: (c) => `combien d’élèves viennent ${c.gn}`,
    tout: () => "combien d’élèves ont répondu",
    cats: TRANSPORTS, min: 2, max: 14,
  },
  {
    titre: "Animaux à la maison", entete: "Nombre d’élèves", unite: "élèves", quel: "Quel animal",
    intro: (p) => `${p.nom} demande aux élèves de son club quel animal ils ont à la maison.`,
    combien: (c) => `combien d’élèves ont ${c.gn}`,
    tout: () => "combien d’élèves ont répondu",
    cats: [
      cat("Chat", "un chat"), cat("Chien", "un chien"), cat("Lapin", "un lapin"),
      cat("Poisson", "un poisson"), cat("Hamster", "un hamster"), cat("Tortue", "une tortue"),
    ],
    min: 1, max: 12,
  },
  {
    titre: "Cornets de glace vendus", entete: "Cornets vendus", unite: "cornets", quel: "Quel parfum",
    intro: (p) => `À la fête du village, ${p.nom} tient le stand de glaces. ${Il(p)} compte les cornets vendus.`,
    combien: (c) => `combien de cornets ${c.gn} ont été vendus`,
    tout: () => "combien de cornets ont été vendus",
    cats: PARFUMS, min: 5, max: 40,
  },
  {
    titre: "Plants du potager", entete: "Nombre de plants", unite: "plants", quel: "Quel légume",
    intro: (p) => `Au potager de l’école, ${p.nom} compte les plants de chaque légume.`,
    combien: (c) => `combien de plants ${c.gn} y a-t-il`,
    tout: () => "combien de plants y a-t-il",
    cats: LEGUMES, min: 3, max: 25,
  },
  {
    titre: "Crêpes vendues", entete: "Crêpes vendues", unite: "crêpes", quel: "Quelle garniture",
    intro: (p) => `À la kermesse, ${p.nom} tient le stand de crêpes.`,
    combien: (c) => `combien de crêpes ${c.gn} ont été vendues`,
    tout: () => "combien de crêpes ont été vendues",
    cats: GARNITURES, min: 4, max: 35,
  },
  {
    titre: "Jours de pluie", entete: "Jours de pluie", unite: "jours", quel: "Quel mois",
    grandeur: { mot: "nombre de jours de pluie", fem: false },
    intro: (p) => `${p.nom} note chaque jour s’il a plu. ${Il(p)} fait le compte de chaque mois.`,
    combien: (c) => `combien de jours de pluie y a-t-il eu ${c.gn}`,
    tout: () => "combien de jours de pluie y a-t-il eu",
    cats: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"].map((m) => cat(m, `en ${m.toLowerCase()}`)),
    min: 2, max: 20,
  },
  {
    titre: "Distance parcourue à vélo", entete: "Distance (km)", unite: "km", quel: "Quel jour",
    grandeur: { mot: "distance", fem: true },
    intro: (p) => `Pendant les vacances, ${p.nom} fait une randonnée à vélo. ${Il(p)} note la distance parcourue chaque jour.`,
    combien: (c, p) => `combien de kilomètres ${p.nom} a-t-${il(p)} parcourus ${c.gn}`,
    tout: (p) => `combien de kilomètres ${p.nom} a-t-${il(p)} parcourus`,
    cats: jours(6), min: 8, max: 45,
  },
  {
    titre: "Graines germées", entete: "Graines germées", unite: "graines", quel: "Quel jour",
    intro: (p) => `En sciences, ${p.nom} a semé des haricots. ${Il(p)} compte les graines qui germent chaque jour.`,
    combien: (c) => `combien de graines ont germé ${c.gn}`,
    tout: () => "combien de graines ont germé",
    cats: jours(5), min: 1, max: 15,
  },
  {
    titre: "Genre de film préféré", entete: "Nombre d’élèves", unite: "élèves", quel: "Quel genre de film",
    intro: (p) => `Au club cinéma, ${p.nom} demande à chacun son genre de film préféré.`,
    combien: (c) => `combien d’élèves préfèrent ${c.gn}`,
    tout: () => "combien d’élèves ont répondu",
    cats: [
      cat("Comédies", "les comédies"), cat("Aventure", "les films d’aventure"),
      cat("Dessins animés", "les dessins animés"), cat("Documentaires", "les documentaires"),
      cat("Science-fiction", "la science-fiction"),
    ],
    min: 2, max: 12,
  },
  {
    titre: "Barquettes vendues", entete: "Barquettes vendues", unite: "barquettes", quel: "Quel fruit",
    intro: (p) => `Au marché de Saint-Paul, à La Réunion, ${p.nom} compte les barquettes de fruits vendues.`,
    combien: (c) => `combien de barquettes ${c.gn} ont été vendues`,
    tout: () => "combien de barquettes ont été vendues",
    cats: [
      cat("Letchis", "de letchis"), cat("Mangues", "de mangues"), cat("Ananas", "d’ananas"),
      cat("Goyaviers", "de goyaviers"), cat("Bananes", "de bananes"),
    ],
    min: 4, max: 30,
  },
  {
    titre: "Objets fabriqués", entete: "Objets fabriqués", unite: "objets", quel: "Quel groupe",
    intro: (p) => `À l’atelier de bricolage, ${p.nom} compte les objets fabriqués par chaque groupe.`,
    combien: (c) => `combien d’objets ${c.gn} a-t-il fabriqués`,
    tout: () => "combien d’objets ont été fabriqués",
    cats: ["rouge", "bleu", "vert", "jaune", "orange"].map((x) => cat(`Groupe ${x}`, `le groupe ${x}`)),
    min: 3, max: 20,
  },
];

type Support = "tableau" | "barres" | "batons" | "camembert";
const NOM_SUPPORT: Record<Support, string> = {
  tableau: "le tableau",
  barres: "le diagramme en barres",
  batons: "le diagramme en bâtons",
  camembert: "le diagramme circulaire",
};
type Serie = { ctx: CtxStat; p: Prenom; cats: Cat[]; v: number[]; support: Support };

function tirerSerie(n: number, support: Support, ctx: CtxStat = pick(CTX_STAT)): Serie {
  return { ctx, p: pick(PRENOMS), cats: tirerSans(ctx.cats, n), v: valeursDistinctes(n, ctx.min, ctx.max), support };
}

/** Le tableau ou le diagramme, avec EXACTEMENT les nombres de la série. */
function figure(s: Serie, opts: { cache?: number; surligne?: number } = {}): Q["canvas"] {
  if (s.support === "tableau")
    return tableauDonneesCanvas({
      title: s.ctx.titre,
      headers: [s.ctx.entete],
      rows: s.cats.map((c, i) => ({ label: c.label, values: [i === opts.cache ? "?" : s.v[i]] })),
      ...(opts.surligne !== undefined ? { highlight: { cell: { row: opts.surligne, col: 0 } } } : {}),
      caption: `Relevé ${de(s.p.nom)}.`,
    });
  return statGraphCanvas({
    graphType: s.support,
    title: s.ctx.titre,
    data: s.cats.map((c, i) => ({ label: c.label, value: s.v[i] })),
    display: { showLabels: true, showValues: true, ...(opts.surligne !== undefined ? { highlightIndex: opts.surligne } : {}) },
  });
}

const somme = (v: number[]) => v.reduce((a, b) => a + b, 0);
const supp = (s: Serie) => NOM_SUPPORT[s.support];
/** L'unité en toutes lettres dans une question (« kilomètres » plutôt que « km »). */
const motU = (s: { ctx: { unite: string } }) => (s.ctx.unite === "km" ? "kilomètres" : s.ctx.unite);
/** « le plus grand effectif », « la plus petite distance », « le plus grand nombre de jours de pluie ». */
function pg(s: Serie, max: boolean): string {
  const g = s.ctx.grandeur ?? { mot: "effectif", fem: false };
  return `${g.fem ? "la" : "le"} plus ${max ? "grand" : "petit"}${g.fem ? "e" : ""} ${g.mot}`;
}
/** Le début de l'énoncé : la situation, parfois réduite au titre de la figure. */
function amorce(s: Serie): string {
  return pick([
    () => s.ctx.intro(s.p),
    () => s.ctx.intro(s.p),
    () => `${maj(supp(s))} ${de(s.p.nom)} s’intitule « ${s.ctx.titre} ».`,
  ])();
}

/** K1 — lire une valeur. */
function qLire(s: Serie, i = entre(0, s.cats.length - 1)): Q {
  const c = s.cats[i];
  const q = s.ctx.combien(c, s.p);
  const text = pick([
    () => `${amorce(s)} ${maj(q)} ?`,
    () => `${amorce(s)} D’après ${supp(s)}, ${q} ?`,
    () => `${amorce(s)} Lis ${supp(s)}. ${maj(q)} ?`,
    () => `${amorce(s)} Regarde ${supp(s)}. ${maj(q)} ?`,
  ])();
  // « Combien de merles… ? » : la réponse se compte en merles, pas en « oiseaux ».
  const u = s.ctx.unite === "oiseaux" && !/oiseaux/.test(text) ? c.gn : s.ctx.unite;
  return {
    text,
    format: "short",
    expected: [`${s.v[i]} ${u}`],
    comparator: "number_equal",
    explanation: se(
      "lire une donnée, c’est repérer la bonne catégorie et le nombre qui lui correspond.",
      `on cherche « ${c.label} » dans ${supp(s)}, puis on lit le nombre associé.`,
      `En face de « ${c.label} », on lit ${s.v[i]}.`,
      `la réponse est ${s.v[i]} ${u}.`,
    ),
    canvas: figure(s, { surligne: s.support === "tableau" && Math.random() < 0.5 ? i : undefined }),
  };
}

/** K3 — l'effectif total. */
function qTotal(s: Serie): Q {
  const t = somme(s.v);
  const text = pick([
    () => `${amorce(s)} ${maj(s.ctx.tout(s.p))} en tout ?`,
    () => `${amorce(s)} D’après ${supp(s)}, ${s.ctx.tout(s.p)} au total ?`,
    () => `${amorce(s)} Additionne toutes les valeurs. Combien ${deMot(motU(s))} y a-t-il en tout ?`,
    () => `${amorce(s)} Quel est le nombre total ${deMot(motU(s))} ?`,
  ])();
  return {
    text,
    format: "short",
    expected: [`${t} ${s.ctx.unite}`],
    comparator: "number_equal",
    explanation: se(
      "l’effectif total est la somme de tous les effectifs.",
      "on lit chaque valeur, puis on les additionne toutes.",
      `${s.v.join(" + ")} = ${t}.`,
      `il y a ${t} ${s.ctx.unite} en tout.`,
    ),
    canvas: figure(s),
  };
}

/** K4 — l'écart entre deux catégories (la première est la plus grande). */
function qDiff(s: Serie): Q {
  let [i, j] = shuffle(s.cats.map((_, k) => k)).slice(0, 2);
  if (s.v[i] < s.v[j]) [i, j] = [j, i];
  const A = s.cats[i].label;
  const B = s.cats[j].label;
  const d = s.v[i] - s.v[j];
  const u = s.ctx.unite;
  const text = pick([
    () => `${amorce(s)} Combien ${deMot(motU(s))} de plus pour ${A} que pour ${B} ?`,
    () => `${amorce(s)} ${A} a combien ${deMot(motU(s))} de plus ${que(B)} ?`,
    () => `${amorce(s)} Combien ${deMot(motU(s))} séparent ${A} et ${B} ?`,
    () => `${amorce(s)} Calcule l’écart, en nombre ${deMot(motU(s))}, entre ${A} et ${B}.`,
  ])();
  return {
    text,
    format: "short",
    expected: [`${d} ${u}`],
    comparator: "number_equal",
    explanation: se(
      "comparer deux effectifs, c’est calculer leur différence.",
      "on lit les deux valeurs, puis on soustrait la plus petite de la plus grande.",
      `« ${A} » : ${s.v[i]} ; « ${B} » : ${s.v[j]}. ${s.v[i]} − ${s.v[j]} = ${d}.`,
      `l’écart est de ${d} ${u}.`,
    ),
    canvas: figure(s),
  };
}

/** K5 — deux catégories réunies. */
function qSomme2(s: Serie): Q {
  const [i, j] = shuffle(s.cats.map((_, k) => k)).slice(0, 2).sort((x, y) => x - y);
  const A = s.cats[i].label;
  const B = s.cats[j].label;
  const t = s.v[i] + s.v[j];
  const u = s.ctx.unite;
  const text = pick([
    () => `${amorce(s)} Combien ${deMot(motU(s))} pour ${A} et ${B} réunis ?`,
    () => `${amorce(s)} Additionne les ${motU(s)} ${de(A)} et ${de(B)}. Combien en trouves-tu ?`,
    () => `${amorce(s)} Ensemble, combien ${deMot(motU(s))} comptent ${A} et ${B} ?`,
  ])();
  return {
    text,
    format: "short",
    expected: [`${t} ${u}`],
    comparator: "number_equal",
    explanation: se(
      "réunir deux catégories, c’est additionner leurs effectifs.",
      "on lit les deux valeurs, puis on les additionne.",
      `${s.v[i]} + ${s.v[j]} = ${t}.`,
      `cela fait ${t} ${u}.`,
    ),
    canvas: figure(s),
  };
}

/** Quatre propositions au plus, la bonne réponse toujours dedans. */
function choixLabels(s: Serie, bon: number): string[] {
  const autres = shuffle(s.cats.map((_, k) => k).filter((k) => k !== bon)).slice(0, 3);
  return shuffle([bon, ...autres].map((k) => s.cats[k].label));
}

/** K2 — la catégorie au plus grand (ou au plus petit) effectif. */
function qExtreme(s: Serie, max = Math.random() < 0.6): Q {
  const k = s.v.indexOf(max ? Math.max(...s.v) : Math.min(...s.v));
  const qu = s.ctx.quel;
  const text = max
    ? pick([
        () => `${amorce(s)} ${qu} a ${pg(s, true)} ?`,
        () => `${amorce(s)} D’après ${supp(s)}, ${qu.toLowerCase()} arrive en tête ?`,
        () => `${amorce(s)} Compare les valeurs. ${qu} a ${pg(s, true)} ?`,
      ])()
    : pick([
        () => `${amorce(s)} ${qu} a ${pg(s, false)} ?`,
        () => `${amorce(s)} D’après ${supp(s)}, ${qu.toLowerCase()} arrive en dernier ?`,
        () => `${amorce(s)} Compare les valeurs. ${qu} a ${pg(s, false)} ?`,
      ])();
  return {
    text,
    format: "qcm",
    choices: choixLabels(s, k),
    expected: [s.cats[k].label],
    comparator: "mcq_exact",
    explanation: se(
      "comparer des effectifs, c’est chercher la plus grande ou la plus petite valeur.",
      "on lit toutes les valeurs, puis on les compare.",
      `Les valeurs sont ${s.cats.map((c, i) => `${c.label} ${s.v[i]}`).join(", ")}. La ${max ? "plus grande" : "plus petite"} est ${s.v[k]}.`,
      `la réponse est « ${s.cats[k].label} ».`,
    ),
    canvas: figure(s),
  };
}

/** K11 — l'écart entre le plus grand et le plus petit effectif. */
function qEcartExtremes(s: Serie): Q {
  const M = Math.max(...s.v);
  const m = Math.min(...s.v);
  const text = pick([
    () => `${amorce(s)} Combien ${deMot(motU(s))} séparent ${pg(s, true)} et ${pg(s, false)} ?`,
    () => `${amorce(s)} Calcule l’écart, en nombre ${deMot(motU(s))}, entre ${pg(s, true)} et ${pg(s, false)}.`,
  ])();
  return {
    text,
    format: "short",
    expected: [`${M - m} ${s.ctx.unite}`],
    comparator: "number_equal",
    explanation: se(
      "l’écart entre deux effectifs est leur différence.",
      "on repère la plus grande et la plus petite valeur, puis on soustrait.",
      `Le plus grand effectif est ${M}, le plus petit ${m} : ${M} − ${m} = ${M - m}.`,
      `l’écart est de ${M - m} ${s.ctx.unite}.`,
    ),
    canvas: figure(s),
  };
}

/** K10 — retrouver la catégorie qui a un effectif donné. */
function qInverse(s: Serie, k = entre(0, s.cats.length - 1)): Q {
  const u = s.ctx.unite;
  const text = pick([
    () => `${amorce(s)} ${s.ctx.quel} correspond à ${s.v[k]} ${u} ?`,
    () => `${amorce(s)} Dans ${supp(s)}, quelle catégorie a la valeur ${s.v[k]} ?`,
    () => `${amorce(s)} On lit ${s.v[k]} ${u}. ${s.ctx.quel} est-ce ?`,
  ])();
  return {
    text,
    format: "qcm",
    choices: choixLabels(s, k),
    expected: [s.cats[k].label],
    comparator: "mcq_exact",
    explanation: se(
      "on peut lire un tableau ou un diagramme dans les deux sens.",
      `on cherche la valeur ${s.v[k]}, puis on lit la catégorie qui lui correspond.`,
      `La valeur ${s.v[k]} est celle de « ${s.cats[k].label} ».`,
      `la réponse est « ${s.cats[k].label} ».`,
    ),
    canvas: figure(s),
  };
}

/** K6 — une valeur cachée, retrouvée grâce au total (tableau seulement). */
function qManquant(s: Serie): Q {
  const k = entre(0, s.cats.length - 1);
  const t = somme(s.v);
  const connus = s.v.filter((_, i) => i !== k);
  const u = s.ctx.unite;
  const A = s.cats[k].label;
  const text = pick([
    () => `${amorce(s)} Il y a ${t} ${u} en tout. Une case est effacée. Quel nombre faut-il écrire pour ${A} ?`,
    () => `${amorce(s)} Le total est de ${t} ${u}. Retrouve le nombre effacé, celui ${de(A)}.`,
    () => `${amorce(s)} Le total vaut ${t} ${u}, mais la case ${A} est effacée. Que vaut-elle ?`,
  ])();
  return {
    text,
    format: "short",
    expected: [`${s.v[k]} ${u}`],
    comparator: "number_equal",
    explanation: se(
      "la somme de tous les effectifs est égale à l’effectif total.",
      "on additionne les effectifs connus, puis on les retire du total.",
      `${connus.join(" + ")} = ${somme(connus)}, et ${t} − ${somme(connus)} = ${s.v[k]}.`,
      `il faut écrire ${s.v[k]} pour « ${A} ».`,
    ),
    canvas: figure({ ...s, support: "tableau" }, { cache: k }),
  };
}

/** K9 — quelle phrase est vraie ? Les phrases suivent des modèles fixes, que le correcteur sait relire. */
function qVrai(s: Serie, modeles: ("plusQue" | "max" | "min" | "total" | "ecart" | "moitie" | "double")[]): Q {
  const n = s.cats.length;
  // Sans guillemets (07/10) : les élèves lisent « Juin a 9 jours de plus que Mai ».
  const L = (k: number) => s.cats[k].label;
  const u = s.ctx.unite;
  const M = deMot(s.ctx.unite === "jours" ? "jours de pluie" : motU(s));
  const t = somme(s.v);
  const iMax = s.v.indexOf(Math.max(...s.v));
  const iMin = s.v.indexOf(Math.min(...s.v));
  const vraies: string[] = [];
  const fausses: string[] = [];
  const paires: [number, number][] = [];
  for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) if (a !== b) paires.push([a, b]);
  for (const m of modeles) {
    for (const [a, b] of paires) {
      if (m === "plusQue") (s.v[a] > s.v[b] ? vraies : fausses).push(`${L(a)} a plus ${M} ${que(L(b))}.`);
      if (m === "ecart") {
        const d = s.v[a] - s.v[b];
        if (d > 0) {
          vraies.push(`${L(a)} a ${d} ${u} de plus ${que(L(b))}.`);
          fausses.push(`${L(a)} a ${d + pick([1, 2, 3])} ${u} de plus ${que(L(b))}.`);
          fausses.push(`${L(b)} a ${d} ${u} de plus ${que(L(a))}.`);
        }
      }
      if (m === "double") (s.v[a] === 2 * s.v[b] ? vraies : fausses).push(`${L(a)} a deux fois plus ${M} ${que(L(b))}.`);
    }
    for (let a = 0; a < n; a++) {
      if (m === "max") (a === iMax ? vraies : fausses).push(`${L(a)} a le plus ${M}.`);
      if (m === "min") (a === iMin ? vraies : fausses).push(`${L(a)} a le moins ${M}.`);
      if (m === "moitie") (2 * s.v[a] > t ? vraies : fausses).push(`${L(a)} fait plus de la moitié du total.`);
    }
    if (m === "total") {
      const uu = u === "jours" ? "jours de pluie" : u;
      vraies.push(`Il y a ${t} ${uu} en tout.`);
      fausses.push(`Il y a ${t + pick([-2, -1, 1, 2, 10])} ${uu} en tout.`);
    }
  }
  // La phrase vraie vient en priorité du modèle le plus exigeant (le premier).
  const prem = vraies.filter((x) => (modeles[0] === "plusQue" ? / a plus .+ que / : modeles[0] === "max" ? / a le plus / : modeles[0] === "min" ? / a le moins / : modeles[0] === "total" ? /en tout/ : modeles[0] === "ecart" ? /de plus que/ : modeles[0] === "moitie" ? /moitié/ : /double/).test(x));
  const juste = pick(prem.length ? prem : vraies);
  const pieges = shuffle([...new Set(fausses)]).slice(0, 3);
  const text = pick([
    () => `${amorce(s)} Lis ${supp(s)}. Quelle phrase est vraie ?`,
    () => `${amorce(s)} Quelle affirmation est juste ?`,
    () => `${amorce(s)} ${s.p.nom} écrit quatre phrases. Une seule dit vrai : laquelle ?`,
    () => `${amorce(s)} Laquelle de ces conclusions est correcte ?`,
  ])();
  return {
    text,
    format: "qcm",
    choices: shuffle([juste, ...pieges]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: se(
      "interpréter des données, c’est vérifier chaque phrase avec les nombres.",
      "on lit toutes les valeurs, puis on teste chaque phrase.",
      `Les valeurs sont ${s.cats.map((c, i) => `${c.label} ${s.v[i]}`).join(", ")} (total ${t}). Seule la phrase « ${juste} » est vérifiée.`,
      `on garde « ${juste} ».`,
    ),
    canvas: figure(s),
  };
}

/** K12 — la catégorie qui fait la moitié (ou le quart) du total, sur un diagramme circulaire. */
function qPart(quart = Math.random() < 0.4): Q {
  const ctx = pick(CTX_STAT);
  const n = quart ? 4 : pick([3, 4]);
  const cats = tirerSans(ctx.cats, n);
  // Les autres font 1 (moitié) ou 3 (quart) fois la part cherchée.
  let v: number[];
  let k: number;
  for (;;) {
    // Au moins 6 : il faut pouvoir partager le reste en valeurs distinctes.
    const part = entre(Math.max(6, ctx.min), Math.max(8, Math.min(ctx.max, quart ? 15 : 20)));
    const reste = quart ? 3 * part : part;
    const autres = n - 1;
    const tir = valeursDistinctes(autres, 1, reste - 1);
    const s0 = somme(tir.slice(0, autres - 1));
    const dernier = reste - s0;
    const vals = [...tir.slice(0, autres - 1), dernier];
    if (dernier < 1 || new Set([...vals, part]).size !== n) continue;
    k = entre(0, n - 1);
    v = [...vals];
    v.splice(k, 0, part);
    break;
  }
  const s: Serie = { ctx, p: pick(PRENOMS), cats, v: v!, support: "camembert" };
  const mot = quart ? "le quart" : "la moitié";
  const text = pick([
    () => `${amorce(s)} Quelle catégorie représente ${mot} du total ?`,
    () => `${amorce(s)} Un secteur occupe exactement ${mot} du disque. Lequel ?`,
    () => `${amorce(s)} ${s.ctx.quel} fait ${mot} du total ?`,
  ])();
  const t = somme(s.v);
  return {
    text,
    format: "qcm",
    choices: choixLabels(s, k!),
    expected: [cats[k!].label],
    comparator: "mcq_exact",
    explanation: se(
      `${mot} du total s’obtient en divisant le total par ${quart ? 4 : 2}.`,
      "on calcule le total, on le divise, puis on cherche le secteur qui a cette valeur.",
      `Total : ${s.v.join(" + ")} = ${t}. ${t} ÷ ${quart ? 4 : 2} = ${t / (quart ? 4 : 2)} : c’est « ${cats[k!].label} ».`,
      `« ${cats[k!].label} » représente ${mot} du total.`,
    ),
    canvas: figure(s),
  };
}

/* ───── Tableaux à double entrée ───── */

type CtxDouble = {
  titre: string;
  intro: (p: Prenom) => string;
  lignes: Cat[];
  cols: Cat[];
  /** [question sans « ? », unité de la réponse] */
  cellule: (r: Cat, k: Cat, p: Prenom) => [string, string];
  totalLigne: (r: Cat, p: Prenom) => [string, string];
  totalCol: (k: Cat, p: Prenom) => [string, string];
  min: number;
  max: number;
};
const FILLES_GARCONS = [cat("Filles", "filles"), cat("Garçons", "garçons")];
const WEEKEND = [cat("Samedi", "le samedi"), cat("Dimanche", "le dimanche"), cat("Mercredi", "le mercredi")];
const CTX_DOUBLE: CtxDouble[] = [
  {
    titre: "Sport préféré des élèves du collège",
    intro: (p) => `${p.nom} a fait une enquête sur le sport préféré des élèves du collège.`,
    lignes: SPORTS, cols: FILLES_GARCONS,
    cellule: (r, k) => [`combien de ${k.gn} ont choisi ${r.gn}`, k.gn],
    totalLigne: (r) => [`combien d’élèves ont choisi ${r.gn} en tout`, "élèves"],
    totalCol: (k) => [`combien de ${k.gn} ont répondu en tout`, k.gn],
    min: 1, max: 15,
  },
  {
    titre: "Instrument choisi",
    intro: (p) => `À l’école de musique, ${p.nom} compte les inscriptions par instrument.`,
    lignes: INSTRUMENTS, cols: FILLES_GARCONS,
    cellule: (r, k) => [`combien de ${k.gn} ont choisi ${r.gn}`, k.gn],
    totalLigne: (r) => [`combien d’élèves ont choisi ${r.gn} en tout`, "élèves"],
    totalCol: (k) => [`combien de ${k.gn} sont inscrits en tout`, k.gn],
    min: 1, max: 12,
  },
  {
    titre: "Cagettes vendues au marché",
    intro: (p) => `${p.nom} aide ses parents au marché. ${Il(p)} note les cagettes vendues chaque jour de marché.`,
    lignes: FRUITS, cols: WEEKEND,
    cellule: (r, k) => [`combien de cagettes ${r.gn} ont été vendues ${k.gn}`, "cagettes"],
    totalLigne: (r) => [`combien de cagettes ${r.gn} ont été vendues en tout`, "cagettes"],
    totalCol: (k) => [`combien de cagettes ont été vendues ${k.gn} en tout`, "cagettes"],
    min: 3, max: 25,
  },
  {
    titre: "Crêpes vendues",
    intro: (p) => `${p.nom} tient le stand de crêpes de la kermesse pendant plusieurs jours.`,
    lignes: GARNITURES, cols: WEEKEND,
    cellule: (r, k) => [`combien de crêpes ${r.gn} ont été vendues ${k.gn}`, "crêpes"],
    totalLigne: (r) => [`combien de crêpes ${r.gn} ont été vendues en tout`, "crêpes"],
    totalCol: (k) => [`combien de crêpes ont été vendues ${k.gn} en tout`, "crêpes"],
    min: 3, max: 30,
  },
  {
    titre: "Cornets vendus cet été",
    intro: (p) => `${p.nom} aide un glacier pendant l’été. ${Il(p)} recopie les ventes de chaque mois.`,
    lignes: PARFUMS, cols: ["Juin", "Juillet", "Août"].map((m) => cat(m, `en ${m.toLowerCase()}`)),
    cellule: (r, k) => [`combien de cornets ${r.gn} ont été vendus ${k.gn}`, "cornets"],
    totalLigne: (r) => [`combien de cornets ${r.gn} ont été vendus en tout`, "cornets"],
    totalCol: (k) => [`combien de cornets ont été vendus ${k.gn} en tout`, "cornets"],
    min: 10, max: 60,
  },
  {
    titre: "Trajet jusqu’au collège",
    intro: (p) => `${p.nom} interroge trois classes sur leur trajet jusqu’au collège.`,
    lignes: TRANSPORTS, cols: ["bleue", "verte", "jaune"].map((x) => cat(`Classe ${x}`, `de la classe ${x}`)),
    cellule: (r, k) => [`combien d’élèves ${k.gn} viennent ${r.gn}`, "élèves"],
    totalLigne: (r) => [`combien d’élèves viennent ${r.gn} en tout`, "élèves"],
    totalCol: (k) => [`combien d’élèves ${k.gn} ont répondu en tout`, "élèves"],
    min: 1, max: 12,
  },
  {
    titre: "Plants du potager",
    intro: (p) => `Le potager de l’école a plusieurs carrés. ${p.nom} compte les plants de chacun.`,
    lignes: LEGUMES, cols: ["nord", "sud", "est"].map((x) => cat(`Carré ${x}`, `dans le carré ${x}`)),
    cellule: (r, k) => [`combien de plants ${r.gn} y a-t-il ${k.gn}`, "plants"],
    totalLigne: (r) => [`combien de plants ${r.gn} y a-t-il en tout`, "plants"],
    totalCol: (k) => [`combien de plants y a-t-il ${k.gn} en tout`, "plants"],
    min: 2, max: 20,
  },
  {
    titre: "Oiseaux observés",
    intro: (p) => `${p.nom} observe les oiseaux de son jardin à deux moments de la journée.`,
    lignes: OISEAUX, cols: [cat("Matin", "le matin"), cat("Soir", "le soir")],
    cellule: (r, k, p) => [`combien de ${r.gn} ${p.nom} a-t-${il(p)} comptés ${k.gn}`, r.gn],
    totalLigne: (r, p) => [`combien de ${r.gn} ${p.nom} a-t-${il(p)} comptés en tout`, r.gn],
    totalCol: (k, p) => [`combien d’oiseaux ${p.nom} a-t-${il(p)} comptés ${k.gn} en tout`, "oiseaux"],
    min: 1, max: 15,
  },
];

type Double = { ctx: CtxDouble; p: Prenom; lignes: Cat[]; cols: Cat[]; v: number[][] };
function tirerDouble(nl: number, nc: number): Double {
  const ctx = pick(CTX_DOUBLE);
  const cols = ctx.cols.slice(0, Math.min(nc, ctx.cols.length));
  const lignes = tirerSans(ctx.lignes, nl);
  return { ctx, p: pick(PRENOMS), lignes, cols, v: lignes.map(() => cols.map(() => entre(ctx.min, ctx.max))) };
}
function figureDouble(d: Double, surligne?: [number, number]): Q["canvas"] {
  return tableauDonneesCanvas({
    title: d.ctx.titre,
    headers: d.cols.map((k) => k.label),
    rows: d.lignes.map((r, i) => ({ label: r.label, values: d.v[i] })),
    ...(surligne ? { highlight: { cell: { row: surligne[0], col: surligne[1] } } } : {}),
    caption: "Tableau à double entrée.",
  });
}

/** K7 — lire une case d'un tableau à double entrée. */
function qCellule(d: Double, aide = false): Q {
  const i = entre(0, d.lignes.length - 1);
  const j = entre(0, d.cols.length - 1);
  const r = d.lignes[i];
  const k = d.cols[j];
  const [q, u] = d.ctx.cellule(r, k, d.p);
  const intro = d.ctx.intro(d.p);
  const text = aide
    ? pick([
        () => `${intro} Cherche la ligne ${r.label} et la colonne ${k.label}. ${maj(q)} ?`,
        () => `${intro} Lis la case au croisement de la ligne ${r.label} et de la colonne ${k.label}. ${maj(q)} ?`,
      ])()
    : pick([
        () => `${intro} ${maj(q)} ?`,
        () => `${intro} Lis le tableau. ${maj(q)} ?`,
        () => `D’après le tableau ${de(d.p.nom)}, ${q} ?`,
      ])();
  return {
    text,
    format: "short",
    expected: [`${d.v[i][j]} ${u}`],
    comparator: "number_equal",
    explanation: se(
      "dans un tableau à double entrée, une donnée se lit au croisement d’une ligne et d’une colonne.",
      `on suit la ligne « ${r.label} » jusqu’à la colonne « ${k.label} ».`,
      `Au croisement, on lit ${d.v[i][j]}.`,
      `la réponse est ${d.v[i][j]} ${u}.`,
    ),
    canvas: figureDouble(d, aide ? [i, j] : undefined),
  };
}

/** K7 inverse — dans une colonne, quelle ligne porte ce nombre ? */
function qCelluleInverse(d: Double): Q {
  const j = entre(0, d.cols.length - 1);
  // Valeurs distinctes dans la colonne : une seule ligne peut convenir.
  const col = valeursDistinctes(d.lignes.length, d.ctx.min, d.ctx.max);
  d.lignes.forEach((_, i) => (d.v[i][j] = col[i]));
  const i = entre(0, d.lignes.length - 1);
  const k = d.cols[j];
  const N = d.v[i][j];
  const text = pick([
    () => `${d.ctx.intro(d.p)} Dans la colonne ${k.label}, quelle ligne contient le nombre ${N} ?`,
    () => `${d.ctx.intro(d.p)} On lit ${N} dans la colonne ${k.label}. Sur quelle ligne ?`,
  ])();
  const autres = shuffle(d.lignes.map((_, x) => x).filter((x) => x !== i)).slice(0, 3);
  return {
    text,
    format: "qcm",
    choices: shuffle([i, ...autres].map((x) => d.lignes[x].label)),
    expected: [d.lignes[i].label],
    comparator: "mcq_exact",
    explanation: se(
      "un tableau à double entrée se lit aussi à l’envers : de la case vers la ligne.",
      `on descend la colonne « ${k.label} » jusqu’au nombre ${N}.`,
      `Le nombre ${N} est sur la ligne « ${d.lignes[i].label} ».`,
      `la réponse est « ${d.lignes[i].label} ».`,
    ),
    canvas: figureDouble(d),
  };
}

/** K8 — total d'une ligne ou d'une colonne. */
function qTotalDouble(d: Double, sens: "ligne" | "colonne"): Q {
  const intro = d.ctx.intro(d.p);
  if (sens === "ligne") {
    const i = entre(0, d.lignes.length - 1);
    const r = d.lignes[i];
    const [q, u] = d.ctx.totalLigne(r, d.p);
    const t = somme(d.v[i]);
    return {
      text: pick([() => `${intro} ${maj(q)} ?`, () => `${intro} Additionne la ligne ${r.label}. ${maj(q)} ?`, () => `D’après le tableau ${de(d.p.nom)}, ${q} ?`])(),
      format: "short",
      expected: [`${t} ${u}`],
      comparator: "number_equal",
      explanation: se(
        "le total d’une ligne est la somme de toutes ses cases.",
        `on additionne les cases de la ligne « ${r.label} ».`,
        `${d.v[i].join(" + ")} = ${t}.`,
        `la réponse est ${t} ${u}.`,
      ),
      canvas: figureDouble(d),
    };
  }
  const j = entre(0, d.cols.length - 1);
  const k = d.cols[j];
  const [q, u] = d.ctx.totalCol(k, d.p);
  const col = d.v.map((l) => l[j]);
  const t = somme(col);
  return {
    text: pick([() => `${intro} ${maj(q)} ?`, () => `${intro} Additionne la colonne ${k.label}. ${maj(q)} ?`, () => `D’après le tableau ${de(d.p.nom)}, ${q} ?`])(),
    format: "short",
    expected: [`${t} ${u}`],
    comparator: "number_equal",
    explanation: se(
      "le total d’une colonne est la somme de toutes ses cases.",
      `on additionne les cases de la colonne « ${k.label} ».`,
      `${col.join(" + ")} = ${t}.`,
      `la réponse est ${t} ${u}.`,
    ),
    canvas: figureDouble(d),
  };
}

/* ───── Enquêtes : planifier, mesurer, construire le tableau ───── */

/** Un sujet d'enquête, et les trois défauts de question que l'élève doit écarter. */
type SujetEnquete = { quoi: string; bonne: string; theme: string };
const SUJETS_ENQUETE: SujetEnquete[] = [
  { quoi: "le sport préféré", bonne: "« Quel est ton sport préféré parmi : football, danse, judo, natation ? »", theme: "le sport" },
  { quoi: "le temps d’écran", bonne: "« Combien d’heures passes-tu devant un écran le mercredi ? »", theme: "les écrans" },
  { quoi: "le moyen de transport pour venir au collège", bonne: "« Comment viens-tu au collège : à pied, en bus, à vélo ou en voiture ? »", theme: "le trajet du matin" },
  { quoi: "les lectures de vacances", bonne: "« Combien de livres as-tu lus pendant les vacances ? »", theme: "la lecture" },
  { quoi: "l’heure du coucher", bonne: "« À quelle heure te couches-tu le dimanche soir ? »", theme: "le sommeil" },
  { quoi: "le fruit préféré", bonne: "« Quel est ton fruit préféré parmi : pomme, banane, fraise, orange ? »", theme: "les fruits" },
  { quoi: "le nombre de frères et sœurs", bonne: "« Combien as-tu de frères et sœurs ? »", theme: "la famille" },
  { quoi: "l’animal préféré", bonne: "« Quel est ton animal préféré parmi : chat, chien, cheval, lapin ? »", theme: "les animaux" },
  { quoi: "le petit-déjeuner", bonne: "« Combien de jours par semaine prends-tu un petit-déjeuner ? »", theme: "le petit-déjeuner" },
  { quoi: "l’instrument de musique préféré", bonne: "« Quel instrument préfères-tu parmi : guitare, piano, batterie, flûte ? »", theme: "la musique" },
  { quoi: "le temps de trajet jusqu’au collège", bonne: "« Combien de minutes dure ton trajet jusqu’au collège ? »", theme: "le trajet" },
  { quoi: "la saison préférée", bonne: "« Quelle est ta saison préférée parmi : printemps, été, automne, hiver ? »", theme: "les saisons" },
];
/** Les trois pièges d'une question d'enquête (repérés aussi par le correcteur). */
const deTheme = (t: string) => (t.startsWith("le ") ? `du ${t.slice(3)}` : t.startsWith("les ") ? `des ${t.slice(4)}` : `de ${t}`);
const piegesQuestion = (s: SujetEnquete) => [
  `« Que penses-tu ${deTheme(s.theme)} ? »`,
  `« ${maj(s.theme)}, c’est vraiment important, non ? »`,
  `« Aimes-tu un peu ${s.theme}, ou pas trop ? »`,
];

/** Population visée, et un groupe qui n'en représente qu'une partie. */
type Population = { tous: string; sort: string; biais: string[]; autres: string[] };
const POPULATIONS: Population[] = [
  {
    tous: "des élèves du collège",
    sort: "des élèves tirés au sort dans toutes les classes",
    biais: ["les élèves du club informatique", "les élèves présents au CDI à midi", "les élèves qui attendent le bus", "les élèves de l’association sportive", "les élèves qui mangent à la cantine"],
    autres: ["les professeurs du collège", "seulement ses meilleurs amis", "les délégués de chaque classe seulement"],
  },
  {
    tous: "des habitants de son quartier",
    sort: "des habitants tirés au sort dans toutes les rues du quartier",
    biais: ["les clients de la boulangerie à 7 heures", "les joueurs du club de foot", "les parents qui attendent devant l’école", "les personnes assises au parc"],
    autres: ["seulement sa famille", "les élèves de sa classe", "les touristes de passage"],
  },
  {
    tous: "des élèves de sa classe",
    sort: "tous les élèves de la classe, un par un",
    biais: ["les élèves assis au premier rang", "les filles seulement", "les garçons seulement", "les élèves du club théâtre"],
    autres: ["les élèves d’une autre classe", "seulement ses meilleurs amis", "les professeurs de la classe"],
  },
];

function qPlanifierQuestion(): Q {
  const s = pick(SUJETS_ENQUETE);
  const p = pick(PRENOMS);
  const text = pick([
    () => `${p.nom} prépare une enquête sur ${s.quoi} des élèves de sa classe. Quelle question doit-${il(p)} poser ?`,
    () => `${p.nom} veut connaître ${s.quoi} de ses camarades. Quelle question permet de compter les réponses ?`,
    () => `Pour une enquête sur ${s.quoi}, ${p.nom} hésite entre quatre questions. Laquelle est la meilleure ?`,
  ])();
  return {
    text,
    format: "qcm",
    choices: shuffle([s.bonne, ...piegesQuestion(s)]),
    expected: [s.bonne],
    comparator: "mcq_exact",
    explanation: se(
      "une question d’enquête doit appeler une réponse précise, la même pour deux personnes qui pensent la même chose.",
      "on écarte les questions vagues, celles qui soufflent la réponse et celles qui se répondent « un peu ».",
      `${s.bonne} donne des réponses qu’on peut ranger et compter. « Que penses-tu… » donne autant de réponses que de personnes. « …, non ? » souffle la réponse. « Un peu, ou pas trop » ne se compte pas.`,
      "on garde la question précise et neutre.",
    ),
  };
}

function qPlanifierQui(): Q {
  const s = pick(SUJETS_ENQUETE);
  const pop = pick(POPULATIONS);
  const p = pick(PRENOMS);
  const biais = pick(pop.biais);
  const text = pick([
    () => `${p.nom} veut connaître ${s.quoi} ${pop.tous}. Qui doit-${il(p)} interroger ?`,
    () => `Enquête ${de(p.nom)} : ${s.quoi} ${pop.tous}. Quel groupe faut-il interroger ?`,
    () => `${p.nom} prépare une enquête sur ${s.quoi} ${pop.tous}. Qui faut-il interroger pour ne fausser personne ?`,
  ])();
  return {
    text,
    format: "qcm",
    choices: shuffle([pop.sort, biais, ...shuffle(pop.autres).slice(0, 2)]),
    expected: [pop.sort],
    comparator: "mcq_exact",
    explanation: se(
      "les personnes interrogées doivent représenter tout le groupe sur lequel on veut conclure.",
      "on cherche le groupe où chacun avait une chance d’être choisi.",
      `Interroger ${biais} laisse de côté tous les autres : le résultat serait faussé. Seul le choix « ${pop.sort} » donne une chance à chacun.`,
      "on interroge un groupe qui ressemble à toute la population.",
    ),
  };
}

const VERDICT_FAUSSE = "le résultat sera faussé : ce groupe ne représente pas tout le monde";
const VERDICT_BONNE = "l’enquête est bien construite : chacun avait une chance d’être interrogé";
function qPlanifierJuger(): Q {
  const s = pick(SUJETS_ENQUETE);
  const pop = pick(POPULATIONS);
  const p = pick(PRENOMS);
  const bien = Math.random() < 0.4;
  const groupe = bien ? pop.sort : pick(pop.biais);
  const juste = bien ? VERDICT_BONNE : VERDICT_FAUSSE;
  const text = pick([
    () => `${p.nom} veut connaître ${s.quoi} ${pop.tous}. ${Il(p)} interroge ${groupe}. Que peut-on dire de son enquête ?`,
    () => `Pour connaître ${s.quoi} ${pop.tous}, ${p.nom} interroge ${groupe}. Son enquête est-elle bien faite ?`,
  ])();
  return {
    text,
    format: "qcm",
    choices: shuffle([VERDICT_FAUSSE, VERDICT_BONNE, "l’enquête est fiable dès qu’on interroge au moins 30 personnes", "l’enquête est fausse parce qu’elle ne contient aucun calcul"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: se(
      "une enquête n’est fiable que si le groupe interrogé ressemble à toute la population étudiée.",
      "on se demande qui n’avait aucune chance d’être interrogé.",
      bien
        ? `Avec « ${groupe} », personne n’est mis de côté. Le nombre de personnes ou la présence d’un calcul ne changent rien à cela.`
        : `Avec « ${groupe} », beaucoup de personnes n’avaient aucune chance d’être interrogées. Interroger plus de monde dans ce même groupe ne corrigerait rien, et aucun calcul ne rattrape un mauvais choix.`,
      bien ? "l’enquête est bien construite." : "le résultat sera faussé.",
    ),
  };
}

/** Des mesures à consigner : la grandeur, l'objet mesuré, l'unité de la colonne. */
const MESURES = [
  { quoi: (n: number) => `la taille de ${n} camarades`, col: "Taille (cm)" },
  { quoi: (n: number) => `la masse de ${n} pommes`, col: "Masse (g)" },
  { quoi: (n: number) => `la longueur de ${n} feuilles d’arbre`, col: "Longueur (cm)" },
  { quoi: (n: number) => `la durée de ${n} trajets en bus`, col: "Durée (min)" },
  { quoi: (n: number) => `la température de l’eau pendant ${n} jours`, col: "Température (°C)" },
  { quoi: (n: number) => `la hauteur de ${n} plants de haricot`, col: "Hauteur (cm)" },
  { quoi: (n: number) => `le temps de course de ${n} coureurs`, col: "Temps (s)" },
  { quoi: (n: number) => `la masse de ${n} cailloux ramassés`, col: "Masse (g)" },
  { quoi: (n: number) => `la longueur de ${n} sauts en longueur`, col: "Longueur (cm)" },
  { quoi: (n: number) => `le nombre de pas de ${n} élèves pour traverser la cour`, col: "Nombre de pas" },
];
function qLignesMesure(): Q {
  const m = pick(MESURES);
  const n = entre(5, 24);
  const p = pick(PRENOMS);
  const text = pick([
    () => `${p.nom} doit relever ${m.quoi(n)} dans un tableau. Combien de lignes de données faut-il, sans compter l’en-tête ?`,
    () => `${p.nom} prépare un tableau pour noter ${m.quoi(n)}. Une ligne par mesure. Combien de lignes de données en tout ?`,
    () => `Pour consigner ${m.quoi(n)}, ${p.nom} trace un tableau. L’en-tête est « ${m.col} ». Combien de lignes de mesures faut-il prévoir ?`,
  ])();
  return {
    text,
    format: "short",
    expected: [`${n} lignes`],
    comparator: "number_equal",
    explanation: se(
      "un tableau de mesures a une ligne par objet mesuré, plus une ligne d’en-tête qui nomme les colonnes.",
      "on compte les mesures à relever.",
      `Il y a ${n} mesures, donc ${n} lignes de données. L’en-tête, lui, annonce « ${m.col} » : l’unité s’écrit là, une seule fois.`,
      `il faut ${n} lignes.`,
    ),
  };
}

/** Conversions d'une mesure notée dans la mauvaise unité. [unité notée, unité de la colonne, facteur, mot de la colonne] */
const CONVERSIONS = [
  { de: "kg", vers: "g", f: 1000, grandeur: "Masse", la: "la masse", objets: ["pastèques", "sacs de farine", "melons", "cartables"] },
  { de: "m", vers: "cm", f: 100, grandeur: "Taille", la: "la taille", objets: ["camarades", "plants de tournesol", "frères et sœurs"] },
  { de: "cm", vers: "mm", f: 10, grandeur: "Longueur", la: "la longueur", objets: ["crayons", "vis", "insectes", "feuilles"] },
  { de: "min", vers: "s", f: 60, grandeur: "Temps", la: "le temps", objets: ["courses", "chansons", "épreuves de natation"] },
  { de: "h", vers: "min", f: 60, grandeur: "Durée", la: "la durée", objets: ["films", "randonnées", "trajets en train"] },
  { de: "L", vers: "cL", f: 100, grandeur: "Volume", la: "le volume", objets: ["bouteilles", "arrosoirs", "carafes"] },
];
const virgule = (x: number) => String(Math.round(x * 100) / 100).replace(".", ",");
const milliers = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
/** Une valeur notée dans l'unité « de », plausible, qui donne un entier dans l'unité « vers ». */
function valeurConvertible(c: (typeof CONVERSIONS)[number]): number {
  if (c.de === "kg") return pick([1.2, 1.5, 2, 2.5, 3.4, 4.25, 0.8, 0.75, 6.5, 1.05]);
  if (c.de === "m") return pick([1.35, 1.42, 1.5, 1.28, 1.61, 0.95, 1.8]);
  if (c.de === "cm") return pick([12.5, 8.4, 15, 3.7, 17.2, 2.5]);
  if (c.de === "min") return pick([2, 3, 1.5, 4, 2.5, 5]);
  if (c.de === "h") return pick([1.5, 2, 1.25, 2.5, 3, 0.75]);
  return pick([1.5, 2, 0.75, 1.25, 5, 10]);
}
function qConvertirMesure(): Q {
  const c = pick(CONVERSIONS);
  const p = pick(PRENOMS);
  const x = valeurConvertible(c);
  const r = Math.round(x * c.f);
  const obj = pick(c.objets);
  const col = `${c.grandeur} (${c.vers})`;
  const text = pick([
    () => `${p.nom} relève ${c.la} de plusieurs ${obj}. La colonne s’intitule « ${col} ». Une mesure a été notée ${virgule(x)} ${c.de}. Quel nombre faut-il écrire dans la colonne ?`,
    () => `Dans le tableau ${de(p.nom)}, la colonne « ${col} » contient une erreur : ${virgule(x)} ${c.de}. Convertis cette mesure pour la colonne.`,
    () => `${p.nom} mesure des ${obj}. Son tableau est en ${c.vers}, mais une mesure est notée ${virgule(x)} ${c.de}. Combien cela fait-il en ${c.vers} ?`,
  ])();
  return {
    text,
    format: "short",
    expected: [`${milliers(r)} ${c.vers}`, `${r} ${c.vers}`, String(r)],
    comparator: "number_equal",
    explanation: se(
      "toutes les mesures d’une colonne s’écrivent dans la même unité, celle de l’en-tête.",
      `1 ${c.de} = ${c.f} ${c.vers} : on multiplie par ${c.f}.`,
      `${virgule(x)} × ${c.f} = ${milliers(r)}.`,
      `on écrit ${milliers(r)} ${c.vers}.`,
    ),
  };
}
function qComparerMesures(): Q {
  const c = pick(CONVERSIONS.filter((k) => k.de !== "cm"));
  const p = pick(PRENOMS);
  // Une mesure dans la grande unité, trois dans la petite, toutes différentes une fois converties.
  let vals: number[] = [];
  let x = 0;
  for (;;) {
    x = valeurConvertible(c);
    const g = Math.round(x * c.f);
    vals = [g, ...valeursDistinctes(3, Math.max(1, Math.round(g * 0.4)), Math.round(g * 1.6))];
    if (new Set(vals).size === 4) break;
  }
  const max = Math.random() < 0.6;
  const cible = max ? Math.max(...vals) : Math.min(...vals);
  const ecrit = (v: number, k: number) => (k === 0 ? `${virgule(x)} ${c.de}` : `${milliers(v)} ${c.vers}`);
  const choix = vals.map(ecrit);
  const juste = choix[vals.indexOf(cible)];
  const obj = pick(c.objets);
  const mot = max ? "la plus grande" : "la plus petite";
  const text = pick([
    () => `${p.nom} a relevé ${c.la} de quatre ${obj}, sans faire attention aux unités. Quelle mesure est ${mot} ?`,
    () => `Dans le tableau ${de(p.nom)}, les unités sont mélangées. Laquelle de ces mesures est ${mot} ?`,
  ])();
  return {
    text,
    format: "qcm",
    choices: shuffle(choix),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: se(
      "on ne compare deux mesures que dans la même unité.",
      `on convertit tout en ${c.vers} : 1 ${c.de} = ${c.f} ${c.vers}.`,
      `${virgule(x)} ${c.de} = ${milliers(vals[0])} ${c.vers}. On compare ${vals.map(milliers).join(", ")} : ${mot} est ${milliers(cible)} ${c.vers}.`,
      `la réponse est ${juste}.`,
    ),
  };
}

/** Réponses brutes d'une enquête (mots simples, en minuscules). */
const LISTES_BRUTES = [
  { sujet: "leur sport préféré", mots: ["football", "danse", "judo", "tennis", "natation"] },
  { sujet: "leur animal préféré", mots: ["chat", "chien", "lapin", "poisson", "cheval"] },
  { sujet: "leur parfum de glace préféré", mots: ["vanille", "chocolat", "fraise", "citron", "pistache"] },
  { sujet: "leur moyen de transport", mots: ["bus", "vélo", "marche", "voiture", "train"] },
  { sujet: "leur instrument préféré", mots: ["guitare", "piano", "flûte", "violon", "batterie"] },
  { sujet: "leur couleur préférée", mots: ["rouge", "bleu", "vert", "jaune", "violet"] },
  { sujet: "leur saison préférée", mots: ["printemps", "été", "automne", "hiver"] },
  { sujet: "leur fruit préféré", mots: ["pomme", "banane", "fraise", "orange", "kiwi"] },
];
function listeBrute(n: number, k: number) {
  const L = pick(LISTES_BRUTES);
  const mots = tirerSans(L.mots, Math.min(k, L.mots.length));
  const rep = Array.from({ length: n }, () => pick(mots));
  // Chaque réponse possible apparaît au moins une fois.
  mots.forEach((m, i) => (rep[i] = m));
  return { L, mots, rep: shuffle(rep) };
}
function qCompterBrut(): Q {
  const n = entre(10, 16);
  const { L, mots, rep } = listeBrute(n, entre(3, 4));
  const p = pick(PRENOMS);
  const m = pick(mots);
  const eff = rep.filter((x) => x === m).length;
  const text = pick([
    () => `${p.nom} a demandé à ${n} élèves ${L.sujet}. Réponses : ${rep.join(", ")}. Quel est l’effectif de la réponse ${m} ?`,
    () => `Voici les réponses brutes recueillies par ${p.nom} sur ${L.sujet} : ${rep.join(", ")}. Combien d’élèves ont répondu ${m} ?`,
    () => `${p.nom} construit le tableau des effectifs. Réponses notées : ${rep.join(", ")}. Quel nombre écrire en face de ${m} ?`,
  ])();
  return {
    text,
    format: "short",
    expected: [`${eff} élèves`],
    comparator: "number_equal",
    explanation: se(
      "l’effectif d’une réponse est le nombre de fois où elle apparaît.",
      "on parcourt la liste une seule fois, en barrant chaque réponse comptée.",
      `« ${m} » apparaît ${eff} fois. Vérification : les effectifs de ${mots.join(", ")} font ${mots.map((x) => rep.filter((y) => y === x).length).join(" + ")} = ${n}.`,
      `l’effectif de « ${m} » est ${eff}.`,
    ),
  };
}
function qLignesEffectifs(): Q {
  const n = entre(10, 15);
  const { L, mots, rep } = listeBrute(n, entre(3, 5));
  const p = pick(PRENOMS);
  const text = pick([
    () => `${p.nom} a demandé à ${n} élèves ${L.sujet}. Réponses : ${rep.join(", ")}. Combien de lignes de données son tableau des effectifs doit-il avoir ?`,
    () => `Réponses brutes de l’enquête ${de(p.nom)} : ${rep.join(", ")}. Une ligne par réponse possible : combien de lignes faut-il ?`,
  ])();
  return {
    text,
    format: "short",
    expected: [`${mots.length} lignes`],
    comparator: "number_equal",
    explanation: se(
      "un tableau d’effectifs a une ligne par réponse POSSIBLE, pas une ligne par élève.",
      "on liste les réponses différentes de la liste.",
      `Les réponses différentes sont : ${mots.join(", ")}. Cela fait ${mots.length} lignes, et non ${n}.`,
      `il faut ${mots.length} lignes.`,
    ),
  };
}
function qControleSomme(): Q {
  const k = entre(3, 4);
  const L = pick(LISTES_BRUTES);
  const mots = tirerSans(L.mots, Math.min(k, L.mots.length));
  const eff = mots.map(() => entre(2, 9));
  const s = somme(eff);
  const ecart = entre(1, 3);
  const manque = Math.random() < 0.6;
  const N = manque ? s + ecart : s - ecart;
  const p = pick(PRENOMS);
  const tab = mots.map((m, i) => `${m} ${eff[i]}`).join(", ");
  const text = manque
    ? `${p.nom} a interrogé ${N} élèves sur ${L.sujet}. Son tableau donne : ${tab}. Combien de réponses manquent ?`
    : `${p.nom} a interrogé ${N} élèves sur ${L.sujet}. Son tableau donne : ${tab}. Combien de réponses ont été comptées en trop ?`;
  return {
    text,
    format: "short",
    expected: [`${ecart} réponses`],
    comparator: "number_equal",
    explanation: se(
      "la somme des effectifs doit redonner le nombre de personnes interrogées.",
      "on additionne les effectifs, puis on compare au nombre d’élèves interrogés.",
      `${eff.join(" + ")} = ${s}, au lieu de ${N}. ${manque ? `Il manque ${N} − ${s} = ${ecart}` : `Il y a ${s} − ${N} = ${ecart} réponses en trop`}.`,
      `${ecart} réponses ${manque ? "manquent" : "sont en trop"}.`,
    ),
  };
}

export const donneesBank: TutorBankItemV4[] = [
  /* =========================
     DATA_LIRE_TABLEAU
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_tableau_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_enquete",
    microId: "stat_donnee_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans le tableau, combien d’élèves ont choisi le football ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Lis la ligne Football.",
    explanation:
      "Définition : lire un tableau, c’est repérer la bonne ligne et la bonne colonne.\n\n" +
      "Méthode : on cherche la ligne Football, puis on lit la valeur indiquée.\n\n" +
      "Observation : la ligne Football indique 12 élèves.\n\n" +
      "Conclusion : 12 élèves ont choisi le football.",
    tags: ["stat_donnee", "tableau", "lecture", "canvas"],
    canvas: tableauDonneesCanvas({
      title: "Activités choisies",
      headers: ["Nombre d’élèves"],
      rows: [
        { label: "Football", values: [12] },
        { label: "Natation", values: [8] },
        { label: "Danse", values: [10] },
      ],
      highlight: { cell: { row: 0, col: 0 } },
      caption: "Résultats d’un sondage dans une classe de 6e.",
    }),
  },

  gab(
    "6e_stat_stat_stat_donnee_lire_tableau_tpl_1", "stat_enquete", "stat_donnee_lire_tableau", 2,
    "Repère la bonne ligne dans le tableau.",
    ["stat_donnee", "tableau", "lecture", "template", "canvas"],
    () => qLire(tirerSerie(entre(4, 5), "tableau")),
  ),

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_tableau_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_enquete",
    microId: "stat_donnee_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Pour lire correctement une information dans un tableau, que fais-tu ?",
    format: "qcm",
    choices: [
      "je lis le titre, je repère la bonne ligne et la bonne colonne, puis je lis la case",
      "je lis le plus grand nombre du tableau",
      "je lis la première case en haut à gauche",
      "j’additionne toutes les cases du tableau",
    ],
    expected: ["je lis le titre, je repère la bonne ligne et la bonne colonne, puis je lis la case"],
    comparator: "mcq_exact",
    hint: "Parle de la ligne, de la colonne et de la valeur lue.",
    explanation:
      "Définition : un tableau organise des informations en lignes et en colonnes.\n\n" +
      "Méthode : on lit d’abord le titre, puis on repère la ligne et la colonne utiles.\n\n" +
      "Observation : la valeur cherchée se trouve au croisement de la bonne ligne et de la bonne colonne.\n\n" +
      "Conclusion : pour lire un tableau, il faut repérer précisément ligne, colonne et valeur.",
    tags: ["stat_donnee", "tableau", "open", "methode"],
  },

  /* =========================
     DATA_LIRE_GRAPHIQUE
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_graphique_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_graphique",
    difficulty: 1,
    theme: "neutral",
    text: "Sur le graphique, combien d’élèves ont choisi la lecture ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Lis la hauteur du bâton Lecture.",
    explanation:
      "Définition : lire un graphique, c’est repérer une catégorie et la valeur associée.\n\n" +
      "Méthode : on cherche le bâton Lecture, puis on lit sa hauteur.\n\n" +
      "Observation : le bâton Lecture correspond à 9 élèves.\n\n" +
      "Conclusion : 9 élèves ont choisi la lecture.",
    tags: ["stat_donnee", "graphique", "lecture", "canvas"],
    canvas: statGraphCanvas({
      graphType: "batons",
      data: [
        { label: "Sport", value: 12 },
        { label: "Lecture", value: 9 },
        { label: "Jeux", value: 15 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 1 },
    }),
  },

  gab(
    "6e_stat_stat_stat_donnee_lire_graphique_tpl_1", "stat_donnee", "stat_donnee_lire_graphique", 2,
    "Lis la valeur au-dessus de la barre demandée.",
    ["stat_donnee", "graphique", "template", "canvas"],
    () => qLire(tirerSerie(entre(4, 5), pick(["barres", "batons"] as const))),
  ),

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_graphique_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi un graphique aide-t-il à comprendre des données ?",
    format: "qcm",
    choices: [
      "on voit d’un coup d’œil les valeurs les plus grandes et les plus petites",
      "il change les valeurs pour les rendre plus simples",
      "il donne toujours la bonne conclusion sans rien lire",
      "il remplace le titre et les nombres",
    ],
    expected: ["on voit d’un coup d’œil les valeurs les plus grandes et les plus petites"],
    comparator: "mcq_exact",
    hint: "Parle de la comparaison visuelle.",
    explanation:
      "Définition : un graphique représente des données sous une forme visuelle.\n\n" +
      "Méthode : on observe les hauteurs ou les parts pour comparer rapidement.\n\n" +
      "Observation : on voit plus facilement les valeurs grandes, petites ou proches.\n\n" +
      "Conclusion : un graphique aide à lire et comparer des données.",
    tags: ["stat_donnee", "graphique", "open", "raisonnement"],
  },

  /* =========================
     DATA_PRELEVER
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_prelever_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_prelever",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le tableau, combien de filles ont choisi la natation ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cherche la ligne Natation et la colonne Filles.",
    explanation:
      "Définition : prélever une information, c’est retrouver une donnée précise.\n\n" +
      "Méthode : on cherche la bonne ligne et la bonne colonne.\n\n" +
      "Observation : à la ligne Natation et dans la colonne Filles, on lit 6.\n\n" +
      "Conclusion : 6 filles ont choisi la natation.",
    tags: ["stat_donnee", "prelever", "tableau_double_entree", "canvas"],
    canvas: tableauDonneesCanvas({
      title: "Activités choisies",
      headers: ["Filles", "Garçons"],
      rows: [
        { label: "Football", values: [5, 9] },
        { label: "Natation", values: [6, 7] },
        { label: "Danse", values: [8, 3] },
      ],
      highlight: { cell: { row: 1, col: 0 } },
      caption: "Tableau à deux variables : activité et groupe.",
    }),
  },

  gab(
    "6e_stat_stat_stat_donnee_prelever_tpl_1", "stat_donnee", "stat_donnee_prelever", 3,
    "Cherche le croisement entre la bonne ligne et la bonne colonne.",
    ["stat_donnee", "prelever", "tableau_double_entree", "template", "canvas"],
    () => qCellule(tirerDouble(entre(3, 4), entre(2, 3))),
  ),

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_prelever_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_prelever",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi faut-il lire le titre, les lignes et les colonnes avant de répondre à une question sur un tableau ?",
    format: "qcm",
    choices: [
      "pour savoir de quoi parle le tableau et ne pas lire la mauvaise case",
      "parce que la réponse est toujours écrite dans le titre",
      "pour compter le nombre de cases du tableau",
      "ce n’est pas utile : il suffit de lire le premier nombre",
    ],
    expected: ["pour savoir de quoi parle le tableau et ne pas lire la mauvaise case"],
    comparator: "mcq_exact",
    hint: "Explique comment éviter de lire la mauvaise donnée.",
    explanation:
      "Définition : un tableau donne des informations organisées.\n\n" +
      "Méthode : le titre indique le sujet, les lignes et colonnes indiquent où chercher.\n\n" +
      "Observation : si on se trompe de ligne ou de colonne, on lit une mauvaise valeur.\n\n" +
      "Conclusion : lire le titre, les lignes et les colonnes permet de répondre avec précision.",
    tags: ["stat_donnee", "prelever", "open", "verification"],
  },

  /* =========================
     DATA_COMPARER
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le tableau, quelle activité a été choisie par le plus d’élèves ?",
    format: "qcm",
    choices: ["Football", "Natation", "Danse", "Aucune"],
    expected: ["Football"],
    comparator: "mcq_exact",
    hint: "Compare les trois nombres.",
    explanation:
      "Définition : comparer des données, c’est regarder quelle valeur est plus grande, plus petite ou égale.\n\n" +
      "Méthode : on compare les effectifs de chaque activité.\n\n" +
      "Calcul : Football = 14, Natation = 10, Danse = 11. Le plus grand nombre est 14.\n\n" +
      "Conclusion : l’activité la plus choisie est le football.",
    tags: ["stat_donnee", "comparer", "tableau", "canvas"],
    canvas: tableauDonneesCanvas({
      title: "Activités choisies",
      headers: ["Nombre d’élèves"],
      rows: [
        { label: "Football", values: [14] },
        { label: "Natation", values: [10] },
        { label: "Danse", values: [11] },
      ],
      highlight: { row: 0 },
    }),
  },

  gab(
    "6e_stat_stat_stat_donnee_comparer_tpl_1", "stat_donnee", "stat_donnee_comparer", 3,
    "Compare toutes les valeurs avant de choisir.",
    ["stat_donnee", "comparer", "graphique", "template", "canvas"],
    () => qExtreme(tirerSerie(5, pick(["barres", "batons"] as const))),
  ),

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_comparer_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Comment comparer plusieurs données dans un tableau ou un graphique ?",
    format: "qcm",
    choices: [
      "je lis chaque valeur, puis je compare les nombres",
      "je regarde seulement la couleur des barres",
      "je choisis la catégorie écrite en premier",
      "je compare la longueur des noms des catégories",
    ],
    expected: ["je lis chaque valeur, puis je compare les nombres"],
    comparator: "mcq_exact",
    hint: "Parle des valeurs et de ce qu’on cherche.",
    explanation:
      "Définition : comparer des données, c’est étudier les différences entre plusieurs valeurs.\n\n" +
      "Méthode : on repère les valeurs utiles puis on les compare.\n\n" +
      "Observation : on peut chercher la plus grande, la plus petite ou deux valeurs proches.\n\n" +
      "Conclusion : comparer demande de lire précisément les valeurs avant de conclure.",
    tags: ["stat_donnee", "comparer", "open", "methode"],
  },

  /* =========================
     DATA_INTERPRETER
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_interpreter_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce graphique, quelle conclusion est correcte ?",
    format: "qcm",
    choices: [
      "Le sport est l’activité la plus choisie",
      "La lecture est l’activité la plus choisie",
      "Les jeux sont l’activité la moins choisie",
      "Toutes les activités ont le même nombre",
    ],
    expected: ["Le sport est l’activité la plus choisie"],
    comparator: "mcq_exact",
    hint: "Cherche le bâton le plus haut.",
    explanation:
      "Définition : interpréter des données, c’est donner du sens aux valeurs lues.\n\n" +
      "Méthode : on observe le graphique et on repère la valeur la plus grande.\n\n" +
      "Observation : le sport a la valeur la plus élevée.\n\n" +
      "Conclusion : le sport est l’activité la plus choisie.",
    tags: ["stat_donnee", "interpreter", "graphique", "canvas"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Sport", value: 16 },
        { label: "Lecture", value: 9 },
        { label: "Jeux", value: 12 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 0 },
    }),
  },

  gab(
    "6e_stat_stat_stat_donnee_interpreter_tpl_1", "stat_donnee", "stat_donnee_interpreter", 4,
    "Vérifie chaque phrase avec les nombres : une seule tient.",
    ["stat_donnee", "interpreter", "template", "canvas"],
    () => qVrai(tirerSerie(4, pick(["barres", "batons", "tableau"] as const)), pick([["total", "ecart", "plusQue"], ["ecart", "total", "max"]] as const).slice()),
  ),

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_interpreter_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "Un camarade affirme une conclusion à partir d’un graphique. Que dois-tu vérifier avant d’être d’accord ?",
    format: "qcm",
    choices: [
      "le titre, les catégories et les valeurs écrites sur le graphique",
      "rien : un graphique ne se trompe jamais",
      "seulement la couleur des barres",
      "que le camarade parle avec assurance",
    ],
    expected: ["le titre, les catégories et les valeurs écrites sur le graphique"],
    comparator: "mcq_exact",
    hint: "Ne te contente pas de l’impression visuelle.",
    explanation:
      "Définition : une conclusion doit être appuyée par des données exactes.\n\n" +
      "Méthode : on lit le titre, les catégories, les valeurs et la légende si elle existe.\n\n" +
      "Observation : une impression visuelle peut être trompeuse si on ne lit pas les valeurs.\n\n" +
      "Conclusion : il faut vérifier les données avant d’accepter une conclusion.",
    tags: ["stat_donnee", "interpreter", "open", "doute_raisonnable", "verification"],
  },

  /* =========================
     DATA_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_donnee_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un tableau indique : 8 élèves viennent à pied, 12 en bus et 5 en voiture. Combien d’élèves ont répondu au sondage ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "Additionne tous les effectifs.",
    explanation:
      "Définition : un effectif total est le nombre total de réponses ou d’individus.\n\n" +
      "Méthode : on additionne les effectifs de toutes les catégories.\n\n" +
      "Calcul : 8 + 12 + 5 = 25.\n\n" +
      "Conclusion : 25 élèves ont répondu au sondage.",
    tags: ["stat_donnee", "defi", "effectif_total"],
    canvas: tableauDonneesCanvas({
      title: "Transport pour venir au collège",
      headers: ["Nombre d’élèves"],
      rows: [
        { label: "À pied", values: [8] },
        { label: "Bus", values: [12] },
        { label: "Voiture", values: [5] },
      ],
      caption: "Sondage réalisé dans une classe.",
    }),
  },

  gab(
    "6e_stat_stat_donnee_defi_tpl_1", "stat_donnee", "stat_donnee_defi", 5,
    "Additionne ce que tu connais, puis compare au total.",
    ["stat_donnee", "defi", "total", "template", "canvas"],
    () => qManquant(tirerSerie(5, "tableau")),
  ),

  {
    kind: "fixed",
    id: "6e_stat_stat_donnee_defi_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi les données doivent-elles être organisées clairement dans un tableau ou un graphique ?",
    format: "qcm",
    choices: [
      "pour les lire et les comparer vite, sans se tromper",
      "pour avoir plus de données",
      "pour que les nombres deviennent plus grands",
      "parce qu’un tableau change les réponses des personnes",
    ],
    expected: ["pour les lire et les comparer vite, sans se tromper"],
    comparator: "mcq_exact",
    hint: "Pense à la lecture, à la comparaison et aux erreurs possibles.",
    explanation:
      "Définition : organiser des données, c’est les présenter de manière claire.\n\n" +
      "Méthode : on utilise un tableau ou un graphique pour faciliter la lecture.\n\n" +
      "Observation : une bonne organisation permet de comparer et limite les erreurs.\n\n" +
      "Conclusion : organiser les données aide à comprendre et à raisonner correctement.",
    tags: ["stat_donnee", "defi", "open", "raisonnement", "langage"],
  },
    /* =========================
     RENFORT — ERREURS ET RAISONNEMENT
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_tableau_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_enquete",
    microId: "stat_donnee_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève répond sans lire le titre du tableau. Pourquoi est-ce risqué ?",
    format: "qcm",
    choices: [
      "sans le titre, il ne sait pas de quoi parlent les nombres ni dans quelle unité",
      "ce n’est pas risqué : le titre ne sert jamais",
      "parce que le titre contient toujours la réponse",
      "parce qu’un tableau sans titre est forcément faux",
    ],
    expected: ["sans le titre, il ne sait pas de quoi parlent les nombres ni dans quelle unité"],
    comparator: "mcq_exact",
    hint: "Le titre explique ce que représentent les données.",
    explanation:
      "Définition : le titre d’un tableau indique le sujet des données.\n\n" +
      "Méthode : avant de lire une valeur, on lit le titre, les lignes et les colonnes.\n\n" +
      "Observation : sans le titre, on peut mal comprendre ce que représentent les nombres.\n\n" +
      "Conclusion : lire le titre évite les erreurs d’interprétation.",
    tags: ["stat_donnee", "tableau", "open", "erreur", "langage"],
  },

  gab(
    "6e_stat_stat_stat_donnee_prelever_tpl_2_cellule_surlignee", "stat_donnee", "stat_donnee_prelever", 2,
    "Suis la ligne avec le doigt jusqu’à la bonne colonne : la case est surlignée.",
    ["stat_donnee", "prelever", "cellule", "template", "canvas"],
    () => qCellule(tirerDouble(3, 2), true),
  ),

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_comparer_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « 15 est plus petit que 9 parce que le bâton paraît plus bas ». Que doit-il vérifier ?",
    format: "qcm",
    choices: [
      "les nombres écrits et l’échelle du graphique : 15 est plus grand que 9",
      "rien : le bâton le plus bas a toujours la plus petite valeur",
      "la couleur des bâtons",
      "l’ordre des catégories de gauche à droite",
    ],
    expected: ["les nombres écrits et l’échelle du graphique : 15 est plus grand que 9"],
    comparator: "mcq_exact",
    hint: "Il faut lire les valeurs et l’échelle.",
    explanation:
      "Définition : comparer des données demande de lire les valeurs exactes.\n\n" +
      "Méthode : on vérifie les nombres indiqués et l’échelle du graphique.\n\n" +
      "Observation : l’impression visuelle peut être trompeuse si on ne lit pas correctement.\n\n" +
      "Conclusion : il faut lire les valeurs avant de comparer.",
    tags: ["stat_donnee", "comparer", "open", "erreur", "verification"],
  },

  gab(
    "6e_stat_stat_stat_donnee_comparer_tpl_2_difference", "stat_donnee", "stat_donnee_comparer", 3,
    "Calcule la différence entre les deux valeurs.",
    ["stat_donnee", "comparer", "difference", "template", "canvas"],
    () => qDiff(tirerSerie(entre(4, 5), pick(["barres", "batons", "tableau"] as const))),
  ),

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_interpreter_open_2_conclusion_justifiee",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi une conclusion doit-elle s’appuyer sur une donnée du tableau ou du graphique ?",
    format: "qcm",
    choices: [
      "parce que sans valeur lue, la conclusion n’est qu’une impression",
      "parce qu’une conclusion doit être la plus longue possible",
      "ce n’est pas nécessaire si on est sûr de soi",
      "parce que le tableau donne toujours la conclusion écrite",
    ],
    expected: ["parce que sans valeur lue, la conclusion n’est qu’une impression"],
    comparator: "mcq_exact",
    hint: "Une conclusion doit s’appuyer sur une valeur lue.",
    explanation:
      "Définition : interpréter des données, c’est formuler une conclusion à partir de valeurs observées.\n\n" +
      "Méthode : on cite une donnée précise pour justifier la conclusion.\n\n" +
      "Observation : sans valeur, la conclusion peut être une simple impression.\n\n" +
      "Conclusion : une bonne conclusion doit être justifiée par une donnée.",
    tags: ["stat_donnee", "interpreter", "open", "justification", "raisonnement"],
  },

  gab(
    "6e_stat_stat_donnee_defi_tpl_2_double_entree_total_ligne", "stat_donnee", "stat_donnee_defi", 5,
    "Additionne toutes les cases de la ligne demandée.",
    ["stat_donnee", "defi", "tableau_double_entree", "total", "template", "canvas"],
    () => qTotalDouble(tirerDouble(entre(3, 4), entre(2, 3)), "ligne"),
  ),
    /* =========================
     RENFORT FINAL — DONNÉES 6e
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_tableau_open_2_ligne_colonne",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_enquete",
    microId: "stat_donnee_lire_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un tableau, quelle est la différence entre une ligne et une colonne ?",
    format: "qcm",
    choices: [
      "une ligne est horizontale (de gauche à droite), une colonne est verticale (de haut en bas)",
      "une ligne est verticale, une colonne est horizontale",
      "il n’y a aucune différence",
      "une ligne contient des mots, une colonne contient des nombres",
    ],
    expected: ["une ligne est horizontale (de gauche à droite), une colonne est verticale (de haut en bas)"],
    comparator: "mcq_exact",
    hint: "Une ligne se lit souvent de gauche à droite ; une colonne de haut en bas.",
    explanation:
      "Définition : un tableau organise les données en lignes et en colonnes.\n\n" +
      "Méthode : on repère le sens de lecture.\n\n" +
      "Observation : une ligne est horizontale, une colonne est verticale.\n\n" +
      "Conclusion : distinguer ligne et colonne évite de lire la mauvaise donnée.",
    tags: ["stat_donnee", "tableau", "open", "vocabulaire"],
  },

  gab(
    "6e_stat_stat_stat_donnee_lire_tableau_tpl_2_total_colonne", "stat_enquete", "stat_donnee_lire_tableau", 3,
    "Additionne les valeurs de la colonne.",
    ["stat_donnee", "tableau", "total", "template", "canvas"],
    () => (Math.random() < 0.65 ? qTotal(tirerSerie(entre(3, 4), "tableau")) : qLire(tirerSerie(5, "tableau"))),
  ),

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_lire_graphique_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_graphique",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève regarde seulement le bâton le plus haut sans lire les valeurs. Pourquoi peut-il se tromper ?",
    format: "qcm",
    choices: [
      "l’échelle peut tromper : il faut lire les nombres pour comparer",
      "il ne peut pas se tromper : le bâton le plus haut a toujours raison",
      "parce que les bâtons changent de taille tout seuls",
      "parce qu’il faut d’abord compter les bâtons",
    ],
    expected: ["l’échelle peut tromper : il faut lire les nombres pour comparer"],
    comparator: "mcq_exact",
    hint: "Il faut lire les nombres, pas seulement regarder la forme.",
    explanation:
      "Définition : lire un graphique demande de relier une catégorie à une valeur.\n\n" +
      "Méthode : on observe le graphique, mais on lit aussi les valeurs ou l’échelle.\n\n" +
      "Observation : l’impression visuelle peut être trompeuse.\n\n" +
      "Conclusion : il faut vérifier les valeurs avant de conclure.",
    tags: ["stat_donnee", "graphique", "open", "erreur", "verification"],
  },

  gab(
    "6e_stat_stat_stat_donnee_lire_graphique_tpl_2_plus_petit", "stat_donnee", "stat_donnee_lire_graphique", 3,
    "Compare les hauteurs des barres, puis vérifie avec les nombres.",
    ["stat_donnee", "graphique", "minimum", "template", "canvas"],
    () => qExtreme(tirerSerie(entre(4, 5), pick(["barres", "batons"] as const))),
  ),

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_prelever_erreur_2_double_entree",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_prelever",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un tableau à deux entrées, un élève lit la bonne ligne mais la mauvaise colonne. Sa réponse peut-elle être correcte ?",
    format: "qcm",
    choices: ["oui, toujours", "non, pas forcément"],
    expected: ["non, pas forcément"],
    comparator: "mcq_exact",
    hint: "Il faut lire la ligne ET la colonne.",
    explanation:
      "Définition : dans un tableau à deux entrées, une donnée se lit au croisement d’une ligne et d’une colonne.\n\n" +
      "Méthode : on doit repérer les deux informations.\n\n" +
      "Observation : si la colonne est mauvaise, la valeur lue peut être fausse.\n\n" +
      "Conclusion : il faut vérifier la ligne et la colonne.",
    tags: ["stat_donnee", "prelever", "tableau_double_entree", "erreur"],
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_prelever_open_2_double_entree",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_prelever",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la méthode pour lire une donnée dans un tableau à deux entrées ?",
    format: "qcm",
    choices: [
      "repérer la bonne ligne, puis la bonne colonne, et lire la case à leur croisement",
      "lire seulement la bonne ligne, la colonne n’a pas d’importance",
      "additionner la ligne et la colonne",
      "lire la dernière case du tableau",
    ],
    expected: ["repérer la bonne ligne, puis la bonne colonne, et lire la case à leur croisement"],
    comparator: "mcq_exact",
    hint: "La donnée se trouve au croisement.",
    explanation:
      "Définition : un tableau à deux entrées organise les données selon deux critères.\n\n" +
      "Méthode : on repère la bonne ligne, puis la bonne colonne.\n\n" +
      "Observation : la donnée cherchée est au croisement des deux.\n\n" +
      "Conclusion : lire un tableau à deux entrées demande de vérifier ligne et colonne.",
    tags: ["stat_donnee", "prelever", "open", "methode"],
  },

  gab(
    "6e_stat_stat_stat_donnee_comparer_tpl_3_ecart_graphique", "stat_donnee", "stat_donnee_comparer", 4,
    "L’écart se calcule avec une soustraction.",
    ["stat_donnee", "comparer", "ecart", "template", "canvas"],
    () => (Math.random() < 0.6 ? qEcartExtremes(tirerSerie(5, pick(["barres", "batons"] as const))) : qDiff(tirerSerie(5, pick(["barres", "batons"] as const)))),
  ),

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_interpreter_erreur_1_conclusion_abusive",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "Un graphique montre que 12 élèves préfèrent le sport dans une classe. Un élève conclut : “Tous les élèves du collège préfèrent le sport.” Pourquoi cette conclusion est-elle abusive ?",
    format: "qcm",
    choices: [
      "les données ne concernent qu’une classe : on ne peut pas conclure pour tout le collège",
      "elle n’est pas abusive : 12 élèves, c’est beaucoup",
      "parce que le graphique est mal dessiné",
      "parce qu’il aurait fallu calculer une moyenne",
    ],
    expected: ["les données ne concernent qu’une classe : on ne peut pas conclure pour tout le collège"],
    comparator: "mcq_exact",
    hint: "Les données ne concernent qu’une classe.",
    explanation:
      "Définition : une conclusion doit rester liée aux données étudiées.\n\n" +
      "Méthode : on vérifie sur quel groupe porte l’enquête.\n\n" +
      "Observation : les données concernent une classe, pas tout le collège.\n\n" +
      "Conclusion : on ne peut pas généraliser à tout le collège.",
    tags: ["stat_donnee", "interpreter", "open", "conclusion", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_stat_donnee_interpreter_open_3_hypothese",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "Devant un tableau de données, quelle est la différence entre observer une donnée et faire une hypothèse ?",
    format: "qcm",
    choices: [
      "observer, c’est lire ce qui est écrit ; une hypothèse est une idée qu’il faudra vérifier",
      "c’est la même chose",
      "une hypothèse est toujours vraie, une observation peut être fausse",
      "observer, c’est deviner ; une hypothèse, c’est lire le tableau",
    ],
    expected: ["observer, c’est lire ce qui est écrit ; une hypothèse est une idée qu’il faudra vérifier"],
    comparator: "mcq_exact",
    hint: "Observer, c’est lire ce qui est écrit ; faire une hypothèse, c’est proposer une idée à vérifier.",
    explanation:
      "Définition : observer une donnée, c’est lire une valeur présente dans le tableau.\n\n" +
      "Méthode : une hypothèse est une idée que l’on propose et qu’il faudra vérifier.\n\n" +
      "Observation : une donnée est certaine dans le document, une hypothèse demande une vérification.\n\n" +
      "Conclusion : il faut distinguer ce qui est lu et ce qui est supposé.",
    tags: ["stat_donnee", "interpreter", "open", "hypothese", "scientifique"],
  },

  gab(
    "6e_stat_stat_donnee_defi_tpl_3_deux_variables_total_colonne", "stat_donnee", "stat_donnee_defi", 5,
    "Additionne toutes les cases de la colonne demandée.",
    ["stat_donnee", "defi", "tableau_double_entree", "total_colonne", "template", "canvas"],
    () => qTotalDouble(tirerDouble(entre(3, 4), entre(2, 3)), "colonne"),
  ),

  {
    kind: "fixed",
    id: "6e_stat_stat_donnee_defi_open_2_demarche_scientifique",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle démarche permet de répondre sérieusement à une question à partir de données ?",
    format: "qcm",
    choices: [
      "lire le document, repérer les valeurs utiles, calculer ou comparer, puis conclure",
      "conclure d’abord, puis chercher une valeur qui va dans ce sens",
      "choisir la réponse qui paraît la plus logique sans lire",
      "recopier tous les nombres du tableau",
    ],
    expected: ["lire le document, repérer les valeurs utiles, calculer ou comparer, puis conclure"],
    comparator: "mcq_exact",
    hint: "Pense aux étapes : lire, chercher, vérifier, conclure.",
    explanation:
      "Définition : une démarche sérieuse s’appuie sur des données vérifiées.\n\n" +
      "Méthode : on lit le document, on repère les valeurs utiles, puis on compare ou on calcule.\n\n" +
      "Observation : on vérifie que la réponse correspond bien à la question.\n\n" +
      "Conclusion : on peut alors formuler une conclusion claire et justifiée.",
    tags: ["stat_donnee", "defi", "open", "demarche_scientifique"],
  },

  /* =========================
     DATA_LIRE_CIRCULAIRE (diagramme circulaire / camembert)
  ========================= */

  {
    kind: "fixed",
    id: "6e_stat_stat_donnee_lire_circulaire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_circulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans ce diagramme circulaire, combien d’élèves viennent à l’école en bus ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Repère le secteur « Bus » et lis sa valeur.",
    explanation:
      "Définition : un diagramme circulaire partage un disque en secteurs, un par catégorie.\n\n" +
      "Méthode : on repère le secteur demandé, puis on lit la valeur indiquée.\n\n" +
      "Observation : le secteur « Bus » indique 10 élèves.\n\n" +
      "Conclusion : 10 élèves viennent en bus.",
    tags: ["stat_donnee", "circulaire", "camembert", "lecture", "canvas"],
    canvas: statGraphCanvas({
      graphType: "camembert",
      title: "Comment viens-tu à l’école ?",
      data: [
        { label: "À pied", value: 6 },
        { label: "Bus", value: 10 },
        { label: "Voiture", value: 4 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 1 },
    }),
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_donnee_lire_circulaire_fixed_2_plus_grand",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_circulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce diagramme circulaire, quel est le sport préféré (le plus grand secteur) ?",
    format: "qcm",
    choices: ["Football", "Natation", "Danse", "Basket"],
    expected: ["Football"],
    comparator: "mcq_exact",
    hint: "Le plus grand secteur correspond à la plus grande valeur.",
    explanation:
      "Définition : dans un diagramme circulaire, plus un secteur est grand, plus la catégorie est fréquente.\n\n" +
      "Méthode : on compare la taille des secteurs ou les valeurs.\n\n" +
      "Observation : Football = 14, Natation = 8, Danse = 6, Basket = 2. Le plus grand est 14.\n\n" +
      "Conclusion : le sport préféré est le football.",
    tags: ["stat_donnee", "circulaire", "camembert", "comparer", "canvas"],
    canvas: statGraphCanvas({
      graphType: "camembert",
      title: "Sport préféré de la classe",
      data: [
        { label: "Football", value: 14 },
        { label: "Natation", value: 8 },
        { label: "Danse", value: 6 },
        { label: "Basket", value: 2 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 0 },
    }),
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_donnee_lire_circulaire_fixed_3_plus_petit",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_circulaire",
    difficulty: 2,
    theme: "reunion",
    text: "Dans ce diagramme circulaire des fruits vendus, quel fruit a été le moins vendu ?",
    format: "qcm",
    choices: ["Ananas", "Mangues", "Letchis", "Bananes"],
    expected: ["Ananas"],
    comparator: "mcq_exact",
    hint: "Le plus petit secteur correspond à la plus petite valeur.",
    explanation:
      "Définition : un petit secteur correspond à une petite quantité.\n\n" +
      "Méthode : on cherche le plus petit secteur ou la plus petite valeur.\n\n" +
      "Observation : Mangues = 12, Letchis = 9, Bananes = 7, Ananas = 4. Le plus petit est 4.\n\n" +
      "Conclusion : le fruit le moins vendu est l’ananas.",
    tags: ["stat_donnee", "circulaire", "camembert", "comparer", "reunion", "canvas"],
    canvas: statGraphCanvas({
      graphType: "camembert",
      title: "Fruits vendus au marché",
      data: [
        { label: "Mangues", value: 12 },
        { label: "Letchis", value: 9 },
        { label: "Bananes", value: 7 },
        { label: "Ananas", value: 4 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 3 },
    }),
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_donnee_lire_circulaire_fixed_4_moitie",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_circulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce diagramme circulaire (20 élèves au total), quelle catégorie occupe la moitié du disque ?",
    format: "qcm",
    choices: ["Chien", "Chat", "Lapin", "Oiseau"],
    expected: ["Chien"],
    comparator: "mcq_exact",
    hint: "La moitié du total, c’est 20 ÷ 2 = 10.",
    explanation:
      "Définition : un secteur qui occupe la moitié du disque correspond à la moitié du total.\n\n" +
      "Méthode : on calcule la moitié du total, puis on cherche la catégorie qui a cette valeur.\n\n" +
      "Observation : total = 20, donc la moitié = 10. Le secteur « Chien » vaut 10.\n\n" +
      "Conclusion : c’est la catégorie « Chien » qui occupe la moitié du disque.",
    tags: ["stat_donnee", "circulaire", "camembert", "fraction", "canvas"],
    canvas: statGraphCanvas({
      graphType: "camembert",
      title: "Animal préféré (20 élèves)",
      data: [
        { label: "Chien", value: 10 },
        { label: "Chat", value: 6 },
        { label: "Lapin", value: 3 },
        { label: "Oiseau", value: 1 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 0 },
    }),
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_donnee_lire_circulaire_fixed_5_total",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_circulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce diagramme circulaire, combien d’élèves ont répondu au sondage en tout ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Additionne les valeurs de tous les secteurs.",
    explanation:
      "Définition : le total d’un diagramme circulaire est la somme de tous les secteurs.\n\n" +
      "Méthode : on additionne toutes les valeurs.\n\n" +
      "Observation : 15 + 9 + 6 = 30.\n\n" +
      "Conclusion : 30 élèves ont répondu au sondage.",
    tags: ["stat_donnee", "circulaire", "camembert", "total", "canvas"],
    canvas: statGraphCanvas({
      graphType: "camembert",
      title: "Matière préférée",
      data: [
        { label: "Maths", value: 15 },
        { label: "Français", value: 9 },
        { label: "Sport", value: 6 },
      ],
      display: { showLabels: true, showValues: true },
    }),
  },

  {
    kind: "fixed",
    id: "6e_stat_stat_donnee_lire_circulaire_fixed_6_pourcentage",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_lire_circulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Un diagramme circulaire représente 20 personnes. Le secteur « Comédie » occupe exactement la moitié du disque. Combien de personnes préfèrent la comédie ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "La moitié de 20, c’est 20 ÷ 2.",
    explanation:
      "Définition : la moitié du disque représente la moitié de l’effectif total.\n\n" +
      "Méthode : on calcule la moitié du total.\n\n" +
      "Observation : 20 ÷ 2 = 10.\n\n" +
      "Conclusion : 10 personnes préfèrent la comédie.",
    tags: ["stat_donnee", "circulaire", "camembert", "pourcentage", "canvas"],
    canvas: statGraphCanvas({
      graphType: "camembert",
      title: "Films préférés (20 personnes)",
      data: [
        { label: "Comédie", value: 10 },
        { label: "Aventure", value: 6 },
        { label: "Dessin animé", value: 4 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 0 },
    }),
  },

  gab(
    "6e_stat_stat_donnee_lire_circulaire_tpl_1_lire_secteur", "stat_donnee", "stat_donnee_lire_circulaire", 1,
    "Repère le secteur demandé et lis sa valeur.",
    ["stat_donnee", "circulaire", "camembert", "lecture", "template", "canvas"],
    () => qLire(tirerSerie(entre(3, 4), "camembert")),
  ),
  gab(
    "6e_stat_stat_donnee_lire_circulaire_tpl_2_plus_grand", "stat_donnee", "stat_donnee_lire_circulaire", 2,
    "Le plus grand secteur correspond à la plus grande valeur.",
    ["stat_donnee", "circulaire", "camembert", "comparer", "template", "canvas"],
    () => qExtreme(tirerSerie(4, "camembert")),
  ),
  gab(
    "6e_stat_stat_donnee_lire_circulaire_tpl_3_total",
    "stat_donnee", "stat_donnee_lire_circulaire", 2,
    "Additionne les valeurs de tous les secteurs.",
    ["stat_donnee", "circulaire", "camembert", "total", "template", "canvas"],
    () => qTotal(tirerSerie(entre(3, 4), "camembert")),
  ),
  gab(
    "6e_stat_stat_donnee_lire_circulaire_tpl_4_difference", "stat_donnee", "stat_donnee_lire_circulaire", 3,
    "Calcule l’écart entre les deux secteurs, ou compare un secteur au disque entier.",
    ["stat_donnee", "circulaire", "camembert", "difference", "template", "canvas"],
    () => (Math.random() < 0.5 ? qDiff(tirerSerie(4, "camembert")) : qPart()),
  ),

  /* ========================= TOP-UP — STAT_DONNEE_LIRE_TABLEAU ========================= */
  {
    kind: "fixed",
    id: "6e_stat_lire_tableau_topup_1",
    niveau: "6e", matiere: "maths", notionId: "stat_enquete", microId: "stat_donnee_lire_tableau",
    difficulty: 1, theme: "neutral",
    text: "Dans le tableau, combien d’élèves font de la natation ?",
    format: "short", expected: ["8"], comparator: "number_equal",
    hint: "Lis la ligne Natation.",
    explanation: se("lire un tableau, c’est repérer la bonne ligne et la bonne colonne.", "on cherche la ligne Natation, puis on lit la valeur.", "la ligne Natation indique 8.", "8 élèves font de la natation."),
    tags: ["stat_donnee", "tableau", "lecture", "canvas"],
    canvas: tableauDonneesCanvas({
      title: "Activités choisies",
      headers: ["Nombre d’élèves"],
      rows: [{ label: "Football", values: [12] }, { label: "Natation", values: [8] }, { label: "Danse", values: [10] }],
    }),
  },
  {
    kind: "fixed",
    id: "6e_stat_lire_tableau_topup_2",
    niveau: "6e", matiere: "maths", notionId: "stat_enquete", microId: "stat_donnee_lire_tableau",
    difficulty: 1, theme: "neutral",
    text: "Quelle activité a été choisie par 12 élèves ?",
    format: "qcm", choices: ["Football", "Natation", "Danse", "Tennis"], expected: ["Football"], comparator: "mcq_exact",
    hint: "Cherche la valeur 12 dans le tableau.",
    explanation: se("un tableau associe une catégorie à une valeur.", "on cherche la ligne dont la valeur est 12.", "la ligne Football indique 12.", "c’est le football qui a été choisi par 12 élèves."),
    tags: ["stat_donnee", "tableau", "lecture", "qcm", "canvas"],
    canvas: tableauDonneesCanvas({
      title: "Activités choisies",
      headers: ["Nombre d’élèves"],
      rows: [{ label: "Football", values: [12] }, { label: "Natation", values: [8] }, { label: "Danse", values: [10] }],
    }),
  },
  {
    kind: "fixed",
    id: "6e_stat_lire_tableau_topup_3",
    niveau: "6e", matiere: "maths", notionId: "stat_enquete", microId: "stat_donnee_lire_tableau",
    difficulty: 2, theme: "reunion",
    text: "Au marché, combien de mangues ont été vendues l’après-midi ?",
    format: "short", expected: ["9"], comparator: "number_equal",
    hint: "Croise la ligne Mangues et la colonne Après-midi.",
    explanation: se("un tableau à double entrée croise une ligne et une colonne.", "on cherche la ligne Mangues et la colonne Après-midi.", "à l’intersection, on lit 9.", "9 mangues ont été vendues l’après-midi."),
    tags: ["stat_donnee", "tableau", "double_entree", "reunion", "canvas"],
    canvas: tableauDonneesCanvas({
      title: "Ventes au marché",
      headers: ["Matin", "Après-midi"],
      rows: [{ label: "Mangues", values: [12, 9] }, { label: "Letchis", values: [7, 10] }],
      highlight: { cell: { row: 0, col: 1 } },
    }),
  },
  {
    kind: "fixed",
    id: "6e_stat_lire_tableau_topup_4",
    niveau: "6e", matiere: "maths", notionId: "stat_enquete", microId: "stat_donnee_lire_tableau",
    difficulty: 1, theme: "neutral",
    text: "Combien d’élèves font de la danse ?",
    format: "qcm", choices: ["10", "8", "12", "30"], expected: ["10"], comparator: "mcq_exact",
    hint: "Lis la ligne Danse.",
    explanation: se("on lit la valeur associée à une catégorie.", "on cherche la ligne Danse.", "la ligne Danse indique 10.", "10 élèves font de la danse."),
    tags: ["stat_donnee", "tableau", "lecture", "qcm", "canvas"],
    canvas: tableauDonneesCanvas({
      title: "Activités choisies",
      headers: ["Nombre d’élèves"],
      rows: [{ label: "Football", values: [12] }, { label: "Natation", values: [8] }, { label: "Danse", values: [10] }],
    }),
  },

  /* ========================= TOP-UP — STAT_DONNEE_LIRE_GRAPHIQUE ========================= */
  {
    kind: "fixed",
    id: "6e_stat_lire_graphique_topup_1",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_lire_graphique",
    difficulty: 1, theme: "neutral",
    text: "Dans le graphique, combien d’élèves préfèrent les jeux ?",
    format: "short", expected: ["15"], comparator: "number_equal",
    hint: "Lis la hauteur de la barre Jeux.",
    explanation: se("un graphique en barres représente chaque catégorie par une hauteur.", "on repère la barre Jeux et on lit sa valeur.", "la barre Jeux vaut 15.", "15 élèves préfèrent les jeux."),
    tags: ["stat_donnee", "graphique", "lecture", "canvas"],
    canvas: statGraphCanvas({ graphType: "batons", title: "Loisir préféré", data: [{ label: "Sport", value: 12 }, { label: "Lecture", value: 9 }, { label: "Jeux", value: 15 }], display: { showLabels: true, showValues: true, highlightIndex: 2 } }),
  },
  {
    kind: "fixed",
    id: "6e_stat_lire_graphique_topup_2",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_lire_graphique",
    difficulty: 2, theme: "neutral",
    text: "Quelle catégorie a la plus grande barre ?",
    format: "qcm", choices: ["Jeux", "Sport", "Lecture", "Musique"], expected: ["Jeux"], comparator: "mcq_exact",
    hint: "La plus grande barre = la plus grande valeur.",
    explanation: se("la plus grande barre correspond à la plus grande valeur.", "on compare les hauteurs.", "Sport = 12, Lecture = 9, Jeux = 15. La plus grande est 15.", "c’est la catégorie Jeux."),
    tags: ["stat_donnee", "graphique", "comparer", "qcm", "canvas"],
    canvas: statGraphCanvas({ graphType: "barres", title: "Loisir préféré", data: [{ label: "Sport", value: 12 }, { label: "Lecture", value: 9 }, { label: "Jeux", value: 15 }], display: { showLabels: true, showValues: true, highlightIndex: 2 } }),
  },
  {
    kind: "fixed",
    id: "6e_stat_lire_graphique_topup_3",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_lire_graphique",
    difficulty: 2, theme: "neutral",
    text: "Quelle catégorie a la plus petite barre ?",
    format: "qcm", choices: ["Lecture", "Sport", "Jeux", "Danse"], expected: ["Lecture"], comparator: "mcq_exact",
    hint: "La plus petite barre = la plus petite valeur.",
    explanation: se("la plus petite barre correspond à la plus petite valeur.", "on compare les hauteurs.", "Sport = 12, Lecture = 9, Jeux = 15. La plus petite est 9.", "c’est la catégorie Lecture."),
    tags: ["stat_donnee", "graphique", "comparer", "qcm", "canvas"],
    canvas: statGraphCanvas({ graphType: "barres", title: "Loisir préféré", data: [{ label: "Sport", value: 12 }, { label: "Lecture", value: 9 }, { label: "Jeux", value: 15 }], display: { showLabels: true, showValues: true, highlightIndex: 1 } }),
  },
  {
    kind: "fixed",
    id: "6e_stat_lire_graphique_topup_4",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_lire_graphique",
    difficulty: 1, theme: "reunion",
    text: "Dans le graphique, combien de letchis ont été vendus ?",
    format: "qcm", choices: ["13", "8", "10", "16"], expected: ["13"], comparator: "mcq_exact",
    hint: "Lis la barre Letchis.",
    explanation: se("on lit la valeur d’une barre.", "on repère la barre Letchis.", "la barre Letchis vaut 13.", "13 letchis ont été vendus."),
    tags: ["stat_donnee", "graphique", "lecture", "reunion", "qcm", "canvas"],
    canvas: statGraphCanvas({ graphType: "batons", title: "Fruits vendus", data: [{ label: "Mangues", value: 10 }, { label: "Ananas", value: 8 }, { label: "Letchis", value: 13 }], display: { showLabels: true, showValues: true, highlightIndex: 2 } }),
  },
  {
    kind: "fixed",
    id: "6e_stat_lire_graphique_topup_5",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_lire_graphique",
    difficulty: 1, theme: "neutral",
    text: "Dans le graphique, combien d’élèves font du sport ?",
    format: "short", expected: ["12"], comparator: "number_equal",
    hint: "Lis la barre Sport.",
    explanation: se("on lit la hauteur d’une barre.", "on repère la barre Sport.", "la barre Sport vaut 12.", "12 élèves font du sport."),
    tags: ["stat_donnee", "graphique", "lecture", "canvas"],
    canvas: statGraphCanvas({ graphType: "barres", title: "Loisir préféré", data: [{ label: "Sport", value: 12 }, { label: "Lecture", value: 9 }, { label: "Jeux", value: 15 }], display: { showLabels: true, showValues: true, highlightIndex: 0 } }),
  },

  /* ========================= TOP-UP — STAT_DONNEE_PRELEVER ========================= */
  {
    kind: "fixed",
    id: "6e_stat_prelever_topup_1",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_prelever",
    difficulty: 2, theme: "neutral",
    text: "D’après le tableau, combien d’élèves viennent à l’école à vélo ?",
    format: "short", expected: ["7"], comparator: "number_equal",
    hint: "Cherche la ligne Vélo.",
    explanation: se("prélever une information, c’est extraire une donnée précise.", "on repère la ligne Vélo.", "la ligne Vélo indique 7.", "7 élèves viennent à vélo."),
    tags: ["stat_donnee", "prelever", "canvas"],
    canvas: tableauDonneesCanvas({ title: "Comment viens-tu à l’école ?", headers: ["Nombre d’élèves"], rows: [{ label: "À pied", values: [9] }, { label: "Bus", values: [11] }, { label: "Vélo", values: [7] }], highlight: { cell: { row: 2, col: 0 } } }),
  },
  {
    kind: "fixed",
    id: "6e_stat_prelever_topup_2",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_prelever",
    difficulty: 2, theme: "neutral",
    text: "D’après le graphique, quelle est la valeur de la catégorie mise en évidence (Bus) ?",
    format: "short", expected: ["11"], comparator: "number_equal",
    hint: "Lis la barre Bus.",
    explanation: se("prélever une information, c’est lire une valeur précise.", "on repère la barre Bus.", "la barre Bus vaut 11.", "la valeur cherchée est 11."),
    tags: ["stat_donnee", "prelever", "graphique", "canvas"],
    canvas: statGraphCanvas({ graphType: "barres", title: "Comment viens-tu à l’école ?", data: [{ label: "À pied", value: 9 }, { label: "Bus", value: 11 }, { label: "Vélo", value: 7 }], display: { showLabels: true, showValues: true, highlightIndex: 1 } }),
  },
  {
    kind: "fixed",
    id: "6e_stat_prelever_topup_3",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_prelever",
    difficulty: 2, theme: "neutral",
    text: "Quelle catégorie correspond à la valeur 9 dans le tableau ?",
    format: "qcm", choices: ["À pied", "Bus", "Vélo", "Voiture"], expected: ["À pied"], comparator: "mcq_exact",
    hint: "Cherche la valeur 9.",
    explanation: se("on prélève l’information demandée.", "on cherche la ligne dont la valeur est 9.", "la ligne À pied indique 9.", "c’est la catégorie « À pied »."),
    tags: ["stat_donnee", "prelever", "qcm", "canvas"],
    canvas: tableauDonneesCanvas({ title: "Comment viens-tu à l’école ?", headers: ["Nombre d’élèves"], rows: [{ label: "À pied", values: [9] }, { label: "Bus", values: [11] }, { label: "Vélo", values: [7] }] }),
  },
  {
    kind: "fixed",
    id: "6e_stat_prelever_topup_4",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_prelever",
    difficulty: 3, theme: "reunion",
    text: "D’après le tableau, combien de letchis ont été vendus le matin ?",
    format: "short", expected: ["7"], comparator: "number_equal",
    hint: "Croise la ligne Letchis et la colonne Matin.",
    explanation: se("prélever dans un tableau à double entrée, c’est croiser ligne et colonne.", "on cherche la ligne Letchis et la colonne Matin.", "à l’intersection, on lit 7.", "7 letchis ont été vendus le matin."),
    tags: ["stat_donnee", "prelever", "double_entree", "reunion", "canvas"],
    canvas: tableauDonneesCanvas({ title: "Ventes au marché", headers: ["Matin", "Après-midi"], rows: [{ label: "Mangues", values: [12, 9] }, { label: "Letchis", values: [7, 10] }], highlight: { cell: { row: 1, col: 0 } } }),
  },

  /* ========================= TOP-UP — STAT_DONNEE_COMPARER ========================= */
  {
    kind: "fixed",
    id: "6e_stat_comparer_topup_1",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_comparer",
    difficulty: 2, theme: "neutral",
    text: "Dans le graphique, combien d’élèves de plus font des jeux que de la lecture ?",
    format: "short", expected: ["6"], comparator: "number_equal",
    hint: "Calcule 15 − 9.",
    explanation: se("comparer deux données, c’est calculer leur écart.", "on soustrait la plus petite valeur à la plus grande.", "15 - 9 = 6.", "il y a 6 élèves de plus pour les jeux."),
    tags: ["stat_donnee", "comparer", "canvas"],
    canvas: statGraphCanvas({ graphType: "barres", title: "Loisir préféré", data: [{ label: "Sport", value: 12 }, { label: "Lecture", value: 9 }, { label: "Jeux", value: 15 }], display: { showLabels: true, showValues: true } }),
  },
  {
    kind: "fixed",
    id: "6e_stat_comparer_topup_2",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_comparer",
    difficulty: 1, theme: "neutral",
    text: "Quelle activité est la plus choisie ?",
    format: "qcm", choices: ["Football", "Natation", "Danse", "Toutes pareilles"], expected: ["Football"], comparator: "mcq_exact",
    hint: "Cherche la plus grande valeur.",
    explanation: se("comparer, c’est trouver la plus grande valeur.", "on compare 12, 8 et 10.", "le plus grand est 12, pour le football.", "le football est l’activité la plus choisie."),
    tags: ["stat_donnee", "comparer", "qcm", "canvas"],
    canvas: tableauDonneesCanvas({ title: "Activités choisies", headers: ["Nombre d’élèves"], rows: [{ label: "Football", values: [12] }, { label: "Natation", values: [8] }, { label: "Danse", values: [10] }] }),
  },
  {
    kind: "fixed",
    id: "6e_stat_comparer_topup_3",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_comparer",
    difficulty: 2, theme: "neutral",
    text: "Combien d’élèves de plus font du football que de la natation ?",
    format: "short", expected: ["4"], comparator: "number_equal",
    hint: "Calcule 12 − 8.",
    explanation: se("comparer deux catégories, c’est calculer la différence.", "on soustrait la plus petite valeur à la plus grande.", "12 - 8 = 4.", "il y a 4 élèves de plus au football."),
    tags: ["stat_donnee", "comparer", "canvas"],
    canvas: tableauDonneesCanvas({ title: "Activités choisies", headers: ["Nombre d’élèves"], rows: [{ label: "Football", values: [12] }, { label: "Natation", values: [8] }, { label: "Danse", values: [10] }] }),
  },
  {
    kind: "fixed",
    id: "6e_stat_comparer_topup_4",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_comparer",
    difficulty: 2, theme: "neutral",
    text: "Le football et la danse ont-ils été choisis par le même nombre d’élèves ?",
    format: "qcm", choices: ["non", "oui"], expected: ["non"], comparator: "mcq_exact",
    hint: "Compare 12 et 10.",
    explanation: se("comparer, c’est vérifier l’égalité ou non.", "on compare les valeurs Football (12) et Danse (10).", "12 est différent de 10.", "non, ils n’ont pas été choisis par le même nombre d’élèves."),
    tags: ["stat_donnee", "comparer", "qcm", "canvas"],
    canvas: tableauDonneesCanvas({ title: "Activités choisies", headers: ["Nombre d’élèves"], rows: [{ label: "Football", values: [12] }, { label: "Natation", values: [8] }, { label: "Danse", values: [10] }] }),
  },

  /* ========================= TOP-UP — STAT_DONNEE_INTERPRETER ========================= */
  {
    kind: "fixed",
    id: "6e_stat_interpreter_topup_1",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_interpreter",
    difficulty: 2, theme: "neutral",
    text: "D’après ce graphique, quel est le loisir le plus apprécié de la classe ?",
    format: "qcm", choices: ["Jeux", "Sport", "Lecture", "On ne peut pas savoir"], expected: ["Jeux"], comparator: "mcq_exact",
    hint: "Le loisir le plus apprécié = la plus grande barre.",
    explanation: se("interpréter, c’est tirer une conclusion à partir des données.", "on cherche la plus grande valeur.", "Jeux = 15 est la plus grande valeur.", "le loisir le plus apprécié est les jeux."),
    tags: ["stat_donnee", "interpreter", "qcm", "canvas"],
    canvas: statGraphCanvas({ graphType: "barres", title: "Loisir préféré", data: [{ label: "Sport", value: 12 }, { label: "Lecture", value: 9 }, { label: "Jeux", value: 15 }], display: { showLabels: true, showValues: true, highlightIndex: 2 } }),
  },
  {
    kind: "fixed",
    id: "6e_stat_interpreter_topup_2",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_interpreter",
    difficulty: 3, theme: "neutral",
    text: "36 élèves ont répondu. 12 préfèrent le football. Peut-on dire que « la moitié de la classe préfère le football » ?",
    format: "qcm", choices: ["non", "oui"], expected: ["non"], comparator: "mcq_exact",
    hint: "La moitié de 36, c’est 18.",
    explanation: se("interpréter demande de vérifier si la conclusion est justifiée.", "on calcule la moitié du total.", "la moitié de 36 = 18, or seulement 12 préfèrent le football.", "non, on ne peut pas dire que la moitié préfère le football."),
    tags: ["stat_donnee", "interpreter", "qcm"],
  },
  {
    kind: "fixed",
    id: "6e_stat_interpreter_topup_3",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_interpreter",
    difficulty: 2, theme: "neutral",
    text: "D’après le tableau (Football 12, Natation 8, Danse 10), combien d’élèves ont été interrogés en tout ?",
    format: "short", expected: ["30"], comparator: "number_equal",
    hint: "Additionne toutes les valeurs.",
    explanation: se("interpréter peut demander de calculer un effectif total.", "on additionne toutes les valeurs.", "12 + 8 + 10 = 30.", "30 élèves ont été interrogés."),
    tags: ["stat_donnee", "interpreter", "total"],
  },
  {
    kind: "fixed",
    id: "6e_stat_interpreter_topup_4",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_interpreter",
    difficulty: 3, theme: "neutral",
    // ⛔ 07/10/2026 : plus de barre de fraction hors des notions de fractions (consigne du 06/10).
    text: "Dans une classe de 25 élèves, 5 ont eu la grippe. Quelle part de la classe a eu la grippe ?",
    format: "qcm", choices: ["1 élève sur 5", "1 élève sur 2", "1 élève sur 25", "tous les élèves"], expected: ["1 élève sur 5"], comparator: "mcq_exact",
    hint: "Fais des groupes de 5 élèves : combien de groupes dans la classe ?",
    explanation: se("interpréter, c’est exprimer une part par rapport au total.", "on cherche combien de fois 5 tient dans 25.", "25 ÷ 5 = 5 : il y a 5 groupes de 5 élèves, et 1 malade par groupe en moyenne.", "1 élève sur 5 a eu la grippe, soit un cinquième de la classe."),
    tags: ["stat_donnee", "interpreter", "fraction", "qcm"],
  },

  /* ========================= TOP-UP — STAT_DONNEE_DEFI ========================= */
  {
    kind: "fixed",
    id: "6e_stat_defi_topup_1",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_defi",
    difficulty: 3, theme: "neutral",
    text: "Défi : dans le tableau, combien d’élèves ont été interrogés en tout ?",
    format: "short", expected: ["30"], comparator: "number_equal",
    hint: "Additionne toutes les valeurs.",
    explanation: se("un défi peut demander d’additionner toutes les données.", "on additionne les effectifs.", "12 + 8 + 10 = 30.", "30 élèves ont été interrogés en tout."),
    tags: ["stat_donnee", "defi", "total", "canvas"],
    canvas: tableauDonneesCanvas({ title: "Activités choisies", headers: ["Nombre d’élèves"], rows: [{ label: "Football", values: [12] }, { label: "Natation", values: [8] }, { label: "Danse", values: [10] }] }),
  },
  {
    kind: "fixed",
    id: "6e_stat_defi_topup_2",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_defi",
    difficulty: 4, theme: "reunion",
    text: "Défi : au marché, combien de fruits ont été vendus en tout dans la journée ? (Mangues 12 et 9, Letchis 7 et 10)",
    format: "short", expected: ["38"], comparator: "number_equal",
    hint: "Additionne toutes les cases du tableau.",
    explanation: se("un défi à double entrée demande d’additionner toutes les cases.", "on additionne matin et après-midi pour chaque fruit.", "12 + 9 + 7 + 10 = 38.", "38 fruits ont été vendus en tout."),
    tags: ["stat_donnee", "defi", "double_entree", "reunion", "canvas"],
    canvas: tableauDonneesCanvas({ title: "Ventes au marché", headers: ["Matin", "Après-midi"], rows: [{ label: "Mangues", values: [12, 9] }, { label: "Letchis", values: [7, 10] }] }),
  },
  {
    kind: "fixed",
    id: "6e_stat_defi_topup_3",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_defi",
    difficulty: 4, theme: "reunion",
    text: "Défi : quel fruit a été le plus vendu dans la journée ? (Mangues 12 et 9, Letchis 7 et 10)",
    format: "qcm", choices: ["Mangues", "Letchis", "Ils sont à égalité", "On ne peut pas savoir"], expected: ["Mangues"], comparator: "mcq_exact",
    hint: "Calcule le total de chaque fruit, puis compare.",
    explanation: se("on calcule d’abord chaque total, puis on compare.", "Mangues : 12 + 9 = 21 ; Letchis : 7 + 10 = 17.", "21 est plus grand que 17.", "le fruit le plus vendu est la mangue."),
    tags: ["stat_donnee", "defi", "comparer", "reunion", "canvas"],
    canvas: tableauDonneesCanvas({ title: "Ventes au marché", headers: ["Matin", "Après-midi"], rows: [{ label: "Mangues", values: [12, 9] }, { label: "Letchis", values: [7, 10] }] }),
  },
  {
    kind: "fixed",
    id: "6e_stat_defi_topup_4",
    niveau: "6e", matiere: "maths", notionId: "stat_donnee", microId: "stat_donnee_defi",
    difficulty: 4, theme: "neutral",
    text: "Défi : 30 élèves ont répondu. Football 12, Natation 8, Danse 10. Combien d’élèves NE font PAS de football ?",
    format: "short", expected: ["18"], comparator: "number_equal",
    hint: "Total moins ceux qui font du football.",
    explanation: se("un défi peut demander un calcul en deux étapes.", "on retire les élèves de football au total.", "30 - 12 = 18.", "18 élèves ne font pas de football."),
    tags: ["stat_donnee", "defi", "canvas"],
    canvas: tableauDonneesCanvas({ title: "Activités choisies", headers: ["Nombre d’élèves"], rows: [{ label: "Football", values: [12] }, { label: "Natation", values: [8] }, { label: "Danse", values: [10] }] }),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // STAT_ENQUETE_PLANIFIER — décider ce qu'on mesure, sur qui, et comment
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-D-donnees-1) : « planifier
  // une enquête et recueillir des données ».
  //
  // ⭐ TOUT LE CHAPITRE DES DONNÉES ÉTAIT EN LECTURE SEULE. Les sept micros de
  // `stat_donnee` lisent un tableau, lisent un graphique, prélèvent, comparent,
  // interprètent — on servait à l'élève des données toujours déjà faites. Or le
  // programme de 6e ouvre par le geste inverse : les PRODUIRE. C'est le premier
  // endroit où l'élève décide de ce qu'il mesure, et donc le premier où il peut
  // se tromper avant même le moindre calcul.
  //
  // ⚠️ LE BIAIS D'ÉCHANTILLON EST LE CŒUR DU SUJET, pas une finesse : interroger
  // les seuls adhérents de l'association sportive pour connaître le sport
  // préféré du collège donne un résultat FAUX, sans qu'aucun calcul ne soit
  // faux. C'est la compétence d'esprit critique que le programme vise ici.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "stat_enquete_planifier_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_enquete",
    microId: "stat_enquete_planifier",
    difficulty: 2,
    theme: "neutral",
    text: "Tu veux savoir quel sport est le plus pratiqué dans ta classe. Que faut-il décider EN PREMIER ?",
    format: "qcm",
    choices: [
      "la question exacte à poser et à qui on la pose",
      "la couleur du diagramme final",
      "le nombre de colonnes du tableau",
      "la moyenne qu'on va calculer",
    ],
    expected: ["la question exacte à poser et à qui on la pose"],
    comparator: "mcq_exact",
    hint: "Avant de recueillir, il faut savoir ce qu'on cherche.",
    explanation: se(
      "planifier une enquête, c'est décider ce qu'on cherche, auprès de qui, et comment on l'enregistre — avant de recueillir quoi que ce soit.",
      "on fixe la question, la population interrogée, puis la façon de noter les réponses.",
      "Le tableau, le diagramme et les calculs viennent après : ils ne servent à rien si la question est floue ou si on interroge les mauvaises personnes. Une enquête mal planifiée ne se rattrape pas au moment des calculs.",
      "on décide d'abord la question et la population."
    ),
    tags: ["stat_enquete", "planifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_enquete_planifier_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_enquete",
    microId: "stat_enquete_planifier",
    difficulty: 4,
    theme: "neutral",
    text: "Pour connaître le sport préféré des élèves du collège, Léa interroge uniquement les élèves inscrits à l'association sportive. Que peut-on dire de son enquête ?",
    format: "qcm",
    choices: [
      "les personnes interrogées ne représentent pas tout le collège : le résultat sera faussé",
      "l'enquête est fiable, car ces élèves connaissent bien le sport",
      "l'enquête est fiable si elle interroge au moins 30 élèves",
      "l'enquête est fausse parce qu'elle n'a pas fait de calcul",
    ],
    expected: [
      "les personnes interrogées ne représentent pas tout le collège : le résultat sera faussé",
    ],
    comparator: "mcq_exact",
    hint: "Qui n'a AUCUNE chance d'être interrogé ?",
    explanation: se(
      "les personnes interrogées doivent représenter l'ensemble sur lequel on veut conclure.",
      "on se demande qui a une chance d'être interrogé, et qui n'en a aucune.",
      "Les élèves qui ne font pas de sport n'ont aucune chance d'être interrogés, alors que la question porte sur tout le collège. Le résultat sera donc faussé — et interroger davantage de membres de l'association ne corrige rien : on aggrave même le déséquilibre. Aucun calcul ne peut réparer un recueil mal choisi.",
      "l'échantillon doit ressembler à la population étudiée."
    ),
    tags: ["stat_enquete", "planifier", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_enquete_planifier_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_enquete",
    microId: "stat_enquete_planifier",
    difficulty: 3,
    theme: "neutral",
    text: "Laquelle de ces questions convient le mieux pour une enquête dont on veut compter les réponses ?",
    format: "qcm",
    choices: [
      "« Combien de fois par semaine fais-tu du sport ? »",
      "« Aimes-tu un peu le sport, ou pas trop ? »",
      "« Que penses-tu du sport en général ? »",
      "« Le sport, c'est important, non ? »",
    ],
    expected: ["« Combien de fois par semaine fais-tu du sport ? »"],
    comparator: "mcq_exact",
    hint: "Laquelle donne des réponses qu'on peut ranger dans un tableau ?",
    explanation: se(
      "une question d'enquête doit appeler une réponse précise, comparable d'une personne à l'autre.",
      "on vérifie que deux personnes qui répondent la même chose écriront bien la même réponse.",
      "« Combien de fois par semaine » appelle un nombre : on peut le noter, le compter, le comparer. « Que penses-tu du sport » donne autant de réponses différentes que de personnes, impossibles à additionner. Et « c'est important, non ? » souffle sa réponse — une question qui oriente ne mesure plus rien.",
      "on garde la question précise et neutre."
    ),
    tags: ["stat_enquete", "planifier", "qcm"],
  },
  gab(
    "stat_enquete_planifier_tpl_1", "stat_enquete", "stat_enquete_planifier", 3,
    "Demande-toi qui n'a aucune chance d'être interrogé.",
    ["stat_enquete", "planifier", "template"],
    qPlanifierQui,
  ),
  // ⭐ 07/10/2026 : ancienne question OUVERTE à mots-clés (« qui » suffisait),
  // devenue un QCM sur le même piège — le biais d'échantillon.
  gab(
    "stat_enquete_planifier_tpl_ouverte", "stat_enquete", "stat_enquete_planifier", 4,
    "Qui n'avait aucune chance d'être interrogé ?",
    ["stat_enquete", "planifier", "piege", "template"],
    qPlanifierJuger,
  ),

  // ═══════════════════════════════════════════════════════════════════════════
  // STAT_ENQUETE_MESURER — réaliser des mesures et les consigner
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-D-donnees-2) : « réaliser
  // des mesures et les consigner dans un tableau ».
  //
  // ⚠️ L'UNITÉ SE MET DANS L'EN-TÊTE, PAS DANS CHAQUE CASE. C'est la règle de
  // présentation que le chapitre installe, et elle sert toute la scolarité :
  // une colonne « Taille (cm) » se lit d'un coup d'œil, une colonne où chaque
  // case répète « cm » ne s'additionne plus du regard. Un tableau dont les
  // mesures ne sont pas dans la même unité est, lui, tout simplement faux.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "stat_enquete_mesurer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_enquete",
    microId: "stat_enquete_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Tu mesures la taille de cinq camarades. Comment consigner ces mesures ?",
    format: "qcm",
    choices: [
      "dans un tableau à deux colonnes : le prénom, et la taille",
      "de mémoire, on notera à la fin",
      "dans une seule case, en écrivant tous les nombres à la suite",
      "dans un tableau à cinq colonnes, une par centimètre",
    ],
    expected: ["dans un tableau à deux colonnes : le prénom, et la taille"],
    comparator: "mcq_exact",
    hint: "Il faut pouvoir retrouver QUI mesure combien.",
    explanation: se(
      "consigner des mesures, c'est les écrire au fur et à mesure, de façon à pouvoir les relire sans ambiguïté.",
      "on prévoit une colonne pour ce qu'on identifie et une colonne pour ce qu'on mesure.",
      "Deux colonnes suffisent : l'une dit de qui il s'agit, l'autre donne la mesure. Écrire les nombres à la suite dans une seule case fait perdre à qui appartient chaque taille, et se fier à sa mémoire fait perdre les données elles-mêmes. On note pendant qu'on mesure, jamais après.",
      "on garde un tableau à deux colonnes."
    ),
    tags: ["stat_enquete", "mesurer", "canvas", "qcm"],
    canvas: tableauDonneesCanvas({
      title: "Taille des élèves",
      headers: ["Taille (cm)"],
      rows: [
        { label: "Alice", values: [152] },
        { label: "Bilal", values: [148] },
        { label: "Chloé", values: [155] },
        { label: "Dylan", values: [161] },
        { label: "Élodie", values: [149] },
      ],
    }),
  },
  {
    kind: "fixed",
    id: "stat_enquete_mesurer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_enquete",
    microId: "stat_enquete_mesurer",
    difficulty: 3,
    theme: "neutral",
    text: "Où faut-il écrire l'unité des mesures dans un tableau ?",
    format: "qcm",
    choices: [
      "une seule fois, dans l'en-tête de la colonne",
      "dans chaque case, après le nombre",
      "nulle part, l'unité se devine",
      "seulement sur la première et la dernière ligne",
    ],
    expected: ["une seule fois, dans l'en-tête de la colonne"],
    comparator: "mcq_exact",
    hint: "Regarde l'en-tête « Taille (cm) ».",
    explanation: se(
      "l'en-tête d'une colonne annonce ce qu'elle contient ET dans quelle unité.",
      "on écrit « Taille (cm) » en haut, puis les nombres seuls en dessous.",
      "L'unité vaut pour toute la colonne : la répéter dans chaque case alourdit le tableau et gêne la comparaison des nombres. Mais la supprimer serait pire : « 152 » ne veut rien dire sans son unité — des centimètres, des millimètres, des pouces ? Une colonne sans unité est une colonne qu'on ne peut pas utiliser.",
      "l'unité se met une fois, dans l'en-tête."
    ),
    tags: ["stat_enquete", "mesurer", "canvas", "qcm"],
    canvas: tableauDonneesCanvas({
      title: "Longueur des feuilles ramassées",
      headers: ["Longueur (cm)"],
      rows: [
        { label: "Feuille 1", values: [12] },
        { label: "Feuille 2", values: [9] },
        { label: "Feuille 3", values: [15] },
      ],
    }),
  },
  {
    kind: "fixed",
    id: "stat_enquete_mesurer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_enquete",
    microId: "stat_enquete_mesurer",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un tableau de masses, un élève a noté 1,2 kg pour un objet et 800 g pour un autre. Quel est le problème ?",
    format: "qcm",
    choices: [
      "les deux mesures ne sont pas dans la même unité : on ne peut pas les comparer directement",
      "aucun problème, les deux mesures sont justes",
      "il manque la virgule sur 800 g",
      "1,2 kg est forcément une erreur de mesure",
    ],
    expected: [
      "les deux mesures ne sont pas dans la même unité : on ne peut pas les comparer directement",
    ],
    comparator: "mcq_exact",
    hint: "Compare 1,2 et 800 : lequel semble le plus grand, et est-ce vrai ?",
    explanation: se(
      "toutes les mesures d'une même colonne doivent être exprimées dans la même unité.",
      "on choisit une unité pour la colonne, et on y convertit toutes les mesures.",
      "En lisant les nombres seuls, 800 paraît bien plus grand que 1,2 — alors que 800 g valent 0,8 kg, donc MOINS que 1,2 kg. Le tableau ment tant que les unités diffèrent. On convertit tout : soit 1,2 kg et 0,8 kg, soit 1 200 g et 800 g. L'en-tête annonce alors l'unité choisie.",
      "on ramène toute la colonne à une seule unité."
    ),
    tags: ["stat_enquete", "mesurer", "piege", "qcm"],
  },
  gab(
    "stat_enquete_mesurer_tpl_1", "stat_enquete", "stat_enquete_mesurer", 3,
    "Toute la colonne s'écrit dans l'unité de l'en-tête.",
    ["stat_enquete", "mesurer", "unite", "template"],
    qConvertirMesure,
  ),
  // ⭐ 07/10/2026 : ancienne question OUVERTE à mots-clés (« cm » suffisait),
  // devenue un QCM sur le même piège — des unités mélangées dans une colonne.
  gab(
    "stat_enquete_mesurer_tpl_ouverte", "stat_enquete", "stat_enquete_mesurer", 4,
    "Convertis tout dans la même unité avant de comparer.",
    ["stat_enquete", "mesurer", "unite", "piege", "template"],
    qComparerMesures,
  ),

  // ═══════════════════════════════════════════════════════════════════════════
  // STAT_CONSTRUIRE_TABLEAU — construire un tableau d'effectifs
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-D-donnees-3) : « construire
  // un tableau simple pour présenter des données (observations, caractères) ».
  //
  // ⭐ LE PASSAGE DES OBSERVATIONS AUX EFFECTIFS EST LE GESTE DU CHAPITRE. Une
  // liste de 25 réponses brutes ne se lit pas ; le même contenu rangé en « une
  // ligne par réponse POSSIBLE, avec son effectif » se lit d'un coup d'œil. Le
  // tableau ne stocke plus les observations, il les COMPTE.
  //
  // ⚠️ LE CONTRÔLE QUI SAUVE : la somme des effectifs doit redonner le nombre de
  // personnes interrogées. C'est la seule vérification à la portée de l'élève, et
  // elle attrape aussi bien l'oubli que le double comptage.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "stat_construire_tableau_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_enquete",
    microId: "stat_construire_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "On a demandé à 25 élèves leur sport préféré. Les réponses possibles sont : football, natation, danse, escalade. Combien de LIGNES de données le tableau des effectifs doit-il contenir ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Une ligne par réponse possible, pas par élève.",
    explanation: se(
      "un tableau d'effectifs porte une ligne par réponse possible, et non par personne interrogée.",
      "on liste les réponses possibles, puis on compte combien de fois chacune apparaît.",
      "Il y a quatre réponses possibles, donc quatre lignes : football, natation, danse, escalade. Faire 25 lignes reviendrait à recopier les réponses une à une, sans rien résumer — c'est exactement ce que le tableau d'effectifs évite. Le tableau ne stocke pas les observations, il les COMPTE.",
      "on garde 4 lignes."
    ),
    tags: ["stat_enquete", "construire", "canvas", "short"],
    canvas: tableauDonneesCanvas({
      title: "Sport préféré (25 élèves)",
      headers: ["Effectif"],
      rows: [
        { label: "Football", values: [9] },
        { label: "Natation", values: [6] },
        { label: "Danse", values: [7] },
        { label: "Escalade", values: [3] },
      ],
    }),
  },
  {
    kind: "fixed",
    id: "stat_construire_tableau_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_enquete",
    microId: "stat_construire_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "On a interrogé 25 élèves. Le tableau donne : football 9, natation 6, danse 7, escalade 3. Comment vérifier qu'on n'a oublié personne ?",
    format: "qcm",
    choices: [
      "en additionnant les effectifs : la somme doit valoir 25",
      "en vérifiant que chaque effectif est plus petit que 25",
      "en comptant les lignes du tableau",
      "en calculant la moyenne des effectifs",
    ],
    expected: ["en additionnant les effectifs : la somme doit valoir 25"],
    comparator: "mcq_exact",
    hint: "Chaque élève a donné une réponse, et une seule.",
    explanation: se(
      "la somme des effectifs est égale au nombre de personnes interrogées.",
      "on additionne la colonne des effectifs et on compare au total attendu.",
      "9 + 6 + 7 + 3 = 25 : le compte est bon, personne n'a été oublié ni compté deux fois. Si la somme avait donné 24, il manquerait une réponse ; si elle avait donné 26, un élève aurait été compté deux fois. C'est le seul contrôle vraiment utile — compter les lignes ne dit rien, puisqu'elles comptent les réponses possibles et non les élèves.",
      "on vérifie que la somme des effectifs redonne le total."
    ),
    tags: ["stat_enquete", "construire", "controle", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_construire_tableau_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "stat_enquete",
    microId: "stat_construire_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Voici les réponses brutes de 10 élèves : bus, vélo, bus, marche, bus, vélo, marche, bus, vélo, bus. Quel est l'effectif de « bus » ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte les « bus » un par un, en les barrant au fur et à mesure.",
    explanation: se(
      "l'effectif d'une réponse est le nombre de fois où elle apparaît.",
      "on parcourt la liste une seule fois, en cochant chaque réponse dans la bonne ligne.",
      "« bus » apparaît en positions 1, 3, 5, 8 et 10 : son effectif est 5. On trouve ensuite vélo 3 et marche 2. Vérification : 5 + 3 + 2 = 10, soit le nombre d'élèves interrogés — le compte est bon.",
      "on garde l'effectif obtenu."
    ),
    tags: ["stat_enquete", "construire", "short"],
  },
  gab(
    "stat_construire_tableau_tpl_1", "stat_enquete", "stat_construire_tableau", 3,
    "Compte chaque réponse en la barrant ; la somme des effectifs redonne le total.",
    ["stat_enquete", "construire", "template"],
    () => (Math.random() < 0.6 ? qCompterBrut() : qManquant(tirerSerie(4, "tableau"))),
  ),
  // ⭐ 07/10/2026 : ancienne question OUVERTE à mots-clés (« ligne » suffisait),
  // devenue une réponse numérique sur les mêmes pièges : une ligne par réponse
  // POSSIBLE, et le contrôle par la somme des effectifs.
  gab(
    "stat_construire_tableau_tpl_ouverte", "stat_enquete", "stat_construire_tableau", 4,
    "Une ligne par réponse possible ; la somme des effectifs redonne le nombre de personnes interrogées.",
    ["stat_enquete", "construire", "controle", "template"],
    () => (Math.random() < 0.55 ? qControleSomme() : qLignesEffectifs()),
  ),

  /* ═════ GABARITS AJOUTÉS LE 07/10/2026 : une étoile servie sans gabarit
     revenait aux seuls items figés, vus une fois puis resservis. ═════ */

  gab(
    "6e_stat_lire_tableau_tpl_e1", "stat_enquete", "stat_donnee_lire_tableau", 1,
    "Repère la bonne ligne, puis lis le nombre.",
    ["stat_donnee", "tableau", "lecture", "template", "canvas"],
    () => qLire(tirerSerie(3, "tableau")),
  ),
  gab(
    "6e_stat_lire_tableau_tpl_e4", "stat_enquete", "stat_donnee_lire_tableau", 4,
    "Lis le tableau dans les deux sens : de la ligne vers le nombre, ou du nombre vers la ligne.",
    ["stat_donnee", "tableau", "lecture", "template", "canvas"],
    () => (Math.random() < 0.5 ? qInverse(tirerSerie(entre(4, 5), "tableau")) : qSomme2(tirerSerie(entre(4, 5), "tableau"))),
  ),
  gab(
    "6e_stat_lire_graphique_tpl_e1", "stat_donnee", "stat_donnee_lire_graphique", 1,
    "Repère la barre demandée et lis le nombre écrit au-dessus.",
    ["stat_donnee", "graphique", "lecture", "template", "canvas"],
    () => qLire(tirerSerie(3, pick(["barres", "batons"] as const))),
  ),
  gab(
    "6e_stat_lire_graphique_tpl_e4", "stat_donnee", "stat_donnee_lire_graphique", 4,
    "Cherche le nombre, puis remonte à sa barre.",
    ["stat_donnee", "graphique", "lecture", "template", "canvas"],
    () => (Math.random() < 0.5 ? qInverse(tirerSerie(entre(4, 5), pick(["barres", "batons"] as const))) : qSomme2(tirerSerie(entre(4, 5), pick(["barres", "batons"] as const)))),
  ),
  gab(
    "6e_stat_prelever_tpl_e4", "stat_donnee", "stat_donnee_prelever", 4,
    "Une donnée se lit au croisement d’une ligne et d’une colonne, dans les deux sens.",
    ["stat_donnee", "prelever", "tableau_double_entree", "template", "canvas"],
    () => (Math.random() < 0.5 ? qCelluleInverse(tirerDouble(4, 3)) : qCellule(tirerDouble(4, 3))),
  ),
  gab(
    "6e_stat_comparer_tpl_e1", "stat_donnee", "stat_donnee_comparer", 1,
    "Compare les trois nombres du tableau.",
    ["stat_donnee", "comparer", "tableau", "template", "canvas"],
    () => qExtreme(tirerSerie(3, "tableau")),
  ),
  gab(
    "6e_stat_comparer_tpl_e2", "stat_donnee", "stat_donnee_comparer", 2,
    "Pour savoir combien de plus, on soustrait le plus petit du plus grand.",
    ["stat_donnee", "comparer", "difference", "template", "canvas"],
    () => qDiff(tirerSerie(entre(3, 4), "tableau")),
  ),
  gab(
    "6e_stat_interpreter_tpl_e2", "stat_donnee", "stat_donnee_interpreter", 2,
    "Vérifie chaque phrase avec les nombres.",
    ["stat_donnee", "interpreter", "template", "canvas"],
    () => qVrai(tirerSerie(3, pick(["barres", "batons", "tableau"] as const)), [pick(["max", "min", "plusQue"] as const), "plusQue", "max", "min"]),
  ),
  gab(
    "6e_stat_interpreter_tpl_e3", "stat_donnee", "stat_donnee_interpreter", 3,
    "Vérifie chaque phrase avec les nombres : une seule tient.",
    ["stat_donnee", "interpreter", "template", "canvas"],
    () => qVrai(tirerSerie(4, pick(["barres", "batons", "tableau", "camembert"] as const)), [pick(["ecart", "plusQue"] as const), "plusQue", "max", "min", "ecart"]),
  ),
  gab(
    "6e_stat_interpreter_tpl_e5", "stat_donnee", "stat_donnee_interpreter", 5,
    "Calcule le total avant de juger « plus de la moitié ».",
    ["stat_donnee", "interpreter", "moitie", "template", "canvas"],
    () => {
      // Des relevés à petits nombres : une catégorie majoritaire reste plausible (pas 122 livres).
      const s = tirerSerie(4, pick(["barres", "camembert", "tableau"] as const), pick(CTX_STAT.filter((c) => c.max <= 25)));
      // Une fois sur deux, une catégorie dépasse à elle seule la moitié du total.
      if (Math.random() < 0.5) {
        const k = entre(0, 3);
        const autres = somme(s.v) - s.v[k];
        s.v[k] = autres + entre(1, 5);
      }
      return qVrai(s, [pick(["moitie", "total", "ecart"] as const), "moitie", "total", "ecart", "double"]);
    },
  ),
  gab(
    "stat_enquete_planifier_tpl_e2", "stat_enquete", "stat_enquete_planifier", 2,
    "Une bonne question appelle une réponse précise, sans la souffler.",
    ["stat_enquete", "planifier", "question", "template"],
    qPlanifierQuestion,
  ),
  gab(
    "stat_enquete_mesurer_tpl_e2", "stat_enquete", "stat_enquete_mesurer", 2,
    "Une ligne par mesure ; l'en-tête ne compte pas.",
    ["stat_enquete", "mesurer", "template"],
    qLignesMesure,
  ),
  gab(
    "6e_stat_defi_tpl_e3", "stat_donnee", "stat_donnee_defi", 3,
    "Lis toutes les valeurs, puis additionne.",
    ["stat_donnee", "defi", "total", "template", "canvas"],
    () => (Math.random() < 0.6 ? qTotal(tirerSerie(5, pick(["barres", "batons"] as const))) : qSomme2(tirerSerie(5, pick(["barres", "batons"] as const)))),
  ),
  gab(
    "6e_stat_defi_tpl_e4", "stat_donnee", "stat_donnee_defi", 4,
    "Une case effacée se retrouve avec le total.",
    ["stat_donnee", "defi", "total", "template", "canvas"],
    () => (Math.random() < 0.6 ? qManquant(tirerSerie(4, "tableau")) : qTotalDouble(tirerDouble(3, 2), pick(["ligne", "colonne"] as const))),
  ),
];