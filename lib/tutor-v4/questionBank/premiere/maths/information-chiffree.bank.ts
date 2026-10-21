// lib/tutor-v4/questionBank/premiere/maths/information-chiffree.bank.ts
//
// Notions : info_tableau_croise, info_frequences, info_representations_croisees,
//           info_tableur, info_filtre_donnees (domaine BOP1IC)
//
// La partie qualitative de l'analyse de l'information chiffrée : deux caractères
// croisés dans un tableau, des fréquences marginales et conditionnelles, des
// représentations graphiques, et le fichier de données qu'on filtre.
//
// Le contexte principal est celui du document d'accompagnement Éduscol : les
// données Parcoursup. Il est difficile de trouver plus concret pour eux — ce
// sont leurs propres vœux, l'année prochaine. Le document pose même la question
// qui les concerne directement : « pour un lycéen qui ne choisit pas
// l'enseignement de spécialité mathématiques et qui souhaite intégrer une
// classe préparatoire, quelle doublette lui donne le plus de chances ? »
//
// ⚠️ Les effectifs ci-dessous sont générés, pas relevés : ce sont des exercices,
// pas des statistiques. Aucun chiffre réel n'est avancé.
//
// Tous les items portent un tableau ou un diagramme.

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

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

function fr(n: number): string {
  const arrondi = Math.round(n * 10000) / 10000;
  return String(arrondi).replace(".", ",");
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  const distracteurs = Array.from(new Set(wrongs)).filter((w) => w !== correct);
  return shuffle([correct, ...distracteurs.slice(0, 3)]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/* ── Le tableau croisé, avec des effectifs qui tombent juste ── */

const SITUATIONS = [
  {
    titre: "Vœux d'orientation des élèves de terminale",
    lignes: ["Filles", "Garçons"],
    colonnes: ["BTS", "Licence"],
    individu: "élève",
  },
  {
    titre: "Satisfaction des clients selon le canal d'achat",
    lignes: ["Internet", "En magasin"],
    colonnes: ["Satisfait", "Non satisfait"],
    individu: "client",
  },
  {
    titre: "Pratique sportive des élèves d'un lycée",
    lignes: ["Externes", "Demi-pensionnaires"],
    colonnes: ["Sportifs", "Non sportifs"],
    individu: "élève",
  },
] as const;

function tableau() {
  const s = pick(SITUATIONS);
  const a = pick([120, 150, 180, 240] as const);
  const b = pick([60, 80, 100] as const);
  const c = pick([90, 200, 220] as const);
  const d = pick([30, 50, 70] as const);
  return {
    s,
    a,
    b,
    c,
    d,
    ligne1: a + b,
    ligne2: c + d,
    col1: a + c,
    col2: b + d,
    total: a + b + c + d,
  };
}

/**
 * Le tableau croisé complet, marges comprises.
 *
 * `masquer` remplace une case par « ? » : sans cela, une question qui dit
 * « ce total a été effacé » afficherait la réponse juste à côté de l'énoncé.
 */
function canvasTableau(
  t: ReturnType<typeof tableau>,
  masquer?: "totalColonne2"
): CanvasFigure {
  const { s } = t;
  const col2: string | number = masquer === "totalColonne2" ? "?" : t.col2;
  return {
    kind: "tableau_donnees",
    title: s.titre,
    headers: ["", s.colonnes[0], s.colonnes[1], "Total"],
    rows: [
      { label: s.lignes[0], values: [t.a, t.b, t.ligne1] },
      { label: s.lignes[1], values: [t.c, t.d, t.ligne2] },
      { label: "Total", values: [t.col1, col2, t.total] },
    ],
  };
}

/** Une feuille de calcul, colonnes A B C et lignes numérotées. */
function canvasTableur(
  entetes: string[],
  lignes: (string | number)[][],
  titre: string
): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: titre,
    headers: ["", ...entetes],
    rows: lignes.map((valeurs, i) => ({ label: String(i + 1), values: valeurs })),
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   GÉNÉRATEURS ROBUSTES (21/10/2026)
   ═══════════════════════════════════════════════════════════════════════
   Mesure du 21/10 (`scripts/mesurer-squelettes-coach.ts premiere …`) : les
   micros du tableau croisé, des filtres, des représentations et du nuage
   n'avaient qu'UN gabarit, 1 à 6 squelettes, 14 à 19 phrases déjà vues sur
   20. L'élève reconnaît la PHRASE, pas les nombres. Chaque gabarit ci-dessous
   tire donc un CONTEXTE (un métier, un domaine : sport, santé, environnement,
   musique, économie, sondage…), une CASE ou un CRITÈRE, et une TOURNURE.
   ⚠️ Les effectifs sont tirés au hasard : ce sont des exercices, pas des
   statistiques réelles. */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** « de » contracté devant l'article : « du score », « des ventes », « de la masse ». */
function du(s: string): string {
  return s.startsWith("le ") ? `du ${s.slice(3)}` : s.startsWith("les ") ? `des ${s.slice(4)}` : `de ${s}`;
}

/** « de » élidé devant une voyelle : « d'abonnés », « de joueurs ». */
function de(nom: string): string {
  return /^[aeiouyéèêàâîôûhAEIOUÉ]/.test(nom) ? `d'${nom}` : `de ${nom}`;
}

/** Un nombre écrit à la française, espace des milliers dès 10 000. */
function nb(n: number): string {
  const s = fr(n);
  const [ent, dec] = s.split(",");
  const e = ent.length > 4 ? ent.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : ent;
  return dec ? `${e},${dec}` : e;
}

/** Un pourcentage écrit en LaTeX : « $35\,\%$ ». */
function pc(n: number): string {
  return `$${fr(n)}\\,\\%$`;
}

/** Arrondi à `d` décimales. */
function arr(x: number, d = 0): number {
  const p = 10 ** d;
  return Math.round(x * p) / p;
}

/** Quatre propositions DISTINCTES : la bonne + trois leurres différents d'elle. */
function choix4(correct: string, leurres: readonly string[]): string[] {
  const vus = new Set([correct]);
  const out: string[] = [];
  for (const l of leurres) if (!vus.has(l)) { vus.add(l); out.push(l); }
  return shuffle([correct, ...out.slice(0, 3)]);
}

/** Des leurres numériques distincts de la bonne valeur (et entre eux), positifs. */
function leurresNum(bonne: number, candidats: number[], unite = ""): string[] {
  const vus = new Set([bonne]);
  const out: string[] = [];
  for (const c of candidats) {
    const v = arr(c, 2);
    if (v > 0 && !vus.has(v)) { vus.add(v); out.push(`$${nb(v)}$${unite}`); }
  }
  let k = 1;
  while (out.length < 3) {
    const v = bonne + k * (k % 2 ? 7 : -3);
    if (v > 0 && !vus.has(v)) { vus.add(v); out.push(`$${nb(v)}$${unite}`); }
    k++;
  }
  return out;
}

/* ─────────── Contextes à deux caractères qualitatifs (tableau croisé) ─────────── */

export type ContexteCroise = {
  /** Qui a relevé les données, et sur quoi : un métier, un domaine. */
  intro: string;
  /** Le caractère en ligne (2 ou 3 modalités) et son nom. */
  carLigne: string;
  lignes: string[];
  /** Les mêmes, en court (≤ 11 signes), pour les étiquettes de barres. */
  courts: string[];
  /** Le caractère en colonne : la modalité « positive » d'abord. */
  carColonne: string;
  colonnes: [string, string];
  /** Les individus, au pluriel. */
  individu: string;
  /** Plage et pas des effectifs d'une case. */
  min: number;
  max: number;
  pas: number;
};

export const CONTEXTES_CROISES: readonly ContexteCroise[] = [
  { intro: "Une entraîneuse de handball a classé les licenciés de son club.", carLigne: "l'âge", lignes: ["Moins de 15 ans", "15 à 18 ans", "Adultes"], courts: ["−15 ans", "15-18 ans", "Adultes"], carColonne: "la pratique", colonnes: ["Compétition", "Loisir"], individu: "licenciés", min: 12, max: 90, pas: 1 },
  { intro: "Une infirmière scolaire a fait le point sur les rappels de vaccin des élèves du lycée.", carLigne: "le niveau", lignes: ["Seconde", "Première", "Terminale"], courts: ["Seconde", "Première", "Terminale"], carColonne: "le rappel", colonnes: ["Rappel à jour", "Rappel en retard"], individu: "élèves", min: 15, max: 220, pas: 1 },
  { intro: "Un agent du parc national a compté les randonneurs d'un week-end.", carLigne: "le sentier", lignes: ["Sentier du littoral", "Sentier forestier"], courts: ["Littoral", "Forêt"], carColonne: "l'accompagnement", colonnes: ["Avec un guide", "Sans guide"], individu: "randonneurs", min: 30, max: 480, pas: 10 },
  { intro: "Une chargée d'études d'une plateforme de musique en ligne a interrogé des abonnés.", carLigne: "l'âge", lignes: ["Moins de 25 ans", "25 ans et plus"], courts: ["−25 ans", "25 ans et +"], carColonne: "l'appareil d'écoute", colonnes: ["Téléphone", "Ordinateur"], individu: "abonnés", min: 1200, max: 9800, pas: 100 },
  { intro: "Le responsable des ventes d'un magasin de sport a trié les commandes du mois.", carLigne: "le mode de retrait", lignes: ["Retrait en magasin", "Livraison à domicile"], courts: ["Magasin", "Domicile"], carColonne: "le type de client", colonnes: ["Client fidèle", "Nouveau client"], individu: "commandes", min: 40, max: 640, pas: 1 },
  { intro: "Un institut de sondage a interrogé des habitants sur un projet de piste cyclable.", carLigne: "l'âge", lignes: ["Moins de 35 ans", "35 à 59 ans", "60 ans et plus"], courts: ["−35 ans", "35-59 ans", "60 ans et +"], carColonne: "l'avis", colonnes: ["Favorable", "Défavorable"], individu: "personnes interrogées", min: 60, max: 420, pas: 2 },
  { intro: "Le gérant d'un cinéma a relevé les entrées d'une semaine.", carLigne: "la séance", lignes: ["Matin", "Après-midi", "Soir"], courts: ["Matin", "Après-midi", "Soir"], carColonne: "le tarif", colonnes: ["Tarif réduit", "Plein tarif"], individu: "spectateurs", min: 80, max: 1500, pas: 5 },
  { intro: "Une ingénieure agronome a recensé les parcelles d'une coopérative.", carLigne: "le mode de culture", lignes: ["Culture bio", "Culture conventionnelle"], courts: ["Bio", "Conventionnel"], carColonne: "l'irrigation", colonnes: ["Irriguée", "Non irriguée"], individu: "parcelles", min: 6, max: 75, pas: 1 },
  { intro: "Le directeur d'un conservatoire a compté ses élèves inscrits.", carLigne: "la famille d'instruments", lignes: ["Cordes", "Vents", "Percussions"], courts: ["Cordes", "Vents", "Percussions"], carColonne: "l'âge", colonnes: ["Enfant", "Adulte"], individu: "élèves", min: 8, max: 140, pas: 1 },
  { intro: "Une ingénieure d'un réseau de bus a analysé les passages aux arrêts.", carLigne: "la ligne", lignes: ["Ligne A", "Ligne B", "Ligne C"], courts: ["Ligne A", "Ligne B", "Ligne C"], carColonne: "la ponctualité", colonnes: ["À l'heure", "En retard"], individu: "passages", min: 50, max: 900, pas: 1 },
  { intro: "Un médecin urgentiste a fait le bilan des arrivées d'un mois.", carLigne: "l'heure d'arrivée", lignes: ["De jour", "De nuit"], courts: ["Jour", "Nuit"], carColonne: "la suite donnée", colonnes: ["Hospitalisé", "Rentré chez lui"], individu: "patients", min: 40, max: 980, pas: 1 },
  { intro: "Une bibliothécaire a classé les prêts du trimestre.", carLigne: "le rayon", lignes: ["Romans", "Bandes dessinées", "Documentaires"], courts: ["Romans", "BD", "Documents"], carColonne: "le lecteur", colonnes: ["Lecteur adulte", "Lecteur jeune"], individu: "prêts", min: 100, max: 1900, pas: 10 },
  { intro: "Un conseiller de l'office de tourisme a interrogé les visiteurs de l'été.", carLigne: "la provenance", lignes: ["France", "Étranger"], courts: ["France", "Étranger"], carColonne: "la durée du séjour", colonnes: ["Une nuit", "Plusieurs nuits"], individu: "visiteurs", min: 150, max: 2400, pas: 10 },
  { intro: "Le chef d'une cantine a suivi les plateaux d'une semaine.", carLigne: "le menu", lignes: ["Menu végétarien", "Menu avec viande"], courts: ["Végétarien", "Viande"], carColonne: "le gaspillage", colonnes: ["Assiette finie", "Assiette non finie"], individu: "plateaux", min: 60, max: 950, pas: 1 },
  { intro: "Une conceptrice de jeux vidéo a analysé les parties d'un nouveau niveau.", carLigne: "le support", lignes: ["Console", "Ordinateur", "Téléphone"], courts: ["Console", "Ordinateur", "Téléphone"], carColonne: "le résultat", colonnes: ["Niveau réussi", "Niveau échoué"], individu: "joueurs", min: 300, max: 6000, pas: 50 },
  { intro: "Une technicienne de la qualité de l'air a classé les journées des trois dernières années.", carLigne: "la saison", lignes: ["Saison chaude", "Saison froide"], courts: ["Chaude", "Froide"], carColonne: "la qualité de l'air", colonnes: ["Air de bonne qualité", "Pollution signalée"], individu: "journées", min: 18, max: 140, pas: 1 },
  { intro: "Un conseiller en rénovation énergétique a classé les logements visités.", carLigne: "le type de logement", lignes: ["Maison", "Appartement"], courts: ["Maison", "Appartement"], carColonne: "l'isolation", colonnes: ["Bien isolé", "Mal isolé"], individu: "logements", min: 20, max: 380, pas: 1 },
  { intro: "Une gendarme a fait le bilan d'une semaine de contrôles routiers dans le département.", carLigne: "le véhicule", lignes: ["Voiture", "Moto", "Camion"], courts: ["Voiture", "Moto", "Camion"], carColonne: "le résultat", colonnes: ["En règle", "En infraction"], individu: "conducteurs", min: 6, max: 260, pas: 1 },
] as const;

/** Un tableau croisé tiré : `cases[i][j]` = ligne i, colonne j. */
export type Croise = {
  ctx: ContexteCroise;
  cases: number[][];
  lig: number[];
  col: [number, number];
  total: number;
};

/**
 * Tire un tableau croisé dont toutes les cases sont DISTINCTES, les marges
 * aussi (et différentes des cases) : une question « quelle case vaut 140 ? »
 * n'a alors qu'une réponse, et aucun leurre ne tombe sur la bonne valeur.
 */
export function tirerCroise(ctx: ContexteCroise = pick(CONTEXTES_CROISES)): Croise {
  for (let essai = 0; essai < 200; essai++) {
    const n = ctx.lignes.length;
    const cases = Array.from({ length: n }, () => [0, 1].map(() => randomInt(ctx.min / ctx.pas, ctx.max / ctx.pas) * ctx.pas));
    const lig = cases.map((r) => r[0] + r[1]);
    const col: [number, number] = [cases.reduce((s, r) => s + r[0], 0), cases.reduce((s, r) => s + r[1], 0)];
    const total = col[0] + col[1];
    const tous = [...cases.flat(), ...lig, ...col, total];
    if (new Set(tous).size === tous.length) return { ctx, cases, lig, col, total };
  }
  throw new Error("tirerCroise : pas de tableau à valeurs distinctes");
}

/** Une case masquée : [ligne, colonne], ligne = n pour la ligne Total, colonne 2 pour Total. */
type Masque = [number, number];

export function canvasCroise(t: Croise, opts?: { marges?: boolean; masques?: Masque[]; titre?: string }): CanvasFigure {
  const marges = opts?.marges ?? true;
  const n = t.ctx.lignes.length;
  const m = (i: number, j: number, v: number): string | number =>
    opts?.masques?.some(([a, b]) => a === i && b === j) ? "?" : v;
  const rows = t.cases.map((r, i) => ({
    label: t.ctx.lignes[i],
    values: marges ? [m(i, 0, r[0]), m(i, 1, r[1]), m(i, 2, t.lig[i])] : [m(i, 0, r[0]), m(i, 1, r[1])],
  }));
  if (marges) rows.push({ label: "Total", values: [m(n, 0, t.col[0]), m(n, 1, t.col[1]), m(n, 2, t.total)] });
  return {
    kind: "tableau_donnees",
    title: opts?.titre ?? `Effectifs de ${t.ctx.individu}`,
    headers: marges ? ["", t.ctx.colonnes[0], t.ctx.colonnes[1], "Total"] : ["", t.ctx.colonnes[0], t.ctx.colonnes[1]],
    rows,
  };
}

/** Le texte d'un critère : « « Seconde » » ou « « Rappel à jour » ». */
const q = (s: string) => `« ${s} »`;

/* ─────────── Fichiers de données brutes (une ligne = un individu) ─────────── */

export type ContexteFichier = {
  intro: string;
  /** Nom de la colonne d'identifiant et préfixes ou prénoms. */
  idCol: string;
  ids: string[];
  /** Deux colonnes qualitatives. */
  cat1: { nom: string; valeurs: string[] };
  cat2: { nom: string; valeurs: string[] };
  /** Une colonne numérique (entiers). */
  num: { nom: string; unite: string; min: number; max: number };
  individu: string;
};

const PRENOMS = ["Inès", "Lucas", "Maëlys", "Noah", "Jade", "Adam", "Léna", "Yanis", "Chloé", "Sacha", "Emma", "Rayan", "Louise", "Malo", "Zoé", "Nathan"];

export const CONTEXTES_FICHIERS: readonly ContexteFichier[] = [
  { intro: "L'organisatrice d'un trail a exporté une partie du fichier des arrivées.", idCol: "Coureur", ids: PRENOMS, cat1: { nom: "Catégorie", valeurs: ["Senior", "Vétéran"] }, cat2: { nom: "Licencié", valeurs: ["Oui", "Non"] }, num: { nom: "Temps (min)", unite: "minutes", min: 95, max: 185 }, individu: "coureurs" },
  { intro: "Une infirmière scolaire a relevé le temps de sommeil de quelques élèves.", idCol: "Élève", ids: PRENOMS, cat1: { nom: "Classe", valeurs: ["Seconde", "Première"] }, cat2: { nom: "Sport en club", valeurs: ["Oui", "Non"] }, num: { nom: "Sommeil (h)", unite: "heures", min: 5, max: 10 }, individu: "élèves" },
  { intro: "Un chargé d'études d'une plateforme de streaming a extrait un échantillon d'abonnés.", idCol: "Abonné", ids: ["A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12"], cat1: { nom: "Formule", valeurs: ["Gratuite", "Premium"] }, cat2: { nom: "Appareil", valeurs: ["Téléphone", "Ordinateur", "Enceinte"] }, num: { nom: "Écoute (h/sem.)", unite: "heures par semaine", min: 2, max: 32 }, individu: "abonnés" },
  { intro: "Une agronome a relevé les rendements de parcelles d'essai.", idCol: "Parcelle", ids: ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12"], cat1: { nom: "Culture", valeurs: ["Blé", "Maïs"] }, cat2: { nom: "Bio", valeurs: ["Oui", "Non"] }, num: { nom: "Rendement (q/ha)", unite: "quintaux par hectare", min: 38, max: 96 }, individu: "parcelles" },
  { intro: "Un vendeur de vélos a exporté les ventes de la semaine.", idCol: "Vente", ids: ["V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11", "V12"], cat1: { nom: "Modèle", valeurs: ["Électrique", "Classique"] }, cat2: { nom: "Paiement", valeurs: ["Comptant", "En plusieurs fois"] }, num: { nom: "Prix (€)", unite: "euros", min: 290, max: 2900 }, individu: "ventes" },
  { intro: "Une météorologue a relevé les pluies de quelques journées.", idCol: "Jour", ids: ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10", "J11", "J12"], cat1: { nom: "Saison", valeurs: ["Été", "Hiver"] }, cat2: { nom: "Vent", valeurs: ["Faible", "Fort"] }, num: { nom: "Pluie (mm)", unite: "millimètres", min: 1, max: 48 }, individu: "journées" },
  { intro: "La directrice d'une école de musique a extrait le fichier de ses élèves.", idCol: "Élève", ids: PRENOMS, cat1: { nom: "Niveau", valeurs: ["Débutant", "Confirmé"] }, cat2: { nom: "Instrument", valeurs: ["Piano", "Violon", "Guitare"] }, num: { nom: "Âge (ans)", unite: "ans", min: 7, max: 58 }, individu: "élèves" },
  { intro: "Un médecin urgentiste a extrait les dossiers d'une nuit de garde.", idCol: "Patient", ids: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12"], cat1: { nom: "Gravité", valeurs: ["Légère", "Sérieuse"] }, cat2: { nom: "Arrivée", valeurs: ["À pied", "Ambulance"] }, num: { nom: "Attente (min)", unite: "minutes", min: 8, max: 175 }, individu: "patients" },
  { intro: "Le programmateur d'un cinéma a exporté le bilan des séances du week-end.", idCol: "Séance", ids: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12"], cat1: { nom: "Format", valeurs: ["2D", "3D"] }, cat2: { nom: "Film", valeurs: ["Animation", "Action", "Comédie"] }, num: { nom: "Spectateurs", unite: "spectateurs", min: 18, max: 310 }, individu: "séances" },
  { intro: "Une conceptrice de jeux vidéo a extrait les scores de joueurs testeurs.", idCol: "Joueur", ids: PRENOMS, cat1: { nom: "Support", valeurs: ["Console", "Ordinateur"] }, cat2: { nom: "Mode", valeurs: ["Solo", "En ligne"] }, num: { nom: "Score", unite: "points", min: 120, max: 980 }, individu: "joueurs" },
  { intro: "Un garde du littoral a relevé les déchets ramassés sur quelques plages.", idCol: "Plage", ids: ["Pl1", "Pl2", "Pl3", "Pl4", "Pl5", "Pl6", "Pl7", "Pl8", "Pl9", "Pl10", "Pl11", "Pl12"], cat1: { nom: "Côte", valeurs: ["Nord", "Sud"] }, cat2: { nom: "Surveillée", valeurs: ["Oui", "Non"] }, num: { nom: "Déchets (kg)", unite: "kilogrammes", min: 4, max: 85 }, individu: "plages" },
  { intro: "Une coach de basket a exporté les statistiques d'un match de son équipe.", idCol: "Joueuse", ids: ["Awa", "Lina", "Manon", "Sarah", "Nina", "Elsa", "Kenza", "Lou", "Ambre", "Iris", "Mia", "Léa"], cat1: { nom: "Titulaire", valeurs: ["Oui", "Non"] }, cat2: { nom: "Poste", valeurs: ["Meneuse", "Ailière", "Pivot"] }, num: { nom: "Points", unite: "points", min: 0, max: 28 }, individu: "joueuses" },
] as const;

type LigneFichier = { id: string; c1: string; c2: string; v: number };

/** Un critère de filtre sur une colonne du fichier, et son texte de tableur. */
type Critere = { texte: string; teste: (l: LigneFichier) => boolean; contraire: string };

export type Fichier = {
  ctx: ContexteFichier;
  lignes: LigneFichier[];
  /** Le seuil numérique : aucune valeur ne lui est égale (pas de débat ≥ / >). */
  seuil: number;
  criteres: Critere[];
};

function seuilRond(min: number, max: number): number {
  const e = max - min;
  const p = e > 1000 ? 100 : e > 200 ? 50 : e > 60 ? 10 : e > 20 ? 5 : 1;
  const bas = min + e * 0.3;
  const haut = min + e * 0.7;
  const cands: number[] = [];
  for (let s = Math.ceil(bas / p) * p; s <= haut; s += p) cands.push(s);
  return cands.length ? pick(cands) : Math.round((min + max) / 2);
}

/**
 * Tire un fichier de `n` lignes. Chaque critère simple garde entre 2 et n − 2
 * lignes : ni filtre vide, ni filtre qui garde tout.
 */
export function tirerFichier(n = 10, ctx: ContexteFichier = pick(CONTEXTES_FICHIERS)): Fichier {
  for (let essai = 0; essai < 300; essai++) {
    const idx = shuffle(ctx.ids.map((_, i) => i)).slice(0, n).sort((a, b) => a - b);
    const seuil = seuilRond(ctx.num.min, ctx.num.max);
    const lignes = idx.map((i) => {
      let v = randomInt(ctx.num.min, ctx.num.max);
      if (v === seuil) v += 1;
      return { id: ctx.ids[i], c1: pick(ctx.cat1.valeurs), c2: pick(ctx.cat2.valeurs), v };
    });
    const criteres: Critere[] = [
      ...ctx.cat1.valeurs.map((val) => ({
        texte: q(`${ctx.cat1.nom} = ${val}`),
        teste: (l: LigneFichier) => l.c1 === val,
        contraire: q(`${ctx.cat1.nom} ≠ ${val}`),
      })),
      ...ctx.cat2.valeurs.map((val) => ({
        texte: q(`${ctx.cat2.nom} = ${val}`),
        teste: (l: LigneFichier) => l.c2 === val,
        contraire: q(`${ctx.cat2.nom} ≠ ${val}`),
      })),
      { texte: q(`${ctx.num.nom} ≥ ${seuil}`), teste: (l: LigneFichier) => l.v >= seuil, contraire: q(`${ctx.num.nom} < ${seuil}`) },
      { texte: q(`${ctx.num.nom} < ${seuil}`), teste: (l: LigneFichier) => l.v < seuil, contraire: q(`${ctx.num.nom} ≥ ${seuil}`) },
    ];
    const ok = criteres.every((c) => {
      const k = lignes.filter(c.teste).length;
      return k >= 2 && k <= n - 2;
    });
    if (ok) return { ctx, lignes, seuil, criteres };
  }
  throw new Error("tirerFichier : pas de fichier équilibré");
}

export function canvasFichier(f: Fichier): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: "Extrait du fichier",
    headers: [f.ctx.idCol, f.ctx.cat1.nom, f.ctx.cat2.nom, f.ctx.num.nom],
    rows: f.lignes.map((l) => ({ label: l.id, values: [l.c1, l.c2, l.v] })),
    display: { compact: true, striped: true },
  };
}

/** Les identifiants des lignes gardées, pour l'explication. */
function gardees(f: Fichier, t: (l: LigneFichier) => boolean): string {
  const g = f.lignes.filter(t).map((l) => l.id);
  return g.length ? g.join(", ") : "aucune";
}

/** Un gabarit de 1re : seuls changent l'id, la micro, l'étoile, l'indice et le tirage. */
function gab(
  id: string,
  notionId: string,
  microId: string,
  difficulty: 1 | 2 | 3,
  hint: string,
  generate: () => TutorGeneratedQuestionV4,
  tags: string[] = []
): TutorBankItemV4 {
  return {
    kind: "template",
    id: `premiere_${id}`,
    niveau: "premiere",
    matiere: "maths",
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["premiere", "maths", "statistiques", "template", ...tags],
    generate,
  };
}

/* ═══════════════ info_tab_lire ═══════════════ */

const ITEMS_TAB_LIRE: TutorBankItemV4[] = [
  gab("info_tab_lire_case", "info_tableau_croise", "info_tab_lire", 1,
    "On croise la ligne et la colonne : l'effectif est dans la case à leur intersection.",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      const i = randomInt(0, ctx.lignes.length - 1);
      const j = pick([0, 1] as const);
      const v = t.cases[i][j];
      const question = pick([
        `Combien ${de(ctx.individu)} sont à la fois ${q(ctx.lignes[i])} et ${q(ctx.colonnes[j])} ?`,
        `Lis dans le tableau l'effectif des ${ctx.individu} ${q(ctx.lignes[i])} qui sont aussi ${q(ctx.colonnes[j])}.`,
        `Parmi les ${ctx.individu} ${q(ctx.lignes[i])}, combien sont dans la colonne ${q(ctx.colonnes[j])} ?`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: canvasCroise(t),
        explanation: exp(
          "Dans un tableau croisé, chaque case donne l'effectif des individus qui ont À LA FOIS la modalité de la ligne et celle de la colonne.",
          "On repère la ligne, puis la colonne, et on lit la case d'intersection.",
          `Ligne ${q(ctx.lignes[i])}, colonne ${q(ctx.colonnes[j])} : $${nb(v)}$.`,
          `Il y a $${nb(v)}$ ${ctx.individu} dans ce cas. ⚠️ Ce n'est pas le total de la ligne, $${nb(t.lig[i])}$.`
        ),
      };
    }, ["tableau", "short"]),

  gab("info_tab_lire_marge", "info_tableau_croise", "info_tab_lire", 2,
    "Un total de ligne compte tous les individus de cette ligne, quelle que soit la colonne.",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      const n = ctx.lignes.length;
      const genre = pick(["ligne", "colonne", "total"] as const);
      const i = randomInt(0, n - 1);
      const j = pick([0, 1] as const);
      const v = genre === "ligne" ? t.lig[i] : genre === "colonne" ? t.col[j] : t.total;
      const question =
        genre === "ligne"
          ? pick([`Combien ${de(ctx.individu)} sont ${q(ctx.lignes[i])} en tout ?`, `Quel est l'effectif total de la modalité ${q(ctx.lignes[i])} ?`])
          : genre === "colonne"
            ? pick([`Combien ${de(ctx.individu)} sont ${q(ctx.colonnes[j])}, toutes lignes confondues ?`, `Quel est l'effectif total de la colonne ${q(ctx.colonnes[j])} ?`])
            : pick([`Combien ${de(ctx.individu)} ce tableau compte-t-il en tout ?`, `Quel est l'effectif total de l'étude ?`]);
      const leurres = [genre === "ligne" ? t.cases[i][0] : t.cases[0][j], genre === "total" ? t.col[0] : t.total, genre === "colonne" ? t.lig[0] : t.col[1]];
      return {
        text: `${ctx.intro} ${question}`,
        format: "qcm",
        choices: choix4(`$${nb(v)}$`, leurresNum(v, leurres)),
        expected: [`$${nb(v)}$`],
        comparator: "mcq_exact",
        canvas: canvasCroise(t),
        explanation: exp(
          "Les marges d'un tableau croisé sont les totaux : en bout de ligne, en bas de colonne, et le total général dans le coin.",
          genre === "total" ? "On lit la case du coin, en bas à droite." : `On lit la case « Total » ${genre === "ligne" ? "au bout de la ligne" : "en bas de la colonne"}.`,
          genre === "ligne"
            ? `$${t.cases[i][0]} + ${t.cases[i][1]} = ${nb(v)}$.`
            : genre === "colonne"
              ? `$${t.cases.map((r) => r[j]).join(" + ")} = ${nb(v)}$.`
              : `$${t.col[0]} + ${t.col[1]} = ${nb(v)}$.`,
          `La réponse est $${nb(v)}$ ${ctx.individu}.`
        ),
      };
    }, ["tableau"]),

  gab("info_tab_lire_retrouver", "info_tableau_croise", "info_tab_lire", 2,
    "Cherche la case qui contient ce nombre, puis lis sa ligne et sa colonne.",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      const i = randomInt(0, ctx.lignes.length - 1);
      const j = pick([0, 1] as const);
      const v = t.cases[i][j];
      const desc = (a: number, b: number) => `${q(ctx.lignes[a])} et ${q(ctx.colonnes[b])}`;
      const autres: string[] = [];
      for (let a = 0; a < ctx.lignes.length; a++) for (const b of [0, 1]) if (a !== i || b !== j) autres.push(desc(a, b));
      const question = pick([
        `$${nb(v)}$ ${ctx.individu} sont dans la même case du tableau. De quelle case s'agit-il ?`,
        `À quelle case du tableau correspond l'effectif $${nb(v)}$ ?`,
        `Quelle case du tableau contient $${nb(v)}$ ${ctx.individu} ?`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "qcm",
        choices: choix4(desc(i, j), shuffle(autres)),
        expected: [desc(i, j)],
        comparator: "mcq_exact",
        canvas: canvasCroise(t),
        explanation: exp(
          "Une case d'un tableau croisé réunit les individus qui ont à la fois une modalité en ligne et une en colonne.",
          "On cherche le nombre dans le tableau, puis on remonte à sa colonne et on revient au début de sa ligne.",
          `$${nb(v)}$ est à l'intersection de la ligne ${q(ctx.lignes[i])} et de la colonne ${q(ctx.colonnes[j])}.`,
          `Ce sont les ${ctx.individu} ${desc(i, j)}.`
        ),
      };
    }, ["tableau"]),
];

/* ═══════════════ info_tab_completer ═══════════════ */

const ITEMS_TAB_COMPLETER: TutorBankItemV4[] = [
  gab("info_tab_completer_marge", "info_tableau_croise", "info_tab_completer", 2,
    "Un total de ligne est la somme des cases de la ligne ; un total de colonne, celle des cases de la colonne.",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      const n = ctx.lignes.length;
      const genre = pick(["ligne", "colonne", "total"] as const);
      const i = randomInt(0, n - 1);
      const j = pick([0, 1] as const);
      const masque: Masque = genre === "ligne" ? [i, 2] : genre === "colonne" ? [n, j] : [n, 2];
      const v = genre === "ligne" ? t.lig[i] : genre === "colonne" ? t.col[j] : t.total;
      const nom = genre === "ligne" ? `le total de la ligne ${q(ctx.lignes[i])}` : genre === "colonne" ? `le total de la colonne ${q(ctx.colonnes[j])}` : "le total général";
      const question = pick([
        `Dans le tableau, ${nom} a été effacé. Quelle est sa valeur ?`,
        `Complète le tableau : que vaut ${nom}, remplacé par « ? » ?`,
        `Le « ? » du tableau cache ${nom}. Calcule-le.`,
      ]);
      const calcul =
        genre === "ligne" ? `$${t.cases[i][0]} + ${t.cases[i][1]} = ${v}$`
        : genre === "colonne" ? `$${t.cases.map((r) => r[j]).join(" + ")} = ${v}$`
        : `$${t.col[0]} + ${t.col[1]} = ${v}$, et aussi $${t.lig.join(" + ")} = ${v}$`;
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: canvasCroise(t, { masques: [masque] }),
        explanation: exp(
          "Les marges d'un tableau croisé sont des sommes : elles ne sont pas des données nouvelles.",
          "On additionne les cases concernées, puis on contrôle par l'autre sens quand c'est possible.",
          `${calcul}.`,
          `${nom.charAt(0).toUpperCase() + nom.slice(1)} vaut $${nb(v)}$.`
        ),
      };
    }, ["tableau", "short"]),

  gab("info_tab_completer_case", "info_tableau_croise", "info_tab_completer", 3,
    "Une case manquante = le total de sa ligne (ou de sa colonne) moins les autres cases connues.",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      const i = randomInt(0, ctx.lignes.length - 1);
      const j = pick([0, 1] as const);
      const v = t.cases[i][j];
      const autre = t.cases[i][1 - j];
      const question = pick([
        `Une case du tableau a été effacée. Combien ${de(ctx.individu)} sont ${q(ctx.lignes[i])} et ${q(ctx.colonnes[j])} ?`,
        `Retrouve l'effectif caché par « ? » dans le tableau.`,
        `Complète la case « ? » du tableau, à l'aide des totaux.`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: canvasCroise(t, { masques: [[i, j]] }),
        explanation: exp(
          "Dans un tableau croisé, le total d'une ligne est la somme de ses cases : une case manquante se retrouve par soustraction.",
          "On part du total de la ligne et on retire la case connue.",
          `$${nb(t.lig[i])} - ${nb(autre)} = ${nb(v)}$. Contrôle par la colonne : $${nb(t.col[j])} - ${t.cases.filter((_, a) => a !== i).map((r) => nb(r[j])).join(" - ")} = ${nb(v)}$.`,
          `La case manquante vaut $${nb(v)}$.`
        ),
      };
    }, ["tableau", "short"]),

  gab("info_tab_completer_deux", "info_tableau_croise", "info_tab_completer", 3,
    "Commence par la case qu'on peut trouver tout de suite : celle dont la colonne est complète.",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      const i = randomInt(0, ctx.lignes.length - 1);
      const j = pick([0, 1] as const);
      const v = t.lig[i];
      const question = pick([
        `Deux nombres du tableau ont été effacés. Que vaut le total de la ligne ${q(ctx.lignes[i])} ?`,
        `Combien ${de(ctx.individu)} sont ${q(ctx.lignes[i])} en tout ? Deux cases du tableau sont cachées.`,
      ]);
      const autresCol = t.cases.filter((_, a) => a !== i).map((r) => nb(r[j]));
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: canvasCroise(t, { masques: [[i, j], [i, 2]] }),
        explanation: exp(
          "Les marges d'un tableau croisé sont des sommes : chaque ligne et chaque colonne donne une égalité.",
          "La ligne a deux inconnues, la colonne une seule : on trouve d'abord la case par la colonne, puis le total de la ligne.",
          `Case : $${nb(t.col[j])} - ${autresCol.join(" - ")} = ${nb(t.cases[i][j])}$. Total de la ligne : $${nb(t.cases[i][j])} + ${nb(t.cases[i][1 - j])} = ${nb(v)}$.`,
          `La ligne ${q(ctx.lignes[i])} compte $${nb(v)}$ ${ctx.individu}.`
        ),
      };
    }, ["tableau", "short"]),
];

/* ═══════════════ info_tab_construire ═══════════════ */

const ITEMS_TAB_CONSTRUIRE: TutorBankItemV4[] = [
  gab("info_tab_construire_compter", "info_tableau_croise", "info_tab_construire", 2,
    "Une case du tableau croisé compte les lignes du fichier qui ont les DEUX modalités.",
    () => {
      const f = tirerFichier(10);
      const { ctx } = f;
      const a = pick(ctx.cat1.valeurs);
      const b = pick(ctx.cat2.valeurs);
      const k = f.lignes.filter((l) => l.c1 === a && l.c2 === b).length;
      const question = pick([
        `On dresse le tableau croisé de « ${ctx.cat1.nom} » et « ${ctx.cat2.nom} ». Quel effectif faut-il écrire dans la case ${q(`${ctx.cat1.nom} = ${a}`)} et ${q(`${ctx.cat2.nom} = ${b}`)} ?`,
        `Pour construire le tableau croisé « ${ctx.cat1.nom} » × « ${ctx.cat2.nom} », combien ${de(ctx.individu)} faut-il compter dans la case « ${a} » / « ${b} » ?`,
        `Combien de lignes de cet extrait ont à la fois « ${ctx.cat1.nom} » égal à « ${a} » et « ${ctx.cat2.nom} » égal à « ${b} » ? C'est une case du tableau croisé.`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        canvas: canvasFichier(f),
        explanation: exp(
          "Dresser un tableau croisé, c'est compter, pour chaque couple de modalités, les individus qui ont les deux.",
          "On parcourt le fichier ligne par ligne et on coche celles qui vérifient les deux modalités.",
          `Lignes retenues : ${gardees(f, (l) => l.c1 === a && l.c2 === b)}.`,
          `La case vaut $${k}$.`
        ),
      };
    }, ["tableau", "short"]),

  gab("info_tab_construire_cases", "info_tableau_croise", "info_tab_construire", 2,
    "Un tableau croisé a une case par COUPLE de modalités : on multiplie les nombres de modalités.",
    () => {
      const f = tirerFichier(10);
      const { ctx } = f;
      const [A, B] = pick([[ctx.cat1, ctx.cat2], [ctx.cat2, ctx.cat1]] as const);
      const p = A.valeurs.length;
      const r = B.valeurs.length;
      const avecMarges = pick([false, true]);
      const v = avecMarges ? (p + 1) * (r + 1) : p * r;
      const question = avecMarges
        ? `On croise « ${A.nom} » (${A.valeurs.join(", ")}) en lignes et « ${B.nom} » (${B.valeurs.join(", ")}) en colonnes. Combien de cases de nombres le tableau aura-t-il, marges et total général COMPRIS ?`
        : `On croise « ${A.nom} » (${A.valeurs.join(", ")}) en lignes et « ${B.nom} » (${B.valeurs.join(", ")}) en colonnes. Combien de cases d'effectifs le tableau aura-t-il, SANS compter les marges ?`;
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: canvasFichier(f),
        explanation: exp(
          "Un tableau croisé a une ligne par modalité du premier caractère et une colonne par modalité du second ; les marges ajoutent une ligne et une colonne de totaux.",
          avecMarges ? "On ajoute la ligne et la colonne « Total », puis on multiplie." : "On multiplie le nombre de modalités en ligne par celui en colonne.",
          avecMarges ? `$(${p} + 1) \\times (${r} + 1) = ${v}$.` : `$${p} \\times ${r} = ${v}$.`,
          `Le tableau aura $${v}$ cases${avecMarges ? ", totaux compris" : " d'effectifs"}.`
        ),
      };
    }, ["tableau", "short"]),

  gab("info_tab_construire_phrases", "info_tableau_croise", "info_tab_construire", 3,
    "Écris d'abord le tableau vide avec ses marges, place les nombres de l'énoncé, puis complète par soustraction.",
    () => {
      const ctx = pick(CONTEXTES_CROISES.filter((c) => c.lignes.length === 2));
      const t = tirerCroise(ctx);
      const [l0, l1] = ctx.lignes;
      const [c0, c1] = ctx.colonnes;
      const cible = pick(["b", "c", "d", "col1"] as const);
      const v = cible === "b" ? t.cases[0][1] : cible === "c" ? t.cases[1][0] : cible === "d" ? t.cases[1][1] : t.col[1];
      const nomCible =
        cible === "b" ? `${q(l0)} et ${q(c1)}` : cible === "c" ? `${q(l1)} et ${q(c0)}` : cible === "d" ? `${q(l1)} et ${q(c1)}` : `${q(c1)} au total`;
      const donnees = pick([
        `L'étude porte sur $${nb(t.total)}$ ${ctx.individu}, dont $${nb(t.lig[0])}$ ${q(l0)}. Parmi les ${q(l0)}, $${nb(t.cases[0][0])}$ sont ${q(c0)} ; parmi les ${q(l1)}, $${nb(t.cases[1][0])}$ sont ${q(c0)}.`,
        `Sur $${nb(t.total)}$ ${ctx.individu}, $${nb(t.col[0])}$ sont ${q(c0)}, dont $${nb(t.cases[0][0])}$ ${q(l0)}. On compte $${nb(t.lig[0])}$ ${ctx.individu} ${q(l0)} en tout.`,
      ]);
      const cases = `${q(l0)}/${q(c0)} = $${nb(t.cases[0][0])}$, ${q(l0)}/${q(c1)} = $${nb(t.cases[0][1])}$, ${q(l1)}/${q(c0)} = $${nb(t.cases[1][0])}$, ${q(l1)}/${q(c1)} = $${nb(t.cases[1][1])}$`;
      return {
        text: `${ctx.intro} ${donnees} On dresse le tableau croisé. Combien ${de(ctx.individu)} sont ${nomCible} ?`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau croisé se dresse à partir des phrases : chaque nombre de l'énoncé va dans une case ou une marge, et les autres se déduisent par soustraction.",
          "On place le total, les marges et les cases connues, puis on complète ligne par ligne.",
          `Lignes : ${q(l0)} $${nb(t.lig[0])}$, ${q(l1)} $${nb(t.total)} - ${nb(t.lig[0])} = ${nb(t.lig[1])}$. Colonnes : ${q(c0)} $${nb(t.col[0])}$, ${q(c1)} $${nb(t.col[1])}$. Cases : ${cases}.`,
          `Il y a $${nb(v)}$ ${ctx.individu} ${nomCible}.`
        ),
      };
    }, ["tableau", "short"]),
];

/* ═══════════════ info_filtre_sous_ensemble ═══════════════ */

/** Une modalité du tableau croisé (ligne i ou colonne j) et son effectif marginal. */
function modalites(t: Croise) {
  return [
    ...t.ctx.lignes.map((l, i) => ({ nom: l, eff: t.lig[i], genre: "ligne" as const, k: i })),
    ...t.ctx.colonnes.map((c, j) => ({ nom: c, eff: t.col[j], genre: "colonne" as const, k: j })),
  ];
}

const ITEMS_FILTRE_SOUS_ENSEMBLE: TutorBankItemV4[] = [
  gab("info_filtre_sous_ens_croise", "info_filtre_donnees", "info_filtre_sous_ensemble", 1,
    "Un filtre sur un seul critère garde toute une ligne (ou toute une colonne) du tableau : c'est un total.",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      const m = pick(modalites(t));
      const question = pick([
        `Dans le fichier complet, on applique le seul filtre ${q(m.nom)}. Combien ${de(ctx.individu)} le tableur affiche-t-il encore ?`,
        `On ne garde que les ${ctx.individu} ${q(m.nom)}. Combien en compte-t-on ?`,
        `Combien ${de(ctx.individu)} le filtre ${q(m.nom)} sélectionne-t-il ?`,
      ]);
      const detail = m.genre === "ligne" ? t.cases[m.k] : t.cases.map((r) => r[m.k]);
      return {
        text: `${ctx.intro} Le tableau résume le fichier. ${question}`,
        format: "short",
        expected: [String(m.eff)],
        comparator: "number_equal",
        canvas: canvasCroise(t),
        explanation: exp(
          "Filtrer un fichier, c'est garder le sous-ensemble des individus qui vérifient le critère, quelle que soit la valeur de l'autre caractère.",
          `Le critère ${q(m.nom)} correspond à toute la ${m.genre} : on prend son total.`,
          `$${detail.map(nb).join(" + ")} = ${nb(m.eff)}$.`,
          `Le filtre garde $${nb(m.eff)}$ ${ctx.individu}.`
        ),
      };
    }, ["filtre", "short"]),

  gab("info_filtre_sous_ens_fichier", "info_filtre_donnees", "info_filtre_sous_ensemble", 2,
    "Passe les lignes une à une : on garde celles qui vérifient le critère, on compte.",
    () => {
      const f = tirerFichier(10);
      const { ctx } = f;
      const c = pick(f.criteres);
      const k = f.lignes.filter(c.teste).length;
      const question = pick([
        `On applique au tableur le filtre ${c.texte}. Combien de lignes restent affichées ?`,
        `Combien ${de(ctx.individu)} de cet extrait vérifient ${c.texte} ?`,
        `On ne garde que les ${ctx.individu} tels que ${c.texte}. Combien en reste-t-il ?`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        canvas: canvasFichier(f),
        explanation: exp(
          "Un filtre affiche les seules lignes qui vérifient le critère ; les autres sont masquées, pas effacées.",
          "On lit la colonne concernée de haut en bas et on garde les lignes qui conviennent.",
          `Lignes gardées : ${gardees(f, c.teste)}.`,
          `Le filtre garde $${k}$ ${ctx.individu}.`
        ),
      };
    }, ["filtre", "short"]),

  gab("info_filtre_sous_ens_retrouver", "info_filtre_donnees", "info_filtre_sous_ensemble", 2,
    "Calcule les totaux de chaque ligne et de chaque colonne, puis cherche celui qui vaut le nombre annoncé.",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      const ms = modalites(t);
      const m = pick(ms);
      const question = pick([
        `Un collègue a filtré le fichier sur un seul critère : il reste $${nb(m.eff)}$ ${ctx.individu}. Quel filtre a-t-il appliqué ?`,
        `Après un filtre à un seul critère, le tableur affiche $${nb(m.eff)}$ lignes. Quel est ce filtre ?`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "qcm",
        choices: choix4(q(m.nom), shuffle(ms.filter((x) => x !== m).map((x) => q(x.nom)))),
        expected: [q(m.nom)],
        comparator: "mcq_exact",
        canvas: canvasCroise(t, { marges: false }),
        explanation: exp(
          "Un filtre à un critère garde tout un sous-ensemble : son effectif est le total d'une ligne ou d'une colonne.",
          "On calcule chaque total, puis on repère celui qui vaut le nombre annoncé.",
          ms.map((x) => `${q(x.nom)} : $${nb(x.eff)}$`).join(" ; ") + ".",
          `Le filtre appliqué est ${q(m.nom)}.`
        ),
      };
    }, ["filtre"]),
];

/* ═══════════════ info_filtre_et ═══════════════ */

const ITEMS_FILTRE_ET: TutorBankItemV4[] = [
  gab("info_filtre_et_croise", "info_filtre_donnees", "info_filtre_et", 2,
    "ET : les deux critères à la fois. Dans le tableau croisé, c'est UNE seule case.",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      const i = randomInt(0, ctx.lignes.length - 1);
      const j = pick([0, 1] as const);
      const v = t.cases[i][j];
      const question = pick([
        `On filtre le fichier avec ${q(ctx.lignes[i])} ET ${q(ctx.colonnes[j])}. Combien ${de(ctx.individu)} restent ?`,
        `Combien ${de(ctx.individu)} le filtre ${q(ctx.lignes[i])} ET ${q(ctx.colonnes[j])} sélectionne-t-il ?`,
        `On ne garde que les ${ctx.individu} qui sont ${q(ctx.colonnes[j])} ET ${q(ctx.lignes[i])}. Combien en compte-t-on ?`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: canvasCroise(t),
        explanation: exp(
          "Le filtre ET garde les individus qui vérifient les DEUX critères en même temps.",
          "On croise la ligne et la colonne : c'est la case d'intersection, pas une somme.",
          `Ligne ${q(ctx.lignes[i])}, colonne ${q(ctx.colonnes[j])} : $${nb(v)}$.`,
          `Le filtre garde $${nb(v)}$ ${ctx.individu}. ⚠️ Additionner $${nb(t.lig[i])}$ et $${nb(t.col[j])}$ serait un OU, et compterait la case deux fois.`
        ),
      };
    }, ["filtre", "short"]),

  gab("info_filtre_et_fichier", "info_filtre_donnees", "info_filtre_et", 3,
    "Une ligne passe le filtre ET seulement si elle vérifie le premier critère ET le second.",
    () => {
      const f = tirerFichier(10);
      const { ctx } = f;
      const n1 = ctx.cat1.valeurs.length;
      const n2 = ctx.cat2.valeurs.length;
      // Deux critères sur deux colonnes DIFFÉRENTES.
      const groupes = [f.criteres.slice(0, n1), f.criteres.slice(n1, n1 + n2), f.criteres.slice(n1 + n2)];
      const [g1, g2] = shuffle([0, 1, 2]).slice(0, 2);
      const A = pick(groupes[g1]);
      const B = pick(groupes[g2]);
      const teste = (l: LigneFichier) => A.teste(l) && B.teste(l);
      const k = f.lignes.filter(teste).length;
      const question = pick([
        `On applique le filtre ${A.texte} ET ${B.texte}. Combien de lignes restent affichées ?`,
        `Combien ${de(ctx.individu)} vérifient à la fois ${A.texte} et ${B.texte} ?`,
        `Le tableur garde les lignes qui vérifient ${A.texte} ET ${B.texte}. Combien en garde-t-il ?`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        canvas: canvasFichier(f),
        explanation: exp(
          "Le filtre ET garde une ligne seulement si elle vérifie les deux critères.",
          "On garde d'abord les lignes qui vérifient le premier critère, puis, parmi elles, celles qui vérifient le second.",
          `Premier critère : ${gardees(f, A.teste)}. Parmi elles, second critère : ${gardees(f, teste)}.`,
          `Le filtre garde $${k}$ ${ctx.individu}.`
        ),
      };
    }, ["filtre", "short"]),

  gab("info_filtre_et_non", "info_filtre_donnees", "info_filtre_et", 3,
    "NON « X » désigne l'autre modalité de la colonne : il n'y en a que deux.",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      const i = randomInt(0, ctx.lignes.length - 1);
      const v = t.cases[i][1];
      return {
        text: `${ctx.intro} ` + pick([
          `Combien ${de(ctx.individu)} le filtre ${q(ctx.lignes[i])} ET NON ${q(ctx.colonnes[0])} sélectionne-t-il ?`,
          `On garde les ${ctx.individu} ${q(ctx.lignes[i])} qui ne sont PAS ${q(ctx.colonnes[0])}. Combien en compte-t-on ?`,
        ]),
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: canvasCroise(t),
        explanation: exp(
          "NON inverse un critère : le caractère en colonne n'ayant que deux modalités, NON " + q(ctx.colonnes[0]) + " veut dire " + q(ctx.colonnes[1]) + ".",
          "On remplace le critère nié par son contraire, puis on applique le ET : une seule case.",
          `Case ${q(ctx.lignes[i])} / ${q(ctx.colonnes[1])} : $${nb(v)}$, soit $${nb(t.lig[i])} - ${nb(t.cases[i][0])} = ${nb(v)}$.`,
          `Le filtre garde $${nb(v)}$ ${ctx.individu}.`
        ),
      };
    }, ["filtre", "short"]),
];

/* ═══════════════ info_filtre_ou ═══════════════ */

const ITEMS_FILTRE_OU: TutorBankItemV4[] = [
  gab("info_filtre_ou_croise", "info_filtre_donnees", "info_filtre_ou", 3,
    "OU : au moins l'un des deux critères. Additionne, puis retire ceux comptés deux fois.",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      const i = randomInt(0, ctx.lignes.length - 1);
      const j = pick([0, 1] as const);
      const v = t.lig[i] + t.col[j] - t.cases[i][j];
      const question = pick([
        `On filtre le fichier avec ${q(ctx.lignes[i])} OU ${q(ctx.colonnes[j])} (au moins l'un des deux). Combien ${de(ctx.individu)} restent ?`,
        `Combien ${de(ctx.individu)} sont ${q(ctx.lignes[i])} ou ${q(ctx.colonnes[j])}, l'un au moins des deux ?`,
        `Le filtre ${q(ctx.colonnes[j])} OU ${q(ctx.lignes[i])} est appliqué. Combien ${de(ctx.individu)} sélectionne-t-il ?`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "qcm",
        choices: choix4(`$${nb(v)}$`, leurresNum(v, [t.lig[i] + t.col[j], t.cases[i][j], t.total - v])),
        expected: [`$${nb(v)}$`],
        comparator: "mcq_exact",
        canvas: canvasCroise(t),
        explanation: exp(
          "Le filtre OU garde les individus qui vérifient au moins un des deux critères — et ceux qui vérifient les deux.",
          "On additionne la ligne et la colonne, puis on retire la case commune, comptée deux fois.",
          `$${nb(t.lig[i])} + ${nb(t.col[j])} - ${nb(t.cases[i][j])} = ${nb(v)}$.`,
          `Le filtre garde $${nb(v)}$ ${ctx.individu}. ⚠️ Sans retirer la case commune, on trouverait $${nb(t.lig[i] + t.col[j])}$.`
        ),
        choiceDiagnostics: [{ choice: `$${nb(t.lig[i] + t.col[j])}$`, cause: "a compté deux fois les individus qui vérifient les deux critères" }],
      };
    }, ["filtre"]),

  gab("info_filtre_ou_lignes", "info_filtre_donnees", "info_filtre_ou", 2,
    "Deux modalités du MÊME caractère ne se recouvrent pas : un OU entre elles est une simple somme.",
    () => {
      const ctx = pick(CONTEXTES_CROISES.filter((c) => c.lignes.length === 3));
      const t = tirerCroise(ctx);
      const [i, k] = shuffle([0, 1, 2]).slice(0, 2).sort();
      const v = t.lig[i] + t.lig[k];
      const question = pick([
        `Combien ${de(ctx.individu)} le filtre ${q(ctx.lignes[i])} OU ${q(ctx.lignes[k])} sélectionne-t-il ?`,
        `On garde les ${ctx.individu} ${q(ctx.lignes[i])} ou ${q(ctx.lignes[k])}. Combien en compte-t-on ?`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: canvasCroise(t),
        explanation: exp(
          "Le filtre OU garde les individus qui vérifient au moins un critère. Un individu ne peut pas avoir deux modalités du même caractère : il n'y a rien à retirer.",
          "On additionne les totaux des deux lignes.",
          `$${nb(t.lig[i])} + ${nb(t.lig[k])} = ${nb(v)}$.`,
          `Le filtre garde $${nb(v)}$ ${ctx.individu}.`
        ),
      };
    }, ["filtre", "short"]),

  gab("info_filtre_ou_fichier", "info_filtre_donnees", "info_filtre_ou", 3,
    "Une ligne passe le filtre OU dès qu'elle vérifie l'un des critères. Ne la compte qu'une fois.",
    () => {
      const f = tirerFichier(10);
      const { ctx } = f;
      const n1 = ctx.cat1.valeurs.length;
      const n2 = ctx.cat2.valeurs.length;
      const groupes = [f.criteres.slice(0, n1), f.criteres.slice(n1, n1 + n2), f.criteres.slice(n1 + n2)];
      const [g1, g2] = shuffle([0, 1, 2]).slice(0, 2);
      const A = pick(groupes[g1]);
      const B = pick(groupes[g2]);
      const teste = (l: LigneFichier) => A.teste(l) || B.teste(l);
      const k = f.lignes.filter(teste).length;
      const kA = f.lignes.filter(A.teste).length;
      const kB = f.lignes.filter(B.teste).length;
      const kAB = f.lignes.filter((l) => A.teste(l) && B.teste(l)).length;
      return {
        text: `${ctx.intro} ` + pick([
          `On applique le filtre ${A.texte} OU ${B.texte}. Combien de lignes restent affichées ?`,
          `Combien ${de(ctx.individu)} vérifient ${A.texte} ou ${B.texte} (au moins l'un des deux) ?`,
        ]),
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        canvas: canvasFichier(f),
        explanation: exp(
          "Le filtre OU garde une ligne dès qu'elle vérifie au moins un des deux critères.",
          "On compte les lignes de chaque critère, puis on retire celles qui vérifient les deux, comptées deux fois.",
          `$${kA} + ${kB} - ${kAB} = ${k}$. Lignes gardées : ${gardees(f, teste)}.`,
          `Le filtre garde $${k}$ ${ctx.individu}.`
        ),
      };
    }, ["filtre", "short"]),
];

/* ═══════════════ info_filtre_non ═══════════════ */

const ITEMS_FILTRE_NON: TutorBankItemV4[] = [
  gab("info_filtre_non_croise", "info_filtre_donnees", "info_filtre_non", 2,
    "NON : tous les autres. On retire du total général.",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      // On ne nie jamais la modalité « négative » (« Rappel en retard ») : double négation.
      const m = pick(modalites(t).filter((x) => !(x.genre === "colonne" && x.k === 1)));
      const v = t.total - m.eff;
      const question = pick([
        `On filtre le fichier avec NON ${q(m.nom)}. Combien ${de(ctx.individu)} restent ?`,
        `Combien ${de(ctx.individu)} ne sont PAS ${q(m.nom)} ?`,
        `Le filtre NON ${q(m.nom)} est appliqué. Combien de lignes le tableur affiche-t-il ?`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: canvasCroise(t),
        explanation: exp(
          "Le filtre NON garde tous les individus qui ne vérifient PAS le critère : c'est le complémentaire.",
          "On retire du total général l'effectif du critère.",
          `$${nb(t.total)} - ${nb(m.eff)} = ${nb(v)}$.`,
          `Le filtre garde $${nb(v)}$ ${ctx.individu}.`
        ),
      };
    }, ["filtre", "short"]),

  gab("info_filtre_non_et", "info_filtre_donnees", "info_filtre_non", 3,
    "NON (A ET B) garde tout le monde SAUF une case du tableau.",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      const i = randomInt(0, ctx.lignes.length - 1);
      const j = pick([0, 1] as const);
      const v = t.total - t.cases[i][j];
      return {
        text: `${ctx.intro} ` + pick([
          `Combien ${de(ctx.individu)} le filtre NON (${q(ctx.lignes[i])} ET ${q(ctx.colonnes[j])}) sélectionne-t-il ?`,
          `On retire du fichier les ${ctx.individu} à la fois ${q(ctx.lignes[i])} et ${q(ctx.colonnes[j])}. Combien en reste-t-il ?`,
        ]),
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: canvasCroise(t),
        explanation: exp(
          "NON (A ET B) garde les individus qui ne vérifient pas les deux critères à la fois : tous, sauf ceux de la case A/B.",
          "On retire la case d'intersection du total général.",
          `$${nb(t.total)} - ${nb(t.cases[i][j])} = ${nb(v)}$.`,
          `Le filtre garde $${nb(v)}$ ${ctx.individu}.`
        ),
      };
    }, ["filtre", "short"]),

  gab("info_filtre_non_fichier", "info_filtre_donnees", "info_filtre_non", 3,
    "Le contraire de « ≥ » est « < » ; le contraire de « = » est « ≠ ».",
    () => {
      const f = tirerFichier(10);
      const { ctx } = f;
      const c = pick(f.criteres.filter((x) => !x.texte.includes("= Non")));
      const teste = (l: LigneFichier) => !c.teste(l);
      const k = f.lignes.filter(teste).length;
      return {
        text: `${ctx.intro} ` + pick([
          `On applique le filtre NON ${c.texte}. Combien de lignes restent affichées ?`,
          `Combien ${de(ctx.individu)} de l'extrait ne vérifient PAS ${c.texte} ?`,
        ]),
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        canvas: canvasFichier(f),
        explanation: exp(
          "Le filtre NON garde les lignes qui ne vérifient pas le critère.",
          `NON ${c.texte} s'écrit aussi ${c.contraire} : on compte ces lignes, ou on retire du nombre total de lignes celles qui vérifient le critère.`,
          `$${f.lignes.length} - ${f.lignes.length - k} = ${k}$. Lignes gardées : ${gardees(f, teste)}.`,
          `Le filtre garde $${k}$ ${ctx.individu}.`
        ),
      };
    }, ["filtre", "short"]),
];

/* ═══════════════ info_filtre_effectif ═══════════════ */

/** Un filtre composé sur le tableau croisé : son texte, son effectif, son calcul. */
type FiltreCompose = { texte: string; eff: number; calcul: string };

function filtresComposes(t: Croise): FiltreCompose[] {
  const { ctx } = t;
  const out: FiltreCompose[] = [];
  const L = ctx.lignes;
  const [c0, c1] = ctx.colonnes;
  L.forEach((l, i) => {
    out.push({ texte: `${q(l)} ET ${q(c0)}`, eff: t.cases[i][0], calcul: `la case ${q(l)}/${q(c0)} : $${nb(t.cases[i][0])}$` });
    out.push({ texte: `${q(l)} ET ${q(c1)}`, eff: t.cases[i][1], calcul: `la case ${q(l)}/${q(c1)} : $${nb(t.cases[i][1])}$` });
    out.push({ texte: `${q(l)} ET NON ${q(c0)}`, eff: t.cases[i][1], calcul: `NON ${q(c0)} = ${q(c1)}, la case ${q(l)}/${q(c1)} : $${nb(t.cases[i][1])}$` });
    out.push({ texte: `${q(l)} OU ${q(c0)}`, eff: t.lig[i] + t.col[0] - t.cases[i][0], calcul: `$${nb(t.lig[i])} + ${nb(t.col[0])} - ${nb(t.cases[i][0])} = ${nb(t.lig[i] + t.col[0] - t.cases[i][0])}$` });
    out.push({ texte: `${q(l)} OU ${q(c1)}`, eff: t.lig[i] + t.col[1] - t.cases[i][1], calcul: `$${nb(t.lig[i])} + ${nb(t.col[1])} - ${nb(t.cases[i][1])} = ${nb(t.lig[i] + t.col[1] - t.cases[i][1])}$` });
    out.push({ texte: `NON ${q(l)}`, eff: t.total - t.lig[i], calcul: `$${nb(t.total)} - ${nb(t.lig[i])} = ${nb(t.total - t.lig[i])}$` });
    out.push({ texte: `NON (${q(l)} ET ${q(c0)})`, eff: t.total - t.cases[i][0], calcul: `$${nb(t.total)} - ${nb(t.cases[i][0])} = ${nb(t.total - t.cases[i][0])}$` });
  });
  return out;
}

/** Une phrase en français et le filtre de tableur qui la traduit. */
function phraseCritere(f: Fichier, c: Critere): string {
  const { ctx } = f;
  const m = c.texte.match(/^« (.+) (=|≥|<) (.+) »$/);
  if (!m) return c.texte;
  const [, nom, op, val] = m;
  if (op === "=") return `dont « ${nom} » vaut « ${val} »`;
  if (op === "≥") return `dont « ${nom} » vaut au moins ${val} ${ctx.num.unite}`;
  return `dont « ${nom} » est inférieur à ${val} ${ctx.num.unite}`;
}

const ITEMS_FILTRE_EFFECTIF: TutorBankItemV4[] = [
  gab("info_filtre_effectif_compose", "info_filtre_donnees", "info_filtre_effectif", 3,
    "Traduis le filtre en une zone du tableau : une case (ET), une ligne plus une colonne moins leur case (OU), le reste du total (NON).",
    () => {
      const t = tirerCroise();
      const { ctx } = t;
      const fc = pick(filtresComposes(t));
      return {
        text: `${ctx.intro} ` + pick([
          `Quel effectif le filtre ${fc.texte} renvoie-t-il ?`,
          `Combien ${de(ctx.individu)} restent après le filtre ${fc.texte} ?`,
          `On applique au fichier le filtre ${fc.texte}. Combien de lignes le tableur affiche-t-il ?`,
        ]),
        format: "short",
        expected: [String(fc.eff)],
        comparator: "number_equal",
        canvas: canvasCroise(t),
        explanation: exp(
          "Chaque filtre correspond à une zone du tableau croisé : ET = une case, OU = une ligne et une colonne sans compter deux fois leur case, NON = le reste du total.",
          "On traduit le filtre en zone, puis on calcule son effectif.",
          `Pour ${fc.texte} : ${fc.calcul}.`,
          `Le filtre renvoie $${nb(fc.eff)}$ ${ctx.individu}.`
        ),
      };
    }, ["filtre", "short"]),

  gab("info_filtre_effectif_lequel", "info_filtre_donnees", "info_filtre_effectif", 3,
    "Calcule l'effectif de chacun des quatre filtres proposés.",
    () => {
      for (;;) {
        const t = tirerCroise();
        const { ctx } = t;
        const tous = shuffle(filtresComposes(t));
        const quatre: FiltreCompose[] = [];
        for (const fc of tous) if (quatre.length < 4 && quatre.every((x) => x.eff !== fc.eff && x.texte !== fc.texte)) quatre.push(fc);
        if (quatre.length < 4) continue;
        const bon = quatre[0];
        return {
          text: `${ctx.intro} ` + pick([
            `Après un filtre, le tableur affiche $${nb(bon.eff)}$ ${ctx.individu}. Quel filtre a été appliqué ?`,
            `Lequel de ces filtres renvoie exactement $${nb(bon.eff)}$ ${ctx.individu} ?`,
          ]),
          format: "qcm",
          choices: choix4(bon.texte, quatre.slice(1).map((x) => x.texte)),
          expected: [bon.texte],
          comparator: "mcq_exact",
          canvas: canvasCroise(t),
          explanation: exp(
            "Chaque filtre correspond à une zone du tableau croisé, dont on calcule l'effectif.",
            "On calcule l'effectif de chaque proposition et on garde celle qui donne le nombre annoncé.",
            quatre.map((x) => `${x.texte} : $${nb(x.eff)}$`).join(" ; ") + ".",
            `C'est le filtre ${bon.texte} (${bon.calcul}).`
          ),
        };
      }
    }, ["filtre"]),

  gab("info_filtre_effectif_traduire", "info_filtre_donnees", "info_filtre_effectif", 2,
    "« À la fois » se traduit par ET, « l'un ou l'autre » par OU, « ne pas » par NON.",
    () => {
      const f = tirerFichier(10);
      const { ctx } = f;
      const n1 = ctx.cat1.valeurs.length;
      const A = pick(f.criteres.slice(0, n1));
      const B = pick(f.criteres.slice(-2));
      const lien = pick(["ET", "OU"] as const);
      const phrase =
        lien === "ET"
          ? `les ${ctx.individu} ${phraseCritere(f, A)} et, en même temps, ${phraseCritere(f, B)}`
          : `les ${ctx.individu} ${phraseCritere(f, A)}, ou bien ${phraseCritere(f, B)} (l'un des deux au moins)`;
      const bonne = `${A.texte} ${lien} ${B.texte}`;
      const autre = lien === "ET" ? "OU" : "ET";
      const leurres = [`${A.texte} ${autre} ${B.texte}`, `${A.texte} ${lien} ${B.contraire}`, `${A.contraire} ${lien} ${B.texte}`];
      const k = f.lignes.filter((l) => (lien === "ET" ? A.teste(l) && B.teste(l) : A.teste(l) || B.teste(l))).length;
      return {
        text: `${ctx.intro} On veut afficher ${phrase}. Quel filtre faut-il écrire ?`,
        format: "qcm",
        choices: choix4(bonne, leurres),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasFichier(f),
        explanation: exp(
          "Un filtre de tableur traduit une phrase : « en même temps » devient ET, « l'un des deux au moins » devient OU, et chaque critère garde son sens (au moins = « ≥ », inférieur à = « < »).",
          "On traduit chaque morceau de la phrase en critère, puis le mot de liaison en connecteur.",
          `On écrit ${bonne}. Sur cet extrait, il garde $${k}$ ligne${k > 1 ? "s" : ""}.`,
          `Le bon filtre est ${bonne}.`
        ),
      };
    }, ["filtre"]),
];

/* ─────────── Séries à un caractère (barres, camembert) ─────────── */

export type ContexteSerie = {
  intro: string;
  /** Le caractère étudié, avec son article : « le genre musical ». */
  caractere: string;
  /** Les modalités, courtes (étiquettes de barres). */
  modalites: string[];
  /** Ce qu'on compte, au pluriel, et l'unité si elle n'est pas « 1 ». */
  individu: string;
  unite: string;
  titre: string;
  min: number;
  max: number;
  pas: number;
  /** Pour « choisir la représentation » : l'évolution et la relation possibles. */
  evolution: string;
  relation: string;
};

export const CONTEXTES_SERIES: readonly ContexteSerie[] = [
  { intro: "Une programmatrice de radio a compté les titres diffusés en une semaine.", caractere: "le genre musical", modalites: ["Pop", "Rap", "Rock", "Électro", "Jazz"], individu: "titres", unite: "titres", titre: "Titres diffusés par genre", min: 10, max: 90, pas: 5, evolution: "le nombre de titres diffusés chaque semaine depuis janvier", relation: "le lien entre la durée d'un titre et son nombre de diffusions" },
  { intro: "Un journaliste sportif a recensé les licences sportives d'une ville.", caractere: "le sport pratiqué", modalites: ["Football", "Basket", "Judo", "Tennis", "Natation"], individu: "licences", unite: "licences", titre: "Licences par sport", min: 100, max: 900, pas: 50, evolution: "le nombre de licences de football depuis dix ans", relation: "le lien entre l'âge des licenciés et leurs heures d'entraînement" },
  { intro: "Une agente de tri a pesé les déchets collectés dans un quartier.", caractere: "le type de déchet", modalites: ["Verre", "Papier", "Plastique", "Métal"], individu: "tonnes", unite: "tonnes", titre: "Déchets collectés (en tonnes)", min: 20, max: 160, pas: 10, evolution: "la masse de verre collectée chaque mois de l'année", relation: "le lien entre le nombre d'habitants d'une rue et la masse de déchets qu'on y ramasse" },
  { intro: "Une urbaniste a interrogé des salariés sur leur trajet domicile-travail.", caractere: "le mode de transport", modalites: ["Voiture", "Bus", "Vélo", "Marche", "Train"], individu: "salariés", unite: "salariés", titre: "Mode de transport des salariés", min: 20, max: 240, pas: 10, evolution: "le nombre de cyclistes comptés chaque année depuis 2015", relation: "le lien entre la distance domicile-travail et la durée du trajet" },
  { intro: "Une diététicienne a interrogé des élèves sur leur petit-déjeuner.", caractere: "le petit-déjeuner", modalites: ["Céréales", "Tartines", "Fruits", "Rien"], individu: "élèves", unite: "élèves", titre: "Petit-déjeuner des élèves", min: 15, max: 120, pas: 5, evolution: "la part d'élèves sans petit-déjeuner, mesurée chaque année", relation: "le lien entre l'heure du coucher et l'heure du réveil" },
  { intro: "Un ingénieur du réseau électrique a relevé la production annuelle d'un pays.", caractere: "la source d'énergie", modalites: ["Nucléaire", "Hydraulique", "Éolien", "Solaire", "Gaz"], individu: "TWh", unite: "TWh", titre: "Production d'électricité (TWh)", min: 2, max: 40, pas: 1, evolution: "la production solaire de chaque mois de l'année", relation: "le lien entre l'ensoleillement d'une journée et la production solaire" },
  { intro: "L'exploitante d'un cinéma a compté les entrées du mois.", caractere: "le genre du film", modalites: ["Comédie", "Action", "Animation", "Drame", "Horreur"], individu: "entrées", unite: "entrées", titre: "Entrées par genre de film", min: 200, max: 2400, pas: 100, evolution: "le nombre d'entrées de chaque semaine de l'été", relation: "le lien entre le budget publicitaire d'un film et son nombre d'entrées" },
  { intro: "Un libraire a fait le bilan de ses ventes du trimestre.", caractere: "le rayon", modalites: ["Romans", "BD", "Mangas", "Jeunesse", "Essais"], individu: "livres", unite: "livres vendus", titre: "Livres vendus par rayon", min: 50, max: 600, pas: 25, evolution: "les ventes de mangas mois par mois", relation: "le lien entre le prix d'un livre et le nombre d'exemplaires vendus" },
  { intro: "Un conseiller de l'office de tourisme a noté la provenance des visiteurs.", caractere: "la provenance", modalites: ["France", "Belgique", "Allemagne", "Suisse", "Autres"], individu: "visiteurs", unite: "visiteurs", titre: "Provenance des visiteurs", min: 40, max: 800, pas: 20, evolution: "le nombre de visiteurs de chaque mois de l'année", relation: "le lien entre la température d'une journée et le nombre de visiteurs" },
  { intro: "Une agricultrice a fait le point sur l'occupation de ses terres.", caractere: "la culture", modalites: ["Blé", "Maïs", "Colza", "Prairie"], individu: "hectares", unite: "hectares", titre: "Surfaces cultivées (ha)", min: 5, max: 60, pas: 5, evolution: "le rendement du blé année après année", relation: "le lien entre la pluie reçue par une parcelle et son rendement" },
  { intro: "Une conceptrice de jeux vidéo a étudié les joueurs d'un jeu en ligne.", caractere: "le support de jeu", modalites: ["Console", "PC", "Téléphone", "Tablette"], individu: "joueurs", unite: "milliers de joueurs", titre: "Joueurs par support (milliers)", min: 4, max: 80, pas: 2, evolution: "le nombre de joueurs connectés chaque jour du mois", relation: "le lien entre le temps de jeu et le score obtenu" },
  { intro: "Le directeur d'un conservatoire a compté les inscriptions.", caractere: "l'instrument", modalites: ["Piano", "Guitare", "Violon", "Batterie", "Flûte"], individu: "élèves", unite: "élèves", titre: "Élèves par instrument", min: 8, max: 70, pas: 2, evolution: "le nombre d'inscrits au conservatoire chaque rentrée depuis 2015", relation: "le lien entre les heures de pratique par semaine et la note d'examen" },
  { intro: "Une médecin urgentiste a classé les passages d'une semaine.", caractere: "le motif de venue", modalites: ["Fracture", "Fièvre", "Plaie", "Douleur", "Autre"], individu: "patients", unite: "patients", titre: "Passages aux urgences par motif", min: 20, max: 260, pas: 10, evolution: "le nombre de passages de chaque jour de la semaine", relation: "le lien entre l'heure d'arrivée et le temps d'attente" },
  { intro: "Une météorologue a classé les journées observées par un réseau de stations.", caractere: "le temps observé", modalites: ["Soleil", "Nuages", "Pluie", "Orage"], individu: "journées", unite: "journées", titre: "Temps observé (en jours)", min: 4, max: 40, pas: 2, evolution: "la température moyenne de chaque mois de l'année", relation: "le lien entre l'altitude d'une station et sa température" },
  { intro: "Le gérant d'une pizzeria a compté les commandes du samedi.", caractere: "la pizza commandée", modalites: ["Margherita", "Reine", "4 fromages", "Végétarienne"], individu: "pizzas", unite: "pizzas", titre: "Pizzas commandées", min: 10, max: 90, pas: 5, evolution: "le nombre de pizzas vendues chaque samedi de l'année", relation: "le lien entre la température extérieure et le nombre de commandes livrées" },
  { intro: "Une chargée d'études d'une plateforme de streaming a analysé les écoutes d'un titre.", caractere: "le pays d'écoute", modalites: ["France", "Canada", "Belgique", "Suisse", "Maroc"], individu: "écoutes", unite: "milliers d'écoutes", titre: "Écoutes par pays (milliers)", min: 10, max: 300, pas: 10, evolution: "le nombre d'écoutes du titre chaque jour depuis sa sortie", relation: "le lien entre le nombre d'abonnés d'un artiste et ses écoutes" },
] as const;

/** Une série tirée : des valeurs multiples de `pas`, toutes DISTINCTES. */
export function tirerSerie(ctx: ContexteSerie = pick(CONTEXTES_SERIES), nbMod?: number) {
  const n = Math.min(nbMod ?? ctx.modalites.length, ctx.modalites.length);
  const modalites = ctx.modalites.slice(0, n);
  for (;;) {
    const valeurs = modalites.map(() => randomInt(ctx.min / ctx.pas, ctx.max / ctx.pas) * ctx.pas);
    if (new Set(valeurs).size === n) return { ctx, modalites, valeurs, total: valeurs.reduce((s, v) => s + v, 0) };
  }
}

/** Des parts en % multiples de 5, toutes distinctes, de somme 100. */
export function tirerParts(n: number): number[] {
  for (;;) {
    const coupures = shuffle(Array.from({ length: 19 }, (_, i) => (i + 1) * 5)).slice(0, n - 1).sort((a, b) => a - b);
    const parts = [...coupures, 100].map((c, i, t) => c - (i ? t[i - 1] : 0));
    if (new Set(parts).size === n && parts.every((p) => p >= 5)) return parts;
  }
}

/* ═══════════════ info_rep_barres ═══════════════ */

/** Des parts distinctes, multiples de `pas`, entre 10 et 90 %. */
function partsDistinctes(n: number, pas: 5 | 10): number[] {
  for (;;) {
    const p = Array.from({ length: n }, () => randomInt(10 / pas, 90 / pas) * pas);
    if (new Set(p).size === n) return p;
  }
}

function canvasBarresParts(ctx: ContexteCroise, parts: number[], titre?: string): CanvasFigure {
  return {
    kind: "stat_graph",
    graphType: "barres",
    title: titre ?? `Part de « ${ctx.colonnes[0]} » selon ${ctx.carLigne} (en %)`,
    data: ctx.courts.map((c, i) => ({ label: c, value: parts[i] })),
    display: { showValues: false, showLabels: true, showAxis: true, step: 10, axeY: "%" },
  };
}

const ITEMS_REP_BARRES: TutorBankItemV4[] = [
  gab("info_rep_barres_lire", "info_representations_croisees", "info_rep_barres", 1,
    "Repère la barre du groupe, puis lis sa hauteur sur l'axe gradué en %.",
    () => {
      const ctx = pick(CONTEXTES_CROISES);
      const parts = partsDistinctes(ctx.lignes.length, 10);
      const i = randomInt(0, ctx.lignes.length - 1);
      const question = pick([
        `D'après le diagramme, quelle part des ${ctx.individu} ${q(ctx.lignes[i])} sont ${q(ctx.colonnes[0])} ? (en %)`,
        `Chez les ${ctx.individu} ${q(ctx.lignes[i])}, quel pourcentage est ${q(ctx.colonnes[0])} ?`,
        `Lis sur le diagramme le pourcentage de ${q(ctx.colonnes[0])} parmi les ${ctx.individu} ${q(ctx.lignes[i])}.`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(parts[i])],
        comparator: "number_equal",
        canvas: canvasBarresParts(ctx, parts),
        explanation: exp(
          "Ce diagramme croise deux caractères : chaque barre est un groupe (en ligne du tableau), sa hauteur la part de « " + ctx.colonnes[0] + " » DANS ce groupe.",
          "On repère la barre du groupe, puis on lit sa hauteur sur l'axe gradué de 10 en 10.",
          `La barre ${q(ctx.courts[i])} monte à ${pc(parts[i])}.`,
          `${pc(parts[i])} des ${ctx.individu} ${q(ctx.lignes[i])} sont ${q(ctx.colonnes[0])}.`
        ),
      };
    }, ["diagramme", "short"]),

  gab("info_rep_barres_effectif", "info_representations_croisees", "info_rep_barres", 2,
    "Le pourcentage lu s'applique à l'effectif du GROUPE, pas à l'effectif total.",
    () => {
      const ctx = pick(CONTEXTES_CROISES);
      const parts = partsDistinctes(ctx.lignes.length, 5);
      const i = randomInt(0, ctx.lignes.length - 1);
      const N = randomInt(2, 30) * 20;
      const v = (N * parts[i]) / 100;
      const question = pick([
        `Il y a $${nb(N)}$ ${ctx.individu} ${q(ctx.lignes[i])}. Combien de ces ${ctx.individu} sont ${q(ctx.colonnes[0])} ?`,
        `Le groupe ${q(ctx.lignes[i])} compte $${nb(N)}$ ${ctx.individu}. Combien sont ${q(ctx.colonnes[0])} ?`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: canvasBarresParts(ctx, parts),
        explanation: exp(
          "Chaque barre donne une fréquence DANS un groupe : pour un effectif, on l'applique à l'effectif de ce groupe.",
          "On lit le pourcentage sur l'axe (graduations de 10 en 10, la moitié pour les 5), puis on le multiplie par l'effectif du groupe.",
          `${pc(parts[i])} de $${nb(N)}$ : $${nb(N)} \\times ${fr(parts[i] / 100)} = ${nb(v)}$.`,
          `$${nb(v)}$ ${ctx.individu} ${q(ctx.lignes[i])} sont ${q(ctx.colonnes[0])}.`
        ),
      };
    }, ["diagramme", "short"]),

  gab("info_rep_barres_complement", "info_representations_croisees", "info_rep_barres", 3,
    "Dans chaque groupe, la part de « l'autre modalité » est 100 % moins la hauteur de la barre.",
    () => {
      const ctx = pick(CONTEXTES_CROISES);
      const parts = partsDistinctes(ctx.lignes.length, 5);
      const genre = pick(["valeur", "max"] as const);
      if (genre === "valeur") {
        const i = randomInt(0, ctx.lignes.length - 1);
        const v = 100 - parts[i];
        return {
          text: `${ctx.intro} Quelle part des ${ctx.individu} ${q(ctx.lignes[i])} sont ${q(ctx.colonnes[1])} ? (en %)`,
          format: "short",
          expected: [String(v)],
          comparator: "number_equal",
          canvas: canvasBarresParts(ctx, parts),
          explanation: exp(
            `Dans chaque groupe, les ${ctx.individu} sont soit ${q(ctx.colonnes[0])}, soit ${q(ctx.colonnes[1])} : les deux parts font $100\\,\\%$.`,
            "On lit la part de la barre, puis on la retire de 100 %.",
            `$100 - ${parts[i]} = ${v}$.`,
            `${pc(v)} des ${ctx.individu} ${q(ctx.lignes[i])} sont ${q(ctx.colonnes[1])}.`
          ),
        };
      }
      const k = parts.indexOf(Math.min(...parts));
      const bonne = q(ctx.lignes[k]);
      return {
        text: `${ctx.intro} Dans quel groupe la part de ${q(ctx.colonnes[1])} est-elle la plus forte ?`,
        format: "qcm",
        choices: choix4(bonne, [...ctx.lignes.filter((_, a) => a !== k).map(q), "On ne peut pas le savoir avec ce diagramme"]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasBarresParts(ctx, parts),
        explanation: exp(
          `Le diagramme donne la part de ${q(ctx.colonnes[0])} ; celle de ${q(ctx.colonnes[1])} en est le complément à 100 %.`,
          "La part de l'autre modalité est la plus forte là où la barre est la plus BASSE.",
          ctx.lignes.map((l, a) => `${q(l)} : $100 - ${parts[a]} = ${100 - parts[a]}$ %`).join(" ; ") + ".",
          `C'est chez les ${ctx.individu} ${bonne}.`
        ),
        choiceDiagnostics: [{ choice: "On ne peut pas le savoir avec ce diagramme", cause: "la part de l'autre modalité se déduit : 100 % moins la barre" }],
      };
    }, ["diagramme"]),
];

/* ═══════════════ info_rep_circulaire ═══════════════ */

function camembertParts(ctx: ContexteSerie, n: number) {
  const modalites = ctx.modalites.slice(0, n);
  const parts = tirerParts(n);
  const canvas: CanvasFigure = {
    kind: "stat_graph",
    graphType: "camembert",
    title: `Répartition selon ${ctx.caractere} (en %)`,
    data: modalites.map((m, i) => ({ label: m, value: parts[i] })),
    display: { showLabels: true, valeursParts: true, pourcentages: true },
  };
  return { modalites, parts, canvas };
}

const ITEMS_REP_CIRCULAIRE: TutorBankItemV4[] = [
  gab("info_rep_circ_complement", "info_representations_croisees", "info_rep_circulaire", 1,
    "Toutes les parts d'un diagramme circulaire font 100 % ensemble.",
    () => {
      const ctx = pick(CONTEXTES_SERIES);
      const n = Math.min(ctx.modalites.length, pick([3, 4]));
      const { modalites, parts, canvas } = camembertParts(ctx, n);
      const k = randomInt(0, n - 1);
      const v = 100 - parts[k];
      const question = pick([
        `Quelle part du total ne relève PAS de « ${modalites[k]} » ? (en %)`,
        `Quel pourcentage représentent ensemble toutes les modalités autres que « ${modalites[k]} » ?`,
      ]);
      return {
        text: `${ctx.intro} ${question}`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas,
        explanation: exp(
          "Un diagramme circulaire représente un TOUT : ses parts font $100\\,\\%$ ensemble.",
          "On retire de 100 % la part de la modalité.",
          `$100 - ${parts[k]} = ${v}$.`,
          `Les autres modalités font ${pc(v)} du total.`
        ),
      };
    }, ["diagramme", "short"]),

  gab("info_rep_circ_angle", "info_representations_croisees", "info_rep_circulaire", 2,
    "Le disque entier, 360°, représente 100 % : 1 % correspond à 3,6°.",
    () => {
      const ctx = pick(CONTEXTES_SERIES);
      const n = Math.min(ctx.modalites.length, pick([3, 4, 5]));
      const { modalites, parts, canvas } = camembertParts(ctx, n);
      const k = randomInt(0, n - 1);
      const sens = pick(["angle", "part"] as const);
      const angle = arr(parts[k] * 3.6, 1);
      if (sens === "angle") {
        return {
          text: `${ctx.intro} Quel angle (en degrés) mesure le secteur « ${modalites[k]} » ?`,
          format: "short",
          expected: [fr(angle)],
          comparator: "number_equal",
          canvas,
          explanation: exp(
            "Dans un diagramme circulaire, l'angle d'un secteur est proportionnel à sa part : $100\\,\\%$ ↔ $360°$.",
            "On multiplie le pourcentage par $3,6$ (car $360 ÷ 100 = 3,6$).",
            `$${parts[k]} \\times 3,6 = ${fr(angle)}$.`,
            `Le secteur « ${modalites[k]} » mesure $${fr(angle)}°$.`
          ),
        };
      }
      return {
        text: `${ctx.intro} Sur le dessin, le secteur « ${modalites[k]} » mesure $${fr(angle)}°$. Quelle part du total représente-t-il ? (en %)`,
        format: "short",
        expected: [String(parts[k])],
        comparator: "number_equal",
        canvas: { ...canvas, display: { showLabels: true } } as CanvasFigure,
        explanation: exp(
          "Dans un diagramme circulaire, l'angle d'un secteur est proportionnel à sa part : $360°$ ↔ $100\\,\\%$.",
          "On divise l'angle par $3,6$.",
          `$${fr(angle)} ÷ 3,6 = ${parts[k]}$.`,
          `Le secteur « ${modalites[k]} » représente ${pc(parts[k])} du total.`
        ),
      };
    }, ["diagramme", "short"]),

  gab("info_rep_circ_effectif", "info_representations_croisees", "info_rep_circulaire", 3,
    "Un pourcentage seul n'est pas un effectif : il faut l'appliquer au total.",
    () => {
      const ctx = pick(CONTEXTES_SERIES);
      const n = Math.min(ctx.modalites.length, pick([3, 4, 5]));
      const { modalites, parts, canvas } = camembertParts(ctx, n);
      const k = randomInt(0, n - 1);
      const T = randomInt(2, 25) * 20;
      const v = (T * parts[k]) / 100;
      const genre = pick(["effectif", "total", "demi"] as const);
      if (genre === "demi") {
        const a = arr(parts[k] * 1.8, 1);
        return {
          text: `${ctx.intro} On redessine ce diagramme en DEMI-disque (diagramme semi-circulaire, $180°$). Quel angle (en degrés) aura le secteur « ${modalites[k]} » ?`,
          format: "short",
          expected: [fr(a)],
          comparator: "number_equal",
          canvas,
          explanation: exp(
            "Dans un diagramme semi-circulaire, le demi-disque, $180°$, représente $100\\,\\%$.",
            "On multiplie le pourcentage par $1,8$ (car $180 ÷ 100 = 1,8$).",
            `$${parts[k]} \\times 1,8 = ${fr(a)}$.`,
            `Le secteur « ${modalites[k]} » mesurera $${fr(a)}°$.`
          ),
        };
      }
      if (genre === "effectif") {
        return {
          text: `${ctx.intro} L'étude porte sur $${nb(T)}$ ${ctx.unite} en tout. Combien ${de(ctx.unite)} relèvent de « ${modalites[k]} » ?`,
          format: "short",
          expected: [fr(v)],
          comparator: "number_equal",
          canvas,
          explanation: exp(
            "Un diagramme circulaire donne des proportions ; un effectif s'obtient en les appliquant au total.",
            "On multiplie le total par le pourcentage.",
            `$${nb(T)} \\times ${fr(parts[k] / 100)} = ${nb(v)}$.`,
            `$${nb(v)}$ ${ctx.unite} relèvent de « ${modalites[k]} ». ⚠️ ${parts[k]} est un pourcentage, pas un effectif.`
          ),
        };
      }
      return {
        text: `${ctx.intro} « ${modalites[k]} » représente $${nb(v)}$ ${ctx.unite}. Combien ${de(ctx.unite)} compte l'étude en tout ?`,
        format: "short",
        expected: [String(T)],
        comparator: "number_equal",
        canvas,
        explanation: exp(
          "Un diagramme circulaire donne des proportions : l'effectif d'une part et son pourcentage permettent de remonter au total.",
          "Si $p\\,\\%$ du total vaut $e$, alors le total vaut $e ÷ (p ÷ 100)$.",
          `$${nb(v)} ÷ ${fr(parts[k] / 100)} = ${nb(T)}$.`,
          `L'étude compte $${nb(T)}$ ${ctx.unite} en tout.`
        ),
      };
    }, ["diagramme", "short"]),
];

/* ═══════════════ info_rep_choisir ═══════════════ */

const CIRC = "un diagramme circulaire";
const BARRES = "un diagramme en barres";
const COURBE = "une courbe";
const NUAGE = "un nuage de points";
const BOITE = "un diagramme en boîte";
const TCROISE = "un tableau croisé";

const ITEMS_REP_CHOISIR: TutorBankItemV4[] = [
  gab("info_rep_choisir_intention", "info_representations_croisees", "info_rep_choisir", 2,
    "Une répartition, une comparaison, une évolution, une relation : à chaque intention sa représentation.",
    () => {
      const ctx = pick(CONTEXTES_SERIES);
      const cas = pick([
        { but: `montrer quelle PART du total représente chaque modalité ${du(ctx.caractere)} (${ctx.modalites.slice(0, 4).join(", ")})`, bonne: CIRC, leurres: [COURBE, NUAGE, BOITE], pourquoi: "une répartition, ce sont des parts d'un tout : le disque entier vaut 100 %" },
        { but: `classer les modalités ${du(ctx.caractere)} de celle qui compte le plus ${de(ctx.unite)} à celle qui en compte le moins`, bonne: BARRES, leurres: [COURBE, NUAGE, BOITE], pourquoi: "des hauteurs se comparent d'un coup d'œil, bien mieux que des secteurs d'angles proches" },
        { but: `montrer ${ctx.evolution}`, bonne: COURBE, leurres: [CIRC, BOITE, TCROISE], pourquoi: "une évolution se lit sur un axe du temps, les points reliés dans l'ordre" },
        { but: `étudier ${ctx.relation}`, bonne: NUAGE, leurres: [CIRC, BARRES, TCROISE], pourquoi: "deux caractères chiffrés : chaque individu donne un point (x ; y), et la forme du nuage montre la tendance" },
      ]);
      return {
        text: `${ctx.intro} ` + pick([`On veut ${cas.but}. Quelle représentation est la plus adaptée ?`, `Quel graphique choisir pour ${cas.but} ?`]),
        format: "qcm",
        choices: choix4(cas.bonne, cas.leurres),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le choix d'une représentation dépend de ce qu'on veut MONTRER : une répartition, une comparaison, une évolution ou une relation entre deux caractères.",
          "On identifie l'intention avant de choisir le dessin.",
          `Ici, ${cas.pourquoi}.`,
          `On choisit ${cas.bonne}.`
        ),
      };
    }, ["diagramme"]),

  gab("info_rep_choisir_piege", "info_representations_croisees", "info_rep_choisir", 3,
    "Avant de choisir, vérifie : les parts font-elles 100 % ? les groupes ont-ils la même taille ?",
    () => {
      const genre = pick(["multiples", "groupes", "nombreuses"] as const);
      if (genre === "groupes") {
        const ctx = pick(CONTEXTES_CROISES);
        const t = tirerCroise(ctx);
        const bonne = `un diagramme en barres des POURCENTAGES de ${q(ctx.colonnes[0])} dans chaque groupe`;
        return {
          text: `${ctx.intro} Les groupes ${ctx.lignes.map(q).join(", ")} n'ont pas la même taille (${t.lig.map((x) => `$${nb(x)}$`).join(", ")}). On veut comparer, d'un groupe à l'autre, la tendance à être ${q(ctx.colonnes[0])}. Quelle représentation choisir ?`,
          format: "qcm",
          choices: choix4(bonne, [`un diagramme en barres des EFFECTIFS de ${q(ctx.colonnes[0])} dans chaque groupe`, `${CIRC} de l'ensemble des ${ctx.individu} selon ${ctx.carLigne}`, NUAGE]),
          expected: [bonne],
          comparator: "mcq_exact",
          canvas: canvasCroise(t),
          explanation: exp(
            "Comparer des groupes de tailles différentes demande des FRÉQUENCES : un grand groupe a mécaniquement plus d'individus dans chaque case.",
            "On calcule, dans chaque groupe, la part de la modalité, et on représente ces parts.",
            ctx.lignes.map((l, i) => `${q(l)} : $${nb(t.cases[i][0])} ÷ ${nb(t.lig[i])} \\approx ${fr(arr((100 * t.cases[i][0]) / t.lig[i]))}\\,\\%$`).join(" ; ") + ".",
            `On choisit ${bonne}.`
          ),
        };
      }
      const ctx = pick(CONTEXTES_SERIES);
      if (genre === "multiples") {
        const T = randomInt(26, 39) * 5;
        return {
          text: `${ctx.intro} Dans une enquête à ce sujet, chacun pouvait cocher PLUSIEURS réponses pour ${ctx.caractere} ; les pourcentages obtenus totalisent $${T}\\,\\%$. Quelle représentation choisir ?`,
          format: "qcm",
          choices: choix4(BARRES, [CIRC, COURBE, NUAGE]),
          expected: [BARRES],
          comparator: "mcq_exact",
          explanation: exp(
            "Un diagramme circulaire partage un TOUT : ses parts doivent faire exactement 100 %.",
            "On additionne les pourcentages avant de dessiner.",
            `Ici, ils font $${T}\\,\\%$ : plus de 100 %, car une personne peut compter dans plusieurs modalités. Un camembert est impossible.`,
            `On choisit ${BARRES}, où chaque barre se lit seule.`
          ),
          choiceDiagnostics: [{ choice: CIRC, cause: `les parts font ${T} % et non 100 % : elles ne partagent pas un tout` }],
        };
      }
      const N = randomInt(12, 18);
      return {
        text: `${ctx.intro} Cette fois, ${ctx.caractere} compte $${N}$ modalités, dont plusieurs à moins de $3\\,\\%$. On veut comparer les modalités entre elles. Quelle représentation choisir ?`,
        format: "qcm",
        choices: choix4(BARRES, [CIRC, COURBE, NUAGE]),
        expected: [BARRES],
        comparator: "mcq_exact",
        explanation: exp(
          "Un diagramme circulaire devient illisible au-delà de cinq ou six parts : les petits secteurs ne se distinguent plus.",
          "On regarde le nombre de modalités avant de choisir.",
          `Avec $${N}$ modalités, des secteurs de moins de $3\\,\\%$ font moins de $11°$ : on ne peut ni les lire ni les comparer.`,
          `On choisit ${BARRES}, rangé par ordre décroissant.`
        ),
      };
    }, ["diagramme"]),
];

/* ═══════════════ info_rep_commenter ═══════════════ */

/** Une affirmation chiffrée, sa vérité, et la vérification qui la tranche. */
export type Affirmation = { texte: string; vrai: boolean; preuve: string };

/**
 * Une vraie et trois fausses (ou l'inverse), toutes de textes différents.
 * Renvoie null si le réservoir ne le permet pas : l'appelant retire.
 */
export function trierAffirmations(pool: Affirmation[], chercher: boolean) {
  const vus = new Set<string>();
  const uniques = shuffle(pool).filter((a) => !vus.has(a.texte) && vus.add(a.texte));
  const bonnes = uniques.filter((a) => a.vrai === chercher);
  const autres = uniques.filter((a) => a.vrai !== chercher);
  if (!bonnes.length || autres.length < 3) return null;
  return { bonne: bonnes[0], leurres: autres.slice(0, 3) };
}

/** Les affirmations possibles sur une série d'effectifs (valeurs distinctes). */
export function affirmationsSerie(mod: string[], V: number[], unite: string): Affirmation[] {
  const T = V.reduce((s, v) => s + v, 0);
  const n = mod.length;
  const out: Affirmation[] = [];
  const M = (i: number) => `« ${mod[i]} »`;
  const imax = V.indexOf(Math.max(...V));
  for (let a = 0; a < n; a++) {
    out.push({ texte: `${M(a)} est la modalité la plus représentée.`, vrai: a === imax, preuve: `la plus grande valeur est $${nb(V[imax])}$, pour ${M(imax)}` });
    if (2 * V[a] !== T) out.push({ texte: `${M(a)} représente plus de la moitié du total.`, vrai: 2 * V[a] > T, preuve: `$${nb(V[a])}$ pour un total de $${nb(T)}$, dont la moitié est $${nb(T / 2)}$` });
    if (4 * V[a] !== T) out.push({ texte: `${M(a)} représente plus du quart du total.`, vrai: 4 * V[a] > T, preuve: `$${nb(V[a])}$ pour un total de $${nb(T)}$, dont le quart est $${nb(T / 4)}$` });
    for (let b = 0; b < n; b++) {
      if (a === b) continue;
      out.push({ texte: `${M(a)} compte plus ${de(unite)} que ${M(b)}.`, vrai: V[a] > V[b], preuve: `$${nb(V[a])}$ contre $${nb(V[b])}$` });
      if (V[a] !== 2 * V[b]) out.push({ texte: `${M(a)} compte au moins deux fois plus ${de(unite)} que ${M(b)}.`, vrai: V[a] >= 2 * V[b], preuve: `$2 \\times ${nb(V[b])} = ${nb(2 * V[b])}$, à comparer à $${nb(V[a])}$` });
      if (a < b) {
        const d = Math.abs(V[a] - V[b]);
        const faux = d + pick([-1, 1]) * Math.max(1, Math.round(d * 0.2));
        const dd = pick([d, faux > 0 ? faux : d + 5]);
        out.push({ texte: `L'écart entre ${M(a)} et ${M(b)} est de $${nb(dd)}$ ${unite}.`, vrai: dd === d, preuve: `$${nb(Math.max(V[a], V[b]))} - ${nb(Math.min(V[a], V[b]))} = ${nb(d)}$` });
      }
      for (let c = 0; c < n; c++) {
        if (c === a || c === b || a > b || V[a] + V[b] === V[c]) continue;
        out.push({ texte: `${M(a)} et ${M(b)} réunis dépassent ${M(c)}.`, vrai: V[a] + V[b] > V[c], preuve: `$${nb(V[a])} + ${nb(V[b])} = ${nb(V[a] + V[b])}$, contre $${nb(V[c])}$ pour ${M(c)}` });
      }
    }
  }
  return out;
}

/** Les affirmations possibles sur un tableau croisé : effectifs ET fréquences. */
function affirmationsCroise(t: Croise): Affirmation[] {
  const { ctx } = t;
  const out: Affirmation[] = [];
  const L = ctx.lignes;
  const c0 = q(ctx.colonnes[0]);
  const ind = ctx.individu;
  const f = (i: number) => t.cases[i][0] / t.lig[i];
  L.forEach((li, i) => {
    const a = t.cases[i][0];
    if (2 * a !== t.lig[i]) out.push({ texte: `Plus de la moitié des ${ind} ${q(li)} sont ${c0}.`, vrai: 2 * a > t.lig[i], preuve: `$${nb(a)}$ sur $${nb(t.lig[i])}$, dont la moitié est $${nb(t.lig[i] / 2)}$` });
    if (2 * a !== t.col[0]) out.push({ texte: `Plus de la moitié des ${ind} ${c0} sont ${q(li)}.`, vrai: 2 * a > t.col[0], preuve: `$${nb(a)}$ sur $${nb(t.col[0])}$, dont la moitié est $${nb(t.col[0] / 2)}$` });
    const p = Math.round((100 * a) / t.lig[i]);
    const pFaux = Math.round((100 * a) / t.col[0]);
    if (Math.abs(p - pFaux) >= 3) {
      const dit = pick([p, pFaux]);
      out.push({ texte: `Environ $${dit}\\,\\%$ des ${ind} ${q(li)} sont ${c0}.`, vrai: dit === p, preuve: `$${nb(a)} ÷ ${nb(t.lig[i])} \\approx ${fr(arr(a / t.lig[i], 2))}$, soit environ $${p}\\,\\%$` });
    }
    L.forEach((lk, k) => {
      if (k === i) return;
      out.push({ texte: `Il y a plus de ${ind} ${c0} dans le groupe ${q(li)} que dans le groupe ${q(lk)}.`, vrai: a > t.cases[k][0], preuve: `$${nb(a)}$ contre $${nb(t.cases[k][0])}$` });
      if (Math.abs(f(i) - f(k)) >= 0.02)
        out.push({ texte: `La PART de ${c0} est plus forte dans le groupe ${q(li)} que dans le groupe ${q(lk)}.`, vrai: f(i) > f(k), preuve: `$${nb(a)} ÷ ${nb(t.lig[i])} \\approx ${fr(arr(f(i), 2))}$ contre $${nb(t.cases[k][0])} ÷ ${nb(t.lig[k])} \\approx ${fr(arr(f(k), 2))}$` });
    });
  });
  return out;
}

function itemCommenter(pool: Affirmation[], intro: string, canvas: CanvasFigure) {
  const chercher = pick([true, false]);
  const r = trierAffirmations(pool, chercher);
  if (!r) return null;
  return {
    text: `${intro} ${chercher ? "Laquelle de ces affirmations est VRAIE ?" : "Laquelle de ces affirmations est FAUSSE ?"}`,
    format: "qcm" as const,
    choices: choix4(r.bonne.texte, r.leurres.map((a) => a.texte)),
    expected: [r.bonne.texte],
    comparator: "mcq_exact" as const,
    canvas,
    explanation: exp(
      "Commenter un graphique, c'est énoncer des faits qu'on VÉRIFIE sur les nombres lus.",
      "On teste chaque affirmation par un calcul.",
      [r.bonne, ...r.leurres].map((a) => `« ${a.texte} » → ${a.vrai ? "vrai" : "faux"} : ${a.preuve}.`).join("\n"),
      `L'affirmation ${chercher ? "vraie" : "fausse"} est : « ${r.bonne.texte} »`
    ),
  };
}

const ITEMS_REP_COMMENTER: TutorBankItemV4[] = [
  gab("info_rep_commenter_barres", "info_representations_croisees", "info_rep_commenter", 2,
    "Chaque affirmation se vérifie par un calcul sur les valeurs lues : une comparaison, une somme, une moitié.",
    () => {
      for (;;) {
        const s = tirerSerie(undefined, pick([4, 5]));
        const canvas: CanvasFigure = { kind: "stat_graph", graphType: "barres", title: s.ctx.titre, data: s.modalites.map((m, i) => ({ label: m, value: s.valeurs[i] })), display: { showValues: true, showLabels: true } };
        const it = itemCommenter(affirmationsSerie(s.modalites, s.valeurs, s.ctx.unite), s.ctx.intro, canvas);
        if (it) return it;
      }
    }, ["diagramme"]),

  gab("info_rep_commenter_croise", "info_representations_croisees", "info_rep_commenter", 3,
    "Plus d'individus n'est pas une plus grande PART : compare des fréquences, chacune dans son groupe.",
    () => {
      for (;;) {
        const t = tirerCroise();
        const it = itemCommenter(affirmationsCroise(t), t.ctx.intro, canvasCroise(t));
        if (it) return it;
      }
    }, ["tableau"]),
];

/* ─────────── Nuages de points (deux caractères chiffrés) ───────────
   ⚠️ Les micros du nuage ont aussi un gabarit chacune dans
   ajustement-affine.bank.ts (même micro, même notion). Ceux d'ici s'y
   ajoutent : trois par étoile, pour que la phrase ne revienne plus. */

export type ContexteNuage = {
  intro: string;
  /** Le caractère en abscisse et en ordonnée, avec leur unité. */
  x: string;
  ux: string;
  y: string;
  uy: string;
  /** Les individus : leur nom commun au pluriel. */
  individu: string;
  /** Ordonnée « à x = 0 » et pente, pour un nuage qui monte ou descend. */
  y0: number;
  pente: number;
};

export const CONTEXTES_NUAGES: readonly ContexteNuage[] = [
  { intro: "Un entraîneur d'athlétisme suit des sauteurs en longueur.", x: "l'entraînement", ux: "h par semaine", y: "la progression", uy: "cm", individu: "sauteurs", y0: 3, pente: 2.4 },
  { intro: "Une pédiatre a relevé l'âge et la masse d'enfants suivis au cabinet.", x: "l'âge", ux: "ans", y: "la masse", uy: "kg", individu: "enfants", y0: 8, pente: 2.3 },
  { intro: "Un guide de haute montagne a relevé la température de plusieurs refuges à midi.", x: "l'altitude", ux: "centaines de m", y: "la température", uy: "°C", individu: "refuges", y0: 30, pente: -2.2 },
  { intro: "Une chargée d'études d'une plateforme de streaming compare des artistes.", x: "le nombre de titres publiés", ux: "titres", y: "le nombre d'écoutes", uy: "millions", individu: "artistes", y0: 2, pente: 2.5 },
  { intro: "Un commerçant a testé différents prix pour un même article.", x: "le prix", ux: "€", y: "le nombre d'articles vendus", uy: "dizaines", individu: "semaines", y0: 29, pente: -2.4 },
  { intro: "Une professeure de conservatoire compare ses élèves.", x: "la pratique", ux: "h par semaine", y: "la note d'examen", uy: "points sur 20", individu: "élèves", y0: 5, pente: 1.3 },
  { intro: "Une agronome a relevé la pluie et la récolte de plusieurs parcelles.", x: "la pluie", ux: "dizaines de mm", y: "la récolte", uy: "quintaux", individu: "parcelles", y0: 5, pente: 2.1 },
  { intro: "Un agent immobilier compare des locations de vacances.", x: "la distance à la plage", ux: "km", y: "le prix de la nuit", uy: "dizaines d'€", individu: "locations", y0: 26, pente: -2 },
  { intro: "Une analyste du cinéma compare des films sortis cette année.", x: "le budget publicitaire", ux: "millions d'€", y: "le nombre d'entrées", uy: "centaines de milliers", individu: "films", y0: 2, pente: 2.2 },
  { intro: "Un chauffeur de taxi a noté ses courses de la matinée.", x: "la distance", ux: "km", y: "le prix", uy: "€", individu: "courses", y0: 6, pente: 2.3 },
  { intro: "Un conseiller en énergie compare des maisons du même quartier.", x: "l'épaisseur d'isolant", ux: "cm", y: "la facture de chauffage", uy: "centaines d'€", individu: "maisons", y0: 28, pente: -2.1 },
  { intro: "Une infirmière scolaire a interrogé des élèves sur leurs soirées.", x: "le temps d'écran le soir", ux: "h", y: "le temps d'endormissement", uy: "min", individu: "élèves", y0: 4, pente: 2.4 },
  { intro: "Une conceptrice de jeux vidéo compare des joueurs testeurs.", x: "le temps de jeu", ux: "h", y: "le score", uy: "centaines de points", individu: "joueurs", y0: 3, pente: 2.5 },
  { intro: "La gérante d'un parc de loisirs a relevé la fréquentation de plusieurs journées.", x: "la vitesse du vent", ux: "dizaines de km/h", y: "la fréquentation", uy: "centaines de visiteurs", individu: "journées", y0: 27, pente: -2.3 },
] as const;

export type Nuage = { ctx: ContexteNuage; pts: { id: string; x: number; y: number }[]; sens: "monte" | "descend" | "aucune" };

/** Un nuage de 6 à 8 points, abscisses entières distinctes de 1 à 10, ordonnées distinctes. */
export function tirerNuage(sens?: Nuage["sens"], ctx: ContexteNuage = pick(CONTEXTES_NUAGES)): Nuage {
  const naturel = ctx.pente > 0 ? "monte" : "descend";
  const s = sens ?? naturel;
  // ⛔ Le SENS demandé commande la pente (un « monte » sur un contexte qui descend
  // retourne la droite sur la même plage) : sans cela, l'énoncé annonçait
  // « augmente » sous un nuage qui descend (trouvé à la relecture du 21/10).
  const y0 = s === naturel || s === "aucune" ? ctx.y0 : ctx.y0 + 10 * ctx.pente;
  const pente = s === naturel || s === "aucune" ? ctx.pente : -ctx.pente;
  for (;;) {
    const n = randomInt(6, 8);
    const xs = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, n).sort((a, b) => a - b);
    const ys = xs.map((x) =>
      s === "aucune" ? randomInt(Math.round(Math.min(ctx.y0, ctx.y0 + 10 * ctx.pente)) + 1, Math.round(Math.max(ctx.y0, ctx.y0 + 10 * ctx.pente)) - 1) : Math.round(y0 + pente * x + randomInt(-2, 2))
    );
    if (new Set(ys).size !== n || ys.some((y) => y < 1 || y > 32)) continue;
    // « aucune » : ni montée ni descente nette (corrélation faible).
    if (s === "aucune") {
      const mx = xs.reduce((a, b) => a + b, 0) / n;
      const my = ys.reduce((a, b) => a + b, 0) / n;
      const cov = xs.reduce((a, x, i) => a + (x - mx) * (ys[i] - my), 0);
      const vx = xs.reduce((a, x) => a + (x - mx) ** 2, 0);
      const vy = ys.reduce((a, y) => a + (y - my) ** 2, 0);
      if (Math.abs(cov / Math.sqrt(vx * vy)) > 0.25) continue;
    }
    const lettres = "ABCDEFGH";
    return { ctx, sens: s, pts: xs.map((x, i) => ({ id: lettres[i], x, y: ys[i] })) };
  }
}

export function canvasNuagePts(nu: Nuage, opts?: { etiquettes?: boolean; deplace?: { id: string; x: number; y: number } }): CanvasFigure {
  const pts = nu.pts.map((p) => (opts?.deplace && opts.deplace.id === p.id ? opts.deplace : p));
  const ymax = Math.max(...pts.map((p) => p.y));
  return {
    kind: "fonctionGraphique",
    titre: `${nu.ctx.y} (${nu.ctx.uy}) selon ${nu.ctx.x} (${nu.ctx.ux})`,
    xmin: 0,
    xmax: 11,
    ymin: 0,
    ymax: Math.ceil((ymax + 2) / 5) * 5,
    grille: true,
    points: pts.map((p) => ({ x: p.x, y: p.y, label: opts?.etiquettes ? p.id : undefined })),
  };
}

export function canvasNuageTableau(nu: Nuage): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: `Relevés (${nu.ctx.individu})`,
    headers: ["", ...nu.pts.map((p) => p.id)],
    rows: [
      { label: `${nu.ctx.x.replace(/^(le |la |l'|les )/, "")} (${nu.ctx.ux})`, values: nu.pts.map((p) => p.x) },
      { label: `${nu.ctx.y.replace(/^(le |la |l'|les )/, "")} (${nu.ctx.uy})`, values: nu.pts.map((p) => p.y) },
    ],
    display: { compact: true },
  };
}

const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ═══════════════ info_nuage_lire ═══════════════ */

const ITEMS_NUAGE_LIRE: TutorBankItemV4[] = [
  gab("info_nuage_lire_y", "info_nuage", "info_nuage_lire", 1,
    "Pars de l'abscisse sur l'axe horizontal, monte jusqu'au point, puis lis l'ordonnée à gauche.",
    () => {
      const nu = tirerNuage(pick([undefined, undefined, "aucune"] as const));
      const { ctx } = nu;
      const p = pick(nu.pts);
      return {
        text: `${ctx.intro} ` + pick([
          `Le nuage donne ${ctx.y} (${ctx.uy}) en fonction ${du(ctx.x)} (${ctx.ux}). Quelle est l'ordonnée du point d'abscisse $${p.x}$ ?`,
          `Pour le point du nuage dont ${ctx.x} vaut $${p.x}$ ${ctx.ux}, combien vaut ${ctx.y}, en ${ctx.uy} ?`,
          `Lis sur le nuage ${ctx.y} (en ${ctx.uy}) de l'individu pour qui ${ctx.x} vaut $${p.x}$ ${ctx.ux}.`,
          `Un point du nuage a pour abscisse $${p.x}$ (${ctx.x}, en ${ctx.ux}). Quelle est son ordonnée ?`,
        ]),
        format: "short",
        expected: [String(p.y)],
        comparator: "number_equal",
        canvas: canvasNuagePts(nu),
        explanation: exp(
          "Chaque point d'un nuage a pour coordonnées $(x \\, ; \\, y)$ : l'abscisse est le premier caractère, l'ordonnée le second.",
          "On repère l'abscisse sur l'axe horizontal, on monte jusqu'au point, on lit l'ordonnée sur l'axe vertical.",
          `Le point d'abscisse $${p.x}$ est $(${p.x} \\, ; \\, ${p.y})$.`,
          `${maj(ctx.y)} vaut $${p.y}$ ${ctx.uy}.`
        ),
      };
    }, ["nuage", "short"]),

  gab("info_nuage_lire_x", "info_nuage", "info_nuage_lire", 1,
    "Pars de l'ordonnée sur l'axe vertical, va jusqu'au point, puis descends lire l'abscisse.",
    () => {
      const nu = tirerNuage(pick([undefined, undefined, "aucune"] as const));
      const { ctx } = nu;
      const p = pick(nu.pts);
      return {
        text: `${ctx.intro} ` + pick([
          `Le nuage donne ${ctx.y} (${ctx.uy}) en fonction ${du(ctx.x)} (${ctx.ux}). Quelle est l'abscisse du point d'ordonnée $${p.y}$ ?`,
          `Un seul point du nuage a pour ordonnée $${p.y}$ (${ctx.y}, en ${ctx.uy}). Combien vaut ${ctx.x} pour lui, en ${ctx.ux} ?`,
          `Lis sur le nuage ${ctx.x} (en ${ctx.ux}) de l'individu dont l'ordonnée est $${p.y}$.`,
          `Sur ce nuage de ${ctx.individu}, quelle est l'abscisse du seul point d'ordonnée $${p.y}$ ?`,
        ]),
        format: "short",
        expected: [String(p.x)],
        comparator: "number_equal",
        canvas: canvasNuagePts(nu),
        explanation: exp(
          "Chaque point d'un nuage a pour coordonnées $(x \\, ; \\, y)$ : l'abscisse se lit sur l'axe horizontal.",
          "On part de l'ordonnée sur l'axe vertical, on va horizontalement jusqu'au point, puis on descend sur l'axe horizontal.",
          `Le point d'ordonnée $${p.y}$ est $(${p.x} \\, ; \\, ${p.y})$.`,
          `${maj(ctx.x)} vaut $${p.x}$ ${ctx.ux}.`
        ),
      };
    }, ["nuage", "short"]),

  gab("info_nuage_lire_compter", "info_nuage", "info_nuage_lire", 1,
    "Trace mentalement la ligne horizontale du seuil, et compte les points au-dessus.",
    () => {
      const nu = tirerNuage(pick([undefined, undefined, "aucune"] as const));
      const { ctx } = nu;
      const ys = nu.pts.map((p) => p.y).sort((a, b) => a - b);
      // Un seuil qui ne tombe sur aucun point.
      const r = randomInt(1, ys.length - 2);
      const seuil = ys[r] + (ys[r + 1] - ys[r] > 1 ? 1 : 0.5);
      const dessus = pick([true, false]);
      const k = nu.pts.filter((p) => (dessus ? p.y > seuil : p.y < seuil)).length;
      return {
        text: `${ctx.intro} ` + pick([
          `Le nuage donne ${ctx.y} (${ctx.uy}) selon ${ctx.x}. Combien ${de(ctx.individu)} ont une ordonnée ${dessus ? "supérieure" : "inférieure"} à $${fr(seuil)}$ ?`,
          `Combien de points du nuage sont ${dessus ? "au-dessus" : "au-dessous"} de la hauteur $${fr(seuil)}$ ${ctx.uy} ?`,
          `On garde les ${ctx.individu} pour qui l'ordonnée (${ctx.y}) est ${dessus ? "plus grande" : "plus petite"} que $${fr(seuil)}$. Combien en garde-t-on ?`,
        ]),
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        canvas: canvasNuagePts(nu),
        explanation: exp(
          "Chaque point est un individu ; son ordonnée est la valeur du second caractère.",
          `On compte les points situés ${dessus ? "au-dessus" : "au-dessous"} de la hauteur $${fr(seuil)}$.`,
          `Ordonnées : $${ys.join(" ; ")}$. ${dessus ? "Au-dessus" : "Au-dessous"} de $${fr(seuil)}$ : $${k}$ points.`,
          `$${k}$ ${ctx.individu} sont dans ce cas.`
        ),
      };
    }, ["nuage", "short"]),

  gab("info_nuage_lire_extreme", "info_nuage", "info_nuage_lire", 2,
    "Le point le plus haut a la plus grande ordonnée ; lis ensuite son abscisse.",
    () => {
      const nu = tirerNuage(pick([undefined, undefined, "aucune"] as const));
      const { ctx } = nu;
      const haut = pick([true, false]);
      const ys = nu.pts.map((p) => p.y);
      const p = nu.pts[ys.indexOf(haut ? Math.max(...ys) : Math.min(...ys))];
      return {
        text: `${ctx.intro} On regarde le point le plus ${haut ? "haut" : "bas"} du nuage (${haut ? "la plus grande" : "la plus petite"} ordonnée). Combien vaut ${ctx.x} pour ce point, en ${ctx.ux} ?`,
        format: "short",
        expected: [String(p.x)],
        comparator: "number_equal",
        canvas: canvasNuagePts(nu),
        explanation: exp(
          "Dans un nuage, l'ordonnée se lit en hauteur et l'abscisse en largeur.",
          `On repère le point le plus ${haut ? "haut" : "bas"}, puis on descend lire son abscisse.`,
          `Le point le plus ${haut ? "haut" : "bas"} est $(${p.x} \\, ; \\, ${p.y})$.`,
          `${maj(ctx.x)} vaut alors $${p.x}$ ${ctx.ux}.`
        ),
      };
    }, ["nuage", "short"]),
];

/* ═══════════════ info_nuage_construire ═══════════════ */

const coord = (x: number, y: number) => `$(${x} \\, ; \\, ${y})$`;

const ITEMS_NUAGE_CONSTRUIRE: TutorBankItemV4[] = [
  gab("info_nuage_construire_coord", "info_nuage", "info_nuage_construire", 2,
    "Le premier caractère (en abscisse) d'abord, le second (en ordonnée) ensuite.",
    () => {
      const nu = tirerNuage();
      const { ctx } = nu;
      const k = randomInt(0, nu.pts.length - 1);
      const p = nu.pts[k];
      const voisin = nu.pts[k === 0 ? 1 : k - 1];
      const bonne = coord(p.x, p.y);
      return {
        text: `${ctx.intro} On construit le nuage ${du(ctx.y)} (${ctx.uy}) en fonction ${du(ctx.x)} (${ctx.ux}). ` +
          pick([`Quelles sont les coordonnées du point qui représente l'individu ${p.id} ?`, `Où faut-il placer le point de l'individu ${p.id} ?`]),
        format: "qcm",
        choices: choix4(bonne, [coord(p.y, p.x), coord(p.x, voisin.y), coord(voisin.x, p.y)]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuageTableau(nu),
        explanation: exp(
          "Dans un nuage de « y en fonction de x », chaque individu donne le point $(x \\, ; \\, y)$ : le caractère « en fonction duquel » on étudie l'autre va en abscisse.",
          "On lit la colonne de l'individu : la première ligne donne l'abscisse, la seconde l'ordonnée.",
          `Individu ${p.id} : ${ctx.x} $= ${p.x}$, ${ctx.y} $= ${p.y}$.`,
          `On place le point ${bonne}.`
        ),
        choiceDiagnostics: [{ choice: coord(p.y, p.x), cause: "a inversé abscisse et ordonnée" }],
      };
    }, ["nuage"]),

  gab("info_nuage_construire_erreur", "info_nuage", "info_nuage_construire", 2,
    "Vérifie chaque point du dessin avec la colonne du tableau qui porte la même lettre.",
    () => {
      const nu = tirerNuage();
      const { ctx } = nu;
      for (;;) {
        const p = pick(nu.pts);
        const faute = pick(["inverse", "decale"] as const);
        const d = faute === "inverse" ? { id: p.id, x: p.y, y: p.x } : { id: p.id, x: p.x, y: p.y + pick([-4, -3, 3, 4]) };
        if (d.x < 0 || d.x > 11 || d.y < 0 || (d.x === p.x && d.y === p.y)) continue;
        const bonne = `le point ${p.id}`;
        return {
          text: `${ctx.intro} Les relevés sont : ${nu.pts.map((x) => `${x.id} ${coord(x.x, x.y)}`).join(", ")}. Un stagiaire a construit le nuage, mais il a mal placé UN point. Lequel ?`,
          format: "qcm",
          choices: choix4(bonne, shuffle(nu.pts.filter((x) => x.id !== p.id)).map((x) => `le point ${x.id}`)),
          expected: [bonne],
          comparator: "mcq_exact",
          canvas: canvasNuagePts(nu, { etiquettes: true, deplace: d }),
          explanation: exp(
            "Chaque colonne du tableau donne un point $(x \\, ; \\, y)$ du nuage.",
            "On compare, lettre par lettre, les coordonnées lues sur le dessin à celles du tableau.",
            `Le tableau donne ${p.id} ${coord(p.x, p.y)} ; le dessin le place en ${coord(d.x, d.y)}${faute === "inverse" ? " : abscisse et ordonnée ont été inversées" : ""}.`,
            `C'est ${bonne} qui est mal placé. Tableau : ${nu.pts.map((x) => `${x.id} ${coord(x.x, x.y)}`).join(", ")}.`
          ),
        };
      }
    }, ["nuage"]),

  gab("info_nuage_construire_individu", "info_nuage", "info_nuage_construire", 2,
    "Cherche dans le tableau la colonne dont les deux valeurs sont les coordonnées du point.",
    () => {
      const nu = tirerNuage();
      const { ctx } = nu;
      const p = pick(nu.pts);
      const bonne = `l'individu ${p.id}`;
      return {
        text: `${ctx.intro} ` + pick([
          `Dans le nuage ${du(ctx.y)} en fonction ${du(ctx.x)}, quel individu représente le point ${coord(p.x, p.y)} ?`,
          `On a placé le point ${coord(p.x, p.y)} dans le nuage ${du(ctx.y)} selon ${ctx.x}. À quel individu correspond-il ?`,
        ]),
        format: "qcm",
        choices: choix4(bonne, shuffle(nu.pts.filter((x) => x.id !== p.id)).map((x) => `l'individu ${x.id}`)),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuageTableau(nu),
        explanation: exp(
          "Le point $(x \\, ; \\, y)$ représente l'individu dont le premier caractère vaut $x$ et le second $y$.",
          "On cherche la colonne du tableau où la première ligne vaut l'abscisse ET la seconde l'ordonnée.",
          `La colonne ${p.id} donne ${ctx.x} $= ${p.x}$ et ${ctx.y} $= ${p.y}$.`,
          `Le point représente ${bonne}.`
        ),
      };
    }, ["nuage"]),
];

/* ═══════════════ info_nuage_tendance ═══════════════ */

function phrasesTendance(ctx: ContexteNuage) {
  return {
    monte: `Quand ${ctx.x} augmente, ${ctx.y} a tendance à augmenter.`,
    descend: `Quand ${ctx.x} augmente, ${ctx.y} a tendance à diminuer.`,
    aucune: `Il n'y a pas de tendance nette : les points sont dispersés.`,
    piege: `On ne peut rien conclure avec moins de cent points.`,
  };
}

function itemTendance(nu: Nuage, avecFigure: boolean): TutorGeneratedQuestionV4 {
  const { ctx } = nu;
  const P = phrasesTendance(ctx);
  const bonne = P[nu.sens];
  const prem = nu.pts[0];
  const der = nu.pts[nu.pts.length - 1];
  return {
    text: `${ctx.intro} ` + (avecFigure
      ? pick([`Que montre le nuage ${du(ctx.y)} en fonction ${du(ctx.x)} ?`, `Quelle phrase décrit la tendance de ce nuage ?`])
      : pick([`Sans tracer le nuage, quelle tendance montre le tableau ${du(ctx.y)} selon ${ctx.x} ?`, `Le tableau donne ${ctx.x} et ${ctx.y} pour chaque individu. Quelle phrase décrit la tendance ?`])),
    format: "qcm",
    choices: choix4(bonne, [P.monte, P.descend, P.aucune, P.piege].filter((s) => s !== bonne)),
    expected: [bonne],
    comparator: "mcq_exact",
    canvas: avecFigure ? canvasNuagePts(nu) : canvasNuageTableau(nu),
    explanation: exp(
      "Décrire un nuage, c'est dire si les points montent, descendent, ou n'ont pas de direction d'ensemble.",
      "On regarde l'allure générale de gauche à droite, sans s'arrêter à un point isolé.",
      `De gauche à droite, on passe de ${coord(prem.x, prem.y)} à ${coord(der.x, der.y)} ; ordonnées dans l'ordre des abscisses : $${nu.pts.map((p) => p.y).join(" ; ")}$.`,
      `${bonne}${nu.sens === "aucune" ? "" : " Un ajustement affine aurait du sens ici."}`
    ),
  };
}

const ITEMS_NUAGE_TENDANCE: TutorBankItemV4[] = [
  gab("info_nuage_tendance_figure", "info_nuage", "info_nuage_tendance", 2,
    "Regarde l'ensemble des points de gauche à droite : montent-ils, descendent-ils, ou partent-ils dans tous les sens ?",
    () => itemTendance(tirerNuage(pick([undefined, undefined, "aucune"] as const)), true), ["nuage", "tendance"]),

  gab("info_nuage_tendance_tableau", "info_nuage", "info_nuage_tendance", 2,
    "Les abscisses du tableau sont rangées dans l'ordre croissant : suis les ordonnées de gauche à droite.",
    () => itemTendance(tirerNuage(pick([undefined, undefined, "aucune"] as const)), false), ["nuage", "tendance"]),

  gab("info_nuage_tendance_estimer", "info_nuage", "info_nuage_tendance", 2,
    "Une valeur plausible suit la tendance du nuage : elle est entre les ordonnées des points voisins.",
    () => {
      const nu = tirerNuage();
      const { ctx } = nu;
      const xsPris = new Set(nu.pts.map((p) => p.x));
      const libres = [2, 3, 4, 5, 6, 7, 8, 9].filter((x) => !xsPris.has(x) && nu.pts.some((p) => p.x < x) && nu.pts.some((p) => p.x > x));
      const x = libres.length ? pick(libres) : 5.5;
      const yv = Math.round(ctx.y0 + ctx.pente * x);
      // Des leurres loin de la tendance (au moins 5 d'écart) mais DANS la plage du contexte.
      const lo = Math.max(1, Math.round(Math.min(ctx.y0, ctx.y0 + 10 * ctx.pente)) - 1);
      const hi = Math.round(Math.max(ctx.y0, ctx.y0 + 10 * ctx.pente)) + 1;
      const leurres = shuffle([-12, -10, -8, -6, 6, 8, 10, 12].map((d) => yv + d).filter((v) => v >= lo && v <= hi))
        .map((v) => `$${fr(v)}$ ${ctx.uy}`);
      const bonne = `$${fr(yv)}$ ${ctx.uy}`;
      return {
        text: `${ctx.intro} Pour un nouvel individu, ${ctx.x} vaut $${fr(x)}$ ${ctx.ux}. D'après la tendance du nuage, quelle valeur ${du(ctx.y)} est la plus plausible ?`,
        format: "qcm",
        choices: choix4(bonne, leurres),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuagePts(nu),
        explanation: exp(
          "Quand un nuage a une tendance nette, un nouvel individu se place vraisemblablement dans le prolongement des autres points.",
          `On repère l'abscisse $${fr(x)}$, et on regarde la hauteur des points voisins.`,
          `Les points proches de $${fr(x)}$ ont des ordonnées autour de $${fr(yv)}$ (nuage qui ${nu.sens === "monte" ? "monte" : "descend"}).`,
          `La valeur la plus plausible est ${bonne}.`
        ),
      };
    }, ["nuage", "tendance"]),

  gab("info_nuage_tendance_comparer", "info_nuage", "info_nuage_tendance", 2,
    "Si le nuage monte, un individu plus à droite a probablement une ordonnée plus grande ; s'il descend, plus petite.",
    () => {
      const nu = tirerNuage();
      const { ctx } = nu;
      const xs = new Set(nu.pts.map((p) => p.x));
      const a = pick([1, 2, 3].filter((x) => !xs.has(x)).concat([0.5]));
      const b = pick([8, 9, 10].filter((x) => !xs.has(x)).concat([10.5]));
      const [nA, nB] = shuffle(["l'individu I", "l'individu J", "l'individu K"]).slice(0, 2);
      const bonne = nu.sens === "monte" ? nB : nA;
      return {
        text: `${ctx.intro} Deux nouveaux relevés s'ajoutent : pour ${nA}, ${ctx.x} vaut $${fr(a)}$ ${ctx.ux} ; pour ${nB}, $${fr(b)}$ ${ctx.ux}. D'après la tendance du nuage, lequel des deux aura probablement l'ordonnée (${ctx.y}) la plus grande ?`,
        format: "qcm",
        choices: choix4(bonne, [bonne === nA ? nB : nA, "Les deux auront la même valeur", "Le nuage ne permet pas de faire de prévision"]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuagePts(nu),
        explanation: exp(
          "Une tendance nette permet une prévision prudente : un nouvel individu se place vraisemblablement dans le prolongement du nuage.",
          "On repère si le nuage monte ou descend de gauche à droite.",
          `Le nuage ${nu.sens === "monte" ? "monte" : "descend"} : de ${coord(nu.pts[0].x, nu.pts[0].y)} à ${coord(nu.pts[nu.pts.length - 1].x, nu.pts[nu.pts.length - 1].y)}.`,
          `L'ordonnée la plus grande revient probablement à ${bonne} — une tendance, pas une certitude.`
        ),
      };
    }, ["nuage", "tendance"]),
];

export const informationChiffreeBank: TutorBankItemV4[] = [
  /* ═══════ tableau croisé : lire, compléter, construire (générateurs plus haut) ═══════ */
  ...ITEMS_TAB_LIRE,
  ...ITEMS_TAB_COMPLETER,
  ...ITEMS_TAB_CONSTRUIRE,

  /* ═══════════════ info_tab_frequence_marginale ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_marginale_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_frequences",
    microId: "info_tab_frequence_marginale",
    difficulty: 3,
    theme: "neutral",
    hint: "Une fréquence marginale rapporte un total de ligne (ou de colonne) au total GÉNÉRAL.",
    tags: ["premiere", "maths", "statistiques", "frequences", "template", "short"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      const valeur = t.ligne1 / t.total;
      return {
        text:
          `Dans le tableau ci-contre, quelle est la fréquence de « ${s.lignes[0]} » ` +
          `parmi l'ensemble des ${s.individu}s ? (Arrondis au centième.)`,
        format: "short",
        expected: [fr(Math.round(valeur * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une fréquence marginale est la part d'une modalité dans la population ENTIÈRE.",
          "On divise le total de la ligne par le total général.",
          `$\\dfrac{${t.ligne1}}{${t.total}} \\approx ${fr(Math.round(valeur * 100) / 100)}$.`,
          `La fréquence marginale vaut environ $${fr(Math.round(valeur * 100) / 100)}$, soit $${fr(Math.round(valeur * 100))}\\,\\%$ des ${s.individu}s.`
        ),
      };
    },
  },

  /* ═══════════════ info_tab_frequence_conditionnelle ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_conditionnelle_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_frequences",
    microId: "info_tab_frequence_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "« Parmi les… » : on divise par le total de CETTE sous-population, pas par le total général.",
    tags: ["premiere", "maths", "statistiques", "frequences", "template", "short"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      const valeur = t.a / t.ligne1;
      return {
        text:
          `Dans le tableau ci-contre, quelle est la fréquence de « ${s.colonnes[0]} » ` +
          `PARMI les « ${s.lignes[0]} » ? (Arrondis au centième.)`,
        format: "short",
        expected: [fr(Math.round(valeur * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une fréquence conditionnelle se calcule dans une population RÉDUITE par la condition.",
          "Le mot « parmi » désigne le dénominateur : c'est le total de la ligne, non le total général.",
          `$\\dfrac{${t.a}}{${t.ligne1}} \\approx ${fr(Math.round(valeur * 100) / 100)}$.`,
          `Environ $${fr(Math.round(valeur * 100))}\\,\\%$. ⚠️ Diviser par $${t.total}$ aurait donné la fréquence de l'INTERSECTION, qui est une autre question.`
        ),
      };
    },
  },

  /* ═══════════════ info_tab_interpreter ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_interpreter_tab_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_frequences",
    microId: "info_tab_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Comparer deux sous-populations demande des FRÉQUENCES, pas des effectifs.",
    tags: ["premiere", "maths", "statistiques", "frequences", "template"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      const f1 = t.a / t.ligne1;
      const f2 = t.c / t.ligne2;
      const plusFort = f1 > f2 ? s.lignes[0] : s.lignes[1];
      return {
        text:
          `Le tableau ci-contre croise deux caractères. ` +
          `Dans quelle catégorie la part de « ${s.colonnes[0]} » est-elle la plus forte ?`,
        format: "qcm",
        choices: makeChoices(`chez les « ${plusFort} »`, [
          `chez les « ${f1 > f2 ? s.lignes[1] : s.lignes[0]} »`,
          "les deux parts sont égales",
          "on ne peut pas comparer, les effectifs sont différents",
        ]),
        expected: [`chez les « ${plusFort} »`],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Comparer deux groupes d'effectifs différents exige de passer par des fréquences : les effectifs bruts ne se comparent pas.",
          "On calcule la fréquence conditionnelle dans chaque catégorie.",
          `Chez « ${s.lignes[0]} » : $\\dfrac{${t.a}}{${t.ligne1}} \\approx ${fr(Math.round(f1 * 100) / 100)}$. ` +
            `Chez « ${s.lignes[1]} » : $\\dfrac{${t.c}}{${t.ligne2}} \\approx ${fr(Math.round(f2 * 100) / 100)}$.`,
          `La part est plus forte chez les « ${plusFort} ». C'est précisément ce que le document d'accompagnement appelle « travailler en fréquences plutôt qu'en effectifs ».`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas comparer, les effectifs sont différents",
            cause: "c'est justement le rôle des fréquences : elles rendent les groupes comparables",
          },
        ],
      };
    },
  },

  /* ═══════ représentations croisées (générateurs plus haut) ═══════ */
  ...ITEMS_REP_BARRES,
  ...ITEMS_REP_CIRCULAIRE,
  ...ITEMS_REP_CHOISIR,
  ...ITEMS_REP_COMMENTER,

  /* ═══════════════ info_tableur_lire ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_tableur_lire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_tableur",
    microId: "info_tableur_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Une cellule se repère par sa colonne (lettre) et sa ligne (numéro).",
    tags: ["premiere", "maths", "tableur", "template", "short"],
    generate: () => {
      const base = pick([1000, 2000, 5000] as const);
      const taux = pick([1.02, 1.05] as const);
      const valeurs = [0, 1, 2, 3].map((n) => [n, Math.round(base * taux ** n)]);
      const ligne = pick([2, 3, 4] as const);
      return {
        text: `Quelle valeur contient la cellule $B${ligne}$ de la feuille de calcul ci-contre ?`,
        format: "short",
        expected: [String(valeurs[ligne - 1][1])],
        comparator: "number_equal",
        canvas: canvasTableur(["A", "B"], valeurs, "Capital année après année"),
        explanation: exp(
          "Dans un tableur, une cellule est désignée par la lettre de sa colonne suivie du numéro de sa ligne.",
          "On cherche la colonne $B$, puis la ligne $" + ligne + "$.",
          `La cellule $B${ligne}$ contient $${valeurs[ligne - 1][1]}$.`,
          `$B${ligne} = ${valeurs[ligne - 1][1]}$.`
        ),
      };
    },
  },

  /* ═══════════════ info_tableur_comprendre_formule ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_tableur_formule_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_tableur",
    microId: "info_tableur_comprendre_formule",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient multiplicateur dit de quel pourcentage on augmente.",
    tags: ["premiere", "maths", "tableur", "template"],
    generate: () => {
      const t = pick([2, 3, 5, 10] as const);
      const coef = 1 + t / 100;
      return {
        text: `Dans un tableur, on saisit en $B3$ la formule $=B2*${fr(coef)}$. Que calcule-t-elle ?`,
        format: "qcm",
        choices: makeChoices(`une augmentation de $${t}\\,\\%$ par rapport à $B2$`, [
          `une augmentation de $${fr(coef)}\\,\\%$ par rapport à $B2$`,
          `une diminution de $${t}\\,\\%$ par rapport à $B2$`,
          `l'ajout de $${fr(coef)}$ à la valeur de $B2$`,
        ]),
        expected: [`une augmentation de $${t}\\,\\%$ par rapport à $B2$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par $1 + \\dfrac{t}{100}$ correspond à une hausse de $t\\,\\%$.",
          "On retire $1$ au coefficient pour retrouver le taux.",
          `$${fr(coef)} - 1 = ${fr(t / 100)}$, soit $${t}\\,\\%$.`,
          `La formule augmente la valeur de $B2$ de $${t}\\,\\%$. Recopiée vers le bas, elle construit une suite géométrique de raison $${fr(coef)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `une augmentation de $${fr(coef)}\\,\\%$ par rapport à $B2$`,
            cause: "a lu le coefficient comme un pourcentage sans retirer 1",
          },
        ],
      };
    },
  },

  /* ═══════════════ info_tableur_ecrire_formule ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_tableur_ecrire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_tableur",
    microId: "info_tableur_ecrire_formule",
    difficulty: 4,
    theme: "neutral",
    hint: "Une formule à recopier doit désigner la cellule du DESSUS, pas une valeur fixe.",
    tags: ["premiere", "maths", "tableur", "template"],
    generate: () => {
      const t = pick([2, 5, 10] as const);
      const coef = 1 + t / 100;
      const base = pick([1000, 2000] as const);
      const valeurs = [0, 1, 2, 3].map((n) => [n, Math.round(base * coef ** n)]);
      return {
        text:
          `La colonne $B$ donne un capital qui augmente de $${t}\\,\\%$ chaque année. ` +
          `Quelle formule saisir en $B3$ pour pouvoir ensuite la recopier vers le bas ?`,
        format: "qcm",
        choices: makeChoices(`$=B2*${fr(coef)}$`, [
          `$=B2+${t}$`,
          `$=B2*${fr(t / 100)}$`,
          `$=${valeurs[1][1]}*${fr(coef)}$`,
        ]),
        expected: [`$=B2*${fr(coef)}$`],
        comparator: "mcq_exact",
        canvas: canvasTableur(["A", "B"], valeurs, "Capital année après année"),
        explanation: exp(
          "Une formule destinée à être recopiée doit faire RÉFÉRENCE à une cellule, et non contenir un nombre figé : la référence se décale à la recopie.",
          "On exprime la valeur cherchée à partir de celle du dessus.",
          `$B3 = B2 \\times ${fr(coef)}$, et en recopiant vers le bas, $B4$ deviendra $B3 \\times ${fr(coef)}$.`,
          `La formule est $=B2*${fr(coef)}$. Avec un nombre écrit en dur, toutes les lignes recalculeraient la même chose.`
        ),
        choiceDiagnostics: [
          {
            choice: `$=${valeurs[1][1]}*${fr(coef)}$`,
            cause: "a écrit la valeur en dur : la recopie ne fonctionnerait pas",
          },
          {
            choice: `$=B2+${t}$`,
            cause: "a ajouté le taux comme une somme : ce serait une suite arithmétique",
          },
        ],
      };
    },
  },

  /* ═══════════════ info_tableur_exploiter_colonne ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_tableur_colonne_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_tableur",
    microId: "info_tableur_exploiter_colonne",
    difficulty: 3,
    theme: "neutral",
    hint: "On parcourt la colonne jusqu'à dépasser le seuil.",
    tags: ["premiere", "maths", "tableur", "seuil", "template", "short"],
    generate: () => {
      const base = pick([500, 800, 1000, 1200, 1500] as const);
      const coef = pick([1.2, 1.25, 1.5] as const);
      const valeurs = [0, 1, 2, 3, 4].map((n) => [n, Math.round(base * coef ** n)]);
      const seuil = pick([
        Math.round(base * coef ** 2) - 1,
        Math.round(base * coef ** 3) - 1,
      ] as const);
      const premier = valeurs.find((v) => (v[1] as number) > seuil)![0];
      return {
        text:
          `La feuille de calcul ci-contre donne un capital année après année. ` +
          `À partir de quelle année le capital dépasse-t-il $${seuil}$ € ?`,
        format: "short",
        expected: [String(premier)],
        comparator: "number_equal",
        canvas: canvasTableur(["Année", "Capital"], valeurs, "Capital année après année"),
        explanation: exp(
          "Un tableau de valeurs permet de résoudre un problème de seuil sans calcul algébrique : on lit.",
          "On parcourt la colonne des capitaux jusqu'à trouver la première valeur qui dépasse le seuil.",
          `La première valeur strictement supérieure à $${seuil}$ apparaît à l'année $${premier}$.`,
          `Le capital dépasse $${seuil}$ € à partir de l'année $${premier}$. C'est la méthode utilisée dans les sujets, qui fournissent l'extrait de tableur.`
        ),
      };
    },
  },

  /* ═══════════════ info_tableur_diagramme ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_info_tableur_diagramme_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_tableur",
    microId: "info_tableur_diagramme",
    difficulty: 3,
    theme: "neutral",
    text:
      "Une feuille de calcul contient, pour chaque année de 2015 à 2025, la population d'une commune. " +
      "Quel diagramme choisir pour montrer l'ÉVOLUTION de cette population ?",
    format: "qcm",
    choices: [
      "Une courbe, ou un nuage de points reliés",
      "Un diagramme circulaire",
      "Un diagramme en boîte",
      "Un tableau croisé",
    ],
    expected: ["Une courbe, ou un nuage de points reliés"],
    comparator: "mcq_exact",
    hint: "Une évolution se lit dans le temps : il faut un axe pour les années.",
    explanation: exp(
      "Le choix d'une représentation dépend de ce qu'on veut montrer : une évolution dans le temps demande un axe des temps.",
      "On repère la question posée : comment la population change au fil des années.",
      "Une courbe place les années en abscisse et la population en ordonnée : la tendance se voit immédiatement. Un diagramme circulaire, lui, montrerait des parts d'un tout — ce qui n'a aucun sens pour des années successives.",
      "On choisit une courbe ou un nuage de points. C'est d'ailleurs la représentation qui prépare l'ajustement affine."
    ),
    tags: ["premiere", "maths", "tableur", "diagramme"],
  },

  {
    kind: "template",
    id: "premiere_info_tableur_diagramme_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_tableur",
    microId: "info_tableur_diagramme",
    difficulty: 3,
    theme: "neutral",
    hint: "Que contiennent les colonnes ? Des années, des catégories, ou deux grandeurs mesurées ?",
    tags: ["premiere", "maths", "tableur", "diagramme", "template"],
    generate: () => {
      const cas = pick([
        {
          feuille: "pour chaque année de 2015 à 2025, la population d'une commune",
          but: "l'ÉVOLUTION de cette population",
          bonne: "une courbe, ou un nuage de points reliés",
          pieges: ["un diagramme circulaire", "un diagramme en boîte", "un tableau croisé"],
        },
        {
          feuille: "le nombre d'élèves inscrits dans chacune des cinq options",
          but: "la RÉPARTITION des élèves entre les options",
          bonne: "un diagramme circulaire",
          pieges: ["une courbe", "un nuage de points", "un diagramme en boîte"],
        },
        {
          feuille: "pour vingt villes, la population et le nombre de médecins",
          but: "s'il existe une RELATION entre les deux",
          bonne: "un nuage de points",
          pieges: ["un diagramme circulaire", "une courbe du temps", "un diagramme en barres"],
        },
        {
          feuille: "les ventes de quatre magasins sur le même mois",
          but: "COMPARER les quatre magasins",
          bonne: "un diagramme en barres",
          pieges: ["une courbe", "un nuage de points", "un diagramme en boîte"],
        },
      ] as const);
      return {
        text:
          `Une feuille de calcul contient ${cas.feuille}. ` +
          `Quel diagramme choisir pour montrer ${cas.but} ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.pieges),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un tableur peut tout dessiner : c'est à nous de choisir la représentation qui répond à la question posée.",
          "On regarde ce que contiennent les colonnes, puis ce qu'on veut faire voir.",
          `Ici les données sont « ${cas.feuille} », et l'on cherche à montrer ${cas.but}.`,
          `On choisit ${cas.bonne}.`
        ),
      };
    },
  },

  /* ═══════ filtres ET / OU / NON, et nuage de points (générateurs plus haut) ═══════ */
  ...ITEMS_FILTRE_SOUS_ENSEMBLE,
  ...ITEMS_FILTRE_ET,
  ...ITEMS_FILTRE_OU,
  ...ITEMS_FILTRE_NON,
  ...ITEMS_FILTRE_EFFECTIF,
  ...ITEMS_NUAGE_LIRE,
  ...ITEMS_NUAGE_CONSTRUIRE,
  ...ITEMS_NUAGE_TENDANCE,
];
