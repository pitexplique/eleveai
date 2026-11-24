// Renfort du coach FONCTIONS AFFINES 3e (22/11/2026), partie c : PROBLÈMES et DÉFIS.
//
// Mesure du 22/11 : `affine_probleme` et `affine_defi` sous le seuil (peu de
// squelettes, ★1-★2 longs à 100 %). Ici, des GÉNÉRATEURS sur le modèle de
// `affine-tracer.bank.ts` : à ★1-★2 des phrases courtes sans contexte (équation
// f(x) = k, deux fonctions égales, lecture sur la droite, programme, tableur) ; à
// partir de ★3, des situations de vie (deux tarifs qui se croisent, seuil de
// rentabilité, coût total, température et altitude, réservoir qui se vide…).
// Défis : Celsius / Fahrenheit, droites parallèles, point commun de trois droites,
// paramètre à retrouver, valeur cachée à prédire, programme de calcul piégé.
//
// ⛔ Règles du collège : ★1 ≤ 12 mots, ★2 ≤ 15 mots, sans prénom ni contexte.
// Virgule décimale, « − » pour moins, jamais de barre de fraction (0,5x).
// Fonction écrite « f(x) = 2x − 3 », point « (2 ; 5) ».

import type { TutorBankItemV4, FonctionGraphiqueCanvasData, DifficultyLevel } from "@/lib/tutor-v4/types";

const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
const sg = () => (Math.random() < 0.5 ? 1 : -1);

const fr = (n: number) => String(Math.round(n * 1000) / 1000).replace(".", ",").replace("-", "−");
/** Un nombre entre parenthèses s'il est négatif : « 3 × (−2) ». */
const par = (n: number) => (n < 0 ? `(${fr(n)})` : fr(n));
/** Au plus un chiffre après la virgule : un leurre « 3,667 » ne ressemble à aucune erreur. */
const propre = (v: number) => Number.isFinite(v) && Math.abs(v * 10 - Math.round(v * 10)) < 1e-9;
const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;

function qcm(juste: string, faux: string[], secours: string[] = []) {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  for (const s of secours) if (d.length < 2 && s !== juste && !d.includes(s)) d.push(s);
  return melange([juste, ...d]);
}

/** « 2x − 3 », « −x + 1 », « 0,5x », « 3 ». */
function expr(a: number, b: number): string {
  const ax = a === 1 ? "x" : a === -1 ? "−x" : `${fr(a)}x`;
  if (a === 0) return fr(b);
  if (b === 0) return ax;
  return b > 0 ? `${ax} + ${fr(b)}` : `${ax} − ${fr(-b)}`;
}
const pt = (x: number, y: number) => `(${fr(x)} ; ${fr(y)})`;
const NOM = () => un(["f", "f", "g", "h"] as const);
const PAIRE = () => un([["f", "g"], ["f", "g"], ["g", "h"], ["f", "h"]] as const);
/** « 2 × 3 + 5 = 11 » : le calcul d'une image, écrit en entier. */
const calc = (a: number, b: number, x: number) =>
  `${fr(a)} × ${par(x)}${b === 0 ? "" : b < 0 ? ` − ${fr(-b)}` : ` + ${fr(b)}`} = ${fr(a * x + b)}`;
/** La résolution de ax + b = k, en deux étapes. */
const resout = (a: number, b: number, k: number) => {
  const x = (k - b) / a;
  const etapes: string[] = [];
  if (b !== 0) etapes.push(`${expr(a, 0)} = ${fr(k)} ${b > 0 ? "−" : "+"} ${fr(Math.abs(b))} = ${fr(k - b)}`);
  if (a !== 1) etapes.push(`x = ${fr(k - b)} ÷ ${par(a)} = ${fr(x)}`);
  return `${expr(a, b)} = ${fr(k)}${etapes.length ? `, donc ${etapes.join(", puis ")}` : ""}.`;
};
/** « une séance », « un film ». */
const FEM = /^(séance|entrée|course|partie|heure|livraison|place|semaine|minute|pizza|photo|soirée|location|vente)/;
const unU = (u: string) => (FEM.test(u) ? "une" : "un");
const PRENOMS = ["Inès", "Noah", "Maëlle", "Yanis", "Chloé", "Sacha", "Lina", "Tom", "Jade", "Hugo", "Aya", "Malik", "Zoé", "Léo", "Nina", "Adam"] as const;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « de séances », « d’heures ». */
const de = (mot: string) => (/^[aeiouyéèêâîôûh]/i.test(mot) ? `d’${mot}` : `de ${mot}`);
const pl = (n: number, u: string, us: string) => (Math.abs(n) >= 2 ? us : u);

/* ───────────────────────── les figures ───────────────────────── */

type Droite = { a: number; b: number };
type Fenetre = { xmin: number; xmax: number; ymin: number; ymax: number };
const FEN: Fenetre = { xmin: -6, xmax: 6, ymin: -8, ymax: 8 };
const COULEURS = [
  { nom: "rouge", hex: "#dc2626" },
  { nom: "bleue", hex: "#2563eb" },
  { nom: "verte", hex: "#16a34a" },
] as const;

const dans = (x: number, y: number, f: Fenetre = FEN) => x >= f.xmin && x <= f.xmax && y >= f.ymin && y <= f.ymax;
/** Une droite se lit si deux nœuds du quadrillage sont visibles. */
function lisible(d: Droite, f: Fenetre = FEN) {
  let n = 0;
  for (let x = f.xmin; x <= f.xmax; x++) {
    const y = d.a * x + d.b;
    if (Number.isInteger(y) && y >= f.ymin && y <= f.ymax) n++;
  }
  return n >= 2;
}
function figure(
  droites: { d: Droite; c?: string }[],
  f: Fenetre = FEN,
  ev?: { h?: number; v?: number; p?: { x: number; y: number } },
): FonctionGraphiqueCanvasData {
  const fig: FonctionGraphiqueCanvasData = {
    kind: "fonctionGraphique",
    size: { width: 320, height: 320 },
    ...f,
    grille: true,
    courbes: droites.map((x, i) => ({
      id: `d${i}`,
      type: x.d.b === 0 ? ("lineaire" as const) : ("affine" as const),
      a: x.d.a,
      b: x.d.b,
      couleur: x.c ?? "#2563eb",
    })),
  };
  if (ev) {
    fig.misesEnEvidence = [
      {
        ...(ev.h !== undefined ? { horizontale: { y: ev.h, couleur: "#f59e0b" } } : {}),
        ...(ev.v !== undefined ? { verticale: { x: ev.v, couleur: "#f59e0b" } } : {}),
        ...(ev.p ? { point: { x: ev.p.x, y: ev.p.y, couleur: "#f59e0b" } } : {}),
      },
    ];
  }
  return fig;
}
/** La fenêtre d'une situation : x de 0 à xmax, y de 0 à ymax (graduations lisibles). */
const fenCtx = (xmax: number, ymax: number): Fenetre => ({ xmin: -1, xmax: Math.max(6, Math.min(10, xmax)), ymin: -1, ymax: Math.max(10, Math.min(30, ymax)) });

/* ───────────────────────── les réponses ───────────────────────── */

/** Réponse tapée : un nombre seul ; le pavé quand il est positif. */
const court = (text: string, v: number, explanation: string, canvas?: FonctionGraphiqueCanvasData) => ({
  text,
  format: "short" as const,
  expected: [fr(v)],
  comparator: "number_equal" as const,
  explanation,
  ...(canvas ? { canvas } : {}),
  ...(v >= 0 ? { saisie: "pave" as const } : {}),
});
const choix = (text: string, juste: string, choices: string[], explanation: string, canvas?: FonctionGraphiqueCanvasData) => ({
  text,
  format: "qcm" as const,
  choices,
  expected: [juste],
  comparator: "mcq_exact" as const,
  explanation,
  ...(canvas ? { canvas } : {}),
});

const tpl = (micro: "probleme" | "defi", n: number, difficulty: DifficultyLevel, hint: string, tags: string[], generate: () => any): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `3e_affine_${micro}_renfort_tpl_${n}`,
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: `affine_${micro}`,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["affine_fonction", micro, ...tags, "template"],
    generate,
  }) as TutorBankItemV4;
const P = (n: number, d: DifficultyLevel, hint: string, tags: string[], g: () => any) => tpl("probleme", n, d, hint, tags, g);
const D = (n: number, d: DifficultyLevel, hint: string, tags: string[], g: () => any) => tpl("defi", n, d, hint, tags, g);

const DEF_ANTE = "chercher l’antécédent de k par f, c’est trouver x tel que f(x) = k.";
const DEF_EGAL = "deux fonctions sont égales en x quand f(x) = g(x) : c’est l’abscisse du point commun de leurs droites.";
const DEF_AFF = "une fonction affine s’écrit f(x) = ax + b : b est la valeur de départ (pour x = 0), a ce qui s’ajoute à chaque unité.";

/** Deux fonctions dont les droites se coupent en un nœud du quadrillage. */
function deuxDroites(aMax = 4, lin2 = false) {
  for (;;) {
    const a1 = sg() * entre(1, aMax);
    const a2 = sg() * entre(1, aMax);
    const x0 = entre(-3, 5);
    const y0 = entre(-6, 7);
    const b1 = y0 - a1 * x0;
    const b2 = lin2 ? 0 : y0 - a2 * x0;
    const a2v = lin2 ? (x0 === 0 ? 0 : y0 / x0) : a2;
    if (lin2 && (!Number.isInteger(a2v) || a2v === 0 || Math.abs(a2v) > 5)) continue;
    if (a1 === a2v || Math.abs(b1) > 9 || Math.abs(b2) > 9 || b1 === 0) continue;
    return { a1, b1, a2: a2v, b2, x0, y0 };
  }
}

/* ───────────────────────── les situations (★3 et plus) ───────────────────────── */

/** Deux offres : A a des frais fixes, B coûte plus cher à l'unité. */
type Offre = { intro: string; nomA: string; nomB: string; u: string; us: string; A: (a: number, b: number) => string; B: (a: number, b: number) => string; bZero?: boolean };
const offre = (intro: string, nomA: string, nomB: string, labA: string, labB: string, u: string, us: string, frais: string, sans: string, parU: string, bZero = false): Offre => ({
  intro,
  nomA,
  nomB,
  u,
  us,
  bZero,
  A: (a, b) => `${labA} : ${fr(b)} € ${frais}, puis ${fr(a)} € ${parU}.`,
  B: (a, b) => (b && !bZero ? `${labB} : ${fr(b)} € ${frais}, puis ${fr(a)} € ${parU}.` : bZero ? `${labB} : ${fr(a)} € ${parU}.` : `${labB} : ${fr(a)} € ${parU}, sans ${sans}.`),
});
const OFFRES: Offre[] = [
  offre("Une salle d’escalade propose deux formules.", "la formule A", "la formule B", "Formule A", "Formule B", "séance", "séances", "d’adhésion", "adhésion", "la séance"),
  offre("Un cinéma propose deux tarifs.", "le tarif carte", "le tarif libre", "Tarif carte", "Tarif libre", "film", "films", "pour la carte", "carte", "par film", true),
  offre("Deux compagnies font le même trajet en ville.", "le taxi", "le VTC", "Taxi", "VTC", "kilomètre", "kilomètres", "de prise en charge", "prise en charge", "par kilomètre"),
  offre("Deux applis louent des trottinettes.", "l’appli A", "l’appli B", "Appli A", "Appli B", "trajet", "trajets", "d’abonnement par mois", "abonnement", "par trajet"),
  offre("Une école de musique propose deux formules.", "la formule adhérent", "la formule libre", "Formule adhérent", "Formule libre", "cours", "cours", "d’adhésion", "adhésion", "par cours", true),
  offre("Deux opérateurs proposent un forfait de téléphone.", "l’opérateur A", "l’opérateur B", "Opérateur A", "Opérateur B", "Go", "Go", "par mois", "abonnement", "par Go consommé"),
  offre("Un circuit de karting propose deux tarifs.", "le pass", "le ticket", "Pass", "Ticket", "course", "courses", "à l’achat", "pass", "la course", true),
  offre("Un bowling propose deux tarifs.", "la carte membre", "le tarif visiteur", "Carte membre", "Tarif visiteur", "partie", "parties", "par an", "carte", "la partie", true),
  offre("Une laverie propose deux options.", "la carte fidélité", "le paiement direct", "Carte fidélité", "Paiement direct", "lavage", "lavages", "à l’achat", "carte", "le lavage", true),
  offre("Un jeu en ligne vend des niveaux bonus.", "le pass saison", "l’achat à l’unité", "Pass saison", "À l’unité", "niveau", "niveaux", "pour le pass", "pass", "par niveau", true),
  offre("La piscine propose deux formules.", "l’abonnement", "l’entrée simple", "Abonnement", "Entrée simple", "entrée", "entrées", "par trimestre", "abonnement", "l’entrée", true),
  offre("Deux loueurs proposent des vélos électriques.", "le loueur A", "le loueur B", "Loueur A", "Loueur B", "heure", "heures", "d’assurance", "assurance", "l’heure"),
  offre("Deux ateliers impriment des tee-shirts du club.", "l’atelier A", "l’atelier B", "Atelier A", "Atelier B", "tee-shirt", "tee-shirts", "de frais de création", "frais de création", "par tee-shirt"),
  offre("Une ludothèque prête des jeux de société.", "l’abonnement", "le prêt simple", "Abonnement", "Prêt simple", "prêt", "prêts", "par an", "abonnement", "le prêt", true),
  offre("Deux parkings sont près de la gare.", "le parking A", "le parking B", "Parking A", "Parking B", "heure", "heures", "à l’entrée", "frais d’entrée", "l’heure"),
  offre("Un club de tennis loue ses courts.", "la formule licencié", "la formule invité", "Formule licencié", "Formule invité", "heure", "heures", "de licence", "licence", "l’heure de court", true),
  offre("Deux applis livrent des repas.", "l’appli A", "l’appli B", "Appli A", "Appli B", "livraison", "livraisons", "d’abonnement par mois", "abonnement", "par livraison"),
  offre("Une patinoire propose deux tarifs.", "la carte saison", "le ticket", "Carte saison", "Ticket", "séance", "séances", "à l’achat", "carte", "la séance", true),
];

/** Petites offres (pour la figure) : les droites se croisent en (x0 ; y0), nœud du quadrillage. */
function offresPetites(S: Offre) {
  for (;;) {
    const aA = entre(1, 3);
    const dA = entre(1, 3);
    const aB = aA + dA;
    const x0 = entre(2, 6);
    const bB = S.bZero || Math.random() < 0.5 ? 0 : entre(1, 3);
    const bA = dA * x0 + bB;
    const y0 = aB * x0 + bB;
    if (y0 <= 24 && bA <= 15) return { aA, bA, aB, bB, x0, y0 };
  }
}
/** Offres plus réalistes : la bascule tombe (ou non) sur un entier. */
function offresGrandes(S: Offre, entier: boolean) {
  for (;;) {
    const aA = entre(2, 7);
    const dA = entre(2, 4);
    const aB = aA + dA;
    const bB = S.bZero || Math.random() < 0.5 ? 0 : entre(2, 6);
    const bA = bB + entre(8, 36);
    const ok = (bA - bB) % dA === 0;
    if (ok === entier) return { aA, bA, aB, bB, xs: (bA - bB) / dA };
  }
}
const figOffres = (aA: number, bA: number, aB: number, bB: number, x0: number, y0: number) => {
  const cs = melange([...COULEURS]);
  const fen = fenCtx(x0 + 4, y0 + 8);
  return { cA: cs[0].nom, cB: cs[1].nom, fig: figure([{ d: { a: aA, b: bA }, c: cs[0].hex }, { d: { a: aB, b: bB }, c: cs[1].hex }], fen) };
};

/** Une situation affine : valeur de départ b, a par unité (en plus, ou en moins si dec). */
type Sit = { t: (a: number, b: number) => string; xdef: string; u: string; us: string; y: string; uy: string; sa: string; sb: string; a: number[]; b: number[]; dec?: boolean; euro?: boolean };
const SITS: Sit[] = [
  { t: (a, b) => `Un taxi coûte ${fr(b)} € de prise en charge, puis ${fr(a)} € par kilomètre.`, xdef: "le nombre de kilomètres", u: "kilomètre", us: "kilomètres", y: "le prix de la course", uy: "€", sa: "le prix d’un kilomètre", sb: "la prise en charge", a: [1, 2, 3], b: [2, 3, 4, 5, 6], euro: true },
  { t: (a, b) => `Louer un vélo coûte ${fr(b)} € d’assurance, puis ${fr(a)} € par heure.`, xdef: "le nombre d’heures", u: "heure", us: "heures", y: "le prix de la location", uy: "€", sa: "le prix d’une heure", sb: "l’assurance", a: [2, 3, 4], b: [2, 3, 5, 6], euro: true },
  { t: (a, b) => `Une plante mesure ${fr(b)} cm. Elle grandit de ${fr(a)} cm par semaine.`, xdef: "le nombre de semaines", u: "semaine", us: "semaines", y: "la hauteur de la plante", uy: "cm", sa: "la pousse d’une semaine", sb: "la hauteur de départ", a: [1, 2, 3], b: [3, 4, 5, 6, 8] },
  { t: (a, b) => `Une cuve contient ${fr(b)} L. Un robinet y ajoute ${fr(a)} L par minute.`, xdef: "le nombre de minutes", u: "minute", us: "minutes", y: "le volume d’eau", uy: "L", sa: "le débit du robinet", sb: "le volume de départ", a: [2, 3, 4], b: [2, 4, 5, 6] },
  { t: (a, b) => `Une tirelire contient ${fr(b)} €. On y ajoute ${fr(a)} € chaque semaine.`, xdef: "le nombre de semaines", u: "semaine", us: "semaines", y: "la somme dans la tirelire", uy: "€", sa: "l’argent ajouté chaque semaine", sb: "la somme de départ", a: [2, 3, 5], b: [4, 6, 8, 10], euro: true },
  { t: (a, b) => `Dans un jeu vidéo, on part avec ${fr(b)} points et on gagne ${fr(a)} points par niveau.`, xdef: "le nombre de niveaux", u: "niveau", us: "niveaux", y: "le score", uy: "points", sa: "les points d’un niveau", sb: "les points de départ", a: [2, 3, 4, 5], b: [3, 5, 6, 10] },
  { t: (a, b) => `Une appli de musique coûte ${fr(b)} € à l’inscription, puis ${fr(a)} € par mois.`, xdef: "le nombre de mois", u: "mois", us: "mois", y: "le prix payé", uy: "€", sa: "le prix d’un mois", sb: "l’inscription", a: [2, 3, 4], b: [3, 5, 6, 8], euro: true },
  { t: (a, b) => `Une pizzeria livre pour ${fr(b)} € de frais, plus ${fr(a)} € par pizza.`, xdef: "le nombre de pizzas", u: "pizza", us: "pizzas", y: "le prix de la commande", uy: "€", sa: "le prix d’une pizza", sb: "les frais de livraison", a: [8, 9, 10, 12], b: [2, 3, 4, 5], euro: true },
  { t: (a, b) => `Il y a déjà ${fr(b)} cm de neige. Il en tombe ${fr(a)} cm par heure.`, xdef: "le nombre d’heures", u: "heure", us: "heures", y: "la hauteur de neige", uy: "cm", sa: "la neige tombée en une heure", sb: "la neige de départ", a: [1, 2, 3], b: [2, 4, 5, 6] },
  { t: (a, b) => `Sur un site, une place de concert coûte ${fr(a)} €, plus ${fr(b)} € de frais par commande.`, xdef: "le nombre de places", u: "place", us: "places", y: "le prix de la commande", uy: "€", sa: "le prix d’une place", sb: "les frais de commande", a: [15, 20, 25, 30], b: [2, 3, 4, 5], euro: true },
  { t: (a, b) => `Une coach sportive demande ${fr(b)} € pour le bilan, puis ${fr(a)} € par séance.`, xdef: "le nombre de séances", u: "séance", us: "séances", y: "le prix total", uy: "€", sa: "le prix d’une séance", sb: "le bilan", a: [15, 20, 25], b: [20, 25, 30], euro: true },
  { t: (a, b) => `Un vendeur de vélos gagne ${fr(b)} € par jour, plus ${fr(a)} € par vélo vendu.`, xdef: "le nombre de vélos vendus", u: "vélo", us: "vélos", y: "son gain du jour", uy: "€", sa: "la prime par vélo", sb: "le fixe du jour", a: [10, 15, 20], b: [40, 50, 60], euro: true },
  { t: (a, b) => `Un drone décolle d’un toit à ${fr(b)} m de haut et monte de ${fr(a)} m par seconde.`, xdef: "le nombre de secondes", u: "seconde", us: "secondes", y: "l’altitude du drone", uy: "m", sa: "la montée en une seconde", sb: "la hauteur du toit", a: [2, 3, 4], b: [4, 5, 6, 8] },
  { t: (a, b) => `Un jeu se télécharge : il en est à ${fr(b)} % et avance de ${fr(a)} % par minute.`, xdef: "le nombre de minutes", u: "minute", us: "minutes", y: "l’avancement", uy: "%", sa: "l’avance en une minute", sb: "l’avancement de départ", a: [5, 6, 8], b: [10, 12, 20] },
  { t: (a, b) => `Un traiteur compte ${fr(b)} € de déplacement, puis ${fr(a)} € par invité.`, xdef: "le nombre d’invités", u: "invité", us: "invités", y: "le prix du repas", uy: "€", sa: "le prix par invité", sb: "le déplacement", a: [8, 10, 12, 15], b: [20, 30, 40], euro: true },
  { t: (a, b) => `Un site imprime des photos : ${fr(b)} € de port, puis ${fr(a)} € par photo.`, xdef: "le nombre de photos", u: "photo", us: "photos", y: "le prix de la commande", uy: "€", sa: "le prix d’une photo", sb: "les frais de port", a: [1, 2], b: [3, 4, 5, 6], euro: true },
  // Ce qui DIMINUE : a est retiré à chaque unité.
  { dec: true, t: (a, b) => `Une bougie mesure ${fr(b)} cm. Elle perd ${fr(a)} cm par heure.`, xdef: "le nombre d’heures", u: "heure", us: "heures", y: "la hauteur de la bougie", uy: "cm", sa: "ce qu’elle perd en une heure", sb: "la hauteur de départ", a: [1, 2, 3], b: [12, 15, 18, 20] },
  { dec: true, t: (a, b) => `Un évier contient ${fr(b)} L d’eau. Il se vide de ${fr(a)} L par minute.`, xdef: "le nombre de minutes", u: "minute", us: "minutes", y: "le volume d’eau", uy: "L", sa: "l’eau perdue en une minute", sb: "le volume de départ", a: [2, 3, 4], b: [12, 16, 20, 24] },
  { dec: true, t: (a, b) => `Une carte de cantine contient ${fr(b)} €. Chaque repas coûte ${fr(a)} €.`, xdef: "le nombre de repas", u: "repas", us: "repas", y: "le crédit restant", uy: "€", sa: "le prix d’un repas", sb: "le crédit de départ", a: [3, 4, 5], b: [20, 24, 30, 40], euro: true },
  { dec: true, t: (a, b) => `Un plongeur est à ${fr(b)} m de profondeur. Il remonte de ${fr(a)} m par minute.`, xdef: "le nombre de minutes", u: "minute", us: "minutes", y: "sa profondeur", uy: "m", sa: "la remontée en une minute", sb: "la profondeur de départ", a: [2, 3, 5], b: [15, 18, 20, 30] },
  { dec: true, t: (a, b) => `Un téléphone est chargé à ${fr(b)} %. Une vidéo lui fait perdre ${fr(a)} % par heure.`, xdef: "le nombre d’heures", u: "heure", us: "heures", y: "la charge", uy: "%", sa: "la charge perdue en une heure", sb: "la charge de départ", a: [10, 15, 20], b: [60, 80, 90, 100] },
  { dec: true, t: (a, b) => `Le réservoir d’un scooter contient ${fr(b)} L. Il consomme ${fr(a)} L par heure de route.`, xdef: "le nombre d’heures de route", u: "heure", us: "heures", y: "l’essence restante", uy: "L", sa: "la consommation d’une heure", sb: "le plein de départ", a: [1, 2, 3], b: [6, 8, 9, 12] },
  { dec: true, t: (a, b) => `Il reste ${fr(b)} Go sur un forfait. On en utilise ${fr(a)} par jour.`, xdef: "le nombre de jours", u: "jour", us: "jours", y: "les Go restants", uy: "Go", sa: "les Go utilisés en un jour", sb: "les Go de départ", a: [2, 3, 4], b: [20, 24, 30, 40] },
  { dec: true, t: (a, b) => `Une parapentiste vole à ${fr(b)} m. Elle descend de ${fr(a)} m par minute.`, xdef: "le nombre de minutes", u: "minute", us: "minutes", y: "son altitude", uy: "m", sa: "la descente en une minute", sb: "l’altitude de départ", a: [50, 60, 80, 100], b: [600, 800, 900, 1200] },
  { dec: true, t: (a, b) => `Un magasin a ${fr(b)} consoles en stock. Il en vend ${fr(a)} par jour.`, xdef: "le nombre de jours", u: "jour", us: "jours", y: "le stock", uy: "consoles", sa: "les consoles vendues en un jour", sb: "le stock de départ", a: [3, 4, 5, 6], b: [30, 40, 48, 60] },
  { dec: true, t: (a, b) => `Une carte de bus est chargée de ${fr(b)} €. Chaque trajet coûte ${fr(a)} €.`, xdef: "le nombre de trajets", u: "trajet", us: "trajets", y: "le crédit restant", uy: "€", sa: "le prix d’un trajet", sb: "la charge de départ", a: [2, 3], b: [12, 18, 20, 24], euro: true },
];
const valeur = (S: Sit, a: number, b: number, n: number) => (S.dec ? b - a * n : a * n + b);
const aSigne = (S: Sit, a: number) => (S.dec ? -a : a);
/** « 12 € », « 15 cm », « 40 points ». */
const avecU = (v: number, S: Sit) => `${fr(v)} ${S.uy}`;
/** Une situation, une quantité n et sa valeur ; petites valeurs si la droite est dessinée. */
function tirerSit(avecFig: boolean) {
  for (;;) {
    const S = un(SITS);
    const a = un(S.a), b = un(S.b);
    const nMax = S.dec ? Math.floor(b / a) : 9;
    const n = entre(2, Math.max(2, Math.min(9, nMax)));
    const v = valeur(S, a, b, n);
    if (!avecFig || (Math.max(b, v) <= 26 && n <= 8)) return { S, a, b, n, v };
  }
}

/* ─────────────── températures (défis Celsius / Fahrenheit) ─────────────── */

const THERMO = [
  { t: "Un bulletin météo de Chicago annonce", min: -10, max: 30, quoi: "la température" },
  { t: "Un thermomètre acheté aux États-Unis indique", min: -5, max: 35, quoi: "la température" },
  { t: "Une recette américaine demande un four à", min: 150, max: 220, quoi: "la température du four" },
  { t: "La notice d’un aquarium conseille une eau à", min: 20, max: 30, quoi: "la température de l’eau" },
  { t: "Un site de voyage annonce à Miami", min: 20, max: 35, quoi: "la température" },
  { t: "Dans un jeu vidéo américain, une grotte est à", min: -10, max: 15, quoi: "la température" },
  { t: "Un livre de sciences anglais parle d’une eau à", min: 0, max: 100, quoi: "la température de l’eau" },
  { t: "Une appli de météo réglée en anglais affiche", min: -5, max: 35, quoi: "la température" },
] as const;
const C5 = (min: number, max: number) => 5 * entre(Math.ceil(min / 5), Math.floor(max / 5));
const FORMULE_F = "Pour passer des degrés Celsius aux degrés Fahrenheit : F = 1,8 × C + 32.";

/* ───────────────────────── les gabarits ───────────────────────── */

export const affineRenfortCBank: TutorBankItemV4[] = [
  /* ═════════════ affine_probleme ★1 : phrases courtes, sans contexte ═════════════ */

  // ★1 : antécédent par une fonction affine (le type brevet).
  P(1, 1, "Écris l’équation f(x) = k, puis isole x.", ["antecedent", "equation"], () => {
    const f = NOM();
    // Une fois sur deux, la droite est dessinée : on tire alors des valeurs qui restent dans la fenêtre.
    const avecFig = Math.random() < 0.55;
    let a = 0, b = 0, x = 0, k = 0;
    do {
      a = entre(2, 5);
      b = Math.random() < 0.2 ? 0 : sg() * entre(1, 9);
      x = entre(1, 6);
      k = a * x + b;
    } while (avecFig && (!dans(x, k) || !lisible({ a, b })));
    const E = expr(a, b);
    const text = un([
      `${f}(x) = ${E}. Quel x donne ${f}(x) = ${fr(k)} ?`,
      `${f}(x) = ${E}. Résous ${f}(x) = ${fr(k)}.`,
      `Quel est l’antécédent de ${fr(k)} par ${f}(x) = ${E} ?`,
      `${f}(x) = ${E}. Pour quel x vaut-elle ${fr(k)} ?`,
      `Trouve x tel que ${E} = ${fr(k)}.`,
    ]);
    return court(
      text,
      x,
      expl(DEF_ANTE, `on résout ${E} = ${fr(k)}.`, resout(a, b, k), `x = ${fr(x)} ; on vérifie : ${calc(a, b, x)}.`),
      avecFig ? figure([{ d: { a, b } }], FEN, { h: k }) : undefined,
    );
  }),

  // ★1 : l'antécédent LU sur la droite.
  P(2, 1, "Pars de la hauteur demandée sur l’axe vertical, va jusqu’à la droite, puis descends lire x.", ["antecedent", "graphique"], () => {
    const f = NOM();
    let a = 0, b = 0, x = 0, k = 0;
    for (;;) {
      a = sg() * entre(1, 3);
      b = sg() * entre(1, 5);
      x = entre(-4, 5);
      k = a * x + b;
      if (dans(x, k) && x !== 0 && k !== 0 && k !== b) break;
    }
    const text = un([
      `D’après la droite, quel x donne y = ${fr(k)} ?`,
      `Droite de ${f} : quel x donne ${f}(x) = ${fr(k)} ?`,
      `Sur la figure, ${f}(x) = ${fr(k)} pour quel x ?`,
      `Quel est l’antécédent de ${fr(k)} par ${f} ? Lis la droite.`,
      `La droite de ${f} : quel x donne ${fr(k)} ?`,
      `Pour quel x la droite de ${f} atteint-elle ${fr(k)} ?`,
    ]);
    return court(
      text,
      x,
      expl(DEF_ANTE, `on part de ${fr(k)} sur l’axe vertical, on rejoint la droite, puis on lit l’abscisse.`, `la droite passe par ${pt(x, k)}.`, `${f}(${fr(x)}) = ${fr(k)} : x = ${fr(x)}.`),
      figure([{ d: { a, b } }], FEN, { h: k }),
    );
  }),

  // ★1 : antécédent en QCM, chaque leurre est une erreur d'élève.
  P(3, 1, "Enlève d’abord b des deux côtés, puis divise par a.", ["antecedent", "qcm"], () => {
    const f = NOM();
    const avecFig = Math.random() < 0.45;
    let a = 0, b = 0, x = 0, k = 0;
    do {
      a = entre(2, 5);
      b = sg() * entre(1, 9);
      x = entre(1, 6);
      k = a * x + b;
    } while (avecFig && (!dans(x, k) || !lisible({ a, b })));
    const E = expr(a, b);
    const text = un([
      `${f}(x) = ${E}. Choisis x pour avoir ${fr(k)}.`,
      `${f}(x) = ${E}. Quelle valeur de x donne ${fr(k)} ?`,
      `${f}(x) = ${E}. ${f}(x) = ${fr(k)} pour x égal à…`,
      `Avec ${f}(x) = ${E}, quel x mène à ${fr(k)} ?`,
    ]);
    const faux = [k / a, (k + b) / a, k - b, a * k + b].filter((v) => propre(v) && v !== x).map(fr);
    return choix(
      text,
      fr(x),
      qcm(fr(x), faux, [fr(x + 1), fr(x - 1)]),
      expl(DEF_ANTE, `on résout ${E} = ${fr(k)} : on ${b > 0 ? "retire" : "ajoute"} ${fr(Math.abs(b))}, puis on divise par ${fr(a)}.`, resout(a, b, k), `x = ${fr(x)}. ${fr(a * k + b)} serait l’image de ${fr(k)}, pas son antécédent.`),
      avecFig ? figure([{ d: { a, b } }], FEN, { h: k }) : undefined,
    );
  }),

  // ★1 : le point commun de deux droites, lu sur la figure.
  P(4, 1, "Le point commun des deux droites : lis son abscisse sur l’axe horizontal.", ["egalite", "graphique"], () => {
    const [f, g] = PAIRE();
    let r = deuxDroites(3);
    while (!dans(r.x0, r.y0) || !lisible({ a: r.a1, b: r.b1 }) || !lisible({ a: r.a2, b: r.b2 }) || r.x0 === r.y0) r = deuxDroites(3);
    const cs = melange([...COULEURS]);
    const text = un([
      `En quel x les droites de ${f} et ${g} se coupent-elles ?`,
      `Lis l’abscisse du point commun aux deux droites.`,
      `Pour quel x a-t-on ${f}(x) = ${g}(x) ? Lis la figure.`,
      `Quel x donne la même image par ${f} et par ${g} ?`,
      `Les deux droites se croisent : pour quel x ?`,
    ]);
    return court(
      text,
      r.x0,
      expl(DEF_EGAL, "on repère le point où les deux droites se croisent, puis on lit son abscisse.", `les droites se coupent en ${pt(r.x0, r.y0)}.`, `x = ${fr(r.x0)} (et non ${fr(r.y0)}, qui est l’ordonnée).`),
      figure([{ d: { a: r.a1, b: r.b1 }, c: cs[0].hex }, { d: { a: r.a2, b: r.b2 }, c: cs[1].hex }]),
    );
  }),

  // ★1 : quand la fonction vaut 0.
  P(5, 1, "f(x) = 0 : écris l’équation ax + b = 0.", ["antecedent", "zero"], () => {
    const f = NOM();
    let a = 0, x = 0;
    do {
      a = sg() * entre(1, 4);
      x = sg() * entre(1, 5);
    } while (Math.abs(a * x) > 8);
    const b = -a * x;
    const E = expr(a, b);
    const text = un([
      `${f}(x) = ${E}. Quand a-t-on ${f}(x) = 0 ?`,
      `${f}(x) = ${E}. Quel x annule ${f}(x) ?`,
      `Résous ${E} = 0.`,
      `${f}(x) = ${E}. Quel nombre a pour image 0 ?`,
      `Quel est l’antécédent de 0 par ${f}(x) = ${E} ?`,
    ]);
    return court(
      text,
      x,
      expl(DEF_ANTE, `on résout ${E} = 0.`, resout(a, b, 0), `x = ${fr(x)} : la droite coupe l’axe horizontal en ${pt(x, 0)}.`),
      Math.random() < 0.5 && Math.abs(b) <= 8 ? figure([{ d: { a, b } }], FEN, { h: 0 }) : undefined,
    );
  }),

  /* ═════════════ affine_probleme ★2 : encore sans contexte ═════════════ */

  // ★2 : deux fonctions égales.
  P(6, 2, "Écris f(x) = g(x), puis regroupe les x d’un côté.", ["egalite", "equation"], () => {
    const [f, g] = PAIRE();
    const avecFig = Math.random() < 0.55;
    const lin = Math.random() < 0.4;
    let r = deuxDroites(4, lin);
    while (avecFig && (!dans(r.x0, r.y0) || !lisible({ a: r.a1, b: r.b1 }) || !lisible({ a: r.a2, b: r.b2 }))) r = deuxDroites(4, lin);
    const E1 = expr(r.a1, r.b1);
    const E2 = expr(r.a2, r.b2);
    const text = un([
      `Résous ${E1} = ${E2}.`,
      `Pour quel x a-t-on ${E1} = ${E2} ?`,
      `${f}(x) = ${E1}, ${g}(x) = ${E2}. Égales en quel x ?`,
      `Quand ${E1} et ${E2} sont-ils égaux ?`,
    ]);
    const cs = melange([...COULEURS]);
    return court(
      text,
      r.x0,
      expl(DEF_EGAL, `on résout ${E1} = ${E2} : les x d’un côté, les nombres de l’autre.`, `${expr(r.a1 - r.a2, 0)} = ${fr(r.b2 - r.b1)}, donc x = ${fr(r.b2 - r.b1)} ÷ ${par(r.a1 - r.a2)} = ${fr(r.x0)}.`, `x = ${fr(r.x0)} ; les deux valent alors ${fr(r.y0)}.`),
      avecFig ? figure([{ d: { a: r.a1, b: r.b1 }, c: cs[0].hex }, { d: { a: r.a2, b: r.b2 }, c: cs[1].hex }]) : undefined,
    );
  }),

  // ★2 : comparer deux images.
  P(7, 2, "Calcule les deux images, puis compare-les.", ["comparer", "image"], () => {
    const [f, g] = PAIRE();
    let a1 = 0, b1 = 0, c = 0, x = 0;
    do {
      a1 = entre(1, 4);
      b1 = sg() * entre(1, 9);
      c = entre(1, 6);
      x = entre(1, 6);
    } while (c === a1);
    // une fois sur trois, x est le point d'égalité
    if (Math.random() < 0.34 && Number.isInteger(b1 / (c - a1)) && b1 / (c - a1) > 0) x = b1 / (c - a1);
    const F = a1 * x + b1;
    const G = c * x;
    const defs = `${f}(x) = ${expr(a1, b1)} et ${g}(x) = ${expr(c, 0)}`;
    const fx = `${f}(${fr(x)})`;
    const gx = `${g}(${fr(x)})`;
    const text = un([
      `Compare ${fx} et ${gx} si ${defs}.`,
      `${defs}. Compare ${fx} et ${gx}.`,
      `Avec ${defs}, compare les images de ${fr(x)}.`,
    ]);
    const SUP = `${fx} > ${gx}`, INF = `${fx} < ${gx}`, EG = `${fx} = ${gx}`;
    const juste = F > G ? SUP : F < G ? INF : EG;
    return choix(
      text,
      juste,
      melange([SUP, INF, EG]),
      expl("comparer deux fonctions en x, c’est comparer leurs images.", `on calcule ${fx} et ${gx}.`, `${fx} = ${calc(a1, b1, x)} et ${gx} = ${calc(c, 0, x)}.`, juste + "."),
    );
  }),

  // ★2 : au-dessus ou en dessous, sur la figure.
  P(8, 2, "À droite du point commun, la droite qui monte le plus vite passe au-dessus.", ["comparer", "graphique"], () => {
    let r = deuxDroites(3);
    while (!dans(r.x0, r.y0) || !lisible({ a: r.a1, b: r.b1 }) || !lisible({ a: r.a2, b: r.b2 }) || r.x0 === r.y0) r = deuxDroites(3);
    const [f, g] = PAIRE();
    const cs = melange([...COULEURS]);
    const c1 = cs[0].nom, c2 = cs[1].nom;
    const text = un([
      `Pour quels x la droite ${c1} est-elle au-dessus de la ${c2} ?`,
      `Où la droite ${c1} passe-t-elle au-dessus de la ${c2} ?`,
      `${f} est la droite ${c1}, ${g} la ${c2}. Quand a-t-on ${f}(x) > ${g}(x) ?`,
      `La droite ${c1} dépasse la ${c2} pour quels x ?`,
    ]);
    const juste = r.a1 > r.a2 ? `x > ${fr(r.x0)}` : `x < ${fr(r.x0)}`;
    return choix(
      text,
      juste,
      qcm(juste, [`x > ${fr(r.x0)}`, `x < ${fr(r.x0)}`, `x > ${fr(r.y0)}`, `x < ${fr(r.y0)}`, `x = ${fr(r.x0)}`]),
      expl(DEF_EGAL, "on repère le point commun, puis on regarde quelle droite est au-dessus de chaque côté.", `les droites se coupent en x = ${fr(r.x0)} ; la droite ${c1} monte ${r.a1 > r.a2 ? "plus" : "moins"} vite que la ${c2}.`, `la droite ${c1} est au-dessus pour ${juste}.`),
      figure([{ d: { a: r.a1, b: r.b1 }, c: cs[0].hex }, { d: { a: r.a2, b: r.b2 }, c: cs[1].hex }]),
    );
  }),

  // ★2 : programme de calcul, pris par l'autre bout.
  P(9, 2, "Écris le programme comme une fonction de x, puis résous l’équation.", ["programme", "antecedent"], () => {
    const a = entre(2, 5);
    const b = entre(1, 9);
    const x = entre(1, 9);
    const v = un([0, 1, 2, 3]);
    const ops = [`multiplie par ${a}, ajoute ${b}`, `multiplie par ${a}, retire ${b}`, `ajoute ${b}, multiplie par ${a}`, `retire ${b}, multiplie par ${a}`][v];
    const k = [a * x + b, a * x - b, a * (x + b), a * (x - b)][v];
    const E = [expr(a, b), expr(a, -b), `${a}(x + ${b})`, `${a}(x − ${b})`][v];
    const text = un([
      `Choisis x, ${ops}. Quel x donne ${fr(k)} ?`,
      `Choisis x, ${ops}. On obtient ${fr(k)} : que vaut x ?`,
      `Programme : ${ops}. Résultat ${fr(k)}. Quel nombre au départ ?`,
      `Avec « ${ops} », quel nombre donne ${fr(k)} ?`,
    ]);
    return court(
      text,
      x,
      expl("un programme de calcul qui multiplie puis ajoute donne une fonction affine du nombre de départ.", `le programme donne ${E} ; on résout ${E} = ${fr(k)}.`, v < 2 ? resout(a, v === 0 ? b : -b, k) : `${fr(k)} ÷ ${a} = ${fr(k / a)}, puis ${fr(k / a)} ${v === 2 ? "−" : "+"} ${b} = ${fr(x)}.`, `le nombre de départ est ${fr(x)}.`),
    );
  }),

  // ★2 : tableur, pris par l'autre bout.
  P(10, 2, "La formule calcule B à partir de A : résous l’équation.", ["tableur", "antecedent"], () => {
    const a = entre(2, 6);
    const b = sg() * entre(1, 9);
    const x = entre(1, 12);
    const k = a * x + b;
    const L = entre(2, 9);
    const F = `=${a}*A${L}${b < 0 ? "−" : "+"}${Math.abs(b)}`;
    const text = un([
      `Tableur : B${L} contient ${F}. Quel nombre en A${L} donne ${fr(k)} en B${L} ?`,
      `En B${L}, on tape ${F}. Que mettre en A${L} pour lire ${fr(k)} ?`,
      `Formule en B${L} : ${F}. B${L} affiche ${fr(k)}. Que contient A${L} ?`,
      `La cellule B${L} calcule ${F}. Pour B${L} = ${fr(k)}, que vaut A${L} ?`,
    ]);
    return court(
      text,
      x,
      expl("la formule du tableur est une fonction affine : B = " + expr(a, b).replace("x", " × A") + ".", `on résout ${expr(a, b)} = ${fr(k)}, x étant le nombre en A${L}.`, resout(a, b, k), `A${L} contient ${fr(x)}.`),
    );
  }),

  // ★2 : antécédent avec a négatif ou décimal.
  P(11, 2, "Attention au signe de a : divise par a avec son signe.", ["antecedent", "equation"], () => {
    const f = NOM();
    const avecFig = Math.random() < 0.55;
    let a = 0, b = 0, x = 0, k = 0;
    do {
      a = un([-5, -4, -3, -2, -1, 0.5, -0.5, 1.5]);
      x = a % 1 !== 0 ? 2 * entre(-3, 4) : entre(-3, 5);
      b = sg() * entre(1, 9);
      k = a * x + b;
    } while (avecFig && (!dans(x, k) || !lisible({ a, b })));
    const E = expr(a, b);
    const text = un([
      `Résous ${f}(x) = ${fr(k)} pour ${f}(x) = ${E}.`,
      `Quel nombre a pour image ${fr(k)} par ${f}(x) = ${E} ?`,
      `${f}(x) = ${E}. Quelle valeur de x donne ${fr(k)} ?`,
      `Cherche x : ${E} = ${fr(k)}.`,
      `${f}(x) = ${E}. Trouve l’antécédent de ${fr(k)}.`,
    ]);
    return court(text, x, expl(DEF_ANTE, `on résout ${E} = ${fr(k)}.`, resout(a, b, k), `x = ${fr(x)} ; on vérifie : ${calc(a, b, x)}.`), avecFig ? figure([{ d: { a, b } }], FEN, { h: k }) : undefined);
  }),

  // ★2 : deux fonctions égales, en QCM.
  P(12, 2, "Écris l’équation, puis vérifie la réponse en calculant les deux images.", ["egalite", "qcm"], () => {
    const [f, g] = PAIRE();
    const r = deuxDroites(4, true);
    const E1 = expr(r.a1, r.b1);
    const E2 = expr(r.a2, 0);
    const text = un([
      `${f}(x) = ${E1}, ${g}(x) = ${E2}. Quel x les rend égales ?`,
      `Quelle est la solution de ${E1} = ${E2} ?`,
      `${E1} = ${E2} : quelle valeur de x convient ?`,
    ]);
    const faux = [-r.x0, r.y0, r.b1 / (r.a1 + r.a2), -r.b1 / r.a2].filter((v) => propre(v) && v !== r.x0).map(fr);
    return choix(
      text,
      fr(r.x0),
      qcm(fr(r.x0), faux, [fr(r.x0 + 1), fr(r.x0 - 1)]),
      expl(DEF_EGAL, `on résout ${E1} = ${E2}.`, `${expr(r.a1 - r.a2, 0)} = ${fr(-r.b1)}, donc x = ${fr(r.x0)} ; les deux images valent ${fr(r.y0)}.`, `x = ${fr(r.x0)}.`),
    );
  }),

  /* ═════════════ affine_probleme ★3 : en contexte ═════════════ */

  // ★3 : comparer deux tarifs pour une quantité donnée.
  P(13, 3, "Calcule le prix avec chaque offre pour la même quantité.", ["tarifs", "comparer"], () => {
    const S = un(OFFRES);
    const o = offresPetites(S);
    const n = Math.random() < 0.25 ? o.x0 : un([1, 2, 3, 4, 5, 6, 7, 8].filter((k) => k !== o.x0));
    const pA = o.aA * n + o.bA, pB = o.aB * n + o.bB;
    const EG = "les deux coûtent pareil";
    const juste = pA < pB ? S.nomA : pB < pA ? S.nomB : EG;
    const N = `${n} ${pl(n, S.u, S.us)}`;
    const q = un([`Pour ${N}, quelle offre est la moins chère ?`, `Quel choix coûte le moins pour ${N} ?`, `Pour ${N}, que vaut-il mieux choisir ?`, `${un(PRENOMS)} prévoit ${N}. Quel est le meilleur choix ?`]);
    const avecFig = Math.random() < 0.5;
    const { cA, cB, fig } = figOffres(o.aA, o.bA, o.aB, o.bB, o.x0, o.y0);
    const lecture = avecFig ? ` Sur la figure, la droite ${cA} donne le prix avec ${S.nomA}, la ${cB} avec ${S.nomB}.` : "";
    return choix(
      `${S.intro} ${S.A(o.aA, o.bA)} ${S.B(o.aB, o.bB)}${lecture} ${q}`,
      juste,
      melange([S.nomA, S.nomB, EG]),
      expl("comparer deux tarifs, c’est calculer les deux prix pour la même quantité.", `on calcule les deux prix pour ${N}.`, `${cap(S.nomA)} : ${calc(o.aA, o.bA, n)} € ; ${S.nomB} : ${calc(o.aB, o.bB, n)} €.`, juste === EG ? `les deux coûtent ${fr(pA)} €.` : `${juste} est la moins chère (${fr(Math.min(pA, pB))} € contre ${fr(Math.max(pA, pB))} €).`),
      avecFig ? fig : undefined,
    );
  }),

  // ★3 : à partir de combien… ? Lu sur les deux droites.
  P(14, 3, "Repère le point où les droites se croisent : de chaque côté, la plus basse est la moins chère.", ["tarifs", "seuil", "graphique"], () => {
    const S = un(OFFRES);
    const o = offresPetites(S);
    const { cA, cB, fig } = figOffres(o.aA, o.bA, o.aB, o.bB, o.x0, o.y0);
    const pourA = Math.random() < 0.6;
    const nom = pourA ? S.nomA : S.nomB;
    const q = un([
      `Pour combien ${de(S.us)} vaut-il mieux choisir ${nom} ?`,
      `Quand vaut-il mieux prendre ${nom} ?`,
      `D’après la figure, ${nom} coûte moins pour combien ${de(S.us)} ?`,
    ]);
    const plus = `pour plus de ${o.x0} ${S.us}`, moins = `pour moins de ${o.x0} ${S.us}`;
    const juste = pourA ? plus : moins;
    return choix(
      `${S.intro} ${S.A(o.aA, o.bA)} ${S.B(o.aB, o.bB)} La droite ${cA} donne le prix avec ${S.nomA}, la ${cB} avec ${S.nomB}. ${q}`,
      juste,
      qcm(juste, [plus, moins, `pour plus de ${o.y0} ${S.us}`, `pour moins de ${o.y0} ${S.us}`]),
      expl("quand deux droites de prix se croisent, la moins chère est la plus basse : elle change au point commun.", `on lit le point commun, puis on regarde quelle droite est en dessous de chaque côté.`, `les droites se coupent en ${pt(o.x0, o.y0)} : ${o.x0} ${S.us} pour ${o.y0} € avec les deux offres. Après, ${S.nomA} (qui augmente moins vite) est en dessous.`, `${nom} est la moins chère ${juste}.`),
      fig,
    );
  }),

  // ★3 : modéliser la situation.
  P(15, 3, "b = la valeur de départ ; a = ce qui change à chaque unité (négatif si ça diminue).", ["modeliser", "expression"], () => {
    const S = un(SITS);
    const a = un(S.a), b = un(S.b);
    const A = aSigne(S, a);
    const juste = `f(x) = ${expr(A, b)}`;
    const q = un([
      `On note x ${S.xdef}. Quelle fonction donne ${S.y} ?`,
      `Quelle fonction f donne ${S.y}, si x est ${S.xdef} ?`,
      `${cap(S.y)} est une fonction de x, ${S.xdef}. Laquelle ?`,
      `x désigne ${S.xdef}. Choisis la fonction qui donne ${S.y}.`,
    ]);
    const faux = [`f(x) = ${expr(b, A)}`, `f(x) = ${expr(A, 0)}`, `f(x) = ${expr(-A, b)}`, `f(x) = ${expr(A + b, 0)}`, `f(x) = ${expr(a, -b)}`];
    return choix(
      `${S.t(a, b)} ${q}`,
      juste,
      qcm(juste, faux),
      expl(DEF_AFF, `la valeur de départ est ${avecU(b, S)} ; à chaque unité, on ${S.dec ? "retire" : "ajoute"} ${avecU(a, S)}.`, `a = ${fr(A)} et b = ${fr(b)}.`, `${juste}.`),
    );
  }),

  // ★3 : calculer une valeur (coût total, hauteur…).
  P(16, 3, "Remplace x par le nombre donné dans f(x) = ax + b.", ["image", "cout"], () => {
    const avecFig = Math.random() < 0.55;
    const { S, a, b, n, v } = tirerSit(avecFig);
    const N = `${n} ${pl(n, S.u, S.us)}`;
    const q = un([`Que vaut ${S.y} pour ${N} ?`, `Calcule ${S.y} pour ${N}.`, `Combien (en ${S.uy}) pour ${N} ?`, `Quelle valeur prend ${S.y} pour ${N} ?`]);
    const A = aSigne(S, a);
    const fen = fenCtx(n + 2, Math.max(b, v) + 4);
    return court(
      `${S.t(a, b)} ${q}`,
      v,
      expl(DEF_AFF, `on modélise par f(x) = ${expr(A, b)}, puis on calcule f(${n}).`, `f(${n}) = ${calc(A, b, n)}.`, `${S.y} vaut ${avecU(v, S)}.`),
      avecFig ? figure([{ d: { a: A, b } }], fen, { v: n }) : undefined,
    );
  }),

  // ★3 : pris par l'autre bout (antécédent en contexte).
  P(17, 3, "Écris l’équation f(x) = valeur donnée, puis résous-la.", ["antecedent", "modeliser"], () => {
    const avecFig = Math.random() < 0.55;
    const { S, a, b, n, v } = tirerSit(avecFig);
    const A = aSigne(S, a);
    const q = un([
      `Combien ${de(S.us)} faut-il pour que ${S.y} atteigne ${avecU(v, S)} ?`,
      `Pour quel nombre ${de(S.us)} obtient-on ${avecU(v, S)} ?`,
      `${cap(S.y)} est de ${avecU(v, S)}. Combien ${de(S.us)} ?`,
      `x étant ${S.xdef}, pour quel x a-t-on ${avecU(v, S)} ?`,
    ]);
    const fen = fenCtx(n + 2, Math.max(b, v) + 4);
    return court(
      `${S.t(a, b)} ${q}`,
      n,
      expl(DEF_ANTE, `on modélise par f(x) = ${expr(A, b)}, puis on résout f(x) = ${fr(v)}.`, resout(A, b, v), `${n} ${pl(n, S.u, S.us)}.`),
      avecFig ? figure([{ d: { a: A, b } }], fen, { h: v }) : undefined,
    );
  }),

  // ★3 : que représentent a et b ?
  P(18, 3, "b est la valeur pour x = 0 ; a est ce qui change quand x augmente de 1.", ["interpreter", "modeliser"], () => {
    const S = un(SITS);
    const a = un(S.a), b = un(S.b);
    const A = aSigne(S, a);
    const surB = Math.random() < 0.5;
    const nb = surB ? fr(b) : fr(A);
    const q = un([
      `Dans f(x) = ${expr(A, b)}, que représente ${nb} ?`,
      `On modélise par f(x) = ${expr(A, b)}. Que signifie le nombre ${nb} ?`,
      `x est ${S.xdef}, f(x) = ${expr(A, b)}. À quoi correspond ${nb} ?`,
    ]);
    const juste = cap(surB ? S.sb : S.sa);
    return choix(
      `${S.t(a, b)} ${q}`,
      juste,
      melange([cap(S.sb), cap(S.sa), cap(S.y), cap(S.xdef)]),
      expl(DEF_AFF, "b se lit pour x = 0 ; a est ce qui s’ajoute (ou se retire) à chaque unité.", `ici b = ${fr(b)} et a = ${fr(A)}.`, `${nb} représente ${surB ? S.sb : S.sa}.`),
    );
  }),

  // ★3 : lire une valeur sur la droite d'une situation.
  P(19, 3, "Pars de la valeur de x sur l’axe horizontal, monte jusqu’à la droite, puis lis y.", ["graphique", "lecture"], () => {
    let S = un(SITS), a = 0, b = 0;
    for (;;) {
      S = un(SITS);
      a = un(S.a);
      b = un(S.b);
      if (b <= 20 && (S.dec || a * 6 + b <= 28) && (!S.dec || b / a >= 3)) break;
    }
    const A = aSigne(S, a);
    const nMax = S.dec ? Math.floor(b / a) : 6;
    const n = entre(1, Math.min(8, nMax));
    const v = valeur(S, a, b, n);
    const fen = fenCtx(S.dec ? Math.ceil(b / a) + 1 : n + 3, Math.max(b, v) + 4);
    const N = `${n} ${pl(n, S.u, S.us)}`;
    const q = un([
      `La droite donne ${S.y} selon ${S.xdef}. Lis ${S.y} pour ${N}.`,
      `Sur la figure, quelle valeur (en ${S.uy}) pour ${N} ?`,
      `La droite représente ${S.y}. Que lit-on pour ${N} ?`,
    ]);
    return court(
      `${S.t(a, b)} ${q}`,
      v,
      expl(DEF_AFF, `on part de x = ${n}, on monte jusqu’à la droite, puis on lit l’ordonnée.`, `f(${n}) = ${calc(A, b, n)}.`, `${S.y} vaut ${avecU(v, S)}.`),
      figure([{ d: { a: A, b } }], fen, { v: n }),
    );
  }),

  /* ═════════════ affine_probleme ★4 ═════════════ */

  // ★4 : à partir de combien… ? (la bascule ne tombe pas sur un entier).
  P(20, 4, "Cherche quand les deux prix sont égaux, puis prends le premier nombre entier au-delà.", ["tarifs", "seuil", "rentable"], () => {
    const S = un(OFFRES);
    const o = offresGrandes(S, false);
    const n = Math.ceil(o.xs);
    const q = un([
      `À partir de combien ${de(S.us)} vaut-il mieux choisir ${S.nomA} ?`,
      `Combien ${de(S.us)} au minimum pour que ${S.nomA} coûte moins que ${S.nomB} ?`,
      `Quel est le plus petit nombre ${de(S.us)} pour lequel ${S.nomA} coûte moins que ${S.nomB} ?`,
      `${un(PRENOMS)} hésite. Dès combien ${de(S.us)} a-t-on intérêt à prendre ${S.nomA} ?`,
    ]);
    const m = n - 1;
    return court(
      `${S.intro} ${S.A(o.aA, o.bA)} ${S.B(o.aB, o.bB)} ${q}`,
      n,
      expl("une offre avec des frais fixes devient rentable quand son prix passe sous l’autre.", `on résout ${expr(o.aA, o.bA)} = ${expr(o.aB, o.bB)}, puis on teste les entiers autour.`, `${fr(o.aB - o.aA)}x = ${fr(o.bA - o.bB)}, donc x ≈ ${fr(Math.round(o.xs * 10) / 10)}. Pour ${m} : ${fr(o.aA * m + o.bA)} € contre ${fr(o.aB * m + o.bB)} €. Pour ${n} : ${fr(o.aA * n + o.bA)} € contre ${fr(o.aB * n + o.bB)} €.`, `à partir de ${n} ${S.us}.`),
    );
  }),

  // ★4 : pour combien les deux tarifs sont-ils égaux ? (et quel prix ?)
  P(21, 4, "Écris l’égalité des deux prix, puis résous l’équation.", ["tarifs", "egalite"], () => {
    const S = un(OFFRES);
    const o = offresGrandes(S, true);
    const x0 = o.xs, y0 = o.aA * x0 + o.bA;
    const prix = Math.random() < 0.4;
    const q = prix
      ? un([`Les deux offres coûtent pareil pour un certain nombre ${de(S.us)}. Quel est ce prix commun (en €) ?`, `Quel prix (en €) paie-t-on quand les deux offres reviennent au même ?`])
      : un([`Pour combien ${de(S.us)} les deux offres coûtent-elles pareil ?`, `Combien ${de(S.us)} faut-il pour payer le même prix avec les deux offres ?`, `Pour quel nombre ${de(S.us)} ${S.nomA} et ${S.nomB} reviennent-ils au même prix ?`]);
    return court(
      `${S.intro} ${S.A(o.aA, o.bA)} ${S.B(o.aB, o.bB)} ${q}`,
      prix ? y0 : x0,
      expl("deux tarifs sont égaux quand f(x) = g(x).", `on résout ${expr(o.aA, o.bA)} = ${expr(o.aB, o.bB)}.`, `${fr(o.aB - o.aA)}x = ${fr(o.bA - o.bB)}, donc x = ${fr(x0)} ; prix : ${calc(o.aA, o.bA, x0)} €.`, prix ? `le prix commun est ${fr(y0)} €.` : `pour ${fr(x0)} ${S.us}.`),
    );
  }),

  // ★4 : lire le point commun des deux droites de prix.
  P(22, 4, "Le point commun des deux droites : x = la quantité, y = le prix commun.", ["tarifs", "graphique", "egalite"], () => {
    const S = un(OFFRES);
    const o = offresPetites(S);
    const { cA, cB, fig } = figOffres(o.aA, o.bA, o.aB, o.bB, o.x0, o.y0);
    const prix = Math.random() < 0.5;
    const q = prix
      ? un([`Lis le prix (en €) pour lequel les deux offres reviennent au même.`, `Quel est le prix commun (en €) des deux offres ?`])
      : un([`Pour combien ${de(S.us)} les deux offres coûtent-elles pareil ?`, `Lis le nombre ${de(S.us)} pour lequel les deux prix sont égaux.`]);
    return court(
      `${S.intro} La droite ${cA} donne le prix avec ${S.nomA}, la ${cB} avec ${S.nomB}. ${q}`,
      prix ? o.y0 : o.x0,
      expl(DEF_EGAL, "on lit les coordonnées du point où les deux droites se croisent.", `les droites se coupent en ${pt(o.x0, o.y0)}.`, prix ? `le prix commun est ${o.y0} €.` : `pour ${o.x0} ${S.us}.`),
      fig,
    );
  }),

  // ★4 : ce qui diminue : quand est-ce vide (ou à une valeur donnée) ?
  P(23, 4, "Écris f(x) = b − ax, puis résous f(x) = 0 (ou la valeur demandée).", ["decroissance", "antecedent"], () => {
    const avecFig = Math.random() < 0.55;
    let S = SITS[0], a = 0, n = 0, b = 0;
    // b reste réaliste (une charge ne dépasse pas 100 %) ; petit si la droite est dessinée.
    do {
      S = un(SITS.filter((s) => s.dec));
      a = un(S.a);
      n = entre(3, 10);
      b = a * n;
    } while (b > Math.max(...S.b) || (avecFig && b > 30));
    const vide = Math.random() < 0.5;
    const m = vide ? n : entre(1, n - 1);
    const v = b - a * m;
    const q = vide
      ? un([`Au bout de combien ${de(S.us)} arrive-t-on à 0 ${S.uy} ?`, `Combien ${de(S.us)} avant d’arriver à 0 ?`, `Combien ${de(S.us)} faut-il pour que ${S.y} tombe à 0 ?`])
      : un([`Au bout de combien ${de(S.us)} reste-t-il ${avecU(v, S)} ?`, `Combien ${de(S.us)} pour descendre à ${avecU(v, S)} ?`]);
    const fen = fenCtx(n + 1, b + 3);
    return court(
      `${S.t(a, b)} ${q}`,
      m,
      expl("ce qui diminue de la même quantité à chaque unité se modélise par f(x) = b − ax.", `f(x) = ${expr(-a, b)} ; on résout f(x) = ${fr(v)}.`, resout(-a, b, v), `au bout de ${m} ${pl(m, S.u, S.us)}.`),
      avecFig ? figure([{ d: { a: -a, b } }], fen, { h: v }) : undefined,
    );
  }),

  // ★4 : la température baisse avec l'altitude.
  P(24, 4, "La température est une fonction affine de l’altitude : T = T₀ − 6 × (altitude en km).", ["decroissance", "temperature"], () => {
    const LIEUX = ["Au bord de la mer", "Dans la vallée", "Au départ de la randonnée", "Au pied de la montagne", "À l’aéroport", "Au camping", "Sur la plage"];
    const lieu = un(LIEUX);
    const T0 = un([12, 18, 24, 30]);
    const base = `${lieu}, il fait ${T0} °C. La température baisse de 6 °C par kilomètre d’altitude.`;
    const cas = un([0, 1, 2]);
    if (cas === 0) {
      const h = un([0.5, 1, 1.5, 2, 2.5, 3, 4]);
      const T = T0 - 6 * h;
      return court(
        `${base} ${un([`Quelle température fait-il à ${fr(h * 1000)} m ?`, `Combien de degrés à ${fr(h)} km d’altitude ?`, `Un sommet est à ${fr(h * 1000)} m. Quelle température y fait-il ?`])}`,
        T,
        expl("la température est une fonction affine de l’altitude : T(h) = " + `${T0} − 6h, h en km.`, `on calcule T(${fr(h)}).`, `${T0} − 6 × ${fr(h)} = ${fr(T)}.`, `il fait ${fr(T)} °C.`),
      );
    }
    const k = cas === 1 ? 0 : un([3, 6, 9, 12].filter((t) => t < T0));
    const h = (T0 - k) / 6;
    const q = cas === 1 ? un([`À quelle altitude (en m) arrive-t-on à 0 °C ?`, `À partir de quelle altitude (en m) gèle-t-il ?`]) : un([`À quelle altitude (en m) fait-il ${k} °C ?`, `À combien de mètres d’altitude trouve-t-on ${k} °C ?`]);
    return court(
      `${base} ${q}`,
      h * 1000,
      expl("la température est une fonction affine de l’altitude : T(h) = " + `${T0} − 6h, h en km.`, `on résout ${T0} − 6h = ${k}.`, `6h = ${T0 - k}, donc h = ${fr(h)} km = ${fr(h * 1000)} m.`, `à ${fr(h * 1000)} m.`),
      T0 <= 24 ? figure([{ d: { a: -6, b: T0 } }], { xmin: -1, xmax: 6, ymin: -6, ymax: Math.max(12, T0 + 2) }, { h: k }) : undefined,
    );
  }),

  // ★4 : budget : avec quelle offre en fait-on le plus ?
  P(25, 4, "Pour chaque offre, cherche le plus grand nombre que le budget permet.", ["tarifs", "budget"], () => {
    const S = un(OFFRES);
    for (;;) {
      const o = offresGrandes(S, Math.random() < 0.5);
      const M = entre(30, 90);
      const nA = Math.floor((M - o.bA) / o.aA), nB = Math.floor((M - o.bB) / o.aB);
      if (nA < 1 || nB < 1) continue;
      const EG = "autant avec les deux";
      const juste = nA > nB ? S.nomA : nB > nA ? S.nomB : EG;
      const q = un([`Avec ${M} €, quelle offre permet le plus ${de(S.us)} ?`, `${un(PRENOMS)} a ${M} € en tout. Quel choix lui donne le plus ${de(S.us)} ?`, `Budget : ${M} €. Avec quelle offre en a-t-on le plus ?`]);
      return choix(
        `${S.intro} ${S.A(o.aA, o.bA)} ${S.B(o.aB, o.bB)} ${q}`,
        juste,
        melange([S.nomA, S.nomB, EG]),
        expl("avec un budget, on cherche le plus grand x tel que f(x) ne dépasse pas ce budget.", `on résout chaque prix ≤ ${M}, en gardant un nombre entier.`, `${cap(S.nomA)} : (${M} − ${o.bA}) ÷ ${o.aA} ≈ ${fr(Math.round(((M - o.bA) / o.aA) * 10) / 10)}, soit ${nA}. ${cap(S.nomB)} : (${M} − ${o.bB}) ÷ ${o.aB} ≈ ${fr(Math.round(((M - o.bB) / o.aB) * 10) / 10)}, soit ${nB}.`, juste === EG ? `autant avec les deux (${nA}).` : `${juste} (${Math.max(nA, nB)} ${S.us}).`),
      );
    }
  }),

  // ★4 : métiers : facture et heures de travail.
  P(26, 4, "Facture = déplacement + tarif horaire × nombre d’heures.", ["modeliser", "metiers"], () => {
    const METIERS = [
      { qui: "Un plombier", d: "de déplacement", a: [35, 40, 45, 50], b: [20, 25, 30] },
      { qui: "Une électricienne", d: "de déplacement", a: [40, 45, 50], b: [25, 30, 35] },
      { qui: "Un réparateur de vélos", d: "de diagnostic", a: [20, 25, 30], b: [10, 15] },
      { qui: "Une photographe", d: "de déplacement", a: [60, 70, 80], b: [30, 40, 50] },
      { qui: "Un DJ", d: "d’installation", a: [50, 60, 80], b: [100, 120, 150] },
      { qui: "Une jardinière", d: "de déplacement", a: [25, 30, 35], b: [15, 20] },
      { qui: "Un dépanneur informatique", d: "de déplacement", a: [30, 40, 45], b: [20, 25] },
      { qui: "Une déménageuse", d: "de location du camion", a: [30, 35, 40], b: [60, 80, 90] },
      { qui: "Un professeur de guitare", d: "d’inscription", a: [20, 25, 30], b: [15, 20, 30] },
      { qui: "Une couturière", d: "de frais de dossier", a: [25, 30], b: [10, 15] },
    ];
    const M = un(METIERS);
    const a = un(M.a), b = un(M.b);
    const h = entre(2, 7);
    const tot = a * h + b;
    const base = `${M.qui} facture ${b} € ${M.d}, puis ${a} € par heure.`;
    if (Math.random() < 0.5) {
      return court(
        `${base} ${un([`Sa facture est de ${tot} €. Combien d’heures a-t-il fallu ?`, `On lui a payé ${tot} €. Combien d’heures a-t-on payées ?`, `Pour une facture de ${tot} €, combien d’heures sont comptées ?`])}`,
        h,
        expl(DEF_ANTE, `la facture est f(x) = ${expr(a, b)} ; on résout f(x) = ${tot}.`, resout(a, b, tot), `${h} heures.`),
      );
    }
    return court(
      `${base} ${un([`Combien coûte une intervention de ${h} heures ?`, `Quel est le montant (en €) pour ${h} heures ?`, `Calcule la facture pour ${h} heures.`])}`,
      tot,
      expl(DEF_AFF, `la facture est f(x) = ${expr(a, b)} ; on calcule f(${h}).`, `f(${h}) = ${calc(a, b, h)}.`, `${tot} €.`),
    );
  }),

  // ★4 : combien économise-t-on ? Lu sur les deux droites.
  P(27, 4, "Lis les deux prix pour la quantité donnée, puis fais la différence.", ["tarifs", "graphique", "economie"], () => {
    const S = un(OFFRES);
    const o = offresPetites(S);
    const { cA, cB, fig } = figOffres(o.aA, o.bA, o.aB, o.bB, o.x0, o.y0);
    const xmax = fig.xmax;
    let n = o.x0;
    while (n === o.x0) n = entre(1, xmax);
    const pA = o.aA * n + o.bA, pB = o.aB * n + o.bB;
    if (Math.max(pA, pB) > fig.ymax) n = Math.max(0, o.x0 - un([1, 2]));
    const qA = o.aA * n + o.bA, qB = o.aB * n + o.bB;
    const N = `${n} ${pl(n, S.u, S.us)}`;
    const q = un([`Pour ${N}, combien d’euros économise-t-on avec l’offre la moins chère ?`, `Quel est l’écart de prix (en €) entre les deux offres pour ${N} ?`, `Pour ${N}, de combien d’euros la moins chère est-elle plus avantageuse ?`]);
    return court(
      `${S.intro} La droite ${cA} donne le prix avec ${S.nomA}, la ${cB} avec ${S.nomB}. ${q}`,
      Math.abs(qA - qB),
      expl("l’écart de prix se lit entre les deux droites, à la même abscisse.", `on lit les deux prix pour x = ${n}.`, `${cap(S.nomA)} : ${qA} € ; ${S.nomB} : ${qB} €. Écart : ${Math.max(qA, qB)} − ${Math.min(qA, qB)} = ${Math.abs(qA - qB)}.`, `on économise ${Math.abs(qA - qB)} €.`),
      fig,
    );
  }),

  // ★4 : que signifie le point commun ?
  P(28, 4, "Un point de la droite donne (quantité ; prix).", ["tarifs", "graphique", "interpreter"], () => {
    const S = un(OFFRES);
    const o = offresPetites(S);
    const { cA, cB, fig } = figOffres(o.aA, o.bA, o.aB, o.bB, o.x0, o.y0);
    const juste = `Pour ${o.x0} ${S.us}, les deux offres coûtent ${o.y0} €.`;
    const q = un([`Que signifie le point où les deux droites se coupent ?`, `Que nous apprend le point commun des deux droites ?`, `Comment lire le croisement des deux droites ?`]);
    return choix(
      `${S.intro} La droite ${cA} donne le prix avec ${S.nomA}, la ${cB} avec ${S.nomB}. ${q}`,
      juste,
      melange([juste, `Pour ${o.y0} ${S.us}, les deux offres coûtent ${o.x0} €.`, `Les deux offres coûtent toujours ${o.y0} €.`, `On ne peut pas dépasser ${o.x0} ${S.us}.`]),
      expl("un point d’une droite de prix donne (quantité ; prix).", "on lit les coordonnées du point commun.", `le point commun est ${pt(o.x0, o.y0)}.`, juste),
      fig,
    );
  }),

  /* ═════════════ affine_probleme ★5 ═════════════ */

  // ★5 : budget, nombre maximal (la division ne tombe pas juste).
  P(29, 5, "Résous f(x) = budget, puis garde la partie entière : on ne paie pas une demi-séance.", ["budget", "antecedent"], () => {
    const S = un(SITS.filter((s) => s.euro && !s.dec));
    const a = un(S.a.filter((x) => x >= 2)), b = un(S.b);
    let M = 0;
    do M = b + entre(3 * a, 12 * a) + entre(1, a - 1 || 1); while ((M - b) % a === 0);
    const n = Math.floor((M - b) / a);
    const q = un([`Avec ${M} €, combien ${de(S.us)} au maximum ?`, `${un(PRENOMS)} dispose de ${M} €. Combien ${de(S.us)} au plus ?`, `Budget : ${M} €. Quel est le nombre maximal ${de(S.us)} ?`]);
    return court(
      `${S.t(a, b)} ${q}`,
      n,
      expl(DEF_ANTE, `on résout ${expr(a, b)} = ${M}, puis on garde la partie entière.`, `${a}x = ${M - b}, x ≈ ${fr(Math.round(((M - b) / a) * 100) / 100)}. Pour ${n} : ${calc(a, b, n)} € ; pour ${n + 1} : ${a * (n + 1) + b} €, trop cher.`, `${n} ${S.us} au maximum.`),
    );
  }),

  // ★5 : retrouver la fonction à partir de deux totaux, puis répondre.
  P(30, 5, "Entre les deux totaux, l’écart vient des unités en plus : il donne le prix d’une unité.", ["deux_images", "modeliser"], () => {
    const S = un(OFFRES);
    const a = entre(2, 9), b = entre(5, 25);
    const n1 = entre(2, 4), n2 = n1 + entre(2, 4);
    const y1 = a * n1 + b, y2 = a * n2 + b;
    const cas = un([0, 1, 2]);
    const base = `${S.intro} Avec ${S.nomA}, ${n1} ${S.us} coûtent ${y1} € au total, et ${n2} ${S.us} coûtent ${y2} €. Le prix est une fonction affine du nombre ${de(S.us)}.`;
    const n3 = n2 + entre(2, 6);
    const q = [
      un([`Quel est le prix d’${unU(S.u)} ${S.u} (en €) ?`, `Combien coûte chaque ${S.u} en plus (en €) ?`]),
      un([`Quels sont les frais fixes (en €) ?`, `Combien paie-t-on au départ, sans aucun${unU(S.u) === "une" ? "e" : ""} ${S.u} (en €) ?`]),
      un([`Combien coûteront ${n3} ${S.us} ?`, `Prévois le prix (en €) de ${n3} ${S.us}.`]),
    ][cas];
    const v = [a, b, a * n3 + b][cas];
    return court(
      `${base} ${q}`,
      v,
      expl("si f(x) = ax + b, a = (f(x₂) − f(x₁)) ÷ (x₂ − x₁).", "on calcule a avec les deux totaux, puis b.", `a = (${y2} − ${y1}) ÷ (${n2} − ${n1}) = ${a} ; b = ${y1} − ${a} × ${n1} = ${b}${cas === 2 ? ` ; f(${n3}) = ${calc(a, b, n3)}` : ""}.`, `${fr(v)} €.`),
    );
  }),

  // ★5 : trois offres.
  P(31, 5, "Calcule les trois prix pour la même quantité.", ["tarifs", "comparer"], () => {
    const CTX = [
      { intro: "Une salle de sport propose trois formules", u: "séance", us: "séances", fixe: "abonnement illimité" },
      { intro: "Un cinéma propose trois tarifs", u: "film", us: "films", fixe: "pass illimité" },
      { intro: "Une piscine propose trois formules", u: "entrée", us: "entrées", fixe: "carte illimitée" },
      { intro: "Un club de jeux en réseau propose trois formules", u: "soirée", us: "soirées", fixe: "pass illimité" },
      { intro: "Une salle de trampoline propose trois tarifs", u: "heure", us: "heures", fixe: "pass illimité" },
      { intro: "Une médiathèque propose trois formules pour les films", u: "location", us: "locations", fixe: "abonnement illimité" },
    ];
    const C = un(CTX);
    for (;;) {
      const fA = 5 * entre(6, 12);
      const aB = entre(5, 9);
      const aC = entre(2, aB - 2), bC = 5 * entre(2, 5);
      const n = entre(3, 12);
      const p = [fA, aB * n, aC * n + bC];
      const mn = Math.min(...p);
      if (p.filter((x) => x === mn).length > 1) continue;
      const noms = ["la formule A", "la formule B", "la formule C"];
      const juste = noms[p.indexOf(mn)];
      return choix(
        `${C.intro}. A : ${C.fixe} à ${fA} €. B : ${aB} € par ${C.u}. C : ${bC} € de carte, puis ${aC} € par ${C.u}. ${un([`Pour ${n} ${C.us}, quelle formule est la moins chère ?`, `${un(PRENOMS)} prévoit ${n} ${C.us}. Que doit-il choisir ?`.replace("doit-il", "faut-il"), `Quelle formule choisir pour ${n} ${C.us} ?`])}`,
        juste,
        noms,
        expl("on compare trois fonctions : une constante, une linéaire et une affine.", `on calcule les trois prix pour ${n} ${C.us}.`, `A : ${fA} € ; B : ${aB} × ${n} = ${aB * n} € ; C : ${calc(aC, bC, n)} €.`, `${juste} (${mn} €).`),
      );
    }
  }),

  // ★5 : vidange avec un débit décimal.
  P(32, 5, "Le temps pour vider = quantité de départ ÷ ce qui part à chaque unité.", ["decroissance", "decimal"], () => {
    const CAS = [
      { t: (a: number, b: number) => `Une piscine gonflable contient ${fr(b)} m³ d’eau. Une pompe la vide de ${fr(a)} m³ par heure.`, u: "heure", us: "heures", uy: "m³" },
      { t: (a: number, b: number) => `Un récupérateur d’eau de pluie contient ${fr(b)} L. On arrose le potager avec ${fr(a)} L par jour.`, u: "jour", us: "jours", uy: "L" },
      { t: (a: number, b: number) => `Un glaçon de ${fr(b)} g fond : il perd ${fr(a)} g par minute.`, u: "minute", us: "minutes", uy: "g" },
      { t: (a: number, b: number) => `Une batterie de trottinette est à ${fr(b)} %. Elle perd ${fr(a)} % par kilomètre.`, u: "kilomètre", us: "kilomètres", uy: "%" },
      { t: (a: number, b: number) => `Un aquarium perd ${fr(a)} L d’eau par semaine par évaporation. Il contient ${fr(b)} L de plus que le niveau minimum.`, u: "semaine", us: "semaines", uy: "L" },
      { t: (a: number, b: number) => `Un sac de croquettes pèse ${fr(b)} kg. Le chien en mange ${fr(a)} kg par jour.`, u: "jour", us: "jours", uy: "kg" },
    ];
    const C = un(CAS);
    const a = un([0.5, 1.5, 2.5, 0.2, 0.4]);
    const n = a === 0.2 || a === 0.4 ? 5 * entre(2, 8) : 2 * entre(3, 12);
    const b = Math.round(a * n * 10) / 10;
    const vide = Math.random() < 0.6;
    const m = vide ? n : Math.round(n / 2);
    const v = Math.round((b - a * m) * 10) / 10;
    const q = vide ? un([`Au bout de combien ${de(C.us)} n’en restera-t-il plus ?`, `Combien ${de(C.us)} faut-il pour arriver à 0 ?`]) : un([`Combien en restera-t-il (en ${C.uy}) au bout de ${m} ${C.us} ?`, `Que restera-t-il (en ${C.uy}) après ${m} ${C.us} ?`]);
    return court(
      `${C.t(a, b)} ${q}`,
      vide ? n : v,
      expl("ce qui diminue de la même quantité à chaque unité se modélise par f(x) = b − ax.", `f(x) = ${expr(-a, b)}.`, vide ? resout(-a, b, 0) : `f(${m}) = ${fr(b)} − ${fr(a)} × ${m} = ${fr(v)}.`, vide ? `au bout de ${n} ${C.us}.` : `il reste ${fr(v)} ${C.uy}.`),
    );
  }),

  // ★5 : seuil de rentabilité avec un prix décimal.
  P(33, 5, "Résous l’égalité des deux prix ; la réponse est le premier entier au-delà.", ["tarifs", "seuil", "decimal"], () => {
    const S = un(OFFRES.filter((o) => o.bZero));
    for (;;) {
      const aB = entre(6, 12);
      const aA = aB - un([1.5, 2.5, 3.5]);
      const bA = entre(12, 40);
      const xs = bA / (aB - aA);
      if (Number.isInteger(xs) || aA <= 1) continue;
      const n = Math.ceil(xs);
      return court(
        `${S.intro} ${S.A(aA, bA)} ${S.B(aB, 0)} ${un([`À partir de combien ${de(S.us)} a-t-on intérêt à prendre ${S.nomA} ?`,`Combien ${de(S.us)} au minimum pour que ${S.nomA} coûte moins ?`, `Dès combien ${de(S.us)} vaut-il mieux prendre ${S.nomA} ?`])}`,
        n,
        expl("une offre avec un coût fixe devient avantageuse quand son prix passe sous l’autre.", `on résout ${expr(aA, bA)} = ${expr(aB, 0)}.`, `${fr(aB - aA)}x = ${bA}, x ≈ ${fr(Math.round(xs * 100) / 100)}. Pour ${n - 1} : ${fr(aA * (n - 1) + bA)} € contre ${fr(aB * (n - 1))} €. Pour ${n} : ${fr(aA * n + bA)} € contre ${fr(aB * n)} €.`, `à partir de ${n} ${S.us}.`),
      );
    }
  }),

  // ★5 : deux mesures, une prévision.
  P(34, 5, "Calcule ce qui change par unité entre les deux mesures, puis prolonge.", ["deux_images", "prevoir"], () => {
    const CAS = [
      { t: (n1: number, y1: number, n2: number, y2: number) => `Une plante mesure ${y1} cm au bout de ${n1} semaines et ${y2} cm au bout de ${n2} semaines. Elle pousse régulièrement.`, u: "semaines", q: (n: number) => `Quelle sera sa taille (en cm) au bout de ${n} semaines ?` },
      { t: (n1: number, y1: number, n2: number, y2: number) => `Une cagnotte contient ${y1} € après ${n1} jours et ${y2} € après ${n2} jours. Elle augmente de la même somme chaque jour.`, u: "jours", q: (n: number) => `Combien contiendra-t-elle (en €) après ${n} jours ?` },
      { t: (n1: number, y1: number, n2: number, y2: number) => `Une chaîne vidéo a ${y1} abonnés au mois ${n1} et ${y2} au mois ${n2}. Elle en gagne autant chaque mois.`, u: "mois", q: (n: number) => `Combien d’abonnés aura-t-elle au mois ${n} ?` },
      { t: (n1: number, y1: number, n2: number, y2: number) => `Un ressort mesure ${y1} cm avec ${n1} masses accrochées et ${y2} cm avec ${n2} masses. L’allongement est régulier.`, u: "masses", q: (n: number) => `Quelle longueur (en cm) avec ${n} masses ?` },
      { t: (n1: number, y1: number, n2: number, y2: number) => `Un compteur d’eau indique ${y1} L après ${n1} minutes et ${y2} L après ${n2} minutes de remplissage.`, u: "minutes", q: (n: number) => `Quelle valeur indiquera-t-il après ${n} minutes ?` },
      { t: (n1: number, y1: number, n2: number, y2: number) => `Sur une piste cyclable, une cycliste passe la borne ${y1} km après ${n1} heures et la borne ${y2} km après ${n2} heures. Elle roule à vitesse constante.`, u: "heures", q: (n: number) => `Quelle borne passera-t-elle après ${n} heures ?` },
    ];
    const C = un(CAS);
    const a = entre(2, 9), b = entre(3, 30);
    const n1 = entre(2, 4), n2 = n1 + entre(2, 4), n3 = n2 + entre(3, 8);
    const y1 = a * n1 + b, y2 = a * n2 + b, y3 = a * n3 + b;
    return court(
      `${C.t(n1, y1, n2, y2)} ${C.q(n3)}`,
      y3,
      expl("une évolution régulière se modélise par une fonction affine f(x) = ax + b.", "on calcule a avec les deux mesures, puis b, puis la prévision.", `a = (${y2} − ${y1}) ÷ (${n2} − ${n1}) = ${a} ; b = ${y1} − ${a} × ${n1} = ${b} ; f(${n3}) = ${calc(a, b, n3)}.`, `${y3}.`),
    );
  }),

  // ★5 : économie sur une longue durée.
  P(35, 5, "Calcule les deux prix pour la quantité donnée, puis la différence.", ["tarifs", "economie"], () => {
    const S = un(OFFRES);
    const o = offresGrandes(S, Math.random() < 0.5);
    const n = Math.ceil(o.xs) + entre(2, 8);
    const pA = o.aA * n + o.bA, pB = o.aB * n + o.bB;
    return court(
      `${S.intro} ${S.A(o.aA, o.bA)} ${S.B(o.aB, o.bB)} ${un([`Pour ${n} ${S.us}, combien économise-t-on (en €) avec la meilleure offre ?`, `${un(PRENOMS)} prévoit ${n} ${S.us}. Quelle économie (en €) en choisissant bien ?`, `Quelle somme (en €) gagne-t-on à bien choisir pour ${n} ${S.us} ?`])}`,
      Math.abs(pA - pB),
      expl("comparer deux tarifs, c’est calculer les deux prix pour la même quantité.", `on calcule les deux prix pour ${n} ${S.us}, puis la différence.`, `${cap(S.nomA)} : ${calc(o.aA, o.bA, n)} € ; ${S.nomB} : ${calc(o.aB, o.bB, n)} €.`, `on économise ${Math.abs(pA - pB)} €.`),
    );
  }),

  /* ═════════════ affine_defi ★3 ═════════════ */

  // ★3 : Celsius → Fahrenheit.
  D(1, 3, "Remplace C dans F = 1,8 × C + 32.", ["celsius_fahrenheit", "image"], () => {
    const T = un(THERMO);
    const C = C5(T.min, T.max);
    const F = 1.8 * C + 32;
    return court(
      `${T.t} ${C} °C. ${FORMULE_F} ${un([`Combien cela fait-il en °F ?`, `Quelle est ${T.quoi} en °F ?`, `Convertis en degrés Fahrenheit.`, `Que lirait-on sur un thermomètre en °F ?`])}`,
      F,
      expl("la conversion F = 1,8C + 32 est une fonction affine de C.", `on remplace C par ${C}.`, `1,8 × ${par(C)} + 32 = ${fr(1.8 * C)} + 32 = ${fr(F)}.`, `${fr(F)} °F.`),
    );
  }),

  // ★3 : la droite parallèle.
  D(2, 3, "Parallèle = même coefficient a ; puis b se lit au point (0 ; b).", ["paralleles", "expression"], () => {
    const f = NOM();
    const a = sg() * entre(1, 4), b = sg() * entre(1, 6);
    let b2 = sg() * entre(1, 6);
    while (b2 === b) b2 = sg() * entre(1, 6);
    const g = f === "g" ? "h" : "g";
    const juste = `${g}(x) = ${expr(a, b2)}`;
    const text = un([
      `La droite de ${g} est parallèle à celle de ${f}(x) = ${expr(a, b)} et passe par ${pt(0, b2)}. Quelle est ${g} ?`,
      `${g} est affine. Sa droite passe par ${pt(0, b2)} et ne coupe jamais celle de ${f}(x) = ${expr(a, b)}. Quelle est ${g} ?`,
      `Trouve ${g} : sa droite est parallèle à celle de ${f}(x) = ${expr(a, b)} et coupe l’axe vertical en ${fr(b2)}.`,
    ]);
    const tirerDroite = Math.random() < 0.5 && lisible({ a, b }) && lisible({ a, b: b2 });
    return choix(
      text,
      juste,
      qcm(juste, [`${g}(x) = ${expr(a, b)}`, `${g}(x) = ${expr(b2, a)}`, `${g}(x) = ${expr(-a, b2)}`, `${g}(x) = ${expr(a, -b2)}`]),
      expl("deux droites de fonctions affines sont parallèles quand elles ont le même coefficient a.", `on garde a = ${fr(a)} ; la droite passe par ${pt(0, b2)}, donc b = ${fr(b2)}.`, `${g}(x) = ${expr(a, b2)}.`, `${juste}.`),
      tirerDroite ? figure([{ d: { a, b }, c: "#2563eb" }], FEN, { p: { x: 0, y: b2 } }) : undefined,
    );
  }),

  // ★3 : retrouver b pour que la droite passe par un point.
  D(3, 3, "Le point est sur la droite : remplace x et f(x) par ses coordonnées.", ["parametre", "point"], () => {
    const f = NOM();
    const a = sg() * entre(1, 5), b = sg() * entre(1, 8);
    const x = entre(1, 4);
    const y = a * x + b;
    const text = un([
      `${f}(x) = ${expr(a, 0)} + b. Sa droite passe par ${pt(x, y)}. Que vaut b ?`,
      `Quelle valeur de b fait passer la droite de ${f}(x) = ${expr(a, 0)} + b par ${pt(x, y)} ?`,
      `On veut que ${f}(${x}) = ${fr(y)}, avec ${f}(x) = ${expr(a, 0)} + b. Trouve b.`,
      `Le point ${pt(x, y)} est sur la droite de ${f}(x) = ${expr(a, 0)} + b. Calcule b.`,
    ]);
    return court(
      text,
      b,
      expl("un point (x ; y) est sur la droite de f quand f(x) = y.", `on écrit ${fr(a)} × ${x} + b = ${fr(y)}.`, `${fr(a * x)} + b = ${fr(y)}, donc b = ${fr(y)} − ${par(a * x)} = ${fr(b)}.`, `b = ${fr(b)}.`),
      Math.random() < 0.5 && dans(x, y) && lisible({ a, b }) ? figure([{ d: { a, b } }], FEN, { p: { x, y } }) : undefined,
    );
  }),

  /* ═════════════ affine_defi ★4 ═════════════ */

  // ★4 : Fahrenheit → Celsius.
  D(4, 4, "Résous 1,8 × C + 32 = F : retire 32, puis divise par 1,8.", ["celsius_fahrenheit", "antecedent"], () => {
    const T = un(THERMO);
    const C = C5(T.min, T.max);
    const F = 1.8 * C + 32;
    return court(
      `${T.t} ${fr(F)} °F. ${FORMULE_F} ${un([`Combien cela fait-il en °C ?`, `Quelle est ${T.quoi} en °C ?`, `Convertis en degrés Celsius.`, `Que lirait-on sur un thermomètre français ?`])}`,
      C,
      expl("la conversion F = 1,8C + 32 est une fonction affine : on cherche un antécédent.", `on résout 1,8C + 32 = ${fr(F)}.`, `1,8C = ${fr(F)} − 32 = ${fr(F - 32)}, puis C = ${fr(F - 32)} ÷ 1,8 = ${fr(C)}.`, `${fr(C)} °C.`),
    );
  }),

  // ★4 : retrouver a pour que la droite passe par un point.
  D(5, 4, "Remplace x et f(x) par les coordonnées du point, puis isole a.", ["parametre", "point"], () => {
    const f = NOM();
    const a = un([-4, -3, -2, -1, 1, 2, 3, 4, 0.5, -0.5, 1.5]);
    const x = a % 1 !== 0 ? 2 * entre(1, 3) : entre(1, 5);
    const b = sg() * entre(1, 7);
    const y = a * x + b;
    const text = un([
      `${f}(x) = ax ${b < 0 ? "−" : "+"} ${Math.abs(b)}. Sa droite passe par ${pt(x, y)}. Que vaut a ?`,
      `Quelle valeur de a fait passer la droite de ${f}(x) = ax ${b < 0 ? "−" : "+"} ${Math.abs(b)} par ${pt(x, y)} ?`,
      `On veut ${f}(${x}) = ${fr(y)} avec ${f}(x) = ax ${b < 0 ? "−" : "+"} ${Math.abs(b)}. Trouve a.`,
      `Le point ${pt(x, y)} est sur la droite de ${f}(x) = ax ${b < 0 ? "−" : "+"} ${Math.abs(b)}. Calcule a.`,
    ]);
    return court(
      text,
      a,
      expl("un point (x ; y) est sur la droite de f quand f(x) = y.", `on écrit a × ${x} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${fr(y)}.`, `${x}a = ${fr(y - b)}, donc a = ${fr(y - b)} ÷ ${x} = ${fr(a)}.`, `a = ${fr(a)}.`),
      Math.random() < 0.5 && dans(x, y) && lisible({ a, b }) ? figure([{ d: { a, b } }], FEN, { p: { x, y } }) : undefined,
    );
  }),

  // ★4 : prédire une valeur cachée dans un tableau de valeurs.
  D(6, 4, "Quand x augmente de 1, f(x) augmente toujours de a : trouve a, puis prolonge.", ["prevoir", "tableau"], () => {
    const f = NOM();
    const a = sg() * entre(2, 6), b = sg() * entre(1, 9);
    const x0 = entre(0, 2);
    const vals = [x0, x0 + 1, x0 + 2];
    const X = un([10, 12, 15, 20, 25, 50, 100]);
    const Y = a * X + b;
    const tab = vals.map((v) => `${f}(${v}) = ${fr(a * v + b)}`).join(" ; ");
    return court(
      `${f} est une fonction affine. ${tab}. ${un([`Que vaut ${f}(${X}) ?`, `Prévois la valeur cachée ${f}(${X}).`, `Sans tout calculer de proche en proche, trouve ${f}(${X}).`])}`,
      Y,
      expl("pour une fonction affine, quand x augmente de 1, f(x) change toujours de a.", "on lit a entre deux valeurs voisines, puis b = f(0), puis on calcule.", `a = ${fr(a * (x0 + 1) + b)} − ${par(a * x0 + b)} = ${fr(a)} ; b = ${fr(b)} ; ${f}(${X}) = ${calc(a, b, X)}.`, `${f}(${X}) = ${fr(Y)}.`),
    );
  }),

  // ★4 : programme de calcul piégé : quelle fonction ?
  D(7, 4, "Écris chaque étape avec x, sans oublier les parenthèses, puis développe.", ["programme", "expression"], () => {
    const a = entre(2, 5), b = entre(1, 7), c = entre(1, 9);
    const v = un([0, 1, 2]);
    let juste = "", faux: string[] = [], etapes = "", calcul = "";
    if (v === 0) {
      etapes = `ajouter ${b}, multiplier par ${a}, retirer ${c}`;
      juste = `f(x) = ${expr(a, a * b - c)}`;
      faux = [`f(x) = ${expr(a, b - c)}`, `f(x) = ${expr(a, a * b + c)}`, `f(x) = ${expr(1, a * b - c)}`, `f(x) = ${expr(a, b * c)}`];
      calcul = `(x + ${b}) × ${a} − ${c} = ${a}x + ${a * b} − ${c} = ${expr(a, a * b - c)}`;
    } else if (v === 1) {
      etapes = `multiplier par ${a}, ajouter ${b}, multiplier par ${c + 1}`;
      const k = c + 1;
      juste = `f(x) = ${expr(a * k, b * k)}`;
      faux = [`f(x) = ${expr(a * k, b)}`, `f(x) = ${expr(a + k, b)}`, `f(x) = ${expr(a, b * k)}`, `f(x) = ${expr(a * k, b + k)}`];
      calcul = `(${a}x + ${b}) × ${k} = ${expr(a * k, b * k)}`;
    } else {
      etapes = `retirer ${b}, multiplier par ${a}, ajouter le triple du nombre de départ`;
      juste = `f(x) = ${expr(a + 3, -a * b)}`;
      faux = [`f(x) = ${expr(a, -a * b)}`, `f(x) = ${expr(a + 3, -b)}`, `f(x) = ${expr(3 * a, -a * b)}`, `f(x) = ${expr(a + 3, a * b)}`];
      calcul = `(x − ${b}) × ${a} + 3x = ${a}x − ${a * b} + 3x = ${expr(a + 3, -a * b)}`;
    }
    return choix(
      `Programme : choisir un nombre x, ${etapes}. ${un([`Quelle fonction donne le résultat ?`, `Quelle fonction affine ce programme définit-il ?`, `Le résultat est f(x). Quelle est l’expression de f ?`])}`,
      juste,
      qcm(juste, faux),
      expl("un programme de calcul qui multiplie et ajoute définit une fonction affine.", "on écrit le programme avec x, avec des parenthèses, puis on développe.", calcul + ".", `${juste}.`),
    );
  }),

  // ★4 : deux droites parallèles : où se coupent-elles ?
  D(8, 4, "Compare les coefficients a avant de résoudre l’équation.", ["paralleles", "egalite"], () => {
    const [f, g] = PAIRE();
    const a = sg() * entre(1, 4);
    const paral = Math.random() < 0.55;
    const b1 = sg() * entre(1, 6);
    let b2 = sg() * entre(1, 6);
    while (b2 === b1) b2 = sg() * entre(1, 6);
    let a2 = a;
    if (!paral) {
      // un piège voisin : même b, a différent → point commun sur l'axe vertical
      a2 = -a;
      b2 = b1;
    }
    const JAMAIS = "nulle part : les droites sont parallèles";
    const juste = paral ? JAMAIS : `en ${pt(0, b1)}`;
    const text = un([
      `Où se coupent les droites de ${f}(x) = ${expr(a, b1)} et ${g}(x) = ${expr(a2, b2)} ?`,
      `En quel point les droites de ${f}(x) = ${expr(a, b1)} et de ${g}(x) = ${expr(a2, b2)} se croisent-elles ?`,
      `${f}(x) = ${expr(a, b1)} et ${g}(x) = ${expr(a2, b2)}. Quel est le point commun de leurs droites ?`,
    ]);
    const xf = paral ? (b2 - b1) : 1;
    return choix(
      text,
      juste,
      qcm(juste, [JAMAIS, `en ${pt(0, b1)}`, `en ${pt(0, b2)}`, `en ${pt(xf, a * xf + b1)}`, `en ${pt(b1, 0)}`]),
      expl("deux droites de même coefficient a (et de b différents) sont parallèles : elles ne se coupent pas.", paral ? `on compare : a = ${fr(a)} pour les deux.` : `les coefficients ${fr(a)} et ${fr(a2)} sont différents ; on résout ${expr(a, b1)} = ${expr(a2, b2)}.`, paral ? `${expr(a, b1)} = ${expr(a, b2)} donnerait ${fr(b1)} = ${fr(b2)} : impossible.` : `${expr(2 * a, 0)} = 0, donc x = 0 et y = ${fr(b1)}.`, paral ? "les droites ne se coupent jamais." : `elles se coupent en ${pt(0, b1)}.`),
      lisible({ a, b: b1 }) && lisible({ a: a2, b: b2 }) && Math.random() < 0.5 ? figure([{ d: { a, b: b1 }, c: COULEURS[0].hex }, { d: { a: a2, b: b2 }, c: COULEURS[1].hex }]) : undefined,
    );
  }),

  // ★4 : tableur : retrouver la formule à partir des valeurs.
  D(9, 4, "Regarde de combien B augmente quand A augmente de 1 : c’est le nombre devant A.", ["tableur", "expression"], () => {
    const a = sg() * entre(2, 6), b = sg() * entre(1, 9);
    const x0 = entre(0, 3);
    const xs = [x0, x0 + 1, x0 + 2, x0 + 3];
    const ys = xs.map((x) => a * x + b);
    const F = (p: number, q: number) => `=${fr(p)}*A2${q < 0 ? "−" : "+"}${fr(Math.abs(q))}`;
    const juste = F(a, b);
    return choix(
      `Dans un tableur, la colonne A contient ${xs.join(" ; ")} et la colonne B affiche ${ys.map(fr).join(" ; ")}. ${un([`Quelle formule a-t-on tapée en B2 ?`, `Quelle formule en B2, recopiée vers le bas, donne ces valeurs ?`, `Retrouve la formule de la cellule B2.`])}`,
      juste,
      qcm(juste, [F(b, a), F(a, -b), F(-a, b), F(a, ys[0]), F(ys[1] - ys[0] + 1, b)]),
      expl("la colonne B est une fonction affine de la colonne A : B = a × A + b.", "a = l’écart entre deux valeurs voisines de B ; b = la valeur de B pour A = 0.", `a = ${fr(ys[1])} − ${par(ys[0])} = ${fr(a)} ; b = ${fr(ys[0])} − ${par(a)} × ${x0} = ${fr(b)}.`, `on tape ${juste}.`),
    );
  }),

  // ★4 : trois droites et leur point commun.
  D(10, 4, "Le point commun vérifie les trois fonctions : teste-le dans chacune.", ["trois_droites", "graphique"], () => {
    for (;;) {
      const x0 = entre(-3, 3), y0 = entre(-4, 4);
      const as = melange([-3, -2, -1, 1, 2, 3]).slice(0, 3);
      const ds = as.map((a) => ({ a, b: y0 - a * x0 }));
      if (ds.some((d) => Math.abs(d.b) > 9 || !lisible(d)) || x0 === y0 || x0 === 0) continue;
      const juste = pt(x0, y0);
      const noms = ["f", "g", "h"];
      const defs = ds.map((d, i) => `${noms[i]}(x) = ${expr(d.a, d.b)}`).join(", ");
      return choix(
        `Les droites de ${defs} passent par un même point. ${un([`Lequel ?`, `Quel est ce point ?`, `Trouve ses coordonnées.`])}`,
        juste,
        qcm(juste, [pt(y0, x0), pt(-x0, y0), pt(x0, -y0), pt(0, ds[0].b), pt(x0 + 1, y0)]),
        expl("un point est commun à plusieurs droites quand il vérifie toutes les fonctions.", "on lit le point commun, puis on vérifie avec chaque fonction.", ds.map((d, i) => `${noms[i]}(${fr(x0)}) = ${calc(d.a, d.b, x0)}`).join(" ; ") + ".", `le point commun est ${juste}.`),
        figure(ds.map((d, i) => ({ d, c: COULEURS[i].hex }))),
      );
    }
  }),

  /* ═════════════ affine_defi ★5 ═════════════ */

  // ★5 : Celsius et Fahrenheit : un écart ou un rapport.
  D(11, 5, "Écris F = 1,8C + 32, puis traduis la condition en équation d’inconnue C.", ["celsius_fahrenheit", "equation"], () => {
    const cas = un([0, 1, 2, 2, 2]);
    if (cas === 0) {
      return court(
        `${FORMULE_F} ${un([`Pour quelle température le nombre en °C est-il égal au nombre en °F ?`, `Un thermomètre affiche le même nombre en °C et en °F. Lequel ?`, `Quelle température s’écrit avec le même nombre dans les deux unités ?`])}`,
        -40,
        expl("on cherche C tel que 1,8C + 32 = C.", "on regroupe les C d’un côté.", "0,8C = −32, donc C = −32 ÷ 0,8 = −40.", "−40 °C = −40 °F."),
      );
    }
    if (cas === 1) {
      return court(
        `${FORMULE_F} ${un([`Pour quelle température (en °C) le nombre en °F est-il le double du nombre en °C ?`, `Pour quel C a-t-on F = 2C ?`, `À quelle température en °C les °F valent-ils le double ?`])}`,
        160,
        expl("on cherche C tel que 1,8C + 32 = 2C.", "on regroupe les C d’un côté.", "32 = 0,2C, donc C = 32 ÷ 0,2 = 160.", "160 °C (soit 320 °F)."),
      );
    }
    const C = 5 * entre(1, 20);
    const ecart = 0.8 * C + 32;
    return court(
      `${FORMULE_F} ${un([`Le nombre en °F dépasse de ${fr(ecart)} celui en °C. Quelle est la température en °C ?`, `On a F − C = ${fr(ecart)}. Que vaut C ?`, `Une température en °F vaut ${fr(ecart)} de plus qu’en °C. Combien en °C ?`])}`,
      C,
      expl(`on cherche C tel que (1,8C + 32) − C = ${fr(ecart)}.`, "on réduit, puis on résout.", `0,8C + 32 = ${fr(ecart)}, donc 0,8C = ${fr(ecart - 32)}, puis C = ${fr(ecart - 32)} ÷ 0,8 = ${C}.`, `${C} °C.`),
    );
  }),

  // ★5 : faire passer une troisième droite par le point commun de deux autres.
  D(12, 5, "Trouve d’abord le point commun de f et g, puis écris que h passe par ce point.", ["trois_droites", "parametre"], () => {
    for (;;) {
      const x0 = entre(-3, 4), y0 = entre(-5, 8);
      const a1 = sg() * entre(1, 4), a2 = sg() * entre(1, 4), a3 = sg() * entre(1, 5);
      const b1 = y0 - a1 * x0, b2 = y0 - a2 * x0, b3 = y0 - a3 * x0;
      if (a1 === a2 || a3 === a1 || a3 === a2 || x0 === 0 || Math.abs(b1) > 9 || Math.abs(b2) > 9 || b1 === 0 || b2 === 0) continue;
      return court(
        `f(x) = ${expr(a1, b1)} et g(x) = ${expr(a2, b2)}. h(x) = ${expr(a3, 0)} + b. ${un([`Quelle valeur de b fait passer la droite de h par le point commun de f et g ?`, `Trouve b pour que les trois droites aient un point commun.`, `Pour quel b les droites de f, g et h se coupent-elles en un même point ?`])}`,
        b3,
        expl("un point commun aux trois droites vérifie f(x) = g(x) = h(x).", "on résout f(x) = g(x), puis on écrit h(x₀) = y₀.", `${expr(a1 - a2, 0)} = ${fr(b2 - b1)} donne x₀ = ${fr(x0)}, y₀ = ${fr(y0)} ; ${fr(a3)} × ${par(x0)} + b = ${fr(y0)}, donc b = ${fr(b3)}.`, `b = ${fr(b3)}.`),
        // Les droites de f et g dessinées : on peut lire leur point commun avant de calculer b.
        Math.random() < 0.6 && dans(x0, y0) && lisible({ a: a1, b: b1 }) && lisible({ a: a2, b: b2 })
          ? figure([{ d: { a: a1, b: b1 }, c: COULEURS[0].hex }, { d: { a: a2, b: b2 }, c: COULEURS[1].hex }])
          : undefined,
      );
    }
  }),

  // ★5 : la parallèle qui passe par un point donné.
  D(13, 5, "Même a que la droite donnée ; puis b avec le point : y = a × x + b.", ["paralleles", "point"], () => {
    const f = NOM();
    const g = f === "g" ? "h" : "g";
    const a = sg() * entre(1, 4), b = sg() * entre(1, 7);
    const x = entre(1, 4);
    let b2 = sg() * entre(1, 8);
    while (b2 === b) b2 = sg() * entre(1, 8);
    const y = a * x + b2;
    const juste = `${g}(x) = ${expr(a, b2)}`;
    return choix(
      `${un([`La droite de ${g} est parallèle à celle de ${f}(x) = ${expr(a, b)} et passe par ${pt(x, y)}.`, `${g} est affine ; sa droite passe par ${pt(x, y)} sans jamais couper celle de ${f}(x) = ${expr(a, b)}.`])} ${un([`Quelle est ${g} ?`, `Trouve l’expression de ${g}(x).`])}`,
      juste,
      qcm(juste, [`${g}(x) = ${expr(a, y)}`, `${g}(x) = ${expr(a, b)}`, `${g}(x) = ${expr(-a, y + a * x)}`, `${g}(x) = ${expr(a, y - x)}`].filter((c) => c !== juste)),
      expl("deux droites sont parallèles quand elles ont le même coefficient a.", `a = ${fr(a)} ; puis ${fr(a)} × ${x} + b = ${fr(y)}.`, `b = ${fr(y)} − ${par(a * x)} = ${fr(b2)}.`, `${juste}.`),
      // La droite de départ et le point : la parallèle reste à imaginer.
      Math.random() < 0.6 && dans(x, y) && lisible({ a, b }) ? figure([{ d: { a, b } }], FEN, { p: { x, y } }) : undefined,
    );
  }),

  // ★5 : deux images éloignées, une valeur très loin.
  D(14, 5, "a = écart des images ÷ écart des x ; puis b ; puis la valeur demandée.", ["prevoir", "deux_images"], () => {
    const f = NOM();
    const a = un([-4, -3, -2, 2, 3, 4, 5, 0.5, 1.5]), b = sg() * entre(1, 12);
    const x1 = a % 1 ? 2 * entre(1, 3) : entre(1, 5), x2 = x1 + (a % 1 ? 2 * entre(1, 3) : entre(2, 6));
    const X = un([20, 30, 40, 50, 100]);
    const y1 = a * x1 + b, y2 = a * x2 + b, Y = a * X + b;
    return court(
      `${f} est affine, ${f}(${x1}) = ${fr(y1)} et ${f}(${x2}) = ${fr(y2)}. ${un([`Que vaut ${f}(${X}) ?`, `Prévois ${f}(${X}).`, `Calcule la valeur cachée ${f}(${X}).`])}`,
      Y,
      expl("pour une fonction affine, a = (f(x₂) − f(x₁)) ÷ (x₂ − x₁).", "on calcule a, puis b, puis l’image demandée.", `a = (${fr(y2)} − ${par(y1)}) ÷ ${x2 - x1} = ${fr(a)} ; b = ${fr(y1)} − ${par(a)} × ${x1} = ${fr(b)} ; ${f}(${X}) = ${calc(a, b, X)}.`, `${f}(${X}) = ${fr(Y)}.`),
    );
  }),

  // ★5 : deux programmes, même résultat.
  D(15, 5, "Écris chaque programme comme une fonction de x, puis résous l’égalité.", ["programme", "egalite"], () => {
    for (;;) {
      const a1 = entre(2, 5), b1 = entre(1, 9), a2 = entre(2, 5), b2 = entre(1, 9);
      if (a1 === a2) continue;
      // A : × a1 puis + b1 ; B : + b2 puis × a2
      const num = a2 * b2 - b1, den = a1 - a2;
      const x = num / den;
      if (!Number.isInteger(x) || x === 0 || Math.abs(x) > 20) continue;
      return court(
        `Programme A : multiplier par ${a1}, puis ajouter ${b1}. Programme B : ajouter ${b2}, puis multiplier par ${a2}. ${un([`Quel nombre de départ donne le même résultat avec les deux ?`, `Pour quel nombre les deux programmes donnent-ils le même résultat ?`, `Trouve le nombre pour lequel A et B coïncident.`])}`,
        x,
        expl("chaque programme définit une fonction affine ; on cherche x tel que f(x) = g(x).", `A : f(x) = ${expr(a1, b1)} ; B : g(x) = ${a2}(x + ${b2}) = ${expr(a2, a2 * b2)}.`, `${expr(a1 - a2, 0)} = ${fr(num)}, donc x = ${fr(x)} ; les deux donnent ${fr(a1 * x + b1)}.`, `le nombre ${fr(x)}.`),
      );
    }
  }),

  // ★5 : le programme qui donne toujours le même résultat.
  D(16, 5, "Écris le programme avec x et développe : les x s’en vont.", ["programme", "piege"], () => {
    const k = entre(2, 6), b = entre(1, 9);
    const v = un([0, 1]);
    const etapes = v === 0 ? `ajouter ${b}, multiplier par ${k}, puis retirer ${k} fois le nombre de départ` : `multiplier par ${k}, ajouter ${k * b}, diviser par ${k}, puis retirer le nombre de départ`;
    const r = v === 0 ? k * b : b;
    return court(
      `Programme : choisir un nombre, ${etapes}. ${un([`Quel résultat obtient-on, quel que soit le nombre choisi ?`, `Le résultat ne dépend pas du nombre de départ. Lequel est-ce ?`, `Teste avec plusieurs nombres : que trouve-t-on toujours ?`])}`,
      r,
      expl("un programme qui donne f(x) = 0x + b est une fonction constante : le résultat ne dépend pas de x.", "on écrit le programme avec x, puis on développe.", v === 0 ? `(x + ${b}) × ${k} − ${k}x = ${k}x + ${k * b} − ${k}x = ${k * b}.` : `(${k}x + ${k * b}) ÷ ${k} − x = x + ${b} − x = ${b}.`, `on trouve toujours ${r}.`),
    );
  }),

  // ★5 : trois points alignés sur la droite d'une fonction affine.
  D(17, 5, "Trouve la fonction avec les deux premiers points, puis calcule l’image de l’abscisse du troisième.", ["alignes", "deux_images"], () => {
    const a = sg() * entre(1, 5), b = sg() * entre(1, 9);
    const x1 = entre(-2, 2), x2 = x1 + entre(1, 3), x3 = entre(6, 15);
    const y1 = a * x1 + b, y2 = a * x2 + b, y3 = a * x3 + b;
    const L = un([["A", "B", "C"], ["M", "N", "P"], ["R", "S", "T"]]);
    return court(
      `Les points ${L[0]}${pt(x1, y1)}, ${L[1]}${pt(x2, y2)} et ${L[2]}(${x3} ; y) sont sur la droite d’une même fonction affine. ${un([`Que vaut y ?`, `Calcule y.`, `Quelle est l’ordonnée de ${L[2]} ?`])}`,
      y3,
      expl("des points sur la droite d’une fonction affine vérifient tous y = ax + b.", `on calcule a et b avec ${L[0]} et ${L[1]}, puis l’image de ${x3}.`, `a = (${fr(y2)} − ${par(y1)}) ÷ ${x2 - x1} = ${fr(a)} ; b = ${fr(y1)} − ${par(a)} × ${par(x1)} = ${fr(b)} ; f(${x3}) = ${calc(a, b, x3)}.`, `y = ${fr(y3)}.`),
    );
  }),

  // ★5 : f(x + 1) − f(x) = a.
  D(18, 5, "Pour une fonction affine, f(x + 1) − f(x) vaut toujours a ; et f(0) = b.", ["variation", "image"], () => {
    const f = NOM();
    const a = sg() * entre(2, 7), b = sg() * entre(1, 9);
    const m = entre(2, 9);
    const X = un([10, 12, 15, 20]);
    return court(
      `${f} est affine. ${f}(${m + 1}) − ${f}(${m}) = ${fr(a)} et ${f}(0) = ${fr(b)}. ${un([`Que vaut ${f}(${X}) ?`, `Calcule ${f}(${X}).`, `Trouve ${f}(${X}).`])}`,
      a * X + b,
      expl("pour f(x) = ax + b, quand x augmente de 1, f(x) change de a ; et f(0) = b.", `a = ${fr(a)} et b = ${fr(b)}.`, `${f}(${X}) = ${calc(a, b, X)}.`, `${f}(${X}) = ${fr(a * X + b)}.`),
    );
  }),

  // ★5 : un paramètre pour que deux droites se coupent à une abscisse donnée.
  D(19, 5, "Au point commun, f(x) = g(x) : remplace x par la valeur donnée.", ["parametre", "egalite"], () => {
    for (;;) {
      const a1 = sg() * entre(1, 5), a2 = sg() * entre(1, 5), b2 = sg() * entre(1, 9);
      const x0 = sg() * entre(1, 4);
      if (a1 === a2) continue;
      const m = a2 * x0 + b2 - a1 * x0;
      if (m === 0 || Math.abs(m) > 20) continue;
      const [f, g] = PAIRE();
      return court(
        `${f}(x) = ${expr(a1, 0)} + m et ${g}(x) = ${expr(a2, b2)}. ${un([`Quelle valeur de m fait se couper les deux droites en x = ${fr(x0)} ?`, `Trouve m pour que ${f}(${fr(x0)}) = ${g}(${fr(x0)}).`, `Pour quel m les droites se croisent-elles au point d’abscisse ${fr(x0)} ?`])}`,
        m,
        expl("deux droites se coupent en x₀ quand f(x₀) = g(x₀).", `on calcule ${g}(${fr(x0)}), puis on résout ${fr(a1)} × ${par(x0)} + m = ${g}(${fr(x0)}).`, `${g}(${fr(x0)}) = ${calc(a2, b2, x0)} ; ${fr(a1 * x0)} + m = ${fr(a2 * x0 + b2)}, donc m = ${fr(m)}.`, `m = ${fr(m)}.`),
      );
    }
  }),

  // ★5 : lire la droite, puis prévoir une valeur hors de la figure.
  D(20, 5, "Lis b à l’axe vertical et a en avançant de 1, puis calcule l’image demandée.", ["prevoir", "graphique"], () => {
    for (;;) {
      const f = NOM();
      const a = sg() * entre(1, 3), b = sg() * entre(1, 5);
      if (!lisible({ a, b })) continue;
      const X = un([10, 15, 20, 30, 50, 100]);
      const Y = a * X + b;
      const cherche = Math.random() < 0.7;
      const k = un([20, 30, 40, 50, 60].map((v) => (a > 0 ? v : -v)));
      const Xk = (k - b) / a;
      if (!cherche && !Number.isInteger(Xk)) continue;
      return court(
        cherche
          ? `La droite tracée représente une fonction affine ${f}. ${un([`Que vaut ${f}(${X}) ?`, `Prévois ${f}(${X}), bien au-delà de la figure.`, `Sans prolonger le dessin, calcule ${f}(${X}).`])}`
          : `La droite tracée représente une fonction affine ${f}. ${un([`Pour quel x a-t-on ${f}(x) = ${fr(k)} ?`, `Quel nombre a pour image ${fr(k)} par ${f} ?`])}`,
        cherche ? Y : Xk,
        expl("la droite de f(x) = ax + b coupe l’axe vertical en (0 ; b) ; a est ce qu’on monte (ou descend) en avançant de 1.", "on lit a et b, on écrit f(x), puis on calcule.", cherche ? `b = ${fr(b)}, a = ${fr(a)}, donc ${f}(x) = ${expr(a, b)} et ${f}(${X}) = ${calc(a, b, X)}.` : `b = ${fr(b)}, a = ${fr(a)}, donc ${f}(x) = ${expr(a, b)} ; ${resout(a, b, k)}`, cherche ? `${f}(${X}) = ${fr(Y)}.` : `x = ${fr(Xk)}.`),
        figure([{ d: { a, b } }]),
      );
    }
  }),

  // ★5 : un paramètre pour que deux droites soient parallèles.
  D(21, 5, "Parallèles = même coefficient devant x : écris l’égalité des coefficients.", ["paralleles", "parametre"], () => {
    const [f, g] = PAIRE();
    const a = sg() * entre(1, 4), b = sg() * entre(1, 5);
    const k = un([1, 2, 3, 4, 5]);
    const signe = Math.random() < 0.5;
    const m = signe ? a + k : a - k;
    const coef = signe ? `(m − ${k})` : `(m + ${k})`;
    const b2 = sg() * entre(1, 7);
    return court(
      `${f}(x) = ${expr(a, b)} et ${g}(x) = ${coef}x ${b2 < 0 ? "−" : "+"} ${Math.abs(b2)}. ${un([`Pour quelle valeur de m leurs droites sont-elles parallèles ?`, `Trouve m pour que les deux droites ne se coupent jamais.`, `Quel m rend la droite de ${g} parallèle à celle de ${f} ?`])}`,
      m,
      expl("deux droites de fonctions affines sont parallèles quand leurs coefficients a sont égaux.", `on écrit ${coef} = ${fr(a)}.`, `m = ${fr(a)} ${signe ? "+" : "−"} ${k} = ${fr(m)}.`, `m = ${fr(m)}${b2 === b ? "" : " (les ordonnées à l’origine sont différentes : les droites ne sont pas confondues)"}.`),
      lisible({ a, b }) ? figure([{ d: { a, b }, c: COULEURS[1].hex }]) : undefined,
    );
  }),
];
