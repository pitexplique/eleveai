// lib/tutor-v4/question-banks/maths/5e/statistiques.bank.ts

import type {
  TutorBankItemV4,
  StatGraphCanvasData,
  TableauDonneesCanvasData,
} from "@/lib/tutor-v4/types";
import { PRENOMS, de, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatNumber(n: number) {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes.
  // ⚠️ 04/08/2026 — la version précédente dédoublonnait PUIS coupait à quatre :
  // avec cinq distracteurs, le mélange pouvait renvoyer la bonne réponse en
  // cinquième position et le découpage l'emportait. L'élève ne pouvait alors
  // pas réussir, et rien ne le signalait. On met désormais la bonne réponse de
  // côté, on tire trois distracteurs, puis on mélange l'ensemble.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function sum(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}

function statGraphCanvas(params: {
  graphType: "barres" | "batons" | "camembert";
  data: Array<{ label: string; value: number; color?: string }>;
  highlightIndex?: number;
}): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    graphType: params.graphType,
    data: params.data,
    display: {
      showLabels: true,
      showValues: true,
      highlightIndex: params.highlightIndex,
    },
    size: {
      width: 320,
      height: 220,
    },
  };
}

function expl(calcul: string) {
  return (
    "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
    "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : l’indicateur obtenu résume correctement les données."
  );
}

/* =========================================================
   ENQUÊTES × TOURNURES × PRÉNOMS — 09/10/2026
   ---------------------------------------------------------
   ⛔ POURQUOI. Mesuré le 09/10 : 10 à 17 squelettes par micro, jusqu'à 18
   répétitions sur 20 (« sport # élèves, musique # élèves… »). Chaque gabarit
   compose maintenant une ENQUÊTE (15 sujets, un seul réunionnais) ou une
   SÉRIE de mesures (12 contextes) × une TOURNURE × un PRÉNOM.
   Correcteurs : correcteurs/statistiques.ts. Ils relisent le TABLEAU
   (canvas « tableau_donnees »), le DIAGRAMME (canvas « stat_graph ») ou la
   liste du texte, et refont le calcul.
   ⚠️ Conventions que le correcteur lit : une catégorie se cite entre
   guillemets (« Foot ») ; une liste de réponses s'écrit « A, B, A. » ; une
   série de nombres s'écrit « 12 ; 15 ; 9 » (le point-virgule évite de
   confondre avec la virgule décimale). ⛔ Pas de barre de fraction : une
   fréquence s'écrit en décimal (0,25) ou en pourcentage (25 %).
   ⚠️ Le diagramme ne surligne JAMAIS la réponse (avant : la barre la plus
   haute était surlignée dans « quelle catégorie a le plus grand effectif ? »).
   ========================================================= */

const r2 = (x: number) => Math.round(x * 100) / 100;
const nb = (x: number) => String(r2(x)).replace(".", ",");
const il = (p: Prenom) => (p.f ? "elle" : "il");
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const prenom = () => randomChoice(PRENOMS);
function deuxPrenoms(): [Prenom, Prenom] {
  const p = prenom();
  let q = prenom();
  while (q.nom === p.nom) q = prenom();
  return [p, q];
}
/** « Combien d’élèves », « Combien de clients ». */
const combienDe = (qui: string) => (/^[aeiouyéh]/i.test(qui) ? `Combien d’${qui}` : `Combien de ${qui}`);

type Enquete = {
  /** « les élèves de sa classe » */
  groupe: (p: Prenom) => string;
  /** « leur sport préféré » */
  quoi: string;
  /** ce qu'on compte : « élèves », « clients » */
  qui: string;
  cats: string[];
  titre: string;
};
const ENQUETES: Enquete[] = [
  { groupe: () => "les élèves de sa classe", quoi: "leur sport préféré", qui: "élèves", titre: "Sport", cats: ["Football", "Basket", "Natation", "Danse", "Judo", "Tennis"] },
  { groupe: () => "les enfants du centre de loisirs", quoi: "leur fruit préféré", qui: "enfants", titre: "Fruit", cats: ["Pomme", "Banane", "Fraise", "Mangue", "Kiwi"] },
  { groupe: () => "les élèves du collège", quoi: "leur façon de venir au collège", qui: "élèves", titre: "Transport", cats: ["À pied", "Vélo", "Bus", "Voiture", "Trottinette"] },
  { groupe: () => "ses camarades de l’équipe de handball", quoi: "leur couleur préférée", qui: "joueurs", titre: "Couleur", cats: ["Rouge", "Bleu", "Vert", "Jaune", "Violet"] },
  { groupe: () => "les voisins de son immeuble", quoi: "leur animal de compagnie", qui: "personnes", titre: "Animal", cats: ["Chat", "Chien", "Poisson", "Lapin", "Aucun"] },
  { groupe: () => "les lecteurs du CDI", quoi: "le genre de livre qu’ils préfèrent", qui: "élèves", titre: "Genre", cats: ["BD", "Roman", "Manga", "Documentaire", "Poésie"] },
  { groupe: () => "les élèves de l’école de musique", quoi: "leur instrument", qui: "élèves", titre: "Instrument", cats: ["Guitare", "Piano", "Batterie", "Flûte", "Violon"] },
  { groupe: () => "sa famille et ses amis", quoi: "leur saison préférée", qui: "personnes", titre: "Saison", cats: ["Printemps", "Été", "Automne", "Hiver"] },
  { groupe: () => "les clients du glacier", quoi: "leur parfum de glace", qui: "clients", titre: "Parfum", cats: ["Vanille", "Chocolat", "Fraise", "Pistache", "Citron"] },
  { groupe: () => "les enfants de l’école primaire", quoi: "leur jeu préféré à la récréation", qui: "enfants", titre: "Jeu", cats: ["Billes", "Corde à sauter", "Ballon", "Cartes", "Cache-cache"] },
  { groupe: () => "les demi-pensionnaires", quoi: "leur plat préféré à la cantine", qui: "élèves", titre: "Plat", cats: ["Pâtes", "Frites", "Pizza", "Couscous", "Lasagnes"] },
  { groupe: () => "les clients d’un marchand du marché de Saint-Paul", quoi: "le fruit qu’ils achètent", qui: "clients", titre: "Fruit", cats: ["Letchis", "Mangues", "Ananas", "Bananes", "Papayes"] },
  { groupe: () => "les élèves de sa classe", quoi: "leur activité du mercredi", qui: "élèves", titre: "Activité", cats: ["Sport", "Musique", "Dessin", "Lecture", "Jeux vidéo"] },
  { groupe: () => "les spectateurs du cinéma", quoi: "le genre de film qu’ils préfèrent", qui: "spectateurs", titre: "Genre", cats: ["Comédie", "Aventure", "Animation", "Policier", "Science-fiction"] },
  { groupe: () => "les élèves de sa classe", quoi: "leur matière préférée", qui: "élèves", titre: "Matière", cats: ["Maths", "Français", "Histoire", "SVT", "Anglais"] },
];

const interroges = (e: Enquete) => (e.qui === "personnes" ? "interrogées" : "interrogés");

/** Une enquête tirée : n catégories, effectifs entre min et max, tous différents (un plus grand et un plus petit uniques). */
function tirerEnquete(n: number, min: number, max: number) {
  const e = randomChoice(ENQUETES);
  const p = prenom();
  // ⚠️ « Saison » n'a que 4 réponses : 5 effectifs pour 4 colonnes faussaient le
  // tableau et le total (trouvé par le correcteur, 09/10).
  n = Math.min(n, e.cats.length);
  const cats = shuffle(e.cats).slice(0, n);
  const eff: number[] = [];
  while (eff.length < n) {
    const v = randomInt(min, max);
    if (!eff.includes(v)) eff.push(v);
  }
  const intro = `${p.nom} a interrogé ${e.groupe(p)} sur ${e.quoi}`;
  return { e, p, cats, eff, intro, total: sum(eff) };
}

function tableauEffectifs(e: Enquete, cats: string[], eff: (number | string)[]): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    headers: [e.titre, ...cats],
    rows: [{ label: "Effectif", values: eff }],
    display: { compact: true },
  };
}

function diagramme(cats: string[], eff: number[], type: "barres" | "batons" = "barres") {
  return statGraphCanvas({ graphType: type, data: cats.map((label, i) => ({ label, value: eff[i] })) });
}

/** Les séries de mesures (pour les moyennes). */
type SerieStat = {
  /** « Voici les notes de Léa en maths » (sans les nombres) */
  intro: (p: Prenom) => string;
  /** ce que mesure chaque nombre, au singulier : « note », « temps de trajet » */
  u: string;
  min: number;
  max: number;
  fem: boolean;
  nom: string;
};
const SERIES: SerieStat[] = [
  { intro: (p) => `Voici les notes ${de(p.nom)} en maths ce trimestre (sur vingt)`, u: "", min: 6, max: 19, fem: true, nom: "note" },
  { intro: (p) => `${p.nom} a chronométré son trajet jusqu’au collège, en minutes, plusieurs matins`, u: "min", min: 10, max: 30, fem: false, nom: "durée" },
  { intro: (p) => `Voici les points marqués par ${p.nom} lors de ses derniers matchs de basket`, u: "points", min: 2, max: 24, fem: false, nom: "nombre de points" },
  { intro: (p) => `Voici les distances parcourues à vélo par ${p.nom}, en kilomètres, chaque jour des vacances`, u: "km", min: 3, max: 18, fem: true, nom: "distance" },
  { intro: (p) => `Voici le nombre de pages lues par ${p.nom} chaque soir`, u: "pages", min: 5, max: 40, fem: false, nom: "nombre de pages" },
  { intro: (p) => `${p.nom} a mesuré ses plants de tomates, en centimètres`, u: "cm", min: 20, max: 60, fem: true, nom: "taille" },
  { intro: () => `Voici le nombre de buts marqués par l’équipe de foot du collège à chaque match`, u: "buts", min: 0, max: 6, fem: false, nom: "nombre de buts" },
  { intro: (p) => `${p.nom} a relevé la température à midi, en degrés, plusieurs jours de suite`, u: "°C", min: 14, max: 31, fem: true, nom: "température" },
  { intro: (p) => `Voici l’argent de poche dépensé par ${p.nom} chaque semaine, en euros`, u: "€", min: 2, max: 15, fem: false, nom: "montant" },
  { intro: (p) => `Voici le temps d’écran ${de(p.nom)}, en minutes, chaque jour de la semaine`, u: "min", min: 30, max: 120, fem: false, nom: "durée" },
  { intro: (p) => `Le grand-père ${de(p.nom)} a pesé les pommes récoltées sur chaque arbre, en kilogrammes`, u: "kg", min: 10, max: 40, fem: true, nom: "masse" },
  { intro: () => `Voici la hauteur de pluie tombée à Cilaos, en millimètres, plusieurs jours de suite`, u: "mm", min: 2, max: 30, fem: true, nom: "hauteur de pluie" },
];
const MESURES_STAT = new Set(["min", "km", "cm", "°C", "€", "kg", "mm"]);
const avecU = (x: number, u: string) => (MESURES_STAT.has(u) ? `${nb(x)} ${u}` : nb(x));
const listeNb = (xs: number[]) => xs.map(nb).join(" ; ");

/** n valeurs de la série ; `moyenneEntiere` : la somme est un multiple de n. */
function tirerValeurs(s: SerieStat, n: number, moyenneEntiere: boolean) {
  for (;;) {
    const xs = Array.from({ length: n }, () => randomInt(s.min, s.max));
    if (!moyenneEntiere || sum(xs) % n === 0) return xs;
  }
}

/* ─── Organiser des données brutes ───────────────────────────────────── */

/**
 * niveau 1 : 8 à 10 réponses, 3 catégories, un effectif ; 2 : 12 à 16 réponses,
 * un effectif ou le total ; 3 : une série de nombres (pointures, frères et
 * sœurs…), effectif d'une valeur, « au moins », valeur la plus fréquente.
 */
function genOrganiser(niveau: 1 | 2 | 3) {
  if (niveau <= 2) {
    const { e, cats, intro } = tirerEnquete(niveau === 1 ? 3 : randomChoice([3, 4]), 1, 20);
    const n = niveau === 1 ? randomInt(8, 10) : randomInt(12, 16);
    const liste = Array.from({ length: n }, () => randomChoice(cats));
    for (const c of cats) if (!liste.includes(c)) liste[randomInt(0, n - 1)] = c;
    const cible = randomChoice(cats.filter((c) => liste.includes(c)));
    const eff = liste.filter((x) => x === cible).length;
    const total = niveau === 2 && Math.random() < 0.3;
    const qui = combienDe(e.qui);
    const question = total
      ? randomChoice([`${qui} ont répondu en tout ?`, "Quel est l’effectif total ?"])
      : randomChoice([`${qui} ont répondu « ${cible} » ?`, `Quel est l’effectif de la réponse « ${cible} » ?`, `Combien de fois la réponse « ${cible} » apparaît-elle ?`]);
    return {
      text: `${intro}. Voici les réponses : ${liste.join(", ")}. ${question}`,
      format: "short" as const,
      expected: [String(total ? n : eff)],
      comparator: "number_equal" as const,
      explanation: expl(total ? `on compte toutes les réponses de la liste : il y en a ${n}.` : `on compte les « ${cible} » dans la liste : il y en a ${eff}. C’est l’effectif de « ${cible} ».`),
    };
  }
  const contexte = randomChoice([
    { intro: (p: Prenom) => `${p.nom} a relevé la pointure de ses camarades de club`, min: 35, max: 41, nom: "la pointure" },
    { intro: (p: Prenom) => `${p.nom} a demandé à ses camarades combien ils ont de frères et sœurs`, min: 0, max: 4, nom: "le nombre" },
    { intro: (p: Prenom) => `${p.nom} a relevé les notes du dernier contrôle de sa classe (sur vingt)`, min: 8, max: 17, nom: "la note" },
    { intro: (p: Prenom) => `${p.nom} a lancé un dé plusieurs fois et noté les résultats`, min: 1, max: 6, nom: "le résultat" },
    { intro: (p: Prenom) => `${p.nom} a compté les buts de son équipe à chaque match de la saison`, min: 0, max: 5, nom: "le nombre de buts" },
  ]);
  const p = prenom();
  for (;;) {
    const n = randomInt(12, 15);
    const xs = Array.from({ length: n }, () => randomInt(contexte.min, Math.min(contexte.max, contexte.min + 5)));
    const compte = (v: number) => xs.filter((x) => x === v).length;
    const t = randomInt(1, 3);
    let question: string;
    let rep: number;
    if (t === 1) {
      const v = randomChoice(xs);
      question = `Quel est l’effectif de la valeur ${v} ?`;
      rep = compte(v);
    } else if (t === 2) {
      const seuil = randomInt(contexte.min + 1, Math.min(contexte.max, contexte.min + 4));
      question = `Combien de valeurs sont supérieures ou égales à ${seuil} ?`;
      rep = xs.filter((x) => x >= seuil).length;
    } else {
      const max = Math.max(...[...new Set(xs)].map(compte));
      const modes = [...new Set(xs)].filter((v) => compte(v) === max);
      if (modes.length !== 1) continue;
      question = "Quelle valeur apparaît le plus souvent ?";
      rep = modes[0];
    }
    return {
      text: `${contexte.intro(p)} : ${listeNb(xs)}. ${question}`,
      format: "short" as const,
      expected: [String(rep)],
      comparator: "number_equal" as const,
      explanation: expl(
        t === 3
          ? `on compte chaque valeur ; ${rep} apparaît ${compte(rep)} fois, plus que toutes les autres.`
          : `on range les valeurs en comptant : la réponse est ${rep}.`,
      ),
    };
  }
}

/* ─── Lire un tableau d'effectifs ─────────────────────────────────────── */

/**
 * niveau 1 : effectif d'une catégorie ; 2 : total, écart entre deux, somme de
 * deux ; 3 : « n'ont pas choisi », case manquante (total donné), la plus choisie.
 */
function genLireTableau(niveau: 1 | 2 | 3) {
  const { e, p, cats, eff, intro, total } = tirerEnquete(niveau === 1 ? randomChoice([3, 4]) : randomChoice([4, 5]), 2, 15);
  const qui = combienDe(e.qui);
  const i = randomInt(0, cats.length - 1);
  let j = randomInt(0, cats.length - 1);
  while (j === i) j = randomInt(0, cats.length - 1);
  const tete = randomChoice([
    `${intro}. Voici ses résultats.`,
    `${intro} et a rangé les réponses dans ce tableau.`,
    `Ce tableau donne les réponses des ${e.qui} ${interroges(e)} par ${p.nom} sur ${e.quoi}.`,
  ]);
  const t = niveau === 1 ? 1 : niveau === 2 ? randomInt(2, 4) : randomInt(5, 7);
  let question: string;
  let rep: number;
  let canvasEff: (number | string)[] = eff;
  let qcm: string[] | null = null;
  if (t === 1) {
    question = randomChoice([`${qui} ont répondu « ${cats[i]} » ?`, `Quel est l’effectif de « ${cats[i]} » ?`]);
    rep = eff[i];
  } else if (t === 2) {
    question = randomChoice([`${qui} ont répondu en tout ?`, "Quel est l’effectif total ?"]);
    rep = total;
  } else if (t === 3) {
    const [a, b] = eff[i] > eff[j] ? [i, j] : [j, i];
    question = `${qui} de plus ont répondu « ${cats[a]} » plutôt que « ${cats[b]} » ?`;
    rep = eff[a] - eff[b];
  } else if (t === 4) {
    question = `${qui} ont répondu « ${cats[i]} » ou « ${cats[j]} » ?`;
    rep = eff[i] + eff[j];
  } else if (t === 5) {
    question = `${qui} n’ont pas répondu « ${cats[i]} » ?`;
    rep = total - eff[i];
  } else if (t === 6) {
    canvasEff = eff.map((x, k) => (k === i ? "?" : x));
    question = `En tout, ${total} ${e.qui} ont répondu. Quel est l’effectif de « ${cats[i]} » ?`;
    rep = eff[i];
  } else {
    const plus = Math.random() < 0.5;
    const k = eff.indexOf(plus ? Math.max(...eff) : Math.min(...eff));
    question = `Quelle réponse a été donnée le ${plus ? "plus" : "moins"} souvent ?`;
    qcm = cats;
    rep = k;
  }
  const canvas = tableauEffectifs(e, cats, canvasEff);
  if (qcm) {
    return {
      text: `${tete} ${question}`,
      format: "qcm" as const,
      choices: shuffle(qcm),
      expected: [cats[rep]],
      comparator: "mcq_exact" as const,
      explanation: expl(`on compare les effectifs du tableau : « ${cats[rep]} » a l’effectif ${eff[rep]}.`),
      canvas,
    };
  }
  return {
    text: `${tete} ${question}`,
    format: "short" as const,
    expected: [String(rep)],
    comparator: "number_equal" as const,
    explanation: expl(
      t === 1 ? `on lit la case de « ${cats[i]} » : ${eff[i]}.`
        : t === 2 ? `on additionne les effectifs : ${eff.join(" + ")} = ${total}.`
        : t === 3 ? `on soustrait les deux effectifs : la réponse est ${rep}.`
        : t === 4 ? `on additionne les deux effectifs : ${eff[i]} + ${eff[j]} = ${rep}.`
        : t === 5 ? `on enlève l’effectif de « ${cats[i]} » au total : ${total} − ${eff[i]} = ${rep}.`
        : `on enlève au total les effectifs connus : ${total} − ${eff.filter((_, k) => k !== i).join(" − ")} = ${rep}.`,
    ),
    canvas,
  };
}

/* ─── Lire un diagramme ───────────────────────────────────────────────── */

/** niveau 2 : effectif lu, la plus haute / la plus basse ; 3 : total, écart, somme. */
function genLireGraphique(niveau: 2 | 3) {
  const { e, p, cats, eff, intro, total } = tirerEnquete(randomChoice([4, 5]), 2, 16);
  const qui = combienDe(e.qui);
  const i = randomInt(0, cats.length - 1);
  let j = randomInt(0, cats.length - 1);
  while (j === i) j = randomInt(0, cats.length - 1);
  const type = randomChoice(["barres", "batons"] as const);
  const tete = randomChoice([
    `${intro}. Le diagramme montre ses résultats.`,
    `Le diagramme ${type === "barres" ? "en barres" : "en bâtons"} donne les réponses des ${e.qui} ${interroges(e)} par ${p.nom} sur ${e.quoi}.`,
    `${intro} et a tracé ce diagramme.`,
  ]);
  const canvas = diagramme(cats, eff, type);
  const t = niveau === 2 ? randomInt(1, 3) : randomInt(4, 6);
  if (t === 2 || t === 3) {
    const plus = t === 2;
    const k = eff.indexOf(plus ? Math.max(...eff) : Math.min(...eff));
    return {
      text: `${tete} D’après le diagramme, quelle réponse a été donnée le ${plus ? "plus" : "moins"} souvent ?`,
      format: "qcm" as const,
      choices: shuffle(cats),
      expected: [cats[k]],
      comparator: "mcq_exact" as const,
      explanation: expl(`la ${plus ? "plus haute" : "plus basse"} barre est celle de « ${cats[k]} » (${eff[k]}).`),
      canvas,
    };
  }
  let question: string;
  let rep: number;
  if (t === 1) {
    question = randomChoice([`D’après le diagramme, ${qui.toLowerCase()} ont répondu « ${cats[i]} » ?`, `Lis sur le diagramme l’effectif de « ${cats[i]} ».`]);
    rep = eff[i];
  } else if (t === 4) {
    question = randomChoice([`D’après le diagramme, ${qui.toLowerCase()} ont répondu en tout ?`, "Quel est l’effectif total représenté ?"]);
    rep = total;
  } else if (t === 5) {
    const [a, b] = eff[i] > eff[j] ? [i, j] : [j, i];
    question = `${qui} de plus ont répondu « ${cats[a]} » plutôt que « ${cats[b]} » ?`;
    rep = eff[a] - eff[b];
  } else {
    question = `${qui} ont répondu « ${cats[i]} » ou « ${cats[j]} » ?`;
    rep = eff[i] + eff[j];
  }
  return {
    text: `${tete} ${question}`,
    format: "short" as const,
    expected: [String(rep)],
    comparator: "number_equal" as const,
    explanation: expl(`on lit la hauteur des barres : ${cats.map((c, k) => `${c} ${eff[k]}`).join(", ")} ; la réponse est ${rep}.`),
    canvas,
  };
}

/** n effectifs différents, au moins `min`, de somme N. */
function partage(N: number, n: number, min = 1): number[] {
  // garde-fou : n effectifs distincts valent au moins min + (min + 1) + …
  if (n * min + (n * (n - 1)) / 2 > N) throw new Error(`partage impossible : ${n} effectifs distincts pour ${N}`);
  for (;;) {
    const xs = Array.from({ length: n - 1 }, () => randomInt(min, Math.floor((2 * N) / n)));
    const der = N - sum(xs);
    const tous = [...xs, der];
    if (der >= min && new Set(tous).size === n) return tous;
  }
}

/* ─── Effectifs et fréquences ─────────────────────────────────────────── */

/**
 * niveau 2 : fréquence en nombre décimal (texte ou tableau) ;
 * 3 : fréquence en pourcentage, ou effectif à partir de la fréquence.
 * ⛔ Pas de « 8/20 » : une fréquence s'écrit 0,4 ou 40 %.
 */
function genFrequence(niveau: 2 | 3) {
  const e = randomChoice(ENQUETES);
  const p = prenom();
  const N = randomChoice([10, 20, 25, 50]);
  const n = randomChoice([3, 4]);
  const cats = shuffle(e.cats).slice(0, n);
  const eff = partage(N, n, 1);
  const i = randomInt(0, n - 1);
  const f = eff[i] / N;
  const intro = `${p.nom} a interrogé ${e.groupe(p)} sur ${e.quoi}`;
  const t = niveau === 2 ? randomInt(1, 2) : randomInt(3, 5);
  const enPct = t === 3 || t === 4;
  if (t === 5) {
    // l'effectif à partir de la fréquence
    // un effectif entier : 25 × 0,1 = 2,5 enfants était servi (trouvé par le correcteur)
    const fd = randomChoice([0.1, 0.2, 0.3, 0.4, 0.5, 0.6].filter((x) => Number.isInteger(Math.round(N * x * 1e6) / 1e6)));
    const k = r2(N * fd);
    const enP = Math.random() < 0.5;
    return {
      text: `${intro} : ${N} ${e.qui} ont répondu. La fréquence de la réponse « ${cats[i]} » est ${enP ? `${Math.round(fd * 100)} %` : nb(fd)}. ${combienDe(e.qui)} ont répondu « ${cats[i]} » ?`,
      format: "short" as const,
      expected: [nb(k)],
      comparator: "number_equal" as const,
      explanation: expl(`effectif = fréquence × effectif total : ${N} × ${nb(fd)} = ${nb(k)}.`),
    };
  }
  const consigne = enPct
    ? randomChoice(["Donne-la en pourcentage.", "Écris-la en pourcentage."])
    : randomChoice(["Donne-la en nombre décimal.", "Écris-la sous forme décimale."]);
  const rep = enPct ? `${nb(f * 100)} %` : nb(f);
  const explication = expl(
    `fréquence = effectif ÷ effectif total = ${eff[i]} ÷ ${N} = ${nb(f)}${enPct ? `, soit ${nb(f * 100)} %` : ""}.`,
  );
  if (t === 2 || t === 4) {
    return {
      text: `${intro} et a rangé les réponses dans ce tableau. Quelle est la fréquence de la réponse « ${cats[i]} » ? ${consigne}`,
      format: "short" as const,
      expected: [rep],
      comparator: "number_equal" as const,
      explanation: explication,
      canvas: tableauEffectifs(e, cats, eff),
    };
  }
  return {
    text: `${intro}. Sur ${N} ${e.qui}, ${eff[i]} ont répondu « ${cats[i]} ». Quelle est la fréquence de cette réponse ? ${consigne}`,
    format: "short" as const,
    expected: [rep],
    comparator: "number_equal" as const,
    explanation: explication,
  };
}

/* ─── Représenter : hauteur d'une barre, angle d'un secteur ───────────── */

/** niveau 2 : hauteur d'une barre (échelle donnée) ; 3 : angle d'un secteur circulaire. */
function genRepresenter(niveau: 2 | 3) {
  const e = randomChoice(ENQUETES);
  const p = prenom();
  const n = randomChoice([3, 4]);
  const cats = shuffle(e.cats).slice(0, n);
  const i = randomInt(0, n - 1);
  const intro = `${p.nom} a interrogé ${e.groupe(p)} sur ${e.quoi}`;
  if (niveau === 2) {
    const s = randomChoice([2, 4, 5, 10]);
    const eff: number[] = [];
    while (eff.length < n) {
      const v = s * randomInt(1, 8) + (s % 2 === 0 && Math.random() < 0.3 ? s / 2 : 0);
      if (!eff.includes(v)) eff.push(v);
    }
    const h = eff[i] / s;
    if (Math.random() < 0.3) {
      // à l'envers : la hauteur est donnée
      return {
        text: `Dans le diagramme en barres ${de(p.nom)}, 1 cm représente ${s} ${e.qui}. La barre de « ${cats[i]} » mesure ${nb(h)} cm. ${combienDe(e.qui)} ont répondu « ${cats[i]} » ?`,
        format: "short" as const,
        expected: [nb(eff[i])],
        comparator: "number_equal" as const,
        explanation: expl(`chaque centimètre représente ${s} ${e.qui} : ${nb(h)} × ${s} = ${eff[i]}.`),
      };
    }
    return {
      text: `${intro} et veut tracer un diagramme en barres où 1 cm représente ${s} ${e.qui}. Quelle hauteur, en cm, doit avoir la barre de « ${cats[i]} » ?`,
      format: "short" as const,
      expected: [`${nb(h)} cm`],
      comparator: "number_equal" as const,
      explanation: expl(`1 cm pour ${s} ${e.qui} : ${eff[i]} ÷ ${s} = ${nb(h)} cm.`),
      canvas: tableauEffectifs(e, cats, eff),
    };
  }
  const N = randomChoice([18, 20, 24, 30, 36, 40, 45, 60, 72, 90]);
  const eff = partage(N, n, 1);
  const angle = (eff[i] * 360) / N;
  if (Math.random() < 0.3) {
    return {
      text: `${intro} : ${N} ${e.qui} ont répondu. Dans son diagramme circulaire, le secteur de « ${cats[i]} » mesure ${angle}°. ${combienDe(e.qui)} ont répondu « ${cats[i]} » ?`,
      format: "short" as const,
      expected: [String(eff[i])],
      comparator: "number_equal" as const,
      explanation: expl(`le disque entier (360°) représente ${N} ${e.qui}, donc 1 ${e.qui.replace(/s$/, "")} correspond à 360 ÷ ${N} = ${360 / N}°. ${angle} ÷ ${360 / N} = ${eff[i]}.`),
    };
  }
  return {
    text: `${intro} et veut tracer un diagramme circulaire. Quel angle, en degrés, doit mesurer le secteur de « ${cats[i]} » ?`,
    format: "short" as const,
    expected: [`${angle}°`],
    comparator: "number_equal" as const,
    explanation: expl(`le disque entier (360°) représente les ${N} ${e.qui} : ${eff[i]} × 360 ÷ ${N} = ${angle}°.`),
    canvas: tableauEffectifs(e, cats, eff),
  };
}

/* ─── Choisir une représentation ──────────────────────────────────────── */

const GRAPHIQUES = ["un diagramme en barres", "un diagramme circulaire", "un graphique en courbe"] as const;
const BESOINS: Array<{ g: (typeof GRAPHIQUES)[number]; texte: (p: Prenom) => string }> = [
  { g: "un graphique en courbe", texte: (p) => `${p.nom} relève la température de sa chambre à chaque heure et veut montrer son évolution au cours de la journée` },
  { g: "un graphique en courbe", texte: (p) => `${p.nom} veut montrer l’évolution de sa taille, mesurée chaque année depuis sa naissance` },
  { g: "un graphique en courbe", texte: (p) => `${p.nom} veut suivre l’évolution du nombre d’abonnés de sa chaîne, mois après mois` },
  { g: "un graphique en courbe", texte: (p) => `${p.nom} mesure son plant de haricot chaque jour et veut montrer son évolution au cours du mois` },
  { g: "un diagramme circulaire", texte: (p) => `${p.nom} veut montrer la répartition des élèves de sa classe selon leur moyen de transport, en parts du total` },
  { g: "un diagramme circulaire", texte: (p) => `${p.nom} veut montrer la part de chaque dépense dans son budget de vacances` },
  { g: "un diagramme circulaire", texte: (p) => `${p.nom} veut montrer la répartition des votes pour l’élection du délégué, en parts de l’ensemble des votes` },
  { g: "un diagramme circulaire", texte: (p) => `${p.nom} veut montrer la répartition de sa journée entre sommeil, école et loisirs` },
  { g: "un diagramme en barres", texte: (p) => `${p.nom} veut comparer le nombre de livres empruntés par chaque classe du collège` },
  { g: "un diagramme en barres", texte: (p) => `${p.nom} veut comparer le nombre d’inscrits dans les clubs sportifs du collège` },
  { g: "un diagramme en barres", texte: (p) => `${p.nom} veut comparer les ventes de chaque parfum de glace sur une journée` },
  { g: "un diagramme en barres", texte: (p) => `${p.nom} veut comparer le nombre de médailles gagnées par quatre pays` },
];

/** niveau 2 et 3 : le graphique adapté ; niveau 4 : lire un diagramme circulaire (pourcentage d'un secteur). */
function genChoisirRep(niveau: 2 | 3 | 4) {
  const p = prenom();
  if (niveau <= 3) {
    const b = randomChoice(BESOINS);
    return {
      text: `${b.texte(p)}. ${randomChoice(["Quel graphique est le mieux adapté ?", `Quel graphique ${p.nom} doit-${il(p)} choisir ?`, "Quelle représentation convient le mieux ?"])}`,
      format: "qcm" as const,
      choices: shuffle([...GRAPHIQUES]),
      expected: [b.g],
      comparator: "mcq_exact" as const,
      explanation: expl(
        "une évolution dans le temps se montre avec une courbe ; des parts d’un tout avec un diagramme circulaire ; des effectifs à comparer avec des barres.",
      ) + `\n\nIci : ${b.g}.`,
    };
  }
  const e = randomChoice(ENQUETES);
  const N = randomChoice([20, 25, 50, 100]);
  const n = randomChoice([3, 4]);
  const cats = shuffle(e.cats).slice(0, n);
  const eff = partage(N, n, 1);
  const i = randomInt(0, n - 1);
  return {
    text: `${p.nom} a interrogé ${e.groupe(p)} sur ${e.quoi} et a tracé ce diagramme circulaire. Quel pourcentage des ${e.qui} a répondu « ${cats[i]} » ?`,
    format: "short" as const,
    expected: [`${nb((eff[i] * 100) / N)} %`],
    comparator: "number_equal" as const,
    explanation: expl(`effectif total : ${eff.join(" + ")} = ${N}. Pourcentage : ${eff[i]} ÷ ${N} × 100 = ${nb((eff[i] * 100) / N)} %.`),
    canvas: statGraphCanvas({ graphType: "camembert", data: cats.map((label, k) => ({ label, value: eff[k] })) }),
  };
}

/* ─── Moyennes ────────────────────────────────────────────────────────── */

const SERIES_OBJECTIF = SERIES.filter((s) => ["note", "nombre de points", "distance", "nombre de pages"].includes(s.nom));

/** La valeur à ajouter pour atteindre une moyenne. */
function genValeurManquante(n: number) {
  const s = randomChoice(SERIES_OBJECTIF);
  const p = prenom();
  for (;;) {
    const xs = Array.from({ length: n }, () => randomInt(s.min, s.max));
    const M = randomInt(s.min + 2, s.max - 2);
    const x = M * (n + 1) - sum(xs);
    // plausible : dans la plage de la série, et pas loin des valeurs déjà obtenues
    if (x < s.min || x > s.max || x < Math.min(...xs) - 8 || x > Math.max(...xs) + 8) continue;
    return {
      text: `${s.intro(p)} : ${listeNb(xs)}. ${p.nom} voudrait une moyenne de ${avecU(M, s.u)} avec une valeur de plus. ${randomChoice(["Quelle doit être cette valeur ?", "Quelle valeur doit-" + il(p) + " obtenir ?"])}`,
      format: "short" as const,
      expected: [avecU(x, s.u)],
      comparator: "number_equal" as const,
      explanation: expl(
        `pour une moyenne de ${M} sur ${n + 1} valeurs, la somme doit valoir ${M} × ${n + 1} = ${M * (n + 1)}. Les ${n} valeurs font déjà ${sum(xs)}. Il manque ${M * (n + 1)} − ${sum(xs)} = ${x}.`,
      ),
    };
  }
}

/** niveau 2 : 3 ou 4 valeurs, moyenne entière ; 3 : 4 ou 5 valeurs, ou un tableau d'effectifs ; 4 : la valeur manquante. */
function genMoyenne(niveau: 2 | 3 | 4) {
  if (niveau === 4) return genValeurManquante(randomChoice([3, 4]));
  const p = prenom();
  if (niveau === 3 && Math.random() < 0.4) {
    // moyenne pondérée lue dans un tableau
    const ctx = randomChoice([
      { phrase: `${p.nom} a résumé les notes du dernier contrôle de sa classe (sur vingt)`, titre: "Note", vals: [8, 10, 12, 14, 16, 18] },
      { phrase: `${p.nom} a demandé à ses camarades combien ils ont de frères et sœurs`, titre: "Frères et sœurs", vals: [0, 1, 2, 3] },
      { phrase: `${p.nom} a relevé le nombre de buts marqués à chaque match de la saison`, titre: "Buts", vals: [0, 1, 2, 3, 4] },
      { phrase: `${p.nom} a relevé la pointure des joueurs de son équipe`, titre: "Pointure", vals: [36, 37, 38, 39, 40] },
    ]);
    const vals = shuffle(ctx.vals).slice(0, randomChoice([3, 4])).sort((a, b) => a - b);
    const N = vals.length >= 4 ? 20 : randomChoice([10, 20]);
    const eff = partage(N, vals.length, 1);
    const m = sum(vals.map((v, k) => v * eff[k])) / N;
    return {
      text: `${ctx.phrase} et a rangé les résultats dans ce tableau. ${randomChoice(["Quelle est la moyenne de cette série ?", "Calcule la moyenne de la série."])}`,
      format: "short" as const,
      expected: [nb(m)],
      comparator: "number_equal" as const,
      explanation: expl(`on multiplie chaque valeur par son effectif : ${vals.map((v, k) => `${v} × ${eff[k]}`).join(" + ")} = ${nb(m * N)} ; on divise par l’effectif total ${N} : ${nb(m)}.`),
      canvas: {
        kind: "tableau_donnees" as const,
        headers: [ctx.titre, ...vals.map(String)],
        rows: [{ label: "Effectif", values: eff }],
        display: { compact: true },
      },
    };
  }
  const s = randomChoice(SERIES);
  const n = niveau === 2 ? randomChoice([3, 4]) : randomChoice([4, 5]);
  const xs = tirerValeurs(s, n, niveau === 2);
  const m = sum(xs) / n;
  return {
    text: `${s.intro(p)} : ${listeNb(xs)}. ${randomChoice([
      "Quelle est la moyenne de cette série ?",
      "Calcule la moyenne de ces valeurs.",
      `Aide ${p.nom} à calculer la moyenne.`,
      "Quelle est la valeur moyenne ?",
    ])}`,
    format: "short" as const,
    expected: [avecU(m, s.u)],
    comparator: "number_equal" as const,
    explanation: expl(`on additionne les ${n} valeurs : ${xs.join(" + ")} = ${sum(xs)} ; puis on divise par ${n} : ${sum(xs)} ÷ ${n} = ${nb(m)}.`),
  };
}

/* ─── Défis ───────────────────────────────────────────────────────────── */

/** Deux séries, deux prénoms : qui a la plus grande moyenne ? */
function genComparerMoyennes() {
  const s = randomChoice(SERIES_OBJECTIF);
  const [p, q] = deuxPrenoms();
  const n = 4;
  const xa = tirerValeurs(s, n, true);
  let xb = tirerValeurs(s, n, true);
  if (Math.random() < 0.2) xb = shuffle(xa.map((x, k) => (k === 0 ? x + 1 : k === 1 ? x - 1 : x)));
  const ma = sum(xa) / n;
  const mb = sum(xb) / n;
  const pareil = "c’est pareil pour les deux";
  const correct = ma === mb ? pareil : ma > mb ? p.nom : q.nom;
  const QUOI: Record<string, string> = {
    note: "les notes en maths (sur vingt)",
    "nombre de points": "les points marqués aux derniers matchs de basket",
    distance: "les distances parcourues à vélo chaque jour, en kilomètres",
    "nombre de pages": "le nombre de pages lues chaque soir",
  };
  return {
    text: `Pour deux élèves, on compare ${QUOI[s.nom]}. ${p.nom} : ${listeNb(xa)}. ${q.nom} : ${listeNb(xb)}. Qui a la plus grande moyenne ?`,
    format: "qcm" as const,
    choices: [p.nom, q.nom, pareil],
    expected: [correct],
    comparator: "mcq_exact" as const,
    explanation: expl(`${p.nom} : ${sum(xa)} ÷ ${n} = ${nb(ma)} ; ${q.nom} : ${sum(xb)} ÷ ${n} = ${nb(mb)}.`),
  };
}

/** Moyenne pondérée lue sur un diagramme en bâtons (valeurs en abscisse). */
function genMoyenneDiagramme() {
  const p = prenom();
  const ctx = randomChoice([
    { phrase: `Le diagramme donne le nombre de buts marqués par l’équipe ${de(p.nom)} à chaque match de la saison`, vals: [0, 1, 2, 3, 4] },
    { phrase: `Le diagramme donne le nombre de frères et sœurs des élèves de la classe ${de(p.nom)}`, vals: [0, 1, 2, 3] },
    { phrase: `Le diagramme donne les notes obtenues par la classe ${de(p.nom)} au dernier contrôle (sur vingt)`, vals: [8, 10, 12, 14, 16] },
    { phrase: `Le diagramme donne le nombre de livres lus cet été par les élèves du club lecture ${de(p.nom)}`, vals: [1, 2, 3, 4, 5] },
  ]);
  const vals = ctx.vals.slice(0, randomChoice([3, 4, 5].filter((k) => k <= ctx.vals.length)));
  // ⚠️ 5 effectifs distincts font au moins 15 : avec 10, `partage` tournait sans fin.
  const N = vals.length >= 4 ? 20 : randomChoice([10, 20]);
  const eff = partage(N, vals.length, 1);
  const m = sum(vals.map((v, k) => v * eff[k])) / N;
  return {
    text: `${ctx.phrase}. En bas, on lit la valeur ; la hauteur donne l’effectif. Quelle est la moyenne de cette série ?`,
    format: "short" as const,
    expected: [nb(m)],
    comparator: "number_equal" as const,
    explanation: expl(`effectif total : ${N}. Somme : ${vals.map((v, k) => `${v} × ${eff[k]}`).join(" + ")} = ${nb(m * N)}. Moyenne : ${nb(m * N)} ÷ ${N} = ${nb(m)}.`),
    canvas: statGraphCanvas({ graphType: "batons", data: vals.map((v, k) => ({ label: String(v), value: eff[k] })) }),
  };
}

/** La moyenne de n valeurs est connue ; une valeur s'ajoute : nouvelle moyenne. */
function genNouvelleMoyenne() {
  const p = prenom();
  for (;;) {
    const n = randomChoice([3, 4, 5]);
    const ctx = randomChoice([
      { M: [10, 11, 12, 13, 14], V: [8, 20], f: (M: number, V: number) => `${p.nom} a eu ${n} notes ce trimestre, et sa moyenne est de ${M} (sur vingt). Au contrôle suivant, ${il(p)} obtient ${V}. Quelle est sa nouvelle moyenne ?`, u: "" },
      { M: [8, 10, 12, 15], V: [2, 25], f: (M: number, V: number) => `Sur ${n} matchs, ${p.nom} a marqué en moyenne ${M} points. Au match suivant, ${il(p)} marque ${V} points. Quelle est sa nouvelle moyenne ?`, u: "" },
      { M: [10, 15, 20, 25], V: [5, 40], f: (M: number, V: number) => `Sur ${n} soirs, ${p.nom} a lu en moyenne ${M} pages. Le soir suivant, ${il(p)} lit ${V} pages. Quelle est sa nouvelle moyenne ?`, u: "" },
      { M: [6, 8, 10, 12], V: [3, 20], f: (M: number, V: number) => `Sur ${n} jours, ${p.nom} a parcouru en moyenne ${M} km à vélo. Le jour suivant, ${il(p)} parcourt ${V} km. Quelle est sa nouvelle moyenne ?`, u: "km" },
    ]);
    const M = randomChoice(ctx.M);
    const V = randomInt(ctx.V[0], ctx.V[1]);
    const m = (n * M + V) / (n + 1);
    if (V === M || Math.abs(m * 100 - Math.round(m * 100)) > 1e-9) continue;
    return {
      text: ctx.f(M, V),
      format: "short" as const,
      expected: [avecU(m, ctx.u)],
      comparator: "number_equal" as const,
      explanation: expl(`la somme des ${n} premières valeurs est ${n} × ${M} = ${n * M}. Avec la nouvelle : ${n * M} + ${V} = ${n * M + V}, pour ${n + 1} valeurs : ${n * M + V} ÷ ${n + 1} = ${nb(m)}.`),
    };
  }
}

export const statistiquesBank: TutorBankItemV4[] = [
  /* =========================
     STAT_ORGANISER_DONNEES
  ========================= */
  {
    kind: "fixed",
    id: "stat_donnee_organiser_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 1,
    theme: "neutral",
    text: "On interroge des élèves sur leur sport préféré. Quelle information doit-on compter pour faire un tableau statistique ?",
    format: "qcm",
    choices: [
      "le nombre d’élèves pour chaque sport",
      "la taille des élèves",
      "la couleur du tableau",
      "le nom du professeur",
    ],
    expected: ["le nombre d’élèves pour chaque sport"],
    comparator: "mcq_exact",
    hint: "Un tableau statistique organise des effectifs.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("Pour faire un tableau statistique, on compte l’effectif de chaque catégorie.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "organiser", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_donnee_organiser_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi il faut organiser les données… ».
    text: "Sport préféré de 10 élèves : foot, basket, foot, judo, foot, basket, judo, foot, basket, foot. Combien d’élèves ont choisi le foot ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte les « foot » un par un.",
    explanation: expl("On compte les « foot » de la liste : il y en a 5. Basket : 3. Judo : 2. Compter chaque catégorie, c’est organiser les données : 5 + 3 + 2 = 10 élèves."),
    tags: ["stat_statistique", "organiser", "short"],
  },

  /* =========================
     STAT_LIRE_TABLEAU
  ========================= */
  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une enquête, 8 élèves préfèrent le football, 6 le basket et 4 la natation. Quel est l’effectif du basket ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Lis directement l’effectif associé au basket.",
    explanation: "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("L’effectif du basket est 6.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "tableau", "lecture"],
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une enquête : foot 8 élèves, basket 6 élèves, natation 4 élèves. Quel est l’effectif total ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Additionne les effectifs.",
    explanation: "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("L’effectif total est 8 + 6 + 4 = 18.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "tableau", "effectif_total"],
  },
  {
    kind: "template",
    id: "stat_lire_tableau_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis les cases du tableau, puis calcule.",
    tags: ["stat_statistique", "tableau", "template"],
    // 09/10/2026 : 15 enquêtes × tournures × prénoms, un vrai tableau (voir genLireTableau).
    generate: () => genLireTableau(2),
  },
  {
    kind: "template",
    id: "stat_lire_tableau_tpl_e1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche la colonne de la réponse demandée.",
    tags: ["stat_statistique", "tableau", "template"],
    generate: () => genLireTableau(1),
  },

  /* =========================
     STAT_LIRE_GRAPHIQUE
  ========================= */
  {
    kind: "fixed",
    id: "stat_lire_graphique_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "D’après le graphique, quelle activité est la plus choisie ?",
    format: "qcm",
    choices: ["Foot", "Basket", "Natation", "Dessin"],
    expected: ["Foot"],
    comparator: "mcq_exact",
    hint: "Regarde la barre la plus haute.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("La barre la plus haute est celle du foot : c’est l’activité la plus choisie.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "graphique", "canvas", "qcm"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Foot", value: 12 },
        { label: "Basket", value: 8 },
        { label: "Natation", value: 5 },
        { label: "Dessin", value: 7 },
      ],
      highlightIndex: 0,
    }),
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment trouver la catégorie la plus fréquente… ».
    text: "D’après le graphique, quelle couleur a été choisie le plus souvent ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "Vert", "Jaune"],
    expected: ["Bleu"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus haute.",
    explanation: expl("La barre la plus haute est celle du bleu : 11. C’est la couleur choisie le plus souvent."),
    tags: ["stat_statistique", "graphique", "canvas", "qcm"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Rouge", value: 6 },
        { label: "Bleu", value: 11 },
        { label: "Vert", value: 8 },
        { label: "Jaune", value: 4 },
      ],
    }),
  },
  {
    kind: "template",
    id: "stat_lire_graphique_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare la hauteur des barres.",
    tags: ["stat_statistique", "graphique", "canvas", "template"],
    // 09/10/2026 : enquêtes × tournures × prénoms ; la barre de la réponse n'est
    // plus surlignée (elle donnait la réponse).
    generate: () => genLireGraphique(2),
  },

  /* =========================
     STAT_EFFECTIF_FREQUENCE
  ========================= */
  {
    kind: "fixed",
    id: "stat_effectif_frequence_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe de 25 élèves, 10 viennent à vélo. Quelle est la fréquence des élèves venant à vélo ?",
    format: "short",
    expected: ["0,4", "0.4", "40%"],
    comparator: "number_equal",
    hint: "Fréquence = effectif ÷ effectif total.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("La fréquence est 10 ÷ 25 = 0,4, soit 40 %.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "frequence"],
  },
  {
    kind: "fixed",
    id: "stat_effectif_frequence_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un groupe de 20 élèves, 5 préfèrent les maths. Quelle est la fréquence ?",
    format: "qcm",
    choices: ["0,25", "0,5", "5", "15"],
    expected: ["0,25"],
    comparator: "mcq_exact",
    hint: "Calcule 5 ÷ 20.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("La fréquence est 5 ÷ 20 = 0,25.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "frequence", "qcm"],
  },
  {
    kind: "template",
    id: "stat_effectif_frequence_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence = effectif ÷ total.",
    tags: ["stat_statistique", "frequence", "template"],
    // 09/10/2026 : enquêtes × tournures × prénoms ; en pourcentage, ou l'effectif retrouvé.
    generate: () => genFrequence(3),
  },
  {
    kind: "template",
    id: "stat_effectif_frequence_tpl_e2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Fréquence = effectif ÷ effectif total.",
    tags: ["stat_statistique", "frequence", "template"],
    generate: () => genFrequence(2),
  },
  {
    kind: "fixed",
    id: "stat_effectif_frequence_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment calculer une fréquence… ».
    text: "Dans une classe de 20 élèves, 8 portent des lunettes. Quelle est la fréquence des élèves à lunettes ?",
    format: "short",
    expected: ["0,4", "0.4", "2/5", "4/10", "8/20", "40 %", "40%"],
    comparator: "number_equal",
    hint: "Fréquence = effectif ÷ effectif total.",
    explanation: expl("On divise l’effectif par l’effectif total : 8 ÷ 20 = 0,4. La fréquence est 0,4, soit 40 %."),
    tags: ["stat_statistique", "frequence", "short"],
  },

  /* =========================
     STAT_REPRESENTER
  ========================= */
  {
    kind: "fixed",
    id: "stat_representer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel graphique est adapté pour comparer les effectifs de plusieurs catégories ?",
    format: "qcm",
    choices: [
      "un diagramme en barres",
      "une phrase seulement",
      "une opération posée",
      "une droite graduée seule",
    ],
    expected: ["un diagramme en barres"],
    comparator: "mcq_exact",
    hint: "On veut comparer plusieurs quantités.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("Un diagramme en barres est adapté pour comparer les effectifs de plusieurs catégories.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "template",
    id: "stat_representer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le disque entier, 360°, représente l’effectif total.",
    tags: ["stat_statistique", "representation", "template"],
    // 09/10/2026 : l'angle d'un secteur circulaire (ou l'effectif à partir de l'angle).
    generate: () => genRepresenter(3),
  },
  {
    kind: "template",
    id: "stat_representer_tpl_e2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise l’effectif par le nombre de personnes que représente 1 cm.",
    tags: ["stat_statistique", "representation", "template"],
    generate: () => genRepresenter(2),
  },
  {
    kind: "fixed",
    id: "stat_representer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi un diagramme en barres aide à comparer… ».
    text: "D’après le graphique, combien d’élèves de plus ont choisi le foot plutôt que le basket ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Lis les deux barres, puis fais la différence.",
    explanation: expl("La barre du foot monte à 12, celle du basket à 7. 12 − 7 = 5. Le foot a 5 élèves de plus."),
    tags: ["stat_statistique", "representation", "canvas", "short"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Foot", value: 12 },
        { label: "Basket", value: 7 },
        { label: "Natation", value: 5 },
      ],
    }),
  },

  /* =========================
     STAT_CHOISIR_REPRESENTATION
  ========================= */
  {
    kind: "fixed",
    id: "stat_representation_choisir_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 2,
    theme: "neutral",
    text: "Pour montrer la répartition d’un total en plusieurs parties, quelle représentation peut-on choisir ?",
    format: "qcm",
    choices: [
      "un diagramme circulaire",
      "une addition posée",
      "une équation",
      "un segment sans graduation",
    ],
    expected: ["un diagramme circulaire"],
    comparator: "mcq_exact",
    hint: "On veut voir des parts d’un total.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("Un diagramme circulaire permet de visualiser la répartition d’un total en plusieurs parties.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "representation", "camembert", "qcm"],
  },
  // 08/10/2026 : « stat_representation_choisir_open_1 » (quelle barre est la
  // plus haute ?) supprimée par Frédéric : trop facile.

  /* =========================
     STAT_MOYENNE
  ========================= */
  {
    kind: "fixed",
    id: "stat_moyenne_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule la moyenne des notes : 10 ; 12 ; 14.",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Additionne les notes puis divise par 3.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("Moyenne = (10 + 12 + 14) ÷ 3 = 36 ÷ 3 = 12.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "moyenne"],
  },
  {
    kind: "fixed",
    id: "stat_moyenne_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la moyenne de 8 ; 10 ; 12 ; 14 ?",
    format: "qcm",
    choices: ["10", "11", "12", "44"],
    expected: ["11"],
    comparator: "mcq_exact",
    hint: "Additionne puis divise par 4.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("8 + 10 + 12 + 14 = 44. Puis 44 ÷ 4 = 11.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "moyenne", "qcm"],
  },
  {
    kind: "template",
    id: "stat_moyenne_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    hint: "Somme des valeurs ÷ nombre de valeurs.",
    tags: ["stat_statistique", "moyenne", "template"],
    // 09/10/2026 : 12 séries × tournures × prénoms (avant : « Calcule la moyenne de # ; # ; # »,
    // et une moyenne arrondie comme 10,67 donnée pour exacte). Voir genMoyenne.
    generate: () => genMoyenne(3),
  },
  {
    kind: "template",
    id: "stat_moyenne_tpl_e2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne toutes les valeurs, puis divise par le nombre de valeurs.",
    tags: ["stat_statistique", "moyenne", "template"],
    generate: () => genMoyenne(2),
  },
  {
    kind: "fixed",
    id: "stat_moyenne_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment calculer la moyenne de 10 ; 12 ; 14 »
    // (doublon de stat_moyenne_fixed_1 : autres nombres).
    text: "Calcule la moyenne de 7 ; 11 ; 15.",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Additionne les trois nombres, puis divise par 3.",
    explanation: expl("On additionne : 7 + 11 + 15 = 33. Il y a 3 valeurs : 33 ÷ 3 = 11. La moyenne est 11."),
    tags: ["stat_statistique", "moyenne", "short"],
  },

  /* =========================
     STAT_DEFIS
  ========================= */
  {
    kind: "fixed",
    id: "stat_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, une classe relève le nombre de déchets ramassés : plastique 12, verre 8, papier 10. Quel est l’effectif total ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Additionne les trois effectifs.",
    explanation:
      "Définition : les statistiques servent à organiser et résumer une série de données.\n\n" +
          "Méthode : on lit le tableau ou le graphique, puis on calcule l’indicateur demandé.\n\nCalcul : " +
          ("L’effectif total est 12 + 8 + 10 = 30.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement les données.",
    tags: ["stat_statistique", "defi", "reunion"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Plastique", value: 12 },
        { label: "Verre", value: 8 },
        { label: "Papier", value: 10 },
      ],
    }),
  },
  {
    kind: "fixed",
    id: "stat_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « … est 36. Explique son erreur. »
    text: "Un élève dit : « La moyenne de 10 ; 12 ; 14 est 36. » Quelle est la bonne moyenne ?",
    format: "qcm",
    choices: ["12", "36", "18"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "36 est la somme, pas la moyenne.",
    explanation: expl("L’élève a seulement additionné : 10 + 12 + 14 = 36. Il faut ensuite diviser par le nombre de valeurs, 3 : 36 ÷ 3 = 12."),
    tags: ["stat_statistique", "defi", "qcm", "erreur"],
  },
  {
    kind: "template",
    id: "stat_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La somme doit valoir la moyenne voulue × le nombre de valeurs.",
    tags: ["stat_statistique", "defi", "template"],
    // 09/10/2026 : la valeur manquante pour atteindre une moyenne (avant : une
    // fréquence arrondie, 0,33 pour 7 ÷ 21, donnée pour exacte).
    generate: () => genValeurManquante(randomChoice([4, 5])),
  },
  {
    kind: "template",
    id: "stat_defi_tpl_e4",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule la moyenne de chacun, puis compare.",
    tags: ["stat_statistique", "defi", "template"],
    generate: () => genComparerMoyennes(),
  },

  /* =========================
     TOP-UP — STAT_ORGANISER_DONNEES
  ========================= */
  {
    kind: "fixed",
    id: "stat_donnee_organiser_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 1,
    theme: "neutral",
    text: "On veut savoir quel animal de compagnie est le plus fréquent dans la classe. Que faut-il faire en premier ?",
    format: "qcm",
    choices: [
      "compter combien d’élèves ont chaque animal",
      "mesurer la taille des animaux",
      "demander l’âge du professeur",
      "dessiner un graphique au hasard",
    ],
    expected: ["compter combien d’élèves ont chaque animal"],
    comparator: "mcq_exact",
    hint: "On organise d’abord les effectifs.",
    explanation: expl("On compte l’effectif de chaque catégorie avant toute représentation."),
    tags: ["stat_statistique", "organiser", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_donnee_organiser_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 2,
    theme: "neutral",
    text: "Comment appelle-t-on le nombre de fois qu’une valeur apparaît dans une série de données ?",
    format: "qcm",
    choices: ["l’effectif", "la moyenne", "la fréquence", "l’étendue"],
    expected: ["l’effectif"],
    comparator: "mcq_exact",
    hint: "C’est un comptage.",
    explanation: expl("Le nombre de fois qu’une valeur apparaît s’appelle l’effectif de cette valeur."),
    tags: ["stat_statistique", "organiser", "qcm", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "stat_donnee_organiser_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 2,
    theme: "neutral",
    text: "On note les couleurs préférées : rouge, bleu, rouge, vert, bleu, rouge. Quel est l’effectif du rouge ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Compte combien de fois « rouge » apparaît.",
    explanation: expl("« Rouge » apparaît 3 fois : son effectif est 3."),
    tags: ["stat_statistique", "organiser", "effectif"],
  },
  {
    kind: "fixed",
    id: "stat_donnee_organiser_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un tableau d’effectifs, que représente la dernière case « Total » ?",
    format: "qcm",
    choices: [
      "la somme de tous les effectifs",
      "la plus grande valeur",
      "la moyenne des effectifs",
      "le nombre de catégories",
    ],
    expected: ["la somme de tous les effectifs"],
    comparator: "mcq_exact",
    hint: "On additionne toutes les catégories.",
    explanation: expl("Le total est la somme de tous les effectifs, c’est-à-dire le nombre d’individus observés."),
    tags: ["stat_statistique", "organiser", "qcm", "total"],
  },
  {
    kind: "fixed",
    id: "stat_donnee_organiser_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique l’intérêt d’un tableau d’effectifs… ».
    text: "Notes de 8 élèves : 12 ; 15 ; 12 ; 10 ; 15 ; 12 ; 18 ; 10. Combien d’élèves ont eu 12 ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Compte les 12 un par un.",
    explanation: expl("On compte les 12 de la liste : il y en a 3. Dans un tableau d’effectifs, on lirait directement : 10 → 2, 12 → 3, 15 → 2, 18 → 1."),
    tags: ["stat_statistique", "organiser", "short"],
  },
  {
    kind: "template",
    id: "stat_donnee_organiser_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte combien de fois la valeur demandée apparaît.",
    tags: ["stat_statistique", "organiser", "template"],
    // 09/10/2026 : 15 enquêtes × tournures × prénoms (voir genOrganiser).
    generate: () => genOrganiser(2),
  },
  {
    kind: "template",
    id: "stat_donnee_organiser_tpl_e1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte la réponse demandée, une par une.",
    tags: ["stat_statistique", "organiser", "template"],
    generate: () => genOrganiser(1),
  },
  {
    kind: "template",
    id: "stat_donnee_organiser_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte chaque valeur de la série.",
    tags: ["stat_statistique", "organiser", "template"],
    // 09/10/2026 : une série de nombres à dépouiller (effectif, « au moins », la plus fréquente).
    generate: () => genOrganiser(3),
  },
  {
    kind: "fixed",
    id: "stat_donnee_organiser_qcm_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_donnee_organiser",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase décrit le mieux une « série statistique » ?",
    format: "qcm",
    choices: [
      "un ensemble de données recueillies sur un caractère",
      "une seule mesure isolée",
      "un calcul de moyenne",
      "un diagramme circulaire",
    ],
    expected: ["un ensemble de données recueillies sur un caractère"],
    comparator: "mcq_exact",
    hint: "C’est l’ensemble des observations.",
    explanation: expl("Une série statistique est l’ensemble des données recueillies sur un même caractère."),
    tags: ["stat_statistique", "organiser", "qcm", "vocabulaire"],
  },

  /* =========================
     TOP-UP — STAT_LIRE_TABLEAU
  ========================= */
  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Tableau des moyens de transport : bus 9, vélo 5, marche 7. Quel est l’effectif du vélo ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Lis la valeur de la colonne « vélo ».",
    explanation: expl("L’effectif du vélo se lit directement : 5."),
    tags: ["stat_statistique", "tableau", "lecture"],
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Tableau : roman 14, BD 20, documentaire 6. Quel genre a le plus grand effectif ?",
    format: "qcm",
    choices: ["BD", "roman", "documentaire", "aucun"],
    expected: ["BD"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre.",
    explanation: expl("Le plus grand effectif est 20 : c’est la BD."),
    tags: ["stat_statistique", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Tableau : lundi 12, mardi 9, jeudi 12, vendredi 7. Combien de jours ont un effectif de 12 ?",
    format: "qcm",
    choices: ["2", "1", "3", "12"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Compte les cases égales à 12.",
    explanation: expl("Deux jours (lundi et jeudi) ont un effectif de 12."),
    tags: ["stat_statistique", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Tableau : foot 10, basket 6, hand 4, total 25. Quel est l’effectif manquant (autre sport) ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Total moins la somme des effectifs connus.",
    explanation: expl("10 + 6 + 4 = 20. Effectif manquant = 25 − 20 = 5."),
    tags: ["stat_statistique", "tableau", "manquant"],
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment retrouver l’effectif total… ».
    text: "Animal préféré : chat 7 élèves, chien 9 élèves, poisson 4 élèves, lapin 5 élèves. Quel est l’effectif total ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "Additionne tous les effectifs.",
    explanation: expl("On additionne tous les effectifs : 7 + 9 + 4 + 5 = 25. L’effectif total est 25."),
    tags: ["stat_statistique", "tableau", "short"],
  },
  {
    kind: "template",
    id: "stat_lire_tableau_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis directement la valeur demandée.",
    tags: ["stat_statistique", "tableau", "template"],
    // 09/10/2026 : un vrai tableau, enquêtes × tournures × prénoms (voir genLireTableau).
    generate: () => genLireTableau(randomChoice([1, 2] as const)),
  },
  {
    kind: "template",
    id: "stat_lire_tableau_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Total connu moins la somme des autres.",
    tags: ["stat_statistique", "tableau", "template", "manquant"],
    // 09/10/2026 : « n'ont pas répondu », case manquante, la plus / moins choisie.
    generate: () => genLireTableau(3),
  },

  /* =========================
     TOP-UP — STAT_LIRE_GRAPHIQUE
  ========================= */
  {
    kind: "fixed",
    id: "stat_lire_graphique_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "D’après le graphique, quelle activité est la moins choisie ?",
    format: "qcm",
    choices: ["Lecture", "Jeux", "Musique", "Sport"],
    expected: ["Musique"],
    comparator: "mcq_exact",
    hint: "Cherche la barre la plus basse.",
    explanation: expl("La barre la plus basse correspond à la musique : c’est l’activité la moins choisie."),
    tags: ["stat_statistique", "graphique", "canvas", "qcm"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Lecture", value: 9 },
        { label: "Jeux", value: 13 },
        { label: "Musique", value: 4 },
        { label: "Sport", value: 11 },
      ],
      highlightIndex: 2,
    }),
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "D’après le graphique, quel est l’effectif du « Sport » ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Lis la hauteur de la barre « Sport ».",
    explanation: expl("La barre « Sport » atteint la valeur 11."),
    tags: ["stat_statistique", "graphique", "canvas", "lecture"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Lecture", value: 9 },
        { label: "Jeux", value: 13 },
        { label: "Musique", value: 4 },
        { label: "Sport", value: 11 },
      ],
      highlightIndex: 3,
    }),
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "D’après le graphique, combien d’élèves ont été interrogés au total ?",
    format: "short",
    expected: ["37"],
    comparator: "number_equal",
    hint: "Additionne toutes les barres.",
    explanation: expl("9 + 13 + 4 + 11 = 37 élèves au total."),
    tags: ["stat_statistique", "graphique", "canvas", "total"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Lecture", value: 9 },
        { label: "Jeux", value: 13 },
        { label: "Musique", value: 4 },
        { label: "Sport", value: 11 },
      ],
    }),
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un diagramme en bâtons, que représente la hauteur d’un bâton ?",
    format: "qcm",
    choices: [
      "l’effectif de la catégorie",
      "le nom de la catégorie",
      "la moyenne de la série",
      "le nombre de catégories",
    ],
    expected: ["l’effectif de la catégorie"],
    comparator: "mcq_exact",
    hint: "Plus c’est haut, plus il y en a.",
    explanation: expl("La hauteur d’un bâton est proportionnelle à l’effectif de la catégorie."),
    tags: ["stat_statistique", "graphique", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment lire l’effectif d’une catégorie… ».
    text: "D’après le graphique, combien d’élèves ont choisi la natation ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Regarde le haut de la barre « Natation ».",
    explanation: expl("On repère le haut de la barre « Natation », puis on lit la valeur : 6. Six élèves ont choisi la natation."),
    tags: ["stat_statistique", "graphique", "canvas", "short"],
    canvas: statGraphCanvas({
      graphType: "barres",
      data: [
        { label: "Foot", value: 9 },
        { label: "Natation", value: 6 },
        { label: "Danse", value: 11 },
      ],
      highlightIndex: 1,
    }),
  },
  {
    kind: "template",
    id: "stat_lire_graphique_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la hauteur de la barre demandée.",
    tags: ["stat_statistique", "graphique", "canvas", "template"],
    // 09/10/2026 : enquêtes × tournures × prénoms (voir genLireGraphique).
    generate: () => genLireGraphique(2),
  },
  {
    kind: "template",
    id: "stat_lire_graphique_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les hauteurs.",
    tags: ["stat_statistique", "graphique", "canvas", "template", "total"],
    // 09/10/2026 : total, écart, somme de deux barres (voir genLireGraphique).
    generate: () => genLireGraphique(3),
  },

  /* =========================
     TOP-UP — STAT_EFFECTIF_FREQUENCE
  ========================= */
  {
    kind: "fixed",
    id: "stat_effectif_frequence_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Sur 50 élèves, 30 mangent à la cantine. Quelle est la fréquence en pourcentage ?",
    format: "qcm",
    choices: ["60%", "30%", "50%", "20%"],
    expected: ["60%"],
    comparator: "mcq_exact",
    hint: "30 ÷ 50 puis ×100.",
    explanation: expl("30 ÷ 50 = 0,6 = 60 %."),
    tags: ["stat_statistique", "frequence", "qcm", "pourcentage"],
  },
  {
    kind: "fixed",
    id: "stat_effectif_frequence_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Sur 40 élèves, 10 font de l’allemand. Quelle est la fréquence (écriture décimale) ?",
    format: "short",
    expected: ["0,25", "0.25"],
    comparator: "number_equal",
    hint: "10 ÷ 40.",
    explanation: expl("Fréquence = 10 ÷ 40 = 0,25."),
    tags: ["stat_statistique", "frequence"],
  },
  {
    kind: "fixed",
    id: "stat_effectif_frequence_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "Une fréquence vaut toujours :",
    format: "qcm",
    choices: [
      "un nombre entre 0 et 1",
      "un nombre plus grand que 1",
      "un nombre entier",
      "un nombre négatif",
    ],
    expected: ["un nombre entre 0 et 1"],
    comparator: "mcq_exact",
    hint: "C’est une part d’un total.",
    explanation: expl("Une fréquence est un quotient effectif ÷ total : elle est toujours comprise entre 0 et 1."),
    tags: ["stat_statistique", "frequence", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_effectif_frequence_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi une fréquence ne peut pas dépasser 1 ».
    text: "Lequel de ces nombres ne peut PAS être une fréquence ?",
    format: "qcm",
    choices: ["1,5", "0,5", "1", "0"],
    expected: ["1,5"],
    comparator: "mcq_exact",
    hint: "Une part ne peut pas dépasser le total.",
    explanation: expl("Fréquence = effectif ÷ total. L’effectif ne dépasse jamais le total, donc la fréquence est entre 0 et 1. 0 (personne) et 1 (tout le monde) sont possibles. 1,5 est plus grand que 1 : impossible."),
    tags: ["stat_statistique", "frequence", "qcm"],
  },
  {
    kind: "template",
    id: "stat_effectif_frequence_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence ×100 donne le pourcentage.",
    tags: ["stat_statistique", "frequence", "template", "pourcentage"],
    // 09/10/2026 : enquêtes × tournures × prénoms (voir genFrequence).
    generate: () => genFrequence(3),
  },
  {
    kind: "template",
    id: "stat_effectif_frequence_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_effectif_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence = effectif ÷ total.",
    tags: ["stat_statistique", "frequence", "template"],
    // 09/10/2026 : enquêtes × tournures × prénoms ; avant, 3 ÷ 16 = 0,1875 dépassait deux décimales.
    generate: () => genFrequence(randomChoice([2, 3] as const)),
  },

  /* =========================
     TOP-UP — STAT_REPRESENTER
  ========================= */
  {
    kind: "fixed",
    id: "stat_representer_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour représenter l’évolution d’une température heure par heure, quel graphique est le plus adapté ?",
    format: "qcm",
    choices: [
      "un graphique avec des points reliés (courbe)",
      "un diagramme circulaire",
      "un simple tableau de mots",
      "une équation",
    ],
    expected: ["un graphique avec des points reliés (courbe)"],
    comparator: "mcq_exact",
    hint: "On suit une évolution dans le temps.",
    explanation: expl("Pour une évolution dans le temps, on utilise un graphique de points reliés (une courbe)."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representer_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un diagramme en barres, deux catégories ont le même effectif. Que peut-on dire de leurs barres ?",
    format: "qcm",
    choices: [
      "elles ont la même hauteur",
      "elles ont des couleurs imposées",
      "l’une doit être deux fois plus haute",
      "elles sont forcément côte à côte",
    ],
    expected: ["elles ont la même hauteur"],
    comparator: "mcq_exact",
    hint: "Même effectif = même hauteur.",
    explanation: expl("La hauteur représente l’effectif : deux effectifs égaux donnent des barres de même hauteur."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un diagramme en barres, 1 carreau = 2 élèves. Une barre fait 5 carreaux. Combien d’élèves représente-t-elle ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Multiplie les carreaux par l’échelle.",
    explanation: expl("5 carreaux × 2 élèves = 10 élèves."),
    tags: ["stat_statistique", "representation", "echelle"],
  },
  {
    kind: "fixed",
    id: "stat_representer_qcm_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel élément est indispensable sur un diagramme en barres pour qu’il soit lisible ?",
    format: "qcm",
    choices: [
      "une graduation sur l’axe vertical",
      "un titre en couleur",
      "une bordure épaisse",
      "un fond gris",
    ],
    expected: ["une graduation sur l’axe vertical"],
    comparator: "mcq_exact",
    hint: "Sans graduation on ne peut pas lire les valeurs.",
    explanation: expl("Une graduation sur l’axe vertical est indispensable pour lire les effectifs."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representer_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique le rôle de l’échelle… ».
    text: "Sur un diagramme en barres, 1 carreau représente 2 élèves. La barre du foot mesure 7 carreaux. Combien d’élèves ont choisi le foot ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Chaque carreau vaut 2 élèves.",
    explanation: expl("L’échelle dit : 1 carreau = 2 élèves. 7 carreaux = 7 × 2 = 14 élèves."),
    tags: ["stat_statistique", "representation", "short"],
  },
  {
    kind: "template",
    id: "stat_representer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le disque entier, 360°, représente l’effectif total.",
    tags: ["stat_statistique", "representation", "template"],
    // 09/10/2026 : angle d'un secteur circulaire (avant : la barre de la réponse surlignée).
    generate: () => genRepresenter(3),
  },
  {
    kind: "template",
    id: "stat_representer_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde ce que représente 1 cm, ou 1 degré du disque.",
    tags: ["stat_statistique", "representation", "template", "echelle"],
    // 09/10/2026 : hauteur d'une barre ou angle d'un secteur, en situation.
    generate: () => genRepresenter(randomChoice([2, 3] as const)),
  },

  /* =========================
     TOP-UP — STAT_CHOISIR_REPRESENTATION
  ========================= */
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 2,
    theme: "neutral",
    text: "On veut comparer le nombre d’élèves dans 4 clubs. Quelle représentation est la plus simple à lire ?",
    format: "qcm",
    choices: [
      "un diagramme en barres",
      "une longue phrase",
      "une équation",
      "une droite graduée seule",
    ],
    expected: ["un diagramme en barres"],
    comparator: "mcq_exact",
    hint: "On compare des effectifs.",
    explanation: expl("Pour comparer des effectifs entre catégories, le diagramme en barres est le plus lisible."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 2,
    theme: "neutral",
    text: "Pour visualiser la part de chaque matière dans une journée de 24 h, on choisit :",
    format: "qcm",
    choices: [
      "un diagramme circulaire",
      "un diagramme en bâtons isolés",
      "une simple liste",
      "une équation",
    ],
    expected: ["un diagramme circulaire"],
    comparator: "mcq_exact",
    hint: "On veut des parts d’un tout.",
    explanation: expl("Le diagramme circulaire montre bien la part de chaque élément dans un total."),
    tags: ["stat_statistique", "representation", "camembert", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle représentation est la PLUS adaptée pour suivre la taille d’une plante semaine après semaine ?",
    format: "qcm",
    choices: [
      "une courbe (points reliés)",
      "un diagramme circulaire",
      "un tableau de couleurs",
      "un diagramme circulaire double",
    ],
    expected: ["une courbe (points reliés)"],
    comparator: "mcq_exact",
    hint: "On suit une évolution.",
    explanation: expl("Pour une évolution au cours du temps, la courbe (points reliés) est la plus adaptée."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "Un diagramme circulaire complet représente toujours :",
    format: "qcm",
    choices: ["100 % du total", "la moyenne", "l’effectif le plus grand", "50 % du total"],
    expected: ["100 % du total"],
    comparator: "mcq_exact",
    hint: "Le disque entier = le tout.",
    explanation: expl("Le disque entier d’un diagramme circulaire représente 100 % du total, soit 360°."),
    tags: ["stat_statistique", "representation", "camembert", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 2,
    theme: "neutral",
    text: "Quel outil organise les données mais ne les « dessine » pas ?",
    format: "qcm",
    choices: [
      "un tableau d’effectifs",
      "un diagramme en barres",
      "un diagramme circulaire",
      "une courbe",
    ],
    expected: ["un tableau d’effectifs"],
    comparator: "mcq_exact",
    hint: "Lignes et colonnes, pas de dessin.",
    explanation: expl("Le tableau d’effectifs organise les données sans représentation graphique."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_7",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "On a les notes de toute une classe. Quelle représentation permet de comparer rapidement le nombre d’élèves par note ?",
    format: "qcm",
    choices: [
      "un diagramme en barres",
      "une équation",
      "une phrase descriptive",
      "une seule moyenne",
    ],
    expected: ["un diagramme en barres"],
    comparator: "mcq_exact",
    hint: "Une barre par note.",
    explanation: expl("Un diagramme en barres (une barre par note) permet de comparer rapidement les effectifs."),
    tags: ["stat_statistique", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique dans quel cas un diagramme circulaire est préférable… ».
    text: "40 élèves ont répondu. Sur le diagramme circulaire, le foot occupe un quart du disque. Combien d’élèves ont choisi le foot ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Un quart du disque, c’est un quart des élèves.",
    explanation: expl("Le disque entier, ce sont les 40 élèves. Un quart du disque : 40 ÷ 4 = 10 élèves. Le diagramme circulaire montre la part de chaque catégorie dans le total."),
    tags: ["stat_statistique", "representation", "camembert", "short"],
  },
  {
    kind: "fixed",
    id: "stat_representation_choisir_qcm_8",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "On veut montrer la répartition des budgets (loisirs, nourriture, transport) d’une famille. Quelle représentation choisir ?",
    format: "qcm",
    choices: [
      "un diagramme circulaire",
      "une courbe d’évolution",
      "une seule moyenne",
      "une droite graduée",
    ],
    expected: ["un diagramme circulaire"],
    comparator: "mcq_exact",
    hint: "On montre des parts d’un budget total.",
    explanation: expl("Pour montrer la répartition (les parts) d’un total, on choisit un diagramme circulaire."),
    tags: ["stat_statistique", "representation", "camembert", "qcm"],
  },

  /* =========================
     TOP-UP — STAT_MOYENNE
  ========================= */
  {
    kind: "fixed",
    id: "stat_moyenne_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule la moyenne de 6 et 10.",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "(6 + 10) ÷ 2.",
    explanation: expl("Moyenne = (6 + 10) ÷ 2 = 16 ÷ 2 = 8."),
    tags: ["stat_statistique", "moyenne"],
  },
  {
    kind: "fixed",
    id: "stat_moyenne_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "La moyenne de 5 ; 5 ; 5 ; 5 vaut :",
    format: "qcm",
    choices: ["5", "20", "4", "10"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Toutes les valeurs sont égales.",
    explanation: expl("Quand toutes les valeurs sont égales à 5, la moyenne vaut 5."),
    tags: ["stat_statistique", "moyenne", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_moyenne_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer une moyenne, par quel nombre faut-il diviser la somme des valeurs ?",
    format: "qcm",
    choices: [
      "le nombre de valeurs",
      "la plus grande valeur",
      "toujours par 2",
      "la plus petite valeur",
    ],
    expected: ["le nombre de valeurs"],
    comparator: "mcq_exact",
    hint: "On divise par le nombre de données.",
    explanation: expl("La moyenne est la somme des valeurs divisée par le nombre de valeurs."),
    tags: ["stat_statistique", "moyenne", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_moyenne_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi la moyenne est comprise entre la plus petite et la plus grande valeur ».
    text: "Quelle est la moyenne de 8 ; 12 ; 13 ?",
    format: "qcm",
    // Frédéric (08/10) : choix 11, 10, 9, 13.
    choices: ["11", "10", "9", "13"],
    expected: ["11"],
    comparator: "mcq_exact",
    hint: "Additionne les trois notes, puis divise par 3.",
    explanation: expl("8 + 12 + 13 = 33, puis 33 ÷ 3 = 11. Vérification : 11 est bien entre la plus petite valeur (8) et la plus grande (13)."),
    tags: ["stat_statistique", "moyenne", "qcm"],
  },
  {
    kind: "template",
    id: "stat_moyenne_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    hint: "Somme des valeurs ÷ nombre de valeurs (ou ÷ effectif total dans un tableau).",
    tags: ["stat_statistique", "moyenne", "template"],
    // 09/10/2026 : séries en situation, ou moyenne pondérée lue dans un tableau.
    generate: () => genMoyenne(3),
  },
  {
    kind: "template",
    id: "stat_moyenne_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 4,
    theme: "neutral",
    hint: "La somme doit valoir la moyenne voulue × le nombre de valeurs.",
    tags: ["stat_statistique", "moyenne", "template"],
    // 09/10/2026 : la valeur qui manque pour atteindre une moyenne (voir genValeurManquante).
    generate: () => genMoyenne(4),
  },

  /* =========================
     TOP-UP — STAT_DEFIS
  ========================= */
  {
    kind: "fixed",
    id: "stat_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Une classe de 20 élèves a une moyenne de 12 à un contrôle. Quelle est la somme de toutes les notes ?",
    format: "short",
    expected: ["240"],
    comparator: "number_equal",
    hint: "Moyenne × effectif = somme.",
    explanation: expl("Somme = moyenne × effectif = 12 × 20 = 240."),
    tags: ["stat_statistique", "defi", "moyenne"],
  },
  {
    kind: "fixed",
    id: "stat_defi_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un diagramme circulaire, une part occupe la moitié du disque. Quel pourcentage représente-t-elle ?",
    format: "qcm",
    choices: ["50%", "25%", "100%", "180%"],
    expected: ["50%"],
    comparator: "mcq_exact",
    hint: "La moitié de 100 %.",
    explanation: expl("La moitié du disque correspond à 50 % du total (180°)."),
    tags: ["stat_statistique", "defi", "qcm", "camembert"],
  },
  {
    kind: "fixed",
    id: "stat_defi_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "neutral",
    text: "La moyenne de 4 nombres est 10. Trois d’entre eux valent 8, 12 et 9. Combien vaut le quatrième ?",
    format: "qcm",
    choices: ["11", "10", "9", "13"],
    expected: ["11"],
    comparator: "mcq_exact",
    hint: "Somme totale = 40.",
    explanation: expl("Somme = 10 × 4 = 40. 8 + 12 + 9 = 29. Quatrième = 40 − 29 = 11."),
    tags: ["stat_statistique", "defi", "qcm", "moyenne"],
  },
  {
    kind: "fixed",
    id: "stat_defi_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Ajouter une note de 0 ne change pas la moyenne. Explique pourquoi c’est faux ».
    text: "Léa a eu 10 et 14 : sa moyenne est 12. Elle a ensuite un 0. Quelle est sa nouvelle moyenne ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Il y a maintenant 3 notes.",
    explanation: expl("La somme ne change pas : 10 + 14 + 0 = 24. Mais il y a 3 notes : 24 ÷ 3 = 8. Le 0 fait baisser la moyenne de 12 à 8."),
    tags: ["stat_statistique", "defi", "short", "erreur"],
  },
  {
    kind: "template",
    id: "stat_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Multiplie chaque valeur par son effectif, additionne, puis divise par l’effectif total.",
    tags: ["stat_statistique", "defi", "template"],
    // 09/10/2026 : moyenne pondérée lue sur un diagramme en bâtons (avant : une
    // moyenne de trois températures, souvent arrondie et donnée pour exacte).
    generate: () => genMoyenneDiagramme(),
  },
  {
    kind: "fixed",
    id: "stat_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un diagramme circulaire de 360°, une catégorie occupe un angle de 90°. Quel pourcentage du total représente-t-elle ?",
    format: "qcm",
    choices: ["25%", "50%", "90%", "10%"],
    expected: ["25%"],
    comparator: "mcq_exact",
    hint: "90° sur 360°.",
    explanation: expl("90 ÷ 360 = 0,25 = 25 % du total."),
    tags: ["stat_statistique", "defi", "qcm", "camembert"],
  },
  {
    kind: "template",
    id: "stat_defi_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Retrouve d’abord la somme des premières valeurs : moyenne × nombre de valeurs.",
    tags: ["stat_statistique", "defi", "template"],
    // 09/10/2026 : la nouvelle moyenne après une valeur de plus.
    generate: () => genNouvelleMoyenne(),
  },

  /* ===== STAT_REPRESENTATION_CHOISIR =====
     Ce micro n'avait que des items figés : au dixième passage, l'élève
     retombait forcément sur une question déjà vue. Deux générateurs le
     réapprovisionnent, l'un pour choisir, l'autre pour justifier. */
  {
    kind: "template",
    id: "stat_representation_choisir_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 3,
    theme: "neutral",
    hint: "Des parts d’un tout : le camembert. Une comparaison : les barres. Une évolution : la ligne.",
    tags: ["stat_statistique", "representation", "template"],
    // 09/10/2026 : 12 besoins × tournures × prénoms (voir genChoisirRep).
    generate: () => genChoisirRep(3),
  },
  {
    kind: "template",
    id: "stat_representation_choisir_tpl_e2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 2,
    theme: "neutral",
    hint: "Des parts d’un tout : le diagramme circulaire. Une comparaison : les barres. Une évolution : la courbe.",
    tags: ["stat_statistique", "representation", "template"],
    generate: () => genChoisirRep(2),
  },
  {
    kind: "template",
    id: "stat_representation_choisir_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_representation_choisir",
    difficulty: 4,
    theme: "neutral",
    hint: "Que faut-il faire voir : des parts, une comparaison, ou une évolution ?",
    tags: ["stat_statistique", "representation", "qcm", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Quelle représentation choisis-tu, et pourquoi ? »
    // corrigé par un mot-clé. Désormais : QCM à trois graphiques, les mêmes trois situations.
    // 09/10/2026 : lire un diagramme circulaire (le pourcentage d'un secteur).
    generate: () => genChoisirRep(4),
  },
];