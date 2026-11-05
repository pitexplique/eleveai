// DEMI-PLANS ET SYSTÈMES D'INÉQUATIONS À DEUX INCONNUES (05/11/2026).
// Hors programme français (registre `hors_france`) : demandé par le Sénégal (AN 4,
// secondaire), le Maroc (tronc commun), la Côte d'Ivoire (3e, 2de) et le Québec
// (ALG C14a, ALG E : polygone de contraintes, programmation linéaire).
// ⚠️ La convention écrite partout : LA ZONE HACHURÉE EST CELLE DES SOLUTIONS. Certains
// manuels hachurent l'inverse ; l'énoncé et la légende du canvas le disent donc.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { DemiPlanCanvasData, DemiPlanDroite } from "@/lib/tutor-v4/types_canvas";
import { T, court, entre, expl, fabrique, melange, pgcd, phrase, qcm, somme, un } from "../../lycee-commun";

const tpl = fabrique("seconde", "demi_plans_systemes", "2de_");

/* ───────────────── droites et inégalités ───────────────── */

type Sens = "\\leq" | "\\geq" | "<" | ">";
type Dr = { a: number; b: number; c: number };

const INVERSE: Record<Sens, Sens> = { "\\leq": "\\geq", "\\geq": "\\leq", "<": ">", ">": "<" };
const CONTRAIRE: Record<Sens, Sens> = { "\\leq": ">", "\\geq": "<", "<": "\\geq", ">": "\\leq" };
const SENS: Sens[] = ["\\leq", "\\geq", "<", ">"];
const LARGES: Sens[] = ["\\leq", "\\geq"];
const estStrict = (s: Sens) => s === "<" || s === ">";
const VERS_CANVAS: Record<Sens, "<=" | ">=" | "<" | ">"> = { "\\leq": "<=", "\\geq": ">=", "<": "<", ">": ">" };

const val = (d: Dr, x: number, y: number) => d.a * x + d.b * y + d.c;
const verifie = (d: Dr, s: Sens, x: number, y: number) => {
  const v = val(d, x, y);
  return s === "\\leq" ? v <= 0 : s === "\\geq" ? v >= 0 : s === "<" ? v < 0 : v > 0;
};

/** Une droite à coefficients entiers, qui passe par un point à coordonnées entières du repère. */
function droite(px = entre(-3, 3), py = entre(-3, 3)): Dr {
  for (;;) {
    const a = entre(-3, 3);
    const b = entre(-3, 3);
    if (!a && !b) continue;
    const c = -(a * px + b * py);
    const g = pgcd(pgcd(a, b), c) || 1;
    const s = a < 0 || (a === 0 && b < 0) ? -1 : 1;
    return { a: (s * a) / g, b: (s * b) / g, c: (s * c) / g };
  }
}
const exprG = (d: Dr) => somme([T(d.a, 1, "x"), T(d.b, 1, "y"), T(d.c, 1)]);

/** L'inégalité écrite sous une forme équivalente : canonique, constante à droite, ou y isolé. */
function ecrire(d: Dr, s: Sens, forme = un(["canon", "membres", "isole"])) {
  if (forme === "isole" && d.b !== 0 && Number.isInteger(d.a / d.b) && Number.isInteger(d.c / d.b)) {
    const sens = d.b < 0 ? INVERSE[s] : s;
    return `y ${sens} ${somme([T(-d.a / d.b, 1, "x"), T(-d.c / d.b, 1)])}`;
  }
  if (forme === "membres" && d.c !== 0) return `${somme([T(d.a, 1, "x"), T(d.b, 1, "y")])} ${s} ${-d.c}`;
  return `${exprG(d)} ${s} 0`;
}

const NOMS = ["A", "B", "C", "D", "E", "F", "M", "N", "P", "R"];
const quatreNoms = () => melange(NOMS).slice(0, 4).sort();
const couple = (x: number, y: number) => `(${x}\\,;${y})`;

/** Des points entiers d'un côté et de l'autre : aucun sur la frontière. */
function partage(test: (x: number, y: number) => boolean, surFrontiere: (x: number, y: number) => boolean, m = 5) {
  const pts: [number, number][] = [];
  for (let x = -m; x <= m; x++) for (let y = -m; y <= m; y++) if (!surFrontiere(x, y)) pts.push([x, y]);
  const m2 = melange(pts);
  return { oui: m2.filter(([x, y]) => test(x, y)), non: m2.filter(([x, y]) => !test(x, y)) };
}

/** Deux droites sécantes en un point du repère, et assez de points entiers dans la région. */
function deuxDroites(sens: Sens[]) {
  for (;;) {
    const [px, py] = [entre(-2, 2), entre(-2, 2)];
    const d1 = droite(px, py);
    const d2 = droite(px, py);
    if (d1.a * d2.b === d1.b * d2.a) continue;
    const [s1, s2] = [un(sens), un(sens)];
    const { oui, non } = partage((x, y) => verifie(d1, s1, x, y) && verifie(d2, s2, x, y), (x, y) => val(d1, x, y) === 0 || val(d2, x, y) === 0);
    if (oui.length >= 3 && non.length >= 3) return { d1, d2, s1, s2, oui, non };
  }
}

function canvas(droites: DemiPlanDroite[], extra: Partial<DemiPlanCanvasData> = {}): DemiPlanCanvasData {
  return { kind: "demi_plan", droites, ...extra };
}
const hachure = (d: Dr, s: Sens): DemiPlanDroite => ({ ...d, sens: VERS_CANVAS[s] });
const LEGENDE = "Zone hachurée : les solutions";

const explCouple = (ineq: string, x: number, y: number, ok: boolean) =>
  expl(
    "un couple $(x\\,;y)$ est solution d'une inéquation à deux inconnues si l'inégalité est vraie quand on remplace $x$ et $y$ par ses coordonnées.",
    "on remplace $x$ et $y$, on calcule, puis on regarde si l'inégalité est vraie.",
    `Dans $${ineq}$, on remplace par $x = ${x}$ et $y = ${y}$ : l'inégalité est ${ok ? "vraie" : "fausse"}.`,
    `le couple $${couple(x, y)}$ ${ok ? "est" : "n'est pas"} solution.`,
  );

/* ───────────────── contextes : une contrainte de ressource ───────────────── */

type Ctx = (p: number, q: number, B: number) => string;
const AU_PLUS: Ctx[] = [
  (p, q, B) => `Une bibliothécaire achète $x$ romans à ${p} € et $y$ bandes dessinées à ${q} €. Elle dépense au plus ${B} €.`,
  (p, q, B) => `Une ingénieure du son loue $x$ micros à ${p} € et $y$ enceintes à ${q} €. Elle dépense au plus ${B} €.`,
  (p, q, B) => `Un camion de livraison charge $x$ caisses de ${p} kg et $y$ caisses de ${q} kg. Il porte au plus ${B} kg.`,
  (p, q, B) => `Une couturière coud $x$ robes de ${p} m de tissu et $y$ vestes de ${q} m. Elle dispose au plus de ${B} m.`,
  (p, q, B) => `Un programmeur traite $x$ tickets de ${p} minutes et $y$ tickets de ${q} minutes. Il y consacre au plus ${B} minutes.`,
  (p, q, B) => `Une pharmacienne range $x$ flacons de ${p} cl et $y$ flacons de ${q} cl. Son armoire contient au plus ${B} cl.`,
  (p, q, B) => `Un cuisinier prépare $x$ plats de ${p} minutes et $y$ desserts de ${q} minutes. Il dispose au plus de ${B} minutes.`,
];
const AU_MOINS: Ctx[] = [
  (p, q, B) => `Un exercice vaut ${p} points et un problème ${q} points. Une candidate réussit $x$ exercices et $y$ problèmes, et vise au moins ${B} points.`,
  (p, q, B) => `Un agriculteur remplit $x$ sacs de ${p} kg de riz et $y$ sacs de ${q} kg de maïs. Il doit livrer au moins ${B} kg.`,
  (p, q, B) => `Une association vend $x$ repas à ${p} € et $y$ boissons à ${q} €. Elle veut récolter au moins ${B} €.`,
  (p, q, B) => `Un hôtel ouvre $x$ chambres de ${p} lits et $y$ chambres de ${q} lits. Il doit loger au moins ${B} personnes.`,
  (p, q, B) => `Une infirmière scolaire reçoit $x$ boîtes de ${p} pansements et $y$ boîtes de ${q} pansements. Il lui en faut au moins ${B}.`,
  (p, q, B) => `Une bénévole plante $x$ rangées de ${p} arbres et $y$ rangées de ${q} arbres. Elle veut planter au moins ${B} arbres.`,
];
function contexte() {
  const p = entre(2, 9);
  let q = entre(2, 9);
  while (q === p) q = entre(2, 9);
  const B = (p * q * entre(1, 3)) as number;
  const plus = Math.random() < 0.55;
  const t = un(plus ? AU_PLUS : AU_MOINS);
  return { p, q, B, plus, texte: t(p, q, B) };
}

/* ───────────────── programmation linéaire ───────────────── */

type Prog = { a: number; b: number; c: number; d: number; e: number; f: number; p: number; q: number; sommets: [number, number][]; meilleur: [number, number]; max: number; M: number };
function programme(): Prog {
  for (;;) {
    const [a, b, d, e] = [entre(1, 5), entre(1, 5), entre(1, 5), entre(1, 5)];
    const [vx, vy] = [entre(1, 6), entre(1, 6)];
    const c = a * vx + b * vy;
    const f = d * vx + e * vy;
    if (c % a || c % b || f % d || f % e) continue;
    if (!(c / b < f / e && f / d < c / a)) continue;
    const M = Math.max(c / a, f / e);
    if (M > 12) continue;
    const p = entre(1, 9);
    const q = entre(1, 9);
    const sommets: [number, number][] = [[0, 0], [f / d, 0], [vx, vy], [0, c / b]];
    const vals = sommets.map(([x, y]) => p * x + q * y);
    const max = Math.max(...vals);
    if (vals.filter((v) => v === max).length !== 1) continue;
    return { a, b, c, d, e, f, p, q, sommets, meilleur: sommets[vals.indexOf(max)], max, M };
  }
}
const ax = (a: number, b: number) => somme([T(a, 1, "x"), T(b, 1, "y")]);
const systemeProg = (g: Prog) => `\\begin{cases} x \\geq 0 \\\\ y \\geq 0 \\\\ ${ax(g.a, g.b)} \\leq ${g.c} \\\\ ${ax(g.d, g.e)} \\leq ${g.f} \\end{cases}`;
const canvasProg = (g: Prog) =>
  canvas(
    [
      { a: 1, b: 0, c: 0, sens: ">=" as const, couleur: "#64748b" },
      { a: 0, b: 1, c: 0, sens: ">=" as const, couleur: "#64748b" },
      { a: g.a, b: g.b, c: -g.c, sens: "<=" as const, nom: "d₁" },
      { a: g.d, b: g.e, c: -g.f, sens: "<=" as const, nom: "d₂" },
    ],
    { zone: "commune", xmin: -1, ymin: -1, xmax: g.M + 1, ymax: g.M + 1, legende: "Zone hachurée : le polygone des contraintes" },
  );
const ATELIERS = [
  "Un atelier fabrique $x$ tables et $y$ chaises.",
  "Une boulangerie prépare $x$ fournées de pain et $y$ fournées de brioche.",
  "Une agricultrice plante $x$ hectares de maïs et $y$ hectares de manioc.",
  "Une imprimerie tire $x$ lots d'affiches et $y$ lots de livrets.",
  "Une couturière réalise $x$ chemises et $y$ pantalons.",
  "Un studio produit $x$ courts-métrages et $y$ clips.",
  "Une coopérative conditionne $x$ palettes de café et $y$ palettes de cacao.",
  "Un menuisier assemble $x$ bureaux et $y$ étagères.",
  "Une brasserie artisanale embouteille $x$ lots de jus et $y$ lots de limonade.",
  "Une équipe de robotique monte $x$ petits robots et $y$ grands robots.",
  "Une pépinière cultive $x$ serres de tomates et $y$ serres de salades.",
  "Un laboratoire réalise $x$ séries de tests rapides et $y$ séries de tests longs.",
];
const explProg = (g: Prog) =>
  expl(
    "en programmation linéaire, le maximum d'une expression $px + qy$ sur un polygone de contraintes est atteint en un sommet du polygone.",
    "on calcule la valeur de $P$ en chaque sommet, puis on garde la plus grande.",
    `Les sommets sont ${g.sommets.map(([x, y]) => `$${couple(x, y)}$`).join(", ")}. $P$ y vaut ${g.sommets.map(([x, y]) => `$${g.p * x + g.q * y}$`).join(", ")}.`,
    `le maximum est $${g.max}$, atteint en $${couple(g.meilleur[0], g.meilleur[1])}$.`,
  );

/* ───────────────── gabarits ───────────────── */

export const demiPlansSystemesBank: TutorBankItemV4[] = [
  /* ===== demi_plan_couple_solution ===== */
  tpl("demi_plan_couple_solution", 1, 1, "Remplace x et y par les coordonnées, puis regarde si l'inégalité est vraie.", () => {
    const d = droite();
    const s = un(SENS);
    const ineq = ecrire(d, s);
    const { oui, non } = partage((x, y) => verifie(d, s, x, y), (x, y) => val(d, x, y) === 0);
    const [x, y] = oui[0];
    return qcm(
      phrase([`Lequel de ces couples est solution de $${ineq}$ ?`, `Quel couple vérifie $${ineq}$ ?`, `Parmi ces couples, lequel est solution de l'inéquation $${ineq}$ ?`, `Un seul de ces couples vérifie $${ineq}$. Lequel ?`, `On considère l'inéquation $${ineq}$. Quel couple en est solution ?`], ["", "Remplace $x$ et $y$.", "Teste chaque couple."]),
      `$${couple(x, y)}$`,
      non.slice(0, 3).map(([u, v]) => `$${couple(u, v)}$`),
      explCouple(ineq, x, y, true),
    );
  }),
  tpl("demi_plan_couple_solution", 2, 1, "Remplace x et y, puis calcule. Attention aux signes.", () => {
    const d = droite();
    const nom = un(["E", "F", "G", "K", "S", "T"]);
    const [x, y] = [entre(-5, 5), entre(-5, 5)];
    const E = exprG(d);
    const v = val(d, x, y);
    const texte = un([
      `On pose $${nom} = ${E}$. Que vaut $${nom}$ pour $x = ${x}$ et $y = ${y}$ ?`,
      `Calcule $${nom} = ${E}$ pour le couple $${couple(x, y)}$.`,
      `Quelle est la valeur de $${nom} = ${E}$ au point de coordonnées $${couple(x, y)}$ ?`,
      `Pour tester le couple $${couple(x, y)}$, on calcule $${nom} = ${E}$. Quel résultat obtient-on ?`,
    ]);
    return court(texte, v, expl("la valeur d'une expression en un point s'obtient en remplaçant $x$ et $y$ par les coordonnées du point.", "on remplace, puis on calcule en respectant les signes.", `$${d.a} \\times (${x}) + ${d.b} \\times (${y}) + ${d.c}$ vaut $${v}$.`.replace(/\+ -/g, "- "), `$${nom}$ vaut $${v}$.`));
  }),
  tpl("demi_plan_couple_solution", 3, 2, "Teste chaque couple l'un après l'autre.", () => {
    const d = droite();
    const s = un(SENS);
    const ineq = ecrire(d, s);
    const pts: [number, number][] = [];
    while (pts.length < 4) {
      const p: [number, number] = [entre(-5, 5), entre(-5, 5)];
      if (!pts.some((q) => q[0] === p[0] && q[1] === p[1])) pts.push(p);
    }
    const n = pts.filter(([x, y]) => verifie(d, s, x, y)).length;
    const liste = pts.map(([x, y]) => `$${couple(x, y)}$`).join(", ");
    return court(
      phrase([`Combien de ces couples sont solutions de $${ineq}$ : ${liste} ?`, `Parmi ${liste}, combien vérifient $${ineq}$ ?`, `On teste ${liste} dans $${ineq}$. Combien conviennent ?`, `L'inéquation est $${ineq}$. Combien de couples conviennent parmi ${liste} ?`], ["", "Réponds par un nombre.", "Une égalité ne convient que si l'inégalité est large."]),
      n,
      expl("un couple est solution si l'inégalité est vraie pour ses coordonnées.", "on remplace dans l'inégalité pour chaque couple.", pts.map(([x, y]) => `$${couple(x, y)}$ : ${verifie(d, s, x, y) ? "oui" : "non"}`).join(" ; ") + ".", `${n} couple${n > 1 ? "s conviennent" : " convient"}.`),
    );
  }),
  tpl("demi_plan_couple_solution", 4, 2, "Remplace x par sa valeur : il reste une inéquation d'inconnue y.", () => {
    let d = droite();
    while (d.b === 0) d = droite();
    const s = un(SENS);
    const ineq = ecrire(d, s);
    const k = entre(-4, 4);
    // Le sens effectif sur y : y ≤ borne si (b > 0 et ≤), etc.
    const majore = (d.b > 0) === (s === "\\leq" || s === "<");
    const candidats: number[] = [];
    for (let y = -60; y <= 60; y++) if (verifie(d, s, k, y)) candidats.push(y);
    const r = majore ? Math.max(...candidats) : Math.min(...candidats);
    const mot = majore ? "grand" : "petit";
    return court(
      un([`On fixe $x = ${k}$ dans $${ineq}$. Quel est le plus ${mot} entier $y$ qui convient ?`, `Quel est le plus ${mot} entier $y$ tel que $(${k}\\,;y)$ soit solution de $${ineq}$ ?`, `Pour $x = ${k}$, quelle est la plus ${mot === "grand" ? "grande" : "petite"} valeur entière de $y$ vérifiant $${ineq}$ ?`, `Le couple $(${k}\\,;y)$ doit vérifier $${ineq}$. Donne le plus ${mot} entier $y$ possible.`]),
      r,
      expl("quand $x$ est fixé, il reste une inéquation du premier degré en $y$.", "on remplace $x$, on isole $y$, puis on prend l'entier le plus proche qui convient.", `Pour $x = ${k}$, les entiers $y$ qui conviennent sont ${majore ? "inférieurs" : "supérieurs"} ou égaux à $${r}$.`, `le plus ${mot} entier est $${r}$.`),
    );
  }),
  tpl("demi_plan_couple_solution", 5, 3, "« Au plus » donne ≤, « au moins » donne ≥.", () => {
    const { p, q, B, plus, texte } = contexte();
    const s: Sens = plus ? "\\leq" : "\\geq";
    const juste = `$${ax(p, q)} ${s} ${B}$`;
    return qcm(
      `${texte} ${un(["Quelle inéquation traduit cette contrainte ?", "Quelle inéquation vérifient $x$ et $y$ ?", "Laquelle de ces inéquations modélise la situation ?", "Traduis cette contrainte par une inéquation.", "Quelle condition portent $x$ et $y$ ?"])}`,
      juste,
      [`$${ax(p, q)} ${INVERSE[s]} ${B}$`, `$${ax(q, p)} ${s} ${B}$`, `$${ax(1, 1)} ${s} ${B}$`, `$${ax(q, p)} ${INVERSE[s]} ${B}$`],
      expl("une contrainte de ressource s'écrit « quantité totale » comparée à une limite.", "on multiplie chaque nombre d'objets par sa valeur, on additionne, puis on compare.", `Le total vaut $${ax(p, q)}$ ; « au ${plus ? "plus" : "moins"} » donne le signe $${s}$.`, `${juste}.`),
    );
  }),
  tpl("demi_plan_couple_solution", 6, 3, "Remplace x par sa valeur, puis cherche l'entier y qui respecte la contrainte.", () => {
    const { p, q, B, plus, texte } = contexte();
    const k = entre(0, Math.floor(B / p));
    const reste = B - p * k;
    const r = plus ? Math.floor(reste / q) : Math.ceil(reste / q);
    const mot = plus ? "grande" : "petite";
    return court(
      `${texte} ${un([`On prend $x = ${k}$. Quelle est la plus ${mot} valeur entière de $y$ possible ?`, `Avec $x = ${k}$, quelle est la plus ${mot} valeur entière possible de $y$ ?`, `Si $x = ${k}$, quelle plus ${mot} valeur entière peut prendre $y$ ?`, `On fixe $x = ${k}$. Donne la plus ${mot} valeur entière de $y$ qui respecte la contrainte.`])}`,
      r,
      expl("la contrainte s'écrit $px + qy$ comparé à la limite.", "on remplace $x$, on calcule ce qu'il reste, puis on divise et on arrondit à l'entier qui respecte la contrainte.", `Il reste $${B} - ${p * k} = ${reste}$ ; $${reste} \\div ${q}$ donne l'entier $${r}$ en arrondissant ${plus ? "au-dessous" : "au-dessus"}.`, `$y = ${r}$.`),
    );
  }),

  /* ===== demi_plan_representer ===== */
  tpl("demi_plan_representer", 1, 1, "Une inégalité large contient l'égalité ; une inégalité stricte l'exclut.", () => {
    const d = droite();
    const s = un(SENS);
    const ineq = ecrire(d, s);
    const dedans = !estStrict(s);
    const juste = dedans ? "En trait plein : elle fait partie des solutions." : "En pointillés : elle ne fait pas partie des solutions.";
    return qcm(
      phrase([`Comment trace-t-on la droite frontière de $${ineq}$ ?`, `On représente $${ineq}$. Comment dessiner sa frontière ?`, `Pour représenter $${ineq}$, comment trace-t-on la frontière ?`, `Quelle est la bonne façon de tracer la frontière de $${ineq}$ ?`], ["", "Regarde le signe."]),
      juste,
      ["En trait plein : elle fait partie des solutions.", "En pointillés : elle ne fait pas partie des solutions.", "En trait plein : elle ne fait pas partie des solutions.", "En pointillés : elle fait partie des solutions."],
      expl("la frontière d'un demi-plan est la droite où les deux membres sont égaux.", "on regarde si le signe de l'inégalité permet l'égalité.", `Le signe $${s}$ ${dedans ? "permet" : "ne permet pas"} l'égalité.`, juste),
    );
  }),
  tpl("demi_plan_representer", 2, 1, "Remplace les coordonnées du point test : l'inégalité est-elle vraie ?", () => {
    const d = droite();
    const s = un(SENS);
    const ineq = ecrire(d, s);
    const { oui, non } = partage((x, y) => verifie(d, s, x, y), (x, y) => val(d, x, y) === 0, 4);
    const [x, y] = d.c !== 0 && Math.random() < 0.5 ? [0, 0] : un([oui[0], non[0]]);
    const nom = x === 0 && y === 0 ? "O" : un(NOMS);
    const ok = verifie(d, s, x, y);
    const juste = ok ? `Le côté qui contient $${nom}$` : `Le côté qui ne contient pas $${nom}$`;
    return qcm(
      phrase([`On veut hachurer les solutions de $${ineq}$. On teste le point $${nom}${couple(x, y)}$. Quel côté de la droite garde-t-on ?`, `La droite tracée est la frontière de $${ineq}$. Avec le point test $${nom}${couple(x, y)}$, quel côté faut-il hachurer ?`, `Pour représenter $${ineq}$, on essaie le point $${nom}${couple(x, y)}$. Quel demi-plan convient ?`], ["", "La zone hachurée sera celle des solutions."]),
      juste,
      [`Le côté qui contient $${nom}$`, `Le côté qui ne contient pas $${nom}$`, "Seulement la droite", "Tout le plan"],
      expl("une droite partage le plan en deux demi-plans : tous les points d'un même côté donnent le même signe.", "on remplace les coordonnées du point test dans l'inégalité.", `En $${nom}${couple(x, y)}$, l'inégalité est ${ok ? "vraie" : "fausse"}.`, `${juste.toLowerCase().replace("$" + nom.toLowerCase() + "$", `$${nom}$`)}.`),
      canvas([{ ...d, pointilles: estStrict(s) }], { points: [{ x, y, nom, test: true }] }),
    );
  }),
  tpl("demi_plan_representer", 3, 2, "Lis un point de la zone hachurée et teste-le. Regarde aussi le trait de la droite.", () => {
    const d = droite();
    const s = un(SENS);
    const f = "canon" as const;
    const juste = `$${ecrire(d, s, f)}$`;
    const pieges = [`$${ecrire(d, INVERSE[s], f)}$`, `$${ecrire(d, CONTRAIRE[s], f)}$`, `$${ecrire(d, INVERSE[CONTRAIRE[s]], f)}$`];
    return qcm(
      phrase(["La zone hachurée est l'ensemble des solutions. Quelle inéquation représente-t-elle ?", "Quelle inéquation a pour solutions la zone hachurée ?", "Le demi-plan hachuré est solution de quelle inéquation ?", "Laquelle de ces inéquations décrit le demi-plan hachuré ?", "On a hachuré les solutions d'une inéquation. Laquelle ?"], ["", "Un point test t'aide.", "Regarde le trait de la frontière.", "Teste un point de la zone."]),
      juste,
      pieges,
      expl("un demi-plan est décrit par le signe de $ax + by + c$ ; la frontière pleine correspond à une inégalité large.", "on prend un point de la zone hachurée, on calcule $ax + by + c$, puis on regarde le trait de la droite.", `La frontière est ${estStrict(s) ? "en pointillés : l'inégalité est stricte" : "en trait plein : l'inégalité est large"}, et les points hachurés rendent $${exprG(d)}$ ${s === "\\leq" || s === "<" ? "négatif" : "positif"}.`, `${juste}.`),
      canvas([hachure(d, s)], { legende: LEGENDE }),
    );
  }),
  tpl("demi_plan_representer", 4, 2, "Sers-toi de la figure pour voir de quel côté est chaque point, ou remplace ses coordonnées.", () => {
    const d = droite();
    const s = un(LARGES);
    const ineq = ecrire(d, s);
    const { oui, non } = partage((x, y) => verifie(d, s, x, y), (x, y) => val(d, x, y) === 0);
    const noms = quatreNoms();
    const places = melange([oui[0], non[0], non[1], non[2]]);
    const k = places.indexOf(oui[0]);
    return qcm(
      phrase([`Lequel de ces points est solution de $${ineq}$ ?`, `Lequel de ces points vérifie $${ineq}$ ?`, `La droite tracée a pour équation $${ecrire(d, s, "canon").replace(/\s(\\leq|\\geq)\s/, " = ")}$. Quel point est solution de $${ineq}$ ?`, `Sur la figure, quel point appartient au demi-plan $${ineq}$ ?`], ["", "Lis ses coordonnées.", "Un seul convient."]),
      `Le point $${noms[k]}$`,
      noms.filter((_, i) => i !== k).map((n) => `Le point $${n}$`),
      expl("un point est dans le demi-plan si ses coordonnées vérifient l'inégalité.", "on lit les coordonnées de chaque point, puis on les remplace dans l'inégalité.", `$${noms[k]}${couple(oui[0][0], oui[0][1])}$ vérifie $${ineq}$ ; les trois autres, non.`, `le point $${noms[k]}$ convient.`),
      canvas([d], { points: places.map(([x, y], i) => ({ x, y, nom: noms[i] })) }),
    );
  }),
  tpl("demi_plan_representer", 5, 3, "Isole y (ou x) pour voir de quel côté de la droite on se trouve.", () => {
    const d = droite();
    const s = un(SENS);
    const ineq = ecrire(d, s, un(["canon", "membres"]));
    const positif = s === "\\geq" || s === ">";
    let juste: string;
    if (d.b !== 0) juste = (d.b > 0) === positif ? "Au-dessus de la droite" : "Au-dessous de la droite";
    else juste = (d.a > 0) === positif ? "À droite de la droite" : "À gauche de la droite";
    return qcm(
      phrase([`Où sont les solutions de $${ineq}$ par rapport à sa droite frontière ?`, `De quel côté de la frontière se trouve le demi-plan $${ineq}$ ?`, `Sans point test, situe les solutions de $${ineq}$ par rapport à la frontière.`, `Le demi-plan $${ineq}$ est situé, par rapport à sa frontière :`, `On isole $y$ ou $x$ dans $${ineq}$. Où se trouvent les solutions ?`], ["", "Isole l'inconnue.", "Attention quand on divise par un négatif."]),
      juste,
      ["Au-dessus de la droite", "Au-dessous de la droite", "À droite de la droite", "À gauche de la droite"],
      expl("si on isole $y$ : $y \\geq mx + p$ est au-dessus de la droite, $y \\leq mx + p$ au-dessous ; une droite verticale sépare la gauche et la droite.", "on isole $y$ quand c'est possible ; diviser par un nombre négatif change le sens de l'inégalité.", d.b !== 0 ? `Le coefficient de $y$ vaut $${d.b}$ et le signe est $${s}$.` : `Il n'y a pas de $y$ : la frontière est verticale, et le coefficient de $x$ vaut $${d.a}$.`, `${juste.toLowerCase()}.`),
    );
  }),
  tpl("demi_plan_representer", 6, 3, "Sur l'axe des abscisses, y = 0. Sur l'axe des ordonnées, x = 0.", () => {
    const { p, q, B, plus, texte } = contexte();
    const juste = `$(${B / p}\\,;0)$ et $(0\\,;${B / q})$`;
    return qcm(
      `${texte} On trace la frontière de $${ax(p, q)} ${plus ? "\\leq" : "\\geq"} ${B}$. ${un(["En quels points coupe-t-elle les axes ?", "Quels sont ses points sur les axes ?", "Par quels points des axes passe-t-elle ?", "Où rencontre-t-elle les deux axes ?"])}`,
      juste,
      [`$(${B / q}\\,;0)$ et $(0\\,;${B / p})$`, `$(${p}\\,;0)$ et $(0\\,;${q})$`, `$(${B}\\,;0)$ et $(0\\,;${B})$`, `$(${-B / p}\\,;0)$ et $(0\\,;${-B / q})$`, `$(${B / p}\\,;0)$ et $(0\\,;${-B / q})$`],
      expl("une droite non parallèle aux axes les coupe en deux points, qui suffisent pour la tracer.", "on remplace $y$ par $0$, puis $x$ par $0$, dans l'équation de la frontière.", `$${p}x = ${B}$ donne $x = ${B / p}$ ; $${q}y = ${B}$ donne $y = ${B / q}$.`, `${juste}.`),
    );
  }),

  /* ===== demi_plan_systeme ===== */
  tpl("demi_plan_systeme", 1, 1, "Un couple solution d'un système vérifie TOUTES les inéquations.", () => {
    const { d1, d2, s1, s2, oui, non } = deuxDroites(SENS);
    const sys = `\\begin{cases} ${ecrire(d1, s1)} \\\\ ${ecrire(d2, s2)} \\end{cases}`;
    // Les pièges vérifient une des deux inéquations : ce sont les erreurs vraisemblables.
    const presque = non.filter(([x, y]) => verifie(d1, s1, x, y) !== verifie(d2, s2, x, y));
    const [x, y] = oui[0];
    return qcm(
      phrase([`Lequel de ces couples est solution du système $${sys}$ ?`, `Quel couple vérifie le système $${sys}$ ?`, `On donne le système $${sys}$. Quel couple en est solution ?`, `Parmi ces couples, un seul vérifie $${sys}$. Lequel ?`], ["", "Vérifie les deux inégalités.", "Il faut que les deux soient vraies."]),
      `$${couple(x, y)}$`,
      [...presque, ...non].slice(0, 3).map(([u, v]) => `$${couple(u, v)}$`),
      expl("un couple est solution d'un système s'il vérifie chacune de ses inéquations.", "on remplace dans la première, puis dans la seconde.", `$${couple(x, y)}$ rend les deux inégalités vraies.`, `$${couple(x, y)}$ est solution.`),
    );
  }),
  tpl("demi_plan_systeme", 2, 1, "Teste les inéquations une par une et compte celles qui sont vraies.", () => {
    const n = un([2, 3, 3]);
    const lignes = Array.from({ length: n }, () => ({ d: droite(), s: un(SENS) }));
    const [x, y] = [entre(-4, 4), entre(-4, 4)];
    const r = lignes.filter(({ d, s }) => verifie(d, s, x, y)).length;
    const sys = `\\begin{cases} ${lignes.map(({ d, s }) => ecrire(d, s)).join(" \\\\ ")} \\end{cases}`;
    return court(
      phrase([`Combien d'inéquations de $${sys}$ le couple $${couple(x, y)}$ vérifie-t-il ?`, `On teste $${couple(x, y)}$ dans $${sys}$. Combien d'inégalités sont vraies ?`, `Pour $x = ${x}$ et $y = ${y}$, combien de lignes de $${sys}$ sont vraies ?`, `Dans $${sys}$, combien d'inéquations acceptent $${couple(x, y)}$ ?`], ["", "Réponds par un nombre."]),
      r,
      expl("on teste un couple ligne par ligne.", "on remplace $x$ et $y$ dans chaque inéquation.", lignes.map(({ d, s }) => `$${ecrire(d, s, "canon")}$ : ${verifie(d, s, x, y) ? "vraie" : "fausse"}`).join(" ; ") + ".", `${r} inéquation${r > 1 ? "s sont vraies" : " est vraie"}.`),
    );
  }),
  tpl("demi_plan_systeme", 3, 2, "Prends un point de la zone hachurée et teste-le dans chaque système.", () => {
    const { d1, d2, s1, s2 } = deuxDroites(LARGES);
    const sys = (a: Sens, b: Sens) => `$\\begin{cases} ${ecrire(d1, a, "canon")} \\\\ ${ecrire(d2, b, "canon")} \\end{cases}$`;
    return qcm(
      phrase(["La zone hachurée est l'ensemble des solutions. De quel système s'agit-il ?", "Quel système a pour solutions la zone hachurée ?", "La zone hachurée représente les solutions de quel système ?", "Lequel de ces systèmes décrit la zone hachurée ?", "On a hachuré les solutions communes de deux inéquations. Quel est le système ?"], ["", "Teste un point de la zone.", "Un seul point test suffit."]),
      sys(s1, s2),
      [sys(INVERSE[s1], s2), sys(s1, INVERSE[s2]), sys(INVERSE[s1], INVERSE[s2])],
      expl("les solutions d'un système sont les points communs aux demi-plans de ses inéquations.", "on choisit un point de la zone hachurée et on le remplace dans chaque système.", "Un point de la zone doit rendre vraies les deux inégalités du bon système, et seulement celui-là.", `${sys(s1, s2)}.`),
      canvas([{ ...hachure(d1, s1), nom: "d₁" }, { ...hachure(d2, s2), nom: "d₂" }], { zone: "commune", legende: LEGENDE }),
    );
  }),
  tpl("demi_plan_systeme", 4, 2, "Un point solution vérifie les deux inéquations : il doit être du bon côté des deux droites.", () => {
    const { d1, d2, s1, s2, oui, non } = deuxDroites(LARGES);
    const sys = `\\begin{cases} ${ecrire(d1, s1)} \\\\ ${ecrire(d2, s2)} \\end{cases}`;
    const places = melange([oui[0], non[0], non[1], non[2]]);
    const k = places.indexOf(oui[0]);
    const noms = quatreNoms();
    return qcm(
      phrase([`Lequel de ces points est solution de $${sys}$ ?`, `Quel point de la figure vérifie le système $${sys}$ ?`, `Sur la figure, quel point appartient à la région $${sys}$ ?`, `Le système est $${sys}$. Quel point en est solution ?`], ["", "Lis les coordonnées.", "Un seul convient."]),
      `Le point $${noms[k]}$`,
      noms.filter((_, i) => i !== k).map((n) => `Le point $${n}$`),
      expl("un point est solution d'un système s'il vérifie toutes ses inéquations.", "on lit les coordonnées, puis on les remplace dans les deux inégalités.", `$${noms[k]}${couple(oui[0][0], oui[0][1])}$ rend les deux inégalités vraies.`, `le point $${noms[k]}$ convient.`),
      canvas([{ ...d1, nom: "d₁" }, { ...d2, nom: "d₂" }], { points: places.map(([x, y], i) => ({ x, y, nom: noms[i] })) }),
    );
  }),
  tpl("demi_plan_systeme", 5, 3, "Calcule P en chaque sommet du polygone, puis garde la plus grande valeur.", () => {
    const g = programme();
    return court(
      `${un(ATELIERS)} Les contraintes donnent $${systemeProg(g)}$. Le bénéfice, en centaines d'euros, vaut $P = ${ax(g.p, g.q)}$. ${un(["Quel est le bénéfice maximal ?", "Quelle est la valeur maximale de $P$ ?", "Quel bénéfice maximal peut-on atteindre ?", "Calcule le maximum de $P$ sur le polygone."])}`,
      g.max,
      explProg(g),
      canvasProg(g),
    );
  }),
  tpl("demi_plan_systeme", 6, 3, "Le maximum est atteint en un sommet : compare les valeurs de P aux sommets.", () => {
    const g = programme();
    const juste = `$${couple(g.meilleur[0], g.meilleur[1])}$`;
    const autres = g.sommets.filter((s) => s !== g.meilleur).map(([x, y]) => `$${couple(x, y)}$`);
    return qcm(
      `${un(ATELIERS)} Les contraintes donnent $${systemeProg(g)}$. On veut rendre maximal $P = ${ax(g.p, g.q)}$. ${un(["Quel couple $(x\\,;y)$ faut-il choisir ?", "En quel sommet $P$ est-il maximal ?", "Quel est le meilleur choix $(x\\,;y)$ ?", "Quel sommet du polygone donne le plus grand $P$ ?"])}`,
      juste,
      autres,
      explProg(g),
      canvasProg(g),
    );
  }),
];
