import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

function percentToDecimalString(p: number) {
  return formatComma((p / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, ""));
}

function expl(calcul: string) {
  return (
    "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
    "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pgcd(a: number, b: number): number {
  return b === 0 ? a : pgcd(b, a % b);
}

/** Le plus petit total N tel que p % de N tombe juste (p × N divisible par 100). */
function pasEntier(p: number) {
  return 100 / pgcd(p, 100);
}

/** La bonne réponse et jusqu'à trois leurres, sans doublon ni leurre égal à la réponse. */
function choixQcm(bonne: string, leurres: readonly string[]) {
  const d = shuffle(Array.from(new Set(leurres)).filter((l) => l !== bonne)).slice(0, 3);
  return shuffle([bonne, ...d]);
}

/** Le chemin de calcul mental quand il existe (10 %, 50 %, 25 %…), sinon × p ÷ 100. */
function methodePourcentage(p: number, n: number) {
  const r = (p * n) / 100;
  if (p === 10) return `10 % de ${n}, c’est le dixième : ${n} ÷ 10 = ${r}.`;
  if (p === 50) return `50 % de ${n}, c’est la moitié : ${n} ÷ 2 = ${r}.`;
  if (p === 25) return `25 % de ${n}, c’est le quart : ${n} ÷ 4 = ${r}.`;
  if (p === 75) return `75 % de ${n}, ce sont trois quarts : ${n} ÷ 4 = ${n / 4}, puis ${n / 4} × 3 = ${r}.`;
  if (p % 10 === 0 && n % 10 === 0) return `10 % de ${n}, c’est ${n / 10} ; ${p} %, c’est ${p / 10} fois plus : ${n / 10} × ${p / 10} = ${r}.`;
  return `${p} % de ${n} = ${n} × ${p} ÷ 100 = ${r}.`;
}

/* ---------------------------------------------------------------------------
   ⛔⛔ 06/10/2026 — « LES MÊMES QUESTIONS REVIENNENT ». Mesuré le 05/10 : 2 à
   25 squelettes d'énoncé par micro, 11 à 19 répétitions sur une série de 20.
   Chaque gabarit compose désormais une SITUATION (table ci-dessous) × une
   TOURNURE × un PRÉNOM. Mesure : scripts/mesurer-squelettes-coach.ts 6e
   pourcentage_nombre ; correcteurs : correcteurs/pourcentages.ts.
   ⛔ Aucun autre nombre que les données dans une situation : le correcteur
   relit les nombres du texte.
--------------------------------------------------------------------------- */
type Prenom = { n: string; f: boolean };
const PRENOMS: readonly Prenom[] = [
  { n: "Léa", f: true }, { n: "Inès", f: true }, { n: "Jade", f: true }, { n: "Chloé", f: true },
  { n: "Aïcha", f: true }, { n: "Maëlys", f: true }, { n: "Yasmine", f: true }, { n: "Emma", f: true },
  { n: "Noémie", f: true }, { n: "Fatou", f: true }, { n: "Lina", f: true }, { n: "Zoé", f: true },
  { n: "Anaïs", f: true }, { n: "Mei", f: true }, { n: "Hugo", f: false }, { n: "Tom", f: false },
  { n: "Nathan", f: false }, { n: "Adam", f: false }, { n: "Rayan", f: false }, { n: "Lucas", f: false },
  { n: "Moussa", f: false }, { n: "Enzo", f: false }, { n: "Ibrahim", f: false }, { n: "Théo", f: false },
  { n: "Kenji", f: false }, { n: "Ilyes", f: false }, { n: "Malik", f: false }, { n: "Yanis", f: false },
];
const VOYELLE = /^[aeiouhâàéèêîïôûœ]/i;
/** « de Léa », « d’Inès ». */
const de = (n: string) => (VOYELLE.test(n) ? `d’${n}` : `de ${n}`);
/** « de billes », « d’arbres ». */
const deNu = (nom: string) => (VOYELLE.test(nom) ? `d’${nom}` : `de ${nom}`);
const il = (P: Prenom) => (P.f ? "elle" : "il");
const Il = (P: Prenom) => (P.f ? "Elle" : "Il");

/** Une collection : la phrase qui donne le total, le nom (pluriel), la propriété et son contraire. */
type SitPct = { tot: (N: number, P: Prenom) => string; nom: string; adj: string; autre: string; max: number };
const SITUATIONS_PCT: readonly SitPct[] = [
  { tot: (N, P) => `${P.n} range ${N} billes dans une boîte.`, nom: "billes", adj: "sont bleues", autre: "sont d’une autre couleur", max: 200 },
  { tot: (N, P) => `Le club de judo ${de(P.n)} compte ${N} licenciés.`, nom: "licenciés", adj: "ont une ceinture jaune", autre: "ont une autre ceinture", max: 200 },
  { tot: (N, P) => `${P.n} a semé ${N} graines dans le jardin.`, nom: "graines", adj: "ont germé", autre: "n’ont pas germé", max: 300 },
  { tot: (N) => `Au spectacle de l’école, il y a ${N} spectateurs.`, nom: "spectateurs", adj: "sont des parents", autre: "ne sont pas des parents", max: 300 },
  { tot: (N, P) => `${P.n} a ${N} photos sur sa tablette.`, nom: "photos", adj: "montrent des animaux", autre: "ne montrent pas d’animaux", max: 300 },
  { tot: (N) => `Un grand sachet contient ${N} bonbons.`, nom: "bonbons", adj: "sont à la fraise", autre: "ont un autre goût", max: 200 },
  { tot: (N) => `La bibliothèque du collège prête ${N} livres en une semaine.`, nom: "livres", adj: "sont des bandes dessinées", autre: "ne sont pas des bandes dessinées", max: 300 },
  { tot: (N) => `Un verger compte ${N} arbres.`, nom: "arbres", adj: "sont des pommiers", autre: "ne sont pas des pommiers", max: 300 },
  { tot: (N, P) => `${P.n} collectionne les cartes : ${il(P)} en a ${N}.`, nom: "cartes", adj: "sont brillantes", autre: "ne sont pas brillantes", max: 300 },
  { tot: (N) => `Une course à vélo réunit ${N} coureurs.`, nom: "coureurs", adj: "terminent la course", autre: "abandonnent", max: 300 },
  { tot: (N) => `Le grand aquarium du zoo abrite ${N} poissons.`, nom: "poissons", adj: "sont rouges", autre: "sont d’une autre couleur", max: 300 },
  { tot: (N) => `La chorale de la ville compte ${N} choristes.`, nom: "choristes", adj: "sont des enfants", autre: "sont des adultes", max: 200 },
  { tot: (N) => `Au marché, un étal présente ${N} fruits.`, nom: "fruits", adj: "sont des pêches", autre: "ne sont pas des pêches", max: 200 },
  { tot: (N, P) => `${P.n} a ${N} chansons dans sa playlist.`, nom: "chansons", adj: "sont en anglais", autre: "sont dans une autre langue", max: 300 },
  { tot: (N) => `Le parking du stade compte ${N} places.`, nom: "places", adj: "sont occupées", autre: "sont libres", max: 300 },
  { tot: (N) => `Une ferme élève ${N} poules.`, nom: "poules", adj: "sont rousses", autre: "ont une autre couleur", max: 300 },
  { tot: (N, P) => `Lors d’une sortie nature, la classe ${de(P.n)} compte ${N} oiseaux.`, nom: "oiseaux", adj: "sont des moineaux", autre: "ne sont pas des moineaux", max: 200 },
  { tot: (N) => `Le gymnase possède ${N} ballons.`, nom: "ballons", adj: "sont des ballons de basket", autre: "sont des ballons de foot", max: 200 },
  { tot: (N, P) => `Pour son bricolage, ${P.n} achète une boîte de ${N} vis.`, nom: "vis", adj: "sont trop courtes", autre: "ont la bonne longueur", max: 300 },
  { tot: (N) => `Un musée reçoit ${N} visiteurs dans la matinée.`, nom: "visiteurs", adj: "sont des enfants", autre: "sont des adultes", max: 300 },
  { tot: (N) => `À la piscine, ${N} enfants passent le test de natation.`, nom: "enfants", adj: "réussissent le test", autre: "échouent", max: 200 },
  { tot: (N) => `Un producteur de La Réunion récolte ${N} ananas.`, nom: "ananas", adj: "sont déjà mûrs", autre: "ne sont pas encore mûrs", max: 300 },
];

/** Un pourcentage lu dans la vie courante (aucun autre nombre que p). */
const PHRASES_PCT: readonly ((p: number, P: Prenom) => string)[] = [
  (p, P) => `Sur l’étiquette d’un jus, ${P.n} lit : « ${p} % de fruits ».`,
  (p, P) => `Le téléphone ${de(P.n)} affiche : batterie chargée à ${p} %.`,
  (p) => `Dans un magasin de sport, une affiche annonce « −${p} % » sur les ballons.`,
  (p) => `La météo annonce ${p} % de risque de pluie pour demain.`,
  (p, P) => `Le jeu vidéo ${de(P.n)} est téléchargé à ${p} %.`,
  (p) => `L’étiquette d’un pull indique : ${p} % de coton.`,
  (p, P) => `Dans la classe ${de(P.n)}, ${p} % des élèves mangent à la cantine.`,
  (p, P) => `La tablette de chocolat ${de(P.n)} contient ${p} % de cacao.`,
  (p) => `Le réservoir de la tondeuse est rempli à ${p} %.`,
  (p, P) => `${P.n} a réussi ${p} % des exercices de son cahier.`,
  (p) => `Un sondage dit que ${p} % des enfants aiment le vélo.`,
  (p) => `Un parc naturel est couvert de forêt à ${p} %.`,
  (p, P) => `La barre de progression du jeu ${de(P.n)} indique ${p} %.`,
  (p) => `Un pot de yaourt contient ${p} % de fruits.`,
  (p, P) => `La gourde ${de(P.n)} est remplie à ${p} %.`,
];
const phrasePct = (p: number) => pick(PHRASES_PCT)(p, pick(PRENOMS));

/** 100 éléments, deux pourcentages dans une phrase : on demande l'un des deux. */
function lireDeuxCategories() {
  const s = pick(SITUATIONS_PCT);
  const P = pick(PRENOMS);
  const p = randomInt(2, 18) * 5 + pick([0, 0, 1, 2, 3]);
  const premier = Math.random() < 0.5;
  const r = premier ? p : 100 - p;
  const phrase = premier ? s.adj : s.autre;
  const question = pick([
    `Combien ${deNu(s.nom)} ${phrase} ?`,
    `Trouve le nombre ${deNu(s.nom)} qui ${phrase}.`,
    `Calcule combien ${deNu(s.nom)} ${phrase}.`,
  ]);
  const donnees = pick([
    `${p} % des ${s.nom} ${s.adj} et ${100 - p} % ${s.autre}.`,
    `On lit dans un bilan : ${p} % des ${s.nom} ${s.adj}, ${100 - p} % ${s.autre}.`,
  ]);
  return { text: `${s.tot(100, P)} ${donnees} ${question}`, r, s };
}

/**
 * Appliquer un pourcentage : calcul nu sous une forme variée (proportion `nu`
 * des tirages), sinon une collection de la table × trois tournures.
 * ⛔ Pas « Calcule # % de #. », « Quel est… », « Que vaut… » : ce sont les
 * phrases des items figés de la micro.
 */
function appliquerPct(ps: readonly number[], nu: number) {
  const p = pick(ps);
  if (Math.random() < nu) {
    const n = totalPour(p, 200, 10);
    const text = pick([
      `Donne la valeur de ${p} % de ${n}.`,
      `${p} % de ${n}, combien cela fait-il ?`,
      `Complète : ${p} % de ${n} = …`,
      `Trouve ${p} % de ${n}.`,
      `Calcule mentalement ${p} % de ${n}.`,
    ]);
    return { text, p, n, r: (p * n) / 100 };
  }
  const s = pick(SITUATIONS_PCT);
  const n = totalPour(p, s.max);
  const question = pick([
    `Combien ${deNu(s.nom)} ${s.adj} ?`,
    `Trouve le nombre ${deNu(s.nom)} qui ${s.adj}.`,
    `Calcule combien ${deNu(s.nom)} ${s.adj}.`,
  ]);
  return { text: `${s.tot(n, pick(PRENOMS))} ${p} % des ${s.nom} ${s.adj}. ${question}`, p, n, r: (p * n) / 100 };
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Des objets qu'un enfant de 11 ans achète (le genre accorde « affiché·e »). */
const ARTICLES_PRIX: readonly { gn: string; f: boolean; min: number; max: number }[] = [
  { gn: "un jean", f: false, min: 20, max: 80 }, { gn: "une paire de baskets", f: true, min: 30, max: 140 },
  { gn: "un sac à dos", f: false, min: 20, max: 80 }, { gn: "une trottinette", f: true, min: 40, max: 200 },
  { gn: "un jeu vidéo", f: false, min: 20, max: 80 }, { gn: "un casque audio", f: false, min: 20, max: 150 },
  { gn: "une lampe de bureau", f: true, min: 16, max: 60 }, { gn: "un ballon de foot", f: false, min: 16, max: 40 },
  { gn: "une raquette de tennis", f: true, min: 20, max: 120 }, { gn: "un skateboard", f: false, min: 30, max: 120 },
  { gn: "une tente de camping", f: true, min: 40, max: 200 }, { gn: "un jeu de société", f: false, min: 16, max: 60 },
  { gn: "une guitare", f: true, min: 60, max: 200 }, { gn: "un aquarium", f: false, min: 30, max: 150 },
  { gn: "une montre", f: true, min: 20, max: 120 }, { gn: "un vélo", f: false, min: 100, max: 300 },
  { gn: "une veste de pluie", f: true, min: 20, max: 80 }, { gn: "un puzzle", f: false, min: 16, max: 40 },
];
/** Un article et un prix multiple de `pas`, dans la fourchette de l'article. */
function articleEtPrix(pas: number) {
  for (;;) {
    const a = pick(ARTICLES_PRIX);
    const lo = Math.ceil(a.min / pas);
    const hi = Math.floor(a.max / pas);
    if (hi >= lo) return { a, prix: pas * randomInt(lo, hi) };
  }
}

/** Un total N tel que p % de N tombe juste, entre min et la borne de la situation. */
function totalPour(p: number, max: number, min = 20) {
  const s = pasEntier(p);
  return s * randomInt(Math.ceil(min / s), Math.floor(max / s));
}

/** Des QUANTITÉS avec unité : p % d'une longueur, d'un prix, d'une durée… */
type SitQte = { f: (n: number, p: number, P: Prenom) => string; u: string; min: number; max: number };
const QUANTITES_PCT: readonly SitQte[] = [
  { f: (n, p, P) => `Le trajet à vélo ${de(P.n)} fait ${n} km. ${Il(P)} a déjà roulé ${p} % du trajet. Combien de kilomètres a-t-${il(P)} parcourus ?`, u: "km", min: 10, max: 80 },
  { f: (n, p, P) => `Un film dure ${n} minutes. ${P.n} en a regardé ${p} %. Combien de minutes a-t-${il(P)} regardées ?`, u: "min", min: 60, max: 160 },
  { f: (n, p, P) => `Une recette demande ${n} g de farine. ${P.n} n’en a que ${p} %. Combien de grammes de farine a-t-${il(P)} ?`, u: "g", min: 100, max: 600 },
  { f: (n, p) => `Une trottinette coûte ${n} €. Le magasin fait une remise de ${p} %. Combien d’euros la remise fait-elle gagner ?`, u: "€", min: 40, max: 300 },
  { f: (n, p, P) => `${P.n} doit lire un roman de ${n} pages. ${Il(P)} en a lu ${p} %. Combien de pages a-t-${il(P)} lues ?`, u: "pages", min: 80, max: 400 },
  { f: (n, p, P) => `Un sac de terreau pèse ${n} kg. Pour ses semis, ${P.n} en utilise ${p} %. Combien de kilogrammes utilise-t-${il(P)} ?`, u: "kg", min: 20, max: 60 },
  { f: (n, p, P) => `${P.n} a économisé ${n} € pour les vacances. ${Il(P)} dépense ${p} % de cette somme pour un cadeau. Combien coûte le cadeau ?`, u: "€", min: 40, max: 200 },
  { f: (n, p) => `Une citerne de jardin contient ${n} L d’eau de pluie. On utilise ${p} % de cette eau pour arroser. Combien de litres utilise-t-on ?`, u: "L", min: 100, max: 500 },
  { f: (n, p, P) => `Une randonnée fait ${n} km. Le groupe ${de(P.n)} a parcouru ${p} % du chemin. Combien de kilomètres le groupe a-t-il parcourus ?`, u: "km", min: 10, max: 40 },
  { f: (n, p, P) => `Pour une partie de jeu vidéo, il faut ${n} points. ${P.n} en a déjà gagné ${p} %. Combien de points a-t-${il(P)} ?`, u: "points", min: 100, max: 800 },
  { f: (n, p, P) => `L’entraînement de natation ${de(P.n)} dure ${n} minutes. ${P.n} consacre ${p} % de ce temps au crawl. Combien de minutes de crawl cela fait-il ?`, u: "min", min: 40, max: 120 },
  { f: (n, p, P) => `Un rouleau de ruban mesure ${n} cm. ${P.n} en coupe ${p} % pour un bricolage. Combien de centimètres coupe-t-${il(P)} ?`, u: "cm", min: 100, max: 400 },
  { f: (n, p) => `Un aquarium contient ${n} L d’eau. Chaque semaine, on change ${p} % de l’eau. Combien de litres change-t-on ?`, u: "L", min: 40, max: 200 },
  { f: (n, p, P) => `Un casque audio coûte ${n} €. ${P.n} a déjà payé ${p} % du prix. Combien d’euros a-t-${il(P)} payés ?`, u: "€", min: 20, max: 120 },
  { f: (n, p, P) => `Un sac de croquettes pour le chien ${de(P.n)} pèse ${n} kg. Le chien en a déjà mangé ${p} %. Combien de kilogrammes a-t-il mangés ?`, u: "kg", min: 4, max: 20 },
];

/** p % d'une quantité avec unité, prise dans la table. */
function genQuantite(ps: readonly number[]) {
  for (;;) {
    const s = pick(QUANTITES_PCT);
    const p = pick(ps);
    const st = pasEntier(p);
    if (Math.floor(s.max / st) < Math.ceil(s.min / st)) continue;
    const n = totalPour(p, s.max, s.min);
    const r = (p * n) / 100;
    const P = pick(PRENOMS);
    const u = s.u === "pages" || s.u === "points" ? "" : ` ${s.u}`;
    return { text: s.f(n, p, P), expected: [`${r}${u}`, String(r)], explanation: expl(methodePourcentage(p, n) + ` Réponse : ${r}${u || " " + s.u}.`) };
  }
}

export const pourcentagesBank: TutorBankItemV4[] = [
  // =========================
  // POURCENTAGE_COMPRENDRE
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_comprendre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie 25 % ?",
    format: "short",
    expected: ["25 sur 100", "25/100", "25 / 100"],
    comparator: "contains_keyword",
    hint: "Le symbole % veut dire “sur 100”.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("25 % signifie 25 sur 100. Un pourcentage représente toujours une part sur 100.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "comprendre"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Sur une affiche, on lit « 50 % ». Que veut dire 50 % ?",
    format: "short",
    expected: ["50 sur 100", "50/100", "50 / 100", "la moitié", "moitié"],
    comparator: "contains_keyword",
    hint: "50 %, c’est 50 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("50 % signifie 50 sur 100. Comme 50/100 = 1/2, cela représente aussi la moitié.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "comprendre"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Écris « 10 % » avec le mot « sur ».",
    format: "short",
    expected: ["10 sur 100", "10/100", "10 / 100"],
    comparator: "contains_keyword",
    hint: "Un pourcentage se lit toujours “sur 100”.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("10 % signifie 10 sur 100. Cela veut dire que l’on prend 10 parts parmi 100.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "comprendre"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Le symbole % veut dire…",
    format: "qcm",
    choices: ["sur 10", "sur 100", "sur 1000", "fois 100"],
    expected: ["sur 100"],
    comparator: "mcq_exact",
    hint: "Un pourcentage exprime une part sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("Le symbole % signifie “sur 100”. Un pourcentage exprime donc une part sur 100.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "75 % signifie…",
    format: "qcm",
    choices: ["75 sur 10", "75 sur 100", "7,5 sur 100", "100 sur 75"],
    expected: ["75 sur 100"],
    comparator: "mcq_exact",
    hint: "On lit toujours un pourcentage “sur 100”.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("75 % signifie 75 sur 100. C’est la définition même d’un pourcentage.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 2,
    theme: "reunion",
    text: "Dans une classe de 100 élèves imaginaires à La Réunion, 30 % aiment le football. Combien cela représente-t-il d’élèves ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "30 %, c’est 30 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("30 % signifie 30 sur 100. Dans une classe de 100 élèves, cela représente donc 30 élèves.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "comprendre", "reunion"],
  },

  // =========================
  // POURCENTAGE_FRACTION
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_fraction_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 1,
    theme: "neutral",
    text: "Écris 25 % sous forme de fraction sur 100.",
    format: "short",
    expected: ["25/100", "25 / 100"],
    comparator: "fraction_decimal_equivalent",
    hint: "25 % = 25 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("25 % signifie 25 sur 100. On l’écrit donc 25/100.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "fraction"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 1,
    theme: "neutral",
    text: "Complète avec une fraction de dénominateur 100 : 50 % = …",
    format: "short",
    expected: ["50/100", "50 / 100", "1/2", "1 / 2"],
    comparator: "fraction_decimal_equivalent",
    hint: "50 % = 50 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("50 % signifie 50 sur 100, donc 50/100. Cette fraction se simplifie aussi en 1/2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "fraction"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 10 % sous forme de fraction sur 100.",
    format: "short",
    expected: ["10/100", "10 / 100", "1/10", "1 / 10"],
    comparator: "fraction_decimal_equivalent",
    hint: "10 % = 10 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("10 % signifie 10 sur 100. On peut écrire 10/100, ce qui correspond aussi à 1/10.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "fraction"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction de dénominateur 100 est égale à 75 % ?",
    format: "short",
    expected: ["75/100", "75 / 100", "3/4", "3 / 4"],
    comparator: "fraction_decimal_equivalent",
    hint: "75 % = 75 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("75 % signifie 75 sur 100. On peut écrire 75/100, ce qui correspond aussi à 3/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "fraction"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction sur 100 correspond à 40 % ?",
    format: "qcm",
    choices: ["4/100", "40/100", "40/10", "1/40"],
    expected: ["40/100"],
    comparator: "mcq_exact",
    hint: "40 % = 40 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("40 % signifie 40 sur 100. La bonne fraction est donc 40/100.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "fraction", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture correspond à 5 % ?",
    format: "qcm",
    choices: ["5/100", "5/10", "50/100", "1/5"],
    expected: ["5/100"],
    comparator: "mcq_exact",
    hint: "5 % = 5 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("5 % signifie 5 sur 100. La bonne écriture est donc 5/100.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "fraction", "qcm"],
  },

  // =========================
  // POURCENTAGE_DECIMAL
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_decimal_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 50 % sous forme décimale.",
    format: "short",
    expected: ["0,5", "0.5", "50/100", "50 / 100"],
    comparator: "fraction_decimal_equivalent",
    hint: "50 % = 50/100 = 0,5.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("50 % signifie 50/100. En écriture décimale, cela donne 0,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Donne l’écriture décimale de 25 %.",
    format: "short",
    expected: ["0,25", "0.25", "25/100", "25 / 100"],
    comparator: "fraction_decimal_equivalent",
    hint: "25 % = 25/100 = 0,25.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("25 % signifie 25/100. En écriture décimale, cela donne 0,25.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "10 % est égal à quel nombre décimal ?",
    format: "short",
    expected: ["0,1", "0.1", "10/100", "10 / 100"],
    comparator: "fraction_decimal_equivalent",
    hint: "10 % = 10/100 = 0,1.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("10 % signifie 10/100. En écriture décimale, cela donne 0,1.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Complète avec un nombre décimal : 5 % = …",
    format: "short",
    expected: ["0,05", "0.05", "5/100", "5 / 100"],
    comparator: "fraction_decimal_equivalent",
    hint: "5 % = 5/100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("5 % signifie 5/100. En écriture décimale, cela donne 0,05.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 75 % ?",
    format: "qcm",
    choices: ["0,75", "7,5", "0,075", "75,0"],
    expected: ["0,75"],
    comparator: "mcq_exact",
    hint: "75 % = 75/100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("75 % signifie 75/100. En écriture décimale, cela donne 0,75.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "decimal", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre décimal est égal à 5 % ?",
    format: "qcm",
    choices: ["0,5", "0,05", "5,0", "0,005"],
    expected: ["0,05"],
    comparator: "mcq_exact",
    hint: "5 % = 5/100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("5 % signifie 5/100. En écriture décimale, cela donne 0,05.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "decimal", "qcm"],
  },

  // =========================
  // POURCENTAGE_LIRE
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_lire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe de 100 élèves, 20 % portent des lunettes. Combien d’élèves cela représente-t-il ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "20 % signifie 20 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("Dans un groupe de 100 élèves, 20 % signifie 20 sur 100. Cela représente donc 20 élèves.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "lecture"],
  },
  {
    kind: "fixed",
    id: "pourcentage_lire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Sur 100 bonbons, 60 % sont rouges. Combien y a-t-il de bonbons rouges ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "60 % = 60 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("Sur 100 bonbons, 60 % signifie 60 sur 100. Il y a donc 60 bonbons rouges.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "lecture"],
  },
  {
    kind: "fixed",
    id: "pourcentage_lire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un groupe de 100 personnes, 8 % aiment les échecs. Combien cela représente-t-il ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Le pourcentage donne directement le nombre sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("8 % signifie 8 sur 100. Dans un groupe de 100 personnes, cela représente 8 personnes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "lecture"],
  },
  {
    kind: "fixed",
    id: "pourcentage_lire_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un groupe de 100 personnes, 15 % aiment le théâtre. Combien cela fait-il ?",
    format: "qcm",
    choices: ["5", "10", "15", "25"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "15 % = 15 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("15 % signifie 15 sur 100. Dans un groupe de 100 personnes, cela fait donc 15 personnes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "lecture", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_lire_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, sur 100 ananas, 35 % sont déjà vendus. Combien d’ananas sont vendus ?",
    format: "qcm",
    choices: ["25", "30", "35", "65"],
    expected: ["35"],
    comparator: "mcq_exact",
    hint: "35 % signifie 35 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("35 % signifie 35 sur 100. Sur 100 ananas, cela représente donc 35 ananas vendus.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "lecture", "reunion", "qcm"],
  },

  // =========================
  // POURCENTAGE_CALCUL_SIMPLE
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 10 % de 60.",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "10 % = 0,1.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("10 % de 60, c’est 0,1 × 60 = 6. On peut aussi dire que 10 % est le dixième de 60.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "calcul"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 50 % de 18 ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "50 %, c’est la moitié.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("50 % signifie la moitié. La moitié de 18 est 9.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "calcul"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 25 % de 20.",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "25 %, c’est un quart.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("25 % correspond à un quart. Le quart de 20 est 5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "calcul"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut 10 % de 40 ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "10 % = 1/10.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("10 % signifie un dixième. Le dixième de 40 est 4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "calcul"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est 10 % de 40 ?",
    format: "qcm",
    choices: ["4", "10", "14", "40"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "10 % = 1/10.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("10 % de 40, c’est le dixième de 40. Le résultat est 4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "calcul", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, un groupe de 20 randonneurs compte 50 % d’adultes. Combien y a-t-il d’adultes ?",
    format: "qcm",
    choices: ["5", "10", "15", "20"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "50 %, c’est la moitié.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("50 % signifie la moitié. La moitié de 20 est 10. Il y a donc 10 adultes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "calcul", "reunion", "qcm"],
  },

  // =========================
  // POURCENTAGE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une collection de 100 cartes, 8 % sont brillantes. Combien y a-t-il de cartes brillantes ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "8 % = 8 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("8 % signifie 8 sur 100. Dans une collection de 100 cartes, cela représente 8 cartes brillantes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "defi"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 2,
    theme: "neutral",
    text: "Le prix d’un article est 20 €. On calcule 5 % de 20 €. Combien vaut ce pourcentage ?",
    format: "short",
    expected: ["1", "1,0", "1.0"],
    comparator: "number_equal",
    hint: "5 % = 5/100 de 20.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("5 % de 20 €, c’est 0,05 × 20 = 1. Ce pourcentage vaut donc 1 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "defi"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi 100 élèves, 25 % font du basket et 50 % font du football. Quel sport est le plus pratiqué ?",
    format: "short",
    expected: ["football"],
    comparator: "contains_keyword",
    hint: "Compare 25 % et 50 %.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("25 % représente 25 élèves sur 100 et 50 % représente 50 élèves sur 100. Comme 50 est plus grand que 25, le football est le plus pratiqué.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "defi", "comparaison"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, sur 100 letchis, 40 % sont mûrs. Combien de letchis sont mûrs ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "40 % = 40 sur 100.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("40 % signifie 40 sur 100. Sur 100 letchis, cela représente donc 40 letchis mûrs.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "defi", "reunion"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel pourcentage représente exactement la moitié d’un groupe ?",
    format: "short",
    expected: ["50 %", "50"],
    comparator: "number_equal",
    hint: "La moitié, c’est 1 sur 2.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("La moitié correspond à 1/2. Or 1/2 = 50/100, donc cela représente 50 %.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    // 06/10 : QCM sur les pièges, plus de mot-clé numérique (« 4 » acceptait toute réponse contenant un 4).
    text: "Pourquoi 25 % correspond-il à 1/4 ?",
    format: "qcm",
    choices: [
      "car 25 % = 25/100, et 25 × 4 = 100 : c’est un quart",
      "car 25 est plus petit que 100",
      "car 1/4 s’écrit avec un 4 et 25 % avec un 2",
      "car 25 ÷ 4 = 100",
    ],
    expected: ["car 25 % = 25/100, et 25 × 4 = 100 : c’est un quart"],
    comparator: "mcq_exact",
    hint: "Commence par écrire 25 % sous forme de fraction.",
    explanation:
      "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
      "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
      "Calcul : " +
      ("25 % signifie 25/100. Si on simplifie cette fraction en divisant par 25, on obtient 1/4. Donc 25 % correspond à 1/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["pourcentage_nombre", "defi", "raisonnement"],
  },

  // =========================
  // TEMPLATES - COMPRENDRE
  // =========================
  {
    kind: "template",
    id: "pourcentage_comprendre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un pourcentage signifie toujours “sur 100”.",
    tags: ["pourcentage_nombre", "comprendre", "template"],
    // 06/10 : une situation, et deux questions — « sur combien ? » (100, même si
    // le groupe n'a pas 100 éléments : le piège) ou « sur 100, combien ? ».
    generate: () => {
      const s = pick(SITUATIONS_PCT);
      const P = pick(PRENOMS);
      const p = pick([5, 10, 20, 25, 30, 40, 50, 60, 75, 80]);
      const N = pick([true, false]) ? 100 : totalPour(p, s.max);
      const debut = `${s.tot(N, P)} ${p} % des ${s.nom} ${s.adj}.`;
      const surCombien = Math.random() < 0.5;
      const text = surCombien
        ? `${debut} ${pick([`« ${p} % » veut dire ${p} sur combien ?`, `Complète : « ${p} % », c’est ${p} sur …`, `Dans cette phrase, ${p} % signifie ${p} sur quel nombre ?`])}`
        : `${debut} ${pick([`Sur 100 ${s.nom}, combien ${s.adj} ?`, `Imagine 100 ${s.nom} : combien ${s.adj} ?`, `Pour 100 ${s.nom}, combien ${s.adj} ?`])}`;
      const r = surCombien ? 100 : p;
      return {
        text,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: expl(
          `${p} % veut dire ${p} sur 100 : sur 100 ${s.nom}, ${p} ${s.adj}.` +
            (N !== 100 ? ` Attention : le pourcentage se lit toujours sur 100, même s’il y a ${N} ${s.nom}.` : "") +
            ` Réponse : ${r}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_comprendre_qcm_tpl_sens",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Le symbole % veut dire « sur 100 ».",
    tags: ["pourcentage_nombre", "comprendre", "qcm", "template"],
    generate: () => {
      const s = pick(SITUATIONS_PCT);
      const P = pick(PRENOMS);
      const p = pick([5, 10, 20, 25, 30, 40, 50, 60, 75, 80]);
      const N = totalPour(p, s.max);
      const bonne = `${p} ${s.nom} sur 100`;
      const leurres = [`${p} ${s.nom} sur 10`, `100 ${s.nom} sur ${p}`, `${p} ${s.nom} sur 1 000`];
      if (N !== 100) leurres.push(`${p} ${s.nom} sur ${N}`);
      const question = pick([
        `Que veut dire « ${p} % » ici ?`,
        `Quelle phrase dit la même chose que « ${p} % » ?`,
        `Choisis le sens de « ${p} % ».`,
        `« ${p} % », cela veut dire :`,
      ]);
      return {
        text: `${s.tot(N, P)} ${p} % des ${s.nom} ${s.adj}. ${question}`,
        format: "qcm",
        choices: choixQcm(bonne, leurres),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: expl(`Le symbole % veut dire « sur 100 » : ${p} % des ${s.nom}, c’est ${p} ${s.nom} sur 100. On compte toujours sur 100, quel que soit le nombre total.`),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_comprendre_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le symbole % signifie “sur 100”.",
    tags: ["pourcentage_nombre", "comprendre", "qcm", "template"],
    // 06/10 : le sens inverse — « k sur 100 », c'est k %.
    generate: () => {
      const s = pick(SITUATIONS_PCT);
      const P = pick(PRENOMS);
      const k = randomInt(2, 98);
      const bonne = `${k} %`;
      const question = pick([
        `Quel pourcentage des ${s.nom} ${s.adj} ?`,
        `Quelle part des ${s.nom} ${s.adj}, en pourcentage ?`,
        `Écris en pourcentage la part des ${s.nom} qui ${s.adj}.`,
        `Combien de pour cent des ${s.nom} ${s.adj} ?`,
      ]);
      return {
        text: `${s.tot(100, P)} ${k} ${s.nom} ${s.adj}. ${question}`,
        format: "qcm",
        choices: choixQcm(bonne, [`${100 - k} %`, "100 %", ...(k + 10 < 100 ? [`${k + 10} %`] : []), ...(k > 5 ? [`${k - 5} %`] : [])]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: expl(`Il y a 100 ${s.nom} en tout : ${k} sur 100, c’est ${k} %.`),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_comprendre_tpl_cent",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Sur 100, le nombre compté est directement le pourcentage.",
    tags: ["pourcentage_nombre", "comprendre", "template"],
    generate: () => {
      const s = pick(SITUATIONS_PCT);
      const P = pick(PRENOMS);
      const k = randomInt(2, 98);
      const versPct = Math.random() < 0.5;
      const text = versPct
        ? `${s.tot(100, P)} ${k} ${s.nom} ${s.adj}. ${pick([`Quel pourcentage cela représente-t-il ?`, `Cela fait combien de pour cent ?`, `Écris cette part en pourcentage.`])}`
        : `${s.tot(100, P)} ${k} % des ${s.nom} ${s.adj}. ${pick([`Combien ${deNu(s.nom)} ${s.adj} ?`, `Calcule le nombre ${deNu(s.nom)} qui ${s.adj}.`, `Trouve combien ${deNu(s.nom)} ${s.adj}.`])}`;
      return {
        text,
        format: "short",
        expected: versPct ? [String(k), `${k} %`] : [String(k)],
        comparator: "number_equal",
        explanation: expl(
          versPct
            ? `Il y a 100 ${s.nom} : ${k} sur 100, c’est ${k} %.`
            : `${k} % veut dire ${k} sur 100. Il y a justement 100 ${s.nom} : ${k} ${s.adj}.`,
        ),
      };
    },
  },

  // =========================
  // TEMPLATES - FRACTION
  // =========================
  {
    kind: "template",
    id: "pourcentage_fraction_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 1,
    theme: "neutral",
    hint: "Écris le pourcentage sur 100.",
    tags: ["pourcentage_nombre", "fraction", "template"],
    generate: () => {
      const p = pick([5, 10, 15, 20, 25, 30, 40, 45, 50, 60, 75, 80, 90]);
      const question = pick([
        `Écris ${p} % sous forme d’une fraction de dénominateur 100.`,
        `Quelle fraction de dénominateur 100 vaut ${p} % ?`,
        `Complète avec une fraction : ${p} % = …`,
        `Traduis ${p} % par une fraction sur 100.`,
      ]);
      return {
        text: Math.random() < 0.75 ? `${phrasePct(p)} ${question}` : question,
        format: "short",
        expected: [`${p}/100`, `${p} / 100`],
        comparator: "fraction_decimal_equivalent",
        explanation: expl(`${p} % veut dire ${p} sur 100. On l’écrit ${p}/100.`),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_fraction_tpl_cent",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 1,
    theme: "neutral",
    hint: "Une fraction sur 100 s’écrit directement en pourcentage : 37/100 = 37 %.",
    tags: ["pourcentage_nombre", "fraction", "template"],
    generate: () => {
      const k = randomInt(2, 98);
      const question = pick([
        `Écris ${k}/100 sous forme de pourcentage.`,
        `Quel pourcentage est égal à ${k}/100 ?`,
        `Complète : ${k}/100 = … %`,
        `Combien de pour cent font ${k}/100 ?`,
      ]);
      let text = question;
      if (Math.random() < 0.8) {
        const s = pick(SITUATIONS_PCT);
        text = `${s.tot(100, pick(PRENOMS))} ${k} ${s.nom} ${s.adj} : c’est ${k}/100 des ${s.nom}. ${pick([
          "Écris cette fraction en pourcentage.",
          "Quel pourcentage cela fait-il ?",
          `Quel pourcentage des ${s.nom} ${s.adj} ?`,
        ])}`;
      }
      return {
        text,
        format: "short",
        expected: [String(k), `${k} %`],
        comparator: "number_equal",
        explanation: expl(`${k}/100, c’est ${k} sur 100 : ${k} %.`),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_fraction_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Le numérateur est le pourcentage, le dénominateur vaut 100.",
    tags: ["pourcentage_nombre", "fraction", "qcm", "template"],
    generate: () => {
      const p = pick([5, 10, 15, 20, 25, 30, 40, 45, 60, 70, 80, 90]);
      const good = `${p}/100`;
      const question = pick([
        `Quelle fraction est égale à ${p} % ?`,
        `${p} %, c’est quelle fraction ?`,
        `Choisis la fraction qui vaut ${p} %.`,
        `Quelle écriture en fraction correspond à ${p} % ?`,
      ]);
      return {
        text: Math.random() < 0.75 ? `${phrasePct(p)} ${question}` : question,
        format: "qcm",
        // 1/10 = 10/100 : le leurre « 1/p » serait juste pour p = 10.
        choices: choixQcm(good, [`${p}/10`, `100/${p}`, `${100 - p}/100`, ...(p !== 10 ? [`1/${p}`] : [])]),
        expected: [good],
        comparator: "mcq_exact",
        explanation: expl(`${p} % veut dire ${p} sur 100 : la fraction est ${good}. Attention, ${p}/10 vaudrait ${p} dixièmes, dix fois plus.`),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_fraction_qcm_tpl_simple",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    hint: "50 % = la moitié ; 25 % = le quart ; 10 % = le dixième.",
    tags: ["pourcentage_nombre", "fraction", "qcm", "template"],
    generate: () => {
      const PARTS = [
        { p: 50, c: "1/2, la moitié" },
        { p: 25, c: "1/4, le quart" },
        { p: 75, c: "3/4, les trois quarts" },
        { p: 10, c: "1/10, le dixième" },
        { p: 20, c: "1/5, le cinquième" },
      ];
      const bonne = pick(PARTS);
      const question = pick([
        `${bonne.p} %, c’est quelle part ?`,
        `À quelle fraction simple correspond ${bonne.p} % ?`,
        `Choisis la part égale à ${bonne.p} %.`,
        `${bonne.p} % représente…`,
      ]);
      return {
        text: Math.random() < 0.8 ? `${phrasePct(bonne.p)} ${question}` : question,
        format: "qcm",
        choices: choixQcm(bonne.c, PARTS.map((x) => x.c)),
        expected: [bonne.c],
        comparator: "mcq_exact",
        explanation: expl(`${bonne.p} % = ${bonne.p}/100 = ${bonne.c.replace(", ", " : ")}.`),
      };
    },
  },

  // =========================
  // TEMPLATES - DECIMAL
  // =========================
  {
    kind: "template",
    id: "pourcentage_decimal_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Un pourcentage s’écrit en décimal en divisant par 100.",
    tags: ["pourcentage_nombre", "decimal", "template"],
    generate: () => {
      const p = pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 90]);
      const dec = p / 100;
      const question = pick([
        `Écris ${p} % sous forme d’un nombre décimal.`,
        `Quel nombre décimal vaut ${p} % ?`,
        `Complète : ${p} % = … (un nombre décimal)`,
        `Donne ${p} % en écriture décimale.`,
        `Transforme ${p} % en nombre décimal.`,
      ]);

      return {
        text: Math.random() < 0.8 ? `${phrasePct(p)} ${question}` : question,
        format: "short",
        expected: [formatComma(dec), `${p}/100`, `${p} / 100`],
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
          "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
          "Calcul : " +
          (`${p} % signifie ${p}/100. En écriture décimale, cela donne ${formatComma(dec)}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_decimal_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise par 100.",
    tags: ["pourcentage_nombre", "decimal", "qcm", "template"],
    generate: () => {
      const p = pick([5, 8, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80, 90]);
      const good = percentToDecimalString(p);
      // « 0,5 » pour 5 % : le piège classique. Seulement si p < 10 (0,25 serait juste pour 25 %).
      const leurres = [formatComma(p / 10), formatComma(p), formatComma((100 - p) / 100), ...(p < 10 ? [`0,${p}`] : [])];
      const question = pick([
        `Quelle est l’écriture décimale de ${p} % ?`,
        `${p} %, c’est quel nombre décimal ?`,
        `Choisis le nombre égal à ${p} %.`,
        `Quel nombre peut remplacer ${p} % ?`,
      ]);

      return {
        text: Math.random() < 0.8 ? `${phrasePct(p)} ${question}` : question,
        format: "qcm",
        choices: choixQcm(good, leurres),
        expected: [good],
        comparator: "mcq_exact",
        explanation: "Définition : un pourcentage exprime une proportion sur 100.\n\n" +
          "Méthode : on ramène la situation à une proportion sur 100 ou à une part simple.\n\n" +
          "Calcul : " +
          (`${p} % signifie ${p}/100. En écriture décimale, cela donne ${good}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_decimal_tpl_inverse",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "0,35 = 35 centièmes = 35/100 = 35 %.",
    tags: ["pourcentage_nombre", "decimal", "template"],
    generate: () => {
      const p = pick([5, 8, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 65, 70, 75, 80, 90, 95]);
      const d = percentToDecimalString(p);
      let text = pick([
        `Écris ${d} sous forme de pourcentage.`,
        `Quel pourcentage est égal à ${d} ?`,
        `Complète : ${d} = … %`,
      ]);
      if (Math.random() < 0.75) {
        const s = pick(SITUATIONS_PCT);
        const P = pick(PRENOMS);
        text = `${P.n} calcule la part des ${s.nom} qui ${s.adj} : ${il(P)} trouve ${d}. ${pick([
          "Écris cette part en pourcentage.",
          "Quel pourcentage est-ce ?",
          `Quel pourcentage des ${s.nom} ${s.adj} ?`,
          "Cela fait combien de pour cent ?",
        ])}`;
      }
      return {
        text,
        format: "short",
        expected: [String(p), `${p} %`],
        comparator: "number_equal",
        explanation: expl(`${d}, c’est ${p} centièmes, donc ${p}/100, donc ${p} %. On multiplie par 100 : ${d} × 100 = ${p}.`),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_decimal_qcm_tpl_egalite",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Un pourcentage, c’est un nombre de centièmes : 7 % = 0,07.",
    tags: ["pourcentage_nombre", "decimal", "qcm", "template"],
    generate: () => {
      // Une égalité juste parmi des égalités fausses (le pourcentage change d'une ligne à l'autre).
      const ps = shuffle([5, 8, 10, 20, 25, 30, 40, 50, 60, 75, 90]).slice(0, 4);
      const juste = `${ps[0]} % = ${percentToDecimalString(ps[0])}`;
      const fausses = ps.slice(1).map((p, i) =>
        i === 0 ? `${p} % = ${formatComma(p / 10)}` : i === 1 ? `${p} % = ${p < 10 ? `0,${p}` : formatComma(p)}` : `${p} % = ${formatComma(p === 50 ? 5 : (100 - p) / 100)}`,
      );
      const P = pick(PRENOMS);
      const consigne = pick([
        "Quelle égalité est vraie ?",
        "Une seule égalité est juste. Laquelle ?",
        `${P.n} a écrit quatre égalités. Laquelle est juste ?`,
        `Aide ${P.n} : quelle égalité est correcte ?`,
      ]);
      return {
        text: consigne,
        format: "qcm",
        choices: shuffle([juste, ...fausses]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(`${juste} : ${ps[0]} % veut dire ${ps[0]} centièmes. Les autres égalités se trompent de rang.`),
      };
    },
  },

  // =========================
  // TEMPLATES - LIRE
  // =========================
  {
    kind: "template",
    id: "pourcentage_lire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le pourcentage indique combien sur 100.",
    tags: ["pourcentage_nombre", "lecture", "template"],
    // 06/10 : lire DEUX pourcentages dans une phrase et choisir le bon.
    generate: () => {
      const { text, r, s } = lireDeuxCategories();
      return {
        text,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: expl(`Il y a 100 ${s.nom} : ${r} % des ${s.nom}, c’est ${r} sur 100, donc ${r} ${s.nom}. On lit le bon pourcentage dans la phrase.`),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_lire_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le pourcentage donne directement le nombre sur 100.",
    tags: ["pourcentage_nombre", "lecture", "qcm", "template"],
    generate: () => {
      const { text, r, s } = lireDeuxCategories();
      return {
        text,
        format: "qcm",
        choices: choixQcm(String(r), [String(100 - r), "100", String(r + 10), ...(r > 10 ? [String(r - 10)] : [])]),
        expected: [String(r)],
        comparator: "mcq_exact",
        explanation: expl(`Il y a 100 ${s.nom} : ${r} % des ${s.nom}, c’est ${r} sur 100, donc ${r} ${s.nom}.`),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_lire_qcm_tpl_reduc",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "50 % = la moitié ; 25 % = le quart ; 10 % = le dixième.",
    tags: ["pourcentage_nombre", "lecture", "qcm", "template"],
    generate: () => {
      const PARTS = [
        { p: 50, c: "la moitié" },
        { p: 25, c: "le quart" },
        { p: 75, c: "les trois quarts" },
        { p: 10, c: "le dixième" },
        { p: 20, c: "le cinquième" },
      ];
      const b = pick(PARTS);
      const P = pick(PRENOMS);
      const ARTICLES = ["les baskets", "les vélos", "les jeux de société", "les maillots de foot", "les sacs à dos", "les livres de cuisine", "les guitares", "les tentes de camping", "les rollers", "les casques audio", "les puzzles", "les raquettes de tennis", "les cannes à pêche", "les pots de fleurs"];
      const article = pick(ARTICLES);
      const lieu = pick([`Dans un magasin, ${P.n} voit l’affiche`, `Sur un site internet, ${P.n} lit`, `Au rayon, une étiquette annonce`, `Pendant les soldes, ${P.n} remarque l’affiche`]);
      const question = pick([
        "Quelle part du prix est enlevée ?",
        "Quelle part du prix ne paie-t-on pas ?",
        "De quelle part le prix baisse-t-il ?",
        "Que retire-t-on du prix ?",
      ]);
      return {
        text: `${lieu} « −${b.p} % sur ${article} ». ${question}`,
        format: "qcm",
        choices: choixQcm(b.c, PARTS.map((x) => x.c)),
        expected: [b.c],
        comparator: "mcq_exact",
        explanation: expl(`${b.p} % = ${b.p}/100, c’est ${b.c}. On enlève ${b.c} du prix.`),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_lire_tpl_reste",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Tous ensemble, ils font 100 %.",
    tags: ["pourcentage_nombre", "lecture", "template"],
    generate: () => {
      const s = pick(SITUATIONS_PCT);
      const P = pick(PRENOMS);
      const p = randomInt(2, 19) * 5;
      const r = 100 - p;
      const question = pick([
        `Combien ${deNu(s.nom)} ${s.autre} ?`,
        `Trouve le nombre ${deNu(s.nom)} qui ${s.autre}.`,
        `Calcule combien ${deNu(s.nom)} ${s.autre}.`,
      ]);
      return {
        text: `${s.tot(100, P)} ${p} % des ${s.nom} ${s.adj}. Les autres ${s.autre}. ${question}`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: expl(`Tous les ${s.nom} font 100 %. Ceux qui ${s.autre} représentent 100 − ${p} = ${r} %. Sur 100 ${s.nom}, cela fait ${r} ${s.nom}.`),
      };
    },
  },

  // =========================
  // TEMPLATES - CALCUL SIMPLE
  // =========================
  {
    kind: "template",
    id: "pourcentage_calcul_simple_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "10 % = 1/10 ; 50 % = la moitié ; 25 % = le quart.",
    tags: ["pourcentage_nombre", "calcul", "template"],
    // 06/10 : 10 %, 25 %, 50 % — calcul nu (forme variée) ou dans une situation.
    generate: () => {
      const c = appliquerPct([10, 25, 50], 0.35);
      return {
        text: c.text,
        format: "short",
        expected: [String(c.r)],
        comparator: "number_equal",
        explanation: expl(methodePourcentage(c.p, c.n)),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_calcul_simple_tpl_quantite",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "10 % = le dixième ; 50 % = la moitié ; 25 % = le quart.",
    tags: ["pourcentage_nombre", "calcul", "template", "contexte"],
    generate: () => ({ ...genQuantite([10, 25, 50]), format: "short", comparator: "number_equal" }),
  },
  {
    kind: "template",
    id: "pourcentage_calcul_simple_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "Choisis une méthode simple : moitié, quart, dixième.",
    tags: ["pourcentage_nombre", "calcul", "qcm", "template"],
    generate: () => {
      const c = appliquerPct([10, 20, 25, 50, 75], 0.3);
      return {
        text: c.text,
        format: "qcm",
        // Les erreurs typiques : le total lui-même, le reste, « p » au lieu de p %.
        choices: choixQcm(String(c.r), [String(c.n), String(c.n - c.r), String(c.p), String(c.r + 1), String(c.r * 10)]),
        expected: [String(c.r)],
        comparator: "mcq_exact",
        explanation: expl(methodePourcentage(c.p, c.n)),
      };
    },
  },

  // =========================
  // TEMPLATES - DEFIS
  // =========================
  {
    kind: "template",
    id: "pourcentage_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pense à “sur 100” ou à une fraction simple.",
    tags: ["pourcentage_nombre", "defi", "template"],
    // 06/10 : une part en mots (« les trois quarts ») dans une situation → le pourcentage.
    generate: () => {
      const PARTS = [
        { mots: "la moitié", p: 50 },
        { mots: "le quart", p: 25 },
        { mots: "les trois quarts", p: 75 },
        { mots: "le dixième", p: 10 },
        { mots: "le cinquième", p: 20 },
        { mots: "les deux cinquièmes", p: 40 },
        { mots: "les trois dixièmes", p: 30 },
      ];
      const OBJETS = [
        { gn: "la pizza", fait: "a mangé", pp: "mangé" },
        { gn: "le gâteau", fait: "a mangé", pp: "mangé" },
        { gn: "la tablette de chocolat", fait: "a croqué", pp: "croqué" },
        { gn: "le trajet jusqu’au stade", fait: "a parcouru", pp: "parcouru" },
        { gn: "le roman", fait: "a lu", pp: "lu" },
        { gn: "le puzzle", fait: "a terminé", pp: "terminé" },
        { gn: "le potager", fait: "a désherbé", pp: "désherbé" },
        { gn: "la course", fait: "a couru", pp: "couru" },
        { gn: "la tarte aux pommes", fait: "a mangé", pp: "mangé" },
        { gn: "la randonnée", fait: "a parcouru", pp: "parcouru" },
        { gn: "le mur de la cabane", fait: "a peint", pp: "peint" },
        { gn: "l’album photo", fait: "a rangé", pp: "rangé" },
        { gn: "la partition", fait: "a appris", pp: "appris" },
        { gn: "la haie du jardin", fait: "a taillé", pp: "taillé" },
        { gn: "le film", fait: "a regardé", pp: "regardé" },
      ];
      const b = pick(PARTS);
      const o = pick(OBJETS);
      const P = pick(PRENOMS);
      const deGn = o.gn.startsWith("le ") ? "du " + o.gn.slice(3) : "de " + o.gn;
      const question = pick([
        `Quel pourcentage ${deGn} a-t-${il(P)} ${o.pp} ?`,
        "Écris cette part en pourcentage.",
        "Cela fait combien de pour cent ?",
        `Quelle part ${deGn}, en pourcentage, a-t-${il(P)} ${o.pp} ?`,
      ]);
      return {
        text: `${P.n} ${o.fait} ${b.mots} ${deGn}. ${question}`,
        format: "short",
        expected: [String(b.p), `${b.p} %`],
        comparator: "number_equal",
        explanation: expl(`${cap(b.mots)}, c’est ${b.p} sur 100 : ${b.p} %. (On peut penser à 100 parts : ${b.mots} de 100, c’est ${b.p}.)`),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_defi_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les pourcentages ou relie-les à des fractions.",
    tags: ["pourcentage_nombre", "defi", "qcm", "template"],
    // 06/10 : le défi à rebours — après la remise, retrouver le prix de départ.
    generate: () => {
      const p = pick([50, 25, 10, 20]);
      const { a, prix: avant } = articleEtPrix(pasEntier(p));
      const apres = avant - (p * avant) / 100;
      const P = pick(PRENOMS);
      const debut = pick([
        `Pendant les soldes, ${P.n} achète ${a.gn} affiché${a.f ? "e" : ""} « −${p} % ». ${Il(P)} paie ${apres} €.`,
        `Avec une remise de ${p} %, ${a.gn} coûte ${apres} €.`,
        `${P.n} a payé ${a.gn} ${apres} € grâce à une réduction de ${p} %.`,
      ]);
      const question = pick(["Quel était le prix avant la remise ?", "Combien coûtait cet objet avant les soldes ?", "Retrouve le prix de départ."]);
      // Les erreurs typiques : ajouter p €, ajouter p % du prix payé, retirer encore p %.
      const leurres = [apres + p, apres + (p * apres) / 100, apres - (p * apres) / 100, 2 * apres]
        .filter((x) => Number.isInteger(x) && x > 0)
        .map((x) => `${x} €`);
      return {
        text: `${debut} ${question}`,
        format: "qcm",
        choices: choixQcm(`${avant} €`, leurres),
        expected: [`${avant} €`],
        comparator: "mcq_exact",
        explanation: expl(
          `Après une remise de ${p} %, on paie ${100 - p} % du prix de départ. ` +
            `${100 - p} % du prix valent ${apres} €. ` +
            (p === 50
              ? `La moitié du prix vaut ${apres} €, donc le prix entier vaut ${apres} × 2 = ${avant} €.`
              : `${p === 25 ? `Les trois quarts du prix valent ${apres} € : un quart vaut ${apres} ÷ 3 = ${avant / 4} €, et le prix entier ${avant / 4} × 4 = ${avant} €.` : `On cherche 10 % : ${(100 - p) / 10} fois 10 % valent ${apres} €, donc 10 % valent ${apres} ÷ ${(100 - p) / 10} = ${avant / 10} €, et le prix entier ${avant / 10} × 10 = ${avant} €.`}`) +
            ` Piège : ajouter ${p} % de ${apres} € ne redonne pas le bon prix.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_defi_tpl_complement_pct",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 1,
    theme: "neutral",
    hint: "Le groupe entier, c’est 100 %.",
    tags: ["pourcentage_nombre", "defi", "template"],
    generate: () => {
      const s = pick(SITUATIONS_PCT);
      const P = pick(PRENOMS);
      const k = randomInt(2, 98);
      const autre = Math.random() < 0.6;
      const phrase = autre ? s.autre : s.adj;
      const question = pick([
        `Quel pourcentage des ${s.nom} ${phrase} ?`,
        `Combien de pour cent des ${s.nom} ${phrase} ?`,
        `Écris en pourcentage la part des ${s.nom} qui ${phrase}.`,
      ]);
      const r = autre ? 100 - k : k;
      return {
        text: `${s.tot(100, P)} ${k} ${s.nom} ${s.adj}. Les autres ${s.autre}. ${question}`,
        format: "short",
        expected: [String(r), `${r} %`],
        comparator: "number_equal",
        explanation: expl(
          autre
            ? `Il y a 100 ${s.nom}. ${k} ${s.adj}, donc 100 − ${k} = ${r} ${s.autre}. ${r} sur 100, c’est ${r} %.`
            : `Il y a 100 ${s.nom} : ${k} sur 100, c’est ${k} %.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_defi_tpl_complement",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 2,
    theme: "neutral",
    hint: "Le groupe entier, c’est 100 %. Ne te laisse pas distraire par le nombre total.",
    tags: ["pourcentage_nombre", "defi", "template"],
    generate: () => {
      const s = pick(SITUATIONS_PCT);
      const P = pick(PRENOMS);
      const p = randomInt(1, 19) * 5;
      const N = totalPour(p, s.max);
      const question = pick([
        `Quel pourcentage des ${s.nom} ${s.autre} ?`,
        `Combien de pour cent des ${s.nom} ${s.autre} ?`,
        `Écris en pourcentage la part des ${s.nom} qui ${s.autre}.`,
      ]);
      return {
        text: `${s.tot(N, P)} ${p} % des ${s.nom} ${s.adj}. Les autres ${s.autre}. ${question}`,
        format: "short",
        expected: [String(100 - p), `${100 - p} %`],
        comparator: "number_equal",
        explanation: expl(`Tous les ${s.nom} font 100 %. Ceux qui ${s.autre} : 100 − ${p} = ${100 - p} %. Le nombre ${N} ne sert pas ici.`),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_defi_tpl_deux_etapes",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord le pourcentage donné, puis retire-le du total.",
    tags: ["pourcentage_nombre", "defi", "template", "deux_etapes"],
    generate: () => {
      const s = pick(SITUATIONS_PCT);
      const P = pick(PRENOMS);
      const p = pick([10, 20, 25, 30, 40, 50, 60, 75, 80, 90]);
      const N = totalPour(p, s.max);
      const r = N - (p * N) / 100;
      const question = pick([
        `Combien ${deNu(s.nom)} ${s.autre} ?`,
        `Trouve le nombre ${deNu(s.nom)} qui ${s.autre}.`,
        `Calcule combien ${deNu(s.nom)} ${s.autre}.`,
      ]);
      return {
        text: `${s.tot(N, P)} ${p} % des ${s.nom} ${s.adj}. Les autres ${s.autre}. ${question}`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: expl(
          `${methodePourcentage(p, N)} Les autres : ${N} − ${(p * N) / 100} = ${r}. ` +
            `(Ou bien : ils représentent 100 − ${p} = ${100 - p} %, et ${100 - p} % de ${N} = ${r}.)`,
        ),
      };
    },
  },

  // ===== TOP-UP — POURCENTAGE_LIRE =====
  { kind: "fixed", id: "pourcentage_lire_topup_1", niveau: "6e", matiere: "maths", notionId: "pourcentage_nombre", microId: "pourcentage_lire", difficulty: 2, theme: "neutral",
    text: "Dans une classe de 100 élèves, 40 % aiment le sport. Combien d’élèves cela représente-t-il ?", format: "short", expected: ["40"], comparator: "number_equal",
    hint: "40 % = 40 sur 100.", explanation: expl("Sur 100 élèves, 40 % signifie 40 sur 100. Cela représente donc 40 élèves."), tags: ["pourcentage_nombre", "lecture"] },
  { kind: "fixed", id: "pourcentage_lire_topup_2", niveau: "6e", matiere: "maths", notionId: "pourcentage_nombre", microId: "pourcentage_lire", difficulty: 2, theme: "neutral",
    text: "Un article affiche « −50 % ». Quelle fraction du prix est enlevée ?", format: "qcm", choices: ["la moitié", "le quart", "le tiers", "rien"], expected: ["la moitié"], comparator: "mcq_exact",
    hint: "50 % = 50 sur 100 = 1/2.", explanation: expl("50 % signifie 50 sur 100, soit 1/2 : on enlève la moitié du prix."), tags: ["pourcentage_nombre", "lecture", "qcm"] },
  { kind: "fixed", id: "pourcentage_lire_topup_3", niveau: "6e", matiere: "maths", notionId: "pourcentage_nombre", microId: "pourcentage_lire", difficulty: 2, theme: "neutral",
    text: "Sur 100 voitures, 25 % sont rouges. Combien de voitures sont rouges ?", format: "short", expected: ["25"], comparator: "number_equal",
    hint: "25 % = 25 sur 100.", explanation: expl("Sur 100 voitures, 25 % signifie 25 sur 100 : cela représente 25 voitures rouges."), tags: ["pourcentage_nombre", "lecture"] },

  // =========================
  // GÉNÉRATEURS DU 29/09/2026 — L'ÉVALUATION PAR CHAPITRES
  //
  // Un prof peut lancer 20 questions sur « Pourcentages » seul : le mode Défi
  // (difficultés 3 à 5) n'en offrait que 17 distinctes. Six générateurs, qui
  // paramètrent le total, le pourcentage ET la situation — le programme de 6e
  // en trois gestes : appliquer un pourcentage, exprimer une proportion en
  // pourcentage, et s'en servir dans un problème à deux étapes.
  // =========================
  {
    kind: "template",
    id: "pourcentage_calcul_simple_tpl_contexte",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "10 % = le dixième ; 50 % = la moitié ; 25 % = le quart.",
    tags: ["pourcentage_nombre", "calcul", "template", "contexte"],
    // 06/10 : la table SITUATIONS_PCT × trois tournures (plus de calcul nu ici).
    generate: () => {
      const c = appliquerPct([10, 20, 25, 30, 40, 50, 75], 0);
      return {
        text: c.text,
        format: "short",
        expected: [String(c.r)],
        comparator: "number_equal",
        explanation: expl(methodePourcentage(c.p, c.n)),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_calcul_simple_tpl_quantite3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord 10 %, puis multiplie ; ou prends la moitié, le quart.",
    tags: ["pourcentage_nombre", "calcul", "template", "contexte"],
    generate: () => ({ ...genQuantite([10, 20, 25, 30, 40, 50, 75]), format: "short", comparator: "number_equal" }),
  },
  {
    kind: "template",
    id: "pourcentage_fraction_tpl_proportion",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris la part sous forme de fraction, puis cherche la fraction égale sur 100.",
    tags: ["pourcentage_nombre", "fraction", "proportion", "template"],
    // 06/10 : les cinq situations d'origine + la table SITUATIONS_PCT × quatre tournures.
    generate: () => {
      const P = pick(PRENOMS);
      const situations = [
        { totaux: [20, 25], f: (N: number, k: number) => `Dans une classe de ${N} élèves, ${k} portent des lunettes. Quel pourcentage des élèves portent des lunettes ?` },
        { totaux: [10, 20, 25, 50], f: (N: number, k: number) => `Sur ${N} tirs au but, ${P.f ? "la gardienne" : "le gardien"} ${P.n} en arrête ${k}. Quel pourcentage des tirs arrête-t-${il(P)} ?` },
        { totaux: [10, 20, 25, 50], f: (N: number, k: number) => `Un quiz compte ${N} questions ; ${P.n} en réussit ${k}. Quel pourcentage de bonnes réponses obtient-${il(P)} ?` },
        { totaux: [50, 200], f: (N: number, k: number) => `Sur ${N} personnes interrogées, ${k} préfèrent le vélo. Quel pourcentage des personnes interrogées cela représente-t-il ?` },
        { totaux: [4, 5, 10], f: (N: number, k: number) => `Une tarte est coupée en ${N} parts égales ; ${P.n} en mange ${k}. Quel pourcentage de la tarte a-t-${il(P)} mangé ?` },
        ...SITUATIONS_PCT.map((s) => ({
          totaux: [10, 20, 25, 50, 200].filter((N) => N <= s.max),
          f: (N: number, k: number) =>
            `${s.tot(N, P)} ${k} ${s.nom} ${s.adj}. ${pick([
              `Quel pourcentage des ${s.nom} ${s.adj} ?`,
              `Quelle part des ${s.nom} ${s.adj}, en pourcentage ?`,
              `Exprime en pourcentage la part des ${s.nom} qui ${s.adj}.`,
              `Combien de pour cent des ${s.nom} ${s.adj} ?`,
            ])}`,
        })),
      ];
      const s = pick(situations);
      const N = pick(s.totaux);
      // Pour N = 200, k doit être pair pour que le pourcentage soit entier.
      const k = N === 200 ? 2 * randomInt(1, 99) : randomInt(N > 5 ? 2 : 1, N - 1);
      const p = (100 * k) / N;
      const calcul =
        100 % N === 0
          ? `La part est ${k}/${N}. On multiplie en haut et en bas par ${100 / N} : ${k}/${N} = ${k * (100 / N)}/100, soit ${p} %.`
          : `La part est ${k}/${N}. On divise en haut et en bas par 2 : ${k}/${N} = ${k / 2}/100, soit ${p} %.`;
      return {
        text: s.f(N, k),
        format: "short",
        expected: [String(p), `${p} %`, `${p}%`],
        comparator: "number_equal",
        explanation: expl(calcul),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_fraction_qcm_tpl_fraction_vers_pourcentage",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_fraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la fraction égale dont le dénominateur est 100.",
    tags: ["pourcentage_nombre", "fraction", "qcm", "template"],
    generate: () => {
      const b = pick([2, 4, 5, 10, 20, 25, 50]);
      const candidats = Array.from({ length: b - 1 }, (_, i) => i + 1).filter((a) => pgcd(a, b) === 1);
      const a = pick(candidats);
      const p = (100 * a) / b;
      // 06/10 : trois fois sur quatre, la fraction décrit une collection de la table.
      let text = pick([
        `Quel pourcentage correspond à la fraction ${a}/${b} ?`,
        `Écris la fraction ${a}/${b} en pourcentage.`,
        `${a}/${b}, cela fait combien de pour cent ?`,
      ]);
      if (Math.random() < 0.75) {
        const s = pick(SITUATIONS_PCT.filter((x) => x.max >= 2 * b));
        const N = b * randomInt(Math.max(1, Math.ceil(10 / b)), Math.floor(s.max / b));
        text = `${s.tot(N, pick(PRENOMS))} On sait que ${a}/${b} des ${s.nom} ${s.adj}. ${pick([
          `Quel pourcentage des ${s.nom} ${s.adj} ?`,
          "Écris cette part en pourcentage.",
          "Cela fait combien de pour cent ?",
          `Quelle part des ${s.nom} ${s.adj}, en pourcentage ?`,
        ])}`;
      }
      return {
        text,
        format: "qcm",
        choices: choixQcm(`${p} %`, [`${a} %`, `${b} %`, `${100 - p} %`, `${a * 10} %`, ...(p % 10 === 0 ? [`${p / 10} %`] : [])]),
        expected: [`${p} %`],
        comparator: "mcq_exact",
        explanation: expl(`On cherche la fraction égale sur 100 : ${a}/${b} = ${a * (100 / b)}/100 (on a multiplié par ${100 / b}). Donc ${a}/${b} = ${p} %. Attention : ${a}/${b} n’est pas ${a} %.`),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_defi_qcm_tpl_soldes",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord la remise en euros, puis retire-la du prix.",
    tags: ["pourcentage_nombre", "defi", "qcm", "template", "soldes"],
    generate: () => {
      const p = pick([10, 20, 25, 30, 40, 50]);
      const { a, prix: P } = articleEtPrix(pasEntier(p));
      const remise = (p * P) / 100;
      const nouveau = P - remise;
      const E = pick(PRENOMS);
      const debut = pick([
        `Pendant les soldes, ${a.gn} à ${P} € est affiché${a.f ? "e" : ""} « −${p} % ».`,
        `${E.n} veut acheter ${a.gn} à ${P} €. Le magasin fait une remise de ${p} %.`,
        `Sur un site, ${a.gn} coûte ${P} €. Aujourd’hui, son prix baisse de ${p} %.`,
        `${cap(a.gn)} coûte ${P} €. ${E.n} a un bon de réduction de ${p} %.`,
      ]);
      const question = pick([
        "Quel est le nouveau prix ?",
        "Combien va-t-on payer ?",
        "Quel prix paie-t-on en caisse ?",
        "Combien coûte l’objet après la remise ?",
      ]);
      return {
        text: `${debut} ${question}`,
        format: "qcm",
        choices: choixQcm(`${nouveau} €`, [`${remise} €`, ...(P - p > 0 ? [`${P - p} €`] : []), `${P + remise} €`]),
        expected: [`${nouveau} €`],
        comparator: "mcq_exact",
        explanation: expl(
          `La remise vaut ${p} % de ${P} € : ${methodePourcentage(p, P)} On retire la remise : ${P} − ${remise} = ${nouveau} €. ` +
            `Piège : on n’enlève pas ${p} €, et ${remise} € est la remise, pas le prix.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_defi_tpl_reste",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Quel pourcentage reste-t-il pour le dernier groupe ? Le total fait 100 %.",
    tags: ["pourcentage_nombre", "defi", "template", "deux_etapes"],
    generate: () => {
      const N = pick([20, 40, 60, 80, 120, 140, 160, 200, 240, 300]);
      const p1 = 5 * randomInt(2, 12);
      const p2 = 5 * randomInt(1, Math.min(12, 18 - p1 / 5));
      const q = 100 - p1 - p2;
      const r = (q * N) / 100;
      const P = pick(PRENOMS);
      // 06/10 : onze situations à trois groupes (le total vient toujours en premier).
      const s = pick([
        `Ce matin, ${N} élèves arrivent au collège : ${p1} % viennent à pied et ${p2} % en bus. Les autres viennent en voiture. Combien d’élèves viennent en voiture ?`,
        `Un verger compte ${N} arbres : ${p1} % de pommiers, ${p2} % de poiriers et le reste de cerisiers. Combien y a-t-il de cerisiers ?`,
        `Parmi ${N} spectateurs, ${p1} % sont des enfants et ${p2} % sont des personnes âgées. Les autres sont des adultes. Combien de spectateurs sont des adultes ?`,
        `On a interrogé ${N} personnes : ${p1} % ont répondu « oui », ${p2} % « non » et les autres sont sans avis. Combien de personnes sont sans avis ?`,
        `La bibliothèque ${de(P.n)} contient ${N} livres : ${p1} % de romans, ${p2} % de bandes dessinées et le reste de documentaires. Combien y a-t-il de documentaires ?`,
        `Le club de sport ${de(P.n)} compte ${N} membres : ${p1} % font du foot, ${p2} % du basket et les autres du handball. Combien de membres font du handball ?`,
        `Dans le potager ${de(P.n)}, il y a ${N} plants : ${p1} % de tomates, ${p2} % de salades et le reste de courgettes. Combien y a-t-il de plants de courgettes ?`,
        `${P.n} a ${N} chansons : ${p1} % de rap, ${p2} % de pop et le reste de jazz. Combien de chansons de jazz a-t-${il(P)} ?`,
        `Un refuge accueille ${N} animaux : ${p1} % de chats, ${p2} % de chiens et le reste de lapins. Combien y a-t-il de lapins ?`,
        `Une boîte contient ${N} perles : ${p1} % sont rouges, ${p2} % sont bleues et les autres sont jaunes. Combien de perles sont jaunes ?`,
        `${P.n} observe ${N} oiseaux : ${p1} % de mésanges, ${p2} % de merles et le reste de moineaux. Combien de moineaux a-t-${il(P)} observés ?`,
      ]);
      return {
        text: s,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: expl(
          `Le dernier groupe représente 100 − ${p1} − ${p2} = ${q} % du total. ${q} % de ${N} = ${N} × ${q} ÷ 100 = ${r}. ` +
            `(On peut aussi calculer les deux premiers groupes, ${(p1 * N) / 100} et ${(p2 * N) / 100}, puis les retirer de ${N}.)`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_defi_qcm_tpl_comparer",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentage_nombre",
    microId: "pourcentage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Un grand pourcentage d’un petit nombre peut être plus petit qu’un petit pourcentage d’un grand nombre : calcule les deux.",
    tags: ["pourcentage_nombre", "defi", "qcm", "template", "comparaison"],
    generate: () => {
      // Deux fois sur trois, on garde un tirage où le PLUS GRAND pourcentage
      // ne donne PAS le plus grand nombre (ou l'égalité) : c'est là qu'est le défi.
      const contreIntuitif = Math.random() < 2 / 3;
      let p1 = 0, p2 = 0, n1 = 0, n2 = 0, r1 = 0, r2 = 0;
      for (let essai = 0; essai < 100; essai++) {
        p1 = pick([10, 20, 25, 50, 75]);
        p2 = pick([10, 20, 25, 50, 75].filter((x) => x !== p1));
        n1 = 20 * randomInt(1, 15);
        n2 = 20 * randomInt(1, 15);
        r1 = (p1 * n1) / 100;
        r2 = (p2 * n2) / 100;
        const piege = r1 === r2 || (p1 > p2) !== (r1 > r2);
        if (piege === contreIntuitif) break;
      }
      // 06/10 : une fois sur deux, deux groupes de deux enfants à comparer.
      const A = pick(PRENOMS);
      const B = pick(PRENOMS.filter((x) => x.n !== A.n));
      const G = pick([
        { gn: "le club de foot", nom: "membres", quoi: "sont des filles", qui: "de filles" },
        { gn: "le collège", nom: "élèves", quoi: "mangent à la cantine", qui: "d’élèves qui mangent à la cantine" },
        { gn: "l’école de musique", nom: "élèves", quoi: "jouent du piano", qui: "d’élèves qui jouent du piano" },
        { gn: "le potager", nom: "plants", quoi: "sont des tomates", qui: "de plants de tomates" },
        { gn: "la collection de cartes", nom: "cartes", quoi: "sont brillantes", qui: "de cartes brillantes" },
        { gn: "la bibliothèque", nom: "livres", quoi: "sont des bandes dessinées", qui: "de bandes dessinées" },
        { gn: "le poulailler", nom: "poules", quoi: "sont rousses", qui: "de poules rousses" },
        { gn: "la boîte à billes", nom: "billes", quoi: "sont bleues", qui: "de billes bleues" },
      ]);
      const enGroupes = Math.random() < 0.5;
      const c1 = enGroupes ? `${G.gn} ${de(A.n)}` : `${p1} % de ${n1}`;
      const c2 = enGroupes ? `${G.gn} ${de(B.n)}` : `${p2} % de ${n2}`;
      const egaux = enGroupes ? "autant dans les deux" : "ils sont égaux";
      const bonne = r1 === r2 ? egaux : r1 > r2 ? c1 : c2;
      const text = enGroupes
        ? `${cap(G.gn)} ${de(A.n)} compte ${n1} ${G.nom} ; ${p1} % ${G.quoi}. ${cap(G.gn)} ${de(B.n)} compte ${n2} ${G.nom} ; ${p2} % ${G.quoi}. Où y a-t-il le plus ${G.qui} ?`
        : pick([
            `Quel nombre est le plus grand : ${c1} ou ${c2} ?`,
            `${A.n} hésite entre ${c1} et ${c2}. Lequel est le plus grand ?`,
            `Compare ${c1} et ${c2}. Lequel est le plus grand ?`,
            `${A.n} dit que ${c1} est plus grand que ${c2}. Qu’en penses-tu ? Choisis le plus grand.`,
          ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([c1, c2, egaux]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: expl(
          `${methodePourcentage(p1, n1)} ${methodePourcentage(p2, n2)} ` +
            (r1 === r2 ? `Les deux valent ${r1} : c’est pareil.` : `Réponse : ${bonne} (${Math.max(r1, r2)} contre ${Math.min(r1, r2)}).`) +
            " Le plus grand pourcentage ne donne pas forcément le plus grand nombre.",
        ),
      };
    },
  },
];