import type { TutorBankItemV4, QuadrilatereCanvasData, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, de, type Prenom } from "./entiers.bank";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Des noms variés — le quadrilatère n'est pas toujours ABCD : quatre lettres
// qui se suivent dans l'alphabet (EFGH, MNPQ, RSTU…), sans le O. Les sommets
// sont donnés DANS L'ORDRE où l'on tourne autour de la figure.
const ALPHABET_SANS_O = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
function sommetsQuadrilatere(): [string, string, string, string] {
  const i = randomInt(0, ALPHABET_SANS_O.length - 4);
  const [a, b, c, d] = ALPHABET_SANS_O.slice(i, i + 4).split("");
  return [a, b, c, d];
}

/** Un segment nommé avec ses extrémités dans l'ordre alphabétique : [EG]. */
function seg(p: string, q: string) {
  return `[${[p, q].sort().join("")}]`;
}

/** Une longueur, sans les crochets : EG. */
function lg(p: string, q: string) {
  return [p, q].sort().join("");
}

function expl(calcul: string) {
  return (
    "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
    "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ⭐ 06/10/2026 — DES SITUATIONS, PAS UNE PHRASE. Mesuré le 05/10 : 5 à 9
// squelettes par micro de propriétés, 13 à 19 répétitions sur 20. Chaque
// gabarit compose maintenant : des noms de sommets variés (EFGH, RSTU…) × une
// situation (logo, mosaïque, cerf-volant, plan…) × une tournure × des prénoms.
// Plus aucune question ouverte à mot-clé : un seul mot ne doit plus suffire.
// Les correcteurs : correcteurs/quadrilateres.ts (ils relisent le texte ET le
// canvas, et refont le raisonnement avec leurs propres tables).
// ═══════════════════════════════════════════════════════════════════════════

type QG = TutorGeneratedQuestionV4;
const ilQ = (p: Prenom) => (p.f ? "elle" : "il");

/** Une phrase qui pose le quadrilatère N dans la vie d'un enfant (N y figure une fois). */
const CONTEXTES_QUAD: ((p: Prenom, N: string) => string)[] = [
  (p, N) => `${p.nom} dessine un logo pour son club de sport : le quadrilatère ${N}.`,
  (p, N) => `Sur le plan du jardin ${de(p.nom)}, le potager est le quadrilatère ${N}.`,
  (p, N) => `${p.nom} découpe une pièce de mosaïque ${N} dans du carton.`,
  (p, N) => `${p.nom} fabrique un cerf-volant : sa voile est le quadrilatère ${N}.`,
  (p, N) => `Dans un vitrail, ${p.nom} repère un morceau de verre ${N}.`,
  (p, N) => `${p.nom} trace le quadrilatère ${N} sur son cahier.`,
  (p, N) => `Le plancher de la cabane ${de(p.nom)} est le quadrilatère ${N}.`,
  (p, N) => `${p.nom} pose un tapis ${N} dans sa chambre.`,
  (p, N) => `Le drapeau inventé par ${p.nom} contient le quadrilatère ${N}.`,
  (p, N) => `En arts plastiques, ${p.nom} peint un motif ${N}.`,
  (p, N) => `${p.nom} observe un carreau de faïence ${N} dans la cuisine.`,
  (p, N) => `Au stade, ${p.nom} trace à la craie une zone ${N}.`,
  (p, N) => `${p.nom} construit un cadre photo ${N} en bois.`,
  (p, N) => `Dans le parc, ${p.nom} repère une pelouse ${N}.`,
  (p, N) => `${p.nom} dessine le panneau ${N} d’un jeu de piste.`,
  (p, N) => `Sur la nappe de pique-nique ${de(p.nom)}, un motif forme le quadrilatère ${N}.`,
];
function ctxQuad(N: string, p: Prenom = pick(PRENOMS)): string {
  return pick(CONTEXTES_QUAD)(p, N);
}
/** Les sommets du tour, en partant du k-ième, dans un sens ou dans l'autre. */
function tour(s: readonly string[], k: number, sens: 1 | -1 = 1): string[] {
  return [0, 1, 2, 3].map((i) => s[(((k + sens * i) % 4) + 4) % 4]);
}
/** Les 8 noms justes d'un quadrilatère. */
function nomsJustes(s: readonly string[]): string[] {
  const r: string[] = [];
  for (let k = 0; k < 4; k++) {
    r.push(tour(s, k, 1).join(""));
    r.push(tour(s, k, -1).join(""));
  }
  return r;
}
/** Les 16 noms faux : deux sommets opposés s'y suivent. */
function nomsFaux(s: readonly string[]): string[] {
  const justes = new Set(nomsJustes(s));
  const r: string[] = [];
  const perm = (reste: string[], acc: string) => {
    if (!reste.length) return void (justes.has(acc) || r.push(acc));
    reste.forEach((x, i) => perm([...reste.slice(0, i), ...reste.slice(i + 1)], acc + x));
  };
  perm([...s], "");
  return r;
}
function qcmQ(text: string, bonne: string, leurres: string[], explication: string, canvas?: QuadrilatereCanvasData): QG {
  return {
    text,
    format: "qcm",
    choices: shuffle([bonne, ...leurres]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: expl(explication),
    ...(canvas ? { canvas } : {}),
  };
}
function mesureQ(text: string, v: number, u: string, explication: string): QG {
  return { text, format: "short", expected: [`${v} ${u}`], comparator: "number_equal", explanation: expl(explication) };
}
/** « E, F, G et H » */
function listeEt(s: readonly string[]) {
  return `${s.slice(0, -1).join(", ")} et ${s[s.length - 1]}`;
}

/** Un dessin du quadrilatère, tourné, ses sommets renommés (A→s[0], B→s[1]…). */
type NatureDessin = "carré" | "rectangle" | "losange" | "quelconque";
function dessinQuad(nature: NatureDessin, s: readonly string[], penche: boolean): QuadrilatereCanvasData {
  const cx = 165, cy = 125;
  let pts: [number, number][];
  if (nature === "carré") {
    const c = randomInt(110, 140) / 2;
    pts = [[-c, c], [c, c], [c, -c], [-c, -c]];
  } else if (nature === "rectangle") {
    const L = randomInt(170, 200) / 2, l = randomInt(80, 110) / 2;
    pts = [[-L, l], [L, l], [L, -l], [-L, -l]];
  } else if (nature === "losange") {
    const d1 = randomInt(180, 210) / 2, d2 = randomInt(90, 120) / 2;
    pts = [[-d1, 0], [0, d2], [d1, 0], [0, -d2]];
  } else {
    pts = [[-randomInt(80, 100), randomInt(40, 70)], [randomInt(70, 95), randomInt(55, 85)], [randomInt(50, 80), -randomInt(50, 80)], [-randomInt(30, 60), -randomInt(60, 85)]];
  }
  const a = ((penche ? pick([-25, -18, 15, 22, 30]) : 0) * Math.PI) / 180;
  const P = pts.map(([x, y]) => ({ x: Math.round(cx + x * Math.cos(a) - y * Math.sin(a)), y: Math.round(cy + x * Math.sin(a) + y * Math.cos(a)) }));
  return {
    kind: "quadrilatere",
    size: { width: 330, height: 250 },
    points: { A: P[0], B: P[1], C: P[2], D: P[3] },
    labels: { A: s[0], B: s[1], C: s[2], D: s[3] },
    display: { showPoints: true, showLabels: true },
  };
}

// ─── QUADRILATERE_NOMMER_VOCABULAIRE ────────────────────────────────────────
const COMPTES = [
  { quoi: "sommets", n: 4, pourquoi: "Un quadrilatère a 4 côtés, donc 4 sommets : un à chaque coin." },
  { quoi: "côtés", n: 4, pourquoi: "« Quadri » veut dire quatre : un quadrilatère a 4 côtés." },
  { quoi: "angles", n: 4, pourquoi: "Il y a un angle à chaque sommet : 4 sommets, donc 4 angles." },
  { quoi: "diagonales", n: 2, pourquoi: "Une diagonale relie deux sommets opposés. Il y a deux paires de sommets opposés : 2 diagonales." },
] as const;
function genQuadVocabulaire(etoile: 1 | 2 | 3 | 4): QG {
  const s = sommetsQuadrilatere();
  const N = s.join("");
  const p = pick(PRENOMS);
  const famille = pick(
    etoile === 1 ? (["compter", "nommer"] as const)
      : etoile === 2 ? (["oppose", "paire", "sommet"] as const)
      : etoile === 3 ? (["diagonales", "uneDiagonale", "paire"] as const)
      : (["nomFaux", "nomJuste"] as const),
  );
  const [P, Q, R, T] = tour(s, randomInt(0, 3), pick([1, -1] as const));
  if (famille === "compter") {
    const c = pick(COMPTES);
    const question = pick([
      `Combien de ${c.quoi} a ${N} ?`,
      `${N} a combien de ${c.quoi} ?`,
      `Combien de ${c.quoi} compte le quadrilatère ${N} ?`,
      `Compte les ${c.quoi} de ${N}. Combien y en a-t-il ?`,
    ]);
    const autres = ["2", "3", "4", "5", "6"].filter((x) => x !== String(c.n));
    return qcmQ(`${ctxQuad(N)} ${question}`, `${c.n} ${c.quoi}`, shuffle(autres).slice(0, 3).map((x) => `${x} ${c.quoi}`), c.pourquoi);
  }
  if (famille === "nommer") {
    const ordre = tour(s, randomInt(0, 3), pick([1, -1] as const));
    const juste = pick(nomsJustes(ordre).filter((x) => x !== ordre.join("")));
    const intro = pick([
      `${p.nom} trace un quadrilatère. En tournant autour, ${ilQ(p)} passe par les sommets ${ordre[0]}, ${ordre[1]}, ${ordre[2]} puis ${ordre[3]}.`,
      `Les sommets d’un tapis, dans l’ordre du tour, sont ${ordre[0]}, ${ordre[1]}, ${ordre[2]} puis ${ordre[3]}.`,
      `Sur la carte au trésor ${de(p.nom)}, on fait le tour d’un champ par les sommets ${ordre[0]}, ${ordre[1]}, ${ordre[2]} puis ${ordre[3]}.`,
    ]);
    const question = pick(["Quel nom convient à ce quadrilatère ?", "Comment peut-on nommer ce quadrilatère ?", "Quel est un nom correct de ce quadrilatère ?"]);
    return qcmQ(
      `${intro} ${question}`,
      juste,
      shuffle(nomsFaux(ordre)).slice(0, 3),
      `On nomme un quadrilatère en tournant autour, dans un sens ou dans l’autre, à partir de n’importe quel sommet. ${juste} suit bien le tour. Dans les autres noms, deux sommets opposés se suivent.`,
    );
  }
  if (famille === "oppose") {
    const question = pick([
      `Dans ${N}, quel côté est opposé au côté [${P}${Q}] ?`,
      `Quel côté de ${N} ne touche pas le côté [${P}${Q}] ?`,
      `Dans le quadrilatère ${N}, quel est le côté opposé à [${P}${Q}] ?`,
    ]);
    return qcmQ(
      `${ctxQuad(N)} ${question}`,
      seg(R, T),
      [seg(Q, R), seg(T, P), seg(P, R)],
      `${seg(Q, R)} et ${seg(T, P)} touchent ${seg(P, Q)} : ce sont des côtés consécutifs. ${seg(P, R)} est une diagonale. Le côté qui ne touche pas ${seg(P, Q)} est ${seg(R, T)} : c’est le côté opposé.`,
    );
  }
  if (famille === "sommet") {
    const question = pick([
      `Dans ${N}, quel sommet est opposé au sommet ${P} ?`,
      `Quel sommet de ${N} n’est pas voisin de ${P} ?`,
      `Dans le quadrilatère ${N}, quel est le sommet opposé à ${P} ?`,
    ]);
    return qcmQ(
      `${ctxQuad(N)} ${question}`,
      R,
      [Q, T],
      `${Q} et ${T} sont les voisins de ${P} dans le nom ${N} : ce sont des sommets consécutifs. Le sommet opposé est celui qui n’est pas voisin : ${R}.`,
    );
  }
  if (famille === "paire") {
    const cas = pick([
      { a: seg(P, Q), b: seg(Q, R), rep: "deux côtés consécutifs", pq: `Ils ont un sommet commun, ${Q} : ce sont deux côtés consécutifs.` },
      { a: seg(P, Q), b: seg(R, T), rep: "deux côtés opposés", pq: `Ils n’ont aucun sommet commun : ce sont deux côtés opposés.` },
      { a: seg(P, R), b: seg(Q, T), rep: "les deux diagonales", pq: `Chacun relie deux sommets opposés : ce sont les deux diagonales.` },
      { a: seg(P, Q), b: seg(P, R), rep: "un côté et une diagonale", pq: `${seg(P, Q)} relie deux sommets voisins : c’est un côté. ${seg(P, R)} relie deux sommets opposés : c’est une diagonale.` },
    ]);
    const question = pick([
      `Dans ${N}, que sont ${cas.a} et ${cas.b} ?`,
      `Pour le quadrilatère ${N}, comment appelle-t-on ${cas.a} et ${cas.b} ?`,
      `${cas.a} et ${cas.b} sont deux segments de ${N}. Que sont-ils ?`,
    ]);
    const tous = ["deux côtés consécutifs", "deux côtés opposés", "les deux diagonales", "un côté et une diagonale"];
    return qcmQ(`${ctxQuad(N)} ${question}`, cas.rep, tous.filter((x) => x !== cas.rep), cas.pq);
  }
  if (famille === "diagonales") {
    const bonne = `${seg(P, R)} et ${seg(Q, T)}`;
    const question = pick([`Quelles sont les diagonales de ${N} ?`, `Quels segments sont les diagonales du quadrilatère ${N} ?`, `On trace les diagonales de ${N}. Lesquelles ?`]);
    return qcmQ(
      `${ctxQuad(N)} ${question}`,
      bonne,
      [`${seg(P, Q)} et ${seg(R, T)}`, `${seg(Q, R)} et ${seg(T, P)}`, `${seg(P, Q)} et ${seg(Q, R)}`],
      `Une diagonale relie deux sommets OPPOSÉS (non voisins dans le nom ${N}). Les diagonales sont ${bonne}.`,
      pick([true, false]) ? dessinQuad("quelconque", s, false) : undefined,
    );
  }
  if (famille === "uneDiagonale") {
    const question = pick([`Quel segment est une diagonale de ${N} ?`, `Lequel de ces segments est une diagonale du quadrilatère ${N} ?`, `${p.nom} veut tracer une diagonale de ${N}. Laquelle ?`]);
    const d = pick([seg(P, R), seg(Q, T)]);
    return qcmQ(
      `${ctxQuad(N)} ${question}`,
      d,
      [seg(P, Q), seg(Q, R), seg(R, T), seg(T, P)].sort(() => Math.random() - 0.5).slice(0, 3),
      `Une diagonale relie deux sommets opposés. ${d} relie deux sommets qui ne se suivent pas dans ${N} : c’est une diagonale. Les autres segments sont des côtés.`,
    );
  }
  if (famille === "nomFaux") {
    const faux = pick(nomsFaux(s));
    const bons = shuffle(nomsJustes(s).filter((n) => n !== N)).slice(0, 3);
    const question = pick([`Parmi ces noms, lequel ne désigne PAS ${N} ?`, `Quel nom est FAUX pour le quadrilatère ${N} ?`, `Un seul de ces noms ne convient pas à ${N}. Lequel ?`]);
    return qcmQ(
      `${ctxQuad(N)} ${question}`,
      faux,
      bons,
      `On nomme un quadrilatère en tournant autour, dans un sens ou dans l’autre. Dans ${faux}, deux sommets opposés se suivent : ce nom ne fait pas le tour de ${N}.`,
    );
  }
  const juste = pick(nomsJustes(s).filter((n) => n !== N));
  const question = pick([`Quel autre nom désigne aussi ${N} ?`, `Parmi ces noms, lequel désigne le même quadrilatère que ${N} ?`, `${p.nom} veut renommer ${N} sans changer de figure. Quel nom peut-${ilQ(p)} choisir ?`]);
  return qcmQ(
    `${ctxQuad(N)} ${question}`,
    juste,
    shuffle(nomsFaux(s)).slice(0, 3),
    `${juste} fait le tour de la figure, dans un sens ou dans l’autre : c’est le même quadrilatère que ${N}. Dans les autres noms, deux sommets opposés se suivent.`,
  );
}

// ─── QUADRILATERE_IDENTIFIER_NATURE (canvas codé) ───────────────────────────
type CoteQ = "AB" | "BC" | "CD" | "DA";
const QUATRE_COTES: Array<[CoteQ, CoteQ]> = [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]];
const QUATRE_ANGLES: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];
const QUESTIONS_NATURE = [
  (N: string) => `Observe les codages de ${N}. Quelle est sa nature ?`,
  (N: string) => `D’après les codages, quelle est la nature de ${N} ?`,
  (N: string) => `Regarde la figure ${N} et ses codages. Quel est son nom ?`,
  (N: string) => `Quelle est la nature du quadrilatère ${N} dessiné ?`,
];
const QUESTIONS_AFFIRMER = [
  (N: string) => `Que peut-on AFFIRMER sur ${N}, d’après ses codages ?`,
  (N: string) => `Seuls les codages comptent. Quelle est la nature la plus précise de ${N} ?`,
  (N: string) => `Attention au dessin ! D’après les codages seulement, ${N} est…`,
];
function genQuadNature(etoile: 1 | 2 | 3 | 4): QG {
  const s = sommetsQuadrilatere();
  const N = s.join("");
  const ctx = ctxQuad(N);
  if (etoile <= 2) {
    const nature = pick(["carré", "rectangle", "losange", "quelconque"] as const);
    const canvas = dessinQuad(nature, s, etoile === 2);
    if (nature === "carré") canvas.marks = { rightAnglesAt: QUATRE_ANGLES, equalSides: QUATRE_COTES };
    if (nature === "rectangle") canvas.marks = { rightAnglesAt: QUATRE_ANGLES };
    if (nature === "losange") canvas.marks = { equalSides: QUATRE_COTES };
    const rep = nature === "quelconque" ? "quadrilatère quelconque" : nature;
    const pourquoi = {
      carré: "Quatre angles droits ET quatre côtés codés égaux : c’est un carré.",
      rectangle: "Quatre angles droits codés, et les côtés ne sont pas codés égaux : c’est un rectangle.",
      losange: "Quatre côtés codés égaux, et aucun angle droit : c’est un losange.",
      quelconque: "Aucun angle droit, aucun côté égal n’est codé : c’est un quadrilatère quelconque.",
    }[nature];
    const autres = ["carré", "rectangle", "losange", "quadrilatère quelconque"].filter((x) => x !== rep);
    return qcmQ(`${ctx} ${pick(QUESTIONS_NATURE)(N)}`, rep, autres, pourquoi, canvas);
  }
  // ★3 et ★4 : on ne conclut que sur ce qui est CODÉ, jamais sur l'allure du dessin.
  type CasCode = { dessin: NatureDessin; marks: QuadrilatereCanvasData["marks"]; rep: string; pq: string };
  const cas: CasCode = pick<CasCode>(
    etoile === 3
      ? ([
          { dessin: "carré", marks: { rightAnglesAt: QUATRE_ANGLES }, rep: "rectangle", pq: "Le dessin a l’allure d’un carré, mais seuls les angles droits sont codés : on peut seulement affirmer que c’est un rectangle." },
          { dessin: "carré", marks: { equalSides: QUATRE_COTES }, rep: "losange", pq: "Le dessin a l’allure d’un carré, mais seuls les côtés égaux sont codés : on peut seulement affirmer que c’est un losange." },
          { dessin: "carré", marks: {}, rep: "on ne peut rien affirmer", pq: "Le dessin a l’allure d’un carré, mais rien n’est codé : on ne peut rien affirmer." },
          { dessin: "rectangle", marks: {}, rep: "on ne peut rien affirmer", pq: "Le dessin a l’allure d’un rectangle, mais aucun angle droit n’est codé : on ne peut rien affirmer." },
          { dessin: "carré", marks: { rightAnglesAt: QUATRE_ANGLES, equalSides: QUATRE_COTES }, rep: "carré", pq: "Quatre angles droits ET quatre côtés égaux sont codés : c’est un carré." },
        ])
      : ([
          { dessin: "rectangle", marks: { rightAnglesAt: ["A", "B", "C"] }, rep: "rectangle", pq: "Trois angles droits sont codés. Un quadrilatère qui a trois angles droits a forcément son quatrième angle droit : c’est un rectangle." },
          { dessin: "carré", marks: { rightAnglesAt: QUATRE_ANGLES, equalSides: [["AB", "BC"]] }, rep: "carré", pq: "Quatre angles droits : c’est un rectangle. Deux côtés CONSÉCUTIFS sont codés égaux, et dans un rectangle les côtés opposés sont égaux : les quatre côtés sont égaux. C’est un carré." },
          { dessin: "rectangle", marks: { rightAnglesAt: QUATRE_ANGLES, equalSides: [["AB", "CD"]] }, rep: "rectangle", pq: "Quatre angles droits : c’est un rectangle. Les deux côtés codés égaux sont OPPOSÉS : c’est vrai dans tout rectangle, cela n’apprend rien de plus." },
          { dessin: "carré", marks: { rightAnglesAt: ["A"], equalSides: QUATRE_COTES }, rep: "carré", pq: "Quatre côtés égaux : c’est un losange. Un losange qui a un angle droit a ses quatre angles droits : c’est un carré." },
          { dessin: "losange", marks: { equalSides: [["AB", "BC"]] }, rep: "on ne peut rien affirmer", pq: "Seuls deux côtés consécutifs sont codés égaux : ce n’est pas assez pour un losange (il en faut quatre). On ne peut rien affirmer." },
        ]),
  );
  const canvas = dessinQuad(cas.dessin, s, pick([true, false]));
  canvas.marks = cas.marks;
  const autres = ["carré", "rectangle", "losange", "on ne peut rien affirmer"].filter((x) => x !== cas.rep);
  return qcmQ(`${ctx} ${pick(QUESTIONS_AFFIRMER)(N)}`, cas.rep, autres, cas.pq, canvas);
}

// ─── LES PROPRIÉTÉS DU PROGRAMME DE 6e (carré, rectangle, losange) ──────────
// Une propriété annoncée s'écrit toujours d'un seul tenant (ni virgule ni
// « et » à l'intérieur) : les correcteurs découpent la liste sur « , » et « et ».
type Prop = "R" | "L" | "A1" | "C2" | "DE" | "DP" | "M" | "DEM" | "DPM" | "DEPM" | "CO" | "PA" | "NR" | "NL";
const DIT: Record<Prop, string[]> = {
  R: ["4 angles droits", "quatre angles droits", "3 angles droits"],
  L: ["4 côtés de même longueur", "quatre côtés égaux", "4 côtés égaux"],
  A1: ["un angle droit"],
  C2: ["deux côtés consécutifs de même longueur"],
  DE: ["des diagonales de même longueur"],
  DP: ["des diagonales perpendiculaires"],
  M: ["des diagonales qui se coupent en leur milieu"],
  DEM: ["des diagonales de même longueur qui se coupent en leur milieu"],
  DPM: ["des diagonales perpendiculaires qui se coupent en leur milieu"],
  DEPM: ["des diagonales perpendiculaires de même longueur qui se coupent en leur milieu"],
  CO: ["des côtés opposés de même longueur"],
  PA: ["des côtés opposés parallèles"],
  NR: ["aucun angle droit"],
  NL: ["deux côtés consécutifs de longueurs différentes"],
};
/** « si ses diagonales sont perpendiculaires » : pour les choix « que vérifier ? ». */
const SI: Partial<Record<Prop, string>> = {
  R: "si ses 4 angles sont droits",
  L: "si ses 4 côtés ont la même longueur",
  A1: "si un de ses angles est droit",
  C2: "si deux côtés consécutifs ont la même longueur",
  DE: "si ses diagonales ont la même longueur",
  DP: "si ses diagonales sont perpendiculaires",
  M: "si ses diagonales se coupent en leur milieu",
  CO: "si ses côtés opposés ont la même longueur",
  PA: "si ses côtés opposés sont parallèles",
};
function dire(props: Prop[]): string {
  const l = props.map((p) => pick(DIT[p]));
  return l.length === 1 ? l[0] : `${l.slice(0, -1).join(", ")} et ${l[l.length - 1]}`;
}
type Nat = "carré" | "rectangle" | "losange";
/** Ce que les propriétés FORCENT (le correcteur le refait de son côté). */
function natureForcee(props: Prop[], depart?: Nat): Nat | "aucune" {
  const has = (p: Prop) => props.includes(p);
  let rect = depart === "rectangle" || depart === "carré" || has("R") || has("DEM") || has("DEPM") || (has("DE") && has("M"));
  let los = depart === "losange" || depart === "carré" || has("L") || has("DPM") || has("DEPM") || (has("DP") && has("M"));
  if (los && (has("A1") || has("DE") || has("DEM"))) rect = true;
  if (rect && (has("C2") || has("DP") || has("DPM"))) los = true;
  return rect && los ? "carré" : rect ? "rectangle" : los ? "losange" : "aucune";
}
/** Ce que chaque figure a TOUJOURS. */
const TOUJOURS: Record<Nat, Prop[]> = {
  carré: ["R", "L", "A1", "C2", "DE", "DP", "M", "DEM", "DPM", "DEPM", "CO", "PA"],
  rectangle: ["R", "A1", "DE", "M", "DEM", "CO", "PA"],
  losange: ["L", "C2", "DP", "M", "DPM", "CO", "PA"],
};
const POURQUOI_NAT: Record<Nat, string> = {
  carré: "Quatre angles droits ET quatre côtés de même longueur : c’est un carré.",
  rectangle: "Quatre angles droits : c’est un rectangle. Rien ne dit que ses côtés sont tous égaux.",
  losange: "Quatre côtés de même longueur : c’est un losange. Rien ne dit que ses angles sont droits.",
};
const RAISONS: Partial<Record<Prop, string>> = {
  R: "Un quadrilatère qui a 3 ou 4 angles droits est un rectangle.",
  L: "Un quadrilatère qui a 4 côtés de même longueur est un losange.",
  DEM: "Des diagonales de même longueur qui se coupent en leur milieu : c’est un rectangle.",
  DPM: "Des diagonales perpendiculaires qui se coupent en leur milieu : c’est un losange.",
  DEPM: "Des diagonales de même longueur ET perpendiculaires, qui se coupent en leur milieu : c’est à la fois un rectangle et un losange, donc un carré.",
  A1: "Un losange qui a un angle droit a ses 4 angles droits : c’est un carré.",
  C2: "Un rectangle qui a deux côtés consécutifs de même longueur a ses 4 côtés égaux : c’est un carré.",
  DP: "Un rectangle dont les diagonales sont perpendiculaires est un carré.",
  DE: "Un losange dont les diagonales ont la même longueur est un carré.",
  NR: "Aucun angle droit : ce n’est pas un carré.",
  NL: "Deux côtés consécutifs de longueurs différentes : ce n’est pas un carré.",
  CO: "Des côtés opposés de même longueur : c’est vrai dans tout rectangle et tout losange, cela n’apprend rien de plus.",
  PA: "Des côtés opposés parallèles : c’est vrai dans tout rectangle et tout losange, cela n’apprend rien de plus.",
};
const raisons = (props: Prop[]) => props.map((p) => RAISONS[p]).filter(Boolean).join(" ");

// ─── QUADRILATERE_LIEN_PROPRIETE : des propriétés à la nature ──────────────
const DONNEES_LIEN: Prop[][][] = [
  [["R"], ["L"], ["R", "L"], ["L", "NR"], ["R", "NL"]],
  [["DEM"], ["DPM"], ["R", "C2"], ["L", "A1"], ["R", "CO"], ["L", "PA"], ["R", "NL"], ["L", "NR"]],
  [["DEPM"], ["R", "DP"], ["L", "DE"], ["DEM", "NL"], ["DPM", "NR"], ["DEM", "C2"], ["DPM", "A1"]],
];
const QUESTIONS_LIEN = [
  (N: string) => `Quelle est la nature de ${N}, à coup sûr ?`,
  (N: string) => `Quel est le nom le plus précis que l’on peut donner à ${N} ?`,
  (N: string) => `Que peut-on affirmer ? ${N} est forcément…`,
  (N: string) => `D’après ces propriétés, quelle est la nature de ${N} ?`,
];
function genQuadLien(etoile: 1 | 2 | 3): QG {
  const s = sommetsQuadrilatere();
  const N = s.join("");
  const props = pick(DONNEES_LIEN[etoile - 1]);
  const rep = natureForcee(props) as Nat;
  return qcmQ(
    `${ctxQuad(N)} ${N} a ${dire(props)}. ${pick(QUESTIONS_LIEN)(N)}`,
    rep,
    ["carré", "rectangle", "losange", "quadrilatère quelconque"].filter((x) => x !== rep),
    `${raisons(props)} ${POURQUOI_NAT[rep]}`,
  );
}

// ─── QUADRILATERE_CONCLUSION : « peut-on affirmer que… ? » ──────────────────
// Le contre-exemple est une figure qui a toutes les propriétés annoncées sans
// être la figure affirmée. Une seule proposition est juste.
const CONTRE_EXEMPLES: { dit: string; nat: Nat; a: Prop[] }[] = [
  { dit: "Non : ce peut être un losange qui n’est pas un carré.", nat: "losange", a: ["L", "C2", "DP", "M", "DPM", "CO", "PA", "NR"] },
  { dit: "Non : ce peut être un rectangle qui n’est pas un carré.", nat: "rectangle", a: ["R", "A1", "DE", "M", "DEM", "CO", "PA", "NL"] },
  { dit: "Non : ce peut être un quadrilatère sans aucune propriété particulière.", nat: "carré", a: [] },
];
/** L'affirmation « c'est un X » est-elle forcée ? Sinon, quel contre-exemple ? */
function verdict(props: Prop[], affirme: Nat, depart?: Nat): { bonne: string; leurres: string[]; pq: string } {
  const f = natureForcee(props, depart);
  const oui = `Oui, c’est forcément un ${affirme}.`;
  const force = f === "carré" || f === affirme;
  const contre = CONTRE_EXEMPLES.filter(
    (k) => k.a.length && props.every((p) => k.a.includes(p)) && (!depart || k.nat === depart || depart === "carré") && !(k.nat === affirme),
  );
  const bonne = force ? oui : contre[0].dit;
  const leurres = [oui, ...CONTRE_EXEMPLES.map((k) => k.dit)].filter((x) => x !== bonne);
  const pq = force
    ? `${raisons(props)} ${POURQUOI_NAT[f as Nat]} C’est donc forcément un ${affirme}.`
    : `Ces propriétés ne suffisent pas. ${contre[0].nat === "losange" ? "Un losange aplati, sans angle droit," : "Un rectangle allongé, aux côtés de longueurs différentes,"} les a toutes, et ce n’est pas un ${affirme}.`;
  return { bonne, leurres, pq };
}
const DONNEES_CONCLUSION: { props: Prop[]; affirme: Nat }[][] = [
  [
    { props: ["R", "L"], affirme: "carré" }, { props: ["R"], affirme: "rectangle" }, { props: ["L"], affirme: "losange" },
    { props: ["R"], affirme: "carré" }, { props: ["L"], affirme: "carré" },
  ],
  [
    { props: ["L"], affirme: "rectangle" }, { props: ["R"], affirme: "losange" }, { props: ["DEM"], affirme: "rectangle" },
    { props: ["DPM"], affirme: "losange" }, { props: ["DEM"], affirme: "carré" }, { props: ["DPM"], affirme: "carré" },
    { props: ["L", "A1"], affirme: "carré" }, { props: ["R", "C2"], affirme: "carré" }, { props: ["R"], affirme: "carré" }, { props: ["L"], affirme: "carré" },
  ],
  [
    { props: ["DEPM"], affirme: "carré" }, { props: ["R", "DP"], affirme: "carré" }, { props: ["L", "DE"], affirme: "carré" },
    { props: ["R", "CO"], affirme: "carré" }, { props: ["L", "PA"], affirme: "carré" }, { props: ["DPM"], affirme: "rectangle" },
    { props: ["R", "DE"], affirme: "carré" }, { props: ["L", "C2"], affirme: "carré" }, { props: ["DEM", "PA"], affirme: "losange" },
  ],
];
function questionVerdict(p: Prenom, N: string, affirme: Nat): string {
  return pick([
    `Peut-on affirmer que ${N} est un ${affirme} ?`,
    `${p.nom} affirme : « ${N} est forcément un ${affirme}. » A-t-${ilQ(p)} raison ?`,
    `Est-on sûr que ${N} est un ${affirme} ?`,
    `${p.nom} conclut que ${N} est un ${affirme}. Est-ce sûr ?`,
  ]);
}
function genQuadConclusion(etoile: 2 | 3 | 4): QG {
  const s = sommetsQuadrilatere();
  const N = s.join("");
  const [p, p2] = [pick(PRENOMS), pick(PRENOMS)];
  const d = pick(DONNEES_CONCLUSION[etoile - 2]);
  const v = verdict(d.props, d.affirme);
  return qcmQ(`${ctxQuad(N, p2)} ${N} a ${dire(d.props)}. ${questionVerdict(p, N, d.affirme)}`, v.bonne, v.leurres, v.pq);
}

// ─── QUADRILATERE_PROPRIETE_DEFI : inclusions, départ + propriété en plus ──
const INCLUSIONS: { x: Nat; y: Nat }[] = [
  { x: "carré", y: "rectangle" }, { x: "carré", y: "losange" }, { x: "rectangle", y: "carré" },
  { x: "losange", y: "carré" }, { x: "rectangle", y: "losange" }, { x: "losange", y: "rectangle" },
];
const AJOUTS: Record<"rectangle" | "losange", Prop[]> = {
  rectangle: ["DP", "C2", "L", "A1", "DE", "CO", "M", "NL"],
  losange: ["A1", "DE", "R", "C2", "DP", "CO", "PA", "NR"],
};
function genQuadProprieteDefi(etoile: 3 | 4 | 5): QG {
  const s = sommetsQuadrilatere();
  const N = s.join("");
  const p = pick(PRENOMS);
  const famille = etoile === 3 ? "inclusion" : etoile === 4 ? pick(["ajout", "inclusion"] as const) : pick(["ajout", "verdict"] as const);
  if (famille === "inclusion") {
    const { x, y } = pick(INCLUSIONS);
    const toujours = x === "carré";
    const question = pick([
      `Un ${x} est-il toujours un ${y} ?`,
      `${p.nom} affirme : « Tout ${x} est un ${y}. » A-t-${ilQ(p)} raison ?`,
      `Un ${x} est-il forcément un ${y} ?`,
      `${p.nom} dessine un ${x}. A-t-${ilQ(p)} forcément dessiné un ${y} ?`,
    ]);
    const bonne = toujours ? "oui, toujours" : "pas toujours, seulement parfois";
    const pq = toujours
      ? `Un carré a 4 angles droits ET 4 côtés de même longueur. Il a donc toutes les propriétés d’un ${y} : c’est un ${y} particulier.`
      : `Un ${x} n’est un ${y} que dans un cas particulier : quand c’est un carré. Un ${x} ${x === "rectangle" ? "allongé" : "aplati"} n’est pas un ${y}.`;
    return qcmQ(`${question}`, bonne, ["oui, toujours", "pas toujours, seulement parfois", "non, jamais"].filter((z) => z !== bonne), pq);
  }
  const depart = pick(["rectangle", "losange"] as const);
  // « deux côtés consécutifs de longueurs différentes » n'a sa place que dans « quelle nature ? » :
  // à « est-ce un carré ? », la réponse serait « sûrement pas », pas « ce peut être… ».
  const ajout = pick(AJOUTS[depart].filter((k) => famille === "ajout" || (k !== "NL" && k !== "NR")));
  const ctx = ctxQuad(N);
  if (famille === "ajout") {
    const rep = natureForcee([ajout], depart) as Nat;
    const question = pick([
      `Quelle est la nature la plus précise de ${N} ?`,
      `Que peut-on dire de ${N}, au plus précis ?`,
      `${N} est-il un carré, un rectangle ou un losange ?`,
    ]);
    return qcmQ(
      `${ctx} ${N} est un ${depart}. Il a aussi ${dire([ajout])}. ${question}`,
      rep,
      ["carré", "rectangle", "losange"].filter((x) => x !== rep),
      `${N} est un ${depart}. ${RAISONS[ajout] ?? ""} ${rep === "carré" ? "C’est donc un carré." : `On ne peut rien dire de plus : c’est un ${depart}.`}`,
    );
  }
  const v = verdict([ajout], "carré", depart);
  return qcmQ(`${ctx} ${N} est un ${depart}. Il a aussi ${dire([ajout])}. ${questionVerdict(p, N, "carré")}`, v.bonne, v.leurres, `${N} est un ${depart}. ${v.pq}`);
}

// ─── LONGUEURS DANS UN CARRÉ, UN RECTANGLE, UN LOSANGE ──────────────────────
// Des objets réels, chacun avec son unité et des mesures plausibles.
const OBJETS_MESURE: { dit: (p: Prenom, nat: Nat, N: string) => string; u: "cm" | "m"; lo: number; hi: number }[] = [
  { dit: (p, nat, N) => `${p.nom} trace le ${nat} ${N} sur son cahier.`, u: "cm", lo: 3, hi: 15 },
  { dit: (p, nat, N) => `${p.nom} découpe une pièce de mosaïque dans du carton : le ${nat} ${N}.`, u: "cm", lo: 3, hi: 12 },
  { dit: (p, nat, N) => `Sur le plan du jardin ${de(p.nom)}, le potager est le ${nat} ${N}.`, u: "m", lo: 2, hi: 12 },
  { dit: (p, nat, N) => `Au stade, ${p.nom} trace à la craie le ${nat} ${N}.`, u: "m", lo: 3, hi: 20 },
  { dit: (p, nat, N) => `${p.nom} fabrique un cerf-volant : sa voile est le ${nat} ${N}.`, u: "cm", lo: 40, hi: 90 },
  { dit: (p, nat, N) => `Le cadre photo ${de(p.nom)} est le ${nat} ${N}.`, u: "cm", lo: 10, hi: 40 },
  { dit: (p, nat, N) => `Dans le parc, ${p.nom} repère une pelouse : le ${nat} ${N}.`, u: "m", lo: 10, hi: 60 },
  { dit: (p, nat, N) => `${p.nom} observe un carreau de faïence : le ${nat} ${N}.`, u: "cm", lo: 10, hi: 30 },
  { dit: (p, nat, N) => `Le drapeau inventé par ${p.nom} contient le ${nat} ${N}.`, u: "cm", lo: 10, hi: 60 },
  { dit: (p, nat, N) => `${p.nom} dessine le panneau d’un jeu de piste : le ${nat} ${N}.`, u: "cm", lo: 20, hi: 60 },
  { dit: (p, nat, N) => `Sur la table, ${p.nom} pose un set de table : le ${nat} ${N}.`, u: "cm", lo: 25, hi: 45 },
  { dit: (p, nat, N) => `Le bassin à poissons ${de(p.nom)} a la forme du ${nat} ${N}.`, u: "m", lo: 2, hi: 8 },
];
const QUESTIONS_LONGUEUR = [
  (S: string) => `Combien mesure ${S} ?`,
  (S: string) => `Quelle est la longueur de ${S} ?`,
  (S: string) => `Sans mesurer, trouve la longueur de ${S}.`,
  (S: string) => `Donne la longueur de ${S}.`,
];
/** Un côté donné, un autre demandé (opposé dans un rectangle, n'importe lequel sinon). */
function genLongueurCote(nat: Nat, intro?: (p: Prenom, nat: Nat, N: string) => string): QG {
  const s = sommetsQuadrilatere();
  const N = s.join("");
  const p = pick(PRENOMS);
  // Une construction se fait sur le cahier : en centimètres.
  const o = intro ? OBJETS_MESURE[0] : pick(OBJETS_MESURE);
  const [P, Q, R, T] = tour(s, randomInt(0, 3), pick([1, -1] as const));
  const debut = (intro ?? o.dit)(p, nat, N);
  if (nat === "rectangle") {
    const a = randomInt(o.lo + 1, o.hi);
    let b = randomInt(o.lo, o.hi);
    while (b === a) b = randomInt(o.lo, o.hi);
    const [demande, v] = pick([[seg(R, T), a], [seg(T, P), b]] as const);
    return mesureQ(
      `${debut} ${seg(P, Q)} mesure ${a} ${o.u} et ${seg(Q, R)} mesure ${b} ${o.u}. ${pick(QUESTIONS_LONGUEUR)(demande)}`,
      v,
      o.u,
      `Dans un rectangle, les côtés opposés ont la même longueur. ${demande} est opposé à ${demande === seg(R, T) ? seg(P, Q) : seg(Q, R)} : il mesure ${v} ${o.u}.`,
    );
  }
  const a = randomInt(o.lo, o.hi);
  const demande = pick([seg(Q, R), seg(R, T), seg(T, P)]);
  return mesureQ(
    `${debut} ${seg(P, Q)} mesure ${a} ${o.u}. ${pick(QUESTIONS_LONGUEUR)(demande)}`,
    a,
    o.u,
    `Les 4 côtés d’un ${nat} ont la même longueur. ${demande} mesure donc ${a} ${o.u}, comme ${seg(P, Q)}.`,
  );
}
/** Les diagonales : égales (rectangle, carré), coupées en leur milieu I. */
function genLongueurDiagonale(construire: boolean): QG {
  let s = sommetsQuadrilatere();
  while (s.includes("I")) s = sommetsQuadrilatere(); // I est le point où se coupent les diagonales
  const N = s.join("");
  const p = pick(PRENOMS);
  const o = pick(OBJETS_MESURE);
  const [P, Q, R, T] = tour(s, randomInt(0, 3), pick([1, -1] as const));
  const nat = pick(["carré", "rectangle", "losange"] as const);
  const debut = construire
    ? `${p.nom} veut construire le ${nat} ${N} à partir de ses diagonales, qui se coupent en I.`
    : `${o.dit(p, nat, N)} Ses diagonales se coupent en I.`;
  const u = construire ? "cm" : o.u;
  const [lo, hi] = construire ? [4, 16] : [o.lo, o.hi];
  const cas = nat === "losange" ? pick(["demi", "double"] as const) : pick(["egale", "demi", "double"] as const);
  if (cas === "egale") {
    const d = randomInt(lo, hi);
    return mesureQ(
      `${debut} ${seg(P, R)} mesure ${d} ${u}. ${pick(QUESTIONS_LONGUEUR)(seg(Q, T))}`,
      d,
      u,
      `Les diagonales d’un ${nat} ont la même longueur : ${seg(Q, T)} mesure ${d} ${u}, comme ${seg(P, R)}.`,
    );
  }
  if (cas === "demi") {
    const m = randomInt(Math.max(2, Math.ceil(lo / 2)), Math.max(3, Math.floor(hi / 2)));
    const demande = pick([`[${P}I]`, `[I${R}]`]);
    return mesureQ(
      `${debut} ${seg(P, R)} mesure ${2 * m} ${u}. ${pick(QUESTIONS_LONGUEUR)(demande)}`,
      m,
      u,
      `Les diagonales d’un ${nat} se coupent en leur milieu : I est le milieu de ${seg(P, R)}. ${demande} mesure ${2 * m} ÷ 2 = ${m} ${u}.`,
    );
  }
  const m = randomInt(Math.max(2, Math.ceil(lo / 2)), Math.max(3, Math.floor(hi / 2)));
  return mesureQ(
    `${debut} [${P}I] mesure ${m} ${u}. ${pick(QUESTIONS_LONGUEUR)(seg(P, R))}`,
    2 * m,
    u,
    `Les diagonales d’un ${nat} se coupent en leur milieu : I est le milieu de ${seg(P, R)}. ${seg(P, R)} mesure 2 × ${m} = ${2 * m} ${u}.`,
  );
}

// ─── QUADRILATERE_LIRE_PROPRIETE ────────────────────────────────────────────
function genQuadLire(etoile: 1 | 2 | 4): QG {
  const s = sommetsQuadrilatere();
  const N = s.join("");
  const p = pick(PRENOMS);
  if (etoile === 1 && pick([true, false])) {
    const nat = pick(["carré", "rectangle", "losange"] as const);
    const o = pick(OBJETS_MESURE);
    const quoi = nat === "rectangle" ? "angles droits" : nat === "losange" ? "côtés de même longueur" : pick(["angles droits", "côtés de même longueur"] as const);
    const dire4 = (k: number) => (quoi === "angles droits" ? (k === 0 ? "aucun angle droit" : `${k} angle${k > 1 ? "s" : ""} droit${k > 1 ? "s" : ""}`) : k === 0 ? "aucun" : `${k} côtés`);
    const question = pick([`Combien de ${quoi} a ${N} ?`, `${N} a combien de ${quoi} ?`, `Combien de ${quoi} compte ${N} ?`]);
    const pq = quoi === "angles droits" ? `Un ${nat} a 4 angles droits.` : `Les 4 côtés d’un ${nat} ont la même longueur.`;
    const leurres = (quoi === "angles droits" ? [0, 1, 2] : [0, 2, 3]).map(dire4);
    return qcmQ(`${o.dit(p, nat, N)} ${question}`, dire4(4), leurres, pq);
  }
  if (etoile === 4) {
    if (pick([true, false])) return genLongueurDiagonale(false);
    const nat = pick(["rectangle", "losange"] as const);
    const bonne = nat === "rectangle" ? "elles ont la même longueur" : "elles sont perpendiculaires";
    const autre = nat === "rectangle" ? "elles sont perpendiculaires" : "elles ont la même longueur";
    const question = pick([
      `Que peut-on TOUJOURS dire des diagonales de ${N} ?`,
      `${p.nom} trace les diagonales de ${N}. Que remarque-t-${ilQ(p)} à coup sûr ?`,
      `Quelle propriété ont forcément les diagonales de ${N} ?`,
    ]);
    return qcmQ(
      `${pick(OBJETS_MESURE).dit(pick(PRENOMS), nat, N)} ${question}`,
      bonne,
      [autre, "elles ne se coupent pas en leur milieu", "l’une mesure le double de l’autre"],
      nat === "rectangle"
        ? "Les diagonales d’un rectangle ont la même longueur et se coupent en leur milieu. Elles ne sont perpendiculaires que si c’est un carré."
        : "Les diagonales d’un losange sont perpendiculaires et se coupent en leur milieu. Elles n’ont la même longueur que si c’est un carré.",
    );
  }
  return genLongueurCote(etoile === 1 ? pick(["carré", "losange"] as const) : pick(["carré", "rectangle", "losange", "rectangle"] as const));
}

// ─── QUADRILATERE_COMPLETER_CONSTRUIRE ──────────────────────────────────────
const COMPLETER: { depart: Nat | Prop; cible: Nat; bons: Prop[]; mauvais: Prop[] }[] = [
  { depart: "rectangle", cible: "carré", bons: ["C2", "DP", "L"], mauvais: ["A1", "DE", "CO", "M", "PA"] },
  { depart: "losange", cible: "carré", bons: ["A1", "DE", "R"], mauvais: ["C2", "DP", "CO", "M", "PA"] },
  { depart: "M", cible: "rectangle", bons: ["DE", "R"], mauvais: ["DP", "CO", "PA", "C2"] },
  { depart: "M", cible: "losange", bons: ["DP", "L"], mauvais: ["DE", "CO", "PA", "A1"] },
];
const DIAGONALES_POUR: { cible: Nat; bonne: string; mauvais: string[] }[] = [
  {
    cible: "carré",
    bonne: "perpendiculaires, de même longueur, et se couper en leur milieu",
    mauvais: ["perpendiculaires, et se couper en leur milieu", "de même longueur, et se couper en leur milieu", "de même longueur, sans se couper en leur milieu"],
  },
  {
    cible: "rectangle",
    bonne: "de même longueur, et se couper en leur milieu",
    mauvais: ["perpendiculaires, et se couper en leur milieu", "de longueurs différentes, et se couper en leur milieu", "perpendiculaires, sans se couper en leur milieu"],
  },
  {
    cible: "losange",
    bonne: "perpendiculaires, et se couper en leur milieu",
    mauvais: ["de même longueur, et se couper en leur milieu", "perpendiculaires, sans se couper en leur milieu", "de même longueur, sans se couper en leur milieu"],
  },
];
function genQuadCompleter(etoile: 1 | 2 | 3): QG {
  const s = sommetsQuadrilatere();
  const N = s.join("");
  const p = pick(PRENOMS);
  if (etoile === 1) {
    const nat = pick(["carré", "rectangle", "losange"] as const);
    return genLongueurCote(nat, (pp, nn, NN) =>
      pick([
        `${pp.nom} veut construire le ${nn} ${NN}.`,
        `Pour un exposé, ${pp.nom} doit tracer le ${nn} ${NN}.`,
        `${pp.nom} commence à tracer le ${nn} ${NN}.`,
      ]),
    );
  }
  if (etoile === 2) {
    const c = pick(COMPLETER);
    const bon = pick(c.bons);
    const bonTexte = pick(DIT[bon]);
    const debut = c.depart === "M" ? `${N} a ${dire(["M"])}.` : `${N} est un ${c.depart}.`;
    const question = pick([
      `Que faut-il savoir de plus pour être sûr que c’est un ${c.cible} ?`,
      `Quelle propriété suffit, en plus, pour que ${N} soit un ${c.cible} ?`,
      `${p.nom} veut que ${N} soit un ${c.cible}. Quelle propriété doit-${ilQ(p)} imposer en plus ?`,
    ]);
    const pourquoi =
      c.depart === "rectangle" ? `Un rectangle qui a aussi ${bonTexte} est aussi un losange : rectangle ET losange, c’est un carré.`
      : c.depart === "losange" ? `Un losange qui a aussi ${bonTexte} est aussi un rectangle : losange ET rectangle, c’est un carré.`
      : (RAISONS[({ DE: "DEM", DP: "DPM" } as Partial<Record<Prop, Prop>>)[bon] ?? bon] ?? "");
    return qcmQ(
      `${ctxQuad(N)} ${debut} ${question}`,
      bonTexte,
      shuffle(c.mauvais).slice(0, 3).map((m) => pick(DIT[m])),
      `${pourquoi} Les autres propriétés, ${N} pourrait les avoir sans être un ${c.cible}.`,
    );
  }
  if (pick([true, false])) return genLongueurDiagonale(true);
  const d = pick(DIAGONALES_POUR);
  const question = pick([
    `${p.nom} veut tracer un ${d.cible} en commençant par ses diagonales. Comment doivent-elles être ?`,
    `Pour construire un ${d.cible} à partir de ses diagonales, comment faut-il les tracer ?`,
    `Les diagonales d’un ${d.cible} doivent être…`,
  ]);
  return qcmQ(
    question,
    d.bonne,
    d.mauvais,
    {
      carré: "Les diagonales d’un carré sont perpendiculaires, de même longueur, et se coupent en leur milieu : il est à la fois rectangle et losange.",
      rectangle: "Les diagonales d’un rectangle ont la même longueur et se coupent en leur milieu.",
      losange: "Les diagonales d’un losange sont perpendiculaires et se coupent en leur milieu.",
    }[d.cible],
  );
}

// ─── QUADRILATERE_DISTINGUER ────────────────────────────────────────────────
const PAIRES: [Nat, Nat][] = [["carré", "rectangle"], ["carré", "losange"], ["rectangle", "losange"]];
const PROPS_SI: Prop[] = ["R", "L", "A1", "C2", "DE", "DP", "M", "CO", "PA"];
/** Des situations de dessin où des longueurs de quelques centimètres sont plausibles. */
const CONTEXTES_DESSIN = [0, 2, 4, 5, 9, 14].map((i) => CONTEXTES_QUAD[i]);
function genQuadDistinguer(etoile: 2 | 3 | 5): QG {
  const s = sommetsQuadrilatere();
  const N = s.join("");
  const p = pick(PRENOMS);
  const [P, Q, R, T] = tour(s, randomInt(0, 3), pick([1, -1] as const));
  const famille = etoile === 2 ? "propriete" : etoile === 3 ? pick(["propriete", "donnees"] as const) : "donnees";
  if (famille === "propriete") {
    const [x, y] = shuffle(pick(PAIRES));
    const ax = TOUJOURS[x], ay = TOUJOURS[y];
    const communes = PROPS_SI.filter((k) => ax.includes(k) && ay.includes(k));
    const distinctes = PROPS_SI.filter((k) => ax.includes(k) !== ay.includes(k));
    const enCommun = x !== "carré" && y !== "carré" ? pick([true, false]) : pick([true, false, false]);
    const [bonne, leurres] = enCommun ? [pick(communes), shuffle(distinctes).slice(0, 3)] : [pick(distinctes), shuffle(communes).slice(0, 3)];
    const question = enCommun
      ? pick([
          `${N} est soit un ${x}, soit un ${y}. Quelle propriété a-t-il dans les deux cas ?`,
          `Qu’il soit un ${x} ou un ${y}, qu’a forcément ${N} ? Les deux figures l’ont en commun.`,
        ])
      : pick([
          `${p.nom} hésite : ${N} est-il un ${x} ou un ${y} ? Que doit-${ilQ(p)} vérifier ?`,
          `Pour savoir si ${N} est un ${x} ou un ${y}, que faut-il vérifier ?`,
          `Quelle vérification permet de distinguer un ${x} d’un ${y} ?`,
        ]);
    const pq = enCommun
      ? `Un ${x} et un ${y} ont tous les deux ${pick(DIT[bonne])}. Les autres propriétés, l’un les a et l’autre pas toujours.`
      : `Un ${ax.includes(bonne) ? x : y} a toujours ${pick(DIT[bonne])}, un ${ax.includes(bonne) ? y : x} pas forcément. Les autres propriétés, ils les ont tous les deux : elles ne permettent pas de choisir.`;
    // « Que vérifier ? » appelle « si ses diagonales… » ; « qu'a-t-il ? » appelle « des diagonales… ».
    const dit = (k: Prop) => (enCommun ? DIT[k][0] : SI[k]!);
    return qcmQ(`${ctxQuad(N)} ${question}`, dit(bonne), leurres.map(dit), pq);
  }
  const ctx = pick(CONTEXTES_DESSIN)(pick(PRENOMS), N);
  const question = pick([
    `Quelle est la nature la plus précise de ${N} ?`,
    `Que peut-on affirmer sur ${N} ?`,
    `${N} est-il un carré, un rectangle ou un losange ?`,
  ]);
  const choix = ["carré", "rectangle", "losange", "quadrilatère quelconque"];
  const a = randomInt(3, 12);
  const b = a + randomInt(1, 6);
  const cas = pick(
    etoile === 3 ? (["consecutifsDiff", "consecutifsEgaux", "angleDroit", "angleNonDroit"] as const) : (["opposesEgaux", "consecutifsEgaux", "angleNonDroit", "consecutifsDiff"] as const),
  );
  if (cas === "angleDroit" || cas === "angleNonDroit") {
    const angle = cas === "angleDroit" ? 90 : pick([50, 55, 60, 65, 70, 75, 80, 100, 105, 110, 115, 120, 125]);
    const rep = cas === "angleDroit" ? "carré" : "losange";
    return qcmQ(
      `${ctx} ${N} a 4 côtés de ${a} cm. Son angle de sommet ${Q} mesure ${angle}°. ${question}`,
      rep,
      choix.filter((z) => z !== rep),
      cas === "angleDroit"
        ? `4 côtés égaux : c’est un losange. Un losange qui a un angle droit a ses 4 angles droits : c’est un carré.`
        : `4 côtés égaux : c’est un losange. Son angle en ${Q} mesure ${angle}°, il n’est pas droit : ce n’est pas un carré.`,
    );
  }
  const [donne, rep, pq] =
    cas === "consecutifsDiff"
      ? [`${seg(P, Q)} mesure ${a} cm et ${seg(Q, R)} mesure ${b} cm`, "rectangle", `4 angles droits : c’est un rectangle. Deux côtés consécutifs, ${seg(P, Q)} et ${seg(Q, R)}, ont des longueurs différentes : ce n’est pas un carré.`]
      : cas === "consecutifsEgaux"
        ? [`${seg(P, Q)} mesure ${a} cm et ${seg(Q, R)} mesure ${a} cm`, "carré", `4 angles droits : c’est un rectangle. Deux côtés consécutifs, ${seg(P, Q)} et ${seg(Q, R)}, ont la même longueur, et les côtés opposés d’un rectangle sont égaux : les 4 côtés mesurent ${a} cm. C’est un carré.`]
        : [`${seg(P, Q)} mesure ${a} cm et ${seg(R, T)} mesure ${a} cm`, "rectangle", `4 angles droits : c’est un rectangle. ${seg(P, Q)} et ${seg(R, T)} sont OPPOSÉS : dans tout rectangle ils sont égaux, cela n’apprend rien de plus. On ne peut pas affirmer que c’est un carré.`];
  return qcmQ(`${ctx} ${N} a 4 angles droits. ${donne}. ${question}`, rep, choix.filter((z) => z !== rep), pq);
}

// ─── QUADRILATERE_DEFI (reconnaître, périmètres) ────────────────────────────
function genQuadDefi(etoile: 2 | 3 | 4 | 5, forcer?: "perimetre" | "eleve"): QG {
  const s = sommetsQuadrilatere();
  const N = s.join("");
  const p = pick(PRENOMS);
  const [P, Q, R] = tour(s, randomInt(0, 3), pick([1, -1] as const));
  const famille = forcer ?? (etoile <= 3 ? "description" : etoile === 4 ? pick(["perimetre", "eleve"] as const) : "rectangle");
  if (famille === "description") {
    const c = randomInt(3, 9);
    const L = c + randomInt(2, 5);
    const cas = pick<[string, string, string]>(
      etoile === 2
        ? ([
            [`4 angles droits et 4 côtés de ${c} cm`, "carré", "Quatre angles droits ET quatre côtés égaux : c’est un carré."],
            [`4 angles droits, deux côtés de ${L} cm et deux côtés de ${c} cm`, "rectangle", `Quatre angles droits, mais des côtés de ${L} cm et de ${c} cm : c’est un rectangle, pas un carré.`],
            [`4 côtés de ${c} cm et aucun angle droit`, "losange", "Quatre côtés égaux et aucun angle droit : c’est un losange, pas un carré."],
          ])
        : ([
            [`3 angles droits et 4 côtés de ${c} cm`, "carré", "Trois angles droits : c’est un rectangle (le quatrième est droit aussi). Ses quatre côtés sont égaux : c’est un carré."],
            [`un angle droit et 4 côtés de ${c} cm`, "carré", "Quatre côtés égaux : c’est un losange. Un losange qui a un angle droit est un carré."],
            [`4 côtés de ${c} cm`, "losange", "Quatre côtés égaux : c’est un losange. Rien ne dit qu’il a un angle droit : on ne peut pas dire que c’est un carré."],
            [`3 angles droits, deux côtés de ${L} cm et deux côtés de ${c} cm`, "rectangle", `Trois angles droits : c’est un rectangle. Ses côtés mesurent ${L} cm et ${c} cm : ce n’est pas un carré.`],
          ]),
    );
    const question = pick([`Quelle est la nature de ${N} ?`, `Quel est le nom le plus précis de ${N} ?`, `${N} est…`]);
    return qcmQ(
      `${pick(CONTEXTES_DESSIN)(pick(PRENOMS), N)} ${N} a ${cas[0]}. ${question}`,
      cas[1],
      ["carré", "rectangle", "losange", "quadrilatère quelconque"].filter((z) => z !== cas[1]),
      cas[2],
    );
  }
  if (famille === "eleve") {
    const d = pick([
      { props: ["L"] as Prop[], affirme: "carré" as Nat },
      { props: ["R"] as Prop[], affirme: "carré" as Nat },
      { props: ["DPM"] as Prop[], affirme: "carré" as Nat },
      { props: ["DEM"] as Prop[], affirme: "carré" as Nat },
      { props: ["L", "A1"] as Prop[], affirme: "carré" as Nat },
      { props: ["DEPM"] as Prop[], affirme: "carré" as Nat },
      { props: ["L"] as Prop[], affirme: "rectangle" as Nat },
      { props: ["R", "C2"] as Prop[], affirme: "carré" as Nat },
    ]);
    const v = verdict(d.props, d.affirme);
    return qcmQ(
      `${ctxQuad(N)} ${N} a ${dire(d.props)}. ${p.nom} affirme : « ${N} est forcément un ${d.affirme}. » A-t-${ilQ(p)} raison ?`,
      v.bonne,
      v.leurres,
      v.pq,
    );
  }
  const o = pick(OBJETS_MESURE);
  const tourFait = pick([
    (P: number, u: string) => `Son périmètre est de ${P} ${u}.`,
    (P: number, u: string) => `Le tour complet mesure ${P} ${u}.`,
    (P: number, u: string) => `${p.nom} en fait le tour : cela fait ${P} ${u} en tout.`,
  ]);
  if (famille === "perimetre") {
    const nat = pick(["carré", "losange"] as const);
    const c = randomInt(o.lo, o.hi);
    const demande = pick([seg(P, Q), seg(Q, R), "un côté"]);
    const question = demande === "un côté" ? pick(["Combien mesure un côté ?", "Quelle est la longueur d’un côté ?"]) : pick(QUESTIONS_LONGUEUR)(demande);
    return mesureQ(
      `${o.dit(p, nat, N)} ${tourFait(4 * c, o.u)} ${question}`,
      c,
      o.u,
      `Les 4 côtés d’un ${nat} ont la même longueur. Le périmètre est la somme des 4 côtés : un côté mesure ${4 * c} ÷ 4 = ${c} ${o.u}.`,
    );
  }
  const l = randomInt(o.lo, Math.max(o.lo + 1, Math.floor((o.lo + o.hi) / 2)));
  let L = randomInt(l + 1, Math.max(l + 2, o.hi));
  if (L === l) L = l + 1;
  const [donne, vd, cherche, vc] = pick([[seg(P, Q), L, seg(Q, R), l], [seg(Q, R), l, seg(P, Q), L]] as const);
  return mesureQ(
    `${o.dit(p, "rectangle", N)} ${donne} mesure ${vd} ${o.u}. ${tourFait(2 * (L + l), o.u)} ${pick(QUESTIONS_LONGUEUR)(cherche)}`,
    vc,
    o.u,
    `${donne} et ${cherche} sont deux côtés consécutifs du rectangle. Le périmètre compte deux fois chacun : ${donne} + ${cherche} = ${2 * (L + l)} ÷ 2 = ${L + l} ${o.u}. Donc ${cherche} = ${L + l} − ${vd} = ${vc} ${o.u}.`,
  );
}

export const quadrilateresBank: TutorBankItemV4[] = [
  // =========================
  // QUADRILATERE_NOMMER_VOCABULAIRE
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Comment nomme-t-on ce quadrilatère ?",
    format: "qcm",
    choices: ["ABCD", "ACBD", "ABDC", "ADBC"],
    expected: ["ABCD"],
    comparator: "mcq_exact",
    hint: "On nomme la figure avec ses 4 sommets dans l’ordre.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Un quadrilatère se nomme en donnant les sommets dans l’ordre autour de la figure. Ici, on peut le nommer ABCD.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "nommage", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 80 },
        B: { x: 240, y: 80 },
        C: { x: 255, y: 190 },
        D: { x: 85, y: 205 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de sommets possède un quadrilatère ?",
    format: "qcm",
    choices: ["3", "4", "5", "6"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Le préfixe « quadri » aide.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Le mot quadrilatère indique une figure à 4 côtés, donc elle possède aussi 4 sommets.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "sommets"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de côtés possède un quadrilatère ?",
    format: "qcm",
    choices: ["3", "4", "5", "6"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Un quadrilatère a autant de côtés que de sommets.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Un quadrilatère est une figure qui possède 4 côtés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "cotes"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Quelles sont les diagonales de ce quadrilatère ?",
    format: "qcm",
    choices: ["AB et BC", "AC et BD", "AB et CD", "AD et BC"],
    expected: ["AC et BD"],
    comparator: "mcq_exact",
    hint: "Une diagonale relie deux sommets opposés.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Dans un quadrilatère, une diagonale relie deux sommets opposés. Ici, les diagonales sont AC et BD.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "diagonales", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 80 },
        B: { x: 240, y: 70 },
        C: { x: 260, y: 190 },
        D: { x: 90, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showDiagonals: true,
      },
      sideLabels: {
        AC: "AC",
        BD: "BD",
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le quadrilatère ABCD, quels sont les côtés opposés ?",
    format: "qcm",
    choices: ["AB et BC ; CD et DA", "AB et CD ; BC et AD", "AB et AD ; BC et CD", "AC et BD"],
    expected: ["AB et CD ; BC et AD"],
    comparator: "mcq_exact",
    hint: "Deux côtés opposés ne se touchent pas.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Dans ABCD, les côtés opposés sont AB et CD d’une part, puis BC et AD d’autre part.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "vocabulaire", "cotes-opposes"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le quadrilatère ABCD, AB et BC sont des côtés…",
    format: "qcm",
    choices: ["opposés", "consécutifs", "parallèles", "égaux"],
    expected: ["consécutifs"],
    comparator: "mcq_exact",
    hint: "Ils se touchent au sommet B.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("AB et BC ont un sommet commun, B. Ce sont donc deux côtés consécutifs.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "vocabulaire", "cotes-consecutifs"],
  },
  {
    kind: "template",
    id: "quadrilatere_nommer_vocabulaire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Relis bien le vocabulaire : sommets, côtés, diagonales.",
    tags: ["quadrilatere", "template", "vocabulaire"],
    generate: () => genQuadVocabulaire(2),
  },
  {
    kind: "template",
    id: "quadrilatere_nommer_vocabulaire_tpl_compter_nommer",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    hint: "Un quadrilatère a 4 côtés. On le nomme en tournant autour de la figure.",
    tags: ["quadrilatere", "template", "vocabulaire", "nommer"],
    generate: () => genQuadVocabulaire(1),
  },

  // =========================
  // QUADRILATERE_IDENTIFIER_NATURE
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_identifier_nature",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la nature de cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "La figure a 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Une figure qui possède 4 angles droits est un rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "rectangle", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 70 },
        B: { x: 250, y: 70 },
        C: { x: 250, y: 190 },
        D: { x: 70, y: 190 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_identifier_nature",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la nature de cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "Les 4 côtés sont égaux mais il n’y a pas d’angle droit codé.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Une figure qui possède 4 côtés égaux, sans information d’angles droits, est un losange.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "losange", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 45 },
        B: { x: 255, y: 120 },
        C: { x: 160, y: 205 },
        D: { x: 65, y: 120 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_identifier_nature",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la nature de cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["carré"],
    comparator: "mcq_exact",
    hint: "Il y a 4 côtés égaux et 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Une figure qui possède 4 angles droits et 4 côtés égaux est un carré.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "carre", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 90, y: 70 },
        B: { x: 230, y: 70 },
        C: { x: 230, y: 210 },
        D: { x: 90, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_identifier_nature",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la nature de cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["quadrilatère quelconque"],
    comparator: "mcq_exact",
    hint: "Aucune propriété particulière n’est codée.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Sans codage d’angles droits, de côtés égaux ou d’autres propriétés particulières, on parle de quadrilatère quelconque.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "quelconque", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 85 },
        B: { x: 245, y: 60 },
        C: { x: 270, y: 185 },
        D: { x: 95, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_identifier_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature de cette figure penchée ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Même penché, un rectangle garde ses 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Une figure peut être penchée à l’écran tout en gardant 4 angles droits. C’est donc un rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "rectangle", "penche", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 95, y: 80 },
        B: { x: 220, y: 55 },
        C: { x: 250, y: 165 },
        D: { x: 125, y: 190 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_identifier_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature de cette figure penchée ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["carré"],
    comparator: "mcq_exact",
    hint: "Même penché, le carré garde 4 côtés égaux et 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Le carré reste un carré même s’il est penché sur le dessin : il a toujours 4 côtés égaux et 4 angles droits.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "carre", "penche", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 120, y: 55 },
        B: { x: 230, y: 85 },
        C: { x: 200, y: 195 },
        D: { x: 90, y: 165 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_identifier_nature",
    difficulty: 3,
    theme: "neutral",
    text: "Avec les codages donnés, que peut-on affirmer sur cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "on ne peut pas savoir"],
    expected: ["on ne peut pas savoir"],
    comparator: "mcq_exact",
    hint: "La figure n’a qu’une partie des informations utiles.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Le codage donné n’est pas suffisant pour reconnaître avec certitude un rectangle, un losange ou un carré. On ne peut donc pas savoir.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "nature", "savoir", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 80 },
        B: { x: 220, y: 60 },
        C: { x: 260, y: 180 },
        D: { x: 120, y: 200 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "CD"]],
      },
    },
  },
  {
    kind: "template",
    id: "quadrilatere_identifier_nature_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_identifier_nature",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe les codages : angles droits ? côtés égaux ?",
    tags: ["quadrilatere", "template", "nature"],
    generate: () => genQuadNature(2),
  },
  {
    kind: "template",
    id: "quadrilatere_identifier_nature_tpl_droit",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_identifier_nature",
    difficulty: 1,
    theme: "neutral",
    hint: "Observe les codages : angles droits ? côtés égaux ?",
    tags: ["quadrilatere", "template", "nature", "canvas"],
    generate: () => genQuadNature(1),
  },
  {
    kind: "template",
    id: "quadrilatere_identifier_nature_tpl_allure",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_identifier_nature",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne conclut que sur ce qui est codé, jamais sur l’allure du dessin.",
    tags: ["quadrilatere", "template", "nature", "canvas", "codage"],
    generate: () => genQuadNature(3),
  },

  // =========================
  // QUADRILATERE_LIRE_PROPRIETES
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_lire_propriete_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lire_propriete",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’angles droits sont codés sur cette figure ?",
    format: "qcm",
    choices: ["0", "2", "4", "6"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Compte les petits carrés rouges.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Les petits carrés indiquent les angles droits. Ici, on en compte 4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "angle_mesure", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 75 },
        B: { x: 245, y: 75 },
        C: { x: 245, y: 190 },
        D: { x: 80, y: 190 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_propriete_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lire_propriete",
    difficulty: 1,
    theme: "neutral",
    text: "Que peut-on dire des côtés de cette figure ?",
    format: "qcm",
    choices: [
      "2 côtés égaux",
      "3 côtés égaux",
      "4 côtés égaux",
      "aucun côté égal",
    ],
    expected: ["4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "Les mêmes codages verts indiquent des longueurs égales.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Le même codage sur chaque côté indique que les 4 côtés sont égaux.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "cotes", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 50 },
        B: { x: 250, y: 120 },
        C: { x: 160, y: 200 },
        D: { x: 70, y: 120 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_propriete_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lire_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de paires de côtés parallèles sont codées ?",
    format: "qcm",
    choices: ["0", "1", "2", "4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Regarde les codages de parallélisme.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Le codage indique deux paires de côtés parallèles.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "paralleles", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 80 },
        B: { x: 220, y: 60 },
        C: { x: 260, y: 180 },
        D: { x: 120, y: 200 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        parallelSides: [["AB", "CD"], ["BC", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_propriete_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lire_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de diagonales possède un quadrilatère ?",
    format: "qcm",
    choices: ["1", "2", "3", "4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Les diagonales relient deux sommets opposés.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Un quadrilatère possède 2 diagonales, car il y a 2 façons de relier les sommets opposés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "diagonales"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_propriete_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lire_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Combien un quadrilatère a-t-il de diagonales en tout ?",
    format: "qcm",
    choices: ["2", "1", "3", "4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Compte les paires de sommets qui se font face.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Une diagonale relie deux sommets opposés. Dans un quadrilatère ABCD, deux paires de sommets se font face : A avec C, et B avec D. Il y a donc exactement 2 diagonales, AC et BD.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "diagonales", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 80 },
        B: { x: 240, y: 70 },
        C: { x: 260, y: 190 },
        D: { x: 90, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showDiagonals: true,
      },
      sideLabels: {
        AC: "AC",
        BD: "BD",
      },
    },
  },
  {
    kind: "template",
    id: "quadrilatere_lire_propriete_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lire_propriete",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis les codages : angles droits, côtés égaux, côtés parallèles.",
    tags: ["quadrilatere", "template", "proprietes"],
    generate: () => genQuadLire(2),
  },
  {
    kind: "template",
    id: "quadrilatere_lire_propriete_tpl_cotes",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lire_propriete",
    difficulty: 1,
    theme: "neutral",
    hint: "Carré et losange : 4 côtés de même longueur. Rectangle et carré : 4 angles droits.",
    tags: ["quadrilatere", "template", "proprietes"],
    generate: () => genQuadLire(1),
  },
  {
    kind: "template",
    id: "quadrilatere_lire_propriete_tpl_diagonales",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lire_propriete",
    difficulty: 4,
    theme: "neutral",
    hint: "Les diagonales se coupent en leur milieu ; dans un rectangle, elles ont la même longueur.",
    tags: ["quadrilatere", "template", "proprietes", "diagonales"],
    generate: () => genQuadLire(4),
  },

  // =========================
  // QUADRILATERE_LIEN_PROPRIETES
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_lien_propriete_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lien_propriete",
    difficulty: 1,
    theme: "neutral",
    text: "Un quadrilatère a 4 angles droits. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "4 angles droits suffisent pour reconnaître un rectangle.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Un quadrilatère qui possède 4 angles droits est un rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "proprietes"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lien_propriete_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lien_propriete",
    difficulty: 1,
    theme: "neutral",
    text: "Un quadrilatère a 4 côtés égaux. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "4 côtés égaux suffisent pour reconnaître un losange.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Un quadrilatère qui possède 4 côtés égaux est un losange.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "proprietes"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lien_propriete_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lien_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Un quadrilatère a 4 côtés égaux et 4 angles droits. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["carré"],
    comparator: "mcq_exact",
    hint: "Il cumule les propriétés du rectangle et du losange.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Un quadrilatère qui possède 4 côtés égaux et 4 angles droits est un carré.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "proprietes", "carre"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lien_propriete_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lien_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Un quadrilatère a 2 paires de côtés parallèles et 4 angles droits. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "L’information essentielle ici reste : 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Dès qu’un quadrilatère possède 4 angles droits, c’est un rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "proprietes", "paralleles"],
  },
  {
    kind: "template",
    id: "quadrilatere_lien_propriete_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lien_propriete",
    difficulty: 2,
    theme: "neutral",
    hint: "Fais le lien entre la propriété donnée et la nature de la figure.",
    tags: ["quadrilatere", "template", "proprietes"],
    generate: () => genQuadLien(2),
  },
  {
    kind: "template",
    id: "quadrilatere_lien_propriete_tpl_cotes_angles",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lien_propriete",
    difficulty: 1,
    theme: "neutral",
    hint: "4 angles droits : rectangle. 4 côtés égaux : losange. Les deux : carré.",
    tags: ["quadrilatere", "template", "proprietes"],
    generate: () => genQuadLien(1),
  },
  {
    kind: "template",
    id: "quadrilatere_lien_propriete_tpl_diagonales",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_lien_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Diagonales de même longueur : rectangle. Perpendiculaires : losange. Les deux : carré.",
    tags: ["quadrilatere", "template", "proprietes", "diagonales"],
    generate: () => genQuadLien(3),
  },

  // =========================
  // QUADRILATERE_DISTINGUER
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_distinguer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle propriété distingue un carré d’un rectangle ?",
    format: "qcm",
    choices: [
      "Le carré a 4 côtés égaux",
      "Le carré a 4 angles",
      "Le carré a des sommets",
      "Le carré a 2 diagonales",
    ],
    expected: ["Le carré a 4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "Le rectangle n’a pas forcément 4 côtés égaux.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Le carré et le rectangle ont tous deux 4 angles droits, mais seul le carré a forcément 4 côtés égaux.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "distinguer", "carre", "rectangle"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_distinguer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle propriété distingue un carré d’un losange ?",
    format: "qcm",
    choices: [
      "Le carré a 4 angles droits",
      "Le carré a 4 côtés",
      "Le carré a des diagonales",
      "Le carré a des sommets",
    ],
    expected: ["Le carré a 4 angles droits"],
    comparator: "mcq_exact",
    hint: "Le losange n’a pas forcément 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Le carré et le losange ont tous deux 4 côtés égaux, mais seul le carré a forcément 4 angles droits.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "distinguer", "carre", "losange"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_distinguer",
    difficulty: 3,
    theme: "neutral",
    text: "Cette figure est-elle un carré ou un losange ?",
    format: "qcm",
    choices: ["carré", "losange"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "Les 4 côtés sont égaux, mais aucun angle droit n’est codé.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Comme les 4 côtés sont égaux mais qu’aucun angle droit n’est indiqué, cette figure est un losange.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "canvas", "distinguer"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 45 },
        B: { x: 255, y: 120 },
        C: { x: 160, y: 205 },
        D: { x: 65, y: 120 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_distinguer",
    difficulty: 3,
    theme: "neutral",
    text: "Cette figure est-elle un carré ou un rectangle ?",
    format: "qcm",
    choices: ["carré", "rectangle"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Il y a 4 angles droits, mais les côtés ne sont pas tous égaux.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("La figure possède 4 angles droits, donc c’est un rectangle. Comme les 4 côtés ne sont pas tous codés égaux, ce n’est pas un carré.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "canvas", "distinguer"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 70 },
        B: { x: 250, y: 70 },
        C: { x: 250, y: 180 },
        D: { x: 70, y: 180 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
      },
    },
  },
  {
    kind: "template",
    id: "quadrilatere_distinguer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_distinguer",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la propriété qui manque ou la propriété en plus.",
    tags: ["quadrilatere", "template", "distinguer"],
    generate: () => genQuadDistinguer(3),
  },
  {
    kind: "template",
    id: "quadrilatere_distinguer_tpl_verifier",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_distinguer",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche ce que l’une des deux figures a toujours, et l’autre pas forcément.",
    tags: ["quadrilatere", "template", "distinguer"],
    generate: () => genQuadDistinguer(2),
  },

  // =========================
  // QUADRILATERE_CONCLUSION
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_conclusion",
    difficulty: 3,
    theme: "neutral",
    text: "Un quadrilatère a 4 côtés égaux. Peut-on affirmer que c’est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il manque l’information sur les angles droits.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Avec seulement 4 côtés égaux, on peut conclure que c’est un losange, mais pas forcément un carré, car il manque l’information “4 angles droits”.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "conclusion"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_conclusion",
    difficulty: 3,
    theme: "neutral",
    text: "Un quadrilatère a 4 angles droits. Peut-on affirmer que c’est un rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Oui, 4 angles droits suffisent.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Oui. Un quadrilatère qui a 4 angles droits est un rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "conclusion"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_conclusion",
    difficulty: 3,
    theme: "neutral",
    text: "Un quadrilatère a 4 angles droits. Peut-on affirmer que c’est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il manque l’information : les 4 côtés égaux.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Non. Avec 4 angles droits, on sait que c’est un rectangle, mais pour affirmer que c’est un carré il faut aussi savoir que les 4 côtés sont égaux.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "conclusion"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_conclusion",
    difficulty: 3,
    theme: "neutral",
    text: "Avec les informations codées, peut-on affirmer que cette figure est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les côtés sont égaux, mais aucun angle droit n’est codé.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Les 4 côtés sont égaux, mais on ne sait pas si les angles sont droits. On ne peut donc pas affirmer que c’est un carré.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "canvas", "conclusion"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 45 },
        B: { x: 255, y: 120 },
        C: { x: 160, y: 205 },
        D: { x: 65, y: 120 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_conclusion",
    difficulty: 4,
    theme: "neutral",
    text: "Avec les informations codées, peut-on affirmer que cette figure est un rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une seule paire de côtés égaux ne suffit pas.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Le codage donné ne montre pas 4 angles droits. On ne peut donc pas affirmer que cette figure est un rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "canvas", "conclusion", "piege"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 80 },
        B: { x: 220, y: 60 },
        C: { x: 260, y: 180 },
        D: { x: 120, y: 200 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "CD"]],
      },
    },
  },
  {
    kind: "template",
    id: "quadrilatere_conclusion_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_conclusion",
    difficulty: 4,
    theme: "neutral",
    hint: "Demande-toi si les informations sont suffisantes pour conclure.",
    tags: ["quadrilatere", "template", "conclusion"],
    generate: () => genQuadConclusion(4),
  },
  {
    kind: "template",
    id: "quadrilatere_conclusion_tpl_cotes_angles",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_conclusion",
    difficulty: 2,
    theme: "neutral",
    hint: "Une figure qui a ces propriétés sans être celle annoncée existe-t-elle ?",
    tags: ["quadrilatere", "template", "conclusion"],
    generate: () => genQuadConclusion(2),
  },
  {
    kind: "template",
    id: "quadrilatere_conclusion_tpl_contre_exemple",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_conclusion",
    difficulty: 3,
    theme: "neutral",
    hint: "Pense au losange aplati et au rectangle allongé : ont-ils ces propriétés ?",
    tags: ["quadrilatere", "template", "conclusion"],
    generate: () => genQuadConclusion(3),
  },

  // =========================
  // QUADRILATERE_COMPLETER_CONSTRUIRE
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_completer_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour être sûr qu’un losange soit aussi un carré, quelle information faut-il ajouter ?",
    format: "qcm",
    choices: [
      "qu’il a 4 angles droits",
      "qu’il a 4 côtés",
      "qu’il a 2 diagonales",
      "qu’il a 4 sommets",
    ],
    expected: ["qu’il a 4 angles droits"],
    comparator: "mcq_exact",
    hint: "Le carré est un losange avec une propriété en plus.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Un losange devient un carré si on sait en plus qu’il a 4 angles droits.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "completer", "carre"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_completer_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour être sûr qu’un rectangle soit aussi un carré, quelle information faut-il ajouter ?",
    format: "qcm",
    choices: [
      "qu’il a 4 côtés égaux",
      "qu’il a 4 angles",
      "qu’il a 2 diagonales",
      "qu’il a 2 côtés parallèles",
    ],
    expected: ["qu’il a 4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "Le carré est un rectangle avec une propriété en plus.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Un rectangle devient un carré si on sait en plus que ses 4 côtés sont égaux.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "completer", "rectangle"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_completer_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Que faut-il ajouter comme codage pour affirmer que cette figure est un carré ?",
    format: "qcm",
    choices: [
      "coder 4 angles droits",
      "ajouter une diagonale",
      "changer le nom des sommets",
      "supprimer un côté",
    ],
    expected: ["coder 4 angles droits"],
    comparator: "mcq_exact",
    hint: "Les 4 côtés égaux sont déjà codés.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Les 4 côtés égaux sont déjà indiqués. Pour conclure à un carré, il faut ajouter le codage des 4 angles droits.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "completer", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 45 },
        B: { x: 255, y: 120 },
        C: { x: 160, y: 205 },
        D: { x: 65, y: 120 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_completer_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Que faut-il ajouter comme codage pour affirmer que cette figure est un carré ?",
    format: "qcm",
    choices: [
      "coder 4 côtés égaux",
      "ajouter une diagonale",
      "changer le nom des sommets",
      "retirer un angle droit",
    ],
    expected: ["coder 4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "Les 4 angles droits sont déjà codés.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Les 4 angles droits sont déjà indiqués. Pour conclure à un carré, il faut encore coder les 4 côtés égaux.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "completer", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 70 },
        B: { x: 250, y: 70 },
        C: { x: 250, y: 190 },
        D: { x: 70, y: 190 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_completer_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Pour construire un quadrilatère ABCD, combien de sommets faut-il placer ?",
    format: "qcm",
    choices: ["2", "3", "4", "5"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Le nom ABCD donne déjà l’information.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Le nom ABCD montre qu’il y a 4 sommets à placer : A, B, C et D.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "construire"],
  },
  {
    kind: "template",
    id: "quadrilatere_completer_construire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_completer_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche l’information manquante pour conclure ou construire.",
    tags: ["quadrilatere", "template", "completer"],
    generate: () => genQuadCompleter(3),
  },
  {
    kind: "template",
    id: "quadrilatere_completer_construire_tpl_cotes",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_completer_construire",
    difficulty: 1,
    theme: "neutral",
    hint: "Carré et losange : 4 côtés de même longueur. Rectangle : côtés opposés de même longueur.",
    tags: ["quadrilatere", "template", "completer", "construire"],
    generate: () => genQuadCompleter(1),
  },
  {
    kind: "template",
    id: "quadrilatere_completer_construire_tpl_ajouter",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_completer_construire",
    difficulty: 2,
    theme: "neutral",
    hint: "Un carré est à la fois un rectangle et un losange : que manque-t-il à la figure de départ ?",
    tags: ["quadrilatere", "template", "completer"],
    generate: () => genQuadCompleter(2),
  },

  // =========================
  // QUADRILATERE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_defi",
    difficulty: 2,
    theme: "neutral",
    text: "Un quadrilatère a 4 côtés égaux et aucun angle droit. Quel est son type ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "4 côtés égaux sans angle droit : ce n’est pas un carré.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Avec 4 côtés égaux, on reconnaît un losange. Comme il n’y a pas d’angle droit, ce n’est pas un carré.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "defi"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un quadrilatère a 4 angles droits et 4 côtés égaux. Quel est son type ?",
    format: "qcm",
    choices: ["carré", "rectangle", "losange", "quadrilatère quelconque"],
    expected: ["carré"],
    comparator: "mcq_exact",
    hint: "Il a à la fois les propriétés du rectangle et du losange.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Un quadrilatère qui possède 4 angles droits et 4 côtés égaux est un carré.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "defi"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_propriete_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_propriete_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on dire qu’un carré est aussi un rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un carré possède bien 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Oui. Comme un carré possède 4 angles droits, c’est aussi un rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "defi", "logique"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_propriete_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_propriete_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Peut-on dire qu’un carré est aussi un losange ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un carré possède bien 4 côtés égaux.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Oui. Comme un carré possède 4 côtés égaux, c’est aussi un losange.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "defi", "logique"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_defi_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Observe la figure. Peut-on affirmer que c’est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Les 4 côtés sont égaux et les 4 angles sont droits.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Oui. Les codages montrent à la fois 4 côtés égaux et 4 angles droits. C’est donc un carré.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "defi", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 90, y: 70 },
        B: { x: 220, y: 70 },
        C: { x: 220, y: 200 },
        D: { x: 90, y: 200 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_propriete_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_propriete_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Peut-on connaître exactement la nature d’un quadrilatère si l’on sait seulement qu’il a deux diagonales ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tous les quadrilatères ont deux diagonales.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Non. Le fait d’avoir 2 diagonales ne suffit pas, car tous les quadrilatères en ont 2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "defi", "diagonales"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_propriete_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_propriete_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi un quadrilatère ayant 4 côtés égaux n’est-il pas forcément un carré ?",
    format: "qcm",
    choices: [
      "Parce que ce peut être un losange sans angle droit.",
      "Parce que ce peut être un rectangle qui n’est pas un carré.",
      "Parce qu’un carré n’a jamais 4 côtés égaux.",
      "Parce qu’il lui manque un cinquième côté.",
    ],
    expected: ["Parce que ce peut être un losange sans angle droit."],
    comparator: "mcq_exact",
    hint: "Pense au losange.",
    explanation:
      "Définition : un quadrilatère est un polygone qui possède 4 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets, les angles et les diagonales.\n\n" +
      "Calcul : " +
      ("Un quadrilatère à 4 côtés égaux peut être un losange. Pour être un carré, il faut en plus que ses 4 angles soient droits.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["quadrilatere", "defi", "raisonnement"],
  },
  {
    kind: "template",
    id: "quadrilatere_propriete_defi_tpl_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_propriete_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Mobilise plusieurs propriétés à la fois.",
    tags: ["quadrilatere", "defi", "template"],
    generate: () => genQuadProprieteDefi(4),
  },
  {
    kind: "template",
    id: "quadrilatere_propriete_defi_tpl_inclusion",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_propriete_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Un carré a toutes les propriétés du rectangle ET du losange.",
    tags: ["quadrilatere", "defi", "template", "inclusion"],
    generate: () => genQuadProprieteDefi(3),
  },
  {
    kind: "template",
    id: "quadrilatere_propriete_defi_tpl_verdict",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_propriete",
    microId: "quadrilatere_propriete_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Pars de la figure de départ, puis demande-toi ce que la propriété ajoutée change.",
    tags: ["quadrilatere", "defi", "template"],
    generate: () => genQuadProprieteDefi(5),
  },

  // =========================
  // TOP-UP — QUADRILATERE_NOMMER_VOCABULAIRE
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_fixed_7",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_figure", microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 1, theme: "neutral",
    text: "Combien de diagonales possède un quadrilatère ?",
    format: "qcm",
    choices: ["1 diagonale", "2 diagonales", "3 diagonales", "4 diagonales"],
    expected: ["2 diagonales"],
    comparator: "mcq_exact",
    hint: "Les diagonales relient les sommets opposés.",
    explanation: expl("Un quadrilatère possède 2 diagonales : elles relient les sommets opposés (par exemple AC et BD)."),
    tags: ["quadrilatere", "vocabulaire", "diagonales"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_figure", microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 2, theme: "neutral",
    text: "Dans le quadrilatère ABCD, quel côté est opposé au côté AB ?",
    format: "qcm",
    choices: ["CD", "BC", "AD", "AC"],
    expected: ["CD"],
    comparator: "mcq_exact",
    hint: "Les côtés opposés ne se touchent pas.",
    explanation: expl("Dans le quadrilatère ABCD, les côtés AB et CD sont opposés : ils ne partagent aucun sommet."),
    tags: ["quadrilatere", "vocabulaire", "cotes", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_short_3",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_figure", microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 1, theme: "neutral",
    text: "Combien d’angles possède un quadrilatère ?",
    format: "qcm",
    choices: ["2 angles", "3 angles", "4 angles", "8 angles"],
    expected: ["4 angles"],
    comparator: "mcq_exact",
    hint: "Autant que de sommets.",
    explanation: expl("Un quadrilatère possède 4 sommets, 4 côtés et 4 angles."),
    tags: ["quadrilatere", "vocabulaire", "angles"],
  },

  // =========================
  // TOP-UP — QUADRILATERE_LIRE_PROPRIETE
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_lire_propriete_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_lire_propriete",
    difficulty: 2, theme: "neutral",
    text: "Combien de paires de côtés parallèles possède un rectangle ?",
    format: "qcm",
    choices: ["2 paires", "1 paire", "aucune", "4 paires"],
    expected: ["2 paires"],
    comparator: "mcq_exact",
    hint: "Les côtés opposés d’un rectangle sont parallèles.",
    explanation: expl("Dans un rectangle, les côtés opposés sont parallèles deux à deux : il y a donc 2 paires de côtés parallèles."),
    tags: ["quadrilatere", "lire_propriete", "parallele", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_propriete_short_2",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_lire_propriete",
    difficulty: 1, theme: "neutral",
    text: "Combien d’angles droits possède un rectangle ?",
    format: "qcm",
    choices: ["1 angle droit", "2 angles droits", "4 angles droits", "aucun angle droit"],
    expected: ["4 angles droits"],
    comparator: "mcq_exact",
    hint: "Regarde les 4 coins.",
    explanation: expl("Un rectangle possède 4 angles droits."),
    tags: ["quadrilatere", "lire_propriete", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_propriete_short_3",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_lire_propriete",
    difficulty: 2, theme: "neutral",
    text: "Combien de côtés de même longueur possède un losange ?",
    format: "qcm",
    choices: ["2 côtés", "3 côtés", "4 côtés", "aucun"],
    expected: ["4 côtés"],
    comparator: "mcq_exact",
    hint: "Tous les côtés d’un losange sont codés de la même façon.",
    explanation: expl("Un losange possède 4 côtés de même longueur."),
    tags: ["quadrilatere", "lire_propriete", "cotes"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_propriete_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_lire_propriete",
    difficulty: 4, theme: "neutral",
    text: "Dans un carré, que peut-on dire des deux diagonales ?",
    format: "qcm",
    choices: [
      "elles sont de même longueur et perpendiculaires",
      "elles sont de longueurs différentes",
      "il n’y en a qu’une seule",
      "elles ne se croisent pas",
    ],
    expected: ["elles sont de même longueur et perpendiculaires"],
    comparator: "mcq_exact",
    hint: "Le carré cumule les propriétés du rectangle et du losange.",
    explanation: expl("Dans un carré, les diagonales sont de même longueur (comme dans le rectangle) et perpendiculaires (comme dans le losange)."),
    tags: ["quadrilatere", "lire_propriete", "diagonales", "qcm"],
  },

  // =========================
  // TOP-UP — QUADRILATERE_LIEN_PROPRIETE
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_lien_propriete_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_lien_propriete",
    difficulty: 2, theme: "neutral",
    text: "Un quadrilatère a deux paires de côtés parallèles. Quelle est sa nature (la plus générale) ?",
    format: "qcm",
    choices: ["parallélogramme", "trapèze", "carré", "losange"],
    expected: ["parallélogramme"],
    comparator: "mcq_exact",
    hint: "Deux paires de côtés parallèles → parallélogramme.",
    explanation: expl("Un quadrilatère qui a ses côtés opposés parallèles deux à deux est un parallélogramme."),
    tags: ["quadrilatere", "lien_propriete", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lien_propriete_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_lien_propriete",
    difficulty: 2, theme: "neutral",
    text: "Un quadrilatère a 4 angles droits mais ses côtés ne sont pas tous égaux. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "carré", "losange", "trapèze"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "4 angles droits, mais pas tous les côtés égaux.",
    explanation: expl("Un quadrilatère qui a 4 angles droits est un rectangle. Comme ses côtés ne sont pas tous égaux, ce n’est pas un carré."),
    tags: ["quadrilatere", "lien_propriete", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lien_propriete_qcm_4",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_lien_propriete",
    difficulty: 2, theme: "neutral",
    text: "Un quadrilatère a 4 côtés égaux mais aucun angle droit. Quelle est sa nature ?",
    format: "qcm",
    choices: ["losange", "carré", "rectangle", "trapèze"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "4 côtés égaux sans angle droit.",
    explanation: expl("Un quadrilatère qui a 4 côtés égaux est un losange. Comme il n’a pas d’angle droit, ce n’est pas un carré."),
    tags: ["quadrilatere", "lien_propriete", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lien_propriete_qcm_5",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_lien_propriete",
    difficulty: 3, theme: "neutral",
    text: "Un parallélogramme possède un angle droit. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "losange", "trapèze", "cerf-volant"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Un parallélogramme avec un angle droit a en fait 4 angles droits.",
    explanation: expl("Dans un parallélogramme, si un angle est droit, alors les quatre angles le sont : c’est donc un rectangle."),
    tags: ["quadrilatere", "lien_propriete", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lien_propriete_qcm_6",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_lien_propriete",
    difficulty: 3, theme: "neutral",
    text: "Un quadrilatère a 4 côtés égaux ET 4 angles droits. Quelle est sa nature ?",
    format: "qcm",
    choices: ["carré", "rectangle", "losange", "parallélogramme"],
    expected: ["carré"],
    comparator: "mcq_exact",
    hint: "Il cumule les deux propriétés.",
    explanation: expl("Un quadrilatère qui a 4 côtés égaux et 4 angles droits est un carré."),
    tags: ["quadrilatere", "lien_propriete", "qcm"],
  },

  // =========================
  // TOP-UP — QUADRILATERE_DISTINGUER
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_figure", microId: "quadrilatere_distinguer",
    difficulty: 2, theme: "neutral",
    text: "Quelle propriété distingue un carré d’un losange ?",
    format: "qcm",
    choices: [
      "le carré a 4 angles droits",
      "le carré a 4 côtés égaux",
      "le losange a plus de côtés",
      "le losange a des diagonales",
    ],
    expected: ["le carré a 4 angles droits"],
    comparator: "mcq_exact",
    hint: "Les deux ont 4 côtés égaux ; un seul a des angles droits.",
    explanation: expl("Le carré et le losange ont tous les deux 4 côtés égaux. Ce qui les distingue, c’est que le carré possède 4 angles droits, contrairement au losange."),
    tags: ["quadrilatere", "distinguer", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_qcm_4",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_figure", microId: "quadrilatere_distinguer",
    difficulty: 2, theme: "neutral",
    text: "Quelle propriété distingue un carré d’un rectangle ?",
    format: "qcm",
    choices: [
      "le carré a 4 côtés égaux",
      "le carré a 4 angles droits",
      "le rectangle a plus d’angles",
      "le rectangle n’a pas de diagonale",
    ],
    expected: ["le carré a 4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "Les deux ont 4 angles droits ; un seul a tous ses côtés égaux.",
    explanation: expl("Le carré et le rectangle ont tous les deux 4 angles droits. Ce qui les distingue, c’est que le carré a ses 4 côtés égaux, contrairement au rectangle."),
    tags: ["quadrilatere", "distinguer", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_qcm_5",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_figure", microId: "quadrilatere_distinguer",
    difficulty: 3, theme: "neutral",
    text: "Quelle propriété distingue un losange d’un parallélogramme quelconque ?",
    format: "qcm",
    choices: [
      "le losange a 4 côtés égaux",
      "le losange a 4 angles droits",
      "le parallélogramme a 5 côtés",
      "le losange n’a pas de côtés parallèles",
    ],
    expected: ["le losange a 4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "Le losange est un parallélogramme particulier.",
    explanation: expl("Un losange est un parallélogramme qui a, en plus, ses 4 côtés égaux. C’est cette propriété qui le distingue d’un parallélogramme quelconque."),
    tags: ["quadrilatere", "distinguer", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_qcm_6",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_figure", microId: "quadrilatere_distinguer",
    difficulty: 3, theme: "neutral",
    text: "Un rectangle qui n’est pas un carré se reconnaît parce que…",
    format: "qcm",
    choices: [
      "ses côtés ne sont pas tous égaux",
      "il n’a aucun angle droit",
      "il a 3 côtés",
      "ses diagonales sont parallèles",
    ],
    expected: ["ses côtés ne sont pas tous égaux"],
    comparator: "mcq_exact",
    hint: "Un carré est un rectangle dont tous les côtés sont égaux.",
    explanation: expl("Un rectangle qui n’est pas un carré possède des côtés qui ne sont pas tous égaux (longueur ≠ largeur)."),
    tags: ["quadrilatere", "distinguer", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_qcm_7",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_figure", microId: "quadrilatere_distinguer",
    difficulty: 3, theme: "neutral",
    text: "Qu’est-ce qui différencie un parallélogramme quelconque d’un rectangle ?",
    format: "qcm",
    choices: [
      "le rectangle possède des angles droits",
      "le parallélogramme a 5 sommets",
      "le rectangle n’a pas de côtés parallèles",
      "le parallélogramme a des côtés courbes",
    ],
    expected: ["le rectangle possède des angles droits"],
    comparator: "mcq_exact",
    hint: "Le rectangle est un parallélogramme particulier.",
    explanation: expl("Un rectangle est un parallélogramme qui possède, en plus, des angles droits. C’est ce qui le distingue d’un parallélogramme quelconque."),
    tags: ["quadrilatere", "distinguer", "qcm"],
  },

  // =========================
  // TOP-UP — QUADRILATERE_CONCLUSION
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_conclusion",
    difficulty: 3, theme: "neutral",
    text: "Un quadrilatère a 4 côtés égaux. Peut-on être sûr que c’est un carré ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un losange aussi a 4 côtés égaux.",
    explanation: expl("Avec seulement 4 côtés égaux, la figure peut être un carré OU un losange. On ne peut donc pas conclure que c’est un carré : il faudrait aussi un angle droit."),
    tags: ["quadrilatere", "conclusion", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_conclusion",
    difficulty: 2, theme: "neutral",
    text: "Un quadrilatère a 4 angles droits ET 4 côtés égaux. Peut-on être sûr que c’est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Ces deux propriétés ensemble définissent le carré.",
    explanation: expl("Avec 4 angles droits ET 4 côtés égaux, la figure est forcément un carré. On peut donc conclure."),
    tags: ["quadrilatere", "conclusion", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_qcm_4",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_conclusion",
    difficulty: 3, theme: "neutral",
    text: "Un quadrilatère a deux paires de côtés parallèles. Peut-on être sûr que c’est un rectangle ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "C’est seulement un parallélogramme pour l’instant.",
    explanation: expl("Deux paires de côtés parallèles définissent un parallélogramme. Sans angle droit, on ne peut pas conclure que c’est un rectangle."),
    tags: ["quadrilatere", "conclusion", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_qcm_5",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_conclusion",
    difficulty: 4, theme: "neutral",
    text: "Un losange possède un angle droit. Peut-on être sûr que c’est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un losange a déjà 4 côtés égaux.",
    explanation: expl("Un losange a déjà 4 côtés égaux. S’il possède un angle droit, alors il a 4 angles droits : c’est donc un carré."),
    tags: ["quadrilatere", "conclusion", "qcm"],
  },

  // =========================
  // TOP-UP — QUADRILATERE_COMPLETER_CONSTRUIRE
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_completer_construire",
    difficulty: 3, theme: "neutral",
    text: "Pour qu’un parallélogramme soit un rectangle, quelle information faut-il ajouter ?",
    format: "qcm",
    choices: [
      "un angle droit",
      "un cinquième côté",
      "deux diagonales courbes",
      "rien, c’est déjà un rectangle",
    ],
    expected: ["un angle droit"],
    comparator: "mcq_exact",
    hint: "Un rectangle est un parallélogramme avec des angles droits.",
    explanation: expl("Pour qu’un parallélogramme devienne un rectangle, il suffit qu’il possède un angle droit (les quatre le deviennent alors)."),
    tags: ["quadrilatere", "completer_construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_qcm_4",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_completer_construire",
    difficulty: 3, theme: "neutral",
    text: "Pour qu’un rectangle soit un carré, quelle information faut-il ajouter ?",
    format: "qcm",
    choices: [
      "deux côtés consécutifs de même longueur",
      "un angle droit de plus",
      "une diagonale supplémentaire",
      "un cinquième sommet",
    ],
    expected: ["deux côtés consécutifs de même longueur"],
    comparator: "mcq_exact",
    hint: "Un carré est un rectangle dont tous les côtés sont égaux.",
    explanation: expl("Un rectangle a déjà 4 angles droits. S’il a deux côtés consécutifs de même longueur, alors tous ses côtés sont égaux : c’est un carré."),
    tags: ["quadrilatere", "completer_construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_qcm_5",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_completer_construire",
    difficulty: 3, theme: "neutral",
    text: "Pour qu’un losange soit un carré, quelle information faut-il ajouter ?",
    format: "qcm",
    choices: [
      "un angle droit",
      "un côté de plus",
      "des côtés inégaux",
      "rien, c’est impossible",
    ],
    expected: ["un angle droit"],
    comparator: "mcq_exact",
    hint: "Un losange a déjà 4 côtés égaux.",
    explanation: expl("Un losange a déjà 4 côtés égaux. S’il possède un angle droit, il devient un carré."),
    tags: ["quadrilatere", "completer_construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_short_2",
    niveau: "6e", matiere: "maths",
    notionId: "quadrilatere_propriete", microId: "quadrilatere_completer_construire",
    difficulty: 1, theme: "neutral",
    text: "Pour construire un quadrilatère, combien de sommets faut-il placer ?",
    format: "qcm",
    choices: ["3 sommets", "4 sommets", "5 sommets", "8 sommets"],
    expected: ["4 sommets"],
    comparator: "mcq_exact",
    hint: "Un quadrilatère a 4 côtés.",
    explanation: expl("Un quadrilatère possède 4 côtés et 4 sommets : il faut donc placer 4 sommets."),
    tags: ["quadrilatere", "completer_construire"],
  },

  // =========================
  // QUADRILATERE_DEFI — LES GÉNÉRATEURS DE RECONNAISSANCE
  //
  // ⛔ RÉPARATION DU 22/08/2026. La coupe de `quadrilatere_figure` en deux
  // notions a emporté l'unique générateur de `quadrilatere_defi` vers
  // `quadrilatere_propriete` (il portait sur les inclusions carré/rectangle/
  // losange). La micro de reconnaissance s'est retrouvée avec trois questions
  // figées : un élève les avait vues toutes les trois en deux minutes.
  //
  // ⭐ On paramètre la SITUATION, pas les nombres : ce sont les propriétés
  // annoncées qui changent, et donc la figure à nommer.
  // =========================
  {
    kind: "template",
    id: "quadrilatere_defi_tpl_nature",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_defi",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde d'abord les angles droits, ensuite les côtés égaux.",
    tags: ["quadrilatere_figure", "defi", "template"],
    generate: () => genQuadDefi(2),
  },
  {
    kind: "template",
    id: "quadrilatere_defi_tpl_nature_pieges",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois angles droits suffisent pour un rectangle ; un losange à angle droit est un carré.",
    tags: ["quadrilatere_figure", "defi", "template"],
    generate: () => genQuadDefi(3),
  },
  {
    kind: "template",
    id: "quadrilatere_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis ce que tu regardes sur la figure, dans quel ordre.",
    tags: ["quadrilatere_figure", "defi", "template", "ouverte"],
    // 06/10/2026 : l'ancienne question ouverte à mots-clés (« droit » suffisait)
    // devient un QCM sur les mêmes pièges : le verdict et son contre-exemple.
    generate: () => genQuadDefi(4, "eleve"),
  },

  // =========================
  // GÉNÉRATEURS DU 29/09/2026 — L'ÉVALUATION PAR CHAPITRES
  //
  // Le mode Défi (difficultés 3 à 5) n'offrait que 13 questions distinctes sur
  // « Quadrilatères : reconnaître et nommer ». Six générateurs, noms des
  // sommets variés. Le cœur exigeant : ne conclure que sur ce qui est CODÉ ou
  // DONNÉ — un dessin qui « a l'air » d'un carré ne suffit pas, et deux côtés
  // opposés égaux n'apprennent rien de plus sur un rectangle.
  // =========================
  {
    kind: "template",
    id: "quadrilatere_nommer_vocabulaire_qcm_tpl_oppose_diagonale",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Les sommets sont donnés dans l’ordre du tour : deux lettres voisines forment un côté.",
    tags: ["quadrilatere_figure", "vocabulaire", "qcm", "template"],
    generate: () => genQuadVocabulaire(3),
  },
  {
    kind: "template",
    id: "quadrilatere_nommer_vocabulaire_qcm_tpl_nom_faux",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 4,
    theme: "neutral",
    hint: "Dans un nom correct, deux lettres qui se suivent sont toujours deux sommets voisins.",
    tags: ["quadrilatere_figure", "vocabulaire", "qcm", "template", "nommer"],
    generate: () => genQuadVocabulaire(4),
  },
  {
    kind: "template",
    id: "quadrilatere_defi_tpl_perimetre_cote",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Carré et losange ont leurs quatre côtés égaux.",
    tags: ["quadrilatere_figure", "defi", "template", "perimetre"],
    generate: () => genQuadDefi(4, "perimetre"),
  },
  {
    kind: "template",
    id: "quadrilatere_defi_tpl_rectangle_perimetre",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Une longueur et une largeur font la moitié du périmètre.",
    tags: ["quadrilatere_figure", "defi", "template", "perimetre", "rectangle"],
    generate: () => genQuadDefi(5),
  },
  {
    kind: "template",
    id: "quadrilatere_identifier_nature_qcm_tpl_codages",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_identifier_nature",
    difficulty: 4,
    theme: "neutral",
    hint: "On ne conclut que sur ce qui est codé, jamais sur l’allure du dessin.",
    tags: ["quadrilatere_figure", "nature", "qcm", "template", "canvas", "codage"],
    generate: () => genQuadNature(4),
  },
  {
    kind: "template",
    id: "quadrilatere_distinguer_qcm_tpl_carre_ou_rectangle",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilatere_figure",
    microId: "quadrilatere_distinguer",
    difficulty: 5,
    theme: "neutral",
    hint: "Les deux côtés donnés sont-ils consécutifs (ils se touchent) ou opposés ?",
    tags: ["quadrilatere_figure", "distinguer", "qcm", "template", "raisonnement"],
    generate: () => genQuadDistinguer(5),
  },
];

type QuadrilatereCanvasSideLabel6e = "AB" | "BC" | "CD" | "DA";