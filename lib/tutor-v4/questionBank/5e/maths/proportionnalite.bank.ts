// Proportionnalité (5e) — deux notions depuis le 04/08/2026 :
// prop_proportionnalite et prop_ratio_pourcentage (ratios, pourcentages).
// ⚠️ C'est le microId de chaque item qui fait foi, PAS le commentaire de
// section au-dessus : les items déplacés sont restés à leur place dans le
// fichier pour garder leur id, et donc l'historique des réponses des élèves.

import type { TutorBankItemV4, TableauProportionnaliteCanvasData } from "@/lib/tutor-v4/types";
import { PRENOMS, de, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatEuro(n: number) {
  return [`${n}`, `${n}€`, `${n} €`];
}


function expl(calcul: string) {
  return (
    "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
    "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : la valeur obtenue respecte la proportionnalité."
  );
}

/* =========================================================
   SITUATIONS × TOURNURES × PRÉNOMS — 09/10/2026
   ---------------------------------------------------------
   ⛔ POURQUOI. Mesuré le 09/10 : 10 à 12 squelettes par micro, 13 à 18
   répétitions sur 20 questions. Les gabarits changeaient les NOMBRES, pas
   la PHRASE (« # objets coûtent # € »). Chaque gabarit compose désormais une
   SITUATION (17 contextes, un seul réunionnais) × une TOURNURE × un PRÉNOM.
   Correcteurs : correcteurs/proportionnalite.ts (ils relisent les nombres
   du texte AVEC le mot qui les suit : « 3 kg », « 12 € », et le tableau).
   ⚠️ Dans une situation, chaque nombre est suivi de SON unité (uA ou uB),
   toujours écrite de la même façon : le correcteur s'en sert.
   ========================================================= */

function rint(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
const r2 = (x: number) => Math.round(x * 100) / 100;
/** Nombre écrit à la française ; un prix non entier garde deux décimales (« 7,50 »). */
function nb(x: number, u = "") {
  const v = r2(x);
  if (Number.isInteger(v)) return String(v);
  return (u === "€" ? v.toFixed(2) : String(v)).replace(".", ",");
}
const MESURES = new Set(["€", "kg", "g", "km", "m", "cm", "L", "mL", "h", "min", "m²"]);
/** Une valeur avec son unité si c'est une mesure (« 12 € », « 4 h ») ; un dénombrement sans. */
const avecU = (x: number, u = "") => (MESURES.has(u) ? `${nb(x, u)} ${u}` : nb(x, u));
const attendu = (x: number, u = "") => [avecU(x, u)];
const il = (p: Prenom) => (p.f ? "elle" : "il");
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const prenom = () => randomChoice(PRENOMS);
function deuxPrenoms(): [Prenom, Prenom] {
  const p = prenom();
  let q = prenom();
  while (q.nom === p.nom) q = prenom();
  return [p, q];
}
/** « que » + proposition, avec l'élision (« qu’Inès », « qu’en 3 h »). */
const que = (s: string) => (/^[aeiouyàâéèêîôh]/i.test(s) ? `qu’${s}` : `que ${s}`);

/** La bonne réponse et trois pièges distincts, positifs, différents d'elle. */
function choixNombres(bon: number, pieges: number[], u = "", ecrire = (v: number) => avecU(v, u)): string[] {
  const vus = new Set([r2(bon)]);
  const leurres: number[] = [];
  const pas = bon >= 100 ? 10 : bon >= 20 ? 2 : 1;
  const secours = [pas, -pas, 2 * pas, -2 * pas, 3 * pas, 5 * pas];
  for (const x of [...shuffle(pieges), ...secours.map((e) => bon + e)]) {
    const v = r2(x);
    if (v > 0 && !vus.has(v) && leurres.length < 3) {
      vus.add(v);
      leurres.push(v);
    }
  }
  return shuffle([bon, ...leurres].map(ecrire));
}

function tableauCanvas(rowLabels: string[], values: string[][]): TableauProportionnaliteCanvasData {
  const missing: Array<{ row: number; col: number }> = [];
  values.forEach((r, i) => r.forEach((v, j) => v === "?" && missing.push({ row: i, col: j })));
  return {
    kind: "tableau_proportionnalite",
    rows: values.length,
    cols: values[0]?.length ?? 0,
    rowLabels,
    values,
    missing,
    highlightedCells: missing,
    display: { showRowLabels: true, showColLabels: true, showMissing: true, showGrid: true },
  };
}

function explique(methode: string, calcul: string, conclusion: string) {
  return (
    "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre en multipliant toujours par le même nombre.\n\n" +
    `Méthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`
  );
}

/** Une situation : grandeur A (n, unité uA) → grandeur B (m = n × k, unité uB). */
type SituationProp = {
  uA: string;
  uB: string;
  nA: [number, number];
  /** valeur pour une unité, entière */
  k: number[];
  /** valeurs pour une unité décimales (à partir de 3 étoiles) */
  kd: number[];
  /** « Inès paie 12 € pour 3 kg de pommes » */
  lien: (p: Prenom, n: string, m: string) => string;
  /** l'autre ordre : « pour 3 kg de pommes, Inès paie 12 € » */
  lien2: (p: Prenom, n: string, m: string) => string;
  /** question qui demande B pour n */
  demB: (p: Prenom, n: string) => string;
  /** question qui demande A pour m */
  demA: (p: Prenom, m: string) => string;
  /** groupe nominal de B pour n : « le prix de 5 kg de pommes » */
  valB: (n: string) => string;
  /** la valeur pour une unité : « le prix d’un kilogramme de pommes » */
  unite: string;
  fem: boolean;
  labelA: string;
  labelB: string;
  /** relevé court : « 3 kg pour 12 € » */
  couple: (n: string, m: string) => string;
  /** présentation sans hypothèse : « Inès relève le prix des pommes au marché » */
  intro: (p: Prenom) => string;
  /** ce que donne le tableau : « le prix des pommes selon leur masse » */
  sujet: string;
  qProp: string;
};

const SITUATIONS_PROP: SituationProp[] = [
  {
    uA: "kg", uB: "€", nA: [1, 9], k: [2, 3, 4], kd: [1.5, 2.5, 3.5],
    lien: (p, n, m) => `${p.nom} paie ${m} € pour ${n} kg de pommes`,
    lien2: (p, n, m) => `pour ${n} kg de pommes, ${p.nom} paie ${m} €`,
    demB: (p, n) => `Combien paiera-t-${il(p)} pour ${n} kg de pommes ?`,
    demA: (p, m) => `Combien de kilogrammes de pommes peut-${il(p)} acheter avec ${m} € ?`,
    valB: (n) => `le prix de ${n} kg de pommes`,
    unite: "le prix d’un kilogramme de pommes", fem: false,
    labelA: "Masse de pommes (kg)", labelB: "Prix (€)",
    couple: (n, m) => `${n} kg pour ${m} €`,
    intro: (p) => `${p.nom} relève le prix des pommes au marché`,
    sujet: "le prix des pommes selon leur masse",
    qProp: "Le prix est-il proportionnel à la masse de pommes ?",
  },
  {
    uA: "cahiers", uB: "€", nA: [2, 12], k: [2, 3, 4], kd: [1.2, 1.5, 2.5],
    lien: (p, n, m) => `${p.nom} paie ${m} € pour ${n} cahiers identiques`,
    lien2: (p, n, m) => `pour ${n} cahiers identiques, ${p.nom} paie ${m} €`,
    demB: (_p, n) => `Combien coûtent ${n} cahiers ?`,
    demA: (p, m) => `Combien de cahiers peut-${il(p)} acheter avec ${m} € ?`,
    valB: (n) => `le prix de ${n} cahiers`,
    unite: "le prix d’un cahier", fem: false,
    labelA: "Nombre de cahiers", labelB: "Prix (€)",
    couple: (n, m) => `${n} cahiers pour ${m} €`,
    intro: (p) => `${p.nom} compare les prix des cahiers à la papeterie`,
    sujet: "le prix des cahiers selon leur nombre",
    qProp: "Le prix payé est-il proportionnel au nombre de cahiers ?",
  },
  {
    uA: "h", uB: "km", nA: [1, 6], k: [12, 14, 15, 16, 18], kd: [12.5, 15.5],
    lien: (p, n, m) => `à vitesse constante, ${p.nom} parcourt ${m} km à vélo en ${n} h`,
    lien2: (p, n, m) => `en ${n} h, ${p.nom} parcourt ${m} km à vélo, à vitesse constante`,
    demB: (p, n) => `Quelle distance parcourt-${il(p)} en ${n} h ?`,
    demA: (_p, m) => `Combien d’heures lui faut-il pour parcourir ${m} km ?`,
    valB: (n) => `la distance parcourue en ${n} h`,
    unite: "la distance parcourue en une heure", fem: true,
    labelA: "Durée (h)", labelB: "Distance (km)",
    couple: (n, m) => `${m} km en ${n} h`,
    intro: (p) => `${p.nom} note ses trajets à vélo`,
    sujet: "la distance parcourue à vélo selon la durée",
    qProp: "La distance parcourue est-elle proportionnelle à la durée ?",
  },
  {
    uA: "personnes", uB: "g", nA: [2, 12], k: [50, 60, 75], kd: [62.5, 37.5],
    lien: (p, n, m) => `pour ${n} personnes, ${p.nom} utilise ${m} g de farine`,
    lien2: (p, n, m) => `${p.nom} utilise ${m} g de farine pour ${n} personnes`,
    demB: (_p, n) => `Quelle masse de farine faut-il pour ${n} personnes ?`,
    demA: (_p, m) => `Pour combien de personnes suffisent ${m} g de farine ?`,
    valB: (n) => `la masse de farine pour ${n} personnes`,
    unite: "la masse de farine par personne", fem: true,
    labelA: "Nombre de personnes", labelB: "Farine (g)",
    couple: (n, m) => `${m} g pour ${n} personnes`,
    intro: (p) => `${p.nom} prépare des crêpes et note la farine utilisée`,
    sujet: "la farine des crêpes selon le nombre de personnes",
    qProp: "La masse de farine est-elle proportionnelle au nombre de personnes ?",
  },
  {
    uA: "min", uB: "pages", nA: [2, 10], k: [12, 15, 20, 25], kd: [],
    lien: (p, n, m) => `l’imprimante ${de(p.nom)} imprime ${m} pages en ${n} min`,
    lien2: (p, n, m) => `en ${n} min, l’imprimante ${de(p.nom)} imprime ${m} pages`,
    demB: (_p, n) => `Combien de pages imprime-t-elle en ${n} min ?`,
    demA: (_p, m) => `Combien de minutes lui faut-il pour imprimer ${m} pages ?`,
    valB: (n) => `le nombre de pages imprimées en ${n} min`,
    unite: "le nombre de pages imprimées en une minute", fem: false,
    labelA: "Durée (min)", labelB: "Pages imprimées",
    couple: (n, m) => `${m} pages en ${n} min`,
    intro: (p) => `${p.nom} chronomètre son imprimante`,
    sujet: "les pages imprimées selon la durée",
    qProp: "Le nombre de pages est-il proportionnel à la durée ?",
  },
  {
    uA: "min", uB: "L", nA: [2, 10], k: [6, 8, 10, 12], kd: [1.5, 2.5],
    lien: (p, n, m) => `le robinet du jardin ${de(p.nom)} verse ${m} L en ${n} min`,
    lien2: (p, n, m) => `en ${n} min, le robinet du jardin ${de(p.nom)} verse ${m} L`,
    demB: (_p, n) => `Combien de litres le robinet verse-t-il en ${n} min ?`,
    demA: (_p, m) => `En combien de minutes le robinet verse-t-il ${m} L ?`,
    valB: (n) => `le volume d’eau versé en ${n} min`,
    unite: "le volume d’eau versé en une minute", fem: false,
    labelA: "Durée (min)", labelB: "Eau (L)",
    couple: (n, m) => `${m} L en ${n} min`,
    intro: (p) => `${p.nom} mesure l’eau versée par le robinet du jardin`,
    sujet: "l’eau versée par un robinet selon la durée",
    qProp: "Le volume d’eau est-il proportionnel à la durée ?",
  },
  {
    uA: "m²", uB: "g", nA: [2, 12], k: [20, 25, 30, 40], kd: [22.5, 27.5],
    lien: (p, n, m) => `${p.nom} sème ${n} m² de gazon avec ${m} g de graines`,
    lien2: (p, n, m) => `avec ${m} g de graines, ${p.nom} sème ${n} m² de gazon`,
    demB: (_p, n) => `Quelle masse de graines faut-il pour ${n} m² ?`,
    demA: (p, m) => `Quelle surface, en m², peut-${il(p)} semer avec ${m} g de graines ?`,
    valB: (n) => `la masse de graines pour ${n} m²`,
    unite: "la masse de graines pour un mètre carré", fem: true,
    labelA: "Surface (m²)", labelB: "Graines (g)",
    couple: (n, m) => `${m} g pour ${n} m²`,
    intro: (p) => `${p.nom} sème du gazon dans le jardin`,
    sujet: "les graines de gazon selon la surface",
    qProp: "La masse de graines est-elle proportionnelle à la surface ?",
  },
  {
    uA: "paquets", uB: "cartes", nA: [2, 10], k: [5, 6, 8, 10], kd: [],
    lien: (p, n, m) => `${p.nom} trouve ${m} cartes dans ${n} paquets identiques`,
    lien2: (p, n, m) => `dans ${n} paquets identiques, ${p.nom} trouve ${m} cartes`,
    demB: (_p, n) => `Combien de cartes y a-t-il dans ${n} paquets ?`,
    demA: (_p, m) => `Combien de paquets faut-il pour avoir ${m} cartes ?`,
    valB: (n) => `le nombre de cartes dans ${n} paquets`,
    unite: "le nombre de cartes dans un paquet", fem: false,
    labelA: "Paquets", labelB: "Cartes",
    couple: (n, m) => `${m} cartes dans ${n} paquets`,
    intro: (p) => `${p.nom} ouvre des paquets de cartes à collectionner`,
    sujet: "les cartes selon le nombre de paquets",
    qProp: "Le nombre de cartes est-il proportionnel au nombre de paquets ?",
  },
  {
    uA: "tours", uB: "m", nA: [2, 10], k: [200, 250, 400], kd: [],
    lien: (p, n, m) => `${p.nom} court ${m} m en ${n} tours de piste`,
    lien2: (p, n, m) => `en ${n} tours de piste, ${p.nom} court ${m} m`,
    demB: (p, n) => `Quelle distance, en mètres, court-${il(p)} en ${n} tours ?`,
    demA: (p, m) => `Combien de tours fait-${il(p)} pour courir ${m} m ?`,
    valB: (n) => `la distance courue en ${n} tours`,
    unite: "la longueur d’un tour de piste", fem: true,
    labelA: "Tours", labelB: "Distance (m)",
    couple: (n, m) => `${m} m en ${n} tours`,
    intro: (p) => `${p.nom} s’entraîne sur la piste du stade`,
    sujet: "la distance courue selon le nombre de tours",
    qProp: "La distance est-elle proportionnelle au nombre de tours ?",
  },
  {
    uA: "min", uB: "battements", nA: [2, 8], k: [60, 80, 90, 100, 120], kd: [],
    lien: (p, n, m) => `le métronome ${de(p.nom)} donne ${m} battements en ${n} min`,
    lien2: (p, n, m) => `en ${n} min, le métronome ${de(p.nom)} donne ${m} battements`,
    demB: (_p, n) => `Combien de battements donne-t-il en ${n} min ?`,
    demA: (_p, m) => `En combien de minutes donne-t-il ${m} battements ?`,
    valB: (n) => `le nombre de battements en ${n} min`,
    unite: "le nombre de battements par minute", fem: false,
    labelA: "Durée (min)", labelB: "Battements",
    couple: (n, m) => `${m} battements en ${n} min`,
    intro: (p) => `${p.nom} règle son métronome pour sa leçon de piano`,
    sujet: "les battements du métronome selon la durée",
    qProp: "Le nombre de battements est-il proportionnel à la durée ?",
  },
  {
    uA: "L", uB: "m²", nA: [2, 8], k: [8, 10, 12], kd: [7.5, 9.5],
    lien: (p, n, m) => `avec ${n} L de peinture, ${p.nom} peint ${m} m² de mur`,
    lien2: (p, n, m) => `${p.nom} peint ${m} m² de mur avec ${n} L de peinture`,
    demB: (p, n) => `Quelle surface de mur peut-${il(p)} peindre avec ${n} L ?`,
    demA: (_p, m) => `Combien de litres faut-il pour peindre ${m} m² ?`,
    valB: (n) => `la surface peinte avec ${n} L`,
    unite: "la surface peinte avec un litre", fem: true,
    labelA: "Peinture (L)", labelB: "Surface (m²)",
    couple: (n, m) => `${m} m² avec ${n} L`,
    intro: (p) => `${p.nom} repeint sa chambre`,
    sujet: "la surface peinte selon la peinture utilisée",
    qProp: "La surface peinte est-elle proportionnelle à la quantité de peinture ?",
  },
  {
    uA: "longueurs", uB: "m", nA: [2, 20], k: [25, 50], kd: [],
    lien: (p, n, m) => `${p.nom} nage ${m} m en ${n} longueurs de bassin`,
    lien2: (p, n, m) => `en ${n} longueurs de bassin, ${p.nom} nage ${m} m`,
    demB: (p, n) => `Combien de mètres nage-t-${il(p)} en ${n} longueurs ?`,
    demA: (p, m) => `Combien de longueurs fait-${il(p)} pour nager ${m} m ?`,
    valB: (n) => `la distance nagée en ${n} longueurs`,
    unite: "la longueur du bassin", fem: true,
    labelA: "Longueurs", labelB: "Distance (m)",
    couple: (n, m) => `${m} m en ${n} longueurs`,
    intro: (p) => `${p.nom} nage à la piscine`,
    sujet: "la distance nagée selon le nombre de longueurs",
    qProp: "La distance nagée est-elle proportionnelle au nombre de longueurs ?",
  },
  {
    uA: "jours", uB: "g", nA: [2, 10], k: [150, 200, 250, 300], kd: [],
    lien: (p, n, m) => `le chien ${de(p.nom)} mange ${m} g de croquettes en ${n} jours`,
    lien2: (p, n, m) => `en ${n} jours, le chien ${de(p.nom)} mange ${m} g de croquettes`,
    demB: (_p, n) => `Quelle masse de croquettes mange-t-il en ${n} jours ?`,
    demA: (_p, m) => `En combien de jours mange-t-il ${m} g de croquettes ?`,
    valB: (n) => `la masse de croquettes mangée en ${n} jours`,
    unite: "la masse de croquettes mangée en un jour", fem: true,
    labelA: "Durée (jours)", labelB: "Croquettes (g)",
    couple: (n, m) => `${m} g en ${n} jours`,
    intro: (p) => `${p.nom} note ce que mange son chien`,
    sujet: "les croquettes du chien selon le nombre de jours",
    qProp: "La masse de croquettes est-elle proportionnelle au nombre de jours ?",
  },
  {
    uA: "kg", uB: "€", nA: [1, 8], k: [4, 5, 6], kd: [4.5, 5.5],
    lien: (p, n, m) => `au marché de Saint-Paul, ${p.nom} paie ${m} € pour ${n} kg de letchis`,
    lien2: (p, n, m) => `pour ${n} kg de letchis, ${p.nom} paie ${m} € au marché de Saint-Paul`,
    demB: (p, n) => `Combien paiera-t-${il(p)} pour ${n} kg de letchis ?`,
    demA: (p, m) => `Combien de kilogrammes de letchis peut-${il(p)} acheter avec ${m} € ?`,
    valB: (n) => `le prix de ${n} kg de letchis`,
    unite: "le prix d’un kilogramme de letchis", fem: false,
    labelA: "Masse de letchis (kg)", labelB: "Prix (€)",
    couple: (n, m) => `${n} kg pour ${m} €`,
    intro: (p) => `${p.nom} relève le prix des letchis au marché de Saint-Paul`,
    sujet: "le prix des letchis selon leur masse",
    qProp: "Le prix est-il proportionnel à la masse de letchis ?",
  },
  {
    uA: "boîtes", uB: "vis", nA: [2, 10], k: [25, 40, 50], kd: [],
    lien: (p, n, m) => `${p.nom} compte ${m} vis dans ${n} boîtes identiques`,
    lien2: (p, n, m) => `dans ${n} boîtes identiques, ${p.nom} compte ${m} vis`,
    demB: (_p, n) => `Combien de vis y a-t-il dans ${n} boîtes ?`,
    demA: (_p, m) => `Combien de boîtes faut-il pour avoir ${m} vis ?`,
    valB: (n) => `le nombre de vis dans ${n} boîtes`,
    unite: "le nombre de vis dans une boîte", fem: false,
    labelA: "Boîtes", labelB: "Vis",
    couple: (n, m) => `${m} vis dans ${n} boîtes`,
    intro: (p) => `${p.nom} range l’atelier de bricolage`,
    sujet: "les vis selon le nombre de boîtes",
    qProp: "Le nombre de vis est-il proportionnel au nombre de boîtes ?",
  },
  {
    uA: "m", uB: "€", nA: [2, 9], k: [4, 5, 6, 8], kd: [4.5, 6.5, 7.5],
    lien: (p, n, m) => `${p.nom} paie ${m} € pour ${n} m de tissu`,
    lien2: (p, n, m) => `pour ${n} m de tissu, ${p.nom} paie ${m} €`,
    demB: (_p, n) => `Combien coûtent ${n} m de ce tissu ?`,
    demA: (p, m) => `Quelle longueur de tissu, en mètres, peut-${il(p)} acheter avec ${m} € ?`,
    valB: (n) => `le prix de ${n} m de tissu`,
    unite: "le prix d’un mètre de tissu", fem: false,
    labelA: "Longueur (m)", labelB: "Prix (€)",
    couple: (n, m) => `${n} m pour ${m} €`,
    intro: (p) => `${p.nom} achète du tissu pour un déguisement`,
    sujet: "le prix du tissu selon sa longueur",
    qProp: "Le prix est-il proportionnel à la longueur de tissu ?",
  },
  {
    uA: "h", uB: "km", nA: [1, 5], k: [80, 90, 100, 120], kd: [],
    lien: (p, n, m) => `à vitesse constante, le train ${de(p.nom)} parcourt ${m} km en ${n} h`,
    lien2: (p, n, m) => `en ${n} h, le train ${de(p.nom)} parcourt ${m} km à vitesse constante`,
    demB: (_p, n) => `Quelle distance le train parcourt-il en ${n} h ?`,
    demA: (_p, m) => `Combien d’heures faut-il au train pour parcourir ${m} km ?`,
    valB: (n) => `la distance parcourue en ${n} h`,
    unite: "la distance parcourue en une heure", fem: true,
    labelA: "Durée (h)", labelB: "Distance (km)",
    couple: (n, m) => `${m} km en ${n} h`,
    intro: (p) => `${p.nom} note la distance parcourue par son train`,
    sujet: "la distance parcourue en train selon la durée",
    qProp: "La distance est-elle proportionnelle à la durée ?",
  },
];

/**
 * Deux (ou trois) valeurs de A et le coefficient.
 * niveau 1 : n2 = 2 × n1 ou 3 × n1 ; niveau 2 : quelconques ;
 * niveau 3 : k parfois décimal, rapport entre colonnes souvent NON entier (2j → 3j ou 5j).
 */
function tirerPaire(s: SituationProp, niveau: 1 | 2 | 3) {
  const [lo, hi] = s.nA;
  const k = niveau === 3 && s.kd.length && Math.random() < 0.5 ? randomChoice(s.kd) : randomChoice(s.k);
  let n1: number;
  let n2: number;
  if (niveau === 1) {
    const f = hi >= 3 * Math.max(lo, 1) && Math.random() < 0.5 ? 3 : 2;
    n1 = rint(Math.max(lo, 1), Math.max(lo, Math.floor(hi / f)));
    n2 = n1 * f;
  } else if (niveau === 3 && Math.random() < 0.6) {
    const r = randomChoice([3, 5]);
    const jMin = Math.max(1, Math.ceil(lo / 2));
    const j = rint(jMin, Math.max(jMin, Math.floor(hi / r)));
    n1 = 2 * j;
    n2 = r * j;
  } else {
    n1 = rint(lo, hi);
    do n2 = rint(lo, hi);
    while (n2 === n1);
  }
  return { k, n1, n2, m1: r2(n1 * k), m2: r2(n2 * k) };
}

const tirerSituation = () => randomChoice(SITUATIONS_PROP);

const quotients = (ns: number[], ms: number[], s: SituationProp) =>
  ns.map((n, i) => `${nb(ms[i], s.uB)} ÷ ${n} = ${nb(ms[i] / n)}`).join(" ; ");

/**
 * Reconnaître (oui / non, ou vrai / faux).
 * niveau 1 : deux relevés, l'un double ou triple de l'autre ; 2 : deux relevés
 * quelconques ; 3 : trois relevés ; 4 (défi) : trois relevés, et quand ce n'est
 * pas proportionnel, c'est un prix « fixe + par unité » (le piège classique).
 */
function genReconnaitre(niveau: 1 | 2 | 3 | 4) {
  const s = tirerSituation();
  const p = prenom();
  const prop = Math.random() < 0.5;
  const { k, n1, n2 } = tirerPaire(s, niveau === 1 ? 1 : niveau === 4 ? 3 : 2);
  const ns = [n1, n2];
  if (niveau >= 3) {
    let n3: number;
    do n3 = rint(s.nA[0], s.nA[1]);
    while (ns.includes(n3));
    ns.push(n3);
  }
  ns.sort((a, b) => a - b);
  let ms = ns.map((n) => r2(n * k));
  if (!prop) {
    if (niveau === 4) {
      // un forfait : m = fixe + k' × n (même allure, mais pas proportionnel)
      const fixe = k >= 50 ? randomChoice([20, 30, 50]) : k >= 10 ? randomChoice([5, 6, 10]) : randomChoice([1, 2, 3]);
      ms = ns.map((n) => r2(fixe + n * k));
    } else {
      const pas = k >= 100 ? 20 : k >= 50 ? 10 : k >= 10 ? 2 : 1;
      const i = rint(1, ns.length - 1);
      ms[i] = r2(ms[i] + randomChoice([1, 2]) * pas * (Math.random() < 0.5 && ms[i] > 3 * pas ? -1 : 1));
    }
  }
  const couples = ns.map((n, i) => s.couple(String(n), nb(ms[i], s.uB)));
  const liste = couples.length === 2 ? `${couples[0]} et ${couples[1]}` : `${couples[0]}, ${couples[1]} et ${couples[2]}`;
  const t = rint(1, 5);
  let text: string;
  let canvas: TableauProportionnaliteCanvasData | undefined;
  let vraiFaux = false;
  if (t === 1) text = `${s.intro(p)} : ${liste}. ${s.qProp}`;
  else if (t === 2) text = `${s.intro(p)}. Relevés : ${couples.join(" ; ")}. Est-ce une situation de proportionnalité ?`;
  else if (t === 3) {
    text = `${s.intro(p)} et note ses relevés dans ce tableau. Est-ce un tableau de proportionnalité ?`;
    canvas = tableauCanvas([s.labelA, s.labelB], [ns.map(String), ms.map((m) => nb(m, s.uB))]);
  } else if (t === 4) {
    vraiFaux = true;
    text = `${s.intro(p)} : ${liste}. ${p.nom} affirme : « c’est une situation de proportionnalité ». Vrai ou faux ?`;
  } else {
    vraiFaux = true;
    text = `${s.intro(p)} : ${couples.join(" ; ")}. Vrai ou faux : ${s.qProp.replace(/^(.+?) est-(il|elle) /, (_m, g) => `${g.charAt(0).toLowerCase()}${g.slice(1)} est `).replace(/ \?$/, ".")}`;
  }
  const oui = vraiFaux ? "vrai" : "oui";
  const non = vraiFaux ? "faux" : "non";
  return {
    text,
    format: "qcm" as const,
    choices: [oui, non],
    expected: [prop ? oui : non],
    comparator: "mcq_exact" as const,
    explanation: explique(
      `on divise la seconde grandeur par la première pour chaque relevé : si on trouve toujours le même nombre, c’est proportionnel.`,
      `${quotients(ns, ms, s)}.`,
      prop
        ? `on trouve toujours ${nb(k)} : la situation est proportionnelle.`
        : niveau === 4
          ? "les quotients ne sont pas égaux (il y a une somme fixe en plus) : la situation n’est pas proportionnelle."
          : "les quotients ne sont pas tous égaux : la situation n’est pas proportionnelle.",
    ),
    ...(canvas ? { canvas } : {}),
  };
}

const ENONCES_TABLEAU = [
  (p: Prenom, s: SituationProp) => `${s.intro(p)} et note ses relevés dans ce tableau de proportionnalité. Quelle valeur manque ?`,
  (p: Prenom, s: SituationProp) => `Ce tableau de proportionnalité donne ${s.sujet}. Aide ${p.nom} : que vaut la case « ? » ?`,
  (p: Prenom, s: SituationProp) => `${p.nom} a commencé ce tableau de proportionnalité (${s.sujet}). Complète la case vide.`,
  (p: Prenom, s: SituationProp) => `Calcule la case vide du tableau de proportionnalité ${de(p.nom)} : ${s.sujet}.`,
  (p: Prenom, s: SituationProp) => `Le tableau ${de(p.nom)} est un tableau de proportionnalité (${s.sujet}). Quel nombre faut-il écrire à la place du « ? » ?`,
];

/** Compléter un tableau de proportionnalité (2 colonnes au niveau 1, 3 ensuite). */
function genTableau(niveau: 1 | 2 | 3, qcm = false) {
  const s = tirerSituation();
  const p = prenom();
  const { k, n1, n2 } = tirerPaire(s, niveau);
  const ns = [n1, n2];
  if (niveau >= 2) {
    let n3: number;
    do n3 = rint(s.nA[0], s.nA[1]);
    while (ns.includes(n3));
    ns.push(n3);
  }
  const ms = ns.map((n) => r2(n * k));
  // La case vide : jamais dans la 1re colonne (elle donne le coefficient) ;
  // en bas au niveau 1, en haut une fois sur trois ensuite.
  const col = rint(1, ns.length - 1);
  const row = niveau > 1 && Math.random() < 0.33 ? 0 : 1;
  const values = [ns.map(String), ms.map((m) => nb(m, s.uB))];
  values[row][col] = "?";
  const bon = row === 1 ? ms[col] : ns[col];
  const text = randomChoice(ENONCES_TABLEAU)(p, s);
  const canvas = tableauCanvas([s.labelA, s.labelB], values);
  const explication = explique(
    "on cherche le coefficient avec une colonne complète, puis on l’applique (on multiplie pour descendre, on divise pour monter).",
    `coefficient : ${nb(ms[0], s.uB)} ÷ ${ns[0]} = ${nb(k)}. ${row === 1 ? `${ns[col]} × ${nb(k)} = ${nb(bon, s.uB)}` : `${nb(ms[col], s.uB)} ÷ ${nb(k)} = ${nb(bon)}`}.`,
    `la case vide vaut ${nb(bon, row === 1 ? s.uB : "")}.`,
  );
  if (qcm) {
    const a = row === 1 ? ns[col] : ms[col];
    const pieges = row === 1 ? [ms[0] + (ns[col] - ns[0]), r2(ms[0] * ns[col]), bon + k, bon - k] : [ns[0] + (ms[col] - ms[0]), r2(a * k), bon + 1, bon * 2];
    const ecrire = (v: number) => nb(v, row === 1 ? s.uB : "");
    return {
      text,
      format: "qcm" as const,
      choices: choixNombres(bon, pieges, "", ecrire),
      expected: [ecrire(bon)],
      comparator: "mcq_exact" as const,
      explanation: explication,
      canvas,
    };
  }
  return { text, format: "short" as const, expected: [nb(bon)], comparator: "number_equal" as const, explanation: explication, canvas };
}

/**
 * Quatrième proportionnelle : un relevé, une question.
 * niveau 1 : facteur entier entre les deux quantités ; 2 : quelconque ;
 * 3 : rapport non entier, coefficient parfois décimal, et parfois la question à l'envers.
 */
function genQuatrieme(niveau: 1 | 2 | 3) {
  const s = tirerSituation();
  const p = prenom();
  const { k, n1, n2, m1, m2 } = tirerPaire(s, niveau);
  const t = rint(1, niveau === 1 ? 3 : 5);
  const inverse = t >= 4;
  const N1 = String(n1);
  const M1 = nb(m1, s.uB);
  let text: string;
  if (t === 1) text = `${cap(s.lien(p, N1, M1))}. ${s.demB(p, String(n2))}`;
  else if (t === 2) text = `${cap(s.lien2(p, N1, M1))}. ${s.demB(p, String(n2))}`;
  else if (t === 3) text = `On sait ${que(s.lien(p, N1, M1))}. C’est proportionnel. Calcule ${s.valB(String(n2))}.`;
  else if (t === 4) text = `${cap(s.lien(p, N1, M1))}. ${s.demA(p, nb(m2, s.uB))}`;
  else text = `${cap(s.lien2(p, N1, M1))}. ${s.demA(p, nb(m2, s.uB))}`;
  const rep = inverse ? n2 : m2;
  return {
    text,
    format: "short" as const,
    expected: attendu(rep, inverse ? s.uA : s.uB),
    comparator: "number_equal" as const,
    explanation: explique(
      `on passe par l’unité : ${s.unite} vaut ${M1} ÷ ${n1} = ${nb(k, s.uB)}.`,
      inverse ? `${nb(m2, s.uB)} ÷ ${nb(k)} = ${n2}.` : `${n2} × ${nb(k)} = ${nb(m2, s.uB)} (ou produit en croix : ${M1} × ${n2} ÷ ${n1}).`,
      `la réponse est ${avecU(rep, inverse ? s.uA : s.uB)}.`,
    ),
  };
}

/** Le coefficient (valeur pour une unité), ou son usage. */
function genCoeff(niveau: 1 | 2 | 3) {
  const s = tirerSituation();
  const p = prenom();
  const k = niveau === 3 && s.kd.length && Math.random() < 0.5 ? randomChoice(s.kd) : randomChoice(s.k);
  const [lo, hi] = s.nA;
  const n = niveau === 1 ? rint(Math.max(lo, 2), Math.min(hi, lo + 4)) : rint(Math.max(lo, 2), hi);
  const m = r2(n * k);
  const N = String(n);
  const M = nb(m, s.uB);
  const t = niveau === 1 ? randomChoice([1, 2, 5]) : rint(1, 5);
  const quel = s.fem ? "Quelle" : "Quel";
  if (t === 5) {
    const n2 = rint(Math.max(lo, 2), hi);
    return {
      text: `${p.nom} sait que ${s.unite} est de ${avecU(k, s.uB).replace(/^(\d+(?:,\d+)?)$/, `$1 ${s.uB}`)}. ${s.demB(p, String(n2))}`,
      format: "short" as const,
      expected: attendu(r2(n2 * k), s.uB),
      comparator: "number_equal" as const,
      explanation: explique(
        `le coefficient est ${nb(k)} : on multiplie la première grandeur par ${nb(k)}.`,
        `${n2} × ${nb(k)} = ${nb(n2 * k, s.uB)}.`,
        `${s.valB(String(n2))} est ${avecU(n2 * k, s.uB)}.`,
      ),
    };
  }
  let text: string;
  let canvas: TableauProportionnaliteCanvasData | undefined;
  if (t === 1) text = `${cap(s.lien(p, N, M))}. ${quel} est ${s.unite} ?`;
  else if (t === 2) text = `${cap(s.lien2(p, N, M))}. Calcule ${s.unite}.`;
  else if (t === 3) text = `${cap(s.lien(p, N, M))}. Quel est le coefficient de proportionnalité ?`;
  else {
    text = `${s.intro(p)} et note son relevé dans ce tableau de proportionnalité. Par quel nombre multiplie-t-on la première ligne pour obtenir la seconde ?`;
    canvas = tableauCanvas([s.labelA, s.labelB], [[N], [M]]);
  }
  // « Quel est le prix d’un cahier ? » : une mesure ; « le coefficient » : un nombre seul.
  const u = t <= 2 ? s.uB : "";
  return {
    text,
    format: "short" as const,
    expected: attendu(k, u),
    comparator: "number_equal" as const,
    explanation: explique(
      "le coefficient s’obtient en divisant la seconde grandeur par la première.",
      `${M} ÷ ${n} = ${nb(k)}.`,
      `le coefficient de proportionnalité est ${nb(k)} : ${s.unite} est ${avecU(k, s.uB)}.`,
    ),
    ...(canvas ? { canvas } : {}),
  };
}

/** Problèmes : quatrième proportionnelle plus dure (niveau 3), deux calculs enchaînés (niveau 4). */
function genProbleme(niveau: 3 | 4) {
  const s = tirerSituation();
  const p = prenom();
  const t = rint(1, 4);
  if (niveau === 3 || t <= 2) {
    const { k, n1, n2, m1, m2 } = tirerPaire(s, 3);
    const inverse = niveau === 4 ? t === 2 : t === 4;
    const N1 = String(n1);
    const M1 = nb(m1, s.uB);
    let text: string;
    if (niveau === 4 && t === 1) text = `Sachant ${que(s.lien(p, N1, M1))}, calcule ${s.valB(String(n2))}.`;
    else if (inverse) text = `${cap(s.lien2(p, N1, M1))}. ${s.demA(p, nb(m2, s.uB))}`;
    else if (t === 1) text = `${cap(s.lien(p, N1, M1))}. ${s.demB(p, String(n2))}`;
    else if (t === 2) text = `${cap(s.lien2(p, N1, M1))}. ${s.demB(p, String(n2))}`;
    else text = `Sachant ${que(s.lien2(p, N1, M1))}, calcule ${s.valB(String(n2))}.`;
    const rep = inverse ? n2 : m2;
    return {
      text,
      format: "short" as const,
      expected: attendu(rep, inverse ? s.uA : s.uB),
      comparator: "number_equal" as const,
      explanation: explique(
        `${s.unite} vaut ${M1} ÷ ${n1} = ${avecU(k, s.uB)}.`,
        inverse ? `${nb(m2, s.uB)} ÷ ${nb(k)} = ${n2}.` : `${n2} × ${nb(k)} = ${nb(m2, s.uB)} (produit en croix : ${M1} × ${n2} ÷ ${n1}).`,
        `la réponse est ${avecU(rep, inverse ? s.uA : s.uB)}.`,
      ),
    };
  }
  const k = randomChoice(s.k);
  const [lo, hi] = s.nA;
  const n1 = rint(lo, hi);
  let n2: number;
  let n3: number;
  do {
    n2 = rint(lo, hi);
    n3 = rint(lo, hi);
  } while (n2 === n3 || n2 === n1 || n3 === n1);
  if (n2 > n3) [n2, n3] = [n3, n2];
  const [m1, m2, m3] = [n1 * k, n2 * k, n3 * k];
  const diff = t === 3;
  const rep = diff ? m3 - m2 : m2 + m3;
  return {
    text: diff
      ? `${cap(s.lien(p, String(n1), nb(m1, s.uB)))}. Calcule la différence entre ${s.valB(String(n3))} et ${s.valB(String(n2))}.`
      : `${cap(s.lien2(p, String(n1), nb(m1, s.uB)))}. Calcule ${s.valB(String(n2))}, puis ${s.valB(String(n3))}, et donne la somme des deux résultats.`,
    format: "short" as const,
    expected: attendu(rep, s.uB),
    comparator: "number_equal" as const,
    explanation: explique(
      `${s.unite} vaut ${nb(m1, s.uB)} ÷ ${n1} = ${avecU(k, s.uB)}.`,
      `${n3} × ${k} = ${m3} et ${n2} × ${k} = ${m2}, donc ${diff ? `${m3} − ${m2}` : `${m2} + ${m3}`} = ${rep}.`,
      `la ${diff ? "différence" : "somme"} est ${avecU(rep, s.uB)}.`,
    ),
  };
}

/** Défi : un camarade affirme un résultat ; a-t-il raison ? */
function genAffirmation(niveau: 2 | 3) {
  const s = tirerSituation();
  const [p, q] = deuxPrenoms();
  let { k, n1, n2, m1, m2 } = tirerPaire(s, niveau);
  if (n2 < n1) {
    [n1, n2] = [n2, n1];
    [m1, m2] = [m2, m1];
  }
  const r = rint(1, 4);
  let valeur: number;
  let raison: string;
  const M1 = nb(m1, s.uB);
  if (r === 1) {
    valeur = r2(m1 + (n2 - n1));
    raison = `on passe de ${n1} à ${n2} en ajoutant ${n2 - n1}, donc ${il(q)} ajoute aussi ${n2 - n1} à ${M1}`;
  } else if (r === 2) {
    valeur = r2(m1 * n2);
    raison = `${il(q)} multiplie ${M1} par ${n2}`;
  } else if (r === 3) {
    valeur = m2;
    raison = `${il(q)} calcule d’abord ${s.unite}, puis multiplie par ${n2}`;
  } else {
    valeur = m2;
    raison = `${il(q)} fait un produit en croix : ${M1} × ${n2} ÷ ${n1}`;
  }
  const juste = r2(valeur) === r2(m2);
  return {
    text: `${cap(s.lien(p, String(n1), M1))}. ${q.nom} affirme que ${s.valB(String(n2))} est de ${nb(valeur, s.uB)} ${s.uB}, car ${raison}. ${q.f ? "A-t-elle" : "A-t-il"} raison ?`,
    format: "qcm" as const,
    choices: ["oui", "non"],
    expected: [juste ? "oui" : "non"],
    comparator: "mcq_exact" as const,
    explanation: explique(
      r === 1
        ? `en proportionnalité, on multiplie, on n’ajoute pas : ${s.unite} vaut ${M1} ÷ ${n1} = ${avecU(k, s.uB)}.`
        : `on passe par l’unité : ${s.unite} vaut ${M1} ÷ ${n1} = ${avecU(k, s.uB)}.`,
      `${n2} × ${nb(k)} = ${nb(m2, s.uB)}.`,
      juste
        ? `${q.nom} a raison : ${s.valB(String(n2))} est bien ${avecU(m2, s.uB)}.`
        : `${q.nom} a tort : ${s.valB(String(n2))} est ${avecU(m2, s.uB)}.`,
    ),
  };
}

/** Défi : comparer deux relevés par leur valeur pour une unité. */
function genComparer() {
  const s = tirerSituation();
  const [p, q] = deuxPrenoms();
  const ks = [...s.k, ...s.kd];
  const kA = randomChoice(ks);
  const pareil = Math.random() < 0.2;
  const kB = pareil ? kA : randomChoice(ks.filter((x) => x !== kA));
  const [lo, hi] = s.nA;
  const nA = rint(Math.max(lo, 2), hi);
  let nB: number;
  do nB = rint(Math.max(lo, 2), hi);
  while (nB === nA);
  const mA = r2(nA * kA);
  const mB = r2(nB * kB);
  const plusGrand = Math.random() < 0.5;
  const adj = s.fem ? (plusGrand ? "la plus grande" : "la plus petite") : plusGrand ? "le plus grand" : "le plus petit";
  const pareilTxt = "c’est pareil pour les deux";
  const correct = kA === kB ? pareilTxt : (plusGrand ? kA > kB : kA < kB) ? p.nom : q.nom;
  return {
    text: `${cap(s.lien(p, String(nA), nb(mA, s.uB)))}. De son côté, ${s.lien(q, String(nB), nb(mB, s.uB))}. Pour qui ${s.unite} est-${s.fem ? "elle" : "il"} ${adj} ?`,
    format: "qcm" as const,
    choices: [p.nom, q.nom, pareilTxt],
    expected: [correct],
    comparator: "mcq_exact" as const,
    explanation: explique(
      "pour comparer, on ramène chaque relevé à une unité : on divise la seconde grandeur par la première.",
      `${p.nom} : ${nb(mA, s.uB)} ÷ ${nA} = ${avecU(kA, s.uB)} ; ${q.nom} : ${nb(mB, s.uB)} ÷ ${nB} = ${avecU(kB, s.uB)}.`,
      kA === kB ? "les deux valeurs sont égales : c’est pareil pour les deux." : `la réponse est ${correct}.`,
    ),
  };
}

/* =========================================================
   RATIOS — 09/10/2026. Un ratio s'écrit « a:b » (sans espace : « a : b »
   serait lu comme une division). Chaque quantité s'écrit avec le NOM du
   ratio (« 6 doses de sirop », « 9 doses d’eau », « 12 filles ») : le
   correcteur retrouve ainsi à quel côté du ratio elle appartient.
   ========================================================= */
type SituationRatio = {
  /** les deux noms, tels qu'écrits dans « le ratio sirop:eau » */
  L: [string, string];
  /** mot avant le nom (« doses ») et liaison (« de », « d’ », rien) */
  u: string;
  liaison: [string, string];
  /** ce qu'on compte en tout : « doses », « enfants » */
  tout: string;
  intro: (p: Prenom) => string;
  verbe: string;
};
const SITUATIONS_RATIO: SituationRatio[] = [
  { L: ["sirop", "eau"], u: "doses", liaison: ["de ", "d’"], tout: "doses", verbe: "faut-il", intro: (p) => `Pour sa boisson, ${p.nom} mélange du sirop et de l’eau` },
  { L: ["ciment", "sable"], u: "seaux", liaison: ["de ", "de "], tout: "seaux", verbe: "faut-il", intro: (p) => `${p.nom} prépare du mortier pour construire un muret` },
  { L: ["bleu", "jaune"], u: "pots", liaison: ["de ", "de "], tout: "pots", verbe: "faut-il", intro: (p) => `Pour obtenir du vert, ${p.nom} mélange de la peinture bleue et de la peinture jaune` },
  { L: ["filles", "garçons"], u: "", liaison: ["", ""], tout: "enfants", verbe: "y a-t-il", intro: (p) => `Au club de handball où joue ${p.nom}, on compte les filles et les garçons` },
  { L: ["chats", "chiens"], u: "", liaison: ["", ""], tout: "animaux", verbe: "y a-t-il", intro: (p) => `Au refuge où ${p.nom} est bénévole, on compte les chats et les chiens` },
  { L: ["rouges", "bleues"], u: "billes", liaison: ["", ""], tout: "billes", verbe: "y a-t-il", intro: (p) => `${p.nom} range ses billes rouges et ses billes bleues` },
  { L: ["tournesol", "blé"], u: "poignées", liaison: ["de ", "de "], tout: "poignées", verbe: "faut-il", intro: (p) => `Pour nourrir les oiseaux, ${p.nom} mélange des graines de tournesol et de blé` },
  { L: ["blanches", "noires"], u: "perles", liaison: ["", ""], tout: "perles", verbe: "faut-il", intro: (p) => `${p.nom} enfile des perles blanches et des perles noires pour faire un collier` },
  { L: ["tomates", "courgettes"], u: "plants", liaison: ["de ", "de "], tout: "plants", verbe: "faut-il", intro: (p) => `${p.nom} plante des tomates et des courgettes dans le potager` },
  { L: ["letchis", "mangues"], u: "", liaison: ["", ""], tout: "fruits", verbe: "faut-il", intro: (p) => `${p.nom} prépare une salade de fruits réunionnaise avec des letchis et des mangues` },
  { L: ["farine", "sucre"], u: "cuillères", liaison: ["de ", "de "], tout: "cuillères", verbe: "faut-il", intro: (p) => `Pour ses biscuits, ${p.nom} mélange de la farine et du sucre` },
  { L: ["romans", "BD"], u: "", liaison: ["", ""], tout: "livres", verbe: "y a-t-il", intro: (p) => `Dans la bibliothèque de la classe ${de(p.nom)}, on range des romans et des BD` },
  { L: ["jus", "limonade"], u: "verres", liaison: ["de ", "de "], tout: "verres", verbe: "faut-il", intro: (p) => `Pour la fête, ${p.nom} prépare un cocktail avec du jus de pomme et de la limonade` },
  { L: ["eau", "riz"], u: "verres", liaison: ["d’", "de "], tout: "verres", verbe: "faut-il", intro: (p) => `Pour cuire du riz, ${p.nom} mesure l’eau et le riz` },
  { L: ["vis", "écrous"], u: "", liaison: ["", ""], tout: "pièces", verbe: "faut-il", intro: (p) => `${p.nom} prépare des sachets de vis et d’écrous pour l’atelier` },
];
/** « 6 doses de sirop », « 12 filles », « 4 billes rouges ». */
const qteRatio = (s: SituationRatio, n: number, i: 0 | 1) => `${n} ${s.u ? `${s.u} ` : ""}${s.liaison[i]}${s.L[i]}`;
/** « doses d’eau », « garçons » (après « combien de »). */
const nomRatio = (s: SituationRatio, i: 0 | 1) => (s.u ? `${s.u} ${s.liaison[i]}${s.L[i]}` : s.L[i]);
/** « de doses d’eau », « d’écrous ». */
const deNom = (s: SituationRatio, i: 0 | 1) => {
  const n = nomRatio(s, i);
  return /^[aeiouyéèêh]/i.test(n) ? `d’${n}` : `de ${n}`;
};
const pgcd = (a: number, b: number): number => (b ? pgcd(b, a % b) : a);
function tirerRatio(): [number, number] {
  let a: number;
  let b: number;
  do {
    a = rint(1, 5);
    b = rint(1, 7);
  } while (a === b || pgcd(a, b) !== 1);
  return [a, b];
}

/**
 * Ratios. niveau 2 : on connaît un côté, on cherche l'autre ; niveau 3 : aussi
 * le partage d'un total, et le QCM « quel ratio est égal ? ».
 */
function genRapport(niveau: 2 | 3) {
  const s = randomChoice(SITUATIONS_RATIO);
  const p = prenom();
  const [a, b] = tirerRatio();
  const k = rint(2, niveau === 2 ? 5 : 8);
  const R = `${s.L[0]}:${s.L[1]}`;
  const t = niveau === 2 ? rint(1, 4) : rint(1, 7);
  if (t === 5 || t === 6) {
    // partage d'un total
    const i: 0 | 1 = t === 5 ? 0 : 1;
    const tot = (a + b) * k;
    const rep = i === 0 ? a * k : b * k;
    return {
      text: `${s.intro(p)}. Le ratio ${R} est ${a}:${b}, et il y a ${tot} ${s.tout} en tout. Combien ${deNom(s, i)} ${s.verbe} ?`,
      format: "short" as const,
      expected: [String(rep)],
      comparator: "number_equal" as const,
      explanation: explique(
        `le ratio ${a}:${b} veut dire ${a} part(s) d’un côté pour ${b} part(s) de l’autre, soit ${a + b} parts en tout.`,
        `une part : ${tot} ÷ ${a + b} = ${k} ; donc ${i === 0 ? a : b} × ${k} = ${rep}.`,
        `il y a ${rep} ${nomRatio(s, i)}.`,
      ),
    };
  }
  if (t === 7) {
    const bon = `${a * k}:${b * k}`;
    // dédoublonnés : avec b = 1 et k = 2, « a + k : b + k » et « a × k : b × k + 1 » coïncidaient
    const pieges = [...new Set([`${b * k}:${a * k}`, `${a + k}:${b + k}`, `${a * k}:${b}`, `${a * k}:${b * k + 1}`, `${a * k + 1}:${b * k}`])].filter((x) => x !== bon);
    return {
      text: `${s.intro(p)}. Le ratio ${R} est ${a}:${b}. Quel autre ratio ${R} lui est égal ?`,
      format: "qcm" as const,
      choices: shuffle([bon, ...shuffle(pieges).slice(0, 3)]),
      expected: [bon],
      comparator: "mcq_exact" as const,
      explanation: explique(
        "deux ratios sont égaux quand on passe de l’un à l’autre en multipliant les deux nombres par le même nombre.",
        `${a} × ${k} = ${a * k} et ${b} × ${k} = ${b * k}.`,
        `le ratio ${a}:${b} est égal à ${bon}.`,
      ),
    };
  }
  // on connaît le côté i, on cherche l'autre
  const i: 0 | 1 = Math.random() < 0.5 ? 0 : 1;
  const j: 0 | 1 = i === 0 ? 1 : 0;
  const r = [a, b];
  const connu = qteRatio(s, r[i] * k, i);
  const rep = r[j] * k;
  let text: string;
  if (t === 1) text = `${s.intro(p)}. Le ratio ${R} est ${a}:${b}. Avec ${connu}, combien ${deNom(s, j)} ${s.verbe} ?`;
  else if (t === 2) text = `${s.intro(p)}, en respectant le ratio ${R} qui vaut ${a}:${b}. Il y a ${connu}. Combien ${deNom(s, j)} ${s.verbe} ?`;
  else if (t === 3) text = `Le ratio ${R} vaut ${a}:${b}. ${s.intro(p)} : il y a ${connu}. Combien ${deNom(s, j)} ${s.verbe} ?`;
  else text = `${s.intro(p)}. Complète : le ratio ${R} est ${a}:${b}, donc pour ${connu}, il ${s.verbe === "y a-t-il" ? "y a" : "faut"} … ${nomRatio(s, j)}.`;
  return {
    text,
    format: "short" as const,
    expected: [String(rep)],
    comparator: "number_equal" as const,
    explanation: explique(
      `le ratio ${a}:${b} se conserve : les deux nombres sont multipliés par le même nombre.`,
      `${r[i]} × ${k} = ${r[i] * k}, donc ${r[j]} × ${k} = ${rep}.`,
      `il y a ${rep} ${nomRatio(s, j)}.`,
    ),
  };
}

/* =========================================================
   POURCENTAGES — 09/10/2026. ⛔ Pas de barre de fraction (« 25/100 ») dans
   cette notion : « t % de N = N × t ÷ 100 ».
   ========================================================= */
type SituationPct = {
  tot: number[];
  /** ce qui suit le total et la part (« élèves », « € ») */
  u: string;
  avecTaux: (p: Prenom, N: string, t: number) => string;
  demPart: (p: Prenom) => string;
  avecPart: (p: Prenom, part: string, N: string) => string;
  demTaux: (p: Prenom) => string;
  /** taux plausible au plus (une barre de céréales n'a pas 60 % de sucre) */
  tmax?: number;
};
const SITUATIONS_PCT: SituationPct[] = [
  {
    tot: [200, 300, 400, 500, 600, 800], u: "élèves",
    avecTaux: (p, N, t) => `Le collège ${de(p.nom)} compte ${N} élèves. ${t} % d’entre eux viennent à vélo.`,
    demPart: () => "Combien d’élèves viennent à vélo ?",
    avecPart: (p, x, N) => `Au collège ${de(p.nom)}, ${x} élèves sur ${N} viennent à vélo.`,
    demTaux: () => "Quel pourcentage des élèves vient à vélo ?",
  },
  {
    tot: [20, 30, 40, 50, 60, 80], u: "€",
    avecTaux: (p, N, t) => `Un jeu vidéo coûte ${N} €. ${p.nom} a droit à une remise de ${t} %.`,
    demPart: (p) => `Combien d’euros économise-t-${il(p)} ?`,
    avecPart: (p, x, N) => `Sur un jeu vidéo à ${N} €, ${p.nom} obtient une remise de ${x} €.`,
    demTaux: () => "Quel est le pourcentage de la remise ?",
  },
  {
    tot: [80, 120, 150, 200, 240, 300], u: "pages",
    avecTaux: (p, N, t) => `Le roman ${de(p.nom)} compte ${N} pages. ${cap(il(p))} en a déjà lu ${t} %.`,
    demPart: (p) => `Combien de pages a-t-${il(p)} lues ?`,
    avecPart: (p, x, N) => `${p.nom} a lu ${x} pages de son roman, qui en compte ${N}.`,
    demTaux: (p) => `Quel pourcentage du roman a-t-${il(p)} lu ?`,
  },
  {
    tot: [40, 50, 60, 80], u: "g", tmax: 30,
    avecTaux: (p, N, t) => `La barre de céréales ${de(p.nom)} pèse ${N} g. Elle contient ${t} % de sucre.`,
    demPart: () => "Quelle masse de sucre contient-elle ?",
    avecPart: (p, x, N) => `La barre de céréales ${de(p.nom)} pèse ${N} g, dont ${x} g de sucre.`,
    demTaux: () => "Quel pourcentage de sucre contient-elle ?",
  },
  {
    tot: [20, 40, 50, 60], u: "tirs",
    avecTaux: (p, N, t) => `Au basket, ${p.nom} a tenté ${N} tirs cette saison. ${cap(il(p))} en a réussi ${t} %.`,
    demPart: (p) => `Combien de tirs a-t-${il(p)} réussis ?`,
    avecPart: (p, x, N) => `Au basket, ${p.nom} a réussi ${x} tirs sur ${N} cette saison.`,
    demTaux: (p) => `Quel pourcentage de ses tirs a-t-${il(p)} réussi ?`,
  },
  {
    tot: [500, 600, 800, 1000], u: "mL",
    avecTaux: (p, N, t) => `La gourde ${de(p.nom)} contient ${N} mL d’eau. ${cap(il(p))} en boit ${t} % pendant la récréation.`,
    demPart: (p) => `Quel volume d’eau boit-${il(p)} ?`,
    avecPart: (p, x, N) => `${p.nom} boit ${x} mL de sa gourde de ${N} mL.`,
    demTaux: (p) => `Quel pourcentage de sa gourde boit-${il(p)} ?`,
  },
  {
    tot: [10, 12, 20, 40], u: "km",
    avecTaux: (p, N, t) => `La randonnée ${de(p.nom)} fait ${N} km. ${t} % du trajet est en montée.`,
    demPart: () => "Combien de kilomètres sont en montée ?",
    avecPart: (p, x, N) => `Sur sa randonnée de ${N} km, ${p.nom} monte pendant ${x} km.`,
    demTaux: () => "Quel pourcentage du trajet est en montée ?",
  },
  {
    tot: [20, 40, 60, 80, 120], u: "adhérents",
    avecTaux: (p, N, t) => `Le club de judo ${de(p.nom)} compte ${N} adhérents. ${t} % sont des filles.`,
    demPart: () => "Combien de filles y a-t-il dans ce club ?",
    avecPart: (p, x, N) => `Le club de judo ${de(p.nom)} compte ${x} filles sur ${N} adhérents.`,
    demTaux: () => "Quel pourcentage des adhérents sont des filles ?",
  },
  {
    tot: [40, 60, 80, 200], u: "arbres",
    avecTaux: (p, N, t) => `Le verger du grand-père ${de(p.nom)} compte ${N} arbres. ${t} % sont des pommiers.`,
    demPart: () => "Combien y a-t-il de pommiers ?",
    avecPart: (p, x, N) => `Dans le verger du grand-père ${de(p.nom)}, ${x} arbres sur ${N} sont des pommiers.`,
    demTaux: () => "Quel pourcentage des arbres sont des pommiers ?",
  },
  {
    tot: [20, 40, 60, 80], u: "mangues",
    avecTaux: (p, N, t) => `Au marché de Saint-Pierre, ${p.nom} achète ${N} mangues. ${t} % sont déjà mûres.`,
    demPart: () => "Combien de mangues sont mûres ?",
    avecPart: (p, x, N) => `Au marché de Saint-Pierre, ${p.nom} achète ${N} mangues, dont ${x} déjà mûres.`,
    demTaux: () => "Quel pourcentage des mangues sont mûres ?",
  },
  {
    tot: [20, 24, 25, 28, 30], u: "élèves",
    avecTaux: (p, N, t) => `Dans la classe ${de(p.nom)}, il y a ${N} élèves. ${t} % ont un animal.`,
    demPart: () => "Combien d’élèves ont un animal ?",
    avecPart: (p, x, N) => `Dans la classe ${de(p.nom)}, ${x} élèves sur ${N} ont un animal.`,
    demTaux: () => "Quel pourcentage des élèves ont un animal ?",
  },
  {
    tot: [40, 60, 80, 120, 200], u: "€",
    avecTaux: (p, N, t) => `${p.nom} a ${N} € dans sa tirelire. ${cap(il(p))} en dépense ${t} % pour un cadeau.`,
    demPart: (p) => `Combien d’euros dépense-t-${il(p)} ?`,
    avecPart: (p, x, N) => `${p.nom} dépense ${x} € des ${N} € de sa tirelire pour un cadeau.`,
    demTaux: (p) => `Quel pourcentage de sa tirelire dépense-t-${il(p)} ?`,
  },
  {
    tot: [20, 40, 50, 80], u: "m²",
    avecTaux: (p, N, t) => `Le potager ${de(p.nom)} mesure ${N} m². Les tomates en occupent ${t} %.`,
    demPart: () => "Quelle surface occupent les tomates ?",
    avecPart: (p, x, N) => `Dans le potager ${de(p.nom)}, qui mesure ${N} m², les tomates occupent ${x} m².`,
    demTaux: () => "Quel pourcentage du potager les tomates occupent-elles ?",
  },
  {
    tot: [40, 50, 80, 120], u: "chansons",
    avecTaux: (p, N, t) => `La playlist ${de(p.nom)} contient ${N} chansons. ${t} % sont en anglais.`,
    demPart: () => "Combien de chansons sont en anglais ?",
    avecPart: (p, x, N) => `La playlist ${de(p.nom)} contient ${N} chansons, dont ${x} en anglais.`,
    demTaux: () => "Quel pourcentage des chansons sont en anglais ?",
  },
];

const TAUX_SIMPLES = [10, 20, 25, 50];
const TAUX_5E = [5, 10, 15, 20, 25, 30, 40, 60, 75];
/** Un total et un taux qui donnent une part entière. */
function tirerPct(s: SituationPct, taux: number[]) {
  for (;;) {
    const N = randomChoice(s.tot);
    const t = randomChoice(taux.filter((x) => x <= (s.tmax ?? 100)));
    if ((N * t) % 100 === 0) return { N, t, part: (N * t) / 100 };
  }
}

/**
 * Pourcentages. mode « part » : t % de N ; « taux » : quel pourcentage ? ;
 * « calcul » : calcul pur, forme variée ; « qcm » : la part, en QCM.
 */
function genPourcentage(modes: Array<"part" | "taux" | "calcul" | "qcm">, taux: number[]) {
  const mode = randomChoice(modes);
  const p = prenom();
  if (mode === "calcul") {
    const N = randomChoice([20, 40, 60, 80, 120, 140, 160, 200, 240, 300, 360, 500]);
    let t: number;
    do t = randomChoice(taux);
    while ((N * t) % 100 !== 0);
    const rep = (N * t) / 100;
    const forme = randomChoice([
      `Calcule ${t} % de ${N}.`,
      `Que vaut ${t} % de ${N} ?`,
      `Combien font ${t} % de ${N} ?`,
      `Complète : ${t} % de ${N} = …`,
      `Donne la valeur de ${t} % de ${N}.`,
      `${p.nom} calcule ${t} % de ${N} de tête. Que doit-${il(p)} trouver ?`,
      `En calcul mental, ${p.nom} cherche ${t} % de ${N}. Quel est le résultat ?`,
      `${p.nom} dit : « ${t} % de ${N}, c’est facile ! » Combien cela fait-il ?`,
    ]);
    return {
      text: forme,
      format: "short" as const,
      expected: [nb(rep)],
      comparator: "number_equal" as const,
      explanation: explique(
        "prendre t % d’une quantité, c’est la multiplier par t, puis diviser par 100.",
        `${N} × ${t} ÷ 100 = ${N * t} ÷ 100 = ${nb(rep)}.`,
        `${t} % de ${N}, c’est ${nb(rep)}.`,
      ),
    };
  }
  const s = randomChoice(SITUATIONS_PCT);
  const { N, t, part } = tirerPct(s, taux);
  if (mode === "taux") {
    return {
      text: `${s.avecPart(p, String(part), String(N))} ${s.demTaux(p)}`,
      format: "short" as const,
      expected: [`${t} %`],
      comparator: "number_equal" as const,
      explanation: explique(
        "un pourcentage, c’est une proportion ramenée à 100 : on divise la part par le total, puis on multiplie par 100.",
        `${part} ÷ ${N} = ${nb(part / N)} et ${nb(part / N)} × 100 = ${t}.`,
        `cela fait ${t} %.`,
      ),
    };
  }
  const explication = explique(
    "prendre t % d’une quantité, c’est la multiplier par t, puis diviser par 100.",
    `${N} × ${t} ÷ 100 = ${N * t} ÷ 100 = ${part}.`,
    `la réponse est ${avecU(part, s.u)}.`,
  );
  const text = `${s.avecTaux(p, String(N), t)} ${s.demPart(p)}`;
  if (mode === "qcm") {
    const pieges = [t, N - part, part * 10, r2(part / 10), part + t, N];
    return {
      text,
      format: "qcm" as const,
      choices: choixNombres(part, pieges.filter((x) => x !== part && Number.isInteger(x)), s.u),
      expected: [avecU(part, s.u)],
      comparator: "mcq_exact" as const,
      explanation: explication,
    };
  }
  return { text, format: "short" as const, expected: attendu(part, s.u), comparator: "number_equal" as const, explanation: explication };
}

/* =========================================================
   COEFFICIENT MULTIPLICATEUR ET ÉVOLUTIONS — 09/10/2026.
   ========================================================= */
type Grandeur = { nom: (p: Prenom) => string; u: string; v: number[]; baisse: boolean };
const GRANDEURS_EVOL: Grandeur[] = [
  { nom: (p) => `le prix du vélo que veut ${p.nom}`, u: "€", v: [120, 160, 200, 240, 300], baisse: true },
  { nom: (p) => `le nombre d’abonnés de la chaîne ${de(p.nom)}`, u: "abonnés", v: [200, 400, 600, 800, 1200], baisse: true },
  { nom: () => "le prix du ticket de cinéma", u: "€", v: [8, 10, 12], baisse: true },
  { nom: (p) => `la population du village où vit ${p.nom}`, u: "habitants", v: [1200, 1600, 2000, 2400], baisse: true },
  { nom: () => "le prix de l’abonnement à la piscine", u: "€", v: [40, 60, 80, 120], baisse: true },
  { nom: () => "le nombre de visiteurs du zoo le dimanche", u: "visiteurs", v: [400, 600, 800, 1000], baisse: true },
  { nom: (p) => `le prix des baskets que veut ${p.nom}`, u: "€", v: [60, 80, 100, 120], baisse: true },
  { nom: (p) => `la taille du tournesol ${de(p.nom)}`, u: "cm", v: [40, 60, 80, 120], baisse: false },
  { nom: (p) => `le temps d’écran ${de(p.nom)} par semaine`, u: "min", v: [300, 400, 600, 800], baisse: true },
  { nom: (p) => `la facture d’eau de la famille ${de(p.nom)}`, u: "€", v: [40, 60, 80, 120], baisse: true },
  { nom: () => "le nombre d’élèves inscrits au club de théâtre", u: "élèves", v: [20, 40, 60, 80], baisse: true },
  { nom: () => "le prix d’un kilogramme de letchis au marché de Saint-Paul", u: "€", v: [4, 6, 8, 10], baisse: true },
];
const coeffDe = (t: number, hausse: boolean) => r2(hausse ? 1 + t / 100 : 1 - t / 100);
const motEvol = (hausse: boolean) => (hausse ? randomChoice(["augmente", "est en hausse"]) : randomChoice(["baisse", "diminue", "est en baisse"]));

/**
 * Coefficient multiplicateur. niveau 3 : taux → coefficient (court ou QCM),
 * coefficient → évolution (QCM) ; niveau 4 : appliquer le coefficient, ou
 * retrouver le taux.
 */
function genCoeffMult(niveau: 3 | 4) {
  const g = randomChoice(GRANDEURS_EVOL);
  const p = prenom();
  const hausse = !g.baisse || Math.random() < 0.5;
  // Hors des prix, les valeurs de départ sont des multiples de 20 : avec un taux
  // multiple de 5, la nouvelle valeur reste entière (pas 40,8 habitants).
  const t = randomChoice(niveau === 3 ? [5, 10, 15, 20, 25, 30, 40, 50] : g.u === "€" ? [2, 4, 8, 12, 15, 20, 35, 60] : [5, 10, 15, 20, 25, 30, 40, 60]);
  const c = coeffDe(t, hausse);
  const nom = g.nom(p);
  const sens = hausse ? "hausse" : "baisse";
  const mode = niveau === 3 ? rint(1, 3) : rint(4, 5);
  if (mode === 1 || mode === 2) {
    const text = randomChoice([
      `${cap(nom)} ${motEvol(hausse)} de ${t} %. Par quel nombre multiplie-t-on ${nom} ?`,
      `${cap(nom)} ${motEvol(hausse)} de ${t} %. Quel est le coefficient multiplicateur de cette ${sens} ?`,
      `${cap(nom)} ${motEvol(hausse)} de ${t} %. Quel coefficient multiplicateur faut-il appliquer ?`,
    ]);
    const explication = explique(
      hausse ? `une hausse de ${t} % : on garde 100 % et on ajoute ${t} %, soit ${100 + t} %.` : `une baisse de ${t} % : il reste 100 % − ${t} % = ${100 - t} %.`,
      `${hausse ? 100 + t : 100 - t} % = ${hausse ? 100 + t : 100 - t} ÷ 100 = ${nb(c)}.`,
      `le coefficient multiplicateur est ${nb(c)}.`,
    );
    if (mode === 2) {
      // pièges : l'autre sens, le taux seul (0,15), le pourcentage non divisé (85), 1 + 0,15 pour une baisse
      const pieges = [coeffDe(t, !hausse), r2(t / 100), hausse ? 100 + t : 100 - t, r2(hausse ? t / 10 : 1 + t / 100)];
      return { text, format: "qcm" as const, choices: choixNombres(c, pieges, "", (v) => nb(v)), expected: [nb(c)], comparator: "mcq_exact" as const, explanation: explication };
    }
    return { text, format: "short" as const, expected: [nb(c)], comparator: "number_equal" as const, explanation: explication };
  }
  if (mode === 3) {
    const bon = `une ${sens} de ${t} %`;
    const contraire = hausse ? "baisse" : "hausse";
    const autres = [...new Set([`une ${contraire} de ${t} %`, `une ${sens} de ${Math.round(c * 100)} %`, `une ${contraire} de ${Math.round(c * 100)} %`, `une ${sens} de ${t * 10} %`])]
      .filter((x) => x !== bon)
      .slice(0, 3);
    return {
      text: `${cap(nom)} est multiplié${/^la /.test(nom) ? "e" : ""} par ${nb(c)}. Que se passe-t-il ?`,
      format: "qcm" as const,
      choices: shuffle([bon, ...autres]),
      expected: [bon],
      comparator: "mcq_exact" as const,
      explanation: explique(
        "un coefficient plus grand que 1 donne une hausse, plus petit que 1 une baisse.",
        `${nb(c)} = ${Math.round(c * 100)} %, et ${Math.round(c * 100)} % − 100 % = ${hausse ? "+" : "−"}${t} %.`,
        `c’est ${bon}.`,
      ),
    };
  }
  if (mode === 4) {
    // appliquer le coefficient
    let V: number;
    let nv: number;
    do {
      V = randomChoice(g.v);
      nv = r2(V * c);
    } while (g.u !== "€" && !Number.isInteger(nv));
    const valeur = `${nb(V, g.u)} ${g.u}`;
    const Il = /^la /.test(nom) ? "Elle" : "Il";
    return {
      text: randomChoice([
        `${cap(nom)} est de ${valeur}. ${Il} ${motEvol(hausse)} de ${t} %. Multiplie par le coefficient multiplicateur : quelle est la nouvelle valeur ?`,
        `${cap(nom)} vaut ${valeur}, puis ${motEvol(hausse)} de ${t} %. Calcule la nouvelle valeur avec le coefficient multiplicateur.`,
        `Au départ, ${nom} est de ${valeur}. Après une ${sens} de ${t} %, que vaut-${Il === "Il" ? "il" : "elle"} ? Utilise le coefficient multiplicateur.`,
      ]),
      format: "short" as const,
      expected: attendu(nv, g.u),
      comparator: "number_equal" as const,
      explanation: explique(
        `${hausse ? `hausse de ${t} %` : `baisse de ${t} %`} : coefficient ${nb(c)}.`,
        `${nb(V, g.u)} × ${nb(c)} = ${nb(nv, g.u)}.`,
        `la nouvelle valeur est ${avecU(nv, g.u)}${MESURES.has(g.u) ? "" : ` ${g.u}`}.`,
      ),
    };
  }
  // coefficient → taux
  return {
    text: randomChoice([
      `${cap(nom)} est multiplié${/^la /.test(nom) ? "e" : ""} par ${nb(c)}. De quel pourcentage ${hausse ? "augmente" : "baisse"}-t-${/^la /.test(nom) ? "elle" : "il"} ?`,
      `On multiplie ${nom} par ${nb(c)}. C’est une ${sens} de combien de pour cent ?`,
    ]),
    format: "short" as const,
    expected: [`${t} %`],
    comparator: "number_equal" as const,
    explanation: explique(
      "le coefficient multiplicateur, écrit en pourcentage, se compare à 100 %.",
      `${nb(c)} = ${Math.round(c * 100)} % ; ${hausse ? `${Math.round(c * 100)} − 100` : `100 − ${Math.round(c * 100)}`} = ${t}.`,
      `c’est une ${sens} de ${t} %.`,
    ),
  };
}

const ARTICLES: Array<{ nom: string; prix: number[] }> = [
  { nom: "un sac à dos", prix: [24, 30, 36, 40, 45] },
  { nom: "une trottinette", prix: [60, 80, 90, 120] },
  { nom: "un ballon de foot", prix: [15, 20, 24, 25, 30] },
  { nom: "une paire de rollers", prix: [40, 50, 60, 75] },
  { nom: "un casque audio", prix: [25, 35, 40, 48] },
  { nom: "une guitare", prix: [80, 120, 150, 160] },
  { nom: "un jeu de société", prix: [18, 20, 24, 32] },
  { nom: "une montre", prix: [30, 40, 45, 60] },
  { nom: "une tente de camping", prix: [70, 90, 120, 140] },
  { nom: "un skateboard", prix: [45, 50, 64, 80] },
  { nom: "une raquette de tennis", prix: [35, 40, 55, 70] },
  { nom: "un aquarium", prix: [50, 64, 75, 90] },
];

/** Défis : nouveau prix (niveau 4), évolutions successives et prix de départ (niveau 5). */
function genRatioDefi(niveau: 4 | 5) {
  const a = randomChoice(ARTICLES);
  const p = prenom();
  const mode = niveau === 4 ? 1 : rint(2, 3);
  if (mode === 1) {
    const hausse = Math.random() < 0.4;
    const V = randomChoice(a.prix);
    const t = randomChoice([5, 10, 15, 20, 25, 30, 40]);
    const c = coeffDe(t, hausse);
    const nv = r2(V * c);
    const text = hausse
      ? randomChoice([
          `${p.nom} voulait acheter ${a.nom} à ${nb(V, "€")} €, mais son prix augmente de ${t} %. Quel est le nouveau prix ?`,
          `Le prix d’${a.nom} était de ${nb(V, "€")} €. Il augmente de ${t} %. Combien ${p.nom} paiera-t-${il(p)} ?`,
        ])
      : randomChoice([
          `Pendant les soldes, ${a.nom} à ${nb(V, "€")} € est vendu${a.nom.startsWith("une") ? "e" : ""} avec une remise de ${t} %. Combien ${p.nom} va-t-${il(p)} payer ?`,
          `${p.nom} achète ${a.nom} affiché${a.nom.startsWith("une") ? "e" : ""} ${nb(V, "€")} €, avec une réduction de ${t} %. Quel prix paie-t-${il(p)} ?`,
          `Le prix d’${a.nom} baisse de ${t} % : il était de ${nb(V, "€")} €. Quel est le nouveau prix que paiera ${p.nom} ?`,
        ]);
    return {
      text,
      format: "short" as const,
      expected: attendu(nv, "€"),
      comparator: "number_equal" as const,
      explanation: explique(
        `${hausse ? "hausse" : "baisse"} de ${t} % : on multiplie par ${nb(c)}.`,
        `${nb(V, "€")} × ${nb(c)} = ${nb(nv, "€")}.`,
        `le nouveau prix est ${nb(nv, "€")} €.`,
      ),
    };
  }
  if (mode === 2) {
    // deux évolutions successives
    let V: number;
    let t1: number;
    let t2: number;
    let fin: number;
    do {
      V = randomChoice([...a.prix, 100, 200]);
      t1 = randomChoice([10, 20, 25, 50]);
      t2 = randomChoice([10, 20, 25, 50]);
      fin = V * (1 + t1 / 100) * (1 - t2 / 100);
    } while (!Number.isInteger(Math.round(fin * 100 * 1e6) / 1e6));
    const mid = r2(V * (1 + t1 / 100));
    fin = r2(fin);
    return {
      text: randomChoice([
        `${cap(a.nom)} coûte ${nb(V, "€")} €. Son prix augmente de ${t1} %, puis baisse de ${t2} %. Quel est le prix final ?`,
        `${p.nom} surveille le prix d’${a.nom} : ${nb(V, "€")} €. Le prix augmente de ${t1} %, puis baisse de ${t2} %. Combien coûte-t-${a.nom.startsWith("une") ? "elle" : "il"} à la fin ?`,
      ]),
      format: "short" as const,
      expected: attendu(fin, "€"),
      comparator: "number_equal" as const,
      explanation: explique(
        "la seconde évolution se calcule sur le NOUVEAU prix, pas sur le prix de départ.",
        `${nb(V, "€")} × ${nb(1 + t1 / 100)} = ${nb(mid, "€")} ; puis ${nb(mid, "€")} × ${nb(1 - t2 / 100)} = ${nb(fin, "€")}.`,
        `le prix final est ${nb(fin, "€")} €${t1 === t2 ? " : il ne revient pas au prix de départ" : ""}.`,
      ),
    };
  }
  // prix avant la remise
  let V: number;
  let t: number;
  let P: number;
  do {
    V = randomChoice(a.prix);
    t = randomChoice([10, 20, 25, 40, 50]);
    P = r2(V * (1 - t / 100));
  } while (!Number.isInteger(P * 10));
  return {
    text: randomChoice([
      `Après une remise de ${t} %, ${p.nom} paie ${a.nom} ${nb(P, "€")} €. Quel était le prix avant la remise ?`,
      `${p.nom} a payé ${nb(P, "€")} € pour ${a.nom}, avec une réduction de ${t} %. Quel était le prix de départ, avant la réduction ?`,
    ]),
    format: "short" as const,
    expected: attendu(V, "€"),
    comparator: "number_equal" as const,
    explanation: explique(
      `après une remise de ${t} %, on paie ${100 - t} % du prix de départ : prix payé = prix de départ × ${nb(1 - t / 100)}.`,
      `prix de départ = ${nb(P, "€")} ÷ ${nb(1 - t / 100)} = ${nb(V, "€")}.`,
      `le prix avant la remise était ${nb(V, "€")} €.`,
    ),
  };
}

export const proportionnaliteBank: TutorBankItemV4[] = [
  // =========================
  // PROP_RECONNAITRE
  // =========================
  // 08/10/2026 : précise et simple (Frédéric) — oui/non en QCM, plus de mot-clé.
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Si 3 cahiers coûtent 9 € et 6 cahiers coûtent 18 €, la situation est-elle proportionnelle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Quand on multiplie la quantité par un nombre, le prix doit être multiplié par le même nombre.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("On passe de 3 à 6 cahiers en multipliant par 2. Le prix passe aussi de 9 € à 18 € en multipliant par 2. La situation est donc proportionnelle.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Si 4 billets coûtent 10 € et 8 billets coûtent 21 €, la situation est-elle proportionnelle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Si on double la quantité, l’autre grandeur doit aussi doubler.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("On passe de 4 à 8 billets en multipliant par 2. Si la situation était proportionnelle, le prix devrait passer de 10 € à 20 €. Or on obtient 21 €. La situation n’est donc pas proportionnelle.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, 2 ananas coûtent 6 € et 5 ananas coûtent 15 €. La situation est-elle proportionnelle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Vérifie si le prix d’un ananas reste le même.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("2 ananas coûtent 6 €, donc 1 ananas coûte 3 €. 5 ananas coûtent 15 €, donc 1 ananas coûte aussi 3 €. Le prix unitaire reste constant : la situation est proportionnelle.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "reconnaitre", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle situation est proportionnelle ?",
    format: "qcm",
    choices: [
      "2 stylos coûtent 4 € et 6 stylos coûtent 12 €",
      "3 tickets coûtent 9 € et 5 tickets coûtent 16 €",
      "4 jus coûtent 8 € et 8 jus coûtent 17 €",
      "5 cahiers coûtent 10 € et 10 cahiers coûtent 19 €",
    ],
    expected: ["2 stylos coûtent 4 € et 6 stylos coûtent 12 €"],
    comparator: "mcq_exact",
    hint: "Cherche le cas où les deux grandeurs sont multipliées par le même coefficient.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Dans la bonne réponse, on passe de 2 à 6 stylos en multipliant par 3, et le prix passe de 4 € à 12 € en multipliant aussi par 3.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle situation traduit une proportionnalité ?",
    format: "qcm",
    choices: [
      "1 bouteille recyclée donne 2 points, 4 bouteilles donnent 8 points",
      "2 arbres plantés donnent 5 badges, 4 arbres donnent 9 badges",
      "3 affiches collées coûtent 6 €, 6 affiches coûtent 13 €",
      "5 gourdes coûtent 20 €, 10 gourdes coûtent 39 €",
    ],
    expected: ["1 bouteille recyclée donne 2 points, 4 bouteilles donnent 8 points"],
    comparator: "mcq_exact",
    hint: "Dans une situation proportionnelle, le rapport reste le même.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Dans la bonne réponse, on passe de 1 à 4 en multipliant par 4, et les points passent de 2 à 8 en multipliant aussi par 4.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm", "neutral"],
  },

  // =========================
  // PROP_TABLE
  // =========================
  {
    kind: "fixed",
    id: "prop_table_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Si 3 cahiers coûtent 12 €, combien coûtent 9 cahiers ?",
    format: "short",
    expected: formatEuro(36),
    comparator: "number_equal",
    hint: "De 3 à 9, on multiplie par 3.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("On passe de 3 à 9 cahiers en multipliant par 3. Le prix est donc multiplié par 3 : 12 × 3 = 36 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "tableau"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Si 8 stylos coûtent 20 €, combien coûtent 4 stylos ?",
    format: "short",
    expected: formatEuro(10),
    comparator: "number_equal",
    hint: "4 est la moitié de 8.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("4 stylos, c’est la moitié de 8 stylos. Le prix est donc la moitié de 20 €, soit 10 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "tableau"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "reunion",
    text: "À La Réunion, 4 samoussas coûtent 8 €. Combien coûtent 10 samoussas ?",
    format: "short",
    expected: formatEuro(20),
    comparator: "number_equal",
    hint: "Commence par trouver le prix d’un samoussa.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("4 samoussas coûtent 8 €, donc 1 samoussa coûte 2 €. Alors 10 samoussas coûtent 10 × 2 = 20 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "tableau", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_table_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "sport",
    text: "Pour un tournoi, 5 bouteilles d’eau coûtent 15 €. Combien coûtent 15 bouteilles ?",
    format: "qcm",
    choices: ["30 €", "35 €", "45 €", "60 €"],
    expected: ["45 €"],
    comparator: "mcq_exact",
    hint: "De 5 à 15, on multiplie par 3.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("On passe de 5 à 15 bouteilles en multipliant par 3. Le prix passe donc de 15 € à 45 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "tableau", "sport", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_table_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour une recette, 6 œufs coûtent 12 €. Combien coûtent 3 œufs ?",
    format: "qcm",
    choices: ["3 €", "4 €", "6 €", "9 €"],
    expected: ["6 €"],
    comparator: "mcq_exact",
    hint: "3 est la moitié de 6.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("3 œufs, c’est la moitié de 6 œufs. Le prix est donc la moitié de 12 €, soit 6 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "tableau", "cuisine", "qcm"],
  },

  // =========================
  // PROP_QUATRIEME
  // =========================
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 4 objets coûtent 12 €. 7 objets coûtent ... €",
    format: "short",
    expected: formatEuro(21),
    comparator: "number_equal",
    hint: "Passe par l’unité ou par le coefficient.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("4 objets coûtent 12 €, donc 1 objet coûte 3 €. Alors 7 objets coûtent 7 × 3 = 21 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle"],
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 3 kg de pommes coûtent 9 €. 11 kg coûtent ... €",
    format: "short",
    expected: formatEuro(33),
    comparator: "number_equal",
    hint: "Cherche d’abord le prix de 1 kg.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("3 kg coûtent 9 €, donc 1 kg coûte 3 €. Alors 11 kg coûtent 11 × 3 = 33 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle"],
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché forain, 5 mangues coûtent 15 €. Combien coûtent 9 mangues ?",
    format: "qcm",
    choices: ["24 €", "25 €", "27 €", "30 €"],
    expected: ["27 €"],
    comparator: "mcq_exact",
    hint: "Calcule le prix d’une mangue.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("5 mangues coûtent 15 €, donc 1 mangue coûte 3 €. Alors 9 mangues coûtent 27 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "qcm", "reunion"],
  },

  // =========================
  // PROP_COEFF
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Si 4 stylos coûtent 20 €, quel est le coefficient de proportionnalité ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Le coefficient est le prix de 1 stylo.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("4 stylos coûtent 20 €, donc 1 stylo coûte 20 ÷ 4 = 5 €. Le coefficient de proportionnalité est 5.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une situation de proportionnalité, si 1 ticket coûte 3 €, quel nombre multiplie le nombre de tickets pour obtenir le prix ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Prix = quantité × coefficient.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Chaque ticket coûte 3 €. Pour obtenir le prix total, on multiplie le nombre de tickets par 3. Le coefficient est donc 3.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "8 gourdes coûtent 24 €. Quel est le coefficient de proportionnalité ?",
    format: "qcm",
    choices: ["2", "3", "8", "24"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Calcule le prix pour 1 gourde.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("24 ÷ 8 = 3. Le coefficient de proportionnalité est 3.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient", "qcm", "neutral"],
  },

  // =========================
  // PROP_RATIO
  // =========================
  // 08/10/2026 : précise et simple (Frédéric) — écriture unique « 2:3 » (exact_text ;
  // « 2 : 3 » et « 2/3 » passent par la normalisation du comparateur).
  {
    kind: "fixed",
    id: "prop_rapport_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 2,
    theme: "cuisine",
    text: "Dans un mélange, il y a 2 doses de sirop pour 3 doses d’eau. Écris le ratio sirop:eau (exemple : 1:4).",
    format: "short",
    expected: ["2:3", "2 : 3", "2 pour 3"],
    comparator: "exact_text",
    hint: "Écris les deux quantités dans l’ordre demandé.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Le mélange contient 2 doses de sirop et 3 doses d’eau. Le ratio sirop:eau est donc 2:3.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "ratio", "cuisine"],
  },
  // 08/10/2026 : précise et simple (Frédéric) — l'énoncé dit « sans le simplifier » :
  // une seule réponse, 4:6.
  {
    kind: "fixed",
    id: "prop_rapport_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 2,
    theme: "sport",
    text: "Dans une équipe, il y a 4 filles et 6 garçons. Écris le ratio filles:garçons, sans le simplifier.",
    format: "short",
    expected: ["4:6", "4 : 6", "4 pour 6"],
    comparator: "exact_text",
    hint: "Écris les deux nombres de l’énoncé, dans l’ordre demandé.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Il y a 4 filles pour 6 garçons. Le ratio filles:garçons est donc 4:6.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "ratio", "sport"],
  },
  {
    kind: "fixed",
    id: "prop_rapport_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "reunion",
    text: "Pour faire un jus, on mélange 1 dose de sirop avec 4 doses d’eau. Si on utilise 3 doses de sirop, combien faut-il de doses d’eau ?",
    format: "qcm",
    choices: ["7", "9", "12", "15"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "Le ratio 1:4 doit être conservé.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Le ratio est 1 dose de sirop pour 4 doses d’eau. Avec 3 doses de sirop, il faut 3 × 4 = 12 doses d’eau.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "ratio", "qcm", "reunion"],
  },

  // =========================
  // PROP_POURCENTAGE
  // =========================
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "20 % de 50 vaut combien ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "20 %, c’est 20 sur 100, soit 0,2.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("20 % de 50 = 0,2 × 50 = 10.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "pourcentage"],
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "25 % de 80 vaut combien ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "25 %, c’est le quart.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("25 % correspond à un quart. Un quart de 80 vaut 20.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "pourcentage"],
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un collège, 30 % des 200 élèves viennent à vélo. Combien cela représente-t-il d’élèves ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Calcule 30 % de 200.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("30 % de 200 = 0,3 × 200 = 60. Cela représente 60 élèves.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "pourcentage", "neutral"],
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    text: "Un tee-shirt coûte 40 €. Il y a 10 % de réduction. Quel est le montant de la réduction ?",
    format: "qcm",
    choices: ["2 €", "4 €", "8 €", "10 €"],
    expected: ["4 €"],
    comparator: "mcq_exact",
    hint: "10 % de 40, c’est 4.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("10 % de 40 € = 4 €. La réduction est donc de 4 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "pourcentage", "qcm", "soldes"],
  },

  // =========================
  // PROP_COEFF_MULT
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Une hausse de 20 % correspond à quel coefficient multiplicateur ?",
    format: "short",
    expected: ["1,2", "1.2"],
    comparator: "number_equal",
    hint: "Pour une hausse de p %, on multiplie par 1 + p/100.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Une hausse de 20 % signifie qu’on garde 100 % puis on ajoute 20 %, soit 120 % = 1,2. Le coefficient multiplicateur est donc 1,2.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Une réduction de 15 % correspond à quel coefficient multiplicateur ?",
    format: "short",
    expected: ["0,85", "0.85"],
    comparator: "number_equal",
    hint: "Pour une baisse de p %, on multiplie par 1 - p/100.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Après une réduction de 15 %, il reste 85 % du prix initial, soit 0,85. Le coefficient multiplicateur est donc 0,85.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Quel coefficient multiplicateur correspond à une hausse de 5 % ?",
    format: "qcm",
    choices: ["0,95", "1,05", "1,5", "5"],
    expected: ["1,05"],
    comparator: "mcq_exact",
    hint: "On garde 100 % et on ajoute 5 %.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("100 % + 5 % = 105 %, soit 1,05. Le coefficient multiplicateur est 1,05.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "qcm", "soldes"],
  },

  // =========================
  // PROP_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "prop_probleme_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "cuisine",
    text: "Pour 4 personnes, il faut 300 g de riz. Quelle quantité faut-il pour 10 personnes ?",
    format: "short",
    expected: ["750", "750 g", "750g"],
    comparator: "number_equal",
    hint: "Passe à 1 personne puis multiplie par 10.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Pour 4 personnes, il faut 300 g. Donc pour 1 personne, il faut 300 ÷ 4 = 75 g. Pour 10 personnes, il faut 75 × 10 = 750 g.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "probleme", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché, 3 kg de tomates coûtent 7,50 €. Combien coûtent 8 kg ?",
    format: "short",
    expected: ["20", "20€", "20 €"],
    comparator: "number_equal",
    hint: "Trouve d’abord le prix de 1 kg.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("3 kg coûtent 7,50 €, donc 1 kg coûte 2,50 €. Alors 8 kg coûtent 8 × 2,50 = 20 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "sport",
    text: "Une équipe marque 18 points en 6 matchs. En gardant le même rythme, combien marquerait-elle en 15 matchs ?",
    format: "qcm",
    choices: ["36", "42", "45", "54"],
    expected: ["45"],
    comparator: "mcq_exact",
    hint: "Calcule le nombre de points par match.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("18 points en 6 matchs, cela fait 3 points par match. En 15 matchs, l’équipe marquerait 15 × 3 = 45 points.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "probleme", "sport", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un sac coûte 60 €. Il y a 20 % de réduction. Quel est le nouveau prix ?",
    format: "qcm",
    choices: ["12 €", "40 €", "48 €", "72 €"],
    expected: ["48 €"],
    comparator: "mcq_exact",
    hint: "Calcule la réduction, puis retire-la au prix initial.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("20 % de 60 € = 12 €. Le nouveau prix est donc 60 € - 12 € = 48 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "probleme", "pourcentage", "qcm", "soldes"],
  },

  // =========================
  // PROP_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "prop_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_defi",
    difficulty: 4,
    theme: "cuisine",
    text: "Une boisson est préparée avec un ratio sirop:eau de 2:5. Si on utilise 8 verres de sirop, combien faut-il de verres d’eau ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "De 2 à 8, on multiplie par 4.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Le ratio est 2:5. Si on passe de 2 verres de sirop à 8 verres, on multiplie par 4. Il faut donc 5 × 4 = 20 verres d’eau.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "ratio", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un prix augmente de 20 %. Il valait 50 €. Quel est le nouveau prix ?",
    format: "short",
    expected: formatEuro(60),
    comparator: "number_equal",
    hint: "Tu peux utiliser le coefficient multiplicateur 1,2.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Une hausse de 20 % correspond au coefficient multiplicateur 1,2. On calcule donc 50 × 1,2 = 60 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "coefficient_multiplicateur", "neutral"],
  },
  // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi 5 tickets
  // à 12 € et 10 tickets à 25 € n'est pas proportionnel ». Désormais : le prix
  // qu'il FAUDRAIT (24 €), qui montre l'écart avec 25 €.
  {
    kind: "fixed",
    id: "prop_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    text: "5 tickets coûtent 12 €. Si le prix est proportionnel, combien coûtent 10 tickets ?",
    format: "short",
    expected: ["24 €", "24"],
    comparator: "number_equal",
    hint: "Si on double la quantité, le prix double aussi.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("De 5 à 10 tickets, on multiplie par 2. Le prix est aussi multiplié par 2 : 12 × 2 = 24 €. Un vendeur qui demande 25 € n’applique pas la proportionnalité.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "prop_defi_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, 6 bouchons coûtent 9 €. Combien coûtent 14 bouchons ?",
    format: "qcm",
    choices: ["18 €", "19 €", "21 €", "24 €"],
    expected: ["21 €"],
    comparator: "mcq_exact",
    hint: "Trouve d’abord le prix d’un bouchon.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("6 bouchons coûtent 9 €, donc 1 bouchon coûte 1,5 €. Alors 14 bouchons coûtent 14 × 1,5 = 21 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "qcm", "reunion"],
  },

  // =========================
  // TEMPLATES - PROP_RECONNAITRE
  // =========================
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie si le même coefficient transforme les deux grandeurs.",
    tags: ["prop_proportionnalite", "reconnaitre", "template"],
    // 09/10/2026 : situations × tournures × prénoms (voir genReconnaitre).
    generate: () => genReconnaitre(2),
  },
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_e1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Si une quantité double, l’autre doit doubler aussi.",
    tags: ["prop_proportionnalite", "reconnaitre", "template"],
    generate: () => genReconnaitre(1),
  },
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_e3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise la seconde grandeur par la première pour chaque relevé : trouve-t-on toujours le même nombre ?",
    tags: ["prop_proportionnalite", "reconnaitre", "template"],
    generate: () => genReconnaitre(3),
  },

  // =========================
  // TEMPLATES - PROP_TABLE
  // =========================
  {
    kind: "template",
    id: "prop_table_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe par le coefficient ou par l’unité.",
    tags: ["prop_proportionnalite", "tableau", "template"],
    // 09/10/2026 : un vrai tableau (2 ou 3 colonnes), situations × tournures × prénoms.
    generate: () => genTableau(randomChoice([1, 2] as const)),
  },
  {
    kind: "template",
    id: "prop_table_qcm_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche par combien la quantité est multipliée ou divisée.",
    tags: ["prop_proportionnalite", "tableau", "qcm", "template"],
    // 09/10/2026 : QCM sur un vrai tableau ; pièges : ajouter au lieu de multiplier, etc.
    generate: () => genTableau(randomChoice([1, 2] as const), true),
  },

  // =========================
  // TEMPLATES - PROP_QUATRIEME
  // =========================
  {
    kind: "template",
    id: "prop_quatrieme_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord la valeur pour 1 unité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "template"],
    // 09/10/2026 : situations × tournures × prénoms (voir genQuatrieme).
    generate: () => genQuatrieme(3),
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_e2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    hint: "Par combien la première quantité est-elle multipliée ? Fais pareil pour l’autre.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "template"],
    generate: () => genQuatrieme(randomChoice([1, 2] as const)),
  },

  // =========================
  // TEMPLATES - PROP_COEFF
  // =========================
  {
    kind: "template",
    id: "prop_coeff_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient est la valeur pour 1 unité.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    // 09/10/2026 : situations × tournures × prénoms (voir genCoeff).
    generate: () => genCoeff(2),
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_e1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 1,
    theme: "neutral",
    hint: "La valeur pour une unité : on divise par la quantité.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    generate: () => genCoeff(1),
  },

  // =========================
  // TEMPLATES - PROP_RATIO
  // =========================
  {
    kind: "template",
    id: "prop_rapport_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "cuisine",
    hint: "Le ratio doit rester le même.",
    tags: ["prop_proportionnalite", "ratio", "template"],
    // 09/10/2026 : situations × tournures × prénoms ; partage d'un total ; ratios égaux.
    generate: () => genRapport(3),
  },
  {
    kind: "template",
    id: "prop_rapport_tpl_e2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 2,
    theme: "neutral",
    hint: "Par combien a-t-on multiplié le premier nombre du ratio ? Multiplie l’autre par le même nombre.",
    tags: ["prop_proportionnalite", "ratio", "template"],
    generate: () => genRapport(2),
  },

  // =========================
  // TEMPLATES - PROP_POURCENTAGE
  // =========================
  {
    kind: "template",
    id: "prop_pourcentage_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "Un pourcentage, c’est une fraction sur 100.",
    tags: ["prop_proportionnalite", "pourcentage", "template"],
    // 09/10/2026 : en situation (la part, ou le pourcentage) ; plus de « 25/100 ».
    generate: () => genPourcentage(["part", "taux"], TAUX_5E),
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_e2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    hint: "10 %, c’est diviser par 10 ; 50 %, la moitié ; 25 %, le quart.",
    tags: ["prop_proportionnalite", "pourcentage", "template"],
    generate: () => genPourcentage(["part", "part", "calcul", "qcm"], TAUX_SIMPLES),
  },
  {
    kind: "template",
    id: "prop_pourcentage_qcm_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord le pourcentage demandé.",
    tags: ["prop_proportionnalite", "pourcentage", "qcm", "template"],
    // 09/10/2026 : QCM en situation ; pièges : le taux lui-même, le reste, × 10.
    generate: () => genPourcentage(["qcm"], TAUX_5E),
  },

  // =========================
  // TEMPLATES - PROP_COEFF_MULT
  // =========================
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour une hausse, on ajoute au 1 ; pour une baisse, on enlève au 1.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "template"],
    // 09/10/2026 : en situation ; court, QCM, ou le coefficient lu à l'envers.
    generate: () => genCoeffMult(3),
  },

  // =========================
  // TEMPLATES - PROP_PROBLEME
  // =========================
  {
    kind: "template",
    id: "prop_probleme_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "cuisine",
    hint: "Passe par l’unité.",
    tags: ["prop_proportionnalite", "probleme", "template"],
    // 09/10/2026 : situations × tournures × prénoms (voir genProbleme).
    generate: () => genProbleme(4),
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_e3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe par la valeur pour une unité, ou fais un produit en croix.",
    tags: ["prop_proportionnalite", "probleme", "template"],
    generate: () => genProbleme(3),
  },

  // =========================
  // TEMPLATES - PROP_DEFIS
  // =========================
  {
    kind: "template",
    id: "prop_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise le coefficient multiplicateur.",
    tags: ["prop_proportionnalite", "defi", "template"],
    // 09/10/2026 : nouveau prix après une hausse ou une remise, en situation.
    generate: () => genRatioDefi(4),
  },
  /* =========================
     ANCIENNES QUESTIONS OUVERTES — PROPORTIONNALITÉ
     08/10/2026 : précises et simples (Frédéric : « les questions open doivent
     être précises et simples »). Avant : « Explique comment… / pourquoi… »,
     corrigé par UN mot-clé (« 3 » suffisait). Désormais : un cas chiffré, un
     calcul, une seule réponse. Les id restent (historique des élèves).
  ========================= */
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "prop_reconnaitre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "3 cahiers coûtent 9 € et 6 cahiers coûtent 18 €. Le nombre de cahiers est multiplié par 2. Par combien le prix est-il multiplié ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Divise 18 par 9.",
    explanation: expl(
      "18 ÷ 9 = 2. Le prix est multiplié par 2, comme le nombre de cahiers. Les deux grandeurs sont multipliées par le même nombre : la situation est proportionnelle.",
    ),
    tags: ["prop_proportionnalite", "short", "reconnaitre"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "prop_table_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 3,
    theme: "neutral",
    text: "3 cahiers coûtent 12 €. Combien coûtent 9 cahiers ?",
    format: "short",
    expected: ["36 €", "36"],
    comparator: "number_equal",
    hint: "De 3 à 9, on multiplie par 3.",
    explanation: expl("De 3 à 9 cahiers, on multiplie par 3. Le prix est aussi multiplié par 3 : 12 × 3 = 36 €."),
    tags: ["prop_proportionnalite", "short", "tableau"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "prop_quatrieme_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    text: "4 objets coûtent 12 €. Combien coûtent 7 objets ?",
    format: "short",
    expected: ["21 €", "21"],
    comparator: "number_equal",
    hint: "Cherche d’abord le prix d’un objet.",
    explanation: expl("Un objet coûte 12 ÷ 4 = 3 €. Donc 7 objets coûtent 7 × 3 = 21 €."),
    tags: ["prop_proportionnalite", "short", "quatrieme_proportionnelle"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "prop_coeff_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    text: "4 stylos coûtent 20 €. Quel est le coefficient de proportionnalité (le prix d’un stylo) ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Divise le prix par le nombre de stylos.",
    explanation: expl("On divise le prix par la quantité : 20 ÷ 4 = 5. Le coefficient est 5 (un stylo coûte 5 €)."),
    tags: ["prop_proportionnalite", "short", "coefficient"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "prop_rapport_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "cuisine",
    text: "Le ratio sirop:eau est 2:5. On met 8 verres de sirop. Combien faut-il de verres d’eau ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "De 2 à 8, on multiplie par 4.",
    explanation: expl("De 2 à 8 verres de sirop, on multiplie par 4. On multiplie aussi l’eau par 4 : 5 × 4 = 20 verres d’eau."),
    tags: ["prop_proportionnalite", "short", "ratio"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "prop_pourcentage_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 25 % de 80.",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "25 %, c’est un quart.",
    explanation: expl("25 %, c’est un quart. Un quart de 80 : 80 ÷ 4 = 20. Donc 25 % de 80 = 20."),
    tags: ["prop_proportionnalite", "short", "pourcentage"],
  },
  // 08/10/2026 : précise et simple (Frédéric) — leurres : garder 15 % au lieu de
  // 85 % (0,15), confondre baisse et hausse (1,15).
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_coeff_multiplicateur",
    difficulty: 4,
    theme: "neutral",
    text: "Un prix baisse de 15 %. Par quel nombre le multiplie-t-on ?",
    format: "qcm",
    choices: ["0,85", "0,15", "1,15"],
    expected: ["0,85"],
    comparator: "mcq_exact",
    hint: "Après une baisse de 15 %, il reste 85 %.",
    explanation: expl("Après une baisse de 15 %, il reste 100 % − 15 % = 85 % du prix. Et 85 % = 0,85. On multiplie donc par 0,85."),
    tags: ["prop_proportionnalite", "qcm", "coefficient_multiplicateur"],
  },
  // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique son erreur »
  // (l'élève ajoutait au lieu de multiplier). Les leurres sont ces erreurs
  // d'addition : 12 + 10 = 22 (on ajoute l'écart des quantités), 12 + 15 = 27.
  {
    kind: "fixed",
    id: "prop_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    text: "5 tickets coûtent 12 €. Le prix est proportionnel. Combien coûtent 15 tickets ?",
    format: "qcm",
    choices: ["36 €", "22 €", "27 €"],
    expected: ["36 €"],
    comparator: "mcq_exact",
    hint: "En proportionnalité, on multiplie : on n’ajoute pas.",
    explanation: expl("De 5 à 15 tickets, on multiplie par 3. Le prix aussi : 12 × 3 = 36 €. Ajouter 10 (ou 15) au prix est une erreur : en proportionnalité, on multiplie."),
    tags: ["prop_proportionnalite", "qcm", "defi", "erreur"],
  },

  // =========================
  // TOP-UP — PROP_RECONNAITRE (+3)
  // =========================
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Si 5 places coûtent 25 € et 8 places coûtent 40 €, la situation est-elle proportionnelle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Calcule le prix d’une place dans chaque cas.",
    explanation: expl("25 ÷ 5 = 5 € et 40 ÷ 8 = 5 €. Le prix unitaire est constant : la situation est proportionnelle."),
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment vérifier
  // à partir d'un tableau ». Désormais : un tableau précis, qui n'est PAS
  // proportionnel à la dernière colonne (7 × 3 = 21, pas 20).
  {
    kind: "fixed",
    id: "prop_reconnaitre_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un tableau, 2 donne 6, 4 donne 12 et 7 donne 20. Est-ce un tableau de proportionnalité ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule 6 ÷ 2, 12 ÷ 4, puis 20 ÷ 7.",
    explanation: expl("6 ÷ 2 = 3 et 12 ÷ 4 = 3. Mais 7 × 3 = 21, pas 20. Le coefficient n’est pas toujours le même : ce n’est pas un tableau de proportionnalité."),
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle situation N’est PAS proportionnelle ?",
    format: "qcm",
    choices: [
      "l’âge d’une personne et sa taille",
      "le nombre de litres d’essence et le prix payé",
      "la masse de pommes et leur prix au kilo",
      "le nombre de billets et leur prix unitaire fixe",
    ],
    expected: ["l’âge d’une personne et sa taille"],
    comparator: "mcq_exact",
    hint: "La taille ne double pas quand l’âge double.",
    explanation: expl("La taille n’est pas proportionnelle à l’âge : un enfant de 10 ans ne mesure pas le double d’un enfant de 5 ans."),
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },

  // =========================
  // TOP-UP — PROP_TABLE (+2)
  // =========================
  {
    kind: "fixed",
    id: "prop_table_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Si 3 m de tissu coûtent 12 €, combien coûtent 7 m ?",
    format: "short",
    expected: formatEuro(28),
    comparator: "number_equal",
    hint: "Prix de 1 m d’abord.",
    explanation: expl("3 m coûtent 12 €, donc 1 m coûte 4 €. Alors 7 m coûtent 7 × 4 = 28 €."),
    tags: ["prop_proportionnalite", "table"],
  },
  {
    kind: "template",
    id: "prop_table_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Trouve d’abord le coefficient avec la colonne complète.",
    tags: ["prop_proportionnalite", "table", "template"],
    // 09/10/2026 : tableau à 3 colonnes, coefficient parfois décimal, case vide en haut ou en bas.
    generate: () => genTableau(3),
  },

  // =========================
  // TOP-UP — PROP_QUATRIEME (+5)
  // =========================
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 6 cahiers coûtent 18 €. 10 cahiers coûtent ... €",
    format: "short",
    expected: formatEuro(30),
    comparator: "number_equal",
    hint: "Prix de 1 cahier.",
    explanation: expl("6 cahiers coûtent 18 €, donc 1 cahier coûte 3 €. Alors 10 cahiers coûtent 30 €."),
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle"],
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    text: "Une voiture parcourt 120 km en 2 h à vitesse constante. Quelle distance parcourt-elle en 5 h ?",
    format: "short",
    expected: ["300", "300 km"],
    comparator: "number_equal",
    hint: "Distance en 1 h d’abord.",
    explanation: expl("120 km en 2 h, donc 60 km en 1 h. En 5 h : 5 × 60 = 300 km."),
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle"],
  },
  // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique la méthode du
  // passage à l'unité ». Désormais : un cas où on passe par 1 kg.
  {
    kind: "fixed",
    id: "prop_quatrieme_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    text: "5 kg de pommes coûtent 15 €. Combien coûtent 8 kg ?",
    format: "short",
    expected: ["24 €", "24"],
    comparator: "number_equal",
    hint: "Cherche d’abord le prix de 1 kg.",
    explanation: expl("Passage à l’unité : 1 kg coûte 15 ÷ 5 = 3 €. Donc 8 kg coûtent 8 × 3 = 24 €."),
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "short"],
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe par la valeur pour une unité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "template"],
    // 09/10/2026 : situations × tournures × prénoms (voir genQuatrieme).
    generate: () => genQuatrieme(randomChoice([2, 3] as const)),
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "reunion",
    text: "8 letchis coûtent 4 €. Combien coûtent 20 letchis ?",
    format: "qcm",
    choices: ["8 €", "10 €", "12 €", "16 €"],
    expected: ["10 €"],
    comparator: "mcq_exact",
    hint: "Prix d’un letchi : 0,50 €.",
    explanation: expl("8 letchis coûtent 4 €, donc 1 letchi coûte 0,50 €. Alors 20 letchis coûtent 20 × 0,50 = 10 €."),
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "qcm", "reunion"],
  },

  // =========================
  // TOP-UP — PROP_COEFF (+5)
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Si 6 kg de riz coûtent 12 €, quel est le coefficient (prix au kg) ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "12 ÷ 6.",
    explanation: expl("12 ÷ 6 = 2. Le coefficient de proportionnalité (prix au kg) est 2."),
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    text: "Une recette utilise 250 g de farine pour 5 crêpes. Quelle masse de farine par crêpe ?",
    format: "short",
    expected: ["50", "50 g"],
    comparator: "number_equal",
    hint: "250 ÷ 5.",
    explanation: expl("250 ÷ 5 = 50. Le coefficient est 50 g de farine par crêpe."),
    tags: ["prop_proportionnalite", "coefficient", "cuisine"],
  },
  // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique ce que représente
  // le coefficient ». Désormais : le prix d'une unité, sur un cas décimal.
  {
    kind: "fixed",
    id: "prop_coeff_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    text: "6 croissants coûtent 7,20 €. Le coefficient de proportionnalité est le prix d’un croissant. Combien vaut-il ?",
    format: "short",
    expected: ["1,20 €", "1,2", "1,20"],
    comparator: "number_equal",
    hint: "Divise le prix par le nombre de croissants.",
    explanation: expl("Le coefficient, c’est le prix d’un croissant : 7,20 ÷ 6 = 1,20 €. On multiplie le nombre de croissants par 1,20 pour avoir le prix."),
    tags: ["prop_proportionnalite", "coefficient", "short"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "10 entrées coûtent 50 €. Quel est le coefficient (prix d’une entrée) ?",
    format: "qcm",
    choices: ["5", "10", "50", "0,2"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "50 ÷ 10.",
    explanation: expl("50 ÷ 10 = 5. Le coefficient est 5 € par entrée."),
    tags: ["prop_proportionnalite", "coefficient", "qcm"],
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise la seconde grandeur par la première.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    // 09/10/2026 : situations × tournures × prénoms ; coefficient parfois décimal.
    generate: () => genCoeff(3),
  },

  // =========================
  // TOP-UP — PROP_RAPPORT (+5)
  // =========================
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "prop_rapport_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe, il y a 3 garçons pour 5 filles. Écris le ratio garçons:filles (exemple : 1:4).",
    format: "short",
    expected: ["3:5", "3 : 5", "3 pour 5"],
    comparator: "exact_text",
    hint: "Écris les deux quantités dans l’ordre demandé.",
    explanation: expl("Il y a 3 garçons pour 5 filles : le ratio garçons:filles est 3:5."),
    tags: ["prop_proportionnalite", "ratio"],
  },
  {
    kind: "fixed",
    id: "prop_rapport_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "cuisine",
    text: "Une vinaigrette se fait avec 1 dose de vinaigre pour 3 doses d’huile. Avec 5 doses de vinaigre, combien faut-il de doses d’huile ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "De 1 à 5, on multiplie par 5.",
    explanation: expl("Le ratio est 1:3. Pour 5 doses de vinaigre, il faut 5 × 3 = 15 doses d’huile."),
    tags: ["prop_proportionnalite", "ratio", "cuisine"],
  },
  // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique ce que signifie
  // un ratio de 2:3 ». Désormais : on s'en sert sur un cas (2 filles pour 3 garçons).
  {
    kind: "fixed",
    id: "prop_rapport_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "neutral",
    text: "Le ratio filles:garçons est 2:3. Il y a 10 filles. Combien y a-t-il de garçons ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Pour 2 filles, il y a 3 garçons.",
    explanation: expl("Le ratio 2:3 veut dire : 2 filles pour 3 garçons. De 2 à 10 filles, on multiplie par 5. Les garçons aussi : 3 × 5 = 15 garçons."),
    tags: ["prop_proportionnalite", "ratio", "short"],
  },
  {
    kind: "fixed",
    id: "prop_rapport_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "neutral",
    text: "Le ratio 4:6 est égal au ratio simplifié :",
    format: "qcm",
    choices: ["2:3", "1:2", "4:3", "3:2"],
    expected: ["2:3"],
    comparator: "mcq_exact",
    hint: "Divise les deux nombres par 2.",
    explanation: expl("On divise 4 et 6 par 2 : le ratio 4:6 se simplifie en 2:3."),
    tags: ["prop_proportionnalite", "ratio", "qcm"],
  },
  {
    kind: "template",
    id: "prop_rapport_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie la deuxième part par le même coefficient.",
    tags: ["prop_proportionnalite", "ratio", "template"],
    // 09/10/2026 : situations × tournures × prénoms (voir genRapport).
    generate: () => genRapport(3),
  },

  // =========================
  // TOP-UP — PROP_POURCENTAGE (+3)
  // =========================
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "50 % de 60 vaut combien ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "50 %, c’est la moitié.",
    explanation: expl("50 % de 60 = la moitié de 60 = 30."),
    tags: ["prop_proportionnalite", "pourcentage"],
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un groupe de 40 personnes, 15 % portent des lunettes. Combien de personnes est-ce ?",
    format: "qcm",
    choices: ["6", "4", "8", "15"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "15 % de 40 = 0,15 × 40.",
    explanation: expl("15 % de 40 = 0,15 × 40 = 6 personnes."),
    tags: ["prop_proportionnalite", "pourcentage", "qcm"],
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie par le pourcentage, puis divise par 100.",
    tags: ["prop_proportionnalite", "pourcentage", "template"],
    // 09/10/2026 : calcul pur (forme variée) ou en situation.
    generate: () => genPourcentage(["calcul", "part"], TAUX_5E),
  },

  // =========================
  // TOP-UP — PROP_COEFF_MULTIPLICATEUR (+5)
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Une hausse de 50 % correspond à quel coefficient multiplicateur ?",
    format: "short",
    expected: ["1,5", "1.5"],
    comparator: "number_equal",
    hint: "100 % + 50 % = 150 %.",
    explanation: expl("Une hausse de 50 % donne 150 % du prix initial, soit 1,5."),
    tags: ["prop_proportionnalite", "coefficient_multiplicateur"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Une réduction de 50 % correspond à quel coefficient multiplicateur ?",
    format: "short",
    expected: ["0,5", "0.5"],
    comparator: "number_equal",
    hint: "Il reste 50 % du prix.",
    explanation: expl("Après une réduction de 50 %, il reste 50 % du prix, soit 0,5."),
    tags: ["prop_proportionnalite", "coefficient_multiplicateur"],
  },
  // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment trouver
  // le coefficient d'une baisse de p % ». Désormais : un p précis (35).
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le coefficient multiplicateur d’une baisse de 35 % ?",
    format: "short",
    expected: ["0,65", "0.65"],
    comparator: "number_equal",
    hint: "On part de 100 % et on retire 35 %.",
    explanation: expl("Après une baisse de 35 %, il reste 100 % − 35 % = 65 % du prix. Et 65 % = 0,65. Le coefficient est 0,65."),
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "short"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Quel coefficient multiplicateur correspond à une réduction de 30 % ?",
    format: "qcm",
    choices: ["0,7", "1,3", "0,3", "0,97"],
    expected: ["0,7"],
    comparator: "mcq_exact",
    hint: "Il reste 70 % du prix.",
    explanation: expl("Après une réduction de 30 %, il reste 70 %, soit 0,7."),
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "qcm"],
  },
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_coeff_multiplicateur",
    difficulty: 4,
    theme: "neutral",
    hint: "Hausse de p % : on multiplie par 1 + p ÷ 100. Baisse : par 1 − p ÷ 100.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "template"],
    // 09/10/2026 : appliquer le coefficient, ou retrouver le taux, en situation.
    generate: () => genCoeffMult(4),
  },

  // =========================
  // TOP-UP — PROP_PROBLEME (+5)
  // =========================
  {
    kind: "fixed",
    id: "prop_probleme_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Pour 4 personnes, une recette demande 200 g de pâtes. Quelle masse faut-il pour 6 personnes ?",
    format: "short",
    expected: ["300", "300 g"],
    comparator: "number_equal",
    hint: "Masse pour 1 personne d’abord.",
    explanation: expl("200 g pour 4 personnes, donc 50 g par personne. Pour 6 personnes : 6 × 50 = 300 g."),
    tags: ["prop_proportionnalite", "probleme", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un robinet remplit 15 L en 3 minutes. Combien de litres en 8 minutes ?",
    format: "short",
    expected: ["40", "40 L"],
    comparator: "number_equal",
    hint: "Débit par minute d’abord.",
    explanation: expl("15 L en 3 min, donc 5 L par minute. En 8 min : 8 × 5 = 40 L."),
    tags: ["prop_proportionnalite", "probleme"],
  },
  // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi le
  // produit en croix permet… ». Désormais : on s'en sert (4 → 10, 6 → ?).
  {
    kind: "fixed",
    id: "prop_probleme_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un tableau de proportionnalité, 4 donne 10. Que donne 6 ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Produit en croix : 6 × 10 ÷ 4.",
    explanation: expl("Produit en croix : 6 × 10 ÷ 4 = 60 ÷ 4 = 15. Vérification : 10 ÷ 4 = 2,5 et 6 × 2,5 = 15."),
    tags: ["prop_proportionnalite", "probleme", "short"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "reunion",
    text: "Un bus parcourt 90 km en 2 h. À la même vitesse, combien de temps pour 135 km ?",
    format: "qcm",
    choices: ["3 h", "2 h 30", "4 h", "2 h"],
    expected: ["3 h"],
    comparator: "mcq_exact",
    hint: "Vitesse : 45 km/h.",
    explanation: expl("90 km en 2 h donne 45 km/h. Pour 135 km : 135 ÷ 45 = 3 h."),
    tags: ["prop_proportionnalite", "probleme", "qcm", "reunion"],
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Passe par la valeur d’une unité.",
    tags: ["prop_proportionnalite", "probleme", "template"],
    // 09/10/2026 : un problème en deux temps (différence, somme) ou à l'envers.
    generate: () => genProbleme(4),
  },

  // =========================
  // TOP-UP — PROP_DEFI (+4)
  // =========================
  {
    kind: "fixed",
    id: "prop_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un article coûte 80 €. Après une réduction de 25 %, quel est le nouveau prix ?",
    format: "short",
    expected: formatEuro(60),
    comparator: "number_equal",
    hint: "Coefficient multiplicateur 0,75.",
    explanation: expl("Après une réduction de 25 %, il reste 75 %, soit le coefficient 0,75. On calcule 80 × 0,75 = 60 €."),
    tags: ["prop_proportionnalite", "defi", "coefficient_multiplicateur"],
  },
  {
    kind: "fixed",
    id: "prop_defi_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Un sentier de randonnée est parcouru à 4 km/h. Combien de km en 2 h 30 ?",
    format: "qcm",
    choices: ["10 km", "8 km", "9 km", "12 km"],
    expected: ["10 km"],
    comparator: "mcq_exact",
    hint: "2 h 30 = 2,5 h.",
    explanation: expl("2 h 30 = 2,5 h. Distance = 4 × 2,5 = 10 km."),
    tags: ["prop_proportionnalite", "defi", "qcm", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_defi_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une recette pour 6 personnes demande 300 g de chocolat. Combien pour 10 personnes ?",
    format: "short",
    expected: ["500", "500 g"],
    comparator: "number_equal",
    hint: "Masse par personne d’abord.",
    explanation: expl("300 g pour 6 personnes, donc 50 g par personne. Pour 10 personnes : 10 × 50 = 500 g."),
    tags: ["prop_proportionnalite", "defi", "cuisine"],
  },
  {
    kind: "template",
    id: "prop_defi_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Applique le coefficient multiplicateur.",
    tags: ["prop_proportionnalite", "defi", "template", "coefficient_multiplicateur"],
    // 09/10/2026 : deux évolutions successives, ou le prix avant la remise.
    generate: () => genRatioDefi(5),
  },

  /* ===== PROP_DEFI =====
     Les défis de pourcentage sont partis vers prop_ratio_defi le 04/08/2026.
     Ce qui reste ici tient à la proportionnalité elle-même : la reconnaître,
     et surtout savoir dire quand elle n'est PAS là. */
  {
    kind: "template",
    id: "prop_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Ramène chaque relevé à une unité, puis compare.",
    tags: ["prop_proportionnalite", "defi", "template"],
    // 09/10/2026 : le défi compare deux relevés (avant : un seul contexte, la même phrase).
    generate: () => genComparer(),
  },
  {
    kind: "template",
    id: "prop_defi_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Divise la seconde grandeur par la première pour chaque relevé : une somme fixe en plus casse la proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "template", "non_proportionnalite"],
    // 09/10/2026 : trois relevés ; le piège « somme fixe + par unité » (même allure, pas proportionnel).
    generate: () => (Math.random() < 0.5 ? genReconnaitre(4) : genAffirmation(3)),
  },
  {
    kind: "template",
    id: "prop_defi_tpl_e4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Refais le calcul en passant par la valeur pour une unité.",
    tags: ["prop_proportionnalite", "defi", "template"],
    generate: () => genAffirmation(2),
  },

  /* ===== PROP_RATIO_DEFI =====
     Il manquait les questions ouvertes : un élève de 5e doit savoir dire ce
     qu'il fait d'un pourcentage, pas seulement le calculer. */
  // 08/10/2026 : précise et simple (Frédéric). Avant : « Le prix revient-il au
  // départ ? Explique. » Désormais : on part de 100 € et on calcule le prix
  // final (96 €) ; la réponse fausse attendue, 100 €, montre le piège.
  {
    kind: "fixed",
    id: "prop_ratio_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un prix de 100 € augmente de 20 %, puis baisse de 20 %. Quel est le prix final ?",
    format: "short",
    expected: ["96 €", "96"],
    comparator: "number_equal",
    hint: "Fais les deux calculs l’un après l’autre : la baisse se calcule sur le nouveau prix.",
    explanation: expl(
      "Après la hausse : 100 + 20 = 120 €. La baisse de 20 % se calcule sur 120 € : 20 % de 120 = 24 €. Prix final : 120 − 24 = 96 €. Le prix ne revient pas à 100 €.",
    ),
    tags: ["prop_ratio_pourcentage", "defi", "short", "piege"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "prop_ratio_defi_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Dans une classe de 25 élèves du collège de Saint-Louis, 15 font de l’espagnol. Quel pourcentage des élèves fait de l’espagnol ?",
    format: "short",
    expected: ["60 %", "60"],
    comparator: "number_equal",
    hint: "Un pourcentage, c’est sur 100 : de 25 à 100, on multiplie par 4.",
    explanation: expl(
      "Un pourcentage, c’est le nombre sur 100. De 25 à 100, on multiplie par 4. Donc 15 × 4 = 60. Il y a 60 % des élèves qui font de l’espagnol.",
    ),
    tags: ["prop_ratio_pourcentage", "defi", "short", "reunion"],
  },
  // 08/10/2026 : précise et simple (Frédéric). Le nombre de « oui » est tiré
  // entre 2 et total − 2 : avec 20, 25 ou 50 personnes, le pourcentage est
  // toujours entier (avant, 25 personnes donnait parfois 7,5 personnes).
  {
    kind: "template",
    id: "prop_ratio_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Ramène à 100 personnes : par combien multiplies-tu ?",
    tags: ["prop_ratio_pourcentage", "defi", "short", "template"],
    // 09/10/2026 : le pourcentage d'une part, en situation (14 contextes).
    generate: () => genPourcentage(["taux"], TAUX_5E),
  },
];