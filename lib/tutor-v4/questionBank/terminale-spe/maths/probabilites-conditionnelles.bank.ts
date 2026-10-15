// lib/tutor-v4/questionBank/terminale-spe/maths/probabilites-conditionnelles.bank.ts
//
// Notion : Probabilités conditionnelles (probabilite_conditionnelle)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   proba_conditionnelle_arbre    — Construire ou lire un arbre pondéré
//   proba_conditionnelle_formule  — Calculer une probabilité conditionnelle
//   proba_totales                 — Formule des probabilités totales
//   proba_inverse_bayes           — Inverser une probabilité conditionnelle
//   proba_conditionnelle_defi     — Exercice type bac
//
// Conventions :
// - Notation française : P_A(B) = probabilité de B sachant A = P(A∩B) / P(A).
// - Les probabilités étant des décimaux (pénibles à taper), on utilise des QCM
//   (règle « écriture maths → QCM »). Décimaux en LaTeX : $0{,}6$.
// - Un tableau croisé d'effectifs (canvas "probabilites" variant "tableau")
//   illustre la lecture des probabilités.

import type {
  TutorBankItemV4,
  CanvasFigure,
  DifficultyLevel,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

// Tableau croisé : A∩B = 30, total A = 50, total B = 40, total = 100.
//   P_A(B) = 30/50 = 0,6 ; P(A∩B) = 0,3 ; P(B) = 0,4 ; P_B(A) = 30/40 = 0,75.
const tableauEffectifsCanvas: CanvasFigure = {
  kind: "probabilites",
  variant: "tableau",
  tableau: {
    entetes: ["", "B", "B̄", "Total"],
    lignes: [
      ["A", "30", "20", "50"],
      ["Ā", "10", "40", "50"],
      ["Total", "40", "60", "100"],
    ],
    casesSurlignees: [[0, 1]],
  },
};

// Arbre pondéré standard :
//   P(A)=0,6 ; P_A(B)=0,5 ; P(Ā)=0,4 ; P_Ā(B)=0,25.
//   ⇒ P(A∩B)=0,3 ; P(Ā∩B)=0,1 ; P(B)=0,4 ; P_B(A)=0,3/0,4=0,75.
const arbreABCanvas: CanvasFigure = {
  kind: "arbre_proba",
  titre: "Arbre pondéré",
  racineEnfants: [
    {
      label: "A",
      proba: "0,6",
      enfants: [
        { label: "B", proba: "0,5" },
        { label: "B̄", proba: "0,5" },
      ],
    },
    {
      label: "Ā",
      proba: "0,4",
      enfants: [
        { label: "B", proba: "0,25" },
        { label: "B̄", proba: "0,75" },
      ],
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   ⛔⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT », LES PROBABILITÉS
   CONDITIONNELLES DE TERMINALE SPÉ.
   Mesuré avant (scripts/mesurer-squelettes-coach.ts terminale-spe
   probabilite_conditionnelle) : les 5 micros sous le seuil, 5 à 11
   squelettes, 14 à 19 répétitions sur 20. Trois gabarits seulement, qui
   tiraient UN chiffre dans une phrase fixe.
   Même méthode que la 3e (dd5e9f75) et la première (même jour) : chaque
   gabarit croise
     · une SITUATION : trente-deux expériences en deux temps (arbre à deux
       niveaux : car jaune et pluie, Grand Raid, test de la dengue, letchis,
       tombola, usines, sondages…), douze partitions en trois (trois
       fournisseurs, trois lignes de car…), des dépistages (faux positifs),
       des tirages sans remise et des dés truqués ;
     · une TOURNURE (données en pourcentages, en notation, ou sur l'arbre ;
       question « sachant que », « parmi », notation) ;
     · des nombres TIRÉS, calculés exactement en entiers (pourcentages) :
       les réponses sont acceptées en fraction, en décimal et en pourcentage.
═══════════════════════════════════════════════════════════════════════ */

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
const ri = randomInt;
/** Écriture française d'un nombre (virgule), arrondie au millionième. */
function fr(n: number): string {
  return String(Math.round(n * 1e6) / 1e6).replace(".", ",");
}
/** Le même, prêt pour LaTeX : « 0{,}35 ». */
const dl = (n: number) => fr(n).replace(",", "{,}");
const pct = (n: number) => `$${dl(n)}\\,\\%$`;
function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}
function red(a: number, b: number): [number, number] {
  const g = pgcd(a, b) || 1;
  return [a / g, b / g];
}
function decimale(a: number, b: number): string | null {
  let d = red(a, b)[1];
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1 ? fr(a / b) : null;
}
/** Bonne réponse + trois leurres DISTINCTS au texte. */
function qcm(correct: string, leurres: readonly string[]): string[] {
  const d = shuffle([...new Set(leurres)].filter((w) => w !== correct)).slice(0, 3);
  return shuffle([correct, ...d]);
}
/** Écritures acceptées d'un décimal : 0,15 ; 0.15 ; 15 % ; 3/20. */
function ecrDec(x: number): string[] {
  const r = Math.round(x * 1e6) / 1e6;
  let k = 0;
  while (k < 6 && Math.abs(Math.round(r * 10 ** k) - r * 10 ** k) > 1e-9) k++;
  const [n, d] = red(Math.round(r * 10 ** k), 10 ** k);
  const pc = Math.round(r * 100 * 1e6) / 1e6;
  return [...new Set([fr(r), String(r), `${fr(pc)} %`, `${fr(pc)}%`, `${n}/${d}`])];
}
/** Écritures acceptées de a/b : brute, irréductible, et décimal s'il tombe juste. */
function ecritures(a: number, b: number): string[] {
  const [n, d] = red(a, b);
  const out = [`${a}/${b}`, `${n}/${d}`];
  const dec = decimale(a, b);
  if (dec !== null) out.push(...ecrDec(a / b));
  return [...new Set(out)];
}
/** Écritures acceptées d'une valeur arrondie au centième (+ la fraction exacte a/b). */
function ecrArrondi(a: number, b: number, chiffres = 2): string[] {
  const m = 10 ** chiffres;
  const v = Math.round((m * a) / b) / m;
  const out = [fr(v), String(v), v.toFixed(chiffres).replace(".", ","), v.toFixed(chiffres), `${fr(v * 100)} %`, `${fr(v * 100)}%`];
  return [...new Set([...out, ...ecritures(a, b)])];
}
const bar = (L: string) => `\\overline{${L}}`;
/** a/b tombe-t-il juste au centième ? (sinon on écrit « ≈ ») */
const exact = (a: number, b: number) => (100 * a) % b === 0;
/** La fraction irréductible de a/b (+ « = décimal » s'il tombe juste), à mettre entre $…$. */
function simpl(a: number, b: number): string {
  const [n, d] = red(a, b);
  if (d === 1) return String(n);
  const dec = decimale(a, b);
  return `\\dfrac{${n}}{${d}}` + (dec !== null ? ` = ${dec.replace(",", "{,}")}` : "");
}

/* ── Les expériences en deux temps : un caractère A (1er niveau), un B (2e) ──
   Un caractère s'écrit : v « a suivi le stage » ; sj « ait suivi le stage » ;
   vp « ont suivi le stage » ; s1 / p après le nom, au singulier / pluriel :
   « un élève ayant suivi le stage » / « les élèves ayant suivi le stage ». */
type Carac = { v: string; sj: string; vp: string; s1: string; p: string };
const etre = (s1: string, p: string): Carac => ({ v: `est ${s1}`, sj: `soit ${s1}`, vp: `sont ${p}`, s1, p });
const agit = (v: string, sj: string, vp: string, s1: string, p: string): Carac => ({ v, sj, vp, s1, p });

type Situ = { intro: string; f: boolean; nom: string; noms: string; L: [string, string]; A: Carac; nA: Carac; B: Carac; nB: Carac };

const SITUS: readonly Situ[] = [
  { intro: "Avant le bac blanc, un lycée a proposé un stage de révision pendant les vacances.", f: false, nom: "élève", noms: "élèves", L: ["R", "M"],
    A: agit("a suivi le stage", "ait suivi le stage", "ont suivi le stage", "ayant suivi le stage", "ayant suivi le stage"),
    nA: agit("n'a pas suivi le stage", "n'ait pas suivi le stage", "n'ont pas suivi le stage", "n'ayant pas suivi le stage", "n'ayant pas suivi le stage"),
    B: agit("a eu la moyenne au bac blanc", "ait eu la moyenne au bac blanc", "ont eu la moyenne au bac blanc", "ayant eu la moyenne", "ayant eu la moyenne"),
    nB: agit("n'a pas eu la moyenne", "n'ait pas eu la moyenne", "n'ont pas eu la moyenne", "n'ayant pas eu la moyenne", "n'ayant pas eu la moyenne") },
  { intro: "La régie du car jaune mène une enquête auprès de ses usagers.", f: false, nom: "usager", noms: "usagers", L: ["A", "S"],
    A: etre("abonné", "abonnés"), nA: etre("non abonné", "non abonnés"),
    B: etre("satisfait des horaires", "satisfaits des horaires"), nB: etre("insatisfait des horaires", "insatisfaits des horaires") },
  { intro: "Après le Grand Raid, on fait le bilan des coureurs inscrits.", f: false, nom: "coureur", noms: "coureurs", L: ["L", "F"],
    A: etre("licencié dans un club", "licenciés dans un club"), nA: etre("non licencié", "non licenciés"),
    B: agit("a terminé la course", "ait terminé la course", "ont terminé la course", "ayant terminé la course", "ayant terminé la course"),
    nB: agit("a abandonné", "ait abandonné", "ont abandonné", "ayant abandonné", "ayant abandonné") },
  { intro: "À La Réunion, un laboratoire évalue un test rapide de la dengue.", f: true, nom: "personne", noms: "personnes", L: ["M", "T"],
    A: etre("malade", "malades"), nA: etre("non malade", "non malades"),
    B: etre("testée positive", "testées positives"), nB: etre("testée négative", "testées négatives") },
  { intro: "Dans une usine, une ancienne et une nouvelle machine fabriquent les mêmes pièces.", f: true, nom: "pièce", noms: "pièces", L: ["N", "D"],
    A: etre("fabriquée par la nouvelle machine", "fabriquées par la nouvelle machine"), nA: etre("fabriquée par l'ancienne machine", "fabriquées par l'ancienne machine"),
    B: etre("défectueuse", "défectueuses"), nB: etre("conforme", "conformes") },
  { intro: "Une coopérative reçoit des caisses de letchis de Saint-André et de Sainte-Marie.", f: true, nom: "caisse", noms: "caisses", L: ["S", "C"],
    A: etre("venue de Saint-André", "venues de Saint-André"), nA: etre("venue de Sainte-Marie", "venues de Sainte-Marie"),
    B: etre("classée en premier choix", "classées en premier choix"), nB: etre("classée en second choix", "classées en second choix") },
  { intro: "Au marché forain de Saint-Paul, un marchand trie sa récolte de mangues.", f: true, nom: "mangue", noms: "mangues", L: ["J", "R"],
    A: etre("de la variété José", "de la variété José"), nA: etre("de la variété Américaine", "de la variété Américaine"),
    B: etre("bien mûre", "bien mûres"), nB: etre("encore verte", "encore vertes") },
  { intro: "Une compagnie aérienne qui relie La Réunion à la métropole interroge ses clients après leur vol.", f: false, nom: "client", noms: "clients", L: ["I", "S"],
    A: agit("a acheté son billet sur internet", "ait acheté son billet sur internet", "ont acheté leur billet sur internet", "ayant acheté son billet sur internet", "ayant acheté leur billet sur internet"),
    nA: agit("a acheté son billet en agence", "ait acheté son billet en agence", "ont acheté leur billet en agence", "ayant acheté son billet en agence", "ayant acheté leur billet en agence"),
    B: etre("satisfait", "satisfaits"), nB: etre("non satisfait", "non satisfaits") },
  { intro: "À Cilaos, l'office de tourisme interroge les randonneurs de passage.", f: false, nom: "randonneur", noms: "randonneurs", L: ["G", "N"],
    A: etre("logé en gîte", "logés en gîte"), nA: etre("logé à l'hôtel", "logés à l'hôtel"),
    B: etre("monté au Piton des Neiges", "montés au Piton des Neiges"), nB: etre("resté dans le cirque", "restés dans le cirque") },
  { intro: "À la fin d'un concert de maloya, les organisateurs interrogent les spectateurs.", f: false, nom: "spectateur", noms: "spectateurs", L: ["V", "J"],
    A: etre("venu en car", "venus en car"), nA: etre("venu en voiture", "venus en voiture"),
    B: etre("âgé de moins de 25 ans", "âgés de moins de 25 ans"), nB: etre("âgé de 25 ans ou plus", "âgés de 25 ans ou plus") },
  { intro: "À la cantine du lycée, chaque demi-pensionnaire choisit le cari poulet ou le rougail saucisse.", f: false, nom: "élève", noms: "élèves", L: ["C", "D"],
    A: agit("a choisi le cari poulet", "ait choisi le cari poulet", "ont choisi le cari poulet", "ayant choisi le cari poulet", "ayant choisi le cari poulet"),
    nA: agit("a choisi le rougail saucisse", "ait choisi le rougail saucisse", "ont choisi le rougail saucisse", "ayant choisi le rougail saucisse", "ayant choisi le rougail saucisse"),
    B: agit("a pris un dessert", "ait pris un dessert", "ont pris un dessert", "ayant pris un dessert", "ayant pris un dessert"),
    nB: agit("n'a pas pris de dessert", "n'ait pas pris de dessert", "n'ont pas pris de dessert", "n'ayant pas pris de dessert", "n'ayant pas pris de dessert") },
  { intro: "Lors d'un tournoi de dominos à Saint-Pierre, on relève le résultat de la première partie de chaque joueur.", f: false, nom: "joueur", noms: "joueurs", L: ["D", "G"],
    A: etre("débutant", "débutants"), nA: etre("confirmé", "confirmés"),
    B: agit("a gagné sa première partie", "ait gagné sa première partie", "ont gagné leur première partie", "ayant gagné sa première partie", "ayant gagné leur première partie"),
    nB: agit("a perdu sa première partie", "ait perdu sa première partie", "ont perdu leur première partie", "ayant perdu sa première partie", "ayant perdu leur première partie") },
  { intro: "Un vendeur de téléphones fait le bilan des ventes de l'année.", f: false, nom: "téléphone", noms: "téléphones", L: ["L", "D"],
    A: etre("vendu en ligne", "vendus en ligne"), nA: etre("vendu en magasin", "vendus en magasin"),
    B: etre("tombé en panne dans l'année", "tombés en panne dans l'année"), nB: etre("resté sans panne", "restés sans panne") },
  { intro: "Un planteur de vanille de Sainte-Rose fait le point sur ses pieds de vanille.", f: false, nom: "pied de vanille", noms: "pieds de vanille", L: ["O", "F"],
    A: etre("cultivé à l'ombre", "cultivés à l'ombre"), nA: etre("cultivé au soleil", "cultivés au soleil"),
    B: agit("a fleuri cette année", "ait fleuri cette année", "ont fleuri cette année", "ayant fleuri cette année", "ayant fleuri cette année"),
    nB: agit("n'a pas fleuri", "n'ait pas fleuri", "n'ont pas fleuri", "n'ayant pas fleuri", "n'ayant pas fleuri") },
  { intro: "Un après-midi, à la plage de l'Ermitage, on interroge les baigneurs.", f: false, nom: "baigneur", noms: "baigneurs", L: ["C", "S"],
    A: agit("a mis de la crème solaire", "ait mis de la crème solaire", "ont mis de la crème solaire", "ayant mis de la crème solaire", "ayant mis de la crème solaire"),
    nA: agit("n'a pas mis de crème solaire", "n'ait pas mis de crème solaire", "n'ont pas mis de crème solaire", "n'ayant pas mis de crème", "n'ayant pas mis de crème"),
    B: agit("a attrapé un coup de soleil", "ait attrapé un coup de soleil", "ont attrapé un coup de soleil", "ayant attrapé un coup de soleil", "ayant attrapé un coup de soleil"),
    nB: agit("n'a pas attrapé de coup de soleil", "n'ait pas attrapé de coup de soleil", "n'ont pas attrapé de coup de soleil", "épargné par le soleil", "épargnés par le soleil") },
  { intro: "Une messagerie analyse les courriels reçus par ses utilisateurs.", f: false, nom: "courriel", noms: "courriels", L: ["S", "K"],
    A: etre("indésirable", "indésirables"), nA: etre("légitime", "légitimes"),
    B: agit("contient un lien", "contienne un lien", "contiennent un lien", "contenant un lien", "contenant un lien"),
    nB: agit("ne contient aucun lien", "ne contienne aucun lien", "ne contiennent aucun lien", "sans lien", "sans lien") },
  { intro: "L'office de tourisme interroge les touristes qui quittent La Réunion.", f: false, nom: "touriste", noms: "touristes", L: ["M", "N"],
    A: etre("venu de métropole", "venus de métropole"), nA: etre("venu de l'étranger", "venus de l'étranger"),
    B: agit("a fait de la plongée", "ait fait de la plongée", "ont fait de la plongée", "ayant fait de la plongée", "ayant fait de la plongée"),
    nB: agit("n'a pas fait de plongée", "n'ait pas fait de plongée", "n'ont pas fait de plongée", "n'ayant pas fait de plongée", "n'ayant pas fait de plongée") },
  { intro: "Un refuge pour animaux de Saint-Louis fait le bilan des chiens accueillis dans l'année.", f: false, nom: "chien", noms: "chiens", L: ["J", "A"],
    A: etre("arrivé chiot", "arrivés chiots"), nA: etre("arrivé adulte", "arrivés adultes"),
    B: etre("adopté dans l'année", "adoptés dans l'année"), nB: etre("encore au refuge", "encore au refuge") },
  { intro: "Un loueur de vélos de Saint-Gilles fait le bilan de ses locations.", f: true, nom: "location", noms: "locations", L: ["E", "R"],
    A: etre("d'un vélo électrique", "de vélos électriques"), nA: etre("d'un vélo classique", "de vélos classiques"),
    B: etre("rendue en retard", "rendues en retard"), nB: etre("rendue à l'heure", "rendues à l'heure") },
  { intro: "À la kermesse du lycée, on fait le bilan de la tombola.", f: false, nom: "participant", noms: "participants", L: ["U", "G"],
    A: agit("a acheté un seul billet", "ait acheté un seul billet", "ont acheté un seul billet", "ayant acheté un seul billet", "ayant acheté un seul billet"),
    nA: agit("a acheté plusieurs billets", "ait acheté plusieurs billets", "ont acheté plusieurs billets", "ayant acheté plusieurs billets", "ayant acheté plusieurs billets"),
    B: agit("a gagné un lot", "ait gagné un lot", "ont gagné un lot", "ayant gagné un lot", "ayant gagné un lot"),
    nB: agit("n'a rien gagné", "n'ait rien gagné", "n'ont rien gagné", "n'ayant rien gagné", "n'ayant rien gagné") },
  { intro: "Dans un lycée, on interroge les élèves de terminale sur le permis de conduire.", f: false, nom: "élève", noms: "élèves", L: ["J", "C"],
    A: etre("majeur", "majeurs"), nA: etre("mineur", "mineurs"),
    B: agit("a déjà le code", "ait déjà le code", "ont déjà le code", "ayant déjà le code", "ayant déjà le code"),
    nB: agit("n'a pas encore le code", "n'ait pas encore le code", "n'ont pas encore le code", "n'ayant pas encore le code", "n'ayant pas encore le code") },
  { intro: "Dans un jardin créole, on a semé des graines de piment et des graines de tomate.", f: true, nom: "graine", noms: "graines", L: ["I", "G"],
    A: etre("de piment", "de piment"), nA: etre("de tomate", "de tomate"),
    B: agit("a germé", "ait germé", "ont germé", "ayant germé", "ayant germé"),
    nB: agit("n'a pas germé", "n'ait pas germé", "n'ont pas germé", "n'ayant pas germé", "n'ayant pas germé") },
  { intro: "Un centre de contrôle technique fait le bilan des voitures contrôlées dans le mois.", f: true, nom: "voiture", noms: "voitures", L: ["E", "V"],
    A: etre("à essence", "à essence"), nA: etre("diesel", "diesel"),
    B: etre("validée du premier coup", "validées du premier coup"), nB: etre("recalée", "recalées") },
  { intro: "Au Pas de Bellecombe, on interroge les visiteurs du Piton de la Fournaise.", f: false, nom: "visiteur", noms: "visiteurs", L: ["H", "C"],
    A: etre("venu le matin", "venus le matin"), nA: etre("venu l'après-midi", "venus l'après-midi"),
    B: agit("a vu le cratère dégagé", "ait vu le cratère dégagé", "ont vu le cratère dégagé", "ayant vu le cratère dégagé", "ayant vu le cratère dégagé"),
    nB: agit("a trouvé le cratère dans les nuages", "ait trouvé le cratère dans les nuages", "ont trouvé le cratère dans les nuages", "ayant trouvé les nuages", "ayant trouvé les nuages") },
  { intro: "Un snack de Saint-Denis relève les commandes de ses clients pendant une semaine.", f: false, nom: "client", noms: "clients", L: ["B", "K"],
    A: agit("a commandé des bouchons", "ait commandé des bouchons", "ont commandé des bouchons", "ayant commandé des bouchons", "ayant commandé des bouchons"),
    nA: agit("a commandé un sandwich américain", "ait commandé un sandwich américain", "ont commandé un sandwich américain", "ayant commandé un américain", "ayant commandé un américain"),
    B: agit("a payé par carte", "ait payé par carte", "ont payé par carte", "ayant payé par carte", "ayant payé par carte"),
    nB: agit("a payé en espèces", "ait payé en espèces", "ont payé en espèces", "ayant payé en espèces", "ayant payé en espèces") },
  { intro: "L'infirmière d'un lycée interroge les élèves sur leur sommeil.", f: false, nom: "élève", noms: "élèves", L: ["E", "C"],
    A: agit("a un écran dans sa chambre", "ait un écran dans sa chambre", "ont un écran dans leur chambre", "ayant un écran dans sa chambre", "ayant un écran dans leur chambre"),
    nA: agit("n'a pas d'écran dans sa chambre", "n'ait pas d'écran dans sa chambre", "n'ont pas d'écran dans leur chambre", "sans écran dans sa chambre", "sans écran dans leur chambre"),
    B: agit("se couche avant 23 h", "se couche avant 23 h", "se couchent avant 23 h", "se couchant avant 23 h", "se couchant avant 23 h"),
    nB: agit("se couche après 23 h", "se couche après 23 h", "se couchent après 23 h", "se couchant après 23 h", "se couchant après 23 h") },
  { intro: "Une association organise des sorties en mer au large de Saint-Leu pour observer les baleines.", f: true, nom: "sortie", noms: "sorties", L: ["M", "B"],
    A: etre("partie le matin", "parties le matin"), nA: etre("partie l'après-midi", "parties l'après-midi"),
    B: agit("a permis de voir une baleine", "ait permis de voir une baleine", "ont permis de voir une baleine", "avec baleine", "avec baleine"),
    nB: agit("n'a permis de voir aucune baleine", "n'ait permis de voir aucune baleine", "n'ont permis de voir aucune baleine", "sans baleine", "sans baleine") },
  { intro: "Un éleveur de Bras-Panon trie les œufs de sa ferme.", f: false, nom: "œuf", noms: "œufs", L: ["A", "G"],
    A: etre("pondu par une poule élevée en plein air", "pondus par des poules élevées en plein air"), nA: etre("pondu par une poule élevée en bâtiment", "pondus par des poules élevées en bâtiment"),
    B: etre("de gros calibre", "de gros calibre"), nB: etre("de petit calibre", "de petit calibre") },
  { intro: "Un magasin vend des ampoules de deux marques.", f: true, nom: "ampoule", noms: "ampoules", L: ["E", "D"],
    A: etre("de la marque Éclat", "de la marque Éclat"), nA: etre("de la marque Lumina", "de la marque Lumina"),
    B: agit("dure plus de cinq ans", "dure plus de cinq ans", "durent plus de cinq ans", "durant plus de cinq ans", "durant plus de cinq ans"),
    nB: agit("grille avant cinq ans", "grille avant cinq ans", "grillent avant cinq ans", "grillée avant cinq ans", "grillées avant cinq ans") },
  { intro: "Un éditeur de jeux vidéo étudie les joueurs de son dernier jeu.", f: false, nom: "joueur", noms: "joueurs", L: ["C", "F"],
    A: agit("joue sur console", "joue sur console", "jouent sur console", "jouant sur console", "jouant sur console"),
    nA: agit("joue sur ordinateur", "joue sur ordinateur", "jouent sur ordinateur", "jouant sur ordinateur", "jouant sur ordinateur"),
    B: agit("a fini le jeu", "ait fini le jeu", "ont fini le jeu", "ayant fini le jeu", "ayant fini le jeu"),
    nB: agit("n'a pas fini le jeu", "n'ait pas fini le jeu", "n'ont pas fini le jeu", "n'ayant pas fini le jeu", "n'ayant pas fini le jeu") },
  { intro: "Un lycée fait le bilan des résultats au baccalauréat de ses élèves.", f: false, nom: "élève", noms: "élèves", L: ["G", "M"],
    A: etre("en voie générale", "en voie générale"), nA: etre("en voie technologique", "en voie technologique"),
    B: agit("a obtenu une mention", "ait obtenu une mention", "ont obtenu une mention", "ayant obtenu une mention", "ayant obtenu une mention"),
    nB: agit("n'a pas obtenu de mention", "n'ait pas obtenu de mention", "n'ont pas obtenu de mention", "sans mention", "sans mention") },
  { intro: "Une salle de sport du Tampon étudie ses abonnés en fin d'année.", f: false, nom: "abonné", noms: "abonnés", L: ["C", "R"],
    A: agit("a pris l'option coaching", "ait pris l'option coaching", "ont pris l'option coaching", "ayant pris l'option coaching", "ayant pris l'option coaching"),
    nA: agit("n'a pas pris l'option coaching", "n'ait pas pris l'option coaching", "n'ont pas pris l'option coaching", "sans coaching", "sans coaching"),
    B: agit("renouvelle son abonnement", "renouvelle son abonnement", "renouvellent leur abonnement", "renouvelant son abonnement", "renouvelant leur abonnement"),
    nB: agit("ne renouvelle pas son abonnement", "ne renouvelle pas son abonnement", "ne renouvellent pas leur abonnement", "qui ne renouvelle pas", "qui ne renouvellent pas") },
];

/* ── Les mots de la situation ── */
const voyelle = (x: string) => /^[aeiouyéèêîœ]/i.test(x);
const unS = (S: Situ) => `${S.f ? "une" : "un"} ${S.nom}`;
const leS = (S: Situ) => (voyelle(S.nom) ? `l'${S.nom}` : `${S.f ? "la" : "le"} ${S.nom}`);
const choisiS = (S: Situ) => (S.f ? "choisie" : "choisi");
const quS = (S: Situ) => (S.f ? "qu'elle" : "qu'il");
const notaS = (S: Situ) =>
  `On note $${S.L[0]}$ l'évènement « ${leS(S)} ${S.A.v} » et $${S.L[1]}$ l'évènement « ${leS(S)} ${S.B.v} ».`;

/** Un arbre tiré : p = P(A), q = P_A(B), r = P_Ā(B), en POURCENTAGES entiers. */
type Arb = { S: Situ; p: number; q: number; r: number };
function arbre(S: Situ = pick(SITUS)): Arb {
  const p = 5 * ri(2, 18);
  const q = 5 * ri(1, 19);
  let r = 5 * ri(1, 19);
  while (r === q) r = 5 * ri(1, 19);
  return { S, p, q, r };
}
/** Les quatre chemins : intersections en dix-millièmes (entiers exacts). */
const chemins = (t: Arb) => ({
  AB: t.p * t.q,
  AnB: t.p * (100 - t.q),
  nAB: (100 - t.p) * t.r,
  nAnB: (100 - t.p) * (100 - t.r),
});
const pB = (t: Arb) => t.p * t.q + (100 - t.p) * t.r; // P(B) × 10 000
function canvasArbre(t: Arb): CanvasFigure {
  const [a, b] = t.S.L;
  const d = (x: number) => fr(x / 100);
  return {
    kind: "arbre_proba",
    titre: "Arbre pondéré",
    racineEnfants: [
      { label: a, proba: d(t.p), enfants: [{ label: b, proba: d(t.q) }, { label: `${b}̄`, proba: d(100 - t.q) }] },
      { label: `${a}̄`, proba: d(100 - t.p), enfants: [{ label: b, proba: d(t.r) }, { label: `${b}̄`, proba: d(100 - t.r) }] },
    ],
  };
}
/** Les données de l'arbre, dites de trois façons (pourcentages, notation, arbre). */
function donnees(t: Arb, mode: "texte" | "notation" | "arbre" = pick(["texte", "notation", "arbre"] as const)): string {
  const { S } = t;
  const [a, b] = S.L;
  const au = `On choisit ${unS(S)} au hasard.`;
  if (mode === "arbre") return `${S.intro} ${au} ${notaS(S)} L'arbre pondéré ci-dessous résume la situation.`;
  if (mode === "notation")
    return `${S.intro} ${au} ${notaS(S)} On sait que $P(${a}) = ${dl(t.p / 100)}$, $P_{${a}}(${b}) = ${dl(t.q / 100)}$ et $P_{${bar(a)}}(${b}) = ${dl(t.r / 100)}$.`;
  return (
    `${S.intro} ${pct(t.p)} des ${S.noms} ${S.A.vp}. Parmi les ${S.noms} ${S.A.p}, ${pct(t.q)} ${S.B.vp} ; ` +
    `parmi les ${S.noms} ${S.nA.p}, ${pct(t.r)} ${S.B.vp}. ${au} ${notaS(S)}`
  );
}

/* ── Les partitions en TROIS (probabilités totales sur une partition) ── */
type Tri = { intro: string; f: boolean; nom: string; noms: string; L: [string, string, string]; parts: [string, string, string]; E: string; Ev: Carac };
const TRIS: readonly Tri[] = [
  { intro: "Une usine du Port achète ses vis à trois fournisseurs.", f: true, nom: "vis", noms: "vis", L: ["F_1", "F_2", "F_3"], parts: ["du fournisseur 1", "du fournisseur 2", "du fournisseur 3"], E: "D", Ev: etre("défectueuse", "défectueuses") },
  { intro: "Pour venir au lycée, chaque élève prend l'une des trois lignes de car jaune.", f: false, nom: "élève", noms: "élèves", L: ["L_1", "L_2", "L_3"], parts: ["de la ligne 1", "de la ligne 2", "de la ligne 3"], E: "R", Ev: etre("arrivé en retard ce matin", "arrivés en retard ce matin") },
  { intro: "Une coopérative de Saint-Paul reçoit des ananas Victoria de trois plantations.", f: false, nom: "ananas", noms: "ananas", L: ["A_1", "A_2", "A_3"], parts: ["de la plantation 1", "de la plantation 2", "de la plantation 3"], E: "C", Ev: etre("de premier choix", "de premier choix") },
  { intro: "Les élèves de terminale d'un lycée sont répartis en trois classes, T1, T2 et T3.", f: false, nom: "élève", noms: "élèves", L: ["T_1", "T_2", "T_3"], parts: ["de T1", "de T2", "de T3"], E: "V", Ev: agit("a été vacciné contre la grippe", "ait été vacciné contre la grippe", "ont été vaccinés contre la grippe", "vacciné", "vaccinés") },
  { intro: "Un magasin vend des téléphones de trois marques.", f: false, nom: "téléphone", noms: "téléphones", L: ["M_1", "M_2", "M_3"], parts: ["de la marque 1", "de la marque 2", "de la marque 3"], E: "D", Ev: etre("tombé en panne pendant la garantie", "tombés en panne pendant la garantie") },
  { intro: "Les coureurs du Grand Raid choisissent l'une des trois courses : Diagonale des Fous, Trail de Bourbon ou Mascareignes.", f: false, nom: "coureur", noms: "coureurs", L: ["D", "B", "M"], parts: ["inscrits à la Diagonale", "inscrits au Trail de Bourbon", "inscrits à la Mascareignes"], E: "F", Ev: agit("termine sa course", "termine sa course", "terminent leur course", "finisher", "finishers") },
  { intro: "Un sac contient des bonbons à la mangue, au letchi et au combava, emballés dans des papiers rouges ou verts.", f: false, nom: "bonbon", noms: "bonbons", L: ["M", "L", "K"], parts: ["à la mangue", "au letchi", "au combava"], E: "R", Ev: etre("emballé dans un papier rouge", "emballés dans un papier rouge") },
  { intro: "Une centrale d'appels d'urgence reçoit des appels le matin, l'après-midi ou la nuit.", f: false, nom: "appel", noms: "appels", L: ["M", "A", "N"], parts: ["passés le matin", "passés l'après-midi", "passés la nuit"], E: "U", Ev: etre("réellement urgent", "réellement urgents") },
  { intro: "Une agence de voyages vend des séjours à Maurice, à Madagascar et aux Seychelles.", f: false, nom: "client", noms: "clients", L: ["M", "G", "Y"], parts: ["partis à Maurice", "partis à Madagascar", "partis aux Seychelles"], E: "S", Ev: etre("très satisfait de son séjour", "très satisfaits de leur séjour") },
  { intro: "Un atelier de Saint-Pierre fabrique des sacs en vacoa sur trois machines.", f: false, nom: "sac", noms: "sacs", L: ["A", "B", "C"], parts: ["fabriqués par la machine A", "fabriqués par la machine B", "fabriqués par la machine C"], E: "D", Ev: etre("défectueux", "défectueux") },
  { intro: "À la kermesse, chaque joueur choisit l'un des trois stands : pêche aux canards, chamboule-tout ou roue de la fortune.", f: false, nom: "joueur", noms: "joueurs", L: ["K", "C", "R"], parts: ["passés à la pêche aux canards", "passés au chamboule-tout", "passés à la roue"], E: "G", Ev: agit("gagne un lot", "gagne un lot", "gagnent un lot", "gagnant", "gagnants") },
  { intro: "Une station météo classe les journées d'été à Saint-Denis en ensoleillées, nuageuses ou pluvieuses.", f: true, nom: "journée", noms: "journées", L: ["S", "N", "R"], parts: ["ensoleillées", "nuageuses", "pluvieuses"], E: "E", Ev: etre("marquée par des embouteillages", "marquées par des embouteillages") },
];

type Q = TutorGeneratedQuestionV4;
const d100 = (x: number) => `$${dl(x / 100)}$`;

/* ═══════════════ proba_conditionnelle_arbre ═══════════════ */

/** ★1 — Les branches d'un même nœud font 1 : la branche manquante. */
function genArbreBranche(): Q {
  const t = arbre();
  const { S, p, q, r } = t;
  const [a, b] = S.L;
  const k = pick(["nA", "AnB", "nAnB", "AB", "nAB"] as const);
  const cas = {
    nA: { de: "du départ", vers: `$${bar(a)}$`, nota: `P(${bar(a)})`, val: 100 - p, leurres: [p, 100 - q, r, 100 - r],
      calc: `$P(${bar(a)}) = 1 - P(${a}) = 1 - ${dl(p / 100)} = ${dl(1 - p / 100)}$` },
    AnB: { de: `de $${a}$`, vers: `$${bar(b)}$`, nota: `P_{${a}}(${bar(b)})`, val: 100 - q, leurres: [q, 100 - p, 100 - r, r],
      calc: `$P_{${a}}(${bar(b)}) = 1 - P_{${a}}(${b}) = 1 - ${dl(q / 100)} = ${dl(1 - q / 100)}$` },
    nAnB: { de: `de $${bar(a)}$`, vers: `$${bar(b)}$`, nota: `P_{${bar(a)}}(${bar(b)})`, val: 100 - r, leurres: [r, 100 - q, 100 - p, q],
      calc: `$P_{${bar(a)}}(${bar(b)}) = 1 - P_{${bar(a)}}(${b}) = 1 - ${dl(r / 100)} = ${dl(1 - r / 100)}$` },
    AB: { de: `de $${a}$`, vers: `$${b}$`, nota: `P_{${a}}(${b})`, val: q, leurres: [r, 100 - q, p, Math.round((p * q) / 100)],
      calc: `parmi les ${S.noms} ${S.A.p}, ${pct(q)} ${S.B.vp} : $P_{${a}}(${b}) = ${dl(q / 100)}$` },
    nAB: { de: `de $${bar(a)}$`, vers: `$${b}$`, nota: `P_{${bar(a)}}(${b})`, val: r, leurres: [q, 100 - r, 100 - p, p],
      calc: `parmi les ${S.noms} ${S.nA.p}, ${pct(r)} ${S.B.vp} : $P_{${bar(a)}}(${b}) = ${dl(r / 100)}$` },
  }[k];
  const question = pick([
    `Sur l'arbre pondéré de la situation, quelle probabilité porte la branche qui va ${cas.de} à ${cas.vers} ?`,
    `On construit l'arbre pondéré. Quel nombre écrit-on sur la branche qui mène ${cas.de} à ${cas.vers} ?`,
    `Que vaut $${cas.nota}$ ?`,
  ]);
  const bon = d100(cas.val);
  return {
    text: `${donnees(t, "texte")} ${question}`,
    format: "qcm",
    // Les leurres typiques d'abord ; s'ils se confondent, on complète.
    choices: qcm(bon, [...new Set([...cas.leurres, p, 100 - q, r, 100 - r, q, 100 - p, 50, (p * q) / 100, (p * r) / 100, 100].map(d100))].filter((x) => x !== bon).slice(0, 3)),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: exp(
      `Au premier niveau, on lit $P(${a})$ et $P(${bar(a)})$ ; au second, des probabilités conditionnelles. Les branches issues d'un même nœud ont une somme égale à $1$.`,
      k === "AB" || k === "nAB" ? "La phrase « parmi les … » se lit directement : c'est une probabilité conditionnelle." : "On cherche l'autre branche du même nœud : on complète à $1$.",
      `${cas.calc}.`,
      `La branche porte ${bon}.`
    ),
  };
}
/** Les quatre chemins de l'arbre, avec leurs mots. */
function unChemin(t: Arb) {
  const { S, p, q, r } = t;
  const [a, b] = S.L;
  const c = chemins(t);
  return pick([
    { X: a, Y: b, x: p, y: q, cx: S.A, cy: S.B, val: c.AB },
    { X: a, Y: bar(b), x: p, y: 100 - q, cx: S.A, cy: S.nB, val: c.AnB },
    { X: bar(a), Y: b, x: 100 - p, y: r, cx: S.nA, cy: S.B, val: c.nAB },
    { X: bar(a), Y: bar(b), x: 100 - p, y: 100 - r, cx: S.nA, cy: S.nB, val: c.nAnB },
  ]);
}

/** ★2 — La probabilité d'un chemin : on multiplie le long des branches. */
function genArbreChemin(): Q {
  const t = arbre();
  const { S } = t;
  const mode = pick(["texte", "notation", "arbre"] as const);
  const ch = unChemin(t);
  const question = pick([
    `Quelle est la probabilité que ${leS(S)} ${choisiS(S)} ${ch.cx.sj} et ${ch.cy.sj} ?`,
    `Calcule $P(${ch.X} \\cap ${ch.Y})$.`,
    `Quelle est la probabilité de l'évènement $${ch.X} \\cap ${ch.Y}$ ?`,
  ]);
  const val = ch.val / 10000;
  return {
    text: `${donnees(t, mode)} ${question} (Réponds par un nombre décimal.)`,
    format: "short",
    expected: ecrDec(val),
    comparator: "number_equal",
    ...(mode === "arbre" ? { canvas: canvasArbre(t) } : {}),
    explanation: exp(
      "La probabilité d'un chemin de l'arbre est le PRODUIT des probabilités de ses branches.",
      `On suit le chemin $${ch.X}$ puis $${ch.Y}$ : $P(${ch.X} \\cap ${ch.Y}) = P(${ch.X}) \\times P_{${ch.X}}(${ch.Y})$.`,
      `$P(${ch.X} \\cap ${ch.Y}) = ${dl(ch.x / 100)} \\times ${dl(ch.y / 100)} = ${dl(val)}$.`,
      `La probabilité vaut $${dl(val)}$, soit ${pct(val * 100)} des ${S.noms}. ⚠️ On n'additionne pas : $${dl(ch.x / 100)} + ${dl(ch.y / 100)}$ n'a pas de sens ici.`
    ),
  };
}

/** ★3 — Traduire une phrase de l'énoncé en notation. */
function genArbreTraduire(): Q {
  const t = arbre();
  const { S, p, q, r } = t;
  const [a, b] = S.L;
  const inter = Math.round((p * q) / 100);
  const k = pick(["A", "AB", "nAB", "inter", "BA"] as const);
  const cas = {
    A: { phrase: `${pct(p)} des ${S.noms} ${S.A.vp}`, bon: `P(${a})`, v: p },
    AB: { phrase: `parmi les ${S.noms} ${S.A.p}, ${pct(q)} ${S.B.vp}`, bon: `P_{${a}}(${b})`, v: q },
    nAB: { phrase: `parmi les ${S.noms} ${S.nA.p}, ${pct(r)} ${S.B.vp}`, bon: `P_{${bar(a)}}(${b})`, v: r },
    inter: { phrase: `${pct(inter)} des ${S.noms} ${S.A.vp} et ${S.B.vp}`, bon: `P(${a} \\cap ${b})`, v: inter },
    BA: { phrase: `parmi les ${S.noms} ${S.B.p}, ${pct(q)} ${S.A.vp}`, bon: `P_{${b}}(${a})`, v: q },
  }[k];
  const f = (x: string) => `$${x} = ${dl(cas.v / 100)}$`;
  const tous = [`P(${a})`, `P(${b})`, `P_{${a}}(${b})`, `P_{${b}}(${a})`, `P(${a} \\cap ${b})`, `P_{${bar(a)}}(${b})`];
  const leurres = shuffle(tous.filter((x) => x !== cas.bon)).slice(0, 3).map(f);
  const bon = f(cas.bon);
  const grp = k === "AB" ? S.A.p : k === "nAB" ? S.nA.p : S.B.p;
  return {
    text: `${S.intro} ${notaS(S)} L'énoncé indique : « ${cas.phrase} ». Comment traduire cette phrase ?`,
    format: "qcm",
    choices: qcm(bon, leurres),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: exp(
      "« Parmi les … » restreint la population : c'est une probabilité CONDITIONNELLE, la condition est le groupe dont on parle. « … et … » sur toute la population, c'est une INTERSECTION.",
      k === "A"
        ? `Ici, aucune condition : on parle de tous les ${S.noms}.`
        : k === "inter"
          ? `Ici, les deux caractères à la fois, sur l'ensemble des ${S.noms} : pas de « parmi ».`
          : `Ici, la population est restreinte aux ${S.noms} ${grp} : c'est la condition.`,
      `« ${cas.phrase} » se traduit par $${cas.bon} = ${dl(cas.v / 100)}$.`,
      `Réponse : ${bon}.${k === "BA" ? ` ⚠️ La condition est $${b}$ (le groupe après « parmi »), pas $${a}$.` : ""}`
    ),
  };
}

/** ★4 — Compléter l'arbre à partir d'une intersection. */
function genArbreCompleter(): Q {
  const t = arbre();
  const { S, p, q, r } = t;
  const [a, b] = S.L;
  const c = chemins(t);
  const deux = Math.random() < 0.5;
  const mode = pick(["texte", "notation"] as const);
  const au = `On choisit ${unS(S)} au hasard. ${notaS(S)}`;
  const donneesTxt = deux
    ? mode === "texte"
      ? `${S.intro} ${pct(p)} des ${S.noms} ${S.A.vp}, et ${pct(c.nAnB / 100)} des ${S.noms} ${S.nA.vp} et ${S.nB.vp}. ${au}`
      : `${S.intro} ${au} On sait que $P(${a}) = ${dl(p / 100)}$ et $P(${bar(a)} \\cap ${bar(b)}) = ${dl(c.nAnB / 10000)}$.`
    : mode === "texte"
      ? `${S.intro} ${pct(p)} des ${S.noms} ${S.A.vp}, et ${pct(c.AB / 100)} des ${S.noms} ${S.A.vp} et ${S.B.vp}. ${au}`
      : `${S.intro} ${au} On sait que $P(${a}) = ${dl(p / 100)}$ et $P(${a} \\cap ${b}) = ${dl(c.AB / 10000)}$.`;
  const cible = deux ? `P_{${bar(a)}}(${b})` : `P_{${a}}(${b})`;
  const question = pick([
    `Quelle probabilité faut-il écrire sur la branche qui va de $${deux ? bar(a) : a}$ à $${b}$ ?`,
    `Calcule $${cible}$.`,
  ]);
  const val = deux ? r : q;
  return {
    text: `${donneesTxt} ${question} (Réponds par un nombre décimal.)`,
    format: "short",
    expected: ecrDec(val / 100),
    comparator: "number_equal",
    explanation: exp(
      "Sur un chemin, $P(X \\cap Y) = P(X) \\times P_X(Y)$ ; donc la branche du second niveau vaut $P_X(Y) = \\dfrac{P(X \\cap Y)}{P(X)}$.",
      deux
        ? `D'abord $P(${bar(a)}) = 1 - ${dl(p / 100)} = ${dl(1 - p / 100)}$. Puis $P_{${bar(a)}}(${bar(b)}) = \\dfrac{P(${bar(a)} \\cap ${bar(b)})}{P(${bar(a)})}$, et enfin on complète à $1$.`
        : `On divise l'intersection par la probabilité de la condition $${a}$.`,
      deux
        ? `$P_{${bar(a)}}(${bar(b)}) = \\dfrac{${dl(c.nAnB / 10000)}}{${dl(1 - p / 100)}} = ${dl(1 - r / 100)}$, donc $P_{${bar(a)}}(${b}) = 1 - ${dl(1 - r / 100)} = ${dl(r / 100)}$.`
        : `$P_{${a}}(${b}) = \\dfrac{${dl(c.AB / 10000)}}{${dl(p / 100)}} = ${dl(q / 100)}$.`,
      `$${cible} = ${dl(val / 100)}$.`
    ),
  };
}

/* ═══════════════ proba_conditionnelle_formule ═══════════════ */

/** Une condition du 1er niveau (A ou Ā) et un évènement du 2nd (B ou B̄). */
function unCouple(t: Arb) {
  const ch = unChemin(t);
  return ch; // X = condition, Y = évènement, x = P(X) %, y = P_X(Y) %, val = P(X∩Y) × 10 000
}

/** ★2 — $P_A(B) = P(A∩B) / P(A)$, la condition étant donnée. */
function genFormuleQuotient(): Q {
  const t = arbre();
  const { S } = t;
  const ch = unCouple(t);
  const mode = pick(["texte", "notation"] as const);
  const inter = ch.val / 10000;
  const data =
    mode === "texte"
      ? `${S.intro} ${pct(ch.x)} des ${S.noms} ${ch.cx.vp}, et ${pct(inter * 100)} des ${S.noms} ${ch.cx.vp} et ${ch.cy.vp}. On choisit ${unS(S)} au hasard. ${notaS(S)}`
      : `${S.intro} On choisit ${unS(S)} au hasard. ${notaS(S)} On sait que $P(${ch.X}) = ${dl(ch.x / 100)}$ et $P(${ch.X} \\cap ${ch.Y}) = ${dl(inter)}$.`;
  const question = pick([
    `Calcule $P_{${ch.X}}(${ch.Y})$.`,
    `Sachant que ${leS(S)} ${choisiS(S)} ${ch.cx.v}, quelle est la probabilité ${quS(S)} ${ch.cy.sj} ?`,
    `Quelle est la proportion ${voyelle(S.noms) ? "d'" : "de "}${S.noms} ${ch.cy.p} parmi les ${S.noms} ${ch.cx.p} ?`,
  ]);
  return {
    text: `${data} ${question} (Réponds par un nombre décimal.)`,
    format: "short",
    expected: ecrDec(ch.y / 100),
    comparator: "number_equal",
    explanation: exp(
      `$P_{${ch.X}}(${ch.Y}) = \\dfrac{P(${ch.X} \\cap ${ch.Y})}{P(${ch.X})}$ : l'intersection divisée par la probabilité de la CONDITION.`,
      `La condition est $${ch.X}$ (${leS(S)} ${ch.cx.v}).`,
      `$P_{${ch.X}}(${ch.Y}) = \\dfrac{${dl(inter)}}{${dl(ch.x / 100)}} = ${dl(ch.y / 100)}$.`,
      `$P_{${ch.X}}(${ch.Y}) = ${dl(ch.y / 100)}$. ⚠️ Multiplier $${dl(inter)} \\times ${dl(ch.x / 100)}$ n'aurait aucun sens.`
    ),
  };
}

/** ★3 — $P(A∩B) = P(A) × P_A(B)$ : l'inconnue change de place. */
function genFormuleRoles(): Q {
  const t = arbre();
  const { S } = t;
  const ch = unCouple(t);
  const inter = ch.val / 10000;
  const [X, Y] = [ch.X, ch.Y];
  const k = pick(["inter", "cond", "marg"] as const);
  const P = { inter: `P(${X} \\cap ${Y})`, cond: `P_{${X}}(${Y})`, marg: `P(${X})` };
  const V = { inter, cond: ch.y / 100, marg: ch.x / 100 };
  const connus = (["inter", "cond", "marg"] as const).filter((z) => z !== k);
  const phr = {
    inter: `${pct(inter * 100)} des ${S.noms} ${ch.cx.vp} et ${ch.cy.vp}`,
    cond: `parmi les ${S.noms} ${ch.cx.p}, ${pct(ch.y)} ${ch.cy.vp}`,
    marg: `${pct(ch.x)} des ${S.noms} ${ch.cx.vp}`,
  };
  const mode = pick(["texte", "notation"] as const);
  const data =
    mode === "texte"
      ? `${S.intro} On sait que ${phr[connus[0]]}, et que ${phr[connus[1]]}. On choisit ${unS(S)} au hasard. ${notaS(S)}`
      : `${S.intro} On choisit ${unS(S)} au hasard. ${notaS(S)} On sait que $${P[connus[0]]} = ${dl(V[connus[0]])}$ et $${P[connus[1]]} = ${dl(V[connus[1]])}$.`;
  const calc =
    k === "inter"
      ? `$${P.inter} = ${P.marg} \\times ${P.cond} = ${dl(V.marg)} \\times ${dl(V.cond)} = ${dl(inter)}$`
      : k === "cond"
        ? `$${P.cond} = \\dfrac{${P.inter}}{${P.marg}} = \\dfrac{${dl(inter)}}{${dl(V.marg)}} = ${dl(V.cond)}$`
        : `$${P.marg} = \\dfrac{${P.inter}}{${P.cond}} = \\dfrac{${dl(inter)}}{${dl(V.cond)}} = ${dl(V.marg)}$`;
  return {
    text: `${data} Calcule $${P[k]}$. (Réponds par un nombre décimal.)`,
    format: "short",
    expected: ecrDec(V[k]),
    comparator: "number_equal",
    explanation: exp(
      `Une seule formule relie les trois : $${P.inter} = ${P.marg} \\times ${P.cond}$.`,
      k === "inter" ? "L'intersection est le produit le long du chemin." : "On isole l'inconnue : on divise l'intersection par la probabilité connue.",
      `${calc}.`,
      `$${P[k]} = ${dl(V[k])}$.`
    ),
  };
}

/** ★4 — La condition n'est plus au premier niveau : $P_B(A)$, $P_{\bar A}(B)$… */
function genFormuleDetour(): Q {
  const t = arbre();
  const { S, p } = t;
  const [a, b] = S.L;
  const c = chemins(t);
  const PB = pB(t);
  const k = pick(["BA", "nAB", "nBA"] as const);
  const data = `${S.intro} On choisit ${unS(S)} au hasard. ${notaS(S)} On sait que $P(${a}) = ${dl(p / 100)}$, $P(${b}) = ${dl(PB / 10000)}$ et $P(${a} \\cap ${b}) = ${dl(c.AB / 10000)}$.`;
  const cas = {
    BA: { cible: `P_{${b}}(${a})`, num: c.AB, den: PB,
      etapes: `$P_{${b}}(${a}) = \\dfrac{P(${a} \\cap ${b})}{P(${b})} = \\dfrac{${dl(c.AB / 10000)}}{${dl(PB / 10000)}}$` },
    nAB: { cible: `P_{${bar(a)}}(${b})`, num: c.nAB, den: 10000 - 100 * p,
      etapes: `$P(${bar(a)} \\cap ${b}) = P(${b}) - P(${a} \\cap ${b}) = ${dl(PB / 10000)} - ${dl(c.AB / 10000)} = ${dl(c.nAB / 10000)}$ et $P(${bar(a)}) = ${dl(1 - p / 100)}$, donc $P_{${bar(a)}}(${b}) = \\dfrac{${dl(c.nAB / 10000)}}{${dl(1 - p / 100)}}$` },
    nBA: { cible: `P_{${bar(b)}}(${a})`, num: c.AnB, den: 10000 - PB,
      etapes: `$P(${a} \\cap ${bar(b)}) = P(${a}) - P(${a} \\cap ${b}) = ${dl(p / 100)} - ${dl(c.AB / 10000)} = ${dl(c.AnB / 10000)}$ et $P(${bar(b)}) = 1 - ${dl(PB / 10000)} = ${dl(1 - PB / 10000)}$, donc $P_{${bar(b)}}(${a}) = \\dfrac{${dl(c.AnB / 10000)}}{${dl(1 - PB / 10000)}}$` },
  }[k];
  const v = Math.round((100 * cas.num) / cas.den) / 100;
  return {
    text: `${data} Calcule $${cas.cible}$. (Donne la valeur exacte, ou arrondie au centième.)`,
    format: "short",
    expected: ecrArrondi(cas.num, cas.den),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      "$P_X(Y) = \\dfrac{P(X \\cap Y)}{P(X)}$, quelle que soit la condition $X$. Si l'intersection ou la condition manquent, on les déduit : $P(\\overline{X}) = 1 - P(X)$, et $P(\\overline{X} \\cap Y) = P(Y) - P(X \\cap Y)$.",
      `La condition est $${k === "BA" ? b : k === "nAB" ? bar(a) : bar(b)}$ : c'est elle qui va au dénominateur.`,
      `${cas.etapes.slice(0, -1)} = ${simpl(cas.num, cas.den)}$.`,
      `$${cas.cible} ${exact(cas.num, cas.den) ? "=" : "\\approx"} ${dl(v)}$.`
    ),
  };
}

/* ═══════════════ proba_totales ═══════════════ */

/** ★2 — $P(B) = P(A∩B) + P(\bar A∩B)$ : on additionne les deux chemins. */
function genTotalesSomme(): Q {
  const t = arbre();
  const { S } = t;
  const [a, b] = S.L;
  const c = chemins(t);
  const contraire = Math.random() < 0.35;
  const [Y, cy, u, v] = contraire ? [bar(b), S.nB, c.AnB, c.nAnB] : [b, S.B, c.AB, c.nAB];
  const mode = pick(["texte", "notation"] as const);
  const data =
    mode === "texte"
      ? `${S.intro} ${pct(u / 100)} des ${S.noms} ${S.A.vp} et ${cy.vp} ; ${pct(v / 100)} des ${S.noms} ${S.nA.vp} et ${cy.vp}. On choisit ${unS(S)} au hasard. ${notaS(S)}`
      : `${S.intro} On choisit ${unS(S)} au hasard. ${notaS(S)} On sait que $P(${a} \\cap ${Y}) = ${dl(u / 10000)}$ et $P(${bar(a)} \\cap ${Y}) = ${dl(v / 10000)}$.`;
  const question = pick([
    `Calcule $P(${Y})$.`,
    `Quelle est la probabilité que ${leS(S)} ${choisiS(S)} ${cy.sj} ?`,
    `Quelle proportion des ${S.noms} ${cy.vp} ?`,
  ]);
  const val = (u + v) / 10000;
  return {
    text: `${data} ${question} (Réponds par un nombre décimal.)`,
    format: "short",
    expected: ecrDec(val),
    comparator: "number_equal",
    explanation: exp(
      `$${a}$ et $${bar(a)}$ forment une partition : $${Y}$ se réalise soit avec $${a}$, soit avec $${bar(a)}$, jamais les deux.`,
      `Formule des probabilités totales : $P(${Y}) = P(${a} \\cap ${Y}) + P(${bar(a)} \\cap ${Y})$.`,
      `$P(${Y}) = ${dl(u / 10000)} + ${dl(v / 10000)} = ${dl(val)}$.`,
      `$P(${Y}) = ${dl(val)}$. ⚠️ On additionne les chemins ; on ne les multiplie pas.`
    ),
  };
}

/** ★3 — L'arbre complet : $P(B) = P(A)P_A(B) + P(\bar A)P_{\bar A}(B)$. */
function genTotalesArbre(): Q {
  const t = arbre();
  const { S, p, q, r } = t;
  const [a, b] = S.L;
  const mode = pick(["texte", "notation", "arbre"] as const);
  const contraire = Math.random() < 0.3;
  const PB = pB(t);
  const val = (contraire ? 10000 - PB : PB) / 10000;
  const [Y, cy, y1, y2] = contraire ? [bar(b), S.nB, 100 - q, 100 - r] : [b, S.B, q, r];
  const question = pick([
    `Calcule $P(${Y})$.`,
    `Quelle est la probabilité que ${leS(S)} ${choisiS(S)} ${cy.sj} ?`,
    `Quelle est la probabilité de l'évènement $${Y}$ ?`,
  ]);
  return {
    text: `${donnees(t, mode)} ${question} (Réponds par un nombre décimal.)`,
    format: "short",
    expected: ecrDec(val),
    comparator: "number_equal",
    ...(mode === "arbre" ? { canvas: canvasArbre(t) } : {}),
    explanation: exp(
      `$${Y}$ est au bout de DEUX chemins de l'arbre : $${a}$ puis $${Y}$, et $${bar(a)}$ puis $${Y}$.`,
      `$P(${Y}) = P(${a}) \\times P_{${a}}(${Y}) + P(${bar(a)}) \\times P_{${bar(a)}}(${Y})$.`,
      `$P(${Y}) = ${dl(p / 100)} \\times ${dl(y1 / 100)} + ${dl(1 - p / 100)} \\times ${dl(y2 / 100)} = ${dl((p * y1) / 10000)} + ${dl(((100 - p) * y2) / 10000)} = ${dl(val)}$.`,
      `$P(${Y}) = ${dl(val)}$, soit ${pct(val * 100)} des ${S.noms}.`
    ),
  };
}

/** ★4 — Une partition en TROIS. */
function tirTri() {
  const T = pick(TRIS);
  let parts: number[];
  do {
    const x = 5 * ri(2, 12), y = 5 * ri(2, 12);
    parts = [x, y, 100 - x - y];
  } while (parts[2] < 10);
  const taux = [0, 0, 0].map(() => pick([1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90]));
  // Les taux restent du même ordre dans une situation : petits (défauts) ou grands (satisfaction).
  const petits = Math.random() < 0.5;
  const tx = taux.map((v) => (petits ? Math.min(v, 20) : Math.max(v, 30)));
  return { T, parts, tx };
}
function texteTri(T: Tri, parts: number[], tx: number[]): string {
  return (
    `${T.intro} Les ${T.noms} se répartissent ainsi : ${parts.map((v, i) => `${pct(v)} ${T.parts[i]}`).join(", ")}. ` +
    parts.map((_, i) => `Parmi les ${T.noms} ${T.parts[i]}, ${pct(tx[i])} ${T.Ev.vp}.`).join(" ") +
    ` On choisit ${T.f ? "une" : "un"} ${T.nom} au hasard et on note $${T.E}$ l'évènement « ${T.f ? "la" : voyelle(T.nom) ? "l'" : "le"}${voyelle(T.nom) ? "" : " "}${T.nom} ${T.Ev.v} ».`
  );
}
function genTotalesTri(): Q {
  const { T, parts, tx } = tirTri();
  const contraire = Math.random() < 0.3;
  const num = parts.reduce((s, v, i) => s + v * tx[i], 0);
  const val = (contraire ? 10000 - num : num) / 10000;
  const E = contraire ? bar(T.E) : T.E;
  const termes = parts.map((v, i) => `${dl(v / 100)} \\times ${dl((contraire ? 100 - tx[i] : tx[i]) / 100)}`).join(" + ");
  const produits = parts.map((v, i) => dl((v * (contraire ? 100 - tx[i] : tx[i])) / 10000)).join(" + ");
  return {
    text: `${texteTri(T, parts, tx)} Calcule $P(${E})$. (Réponds par un nombre décimal.)`,
    format: "short",
    expected: ecrDec(val),
    comparator: "number_equal",
    explanation: exp(
      `$${T.L.join("$, $")}$ forment une partition de l'univers (chaque ${T.nom} est dans un groupe et un seul).`,
      `Formule des probabilités totales : $P(${E}) = ${T.L.map((L) => `P(${L}) \\times P_{${L}}(${E})`).join(" + ")}$.${contraire ? ` Sur chaque branche, $P_{L}(${bar(T.E)}) = 1 - P_{L}(${T.E})$.` : ""}`,
      `$P(${E}) = ${termes} = ${produits} = ${dl(val)}$.`,
      `$P(${E}) = ${dl(val)}$.`
    ),
  };
}

/** ★5 — À l'envers : connaissant $P(B)$, retrouver une branche ou $P(A)$. */
function genTotalesInverse(): Q {
  const k = pick(["r", "p"] as const);
  const t0 = arbre();
  // Pour résoudre en x, on garde P_A(B) > P_Ā(B) : l'équation s'écrit sans signe moins.
  const t = k === "p" && t0.q < t0.r ? { ...t0, q: t0.r, r: t0.q } : t0;
  const { S, p, q, r } = t;
  const [a, b] = S.L;
  const PB = pB(t);
  const notation = Math.random() < 0.5;
  const base = `${S.intro} On choisit ${unS(S)} au hasard. ${notaS(S)}`;
  const data =
    k === "r"
      ? notation
        ? `${base} On sait que $P(${a}) = ${dl(p / 100)}$, $P_{${a}}(${b}) = ${dl(q / 100)}$ et $P(${b}) = ${dl(PB / 10000)}$.`
        : `${S.intro} ${pct(p)} des ${S.noms} ${S.A.vp} ; parmi eux, ${pct(q)} ${S.B.vp}. Au total, ${pct(PB / 100)} des ${S.noms} ${S.B.vp}. ${`On choisit ${unS(S)} au hasard. ${notaS(S)}`}`
      : `${base} On sait que $P_{${a}}(${b}) = ${dl(q / 100)}$, $P_{${bar(a)}}(${b}) = ${dl(r / 100)}$ et $P(${b}) = ${dl(PB / 10000)}$. On note $x = P(${a})$.`;
  const cible = k === "r" ? `P_{${bar(a)}}(${b})` : `x = P(${a})`;
  const val = (k === "r" ? r : p) / 100;
  const calc =
    k === "r"
      ? `$${dl(PB / 10000)} = ${dl(p / 100)} \\times ${dl(q / 100)} + ${dl(1 - p / 100)} \\times y$, soit $${dl(1 - p / 100)}\\,y = ${dl(PB / 10000)} - ${dl((p * q) / 10000)} = ${dl(((100 - p) * r) / 10000)}$, d'où $y = ${dl(r / 100)}$`
      : `$${dl(PB / 10000)} = ${dl(q / 100)}\\,x + ${dl(r / 100)}(1 - x) = ${dl(r / 100)} + ${dl((q - r) / 100)}\\,x$, d'où $x = \\dfrac{${dl(PB / 10000)} - ${dl(r / 100)}}{${dl((q - r) / 100)}} = ${dl(p / 100)}$`;
  return {
    text: `${data} Calcule $${k === "r" ? cible : "x"}$. (Réponds par un nombre décimal.)`,
    format: "short",
    expected: ecrDec(val),
    comparator: "number_equal",
    explanation: exp(
      "On écrit la formule des probabilités totales avec l'inconnue, puis on résout l'équation du premier degré.",
      k === "r"
        ? `$P(${b}) = P(${a}) \\times P_{${a}}(${b}) + P(${bar(a)}) \\times y$, avec $y = ${cible}$ et $P(${bar(a)}) = ${dl(1 - p / 100)}$.`
        : `$P(${b}) = x \\times P_{${a}}(${b}) + (1 - x) \\times P_{${bar(a)}}(${b})$.`,
      `${calc}.`,
      `$${cible} = ${dl(val)}$.`
    ),
  };
}

/* ═══════════════ proba_inverse_bayes ═══════════════ */

/** ★2 — Reconnaître la probabilité « à l'envers » demandée. */
function genBayesTraduire(): Q {
  const t = arbre();
  const { S } = t;
  const [a, b] = S.L;
  const k = pick(["BA", "BnA", "nBA", "formule"] as const);
  if (k === "formule") {
    const bon = `$P_{${b}}(${a}) = \\dfrac{P(${a} \\cap ${b})}{P(${b})}$`;
    return {
      text: `${S.intro} ${notaS(S)} On connaît l'arbre pondéré (premier niveau : $${a}$ ; second niveau : $${b}$). Pour calculer la probabilité que ${leS(S)} ${S.A.sj} sachant ${quS(S)} ${S.B.v}, quelle égalité utilise-t-on ?`,
      format: "qcm",
      choices: qcm(bon, [
        `$P_{${b}}(${a}) = \\dfrac{P(${a} \\cap ${b})}{P(${a})}$`,
        `$P_{${b}}(${a}) = P_{${a}}(${b})$`,
        `$P_{${b}}(${a}) = P(${a}) \\times P(${b})$`,
      ]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "On « inverse » le conditionnement : la condition devient $" + b + "$, qui n'est pas au premier niveau de l'arbre.",
        `Par définition, $P_{${b}}(${a}) = \\dfrac{P(${a} \\cap ${b})}{P(${b})}$ : on divise par la probabilité de la CONDITION $${b}$.`,
        `$P(${a} \\cap ${b})$ se lit sur un chemin ; $P(${b})$ s'obtient par les probabilités totales.`,
        `Réponse : ${bon}. ⚠️ En général $P_{${b}}(${a}) \\neq P_{${a}}(${b})$.`
      ),
    };
  }
  const cas = {
    BA: { cond: S.B, ev: S.A, bon: `P_{${b}}(${a})` },
    BnA: { cond: S.B, ev: S.nA, bon: `P_{${b}}(${bar(a)})` },
    nBA: { cond: S.nB, ev: S.A, bon: `P_{${bar(b)}}(${a})` },
  }[k];
  const question = pick([
    `Sachant que ${leS(S)} ${choisiS(S)} ${cas.cond.v}, quelle est la probabilité ${quS(S)} ${cas.ev.sj} ?`,
    `On choisit au hasard ${unS(S)} parmi les ${S.noms} ${cas.cond.p}. Quelle est la probabilité ${quS(S)} ${cas.ev.sj} ?`,
  ]);
  const tous = [`P_{${a}}(${b})`, `P_{${b}}(${a})`, `P(${a} \\cap ${b})`, `P_{${b}}(${bar(a)})`, `P_{${bar(b)}}(${a})`, `P_{${a}}(${bar(b)})`];
  const bon = `$${cas.bon}$`;
  return {
    text: `${S.intro} On choisit ${unS(S)} au hasard. ${notaS(S)} Question : « ${question} » Quelle probabilité demande-t-on ?`,
    format: "qcm",
    choices: qcm(bon, shuffle(tous.filter((x) => x !== cas.bon)).slice(0, 3).map((x) => `$${x}$`)),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: exp(
      "Dans $P_X(Y)$, $X$ est la condition (ce que l'on SAIT déjà), $Y$ l'évènement dont on cherche la probabilité.",
      `On sait que ${leS(S)} ${cas.cond.v} : c'est la condition, elle va en indice.`,
      `On cherche la probabilité ${quS(S)} ${cas.ev.sj}.`,
      `On demande ${bon}. C'est une probabilité « à l'envers » : l'arbre donne $P_{${a}}(${b})$, pas celle-ci.`
    ),
  };
}

/** ★3 — $P_B(A) = P(A∩B) / P(B)$ avec les deux données. */
function genBayesQuotient(): Q {
  const t = arbre();
  const { S } = t;
  const [a, b] = S.L;
  const c = chemins(t);
  const PB = pB(t);
  const comp = Math.random() < 0.3;
  const [X, cx, num] = comp ? [bar(a), S.nA, c.nAB] : [a, S.A, c.AB];
  const texte = Math.random() < 0.5;
  const data = texte
    ? `${S.intro} ${pct(PB / 100)} des ${S.noms} ${S.B.vp}, et ${pct(num / 100)} des ${S.noms} ${cx.vp} et ${S.B.vp}. On choisit ${unS(S)} au hasard. ${notaS(S)}`
    : `${S.intro} On choisit ${unS(S)} au hasard. ${notaS(S)} On sait que $P(${b}) = ${dl(PB / 10000)}$ et $P(${X} \\cap ${b}) = ${dl(num / 10000)}$.`;
  const question = pick([
    `Calcule $P_{${b}}(${X})$.`,
    `Sachant que ${leS(S)} ${choisiS(S)} ${S.B.v}, quelle est la probabilité ${quS(S)} ${cx.sj} ?`,
    `Parmi les ${S.noms} ${S.B.p}, quelle est la proportion de ${S.f ? "celles" : "ceux"} qui ${cx.vp} ?`,
  ]);
  const v = Math.round((100 * num) / PB) / 100;
  return {
    text: `${data} ${question} (Donne la valeur exacte, ou arrondie au centième.)`,
    format: "short",
    expected: ecrArrondi(num, PB),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      `La condition est $${b}$ : $P_{${b}}(${X}) = \\dfrac{P(${X} \\cap ${b})}{P(${b})}$.`,
      `On divise l'intersection par $P(${b})$, pas par $P(${X})$.`,
      `$P_{${b}}(${X}) = \\dfrac{${dl(num / 10000)}}{${dl(PB / 10000)}} = ${simpl(num, PB)}$.`,
      `$P_{${b}}(${X}) ${exact(num, PB) ? "=" : "\\approx"} ${dl(v)}$.`
    ),
  };
}

/** ★4 — Bayes complet depuis l'arbre : chemin ÷ probabilités totales. */
function genBayesArbre(): Q {
  const t = arbre();
  const { S, p, q, r } = t;
  const [a, b] = S.L;
  const c = chemins(t);
  const PB = pB(t);
  const mode = pick(["texte", "notation", "arbre"] as const);
  const k = pick(["BA", "BnA", "nBA"] as const);
  const cas = {
    BA: { cible: `P_{${b}}(${a})`, cond: S.B, ev: S.A, num: c.AB, den: PB, chem: `${dl(p / 100)} \\times ${dl(q / 100)}`, Y: b },
    BnA: { cible: `P_{${b}}(${bar(a)})`, cond: S.B, ev: S.nA, num: c.nAB, den: PB, chem: `${dl(1 - p / 100)} \\times ${dl(r / 100)}`, Y: b },
    nBA: { cible: `P_{${bar(b)}}(${a})`, cond: S.nB, ev: S.A, num: c.AnB, den: 10000 - PB, chem: `${dl(p / 100)} \\times ${dl(1 - q / 100)}`, Y: bar(b) },
  }[k];
  const Y = cas.Y;
  const totales =
    k === "nBA"
      ? `$P(${Y}) = ${dl(p / 100)} \\times ${dl(1 - q / 100)} + ${dl(1 - p / 100)} \\times ${dl(1 - r / 100)} = ${dl(cas.den / 10000)}$`
      : `$P(${Y}) = ${dl(p / 100)} \\times ${dl(q / 100)} + ${dl(1 - p / 100)} \\times ${dl(r / 100)} = ${dl(cas.den / 10000)}$`;
  const question = pick([
    `Calcule $${cas.cible}$.`,
    `Sachant que ${leS(S)} ${choisiS(S)} ${cas.cond.v}, quelle est la probabilité ${quS(S)} ${cas.ev.sj} ?`,
  ]);
  const v = Math.round((100 * cas.num) / cas.den) / 100;
  return {
    text: `${donnees(t, mode)} ${question} (Donne la valeur arrondie au centième.)`,
    format: "short",
    expected: ecrArrondi(cas.num, cas.den),
    comparator: "fraction_decimal_equivalent",
    ...(mode === "arbre" ? { canvas: canvasArbre(t) } : {}),
    explanation: exp(
      `La condition $${Y}$ est au SECOND niveau de l'arbre : on calcule d'abord $P(${Y})$ par les probabilités totales, puis le quotient.`,
      `$${cas.cible} = \\dfrac{P(${k === "BnA" ? bar(a) : a} \\cap ${Y})}{P(${Y})}$.`,
      `${totales} ; chemin : $${cas.chem} = ${dl(cas.num / 10000)}$. Donc $${cas.cible} = \\dfrac{${dl(cas.num / 10000)}}{${dl(cas.den / 10000)}} = ${simpl(cas.num, cas.den)}$.`,
      `$${cas.cible} ${exact(cas.num, cas.den) ? "=" : "\\approx"} ${dl(v)}$.`
    ),
  };
}

/** ★5 — Les dépistages : la conditionnelle à l'envers, et les faux positifs. */
type Detect = {
  M: string; T: string;
  base: (p: number, s: number, f: number) => string;
  nM: string; // « la personne choisie est malade »
  nT: string; // « son test est positif »
  un1: string; // « une personne dont le test est positif »
  qEtat: string; // « qu'elle soit malade »
  un0: string; // « une personne dont le test est négatif »
  qSain: string; // « qu'elle ne soit pas malade »
};
const DETECTS: readonly Detect[] = [
  { M: "M", T: "T", base: (p, s, f) => `À La Réunion, ${pct(p)} de la population est porteuse de la dengue. Un test rapide est positif chez ${pct(s)} des porteurs, mais aussi, à tort, chez ${pct(f)} des non-porteurs.`,
    nM: "la personne est porteuse", nT: "son test est positif", un1: "une personne dont le test est positif", qEtat: "qu'elle soit porteuse", un0: "une personne dont le test est négatif", qSain: "qu'elle ne soit pas porteuse" },
  { M: "M", T: "T", base: (p, s, f) => `Une maladie rare touche ${pct(p)} de la population. Le test de dépistage détecte ${pct(s)} des malades, mais il est aussi positif chez ${pct(f)} des personnes saines.`,
    nM: "la personne est malade", nT: "le test est positif", un1: "une personne testée positive", qEtat: "qu'elle soit réellement malade", un0: "une personne testée négative", qSain: "qu'elle soit saine" },
  { M: "D", T: "C", base: (p, s, f) => `Sur un grand trail, ${pct(p)} des coureurs sont dopés. Le contrôle est positif chez ${pct(s)} des coureurs dopés, mais aussi, à tort, chez ${pct(f)} des coureurs non dopés.`,
    nM: "le coureur est dopé", nT: "le contrôle est positif", un1: "un coureur dont le contrôle est positif", qEtat: "qu'il soit dopé", un0: "un coureur dont le contrôle est négatif", qSain: "qu'il ne soit pas dopé" },
  { M: "S", T: "F", base: (p, s, f) => `${pct(p)} des courriels reçus par une messagerie sont des spams. Le filtre classe en « spam » ${pct(s)} des spams, mais aussi, à tort, ${pct(f)} des courriels légitimes.`,
    nM: "le courriel est un spam", nT: "le filtre le classe en « spam »", un1: "un courriel classé en « spam »", qEtat: "qu'il s'agisse vraiment d'un spam", un0: "un courriel laissé dans la boîte de réception", qSain: "qu'il soit légitime" },
  { M: "I", T: "S", base: (p, s, f) => `À l'aéroport Roland-Garros, ${pct(p)} des bagages contiennent un objet interdit. Le scanner sonne pour ${pct(s)} de ces bagages, mais aussi, à tort, pour ${pct(f)} des autres.`,
    nM: "le bagage contient un objet interdit", nT: "le scanner sonne", un1: "un bagage qui a fait sonner le scanner", qEtat: "qu'il contienne un objet interdit", un0: "un bagage qui n'a pas fait sonner le scanner", qSain: "qu'il ne contienne rien d'interdit" },
  { M: "D", T: "R", base: (p, s, f) => `Dans une usine, ${pct(p)} des pièces sont défectueuses. Un capteur rejette ${pct(s)} des pièces défectueuses, mais aussi, à tort, ${pct(f)} des pièces conformes.`,
    nM: "la pièce est défectueuse", nT: "la pièce est rejetée", un1: "une pièce rejetée", qEtat: "qu'elle soit défectueuse", un0: "une pièce acceptée", qSain: "qu'elle soit conforme" },
  { M: "R", T: "A", base: (p, s, f) => `Une caméra « vigie requin » surveille une baie de La Réunion : ${pct(p)} des images montrent un requin. Le logiciel donne l'alerte pour ${pct(s)} des images avec requin, mais aussi, à tort, pour ${pct(f)} des images sans requin.`,
    nM: "l'image montre un requin", nT: "l'alerte est donnée", un1: "une image qui a déclenché l'alerte", qEtat: "qu'elle montre réellement un requin", un0: "une image sans alerte", qSain: "qu'elle ne montre aucun requin" },
  { M: "V", T: "S", base: (p, s, f) => `À la sortie d'un magasin, ${pct(p)} des clients ont un article non payé. Le portique antivol sonne pour ${pct(s)} d'entre eux, mais aussi, à tort, pour ${pct(f)} des clients honnêtes.`,
    nM: "le client a un article non payé", nT: "le portique sonne", un1: "un client qui a fait sonner le portique", qEtat: "qu'il ait un article non payé", un0: "un client qui n'a pas fait sonner le portique", qSain: "qu'il soit honnête" },
  { M: "G", T: "D", base: (p, s, f) => `Dans un élevage de Saint-Joseph, ${pct(p)} des poules sont porteuses d'un parasite. Un test le détecte chez ${pct(s)} des poules porteuses, mais il est aussi positif chez ${pct(f)} des poules saines.`,
    nM: "la poule est porteuse", nT: "le test est positif", un1: "une poule dont le test est positif", qEtat: "qu'elle soit porteuse", un0: "une poule dont le test est négatif", qSain: "qu'elle soit saine" },
];
function genBayesDepistage(): Q {
  const D = pick(DETECTS);
  const p = pick([1, 2, 3, 4, 5, 8, 10, 15, 20] as const);
  const s = pick([80, 85, 90, 95, 98, 99] as const);
  const f = pick([1, 2, 3, 4, 5, 8, 10] as const);
  const VP = p * s, FP = (100 - p) * f, FN = p * (100 - s), VN = (100 - p) * (100 - f);
  const [M, T] = [D.M, D.T];
  const k = pick(["vrai", "vrai", "fausse", "negatif"] as const);
  const cas = {
    vrai: { q: `On choisit au hasard ${D.un1}. Quelle est la probabilité ${D.qEtat} ? (Arrondis au centième.)`, cible: `P_{${T}}(${M})`, num: VP, den: VP + FP, ch: 2, Y: T,
      tot: `$P(${T}) = ${dl(p / 100)} \\times ${dl(s / 100)} + ${dl(1 - p / 100)} \\times ${dl(f / 100)} = ${dl((VP + FP) / 10000)}$`, chem: `${dl(p / 100)} \\times ${dl(s / 100)} = ${dl(VP / 10000)}` },
    fausse: { q: `On choisit au hasard ${D.un1}. Quelle est la probabilité que ce soit une fausse alerte ? (Arrondis au centième.)`, cible: `P_{${T}}(${bar(M)})`, num: FP, den: VP + FP, ch: 2, Y: T,
      tot: `$P(${T}) = ${dl(p / 100)} \\times ${dl(s / 100)} + ${dl(1 - p / 100)} \\times ${dl(f / 100)} = ${dl((VP + FP) / 10000)}$`, chem: `${dl(1 - p / 100)} \\times ${dl(f / 100)} = ${dl(FP / 10000)}` },
    negatif: { q: `On choisit au hasard ${D.un0}. Quelle est la probabilité ${D.qSain} ? (Arrondis au millième.)`, cible: `P_{${bar(T)}}(${bar(M)})`, num: VN, den: VN + FN, ch: 3, Y: bar(T),
      tot: `$P(${bar(T)}) = ${dl(p / 100)} \\times ${dl(1 - s / 100)} + ${dl(1 - p / 100)} \\times ${dl(1 - f / 100)} = ${dl((VN + FN) / 10000)}$`, chem: `${dl(1 - p / 100)} \\times ${dl(1 - f / 100)} = ${dl(VN / 10000)}` },
  }[k];
  const m = 10 ** cas.ch;
  const v = Math.round((m * cas.num) / cas.den) / m;
  return {
    text: `${D.base(p, s, f)} On note $${M}$ l'évènement « ${D.nM} » et $${T}$ l'évènement « ${D.nT} ». ${cas.q}`,
    format: "short",
    expected: ecrArrondi(cas.num, cas.den, cas.ch),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      `L'énoncé donne $P(${M}) = ${dl(p / 100)}$, $P_{${M}}(${T}) = ${dl(s / 100)}$ et $P_{${bar(M)}}(${T}) = ${dl(f / 100)}$ : un arbre avec $${M}$ au premier niveau. On demande $${cas.cible}$ : la condition est au second niveau, c'est la formule de Bayes.`,
      `$${cas.cible} = \\dfrac{P(${k === "vrai" ? M : bar(M)} \\cap ${cas.Y})}{P(${cas.Y})}$, avec $P(${cas.Y})$ par les probabilités totales.`,
      `${cas.tot} ; chemin : $${cas.chem}$. Donc $${cas.cible} = \\dfrac{${dl(cas.num / 10000)}}{${dl(cas.den / 10000)}} \\approx ${dl(v)}$.`,
      k === "vrai"
        ? `$${cas.cible} \\approx ${dl(v)}$.${v < s / 100 - 0.1 ? ` Bien moins que $${dl(s / 100)}$ : quand le caractère est rare, les faux positifs pèsent lourd.` : ""}`
        : `$${cas.cible} \\approx ${dl(v)}$.`
    ),
  };
}

/* ═══════════════ proba_conditionnelle_defi ═══════════════ */

/** ★4 — Indépendance lue sur un arbre : $P_A(B) = P(B)$ ? */
function genDefiIndep(): Q {
  const t0 = arbre();
  const indep = Math.random() < 0.4;
  const t = indep ? { ...t0, r: t0.q } : t0;
  const { S, p, q, r } = t;
  const [a, b] = S.L;
  const PB = pB(t);
  const mode = pick(["texte", "notation", "arbre"] as const);
  const OUI = `Oui, car $P(${b}) = ${dl(PB / 10000)} = P_{${a}}(${b})$`;
  const NON = `Non, car $P(${b}) = ${dl(PB / 10000)} \\neq P_{${a}}(${b})$`;
  const bon = indep ? OUI : NON;
  const leurres = indep
    ? [`Non, car $P(${a} \\cap ${b}) = ${dl((p * q) / 10000)} \\neq P(${a}) + P(${b})$`, `Non, car $P(${a}) \\neq P(${b})$`, `On ne peut pas savoir sans $P_{${b}}(${a})$`]
    : [`Oui, car $P_{${a}}(${b}) + P_{${a}}(${bar(b)}) = 1$`, `Oui, car $P(${a} \\cap ${b}) = P(${a}) \\times P_{${a}}(${b})$`, `On ne peut pas savoir sans $P_{${b}}(${a})$`];
  const question = pick([
    `Les évènements $${a}$ et $${b}$ sont-ils indépendants ?`,
    `Le fait que ${leS(S)} ${S.A.v} influence-t-il la probabilité ${quS(S)} ${S.B.sj} ? Autrement dit, $${a}$ et $${b}$ sont-ils indépendants ?`,
  ]);
  return {
    text: `${donnees(t, mode)} ${question}`,
    format: "qcm",
    choices: qcm(bon, leurres),
    expected: [bon],
    comparator: "mcq_exact",
    ...(mode === "arbre" ? { canvas: canvasArbre(t) } : {}),
    explanation: exp(
      `$${a}$ et $${b}$ sont indépendants lorsque $P(${a} \\cap ${b}) = P(${a}) \\times P(${b})$, c'est-à-dire (si $P(${a}) \\neq 0$) lorsque $P_{${a}}(${b}) = P(${b})$.`,
      `On calcule $P(${b})$ par les probabilités totales, puis on compare à $P_{${a}}(${b}) = ${dl(q / 100)}$.`,
      `$P(${b}) = ${dl(p / 100)} \\times ${dl(q / 100)} + ${dl(1 - p / 100)} \\times ${dl(r / 100)} = ${dl(PB / 10000)}$.`,
      indep
        ? `$P(${b}) = P_{${a}}(${b})$ : savoir que ${leS(S)} ${S.A.v} ne change rien, $${a}$ et $${b}$ sont indépendants (ici $P_{${a}}(${b}) = P_{${bar(a)}}(${b})$).`
        : `$P(${b}) \\neq P_{${a}}(${b})$ : $${a}$ et $${b}$ ne sont pas indépendants.`
    ),
  };
}

/** ★4 — Le dé truqué : on tire un dé dans une boîte, puis on le lance. */
const BOITES = [
  "Dans une boîte de jeux de société",
  "Au stand de la kermesse",
  "Dans le sac du jeu des petits chevaux",
  "Dans le tiroir du jeu de l'oie",
  "Sur la table de la soirée jeux du lycée",
  "Dans la trousse de Lucas, qui prépare un tour de magie",
];
function genDefiDes(): Q {
  const n = ri(3, 10);
  const k = ri(1, n - 1);
  const [tn, td] = pick([[1, 2], [1, 3], [2, 5], [1, 4], [3, 10], [3, 8]] as const);
  const lieu = pick(BOITES);
  // P(T∩6) = k·tn / (n·td) ; P(N∩6) = (n−k) / (6n) ; on met tout sur 6·n·td.
  const vT = 6 * k * tn, vN = (n - k) * td, den = 6 * n * td;
  const q = pick(["six", "truque", "normal"] as const);
  const consigne =
    q === "six"
      ? "On choisit un dé au hasard et on le lance. Quelle est la probabilité d'obtenir un six ?"
      : q === "truque"
        ? "On choisit un dé au hasard, on le lance, et on obtient un six. Quelle est la probabilité que ce dé soit truqué ?"
        : "On choisit un dé au hasard, on le lance, et on obtient un six. Quelle est la probabilité que ce dé soit un dé normal ?";
  const [num, d] = q === "six" ? [vT + vN, den] : q === "truque" ? [vT, vT + vN] : [vN, vT + vN];
  return {
    text: `${lieu}, il y a $${n}$ dés d'apparence identique, dont $${k}$ truqué${k > 1 ? "s" : ""} : avec un dé truqué, la probabilité d'obtenir six est $\\dfrac{${tn}}{${td}}$ ; avec un dé normal, elle est $\\dfrac{1}{6}$. On note $T$ « le dé est truqué » et $S$ « on obtient six ». ${consigne} (Donne la valeur exacte, en fraction.)`,
    format: "short",
    expected: ecritures(num, d),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      `Arbre : $P(T) = \\dfrac{${k}}{${n}}$, $P(\\overline{T}) = \\dfrac{${n - k}}{${n}}$ ; $P_T(S) = \\dfrac{${tn}}{${td}}$, $P_{\\overline{T}}(S) = \\dfrac{1}{6}$.`,
      q === "six" ? "Probabilités totales : $P(S) = P(T)P_T(S) + P(\\overline{T})P_{\\overline{T}}(S)$." : `Bayes : $P_S(${q === "truque" ? "T" : "\\overline{T}"}) = \\dfrac{P(${q === "truque" ? "T" : "\\overline{T}"} \\cap S)}{P(S)}$.`,
      `$P(T \\cap S) = \\dfrac{${k}}{${n}} \\times \\dfrac{${tn}}{${td}} = ${simpl(k * tn, n * td)}$ ; $P(\\overline{T} \\cap S) = \\dfrac{${n - k}}{${n}} \\times \\dfrac{1}{6} = ${simpl(n - k, 6 * n)}$ ; $P(S) = ${simpl(vT + vN, den)}$.`,
      q === "six" ? `$P(S) = ${simpl(num, d)}$.` : `$P_S(${q === "truque" ? "T" : "\\overline{T}"}) = \\dfrac{${q === "truque" ? simpl(k * tn, n * td).split(" = ")[0] : simpl(n - k, 6 * n).split(" = ")[0]}}{${simpl(vT + vN, den).split(" = ")[0]}} = ${simpl(num, d)}$.`
    ),
  };
}

/** ★5 — Deux tirages SANS remise : le second dépend du premier. */
type Sac = { intro: (x: number, y: number) => string; obj: string; f: boolean; X: string; Y: string; ex: string; ey: string };
const SACS: readonly Sac[] = [
  { intro: (x, y) => `Un sachet contient $${x}$ bonbons à la mangue et $${y}$ bonbons au letchi.`, obj: "bonbon", f: false, X: "M", Y: "L", ex: "à la mangue", ey: "au letchi" },
  { intro: (x, y) => `Une urne contient $${x}$ boules rouges et $${y}$ boules vertes.`, obj: "boule", f: true, X: "R", Y: "V", ex: "rouge", ey: "verte" },
  { intro: (x, y) => `Pour la tombola de la kermesse, une boîte contient $${x}$ tickets gagnants et $${y}$ tickets perdants.`, obj: "ticket", f: false, X: "G", Y: "P", ex: "gagnant", ey: "perdant" },
  { intro: (x, y) => `Une barquette de letchis vendue au bord de la route contient $${x}$ letchis abîmés et $${y}$ letchis sains.`, obj: "letchi", f: false, X: "A", Y: "S", ex: "abîmé", ey: "sain" },
  { intro: (x, y) => `Un sac de billes contient $${x}$ calots et $${y}$ billes ordinaires.`, obj: "bille", f: true, X: "C", Y: "O", ex: "un calot", ey: "une bille ordinaire" },
  { intro: (x, y) => `Dans un paquet de cartes de jeu, il reste $${x}$ cartes « bonus » et $${y}$ cartes ordinaires.`, obj: "carte", f: true, X: "B", Y: "O", ex: "« bonus »", ey: "ordinaire" },
  { intro: (x, y) => `Un professeur a dans sa trousse $${x}$ stylos rouges et $${y}$ stylos bleus.`, obj: "stylo", f: false, X: "R", Y: "B", ex: "rouge", ey: "bleu" },
  { intro: (x, y) => `Une boîte de samoussas contient $${x}$ samoussas au poulet et $${y}$ samoussas au thon.`, obj: "samoussa", f: false, X: "V", Y: "T", ex: "au poulet", ey: "au thon" },
];
function genDefiTirages(): Q {
  const S = pick(SACS);
  const x = ri(2, 9), y = ri(2, 9), n = x + y;
  const est = (e: string) => `est ${e}`;
  const [le1, le2, tire, un] = S.f ? ["la première", "la seconde", "tirée", "une"] : ["le premier", "le second", "tiré", "un"];
  const k = pick(["second", "premierSachant", "meme", "secondSachant"] as const);
  const X1 = `${S.X}_1`, X2 = `${S.X}_2`;
  const cas = {
    second: { q: `Quelle est la probabilité que ${le2} ${S.obj} ${tire} ${est(S.ex)} ?`, num: x * (x - 1) + y * x, den: n * (n - 1), cible: `P(${X2})`,
      calc: `$P(${X2}) = \\dfrac{${x}}{${n}} \\times \\dfrac{${x - 1}}{${n - 1}} + \\dfrac{${y}}{${n}} \\times \\dfrac{${x}}{${n - 1}} = \\dfrac{${x * (x - 1) + y * x}}{${n * (n - 1)}}$` },
    premierSachant: { q: `Sachant que ${le2} ${S.obj} ${tire} ${est(S.ex)}, quelle est la probabilité que ${le1} le soit aussi ?`, num: x * (x - 1), den: x * (x - 1) + y * x, cible: `P_{${X2}}(${X1})`,
      calc: `$P(${X1} \\cap ${X2}) = \\dfrac{${x}}{${n}} \\times \\dfrac{${x - 1}}{${n - 1}} = \\dfrac{${x * (x - 1)}}{${n * (n - 1)}}$ et $P(${X2}) = \\dfrac{${x * (x - 1) + y * x}}{${n * (n - 1)}}$, donc $P_{${X2}}(${X1}) = \\dfrac{${x * (x - 1)}}{${x * (x - 1) + y * x}}$` },
    meme: { q: `Quelle est la probabilité que les deux ${S.obj}s ${tire}s soient de la même sorte ?`, num: x * (x - 1) + y * (y - 1), den: n * (n - 1), cible: `P(\\text{même sorte})`,
      calc: `$\\dfrac{${x}}{${n}} \\times \\dfrac{${x - 1}}{${n - 1}} + \\dfrac{${y}}{${n}} \\times \\dfrac{${y - 1}}{${n - 1}} = \\dfrac{${x * (x - 1) + y * (y - 1)}}{${n * (n - 1)}}$` },
    secondSachant: { q: `${le1.charAt(0).toUpperCase() + le1.slice(1)} ${S.obj} ${tire} ${est(S.ex)}. Quelle est alors la probabilité que ${le2} le soit aussi ?`, num: x - 1, den: n - 1, cible: `P_{${X1}}(${X2})`,
      calc: `après le premier tirage, il reste $${n - 1}$ ${S.obj}s dont $${x - 1}$ de cette sorte : $P_{${X1}}(${X2}) = \\dfrac{${x - 1}}{${n - 1}}$` },
  }[k];
  return {
    text: `${S.intro(x, y)} On tire au hasard ${un} ${S.obj}, puis ${S.f ? "une seconde" : "un second"}, sans remettre ${le1}. On note $${X1}$ « ${le1} ${S.obj} ${tire} ${est(S.ex)} » et $${X2}$ « ${le2} ${S.obj} ${tire} ${est(S.ex)} ». ${cas.q} (Donne la valeur exacte, en fraction.)`,
    format: "short",
    expected: ecritures(cas.num, cas.den),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      `Sans remise, le second tirage DÉPEND du premier : sur l'arbre, $P(${X1}) = \\dfrac{${x}}{${n}}$, puis $P_{${X1}}(${X2}) = \\dfrac{${x - 1}}{${n - 1}}$ et $P_{${bar(X1)}}(${X2}) = \\dfrac{${x}}{${n - 1}}$.`,
      k === "premierSachant" ? "Bayes : la condition porte sur le SECOND tirage." : k === "secondSachant" ? "Une fois le premier tiré, on recompte ce qui reste." : "On additionne les chemins de l'arbre qui conviennent.",
      `${cas.calc}.`,
      `$${cas.cible} = ${simpl(cas.num, cas.den)}$.${k === "second" ? ` Surprise : c'est exactement $\\dfrac{${x}}{${n}}$, comme pour le premier tirage !` : ""}`
    ),
  };
}

/** ★5 — Type bac : partition en trois, puis Bayes. */
function genDefiTriBayes(): Q {
  const { T, parts, tx } = tirTri();
  const i = ri(0, 2);
  const taux = tx;
  const E = T.E;
  const den = parts.reduce((s, v, j) => s + v * taux[j], 0);
  const num = parts[i] * taux[i];
  const v = Math.round((100 * num) / den) / 100;
  const Li = T.L[i];
  const ev = T.Ev.v;
  return {
    text: `${texteTri(T, parts, tx)} On choisit ${T.f ? "une" : "un"} ${T.nom} qui ${ev}. Quelle est la probabilité ${T.f ? "qu'elle" : "qu'il"} soit ${T.parts[i].replace(/s( |$)/, "$1")} ? Autrement dit, calcule $P_{${E}}(${Li})$. (Arrondis au centième.)`,
    format: "short",
    expected: ecrArrondi(num, den),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      `La condition $${E}$ est au second niveau de l'arbre (trois branches au premier niveau : $${T.L.join("$, $")}$) : formule de Bayes.`,
      `$P_{${E}}(${Li}) = \\dfrac{P(${Li} \\cap ${E})}{P(${E})}$, avec $P(${E})$ par les probabilités totales sur la partition.`,
      `$P(${E}) = ${parts.map((p, j) => `${dl(p / 100)} \\times ${dl(taux[j] / 100)}`).join(" + ")} = ${dl(den / 10000)}$ ; $P(${Li} \\cap ${E}) = ${dl(parts[i] / 100)} \\times ${dl(taux[i] / 100)} = ${dl(num / 10000)}$. Donc $P_{${E}}(${Li}) = \\dfrac{${dl(num / 10000)}}{${dl(den / 10000)}} = ${simpl(num, den)}$.`,
      `$P_{${E}}(${Li}) ${exact(num, den) ? "=" : "\\approx"} ${dl(v)}$.`
    ),
  };
}

function tpl(
  id: string,
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  tag: string,
  generate: () => TutorGeneratedQuestionV4
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["terminale-spe", "probabilites", tag, "template"],
    generate,
  };
}

export const probabilitesConditionnellesBank: TutorBankItemV4[] = [
  /* =========================================================
     PROBA_CONDITIONNELLE_ARBRE — Construire / lire un arbre
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 1,
    theme: "neutral",
    text: "Sur un arbre pondéré, que vaut la somme des probabilités des branches issues d'un même nœud ?",
    format: "qcm",
    choices: ["$1$", "$0$", "$0{,}5$", "Cela dépend"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Les branches issues d'un nœud forment toutes les possibilités.",
    explanation: exp(
      "Les branches issues d'un même nœud représentent une partition des cas possibles.",
      "On somme les probabilités de toutes ces branches.",
      "Cette somme couvre tous les cas, elle vaut donc $1$.",
      "La somme des probabilités des branches issues d'un même nœud vaut $1$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Si $P(A) = 0{,}6$, que vaut $P(\\overline{A})$ ?",
    format: "qcm",
    choices: ["$0{,}4$", "$0{,}6$", "$1$", "$0{,}3$"],
    expected: ["$0{,}4$"],
    comparator: "mcq_exact",
    hint: "$P(A) + P(\\overline{A}) = 1$.",
    explanation: exp(
      "Un événement et son contraire ont des probabilités de somme $1$.",
      "On utilise $P(\\overline{A}) = 1 - P(A)$.",
      "$P(\\overline{A}) = 1 - 0{,}6 = 0{,}4$.",
      "$P(\\overline{A}) = 0{,}4$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un arbre pondéré, comment obtient-on la probabilité d'un chemin (par exemple $A$ puis $B$) ?",
    format: "qcm",
    choices: [
      "En multipliant les probabilités des branches du chemin",
      "En additionnant les probabilités des branches",
      "En prenant la plus grande",
      "En divisant les probabilités",
    ],
    expected: ["En multipliant les probabilités des branches du chemin"],
    comparator: "mcq_exact",
    hint: "Le long d'un chemin, on multiplie.",
    explanation: exp(
      "La probabilité d'un chemin se calcule le long des branches.",
      "On multiplie les probabilités rencontrées sur le chemin.",
      "$P(A \\cap B) = P(A) \\times P_A(B)$.",
      "On multiplie les probabilités des branches du chemin."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un arbre, $P(A) = 0{,}6$ et $P_A(B) = 0{,}5$. Que vaut $P(A \\cap B)$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$1{,}1$", "$0{,}5$", "$0{,}6$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    hint: "On multiplie le long du chemin : $P(A) \\times P_A(B)$.",
    explanation: exp(
      "La probabilité du chemin $A$ puis $B$ est un produit.",
      "On applique $P(A \\cap B) = P(A) \\times P_A(B)$.",
      "$P(A \\cap B) = 0{,}6 \\times 0{,}5 = 0{,}3$.",
      "$P(A \\cap B) = 0{,}3$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un arbre, $P_A(B) = 0{,}7$. Que vaut $P_A(\\overline{B})$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$0{,}7$", "$1$", "$0{,}5$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    hint: "Les deux branches issues de $A$ ont une somme égale à $1$.",
    explanation: exp(
      "Les branches issues du nœud $A$ ont une somme égale à $1$.",
      "On utilise $P_A(\\overline{B}) = 1 - P_A(B)$.",
      "$P_A(\\overline{B}) = 1 - 0{,}7 = 0{,}3$.",
      "$P_A(\\overline{B}) = 0{,}3$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un arbre, $P(\\overline{A}) = 0{,}4$ et $P_{\\overline{A}}(B) = 0{,}5$. Que vaut $P(\\overline{A} \\cap B)$ ?",
    format: "qcm",
    choices: ["$0{,}2$", "$0{,}9$", "$0{,}5$", "$0{,}4$"],
    expected: ["$0{,}2$"],
    comparator: "mcq_exact",
    hint: "On multiplie le long du chemin $\\overline{A}$ puis $B$.",
    explanation: exp(
      "La probabilité du chemin $\\overline{A}$ puis $B$ est un produit.",
      "On applique $P(\\overline{A} \\cap B) = P(\\overline{A}) \\times P_{\\overline{A}}(B)$.",
      "$P(\\overline{A} \\cap B) = 0{,}4 \\times 0{,}5 = 0{,}2$.",
      "$P(\\overline{A} \\cap B) = 0{,}2$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "D'après le tableau d'effectifs ci-dessous, combien d'individus possèdent à la fois le caractère $A$ et le caractère $B$ ?",
    format: "qcm",
    choices: ["$30$", "$50$", "$40$", "$20$"],
    expected: ["$30$"],
    comparator: "mcq_exact",
    canvas: tableauEffectifsCanvas,
    hint: "On lit la case croisant la ligne $A$ et la colonne $B$.",
    explanation: exp(
      "Un tableau croisé donne directement les effectifs de chaque intersection.",
      "On lit la case à l'intersection de la ligne $A$ et de la colonne $B$.",
      "Cette case contient $30$.",
      "$30$ individus possèdent à la fois $A$ et $B$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un arbre pondéré, les probabilités inscrites sur les branches du deuxième niveau sont des probabilités :",
    format: "qcm",
    choices: ["conditionnelles", "marginales", "totales", "impossibles"],
    expected: ["conditionnelles"],
    comparator: "mcq_exact",
    hint: "Elles dépendent de la branche du premier niveau déjà empruntée.",
    explanation: exp(
      "Le deuxième niveau d'un arbre se lit « sachant » le premier niveau.",
      "Ces probabilités dépendent de l'événement du premier niveau.",
      "Ce sont donc des probabilités conditionnelles, comme $P_A(B)$.",
      "Les branches du deuxième niveau portent des probabilités conditionnelles."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Si $P(A) = 0{,}2$, que vaut $P(\\overline{A})$ ?",
    format: "qcm",
    choices: ["$0{,}8$", "$0{,}2$", "$0{,}5$", "$1$"],
    expected: ["$0{,}8$"],
    comparator: "mcq_exact",
    hint: "$P(\\overline{A}) = 1 - P(A)$.",
    explanation: exp(
      "Un événement et son contraire ont des probabilités de somme $1$.",
      "On calcule $1 - P(A)$.",
      "$P(\\overline{A}) = 1 - 0{,}2 = 0{,}8$.",
      "$P(\\overline{A}) = 0{,}8$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer $P(A \\cap B)$ à partir d'un arbre, quelle formule utilise-t-on ?",
    format: "qcm",
    choices: [
      "$P(A \\cap B) = P(A) \\times P_A(B)$",
      "$P(A \\cap B) = P(A) + P_A(B)$",
      "$P(A \\cap B) = P(A) \\times P(B)$",
      "$P(A \\cap B) = \\dfrac{P(A)}{P_A(B)}$",
    ],
    expected: ["$P(A \\cap B) = P(A) \\times P_A(B)$"],
    comparator: "mcq_exact",
    hint: "On multiplie le long du chemin.",
    explanation: exp(
      "La probabilité d'une intersection se lit le long d'un chemin de l'arbre.",
      "On multiplie la probabilité de la première branche par la conditionnelle.",
      "$P(A \\cap B) = P(A) \\times P_A(B)$.",
      "La formule est $P(A \\cap B) = P(A) \\times P_A(B)$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_11",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "D'après l'arbre pondéré ci-dessous, que vaut $P_A(B)$ (probabilité inscrite sur la branche $B$ partant de $A$) ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}6$", "$0{,}25$", "$0{,}3$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    canvas: arbreABCanvas,
    hint: "On lit la branche $B$ qui part du nœud $A$.",
    explanation: exp(
      "Une probabilité conditionnelle se lit sur une branche du deuxième niveau.",
      "On suit le nœud $A$, puis la branche vers $B$.",
      "La branche $A \\to B$ porte $0{,}5$.",
      "$P_A(B) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_12",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "D'après l'arbre pondéré ci-dessous, que vaut $P(A \\cap B)$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$0{,}5$", "$0{,}6$", "$1{,}1$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    canvas: arbreABCanvas,
    hint: "On multiplie le long du chemin $A$ puis $B$ : $0{,}6 \\times 0{,}5$.",
    explanation: exp(
      "La probabilité d'un chemin est le produit des probabilités des branches.",
      "On suit le chemin $A$ puis $B$ : $P(A \\cap B) = P(A) \\times P_A(B)$.",
      "$P(A \\cap B) = 0{,}6 \\times 0{,}5 = 0{,}3$.",
      "$P(A \\cap B) = 0{,}3$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "canvas", "qcm"],
  },

  /* =========================================================
     PROBA_CONDITIONNELLE_FORMULE — Calculer P_A(B)
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de la probabilité conditionnelle $P_A(B)$ (avec $P(A) \\ne 0$) ?",
    format: "qcm",
    choices: [
      "$\\dfrac{P(A \\cap B)}{P(A)}$",
      "$\\dfrac{P(A \\cap B)}{P(B)}$",
      "$P(A) \\times P(B)$",
      "$\\dfrac{P(A)}{P(B)}$",
    ],
    expected: ["$\\dfrac{P(A \\cap B)}{P(A)}$"],
    comparator: "mcq_exact",
    hint: "On divise la probabilité de l'intersection par celle de l'événement « sachant ».",
    explanation: exp(
      "La probabilité conditionnelle se définit par un quotient.",
      "On divise $P(A \\cap B)$ par $P(A)$.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "La formule est $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 2,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}3$ et $P(A) = 0{,}6$. Que vaut $P_A(B)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}3$", "$0{,}18$", "$0{,}9$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    explanation: exp(
      "On applique la formule de la probabilité conditionnelle.",
      "On divise $P(A \\cap B)$ par $P(A)$.",
      "$P_A(B) = \\dfrac{0{,}3}{0{,}6} = 0{,}5$.",
      "$P_A(B) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}2$ et $P(A) = 0{,}5$. Que vaut $P_A(B)$ ?",
    format: "qcm",
    choices: ["$0{,}4$", "$0{,}25$", "$0{,}7$", "$0{,}1$"],
    expected: ["$0{,}4$"],
    comparator: "mcq_exact",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    explanation: exp(
      "On applique la formule de la probabilité conditionnelle.",
      "On divise $P(A \\cap B)$ par $P(A)$.",
      "$P_A(B) = \\dfrac{0{,}2}{0{,}5} = 0{,}4$.",
      "$P_A(B) = 0{,}4$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}15$ et $P(A) = 0{,}3$. Que vaut $P_A(B)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}45$", "$0{,}05$", "$0{,}2$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    explanation: exp(
      "On applique la formule de la probabilité conditionnelle.",
      "On divise $P(A \\cap B)$ par $P(A)$.",
      "$P_A(B) = \\dfrac{0{,}15}{0{,}3} = 0{,}5$.",
      "$P_A(B) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A) = 0{,}6$ et $P_A(B) = 0{,}5$. Que vaut $P(A \\cap B)$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$0{,}83$", "$1{,}1$", "$0{,}11$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    hint: "On « remonte » la formule : $P(A \\cap B) = P(A) \\times P_A(B)$.",
    explanation: exp(
      "On utilise la formule sous sa forme produit.",
      "$P(A \\cap B) = P(A) \\times P_A(B)$.",
      "$P(A \\cap B) = 0{,}6 \\times 0{,}5 = 0{,}3$.",
      "$P(A \\cap B) = 0{,}3$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 3,
    theme: "neutral",
    text: "D'après le tableau d'effectifs ci-dessous, que vaut $P_A(B)$ (probabilité de $B$ sachant $A$) ?",
    format: "qcm",
    choices: ["$0{,}6$", "$0{,}3$", "$0{,}75$", "$0{,}5$"],
    expected: ["$0{,}6$"],
    comparator: "mcq_exact",
    canvas: tableauEffectifsCanvas,
    hint: "Parmi les $50$ individus de $A$, combien sont aussi dans $B$ ? Divise.",
    explanation: exp(
      "Sachant $A$, on se restreint à la ligne $A$ du tableau.",
      "On divise l'effectif de $A \\cap B$ par l'effectif total de $A$.",
      "$P_A(B) = \\dfrac{30}{50} = 0{,}6$.",
      "$P_A(B) = 0{,}6$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}24$ et $P(A) = 0{,}4$. Que vaut $P_A(B)$ ?",
    format: "qcm",
    choices: ["$0{,}6$", "$0{,}096$", "$0{,}16$", "$0{,}64$"],
    expected: ["$0{,}6$"],
    comparator: "mcq_exact",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    explanation: exp(
      "On applique la formule de la probabilité conditionnelle.",
      "On divise $P(A \\cap B)$ par $P(A)$.",
      "$P_A(B) = \\dfrac{0{,}24}{0{,}4} = 0{,}6$.",
      "$P_A(B) = 0{,}6$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 2,
    theme: "neutral",
    text: "Dans $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$, par quoi divise-t-on $P(A \\cap B)$ ?",
    format: "qcm",
    choices: ["$P(A)$", "$P(B)$", "$P(A \\cup B)$", "$P(\\overline{A})$"],
    expected: ["$P(A)$"],
    comparator: "mcq_exact",
    hint: "On divise par la probabilité de l'événement qui suit « sachant ».",
    explanation: exp(
      "La conditionnelle « sachant $A$ » se restreint à l'univers $A$.",
      "On divise donc par la probabilité de l'événement « sachant », c'est-à-dire $P(A)$.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "On divise par $P(A)$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}21$ et $P(A) = 0{,}7$. Que vaut $P_A(B)$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$0{,}147$", "$0{,}49$", "$0{,}9$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    explanation: exp(
      "On applique la formule de la probabilité conditionnelle.",
      "On divise $P(A \\cap B)$ par $P(A)$.",
      "$P_A(B) = \\dfrac{0{,}21}{0{,}7} = 0{,}3$.",
      "$P_A(B) = 0{,}3$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_proba_cond_formule_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 3,
    theme: "neutral",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    tags: ["terminale-spe", "probabilites", "formule", "template"],
    generate: genFormuleRoles,
  },

  /* =========================================================
     PROBA_TOTALES — Formule des probabilités totales
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 2,
    theme: "neutral",
    text: "Avec la partition $\\{A\\,;\\overline{A}\\}$, quelle est la formule des probabilités totales pour $P(B)$ ?",
    format: "qcm",
    choices: [
      "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$",
      "$P(B) = P(A \\cap B) \\times P(\\overline{A} \\cap B)$",
      "$P(B) = P(A) + P(B)$",
      "$P(B) = P(A \\cap B) - P(\\overline{A} \\cap B)$",
    ],
    expected: ["$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$"],
    comparator: "mcq_exact",
    hint: "On additionne les deux chemins qui mènent à $B$.",
    explanation: exp(
      "$B$ se réalise soit avec $A$, soit avec $\\overline{A}$.",
      "On additionne les probabilités des deux chemins menant à $B$.",
      "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
      "La formule est $P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}3$ et $P(\\overline{A} \\cap B) = 0{,}2$. Que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}06$", "$0{,}1$", "$0{,}25$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "On additionne les deux chemins menant à $B$.",
    explanation: exp(
      "On applique la formule des probabilités totales.",
      "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
      "$P(B) = 0{,}3 + 0{,}2 = 0{,}5$.",
      "$P(B) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A) = 0{,}6$, $P_A(B) = 0{,}5$, $P(\\overline{A}) = 0{,}4$ et $P_{\\overline{A}}(B) = 0{,}25$. Que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}4$", "$0{,}75$", "$0{,}3$", "$0{,}5$"],
    expected: ["$0{,}4$"],
    comparator: "mcq_exact",
    hint: "$P(B) = P(A)P_A(B) + P(\\overline{A})P_{\\overline{A}}(B)$.",
    explanation: exp(
      "On combine probabilités totales et formule du produit.",
      "$P(B) = P(A) \\times P_A(B) + P(\\overline{A}) \\times P_{\\overline{A}}(B)$.",
      "$P(B) = 0{,}6 \\times 0{,}5 + 0{,}4 \\times 0{,}25 = 0{,}3 + 0{,}1 = 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 3,
    theme: "neutral",
    text: "La formule des probabilités totales décompose $P(B)$ selon :",
    format: "qcm",
    choices: [
      "une partition de l'univers (par exemple $A$ et $\\overline{A}$)",
      "la plus grande probabilité",
      "le produit $P(A) \\times P(B)$",
      "une seule branche de l'arbre",
    ],
    expected: ["une partition de l'univers (par exemple $A$ et $\\overline{A}$)"],
    comparator: "mcq_exact",
    hint: "On découpe l'univers en cas complémentaires.",
    explanation: exp(
      "Les probabilités totales reposent sur une partition de l'univers.",
      "On décompose $B$ selon tous les cas possibles d'une partition.",
      "Avec $\\{A\\,;\\overline{A}\\}$ : $P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
      "On décompose selon une partition de l'univers."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 3,
    theme: "neutral",
    text: "D'après le tableau d'effectifs ci-dessous, que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}4$", "$0{,}3$", "$0{,}6$", "$0{,}5$"],
    expected: ["$0{,}4$"],
    comparator: "mcq_exact",
    canvas: tableauEffectifsCanvas,
    hint: "Effectif total de $B$ divisé par l'effectif total.",
    explanation: exp(
      "La probabilité de $B$ est sa fréquence sur l'ensemble.",
      "On divise le total de la colonne $B$ par l'effectif total.",
      "$P(B) = \\dfrac{40}{100} = 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A) = 0{,}3$, $P_A(B) = 0{,}8$, $P(\\overline{A}) = 0{,}7$ et $P_{\\overline{A}}(B) = 0{,}2$. Que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}38$", "$0{,}5$", "$0{,}24$", "$0{,}14$"],
    expected: ["$0{,}38$"],
    comparator: "mcq_exact",
    hint: "$P(B) = P(A)P_A(B) + P(\\overline{A})P_{\\overline{A}}(B)$.",
    explanation: exp(
      "On applique la formule des probabilités totales.",
      "$P(B) = 0{,}3 \\times 0{,}8 + 0{,}7 \\times 0{,}2$.",
      "$P(B) = 0{,}24 + 0{,}14 = 0{,}38$.",
      "$P(B) = 0{,}38$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}12$ et $P(\\overline{A} \\cap B) = 0{,}28$. Que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}4$", "$0{,}16$", "$0{,}034$", "$0{,}2$"],
    expected: ["$0{,}4$"],
    comparator: "mcq_exact",
    hint: "On additionne les deux chemins menant à $B$.",
    explanation: exp(
      "On applique la formule des probabilités totales.",
      "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
      "$P(B) = 0{,}12 + 0{,}28 = 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 5,
    theme: "neutral",
    text: "Une usine a deux machines : $A$ (60 % de la production, 2 % de défauts) et $\\overline{A}$ (40 %, 5 % de défauts). Quelle est la probabilité $P(D)$ qu'une pièce soit défectueuse ?",
    format: "qcm",
    choices: ["$0{,}032$", "$0{,}07$", "$0{,}02$", "$0{,}05$"],
    expected: ["$0{,}032$"],
    comparator: "mcq_exact",
    hint: "$P(D) = 0{,}6 \\times 0{,}02 + 0{,}4 \\times 0{,}05$.",
    explanation: exp(
      "On applique la formule des probabilités totales avec la partition $\\{A\\,;\\overline{A}\\}$.",
      "$P(D) = P(A) \\times P_A(D) + P(\\overline{A}) \\times P_{\\overline{A}}(D)$.",
      "$P(D) = 0{,}6 \\times 0{,}02 + 0{,}4 \\times 0{,}05 = 0{,}012 + 0{,}02 = 0{,}032$.",
      "$P(D) = 0{,}032$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}25$ et $P(\\overline{A} \\cap B) = 0{,}25$. Que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}0625$", "$0{,}25$", "$1$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "On additionne les deux chemins menant à $B$.",
    explanation: exp(
      "On applique la formule des probabilités totales.",
      "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
      "$P(B) = 0{,}25 + 0{,}25 = 0{,}5$.",
      "$P(B) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_proba_totales_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 3,
    theme: "neutral",
    hint: "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
    tags: ["terminale-spe", "probabilites", "totales", "template"],
    generate: genTotalesArbre,
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 4,
    theme: "neutral",
    text: "D'après l'arbre pondéré ci-dessous, que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}4$", "$0{,}3$", "$0{,}1$", "$0{,}75$"],
    expected: ["$0{,}4$"],
    comparator: "mcq_exact",
    canvas: arbreABCanvas,
    hint: "Additionne les deux chemins menant à $B$ : $A \\to B$ et $\\overline{A} \\to B$.",
    explanation: exp(
      "On applique la formule des probabilités totales en additionnant les chemins vers $B$.",
      "$P(B) = P(A) \\times P_A(B) + P(\\overline{A}) \\times P_{\\overline{A}}(B)$.",
      "$P(B) = 0{,}6 \\times 0{,}5 + 0{,}4 \\times 0{,}25 = 0{,}3 + 0{,}1 = 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "arbre", "canvas", "qcm"],
  },

  /* =========================================================
     PROBA_INVERSE_BAYES — Inverser une conditionnelle
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de $P_B(A)$ (avec $P(B) \\ne 0$) ?",
    format: "qcm",
    choices: [
      "$\\dfrac{P(A \\cap B)}{P(B)}$",
      "$\\dfrac{P(A \\cap B)}{P(A)}$",
      "$P(A) \\times P(B)$",
      "$\\dfrac{P(B)}{P(A)}$",
    ],
    expected: ["$\\dfrac{P(A \\cap B)}{P(B)}$"],
    comparator: "mcq_exact",
    hint: "« Sachant $B$ » : on divise par $P(B)$.",
    explanation: exp(
      "Inverser le conditionnement échange le rôle des événements.",
      "Pour $P_B(A)$, on divise $P(A \\cap B)$ par $P(B)$.",
      "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
      "La formule est $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}3$ et $P(B) = 0{,}5$. Que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$0{,}6$", "$0{,}15$", "$0{,}5$", "$0{,}3$"],
    expected: ["$0{,}6$"],
    comparator: "mcq_exact",
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
    explanation: exp(
      "On applique la formule de la conditionnelle inversée.",
      "On divise $P(A \\cap B)$ par $P(B)$.",
      "$P_B(A) = \\dfrac{0{,}3}{0{,}5} = 0{,}6$.",
      "$P_B(A) = 0{,}6$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 3,
    theme: "neutral",
    text: "Inverser une probabilité conditionnelle, c'est passer de :",
    format: "qcm",
    choices: [
      "$P_A(B)$ à $P_B(A)$",
      "$P(A)$ à $P(\\overline{A})$",
      "$P(A \\cap B)$ à $P(A \\cup B)$",
      "$P(B)$ à $P(A)$",
    ],
    expected: ["$P_A(B)$ à $P_B(A)$"],
    comparator: "mcq_exact",
    hint: "On échange ce qui est « su » et ce qui est cherché.",
    explanation: exp(
      "Inverser le conditionnement échange les rôles des deux événements.",
      "On passe de « $B$ sachant $A$ » à « $A$ sachant $B$ ».",
      "C'est passer de $P_A(B)$ à $P_B(A)$.",
      "On passe de $P_A(B)$ à $P_B(A)$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 3,
    theme: "neutral",
    text: "D'après le tableau d'effectifs ci-dessous, que vaut $P_B(A)$ (probabilité de $A$ sachant $B$) ?",
    format: "qcm",
    choices: ["$0{,}75$", "$0{,}6$", "$0{,}3$", "$0{,}4$"],
    expected: ["$0{,}75$"],
    comparator: "mcq_exact",
    canvas: tableauEffectifsCanvas,
    hint: "Parmi les $40$ individus de $B$, combien sont aussi dans $A$ ?",
    explanation: exp(
      "Sachant $B$, on se restreint à la colonne $B$ du tableau.",
      "On divise l'effectif de $A \\cap B$ par l'effectif total de $B$.",
      "$P_B(A) = \\dfrac{30}{40} = 0{,}75$.",
      "$P_B(A) = 0{,}75$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}2$ et $P(B) = 0{,}4$. Que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}08$", "$0{,}2$", "$0{,}6$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
    explanation: exp(
      "On applique la formule de la conditionnelle inversée.",
      "On divise $P(A \\cap B)$ par $P(B)$.",
      "$P_B(A) = \\dfrac{0{,}2}{0{,}4} = 0{,}5$.",
      "$P_B(A) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 4,
    theme: "neutral",
    text: "On sait que $P(A \\cap B) = 0{,}18$ et $P(B) = 0{,}6$. Que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$0{,}108$", "$0{,}42$", "$0{,}78$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
    explanation: exp(
      "On applique la formule de la conditionnelle inversée.",
      "On divise $P(A \\cap B)$ par $P(B)$.",
      "$P_B(A) = \\dfrac{0{,}18}{0{,}6} = 0{,}3$.",
      "$P_B(A) = 0{,}3$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 5,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}3$, et par les probabilités totales $P(B) = 0{,}4$. Que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$0{,}75$", "$0{,}12$", "$0{,}7$", "$0{,}6$"],
    expected: ["$0{,}75$"],
    comparator: "mcq_exact",
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$, avec $P(B)$ déjà calculé.",
    explanation: exp(
      "On utilise $P(B)$ obtenu par les probabilités totales, puis on inverse.",
      "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
      "$P_B(A) = \\dfrac{0{,}3}{0{,}4} = 0{,}75$.",
      "$P_B(A) = 0{,}75$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 3,
    theme: "neutral",
    text: "A-t-on toujours $P_A(B) = P_B(A)$ ?",
    format: "qcm",
    choices: [
      "Non, en général ce sont des nombres différents",
      "Oui, toujours",
      "Oui, si $A = B$ seulement c'est faux",
      "Cela n'a pas de sens",
    ],
    expected: ["Non, en général ce sont des nombres différents"],
    comparator: "mcq_exact",
    hint: "Les dénominateurs $P(A)$ et $P(B)$ diffèrent en général.",
    explanation: exp(
      "Les deux conditionnelles ont des dénominateurs différents.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ et $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
      "Comme $P(A) \\ne P(B)$ en général, les deux résultats diffèrent.",
      "Non : en général $P_A(B) \\ne P_B(A)$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}1$ et $P(B) = 0{,}5$. Que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$0{,}2$", "$0{,}05$", "$0{,}5$", "$0{,}4$"],
    expected: ["$0{,}2$"],
    comparator: "mcq_exact",
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
    explanation: exp(
      "On applique la formule de la conditionnelle inversée.",
      "On divise $P(A \\cap B)$ par $P(B)$.",
      "$P_B(A) = \\dfrac{0{,}1}{0{,}5} = 0{,}2$.",
      "$P_B(A) = 0{,}2$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_proba_bayes_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 3,
    theme: "neutral",
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
    tags: ["terminale-spe", "probabilites", "bayes", "template"],
    generate: genBayesQuotient,
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 5,
    theme: "neutral",
    text: "D'après l'arbre pondéré ci-dessous (où $P(A \\cap B) = 0{,}3$ et $P(B) = 0{,}4$), que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$0{,}75$", "$0{,}5$", "$0{,}3$", "$0{,}4$"],
    expected: ["$0{,}75$"],
    comparator: "mcq_exact",
    canvas: arbreABCanvas,
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0{,}3}{0{,}4}$.",
    explanation: exp(
      "On inverse le conditionnement à partir des valeurs lues/calculées sur l'arbre.",
      "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
      "$P_B(A) = \\dfrac{0{,}3}{0{,}4} = 0{,}75$.",
      "$P_B(A) = 0{,}75$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "arbre", "canvas", "qcm"],
  },

  /* =========================================================
     PROBA_CONDITIONNELLE_DEFI — Type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un test de dépistage : $P(M) = 0{,}1$ (malade), $P_M(T) = 0{,}9$ (test positif si malade). Que vaut $P(M \\cap T)$ ?",
    format: "qcm",
    choices: ["$0{,}09$", "$0{,}9$", "$0{,}1$", "$0{,}19$"],
    expected: ["$0{,}09$"],
    comparator: "mcq_exact",
    hint: "$P(M \\cap T) = P(M) \\times P_M(T)$.",
    explanation: exp(
      "On calcule la probabilité du chemin « malade » puis « test positif ».",
      "$P(M \\cap T) = P(M) \\times P_M(T)$.",
      "$P(M \\cap T) = 0{,}1 \\times 0{,}9 = 0{,}09$.",
      "$P(M \\cap T) = 0{,}09$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Test : $P(M) = 0{,}1$, $P_M(T) = 0{,}9$, $P(\\overline{M}) = 0{,}9$, $P_{\\overline{M}}(T) = 0{,}2$. Que vaut $P(T)$ ?",
    format: "qcm",
    choices: ["$0{,}27$", "$0{,}09$", "$0{,}18$", "$0{,}11$"],
    expected: ["$0{,}27$"],
    comparator: "mcq_exact",
    hint: "$P(T) = P(M)P_M(T) + P(\\overline{M})P_{\\overline{M}}(T)$.",
    explanation: exp(
      "On applique la formule des probabilités totales avec la partition $\\{M\\,;\\overline{M}\\}$.",
      "$P(T) = P(M) \\times P_M(T) + P(\\overline{M}) \\times P_{\\overline{M}}(T)$.",
      "$P(T) = 0{,}1 \\times 0{,}9 + 0{,}9 \\times 0{,}2 = 0{,}09 + 0{,}18 = 0{,}27$.",
      "$P(T) = 0{,}27$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Test (suite) : $P(M \\cap T) = 0{,}09$ et $P(T) = 0{,}27$. Quelle est la probabilité $P_T(M)$ d'être malade sachant que le test est positif ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{3}$", "$0{,}9$", "$\\dfrac{2}{3}$", "$0{,}09$"],
    expected: ["$\\dfrac{1}{3}$"],
    comparator: "mcq_exact",
    hint: "$P_T(M) = \\dfrac{P(M \\cap T)}{P(T)} = \\dfrac{0{,}09}{0{,}27}$.",
    explanation: exp(
      "On inverse le conditionnement pour répondre à la question.",
      "$P_T(M) = \\dfrac{P(M \\cap T)}{P(T)}$.",
      "$P_T(M) = \\dfrac{0{,}09}{0{,}27} = \\dfrac{1}{3}$.",
      "$P_T(M) = \\dfrac{1}{3}$ : un test positif ne signifie pas toujours « malade » !"
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Deux événements $A$ et $B$ sont indépendants si :",
    format: "qcm",
    choices: [
      "$P(A \\cap B) = P(A) \\times P(B)$",
      "$P(A \\cap B) = P(A) + P(B)$",
      "$P(A) = P(B)$",
      "$P_A(B) = 0$",
    ],
    expected: ["$P(A \\cap B) = P(A) \\times P(B)$"],
    comparator: "mcq_exact",
    hint: "Pour des événements indépendants, le « sachant » ne change rien.",
    explanation: exp(
      "L'indépendance signifie que connaître $A$ ne modifie pas la probabilité de $B$.",
      "Cela se traduit par $P(A \\cap B) = P(A) \\times P(B)$.",
      "On a alors aussi $P_A(B) = P(B)$.",
      "$A$ et $B$ sont indépendants si $P(A \\cap B) = P(A) \\times P(B)$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "independance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On a $P(A) = 0{,}5$, $P(B) = 0{,}4$ et $P(A \\cap B) = 0{,}2$. Les événements $A$ et $B$ sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "Oui, car $P(A) \\times P(B) = P(A \\cap B)$",
      "Non, car $P(A) \\ne P(B)$",
      "Non, car $P(A \\cap B) \\ne 0$",
      "Oui, car $P(A \\cap B) < P(A)$",
    ],
    expected: ["Oui, car $P(A) \\times P(B) = P(A \\cap B)$"],
    comparator: "mcq_exact",
    hint: "Compare $P(A) \\times P(B)$ avec $P(A \\cap B)$.",
    explanation: exp(
      "On teste le critère d'indépendance.",
      "On calcule $P(A) \\times P(B) = 0{,}5 \\times 0{,}4 = 0{,}2$.",
      "Or $P(A \\cap B) = 0{,}2$ : les deux sont égaux.",
      "Oui, $A$ et $B$ sont indépendants."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "independance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "D'après le tableau d'effectifs ci-dessous, quelle est la probabilité $P(A)$ qu'un individu pris au hasard possède le caractère $A$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}3$", "$0{,}4$", "$0{,}6$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    canvas: tableauEffectifsCanvas,
    hint: "Effectif total de la ligne $A$ divisé par l'effectif total.",
    explanation: exp(
      "La probabilité de $A$ est sa fréquence sur l'ensemble.",
      "On divise le total de la ligne $A$ par l'effectif total.",
      "$P(A) = \\dfrac{50}{100} = 0{,}5$.",
      "$P(A) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une urne : $P(\\text{boule rouge}) = 0{,}4$. Sachant rouge, $P(\\text{gagnant}) = 0{,}5$. Sachant non rouge, $P(\\text{gagnant}) = 0{,}1$. Quelle est la probabilité de gagner ?",
    format: "qcm",
    choices: ["$0{,}26$", "$0{,}2$", "$0{,}5$", "$0{,}06$"],
    expected: ["$0{,}26$"],
    comparator: "mcq_exact",
    hint: "$P(G) = 0{,}4 \\times 0{,}5 + 0{,}6 \\times 0{,}1$.",
    explanation: exp(
      "On applique la formule des probabilités totales.",
      "$P(G) = P(R) \\times P_R(G) + P(\\overline{R}) \\times P_{\\overline{R}}(G)$.",
      "$P(G) = 0{,}4 \\times 0{,}5 + 0{,}6 \\times 0{,}1 = 0{,}2 + 0{,}06 = 0{,}26$.",
      "$P(G) = 0{,}26$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Si $A$ et $B$ sont indépendants avec $P(A) = 0{,}3$ et $P(B) = 0{,}5$, que vaut $P(A \\cap B)$ ?",
    format: "qcm",
    choices: ["$0{,}15$", "$0{,}8$", "$0{,}2$", "$0{,}35$"],
    expected: ["$0{,}15$"],
    comparator: "mcq_exact",
    hint: "Pour des événements indépendants, $P(A \\cap B) = P(A) \\times P(B)$.",
    explanation: exp(
      "Pour des événements indépendants, l'intersection est le produit.",
      "$P(A \\cap B) = P(A) \\times P(B)$.",
      "$P(A \\cap B) = 0{,}3 \\times 0{,}5 = 0{,}15$.",
      "$P(A \\cap B) = 0{,}15$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "independance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi, dans un dépistage, une forte probabilité $P_M(T)$ ne garantit-elle pas une forte probabilité $P_T(M)$ ?",
    format: "qcm",
    choices: [
      "Car $P_T(M)$ dépend aussi de $P(M)$, souvent faible",
      "Car $P_M(T) = P_T(M)$ toujours",
      "Car le test est forcément faux",
      "Car $P(T) = 1$",
    ],
    expected: ["Car $P_T(M)$ dépend aussi de $P(M)$, souvent faible"],
    comparator: "mcq_exact",
    hint: "Pense à l'influence de la rareté de la maladie $P(M)$.",
    explanation: exp(
      "Inverser une conditionnelle fait intervenir les probabilités de départ.",
      "$P_T(M) = \\dfrac{P(M) \\times P_M(T)}{P(T)}$ dépend fortement de $P(M)$.",
      "Si la maladie est rare ($P(M)$ faible), $P_T(M)$ reste faible malgré un bon test.",
      "Car $P_T(M)$ dépend aussi de $P(M)$, souvent faible."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On a $P(A) = 0{,}2$, $P_A(B) = 0{,}5$, $P(\\overline{A}) = 0{,}8$, $P_{\\overline{A}}(B) = 0{,}25$. Que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{3}$", "$0{,}1$", "$0{,}5$", "$\\dfrac{2}{3}$"],
    expected: ["$\\dfrac{1}{3}$"],
    comparator: "mcq_exact",
    hint: "Calcule d'abord $P(A \\cap B)$ et $P(B)$, puis $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
    explanation: exp(
      "On enchaîne produit, probabilités totales, puis inversion.",
      "$P(A \\cap B) = 0{,}2 \\times 0{,}5 = 0{,}1$ ; $P(B) = 0{,}1 + 0{,}8 \\times 0{,}25 = 0{,}1 + 0{,}2 = 0{,}3$.",
      "$P_B(A) = \\dfrac{0{,}1}{0{,}3} = \\dfrac{1}{3}$.",
      "$P_B(A) = \\dfrac{1}{3}$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "bayes", "qcm"],
  },
  /* ═══════ 15/10/2026 — les gabarits à situations (voir l'en-tête) ═══════ */

  // proba_conditionnelle_arbre
  tpl("terminale_spe_proba_cond_arbre_tpl_branche", "proba_conditionnelle_arbre", 1, "Les branches issues d'un même nœud ont une somme égale à $1$.", "arbre", genArbreBranche),
  tpl("terminale_spe_proba_cond_arbre_tpl_branche_2", "proba_conditionnelle_arbre", 2, "Les branches issues d'un même nœud ont une somme égale à $1$.", "arbre", genArbreBranche),
  tpl("terminale_spe_proba_cond_arbre_tpl_chemin", "proba_conditionnelle_arbre", 2, "Le long d'un chemin, on multiplie les probabilités des branches.", "arbre", genArbreChemin),
  tpl("terminale_spe_proba_cond_arbre_tpl_traduire", "proba_conditionnelle_arbre", 3, "« Parmi les … » : c'est la condition. « … et … » : une intersection.", "arbre", genArbreTraduire),
  tpl("terminale_spe_proba_cond_arbre_tpl_chemin_3", "proba_conditionnelle_arbre", 3, "Le long d'un chemin, on multiplie les probabilités des branches.", "arbre", genArbreChemin),
  tpl("terminale_spe_proba_cond_arbre_tpl_completer", "proba_conditionnelle_arbre", 4, "$P_X(Y) = \\dfrac{P(X \\cap Y)}{P(X)}$.", "arbre", genArbreCompleter),
  tpl("terminale_spe_proba_cond_arbre_tpl_traduire_4", "proba_conditionnelle_arbre", 4, "« Parmi les … » : c'est la condition. « … et … » : une intersection.", "arbre", genArbreTraduire),

  // proba_conditionnelle_formule
  tpl("terminale_spe_proba_cond_formule_tpl_quotient", "proba_conditionnelle_formule", 2, "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.", "formule", genFormuleQuotient),
  tpl("terminale_spe_proba_cond_formule_tpl_quotient_3", "proba_conditionnelle_formule", 3, "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.", "formule", genFormuleQuotient),
  tpl("terminale_spe_proba_cond_formule_tpl_roles_4", "proba_conditionnelle_formule", 4, "$P(A \\cap B) = P(A) \\times P_A(B)$ : isole l'inconnue.", "formule", genFormuleRoles),
  tpl("terminale_spe_proba_cond_formule_tpl_detour", "proba_conditionnelle_formule", 4, "La condition va au dénominateur ; $P(\\overline{X} \\cap Y) = P(Y) - P(X \\cap Y)$.", "formule", genFormuleDetour),

  // proba_totales
  tpl("terminale_spe_proba_totales_tpl_somme", "proba_totales", 2, "On additionne les deux chemins qui mènent à l'évènement.", "totales", genTotalesSomme),
  tpl("terminale_spe_proba_totales_tpl_somme_3", "proba_totales", 3, "On additionne les deux chemins qui mènent à l'évènement.", "totales", genTotalesSomme),
  tpl("terminale_spe_proba_totales_tpl_arbre_4", "proba_totales", 4, "$P(B) = P(A)P_A(B) + P(\\overline{A})P_{\\overline{A}}(B)$.", "totales", genTotalesArbre),
  tpl("terminale_spe_proba_totales_tpl_tri", "proba_totales", 4, "Une partition en trois : trois chemins à additionner.", "totales", genTotalesTri),
  tpl("terminale_spe_proba_totales_tpl_tri_5", "proba_totales", 5, "Une partition en trois : trois chemins à additionner.", "totales", genTotalesTri),
  tpl("terminale_spe_proba_totales_tpl_inverse", "proba_totales", 5, "Écris la formule des probabilités totales avec l'inconnue, puis résous.", "totales", genTotalesInverse),

  // proba_inverse_bayes
  tpl("terminale_spe_proba_bayes_tpl_traduire", "proba_inverse_bayes", 2, "Dans $P_X(Y)$, $X$ est ce que l'on sait déjà.", "bayes", genBayesTraduire),
  tpl("terminale_spe_proba_bayes_tpl_quotient_2", "proba_inverse_bayes", 2, "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.", "bayes", genBayesQuotient),
  tpl("terminale_spe_proba_bayes_tpl_arbre", "proba_inverse_bayes", 4, "D'abord $P(B)$ par les probabilités totales, puis $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.", "bayes", genBayesArbre),
  tpl("terminale_spe_proba_bayes_tpl_depistage_4", "proba_inverse_bayes", 4, "Arbre : l'état au premier niveau, le test au second. Puis Bayes.", "bayes", genBayesDepistage),
  tpl("terminale_spe_proba_bayes_tpl_depistage", "proba_inverse_bayes", 5, "Arbre : l'état au premier niveau, le test au second. Puis Bayes.", "bayes", genBayesDepistage),
  tpl("terminale_spe_proba_bayes_tpl_arbre_5", "proba_inverse_bayes", 5, "D'abord $P(B)$ par les probabilités totales, puis $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.", "bayes", genBayesArbre),

  // proba_conditionnelle_defi
  tpl("terminale_spe_proba_cond_defi_tpl_indep", "proba_conditionnelle_defi", 4, "Indépendants si $P_A(B) = P(B)$.", "type_bac", genDefiIndep),
  tpl("terminale_spe_proba_cond_defi_tpl_des", "proba_conditionnelle_defi", 4, "Arbre : le dé (truqué ou non), puis le six.", "type_bac", genDefiDes),
  tpl("terminale_spe_proba_cond_defi_tpl_tirages", "proba_conditionnelle_defi", 5, "Sans remise : au second tirage, on recompte ce qui reste.", "type_bac", genDefiTirages),
  tpl("terminale_spe_proba_cond_defi_tpl_tri_bayes", "proba_conditionnelle_defi", 5, "Probabilités totales sur la partition, puis Bayes.", "type_bac", genDefiTriBayes),
  tpl("terminale_spe_proba_cond_defi_tpl_des_5", "proba_conditionnelle_defi", 5, "Arbre : le dé (truqué ou non), puis le six.", "type_bac", genDefiDes),
];
