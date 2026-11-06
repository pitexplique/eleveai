// GÉOMÉTRIE DE POSITION DANS L'ESPACE, SANS REPÈRE (06/11/2026). Hors programme français de 2de
// (registre `hors_france`). Lignes visées : Maroc TC III-1, Sénégal 2nde AG 10, Côte d'Ivoire 2nde
// C3-L5 et 1re C3-L3. `terminale-spe/espace_position_relative` passe par les vecteurs : ici on
// raisonne sur la figure, des arêtes nommées. Le canvas est `construction` : `solide_3d` ne nomme
// pas ses sommets. Les points de l'espace sont projetés en perspective cavalière ; une arête est en
// pointillés si aucune face tournée vers l'observateur ne la contient : c'est calculé, pas saisi.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, melange, qcm, un } from "../../lycee-commun";

const tpl = fabrique("seconde", "espace_position_2de", "2de_");
const M1 = "espace_positions_relatives";
const M2 = "espace_orthogonalite_droite_plan";

/* ───────────────── géométrie ───────────────── */

type V = [number, number, number];
const sub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const nul = (a: V) => a.every((x) => Math.abs(x) < 1e-9);
const mil = (a: V, b: V): V => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];

type Sol = { t: string; nom: string; P: Record<string, V>; aretes: string[]; faces: string[] };
type RelD = "parallele" | "confondue" | "secante" | "noncop";
type RelP = "contenue" | "parallele" | "secante";

const normale = (s: Sol, pl: string) => cross(sub(s.P[pl[1]], s.P[pl[0]]), sub(s.P[pl[2]], s.P[pl[0]]));
const dansPlan = (s: Sol, x: string, pl: string) => Math.abs(dot(sub(s.P[x], s.P[pl[0]]), normale(s, pl))) < 1e-9;
const dirL = (s: Sol, l: string) => sub(s.P[l[1]], s.P[l[0]]);
const relD = (s: Sol, a: string, b: string): RelD => {
  const n = cross(dirL(s, a), dirL(s, b));
  const w = sub(s.P[b[0]], s.P[a[0]]);
  if (nul(n)) return nul(cross(w, dirL(s, a))) ? "confondue" : "parallele";
  return Math.abs(dot(n, w)) < 1e-9 ? "secante" : "noncop";
};
const relDP = (s: Sol, l: string, pl: string): RelP =>
  Math.abs(dot(dirL(s, l), normale(s, pl))) > 1e-9 ? "secante" : dansPlan(s, l[0], pl) ? "contenue" : "parallele";

/* ───────────────── solides ───────────────── */

function boite(n: string, [L, l, h]: V, t: string): Sol {
  const [A, B, C, D, E, F, G, H] = n.split("");
  return {
    t: `${t} ${n}`,
    nom: n,
    P: { [A]: [0, 0, 0], [B]: [L, 0, 0], [C]: [L, l, 0], [D]: [0, l, 0], [E]: [0, 0, h], [F]: [L, 0, h], [G]: [L, l, h], [H]: [0, l, h] },
    aretes: [A + B, B + C, C + D, D + A, E + F, F + G, G + H, H + E, A + E, B + F, C + G, D + H],
    faces: [A + B + C + D, E + F + G + H, A + B + F + E, B + C + G + F, C + D + H + G, D + A + E + H],
  };
}
const NOMS8 = ["ABCDEFGH", "ABCDEFGH", "ABCDEFGH", "EFGHKLMN", "MNPQRSTU", "KLMNPQRS"];
const cube = () => boite(un(NOMS8), [4, 4, 4], "le cube");
const pave = () => boite(un(NOMS8), [6, 4, 3], "le pavé droit");

const NOMS_PYR = ["SABCD", "SABCD", "SEFGH", "TKLMN", "SMNPQ"];
function pyramide(genre: "carre" | "para" | "reg"): Sol {
  const n = un(NOMS_PYR);
  const [S, A, B, C, D] = n.split("");
  const base = n.slice(1);
  const P: Record<string, V> =
    genre === "para"
      ? { [A]: [0, 0, 0], [B]: [5, 0, 0], [C]: [6, 4, 0], [D]: [1, 4, 0], [S]: [3, 2, 4.5] }
      : { [A]: [0, 0, 0], [B]: [4, 0, 0], [C]: [4, 4, 0], [D]: [0, 4, 0], [S]: [2, 2, 4] };
  const t =
    genre === "para" ? `la pyramide ${n}, dont la base ${base} est un parallélogramme`
    : genre === "reg" ? `la pyramide régulière ${n}, de base le carré ${base}`
    : `la pyramide ${n}, de base carrée ${base}`;
  return { t, nom: n, P, aretes: [S + A, S + B, S + C, S + D, A + B, B + C, C + D, D + A], faces: [base, S + A + B, S + B + C, S + C + D, S + D + A] };
}
function prisme(): Sol {
  const n = un(["ABCDEF", "ABCDEF", "MNPQRS", "KLMNPQ"]);
  const [A, B, C, D, E, F] = n.split("");
  return {
    t: `le prisme droit ${n}, de bases ${n.slice(0, 3)} et ${n.slice(3)}`,
    nom: n,
    P: { [A]: [0, 0, 0], [B]: [5, 0, 0], [C]: [1.5, 3, 0], [D]: [0, 0, 3.5], [E]: [5, 0, 3.5], [F]: [1.5, 3, 3.5] },
    aretes: [A + B, B + C, C + A, D + E, E + F, F + D, A + D, B + E, C + F],
    faces: [A + B + C, D + E + F, A + B + E + D, B + C + F + E, C + A + D + F],
  };
}
function tetraedre(regulier = false): Sol {
  const n = un(["ABCD", "ABCD", "SABC", "EFGH", "MNPQ"]);
  const [A, B, C, D] = n.split("");
  const r3 = Math.sqrt(3);
  return {
    t: regulier ? `le tétraèdre régulier ${n}` : `le tétraèdre ${n}`,
    nom: n,
    P: { [A]: [0, 0, 0], [B]: [4, 0, 0], [C]: [2, 2 * r3, 0], [D]: [2, (2 * r3) / 3, (4 * Math.sqrt(6)) / 3] },
    aretes: [A + B, B + C, C + A, A + D, B + D, C + D],
    faces: [A + B + C, A + B + D, B + C + D, C + A + D],
  };
}
function trirectangle(): Sol {
  const n = un(["SABC", "SABC", "OABC", "DEFG"]);
  const [S, A, B, C] = n.split("");
  return {
    t: `le tétraèdre ${n}, où les droites (${S}${A}), (${S}${B}) et (${S}${C}) sont orthogonales deux à deux`,
    nom: n,
    P: { [S]: [0, 0, 0], [A]: [4, 0, 0], [B]: [0, 3, 0], [C]: [0, 0, 4] },
    aretes: [S + A, S + B, S + C, A + B, B + C, C + A],
    faces: [S + A + B, S + B + C, S + C + A, A + B + C],
  };
}
const positions = () => un<() => Sol>([cube, cube, cube, pave, () => pyramide("carre"), () => pyramide("para"), prisme])();
const droits = () => un<() => Sol>([cube, cube, pave, prisme])();

/** Une lettre libre pour un point ajouté. */
function ajoute(s: Sol, a: string, b: string, voulue: string[]): string {
  const x = voulue.find((l) => !s.P[l]) ?? "XYZWV".split("").find((l) => !s.P[l])!;
  s.P[x] = mil(s.P[a], s.P[b]);
  return x;
}
const LIBRES = ["I", "J", "K", "L", "M", "N", "U", "V"];

/* ───────────────── figure ───────────────── */

const proj = (p: V) => ({ x: Math.round((p[0] + 0.5 * p[1]) * 100) / 100, y: Math.round((p[2] + 0.38 * p[1]) * 100) / 100 });
const VUE: V = [0.5, -1, 0.38];
function facesVues(s: Sol) {
  const noms = Object.keys(s.P).filter((k) => s.nom.includes(k));
  const g = noms.reduce<V>((a, k) => [a[0] + s.P[k][0] / noms.length, a[1] + s.P[k][1] / noms.length, a[2] + s.P[k][2] / noms.length], [0, 0, 0]);
  return s.faces.filter((f) => {
    let n = normale(s, f);
    if (dot(n, sub(s.P[f[0]], g)) < 0) n = [-n[0], -n[1], -n[2]];
    return dot(n, VUE) > 0;
  });
}
const vu = (s: Sol, l: string, vues: string[]) => vues.some((f) => dansPlan(s, l[0], f) && dansPlan(s, l[1], f));

const ROUGE = "#dc2626";
const BLEU = "#2563eb";
const FOND = "rgba(37, 99, 235, 0.13)";
function figure(s: Sol, o: { rouge?: string; bleu?: string; plan?: string } = {}): CanvasFigure {
  const vues = facesVues(s);
  const noms = Object.keys(s.P);
  const pts = noms.map((k) => ({ id: k, ...proj(s.P[k]) }));
  const segments: { a: string; b: string; pointille?: boolean; couleur?: string; epais?: boolean }[] = s.aretes.map((e) => ({ a: e[0], b: e[1], ...(vu(s, e, vues) ? {} : { pointille: true }) }));
  const plus = (l: string | undefined, couleur: string) => {
    if (l) segments.push({ a: l[0], b: l[1], couleur, epais: true, ...(vu(s, l, vues) ? {} : { pointille: true }) });
  };
  plus(o.rouge, ROUGE);
  plus(o.bleu, BLEU);
  const face = o.plan ? s.faces.find((f) => o.plan!.split("").every((c) => f.includes(c))) : undefined;
  return {
    kind: "construction",
    points: pts,
    segments,
    ...(o.plan ? { polygones: [{ sommets: (face ?? o.plan).split(""), fond: FOND, contour: "transparent" }] } : {}),
    description: `La figure en perspective : ${s.t.replace(/^l[ea] /, "")}.`,
  } as CanvasFigure;
}

/* ───────────────── tournures ───────────────── */

const qu = (s: string) => s.replace(/ \?/g, " ?").replace(/ :/g, " :");
const INTRO = ["On considère", "Soit", "On donne", "Voici", "La figure montre", "Observe"];
const ouvre = (s: Sol) => `${un(INTRO)} ${s.t}.`;
const CTX = [
  "Une architecte dessine une charpente sur son logiciel.",
  "Un maquettiste prépare un décor de film.",
  "Une ingénieure modélise une pièce d'avion.",
  "Un menuisier trace les coupes d'une pièce de bois.",
  "Une graphiste prépare un objet pour un jeu vidéo.",
  "Une tailleuse de pierre prépare un bloc.",
  "Un verrier assemble une lanterne.",
  "Une créatrice de bijoux dessine une pierre taillée.",
  "Un imprimeur 3D prépare une pièce de robot.",
  "Une scénographe construit un élément de scène.",
  "Une astronome construit le support d'un télescope.",
  "Un charpentier de La Réunion dessine la toiture d'une case.",
];
const enCtx = (s: Sol) => `${un(CTX)} Le modèle est ${s.t}.`;

const NOM_D: Record<RelD, string> = { parallele: "Parallèles", confondue: "Confondues", secante: "Sécantes", noncop: "Non coplanaires" };
const NOM_DP: Record<RelP, string> = { contenue: "Contenue dans le plan", parallele: "Parallèle au plan, sans point commun", secante: "Sécante au plan" };
const DEF_D = "deux droites de l'espace sont soit coplanaires (parallèles ou sécantes), soit non coplanaires : aucun plan ne les contient toutes les deux.";
const DEF_DP = "une droite est contenue dans un plan, parallèle à ce plan (aucun point commun) ou sécante à ce plan (un seul point commun).";

function dit(s: Sol, a: string, b: string) {
  const r = relD(s, a, b);
  if (r === "parallele") return `(${a}) et (${b}) sont dans un même plan et ne se coupent pas.`;
  if (r === "secante") {
    const c = a.split("").find((x) => b.includes(x));
    return c ? `(${a}) et (${b}) passent toutes les deux par ${c}.` : `(${a}) et (${b}) sont dans un même plan et ne sont pas parallèles.`;
  }
  return `Aucun plan ne contient à la fois (${a}) et (${b}).`;
}
function paires(s: Sol, l: string[], r: RelD) {
  const o: [string, string][] = [];
  for (const a of l) for (const b of l) if (a < b && relD(s, a, b) === r) o.push([a, b]);
  return o;
}
/** Trois lettres consécutives d'une face : un nom de plan. */
const nomPlan = (f: string) => {
  const i = entre(0, f.length - 1);
  return [0, 1, 2].map((k) => f[(i + k) % f.length]).join("");
};
const ordre = (l: string) => (Math.random() < 0.5 ? l : l[1] + l[0]);

/* ───────────────── positions relatives ───────────────── */

const Q_POS = [
  "Quelle est la position relative des droites (#) et (@) ?",
  "Comment sont les droites (#) et (@) l'une par rapport à l'autre ?",
  "Que peut-on dire des droites (#) et (@) ?",
  "Quel mot décrit les droites (#) et (@) ?",
  "Regarde les droites (#) et (@). Comment sont-elles ?",
  "Les droites (#) et (@) sont-elles parallèles, sécantes ou non coplanaires ?",
];
const positionsBank: TutorBankItemV4[] = [
  tpl(M1, 1, 1, "Deux droites qui ne se croisent pas ne sont pas forcément parallèles : sont-elles dans un même plan ?", () => {
    for (;;) {
      const s = positions();
      const r = un<RelD>(["parallele", "secante", "noncop"]);
      const l = paires(s, s.aretes, r);
      if (!l.length) continue;
      const [a0, b0] = un(l);
      const [a, b] = melange([ordre(a0), ordre(b0)]);
      return qcm(
        qu(`${ouvre(s)}\n\n${un(Q_POS).replace("#", a).replace("@", b)}`),
        NOM_D[r],
        Object.values(NOM_D),
        expl(DEF_D, "cherche un plan qui contient les deux droites, puis regarde si elles se coupent.", dit(s, a, b), `Ces droites sont : ${NOM_D[r].toLowerCase()}.`),
        figure(s, { rouge: a, bleu: b }),
      );
    }
  }),
  tpl(M1, 2, 1, "Pars de la droite donnée et suis les arêtes de la figure.", () => {
    for (;;) {
      const s = positions();
      const ref = un(s.aretes);
      const [r, mot] = un<[RelD, string]>([["parallele", "parallèle à"], ["secante", "sécante à"], ["noncop", "non coplanaire avec"]]);
      const oui = s.aretes.filter((e) => e !== ref && relD(s, e, ref) === r);
      const non = s.aretes.filter((e) => e !== ref && relD(s, e, ref) !== r);
      if (!oui.length || non.length < 3) continue;
      const j = un(oui);
      const c = (x: string) => `(${x})`;
      const debut = un(["Laquelle de ces droites est", "Parmi ces droites, laquelle est", "Quelle droite de cette liste est", "Une seule de ces droites est", "Sur la figure, quelle droite est", "Dans cette liste, quelle droite est"]);
      const f = debut === "Une seule de ces droites est" ? `${debut} ${mot} (${ref}). Laquelle ?` : `${debut} ${mot} (${ref}) ?`;
      return qcm(
        qu(`${ouvre(s)}\n\n${f}`),
        c(j),
        non.map(c),
        expl(DEF_D, "teste chaque droite de la liste.", dit(s, j, ref), `La bonne réponse est (${j}).`),
        figure(s, { rouge: ref }),
      );
    }
  }),
  tpl(M1, 3, 1, "Une droite d'une face est contenue dans le plan de cette face.", () => {
    for (;;) {
      const s = positions();
      const pl = nomPlan(un(s.faces));
      const r = un<RelP>(["contenue", "parallele", "secante"]);
      const l = s.aretes.filter((e) => relDP(s, e, pl) === r);
      if (!l.length) continue;
      const e = ordre(un(l));
      const q = un([
        `Quelle est la position de la droite (${e}) par rapport au plan (${pl}) ?`,
        `Comment la droite (${e}) est-elle placée par rapport au plan (${pl}) ?`,
        `Que peut-on dire de la droite (${e}) et du plan (${pl}) ?`,
        `Le plan (${pl}) est coloré. Quelle est la position de la droite (${e}) par rapport à ce plan ?`,
        `Regarde la droite (${e}) et le plan (${pl}). Quelle phrase est juste ?`,
      ]);
      return qcm(
        qu(`${ouvre(s)}\n\n${q}`),
        NOM_DP[r],
        [...Object.values(NOM_DP), "Confondue avec le plan"],
        expl(DEF_DP, "regarde les points communs de la droite et du plan.", r === "contenue" ? `Les points de (${e}) sont tous dans le plan (${pl}).` : r === "parallele" ? `(${e}) est parallèle à une droite du plan (${pl}), sans être dedans.` : `(${e}) traverse le plan (${pl}) en un seul point.`, `Réponse : ${NOM_DP[r].toLowerCase()}.`),
        figure(s, { rouge: e, plan: pl }),
      );
    }
  }),
  tpl(M1, 4, 1, "Compte sur la figure, arête après arête.", () => {
    const s = positions();
    const ref = ordre(un(s.aretes));
    const [r, mot] = un<[RelD, string]>([["parallele", "parallèles à"], ["secante", "sécantes à"], ["noncop", "non coplanaires avec"]]);
    const l = s.aretes.filter((e) => e !== ref && e !== ref[1] + ref[0] && relD(s, e, ref) === r);
    const q = un([
      `Combien d'arêtes de ce solide sont ${mot} (${ref}), sans compter [${ref}] ?`,
      `En laissant de côté [${ref}], combien d'arêtes de ce solide sont ${mot} (${ref}) ?`,
      `Compte les autres arêtes de ce solide qui sont ${mot} (${ref}). Combien en trouves-tu ?`,
      `Sur ce solide, combien d'arêtes autres que [${ref}] sont ${mot} (${ref}) ?`,
    ]);
    return court(
      qu(`${ouvre(s)}\n\n${q}`),
      l.length,
      expl(DEF_D, "passe en revue toutes les arêtes.", l.length ? `Ce sont : ${l.map((x) => `[${x}]`).join(", ")}.` : "Aucune arête ne convient.", `Il y en a ${l.length}.`),
      figure(s, { rouge: ref }),
    );
  }),

  /* ★2 */
  tpl(M1, 5, 2, "Une droite parallèle à une droite d'un plan, sans être dans ce plan, est parallèle à ce plan.", () => {
    for (;;) {
      const s = positions();
      const [e1, e2] = melange(s.aretes).slice(0, 2);
      const pool = LIBRES.filter((l) => !s.P[l]);
      const i = ajoute(s, e1[0], e1[1], pool);
      const j = ajoute(s, e2[0], e2[1], pool.slice(1));
      const l = i + j;
      const pl = nomPlan(un(s.faces));
      const r = relDP(s, l, pl);
      if (r === "contenue" && Math.random() < 0.5) continue;
      const q = un([
        `Quelle est la position de la droite (${l}) par rapport au plan (${pl}) ?`,
        `Comment la droite (${l}) est-elle placée par rapport au plan (${pl}) ?`,
        `Que peut-on dire de la droite (${l}) et du plan (${pl}) ?`,
        `Le plan (${pl}) est coloré. Où se trouve la droite (${l}) par rapport à lui ?`,
      ]);
      return qcm(
        qu(`${ouvre(s)} Les points ${i} et ${j} sont les milieux respectifs de [${e1}] et [${e2}].\n\n${q}`),
        NOM_DP[r],
        [...Object.values(NOM_DP), "Confondue avec le plan"],
        expl(DEF_DP, "situe chacun des deux points par rapport au plan.", `${i} et ${j} sont ${dansPlan(s, i, pl) ? `${dansPlan(s, j, pl) ? "tous deux dans le plan" : "l'un dans le plan, l'autre non"}` : dansPlan(s, j, pl) ? "l'un dans le plan, l'autre non" : "hors du plan"}.`, `Réponse : ${NOM_DP[r].toLowerCase()}.`),
        figure(s, { rouge: l, plan: pl }),
      );
    }
  }),
  tpl(M1, 6, 2, "L'intersection de deux plans sécants est une droite : cherche deux points communs.", () => {
    for (;;) {
      const s = positions();
      const dia = s.nom.length === 8 ? [s.nom[0] + s.nom[2] + s.nom[6], s.nom[1] + s.nom[3] + s.nom[7]] : [];
      const plans = [...s.faces.map(nomPlan), ...dia];
      const [p1, p2] = melange(plans).slice(0, 2);
      const lettres = Object.keys(s.P);
      const communs = lettres.filter((x) => dansPlan(s, x, p1) && dansPlan(s, x, p2));
      const paralleles = nul(cross(normale(s, p1), normale(s, p2)));
      if (paralleles && communs.length) continue;
      if (!paralleles && communs.length < 2) continue;
      const j = paralleles ? "Ils sont parallèles : aucun point commun" : `(${communs[0]}${communs[1]})`;
      const faux = s.aretes.filter((e) => !(dansPlan(s, e[0], p1) && dansPlan(s, e[1], p1) && dansPlan(s, e[0], p2) && dansPlan(s, e[1], p2))).map((e) => `(${e})`);
      const q = un([`Quelle est l'intersection des plans (${p1}) et (${p2}) ?`, `Les plans (${p1}) et (${p2}) se coupent-ils ? Si oui, selon quelle droite ?`, `Que partagent les plans (${p1}) et (${p2}) ?`, `Quelle droite est commune aux plans (${p1}) et (${p2}) ?`]);
      const f = paralleles ? melange(faux).slice(0, 3) : ["Ils sont parallèles : aucun point commun", ...melange(faux).slice(0, 3)];
      return qcm(
        qu(`${ouvre(s)}\n\n${q}`),
        j,
        f,
        expl("deux plans sont parallèles ou sécants ; s'ils sont sécants, leur intersection est une droite.", "cherche les points qui sont dans les deux plans à la fois.", paralleles ? `(${p1}) et (${p2}) sont deux faces opposées.` : `${communs[0]} et ${communs[1]} sont dans les deux plans.`, `Réponse : ${j}.`),
        figure(s),
      );
    }
  }),
  tpl(M1, 7, 2, "Trois points non alignés définissent un plan : le quatrième y est-il ?", () => {
    for (;;) {
      const s = positions();
      const nomsS = s.nom.split("");
      const [a, b, c] = melange(nomsS).slice(0, 3);
      const pl = a + b + c;
      if (nul(normale(s, pl))) continue;
      const reste = nomsS.filter((x) => !pl.includes(x));
      const oui = reste.filter((x) => dansPlan(s, x, pl));
      const non = reste.filter((x) => !dansPlan(s, x, pl));
      if (oui.length !== 1 || non.length < 2) continue;
      const q = un([
        `Lequel de ces points est dans le plan (${pl}) ?`,
        `Quel point est coplanaire avec ${a}, ${b} et ${c} ?`,
        `Parmi ces points, lequel appartient au plan (${pl}) ?`,
        `Quel point de cette liste est dans le même plan que ${a}, ${b} et ${c} ?`,
      ]);
      return qcm(
        qu(`${ouvre(s)}\n\n${q}`),
        oui[0],
        [...non, ...(non.length < 3 ? ["Aucun de ces points"] : [])],
        expl("des points sont coplanaires si un même plan les contient tous.", "cherche deux droites parallèles ou sécantes qui relient ces points.", `${oui[0]} est dans le plan défini par ${a}, ${b} et ${c}.`, `Le point est ${oui[0]}.`),
        figure(s),
      );
    }
  }),
  tpl(M1, 8, 2, "Droite des milieux : dans un triangle, elle est parallèle au troisième côté.", () => {
    for (;;) {
      const s = un<() => Sol>([() => pyramide("carre"), () => pyramide("para"), () => tetraedre(), () => tetraedre()])();
      const f = un(s.faces.filter((x) => x.length === 3));
      const [x, y, z] = melange(f.split(""));
      const pool = LIBRES.filter((l) => !s.P[l]);
      const i = ajoute(s, x, y, pool);
      const j = ajoute(s, x, z, pool.slice(1));
      const non = s.aretes.filter((e) => !nul(cross(dirL(s, e), dirL(s, y + z))));
      if (non.length < 3) continue;
      const juste = s.aretes.find((e) => e.includes(y) && e.includes(z));
      if (!juste) continue;
      const q = un([`À quelle droite la droite (${i}${j}) est-elle parallèle ?`, `Quelle arête est parallèle à (${i}${j}) ?`, `Laquelle de ces droites est parallèle à (${i}${j}) ?`, `La droite (${i}${j}) est parallèle à une de ces droites. Laquelle ?`]);
      return qcm(
        qu(`${ouvre(s)} Les points ${i} et ${j} sont les milieux respectifs de [${x}${y}] et [${x}${z}].\n\n${q}`),
        `(${juste})`,
        non.map((e) => `(${e})`),
        expl("dans un triangle, la droite qui joint les milieux de deux côtés est parallèle au troisième.", `travaille dans le triangle ${x}${y}${z}, qui est plan.`, `${i} et ${j} sont les milieux de [${x}${y}] et [${x}${z}].`, `(${i}${j}) est parallèle à (${juste}).`),
        figure(s, { rouge: i + j }),
      );
    }
  }),

  /* ★3 : le théorème du toit */
  tpl(M1, 9, 3, "Théorème du toit : deux plans sécants qui contiennent deux droites parallèles se coupent selon une droite parallèle à ces droites.", () => {
    for (;;) {
      const scen = entre(0, 3);
      let s: Sol;
      let p1: string;
      let p2: string;
      let d: string;
      let d2: string;
      let plus = "";
      if (scen === 0) {
        s = pyramide("para");
        const [S, A, B, C, D] = s.nom.split("");
        if (Math.random() < 0.5) [p1, p2, d, d2] = [S + A + B, S + C + D, A + B, C + D];
        else [p1, p2, d, d2] = [S + A + D, S + B + C, A + D, B + C];
      } else if (scen === 1) {
        s = un([cube, pave])();
        const [A, B, C, D, E, F, G, H] = s.nom.split("");
        const k = entre(0, 2);
        if (k === 0) [p1, p2, d, d2] = [A + B + G, D + C + F, A + B, D + C];
        else if (k === 1) [p1, p2, d, d2] = [A + D + G, B + C + E, A + D, B + C];
        else [p1, p2, d, d2] = [A + E + G, B + F + H, A + E, B + F];
      } else if (scen === 2) {
        s = tetraedre();
        const [A, B, C, D] = melange(s.nom.split(""));
        const pool = LIBRES.filter((l) => !s.P[l]);
        const i = ajoute(s, A, B, pool);
        const j = ajoute(s, A, C, pool.slice(1));
        plus = ` Les points ${i} et ${j} sont les milieux respectifs de [${A}${B}] et [${A}${C}].`;
        [p1, p2, d, d2] = [D + i + j, D + B + C, i + j, B + C];
      } else {
        s = prisme();
        const [A, B, C, D, E, F] = s.nom.split("");
        const k = entre(0, 2);
        if (k === 0) [p1, p2, d, d2] = [A + B + F, D + E + C, A + B, D + E];
        else if (k === 1) [p1, p2, d, d2] = [B + C + D, E + F + A, B + C, E + F];
        else [p1, p2, d, d2] = [C + A + E, F + D + B, C + A, F + D];
      }
      const dir = cross(normale(s, p1), normale(s, p2));
      const non = s.aretes.filter((e) => !nul(cross(dirL(s, e), dir)));
      const oui = s.aretes.filter((e) => nul(cross(dirL(s, e), dir)));
      if (!oui.length || non.length < 3) continue;
      const j = un(oui);
      const q = un([
        `Les plans (${p1}) et (${p2}) se coupent selon une droite Δ. À quelle droite Δ est-elle parallèle ?`,
        `La droite Δ est l'intersection des plans (${p1}) et (${p2}). Laquelle de ces droites lui est parallèle ?`,
        `On appelle Δ l'intersection des plans (${p1}) et (${p2}). Quelle droite est parallèle à Δ ?`,
        `Sans tracer Δ, l'intersection des plans (${p1}) et (${p2}), dis à quelle droite elle est parallèle.`,
      ]);
      return qcm(
        qu(`${enCtx(s)}${plus}\n\n${q}`),
        `(${j})`,
        non.map((e) => `(${e})`),
        expl("théorème du toit : si deux plans sécants contiennent deux droites parallèles, leur intersection est parallèle à ces deux droites.", `repère une droite dans chaque plan : (${d}) dans (${p1}) et (${d2}) dans (${p2}).`, `(${d}) et (${d2}) sont parallèles.`, `Δ est parallèle à (${j}).`),
        figure(s, { rouge: d, bleu: d2 }),
      );
    }
  }),
  tpl(M1, 10, 3, "Regarde bien ce que les deux droites ont en commun : une direction, ou un point ?", () => {
    const [d, d2] = un([["d", "d'"], ["a", "b"], ["f", "g"], ["m", "n"]]);
    const [P, Q] = un([["P", "Q"], ["R", "T"], ["E", "F"]]);
    const par = Math.random() < 0.5;
    const debut = un([
      `Le plan ${P} contient la droite (${d}). Le plan ${Q} contient la droite (${d2}).`,
      `La droite (${d}) est tracée dans le plan ${P}, et la droite (${d2}) dans le plan ${Q}.`,
      `On trace la droite (${d}) dans le plan ${P} et la droite (${d2}) dans le plan ${Q}.`,
      `Sur la charpente d'un toit, la poutre (${d}) est dans le pan ${P} et la poutre (${d2}) dans le pan ${Q}.`,
      `Une tente a deux pans ${P} et ${Q} : le pan ${P} contient la barre (${d}), le pan ${Q} contient la barre (${d2}).`,
    ]);
    const milieu = un([`${P} et ${Q} se coupent selon la droite Δ.`, `L'intersection de ${P} et de ${Q} est la droite Δ.`, `La droite Δ est commune à ${P} et à ${Q}.`]);
    const hypo = par ? `(${d}) et (${d2}) sont parallèles.` : `(${d}) et (${d2}) sont sécantes en un point M.`;
    const q = un(["Que peut-on dire de Δ ?", "Quelle conclusion est juste pour Δ ?", "Que sait-on de Δ ?", "Que déduit-on pour Δ ?"]);
    const PARA = `Δ est parallèle à (${d}) et à (${d2})`;
    const PASSE = "Δ passe par M";
    return qcm(
      qu(`${debut} ${milieu} ${hypo}\n\n${q}`),
      par ? PARA : PASSE,
      par ? [`Δ coupe (${d}) et (${d2})`, `Δ est perpendiculaire à (${d})`, "On ne peut rien dire de Δ", `Δ et (${d}) sont non coplanaires`] : [PARA, `Δ est perpendiculaire à (${d})`, "On ne peut rien dire de Δ"],
      par
        ? expl("théorème du toit : si deux plans sécants contiennent deux droites parallèles, leur intersection est parallèle à ces deux droites.", "vérifie les trois hypothèses : deux plans sécants, une droite dans chacun, droites parallèles.", "Les trois hypothèses sont réunies.", `${PARA}.`)
        : expl("un point commun à deux plans appartient à leur droite d'intersection.", "regarde où se trouve M.", `M est sur (${d}), donc dans ${P} ; M est sur (${d2}), donc dans ${Q}.`, `${PASSE}.`),
    );
  }),
  tpl(M1, 11, 3, "Le plan coupe deux faces qui contiennent des droites parallèles : le théorème du toit donne la direction.", () => {
    const casCube = Math.random() < 0.4;
    const s = casCube ? un([cube, pave])() : pyramide("para");
    const noms = s.nom.split("");
    const [A, B, C, D, S] = casCube ? [noms[0], noms[1], noms[2], noms[3], ""] : [noms[1], noms[2], noms[3], noms[4], noms[0]];
    const haut = casCube ? noms[6] : S;
    const hautD = casCube ? noms[7] : S;
    const pool = LIBRES.filter((l) => !s.P[l]);
    const [M, N] = pool;
    const t = un([0.4, 0.5, 0.6]);
    const pC = s.P[C];
    const pH = s.P[haut];
    s.P[M] = [pC[0] + t * (pH[0] - pC[0]), pC[1] + t * (pH[1] - pC[1]), pC[2] + t * (pH[2] - pC[2])];
    const pD = s.P[D];
    const pHd = s.P[hautD];
    s.P[N] = [pD[0] + t * (pHd[0] - pD[0]), pD[1] + t * (pHd[1] - pD[1]), pD[2] + t * (pHd[2] - pD[2])];
    const texte = `${enCtx(s)} ${M} est un point de [${C}${haut}], distinct de ses extrémités. Le plan (${A}${B}${M}) coupe [${D}${hautD}] en ${N}.`;
    const fig = figure(s, { rouge: M + N, bleu: A + B });
    (fig as { segments?: unknown[] }).segments?.push({ a: B, b: M, couleur: BLEU }, { a: A, b: N, couleur: BLEU, pointille: true });
    if (Math.random() < 0.5) {
      const justeN = casCube ? "Un rectangle" : "Un trapèze";
      return qcm(
        qu(`${texte}\n\nQuelle est la nature du quadrilatère ${A}${B}${M}${N} ?`),
        justeN,
        ["Un rectangle", "Un trapèze", "Un triangle", "Un losange", "Un carré"],
        expl("théorème du toit : le plan coupe la face en une droite parallèle à la droite commune.", `(${A}${B}) est parallèle à (${C}${D}) ; les plans (${A}${B}${M}) et (${C}${D}${haut}) se coupent selon (${M}${N}).`, `Donc (${M}${N}) est parallèle à (${A}${B}).`, casCube ? `De plus ${A}${B} = ${N}${M}, et (${A}${B}) est orthogonale à (${B}${M}) : c'est un rectangle.` : `Et ${M}${N} est plus court que ${A}${B} : c'est un trapèze.`),
        fig,
      );
    }
    const faux = s.aretes.filter((e) => !nul(cross(dirL(s, e), dirL(s, A + B)))).map((e) => `(${e})`);
    return qcm(
      qu(`${texte}\n\n${un(["À quelle droite (#) est-elle parallèle ?", "Quelle droite est parallèle à (#) ?", "Laquelle de ces droites est parallèle à (#) ?"]).replace("#", M + N)}`),
      `(${C}${D})`,
      faux,
      expl("théorème du toit : deux plans sécants qui contiennent deux droites parallèles se coupent selon une droite parallèle à celles-ci.", `(${A}${B}) est dans le plan (${A}${B}${M}), (${C}${D}) est dans la face qui contient ${M} et ${N}.`, `(${A}${B}) et (${C}${D}) sont parallèles, et (${M}${N}) est l'intersection des deux plans.`, `(${M}${N}) est parallèle à (${C}${D}).`),
      fig,
    );
  }),
];

/* ───────────────── orthogonalité ───────────────── */

type RelO = "perp" | "orth" | "para" | "ni";
const relO = (s: Sol, a: string, b: string): RelO => {
  const r = relD(s, a, b);
  if (r === "parallele" || r === "confondue") return "para";
  if (Math.abs(dot(dirL(s, a), dirL(s, b))) > 1e-9) return "ni";
  return r === "secante" ? "perp" : "orth";
};
const NOM_O: Record<RelO, string> = { perp: "Perpendiculaires", orth: "Orthogonales, sans se couper", para: "Parallèles", ni: "Ni parallèles, ni orthogonales" };
const DEF_O = "deux droites de l'espace sont orthogonales si leurs parallèles menées par un même point sont perpendiculaires. Des droites perpendiculaires sont orthogonales et sécantes.";
const DEF_T = "une droite est orthogonale à un plan si elle est orthogonale à deux droites sécantes de ce plan ; elle est alors orthogonale à toutes les droites de ce plan.";
const orthoPlan = (s: Sol, l: string, pl: string) => nul(cross(dirL(s, l), normale(s, pl)));
const perpPlans = (s: Sol, a: string, b: string) => Math.abs(dot(normale(s, a), normale(s, b))) < 1e-9;
const parPlans = (s: Sol, a: string, b: string) => nul(cross(normale(s, a), normale(s, b)));

const Q_O = [
  "Comment sont les droites (#) et (@) ?",
  "Quelle est la position des droites (#) et (@) ?",
  "Que peut-on dire des droites (#) et (@) ?",
  "Quel mot convient pour les droites (#) et (@) ?",
  "Regarde les droites (#) et (@). Quelle phrase est juste ?",
];
function diagonales(s: Sol) {
  return s.faces.filter((f) => f.length === 4).flatMap((f) => [f[0] + f[2], f[1] + f[3]]);
}
/** Tous les plans (un nom par plan) passant par trois sommets d'un solide. */
function tousPlans(s: Sol) {
  const n = s.nom.split("");
  const o: string[] = [];
  for (let i = 0; i < n.length; i++) for (let j = i + 1; j < n.length; j++) for (let k = j + 1; k < n.length; k++) {
    const pl = n[i] + n[j] + n[k];
    if (nul(normale(s, pl))) continue;
    if (!o.some((q) => pl.split("").every((x) => dansPlan(s, x, q)))) o.push(pl);
  }
  return o;
}

const orthoBank: TutorBankItemV4[] = [
  tpl(M2, 1, 1, "Orthogonales ne veut pas dire sécantes : une arête du haut peut être orthogonale à une arête du bas.", () => {
    for (;;) {
      const s = droits();
      const r = un<RelO>(["perp", "orth", "para", "ni"]);
      const l: [string, string][] = [];
      for (const a of s.aretes) for (const b of s.aretes) if (a < b && relO(s, a, b) === r) l.push([a, b]);
      if (!l.length) continue;
      const [a0, b0] = un(l);
      const [a, b] = melange([ordre(a0), ordre(b0)]);
      return qcm(
        qu(`${ouvre(s)}\n\n${un(Q_O).replace("#", a).replace("@", b)}`),
        NOM_O[r],
        Object.values(NOM_O),
        expl(DEF_O, "mène par un point de l'une une parallèle à l'autre, puis regarde l'angle.", dit(s, a, b), `Réponse : ${NOM_O[r].toLowerCase()}.`),
        figure(s, { rouge: a, bleu: b }),
      );
    }
  }),
  tpl(M2, 2, 1, "Une arête « debout » sur une face est orthogonale au plan de cette face.", () => {
    for (;;) {
      const s = droits();
      const couples: [string, string][] = [];
      for (const e of s.aretes) for (const f of s.faces) if (orthoPlan(s, e, f)) couples.push([e, f]);
      const [e, f] = un(couples);
      if (Math.random() < 0.5) {
        const pl = nomPlan(f);
        const non = s.aretes.filter((x) => !orthoPlan(s, x, pl)).map((x) => `(${x})`);
        if (non.length < 3) continue;
        const q = un([`Quelle droite est orthogonale au plan (${pl}) ?`, `Laquelle de ces droites est orthogonale au plan (${pl}) ?`, `Parmi ces droites, laquelle est orthogonale au plan (${pl}) ?`, `Le plan (${pl}) est coloré. Quelle droite lui est orthogonale ?`]);
        return qcm(qu(`${ouvre(s)}\n\n${q}`), `(${ordre(e)})`, non, expl(DEF_T, "cherche une arête perpendiculaire à deux arêtes sécantes de cette face.", `(${e}) est perpendiculaire à deux côtés de la face.`, `(${e}) est orthogonale au plan (${pl}).`), figure(s, { plan: pl }));
      }
      const non = s.faces.filter((x) => !orthoPlan(s, e, x)).map(nomPlan).map((x) => `(${x})`);
      if (non.length < 3) continue;
      const pl = nomPlan(f);
      const q = un([`À quel plan la droite (${e}) est-elle orthogonale ?`, `Quel plan est orthogonal à la droite (${e}) ?`, `La droite (${e}) est orthogonale à un de ces plans. Lequel ?`, `Parmi ces plans, lequel est orthogonal à (${e}) ?`]);
      return qcm(qu(`${ouvre(s)}\n\n${q}`), `(${pl})`, non, expl(DEF_T, "cherche la face sur laquelle cette arête est « debout ».", `(${e}) est perpendiculaire à deux côtés de la face ${f}.`, `(${e}) est orthogonale au plan (${pl}).`), figure(s, { rouge: e }));
    }
  }),
  tpl(M2, 3, 1, "Compte sur la figure, en pensant aussi aux arêtes qui ne touchent pas la droite.", () => {
    const s = droits();
    const ref = ordre(un(s.aretes));
    const autres = s.aretes.filter((e) => e !== ref && e !== ref[1] + ref[0]);
    const k = entre(0, 2);
    const [mot, l] = k === 0
      ? [`orthogonales à (${ref})`, autres.filter((e) => ["perp", "orth"].includes(relO(s, e, ref)))]
      : k === 1
        ? [`perpendiculaires à (${ref})`, autres.filter((e) => relO(s, e, ref) === "perp")]
        : [`orthogonales à (${ref}) sans la couper`, autres.filter((e) => relO(s, e, ref) === "orth")];
    const q = un([`Combien d'arêtes de ce solide sont ${mot} ?`, `Sur ce solide, combien d'arêtes sont ${mot} ?`, `Compte les arêtes de ce solide qui sont ${mot}. Combien y en a-t-il ?`, `Combien d'arêtes sont ${mot} sur ce solide ?`]);
    return court(qu(`${ouvre(s)}\n\n${q}`), l.length, expl(DEF_O, "passe en revue les arêtes une à une.", l.length ? `Ce sont : ${l.map((x) => `(${x})`).join(", ")}.` : "Aucune arête ne convient.", `Il y en a ${l.length}.`), figure(s, { rouge: ref }));
  }),
  tpl(M2, 4, 1, "Deux plans sont perpendiculaires si l'un contient une droite orthogonale à l'autre.", () => {
    for (;;) {
      const s = droits();
      const [f1, f2] = melange(s.faces).slice(0, 2);
      const a = nomPlan(f1);
      const b = nomPlan(f2);
      const j = parPlans(s, a, b) ? "Parallèles" : perpPlans(s, a, b) ? "Perpendiculaires" : "Sécants, mais pas perpendiculaires";
      if (j === "Parallèles" && Math.random() < 0.4) continue;
      const q = un([`Comment sont les plans (${a}) et (${b}) ?`, `Quelle est la position des plans (${a}) et (${b}) ?`, `Que peut-on dire des plans (${a}) et (${b}) ?`, `Quel mot convient pour les plans (${a}) et (${b}) ?`]);
      return qcm(qu(`${ouvre(s)}\n\n${q}`), j, ["Parallèles", "Perpendiculaires", "Sécants, mais pas perpendiculaires", "Confondus"], expl("deux plans sécants sont perpendiculaires si l'un contient une droite orthogonale à l'autre.", "cherche, dans l'un des plans, une droite orthogonale à l'autre.", j === "Parallèles" ? "Ce sont deux faces opposées." : j === "Perpendiculaires" ? "L'un des deux contient une arête orthogonale à l'autre." : "Aucune droite de l'un n'est orthogonale à l'autre.", `Réponse : ${j.toLowerCase()}.`), figure(s, { plan: a }));
    }
  }),

  /* ★2 */
  tpl(M2, 5, 2, "Il faut deux droites DU plan, et sécantes : deux parallèles ne suffisent pas.", () => {
    const s = un([cube, pave, cube])();
    const k = entre(0, 5);
    const f = s.faces[k];
    const debout = s.aretes.filter((e) => orthoPlan(s, e, f));
    const d = ordre(un(debout));
    const pl = nomPlan(f);
    const [a, b, c, e] = f.split("");
    const hors = s.faces[[1, 0, 4, 5, 2, 3][k]];
    const cote = (x: string, y: string) => `(${x}${y})`;
    const juste = un([`${cote(a, b)} et ${cote(b, c)}`, `${cote(b, c)} et ${cote(c, e)}`, `${cote(c, e)} et ${cote(e, a)}`, `${cote(e, a)} et ${cote(a, b)}`]);
    const faux = [
      `${cote(a, b)} et ${cote(c, e)}`,
      `${cote(b, c)} et ${cote(e, a)}`,
      `${cote(a, b)} et ${cote(hors[0], hors[1])}`,
      `${cote(b, c)} et ${cote(hors[1], hors[2])}`,
    ];
    const q = un([
      `Pour démontrer que (${d}) est orthogonale au plan (${pl}), à quelles droites suffit-il de la montrer orthogonale ?`,
      `Quel couple de droites suffit pour prouver que (${d}) est orthogonale au plan (${pl}) ?`,
      `On veut prouver que (${d}) est orthogonale au plan (${pl}). Quel couple de droites choisir ?`,
      `Quelles droites permettent de conclure que (${d}) est orthogonale au plan (${pl}) ?`,
    ]);
    return qcm(qu(`${ouvre(s)}\n\n${q}`), juste, faux, expl(DEF_T, "les deux droites doivent être dans le plan et sécantes.", `${juste} sont deux droites sécantes du plan (${pl}).`, `Le couple qui suffit est ${juste}.`), figure(s, { rouge: d, plan: pl }));
  }),
  tpl(M2, 6, 2, "Si une droite est orthogonale à un plan, elle est orthogonale à toutes les droites de ce plan.", () => {
    for (;;) {
      const s = un([cube, cube, pave])();
      const dg = diagonales(s);
      const a = un(dg);
      const b = un([...dg, ...s.aretes]);
      if (a === b) continue;
      const r = relO(s, a, b);
      if (r === "ni" && Math.random() < 0.6) continue;
      if (r === "para" && Math.random() < 0.3) continue;
      const [x, y] = melange([a, b]);
      return qcm(qu(`${ouvre(s)}\n\n${un(Q_O).replace("#", x).replace("@", y)}`), NOM_O[r], Object.values(NOM_O), expl(DEF_T, "cherche si l'une des droites est orthogonale à un plan qui contient l'autre.", dit(s, x, y), `Réponse : ${NOM_O[r].toLowerCase()}.`), figure(s, { rouge: x, bleu: y }));
    }
  }),
  tpl(M2, 7, 2, "Cherche le plan qui contient une arête orthogonale à la face donnée.", () => {
    for (;;) {
      const s = cube();
      const f = nomPlan(un(s.faces));
      const pls = tousPlans(s).filter((p) => !parPlans(s, p, f));
      const oui = pls.filter((p) => perpPlans(s, p, f));
      const non = pls.filter((p) => !perpPlans(s, p, f));
      if (oui.length < 1 || non.length < 3) continue;
      const q = un([`Lequel de ces plans est perpendiculaire au plan (${f}) ?`, `Quel plan est perpendiculaire au plan (${f}) ?`, `Parmi ces plans, lequel est perpendiculaire au plan (${f}) ?`, `Le plan (${f}) est coloré. Quel plan lui est perpendiculaire ?`]);
      const j = un(oui);
      return qcm(qu(`${ouvre(s)}\n\n${q}`), `(${j})`, non.map((p) => `(${p})`), expl("deux plans sont perpendiculaires si l'un contient une droite orthogonale à l'autre.", `cherche une arête orthogonale à (${f}).`, `Le plan (${j}) contient une droite orthogonale à (${f}).`, `(${j}) est perpendiculaire à (${f}).`), figure(s, { plan: f }));
    }
  }),
  tpl(M2, 8, 2, "L'arête est orthogonale à la face : le triangle est donc rectangle, Pythagore s'applique.", () => {
    const s = pave();
    const [A, B, C, D, E, F, G, H] = s.nom.split("");
    const espace = Math.random() < 0.5;
    let L: number, l: number, h: number, X: string;
    if (espace) {
      [L, l, h] = melange(un([[1, 2, 2], [2, 3, 6], [1, 4, 8], [4, 4, 7], [2, 6, 9], [6, 6, 7], [3, 4, 12], [2, 5, 14], [8, 9, 12], [2, 10, 11]]));
      X = un([A + G, B + H, C + E, D + F]);
    } else {
      const [p, q] = melange(un([[3, 4], [6, 8], [5, 12], [8, 15], [9, 12]]));
      const r = entre(2, 9);
      const k = entre(0, 2);
      if (k === 0) { [L, l, h] = [p, q, r]; X = un([A + C, B + D, E + G, F + H]); }
      else if (k === 1) { [L, l, h] = [p, r, q]; X = un([A + F, B + E, C + H, D + G]); }
      else { [L, l, h] = [r, p, q]; X = un([A + H, D + E, B + G, C + F]); }
    }
    const [X0, X1] = espaceP(X, s, L, l, h);
    const v = Math.sqrt(dot(sub(X1, X0), sub(X1, X0)));
    const dims = `${A}${B} = ${L} cm, ${A}${D} = ${l} cm et ${A}${E} = ${h} cm`;
    const q = un([`Quelle est la longueur ${X}, en cm ?`, `Calcule la longueur ${X}, en cm.`, `Combien mesure la longueur ${X}, en cm ?`, `Trouve la longueur ${X}, en cm.`]);
    return court(qu(`${ouvre(s)} On a ${dims}.\n\n${q}`), v, expl(DEF_T, "une arête est orthogonale à la face voisine : le triangle formé est rectangle, on applique Pythagore.", `${X}² = ${v * v}.`, `${X} = ${v} cm.`), figure(s, { rouge: X }));
  }),

  /* ★3 */
  tpl(M2, 9, 3, "Une diagonale d'un carré est perpendiculaire à l'autre diagonale, et à une arête debout.", () => {
    for (;;) {
      const s = cube();
      const pls = tousPlans(s);
      const couples: [string, string][] = [];
      for (const d of diagonales(s)) for (const p of pls) if (orthoPlan(s, d, p)) couples.push([d, p]);
      const [d, p] = un(couples);
      if (Math.random() < 0.5) {
        const non = pls.filter((x) => !orthoPlan(s, d, x));
        const q = un([`À quel plan la droite (${d}) est-elle orthogonale ?`, `Quel plan est orthogonal à la droite (${d}) ?`, `Parmi ces plans, lequel est orthogonal à (${d}) ?`, `La droite (${d}) est orthogonale à un de ces plans. Lequel ?`]);
        return qcm(qu(`${enCtx(s)}\n\n${q}`), `(${p})`, non.map((x) => `(${x})`), expl(DEF_T, `cherche deux droites sécantes du plan qui soient orthogonales à (${d}).`, `Dans le plan (${p}), l'autre diagonale de la face et une arête debout sont orthogonales à (${d}).`, `(${d}) est orthogonale au plan (${p}).`), figure(s, { rouge: d }));
      }
      const non = [...diagonales(s), ...s.aretes].filter((x) => !orthoPlan(s, x, p));
      const q = un([`Quelle droite est orthogonale au plan (${p}) ?`, `Laquelle de ces droites est orthogonale au plan (${p}) ?`, `Parmi ces droites, laquelle est orthogonale au plan (${p}) ?`]);
      return qcm(qu(`${enCtx(s)}\n\n${q}`), `(${d})`, non.map((x) => `(${x})`), expl(DEF_T, "cherche une droite orthogonale à deux droites sécantes de ce plan.", `(${d}) est perpendiculaire à l'autre diagonale de sa face, et orthogonale à l'arête debout.`, `(${d}) est orthogonale au plan (${p}).`), figure(s));
    }
  }),
  tpl(M2, 10, 3, "Dans une pyramide régulière, le sommet est à la verticale du centre du carré.", () => {
    for (;;) {
      const s = pyramide("reg");
      const [S, A, B, C, D] = s.nom.split("");
      const O = LIBRES.concat(["O"]).reverse().find((l) => !s.P[l])!;
      s.P[O] = mil(s.P[A], s.P[C]);
      s.t = `${s.t} et de centre ${O}`;
      const k = entre(0, 2);
      if (k === 0) {
        const [u, v] = un([[A + C, B], [A + C, D], [B + D, A], [B + D, C]]);
        const j = `(${S}${v})`;
        const non = s.aretes.filter((e) => Math.abs(dot(dirL(s, e), dirL(s, u))) > 1e-9).map((e) => `(${e})`);
        const q = un([`Quelle droite est orthogonale à (${u}) ?`, `Laquelle de ces droites est orthogonale à (${u}) ?`, `Parmi ces droites, laquelle est orthogonale à (${u}) ?`]);
        return qcm(qu(`${enCtx(s)}\n\n${q}`), j, non, expl(DEF_T, `(${u}) est orthogonale à une diagonale du carré et à (${S}${O}), donc à un plan.`, `Ce plan contient ${j}.`, `(${u}) et ${j} sont orthogonales.`), figure(s, { rouge: u, bleu: S + O }));
      }
      if (k === 1) {
        const [u, pl] = un([[A + C, S + B + D], [B + D, S + A + C]]);
        const non = [S + A + B, S + B + C, S + C + D, S + D + A, A + B + C].map((x) => `(${x})`);
        const q = un([`À quel plan la droite (${u}) est-elle orthogonale ?`, `Quel plan est orthogonal à la droite (${u}) ?`, `Parmi ces plans, lequel est orthogonal à (${u}) ?`]);
        return qcm(qu(`${enCtx(s)}\n\n${q}`), `(${pl})`, non, expl(DEF_T, "cherche deux droites sécantes orthogonales à celle-ci.", `(${u}) est perpendiculaire à l'autre diagonale, et orthogonale à (${S}${O}).`, `(${u}) est orthogonale au plan (${pl}).`), figure(s, { rouge: u, bleu: S + O }));
      }
      const u = S + O;
      const non = [S + A + B, S + B + C, S + A + C, S + B + D].map((x) => `(${x})`);
      const q = un([`À quel plan la droite (${u}) est-elle orthogonale ?`, `Quel plan est orthogonal à la droite (${u}) ?`, `Parmi ces plans, lequel est orthogonal à (${u}) ?`]);
      return qcm(qu(`${enCtx(s)}\n\n${q}`), `(${A}${B}${C})`, non, expl(DEF_T, "le sommet d'une pyramide régulière se projette sur le centre de la base.", `(${u}) est la hauteur de la pyramide.`, `(${u}) est orthogonale au plan (${A}${B}${C}).`), figure(s, { rouge: u }));
    }
  }),
  tpl(M2, 11, 3, "Une droite orthogonale à deux droites sécantes d'un plan est orthogonale à toutes celles du plan.", () => {
    if (Math.random() < 0.5) {
      const s = trirectangle();
      const [S, A, B, C] = melangeSommet(s.nom);
      if (Math.random() < 0.5) {
        const non = [S + A + B, S + A + C, A + B + C].map((x) => `(${x})`);
        const q = un([`À quel plan la droite (${S}${A}) est-elle orthogonale ?`, `Quel plan est orthogonal à (${S}${A}) ?`, `Parmi ces plans, lequel est orthogonal à (${S}${A}) ?`]);
        return qcm(qu(`${enCtx(s)}\n\n${q}`), `(${S}${B}${C})`, non, expl(DEF_T, "repère deux droites sécantes orthogonales à celle-ci.", `(${S}${A}) est orthogonale à (${S}${B}) et à (${S}${C}), sécantes en ${S}.`, `(${S}${A}) est orthogonale au plan (${S}${B}${C}).`), figure(s, { rouge: S + A }));
      }
      const non = [A + B, A + C, S + B, S + C].map((x) => `(${x})`);
      const q = un([`Quelle droite est orthogonale à (${B}${C}) ?`, `Laquelle de ces droites est orthogonale à (${B}${C}) ?`, `Parmi ces droites, laquelle est orthogonale à (${B}${C}) ?`]);
      return qcm(qu(`${enCtx(s)}\n\n${q}`), `(${S}${A})`, non, expl(DEF_T, `(${S}${A}) est orthogonale à un plan qui contient (${B}${C}).`, `(${S}${A}) est orthogonale à (${S}${B}) et à (${S}${C}), donc au plan (${S}${B}${C}).`, `(${S}${A}) est orthogonale à (${B}${C}).`), figure(s, { rouge: B + C }));
    }
    const s = tetraedre(true);
    const [A, B, C, D] = melange(s.nom.split(""));
    const I = LIBRES.find((l) => !s.P[l])!;
    s.P[I] = mil(s.P[A], s.P[B]);
    s.t = `${s.t}, où ${I} est le milieu de [${A}${B}]`;
    const fig = figure(s, { rouge: A + B, bleu: C + D });
    const vues = facesVues(s);
    (fig as { segments?: unknown[] }).segments?.push({ a: C, b: I, couleur: BLEU, ...(vu(s, C + I, vues) ? {} : { pointille: true }) }, { a: D, b: I, couleur: BLEU, ...(vu(s, D + I, vues) ? {} : { pointille: true }) });
    if (Math.random() < 0.5) {
      const non = [A + C + D, B + C + D, A + B + C, A + B + D].map((x) => `(${x})`);
      const q = un([`À quel plan la droite (${A}${B}) est-elle orthogonale ?`, `Quel plan est orthogonal à (${A}${B}) ?`, `Parmi ces plans, lequel est orthogonal à (${A}${B}) ?`]);
      return qcm(qu(`${enCtx(s)}\n\n${q}`), `(${C}${D}${I})`, non, expl(DEF_T, `les triangles ${A}${B}${C} et ${A}${B}${D} sont équilatéraux : leurs médianes sont aussi des hauteurs.`, `(${A}${B}) est perpendiculaire à (${C}${I}) et à (${D}${I}).`, `(${A}${B}) est orthogonale au plan (${C}${D}${I}).`), fig);
    }
    const non = [A + C, A + D, B + C, B + D].map((x) => `(${x})`);
    const q = un([`Quelle droite est orthogonale à (${A}${B}) ?`, `Laquelle de ces droites est orthogonale à (${A}${B}) ?`, `Parmi ces droites, laquelle est orthogonale à (${A}${B}) ?`]);
    return qcm(qu(`${enCtx(s)}\n\n${q}`), `(${C}${D})`, non, expl(DEF_T, `(${A}${B}) est orthogonale au plan (${C}${D}${I}).`, `Ce plan contient (${C}${D}).`, `(${A}${B}) et (${C}${D}) sont orthogonales.`), fig);
  }),
  tpl(M2, 12, 3, "Pour qu'un poteau soit droit, il faut l'angle droit dans deux directions qui se croisent.", () => {
    const [qui, obj] = un([
      ["Un maçon", "un poteau"], ["Une charpentière", "un mât"], ["Un technicien", "un mât d'antenne"], ["Une régisseuse", "un pied de projecteur"],
      ["Un jardinier", "un tuteur"], ["Une installatrice", "le support d'un panneau solaire"], ["Un marin", "le mât d'un voilier"], ["Une arbitre", "un poteau de but"],
      ["Un électricien", "un lampadaire"], ["Une géomètre", "un jalon de visée"], ["Un ingénieur du son", "un pied de micro"], ["Une entraîneuse", "un piquet de slalom"],
    ]);
    const cas = un(["secantes", "secantes", "paralleles", "seule"]);
    const test = cas === "secantes" ? "deux droites sécantes du sol" : cas === "paralleles" ? "deux droites parallèles du sol" : "une seule droite du sol";
    const dit2 = `${qui} dresse ${obj} et vérifie à l'équerre qu'il fait un angle droit avec ${test}.`;
    const q = un(["Peut-on conclure qu'il est orthogonal au sol ?", "Cela prouve-t-il qu'il est orthogonal au sol ?", "Est-il certain qu'il est orthogonal au sol ?", "Ce contrôle suffit-il pour affirmer qu'il est orthogonal au sol ?"]);
    const OUI = "Oui : deux droites sécantes du plan suffisent";
    const PAR = "Non : ces deux droites parallèles ont la même direction";
    const SEUL = "Non : une seule droite ne suffit pas";
    const j = cas === "secantes" ? OUI : cas === "paralleles" ? PAR : SEUL;
    return qcm(qu(`${dit2}\n\n${q}`), j, [OUI, PAR, SEUL, "Oui : une seule droite du plan suffit", "Non : il faudrait trois droites sécantes"], expl(DEF_T, "il faut deux droites du plan, et sécantes.", cas === "secantes" ? "Les deux droites sont sécantes." : cas === "paralleles" ? "Deux parallèles ne donnent qu'une direction." : "Une seule droite ne donne qu'une direction.", `${j}.`));
  }),
  tpl(M2, 13, 3, "Le mât est orthogonal au sol, donc à toutes les droites du sol : le triangle est rectangle.", () => {
    const [nom, attache] = un([
      ["Un mât de voilier", "un hauban"], ["Un mât d'antenne", "un câble"], ["Un lampadaire", "un câble de maintien"], ["Un pylône", "un hauban"],
      ["Un poteau de tente de cirque", "un cordage"], ["Un mât de drapeau", "un filin"], ["Un poteau électrique", "un câble"], ["Un mât d'éolienne de chantier", "un hauban"],
    ]);
    const k = un([1, 1, 2]);
    const [a, b, c] = un([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [7, 24, 25], [9, 12, 15]]).map((x) => x * k);
    const [h, d] = Math.random() < 0.5 ? [a, b] : [b, a];
    const cher = un(["c", "c", "d", "h"]);
    const base = `est vertical : il est orthogonal au sol horizontal.`;
    const donne = cher === "c" ? `Il est haut de ${h} m. ${cap(attache)} va de son sommet à un point du sol situé à ${d} m de son pied.`
      : cher === "d" ? `Il est haut de ${h} m. ${cap(attache)} long de ${c} m va de son sommet à un point du sol.`
      : `${cap(attache)} long de ${c} m va de son sommet à un point du sol situé à ${d} m de son pied.`;
    const q = cher === "c" ? `Quelle est la longueur de ce fil tendu, en m ?` : cher === "d" ? `À quelle distance de son pied est ce point, en m ?` : `Quelle est sa hauteur, en m ?`;
    const v = cher === "c" ? c : cher === "d" ? d : h;
    const fig: CanvasFigure = {
      kind: "construction",
      points: [{ id: "H", x: 0, y: h, cache: true }, { id: "P", x: 0, y: 0, cache: true }, { id: "S", x: d, y: 0, cache: true }],
      segments: [
        { a: "P", b: "H", epais: true, texte: cher === "h" ? "?" : `${h} m` },
        { a: "P", b: "S", texte: cher === "d" ? "?" : `${d} m` },
        { a: "H", b: "S", couleur: BLEU, texte: cher === "c" ? "?" : `${c} m` },
      ],
      angles: [{ sommet: "P", de: "H", vers: "S", droit: true }],
      description: "Le triangle formé par la hauteur, le sol et le fil tendu.",
    } as CanvasFigure;
    return court(qu(`${nom} ${base} ${donne}\n\n${q}`), v, expl(DEF_T, "orthogonal au sol, il est orthogonal à la droite du sol qui part de son pied : le triangle est rectangle, on applique Pythagore.", `${c}² = ${h}² + ${d}².`, `La réponse est ${v} m.`), fig);
  }),
];

function melangeSommet(n: string) {
  const [S, ...r] = n.split("");
  return [S, ...melange(r)];
}
function espaceP(X: string, s: Sol, L: number, l: number, h: number): [V, V] {
  const [A, B, C, D, E, F, G, H] = s.nom.split("");
  const Q: Record<string, V> = { [A]: [0, 0, 0], [B]: [L, 0, 0], [C]: [L, l, 0], [D]: [0, l, 0], [E]: [0, 0, h], [F]: [L, 0, h], [G]: [L, l, h], [H]: [0, l, h] };
  return [Q[X[0]], Q[X[1]]];
}
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export const espacePositionBank: TutorBankItemV4[] = [...positionsBank, ...orthoBank];
