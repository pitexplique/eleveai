// PARITÉ D'UNE FONCTION QUELCONQUE (05/11/2026). Au programme français de 1re spé 2026 (« Représentation
// algébrique et graphique de fonctions paires, impaires. Traduction géométrique. ») : NON masquée.
// Lignes visées : Maroc TC IV-2, Belgique, Sénégal 2nde AN 3, Côte d'Ivoire 1re C1-L3.
// Canvas `fonctionGraphique` : la courbe tracée est relue par le correcteur, jamais la réponse.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { T, court, entre, expl, fabrique, melange, phrase, qcm, somme, un } from "../../lycee-commun";

const tpl = fabrique("premiere-spe", "variations_fonctions", "1s_");
const M = "var_parite";

const PAIRE = "Paire";
const IMPAIRE = "Impaire";
const NI = "Ni paire ni impaire";
const LES_DEUX = "Paire et impaire à la fois";
const REPONSES = [PAIRE, IMPAIRE, NI, LES_DEUX];
const DEF = "$f$ est paire si $f(-x) = f(x)$ pour tout $x$ de son ensemble de définition, impaire si $f(-x) = -f(x)$ ; cet ensemble doit être symétrique par rapport à 0.";
const GEO = "La courbe d'une fonction paire est symétrique par rapport à l'axe des ordonnées ; celle d'une fonction impaire est symétrique par rapport à l'origine.";

const nom = () => un(["f", "g", "h", "k", "u", "v"]);
const nz = (a: number, b: number) => {
  for (;;) {
    const v = entre(a, b);
    if (v) return v;
  }
};
const monome = (c: number, e: number) => T(c, 1, e === 0 ? "" : e === 1 ? "x" : `x^{${e}}`);
const poly = (l: readonly (readonly [number, number])[]) => somme(l.map(([c, e]) => monome(c, e)));

/** Un polynôme d'un genre donné : exposants pairs seuls, impairs seuls, ou mélangés. */
function polyDeGenre(genre: "paire" | "impaire" | "ni") {
  const pairs = melange([0, 2, 4, 6]);
  const impairs = melange([1, 3, 5]);
  const c = () => nz(-7, 7);
  if (genre === "paire") return [[c(), pairs[0]], [c(), pairs[1]]] as const;
  if (genre === "impaire") return [[c(), impairs[0]], [c(), impairs[1]]] as const;
  return [[c(), impairs[0]], [c(), pairs[0]]] as const;
}
const tirerGenre = () => un(["paire", "impaire", "ni"] as const);
const nomGenre = { paire: PAIRE, impaire: IMPAIRE, ni: NI };

const Q_GENRE = (e: string) => [
  `Quelle est la parité de ${e} ?`,
  `Que peut-on dire de la parité de ${e} ?`,
  `Étudie la parité de ${e}.`,
  `Comment qualifier ${e} ?`,
  `${e.charAt(0).toUpperCase()}${e.slice(1)} est-elle paire, impaire, ou rien de cela ?`,
  `En calculant l'image de $-x$, que dire de ${e} ?`,
  `Quelle propriété de symétrie a ${e} ?`,
];

/* ───────────────── fractions et racines : expression + genre, relu par le correcteur ───────────────── */

function fractionDeGenre(genre: "paire" | "impaire" | "ni"): string {
  const a = entre(1, 9);
  const b = a + entre(1, 5);
  const c = un([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
  const paires = [`\\dfrac{${c}}{x^{2} + ${a}}`, `\\dfrac{x^{2} + ${b}}{x^{2} + ${a}}`, `\\sqrt{x^{2} + ${a}}`, `\\dfrac{${c}}{x^{4} + ${a}}`, `\\dfrac{x^{4}}{x^{2} + ${a}}`];
  const impaires = [`\\dfrac{${c}x}{x^{2} + ${a}}`, `\\dfrac{x^{3}}{x^{2} + ${a}}`, `\\dfrac{x^{2} + ${a}}{x}`, `x\\sqrt{x^{2} + ${a}}`, `\\dfrac{${c}}{x}`];
  const nis = [`\\dfrac{${c}}{x + ${a}}`, `\\dfrac{x + ${b}}{x^{2} + ${a}}`, `\\sqrt{x^{2} + ${a}} + x`, `\\dfrac{x^{2}}{x - ${a}}`, `\\dfrac{${c}}{x^{2} + ${a}} + x`];
  return un(genre === "paire" ? paires : genre === "impaire" ? impaires : nis);
}

/* ───────────────── courbes ───────────────── */

type Pt = { x: number; y: number };
/** Une courbe en ligne brisée sur [-5 ; 5], à sommets entiers, du genre voulu. */
function courbe(genre: "paire" | "impaire" | "ni"): Pt[] {
  for (;;) {
    const xs = [1, 2, 3, 4, 5].filter(() => Math.random() < 0.7);
    if (xs.length < 3 || !xs.includes(5)) continue;
    const droite = xs.map((x) => ({ x, y: entre(-4, 4) }));
    if (droite.every((p) => p.y === droite[0].y) || droite.some((p, i) => i > 0 && p.y === droite[i - 1].y)) continue;
    if (genre === "paire") {
      const y0 = entre(-3, 3);
      return [...[...droite].reverse().map((p) => ({ x: -p.x, y: p.y })), { x: 0, y: y0 }, ...droite];
    }
    if (genre === "impaire") return [...[...droite].reverse().map((p) => ({ x: -p.x, y: -p.y })), { x: 0, y: 0 }, ...droite];
    // Ni l'une ni l'autre : on casse la symétrie à gauche, sans la rendre symétrique autrement.
    const gauche = [...droite].reverse().map((p) => ({ x: -p.x, y: un([-1, 1]) * p.y + un([1, 2, -1, -2]) }));
    const l = [...gauche.map((p) => ({ x: p.x, y: Math.max(-5, Math.min(5, p.y)) })), { x: 0, y: entre(-3, 3) }, ...droite];
    const estPaire = droite.every((p) => l.some((q) => q.x === -p.x && q.y === p.y));
    const estImpaire = droite.every((p) => l.some((q) => q.x === -p.x && q.y === -p.y));
    if (!estPaire && !estImpaire) return l;
  }
}
function figure(pts: Pt[]): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    size: { width: 340, height: 300 },
    xmin: -6,
    xmax: 6,
    ymin: -6,
    ymax: 6,
    grille: true,
    courbes: [{ id: "f", type: "points", couleur: "#2563eb", points: pts }],
  } as CanvasFigure;
}

/* ───────────────── contextes ───────────────── */

const SYMETRIQUES: ((n: string, e: string) => string)[] = [
  (n, e) => `Le profil d'une arche de pont est modélisé par $${n}(x) = ${e}$, où $x$ est la distance au milieu de l'arche, en mètres.`,
  (n, e) => `La coupe d'une piste de skate en U suit la courbe $${n}(x) = ${e}$, l'axe des ordonnées passant par le fond de la piste.`,
  (n, e) => `Le miroir d'un télescope a pour profil $${n}(x) = ${e}$, où $x$ est la distance au centre du miroir.`,
  (n, e) => `Une architecte dessine une voûte d'équation $y = ${n}(x)$ avec $${n}(x) = ${e}$, l'origine étant au milieu de la voûte.`,
  (n, e) => `La coupe d'une antenne parabolique est donnée par $${n}(x) = ${e}$, où $x$ est mesuré depuis l'axe de l'antenne.`,
  (n, e) => `Un câble de téléphérique suspendu entre deux pylônes suit la courbe $${n}(x) = ${e}$, avec $x = 0$ au milieu des pylônes.`,
  (n, e) => `Dans un studio de danse, un projecteur éclaire selon le profil $${n}(x) = ${e}$, où $x$ est l'écart au centre de la scène.`,
];
const SIGNAUX: ((n: string, e: string) => string)[] = [
  (n, e) => `Un signal sonore est modélisé par $${n}(t) = ${e}$, le temps $t$ étant compté depuis le milieu de l'enregistrement.`,
  (n, e) => `Un sismographe enregistre un écart $${n}(t) = ${e}$ autour de l'instant $t = 0$ de la secousse.`,
  (n, e) => `Le balancement d'une passerelle est décrit par $${n}(t) = ${e}$, avec $t = 0$ quand elle passe à sa position d'équilibre.`,
  (n, e) => `Un capteur de musique mesure une onde $${n}(t) = ${e}$, l'origine des temps étant au milieu de la note.`,
  (n, e) => `Dans un laboratoire, une tension suit $${n}(t) = ${e}$ de part et d'autre de l'instant $t = 0$.`,
  (n, e) => `Le ressort d'un amortisseur de vélo s'écarte de $${n}(t) = ${e}$ de part et d'autre de sa position de repos à $t = 0$.`,
];

export const pariteBank: TutorBankItemV4[] = [
  /* ★1 */
  tpl(M, 1, 1, "Remplace chaque x par (−x) : une puissance paire garde son signe, une impaire le change.", () => {
    const n = nom();
    const l = polyDeGenre(tirerGenre());
    const opp = l.map(([c, e]) => [e % 2 ? -c : c, e] as const);
    const juste = `$${poly(opp)}$`;
    return qcm(
      phrase([`Soit $${n}(x) = ${poly(l)}$.`, `On donne $${n}(x) = ${poly(l)}$.`, `La fonction $${n}$ est définie sur $\\mathbb{R}$ par $${n}(x) = ${poly(l)}$.`, `Pour tout réel $x$, $${n}(x) = ${poly(l)}$.`], [`Que vaut $${n}(-x)$ ?`, `Quelle est l'expression de $${n}(-x)$ ?`, `Exprime $${n}(-x)$.`, `À quoi est égal $${n}(-x)$ ?`, `Laquelle de ces écritures est égale à $${n}(-x)$ ?`]),
      juste,
      [`$${poly(l)}$`, `$${poly(l.map(([c, e]) => [-c, e] as const))}$`, `$${poly(l.map(([c, e]) => [e % 2 ? c : -c, e] as const))}$`, `$${poly(l.map(([c, e]) => [c, e + 1] as const))}$`, `$${poly(l.map(([c, e]) => [-c, e + 1] as const))}$`, `$${poly(l.map(([c, e]) => [c + 1, e] as const))}$`],
      expl(DEF, `On remplace $x$ par $-x$ ; $(-x)^{n}$ vaut $x^{n}$ si $n$ est pair, $-x^{n}$ si $n$ est impair.`, `On obtient ${juste}.`, `$${n}(-x)$ s'écrit ${juste}.`),
    );
  }),
  tpl(M, 2, 1, "Regarde les exposants : tous pairs, tous impairs, ou mélangés ?", () => {
    const n = nom();
    const g = tirerGenre();
    const l = polyDeGenre(g);
    return qcm(
      `${un([`Soit $${n}(x) = ${poly(l)}$ sur $\\mathbb{R}$.`, `On considère $${n}(x) = ${poly(l)}$, définie sur $\\mathbb{R}$.`, `La fonction $${n}$ est définie sur $\\mathbb{R}$ par $${n}(x) = ${poly(l)}$.`])} ${un(Q_GENRE(`la fonction $${n}$`))}`,
      nomGenre[g],
      REPONSES,
      expl(DEF, `On calcule $${n}(-x)$ et on compare à $${n}(x)$ et à $-${n}(x)$.`, `$${n}(-x) = ${poly(l.map(([c, e]) => [e % 2 ? -c : c, e] as const))}$.`, `Réponse : ${nomGenre[g].toLowerCase()}.`),
    );
  }),
  tpl(M, 3, 1, "Paire : même image. Impaire : image opposée.", () => {
    const n = nom();
    const g = un(["paire", "impaire"] as const);
    const a = entre(1, 12);
    const b = nz(-15, 15);
    const v = g === "paire" ? b : -b;
    return court(
      phrase([`La fonction $${n}$ est ${g} et $${n}(${a}) = ${b}$.`, `On sait que $${n}$ est ${g}, avec $${n}(${a}) = ${b}$.`, `Soit $${n}$ une fonction ${g} telle que $${n}(${a}) = ${b}$.`, `Une fonction $${n}$ ${g} vérifie $${n}(${a}) = ${b}$.`], [`Que vaut $${n}(-${a})$ ?`, `Calcule $${n}(-${a})$.`, `Donne $${n}(-${a})$.`, `Déduis-en $${n}(-${a})$.`, `Quelle est l'image de $-${a}$ ?`]),
      v,
      expl(DEF, `Ici, $${n}(-x) = ${g === "paire" ? "" : "-"}${n}(x)$.`, `$${n}(-${a}) = ${g === "paire" ? "" : "-"}${n}(${a})$.`, `$${n}(-${a}) = ${v}$.`),
    );
  }),
  tpl(M, 4, 1, "Paire : symétrie par rapport à l'axe des ordonnées. Impaire : par rapport à l'origine.", () => {
    const n = nom();
    const g = un(["paire", "impaire"] as const);
    const AXE = "L'axe des ordonnées";
    const ORI = "L'origine du repère";
    return qcm(
      phrase([`La fonction $${n}$ est ${g}.`, `On sait que $${n}$ est une fonction ${g}.`, `Soit $${n}$ une fonction ${g}.`, `Une fonction $${n}$ est ${g} sur $\\mathbb{R}$.`, `Sur $\\mathbb{R}$, la fonction $${n}$ est ${g}.`], ["Par rapport à quoi sa courbe est-elle symétrique ?", "Quel est l'élément de symétrie de sa courbe ?", "Quelle symétrie laisse sa courbe en place ?", "Sa courbe est symétrique par rapport à quoi ?", "Quelle est la traduction graphique de cette propriété ?"]),
      g === "paire" ? AXE : ORI,
      [AXE, ORI, "L'axe des abscisses", "La droite d'équation $y = x$"],
      expl(GEO, `On regarde le point de la courbe d'abscisse $-x$.`, `Son ordonnée est ${g === "paire" ? "la même" : "l'opposée"}.`, `Symétrie par rapport à ${g === "paire" ? "l'axe des ordonnées" : "l'origine"}.`),
    );
  }),
  /* ★2 */
  tpl(M, 5, 2, "Calcule f(−x) dans la fraction ou la racine, puis compare à f(x).", () => {
    const n = nom();
    const g = tirerGenre();
    const e = fractionDeGenre(g);
    return qcm(
      `${un([`Soit $${n}(x) = ${e}$.`, `On considère $${n}(x) = ${e}$.`, `La fonction $${n}$ est définie par $${n}(x) = ${e}$.`, `Pour les réels où elle existe, $${n}(x) = ${e}$.`])} ${un(Q_GENRE(`la fonction $${n}$`))}`,
      nomGenre[g],
      REPONSES,
      expl(DEF, `On remplace $x$ par $-x$ partout ; il faut aussi que l'ensemble de définition soit symétrique.`, `On compare $${n}(-x)$ à $${n}(x)$ et à $-${n}(x)$.`, `Réponse : ${nomGenre[g].toLowerCase()}.`),
    );
  }),
  tpl(M, 6, 2, "Prends un point de la courbe et cherche son symétrique.", () => {
    const n = nom();
    const g = tirerGenre();
    return qcm(
      `${un([`Voici la courbe d'une fonction $${n}$ sur $[-5\\,;5]$.`, `La courbe ci-contre représente $${n}$ sur $[-5\\,;5]$.`, `On a tracé la fonction $${n}$ sur $[-5\\,;5]$.`, `Observe la courbe de $${n}$, définie sur $[-5\\,;5]$.`])} ${un(["Que dire de sa parité ?", `Quelle est la parité de $${n}$ ?`, "Quelle symétrie as-tu repérée, et donc quelle parité ?", `D'après sa courbe, comment est $${n}$ ?`, `Sans formule, $${n}$ est-elle paire, impaire, ou rien de cela ?`])}`,
      nomGenre[g],
      REPONSES,
      expl(GEO, `On compare les points d'abscisses $x$ et $-x$.`, `Les ordonnées sont ${g === "paire" ? "égales" : g === "impaire" ? "opposées" : "ni toujours égales, ni toujours opposées"}.`, `Réponse : ${nomGenre[g].toLowerCase()}.`),
      figure(courbe(g)),
    );
  }),
  tpl(M, 7, 2, "Avant de calculer f(−x), regarde si l'ensemble de définition est symétrique.", () => {
    const n = nom();
    const a = nz(-9, 9);
    const e = un([`\\dfrac{1}{x - ${Math.abs(a)}}`, `\\dfrac{x^{2}}{x + ${Math.abs(a)}}`, `\\dfrac{x}{x - ${Math.abs(a)}}`, `\\sqrt{x + ${Math.abs(a)}}`, `\\sqrt{x}`]);
    return qcm(
      `${un([`Soit $${n}(x) = ${e}$, sur son ensemble de définition.`, `La fonction $${n}$ est définie là où c'est possible par $${n}(x) = ${e}$.`, `On étudie $${n}(x) = ${e}$ sur son ensemble de définition.`])} ${un(["Quelle est sa parité ?", `Comment qualifier $${n}$ ?`, `Que dire de la parité de $${n}$ ?`, `$${n}$ est-elle paire, impaire, ou rien de cela ?`])}`,
      NI,
      REPONSES,
      expl(DEF, `On regarde d'abord l'ensemble de définition.`, `Il n'est pas symétrique par rapport à 0 : une valeur $x$ y est, mais pas $-x$.`, "Ni paire ni impaire."),
    );
  }),
  tpl(M, 8, 2, "Le symétrique d'un point dépend de la parité : (−a ; b) ou (−a ; −b).", () => {
    const n = nom();
    const g = un(["paire", "impaire"] as const);
    const a = entre(1, 9);
    for (;;) {
      const b = nz(-9, 9);
      if (Math.abs(b) === a) continue;
      const pt = (x: number, y: number) => `$(${x}\\,;${y})$`;
      return qcm(
        `${un([`La courbe d'une fonction ${g} $${n}$ passe par le point ${pt(a, b)}.`, `La fonction $${n}$ est ${g} et sa courbe contient le point ${pt(a, b)}.`, `Un point de la courbe d'une fonction ${g} $${n}$ est ${pt(a, b)}.`])} ${un(["Quel autre point est forcément sur la courbe ?", "Quel point appartient aussi à sa courbe ?", "Lequel de ces points est aussi sur la courbe ?", "Quel est le point symétrique, lui aussi sur la courbe ?"])}`,
        g === "paire" ? pt(-a, b) : pt(-a, -b),
        [pt(-a, b), pt(-a, -b), pt(a, -b), pt(b, a)],
        expl(GEO, `On applique $${n}(-x) = ${g === "paire" ? "" : "-"}${n}(x)$ à $x = ${a}$.`, `$${n}(-${a}) = ${g === "paire" ? b : -b}$.`, `Le point est ${g === "paire" ? pt(-a, b) : pt(-a, -b)}.`),
      );
    }
  }),
  /* ★3 */
  tpl(M, 9, 3, "Écris f(−x) avec k : les termes de mauvais degré doivent disparaître.", () => {
    const n = nom();
    const g = un(["paire", "impaire"] as const);
    const k = nz(-6, 6);
    const c = un([-5, -4, -3, -2, 2, 3, 4, 5]);
    // Le terme de degré « gênant » a pour coefficient k − k₀ : il doit s'annuler.
    const genant = g === "paire" ? un([1, 3]) : un([2, 4]);
    const bon = g === "paire" ? un([2, 4]) : un([1, 3]);
    const x = (e: number) => (e === 1 ? "x" : `x^{${e}}`);
    const coef = k < 0 ? `(a + ${-k})` : `(a - ${k})`;
    const e = `${coef}${x(genant)} ${c < 0 ? "-" : "+"} ${Math.abs(c)}${x(bon)}`;
    return court(
      phrase([`Soit $${n}(x) = ${e}$, où $a$ est un réel.`, `La fonction $${n}$ est définie sur $\\mathbb{R}$ par $${n}(x) = ${e}$, avec $a$ réel.`, `Une ingénieure règle un paramètre $a$ dans le modèle $${n}(x) = ${e}$.`, `Un réglage $a$ permet d'ajuster la courbe de $${n}(x) = ${e}$.`], [`Pour quelle valeur de $a$ la fonction $${n}$ est-elle ${g} ?`, `Quelle valeur de $a$ rend $${n}$ ${g} ?`, `Trouve $a$ pour que $${n}$ soit ${g}.`, `Détermine $a$ tel que $${n}$ soit ${g}.`]),
      k,
      expl(DEF, `Pour que $${n}$ soit ${g}, le terme en $${x(genant)}$ doit disparaître.`, `Son coefficient $${coef}$ doit être nul.`, `$a = ${k}$.`),
    );
  }),
  tpl(M, 10, 3, "Teste sur f(x) = x² et g(x) = x, ou remplace x par −x dans le produit.", () => {
    const [f, g] = un([["f", "g"], ["u", "v"], ["p", "q"], ["r", "s"]] as const);
    const [gf, gg] = un([["paire", "paire"], ["impaire", "impaire"], ["paire", "impaire"], ["impaire", "paire"]] as const);
    const op = un(["produit", "somme", "carré"] as const);
    // Une fonction paire non nulle plus une impaire non nulle n'est jamais ni paire ni impaire.
    const paireR = op === "carré" ? true : op === "produit" ? gf === gg : gf === gg ? gf === "paire" : null;
    const juste = paireR === true ? PAIRE : paireR === false ? IMPAIRE : NI;
    const expr = op === "produit" ? `${f} \\times ${g}` : op === "somme" ? `${f} + ${g}` : `${f}^{2}`;
    return qcm(
      `${un([`La fonction $${f}$ est ${gf} et la fonction $${g}$ est ${gg}, toutes deux définies sur $\\mathbb{R}$ et non nulles.`, `Soit $${f}$ une fonction ${gf} et $${g}$ une fonction ${gg}, non nulles, sur $\\mathbb{R}$.`, `On sait que $${f}$ est ${gf} et que $${g}$ est ${gg} sur $\\mathbb{R}$ ; aucune n'est la fonction nulle.`])} ${un([`Que dire de la fonction $${expr}$ ?`, `Quelle est la parité de $${expr}$ ?`, `Comment est $${expr}$ ?`, `Quelle propriété a toujours $${expr}$ ?`])}`,
      juste,
      REPONSES,
      expl(DEF, `On remplace $x$ par $-x$ dans $${expr}$.`, `On utilise la parité de chaque fonction, puis on compare à l'expression de départ.`, `Réponse : ${juste.toLowerCase()}.`),
    );
  }),
  tpl(M, 11, 3, "La symétrie permet de lire la valeur de l'autre côté, sans refaire le calcul.", () => {
    const n = nom();
    const a = entre(1, 9);
    const d = entre(1, 4);
    const v = entre(5, 40);
    const e = somme([T(-a, 1, "x^{2}"), T(a * d * d + v, 1)]);
    return court(
      `${un(SYMETRIQUES)(n, e)} ${un([`Sans refaire le calcul, si $${n}(${d}) = ${v}$, que vaut $${n}(-${d})$ ?`, `On a calculé $${n}(${d}) = ${v}$. Que vaut $${n}(-${d})$ ?`, `Sachant que $${n}(${d}) = ${v}$, donne la hauteur $${n}(-${d})$.`, `Avec $${n}(${d}) = ${v}$, déduis-en $${n}(-${d})$ par symétrie.`])}`,
      v,
      expl(GEO, `$${n}(-x) = ${e} = ${n}(x)$ : la fonction est paire.`, `Les deux points sont à la même hauteur.`, `$${n}(-${d}) = ${v}$.`),
    );
  }),
  tpl(M, 12, 3, "Calcule s(−t) et compare à s(t) : le signal repart en sens opposé s'il est impair.", () => {
    const n = un(["s", "u", "v", "h"]);
    const g = un(["impaire", "paire", "ni"] as const);
    const a = entre(1, 9);
    const b = entre(2, 12);
    const e = g === "impaire" ? somme([T(a, 1, "t^{3}"), T(-b, 1, "t")]) : g === "paire" ? somme([T(a, 1, "t^{4}"), T(-b, 1, "t^{2}")]) : somme([T(a, 1, "t^{3}"), T(-b, 1, "t^{2}")]);
    return qcm(
      `${un(SIGNAUX)(n, e)} ${un([`Quelle est la parité de $${n}$ ?`, `Que dire de la parité de cette fonction ?`, `Comment qualifier la fonction $${n}$ ?`, `Cette fonction $${n}$ est-elle paire, impaire, ou rien de cela ?`])}`,
      nomGenre[g],
      REPONSES,
      expl(DEF, `On calcule $${n}(-t)$.`, `On compare à $${n}(t)$ et à $-${n}(t)$ en regardant les exposants.`, `Réponse : ${nomGenre[g].toLowerCase()}.`),
    );
  }),
];
