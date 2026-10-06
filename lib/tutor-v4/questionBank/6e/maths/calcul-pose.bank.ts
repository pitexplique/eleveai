// lib/tutor-v4/question-banks/maths/6e/calcul-pose.bank.ts

import type {
  TutorBankItemV4,
  CalculPoseCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function calculPoseCanvas(
  data: Omit<CalculPoseCanvasData, "kind">
): CalculPoseCanvasData {
  return { kind: "calcul_pose", ...data };
}

function cpe(def: string, meth: string, calc: string, ccl: string) {
  return `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${ccl}`;
}

// ⭐ 06/10/2026 — DES NOMBRES TIRÉS, DES FORMES ET DES SITUATIONS. Mesuré : 6 à
// 12 squelettes par micro, 15 à 19 répétitions sur 20 ; la plupart des gabarits
// tiraient leurs nombres dans quatre valeurs écrites à la main, et certaines
// étoiles n'avaient aucun gabarit. Chaque gabarit tire ses nombres (avec ou
// sans retenue, comme annoncé), varie la consigne, met une partie des tirages
// en situation. Le canvas n'affiche JAMAIS le résultat demandé ; les retenues
// ne sont plus dessinées (elles étaient écrites à la main, fausses dès que les
// nombres changeaient). La division s'écrit « ÷ », jamais « / ».
// Correcteurs : correcteurs/calcul-pose.ts.
import { PRENOMS, pick, de, voyelle, type Prenom } from "./entiers.bank";
import { nb, attendus, il, Il, situOk, type Situ2 } from "./calcul-mental.bank";

const TITRES: Record<"addition" | "soustraction" | "multiplication" | "division", string> = {
  addition: "Addition posée",
  soustraction: "Soustraction posée",
  multiplication: "Multiplication posée",
  division: "Division posée",
};
const SIGNES = { addition: "+", soustraction: "−", multiplication: "×", division: "÷" } as const;
type Op = keyof typeof SIGNES;

/** Le canvas de l'opération, résultat caché. */
function canvasPose(op: Op, a: number, b: number) {
  return calculPoseCanvas({
    operation: op,
    title: TITRES[op],
    numbers: [nb(a), nb(b)],
    ...(op === "division" ? { division: { dividende: nb(a), diviseur: nb(b) } } : {}),
    display: { showResult: false, showRetenues: false },
  });
}

function formePose(expr: string) {
  return pick([
    `Pose et calcule : ${expr}`,
    `Calcule en posant l’opération : ${expr}`,
    `Effectue en colonnes : ${expr}`,
    `Pose l’opération, puis calcule : ${expr}`,
    `Calcule : ${expr}`,
    `Donne le résultat de ${expr}.`,
    `Que vaut ${expr} ? Pose le calcul.`,
    `Complète : ${expr} = …`,
    `Écris le résultat de ${expr}.`,
    `Calcule en colonnes : ${expr}`,
    `Trouve le résultat de ${expr}.`,
    `Combien font ${expr} ?`,
    `Calcule à la main : ${expr}`,
    `Pose en colonnes et trouve le résultat : ${expr}`,
  ]);
}

// Situations à grands nombres (calcul posé). Chaque phrase écrit EXACTEMENT les deux nombres.
const POSE_ADD: Situ2[] = [
  { max: 20000, t: (_p, a, b) => `Samedi, le zoo a reçu ${a} visiteurs. Dimanche, il en a reçu ${b}.\nCombien de visiteurs sont venus ce week-end ?` },
  { max: 60000, t: (_p, a, b) => `Au stade, ${a} supporters sont en tribune nord et ${b} en tribune sud.\nCombien de supporters y a-t-il dans ces deux tribunes ?` },
  { max: 6000, t: (_p, a, b) => `La médiathèque a prêté ${a} livres en janvier et ${b} livres en février.\nCombien de livres a-t-elle prêtés en tout ?` },
  { max: 9000, unite: "km", t: (p, a, b) => `Cette année, ${p.nom} a roulé ${a} km à vélo et sa mère ${b} km.\nCombien de kilomètres ont-ils roulé à eux deux ?` },
  { max: 99999, t: (p, a, b) => `Au jeu vidéo, ${p.nom} gagne ${a} points au premier niveau et ${b} points au deuxième.\nCombien de points a-t-${il(p)} en tout ?` },
  { max: 20000, unite: "km", t: (p, a, b) => `Pour son voyage, ${p.nom} parcourt ${a} km en avion, puis ${b} km en train.\nQuelle distance parcourt-${il(p)} en tout ?` },
  { max: 60000, t: (_p, a, b) => `Un festival de musique accueille ${a} spectateurs le vendredi et ${b} le samedi.\nCombien de spectateurs sont venus ces deux jours ?` },
  { max: 9000, t: (_p, a, b) => `Une ferme ramasse ${a} œufs en mars et ${b} œufs en avril.\nCombien d’œufs a-t-elle ramassés ?` },
  { max: 9000, t: (p, a, b) => `Pour le recyclage, la classe ${de(p.nom)} collecte ${a} bouchons et la classe voisine ${b} bouchons.\nCombien de bouchons ont-elles collectés ?` },
  { max: 30000, t: (_p, a, b) => `À la course de la ville, ${a} personnes courent le semi-marathon et ${b} le marathon.\nCombien de coureurs y a-t-il en tout ?` },
  { max: 30000, t: (_p, a, b) => `Un musée reçoit ${a} visiteurs en juillet et ${b} en août.\nCombien de visiteurs a-t-il reçus pendant l’été ?` },
  { max: 9999, t: (_p, a, b) => `Un magasin de sport vend ${a} ballons au printemps et ${b} en été.\nCombien de ballons a-t-il vendus ?` },
  { max: 99999, t: (p, a, b) => `La chanson préférée ${de(p.nom)} a ${a} écoutes. Cette semaine, elle en gagne ${b} de plus.\nCombien d’écoutes a-t-elle maintenant ?` },
  { max: 9999, unite: "m", t: (p, a, b) => `En randonnée, ${p.nom} monte ${a} m le premier jour et ${b} m le deuxième.\nDe combien de mètres est-${il(p)} monté${p.f ? "e" : ""} en tout ?` },
  { max: 5000, unite: "g", t: (p, a, b) => `Pour la kermesse, ${p.nom} prépare ${a} g de pâte à crêpes et ${b} g de pâte à gaufres.\nQuelle masse de pâte prépare-t-${il(p)}, en grammes ?` },
];
const POSE_SOUS: Situ2[] = [
  { max: 60000, t: (_p, a, b) => `Le stade a ${a} places. ${b} spectateurs sont venus au match.\nCombien de places sont restées vides ?` },
  { max: 20000, unite: "km", t: (_p, a, b) => `Un avion doit parcourir ${a} km. Il a déjà parcouru ${b} km.\nCombien de kilomètres lui reste-t-il ?` },
  { max: 8848, unite: "m", t: (p, a, b) => `Le sommet est à ${a} m d’altitude. ${p.nom} est au refuge, à ${b} m.\nCombien de mètres reste-t-il à monter ?` },
  { max: 99999, t: (p, a, b) => `Au jeu vidéo, ${p.nom} a ${a} pièces d’or. ${Il(p)} en dépense ${b} à la boutique.\nCombien de pièces d’or lui reste-t-il ?` },
  { max: 20000, t: (_p, a, b) => `Une usine a fabriqué ${a} jouets. ${b} jouets ont déjà été vendus.\nCombien de jouets reste-t-il à vendre ?` },
  { max: 3000, unite: "€", t: (_p, a, b) => `La caisse de la classe contient ${a} €. La sortie au musée coûte ${b} €.\nCombien d’euros restera-t-il ?` },
  { max: 99999, t: (p, a, b) => `Le record du jeu est de ${a} points. ${p.nom} a marqué ${b} points.\nCombien de points lui manque-t-il pour égaler le record ?` },
  { max: 9999, unite: "L", t: (_p, a, b) => `Une citerne contient ${a} L d’eau. Pour arroser le jardin, on en utilise ${b} L.\nCombien de litres reste-t-il ?` },
  { max: 9999, t: (_p, a, b) => `Le magasin avait ${a} cahiers en stock. Il en vend ${b} à la rentrée.\nCombien de cahiers lui reste-t-il ?` },
  { max: 5000, t: (p, a, b) => `Le livre préféré ${de(p.nom)} a ${a} pages. ${Il(p)} en a lu ${b}.\nCombien de pages lui reste-t-il à lire ?` },
  { max: 30000, t: (_p, a, b) => `Une ville a planté ${a} arbres en dix ans. ${b} arbres ont été plantés cette année.\nCombien d’arbres ont été plantés les années d’avant ?` },
  { max: 9999, t: (p, a, b) => `La collection ${de(p.nom)} compte ${a} cartes. Celle de son cousin en compte ${b}.\nCombien de cartes ${p.nom} a-t-${il(p)} de plus que son cousin ?` },
];
// a groupes de b : `amax` borne le nombre de groupes, `bmin`/`bmax` la taille d'un groupe.
const POSE_MUL: Situ2[] = [
  { max: 9999, amax: 30, bmin: 20, bmax: 90, t: (p, a, b) => `Pour la sortie du collège ${de(p.nom)}, ${a} cars partent. Chaque car transporte ${b} passagers.\nCombien de passagers partent ?` },
  { max: 9999, amax: 60, bmin: 8, bmax: 60, t: (_p, a, b) => `Une salle de spectacle a ${a} rangées de ${b} fauteuils.\nCombien y a-t-il de fauteuils ?` },
  { max: 99999, amax: 99, bmin: 50, bmax: 2000, unite: "m", t: (p, a, b) => `${p.nom} fait ${a} tours d’un circuit de ${b} m.\nQuelle distance parcourt-${il(p)}, en mètres ?` },
  { max: 9999, amax: 99, bmin: 9, bmax: 99, unite: "€", t: (p, a, b) => `Le club de foot ${de(p.nom)} achète ${a} maillots à ${b} € l’un.\nCombien paie-t-il ?` },
  { max: 99999, amax: 9999, bmin: 8, bmax: 400, t: (_p, a, b) => `Une imprimerie fabrique ${a} carnets de ${b} pages.\nCombien de pages imprime-t-elle ?` },
  { max: 99999, amax: 999, bmin: 10, bmax: 500, t: (p, a, b) => `Le verger du grand-père ${de(p.nom)} a ${a} pommiers. Chaque pommier donne ${b} pommes.\nCombien de pommes récolte-t-il ?` },
  { max: 99999, amax: 999, bmin: 50, bmax: 500, unite: "g", t: (p, a, b) => `${p.nom} prépare ${a} sachets de ${b} g de bonbons pour la fête.\nQuelle masse de bonbons faut-il, en grammes ?` },
  { max: 9999, amax: 52, bmin: 10, bmax: 300, unite: "km", t: (p, a, b) => `${p.nom} fait ${b} km à vélo chaque semaine, pendant ${a} semaines.\nCombien de kilomètres parcourt-${il(p)} ?` },
  { max: 99999, amax: 999, bmin: 6, bmax: 24, t: (_p, a, b) => `Un camion livre ${a} cartons de ${b} bouteilles.\nCombien de bouteilles livre-t-il ?` },
  { max: 9999, amax: 60, bmin: 2, bmax: 40, t: (p, a, b) => `L’immeuble ${de(p.nom)} a ${a} étages de ${b} fenêtres.\nCombien de fenêtres a-t-il ?` },
  { max: 99999, amax: 24, bmin: 10, bmax: 999, unite: "L", t: (_p, a, b) => `Une fontaine donne ${b} L d’eau par heure. Elle coule pendant ${a} heures.\nCombien de litres a-t-elle donnés ?` },
  { max: 9999, amax: 99, bmin: 6, bmax: 60, t: (p, a, b) => `${p.nom} range ses timbres : ${a} pages de ${b} timbres.\nCombien de timbres a-t-${il(p)} ?` },
  { max: 99999, amax: 365, bmin: 5, bmax: 200, t: (p, a, b) => `${p.nom} lit ${b} pages par jour pendant ${a} jours.\nCombien de pages lit-${il(p)} en tout ?` },
  { max: 99999, amax: 99, bmin: 10, bmax: 999, unite: "€", t: (p, a, b) => `L’école ${de(p.nom)} achète ${a} tablettes à ${b} € l’une.\nCombien paie-t-elle ?` },
  { max: 99999, amax: 999, bmin: 12, bmax: 60, t: (p, a, b) => `Pour la kermesse, ${p.nom} remplit ${a} boîtes de ${b} biscuits.\nCombien de biscuits faut-il ?` },
  { max: 99999, amax: 200, bmin: 20, bmax: 500, t: (p, a, b) => `Une ferme a ${a} poules. Chacune pond ${b} œufs par an. ${p.nom} veut savoir le total.\nCombien d’œufs sont pondus en un an ?` },
  { max: 99999, amax: 99, bmin: 100, bmax: 999, unite: "m", t: (p, a, b) => `${p.nom} nage ${b} m à chaque entraînement. ${Il(p)} va à ${a} entraînements cette année.\nQuelle distance nage-t-${il(p)}, en mètres ?` },
];
const POSE_DIV: Situ2[] = [
  { max: 2000, bmax: 12, t: (p, a, b) => `${p.nom} range ${a} œufs dans des boîtes de ${b}.\nCombien de boîtes remplit-${il(p)} ?` },
  { max: 5000, bmax: 9, unite: "€", t: (_p, a, b) => `${b} amis gagnent ${a} € à un concours. Ils se partagent la somme à parts égales.\nCombien d’euros reçoit chacun ?` },
  { max: 2000, bmax: 9, t: (_p, a, b) => `Au collège, ${a} élèves sont répartis en ${b} groupes égaux pour une course.\nCombien d’élèves y a-t-il dans chaque groupe ?` },
  { max: 9999, bmax: 9, unite: "m", t: (_p, a, b) => `Un relais de ${a} m se court à ${b} coureurs. Chacun court la même distance.\nQuelle distance court chaque coureur, en mètres ?` },
  { max: 3000, bmax: 9, t: (p, a, b) => `${p.nom} lit un livre de ${a} pages en ${b} semaines, autant chaque semaine.\nCombien de pages lit-${il(p)} par semaine ?` },
  { max: 5000, bmax: 9, unite: "g", t: (p, a, b) => `${p.nom} partage ${a} g de farine en ${b} sachets de même masse.\nQuelle est la masse d’un sachet, en grammes ?` },
  { max: 9999, bmax: 9, t: (_p, a, b) => `Une usine range ${a} stylos en paquets de ${b}.\nCombien de paquets obtient-elle ?` },
  { max: 2000, bmax: 9, unite: "km", t: (_p, a, b) => `Un cycliste parcourt ${a} km en ${b} jours, la même distance chaque jour.\nCombien de kilomètres fait-il par jour ?` },
  { max: 3000, bmax: 9, t: (_p, a, b) => `Un fermier met ${a} pommes dans ${b} cagettes, autant dans chacune.\nCombien de pommes y a-t-il dans une cagette ?` },
  { max: 5000, bmax: 9, unite: "L", t: (_p, a, b) => `On verse ${a} L d’eau dans ${b} cuves identiques, autant dans chacune.\nCombien de litres y a-t-il dans une cuve ?` },
  { max: 9999, bmax: 9, t: (p, a, b) => `La classe ${de(p.nom)} a ramassé ${a} bouchons. Elle les répartit dans ${b} sacs égaux.\nCombien de bouchons y a-t-il dans chaque sac ?` },
];

/**
 * Une opération posée : en situation (une fois sur deux, si une situation
 * plausible existe) ou en calcul, avec le canvas de l'opération, résultat caché.
 */
function genPose(op: Op, a: number, b: number, explication: string, opts: { probleme?: boolean } = {}) {
  // Un « problème » : toujours en situation, et sans canvas (il donnerait l'opération).
  const sansCanvas = !!opts.probleme;
  const rep = op === "addition" ? a + b : op === "soustraction" ? a - b : op === "multiplication" ? a * b : a / b;
  const table = op === "addition" ? POSE_ADD : op === "soustraction" ? POSE_SOUS : op === "multiplication" ? POSE_MUL : POSE_DIV;
  const plusGrand = op === "multiplication" ? rep : Math.max(a, b);
  // En multiplication, l'ordre n'importe pas : on essaie « a groupes de b » puis « b groupes de a ».
  const ordres: [number, number][] = op === "multiplication" ? [[a, b], [b, a]] : [[a, b]];
  const choix = ordres.flatMap(([x, y]) =>
    table.filter((s) => situOk(s, plusGrand, y, op === "multiplication" ? x : 0) && Number.isInteger(x) && Number.isInteger(y)).map((s) => ({ s, x, y })),
  );
  const situations = choix.map((c) => c.s);
  const canvas = sansCanvas ? {} : { canvas: canvasPose(op, a, b) };
  if ((opts.probleme || Math.random() < 0.6) && situations.length) {
    const { s, x, y } = pick(choix);
    return {
      text: s.t(pick(PRENOMS), nb(x), nb(y)),
      format: "short" as const,
      expected: attendus(rep, s.unite),
      comparator: "number_equal" as const,
      explanation: explication,
      ...canvas,
    };
  }
  return {
    text: formePose(`${nb(a)} ${SIGNES[op]} ${nb(b)}`),
    format: "short" as const,
    expected: attendus(rep),
    comparator: "number_equal" as const,
    explanation: explication,
    ...canvas,
  };
}

/** Deux nombres dont l'addition n'a AUCUNE retenue (chaque colonne ≤ 9). */
function sansRetenueAdd(k: number): [number, number] {
  const a: number[] = [];
  const b: number[] = [];
  for (let i = 0; i < k; i++) {
    const x = randomInt(i === 0 ? 1 : 0, 8);
    a.push(x);
    b.push(randomInt(i === 0 ? 1 : 0, 9 - x));
  }
  return [Number(a.join("")), Number(b.join(""))];
}
/** Une addition à au moins une retenue. */
function avecRetenueAdd(ka: number, kb: number): [number, number] {
  for (;;) {
    const a = randomInt(10 ** (ka - 1), 10 ** ka - 1);
    const b = randomInt(10 ** (kb - 1), 10 ** kb - 1);
    const da = String(a).split("").reverse().map(Number);
    const db = String(b).split("").reverse().map(Number);
    if (da.some((d, i) => d + (db[i] ?? 0) >= 10)) return [a, b];
  }
}
/** a − b sans retenue : chaque chiffre de a ≥ celui de b. */
function sansRetenueSous(k: number): [number, number] {
  const a: number[] = [];
  const b: number[] = [];
  for (let i = 0; i < k; i++) {
    const x = randomInt(i === 0 ? 2 : 0, 9);
    a.push(x);
    b.push(randomInt(i === 0 ? 1 : 0, i === 0 ? x - 1 : x));
  }
  return [Number(a.join("")), Number(b.join(""))];
}
/** a − b avec au moins une retenue (un chiffre du haut plus petit), zéros compris. */
function avecRetenueSous(k: number): [number, number] {
  for (;;) {
    const a = randomInt(10 ** (k - 1) + 10 ** (k - 1), 10 ** k - 1);
    const b = randomInt(10 ** (k - 2), a - 10 ** (k - 2));
    const da = String(a).split("").reverse().map(Number);
    const db = String(b).split("").reverse().map(Number);
    if (b < a && da.some((d, i) => d < (db[i] ?? 0))) return [a, b];
  }
}

/** « A-t-il raison ? » : un résultat annoncé, juste (2 fois sur 5) ou faux d'une erreur typique. */
function genVraiFaux(op: "addition" | "soustraction" | "multiplication", a: number, b: number) {
  const juste = op === "addition" ? a + b : op === "soustraction" ? a - b : a * b;
  const erreurs = [10, -10, 100, -100, 1, -1].filter((e) => juste + e > 0);
  const annonce = Math.random() < 0.4 ? juste : juste + pick(erreurs);
  const vrai = annonce === juste;
  const p = pick(PRENOMS);
  const e = `${nb(a)} ${SIGNES[op]} ${nb(b)}`;
  const forme = pick([
    { t: `${p.nom} affirme que ${e} = ${nb(annonce)}.\nA-t-${il(p)} raison ?`, oui: "oui", non: "non" },
    { t: `Sur le cahier ${de(p.nom)}, on lit : ${e} = ${nb(annonce)}.\nCe résultat est-il juste ?`, oui: "juste", non: "faux" },
    { t: `${p.nom} a posé ${e} et a trouvé ${nb(annonce)}.\nSon calcul est-il correct ?`, oui: "oui, c’est correct", non: "non, c’est faux" },
    { t: `Vrai ou faux ? ${e} = ${nb(annonce)}`, oui: "vrai", non: "faux" },
    { t: `Au tableau, ${p.nom} écrit : ${e} = ${nb(annonce)}.\nEst-ce juste ?`, oui: "oui", non: "non" },
  ]);
  return {
    text: forme.t,
    format: "qcm" as const,
    choices: shuffle([forme.oui, forme.non]),
    expected: [vrai ? forme.oui : forme.non],
    comparator: "mcq_exact" as const,
    explanation: cpe(
      "vérifier un calcul, c’est le refaire avec soin (ou utiliser l’opération inverse).",
      "on pose l’opération et on calcule colonne par colonne, sans oublier les retenues.",
      `${e} = ${nb(juste)}${vrai ? "" : `, et non ${nb(annonce)}`}.`,
      vrai ? "le résultat annoncé est juste." : "le résultat annoncé est faux.",
    ),
    canvas: canvasPose(op, a, b),
  };
}

/** Addition de deux décimaux : on aligne les virgules. */
function genAdditionDecimaux() {
  const d1 = pick([1, 2]);
  const d2 = pick([1, 2]);
  const a = randomInt(10 ** d1 + 1, 49 * 10 ** d1) / 10 ** d1;
  const b = randomInt(10 ** d2 + 1, 29 * 10 ** d2) / 10 ** d2;
  const s = Math.round((a + b) * 100) / 100;
  const p = pick(PRENOMS);
  const explication = cpe(
    "additionner des décimaux demande d’aligner les chiffres de même rang.",
    "on aligne les virgules, on complète par des zéros si besoin, puis on additionne colonne par colonne.",
    `${nb(a)} + ${nb(b)} = ${nb(s)}.`,
    `le résultat est ${nb(s)}.`,
  );
  if (Math.random() < 0.5) {
    const sit = pick([
      { u: "€", t: `${p.nom} achète un livre à ${nb(a)} € et un jeu à ${nb(b)} €.\nCombien paie-t-${il(p)} ?` },
      { u: "km", t: `${p.nom} court ${nb(a)} km lundi et ${nb(b)} km mercredi.\nQuelle distance a-t-${il(p)} courue, en kilomètres ?` },
      { u: "kg", t: `Un colis pèse ${nb(a)} kg. On y ajoute un paquet de ${nb(b)} kg.\nQuelle est la masse totale, en kilogrammes ?` },
      { u: "L", t: `Dans une bassine, il y a ${nb(a)} L d’eau. ${p.nom} ajoute ${nb(b)} L.\nCombien de litres y a-t-il maintenant ?` },
      { u: "m", t: `${p.nom} coud une bande de tissu de ${nb(a)} m à une autre de ${nb(b)} m.\nQuelle longueur obtient-${il(p)}, en mètres ?` },
      { u: "€", t: `Au marché, ${p.nom} paie ${nb(a)} € de fruits et ${nb(b)} € de légumes.\nCombien dépense-t-${il(p)} en tout ?` },
    ]);
    return { text: sit.t, format: "short" as const, expected: attendus(s, sit.u), comparator: "number_equal" as const, explanation: explication, canvas: canvasPose("addition", a, b) };
  }
  return { text: formePose(`${nb(a)} + ${nb(b)}`), format: "short" as const, expected: attendus(s), comparator: "number_equal" as const, explanation: explication, canvas: canvasPose("addition", a, b) };
}

/** « Quelle addition vérifie a − b = r ? » : une seule égalité vraie parmi les propositions. */
function genVerifierSoustraction(a: number, b: number) {
  const r = a - b;
  const p = pick(PRENOMS);
  const e = `${nb(a)} − ${nb(b)} = ${nb(r)}`;
  const good = `${nb(r)} + ${nb(b)} = ${nb(a)}`;
  const pieges = [
    `${nb(a)} + ${nb(b)} = ${nb(r)}`,
    `${nb(r)} − ${nb(b)} = ${nb(a)}`,
    `${nb(a)} + ${nb(r)} = ${nb(b)}`,
    `${nb(r)} + ${nb(a)} = ${nb(b)}`,
  ];
  return {
    text: pick([
      `${p.nom} a calculé ${e}.\nQuelle addition permet de vérifier son calcul ?`,
      `Pour vérifier ${e}, quelle égalité faut-il contrôler ?`,
      `On affirme que ${e}.\nQuelle addition permet de le vérifier ?`,
      `${p.nom} veut vérifier sa soustraction : ${e}.\nQuelle addition doit-${il(p)} écrire ?`,
      `Vérifie la soustraction ${e} avec l’opération inverse.\nQuelle égalité choisis-tu ?`,
    ]),
    format: "qcm" as const,
    choices: shuffle([good, ...shuffle(pieges).slice(0, 3)]),
    expected: [good],
    comparator: "mcq_exact" as const,
    explanation: cpe(
      "l’opération inverse de la soustraction est l’addition.",
      "on additionne le résultat et le nombre enlevé : on doit retrouver le nombre de départ.",
      `${nb(r)} + ${nb(b)} = ${nb(a)}.`,
      "cette addition vérifie la soustraction.",
    ),
    canvas: canvasPose("soustraction", a, b),
  };
}

/** Retrouver le nombre de départ : … − b = r (situation ou écriture). */
function genNombreDepart(b: number, r: number) {
  const p = pick(PRENOMS);
  const a = b + r;
  const sit = pick([
    { u: "", t: `Après avoir retiré ${nb(b)}, il reste ${nb(r)}.\nQuel était le nombre de départ ?` },
    { u: "€", t: `${p.nom} dépense ${nb(b)} €. Il lui reste ${nb(r)} €.\nCombien d’euros avait-${il(p)} au départ ?` },
    { u: "", t: `À la gare, ${nb(b)} passagers descendent du train. Il en reste ${nb(r)} à bord.\nCombien y avait-il de passagers avant l’arrêt ?` },
    { u: "", t: `${p.nom} a lu ${nb(b)} pages. Il lui en reste ${nb(r)} à lire.\nCombien de pages a son livre ?` },
    { u: "", t: `Une usine a vendu ${nb(b)} jouets. Il lui en reste ${nb(r)}.\nCombien de jouets avait-elle fabriqués ?` },
    { u: "", t: `${p.nom} a donné ${nb(b)} cartes à ses amis. Il lui en reste ${nb(r)}.\nCombien de cartes avait-${il(p)} ?` },
    { u: "L", t: `Une citerne a perdu ${nb(b)} L d’eau. Il reste ${nb(r)} L.\nCombien de litres contenait-elle au départ ?` },
    { u: "", t: `Complète : … − ${nb(b)} = ${nb(r)}` },
    { u: "", t: `Trouve le nombre de départ : … − ${nb(b)} = ${nb(r)}` },
    { u: "", t: `${p.nom} pense à un nombre. ${Il(p)} retire ${nb(b)} à ce nombre et trouve ${nb(r)}.\nQuel est ce nombre ?` },
    { u: "km", t: `${p.nom} a déjà roulé ${nb(b)} km. Il lui reste ${nb(r)} km pour finir son tour à vélo.\nQuelle est la longueur du tour, en kilomètres ?` },
  ]);
  return {
    text: sit.t,
    format: "short" as const,
    expected: attendus(a, sit.u || undefined),
    comparator: "number_equal" as const,
    explanation: cpe(
      "pour retrouver le nombre de départ après une soustraction, on utilise l’opération inverse.",
      "on additionne ce qui reste et ce qui a été enlevé.",
      `${nb(r)} + ${nb(b)} = ${nb(a)}.`,
      `le nombre de départ est ${nb(a)}.`,
    ),
  };
}

// --- Division euclidienne : quotient, reste, ou « combien en faut-il » (quotient + 1).
type CtxEuclide = {
  dmax: number;
  t: (p: Prenom, A: string, D: string) => string;
  q: (p: Prenom) => string;
  r: (p: Prenom) => string;
  plus?: (p: Prenom) => string;
};
const CTX_EUCLIDE: CtxEuclide[] = [
  { dmax: 12, t: (p, A, D) => `${p.nom} range ${A} œufs dans des boîtes de ${D}.`, q: (p) => `Combien de boîtes pleines obtient-${il(p)} ?`, r: () => "Combien d’œufs restent hors des boîtes ?", plus: () => "Combien de boîtes faut-il pour ranger tous les œufs ?" },
  { dmax: 9, t: (p, A, D) => `Le collège ${de(p.nom)} emmène ${A} élèves en sortie, dans des minibus de ${D} places.`, q: () => "Combien de minibus sont remplis complètement ?", r: () => "Combien d’élèves reste-t-il quand ces minibus sont pleins ?", plus: () => "Combien de minibus faut-il pour emmener tous les élèves ?" },
  { dmax: 9, t: (p, A, D) => `${p.nom} colle ${A} photos dans un album, ${D} par page.`, q: () => "Combien de pages complètes remplit-on ?", r: () => "Combien de photos y a-t-il sur la dernière page, incomplète ?", plus: () => "Combien de pages faut-il pour coller toutes les photos ?" },
  { dmax: 9, t: (p, A, D) => `${p.nom} partage ${A} bonbons entre ${D} enfants, autant pour chacun, le plus possible.`, q: () => "Combien de bonbons reçoit chaque enfant ?", r: () => "Combien de bonbons reste-t-il après le partage ?" },
  { dmax: 8, t: (_p, A, D) => `On distribue ${A} cartes à ${D} joueurs, autant à chacun, le plus possible.`, q: () => "Combien de cartes reçoit chaque joueur ?", r: () => "Combien de cartes reste-t-il dans la pioche ?" },
  { dmax: 9, t: (p, A, D) => `${p.nom} range ${A} livres sur des étagères de ${D} livres.`, q: () => "Combien d’étagères pleines y a-t-il ?", r: () => "Combien de livres y a-t-il sur l’étagère incomplète ?", plus: () => "Combien d’étagères faut-il pour ranger tous les livres ?" },
  { dmax: 9, t: (p, A, D) => `Pour la fête, ${p.nom} dispose ${A} gâteaux sur des plateaux de ${D}.`, q: () => "Combien de plateaux pleins obtient-on ?", r: () => "Combien de gâteaux restent à côté des plateaux pleins ?", plus: () => "Combien de plateaux faut-il pour tous les gâteaux ?" },
  { dmax: 9, t: (p, A, D) => `${p.nom} met ${A} billes dans des sachets de ${D}.`, q: () => "Combien de sachets pleins obtient-on ?", r: () => "Combien de billes reste-t-il hors des sachets ?", plus: () => "Combien de sachets faut-il pour toutes les billes ?" },
  { dmax: 9, t: (_p, A, D) => `Au gymnase, ${A} élèves forment des équipes de ${D}.`, q: () => "Combien d’équipes complètes y a-t-il ?", r: () => "Combien d’élèves restent sans équipe ?" },
  { dmax: 8, t: (p, A, D) => `${p.nom} ramasse ${A} pommes et les met dans des paniers de ${D}.`, q: () => "Combien de paniers pleins obtient-on ?", r: () => "Combien de pommes reste-t-il hors des paniers ?", plus: () => "Combien de paniers faut-il pour toutes les pommes ?" },
];

/** Division euclidienne : en situation (quotient, reste ou « combien en faut-il ») ou en calcul. */
function genEuclide(A: number, D: number, opts: { situation: number; plus?: boolean; canvas?: boolean }) {
  const q = Math.floor(A / D);
  const r = A % D;
  const p = pick(PRENOMS);
  const egalite = `${nb(A)} = ${D} × ${nb(q)} + ${r}`;
  const ctxs = CTX_EUCLIDE.filter((c) => c.dmax >= D);
  const canvas = opts.canvas ? { canvas: canvasPose("division", A, D) } : {};
  if (Math.random() < opts.situation && ctxs.length) {
    const c = pick(ctxs);
    const kinds: ("q" | "r" | "plus")[] = ["q", "r", ...(opts.plus && c.plus && r > 0 ? (["plus", "plus"] as const) : [])];
    const k = pick(kinds);
    const rep = k === "q" ? q : k === "r" ? r : q + 1;
    const question = k === "q" ? c.q(p) : k === "r" ? c.r(p) : c.plus!(p);
    return {
      text: `${c.t(p, nb(A), String(D))}\n${question}`,
      format: "short" as const,
      expected: attendus(rep),
      comparator: "number_equal" as const,
      explanation: cpe(
        "une division euclidienne donne un quotient et un reste plus petit que le diviseur.",
        "on pose la division, puis on lit la réponse dans le contexte : le quotient compte les groupes complets, le reste ce qui ne forme pas un groupe.",
        `${egalite}, avec ${r} < ${D}.`,
        k === "plus" ? `il faut ${nb(q)} groupes complets, plus 1 pour les ${r} qui restent : ${nb(q + 1)}.` : `la réponse est ${nb(rep)}.`,
      ),
      ...canvas,
    };
  }
  const demande = pick(["quotient", "reste"] as const);
  const rep = demande === "quotient" ? q : r;
  return {
    text: pick([
      `Dans la division euclidienne de ${nb(A)} par ${D}, quel est le ${demande} ?`,
      `Pose la division euclidienne de ${nb(A)} par ${D}. Donne le ${demande}.`,
      `Effectue la division ${nb(A)} ÷ ${D}. Quel est le ${demande} ?`,
      `On divise ${nb(A)} par ${D}. Écris le ${demande} de cette division euclidienne.`,
      `Calcule le quotient et le reste de ${nb(A)} ÷ ${D}. Écris le ${demande}.`,
    ]),
    format: "short" as const,
    expected: attendus(rep),
    comparator: "number_equal" as const,
    explanation: cpe(
      "dans une division euclidienne, dividende = diviseur × quotient + reste, avec un reste plus petit que le diviseur.",
      "on pose la division et on cherche le plus grand multiple du diviseur qui ne dépasse pas le dividende.",
      `${egalite}, avec ${r} < ${D}.`,
      `le ${demande} est ${nb(rep)}.`,
    ),
    ...canvas,
  };
}

/** QCM : quelle égalité vérifie « A ÷ D = q reste r » ? Une seule vraie. */
function genVerifierDivision(A: number, D: number) {
  const q = Math.floor(A / D);
  const r = A % D;
  const p = pick(PRENOMS);
  const good = `${nb(A)} = ${D} × ${nb(q)} + ${r}`;
  const candidats = [
    `${nb(A)} = ${D} + ${nb(q)} + ${r}`,
    `${nb(A)} = ${D} × ${r} + ${nb(q)}`,
    `${nb(A)} = ${nb(q)} × ${r} + ${D}`,
    `${nb(A)} = ${D} × ${nb(q)} − ${r}`,
    `${nb(A)} = ${D} × ${nb(q + 1)} + ${r}`,
  ];
  // Un leurre ne doit jamais être vrai par hasard.
  const vrai = (e: string) => {
    const [g, d] = e.split(" = ");
    const v = (s: string) => s.split(" + ").reduce((acc, t) => acc + t.split(" − ").reduce((x, u, i) => (i ? x - u.split(" × ").reduce((m, f) => m * Number(f.replace(/\s/g, "")), 1) : u.split(" × ").reduce((m, f) => m * Number(f.replace(/\s/g, "")), 1)), 0), 0);
    return v(g) === v(d);
  };
  const pieges = shuffle(candidats.filter((e) => !vrai(e))).slice(0, 3);
  const e = `${nb(A)} ÷ ${D} = ${nb(q)} reste ${r}`;
  return {
    text: pick([
      `Quelle égalité vérifie la division : ${e} ?`,
      `${p.nom} a trouvé : ${e}.\nQuelle égalité permet de vérifier son calcul ?`,
      `Pour contrôler ${e}, quelle égalité faut-il écrire ?`,
      `Vérifie la division euclidienne ${e}.\nQuelle égalité choisis-tu ?`,
      `${p.nom} a posé la division et écrit : ${e}.\nQuelle égalité doit-${il(p)} vérifier ?`,
      `Au tableau, ${p.nom} écrit ${e}.\nQuelle égalité prouve que c’est juste ?`,
      `${p.nom} doute de sa division : ${e}.\nQuelle égalité lui permet de contrôler ?`,
      `Le professeur demande à ${p.nom} de vérifier ${e}.\nQuelle égalité doit-${il(p)} écrire ?`,
      `Dans le cahier ${de(p.nom)}, on lit : ${e}.\nAvec quelle égalité vérifie-t-on ce résultat ?`,
    ]),
    format: "qcm" as const,
    choices: shuffle([good, ...pieges]),
    expected: [good],
    comparator: "mcq_exact" as const,
    explanation: cpe(
      "une division euclidienne se vérifie avec : dividende = diviseur × quotient + reste.",
      "on remplace par les nombres de l’énoncé et on calcule.",
      `${D} × ${nb(q)} + ${r} = ${nb(D * q)} + ${r} = ${nb(A)}.`,
      "l’égalité correcte vérifie la division.",
    ),
    canvas: canvasPose("division", A, D),
  };
}

/** QCM : l'opération inverse qui vérifie a + b = s, a × b = p ou D ÷ d = q (division exacte). */
function genVerifierInverse(grand: boolean) {
  const p = pick(PRENOMS);
  const op = pick(["addition", "multiplication", "division", "soustraction"] as const);
  let e: string;
  let good: string;
  let pieges: string[];
  let canvas;
  if (op === "addition") {
    const [a, b] = avecRetenueAdd(grand ? 4 : 3, 3);
    const s = a + b;
    e = `${nb(a)} + ${nb(b)} = ${nb(s)}`;
    good = `${nb(s)} − ${nb(b)} = ${nb(a)}`;
    pieges = [`${nb(a)} − ${nb(b)} = ${nb(s)}`, `${nb(s)} + ${nb(b)} = ${nb(a)}`, `${nb(b)} − ${nb(a)} = ${nb(s)}`, `${nb(s)} − ${nb(a)} = ${nb(s)}`];
    canvas = canvasPose("addition", a, b);
  } else if (op === "soustraction") {
    const [a, b] = avecRetenueSous(grand ? 4 : 3);
    const r = a - b;
    e = `${nb(a)} − ${nb(b)} = ${nb(r)}`;
    good = `${nb(r)} + ${nb(b)} = ${nb(a)}`;
    pieges = [`${nb(a)} + ${nb(b)} = ${nb(r)}`, `${nb(r)} − ${nb(b)} = ${nb(a)}`, `${nb(a)} + ${nb(r)} = ${nb(b)}`];
    canvas = canvasPose("soustraction", a, b);
  } else if (op === "multiplication") {
    const a = randomInt(grand ? 120 : 21, grand ? 999 : 99);
    const b = randomInt(3, 9);
    const m = a * b;
    e = `${nb(a)} × ${b} = ${nb(m)}`;
    good = `${nb(m)} ÷ ${b} = ${nb(a)}`;
    pieges = [`${nb(m)} × ${b} = ${nb(a)}`, `${nb(a)} ÷ ${b} = ${nb(m)}`, `${nb(m)} − ${b} = ${nb(a)}`];
    canvas = canvasPose("multiplication", a, b);
  } else {
    const d = randomInt(3, 9);
    const q = randomInt(grand ? 120 : 12, grand ? 999 : 99);
    const D = d * q;
    e = `${nb(D)} ÷ ${d} = ${nb(q)}`;
    good = `${nb(q)} × ${d} = ${nb(D)}`;
    pieges = [`${nb(q)} ÷ ${d} = ${nb(D)}`, `${nb(D)} × ${d} = ${nb(q)}`, `${nb(q)} + ${d} = ${nb(D)}`];
    canvas = canvasPose("division", D, d);
  }
  return {
    text: pick([
      `${p.nom} a calculé ${e}.\nQuelle égalité permet de vérifier son calcul ?`,
      `Pour vérifier ${e}, quelle opération inverse faut-il faire ?`,
      `On affirme que ${e}.\nQuelle égalité permet de le contrôler ?`,
      `Vérifie ${e} avec l’opération inverse.\nQuelle égalité choisis-tu ?`,
      `Sur son cahier, ${p.nom} écrit ${e}.\nComment peut-${il(p)} vérifier ?`,
      `${p.nom} veut être sûr${p.f ? "e" : ""} que ${e}.\nQuelle égalité doit-${il(p)} contrôler ?`,
      `Au tableau, ${p.nom} a écrit ${e}.\nQuelle opération inverse prouve que c’est juste ?`,
      `Le professeur demande à ${p.nom} de vérifier ${e}.\nQuelle égalité doit-${il(p)} écrire ?`,
    ]),
    format: "qcm" as const,
    choices: shuffle([good, ...shuffle(pieges).slice(0, 3)]),
    expected: [good],
    comparator: "mcq_exact" as const,
    explanation: cpe(
      "l’addition et la soustraction sont inverses l’une de l’autre ; la multiplication et la division aussi.",
      "on part du résultat et on fait l’opération inverse : on doit retrouver le nombre de départ.",
      `${good}.`,
      "cette égalité vérifie le calcul.",
    ),
    canvas,
  };
}

/** Ordre de grandeur : on arrondit, on calcule de tête ; les leurres sont 10 fois trop grands ou trop petits. */
function genOrdreGrandeur() {
  const op = pick(["+", "−", "×"] as const);
  let a: number;
  let b: number;
  if (op === "×") {
    a = randomInt(18, 99) * (Math.random() < 0.5 ? 1 : 10) + randomInt(0, 9);
    b = randomInt(3, 9);
  } else {
    a = randomInt(1500, 9800);
    b = randomInt(150, op === "−" ? Math.floor(a / 2) : 4800);
  }
  // Deux chiffres significatifs : 1 507 → 1 500, 340 → 340, 189 → 190 (arrondir au millier
  // donnait 2 000 − 300 = 1 700 pour 1 507 − 340 : trop loin de 1 167).
  // + et − : à la centaine (2 746 − 311 ≈ 2 700 − 300). × : à la dizaine (189 × 7 ≈ 190 × 7),
  // car arrondir 150 à 200 ferait une erreur d'un tiers.
  const arr = (n: number) => (op === "×" ? Math.round(n / 10) * 10 : Math.round(n / 100) * 100);
  const est = op === "+" ? arr(a) + arr(b) : op === "−" ? arr(a) - arr(b) : arr(a) * b;
  const p = pick(PRENOMS);
  const e = `${nb(a)} ${op} ${nb(b)}`;
  const choix = [est, est * 10, Math.max(1, Math.round(est / 10)), est * 100].map((x) => `environ ${nb(x)}`);
  return {
    text: pick([
      `Avant de poser ${e}, quel ordre de grandeur est raisonnable ?`,
      `${p.nom} va poser ${e}. Quel résultat approché peut-${il(p)} prévoir ?`,
      `Sans poser ${e}, choisis le bon ordre de grandeur.`,
      `${p.nom} trouve un résultat pour ${e}. Pour le contrôler, quel ordre de grandeur attend-on ?`,
      `Avant de poser ${e}, ${p.nom} arrondit les nombres.\nQuel résultat approché trouve-t-${il(p)} ?`,
      `${p.nom} veut vérifier ${e} à la calculatrice. Quel ordre de grandeur doit-${il(p)} attendre ?`,
      `Pour ${e}, ${p.nom} cherche d’abord un ordre de grandeur.\nLequel est raisonnable ?`,
    ]),
    format: "qcm" as const,
    choices: shuffle(choix),
    expected: [choix[0]],
    comparator: "mcq_exact" as const,
    explanation: cpe(
      "un ordre de grandeur est une estimation rapide du résultat.",
      "on arrondit les nombres pour calculer de tête.",
      `on arrondit, on calcule : environ ${nb(est)} (le calcul exact donne ${nb(op === "+" ? a + b : op === "−" ? a - b : a * b)}).`,
      `un ordre de grandeur raisonnable est environ ${nb(est)}.`,
    ),
  };
}

/** « Retrouve le bon résultat » : un élève a oublié une retenue. */
function genCorrigerErreur() {
  const p = pick(PRENOMS);
  const op = pick(["addition", "multiplication", "soustraction"] as const);
  let a: number;
  let b: number;
  if (op === "addition") [a, b] = avecRetenueAdd(pick([3, 4]), 3);
  else if (op === "soustraction") [a, b] = avecRetenueSous(pick([3, 4]));
  else {
    a = randomInt(123, 987);
    b = randomInt(3, 9);
  }
  const juste = op === "addition" ? a + b : op === "soustraction" ? a - b : a * b;
  const faux = juste + pick([10, -10, 100, -100].filter((x) => juste + x > 0));
  const e = `${nb(a)} ${SIGNES[op]} ${nb(b)}`;
  return {
    text: pick([
      `${p.nom} a posé ${e} et a trouvé ${nb(faux)}. ${Il(p)} s’est trompé${p.f ? "e" : ""} dans une retenue.\nQuel est le bon résultat ?`,
      `Sur le cahier ${de(p.nom)}, on lit : ${e} = ${nb(faux)}. C’est faux.\nÉcris le bon résultat.`,
      `${p.nom} annonce ${nb(faux)} pour ${e}. Refais le calcul.\nQuel est le résultat juste ?`,
      `Le résultat ${nb(faux)} pour ${e} est faux.\nPose l’opération et donne le bon résultat.`,
    ]),
    format: "short" as const,
    expected: attendus(juste),
    comparator: "number_equal" as const,
    explanation: cpe(
      "une erreur de retenue décale un chiffre du résultat.",
      "on repose l’opération colonne par colonne, en écrivant les retenues.",
      `${e} = ${nb(juste)}, et non ${nb(faux)}.`,
      `le bon résultat est ${nb(juste)}.`,
    ),
    canvas: canvasPose(op, a, b),
  };
}

// --- Défis : choisir l'opération, comparer, deux étapes.
type CtxOperation = { op: "addition" | "soustraction" | "multiplication" | "division"; t: (p: Prenom) => string };
function genChoisirOperation() {
  const p = pick(PRENOMS);
  const n1 = randomInt(120, 980);
  const n2 = randomInt(110, n1 - 10);
  const g = randomInt(12, 48);
  const k = randomInt(3, 9);
  const ctxs: CtxOperation[] = [
    { op: "addition", t: (p) => `${p.nom} a ${nb(n1)} cartes. Son cousin lui en donne ${nb(n2)}.\nQuelle opération donne le nombre de cartes ${de(p.nom)} maintenant ?` },
    { op: "addition", t: () => `Un collège reçoit ${nb(n1)} livres en septembre, puis ${nb(n2)} en octobre.\nQuelle opération donne le nombre total de livres reçus ?` },
    { op: "addition", t: (p) => `${p.nom} marche ${nb(n1)} m jusqu’au parc, puis ${nb(n2)} m jusqu’à l’école.\nQuelle opération donne la distance parcourue ?` },
    { op: "soustraction", t: () => `Une réserve contient ${nb(n1)} cahiers. On en distribue ${nb(n2)}.\nQuelle opération donne le nombre de cahiers qui restent ?` },
    { op: "soustraction", t: (p) => `${p.nom} a ${nb(n1)} points et son amie en a ${nb(n2)}.\nQuelle opération donne l’écart entre leurs points ?` },
    { op: "soustraction", t: (p) => `Un livre a ${nb(n1)} pages. ${p.nom} en a lu ${nb(n2)}.\nQuelle opération donne le nombre de pages qui restent à lire ?` },
    { op: "multiplication", t: () => `On prépare ${g} sacs avec ${k} stylos dans chaque sac.\nQuelle opération donne le nombre total de stylos ?` },
    { op: "multiplication", t: (p) => `${p.nom} achète ${k} jeux à ${g} € l’un.\nQuelle opération donne le prix total ?` },
    { op: "multiplication", t: () => `Une salle a ${g} rangées de ${k} chaises.\nQuelle opération donne le nombre de chaises ?` },
    { op: "division", t: () => `On partage ${nb(g * k)} feuilles également entre ${k} groupes.\nQuelle opération donne le nombre de feuilles par groupe ?` },
    { op: "division", t: (p) => `${p.nom} range ${nb(g * k)} œufs dans des boîtes de ${k}.\nQuelle opération donne le nombre de boîtes ?` },
    { op: "division", t: () => `${nb(g * k)} élèves sont répartis en ${k} équipes égales.\nQuelle opération donne le nombre d’élèves par équipe ?` },
  ];
  const c = pick(ctxs);
  const ops = ["addition", "soustraction", "multiplication", "division"];
  return {
    text: c.t(p),
    format: "qcm" as const,
    choices: shuffle(ops),
    expected: [c.op],
    comparator: "mcq_exact" as const,
    explanation: cpe(
      "choisir l’opération, c’est comprendre le sens du problème.",
      "on regroupe (addition), on enlève ou on compare (soustraction), on répète (multiplication), on partage ou on fait des groupes (division).",
      `ici, on ${c.op === "addition" ? "regroupe deux quantités" : c.op === "soustraction" ? "enlève ou compare" : c.op === "multiplication" ? "répète la même quantité" : "partage en parts égales ou fait des groupes"}.`,
      `il faut une ${c.op}.`,
    ),
  };
}

/** Comparer deux grandes quantités : « combien de plus ? » (une soustraction posée). */
function genComparerPose() {
  const [p, q] = (() => {
    const a = pick(PRENOMS);
    let b = pick(PRENOMS);
    while (b.nom === a.nom) b = pick(PRENOMS);
    return [a, b];
  })();
  const [A, B] = avecRetenueSous(pick([3, 4]));
  const que = (n: string) => (voyelle(n) ? `qu’${n}` : `que ${n}`);
  const sit = pick([
    { u: "", t: `Au jeu vidéo, ${p.nom} a ${nb(A)} points et ${q.nom} a ${nb(B)} points.\nCombien de points ${p.nom} a-t-${il(p)} de plus ${que(q.nom)} ?` },
    { u: "km", t: `Cette année, ${p.nom} a roulé ${nb(A)} km à vélo et ${q.nom} ${nb(B)} km.\nCombien de kilomètres ${p.nom} a-t-${il(p)} roulé de plus ?` },
    { u: "", t: `La collection ${de(p.nom)} compte ${nb(A)} timbres, celle ${de(q.nom)} ${nb(B)}.\nCombien de timbres ${q.nom} a-t-${il(q)} de moins ${que(p.nom)} ?` },
    { u: "m", t: `Un sommet mesure ${nb(A)} m. Un autre mesure ${nb(B)} m.\nQuelle est la différence de hauteur, en mètres ?` },
    { u: "", t: `Le stade de la ville de ${p.nom} a ${nb(A)} places, celui de ${q.nom} ${nb(B)}.\nCombien de places de plus a le premier stade ?` },
    { u: "", t: `Le livre ${de(p.nom)} a ${nb(A)} pages, celui ${de(q.nom)} ${nb(B)} pages.\nQuel est l’écart entre les deux livres, en pages ?` },
    { u: "€", t: `Un vélo coûte ${nb(A)} €, une trottinette ${nb(B)} €.\nDe combien d’euros le vélo est-il plus cher ?` },
    { u: "", t: `Samedi, ${nb(A)} personnes ont visité le musée. Dimanche, ${nb(B)} personnes.\nCombien de visiteurs de moins le dimanche ?` },
  ]);
  return {
    text: sit.t,
    format: "short" as const,
    expected: attendus(A - B, sit.u || undefined),
    comparator: "number_equal" as const,
    explanation: cpe(
      "pour trouver un écart (« combien de plus », « combien de moins »), on fait une soustraction.",
      "on pose la soustraction : le grand nombre moins le petit.",
      `${nb(A)} − ${nb(B)} = ${nb(A - B)}.`,
      `l’écart est ${nb(A - B)}.`,
    ),
  };
}

/** Deux étapes : prix de plusieurs objets, puis monnaie rendue ou autre achat. */
function genDeuxEtapesPose() {
  const p = pick(PRENOMS);
  const objets = pick([
    ["cahiers", 2, 6], ["places de cinéma", 6, 11], ["livres", 6, 15], ["ballons", 9, 19], ["tickets de manège", 2, 5], ["pots de peinture", 5, 12], ["paquets de graines", 2, 4], ["jeux de cartes", 4, 9],
  ] as const);
  const n = randomInt(3, 12);
  const prix = randomInt(objets[1], objets[2]);
  const total = n * prix;
  if (Math.random() < 0.5) {
    const billet = [20, 50, 100, 200, 500].find((x) => x > total)!; // 12 × 19 = 228 dépassait 200
    return {
      text: `${p.nom} achète ${n} ${objets[0]} à ${prix} € l’unité. ${Il(p)} paie avec un billet de ${billet} €.\nCombien d’euros lui rend-on ?`,
      format: "short" as const,
      expected: attendus(billet - total, "€"),
      comparator: "number_equal" as const,
      explanation: cpe(
        "un problème à deux étapes demande deux calculs.",
        "on calcule d’abord le prix total, puis la monnaie rendue.",
        `${n} × ${prix} = ${total} ; ${billet} − ${total} = ${billet - total}.`,
        `on lui rend ${billet - total} €.`,
      ),
    };
  }
  const autre = pick([["un sac", 12, 35], ["une trousse", 4, 12], ["un livre", 8, 19], ["une gourde", 6, 15]] as const);
  const c = randomInt(autre[1], autre[2]);
  return {
    text: `${p.nom} achète ${n} ${objets[0]} à ${prix} € l’unité, et ${autre[0]} à ${c} €.\nCombien paie-t-${il(p)} en tout ?`,
    format: "short" as const,
    expected: attendus(total + c, "€"),
    comparator: "number_equal" as const,
    explanation: cpe(
      "un problème à deux étapes demande deux calculs.",
      "on calcule d’abord le prix des objets identiques, puis on ajoute l’autre achat.",
      `${n} × ${prix} = ${total} ; ${total} + ${c} = ${total + c}.`,
      `${il(p)} paie ${total + c} €.`,
    ),
  };
}

export const calculPoseBank: TutorBankItemV4[] = [
  /* =========================
     POSE_ADDITION
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_addition_posee_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une addition posée, pourquoi faut-il aligner les unités sous les unités ?",
    format: "qcm",
    choices: [
      "pour additionner les chiffres de même rang",
      "pour que l’opération soit plus jolie",
      "pour additionner les chiffres au hasard",
      "pour éviter les retenues",
    ],
    expected: ["pour additionner les chiffres de même rang"],
    comparator: "mcq_exact",
    hint: "On additionne unités avec unités, dizaines avec dizaines.",
    explanation:
      "Définition : poser une addition consiste à aligner les chiffres de même rang.\n\n" +
      "Méthode : on place les unités sous les unités, les dizaines sous les dizaines, les centaines sous les centaines.\n\n" +
      "Calcul : cela permet d’additionner correctement chaque colonne.\n\n" +
      "Conclusion : il faut aligner les chiffres de même rang.",
    tags: ["entier_calcul_pose", "addition", "methode", "qcm"],
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Addition posée",
      numbers: ["247", "35"],
      result: "282",
      questionLabel: "Observe l’alignement des chiffres.",
    }),
  },

  {
    kind: "template",
    id: "6e_entier_addition_posee_tpl_1_sans_retenue",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 1,
    theme: "neutral",
    hint: "Additionne colonne par colonne.",
    tags: ["entier_calcul_pose", "addition", "template", "canvas"],
    generate: () => {
      // ★1 : sans retenue (chaque colonne fait 9 au plus).
      const [a, b] = sansRetenueAdd(Math.random() < 0.7 ? 3 : 4);
      return genPose(
        "addition",
        a,
        b,
        cpe(
          "une addition posée permet d’additionner des nombres en colonnes.",
          "on aligne les unités sous les unités, puis on additionne les unités, les dizaines, les centaines…",
          `${nb(a)} + ${nb(b)} = ${nb(a + b)} (aucune colonne ne dépasse 9).`,
          `le résultat est ${nb(a + b)}.`,
        ),
      );
    },
  },

  {
    kind: "template",
    id: "6e_entier_addition_posee_tpl_2_avec_retenue",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention à la retenue.",
    tags: ["entier_calcul_pose", "addition", "retenue", "template", "canvas"],
    // 06/10/2026 : le canvas affichait le RÉSULTAT (showResult par défaut) et
    // des retenues écrites à la main ["", "1", "1"], fausses pour d'autres nombres.
    generate: () => {
      // ★2 : au moins une retenue ; 3 + 3, 4 + 3 ou 3 + 2 chiffres.
      const [ka, kb] = pick([[3, 3], [3, 3], [4, 3], [3, 2], [4, 4]]);
      const [a, b] = avecRetenueAdd(ka, kb);
      return genPose(
        "addition",
        a,
        b,
        cpe(
          "dans une addition posée, une retenue apparaît quand une colonne dépasse 9.",
          "on additionne colonne par colonne, en commençant par les unités, et on reporte la retenue dans la colonne suivante.",
          `${nb(a)} + ${nb(b)} = ${nb(a + b)}.`,
          `le résultat est ${nb(a + b)}.`,
        ),
      );
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_addition_posee_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule 247 + 35 en écrivant 35 sous 247 sans aligner les unités. Pourquoi risque-t-il de se tromper ?",
    format: "open",
    expected: ["unités", "dizaines", "aligner", "rang", "colonnes"],
    comparator: "contains_keyword",
    hint: "Parle des unités et des dizaines.",
    explanation:
      "Définition : chaque chiffre a un rang : unités, dizaines, centaines.\n\n" +
      "Méthode : dans une addition posée, on aligne les chiffres de même rang.\n\n" +
      "Calcul : si les unités ne sont pas sous les unités, on additionne des rangs différents.\n\n" +
      "Conclusion : l’élève risque de faire une erreur d’alignement.",
    tags: ["entier_calcul_pose", "addition", "open", "erreur", "alignement"],
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Attention à l’alignement",
      numbers: ["247", "35"],
      result: "282",
      highlight: { col: 2 },
      questionLabel: "Les unités doivent être dans la même colonne.",
    }),
  },

  /* =========================
     POSE_SOUSTRACTION
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_soustraction_posee_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une soustraction posée, pourquoi faut-il aligner les chiffres de même rang ?",
    format: "qcm",
    choices: [
      "pour soustraire unités avec unités, dizaines avec dizaines",
      "pour éviter de calculer",
      "pour changer le nombre",
      "pour additionner les lignes",
    ],
    expected: ["pour soustraire unités avec unités, dizaines avec dizaines"],
    comparator: "mcq_exact",
    hint: "On travaille colonne par colonne.",
    explanation:
      "Définition : poser une soustraction consiste à organiser les chiffres par rang.\n\n" +
      "Méthode : on aligne unités, dizaines, centaines.\n\n" +
      "Calcul : on soustrait ensuite colonne par colonne.\n\n" +
      "Conclusion : l’alignement est indispensable.",
    tags: ["entier_calcul_pose", "soustraction", "methode", "qcm"],
    canvas: calculPoseCanvas({
      operation: "soustraction",
      title: "Soustraction posée",
      numbers: ["584", "231"],
      result: "353",
      display: {
      showResult: false,
      showRetenues: false,
  },
    }),
  },

  {
    kind: "template",
    id: "6e_entier_soustraction_posee_tpl_1_sans_retenue",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Soustrais colonne par colonne.",
    tags: ["entier_calcul_pose", "soustraction", "template", "canvas"],
    generate: () => {
      // ★2 : sans retenue (chaque chiffre du haut est plus grand).
      const [a, b] = sansRetenueSous(Math.random() < 0.7 ? 3 : 4);
      return genPose(
        "soustraction",
        a,
        b,
        cpe(
          "une soustraction posée permet de soustraire en colonnes.",
          "on aligne les unités, puis on soustrait les unités, les dizaines, les centaines…",
          `${nb(a)} − ${nb(b)} = ${nb(a - b)}.`,
          `le résultat est ${nb(a - b)}.`,
        ),
      );
    },
  },

{
  kind: "template",
  id: "6e_entier_soustraction_posee_tpl_2_avec_retenue",
  niveau: "6e",
  matiere: "maths",
  notionId: "entier_calcul_pose",
  microId: "entier_soustraction_posee",
  difficulty: 3,
  theme: "neutral",
  hint: "Si le chiffre du haut est trop petit, il faut utiliser une retenue.",
  tags: ["entier_calcul_pose", "soustraction", "retenue", "template", "canvas"],
  generate: () => {
    // ★3 : au moins une retenue, zéros compris (704 − 268).
    let x: number;
    let y: number;
    if (Math.random() < 0.3) {
      // Un zéro au rang des dizaines du haut : la retenue « traverse » le zéro.
      x = randomInt(2, 9) * 100 + randomInt(0, 8);
      do y = randomInt(101, x - 1);
      while (String(y).padStart(3, "0")[2] <= String(x)[2]);
    } else [x, y] = avecRetenueSous(pick([3, 3, 4]));
    return genPose(
      "soustraction",
      x,
      y,
      cpe(
        "dans une soustraction posée, une retenue sert quand le chiffre du haut est plus petit que celui du bas.",
        "on ajoute une dizaine au chiffre du haut, et on ajoute 1 au chiffre du bas de la colonne suivante.",
        `${nb(x)} − ${nb(y)} = ${nb(x - y)}.`,
        `le résultat est ${nb(x - y)}.`,
      ),
    );
  },
},

  {
    kind: "fixed",
    id: "6e_entier_soustraction_posee_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment vérifier une soustraction avec une addition.",
    format: "open",
    expected: ["addition", "résultat", "soustrait", "nombre de départ", "vérifier"],
    comparator: "contains_keyword",
    hint: "On ajoute le résultat au nombre soustrait.",
    explanation:
      "Définition : vérifier une soustraction permet de contrôler le résultat.\n\n" +
      "Méthode : on ajoute le résultat de la soustraction au nombre que l’on a soustrait.\n\n" +
      "Calcul : si 584 - 231 = 353, alors 353 + 231 = 584.\n\n" +
      "Conclusion : l’addition permet de vérifier la soustraction.",
    tags: ["entier_calcul_pose", "soustraction", "open", "verification"],
  },
    /* =========================
     POSE_MULTIPLICATION
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_multiplication_posee_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une multiplication posée, pourquoi faut-il bien aligner les chiffres ?",
    format: "qcm",
    choices: [
      "pour respecter le rang des chiffres",
      "pour éviter de multiplier",
      "pour changer le résultat",
      "pour écrire moins de chiffres",
    ],
    expected: ["pour respecter le rang des chiffres"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre a un rang : unités, dizaines, centaines.",
    explanation:
      "Définition : une multiplication posée organise les calculs par rang.\n\n" +
      "Méthode : on multiplie les chiffres en respectant leur position.\n\n" +
      "Calcul : les unités, dizaines et centaines ne représentent pas les mêmes valeurs.\n\n" +
      "Conclusion : l’alignement permet de respecter le rang des chiffres.",
    tags: ["entier_calcul_pose", "multiplication", "methode", "qcm"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication posée",
      numbers: ["124", "3"],
      result: "372",

       display: {
          showResult: false,
          showRetenues: false,
        },
    }),
  },

  {
    kind: "template",
    id: "6e_entier_multiplication_posee_tpl_1_un_chiffre",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie chaque chiffre du nombre par le chiffre du bas.",
    tags: ["entier_calcul_pose", "multiplication", "template", "canvas"],
    generate: () => {
      // ★2 : un nombre de 2 à 4 chiffres × un chiffre.
      const a = randomInt(21, Math.random() < 0.7 ? 999 : 4999);
      const b = randomInt(2, 9);
      return genPose(
        "multiplication",
        a,
        b,
        cpe(
          "une multiplication posée permet de multiplier en colonnes.",
          `on multiplie chaque chiffre de ${nb(a)} par ${b}, en commençant par les unités, et on reporte les retenues.`,
          `${nb(a)} × ${b} = ${nb(a * b)}.`,
          `le résultat est ${nb(a * b)}.`,
        ),
      );
    },
  },

  {
    kind: "template",
    id: "6e_entier_multiplication_posee_tpl_2_avec_retenue",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention aux retenues dans les colonnes.",
    tags: ["entier_calcul_pose", "multiplication", "retenue", "template", "canvas"],
    generate: () => {
      // ★3 : un nombre × un nombre de deux chiffres (deux lignes de produits partiels).
      const a = randomInt(23, 899);
      const b = randomInt(12, 89);
      return genPose(
        "multiplication",
        a,
        b,
        cpe(
          "pour multiplier par un nombre de deux chiffres, on fait deux multiplications puis une addition.",
          `on calcule ${nb(a)} × ${b % 10}, puis ${nb(a)} × ${b - (b % 10)} (on décale d’un rang), puis on additionne les deux lignes.`,
          `${nb(a)} × ${b % 10} = ${nb(a * (b % 10))} ; ${nb(a)} × ${b - (b % 10)} = ${nb(a * (b - (b % 10)))} ; ${nb(a * (b % 10))} + ${nb(a * (b - (b % 10)))} = ${nb(a * b)}.`,
          `le résultat est ${nb(a * b)}.`,
        ),
      );
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_multiplication_posee_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule 126 × 4 et oublie une retenue. Pourquoi son résultat peut-il être faux ?",
    format: "open",
    expected: ["retenue", "colonne", "multiplier", "reporter", "résultat"],
    comparator: "contains_keyword",
    hint: "Une retenue oubliée change les colonnes suivantes.",
    explanation:
      "Définition : une retenue est une quantité à reporter dans la colonne suivante.\n\n" +
      "Méthode : dans une multiplication posée, on doit reporter chaque retenue au bon endroit.\n\n" +
      "Calcul : si une retenue est oubliée, la colonne suivante n’est plus correcte.\n\n" +
      "Conclusion : oublier une retenue peut rendre tout le résultat faux.",
    tags: ["entier_calcul_pose", "multiplication", "open", "erreur", "retenue"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Erreur fréquente : retenue oubliée",
      numbers: ["126", "4"],
      result: "504",
      questionLabel: "La retenue doit être reportée.",
       display: {
          showResult: false,
          showRetenues: false,
        },
    }),
  },

  /* =========================
     POSE_DIVISION
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_division_posee_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une division euclidienne, le reste doit être...",
    format: "qcm",
    choices: [
      "plus petit que le diviseur",
      "plus grand que le diviseur",
      "égal au dividende",
      "toujours égal à 1",
    ],
    expected: ["plus petit que le diviseur"],
    comparator: "mcq_exact",
    hint: "Si le reste est trop grand, on peut encore diviser.",
    explanation:
      "Définition : dans une division euclidienne, on écrit dividende = diviseur × quotient + reste.\n\n" +
      "Méthode : on vérifie toujours que le reste est plus petit que le diviseur.\n\n" +
      "Calcul : si le reste est supérieur ou égal au diviseur, le quotient n’est pas assez grand.\n\n" +
      "Conclusion : le reste doit être plus petit que le diviseur.",
    tags: ["entier_calcul_pose", "division", "reste", "qcm"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Division euclidienne",
      numbers: ["37", "5"],
      division: {
        dividende: "37",
        diviseur: "5",
        quotient: "7",
        reste: "2",
      },
       display: {
          showResult: false,
          showRetenues: false,
        },
    }),
  },

  {
    kind: "template",
    id: "6e_entier_division_posee_tpl_1_sans_reste",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche combien de fois le diviseur rentre dans le dividende.",
    tags: ["entier_calcul_pose", "division", "template", "canvas"],
    generate: () => {
      // ★2 : division exacte par un chiffre, quotient de 2 ou 3 chiffres.
      const d = randomInt(2, 9);
      const q = randomInt(12, Math.random() < 0.6 ? 99 : 450);
      return genPose(
        "division",
        d * q,
        d,
        cpe(
          "diviser, c’est chercher combien de fois le diviseur est contenu dans le dividende.",
          "on pose la division et on cherche le quotient chiffre par chiffre, en commençant par la gauche.",
          `${d} × ${nb(q)} = ${nb(d * q)}, donc ${nb(d * q)} ÷ ${d} = ${nb(q)}.`,
          `le quotient est ${nb(q)}.`,
        ),
      );
    },
  },

  {
    kind: "template",
    id: "6e_entier_division_posee_tpl_2_avec_reste",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Le reste doit être inférieur au diviseur.",
    tags: ["entier_calcul_pose", "division", "reste", "template", "canvas"],
    generate: () => {
      // ★3 : division euclidienne (reste non nul) ; on demande le quotient OU le reste.
      const d = randomInt(3, 9);
      const q = randomInt(11, 150);
      return genEuclide(d * q + randomInt(1, d - 1), d, { situation: 0.5, canvas: true });
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_division_posee_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi, dans une division euclidienne, le reste doit être plus petit que le diviseur.",
    format: "open",
    expected: ["reste", "diviseur", "plus petit", "quotient", "encore"],
    comparator: "contains_keyword",
    hint: "Si le reste est encore plus grand que le diviseur, on peut continuer.",
    explanation:
      "Définition : une division euclidienne donne un quotient et un reste.\n\n" +
      "Méthode : le quotient doit être le plus grand possible sans dépasser le dividende.\n\n" +
      "Calcul : si le reste est supérieur ou égal au diviseur, on peut ajouter 1 au quotient.\n\n" +
      "Conclusion : le reste doit donc être plus petit que le diviseur.",
    tags: ["entier_calcul_pose", "division", "open", "raisonnement"],
  },

  /* =========================
     POSE_VERIFIER
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_calcul_verifier_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle égalité permet de vérifier la division euclidienne : 37 ÷ 5 = 7 reste 2 ?",
    format: "qcm",
    choices: [
      "37 = 5 × 7 + 2",
      "37 = 5 + 7 + 2",
      "37 = 7 × 2 + 5",
      "37 = 5 × 2 + 7",
    ],
    expected: ["37 = 5 × 7 + 2"],
    comparator: "mcq_exact",
    hint: "dividende = diviseur × quotient + reste.",
    explanation:
      "Définition : pour vérifier une division euclidienne, on utilise la relation dividende = diviseur × quotient + reste.\n\n" +
      "Méthode : on remplace par les nombres donnés.\n\n" +
      "Calcul : 5 × 7 + 2 = 35 + 2 = 37.\n\n" +
      "Conclusion : l’égalité correcte est 37 = 5 × 7 + 2.",
    tags: ["entier_calcul_pose", "verification", "division", "qcm"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Vérifier une division",
      numbers: ["37", "5"],
      division: {
        dividende: "37",
        diviseur: "5",
        quotient: "7",
        reste: "2",
      },
       display: {
          showResult: false,
          showRetenues: false,
        },
    }),
  },

  {
    kind: "template",
    id: "6e_entier_calcul_verifier_tpl_1_soustraction",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour vérifier une soustraction, on peut additionner le résultat et le nombre soustrait.",
    tags: ["entier_calcul_pose", "verification", "soustraction", "template", "canvas"],
    // Toutes les opérations inverses (+/−, ×/÷), nombres tirés.
    generate: () => genVerifierInverse(true),
  },
  {
    kind: "template",
    id: "6e_entier_calcul_verifier_tpl_3_inverse_etoile_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Fais l’opération inverse : tu dois retrouver le nombre de départ.",
    tags: ["entier_calcul_pose", "verification", "operation_inverse", "template"],
    generate: () => genVerifierInverse(false),
  },
  {
    kind: "template",
    id: "6e_entier_calcul_verifier_tpl_4_corriger_etoile_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 5,
    theme: "neutral",
    hint: "Repose l’opération et écris les retenues.",
    tags: ["entier_calcul_pose", "verification", "erreur", "template"],
    generate: () => genCorrigerErreur(),
  },

  {
    kind: "fixed",
    id: "6e_entier_calcul_verifier_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi vérifier un calcul est aussi important que trouver un résultat.",
    format: "open",
    expected: ["erreur", "vérifier", "résultat", "calcul", "corriger"],
    comparator: "contains_keyword",
    hint: "Même un bon calculateur peut faire une erreur de retenue ou d’alignement.",
    explanation:
      "Définition : vérifier un calcul consiste à contrôler si le résultat est cohérent.\n\n" +
      "Méthode : on peut refaire le calcul, utiliser l’opération inverse ou estimer le résultat.\n\n" +
      "Observation : une erreur de retenue, d’alignement ou de signe peut changer le résultat.\n\n" +
      "Conclusion : vérifier permet de repérer et corriger les erreurs.",
    tags: ["entier_calcul_pose", "verification", "open", "raisonnement"],
  },

  /* =========================
     POSE_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_calcul_pose_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un vendeur vend 126 mangues le matin et 248 mangues l’après-midi. Combien de mangues a-t-il vendues au total ?",
    format: "short",
    expected: ["374"],
    comparator: "number_equal",
    hint: "Il faut additionner les deux quantités.",
    explanation:
      "Définition : pour trouver un total, on utilise une addition.\n\n" +
      "Méthode : on pose 126 + 248 en alignant les unités, dizaines et centaines.\n\n" +
      "Calcul : 126 + 248 = 374.\n\n" +
      "Conclusion : le vendeur a vendu 374 mangues.",
    tags: ["entier_calcul_pose", "defi", "addition", "reunion"],
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Problème — marché",
      numbers: ["126", "248"],
      result: "374",
       display: {
          showResult: false,
          showRetenues: false,
        },
    }),
  },

  {
    kind: "template",
    id: "6e_entier_calcul_pose_defi_tpl_1_probleme_partage",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "C’est une situation de partage.",
    tags: ["entier_calcul_pose", "defi", "division", "probleme", "template", "canvas"],
    // Partage et groupements, avec ou sans reste ; sans canvas (il donnerait l'opération).
    generate: () => {
      const d = randomInt(3, 9);
      const q = randomInt(12, 150);
      return genEuclide(d * q + randomInt(0, d - 1), d, { situation: 1, plus: true });
    },
  },
  {
    kind: "template",
    id: "6e_entier_calcul_pose_defi_tpl_3_comparer_etoile_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "« Combien de plus ? », « combien de moins ? » : c’est un écart, donc une soustraction.",
    tags: ["entier_calcul_pose", "defi", "soustraction", "probleme", "template"],
    generate: () => genComparerPose(),
  },
  {
    kind: "template",
    id: "6e_entier_calcul_pose_defi_tpl_4_deux_etapes_etoile_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux étapes : d’abord le prix des objets identiques, puis le reste du problème.",
    tags: ["entier_calcul_pose", "defi", "probleme", "deux_etapes", "template"],
    generate: () => genDeuxEtapesPose(),
  },

  {
    kind: "fixed",
    id: "6e_entier_calcul_pose_defi_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un camarade trouve un résultat différent du tien dans un calcul posé. Que peux-tu faire pour vérifier qui a raison ?",
    format: "open",
    expected: ["vérifier", "retenue", "alignement", "opération inverse", "recalculer"],
    comparator: "contains_keyword",
    hint: "Cherche les erreurs possibles : alignement, retenues, opération inverse.",
    explanation:
      "Définition : vérifier un calcul permet de contrôler la validité d’un résultat.\n\n" +
      "Méthode : on peut refaire le calcul, vérifier les retenues, contrôler l’alignement et utiliser une opération inverse.\n\n" +
      "Observation : deux résultats différents indiquent qu’au moins un calcul doit être vérifié.\n\n" +
      "Conclusion : on doit raisonner et vérifier avant de décider qui a raison.",
    tags: ["entier_calcul_pose", "defi", "open", "verification", "raisonnement"],
  },
    /* =========================
     RENFORT — CALCUL POSÉ 6e
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_addition_posee_open_2_estimer",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Avant de poser une addition, pourquoi peut-il être utile d’estimer le résultat ?",
    format: "open",
    expected: ["estimer", "ordre de grandeur", "vérifier", "erreur", "résultat"],
    comparator: "contains_keyword",
    hint: "Une estimation aide à repérer un résultat impossible.",
    explanation:
      "Définition : estimer un résultat, c’est chercher un ordre de grandeur avant le calcul exact.\n\n" +
      "Méthode : on arrondit les nombres pour prévoir environ le résultat.\n\n" +
      "Observation : si le résultat exact est très loin de l’estimation, il faut vérifier le calcul.\n\n" +
      "Conclusion : estimer aide à repérer les erreurs.",
    tags: ["entier_calcul_pose", "addition", "open", "estimation", "verification"],
  },

  {
    kind: "template",
    id: "6e_entier_addition_posee_tpl_3_trouver_erreur",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare avec l’addition correcte.",
    tags: ["entier_calcul_pose", "addition", "erreur", "template", "canvas"],
    // 06/10/2026 : la réponse était TOUJOURS « non » (résultat − 10). Le
    // résultat annoncé est maintenant juste 2 fois sur 5.
    generate: () => {
      const [a, b] = avecRetenueAdd(pick([3, 4]), 3);
      return genVraiFaux("addition", a, b);
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_soustraction_posee_erreur_2_sens",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule 235 - 487. Que dois-tu remarquer avant de poser la soustraction en 6e ?",
    format: "open",
    expected: ["235", "487", "plus petit", "plus grand", "impossible"],
    comparator: "contains_keyword",
    hint: "Compare les deux nombres avant de soustraire.",
    explanation:
      "Définition : en 6e, on travaille souvent les soustractions où le premier nombre est plus grand que le second.\n\n" +
      "Méthode : avant de poser, on compare les deux nombres.\n\n" +
      "Observation : 235 est plus petit que 487.\n\n" +
      "Conclusion : cette soustraction ne donne pas un nombre entier positif.",
    tags: ["entier_calcul_pose", "soustraction", "open", "comparaison", "erreur"],
  },

  {
    kind: "template",
    id: "6e_entier_soustraction_posee_tpl_3_verifier_addition",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne le résultat et le nombre soustrait.",
    tags: ["entier_calcul_pose", "soustraction", "verification", "template", "canvas"],
    generate: () => {
      const [a, b] = avecRetenueSous(pick([3, 4]));
      return genVerifierSoustraction(a, b);
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_multiplication_posee_open_2_estimer",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi estimer le résultat d’une multiplication peut aider à repérer une erreur.",
    format: "open",
    expected: ["estimer", "ordre de grandeur", "multiplication", "erreur", "vérifier"],
    comparator: "contains_keyword",
    hint: "Par exemple, 198 × 4 est proche de 200 × 4.",
    explanation:
      "Définition : estimer, c’est chercher un résultat approché.\n\n" +
      "Méthode : on arrondit un nombre pour calculer mentalement un ordre de grandeur.\n\n" +
      "Calcul : par exemple, 198 × 4 est proche de 200 × 4 = 800.\n\n" +
      "Conclusion : si le résultat trouvé est très loin de 800, il faut vérifier.",
    tags: ["entier_calcul_pose", "multiplication", "open", "estimation", "verification"],
  },

  {
    kind: "template",
    id: "6e_entier_multiplication_posee_tpl_3_par_10_100",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    // ⛔ Frédéric : jamais « on ajoute un zéro » — la valeur des chiffres.
    hint: "Multiplier par 10, c’est rendre chaque chiffre 10 fois plus grand : les unités deviennent des dizaines.",
    tags: ["entier_calcul_pose", "multiplication", "10_100", "template"],
    generate: () => {
      // × 10, × 100, × 1 000 : par la valeur des chiffres (pas de canvas : on ne pose pas).
      const a = randomInt(12, 999);
      const k = pick([10, 100, 1000]);
      const rep = a * k;
      const explication = cpe(
        `multiplier par ${nb(k)} rend chaque chiffre ${nb(k)} fois plus grand.`,
        `les unités deviennent des ${k === 10 ? "dizaines" : k === 100 ? "centaines" : "milliers"}, les dizaines des ${k === 10 ? "centaines" : k === 100 ? "milliers" : "dizaines de mille"}, et ainsi de suite.`,
        `${nb(a)} × ${nb(k)} = ${nb(rep)}.`,
        `le résultat est ${nb(rep)}.`,
      );
      if (Math.random() < 0.5) {
        const p = pick(PRENOMS);
        const t = pick([
          `Un paquet contient ${nb(a)} feuilles. Le collège commande ${nb(k)} paquets.\nCombien de feuilles reçoit-il ?`,
          `Une place de cinéma coûte ${nb(a)} €. Pour une fête, la mairie en achète ${nb(k)}.\nCombien paie-t-elle ?`,
          `${p.nom} fait ${nb(a)} m à chaque tour de parc. ${Il(p)} fait ${nb(k)} tours en un mois.\nQuelle distance parcourt-${il(p)}, en mètres ?`,
          `Une boîte contient ${nb(a)} trombones. Le magasin en reçoit ${nb(k)} boîtes.\nCombien de trombones reçoit-il ?`,
          `Un carton pèse ${nb(a)} g. On en empile ${nb(k)}.\nQuelle masse cela fait-il, en grammes ?`,
          `Un carnet a ${nb(a)} pages. L’imprimerie où travaille la mère ${de(p.nom)} en fabrique ${nb(k)}.\nCombien de pages imprime-t-elle ?`,
        ]);
        const u = /€/.test(t) ? "€" : /en mètres/.test(t) ? "m" : /en grammes|grammes de miel/.test(t) ? "g" : undefined;
        return { text: t, format: "short", expected: attendus(rep, u), comparator: "number_equal", explanation: explication };
      }
      const text = pick([`Calcule : ${nb(a)} × ${nb(k)}`, `Que vaut ${nb(a)} × ${nb(k)} ?`, `Multiplie ${nb(a)} par ${nb(k)}.`, `Complète : ${nb(a)} × ${nb(k)} = …`, `Complète : ${nb(a)} × … = ${nb(rep)}`, `Écris le résultat de ${nb(k)} × ${nb(a)}.`]);
      // « a × … = résultat » : c'est le multiplicateur qui manque.
      return { text, format: "short", expected: attendus(text.includes("× … =") ? k : rep), comparator: "number_equal", explanation: explication };
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_division_posee_erreur_1_reste_trop_grand",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 47 ÷ 5 = 8 reste 7. Pourquoi cette division est-elle incorrecte ?",
    format: "open",
    expected: ["reste", "diviseur", "plus petit", "5", "7"],
    comparator: "contains_keyword",
    hint: "Le reste doit être plus petit que le diviseur.",
    explanation:
      "Définition : dans une division euclidienne, le reste doit être plus petit que le diviseur.\n\n" +
      "Méthode : on vérifie le reste.\n\n" +
      "Calcul : ici, le reste 7 est plus grand que le diviseur 5.\n\n" +
      "Conclusion : la division est incorrecte.",
    tags: ["entier_calcul_pose", "division", "open", "erreur", "reste"],
    canvas: calculPoseCanvas({
      operation: "division",
      title: "Reste trop grand",
      numbers: ["47", "5"],
      division: {
        dividende: "47",
        diviseur: "5",
        quotient: "8",
        reste: "7",
      },
      questionLabel: "Le reste doit être inférieur au diviseur.",
       display: {
          showResult: false,
          showRetenues: false,
        },
    }),
  },

  {
    kind: "template",
    id: "6e_entier_division_posee_tpl_3_verification",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise : dividende = diviseur × quotient + reste.",
    tags: ["entier_calcul_pose", "division", "verification", "template", "canvas"],
    // 06/10/2026 : un leurre (« D = q × r + d ») pouvait être VRAI par hasard ;
    // chaque leurre est maintenant calculé et écarté s'il est juste.
    generate: () => {
      const d = randomInt(3, 9);
      const q = randomInt(11, 250);
      return genVerifierDivision(d * q + randomInt(1, d - 1), d);
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_calcul_verifier_open_2_doute",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 5,
    theme: "neutral",
    text: "Un résultat te paraît étrange. Quelles vérifications peux-tu faire avant de le valider ?",
    format: "open",
    expected: ["estimer", "refaire", "opération inverse", "retenue", "alignement"],
    comparator: "contains_keyword",
    hint: "Pense à l’estimation, aux retenues et aux opérations inverses.",
    explanation:
      "Définition : vérifier un calcul, c’est contrôler sa cohérence.\n\n" +
      "Méthode : on peut estimer, refaire le calcul, vérifier les retenues, l’alignement ou utiliser une opération inverse.\n\n" +
      "Observation : ces vérifications permettent de repérer une erreur.\n\n" +
      "Conclusion : on ne valide pas un résultat sans contrôle.",
    tags: ["entier_calcul_pose", "verification", "open", "doute_raisonnable"],
  },

  {
    kind: "template",
    id: "6e_entier_calcul_pose_defi_tpl_2_choisir_operation",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche si on regroupe, enlève, multiplie ou partage.",
    tags: ["entier_calcul_pose", "defi", "choisir_operation", "template"],
    generate: () => genChoisirOperation(),
  },

  {
    kind: "fixed",
    id: "6e_entier_calcul_pose_defi_open_2_expliquer_choix",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi comprendre le problème est nécessaire avant de poser une opération.",
    format: "open",
    expected: ["comprendre", "opération", "addition", "soustraction", "choisir"],
    comparator: "contains_keyword",
    hint: "On ne pose pas une opération au hasard.",
    explanation:
      "Définition : un problème demande de choisir l’opération adaptée à la situation.\n\n" +
      "Méthode : on lit la question, on repère les données utiles et on comprend l’action demandée.\n\n" +
      "Observation : si on choisit la mauvaise opération, le calcul peut être juste mais la réponse fausse.\n\n" +
      "Conclusion : comprendre le problème est nécessaire avant de calculer.",
    tags: ["entier_calcul_pose", "defi", "open", "raisonnement", "choix_operation"],
  },
    /* =========================
     RENFORT FINAL — LANGAGE ET CONTRÔLE
  ========================= */

  {
    kind: "fixed",
    id: "6e_entier_addition_posee_open_3_rangs",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre le chiffre des unités, le chiffre des dizaines et le chiffre des centaines dans une addition posée.",
    format: "open",
    expected: ["unités", "dizaines", "centaines", "rang", "aligner"],
    comparator: "contains_keyword",
    hint: "Chaque chiffre n’a pas la même valeur selon sa position.",
    explanation:
      "Définition : le rang d’un chiffre indique sa valeur dans le nombre.\n\n" +
      "Méthode : dans une addition posée, on aligne les chiffres de même rang.\n\n" +
      "Observation : les unités valent 1, les dizaines valent 10 et les centaines valent 100.\n\n" +
      "Conclusion : connaître les rangs permet de poser correctement l’addition.",
    tags: ["entier_calcul_pose", "addition", "open", "rangs", "langage"],
  },

  {
    kind: "template",
    id: "6e_entier_addition_posee_tpl_4_nombre_decimal_simples",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_addition_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Aligne les virgules pour additionner des nombres décimaux.",
    tags: ["entier_calcul_pose", "addition", "decimal_nombre", "template", "canvas"],
    // 06/10/2026 : la réponse acceptait « 26.7 » (point anglais) ; nombres tirés.
    generate: () => genAdditionDecimaux(),
  },

  {
    kind: "fixed",
    id: "6e_entier_soustraction_posee_open_3_operation_inverse",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi dit-on que l’addition peut être l’opération inverse d’une soustraction ?",
    format: "open",
    expected: ["addition", "soustraction", "inverse", "vérifier", "résultat"],
    comparator: "contains_keyword",
    hint: "Si tu enlèves puis que tu remets, tu retrouves le nombre de départ.",
    explanation:
      "Définition : deux opérations sont inverses lorsqu’elles permettent de revenir au nombre de départ.\n\n" +
      "Méthode : après une soustraction, on peut ajouter le nombre soustrait.\n\n" +
      "Calcul : si 584 - 231 = 353, alors 353 + 231 = 584.\n\n" +
      "Conclusion : l’addition permet de vérifier et d’inverser la soustraction.",
    tags: ["entier_calcul_pose", "soustraction", "open", "operation_inverse"],
  },

  {
    kind: "template",
    id: "6e_entier_soustraction_posee_tpl_4_trouver_nombre_depart",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise l’opération inverse : résultat + nombre soustrait.",
    tags: ["entier_calcul_pose", "soustraction", "operation_inverse", "template"],
    generate: () => genNombreDepart(randomInt(105, 899), randomInt(120, 999)),
  },

  {
    kind: "fixed",
    id: "6e_entier_multiplication_posee_open_3_sens",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi une multiplication peut remplacer une addition répétée.",
    format: "open",
    expected: ["addition", "répétée", "fois", "multiplication", "même"],
    comparator: "contains_keyword",
    hint: "Par exemple, 4 + 4 + 4 peut s’écrire 3 × 4.",
    explanation:
      "Définition : une multiplication correspond souvent à une addition répétée du même nombre.\n\n" +
      "Méthode : on repère combien de fois la même quantité est répétée.\n\n" +
      "Calcul : 4 + 4 + 4 = 3 × 4.\n\n" +
      "Conclusion : la multiplication permet d’écrire plus rapidement une addition répétée.",
    tags: ["entier_calcul_pose", "multiplication", "open", "sens_operation"],
  },

  {
    kind: "template",
    id: "6e_entier_multiplication_posee_tpl_4_probleme_repetition",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Même quantité répétée plusieurs fois : c’est une multiplication.",
    tags: ["entier_calcul_pose", "multiplication", "probleme", "template"],
    // 06/10/2026 : plus seulement le marché ; plus de canvas (il donnait l'opération).
    generate: () => {
      // Les nombres sont tirés dans les bornes plausibles d'une situation.
      const s = pick(POSE_MUL);
      const a = randomInt(Math.min(6, s.amax ?? 99), Math.min(s.amax ?? 99, 99));
      const b = randomInt(s.bmin ?? 6, Math.max(s.bmin ?? 6, Math.min(s.bmax ?? 99, Math.floor(s.max / a))));
      return genPose(
        "multiplication",
        a,
        b,
        cpe(
          "lorsqu’une même quantité est répétée plusieurs fois, on utilise une multiplication.",
          "on repère le nombre de groupes et la quantité dans chaque groupe, puis on pose la multiplication.",
          `${nb(a)} × ${nb(b)} = ${nb(a * b)}.`,
          `il y en a ${nb(a * b)} en tout.`,
        ),
        { probleme: true },
      );
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_division_posee_open_2_quotient_reste",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique avec tes mots ce que représentent le quotient et le reste dans une division euclidienne.",
    format: "open",
    expected: ["quotient", "reste", "division", "partage", "ce qui reste"],
    comparator: "contains_keyword",
    hint: "Le quotient est ce qu’on obtient pour chaque part ; le reste est ce qui ne peut pas être partagé.",
    explanation:
      "Définition : dans une division euclidienne, le quotient indique le nombre de parts complètes et le reste indique ce qui reste.\n\n" +
      "Méthode : on interprète la division comme un partage ou un groupement.\n\n" +
      "Observation : le reste doit être plus petit que le diviseur.\n\n" +
      "Conclusion : quotient et reste permettent de décrire précisément le résultat de la division.",
    tags: ["entier_calcul_pose", "division", "open", "quotient", "reste"],
  },

  {
    kind: "template",
    id: "6e_entier_division_posee_tpl_4_interpreter_reste",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_division_posee",
    difficulty: 5,
    theme: "neutral",
    hint: "Le reste correspond aux objets qui ne peuvent pas être répartis équitablement.",
    tags: ["entier_calcul_pose", "division", "reste", "interpretation", "template", "canvas"],
    // Interpréter : groupes complets (quotient), ce qui reste (reste), ou
    // combien de boîtes pour TOUT ranger (quotient + 1) — le piège classique.
    generate: () => {
      const d = randomInt(4, 9);
      const q = randomInt(11, 120);
      return genEuclide(d * q + randomInt(1, d - 1), d, { situation: 1, plus: true });
    },
  },

  {
    kind: "fixed",
    id: "6e_entier_calcul_verifier_open_3_expliquer_erreur",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève trouve un résultat faux mais sa méthode semble correcte. Explique pourquoi il faut vérifier les détails du calcul.",
    format: "open",
    expected: ["retenue", "alignement", "détail", "erreur", "vérifier"],
    comparator: "contains_keyword",
    hint: "Une petite erreur dans une colonne peut changer tout le résultat.",
    explanation:
      "Définition : un calcul posé dépend de plusieurs étapes précises.\n\n" +
      "Méthode : on vérifie les alignements, les retenues et chaque colonne.\n\n" +
      "Observation : une méthode correcte peut donner un résultat faux si une petite erreur est faite.\n\n" +
      "Conclusion : vérifier les détails permet de corriger le calcul.",
    tags: ["entier_calcul_pose", "verification", "open", "erreur", "rigueur"],
  },

  {
    kind: "template",
    id: "6e_entier_calcul_verifier_tpl_2_estimation_qcm",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_verifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Arrondis pour trouver un ordre de grandeur.",
    tags: ["entier_calcul_pose", "verification", "estimation", "template"],
    generate: () => genOrdreGrandeur(),
  },

  {
    kind: "fixed",
    id: "6e_entier_calcul_pose_defi_open_3_rediger_reponse",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_pose",
    microId: "entier_calcul_pose_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Après un calcul posé dans un problème, pourquoi faut-il écrire une phrase-réponse ?",
    format: "open",
    expected: ["phrase", "réponse", "unité", "problème", "conclusion"],
    comparator: "contains_keyword",
    hint: "Le nombre seul ne suffit pas toujours à répondre au problème.",
    explanation:
      "Définition : une phrase-réponse relie le calcul au contexte du problème.\n\n" +
      "Méthode : on reprend les mots de la question et on ajoute l’unité si nécessaire.\n\n" +
      "Observation : un résultat numérique seul peut être incomplet.\n\n" +
      "Conclusion : la phrase-réponse permet de conclure clairement.",
    tags: ["entier_calcul_pose", "defi", "open", "redaction", "conclusion"],
  },

  /* ===== TOP-UP — ENTIER_CALCUL_VERIFIER ===== */
  { kind: "fixed", id: "6e_entier_calcul_verifier_topup_1", niveau: "6e", matiere: "maths", notionId: "entier_calcul_pose", microId: "entier_calcul_verifier", difficulty: 2, theme: "neutral",
    text: "Quelle addition permet de vérifier la soustraction 50 − 17 = 33 ?", format: "qcm",
    choices: ["33 + 17 = 50", "50 + 17 = 33", "33 + 50 = 17", "17 + 17 = 33"], expected: ["33 + 17 = 50"], comparator: "mcq_exact",
    hint: "résultat + nombre enlevé = nombre de départ.", explanation: cpe("on vérifie une soustraction par l’addition inverse.", "on additionne le résultat et le nombre enlevé.", "33 + 17 = 50, ce qui redonne le nombre de départ.", "la soustraction est correcte."), tags: ["entier_calcul_pose", "verifier", "qcm"] },
  { kind: "fixed", id: "6e_entier_calcul_verifier_topup_2", niveau: "6e", matiere: "maths", notionId: "entier_calcul_pose", microId: "entier_calcul_verifier", difficulty: 2, theme: "neutral",
    text: "Quelle multiplication permet de vérifier la division 24 ÷ 4 = 6 ?", format: "qcm",
    choices: ["4 × 6 = 24", "24 × 4 = 6", "6 × 24 = 4", "4 + 6 = 24"], expected: ["4 × 6 = 24"], comparator: "mcq_exact",
    hint: "diviseur × quotient = dividende.", explanation: cpe("on vérifie une division par la multiplication inverse.", "on multiplie le diviseur par le quotient.", "4 × 6 = 24, ce qui redonne le dividende.", "la division est correcte."), tags: ["entier_calcul_pose", "verifier", "qcm"] },
  { kind: "fixed", id: "6e_entier_calcul_verifier_topup_3", niveau: "6e", matiere: "maths", notionId: "entier_calcul_pose", microId: "entier_calcul_verifier", difficulty: 3, theme: "neutral",
    text: "Un élève écrit 234 + 158 = 382. Ce résultat est-il correct ?", format: "qcm",
    choices: ["non", "oui"], expected: ["non"], comparator: "mcq_exact",
    hint: "Recalcule la somme.", explanation: cpe("on vérifie une addition en recalculant.", "on additionne colonne par colonne.", "234 + 158 = 392, et non 382.", "le résultat de l’élève est faux : c’est 392."), tags: ["entier_calcul_pose", "verifier", "qcm"] },
  { kind: "fixed", id: "6e_entier_calcul_verifier_topup_4", niveau: "6e", matiere: "maths", notionId: "entier_calcul_pose", microId: "entier_calcul_verifier", difficulty: 2, theme: "neutral",
    text: "Pour vérifier le résultat d’une soustraction, on peut...", format: "qcm",
    choices: ["additionner le résultat et le nombre enlevé", "multiplier les deux nombres", "diviser par 2", "compter les chiffres"],
    expected: ["additionner le résultat et le nombre enlevé"], comparator: "mcq_exact",
    hint: "L’addition est l’opération inverse de la soustraction.", explanation: cpe("la soustraction se vérifie par l’addition inverse.", "on additionne le résultat trouvé et le nombre que l’on a enlevé.", "si on retombe sur le nombre de départ, le calcul est juste.", "on additionne le résultat et le nombre enlevé."), tags: ["entier_calcul_pose", "verifier", "qcm"] },

  /* ===== TOP-UP — ENTIER_CALCUL_POSE_DEFI ===== */
  { kind: "fixed", id: "6e_entier_calcul_pose_defi_topup_1", niveau: "6e", matiere: "maths", notionId: "entier_calcul_pose", microId: "entier_calcul_pose_defi", difficulty: 2, theme: "neutral",
    text: "Défi : pose et calcule 456 + 378.", format: "short", expected: ["834"], comparator: "number_equal",
    hint: "Aligne les unités et additionne colonne par colonne.", explanation: cpe("on pose l’addition en alignant les rangs.", "on additionne unités, dizaines, centaines avec les retenues.", "456 + 378 = 834.", "le résultat est 834."), tags: ["entier_calcul_pose", "defi", "addition"] },
  { kind: "fixed", id: "6e_entier_calcul_pose_defi_topup_2", niveau: "6e", matiere: "maths", notionId: "entier_calcul_pose", microId: "entier_calcul_pose_defi", difficulty: 3, theme: "neutral",
    text: "Défi : pose et calcule 803 − 547.", format: "short", expected: ["256"], comparator: "number_equal",
    hint: "Attention aux retenues.", explanation: cpe("on pose la soustraction en alignant les rangs.", "on soustrait colonne par colonne avec les retenues.", "803 - 547 = 256.", "le résultat est 256."), tags: ["entier_calcul_pose", "defi", "soustraction"] },
  { kind: "fixed", id: "6e_entier_calcul_pose_defi_topup_3", niveau: "6e", matiere: "maths", notionId: "entier_calcul_pose", microId: "entier_calcul_pose_defi", difficulty: 3, theme: "neutral",
    text: "Défi : pose et calcule 47 × 6.", format: "short", expected: ["282"], comparator: "number_equal",
    hint: "6 × 7, puis 6 × 4 (dizaines), avec la retenue.", explanation: cpe("on pose la multiplication.", "on multiplie chaque chiffre par 6 en gérant la retenue.", "47 × 6 = 282.", "le résultat est 282."), tags: ["entier_calcul_pose", "defi", "multiplication"] },
  { kind: "fixed", id: "6e_entier_calcul_pose_defi_topup_4", niveau: "6e", matiere: "maths", notionId: "entier_calcul_pose", microId: "entier_calcul_pose_defi", difficulty: 4, theme: "neutral",
    text: "Défi : pose et calcule 125 × 8.", format: "short", expected: ["1000", "1 000"], comparator: "number_equal",
    hint: "125 × 8, un résultat rond.", explanation: cpe("on pose la multiplication.", "on multiplie chaque chiffre de 125 par 8 avec les retenues.", "125 × 8 = 1 000.", "le résultat est 1 000."), tags: ["entier_calcul_pose", "defi", "multiplication"] },
]