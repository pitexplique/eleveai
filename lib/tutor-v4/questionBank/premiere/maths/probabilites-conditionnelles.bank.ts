// lib/tutor-v4/questionBank/premiere/maths/probabilites-conditionnelles.bank.ts
//
// Notions : alea_conditionnelle, alea_conditionnelle_calcul, alea_independance
//           (domaine BOP1AL — Phénomènes aléatoires)
//
// L'exercice 1 des six sujets de juin 2026, sans exception : un tableau croisé
// d'effectifs, des probabilités conditionnelles, et la question finale
// « ces évènements sont-ils indépendants ? ».
//   - 120 sportifs de haut niveau, judo ou natation, par niveau de classe
//     (Métropole) ;
//   - 1 000 clients d'une compagnie aérienne, satisfaits ou non, ayant acheté
//     en agence ou sur internet (Centres étrangers) ;
//   - 1 000 lycéens favorables ou défavorables à un projet (Asie).
//
// Les effectifs sont générés pour que les fractions tombent juste. La réponse
// est acceptée sous plusieurs écritures — la fraction brute lue dans le
// tableau, la fraction simplifiée, et le décimal quand il est fini : un élève
// qui répond $\frac{40}{120}$ a compris autant que celui qui répond
// $\frac{1}{3}$, et les sujets demandent d'ailleurs « sous forme de fraction ».

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

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
  const arrondi = Math.round(n * 1000000) / 1000000;
  return String(arrondi).replace(".", ",");
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  const distracteurs = Array.from(new Set(wrongs)).filter((w) => w !== correct);
  return shuffle([correct, ...distracteurs.slice(0, 3)]);
}

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}

// Toutes les écritures acceptables d'une probabilité num/den : la fraction lue
// dans le tableau, la fraction simplifiée, et le décimal s'il est fini.
function reponsesProba(num: number, den: number): string[] {
  const d = pgcd(num, den);
  const formes = new Set<string>([`${num}/${den}`, `${num / d}/${den / d}`]);
  const valeur = num / den;
  if (Number.isFinite(valeur) && String(valeur).length <= 8) formes.add(fr(valeur));
  return [...formes];
}

function fraction(num: number, den: number): string {
  return `$\\dfrac{${num}}{${den}}$`;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/* ── Situations à deux caractères, telles qu'elles tombent aux sujets ── */

type Situation = {
  intro: string;
  /** Caractère en ligne : « pratique le judo ». */
  ligneNom: string;
  ligneA: string;
  ligneB: string;
  /** Caractère en colonne : « est en seconde ». */
  colonneA: string;
  colonneB: string;
  individu: string;
};

const SITUATIONS: readonly Situation[] = [
  {
    intro: "Dans un lycée, on interroge les élèves inscrits à une section sportive.",
    ligneNom: "section",
    ligneA: "judo",
    ligneB: "natation",
    colonneA: "en seconde",
    colonneB: "en terminale",
    individu: "élève",
  },
  {
    intro: "Une compagnie aérienne interroge ses clients après leur voyage.",
    ligneNom: "achat",
    ligneA: "sur internet",
    ligneB: "en agence",
    colonneA: "satisfait",
    colonneB: "non satisfait",
    individu: "client",
  },
  {
    intro: "Un lycée soumet un projet au vote de ses élèves.",
    ligneNom: "niveau",
    ligneA: "en première",
    ligneB: "en terminale",
    colonneA: "favorable",
    colonneB: "défavorable",
    individu: "élève",
  },
] as const;

// Un tableau croisé dont toutes les cases sont des entiers ronds.
//
// ⚠️ b ≠ c est imposé : sinon le total de la ligne ($a + b$) et celui de la
// colonne ($a + c$) tombent égaux, et les questions qui demandent de choisir
// entre les deux dénominateurs perdent leur sens — deux propositions du QCM
// deviennent identiques et l'élève ne voit plus que trois lignes.
function tableau() {
  const s = pick(SITUATIONS);
  const a = pick([40, 60, 80, 120, 150, 180] as const); // ligneA ∩ colonneA
  const b = pick([20, 40, 60, 90, 120] as const); // ligneA ∩ colonneB
  const c = pick(([30, 50, 60, 100, 150] as const).filter((x) => x !== b)); // ligneB ∩ colonneA
  const d = pick([10, 30, 50, 80, 100] as const); // ligneB ∩ colonneB
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

// L'énoncé pose la situation ; les effectifs, eux, sont LUS dans le tableau
// croisé dessiné à côté. C'est ainsi que la question tombe à l'épreuve — et
// lire un tableau à double entrée fait partie de ce qu'on évalue.
function enonceTableau(t: ReturnType<typeof tableau>): string {
  return `${t.s.intro} On choisit un ${t.s.individu} au hasard parmi les $${t.total}$ interrogés.`;
}

function canvasTableau(t: ReturnType<typeof tableau>): CanvasFigure {
  const { s } = t;
  const majuscule = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
  return {
    kind: "tableau_donnees",
    title: `Répartition des ${s.individu}s`,
    headers: ["", majuscule(s.colonneA), majuscule(s.colonneB), "Total"],
    rows: [
      { label: majuscule(s.ligneA), values: [t.a, t.b, t.ligne1] },
      { label: majuscule(s.ligneB), values: [t.c, t.d, t.ligne2] },
      { label: "Total", values: [t.col1, t.col2, t.total] },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   ⛔⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT », LES PROBABILITÉS
   CONDITIONNELLES DE PREMIÈRE (tronc commun).
   Mesuré avant (scripts/mesurer-squelettes-coach.ts premiere
   alea_conditionnelle alea_conditionnelle_calcul alea_independance) : les
   11 micros sous le seuil, 1 à 6 squelettes, 14 à 19 répétitions sur 20.
   Les gabarits tiraient des NOMBRES dans trois décors fixes.
   Même méthode que la 3e (dd5e9f75) : chaque gabarit croise
     · une SITUATION : trente-deux populations à deux caractères (clients
       d'une compagnie aérienne, usagers du car jaune, coureurs du Grand
       Raid, mangues du marché de Saint-Paul, randonneurs de Cilaos,
       visiteurs du Piton de la Fournaise, pieds de vanille de Sainte-Rose,
       tombola de la kermesse…) ;
     · un COUPLE condition / évènement : la condition peut être une ligne OU
       une colonne du tableau, ou un évènement contraire (huit couples) ;
     · une TOURNURE (« sachant que », « parmi », « si », « proportion de… »).
   L'indépendance et l'incompatibilité se CALCULENT sur des dés, des roues et
   un jeu de 32 cartes (ensembles énumérés : le verdict est exact).
   Les items des automatismes (auto_proba_*) gardent l'ancien `tableau()`.
═══════════════════════════════════════════════════════════════════════ */

const ri = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const maj = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
const voyelle = (x: string) => /^[aeiouyéèêî]/i.test(x);

/** Bonne réponse + trois leurres DISTINCTS au texte, tirés au hasard. */
function qcm(correct: string, leurres: readonly string[]): string[] {
  const d = shuffle([...new Set(leurres)].filter((w) => w !== correct)).slice(0, 3);
  return shuffle([correct, ...d]);
}

function red(a: number, b: number): [number, number] {
  const g = pgcd(a, b) || 1;
  return [a / g, b / g];
}
/** L'écriture décimale exacte de a/b, ou null si elle ne tombe pas juste. */
function decimale(a: number, b: number): string | null {
  let d = red(a, b)[1];
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1 ? fr(a / b) : null;
}
/** « 37,5 % », ou null si le pourcentage ne tombe pas juste au centième. */
function pourcent(a: number, b: number): string | null {
  const v = (100 * a) / b;
  const r = Math.round(v * 100) / 100;
  return Math.abs(v - r) < 1e-9 ? `${fr(r)} %` : null;
}
/** Toutes les écritures acceptées de a/b : brute, irréductible, décimal, pourcentage. */
function ecritures(a: number, b: number): string[] {
  const [n, d] = red(a, b);
  const out = [`${a}/${b}`, `${n}/${d}`];
  const dec = decimale(a, b);
  if (dec !== null) out.push(dec, dec.replace(",", "."));
  const pc = pourcent(a, b);
  if (pc !== null) out.push(pc, pc.replace(" ", ""));
  return [...new Set(out)];
}
/** Toutes les écritures acceptées d'un décimal : 0,15 ; 0.15 ; 15 % ; 3/20. */
function ecrDec(x: number): string[] {
  const r = Math.round(x * 1e6) / 1e6;
  let k = 0;
  while (k < 6 && Math.abs(Math.round(r * 10 ** k) - r * 10 ** k) > 1e-9) k++;
  const [n, d] = red(Math.round(r * 10 ** k), 10 ** k);
  const pc = Math.round(r * 100 * 1e6) / 1e6;
  return [...new Set([fr(r), String(r), `${fr(pc)} %`, `${fr(pc)}%`, `${n}/${d}`])];
}
/** « \dfrac{40}{120} = \dfrac{1}{3} » (+ « = 0,25 » si le décimal tombe juste), À METTRE entre $…$. */
function egalites(a: number, b: number): string {
  const [n, d] = red(a, b);
  const t = [`\\dfrac{${a}}{${b}}`];
  if (n !== a) t.push(`\\dfrac{${n}}{${d}}`);
  const dec = decimale(a, b);
  if (dec !== null) t.push(dec);
  return t.join(" = ");
}
const pct = (n: number) => `$${fr(n)}\\,\\%$`;

/* ── Les situations à deux caractères ──
   Un caractère sait s'écrire de toutes les façons dont l'énoncé a besoin :
     court : l'en-tête du tableau (« judo ») ;
     v / sj / vp : « est inscrit en judo » / « soit inscrit en judo » /
                   « sont inscrits en judo » ;
     s1 / p : après le nom, « un élève inscrit en judo » / « les élèves
              inscrits en judo ».                                           */
type Carac = { court: string; v: string; sj: string; vp: string; s1: string; p: string };
const etre = (court: string, s1: string, p: string): Carac => ({
  court,
  v: `est ${s1}`,
  sj: `soit ${s1}`,
  vp: `sont ${p}`,
  s1,
  p,
});
const agit = (court: string, v: string, sj: string, vp: string, s1: string, p: string): Carac => ({
  court,
  v,
  sj,
  vp,
  s1,
  p,
});

type Situ = {
  intro: string;
  f: boolean;
  nom: string;
  noms: string;
  /** Lettres de A (en ligne) et de B (en colonne). */
  L: [string, string];
  A: Carac;
  nA: Carac;
  B: Carac;
  nB: Carac;
};

const SITUS: readonly Situ[] = [
  {
    intro: "Dans un lycée, les élèves de seconde et de terminale de la section sportive font du judo ou de la natation.",
    f: false, nom: "élève", noms: "élèves", L: ["J", "S"],
    A: etre("judo", "inscrit en judo", "inscrits en judo"),
    nA: etre("natation", "inscrit en natation", "inscrits en natation"),
    B: etre("seconde", "en seconde", "en seconde"),
    nB: etre("terminale", "en terminale", "en terminale"),
  },
  {
    intro: "Une compagnie aérienne qui relie La Réunion à la métropole interroge ses clients après leur vol.",
    f: false, nom: "client", noms: "clients", L: ["I", "S"],
    A: agit("internet", "a acheté son billet sur internet", "ait acheté son billet sur internet", "ont acheté leur billet sur internet", "ayant acheté son billet sur internet", "ayant acheté leur billet sur internet"),
    nA: agit("agence", "a acheté son billet en agence", "ait acheté son billet en agence", "ont acheté leur billet en agence", "ayant acheté son billet en agence", "ayant acheté leur billet en agence"),
    B: etre("satisfait", "satisfait", "satisfaits"),
    nB: etre("non satisfait", "non satisfait", "non satisfaits"),
  },
  {
    intro: "Un lycée soumet au vote des élèves de première et de terminale un projet de jardin créole.",
    f: false, nom: "élève", noms: "élèves", L: ["R", "F"],
    A: etre("première", "en première", "en première"),
    nA: etre("terminale", "en terminale", "en terminale"),
    B: etre("favorable", "favorable au projet", "favorables au projet"),
    nB: etre("défavorable", "défavorable au projet", "défavorables au projet"),
  },
  {
    intro: "La régie du car jaune mène une enquête auprès de ses usagers.",
    f: false, nom: "usager", noms: "usagers", L: ["A", "H"],
    A: etre("abonné", "abonné", "abonnés"),
    nA: etre("non abonné", "non abonné", "non abonnés"),
    B: etre("satisfait des horaires", "satisfait des horaires", "satisfaits des horaires"),
    nB: etre("insatisfait des horaires", "insatisfait des horaires", "insatisfaits des horaires"),
  },
  {
    intro: "Après le Grand Raid, on fait le bilan des coureurs inscrits.",
    f: false, nom: "coureur", noms: "coureurs", L: ["L", "F"],
    A: etre("licencié", "licencié dans un club", "licenciés dans un club"),
    nA: etre("non licencié", "non licencié", "non licenciés"),
    B: agit("arrivé", "a terminé la course", "ait terminé la course", "ont terminé la course", "ayant terminé la course", "ayant terminé la course"),
    nB: agit("abandon", "a abandonné", "ait abandonné", "ont abandonné", "ayant abandonné", "ayant abandonné"),
  },
  {
    intro: "Au marché forain de Saint-Paul, un marchand trie sa récolte de mangues.",
    f: true, nom: "mangue", noms: "mangues", L: ["J", "M"],
    A: etre("José", "de la variété José", "de la variété José"),
    nA: etre("Américaine", "de la variété Américaine", "de la variété Américaine"),
    B: etre("mûre", "bien mûre", "bien mûres"),
    nB: etre("verte", "encore verte", "encore vertes"),
  },
  {
    intro: "Un laboratoire évalue un nouveau test de dépistage sur des volontaires.",
    f: true, nom: "personne", noms: "personnes", L: ["M", "T"],
    A: etre("malade", "malade", "malades"),
    nA: etre("non malade", "non malade", "non malades"),
    B: etre("test positif", "testée positive", "testées positives"),
    nB: etre("test négatif", "testée négative", "testées négatives"),
  },
  {
    intro: "À la fin d'un concert de maloya, les organisateurs interrogent les spectateurs.",
    f: false, nom: "spectateur", noms: "spectateurs", L: ["V", "J"],
    A: etre("voiture", "venu en voiture", "venus en voiture"),
    nA: etre("car", "venu en car", "venus en car"),
    B: etre("moins de 25 ans", "âgé de moins de 25 ans", "âgés de moins de 25 ans"),
    nB: etre("25 ans ou plus", "âgé de 25 ans ou plus", "âgés de 25 ans ou plus"),
  },
  {
    intro: "À la cantine du lycée, chaque demi-pensionnaire choisit le cari poulet ou le rougail saucisse.",
    f: false, nom: "élève", noms: "élèves", L: ["C", "D"],
    A: agit("cari poulet", "a choisi le cari poulet", "ait choisi le cari poulet", "ont choisi le cari poulet", "ayant choisi le cari poulet", "ayant choisi le cari poulet"),
    nA: agit("rougail saucisse", "a choisi le rougail saucisse", "ait choisi le rougail saucisse", "ont choisi le rougail saucisse", "ayant choisi le rougail saucisse", "ayant choisi le rougail saucisse"),
    B: agit("dessert", "a pris un dessert", "ait pris un dessert", "ont pris un dessert", "ayant pris un dessert", "ayant pris un dessert"),
    nB: agit("sans dessert", "n'a pas pris de dessert", "n'ait pas pris de dessert", "n'ont pas pris de dessert", "n'ayant pas pris de dessert", "n'ayant pas pris de dessert"),
  },
  {
    intro: "Lors d'un tournoi de dominos à Saint-Pierre, on relève le résultat de la première partie de chaque joueur.",
    f: false, nom: "joueur", noms: "joueurs", L: ["D", "G"],
    A: etre("débutant", "débutant", "débutants"),
    nA: etre("confirmé", "confirmé", "confirmés"),
    B: agit("gagné", "a gagné sa première partie", "ait gagné sa première partie", "ont gagné leur première partie", "ayant gagné sa première partie", "ayant gagné leur première partie"),
    nB: agit("perdu", "a perdu sa première partie", "ait perdu sa première partie", "ont perdu leur première partie", "ayant perdu sa première partie", "ayant perdu leur première partie"),
  },
  {
    intro: "À Cilaos, l'office de tourisme interroge les randonneurs de passage.",
    f: false, nom: "randonneur", noms: "randonneurs", L: ["G", "N"],
    A: etre("gîte", "logé en gîte", "logés en gîte"),
    nA: etre("hôtel", "logé à l'hôtel", "logés à l'hôtel"),
    B: etre("Piton des Neiges", "monté au Piton des Neiges", "montés au Piton des Neiges"),
    nB: etre("resté dans le cirque", "resté dans le cirque", "restés dans le cirque"),
  },
  {
    intro: "Au Pas de Bellecombe, on interroge les visiteurs du Piton de la Fournaise.",
    f: false, nom: "visiteur", noms: "visiteurs", L: ["M", "C"],
    A: etre("matin", "venu le matin", "venus le matin"),
    nA: etre("après-midi", "venu l'après-midi", "venus l'après-midi"),
    B: agit("cratère dégagé", "a vu le cratère dégagé", "ait vu le cratère dégagé", "ont vu le cratère dégagé", "ayant vu le cratère dégagé", "ayant vu le cratère dégagé"),
    nB: agit("nuages", "a trouvé le cratère dans les nuages", "ait trouvé le cratère dans les nuages", "ont trouvé le cratère dans les nuages", "ayant trouvé le cratère dans les nuages", "ayant trouvé le cratère dans les nuages"),
  },
  {
    intro: "Un vendeur de téléphones fait le bilan des ventes de l'année.",
    f: false, nom: "téléphone", noms: "téléphones", L: ["L", "G"],
    A: etre("en ligne", "vendu en ligne", "vendus en ligne"),
    nA: etre("en magasin", "vendu en magasin", "vendus en magasin"),
    B: etre("panne", "tombé en panne dans l'année", "tombés en panne dans l'année"),
    nB: etre("sans panne", "resté sans panne", "restés sans panne"),
  },
  {
    intro: "Dans un lycée, on interroge les élèves de terminale sur le permis de conduire.",
    f: false, nom: "élève", noms: "élèves", L: ["M", "C"],
    A: etre("majeur", "majeur", "majeurs"),
    nA: etre("mineur", "mineur", "mineurs"),
    B: agit("code", "a déjà le code", "ait déjà le code", "ont déjà le code", "ayant déjà le code", "ayant déjà le code"),
    nB: agit("pas le code", "n'a pas encore le code", "n'ait pas encore le code", "n'ont pas encore le code", "n'ayant pas encore le code", "n'ayant pas encore le code"),
  },
  {
    intro: "Un planteur de vanille de Sainte-Rose fait le point sur ses pieds de vanille.",
    f: false, nom: "pied de vanille", noms: "pieds de vanille", L: ["O", "F"],
    A: etre("ombre", "cultivé à l'ombre", "cultivés à l'ombre"),
    nA: etre("soleil", "cultivé au soleil", "cultivés au soleil"),
    B: agit("fleuri", "a fleuri cette année", "ait fleuri cette année", "ont fleuri cette année", "ayant fleuri cette année", "ayant fleuri cette année"),
    nB: agit("pas fleuri", "n'a pas fleuri cette année", "n'ait pas fleuri cette année", "n'ont pas fleuri cette année", "n'ayant pas fleuri cette année", "n'ayant pas fleuri cette année"),
  },
  {
    intro: "Dans une usine, une ancienne et une nouvelle machine fabriquent les mêmes pièces.",
    f: true, nom: "pièce", noms: "pièces", L: ["N", "D"],
    A: etre("nouvelle machine", "fabriquée par la nouvelle machine", "fabriquées par la nouvelle machine"),
    nA: etre("ancienne machine", "fabriquée par l'ancienne machine", "fabriquées par l'ancienne machine"),
    B: etre("défectueuse", "défectueuse", "défectueuses"),
    nB: etre("conforme", "conforme", "conformes"),
  },
  {
    intro: "Un après-midi, à la plage de l'Ermitage, on interroge les baigneurs.",
    f: false, nom: "baigneur", noms: "baigneurs", L: ["C", "S"],
    A: agit("crème solaire", "a mis de la crème solaire", "ait mis de la crème solaire", "ont mis de la crème solaire", "ayant mis de la crème solaire", "ayant mis de la crème solaire"),
    nA: agit("sans crème", "n'a pas mis de crème solaire", "n'ait pas mis de crème solaire", "n'ont pas mis de crème solaire", "n'ayant pas mis de crème solaire", "n'ayant pas mis de crème solaire"),
    B: agit("coup de soleil", "a attrapé un coup de soleil", "ait attrapé un coup de soleil", "ont attrapé un coup de soleil", "ayant attrapé un coup de soleil", "ayant attrapé un coup de soleil"),
    nB: agit("pas de coup de soleil", "n'a pas attrapé de coup de soleil", "n'ait pas attrapé de coup de soleil", "n'ont pas attrapé de coup de soleil", "n'ayant pas attrapé de coup de soleil", "n'ayant pas attrapé de coup de soleil"),
  },
  {
    intro: "L'infirmière d'un lycée interroge les élèves sur leur sommeil.",
    f: false, nom: "élève", noms: "élèves", L: ["E", "C"],
    A: agit("écran", "a un écran dans sa chambre", "ait un écran dans sa chambre", "ont un écran dans leur chambre", "ayant un écran dans sa chambre", "ayant un écran dans leur chambre"),
    nA: agit("pas d'écran", "n'a pas d'écran dans sa chambre", "n'ait pas d'écran dans sa chambre", "n'ont pas d'écran dans leur chambre", "n'ayant pas d'écran dans sa chambre", "n'ayant pas d'écran dans leur chambre"),
    B: agit("couché avant 23 h", "se couche avant 23 h", "se couche avant 23 h", "se couchent avant 23 h", "se couchant avant 23 h", "se couchant avant 23 h"),
    nB: agit("couché après 23 h", "se couche après 23 h", "se couche après 23 h", "se couchent après 23 h", "se couchant après 23 h", "se couchant après 23 h"),
  },
  {
    intro: "Un snack de Saint-Denis relève les commandes de ses clients pendant une semaine.",
    f: false, nom: "client", noms: "clients", L: ["B", "C"],
    A: agit("bouchons", "a commandé des bouchons", "ait commandé des bouchons", "ont commandé des bouchons", "ayant commandé des bouchons", "ayant commandé des bouchons"),
    nA: agit("américain", "a commandé un sandwich américain", "ait commandé un sandwich américain", "ont commandé un sandwich américain", "ayant commandé un sandwich américain", "ayant commandé un sandwich américain"),
    B: agit("carte", "a payé par carte", "ait payé par carte", "ont payé par carte", "ayant payé par carte", "ayant payé par carte"),
    nB: agit("espèces", "a payé en espèces", "ait payé en espèces", "ont payé en espèces", "ayant payé en espèces", "ayant payé en espèces"),
  },
  {
    intro: "Un centre de contrôle technique fait le bilan des voitures contrôlées dans le mois.",
    f: true, nom: "voiture", noms: "voitures", L: ["E", "V"],
    A: etre("essence", "à essence", "à essence"),
    nA: etre("diesel", "diesel", "diesel"),
    B: etre("validée", "validée du premier coup", "validées du premier coup"),
    nB: etre("recalée", "recalée", "recalées"),
  },
  {
    intro: "Au stade de l'Est, on interroge les spectateurs d'un match de football.",
    f: false, nom: "spectateur", noms: "spectateurs", L: ["L", "F"],
    A: etre("équipe locale", "supporter de l'équipe locale", "supporters de l'équipe locale"),
    nA: etre("équipe visiteuse", "supporter de l'équipe visiteuse", "supporters de l'équipe visiteuse"),
    B: etre("en famille", "venu en famille", "venus en famille"),
    nB: etre("sans famille", "venu sans sa famille", "venus sans leur famille"),
  },
  {
    intro: "On interroge les élèves d'un lycée général et technologique sur leurs loisirs.",
    f: false, nom: "élève", noms: "élèves", L: ["C", "G"],
    A: agit("sport en club", "pratique un sport en club", "pratique un sport en club", "pratiquent un sport en club", "pratiquant un sport en club", "pratiquant un sport en club"),
    nA: agit("pas de club", "ne pratique pas de sport en club", "ne pratique pas de sport en club", "ne pratiquent pas de sport en club", "ne pratiquant pas de sport en club", "ne pratiquant pas de sport en club"),
    B: etre("voie générale", "en voie générale", "en voie générale"),
    nB: etre("voie technologique", "en voie technologique", "en voie technologique"),
  },
  {
    intro: "À l'aéroport Roland-Garros, on étudie les vols d'une journée chargée vers les îles voisines.",
    f: false, nom: "vol", noms: "vols", L: ["M", "H"],
    A: etre("Maurice", "à destination de Maurice", "à destination de Maurice"),
    nA: etre("Mayotte", "à destination de Mayotte", "à destination de Mayotte"),
    B: etre("à l'heure", "parti à l'heure", "partis à l'heure"),
    nB: etre("en retard", "parti en retard", "partis en retard"),
  },
  {
    intro: "Dans un jardin créole, on a semé des graines de piment et des graines de tomate.",
    f: true, nom: "graine", noms: "graines", L: ["I", "G"],
    A: etre("piment", "de piment", "de piment"),
    nA: etre("tomate", "de tomate", "de tomate"),
    B: agit("germé", "a germé", "ait germé", "ont germé", "ayant germé", "ayant germé"),
    nB: agit("pas germé", "n'a pas germé", "n'ait pas germé", "n'ont pas germé", "n'ayant pas germé", "n'ayant pas germé"),
  },
  {
    intro: "À la kermesse du lycée, on fait le bilan de la tombola.",
    f: false, nom: "participant", noms: "participants", L: ["U", "G"],
    A: agit("un seul billet", "a acheté un seul billet", "ait acheté un seul billet", "ont acheté un seul billet", "ayant acheté un seul billet", "ayant acheté un seul billet"),
    nA: agit("plusieurs billets", "a acheté plusieurs billets", "ait acheté plusieurs billets", "ont acheté plusieurs billets", "ayant acheté plusieurs billets", "ayant acheté plusieurs billets"),
    B: agit("gagnant", "a gagné un lot", "ait gagné un lot", "ont gagné un lot", "ayant gagné un lot", "ayant gagné un lot"),
    nB: agit("rien gagné", "n'a rien gagné", "n'ait rien gagné", "n'ont rien gagné", "n'ayant rien gagné", "n'ayant rien gagné"),
  },
  {
    intro: "Avant le bac blanc, un lycée a proposé un stage de révision pendant les vacances.",
    f: false, nom: "élève", noms: "élèves", L: ["S", "M"],
    A: agit("stage", "a suivi le stage", "ait suivi le stage", "ont suivi le stage", "ayant suivi le stage", "ayant suivi le stage"),
    nA: agit("pas de stage", "n'a pas suivi le stage", "n'ait pas suivi le stage", "n'ont pas suivi le stage", "n'ayant pas suivi le stage", "n'ayant pas suivi le stage"),
    B: agit("moyenne", "a eu la moyenne au bac blanc", "ait eu la moyenne au bac blanc", "ont eu la moyenne au bac blanc", "ayant eu la moyenne au bac blanc", "ayant eu la moyenne au bac blanc"),
    nB: agit("pas la moyenne", "n'a pas eu la moyenne au bac blanc", "n'ait pas eu la moyenne au bac blanc", "n'ont pas eu la moyenne au bac blanc", "n'ayant pas eu la moyenne au bac blanc", "n'ayant pas eu la moyenne au bac blanc"),
  },
  {
    intro: "L'office de tourisme interroge les touristes qui quittent La Réunion.",
    f: false, nom: "touriste", noms: "touristes", L: ["M", "D"],
    A: etre("métropole", "venu de métropole", "venus de métropole"),
    nA: etre("étranger", "venu de l'étranger", "venus de l'étranger"),
    B: agit("plongée", "a fait de la plongée", "ait fait de la plongée", "ont fait de la plongée", "ayant fait de la plongée", "ayant fait de la plongée"),
    nB: agit("pas de plongée", "n'a pas fait de plongée", "n'ait pas fait de plongée", "n'ont pas fait de plongée", "n'ayant pas fait de plongée", "n'ayant pas fait de plongée"),
  },
  {
    intro: "Un cinéma de Saint-Pierre étudie le public d'un film d'animation.",
    f: false, nom: "spectateur", noms: "spectateurs", L: ["E", "C"],
    A: etre("moins de 12 ans", "âgé de moins de 12 ans", "âgés de moins de 12 ans"),
    nA: etre("12 ans ou plus", "âgé de 12 ans ou plus", "âgés de 12 ans ou plus"),
    B: agit("pop-corn", "a acheté du pop-corn", "ait acheté du pop-corn", "ont acheté du pop-corn", "ayant acheté du pop-corn", "ayant acheté du pop-corn"),
    nB: agit("sans pop-corn", "n'a pas acheté de pop-corn", "n'ait pas acheté de pop-corn", "n'ont pas acheté de pop-corn", "n'ayant pas acheté de pop-corn", "n'ayant pas acheté de pop-corn"),
  },
  {
    intro: "Une messagerie analyse les courriels reçus par ses utilisateurs.",
    f: false, nom: "courriel", noms: "courriels", L: ["S", "L"],
    A: etre("indésirable", "indésirable", "indésirables"),
    nA: etre("légitime", "légitime", "légitimes"),
    B: agit("lien", "contient un lien", "contienne un lien", "contiennent un lien", "contenant un lien", "contenant un lien"),
    nB: agit("sans lien", "ne contient aucun lien", "ne contienne aucun lien", "ne contiennent aucun lien", "ne contenant aucun lien", "ne contenant aucun lien"),
  },
  {
    intro: "Un producteur de letchis de Saint-André fait le bilan des caisses de sa récolte.",
    f: true, nom: "caisse", noms: "caisses", L: ["M", "V"],
    A: etre("cueillie le matin", "cueillie le matin", "cueillies le matin"),
    nA: etre("cueillie l'après-midi", "cueillie l'après-midi", "cueillies l'après-midi"),
    B: etre("vendue au marché", "vendue au marché", "vendues au marché"),
    nB: etre("expédiée en métropole", "expédiée en métropole", "expédiées en métropole"),
  },
  {
    intro: "Un refuge pour animaux de Saint-Louis fait le bilan des chiens accueillis dans l'année.",
    f: false, nom: "chien", noms: "chiens", L: ["J", "D"],
    A: etre("chiot", "arrivé chiot", "arrivés chiots"),
    nA: etre("adulte", "arrivé adulte", "arrivés adultes"),
    B: etre("adopté", "adopté dans l'année", "adoptés dans l'année"),
    nB: etre("encore au refuge", "encore au refuge", "encore au refuge"),
  },
  {
    intro: "Un lycée de l'Est relève, sur une année, les jours de classe et la ponctualité du car jaune.",
    f: false, nom: "jour", noms: "jours", L: ["A", "R"],
    A: etre("pluvieux", "pluvieux", "pluvieux"),
    nA: etre("sec", "sec", "secs"),
    B: etre("car en retard", "marqué par un retard du car", "marqués par un retard du car"),
    nB: etre("car à l'heure", "sans retard du car", "sans retard du car"),
  },
];

/* ── Les mots de la situation ── */
const unS = (S: Situ) => `${S.f ? "une" : "un"} ${S.nom}`;
const leS = (S: Situ) => (voyelle(S.nom) ? `l'${S.nom}` : `${S.f ? "la" : "le"} ${S.nom}`);
const choisiS = (S: Situ) => (S.f ? "choisie" : "choisi");
const prS = (S: Situ) => (S.f ? "elle" : "il");
const prsS = (S: Situ) => (S.f ? "elles" : "ils");
const deNoms = (S: Situ) => (voyelle(S.noms) ? `d'${S.noms}` : `de ${S.noms}`);
const notaS = (S: Situ) =>
  `On note $${S.L[0]}$ l'évènement « ${leS(S)} ${S.A.v} » et $${S.L[1]}$ l'évènement « ${leS(S)} ${S.B.v} ».`;

/* ── Les évènements du tableau : A, Ā en ligne ; B, B̄ en colonne ── */
type Ev = { L: string; c: Carac; axe: 0 | 1; i: 0 | 1 };
function evs(S: Situ): Ev[] {
  return [
    { L: S.L[0], c: S.A, axe: 0, i: 0 },
    { L: `\\overline{${S.L[0]}}`, c: S.nA, axe: 0, i: 1 },
    { L: S.L[1], c: S.B, axe: 1, i: 0 },
    { L: `\\overline{${S.L[1]}}`, c: S.nB, axe: 1, i: 1 },
  ];
}
/** Une condition et un évènement de l'autre caractère (huit couples). */
function paire(S: Situ, sansContraire = false): [Ev, Ev] {
  const e = evs(S).filter((x) => !sansContraire || x.i === 0);
  const C = pick(e);
  return [C, pick(e.filter((x) => x.axe !== C.axe))];
}
const Pc = (C: Ev, E: Ev) => `P_{${C.L}}(${E.L})`;
const Pi = (C: Ev, E: Ev) => `P(${C.L} \\cap ${E.L})`;

type TV = { S: Situ; a: number; b: number; c: number; d: number; l1: number; l2: number; c1: number; c2: number; total: number };
/** Un tableau croisé : les deux totaux de ligne, les deux de colonne et le total, tous différents. */
function tableauV(S: Situ = pick(SITUS)): TV {
  for (;;) {
    const m = pick([1, 2, 5] as const);
    const [a, b, c, d] = [0, 0, 0, 0].map(() => ri(3, 60) * m);
    const l1 = a + b, l2 = c + d, c1 = a + c, c2 = b + d, total = l1 + l2;
    if (new Set([l1, l2, c1, c2, total]).size === 5) return { S, a, b, c, d, l1, l2, c1, c2, total };
  }
}
const effV = (t: TV, e: Ev) => (e.axe === 0 ? (e.i === 0 ? t.l1 : t.l2) : e.i === 0 ? t.c1 : t.c2);
function caseV(t: TV, e1: Ev, e2: Ev): number {
  const r = e1.axe === 0 ? e1 : e2;
  const k = e1.axe === 0 ? e2 : e1;
  return [[t.a, t.b], [t.c, t.d]][r.i][k.i];
}
function canvasV(t: TV): CanvasFigure {
  const { S } = t;
  return {
    kind: "tableau_donnees",
    title: `Répartition des ${S.noms}`,
    headers: ["", maj(S.B.court), maj(S.nB.court), "Total"],
    rows: [
      { label: maj(S.A.court), values: [t.a, t.b, t.l1] },
      { label: maj(S.nA.court), values: [t.c, t.d, t.l2] },
      { label: "Total", values: [t.c1, t.c2, t.total] },
    ],
  };
}
const enonceV = (t: TV) =>
  `${t.S.intro} Le tableau donne la répartition des $${t.total}$ ${t.S.noms} ; on en choisit ${t.S.f ? "une" : "un"} au hasard.`;

/** Les quatre façons de demander $P_C(E)$ en français. */
function questionCond(S: Situ, C: Ev, E: Ev): string {
  return pick([
    `Sachant que ${leS(S)} ${choisiS(S)} ${C.c.v}, quelle est la probabilité qu'${prS(S)} ${E.c.sj} ?`,
    `On choisit au hasard ${unS(S)} parmi les ${S.noms} ${C.c.p}. Quelle est la probabilité qu'${prS(S)} ${E.c.sj} ?`,
    `Quelle est la proportion ${deNoms(S)} ${E.c.p} parmi les ${S.noms} ${C.c.p} ?`,
    `Si ${leS(S)} ${choisiS(S)} ${C.c.v}, quelle est la probabilité qu'${prS(S)} ${E.c.sj} ?`,
  ]);
}

/* ── Des évènements indépendants (deux épreuves qui ne s'influencent pas) ── */
type Duo = { intro: string; L: [string, string]; e: [string, string] };
const DUOS: readonly Duo[] = [
  { intro: "Au basket, Léa et Noah tirent chacun un lancer franc, sans s'influencer.", L: ["L", "N"], e: ["Léa marque", "Noah marque"] },
  { intro: "Dans un atelier, deux machines fonctionnent séparément.", L: ["U", "V"], e: ["la première machine tombe en panne dans la semaine", "la seconde machine tombe en panne dans la semaine"] },
  { intro: "Maëlle prend le car jaune de Saint-Leu le matin, puis celui du retour le soir.", L: ["M", "S"], e: ["le car du matin est à l'heure", "le car du soir est à l'heure"] },
  { intro: "Au jardin créole, on sème une graine de piment et une graine de tomate.", L: ["I", "T"], e: ["la graine de piment germe", "la graine de tomate germe"] },
  { intro: "À la kermesse, on fait tourner deux fois la même roue.", L: ["R", "S"], e: ["la roue s'arrête sur le rouge au premier tour", "elle s'arrête sur le rouge au second tour"] },
  { intro: "Deux amis courent la Diagonale des Fous, chacun à son rythme.", L: ["K", "Y"], e: ["Kévin termine la course", "Yanis termine la course"] },
  { intro: "Une guirlande comporte deux ampoules qui fonctionnent indépendamment.", L: ["A", "B"], e: ["la première ampoule grille dans l'année", "la seconde ampoule grille dans l'année"] },
  { intro: "Au jeu de l'oie, Inès lance un dé truqué puis tire une carte dans la pioche.", L: ["S", "C"], e: ["Inès obtient un six", "la carte tirée est une carte bonus"] },
  { intro: "Tom et Zoé sont dans deux classes différentes et ne se connaissent pas.", L: ["T", "Z"], e: ["Tom est absent lundi", "Zoé est absente lundi"] },
  { intro: "Deux sorties en mer partent observer les baleines, l'une le matin, l'autre l'après-midi.", L: ["M", "A"], e: ["la sortie du matin voit une baleine", "la sortie de l'après-midi voit une baleine"] },
  { intro: "À la pétanque, Mamie Josette et Papi Henri lancent chacun une boule.", L: ["J", "H"], e: ["Mamie Josette fait un carreau", "Papi Henri fait un carreau"] },
  { intro: "On achète un ticket à la tombola du lycée et un autre à celle du club de foot.", L: ["L", "F"], e: ["le ticket du lycée est gagnant", "le ticket du club de foot est gagnant"] },
  { intro: "Un vendeur de letchis du bord de route reçoit deux clients qui ne se connaissent pas.", L: ["C", "D"], e: ["le premier client achète une barquette", "le second client achète une barquette"] },
  { intro: "Un jeu vidéo propose à Lucas deux défis qui n'ont rien à voir.", L: ["D", "E"], e: ["Lucas réussit le premier défi", "Lucas réussit le second défi"] },
  { intro: "Aux tirs au but, Sarah puis Emma tirent chacune un penalty.", L: ["S", "E"], e: ["Sarah marque", "Emma marque"] },
  { intro: "Un smartphone et une tablette ont été achetés dans deux magasins différents.", L: ["S", "T"], e: ["le smartphone tombe en panne dans l'année", "la tablette tombe en panne dans l'année"] },
];

/* ── Les dépistages : la conditionnelle à l'envers (faux positifs) ── */
type Detect = {
  M: string;
  T: string;
  noms: string;
  base: (p: number, s: number, f: number) => string;
  /** « une personne dont le test est positif » */
  un1: string;
  /** « qu'elle soit malade » */
  qEtat: string;
  /** « personnes dont le test est positif » */
  pos: string;
  /** « ont un test positif » */
  verbePos: string;
  /** « personnes non malades » */
  sains: string;
};
const N_DEP = "$10\\,000$";
const DETECTS: readonly Detect[] = [
  {
    M: "M", T: "T", noms: "personnes",
    base: (p, s, f) => `À La Réunion, un laboratoire évalue un test rapide de la dengue sur ${N_DEP} personnes, dont ${pct(p)} sont malades. Le test est positif chez ${pct(s)} des malades, mais aussi, à tort, chez ${pct(f)} des personnes non malades.`,
    un1: "une personne dont le test est positif", qEtat: "qu'elle soit malade", pos: "personnes dont le test est positif", verbePos: "ont un test positif", sains: "personnes non malades",
  },
  {
    M: "M", T: "T", noms: "personnes",
    base: (p, s, f) => `Une maladie rare fait l'objet d'un dépistage. Sur ${N_DEP} personnes dépistées, ${pct(p)} sont malades. Le test détecte ${pct(s)} des malades, mais il est aussi positif chez ${pct(f)} des personnes saines.`,
    un1: "une personne testée positive", qEtat: "qu'elle soit réellement malade", pos: "personnes testées positives", verbePos: "sont testées positives", sains: "personnes saines",
  },
  {
    M: "D", T: "C", noms: "coureurs",
    base: (p, s, f) => `Sur un grand trail, ${N_DEP} coureurs sont contrôlés ; ${pct(p)} d'entre eux sont dopés. Le contrôle est positif chez ${pct(s)} des coureurs dopés, mais aussi, à tort, chez ${pct(f)} des coureurs non dopés.`,
    un1: "un coureur dont le contrôle est positif", qEtat: "qu'il soit dopé", pos: "coureurs dont le contrôle est positif", verbePos: "ont un contrôle positif", sains: "coureurs non dopés",
  },
  {
    M: "S", T: "F", noms: "courriels",
    base: (p, s, f) => `Une messagerie reçoit ${N_DEP} courriels, dont ${pct(p)} sont des spams. Son filtre classe en « spam » ${pct(s)} des spams, mais aussi, à tort, ${pct(f)} des courriels légitimes.`,
    un1: "un courriel classé en « spam » par le filtre", qEtat: "qu'il s'agisse vraiment d'un spam", pos: "courriels classés en « spam »", verbePos: "sont classés en « spam »", sains: "courriels légitimes",
  },
  {
    M: "I", T: "S", noms: "bagages",
    base: (p, s, f) => `À l'aéroport Roland-Garros, un scanner contrôle ${N_DEP} bagages, dont ${pct(p)} contiennent un objet interdit. L'alarme sonne pour ${pct(s)} des bagages qui en contiennent, mais aussi, à tort, pour ${pct(f)} des autres bagages.`,
    un1: "un bagage qui a fait sonner l'alarme", qEtat: "qu'il contienne un objet interdit", pos: "bagages ayant fait sonner l'alarme", verbePos: "font sonner l'alarme", sains: "bagages sans objet interdit",
  },
  {
    M: "D", T: "R", noms: "pièces",
    base: (p, s, f) => `Dans une usine, un capteur contrôle ${N_DEP} pièces, dont ${pct(p)} sont défectueuses. Il rejette ${pct(s)} des pièces défectueuses, mais aussi, à tort, ${pct(f)} des pièces conformes.`,
    un1: "une pièce rejetée par le capteur", qEtat: "qu'elle soit défectueuse", pos: "pièces rejetées", verbePos: "sont rejetées", sains: "pièces conformes",
  },
  {
    M: "I", T: "C", noms: "valises",
    base: (p, s, f) => `À l'aéroport, un chien des douanes inspecte ${N_DEP} valises, dont ${pct(p)} contiennent des produits interdits. Il marque ${pct(s)} de ces valises, mais aussi, à tort, ${pct(f)} des autres valises.`,
    un1: "une valise marquée par le chien", qEtat: "qu'elle contienne des produits interdits", pos: "valises marquées par le chien", verbePos: "sont marquées par le chien", sains: "valises sans produit interdit",
  },
  {
    M: "R", T: "A", noms: "images",
    base: (p, s, f) => `Une caméra « vigie requin » surveille une baie de La Réunion. Sur ${N_DEP} images analysées, ${pct(p)} montrent réellement un requin. Le logiciel donne l'alerte pour ${pct(s)} des images avec requin, mais aussi, à tort, pour ${pct(f)} des images sans requin.`,
    un1: "une image qui a déclenché l'alerte", qEtat: "qu'elle montre réellement un requin", pos: "images ayant déclenché l'alerte", verbePos: "déclenchent l'alerte", sains: "images sans requin",
  },
  {
    M: "V", T: "S", noms: "clients",
    base: (p, s, f) => `À la sortie d'un magasin, on observe ${N_DEP} clients ; ${pct(p)} d'entre eux sortent avec un article non payé. Le portique antivol sonne pour ${pct(s)} d'entre eux, mais aussi, à tort, pour ${pct(f)} des clients honnêtes.`,
    un1: "un client qui a fait sonner le portique", qEtat: "qu'il ait un article non payé", pos: "clients ayant fait sonner le portique", verbePos: "font sonner le portique", sains: "clients honnêtes",
  },
];

/* ── Dés, roues, urnes, cartes : l'indépendance se CALCULE ── */
type Univers = { intro: string; issues: string[]; evs: { desc: string; set: Set<string> }[] };
function universNombres(intro: string, N: number): Univers {
  const issues = Array.from({ length: N }, (_, i) => String(i + 1));
  const S = (f: (n: number) => boolean) => new Set(issues.filter((x) => f(Number(x))));
  const premier = (n: number) => n >= 2 && [2, 3, 5, 7, 11, 13, 17, 19].filter((p) => p < n).every((p) => n % p !== 0);
  const k = ri(2, N - 2);
  const j = ri(2, N - 1);
  const evs = [
    { desc: "le résultat est pair", set: S((n) => n % 2 === 0) },
    { desc: "le résultat est impair", set: S((n) => n % 2 === 1) },
    { desc: "le résultat est un multiple de $3$", set: S((n) => n % 3 === 0) },
    { desc: "le résultat est un multiple de $4$", set: S((n) => n % 4 === 0) },
    { desc: "le résultat est un multiple de $5$", set: S((n) => n % 5 === 0) },
    { desc: "le résultat est un nombre premier", set: S(premier) },
    { desc: `le résultat est strictement supérieur à $${k}$`, set: S((n) => n > k) },
    { desc: `le résultat est inférieur ou égal à $${j}$`, set: S((n) => n <= j) },
    { desc: `le résultat est $${j}$`, set: S((n) => n === j) },
  ];
  return { intro, issues, evs: evs.filter((e) => e.set.size > 0 && e.set.size < N) };
}
function universCartes(): Univers {
  const valeurs = ["7", "8", "9", "10", "valet", "dame", "roi", "as"];
  const couleurs = ["cœur", "carreau", "trèfle", "pique"];
  const issues = couleurs.flatMap((c) => valeurs.map((v) => `${v}-${c}`));
  const S = (f: (v: string, c: string) => boolean) => new Set(issues.filter((x) => f(x.split("-")[0], x.split("-")[1])));
  return {
    intro: "On tire une carte au hasard dans un jeu de $32$ cartes.",
    issues,
    evs: [
      { desc: "la carte est un cœur", set: S((_, c) => c === "cœur") },
      { desc: "la carte est un pique", set: S((_, c) => c === "pique") },
      { desc: "la carte est rouge", set: S((_, c) => c === "cœur" || c === "carreau") },
      { desc: "la carte est noire", set: S((_, c) => c === "trèfle" || c === "pique") },
      { desc: "la carte est une figure (valet, dame ou roi)", set: S((v) => ["valet", "dame", "roi"].includes(v)) },
      { desc: "la carte est un as", set: S((v) => v === "as") },
      { desc: "la carte est un roi", set: S((v) => v === "roi") },
      { desc: "la carte est une dame", set: S((v) => v === "dame") },
      { desc: "la carte est le roi de cœur", set: S((v, c) => v === "roi" && c === "cœur") },
      { desc: "la carte est un $7$ ou un $8$", set: S((v) => v === "7" || v === "8") },
    ],
  };
}
const UNIVERS: readonly (() => Univers)[] = [
  () => universNombres("On lance un dé équilibré à six faces.", 6),
  () => universNombres("On lance un dé de jeu de rôle équilibré à huit faces, numérotées de $1$ à $8$.", 8),
  () => universNombres("On lance un dé de jeu de rôle équilibré à douze faces, numérotées de $1$ à $12$.", 12),
  () => universNombres("À la kermesse, une roue est partagée en dix secteurs égaux numérotés de $1$ à $10$ ; on la fait tourner.", 10),
  () => universNombres("Une urne de la tombola contient vingt boules numérotées de $1$ à $20$ ; on en tire une au hasard.", 20),
  () => universNombres("Au jeu des petits chevaux, on lance un dé équilibré à six faces.", 6),
  universCartes,
];

export const probabilitesConditionnellesBank: TutorBankItemV4[] = [
  /* ═══════════════ alea_cond_reconnaitre ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_alea_reconnaitre_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle",
    microId: "alea_cond_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un énoncé, quel mot signale presque toujours une probabilité conditionnelle ?",
    format: "qcm",
    choices: ["« parmi »", "« et »", "« ou »", "« au hasard »"],
    expected: ["« parmi »"],
    comparator: "mcq_exact",
    hint: "Cherche le mot qui réduit la population étudiée.",
    explanation: exp(
      "Une probabilité conditionnelle se calcule dans une population RÉDUITE à ceux qui vérifient déjà une condition.",
      "« Parmi les élèves de seconde… » ou « sachant qu'il est en seconde » restreignent la population : on ne divise plus par le total.",
      "« Et » signale au contraire une intersection, calculée sur la population entière.",
      "« Parmi » (ou « sachant que ») annonce une conditionnelle."
    ),
    tags: ["premiere", "maths", "probabilites", "conditionnelle"],
  },

  {
    kind: "template",
    id: "premiere_alea_reconnaitre_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle",
    microId: "alea_cond_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi sur quelle population on divise : le total, ou une partie seulement ?",
    tags: ["premiere", "maths", "probabilites", "conditionnelle", "template"],
    generate: () => {
      const t = tableauV();
      const { S } = t;
      const [C, E] = paire(S);
      const mode = pick(["cond", "cond", "cond", "inter", "simple"] as const);
      const lE = leS(S), ch = choisiS(S);
      const phrase =
        mode === "cond"
          ? questionCond(S, C, E)
          : mode === "inter"
            ? pick([
                `Quelle est la probabilité que ${lE} ${ch} ${C.c.sj} et ${E.c.sj} ?`,
                `Quelle est la proportion ${deNoms(S)} ${C.c.p} et ${E.c.p}, parmi tous les ${S.noms} ?`,
              ])
            : pick([
                `Quelle est la probabilité que ${lE} ${ch} ${E.c.sj} ?`,
                `Quelle est la proportion ${deNoms(S)} ${E.c.p}, parmi tous les ${S.noms} ?`,
              ]);
      const effC = effV(t, C), effE = effV(t, E), n = caseV(t, C, E);
      const bon = mode === "cond" ? effC : t.total;
      const leurres = mode === "cond" ? [t.total, effE, n] : mode === "inter" ? [effC, effE, n] : [effE, effC, n];
      return {
        text: `${enonceV(t)} On se pose la question : « ${phrase} » Pour y répondre, par quel nombre faut-il diviser ?`,
        format: "qcm",
        choices: qcm(`$${bon}$`, leurres.map((x) => `$${x}$`)),
        expected: [`$${bon}$`],
        comparator: "mcq_exact",
        canvas: canvasV(t),
        explanation:
          mode === "cond"
            ? exp(
                "Une probabilité conditionnelle se calcule dans la population RÉDUITE par la condition.",
                `La question dit ce que l'on SAIT déjà : ${leS(S)} ${C.c.v}. On ne regarde plus que les ${S.noms} ${C.c.p}.`,
                `Ils sont $${effC}$ (total de cette ${C.axe === 0 ? "ligne" : "colonne"}) : on calcule $\\dfrac{${n}}{${effC}}$, et non $\\dfrac{${n}}{${t.total}}$.`,
                `On divise par $${effC}$, l'effectif de la condition.`
              )
            : exp(
                mode === "inter"
                  ? "Une intersection (« … et … ») se calcule sur la population ENTIÈRE."
                  : "Une probabilité simple, sans condition, se calcule sur la population ENTIÈRE.",
                "Aucun « sachant que », aucun « parmi les … » ne réduit la population.",
                mode === "inter"
                  ? `On lit la case $${n}$, puis on calcule $\\dfrac{${n}}{${t.total}}$.`
                  : `On lit le total $${effE}$ des ${S.noms} ${E.c.p}, puis on calcule $\\dfrac{${effE}}{${t.total}}$.`,
                `On divise par le total, $${t.total}$.`
              ),
        choiceDiagnostics: [
          mode === "cond"
            ? { choice: `$${t.total}$`, cause: "a divisé par l'effectif total : c'est ce qu'on ferait sans condition" }
            : { choice: `$${effC}$`, cause: "a cru voir une condition : sans « sachant que », on divise par le total" },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_alea_reconnaitre_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle",
    microId: "alea_cond_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "« Parmi les … », « sachant que », « si » : la population est réduite. « … et … » : les deux à la fois, sur tout le monde.",
    tags: ["premiere", "maths", "probabilites", "conditionnelle", "template"],
    generate: () => {
      const S = pick(SITUS);
      const [C, E] = paire(S);
      const n = ri(2, 19) * 5;
      const x = fr(n / 100);
      const mode = pick(["cond", "cond", "inter", "simple"] as const);
      const phrase =
        mode === "cond"
          ? pick([
              `Parmi les ${S.noms} ${C.c.p}, ${pct(n)} ${E.c.vp}.`,
              `${pct(n)} des ${S.noms} ${C.c.p} ${E.c.vp}.`,
              `Sachant qu'${unS(S)} ${C.c.v}, la probabilité qu'${prS(S)} ${E.c.sj} vaut $${x}$.`,
              `Si l'on choisit au hasard ${unS(S)} ${C.c.s1}, il y a ${pct(n)} de chances qu'${prS(S)} ${E.c.sj}.`,
            ])
          : mode === "inter"
            ? pick([
                `${pct(n)} des ${S.noms} ${C.c.vp} et ${E.c.vp}.`,
                `La probabilité qu'${unS(S)} ${choisiS(S)} au hasard ${C.c.sj} et ${E.c.sj} vaut $${x}$.`,
              ])
            : pick([
                `${pct(n)} des ${S.noms} ${E.c.vp}.`,
                `La probabilité qu'${unS(S)} ${choisiS(S)} au hasard ${E.c.sj} vaut $${x}$.`,
              ]);
      const COND = "une probabilité conditionnelle";
      const INTER = "la probabilité d'une intersection (les deux à la fois)";
      const SIMPLE = `une probabilité simple, sur tous les ${S.noms}`;
      const bon = mode === "cond" ? COND : mode === "inter" ? INTER : SIMPLE;
      return {
        text: `${S.intro} On lit : « ${phrase} » Cette phrase donne :`,
        format: "qcm",
        choices: qcm(bon, [COND, INTER, SIMPLE]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Une probabilité conditionnelle se calcule dans une population RÉDUITE : « parmi les … », « sachant que », « si … ».",
          "On cherche si la phrase réduit la population, ou si elle parle de tous les individus.",
          mode === "cond"
            ? `La population est réduite aux ${S.noms} ${C.c.p} : on y compte ${S.f ? "celles" : "ceux"} qui ${E.c.vp}.`
            : mode === "inter"
              ? `On compte, parmi TOUS les ${S.noms}, ${S.f ? "celles" : "ceux"} qui vérifient les deux conditions à la fois.`
              : `On compte, parmi TOUS les ${S.noms}, ${S.f ? "celles" : "ceux"} qui ${E.c.vp} : aucune population réduite.`,
          mode === "cond"
            ? `C'est une probabilité conditionnelle : $${Pc(C, E)}$ avec $${C.L}$ « ${C.c.court} » et $${E.L}$ « ${E.c.court} ».`
            : mode === "inter"
              ? `C'est une intersection : $${Pi(C, E)}$ avec $${C.L}$ « ${C.c.court} » et $${E.L}$ « ${E.c.court} ».`
              : `C'est une probabilité simple : $P(${E.L})$ avec $${E.L}$ « ${E.c.court} ».`
        ),
        choiceDiagnostics:
          mode === "cond"
            ? [{ choice: INTER, cause: "« parmi les … » réduit la population : ce n'est pas « les deux à la fois parmi tout le monde »" }]
            : [{ choice: COND, cause: "aucune population réduite ici : on compte sur tous les individus" }],
      };
    },
  },

  /* ═══════════ auto_proba_conditionnelle_lecture ═══════════ */

  {
    kind: "template",
    id: "premiere_auto_proba_cond_lecture_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_proba_lecture",
    microId: "auto_proba_conditionnelle_lecture",
    difficulty: 3,
    theme: "neutral",
    hint: "« Parmi les… » : le dénominateur est le total de cette ligne, pas le total général.",
    tags: ["premiere", "maths", "probabilites", "tableau", "automatisme", "template", "short"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `${enonceTableau(t)} Parmi les ${s.individu}s ${s.ligneB}, ` +
          `quelle est la probabilité d'être ${s.colonneA} ? (Réponds par une fraction.)`,
        format: "short",
        expected: reponsesProba(t.c, t.ligne2),
        comparator: "fraction_decimal_equivalent",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une probabilité conditionnelle se lit directement dans un tableau croisé : la case au numérateur, le total de la sous-population au dénominateur.",
          `« Parmi les ${s.ligneB} » réduit la population à cette ligne.`,
          `Ils sont $${t.c} + ${t.d} = ${t.ligne2}$, dont $${t.c}$ sont ${s.colonneA} : la probabilité vaut $\\dfrac{${t.c}}{${t.ligne2}}$.`,
          `La probabilité cherchée est $\\dfrac{${t.c}}{${t.ligne2}}$.`
        ),
      };
    },
  },

  /* ═══════════════ auto_proba_distinguer ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_proba_distinguer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_proba_lecture",
    microId: "auto_proba_distinguer",
    difficulty: 4,
    theme: "neutral",
    hint: "Trois quotients, trois dénominateurs différents : le total, la ligne, la colonne.",
    tags: ["premiere", "maths", "probabilites", "tableau", "automatisme", "template"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `${enonceTableau(t)} On note $A$ « être ${s.ligneA} » et $B$ « être ${s.colonneA} ». ` +
          `Laquelle de ces trois quantités se calcule en divisant par le TOTAL des ${t.total} ${s.individu}s ?`,
        format: "qcm",
        choices: makeChoices("$P(A \\cap B)$", [
          "$P_A(B)$",
          "$P_B(A)$",
          "les trois se divisent par le total",
        ]),
        expected: ["$P(A \\cap B)$"],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Les trois quantités ont le même numérateur — l'effectif de la case — mais trois dénominateurs différents.",
          "On identifie la population de référence de chacune.",
          `$P(A \\cap B) = \\dfrac{${t.a}}{${t.total}}$ : population entière. ` +
            `$P_A(B) = \\dfrac{${t.a}}{${t.ligne1}}$ : réduite à $A$. ` +
            `$P_B(A) = \\dfrac{${t.a}}{${t.col1}}$ : réduite à $B$.`,
          `Seule $P(A \\cap B)$ se divise par le total. Les deux autres sont des probabilités CONDITIONNELLES : ` +
            `leur dénominateur est celui de la condition.`
        ),
        choiceDiagnostics: [
          {
            choice: "les trois se divisent par le total",
            cause: "une conditionnelle se divise par l'effectif de la condition, jamais par le total",
          },
        ],
      };
    },
  },

  /* ═══ auto_proba_intersection_tableau (automatisme, domaine BOP1AU) ═══ */

  {
    kind: "template",
    id: "premiere_auto_proba_intersection_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_proba_lecture",
    microId: "auto_proba_intersection_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "L'intersection se lit dans UNE case, et se divise par l'effectif TOTAL.",
    tags: ["premiere", "maths", "probabilites", "tableau", "automatisme", "template", "short"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `${enonceTableau(t)} Quelle est la probabilité que le ${s.individu} choisi soit ` +
          `à la fois ${s.ligneA} et ${s.colonneA} ? (Réponds par une fraction.)`,
        format: "short",
        expected: reponsesProba(t.a, t.total),
        comparator: "fraction_decimal_equivalent",
        canvas: canvasTableau(t),
        explanation: exp(
          "$P(A \\cap B)$ est la probabilité que les DEUX évènements se produisent ensemble.",
          "On lit la case située au croisement de la ligne et de la colonne, puis on divise par l'effectif total.",
          `La case « ${s.ligneA} » × « ${s.colonneA} » contient $${t.a}$, et le total est $${t.total}$.`,
          `$P(A \\cap B) = \\dfrac{${t.a}}{${t.total}}$. ⚠️ On divise par le TOTAL, pas par la ligne : diviser par $${t.ligne1}$ donnerait la conditionnelle $P_A(B)$.`
        ),
      };
    },
  },

  /* ═══════════════ alea_cond_notation ═══════════════ */

  {
    kind: "template",
    id: "premiere_alea_notation_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle",
    microId: "alea_cond_notation",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans $P_A(B)$, la lettre en indice est la CONDITION, celle qu'on sait déjà vraie.",
    tags: ["premiere", "maths", "probabilites", "notation", "template"],
    generate: () => {
      const S = pick(SITUS);
      const [C, E] = paire(S);
      const lE = leS(S), ch = choisiS(S), pr = prS(S);
      const phrase = pick([
        `la probabilité que ${lE} ${ch} ${E.c.sj}, sachant qu'${pr} ${C.c.v}`,
        `la proportion ${deNoms(S)} ${E.c.p} parmi les ${S.noms} ${C.c.p}`,
        `la probabilité qu'${unS(S)} ${C.c.s1} ${E.c.sj}`,
        `la probabilité, si ${lE} ${ch} ${C.c.v}, qu'${pr} ${E.c.sj}`,
      ]);
      const bon = `$${Pc(C, E)}$`;
      const autreE = evs(S).find((x) => x.axe === E.axe && x.i !== E.i)!;
      return {
        text: `${S.intro} ${notaS(S)} Comment s'écrit « ${phrase} » ?`,
        format: "qcm",
        choices: qcm(bon, [`$${Pc(E, C)}$`, `$${Pi(C, E)}$`, `$P(${E.L})$`, `$${Pc(C, autreE)}$`]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          `$${Pc(C, E)}$ se lit « probabilité de $${E.L}$ sachant $${C.L}$ » : l'indice porte la CONDITION, ce que l'on sait déjà.`,
          "On repère ce qui est SU (la population de référence) et ce qui est CHERCHÉ.",
          `Su : ${lE} ${C.c.v}, c'est $${C.L}$ — donc en indice. Cherché : ${lE} ${E.c.v}, c'est $${E.L}$ — donc entre parenthèses.` +
            (C.i === 1 || E.i === 1 ? " La barre au-dessus d'une lettre désigne l'évènement contraire." : ""),
          `L'écriture est $${Pc(C, E)}$.`
        ),
        choiceDiagnostics: [
          { choice: `$${Pc(E, C)}$`, cause: "a inversé la condition et l'évènement cherché — ce sont deux probabilités différentes" },
          { choice: `$${Pi(C, E)}$`, cause: "a écrit l'intersection : elle se calcule sur la population entière, pas sur la population réduite" },
        ],
      };
    },
  },

  /* ═══════════════ alea_cond_tableau ═══════════════ */

  {
    kind: "template",
    id: "premiere_alea_tableau_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle",
    microId: "alea_cond_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Numérateur : ceux qui vérifient les deux. Dénominateur : ceux qui vérifient la condition.",
    tags: ["premiere", "maths", "probabilites", "tableau", "template", "short"],
    generate: () => {
      const t = tableauV();
      const { S } = t;
      const [C, E] = paire(S);
      const effC = effV(t, C), n = caseV(t, C, E);
      return {
        text: `${enonceV(t)} ${questionCond(S, C, E)} (Réponds par une fraction.)`,
        format: "short",
        expected: ecritures(n, effC),
        comparator: "fraction_decimal_equivalent",
        canvas: canvasV(t),
        explanation: exp(
          "Probabilité conditionnelle = $\\dfrac{\\text{effectif de ceux qui vérifient les deux}}{\\text{effectif de la condition}}$.",
          `La condition (${leS(S)} ${C.c.v}) réduit la population aux ${S.noms} ${C.c.p} : ${prsS(S)} sont $${effC}$, total de la ${C.axe === 0 ? "ligne" : "colonne"} « ${C.c.court} ».`,
          `Parmi ${S.f ? "elles" : "eux"}, la case « ${C.c.court} » × « ${E.c.court} » donne $${n}$ ${S.noms} qui ${E.c.vp} : $${Pc(C, E)} = ${egalites(n, effC)}$.`,
          `La probabilité cherchée est $${egalites(n, effC)}$. ⚠️ On ne divise pas par le total $${t.total}$ : la condition a réduit la population.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_alea_tableau_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle",
    microId: "alea_cond_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Une probabilité simple se calcule sur la population entière.",
    tags: ["premiere", "maths", "probabilites", "tableau", "template", "short"],
    generate: () => {
      const t = tableauV();
      const { S } = t;
      const E = pick(evs(S));
      const effE = effV(t, E);
      const [x, y] =
        E.axe === 0 ? (E.i === 0 ? [t.a, t.b] : [t.c, t.d]) : E.i === 0 ? [t.a, t.c] : [t.b, t.d];
      const question = pick([
        `Quelle est la probabilité que ${leS(S)} ${choisiS(S)} ${E.c.sj} ?`,
        `${notaS(S)} Calcule $P(${E.L})$.`,
        `Quelle est la proportion ${deNoms(S)} ${E.c.p}, parmi tous les ${S.noms} ?`,
        `Quelle est la probabilité de tomber sur ${unS(S)} ${E.c.s1} ?`,
      ]);
      return {
        text: `${enonceV(t)} ${question} (Réponds par une fraction.)`,
        format: "short",
        expected: ecritures(effE, t.total),
        comparator: "fraction_decimal_equivalent",
        canvas: canvasV(t),
        explanation: exp(
          "En situation d'équiprobabilité, $P(E) = \\dfrac{\\text{effectif de } E}{\\text{effectif total}}$.",
          `On additionne les deux cases de la ${E.axe === 0 ? "ligne" : "colonne"} « ${E.c.court} » (ou on lit son total).`,
          `$${x} + ${y} = ${effE}$ ${S.noms} ${E.c.p}, sur $${t.total}$ : $P(${E.L}) = ${egalites(effE, t.total)}$.`,
          `La probabilité est $${egalites(effE, t.total)}$. Ici aucune condition ne restreint la population : on divise bien par le total.`
        ),
      };
    },
  },

  /* ═══════════════ alea_cond_formule ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_alea_formule_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle_calcul",
    microId: "alea_cond_formule",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle formule définit la probabilité conditionnelle $P_A(B)$, avec $P(A) \\neq 0$ ?",
    format: "qcm",
    choices: [
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(B)}$",
      "$P_A(B) = P(A) \\times P(B)$",
      "$P_A(B) = P(A \\cap B) \\times P(A)$",
    ],
    expected: ["$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$"],
    comparator: "mcq_exact",
    hint: "On divise par la probabilité de ce qu'on SAIT déjà.",
    explanation: exp(
      "$P_A(B)$ est la probabilité de $B$ dans la population réduite à $A$.",
      "Au numérateur, ceux qui vérifient les deux ; au dénominateur, la condition.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "C'est la même chose qu'un quotient d'effectifs, divisé en haut et en bas par l'effectif total."
    ),
    choiceDiagnostics: [
      {
        choice: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(B)}$",
        cause: "a divisé par l'évènement cherché au lieu de la condition — c'est $P_B(A)$",
      },
    ],
    tags: ["premiere", "maths", "probabilites", "conditionnelle", "formule"],
  },

  {
    kind: "template",
    id: "premiere_alea_formule_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle_calcul",
    microId: "alea_cond_formule",
    difficulty: 3,
    theme: "neutral",
    hint: "$P_A(B) = \\frac{P(A \\cap B)}{P(A)}$ : divise l'intersection par la condition.",
    tags: ["premiere", "maths", "probabilites", "conditionnelle", "template", "short"],
    generate: () => {
      const S = pick(SITUS);
      const [C, E] = paire(S, true);
      // P(C ∩ E) = P(C) × P_C(E) : on tire la réponse, puis on fabrique l'intersection.
      const pC = pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 0.8] as const);
      const val = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9] as const);
      const inter = Math.round(pC * val * 1e6) / 1e6;
      const donnees = pick([
        `${notaS(S)} On sait que $P(${C.L}) = ${fr(pC)}$ et $${Pi(C, E)} = ${fr(inter)}$.`,
        `${pct(pC * 100)} des ${S.noms} ${C.c.vp}, et ${pct(inter * 100)} des ${S.noms} ${C.c.vp} et ${E.c.vp}.`,
        `La probabilité qu'${unS(S)} ${choisiS(S)} au hasard ${C.c.sj} vaut $${fr(pC)}$ ; celle qu'${prS(S)} ${C.c.sj} et ${E.c.sj} vaut $${fr(inter)}$.`,
      ]);
      const question = donnees.startsWith("On note")
        ? pick([`Combien vaut $${Pc(C, E)}$ ?`, `Calcule $${Pc(C, E)}$.`])
        : pick([
            `On choisit au hasard ${unS(S)} ${C.c.s1}. Quelle est la probabilité qu'${prS(S)} ${E.c.sj} ?`,
            `Quelle est la proportion ${deNoms(S)} ${E.c.p} parmi les ${S.noms} ${C.c.p} ?`,
            `Sachant qu'${unS(S)} ${C.c.v}, quelle est la probabilité qu'${prS(S)} ${E.c.sj} ?`,
          ]);
      return {
        text: `${S.intro} ${donnees} ${question} (Réponds par un nombre décimal.)`,
        format: "short",
        expected: ecrDec(val),
        comparator: "number_equal",
        explanation: exp(
          `$${Pc(C, E)} = \\dfrac{${Pi(C, E)}}{P(${C.L})}$ : l'intersection divisée par la probabilité de la CONDITION.`,
          `Ici la condition est $${C.L}$ (${leS(S)} ${C.c.v}) et l'évènement cherché $${E.L}$ (${leS(S)} ${E.c.v}).`,
          `$${Pc(C, E)} = \\dfrac{${fr(inter)}}{${fr(pC)}} = ${fr(val)}$.`,
          `La probabilité cherchée vaut $${fr(val)}$, soit ${pct(val * 100)} des ${S.noms} ${C.c.p}. ⚠️ Ne pas multiplier : $${fr(inter)} \\times ${fr(pC)}$ n'a aucun sens ici.`
        ),
      };
    },
  },

  /* ═══════════════ alea_cond_intersection ═══════════════ */

  {
    kind: "template",
    id: "premiere_alea_intersection_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle_calcul",
    microId: "alea_cond_intersection",
    difficulty: 3,
    theme: "neutral",
    hint: "La formule se retourne : $P(A \\cap B) = P(A) \\times P_A(B)$.",
    tags: ["premiere", "maths", "probabilites", "intersection", "template", "short"],
    generate: () => {
      const S = pick(SITUS);
      const [C, E] = paire(S, true);
      const pC = pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9] as const);
      const pCE = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9] as const);
      const val = Math.round(pC * pCE * 1e6) / 1e6;
      const forme = pick(["nota", "phrase", "phrase", "arbre"] as const);
      const donnees =
        forme === "nota"
          ? `${notaS(S)} On sait que $P(${C.L}) = ${fr(pC)}$ et $${Pc(C, E)} = ${fr(pCE)}$.`
          : forme === "arbre"
            ? `${notaS(S)} Dans l'arbre pondéré, la branche qui mène à $${C.L}$ porte $${fr(pC)}$, et la branche de $${C.L}$ vers $${E.L}$ porte $${fr(pCE)}$.`
            : pick([
                `${pct(pC * 100)} des ${S.noms} ${C.c.vp}. Parmi ${S.f ? "elles" : "eux"}, ${pct(pCE * 100)} ${E.c.vp}.`,
                `${pct(pC * 100)} des ${S.noms} ${C.c.vp}, et ${pct(pCE * 100)} des ${S.noms} ${C.c.p} ${E.c.vp}.`,
              ]);
      const question =
        forme === "phrase"
          ? pick([
              `Quelle est la probabilité qu'${unS(S)} ${choisiS(S)} au hasard ${C.c.sj} et ${E.c.sj} ?`,
              `Quelle proportion de l'ensemble des ${S.noms} ${C.c.vp} et ${E.c.vp} ?`,
            ])
          : pick([`Combien vaut $${Pi(C, E)}$ ?`, `Calcule $${Pi(C, E)}$.`]);
      return {
        text: `${S.intro} ${donnees} ${question} (Réponds par un nombre décimal.)`,
        format: "short",
        expected: ecrDec(val),
        comparator: "number_equal",
        explanation: exp(
          `En multipliant $${Pc(C, E)} = \\dfrac{${Pi(C, E)}}{P(${C.L})}$ par $P(${C.L})$ : $${Pi(C, E)} = P(${C.L}) \\times ${Pc(C, E)}$.`,
          "C'est le calcul d'un chemin dans un arbre pondéré : on multiplie les probabilités rencontrées.",
          `$${Pi(C, E)} = ${fr(pC)} \\times ${fr(pCE)} = ${fr(val)}$.`,
          `$${Pi(C, E)} = ${fr(val)}$ : ${pct(val * 100)} de TOUS les ${S.noms} ${C.c.vp} et ${E.c.vp}. ⚠️ Ce n'est pas ${pct(pCE * 100)} : ce pourcentage-là ne porte que sur les ${S.noms} ${C.c.p}.`
        ),
      };
    },
  },

  /* ═══════════════ alea_cond_interpreter ═══════════════ */

  {
    kind: "template",
    id: "premiere_alea_interpreter_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle_calcul",
    microId: "alea_cond_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "La phrase doit dire sur quelle population on compte.",
    tags: ["premiere", "maths", "probabilites", "interpreter", "template"],
    generate: () => {
      const S = pick(SITUS);
      const [C, E] = paire(S);
      const N = S.noms, dN = deNoms(S);
      const n = ri(1, 19) * 5;
      const forme = pick(["sens", "valeur", "valeur", "traduire"] as const);
      let text: string, bon: string, inverse: string, inter: string, simple: string;
      if (forme === "sens") {
        text = `${S.intro} ${notaS(S)} Que signifie $${Pc(C, E)}$ ?`;
        bon = `la proportion ${dN} ${E.c.p} parmi les ${N} ${C.c.p}`;
        inverse = `la proportion ${dN} ${C.c.p} parmi les ${N} ${E.c.p}`;
        inter = `la proportion ${dN} ${C.c.p} et ${E.c.p}, parmi tous les ${N}`;
        simple = `la proportion ${dN} ${E.c.p}, parmi tous les ${N}`;
      } else if (forme === "valeur") {
        text = `${S.intro} ${notaS(S)} On a calculé $${Pc(C, E)} = ${fr(n / 100)}$. Quelle phrase traduit ce résultat ?`;
        bon = `${pct(n)} des ${N} ${C.c.p} ${E.c.vp}.`;
        inverse = `${pct(n)} des ${N} ${E.c.p} ${C.c.vp}.`;
        inter = `${pct(n)} des ${N} ${C.c.vp} et ${E.c.vp}.`;
        simple = `${pct(n)} des ${N} ${E.c.vp}.`;
      } else {
        text = `${S.intro} ${notaS(S)} Une enquête affirme : « ${pct(n)} des ${N} ${C.c.p} ${E.c.vp}. » Comment traduire cette phrase ?`;
        bon = `$${Pc(C, E)} = ${fr(n / 100)}$`;
        inverse = `$${Pc(E, C)} = ${fr(n / 100)}$`;
        inter = `$${Pi(C, E)} = ${fr(n / 100)}$`;
        simple = `$P(${E.L}) = ${fr(n / 100)}$`;
      }
      return {
        text,
        format: "qcm",
        choices: qcm(bon, [inverse, inter, simple]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          `$${Pc(C, E)}$ se lit « probabilité de $${E.L}$ sachant $${C.L}$ » : la population de référence est celle de l'INDICE.`,
          "On traduit l'indice par « parmi les … » : c'est la population dans laquelle on compte.",
          `Indice $${C.L}$ : les ${N} ${C.c.p}, c'est la population. Évènement $${E.L}$ : ${S.f ? "celles" : "ceux"} qui ${E.c.vp}, c'est ce que l'on compte.`,
          forme === "sens"
            ? `$${Pc(C, E)}$ est la proportion ${dN} ${E.c.p} PARMI les ${N} ${C.c.p}.`
            : `$${Pc(C, E)} = ${fr(n / 100)}$ : ${pct(n)} des ${N} ${C.c.p} ${E.c.vp}. ⚠️ Rien n'est dit sur la proportion parmi TOUS les ${N}.`
        ),
        choiceDiagnostics: [
          { choice: inter, cause: `décrit $${Pi(C, E)}$, calculée sur la population entière` },
          { choice: inverse, cause: `décrit $${Pc(E, C)}$ : la condition et l'évènement cherché sont inversés` },
        ],
      };
    },
  },

  /* ═══════════════ alea_cond_faux_positifs ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_alea_faux_positifs_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle_calcul",
    microId: "alea_cond_faux_positifs",
    difficulty: 4,
    theme: "neutral",
    text:
      "Une maladie touche $1\\,\\%$ d'une population. Un test la détecte chez $99\\,\\%$ des malades. " +
      "On note $M$ « être malade » et $T$ « avoir un test positif ». " +
      "La phrase « $99\\,\\%$ des malades ont un test positif » s'écrit :",
    format: "qcm",
    choices: ["$P_M(T) = 0,99$", "$P_T(M) = 0,99$", "$P(M \\cap T) = 0,99$", "$P(M) = 0,99$"],
    expected: ["$P_M(T) = 0,99$"],
    comparator: "mcq_exact",
    hint: "« des malades » indique la population de référence.",
    explanation: exp(
      "L'indice porte la population de référence, celle qui suit « parmi » ou « des ».",
      "« $99\\,\\%$ DES MALADES ont un test positif » : la population est celle des malades, on cherche la proportion de tests positifs.",
      "Donc $P_M(T) = 0,99$.",
      "$P_T(M)$ serait tout autre chose : la proportion de malades PARMI LES TESTS POSITIFS. Avec une maladie rare, elle est bien plus faible — c'est le paradoxe des faux positifs, et c'est cette confusion que le programme demande de travailler."
    ),
    choiceDiagnostics: [
      {
        choice: "$P_T(M) = 0,99$",
        cause: "a inversé : ce serait « 99 % des tests positifs correspondent à des malades », ce qui est faux ici",
      },
    ],
    tags: ["premiere", "maths", "probabilites", "faux-positifs", "piege"],
  },

  {
    kind: "template",
    id: "premiere_alea_faux_positifs_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle_calcul",
    microId: "alea_cond_faux_positifs",
    difficulty: 4,
    theme: "neutral",
    hint: "Les deux fractions n'ont pas le même dénominateur : l'une divise par la ligne, l'autre par la colonne.",
    tags: ["premiere", "maths", "probabilites", "faux-positifs", "template"],
    generate: () => {
      const t = tableauV();
      const { S } = t;
      const [C, E] = paire(S);
      const n = caseV(t, C, E), effC = effV(t, C), effE = effV(t, E);
      const f = `\\dfrac{${n}}{${effC}}`;
      const EGALES = "les deux conditionnelles, elles sont égales";
      const bon = `$${Pc(C, E)}$`;
      const question = pick([
        `Laquelle de ces probabilités vaut $${f}$ ?`,
        `Le quotient $${f}$ est égal à :`,
        `Un élève calcule $${f}$. Quelle probabilité a-t-il calculée ?`,
      ]);
      return {
        text: `${enonceV(t)} ${notaS(S)} ${question}`,
        format: "qcm",
        choices: qcm(bon, [`$${Pc(E, C)}$`, `$${Pi(C, E)}$`, EGALES]),
        expected: [bon],
        comparator: "mcq_exact",
        canvas: canvasV(t),
        explanation: exp(
          "Le dénominateur d'une probabilité conditionnelle est l'effectif de la CONDITION ; le numérateur, la case des deux à la fois.",
          `On regarde $${effC}$ : de quelle population est-ce l'effectif ?`,
          `$${effC}$ est le total de la ${C.axe === 0 ? "ligne" : "colonne"} « ${C.c.court} » : la condition est $${C.L}$. La case $${n}$ est au croisement de « ${C.c.court} » et « ${E.c.court} ».`,
          `$${f} = ${Pc(C, E)}$. L'autre, $${Pc(E, C)} = \\dfrac{${n}}{${effE}}$ : même numérateur, autre dénominateur, donc une autre probabilité. Les confondre, c'est l'erreur des « faux positifs ».`
        ),
        choiceDiagnostics: [
          { choice: EGALES, cause: `confond $${Pc(C, E)}$ et $${Pc(E, C)}$ : elles n'ont pas le même dénominateur` },
          { choice: `$${Pi(C, E)}$`, cause: `l'intersection se divise par le total $${t.total}$` },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_alea_faux_positifs_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle_calcul",
    microId: "alea_cond_faux_positifs",
    difficulty: 4,
    theme: "neutral",
    hint: "Construis le tableau des effectifs : vrais positifs, faux positifs. Puis divise par le nombre TOTAL de positifs.",
    tags: ["premiere", "maths", "probabilites", "faux-positifs", "template"],
    generate: () => {
      const D = pick(DETECTS);
      const p = pick([1, 2, 4, 5, 10] as const);
      const s = pick([90, 95, 98, 99] as const);
      const f = pick([1, 2, 3, 5, 10] as const);
      const M = 100 * p; // « malades » sur 10 000
      const VP = p * s; // M × s / 100
      const FP = (100 - p) * f; // (10 000 − M) × f / 100
      const POS = VP + FP;
      const r2 = (x: number) => Math.round(x * 100) / 100;
      const q = pick(["vrai", "vrai", "faux", "nombre"] as const);
      const consigne =
        q === "vrai"
          ? `On choisit au hasard ${D.un1}. Quelle est la probabilité ${D.qEtat} ? (Arrondis au centième.)`
          : q === "faux"
            ? `Parmi les ${D.pos}, quelle est la proportion de ${D.sains} ? (Arrondis au centième.)`
            : `Combien de ${D.noms} ${D.verbePos}, en tout ?`;
      const val = q === "vrai" ? r2(VP / POS) : q === "faux" ? r2(FP / POS) : POS;
      const tableauTxt =
        `Sur $10\\,000$ : $${M}$ ${D.M === "M" ? "malades" : "concernés"} ($${p}\\,\\%$), dont $${M} \\times ${fr(s / 100)} = ${VP}$ positifs (vrais positifs) ; ` +
        `$${10000 - M}$ non concernés, dont $${10000 - M} \\times ${fr(f / 100)} = ${FP}$ positifs à tort (faux positifs). ` +
        `En tout : $${VP} + ${FP} = ${POS}$ positifs.`;
      return {
        text: `${D.base(p, s, f)} ${consigne}`,
        format: "short",
        expected:
          q === "nombre"
            ? [String(POS)]
            : [...new Set([fr(val), String(val), val.toFixed(2).replace(".", ","), `${fr(Math.round(val * 100))} %`])],
        comparator: "number_equal",
        explanation: exp(
          `On note $${D.M}$ l'état cherché et $${D.T}$ l'alerte (test positif). L'énoncé donne $P_{${D.M}}(${D.T}) = ${fr(s / 100)}$, mais la question porte sur $P_{${D.T}}(${D.M})$ : la condition n'est plus la même.`,
          "On construit les effectifs sur $10\\,000$, puis on se place dans la population des positifs.",
          tableauTxt,
          q === "vrai"
            ? `$P_{${D.T}}(${D.M}) = \\dfrac{${VP}}{${POS}} \\approx ${fr(val)}$. Bien loin de $${fr(s / 100)}$ : quand l'état est rare, les faux positifs, nombreux, noient les vrais.`
            : q === "faux"
              ? `$P_{${D.T}}(\\overline{${D.M}}) = \\dfrac{${FP}}{${POS}} \\approx ${fr(val)}$ : ${pct(Math.round(val * 100))} des alertes sont des fausses alertes.`
              : `Il y a $${POS}$ positifs, dont seulement $${VP}$ vrais positifs.`
        ),
      };
    },
  },

  /* ═══════════════ alea_indep_definition ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_alea_indep_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_independance",
    microId: "alea_indep_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Deux évènements $A$ et $B$ sont indépendants lorsque :",
    format: "qcm",
    choices: [
      "$P_B(A) = P(A)$",
      "$P(A \\cap B) = 0$",
      "$P(A) + P(B) = 1$",
      "$A$ et $B$ ne peuvent pas se produire ensemble",
    ],
    expected: ["$P_B(A) = P(A)$"],
    comparator: "mcq_exact",
    hint: "Indépendants : savoir que $B$ s'est produit ne change rien à la probabilité de $A$.",
    explanation: exp(
      "$A$ et $B$ sont indépendants si la réalisation de l'un ne modifie pas la probabilité de l'autre : $P_B(A) = P(A)$, avec $P(B) \\neq 0$.",
      "On traduit : « savoir que $B$ est arrivé n'apprend rien sur $A$ ».",
      "Cette condition équivaut à $P(A \\cap B) = P(A) \\times P(B)$, forme souvent plus commode pour le calcul.",
      "L'indépendance est $P_B(A) = P(A)$ — à ne pas confondre avec l'incompatibilité, qui est $P(A \\cap B) = 0$."
    ),
    choiceDiagnostics: [
      {
        choice: "$P(A \\cap B) = 0$",
        cause: "c'est l'incompatibilité : deux évènements incompatibles sont au contraire très liés — si l'un arrive, l'autre est impossible",
      },
    ],
    tags: ["premiere", "maths", "probabilites", "independance"],
  },

  {
    kind: "template",
    id: "premiere_alea_indep_definition_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_independance",
    microId: "alea_indep_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "Indépendants : savoir que l'un s'est produit ne change RIEN à la probabilité de l'autre.",
    tags: ["premiere", "maths", "probabilites", "independance", "template"],
    generate: () => {
      // Les lettres changent d'un tirage à l'autre : $A$/$B$, $E$/$F$, $M$/$T$…
      const [A, B] = pick([["A", "B"], ["E", "F"], ["M", "T"], ["R", "S"], ["U", "V"], ["C", "D"], ["G", "H"]] as const);
      const x = pick([0.2, 0.3, 0.4, 0.6, 0.7] as const);
      const y = pick([0.25, 0.5, 0.75, 0.8] as const);
      const xy = Math.round(x * y * 1e6) / 1e6;
      const cas = pick([
        {
          question: `Deux évènements $${A}$ et $${B}$ sont indépendants lorsque :`,
          bonne: `$P_{${B}}(${A}) = P(${A})$`,
          pieges: [`$P(${A} \\cap ${B}) = 0$`, `$P(${A}) + P(${B}) = 1$`, `$P(${A}) = P(${B})$`],
          cle: `Savoir que $${B}$ est arrivé n'apprend rien sur $${A}$ : la probabilité de $${A}$ est inchangée.`,
        },
        {
          question: `Quelle égalité caractérise aussi l'indépendance de $${A}$ et $${B}$ ?`,
          bonne: `$P(${A} \\cap ${B}) = P(${A}) \\times P(${B})$`,
          pieges: [
            `$P(${A} \\cap ${B}) = P(${A}) + P(${B})$`,
            `$P(${A} \\cap ${B}) = P(${A}) - P(${B})$`,
            `$P(${A} \\cap ${B}) = 1$`,
          ],
          cle: `En multipliant $P_{${B}}(${A}) = P(${A})$ par $P(${B})$, on obtient $P(${A} \\cap ${B}) = P(${A}) \\times P(${B})$.`,
        },
        {
          question: `Si $${A}$ et $${B}$ sont indépendants et que l'on apprend que $${B}$ s'est produit, que devient la probabilité de $${A}$ ?`,
          bonne: "elle ne change pas",
          pieges: ["elle augmente", "elle diminue", "elle devient nulle"],
          cle: `C'est la définition même : l'information sur $${B}$ n'apporte rien sur $${A}$.`,
        },
        {
          question: `Deux évènements $${A}$ et $${B}$ de probabilités non nulles peuvent-ils être indépendants ?`,
          bonne: "oui, c'est le cas courant",
          pieges: ["non, jamais", "oui, seulement s'ils ont la même probabilité", "oui, seulement s'ils sont incompatibles"],
          cle: `L'indépendance n'impose aucune égalité entre $P(${A})$ et $P(${B})$ : elle porte sur l'absence d'influence.`,
        },
        {
          question: `Que signifie la notation $P_{${B}}(${A})$ dans la définition de l'indépendance ?`,
          bonne: `la probabilité de $${A}$ sachant que $${B}$ est réalisé`,
          pieges: [
            `la probabilité de $${B}$ sachant $${A}$`,
            `la probabilité que $${A}$ et $${B}$ se produisent ensemble`,
            `le produit de $P(${A})$ par $P(${B})$`,
          ],
          cle: `L'indice porte la condition : $P_{${B}}(${A})$ se lit « probabilité de $${A}$ SACHANT $${B}$ ».`,
        },
        {
          question: `$${A}$ et $${B}$ sont indépendants, avec $P(${A}) = ${fr(x)}$ et $P(${B}) = ${fr(y)}$. Combien vaut $P_{${B}}(${A})$ ?`,
          bonne: `$${fr(x)}$`,
          pieges: [`$${fr(y)}$`, `$${fr(xy)}$`, `$${fr(Math.round((1 - x) * 100) / 100)}$`],
          cle: `Indépendants : savoir que $${B}$ est réalisé ne change pas la probabilité de $${A}$, donc $P_{${B}}(${A}) = P(${A}) = ${fr(x)}$.`,
        },
        {
          question: `On sait que $P(${A}) = ${fr(x)}$, $P(${B}) = ${fr(y)}$ et $P(${A} \\cap ${B}) = ${fr(xy)}$. Que peut-on dire de $${A}$ et $${B}$ ?`,
          bonne: "ils sont indépendants",
          pieges: ["ils sont incompatibles", "ils ne sont pas indépendants", "ils sont contraires l'un de l'autre"],
          cle: `$P(${A}) \\times P(${B}) = ${fr(x)} \\times ${fr(y)} = ${fr(xy)} = P(${A} \\cap ${B})$ : l'égalité de l'indépendance est vérifiée.`,
        },
        {
          question: `On sait que $P(${A}) = ${fr(x)}$ et $P_{${B}}(${A}) = ${fr(Math.round((x + 0.1) * 100) / 100)}$. Que peut-on dire de $${A}$ et $${B}$ ?`,
          bonne: "ils ne sont pas indépendants",
          pieges: ["ils sont indépendants", "ils sont incompatibles", "on ne peut rien dire sans $P(" + B + ")$"],
          cle: `Savoir que $${B}$ est réalisé fait passer la probabilité de $${A}$ de $${fr(x)}$ à $${fr(Math.round((x + 0.1) * 100) / 100)}$ : l'information a changé quelque chose.`,
        },
        {
          question: `$${A}$ et $${B}$ sont incompatibles, avec $P(${A}) = ${fr(x)}$ et $P(${B}) = ${fr(y)}$. Sont-ils indépendants ?`,
          bonne: "non, car $P(" + A + " \\cap " + B + ") = 0$ alors que $P(" + A + ") \\times P(" + B + ") \\neq 0$",
          pieges: [
            "oui, car ils ne peuvent pas se produire ensemble",
            "oui, car incompatible veut dire indépendant",
            "on ne peut pas savoir",
          ],
          cle: `Incompatibles : $P(${A} \\cap ${B}) = 0$, mais $P(${A}) \\times P(${B}) = ${fr(xy)} \\neq 0$.`,
        },
      ]);
      return {
        text: cas.question,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.pieges),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "$A$ et $B$ sont indépendants si la réalisation de l'un ne modifie pas la probabilité de l'autre : $P_B(A) = P(A)$, avec $P(B) \\neq 0$.",
          "On traduit la situation en termes d'information : ce que l'on apprend change-t-il quelque chose ?",
          cas.cle,
          `${cas.bonne.charAt(0).toUpperCase()}${cas.bonne.slice(1)}. ` +
            `⚠️ À ne pas confondre avec l'incompatibilité, qui est $P(A \\cap B) = 0$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_alea_indep_definition_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_independance",
    microId: "alea_indep_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la probabilité sur TOUTE la population et la probabilité dans la population réduite : égales, l'information n'a rien changé.",
    tags: ["premiere", "maths", "probabilites", "independance", "template"],
    generate: () => {
      const S = pick(SITUS);
      const [C, E] = paire(S, true);
      const x = ri(3, 17) * 5;
      const indep = Math.random() < 0.5;
      const y = indep ? x : pick([x - 15, x - 10, x - 5, x + 5, x + 10, x + 15].filter((v) => v > 0 && v < 100));
      const donnees = pick([
        `${pct(x)} des ${S.noms} ${E.c.vp}. Parmi les ${S.noms} ${C.c.p}, ${pct(y)} ${E.c.vp}.`,
        `${notaS(S)} On sait que $P(${E.L}) = ${fr(x / 100)}$ et $${Pc(C, E)} = ${fr(y / 100)}$.`,
        `La probabilité qu'${unS(S)} ${choisiS(S)} au hasard ${E.c.sj} vaut $${fr(x / 100)}$ ; sachant qu'${prS(S)} ${C.c.v}, elle vaut $${fr(y / 100)}$.`,
      ]);
      const INDEP = `les évènements « ${C.c.court} » et « ${E.c.court} » sont indépendants`;
      const DEP = `les évènements « ${C.c.court} » et « ${E.c.court} » ne sont pas indépendants`;
      const INCOMP = `les évènements « ${C.c.court} » et « ${E.c.court} » sont incompatibles`;
      const RIEN = "on ne peut rien en déduire sans le tableau complet";
      const bon = indep ? INDEP : DEP;
      return {
        text: `${S.intro} ${donnees} Que peut-on en déduire ?`,
        format: "qcm",
        choices: qcm(bon, [indep ? DEP : INDEP, INCOMP, RIEN]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          `Deux évènements sont indépendants lorsque $${Pc(C, E)} = P(${E.L})$ : savoir que ${leS(S)} ${C.c.v} ne change pas la probabilité qu'${prS(S)} ${E.c.sj}.`,
          "On compare la probabilité sur toute la population et la probabilité dans la population réduite.",
          `$P(${E.L}) = ${fr(x / 100)}$ et $${Pc(C, E)} = ${fr(y / 100)}$ : ${indep ? "les deux valeurs sont égales" : `$${fr(y / 100)} \\neq ${fr(x / 100)}$`}.`,
          indep
            ? "L'information n'a rien changé : les évènements sont indépendants."
            : `L'information change la probabilité (elle ${y > x ? "augmente" : "diminue"}) : les évènements ne sont PAS indépendants. Ils ne sont pas incompatibles pour autant : ${pct(y)} des ${S.noms} ${C.c.p} ${E.c.vp}.`
        ),
        choiceDiagnostics: [
          { choice: INCOMP, cause: "incompatible veut dire « jamais ensemble » : ici il y en a qui vérifient les deux" },
          { choice: RIEN, cause: "comparer $P_C(E)$ à $P(E)$ suffit pour conclure" },
        ],
      };
    },
  },

  /* ═══════════════ alea_indep_produit ═══════════════ */

  {
    kind: "template",
    id: "premiere_alea_indep_produit_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_independance",
    microId: "alea_indep_produit",
    difficulty: 3,
    theme: "neutral",
    hint: "Si $A$ et $B$ sont indépendants, $P(A \\cap B) = P(A) \\times P(B)$.",
    tags: ["premiere", "maths", "probabilites", "independance", "template", "short"],
    generate: () => {
      const D = pick(DUOS);
      const [L1, L2] = D.L;
      const x = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9] as const);
      const y = pick([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9] as const);
      const xy = Math.round(x * y * 1e6) / 1e6;
      const xny = Math.round((x - xy) * 1e6) / 1e6;
      const nota = `On note $${L1}$ « ${D.e[0]} » et $${L2}$ « ${D.e[1]} » ; ces évènements sont indépendants.`;
      const q = pick(["inter", "inter", "sauf", "retrouver"] as const);
      let donnees: string, question: string, val: number, calcul: string, conclusion: string;
      if (q === "inter") {
        donnees = `$P(${L1}) = ${fr(x)}$ et $P(${L2}) = ${fr(y)}$.`;
        question = pick([
          `Calcule $P(${L1} \\cap ${L2})$.`,
          "Quelle est la probabilité que les deux évènements se produisent ?",
          `Quelle est la probabilité d'avoir à la fois « ${D.e[0]} » et « ${D.e[1]} » ?`,
        ]);
        val = xy;
        calcul = `$P(${L1} \\cap ${L2}) = P(${L1}) \\times P(${L2}) = ${fr(x)} \\times ${fr(y)} = ${fr(xy)}$.`;
        conclusion = `$P(${L1} \\cap ${L2}) = ${fr(xy)}$.`;
      } else if (q === "sauf") {
        donnees = `$P(${L1}) = ${fr(x)}$ et $P(${L2}) = ${fr(y)}$.`;
        question = pick([
          `Calcule $P(${L1} \\cap \\overline{${L2}})$.`,
          `Quelle est la probabilité d'avoir « ${D.e[0]} », mais pas « ${D.e[1]} » ?`,
        ]);
        val = xny;
        calcul =
          `$P(${L1} \\cap ${L2}) = ${fr(x)} \\times ${fr(y)} = ${fr(xy)}$, puis ` +
          `$P(${L1} \\cap \\overline{${L2}}) = P(${L1}) - P(${L1} \\cap ${L2}) = ${fr(x)} - ${fr(xy)} = ${fr(xny)}$ ` +
          `(on retrouve $${fr(x)} \\times (1 - ${fr(y)}) = ${fr(xny)}$).`;
        conclusion = `$P(${L1} \\cap \\overline{${L2}}) = ${fr(xny)}$.`;
      } else {
        donnees = `$P(${L1}) = ${fr(x)}$ et $P(${L1} \\cap ${L2}) = ${fr(xy)}$.`;
        question = pick([`Combien vaut $P(${L2})$ ?`, `Retrouve la probabilité que « ${D.e[1]} ».`]);
        val = y;
        calcul = `$P(${L1}) \\times P(${L2}) = P(${L1} \\cap ${L2})$, donc $P(${L2}) = \\dfrac{${fr(xy)}}{${fr(x)}} = ${fr(y)}$.`;
        conclusion = `$P(${L2}) = ${fr(y)}$.`;
      }
      return {
        text: `${D.intro} ${nota} ${donnees} ${question} (Réponds par un nombre décimal.)`,
        format: "short",
        expected: ecrDec(val),
        comparator: "number_equal",
        explanation: exp(
          `Pour deux évènements indépendants, $P(${L1} \\cap ${L2}) = P(${L1}) \\times P(${L2})$.`,
          q === "retrouver" ? "On écrit l'égalité du produit, puis on divise." : "On multiplie les probabilités, sans chercher plus loin : l'indépendance est donnée.",
          calcul,
          `${conclusion} ⚠️ Cette formule n'est valable QUE si l'indépendance est donnée ou démontrée.`
        ),
      };
    },
  },

  /* ═══════════════ alea_indep_justifier ═══════════════ */

  {
    kind: "template",
    id: "premiere_alea_indep_justifier_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_independance",
    microId: "alea_indep_justifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare $P(A \\cap B)$ et $P(A) \\times P(B)$ : l'égalité décide.",
    tags: ["premiere", "maths", "probabilites", "independance", "template"],
    generate: () => {
      // Un tableau exactement indépendant, ou décalé de quelques individus.
      const S = pick(SITUS);
      let N = 0, l1 = 0, c1 = 0, a = 0, indep = false;
      for (;;) {
        N = pick([100, 200, 400, 500, 800, 1000] as const);
        const pA = pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8] as const);
        const pB = pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8] as const);
        l1 = Math.round(N * pA);
        c1 = Math.round(N * pB);
        const a0 = N * pA * pB;
        if (Math.abs(a0 - Math.round(a0)) > 1e-9) continue;
        indep = Math.random() < 0.5;
        a = Math.round(a0) + (indep ? 0 : pick([-1, 1] as const) * Math.round(pick([0.02, 0.03, 0.05] as const) * N));
        // Les quatre cases strictement positives.
        if (a > 0 && l1 - a > 0 && c1 - a > 0 && N - l1 - c1 + a > 0) break;
      }
      const t: TV = { S, a, b: l1 - a, c: c1 - a, d: N - l1 - c1 + a, l1, l2: N - l1, c1, c2: N - c1, total: N };
      const [L1, L2] = S.L;
      const pAv = l1 / N, pBv = c1 / N, pI = a / N, prod = Math.round(pAv * pBv * 1e6) / 1e6;
      const forme = pick(["tableau", "phrase", "cond"] as const);
      const donnees =
        forme === "phrase"
          ? `${S.intro} Sur $${N}$ ${S.noms}, $${l1}$ ${S.A.vp}, $${c1}$ ${S.B.vp}, et $${a}$ ${S.A.vp} et ${S.B.vp}. ${notaS(S)}`
          : `${enonceV(t)} ${notaS(S)}`;
      const question =
        forme === "cond"
          ? `En comparant $P_{${L1}}(${L2})$ et $P(${L2})$, dis si les évènements $${L1}$ et $${L2}$ sont indépendants.`
          : pick([`Les évènements $${L1}$ et $${L2}$ sont-ils indépendants ?`, `Peut-on affirmer que $${L1}$ et $${L2}$ sont indépendants ?`]);
      const OUI =
        forme === "cond" ? `Oui : $P_{${L1}}(${L2}) = P(${L2})$` : `Oui : $P(${L1} \\cap ${L2}) = P(${L1}) \\times P(${L2})$`;
      const NON =
        forme === "cond" ? `Non : $P_{${L1}}(${L2}) \\neq P(${L2})$` : `Non : $P(${L1} \\cap ${L2}) \\neq P(${L1}) \\times P(${L2})$`;
      const ENSEMBLE = "Oui, car ils peuvent se produire ensemble";
      const SAVOIR = "On ne peut pas le savoir avec ces données";
      const bon = indep ? OUI : NON;
      const cond = a / l1;
      const calcul =
        forme === "cond"
          ? `$P_{${L1}}(${L2}) = ${decimale(a, l1) !== null ? egalites(a, l1) : `\\dfrac{${a}}{${l1}} \\approx ${fr(Math.round(cond * 1000) / 1000)}`}$ et $P(${L2}) = \\dfrac{${c1}}{${N}} = ${fr(pBv)}$.`
          : `$P(${L1}) = \\dfrac{${l1}}{${N}} = ${fr(pAv)}$, $P(${L2}) = \\dfrac{${c1}}{${N}} = ${fr(pBv)}$, ` +
            `$P(${L1} \\cap ${L2}) = \\dfrac{${a}}{${N}} = ${fr(pI)}$. Or $P(${L1}) \\times P(${L2}) = ${fr(pAv)} \\times ${fr(pBv)} = ${fr(prod)}$.`;
      return {
        text: `${donnees} ${question}`,
        format: "qcm",
        choices: qcm(bon, [indep ? NON : OUI, ENSEMBLE, SAVOIR]),
        expected: [bon],
        comparator: "mcq_exact",
        canvas: forme === "phrase" ? undefined : canvasV(t),
        explanation: exp(
          `$${L1}$ et $${L2}$ sont indépendants si et seulement si $P(${L1} \\cap ${L2}) = P(${L1}) \\times P(${L2})$, ou, ce qui revient au même, $P_{${L1}}(${L2}) = P(${L2})$.`,
          "On calcule les probabilités dans le tableau, puis on compare.",
          calcul,
          indep
            ? `Les deux valeurs sont égales : $${L1}$ et $${L2}$ SONT indépendants.`
            : `Les deux valeurs diffèrent : $${L1}$ et $${L2}$ ne sont PAS indépendants (savoir que ${leS(S)} ${S.A.v} change la probabilité qu'${prS(S)} ${S.B.sj}).`
        ),
        choiceDiagnostics: [
          { choice: ENSEMBLE, cause: "pouvoir se produire ensemble n'est pas l'indépendance : c'est seulement le contraire de l'incompatibilité" },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_alea_incompatible_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_independance",
    microId: "alea_indep_incompatible",
    difficulty: 4,
    theme: "neutral",
    hint: "Incompatibles : ils ne peuvent pas arriver ensemble. Indépendants : l'un n'apprend rien sur l'autre.",
    tags: ["premiere", "maths", "probabilites", "independance", "template"],
    generate: () => {
      const INC = "ils sont incompatibles, donc PAS indépendants";
      const IND = "ils sont indépendants, et compatibles";
      const NI = "ils ne sont ni incompatibles, ni indépendants";
      const LES_DEUX = "ils sont à la fois incompatibles et indépendants";
      const DONC = "ils sont incompatibles, DONC indépendants";
      const question = pick([
        "Que peut-on dire de $A$ et $B$ ?",
        "Quelle affirmation est juste ?",
        "Comment qualifier les évènements $A$ et $B$ ?",
      ]);
      // Quatre fois sur cinq : un univers énuméré, où le verdict se CALCULE.
      if (Math.random() < 0.8) {
        const cible = pick(["inc", "ind", "ni"] as const);
        for (let essai = 0; essai < 400; essai++) {
          const U = pick(UNIVERS)();
          const [eA, eB] = shuffle(U.evs).slice(0, 2);
          const N = U.issues.length;
          const nA = eA.set.size, nB = eB.set.size;
          const nAB = [...eA.set].filter((x) => eB.set.has(x)).length;
          if (nAB === nA || nAB === nB) continue; // l'un contient l'autre : sans intérêt ici
          const verdict = nAB === 0 ? "inc" : nAB * N === nA * nB ? "ind" : "ni";
          if (verdict !== cible && essai < 399) continue;
          const bon = verdict === "inc" ? INC : verdict === "ind" ? IND : NI;
          const [a1, b1] = red(nA, N), [a2, b2] = red(nB, N), [a3, b3] = red(nAB, N), [a4, b4] = red(nA * nB, N * N);
          const fx = (n: number, d: number) => (n === 0 ? "0" : `\\dfrac{${n}}{${d}}`);
          return {
            text: `${U.intro} $A$ : « ${eA.desc} », $B$ : « ${eB.desc} ». ${question}`,
            format: "qcm",
            choices: qcm(bon, [INC, IND, NI, LES_DEUX, DONC].filter((c) => c !== bon)),
            expected: [bon],
            comparator: "mcq_exact",
            explanation: exp(
              "Incompatibles : $P(A \\cap B) = 0$, les deux ne peuvent pas se produire ensemble. Indépendants : $P(A \\cap B) = P(A) \\times P(B)$, l'un n'apprend rien sur l'autre. Ce sont deux notions DIFFÉRENTES.",
              `On compte les issues : $${N}$ en tout, équiprobables ; $${nA}$ pour $A$, $${nB}$ pour $B$, $${nAB}$ pour $A$ et $B$ à la fois.`,
              `$P(A) = ${fx(a1, b1)}$, $P(B) = ${fx(a2, b2)}$, donc $P(A) \\times P(B) = ${fx(a4, b4)}$ ; et $P(A \\cap B) = ${fx(a3, b3)}$.`,
              verdict === "inc"
                ? `$P(A \\cap B) = 0$ : ils sont incompatibles. Et $0 \\neq ${fx(a4, b4)}$ : ils ne sont PAS indépendants — savoir que l'un s'est produit rend l'autre impossible.`
                : verdict === "ind"
                  ? `$P(A \\cap B) = P(A) \\times P(B)$ : ils sont indépendants. Et $P(A \\cap B) \\neq 0$ : ils sont compatibles.`
                  : `$P(A \\cap B) \\neq 0$ : ils ne sont pas incompatibles. Et $${fx(a3, b3)} \\neq ${fx(a4, b4)}$ : ils ne sont pas indépendants non plus.`
            ),
            choiceDiagnostics: [
              { choice: DONC, cause: "prend « incompatible » pour un synonyme d'« indépendant » : c'est presque le contraire" },
            ],
          };
        }
      }
      const cas = pick([
        {
          situation:
            "On lance un dé équilibré. $A$ : « le résultat est pair », $B$ : « le résultat est $3$ ».",
          bonne: "ils sont incompatibles, donc PAS indépendants",
          cle: "$P(A \\cap B) = 0$ alors que $P(A) \\times P(B) = \\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12} \\neq 0$",
        },
        {
          situation:
            "On tire une carte dans un jeu de $32$. $A$ : « la carte est un cœur », $B$ : « la carte est un pique ».",
          bonne: "ils sont incompatibles, donc PAS indépendants",
          cle: "une carte ne peut pas être à la fois cœur et pique : $P(A \\cap B) = 0$",
        },
        {
          situation:
            "On lance deux fois une pièce. $A$ : « pile au premier lancer », $B$ : « pile au second lancer ».",
          bonne: "ils sont indépendants, et compatibles",
          cle: "les deux peuvent arriver ensemble, et le premier lancer n'influence pas le second",
        },
        {
          situation:
            "On interroge une personne au hasard. $A$ : « elle a 18 ans ou plus », $B$ : « elle est mineure ».",
          bonne: "ils sont incompatibles, donc PAS indépendants",
          cle: "les deux ne peuvent jamais être vrais en même temps, et savoir l'un détermine l'autre",
        },
        {
          situation:
            "On tire une boule dans une urne, on la remet, puis on en tire une seconde. $A$ : « la première est rouge », $B$ : « la seconde est rouge ».",
          bonne: "ils sont indépendants, et compatibles",
          cle: "la remise rétablit la composition : le premier tirage n'apprend rien sur le second",
        },
      ] as const);
      return {
        text: `${cas.situation} Que peut-on dire de $A$ et $B$ ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "ils sont incompatibles, donc PAS indépendants",
          "ils sont indépendants, et compatibles",
          "ils sont à la fois incompatibles et indépendants",
          "ils sont incompatibles, DONC indépendants",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Incompatibles signifie $P(A \\cap B) = 0$ : les deux ne peuvent pas se produire ensemble. Indépendants signifie $P(A \\cap B) = P(A) \\times P(B)$ : l'un n'apprend rien sur l'autre. Ce sont deux notions DIFFÉRENTES.",
          "On regarde d'abord si les deux peuvent arriver ensemble, puis si l'un renseigne sur l'autre.",
          `Ici, ${cas.cle}.`,
          `${cas.bonne.charAt(0).toUpperCase()}${cas.bonne.slice(1)}. ` +
            `⚠️ Deux évènements incompatibles de probabilités non nulles ne sont JAMAIS indépendants : ` +
            `savoir que l'un s'est produit rend l'autre impossible, ce qui est l'influence maximale.`
        ),
        choiceDiagnostics: [
          {
            choice: "ils sont incompatibles, DONC indépendants",
            cause: "prend « incompatible » pour un synonyme d'« indépendant » : c'est presque le contraire",
          },
        ],
      };
    },
  },

  /* ═══════════════ alea_indep_incompatible ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_alea_incompatible_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_independance",
    microId: "alea_indep_incompatible",
    difficulty: 4,
    theme: "neutral",
    text:
      "On lance un dé équilibré à six faces. $A$ : « le résultat est pair », $B$ : « le résultat est $3$ ». " +
      "Que peut-on dire de $A$ et $B$ ?",
    format: "qcm",
    choices: [
      "Ils sont incompatibles, donc pas indépendants",
      "Ils sont indépendants",
      "Ils sont à la fois incompatibles et indépendants",
      "Ils sont incompatibles, donc indépendants",
    ],
    expected: ["Ils sont incompatibles, donc pas indépendants"],
    comparator: "mcq_exact",
    hint: "Si tu sais que le résultat est $3$, que devient la probabilité qu'il soit pair ?",
    explanation: exp(
      "Incompatibles : $P(A \\cap B) = 0$. Indépendants : $P(A \\cap B) = P(A) \\times P(B)$.",
      "On calcule les deux membres.",
      "$P(A) = \\dfrac{1}{2}$, $P(B) = \\dfrac{1}{6}$, donc $P(A) \\times P(B) = \\dfrac{1}{12} \\neq 0 = P(A \\cap B)$.",
      "Ils sont incompatibles et NON indépendants. Savoir que le résultat vaut $3$ change tout : la probabilité qu'il soit pair passe de $\\frac{1}{2}$ à $0$. Deux évènements incompatibles de probabilités non nulles ne sont jamais indépendants."
    ),
    choiceDiagnostics: [
      {
        choice: "Ils sont incompatibles, donc indépendants",
        cause: "prend « incompatible » pour un synonyme d'« indépendant » : c'est presque le contraire",
      },
    ],
    tags: ["premiere", "maths", "probabilites", "independance", "piege"],
  },
];
