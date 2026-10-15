// lib/tutor-v4/questionBank/seconde/maths/probabilites-conditionnelles.bank.ts
//
// Chapitre : Probabilites conditionnelles et arbres (notion
// probabilites_conditionnelles_2de)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates
// dominants, QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Canvas : "arbre_proba" (arbre pondere) et "tableau_donnees" (tableau croise).
//
// ⭐ LE FIL DE TOUT LE CHAPITRE est le depistage : malade / sain, puis test
// positif / negatif (Frederic, 04/09/2026). C'est aussi l'exemple que le BO
// nomme — « distinguer en situation PA(B) et PB(A), par exemple dans des
// situations de type faux positifs ».
//
// ⛔ PAS DE FORMULE DES PROBABILITES TOTALES. Le BO 2026 ecrit : « le calcul de
// la probabilite d'un evenement connaissant ses probabilites conditionnelles
// relatives a une partition de l'univers n'est PAS un attendu du programme. »
// On additionne donc les CHEMINS de l'arbre — « arbres de probabilite,
// application au calcul de probabilites », qui est un attendu — sans jamais
// poser la formule generale ni son nom.
//
// microSkills (difficultes 1->5) :
//   proba_conditionnelle   — Calculer PA(B)
//   proba_arbre_pondere    — Lire et construire un arbre pondere
//   proba_arbre_chemins    — Additionner les chemins qui menent a un evenement
//   proba_tableau_croise   — Lire PA(B) sur un tableau croise d'effectifs
//   proba_faux_positifs    — Distinguer PA(B) et PB(A)
//
// =========================================================================
// ⛔⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT ».
// Mesure avant (scripts/mesurer-squelettes-coach.ts seconde
// probabilites_conditionnelles_2de) : 10 ou 11 squelettes par micro, 14 a 18
// repetitions sur une serie de 20 a la meme etoile. Tous les gabarits
// tiraient des NOMBRES dans une phrase fixe, sur le seul decor du depistage.
// Meme methode que les probabilites de 3e (dd5e9f75) : chaque gabarit compose
//   · une SITUATION a deux evenements (trente situations de la vie courante :
//     car jaune, cantine, Grand Raid, meteo de Saint-Pierre, letchis du marche
//     de Saint-Paul, peche aux canards de la kermesse, tombola, billes, cartes
//     Pokemon, basket, petits chevaux, Mafate, Cite du Volcan… ; et vingt
//     situations de DEPISTAGE — dengue, chikungunya, diabete, antidopage du
//     Grand Raid, ethylotest, filtre anti-spam, portique de Roland-Garros,
//     detecteur de fumee, chien renifleur, tri des letchis… — le fil du
//     chapitre, seules servies a la micro des faux positifs) ;
//   · une PRESENTATION des donnees (arbre, phrase « parmi », pourcentages,
//     notations, effectifs) ;
//   · une TOURNURE (« sachant que… », « parmi les… », notation $P_C(R)$…).
// Les nombres tombent juste (multiples de 0,05, effectifs choisis) : reponse
// exacte, ou arrondi ANNONCE dans l'enonce. QCM : les leurres sont les vraies
// erreurs (inverser condition et evenement, donner l'intersection, diviser
// par le total, additionner les branches au lieu des chemins) et deux choix
// n'ont jamais la meme valeur.
// =========================================================================

import type { TutorBankItemV4, CanvasFigure, DifficultyLevel, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choisir<T>(liste: readonly T[]): T {
  return liste[Math.floor(Math.random() * liste.length)];
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/**
 * Un decimal a la francaise, sans zeros inutiles.
 * ⛔ L'ordre des nettoyages compte : on enleve les zeros de queue AVANT de
 * changer le point en virgule, sinon la regex ne reconnait plus la decimale.
 */
function fmt(x: number, n = 3): string {
  return x
    .toFixed(n)
    .replace(/0+$/, "")
    .replace(/\.$/, "")
    .replace(".", ",");
}

/**
 * Quatre propositions garanties DISTINCTES.
 *
 * ⛔ Un distracteur peut rejoindre la bonne reponse selon le tirage — une
 * prevalence et un taux de faux positifs egaux donnent deux chemins de meme
 * probabilite — et le QCM offrait alors deux fois la meme case. On prend les
 * distracteurs voulus tant qu'ils different, puis on complete avec l'echelle de
 * secours. La position, elle, est melangee plus tard par questionPairBuilder.
 */
function choixDistincts(correct: string, voulus: string[], secours: string[]): string[] {
  const vus = new Set([correct]);
  const sortie = [correct];
  for (const c of [...voulus, ...secours]) {
    if (sortie.length === 4) break;
    if (!vus.has(c)) {
      vus.add(c);
      sortie.push(c);
    }
  }
  return sortie;
}

/* =========================================================================
   OUTILS DES GABARITS
========================================================================= */

type Q = TutorGeneratedQuestionV4;

/** Arrondi au dix-millieme : efface le bruit des flottants (0,3 × 0,2). */
const r4 = (x: number) => Math.round(x * 10000) / 10000;
/** Un nombre pour l'interieur des $…$ : « 0{,}35 ». */
const m = (x: number, n = 4) => fmt(x, n).replace(",", "{,}");
/** Les ecritures acceptees d'une reponse decimale (virgule et point). */
const rep = (x: number, n = 4) => [...new Set([fmt(x, n), String(r4(x))])];
/** « 37,5 % » : un pourcentage ecrit dans le texte. */
const pc = (x: number) => `${fmt(r4(x * 100), 2)} %`;
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « de pièces », « d'élèves », « d'œufs ». */
const deN = (s: string) => (/^[aeiouyéèêœh]/i.test(s) ? `d'${s}` : `de ${s}`);
/** « a », « a et b », « a, b et c ». */
const listeFr = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`);
/** Le quotient a/b tombe-t-il juste avec au plus `dec` decimales ? */
function juste(a: number, b: number, dec = 3): boolean {
  if (b <= 0) return false;
  const v = (a / b) * 10 ** dec;
  return Math.abs(v - Math.round(v)) < 1e-9;
}
/** Les multiples de 0,05 entre a et b. */
const pas5 = (a: number, b: number) => {
  const out: number[] = [];
  for (let k = Math.round(a * 20); k <= Math.round(b * 20); k++) out.push(k / 20);
  return out;
};

/* ---------- Les situations a deux evenements ---------- */

/** Un evenement : lettre, singulier, pluriel, negations, et deux etiquettes courtes. */
type Ev = { L: string; s: string; p: string; ns: string; np: string; t: string; nt: string };
const ev = (L: string, s: string, p: string, ns: string, np: string, t: string, nt: string): Ev => ({ L, s, p, ns, np, t, nt });

type Sit = {
  /** « Dans un lycée de Saint-Denis » : se prolonge en « , on choisit… ». */
  lieu: string;
  /** « On a interrogé » : suivi de l'effectif et de `pop`. */
  verbe: string;
  pop: string;
  /** Le nom au pluriel, sans article : « élèves ». */
  court: string;
  un: string;
  le: string;
  il: string;
  eux: string;
  ceux: string;
  A: Ev;
  B: Ev;
  /** Une situation de DEPISTAGE : A rare (l'etat reel), B le signal du test. */
  test: boolean;
};

function sit(lieu: string, verbe: string, pop: string, court: string, f: boolean, un: string, le: string, A: Ev, B: Ev, test = false): Sit {
  return { lieu, verbe, pop, court, un, le, il: f ? "elle" : "il", eux: f ? "elles" : "eux", ceux: f ? "celles" : "ceux", A, B, test };
}

const TEST_POS = (L = "T") => ev(L, "a un test positif", "ont un test positif", "a un test négatif", "ont un test négatif", "Test +", "Test −");

const GENERALES: readonly Sit[] = [
  sit("Dans un lycée de Saint-Denis", "On a interrogé", "élèves d'un lycée de Saint-Denis", "élèves", false, "un élève", "l'élève",
    ev("C", "prend le car jaune", "prennent le car jaune", "ne prend pas le car jaune", "ne prennent pas le car jaune", "Car jaune", "Autre trajet"),
    ev("R", "est arrivé en retard ce mois-ci", "sont arrivés en retard ce mois-ci", "n'est jamais arrivé en retard ce mois-ci", "ne sont jamais arrivés en retard ce mois-ci", "Retard", "À l'heure")),
  sit("Dans un lycée de Saint-Pierre", "On a recensé", "élèves de seconde d'un lycée de Saint-Pierre", "élèves", false, "un élève", "l'élève",
    ev("F", "est une fille", "sont des filles", "est un garçon", "sont des garçons", "Fille", "Garçon"),
    ev("D", "mange à la cantine", "mangent à la cantine", "ne mange pas à la cantine", "ne mangent pas à la cantine", "Cantine", "Externe")),
  sit("Au départ du Grand Raid", "Au départ du Grand Raid, on a suivi", "coureurs", "coureurs", false, "un coureur", "le coureur",
    ev("J", "a moins de 30 ans", "ont moins de 30 ans", "a 30 ans ou plus", "ont 30 ans ou plus", "Moins de 30", "30 et plus"),
    ev("T", "termine la course", "terminent la course", "abandonne", "abandonnent", "Arrivée", "Abandon")),
  sit("À la station météo de Saint-Pierre", "La station météo de Saint-Pierre a observé", "jours", "jours", false, "un jour", "le jour",
    ev("V", "a du vent fort", "ont du vent fort", "n'a pas de vent fort", "n'ont pas de vent fort", "Vent fort", "Peu de vent"),
    ev("P", "est pluvieux", "sont pluvieux", "est sec", "sont secs", "Pluie", "Sec")),
  sit("Dans un lycée du Tampon", "On a sondé", "élèves d'un lycée du Tampon", "élèves", false, "un élève", "l'élève",
    ev("S", "fait du sport en club", "font du sport en club", "ne fait pas de sport en club", "ne font pas de sport en club", "Sport", "Pas de sport"),
    ev("M", "a plus de 12 de moyenne en maths", "ont plus de 12 de moyenne en maths", "a 12 ou moins de moyenne en maths", "ont 12 ou moins de moyenne en maths", "Plus de 12", "12 ou moins")),
  sit("À la pêche aux canards de la kermesse", "À la pêche aux canards de la kermesse, on a observé", "joueurs", "joueurs", false, "un joueur", "le joueur",
    ev("E", "est un enfant", "sont des enfants", "est un adulte", "sont des adultes", "Enfant", "Adulte"),
    ev("G", "gagne un lot", "gagnent un lot", "repart sans lot", "repartent sans lot", "Lot", "Sans lot")),
  sit("Sur un étal du marché de Saint-Paul", "Sur un étal du marché de Saint-Paul, on a examiné", "letchis", "letchis", false, "un letchi", "le letchi",
    ev("C", "a été cueilli à la main", "ont été cueillis à la main", "a été ramassé au sol", "ont été ramassés au sol", "Cueilli", "Ramassé"),
    ev("A", "est abîmé", "sont abîmés", "est intact", "sont intacts", "Abîmé", "Intact")),
  sit("Sur une ligne du car jaune", "Sur une ligne du car jaune, on a compté", "voyageurs", "voyageurs", false, "un voyageur", "le voyageur",
    ev("B", "a un abonnement", "ont un abonnement", "n'a pas d'abonnement", "n'ont pas d'abonnement", "Abonné", "Non abonné"),
    ev("K", "est contrôlé", "sont contrôlés", "n'est pas contrôlé", "ne sont pas contrôlés", "Contrôlé", "Non contrôlé")),
  sit("Dans une exploitation de Saint-André", "Dans une exploitation de Saint-André, on a examiné", "ananas Victoria", "ananas", false, "un ananas", "l'ananas",
    ev("H", "vient de la parcelle du haut", "viennent de la parcelle du haut", "vient de la parcelle du bas", "viennent de la parcelle du bas", "Haut", "Bas"),
    ev("M", "est assez mûr pour être vendu", "sont assez mûrs pour être vendus", "n'est pas assez mûr", "ne sont pas assez mûrs", "Mûr", "Pas mûr")),
  sit("Dans une entreprise du Port", "Une entreprise du Port a interrogé", "salariés", "salariés", false, "un salarié", "le salarié",
    ev("V", "est vacciné contre la grippe", "sont vaccinés contre la grippe", "n'est pas vacciné contre la grippe", "ne sont pas vaccinés contre la grippe", "Vacciné", "Non vacciné"),
    ev("G", "a eu la grippe cet hiver", "ont eu la grippe cet hiver", "n'a pas eu la grippe cet hiver", "n'ont pas eu la grippe cet hiver", "Grippe", "Pas de grippe")),
  sit("Sur une plateforme de musique", "Une plateforme de musique a étudié", "abonnés réunionnais", "abonnés", false, "un abonné", "l'abonné",
    ev("M", "écoute du maloya", "écoutent du maloya", "n'écoute pas de maloya", "n'écoutent pas de maloya", "Maloya", "Pas maloya"),
    ev("S", "écoute du séga", "écoutent du séga", "n'écoute pas de séga", "n'écoutent pas de séga", "Séga", "Pas séga")),
  sit("Sur la plage de l'Hermitage", "Sur la plage de l'Hermitage, on a interrogé", "baigneurs", "baigneurs", false, "un baigneur", "le baigneur",
    ev("O", "habite dans l'Ouest", "habitent dans l'Ouest", "n'habite pas dans l'Ouest", "n'habitent pas dans l'Ouest", "Ouest", "Ailleurs"),
    ev("H", "vient chaque semaine", "viennent chaque semaine", "vient moins souvent", "viennent moins souvent", "Habitué", "Occasionnel")),
  sit("Au Pas de Bellecombe", "Au Pas de Bellecombe, on a interrogé", "randonneurs montés au Piton de la Fournaise", "randonneurs", false, "un randonneur", "le randonneur",
    ev("T", "est parti avant l'aube", "sont partis avant l'aube", "est parti après l'aube", "sont partis après l'aube", "Avant l'aube", "Après l'aube"),
    ev("D", "a vu le cratère sans nuages", "ont vu le cratère sans nuages", "a trouvé le cratère dans les nuages", "ont trouvé le cratère dans les nuages", "Dégagé", "Nuages")),
  sit("À l'aéroport Roland-Garros", "L'aéroport Roland-Garros a recensé", "vols au départ", "vols", false, "un vol", "le vol",
    ev("M", "part vers la métropole", "partent vers la métropole", "part vers une autre destination", "partent vers une autre destination", "Métropole", "Autre"),
    ev("R", "décolle en retard", "décollent en retard", "décolle à l'heure", "décollent à l'heure", "Retard", "À l'heure")),
  sit("Au concours de pêche de Saint-Leu", "Au concours de pêche de Saint-Leu, on a pesé", "poissons", "poissons", false, "un poisson", "le poisson",
    ev("L", "a été pris au large", "ont été pris au large", "a été pris près du bord", "ont été pris près du bord", "Large", "Bord"),
    ev("K", "pèse plus d'un kilo", "pèsent plus d'un kilo", "pèse un kilo ou moins", "pèsent un kilo ou moins", "Plus d'un kg", "Un kg ou moins")),
  sit("Au club de jeux du lycée", "Au club de jeux du lycée, on a noté", "parties de petits chevaux", "parties", true, "une partie", "la partie",
    ev("Q", "se joue à quatre joueurs", "se jouent à quatre joueurs", "se joue à moins de quatre joueurs", "se jouent à moins de quatre joueurs", "Quatre", "Moins de quatre"),
    ev("L", "dure plus d'une heure", "durent plus d'une heure", "dure une heure ou moins", "durent une heure ou moins", "Longue", "Courte")),
  sit("À la tombola de la kermesse", "À la tombola de la kermesse, on a vendu", "billets", "billets", false, "un billet", "le billet",
    ev("M", "a été vendu le matin", "ont été vendus le matin", "a été vendu l'après-midi", "ont été vendus l'après-midi", "Matin", "Après-midi"),
    ev("G", "est gagnant", "sont gagnants", "est perdant", "sont perdants", "Gagnant", "Perdant")),
  sit("Dans le grand bocal de la boutique", "Dans le grand bocal de la boutique, on a compté", "bonbons", "bonbons", false, "un bonbon", "le bonbon",
    ev("F", "est à la fraise", "sont à la fraise", "n'est pas à la fraise", "ne sont pas à la fraise", "Fraise", "Autre goût"),
    ev("A", "est acidulé", "sont acidulés", "n'est pas acidulé", "ne sont pas acidulés", "Acidulé", "Doux")),
  sit("Dans le sac de billes de Lucas", "Dans le sac de Lucas, on a compté", "billes", "billes", true, "une bille", "la bille",
    ev("R", "est rouge", "sont rouges", "n'est pas rouge", "ne sont pas rouges", "Rouge", "Autre"),
    ev("V", "est en verre", "sont en verre", "est en plastique", "sont en plastique", "Verre", "Plastique")),
  sit("Dans une collection de cartes Pokémon", "Dans une collection, on a compté", "cartes Pokémon", "cartes", true, "une carte", "la carte",
    ev("F", "est de type Feu", "sont de type Feu", "n'est pas de type Feu", "ne sont pas de type Feu", "Feu", "Autre type"),
    ev("B", "est brillante", "sont brillantes", "n'est pas brillante", "ne sont pas brillantes", "Brillante", "Normale")),
  sit("Au club de basket de Saint-André", "Au club de basket de Saint-André, on a relevé", "tirs d'une joueuse", "tirs", false, "un tir", "le tir",
    ev("T", "est tenté à trois points", "sont tentés à trois points", "est tenté à deux points", "sont tentés à deux points", "Trois points", "Deux points"),
    ev("R", "est réussi", "sont réussis", "est raté", "sont ratés", "Réussi", "Raté")),
  sit("Pour une équipe de foot de Saint-Benoît", "Pour une équipe de foot de Saint-Benoît, on a relevé", "matchs", "matchs", false, "un match", "le match",
    ev("D", "se joue à domicile", "se jouent à domicile", "se joue à l'extérieur", "se jouent à l'extérieur", "Domicile", "Extérieur"),
    ev("G", "est gagné", "sont gagnés", "n'est pas gagné", "ne sont pas gagnés", "Gagné", "Pas gagné")),
  sit("Sur la route de Cilaos", "Sur la route de Cilaos, on a chronométré", "trajets en car", "trajets", false, "un trajet", "le trajet",
    ev("P", "a lieu un jour de pluie", "ont lieu un jour de pluie", "a lieu un jour sec", "ont lieu un jour sec", "Pluie", "Sec"),
    ev("L", "dure plus d'une heure", "durent plus d'une heure", "dure une heure ou moins", "durent une heure ou moins", "Long", "Court")),
  sit("Au CDI du lycée", "Au CDI du lycée, on a relevé", "emprunts de livres", "emprunts", false, "un emprunt", "l'emprunt",
    ev("B", "concerne une bande dessinée", "concernent une bande dessinée", "concerne un autre livre", "concernent un autre livre", "BD", "Autre livre"),
    ev("R", "est rendu en retard", "sont rendus en retard", "est rendu à temps", "sont rendus à temps", "Retard", "À temps")),
  sit("Dans un lycée de Saint-Benoît", "On a interrogé", "élèves de seconde d'un lycée de Saint-Benoît", "élèves", false, "un élève", "l'élève",
    ev("E", "utilise un écran après 22 h", "utilisent un écran après 22 h", "n'utilise pas d'écran après 22 h", "n'utilisent pas d'écran après 22 h", "Écran", "Pas d'écran"),
    ev("S", "dort moins de huit heures", "dorment moins de huit heures", "dort huit heures ou plus", "dorment huit heures ou plus", "Peu dormi", "Bien dormi")),
  sit("Au snack du front de mer de Saint-Pierre", "Au snack du front de mer, on a préparé", "samoussas", "samoussas", false, "un samoussa", "le samoussa",
    ev("P", "est au poulet", "sont au poulet", "n'est pas au poulet", "ne sont pas au poulet", "Poulet", "Autre"),
    ev("Q", "est piquant", "sont piquants", "n'est pas piquant", "ne sont pas piquants", "Piquant", "Doux")),
  sit("Dans le cirque de Mafate", "Dans le cirque de Mafate, on a interrogé", "randonneurs", "randonneurs", false, "un randonneur", "le randonneur",
    ev("G", "dort en gîte", "dorment en gîte", "dort sous la tente", "dorment sous la tente", "Gîte", "Tente"),
    ev("L", "reste plus de deux jours", "restent plus de deux jours", "reste deux jours ou moins", "restent deux jours ou moins", "Long séjour", "Court séjour")),
  sit("À la Cité du Volcan", "À la Cité du Volcan, on a interrogé", "visiteurs", "visiteurs", false, "un visiteur", "le visiteur",
    ev("F", "vient en famille", "viennent en famille", "vient seul ou entre amis", "viennent seuls ou entre amis", "Famille", "Seul ou amis"),
    ev("S", "achète un souvenir", "achètent un souvenir", "n'achète rien", "n'achètent rien", "Souvenir", "Rien")),
  sit("À l'école de surf de Saint-Leu", "À l'école de surf de Saint-Leu, on a suivi", "élèves surfeurs", "élèves", false, "un élève", "l'élève",
    ev("A", "surfe depuis plus d'un an", "surfent depuis plus d'un an", "surfe depuis moins d'un an", "surfent depuis moins d'un an", "Confirmé", "Débutant"),
    ev("D", "se lève dès la première vague", "se lèvent dès la première vague", "tombe à la première vague", "tombent à la première vague", "Debout", "Chute")),
];

/** Les depistages : A est l'etat reel (rare), B le signal du test. */
const DEPISTAGES: readonly Sit[] = [
  sit("Lors d'une campagne de dépistage de la dengue", "Lors d'une campagne de dépistage de la dengue, on a testé", "personnes", "personnes", true, "une personne", "la personne",
    ev("M", "est porteuse de la dengue", "sont porteuses de la dengue", "n'est pas porteuse de la dengue", "ne sont pas porteuses de la dengue", "Dengue", "Pas dengue"), TEST_POS(), true),
  sit("Lors d'une campagne contre le chikungunya", "Lors d'une campagne contre le chikungunya, on a testé", "personnes", "personnes", true, "une personne", "la personne",
    ev("C", "est porteuse du chikungunya", "sont porteuses du chikungunya", "n'est pas porteuse du chikungunya", "ne sont pas porteuses du chikungunya", "Chik", "Pas chik"), TEST_POS(), true),
  sit("Dans un centre de santé de Saint-Benoît", "Dans un centre de santé de Saint-Benoît, on a testé", "agriculteurs", "agriculteurs", false, "un agriculteur", "l'agriculteur",
    ev("L", "a la leptospirose", "ont la leptospirose", "n'a pas la leptospirose", "n'ont pas la leptospirose", "Lepto", "Pas lepto"), TEST_POS(), true),
  sit("Lors d'une journée de dépistage du diabète", "Lors d'une journée de dépistage du diabète, on a testé", "personnes", "personnes", true, "une personne", "la personne",
    ev("D", "est diabétique", "sont diabétiques", "n'est pas diabétique", "ne sont pas diabétiques", "Diabète", "Pas diabète"),
    ev("G", "a une glycémie anormale au test", "ont une glycémie anormale au test", "a une glycémie normale au test", "ont une glycémie normale au test", "Anormale", "Normale"), true),
  sit("À la visite médicale du lycée", "À la visite médicale du lycée, on a examiné", "élèves", "élèves", false, "un élève", "l'élève",
    ev("V", "a un problème de vue", "ont un problème de vue", "n'a pas de problème de vue", "n'ont pas de problème de vue", "Problème", "Vue normale"),
    ev("E", "échoue au test de lecture", "échouent au test de lecture", "réussit le test de lecture", "réussissent le test de lecture", "Échec", "Réussite"), true),
  sit("Au Grand Raid", "Au Grand Raid, on a contrôlé", "coureurs", "coureurs", false, "un coureur", "le coureur",
    ev("D", "est dopé", "sont dopés", "n'est pas dopé", "ne sont pas dopés", "Dopé", "Non dopé"),
    ev("C", "a un contrôle positif", "ont un contrôle positif", "a un contrôle négatif", "ont un contrôle négatif", "Positif", "Négatif"), true),
  sit("Lors d'un contrôle routier à Saint-Paul", "Lors d'un contrôle routier à Saint-Paul, on a testé", "conducteurs", "conducteurs", false, "un conducteur", "le conducteur",
    ev("A", "dépasse le taux d'alcool autorisé", "dépassent le taux d'alcool autorisé", "respecte le taux d'alcool autorisé", "respectent le taux d'alcool autorisé", "Au-dessus", "En dessous"),
    ev("E", "a un éthylotest positif", "ont un éthylotest positif", "a un éthylotest négatif", "ont un éthylotest négatif", "Positif", "Négatif"), true),
  sit("Dans une messagerie", "Une messagerie a analysé", "courriels", "courriels", false, "un courriel", "le courriel",
    ev("S", "est un spam", "sont des spams", "n'est pas un spam", "ne sont pas des spams", "Spam", "Normal"),
    ev("F", "est classé indésirable par le filtre", "sont classés indésirables par le filtre", "arrive dans la boîte de réception", "arrivent dans la boîte de réception", "Indésirable", "Reçu"), true),
  sit("Au portique de sécurité de l'aéroport Roland-Garros", "Au portique de sécurité de l'aéroport Roland-Garros, on a observé", "voyageurs", "voyageurs", false, "un voyageur", "le voyageur",
    ev("O", "transporte un objet interdit", "transportent un objet interdit", "ne transporte aucun objet interdit", "ne transportent aucun objet interdit", "Interdit", "Rien"),
    ev("S", "fait sonner le portique", "font sonner le portique", "passe sans faire sonner le portique", "passent sans faire sonner le portique", "Sonne", "Silence"), true),
  sit("Dans une résidence étudiante", "Dans une résidence étudiante, on a suivi pendant un an", "cuisines", "cuisines", true, "une cuisine", "la cuisine",
    ev("I", "a connu un début d'incendie", "ont connu un début d'incendie", "n'a connu aucun début d'incendie", "n'ont connu aucun début d'incendie", "Incendie", "Aucun"),
    ev("D", "a eu une alarme du détecteur de fumée", "ont eu une alarme du détecteur de fumée", "n'a eu aucune alarme", "n'ont eu aucune alarme", "Alarme", "Silence"), true),
  sit("Sur les ordinateurs du lycée", "Sur les ordinateurs du lycée, l'antivirus a analysé", "fichiers", "fichiers", false, "un fichier", "le fichier",
    ev("V", "est infecté", "sont infectés", "est sain", "sont sains", "Infecté", "Sain"),
    ev("A", "déclenche une alerte de l'antivirus", "déclenchent une alerte de l'antivirus", "ne déclenche aucune alerte", "ne déclenchent aucune alerte", "Alerte", "Rien"), true),
  sit("Dans une usine de yaourts de Sainte-Marie", "Dans une usine de yaourts de Sainte-Marie, on a contrôlé", "pots", "pots", false, "un pot", "le pot",
    ev("D", "est défectueux", "sont défectueux", "est conforme", "sont conformes", "Défectueux", "Conforme"),
    ev("R", "est rejeté par la machine de contrôle", "sont rejetés par la machine de contrôle", "est accepté par la machine de contrôle", "sont acceptés par la machine de contrôle", "Rejeté", "Accepté"), true),
  sit("Dans une banque de Saint-Denis", "Dans une banque de Saint-Denis, on a vérifié", "billets", "billets", false, "un billet", "le billet",
    ev("F", "est un faux", "sont des faux", "est authentique", "sont authentiques", "Faux", "Vrai"),
    ev("S", "est signalé par le détecteur", "sont signalés par le détecteur", "n'est pas signalé par le détecteur", "ne sont pas signalés par le détecteur", "Signalé", "Accepté"), true),
  sit("À la douane du port de la Pointe des Galets", "À la douane du port de la Pointe des Galets, on a inspecté", "bagages", "bagages", false, "un bagage", "le bagage",
    ev("I", "contient un produit interdit", "contiennent un produit interdit", "ne contient rien d'interdit", "ne contiennent rien d'interdit", "Interdit", "Rien"),
    ev("C", "fait réagir le chien renifleur", "font réagir le chien renifleur", "laisse le chien indifférent", "laissent le chien indifférent", "Réaction", "Indifférent"), true),
  sit("Chez des apiculteurs de la Plaine des Cafres", "Chez des apiculteurs de la Plaine des Cafres, on a testé", "ruches", "ruches", true, "une ruche", "la ruche",
    ev("V", "est infestée par le varroa", "sont infestées par le varroa", "n'est pas infestée par le varroa", "ne sont pas infestées par le varroa", "Varroa", "Saine"), TEST_POS(), true),
  sit("Dans une station de tri de letchis", "Dans une station de tri, on a fait passer", "letchis", "letchis", false, "un letchi", "le letchi",
    ev("V", "est véreux", "sont véreux", "est sain", "sont sains", "Véreux", "Sain"),
    ev("E", "est écarté par la machine de tri", "sont écartés par la machine de tri", "est gardé par la machine de tri", "sont gardés par la machine de tri", "Écarté", "Gardé"), true),
  sit("Sur la plage de Boucan Canot", "Sur la plage de Boucan Canot, un chercheur de trésors a sondé", "zones de sable", "zones", true, "une zone", "la zone",
    ev("O", "cache un objet métallique", "cachent un objet métallique", "ne cache rien", "ne cachent rien", "Objet", "Rien"),
    ev("B", "fait biper le détecteur", "font biper le détecteur", "ne fait pas biper le détecteur", "ne font pas biper le détecteur", "Bip", "Silence"), true),
  sit("Au centre météo de La Réunion", "Le centre météo de La Réunion a suivi", "dépressions tropicales", "dépressions", true, "une dépression", "la dépression",
    ev("C", "touche l'île en cyclone", "touchent l'île en cyclone", "ne touche pas l'île en cyclone", "ne touchent pas l'île en cyclone", "Cyclone", "Épargnée"),
    ev("A", "déclenche une alerte orange", "déclenchent une alerte orange", "ne déclenche pas d'alerte orange", "ne déclenchent pas d'alerte orange", "Alerte", "Pas d'alerte"), true),
  sit("Lors d'une collecte de sang à Saint-Pierre", "Lors d'une collecte de sang à Saint-Pierre, on a testé", "donneurs", "donneurs", false, "un donneur", "le donneur",
    ev("A", "a une anémie", "ont une anémie", "n'a pas d'anémie", "n'ont pas d'anémie", "Anémie", "Pas d'anémie"), TEST_POS(), true),
  sit("Chez un allergologue de Saint-Denis", "Chez un allergologue de Saint-Denis, on a testé", "enfants", "enfants", false, "un enfant", "l'enfant",
    ev("A", "est allergique à l'arachide", "sont allergiques à l'arachide", "n'est pas allergique à l'arachide", "ne sont pas allergiques à l'arachide", "Allergique", "Pas allergique"),
    ev("T", "a un test cutané positif", "ont un test cutané positif", "a un test cutané négatif", "ont un test cutané négatif", "Test +", "Test −"), true),
];

const TOUTES: readonly Sit[] = [...GENERALES, ...DEPISTAGES];

/* ---------- Les evenements d'une situation ---------- */

/** Un evenement ou son contraire : notation, phrases, etiquette d'arbre, cle. */
type E = { tex: string; s: string; p: string; lab: string; t: string; k: "A" | "nA" | "B" | "nB" };
function evs(c: Sit) {
  const a: E = { tex: c.A.L, s: c.A.s, p: c.A.p, lab: c.A.L, t: c.A.t, k: "A" };
  const na: E = { tex: `\\overline{${c.A.L}}`, s: c.A.ns, p: c.A.np, lab: `${c.A.L}̄`, t: c.A.nt, k: "nA" };
  const b: E = { tex: c.B.L, s: c.B.s, p: c.B.p, lab: c.B.L, t: c.B.t, k: "B" };
  const nb: E = { tex: `\\overline{${c.B.L}}`, s: c.B.ns, p: c.B.np, lab: `${c.B.L}̄`, t: c.B.nt, k: "nB" };
  return { a, na, b, nb };
}
const contraire = (c: Sit, x: E): E => {
  const { a, na, b, nb } = evs(c);
  return x.k === "A" ? na : x.k === "nA" ? a : x.k === "B" ? nb : b;
};
const P = (x: E) => `P(${x.tex})`;
const PS = (x: E, y: E) => `P_{${x.tex}}(${y.tex})`;
const PI = (x: E, y: E) => `P(${x.tex} \\cap ${y.tex})`;
const cadre = (c: Sit) => `${c.lieu}, on choisit ${c.un} au hasard.`;
const nomme = (c: Sit) => `On note $${c.A.L}$ l'événement « ${c.le} ${c.A.s} » et $${c.B.L}$ l'événement « ${c.le} ${c.B.s} ».`;
const que = (c: Sit) => `qu'${c.il}`;
const INTRO_ARBRE = [
  "L'arbre pondéré ci-contre décrit la situation.",
  "Voici l'arbre pondéré de la situation.",
  "On a représenté la situation par un arbre pondéré.",
];
const introArbre = (c: Sit) => `${cadre(c)} ${nomme(c)} ${choisir(INTRO_ARBRE)}`;

/* ---------- Les nombres d'un arbre ---------- */

type V = {
  /** Probabilites « simples » : A, nA, B, nB. */
  mg: Record<string, number>;
  /** Probabilites des branches du second niveau : « A|B » = P_A(B). */
  br: Record<string, number>;
  /** Probabilites des chemins : « AB » = P(A ∩ B), « nAnB »… */
  ch: Record<string, number>;
};
function valeurs(pA: number, pBA: number, pBnA: number): V {
  const pnA = r4(1 - pA);
  const br = { "A|B": pBA, "A|nB": r4(1 - pBA), "nA|B": pBnA, "nA|nB": r4(1 - pBnA) };
  const ch = {
    AB: r4(pA * br["A|B"]),
    AnB: r4(pA * br["A|nB"]),
    nAB: r4(pnA * br["nA|B"]),
    nAnB: r4(pnA * br["nA|nB"]),
  };
  const mg = { A: pA, nA: pnA, B: r4(ch.AB + ch.nAB), nB: r4(ch.AnB + ch.nAnB) };
  return { mg, br, ch };
}
/** Un arbre « ordinaire » : multiples de 0,05, deux branches B distinctes. */
function tirArbre(): V {
  const pA = choisir(pas5(0.15, 0.85));
  let pBA = 0.5;
  let pBnA = 0.5;
  while (pBA === pBnA) {
    pBA = choisir(pas5(0.05, 0.95));
    pBnA = choisir(pas5(0.05, 0.95));
  }
  return valeurs(pA, pBA, pBnA);
}
/** Un depistage : etat rare, test sensible, quelques fausses alertes. */
function tirTest(): V {
  const pA = choisir([0.01, 0.02, 0.04, 0.05, 0.1, 0.2]);
  const sens = choisir([0.8, 0.85, 0.9, 0.95, 0.98, 0.99]);
  const faux = choisir([0.01, 0.02, 0.05, 0.1, 0.15, 0.2]);
  return valeurs(pA, sens, faux);
}
const tirage = (c: Sit): V => (c.test ? tirTest() : tirArbre());
const cle = (x: E, y: E) => `${x.k}${y.k}`;
const branche = (v: V, x: E, y: E) => v.br[`${x.k}|${y.k}`];

/** Les quatre chemins d'un arbre, dans l'ordre du dessin. */
function chemins(c: Sit, v: V) {
  const { a, na, b, nb } = evs(c);
  return [
    { X: a, Y: b, p1: v.mg.A, p2: v.br["A|B"], p: v.ch.AB },
    { X: a, Y: nb, p1: v.mg.A, p2: v.br["A|nB"], p: v.ch.AnB },
    { X: na, Y: b, p1: v.mg.nA, p2: v.br["nA|B"], p: v.ch.nAB },
    { X: na, Y: nb, p1: v.mg.nA, p2: v.br["nA|nB"], p: v.ch.nAnB },
  ];
}

/**
 * L'arbre d'une situation. `caches` remplace des pondérations par « ? » :
 * « A », « nA », « A|B », « A|nB », « nA|B », « nA|nB ».
 * Les feuilles portent la lettre (et sa barre) : courtes, elles tiennent.
 */
function arbre(c: Sit, v: V, caches: string[] = []): CanvasFigure {
  const lab = (k: string, x: number) => (caches.includes(k) ? "?" : fmt(x, 4));
  const { a, na, b, nb } = evs(c);
  return {
    kind: "arbre_proba",
    titre: `${c.A.L} : ${c.A.t} · ${c.B.L} : ${c.B.t}`,
    racineEnfants: [
      {
        label: a.lab,
        proba: lab("A", v.mg.A),
        enfants: [
          { label: b.lab, proba: lab("A|B", v.br["A|B"]) },
          { label: nb.lab, proba: lab("A|nB", v.br["A|nB"]) },
        ],
      },
      {
        label: na.lab,
        proba: lab("nA", v.mg.nA),
        enfants: [
          { label: b.lab, proba: lab("nA|B", v.br["nA|B"]) },
          { label: nb.lab, proba: lab("nA|nB", v.br["nA|nB"]) },
        ],
      },
    ],
  };
}

/** Les donnees d'un arbre ecrites en phrases (pour construire l'arbre soi-meme). */
function donneesTexte(c: Sit, v: V): string {
  const pA = v.mg.A;
  const pBA = v.br["A|B"];
  const pBnA = v.br["nA|B"];
  const t = randomInt(0, 2);
  if (t === 0)
    return `${c.lieu}, ${pc(pA)} des ${c.court} ${c.A.p}. Parmi ${c.eux}, ${pc(pBA)} ${c.B.p} ; parmi les autres, ${pc(pBnA)} ${c.B.p}.`;
  if (t === 1)
    return `${c.lieu}, ${pc(pA)} des ${c.court} ${c.A.p} ; ${pc(pBA)} de ${c.ceux}-ci ${c.B.p}, contre ${pc(pBnA)} des ${c.court} qui ${c.A.np}.`;
  return `${c.lieu}, ${pc(r4(1 - pA))} des ${c.court} ${c.A.np}. Parmi ${c.ceux} qui ${c.A.p}, ${pc(pBA)} ${c.B.p} ; parmi ${c.ceux} qui ${c.A.np}, ${pc(pBnA)} ${c.B.p}.`;
}

/** Un effectif qui rend `N × p` entier, pour « sur N personnes, combien… ». */
function effectifEntier(ps: number[]): number {
  const ok = [400, 800, 1000, 2000, 4000, 5000, 10000, 20000, 50000].filter((N) =>
    ps.every((p) => Math.abs(N * p - Math.round(N * p)) < 1e-6)
  );
  return ok.length ? choisir(ok) : 10000;
}

/* ---------- Les tableaux croises ---------- */

type Eff = { N: number; nA: number; nAB: number; nB: number };
function tirEff(c: Sit, ok: (e: Eff) => boolean = () => true, totaux?: readonly number[]): Eff {
  for (let k = 0; k < 20000; k++) {
    const N = totaux ? choisir(totaux) : randomInt(10, 60) * 10;
    let nA: number;
    let nAB: number;
    let nnAB: number;
    if (c.test) {
      nA = randomInt(Math.ceil(0.05 * N), Math.floor(0.25 * N));
      nAB = randomInt(Math.ceil(0.7 * nA), nA - 1);
      nnAB = randomInt(1, Math.floor(0.25 * (N - nA)));
    } else {
      nA = randomInt(Math.ceil(0.2 * N), Math.floor(0.7 * N));
      nAB = randomInt(Math.max(1, Math.ceil(0.1 * nA)), Math.floor(0.9 * nA));
      const reste = N - nA;
      nnAB = randomInt(Math.max(1, Math.ceil(0.1 * reste)), Math.floor(0.9 * reste));
    }
    const e = { N, nA, nAB, nB: nAB + nnAB };
    if (nAB >= 1 && nAB < nA && nnAB >= 1 && nnAB < N - nA && ok(e)) return e;
  }
  return { N: 200, nA: 80, nAB: 30, nB: 90 };
}
/** Les neuf cases d'un tableau, rangees par cle (« AB », « nA », « N »…). */
function cases(e: Eff): Record<string, number> {
  return {
    AB: e.nAB,
    AnB: e.nA - e.nAB,
    nAB: e.nB - e.nAB,
    nAnB: e.N - e.nA - e.nB + e.nAB,
    A: e.nA,
    nA: e.N - e.nA,
    B: e.nB,
    nB: e.N - e.nB,
    N: e.N,
  };
}
function tableau(c: Sit, e: Eff, cache?: string): CanvasFigure {
  const k = cases(e);
  const val = (cl: string) => (cl === cache ? "?" : k[cl]);
  return {
    kind: "tableau_donnees",
    title: maj(c.pop),
    headers: ["", c.B.t, c.B.nt, "Total"],
    rows: [
      { label: c.A.t, values: [val("AB"), val("AnB"), val("A")] },
      { label: c.A.nt, values: [val("nAB"), val("nAnB"), val("nA")] },
      { label: "Total", values: [val("B"), val("nB"), val("N")] },
    ],
    display: { striped: true },
  };
}
const INTRO_TABLEAU = [
  "Le tableau ci-contre donne la répartition.",
  "Les résultats sont rangés dans le tableau croisé ci-contre.",
  "Voici le tableau croisé des effectifs.",
];
const introTableau = (c: Sit, e: Eff) => `${c.verbe} $${e.N}$ ${c.pop}. ${choisir(INTRO_TABLEAU)}`;

/** Une fraction ecrite pour l'ecran. */
const frac = (a: number, b: number) => `$\\dfrac{${a}}{${b}}$`;
/** QCM de fractions : la bonne, et trois leurres de VALEURS distinctes. */
function qcmFrac(bon: [number, number], leurres: [number, number][]): string[] {
  const val = (f: [number, number]) => f[0] / f[1];
  const pris: [number, number][] = [];
  const secours: [number, number][] = [[bon[0] + 1, bon[1]], [bon[0], bon[1] + 10], [Math.max(1, bon[0] - 1), bon[1]], [bon[0] + 2, bon[1] + 5]];
  for (const l of [...leurres, ...secours]) {
    if (pris.length === 3) break;
    if (l[1] <= 0 || l[0] < 0) continue;
    if ([bon, ...pris].some((p) => Math.abs(val(p) - val(l)) < 1e-9)) continue;
    pris.push(l);
  }
  return [frac(bon[0], bon[1]), ...pris.map((f) => frac(f[0], f[1]))];
}
/** QCM de decimaux : la bonne valeur et des leurres de valeurs distinctes. */
function qcmNum(bon: number, leurres: number[], n = 4): string[] {
  const pris: number[] = [];
  const secours = [r4(bon + 0.1), r4(bon / 2), r4(bon * 2), 0.5, 1];
  for (const l of [...leurres, ...secours]) {
    if (pris.length === 3) break;
    if (!(l >= 0)) continue;
    if ([bon, ...pris].some((p) => Math.abs(p - r4(l)) < 1e-9)) continue;
    pris.push(r4(l));
  }
  return [`$${m(bon, n)}$`, ...pris.map((x) => `$${m(x, n)}$`)];
}

/* ---------- Les situations a deux ou trois provenances ---------- */

type Trio = {
  lieu: string;
  objets: string;
  sources: string;
  un: string;
  le: string;
  labels: string[];
  de: string[];
  pour: string[];
  D: Ev;
  taux: number[];
};
const trio = (lieu: string, objets: string, sources: string, un: string, le: string, labels: string[], de: string[], pour: string[], D: Ev, taux: number[]): Trio => ({
  lieu, objets, sources, un, le, labels, de, pour, D, taux,
});
const TRIOS: readonly Trio[] = [
  trio("Dans une usine du Port", "pièces", "machines", "une pièce", "la pièce", ["A", "B", "C"],
    ["de la machine A", "de la machine B", "de la machine C"], ["pour la machine A", "pour la machine B", "pour la machine C"],
    ev("D", "est défectueuse", "sont défectueuses", "n'est pas défectueuse", "ne sont pas défectueuses", "Déf.", "OK"), [0.01, 0.02, 0.03, 0.04, 0.05]),
  trio("Dans une coopérative de letchis", "letchis", "vergers", "un letchi", "le letchi", ["St-Paul", "St-André", "St-Benoît"],
    ["du verger de Saint-Paul", "du verger de Saint-André", "du verger de Saint-Benoît"], ["pour Saint-Paul", "pour Saint-André", "pour Saint-Benoît"],
    ev("A", "est abîmé", "sont abîmés", "est intact", "sont intacts", "Abîmé", "Intact"), [0.05, 0.1, 0.15, 0.2]),
  trio("Dans une épicerie de Saint-Joseph", "œufs", "fermes", "un œuf", "l'œuf", ["F1", "F2", "F3"],
    ["de la ferme F1", "de la ferme F2", "de la ferme F3"], ["pour la ferme F1", "pour la ferme F2", "pour la ferme F3"],
    ev("F", "est fêlé", "sont fêlés", "n'est pas fêlé", "ne sont pas fêlés", "Fêlé", "Intact"), [0.02, 0.04, 0.05, 0.1]),
  trio("Pour un magasin en ligne", "colis", "transporteurs", "un colis", "le colis", ["T1", "T2"],
    ["du transporteur T1", "du transporteur T2"], ["pour le transporteur T1", "pour le transporteur T2"],
    ev("R", "arrive en retard", "arrivent en retard", "arrive à l'heure", "arrivent à l'heure", "Retard", "À l'heure"), [0.05, 0.1, 0.15, 0.2, 0.25]),
  trio("À la gare routière de Saint-Denis", "cars jaunes", "lignes", "un car", "le car", ["L1", "L2", "L3"],
    ["de la ligne L1", "de la ligne L2", "de la ligne L3"], ["pour la ligne L1", "pour la ligne L2", "pour la ligne L3"],
    ev("R", "part en retard", "partent en retard", "part à l'heure", "partent à l'heure", "Retard", "À l'heure"), [0.05, 0.1, 0.15, 0.2, 0.3]),
  trio("Dans un magasin de bricolage", "ampoules", "fournisseurs", "une ampoule", "l'ampoule", ["F1", "F2"],
    ["du fournisseur F1", "du fournisseur F2"], ["pour le fournisseur F1", "pour le fournisseur F2"],
    ev("D", "est défectueuse", "sont défectueuses", "fonctionne", "fonctionnent", "Déf.", "OK"), [0.01, 0.02, 0.04, 0.05]),
  trio("À la tombola de la kermesse", "billets", "stands", "un billet", "le billet", ["S1", "S2", "S3"],
    ["du stand S1", "du stand S2", "du stand S3"], ["pour le stand S1", "pour le stand S2", "pour le stand S3"],
    ev("G", "est gagnant", "sont gagnants", "est perdant", "sont perdants", "Gagnant", "Perdant"), [0.05, 0.1, 0.15, 0.2]),
  trio("Dans un lycée de Saint-Louis", "élèves de seconde", "classes", "un élève", "l'élève", ["2de1", "2de2", "2de3"],
    ["de la seconde 1", "de la seconde 2", "de la seconde 3"], ["pour la seconde 1", "pour la seconde 2", "pour la seconde 3"],
    ev("D", "est demi-pensionnaire", "sont demi-pensionnaires", "est externe", "sont externes", "Cantine", "Externe"), [0.4, 0.5, 0.6, 0.7, 0.8]),
  trio("Dans une exploitation de Sainte-Suzanne", "ananas", "parcelles", "un ananas", "l'ananas", ["P1", "P2", "P3"],
    ["de la parcelle P1", "de la parcelle P2", "de la parcelle P3"], ["pour la parcelle P1", "pour la parcelle P2", "pour la parcelle P3"],
    ev("M", "est mûr", "sont mûrs", "n'est pas mûr", "ne sont pas mûrs", "Mûr", "Pas mûr"), [0.6, 0.7, 0.75, 0.8, 0.9]),
];

function gab(
  id: string,
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  tags: string[],
  generate: () => Q
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["seconde", "maths", "probabilites", ...tags, "template"],
    generate,
  };
}

/* =========================================================================
   LES ITEMS FIGES : definitions et proprietes (inchanges)
========================================================================= */

const FIGES: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "seconde_pcond_def_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 1,
    theme: "neutral",
    text: "Comment se lit la notation $P_A(B)$ ?",
    format: "qcm",
    choices: [
      "la probabilité de $B$ sachant $A$",
      "la probabilité de $A$ sachant $B$",
      "la probabilité de $A$ et $B$",
      "la probabilité de $A$ ou $B$",
    ],
    expected: ["la probabilité de $B$ sachant $A$"],
    comparator: "mcq_exact",
    hint: "L'évènement écrit EN BAS est celui que l'on sait déjà réalisé.",
    explanation: exp(
      "$P_A(B)$ est la probabilité de $B$ dans le monde où $A$ est déjà arrivé.",
      "On repère l'évènement placé en indice : c'est la condition, pas la question.",
      "Ici l'indice est $A$, donc $A$ est connu et l'on s'interroge sur $B$.",
      "$P_A(B)$ se lit « probabilité de $B$ sachant $A$ »."
    ),
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "notation", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_def_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle formule donne $P_A(B)$ ?",
    format: "qcm",
    choices: [
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(B)}$",
      "$P_A(B) = P(A) \\times P(B)$",
      "$P_A(B) = P(A) + P(B)$",
    ],
    expected: ["$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$"],
    comparator: "mcq_exact",
    hint: "On se restreint au monde $A$ : c'est donc par $P(A)$ que l'on divise.",
    explanation: exp(
      "Conditionner par $A$, c'est prendre $A$ comme nouvel univers.",
      "On compte la part de $A$ qui contient aussi $B$, puis on la rapporte à $A$ tout entier.",
      "Cette part est $P(A \\cap B)$, et l'univers de référence est $P(A)$.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ — on divise par la CONDITION."
    ),
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_def_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi la définition de $P_A(B)$ exige-t-elle $P(A) \\neq 0$ ?",
    format: "qcm",
    choices: [
      "parce qu'on divise par $P(A)$",
      "parce que $B$ doit être possible",
      "parce que $A$ et $B$ doivent être incompatibles",
      "parce que la somme doit valoir $1$",
    ],
    expected: ["parce qu'on divise par $P(A)$"],
    comparator: "mcq_exact",
    hint: "Regarde le dénominateur.",
    explanation: exp(
      "La condition $P(A) \\neq 0$ vient de l'écriture même de la formule.",
      "On examine ce qui rendrait le calcul impossible.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ : un dénominateur nul n'a pas de sens.",
      "Et c'est logique : « sachant $A$ » n'a rien à dire si $A$ ne peut pas se produire."
    ),
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_def_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une classe, $P(\\text{fille}) = 0{,}6$ et $P(\\text{fille} \\cap \\text{demi-pensionnaire}) = 0{,}3$. Quelle est la probabilité qu'un élève soit demi-pensionnaire sachant que c'est une fille ?",
    format: "short",
    expected: ["0,5", "0.5"],
    comparator: "number_equal",
    hint: "$\\dfrac{0{,}3}{0{,}6}$.",
    explanation: exp(
      "On applique la formule en prenant « fille » comme condition.",
      "On divise la probabilité de l'intersection par celle de la condition.",
      "$\\dfrac{0{,}3}{0{,}6} = 0{,}5$.",
      "Une fille sur deux est demi-pensionnaire — alors que $0{,}3$ seulement des élèves sont des filles demi-pensionnaires."
    ),
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_def_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut $P_A(B) + P_A(\\overline{B})$ ?",
    format: "qcm",
    choices: ["$1$", "$P(A)$", "$P(B)$", "$0$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Sachant $A$, ou bien $B$ arrive, ou bien il n'arrive pas.",
    explanation: exp(
      "Conditionner par $A$ donne une vraie loi de probabilité sur le monde $A$.",
      "Dans ce monde, $B$ et son contraire couvrent toutes les possibilités.",
      "Leurs probabilités s'additionnent donc pour donner la totalité.",
      "$P_A(B) + P_A(\\overline{B}) = 1$ — c'est ce que traduisent les branches d'un même nœud d'arbre."
    ),
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_arbre_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_pondere",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un arbre pondéré, que porte une branche du DEUXIÈME niveau ?",
    format: "qcm",
    choices: [
      "une probabilité conditionnelle",
      "une probabilité d'intersection",
      "la somme des branches précédentes",
      "toujours $0{,}5$",
    ],
    expected: ["une probabilité conditionnelle"],
    comparator: "mcq_exact",
    hint: "Pour arriver sur cette branche, il a fallu passer par la première.",
    explanation: exp(
      "Une branche du second niveau part d'un nœud déjà atteint.",
      "On se demande ce que cette pondération suppose : le premier évènement est déjà réalisé.",
      "Elle donne donc la probabilité de la suite SACHANT ce qui précède.",
      "C'est une probabilité conditionnelle — l'intersection, elle, s'obtient en multipliant tout le chemin."
    ),
    tags: ["seconde", "maths", "probabilites", "arbre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_arbre_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_pondere",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut la somme des probabilités portées par les branches issues d'un MÊME nœud ?",
    format: "qcm",
    choices: ["$1$", "$0{,}5$", "cela dépend du nœud", "$0$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Depuis ce nœud, il faut bien partir quelque part.",
    explanation: exp(
      "Les branches issues d'un nœud décrivent toutes les suites possibles à partir de lui.",
      "On additionne les probabilités de ces suites, qui s'excluent deux à deux.",
      "Elles couvrent la totalité des cas : leur somme fait le tout.",
      "La somme vaut toujours $1$ — un contrôle immédiat quand on complète un arbre."
    ),
    tags: ["seconde", "maths", "probabilites", "arbre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_arbre_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_pondere",
    difficulty: 3,
    theme: "neutral",
    text: "Comment calcule-t-on la probabilité d'un CHEMIN complet d'un arbre pondéré ?",
    format: "qcm",
    choices: [
      "en multipliant les probabilités des branches du chemin",
      "en additionnant les probabilités des branches du chemin",
      "en prenant la plus petite des deux",
      "en prenant la dernière branche",
    ],
    expected: ["en multipliant les probabilités des branches du chemin"],
    comparator: "mcq_exact",
    hint: "$P(A \\cap B) = P(A) \\times P_A(B)$.",
    explanation: exp(
      "Un chemin décrit une intersection : le premier évènement ET le second.",
      "On repart de la formule conditionnelle retournée en produit.",
      "$P(A \\cap B) = P(A) \\times P_A(B)$ : la première branche fois la seconde.",
      "On MULTIPLIE le long d'un chemin — et l'on additionne seulement entre chemins différents."
    ),
    tags: ["seconde", "maths", "probabilites", "arbre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_chemins_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_chemins",
    difficulty: 3,
    theme: "neutral",
    text: "Un évènement est atteint par PLUSIEURS chemins d'un arbre. Comment obtient-on sa probabilité ?",
    format: "qcm",
    choices: [
      "en additionnant les probabilités de ces chemins",
      "en multipliant les probabilités de ces chemins",
      "en prenant le chemin le plus probable",
      "en prenant la moyenne des chemins",
    ],
    expected: ["en additionnant les probabilités de ces chemins"],
    comparator: "mcq_exact",
    hint: "On multiplie LE LONG d'un chemin, on additionne ENTRE les chemins.",
    explanation: exp(
      "Deux chemins distincts d'un arbre décrivent des situations qui s'excluent.",
      "On calcule d'abord chaque chemin par un produit, puis on les rassemble.",
      "Des cas incompatibles voient leurs probabilités s'additionner.",
      "On multiplie le long d'un chemin, on additionne entre les chemins — deux gestes à ne pas intervertir."
    ),
    tags: ["seconde", "maths", "probabilites", "arbre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_tab_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_tableau_croise",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un tableau croisé d'effectifs, que prend-on comme DÉNOMINATEUR pour calculer une probabilité conditionnelle ?",
    format: "qcm",
    choices: [
      "le total de la ligne ou de la colonne donnée par la condition",
      "toujours l'effectif total",
      "l'effectif de la case cherchée",
      "la somme des deux totaux",
    ],
    expected: ["le total de la ligne ou de la colonne donnée par la condition"],
    comparator: "mcq_exact",
    hint: "« Sachant que… » désigne une ligne ou une colonne du tableau.",
    explanation: exp(
      "Conditionner revient à ne plus regarder que la ligne, ou la colonne, imposée par la condition.",
      "On repère cette ligne ou cette colonne, puis on y prend la case cherchée.",
      "Le dénominateur est le total de cette ligne ou de cette colonne, pas l'effectif général.",
      "C'est là toute la différence avec une probabilité ordinaire, qui divise par le total du tableau."
    ),
    tags: ["seconde", "maths", "probabilites", "tableau", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_faux_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_faux_positifs",
    difficulty: 3,
    theme: "neutral",
    text: "« $90$ % des malades ont un test positif » et « $90$ % des personnes positives sont malades » : ces deux phrases disent-elles la même chose ?",
    format: "qcm",
    choices: [
      "non, ce sont $P_{\\text{Malade}}(\\text{T+})$ et $P_{\\text{T+}}(\\text{Malade})$",
      "oui, ce sont deux façons de dire $0{,}9$",
      "oui, car l'intersection est la même",
      "non, mais elles sont toujours proches",
    ],
    expected: ["non, ce sont $P_{\\text{Malade}}(\\text{T+})$ et $P_{\\text{T+}}(\\text{Malade})$"],
    comparator: "mcq_exact",
    hint: "Dans chaque phrase, demande-toi de quel groupe on parle.",
    explanation: exp(
      "Deux conditionnelles inversées portent sur des populations différentes.",
      "On repère le groupe désigné après « des » : les malades, puis les positifs.",
      "La première divise par le nombre de malades, la seconde par le nombre de positifs.",
      "$P_{\\text{Malade}}(\\text{T+}) \\neq P_{\\text{T+}}(\\text{Malade})$ — les confondre est l'erreur classique des faux positifs."
    ),
    tags: ["seconde", "maths", "probabilites", "faux-positifs", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_faux_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_faux_positifs",
    difficulty: 4,
    theme: "neutral",
    text: "Une maladie touche $1$ personne sur $1000$ et le test se trompe rarement. Pourtant, parmi les personnes positives, beaucoup sont saines. Pourquoi ?",
    format: "qcm",
    choices: [
      "parce que les personnes saines sont bien plus nombreuses",
      "parce que le test est mal conçu",
      "parce que la maladie est contagieuse",
      "parce que la probabilité dépasse $1$",
    ],
    expected: ["parce que les personnes saines sont bien plus nombreuses"],
    comparator: "mcq_exact",
    hint: "Un petit pourcentage d'un très grand groupe peut dépasser un grand pourcentage d'un tout petit groupe.",
    explanation: exp(
      "La probabilité d'un chemin dépend autant de la branche que de la taille du groupe de départ.",
      "On compare les deux chemins qui mènent à « T+ ».",
      "Un faible taux d'erreur appliqué à $999$ personnes saines produit plus de positifs qu'un excellent taux appliqué à $1$ malade.",
      "C'est le paradoxe des faux positifs : la rareté de la maladie compte autant que la qualité du test."
    ),
    tags: ["seconde", "maths", "probabilites", "faux-positifs", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_chemins_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_chemins",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi ne peut-on PAS obtenir $P(\\text{T+})$ en additionnant directement les deux pondérations des branches « T+ » ?",
    format: "qcm",
    choices: [
      "parce qu'elles portent sur deux populations de tailles différentes",
      "parce qu'une probabilité ne s'additionne jamais",
      "parce qu'il faudrait les multiplier entre elles",
      "parce que leur somme dépasserait toujours $1$",
    ],
    expected: ["parce qu'elles portent sur deux populations de tailles différentes"],
    comparator: "mcq_exact",
    hint: "L'une parle des malades, l'autre des sains — et ils ne sont pas aussi nombreux.",
    explanation: exp(
      "Une pondération de second niveau est une proportion À L'INTÉRIEUR de son groupe de départ.",
      "On regarde à quoi chaque nombre se rapporte avant d'oser une addition.",
      "L'une est une part des malades, l'autre une part des sains : additionner reviendrait à mélanger deux échelles.",
      "Il faut d'abord ramener chacune à la population entière en multipliant par la première branche — puis seulement additionner."
    ),
    tags: ["seconde", "maths", "probabilites", "arbre", "piege", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_tab_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_tableau_croise",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un tableau croisé, $P(A \\cap B)$ et $P_A(B)$ utilisent-elles la même case ?",
    format: "qcm",
    choices: [
      "oui, la même case, mais pas le même dénominateur",
      "non, deux cases différentes",
      "oui, et le même dénominateur",
      "non, $P_A(B)$ n'utilise aucune case",
    ],
    expected: ["oui, la même case, mais pas le même dénominateur"],
    comparator: "mcq_exact",
    hint: "Le numérateur ne change pas ; regarde par quoi on divise.",
    explanation: exp(
      "Les deux probabilités partent du même croisement d'effectifs.",
      "On compare ce qui sert de référence dans chaque cas.",
      "$P(A \\cap B)$ divise par l'effectif TOTAL, $P_A(B)$ par le total de la ligne $A$.",
      "Même numérateur, dénominateur différent — et donc deux nombres différents."
    ),
    tags: ["seconde", "maths", "probabilites", "tableau", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_faux_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_faux_positifs",
    difficulty: 5,
    theme: "neutral",
    text: "Pour décider si un dépistage de masse est utile, quel nombre faut-il regarder ?",
    format: "qcm",
    choices: [
      "$P_{\\text{T+}}(\\text{Malade})$, la part de vrais malades parmi les positifs",
      "$P_{\\text{Malade}}(\\text{T+})$, la fiabilité annoncée du test",
      "$P(\\text{Malade})$, la rareté de la maladie seule",
      "le nombre de personnes dépistées",
    ],
    expected: ["$P_{\\text{T+}}(\\text{Malade})$, la part de vrais malades parmi les positifs"],
    comparator: "mcq_exact",
    hint: "Place-toi du côté de la personne qui reçoit un résultat positif.",
    explanation: exp(
      "La question utile est celle que se pose la personne testée, pas celle du fabricant du test.",
      "On identifie la condition réellement connue : le résultat du test, et non l'état de santé.",
      "Ce qui compte est donc la proportion de malades PARMI les positifs.",
      "$P_{\\text{T+}}(\\text{Malade})$ est le bon indicateur — et il chute quand la maladie est rare, même avec un excellent test."
    ),
    tags: ["seconde", "maths", "probabilites", "faux-positifs", "raisonnement", "qcm"],
  },

];

/* =========================================================================
   LES GABARITS
========================================================================= */

const GABARITS: TutorBankItemV4[] = [
  // ============================================================
  // proba_conditionnelle — la notation PA(B) et son calcul
  // ============================================================

  /* ★1 — lire la notation, dans une situation. */
  gab("seconde_pcond_def_tpl_6", "proba_conditionnelle", 1,
    "L'événement écrit EN BAS, en indice, est celui que l'on sait déjà réalisé.",
    ["conditionnelle", "notation", "qcm"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const [X, Y] = choisir([[a, b], [b, a], [na, b], [a, nb], [nb, a], [b, na]] as [E, E][]);
      const lire = (x: E, y: E) => `la probabilité de l'événement « ${c.le} ${y.s} » sachant que ${c.le} ${x.s}`;
      const bon = lire(X, Y);
      const q = choisir([
        `Que signifie $${PS(X, Y)}$ ?`,
        `Comment se lit $${PS(X, Y)}$ dans cette situation ?`,
        `Quelle phrase traduit $${PS(X, Y)}$ ?`,
      ]);
      return {
        text: `${cadre(c)} ${nomme(c)} ${q}`,
        format: "qcm",
        choices: choixDistincts(bon, [
          lire(Y, X),
          `la probabilité de l'événement « ${c.le} ${X.s} et ${Y.s} »`,
          `la probabilité de l'événement « ${c.le} ${Y.s} », sans rien savoir d'autre`,
        ], [`la probabilité de l'événement « ${c.le} ${X.s} »`]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans $P_X(Y)$, l'événement placé en indice est la CONDITION : on le sait déjà réalisé.",
          `Ici l'indice est $${X.tex}$ : on sait que ${c.le} ${X.s}.`,
          `On s'interroge alors sur $${Y.tex}$ : « ${c.le} ${Y.s} ».`,
          `$${PS(X, Y)}$ est ${bon} — échanger les deux lettres change la question.`
        ),
      };
    }),

  /* ★2 — passer de la phrase à la notation. */
  gab("seconde_pcond_def_tpl_7", "proba_conditionnelle", 2,
    "Le groupe dans lequel on se place (« parmi… ») est la condition : il va en indice.",
    ["conditionnelle", "notation", "langue", "qcm"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const [X, Y] = choisir([[a, b], [b, a], [na, b], [a, nb], [na, nb], [b, na]] as [E, E][]);
      const k = choisir([5, 10, 15, 20, 25, 30, 35, 40, 45, 55, 60, 65, 70, 75, 80, 85, 90, 95]);
      const v = k / 100;
      const phrase = choisir([
        `« Parmi les ${c.court} qui ${X.p}, ${k} % ${Y.p}. »`,
        `« ${k} % des ${c.court} qui ${X.p} ${Y.p}. »`,
        `« Dans le groupe des ${c.court} qui ${X.p}, ${k} % ${Y.p}. »`,
      ]);
      const q = choisir([
        "Quelle égalité traduit cette information ?",
        "Comment s'écrit-elle avec les notations ?",
        "Quelle écriture correspond à cette phrase ?",
      ]);
      const bon = `$${PS(X, Y)} = ${m(v)}$`;
      return {
        text: `${cadre(c)} ${nomme(c)} ${phrase} ${q}`,
        format: "qcm",
        choices: choixDistincts(bon, [`$${PS(Y, X)} = ${m(v)}$`, `$${PI(X, Y)} = ${m(v)}$`, `$${P(Y)} = ${m(v)}$`], [`$${P(X)} = ${m(v)}$`]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Passer de la phrase à la notation, c'est repérer le groupe dans lequel on se place.",
          `« les ${c.court} qui ${X.p} » est ce groupe : c'est la condition, en indice.`,
          `On y cherche la part de ${c.ceux} qui ${Y.p}, soit ${k} % $= ${m(v)}$.`,
          `La phrase s'écrit ${bon} — et non $${PS(Y, X)}$, qui se placerait parmi les ${c.court} qui ${Y.p}.`
        ),
      };
    }),

  /* ★3 — P_A(B) = P(A ∩ B) / P(A). */
  gab("seconde_pcond_def_tpl_1", "proba_conditionnelle", 3,
    "On divise l'intersection par la condition.",
    ["conditionnelle", "short"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const X = choisir([a, na]);
      const Y = choisir([b, nb]);
      const pX = choisir([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8]);
      const q = choisir([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9]);
      const inter = r4(pX * q);
      let text: string;
      if (randomInt(0, 1) === 0) {
        const donnees = `${cadre(c)} ${nomme(c)} On sait que $${P(X)} = ${m(pX)}$ et $${PI(X, Y)} = ${m(inter)}$.`;
        text = `${donnees} ${choisir([
          `Calcule $${PS(X, Y)}$.`,
          `Sachant que ${c.le} ${X.s}, quelle est la probabilité de l'événement « ${c.il} ${Y.s} » ?`,
        ])}`;
      } else {
        const donnees = `${c.lieu}, ${pc(pX)} des ${c.court} ${X.p}, et ${pc(inter)} des ${c.court} ${X.p} et ${Y.p} à la fois.`;
        text = `${donnees} ${choisir([
          `On choisit ${c.un} au hasard. Sachant ${que(c)} ${X.s}, quelle est la probabilité de l'événement « ${c.il} ${Y.s} » ?`,
          `Parmi les ${c.court} qui ${X.p}, quelle est la proportion de ${c.ceux} qui ${Y.p} ? Donne-la en écriture décimale.`,
          `On choisit ${c.un} au hasard. ${nomme(c)} Calcule $${PS(X, Y)}$.`,
        ])}`;
      }
      return {
        text,
        format: "short",
        expected: rep(q),
        comparator: "number_equal",
        explanation: exp(
          `$${PS(X, Y)}$ rapporte l'intersection à la condition $${X.tex}$.`,
          `On divise $${PI(X, Y)}$ par $${P(X)}$ : on se restreint aux ${c.court} qui ${X.p}.`,
          `$${PS(X, Y)} = \\dfrac{${m(inter)}}{${m(pX)}} = ${m(q)}$.`,
          `La probabilité vaut $${m(q)}$ — diviser par $1$ (tout le monde) aurait donné $${m(inter)}$, l'intersection.`
        ),
      };
    }),

  /* ★3 — P_A(non B) = 1 − P_A(B). */
  gab("seconde_pcond_def_tpl_3", "proba_conditionnelle", 3,
    "Sachant la condition, l'événement et son contraire se partagent la totalité.",
    ["conditionnelle", "contraire", "short"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const X = choisir([a, na, b]);
      const Y = X.k === "B" ? choisir([a, na]) : choisir([b, nb]);
      const Yc = contraire(c, Y);
      const q = choisir(pas5(0.05, 0.95));
      const rest = r4(1 - q);
      const donnees = choisir([
        `${c.lieu}, parmi les ${c.court} qui ${X.p}, ${pc(q)} ${Y.p}.`,
        `${c.lieu}, ${pc(q)} des ${c.court} qui ${X.p} ${Y.p}.`,
      ]);
      const question = choisir([
        `On choisit ${c.un} au hasard. Sachant ${que(c)} ${X.s}, quelle est la probabilité de l'événement « ${c.il} ${Yc.s} » ?`,
        `On choisit ${c.un} au hasard. ${nomme(c)} Calcule $${PS(X, Yc)}$.`,
        `Parmi les ${c.court} qui ${X.p}, quelle proportion ${Yc.p} ? Donne-la en écriture décimale.`,
      ]);
      return {
        text: `${donnees} ${question}`,
        format: "short",
        expected: rep(rest),
        comparator: "number_equal",
        explanation: exp(
          `Parmi les ${c.court} qui ${X.p}, ou bien ${c.il} ${Y.s}, ou bien ${c.il} ${Yc.s} : il n'y a pas d'autre cas.`,
          "On retranche donc la proportion donnée à $1$.",
          `$${PS(X, Yc)} = 1 - ${m(q)} = ${m(rest)}$.`,
          `La probabilité vaut $${m(rest)}$ — comme les deux branches issues d'un même nœud d'arbre.`
        ),
      };
    }),

  /* ★4 — P(A ∩ B) = P(A) × P_A(B). */
  gab("seconde_pcond_def_tpl_2", "proba_conditionnelle", 4,
    "La formule se retourne : l'intersection est un PRODUIT.",
    ["conditionnelle", "produit", "short"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const X = choisir([a, na]);
      const Y = choisir([b, nb]);
      const pX = choisir(pas5(0.1, 0.9));
      const q = choisir(pas5(0.05, 0.95));
      const inter = r4(pX * q);
      let text: string;
      const t = randomInt(0, 2);
      if (t === 0) {
        text = `${cadre(c)} ${nomme(c)} On sait que $${P(X)} = ${m(pX)}$ et $${PS(X, Y)} = ${m(q)}$. ${choisir([
          `Calcule $${PI(X, Y)}$.`,
          `Quelle est la probabilité de l'événement « ${c.le} ${X.s} et ${Y.s} » ?`,
        ])}`;
      } else {
        const donnees =
          t === 1
            ? `${c.lieu}, ${pc(pX)} des ${c.court} ${X.p}. Parmi ${c.eux}, ${pc(q)} ${Y.p}.`
            : `${c.lieu}, ${pc(pX)} des ${c.court} ${X.p}, et ${pc(q)} de ${c.ceux}-ci ${Y.p}.`;
        text = `${donnees} ${choisir([
          `On choisit ${c.un} au hasard. Quelle est la probabilité de l'événement « ${c.il} ${X.s} et ${Y.s} » ?`,
          `Quelle proportion de l'ensemble des ${c.court} ${X.p} et ${Y.p} à la fois ? Donne-la en écriture décimale.`,
        ])}`;
      }
      return {
        text,
        format: "short",
        expected: rep(inter),
        comparator: "number_equal",
        explanation: exp(
          "La formule de la probabilité conditionnelle se retourne en produit.",
          `De $${PS(X, Y)} = \\dfrac{${PI(X, Y)}}{${P(X)}}$ on tire $${PI(X, Y)} = ${P(X)} \\times ${PS(X, Y)}$.`,
          `$${m(pX)} \\times ${m(q)} = ${m(inter)}$.`,
          `La probabilité vaut $${m(inter)}$ : une part (${pc(q)}) d'une part (${pc(pX)}) — c'est ce que l'on fait en multipliant le long d'un chemin d'arbre.`
        ),
      };
    }),

  /* ★4 — avec des effectifs : le dénominateur est l'effectif de la condition. */
  gab("seconde_pcond_def_tpl_4", "proba_conditionnelle", 4,
    "Combien d'individus forment le groupe « sachant… » ? C'est le dénominateur.",
    ["conditionnelle", "effectifs", "short"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const X = choisir([a, na]);
      const Y = choisir([b, nb]);
      const nX = choisir([20, 25, 40, 50, 80, 100, 125, 200, 250]);
      let nXY = randomInt(1, nX - 1);
      for (let k = 0; k < 50 && !juste(nXY, nX, 4); k++) nXY = randomInt(1, nX - 1);
      const N = nX + randomInt(Math.ceil(nX / 2), 3 * nX);
      const donnees = choisir([
        `${c.verbe} $${N}$ ${c.pop}. $${nX}$ d'entre ${c.eux} ${X.p} et, parmi ces $${nX}$, $${nXY}$ ${Y.p}.`,
        `${c.verbe} $${N}$ ${c.pop} : $${nX}$ ${X.p}, dont $${nXY}$ qui ${Y.p}.`,
        `${c.verbe} $${N}$ ${c.pop}. Parmi ${c.ceux} qui ${X.p} (on en compte $${nX}$), $${nXY}$ ${Y.p}.`,
      ]);
      const question = choisir([
        `On choisit au hasard ${c.un} parmi ${c.ceux} qui ${X.p}. Quelle est la probabilité de l'événement « ${c.il} ${Y.s} » ?`,
        `On choisit ${c.un} au hasard. ${nomme(c)} Calcule $${PS(X, Y)}$.`,
        `Parmi les ${c.court} qui ${X.p}, quelle est la proportion de ${c.ceux} qui ${Y.p} ? Donne-la en écriture décimale.`,
      ]);
      const q = nXY / nX;
      return {
        text: `${donnees} ${question}`,
        format: "short",
        expected: rep(q),
        comparator: "number_equal",
        explanation: exp(
          "Conditionner, c'est changer de population de référence.",
          `La référence n'est plus les $${N}$ ${c.court}, mais les $${nX}$ qui ${X.p}.`,
          `$\\dfrac{${nXY}}{${nX}} = ${m(q)}$.`,
          `La probabilité vaut $${m(q)}$ — diviser par $${N}$ serait l'erreur classique : le dénominateur est l'effectif de la CONDITION.`
        ),
      };
    }),

  /* ★5 — P_A(B) et P_B(A) : même numérateur, dénominateurs différents. */
  gab("seconde_pcond_def_tpl_5", "proba_conditionnelle", 5,
    "Compare ce que l'on divise, et par quoi.",
    ["conditionnelle", "piege", "qcm"], () => {
      const c = choisir(TOUTES);
      const { a, b } = evs(c);
      const [X, Y] = choisir([[a, b], [b, a]] as [E, E][]);
      let pX = 0.2;
      let pY = 0.2;
      while (pX === pY) {
        pX = choisir([0.2, 0.25, 0.4, 0.5, 0.8]);
        pY = choisir([0.2, 0.25, 0.4, 0.5, 0.8]);
      }
      const inter = choisir(pas5(Math.max(0.05, pX + pY - 1 + 0.05), Math.min(pX, pY) - 0.05).filter((x) => x > 0));
      const pYX = r4(inter / pX);
      const pXY = r4(inter / pY);
      const donnees =
        randomInt(0, 1) === 0
          ? `${cadre(c)} ${nomme(c)} On sait que $${P(X)} = ${m(pX)}$, $${P(Y)} = ${m(pY)}$ et $${PI(X, Y)} = ${m(inter)}$.`
          : `${c.lieu}, ${pc(pX)} des ${c.court} ${X.p}, ${pc(pY)} ${Y.p}, et ${pc(inter)} ${X.p} et ${Y.p} à la fois. On choisit ${c.un} au hasard. ${nomme(c)}`;
      const q = choisir(["Laquelle de ces affirmations est exacte ?", `Que valent $${PS(X, Y)}$ et $${PS(Y, X)}$ ?`]);
      const bon = `$${PS(X, Y)} = ${m(pYX)}$ et $${PS(Y, X)} = ${m(pXY)}$`;
      return {
        text: `${donnees} ${q}`,
        format: "qcm",
        choices: choixDistincts(bon, [
          `$${PS(X, Y)} = ${m(pXY)}$ et $${PS(Y, X)} = ${m(pYX)}$`,
          `$${PS(X, Y)} = ${PS(Y, X)} = ${m(inter)}$`,
          `$${PS(X, Y)} = ${PS(Y, X)} = ${m(pYX)}$`,
        ], [`$${PS(X, Y)} = ${m(pYX)}$ et $${PS(Y, X)} = ${m(inter)}$`]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Les deux probabilités conditionnelles ont le même numérateur, $" + PI(X, Y) + "$, mais pas le même dénominateur.",
          `On divise l'intersection tantôt par $${P(X)}$, tantôt par $${P(Y)}$.`,
          `$${PS(X, Y)} = \\dfrac{${m(inter)}}{${m(pX)}} = ${m(pYX)}$ et $${PS(Y, X)} = \\dfrac{${m(inter)}}{${m(pY)}} = ${m(pXY)}$.`,
          "Elles diffèrent dès que les deux conditions n'ont pas la même probabilité : c'est la confusion la plus coûteuse du chapitre."
        ),
      };
    }),

  /* ★5 — retrouver P(A) à partir de P(A ∩ B) et de P_A(B). */
  gab("seconde_pcond_def_tpl_8", "proba_conditionnelle", 5,
    "Le produit $P(A) \\times P_A(B)$ donne l'intersection : il manque un facteur.",
    ["conditionnelle", "produit", "short"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const X = choisir([a, na]);
      const Y = choisir([b, nb]);
      const pX = choisir([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8]);
      const q = choisir([0.2, 0.25, 0.4, 0.5, 0.75, 0.8]);
      const inter = r4(pX * q);
      const donnees =
        randomInt(0, 1) === 0
          ? `${c.lieu}, parmi les ${c.court} qui ${X.p}, ${pc(q)} ${Y.p}. Au total, ${pc(inter)} des ${c.court} ${X.p} et ${Y.p} à la fois.`
          : `${cadre(c)} ${nomme(c)} On sait que $${PS(X, Y)} = ${m(q)}$ et $${PI(X, Y)} = ${m(inter)}$.`;
      const question = choisir([
        `Quelle proportion des ${c.court} ${X.p} ? Donne-la en écriture décimale.`,
        `${nomme(c)} Calcule $${P(X)}$.`,
        `Quelle est la probabilité de l'événement « ${c.le} ${X.s} » ?`,
      ]);
      return {
        text: `${donnees} ${question}`,
        format: "short",
        expected: rep(pX),
        comparator: "number_equal",
        explanation: exp(
          `On sait que $${PI(X, Y)} = ${P(X)} \\times ${PS(X, Y)}$.`,
          `Le facteur inconnu est $${P(X)}$ : on divise l'intersection par la probabilité conditionnelle.`,
          `$${P(X)} = \\dfrac{${m(inter)}}{${m(q)}} = ${m(pX)}$.`,
          `$${P(X)} = ${m(pX)}$ — on vérifie : $${m(pX)} \\times ${m(q)} = ${m(inter)}$.`
        ),
      };
    }),

  // ============================================================
  // proba_arbre_pondere — lire un arbre, multiplier le long d'un chemin
  // ============================================================

  /* ★2 — lire une branche du premier niveau. */
  gab("seconde_pcond_arbre_tpl_1", "proba_arbre_pondere", 2,
    "Lis la branche qui part du point de départ.",
    ["arbre", "canvas", "short"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { a, na } = evs(c);
      const X = choisir([a, na]);
      const pX = v.mg[X.k];
      const q = choisir([
        `Quelle est la probabilité de l'événement « ${c.le} ${X.s} » ?`,
        `Lis sur l'arbre $${P(X)}$.`,
        `Quelle proportion des ${c.court} ${X.p} ? Donne-la en écriture décimale.`,
      ]);
      return {
        text: `${introArbre(c)} ${q}`,
        format: "short",
        expected: rep(pX),
        comparator: "number_equal",
        canvas: arbre(c, v),
        explanation: exp(
          "Les branches du premier niveau portent les probabilités « simples », sans condition.",
          `On lit la branche qui va du départ à $${X.tex}$.`,
          `Elle porte $${m(pX)}$.`,
          `$${P(X)} = ${m(pX)}$, soit ${pc(pX)} des ${c.court}.`
        ),
      };
    }),

  /* ★3 — ce que porte une branche du second niveau. */
  gab("seconde_pcond_arbre_tpl_2", "proba_arbre_pondere", 3,
    "Pour arriver sur cette branche, il a fallu passer par la première : c'est une condition.",
    ["arbre", "canvas", "qcm"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const ch = choisir(chemins(c, v));
      const { X, Y, p2 } = ch;
      const q = choisir([
        `Que représente la probabilité $${m(p2)}$ portée par la branche qui va de $${X.tex}$ à $${Y.tex}$ ?`,
        `Sur cet arbre, la branche de $${X.tex}$ vers $${Y.tex}$ porte $${m(p2)}$. Que représente ce nombre ?`,
        `Quelle notation correspond au nombre $${m(p2)}$ écrit sur la branche qui mène de $${X.tex}$ à $${Y.tex}$ ?`,
      ]);
      const bon = `$${PS(X, Y)}$`;
      return {
        text: `${introArbre(c)} ${q}`,
        format: "qcm",
        choices: choixDistincts(bon, [`$${PI(X, Y)}$`, `$${PS(Y, X)}$`, `$${P(Y)}$`], [`$${P(X)}$`]),
        expected: [bon],
        comparator: "mcq_exact",
        canvas: arbre(c, v),
        explanation: exp(
          "Une branche du second niveau part d'un nœud déjà atteint : elle porte une probabilité conditionnelle.",
          `Elle part du nœud $${X.tex}$ : on suppose donc que ${c.le} ${X.s}.`,
          `Elle donne la probabilité de l'événement « ${c.le} ${Y.s} » SACHANT cela.`,
          `C'est $${PS(X, Y)} = ${m(p2)}$ — et non $${PI(X, Y)}$, qui demande de multiplier tout le chemin.`
        ),
      };
    }),

  /* ★3 — compléter une branche effacée. */
  gab("seconde_pcond_arbre_tpl_3", "proba_arbre_pondere", 3,
    "Les branches issues d'un même nœud ont pour somme $1$.",
    ["arbre", "canvas", "short"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { a, na, b, nb } = evs(c);
      const branches = [
        { k: "A", de: null as E | null, vers: a, val: v.mg.A, frere: na, vf: v.mg.nA },
        { k: "nA", de: null as E | null, vers: na, val: v.mg.nA, frere: a, vf: v.mg.A },
        { k: "A|B", de: a, vers: b, val: v.br["A|B"], frere: nb, vf: v.br["A|nB"] },
        { k: "A|nB", de: a, vers: nb, val: v.br["A|nB"], frere: b, vf: v.br["A|B"] },
        { k: "nA|B", de: na, vers: b, val: v.br["nA|B"], frere: nb, vf: v.br["nA|nB"] },
        { k: "nA|nB", de: na, vers: nb, val: v.br["nA|nB"], frere: b, vf: v.br["nA|B"] },
      ];
      const br = choisir(branches);
      const depuis = br.de ? `de $${br.de.tex}$` : "du départ";
      const q = choisir([
        `Une probabilité a été effacée et remplacée par « ? ». Quelle valeur faut-il écrire ?`,
        `Complète l'arbre : quelle probabilité porte la branche marquée « ? » ?`,
        `La branche qui va ${depuis} à $${br.vers.tex}$ a perdu sa probabilité. Que vaut-elle ?`,
      ]);
      const nom = br.de ? PS(br.de, br.vers) : P(br.vers);
      const nomF = br.de ? PS(br.de, br.frere) : P(br.frere);
      return {
        text: `${introArbre(c)} ${q}`,
        format: "short",
        expected: rep(br.val),
        comparator: "number_equal",
        canvas: arbre(c, v, [br.k]),
        explanation: exp(
          "Les branches issues d'un même nœud ont pour somme $1$ : à partir de ce nœud, il faut bien aller quelque part.",
          `La branche « ? » part ${br.de ? `du nœud $${br.de.tex}$` : "du départ"}, comme celle qui mène à $${br.frere.tex}$.`,
          `$${nom} = 1 - ${nomF} = 1 - ${m(br.vf)} = ${m(br.val)}$.`,
          `On écrit $${m(br.val)}$ sur la branche — c'est le premier contrôle de tout arbre.`
        ),
      };
    }),

  /* ★3 — une phrase « parmi… » se lit sur une branche du second niveau. */
  gab("seconde_pcond_arbre_tpl_7", "proba_arbre_pondere", 3,
    "Traduis la phrase en notation, puis repère où elle se lit sur l'arbre.",
    ["arbre", "langue", "canvas", "qcm"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { X, Y, p2 } = choisir(chemins(c, v));
      const Xc = contraire(c, X);
      const phrase = choisir([
        `« Parmi les ${c.court} qui ${X.p}, ${pc(p2)} ${Y.p}. »`,
        `« ${pc(p2)} des ${c.court} qui ${X.p} ${Y.p}. »`,
      ]);
      const q = choisir(["Sur l'arbre, où lit-on ce nombre ?", "Quel endroit de l'arbre traduit cette phrase ?"]);
      const bon = `sur la branche qui va de $${X.tex}$ à $${Y.tex}$`;
      return {
        text: `${introArbre(c)} ${phrase} ${q}`,
        format: "qcm",
        choices: choixDistincts(bon, [
          `sur la branche qui va du départ à $${X.tex}$`,
          `sur la branche qui va de $${Xc.tex}$ à $${Y.tex}$`,
          `c'est le produit des deux branches du chemin $${X.tex}$ puis $${Y.tex}$`,
        ], [`sur la branche qui va du départ à $${Y.tex}$`]),
        expected: [bon],
        comparator: "mcq_exact",
        canvas: arbre(c, v),
        explanation: exp(
          "Une phrase « parmi les… » décrit une probabilité conditionnelle.",
          `Le groupe « les ${c.court} qui ${X.p} » est la condition : on part du nœud $${X.tex}$.`,
          `On y cherche la part de ${c.ceux} qui ${Y.p} : la branche qui mène à $${Y.tex}$, qui porte bien $${m(p2)}$.`,
          `La phrase dit $${PS(X, Y)} = ${m(p2)}$ : elle se lit ${bon}.`
        ),
      };
    }),

  /* ★4 — la probabilité d'un chemin : on multiplie. */
  gab("seconde_pcond_arbre_tpl_4", "proba_arbre_pondere", 4,
    "On multiplie les deux branches du chemin.",
    ["arbre", "canvas", "short"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { X, Y, p1, p2, p } = choisir(chemins(c, v));
      const q = choisir([
        `Calcule $${PI(X, Y)}$.`,
        `Quelle est la probabilité de l'événement « ${c.le} ${X.s} et ${Y.s} » ?`,
        `Quelle proportion des ${c.court} ${X.p} et ${Y.p} à la fois ? Donne-la en écriture décimale.`,
      ]);
      return {
        text: `${introArbre(c)} ${q}`,
        format: "short",
        expected: rep(p),
        comparator: "number_equal",
        canvas: arbre(c, v),
        explanation: exp(
          "La probabilité d'un chemin complet est le produit des probabilités de ses branches.",
          `On suit le chemin $${X.tex}$ puis $${Y.tex}$ et l'on multiplie.`,
          `$${PI(X, Y)} = ${P(X)} \\times ${PS(X, Y)} = ${m(p1)} \\times ${m(p2)} = ${m(p)}$.`,
          `$${PI(X, Y)} = ${m(p)}$ — plus petit que $${m(p2)}$ : une part d'une part.`
        ),
      };
    }),

  /* ★4 — construire l'arbre depuis l'énoncé, puis calculer un chemin. */
  gab("seconde_pcond_arbre_tpl_5", "proba_arbre_pondere", 4,
    "Dessine l'arbre : les « parmi… » vont sur les branches du second niveau, et chaque nœud se complète à $1$.",
    ["arbre", "construire", "short"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { X, Y, p1, p2, p } = choisir(chemins(c, v));
      const q = choisir([
        `On choisit ${c.un} au hasard. Quelle est la probabilité de l'événement « ${c.il} ${X.s} et ${Y.s} » ?`,
        `On choisit ${c.un} au hasard. ${nomme(c)} Construis l'arbre pondéré, puis calcule $${PI(X, Y)}$.`,
        `Quelle proportion de l'ensemble des ${c.court} ${X.p} et ${Y.p} ? Donne-la en écriture décimale.`,
      ]);
      const compl1 = X.k === "nA" ? ` ($1 - ${m(v.mg.A)}$)` : "";
      const compl2 = Y.k === "nB" ? ` ($1 - ${m(r4(1 - p2))}$)` : "";
      return {
        text: `${donneesTexte(c, v)} ${q}`,
        format: "short",
        expected: rep(p),
        comparator: "number_equal",
        explanation: exp(
          "Un énoncé « parmi… » se range dans un arbre : premier niveau pour la première information, second niveau pour les « parmi ».",
          `On place $${P(X)} = ${m(p1)}$${compl1}, puis $${PS(X, Y)} = ${m(p2)}$${compl2}.`,
          `$${PI(X, Y)} = ${m(p1)} \\times ${m(p2)} = ${m(p)}$.`,
          `La probabilité vaut $${m(p)}$ — les branches manquantes se complètent toujours à $1$.`
        ),
      };
    }),

  /* ★5 — sommes de chemins : tous (= 1), ou ceux d'un même nœud (= sa branche). */
  gab("seconde_pcond_arbre_tpl_6", "proba_arbre_pondere", 5,
    "Regarde quels chemins on additionne : ils partent peut-être tous du même nœud.",
    ["arbre", "canvas", "qcm"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { a, na, b, nb } = evs(c);
      const cas = randomInt(0, 2);
      let somme: string;
      let bon: number;
      let calcul: string;
      let conclusion: string;
      if (cas === 0) {
        somme = choisir(["la somme des probabilités des QUATRE chemins complets", `$${PI(a, b)} + ${PI(a, nb)} + ${PI(na, b)} + ${PI(na, nb)}$`]);
        bon = 1;
        calcul = `$${m(v.ch.AB)} + ${m(v.ch.AnB)} + ${m(v.ch.nAB)} + ${m(v.ch.nAnB)} = 1$.`;
        conclusion = "Chaque individu suit exactement un chemin : la somme de tous les chemins vaut toujours $1$.";
      } else {
        const X = cas === 1 ? a : na;
        somme = `$${PI(X, b)} + ${PI(X, nb)}$`;
        bon = v.mg[X.k];
        calcul = `$${m(v.ch[cle(X, b)])} + ${m(v.ch[cle(X, nb)])} = ${m(bon)}$.`;
        conclusion = `Les deux chemins qui passent par $${X.tex}$ redonnent $${P(X)} = ${m(bon)}$ : ce sont tous les ${c.court} qui ${X.p}, que $${b.tex}$ soit réalisé ou non.`;
      }
      const q = choisir([`Que vaut ${somme} ?`, `Sans tout calculer, que vaut ${somme} ?`]);
      return {
        text: `${introArbre(c)} ${q}`,
        format: "qcm",
        choices: qcmNum(bon, [1, v.mg.B, v.ch.AB, r4(v.br["A|B"] + v.br["nA|B"]), v.mg.A, 0.5]),
        expected: [`$${m(bon)}$`],
        comparator: "mcq_exact",
        canvas: arbre(c, v),
        explanation: exp(
          "Des chemins distincts décrivent des cas qui s'excluent : leurs probabilités s'additionnent.",
          "On repère quels individus ces chemins décrivent, tous ensemble.",
          calcul,
          conclusion
        ),
      };
    }),

  /* ★5 — retrouver une branche à partir d'un chemin. */
  gab("seconde_pcond_arbre_tpl_8", "proba_arbre_pondere", 5,
    "Le chemin est un produit : il manque un facteur.",
    ["arbre", "canvas", "short"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { X, Y, p1, p2, p } = choisir(chemins(c, v));
      const Yc = contraire(c, Y);
      const q = choisir([
        `On sait de plus que $${PI(X, Y)} = ${m(p)}$. Quelle probabilité faut-il écrire sur la branche qui va de $${X.tex}$ à $${Y.tex}$ ?`,
        `Les deux branches issues de $${X.tex}$ ont été effacées, mais on sait que $${PI(X, Y)} = ${m(p)}$. Calcule $${PS(X, Y)}$.`,
      ]);
      return {
        text: `${introArbre(c)} ${q}`,
        format: "short",
        expected: rep(p2),
        comparator: "number_equal",
        canvas: arbre(c, v, [`${X.k}|${Y.k}`, `${X.k}|${Yc.k}`]),
        explanation: exp(
          `Le chemin $${X.tex}$ puis $${Y.tex}$ vaut le produit de ses deux branches.`,
          `On écrit $${PI(X, Y)} = ${P(X)} \\times ${PS(X, Y)}$, puis on divise par $${P(X)}$.`,
          `$${PS(X, Y)} = \\dfrac{${m(p)}}{${m(p1)}} = ${m(p2)}$.`,
          `La branche porte $${m(p2)}$, et sa voisine $${m(r4(1 - p2))}$.`
        ),
      };
    }),

  // ============================================================
  // proba_arbre_chemins — additionner les chemins qui mènent à l'évènement
  // ⛔ Sans jamais nommer ni poser la formule des probabilites totales.
  // ============================================================

  /* ★3 — compter les chemins qui mènent à un événement. */
  gab("seconde_pcond_chemins_tpl_8", "proba_arbre_chemins", 3,
    "Combien de feuilles de l'arbre portent l'étiquette cherchée ?",
    ["arbre", "canvas", "qcm"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { a, na, b, nb } = evs(c);
      const Y = choisir([b, nb]);
      const q = choisir([
        `Combien de chemins complets aboutissent à $${Y.tex}$ ?`,
        `Combien de chemins de cet arbre décrivent l'événement « ${c.le} ${Y.s} » ?`,
        `Pour calculer $${P(Y)}$, combien de chemins faut-il prendre en compte ?`,
      ]);
      return {
        text: `${introArbre(c)} ${q}`,
        format: "qcm",
        choices: ["$2$", "$1$", "$3$", "$4$"],
        expected: ["$2$"],
        comparator: "mcq_exact",
        canvas: arbre(c, v),
        explanation: exp(
          "Un chemin complet part du départ et va jusqu'à une feuille.",
          `On compte les feuilles qui portent $${Y.lab}$.`,
          `Il y en a une sous $${a.tex}$ et une sous $${na.tex}$ : on peut y arriver dans les deux cas.`,
          `Deux chemins mènent à $${Y.tex}$ : il faudra additionner deux produits, $${PI(a, Y)} + ${PI(na, Y)}$.`
        ),
      };
    }),

  /* ★3 — quelle somme donne P(B) ? (notations) */
  gab("seconde_pcond_chemins_tpl_9", "proba_arbre_chemins", 3,
    "On multiplie LE LONG d'un chemin, on additionne ENTRE les chemins.",
    ["arbre", "canvas", "notation", "qcm"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { a, na, b, nb } = evs(c);
      const Y = choisir([b, nb]);
      const Yc = contraire(c, Y);
      const q = choisir([
        `Quelle somme donne $${P(Y)}$ ?`,
        `Comment obtient-on la probabilité de l'événement « ${c.le} ${Y.s} » ?`,
        `Quelle écriture permet de calculer $${P(Y)}$ à partir de l'arbre ?`,
      ]);
      const bon = `$${PI(a, Y)} + ${PI(na, Y)}$`;
      return {
        text: `${introArbre(c)} ${q}`,
        format: "qcm",
        choices: choixDistincts(bon, [
          `$${PS(a, Y)} + ${PS(na, Y)}$`,
          `$${PI(a, Y)} \\times ${PI(na, Y)}$`,
          `$${PI(a, Y)} + ${PI(a, Yc)}$`,
        ], [`$${PS(a, Y)}$`]),
        expected: [bon],
        comparator: "mcq_exact",
        canvas: arbre(c, v),
        explanation: exp(
          `L'événement $${Y.tex}$ est atteint par deux chemins : en passant par $${a.tex}$, ou par $${na.tex}$.`,
          "On calcule chaque chemin (un produit), puis on additionne les chemins.",
          `$${P(Y)} = ${PI(a, Y)} + ${PI(na, Y)} = ${m(v.ch[cle(a, Y)])} + ${m(v.ch[cle(na, Y)])} = ${m(v.mg[Y.k])}$.`,
          `Additionner les branches $${PS(a, Y)}$ et $${PS(na, Y)}$ n'a pas de sens : elles ne portent pas sur la même population.`
        ),
      };
    }),

  /* ★4 — P(B) : la somme des deux chemins, sur l'arbre. */
  gab("seconde_pcond_chemins_tpl_1", "proba_arbre_chemins", 4,
    "Deux chemins mènent à l'événement : calcule-les, puis additionne.",
    ["arbre", "canvas", "short"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { a, na, b, nb } = evs(c);
      const Y = choisir([b, nb]);
      const q = choisir([
        `Calcule $${P(Y)}$.`,
        `Quelle est la probabilité de l'événement « ${c.le} ${Y.s} » ?`,
        `Quelle proportion des ${c.court} ${Y.p} ? Donne-la en écriture décimale.`,
      ]);
      const c1 = v.ch[cle(a, Y)];
      const c2 = v.ch[cle(na, Y)];
      return {
        text: `${introArbre(c)} ${q}`,
        format: "short",
        expected: rep(v.mg[Y.k]),
        comparator: "number_equal",
        canvas: arbre(c, v),
        explanation: exp(
          `On peut arriver à $${Y.tex}$ de deux façons : en passant par $${a.tex}$ ou par $${na.tex}$.`,
          "On calcule les deux chemins (produits), puis on les additionne.",
          `$${m(v.mg.A)} \\times ${m(v.br[`A|${Y.k}`])} + ${m(v.mg.nA)} \\times ${m(v.br[`nA|${Y.k}`])} = ${m(c1)} + ${m(c2)} = ${m(v.mg[Y.k])}$.`,
          `$${P(Y)} = ${m(v.mg[Y.k])}$ — la somme des chemins qui aboutissent à $${Y.tex}$.`
        ),
      };
    }),

  /* ★4 — P(B) depuis un énoncé : construire l'arbre, puis additionner. */
  gab("seconde_pcond_chemins_tpl_2", "proba_arbre_chemins", 4,
    "Construis l'arbre, repère les deux chemins qui mènent à l'événement, additionne.",
    ["arbre", "construire", "short"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { a, na, b, nb } = evs(c);
      const Y = choisir([b, nb]);
      const q = choisir([
        `On choisit ${c.un} au hasard. Quelle est la probabilité de l'événement « ${c.il} ${Y.s} » ?`,
        `Quelle proportion de l'ensemble des ${c.court} ${Y.p} ? Donne-la en écriture décimale.`,
        `On choisit ${c.un} au hasard. ${nomme(c)} À l'aide d'un arbre pondéré, calcule $${P(Y)}$.`,
      ]);
      const c1 = v.ch[cle(a, Y)];
      const c2 = v.ch[cle(na, Y)];
      return {
        text: `${donneesTexte(c, v)} ${q}`,
        format: "short",
        expected: rep(v.mg[Y.k]),
        comparator: "number_equal",
        explanation: exp(
          "L'énoncé se range dans un arbre : premier niveau, puis les « parmi… » au second niveau.",
          `Deux chemins mènent à « ${c.le} ${Y.s} » : par $${a.tex}$ et par $${na.tex}$. On multiplie le long de chacun, puis on additionne.`,
          `$${m(v.mg.A)} \\times ${m(v.br[`A|${Y.k}`])} + ${m(v.mg.nA)} \\times ${m(v.br[`nA|${Y.k}`])} = ${m(c1)} + ${m(c2)} = ${m(v.mg[Y.k])}$.`,
          `La probabilité vaut $${m(v.mg[Y.k])}$ — ni ${pc(v.br[`A|${Y.k}`])}, ni ${pc(v.br[`nA|${Y.k}`])} : un mélange des deux groupes, pondéré par leur taille.`
        ),
      };
    }),

  /* ★4 — quel calcul donne P(B) ? (nombres) */
  gab("seconde_pcond_chemins_tpl_5", "proba_arbre_chemins", 4,
    "Le geste dépend du nombre de chemins concernés.",
    ["arbre", "piege", "canvas", "qcm"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { b, nb } = evs(c);
      const Y = choisir([b, nb]);
      const pA = m(v.mg.A);
      const pnA = m(v.mg.nA);
      const y1 = m(v.br[`A|${Y.k}`]);
      const y2 = m(v.br[`nA|${Y.k}`]);
      const bon = `$${pA} \\times ${y1} + ${pnA} \\times ${y2}$`;
      const q = choisir([`Quel calcul donne $${P(Y)}$ ?`, `Quel calcul donne la probabilité de l'événement « ${c.le} ${Y.s} » ?`]);
      return {
        text: `${introArbre(c)} ${q}`,
        format: "qcm",
        choices: choixDistincts(bon, [
          `$${y1} + ${y2}$`,
          `$${pA} \\times ${y1}$`,
          `$${pA} \\times ${y2} + ${pnA} \\times ${y1}$`,
        ], [`$${pA} \\times ${y1} \\times ${pnA} \\times ${y2}$`]),
        expected: [bon],
        comparator: "mcq_exact",
        canvas: arbre(c, v),
        explanation: exp(
          "On multiplie le long de chaque chemin, puis on additionne les chemins.",
          `Deux chemins aboutissent à $${Y.tex}$ : chacun associe une branche du premier niveau à SA branche du second niveau.`,
          `On écrit donc ${bon} $= ${m(v.mg[Y.k])}$.`,
          "Additionner directement les deux branches du second niveau n'a aucun sens : elles ne portent pas sur la même population."
        ),
      };
    }),

  /* ★4 — deux ou trois provenances : la somme des chemins. */
  gab("seconde_pcond_chemins_tpl_6", "proba_arbre_chemins", 4,
    "Chaque provenance donne un chemin vers l'événement : additionne-les tous.",
    ["arbre", "canvas", "short"], () => {
      const t = choisir(TRIOS);
      const n = t.labels.length;
      let parts: number[];
      if (n === 2) {
        const s1 = choisir(pas5(0.3, 0.7));
        parts = [s1, r4(1 - s1)];
      } else {
        let s1 = 0.5;
        let s2 = 0.5;
        while (r4(1 - s1 - s2) < 0.1) {
          s1 = choisir(pas5(0.2, 0.5));
          s2 = choisir(pas5(0.2, 0.5));
        }
        parts = [s1, s2, r4(1 - s1 - s2)];
      }
      const taux = parts.map(() => choisir(t.taux));
      if (taux.every((x) => x === taux[0])) taux[0] = t.taux.find((x) => x !== taux[0]) ?? taux[0];
      const prods = parts.map((s, i) => r4(s * taux[i]));
      const total = r4(prods.reduce((x, y) => x + y, 0));
      const contraireQ = randomInt(0, 2) === 0;
      const rep0 = contraireQ ? r4(1 - total) : total;
      const evQ = contraireQ ? t.D.ns : t.D.s;
      const intro = `${t.lieu}, les ${t.objets} viennent de ${n === 2 ? "deux" : "trois"} ${t.sources} : ${listeFr(parts.map((s, i) => `${pc(s)} ${t.de[i]}`))}. Le pourcentage ${deN(t.objets)} qui ${t.D.p} est de ${listeFr(taux.map((x, i) => `${pc(x)} ${t.pour[i]}`))}.`;
      const q = choisir([
        `On choisit ${t.un} au hasard. Quelle est la probabilité de l'événement « ${t.le} ${evQ} » ?`,
        `Quelle proportion de l'ensemble des ${t.objets} ${contraireQ ? t.D.np : t.D.p} ? Donne-la en écriture décimale.`,
      ]);
      return {
        text: `${intro} ${q}`,
        format: "short",
        expected: rep(rep0),
        comparator: "number_equal",
        canvas: {
          kind: "arbre_proba",
          titre: `${t.D.L} : ${t.D.t}`,
          racineEnfants: t.labels.map((l, i) => ({
            label: l,
            proba: fmt(parts[i], 4),
            enfants: [
              { label: t.D.L, proba: fmt(taux[i], 4) },
              { label: `${t.D.L}̄`, proba: fmt(r4(1 - taux[i]), 4) },
            ],
          })),
        },
        explanation: exp(
          `« ${maj(t.le)} ${t.D.s} » est atteint par ${n} chemins : un par provenance.`,
          "On multiplie le long de chaque chemin, puis on additionne les résultats.",
          `$${parts.map((s, i) => `${m(s)} \\times ${m(taux[i])}`).join(" + ")} = ${prods.map((x) => m(x)).join(" + ")} = ${m(total)}$${contraireQ ? `, puis $1 - ${m(total)} = ${m(rep0)}$` : ""}.`,
          `La probabilité vaut $${m(rep0)}$ — le même geste que pour un dépistage, sur un tout autre sujet.`
        ),
      };
    }),

  /* ★5 — sur un effectif : combien d'individus ? */
  gab("seconde_pcond_chemins_tpl_3", "proba_arbre_chemins", 5,
    "Calcule la probabilité (deux chemins), puis ramène-la à l'effectif.",
    ["arbre", "canvas", "effectifs", "short"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { a, na, b, nb } = evs(c);
      const Y = choisir([b, nb]);
      const pY = v.mg[Y.k];
      const N = effectifEntier([v.ch[cle(a, Y)], v.ch[cle(na, Y)]]);
      const nY = Math.round(N * pY);
      const q = choisir([
        `On s'intéresse à $${N}$ ${c.court} de cette situation. Combien d'entre ${c.eux}, en moyenne, ${Y.p} ?`,
        `Sur un groupe de $${N}$ ${c.court}, combien peut-on s'attendre à en trouver qui ${Y.p} ?`,
      ]);
      return {
        text: `${introArbre(c)} ${q}`,
        format: "short",
        expected: [String(nY)],
        comparator: "number_equal",
        canvas: arbre(c, v),
        explanation: exp(
          "Une probabilité se lit comme une proportion d'un effectif.",
          `On calcule $${P(Y)}$ en additionnant les deux chemins, puis on multiplie par $${N}$.`,
          `$${P(Y)} = ${m(v.ch[cle(a, Y)])} + ${m(v.ch[cle(na, Y)])} = ${m(pY)}$, et $${m(pY)} \\times ${N} = ${nY}$.`,
          `Environ $${nY}$ ${c.court} sur $${N}$ ${Y.p}.`
        ),
      };
    }),

  /* ★5 — « l'un ou l'autre, mais pas les deux » : deux chemins croisés. */
  gab("seconde_pcond_chemins_tpl_4", "proba_arbre_chemins", 5,
    "Repère les deux feuilles où un seul des deux événements est réalisé.",
    ["arbre", "canvas", "short"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { a, na, b, nb } = evs(c);
      const crois = randomInt(0, 1) === 0;
      const r = crois ? r4(v.ch.AnB + v.ch.nAB) : r4(v.ch.AB + v.ch.nAnB);
      const q = crois
        ? choisir([
            `Quelle est la probabilité qu'UN SEUL des deux événements $${a.tex}$ et $${b.tex}$ soit réalisé ?`,
            `Calcule $${PI(a, nb)} + ${PI(na, b)}$.`,
          ])
        : choisir([
            `Quelle est la probabilité que les événements $${a.tex}$ et $${b.tex}$ soient tous les deux réalisés ou tous les deux non réalisés ?`,
            `Calcule $${PI(a, b)} + ${PI(na, nb)}$.`,
          ]);
      const [u, w] = crois ? [[a, nb], [na, b]] : [[a, b], [na, nb]];
      return {
        text: `${introArbre(c)} ${q}`,
        format: "short",
        expected: rep(r),
        comparator: "number_equal",
        canvas: arbre(c, v),
        explanation: exp(
          "Chaque cas cherché est un chemin ; des chemins distincts s'additionnent.",
          `Les chemins concernés sont $${u[0].tex}$ puis $${u[1].tex}$, et $${w[0].tex}$ puis $${w[1].tex}$.`,
          `$${m(v.mg[u[0].k])} \\times ${m(v.br[`${u[0].k}|${u[1].k}`])} + ${m(v.mg[w[0].k])} \\times ${m(v.br[`${w[0].k}|${w[1].k}`])} = ${m(v.ch[cle(u[0], u[1])])} + ${m(v.ch[cle(w[0], w[1])])} = ${m(r)}$.`,
          `La probabilité vaut $${m(r)}$ : multiplier le long, additionner entre.`
        ),
      };
    }),

  /* ★5 — retrouver une branche quand on connaît P(B). */
  gab("seconde_pcond_chemins_tpl_7", "proba_arbre_chemins", 5,
    "Écris $P(B)$ comme la somme des deux chemins : un seul facteur est inconnu.",
    ["arbre", "canvas", "short"], () => {
      const c = choisir(TOUTES);
      const v = tirage(c);
      const { a, na, b, nb } = evs(c);
      const Y = choisir([b, nb]);
      const Yc = contraire(c, Y);
      const pY = v.mg[Y.k];
      const connu = v.ch[cle(a, Y)];
      const cherche = v.br[`nA|${Y.k}`];
      const q = choisir([
        `On sait de plus que $${P(Y)} = ${m(pY)}$. Quelle probabilité faut-il écrire sur la branche qui va de $${na.tex}$ à $${Y.tex}$ ?`,
        `Les branches issues de $${na.tex}$ ont été effacées. Sachant que $${P(Y)} = ${m(pY)}$, calcule $${PS(na, Y)}$.`,
      ]);
      return {
        text: `${introArbre(c)} ${q}`,
        format: "short",
        expected: rep(cherche),
        comparator: "number_equal",
        canvas: arbre(c, v, [`nA|${Y.k}`, `nA|${Yc.k}`]),
        explanation: exp(
          `$${P(Y)}$ est la somme des deux chemins qui mènent à $${Y.tex}$.`,
          `$${P(Y)} = ${P(a)} \\times ${PS(a, Y)} + ${P(na)} \\times ${PS(na, Y)}$ : seule la dernière branche est inconnue.`,
          `$${m(pY)} = ${m(connu)} + ${m(v.mg.nA)} \\times ${PS(na, Y)}$, donc $${PS(na, Y)} = \\dfrac{${m(pY)} - ${m(connu)}}{${m(v.mg.nA)}} = \\dfrac{${m(r4(pY - connu))}}{${m(v.mg.nA)}} = ${m(cherche)}$.`,
          `La branche porte $${m(cherche)}$ — on vérifie en recalculant les deux chemins.`
        ),
      };
    }),

  // ============================================================
  // proba_tableau_croise — la conditionnelle lue sur des effectifs
  // ============================================================

  /* ★2 — lire une case du tableau. */
  gab("seconde_pcond_tab_tpl_9", "proba_tableau_croise", 2,
    "Croise la bonne ligne et la bonne colonne.",
    ["tableau", "canvas", "short"], () => {
      const c = choisir(TOUTES);
      const e = tirEff(c);
      const k = cases(e);
      const { a, na, b, nb } = evs(c);
      const typ = randomInt(0, 2);
      let quoi: string;
      let n: number;
      if (typ === 0) {
        const X = choisir([a, na]);
        const Y = choisir([b, nb]);
        quoi = `${X.p} et ${Y.p}`;
        n = k[cle(X, Y)];
      } else if (typ === 1) {
        const X = choisir([a, na]);
        quoi = X.p;
        n = k[X.k];
      } else {
        const Y = choisir([b, nb]);
        quoi = Y.p;
        n = k[Y.k];
      }
      const q = choisir([
        `Combien ${deN(c.court)} ${quoi} ?`,
        `Lis dans le tableau le nombre ${deN(c.court)} qui ${quoi}.`,
        `Quel est l'effectif des ${c.court} qui ${quoi} ?`,
      ]);
      return {
        text: `${introTableau(c, e)} ${q}`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        canvas: tableau(c, e),
        explanation: exp(
          "Dans un tableau croisé, chaque case croise une ligne (premier critère) et une colonne (second critère) ; les totaux sont en marge.",
          typ === 0 ? "On prend la case à l'intersection de la ligne et de la colonne." : "Un seul critère est demandé : on lit le total de la ligne ou de la colonne.",
          `On lit $${n}$.`,
          `$${n}$ ${c.court} ${quoi}.`
        ),
      };
    }),

  /* ★3 — P_A(B) : on reste sur la LIGNE de la condition. */
  gab("seconde_pcond_tab_tpl_1", "proba_tableau_croise", 3,
    "La condition désigne une LIGNE : reste dessus.",
    ["tableau", "canvas", "short"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const X = choisir([a, na]);
      const Y = choisir([b, nb]);
      const e = tirEff(c, (f) => juste(cases(f)[cle(X, Y)], cases(f)[X.k], 3));
      const k = cases(e);
      const num = k[cle(X, Y)];
      const den = k[X.k];
      const q = choisir([
        `On choisit ${c.un} au hasard. Sachant ${que(c)} ${X.s}, quelle est la probabilité de l'événement « ${c.il} ${Y.s} » ?`,
        `On choisit ${c.un} au hasard. ${nomme(c)} Calcule $${PS(X, Y)}$.`,
        `Parmi les ${c.court} qui ${X.p}, quelle est la proportion de ${c.ceux} qui ${Y.p} ? Donne-la en écriture décimale.`,
      ]);
      return {
        text: `${introTableau(c, e)} ${q}`,
        format: "short",
        expected: rep(num / den),
        comparator: "number_equal",
        canvas: tableau(c, e),
        explanation: exp(
          `Conditionner par « ${X.s} », c'est se restreindre à la ligne « ${X.t} ».`,
          "On divise la case cherchée par le TOTAL de cette ligne.",
          `$\\dfrac{${num}}{${den}} = ${m(num / den)}$.`,
          `La probabilité vaut $${m(num / den)}$ — le total général $${e.N}$ n'intervient pas.`
        ),
      };
    }),

  /* ★3 — une intersection : on divise par le total général. */
  gab("seconde_pcond_tab_tpl_3", "proba_tableau_croise", 3,
    "Aucune condition ici : c'est le total du tableau qui sert de dénominateur.",
    ["tableau", "canvas", "short"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const X = choisir([a, na]);
      const Y = choisir([b, nb]);
      const e = tirEff(c, () => true, [100, 125, 200, 250, 400, 500, 1000]);
      const k = cases(e);
      const num = k[cle(X, Y)];
      const q = choisir([
        `On choisit ${c.un} au hasard. Quelle est la probabilité de l'événement « ${c.il} ${X.s} et ${Y.s} » ?`,
        `On choisit ${c.un} au hasard. ${nomme(c)} Calcule $${PI(X, Y)}$.`,
      ]);
      return {
        text: `${introTableau(c, e)} ${q}`,
        format: "short",
        expected: rep(num / e.N),
        comparator: "number_equal",
        canvas: tableau(c, e),
        explanation: exp(
          "Une intersection, sans condition, se rapporte à la population entière.",
          `On prend la case « ${X.t} » × « ${Y.t} » et on la divise par le total général.`,
          `$\\dfrac{${num}}{${e.N}} = ${m(num / e.N)}$.`,
          `La probabilité vaut $${m(num / e.N)}$ : même case qu'une probabilité conditionnelle, mais pas le même dénominateur.`
        ),
      };
    }),

  /* ★3 — un pourcentage « des … qui … » : conditionnelle sur cent. */
  gab("seconde_pcond_tab_tpl_5", "proba_tableau_croise", 3,
    "« Quel pourcentage des… » : le groupe nommé fournit le dénominateur.",
    ["tableau", "canvas", "pourcentage", "short"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const X = choisir([a, na]);
      const Y = choisir([b, nb]);
      const e = tirEff(c, (f) => juste(100 * cases(f)[cle(X, Y)], cases(f)[X.k], 1));
      const k = cases(e);
      const num = k[cle(X, Y)];
      const den = k[X.k];
      const pct = r4((100 * num) / den);
      const q = choisir([
        `Quel pourcentage des ${c.court} qui ${X.p} ${Y.p} ? (Donne le nombre, sans le signe %.)`,
        `Parmi les ${c.court} qui ${X.p}, quel est le pourcentage de ${c.ceux} qui ${Y.p} ? (Donne le nombre, sans le signe %.)`,
      ]);
      return {
        text: `${introTableau(c, e)} ${q}`,
        format: "short",
        expected: [...rep(pct, 1), `${fmt(pct, 1)} %`, `${fmt(pct, 1)}%`],
        comparator: "number_equal",
        canvas: tableau(c, e),
        explanation: exp(
          "Un pourcentage « des … qui … » est une probabilité conditionnelle exprimée sur cent.",
          `On se place sur la ligne « ${X.t} », on divise, puis on multiplie par $100$.`,
          `$\\dfrac{${num}}{${den}} \\times 100 = ${m(pct, 1)}$.`,
          `${fmt(pct, 1)} % des ${c.court} qui ${X.p} ${Y.p} : c'est $${PS(X, Y)}$ dit autrement.`
        ),
      };
    }),

  /* ★3 — une probabilité simple : total de ligne ou de colonne sur total général. */
  gab("seconde_pcond_tab_tpl_6", "proba_tableau_croise", 3,
    "Aucune condition : le total de la ligne ou de la colonne, sur le total général.",
    ["tableau", "canvas", "short"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const Z = choisir([a, na, b, nb]);
      const e = tirEff(c, () => true, [100, 125, 200, 250, 400, 500, 1000]);
      const k = cases(e);
      const num = k[Z.k];
      const q = choisir([
        `On choisit ${c.un} au hasard. Quelle est la probabilité de l'événement « ${c.il} ${Z.s} » ?`,
        `Quelle proportion des ${c.court} ${Z.p} ? Donne-la en écriture décimale.`,
        `On choisit ${c.un} au hasard. ${nomme(c)} Calcule $${P(Z)}$.`,
      ]);
      return {
        text: `${introTableau(c, e)} ${q}`,
        format: "short",
        expected: rep(num / e.N),
        comparator: "number_equal",
        canvas: tableau(c, e),
        explanation: exp(
          "Sans condition, la référence est la population entière.",
          `On prend le total « ${Z.t} » et on le divise par le total général.`,
          `$\\dfrac{${num}}{${e.N}} = ${m(num / e.N)}$.`,
          `$${P(Z)} = ${m(num / e.N)}$ — le tableau donne d'un coup ce que l'arbre obtient en additionnant deux chemins.`
        ),
      };
    }),

  /* ★4 — la condition est une COLONNE : P_B(A). */
  gab("seconde_pcond_tab_tpl_2", "proba_tableau_croise", 4,
    "Cette fois la condition désigne une COLONNE : reste dessus.",
    ["tableau", "canvas", "short"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const X = choisir([a, na]);
      const Y = choisir([b, nb]);
      const e = tirEff(c);
      const k = cases(e);
      const num = k[cle(X, Y)];
      const den = k[Y.k];
      const exact = juste(num, den, 3);
      const val = exact ? num / den : Math.round((num / den) * 100) / 100;
      const arr = exact ? "" : " (arrondir au centième)";
      const q = choisir([
        `On choisit ${c.un} au hasard. Sachant ${que(c)} ${Y.s}, quelle est la probabilité de l'événement « ${c.il} ${X.s} » ?${arr}`,
        `On choisit ${c.un} au hasard. ${nomme(c)} Calcule $${PS(Y, X)}$.${arr}`,
        `Parmi les ${c.court} qui ${Y.p}, quelle est la proportion de ${c.ceux} qui ${X.p} ?${arr}`,
      ]);
      return {
        text: `${introTableau(c, e)} ${q}`,
        format: "short",
        expected: rep(val),
        comparator: "number_equal",
        canvas: tableau(c, e),
        explanation: exp(
          `La condition « ${Y.s} » désigne la colonne « ${Y.t} ».`,
          "On divise la case cherchée par le TOTAL de cette colonne.",
          `$\\dfrac{${num}}{${den}} ${exact ? "=" : "\\approx"} ${m(val)}$.`,
          `$${PS(Y, X)} ${exact ? "=" : "\\approx"} ${m(val)}$ — à ne pas confondre avec $${PS(X, Y)}$, qui se lit sur la ligne.`
        ),
      };
    }),

  /* ★4 — retrouver une case effacée. */
  gab("seconde_pcond_tab_tpl_7", "proba_tableau_croise", 4,
    "Une ligne (ou une colonne) se complète toujours à son total.",
    ["tableau", "canvas", "short"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const X = choisir([a, na]);
      const Y = choisir([b, nb]);
      const e = tirEff(c);
      const k = cases(e);
      const cl = cle(X, Y);
      const Yc = contraire(c, Y);
      const q = choisir([
        `Une case a été effacée (« ? »). Combien ${deN(c.court)} ${X.p} et ${Y.p} ?`,
        "Quel nombre faut-il écrire à la place du « ? » ?",
        "Complète le tableau : que vaut la case « ? » ?",
      ]);
      return {
        text: `${introTableau(c, e)} ${q}`,
        format: "short",
        expected: [String(k[cl])],
        comparator: "number_equal",
        canvas: tableau(c, e, cl),
        explanation: exp(
          "Dans un tableau croisé, chaque ligne se répartit entre ses colonnes, et chaque colonne entre ses lignes.",
          `On retranche au total de la ligne « ${X.t} » l'autre case de cette ligne.`,
          `$${k[X.k]} - ${k[cle(X, Yc)]} = ${k[cl]}$.`,
          `La case vaut $${k[cl]}$ — on vérifie avec la colonne « ${Y.t} » : elle doit retomber sur $${k[Y.k]}$.`
        ),
      };
    }),

  /* ★5 — quelle fraction donne la conditionnelle ? */
  gab("seconde_pcond_tab_tpl_4", "proba_tableau_croise", 5,
    "Regarde quel total sert de dénominateur dans chaque cas.",
    ["tableau", "canvas", "piege", "qcm"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const X = choisir([a, na]);
      const Y = choisir([b, nb]);
      const e = tirEff(c);
      const k = cases(e);
      const num = k[cle(X, Y)];
      const ligne = randomInt(0, 1) === 0;
      const [C, T] = ligne ? [X, Y] : [Y, X];
      const den = k[C.k];
      const autre = ligne ? k[Y.k] : k[X.k];
      const q = choisir([`Quelle fraction donne $${PS(C, T)}$ ?`, `Sachant que ${c.le} ${C.s}, quelle fraction donne la probabilité de l'événement « ${c.il} ${T.s} » ?`]);
      const choices = qcmFrac([num, den], [[num, autre], [num, e.N], [den, e.N], [k[T.k], e.N]]);
      return {
        text: `${introTableau(c, e)} ${nomme(c)} ${q}`,
        format: "qcm",
        choices,
        expected: [frac(num, den)],
        comparator: "mcq_exact",
        canvas: tableau(c, e),
        explanation: exp(
          "L'indice désigne la condition, donc la ligne ou la colonne où l'on se place.",
          `Ici la condition est $${C.tex}$ : on reste ${ligne ? "sur la ligne" : "dans la colonne"} « ${C.t} ».`,
          `Le numérateur est la case « ${X.t} » × « ${Y.t} », $${num}$, et le dénominateur le total « ${C.t} », $${den}$.`,
          `$${PS(C, T)} = \\dfrac{${num}}{${den}}$ — diviser par $${autre}$ donnerait $${PS(T, C)}$, une tout autre question.`
        ),
      };
    }),

  /* ★5 — sans tableau : le construire, puis conditionner par une colonne. */
  gab("seconde_pcond_tab_tpl_8", "proba_tableau_croise", 5,
    "Range les effectifs dans un tableau croisé : les cases manquantes se déduisent des totaux.",
    ["tableau", "construire", "short"], () => {
      const c = choisir(TOUTES);
      const { a, na, b, nb } = evs(c);
      const X = choisir([a, na]);
      const Y = choisir([b, nb]);
      const e = tirEff(c);
      const k = cases(e);
      const num = k[cle(X, Y)];
      const den = k[Y.k];
      const exact = juste(num, den, 3);
      const val = exact ? num / den : Math.round((num / den) * 100) / 100;
      const arr = exact ? "" : " (arrondir au centième)";
      const donnees = `${c.verbe} $${e.N}$ ${c.pop}. $${e.nA}$ d'entre ${c.eux} ${c.A.p}, et parmi ces $${e.nA}$, $${e.nAB}$ ${c.B.p}. Au total, $${e.nB}$ ${c.court} ${c.B.p}.`;
      const q = choisir([
        `On choisit au hasard ${c.un} parmi ${c.ceux} qui ${Y.p}. Quelle est la probabilité de l'événement « ${c.il} ${X.s} » ?${arr}`,
        `On choisit ${c.un} au hasard. ${nomme(c)} Calcule $${PS(Y, X)}$.${arr}`,
      ]);
      return {
        text: `${donnees} ${q}`,
        format: "short",
        expected: rep(val),
        comparator: "number_equal",
        explanation: exp(
          "On range les données dans un tableau croisé, et l'on complète les cases par différence avec les totaux.",
          `Les ${c.court} qui ${X.p} et ${Y.p} : $${num}$ ; ceux qui ${Y.p} : $${den}$ au total.`,
          `$${PS(Y, X)} = \\dfrac{${num}}{${den}} ${exact ? "=" : "\\approx"} ${m(val)}$.`,
          `La condition « ${Y.s} » fournit le dénominateur, $${den}$ — pas $${e.N}$, ni $${k[X.k]}$.`
        ),
      };
    }),

  // ============================================================
  // proba_faux_positifs — PA(B) n'est pas PB(A)
  // ============================================================

  /* ★3 — traduire une phrase de dépistage en notation. */
  gab("seconde_pcond_faux_tpl_8", "proba_faux_positifs", 3,
    "Le groupe nommé après « parmi » ou « des » est la condition.",
    ["faux-positifs", "langue", "qcm"], () => {
      const c = choisir(DEPISTAGES);
      const v = tirTest();
      const { a, na, b } = evs(c);
      const [X, Y, val] = choisir([
        [a, b, v.br["A|B"]],
        [b, a, r4(Math.round((v.ch.AB / v.mg.B) * 100) / 100)],
        [na, b, v.br["nA|B"]],
        [b, na, r4(Math.round((v.ch.nAB / v.mg.B) * 100) / 100)],
      ] as [E, E, number][]);
      const phrase = choisir([
        `« Parmi les ${c.court} qui ${X.p}, ${pc(val)} ${Y.p}. »`,
        `« ${pc(val)} des ${c.court} qui ${X.p} ${Y.p}. »`,
      ]);
      const q = choisir(["Que traduit cette phrase ?", "Quelle égalité correspond à cette phrase ?"]);
      const bon = `$${PS(X, Y)} = ${m(val)}$`;
      return {
        text: `${cadre(c)} ${nomme(c)} ${phrase} ${q}`,
        format: "qcm",
        choices: choixDistincts(bon, [`$${PS(Y, X)} = ${m(val)}$`, `$${PI(X, Y)} = ${m(val)}$`, `$${P(Y)} = ${m(val)}$`], [`$${P(X)} = ${m(val)}$`]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une phrase « parmi les… », le groupe nommé est la condition : il va en indice.",
          `Ici on se place parmi les ${c.court} qui ${X.p}, et l'on y compte ${c.ceux} qui ${Y.p}.`,
          `La condition est $${X.tex}$, l'événement étudié $${Y.tex}$.`,
          `La phrase dit ${bon} — l'inverser en $${PS(Y, X)}$ est exactement l'erreur des faux positifs.`
        ),
      };
    }),

  /* ★4 — de la notation à la phrase. */
  gab("seconde_pcond_faux_tpl_2", "proba_faux_positifs", 4,
    "Traduis l'indice par « parmi les… ».",
    ["faux-positifs", "langue", "qcm"], () => {
      const c = choisir(DEPISTAGES);
      const v = tirTest();
      const { a, na, b } = evs(c);
      const [X, Y, val] = choisir([
        [b, a, r4(Math.round((v.ch.AB / v.mg.B) * 100) / 100)],
        [a, b, v.br["A|B"]],
        [na, b, v.br["nA|B"]],
      ] as [E, E, number][]);
      const bon = `Parmi les ${c.court} qui ${X.p}, ${pc(val)} ${Y.p}.`;
      const q = choisir([`On lit $${PS(X, Y)} = ${m(val)}$. Quelle phrase dit la même chose ?`, `Quelle phrase traduit l'égalité $${PS(X, Y)} = ${m(val)}$ ?`]);
      return {
        text: `${cadre(c)} ${nomme(c)} ${q}`,
        format: "qcm",
        choices: choixDistincts(bon, [
          `Parmi les ${c.court} qui ${Y.p}, ${pc(val)} ${X.p}.`,
          `${pc(val)} des ${c.court} ${X.p} et ${Y.p}.`,
          `${pc(val)} des ${c.court} ${Y.p}.`,
        ], [`${pc(val)} des ${c.court} ${X.p}.`]),
        expected: [bon],
        comparator: "mcq_exact",
        canvas: arbre(c, v),
        explanation: exp(
          "L'indice est la condition : « sachant $X$ » se dit « parmi les $X$ ».",
          `Ici l'indice est $${X.tex}$ : on se place parmi les ${c.court} qui ${X.p}.`,
          `On y compte ${c.ceux} qui ${Y.p} : ${pc(val)}.`,
          `${bon} — la phrase inversée parlerait d'un tout autre groupe.`
        ),
      };
    }),

  /* ★4 — « l'alarme sonne dans 95 % des vols » ne dit pas « 95 % des alarmes sont des vols ». */
  gab("seconde_pcond_faux_tpl_7", "proba_faux_positifs", 4,
    "Les deux phrases ne parlent pas du même groupe.",
    ["faux-positifs", "langue", "qcm"], () => {
      const c = choisir(DEPISTAGES);
      const k = choisir([80, 85, 90, 95, 98, 99]);
      const bon = `non : cela dépend aussi des ${c.court} qui ${c.A.np} mais ${c.B.p}`;
      const q = choisir([
        `${c.lieu}, ${k} % des ${c.court} qui ${c.A.p} ${c.B.p}. Peut-on en conclure que ${k} % des ${c.court} qui ${c.B.p} ${c.A.p} ?`,
        `${c.lieu}, on sait que ${k} % des ${c.court} qui ${c.A.p} ${c.B.p}. Est-ce la même chose que dire : « parmi les ${c.court} qui ${c.B.p}, ${k} % ${c.A.p} » ?`,
      ]);
      return {
        text: q,
        format: "qcm",
        choices: [bon, "oui, c'est la même proportion dite autrement", "oui, à condition que le test soit fiable", "non : ce serait forcément davantage"],
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Les deux phrases échangent la condition et l'événement étudié.",
          `La première se place parmi les ${c.court} qui ${c.A.p} ; la seconde parmi ${c.ceux} qui ${c.B.p}.`,
          `$P_{${c.A.L}}(${c.B.L}) = ${m(k / 100)}$ ne dit rien de $P_{${c.B.L}}(${c.A.L})$ tant qu'on ignore les ${c.court} qui ${c.A.np} mais ${c.B.p} — les fausses alertes.`,
          "Non : si les fausses alertes sont nombreuses, la plupart des signaux ne correspondent à rien — c'est le paradoxe des faux positifs."
        ),
      };
    }),

  /* ★5 — P_B(A) : un vrai positif parmi tous les positifs. */
  gab("seconde_pcond_faux_tpl_1", "proba_faux_positifs", 5,
    "Divise le chemin cherché par la somme des DEUX chemins qui mènent au signal.",
    ["faux-positifs", "canvas", "short"], () => {
      const c = choisir(DEPISTAGES);
      const v = tirTest();
      const { a, na, b } = evs(c);
      const X = choisir([a, na]);
      const chemin = v.ch[cle(X, b)];
      const arrondi = Math.round((chemin / v.mg.B) * 100) / 100;
      const q = choisir([
        `On sait que ${c.le} ${c.B.s}. Quelle est la probabilité de l'événement « ${c.il} ${X.s} » ? (arrondir au centième)`,
        `Calcule $${PS(b, X)}$. (arrondir au centième)`,
        `Parmi les ${c.court} qui ${c.B.p}, quelle est la proportion de ${c.ceux} qui ${X.p} ? (arrondir au centième)`,
      ]);
      return {
        text: `${introArbre(c)} ${q}`,
        format: "short",
        expected: rep(arrondi, 2),
        comparator: "number_equal",
        canvas: arbre(c, v),
        explanation: exp(
          `On cherche $${PS(b, X)}$ : la condition est maintenant le signal $${b.tex}$, pas l'état réel.`,
          `On divise le chemin $${X.tex}$ puis $${b.tex}$ par $${P(b)}$, somme des deux chemins qui mènent à $${b.tex}$.`,
          `$${P(b)} = ${m(v.ch.AB)} + ${m(v.ch.nAB)} = ${m(v.mg.B)}$, donc $${PS(b, X)} = \\dfrac{${m(chemin)}}{${m(v.mg.B)}} \\approx ${m(arrondi, 2)}$.`,
          X.k === "A"
            ? `Environ $${m(arrondi, 2)}$ — à comparer à $${PS(a, b)} = ${m(v.br["A|B"])}$, la fiabilité annoncée du test.`
            : `Environ $${m(arrondi, 2)}$ des signaux sont de fausses alertes : la condition est rare, les ${c.court} qui ${c.A.np} sont très nombreux.`
        ),
      };
    }),

  /* ★5 — vrais ou faux positifs : lesquels sont les plus nombreux ? */
  gab("seconde_pcond_faux_tpl_3", "proba_faux_positifs", 5,
    "Compare les deux CHEMINS qui mènent au signal, pas les branches.",
    ["faux-positifs", "canvas", "qcm"], () => {
      const c = choisir(DEPISTAGES);
      let v = tirTest();
      for (let k = 0; k < 20 && v.ch.AB === v.ch.nAB; k++) v = tirTest();
      const plusDeFaux = v.ch.nAB > v.ch.AB;
      const vrais = `${c.ceux} qui ${c.A.p} (vrais positifs)`;
      const faux = `${c.ceux} qui ${c.A.np} (fausses alertes)`;
      const bon = plusDeFaux ? faux : vrais;
      const q = choisir([
        `Parmi les ${c.court} qui ${c.B.p}, lesquels sont les plus nombreux ?`,
        `Parmi tous les ${c.court} qui ${c.B.p}, quel groupe l'emporte ?`,
      ]);
      return {
        text: `${introArbre(c)} ${q}`,
        format: "qcm",
        choices: choixDistincts(bon, [plusDeFaux ? vrais : faux, "il y en a exactement autant", "on ne peut pas le savoir avec un arbre"], []),
        expected: [bon],
        comparator: "mcq_exact",
        canvas: arbre(c, v),
        explanation: exp(
          `Il faut comparer les deux chemins qui aboutissent à $${c.B.L}$, pas les probabilités des branches.`,
          "On calcule chaque chemin par un produit, puis on compare.",
          `Vrais positifs : $${m(v.mg.A)} \\times ${m(v.br["A|B"])} = ${m(v.ch.AB)}$ ; fausses alertes : $${m(v.mg.nA)} \\times ${m(v.br["nA|B"])} = ${m(v.ch.nAB)}$.`,
          plusDeFaux
            ? "Les fausses alertes l'emportent : la condition est trop rare pour que le signal suffise à conclure."
            : "Les vrais positifs l'emportent ici — mais rendez la condition plus rare et la conclusion peut s'inverser."
        ),
      };
    }),

  /* ★5 — sur un grand effectif : combien de vrais positifs, de fausses alertes, d'oubliés ? */
  gab("seconde_pcond_faux_tpl_4", "proba_faux_positifs", 5,
    "Un chemin, c'est un produit ; puis on le rapporte à l'effectif.",
    ["faux-positifs", "canvas", "effectifs", "short"], () => {
      const c = choisir(DEPISTAGES);
      const v = tirTest();
      const { a, na, b, nb } = evs(c);
      const [X, Y, nom] = choisir([
        [na, b, "fausses alertes"],
        [a, b, "vrais positifs"],
        [a, nb, "cas manqués par le test"],
      ] as [E, E, string][]);
      const p = v.ch[cle(X, Y)];
      const N = choisir([10000, 20000, 50000]);
      const n = Math.round(N * p);
      const q = choisir([
        `Sur $${N}$ ${c.court}, combien environ ${X.p} et ${Y.p} ?`,
        `On considère $${N}$ ${c.court}. Combien de ${nom} peut-on attendre, c'est-à-dire ${deN(c.court)} qui ${X.p} et ${Y.p} ?`,
      ]);
      return {
        text: `${introArbre(c)} ${q}`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        canvas: arbre(c, v),
        explanation: exp(
          `Ces ${c.court} suivent le chemin $${X.tex}$ puis $${Y.tex}$ : ce sont les ${nom}.`,
          `On multiplie les deux branches, puis on rapporte à $${N}$.`,
          `$${m(v.mg[X.k])} \\times ${m(v.br[`${X.k}|${Y.k}`])} = ${m(p)}$, et $${m(p)} \\times ${N} = ${n}$.`,
          `Environ $${n}$ ${nom} sur $${N}$ — c'est ce genre de nombre qui décide si un dépistage de masse a du sens.`
        ),
      };
    }),

  /* ★5 — comparer P_A(B) et P_B(A). */
  gab("seconde_pcond_faux_tpl_5", "proba_faux_positifs", 5,
    "Calcule les deux, puis compare.",
    ["faux-positifs", "canvas", "qcm"], () => {
      const c = choisir(DEPISTAGES);
      let v = tirTest();
      let inv = Math.round((v.ch.AB / v.mg.B) * 100) / 100;
      for (let k = 0; k < 30 && Math.abs(inv - v.br["A|B"]) < 0.02; k++) {
        v = tirTest();
        inv = Math.round((v.ch.AB / v.mg.B) * 100) / 100;
      }
      const { a, b } = evs(c);
      const direct = v.br["A|B"];
      const g1 = `$${PS(a, b)} = ${m(direct)}$ est la plus grande`;
      const g2 = `$${PS(b, a)} \\approx ${m(inv, 2)}$ est la plus grande`;
      const bon = direct > inv ? g1 : g2;
      const q = choisir([`Compare $${PS(a, b)}$ et $${PS(b, a)}$.`, `Laquelle est la plus grande : $${PS(a, b)}$ ou $${PS(b, a)}$ ?`]);
      return {
        text: `${introArbre(c)} ${q}`,
        format: "qcm",
        choices: choixDistincts(bon, [direct > inv ? g2 : g1, "les deux sont égales", "on ne peut pas les comparer"], []),
        expected: [bon],
        comparator: "mcq_exact",
        canvas: arbre(c, v),
        explanation: exp(
          "Les deux probabilités conditionnelles inversées se calculent séparément, puis se comparent.",
          `$${PS(a, b)}$ se lit sur une branche ; $${PS(b, a)}$ demande de diviser un chemin par la somme des deux chemins qui mènent à $${b.tex}$.`,
          `$${PS(a, b)} = ${m(direct)}$, tandis que $${PS(b, a)} = \\dfrac{${m(v.ch.AB)}}{${m(v.mg.B)}} \\approx ${m(inv, 2)}$.`,
          "Les deux nombres ne se remplacent jamais : un test fiable sur les cas réels ne garantit pas qu'un signal soit fiable."
        ),
      };
    }),

  /* ★5 — que devient P_B(A) si la condition devient plus rare, ou le test meilleur ? */
  gab("seconde_pcond_faux_tpl_6", "proba_faux_positifs", 5,
    "Regarde ce que le changement fait à chacun des deux chemins qui mènent au signal.",
    ["faux-positifs", "canvas", "qcm"], () => {
      const c = choisir(DEPISTAGES);
      const v = tirTest();
      const { a, b } = evs(c);
      const pA = v.mg.A;
      const sens = v.br["A|B"];
      const faux = v.br["nA|B"];
      const ppv = (p: number, s: number, f: number) => (p * s) / (p * s + (1 - p) * f);
      const scen = choisir([
        { txt: `Les ${c.court} qui ${c.A.p} deviennent DIX FOIS plus rares, le reste ne change pas.`, apres: ppv(pA / 10, sens, faux), sens: "elle diminue" },
        { txt: `Les ${c.court} qui ${c.A.p} deviennent DEUX FOIS plus nombreux, le reste ne change pas.`, apres: ppv(pA * 2, sens, faux), sens: "elle augmente" },
        { txt: `Le dispositif est amélioré : parmi les ${c.court} qui ${c.A.np}, il y en a DEUX FOIS moins qui ${c.B.p} ; le reste ne change pas.`, apres: ppv(pA, sens, faux / 2), sens: "elle augmente" },
        { txt: `Le dispositif est déréglé : parmi les ${c.court} qui ${c.A.np}, il y en a DEUX FOIS plus qui ${c.B.p} ; le reste ne change pas.`, apres: ppv(pA, sens, faux * 2), sens: "elle diminue" },
      ]);
      const avant = ppv(pA, sens, faux);
      const q = `${scen.txt} Que devient $${PS(b, a)}$ ?`;
      return {
        text: `${introArbre(c)} ${q}`,
        format: "qcm",
        choices: [scen.sens, scen.sens === "elle diminue" ? "elle augmente" : "elle diminue", "elle ne change pas", "elle devient égale à $1$"],
        expected: [scen.sens],
        comparator: "mcq_exact",
        canvas: arbre(c, v),
        explanation: exp(
          `$${PS(b, a)}$ compare le chemin des vrais positifs à la somme des deux chemins qui mènent à $${b.tex}$.`,
          "On regarde ce que le changement fait à chacun des deux chemins.",
          `Avec les nombres de l'arbre : $${PS(b, a)} \\approx ${m(avant, 3)}$ avant, et environ $${m(apresArr(scen.apres), 3)}$ après.`,
          scen.sens === "elle diminue"
            ? "Elle diminue : plus la condition est rare, ou plus les fausses alertes sont nombreuses, moins un signal positif est informatif."
            : "Elle augmente : plus la condition est fréquente, ou moins il y a de fausses alertes, plus un signal positif est informatif."
        ),
      };
    }),
];

function apresArr(x: number) {
  return Math.round(x * 1000) / 1000;
}

export const probabilitesConditionnellesBank: TutorBankItemV4[] = [...FIGES, ...GABARITS];
