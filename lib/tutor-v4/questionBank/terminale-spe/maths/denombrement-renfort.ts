// Renfort dénombrement et combinatoire de Terminale spé (03/11/2026).
//
// Mesure du 03/11 (scripts/mesurer-squelettes-coach.ts terminale-spe
// denombrement_combinatoire) : 6 à 10 squelettes par micro, 57 items figés
// pour 3 gabarits, 15 à 18 répétitions sur 20 à chaque étoile. On branche des
// générateurs : SITUATION tirée (codes, podiums, comités, playlists, ADN,
// tournois, pizzas, métiers…) × TOURNURE × nombres tirés.
// Aucune question « open » : QCM ou réponse courte ENTIÈRE. Les QCM sont
// dédoublonnés PAR VALEUR : deux propositions ne valent jamais le même nombre.

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { makeChoices } from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ---------- Calculs ---------- */

const fact = (n: number) => {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
};
/** n!/(n−k)! = n(n−1)…(n−k+1). */
const A = (n: number, k: number) => {
  let r = 1;
  for (let i = 0; i < k; i++) r *= n - i;
  return r;
};
/** Coefficient binomial. */
const C = (n: number, k: number) => {
  if (k < 0 || k > n) return 0;
  const m = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= m; i++) r = (r * (n - m + i)) / i;
  return Math.round(r);
};

/** Entier en LaTeX, milliers séparés : « 17\,576 ». */
function nb(v: number) {
  return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
}
/** « 12 \times 11 \times 10 » : les k premiers facteurs descendants de n. */
function prod(n: number, k: number) {
  const f: number[] = [];
  for (let i = 0; i < k; i++) f.push(n - i);
  return f.join(" \\times ");
}
const bin = (n: number | string, k: number | string) => `\\binom{${n}}{${k}}`;
const fracA = (n: number, k: number) => (n - k === 0 ? `${n}!` : `\\dfrac{${n}!}{${n - k}!}`);

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul / Observation : ${calcul}\n\nConclusion : ${conclusion}`;
}

/* ---------- Formats de question ---------- */

type Ch = { t: string; v: number };
/** Proposition numérique affichée. */
const num = (v: number): Ch => ({ t: `$${nb(v)}$`, v });
/** Proposition écrite (expression) avec sa valeur. */
const ex = (t: string, v: number): Ch => ({ t: `$${t}$`, v });

/** QCM dédoublonné par VALEUR et par texte. */
function qcmV(text: string, bon: Ch, leurres: Ch[], explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  const valeurs = new Set<number>([bon.v]);
  const textes = new Set<string>([bon.t]);
  const garde: string[] = [];
  for (const l of leurres) {
    if (!Number.isFinite(l.v) || l.v <= 0 || valeurs.has(l.v) || textes.has(l.t)) continue;
    valeurs.add(l.v);
    textes.add(l.t);
    garde.push(l.t);
  }
  return { text, format: "qcm", choices: makeChoices(bon.t, garde), expected: [bon.t], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) };
}

/** QCM à propositions écrites (concepts). */
function qcmT(text: string, bon: string, pieges: string[], explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  return { text, format: "qcm", choices: makeChoices(bon, pieges), expected: [bon], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) };
}

/** Réponse courte entière. */
function court(text: string, v: number, explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  return { text, format: "short", expected: [String(v)], comparator: "number_equal", explanation, ...(canvas ? { canvas } : {}) };
}

/* =========================================================
   SITUATIONS : liste (nᵏ), arrangement, permutation, combinaison
========================================================= */

type Modele = "liste" | "arrangement" | "permutation" | "combinaison";
/** d : l’ensemble compté (groupe nominal pluriel) ; q : la question complète. */
type Sit = { type: Modele; n: number; k: number; d: string; q: string };

const SITS: Array<() => Sit> = [
  // ---- k-listes (répétitions permises) ----
  () => { const k = randomInt(3, 5); return { type: "liste", n: 10, k, d: `les codes d’un cadenas à ${k} molettes portant chacune les chiffres de 0 à 9`, q: `Un cadenas a ${k} molettes portant chacune les chiffres de 0 à 9. Combien de codes différents peut-on former ?` }; },
  () => { const k = randomInt(2, 4); return { type: "liste", n: 26, k, d: `les mots de passe de ${k} lettres minuscules, une lettre pouvant revenir`, q: `Un mot de passe est formé de ${k} lettres minuscules (26 possibles), une lettre pouvant revenir. Combien de mots de passe différents ?` }; },
  () => { const k = randomInt(2, 5); return { type: "liste", n: 6, k, d: `les suites de résultats de ${k} lancers successifs d’un dé à 6 faces`, q: `On lance ${k} fois de suite un dé à 6 faces et on note la suite des résultats. Combien de suites possibles ?` }; },
  () => { const k = randomInt(3, 10); return { type: "liste", n: 2, k, d: `les suites de pile ou face obtenues en lançant ${k} fois une pièce`, q: `On lance ${k} fois une pièce et on note la suite des pile ou face. Combien de suites possibles ?` }; },
  () => { const k = randomInt(3, 8); return { type: "liste", n: 4, k, d: `les brins d’ADN de ${k} bases, chacune parmi A, C, G et T`, q: `Une biologiste étudie des brins d’ADN de ${k} bases, chaque base étant A, C, G ou T. Combien de brins différents existe-t-il ?` }; },
  () => { const n = randomInt(3, 5), k = randomInt(4, 8); return { type: "liste", n, k, d: `les grilles de réponses à un QCM de ${k} questions ayant chacune ${n} propositions`, q: `Un QCM compte ${k} questions ayant chacune ${n} propositions ; on coche une seule proposition par question. Combien de grilles de réponses différentes ?` }; },
  () => { const k = randomInt(4, 8); return { type: "liste", n: 3, k, d: `les pronostics sur ${k} matchs, chacun pouvant finir en victoire, nul ou défaite`, q: `Un parieur pronostique ${k} matchs de football : victoire, nul ou défaite pour chacun. Combien de pronostics différents ?` }; },
  () => { const n = randomInt(2, 4), k = randomInt(3, 5); return { type: "liste", n, k, d: `les façons de confier ${k} colis à ${n} livreurs, un livreur pouvant prendre plusieurs colis`, q: `Une entreprise confie chacun de ${k} colis à l’un de ses ${n} livreurs ; un livreur peut en prendre plusieurs. Combien de répartitions possibles ?` }; },
  () => { const k = randomInt(3, 5); return { type: "liste", n: 7, k, d: `les mélodies de ${k} notes prises parmi les 7 notes de la gamme, une note pouvant revenir`, q: `Un compositeur écrit une mélodie de ${k} notes prises parmi les 7 notes de la gamme, une note pouvant revenir. Combien de mélodies possibles ?` }; },
  () => { const n = randomInt(3, 6), k = randomInt(3, 5); return { type: "liste", n, k, d: `les coloriages d’une frise de ${k} cases avec ${n} couleurs, une couleur pouvant revenir`, q: `Une graphiste colorie chacune des ${k} cases d’une frise avec l’une de ${n} couleurs (une couleur peut revenir). Combien de frises différentes ?` }; },
  () => { const n = randomInt(2, 4); return { type: "liste", n, k: 5, d: `les choix d’un plat parmi ${n} à la cantine pour chacun des 5 jours de la semaine`, q: `Chaque jour de la semaine (5 jours), un élève choisit l’un des ${n} plats de la cantine ; il peut reprendre le même. Combien de semaines de repas différentes ?` }; },

  // ---- arrangements (ordre, sans répétition) ----
  () => { const n = randomInt(6, 12); return { type: "arrangement", n, k: 3, d: `les podiums (1er, 2e, 3e) d’une course de ${n} coureurs`, q: `Une course réunit ${n} coureurs. Combien de podiums (1er, 2e, 3e) différents sont possibles ?` }; },
  () => { const n = randomInt(5, 12); return { type: "arrangement", n, k: 3, d: `les bureaux (président, trésorier, secrétaire) élus parmi ${n} membres d’une association`, q: `Une association de ${n} membres élit un président, un trésorier et un secrétaire (trois personnes différentes). Combien de bureaux possibles ?` }; },
  () => { const k = randomInt(3, 4); return { type: "arrangement", n: 10, k, d: `les codes de ${k} chiffres tous différents`, q: `Un digicode demande ${k} chiffres tous différents (de 0 à 9). Combien de codes possibles ?` }; },
  () => { const n = randomInt(6, 15), k = randomInt(2, 4); return { type: "arrangement", n, k, d: `les ordres de passage de ${k} élèves tirés au sort parmi ${n} pour un exposé`, q: `Un professeur tire au sort ${k} élèves parmi ${n} et fixe leur ordre de passage à l’oral. Combien de possibilités ?` }; },
  () => { const n = randomInt(8, 15), k = randomInt(3, 4); return { type: "arrangement", n, k, d: `les débuts de playlist formés des ${k} premiers titres, choisis dans l’ordre parmi ${n} chansons`, q: `Une DJ choisit les ${k} premiers titres de sa soirée, dans l’ordre, parmi ${n} chansons, sans répéter un titre. Combien de débuts de playlist possibles ?` }; },
  () => { const n = randomInt(8, 16); return { type: "arrangement", n, k: 2, d: `les choix d’une capitaine et d’une vice-capitaine dans une équipe de ${n} joueuses`, q: `Une équipe de handball compte ${n} joueuses. Combien de façons de désigner une capitaine et une vice-capitaine ?` }; },
  () => { const n = randomInt(5, 9), k = randomInt(3, 4); return { type: "arrangement", n, k, d: `les matinées de ${k} cours de matières différentes, placées dans l’ordre parmi ${n} matières`, q: `Une matinée de lycée comporte ${k} créneaux. On y place ${k} matières différentes, choisies parmi ${n}. Combien d’emplois du temps de matinée possibles ?` }; },
  () => { const n = randomInt(6, 12); return { type: "arrangement", n, k: 3, d: `les tiercés dans l’ordre d’une course de ${n} chevaux`, q: `Au tiercé, on parie sur les 3 premiers chevaux dans l’ordre. Avec ${n} partants, combien de tiercés dans l’ordre possibles ?` }; },
  () => { const n = randomInt(5, 10); return { type: "arrangement", n, k: 3, d: `les équipages (pilote, copilote, navigateur) choisis parmi ${n} candidats`, q: `Pour un rallye, on choisit un pilote, un copilote et un navigateur parmi ${n} candidats. Combien d’équipages possibles ?` }; },
  () => { const n = randomInt(6, 12), k = randomInt(2, 3); return { type: "arrangement", n, k, d: `les palmarès de ${k} prix différents attribués à ${k} des ${n} participants d’un concours de cuisine`, q: `Un concours de cuisine réunit ${n} participants ; on attribue ${k} prix différents (un prix au plus par personne). Combien de palmarès possibles ?` }; },

  // ---- permutations ----
  () => { const n = randomInt(3, 7); return { type: "permutation", n, k: n, d: `les rangements de ${n} livres différents sur une étagère`, q: `Combien de façons de ranger ${n} livres différents sur une étagère ?` }; },
  () => { const n = randomInt(3, 7); return { type: "permutation", n, k: n, d: `les ordres de passage de ${n} groupes de musique lors d’un festival`, q: `Lors d’un festival, ${n} groupes de musique se produisent l’un après l’autre. Combien d’ordres de passage possibles ?` }; },
  () => { const n = randomInt(3, 7); return { type: "permutation", n, k: n, d: `les ordres de tournée d’un livreur qui doit passer à ${n} adresses`, q: `Un livreur doit passer à ${n} adresses. Combien d’ordres de tournée possibles ?` }; },
  () => { const n = randomInt(3, 7); return { type: "permutation", n, k: n, d: `les façons d’asseoir ${n} personnes sur ${n} chaises alignées`, q: `On fait asseoir ${n} personnes sur ${n} chaises alignées. Combien de dispositions possibles ?` }; },
  () => { const n = randomInt(3, 7); return { type: "permutation", n, k: n, d: `les accrochages de ${n} tableaux en ligne dans une salle de musée`, q: `Une conservatrice accroche ${n} tableaux en ligne dans une salle de musée. Combien de dispositions possibles ?` }; },
  () => { const n = randomInt(4, 8); return { type: "permutation", n, k: n, d: `les ordres dans lesquels une chanteuse peut enchaîner les ${n} chansons de son album`, q: `Une chanteuse enchaîne sur scène les ${n} chansons de son nouvel album. Combien d’ordres possibles ?` }; },
  () => { const n = randomInt(3, 7); return { type: "permutation", n, k: n, d: `les ordres de passage de ${n} candidats à un entretien d’embauche`, q: `Une recruteuse reçoit ${n} candidats l’un après l’autre. Combien d’ordres de passage possibles ?` }; },
  () => { const n = randomInt(3, 6); return { type: "permutation", n, k: n, d: `les ordres de visite d’un infirmier qui fait ${n} soins à domicile`, q: `Un infirmier doit faire ${n} soins à domicile dans la matinée. Combien d’ordres de visite possibles ?` }; },

  // ---- combinaisons ----
  () => { const n = randomInt(6, 15), k = randomInt(2, 4); return { type: "combinaison", n, k, d: `les comités de ${k} personnes choisies parmi ${n}`, q: `Combien de comités de ${k} personnes peut-on former parmi ${n} personnes ?` }; },
  () => { const k = randomInt(2, 4); return { type: "combinaison", n: 32, k, d: `les mains de ${k} cartes tirées dans un jeu de 32 cartes`, q: `Combien de mains de ${k} cartes peut-on tirer dans un jeu de 32 cartes ?` }; },
  () => { const n = randomInt(6, 12), k = randomInt(2, 4); return { type: "combinaison", n, k, d: `les pizzas à ${k} garnitures différentes, choisies parmi ${n}`, q: `Une pizzeria propose ${n} garnitures. Combien de pizzas à ${k} garnitures différentes peut-on composer ?` }; },
  () => { const n = randomInt(8, 14), k = randomInt(3, 5); return { type: "combinaison", n, k, d: `les sélections de ${k} joueurs parmi ${n}, sans poste attribué`, q: `Un entraîneur sélectionne ${k} joueurs parmi ${n} pour un tournoi, sans leur attribuer de poste. Combien de sélections possibles ?` }; },
  () => { const n = randomInt(6, 12), k = randomInt(2, 4); return { type: "combinaison", n, k, d: `les lots de ${k} livres emportés en vacances parmi ${n}`, q: `Avant les vacances, Yanis choisit ${k} livres à emporter parmi ${n}. Combien de choix possibles ?` }; },
  () => { const n = pick([20, 25, 30]), k = randomInt(3, 4); return { type: "combinaison", n, k, d: `les grilles où l’on coche ${k} numéros parmi ${n}`, q: `Dans un jeu, on coche ${k} numéros sur une grille de ${n}. Combien de grilles différentes ?` }; },
  () => { const n = randomInt(20, 32); return { type: "combinaison", n, k: 2, d: `les paires de délégués élus dans une classe de ${n} élèves`, q: `Une classe de ${n} élèves élit 2 délégués (sans distinction de rôle). Combien de paires possibles ?` }; },
  () => { const n = randomInt(5, 20); return { type: "combinaison", n, k: 2, d: `les poignées de main échangées entre ${n} personnes qui se saluent toutes une fois`, q: `${n} personnes se serrent toutes la main, une fois chacune avec chacune. Combien de poignées de main ?` }; },
  () => { const n = randomInt(4, 16); return { type: "combinaison", n, k: 2, d: `les matchs d’un tournoi où chacune des ${n} équipes rencontre une fois chaque autre`, q: `Dans un tournoi, chacune des ${n} équipes rencontre une fois chaque autre équipe. Combien de matchs ?` }; },
  () => { const n = randomInt(5, 10), k = randomInt(2, 4); return { type: "combinaison", n, k, d: `les salades de ${k} fruits différents choisis parmi ${n}`, q: `Un primeur propose ${n} fruits. Combien de salades de ${k} fruits différents peut-on composer ?` }; },
  () => { const n = randomInt(8, 20), k = randomInt(2, 3); return { type: "combinaison", n, k, d: `les groupes de ${k} gènes étudiés parmi ${n} dans un laboratoire`, q: `Un laboratoire de génétique étudie ${k} gènes choisis parmi ${n} candidats. Combien de groupes de gènes possibles ?` }; },
  () => { const n = randomInt(5, 12), k = randomInt(2, 3); return { type: "combinaison", n, k, d: `les groupes de ${k} stagiaires retenus parmi ${n} candidats par une architecte`, q: `Une architecte retient ${k} stagiaires parmi ${n} candidats. Combien de groupes de stagiaires possibles ?` }; },
  () => { const n = randomInt(8, 15), k = randomInt(3, 4); return { type: "combinaison", n, k, d: `les sélections de ${k} œuvres parmi ${n} pour une exposition`, q: `Un musée sélectionne ${k} œuvres parmi ${n} pour une exposition. Combien de sélections possibles ?` }; },
  () => { const n = randomInt(5, 9), k = randomInt(2, 3); return { type: "combinaison", n, k, d: `les cocktails de ${k} jus différents mélangés parmi ${n}`, q: `Un barman mélange ${k} jus différents choisis parmi ${n}. Combien de cocktails différents ?` }; },
  () => { const n = randomInt(6, 9), k = randomInt(2, 3); return { type: "combinaison", n, k, d: `les choix de ${k} sentiers parmi les ${n} sentiers balisés du cirque de Mafate`, q: `Un randonneur choisit ${k} sentiers parmi les ${n} sentiers balisés du cirque de Mafate. Combien de choix possibles ?` }; },
];

/** Acteur × objets : « Une libraire met en vitrine 3 livres parmi 12. » (métiers variés). */
const CHOIX: Array<[string, string]> = [
  ["Une libraire met en vitrine", "livres"],
  ["Un entraîneur sélectionne", "joueurs"],
  ["Une cheffe retient", "épices"],
  ["Une professeure interroge", "élèves"],
  ["Un jardinier plante", "variétés de fleurs"],
  ["Une conservatrice expose", "tableaux"],
  ["Une ingénieure installe", "capteurs"],
  ["Un éditeur publie", "manuscrits"],
  ["Une styliste garde", "tissus"],
  ["Une biologiste analyse", "échantillons"],
  ["Une directrice de casting retient", "comédiens"],
  ["Un glacier met en coupe", "parfums"],
  ["Une informaticienne teste", "serveurs"],
  ["Un professeur d’EPS désigne", "arbitres"],
  ["Une agricultrice met en jachère", "parcelles"],
  ["Un astronome observe", "étoiles"],
  ["Une pharmacienne commande", "médicaments"],
  ["Un pâtissier met dans une tarte", "fruits"],
  ["Une architecte retient", "projets"],
  ["Un journaliste publie", "photos"],
  ["Une coach programme", "exercices"],
  ["Un collectionneur garde", "timbres"],
  ["Une DJ télécharge", "morceaux"],
  ["Un chercheur étudie", "protéines"],
  ["Une urbaniste rénove", "quartiers"],
  ["Un vétérinaire vaccine", "chiots"],
  ["Une productrice sélectionne", "courts-métrages"],
  ["Un sommelier goûte", "vins"],
];
const FIN_CHOIX = ["Combien de choix possibles ?", "Combien de sélections différentes ?", "Combien de possibilités en tout ?"];

/** « Une libraire met en vitrine 3 livres parmi 12, sans ordre. Combien de choix possibles ? » */
function phraseChoix(n: number, k: number, ordre = false) {
  const [a, o] = pick(CHOIX);
  if (ordre) return `${a} ${k} ${o} parmi ${n} et les classe du 1er au ${k}e. ${pick(["Combien de classements possibles ?", "Combien de résultats différents ?", "Combien de possibilités en tout ?"])}`;
  return `${a} ${k} ${o} parmi ${n}, sans ordre. ${pick(FIN_CHOIX)}`;
}

/** Ranger n objets : permutations, en situation. */
const PERMS: Array<(n: number) => string> = [
  (n) => `ranger ${n} livres différents sur une étagère`,
  (n) => `aligner ${n} pots de fleurs différents sur un rebord de fenêtre`,
  (n) => `ordonner ${n} photos dans un album`,
  (n) => `asseoir ${n} invités sur ${n} chaises alignées`,
  (n) => `programmer ${n} films différents sur ${n} soirées`,
  (n) => `faire passer ${n} candidats à l’oral, l’un après l’autre`,
  (n) => `enchaîner les ${n} chansons d’un concert`,
  (n) => `visiter ${n} villes lors d’un voyage, chacune une fois`,
  (n) => `placer ${n} rendez-vous dans les ${n} créneaux de la journée d’une avocate`,
  (n) => `garer ${n} voitures sur ${n} places numérotées`,
  (n) => `disposer ${n} plats différents sur un buffet en ligne`,
  (n) => `classer ${n} nageuses à l’arrivée, sans ex æquo`,
  (n) => `attribuer ${n} casiers à ${n} élèves`,
  (n) => `distribuer ${n} rôles différents à ${n} comédiens`,
  (n) => `affecter ${n} infirmiers à ${n} services, un par service`,
  (n) => `répartir ${n} bureaux entre ${n} employés`,
  (n) => `faire défiler ${n} mannequins l’un après l’autre`,
  (n) => `organiser la tournée d’un livreur qui passe à ${n} adresses`,
  (n) => `accrocher ${n} tableaux en ligne dans un musée`,
  (n) => `faire jouer ${n} groupes l’un après l’autre sur la scène d’un festival`,
  (n) => `placer ${n} chevaux dans ${n} stalles de départ`,
];
const DEBUT_PERM: Array<(x: string) => string> = [
  (x) => `De combien de façons peut-on ${x} ?`,
  (x) => `Combien y a-t-il de façons de ${x} ?`,
  (x) => `On veut ${x}. Combien de possibilités ?`,
];

function genPermutation(nmin: number, nmax: number) {
  return () => {
    const n = randomInt(nmin, nmax);
    const v = fact(n);
    return court(
      pick(DEBUT_PERM)(pick(PERMS)(n)),
      v,
      expl(`on ordonne tous les $${n}$ éléments : c’est une permutation.`, `$${n}$ choix pour la première place, $${n - 1}$ pour la deuxième… : $${n}!$.`, `$${n}! = ${prod(n, n)} = ${nb(v)}$.`, `il y a $${nb(v)}$ façons.`)
    );
  };
}

function tirerSit(types: Modele[]): Sit {
  for (;;) {
    const s = pick(SITS)();
    if (types.includes(s.type)) return s;
  }
}

function valeur(s: Sit) {
  if (s.type === "liste") return s.n ** s.k;
  if (s.type === "arrangement") return A(s.n, s.k);
  if (s.type === "permutation") return fact(s.n);
  return C(s.n, s.k);
}

function explSit(s: Sit) {
  const v = valeur(s);
  const { n, k } = s;
  if (s.type === "liste")
    return expl(
      `chaque position se choisit parmi les $${n}$ possibilités et les répétitions sont permises : c’est une $${k}$-liste.`,
      `principe multiplicatif : $${n}$ choix pour chacune des $${k}$ positions, soit $${n}^{${k}}$.`,
      `$${n}^{${k}} = ${nb(v)}$.`,
      `il y en a $${nb(v)}$.`
    );
  if (s.type === "arrangement")
    return expl(
      `on prend $${k}$ éléments distincts parmi $${n}$ et l’ordre compte : c’est une $${k}$-liste d’éléments distincts.`,
      `$${n}$ choix pour le premier, $${n - 1}$ pour le deuxième, etc. : $${fracA(n, k)}$.`,
      `$${prod(n, k)} = ${nb(v)}$.`,
      `il y en a $${nb(v)}$.`
    );
  if (s.type === "permutation")
    return expl(
      `on ordonne TOUS les $${n}$ éléments : c’est une permutation.`,
      `$${n}$ choix pour la première place, $${n - 1}$ pour la deuxième… jusqu’à $1$ : $${n}!$.`,
      `$${n}! = ${prod(n, n)} = ${nb(v)}$.`,
      `il y en a $${nb(v)}$.`
    );
  return expl(
    `on choisit $${k}$ éléments parmi $${n}$ et l’ordre ne compte pas : c’est une combinaison.`,
    `$${bin(n, k)} = \\dfrac{${n}!}{${k}!\\,(${n}-${k})!}$ : on compte les listes ordonnées puis on divise par les $${k}!$ ordres d’un même choix.`,
    `$${bin(n, k)} = \\dfrac{${prod(n, k)}}{${prod(k, k)}} = ${nb(v)}$.`,
    `il y en a $${nb(v)}$.`
  );
}

/** Le calcul correct d’une situation, avec sa valeur. */
function formule(s: Sit): Ch {
  const { n, k } = s;
  if (s.type === "liste") return ex(`${n}^{${k}}`, n ** k);
  if (s.type === "arrangement") return ex(fracA(n, k), A(n, k));
  if (s.type === "permutation") return ex(`${n}!`, fact(n));
  return ex(bin(n, k), C(n, k));
}

/** Les leurres classiques : modèle voisin, nᵏ ↔ n!/(n−k)!, k! oublié, somme au lieu de produit. */
function leurresFormule(s: Sit): Ch[] {
  const { n, k } = s;
  if (s.type === "permutation") return [ex(`${n}^{${n}}`, n ** n), ex(`${n} \\times ${n - 1}`, n * (n - 1)), ex(`2^{${n}}`, 2 ** n), ex(`${n}^2`, n * n)];
  const L: Ch[] = [ex(`${n} \\times ${k}`, n * k), ex(`${k}^{${n}}`, k ** n), ex(`${n} + ${k}`, n + k)];
  if (s.type === "liste") L.push(ex(`${k}!`, fact(k)), ex(`${n}^{${k - 1}}`, n ** (k - 1)), ex(`${n} \\times ${k}!`, n * fact(k)));
  if (s.type !== "liste") L.push(ex(`${n}^{${k}}`, n ** k));
  if (s.type !== "arrangement") L.push(ex(fracA(n, k), A(n, k)));
  if (s.type !== "combinaison") L.push(ex(bin(n, k), C(n, k)));
  if (s.type === "combinaison") L.push(ex(`\\dfrac{${n}!}{${k}!}`, fact(n) / fact(k)));
  if (s.type === "arrangement") L.push(ex(`${k}!`, fact(k)));
  return L;
}

const LIB_MODELE: Record<Modele, string> = {
  liste: "une $k$-liste avec répétitions : $n^k$",
  arrangement: "une $k$-liste d’éléments distincts : $\\dfrac{n!}{(n-k)!}$",
  permutation: "une permutation des $n$ éléments : $n!$",
  combinaison: "une combinaison (partie à $k$ éléments) : $\\binom{n}{k}$",
};
const LIB_PARTIES = "une partie quelconque de l’ensemble : $2^n$";

function genModele(): TutorGeneratedQuestionV4 {
  const s = tirerSit(["liste", "arrangement", "permutation", "combinaison"]);
  const bon = LIB_MODELE[s.type];
  // Une permutation EST une n-liste d’éléments distincts : on n’offre pas ce choix ambigu.
  const pieges = (Object.keys(LIB_MODELE) as Modele[])
    .filter((t) => t !== s.type && !(s.type === "permutation" && t === "arrangement"))
    .map((t) => LIB_MODELE[t]);
  if (s.type === "permutation") pieges.push(LIB_PARTIES);
  const text = pick([
    `On veut dénombrer ${s.d}. Quel modèle convient ?`,
    `Pour compter ${s.d}, on reconnaît :`,
    `Situation : ${s.d}. Quel outil de dénombrement faut-il utiliser ?`,
  ]);
  return qcmT(text, bon, pieges, explSit(s));
}

function genOrdreCompte(): TutorGeneratedQuestionV4 {
  const s = tirerSit(["liste", "arrangement", "permutation", "combinaison"]);
  const oui = "Oui, l’ordre compte";
  const non = "Non, l’ordre ne compte pas";
  const bon = s.type === "combinaison" ? non : oui;
  const text = pick([
    `On veut dénombrer ${s.d}. L’ordre des éléments compte-t-il ?`,
    `Pour compter ${s.d}, faut-il tenir compte de l’ordre ?`,
    `${s.q} Avant de calculer : l’ordre compte-t-il ici ?`,
  ]);
  return qcmT(
    text,
    bon,
    [bon === oui ? non : oui, "Seulement si les éléments sont des nombres", "On ne peut pas le savoir"],
    expl(
      "l’ordre compte quand deux choix formés des mêmes éléments, rangés autrement, sont différents.",
      "on échange deux éléments et on se demande si l’on obtient un résultat différent.",
      s.type === "combinaison" ? "échanger deux éléments donne le même choix (même groupe)." : "échanger deux éléments donne un résultat différent (code, classement, rangement…).",
      `${bon.toLowerCase()}.`
    )
  );
}

function genRepetition(): TutorGeneratedQuestionV4 {
  const s = tirerSit(["liste", "arrangement", "permutation", "combinaison"]);
  const oui = "Oui, un élément peut revenir";
  const non = "Non, les éléments sont tous distincts";
  const bon = s.type === "liste" ? oui : non;
  const text = pick([
    `On veut dénombrer ${s.d}. Un même élément peut-il apparaître plusieurs fois ?`,
    `Pour compter ${s.d}, les répétitions sont-elles possibles ?`,
  ]);
  return qcmT(
    text,
    bon,
    [bon === oui ? non : oui, "Oui, mais seulement deux fois", "Cela dépend de l’ordre"],
    expl(
      "avec répétitions, on compte des $k$-listes ($n^k$) ; sans répétition, des arrangements, permutations ou combinaisons.",
      "on regarde si l’énoncé autorise à reprendre le même élément.",
      s.type === "liste" ? "l’énoncé permet de reprendre le même élément." : "chaque élément ne peut être pris qu’une fois.",
      `${bon.toLowerCase()}.`
    )
  );
}

function genCalculSit(types: Modele[]) {
  return () => {
    const s = tirerSit(types);
    const text = pick([s.q, `On veut dénombrer ${s.d}. Combien y en a-t-il ?`, `Dénombre ${s.d}.`, `Calcule le nombre de possibilités : ${s.d}.`]);
    return court(text, valeur(s), explSit(s));
  };
}

function genFormuleSit(types: Modele[]) {
  return () => {
    const s = tirerSit(types);
    const text = pick([`${s.q} Quel calcul donne la réponse ?`, `On veut dénombrer ${s.d}. Quel calcul faut-il faire ?`, `Quelle expression compte ${s.d} ?`]);
    return qcmV(text, formule(s), leurresFormule(s), explSit(s));
  };
}

/* =========================================================
   FACTORIELLES (reconnaître)
========================================================= */

function genFactorielle(nmin: number, nmax: number) {
  return () => {
    const n = randomInt(nmin, nmax);
    const v = fact(n);
    const e = expl("$n! = n \\times (n-1) \\times \\dots \\times 2 \\times 1$.", "on multiplie tous les entiers de $1$ à $n$.", `$${n}! = ${prod(n, n)} = ${nb(v)}$.`, `$${n}! = ${nb(v)}$.`);
    const t = randomInt(1, 4);
    if (t === 1)
      return court(
        pick([`Que vaut $${n}!$ ?`, `Calcule la factorielle $${n}!$.`, `Donne la valeur de $${n}!$ (factorielle ${n}).`, `Sans calculatrice, calcule $${n}!$.`, `Écris $${n}!$ sous la forme d’un entier.`, `Que doit afficher une calculatrice pour $${n}!$ ?`, `Combien vaut « factorielle ${n} » ?`, `Calcule $${n}! = ${prod(n, n)}$.`]),
        v,
        e
      );
    if (t === 2) return genPermutation(nmin, nmax)();
    return qcmV(pick([`$${n}!$ vaut :`, `Quelle est la valeur de $${n}!$ ?`, `Une élève calcule $${n}!$. Quel résultat doit-elle trouver ?`]), num(v), [num(n * (n + 1) / 2), num(n ** n), num(fact(n - 1)), num(n * n), num(2 ** n)], e);
  };
}

function genQuotientFact() {
  const n = randomInt(5, 12);
  const m = n - randomInt(1, 3);
  const v = A(n, n - m);
  const e = expl("$n! = n \\times (n-1)!$, donc les facteurs communs se simplifient.", `on écrit $${n}! = ${prod(n, n - m)} \\times ${m}!$.`, `$\\dfrac{${n}!}{${m}!} = ${prod(n, n - m)} = ${nb(v)}$.`, `le quotient vaut $${nb(v)}$.`);
  if (randomInt(0, 1))
    return court(
      pick([
        `Que vaut $\\dfrac{${n}!}{${m}!}$ ?`,
        `Simplifie puis calcule $\\dfrac{${n}!}{${m}!}$.`,
        `Calcule sans calculatrice $\\dfrac{${n}!}{${m}!}$.`,
        `Le quotient $\\dfrac{${n}!}{${m}!}$ est un entier. Lequel ?`,
        `Donne la valeur exacte de $\\dfrac{${n}!}{${m}!}$.`,
        `Une élève simplifie $\\dfrac{${n}!}{${m}!}$ avant de calculer. Quel entier obtient-elle ?`,
        `Écris $\\dfrac{${n}!}{${m}!}$ sous la forme d’un entier.`,
      ]),
      v,
      e
    );
  return qcmV(pick([`$\\dfrac{${n}!}{${m}!}$ vaut :`, `Quelle est la valeur de $\\dfrac{${n}!}{${m}!}$ ?`, `Après simplification, $\\dfrac{${n}!}{${m}!}$ est égal à :`]), num(v), [num(fact(n - m)), num(n - m), num(n ** (n - m)), num(v + n), num(C(n, n - m)), num(A(n, n - m + 1)), num(m)], e);
}

function genFactSuivante() {
  const n = randomInt(4, 9);
  const t = randomInt(1, 2);
  const x = pick(PERMS);
  if (randomInt(0, 1)) {
    const v = fact(n + 1);
    return court(
      `Il y a $${nb(fact(n))}$ façons de ${x(n)}. Combien y a-t-il de façons de ${x(n + 1)} ?`,
      v,
      expl("$(n+1)! = (n+1) \\times n!$ : le nouvel élément a $n+1$ places possibles.", `on multiplie $${n}! = ${nb(fact(n))}$ par $${n + 1}$.`, `$${n + 1} \\times ${nb(fact(n))} = ${nb(v)}$.`, `il y a $${nb(v)}$ façons.`)
    );
  }
  if (t === 1) {
    const v = fact(n + 1);
    return court(
      pick([`On donne $${n}! = ${nb(fact(n))}$. Que vaut $${n + 1}!$ ?`, `Sachant que $${n}! = ${nb(fact(n))}$, calcule $${n + 1}!$.`, `Une élève sait que $${n}! = ${nb(fact(n))}$. Sans tout recalculer, que vaut $${n + 1}!$ ?`]),
      v,
      expl("$(n+1)! = (n+1) \\times n!$.", "on multiplie la factorielle donnée par l’entier suivant.", `$${n + 1}! = ${n + 1} \\times ${nb(fact(n))} = ${nb(v)}$.`, `$${n + 1}! = ${nb(v)}$.`)
    );
  }
  const v = fact(n - 1);
  return court(
    pick([`On donne $${n}! = ${nb(fact(n))}$. Que vaut $${n - 1}!$ ?`, `Sachant que $${n}! = ${nb(fact(n))}$, calcule $${n - 1}!$ sans tout recalculer.`]),
    v,
    expl("$n! = n \\times (n-1)!$, donc $(n-1)! = \\dfrac{n!}{n}$.", "on divise la factorielle donnée par $n$.", `$${n - 1}! = \\dfrac{${nb(fact(n))}}{${n}} = ${nb(v)}$.`, `$${n - 1}! = ${nb(v)}$.`)
  );
}

/** Mots aux lettres toutes différentes. */
export const MOTS_DISTINCTS = ["JEUX", "PIANO", "SUCRE", "CHIEN", "FLEUR", "MONTAGE", "PLANTE", "BRIQUE", "CAHIER", "ROUGE", "MATHS", "VOILE", "DANSE", "CLIMAT", "FORGE", "TIGRE", "NUAGE"];
const VOY = new Set(["A", "E", "I", "O", "U", "Y"]);

function genAnagrammes() {
  const mot = pick(MOTS_DISTINCTS);
  const n = mot.length;
  const t = randomInt(1, 3);
  if (t === 1) {
    const v = fact(n);
    return court(
      `Combien d’anagrammes (mots, avec ou sans sens) peut-on écrire avec les ${n} lettres du mot « ${mot} » ?`,
      v,
      expl("les lettres sont toutes différentes : une anagramme est une permutation des lettres.", `on compte $${n}!$.`, `$${n}! = ${nb(v)}$.`, `il y a $${nb(v)}$ anagrammes.`)
    );
  }
  const voy = [...mot].filter((c) => VOY.has(c)).length;
  if (t === 2 && voy > 0) {
    const v = voy * fact(n - 1);
    return court(
      `Combien d’anagrammes du mot « ${mot} » commencent par une voyelle ?`,
      v,
      expl("on place d’abord la première lettre, puis on permute les autres.", `principe multiplicatif : $${voy}$ voyelles possibles en tête, puis $${n - 1}!$ ordres pour le reste.`, `$${voy} \\times ${n - 1}! = ${voy} \\times ${nb(fact(n - 1))} = ${nb(v)}$.`, `il y en a $${nb(v)}$.`)
    );
  }
  const v = fact(n - 1);
  const l = mot[0];
  return court(
    `Combien d’anagrammes du mot « ${mot} » se terminent par la lettre ${l} ?`,
    v,
    expl("la dernière lettre est imposée ; on permute les autres.", `il reste $${n - 1}$ lettres à ordonner : $${n - 1}!$.`, `$${n - 1}! = ${nb(v)}$.`, `il y en a $${nb(v)}$.`)
  );
}

const PRENOMS = [["Léa", "Noé"], ["Inès", "Hugo"], ["Sarah", "Malik"], ["Jade", "Tom"], ["Chloé", "Yanis"], ["Manon", "Ilyes"], ["Emma", "Lucas"], ["Nora", "Sami"]];

function genCoteACote() {
  const n = randomInt(4, 8);
  const [a, b] = pick(PRENOMS);
  const lieu = pick(["sur un banc", "sur une rangée de chaises au cinéma", "pour une photo de classe en ligne", "dans une file d’attente", "sur les sièges d’un rang de bus"]);
  const ensemble = 2 * fact(n - 1);
  if (randomInt(0, 1))
    return court(
      `${n} amis, dont ${a} et ${b}, se placent ${lieu}. Combien de dispositions mettent ${a} et ${b} côte à côte ?`,
      ensemble,
      expl("on colle les deux amis en un « bloc », puis on permute.", `on permute le bloc et les $${n - 2}$ autres : $${n - 1}!$, puis on ordonne le bloc : $2$.`, `$2 \\times ${n - 1}! = 2 \\times ${nb(fact(n - 1))} = ${nb(ensemble)}$.`, `il y a $${nb(ensemble)}$ dispositions.`)
    );
  const v = fact(n) - ensemble;
  return court(
    `${n} amis, dont ${a} et ${b}, se placent ${lieu}. ${a} et ${b} refusent d’être côte à côte. Combien de dispositions possibles ?`,
    v,
    expl("on passe par le complémentaire : toutes les dispositions moins celles où ils sont côte à côte.", `total $${n}!$ ; côte à côte : $2 \\times ${n - 1}!$.`, `$${nb(fact(n))} - ${nb(ensemble)} = ${nb(v)}$.`, `il y a $${nb(v)}$ dispositions.`)
  );
}

/* =========================================================
   PRINCIPES ADDITIF ET MULTIPLICATIF
========================================================= */

const PROD2: Array<(a: number, b: number) => string> = [
  (a, b) => `Pour une tenue, Inès choisit un haut parmi ${a} et un pantalon parmi ${b}. Combien de tenues différentes ?`,
  (a, b) => `Un restaurant propose ${a} entrées et ${b} plats. Combien de menus « entrée + plat » différents ?`,
  (a, b) => `Pour aller de A à B, il y a ${a} routes ; de B à C, ${b} routes. Combien de trajets de A à C passant par B ?`,
  (a, b) => `Un téléphone existe en ${a} couleurs et ${b} capacités de mémoire. Combien de modèles différents ?`,
  (a, b) => `Un glacier propose ${a} parfums et ${b} sortes de cornets. Combien de glaces à une boule différentes ?`,
  (a, b) => `Un vélo se commande avec l’un de ${a} cadres et l’une de ${b} couleurs. Combien de vélos différents ?`,
  (a, b) => `Une chercheuse teste ${a} doses d’un médicament sur ${b} types de cellules ; chaque essai associe une dose et un type. Combien d’essais différents ?`,
  (a, b) => `Une boulangerie propose ${a} sortes de pain et ${b} garnitures (une seule par sandwich). Combien de sandwichs différents ?`,
  (a, b) => `Un maraîcher plante l’une de ${a} variétés de tomates dans l’une de ${b} parcelles. Combien de choix (variété, parcelle) ?`,
  (a, b) => `Dans un jeu vidéo, on choisit un personnage parmi ${a} puis une arme parmi ${b}. Combien de départs différents ?`,
  (a, b) => `Un club de football choisit la couleur de son maillot parmi ${a} et celle de son short parmi ${b}. Combien de tenues ?`,
  (a, b) => `Pour un vol, on choisit une compagnie parmi ${a} et un horaire parmi ${b}. Combien de réservations possibles ?`,
  (a, b) => `Une fleuriste compose un bouquet avec une fleur principale parmi ${a} et un feuillage parmi ${b}. Combien de bouquets ?`,
  (a, b) => `Un mécanicien associe l’un de ${a} pneus à l’une de ${b} jantes. Combien d’associations ?`,
  (a, b) => `Une graphiste choisit une police parmi ${a} et une couleur de fond parmi ${b} pour une affiche. Combien d’affiches différentes ?`,
  (a, b) => `Un lycée propose ${a} options artistiques et ${b} options sportives ; chaque élève prend une option de chaque sorte. Combien de couples d’options ?`,
  (a, b) => `Une infirmière associe l’un de ${a} pansements à l’une de ${b} crèmes. Combien de soins différents ?`,
  (a, b) => `Un appartement se loue avec l’une de ${a} durées de bail et l’une de ${b} formules d’assurance. Combien de contrats différents ?`,
  (a, b) => `Dans une course d’orientation, on choisit l’un de ${a} départs puis l’un de ${b} parcours. Combien de courses différentes ?`,
  (a, b) => `Une développeuse teste son site sur ${a} navigateurs et ${b} tailles d’écran. Combien de tests (navigateur, écran) ?`,
  (a, b) => `Un food-truck propose ${a} burgers et ${b} boissons ; une formule associe un burger et une boisson. Combien de formules ?`,
  (a, b) => `Un électricien choisit l’un de ${a} câbles et l’une de ${b} prises. Combien de montages différents ?`,
  (a, b) => `Pour un concert, on choisit l’une de ${a} salles et l’une de ${b} dates. Combien de programmations possibles ?`,
  (a, b) => `Un agriculteur sème l’une de ${a} céréales avec l’un de ${b} engrais. Combien d’associations possibles ?`,
  (a, b) => `Pour une randonnée, on prend l’un de ${a} sacs et l’une de ${b} paires de chaussures. Combien d’équipements différents ?`,
  (a, b) => `Une pâtissière associe l’une de ${a} pâtes à l’une de ${b} crèmes. Combien de gâteaux différents ?`,
];

const SOMME2: Array<(a: number, b: number) => string> = [
  (a, b) => `Pour son exposé, Hugo prend un seul support : un roman parmi ${a} ou un documentaire parmi ${b}. Combien de choix ?`,
  (a, b) => `Au dessert, on prend soit un fruit parmi ${a}, soit un gâteau parmi ${b}. Combien de desserts possibles ?`,
  (a, b) => `Une élève choisit une seule activité : un sport parmi ${a} ou un atelier artistique parmi ${b}. Combien de choix ?`,
  (a, b) => `Pour aller au travail, on prend soit l’une des ${a} lignes de bus, soit l’une des ${b} lignes de tram. Combien de façons ?`,
  (a, b) => `Un magasin vend ${a} modèles de vélos électriques et ${b} modèles de trottinettes. Un client achète un seul engin. Combien de choix ?`,
  (a, b) => `Une médiathèque propose ${a} BD et ${b} mangas ; on emprunte un seul ouvrage. Combien de choix ?`,
  (a, b) => `Une ingénieure part en mission dans l’une de ${a} villes d’Europe ou l’une de ${b} villes d’Afrique. Combien de destinations ?`,
  (a, b) => `Une salle de sport propose ${a} cours de cardio et ${b} cours de musculation ; on en suit un seul aujourd’hui. Combien de choix ?`,
  (a, b) => `Ce soir, une plateforme propose ${a} films et ${b} épisodes de séries ; on regarde un seul programme. Combien de choix ?`,
  (a, b) => `Un interne de garde est affecté à l’un des ${a} services de médecine ou à l’un des ${b} services de chirurgie. Combien d’affectations ?`,
  (a, b) => `Pour un stage, un élève choisit une seule entreprise : l’une de ${a} dans sa ville ou l’une de ${b} dans la ville voisine. Combien de choix ?`,
  (a, b) => `Une cliente achète un seul instrument : l’une de ${a} guitares ou l’un de ${b} claviers. Combien de choix ?`,
  (a, b) => `Pour le goûter, on prend une seule chose : l’une de ${a} boissons chaudes ou l’un de ${b} jus. Combien de choix ?`,
  (a, b) => `Un club propose ${a} créneaux le samedi et ${b} le dimanche ; chaque adhérent en choisit un seul. Combien de choix ?`,
  (a, b) => `Une étudiante passe un seul concours : l’une de ${a} écoles d’ingénieurs ou l’une de ${b} écoles de commerce. Combien de choix ?`,
  (a, b) => `Un musée vend ${a} cartes postales et ${b} affiches ; un visiteur achète un seul souvenir. Combien de choix ?`,
  (a, b) => `Pour rejoindre la gare, on prend soit l’un de ${a} taxis, soit l’un de ${b} vélos en libre-service. Combien de façons ?`,
  (a, b) => `Une vétérinaire est de garde soit dans l’une de ${a} cliniques de la ville, soit dans l’une de ${b} cliniques rurales. Combien d’affectations ?`,
  (a, b) => `Un élève lit une seule œuvre : l’une de ${a} pièces de théâtre ou l’un de ${b} recueils de poèmes. Combien de choix ?`,
  (a, b) => `Une plateforme propose ${a} podcasts de sciences et ${b} podcasts d’histoire ; on en écoute un seul. Combien de choix ?`,
  (a, b) => `Un joueur choisit un seul personnage : l’un de ${a} guerriers ou l’un de ${b} magiciens. Combien de choix ?`,
];

function genProduit2() {
  const a = randomInt(2, 9), b = randomInt(2, 9);
  return court(pick(PROD2)(a, b), a * b, expl("des choix successifs (l’un PUIS l’autre) se combinent.", "principe multiplicatif : on multiplie les nombres de choix.", `$${a} \\times ${b} = ${a * b}$.`, `il y a $${a * b}$ possibilités.`));
}

function genSomme2() {
  const a = randomInt(2, 12), b = randomInt(2, 12);
  return court(pick(SOMME2)(a, b), a + b, expl("des cas disjoints (l’un OU l’autre, jamais les deux) s’ajoutent.", "principe additif : on additionne les nombres de choix.", `$${a} + ${b} = ${a + b}$.`, `il y a $${a + b}$ choix.`));
}

function genPrincipe() {
  let a = randomInt(3, 9), b = randomInt(3, 9);
  while (b === a) b = randomInt(3, 9);
  const produit = randomInt(0, 1) === 1;
  const text = (produit ? pick(PROD2) : pick(SOMME2))(a, b).replace(/ Combien[^?]*\?$/, " Quel calcul donne le nombre de possibilités ?");
  const bon = produit ? ex(`${a} \\times ${b}`, a * b) : ex(`${a} + ${b}`, a + b);
  const autre = produit ? ex(`${a} + ${b}`, a + b) : ex(`${a} \\times ${b}`, a * b);
  return qcmV(
    text,
    bon,
    [autre, ex(`${a}^{${b}}`, a ** b), ex(`${b}^{${a}}`, b ** a), ex(bin(a + b, 2), C(a + b, 2))],
    expl(
      "principe multiplicatif pour des choix successifs (ET), principe additif pour des cas disjoints (OU).",
      produit ? "on fait un choix PUIS un autre : on multiplie." : "on fait l’un OU l’autre, jamais les deux : on additionne.",
      produit ? `$${a} \\times ${b} = ${a * b}$.` : `$${a} + ${b} = ${a + b}$.`,
      `le bon calcul est ${bon.t}.`
    )
  );
}

const PROD3: Array<(a: number, b: number, c: number) => string> = [
  (a, b, c) => `Un menu complet comprend une entrée parmi ${a}, un plat parmi ${b} et un dessert parmi ${c}. Combien de menus différents ?`,
  (a, b, c) => `Une voiture se commande avec l’une de ${a} motorisations, l’une de ${b} couleurs et l’un de ${c} modèles de jantes. Combien de versions ?`,
  (a, b, c) => `Pour une tenue, on choisit un haut parmi ${a}, un bas parmi ${b} et une paire de chaussures parmi ${c}. Combien de tenues ?`,
  (a, b, c) => `Il y a ${a} routes de A à B, ${b} de B à C et ${c} de C à D. Combien de trajets de A à D passant par B puis C ?`,
  (a, b, c) => `Un burger se compose d’un pain parmi ${a}, d’une galette parmi ${b} et d’une sauce parmi ${c}. Combien de burgers différents ?`,
  (a, b, c) => `Un ordinateur se configure avec l’un de ${a} processeurs, l’une de ${b} mémoires et l’un de ${c} écrans. Combien de configurations ?`,
  (a, b, c) => `Une chimiste teste chaque combinaison de ${a} températures, ${b} concentrations et ${c} catalyseurs. Combien d’expériences ?`,
  (a, b, c) => `Dans un jeu, un avatar a une coiffure parmi ${a}, une tenue parmi ${b} et un accessoire parmi ${c}. Combien d’avatars différents ?`,
  (a, b, c) => `Un voyage associe une destination parmi ${a}, un hôtel parmi ${b} et une activité parmi ${c}. Combien de séjours différents ?`,
  (a, b, c) => `Une couturière choisit un tissu parmi ${a}, une coupe parmi ${b} et une couleur de fil parmi ${c}. Combien de robes différentes ?`,
  (a, b, c) => `Un bol de poké associe une base parmi ${a}, une protéine parmi ${b} et une sauce parmi ${c}. Combien de bols différents ?`,
  (a, b, c) => `Un smartphone existe en ${a} couleurs, ${b} mémoires et ${c} tailles d’écran. Combien de modèles ?`,
  (a, b, c) => `Une agence de voyages combine ${a} vols, ${b} hôtels et ${c} voitures de location. Combien de forfaits ?`,
  (a, b, c) => `Un emploi du temps de stage associe un tuteur parmi ${a}, un service parmi ${b} et une semaine parmi ${c}. Combien d’affectations ?`,
  (a, b, c) => `Une biologiste fait varier ${a} températures, ${b} durées et ${c} milieux de culture ; chaque essai combine les trois. Combien d’essais ?`,
  (a, b, c) => `Un mot de code s’écrit avec une lettre parmi ${a}, un chiffre parmi ${b} et un symbole parmi ${c}, dans cet ordre. Combien de mots de code ?`,
  (a, b, c) => `Une salade composée comporte une base parmi ${a}, un légume parmi ${b} et un fromage parmi ${c}. Combien de salades ?`,
  (a, b, c) => `Un tournoi de jeu vidéo fait choisir une carte parmi ${a}, un mode parmi ${b} et une équipe parmi ${c}. Combien de parties différentes ?`,
  (a, b, c) => `Un photographe choisit un objectif parmi ${a}, un filtre parmi ${b} et un décor parmi ${c}. Combien de prises de vue différentes ?`,
];

/** Le principe multiplicatif en QCM d’expressions, à trois étapes. */
function genPrincipe3() {
  const a = randomInt(2, 7), b = randomInt(2, 7), c = randomInt(2, 7);
  const text = pick(PROD3)(a, b, c).replace(/ Combien[^?]*\?$/, " Quel calcul donne le nombre de possibilités ?");
  return qcmV(
    text,
    ex(`${a} \\times ${b} \\times ${c}`, a * b * c),
    [ex(`${a} + ${b} + ${c}`, a + b + c), ex(`${a} \\times ${b} + ${c}`, a * b + c), ex(`${a + b + c}^3`, (a + b + c) ** 3), ex(bin(a + b + c, 3), C(a + b + c, 3))],
    expl("trois choix successifs (ET).", "principe multiplicatif : on multiplie les nombres de choix.", `$${a} \\times ${b} \\times ${c} = ${a * b * c}$.`, `il y a $${a * b * c}$ possibilités.`)
  );
}

function genProduit3() {
  const a = randomInt(2, 7), b = randomInt(2, 7), c = randomInt(2, 7);
  const v = a * b * c;
  return court(pick(PROD3)(a, b, c), v, expl("trois choix successifs.", "principe multiplicatif : on multiplie les trois nombres de choix.", `$${a} \\times ${b} \\times ${c} = ${v}$.`, `il y a $${v}$ possibilités.`));
}

/** Mélanges ET / OU. */
function genMixte() {
  const t = randomInt(1, 6);
  const a = randomInt(2, 6), b = randomInt(2, 6), c = randomInt(2, 7), d = randomInt(2, 6);
  if (t === 1) {
    const v = (a + b) * c;
    return court(pick([
      `Au restaurant, on prend en entrée une salade parmi ${a} OU une soupe parmi ${b}, puis un plat parmi ${c}. Combien de repas différents ?`,
      `Pour sa tenue, Malik prend une veste parmi ${a} OU un sweat parmi ${b}, puis une paire de baskets parmi ${c}. Combien de tenues ?`,
      `Une étudiante choisit une seule langue (l’une de ${a} langues européennes ou l’une de ${b} langues asiatiques), puis l’un de ${c} niveaux. Combien d’inscriptions possibles ?`,
      `Un client loue soit l’une de ${a} voitures, soit l’un de ${b} utilitaires, pour l’une de ${c} durées. Combien de locations possibles ?`,
      `Un musicien joue un morceau classique parmi ${a} OU un morceau de jazz parmi ${b}, puis un bis parmi ${c}. Combien de programmes ?`,
    ]), v, expl("un premier choix fait de deux cas disjoints (OU), PUIS un second choix (ET).", "principe additif pour le premier choix, multiplicatif ensuite.", `$(${a} + ${b}) \\times ${c} = ${v}$.`, `il y a $${v}$ repas.`));
  }
  if (t === 2) {
    const v = a + b * c;
    return court(pick([
      `Pour aller de A à C, on passe soit directement par l’une de ${a} routes, soit par B (${b} routes de A à B, puis ${c} de B à C). Combien de trajets de A à C ?`,
      `Pour rejoindre Lyon, on prend soit l’un de ${a} trains directs, soit l’un de ${b} bus jusqu’à Valence puis l’un de ${c} trains. Combien de trajets ?`,
      `Une randonneuse rejoint le refuge soit par l’un de ${a} sentiers directs, soit par le col (${b} sentiers jusqu’au col, puis ${c} jusqu’au refuge). Combien d’itinéraires ?`,
      `Un colis part soit par l’un de ${a} vols directs, soit par l’un de ${b} camions jusqu’au port puis l’un de ${c} bateaux. Combien d’acheminements ?`,
    ]), v, expl("deux cas disjoints : direct OU avec une étape.", "avec étape : principe multiplicatif ; puis on ajoute les trajets directs.", `$${a} + ${b} \\times ${c} = ${v}$.`, `il y a $${v}$ trajets.`));
  }
  if (t === 3) {
    const v = a + b * c;
    return court(pick([
      `Pour une soirée, Jade met soit une robe parmi ${a}, soit un haut parmi ${b} avec un pantalon parmi ${c}. Combien de tenues ?`,
      `Au self, on prend soit un plat unique parmi ${a}, soit une entrée parmi ${b} avec un dessert parmi ${c}. Combien de plateaux ?`,
      `Un serveur informatique est protégé soit par l’une de ${a} clés uniques, soit par l’un de ${b} mots de passe combiné à l’un de ${c} codes SMS. Combien de façons de se connecter ?`,
      `Un parfumeur vend soit l’un de ${a} parfums tout prêts, soit un mélange d’une note de tête parmi ${b} et d’une note de fond parmi ${c}. Combien de parfums ?`,
    ]), v, expl("deux cas disjoints : un choix unique OU (un choix ET un autre).", "on multiplie dans le second cas puis on additionne.", `$${a} + ${b} \\times ${c} = ${v}$.`, `il y a $${v}$ tenues.`));
  }
  if (t === 4) {
    const v = a * b + c * d;
    return court(pick([
      `Une compagnie aérienne propose ${a} horaires et ${b} classes ; une autre propose ${c} horaires et ${d} classes. Un voyageur choisit une compagnie, un horaire et une classe. Combien de réservations possibles ?`,
      `Le cinéma A propose ${a} films à ${b} séances chacun ; le cinéma B, ${c} films à ${d} séances chacun. On va voir un seul film. Combien de choix (film, séance) ?`,
      `Une université offre ${a} licences avec ${b} parcours chacune, et ${c} BUT avec ${d} parcours chacun. Combien de choix d’études (formation, parcours) ?`,
      `Un garage vend ${a} citadines en ${b} couleurs et ${c} SUV en ${d} couleurs. Combien de véhicules différents (modèle, couleur) ?`,
    ]), v, expl("deux cas disjoints : la première offre OU la seconde.", "dans chaque cas, principe multiplicatif ; puis on additionne.", `$${a} \\times ${b} + ${c} \\times ${d} = ${v}$.`, `il y a $${v}$ réservations.`));
  }
  if (t === 5) {
    const k1 = randomInt(2, 4), k2 = randomInt(2, 3);
    const v = 10 ** k1 + 26 ** k2;
    return court(`Un identifiant est formé soit de ${k1} chiffres, soit de ${k2} lettres majuscules (répétitions permises). Combien d’identifiants différents ?`, v, expl("deux cas disjoints : chiffres OU lettres.", "principe multiplicatif dans chaque cas, puis principe additif.", `$10^{${k1}} + 26^{${k2}} = ${nb(10 ** k1)} + ${nb(26 ** k2)} = ${nb(v)}$.`, `il y a $${nb(v)}$ identifiants.`));
  }
  const k = randomInt(2, 3);
  const v = 26 ** k + 26 ** (k + 1);
  return court(`Un pseudo est formé de ${k} ou ${k + 1} lettres majuscules (répétitions permises). Combien de pseudos différents ?`, v, expl("deux longueurs : cas disjoints.", `principe multiplicatif pour chaque longueur, puis on additionne.`, `$26^{${k}} + 26^{${k + 1}} = ${nb(26 ** k)} + ${nb(26 ** (k + 1))} = ${nb(v)}$.`, `il y a $${nb(v)}$ pseudos.`));
}

const PARTIES: Array<(n: number) => string> = [
  (n) => `Une pizzeria propose ${n} garnitures ; on en met autant qu’on veut, éventuellement aucune. Combien de pizzas différentes ?`,
  (n) => `Une pièce compte ${n} interrupteurs, chacun allumé ou éteint. Combien d’états différents de l’éclairage ?`,
  (n) => `Un ensemble $E$ a ${n} éléments. Combien a-t-il de parties (en comptant l’ensemble vide et $E$ lui-même) ?`,
  (n) => `Une application propose ${n} options qu’on active ou non. Combien de réglages différents ?`,
  (n) => `Pour une salade, chacun de ${n} ingrédients est mis ou non. Combien de salades différentes (même vide) ?`,
  (n) => `Une médecin peut prescrire ou non chacun de ${n} examens. Combien d’ordonnances d’examens différentes (même sans examen) ?`,
  (n) => `Une voiture neuve a ${n} options, chacune prise ou non. Combien de versions différentes ?`,
  (n) => `Un groupe de ${n} amis : chacun vient ou non à la soirée. Combien de groupes de présents possibles (y compris personne) ?`,
  (n) => `Une imprimante 3D a ${n} réglages, chacun activé ou désactivé. Combien de configurations ?`,
  (n) => `Un glacier propose ${n} nappages ; on en met autant qu’on veut sur sa glace, éventuellement aucun. Combien de glaces différentes ?`,
  (n) => `Une photo est retouchée avec ${n} filtres, chacun appliqué ou non. Combien de versions de la photo ?`,
  (n) => `Une sportive peut ajouter ou non chacun de ${n} exercices à sa séance. Combien de séances différentes (même vide) ?`,
  (n) => `Un mot binaire a ${n} bits (0 ou 1). Combien de mots binaires différents ?`,
  (n) => `Une urbaniste décide, pour chacun de ${n} quartiers, de le rénover ou non. Combien de plans de rénovation (y compris aucun) ?`,
];

function genParties() {
  const n = randomInt(3, 12);
  const v = 2 ** n;
  return court(pick(PARTIES)(n), v, expl("une partie se construit en décidant, pour chaque élément, s’il est pris ou non.", `principe multiplicatif : $2$ choix pour chacun des $${n}$ éléments.`, `$2^{${n}} = ${nb(v)}$.`, `il y en a $${nb(v)}$.`));
}

function genPartiesNonVides() {
  const n = randomInt(3, 12);
  const t = randomInt(1, 2);
  if (t === 1) {
    const v = 2 ** n - 1;
    return court(
      pick([
        `Une pizzeria propose ${n} garnitures ; une pizza en a au moins une. Combien de pizzas différentes ?`,
        `Une application a ${n} options ; on en active au moins une. Combien de réglages possibles ?`,
        `Un ensemble a ${n} éléments. Combien a-t-il de parties non vides ?`,
        `Une salade contient au moins un des ${n} ingrédients proposés. Combien de salades différentes ?`,
        `Un médecin prescrit au moins un examen parmi ${n} possibles. Combien d’ordonnances différentes ?`,
        `Une équipe de ${n} bénévoles envoie au moins une personne à une mission. Combien de groupes envoyés possibles ?`,
        `Un tableau électrique a ${n} interrupteurs ; au moins un est allumé. Combien d’états possibles ?`,
      ]),
      v,
      expl("on enlève la partie vide aux $2^n$ parties.", `$2^{${n}}$ parties (chaque élément pris ou non), moins le cas « rien du tout ».`, `$2^{${n}} - 1 = ${nb(v)}$.`, `il y en a $${nb(v)}$.`)
    );
  }
  const v = 2 ** n - 1 - n;
  return court(pick([
    `Un groupe de ${n} amis veut former un sous-groupe d’au moins 2 personnes. Combien de sous-groupes possibles ?`,
    `Une pizzeria propose ${n} garnitures ; une pizza en a au moins deux. Combien de pizzas différentes ?`,
    `Un ensemble a ${n} éléments. Combien a-t-il de parties ayant au moins 2 éléments ?`,
    `Une chimiste mélange au moins 2 réactifs parmi ${n}. Combien de mélanges possibles ?`,
    `Un DJ superpose au moins 2 pistes parmi ${n}. Combien de mélanges différents ?`,
  ]), v, expl("on part des $2^n$ parties et on enlève celles qui ont $0$ ou $1$ élément.", `$2^{${n}}$ parties, moins la vide, moins les $${n}$ singletons.`, `$2^{${n}} - 1 - ${n} = ${nb(v)}$.`, `il y en a $${nb(v)}$.`));
}

/** « Au moins un » par le complémentaire. */
function genAuMoinsUn() {
  const t = randomInt(1, 7);
  const k = randomInt(2, 5);
  const cas: Array<[string, number, number, string]> = [
    [`Combien de codes de ${k} chiffres (de 0 à 9, répétitions permises) contiennent au moins un 7 ?`, 10, 9, "codes sans 7"],
    [`On lance ${k} fois un dé à 6 faces. Combien de suites de résultats contiennent au moins un 6 ?`, 6, 5, "suites sans 6"],
    [`Combien de brins d’ADN de ${k} bases (A, C, G, T) contiennent au moins une base A ?`, 4, 3, "brins sans A"],
    [`Un parieur pronostique ${k} matchs (victoire, nul ou défaite). Combien de pronostics contiennent au moins un nul ?`, 3, 2, "pronostics sans nul"],
    [`Un QCM a ${k} questions à 4 propositions, une seule juste par question. Combien de grilles ont au moins une bonne réponse ?`, 4, 3, "grilles sans bonne réponse"],
    [`Combien de mots de passe de ${Math.min(k, 3)} lettres (26 lettres, répétitions permises) contiennent au moins une voyelle (6 voyelles) ?`, 26, 20, "mots sans voyelle"],
  ];
  // Situations supplémentaires « au moins un ».
  if (t <= 3 && randomInt(0, 1)) {
    const extra: Array<[string, number, number, string]> = [
      [`Une usine contrôle ${k} pièces, chacune classée « bonne », « à retoucher » ou « rebut ». Combien de résultats contiennent au moins un rebut ?`, 3, 2, "résultats sans rebut"],
      [`Une frise de ${k} cases est coloriée avec 5 couleurs dont le rouge (répétitions permises). Combien de frises contiennent au moins une case rouge ?`, 5, 4, "frises sans rouge"],
      [`Une semaine de ${k} jours, une cantine sert chaque jour l’un de 4 plats dont des lasagnes. Combien de menus de la semaine comptent au moins un jour de lasagnes ?`, 4, 3, "menus sans lasagnes"],
      [`Une roue de loterie a 8 secteurs dont un « jackpot ». On la fait tourner ${k} fois. Combien de suites de résultats contiennent au moins un jackpot ?`, 8, 7, "suites sans jackpot"],
    ];
    cas.splice(0, 3, ...extra.slice(0, 3));
    if (t === 3 && randomInt(0, 1)) cas[2] = extra[3];
  }
  if (t === 7) {
    const kk = randomInt(2, 4);
    const v = 10 ** kk - A(10, kk);
    return court(`Combien de codes de ${kk} chiffres (de 0 à 9) ont au moins deux chiffres égaux ?`, v, expl("contraire de « au moins deux égaux » : « tous différents ».", `total $10^{${kk}}$, moins les $\\dfrac{10!}{${10 - kk}!}$ codes à chiffres distincts.`, `$${nb(10 ** kk)} - ${nb(A(10, kk))} = ${nb(v)}$.`, `il y en a $${nb(v)}$.`));
  }
  const [q0, n, m, sans] = cas[t - 1];
  const kk = t === 6 ? Math.min(k, 3) : k;
  const v = n ** kk - m ** kk;
  const q = pick([
    q0,
    `${q0} (Indice : compte d’abord les ${sans}.)`,
    q0.replace(/^Combien de /, "Dénombre les ").replace(/ \?$/, "."),
  ]);
  return court(q, v, expl("« au moins un » se compte par le complémentaire : tout moins « aucun ».", `total $${n}^{${kk}}$ ; ${sans} : $${m}^{${kk}}$.`, `$${nb(n ** kk)} - ${nb(m ** kk)} = ${nb(v)}$.`, `il y en a $${nb(v)}$.`));
}

/** Grands nombres : QCM d’expressions. */
function genGrandeListe() {
  const t = randomInt(1, 5);
  if (t === 1) {
    const n = pick([36, 62]), k = randomInt(6, 10);
    const lib = n === 36 ? "26 lettres minuscules et 10 chiffres" : "26 minuscules, 26 majuscules et 10 chiffres";
    return qcmV(
      `Un mot de passe compte ${k} caractères pris parmi ${n} (${lib}), répétitions permises. Combien de mots de passe ?`,
      ex(`${n}^{${k}}`, n ** k),
      [ex(`${k}^{${n}}`, k ** n), ex(fracA(n, k), A(n, k)), ex(bin(n, k), C(n, k)), ex(`${n} \\times ${k}`, n * k)],
      expl("$k$-liste avec répétitions.", `principe multiplicatif : $${n}$ choix pour chacun des $${k}$ caractères.`, `$${n}^{${k}}$.`, `il y a $${n}^{${k}}$ mots de passe.`)
    );
  }
  if (t === 2) {
    return qcmV(
      "Une plaque d’immatriculation a la forme AB-123-CD : 2 lettres, 3 chiffres, 2 lettres (26 lettres, 10 chiffres, répétitions permises). Combien de plaques ?",
      ex("26^4 \\times 10^3", 26 ** 4 * 1000),
      [ex("26^4 + 10^3", 26 ** 4 + 1000), ex("26 \\times 4 \\times 10 \\times 3", 3120), ex("\\dfrac{26!}{22!} \\times \\dfrac{10!}{7!}", A(26, 4) * A(10, 3)), ex("36^7", 36 ** 7)],
      expl("chaque position est remplie indépendamment, avec répétitions.", "principe multiplicatif : $26$ choix pour chacune des 4 lettres, $10$ pour chacun des 3 chiffres.", "$26^4 \\times 10^3$.", "il y a $26^4 \\times 10^3$ plaques.")
    );
  }
  if (t === 3) {
    const k = randomInt(6, 9);
    return qcmV(
      `Un numéro de téléphone portable commence par 06, suivi de ${k} chiffres libres. Combien de numéros de cette forme ?`,
      ex(`10^{${k}}`, 10 ** k),
      [ex(`${k}^{10}`, k ** 10), ex(fracA(10, k), A(10, k)), ex(`10 \\times ${k}`, 10 * k), ex(bin(10, k), C(10, k))],
      expl("les chiffres libres forment une $k$-liste avec répétitions.", `$10$ choix pour chacun des $${k}$ chiffres.`, `$10^{${k}}$.`, `il y a $10^{${k}}$ numéros.`)
    );
  }
  if (t === 4) {
    const k = randomInt(10, 20);
    return qcmV(
      `Un séquenceur lit des brins d’ADN de ${k} bases (A, C, G ou T). Combien de brins différents existe-t-il ?`,
      ex(`4^{${k}}`, 4 ** k),
      [ex(`${k}^4`, k ** 4), ex(`4 \\times ${k}`, 4 * k), ex(bin(k, 4), C(k, 4)), ex(`2^{${k}}`, 2 ** k)],
      expl("$k$-liste avec répétitions de bases.", `$4$ choix pour chacune des $${k}$ positions.`, `$4^{${k}}$.`, `il y a $4^{${k}}$ brins.`)
    );
  }
  const k = randomInt(10, 20);
  return qcmV(
    `Un QCM de ${k} questions propose, pour chacune, « Vrai » ou « Faux ». Combien de grilles de réponses différentes ?`,
    ex(`2^{${k}}`, 2 ** k),
    [ex(`${k}^2`, k * k), ex(`2 \\times ${k}`, 2 * k), ex(bin(k, 2), C(k, 2)), ex(`${k}!`, fact(k))],
    expl("$k$-liste à 2 valeurs.", `$2$ choix pour chacune des $${k}$ questions.`, `$2^{${k}}$.`, `il y a $2^{${k}}$ grilles.`)
  );
}

/* =========================================================
   ARRANGEMENT OU COMBINAISON
========================================================= */

function genTypeChoix() {
  const s = tirerSit(["arrangement", "combinaison", "permutation", "liste"]);
  const LIB: Record<Modele, string> = {
    arrangement: "Un arrangement : l’ordre compte, sans répétition",
    combinaison: "Une combinaison : l’ordre ne compte pas",
    liste: "Une liste avec répétitions",
    permutation: "Une permutation de tous les éléments",
  };
  const pieges = (Object.keys(LIB) as Modele[]).filter((t) => t !== s.type && !(s.type === "permutation" && t === "arrangement")).map((t) => LIB[t]);
  if (s.type === "permutation") pieges.push("Une partie quelconque de l’ensemble");
  return qcmT(pick([`${s.q} Ce dénombrement relève de :`, `Quel type de choix décrit ${s.d} ?`, `Arrangement ou combinaison ? On compte ${s.d}.`]), LIB[s.type], pieges, explSit(s));
}

function genArrangementK2() {
  return genCalculSit(["arrangement", "combinaison"])();
}

/** Acteur × objets, AVEC ou SANS classement : arrangement ou combinaison. */
function genChoixOrdre() {
  const n = randomInt(5, 12), k = randomInt(2, Math.min(4, n - 2));
  const ordre = randomInt(0, 1) === 1;
  const v = ordre ? A(n, k) : C(n, k);
  return court(
    phraseChoix(n, k, ordre),
    v,
    ordre
      ? expl("on classe les éléments choisis : l’ordre compte, sans répétition (arrangement).", `$${fracA(n, k)} = ${prod(n, k)}$.`, `$${prod(n, k)} = ${nb(v)}$.`, `il y a $${nb(v)}$ possibilités.`)
      : expl("on choisit sans classer : l’ordre ne compte pas (combinaison).", `$${bin(n, k)} = \\dfrac{${prod(n, k)}}{${k}!}$.`, `$\\dfrac{${prod(n, k)}}{${prod(k, k)}} = ${nb(v)}$.`, `il y a $${nb(v)}$ possibilités.`)
  );
}

function genChoixOrdreQCM() {
  const n = randomInt(5, 12), k = randomInt(2, Math.min(4, n - 2));
  const ordre = randomInt(0, 1) === 1;
  const bonA = ex(fracA(n, k), A(n, k));
  const bonC = ex(bin(n, k), C(n, k));
  return qcmV(
    `${phraseChoix(n, k, ordre).replace(/ (Combien|De combien)[^?]*\?$/, "")} Quel calcul donne le nombre de possibilités ?`,
    ordre ? bonA : bonC,
    [ordre ? bonC : bonA, ex(`${n}^{${k}}`, n ** k), ex(`${k}!`, fact(k)), ex(`${n} \\times ${k}`, n * k), ex(`${k}^{${n}}`, k ** n)],
    ordre
      ? expl("classement : l’ordre compte, sans répétition.", "arrangement : $\\dfrac{n!}{(n-k)!}$.", `$${fracA(n, k)} = ${nb(A(n, k))}$.`, `le bon calcul est $${fracA(n, k)}$.`)
      : expl("simple choix : l’ordre ne compte pas.", "combinaison : $\\binom{n}{k}$.", `$${bin(n, k)} = ${nb(C(n, k))}$.`, `le bon calcul est $${bin(n, k)}$.`)
  );
}

function genRapport() {
  const ctx = pick([
    ["podiums (1er, 2e, 3e)", "trios de finalistes (sans ordre)", "coureurs", 3],
    ["bureaux (président, trésorier, secrétaire)", "comités de 3 personnes", "membres", 3],
    ["débuts de playlist de 3 titres dans l’ordre", "sélections de 3 titres (sans ordre)", "chansons", 3],
    ["choix d’une capitaine et d’une vice-capitaine", "paires de joueuses (sans rôle)", "joueuses", 2],
    ["tiercés dans l’ordre", "tiercés dans le désordre", "chevaux", 3],
    ["ordres de passage de 4 candidats retenus", "groupes de 4 candidats retenus", "candidats", 4],
    ["palmarès (or, argent, bronze)", "groupes de 3 médaillés", "gymnastes", 3],
    ["classements des 2 premiers", "duos de tête (sans ordre)", "pâtissiers", 2],
    ["attributions de 3 postes différents", "équipes de 3 sans poste", "ingénieurs", 3],
    ["ordres de visite de 3 musées", "choix de 3 musées (sans ordre)", "musées", 3],
  ] as const);
  const [ordre, sans, qui, k] = ctx;
  const n = randomInt(k + 3, 12);
  const a = A(n, k), c = C(n, k);
  const t = randomInt(1, 3);
  if (t === 1)
    return court(
      pick([`Avec ${n} ${qui}, il y a ${a} ${ordre}. Combien y a-t-il de ${sans} ?`, `On compte ${a} ${ordre} possibles avec ${n} ${qui}. En déduire le nombre de ${sans}.`]),
      c,
      expl("chaque choix sans ordre correspond à $k!$ choix ordonnés.", `on divise le nombre d’arrangements par $${k}! = ${fact(k)}$.`, `$\\dfrac{${nb(a)}}{${fact(k)}} = ${nb(c)}$.`, `il y a $${nb(c)}$ ${sans}.`)
    );
  if (t === 2)
    return court(
      pick([`Avec ${n} ${qui}, il y a ${c} ${sans}. Combien y a-t-il de ${ordre} ?`, `On compte ${c} ${sans} possibles avec ${n} ${qui}. En déduire le nombre de ${ordre}.`]),
      a,
      expl("chaque choix sans ordre peut être ordonné de $k!$ façons.", `on multiplie le nombre de combinaisons par $${k}! = ${fact(k)}$.`, `$${nb(c)} \\times ${fact(k)} = ${nb(a)}$.`, `il y a $${nb(a)}$ ${ordre}.`)
    );
  return court(
    `Avec ${n} ${qui}, à combien de ${ordre} correspond un même choix parmi les ${sans} ?`,
    fact(k),
    expl("un groupe de $k$ éléments peut s’ordonner de $k!$ façons.", `on compte les permutations des $${k}$ éléments choisis.`, `$${k}! = ${fact(k)}$.`, `chaque choix sans ordre donne $${fact(k)}$ choix ordonnés.`)
  );
}

function genBureauMixte() {
  const ctx = pick([
    ["Un club de", "membres", "un président", "assesseurs"],
    ["Une équipe de", "joueurs", "un capitaine", "remplaçants pour un match amical"],
    ["Un laboratoire de", "chercheurs", "une cheffe de projet", "techniciens pour l’assister"],
    ["Un orchestre de", "musiciens", "un soliste", "musiciens d’accompagnement"],
    ["Une rédaction de", "journalistes", "une rédactrice en chef", "reporters pour un reportage"],
    ["Un service de", "infirmiers", "un cadre de nuit", "infirmiers de garde"],
    ["Une troupe de", "comédiens", "un premier rôle", "figurants"],
    ["Une caserne de", "pompiers", "un chef d’agrès", "équipiers pour une intervention"],
    ["Une classe de", "élèves", "un rapporteur", "membres d’un groupe de travail"],
    ["Une start-up de", "développeurs", "une responsable technique", "testeurs"],
    ["Un cabinet de", "architectes", "un chef de projet", "dessinateurs"],
  ] as const);
  const [grp, qui, role, autres] = ctx;
  const n = randomInt(6, 12), k = randomInt(2, 3);
  const v = n * C(n - 1, k);
  return court(
    pick([
      `${grp} ${n} ${qui} désigne ${role}, puis ${k} ${autres} (sans rôle entre eux) parmi les autres. Combien de choix possibles ?`,
      `${grp} ${n} ${qui} : on choisit ${role} et, parmi les autres, ${k} ${autres} sans distinction. Combien de possibilités ?`,
    ]),
    v,
    expl("un rôle distinct (ordre) puis un groupe sans ordre.", `principe multiplicatif : $${n}$ choix pour le rôle, puis $${bin(n - 1, k)}$ pour le groupe.`, `$${n} \\times ${bin(n - 1, k)} = ${n} \\times ${C(n - 1, k)} = ${nb(v)}$.`, `il y a $${nb(v)}$ choix.`)
  );
}

function genCompareAC() {
  const n = randomInt(6, 12), k = randomInt(2, 4);
  const a = A(n, k), c = C(n, k);
  if (randomInt(0, 1))
    return court(
      pick([
        `Pour $n = ${n}$ et $k = ${k}$, combien de fois y a-t-il plus d’arrangements de $${k}$ éléments que de combinaisons de $${k}$ éléments ?`,
        `${phraseChoix(n, k, true).replace(/ (Combien|De combien)[^?]*\?$/, "")} Combien de fois y a-t-il plus de classements que de simples choix ?`,
      ]),
      fact(k),
      expl("$\\dfrac{n!}{(n-k)!} = k! \\times \\binom{n}{k}$.", "le rapport ne dépend que de $k$.", `$\\dfrac{${nb(a)}}{${nb(c)}} = ${k}! = ${fact(k)}$.`, `il y en a $${fact(k)}$ fois plus.`)
    );
  const qui = pick(["coureurs", "candidats", "chevaux", "nageuses", "pâtissiers", "skieuses", "cyclistes", "danseurs"]);
  return court(
    `Une finale réunit ${n} ${qui}. Combien y a-t-il de classements des ${k} premiers (dans l’ordre) de plus que de groupes de ${k} premiers (sans ordre) ?`,
    a - c,
    expl("classements = arrangements ; groupes = combinaisons.", `on calcule $${fracA(n, k)}$ et $${bin(n, k)}$, puis la différence.`, `$${nb(a)} - ${nb(c)} = ${nb(a - c)}$.`, `il y en a $${nb(a - c)}$ de plus.`)
  );
}

/* =========================================================
   COEFFICIENTS BINOMIAUX
========================================================= */

function explBin(n: number, k: number) {
  const v = C(n, k);
  const kk = Math.min(k, n - k);
  const calc = kk === 0 ? `$${bin(n, k)} = 1$ (une seule façon de ne rien prendre, ou de tout prendre).` : `$${bin(n, k)} = ${kk !== k ? `${bin(n, kk)} = ` : ""}\\dfrac{${prod(n, kk)}}{${prod(kk, kk)}} = ${nb(v)}$.`;
  return expl("$\\binom{n}{k}$ est le nombre de parties à $k$ éléments d’un ensemble à $n$ éléments.", `$\\binom{n}{k} = \\dfrac{n!}{k!\\,(n-k)!}$${kk !== k ? ", et la symétrie $\\binom{n}{k} = \\binom{n}{n-k}$ raccourcit le calcul" : ""}.`, calc, `$${bin(n, k)} = ${nb(v)}$.`);
}

const TOURNURES_BIN: Array<(n: number, k: number) => string> = [
  (n, k) => `Que vaut $${bin(n, k)}$ ?`,
  (n, k) => `Calcule $${bin(n, k)}$.`,
  (n, k) => `Donne la valeur du coefficient binomial $${bin(n, k)}$.`,
  (n, k) => `Sans calculatrice, calcule $${bin(n, k)}$.`,
  (n, k) => `Combien de parties à ${k} éléments possède un ensemble à ${n} éléments ?`,
  (n, k) => `Écris $${bin(n, k)}$ sous la forme d’un entier.`,
  (n, k) => `Combien vaut « ${k} parmi ${n} », noté $${bin(n, k)}$ ?`,
];

/** Valeur de C(n,k) : moitié calcul direct, moitié situation (acteur × objets). */
function binomEnSituation(n: number, k: number) {
  if (k >= 2 && randomInt(0, 2) > 0) return court(phraseChoix(n, k), C(n, k), explBin(n, k));
  return court(pick(TOURNURES_BIN)(n, k), C(n, k), explBin(n, k));
}

function genBinomSimple() {
  const t = randomInt(1, 3);
  let n: number, k: number;
  if (t === 1) {
    n = randomInt(4, 25);
    k = pick([0, 1, n - 1, n]);
  } else {
    n = randomInt(4, 12);
    k = pick([2, n - 2]);
  }
  return binomEnSituation(n, k);
}

function genBinomMoyen() {
  const n = randomInt(5, 12), k = randomInt(2, Math.min(4, n - 2));
  return binomEnSituation(n, k);
}

function genBinomGrand() {
  const n = randomInt(10, 30);
  const k = n - pick([2, 3]);
  if (randomInt(0, 2) === 0) return court(pick([`Calcule $${bin(n, k)}$ (pense à la symétrie).`, `Que vaut $${bin(n, k)}$ ?`, `Calcule astucieusement $${bin(n, k)}$.`]), C(n, k), explBin(n, k));
  return court(phraseChoix(n, k), C(n, k), explBin(n, k));
}

function genBinomEcriture() {
  const n = randomInt(5, 10), k = randomInt(2, n - 2);
  const [a, o] = pick(CHOIX);
  return qcmV(
    randomInt(0, 1)
      ? `${a} ${k} ${o} parmi ${n}, sans ordre. Quelle expression donne le nombre de choix ?`
      : pick([`Quelle écriture est égale à $${bin(n, k)}$ ?`, `Parmi ces expressions, laquelle vaut $${bin(n, k)}$ ?`, `Pour calculer $${bin(n, k)}$ avec des factorielles, on écrit :`]),
    ex(`\\dfrac{${n}!}{${k}!\\,${n - k}!}`, C(n, k)),
    [ex(fracA(n, k), A(n, k)), ex(`\\dfrac{${n}!}{${k}!}`, fact(n) / fact(k)), ex(`${n}^{${k}}`, n ** k), ex(`${n} \\times ${k}`, n * k), ex(`\\dfrac{${n}!}{${n - k}!\\,${k}}`, fact(n) / fact(n - k) / k)],
    explBin(n, k)
  );
}

function genBinomValeurQCM() {
  const n = randomInt(8, 16), k = randomInt(3, 5);
  const [a, o] = pick(CHOIX);
  return qcmV(
    pick([`$${bin(n, k)}$ vaut :`, `Quelle est la valeur de $${bin(n, k)}$ ?`, `${a} ${k} ${o} parmi ${n}, sans ordre. Combien de choix possibles ?`, `${a} ${k} ${o} parmi ${n}. Combien de sélections différentes, sans tenir compte de l’ordre ?`]),
    num(C(n, k)),
    [num(A(n, k)), num(C(n, k + 1)), num(C(n, k - 1)), num(n * k), num(n ** k)],
    explBin(n, k)
  );
}

function genSymetrie() {
  const n = randomInt(8, 30), k = randomInt(2, 5);
  const v = C(n, k);
  const e = expl("symétrie : $\\binom{n}{k} = \\binom{n}{n-k}$ (choisir les $k$ pris revient à choisir les $n-k$ laissés).", `on applique la symétrie avec $n = ${n}$.`, `$${bin(n, n - k)} = ${bin(n, k)} = ${nb(v)}$.`, `$${bin(n, n - k)} = ${nb(v)}$.`);
  if (randomInt(0, 1))
    return court(
      pick([
        `On sait que $${bin(n, k)} = ${nb(v)}$. Que vaut $${bin(n, n - k)}$ ?`,
        `Sans calcul : sachant que $${bin(n, k)} = ${nb(v)}$, donne $${bin(n, n - k)}$.`,
        `Une élève a trouvé $${bin(n, k)} = ${nb(v)}$. Qu’obtient-elle pour $${bin(n, n - k)}$ ?`,
        `Il y a ${v} façons de choisir ${k} personnes parmi ${n}. Combien de façons d’en choisir ${n - k} parmi ${n} ?`,
        `Il y a ${v} façons de garder ${k} dossiers parmi ${n}. Combien de façons d’en jeter ${k} et d’en garder ${n - k} ?`,
      ]),
      v,
      e
    );
  return qcmV(
    pick([`Quel coefficient est égal à $${bin(n, k)}$ ?`, `Par symétrie, $${bin(n, k)}$ est égal à :`, `Laquelle de ces égalités permet de calculer $${bin(n, k)}$ autrement ? $${bin(n, k)} = \\ldots$`]),
    ex(bin(n, n - k), v),
    [ex(bin(n, k + 1), C(n, k + 1)), ex(bin(n - 1, k), C(n - 1, k)), ex(bin(n, k - 1), C(n, k - 1)), ex(bin(n - k, k), C(n - k, k)), ex(bin(n + 1, k), C(n + 1, k))],
    e
  );
}

function genSymetrieContexte() {
  const n = randomInt(8, 20), k = randomInt(2, 3);
  const v = C(n, k);
  const ctx = pick([
    [`Dans une classe de ${n} élèves, ${n - k} partent en sortie et ${k} restent.`, "groupes de partants"],
    [`Un entraîneur garde ${n - k} joueurs sur ${n} et en laisse ${k} au repos.`, "groupes de joueurs gardés"],
    [`Une recruteuse convoque ${n - k} candidats sur ${n} et écarte les ${k} autres.`, "groupes de candidats convoqués"],
    [`Un jury retient ${n - k} dossiers sur ${n} et en refuse ${k}.`, "listes de dossiers retenus"],
    [`Une fleuriste met ${n - k} roses sur ${n} dans un bouquet et garde les ${k} autres.`, "bouquets"],
    [`Un professeur corrige ${n - k} copies sur ${n} ce soir et laisse les ${k} autres pour demain.`, "lots de copies corrigées ce soir"],
    [`Une infirmière vaccine ${n - k} patients sur ${n} ce matin, les ${k} autres l’après-midi.`, "groupes de patients du matin"],
    [`Un festival programme ${n - k} groupes sur ${n} candidats et en refuse ${k}.`, "programmations"],
  ] as const);
  return court(
    `${ctx[0]} Combien de ${ctx[1]} possibles ?`,
    v,
    expl("choisir les $n-k$ éléments gardés revient à choisir les $k$ laissés : $\\binom{n}{n-k} = \\binom{n}{k}$.", "on calcule le coefficient le plus simple.", `$${bin(n, n - k)} = ${bin(n, k)} = \\dfrac{${prod(n, k)}}{${prod(k, k)}} = ${nb(v)}$.`, `il y en a $${nb(v)}$.`)
  );
}

function genTrouverN() {
  const n = randomInt(5, 25);
  const v = C(n, 2);
  const q = pick([
    `Lors d’une réunion, chaque personne serre une fois la main de chaque autre : ${v} poignées de main ont été échangées. Combien y avait-il de personnes ?`,
    `Dans un tournoi, chaque équipe a rencontré une fois chaque autre : ${v} matchs ont été joués. Combien d’équipes participaient ?`,
    `On place des points sur un cercle et on les relie deux à deux par des segments : on obtient ${v} segments. Combien de points y a-t-il ?`,
    `Trouve l’entier $n$ tel que $${bin("n", 2)} = ${v}$.`,
    `À la fin d’un congrès, chaque participant a échangé sa carte de visite avec chacun des autres une fois (un échange par paire) : ${v} échanges. Combien de participants ?`,
    `Dans un groupe de messagerie, chaque membre a écrit une fois en privé à chaque autre membre, une conversation par paire : ${v} conversations. Combien de membres ?`,
    `Lors d’un apéritif, chaque invité trinque une fois avec chaque autre : on entend ${v} « tchin ». Combien d’invités ?`,
    `Un réseau relie chaque ordinateur à chaque autre par un câble : il faut ${v} câbles. Combien d’ordinateurs ?`,
    `Une prof organise un tournoi d’échecs où chaque élève affronte une fois chaque autre : ${v} parties. Combien d’élèves ?`,
    `Une classe peut former ${v} binômes différents. Combien d’élèves compte-t-elle ?`,
  ]);
  return court(q, n, expl("$\\binom{n}{2} = \\dfrac{n(n-1)}{2}$ compte les paires.", `on cherche $n$ tel que $n(n-1) = ${2 * v}$.`, `$${n} \\times ${n - 1} = ${2 * v}$.`, `$n = ${n}$.`));
}

function genSommeCoefs() {
  const n = randomInt(4, 15);
  const t = randomInt(1, 3);
  if (t === 3) {
    const v = 2 ** n - 2;
    return court(
      pick([
        `Que vaut $${bin(n, 1)} + ${bin(n, 2)} + \\dots + ${bin(n, n - 1)}$ ?`,
        `Un ensemble a ${n} éléments. Combien a-t-il de parties ni vides ni égales à l’ensemble tout entier ?`,
        `Une équipe de ${n} personnes se coupe en deux groupes nommés « matin » et « soir », chacun non vide. Combien de répartitions ?`,
      ]),
      v,
      expl("$\\sum_{k=0}^{n} \\binom{n}{k} = 2^n$ (toutes les parties).", "on retire les deux cas extrêmes ($k = 0$ et $k = n$), qui valent $1$ chacun.", `$2^{${n}} - 2 = ${nb(v)}$.`, `on obtient $${nb(v)}$.`)
    );
  }
  const v = 2 ** n;
  return court(
    pick([
      `Que vaut $${bin(n, 0)} + ${bin(n, 1)} + \\dots + ${bin(n, n)}$ ?`,
      `Calcule $\\displaystyle\\sum_{k=0}^{${n}} ${bin(n, "k")}$.`,
      `Sans calculer chaque terme, donne la somme $\\displaystyle\\sum_{k=0}^{${n}} ${bin(n, "k")}$.`,
      `On additionne le nombre de parties à 0, 1, 2, …, ${n} éléments d’un ensemble à ${n} éléments. Quel total obtient-on ?`,
      `Combien de sous-groupes (de toutes tailles, y compris vide) peut-on former dans un groupe de ${n} personnes ?`,
    ]),
    v,
    expl("la somme des $\\binom{n}{k}$ compte toutes les parties d’un ensemble à $n$ éléments.", "il y a $2^n$ parties (chaque élément pris ou non).", `$2^{${n}} = ${nb(v)}$.`, `on obtient $${nb(v)}$.`)
  );
}

/* =========================================================
   TRIANGLE DE PASCAL (le tableau ne montre JAMAIS la case demandée)
========================================================= */

/** Lignes 0 à nMax du triangle de Pascal. */
function pascalCanvas(nMax: number): CanvasFigure {
  const entetes = ["n \\ k"];
  for (let k = 0; k <= nMax; k++) entetes.push(String(k));
  const lignes: string[][] = [];
  for (let n = 0; n <= nMax; n++) {
    const l = [String(n)];
    for (let k = 0; k <= nMax; k++) l.push(k <= n ? String(C(n, k)) : "");
    lignes.push(l);
  }
  return { kind: "probabilites", variant: "tableau", tableau: { entetes, lignes } } as CanvasFigure;
}

const explPascal = (n: number, k: number) =>
  expl(
    "relation de Pascal : $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$.",
    "chaque case est la somme de la case au-dessus et de celle au-dessus à gauche.",
    `$${bin(n, k)} = ${bin(n - 1, k - 1)} + ${bin(n - 1, k)} = ${nb(C(n - 1, k - 1))} + ${nb(C(n - 1, k))} = ${nb(C(n, k))}$.`,
    `$${bin(n, k)} = ${nb(C(n, k))}$.`
  );

function genPascalCase() {
  const n = randomInt(4, 7), k = randomInt(1, n - 1);
  return court(
    pick([
      `Le tableau donne les lignes $0$ à $${n - 1}$ du triangle de Pascal. Que vaut $${bin(n, k)}$ ?`,
      `À l’aide des lignes du triangle de Pascal ci-dessous (jusqu’à $n = ${n - 1}$), calcule $${bin(n, k)}$.`,
      `Le triangle de Pascal s’arrête à la ligne $${n - 1}$. Quel nombre est en ligne $${n}$, colonne $${k}$ ?`,
      `Une élève prolonge le triangle ci-dessous d’une ligne. Quel nombre écrit-elle en ligne $${n}$, colonne $${k}$ ?`,
      `On ajoute la ligne $${n}$ au triangle de Pascal ci-dessous. Quel nombre se trouve en colonne $${k}$ ?`,
      `Sans formule, avec le triangle ci-dessous, détermine $${bin(n, k)}$.`,
      `Complète : en ligne $${n}$ du triangle de Pascal, la case de la colonne $${k}$ vaut…`,
    ]),
    C(n, k),
    explPascal(n, k),
    pascalCanvas(n - 1)
  );
}

function genPascalSommeDonnee() {
  const n = randomInt(5, 14), k = randomInt(2, n - 2);
  const a = C(n - 1, k - 1), b = C(n - 1, k);
  return court(
    pick([
      `On sait que $${bin(n - 1, k - 1)} = ${nb(a)}$ et $${bin(n - 1, k)} = ${nb(b)}$. Que vaut $${bin(n, k)}$ ?`,
      `Dans le triangle de Pascal, la ligne $${n - 1}$ contient côte à côte $${nb(a)}$ (colonne $${k - 1}$) et $${nb(b)}$ (colonne $${k}$). Quel nombre est juste en dessous de $${nb(b)}$ ?`,
      `Avec $${bin(n - 1, k - 1)} = ${nb(a)}$ et $${bin(n - 1, k)} = ${nb(b)}$, la relation de Pascal donne $${bin(n, k)}$. Combien vaut-il ?`,
      `Une élève lit $${nb(a)}$ et $${nb(b)}$ côte à côte dans la ligne $${n - 1}$ du triangle de Pascal (colonnes $${k - 1}$ et $${k}$). Quel coefficient $${bin(n, k)}$ en déduit-elle ?`,
    ]),
    a + b,
    explPascal(n, k)
  );
}

/** L’argument de Pascal : les groupes qui contiennent une personne donnée, et les autres. */
const GROUPES_P: Array<[string, string]> = [
  ["élèves", "une délégation"],
  ["joueuses", "une sélection"],
  ["musiciens", "un quatuor élargi"],
  ["chercheurs", "une équipe de projet"],
  ["bénévoles", "une équipe de ravitaillement"],
  ["danseurs", "un groupe de chorégraphie"],
  ["candidates", "une liste de finalistes"],
  ["pompiers", "une équipe d’intervention"],
  ["infirmiers", "une équipe de garde"],
  ["cyclistes", "une échappée"],
  ["comédiennes", "une distribution"],
  ["jurés", "un jury restreint"],
  ["ingénieurs", "une équipe d’audit"],
  ["guides", "une équipe de secours en montagne"],
];
const PRENOMS_P = ["Léa", "Noé", "Inès", "Hugo", "Sarah", "Malik", "Jade", "Yanis", "Manon", "Ilyes"];

function genPascalGroupe() {
  const n = randomInt(5, 14), k = randomInt(2, n - 2);
  const [qui, grp] = pick(GROUPES_P);
  const p = pick(PRENOMS_P);
  const a = C(n - 1, k - 1), b = C(n - 1, k);
  return court(
    pick([
      `Parmi ${n} ${qui}, dont ${p}, on forme ${grp} de ${k} personnes. ${a} de ces groupes comprennent ${p} et ${b} sont formés sans ${p}. Combien de groupes en tout ?`,
      `On choisit ${k} ${qui} parmi ${n} pour ${grp}. Il y a ${a} choix avec ${p} et ${b} choix sans ${p}. Combien de choix au total ?`,
    ]),
    a + b,
    expl(
      "relation de Pascal : $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$.",
      `on sépare les groupes avec ${p} ($${bin(n - 1, k - 1)}$ : on complète par $${k - 1}$ personnes parmi les $${n - 1}$ autres) et sans ${p} ($${bin(n - 1, k)}$).`,
      `$${nb(a)} + ${nb(b)} = ${nb(a + b)} = ${bin(n, k)}$.`,
      `il y a $${nb(a + b)}$ groupes.`
    )
  );
}

function genPascalInverse() {
  const n = randomInt(6, 15), k = randomInt(2, n - 2);
  const v = C(n, k), a = C(n - 1, k - 1);
  if (randomInt(0, 1)) {
    const [qui, grp] = pick(GROUPES_P);
    const p = pick(PRENOMS_P);
    return court(
      pick([
        `Il y a ${v} façons de former ${grp} de ${k} personnes parmi ${n} ${qui}, dont ${a} qui contiennent ${p}. Combien de ces groupes ne contiennent pas ${p} ?`,
        `Parmi les ${v} façons de choisir ${k} ${qui} sur ${n}, ${a} incluent ${p}. Combien l’excluent ?`,
      ]),
      v - a,
      expl("relation de Pascal : $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$.", `les groupes sans ${p} sont ceux qui restent : $${bin(n - 1, k)} = ${bin(n, k)} - ${bin(n - 1, k - 1)}$.`, `$${nb(v)} - ${nb(a)} = ${nb(v - a)}$.`, `$${nb(v - a)}$ groupes ne contiennent pas ${p}.`)
    );
  }
  return court(
    pick([
      `On sait que $${bin(n, k)} = ${nb(v)}$ et $${bin(n - 1, k - 1)} = ${nb(a)}$. Que vaut $${bin(n - 1, k)}$ ?`,
      `Sachant $${bin(n, k)} = ${nb(v)}$ et $${bin(n - 1, k - 1)} = ${nb(a)}$, utilise la relation de Pascal pour trouver $${bin(n - 1, k)}$.`,
      `Dans le triangle de Pascal, $${nb(v)}$ (ligne $${n}$) est la somme de $${nb(a)}$ et d’un autre nombre de la ligne $${n - 1}$. Lequel ?`,
    ]),
    v - a,
    expl("relation de Pascal : $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$.", `on isole $${bin(n - 1, k)} = ${bin(n, k)} - ${bin(n - 1, k - 1)}$.`, `$${nb(v)} - ${nb(a)} = ${nb(v - a)}$.`, `$${bin(n - 1, k)} = ${nb(v - a)}$.`)
  );
}

function genPascalRelationQCM() {
  const n = randomInt(5, 15), k = randomInt(2, n - 2);
  let text = pick([
    `D’après la relation de Pascal, $${bin(n, k)}$ est égal à :`,
    `Quelle égalité est la relation de Pascal appliquée à $${bin(n, k)}$ ? $${bin(n, k)} = \\ldots$`,
    `Pour calculer $${bin(n, k)}$ à partir de la ligne $${n - 1}$ du triangle, on fait :`,
  ]);
  if (randomInt(0, 1)) {
    const [qui, grp] = pick(GROUPES_P);
    const p = pick(PRENOMS_P);
    text = `Pour compter les façons de former ${grp} de ${k} personnes parmi ${n} ${qui}, on sépare les groupes avec ${p} et sans ${p}. Quel calcul obtient-on ?`;
  }
  return qcmV(
    text,
    ex(`${bin(n - 1, k - 1)} + ${bin(n - 1, k)}`, C(n, k)),
    [ex(`${bin(n - 1, k)} + ${bin(n - 1, k + 1)}`, C(n - 1, k) + C(n - 1, k + 1)), ex(`${bin(n - 1, k - 1)} \\times ${bin(n - 1, k)}`, C(n - 1, k - 1) * C(n - 1, k)), ex(`${bin(n - 1, k - 2)} + ${bin(n - 1, k - 1)}`, C(n - 1, k - 2) + C(n - 1, k - 1)), ex(`${bin(n + 1, k)} - ${bin(n, k + 1)}`, C(n + 1, k) - C(n, k + 1)), ex(`${bin(n, k - 1)} + ${bin(n, k)}`, C(n, k - 1) + C(n, k)), ex(`${bin(n - 2, k - 1)} + ${bin(n - 2, k)}`, C(n - 2, k - 1) + C(n - 2, k))],
    explPascal(n, k)
  );
}

function genPascalSommeQCM() {
  const n = randomInt(5, 15), k = randomInt(1, n - 2);
  const v = C(n + 1, k + 1);
  return qcmV(
    pick([
      `La somme $${bin(n, k)} + ${bin(n, k + 1)}$ est égale à :`,
      `Dans le triangle de Pascal, on additionne $${bin(n, k)}$ et $${bin(n, k + 1)}$. On obtient :`,
      `Simplifie $${bin(n, k)} + ${bin(n, k + 1)}$ en un seul coefficient binomial.`,
      `Une élève additionne deux cases voisines de la ligne $${n}$ : $${bin(n, k)} + ${bin(n, k + 1)}$. Quel coefficient trouve-t-elle ?`,
    ]),
    ex(bin(n + 1, k + 1), v),
    [ex(bin(n + 1, k), C(n + 1, k)), ex(bin(n, k + 2), C(n, k + 2)), ex(bin(2 * n, 2 * k + 1), C(2 * n, 2 * k + 1)), ex(bin(n + 2, k + 1), C(n + 2, k + 1)), ex(bin(n - 1, k), C(n - 1, k))],
    expl("relation de Pascal lue « à l’envers » : $\\binom{n}{k} + \\binom{n}{k+1} = \\binom{n+1}{k+1}$.", "deux cases voisines d’une ligne donnent la case sous la seconde.", `$${nb(C(n, k))} + ${nb(C(n, k + 1))} = ${nb(v)} = ${bin(n + 1, k + 1)}$.`, `la somme vaut $${bin(n + 1, k + 1)}$.`)
  );
}

function ligneTex(n: number, modif?: (k: number, v: number) => number) {
  const l: string[] = [];
  for (let k = 0; k <= n; k++) l.push(String(modif ? modif(k, C(n, k)) : C(n, k)));
  return `$${l.join("\\ \\ ")}$`;
}

function genLigneQCM() {
  const n = randomInt(3, 6);
  const m = n + 1;
  const bon = ligneTex(m);
  const pieges = [
    ligneTex(n),
    ligneTex(m + 1),
    ligneTex(m, (k, v) => (k === 2 || k === m - 2 ? v + 1 : v)),
    `$${Array.from({ length: m + 1 }, (_, k) => (k === 0 || k === m ? 1 : m * Math.min(k, m - k))).join("\\ \\ ")}$`,
  ].filter((p) => p !== bon);
  return qcmT(
    pick([
      `Le tableau donne le triangle de Pascal jusqu’à la ligne $${n}$. Quelle est la ligne $${m}$ ?`,
      `Complète le triangle ci-dessous : la ligne $n = ${m}$ est :`,
      `Une élève ajoute une ligne au triangle ci-dessous. Laquelle doit-elle écrire ?`,
      `Quels sont les coefficients $${bin(m, 0)}, ${bin(m, 1)}, \\ldots, ${bin(m, m)}$ ? Aide-toi du triangle ci-dessous.`,
      `On prolonge le triangle de Pascal ci-dessous. La ligne suivante est :`,
    ]),
    bon,
    pieges,
    expl("chaque ligne commence et finit par $1$ ; chaque case intérieure est la somme des deux cases au-dessus.", `on additionne les cases voisines de la ligne $${n}$.`, `ligne $${m}$ : ${bon}.`, `la ligne $${m}$ est ${bon}.`),
    pascalCanvas(n)
  );
}

function genSommeLigne() {
  const n = randomInt(5, 15);
  const v = 2 ** n;
  return court(
    pick([
      `Quelle est la somme de tous les nombres de la ligne $${n}$ du triangle de Pascal ?`,
      `On additionne les nombres de la ligne $n = ${n}$ du triangle de Pascal. Quel total obtient-on ?`,
      `La somme de la ligne $${n - 1}$ du triangle de Pascal vaut $${nb(v / 2)}$. Que vaut la somme de la ligne $${n}$ ?`,
      `Sans écrire la ligne $${n}$ du triangle de Pascal, donne la somme de ses nombres.`,
      `Une élève additionne les ${n + 1} nombres de la ligne $${n}$ du triangle de Pascal. Quel total trouve-t-elle ?`,
    ]),
    v,
    expl("la somme de la ligne $n$ vaut $2^n$ : chaque ligne double la précédente (chaque case sert deux fois).", `on calcule $2^{${n}}$.`, `$2^{${n}} = ${nb(v)}$.`, `la somme vaut $${nb(v)}$.`)
  );
}

function genChemins() {
  const a = randomInt(2, 6), b = randomInt(2, 6);
  const v = C(a + b, a);
  const q = pick([
    `Dans un entrepôt quadrillé, un robot va d’un coin à l’autre en faisant ${a} pas vers la droite et ${b} pas vers le haut, dans un ordre quelconque. Combien de chemins possibles ?`,
    `Dans un quartier en damier, une livreuse doit parcourir ${a} rues vers l’est et ${b} rues vers le nord. Combien d’itinéraires les plus courts possibles ?`,
    `Une fourmi se déplace sur un quadrillage : ${a} pas à droite et ${b} pas en haut. Combien de trajets différents ?`,
    `Un drone de livraison fait ${a} déplacements vers l’est et ${b} vers le nord sur une grille. Combien de trajets possibles ?`,
    `Sur un plateau de jeu, un pion avance de ${a} cases vers la droite et ${b} cases vers le haut, une case à la fois. Combien de parcours possibles ?`,
    `Un coursier à vélo traverse une ville en grille : ${a} blocs vers l’est, ${b} blocs vers le sud, sans détour. Combien d’itinéraires ?`,
    `Une équipe de football marque ${a} buts et en encaisse ${b}. Combien d’évolutions différentes du score (ordre des buts) ?`,
    `Un robot aspirateur va de la porte au coin opposé d’une pièce carrelée : ${a} carreaux en longueur, ${b} en largeur, sans revenir en arrière. Combien de trajets ?`,
    `Une skieuse descend une piste quadrillée en faisant ${a} virages à gauche et ${b} à droite, dans un ordre quelconque. Combien de descentes différentes ?`,
    `Un message binaire contient ${a} chiffres 1 et ${b} chiffres 0. Combien de messages différents ?`,
  ]);
  return court(
    q,
    v,
    expl(`un trajet est une suite de $${a + b}$ étapes : il suffit de choisir la place des $${a}$ étapes du premier type.`, `on choisit $${a}$ places parmi $${a + b}$ : $${bin(a + b, a)}$ (chaque case du quadrillage est la somme des deux précédentes, comme dans le triangle de Pascal).`, `$${bin(a + b, a)} = \\dfrac{${prod(a + b, Math.min(a, b))}}{${prod(Math.min(a, b), Math.min(a, b))}} = ${nb(v)}$.`, `il y en a $${nb(v)}$.`)
  );
}

function genBernoulliChemins() {
  const n = randomInt(4, 10), k = randomInt(1, n - 1);
  const q = pick([
    `On lance ${n} fois une pièce. Dans l’arbre, combien de chemins comportent exactement ${k} « pile » ?`,
    `Une joueuse tire ${n} penalties. Combien de suites de résultats comportent exactement ${k} tirs réussis ?`,
    `Une jardinière sème ${n} graines, chacune germe ou non. Combien de résultats ont exactement ${k} graines germées ?`,
    `Dans un schéma de Bernoulli à ${n} épreuves, combien de chemins de l’arbre mènent à exactement ${k} succès ?`,
    `Un contrôleur teste ${n} pièces, chacune conforme ou non. Combien de résultats comportent exactement ${k} pièces défectueuses ?`,
    `Un basketteur tente ${n} lancers francs. Combien de suites de résultats comptent exactement ${k} paniers ?`,
    `Un laboratoire teste ${n} patients, chacun positif ou négatif. Combien de résultats comptent exactement ${k} positifs ?`,
    `Une archère tire ${n} flèches, chacune dans la cible ou non. Combien de suites comptent exactement ${k} flèches dans la cible ?`,
    `Une semaine de ${n} jours, il pleut ou non chaque jour. Combien de semaines comptent exactement ${k} jours de pluie ?`,
    `Un QCM a ${n} questions ; chaque réponse est juste ou fausse. Combien de copies ont exactement ${k} réponses justes ?`,
  ]);
  return court(q, C(n, k), expl("un chemin de l’arbre est repéré par la position des succès.", `on choisit les $${k}$ épreuves réussies parmi $${n}$ : $${bin(n, k)}$.`, `$${bin(n, k)} = ${nb(C(n, k))}$.`, `il y en a $${nb(C(n, k))}$.`));
}

/* =========================================================
   DÉFIS TYPE BAC
========================================================= */

const MIXTES = [
  ["femmes", "hommes", "un comité"],
  ["filles", "garçons", "une délégation"],
  ["élèves de Première", "élèves de Terminale", "un groupe de projet"],
  ["chimistes", "biologistes", "une équipe de recherche"],
  ["ingénieures", "techniciens", "une équipe de chantier"],
  ["violonistes", "pianistes", "un ensemble de musique"],
  ["infirmières", "aides-soignants", "une équipe de nuit"],
  ["juniors", "seniors", "une équipe de relais"],
  ["médecins", "kinésithérapeutes", "une équipe médicale de match"],
  ["développeuses", "designers", "une équipe d’application"],
  ["agriculteurs", "commerçants", "un conseil municipal"],
  ["professeurs", "parents", "un conseil d’école"],
  ["pilotes", "mécaniciens", "une équipe de course"],
  ["photographes", "rédacteurs", "une équipe de reportage"],
] as const;

/** « exactement 2 personnes parmi les chimistes » / « une seule personne parmi les chimistes ». */
function parmi(i: number, x: string) {
  return i === 1 ? `une seule personne parmi les ${x}` : `exactement ${i} personnes parmi les ${x}`;
}

function genComiteMixte() {
  const [x, y, grp] = pick(MIXTES);
  const f = randomInt(4, 9), h = randomInt(4, 9), p = randomInt(3, 5);
  const i = randomInt(Math.max(1, p - h), Math.min(f, p - 1));
  const v = C(f, i) * C(h, p - i);
  return court(
    pick([
      `On forme ${grp} de ${p} personnes parmi ${f} ${x} et ${h} ${y}. Combien de façons avec ${parmi(i, x)} ?`,
      `Pour ${grp} de ${p} membres, on dispose de ${f} ${x} et ${h} ${y}. On veut ${parmi(i, x)}. Combien de compositions possibles ?`,
    ]),
    v,
    expl("on choisit séparément dans chaque groupe, sans ordre.", `principe multiplicatif : $${bin(f, i)}$ pour les ${x}, $${bin(h, p - i)}$ pour les ${y}.`, `$${bin(f, i)} \\times ${bin(h, p - i)} = ${C(f, i)} \\times ${C(h, p - i)} = ${nb(v)}$.`, `il y a $${nb(v)}$ façons.`)
  );
}

function genComiteAuMoins() {
  const [x, y, grp] = pick(MIXTES);
  const f = randomInt(3, 8), h = randomInt(4, 9), p = randomInt(3, 4);
  const tot = C(f + h, p), sans = C(h, p);
  const v = tot - sans;
  return court(
    pick([
      `On forme ${grp} de ${p} personnes parmi ${f} ${x} et ${h} ${y}. Combien de façons avec au moins une personne parmi les ${x} ?`,
      `Pour ${grp} de ${p} membres, on dispose de ${f} ${x} et ${h} ${y}. Le règlement exige au moins une personne parmi les ${x}. Combien de compositions possibles ?`,
    ]),
    v,
    expl("« au moins une » : tout moins « aucune ».", `total $${bin(f + h, p)}$ ; sans aucune personne parmi les ${x} : $${bin(h, p)}$.`, `$${nb(tot)} - ${nb(sans)} = ${nb(v)}$.`, `il y a $${nb(v)}$ façons.`)
  );
}

function genComiteQCM() {
  const [x, y, grp] = pick(MIXTES);
  const f = randomInt(4, 9), h = randomInt(4, 9), p = randomInt(3, 5);
  const i = randomInt(Math.max(1, p - h), Math.min(f, p - 1));
  return qcmV(
    pick([
      `On forme ${grp} de ${p} personnes parmi ${f} ${x} et ${h} ${y}, avec ${parmi(i, x)}. Quel calcul donne le nombre de possibilités ?`,
      `Pour ${grp} de ${p} membres choisis parmi ${f} ${x} et ${h} ${y}, on impose ${parmi(i, x)}. Quelle expression compte les compositions ?`,
    ]),
    ex(`${bin(f, i)} \\times ${bin(h, p - i)}`, C(f, i) * C(h, p - i)),
    [ex(`${bin(f, i)} + ${bin(h, p - i)}`, C(f, i) + C(h, p - i)), ex(bin(f + h, p), C(f + h, p)), ex(`${fracA(f, i)} \\times ${fracA(h, p - i)}`, A(f, i) * A(h, p - i)), ex(bin(f + h, i), C(f + h, i))],
    expl("deux choix sans ordre, faits l’un ET l’autre.", "combinaison dans chaque groupe, puis principe multiplicatif.", `$${bin(f, i)} \\times ${bin(h, p - i)} = ${nb(C(f, i) * C(h, p - i))}$.`, "on multiplie les deux coefficients binomiaux.")
  );
}

function genTournoi() {
  const t = randomInt(1, 3);
  const sport = pick(["de handball", "de basket", "d’e-sport", "de volley", "de rugby à 7", "d’échecs par équipes", "de football féminin", "de water-polo", "de hockey", "de badminton par équipes"]);
  if (t === 1) {
    const n = randomInt(6, 20);
    return court(`Dans un championnat ${sport} à ${n} équipes, chaque équipe reçoit chaque autre une fois (matchs aller et retour). Combien de matchs ?`, n * (n - 1), expl("un match aller-retour est un couple ordonné (équipe qui reçoit, équipe invitée).", `arrangements de $2$ parmi $${n}$ : $${n} \\times ${n - 1}$.`, `$${n} \\times ${n - 1} = ${n * (n - 1)}$.`, `il y a $${n * (n - 1)}$ matchs.`));
  }
  if (t === 2) {
    const m = randomInt(4, 8), g = randomInt(2, 4);
    const v = g * C(m, 2);
    return court(`Un tournoi ${sport} répartit les équipes en ${g} poules de ${m} ; dans chaque poule, chaque équipe affronte une fois chaque autre. Combien de matchs de poule en tout ?`, v, expl("dans une poule, un match est une paire d’équipes.", `$${bin(m, 2)}$ matchs par poule, pour $${g}$ poules.`, `$${g} \\times ${C(m, 2)} = ${v}$.`, `il y a $${v}$ matchs de poule.`));
  }
  const n = randomInt(6, 16);
  const v = C(n, 2) + 1;
  return court(`Un tournoi ${sport} réunit ${n} équipes : chacune affronte une fois chaque autre, puis les deux premières jouent une finale. Combien de matchs en tout ?`, v, expl("phase de groupe : paires d’équipes ; puis un match de plus.", `$${bin(n, 2)} + 1$.`, `$${C(n, 2)} + 1 = ${v}$.`, `il y a $${v}$ matchs.`));
}

function genMains() {
  const jeu = pick([32, 52]);
  const coul = jeu / 4; // cartes par couleur
  const k = randomInt(2, jeu === 32 ? 4 : 3);
  const debut = pick([`On tire simultanément ${k} cartes d’un jeu de ${jeu}`, `Une joueuse reçoit une main de ${k} cartes prises dans un jeu de ${jeu}`, `Un magicien fait choisir ${k} cartes (sans ordre) dans un jeu de ${jeu}`]);
  const t = randomInt(1, 5);
  if (t === 1) {
    const v = 4 * C(jeu - 4, k - 1);
    return court(`${debut} (dont 4 as). Combien de mains contiennent exactement un as ?`, v, expl("on choisit l’as, puis les autres cartes parmi les non-as.", `$${bin(4, 1)} \\times ${bin(jeu - 4, k - 1)}$.`, `$4 \\times ${nb(C(jeu - 4, k - 1))} = ${nb(v)}$.`, `il y a $${nb(v)}$ mains.`));
  }
  if (t === 2) {
    const v = C(jeu - 4, k);
    return court(`${debut} (dont 4 rois). Combien de mains ne contiennent aucun roi ?`, v, expl(`on choisit toutes les cartes parmi les ${jeu - 4} qui ne sont pas des rois.`, `$${bin(jeu - 4, k)}$.`, `$${bin(jeu - 4, k)} = ${nb(v)}$.`, `il y a $${nb(v)}$ mains.`));
  }
  if (t === 3) {
    const v = C(jeu, k) - C(jeu - coul, k);
    return court(`${debut} (dont ${coul} cœurs). Combien de mains contiennent au moins un cœur ?`, v, expl("« au moins un » : tout moins « aucun ».", `$${bin(jeu, k)} - ${bin(jeu - coul, k)}$.`, `$${nb(C(jeu, k))} - ${nb(C(jeu - coul, k))} = ${nb(v)}$.`, `il y a $${nb(v)}$ mains.`));
  }
  if (t === 4) {
    const v = C(jeu, k);
    return court(`${debut}. Combien de mains différentes ?`, v, expl("une main est un ensemble de cartes : l’ordre ne compte pas.", `$${bin(jeu, k)}$.`, `$${bin(jeu, k)} = \\dfrac{${prod(jeu, k)}}{${prod(k, k)}} = ${nb(v)}$.`, `il y a $${nb(v)}$ mains.`));
  }
  const kk = Math.max(k, 3);
  const debut2 = debut.replace(`${k} cartes`, `${kk} cartes`);
  const v = C(coul, 2) * C(jeu - coul, kk - 2);
  return court(`${debut2} (dont ${coul} piques). Combien de mains contiennent exactement 2 piques ?`, v, expl("on choisit les piques, puis le reste parmi les non-piques.", `$${bin(coul, 2)} \\times ${bin(jeu - coul, kk - 2)}$.`, `$${C(coul, 2)} \\times ${nb(C(jeu - coul, kk - 2))} = ${nb(v)}$.`, `il y a $${nb(v)}$ mains.`));
}

function genCodeContraint() {
  const t = randomInt(1, 5);
  if (t === 1) {
    const k = randomInt(3, 5);
    const v = 9 * A(9, k - 1);
    return court(
      pick([`Combien de nombres de ${k} chiffres tous différents peut-on écrire (le premier chiffre n’étant pas 0) ?`, `Un numéro de dossard a ${k} chiffres tous différents et ne commence pas par 0. Combien de dossards possibles ?`]),
      v,
      expl("on traite d’abord la position contrainte.", `$9$ choix pour le premier chiffre (pas 0), puis $\\dfrac{9!}{${10 - k}!}$ pour les ${k - 1} autres, distincts.`, `$9 \\times ${prod(9, k - 1)} = ${nb(v)}$.`, `il y en a $${nb(v)}$.`)
    );
  }
  if (t === 2) {
    const k = randomInt(3, 6);
    const v = 10 ** (k - 1) * 5;
    return court(
      pick([`Combien de codes de ${k} chiffres (répétitions permises, 0 autorisé en tête) se terminent par un chiffre pair ?`, `Un ticket de loterie porte ${k} chiffres (répétitions permises). Il est gagnant si le dernier chiffre est pair. Combien de tickets gagnants ?`]),
      v,
      expl("principe multiplicatif, position par position.", `$10$ choix pour chacun des ${k - 1} premiers chiffres, $5$ pour le dernier.`, `$10^{${k - 1}} \\times 5 = ${nb(v)}$.`, `il y en a $${nb(v)}$.`)
    );
  }
  if (t === 3) {
    const k = randomInt(3, 4);
    const v = 6 * A(25, k - 1);
    return court(`Combien de mots de ${k} lettres toutes différentes (26 lettres) commencent par une voyelle (A, E, I, O, U, Y) ?`, v, expl("position contrainte d’abord.", `$6$ voyelles possibles en tête, puis $\\dfrac{25!}{${26 - k}!}$ pour les lettres suivantes.`, `$6 \\times ${prod(25, k - 1)} = ${nb(v)}$.`, `il y en a $${nb(v)}$.`));
  }
  if (t === 4) {
    const n = randomInt(5, 9), p = randomInt(2, 3);
    const v = p * fact(n - 1);
    const qui = pick(["coureurs", "candidats", "groupes de musique", "orateurs", "nageuses"]);
    return court(
      `${n} ${qui} passent l’un après l’autre ; ${p} d’entre eux peuvent ouvrir la séance. Combien d’ordres de passage possibles ?`,
      v,
      expl("position contrainte d’abord, puis permutation du reste.", `$${p}$ choix pour le premier, puis $${n - 1}!$ ordres pour les autres.`, `$${p} \\times ${nb(fact(n - 1))} = ${nb(v)}$.`, `il y a $${nb(v)}$ ordres.`)
    );
  }
  const m = randomInt(6, 10), k = randomInt(3, 5);
  const v = A(m, k);
  const q = pick([
    `Une école doit placer ${k} examens différents sur ${m} demi-journées, au plus un examen par demi-journée. Combien de plannings possibles ?`,
    `Une salle de concert programme ${k} artistes différents sur ${m} soirées libres, au plus un par soirée. Combien de programmations ?`,
    `Une cheffe de chantier place ${k} livraisons différentes sur ${m} créneaux, au plus une par créneau. Combien de plannings ?`,
    `Un médecin place ${k} patients sur ${m} créneaux de rendez-vous, un patient par créneau. Combien de plannings ?`,
  ]);
  return court(q, v, expl("chaque élément reçoit un créneau différent : l’ordre compte, sans répétition.", `arrangement de $${k}$ parmi $${m}$.`, `$${prod(m, k)} = ${nb(v)}$.`, `il y a $${nb(v)}$ plannings.`));
}

function genMotPasseAuMoins() {
  const L = randomInt(3, 4);
  const v = 36 ** L - 26 ** L;
  return court(
    pick([
      `Un mot de passe compte ${L} caractères pris parmi les 26 lettres minuscules et les 10 chiffres (répétitions permises). Combien contiennent au moins un chiffre ?`,
      `Un site impose des codes de ${L} caractères (26 lettres ou 10 chiffres, répétitions permises) avec au moins un chiffre. Combien de codes acceptés ?`,
      `Une box internet génère des clés de ${L} caractères (26 lettres, 10 chiffres, répétitions permises). Combien de clés ne sont pas uniquement faites de lettres ?`,
    ]),
    v,
    expl("« au moins un chiffre » : tout moins « que des lettres ».", `total $36^{${L}}$ ; uniquement des lettres : $26^{${L}}$.`, `$${nb(36 ** L)} - ${nb(26 ** L)} = ${nb(v)}$.`, `il y en a $${nb(v)}$.`)
  );
}

export const MOTS_REP: Array<[string, number[]]> = [
  ["ANANAS", [3, 2, 1]],
  ["PAPA", [2, 2]],
  ["RADAR", [2, 2, 1]],
  ["KAYAK", [2, 2, 1]],
  ["BANANE", [1, 2, 2, 1]],
  ["ELEVE", [3, 1, 1]],
  ["COCO", [2, 2]],
  ["MAMAN", [2, 2, 1]],
  ["TOMATE", [2, 1, 1, 1, 1]],
  ["CARACAS", [2, 3, 1, 1]],
];

function genAnagrammesRep() {
  const [mot, rep] = pick(MOTS_REP);
  const n = mot.length;
  let v = fact(n);
  for (const r of rep) v /= fact(r);
  const denom = rep.filter((r) => r > 1).map((r) => `${r}!`).join(" \\times ");
  return court(
    pick([`Combien d’anagrammes (avec ou sans sens) peut-on écrire avec les lettres du mot « ${mot} » ?`, `Combien de mots différents obtient-on en mélangeant les ${n} lettres de « ${mot} » ?`]),
    v,
    expl("des lettres identiques échangées ne donnent pas un nouveau mot.", `on place les lettres répétées en choisissant leurs positions (combinaisons), ou on divise $${n}!$ par les permutations des lettres identiques.`, `$\\dfrac{${n}!}{${denom}} = ${nb(v)}$.`, `il y a $${nb(v)}$ anagrammes.`)
  );
}

function genDefiFormule() {
  return genFormuleSit(["arrangement", "combinaison", "liste"])();
}

/* ---------- Gabarits et fusion ---------- */

function tpl(microId: string, difficulty: number, rang: number, generate: () => TutorGeneratedQuestionV4, hint: string): TutorBankItemV4 {
  return {
    kind: "template",
    id: `terminale_spe_denbr_renfort_${microId}_${difficulty}_${rang}`,
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["terminale-spe", "denombrement", "renfort", "template"],
    generate,
  } as TutorBankItemV4;
}

const H_MOD = "Ordre ? Répétitions ? Ces deux questions donnent le modèle : nᵏ, n!/(n−k)!, n! ou C(n,k).";
const H_FACT = "n! = n × (n − 1) × … × 2 × 1.";
const H_PS = "ET (choix successifs) : on multiplie ; OU (cas disjoints) : on additionne.";
const H_LISTE = "Avec répétitions : n choix pour chacune des k positions, soit nᵏ.";
const H_COMP = "« Au moins un » : on compte tout, puis on enlève « aucun ».";
const H_AC = "L’ordre compte : arrangement n!/(n−k)!. L’ordre ne compte pas : combinaison C(n,k).";
const H_BIN = "C(n,k) = n!/(k!(n−k)!) ; symétrie C(n,k) = C(n,n−k).";
const H_PAS = "Relation de Pascal : C(n,k) = C(n−1,k−1) + C(n−1,k).";
const H_DEFI = "Découpe : qui choisit-on, l’ordre compte-t-il, ET ou OU ?";

type Ligne = [string, number, () => TutorGeneratedQuestionV4, string];

const R = "denombrement_reconnaitre";
const PS = "denombrement_produit_somme";
const AC = "denombrement_arrangement_combinaison";
const CO = "denombrement_coefficient_binomial";
const PA = "denombrement_pascal";
const DF = "denombrement_defi";

const TOUS: Modele[] = ["liste", "arrangement", "permutation", "combinaison"];
const H_PERM = "Ranger n objets distincts : n! façons.";
const H_PARTIES = "Chaque élément : pris ou non (2 choix), soit 2ⁿ parties.";
const H_RAPPORT = "Arrangements = combinaisons × k!.";
const H_CHEMIN = "Un chemin = choisir la place des pas d’un type parmi tous les pas.";

const LIGNES: Ligne[] = [
  [R, 1, genFactorielle(3, 5), H_FACT],
  [R, 1, genOrdreCompte, H_MOD],
  [R, 1, genModele, H_MOD],
  [R, 1, genPermutation(3, 5), H_PERM],
  [R, 2, genFactorielle(4, 7), H_FACT],
  [R, 2, genRepetition, H_MOD],
  [R, 2, genModele, H_MOD],
  [R, 2, genPermutation(4, 7), H_PERM],
  [R, 2, genOrdreCompte, H_MOD],
  [R, 3, genQuotientFact, H_FACT],
  [R, 3, genPermutation(5, 8), H_PERM],
  [R, 3, genModele, H_MOD],
  [R, 3, genCalculSit(TOUS), H_MOD],
  [R, 3, genRepetition, H_MOD],
  [R, 4, genFactSuivante, H_FACT],
  [R, 4, genFormuleSit(TOUS), H_MOD],
  [R, 4, genAnagrammes, H_FACT],
  [R, 4, genCalculSit(TOUS), H_MOD],
  [R, 4, genQuotientFact, H_FACT],
  [R, 5, genAnagrammes, H_FACT],
  [R, 5, genCoteACote, H_FACT],
  [R, 5, genFormuleSit(TOUS), H_MOD],
  [R, 5, genFactSuivante, H_FACT],

  [PS, 2, genProduit2, H_PS],
  [PS, 2, genSomme2, H_PS],
  [PS, 2, genPrincipe, H_PS],
  [PS, 2, genProduit3, H_PS],
  [PS, 3, genProduit3, H_PS],
  [PS, 3, genCalculSit(["liste"]), H_LISTE],
  [PS, 3, genPrincipe, H_PS],
  [PS, 3, genPrincipe3, H_PS],
  [PS, 3, genMixte, H_PS],
  [PS, 4, genMixte, H_PS],
  [PS, 4, genParties, H_PARTIES],
  [PS, 4, genGrandeListe, H_LISTE],
  [PS, 4, genCalculSit(["liste"]), H_LISTE],
  [PS, 4, genAuMoinsUn, H_COMP],
  [PS, 5, genAuMoinsUn, H_COMP],
  [PS, 5, genPartiesNonVides, "2ⁿ parties en tout ; on retire celles qui ne conviennent pas."],
  [PS, 5, genMixte, H_PS],
  [PS, 5, genGrandeListe, H_LISTE],
  [PS, 5, genParties, H_PARTIES],

  [AC, 2, genTypeChoix, H_AC],
  [AC, 2, genArrangementK2, H_AC],
  [AC, 2, genOrdreCompte, H_AC],
  [AC, 2, genChoixOrdre, H_AC],
  [AC, 3, genCalculSit(["arrangement"]), H_AC],
  [AC, 3, genCalculSit(["combinaison"]), H_AC],
  [AC, 3, genTypeChoix, H_AC],
  [AC, 3, genFormuleSit(["arrangement", "combinaison"]), H_AC],
  [AC, 3, genChoixOrdre, H_AC],
  [AC, 4, genRapport, H_RAPPORT],
  [AC, 4, genFormuleSit(["arrangement", "combinaison", "liste"]), H_AC],
  [AC, 4, genChoixOrdreQCM, H_AC],
  [AC, 4, genCalculSit(["arrangement", "combinaison"]), H_AC],
  [AC, 5, genBureauMixte, H_AC],
  [AC, 5, genCompareAC, H_RAPPORT],
  [AC, 5, genRapport, H_RAPPORT],
  [AC, 5, genChoixOrdreQCM, H_AC],
  [AC, 5, genComiteMixte, H_AC],

  [CO, 2, genBinomSimple, H_BIN],
  [CO, 2, genBinomEcriture, H_BIN],
  [CO, 2, genBinomMoyen, H_BIN],
  [CO, 2, genCalculSit(["combinaison"]), H_BIN],
  [CO, 3, genSymetrie, H_BIN],
  [CO, 3, genBinomMoyen, H_BIN],
  [CO, 3, genCalculSit(["combinaison"]), H_BIN],
  [CO, 3, genBinomValeurQCM, H_BIN],
  [CO, 3, genSymetrieContexte, H_BIN],
  [CO, 4, genBinomGrand, H_BIN],
  [CO, 4, genSymetrieContexte, H_BIN],
  [CO, 4, genBinomValeurQCM, H_BIN],
  [CO, 4, genSymetrie, H_BIN],
  [CO, 4, genBinomEcriture, H_BIN],
  [CO, 5, genTrouverN, "C(n,2) = n(n − 1)/2."],
  [CO, 5, genSommeCoefs, "La somme des C(n,k) compte toutes les parties : 2ⁿ."],
  [CO, 5, genBinomGrand, H_BIN],
  [CO, 5, genBernoulliChemins, "Choisir la place des k succès parmi n épreuves."],
  [CO, 5, genBinomValeurQCM, H_BIN],
  [CO, 5, genSymetrieContexte, H_BIN],

  [PA, 2, genPascalCase, H_PAS],
  [PA, 2, genPascalSommeDonnee, H_PAS],
  [PA, 2, genPascalGroupe, H_PAS],
  [PA, 2, genSommeLigne, "La somme de la ligne n vaut 2ⁿ."],
  [PA, 2, genLigneQCM, H_PAS],
  [PA, 3, genPascalCase, H_PAS],
  [PA, 3, genPascalRelationQCM, H_PAS],
  [PA, 3, genPascalGroupe, H_PAS],
  [PA, 3, genLigneQCM, H_PAS],
  [PA, 4, genPascalInverse, H_PAS],
  [PA, 4, genLigneQCM, H_PAS],
  [PA, 4, genSommeLigne, "La somme de la ligne n vaut 2ⁿ."],
  [PA, 4, genPascalRelationQCM, H_PAS],
  [PA, 4, genChemins, H_CHEMIN],
  [PA, 5, genChemins, H_CHEMIN],
  [PA, 5, genPascalSommeQCM, H_PAS],
  [PA, 5, genBernoulliChemins, "Choisir la place des k succès parmi n épreuves."],
  [PA, 5, genPascalInverse, H_PAS],
  [PA, 5, genPascalRelationQCM, H_PAS],
  [PA, 5, genSommeCoefs, "La somme de la ligne n du triangle vaut 2ⁿ."],

  [DF, 4, genComiteMixte, H_DEFI],
  [DF, 4, genTournoi, H_DEFI],
  [DF, 4, genMains, H_DEFI],
  [DF, 4, genCodeContraint, H_DEFI],
  [DF, 4, genComiteQCM, H_DEFI],
  [DF, 4, genBureauMixte, H_DEFI],
  [DF, 5, genComiteAuMoins, H_COMP],
  [DF, 5, genMotPasseAuMoins, H_COMP],
  [DF, 5, genCoteACote, H_DEFI],
  [DF, 5, genAnagrammesRep, H_DEFI],
  [DF, 5, genMains, H_DEFI],
  [DF, 5, genDefiFormule, H_DEFI],
  [DF, 5, genChemins, H_CHEMIN],
];

export const renfortDenombrement: TutorBankItemV4[] = (() => {
  const rangs = new Map<string, number>();
  return LIGNES.map(([micro, d, g, h]) => {
    const cle = `${micro}_${d}`;
    const r = (rangs.get(cle) ?? 0) + 1;
    rangs.set(cle, r);
    return tpl(micro, d, r, g, h);
  });
})();
