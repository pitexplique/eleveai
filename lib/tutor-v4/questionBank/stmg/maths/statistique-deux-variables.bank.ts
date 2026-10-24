// lib/tutor-v4/questionBank/stmg/maths/statistique-deux-variables.bank.ts
//
// Notions : stat_nuage, stat_ajustement, stat_interpoler,
//           stat_moindres_carres, stat_changement_variable
//           (domaine STMGST — « Séries statistiques à deux variables
//            quantitatives », classe terminale)
//
// ⭐ TOUTES les questions portent une figure — nuage de points, droite
// d'ajustement, ou tableau de données. C'est le sujet même : « on procède à la
// recherche d'ajustements pertinents, affines ou non, de ces nuages, dans le
// but de réaliser des interpolations ou des extrapolations ». Un nuage décrit
// en toutes lettres n'est plus un nuage.
//
// Le nuage est FABRIQUÉ par le générateur : on choisit la droite, puis on
// disperse les points autour. Les données changent donc à chaque tirage, et la
// bonne réponse aussi.
//
// ⚠️ Le BO demande explicitement l'esprit critique, et pas seulement le
// calcul : « les élèves sont entraînés à exercer leur esprit critique sur la
// pertinence, au regard des données et de la situation étudiée, d'une
// modélisation par ajustement affine et sur les limites des extrapolations
// faites dans ce cadre ». D'où la micro sur les limites — une extrapolation à
// vingt ans n'a pas la même valeur qu'une interpolation entre deux relevés.
//
// ⛔ « Aucun développement théorique n'est attendu » sur les moindres carrés :
// on présente le principe — la droite qui minimise la somme des carrés des
// écarts — et on le fait manipuler, sans démonstration.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  const arrondi = Math.round(n * 100000) / 100000;
  return String(arrondi).replace(".", ",");
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  const distracteurs = Array.from(new Set(wrongs)).filter((w) => w !== correct);
  return shuffle([correct, ...distracteurs.slice(0, 3)]);
}

/** « 1 unité », « 3 unités » — l'accord ne se fait pas tout seul dans un gabarit. */
function unites(n: number): string {
  return n > 1 ? "unités" : "unité";
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/* ─────────────────── contextes ─────────────────── */

/**
 * « de » contracté devant un sujet qui porte déjà son article.
 *
 * ⚠️ « Voici les relevés de ${serie.sujet} » donnait « les relevés DE LE
 * rendement au mètre carré ». Sur six sujets, cinq commencent par « l' » ou
 * « la » et passaient — le sixième non. Ne pas insérer un sujet derrière « de »
 * sans passer par cette fonction.
 */
function duSujet(sujet: string): string {
  if (sujet.startsWith("le ")) return `du ${sujet.slice(3)}`;
  if (sujet.startsWith("la ")) return `de la ${sujet.slice(3)}`;
  if (sujet.startsWith("les ")) return `des ${sujet.slice(4)}`;
  if (sujet.startsWith("l'")) return `de ${sujet}`;
  return `de ${sujet}`;
}

/**
 * ⭐ 21/10/2026 — UN MÉTIER, UN SENS, UN ORDRE DE GRANDEUR PAR CONTEXTE.
 *
 * Six contextes et des énoncés à phrase fixe : 2 à 24 squelettes par micro,
 * l'élève revoyait la même question une fois sur deux. Chaque contexte porte
 * désormais son métier (les maths sont transversales : gestion, marketing,
 * RH, santé, environnement, sport), le SENS plausible de la relation (« - » :
 * une voiture ne prend pas de valeur en vieillissant) et les pentes et
 * ordonnées à l'origine qui donnent des valeurs vraisemblables pour $x$ de $1$
 * à $7$. Les abscisses restent des rangs ou de petits entiers : tous les
 * gabarits de ce fichier en dépendent.
 */
type Contexte = {
  metier: string;
  x: string;
  y: string;
  unite: string;
  sujet: string;
  sens: "+" | "-" | "±";
  pentes: readonly number[];
  base: readonly [number, number];
};

const SERIES: readonly Contexte[] = [
  { metier: "Une contrôleuse de gestion", x: "Rang de l'année", y: "Chiffre d'affaires", unite: "k€", sujet: "l'évolution du chiffre d'affaires", sens: "±", pentes: [4, 5, 6, 8, 10], base: [60, 120] },
  { metier: "Un responsable marketing", x: "Dépense publicitaire (k€)", y: "Ventes", unite: "milliers d'articles", sujet: "l'effet de la publicité sur les ventes", sens: "+", pentes: [2, 3, 4, 5], base: [10, 30] },
  { metier: "Une community manager", x: "Rang du mois", y: "Nombre d'abonnés", unite: "centaines d'abonnés", sujet: "la croissance du nombre d'abonnés", sens: "+", pentes: [3, 4, 5, 6, 8], base: [10, 40] },
  { metier: "Un gestionnaire d'énergie", x: "Température extérieure moyenne (°C)", y: "Consommation de chauffage", unite: "MWh", sujet: "la consommation de chauffage selon la température", sens: "-", pentes: [3, 4, 5, 6], base: [60, 90] },
  { metier: "Une experte en assurance automobile", x: "Ancienneté du véhicule (années)", y: "Valeur du véhicule", unite: "centaines d'euros", sujet: "la décote d'un véhicule", sens: "-", pentes: [8, 10, 12, 15], base: [150, 220] },
  { metier: "Un directeur de magasin", x: "Surface de vente (centaines de m²)", y: "Chiffre d'affaires", unite: "k€", sujet: "le rendement de la surface de vente", sens: "+", pentes: [10, 12, 15], base: [30, 60] },
  { metier: "Une responsable des ressources humaines", x: "Heures de formation suivies", y: "Erreurs de saisie par mois", unite: "erreurs", sujet: "l'effet de la formation sur les erreurs de saisie", sens: "-", pentes: [2, 3, 4], base: [40, 60] },
  { metier: "Un chargé de recrutement", x: "Rang du trimestre", y: "Candidatures reçues", unite: "candidatures", sujet: "le nombre de candidatures reçues", sens: "±", pentes: [5, 6, 8, 10], base: [60, 120] },
  { metier: "Une cadre de santé", x: "Rang de la semaine", y: "Consultations aux urgences par jour", unite: "consultations", sujet: "la fréquentation des urgences", sens: "±", pentes: [2, 3, 4], base: [40, 80] },
  { metier: "Une préparatrice physique", x: "Semaines d'entraînement", y: "Charge soulevée au développé couché", unite: "kg", sujet: "la progression d'un athlète en musculation", sens: "+", pentes: [2, 3], base: [40, 60] },
  { metier: "Une ingénieure environnement", x: "Rang de l'année", y: "Émissions de CO₂ de l'usine", unite: "kilotonnes", sujet: "la baisse des émissions de CO₂ d'une usine", sens: "-", pentes: [3, 4, 5, 6], base: [80, 120] },
  { metier: "Un responsable logistique", x: "Commandes expédiées (centaines)", y: "Coût de transport", unite: "k€", sujet: "le coût de transport selon le volume expédié", sens: "+", pentes: [3, 4, 5, 6], base: [20, 40] },
  { metier: "Une gérante de salle de sport", x: "Rang du mois depuis l'ouverture", y: "Nombre d'adhérents", unite: "adhérents", sujet: "la fréquentation d'une salle de sport", sens: "+", pentes: [8, 10, 12, 15], base: [60, 120] },
  { metier: "Un agronome", x: "Apport d'engrais (dizaines de kg par hectare)", y: "Rendement en blé", unite: "quintaux par hectare", sujet: "le rendement du blé selon l'engrais", sens: "+", pentes: [2, 3, 4], base: [40, 55] },
  { metier: "Une analyste du tourisme", x: "Rang de l'année", y: "Nuitées d'hôtel", unite: "milliers de nuitées", sujet: "la fréquentation touristique d'une ville", sens: "±", pentes: [3, 4, 5, 6], base: [50, 100] },
  { metier: "Un conseiller en rénovation énergétique", x: "Rang de l'année depuis les travaux", y: "Facture d'électricité", unite: "dizaines d'euros", sujet: "la facture d'électricité après rénovation", sens: "-", pentes: [2, 3, 4], base: [40, 60] },
  { metier: "Une chargée d'études de marché", x: "Prix de vente (€)", y: "Quantité vendue", unite: "centaines d'unités", sujet: "la demande selon le prix de vente", sens: "-", pentes: [5, 6, 8, 10], base: [90, 130] },
  { metier: "Un responsable de la sécurité routière", x: "Rang de l'année", y: "Accidents sur la route départementale", unite: "accidents", sujet: "l'évolution du nombre d'accidents", sens: "-", pentes: [3, 4, 5], base: [50, 80] },
  { metier: "Une pharmacienne", x: "Rang du mois", y: "Ventes de crème solaire", unite: "centaines de tubes", sujet: "les ventes de crème solaire au printemps", sens: "+", pentes: [4, 5, 6, 8], base: [10, 30] },
  { metier: "Un trésorier de club de football", x: "Rang de la saison", y: "Recettes de billetterie", unite: "k€", sujet: "les recettes de billetterie du club", sens: "±", pentes: [4, 5, 6, 8], base: [50, 100] },
  { metier: "Une responsable de plateforme de streaming", x: "Rang du mois", y: "Heures de visionnage", unite: "milliers d'heures", sujet: "l'audience d'une plateforme de streaming", sens: "+", pentes: [5, 6, 8, 10], base: [30, 60] },
  { metier: "Un gestionnaire de restauration scolaire", x: "Rang de la semaine", y: "Repas gaspillés par jour", unite: "repas", sujet: "la réduction du gaspillage alimentaire", sens: "-", pentes: [3, 4, 5, 6], base: [60, 90] },
  { metier: "Une gestionnaire immobilière", x: "Rang de l'année", y: "Loyer moyen d'un studio", unite: "dizaines d'euros", sujet: "l'évolution des loyers", sens: "+", pentes: [2, 3], base: [45, 65] },
  { metier: "Un technicien du tri des déchets", x: "Rang du mois", y: "Déchets triés collectés", unite: "tonnes", sujet: "la collecte des déchets triés", sens: "+", pentes: [3, 4, 5, 6], base: [30, 60] },
];

/** « Une contrôleuse » → « une contrôleuse », pour glisser le métier dans une phrase. */
function minuscule(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/** Un contexte compatible avec le sens demandé (aucun : n'importe lequel). */
function tirerContexte(croissant?: boolean): Contexte {
  if (croissant === undefined) return pick(SERIES);
  return pick(SERIES.filter((s) => s.sens === "±" || s.sens === (croissant ? "+" : "-")));
}

/**
 * La phrase d'entrée : QUI regarde ces données. Quatre tournures × 24
 * contextes : c'est elle qui empêche la même phrase de revenir.
 */
function amorce(s: Contexte): string {
  return pick([
    `${s.metier} étudie ${s.sujet}.`,
    `${s.metier} a rassemblé des relevés sur ${s.sujet}.`,
    `Pour un rapport sur ${s.sujet}, ${minuscule(s.metier)} a relevé les données ci-dessous.`,
    `Dossier « ${s.sujet} », préparé par ${minuscule(s.metier)}.`,
  ]);
}

type Nuage = {
  serie: Contexte;
  xs: number[];
  ys: number[];
  /** Droite « vraie » ayant servi à fabriquer le nuage. */
  a: number;
  b: number;
};

/**
 * Un nuage fabriqué autour d'une droite connue.
 *
 * On choisit d'abord la droite, puis on disperse les points : la tendance est
 * ainsi maîtrisée, les valeurs restent entières, et la bonne réponse change à
 * chaque tirage.
 */
function tirerNuage(options?: { croissant?: boolean; bruit?: number }): Nuage {
  const serie = tirerContexte(options?.croissant);
  const croissant =
    options?.croissant ?? (serie.sens === "+" ? true : serie.sens === "-" ? false : Math.random() < 0.5);
  const pente = pick(serie.pentes);
  const a = (croissant ? 1 : -1) * pente;
  const n = pick([5, 6, 7] as const);
  // Décroissant : la valeur la plus basse doit rester nettement positive — une
  // consommation à $-4$ MWh au dernier relevé ne s'observe pas.
  const b = croissant
    ? randomInt(serie.base[0], serie.base[1])
    : Math.max(randomInt(serie.base[0], serie.base[1]), pente * (n + 1) + 10);
  const bruit = options?.bruit ?? 3;
  const xs = Array.from({ length: n }, (_, k) => k + 1);
  const ys = xs.map((x) => a * x + b + randomInt(-bruit, bruit));
  return { serie, xs, ys, a, b };
}

/**
 * ⭐ LA VRAIE DROITE DES MOINDRES CARRÉS, celle de la calculatrice : on ne
 * corrige jamais un ajustement avec la droite qui a servi à fabriquer le nuage
 * — le bruit l'a déplacée. a = cov(x, y) / var(x), b = ȳ − a·x̄.
 */
function moindresCarres(xs: readonly number[], ys: readonly number[]) {
  const n = xs.length;
  const mx = xs.reduce((s, v) => s + v, 0) / n;
  const my = ys.reduce((s, v) => s + v, 0) / n;
  let sxy = 0;
  let sxx = 0;
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - mx) * (ys[i] - my);
    sxx += (xs[i] - mx) ** 2;
  }
  const a = sxy / sxx;
  return { a, b: my - a * mx, mx, my };
}

/** Arrondi à `d` décimales, sans les « 0,30000000004 » du flottant. */
function arrondi(v: number, d: number): number {
  const p = 10 ** d;
  return Math.round(v * p + (v >= 0 ? 1e-9 : -1e-9)) / p;
}

/** $y = ax + b$ écrit proprement (signe de b, virgule française). */
function equation(a: number, b: number, lettre = "x"): string {
  return `$y = ${fr(a)}${lettre} ${b >= 0 ? "+" : "-"} ${fr(Math.abs(b))}$`;
}

/** Somme des carrés des écarts d'une droite à un nuage. */
function sce(xs: readonly number[], ys: readonly number[], a: number, b: number): number {
  return xs.reduce((s, x, i) => s + (ys[i] - (a * x + b)) ** 2, 0);
}

/**
 * Une réponse arrondie, avec la TOLÉRANCE ANNONCÉE : un cran de l'arrondi de
 * part et d'autre (« au dixième » : 4,2 attendu, 4,1 et 4,3 acceptés — la
 * calculatrice et l'arrondi des coefficients intermédiaires peuvent décaler
 * d'un cran, jamais de deux).
 */
function avecTolerance(v: number, d: number): string[] {
  const pas = 10 ** -d;
  return [arrondi(v, d), arrondi(v - pas, d), arrondi(v + pas, d)].map((x) => fr(x));
}

/** Le nuage, avec éventuellement une droite d'ajustement. */
function canvasNuage(
  nuage: Nuage,
  titre: string,
  droite?: { a: number; b: number },
  evidence?: { x?: number; y?: number }
): CanvasFigure {
  const tous = [...nuage.ys, ...(droite ? nuage.xs.map((x) => droite.a * x + droite.b) : [])];
  return {
    kind: "fonctionGraphique",
    titre,
    xmin: 0,
    xmax: Math.max(...nuage.xs) + 2,
    ymin: Math.max(0, Math.floor(Math.min(...tous) - 8)),
    ymax: Math.ceil(Math.max(...tous) + 8),
    grille: true,
    courbes: [
      ...(droite ? [{ id: "d", type: "affine" as const, a: droite.a, b: droite.b }] : []),
    ],
    points: nuage.xs.map((x, k) => ({ x, y: nuage.ys[k] })),
    misesEnEvidence:
      evidence !== undefined
        ? [
            {
              verticale: evidence.x !== undefined ? { x: evidence.x } : undefined,
              horizontale: evidence.y !== undefined ? { y: evidence.y } : undefined,
            },
          ]
        : undefined,
  };
}

/**
 * Un nuage quelconque — celui d'une variable TRANSFORMÉE (z = 1/x entre 0 et 1,
 * u = x² jusqu'à 36…) — avec une fenêtre calculée sur les points, et
 * éventuellement sa droite d'ajustement.
 */
function canvasNuagePoints(
  xs: readonly number[],
  ys: readonly number[],
  titre: string,
  droite?: { a: number; b: number }
): CanvasFigure {
  const xmax = Math.max(...xs);
  const tous = [...ys, ...(droite ? xs.map((x) => droite.a * x + droite.b) : [])];
  const bas = Math.min(...tous);
  const haut = Math.max(...tous);
  const marge = Math.max((haut - bas) * 0.12, 0.1);
  return {
    kind: "fonctionGraphique",
    titre,
    xmin: 0,
    xmax: arrondi(xmax * 1.12, 3),
    ymin: arrondi(Math.max(0, bas - marge), 3),
    ymax: arrondi(haut + marge, 3),
    grille: true,
    courbes: [
      ...(droite ? [{ id: "d", type: "affine" as const, a: droite.a, b: droite.b }] : []),
    ],
    points: xs.map((x, k) => ({ x, y: ys[k] })),
  };
}

/** Le même nuage, en tableau de données. */
function canvasTableauNuage(nuage: Nuage, titre: string): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: titre,
    headers: [nuage.serie.x, ...nuage.xs.map((x) => String(x))],
    rows: [{ label: `${nuage.serie.y} (${nuage.serie.unite})`, values: nuage.ys.map((y) => String(y)) }],
  };
}

/* ─────────────── changement de variable : trois familles ─────────────── */

/**
 * ⭐ 21/10/2026 — UN CHANGEMENT DE VARIABLE SE CHOISIT D'APRÈS LA SITUATION.
 * Le BO cite $u = x^2$, $1/t$ et $\log(y)$ : trois familles de situations, chacune
 * avec SES contextes. Une décote de voiture n'est pas exponentielle croissante,
 * et un coût moyen qui partage un coût fixe se linéarise par $1/x$, pas par le
 * logarithme.
 */
/** `p` : les coefficients plausibles (le facteur q pour l'exponentielle, a sinon) ;
 *  `b` : l'intervalle de la constante (la valeur de départ pour l'exponentielle). */
type ContexteCV = {
  metier: string;
  x: string;
  y: string;
  unite: string;
  sujet: string;
  p: readonly number[];
  b: readonly [number, number];
};

/** y multiplié par un même facteur à chaque pas : on linéarise par z = log(y). */
const CV_EXPO: readonly ContexteCV[] = [
  { metier: "Une community manager", x: "Rang du jour", y: "Nombre de vues", unite: "vues", sujet: "la diffusion d'une vidéo virale", p: [1.5, 2, 2.5], b: [1000, 5000] },
  { metier: "Une biologiste", x: "Heures d'incubation", y: "Nombre de bactéries", unite: "bactéries par mL", sujet: "la croissance d'une culture de bactéries", p: [1.5, 2], b: [200, 900] },
  { metier: "Un responsable du commerce en ligne", x: "Rang du trimestre", y: "Commandes en ligne", unite: "commandes", sujet: "l'essor des commandes en ligne", p: [1.2, 1.25, 1.3], b: [300, 800] },
  { metier: "Une conseillère bancaire", x: "Rang de l'année", y: "Valeur d'un placement", unite: "euros", sujet: "un placement à intérêts composés", p: [1.03, 1.04, 1.05], b: [1000, 5000] },
  { metier: "Un chargé de communication", x: "Rang de la semaine", y: "Abonnés à la lettre d'information", unite: "abonnés", sujet: "le succès d'une lettre d'information", p: [1.2, 1.3, 1.4], b: [200, 600] },
  { metier: "Une fondatrice d'entreprise", x: "Rang du semestre", y: "Utilisateurs de l'application", unite: "utilisateurs", sujet: "la croissance d'une application", p: [1.5, 1.8, 2], b: [1000, 4000] },
  { metier: "Un épidémiologiste", x: "Rang du jour", y: "Cas signalés", unite: "cas", sujet: "le début d'une épidémie", p: [1.3, 1.5], b: [10, 40] },
  { metier: "Une ingénieure informaticienne", x: "Rang de l'année", y: "Volume de données stockées", unite: "téraoctets", sujet: "l'explosion des données stockées", p: [1.4, 1.6], b: [50, 200] },
  { metier: "Un organisateur de festival", x: "Rang de la semaine de prévente", y: "Billets vendus", unite: "billets", sujet: "les préventes d'un festival", p: [1.3, 1.5], b: [100, 400] },
  { metier: "Une écologue", x: "Rang de l'année", y: "Couples de fous de Bassan", unite: "couples", sujet: "le retour d'une colonie d'oiseaux protégés", p: [1.1, 1.15, 1.2], b: [40, 120] },
];

/** Un coût fixe partagé, une tâche répartie : y = a/x + b, on pose z = 1/x. */
const CV_INVERSE: readonly ContexteCV[] = [
  { metier: "Un contrôleur de gestion", x: "Quantité produite (centaines)", y: "Coût moyen unitaire", unite: "€", sujet: "le coût moyen de fabrication", p: [400, 800, 1200], b: [8, 20] },
  { metier: "Une organisatrice de voyages", x: "Nombre de participants (dizaines)", y: "Prix par personne", unite: "€", sujet: "le prix d'un voyage de groupe", p: [240, 320, 400], b: [150, 300] },
  { metier: "Un éditeur", x: "Tirage (milliers d'exemplaires)", y: "Coût par livre", unite: "€", sujet: "le coût d'impression d'un livre", p: [3, 4, 6], b: [2, 4] },
  { metier: "Une cheffe de chantier", x: "Nombre d'ouvriers", y: "Durée du chantier", unite: "jours", sujet: "la durée d'un chantier selon l'équipe", p: [40, 60, 80, 120], b: [2, 5] },
  { metier: "Un viticulteur", x: "Nombre d'équipes de vendangeurs", y: "Durée des vendanges", unite: "jours", sujet: "la durée des vendanges", p: [20, 30, 40], b: [1, 2] },
  { metier: "Une responsable événementielle", x: "Nombre d'invités (dizaines)", y: "Coût par invité", unite: "€", sujet: "le coût d'une réception", p: [200, 300, 400], b: [25, 45] },
  { metier: "Un gérant de salle de concert", x: "Spectateurs (centaines)", y: "Coût par spectateur", unite: "€", sujet: "le coût d'un concert par spectateur", p: [50, 80, 120], b: [5, 12] },
  { metier: "Une responsable d'atelier", x: "Nombre d'opérateurs", y: "Durée de la commande", unite: "heures", sujet: "la durée d'une commande selon l'effectif", p: [24, 40, 60], b: [1, 3] },
];

/** Une grandeur qui croît comme un carré : y = a·x² + b, on pose u = x². */
const CV_CARRE: readonly ContexteCV[] = [
  { metier: "Un moniteur d'auto-école", x: "Vitesse (dizaines de km/h)", y: "Distance de freinage", unite: "m", sujet: "la distance de freinage selon la vitesse", p: [0.5, 0.6, 0.8], b: [0, 4] },
  { metier: "Une pizzaïola", x: "Diamètre de la pizza (dizaines de cm)", y: "Prix de la pizza", unite: "€", sujet: "le prix d'une pizza selon sa taille", p: [0.5, 0.8, 1], b: [3, 6] },
  { metier: "Un artisan carreleur", x: "Côté de la pièce carrée (m)", y: "Prix de la pose", unite: "€", sujet: "le prix d'un carrelage", p: [40, 45, 50], b: [80, 150] },
  { metier: "Une coordinatrice de cascades", x: "Durée de la chute (dixièmes de seconde)", y: "Hauteur de chute", unite: "cm", sujet: "la hauteur d'une chute selon sa durée", p: [4.9], b: [0, 0] },
  { metier: "Une paysagiste", x: "Rayon du massif circulaire (m)", y: "Coût de la plantation", unite: "€", sujet: "le coût d'un massif fleuri", p: [30, 45, 60], b: [50, 120] },
  { metier: "Un menuisier", x: "Côté du plateau carré (dm)", y: "Prix du plateau", unite: "€", sujet: "le prix d'un plateau de table", p: [2, 3, 4], b: [20, 40] },
];

type FamilleCV = "expo" | "inverse" | "carre";

/**
 * Une série d'une famille, fabriquée à partir de SON modèle :
 *  · expo    : y = c × q^(x−1), arrondi à l'unité (des relevés, pas des puissances exactes) ;
 *  · inverse : y = a/x + b sur x ∈ {1, 2, 4, 5, 8, 10} — a/x tombe juste (dénominateurs 2 et 5) ;
 *  · carre   : y = a·x² + b sur x de 1 à 6.
 */
function tirerCV(famille: FamilleCV) {
  const s = pick(famille === "expo" ? CV_EXPO : famille === "inverse" ? CV_INVERSE : CV_CARRE);
  const a = pick(s.p);
  const b = randomInt(s.b[0], s.b[1]);
  if (famille === "expo") {
    const xs = Array.from({ length: pick([5, 6] as const) }, (_, k) => k + 1);
    return { s, xs, ys: xs.map((x) => Math.round(b * a ** (x - 1))), a, b };
  }
  if (famille === "inverse") {
    const xs = [1, 2, 4, 5, 8, 10];
    return { s, xs, ys: xs.map((x) => arrondi(a / x + b, 3)), a, b };
  }
  const xs = [1, 2, 3, 4, 5, 6];
  return { s, xs, ys: xs.map((x) => arrondi(a * x * x + b, 2)), a, b };
}

/** « + 4 », « − 4 », rien du tout pour 0 : « y = 4,9u + 0 » ne s'écrit pas. */
function plusB(b: number): string {
  return b === 0 ? "" : ` ${b > 0 ? "+" : "-"} ${fr(Math.abs(b))}`;
}

function amorceCV(s: ContexteCV): string {
  return pick([
    `${s.metier} étudie ${s.sujet}.`,
    `${s.metier} a rassemblé des relevés sur ${s.sujet}.`,
    `Pour un rapport sur ${s.sujet}, ${minuscule(s.metier)} a relevé les données ci-dessous.`,
  ]);
}

/** Un nuage d'une famille donnée, prêt pour les canvas (a, b : ceux du modèle). */
function nuageCV(s: ContexteCV, xs: number[], ys: number[], a = 0, b = 0): Nuage {
  return {
    serie: { metier: s.metier, x: s.x, y: s.y, unite: s.unite, sujet: s.sujet, sens: "+", pentes: [1], base: [0, 0] },
    xs,
    ys,
    a,
    b,
  };
}

/** Le tableau d'une série transformée : x, y, et la ligne de la nouvelle variable. */
function canvasTableauCV(s: ContexteCV, xs: number[], ys: number[], titre: string, ligne?: { label: string; values: string[] }): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: titre,
    headers: [s.x, ...xs.map((x) => fr(x))],
    rows: [{ label: `${s.y} (${s.unite})`, values: ys.map((y) => fr(y)) }, ...(ligne ? [ligne] : [])],
  };
}

export const statistiqueDeuxVariablesBank: TutorBankItemV4[] = [
  /* ═══════════════ statT_nuage_representer ═══════════════ */

  {
    kind: "template",
    id: "stmg_stat_nuage_representer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_nuage",
    microId: "statT_nuage_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque colonne du tableau donne UN point : l'abscisse en haut, l'ordonnée en dessous.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage();
      const k = randomInt(0, nuage.xs.length - 1);
      return {
        text:
          `${amorce(nuage.serie)} Le tableau donne la série statistique à deux variables correspondante. ` +
          `Quelles sont les coordonnées du point du nuage correspondant à la colonne « $${nuage.xs[k]}$ » ?`,
        format: "qcm",
        choices: makeChoices(`$(${nuage.xs[k]}\\,;\\,${nuage.ys[k]})$`, [
          `$(${nuage.ys[k]}\\,;\\,${nuage.xs[k]})$`,
          `$(${nuage.xs[k]}\\,;\\,${nuage.ys[(k + 1) % nuage.ys.length]})$`,
          `$(${k}\\,;\\,${nuage.ys[k]})$`,
          `$(${nuage.xs[k]}\\,;\\,${nuage.ys[k] + 5})$`,
          `$(${nuage.xs[k] + 1}\\,;\\,${nuage.ys[k]})$`,
        ]),
        expected: [`$(${nuage.xs[k]}\\,;\\,${nuage.ys[k]})$`],
        comparator: "mcq_exact",
        canvas: canvasTableauNuage(nuage, `${nuage.serie.sujet} — données`),
        explanation: exp(
          "Représenter une série à deux variables, c'est placer un point par couple $(x_i\\,;\\,y_i)$ : la première variable en abscisse, la seconde en ordonnée.",
          "On lit la colonne du tableau : la valeur du haut donne l'abscisse, celle du bas l'ordonnée.",
          `Pour « ${nuage.serie.x} » $= ${nuage.xs[k]}$, on relève « ${nuage.serie.y} » $= ${nuage.ys[k]}$ ${nuage.serie.unite}.`,
          `Le point a pour coordonnées $(${nuage.xs[k]}\\,;\\,${nuage.ys[k]})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$(${nuage.ys[k]}\\,;\\,${nuage.xs[k]})$`,
            cause: "a interverti abscisse et ordonnée",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — CONTRÔLER un report, au lieu d'en faire un. Le premier item
    // donne le tableau et demande les coordonnées ; celui-ci donne les relevés
    // dans l'énoncé et le nuage sur la figure, avec un point mal placé. Placer
    // un point et vérifier qu'il l'est bien ne sont pas le même geste — et
    // c'est le second qu'on fait devant un graphique qu'on n'a pas tracé.
    kind: "template",
    id: "stmg_stat_nuage_representer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_nuage",
    microId: "statT_nuage_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Reprends les relevés un par un et compare chaque ordonnée à la hauteur du point correspondant.",
    tags: ["stmg", "maths", "statistiques", "canvas", "piege", "template", "short"],
    generate: () => {
      // Les relevés sont ÉCRITS EN TOUTES LETTRES dans l'énoncé : une valeur
      // nulle ou négative — un chiffre d'affaires à $-15$ — s'y verrait, alors
      // qu'elle passe inaperçue dans un nuage. On retire donc les tirages où la
      // droite descend sous zéro.
      let nuage = tirerNuage({ bruit: 2 });
      for (let essai = 0; essai < 40; essai++) {
        if (Math.min(...nuage.ys) > 4) break;
        nuage = tirerNuage({ bruit: 2 });
      }
      const k = randomInt(0, nuage.xs.length - 1);
      // L'écart doit SE VOIR : un point décalé de 2 se confondrait avec la
      // dispersion normale du nuage, et la question n'aurait pas de réponse.
      const ecart = pick([12, 14, 16, -12, -14, -16] as const);
      const yFaux = Math.max(2, nuage.ys[k] + ecart);
      const ysAffiches = nuage.ys.map((y, i) => (i === k ? yFaux : y));
      const releves = nuage.xs
        .map((x, i) => `$${x} \\rightarrow ${nuage.ys[i]}$`)
        .join(" ; ");
      return {
        text:
          `${amorce(nuage.serie)} Voici les relevés — ${nuage.serie.x}, puis ${nuage.serie.y} : ` +
          `${releves}. ` +
          `Un point a été mal reporté sur le nuage. Pour quelle valeur de « ${nuage.serie.x} » ?`,
        format: "short",
        expected: [String(nuage.xs[k])],
        comparator: "number_equal",
        canvas: canvasNuage({ ...nuage, ys: ysAffiches }, `${nuage.serie.sujet} — report à vérifier`),
        explanation: exp(
          "Un nuage de points est la traduction exacte d'un tableau : à chaque couple $(x_i\\,;\\,y_i)$ correspond un point, et un seul.",
          "On parcourt les relevés dans l'ordre et l'on compare, pour chaque abscisse, l'ordonnée annoncée à celle du point tracé.",
          `Pour « ${nuage.serie.x} » $= ${nuage.xs[k]}$, le relevé donne $${nuage.ys[k]}$ alors que le point est tracé à $${yFaux}$ : ` +
            `un écart de $${Math.abs(yFaux - nuage.ys[k])}$. Tous les autres points sont à leur place.`,
          `Le point mal reporté est celui d'abscisse $${nuage.xs[k]}$.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_nuage_lire ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_nuage_lire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_nuage",
    microId: "statT_nuage_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "On repère l'abscisse sur l'axe horizontal, puis on monte jusqu'au point.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const nuage = tirerNuage();
      const k = randomInt(0, nuage.xs.length - 1);
      return {
        text:
          `${amorce(nuage.serie)} Sur le nuage de points obtenu, ` +
          `quelle est la valeur de « ${nuage.serie.y} » pour « ${nuage.serie.x} » $= ${nuage.xs[k]}$ ?`,
        format: "short",
        expected: [String(nuage.ys[k])],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, undefined, { x: nuage.xs[k] }),
        explanation: exp(
          "Chaque point du nuage a pour abscisse une valeur de la première variable et pour ordonnée la valeur associée de la seconde.",
          "On repère l'abscisse sur l'axe horizontal, on monte jusqu'au point, puis on lit son ordonnée.",
          `Au point d'abscisse $${nuage.xs[k]}$, l'ordonnée vaut $${nuage.ys[k]}$.`,
          `La valeur est $${nuage.ys[k]}$ ${nuage.serie.unite}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la lecture À L'ENVERS : on donne l'ordonnée, on cherche
    // l'abscisse. Le premier item descend du tableau vers le graphique ; celui-ci
    // remonte. C'est la lecture qu'on fait devant un objectif (« à partir de
    // quand atteint-on ce chiffre ? ») et elle se rate quand on a pris
    // l'habitude d'entrer par l'axe horizontal.
    kind: "template",
    id: "stmg_stat_nuage_lire_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_nuage",
    microId: "statT_nuage_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Cette fois on part de l'axe VERTICAL : on repère la hauteur, on va jusqu'au point, puis on descend lire son abscisse.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      // Les ordonnées doivent être deux à deux distinctes : sinon la valeur
      // cherchée désigne deux points, et la question a deux réponses.
      let nuage = tirerNuage();
      for (let essai = 0; essai < 40; essai++) {
        if (new Set(nuage.ys).size === nuage.ys.length) break;
        nuage = tirerNuage();
      }
      const k = randomInt(0, nuage.xs.length - 1);
      return {
        text:
          `${amorce(nuage.serie)} Sur le nuage obtenu, ` +
          `pour quelle valeur de « ${nuage.serie.x} » relève-t-on ` +
          `« ${nuage.serie.y} » $= ${nuage.ys[k]}$ ${nuage.serie.unite} ?`,
        format: "short",
        expected: [String(nuage.xs[k])],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, undefined, { y: nuage.ys[k] }),
        explanation: exp(
          "Un point du nuage se lit dans les deux sens : son abscisse donne la première variable, son ordonnée la seconde. Rien n'oblige à entrer par l'abscisse.",
          "On repère la valeur sur l'axe vertical, on avance horizontalement jusqu'au point du nuage, puis on descend lire son abscisse.",
          `La hauteur $${nuage.ys[k]}$ n'est atteinte que par un seul point, celui d'abscisse $${nuage.xs[k]}$.`,
          `C'est pour « ${nuage.serie.x} » $= ${nuage.xs[k]}$.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_nuage_tendance ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_nuage_tendance_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_nuage",
    microId: "statT_nuage_tendance",
    difficulty: 2,
    theme: "neutral",
    hint: "On regarde si le nuage monte, descend, ou ne suit aucune direction.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const croissant = Math.random() < 0.5;
      const nuage = tirerNuage({ croissant });
      return {
        text: `${amorce(nuage.serie)} Comment décrire la tendance du nuage obtenu ?`,
        format: "qcm",
        choices: shuffle([
          "croissante : les points montent globalement",
          "décroissante : les points descendent globalement",
          "les points sont exactement alignés",
          "aucune tendance ne se dégage",
        ]),
        expected: [
          croissant ? "croissante : les points montent globalement" : "décroissante : les points descendent globalement",
        ],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`),
        explanation: exp(
          "La tendance d'un nuage décrit le sens général de la relation entre les deux variables : croissante, décroissante, ou inexistante.",
          "On observe l'allure globale, sans s'arrêter à un point isolé.",
          `Ici les points ${croissant ? "montent" : "descendent"} globalement — sans être exactement alignés, ` +
            `puisque $${nuage.serie.y}$ passe de $${nuage.ys[0]}$ à $${nuage.ys[nuage.ys.length - 1]}$.`,
          `La tendance est ${croissant ? "croissante" : "décroissante"}.`
        ),
        choiceDiagnostics: [
          {
            choice: "les points sont exactement alignés",
            cause: "des points proches d'une droite ne sont pas alignés : c'est ce qui rend l'ajustement nécessaire",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — INTERPRÉTER la tendance dans la situation, au lieu de la
    // nommer. Le premier item demande « croissante ou décroissante ? » ; celui-ci
    // demande ce que cela veut dire pour l'entreprise. Le BO insiste sur
    // l'esprit critique : d'où le distracteur de la CAUSALITÉ, qui est
    // l'erreur d'interprétation la plus coûteuse — un nuage qui monte ne dit
    // jamais que l'une des variables cause l'autre.
    kind: "template",
    id: "stmg_stat_nuage_tendance_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_nuage",
    microId: "statT_nuage_tendance",
    difficulty: 3,
    theme: "neutral",
    hint: "Une tendance décrit ce qui va ENSEMBLE, elle ne dit pas ce qui cause quoi.",
    tags: ["stmg", "maths", "statistiques", "canvas", "piege", "template"],
    generate: () => {
      const croissant = Math.random() < 0.5;
      const nuage = tirerNuage({ croissant });
      const s = nuage.serie;
      const bonne =
        `quand « ${s.x} » augmente, « ${s.y} » a tendance à ${croissant ? "augmenter" : "diminuer"}`;
      return {
        text: `${amorce(s)} Que peut-on dire du nuage obtenu ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `quand « ${s.x} » augmente, « ${s.y} » a tendance à ${croissant ? "diminuer" : "augmenter"}`,
          `« ${s.x} » est la CAUSE de l'évolution de « ${s.y} »`,
          `« ${s.y} » ne dépend pas du tout de « ${s.x} »`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${s.sujet}`),
        explanation: exp(
          "La tendance d'un nuage décrit comment les deux variables ÉVOLUENT ENSEMBLE. Elle ne dit rien de ce qui cause quoi : deux grandeurs peuvent varier de concert sans lien de cause à effet.",
          "On décrit le sens de variation observé, puis on s'interdit d'en tirer une cause : c'est l'esprit critique que le programme demande.",
          `Les points ${croissant ? "montent" : "descendent"} globalement : « ${s.y} » passe de $${nuage.ys[0]}$ à ` +
            `$${nuage.ys[nuage.ys.length - 1]}$ ${s.unite} quand « ${s.x} » va de $${nuage.xs[0]}$ à $${nuage.xs[nuage.xs.length - 1]}$.`,
          `Le nuage montre que « ${s.y} » ${croissant ? "augmente" : "diminue"} avec « ${s.x} » — sans qu'on puisse en conclure une cause.`
        ),
        choiceDiagnostics: [
          {
            choice: `« ${s.x} » est la CAUSE de l'évolution de « ${s.y} »`,
            cause: "une tendance n'établit jamais une causalité : elle constate que les deux varient ensemble",
          },
        ],
      };
    },
  },

  /* ═══════════════ statT_ajust_pertinence ═══════════════ */

  {
    kind: "template",
    id: "stmg_stat_pertinence_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_pertinence",
    difficulty: 3,
    theme: "neutral",
    hint: "Un ajustement affine convient si les points se répartissent autour d'une DROITE, pas d'une courbe.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const affine = Math.random() < 0.5;
      const serie = tirerContexte(true);
      const n = 7;
      const xs = Array.from({ length: n }, (_, k) => k + 1);
      const a = pick([4, 5, 6, 8] as const);
      const b = randomInt(20, 40);
      const ys = affine
        ? xs.map((x) => a * x + b + randomInt(-3, 3))
        : xs.map((x) => Math.round(b * Math.pow(1.45, x - 1)));
      const nuage: Nuage = { serie, xs, ys, a, b };
      return {
        text: `${amorce(serie)} Un ajustement affine est-il pertinent pour ce nuage ?`,
        format: "qcm",
        choices: shuffle([
          "oui : les points se répartissent autour d'une droite",
          "non : les points suivent une courbe, l'écart s'accentue",
          "oui, toujours, quel que soit le nuage",
          "on ne peut pas en juger sur un graphique",
        ]),
        expected: [
          affine
            ? "oui : les points se répartissent autour d'une droite"
            : "non : les points suivent une courbe, l'écart s'accentue",
        ],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${serie.sujet}`),
        explanation: exp(
          "Un ajustement affine n'est pertinent que si le nuage se répartit autour d'une droite. Le BO demande d'exercer son esprit critique sur cette pertinence avant tout calcul.",
          "On regarde si les écarts successifs sont à peu près constants, ou s'ils s'accentuent.",
          affine
            ? `Les écarts successifs restent voisins de $${a}$ : le nuage est bien aligné.`
            : `Les écarts successifs passent de $${ys[1] - ys[0]}$ à $${ys[n - 1] - ys[n - 2]}$ : ils explosent. C'est une croissance exponentielle, pas linéaire.`,
          affine
            ? "L'ajustement affine est pertinent."
            : "L'ajustement affine n'est pas pertinent : une droite passerait à côté de la forme du nuage."
        ),
        choiceDiagnostics: [
          {
            choice: "oui, toujours, quel que soit le nuage",
            cause: "un ajustement affine imposé à un nuage courbe produit des prévisions fausses",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — trancher sur les NOMBRES, sans le nuage. Le premier item met
    // le graphique sous les yeux ; celui-ci ne donne que le tableau, et il faut
    // regarder les écarts successifs. C'est la version qui survit quand aucun
    // graphique n'est fourni — le cas d'un tableur — et elle explique POURQUOI
    // l'œil disait oui ou non.
    kind: "template",
    id: "stmg_stat_pertinence_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_pertinence",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule les écarts entre deux relevés consécutifs : constants, la relation est affine ; multipliés, elle ne l'est pas.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const affine = Math.random() < 0.5;
      const serie = tirerContexte(true);
      const n = 6;
      const xs = Array.from({ length: n }, (_, k) => k + 1);
      // ⚠️ LE BRUIT DOIT RESTER PETIT DEVANT LA PENTE. Avec des écarts de $5$ à
      // $8$, répondre « ils restent voisins » demande une indulgence que
      // l'élève n'a aucune raison d'avoir : la question devient un pari. Une
      // pente d'au moins $6$ et un bruit de $\pm 1$ tiennent les écarts dans un
      // rapport inférieur à $2$, quand le cas exponentiel les multiplie par
      // plus de $5$. L'écart entre les deux situations doit être franc.
      const a = pick([6, 8, 10] as const);
      const b = randomInt(20, 40);
      const ys = affine
        ? xs.map((x) => a * x + b + randomInt(-1, 1))
        : xs.map((x) => Math.round(b * Math.pow(1.5, x - 1)));
      const nuage: Nuage = { serie, xs, ys, a, b };
      const ecarts = ys.slice(1).map((y, k) => y - ys[k]);
      const bonne = affine
        ? "les écarts restent voisins les uns des autres : un ajustement affine convient"
        : "les écarts grossissent d'un relevé à l'autre : un ajustement affine ne convient pas";
      return {
        text:
          `${amorce(nuage.serie)} Les écarts entre deux relevés consécutifs valent ` +
          `${ecarts.map((e) => `$${e}$`).join(", ")}. Qu'en conclure ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          affine
            ? "les écarts grossissent d'un relevé à l'autre : un ajustement affine ne convient pas"
            : "les écarts restent voisins les uns des autres : un ajustement affine convient",
          "les écarts ne disent rien de la pertinence d'un ajustement affine",
          "il faudrait le nuage : un tableau ne permet pas d'en juger",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableauNuage(nuage, `${serie.sujet} — relevés`),
        explanation: exp(
          "Une relation affine ajoute toujours la MÊME quantité quand $x$ augmente de $1$ : ses écarts successifs sont constants. Une relation exponentielle, elle, MULTIPLIE : ses écarts grossissent.",
          "On calcule les différences entre relevés consécutifs, et l'on regarde si elles restent du même ordre.",
          affine
            ? `Les écarts vont de $${Math.min(...ecarts)}$ à $${Math.max(...ecarts)}$ : ils tournent autour de $${a}$, ` +
              `la dispersion est celle des relevés, pas de la forme.`
            : `Le premier écart vaut $${ecarts[0]}$ et le dernier $${ecarts[ecarts.length - 1]}$, ` +
              `soit environ $${Math.round((ecarts[ecarts.length - 1] / ecarts[0]) * 10) / 10}$ fois plus : la croissance s'emballe.`,
          affine
            ? "L'ajustement affine est pertinent."
            : "L'ajustement affine n'est pas pertinent : il faudrait d'abord linéariser."
        ),
        choiceDiagnostics: [
          {
            choice: "il faudrait le nuage : un tableau ne permet pas d'en juger",
            cause: "les écarts successifs suffisent : le graphique rend la chose visible, il ne l'invente pas",
          },
        ],
      };
    },
  },

  /* ═══════════════════ statT_ajust_au_juge ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_au_juge_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_au_juge",
    difficulty: 2,
    theme: "neutral",
    hint: "Une droite d'ajustement passe AU MILIEU du nuage, avec des points de part et d'autre.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 4 });
      const bonne = Math.random() < 0.5;
      const droite = bonne
        ? { a: nuage.a, b: nuage.b }
        : { a: nuage.a, b: nuage.b + pick([18, 22, -20, -25] as const) };
      return {
        text: `${amorce(nuage.serie)} La droite tracée constitue-t-elle un ajustement affine acceptable pour ce nuage ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [bonne ? "oui" : "non"],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet} et une droite`, droite),
        explanation: exp(
          "Une droite d'ajustement tracée « au jugé » doit passer au milieu du nuage : les points doivent se répartir de part et d'autre, au plus près.",
          "On regarde si la droite laisse autant de points au-dessus qu'en dessous, et si elle en reste proche.",
          bonne
            ? "La droite traverse le nuage, avec des points de chaque côté : l'ajustement est acceptable."
            : "La droite passe entièrement d'un côté du nuage : elle a la bonne direction, mais elle est décalée.",
          `Cette droite ${bonne ? "convient" : "ne convient pas"} comme ajustement.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — CORRIGER la droite, au lieu de la juger. Le premier item ne
    // laisse que « oui » ou « non » — deux propositions, donc une chance sur
    // deux au hasard. Celui-ci part d'une droite décalée et demande QUOI
    // changer dans son équation : la réponse sépare le coefficient directeur,
    // qui donne la direction, de l'ordonnée à l'origine, qui donne la hauteur.
    kind: "template",
    id: "stmg_stat_au_juge_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_au_juge",
    difficulty: 3,
    theme: "neutral",
    hint: "La direction, c'est $a$ ; la hauteur, c'est $b$. Une droite parallèle au nuage n'a qu'un défaut de hauteur.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 3 });
      const decalage = pick([16, 20, 24, -16, -20, -24] as const);
      const droite = { a: nuage.a, b: nuage.b + decalage };
      const trop = decalage > 0 ? "haute" : "basse";
      const bonne =
        `${decalage > 0 ? "diminuer" : "augmenter"} l'ordonnée à l'origine $b$, sans toucher au coefficient directeur`;
      return {
        text:
          `${amorce(nuage.serie)} La droite tracée suit bien la direction du nuage, mais elle passe entièrement ` +
          `${decalage > 0 ? "au-dessus" : "en dessous"} des points — elle est trop ${trop}. ` +
          `Que faut-il modifier dans son équation $y = ${nuage.a}x ${droite.b >= 0 ? "+" : "-"} ${Math.abs(droite.b)}$ ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${decalage > 0 ? "augmenter" : "diminuer"} l'ordonnée à l'origine $b$`,
          "changer le coefficient directeur $a$ : c'est lui qui règle la hauteur",
          "rien : une droite parallèle au nuage est toujours un bon ajustement",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet} et une droite mal placée`, droite),
        explanation: exp(
          "Dans $y = ax + b$, le coefficient directeur $a$ donne la DIRECTION de la droite, et l'ordonnée à l'origine $b$ sa HAUTEUR. Les deux se règlent séparément.",
          "On regarde d'abord si la droite suit la pente du nuage : si oui, seul $b$ est en cause, et on le déplace du côté du nuage.",
          `La droite est parallèle au nuage — même $a = ${nuage.a}$ — mais décalée de $${Math.abs(decalage)}$ vers le ${decalage > 0 ? "haut" : "bas"}. ` +
            `En ramenant $b$ de $${droite.b}$ vers $${nuage.b}$, elle retraverse le nuage.`,
          `Il faut ${decalage > 0 ? "diminuer" : "augmenter"} $b$, et laisser $a$ tel quel.`
        ),
        choiceDiagnostics: [
          {
            choice: "changer le coefficient directeur $a$ : c'est lui qui règle la hauteur",
            cause: "le coefficient directeur règle la pente, pas la hauteur — la droite a déjà la bonne pente",
          },
          {
            choice: "rien : une droite parallèle au nuage est toujours un bon ajustement",
            cause: "parallèle ne suffit pas : une droite d'ajustement doit passer AU MILIEU des points",
          },
        ],
      };
    },
  },

  /* ═══════════════════ statT_ajust_equation ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_equation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_equation",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux points suffisent : coefficient directeur d'abord, ordonnée à l'origine ensuite.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 2 });
      // On choisit deux points du nuage : la droite passe exactement par eux.
      const i = 0;
      const j = nuage.xs.length - 1;
      const a = (nuage.ys[j] - nuage.ys[i]) / (nuage.xs[j] - nuage.xs[i]);
      const b = nuage.ys[i] - a * nuage.xs[i];
      const ecrire = (p: number, q: number) =>
        `$y = ${fr(Math.round(p * 100) / 100)}x ${q >= 0 ? "+" : "-"} ${fr(Math.abs(Math.round(q * 100) / 100))}$`;
      return {
        text:
          `${amorce(nuage.serie)} On ajuste ce nuage par la droite passant par le premier et le dernier point, ` +
          `soit $(${nuage.xs[i]}\\,;\\,${nuage.ys[i]})$ et $(${nuage.xs[j]}\\,;\\,${nuage.ys[j]})$. ` +
          `Quelle est son équation ?`,
        format: "qcm",
        choices: makeChoices(ecrire(a, b), [
          ecrire(b, a),
          ecrire(-a, b),
          ecrire(a, -b),
          ecrire(a + 1, b),
          ecrire(a, b + 5),
        ]),
        expected: [ecrire(a, b)],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }),
        explanation: exp(
          "Une droite d'ajustement affine a pour équation $y = ax + b$ : on la détermine à partir de deux points.",
          "On calcule le coefficient directeur avec les deux points, puis l'ordonnée à l'origine en remplaçant dans l'équation.",
          `$a = \\dfrac{${nuage.ys[j]} - ${nuage.ys[i]}}{${nuage.xs[j]} - ${nuage.xs[i]}} = ${fr(Math.round(a * 100) / 100)}$, ` +
            `puis $b = ${nuage.ys[i]} - ${fr(Math.round(a * 100) / 100)} \\times ${nuage.xs[i]} = ${fr(Math.round(b * 100) / 100)}$.`,
          `L'équation est ${ecrire(a, b)}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — ce que le coefficient directeur VEUT DIRE, au lieu de le
    // calculer. Le premier item fait trouver l'équation ; celui-ci la donne et
    // demande de la lire dans la situation. C'est ce qui reste d'un ajustement
    // une fois l'exercice fini — « on gagne 5 k€ par année de plus » —, et le
    // distracteur multiplicatif est le pont avec le chapitre des évolutions :
    // un ajustement affine AJOUTE, il ne multiplie pas.
    kind: "template",
    id: "stmg_stat_equation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_equation",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient directeur dit de combien $y$ bouge quand $x$ avance d'UNE unité.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const s = nuage.serie;
      const bonne =
        `« ${s.y} » ${a > 0 ? "augmente" : "diminue"} d'environ $${Math.abs(a)}$ ${s.unite} ` +
        `chaque fois que « ${s.x} » augmente de $1$`;
      return {
        text:
          `${amorce(nuage.serie)} La droite d'ajustement de ce nuage a pour équation $y = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$. ` +
          `Que signifie le coefficient $${a}$ dans cette situation ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `« ${s.y} » est multiplié par $${a}$ chaque fois que « ${s.x} » augmente de $1$`,
          `« ${s.y} » vaut $${a}$ ${s.unite} quand « ${s.x} » vaut $0$`,
          `« ${s.y} » vaut $${a}$ ${s.unite} en moyenne sur la période`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${s.sujet}`, { a, b }),
        explanation: exp(
          "Dans un ajustement affine $y = ax + b$, le coefficient directeur $a$ est la variation de $y$ pour une augmentation d'UNE unité de $x$ — une variation ABSOLUE, qui s'ajoute.",
          "On fait avancer $x$ d'une unité et l'on regarde ce que devient $y$ : la différence vaut toujours $a$.",
          `Pour $x$ puis $x + 1$ : $a(x+1) + b - (ax + b) = ${a}$. ` +
            `« ${s.y} » ${a > 0 ? "gagne" : "perd"} donc $${Math.abs(a)}$ ${s.unite} par unité de « ${s.x} ». ` +
            `L'ordonnée à l'origine, elle, vaut $${b}$ : c'est la valeur estimée en $x = 0$.`,
          `Le coefficient $${a}$ dit que « ${s.y} » ${a > 0 ? "augmente" : "diminue"} de $${Math.abs(a)}$ ${s.unite} par unité.`
        ),
        choiceDiagnostics: [
          {
            choice: `« ${s.y} » est multiplié par $${a}$ chaque fois que « ${s.x} » augmente de $1$`,
            cause: "confond une évolution qui s'AJOUTE (modèle affine) avec une évolution qui MULTIPLIE (modèle exponentiel)",
          },
          {
            choice: `« ${s.y} » vaut $${a}$ ${s.unite} quand « ${s.x} » vaut $0$`,
            cause: `c'est le rôle de l'ordonnée à l'origine, qui vaut ici $${b}$`,
          },
        ],
      };
    },
  },

  {
    // ANGLE 3 — LA CALCULATRICE : la droite des moindres carrés, coefficients
    // arrondis au dixième. Le correcteur la calcule sur les données AFFICHÉES
    // (moindresCarres), jamais avec la droite qui a fabriqué le nuage.
    kind: "template",
    id: "stmg_stat_equation_tpl_3",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_equation",
    difficulty: 3,
    theme: "neutral",
    hint: "Calculatrice : mode statistiques à deux variables, saisis les deux listes, puis « régression linéaire » (ax + b).",
    tags: ["stmg", "maths", "statistiques", "canvas", "calculatrice", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 4 });
      const { xs, ys } = nuage;
      const mc = moindresCarres(xs, ys);
      const a = arrondi(mc.a, 1);
      const b = arrondi(mc.b, 1);
      const n = xs.length;
      const a2 = arrondi((ys[n - 1] - ys[0]) / (xs[n - 1] - xs[0]), 1);
      const b2 = arrondi(ys[0] - a2 * xs[0], 1);
      const bonne = equation(a, b);
      return {
        text:
          `${amorce(nuage.serie)} ` +
          pick([
            "À l'aide de la calculatrice, détermine une équation de la droite d'ajustement de $y$ en $x$ obtenue par la méthode des moindres carrés.",
            "Quelle est l'équation de la droite des moindres carrés de ce nuage, donnée par la calculatrice ?",
            "On ajuste le nuage par la méthode des moindres carrés, à la calculatrice. Quelle équation obtient-on ?",
          ]) +
          " (coefficients arrondis au dixième)",
        format: "qcm",
        choices: makeChoices(bonne, [equation(a2, b2), equation(b, a), equation(a, -b), equation(arrondi(a + 1.5, 1), b)]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableauNuage(nuage, `${nuage.serie.sujet} — relevés`),
        explanation: exp(
          "La droite des moindres carrés est la droite $y = ax + b$ qui rend minimale la somme des carrés des écarts verticaux. La calculatrice (ou le tableur) en donne les coefficients.",
          "On saisit les abscisses dans une liste, les ordonnées dans une autre, puis on lance la régression linéaire et l'on arrondit au dixième.",
          `Moyennes : $\\bar{x} = ${fr(arrondi(mc.mx, 3))}$ et $\\bar{y} = ${fr(arrondi(mc.my, 3))}$. La calculatrice affiche $a \\approx ${fr(arrondi(mc.a, 4))}$ et $b \\approx ${fr(arrondi(mc.b, 4))}$. ` +
            `La droite passant par le premier et le dernier point, ${equation(a2, b2)}, n'est PAS celle des moindres carrés : elle ignore les points du milieu.`,
          `La droite des moindres carrés a pour équation ${bonne}.`
        ),
        choiceDiagnostics: [
          { choice: equation(a2, b2), cause: "c'est la droite qui passe par le premier et le dernier point, pas celle des moindres carrés" },
          { choice: equation(b, a), cause: "a interverti le coefficient directeur et l'ordonnée à l'origine affichés par la calculatrice" },
        ],
      };
    },
  },

  {
    // ANGLE 4 — un coefficient à la fois, réponse libre au centième.
    kind: "template",
    id: "stmg_stat_equation_tpl_4",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_equation",
    difficulty: 3,
    theme: "neutral",
    hint: "Régression linéaire à la calculatrice : elle affiche $a$ (le coefficient directeur) et $b$ (l'ordonnée à l'origine).",
    tags: ["stmg", "maths", "statistiques", "canvas", "calculatrice", "template", "short"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 4 });
      const mc = moindresCarres(nuage.xs, nuage.ys);
      const quoi = pick(["a", "b"] as const);
      const v = quoi === "a" ? mc.a : mc.b;
      return {
        text:
          `${amorce(nuage.serie)} La droite d'ajustement de $y$ en $x$ par la méthode des moindres carrés a pour équation $y = ax + b$. ` +
          (quoi === "a"
            ? pick(["Donne la valeur du coefficient directeur $a$.", "Que vaut $a$, obtenu à la calculatrice ?"])
            : pick(["Donne la valeur de l'ordonnée à l'origine $b$.", "Que vaut $b$, obtenu à la calculatrice ?"])) +
          " (arrondi au centième)",
        format: "short",
        expected: avecTolerance(v, 2),
        comparator: "number_equal",
        canvas: canvasTableauNuage(nuage, `${nuage.serie.sujet} — relevés`),
        explanation: exp(
          "La droite des moindres carrés a pour coefficient directeur $a = \\dfrac{\\mathrm{cov}(x, y)}{V(x)}$ et passe par le point moyen $G(\\bar{x}\\,;\\,\\bar{y})$ ; la calculatrice fait ce calcul.",
          "On saisit les deux listes, on lance la régression linéaire, on lit le coefficient demandé et on l'arrondit au centième.",
          `$\\bar{x} = ${fr(arrondi(mc.mx, 3))}$, $\\bar{y} = ${fr(arrondi(mc.my, 3))}$ ; la calculatrice donne $a \\approx ${fr(arrondi(mc.a, 4))}$ et $b \\approx ${fr(arrondi(mc.b, 4))}$.`,
          `$${quoi} \\approx ${fr(arrondi(v, 2))}$ (un centième d'écart est accepté).`
        ),
      };
    },
  },

  /* ═══════════════════ statT_ajust_calculer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_ajust_calculer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "On remplace $x$ par la valeur demandée dans l'équation de la droite.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const x = randomInt(2, Math.max(...nuage.xs) - 1);
      const y = a * x + b;
      return {
        text:
          `${amorce(nuage.serie)} La droite d'ajustement de ce nuage a pour équation $y = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$. ` +
          `Quelle valeur de « ${nuage.serie.y} » prévoit-elle pour « ${nuage.serie.x} » $= ${x}$ ?`,
        format: "short",
        expected: [String(y)],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }, { x }),
        explanation: exp(
          "Une droite d'ajustement sert à estimer une valeur : on remplace $x$ par la valeur voulue dans son équation.",
          "On substitue, puis on calcule. Le résultat est une ESTIMATION, pas la valeur observée.",
          `$y = ${a} \\times ${x} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${y}$.`,
          `La droite prévoit $${y}$ ${nuage.serie.unite}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — remonter la droite au lieu de la descendre. Le premier item
    // donne $x$ et fait calculer $y$ ; celui-ci donne l'objectif et fait
    // chercher QUAND il sera atteint. C'est une équation à résoudre, pas une
    // substitution — et c'est la question que pose un tableau de bord.
    kind: "template",
    id: "stmg_stat_ajust_calculer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_ajustement",
    microId: "statT_ajust_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Il ne s'agit plus de remplacer $x$ : il faut résoudre $ax + b = $ la valeur visée.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      // On part d'un $x$ entier pour que la valeur visée tombe juste : la
      // question porte sur la méthode, pas sur un arrondi.
      const nuage = tirerNuage({ croissant: true, bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const x = randomInt(2, Math.max(...nuage.xs) + 3);
      const cible = a * x + b;
      return {
        text:
          `${amorce(nuage.serie)} La droite d'ajustement de ce nuage a pour équation $y = ${a}x + ${b}$. ` +
          `Pour quelle valeur de « ${nuage.serie.x} » le modèle prévoit-il ` +
          `« ${nuage.serie.y} » $= ${cible}$ ${nuage.serie.unite} ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }, { y: cible }),
        explanation: exp(
          "Une droite d'ajustement se lit dans les deux sens : donnée une valeur de $x$ elle prévoit $y$, et donnée une valeur visée de $y$ elle indique le $x$ correspondant.",
          "On écrit l'équation $ax + b = $ valeur visée, puis on la résout : on retire $b$ des deux côtés, et l'on divise par $a$.",
          `$${a}x + ${b} = ${cible}$, donc $${a}x = ${cible - b}$, donc $x = \\dfrac{${cible - b}}{${a}} = ${x}$.`,
          `Le modèle atteint $${cible}$ ${nuage.serie.unite} pour ${nuage.serie.x} $= ${x}$.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_interpoler ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_interpoler_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_interpoler",
    microId: "statT_interpoler",
    difficulty: 2,
    theme: "neutral",
    hint: "Interpoler, c'est estimer une valeur À L'INTÉRIEUR de l'intervalle observé.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const x = pick([1.5, 2.5, 3.5, 4.5] as const);
      const y = a * x + b;
      return {
        text:
          `${amorce(nuage.serie)} La droite d'ajustement a pour équation $y = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$, ` +
          `et les relevés vont de $${Math.min(...nuage.xs)}$ à $${Math.max(...nuage.xs)}$. ` +
          `Estime « ${nuage.serie.y} » pour « ${nuage.serie.x} » $= ${fr(x)}$.`,
        format: "short",
        expected: [fr(y)],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }, { x }),
        explanation: exp(
          "Interpoler, c'est estimer une valeur située à l'INTÉRIEUR de l'intervalle des données observées : l'ajustement y est le plus fiable.",
          "On applique l'équation de la droite à la valeur demandée.",
          `$${fr(x)}$ est bien compris entre $${Math.min(...nuage.xs)}$ et $${Math.max(...nuage.xs)}$. ` +
            `$y = ${a} \\times ${fr(x)} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${fr(y)}$.`,
          `L'estimation est $${fr(y)}$ ${nuage.serie.unite}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — NOMMER l'estimation avant de la faire. Le premier item calcule
    // une interpolation ; celui-ci demande, parmi quatre estimations, laquelle
    // en est une. Aucun calcul : seule compte la position par rapport à
    // l'intervalle observé — et c'est ce tri-là qui décide de la confiance
    // qu'on accorde au résultat.
    kind: "template",
    id: "stmg_stat_interpoler_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_interpoler",
    microId: "statT_interpoler",
    difficulty: 2,
    theme: "neutral",
    hint: "Interpoler, c'est rester ENTRE le premier et le dernier relevé. Tout le reste est une extrapolation.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 2 });
      const xMin = Math.min(...nuage.xs);
      const xMax = Math.max(...nuage.xs);
      const dedans = pick([1.5, 2.5, 3.5, 4.5] as const);
      const s = nuage.serie;
      const bonne = `« ${s.x} » $= ${fr(dedans)}$`;
      return {
        text:
          `${amorce(nuage.serie)} Les relevés vont de « ${s.x} » $= ${xMin}$ à « ${s.x} » $= ${xMax}$. ` +
          `Parmi ces quatre estimations, laquelle est une INTERPOLATION ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `« ${s.x} » $= ${xMax + 2}$`,
          `« ${s.x} » $= ${xMax + 6}$`,
          `« ${s.x} » $= 0$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${s.sujet} — relevés de ${xMin} à ${xMax}`, { a: nuage.a, b: nuage.b }),
        explanation: exp(
          "Interpoler, c'est estimer une valeur SITUÉE ENTRE les données observées ; extrapoler, c'est prolonger au-delà — avant le premier relevé comme après le dernier.",
          "On compare la valeur demandée aux bornes de l'intervalle observé, sans rien calculer.",
          `L'intervalle observé va de $${xMin}$ à $${xMax}$. ` +
            `Seul $${fr(dedans)}$ s'y trouve ; $${xMax + 2}$ et $${xMax + 6}$ sont au-delà du dernier relevé, et $0$ en deçà du premier.`,
          `L'interpolation est celle en « ${s.x} » $= ${fr(dedans)}$ — c'est aussi la plus fiable des quatre.`
        ),
        choiceDiagnostics: [
          {
            choice: `« ${s.x} » $= 0$`,
            cause: "avant le premier relevé, on extrapole aussi : l'extrapolation n'est pas seulement « plus loin »",
          },
        ],
      };
    },
  },

  /* ═══════════════════ statT_extrapoler ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_extrapoler_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_interpoler",
    microId: "statT_extrapoler",
    difficulty: 2,
    theme: "neutral",
    hint: "Extrapoler, c'est prolonger AU-DELÀ des données observées.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const nuage = tirerNuage({ croissant: true, bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const xMax = Math.max(...nuage.xs);
      const x = xMax + randomInt(2, 5);
      const y = a * x + b;
      return {
        text:
          `${amorce(nuage.serie)} La droite d'ajustement a pour équation $y = ${a}x + ${b}$, et les relevés s'arrêtent à « ${nuage.serie.x} » $= ${xMax}$. ` +
          `Que prévoit le modèle pour « ${nuage.serie.x} » $= ${x}$ ?`,
        format: "short",
        expected: [String(y)],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }, { x }),
        explanation: exp(
          "Extrapoler, c'est prolonger le modèle au-delà des valeurs observées. Le calcul est le même que pour une interpolation ; la CONFIANCE, elle, est moindre.",
          "On applique l'équation, puis on garde en tête que rien ne garantit que la tendance se poursuive.",
          `$y = ${a} \\times ${x} + ${b} = ${y}$, alors que les données s'arrêtent à $x = ${xMax}$.`,
          `Le modèle prévoit $${y}$ ${nuage.serie.unite} — sous réserve que la tendance se poursuive.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'extrapolation AU SEUIL. Le premier item demande la valeur
    // prévue pour un rang donné ; celui-ci demande à partir de quel rang un
    // objectif sera franchi. C'est une inéquation, et c'est la forme sous
    // laquelle une extrapolation sert vraiment : « quand aurons-nous dépassé
    // ce chiffre ? »
    kind: "template",
    id: "stmg_stat_extrapoler_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_interpoler",
    microId: "statT_extrapoler",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le premier rang ENTIER pour lequel la droite dépasse le seuil : résous, puis arrondis au-dessus.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const nuage = tirerNuage({ croissant: true, bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const xMax = Math.max(...nuage.xs);
      const x = xMax + randomInt(2, 6);
      // Seuil placé juste sous la valeur atteinte en x : le premier rang qui le
      // dépasse est donc exactement x (vrai dès que a > 1, ce qui est le cas).
      const seuil = a * x + b - 1;
      return {
        text:
          `${amorce(nuage.serie)} La droite d'ajustement a pour équation $y = ${a}x + ${b}$, et les relevés s'arrêtent à ` +
          `« ${nuage.serie.x} » $= ${xMax}$. À partir de quelle valeur ENTIÈRE de « ${nuage.serie.x} » ` +
          `le modèle prévoit-il de dépasser $${seuil}$ ${nuage.serie.unite} ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }, { y: seuil }),
        explanation: exp(
          "Chercher à partir de quand un seuil est franchi, c'est résoudre une inéquation : $ax + b > s$. Comme la variable compte des rangs, la réponse est le premier ENTIER qui convient.",
          "On résout l'inéquation, puis on prend l'entier immédiatement supérieur au résultat — et l'on note de combien on dépasse le dernier relevé.",
          `$${a}x + ${b} > ${seuil}$ donne $x > \\dfrac{${seuil - b}}{${a}}$, soit $x > ${fr(Math.round(((seuil - b) / a) * 100) / 100)}$. ` +
            `Le premier entier qui convient est $${x}$ — soit $${x - xMax}$ ${unites(x - xMax)} au-delà du dernier relevé.`,
          `Le seuil est dépassé à partir de ${nuage.serie.x} $= ${x}$, sous réserve que la tendance se poursuive.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_limites ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_limites_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_interpoler",
    microId: "statT_limites",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le premier entier pour lequel $ax + b$ devient strictement négatif : la grandeur ne peut pas valoir cela.",
    // ⛔ 21/10/2026 — c'était « Que penses-tu de cette prévision ? », corrigé
    // au mot-clé. Une question ouverte doit être PRÉCISE : un cas chiffré, une
    // réponse. La limite de l'extrapolation devient donc un NOMBRE — le rang à
    // partir duquel le modèle annonce l'impossible.
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const nuage = tirerNuage({ croissant: false, bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const xMax = Math.max(...nuage.xs);
      // Premier entier où a·x + b < 0 (a < 0) : si −b/a est entier, la droite y vaut 0, pas encore négatif.
      const xNeg = Math.floor(-b / a) + 1;
      const yNeg = a * xNeg + b;
      return {
        text:
          `${amorce(nuage.serie)} La droite d'ajustement de ce nuage décroissant a pour équation $y = ${a}x + ${b}$, ` +
          `et les relevés s'arrêtent à « ${nuage.serie.x} » $= ${xMax}$. ` +
          pick([
            `Le modèle cesse d'avoir un sens dès qu'il prévoit une valeur NÉGATIVE. À partir de quelle valeur entière de « ${nuage.serie.x} » est-ce le cas ?`,
            `« ${nuage.serie.y} » ne peut pas être négatif. À partir de quelle valeur entière de « ${nuage.serie.x} » la droite annonce-t-elle pourtant une valeur négative ?`,
          ]),
        format: "short",
        expected: [String(xNeg)],
        comparator: "number_equal",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }),
        explanation: exp(
          "Une extrapolation prolonge une tendance observée sur un intervalle limité : rien ne garantit qu'elle reste valable au-delà, et le résultat finit par devenir impossible.",
          "On résout $ax + b < 0$, puis on prend le premier entier qui convient.",
          `$${a}x + ${b} < 0$ donne $x > \\dfrac{${b}}{${-a}} \\approx ${fr(Math.round((-b / a) * 100) / 100)}$ : le premier entier est $${xNeg}$, ` +
            `où le modèle annonce $${yNeg}$ ${nuage.serie.unite} — soit $${xNeg - xMax}$ ${unites(xNeg - xMax)} au-delà du dernier relevé.`,
          `Dès « ${nuage.serie.x} » $= ${xNeg}$, la prévision est impossible : l'ajustement affine ne vaut plus si loin des données.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la même critique, mais À CHOISIR au lieu de la rédiger. Le
    // premier item est une question ouverte, jugée par mots-clés : robuste
    // quand l'élève écrit, muet quand il ne sait pas par où commencer. Celui-ci
    // met les quatre critiques possibles côte à côte, dont une seule tient.
    //
    // Les deux se complètent : l'ouverte fait produire, le QCM fait trier.
    kind: "template",
    id: "stmg_stat_limites_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_interpoler",
    microId: "statT_limites",
    difficulty: 3,
    theme: "neutral",
    hint: "Une prévision se juge d'abord sur ce qu'elle annonce : la grandeur peut-elle réellement valoir cela ?",
    tags: ["stmg", "maths", "statistiques", "canvas", "piege", "template"],
    generate: () => {
      const nuage = tirerNuage({ croissant: false, bruit: 2 });
      const a = nuage.a;
      const b = nuage.b;
      const xMax = Math.max(...nuage.xs);
      const x = Math.ceil((0 - b) / a) + randomInt(1, 4);
      const y = a * x + b;
      const bonne = `elle annonce $${y}$ ${nuage.serie.unite}, une valeur NÉGATIVE — impossible pour cette grandeur`;
      return {
        text:
          `${amorce(nuage.serie)} La droite d'ajustement de ce nuage décroissant a pour équation $y = ${a}x + ${b}$, ` +
          `et les relevés s'arrêtent à « ${nuage.serie.x} » $= ${xMax}$. ` +
          `Pour « ${nuage.serie.x} » $= ${x}$, elle prévoit $${y}$ ${nuage.serie.unite}. ` +
          `Pourquoi faut-il rejeter cette prévision ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "le calcul est faux : en refaisant la substitution, on trouve une valeur positive",
          `elle porte $${x - xMax}$ ${unites(x - xMax)} au-delà du dernier relevé, mais la valeur annoncée reste plausible`,
          "une droite d'ajustement ne sert jamais à faire des prévisions",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet}`, { a, b }),
        explanation: exp(
          "Un ajustement affine décrit une tendance observée sur un intervalle limité. Prolongé assez loin, il finit par annoncer des valeurs que la grandeur ne peut pas prendre — le modèle a cessé d'être valable bien avant.",
          "On confronte la valeur prévue à la réalité de la grandeur : peut-elle être négative ? dépasser un maximum ? Puis on regarde de combien on s'est éloigné des données.",
          `$y = ${a} \\times ${x} + ${b} = ${y}$ : le calcul est juste, mais $${nuage.serie.y}$ ne peut pas être négatif. ` +
            `L'extrapolation porte de plus sur $${x - xMax}$ ${unites(x - xMax)} au-delà du dernier relevé.`,
          `On rejette la prévision parce qu'elle est impossible, pas parce qu'elle est mal calculée.`
        ),
        choiceDiagnostics: [
          {
            choice: "le calcul est faux : en refaisant la substitution, on trouve une valeur positive",
            cause: "le calcul est juste — c'est le MODÈLE qui ne vaut plus si loin des données",
          },
          {
            choice: "une droite d'ajustement ne sert jamais à faire des prévisions",
            cause: "elle en fait de très bonnes à l'intérieur des données observées : c'est le prolongement lointain qui pose problème",
          },
        ],
      };
    },
  },

  /* ═══════════════════ statT_mc_principe ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_mc_principe_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_principe",
    difficulty: 2,
    theme: "neutral",
    hint: "On minimise la somme des CARRÉS des écarts verticaux entre les points et la droite.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 4 });
      return {
        text: `${amorce(nuage.serie)} Le nuage est ajusté par la méthode des moindres carrés. Que minimise la droite obtenue ?`,
        format: "qcm",
        choices: shuffle([
          "la somme des carrés des écarts verticaux entre les points et la droite",
          "la somme des écarts verticaux entre les points et la droite",
          "la distance entre le premier et le dernier point",
          "le nombre de points situés au-dessus de la droite",
        ]),
        expected: ["la somme des carrés des écarts verticaux entre les points et la droite"],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet} et sa droite d'ajustement`, { a: nuage.a, b: nuage.b }),
        explanation: exp(
          "La méthode des moindres carrés cherche la droite d'équation $y = ax + b$ qui rend minimale la somme $\\sum_i \\left(y_i - (ax_i + b)\\right)^2$.",
          "On élève les écarts au carré pour deux raisons : les écarts négatifs ne compensent plus les positifs, et les grands écarts pèsent davantage.",
          "Sans les carrés, une droite très mauvaise pourrait donner une somme nulle — les écarts au-dessus annulant ceux du dessous.",
          "La droite des moindres carrés minimise la somme des carrés des écarts verticaux."
        ),
        choiceDiagnostics: [
          {
            choice: "la somme des écarts verticaux entre les points et la droite",
            cause: "sans les carrés, les écarts de signes contraires se compensent et la somme ne mesure plus rien",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — POURQUOI les carrés, et non plus QUOI. Le premier item fait
    // reconnaître la quantité minimisée ; celui-ci demande à quoi sert
    // l'élévation au carré. C'est la seule chose à comprendre du critère —
    // « aucun développement théorique n'est attendu », dit le BO — et sans elle
    // la méthode reste une formule qu'on récite.
    kind: "template",
    id: "stmg_stat_mc_principe_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_principe",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi ce que donnerait la somme des écarts SANS les carrés, pour une droite qui coupe le nuage en deux.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 4 });
      const bonne =
        "pour que les écarts au-dessus et en dessous ne se compensent pas, et que les grands écarts pèsent davantage";
      return {
        text: `${amorce(nuage.serie)} L'ajustement retenu est celui des moindres carrés. Dans cette méthode, pourquoi élève-t-on les écarts au CARRÉ ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "pour que tous les écarts deviennent des nombres entiers",
          "pour simplifier les calculs : un carré se calcule plus vite qu'une valeur absolue",
          "pour forcer la droite à passer par l'origine du repère",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${nuage.serie.sujet} et sa droite d'ajustement`, { a: nuage.a, b: nuage.b }),
        explanation: exp(
          "Le critère des moindres carrés mesure la qualité d'un ajustement par $\\sum_i \\left(y_i - (ax_i + b)\\right)^2$. Le carré y joue deux rôles à la fois.",
          "On regarde ce que deviendrait la somme sans les carrés : un point $3$ au-dessus et un point $3$ en dessous donneraient $+3$ et $-3$, donc une somme nulle — une droite très mauvaise passerait pour parfaite.",
          "Le carré rend d'abord tous les termes positifs, si bien que rien ne se compense. Il donne ensuite plus de poids aux grands écarts : un écart de $4$ compte $16$, quatre écarts de $1$ ne comptent que $4$. La droite retenue évite donc les gros ratés.",
          "On élève au carré pour empêcher les compensations et pour pénaliser les grands écarts."
        ),
        choiceDiagnostics: [
          {
            choice: "pour que tous les écarts deviennent des nombres entiers",
            cause: "les écarts sont déjà ce qu'ils sont : le carré ne change pas leur nature, il change leur POIDS",
          },
          {
            choice: "pour forcer la droite à passer par l'origine du repère",
            cause: "rien n'oblige une droite d'ajustement à passer par l'origine — son ordonnée à l'origine est justement libre",
          },
        ],
      };
    },
  },

  {
    // ANGLE 3 — le POINT MOYEN : la droite des moindres carrés passe toujours
    // par G(x̄ ; ȳ). C'est la seule propriété du critère qu'on utilise à la
    // main en STMG.
    kind: "template",
    id: "stmg_stat_mc_principe_tpl_3",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_principe",
    difficulty: 2,
    theme: "neutral",
    hint: "Le point moyen a pour abscisse la moyenne des $x_i$ et pour ordonnée la moyenne des $y_i$.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const nuage = tirerNuage({ bruit: 4 });
      const { xs, ys } = nuage;
      const n = xs.length;
      const mx = arrondi(xs.reduce((s, v) => s + v, 0) / n, 1);
      const my = arrondi(ys.reduce((s, v) => s + v, 0) / n, 1);
      const pt = (u: number, v: number) => `$G(${fr(u)}\\,;\\,${fr(v)})$`;
      const bonne = pt(mx, my);
      const milieu = arrondi((ys[0] + ys[n - 1]) / 2, 1);
      return {
        text:
          `${amorce(nuage.serie)} La droite des moindres carrés passe par le point moyen $G$ du nuage. ` +
          pick(["Quelles sont les coordonnées de $G$ ?", "Où se trouve ce point $G$ ?", "Quel est ce point moyen ?"]) +
          " (coordonnées arrondies au dixième)",
        format: "qcm",
        choices: makeChoices(bonne, [pt(my, mx), pt(mx, milieu), pt(n, my), pt(mx, arrondi(my + nuage.a, 1))]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableauNuage(nuage, `${nuage.serie.sujet} — relevés`),
        explanation: exp(
          "Le point moyen d'un nuage est $G(\\bar{x}\\,;\\,\\bar{y})$. La droite des moindres carrés passe TOUJOURS par lui.",
          "On fait la moyenne des abscisses, puis celle des ordonnées.",
          `$\\bar{x} = \\dfrac{${xs.join(" + ")}}{${n}} = ${fr(mx)}$ et $\\bar{y} = \\dfrac{${ys.join(" + ")}}{${n}} \\approx ${fr(my)}$.`,
          `Le point moyen est ${bonne}.`
        ),
        choiceDiagnostics: [
          { choice: pt(my, mx), cause: "a interverti abscisse et ordonnée" },
          { choice: pt(mx, milieu), cause: "a pris le milieu du premier et du dernier relevé au lieu de la moyenne de tous" },
        ],
      };
    },
  },

  /* ═══════════════════ statT_mc_calculer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_mc_calculer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour chaque point : on calcule l'écart à la droite, on l'élève au carré, puis on additionne.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      // Un petit nuage à quatre points, pour que la somme se calcule à la main.
      const serie = tirerContexte(true);
      const a = pick([2, 3, 4, 5] as const);
      const b = randomInt(10, 30);
      const xs = [1, 2, 3, 4];
      const ecarts = [randomInt(-2, 2), randomInt(-2, 2), randomInt(-2, 2), randomInt(-2, 2)];
      const ys = xs.map((x, k) => a * x + b + ecarts[k]);
      const nuage: Nuage = { serie, xs, ys, a, b };
      const somme = ecarts.reduce((s, e) => s + e * e, 0);
      return {
        text:
          `${amorce(nuage.serie)} Pour la droite d'équation $y = ${a}x + ${b}$, calcule la somme des carrés des écarts ` +
          `$\\sum \\left(y_i - (${a}x_i + ${b})\\right)^2$ sur les quatre points du nuage.`,
        format: "short",
        expected: [String(somme)],
        comparator: "number_equal",
        canvas: canvasTableauNuage(nuage, `${serie.sujet} — quatre relevés`),
        explanation: exp(
          "La somme des carrés des écarts mesure la qualité d'un ajustement : plus elle est petite, mieux la droite épouse le nuage.",
          "Pour chaque point, on calcule la valeur prévue par la droite, l'écart avec la valeur observée, puis son carré ; on additionne le tout.",
          xs
            .map(
              (x, k) =>
                `$x = ${x}$ : prévu $${a * x + b}$, observé $${ys[k]}$, écart $${ecarts[k]}$, carré $${ecarts[k] * ecarts[k]}$`
            )
            .join(" ; ") + `. Somme : $${somme}$.`,
          `La somme des carrés des écarts vaut $${somme}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — repérer le point qui COÛTE le plus, au lieu de faire la somme.
    // Le premier item additionne les quatre carrés ; celui-ci demande lequel
    // pèse le plus lourd. C'est la lecture d'un statisticien : la somme dit
    // que l'ajustement est moyen, le point aberrant dit POURQUOI.
    kind: "template",
    id: "stmg_stat_mc_calculer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point qui pèse le plus est celui dont l'écart à la droite est le plus grand EN VALEUR ABSOLUE — au-dessus comme en dessous.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const serie = tirerContexte(true);
      const a = pick([2, 3, 4, 5] as const);
      const b = randomInt(10, 30);
      const xs = [1, 2, 3, 4];
      // Un écart nettement plus grand que les autres, et UN SEUL : sinon deux
      // points pèsent autant et le QCM a deux bonnes réponses.
      const k = randomInt(0, 3);
      const gros = pick([5, 6, 7, -5, -6, -7] as const);
      const ecarts = xs.map((_, i) => (i === k ? gros : randomInt(-2, 2)));
      const ys = xs.map((x, i) => a * x + b + ecarts[i]);
      const nuage: Nuage = { serie, xs, ys, a, b };
      const bonne = `le point d'abscisse $${xs[k]}$`;
      return {
        text:
          `${amorce(nuage.serie)} Pour la droite d'équation $y = ${a}x + ${b}$, quel point du nuage contribue LE PLUS ` +
          `à la somme des carrés des écarts ?`,
        format: "qcm",
        choices: makeChoices(
          bonne,
          xs.filter((_, i) => i !== k).map((x) => `le point d'abscisse $${x}$`)
        ),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableauNuage(nuage, `${serie.sujet} — quatre relevés`),
        explanation: exp(
          "Chaque point apporte à la somme le CARRÉ de son écart à la droite. Un point deux fois plus éloigné pèse donc quatre fois plus.",
          "Pour chaque point : on calcule la valeur prévue, l'écart avec la valeur observée, puis son carré ; on compare les quatre carrés.",
          xs
            .map(
              (x, i) =>
                `$x = ${x}$ : prévu $${a * x + b}$, observé $${ys[i]}$, écart $${ecarts[i]}$, carré $${ecarts[i] * ecarts[i]}$`
            )
            .join(" ; ") +
            `. Le plus lourd est $${gros * gros}$, pour $x = ${xs[k]}$.`,
          `C'est le point d'abscisse $${xs[k]}$ qui pèse le plus, avec un carré de $${gros * gros}$.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_mc_comparer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_mc_comparer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "La meilleure droite est celle dont la somme des carrés des écarts est la PLUS PETITE.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const serie = tirerContexte(true);
      const a = pick([3, 4, 5, 6] as const);
      const b = randomInt(10, 30);
      const xs = [1, 2, 3, 4, 5];
      const ecarts = xs.map(() => randomInt(-2, 2));
      const ys = xs.map((x, k) => a * x + b + ecarts[k]);
      const nuage: Nuage = { serie, xs, ys, a, b };
      const sommeA = ecarts.reduce((s, e) => s + e * e, 0);
      const decalage = pick([3, 4, 5] as const);
      const sommeB = xs.reduce((s, x, k) => {
        const e = ys[k] - (a * x + b + decalage);
        return s + e * e;
      }, 0);
      return {
        text:
          `${amorce(nuage.serie)} Deux droites sont proposées pour ce nuage : $D_1 : y = ${a}x + ${b}$ et $D_2 : y = ${a}x + ${b + decalage}$. ` +
          `Laquelle ajuste le mieux le nuage ?`,
        format: "qcm",
        choices: shuffle([
          `$D_1$, dont la somme des carrés des écarts vaut $${sommeA}$`,
          `$D_2$, dont la somme des carrés des écarts vaut $${sommeB}$`,
          "les deux ajustent aussi bien",
          "on ne peut pas comparer deux droites parallèles",
        ]),
        expected: [`$D_1$, dont la somme des carrés des écarts vaut $${sommeA}$`],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${serie.sujet} — deux ajustements possibles`, { a, b }),
        explanation: exp(
          "Comparer deux ajustements, c'est comparer leurs sommes de carrés d'écarts : la plus petite désigne le meilleur.",
          "On calcule la somme pour chaque droite, puis on compare — les deux droites étant parallèles, seule leur hauteur diffère.",
          `$D_1$ donne $${sommeA}$ ; $D_2$, décalée de $${decalage}$ vers le haut, donne $${sommeB}$.`,
          `C'est $D_1$ qui ajuste le mieux le nuage.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas comparer deux droites parallèles",
            cause: "deux droites parallèles n'ont pas la même hauteur : leurs écarts au nuage diffèrent",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — ce qu'un point ABERRANT fait au critère. Le premier item
    // compare deux droites sur un même nuage ; celui-ci garde la droite et
    // change le nuage, en y ajoutant un relevé très éloigné. La somme des
    // carrés bondit — c'est la contrepartie du carré vue à l'œuvre, et c'est
    // pourquoi un relevé douteux se discute avant de se calculer.
    kind: "template",
    id: "stmg_stat_mc_comparer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Un écart de $2$ apporte $4$ ; un écart de $20$ en apporte $400$.",
    tags: ["stmg", "maths", "statistiques", "canvas", "piege", "template"],
    generate: () => {
      const serie = tirerContexte(true);
      const a = pick([3, 4, 5, 6] as const);
      const b = randomInt(10, 30);
      const xs = [1, 2, 3, 4, 5];
      const ecarts = xs.map(() => randomInt(-2, 2));
      const ys = xs.map((x, k) => a * x + b + ecarts[k]);
      const sommeAvant = ecarts.reduce((s, e) => s + e * e, 0);
      const ecartAberrant = pick([18, 20, 22, 25] as const);
      const xNouveau = 6;
      const yNouveau = a * xNouveau + b + ecartAberrant;
      const sommeApres = sommeAvant + ecartAberrant * ecartAberrant;
      const nuage: Nuage = {
        serie,
        xs: [...xs, xNouveau],
        ys: [...ys, yNouveau],
        a,
        b,
      };
      const bonne = `elle augmente fortement : elle passe de $${sommeAvant}$ à $${sommeApres}$`;
      return {
        text:
          `${amorce(nuage.serie)} Pour la droite $y = ${a}x + ${b}$, la somme des carrés des écarts valait $${sommeAvant}$ sur les cinq premiers relevés. ` +
          `On ajoute un sixième relevé, très éloigné de la droite. Que devient cette somme ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "elle ne change pas : un seul point ne pèse rien sur six",
          `elle diminue, car le nuage compte maintenant plus de points`,
          "elle peut devenir négative si le point est au-dessous de la droite",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuage, `${serie.sujet} — un relevé s'écarte`, { a, b }),
        explanation: exp(
          "La somme des carrés des écarts additionne un terme positif par point : ajouter un relevé ne peut que la faire croître, et un relevé éloigné la fait croître énormément.",
          "On calcule le carré de l'écart du nouveau point et on l'ajoute à la somme précédente.",
          `Le nouveau point s'écarte de $${ecartAberrant}$ de la droite, ce qui apporte $${ecartAberrant} \\times ${ecartAberrant} = ${ecartAberrant * ecartAberrant}$ ` +
            `à lui seul — bien plus que les cinq autres réunis ($${sommeAvant}$). La somme passe à $${sommeApres}$.`,
          `Elle augmente fortement : $${sommeAvant}$ devient $${sommeApres}$. Un point aberrant pèse très lourd sur ce critère.`
        ),
        choiceDiagnostics: [
          {
            choice: "elle peut devenir négative si le point est au-dessous de la droite",
            cause: "un carré n'est jamais négatif : c'est justement à cela qu'il sert",
          },
          {
            choice: "elle ne change pas : un seul point ne pèse rien sur six",
            cause: "au contraire, c'est le point le plus éloigné qui pèse le plus lourd",
          },
        ],
      };
    },
  },


  {
    // ANGLE 3 — la droite des moindres carrés CONTRE la droite des extrêmes :
    // l'élève calcule les deux sommes (tableur ou calculatrice). La bonne
    // réponse est décidée par les sommes CALCULÉES, avec les coefficients
    // arrondis affichés — jamais supposée.
    kind: "template",
    id: "stmg_stat_mc_comparer_tpl_3",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_moindres_carres",
    microId: "statT_mc_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour chaque droite : écart de chaque point, au carré, puis la somme. La plus petite somme désigne le meilleur ajustement.",
    tags: ["stmg", "maths", "statistiques", "canvas", "tableur", "template"],
    generate: () => {
      let nuage = tirerNuage({ bruit: 4 });
      let d1 = { a: 0, b: 0 };
      let d2 = { a: 0, b: 0 };
      let s1 = 0;
      let s2 = 0;
      for (let essai = 0; essai < 40; essai++) {
        const mc = moindresCarres(nuage.xs, nuage.ys);
        const n = nuage.xs.length;
        d1 = { a: arrondi(mc.a, 1), b: arrondi(mc.b, 1) };
        const a2 = Math.round((nuage.ys[n - 1] - nuage.ys[0]) / (n - 1));
        d2 = { a: a2, b: nuage.ys[0] - a2 };
        s1 = arrondi(sce(nuage.xs, nuage.ys, d1.a, d1.b), 2);
        s2 = arrondi(sce(nuage.xs, nuage.ys, d2.a, d2.b), 2);
        // Un écart franc entre les deux sommes : sinon la question est un pari d'arrondi.
        if (Math.abs(s1 - s2) >= 3) break;
        nuage = tirerNuage({ bruit: 4 });
      }
      const meilleure = s1 < s2 ? "$D_1$" : "$D_2$";
      const autre = s1 < s2 ? "$D_2$" : "$D_1$";
      const bonne = `${meilleure} : sa somme des carrés des écarts est la plus petite`;
      return {
        text:
          `${amorce(nuage.serie)} Deux ajustements sont proposés : $D_1$ : ${equation(d1.a, d1.b)} ` +
          `et $D_2$ : ${equation(d2.a, d2.b)}. ` +
          pick([
            "Lequel est le meilleur au sens des moindres carrés ?",
            "En calculant la somme des carrés des écarts de chacune, laquelle retenir ?",
          ]),
        format: "qcm",
        choices: makeChoices(bonne, [
          `${autre} : sa somme des carrés des écarts est la plus petite`,
          "$D_2$ : elle passe exactement par deux points du nuage",
          "aucune : deux droites qui traversent le nuage se valent toujours",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableauNuage(nuage, `${nuage.serie.sujet} — relevés`),
        explanation: exp(
          "Au sens des moindres carrés, le meilleur ajustement est celui dont la somme $\\sum (y_i - (ax_i + b))^2$ est la plus PETITE.",
          "Pour chaque droite, on calcule la valeur prévue en chaque $x_i$, l'écart avec $y_i$, son carré, puis la somme (un tableur le fait en une colonne).",
          `$D_1$ donne une somme d'environ $${fr(s1)}$ ; $D_2$, la droite qui joint le premier et le dernier relevé, environ $${fr(s2)}$.`,
          `On retient ${meilleure}. Passer par deux points du nuage ne garantit rien : les autres points comptent aussi.`
        ),
        choiceDiagnostics: [
          { choice: "$D_2$ : elle passe exactement par deux points du nuage", cause: "passer par deux points ne dit rien des écarts aux autres points" },
        ],
      };
    },
  },

  /* ═══════════════════ statT_cv_appliquer ═══════════════════ */

  {
    // z = log(y) sur des relevés RÉELS — plus des puissances exactes de 2 —,
    // donc à la calculatrice. Arrondi au centième annoncé, un cran toléré.
    kind: "template",
    id: "stmg_stat_cv_appliquer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_appliquer",
    difficulty: 3,
    theme: "neutral",
    hint: "On applique la transformation à la valeur de $y$ de la colonne demandée : touche « log » de la calculatrice.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const { s, xs, ys } = tirerCV("expo");
      const k = randomInt(0, xs.length - 1);
      const z = Math.log10(ys[k]);
      const question = pick([
        `Quelle est la valeur de $z$ pour « ${s.x} » $= ${xs[k]}$ ?`,
        `Complète la case manquante de la ligne $z$, colonne « $${xs[k]}$ ».`,
        `Que vaut $z$ lorsque « ${s.y} » vaut $${ys[k]}$ ?`,
      ]);
      return {
        text:
          `${amorceCV(s)} Le nuage n'est pas aligné : on pose $z = \\log(y)$ pour le linéariser. ` +
          `${question} (arrondi au centième)`,
        format: "short",
        expected: avecTolerance(z, 2),
        comparator: "number_equal",
        canvas: canvasTableauCV(s, xs, ys, `${s.sujet} — données et variable z`, {
          label: "z = log(y)",
          values: xs.map((_, i) => (i === k ? "?" : fr(arrondi(Math.log10(ys[i]), 2)))),
        }),
        explanation: exp(
          "Un changement de variable remplace une variable par une fonction d'elle-même pour rendre le nuage aligné. Ici on transforme les ORDONNÉES par le logarithme décimal.",
          "On prend la valeur de $y$ de la colonne, puis on calcule son logarithme décimal à la calculatrice ; on arrondit au centième.",
          `Pour « ${s.x} » $= ${xs[k]}$ : $y = ${ys[k]}$, donc $z = \\log(${ys[k]}) \\approx ${fr(arrondi(z, 3))}$.`,
          `$z \\approx ${fr(arrondi(z, 2))}$ (une réponse à un centième près est acceptée).`
        ),
      };
    },
  },

  {
    // ANGLE 2 — CHOISIR la transformation d'après le MODÈLE, pour les trois
    // familles que cite le BO : log(y), 1/x, x². Se tromper de transformation
    // ne linéarise rien.
    kind: "template",
    id: "stmg_stat_cv_appliquer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_appliquer",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde ce qui empêche le modèle d'être affine : une puissance, un quotient, un carré. C'est cette partie-là qu'on renomme.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const famille = pick(["expo", "inverse", "carre"] as const);
      const { s, xs, ys } = tirerCV(famille);
      const LOG = "$z = \\log(y)$ — on transforme les ORDONNÉES";
      const INV = "$z = \\dfrac{1}{x}$ — on prend l'inverse des ABSCISSES";
      const CAR = "$u = x^2$ — on élève les ABSCISSES au carré";
      const bonne = famille === "expo" ? LOG : famille === "inverse" ? INV : CAR;
      const modele =
        famille === "expo" ? "$y = c \\times q^{x}$" : famille === "inverse" ? "$y = \\dfrac{a}{x} + b$" : "$y = ax^2 + b$";
      const justif =
        famille === "expo"
          ? "le logarithme transforme le produit $c \\times q^x$ en somme : $\\log(y) = \\log(c) + x\\log(q)$, affine en $x$"
          : famille === "inverse"
            ? "en posant $z = \\dfrac{1}{x}$, le modèle devient $y = az + b$, affine en $z$"
            : "en posant $u = x^2$, le modèle devient $y = au + b$, affine en $u$";
      return {
        text:
          `${amorceCV(s)} Le nuage n'est pas aligné ; la situation suggère un modèle de la forme ${modele}. ` +
          pick([
            "Quel changement de variable rend le nuage aligné ?",
            "Quelle transformation permet d'utiliser ensuite un ajustement affine ?",
            "Quelle nouvelle variable faut-il poser ?",
          ]),
        format: "qcm",
        choices: makeChoices(bonne, [LOG, INV, CAR, "$z = y^2$ — on élève les ORDONNÉES au carré"]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(nuageCV(s, xs, ys), `${s.sujet} — nuage non aligné`),
        explanation: exp(
          "Un changement de variable remplace l'une des variables par une fonction d'elle-même pour rendre le nuage aligné. Le choix dépend de la FORME du modèle.",
          "On cherche la partie du modèle qui n'est pas affine, et on lui donne un nom : le modèle devient alors affine en la nouvelle variable.",
          `Pour ${modele}, ${justif}.`,
          `Il faut poser ${bonne.split(" — ")[0]}.`
        ),
      };
    },
  },

  {
    // ANGLE 3 — z = 1/x : le coût fixe qui se partage. Les abscisses choisies
    // (1, 2, 4, 5, 8, 10) donnent des inverses DÉCIMAUX exacts : pas d'arrondi.
    kind: "template",
    id: "stmg_stat_cv_appliquer_tpl_3",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_appliquer",
    difficulty: 3,
    theme: "neutral",
    hint: "$z = \\dfrac{1}{x}$ : on divise $1$ par l'abscisse de la colonne. Ce sont les ABSCISSES qu'on transforme.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const { s, xs, ys } = tirerCV("inverse");
      const k = randomInt(1, xs.length - 1);
      const z = 1 / xs[k];
      return {
        text:
          `${amorceCV(s)} Pour linéariser le nuage, on pose $z = \\dfrac{1}{x}$. ` +
          pick([
            `Quelle valeur de $z$ correspond à « ${s.x} » $= ${xs[k]}$ ?`,
            `Complète la case manquante de la ligne $z$, colonne « $${xs[k]}$ ».`,
            `Que vaut $z$ pour la colonne où « ${s.y} » vaut $${fr(ys[k])}$ ?`,
          ]) +
          ` (valeur exacte)`,
        format: "short",
        expected: [fr(z)],
        comparator: "number_equal",
        canvas: canvasTableauCV(s, xs, ys, `${s.sujet} — données et variable z`, {
          label: "z = 1/x",
          values: xs.map((x, i) => (i === k ? "?" : fr(1 / x))),
        }),
        explanation: exp(
          "Quand une grandeur se partage — un coût fixe entre des unités, un travail entre des personnes —, elle varie comme $\\dfrac{1}{x}$. En posant $z = \\dfrac{1}{x}$, le nuage $(z\\,;\\,y)$ devient aligné.",
          "On prend l'abscisse de la colonne et l'on calcule son inverse.",
          `$z = \\dfrac{1}{${xs[k]}} = ${fr(z)}$.`,
          `$z = ${fr(z)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 4 — u = x² : la distance de freinage, le prix d'une surface.
    kind: "template",
    id: "stmg_stat_cv_appliquer_tpl_4",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_appliquer",
    difficulty: 2,
    theme: "neutral",
    hint: "$u = x^2$ : on multiplie l'abscisse par elle-même.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const { s, xs, ys } = tirerCV("carre");
      // Une abscisse décimale de temps en temps : 2,5² = 6,25 se calcule, et
      // « 2,5 × 2 » est l'erreur qu'on veut voir.
      const decimale = Math.random() < 0.4;
      const k = randomInt(0, xs.length - 1);
      const x = decimale ? xs[k] + 0.5 : xs[k];
      const u = arrondi(x * x, 2);
      return {
        text:
          `${amorceCV(s)} Pour linéariser le nuage, on pose $u = x^2$. ` +
          pick([
            `Quelle valeur de $u$ correspond à « ${s.x} » $= ${fr(x)}$ ?`,
            `Calcule $u$ pour « ${s.x} » $= ${fr(x)}$.`,
            `Un nouveau relevé est fait pour « ${s.x} » $= ${fr(x)}$. Quelle est sa valeur de $u$ ?`,
          ]),
        format: "short",
        expected: [fr(u)],
        comparator: "number_equal",
        canvas: canvasTableauCV(s, xs, ys, `${s.sujet} — données`, {
          label: "u = x²",
          values: xs.map((v) => fr(v * v)),
        }),
        explanation: exp(
          "Quand une grandeur croît comme un CARRÉ — la distance de freinage avec la vitesse, une surface avec un côté —, le nuage $(x\\,;\\,y)$ est courbe et le nuage $(x^2\\,;\\,y)$ aligné.",
          "On élève l'abscisse au carré : $x^2 = x \\times x$, et non $2 \\times x$.",
          `$u = ${fr(x)}^2 = ${fr(x)} \\times ${fr(x)} = ${fr(u)}$.`,
          `$u = ${fr(u)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_cv_lire ═══════════════════ */

  {
    // Le nuage TRANSFORMÉ est aligné : quelle relation entre les variables
    // initiales ? Trois familles, une seule bonne lecture à chaque fois.
    kind: "template",
    id: "stmg_stat_cv_lire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Si le nuage transformé est aligné, c'est la NOUVELLE variable qui est affine — pas la relation de départ.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const famille = pick(["expo", "inverse", "carre"] as const);
      const { s, xs, ys } = tirerCV(famille);
      const EXPO = "« y » est une fonction exponentielle de « x » : $y = c \\times q^{x}$";
      const AFF = "« y » est une fonction affine de « x » : $y = ax + b$";
      const INV = "« y » est de la forme $y = \\dfrac{a}{x} + b$";
      const CAR = "« y » est de la forme $y = ax^2 + b$";
      const bonne = famille === "expo" ? EXPO : famille === "inverse" ? INV : CAR;
      const transfo =
        famille === "expo"
          ? "$z = \\log(y)$, le nuage $(x\\,;\\,z)$"
          : famille === "inverse"
            ? "$z = \\dfrac{1}{x}$, le nuage $(z\\,;\\,y)$"
            : "$u = x^2$, le nuage $(u\\,;\\,y)$";
      const px = famille === "expo" ? xs : famille === "inverse" ? xs.map((x) => 1 / x) : xs.map((x) => x * x);
      const py = famille === "expo" ? ys.map((y) => arrondi(Math.log10(y), 2)) : ys;
      return {
        text:
          `${amorceCV(s)} Après le changement de variable ${transfo} apparaît aligné. ` +
          pick([
            "Que peut-on en conclure sur la relation entre « x » et « y » ?",
            "Quel modèle relie alors les deux variables de départ ?",
            "Quelle relation entre « x » et « y » peut-on conjecturer ?",
          ]),
        format: "qcm",
        choices: makeChoices(bonne, [EXPO, AFF, INV, CAR]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuagePoints(px, py, `Nuage transformé — ${s.sujet}`),
        explanation: exp(
          "Un nuage transformé aligné signifie que la relation est AFFINE entre les variables transformées. On remonte ensuite à la relation de départ en défaisant la transformation.",
          "On écrit la relation affine avec la nouvelle variable, puis on y remplace la nouvelle variable par sa définition.",
          famille === "expo"
            ? "$\\log(y) = ax + b$ donne $y = 10^{ax+b} = 10^{b} \\times (10^{a})^{x}$ : une exponentielle de raison $q = 10^a$."
            : famille === "inverse"
              ? "$y = az + b$ avec $z = \\dfrac{1}{x}$ donne $y = \\dfrac{a}{x} + b$."
              : "$y = au + b$ avec $u = x^2$ donne $y = ax^2 + b$.",
          `${bonne.charAt(0).toUpperCase()}${bonne.slice(1)}. La relation entre « x » et « y », elle, n'est PAS affine.`
        ),
        choiceDiagnostics: [
          { choice: AFF, cause: "c'est la relation avec la variable TRANSFORMÉE qui est affine, pas la relation de départ" },
        ],
      };
    },
  },

  {
    // ANGLE 2 — le facteur caché dans la pente, sur un VRAI ajustement : la
    // droite des moindres carrés du nuage (x ; log y) est calculée sur les
    // données affichées, coefficients arrondis au millième.
    kind: "template",
    id: "stmg_stat_cv_lire_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Si $\\log(y) = ax + b$, alors $y = 10^{ax+b}$ : quand $x$ avance de $1$, $y$ est multiplié par $10^a$.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const { s, xs, ys } = tirerCV("expo");
      const zs = ys.map((y) => Math.log10(y));
      const mc = moindresCarres(xs, zs);
      const a = arrondi(mc.a, 3);
      const b = arrondi(mc.b, 3);
      const facteur = 10 ** a;
      const evolution = pick([true, false]);
      const cible = evolution ? (facteur - 1) * 100 : facteur;
      return {
        text:
          `${amorceCV(s)} On pose $z = \\log(y)$ ; la droite des moindres carrés du nuage $(x\\,;\\,z)$ a pour équation ` +
          `$z = ${fr(a)}x ${b >= 0 ? "+" : "-"} ${fr(Math.abs(b))}$ (coefficients arrondis au millième). ` +
          (evolution
            ? `D'après ce modèle, de quel pourcentage « ${s.y} » augmente-t-il chaque fois que « ${s.x} » augmente de $1$ ? (arrondi à l'unité)`
            : `Par quel facteur « ${s.y} » est-il multiplié chaque fois que « ${s.x} » augmente de $1$ ? (arrondi au centième)`),
        format: "short",
        expected: avecTolerance(cible, evolution ? 0 : 2),
        comparator: "number_equal",
        canvas: canvasNuagePoints(xs, zs.map((z) => arrondi(z, 2)), `Nuage (x ; z = log y) et son ajustement`, { a, b }),
        explanation: exp(
          "Si $\\log(y)$ est une fonction affine de $x$, alors $y = 10^{ax+b}$ : quand $x$ augmente de $1$, $y$ est MULTIPLIÉ par $10^{a}$.",
          "On forme le quotient de deux valeurs consécutives : $\\dfrac{10^{a(x+1)+b}}{10^{ax+b}} = 10^{a}$. Puis, si l'on veut un pourcentage, $t = 10^{a} - 1$.",
          `$10^{${fr(a)}} \\approx ${fr(arrondi(facteur, 4))}$` +
            (evolution ? `, soit une hausse d'environ $${fr(arrondi(cible, 1))}\\,\\%$ à chaque pas.` : "."),
          evolution
            ? `« ${s.y} » augmente d'environ $${fr(arrondi(cible, 0))}\\,\\%$ par unité de « ${s.x} ».`
            : `« ${s.y} » est multiplié par environ $${fr(arrondi(facteur, 2))}$ par unité de « ${s.x} ».`
        ),
      };
    },
  },

  {
    // ANGLE 3 — z = 1/x : ce que dit la constante quand x devient grand.
    kind: "template",
    id: "stmg_stat_cv_lire_tpl_3",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand $x$ devient très grand, $z = \\dfrac{1}{x}$ se rapproche de $0$ : que reste-t-il de $y = az + b$ ?",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const { s, xs, ys } = tirerCV("inverse");
      const mc = moindresCarres(xs.map((x) => 1 / x), ys);
      const a = arrondi(mc.a, 1);
      const b = arrondi(mc.b, 1);
      return {
        text:
          `${amorceCV(s)} Avec $z = \\dfrac{1}{x}$, le nuage $(z\\,;\\,y)$ est aligné et s'ajuste par $y = ${fr(a)}z ${b >= 0 ? "+" : "-"} ${fr(Math.abs(b))}$. ` +
          pick([
            `Vers quelle valeur « ${s.y} » se rapproche-t-il quand « ${s.x} » devient très grand ?`,
            `Quand « ${s.x} » devient très grand, de quelle valeur « ${s.y} » s'approche-t-il d'après ce modèle ?`,
          ]),
        format: "short",
        expected: [fr(b)],
        comparator: "number_equal",
        canvas: canvasNuagePoints(xs.map((x) => 1 / x), ys, `Nuage (z = 1/x ; y) — ${s.sujet}`, { a, b }),
        explanation: exp(
          "Le modèle $y = \\dfrac{a}{x} + b$ décrit une part qui se PARTAGE ($\\dfrac{a}{x}$) et une part fixe par unité ($b$).",
          "Quand $x$ devient très grand, $z = \\dfrac{1}{x}$ tend vers $0$, donc $az$ aussi : il ne reste que $b$.",
          `$y = ${fr(a)} \\times \\dfrac{1}{x} ${b >= 0 ? "+" : "-"} ${fr(Math.abs(b))}$ ; pour $x$ très grand, $\\dfrac{${fr(a)}}{x}$ devient négligeable.`,
          `« ${s.y} » se rapproche de $${fr(b)}$ ${s.unite}.`
        ),
      };
    },
  },

  /* ═══════════════════ statT_cv_revenir ═══════════════════ */

  {
    // log(y) : la droite des moindres carrés du nuage transformé (calculée sur
    // les données, coefficients arrondis au centième et ANNONCÉS), puis le
    // retour à y par la puissance de dix.
    kind: "template",
    id: "stmg_stat_cv_revenir_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_revenir",
    difficulty: 3,
    theme: "neutral",
    hint: "Si $z = \\log(y)$ et $z = ax + b$, alors $y = 10^{ax+b}$.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const { s, xs, ys } = tirerCV("expo");
      const zs = ys.map((y) => Math.log10(y));
      const mc = moindresCarres(xs, zs);
      const a = arrondi(mc.a, 2);
      const b = arrondi(mc.b, 2);
      const x = Math.max(...xs) + randomInt(1, 2);
      const z = arrondi(a * x + b, 2);
      const y = 10 ** z;
      return {
        text:
          `${amorceCV(s)} Avec $z = \\log(y)$, l'ajustement du nuage $(x\\,;\\,z)$ par la méthode des moindres carrés donne ` +
          `$z = ${fr(a)}x ${b >= 0 ? "+" : "-"} ${fr(Math.abs(b))}$ (coefficients arrondis au centième). ` +
          pick([
            `Quelle valeur de « ${s.y} » ce modèle prévoit-il pour « ${s.x} » $= ${x}$ ?`,
            `Estime « ${s.y} » pour « ${s.x} » $= ${x}$ à l'aide de ce modèle.`,
            `Que prévoit ce modèle pour « ${s.y} » lorsque « ${s.x} » vaut $${x}$ ?`,
          ]) +
          " (arrondi à l'unité)",
        format: "short",
        expected: avecTolerance(y, 0),
        comparator: "number_equal",
        canvas: canvasNuagePoints(xs, zs.map((v) => arrondi(v, 2)), `Nuage (x ; z = log y) et son ajustement`, { a, b }),
        explanation: exp(
          "Revenir à la variable initiale, c'est défaire la transformation : de $z = \\log(y)$ on tire $y = 10^{z}$.",
          "On calcule d'abord $z$ avec l'ajustement, puis on remonte à $y$ par la puissance de dix.",
          `$z = ${fr(a)} \\times ${x} ${b >= 0 ? "+" : "-"} ${fr(Math.abs(b))} = ${fr(z)}$, donc $y = 10^{${fr(z)}} \\approx ${fr(arrondi(y, 1))}$.`,
          `Le modèle prévoit environ $${fr(arrondi(y, 0))}$ ${s.unite}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER le retour raté : « 10 × z » au lieu de « 10^z ».
    kind: "template",
    id: "stmg_stat_cv_revenir_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_revenir",
    difficulty: 3,
    theme: "neutral",
    hint: "$z = \\log(y)$ se défait avec une PUISSANCE de dix, pas avec une multiplication par dix.",
    tags: ["stmg", "maths", "statistiques", "canvas", "piege", "template"],
    generate: () => {
      const { s, xs, ys } = tirerCV("expo");
      const zs = ys.map((y) => Math.log10(y));
      const mc = moindresCarres(xs, zs);
      const a = arrondi(mc.a, 2);
      const b = arrondi(mc.b, 2);
      const x = randomInt(2, Math.max(...xs));
      const z = arrondi(a * x + b, 2);
      const juste = Math.round(10 ** z);
      const faux = arrondi(10 * z, 1);
      const eleve = pick(["Un élève", "Une élève", "Un stagiaire", "Une stagiaire"]);
      const bonne = "il faut élever $10$ à la PUISSANCE $z$, et non multiplier $10$ par $z$";
      return {
        text:
          `${amorceCV(s)} Avec $z = \\log(y)$, l'ajustement donne $z = ${fr(a)}x ${b >= 0 ? "+" : "-"} ${fr(Math.abs(b))}$. ` +
          `Pour « ${s.x} » $= ${x}$, ${minuscule(eleve)} calcule $z = ${fr(z)}$, puis écrit « $y = 10 \\times ${fr(z)} = ${fr(faux)}$ ». ` +
          pick(["Où est l'erreur ?", "Qu'est-ce qui est faux dans ce calcul ?"]),
        format: "qcm",
        choices: makeChoices(bonne, [
          "il faut multiplier par $100$ au lieu de $10$",
          "il faut reprendre le logarithme de $z$ pour revenir à $y$",
          "il n'y a pas d'erreur : le calcul est juste",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuagePoints(xs, zs.map((v) => arrondi(v, 2)), `Nuage (x ; z = log y) et son ajustement`, { a, b }),
        explanation: exp(
          "Le logarithme décimal et la puissance de dix se défont l'un l'autre : $\\log(y) = z$ équivaut à $y = 10^{z}$. Aucune multiplication n'intervient.",
          "On calcule $z$ avec l'ajustement, puis on remonte à $y$ en élevant $10$ à cette puissance.",
          `$z = ${fr(z)}$ est juste. Mais $y = 10^{${fr(z)}} \\approx ${juste}$, et non $10 \\times ${fr(z)} = ${fr(faux)}$.`,
          `L'erreur est d'avoir multiplié par $10$ au lieu d'élever $10$ à la puissance $z$ : la valeur prévue est environ $${juste}$ ${s.unite}.`
        ),
        choiceDiagnostics: [
          { choice: "il faut reprendre le logarithme de $z$ pour revenir à $y$", cause: "le logarithme a déjà été appliqué pour obtenir z : on le DÉFAIT, on ne le réapplique pas" },
          { choice: "il n'y a pas d'erreur : le calcul est juste", cause: `le calcul de z est juste, le retour à y ne l'est pas : environ ${juste} et non ${fr(faux)}` },
        ],
      };
    },
  },

  {
    // ANGLE 3 — z = 1/x : on remplace z par 1/x AVANT de calculer y.
    kind: "template",
    id: "stmg_stat_cv_revenir_tpl_3",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_revenir",
    difficulty: 3,
    theme: "neutral",
    hint: "L'ajustement est écrit en $z$ : commence par calculer $z = \\dfrac{1}{x}$ pour la valeur de $x$ demandée.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const { s, xs, ys } = tirerCV("inverse");
      const mc = moindresCarres(xs.map((x) => 1 / x), ys);
      const a = arrondi(mc.a, 1);
      const b = arrondi(mc.b, 1);
      // Des abscisses hors du tableau, d'inverse décimal exact.
      const x = pick([3, 6, 12, 16, 20, 25, 40] as const);
      const y = a / x + b;
      return {
        text:
          `${amorceCV(s)} Avec $z = \\dfrac{1}{x}$, l'ajustement affine du nuage $(z\\,;\\,y)$ donne $y = ${fr(a)}z ${b >= 0 ? "+" : "-"} ${fr(Math.abs(b))}$. ` +
          pick([
            `Quelle valeur de « ${s.y} » ce modèle prévoit-il pour « ${s.x} » $= ${x}$ ?`,
            `Estime « ${s.y} » pour « ${s.x} » $= ${x}$.`,
          ]) +
          " (arrondi au centième)",
        format: "short",
        expected: avecTolerance(y, 2),
        comparator: "number_equal",
        canvas: canvasNuagePoints(xs.map((v) => 1 / v), ys, `Nuage (z = 1/x ; y) et son ajustement`, { a, b }),
        explanation: exp(
          "Revenir à la variable initiale, c'est remplacer la variable transformée par sa définition : ici $z = \\dfrac{1}{x}$, donc $y = \\dfrac{a}{x} + b$.",
          "On calcule $z$ pour la valeur de $x$ demandée, puis on l'injecte dans l'ajustement.",
          `$z = \\dfrac{1}{${x}} \\approx ${fr(arrondi(1 / x, 4))}$, donc $y = ${fr(a)} \\times \\dfrac{1}{${x}} ${b >= 0 ? "+" : "-"} ${fr(Math.abs(b))} \\approx ${fr(arrondi(y, 3))}$.`,
          `Le modèle prévoit environ $${fr(arrondi(y, 2))}$ ${s.unite}.`
        ),
      };
    },
  },

  {
    // ANGLE 4 — u = x² : on élève au carré avant de remplacer.
    kind: "template",
    id: "stmg_stat_cv_revenir_tpl_4",
    niveau: "stmg",
    matiere: "maths",
    notionId: "stat_changement_variable",
    microId: "statT_cv_revenir",
    difficulty: 3,
    theme: "neutral",
    hint: "L'ajustement est écrit en $u$ : calcule d'abord $u = x^2$, puis remplace.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const { s, xs, ys, a: a0 } = tirerCV("carre");
      // Un léger bruit, puis le VRAI ajustement du nuage (u ; y), arrondi au centième.
      const ysB = ys.map((y) => arrondi(y + (Math.random() - 0.5) * Math.max(0.4, a0), 1));
      const mc = moindresCarres(xs.map((x) => x * x), ysB);
      const a = arrondi(mc.a, 2);
      const b = arrondi(mc.b, 2);
      const x = pick([7, 8, 9] as const);
      const y = a * x * x + b;
      return {
        text:
          `${amorceCV(s)} Avec $u = x^2$, l'ajustement du nuage $(u\\,;\\,y)$ par la méthode des moindres carrés donne ` +
          `$y = ${fr(a)}u${plusB(b)}$ (coefficients arrondis au centième). ` +
          pick([
            `Quelle valeur de « ${s.y} » ce modèle prévoit-il pour « ${s.x} » $= ${x}$ ?`,
            `Estime « ${s.y} » pour « ${s.x} » $= ${x}$.`,
          ]) +
          " (arrondi au dixième)",
        format: "short",
        expected: avecTolerance(y, 1),
        comparator: "number_equal",
        canvas: canvasNuagePoints(xs.map((v) => v * v), ysB, `Nuage (u = x² ; y) et son ajustement`, { a, b }),
        explanation: exp(
          "Revenir à la variable initiale, c'est remplacer $u$ par sa définition : $u = x^2$, donc $y = ax^2 + b$.",
          "On calcule $u = x^2$ pour la valeur demandée, puis on l'injecte dans l'ajustement.",
          `$u = ${x}^2 = ${x * x}$, donc $y = ${fr(a)} \\times ${x * x}${plusB(b)} = ${fr(arrondi(y, 4))}$.`,
          `Le modèle prévoit environ $${fr(arrondi(y, 1))}$ ${s.unite}.`
        ),
      };
    },
  },
];
