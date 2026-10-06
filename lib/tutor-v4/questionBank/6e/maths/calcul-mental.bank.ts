import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

function expl(calcul: string) {
  return (
    "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
    "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

// ⭐ 06/10/2026 — DES FORMES ET DES SITUATIONS, PAS « Calcule : # + # ».
// Mesuré : 2 squelettes par micro, 18 répétitions sur 20. Chaque gabarit varie
// maintenant la FORME (« Calcule », « Que vaut… ? », « Complète », inconnue à
// une autre place, trois termes) et met une partie des tirages en situation
// (prénoms variés, contextes de la vie d'un enfant de 11 ans). La division
// s'écrit TOUJOURS « ÷ » (jamais 12/4) ; un quotient non entier s'écrit en
// décimal (14,5). Correcteurs : correcteurs/calcul-mental.ts.
import { PRENOMS, pick, de, type Prenom } from "./entiers.bank";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/** Écriture française : virgule décimale, espace des milliers à partir de 1 000. */
export function nb(n: number) {
  const [e, d] = String(Math.round(n * 1000) / 1000).split(".");
  const ent = e.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return d ? `${ent},${d}` : ent;
}
export const il = (p: Prenom) => (p.f ? "elle" : "il");
export const Il = (p: Prenom) => (p.f ? "Elle" : "Il");

/** Une expression à calculer, posée sous une forme tirée au hasard. */
function formeCalcul(expr: string, enMots: string[] = []) {
  return pick([
    // Pas « Calcule : … » ni « Effectue », « Fais ce calcul », « Calcule sans
    // poser l’opération », « Donne le résultat de », « Quel est le résultat de » :
    // ce sont les consignes des items figés, on ne les rejoue pas.
    `Calcule mentalement : ${expr}`,
    `Que vaut ${expr} ?`,
    `Donne la valeur de ${expr}.`,
    `Complète : ${expr} = …`,
    `Complète : … = ${expr}`,
    `Trouve le résultat de ${expr}.`,
    `Combien font ${expr} ?`,
    `Calcule de tête : ${expr}`,
    `Écris le résultat : ${expr}`,
    ...enMots,
  ]);
}
/** Les réponses acceptées : le nombre, en écriture française et brute. */
export function attendus(n: number, unite?: string) {
  const s = nb(n);
  const r = [s];
  // L'écriture brute sans espace (« 1600 ») ; jamais le point anglais (« 28.6 »).
  if (String(n) !== s && !String(n).includes(".")) r.push(String(n));
  if (unite) r.push(`${s} ${unite}`);
  return r;
}

// --- Situations : chaque phrase écrit EXACTEMENT les nombres donnés, rien d'autre en chiffres.
/** `max` : plus grand nombre plausible dans la situation ; `bmin`/`bmax` : bornes du second nombre (un prix, une longueur de tour…). */
export type Situ2 = { max: number; amax?: number; bmin?: number; bmax?: number; unite?: string; t: (p: Prenom, a: string, b: string) => string };
export const situOk = (s: Situ2, plusGrand: number, b: number, a = 0) =>
  s.max >= plusGrand && b >= (s.bmin ?? 0) && b <= (s.bmax ?? Infinity) && a <= (s.amax ?? Infinity);

// Addition : la réponse est la somme des deux nombres.
const SITU_ADD: Situ2[] = [
  { max: 400, t: (p, a, b) => `${p.nom} a ${a} billes. ${Il(p)} en gagne ${b} à la récréation.\nCombien de billes a-t-${il(p)} maintenant ?` },
  { max: 900, t: (p, a, b) => `${p.nom} a lu ${a} pages lundi et ${b} pages mardi.\nCombien de pages a-t-${il(p)} lues en tout ?` },
  { max: 150, unite: "km", t: (p, a, b) => `À vélo, ${p.nom} roule ${a} km le matin et ${b} km l’après-midi.\nCombien de kilomètres a-t-${il(p)} parcourus ?` },
  { max: 2000, t: (p, a, b) => `Au jeu vidéo, ${p.nom} marque ${a} points, puis ${b} points.\nCombien de points a-t-${il(p)} en tout ?` },
  { max: 400, t: (p, a, b) => `La bibliothèque de la classe a ${a} livres. ${p.nom} en apporte ${b}.\nCombien de livres y a-t-il maintenant ?` },
  { max: 90, t: (_p, a, b) => `Le bus transporte ${a} passagers. À l’arrêt, ${b} personnes montent. Personne ne descend.\nCombien de passagers y a-t-il dans le bus ?` },
  { max: 300, t: (p, a, b) => `Au jardin, ${p.nom} cueille ${a} fraises samedi et ${b} fraises dimanche.\nCombien de fraises a-t-${il(p)} cueillies ?` },
  { max: 300, unite: "€", t: (p, a, b) => `Dans sa tirelire, ${p.nom} a ${a} €. Sa grand-mère lui donne ${b} €.\nCombien d’euros a-t-${il(p)} maintenant ?` },
  { max: 300, t: (p, a, b) => `À la kermesse, ${p.nom} vend ${a} crêpes le matin et ${b} crêpes l’après-midi.\nCombien de crêpes a-t-${il(p)} vendues ?` },
  { max: 500, t: (p, a, b) => `Au parc, ${p.nom} compte ${a} oiseaux dans la volière et ${b} oiseaux près du bassin.\nCombien d’oiseaux a-t-${il(p)} comptés ?` },
  { max: 600, t: (_p, a, b) => `Un train transporte ${a} voyageurs. À la gare, ${b} voyageurs montent. Personne ne descend.\nCombien de voyageurs y a-t-il maintenant ?` },
  { max: 500, t: (p, a, b) => `${p.nom} range ${a} photos dans un album et ${b} photos dans un autre.\nCombien de photos a-t-${il(p)} rangées ?` },
  { max: 600, unite: "s", t: (p, a, b) => `À la chorale, ${p.nom} chante un chant de ${a} secondes puis un chant de ${b} secondes.\nCombien de secondes a-t-${il(p)} chanté ?` },
  { max: 800, unite: "g", t: (p, a, b) => `Pour un gâteau, ${p.nom} met ${a} g de farine et ${b} g de sucre.\nQuelle masse cela fait-il en tout, en grammes ?` },
  { max: 900, unite: "m", t: (p, a, b) => `À la piscine, ${p.nom} nage ${a} m puis ${b} m.\nQuelle distance a-t-${il(p)} nagée, en mètres ?` },
  { max: 400, t: (p, a, b) => `${p.nom} colle ${a} autocollants dans son album. Un ami lui en donne ${b} de plus.\nCombien d’autocollants a-t-${il(p)} maintenant ?` },
  { max: 2000, t: (_p, a, b) => `Au stade, ${a} supporters sont assis en tribune nord et ${b} en tribune sud.\nCombien de supporters y a-t-il dans ces deux tribunes ?` },
  { max: 300, unite: "min", t: (p, a, b) => `${p.nom} joue du piano ${a} minutes samedi et ${b} minutes dimanche.\nCombien de minutes a-t-${il(p)} joué ?` },
];

/** Addition à deux termes : en situation (40 %), en calcul (forme variée), ou avec l'inconnue. */
function genAddition(a: number, b: number) {
  const s = a + b;
  const situations = SITU_ADD.filter((x) => x.max >= s);
  const r = Math.random();
  if (r < 0.55 && situations.length) {
    const sit = pick(situations);
    const p = pick(PRENOMS);
    return {
      text: sit.t(p, nb(a), nb(b)),
      format: "short" as const,
      expected: attendus(s, sit.unite),
      comparator: "number_equal" as const,
      explanation: expl(`On ajoute : ${nb(a)} + ${nb(b)} = ${nb(s)}.`),
    };
  }
  if (r < 0.7) {
    // L'inconnue ailleurs : a + … = s ou … + b = s.
    const gauche = Math.random() < 0.5;
    return {
      text: `${pick(["Complète :", "Trouve le nombre qui manque :", "Quel nombre manque ?"])} ${gauche ? `… + ${nb(b)}` : `${nb(a)} + …`} = ${nb(s)}`,
      format: "short" as const,
      expected: attendus(gauche ? a : b),
      comparator: "number_equal" as const,
      explanation: expl(`On cherche ce qu’il faut ajouter : ${nb(s)} − ${nb(gauche ? b : a)} = ${nb(gauche ? a : b)}.`),
    };
  }
  const [x, y] = Math.random() < 0.3 ? [b, a] : [a, b];
  return {
    text: formeCalcul(`${nb(x)} + ${nb(y)}`, [
      `Ajoute ${nb(y)} à ${nb(x)}.`,
      `Quelle est la somme de ${nb(x)} et de ${nb(y)} ?`,
      `Calcule la somme de ${nb(x)} et ${nb(y)}.`,
    ]),
    format: "short" as const,
    expected: attendus(s),
    comparator: "number_equal" as const,
    explanation: expl(`On passe par un nombre rond : ${nb(x)} + ${nb(y)} = ${nb(s)}.`),
  };
}

/** Trois termes dont deux se complètent (25 + 38 + 75) : on les regroupe. */
function genAdditionTrois() {
  const paires = [[25, 75], [15, 85], [36, 64], [42, 58], [17, 83], [250, 750], [125, 75], [48, 52], [33, 67], [140, 60], [26, 74], [61, 39]];
  const [u, v] = pick(paires);
  let w = randomInt(12, 99);
  while (w === u || w === v) w = randomInt(12, 99);
  // Les deux termes qui se complètent ne sont pas côte à côte : c'est l'astuce.
  const ordre = Math.random() < 0.5 ? [u, w, v] : [v, w, u];
  const s = u + v + w;
  return {
    text: pick([
      formeCalcul(ordre.map(nb).join(" + ")),
      `Calcule astucieusement : ${ordre.map(nb).join(" + ")}`,
    ]),
    format: "short" as const,
    expected: attendus(s),
    comparator: "number_equal" as const,
    explanation: expl(`On regroupe les termes qui font un nombre rond : ${nb(u)} + ${nb(v)} = ${nb(u + v)}, puis ${nb(u + v)} + ${nb(w)} = ${nb(s)}.`),
  };
}

// Soustraction : la réponse est le premier nombre moins le second (a > b).
const SITU_SOUS: Situ2[] = [
  { max: 400, t: (p, a, b) => `${p.nom} a ${a} billes. ${Il(p)} en perd ${b}.\nCombien de billes lui reste-t-il ?` },
  { max: 900, t: (p, a, b) => `Un livre a ${a} pages. ${p.nom} en a déjà lu ${b}.\nCombien de pages lui reste-t-il à lire ?` },
  { max: 300, unite: "€", t: (p, a, b) => `${p.nom} a ${a} €. ${Il(p)} achète un jeu à ${b} €.\nCombien d’euros lui reste-t-il ?` },
  { max: 90, t: (_p, a, b) => `Le bus transporte ${a} passagers. À l’arrêt, ${b} passagers descendent. Personne ne monte.\nCombien de passagers reste-t-il ?` },
  { max: 200, t: (p, a, b) => `Une boîte contient ${a} crayons. ${p.nom} en distribue ${b} à la classe.\nCombien de crayons reste-t-il dans la boîte ?` },
  { max: 300, unite: "km", t: (p, a, b) => `${p.nom} doit parcourir ${a} km à vélo cette semaine. ${Il(p)} a déjà roulé ${b} km.\nCombien de kilomètres lui reste-t-il ?` },
  { max: 2000, t: (p, a, b) => `Au jeu vidéo, ${p.nom} a ${a} points. ${Il(p)} perd ${b} points.\nCombien de points a-t-${il(p)} maintenant ?` },
  { max: 900, unite: "cm", t: (p, a, b) => `Une pelote de ficelle mesure ${a} cm. ${p.nom} en coupe ${b} cm pour sa cabane.\nQuelle longueur reste-t-il, en centimètres ?` },
  { max: 200, t: (p, a, b) => `Le panier contient ${a} mangues. ${p.nom} en donne ${b} à ses voisins.\nCombien de mangues reste-t-il dans le panier ?` },
  { max: 1000, unite: "g", t: (p, a, b) => `${p.nom} a un paquet de ${a} g de farine. ${Il(p)} en utilise ${b} g pour des crêpes.\nCombien de grammes de farine reste-t-il ?` },
  { max: 400, unite: "L", t: (_p, a, b) => `Un aquarium contient ${a} L d’eau. Pour le nettoyer, on en retire ${b} L.\nCombien de litres d’eau reste-t-il ?` },
  { max: 400, t: (p, a, b) => `${p.nom} a ${a} autocollants. ${Il(p)} en donne ${b} à un ami.\nCombien d’autocollants lui reste-t-il ?` },
  { max: 900, t: (_p, a, b) => `Le parking du supermarché a ${a} places. ${b} voitures sont garées.\nCombien de places sont libres ?` },
  { max: 180, unite: "min", t: (p, a, b) => `${p.nom} a ${a} minutes pour faire ses devoirs et jouer. Les devoirs prennent ${b} minutes.\nCombien de minutes lui reste-t-il pour jouer ?` },
  { max: 900, unite: "m", t: (p, a, b) => `La randonnée ${de(p.nom)} monte de ${a} m. ${Il(p)} a déjà monté ${b} m.\nCombien de mètres lui reste-t-il à monter ?` },
  { max: 600, t: (_p, a, b) => `Une école a commandé ${a} gourdes. ${b} gourdes ont déjà été distribuées.\nCombien de gourdes reste-t-il à distribuer ?` },
  { max: 900, t: (p, a, b) => `Pour la kermesse, ${p.nom} a imprimé ${a} tickets. ${b} tickets sont vendus.\nCombien de tickets reste-t-il à vendre ?` },
  { max: 500, t: (_p, a, b) => `Un ferry peut transporter ${a} passagers. ${b} passagers sont déjà à bord.\nCombien de passagers peut-il encore accueillir ?` },
];

/** Soustraction a − b : en situation, en calcul (forme variée), ou avec l'inconnue. */
function genSoustraction(a: number, b: number) {
  const d = a - b;
  const situations = SITU_SOUS.filter((x) => x.max >= a);
  const r = Math.random();
  if (r < 0.55 && situations.length) {
    const sit = pick(situations);
    const p = pick(PRENOMS);
    return {
      text: sit.t(p, nb(a), nb(b)),
      format: "short" as const,
      expected: attendus(d, sit.unite),
      comparator: "number_equal" as const,
      explanation: expl(`On enlève : ${nb(a)} − ${nb(b)} = ${nb(d)}.`),
    };
  }
  if (r < 0.7) {
    const premier = Math.random() < 0.5;
    return {
      text: `${pick(["Complète :", "Trouve le nombre qui manque :", "Quel nombre manque ?"])} ${premier ? `… − ${nb(b)}` : `${nb(a)} − …`} = ${nb(d)}`,
      format: "short" as const,
      expected: attendus(premier ? a : b),
      comparator: "number_equal" as const,
      explanation: premier
        ? expl(`On remonte : ${nb(d)} + ${nb(b)} = ${nb(a)}.`)
        : expl(`On cherche ce qu’on a enlevé : ${nb(a)} − ${nb(d)} = ${nb(b)}.`),
    };
  }
  return {
    text: formeCalcul(`${nb(a)} − ${nb(b)}`, [
      `Retire ${nb(b)} de ${nb(a)}.`,
      `Quelle est la différence entre ${nb(a)} et ${nb(b)} ?`,
      `Enlève ${nb(b)} à ${nb(a)}.`,
    ]),
    format: "short" as const,
    expected: attendus(d),
    comparator: "number_equal" as const,
    explanation: expl(`On passe par un nombre rond : ${nb(a)} − ${nb(b)} = ${nb(d)}.`),
  };
}

// Multiplication : a groupes de b ; la réponse est le produit.
const SITU_MUL: Situ2[] = [
  { max: 400, t: (p, a, b) => `${p.nom} achète ${a} paquets de ${b} images.\nCombien d’images a-t-${il(p)} ?` },
  { max: 600, t: (_p, a, b) => `Dans la salle de spectacle, il y a ${a} rangées de ${b} chaises.\nCombien y a-t-il de chaises ?` },
  { max: 120, bmax: 12, t: (p, a, b) => `La boîte de chocolats ${de(p.nom)} a ${a} rangées de ${b} chocolats.\nCombien de chocolats contient-elle ?` },
  { max: 5000, bmin: 100, unite: "m", t: (p, a, b) => `${p.nom} fait ${a} tours de piste. Un tour mesure ${b} m.\nQuelle distance parcourt-${il(p)}, en mètres ?` },
  { max: 200, bmax: 6, unite: "€", t: (p, a, b) => `${p.nom} achète ${a} cahiers à ${b} € l’un.\nCombien paie-t-${il(p)} ?` },
  { max: 600, t: (p, a, b) => `${p.nom} lit ${b} pages par jour pendant ${a} jours.\nCombien de pages lit-${il(p)} en tout ?` },
  { max: 600, t: (_p, a, b) => `Pour la sortie, l’école réserve ${a} cars. Chaque car transporte ${b} élèves.\nCombien d’élèves partent en sortie ?` },
  { max: 500, t: (_p, a, b) => `Au verger, il y a ${a} rangées de ${b} pommiers.\nCombien y a-t-il de pommiers ?` },
  { max: 600, t: (p, a, b) => `${p.nom} range ses timbres : ${a} pages de ${b} timbres.\nCombien de timbres a-t-${il(p)} ?` },
  { max: 2000, bmin: 20, unite: "g", t: (p, a, b) => `Pour un gâteau, il faut ${b} g de beurre. ${p.nom} fait ${a} gâteaux pour la fête.\nCombien de grammes de beurre faut-il ?` },
  { max: 400, t: (_p, a, b) => `Le professeur d’arts plastiques achète ${a} boîtes de ${b} feutres.\nCombien de feutres a-t-il ?` },
  { max: 300, bmax: 20, unite: "€", t: (p, a, b) => `${p.nom} met ${b} € de côté chaque semaine, pendant ${a} semaines.\nCombien d’euros a-t-${il(p)} économisés ?` },
  { max: 400, t: (_p, a, b) => `Un immeuble a ${a} étages. Chaque étage a ${b} fenêtres.\nCombien de fenêtres a l’immeuble ?` },
  { max: 300, t: (p, a, b) => `Au potager, ${p.nom} plante ${a} rangs de ${b} salades.\nCombien de salades plante-t-${il(p)} ?` },
  { max: 900, t: (_p, a, b) => `Un train a ${a} wagons de ${b} places.\nCombien de places y a-t-il dans le train ?` },
  { max: 600, t: (p, a, b) => `À la corde à sauter, ${p.nom} fait ${a} séries de ${b} sauts.\nCombien de sauts fait-${il(p)} ?` },
  { max: 900, bmax: 30, unite: "kg", t: (_p, a, b) => `Un apiculteur a ${a} ruches. Chaque ruche donne ${b} kg de miel.\nCombien de kilogrammes de miel récolte-t-il ?` },
  { max: 500, bmax: 30, unite: "km", t: (p, a, b) => `${p.nom} fait ${b} km à vélo chaque jour, pendant ${a} jours.\nCombien de kilomètres parcourt-${il(p)} ?` },
];

/** Multiplication a × b : en situation, en calcul (forme variée), ou avec l'inconnue. */
function genMultiplication(a: number, b: number) {
  const pr = a * b;
  const situations = SITU_MUL.filter((x) => situOk(x, pr, b) && a <= 50);
  const r = Math.random();
  if (r < 0.55 && situations.length) {
    const sit = pick(situations);
    const p = pick(PRENOMS);
    return {
      text: sit.t(p, nb(a), nb(b)),
      format: "short" as const,
      expected: attendus(pr, sit.unite),
      comparator: "number_equal" as const,
      explanation: expl(`${nb(a)} groupes de ${nb(b)} : ${nb(a)} × ${nb(b)} = ${nb(pr)}.`),
    };
  }
  if (r < 0.7) {
    const premier = Math.random() < 0.5;
    return {
      text: `${pick(["Complète :", "Trouve le nombre qui manque :", "Quel nombre manque ?"])} ${premier ? `… × ${nb(b)}` : `${nb(a)} × …`} = ${nb(pr)}`,
      format: "short" as const,
      expected: attendus(premier ? a : b),
      comparator: "number_equal" as const,
      explanation: expl(`On cherche dans la table : ${nb(a)} × ${nb(b)} = ${nb(pr)}. Le nombre qui manque est ${nb(premier ? a : b)}.`),
    };
  }
  const [x, y] = Math.random() < 0.4 ? [b, a] : [a, b];
  return {
    text: formeCalcul(`${nb(x)} × ${nb(y)}`, [
      `Multiplie ${nb(x)} par ${nb(y)}.`,
      `Quel est le produit de ${nb(x)} par ${nb(y)} ?`,
      `Combien font ${nb(x)} fois ${nb(y)} ?`,
    ]),
    format: "short" as const,
    expected: attendus(pr),
    comparator: "number_equal" as const,
    explanation: expl(`${nb(x)} × ${nb(y)} = ${nb(pr)}.`),
  };
}

// Division : a partagé en b parts égales (ou en groupes de b) ; la réponse est a ÷ b.
// `max` borne a ; `bmax` borne le diviseur.
const SITU_DIV: Situ2[] = [
  { max: 200, bmax: 10, t: (p, a, b) => `${p.nom} partage ${a} billes entre ${b} amis, en parts égales.\nCombien de billes reçoit chaque ami ?` },
  { max: 400, bmax: 10, t: (_p, a, b) => `Au gymnase, ${a} élèves forment des équipes de ${b}.\nCombien d’équipes y a-t-il ?` },
  { max: 900, bmax: 20, unite: "cm", t: (p, a, b) => `${p.nom} coupe un ruban de ${a} cm en ${b} morceaux de même longueur.\nQuelle est la longueur d’un morceau, en centimètres ?` },
  { max: 300, bmax: 12, t: (p, a, b) => `${p.nom} range ${a} œufs dans des boîtes de ${b}.\nCombien de boîtes remplit-${il(p)} ?` },
  { max: 200, bmax: 8, unite: "€", t: (_p, a, b) => `${b} amis se partagent l’addition du restaurant : ${a} €, à parts égales.\nCombien paie chacun ?` },
  { max: 600, bmax: 30, t: (p, a, b) => `${p.nom} lit un livre de ${a} pages en ${b} jours. ${Il(p)} lit autant de pages chaque jour.\nCombien de pages lit-${il(p)} par jour ?` },
  { max: 400, bmax: 20, t: (_p, a, b) => `Le jardinier plante ${a} arbres en ${b} rangées égales.\nCombien d’arbres y a-t-il dans chaque rangée ?` },
  { max: 400, bmax: 12, t: (p, a, b) => `${p.nom} colle ${a} photos dans un album, ${b} par page.\nCombien de pages remplit-${il(p)} ?` },
  { max: 2000, bmax: 8, unite: "m", t: (_p, a, b) => `Un relais de ${a} m se court à ${b} coureurs. Chacun court la même distance.\nQuelle distance court chaque coureur, en mètres ?` },
  { max: 300, bmax: 30, t: (_p, a, b) => `Le professeur distribue ${a} feuilles à ${b} élèves, autant à chacun.\nCombien de feuilles reçoit chaque élève ?` },
  { max: 200, bmax: 10, unite: "cL", t: (p, a, b) => `${p.nom} verse ${a} cL de jus dans ${b} verres, autant dans chacun.\nCombien de centilitres y a-t-il dans chaque verre ?` },
  { max: 300, bmax: 10, t: (p, a, b) => `${p.nom} a ${a} perles. ${Il(p)} fait ${b} bracelets avec le même nombre de perles.\nCombien de perles y a-t-il sur chaque bracelet ?` },
  { max: 300, bmax: 15, unite: "km", t: (_p, a, b) => `Un randonneur parcourt ${a} km en ${b} jours, la même distance chaque jour.\nCombien de kilomètres fait-il par jour ?` },
  { max: 400, bmax: 20, t: (_p, a, b) => `${a} bonbons sont répartis dans ${b} sachets identiques.\nCombien de bonbons y a-t-il dans chaque sachet ?` },
  { max: 900, bmax: 12, t: (p, a, b) => `Pour la fête, ${p.nom} range ${a} gobelets en piles de ${b}.\nCombien de piles fait-${il(p)} ?` },
  { max: 600, bmax: 10, unite: "g", t: (p, a, b) => `${p.nom} partage ${a} g de pâte à modeler en ${b} boules de même masse.\nQuelle est la masse d’une boule, en grammes ?` },
  { max: 120, bmax: 12, t: (_p, a, b) => `Une tablette de ${a} carrés de chocolat est partagée entre ${b} enfants, à parts égales.\nCombien de carrés reçoit chaque enfant ?` },
];

/** Division a ÷ b : en situation, en calcul (forme variée), ou avec l'inconnue. Quotient décimal possible (÷ 10). */
function genDivision(a: number, b: number) {
  const q = Math.round((a / b) * 1000) / 1000;
  const entier = Number.isInteger(q);
  // Un quotient décimal n'a de sens que pour une grandeur qui se coupe (cm, g, m…).
  const situations = SITU_DIV.filter((x) => situOk(x, a, b) && (entier || !!x.unite));
  const r = Math.random();
  if (r < 0.55 && situations.length) {
    const sit = pick(situations);
    const p = pick(PRENOMS);
    return {
      text: sit.t(p, nb(a), nb(b)),
      format: "short" as const,
      expected: attendus(q, sit.unite),
      comparator: "number_equal" as const,
      explanation: expl(`On partage : ${nb(a)} ÷ ${nb(b)} = ${nb(q)}, car ${nb(b)} × ${nb(q)} = ${nb(a)}.`),
    };
  }
  if (r < 0.7 && entier) {
    const forme = randomInt(0, 2);
    const blanc = forme === 0 ? `… ÷ ${nb(b)} = ${nb(q)}` : forme === 1 ? `${nb(a)} ÷ … = ${nb(q)}` : `${nb(b)} × … = ${nb(a)}`;
    const rep = forme === 0 ? a : forme === 1 ? b : q;
    return {
      text: `${pick(["Complète :", "Trouve le nombre qui manque :", "Quel nombre manque ?"])} ${blanc}`,
      format: "short" as const,
      expected: attendus(rep),
      comparator: "number_equal" as const,
      explanation: expl(`${nb(b)} × ${nb(q)} = ${nb(a)}, donc ${nb(a)} ÷ ${nb(b)} = ${nb(q)}. Le nombre qui manque est ${nb(rep)}.`),
    };
  }
  return {
    text: formeCalcul(`${nb(a)} ÷ ${nb(b)}`, [
      `Divise ${nb(a)} par ${nb(b)}.`,
      `Quel est le quotient de ${nb(a)} par ${nb(b)} ?`,
      `Partage ${nb(a)} en ${nb(b)} parts égales. Combien vaut une part ?`,
    ]),
    format: "short" as const,
    expected: attendus(q),
    comparator: "number_equal" as const,
    explanation: expl(`On cherche le nombre qui, multiplié par ${nb(b)}, donne ${nb(a)} : ${nb(a)} ÷ ${nb(b)} = ${nb(q)}.`),
  };
}

// --- Stratégies : double, moitié, triple, quart (le mot porte l'opération).
const OPERATIONS_MOTS = [
  { mot: "double", art: "le", f: (n: number) => n * 2, ok: (_n: number) => true },
  { mot: "moitié", art: "la", f: (n: number) => n / 2, ok: (n: number) => n % 2 === 0 },
  { mot: "triple", art: "le", f: (n: number) => n * 3, ok: (n: number) => n <= 40 },
  { mot: "quart", art: "le", f: (n: number) => n / 4, ok: (n: number) => n % 4 === 0 },
];
type SituMot = { max: number; unite?: string; t: (p: Prenom, n: string, art: string, mot: string) => string };
const SITU_MOTS: SituMot[] = [
  { max: 200, t: (p, n, art, mot) => `${p.nom} a ${n} billes. Son frère en a ${art} ${mot}.\nCombien de billes a son frère ?` },
  { max: 400, unite: "€", t: (p, n, art, mot) => `Un vélo coûte ${n} €. Le casque de ${p.nom} coûte ${art} ${mot} de ce prix.\nCombien coûte le casque ?` },
  { max: 900, unite: "m", t: (p, n, art, mot) => `${p.nom} a couru ${n} m. Sa cousine a couru ${art} ${mot} de cette distance.\nQuelle distance a couru sa cousine, en mètres ?` },
  { max: 200, t: (p, n, art, mot) => `${p.nom} a ${n} cartes. Son amie en a ${art} ${mot}.\nCombien de cartes a son amie ?` },
  { max: 300, unite: "cm", t: (p, n, art, mot) => `La plante ${de(p.nom)} mesure ${n} cm. Celle de sa voisine mesure ${art} ${mot}.\nCombien mesure la plante de la voisine, en centimètres ?` },
  { max: 600, unite: "g", t: (p, n, art, mot) => `La recette de ${p.nom} demande ${n} g de farine. ${Il(p)} fait ${art} ${mot} de la recette.\nCombien de grammes de farine utilise-t-${il(p)} ?` },
  { max: 500, t: (p, n, art, mot) => `Au jeu, ${p.nom} a ${n} points. ${Il(p)} gagne une carte qui donne ${art} ${mot} de ses points.\nCombien de points donne cette carte ?` },
  { max: 300, t: (_p, n, art, mot) => `Un livre a ${n} pages. Un autre livre en a ${art} ${mot}.\nCombien de pages a l’autre livre ?` },
  { max: 200, unite: "min", t: (p, n, art, mot) => `Le trajet ${de(p.nom)} pour aller au club dure ${n} minutes. Celui de son ami dure ${art} ${mot} de ce temps.\nCombien de minutes dure le trajet de son ami ?` },
  { max: 200, unite: "L", t: (_p, n, art, mot) => `Un bassin contient ${n} L d’eau. Un autre bassin en contient ${art} ${mot}.\nCombien de litres contient l’autre bassin ?` },
];

/** « Quel est le double de 35 ? » et ses cousins, ou en situation. */
function genMotOperation(n: number) {
  const op = pick(OPERATIONS_MOTS.filter((o) => o.ok(n)));
  const rep = op.f(n);
  const situations = SITU_MOTS.filter((s) => s.max >= Math.max(n, rep));
  const quel = op.art === "la" ? "Quelle est" : "Quel est";
  const explication = expl(
    op.mot === "double" ? `Le double, c’est × 2 : ${nb(n)} × 2 = ${nb(rep)}.`
    : op.mot === "triple" ? `Le triple, c’est × 3 : ${nb(n)} × 3 = ${nb(rep)}.`
    : op.mot === "moitié" ? `La moitié, c’est ÷ 2 : ${nb(n)} ÷ 2 = ${nb(rep)}.`
    : `Le quart, c’est la moitié de la moitié : ${nb(n)} ÷ 4 = ${nb(rep)}.`,
  );
  if (Math.random() < 0.55 && situations.length) {
    const s = pick(situations);
    // « le double de cette distance » se dit, « la moitié de ce prix » aussi.
    return { text: s.t(pick(PRENOMS), nb(n), op.art, op.mot), format: "short" as const, expected: attendus(rep, s.unite), comparator: "number_equal" as const, explanation: explication };
  }
  return {
    text: pick([
      `${quel} ${op.art} ${op.mot} de ${nb(n)} ?`,
      `Calcule ${op.art} ${op.mot} de ${nb(n)}.`,
      `Écris ${op.art} ${op.mot} de ${nb(n)}.`,
      `Trouve ${op.art} ${op.mot} de ${nb(n)}.`,
      `Combien fait ${op.art} ${op.mot} de ${nb(n)} ?`,
    ]),
    format: "short" as const,
    expected: attendus(rep),
    comparator: "number_equal" as const,
    explanation: explication,
  };
}

/** × 10, × 100, ÷ 10, ÷ 100 avec des décimaux : par la valeur des chiffres. */
function genFoisDix() {
  const p = pick(PRENOMS);
  const fois = Math.random() < 0.5;
  const k = pick([10, 100]);
  if (fois) {
    const x = randomInt(11, 999) / 100; // 0,11 à 9,99
    const rep = Math.round(x * k * 100) / 100;
    const explication = expl(`Chaque chiffre prend une valeur ${k} fois plus grande : ${nb(x)} × ${k} = ${nb(rep)}.`);
    if (Math.random() < 0.45) {
      const s = pick([
        { u: "€", t: `Un stylo coûte ${nb(x)} €. ${p.nom} en achète ${k} pour la classe.\nCombien paie-t-${il(p)} ?` },
        { u: "kg", t: `Un sac de billes pèse ${nb(x)} kg. ${p.nom} empile ${k} sacs identiques.\nQuelle masse cela fait-il, en kilogrammes ?` },
        { u: "m", t: `Une dalle mesure ${nb(x)} m de long. ${p.nom} en aligne ${k}.\nQuelle longueur cela fait-il, en mètres ?` },
        { u: "L", t: `Une gourde contient ${nb(x)} L. Le club de sport ${de(p.nom)} remplit ${k} gourdes.\nCombien de litres faut-il ?` },
      ]);
      return { text: s.t, format: "short" as const, expected: attendus(rep, s.u), comparator: "number_equal" as const, explanation: explication };
    }
    return { text: formeCalcul(`${nb(x)} × ${k}`, [`Multiplie ${nb(x)} par ${k}.`]), format: "short" as const, expected: attendus(rep), comparator: "number_equal" as const, explanation: explication };
  }
  const a = randomInt(k + 1, 999); // le nombre partagé reste plus grand que le diviseur
  const rep = Math.round((a / k) * 1000) / 1000;
  const explication = expl(`Chaque chiffre prend une valeur ${k} fois plus petite : ${nb(a)} ÷ ${k} = ${nb(rep)}.`);
  if (Math.random() < 0.45) {
    const s = pick([
      { u: "€", t: `${k} amis se partagent ${nb(a)} € à parts égales.\nCombien reçoit chacun ?` },
      { u: "cm", t: `${p.nom} coupe une bande de ${nb(a)} cm en ${k} morceaux égaux.\nQuelle est la longueur d’un morceau, en centimètres ?` },
      { u: "g", t: `${p.nom} partage ${nb(a)} g de graines en ${k} sachets égaux.\nCombien de grammes y a-t-il dans un sachet ?` },
      { u: "L", t: `On répartit ${nb(a)} L d’eau dans ${k} bidons, autant dans chacun.\nCombien de litres y a-t-il dans un bidon ?` },
    ]);
    return { text: s.t, format: "short" as const, expected: attendus(rep, s.u), comparator: "number_equal" as const, explanation: explication };
  }
  return { text: formeCalcul(`${nb(a)} ÷ ${k}`, [`Divise ${nb(a)} par ${k}.`]), format: "short" as const, expected: attendus(rep), comparator: "number_equal" as const, explanation: explication };
}

/** ★2 « calcule astucieusement » : regrouper, arrondir puis corriger. */
function genAstuce() {
  const n = randomInt(3, 19);
  const t = pick([0, 0, 1, 1, 2, 3, 4, 5, 6]);
  let expr: string;
  let rep: number;
  let astuce: string;
  if (t <= 1) {
    const ordre = t === 0 ? pick([[25, n, 4], [4, n, 25], [n, 25, 4]]) : pick([[5, n, 2], [2, n, 5], [50, n, 2], [20, n, 5]]);
    const [u, v] = ordre.filter((x, i) => !(x === n && i === ordre.indexOf(n)));
    expr = ordre.map(nb).join(" × ");
    rep = ordre[0] * ordre[1] * ordre[2];
    astuce = `On regroupe ${u} × ${v} = ${u * v}, puis ${u * v} × ${n} = ${nb(rep)}.`;
    if (Math.random() < 0.6) {
      // En situation : trois niveaux de regroupement (cartons de boîtes de crayons).
      const p = pick(PRENOMS);
      const [a, b, c] = ordre.map(nb);
      const text = pick([
        `${p.nom} reçoit ${a} cartons. Chaque carton contient ${b} boîtes de ${c} crayons.\nCombien de crayons a-t-${il(p)} ?`,
        `Le collège a ${a} salles. Dans chaque salle, il y a ${b} rangées de ${c} chaises.\nCombien y a-t-il de chaises ?`,
        `Un camion livre ${a} palettes. Chaque palette porte ${b} packs de ${c} bouteilles.\nCombien de bouteilles livre-t-il ?`,
        `${p.nom} range ses billes : ${a} sacs, chacun avec ${b} pochettes de ${c} billes.\nCombien de billes a-t-${il(p)} ?`,
        `Le pâtissier remplit ${a} plateaux. Sur chaque plateau, il fait ${b} rangées de ${c} macarons.\nCombien de macarons prépare-t-il ?`,
        `Pour la fête ${de(p.nom)}, on prépare ${a} tables. Sur chaque table, il y a ${b} assiettes de ${c} biscuits.\nCombien de biscuits y a-t-il ?`,
        `Un hôtel a ${a} étages. Chaque étage a ${b} chambres de ${c} lits.\nCombien de lits y a-t-il dans l’hôtel ?`,
      ]);
      return { text, format: "short" as const, expected: attendus(rep), comparator: "number_equal" as const, explanation: expl(astuce) };
    }
  } else if (t === 2) {
    const a = randomInt(23, 880);
    const k = pick([9, 99, 19]);
    expr = Math.random() < 0.5 ? `${nb(a)} + ${k}` : `${k} + ${nb(a)}`;
    rep = a + k;
    astuce = `On ajoute ${k + 1}, puis on retire 1 : ${nb(a)} + ${k + 1} − 1 = ${nb(rep)}.`;
  } else if (t === 3) {
    const k = pick([9, 99, 19]);
    const a = randomInt(k + 20, 900);
    expr = `${nb(a)} − ${k}`;
    rep = a - k;
    astuce = `On retire ${k + 1}, puis on rajoute 1 : ${nb(a)} − ${k + 1} + 1 = ${nb(rep)}.`;
  } else if (t === 4) {
    const a = randomInt(12, 60);
    expr = Math.random() < 0.5 ? `9 × ${a}` : `${a} × 9`;
    rep = 9 * a;
    astuce = `9 fois, c’est 10 fois moins 1 fois : ${nb(10 * a)} − ${a} = ${nb(rep)}.`;
  } else if (t === 5) {
    const a = randomInt(13, 60);
    expr = Math.random() < 0.5 ? `4 × ${a}` : `${a} × 4`;
    rep = 4 * a;
    astuce = `× 4, c’est le double du double : ${a} × 2 = ${2 * a}, puis ${2 * a} × 2 = ${nb(rep)}.`;
  } else {
    const paires = [[25, 75], [36, 64], [48, 52], [17, 83], [125, 75], [61, 39], [140, 60]];
    const [u, v] = pick(paires);
    let w = randomInt(12, 99);
    while (w === u || w === v) w = randomInt(12, 99);
    expr = (Math.random() < 0.5 ? [u, w, v] : [v, w, u]).map(nb).join(" + ");
    rep = u + v + w;
    astuce = `On regroupe ${u} + ${v} = ${u + v}, puis on ajoute ${w} : ${nb(rep)}.`;
  }
  return {
    text: pick([
      `Calcule astucieusement : ${expr}`,
      `Trouve une astuce pour calculer ${expr}.`,
      `Sans poser, calcule : ${expr}`,
      formeCalcul(expr),
    ]),
    format: "short" as const,
    expected: attendus(rep),
    comparator: "number_equal" as const,
    explanation: expl(astuce),
  };
}

// --- Problèmes (défis) ---------------------------------------------------

/** Une situation tirée d'une table, avec les nombres donnés ; la réponse est fournie par l'appelant. */
function enSituation(table: Situ2[], a: number, b: number, rep: number, explication: string, plusGrand = Math.max(a, b)) {
  const ok = table.filter((s) => situOk(s, plusGrand, b));
  const s = pick(ok.length ? ok : table);
  return {
    text: s.t(pick(PRENOMS), nb(a), nb(b)),
    format: "short" as const,
    expected: attendus(rep, s.unite),
    comparator: "number_equal" as const,
    explanation: expl(explication),
  };
}

// Achats : la réponse est la somme des prix.
const ARTICLES: { lieu: string; items: [string, number, number][] }[] = [
  { lieu: "À la boulangerie", items: [["une baguette", 1, 2], ["une tarte", 8, 19], ["un gâteau", 12, 28], ["des croissants", 3, 6]] },
  { lieu: "À la librairie", items: [["une bande dessinée", 9, 16], ["un roman", 6, 12], ["un atlas", 15, 29], ["un carnet", 2, 5]] },
  { lieu: "Au magasin de sport", items: [["un ballon", 9, 25], ["une raquette", 15, 39], ["un maillot", 12, 35], ["une gourde", 4, 12]] },
  { lieu: "À la papeterie", items: [["un cartable", 19, 45], ["une trousse", 5, 14], ["une calculatrice", 12, 25], ["un compas", 3, 9]] },
  { lieu: "Au cinéma", items: [["une place", 6, 11], ["un pot de pop-corn", 3, 7], ["une boisson", 2, 5]] },
  { lieu: "Au marché", items: [["un melon", 2, 4], ["un panier de fraises", 3, 6], ["du fromage", 4, 9], ["des fleurs", 5, 15]] },
  { lieu: "À la fête foraine", items: [["un tour de manège", 2, 5], ["une barbe à papa", 3, 5], ["un tour de grande roue", 4, 8]] },
  { lieu: "Au magasin de musique", items: [["une flûte", 9, 25], ["des cordes de guitare", 6, 15], ["un harmonica", 12, 30], ["un métronome", 15, 35]] },
  { lieu: "À l’animalerie", items: [["un sac de croquettes", 9, 25], ["une laisse", 6, 15], ["un jouet pour chat", 3, 9], ["une cage à oiseaux", 19, 45]] },
  { lieu: "Au magasin de bricolage", items: [["une boîte de vis", 3, 8], ["un marteau", 9, 19], ["un pot de peinture", 12, 29], ["un mètre ruban", 4, 9]] },
  { lieu: "À la jardinerie", items: [["un sachet de graines", 2, 4], ["un pot de fleurs", 4, 12], ["un arrosoir", 6, 15], ["un sac de terreau", 5, 11]] },
  { lieu: "À la piscine", items: [["une entrée", 3, 6], ["un bonnet de bain", 4, 9], ["des lunettes de natation", 6, 15]] },
];

function genAchats() {
  const mag = pick(ARTICLES);
  const n = mag.items.length >= 3 && Math.random() < 0.4 ? 3 : 2;
  const choisis = shuffle(mag.items).slice(0, n);
  const prix = choisis.map(([, lo, hi]) => randomInt(lo, hi));
  const total = prix.reduce((s, x) => s + x, 0);
  const p = pick(PRENOMS);
  const liste = choisis.map(([nom], i) => `${nom} à ${prix[i]} €`);
  const phrase = liste.length === 2 ? `${liste[0]} et ${liste[1]}` : `${liste[0]}, ${liste[1]} et ${liste[2]}`;
  return {
    text: `${mag.lieu}, ${p.nom} achète ${phrase}.\n${pick([`Combien paie-t-${il(p)} en tout ?`, "Quel est le prix total ?", `Combien d’euros dépense-t-${il(p)} ?`])}`,
    format: "short" as const,
    expected: attendus(total, "€"),
    comparator: "number_equal" as const,
    explanation: expl(`On additionne les prix : ${prix.join(" + ")} = ${total}. Le total est ${total} €.`),
  };
}

// Longueurs mises bout à bout : la somme.
const SITU_LONG_SOMME: Situ2[] = [
  { max: 400, unite: "cm", t: (p, a, b) => `${p.nom} noue une ficelle de ${a} cm à une ficelle de ${b} cm. On ne compte pas le nœud.\nQuelle longueur obtient-${il(p)}, en centimètres ?` },
  { max: 900, unite: "cm", t: (p, a, b) => `Pour la frise de la classe, ${p.nom} colle une bande de ${a} cm puis une bande de ${b} cm.\nQuelle est la longueur de la frise, en centimètres ?` },
  { max: 60, unite: "km", t: (p, a, b) => `En randonnée, ${p.nom} marche ${a} km le matin et ${b} km l’après-midi.\nQuelle distance a-t-${il(p)} parcourue, en kilomètres ?` },
  { max: 90, unite: "m", t: (p, a, b) => `${p.nom} raccorde un tuyau d’arrosage de ${a} m à un autre de ${b} m.\nQuelle est la longueur totale, en mètres ?` },
  { max: 900, unite: "cm", t: (p, a, b) => `${p.nom} accroche une guirlande de ${a} cm et une guirlande de ${b} cm bout à bout.\nQuelle longueur cela fait-il, en centimètres ?` },
  { max: 900, unite: "m", t: (p, a, b) => `Au cross du collège, ${p.nom} court ${a} m dans le parc puis ${b} m autour du stade.\nQuelle distance a-t-${il(p)} courue, en mètres ?` },
  { max: 300, unite: "cm", t: (p, a, b) => `${p.nom} pose deux planches bout à bout : une de ${a} cm et une de ${b} cm.\nQuelle longueur cela fait-il, en centimètres ?` },
  { max: 200, unite: "km", t: (p, a, b) => `Pendant les vacances, la famille ${de(p.nom)} roule ${a} km le samedi et ${b} km le dimanche.\nCombien de kilomètres a-t-elle parcourus ?` },
  { max: 900, unite: "m", t: (p, a, b) => `À la piscine, ${p.nom} nage ${a} m en crawl et ${b} m en brasse.\nQuelle distance a-t-${il(p)} nagée, en mètres ?` },
  { max: 400, unite: "cm", t: (p, a, b) => `Un escargot avance de ${a} cm le matin et de ${b} cm l’après-midi.\nDe combien de centimètres a-t-il avancé ?` },
];

// Longueurs répétées : le produit (a fois une longueur de b).
const SITU_LONG_PRODUIT: Situ2[] = [
  { max: 900, bmin: 10, unite: "cm", t: (p, a, b) => `${p.nom} pose ${a} planches de ${b} cm bout à bout.\nQuelle longueur obtient-${il(p)}, en centimètres ?` },
  { max: 5000, bmin: 100, unite: "m", t: (p, a, b) => `${p.nom} fait ${a} tours de piste de ${b} m.\nQuelle distance parcourt-${il(p)}, en mètres ?` },
  { max: 500, bmax: 90, unite: "km", t: (p, a, b) => `Le tour à vélo ${de(p.nom)} a ${a} étapes de ${b} km.\nQuelle est la longueur du tour, en kilomètres ?` },
  { max: 900, bmin: 10, unite: "cm", t: (p, a, b) => `${p.nom} coupe ${a} rubans de ${b} cm pour décorer des cadeaux.\nQuelle longueur de ruban utilise-t-${il(p)}, en centimètres ?` },
  { max: 900, unite: "m", t: (_p, a, b) => `Un jardin a ${a} rangées de légumes. Chaque rangée mesure ${b} m.\nQuelle longueur de rangées cela fait-il, en mètres ?` },
  { max: 900, bmin: 2, bmax: 6, unite: "cm", t: (p, a, b) => `${p.nom} aligne ${a} livres de ${b} cm d’épaisseur.\nQuelle longueur occupent-ils, en centimètres ?` },
  { max: 2000, bmin: 25, bmax: 50, unite: "m", t: (p, a, b) => `À la piscine, ${p.nom} nage ${a} longueurs de ${b} m.\nQuelle distance nage-t-${il(p)}, en mètres ?` },
  { max: 900, unite: "m", t: (_p, a, b) => `Pour clôturer un enclos, on met ${a} grillages de ${b} m bout à bout.\nQuelle est la longueur de la clôture, en mètres ?` },
];

// Deux étapes : un total, deux parts déjà faites ; la réponse est ce qui reste.
type Situ3 = { max: number; unite?: string; t: (p: Prenom, total: string, a: string, b: string) => string };
const SITU_DEUX_ETAPES: Situ3[] = [
  { max: 900, unite: "m", t: (p, T, a, b) => `Dans un jeu vidéo, le personnage ${de(p.nom)} doit parcourir ${T} m. Il a déjà parcouru ${a} m, puis ${b} m.\nCombien de mètres lui reste-t-il ?` },
  { max: 900, t: (p, T, a, b) => `Le livre ${de(p.nom)} a ${T} pages. ${Il(p)} a lu ${a} pages samedi et ${b} pages dimanche.\nCombien de pages lui reste-t-il à lire ?` },
  { max: 100, unite: "€", t: (p, T, a, b) => `${p.nom} a ${T} €. ${Il(p)} achète un jeu à ${a} € et un livre à ${b} €.\nCombien d’euros lui reste-t-il ?` },
  { max: 90, unite: "km", t: (p, T, a, b) => `La randonnée ${de(p.nom)} fait ${T} km. ${Il(p)} a marché ${a} km le premier jour et ${b} km le deuxième.\nCombien de kilomètres lui reste-t-il ?` },
  { max: 2000, t: (p, T, a, b) => `Le puzzle ${de(p.nom)} a ${T} pièces. ${Il(p)} en a posé ${a} lundi et ${b} mardi.\nCombien de pièces reste-t-il à poser ?` },
  { max: 900, unite: "cm", t: (p, T, a, b) => `${p.nom} a un rouleau de ${T} cm de ruban. ${Il(p)} en coupe ${a} cm, puis ${b} cm.\nQuelle longueur reste-t-il, en centimètres ?` },
  { max: 1000, unite: "g", t: (p, T, a, b) => `${p.nom} a un sac de ${T} g de farine. ${Il(p)} en prend ${a} g pour des crêpes et ${b} g pour un gâteau.\nCombien de grammes reste-t-il ?` },
  { max: 300, t: (_p, T, a, b) => `Un train part avec ${T} places libres. Au premier arrêt, ${a} personnes montent. Au deuxième, ${b} personnes montent. Personne ne descend.\nCombien de places restent libres ?` },
  { max: 2000, t: (p, T, a, b) => `Pour gagner, ${p.nom} doit réunir ${T} points. ${Il(p)} gagne ${a} points, puis ${b} points.\nCombien de points lui manque-t-il ?` },
  { max: 500, t: (_p, T, a, b) => `Une école commande ${T} gourdes. ${a} gourdes sont données aux élèves de sixième et ${b} aux élèves de cinquième.\nCombien de gourdes reste-t-il ?` },
];

function genDeuxEtapes() {
  const s = pick(SITU_DEUX_ETAPES);
  const pas = s.max <= 100 ? 1 : 5;
  const T = Math.round(randomInt(Math.ceil(s.max / 4), s.max) / pas) * pas;
  const a = Math.round(randomInt(Math.ceil(T / 6), Math.floor(T / 2.5)) / pas) * pas;
  const b = Math.round(randomInt(Math.ceil(T / 8), Math.floor(T / 3)) / pas) * pas;
  const rep = T - a - b;
  return {
    text: s.t(pick(PRENOMS), nb(T), nb(a), nb(b)),
    format: "short" as const,
    expected: attendus(rep, s.unite),
    comparator: "number_equal" as const,
    explanation: expl(`On additionne ce qui est déjà fait : ${nb(a)} + ${nb(b)} = ${nb(a + b)}. Puis ${nb(T)} − ${nb(a + b)} = ${nb(rep)}.`),
  };
}

export const calculMentalBank: TutorBankItemV4[] = [
  // =========================
  // MENTAL_ADDITION
  // =========================
  {
    kind: "fixed",
    id: "entier_addition_mentale_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_addition_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 68 + 7",
    format: "short",
    expected: ["75"],
    comparator: "number_equal",
    hint: "68 + 2 = 70, puis + 5.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On peut passer par la dizaine : 68 + 2 = 70, puis il reste 5 à ajouter. Donc 68 + 7 = 75.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "addition"],
  },
  {
    kind: "fixed",
    id: "entier_addition_mentale_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_addition_mentale",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 134 + 28",
    format: "short",
    expected: ["162"],
    comparator: "number_equal",
    hint: "134 + 20 = 154, puis + 8.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On ajoute d’abord 20 : 134 + 20 = 154. Puis on ajoute 8 : 154 + 8 = 162. Donc 134 + 28 = 162.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "addition"],
  },
  {
    kind: "fixed",
    id: "entier_addition_mentale_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_addition_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Effectue : 56 + 8",
    format: "short",
    expected: ["64"],
    comparator: "number_equal",
    hint: "56 + 4 = 60, puis + 4.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On peut compléter jusqu’à la dizaine : 56 + 4 = 60, puis on ajoute encore 4. Donc 56 + 8 = 64.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "addition"],
  },
  {
    kind: "fixed",
    id: "entier_addition_mentale_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_addition_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le résultat de 45 + 8 ?",
    format: "qcm",
    choices: ["51", "52", "53", "54"],
    expected: ["53"],
    comparator: "mcq_exact",
    hint: "45 + 5 = 50, puis + 3.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On peut passer par 50 : 45 + 5 = 50, puis il reste 3 à ajouter. Donc 45 + 8 = 53.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "addition", "qcm"],
  },

  // =========================
  // MENTAL_SUBTRACTION
  // =========================
  {
    kind: "fixed",
    id: "entier_soustraction_mentale_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_soustraction_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 183 - 6",
    format: "short",
    expected: ["177"],
    comparator: "number_equal",
    hint: "183 - 3 = 180, puis - 3.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On enlève 3 pour arriver à 180, puis encore 3. Donc 183 - 6 = 177.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "soustraction"],
  },
  {
    kind: "fixed",
    id: "entier_soustraction_mentale_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_soustraction_mentale",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 96 - 27",
    format: "short",
    expected: ["69"],
    comparator: "number_equal",
    hint: "96 - 20 = 76, puis - 7.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On enlève d’abord 20 : 96 - 20 = 76. Puis on enlève 7 : 76 - 7 = 69. Donc 96 - 27 = 69.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "soustraction"],
  },
  {
    kind: "fixed",
    id: "entier_soustraction_mentale_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_soustraction_mentale",
    difficulty: 2,
    theme: "neutral",
    text: "Effectue : 121 − 38",
    format: "short",
    expected: ["83"],
    comparator: "number_equal",
    hint: "121 - 40 = 81, puis ajoute 2.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On peut enlever 40 au lieu de 38 : 121 - 40 = 81. Comme on a enlevé 2 de trop, on ajoute 2. Donc 121 - 38 = 83.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "soustraction"],
  },
  {
    kind: "fixed",
    id: "entier_soustraction_mentale_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_soustraction_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le résultat de 72 - 8 ?",
    format: "qcm",
    choices: ["62", "63", "64", "65"],
    expected: ["64"],
    comparator: "mcq_exact",
    hint: "72 - 2 = 70, puis - 6.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On peut passer par la dizaine : 72 - 2 = 70, puis on enlève encore 6. Donc 72 - 8 = 64.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "soustraction", "qcm"],
  },

  // =========================
  // MENTAL_MULTIPLICATION
  // =========================
  {
    kind: "fixed",
    id: "entier_multiplication_mentale_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_multiplication_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 8 × 7",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "Utilise la table de 8.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Dans la table de 8, 8 × 7 = 56. Donc le résultat est 56.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "multiplication"],
  },
  {
    kind: "fixed",
    id: "entier_multiplication_mentale_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_multiplication_mentale",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 18 × 5",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "Multiplier par 5, c’est prendre la moitié de ×10.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Multiplier par 5 revient à multiplier par 10 puis à prendre la moitié. 18 × 10 = 180, et la moitié de 180 est 90. Donc 18 × 5 = 90.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "multiplication"],
  },
  {
    kind: "fixed",
    id: "entier_multiplication_mentale_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_multiplication_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Effectue : 11 × 9",
    format: "short",
    expected: ["99"],
    comparator: "number_equal",
    hint: "Utilise la table de 9.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("11 × 9 = 99. On peut aussi voir que 10 × 9 = 90 puis ajouter encore 9, ce qui donne 99.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "multiplication"],
  },
  {
    kind: "fixed",
    id: "entier_multiplication_mentale_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_multiplication_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le résultat de 6 × 8 ?",
    format: "qcm",
    choices: ["46", "48", "52", "54"],
    expected: ["48"],
    comparator: "mcq_exact",
    hint: "Table de 6 ou de 8.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Dans les tables, 6 × 8 = 48. La bonne réponse est donc 48.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "multiplication", "qcm"],
  },

  // =========================
  // MENTAL_DIVISION
  // =========================
  {
    kind: "fixed",
    id: "entier_division_mentale_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_division_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 645 ÷ 10",
    format: "short",
    expected: ["64,5", "64.5"],
    comparator: "number_equal",
    hint: "Diviser par 10 décale la virgule d’un rang.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Quand on divise par 10, chaque chiffre prend une place dix fois plus petite. Ainsi 645 ÷ 10 = 64,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "division"],
  },
  {
    kind: "fixed",
    id: "entier_division_mentale_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_division_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Effectue : 63 ÷ 9",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "9 × 7 = 63.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On cherche combien de fois 9 est contenu dans 63. Comme 9 × 7 = 63, on a 63 ÷ 9 = 7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "division"],
  },
  {
    kind: "fixed",
    id: "entier_division_mentale_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_division_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule sans poser l’opération : 56 ÷ 8",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "8 × 7 = 56.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Comme 8 × 7 = 56, alors 56 ÷ 8 = 7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "division"],
  },
  {
    kind: "fixed",
    id: "entier_division_mentale_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_division_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le résultat de 45 ÷ 5 ?",
    format: "qcm",
    choices: ["8", "9", "10", "11"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "5 × 9 = 45.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On cherche le nombre qui multiplié par 5 donne 45. Comme 5 × 9 = 45, alors 45 ÷ 5 = 9.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "division", "qcm"],
  },

  // =========================
  // MENTAL_STRATEGIES
  // =========================
  {
    kind: "fixed",
    id: "entier_strategie_mentale_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_strategie_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Donne le quart de 28.",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Partager en 4 parts égales.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Prendre le quart d’un nombre, c’est le diviser par 4. Donc 28 ÷ 4 = 7. Le quart de 28 est 7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "strategie"],
  },
  {
    kind: "fixed",
    id: "entier_strategie_mentale_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_strategie_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Donne le double de 70.",
    format: "short",
    expected: ["140"],
    comparator: "number_equal",
    hint: "70 + 70.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Le double d’un nombre, c’est ce nombre ajouté à lui-même. Donc 70 + 70 = 140.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "strategie"],
  },
  {
    kind: "fixed",
    id: "entier_strategie_mentale_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_strategie_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 4,23 × 10",
    format: "short",
    expected: ["42,3", "42.3"],
    comparator: "number_equal",
    hint: "Multiplier par 10 décale la virgule d’un rang.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Quand on multiplie par 10, chaque chiffre prend une place dix fois plus grande. Ainsi 4,23 × 10 = 42,3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "strategie", "decimal_nombre"],
  },
  {
    kind: "fixed",
    id: "entier_strategie_mentale_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_strategie_mentale",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la moitié de 26 ?",
    format: "qcm",
    choices: ["12", "13", "14", "15"],
    expected: ["13"],
    comparator: "mcq_exact",
    hint: "26 partagé en 2.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("La moitié d’un nombre, c’est ce nombre divisé par 2. Donc 26 ÷ 2 = 13.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "strategie", "qcm"],
  },

  // =========================
  // MENTAL_DEFIS / PROBLEMES
  // =========================
  {
    kind: "fixed",
    id: "entier_calcul_mental_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_calcul_mental_defi",
    difficulty: 2,
    theme: "neutral",
    text: "À la boulangerie, Léa achète une tarte à 5 €, un jus à 3 € ainsi qu’un gâteau à 26 €. Combien Léa va-t-elle payer en tout ?",
    format: "short",
    expected: ["34", "34 €", "34€"],
    comparator: "contains_keyword",
    hint: "Additionne 5 + 3 + 26.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On additionne les trois prix : 5 + 3 + 26 = 34. Léa paiera donc 34 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "probleme"],
  },
  {
    kind: "fixed",
    id: "entier_calcul_mental_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_calcul_mental_defi",
    difficulty: 2,
    theme: "neutral",
    text: "Un album contient 87 pages. Tu en as déjà lu 39. Combien de pages te reste-t-il à lire ?",
    format: "short",
    expected: ["48"],
    comparator: "number_equal",
    hint: "Fais 87 - 39.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Le nombre de pages restantes se calcule par une soustraction : 87 - 39 = 48. Il reste donc 48 pages à lire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "probleme", "soustraction"],
  },
  {
    kind: "fixed",
    id: "entier_calcul_mental_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_calcul_mental_defi",
    difficulty: 2,
    theme: "reunion",
    text: "63 mangues sont partagées entre 9 enfants. Combien chaque enfant reçoit-il de mangues ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Fais 63 ÷ 9.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("On partage 63 mangues en 9 parts égales. Comme 63 ÷ 9 = 7, chaque enfant reçoit 7 mangues.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "probleme", "reunion", "division"],
  },
  {
    kind: "fixed",
    id: "entier_calcul_mental_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_calcul_mental_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un spectacle commence à 15 h 35 et dure 1 heure et 25 minutes. À quelle heure se termine-t-il ?",
    format: "short",
    expected: ["17 h 00", "17h00", "17:00", "17 h"],
    comparator: "contains_keyword",
    hint: "Ajoute 1 heure puis 25 minutes.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("À 15 h 35, on ajoute 1 heure : on obtient 16 h 35. Puis on ajoute 25 minutes : on arrive à 17 h 00. Le spectacle se termine donc à 17 h.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "probleme", "heure"],
  },
  {
    kind: "fixed",
    id: "entier_calcul_mental_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_calcul_mental_defi",
    difficulty: 2,
    theme: "reunion",
    text: "Dans un jardin à Saint-Pierre, il y a 9 rangées de 7 fleurs. Combien de fleurs y a-t-il en tout ?",
    format: "short",
    expected: ["63"],
    comparator: "number_equal",
    hint: "Fais 9 × 7.",
    explanation:
      "Définition : le calcul mental permet de trouver un résultat sans poser l’opération.\n\n" +
      "Méthode : on choisit une décomposition simple pour calculer plus vite.\n\n" +
      "Calcul : " +
      ("Il y a 9 rangées de 7 fleurs, donc on calcule 9 × 7 = 63. Il y a 63 fleurs en tout.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entier_calcul_mental", "probleme", "reunion", "multiplication"],
  },

  // =========================
  // TEMPLATES - ADDITION
  // =========================
  {
    kind: "template",
    id: "entier_addition_mentale_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_addition_mentale",
    difficulty: 1,
    theme: "neutral",
    hint: "Passe par la dizaine suivante.",
    tags: ["entier_calcul_mental", "addition", "template"],
    generate: () => {
      // ★1 : passage de la dizaine (47 + 8), dizaines entières (340 + 60, 45 + 30).
      const t = Math.random();
      if (t < 0.5) {
        const u = randomInt(3, 9);
        const a = randomInt(2, 9) * 10 + u;
        const b = randomInt(11 - u, 9);
        return genAddition(a, b);
      }
      if (t < 0.75) {
        const d = randomInt(1, 9) * 10;
        return genAddition(randomInt(1, 9) * 100 + (100 - d), d);
      }
      return genAddition(randomInt(12, 69), randomInt(1, 3) * 10);
    },
  },
  {
    kind: "template",
    id: "entier_addition_mentale_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_addition_mentale",
    difficulty: 2,
    theme: "neutral",
    hint: "Tu peux ajouter 10 puis corriger.",
    tags: ["entier_calcul_mental", "addition", "template"],
    generate: () => {
      // ★2 : trois chiffres + deux chiffres, + 9 / + 19 / + 99, trois termes.
      const t = Math.random();
      if (t < 0.2) return genAdditionTrois();
      if (t < 0.45) return genAddition(randomInt(105, 880), pick([9, 19, 29, 99, 49]));
      return genAddition(randomInt(104, 789), randomInt(12, 89));
    },
  },

  // =========================
  // TEMPLATES - SUBTRACTION
  // =========================
  {
    kind: "template",
    id: "entier_soustraction_mentale_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_soustraction_mentale",
    difficulty: 1,
    theme: "neutral",
    hint: "Retire d’abord jusqu’à la dizaine.",
    tags: ["entier_calcul_mental", "soustraction", "template"],
    generate: () => {
      // ★1 : passage de la dizaine (83 − 7), dizaines entières (150 − 40).
      if (Math.random() < 0.6) {
        const u = randomInt(0, 6);
        const a = randomInt(3, 12) * 10 + u;
        return genSoustraction(a, randomInt(u + 1, 9));
      }
      const a = randomInt(6, 30) * 10;
      return genSoustraction(a, randomInt(1, Math.min(9, a / 10 - 1)) * 10);
    },
  },
  {
    kind: "template",
    id: "entier_soustraction_mentale_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_soustraction_mentale",
    difficulty: 2,
    theme: "neutral",
    hint: "Enlève les dizaines puis les unités.",
    tags: ["entier_calcul_mental", "soustraction", "template"],
    generate: () => {
      // ★2 : trois chiffres − deux chiffres, − 9 / − 19 / − 99, complément à 100 ou 1 000.
      const t = Math.random();
      if (t < 0.25) return genSoustraction(randomInt(120, 900), pick([9, 19, 29, 99]));
      if (t < 0.4) return Math.random() < 0.5 ? genSoustraction(100, randomInt(11, 89)) : genSoustraction(1000, randomInt(11, 89) * 10);
      return genSoustraction(randomInt(102, 800), randomInt(12, 89));
    },
  },

  // =========================
  // TEMPLATES - MULTIPLICATION
  // =========================
  {
    kind: "template",
    id: "entier_multiplication_mentale_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_multiplication_mentale",
    difficulty: 1,
    theme: "neutral",
    hint: "Utilise les tables.",
    tags: ["entier_calcul_mental", "multiplication", "template"],
    generate: () => {
      // ★1 : les tables, et une dizaine entière (6 × 50).
      if (Math.random() < 0.7) return genMultiplication(randomInt(3, 9), randomInt(3, 9));
      return genMultiplication(randomInt(2, 9), randomInt(2, 9) * 10);
    },
  },
  {
    kind: "template",
    id: "entier_multiplication_mentale_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_multiplication_mentale",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 5, c’est parfois faire ×10 puis ÷2.",
    tags: ["entier_calcul_mental", "multiplication", "template"],
    generate: () => {
      // ★2 : × 5 (× 10 puis moitié), × 11, × 9, deux chiffres × un chiffre (23 × 4 = 80 + 12).
      const t = Math.random();
      if (t < 0.3) return genMultiplication(randomInt(6, 24) * 2, 5);
      if (t < 0.45) return genMultiplication(randomInt(12, 45), pick([9, 11]));
      return genMultiplication(randomInt(12, 49), randomInt(3, 8));
    },
  },

  // =========================
  // TEMPLATES - DIVISION
  // =========================
  {
    kind: "template",
    id: "entier_division_mentale_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_division_mentale",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche la table inverse.",
    tags: ["entier_calcul_mental", "division", "template"],
    generate: () => {
      // ★1 : la table à l'envers (56 ÷ 8).
      const b = randomInt(2, 9);
      return genDivision(b * randomInt(2, 10), b);
    },
  },
  {
    kind: "template",
    id: "entier_division_mentale_tpl_3_etoile_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_division_mentale",
    difficulty: 2,
    theme: "neutral",
    hint: "Décompose : 96 ÷ 8, c’est 80 ÷ 8 puis 16 ÷ 8.",
    tags: ["entier_calcul_mental", "division", "template"],
    generate: () => {
      // ★2 : deux ou trois chiffres ÷ un chiffre, quotient entier (96 ÷ 8, 150 ÷ 5, 360 ÷ 4).
      const b = randomInt(2, 9);
      const q = Math.random() < 0.65 ? randomInt(11, 25) : randomInt(2, 9) * 10;
      return genDivision(b * q, b);
    },
  },
  {
    kind: "template",
    id: "entier_division_mentale_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_division_mentale",
    difficulty: 1,
    theme: "neutral",
    hint: "Avec ÷10, la virgule se déplace.",
    tags: ["entier_calcul_mental", "division", "template", "decimal_nombre"],
    generate: () => {
      // ÷ 10 et ÷ 100 : chaque chiffre prend une valeur 10 (ou 100) fois plus petite.
      if (Math.random() < 0.6) return genDivision(randomInt(101, 999), 10);
      return genDivision(randomInt(11, 99) * 100, pick([10, 100]));
    },
  },

  // =========================
  // TEMPLATES - STRATEGIES
  // =========================
  {
    kind: "template",
    id: "entier_strategie_mentale_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_strategie_mentale",
    difficulty: 1,
    theme: "neutral",
    hint: "Double ou moitié.",
    tags: ["entier_calcul_mental", "strategie", "template"],
    // Double, moitié, triple, quart — jamais « Donne le double de … », la
    // consigne des items figés.
    generate: () => genMotOperation(randomInt(6, 99) * (Math.random() < 0.3 ? 10 : 1)),
  },
  {
    kind: "template",
    id: "entier_strategie_mentale_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_strategie_mentale",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplier ou diviser par 10.",
    tags: ["entier_calcul_mental", "strategie", "template", "decimal_nombre"],
    // ⛔ Frédéric : × 10 par la VALEUR des chiffres (pas « on décale la
    // virgule », jamais « on ajoute un zéro »).
    generate: () => genFoisDix(),
  },
  {
    kind: "template",
    id: "entier_strategie_mentale_tpl_3_astuces",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_strategie_mentale",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche un nombre rond : regroupe, ou arrondis puis corrige.",
    tags: ["entier_calcul_mental", "strategie", "template"],
    generate: () => genAstuce(),
  },

  // =========================
  // TEMPLATES - PROBLEMES
  // =========================
  {
    kind: "template",
    id: "entier_calcul_mental_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_calcul_mental_defi",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les deux prix.",
    tags: ["entier_calcul_mental", "probleme", "template"],
    // 06/10/2026 : `contains_keyword` sur une réponse numérique (« 1 » passait
    // pour 21) → `number_equal`, l'unité dans les réponses acceptées.
    generate: () => genAchats(),
  },
  {
    kind: "template",
    id: "entier_calcul_mental_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_calcul_mental",
    microId: "entier_calcul_mental_defi",
    difficulty: 2,
    theme: "neutral",
    hint: "Des groupes égaux : multiplie le nombre de groupes par la taille d’un groupe.",
    tags: ["entier_calcul_mental", "probleme", "template"],
    // Groupes égaux : situations variées (le verger de La Réunion n'est plus seul).
    generate: () => {
      const a = randomInt(3, 9);
      const b = randomInt(4, 12);
      return enSituation(SITU_MUL, a, b, a * b, `${a} groupes de ${b} : ${a} × ${b} = ${a * b}.`, a * b);
    },
  },
  // =========================
// TEMPLATES - DEFIS LONGUEURS
// =========================
{
  kind: "template",
  id: "entier_calcul_mental_defi_aire_longueur_tpl_1",
  niveau: "6e",
  matiere: "maths",
  notionId: "entier_calcul_mental",
  microId: "entier_calcul_mental_defi",
  difficulty: 2,
  theme: "neutral",
  hint: "Additionne les longueurs.",
  tags: ["entier_calcul_mental", "probleme", "template", "aire_longueur"],
  generate: () => {
    // Longueurs bout à bout ; nombres tirés selon l'unité de la situation.
    const s = pick(SITU_LONG_SOMME);
    const a = randomInt(Math.ceil(s.max / 10), Math.floor(s.max / 2));
    const b = randomInt(Math.ceil(s.max / 20), Math.floor(s.max / 2));
    return enSituation([s], a, b, a + b, `On met bout à bout : ${nb(a)} + ${nb(b)} = ${nb(a + b)}.`);
  },
},
{
  kind: "template",
  id: "entier_calcul_mental_defi_aire_longueur_tpl_2",
  niveau: "6e",
  matiere: "maths",
  notionId: "entier_calcul_mental",
  microId: "entier_calcul_mental_defi",
  difficulty: 2,
  theme: "cuisine",
  hint: "Soustrais la partie utilisée.",
  tags: ["entier_calcul_mental", "probleme", "template", "aire_longueur"],
  generate: () => {
    // Ce qui reste : un total, une partie enlevée.
    const s = pick(SITU_SOUS);
    const a = randomInt(Math.ceil(s.max / 5), s.max);
    const b = randomInt(Math.ceil(a / 8), Math.floor((a * 2) / 3));
    return enSituation([s], a, b, a - b, `On enlève : ${nb(a)} − ${nb(b)} = ${nb(a - b)}.`);
  },
},
{
  kind: "template",
  id: "entier_calcul_mental_defi_aire_longueur_tpl_3",
  niveau: "6e",
  matiere: "maths",
  notionId: "entier_calcul_mental",
  microId: "entier_calcul_mental_defi",
  difficulty: 3,
  theme: "neutral",
  hint: "La même longueur plusieurs fois : multiplie.",
  tags: ["entier_calcul_mental", "probleme", "template", "aire_longueur"],
  generate: () => {
    // Une longueur répétée : a × b, avec b « rond » pour le calcul mental (25, 45, 120…).
    const s = pick(SITU_LONG_PRODUIT);
    const a = randomInt(3, 9);
    let b = 0;
    for (let k = 0; k < 50; k++) {
      b = randomInt(Math.max(s.bmin ?? 2, 2), Math.min(s.bmax ?? 400, Math.floor(s.max / a)));
      if (b % 5 === 0 || b < 20) break;
    }
    return enSituation([s], a, b, a * b, `${nb(a)} fois ${nb(b)} : ${nb(a)} × ${nb(b)} = ${nb(a * b)}.`, a * b);
  },
},
{
  kind: "template",
  id: "entier_calcul_mental_defi_aire_longueur_tpl_4",
  niveau: "6e",
  matiere: "maths",
  notionId: "entier_calcul_mental",
  microId: "entier_calcul_mental_defi",
  difficulty: 3,
  theme: "sport",
  hint: "Partage.",
  tags: ["entier_calcul_mental", "probleme", "template", "aire_longueur"],
  generate: () => {
    // Partage en parts égales, quotient entier (la piste de 24 m revenait sans cesse).
    const b = randomInt(3, 8);
    const q = randomInt(4, 25);
    return enSituation(SITU_DIV, b * q, b, q, `On partage : ${nb(b * q)} ÷ ${b} = ${q}, car ${b} × ${q} = ${nb(b * q)}.`, b * q);
  },
},
{
  kind: "template",
  id: "entier_calcul_mental_defi_aire_longueur_tpl_5",
  niveau: "6e",
  matiere: "maths",
  notionId: "entier_calcul_mental",
  microId: "entier_calcul_mental_defi",
  difficulty: 4,
  theme: "jeux_video",
  hint: "Plusieurs étapes.",
  tags: ["entier_calcul_mental", "probleme", "template", "aire_longueur"],
  generate: () => genDeuxEtapes(),
},

  // ===== TOP-UP — ADDITION =====
  { kind: "fixed", id: "entier_addition_mentale_topup_1", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_addition_mentale", difficulty: 1, theme: "neutral",
    text: "Calcule sans poser l’opération : 47 + 8", format: "short", expected: ["55"], comparator: "number_equal",
    hint: "47 + 3 = 50, puis + 5.", explanation: expl("On passe par la dizaine : 47 + 3 = 50, puis + 5 = 55. Donc 47 + 8 = 55."), tags: ["entier_calcul_mental", "addition"] },
  { kind: "fixed", id: "entier_addition_mentale_topup_2", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_addition_mentale", difficulty: 2, theme: "neutral",
    text: "Effectue : 256 + 30", format: "short", expected: ["286"], comparator: "number_equal",
    hint: "Ajoute les dizaines.", explanation: expl("On ajoute 30 : 256 + 30 = 286."), tags: ["entier_calcul_mental", "addition"] },
  { kind: "fixed", id: "entier_addition_mentale_topup_3", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_addition_mentale", difficulty: 2, theme: "neutral",
    text: "Calcule sans poser l’opération : 99 + 15", format: "short", expected: ["114"], comparator: "number_equal",
    hint: "99 + 1 = 100, puis + 14.", explanation: expl("On arrondit : 99 + 1 = 100, puis + 14 = 114. Donc 99 + 15 = 114."), tags: ["entier_calcul_mental", "addition"] },
  { kind: "fixed", id: "entier_addition_mentale_topup_4", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_addition_mentale", difficulty: 1, theme: "neutral",
    text: "Fais ce calcul : 340 + 60", format: "short", expected: ["400"], comparator: "number_equal",
    hint: "40 + 60 = 100.", explanation: expl("340 + 60 = 400 (on complète à la centaine)."), tags: ["entier_calcul_mental", "addition"] },

  // ===== TOP-UP — SOUSTRACTION =====
  { kind: "fixed", id: "entier_soustraction_mentale_topup_1", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_soustraction_mentale", difficulty: 1, theme: "neutral",
    text: "Effectue : 83 − 7", format: "short", expected: ["76"], comparator: "number_equal",
    hint: "83 − 3 = 80, puis − 4.", explanation: expl("On passe par la dizaine : 83 - 3 = 80, puis - 4 = 76. Donc 83 - 7 = 76."), tags: ["entier_calcul_mental", "soustraction"] },
  { kind: "fixed", id: "entier_soustraction_mentale_topup_2", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_soustraction_mentale", difficulty: 2, theme: "neutral",
    text: "Calcule sans poser l’opération : 150 − 40", format: "short", expected: ["110"], comparator: "number_equal",
    hint: "Enlève les dizaines.", explanation: expl("150 - 40 = 110."), tags: ["entier_calcul_mental", "soustraction"] },
  { kind: "fixed", id: "entier_soustraction_mentale_topup_3", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_soustraction_mentale", difficulty: 2, theme: "neutral",
    text: "Fais ce calcul : 204 − 19", format: "short", expected: ["185"], comparator: "number_equal",
    hint: "204 − 20 = 184, puis + 1.", explanation: expl("On enlève 20 puis on rajoute 1 : 204 - 20 = 184, puis + 1 = 185. Donc 204 - 19 = 185."), tags: ["entier_calcul_mental", "soustraction"] },
  { kind: "fixed", id: "entier_soustraction_mentale_topup_4", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_soustraction_mentale", difficulty: 2, theme: "neutral",
    text: "Donne le résultat de 100 − 36.", format: "short", expected: ["64"], comparator: "number_equal",
    hint: "Cherche le complément de 36 à 100.", explanation: expl("Le complément de 36 à 100 est 64 (36 + 64 = 100). Donc 100 - 36 = 64."), tags: ["entier_calcul_mental", "soustraction"] },

  // ===== TOP-UP — MULTIPLICATION =====
  { kind: "fixed", id: "entier_multiplication_mentale_topup_1", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_multiplication_mentale", difficulty: 1, theme: "neutral",
    text: "Calcule sans poser l’opération : 6 × 50", format: "short", expected: ["300"], comparator: "number_equal",
    hint: "6 × 5 = 30, puis × 10.", explanation: expl("6 × 5 = 30, puis × 10 = 300. Donc 6 × 50 = 300."), tags: ["entier_calcul_mental", "multiplication"] },
  { kind: "fixed", id: "entier_multiplication_mentale_topup_2", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_multiplication_mentale", difficulty: 2, theme: "neutral",
    text: "Effectue : 25 × 4", format: "short", expected: ["100"], comparator: "number_equal",
    hint: "25 × 4 = un compte rond.", explanation: expl("25 × 4 = 100."), tags: ["entier_calcul_mental", "multiplication"] },
  { kind: "fixed", id: "entier_multiplication_mentale_topup_3", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_multiplication_mentale", difficulty: 1, theme: "neutral",
    text: "Fais ce calcul : 12 × 5", format: "short", expected: ["60"], comparator: "number_equal",
    hint: "12 × 5 = 12 × 10 ÷ 2.", explanation: expl("12 × 5 = 60 (la moitié de 12 × 10 = 120)."), tags: ["entier_calcul_mental", "multiplication"] },
  { kind: "fixed", id: "entier_multiplication_mentale_topup_4", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_multiplication_mentale", difficulty: 2, theme: "neutral",
    text: "Calcule sans poser l’opération : 8 × 9", format: "short", expected: ["72"], comparator: "number_equal",
    hint: "Table de 8 ou de 9.", explanation: expl("8 × 9 = 72."), tags: ["entier_calcul_mental", "multiplication"] },

  // ===== TOP-UP — DIVISION =====
  { kind: "fixed", id: "entier_division_mentale_topup_1", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_division_mentale", difficulty: 1, theme: "neutral",
    text: "Fais ce calcul : 80 ÷ 4", format: "short", expected: ["20"], comparator: "number_equal",
    hint: "8 ÷ 4 = 2, puis × 10.", explanation: expl("8 ÷ 4 = 2, donc 80 ÷ 4 = 20."), tags: ["entier_calcul_mental", "division"] },
  { kind: "fixed", id: "entier_division_mentale_topup_2", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_division_mentale", difficulty: 2, theme: "neutral",
    text: "Calcule : 96 ÷ 8", format: "short", expected: ["12"], comparator: "number_equal",
    hint: "Cherche dans la table de 8.", explanation: expl("8 × 12 = 96, donc 96 ÷ 8 = 12."), tags: ["entier_calcul_mental", "division"] },
  { kind: "fixed", id: "entier_division_mentale_topup_3", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_division_mentale", difficulty: 2, theme: "neutral",
    text: "Effectue : 150 ÷ 5", format: "short", expected: ["30"], comparator: "number_equal",
    hint: "15 ÷ 5 = 3, puis × 10.", explanation: expl("15 ÷ 5 = 3, donc 150 ÷ 5 = 30."), tags: ["entier_calcul_mental", "division"] },
  { kind: "fixed", id: "entier_division_mentale_topup_4", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_division_mentale", difficulty: 1, theme: "neutral",
    text: "Donne le résultat de 72 ÷ 6.", format: "short", expected: ["12"], comparator: "number_equal",
    hint: "Table de 6.", explanation: expl("6 × 12 = 72, donc 72 ÷ 6 = 12."), tags: ["entier_calcul_mental", "division"] },

  // ===== TOP-UP — STRATEGIE =====
  { kind: "fixed", id: "entier_strategie_mentale_topup_1", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_strategie_mentale", difficulty: 1, theme: "neutral",
    text: "Donne le double de 35.", format: "short", expected: ["70"], comparator: "number_equal",
    hint: "Doubler, c’est multiplier par 2.", explanation: expl("Le double de 35 est 35 × 2 = 70."), tags: ["entier_calcul_mental", "strategie"] },
  { kind: "fixed", id: "entier_strategie_mentale_topup_2", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_strategie_mentale", difficulty: 1, theme: "neutral",
    text: "Donne la moitié de 48.", format: "short", expected: ["24"], comparator: "number_equal",
    hint: "Moitié = diviser par 2.", explanation: expl("La moitié de 48 est 48 ÷ 2 = 24."), tags: ["entier_calcul_mental", "strategie"] },
  { kind: "fixed", id: "entier_strategie_mentale_topup_3", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_strategie_mentale", difficulty: 2, theme: "neutral",
    // ⛔ « on ajoute un zéro » retiré le 06/10/2026 (règle de Frédéric du 05/10) :
    // × 10 se justifie par la VALEUR DES CHIFFRES.
    text: "Quand on multiplie un nombre entier par 10, que devient chaque chiffre ?", format: "qcm",
    choices: ["il prend une valeur dix fois plus grande", "il prend une valeur dix fois plus petite", "il garde la même valeur", "il est multiplié par 2"],
    expected: ["il prend une valeur dix fois plus grande"], comparator: "mcq_exact",
    hint: "Dans 37 × 10, les 3 dizaines deviennent 3 centaines.", explanation: expl("Chaque chiffre prend une valeur dix fois plus grande : dans 37 × 10, les 3 dizaines deviennent 3 centaines et les 7 unités deviennent 7 dizaines. On obtient 370 : le chiffre des unités est 0."), tags: ["entier_calcul_mental", "strategie", "qcm"] },
  { kind: "fixed", id: "entier_strategie_mentale_topup_4", niveau: "6e", matiere: "maths", notionId: "entier_calcul_mental", microId: "entier_strategie_mentale", difficulty: 2, theme: "neutral",
    text: "Pour calculer 99 + 47 rapidement, la meilleure stratégie est de...", format: "qcm",
    choices: ["faire 100 + 47 puis enlever 1", "faire 99 + 40 puis enlever 7", "faire 47 − 99", "poser l’addition"],
    expected: ["faire 100 + 47 puis enlever 1"], comparator: "mcq_exact",
    hint: "99 est proche de 100.", explanation: expl("99 est proche de 100. On calcule 100 + 47 = 147, puis on enlève 1 : 146. Donc 99 + 47 = 146."), tags: ["entier_calcul_mental", "strategie", "qcm"] },
];