// lib/tutor-v4/questionBank/4e/maths/grandeurs.bank.ts
//
// ⭐ NOTION OUVERTE LE 28/08/2026 : `grandeur_composee`. Elle ferme DEUX trous du
// BO et complète DEUX partiels :
//   · 4e-C-grandeurs-1 « Notion de grandeur produit et de grandeur quotient » —
//     une vitesse était CALCULÉE dans `prop_probleme`, jamais NOMMÉE, et aucun
//     item du dépôt ne composait des unités ;
//   · 4e-C-grandeurs-6 « Vérifier la cohérence des résultats du point de vue des
//     unités » ;
//   · 4e-C-grandeurs-5, dont le mot « composées » n'était pas couvert ;
//   · 4e-C-grandeurs-7, où seuls les VOLUMES se convertissaient.
//
// ⭐ CE QUE LA NOTION ENSEIGNE TIENT EN UNE PHRASE : les unités ne SUIVENT pas
// le calcul, elles SE CALCULENT. Des mètres multipliés par des mètres donnent
// des mètres carrés ; des kilomètres divisés par des heures donnent des km/h.
// C'est la même idée que le k² des agrandissements, prise par l'autre bout.
//
// ⛔ POURQUOI LA CONVERSION EST ICI ET NON DANS « AIRES ». Rangée dans les
// aires, « 1 m² = 10 000 cm² » est une recette. Rangée ici, c'est une
// CONSÉQUENCE : si 1 m = 100 cm, alors 1 m² = 100 × 100 cm². L'élève ne
// mémorise plus un tableau, il refait le raisonnement — et il ne se trompe plus
// d'un facteur 100, l'erreur la plus fréquente sur les aires.
//
// ⭐ LA DERNIÈRE MICRO EST UN CONTRÔLE, PAS UN CALCUL. « 12 cm³ » ne peut pas
// être une aire ; « 5 m » ne peut pas être un volume. L'unité seule suffit à
// rejeter un résultat, et le BO en fait à juste titre une compétence à part.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux VALEURS PARTICULIÈRES :
// la définition des deux familles, et le facteur 10 000 entre le m² et le cm²,
// qui se retient parce qu'il surprend.
//
// ⛔⛔ 04/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Mesuré avant : 3 à 11
// squelettes d'énoncé par micro, 11 à 17 répétitions sur une série de 20. Chaque
// gabarit compose désormais une SITUATION (tables ci-dessous : appareils,
// véhicules, robinets, marchés, matériaux, pièces à carreler…) × une TOURNURE
// (3 ou 4 façons de poser la même question). Les conversions d'unités COMPOSÉES
// (km/h ↔ m/s, L/min ↔ L/h, g/cm³ ↔ kg/m³) ont leurs gabarits, avec des nombres
// qui tombent juste. Mesure : scripts/mesurer-squelettes-coach.ts 4e grandeur_composee.
// La Réunion reste UN contexte parmi d'autres (les letchis du marché de Saint-Paul).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { TableauDonneesCanvasData } from "@/lib/tutor-v4/types_canvas";

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

/** Arrondi qui efface les poussières du calcul flottant (2,7 × 1 000 = 2 700,000…01). */
const net = (x: number) => Math.round(x * 10000) / 10000;

/** 10000 → « 10 000 » ; 2.5 → « 2,5 » ; 0.0625 → « 0,0625 ». L'élève lit des nombres français. */
function fr(n: number): string {
  const x = net(n);
  return Number.isInteger(x)
    ? x.toLocaleString("fr-FR").replace(/[  ]/g, " ")
    : String(x).replace(".", ",");
}

/** La réponse attendue d'une question à saisir, UNITÉ COMPRISE quand l'énoncé en
 *  impose une (Frédéric, 06/10) : « 2,7 g/cm³ » d'abord. Suivent les écritures
 *  que le comparateur ne rapproche pas tout seul : le nombre nu quand l'unité a
 *  une barre (« 20 » pour « 20 km/h »), les milliers serrés (« 4200 m »), les
 *  exposants tapés en chiffres (« g/cm3 ») et l'unité en toutes lettres
 *  (« 15 minutes », « 54 euros »). « 2.7 » est accepté par le comparateur, qui
 *  lit la virgule et le point de la même façon. */
const EN_LETTRES: Record<string, string> = { "€": "euros", min: "minutes", h: "heures", s: "secondes", j: "jours" };
function attendu(x: number, u = ""): string[] {
  const f = fr(x);
  if (!u) return Array.from(new Set([f, f.replace(/ /g, "")]));
  const l = [`${f} ${u}`];
  if (u.includes("/") || f.includes(" ")) l.push(f);
  if (f.includes(" ")) l.push(`${f.replace(/ /g, "")} ${u}`);
  if (/[²³]/.test(u)) l.push(`${f} ${u.replace(/²/g, "2").replace(/³/g, "3")}`);
  if (EN_LETTRES[u]) l.push(`${f} ${EN_LETTRES[u]}`);
  return Array.from(new Set(l));
}

/* ---------------------------------------------------------------------------
   Petite grammaire : les tables écrivent leurs groupes nominaux AVEC l'article
   (« un four », « la vitesse du car », « l'eau »), ces fonctions font les
   contractions.
--------------------------------------------------------------------------- */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « le fer » → « du fer », « la cour » → « de la cour », « un four » → « d'un four ». */
function de(gn: string): string {
  if (gn.startsWith("le ")) return "du " + gn.slice(3);
  if (gn.startsWith("les ")) return "des " + gn.slice(4);
  if (/^(un|une) /.test(gn)) return "d'" + gn;
  return "de " + gn;
}
/** « le prix » → « au prix », « la durée » → « à la durée ». */
function a(gn: string): string {
  if (gn.startsWith("le ")) return "au " + gn.slice(3);
  if (gn.startsWith("les ")) return "aux " + gn.slice(4);
  return "à " + gn;
}
/** « de » devant un nom sans article, avec élision : « de pages », « d'euros ». */
const deNu = (n: string) => (/^[aeiouyéèêh]/i.test(n) ? "d'" + n : "de " + n);
/** Singulier sous 2 (« 1,8 euro »), pluriel à partir de 2 (« 12 euros »). */
const acc = (v: number, sing: string, plur: string) => (v >= 2 ? plur : sing);

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

/* ===========================================================================
   TABLES DE SITUATIONS
=========================================================================== */

// Les grandeurs QUOTIENT du quotidien : leur unité, ce qu'elles divisent, et
// les mots pour lire l'unité (« 60 kilomètres pour 1 heure »).
const QUOTIENTS = [
  { nom: "une vitesse", ex: "la vitesse d'un scooter", unite: "km/h", num: "des kilomètres", den: "des heures", numS: "kilomètre", numP: "kilomètres", denS: "heure", denP: "heures", valeurs: [25, 30, 40, 45], interp: true },
  { nom: "une vitesse", ex: "la vitesse d'un sprinteur", unite: "m/s", num: "des mètres", den: "des secondes", numS: "mètre", numP: "mètres", denS: "seconde", denP: "secondes", valeurs: [7, 8, 9, 10], interp: true },
  { nom: "un débit", ex: "le débit d'un robinet", unite: "L/min", num: "des litres", den: "des minutes", numS: "litre", numP: "litres", denS: "minute", denP: "minutes", valeurs: [6, 8, 10, 12], interp: true },
  { nom: "un débit", ex: "le débit d'une pompe de piscine", unite: "m³/h", num: "des mètres cubes", den: "des heures", numS: "mètre cube", numP: "mètres cubes", denS: "heure", denP: "heures", valeurs: [6, 8, 10, 12], interp: true },
  { nom: "un prix au kilo", ex: "le prix des cerises", unite: "€/kg", num: "des euros", den: "des kilogrammes", numS: "euro", numP: "euros", denS: "kilogramme", denP: "kilogrammes", valeurs: [6, 8, 9, 12], interp: true },
  { nom: "un prix au litre", ex: "le prix du gazole", unite: "€/L", num: "des euros", den: "des litres", numS: "euro", numP: "euros", denS: "litre", denP: "litres", valeurs: [1.7, 1.8, 1.9], interp: true },
  { nom: "une consommation", ex: "la consommation d'une voiture", unite: "L/100 km", num: "des litres", den: "des centaines de kilomètres", numS: "litre", numP: "litres", denS: "centaine de kilomètres", denP: "centaines de kilomètres", valeurs: [5, 6, 7], interp: false },
  { nom: "une masse volumique", ex: "la masse volumique du béton", unite: "kg/m³", num: "des kilogrammes", den: "des mètres cubes", numS: "kilogramme", numP: "kilogrammes", denS: "mètre cube", denP: "mètres cubes", valeurs: [2300, 2400], interp: true },
  { nom: "une masse volumique", ex: "la masse volumique du fer", unite: "g/cm³", num: "des grammes", den: "des centimètres cubes", numS: "gramme", numP: "grammes", denS: "centimètre cube", denP: "centimètres cubes", valeurs: [7.8, 7.9], interp: true },
  { nom: "un rendement", ex: "le rendement d'un champ de blé", unite: "t/ha", num: "des tonnes", den: "des hectares", numS: "tonne", numP: "tonnes", denS: "hectare", denP: "hectares", valeurs: [6, 7, 8], interp: true },
  { nom: "une densité de population", ex: "la densité de population d'une ville", unite: "hab/km²", num: "des habitants", den: "des kilomètres carrés", numS: "habitant", numP: "habitants", denS: "kilomètre carré", denP: "kilomètres carrés", valeurs: [150, 300, 1200, 3500], interp: true },
  { nom: "un salaire horaire", ex: "le salaire horaire d'un serveur", unite: "€/h", num: "des euros", den: "des heures", numS: "euro", numP: "euros", denS: "heure", denP: "heures", valeurs: [12, 13, 14], interp: true },
  { nom: "une cadence", ex: "la cadence d'une imprimante", unite: "pages/min", num: "des pages", den: "des minutes", numS: "page", numP: "pages", denS: "minute", denP: "minutes", valeurs: [20, 25, 30, 40], interp: true },
  { nom: "une fréquence cardiaque", ex: "la fréquence cardiaque d'un nageur au repos", unite: "battements/min", num: "des battements", den: "des minutes", numS: "battement", numP: "battements", denS: "minute", denP: "minutes", valeurs: [55, 60, 65], interp: true },
  { nom: "une vitesse de croissance", ex: "la vitesse de pousse d'un bambou", unite: "cm/j", num: "des centimètres", den: "des jours", numS: "centimètre", numP: "centimètres", denS: "jour", denP: "jours", valeurs: [20, 30, 40], interp: true },
  { nom: "un débit", ex: "le débit d'une connexion internet", unite: "Mo/s", num: "des mégaoctets", den: "des secondes", numS: "mégaoctet", numP: "mégaoctets", denS: "seconde", denP: "secondes", valeurs: [5, 10, 25, 50], interp: true },
  { nom: "un prix au mètre carré", ex: "le prix d'un terrain à bâtir", unite: "€/m²", num: "des euros", den: "des mètres carrés", numS: "euro", numP: "euros", denS: "mètre carré", denP: "mètres carrés", valeurs: [150, 200, 250], interp: true },
] as const;

// Les situations où l'on CALCULE un quotient : n ÷ d = q, avec q choisi d'abord
// pour que la division tombe juste.
type SituationQuotient = {
  q: readonly number[];
  d: readonly number[];
  donnee: (n: number, d: number) => string;   // commence par un article, sans majuscule
  donnees: (n: number, d: number) => string;  // les deux données « en tableau »
  cherche: string;                            // « la vitesse moyenne du car »
  quel: "Quel" | "Quelle";
  u: string; uInv: string; numU: string; denU: string;
  numNom: string; denS: string;               // « kilomètres », « heure »
};
const SITUATIONS_QUOTIENT: SituationQuotient[] = [
  { q: [45, 50, 60, 70, 80, 90], d: [2, 3, 4, 5], donnee: (n, d) => `un car parcourt ${fr(n)} km en ${d} heures`, donnees: (n, d) => `distance parcourue par le car : ${fr(n)} km ; durée du trajet : ${d} h`, cherche: "la vitesse moyenne du car", quel: "Quelle", u: "km/h", uInv: "h/km", numU: "km", denU: "h", numNom: "kilomètres", denS: "heure" },
  { q: [12, 14, 15, 16, 18, 20], d: [2, 3, 4], donnee: (n, d) => `une cycliste parcourt ${fr(n)} km en ${d} heures`, donnees: (n, d) => `distance parcourue par la cycliste : ${fr(n)} km ; durée de la sortie : ${d} h`, cherche: "la vitesse moyenne de la cycliste", quel: "Quelle", u: "km/h", uInv: "h/km", numU: "km", denU: "h", numNom: "kilomètres", denS: "heure" },
  { q: [3, 4, 5], d: [3, 4, 5, 6], donnee: (n, d) => `un randonneur marche ${fr(n)} km en ${d} heures`, donnees: (n, d) => `distance marchée : ${fr(n)} km ; durée de la randonnée : ${d} h`, cherche: "la vitesse moyenne du randonneur", quel: "Quelle", u: "km/h", uInv: "h/km", numU: "km", denU: "h", numNom: "kilomètres", denS: "heure" },
  { q: [240, 250, 280, 300], d: [2, 3], donnee: (n, d) => `un TGV parcourt ${fr(n)} km en ${d} heures`, donnees: (n, d) => `distance parcourue par le TGV : ${fr(n)} km ; durée du voyage : ${d} h`, cherche: "la vitesse moyenne du TGV", quel: "Quelle", u: "km/h", uInv: "h/km", numU: "km", denU: "h", numNom: "kilomètres", denS: "heure" },
  { q: [7, 8, 9, 10], d: [4, 5, 6, 10], donnee: (n, d) => `un sprinteur parcourt ${fr(n)} m en ${d} secondes`, donnees: (n, d) => `distance de la course : ${fr(n)} m ; temps du sprinteur : ${d} s`, cherche: "la vitesse moyenne du sprinteur", quel: "Quelle", u: "m/s", uInv: "s/m", numU: "m", denU: "s", numNom: "mètres", denS: "seconde" },
  { q: [6, 8, 10, 12], d: [3, 4, 5, 6], donnee: (n, d) => `un robinet laisse couler ${fr(n)} L en ${d} minutes`, donnees: (n, d) => `volume d'eau écoulé : ${fr(n)} L ; durée : ${d} min`, cherche: "le débit du robinet", quel: "Quel", u: "L/min", uInv: "min/L", numU: "L", denU: "min", numNom: "litres", denS: "minute" },
  { q: [6, 8, 10, 12], d: [2, 3, 4, 5], donnee: (n, d) => `une pompe de piscine fait passer ${fr(n)} m³ d'eau en ${d} heures`, donnees: (n, d) => `volume filtré par la pompe : ${fr(n)} m³ ; durée de filtration : ${d} h`, cherche: "le débit de la pompe", quel: "Quel", u: "m³/h", uInv: "h/m³", numU: "m³", denU: "h", numNom: "mètres cubes", denS: "heure" },
  { q: [15, 20, 25, 30], d: [2, 3, 4, 5], donnee: (n, d) => `une imprimante sort ${fr(n)} pages en ${d} minutes`, donnees: (n, d) => `pages imprimées : ${fr(n)} ; durée d'impression : ${d} min`, cherche: "la cadence de l'imprimante", quel: "Quelle", u: "pages/min", uInv: "min/page", numU: "pages", denU: "min", numNom: "pages", denS: "minute" },
  { q: [12, 13, 14, 15], d: [5, 6, 8, 10], donnee: (n, d) => `une animatrice de centre de loisirs gagne ${fr(n)} € pour ${d} heures de travail`, donnees: (n, d) => `somme gagnée par l'animatrice : ${fr(n)} € ; temps de travail : ${d} h`, cherche: "le salaire horaire de l'animatrice", quel: "Quel", u: "€/h", uInv: "h/€", numU: "€", denU: "h", numNom: "euros", denS: "heure" },
  { q: [80, 120, 150, 200, 250], d: [12, 15, 20, 24], donnee: (n, d) => `une commune compte ${fr(n)} habitants pour une superficie de ${d} km²`, donnees: (n, d) => `population de la commune : ${fr(n)} habitants ; superficie : ${d} km²`, cherche: "la densité de population de la commune", quel: "Quelle", u: "hab/km²", uInv: "km²/hab", numU: "hab", denU: "km²", numNom: "habitants", denS: "kilomètre carré" },
  { q: [2.7, 7.8, 8.9, 11.3], d: [10, 20, 50, 100], donnee: (n, d) => `une pièce métallique de ${d} cm³ a une masse de ${fr(n)} g`, donnees: (n, d) => `masse de la pièce : ${fr(n)} g ; volume de la pièce : ${d} cm³`, cherche: "la masse volumique de ce métal", quel: "Quelle", u: "g/cm³", uInv: "cm³/g", numU: "g", denU: "cm³", numNom: "grammes", denS: "centimètre cube" },
  { q: [6, 7, 8, 9], d: [3, 4, 5, 6], donnee: (n, d) => `un agriculteur récolte ${fr(n)} t de blé sur ${d} ha`, donnees: (n, d) => `récolte de blé : ${fr(n)} t ; surface du champ : ${d} ha`, cherche: "le rendement du champ", quel: "Quel", u: "t/ha", uInv: "ha/t", numU: "t", denU: "ha", numNom: "tonnes", denS: "hectare" },
  { q: [60, 70, 75, 80], d: [2, 3, 4], donnee: (n, d) => `le cœur d'un sportif au repos bat ${fr(n)} fois en ${d} minutes`, donnees: (n, d) => `nombre de battements : ${fr(n)} ; durée de la mesure : ${d} min`, cherche: "la fréquence cardiaque du sportif", quel: "Quelle", u: "battements/min", uInv: "min/battement", numU: "battements", denU: "min", numNom: "battements", denS: "minute" },
  { q: [400, 500, 600, 800], d: [2, 3, 5, 7], donnee: (n, d) => `une éolienne produit ${fr(n)} kWh en ${d} jours`, donnees: (n, d) => `énergie produite par l'éolienne : ${fr(n)} kWh ; durée : ${d} jours`, cherche: "la production moyenne de l'éolienne par jour", quel: "Quelle", u: "kWh/j", uInv: "j/kWh", numU: "kWh", denU: "j", numNom: "kilowattheures", denS: "jour" },
  { q: [20, 25, 30, 40], d: [2, 3, 4, 5], donnee: (n, d) => `une pousse de bambou grandit de ${fr(n)} cm en ${d} jours`, donnees: (n, d) => `croissance du bambou : ${fr(n)} cm ; durée d'observation : ${d} jours`, cherche: "la vitesse de croissance du bambou", quel: "Quelle", u: "cm/j", uInv: "j/cm", numU: "cm", denU: "j", numNom: "centimètres", denS: "jour" },
  { q: [5, 10, 20, 25], d: [4, 6, 8, 12], donnee: (n, d) => `un fichier de ${fr(n)} Mo se télécharge en ${d} secondes`, donnees: (n, d) => `taille du fichier : ${fr(n)} Mo ; durée du téléchargement : ${d} s`, cherche: "le débit de la connexion", quel: "Quel", u: "Mo/s", uInv: "s/Mo", numU: "Mo", denU: "s", numNom: "mégaoctets", denS: "seconde" },
];

function tirerQuotient(s: SituationQuotient) {
  const q = randomChoice(s.q);
  const d = randomChoice(s.d);
  return { q, d, n: net(q * d) };
}

// Les situations où l'on CALCULE un produit : a × b, avec l'unité qui se
// fabrique en même temps. Chaque famille a ses quatre tournures.
type CalculProduit = {
  a: number; ua: string; aNom: string;
  b: number; ub: string; bNom: string;
  res: number; u: string;
  cherche: string;            // « l'énergie consommée par un four »
  textes: string[];           // quatre tournures
  def: string;                // la grandeur produit en une phrase
  pieges: string[];           // deux unités fausses mais tentantes
};

const APPAREILS = [
  { gn: "un four", il: "il", P: [2, 2.5, 3], h: [1, 2, 3] },
  { gn: "un radiateur électrique", il: "il", P: [1, 1.5, 2], h: [6, 8, 10] },
  { gn: "une bouilloire", il: "elle", P: [2], h: [0.25, 0.5] },
  { gn: "un chauffe-eau", il: "il", P: [2, 3], h: [3, 4, 5] },
  { gn: "un lave-linge", il: "il", P: [2], h: [1, 1.5, 2] },
  { gn: "un climatiseur", il: "il", P: [1, 1.2, 1.5], h: [4, 5, 6] },
  { gn: "une borne de recharge", il: "elle", P: [7, 11], h: [2, 3, 4] },
  { gn: "une plaque de cuisson", il: "elle", P: [1.5, 2], h: [1, 2] },
  { gn: "un aspirateur", il: "il", P: [0.8, 1], h: [0.5, 1] },
] as const;

const SURFACES = [
  { gn: "un potager rectangulaire", il: "il", L: [4, 5, 6, 8], l: [2, 3] },
  { gn: "une terrasse rectangulaire", il: "elle", L: [5, 6, 8], l: [3, 4] },
  { gn: "une salle de classe rectangulaire", il: "elle", L: [8, 9, 10], l: [6, 7] },
  { gn: "un terrain de pétanque", il: "il", L: [12, 15], l: [3, 4] },
  { gn: "un parking rectangulaire", il: "il", L: [40, 50], l: [20, 30] },
  { gn: "une cour d'école rectangulaire", il: "elle", L: [25, 30], l: [15, 20] },
  { gn: "une piste de danse rectangulaire", il: "elle", L: [6, 8], l: [5, 6] },
] as const;

const MOBILES_PRODUIT = [
  { gn: "un train", il: "il", v: [80, 100, 120], h: [2, 3] },
  { gn: "une cycliste", il: "elle", v: [15, 18, 20], h: [2, 3, 4] },
  { gn: "un randonneur", il: "il", v: [4, 5], h: [3, 4, 5] },
  { gn: "un bateau de croisière", il: "il", v: [30, 35], h: [4, 6] },
  { gn: "une voiture", il: "elle", v: [70, 80, 90], h: [2, 3] },
  { gn: "un coureur", il: "il", v: [10, 12], h: [1, 2] },
] as const;

const ACHATS = [
  { le: "le tissu", part: "de tissu", u: "m", leU: "le mètre", uPrix: "€/m", pu: [8, 12, 15], q: [2, 3, 4] },
  { le: "l'essence", part: "d'essence", u: "L", leU: "le litre", uPrix: "€/L", pu: [1.8, 1.9], q: [20, 30, 40] },
  { le: "la pomme", part: "de pommes", u: "kg", leU: "le kilo", uPrix: "€/kg", pu: [2, 2.5, 3], q: [2, 3, 4] },
  { le: "le câble électrique", part: "de câble électrique", u: "m", leU: "le mètre", uPrix: "€/m", pu: [1.5, 2], q: [10, 20, 25] },
  { le: "la moquette", part: "de moquette", u: "m²", leU: "le mètre carré", uPrix: "€/m²", pu: [12, 15, 20], q: [10, 12, 15] },
] as const;

const CONTENANTS = [
  { gn: "une piscine", il: "elle", u: "m", A: [24, 32, 40], h: [1.5, 2] },
  { gn: "un aquarium", il: "il", u: "dm", A: [12, 15, 20], h: [3, 4] },
  { gn: "une cuve à eau de pluie", il: "elle", u: "m", A: [2, 3, 4], h: [1.5, 2] },
  { gn: "un bac à sable", il: "il", u: "m", A: [3, 4, 6], h: [0.5] },
] as const;

type Famille = () => CalculProduit;
const CALCULS_PRODUIT: Famille[] = [
  ...APPAREILS.map((ap): Famille => () => {
    const P = randomChoice(ap.P);
    const h = randomChoice(ap.h);
    const e = ap.il === "elle" ? "e" : "";
    return {
      a: P, ua: "kW", aNom: "la puissance (en kW)", b: h, ub: "h", bNom: "la durée (en h)",
      res: net(P * h), u: "kWh",
      cherche: `l'énergie consommée par ${ap.gn}`,
      textes: [
        `${cap(ap.gn)} de ${fr(P)} kW fonctionne pendant ${fr(h)} h. Quelle énergie consomme-t-${ap.il}, en kWh ?`,
        `Calcule l'énergie, en kWh, consommée par ${ap.gn} de ${fr(P)} kW allumé${e} pendant ${fr(h)} h.`,
        `Pendant ${fr(h)} h, ${ap.gn} de puissance ${fr(P)} kW reste allumé${e}. Combien de kWh consomme-t-${ap.il} ?`,
        `Puissance ${de(ap.gn)} : ${fr(P)} kW. Durée d'utilisation : ${fr(h)} h. Quelle énergie consomme-t-${ap.il}, en kWh ?`,
      ],
      def: "une énergie en kilowattheures est une grandeur PRODUIT : des kilowatts multipliés par des heures (kW × h = kWh)",
      pieges: ["kW/h", "h/kW"],
    };
  }),
  ...SURFACES.map((s): Famille => () => {
    const L = randomChoice(s.L);
    const l = randomChoice(s.l);
    return {
      a: L, ua: "m", aNom: "la longueur (en m)", b: l, ub: "m", bNom: "la largeur (en m)",
      res: L * l, u: "m²",
      cherche: `l'aire ${de(s.gn)}`,
      textes: [
        `${cap(s.gn)} mesure ${L} m sur ${l} m. Quelle est son aire, en m² ?`,
        `Calcule l'aire, en m², ${de(s.gn)} de ${L} m de long et ${l} m de large.`,
        `Longueur : ${L} m ; largeur : ${l} m. Quelle surface ${s.gn} occupe-t-${s.il} au sol, en m² ?`,
        `On veut connaître l'aire ${de(s.gn)} de ${l} m de large sur ${L} m de long. Combien de m² cela fait-il ?`,
      ],
      def: "une aire est une grandeur PRODUIT : des mètres multipliés par des mètres (m × m = m²)",
      pieges: ["m", "m³"],
    };
  }),
  ...MOBILES_PRODUIT.map((m): Famille => () => {
    const v = randomChoice(m.v);
    const h = randomChoice(m.h);
    return {
      a: v, ua: "km/h", aNom: "la vitesse (en km/h)", b: h, ub: "h", bNom: "la durée (en h)",
      res: v * h, u: "km",
      cherche: `la distance parcourue par ${m.gn}`,
      textes: [
        `${cap(m.gn)} avance à ${v} km/h pendant ${h} h. Quelle distance parcourt-${m.il}, en km ?`,
        `Calcule la distance, en km, parcourue en ${h} h par ${m.gn} qui va à ${v} km/h.`,
        `Vitesse moyenne ${de(m.gn)} : ${v} km/h. Durée du trajet : ${h} h. Combien de kilomètres parcourt-${m.il} ?`,
        `Pendant ${h} h, ${m.gn} garde une vitesse moyenne de ${v} km/h. Quelle distance parcourt-${m.il}, en km ?`,
      ],
      def: "une distance est ici le PRODUIT d'une vitesse par une durée : les heures du km/h se simplifient avec les heures de la durée (km/h × h = km)",
      pieges: ["km/h", "h"],
    };
  }),
  ...ACHATS.map((ac): Famille => () => {
    const pu = randomChoice(ac.pu);
    const q = randomChoice(ac.q);
    return {
      a: pu, ua: ac.uPrix, aNom: `le prix unitaire (en ${ac.uPrix})`, b: q, ub: ac.u, bNom: `la quantité (en ${ac.u})`,
      res: net(pu * q), u: "€",
      cherche: `le prix de ${q} ${ac.u} ${ac.part}`,
      textes: [
        `${cap(ac.le)} coûte ${fr(pu)} € ${ac.leU}. Combien paie-t-on pour ${q} ${ac.u} ?`,
        `Prix ${de(ac.le)} : ${fr(pu)} ${ac.uPrix}. Quel est le prix de ${q} ${ac.u} ${ac.part}, en euros ?`,
        `Calcule, en euros, le prix de ${q} ${ac.u} ${ac.part} à ${fr(pu)} € ${ac.leU}.`,
        `On achète ${q} ${ac.u} ${ac.part} à ${fr(pu)} ${ac.uPrix}. Combien paie-t-on, en euros ?`,
      ],
      def: `un prix total est le PRODUIT d'un prix unitaire par une quantité (${ac.uPrix} × ${ac.u} = €)`,
      pieges: [ac.uPrix, ac.u],
    };
  }),
  ...CONTENANTS.map((c): Famille => () => {
    const A = randomChoice(c.A);
    const h = randomChoice(c.h);
    return {
      a: A, ua: `${c.u}²`, aNom: `l'aire du fond (en ${c.u}²)`, b: h, ub: c.u, bNom: `la profondeur (en ${c.u})`,
      res: net(A * h), u: `${c.u}³`,
      cherche: `le volume ${de(c.gn)}`,
      textes: [
        `${cap(c.gn)} a un fond de ${A} ${c.u}² et une profondeur de ${fr(h)} ${c.u}. Quel est son volume, en ${c.u}³ ?`,
        `Calcule le volume, en ${c.u}³, ${de(c.gn)} dont le fond mesure ${A} ${c.u}² et la profondeur ${fr(h)} ${c.u}.`,
        `Aire du fond ${de(c.gn)} : ${A} ${c.u}². Profondeur : ${fr(h)} ${c.u}. Combien de ${c.u}³ peut-${c.il} contenir ?`,
        `Pour remplir ${c.gn} (fond de ${A} ${c.u}², profondeur de ${fr(h)} ${c.u}), quel volume faut-il, en ${c.u}³ ?`,
      ],
      def: `un volume est une grandeur PRODUIT : une aire multipliée par une longueur (${c.u}² × ${c.u} = ${c.u}³)`,
      pieges: [`${c.u}²`, c.u],
    };
  }),
];

// Ce qu'on mesure, et la famille à laquelle ça appartient.
const SITUATIONS_FAMILLE = [
  { gn: "l'énergie consommée par un four", f: true, unite: "kWh", famille: "produit", calcul: "des kilowatts × des heures" },
  { gn: "l'aire d'un potager", f: true, unite: "m²", famille: "produit", calcul: "des mètres × des mètres" },
  { gn: "le volume d'un aquarium", f: false, unite: "cm³", famille: "produit", calcul: "des centimètres × des centimètres × des centimètres" },
  { gn: "la surface d'un terrain de handball", f: true, unite: "m²", famille: "produit", calcul: "des mètres × des mètres" },
  { gn: "l'énergie produite par des panneaux solaires", f: true, unite: "kWh", famille: "produit", calcul: "des kilowatts × des heures" },
  { gn: "le volume d'un carton de déménagement", f: false, unite: "dm³", famille: "produit", calcul: "des décimètres × des décimètres × des décimètres" },
  { gn: "le volume d'une piscine", f: false, unite: "m³", famille: "produit", calcul: "des mètres × des mètres × des mètres" },
  { gn: "la surface d'un mur à peindre", f: true, unite: "m²", famille: "produit", calcul: "des mètres × des mètres" },
  { gn: "l'aire d'un panneau publicitaire", f: true, unite: "m²", famille: "produit", calcul: "des mètres × des mètres" },
  { gn: "la consommation électrique d'une console de jeux", f: true, unite: "kWh", famille: "produit", calcul: "des kilowatts × des heures" },
  { gn: "le volume de terre d'une jardinière", f: false, unite: "dm³", famille: "produit", calcul: "des décimètres × des décimètres × des décimètres" },
  { gn: "l'aire d'une feuille de papier", f: true, unite: "cm²", famille: "produit", calcul: "des centimètres × des centimètres" },
  { gn: "la vitesse d'un cycliste", f: true, unite: "km/h", famille: "quotient", calcul: "des kilomètres ÷ des heures" },
  { gn: "le débit d'un tuyau d'arrosage", f: false, unite: "L/min", famille: "quotient", calcul: "des litres ÷ des minutes" },
  { gn: "le prix du fromage au kilo", f: false, unite: "€/kg", famille: "quotient", calcul: "des euros ÷ des kilogrammes" },
  { gn: "la densité de population d'une ville", f: true, unite: "hab/km²", famille: "quotient", calcul: "des habitants ÷ des kilomètres carrés" },
  { gn: "la masse volumique de l'huile", f: true, unite: "g/cm³", famille: "quotient", calcul: "des grammes ÷ des centimètres cubes" },
  { gn: "le rendement d'un champ de maïs", f: false, unite: "t/ha", famille: "quotient", calcul: "des tonnes ÷ des hectares" },
] as const;

// Les unités que l'on FABRIQUE en multipliant ou en divisant.
const FABRIQUER_UNITE = [
  { ctx: "le débit d'une fontaine", a: "des litres", b: "des minutes", op: "÷", correct: "L/min", inverse: "min/L" },
  { ctx: "la vitesse d'un scooter", a: "des kilomètres", b: "des heures", op: "÷", correct: "km/h", inverse: "h/km" },
  { ctx: "le prix des tomates au kilo", a: "des euros", b: "des kilogrammes", op: "÷", correct: "€/kg", inverse: "kg/€" },
  { ctx: "l'aire d'un jardin", a: "des mètres", b: "des mètres", op: "×", correct: "m²", inverse: "m" },
  { ctx: "l'énergie consommée par un radiateur", a: "des kilowatts", b: "des heures", op: "×", correct: "kWh", inverse: "kW/h" },
  { ctx: "la masse volumique du béton", a: "des kilogrammes", b: "des mètres cubes", op: "÷", correct: "kg/m³", inverse: "m³/kg" },
  { ctx: "la vitesse d'un sprinteur", a: "des mètres", b: "des secondes", op: "÷", correct: "m/s", inverse: "s/m" },
  { ctx: "le prix du gazole", a: "des euros", b: "des litres", op: "÷", correct: "€/L", inverse: "L/€" },
  { ctx: "la densité de population d'un pays", a: "des habitants", b: "des kilomètres carrés", op: "÷", correct: "hab/km²", inverse: "km²/hab" },
  { ctx: "la masse volumique d'un métal", a: "des grammes", b: "des centimètres cubes", op: "÷", correct: "g/cm³", inverse: "cm³/g" },
  { ctx: "le volume d'une cuve", a: "des mètres carrés", b: "des mètres", op: "×", correct: "m³", inverse: "m²" },
  { ctx: "le salaire horaire d'un animateur", a: "des euros", b: "des heures", op: "÷", correct: "€/h", inverse: "h/€" },
  { ctx: "le rendement d'une parcelle de maïs", a: "des tonnes", b: "des hectares", op: "÷", correct: "t/ha", inverse: "ha/t" },
  { ctx: "la cadence d'une imprimante", a: "des pages", b: "des minutes", op: "÷", correct: "pages/min", inverse: "min/page" },
  { ctx: "le prix d'un appartement au mètre carré", a: "des euros", b: "des mètres carrés", op: "÷", correct: "€/m²", inverse: "m²/€" },
  { ctx: "la distance parcourue par un train", a: "des km/h", b: "des heures", op: "×", correct: "km", inverse: "km/h" },
  { ctx: "le débit d'une pompe", a: "des litres", b: "des heures", op: "÷", correct: "L/h", inverse: "h/L" },
] as const;
const UNITES_LEURRES = ["L/min", "km/h", "€/kg", "m²", "kWh", "kg/m³", "m/s", "m³", "€/h", "g/cm³", "km", "L/h"];

/* ===========================================================================
   LA BANQUE
=========================================================================== */

export const grandeursBank: TutorBankItemV4[] = [
  /* =========================================================================
     GRANDEUR_PRODUIT
  ========================================================================= */
  {
    // ⭐ VALEUR PARTICULIÈRE : la définition des deux familles. C'est le
    // vocabulaire du chapitre, et il ne se génère pas.
    kind: "fixed",
    id: "4e_grandeur_produit_fixed_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_produit",
    difficulty: 1,
    theme: "neutral",
    text: "Une aire s'obtient en multipliant deux longueurs. Comment appelle-t-on une telle grandeur ?",
    format: "qcm",
    choices: [
      "une grandeur produit",
      "une grandeur quotient",
      "une grandeur simple",
      "une proportion",
    ],
    expected: ["une grandeur produit"],
    comparator: "mcq_exact",
    hint: "Le nom vient de l'opération qui la fabrique.",
    explanation:
      "Définition : une grandeur PRODUIT s'obtient en multipliant deux grandeurs ; une grandeur QUOTIENT en divisant l'une par l'autre.\n\n" +
      "Méthode : on regarde l'opération qui la fabrique, pas ce qu'elle mesure.\n\n" +
      "Calcul : aire = longueur × largeur, donc c'est un produit. Vitesse = distance ÷ durée, donc c'est un quotient.\n\n" +
      "Conclusion : ⭐ et l'unité le dit toute seule — m² pour un produit, km/h pour un quotient. Le « carré » et la barre de fraction sont des traces de l'opération.",
    tags: ["grandeur", "produit", "definition", "valeur_particuliere", "qcm"],
  },
  {
    kind: "template",
    id: "4e_grandeur_produit_tpl_1_reconnaitre",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_produit",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde l'unité : un exposant ou un « fois » trahit un produit, une barre trahit un quotient.",
    tags: ["grandeur", "produit", "qcm", "template", "canvas"],
    generate: () => {
      const s = randomChoice(SITUATIONS_FAMILLE);
      const autre = randomChoice(SITUATIONS_FAMILLE.filter((x) => x.famille !== s.famille));
      const e = s.f ? "e" : "";
      const text = randomChoice([
        `${cap(s.gn)} se mesure en ${s.unite}. Est-ce une grandeur produit ou une grandeur quotient ?`,
        `On exprime ${s.gn} en ${s.unite}. De quelle famille de grandeurs s'agit-il ?`,
        `Dans un exercice, ${s.gn} est donné${e} en ${s.unite}. Grandeur produit ou grandeur quotient ?`,
        `Quelle sorte de grandeur est ${s.gn}, mesuré${e} en ${s.unite} ?`,
      ]);
      const correct = `une grandeur ${s.famille}`;
      const op = s.famille === "produit" ? "on multiplie" : "on divise";
      return {
        text,
        format: "qcm",
        choices: shuffle(["une grandeur produit", "une grandeur quotient"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une grandeur produit vient d'une multiplication ; une grandeur quotient vient d'une division.\n\n" +
          `Méthode : on regarde ce que fabrique l'unité ${s.unite} — ici ${s.calcul}.\n\n` +
          `Calcul : ${op}, donc ${s.gn} est ${correct}.\n\n` +
          `Conclusion : ⚠️ à ne pas confondre avec ${autre.gn}, en ${autre.unite}, qui est une grandeur ${autre.famille} (${autre.calcul}).`,
        canvas: tableau(
          ["grandeur", "unité", "opération"],
          [
            { values: [s.gn, s.unite, op] },
            { values: [autre.gn, autre.unite, autre.famille === "produit" ? "on multiplie" : "on divise"] },
          ],
          "l'unité trahit l'opération",
          { row: 0 }
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_produit_tpl_3_operation",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_produit",
    difficulty: 2,
    theme: "neutral",
    hint: "L'unité cherchée raconte l'opération : kWh = kW × h, m² = m × m.",
    tags: ["grandeur", "produit", "qcm", "template"],
    generate: () => {
      const c = randomChoice(CALCULS_PRODUIT)();
      const text = randomChoice([
        `Pour obtenir ${c.cherche}, en ${c.u}, que fait-on ?`,
        `${cap(c.cherche)} s'exprime en ${c.u}. Quel calcul permet de l'obtenir ?`,
        `Comment calcule-t-on ${c.cherche}, en ${c.u} ?`,
        `On cherche ${c.cherche}, en ${c.u}. Quelle opération faut-il poser ?`,
      ]);
      const correct = `on multiplie ${c.aNom} par ${c.bNom}`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `on divise ${c.aNom} par ${c.bNom}`,
          `on divise ${c.bNom} par ${c.aNom}`,
          `on additionne ${c.aNom} et ${c.bNom}`,
          `on soustrait ${c.bNom} ${a(c.aNom)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : ${c.def}.\n\n` +
          `Méthode : l'unité cherchée, ${c.u}, est fabriquée par une MULTIPLICATION : ${c.ua} × ${c.ub}.\n\n` +
          `Calcul : on multiplie donc ${c.aNom} par ${c.bNom}.\n\n` +
          "Conclusion : ⭐ diviser donnerait une unité avec une barre de fraction, additionner n'a aucun sens entre deux grandeurs différentes.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_produit_tpl_2_calculer",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_produit",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie les nombres ET les unités.",
    tags: ["grandeur", "produit", "energie", "template"],
    generate: () => {
      const c = randomChoice(CALCULS_PRODUIT)();
      return {
        text: randomChoice(c.textes),
        format: "short",
        expected: attendu(c.res, c.u),
        comparator: "number_equal",
        explanation:
          `Définition : ${c.def}.\n\n` +
          "Méthode : on multiplie les nombres, et l'unité se fabrique en même temps.\n\n" +
          `Calcul : ${fr(c.a)} ${c.ua} × ${fr(c.b)} ${c.ub} = ${fr(c.res)} ${c.u}.\n\n` +
          `Conclusion : ${c.cherche} vaut ${fr(c.res)} ${c.u}. ⭐ Le nom de l'unité RACONTE le calcul.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_produit_tpl_4_unite_resultat",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_produit",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie les nombres, puis multiplie les unités.",
    tags: ["grandeur", "produit", "unite", "qcm", "template"],
    generate: () => {
      const c = randomChoice(CALCULS_PRODUIT)();
      const text = randomChoice([
        `On multiplie ${fr(c.a)} ${c.ua} par ${fr(c.b)} ${c.ub} pour trouver ${c.cherche}. Quel est le résultat, unité comprise ?`,
        `Pour calculer ${c.cherche}, on pose ${fr(c.a)} ${c.ua} × ${fr(c.b)} ${c.ub}. Quel résultat écrit-on ?`,
        `${cap(c.cherche)} : ${fr(c.a)} ${c.ua} × ${fr(c.b)} ${c.ub} = ? Choisis le nombre ET l'unité.`,
      ]);
      const correct = `${fr(c.res)} ${c.u}`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${fr(c.res)} ${c.pieges[0]}`,
          `${fr(c.res)} ${c.pieges[1]}`,
          `${fr(c.a + c.b)} ${c.u}`,
          `${fr(c.res)} ${c.ua}`,
          `${fr(c.res)} ${c.ub}`,
          `${fr(c.res * 10)} ${c.u}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : ${c.def}.\n\n` +
          "Méthode : on multiplie les nombres entre eux ET les unités entre elles.\n\n" +
          `Calcul : ${fr(c.a)} × ${fr(c.b)} = ${fr(c.res)} et ${c.ua} × ${c.ub} = ${c.u}.\n\n` +
          `Conclusion : ${correct}. ⚠️ ${fr(c.res)} ${c.pieges[0]} a le bon nombre mais la mauvaise unité : le résultat ne veut plus rien dire.`,
      };
    },
  },

  /* =========================================================================
     GRANDEUR_QUOTIENT
  ========================================================================= */
  {
    kind: "template",
    id: "4e_grandeur_quotient_tpl_1_calculer",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "On divise ce qui est en haut de l'unité par ce qui est en bas.",
    tags: ["grandeur", "quotient", "vitesse", "template"],
    generate: () => {
      const s = randomChoice(SITUATIONS_QUOTIENT);
      const { q, d, n } = tirerQuotient(s);
      const text = randomChoice([
        `${cap(s.donnee(n, d))}. ${s.quel} est ${s.cherche}, en ${s.u} ?`,
        `${cap(s.donnee(n, d))}. Calcule ${s.cherche}, en ${s.u}.`,
        `Si ${s.donnee(n, d)}, ${s.quel.toLowerCase()} est ${s.cherche}, en ${s.u} ?`,
        `${cap(s.donnees(n, d))}. ${s.quel} est ${s.cherche}, en ${s.u} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: attendu(q, s.u),
        comparator: "number_equal",
        explanation:
          `Définition : ${s.cherche} est une grandeur QUOTIENT, en ${s.u}.\n\n` +
          `Méthode : ⭐ l'unité dit le calcul. « ${s.u} » se lit « ${s.numNom} par ${s.denS} », donc on divise les ${s.numU} par les ${s.denU}.\n\n` +
          `Calcul : ${fr(n)} ÷ ${fr(d)} = ${fr(q)} ${s.u}.\n\n` +
          `Conclusion : cela signifie ${fr(q)} ${s.numNom} pour 1 ${s.denS} — et c'est une MOYENNE.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_quotient_tpl_2_reconnaitre",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "La barre de l'unité se lit « par ».",
    tags: ["grandeur", "quotient", "qcm", "template", "canvas"],
    generate: () => {
      const q = randomChoice(QUOTIENTS);
      const correct = `${q.num} ÷ ${q.den}`;
      const lu = `${q.numP} par ${q.denS}`;
      const text = randomChoice([
        `${cap(q.nom)} se mesure en ${q.unite}. Que divise-t-on par quoi ?`,
        `L'unité ${q.unite} est celle ${de(q.nom)}. Quelle division la fabrique ?`,
        `Pour calculer ${q.ex}, en ${q.unite}, quelle division pose-t-on ?`,
        `On veut exprimer ${q.ex} en ${q.unite}. Que faut-il diviser, et par quoi ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${q.den} ÷ ${q.num}`,
          `${q.num} × ${q.den}`,
          `${q.num} + ${q.den}`,
          `${q.den} × ${q.num}`,
          `${q.num} ÷ 100`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans une unité composée, la barre se lit « par ».\n\n" +
          `Méthode : « ${q.unite} » se lit donc « ${lu} ».\n\n` +
          `Calcul : on divise ${q.num} par ${q.den}.\n\n` +
          "Conclusion : ⚠️ inverser les deux donne une autre grandeur, qui existe parfois et ne veut pas dire la même chose — h/km mesurerait le temps mis pour un kilomètre.",
        canvas: tableau(
          ["unité", "se lit", "on divise"],
          [{ values: [q.unite, lu, `${q.num} ÷ ${q.den}`] }],
          "la barre se lit « par »"
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_quotient_tpl_3_prix",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "Le prix unitaire se trouve en divisant le prix payé par la quantité.",
    tags: ["grandeur", "quotient", "prix", "template"],
    generate: () => {
      const p = randomChoice([
        { lieu: "au marché de Saint-Paul", part: "de letchis", u: "kg", par: "au kilo", unite: "€/kg", un: "un kilo de letchis", pu: [4, 5, 6, 8], q: [2, 3, 4] },
        { lieu: "chez le primeur", part: "de pommes", u: "kg", par: "au kilo", unite: "€/kg", un: "un kilo de pommes", pu: [2, 2.5, 3, 3.5], q: [2, 3, 4, 5] },
        { lieu: "à la fromagerie", part: "de comté", u: "kg", par: "au kilo", unite: "€/kg", un: "un kilo de comté", pu: [18, 20, 24], q: [2, 3] },
        { lieu: "à la mercerie", part: "de tissu", u: "m", par: "au mètre", unite: "€/m", un: "un mètre de tissu", pu: [6, 8, 12, 15], q: [2, 3, 4, 5] },
        { lieu: "à la station-service", part: "d'essence", u: "L", par: "au litre", unite: "€/L", un: "un litre d'essence", pu: [1.8, 1.9], q: [20, 30, 40, 50] },
        { lieu: "à l'épicerie en vrac", part: "de jus de pomme", u: "L", par: "au litre", unite: "€/L", un: "un litre de jus de pomme", pu: [2, 2.5, 3], q: [2, 4, 6] },
        { lieu: "au magasin de bricolage", part: "de moquette", u: "m²", par: "au mètre carré", unite: "€/m²", un: "un mètre carré de moquette", pu: [12, 15, 20], q: [8, 10, 12, 15] },
        { lieu: "à la base nautique", part: "de location de kayak", u: "h", par: "à l'heure", unite: "€/h", un: "une heure de location", pu: [8, 10, 12], q: [2, 3, 4] },
        { lieu: "au parking de la gare", part: "de stationnement", u: "h", par: "à l'heure", unite: "€/h", un: "une heure de stationnement", pu: [1.5, 2, 2.5], q: [2, 3, 4, 6] },
        { lieu: "sur le marché", part: "de cerises", u: "kg", par: "au kilo", unite: "€/kg", un: "un kilo de cerises", pu: [6, 8, 9], q: [2, 3] },
        { lieu: "chez le torréfacteur", part: "de café en grains", u: "kg", par: "au kilo", unite: "€/kg", un: "un kilo de café", pu: [14, 16, 18], q: [2, 3] },
        { lieu: "chez l'électricien", part: "de câble", u: "m", par: "au mètre", unite: "€/m", un: "un mètre de câble", pu: [1.5, 2, 3], q: [10, 20, 25] },
        { lieu: "à la jardinerie", part: "de gazon en rouleaux", u: "m²", par: "au mètre carré", unite: "€/m²", un: "un mètre carré de gazon", pu: [4, 5, 6], q: [10, 20, 30] },
        { lieu: "au moulin", part: "de farine", u: "kg", par: "au kilo", unite: "€/kg", un: "un kilo de farine", pu: [1.5, 2, 2.5], q: [2, 4, 5] },
        { lieu: "à l'école de musique", part: "de cours de guitare", u: "h", par: "à l'heure", unite: "€/h", un: "une heure de cours", pu: [20, 25, 30], q: [2, 3, 4] },
      ]);
      const pu = randomChoice(p.pu);
      const qte = randomChoice(p.q);
      const total = net(pu * qte);
      const k = Math.floor(Math.random() * 4);
      const text = [
        `${cap(p.lieu)}, ${qte} ${p.u} ${p.part} coûtent ${fr(total)} €. Quel est le prix ${p.par}, en ${p.unite} ?`,
        `On paie ${fr(total)} € pour ${qte} ${p.u} ${p.part} ${p.lieu}. Calcule le prix ${p.par}, en ${p.unite}.`,
        `${cap(p.lieu)}, la facture s'élève à ${fr(total)} € pour ${qte} ${p.u} ${p.part}. Combien coûte ${p.un}, en euros ?`,
        `Prix payé ${p.lieu} : ${fr(total)} € ; quantité : ${qte} ${p.u} ${p.part}. Quel est le prix ${p.par}, en ${p.unite} ?`,
      ][k];
      return {
        text,
        format: "short",
        // « en euros » : la réponse est un prix en € ; sinon dans l'unité demandée (€/kg…).
        expected: attendu(pu, k === 2 ? "€" : p.unite),
        comparator: "number_equal",
        explanation:
          `Définition : un prix ${p.par} est une grandeur quotient, en ${p.unite}.\n\n` +
          `Méthode : l'unité dit le calcul — des euros PAR ${p.u}, donc on divise les euros par la quantité.\n\n` +
          `Calcul : ${fr(total)} ÷ ${qte} = ${fr(pu)} ${p.unite}.\n\n` +
          "Conclusion : ⭐ c'est le quotient le plus utile du quotidien — il permet de comparer deux offres dont les quantités ne sont pas les mêmes.",
      };
    },
  },

  /* =========================================================================
     GRANDEUR_UNITE_COMPOSEE — l'unité se fabrique avec le calcul
  ========================================================================= */
  {
    kind: "template",
    id: "4e_grandeur_unite_composee_tpl_1_trouver",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_unite_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "L'unité subit la même opération que les nombres.",
    tags: ["grandeur", "unite", "qcm", "template"],
    generate: () => {
      const cas = randomChoice(FABRIQUER_UNITE);
      const divise = cas.op === "÷";
      const text = randomChoice([
        `Pour ${cas.ctx}, on ${divise ? "divise" : "multiplie"} ${cas.a} par ${cas.b}. Quelle est l'unité du résultat ?`,
        `${cap(cas.ctx)} s'obtient en ${divise ? "divisant" : "multipliant"} ${cas.a} par ${cas.b}. Dans quelle unité l'exprime-t-on ?`,
        `On ${divise ? "divise" : "multiplie"} ${cas.a} par ${cas.b} pour obtenir ${cas.ctx}. Quelle unité écrit-on à côté du résultat ?`,
        `${cap(cas.ctx)} = ${cas.a} ${cas.op} ${cas.b}. Quelle est l'unité du résultat ?`,
      ]);
      const autres = shuffle(UNITES_LEURRES.filter((u) => u !== cas.correct && u !== cas.inverse)).slice(0, 2);
      return {
        text,
        format: "qcm",
        choices: shuffle([cas.correct, cas.inverse, ...autres]),
        expected: [cas.correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'unité subit la MÊME opération que les nombres.\n\n" +
          `Méthode : ${divise ? "diviser" : "multiplier"} ${cas.a} par ${cas.b} donne une unité ${divise ? "en barre de fraction" : "en produit"}.\n\n` +
          `Calcul : ${cas.ctx} se mesure en ${cas.correct}.\n\n` +
          `Conclusion : ⚠️ ${cas.inverse} est le piège : ce n'est pas l'unité de ce calcul. ⭐ C'est pour ça qu'on écrit l'unité À CHAQUE LIGNE : elle se transforme avec le calcul et prévient quand on s'est trompé d'opération.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_unite_composee_tpl_2_interpreter",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_unite_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "« Par » veut dire « pour une unité de ».",
    tags: ["grandeur", "unite", "qcm", "template"],
    generate: () => {
      const q = randomChoice(QUOTIENTS.filter((x) => x.interp));
      const v = randomChoice(q.valeurs);
      const num = acc(v, q.numS, q.numP);
      const den = acc(v, q.denS, q.denP);
      const correct = `${fr(v)} ${num} pour 1 ${q.denS}`;
      const text = randomChoice([
        `${cap(q.ex)} vaut ${fr(v)} ${q.unite}. Que signifie cette mesure ?`,
        `On lit sur une fiche : « ${q.ex} : ${fr(v)} ${q.unite} ». Que veut dire ce nombre ?`,
        `${cap(q.ex)} est de ${fr(v)} ${q.unite}. Comment le dire en mots ?`,
        `Que signifie « ${fr(v)} ${q.unite} » pour ${q.ex} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `1 ${q.numS} pour ${fr(v)} ${den}`,
          `${fr(v)} ${den} pour 1 ${q.numS}`,
          `${fr(v)} ${num} en tout`,
          `${fr(v)} ${den} en tout`,
          `${fr(v)} fois plus ${deNu(q.numP)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la barre d'une unité composée se lit « par », c'est-à-dire « POUR UN(E) ».\n\n" +
          `Méthode : ${q.unite} se lit « ${q.numP} par ${q.denS} ».\n\n` +
          `Calcul : ${fr(v)} ${q.unite} signifie ${correct}.\n\n` +
          "Conclusion : ⚠️ inverser les deux est l'erreur classique, et elle change complètement le sens de la mesure.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_unite_composee_tpl_3_calculer_avec_unite",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_unite_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "Divise les nombres, puis écris l'unité du haut sur l'unité du bas.",
    tags: ["grandeur", "unite", "quotient", "qcm", "template"],
    generate: () => {
      const s = randomChoice(SITUATIONS_QUOTIENT);
      const { q, d, n } = tirerQuotient(s);
      const text = randomChoice([
        `${cap(s.donnee(n, d))}. On calcule ${fr(n)} ÷ ${fr(d)}. Quel résultat écrit-on, unité comprise ?`,
        `Pour obtenir ${s.cherche}, on divise ${fr(n)} ${s.numU} par ${fr(d)} ${s.denU}. Quel est le résultat, avec son unité ?`,
        `${cap(s.donnee(n, d))}. ${s.quel} est ${s.cherche} ? Choisis le nombre ET l'unité.`,
      ]);
      const correct = `${fr(q)} ${s.u}`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${fr(q)} ${s.uInv}`,
          `${fr(n * d)} ${s.u}`,
          `${fr(q)} ${s.numU}`,
          `${fr(q)} ${s.denU}`,
          `${fr(n - d)} ${s.u}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : quand on divise deux grandeurs, on divise aussi leurs unités.\n\n" +
          `Méthode : des ${s.numU} divisés par des ${s.denU} donnent des ${s.u}.\n\n` +
          `Calcul : ${fr(n)} ÷ ${fr(d)} = ${fr(q)}, donc ${correct}.\n\n` +
          `Conclusion : ⚠️ ${fr(q)} ${s.uInv} a le bon nombre mais l'unité retournée : ce serait le contraire de ce qu'on cherche.`,
      };
    },
  },

  /* =========================================================================
     GRANDEUR_CONVERTIR — ⭐ une conséquence, pas une recette
  ========================================================================= */
  {
    // ⭐ VALEUR PARTICULIÈRE, ET ELLE SURPREND : 1 m² ne vaut pas 100 cm² mais
    // 10 000. Le facteur se retient parce qu'il contredit l'intuition, et il se
    // DÉMONTRE en une ligne — c'est ce que fait l'explication.
    kind: "fixed",
    id: "4e_grandeur_convertir_fixed_metre_carre",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de cm² y a-t-il dans 1 m² ?",
    format: "qcm",
    choices: ["100", "1 000", "10 000", "1 000 000"],
    expected: ["10 000"],
    comparator: "mcq_exact",
    hint: "Un carré de 1 m de côté fait 100 cm sur 100 cm.",
    explanation:
      "Définition : une aire est un produit de deux longueurs, donc sa conversion applique DEUX FOIS celle des longueurs.\n\n" +
      "Méthode : on ne retient pas un tableau, on refait le raisonnement.\n\n" +
      "Calcul : 1 m = 100 cm, donc 1 m² = 100 cm × 100 cm = 10 000 cm².\n\n" +
      "Conclusion : ⚠️ répondre 100 est l'erreur la plus fréquente sur les aires — c'est le facteur des LONGUEURS, appliqué une seule fois. Pour les volumes, ce serait trois fois : 1 m³ = 1 000 000 cm³.",
    canvas: {
      kind: "tableau_donnees",
      headers: ["grandeur", "de m à cm", "facteur"],
      rows: [
        { values: ["longueur", "× 100", "100"] },
        { values: ["aire", "× 100 × 100", "10 000"] },
        { values: ["volume", "× 100 × 100 × 100", "1 000 000"] },
      ],
      highlight: { row: 1 },
      caption: "une dimension de plus, un facteur 100 de plus",
      display: { compact: true, striped: true },
    },
    tags: ["grandeur", "convertir", "aire", "valeur_particuliere", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "4e_grandeur_convertir_tpl_1_longueur",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Combien de petites unités dans une grande ? On multiplie par ce nombre.",
    tags: ["grandeur", "convertir", "longueur", "template"],
    generate: () => {
      const c = randomChoice([
        { objet: "une corde à sauter", verbe: "mesure", de: "m", vers: "cm", versNom: "centimètres", f: 100, v: [2, 2.5, 2.8] },
        { objet: "une planche de surf", verbe: "mesure", de: "m", vers: "cm", versNom: "centimètres", f: 100, v: [1.8, 2.1, 2.4] },
        { objet: "une table de cuisine", verbe: "mesure", de: "m", vers: "cm", versNom: "centimètres", f: 100, v: [1.2, 1.6, 1.8] },
        { objet: "un parcours de trail", verbe: "mesure", de: "km", vers: "m", versNom: "mètres", f: 1000, v: [12, 18.5, 24] },
        { objet: "une piste cyclable", verbe: "mesure", de: "km", vers: "m", versNom: "mètres", f: 1000, v: [3.5, 4.2, 7] },
        { objet: "un semi-marathon", verbe: "mesure", de: "km", vers: "m", versNom: "mètres", f: 1000, v: [21.1] },
        { objet: "une vis", verbe: "mesure", de: "cm", vers: "mm", versNom: "millimètres", f: 10, v: [2.5, 3, 4.5] },
        { objet: "un crayon", verbe: "mesure", de: "cm", vers: "mm", versNom: "millimètres", f: 10, v: [12, 15.5, 17] },
        { objet: "une fourmi", verbe: "mesure", de: "cm", vers: "mm", versNom: "millimètres", f: 10, v: [0.5, 0.6, 0.8] },
        { objet: "un sac de farine", verbe: "pèse", de: "kg", vers: "g", versNom: "grammes", f: 1000, v: [1.5, 2, 2.5] },
        { objet: "une pastèque", verbe: "pèse", de: "kg", vers: "g", versNom: "grammes", f: 1000, v: [3.2, 4.5, 6] },
        { objet: "un comprimé de vitamine C", verbe: "contient", de: "g", vers: "mg", versNom: "milligrammes", f: 1000, v: [0.5, 1] },
        { objet: "une bouteille d'eau", verbe: "contient", de: "L", vers: "cL", versNom: "centilitres", f: 100, v: [0.5, 1.5, 2] },
        { objet: "une brique de lait", verbe: "contient", de: "L", vers: "mL", versNom: "millilitres", f: 1000, v: [0.25, 0.5, 1] },
        { objet: "un arrosoir", verbe: "contient", de: "L", vers: "cL", versNom: "centilitres", f: 100, v: [5, 8, 10] },
        { objet: "un film", verbe: "dure", de: "h", vers: "min", versNom: "minutes", f: 60, v: [1.5, 2, 2.5] },
        { objet: "une épreuve de natation", verbe: "dure", de: "min", vers: "s", versNom: "secondes", f: 60, v: [2, 3.5, 4] },
        { objet: "un trajet en bus", verbe: "dure", de: "h", vers: "min", versNom: "minutes", f: 60, v: [0.5, 0.75, 1.25] },
        { objet: "un fil électrique", verbe: "mesure", de: "m", vers: "mm", versNom: "millimètres", f: 1000, v: [1.5, 2.25, 3] },
      ]);
      const valeur = randomChoice(c.v);
      const resultat = net(valeur * c.f);
      const text = randomChoice([
        `${cap(c.objet)} ${c.verbe} ${fr(valeur)} ${c.de}. Convertis cette mesure en ${c.vers}.`,
        `${cap(c.objet)} ${c.verbe} ${fr(valeur)} ${c.de}. Combien cela fait-il de ${c.versNom} ?`,
        `Exprime en ${c.vers} : ${c.objet} qui ${c.verbe} ${fr(valeur)} ${c.de}.`,
        `On note ${fr(valeur)} ${c.de} pour ${c.objet}. Quelle est cette mesure en ${c.vers} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: attendu(resultat, c.vers),
        comparator: "number_equal",
        explanation:
          "Définition : convertir vers une unité PLUS PETITE donne un nombre plus grand — il en faut davantage.\n\n" +
          `Méthode : 1 ${c.de} = ${fr(c.f)} ${c.vers}, donc on multiplie par ${fr(c.f)}.\n\n` +
          `Calcul : ${fr(valeur)} × ${fr(c.f)} = ${fr(resultat)} ${c.vers}.\n\n` +
          "Conclusion : ⭐ le contrôle est immédiat — si le nombre a DIMINUÉ en allant vers une unité plus petite, c'est qu'on a divisé au lieu de multiplier.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_convertir_tpl_3_debit",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Une heure, c'est 60 minutes : en une heure, il coule 60 fois plus qu'en une minute.",
    tags: ["grandeur", "convertir", "debit", "template"],
    generate: () => {
      const c = randomChoice([
        { gn: "un robinet de cuisine", il: "il", v: [6, 8, 10, 12] },
        { gn: "un tuyau d'arrosage", il: "il", v: [15, 18, 20, 25] },
        { gn: "une pompe de piscine", il: "elle", v: [100, 150, 200, 250] },
        { gn: "une fontaine de village", il: "elle", v: [3, 4, 5] },
        { gn: "une pomme de douche", il: "elle", v: [8, 10, 12] },
        { gn: "un arroseur de jardin", il: "il", v: [5, 6, 8] },
        { gn: "une source en montagne", il: "elle", v: [2, 3, 4] },
        { gn: "une borne d'incendie", il: "elle", v: [500, 1000] },
        { gn: "un nettoyeur haute pression", il: "il", v: [8, 10] },
        { gn: "une cascade de jardin", il: "elle", v: [20, 30] },
        { gn: "une pompe de puits", il: "elle", v: [40, 50, 60] },
      ]);
      const parMin = randomChoice(c.v);
      const parH = parMin * 60;
      const versHeure = Math.random() < 0.5;
      const text = versHeure
        ? randomChoice([
            `${cap(c.gn)} débite ${fr(parMin)} L/min. Quel est son débit en L/h ?`,
            `Convertis en L/h le débit ${de(c.gn)} : ${fr(parMin)} L/min.`,
            `Combien de litres ${c.gn} débite-t-${c.il} en une heure, à raison de ${fr(parMin)} litres par minute ?`,
            `Débit ${de(c.gn)} : ${fr(parMin)} L/min. Exprime-le en litres par heure.`,
          ])
        : randomChoice([
            `${cap(c.gn)} débite ${fr(parH)} L/h. Quel est son débit en L/min ?`,
            `Convertis en L/min le débit ${de(c.gn)} : ${fr(parH)} L/h.`,
            `En une heure, ${c.gn} débite ${fr(parH)} L. Combien de litres débite-t-${c.il} en une minute ?`,
            `Débit ${de(c.gn)} : ${fr(parH)} L/h. Exprime-le en litres par minute.`,
          ]);
      const rep = versHeure ? parH : parMin;
      return {
        text,
        format: "short",
        // « Combien de litres… en une heure ? » : « 1 800 L » est aussi une bonne réponse.
        expected: [...attendu(rep, versHeure ? "L/h" : "L/min"), ...(text.startsWith("Combien de litres") || text.startsWith("En une heure") ? [`${fr(rep)} L`] : [])],
        comparator: "number_equal",
        explanation:
          "Définition : un débit est une grandeur quotient — des litres PAR unité de temps. Convertir le débit, c'est convertir la durée du dénominateur.\n\n" +
          "Méthode : 1 h = 60 min. En une heure il s'écoule donc 60 fois plus d'eau qu'en une minute.\n\n" +
          (versHeure
            ? `Calcul : ${fr(parMin)} × 60 = ${fr(parH)} L/h.\n\n`
            : `Calcul : ${fr(parH)} ÷ 60 = ${fr(parMin)} L/min.\n\n`) +
          "Conclusion : ⭐ contrôle de bon sens — le nombre de litres par HEURE est toujours le plus grand des deux.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_convertir_tpl_4_vitesse",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "1 km/h, c'est 1 000 m en 3 600 s : on divise par 3,6 pour passer en m/s.",
    tags: ["grandeur", "convertir", "vitesse", "template"],
    generate: () => {
      const c = randomChoice([
        { gn: "un cycliste en ville", il: "il", k: [5] },
        { gn: "une cycliste sur route", il: "elle", k: [10] },
        { gn: "une trottinette électrique", il: "elle", k: [5] },
        { gn: "un scooter", il: "il", k: [10, 15] },
        { gn: "une voiture en ville", il: "elle", k: [10, 15] },
        { gn: "une voiture sur route", il: "elle", k: [20, 25] },
        { gn: "un train régional", il: "il", k: [30, 35, 40] },
        { gn: "un TGV", il: "il", k: [80] },
        { gn: "un guépard", il: "il", k: [25, 30] },
        { gn: "le vent d'une tempête", il: "il", k: [20, 25, 30] },
        { gn: "un cheval au galop", il: "il", k: [10, 15] },
        { gn: "un skieur de descente", il: "il", k: [25, 30, 35] },
        { gn: "un ballon frappé par une footballeuse", il: "il", k: [25, 30] },
        { gn: "un faucon en piqué", il: "il", k: [80] },
        { gn: "un coureur de demi-fond", il: "il", k: [5] },
      ]);
      const ms = randomChoice(c.k);
      const kmh = net(ms * 3.6);
      const versMs = Math.random() < 0.5;
      const text = versMs
        ? randomChoice([
            `${cap(c.gn)} a une vitesse de ${fr(kmh)} km/h. Convertis-la en m/s.`,
            `Convertis en m/s la vitesse ${de(c.gn)} : ${fr(kmh)} km/h.`,
            `À ${fr(kmh)} km/h, combien de mètres ${c.gn} parcourt-${c.il} en une seconde ?`,
            `Vitesse ${de(c.gn)} : ${fr(kmh)} km/h. Que vaut-elle en mètres par seconde ?`,
          ])
        : randomChoice([
            `${cap(c.gn)} a une vitesse de ${fr(ms)} m/s. Convertis-la en km/h.`,
            `Convertis en km/h la vitesse ${de(c.gn)} : ${fr(ms)} m/s.`,
            `${cap(c.gn)} parcourt ${fr(ms)} mètres chaque seconde. Quelle est sa vitesse en km/h ?`,
            `Vitesse ${de(c.gn)} : ${fr(ms)} m/s. Que vaut-elle en kilomètres par heure ?`,
          ]);
      const rep = versMs ? ms : kmh;
      return {
        text,
        format: "short",
        // « combien de mètres… en une seconde ? » : « 25 m » est aussi une bonne réponse.
        expected: [...attendu(rep, versMs ? "m/s" : "km/h"), ...(text.includes("combien de mètres") ? [`${fr(rep)} m`] : [])],
        comparator: "number_equal",
        explanation:
          "Définition : une vitesse est une grandeur quotient ; on convertit le haut (km → m) ET le bas (h → s).\n\n" +
          "Méthode : 1 km/h = 1 000 m en 3 600 s. Diviser par 3 600 puis multiplier par 1 000, c'est diviser par 3,6.\n\n" +
          (versMs
            ? `Calcul : ${fr(kmh)} km/h = ${fr(kmh * 1000)} m en 3 600 s, soit ${fr(kmh)} ÷ 3,6 = ${fr(ms)} m/s.\n\n`
            : `Calcul : ${fr(ms)} m/s = ${fr(ms * 3600)} m en une heure, soit ${fr(ms)} × 3,6 = ${fr(kmh)} km/h.\n\n`) +
          "Conclusion : ⭐ contrôle de bon sens — le nombre en km/h est toujours le plus GRAND des deux (3,6 fois plus).",
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_convertir_tpl_2_aire",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_convertir",
    difficulty: 5,
    theme: "neutral",
    hint: "Le facteur des longueurs s'applique DEUX fois pour une aire, TROIS fois pour un volume.",
    tags: ["grandeur", "convertir", "aire", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { de: "m²", vers: "cm²", fLong: 100, dim: 2, objets: ["une nappe", "une vitre", "une grande affiche"], v: [2, 3, 5] },
        { de: "cm²", vers: "mm²", fLong: 10, dim: 2, objets: ["un timbre", "une touche de clavier", "une pièce de monnaie"], v: [2, 3, 4, 6] },
        { de: "km²", vers: "m²", fLong: 1000, dim: 2, objets: ["un lac", "une forêt", "un aéroport"], v: [2, 3, 5, 8] },
        { de: "m²", vers: "dm²", fLong: 10, dim: 2, objets: ["une porte", "un plateau de bureau", "un tableau blanc"], v: [2, 3, 4] },
        { de: "m³", vers: "dm³", fLong: 10, dim: 3, objets: ["une cuve", "un bac à sable", "une benne"], v: [2, 3, 5] },
        { de: "dm³", vers: "cm³", fLong: 10, dim: 3, objets: ["une boîte à chaussures", "un aquarium de bureau", "une boîte de rangement"], v: [2, 3, 5, 8] },
        { de: "cm³", vers: "mm³", fLong: 10, dim: 3, objets: ["un morceau de sucre", "une gomme", "un dé à jouer"], v: [2, 3, 5] },
      ]);
      const objet = randomChoice(cas.objets);
      const valeur = randomChoice(cas.v);
      const f = cas.fLong ** cas.dim;
      const g = cas.dim === 2 ? "l'aire" : "le volume";
      const correct = fr(valeur * f) + " " + cas.vers;
      const text = randomChoice([
        `${cap(g)} ${de(objet)} vaut ${valeur} ${cas.de}. Combien cela fait-il de ${cas.vers} ?`,
        `Convertis ${valeur} ${cas.de} en ${cas.vers} : c'est ${g} ${de(objet)}.`,
        `${cap(objet)} a ${cas.dim === 2 ? "une aire" : "un volume"} de ${valeur} ${cas.de}. Exprime ${cas.dim === 2 ? "cette aire" : "ce volume"} en ${cas.vers}.`,
        `Exprime en ${cas.vers} ${g} ${de(objet)}, qui mesure ${valeur} ${cas.de}.`,
      ]);
      const fois = Array(cas.dim).fill(fr(cas.fLong)).join(" × ");
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          fr(valeur * cas.fLong) + " " + cas.vers,
          fr(valeur * cas.fLong * cas.dim) + " " + cas.vers,
          fr(valeur * f * cas.fLong) + " " + cas.vers,
          fr(valeur * 10 ** cas.dim) + " " + cas.vers,
          fr(valeur * (f / 10)) + " " + cas.vers,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : ${cas.dim === 2 ? "une aire est un produit de DEUX longueurs" : "un volume est un produit de TROIS longueurs"}, donc le facteur de conversion s'applique ${cas.dim === 2 ? "deux" : "trois"} fois.\n\n` +
          `Méthode : pour les longueurs le facteur vaut ${fr(cas.fLong)} ; ici il vaut ${fois} = ${fr(f)}.\n\n` +
          `Calcul : ${valeur} × ${fr(f)} = ${fr(valeur * f)} ${cas.vers}.\n\n` +
          `Conclusion : ⚠️ ${fr(valeur * cas.fLong)} ${cas.vers} est l'erreur classique : c'est le facteur des LONGUEURS, appliqué une seule fois.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_convertir_tpl_5_masse_volumique",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_convertir",
    difficulty: 5,
    theme: "neutral",
    hint: "1 m³ = 1 000 000 cm³ et 1 000 g = 1 kg : 1 g/cm³ = 1 000 kg/m³.",
    tags: ["grandeur", "convertir", "masse_volumique", "template"],
    generate: () => {
      const m = randomChoice([
        { gn: "l'eau", part: "d'eau", g: 1 },
        { gn: "l'huile d'olive", part: "d'huile d'olive", g: 0.9 },
        { gn: "la glace", part: "de glace", g: 0.9 },
        { gn: "l'aluminium", part: "d'aluminium", g: 2.7 },
        { gn: "le fer", part: "de fer", g: 7.8 },
        { gn: "le cuivre", part: "de cuivre", g: 8.9 },
        { gn: "le plomb", part: "de plomb", g: 11.3 },
        { gn: "l'or", part: "d'or", g: 19.3 },
        { gn: "l'argent", part: "d'argent", g: 10.5 },
        { gn: "le béton", part: "de béton", g: 2.4 },
        { gn: "le verre", part: "de verre", g: 2.5 },
        // ⛔ 08/10/2026 — masses volumiques AU DIXIÈME (Frédéric) : le liège (0,24),
        // l'essence (0,75) et le lait (1,03) sont sortis de la table.
        { gn: "le bois de pin", part: "de bois de pin", g: 0.5 },
        { gn: "le bois de chêne", part: "de bois de chêne", g: 0.7 },
        { gn: "l'alcool", part: "d'alcool", g: 0.8 },
        { gn: "le zinc", part: "de zinc", g: 7.1 },
        { gn: "le granit", part: "de granit", g: 2.7 },
        { gn: "le sable sec", part: "de sable sec", g: 1.6 },
      ]);
      const G = net(m.g * 1000);
      const versKg = Math.random() < 0.5;
      const text = versKg
        ? randomChoice([
            `La masse volumique ${de(m.gn)} vaut ${fr(m.g)} g/cm³. Convertis-la en kg/m³.`,
            `${cap(m.gn)} a une masse volumique de ${fr(m.g)} g/cm³. Combien cela fait-il en kg/m³ ?`,
            `Un centimètre cube ${m.part} pèse ${fr(m.g)} g. Quelle est sa masse volumique en kg/m³ ?`,
          ])
        : randomChoice([
            `La masse volumique ${de(m.gn)} vaut ${fr(G)} kg/m³. Convertis-la en g/cm³.`,
            `${cap(m.gn)} a une masse volumique de ${fr(G)} kg/m³. Combien cela fait-il en g/cm³ ?`,
            `Un mètre cube ${m.part} pèse ${fr(G)} kg. Quelle est sa masse volumique en g/cm³ ?`,
          ]);
      const rep = versKg ? G : m.g;
      return {
        text,
        format: "short",
        expected: attendu(rep, versKg ? "kg/m³" : "g/cm³"),
        comparator: "number_equal",
        explanation:
          "Définition : une masse volumique est une grandeur quotient — une masse PAR unité de volume.\n\n" +
          "Méthode : 1 m³ = 1 000 000 cm³. Si 1 cm³ pèse 1 g, alors 1 m³ pèse 1 000 000 g, c'est-à-dire 1 000 kg. Donc 1 g/cm³ = 1 000 kg/m³.\n\n" +
          (versKg
            ? `Calcul : ${fr(m.g)} × 1 000 = ${fr(G)} kg/m³.\n\n`
            : `Calcul : ${fr(G)} ÷ 1 000 = ${fr(m.g)} g/cm³.\n\n`) +
          "Conclusion : ⭐ repère utile — l'eau vaut 1 g/cm³, soit 1 000 kg/m³ : un mètre cube d'eau pèse une tonne.",
      };
    },
  },

  /* =========================================================================
     GRANDEUR_COHERENCE — ⭐ un contrôle, pas un calcul
  ========================================================================= */
  {
    kind: "template",
    id: "4e_grandeur_coherence_tpl_1_unite_impossible",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_coherence",
    difficulty: 4,
    theme: "neutral",
    hint: "L'unité seule suffit à rejeter le résultat.",
    tags: ["grandeur", "coherence", "qcm", "template"],
    generate: () => {
      const cas = randomChoice(CAS_UNITES);
      const nom = randomChoice(PRENOMS);
      const valeur = randomChoice([6, 8, 12, 15, 18, 24, 30, 36, 45]);
      const correct = "non : ce n'est pas la bonne unité";
      const text = randomChoice([
        `${nom.p} calcule ${cas.question} et écrit « ${valeur} ${cas.fausse} ». Sans refaire le calcul, ce résultat peut-il être juste ?`,
        `Pour ${cas.question}, ${nom.p} trouve ${valeur} ${cas.fausse}. Ce résultat peut-il être correct ?`,
        `Sur une copie : « ${cap(cas.question)} = ${valeur} ${cas.fausse} ». Sans rien recalculer, peut-on accepter ce résultat ?`,
        `${nom.p} annonce : « ${cap(cas.question)}, c'est ${valeur} ${cas.fausse} ». ${cap(nom.il)} a peut-être bien calculé : le résultat peut-il être juste ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          "oui : l'unité n'a pas d'importance",
          "oui, si le calcul est bon",
          "on ne peut pas le savoir sans refaire le calcul",
          "non : le nombre est trop grand",
          "non : le nombre est trop petit",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'unité d'un résultat est déterminée par la grandeur qu'on cherche, pas par le calcul qu'on a fait.\n\n" +
          "Méthode : on compare l'unité écrite à celle qu'on attend, sans rien recalculer.\n\n" +
          `Calcul : ${cas.question} s'exprime en ${cas.bonne}, parce que ${cas.pourquoi}. Or on a écrit ${cas.fausse}.\n\n` +
          "Conclusion : ⭐ le contrôle par l'unité rejette un résultat en une seconde, avant même de vérifier les nombres. C'est le réflexe le plus rentable du chapitre.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_coherence_tpl_3_choisir_unite",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_coherence",
    difficulty: 4,
    theme: "neutral",
    hint: "Demande-toi ce qu'on mesure : une longueur, une surface, un volume, ou un quotient ?",
    tags: ["grandeur", "coherence", "unite", "qcm", "template"],
    generate: () => {
      const cas = randomChoice(CAS_UNITES);
      const text = randomChoice([
        `Dans quelle unité peut-on exprimer ${cas.question} ?`,
        `${cap(cas.question)} : quelle unité convient ?`,
        `On calcule ${cas.question}. Quelle unité doit accompagner le résultat ?`,
        `Parmi ces unités, laquelle convient pour ${cas.question} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(cas.bonne, [cas.fausse, ...cas.autres]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque grandeur a sa famille d'unités — longueur, aire, volume, ou unité composée.\n\n" +
          "Méthode : on se demande d'abord CE QU'ON MESURE, puis quelle opération fabrique cette grandeur.\n\n" +
          `Calcul : ${cas.question} s'exprime en ${cas.bonne}, parce que ${cas.pourquoi}.\n\n` +
          `Conclusion : ⚠️ ${cas.fausse} est le piège le plus fréquent ici.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_coherence_tpl_2_ordre",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_coherence",
    difficulty: 5,
    theme: "neutral",
    hint: "Cette valeur est-elle plausible pour ce qu'on mesure ?",
    tags: ["grandeur", "coherence", "vraisemblance", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { objet: "la vitesse d'un cycliste", faux: "250 km/h", vrai: "25 km/h", sens: "grand" },
        { objet: "la masse d'une pomme", faux: "15 kg", vrai: "150 g", sens: "grand" },
        { objet: "l'aire d'une salle de classe", faux: "60 cm²", vrai: "60 m²", sens: "petit" },
        { objet: "la contenance d'une bouteille d'eau", faux: "150 L", vrai: "1,5 L", sens: "grand" },
        { objet: "la hauteur d'une porte", faux: "20 m", vrai: "2 m", sens: "grand" },
        { objet: "la vitesse d'un piéton", faux: "50 km/h", vrai: "5 km/h", sens: "grand" },
        { objet: "la masse d'un éléphant adulte", faux: "5 kg", vrai: "5 t", sens: "petit" },
        { objet: "la durée d'un match de football", faux: "90 h", vrai: "90 min", sens: "grand" },
        { objet: "le prix d'une baguette de pain", faux: "120 €", vrai: "1,20 €", sens: "grand" },
        { objet: "la consommation d'une voiture", faux: "60 L/100 km", vrai: "6 L/100 km", sens: "grand" },
        { objet: "le débit d'un robinet de cuisine", faux: "1 200 L/min", vrai: "12 L/min", sens: "grand" },
        { objet: "la masse volumique de l'eau", faux: "1 000 g/cm³", vrai: "1 g/cm³", sens: "grand" },
        { objet: "la taille d'un élève de 4e", faux: "16 m", vrai: "1,6 m", sens: "grand" },
        { objet: "l'aire d'un timbre", faux: "6 m²", vrai: "6 cm²", sens: "grand" },
        { objet: "la vitesse d'un TGV", faux: "30 km/h", vrai: "300 km/h", sens: "petit" },
        { objet: "le volume d'une piscine municipale", faux: "500 L", vrai: "500 m³", sens: "petit" },
        { objet: "la distance entre Paris et Marseille", faux: "7 750 km", vrai: "775 km", sens: "grand" },
        { objet: "l'énergie consommée par une bouilloire pour un thé", faux: "50 kWh", vrai: "0,05 kWh", sens: "grand" },
      ]);
      const nom = randomChoice(PRENOMS);
      const correct = `non : ${cas.vrai} serait plausible`;
      const text = randomChoice([
        `On lit « ${cas.objet} : ${cas.faux} ». Ce résultat est-il vraisemblable ?`,
        `${nom.p} annonce : « ${cap(cas.objet)}, c'est ${cas.faux} ». A-t-${nom.il} raison ?`,
        `Dans un exercice, on trouve ${cas.faux} pour ${cas.objet}. Ce résultat est-il plausible ?`,
        `${cap(cas.objet)} = ${cas.faux}, d'après une calculatrice. Faut-il garder ce résultat ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          "oui, tout à fait",
          "oui, si la mesure a été bien faite",
          "on ne peut pas juger sans le calcul",
          `non : ${cas.faux} est trop ${cas.sens === "grand" ? "petit" : "grand"}`,
          "non : l'unité est impossible",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : contrôler la cohérence, c'est comparer un résultat à ce qu'on connaît du monde.\n\n" +
          "Méthode : on se demande si la valeur est plausible POUR CETTE GRANDEUR, avant de vérifier le calcul.\n\n" +
          `Calcul : ${cas.faux} est beaucoup trop ${cas.sens} ; ${cas.vrai} correspond à ce qu'on observe.\n\n` +
          "Conclusion : ⭐ ici l'unité est correcte — c'est l'ORDRE DE GRANDEUR qui cloche. Les deux contrôles sont différents et se complètent.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_coherence_tpl_4_division_inversee",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_coherence",
    difficulty: 5,
    theme: "neutral",
    hint: "L'unité du résultat, c'est l'unité du haut sur l'unité du bas — dans l'ordre où l'on a divisé.",
    tags: ["grandeur", "coherence", "unite", "qcm", "template"],
    generate: () => {
      const s = randomChoice(SITUATIONS_QUOTIENT);
      const { d, n } = tirerQuotient(s);
      const nom = randomChoice(PRENOMS);
      const text = randomChoice([
        `${cap(s.donnee(n, d))}. Pour trouver ${s.cherche}, ${nom.p} calcule ${fr(d)} ÷ ${fr(n)}. Dans quelle unité est vraiment son résultat ?`,
        `${nom.p} cherche ${s.cherche} : ${nom.il} divise ${fr(d)} ${s.denU} par ${fr(n)} ${s.numU}. Quelle unité obtient-${nom.il} ?`,
        `${cap(s.donnee(n, d))}. ${nom.p} pose ${fr(d)} ÷ ${fr(n)}. Quelle unité doit-${nom.il} écrire derrière son résultat ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([s.uInv, s.u, s.numU, s.denU]),
        expected: [s.uInv],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'unité d'un quotient est l'unité du dividende sur celle du diviseur.\n\n" +
          `Méthode : ${nom.p} a divisé des ${s.denU} par des ${s.numU}.\n\n` +
          `Calcul : son résultat est donc en ${s.uInv}, et non en ${s.u}.\n\n` +
          `Conclusion : ⭐ l'unité trahit l'erreur — on attendait des ${s.u} pour ${s.cherche} : il fallait diviser dans l'autre sens, ${fr(n)} ÷ ${fr(d)}.`,
      };
    },
  },

  /* =========================================================================
     GRANDEUR_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_grandeur_defi_tpl_1_debit",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Trouve d'abord la grandeur quotient (pour UNE unité), puis multiplie.",
    tags: ["grandeur", "defi", "debit", "template"],
    generate: () => {
      const s = randomChoice(DEUX_TEMPS);
      const q = randomChoice(s.q);
      const d1 = randomChoice(s.d1);
      const d2 = randomChoice(s.d2);
      const n1 = net((q * d1) / s.pour);
      const n2 = net((q * d2) / s.pour);
      const a = s.a(n1, d1);
      const question = s.question(d2);
      const text = randomChoice([
        `${cap(a)}. ${cap(question)}`,
        `Sachant qu'${a}, ${question}`,
        `${cap(a)}. Au même rythme, ${question}`,
        `${cap(a)}. Calcule d'abord ${s.nomQ}, puis réponds : ${question}`,
      ]);
      return {
        text,
        format: "short",
        expected: attendu(n2, s.res),
        comparator: "number_equal",
        explanation:
          `Définition : ${s.nomQ} est une grandeur quotient, en ${s.u}.\n\n` +
          "Méthode : on calcule la grandeur quotient, puis on la multiplie par la nouvelle quantité.\n\n" +
          (s.pour === 1
            ? `Calcul : ${fr(n1)} ÷ ${fr(d1)} = ${fr(q)} ${s.u}. Puis ${fr(q)} × ${fr(d2)} = ${fr(n2)} ${s.res}.\n\n`
            : `Calcul : ${fr(n1)} ${s.res} pour ${fr(d1)} km, c'est ${fr(q)} ${s.res} pour 100 km (${s.u}). Pour ${fr(d2)} km : ${fr(q)} × ${fr(d2 / 100)} = ${fr(n2)} ${s.res}.\n\n`) +
          "Conclusion : ⭐ le passage par le quotient est ce qui rend le problème facile — sans lui, il faudrait un produit en croix.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_defi_tpl_2_comparer_prix",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Ramène les deux offres au prix d'UNE unité avant de comparer.",
    tags: ["grandeur", "defi", "prix", "qcm", "template", "canvas"],
    generate: () => {
      const p = randomChoice([
        { part: "de pommes", u: "kg", par: "kilo", uPrix: "€/kg", pu: [2, 2.5, 3, 3.5, 4], q: [2, 3, 4, 5] },
        { part: "de riz", u: "kg", par: "kilo", uPrix: "€/kg", pu: [1.5, 2, 2.5, 3], q: [2, 3, 5] },
        { part: "de café", u: "kg", par: "kilo", uPrix: "€/kg", pu: [12, 14, 16, 18], q: [2, 3] },
        { part: "de jus d'orange", u: "L", par: "litre", uPrix: "€/L", pu: [1.5, 2, 2.5], q: [2, 3, 4, 6] },
        { part: "de lessive", u: "L", par: "litre", uPrix: "€/L", pu: [3, 4, 5], q: [2, 3, 5] },
        { part: "de terreau", u: "L", par: "litre", uPrix: "€/L", pu: [0.2, 0.25, 0.3], q: [20, 40, 50] },
        { part: "de tissu", u: "m", par: "mètre", uPrix: "€/m", pu: [6, 8, 10, 12], q: [2, 3, 4] },
        { part: "de croquettes pour chat", u: "kg", par: "kilo", uPrix: "€/kg", pu: [3, 4, 5], q: [2, 4, 5] },
        { part: "de farine", u: "kg", par: "kilo", uPrix: "€/kg", pu: [1, 1.2, 1.5], q: [2, 5] },
        { part: "d'huile d'olive", u: "L", par: "litre", uPrix: "€/L", pu: [8, 9, 10], q: [2, 3] },
      ]);
      const v = randomChoice([
        { A: "l'étal A", B: "l'étal B", lequel: "Lequel" },
        { A: "le magasin A", B: "le magasin B", lequel: "Lequel" },
        { A: "la boutique A", B: "la boutique B", lequel: "Laquelle" },
        { A: "le site A", B: "le site B", lequel: "Lequel" },
        { A: "la coopérative A", B: "la coopérative B", lequel: "Laquelle" },
      ]);
      let uA = randomChoice(p.pu);
      let uB = randomChoice(p.pu);
      while (uA === uB) uB = randomChoice(p.pu);
      const kA = randomChoice(p.q);
      const kB = randomChoice(p.q);
      const tA = net(uA * kA);
      const tB = net(uB * kB);
      const correct = uA < uB ? v.A : v.B;
      const text = randomChoice([
        `${cap(v.A)} : ${fr(tA)} € les ${kA} ${p.u} ${p.part}. ${cap(v.B)} : ${fr(tB)} € les ${kB} ${p.u}. ${v.lequel} vend le moins cher ?`,
        `${cap(v.A)} vend ${kA} ${p.u} ${p.part} pour ${fr(tA)} €, et ${v.B} en vend ${kB} ${p.u} pour ${fr(tB)} €. ${v.lequel} est le plus avantageux pour l'acheteur ?`.replace("Laquelle est le plus avantageux", "Laquelle est la plus avantageuse"),
        `${cap(v.A)} propose ${kA} ${p.u} ${p.part} à ${fr(tA)} € ; ${v.B} propose ${kB} ${p.u} à ${fr(tB)} €. Qui propose le meilleur prix au ${p.par} ?`,
        `Deux offres ${p.part} — ${v.A} : ${kA} ${p.u} pour ${fr(tA)} € ; ${v.B} : ${kB} ${p.u} pour ${fr(tB)} €. ${v.lequel} vend le moins cher au ${p.par} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([v.A, v.B]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : on ne peut pas comparer deux prix si les quantités diffèrent — il faut une grandeur QUOTIENT.\n\n" +
          `Méthode : on ramène chaque offre au prix d'un ${p.par} (${p.uPrix}).\n\n` +
          `Calcul : ${v.A} donne ${fr(tA)} ÷ ${kA} = ${fr(uA)} ${p.uPrix} ; ${v.B} donne ${fr(tB)} ÷ ${kB} = ${fr(uB)} ${p.uPrix}.\n\n` +
          `Conclusion : ${correct} est le moins cher au ${p.par}. ⭐ C'est exactement à ça que sert un quotient — rendre comparables deux choses qui ne le sont pas.`,
        canvas: tableau(
          ["offre", "prix", "quantité", p.uPrix],
          [
            { values: [v.A, `${fr(tA)} €`, `${kA} ${p.u}`, fr(uA)] },
            { values: [v.B, `${fr(tB)} €`, `${kB} ${p.u}`, fr(uB)] },
          ],
          "le quotient rend comparable",
          { col: 3 }
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_defi_tpl_3_carrelage",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention aux unités : la surface est en mètres, les carreaux en centimètres.",
    tags: ["grandeur", "defi", "convertir", "aire", "template"],
    generate: () => {
      const c = randomChoice([
        { lieu: "le sol d'une cuisine", elem: "carreaux", carre: "carrés", cotes: [20, 25, 50], L: [3, 4, 5], l: [2, 3, 4] },
        { lieu: "le sol d'une salle de bain", elem: "carreaux", carre: "carrés", cotes: [20, 25], L: [2, 2.5, 3], l: [2, 2.5] },
        { lieu: "une terrasse", elem: "dalles", carre: "carrées", cotes: [40, 50], L: [4, 6, 8], l: [2, 4] },
        { lieu: "le sol d'un bureau", elem: "dalles de moquette", carre: "carrées", cotes: [50], L: [4, 5, 6], l: [3, 4] },
        { lieu: "un mur de douche", elem: "carreaux", carre: "carrés", cotes: [10, 20], L: [2, 2.5], l: [1, 1.2] },
        { lieu: "le sol d'un garage", elem: "dalles en PVC", carre: "carrées", cotes: [50], L: [5, 6], l: [3, 4] },
        { lieu: "une cour", elem: "pavés", carre: "carrés", cotes: [20, 25], L: [5, 6, 8], l: [4, 5] },
        { lieu: "le sol d'une chambre", elem: "dalles de liège", carre: "carrées", cotes: [25, 50], L: [3, 4], l: [3, 3.5] },
        { lieu: "le sol d'une salle de sport", elem: "tapis de mousse", carre: "carrés", cotes: [50, 100], L: [8, 10, 12], l: [6, 8] },
        { lieu: "un plan de travail", elem: "carreaux", carre: "carrés", cotes: [10, 20], L: [2, 2.4], l: [0.6, 0.8] },
        { lieu: "une allée de jardin", elem: "dalles", carre: "carrées", cotes: [25, 50], L: [6, 8, 10], l: [1, 1.5] },
        { lieu: "le sol d'une entrée", elem: "carreaux", carre: "carrés", cotes: [20, 25], L: [2, 3], l: [1.5, 2] },
      ]);
      const cote = randomChoice(c.cotes);
      const okL = c.L.filter((x) => Math.round(x * 100) % cote === 0);
      const okl = c.l.filter((x) => Math.round(x * 100) % cote === 0);
      // Si aucune dimension ne tombe juste avec ce carreau, on prend 1 m sur 1 m de plus : toujours un multiple.
      const L = okL.length ? randomChoice(okL) : Math.max(...c.L.map(Math.ceil));
      const l = okl.length ? randomChoice(okl) : Math.max(...c.l.map(Math.ceil));
      const parL = Math.round((L * 100) / cote);
      const parl = Math.round((l * 100) / cote);
      const nb = parL * parl;
      const aireM2 = net(L * l);
      const aireCarreauM2 = net((cote / 100) ** 2);
      const text = randomChoice([
        `${cap(c.lieu)} mesure ${fr(L)} m sur ${fr(l)} m. On pose des ${c.elem} ${c.carre} de ${cote} cm de côté. Combien en faut-il ?`,
        `Combien de ${c.elem} ${c.carre} de ${cote} cm de côté faut-il pour couvrir ${c.lieu}, qui mesure ${fr(L)} m sur ${fr(l)} m ?`,
        `Pour couvrir ${c.lieu} (${fr(L)} m × ${fr(l)} m), on utilise des ${c.elem} ${c.carre} de ${cote} cm de côté. Combien en faut-il ?`,
        `${cap(c.lieu)} : ${fr(L)} m de long, ${fr(l)} m de large. On le couvre entièrement de ${c.elem} ${c.carre} de ${cote} cm de côté. Quel nombre de ${c.elem} faut-il ?`.replace("On le couvre entièrement", c.lieu.startsWith("une ") ? "On la couvre entièrement" : "On le couvre entièrement"),
      ]);
      return {
        text,
        format: "short",
        expected: attendu(nb),
        comparator: "number_equal",
        explanation:
          "Définition : le nombre de pièces est le quotient de deux AIRES — celle de la surface par celle d'une pièce.\n\n" +
          "Méthode : ⚠️ on convertit d'abord dans la même unité. C'est là que se perd la moitié des élèves.\n\n" +
          `Calcul : la surface fait ${fr(L)} × ${fr(l)} = ${fr(aireM2)} m². Une pièce de ${cote} cm fait ${fr(cote / 100)} m de côté, soit ${fr(aireCarreauM2)} m². Donc ${fr(aireM2)} ÷ ${fr(aireCarreauM2)} = ${fr(nb)}. Vérification par rangées : ${parL} × ${parl} = ${fr(nb)}.\n\n` +
          `Conclusion : ⭐ le contrôle par l'unité valide le résultat — une aire divisée par une aire donne un NOMBRE sans unité, et c'est bien ce qu'on cherchait.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_defi_tpl_4_duree",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Durée = distance ÷ vitesse, en heures ; puis 1 h = 60 min.",
    tags: ["grandeur", "defi", "vitesse", "duree", "template"],
    generate: () => {
      const m = randomChoice([
        { gn: "un randonneur", il: "il", v: [4, 5, 6] },
        { gn: "une cycliste", il: "elle", v: [12, 15, 18, 20] },
        { gn: "un train régional", il: "il", v: [90, 120] },
        { gn: "une voiture sur autoroute", il: "elle", v: [120, 130] },
        { gn: "un scooter", il: "il", v: [30, 45] },
        { gn: "une navette maritime", il: "elle", v: [30, 40] },
        { gn: "un coureur", il: "il", v: [10, 12] },
        { gn: "un avion de ligne", il: "il", v: [600, 800, 900] },
        { gn: "un tracteur", il: "il", v: [20, 25, 30] },
        { gn: "une trottinette électrique", il: "elle", v: [15, 20] },
        { gn: "un bus de ligne", il: "il", v: [30, 40] },
        { gn: "un TGV", il: "il", v: [300] },
      ]);
      const v = randomChoice(m.v);
      const minutes = randomChoice(
        [10, 12, 15, 20, 30, 40, 45, 50, 75, 90].filter((t) => Number.isInteger((v * t) / 60))
      );
      const d = (v * minutes) / 60;
      const text = randomChoice([
        `${cap(m.gn)} parcourt ${fr(d)} km à la vitesse moyenne de ${v} km/h. Combien de minutes dure le trajet ?`,
        `Combien de temps, en minutes, faut-il à ${m.gn} pour faire ${fr(d)} km à ${v} km/h de moyenne ?`,
        `Distance à parcourir : ${fr(d)} km. Vitesse moyenne ${de(m.gn)} : ${v} km/h. Quelle est la durée du trajet, en minutes ?`,
        `À ${v} km/h de moyenne, ${m.gn} doit parcourir ${fr(d)} km. En combien de minutes le fait-${m.il} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: attendu(minutes, "min"),
        comparator: "number_equal",
        explanation:
          "Définition : une vitesse est un quotient, distance ÷ durée ; donc la durée est distance ÷ vitesse.\n\n" +
          "Méthode : km ÷ km/h donne des heures ; on convertit ensuite en minutes (× 60).\n\n" +
          `Calcul : ${fr(d)} ÷ ${v} h, soit (${fr(d)} × 60) ÷ ${v} = ${fr(d * 60)} ÷ ${v} = ${minutes} min.\n\n` +
          "Conclusion : ⭐ l'unité guide le calcul — des km divisés par des km/h laissent des heures, jamais des km.",
      };
    },
  },
];

/* ===========================================================================
   TABLES DÉCLARÉES APRÈS LA BANQUE (utilisées seulement dans les generate(),
   donc lues au moment du tirage, quand elles existent déjà)
=========================================================================== */

// ⚠️ Les `const` ci-dessous sont lus à l'EXÉCUTION de `generate()`, jamais à la
// construction du tableau : pas de zone morte temporelle.
const PRENOMS = [
  { p: "Léo", il: "il" },
  { p: "Inès", il: "elle" },
  { p: "Sami", il: "il" },
  { p: "Chloé", il: "elle" },
  { p: "Noah", il: "il" },
  { p: "Maëlle", il: "elle" },
  { p: "Yanis", il: "il" },
  { p: "Aïcha", il: "elle" },
  { p: "Tom", il: "il" },
  { p: "Lina", il: "elle" },
  { p: "Kenzo", il: "il" },
  { p: "Jade", il: "elle" },
  { p: "Adam", il: "il" },
  { p: "Manon", il: "elle" },
  { p: "Ilan", il: "il" },
  { p: "Fatou", il: "elle" },
  { p: "Hugo", il: "il" },
  { p: "Zoé", il: "elle" },
  { p: "Mathis", il: "il" },
  { p: "Nour", il: "elle" },
] as const;

// Une grandeur, son unité, une unité IMPOSSIBLE mais tentante, et d'autres
// unités fausses pour compléter un QCM.
const CAS_UNITES = [
  { question: "l'aire d'un rectangle", bonne: "cm²", fausse: "cm³", autres: ["cm", "cm/s"], pourquoi: "une aire est un produit de DEUX longueurs" },
  { question: "le volume d'un pavé", bonne: "cm³", fausse: "cm²", autres: ["cm", "kg"], pourquoi: "un volume est un produit de TROIS longueurs" },
  { question: "le périmètre d'un carré", bonne: "cm", fausse: "cm²", autres: ["cm³", "km/h"], pourquoi: "un périmètre est une longueur, pas une surface" },
  { question: "la vitesse d'un car", bonne: "km/h", fausse: "km", autres: ["h/km", "kWh"], pourquoi: "une vitesse divise une distance par une durée" },
  { question: "la contenance d'un bidon", bonne: "L", fausse: "m²", autres: ["m", "L/min"], pourquoi: "une contenance est un volume" },
  { question: "l'aire d'un terrain de football", bonne: "m²", fausse: "m", autres: ["m³", "m/s"], pourquoi: "une aire est un produit de DEUX longueurs" },
  { question: "l'énergie consommée par un four", bonne: "kWh", fausse: "kW/h", autres: ["kW", "h"], pourquoi: "une énergie MULTIPLIE des kilowatts par des heures" },
  { question: "le débit d'un robinet", bonne: "L/min", fausse: "L", autres: ["min/L", "L·min"], pourquoi: "un débit divise un volume par une durée" },
  { question: "le prix des tomates au kilo", bonne: "€/kg", fausse: "kg/€", autres: ["€", "kg"], pourquoi: "un prix au kilo divise des euros par des kilogrammes" },
  { question: "la masse volumique du fer", bonne: "g/cm³", fausse: "cm³/g", autres: ["g", "g·cm³"], pourquoi: "une masse volumique divise une masse par un volume" },
  { question: "la densité de population d'une ville", bonne: "hab/km²", fausse: "km²", autres: ["hab", "km²/hab"], pourquoi: "une densité divise un nombre d'habitants par une aire" },
  { question: "la durée d'un trajet", bonne: "h", fausse: "km/h", autres: ["km", "h/km"], pourquoi: "une durée se mesure en unités de temps" },
  { question: "le volume d'eau d'une piscine", bonne: "m³", fausse: "m²", autres: ["m", "m³/h"], pourquoi: "un volume est un produit de TROIS longueurs" },
  { question: "la longueur d'une clôture", bonne: "m", fausse: "m²", autres: ["m³", "m/s"], pourquoi: "une clôture se mesure le long du terrain : c'est une longueur" },
  { question: "la masse d'un colis", bonne: "kg", fausse: "kg/m³", autres: ["m³", "kg·m"], pourquoi: "une masse s'exprime en grammes ou en kilogrammes, sans volume" },
  { question: "la vitesse d'un sprinteur", bonne: "m/s", fausse: "s/m", autres: ["m", "s"], pourquoi: "une vitesse divise une distance par une durée, dans cet ordre" },
  { question: "le volume d'un cylindre", bonne: "cm³", fausse: "cm²", autres: ["cm", "cm/s"], pourquoi: "un volume est une aire de base multipliée par une hauteur" },
  { question: "le salaire horaire d'un serveur", bonne: "€/h", fausse: "h/€", autres: ["€", "€·h"], pourquoi: "un salaire horaire divise des euros par des heures" },
] as const;

// Les problèmes en deux temps : un quotient, puis une multiplication. `pour`
// vaut 100 quand la grandeur se donne « pour 100 km ».
const DEUX_TEMPS = [
  { q: [3, 4, 5, 6, 8], d1: [4, 5, 6], d2: [12, 15, 20, 25], pour: 1, a: (n: number, d: number) => `un robinet fait couler ${fr(n)} L en ${d} minutes`, question: (d: number) => `combien de litres fait-il couler en ${d} minutes ?`, nomQ: "le débit", u: "L/min", res: "L" },
  { q: [12, 15, 20, 25], d1: [2, 3, 4], d2: [5, 7, 10], pour: 1, a: (n: number, d: number) => `une imprimante sort ${fr(n)} pages en ${d} minutes`, question: (d: number) => `combien de pages sort-elle en ${d} minutes ?`, nomQ: "la cadence", u: "pages/min", res: "pages" },
  { q: [15, 18, 20], d1: [2, 3], d2: [4, 5], pour: 1, a: (n: number, d: number) => `une cycliste parcourt ${fr(n)} km en ${d} heures`, question: (d: number) => `quelle distance parcourt-elle en ${d} heures ?`, nomQ: "la vitesse moyenne", u: "km/h", res: "km" },
  { q: [5, 6, 7], d1: [200, 300, 400], d2: [500, 600, 800], pour: 100, a: (n: number, d: number) => `une voiture consomme ${fr(n)} L d'essence pour ${d} km`, question: (d: number) => `combien de litres consomme-t-elle pour ${d} km ?`, nomQ: "la consommation", u: "L/100 km", res: "L" },
  { q: [40, 50, 60], d1: [2, 3], d2: [5, 6, 8], pour: 1, a: (n: number, d: number) => `une boulangerie fabrique ${fr(n)} baguettes en ${d} heures`, question: (d: number) => `combien de baguettes fabrique-t-elle en ${d} heures ?`, nomQ: "la cadence de fabrication", u: "baguettes/h", res: "baguettes" },
  { q: [400, 500, 600], d1: [2, 3], d2: [7, 10], pour: 1, a: (n: number, d: number) => `une éolienne produit ${fr(n)} kWh en ${d} jours`, question: (d: number) => `combien de kWh produit-elle en ${d} jours ?`, nomQ: "la production par jour", u: "kWh/j", res: "kWh" },
  { q: [12, 13, 14], d1: [5, 6, 8], d2: [15, 20, 25], pour: 1, a: (n: number, d: number) => `un serveur gagne ${fr(n)} € pour ${d} heures de travail`, question: (d: number) => `combien gagne-t-il pour ${d} heures ?`, nomQ: "le salaire horaire", u: "€/h", res: "€" },
  { q: [6, 8, 10], d1: [2, 3], d2: [5, 7], pour: 1, a: (n: number, d: number) => `une pompe vide ${fr(n)} m³ d'eau en ${d} heures`, question: (d: number) => `combien de m³ vide-t-elle en ${d} heures ?`, nomQ: "le débit", u: "m³/h", res: "m³" },
  { q: [10, 12, 15], d1: [10, 20], d2: [30, 45, 50], pour: 1, a: (n: number, d: number) => `un robot tondeuse tond ${fr(n)} m² de pelouse en ${d} minutes`, question: (d: number) => `quelle aire, en m², tond-il en ${d} minutes ?`, nomQ: "la vitesse de tonte", u: "m²/min", res: "m²" },
  { q: [15, 16, 18], d1: [200, 300], d2: [400, 500], pour: 100, a: (n: number, d: number) => `une voiture électrique consomme ${fr(n)} kWh pour ${d} km`, question: (d: number) => `combien de kWh consomme-t-elle pour ${d} km ?`, nomQ: "la consommation", u: "kWh/100 km", res: "kWh" },
  { q: [6, 7, 8], d1: [3, 4], d2: [9, 10, 12], pour: 1, a: (n: number, d: number) => `un agriculteur récolte ${fr(n)} t de blé sur ${d} ha`, question: (d: number) => `combien de tonnes récolterait-il sur ${d} ha ?`, nomQ: "le rendement", u: "t/ha", res: "t" },
  { q: [5, 6, 8], d1: [3, 4], d2: [10, 12, 15], pour: 1, a: (n: number, d: number) => `un escargot avance de ${fr(n)} cm en ${d} minutes`, question: (d: number) => `quelle distance, en cm, parcourt-il en ${d} minutes ?`, nomQ: "sa vitesse", u: "cm/min", res: "cm" },
  { q: [70, 75, 80], d1: [2, 3], d2: [5, 10], pour: 1, a: (n: number, d: number) => `un cœur au repos bat ${fr(n)} fois en ${d} minutes`, question: (d: number) => `combien de fois bat-il en ${d} minutes ?`, nomQ: "la fréquence cardiaque", u: "battements/min", res: "battements" },
  { q: [2, 3], d1: [2, 3], d2: [6, 8], pour: 1, a: (n: number, d: number) => `une ruche produit ${fr(n)} kg de miel en ${d} semaines`, question: (d: number) => `combien de kilos de miel produit-elle en ${d} semaines ?`, nomQ: "la production par semaine", u: "kg/semaine", res: "kg" },
  { q: [4, 5], d1: [2, 3], d2: [5, 6], pour: 1, a: (n: number, d: number) => `un randonneur marche ${fr(n)} km en ${d} heures`, question: (d: number) => `quelle distance marche-t-il en ${d} heures ?`, nomQ: "la vitesse moyenne", u: "km/h", res: "km" },
] as const;
