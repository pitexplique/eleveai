/**
 * =========================================================
 * DISTRIBUTIVITE.BANK.TS
 * =========================================================
 *
 * Banque de questions pour la notion de DISTRIBUTIVITÉ (4e).
 *
 * 🎯 OBJECTIF PÉDAGOGIQUE
 * Construire une maîtrise progressive de la distributivité :
 * - comprendre le principe (multiplier chaque terme)
 * - savoir développer
 * - savoir réduire
 * - reconnaître les situations
 * - éviter les erreurs fréquentes
 * - expliquer et justifier (niveau rédaction)
 *
 * ---------------------------------------------------------
 * 🧠 STRUCTURE PAR MICRO-COMPÉTENCES
 * ---------------------------------------------------------
 *
 * 1. distrib_simple      → k(x + b), signes, contextes concrets
 * 2. distrib_double      → (x + a)(x + b), les 4 produits ; (x + 3)² se
 *                          développe comme (x + 3)(x + 3) (programme de 4e :
 *                          PAS la formule a² + 2ab + b²)
 * 3. distrib_reduire     → développer puis regrouper les termes semblables
 * 4. distrib_reconnaitre → somme ou produit, forme développée ou non
 * 5. distrib_defis       → erreurs fréquentes, justification, modélisation
 *
 * Quelques items de la notion litteral_factorisation vivent ici (section
 * « DISTRIB_FACTORISATION ») : FACTEUR COMMUN seulement. ⛔ Décision de
 * Frédéric (30/09/2026) : aucune factorisation par identité remarquable en 4e.
 *
 * ---------------------------------------------------------
 * ⚙️ CHOIX TECHNIQUES (30/09/2026)
 * ---------------------------------------------------------
 *
 * - ⛔ Plus de `contains_keyword` sur une réponse chiffrée : « 3x + 67 »
 *   passait pour 3x + 6. Développer → `expression_developpee` ; factoriser →
 *   `expression_factorisee` (lib/tutor/evaluation/expressionAlgebrique.ts).
 *   `contains_keyword` reste pour les explications rédigées (format "open").
 * - Des SQUELETTES variés (scripts/mesurer-squelettes-coach.ts) : à chaque
 *   tirage changent la lettre (x, a, t, n, y, b), la forme de l'expression
 *   (ordre des termes, signes, place du facteur, nombre de parenthèses), la
 *   consigne, et pour une partie des gabarits la situation (jardin, sport,
 *   cuisine, voyage, musique, sciences…). Les nombres restent petits.
 * - Écriture : texte brut, « - » pour moins, jamais « + -3 », « 1x » ni « 0x »
 *   (fonctions `mono` et `somme`).
 *
 * =========================================================
 */
import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pgcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/* =========================================================
   ÉCRIRE UNE EXPRESSION PROPREMENT
   ========================================================= */

const LETTRES = ["x", "a", "t", "n", "y", "b"] as const;
const LETTRES_SITUATION = ["x", "n", "a", "y"] as const;

/** Un terme : [coefficient, lettre ?, puissance ?]. */
type Terme = [number, string?, number?];

/** Un monôme écrit à la française : « x », « -x », « 3x² », « 5 ». */
function mono(c: number, l = "", p = 1): string {
  if (!l) return String(c);
  const lp = p === 2 ? `${l}²` : l;
  if (c === 1) return lp;
  if (c === -1) return `-${lp}`;
  return `${c}${lp}`;
}

/** Une somme de termes, sans « + - », sans « 0x », sans « 1x ». */
function somme(termes: Terme[]): string {
  const t = termes.filter(([c]) => c !== 0);
  if (!t.length) return "0";
  return t
    .map(([c, l, p], i) => {
      const m = mono(Math.abs(c), l ?? "", p ?? 1);
      if (i === 0) return c < 0 ? `-${m}` : m;
      return c < 0 ? ` - ${m}` : ` + ${m}`;
    })
    .join("");
}

/** Le produit de deux termes (une seule lettre dans l'expression). */
function produit([c1, l1, p1]: Terme, [c2, l2, p2]: Terme): Terme {
  const deg = (l1 ? p1 ?? 1 : 0) + (l2 ? p2 ?? 1 : 0);
  const l = l1 || l2;
  return deg === 0 ? [c1 * c2] : [c1 * c2, l, deg];
}

/** Regroupe les termes semblables : x², x, nombres. */
function reduireTermes(termes: Terme[], l: string): string {
  let c2 = 0;
  let c1 = 0;
  let c0 = 0;
  for (const [c, lt, p] of termes) {
    if (!lt) c0 += c;
    else if ((p ?? 1) === 2) c2 += c;
    else c1 += c;
  }
  return somme([[c2, l, 2], [c1, l], [c0]]);
}

/** L'intérieur d'une parenthèse à deux termes : (x + 3), (3 + x), (2x - 5), (5 - x). */
function interieur(l: string, b: number, o: { coef?: number; signe?: 1 | -1; inverse?: boolean } = {}): Terme[] {
  const a = o.coef ?? 1;
  const s = o.signe ?? 1;
  return o.inverse ? [[b], [s * a, l]] : [[a, l], [s * b]];
}

/** Un morceau d'expression : un terme seul, ou un facteur devant une parenthèse. */
type Bloc = { kind: "t"; terme: Terme } | { kind: "p"; m: number; ml?: string; t: Terme[] };

function ecrireBlocs(blocs: Bloc[]): string {
  return blocs
    .map((b, i) => {
      let neg: boolean;
      let corps: string;
      if (b.kind === "t") {
        neg = b.terme[0] < 0;
        corps = mono(Math.abs(b.terme[0]), b.terme[1] ?? "", b.terme[2] ?? 1);
      } else {
        neg = b.m < 0;
        const devant = b.ml ? mono(Math.abs(b.m), b.ml) : Math.abs(b.m) === 1 ? "" : String(Math.abs(b.m));
        corps = `${devant}(${somme(b.t)})`;
      }
      if (i === 0) return neg ? `-${corps}` : corps;
      return neg ? ` - ${corps}` : ` + ${corps}`;
    })
    .join("");
}

function developperBlocs(blocs: Bloc[]): Terme[] {
  const out: Terme[] = [];
  for (const b of blocs) {
    if (b.kind === "t") {
      out.push(b.terme);
      continue;
    }
    const facteur: Terme = b.ml ? [b.m, b.ml, 1] : [b.m];
    for (const u of b.t) out.push(produit(facteur, u));
  }
  return out;
}

function expli(methode: string, calcul: string, conclusion: string): string {
  return (
    "Définition : la distributivité transforme un produit en somme : k × (a + b) = k × a + k × b.\n\n" +
    `Méthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`
  );
}

/** Une question « développe (et réduis) » à partir de blocs. */
function questionBlocs(texte: string, e: string, blocs: Bloc[], l: string, methode: string): TutorGeneratedQuestionV4 {
  const dev = developperBlocs(blocs);
  const etape = somme(dev);
  const res = reduireTermes(dev, l);
  const calcul = etape === res ? `${e} = ${res}.` : `${e} = ${etape} = ${res}.`;
  return {
    text: texte,
    format: "short",
    expected: [res],
    comparator: "expression_developpee",
    explanation: expli(methode, calcul, `la forme développée et réduite est ${res}.`),
  };
}

/* =========================================================
   CONSIGNES (TOURNURES)
   ========================================================= */

const DEV: Array<(e: string) => string> = [
  (e) => `Développe : ${e}`,
  (e) => `Développe l’expression ${e}.`,
  (e) => `Écris ${e} sans parenthèses.`,
  (e) => `Donne la forme développée de ${e}.`,
  (e) => `Que devient l’expression ${e} une fois développée ?`,
  (e) => `Développe A = ${e}.`,
];

const DEV_RED: Array<(e: string) => string> = [
  (e) => `Développe puis réduis : ${e}`,
  (e) => `Développe et réduis l’expression ${e}.`,
  (e) => `Donne la forme développée et réduite de ${e}.`,
  (e) => `Réduis ${e} après l’avoir développée.`,
  (e) => `Simplifie ${e} : développe, puis regroupe les termes semblables.`,
  (e) => `Écris B = ${e} sans parenthèses et sous forme réduite.`,
];

const ELEVES: ReadonlyArray<readonly [string, "il" | "elle"]> = [
  ["Léo", "il"],
  ["Inès", "elle"],
  ["Malik", "il"],
  ["Chloé", "elle"],
  ["Yanis", "il"],
  ["Emma", "elle"],
  ["Hugo", "il"],
  ["Lina", "elle"],
  ["Noah", "il"],
  ["Jade", "elle"],
  ["Sacha", "il"],
  ["Maëlys", "elle"],
];

/* =========================================================
   GÉNÉRATEURS
   ========================================================= */

/** k(x ± b) avec k positif, trois écritures du produit. */
function genSimpleFormel(s: 1 | -1): TutorGeneratedQuestionV4 {
  const k = randomInt(2, 9);
  const b = randomInt(1, 9);
  const l = randomChoice(LETTRES);
  const t = interieur(l, b, { signe: s, inverse: Math.random() < 0.35 });
  const inner = somme(t);
  const e = randomChoice([`${k}(${inner})`, `${k} × (${inner})`, `(${inner}) × ${k}`, `${k}(${inner})`]);
  const produits = t
    .map(([c, lt]) => {
      const f = lt ? mono(c, lt) : String(c);
      return `${k} × ${c < 0 ? `(${f})` : f}`;
    })
    .join(" + ");
  const res = somme(t.map(([c, lt]) => [k * c, lt] as Terme));
  return {
    text: randomChoice(DEV)(e),
    format: "short",
    expected: [res],
    comparator: "expression_developpee",
    explanation: expli(
      `on multiplie ${k} par chacun des deux termes de la parenthèse.`,
      `${e} = ${produits} = ${res}.`,
      `la forme développée est ${res}.`,
    ),
  };
}

type Situation = (k: number, b: number, l: string) => readonly [string, string];

const SITU_NATURE: Situation[] = [
  (k, b, l) => [`Dans un jardin, on plante ${k} rangées contenant chacune ${l} + ${b} fleurs.`, "le nombre total de fleurs"],
  (k, b, l) => [`Un apiculteur possède ${k} ruches ; chacune contient ${l} cadres de miel et ${b} cadres vides.`, "le nombre total de cadres"],
  (k, b, l) => [`Dans une forêt, ${k} parcelles comptent chacune ${l} chênes et ${b} hêtres.`, "le nombre total d’arbres"],
  (k, b, l) => [`Un maraîcher remplit ${k} cagettes avec, dans chacune, ${l} tomates et ${b} poivrons.`, "le nombre total de légumes"],
  (k, b, l) => [`Dans un verger, ${k} allées comptent chacune ${l} pommiers et ${b} poiriers.`, "le nombre total d’arbres fruitiers"],
  (k, b, l) => [`Des bénévoles surveillent ${k} nichoirs ; dans chacun, on compte ${l} œufs et ${b} oisillons.`, "le nombre total d’œufs et d’oisillons"],
  (k, b, l) => [`Un aquariophile équipe ${k} bassins de ${l} poissons rouges et ${b} escargots d’eau chacun.`, "le nombre total d’animaux"],
];

const SITU_MAISON: Situation[] = [
  (k, b, l) => [`Sur un plan de maison, ${k} pièces ont chacune une longueur de ${l} + ${b} mètres.`, "la longueur totale de ces pièces"],
  (k, b, l) => [`Un bricoleur coupe ${k} planches mesurant chacune ${l} + ${b} centimètres.`, "la longueur totale de bois coupé"],
  (k, b, l) => [`Pour carreler une salle de bains, on pose ${k} rangées de ${l} carreaux blancs et ${b} carreaux bleus.`, "le nombre total de carreaux"],
  (k, b, l) => [`Une étagère a ${k} niveaux ; sur chacun, on range ${l} livres et ${b} boîtes.`, "le nombre total d’objets rangés"],
  (k, b, l) => [`Un électricien installe ${k} guirlandes de ${l} + ${b} ampoules chacune.`, "le nombre total d’ampoules"],
  (k, b, l) => [`Un peintre achète ${k} lots contenant chacun ${l} pinceaux et ${b} rouleaux.`, "le nombre total d’outils"],
  (k, b, l) => [`Une maison a ${k} fenêtres identiques ; chacune a ${l} vitres fixes et ${b} vitres qui s’ouvrent.`, "le nombre total de vitres"],
];

const SITU_ACHAT: Situation[] = [
  (k, b, l) => [`Un magasin vend ${k} lots contenant chacun ${l} stylos et ${b} gommes.`, "le nombre total d’objets"],
  (k, b, l) => [`Un club de basket commande ${k} sacs contenant chacun ${l} ballons et ${b} plots.`, "le nombre total d’articles"],
  (k, b, l) => [`Pour un voyage scolaire, ${k} cars transportent chacun ${l} élèves et ${b} accompagnateurs.`, "le nombre total de voyageurs"],
  (k, b, l) => [`Un cuisinier prépare ${k} plateaux avec, sur chacun, ${l} crêpes et ${b} gaufres.`, "le nombre total de pâtisseries"],
  (k, b, l) => [`Une chorale se répartit en ${k} rangs ; chaque rang compte ${l} chanteurs et ${b} musiciens.`, "le nombre total de participants"],
  (k, b, l) => [`Un laboratoire range ${k} portoirs de ${l} tubes à essai et ${b} pipettes chacun.`, "le nombre total d’instruments"],
  (k, b, l) => [`Une coureuse fait ${k} tours d’une boucle qui mesure ${l} + ${b} kilomètres.`, "la distance totale parcourue"],
  (k, b, l) => [`Un fan de musique achète ${k} coffrets contenant chacun ${l} vinyles et ${b} CD.`, "le nombre total de disques"],
];

const TOURNURES_SIMPLE: Array<(t: string, q: string, l: string, k: number, b: number) => string> = [
  (t, q, l) => `${t} Exprime ${q} en fonction de ${l}, sous forme développée.`,
  (t, q) => `${t} Écris ${q} sans parenthèses.`,
  (t, q) => `${t} Quelle expression développée donne ${q} ?`,
  (t, q, l, k, b) => `${t} Montre que ${q} vaut ${k}(${l} + ${b}), puis développe cette expression.`,
  (t, q) => `${t} Donne ${q} sous la forme d’une somme de deux termes.`,
];

function genSituationSimple(table: Situation[]): TutorGeneratedQuestionV4 {
  const k = randomInt(2, 6);
  const b = randomInt(2, 6); // ≥ 2 : « 1 gommes » serait faux
  const l = randomChoice(LETTRES_SITUATION);
  const [t, q] = randomChoice(table)(k, b, l);
  const res = `${k}${l} + ${k * b}`;
  return {
    text: randomChoice(TOURNURES_SIMPLE)(t, q, l, k, b),
    format: "short",
    expected: [res],
    comparator: "expression_developpee",
    explanation: expli(
      `il y a ${k} fois la même quantité ${l} + ${b} : on l’écrit ${k}(${l} + ${b}), puis on distribue ${k}.`,
      `${k}(${l} + ${b}) = ${k} × ${l} + ${k} × ${b} = ${res}.`,
      `${q} vaut ${res}.`,
    ),
  };
}

/** (a1·x ± b)(a2·x ± c) : les quatre produits, puis on réduit. */
function genDouble(o: { s1?: 1 | -1; s2?: 1 | -1; a1?: number; a2?: number; bMax?: number } = {}): TutorGeneratedQuestionV4 {
  const s1 = o.s1 ?? randomChoice([1, -1] as const);
  const s2 = o.s2 ?? randomChoice([1, -1] as const);
  const l = randomChoice(LETTRES);
  const b = randomInt(1, o.bMax ?? 9);
  const c = randomInt(1, o.bMax ?? 9);
  const t1 = interieur(l, b, { coef: o.a1 ?? 1, signe: s1, inverse: s1 === 1 && Math.random() < 0.3 });
  const t2 = interieur(l, c, { coef: o.a2 ?? 1, signe: s2, inverse: s2 === 1 && Math.random() < 0.3 });
  const p1 = somme(t1);
  const p2 = somme(t2);
  const e = Math.random() < 0.75 ? `(${p1})(${p2})` : `(${p1}) × (${p2})`;
  const dev: Terme[] = [];
  for (const u of t1) for (const v of t2) dev.push(produit(u, v));
  const res = reduireTermes(dev, l);
  return {
    text: randomChoice(DEV_RED)(e),
    format: "short",
    expected: [res],
    comparator: "expression_developpee",
    explanation: expli(
      "chaque terme de la première parenthèse multiplie chaque terme de la seconde : quatre produits, puis on regroupe les termes semblables.",
      `${e} = ${somme(dev)} = ${res}.`,
      `la forme développée et réduite est ${res}.`,
    ),
  };
}

type Objet = readonly [string, string];
/** [nom avec article, unité de longueur] */
const OBJETS_RECT: Objet[] = [
  ["un jardin rectangulaire", "mètres"],
  ["un cadre photo", "centimètres"],
  ["une piscine rectangulaire", "mètres"],
  ["un tapis rectangulaire", "décimètres"],
  ["un enclos rectangulaire pour des chèvres", "mètres"],
  ["une affiche", "centimètres"],
  ["un potager rectangulaire", "mètres"],
  ["un écran de téléphone", "millimètres"],
  ["un panneau solaire", "décimètres"],
  ["un terrain de pétanque", "mètres"],
  ["un champ de canne à sucre rectangulaire", "mètres"],
  ["une table rectangulaire", "centimètres"],
  ["une tablette de chocolat", "centimètres"],
  ["un parking rectangulaire", "mètres"],
];

const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const de = (gn: string) => (/^[aeiouyhéè]/i.test(gn) ? `d’${gn}` : `de ${gn}`);

/** Développer un produit de deux binômes posé par une aire de rectangle. */
function genAire(a1: number): TutorGeneratedQuestionV4 {
  const l = randomChoice(LETTRES_SITUATION);
  const b = randomInt(1, 9);
  const c = randomInt(1, 9);
  const t1 = interieur(l, b, { coef: a1 });
  const t2 = interieur(l, c);
  const p1 = somme(t1);
  const p2 = somme(t2);
  const [obj, u] = randomChoice(OBJETS_RECT);
  const tournure = randomChoice([
    `${maj(obj)} a pour longueur ${p1} et pour largeur ${p2} (en ${u}). Donne son aire sous forme développée et réduite.`,
    `Exprime l’aire ${de(obj)} de dimensions ${p1} sur ${p2} (en ${u}), sans parenthèses et sous forme réduite.`,
    `L’aire ${de(obj)} vaut (${p1})(${p2}). Développe et réduis cette expression.`,
    `On note A l’aire ${de(obj)} dont les côtés mesurent ${p1} et ${p2} (en ${u}). Écris A sous forme développée et réduite.`,
  ]);
  const dev: Terme[] = [];
  for (const x of t1) for (const y of t2) dev.push(produit(x, y));
  const res = reduireTermes(dev, l);
  return {
    text: tournure,
    format: "short",
    expected: [res],
    comparator: "expression_developpee",
    explanation: expli(
      "l’aire d’un rectangle est longueur × largeur ; on développe le produit des deux parenthèses (quatre produits), puis on réduit.",
      `(${p1})(${p2}) = ${somme(dev)} = ${res}.`,
      `l’aire est ${res}.`,
    ),
  };
}

/* ---------- RECONNAÎTRE ---------- */

function formeProduitSimple(l: string): string {
  const k = randomInt(2, 9);
  const b = randomInt(1, 9);
  return randomChoice([
    `${k}(${l} + ${b})`,
    `${k}(${l} - ${b})`,
    `${k}(${b} + ${l})`,
    `(${l} + ${b}) × ${k}`,
    `-${k}(${l} + ${b})`,
    `${l}(${l} + ${b})`,
    `${k}${l}(${l} - ${b})`,
  ]);
}

function formeProduitDouble(l: string): string {
  const k = randomInt(2, 5);
  const b = randomInt(1, 9);
  const c = randomInt(1, 9);
  return randomChoice([
    `(${l} + ${b})(${l} + ${c})`,
    `(${l} - ${b})(${l} + ${c})`,
    `(${k}${l} + ${b})(${l} - ${c})`,
    `(${b} + ${l})(${c} + ${l})`,
    `(${l} - ${b}) × (${k}${l} - ${c})`,
  ]);
}

function formeSomme(l: string): string {
  const k = randomInt(2, 9);
  const b = randomInt(1, 9);
  const c = randomInt(1, 9);
  return randomChoice([
    `${k}${l} + ${b}`,
    `${k}${l} - ${b}`,
    `${b} - ${k}${l}`,
    `${l}² + ${mono(b, l)} + ${c}`,
    `${l}² - ${c}`,
    `${k}${l}² - ${mono(b, l)}`,
    `${b} + ${l}`,
    `${k}${l} + ${k * b}`,
  ]);
}

/** n expressions distinctes produites par `f`, toutes différentes de `exclues`. */
function distinctes(n: number, f: () => string, exclues: string[] = []): string[] {
  const vus = new Set(exclues);
  const out: string[] = [];
  for (let essai = 0; out.length < n && essai < 200; essai++) {
    const e = f();
    if (!vus.has(e)) {
      vus.add(e);
      out.push(e);
    }
  }
  return out;
}

/* ---------- DÉFIS : une égalité proposée par un élève ---------- */

function genErreurEleve(negatif: boolean): TutorGeneratedQuestionV4 {
  const k = randomInt(2, 9);
  const b = randomInt(1, 9);
  const s = randomChoice([1, -1] as const);
  const l = randomChoice(LETTRES);
  const m = negatif ? -k : k;
  const inner = somme([[1, l], [s * b]]);
  const e = `${negatif ? "-" : ""}${k}(${inner})`;
  const juste = somme([[m, l], [m * s * b]]);
  const erreurs: Array<[string, string]> = negatif
    ? [
        [somme([[m, l], [-m * s * b]]), `le signe du second terme est faux : ${m} × ${s * b < 0 ? `(${s * b})` : s * b} = ${m * s * b}`],
        [somme([[m, l], [-s * b]]), `${b} n’a pas été multiplié par ${k}`],
        [somme([[m, l], [s * b]]), `${s * b < 0 ? `-${b}` : b} n’a été multiplié ni par ${k} ni par le signe moins`],
      ]
    : [
        [somme([[m, l], [s * b]]), `${b} n’a pas été multiplié par ${k}`],
        [somme([[1, l], [m * s * b]]), `${l} n’a pas été multiplié par ${k}`],
        [somme([[m, l], [-m * s * b]]), "le signe du second terme a changé alors que le facteur est positif"],
      ];
  const correct = Math.random() < 0.4;
  const [propose, defaut] = correct ? [juste, ""] : randomChoice(erreurs);
  const [nom, pr] = randomChoice(ELEVES);
  const vraiFaux = Math.random() < 0.25;
  const text = vraiFaux
    ? `Vrai ou faux : ${e} = ${propose} ?`
    : randomChoice([
        `${nom} affirme que ${e} = ${propose}. A-t-${pr} raison ?`,
        `${nom} a développé ${e} et a trouvé ${propose}. Son résultat est-il juste ?`,
        `Dans sa copie, ${nom} écrit : ${e} = ${propose}. Ce développement est-il correct ?`,
        `Pour développer ${e}, ${nom} écrit ${propose}. Est-ce exact ?`,
      ]);
  const choices = vraiFaux ? ["vrai", "faux"] : ["oui", "non"];
  return {
    text,
    format: "qcm",
    choices,
    expected: [correct ? choices[0] : choices[1]],
    comparator: "mcq_exact",
    explanation: expli(
      `on multiplie ${m} par ${l} ET par ${s * b < 0 ? `(${s * b})` : s * b}.`,
      `${e} = ${juste}.`,
      correct ? `${propose} est bien le développement de ${e}.` : `${propose} est faux : ${defaut}. Le bon résultat est ${juste}.`,
    ),
  };
}

/* =========================================================
   FACTORISATION (facteur commun seulement)
   ========================================================= */

const FACTO: Array<(e: string) => string> = [
  (e) => `Factorise : ${e}`,
  (e) => `Factorise l’expression ${e}.`,
  (e) => `Écris ${e} sous la forme d’un produit.`,
  (e) => `Mets le facteur commun en évidence dans ${e}.`,
  (e) => `Transforme ${e} en un produit.`,
  (e) => `Factorise D = ${e}.`,
];

/** k·m·x ± k·b (pgcd(m, b) = 1) → k(mx ± b), lettre en tête ou en second. */
function genFactoNombre(s: 1 | -1, o: { mMax?: number; kMax?: number } = {}) {
  const k = randomInt(2, o.kMax ?? 9);
  let m = randomInt(1, o.mMax ?? 1);
  let b = randomInt(2, 9);
  while (pgcd(m, b) !== 1) {
    m = randomInt(1, o.mMax ?? 1);
    b = randomInt(2, 9);
  }
  const l = randomChoice(LETTRES);
  const inverse = Math.random() < 0.3;
  const t = interieur(l, b, { coef: m, signe: s, inverse });
  const e = somme(t.map(([c, lt]) => [k * c, lt] as Terme));
  const res = `${k}(${somme(t)})`;
  const decomp = t
    .map(([c, lt]) => `${mono(Math.abs(k * c), lt ?? "")} = ${k} × ${mono(Math.abs(c), lt ?? "")}`)
    .join(" et ");
  return { k, m, b, l, e, res, decomp, t };
}

function questionFacto(texte: string, e: string, res: string, k: number | string, decomp: string): TutorGeneratedQuestionV4 {
  return {
    text: texte,
    format: "short",
    expected: [res],
    comparator: "expression_factorisee",
    explanation:
      "Définition : factoriser, c’est écrire une somme (ou une différence) sous la forme d’un produit.\n\n" +
      `Méthode : on repère le facteur commun ${k} : ${decomp}.\n\n` +
      `Calcul : ${e} = ${res}.\n\n` +
      `Conclusion : on vérifie en développant : ${res} = ${e}.`,
  };
}

type SituFacto = (k: number, l: string, b: number) => readonly [string, string];
const SITU_FACTO_ACHAT: SituFacto[] = [
  (k, l, b) => [`${k} amis achètent chacun une place de cinéma à ${l} € et un pop-corn à ${b} €.`, "la somme dépensée"],
  (k, l, b) => [`Un club de football achète ${k} tenues, chacune composée d’un maillot à ${l} € et d’un short à ${b} €.`, "le prix total"],
  (k, l, b) => [`Une famille en vacances loue des kayaks pendant ${k} jours ; chaque jour, elle paie ${l} € de location et ${b} € de gilets de sauvetage.`, "la dépense totale"],
  (k, l, b) => [`Pour un atelier de cuisine, on achète ${k} kits contenant chacun un tablier à ${l} € et une spatule à ${b} €.`, "la dépense totale"],
];

/* =========================================================
   LA BANQUE
   ========================================================= */

export const distributiviteBank: TutorBankItemV4[] = [
  // =========================
  // DISTRIB_SIMPLE
  // =========================
  {
    kind: "fixed",
    id: "litteral_distributivite_simple_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle égalité est correcte ?",
    format: "qcm",
    choices: ["3(x + 4) = 3x + 4", "3(x + 4) = 3x + 12", "3(x + 4) = x + 12", "3(x + 4) = 7x"],
    expected: ["3(x + 4) = 3x + 12"],
    comparator: "mcq_exact",
    hint: "Le 3 multiplie x et 4.",
    explanation:
      "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
      "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
      "3(x + 4) = 3×x + 3×4 = 3x + 12." +
      "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "simple", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_formel_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 1,
    theme: "neutral",
    hint: "Le nombre devant la parenthèse multiplie chaque terme.",
    tags: ["litteral_distributivite", "simple", "formel", "template"],
    generate: () => genSimpleFormel(1),
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_formel_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 1,
    theme: "neutral",
    hint: "Distribue le coefficient à chaque terme de la parenthèse, en gardant le signe.",
    tags: ["litteral_distributivite", "simple", "soustraction", "template"],
    generate: () => genSimpleFormel(-1),
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_signe_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Un signe négatif devant la parenthèse se distribue aussi.",
    tags: ["litteral_distributivite", "simple", "signe", "template"],
    generate: () => {
      const k = randomInt(1, 9);
      const b = randomInt(1, 9);
      const l = randomChoice(LETTRES);
      const t = interieur(l, b, { signe: randomChoice([1, -1] as const), inverse: Math.random() < 0.3 });
      const blocs: Bloc[] = [{ kind: "p", m: -k, t }];
      const e = Math.random() < 0.75 || k === 1 ? ecrireBlocs(blocs) : `(${somme(t)}) × (-${k})`;
      const texte = Math.random() < 0.3 ? `${randomChoice(DEV)(e)} Attention au signe.` : randomChoice(DEV)(e);
      return questionBlocs(texte, e, blocs, l, `${k === 1 ? "le signe « - » devant la parenthèse revient à multiplier par -1" : `on multiplie -${k} par chaque terme`} : chaque terme de la parenthèse change de signe.`);
    },
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_simple_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 4(x + 3) donne 4x + 12.",
    format: "open",
    expected: ["4", "multiplie", "x", "3"],
    comparator: "contains_keyword",
    hint: "Le nombre devant la parenthèse multiplie chaque terme.",
    explanation:
      "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
      "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
      "4 multiplie les deux termes de la parenthèse : 4×x et 4×3. Donc 4(x + 3) = 4x + 12." +
      "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "simple", "open"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_nature_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nombre de groupes multiplie ce qu’il y a dans chaque groupe.",
    tags: ["litteral_distributivite", "nature", "template"],
    generate: () => genSituationSimple(SITU_NATURE),
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_maison_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "La même quantité est répétée plusieurs fois.",
    tags: ["litteral_distributivite", "maison", "template"],
    generate: () => genSituationSimple(SITU_MAISON),
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_achat_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Il y a plusieurs lots identiques.",
    tags: ["litteral_distributivite", "achat", "template"],
    generate: () => genSituationSimple(SITU_ACHAT),
  },

  // =========================
  // DISTRIB_DOUBLE
  // =========================
  {
    kind: "fixed",
    id: "litteral_distributivite_double_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 3,
    theme: "neutral",
    text: "Dans (x + 2)(x + 5), combien de produits doit-on effectuer avant de réduire ?",
    format: "qcm",
    choices: ["2", "3", "4", "5"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Chaque terme de la première parenthèse multiplie chaque terme de la seconde.",
    explanation:
      "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
      "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
      "On effectue 4 produits : x×x, x×5, 2×x et 2×5." +
      "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "double", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_double_tpl_formel_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque terme de la première parenthèse multiplie chaque terme de la seconde.",
    tags: ["litteral_distributivite", "double", "template"],
    generate: () => genDouble({ s1: 1, s2: 1 }),
  },
  {
    kind: "template",
    id: "litteral_distributivite_double_tpl_formel_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 3,
    theme: "neutral",
    hint: "Fais les quatre produits.",
    tags: ["litteral_distributivite", "double", "template"],
    generate: () => genDouble({ s1: -1, s2: 1 }),
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_double_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi (x + 2)(x + 3) donne x² + 5x + 6.",
    format: "open",
    expected: ["x²", "2x", "3x", "6"],
    comparator: "contains_keyword",
    hint: "Écris les quatre produits.",
    explanation:
      "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
      "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
      "(x + 2)(x + 3) = x×x + x×3 + 2×x + 2×3 = x² + 3x + 2x + 6 = x² + 5x + 6." +
      "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "double", "open"],
  },

  // =========================
  // DISTRIB_REDUIRE
  // =========================
  {
    kind: "fixed",
    id: "litteral_litteral_distributivite_reduire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme réduite de 2x + 5 + 3x ?",
    format: "qcm",
    choices: ["5x + 5", "5x", "6x + 5", "2x + 8"],
    expected: ["5x + 5"],
    comparator: "mcq_exact",
    hint: "Regroupe les termes en x.",
    explanation:
      "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
      "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
      "2x + 3x = 5x, donc 2x + 5 + 3x = 5x + 5." +
      "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "reduire", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_litteral_distributivite_reduire_tpl_formel_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Développe d’abord puis regroupe les termes semblables.",
    tags: ["litteral_distributivite", "reduire", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      const b = randomInt(1, 9);
      const l = randomChoice(LETTRES);
      const t = interieur(l, b, { signe: randomChoice([1, -1] as const), inverse: Math.random() < 0.3 });
      let c = randomInt(1, 9) * randomChoice([1, -1]);
      if (c === -k) c = -k - 1;
      const extra: Terme = Math.random() < 0.7 ? [c, l] : [c];
      const p: Bloc = { kind: "p", m: k, t };
      const blocs: Bloc[] = Math.random() < 0.5 ? [p, { kind: "t", terme: extra }] : [{ kind: "t", terme: extra }, p];
      const e = ecrireBlocs(blocs);
      return questionBlocs(randomChoice(DEV_RED)(e), e, blocs, l, `on multiplie ${k} par chaque terme de la parenthèse, puis on regroupe les termes en ${l} et les nombres.`);
    },
  },
  {
    kind: "template",
    id: "litteral_litteral_distributivite_reduire_tpl_formel_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe puis réduis les termes en x et les constantes.",
    tags: ["litteral_distributivite", "reduire", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      const b = randomInt(1, 9);
      const l = randomChoice(LETTRES);
      const t = interieur(l, b, { signe: randomChoice([1, -1] as const), inverse: Math.random() < 0.3 });
      const c = randomInt(1, 9) * randomChoice([1, -1]);
      const d = randomInt(1, 9) * randomChoice([1, -1]);
      const autres: Bloc[] = [
        { kind: "t", terme: [c, l] },
        { kind: "t", terme: [d] },
      ];
      const blocs = shuffle<Bloc>([{ kind: "p", m: k, t }, ...autres]);
      const e = ecrireBlocs(blocs);
      return questionBlocs(randomChoice(DEV_RED)(e), e, blocs, l, `on développe ${k}(${somme(t)}), puis on regroupe les termes en ${l} d’un côté et les nombres de l’autre.`);
    },
  },
  {
    kind: "fixed",
    id: "litteral_litteral_distributivite_reduire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment réduire 2x + 7 + 3x.",
    format: "open",
    expected: ["2x", "3x", "5x", "7"],
    comparator: "contains_keyword",
    hint: "Regroupe seulement les termes semblables.",
    explanation:
      "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
      "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
      "On regroupe les termes en x : 2x + 3x = 5x. Le 7 reste une constante. Donc 2x + 7 + 3x = 5x + 7." +
      "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "reduire", "open"],
  },
  {
    kind: "template",
    id: "litteral_litteral_distributivite_reduire_tpl_batiment_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule la quantité répétée puis ajoute le reste.",
    tags: ["litteral_distributivite", "batiment", "template"],
    generate: () => {
      const k = randomInt(2, 6);
      const b = randomInt(1, 6);
      const c = randomInt(2, 9);
      const l = randomChoice(LETTRES_SITUATION);
      const [t, q] = randomChoice([
        [`Un couloir comporte ${k} sections identiques de ${l} + ${b} mètres, puis un palier de ${c} mètres.`, "la longueur totale du couloir"],
        [`Une clôture est faite de ${k} panneaux de ${l} + ${b} décimètres et d’un portail de ${c} décimètres.`, "la longueur totale de la clôture"],
        [`Un train compte ${k} wagons de ${l} + ${b} places, plus une voiture-bar de ${c} places.`, "le nombre total de places"],
        [`Une bibliothèque a ${k} étagères de ${l} + ${b} livres, plus ${c} livres posés sur le bureau.`, "le nombre total de livres"],
        [`Une frise est formée de ${k} motifs de ${l} + ${b} centimètres et d’une bordure de ${c} centimètres.`, "la longueur de la frise"],
        [`Une randonneuse fait ${k} étapes de ${l} + ${b} kilomètres, puis ${c} kilomètres pour rejoindre le refuge.`, "la distance totale"],
        [`Un nageur enchaîne ${k} séries de ${l} + ${b} longueurs, puis ${c} longueurs de récupération.`, "le nombre total de longueurs"],
        [`Pour une kermesse, on cuit ${k} fournées de ${l} + ${b} cookies ; on en avait déjà ${c} d’avance.`, "le nombre total de cookies"],
        [`Un musicien répète ${k} morceaux de ${l} + ${b} minutes, après ${c} minutes d’échauffement.`, "la durée totale de la répétition"],
        [`Un fermier remplit ${k} enclos de ${l} + ${b} moutons et garde ${c} moutons dans la bergerie.`, "le nombre total de moutons"],
      ] as const);
      const texte = randomChoice([
        `${t} Exprime ${q} en fonction de ${l}, sous forme développée et réduite.`,
        `${t} Écris ${q} sans parenthèses et sous forme réduite.`,
        `${t} Quelle expression réduite donne ${q} ?`,
        `${t} Montre que ${q} vaut ${k}(${l} + ${b}) + ${c}, puis réduis cette expression.`,
      ]);
      const blocs: Bloc[] = [
        { kind: "p", m: k, t: [[1, l], [b]] },
        { kind: "t", terme: [c] },
      ];
      return questionBlocs(texte, `${k}(${l} + ${b}) + ${c}`, blocs, l, `${q} s’écrit ${k}(${l} + ${b}) + ${c} ; on développe puis on regroupe les nombres.`);
    },
  },

  // =========================
  // DISTRIB_REDUIRE (exercices supplémentaires progressifs)
  // =========================
  {
    kind: "template",
    id: "litteral_distributivite_reduire_tpl_deux_parentheses_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Développe chaque parenthèse, puis regroupe les termes en x et les constantes.",
    tags: ["litteral_distributivite", "reduire", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const k = randomInt(2, 7);
      const m = randomInt(2, 7);
      const t1 = interieur(l, randomInt(1, 9), { signe: randomChoice([1, -1] as const), inverse: Math.random() < 0.25 });
      const t2 = interieur(l, randomInt(1, 9), { signe: randomChoice([1, -1] as const), inverse: Math.random() < 0.25 });
      const blocs: Bloc[] = [
        { kind: "p", m: k, t: t1 },
        { kind: "p", m, t: t2 },
      ];
      const e = ecrireBlocs(blocs);
      return questionBlocs(randomChoice(DEV_RED)(e), e, blocs, l, "on développe chaque parenthèse, puis on regroupe les termes semblables.");
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_reduire_tpl_soustraction_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention au signe moins devant la deuxième parenthèse : il se distribue à chaque terme.",
    tags: ["litteral_distributivite", "reduire", "soustraction", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const k = randomInt(2, 7);
      const m = randomInt(1, 7);
      const t1 = interieur(l, randomInt(1, 9), { signe: randomChoice([1, -1] as const), inverse: Math.random() < 0.25 });
      const t2 = interieur(l, randomInt(1, 9), { signe: randomChoice([1, -1] as const), inverse: Math.random() < 0.25 });
      const blocs: Bloc[] = [
        { kind: "p", m: k, t: t1 },
        { kind: "p", m: -m, t: t2 },
      ];
      const e = ecrireBlocs(blocs);
      return questionBlocs(randomChoice(DEV_RED)(e), e, blocs, l, `le signe moins devant ${m === 1 ? "" : m}(${somme(t2)}) change le signe de chaque terme de cette parenthèse ; on regroupe ensuite.`);
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_reduire_tpl_negatif_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient négatif multiplie chaque terme de la parenthèse.",
    tags: ["litteral_distributivite", "reduire", "negatif", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const k = randomInt(2, 9);
      const t = interieur(l, randomInt(1, 9), { signe: randomChoice([1, -1] as const), inverse: Math.random() < 0.3 });
      const c = randomInt(1, 9) * randomChoice([1, -1]);
      const autres: Bloc[] = [{ kind: "t", terme: [c, l] }];
      if (Math.random() < 0.4) autres.push({ kind: "t", terme: [randomInt(1, 9) * randomChoice([1, -1])] });
      const blocs = Math.random() < 0.5 ? [{ kind: "p", m: -k, t } as Bloc, ...autres] : [...autres, { kind: "p", m: -k, t } as Bloc];
      const e = ecrireBlocs(blocs);
      return questionBlocs(randomChoice(DEV_RED)(e), e, blocs, l, `-${k} multiplie chaque terme de la parenthèse (les signes changent), puis on regroupe.`);
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_reduire_tpl_trois_termes_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe les deux parenthèses séparément, puis regroupe tout.",
    tags: ["litteral_distributivite", "reduire", "complexe", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const t1 = interieur(l, randomInt(1, 9), { coef: randomInt(1, 3), signe: randomChoice([1, -1] as const) });
      const t2 = interieur(l, randomInt(1, 9), { signe: randomChoice([1, -1] as const), inverse: Math.random() < 0.3 });
      const p1: Bloc = { kind: "p", m: randomInt(2, 6), t: t1 };
      const p2: Bloc = { kind: "p", m: randomInt(2, 6) * randomChoice([1, -1]), t: t2 };
      const seul: Bloc = { kind: "t", terme: Math.random() < 0.5 ? [randomInt(1, 9) * randomChoice([1, -1])] : [randomInt(1, 9) * randomChoice([1, -1]), l] };
      const blocs = randomChoice([[p1, p2, seul], [p1, seul, p2], [seul, p1, p2]]);
      const e = ecrireBlocs(blocs);
      return questionBlocs(randomChoice(DEV_RED)(e), e, blocs, l, "on développe chaque parenthèse (attention aux signes), puis on regroupe les termes en " + l + " et les nombres.");
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_reduire_tpl_mixte_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reduire",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe, puis regroupe les x², les x et les nombres séparément.",
    tags: ["litteral_distributivite", "reduire", "mixte", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const pl: Bloc = {
        kind: "p",
        m: randomChoice([1, 1, 2, 3, -1, -2]),
        ml: l,
        t: interieur(l, randomInt(1, 9), { signe: randomChoice([1, -1] as const) }),
      };
      const pn: Bloc = {
        kind: "p",
        m: randomInt(2, 7) * randomChoice([1, -1]),
        t: interieur(l, randomInt(1, 9), { signe: randomChoice([1, -1] as const), inverse: Math.random() < 0.3 }),
      };
      const carre: Bloc = { kind: "t", terme: [randomInt(1, 5) * randomChoice([1, -1]), l, 2] };
      const blocs = randomChoice([[pl, pn], [pn, pl], [carre, pl], [pl, pn, { kind: "t", terme: [randomInt(1, 9)] } as Bloc]]);
      const e = ecrireBlocs(blocs);
      return questionBlocs(randomChoice(DEV_RED)(e), e, blocs, l, `${l} × ${l} = ${l}² ; on développe chaque produit, puis on regroupe les ${l}², les ${l} et les nombres.`);
    },
  },

  // =========================
  // DISTRIB_FACTORISATION (facteur commun — notion litteral_factorisation)
  // =========================
  {
    kind: "fixed",
    id: "litteral_distributivite_facto_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme factorisée de 4x + 12 ?",
    format: "qcm",
    choices: ["4(x + 3)", "4(x + 12)", "2(2x + 12)", "4x(1 + 3)"],
    expected: ["4(x + 3)"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand facteur commun à 4x et 12.",
    explanation:
      "Définition : factoriser, c'est écrire une somme sous la forme d'un produit.\n\n" +
      "Méthode : on repère le facteur commun (ici 4), puis on le met en facteur.\n\nCalcul : " +
      "4x + 12 = 4 × x + 4 × 3 = 4(x + 3)." +
      "\n\nConclusion : vérifier en développant 4(x + 3) = 4x + 12.",
    tags: ["litteral_distributivite", "factorisation", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_facto_tpl_simple_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le facteur commun aux deux termes.",
    tags: ["litteral_distributivite", "factorisation", "template"],
    generate: () => {
      if (Math.random() < 0.35) {
        const k = randomInt(2, 6);
        const l = randomChoice(LETTRES_SITUATION);
        const b = randomInt(2, 9);
        const [t, q] = randomChoice(SITU_FACTO_ACHAT)(k, l, b);
        const e = `${k}${l} + ${k * b}`;
        const texte = randomChoice([
          `${t} On trouve que ${q} vaut ${e} euros. Écris ce montant sous forme factorisée.`,
          `${t} ${maj(q)} s’écrit ${e}. Factorise cette expression.`,
          `${t} Écris ${q}, qui vaut ${e}, comme un produit.`,
        ]);
        return questionFacto(texte, e, `${k}(${l} + ${b})`, k, `${k}${l} = ${k} × ${l} et ${k * b} = ${k} × ${b}`);
      }
      const f = genFactoNombre(1);
      return questionFacto(randomChoice(FACTO)(f.e), f.e, f.res, f.k, f.decomp);
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_facto_tpl_simple_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Identifie le facteur commun, puis divise chaque terme par lui.",
    tags: ["litteral_distributivite", "factorisation", "soustraction", "template"],
    generate: () => {
      const f = genFactoNombre(-1);
      return questionFacto(randomChoice(FACTO)(f.e), f.e, f.res, f.k, f.decomp);
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_facto_tpl_coeff_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_facteur_commun",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le plus grand nombre qui divise les deux coefficients.",
    tags: ["litteral_distributivite", "factorisation", "coeff", "template"],
    generate: () => {
      const f = genFactoNombre(randomChoice([1, -1] as const), { mMax: 5, kMax: 8 });
      const consigne = randomChoice([
        (e: string) => `Factorise le plus possible : ${e}`,
        (e: string) => `Mets en facteur le plus grand facteur commun de ${e}.`,
        (e: string) => `Écris ${e} comme un produit, avec le plus grand facteur commun devant la parenthèse.`,
        (e: string) => `Factorise au maximum l’expression ${e}.`,
        ...FACTO,
      ]);
      return questionFacto(consigne(f.e), f.e, f.res, f.k, f.decomp);
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_facto_tpl_verif_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_factorisation",
    microId: "litteral_factoriser_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Factorise puis vérifie en développant.",
    tags: ["litteral_distributivite", "factorisation", "verification", "template"],
    generate: () => {
      const f = genFactoNombre(randomChoice([1, -1] as const), { mMax: 3 });
      const texte = randomChoice([
        `Factorise ${f.e}, puis vérifie en développant.`,
        `Écris ${f.e} sous forme d’un produit, et contrôle ta réponse en la développant.`,
        `Factorise ${f.e}. Vérifie ensuite que le développement de ton produit redonne bien ${f.e}.`,
        `Trouve un produit égal à ${f.e} ; développe-le pour t’assurer qu’il est juste.`,
      ]);
      return questionFacto(texte, f.e, f.res, f.k, f.decomp);
    },
  },

  // =========================
  // DISTRIB_DOUBLE (exercices supplémentaires progressifs)
  // =========================
  {
    kind: "template",
    id: "litteral_distributivite_double_tpl_formel_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 3,
    theme: "neutral",
    hint: "Fais les quatre produits, attention aux signes.",
    tags: ["litteral_distributivite", "double", "template"],
    generate: () => genDouble({ s1: -1, s2: -1 }),
  },
  {
    kind: "template",
    id: "litteral_distributivite_double_tpl_formel_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe puis regroupe les termes semblables.",
    tags: ["litteral_distributivite", "double", "template"],
    generate: () => genDouble({ s1: 1, s2: -1 }),
  },
  {
    kind: "template",
    id: "litteral_distributivite_double_tpl_coeff_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 4,
    theme: "neutral",
    hint: "Le premier terme n'est pas x mais un multiple de x.",
    tags: ["litteral_distributivite", "double", "coeff", "template"],
    generate: () => (Math.random() < 0.3 ? genAire(randomInt(2, 3)) : genDouble({ a1: randomInt(2, 4) })),
  },
  {
    kind: "template",
    id: "litteral_distributivite_double_tpl_purecoeff_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe puis regroupe le terme en x² et les termes en x.",
    tags: ["litteral_distributivite", "double", "template"],
    generate: () => genDouble({ a1: randomInt(1, 3), a2: randomInt(2, 3), bMax: 7 }),
  },
  {
    // ⭐ 30/09/2026 : ancien item figé « (x + 3)² », devenu gabarit. Programme de
    // 4e : le carré se développe comme un produit (x + 3)(x + 3), SANS la
    // formule a² + 2ab + b² (3e).
    kind: "template",
    id: "litteral_distributivite_double_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 5,
    theme: "neutral",
    hint: "Un carré, c’est un produit d’une parenthèse par elle-même : applique la double distributivité.",
    tags: ["litteral_distributivite", "double", "carre", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const a = randomChoice([1, 1, 2, 3]);
      const t = interieur(l, randomInt(1, 9), { coef: a, signe: randomChoice([1, -1] as const), inverse: Math.random() < 0.2 });
      const p = somme(t);
      const texte = randomChoice([
        `Développe et réduis : (${p})² (rappel : (${p})² = (${p})(${p}))`,
        `Développe et réduis (${p})² en l’écrivant comme le produit (${p})(${p}).`,
        `Écris le carré (${p})² sans parenthèses et sous forme réduite.`,
        `Un carré a pour côté ${p}. Développe et réduis son aire (${p})².`,
        `Donne la forme développée et réduite de (${p})².`,
      ]);
      const dev: Terme[] = [];
      for (const u of t) for (const v of t) dev.push(produit(u, v));
      const res = reduireTermes(dev, l);
      return {
        text: texte,
        format: "short",
        expected: [res],
        comparator: "expression_developpee",
        explanation: expli(
          `(${p})² = (${p})(${p}) : chaque terme de la première parenthèse multiplie chaque terme de la seconde, puis on regroupe.`,
          `(${p})(${p}) = ${somme(dev)} = ${res}.`,
          `(${p})² = ${res}.`,
        ),
      };
    },
  },

  // =========================
  // DISTRIB_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "litteral_litteral_distributivite_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle expression contient une distributivité à effectuer ?",
    format: "qcm",
    choices: ["5x + 3", "2(x + 7)", "x + 4", "3x - 1"],
    expected: ["2(x + 7)"],
    comparator: "mcq_exact",
    hint: "Cherche un produit avec une parenthèse.",
    explanation:
      "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
      "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
      "2(x + 7) contient un nombre qui multiplie une parenthèse : il faut distribuer." +
      "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "reconnaitre", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_litteral_distributivite_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche l’écriture avec une parenthèse précédée (ou suivie) d’un facteur.",
    tags: ["litteral_distributivite", "reconnaitre", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const correct = formeProduitSimple(l);
      const autres = distinctes(3, () => formeSomme(l), [correct]);
      const choices = shuffle([correct, ...autres]);
      const liste = choices.join(" ; ");
      const text = randomChoice([
        `Voici quatre expressions : ${liste}. Laquelle faut-il développer ?`,
        `Parmi ${liste}, quelle expression contient un produit à développer ?`,
        `Une seule de ces expressions contient une parenthèse à distribuer : ${liste}. Laquelle ?`,
        `Laquelle de ces expressions n’est pas encore développée : ${liste} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: expli(
          "on cherche un facteur qui multiplie une parenthèse.",
          `${correct} est un produit avec une parenthèse ; ${autres.join(", ")} sont des sommes déjà développées.`,
          `c’est ${correct} qu’il faut développer.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "litteral_litteral_distributivite_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une expression développée ne contient plus de parenthèses à distribuer.",
    tags: ["litteral_distributivite", "reconnaitre", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const correct = formeSomme(l);
      const autres = distinctes(3, () => (Math.random() < 0.6 ? formeProduitSimple(l) : formeProduitDouble(l)), [correct]);
      const choices = shuffle([correct, ...autres]);
      const liste = choices.join(" ; ");
      const text = randomChoice([
        `Laquelle de ces expressions est déjà développée : ${liste} ?`,
        `Parmi ${liste}, une seule n’a plus rien à développer. Laquelle ?`,
        `Voici quatre expressions : ${liste}. Laquelle est écrite sous forme développée ?`,
        `Quelle expression est une somme, sans parenthèse à distribuer : ${liste} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: expli(
          "une forme développée n’a plus de parenthèse à distribuer.",
          `${correct} n’a plus de parenthèse ; ${autres.join(", ")} contiennent encore un produit à développer.`,
          `${correct} est déjà développée.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_litteral_distributivite_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi 3(x + 2) n’est pas encore une expression développée.",
    format: "open",
    expected: ["parenthèse", "développer", "3"],
    comparator: "contains_keyword",
    hint: "Regarde s’il reste une parenthèse avec un coefficient devant.",
    explanation:
      "Définition : la distributivité permet de transformer un produit en somme, par exemple a × (b + c) = a × b + a × c.\n\n" +
      "Méthode : on distribue le facteur devant la parenthèse à chaque terme, puis on réduit si nécessaire.\n\nCalcul : " +
      "3(x + 2) contient encore une parenthèse précédée d’un coefficient. Il faut développer : 3(x + 2) = 3x + 6." +
      "\n\nConclusion : l’expression obtenue est développée ou réduite correctement.",
    tags: ["litteral_distributivite", "reconnaitre", "open"],
  },

  // =========================
  // DISTRIB_DEFIS
  // =========================
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_justification_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique que le coefficient multiplie tous les termes de la parenthèse.",
    tags: ["litteral_distributivite", "defi", "justification", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      const b = randomInt(1, 9);
      const l = randomChoice(LETTRES);
      const m = Math.random() < 0.3 ? -k : k;
      const t = interieur(l, b, { signe: randomChoice([1, -1] as const) });
      const e = `${m}(${somme(t)})`;
      const res = somme(t.map(([c, lt]) => [m * c, lt] as Terme));
      const [nom] = randomChoice(ELEVES);
      const text = randomChoice([
        `Explique pourquoi ${e} donne ${res}.`,
        `Justifie, en une ou deux phrases, l’égalité ${e} = ${res}.`,
        `${nom} ne comprend pas pourquoi ${e} = ${res}. Explique-lui.`,
        `Comment passe-t-on de ${e} à ${res} ? Explique.`,
      ]);
      return {
        text,
        format: "open",
        expected: ["multipli", "chaque", "distribu", "les deux termes"],
        comparator: "contains_keyword",
        explanation: expli(
          `le facteur ${m} multiplie chacun des deux termes de la parenthèse.`,
          `${e} = ${m < 0 ? `(${m})` : m} × ${l} + ${m < 0 ? `(${m})` : m} × ${t[1][0] < 0 ? `(${t[1][0]})` : t[1][0]} = ${res}.`,
          `on a distribué ${m} à ${l} et à ${Math.abs(t[1][0])} (avec son signe).`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe toi-même, puis compare.",
    tags: ["litteral_distributivite", "defi", "erreur", "template"],
    generate: () => genErreurEleve(false),
  },
  {
    kind: "template",
    id: "litteral_distributivite_defi_open_erreur_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche quel produit a été oublié ou quel signe est faux.",
    tags: ["litteral_distributivite", "defi", "erreur", "open", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const k = randomInt(2, 9);
      const b = randomInt(1, 9);
      const c = randomInt(1, 9);
      const [nom, pr] = randomChoice(ELEVES);
      const cas = randomInt(0, 2);
      let e: string;
      let faux: string;
      let juste: string;
      let pourquoi: string;
      if (cas === 0) {
        e = `${k}(${l} + ${b})`;
        faux = `${k}${l} + ${b}`;
        juste = `${k}${l} + ${k * b}`;
        pourquoi = `${b} n’a pas été multiplié par ${k}`;
      } else if (cas === 1) {
        e = `-${k}(${l} - ${b})`;
        faux = `-${k}${l} - ${k * b}`;
        juste = `-${k}${l} + ${k * b}`;
        pourquoi = `-${k} × (-${b}) = +${k * b} : le signe du second terme est faux`;
      } else {
        e = `(${l} + ${b})(${l} + ${c})`;
        faux = `${l}² + ${b * c}`;
        juste = somme([[1, l, 2], [b + c, l], [b * c]]);
        pourquoi = `il manque les deux produits ${l} × ${c} et ${b} × ${l} : il faut faire quatre produits`;
      }
      const text = randomChoice([
        `Explique l’erreur dans l’égalité : ${e} = ${faux}.`,
        `${nom} écrit ${e} = ${faux}. Quelle erreur a-t-${pr} faite ? Corrige-la.`,
        `Le calcul ${e} = ${faux} est faux. Explique pourquoi et donne le bon résultat.`,
        `Trouve et explique l’erreur : ${e} = ${faux}.`,
      ]);
      return {
        text,
        format: "open",
        expected: ["erreur", "multipli", "signe", "produit", "oubli"],
        comparator: "contains_keyword",
        explanation: expli("on refait le développement terme par terme et on compare.", `${e} = ${juste}.`, `l’erreur : ${pourquoi}. Le bon résultat est ${juste}.`),
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_maison_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris chaque groupe comme un produit, développe, puis additionne.",
    tags: ["litteral_distributivite", "defi", "maison", "template"],
    generate: () => {
      const k1 = randomInt(2, 5);
      const k2 = randomInt(2, 5);
      const b = randomInt(1, 6);
      let d = randomInt(1, 6);
      if (d === b) d = b === 6 ? 5 : b + 1;
      const l = randomChoice(LETTRES_SITUATION);
      const [t, q] = randomChoice([
        [`Sur un plan de maison, ${k1} pièces mesurent chacune ${l} + ${b} mètres de long et ${k2} autres pièces mesurent chacune ${l} + ${d} mètres.`, "la longueur totale de ces pièces"],
        [`Un menuisier découpe ${k1} planches de ${l} + ${b} centimètres et ${k2} planches de ${l} + ${d} centimètres.`, "la longueur totale de bois"],
        [`Pour une fête, on dresse ${k1} tables de ${l} + ${b} invités et ${k2} tables de ${l} + ${d} invités.`, "le nombre total d’invités"],
        [`Un cycliste fait ${k1} tours d’un circuit de ${l} + ${b} kilomètres, puis ${k2} tours d’un autre circuit de ${l} + ${d} kilomètres.`, "la distance totale parcourue"],
        [`Une médiathèque reçoit ${k1} cartons de ${l} + ${b} romans et ${k2} cartons de ${l} + ${d} bandes dessinées.`, "le nombre total de livres"],
        [`Un groupe joue ${k1} morceaux de ${l} + ${b} minutes et ${k2} morceaux de ${l} + ${d} minutes.`, "la durée totale du concert"],
        [`Un jardinier plante ${k1} haies de ${l} + ${b} arbustes et ${k2} haies de ${l} + ${d} arbustes.`, "le nombre total d’arbustes"],
        [`En sciences, on remplit ${k1} bacs de ${l} + ${b} litres d’eau et ${k2} bacs de ${l} + ${d} litres.`, "le volume total d’eau"],
      ] as const);
      const texte = randomChoice([
        `${t} Exprime ${q} en fonction de ${l}, sous forme développée et réduite.`,
        `${t} Écris ${q} sans parenthèses, en regroupant les termes semblables.`,
        `${t} Quelle expression réduite donne ${q} ?`,
        `${t} Montre que ${q} s’écrit ${k1}(${l} + ${b}) + ${k2}(${l} + ${d}), puis réduis cette expression.`,
      ]);
      const blocs: Bloc[] = [
        { kind: "p", m: k1, t: [[1, l], [b]] },
        { kind: "p", m: k2, t: [[1, l], [d]] },
      ];
      return questionBlocs(texte, ecrireBlocs(blocs), blocs, l, `${q} s’écrit ${ecrireBlocs(blocs)} ; on développe chaque produit, puis on regroupe.`);
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_nature_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris d’abord le total des groupes comme un produit, puis tiens compte de ce qui part ou arrive.",
    tags: ["litteral_distributivite", "defi", "nature", "template"],
    generate: () => {
      const k = randomInt(2, 6);
      const b = randomInt(2, 6);
      const c = randomInt(1, k * b - 1);
      const l = randomChoice(LETTRES_SITUATION);
      const [t, q, s] = randomChoice([
        [`Dans une réserve, ${k} enclos abritent chacun ${l} tortues et ${b} iguanes. On relâche ensuite ${c} iguanes dans la nature.`, "le nombre d’animaux restant dans les enclos", -1],
        [`Un centre de soins accueille ${k} volières de ${l} mésanges et ${b} merles ; ${c} merles guérissent et sont relâchés.`, "le nombre d’oiseaux restant", -1],
        [`Dans un parc, ${k} zones contiennent chacune ${l} arbustes et ${b} arbres. Une tempête abat ${c} arbres.`, "le nombre de végétaux restant", -1],
        [`Un apiculteur a ${k} ruches de ${l} cadres de miel et ${b} cadres vides chacune ; il retire ${c} cadres vides.`, "le nombre de cadres restant", -1],
        [`Une pépinière range ${k} plateaux de ${l} plants de tomates et ${b} plants de basilic ; elle vend ${c} plants de basilic.`, "le nombre de plants restant", -1],
        [`Lors d’un nettoyage de plage, ${k} équipes ramassent chacune ${l} kilogrammes de plastique et ${b} kilogrammes de verre ; les animateurs ramassent en plus ${c} kilogrammes.`, "la masse totale de déchets ramassés", 1],
        [`Un aquarium public a ${k} bassins de ${l} poissons-clowns et ${b} hippocampes ; ${c} hippocampes partent dans un autre aquarium.`, "le nombre d’animaux restant", -1],
        [`Un agriculteur bio remplit ${k} caisses de ${l} courgettes et ${b} aubergines, puis il ajoute ${c} aubergines dans une autre caisse.`, "le nombre total de légumes", 1],
      ] as const);
      const texte = randomChoice([
        `${t} Exprime ${q} en fonction de ${l}, sous forme développée et réduite.`,
        `${t} Écris ${q} sans parenthèses et sous forme réduite.`,
        `${t} Quelle expression réduite donne ${q} ?`,
        `${t} Donne ${q} sous la forme a${l} + b, avec a et b des nombres.`,
      ]);
      const blocs: Bloc[] = [
        { kind: "p", m: k, t: [[1, l], [b]] },
        { kind: "t", terme: [s * c] },
      ];
      const e = ecrireBlocs(blocs);
      return questionBlocs(texte, e, blocs, l, `les ${k} groupes donnent ${k}(${l} + ${b}), puis on ${s < 0 ? "retire" : "ajoute"} ${c} : ${e}.`);
    },
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- DISTRIB_SIMPLE ----------
  {
    kind: "fixed",
    id: "litteral_distributivite_simple_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le développement de 5(x + 2) ?",
    format: "qcm",
    choices: ["5x + 10", "5x + 2", "x + 10", "7x"],
    expected: ["5x + 10"],
    comparator: "mcq_exact",
    hint: "Le 5 multiplie x et 2.",
    explanation:
      "Définition : la distributivité transforme un produit en somme : a(b + c) = ab + ac.\n\n" +
      "Méthode : on multiplie 5 par chaque terme de la parenthèse.\n\n" +
      "Calcul : 5(x + 2) = 5x + 10.\n\n" +
      "Conclusion : le développement est 5x + 10.",
    tags: ["litteral_distributivite", "simple", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_simple_tpl_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_simple",
    difficulty: 1,
    theme: "neutral",
    hint: "Le coefficient multiplie chaque terme.",
    tags: ["litteral_distributivite", "simple", "qcm", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      const b = randomInt(2, 9);
      const l = randomChoice(LETTRES);
      const s = randomChoice([1, -1] as const);
      const signe = s === 1 ? "+" : "-";
      const inv = s === 1 ? "-" : "+";
      const e = Math.random() < 0.7 ? `${k}(${l} ${signe} ${b})` : `(${l} ${signe} ${b}) × ${k}`;
      const correct = `${k}${l} ${signe} ${k * b}`;
      const text = randomChoice([
        `Quel est le développement de ${e} ?`,
        `Parmi ces propositions, laquelle est égale à ${e} ?`,
        `Quelle expression obtient-on en développant ${e} ?`,
        `Développe ${e}. Quelle est la bonne réponse ?`,
        `Quelle est la forme développée de ${e} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: [correct, `${k}${l} ${signe} ${b}`, `${l} ${signe} ${k * b}`, `${k}${l} ${inv} ${k * b}`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: expli(`on multiplie ${k} par ${l} et par ${b}, en gardant le signe « ${signe} ».`, `${e} = ${k} × ${l} ${signe} ${k} × ${b} = ${correct}.`, `le développement est ${correct}.`),
      };
    },
  },

  // ---------- DISTRIB_DOUBLE ----------
  {
    kind: "fixed",
    id: "litteral_distributivite_double_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_double",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le développement réduit de (x + 1)(x + 4) ?",
    format: "qcm",
    choices: ["x² + 5x + 4", "x² + 4x + 4", "x² + 5x + 5", "2x + 5"],
    expected: ["x² + 5x + 4"],
    comparator: "mcq_exact",
    hint: "Fais les quatre produits puis regroupe.",
    explanation:
      "Définition : la double distributivité fait quatre produits.\n\n" +
      "Méthode : (x + 1)(x + 4) = x × x + x × 4 + 1 × x + 1 × 4.\n\n" +
      "Calcul : = x² + 4x + x + 4 = x² + 5x + 4.\n\n" +
      "Conclusion : le résultat est x² + 5x + 4.",
    tags: ["litteral_distributivite", "double", "qcm"],
  },

  // ---------- DISTRIB_RECONNAITRE ----------
  {
    kind: "fixed",
    id: "litteral_distributivite_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle expression contient une double distributivité à effectuer ?",
    format: "qcm",
    choices: ["(x + 2)(x + 5)", "3(x + 1)", "4x + 7", "x - 9"],
    expected: ["(x + 2)(x + 5)"],
    comparator: "mcq_exact",
    hint: "Cherche un produit de deux parenthèses.",
    explanation:
      "Définition : une double distributivité est un produit de deux parenthèses.\n\n" +
      "Méthode : on cherche deux parenthèses multipliées.\n\n" +
      "Calcul : (x + 2)(x + 5) est un produit de deux parenthèses.\n\n" +
      "Conclusion : c’est (x + 2)(x + 5).",
    tags: ["litteral_distributivite", "reconnaitre", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_reconnaitre_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Regarde la DERNIÈRE opération à effectuer : une multiplication donne un produit, une addition ou une soustraction donne une somme.",
    tags: ["litteral_distributivite", "reconnaitre", "somme_produit", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const tirage = Math.random();
      const estProduit = tirage < 0.55;
      const e = estProduit ? (tirage < 0.4 ? formeProduitSimple(l) : formeProduitDouble(l)) : formeSomme(l);
      const choices = ["une somme (ou une différence)", "un produit"];
      const text = randomChoice([
        `L’expression ${e} est-elle une somme ou un produit ?`,
        `${e} : somme ou produit ?`,
        `Quelle est la nature de l’expression ${e} ?`,
        `Avant de calculer, dis si ${e} est une somme ou un produit.`,
      ]);
      return {
        text,
        format: "qcm",
        choices,
        expected: [estProduit ? choices[1] : choices[0]],
        comparator: "mcq_exact",
        explanation: expli(
          "on regarde la dernière opération à effectuer.",
          estProduit
            ? `dans ${e}, on multiplie à la fin : c’est un produit (une forme qu’on peut développer).`
            : `dans ${e}, on additionne ou on soustrait à la fin : c’est une somme (forme développée).`,
          `${e} est ${estProduit ? "un produit" : "une somme"}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_reconnaitre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "L’expression 2(x + 3) est sous quelle forme ?",
    format: "qcm",
    choices: ["forme factorisée (à développer)", "forme développée", "forme réduite", "forme numérique"],
    expected: ["forme factorisée (à développer)"],
    comparator: "mcq_exact",
    hint: "Il y a encore une parenthèse précédée d’un coefficient.",
    explanation:
      "Définition : une forme factorisée se présente comme un produit ; une forme développée est une somme.\n\n" +
      "Méthode : on regarde s’il reste une parenthèse à distribuer.\n\n" +
      "Calcul : 2(x + 3) est un produit, donc une forme factorisée à développer.\n\n" +
      "Conclusion : c’est une forme factorisée.",
    tags: ["litteral_distributivite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_reconnaitre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression est déjà entièrement développée et réduite ?",
    format: "qcm",
    choices: ["3x + 8", "3(x + 8)", "(x + 1)(x + 2)", "2(x + 4) + x"],
    expected: ["3x + 8"],
    comparator: "mcq_exact",
    hint: "Une forme développée n’a plus de parenthèse à distribuer.",
    explanation:
      "Définition : une expression développée et réduite n’a plus de parenthèse et regroupe les termes semblables.\n\n" +
      "Méthode : on élimine celles qui contiennent encore une parenthèse.\n\n" +
      "Calcul : 3x + 8 n’a plus rien à développer.\n\n" +
      "Conclusion : c’est 3x + 8.",
    tags: ["litteral_distributivite", "reconnaitre", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_reconnaitre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une forme développée ne contient plus de parenthèse à distribuer.",
    tags: ["litteral_distributivite", "reconnaitre", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const tirage = Math.random();
      const developpee = tirage < 0.5;
      const e = developpee ? formeSomme(l) : tirage < 0.8 ? formeProduitSimple(l) : formeProduitDouble(l);
      const [stem, inverse] = randomChoice([
        [`L’expression ${e} est-elle déjà développée ?`, false],
        [`Faut-il encore développer l’expression ${e} ?`, true],
        [`${e} : cette écriture est-elle une forme développée ?`, false],
        [`Reste-t-il une parenthèse à distribuer dans ${e} ?`, true],
      ] as const);
      const oui = inverse ? !developpee : developpee;
      return {
        text: stem,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expli(
          "on regarde s’il reste une parenthèse précédée ou suivie d’un facteur.",
          `${e} ${developpee ? "n’a plus de parenthèse : elle est développée" : "contient encore un produit avec une parenthèse : il faut la développer"}.`,
          `la réponse est « ${oui ? "oui" : "non"} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "litteral_distributivite_reconnaitre_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le produit de deux parenthèses.",
    tags: ["litteral_distributivite", "reconnaitre", "double", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const correct = formeProduitDouble(l);
      const autres = distinctes(3, () => (Math.random() < 0.5 ? formeProduitSimple(l) : formeSomme(l)), [correct]);
      const choices = shuffle([correct, ...autres]);
      const liste = choices.join(" ; ");
      const text = randomChoice([
        `Quelle expression demande une double distributivité : ${liste} ?`,
        `Parmi ${liste}, laquelle est un produit de deux parenthèses ?`,
        `Voici quatre expressions : ${liste}. Pour laquelle faut-il effectuer quatre produits ?`,
        `Laquelle de ces expressions se développe avec la double distributivité : ${liste} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: expli(
          "la double distributivité concerne un produit de deux parenthèses de deux termes chacune.",
          `${correct} est un produit de deux parenthèses.`,
          `c’est ${correct}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_reconnaitre_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique la différence entre une forme factorisée et une forme développée.",
    format: "open",
    expected: ["produit", "somme", "parenthèse"],
    comparator: "contains_keyword",
    hint: "L’une est un produit, l’autre une somme.",
    explanation:
      "Définition : une forme factorisée est écrite comme un produit (avec parenthèses) ; une forme développée est écrite comme une somme.\n\n" +
      "Méthode : on regarde si l’expression est un produit ou une somme.\n\n" +
      "Calcul : par exemple 3(x + 2) est factorisée, 3x + 6 est développée.\n\n" +
      "Conclusion : factorisée = produit, développée = somme.",
    tags: ["litteral_distributivite", "reconnaitre", "open"],
  },

  // ---------- DISTRIB_DEFIS ----------
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_signe_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Le signe « - » devant le facteur change le signe de chaque terme de la parenthèse.",
    tags: ["litteral_distributivite", "defi", "signe", "template"],
    generate: () => genErreurEleve(true),
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le développement de 5(2x + 3) ?",
    format: "qcm",
    choices: ["10x + 15", "10x + 3", "7x + 8", "2x + 15"],
    expected: ["10x + 15"],
    comparator: "mcq_exact",
    hint: "Le 5 multiplie 2x et 3.",
    explanation:
      "Définition : a(b + c) = ab + ac, même si b contient un coefficient.\n\n" +
      "Méthode : on multiplie 5 par 2x et par 3.\n\n" +
      "Calcul : 5(2x + 3) = 10x + 15.\n\n" +
      "Conclusion : le développement est 10x + 15.",
    tags: ["litteral_distributivite", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_aire_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "L’aire d’un rectangle est longueur × largeur ; développe le produit.",
    tags: ["litteral_distributivite", "defi", "aire", "double", "template"],
    generate: () => genAire(randomChoice([1, 1, 2])),
  },
  {
    kind: "template",
    id: "litteral_distributivite_defi_tpl_perimetre_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Le périmètre d’un rectangle est 2 × (longueur + largeur) ; développe.",
    tags: ["litteral_distributivite", "defi", "perimetre", "template"],
    generate: () => {
      const l = randomChoice(LETTRES_SITUATION);
      const a = randomInt(1, 3);
      const b = randomInt(1, 9);
      const c = randomInt(1, 9);
      const largeurLettre = Math.random() < 0.5;
      const long = somme([[a, l], [b]]);
      const larg = largeurLettre ? somme([[1, l], [c]]) : String(c);
      const [obj, u] = randomChoice(OBJETS_RECT);
      const texte = randomChoice([
        `${maj(obj)} a pour longueur ${long} et pour largeur ${larg} (en ${u}). Donne son périmètre sous forme développée et réduite.`,
        `La longueur ${de(obj)} mesure ${long} et sa largeur ${larg} (en ${u}). Exprime son périmètre en fonction de ${l}, sans parenthèses.`,
        `On veut faire le tour ${de(obj)} de dimensions ${long} sur ${larg} (en ${u}). Quelle longueur faut-il parcourir ? Réponds par une expression réduite.`,
        `Calcule le périmètre P ${de(obj)} dont les côtés mesurent ${long} et ${larg} (en ${u}) ; écris P sous forme réduite.`,
      ]);
      const interieurP: Terme[] = largeurLettre ? [[a + 1, l], [b + c]] : [[a, l], [b + c]];
      const blocs: Bloc[] = [{ kind: "p", m: 2, t: interieurP }];
      return questionBlocs(texte, `2(${long} + ${larg})`, blocs, l, `P = 2 × (longueur + largeur) = 2(${somme(interieurP)}), puis on distribue 2.`);
    },
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_defi_open_double_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_distributivite",
    microId: "litteral_distributivite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la double distributivité demande quatre produits.",
    format: "open",
    expected: ["chaque terme", "quatre", "produits"],
    comparator: "contains_keyword",
    hint: "Chaque terme de la première parenthèse rencontre chaque terme de la seconde.",
    explanation:
      "Définition : dans un produit de deux parenthèses à deux termes, chaque terme de l’une multiplie chaque terme de l’autre.\n\n" +
      "Méthode : on associe chaque terme de la première parenthèse aux deux de la seconde.\n\n" +
      "Calcul : 2 × 2 = 4 produits à effectuer.\n\n" +
      "Conclusion : la double distributivité demande quatre produits.",
    tags: ["litteral_distributivite", "defi", "open"],
  },
];
