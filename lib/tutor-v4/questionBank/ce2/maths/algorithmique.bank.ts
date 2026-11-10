// lib/tutor-v4/questionBank/ce2/maths/algorithmique.bank.ts
//
// Les programmes et déplacements codés du CE2, écrits à la main. Cinq
// micro-compétences qui passaient par le constructeur commun.
//
// ⚠️ HORS ATTENDUS DE FIN DE CE2 — RÉVISION DU CE1.
// Relu sur le texte lui-même le 09/08/2026 (BO n° 41 du 31 octobre 2024,
// applicable à la rentrée 2025) : il n'existe pas de sous-domaine
// « algorithmique » au cycle 2. « Comprendre, utiliser et produire une suite
// d'instructions qui codent un déplacement » vit à l'intérieur du repérage
// dans l'espace, au CP (dix instructions au plus, dont deux virages) et au CE1
// (quinze instructions, dont quatre virages). Au CE2, plus rien.
// Gardées quand même — feu vert de Frédéric. C'est de la consolidation, et
// c'est ce que l'élève réclame le plus volontiers.
// ⛔ Ne pas s'appuyer là-dessus pour annoncer « l'algorithmique au programme
// du CE2 » : ce serait faux.
//
// CE QU'ON Y TRAVAILLE : programmer les déplacements d'un robot ou d'un
// personnage sur un quadrillage — lire une suite d'instructions, la coder,
// utiliser une répétition, corriger un programme qui ne marche pas.
// ⛔ Pas de variable, pas de condition au cycle 2 : ni « si… alors », ni
// compteur. On avance, on tourne, on répète.
//
// LE PIÈGE DE LA NOTION : l'ordre. « Avance puis tourne » et « tourne puis
// avance » n'arrivent pas au même endroit, et c'est la seule chose qui compte
// vraiment ici. Un programme n'est pas une liste d'ingrédients, c'est une
// succession.
// Le second : la répétition. « Répéter 3 fois : avancer de 2 » fait avancer de
// 6, pas de 5 ni de 3. On multiplie, on n'additionne pas les deux nombres.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type {
  DifficultyLevel,
  ReperageCanvasData,
  ScratchBlockData,
  ScratchCanvasData,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import { cap, entre, etapes, melange, qcm, un } from "../../cm1/maths/trous-outils";

function programme(titre: string, blocks: ScratchCanvasData["blocks"]): ScratchCanvasData {
  return {
    kind: "scratch",
    title: titre,
    blocks,
    display: { showSprite: true, compact: true },
  };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/* ═════════════════════════════════════════════════════════════════════════
   LES GABARITS (10/11/2026) — situations × tournures × nombres.
   ⛔ Mesuré le 10/11 : 4 à 7 squelettes par micro pour la plupart, 16 à 19
   répétitions sur 20. Chaque étoile servie a maintenant au moins deux gabarits
   riches : QUI est programmé (un robot, la tortue d'un jeu, Pic…) × la
   tournure × les nombres.
   ⭐ Le dessin montre le PROGRAMME (blocs) ou le QUADRILLAGE avec le départ,
   jamais le point d'arrivée ni le total.
   ═════════════════════════════════════════════════════════════════════════ */

/** « de Zoé », mais « d'Inès », « d'Amir ». */
const deP = (p: string) => (/^[AEIOUÉÈÎ]/.test(p) ? `d'${p}` : `de ${p}`);
const PRENOMS = ["Nina", "Téo", "Zoé", "Ravi", "Lou", "Malo", "Inès", "Sacha", "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis"];
type Acteur = { n: string; p: "il" | "elle" };
/** ★1-★2 : une phrase simple, « le robot de Zoé ». */
const robotSimple = (): Acteur => ({ n: `le robot ${deP(un(PRENOMS))}`, p: "il" });
/** ★3 et plus : ce qu'on programme change, et le monde avec. */
function acteur(): Acteur {
  const q = un(PRENOMS);
  return un<Acteur>([
    { n: `le robot ${deP(q)}`, p: "il" },
    { n: `la coccinelle robot ${deP(q)}`, p: "elle" },
    { n: `la petite fusée ${deP(q)}`, p: "elle" },
    { n: "le rover de l'astronaute", p: "il" },
    { n: "le robot de la jardinière", p: "il" },
    { n: `le dragon du jeu ${deP(q)}`, p: "il" },
    { n: `la tortue du jeu ${deP(q)}`, p: "elle" },
    { n: `le pirate du jeu ${deP(q)}`, p: "il" },
    { n: `le chat du jeu ${deP(q)}`, p: "il" },
    { n: "l'oiseau Pic", p: "il" },
    { n: "le robot pompier", p: "il" },
    { n: `la voiture téléguidée ${deP(q)}`, p: "elle" },
    { n: `le petit train ${deP(q)}`, p: "il" },
    { n: "le robot du chef cuisinier", p: "il" },
    { n: "l'abeille robot de la classe", p: "elle" },
    { n: `le dinosaure du jeu ${deP(q)}`, p: "il" },
    { n: "le robot de la vétérinaire", p: "il" },
  ]);
}
const nom = (A: Acteur) => A.n;
/** « le robot de Zoé » → « du robot de Zoé » ; « la tortue… » → « de la tortue… ». */
const du = (A: Acteur) => (A.n.startsWith("le ") ? `du ${A.n.slice(3)}` : `de ${A.n}`);
const cases = (n: number) => `${n} case${n > 1 ? "s" : ""}`;

// ── Les blocs ──
const DRAPEAU: ScratchBlockData = { type: "event", text: "quand le drapeau vert est cliqué" };
/** Un bloc bleu au texte libre (le bloc « move » n'écrit que « avancer de n »). */
const bloc = (text: string): ScratchBlockData => ({ type: "turn", text });
const boucle = (n: number | "?", children: ScratchBlockData[]): ScratchBlockData => ({
  type: "repeat",
  text: `répéter ${n} fois`,
  // « ? » : le nombre de tours est ce qu'on cherche — le bloc écrit « répéter ? fois ».
  times: n as number,
  children,
});
const prog = (titre: string, blocks: ScratchBlockData[]): ScratchCanvasData => ({
  kind: "scratch",
  title: titre,
  blocks: [DRAPEAU, ...blocks],
  display: { showSprite: true, compact: true },
});

// ── Le quadrillage (déplacements codés) ──
type Dir = "droite" | "gauche" | "haut" | "bas";
const FLECHE: Record<Dir, string> = { droite: "→", gauche: "←", haut: "↑", bas: "↓" };
const ALLER: Record<Dir, string> = { droite: "aller à droite", gauche: "aller à gauche", haut: "aller en haut", bas: "aller en bas" };
const DX: Record<Dir, number> = { droite: 1, gauche: -1, haut: 0, bas: 0 };
const DY: Record<Dir, number> = { droite: 0, gauche: 0, haut: 1, bas: -1 };
const OPPOSE: Record<Dir, Dir> = { droite: "gauche", gauche: "droite", haut: "bas", bas: "haut" };
// 6 au plus : un point sur le bord droit ou haut perd son étiquette (vu au rendu, 10/11).
const dansLaGrille = (x: number, y: number) => x >= 0 && y >= 0 && x <= 6 && y <= 6;
function depart(dx: number, dy: number) {
  return {
    x: dx >= 0 ? entre(0, 6 - dx) : entre(-dx, 6),
    y: dy >= 0 ? entre(0, 6 - dy) : entre(-dy, 6),
  };
}
const code = (l: Array<[Dir, number]>) => l.flatMap(([d, k]) => Array(k).fill(FLECHE[d])).join(" ");
const grille = (points: ReperageCanvasData["points"]): ReperageCanvasData => ({
  kind: "reperage",
  grid: { rows: 7, cols: 7 },
  display: { showGrid: true, showAxes: false, showCoordinates: false, showPointLabels: true },
  points,
});
const CIBLES = ["l'étoile", "la pomme", "la fleur", "la maison", "le trésor", "la clé", "le ballon", "le chat", "le livre", "le soleil"];
const court = (c: string) => c.replace(/^(le |la |l'|l’)/, "");
const ORD = ["première", "deuxième", "troisième", "quatrième", "cinquième"];
const rang = (i: number) => (i === 0 ? "1re" : `${i + 1}e`);

/** Le départ et quatre points possibles A, B, C, D : un seul est l'arrivée. */
function quatrePoints(x: number, y: number, juste: [number, number], faux: Array<[number, number]>) {
  const vus = new Set([`${x},${y}`, `${juste[0]},${juste[1]}`]);
  const autres: Array<[number, number]> = [];
  const voisins: Array<[number, number]> = [[juste[0] + 1, juste[1]], [juste[0], juste[1] + 1], [juste[0] - 1, juste[1]], [juste[0], juste[1] - 1]];
  for (const [u, v] of [...faux, ...voisins]) {
    if (autres.length < 3 && dansLaGrille(u, v) && !vus.has(`${u},${v}`)) { vus.add(`${u},${v}`); autres.push([u, v]); }
  }
  const places = melange([juste, ...autres]);
  const lettres = ["A", "B", "C", "D"];
  const i = places.indexOf(juste);
  return {
    juste: `le point ${lettres[i]}`,
    faux: lettres.filter((_, k) => k !== i).map((l) => `le point ${l}`),
    lettre: lettres[i],
    points: [
      { x, y, label: "Départ", color: "#2563eb" },
      ...places.map(([u, v], k) => ({ x: u, y: v, label: lettres[k], color: "#f59e0b" })),
    ],
  };
}

const G = (
  n: number,
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  generate: () => TutorGeneratedQuestionV4,
): TutorBankItemV4 => ({
  kind: "template",
  id: `${microId}_tpl_${n}`,
  niveau: "ce2",
  matiere: "maths",
  notionId: "algorithmique",
  microId,
  difficulty,
  theme: "neutral",
  hint,
  tags: ["ce2", "algorithmique", microId.replace("ce2_algo_", ""), "template", "canvas"],
  generate,
});
const reponse = (n: number) => ({ format: "short" as const, expected: [String(n)], comparator: "number_equal" as const });

/* ───────────── ce2_algo_instruction ───────────── */
const IN = "ce2_algo_instruction";
const ACTIONS = ["tourner à droite", "tourner à gauche", "sauter", "dire Bonjour", "dire Hop !", "reculer de 1", "attendre un peu", "changer de couleur", "jouer un son", "allumer sa lampe"];
function suiteDeBlocs(k: number) {
  const a = melange([...ACTIONS]).slice(0, k - 1);
  const pos = entre(0, k - 1);
  a.splice(pos, 0, `avancer de ${entre(2, 6)}`);
  return a;
}

const GAB_INSTRUCTION: TutorBankItemV4[] = [
  // ★1 — lire un programme dans l'ordre.
  G(3, IN, 1, "On lit un programme de haut en bas.", () => {
    const k = entre(3, 4);
    const b = suiteDeBlocs(k);
    const P = un(PRENOMS);
    const i = un([0, 1, k - 1]);
    const q = i === 0
      ? un(["Quelle est la première instruction ?", `Que fait le robot ${deP(P)} en premier ?`, "Par quoi commence le programme ?"])
      : i === k - 1
        ? un(["Quelle est la dernière instruction ?", `Que fait le robot ${deP(P)} en dernier ?`, "Par quoi finit le programme ?"])
        : un(["Quelle est la deuxième instruction ?", `Que fait le robot ${deP(P)} en deuxième ?`]);
    return {
      text: `Voici le programme du robot ${deP(P)}. ${q}`,
      ...qcm(b[i], [...b.filter((_, j) => j !== i), un(ACTIONS.filter((x) => !b.includes(x)))]),
      explanation: etapes(
        "Le robot lit les blocs de haut en bas, un par un.",
        `Les blocs, dans l'ordre : ${b.join(", puis ")}.`,
        `La ${ORD[i]} instruction est « ${b[i]} ».`,
      ),
      canvas: prog(`Le robot ${deP(P)}`, b.map(bloc)),
    };
  }),
  // ★1 — deux avancées, une seule direction.
  G(4, IN, 1, "Deux avancées dans le même sens s'ajoutent.", () => {
    const a = entre(1, 5), b = entre(1, 5);
    const R = robotSimple();
    return {
      text: `${cap(R.n)} avance de ${cases(a)}, puis de ${cases(b)}. ${un([
        "Combien de cases en tout ?",
        "De combien de cases a-t-il avancé ?",
        "Combien de cases a-t-il fait en tout ?",
        "Il est à combien de cases du départ ?",
      ])}`,
      ...reponse(a + b),
      explanation: etapes("On ajoute les deux avancées.", `${a} + ${b} = ${a + b}.`, `Il a avancé de ${cases(a + b)}.`),
      canvas: prog(cap(R.n), [bloc(`avancer de ${a}`), bloc(`avancer de ${b}`)]),
    };
  }),
];

const GAB_INSTRUCTION_3_4: TutorBankItemV4[] = [
  // ★3 — trois avancées, avec un personnage.
  G(1, IN, 3, "Suis les instructions une par une, dans l'ordre.", () => {
    const a = entre(1, 6), b = entre(1, 6), c = entre(1, 5);
    const A = acteur();
    return {
      text: `${cap(A.n)} avance de ${a}, puis de ${b}, puis de ${cases(c)}, tout droit. ${un([
        `De combien de cases avance-t-${A.p} en tout ?`,
        `À combien de cases du départ est-${A.p} ?`,
        "Combien de cases parcourt-on en tout ?",
      ])}`,
      ...reponse(a + b + c),
      explanation: etapes(
        "Des avancées dans le même sens s'ajoutent.",
        `${a} + ${b} + ${c} = ${a + b + c}.`,
        `${cap(A.p)} a avancé de ${cases(a + b + c)}.`,
      ),
      canvas: prog(cap(nom(A)), [bloc(`avancer de ${a}`), bloc(`avancer de ${b}`), bloc(`avancer de ${c}`)]),
    };
  }),
  // ★3 — juste avant, juste après.
  G(5, IN, 3, "Repère le bloc nommé, puis regarde son voisin.", () => {
    const b = suiteDeBlocs(4);
    const A = acteur();
    const apres = Math.random() < 0.5;
    const i = apres ? entre(0, 2) : entre(1, 3);
    const j = apres ? i + 1 : i - 1;
    return {
      text: `Voici le programme ${du(A)}. ${un([
        `Quelle instruction vient juste ${apres ? "après" : "avant"} « ${b[i]} » ?`,
        `Que fait-${A.p} juste ${apres ? "après" : "avant"} « ${b[i]} » ?`,
      ])}`,
      ...qcm(b[j], [...b.filter((_, k) => k !== j && k !== i), b[i], un(ACTIONS.filter((x) => !b.includes(x)))]),
      explanation: etapes(
        "Un programme se lit de haut en bas : chaque bloc a un voisin au-dessus et un voisin en dessous.",
        `« ${b[i]} » est la ${ORD[i]} instruction. Juste ${apres ? "après" : "avant"}, on lit « ${b[j]} ».`,
        `C'est « ${b[j]} ».`,
      ),
      canvas: prog(cap(nom(A)), b.map(bloc)),
    };
  }),
  // ★4 — avancer puis reculer.
  G(2, IN, 4, "Avancer puis reculer : on fait la différence.", () => {
    const av = entre(4, 9);
    const re = entre(1, av - 1);
    const A = acteur();
    return {
      text: `${cap(A.n)} avance de ${cases(av)}, puis recule de ${cases(re)}. ${un([
        `À combien de cases de son départ est-${A.p} ?`,
        `Combien de cases ${A.p === "il" ? "le" : "la"} séparent du départ ?`,
        "À combien de cases du départ s'arrête-t-on ?",
      ])}`,
      ...reponse(av - re),
      explanation: etapes(
        "Reculer, c'est revenir en arrière : on enlève.",
        `${av} − ${re} = ${av - re}. Ajouter les deux nombres donnerait ${av + re} : ce serait toujours avancer.`,
        `${cap(A.p)} est à ${cases(av - re)} du départ.`,
      ),
      canvas: prog(cap(nom(A)), [bloc(`avancer de ${av}`), bloc(`reculer de ${re}`)]),
    };
  }),
  // ★4 — avancer, reculer, avancer.
  G(6, IN, 4, "Ajoute les avancées, enlève les reculs.", () => {
    const a = entre(3, 7), r = entre(1, a - 1), b = entre(1, 5);
    const A = acteur();
    return {
      text: `${cap(A.n)} avance de ${a}, recule de ${r}, puis avance de ${cases(b)}. ${un([
        `À combien de cases du départ est-${A.p} ?`,
        "À combien de cases du départ s'arrête-t-on ?",
      ])}`,
      ...reponse(a - r + b),
      explanation: etapes(
        "On suit le programme bloc par bloc : on ajoute quand on avance, on enlève quand on recule.",
        `${a} − ${r} + ${b} = ${a - r + b}.`,
        `${cap(A.p)} est à ${cases(a - r + b)} du départ.`,
      ),
      canvas: prog(cap(nom(A)), [bloc(`avancer de ${a}`), bloc(`reculer de ${r}`), bloc(`avancer de ${b}`)]),
    };
  }),
];

/* ───────────── ce2_algo_deplacement ───────────── */
const DE = "ce2_algo_deplacement";
/** Deux traits : un sur le côté, un en hauteur, dans un ordre au hasard. */
function deuxTraits(max = 4) {
  const h = un<Dir>(["droite", "gauche"]);
  const v = un<Dir>(["haut", "bas"]);
  const kh = entre(1, max);
  const kv = un([1, 2, 3, 4].filter((n) => n !== kh && n <= max)) ?? 1;
  const l: Array<[Dir, number]> = Math.random() < 0.5 ? [[h, kh], [v, kv]] : [[v, kv], [h, kh]];
  return { h, v, kh, kv, l };
}

const GAB_DEPLACEMENT: TutorBankItemV4[] = [
  // ★2 — choisir le bon code de flèches.
  G(3, DE, 2, "Compte les cases sur le côté, puis en hauteur.", () => {
    const { h, v, kh, kv, l } = deuxTraits();
    const { x, y } = depart(DX[h] * kh, DY[v] * kv);
    const c = un(CIBLES);
    const P = un(PRENOMS);
    const juste = code(l);
    return {
      text: un([
        `Quel code mène le robot ${deP(P)} jusqu'à ${c} ?`,
        `Le robot ${deP(P)} veut aller à ${c}. Quel code choisir ?`,
        `Aide le robot ${deP(P)} à aller à ${c}. Quel est le bon code ?`,
      ]).replace("à le ", "au "),
      ...qcm(juste, [
        code(l.map(([d, k]) => [d, d === h ? kv : kh] as [Dir, number])),
        code(l.map(([d, k]) => [d === h ? OPPOSE[h] : d, k] as [Dir, number])),
        code(l.map(([d, k]) => [d === v ? OPPOSE[v] : d, k] as [Dir, number])),
        code(l.map(([d, k], i) => [d, i === 0 ? k + 1 : k] as [Dir, number])),
      ]),
      explanation: etapes(
        "Chaque flèche fait avancer d'une case dans sa direction.",
        `Du départ à ${c} : ${cases(kh)} ${h === "droite" ? "à droite" : "à gauche"} et ${cases(kv)} ${v === "haut" ? "en haut" : "en bas"}.`,
        `Le bon code est ${juste}.`,
      ).replace("à le ", "au "),
      canvas: grille([
        { x, y, label: "Départ", color: "#2563eb" },
        { x: x + DX[h] * kh, y: y + DY[v] * kv, label: court(c), color: "#f59e0b" },
      ]),
    };
  }),
  // ★2 — suivre un code de flèches.
  G(4, DE, 2, "Suis les flèches une par une sur le quadrillage.", () => {
    const { h, v, kh, kv, l } = deuxTraits();
    const { x, y } = depart(DX[h] * kh, DY[v] * kv);
    const P = un(PRENOMS);
    const jx = x + DX[h] * kh, jy = y + DY[v] * kv;
    const q = quatrePoints(x, y, [jx, jy], [
      [x - DX[h] * kh, jy],
      [jx, y - DY[v] * kv],
      [x + DX[h] * kv, y + DY[v] * kh],
    ]);
    return {
      text: `Le robot ${deP(P)} suit ce code : ${code(l)}. ${un(["Sur quel point arrive-t-il ?", "Où s'arrête-t-il ?", "Quel point atteint-il ?"])}`,
      ...qcm(q.juste, q.faux),
      explanation: etapes(
        "Chaque flèche fait avancer d'une case.",
        `Depuis le départ : ${cases(kh)} ${h === "droite" ? "à droite" : "à gauche"} et ${cases(kv)} ${v === "haut" ? "en haut" : "en bas"}.`,
        `Il arrive sur ${q.juste}.`,
      ),
      canvas: grille(q.points),
    };
  }),
  // ★3 — combien d'instructions au minimum ?
  G(2, DE, 3, "Une instruction peut faire plusieurs cases dans la même direction.", () => {
    const k = entre(2, 3);
    const dirs = melange<Dir>(["droite", "haut", "gauche", "bas"]).slice(0, k);
    // Deux directions qui se suivent ne doivent pas être opposées : ce serait un aller-retour.
    if (k === 3 && OPPOSE[dirs[0]] === dirs[1]) [dirs[1], dirs[2]] = [dirs[2], dirs[1]];
    const nb = dirs.map(() => entre(2, 3));
    const A = acteur();
    const long = dirs.flatMap((d, i) => Array(nb[i]).fill(bloc(`${ALLER[d]} de 1`)));
    return {
      text: `${cap(A.n)} a ce long programme. ${un([
        "Combien d'instructions faut-il au minimum pour faire le même chemin ?",
        "En regroupant les cases, combien d'instructions suffisent ?",
        `Combien d'instructions au plus court pour ${A.p === "il" ? "le" : "la"} faire aller au même endroit ?`,
      ])}`,
      ...reponse(k),
      explanation: etapes(
        "Une instruction dit une direction et un nombre de cases : on regroupe les cases d'une même direction.",
        dirs.map((d, i) => `« ${ALLER[d]} de ${nb[i]} »`).join(", puis ") + ".",
        `Il suffit de ${k} instructions au lieu de ${long.length}.`,
      ),
      canvas: prog("Le programme à raccourcir", long),
    };
  }),
  // ★3 — écrire le code d'un trajet raconté.
  G(5, DE, 3, "Une flèche par case, dans l'ordre du trajet.", () => {
    const { h, v, kh, kv, l } = deuxTraits();
    const A = acteur();
    const dit = l.map(([d, k]) => `${cases(k)} ${d === "droite" ? "à droite" : d === "gauche" ? "à gauche" : d === "haut" ? "vers le haut" : "vers le bas"}`).join(", puis ");
    const juste = code(l);
    const { x, y } = depart(DX[h] * kh, DY[v] * kv);
    return {
      text: `${cap(A.n)} doit aller ${dit}. ${un(["Quel code de flèches faut-il écrire ?", "Quel est le bon code ?", "Quel code choisir ?"])}`,
      ...qcm(juste, [
        code([...l].reverse()),
        code(l.map(([d, k]) => [d === h ? OPPOSE[h] : d, k] as [Dir, number])),
        code(l.map(([d, k]) => [d, d === h ? kv : kh] as [Dir, number])),
        code(l.map(([d, k], i) => [d, i === 1 ? k + 1 : k] as [Dir, number])),
      ]),
      explanation: etapes(
        "On écrit une flèche par case, dans l'ordre du trajet.",
        l.map(([d, k]) => `${k} fois ${FLECHE[d]}`).join(", puis ") + ".",
        `Le code est ${juste}.`,
      ),
      canvas: grille([{ x, y, label: "Départ", color: "#2563eb" }]),
    };
  }),
  // ★4 — un aller et un retour qui se compensent.
  G(1, DE, 4, "Droite puis gauche : il ne reste que la différence.", () => {
    const h = un<Dir>(["droite", "gauche"]);
    const v = un<Dir>(["haut", "bas"]);
    const a = entre(3, 6), r = entre(1, a - 1), kv = entre(1, 4);
    const A = acteur();
    const reste = a - r;
    const sens = h === "droite" ? "à droite" : "à gauche";
    return {
      text: `${cap(A.n)} fait : ${ALLER[h]} de ${a}, ${ALLER[v]} de ${kv}, puis ${ALLER[OPPOSE[h]]} de ${r}. ${un([
        `De combien de cases est-${A.p} ${sens} du départ ?`,
        `Combien de cases ${sens} du départ ?`,
      ])}`,
      ...reponse(reste),
      explanation: etapes(
        "Deux déplacements opposés se compensent : on fait la différence.",
        `${a} ${sens}, puis ${r} dans l'autre sens : ${a} − ${r} = ${reste}. Le trajet ${v === "haut" ? "vers le haut" : "vers le bas"} ne change rien à ce calcul.`,
        `${cap(A.p)} est à ${cases(reste)} ${sens} du départ.`,
      ),
      canvas: prog(cap(nom(A)), [bloc(`${ALLER[h]} de ${a}`), bloc(`${ALLER[v]} de ${kv}`), bloc(`${ALLER[OPPOSE[h]]} de ${r}`)]),
    };
  }),
  // ★4 — un code avec un retour en arrière.
  G(6, DE, 4, "Les flèches opposées s'annulent deux à deux.", () => {
    for (let essai = 0; essai < 50; essai++) {
      const h = un<Dir>(["droite", "gauche"]);
      const v = un<Dir>(["haut", "bas"]);
      const a = entre(2, 4), b = entre(1, 3), r = entre(1, a - 1);
      const l: Array<[Dir, number]> = [[h, a], [v, b], [OPPOSE[h], r]];
      const { x, y } = depart(DX[h] * a, DY[v] * b);
      const jx = x + DX[h] * (a - r), jy = y + DY[v] * b;
      const q = quatrePoints(x, y, [jx, jy], [
        [x + DX[h] * a, jy],
        [x + DX[h] * (a + r), jy],
        [jx, y - DY[v] * b],
      ]);
      if (q.faux.length < 3) continue;
      const A = acteur();
      return {
        text: `${cap(A.n)} suit ce code : ${code(l)}. ${un([`Sur quel point arrive-t-${A.p} ?`, `Où s'arrête-t-${A.p} ?`])}`,
        ...qcm(q.juste, q.faux),
        explanation: etapes(
          "On suit les flèches une à une ; deux flèches opposées s'annulent.",
          `${a} ${FLECHE[h]} et ${r} ${FLECHE[OPPOSE[h]]} : il reste ${a - r} ${FLECHE[h]}. En hauteur : ${b} ${FLECHE[v]}.`,
          `${cap(A.p)} arrive sur ${q.juste}.`,
        ),
        canvas: grille(q.points),
      };
    }
    throw new Error("ce2_algo_deplacement_tpl_6 : aucun tirage");
  }),
];

/* ───────────── ce2_algo_repetition ───────────── */
const RE = "ce2_algo_repetition";
const GESTES = ["sauter", "tourner à droite", "dire Hop !", "dire Coucou", "frapper des mains", "jouer un son", "changer de couleur", "dire Miaou", "lancer le ballon", "agiter la main"];

const GAB_REPETITION: TutorBankItemV4[] = [
  // ★2 — reconnaître une répétition.
  G(3, RE, 2, "Compte combien de fois le même bloc revient.", () => {
    const n = entre(3, 5);
    const avance = Math.random() < 0.5;
    const p = entre(2, 5);
    const geste = avance ? `avancer de ${p}` : un(GESTES);
    const P = un(PRENOMS);
    return {
      text: un([
        `Quel programme fait la même chose que celui ${deP(P)} ?`,
        `${P} veut raccourcir son programme. Lequel choisir ?`,
        `Par quoi remplacer le programme ${deP(P)} ?`,
      ]),
      ...qcm(`répéter ${n} fois : ${geste}`, [
        `répéter ${n + 1} fois : ${geste}`,
        `répéter ${n - 1} fois : ${geste}`,
        avance && p !== n ? `répéter ${p} fois : avancer de ${n}` : `répéter ${n} fois : ${un(GESTES.filter((g) => g !== geste))}`,
        avance ? `avancer de ${n + p}` : `${geste} une seule fois`,
      ]),
      explanation: etapes(
        "Quand le même bloc revient plusieurs fois de suite, on l'écrit une fois dans une répétition.",
        `« ${geste} » revient ${n} fois.`,
        `On écrit : répéter ${n} fois : ${geste}.`,
      ),
      canvas: prog(`Le programme ${deP(P)}`, Array.from({ length: n }, () => bloc(geste))),
    };
  }),
  // ★2 — combien de fois ?
  G(4, RE, 2, "Le nombre écrit dans « répéter » dit combien de fois.", () => {
    const n = entre(2, 9);
    const geste = un(GESTES);
    const R = robotSimple();
    const q = geste.startsWith("dire")
      ? `Combien de fois ${R.n} dit-il « ${geste.replace("dire ", "")} » ?`
      : `Combien de fois ${R.n} doit-il ${geste} ?`;
    return {
      text: q,
      ...reponse(n),
      explanation: etapes(
        "Le bloc à l'intérieur de « répéter » est fait autant de fois que le nombre écrit.",
        `Ici, « répéter ${n} fois ».`,
        `${cap(R.n)} le fait ${n} fois.`,
      ),
      canvas: prog(cap(R.n), [boucle(n, [bloc(geste)])]),
    };
  }),
  // ★3 — le programme le plus court.
  G(5, RE, 3, "Une répétition évite de recopier le même bloc.", () => {
    const n = entre(4, 9);
    const geste = un(GESTES);
    const A = acteur();
    const P = un(PRENOMS);
    return {
      text: `${P} veut que ${A.n} fasse « ${geste} » ${n} fois de suite. ${un(["Quel programme est le plus court ?", "Quel programme choisir pour écrire le moins ?"])}`,
      ...qcm(`répéter ${n} fois : ${geste}`, [
        `écrire ${n} fois le bloc « ${geste} »`,
        `répéter ${n + 1} fois : ${geste}`,
        `écrire le bloc « ${geste} » une seule fois`,
        `répéter ${n - 1} fois : ${geste}`,
      ]),
      explanation: etapes(
        "Une répétition fait refaire un bloc sans le recopier.",
        `Écrire ${n} blocs marche aussi, mais c'est long. « Répéter ${n} fois » tient en deux lignes.`,
        `Le plus court : répéter ${n} fois : ${geste}.`,
      ),
    };
  }),
  // ★3 — une boucle à deux blocs.
  G(6, RE, 3, "Tout ce qui est dans la boucle est refait à chaque tour.", () => {
    const n = entre(2, 5), p = entre(2, 5);
    const tourne = un(["tourner à droite", "tourner à gauche", "sauter", "dire Hop !"]);
    const A = acteur();
    const cas = un(["geste", "cases"] as const);
    const q = cas === "geste"
      ? `Combien de fois fait-${A.p} « ${tourne} » ?`
      : `De combien de cases avance-t-${A.p} en tout ?`;
    return {
      text: `Voici le programme ${du(A)}. ${q}`,
      ...reponse(cas === "geste" ? n : n * p),
      explanation: etapes(
        "À chaque tour, les deux blocs de la boucle sont faits.",
        cas === "geste" ? `La boucle tourne ${n} fois : « ${tourne} » est fait ${n} fois.` : `${n} tours de ${cases(p)} : ${n} × ${p} = ${n * p}.`,
        cas === "geste" ? `${n} fois.` : `${cap(cases(n * p))}.`,
      ),
      canvas: prog(cap(nom(A)), [boucle(n, [bloc(`avancer de ${p}`), bloc(tourne)])]),
    };
  }),
  // ★4 — tours × cases.
  G(1, RE, 4, "On multiplie les tours par ce que fait le bloc.", () => {
    const fois = entre(2, 8), pas = entre(2, 9);
    const A = acteur();
    return {
      text: `${cap(A.n)} a ce programme : « répéter ${fois} fois : avancer de ${pas} ». ${un([
        `De combien de cases avance-t-${A.p} en tout ?`,
        "Combien de cases fait-on en tout ?",
        `À combien de cases du départ arrive-t-${A.p} ?`,
      ])}`,
      ...reponse(fois * pas),
      explanation: etapes(
        "À chaque tour, le bloc refait son avancée : on multiplie.",
        `${fois} × ${pas} = ${fois * pas}. Additionner ${fois} et ${pas} donnerait ${fois + pas} : faux, l'un compte des tours, l'autre des cases.`,
        `${cap(cases(fois * pas))}.`,
      ),
      canvas: prog(cap(nom(A)), [boucle(fois, [bloc(`avancer de ${pas}`)])]),
    };
  }),
  // ★4 — combien de tours pour un total ?
  G(2, RE, 4, "Combien de fois le bloc tient-il dans le total ?", () => {
    const fois = entre(2, 9), pas = entre(2, 9);
    const A = acteur();
    return {
      text: `${cap(A.n)} doit avancer de ${fois * pas} cases avec « répéter ? fois : avancer de ${pas} ». ${un([
        "Quel nombre faut-il écrire à la place du « ? » ?",
        "Combien de tours faut-il ?",
        "Combien de fois faut-il répéter ?",
      ])}`,
      ...reponse(fois),
      explanation: etapes(
        "On cherche combien de fois le bloc tient dans le total.",
        `${pas} × ${fois} = ${fois * pas}, donc ${fois * pas} ÷ ${pas} = ${fois}.`,
        `Il faut répéter ${fois} fois.`,
      ),
      canvas: prog(cap(nom(A)), [boucle("?", [bloc(`avancer de ${pas}`)])]),
    };
  }),
];

/* ───────────── ce2_algo_corriger ───────────── */
const CR = "ce2_algo_corriger";
const GAB_CORRIGER: TutorBankItemV4[] = [
  // ★3 — le nombre faux.
  G(3, CR, 3, "Le nombre de cases est faux : on le change.", () => {
    const v = entre(4, 10);
    const e = un([v - entre(1, 3), v + entre(1, 3)].filter((x) => x > 0 && x * 2 !== v)) ?? v + 1;
    const A = acteur();
    return {
      text: `${cap(A.n)} devait avancer de ${v} cases. Le programme dit « avancer de ${e} ». ${un(["Que faut-il corriger ?", "Comment réparer le programme ?", "Que faut-il changer ?"])}`,
      ...qcm(`remplacer le ${e} par ${v}`, [
        `remplacer le ${e} par ${Math.abs(v - e)}`,
        `remplacer le ${e} par ${v + e}`,
        `remplacer « avancer » par « reculer »`,
        `répéter le programme 2 fois`,
      ]),
      explanation: etapes(
        "Corriger, c'est trouver le bloc faux et changer ce qui ne va pas.",
        `Il fallait ${v} cases, le programme en fait ${e}.`,
        `On remplace le ${e} par ${v}.`,
      ),
      canvas: prog(`Le programme à corriger`, [bloc(`avancer de ${e}`)]),
    };
  }),
  // ★3 — la flèche fausse.
  G(4, CR, 3, "Suis le code sur le quadrillage et cherche où il se trompe.", () => {
    const { h, v, kh, kv, l } = deuxTraits(3);
    const { x, y } = depart(DX[h] * kh, DY[v] * kv);
    const fl = l.flatMap(([d, k]) => Array<Dir>(k).fill(d));
    const i = entre(0, fl.length - 1);
    const faux = [...fl];
    faux[i] = OPPOSE[fl[i]];
    const c = un(CIBLES);
    const P = un(PRENOMS);
    return {
      text: `Le robot ${deP(P)} doit aller à ${c}. Son code : ${faux.map((d) => FLECHE[d]).join(" ")}. ${un(["Quelle flèche est fausse ?", "Quelle flèche faut-il changer ?"])}`.replace("à le ", "au "),
      ...qcm(`la ${rang(i)} flèche`, [...fl.map((_, k) => `la ${rang(k)} flèche`), "aucune, le code est juste"]),
      explanation: etapes(
        "On suit le code flèche par flèche, sur le quadrillage.",
        `La ${rang(i)} flèche est ${FLECHE[faux[i]]} : il fallait ${FLECHE[fl[i]]}.`,
        `C'est la ${rang(i)} flèche.`,
      ),
      canvas: grille([
        { x, y, label: "Départ", color: "#2563eb" },
        { x: x + DX[h] * kh, y: y + DY[v] * kv, label: court(c), color: "#f59e0b" },
      ]),
    };
  }),
  // ★4 — quel nombre écrire ?
  G(1, CR, 4, "Compare ce que fait le programme à ce qu'il devait faire.", () => {
    const voulu = entre(4, 12);
    const ecrit = un([voulu - entre(1, 3), voulu + entre(1, 3)]);
    const A = acteur();
    const trop = ecrit > voulu;
    return {
      text: `${cap(A.n)} devait avancer de ${voulu} cases, mais ${A.p} s'arrête ${cases(Math.abs(ecrit - voulu))} trop ${trop ? "loin" : "tôt"}. Le programme dit « avancer de ${ecrit} ». Quel nombre écrire ?`,
      ...reponse(voulu),
      explanation: etapes(
        "On remplace le nombre faux par le bon.",
        `Il fallait ${voulu} cases ; ${ecrit} ${trop ? "c'est trop" : "ce n'est pas assez"}.`,
        `Il faut écrire ${voulu}.`,
      ),
      canvas: prog("Le programme à corriger", [bloc(`avancer de ${ecrit}`)]),
    };
  }),
  // ★4 — le bloc à changer, et comment.
  G(5, CR, 4, "Cherche la direction où il y a une erreur.", () => {
    const h = un<Dir>(["droite", "gauche"]);
    const v = un<Dir>(["haut", "bas"]);
    const a = entre(3, 7), b = entre(2, 6);
    const surH = Math.random() < 0.5;
    const n = entre(1, 2);
    const trop = Math.random() < 0.5;
    const A = acteur();
    const c = un(CIBLES);
    const d0 = surH ? h : v;
    const TROP: Record<Dir, string> = { droite: "trop à droite", gauche: "trop à gauche", haut: "trop haut", bas: "trop bas" };
    const ecart = `${cases(n)} ${TROP[trop ? d0 : OPPOSE[d0]]}`;
    const d = surH ? h : v, k = surH ? a : b;
    const bon = trop ? k - n : k + n;
    const juste = `« ${ALLER[d]} de ${k} » devient « ${ALLER[d]} de ${bon} »`;
    const od = surH ? v : h, ok = surH ? b : a;
    return {
      text: `${cap(nom(A))} devait arriver ${c.startsWith("le ") ? "au " + c.slice(3) : "à " + c}. ${cap(A.p)} s'arrête ${ecart}. ${un(["Comment corriger ?", "Quel bloc changer, et comment ?"])}`,
      ...qcm(juste, [
        `« ${ALLER[d]} de ${k} » devient « ${ALLER[d]} de ${trop ? k + n : k - n} »`,
        `« ${ALLER[od]} de ${ok} » devient « ${ALLER[od]} de ${trop ? ok - n : ok + n} »`,
        `« ${ALLER[d]} de ${k} » devient « ${ALLER[OPPOSE[d]]} de ${k} »`,
      ]),
      explanation: etapes(
        "On trouve la direction de l'erreur, puis le bloc qui va dans cette direction.",
        `L'erreur est ${surH ? "sur le côté" : "en hauteur"} : on ${trop ? "enlève" : "ajoute"} ${cases(n)} à « ${ALLER[d]} de ${k} ».`,
        `${cap(juste)}.`,
      ),
      canvas: prog("Le programme à corriger", [bloc(`${ALLER[h]} de ${a}`), bloc(`${ALLER[v]} de ${b}`)]),
    };
  }),
  // ★5 — le nombre de tours pour une figure.
  G(2, CR, 5, "Le nombre de répétitions décide du nombre de côtés.", () => {
    const f = un([
      { nom: "un carré", cotes: 4 },
      { nom: "un triangle", cotes: 3 },
      { nom: "un hexagone", cotes: 6 },
      { nom: "un pentagone", cotes: 5 },
    ]);
    const ecrit = un([f.cotes - 1, f.cotes + 1]);
    const A = acteur();
    const L = entre(2, 6);
    return {
      text: `${cap(A.n)} devait tracer ${f.nom}, mais le programme dit « répéter ${ecrit} fois ». ${un(["Par quel nombre faut-il remplacer le " + ecrit + " ?", "Combien de tours faut-il ?"])}`,
      ...reponse(f.cotes),
      explanation: etapes(
        "Chaque tour trace un côté : il faut autant de tours que la figure a de côtés.",
        `${cap(f.nom)} a ${f.cotes} côtés. Avec ${ecrit} tours, la figure ${ecrit < f.cotes ? "reste ouverte" : "repasse sur un côté"}.`,
        `Il faut ${f.cotes} tours.`,
      ),
      canvas: prog("Le programme à corriger", [boucle(ecrit, [bloc(`avancer de ${L}`), bloc("tourner")])]),
    };
  }),
  // ★5 — corriger le pas d'une boucle.
  G(6, CR, 5, "Total ÷ nombre de tours = ce qu'il faut à chaque tour.", () => {
    const n = entre(2, 5), v = entre(2, 6);
    const e = un([v - 1, v + 1].filter((x) => x > 0 && x !== v));
    const A = acteur();
    return {
      text: `${cap(A.n)} doit avancer de ${n * v} cases. Le programme dit « répéter ${n} fois : avancer de ${e} ». ${un(["Par quel nombre remplacer le " + e + " ?", "Quel nombre écrire à la place du " + e + " ?"])}`,
      ...reponse(v),
      explanation: etapes(
        `La boucle fait ${n} tours : on cherche l'avancée d'un seul tour.`,
        `${n} × ${e} = ${n * e} : ce n'est pas ${n * v}. ${n} × ${v} = ${n * v}.`,
        `Il faut écrire ${v}.`,
      ),
      canvas: prog("Le programme à corriger", [boucle(n, [bloc(`avancer de ${e}`)])]),
    };
  }),
];

/* ───────────── ce2_algo_defi ───────────── */
const DF = "ce2_algo_defi";
const GAB_DEFI: TutorBankItemV4[] = [
  // ★5 — la longueur d'un trait.
  G(1, DF, 5, "Multiplie la longueur d'un côté par le nombre de côtés.", () => {
    const f = un([
      { nom: "un triangle", cotes: 3 },
      { nom: "un carré", cotes: 4 },
      { nom: "un pentagone", cotes: 5 },
      { nom: "un hexagone", cotes: 6 },
    ]);
    const L = entre(2, 9);
    const A = acteur();
    return {
      text: `${cap(A.n)} trace ${f.nom} : « répéter ${f.cotes} fois : avancer de ${L}, puis tourner ». ${un(["Quelle est la longueur du trait, en cases ?", "Combien de cases mesure tout le trait ?"])}`,
      ...reponse(f.cotes * L),
      explanation: etapes(
        "Chaque tour trace un côté : on met les côtés bout à bout.",
        `${L} × ${f.cotes} = ${f.cotes * L}.`,
        `Le trait mesure ${cases(f.cotes * L)} : c'est le périmètre de la figure.`,
      ),
      canvas: prog(`Tracer ${f.nom}`, [boucle(f.cotes, [bloc(`avancer de ${L}`), bloc("tourner")])]),
    };
  }),
  // ★5 — une boucle à deux avancées.
  G(2, DF, 5, "Cherche d'abord ce que fait un tour complet.", () => {
    const fois = entre(2, 6), a = entre(1, 5), b = entre(1, 5);
    const A = acteur();
    const recule = Math.random() < 0.4 && a > b;
    const parTour = recule ? a - b : a + b;
    return {
      text: `${cap(A.n)} a ce programme : « répéter ${fois} fois : avancer de ${a}, puis ${recule ? "reculer" : "avancer"} de ${b} ». À combien de cases du départ arrive-t-${A.p} ?`,
      ...reponse(fois * parTour),
      explanation: etapes(
        "On cherche ce que fait UN tour, puis on multiplie par le nombre de tours.",
        `Un tour : ${a} ${recule ? "−" : "+"} ${b} = ${parTour}. ${fois} tours : ${parTour} × ${fois} = ${fois * parTour}.`,
        `${cap(A.p)} arrive à ${cases(fois * parTour)} du départ.`,
      ),
      canvas: prog(cap(nom(A)), [boucle(fois, [bloc(`avancer de ${a}`), bloc(`${recule ? "reculer" : "avancer"} de ${b}`)])]),
    };
  }),
  // ★5 — deux programmes : lequel va le plus loin ?
  G(3, DF, 5, "Calcule le chemin de chaque programme, puis compare.", () => {
    const [P1, P2] = melange([...PRENOMS]).slice(0, 2);
    const cas = un(["un", "deux", "egal"] as const);
    let a = entre(2, 6), b = entre(2, 5), c = 0, d = 0;
    if (a === b) a += 1;
    if (cas === "egal") {
      // Même total, écrit autrement : 3 × 4 et 4 × 3, ou 2 × 6 et 6 × 2…
      [c, d] = Math.random() < 0.5 ? [b, a] : a % 2 === 0 ? [a / 2, b * 2] : [b, a];
    } else {
      c = entre(2, 6);
      d = entre(2, 5);
      for (let k = 0; k < 30 && (c * d === a * b || (cas === "un") !== a * b > c * d); k++) {
        a = entre(2, 6); b = entre(2, 5); c = entre(2, 6); d = entre(2, 5);
      }
      if (c * d === a * b || (cas === "un") !== a * b > c * d) [a, b, c, d] = cas === "un" ? [4, 5, 3, 3] : [3, 3, 4, 5];
    }
    const R = { un: `le robot ${deP(P1)}`, deux: `le robot ${deP(P2)}`, egal: "ils vont aussi loin l'un que l'autre" };
    return {
      text: `Le robot ${deP(P1)} : « répéter ${a} fois : avancer de ${b} ». Celui ${deP(P2)} : « répéter ${c} fois : avancer de ${d} ». ${un(["Lequel va le plus loin ?", "Quel robot avance le plus ?"])}`,
      ...qcm(R[cas], [...Object.values(R), "on ne peut pas savoir"]),
      explanation: etapes(
        "Pour chaque programme : tours × cases.",
        `${P1} : ${a} × ${b} = ${a * b}. ${P2} : ${c} × ${d} = ${c * d}.`,
        `${cap(R[cas])}.`,
      ),
      canvas: {
        kind: "scratch",
        title: "Deux programmes",
        blocks: [
          { type: "event", text: `robot ${deP(P1)}` },
          boucle(a, [bloc(`avancer de ${b}`)]),
          { type: "event", text: `robot ${deP(P2)}` },
          boucle(c, [bloc(`avancer de ${d}`)]),
        ],
        display: { compact: true },
      },
    };
  }),
];

const FIGES: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "ce2_algo_instruction_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_instruction",
    difficulty: 1,
    theme: "neutral",
    text: "Dans quel ordre l'ordinateur exécute-t-il les instructions d'un programme ?",
    format: "qcm",
    choices: [
      "de la première à la dernière, dans l'ordre écrit",
      "dans l'ordre qu'il préfère",
      "en commençant par la dernière",
      "toutes en même temps",
    ],
    expected: ["de la première à la dernière, dans l'ordre écrit"],
    comparator: "mcq_exact",
    hint: "Comme une recette de cuisine : on suit les étapes dans l'ordre.",
    explanation: exp(
      "Un programme est une suite d'instructions exécutées l'une après l'autre, du haut vers le bas.",
      "On lit les instructions dans l'ordre où elles sont écrites, sans en sauter.",
      "Changer l'ordre change le résultat : « avance puis tourne » n'arrive pas au même endroit que « tourne puis avance », même avec exactement les mêmes instructions.",
      "De la première à la dernière, dans l'ordre écrit.",
    ),
    tags: ["ce2", "algorithmique", "instruction", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_instruction_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_instruction",
    difficulty: 4,
    theme: "neutral",
    text: "Un robot regarde vers la droite. Programme A : « avancer de 3, puis tourner ». Programme B : « tourner, puis avancer de 3 ». Arrivent-ils au même endroit ?",
    format: "qcm",
    choices: [
      "non, l'ordre des instructions change le résultat",
      "oui, ce sont les mêmes instructions",
      "oui, si le robot va assez vite",
      "on ne peut pas savoir",
    ],
    expected: ["non, l'ordre des instructions change le résultat"],
    comparator: "mcq_exact",
    hint: "Dans quelle direction le robot avance-t-il, dans chaque programme ?",
    explanation: exp(
      "Un programme est une succession : chaque instruction s'exécute dans l'état laissé par la précédente.",
      "On suit le robot pas à pas dans chaque programme, en notant sa direction.",
      "Dans A, le robot avance d'abord vers la droite, puis tourne sur place. Dans B, il tourne d'abord, puis avance dans la NOUVELLE direction. Les deux finissent à des endroits différents, avec pourtant les mêmes instructions.",
      "Non : l'ordre change le résultat.",
    ),
    tags: ["ce2", "algorithmique", "instruction", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_instruction_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_instruction",
    difficulty: 3,
    theme: "neutral",
    text: "Un robot part d'une case, avance de 2 cases, puis avance encore de 3 cases dans la même direction. De combien de cases s'est-il déplacé en tout ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Deux avancées dans la même direction s'additionnent.",
    explanation: exp(
      "Deux déplacements successifs dans la même direction s'additionnent.",
      "On suit le robot instruction par instruction en comptant les cases.",
      "2 + 3 = 5. Le robot est à 5 cases de son point de départ.",
      "Il s'est déplacé de 5 cases.",
    ),
    tags: ["ce2", "algorithmique", "instruction", "canvas"],
    canvas: programme("Le déplacement du robot", [
      { type: "event", text: "quand le programme démarre" },
      { type: "move", text: "avancer de 2 cases", value: 2 },
      { type: "move", text: "avancer de 3 cases", value: 3 },
    ]),
  },
  {
    kind: "fixed",
    id: "ce2_algo_deplacement_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_deplacement",
    difficulty: 2,
    theme: "neutral",
    text: "Pour coder un déplacement sur un quadrillage, que faut-il indiquer à chaque étape ?",
    format: "qcm",
    choices: [
      "la direction et le nombre de cases",
      "la couleur de la case",
      "le nom du robot",
      "la vitesse du robot",
    ],
    expected: ["la direction et le nombre de cases"],
    comparator: "mcq_exact",
    hint: "Où va-t-il, et de combien ?",
    explanation: exp(
      "Une instruction de déplacement dit dans quelle direction aller, et de combien de cases.",
      "On écrit chaque étape avec ces deux informations, dans l'ordre.",
      "« 3 cases vers la droite » est une instruction complète. « 3 cases » toute seule ne dit pas où aller, et « vers la droite » toute seule ne dit pas jusqu'où.",
      "La direction et le nombre de cases.",
    ),
    tags: ["ce2", "algorithmique", "deplacement", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_deplacement_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_deplacement",
    difficulty: 4,
    theme: "neutral",
    text: "Un robot avance de 2 cases vers la droite, puis de 3 cases vers le haut, puis de 2 cases vers la gauche. Où se trouve-t-il par rapport au départ ?",
    format: "qcm",
    choices: [
      "3 cases plus haut, à la même place horizontalement",
      "4 cases à droite et 3 cases plus haut",
      "3 cases plus haut et 2 cases à droite",
      "au point de départ",
    ],
    expected: ["3 cases plus haut, à la même place horizontalement"],
    comparator: "mcq_exact",
    hint: "Droite puis gauche du même nombre de cases, cela s'annule.",
    explanation: exp(
      "Deux déplacements opposés de même longueur se compensent : il ne reste que ce qui n'a pas été annulé.",
      "On traite les directions séparément : la droite et la gauche d'un côté, le haut et le bas de l'autre.",
      "Horizontalement : 2 vers la droite, puis 2 vers la gauche, il ne reste rien. Verticalement : 3 vers le haut. Le robot est donc 3 cases plus haut, à la même place horizontalement.",
      "3 cases plus haut, à la même place horizontalement.",
    ),
    tags: ["ce2", "algorithmique", "deplacement", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_deplacement_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "Un robot doit aller 4 cases à droite et 2 cases en haut. Combien d'instructions au minimum lui faut-il ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Une instruction peut couvrir plusieurs cases d'un coup.",
    explanation: exp(
      "Une instruction indique une direction et un nombre de cases : elle peut donc couvrir plusieurs cases d'un seul coup.",
      "On regroupe toutes les cases d'une même direction en une seule instruction.",
      "« 4 cases vers la droite », puis « 2 cases vers le haut » : deux instructions suffisent. En écrivant case par case, il en faudrait six — le programme serait juste, mais bien plus long.",
      "Il en faut 2.",
    ),
    tags: ["ce2", "algorithmique", "deplacement"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_repetition_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_repetition",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert une répétition dans un programme ?",
    format: "qcm",
    choices: [
      "à écrire une seule fois ce qu'on veut faire plusieurs fois",
      "à faire aller le robot plus vite",
      "à effacer les instructions précédentes",
      "à changer la direction du robot",
    ],
    expected: ["à écrire une seule fois ce qu'on veut faire plusieurs fois"],
    comparator: "mcq_exact",
    hint: "C'est un raccourci d'écriture, pas un raccourci de chemin.",
    explanation: exp(
      "Une répétition demande d'exécuter plusieurs fois le même bloc d'instructions.",
      "On écrit l'instruction une fois, et on indique combien de fois la refaire.",
      "« Répéter 4 fois : avancer de 3 » remplace quatre lignes identiques. Le robot fait exactement le même trajet : c'est le programme qui est plus court, pas le chemin.",
      "À écrire une seule fois ce qu'on veut faire plusieurs fois.",
    ),
    tags: ["ce2", "algorithmique", "repetition", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_repetition_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_repetition",
    difficulty: 4,
    theme: "neutral",
    text: "« Répéter 3 fois : avancer de 2 cases ». De combien de cases le robot avance-t-il en tout ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Trois fois deux cases : on multiplie, on n'additionne pas les deux nombres.",
    explanation: exp(
      "Une répétition exécute le bloc autant de fois qu'indiqué : les déplacements s'accumulent.",
      "On multiplie le nombre de répétitions par ce que fait le bloc à chaque tour.",
      "3 × 2 = 6. Répondre 5, ce serait additionner le nombre de répétitions et le nombre de cases — deux nombres qui ne comptent pas la même chose.",
      "Le robot avance de 6 cases.",
    ),
    tags: ["ce2", "algorithmique", "repetition", "piege", "canvas"],
    canvas: programme("Une boucle", [
      { type: "event", text: "quand le programme démarre" },
      {
        type: "repeat",
        text: "répéter 3 fois",
        times: 3,
        children: [{ type: "move", text: "avancer de 2 cases", value: 2 }],
      },
    ]),
  },
  {
    kind: "fixed",
    id: "ce2_algo_repetition_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_repetition",
    difficulty: 3,
    theme: "neutral",
    text: "Pour tracer un carré, un robot doit avancer puis tourner, quatre fois de suite. Comment écrire ce programme le plus court possible ?",
    format: "qcm",
    choices: [
      "répéter 4 fois : avancer, puis tourner",
      "écrire huit instructions à la suite",
      "répéter 8 fois : avancer",
      "avancer 4 fois, puis tourner 4 fois",
    ],
    expected: ["répéter 4 fois : avancer, puis tourner"],
    comparator: "mcq_exact",
    hint: "Le bloc à répéter contient DEUX instructions.",
    explanation: exp(
      "Une répétition peut contenir plusieurs instructions : c'est tout le bloc qui se répète.",
      "On repère le motif qui revient, puis on compte combien de fois il revient.",
      "Le motif « avancer, puis tourner » revient 4 fois : on l'écrit une fois dans une répétition de 4. Avancer 4 fois puis tourner 4 fois donnerait un long trait et une toupie, pas un carré — l'ordre compte à l'intérieur de la boucle aussi.",
      "Répéter 4 fois : avancer, puis tourner.",
    ),
    tags: ["ce2", "algorithmique", "repetition", "qcm", "canvas"],
    canvas: programme("Tracer un carré", [
      { type: "event", text: "quand le programme démarre" },
      {
        type: "repeat",
        text: "répéter 4 fois",
        times: 4,
        children: [
          { type: "move", text: "avancer de 5 cases", value: 5 },
          { type: "turn", text: "tourner d'un quart de tour" },
        ],
      },
    ]),
  },
  {
    kind: "fixed",
    id: "ce2_algo_corriger_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_corriger",
    difficulty: 3,
    theme: "neutral",
    text: "Un robot devait avancer de 7 cases. Le programme dit « avancer de 5 cases ». Comment corriger sans ajouter d'instruction ?",
    format: "qcm",
    choices: [
      "remplacer le 5 par un 7",
      "ajouter une instruction « avancer de 2 »",
      "répéter le programme deux fois",
      "faire reculer le robot",
    ],
    expected: ["remplacer le 5 par un 7"],
    comparator: "mcq_exact",
    hint: "La question demande de ne PAS ajouter d'instruction.",
    explanation: exp(
      "Corriger un programme, c'est trouver l'instruction fautive et la remplacer, pas en empiler d'autres.",
      "On compare ce que fait le programme à ce qu'il devait faire, instruction par instruction.",
      "Le nombre de cases est faux : on change le 5 en 7. Ajouter « avancer de 2 » donnerait aussi 7 cases, mais avec une instruction de plus — et la consigne l'interdisait.",
      "On remplace le 5 par un 7.",
    ),
    tags: ["ce2", "algorithmique", "corriger", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_corriger_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_corriger",
    difficulty: 5,
    theme: "neutral",
    text: "Un robot devait tracer un carré. Le programme dit : « répéter 3 fois : avancer, puis tourner d'un quart de tour ». Que trace-t-il ?",
    format: "qcm",
    choices: [
      "trois côtés seulement : le carré n'est pas fermé",
      "un carré parfait",
      "un triangle",
      "rien du tout",
    ],
    expected: ["trois côtés seulement : le carré n'est pas fermé"],
    comparator: "mcq_exact",
    hint: "Un carré a quatre côtés. Combien de fois le bloc s'exécute-t-il ?",
    explanation: exp(
      "Le nombre de répétitions décide du nombre de fois où le motif est tracé.",
      "On compte les côtés que produit le programme, puis on les compare à ceux de la figure voulue.",
      "Le bloc « avancer, puis tourner » trace un côté à chaque tour. Répété 3 fois, il trace 3 côtés : la figure reste ouverte. Ce n'est pas un triangle pour autant — les angles sont droits, il manque simplement le quatrième côté. Il faut répéter 4 fois.",
      "Il trace trois côtés seulement.",
    ),
    tags: ["ce2", "algorithmique", "corriger", "piege", "qcm", "canvas"],
    canvas: programme("Le programme à corriger", [
      { type: "event", text: "quand le programme démarre" },
      {
        type: "repeat",
        text: "répéter 3 fois",
        times: 3,
        children: [
          { type: "move", text: "avancer de 5 cases", value: 5 },
          { type: "turn", text: "tourner d'un quart de tour" },
        ],
      },
    ]),
  },
  {
    kind: "fixed",
    id: "ce2_algo_corriger_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_corriger",
    difficulty: 4,
    theme: "neutral",
    text: "Un robot arrive 3 cases trop à droite. Que faut-il changer dans le programme ?",
    format: "qcm",
    choices: [
      "enlever 3 cases à une instruction qui va vers la droite",
      "ajouter 3 cases vers la droite",
      "faire tourner le robot",
      "répéter le programme",
    ],
    expected: ["enlever 3 cases à une instruction qui va vers la droite"],
    comparator: "mcq_exact",
    hint: "Il est allé trop loin : il faut lui en demander moins.",
    explanation: exp(
      "Pour corriger un programme, on cherche l'écart entre le résultat obtenu et celui qu'on voulait, puis on modifie l'instruction concernée.",
      "On repère la direction où l'erreur se produit, et de combien.",
      "Le robot va 3 cases trop loin vers la droite : on retire 3 à l'instruction qui l'y envoie. En ajouter 3 l'éloignerait encore.",
      "On enlève 3 cases à une instruction qui va vers la droite.",
    ),
    tags: ["ce2", "algorithmique", "corriger", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_algo_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "« Répéter 4 fois : avancer de 3 cases, puis tourner d'un quart de tour ». Quelle est la longueur totale du trait tracé, en cases ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Quatre côtés de 3 cases chacun.",
    explanation: exp(
      "Une répétition exécute son bloc autant de fois qu'indiqué : chaque tour ajoute ce que le bloc trace.",
      "On multiplie le nombre de tours par la longueur tracée à chaque tour.",
      "Le bloc trace 3 cases par tour, et il tourne 4 fois : 3 × 4 = 12. Le robot a tracé un carré de 3 cases de côté, dont le tour mesure 12 cases.",
      "Le trait mesure 12 cases.",
    ),
    tags: ["ce2", "algorithmique", "defi", "deux_etapes", "canvas"],
    canvas: programme("Tracer un carré", [
      { type: "event", text: "quand le programme démarre" },
      {
        type: "repeat",
        text: "répéter 4 fois",
        times: 4,
        children: [
          { type: "move", text: "avancer de 3 cases", value: 3 },
          { type: "turn", text: "tourner d'un quart de tour" },
        ],
      },
    ]),
  },
  {
    kind: "fixed",
    id: "ce2_algo_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "algorithmique",
    microId: "ce2_algo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux programmes font avancer un robot de 12 cases. Le premier dit « répéter 6 fois : avancer de 2 ». Le second dit « répéter 4 fois : avancer de 3 ». Lequel écrit le moins d'instructions ?",
    format: "qcm",
    choices: [
      "les deux en écrivent autant : une répétition et une avancée",
      "le premier",
      "le second",
      "on ne peut pas savoir",
    ],
    expected: ["les deux en écrivent autant : une répétition et une avancée"],
    comparator: "mcq_exact",
    hint: "Compte les LIGNES écrites, pas les tours effectués.",
    explanation: exp(
      "Une répétition ne rallonge pas le programme quand on augmente le nombre de tours : c'est un nombre qui change, pas une ligne de plus.",
      "On compte les lignes écrites dans chaque programme, pas les tours exécutés.",
      "Chaque programme tient en deux lignes : la répétition, et l'avancée qu'elle contient. Le robot fait plus de tours dans le premier, mais le programme n'est pas plus long à écrire — c'est justement à cela que sert une boucle.",
      "Les deux en écrivent autant.",
    ),
    tags: ["ce2", "algorithmique", "defi", "piege", "qcm"],
  },
];

export const algorithmiqueBank: TutorBankItemV4[] = [
  ...FIGES,
  ...GAB_INSTRUCTION,
  ...GAB_INSTRUCTION_3_4,
  ...GAB_DEPLACEMENT,
  ...GAB_REPETITION,
  ...GAB_CORRIGER,
  ...GAB_DEFI,
];
