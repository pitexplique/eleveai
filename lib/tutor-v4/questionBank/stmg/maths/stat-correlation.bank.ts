// COVARIANCE, COEFFICIENT DE CORRÉLATION, DROITES DE RÉGRESSION PAR LES FORMULES (05/11/2026). Hors programme
// français (registre `hors_france`) ; les moindres carrés sont dans `stat_moindres_carres`. Lignes visées :
// Québec STA B4-B6, Belgique S6 3.4.2d, Sénégal Tle OD 1, Côte d'Ivoire Tle C2-L1.
// Séries courtes à calculs praticables : x a une moyenne entière, y = ȳ + a(x − x̄) + un écart orthogonal à x,
// donc la pente a tombe juste. Les réponses arrondies acceptent le cran voisin (calcul intermédiaire arrondi).

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { T, court, entre, expl, fabrique, fr, nL, phrase, qcm, somme, un } from "../../lycee-commun";

const tpl = fabrique("stmg", "stat_correlation", "stmg_");
const M1 = "stat_covariance";
const M2 = "stat_correlation_r";
const M3 = "stat_regression_formules";

const COV = "\\mathrm{cov}(x,y)";
const SX = "\\sigma_{x}";
const SY = "\\sigma_{y}";
const VX = "V(x)";
const VY = "V(y)";
const MX = "\\overline{x}";
const MY = "\\overline{y}";

const DEF_COV = `$${COV}$ est la moyenne des produits $x_{i}y_{i}$ moins le produit des moyennes : $${COV} = \\dfrac{1}{n}\\sum x_{i}y_{i} - ${MX}\\,${MY}$.`;
const DEF_R = `$r = \\dfrac{${COV}}{${SX}\\,${SY}}$ est compris entre $-1$ et $1$ ; plus il est proche de $-1$ ou de $1$, plus les points sont proches d'une droite.`;
const DEF_REG = `La droite de régression de $y$ en $x$ est $y = ax + b$ avec $a = \\dfrac{${COV}}{${VX}}$ et $b = ${MY} - a\\,${MX}$ ; elle passe par le point moyen.`;

/* ───────────────── séries ───────────────── */

type Serie = { n: number; xs: number[]; ys: number[]; a: number };
/** Écarts à la moyenne de x, et écarts orthogonaux à x (somme nulle, produit scalaire nul). */
const FORMES = [
  { d: [-3, -1, 1, 3], p: [[1, -1, -1, 1], [-1, 3, -3, 1]] },
  { d: [-2, -1, 0, 1, 2], p: [[2, -1, -2, -1, 2], [-1, 2, 0, -2, 1]] },
  { d: [-5, -2, -1, 1, 2, 5], p: [[1, -1, 0, 0, -1, 1], [2, -5, 0, 0, 5, -2]] },
];
function serie(opt: { positive?: boolean; negative?: boolean; court?: boolean } = {}): Serie {
  for (;;) {
    const f = opt.court ? un(FORMES.slice(0, 2)) : un(FORMES);
    const a0 = un([0.5, 1, 1.5, 2, 2.5, 3, 4]);
    const signe = opt.positive ? 1 : opt.negative ? -1 : un([1, -1]);
    const a = a0 * signe;
    const pas = Number.isInteger(a) ? un([1, 2]) : 2;
    const mx = entre(5, 20) + 2 * pas;
    const my = entre(30, 80);
    const t = un([0, 1, 1, 2, -1, -2]);
    const p = un(f.p);
    const xs = f.d.map((d) => mx + d * pas);
    const ys = f.d.map((d, i) => my + a * d * pas + t * p[i]);
    if (xs.some((x) => x <= 0) || ys.some((y) => y <= 0)) continue;
    return { n: xs.length, xs, ys, a };
  }
}
const moy = (l: number[]) => l.reduce((s, x) => s + x, 0) / l.length;
const cov = (s: Serie) => moy(s.xs.map((x, i) => x * s.ys[i])) - moy(s.xs) * moy(s.ys);
const vr = (l: number[]) => moy(l.map((x) => x * x)) - moy(l) ** 2;
const coefR = (s: Serie) => cov(s) / Math.sqrt(vr(s.xs) * vr(s.ys));
const pente = (s: Serie) => cov(s) / vr(s.xs);
const ord = (s: Serie) => moy(s.ys) - pente(s) * moy(s.xs);
const net = (v: number) => Math.round(v * 1e6) / 1e6;

/** Le tableau de la série : la première colonne porte les noms, relus par le correcteur. */
function tableau(s: Serie, nx = "$x_{i}$", ny = "$y_{i}$"): CanvasFigure {
  return {
    kind: "tableau_donnees",
    headers: ["", ...s.xs.map((_, i) => String(i + 1))],
    rows: [
      { label: nx, values: s.xs },
      { label: ny, values: s.ys },
    ],
    display: { compact: true },
  } as CanvasFigure;
}
function nuage(s: Serie): CanvasFigure {
  const pad = (l: number[]) => [Math.floor(Math.min(...l)) - 2, Math.ceil(Math.max(...l)) + 2];
  const [xmin, xmax] = pad(s.xs);
  const [ymin, ymax] = pad(s.ys);
  return { kind: "fonctionGraphique", size: { width: 340, height: 280 }, xmin, xmax, ymin, ymax, grille: true, points: s.xs.map((x, i) => ({ x, y: s.ys[i], couleur: "#2563eb" })) } as CanvasFigure;
}
/** Une réponse arrondie : le cran voisin est admis. */
function arr(text: string, v: number, p: number, explication: string, canvas?: CanvasFigure) {
  const r = Math.round(v / p) * p;
  return court(text, r, explication, canvas, [fr(r - p), fr(r + p)]);
}
const CENT = ["Arrondis au centième.", "Donne l'arrondi au centième.", "Réponds avec un arrondi au centième."];
const SERIE = [
  "Pour une série statistique double $(x_{i}\\,;y_{i})$,",
  "Pour une série à deux variables $(x_{i}\\,;y_{i})$,",
  "Dans l'étude d'une série $(x_{i}\\,;y_{i})$,",
  "On étudie une série double $(x_{i}\\,;y_{i})$ :",
  "Sur une série $(x_{i}\\,;y_{i})$ de $n$ points,",
];
const VOICI = [
  "Voici une série double.",
  "Le tableau donne une série statistique à deux variables.",
  "On relève cette série double.",
  "On étudie la série du tableau.",
  "Le tableau présente une série $(x_{i}\\,;y_{i})$.",
  "Une enquête donne la série du tableau.",
  "Observe cette série à deux variables.",
];

/* ───────────────── contextes ───────────────── */

const ETUDES: { intro: string; x: string; y: string }[] = [
  { intro: "Une coach relève, pour des nageuses, les heures d'entraînement par semaine et le nombre de longueurs nagées en une séance.", x: "Heures", y: "Longueurs" },
  { intro: "Une gérante de librairie note le nombre d'affiches posées et le nombre de livres vendus.", x: "Affiches", y: "Livres" },
  { intro: "Un agronome compare la dose d'engrais et le poids de la récolte.", x: "Dose", y: "Récolte" },
  { intro: "Un responsable de site suit le nombre de vidéos publiées et le nombre de nouveaux abonnés.", x: "Vidéos", y: "Abonnés" },
  { intro: "Une météorologue relève la température du matin et le nombre de glaces vendues par un kiosque.", x: "Température", y: "Glaces" },
  { intro: "Un directeur de salle de concert compare le nombre de musiciens sur scène et le nombre de spectateurs.", x: "Musiciens", y: "Spectateurs" },
  { intro: "Une infirmière relève l'âge de patients et leur nombre de séances de rééducation.", x: "Âge", y: "Séances" },
  { intro: "Un gérant d'entreprise de transport compare le nombre de livraisons et le carburant utilisé.", x: "Livraisons", y: "Carburant" },
  { intro: "Une biologiste relève l'altitude d'une station et le nombre d'espèces de plantes observées.", x: "Altitude", y: "Espèces" },
  { intro: "Un chef d'équipe compare le nombre d'employés formés et le nombre d'incidents sur le chantier.", x: "Formés", y: "Incidents" },
];
const etude = () => un(ETUDES);
const INTERPRETES = [
  "Une gérante de magasin étudie deux grandeurs.",
  "Un responsable marketing étudie deux variables.",
  "Une agente d'assurance compare deux indicateurs.",
  "Un chef de produit relève deux séries.",
  "Une comptable croise deux séries de résultats.",
  "Un directeur des ressources humaines compare deux mesures.",
];

export const statCorrelationBank: TutorBankItemV4[] = [
  /* ═══════════ Covariance ═══════════ */
  tpl(M1, 1, 1, "Multiplie les valeurs deux à deux, additionne, puis divise par le nombre de points.", () => {
    const s = serie({ court: true });
    const v = moy(s.xs.map((x, i) => x * s.ys[i]));
    const m = `\\dfrac{1}{n}\\sum x_{i}y_{i}`;
    return court(
      phrase(VOICI, [`Calcule $${m}$.`, `Que vaut la moyenne des produits $${m}$ ?`, `Quelle est la moyenne des produits $x_{i}y_{i}$, soit $${m}$ ?`, `Trouve $${m}$.`, `Donne la valeur de $${m}$.`]),
      net(v),
      expl(DEF_COV, "On multiplie chaque $x_{i}$ par son $y_{i}$.", `La somme des produits vaut $${nL(v * s.n)}$, pour $${s.n}$ points.`, `La moyenne vaut $${nL(v)}$.`),
      tableau(s),
    );
  }),
  tpl(M1, 2, 1, "Moyenne des produits moins produit des moyennes.", () => {
    const mx = entre(2, 20);
    const my = entre(2, 40);
    const c = un([-12, -8, -6, -4, -2.5, -1.5, 1.5, 2.5, 4, 6, 8, 12, 15]);
    const moyP = mx * my + c;
    return court(
      phrase(SERIE, [`on a $\\dfrac{1}{n}\\sum x_{i}y_{i} = ${nL(moyP)}$, $${MX} = ${mx}$ et $${MY} = ${my}$. Calcule $${COV}$.`, `on sait que $${MX} = ${mx}$, $${MY} = ${my}$ et $\\dfrac{1}{n}\\sum x_{i}y_{i} = ${nL(moyP)}$. Que vaut $${COV}$ ?`, `avec $${MX} = ${mx}$, $${MY} = ${my}$ et $\\dfrac{1}{n}\\sum x_{i}y_{i} = ${nL(moyP)}$, quelle est la covariance $${COV}$ ?`, `sachant que $\\dfrac{1}{n}\\sum x_{i}y_{i} = ${nL(moyP)}$, $${MX} = ${mx}$ et $${MY} = ${my}$, trouve $${COV}$.`]),
      c,
      expl(DEF_COV, "On retranche le produit des moyennes.", `$${nL(moyP)} - ${mx} \\times ${my} = ${nL(c)}$.`, `$${COV} = ${nL(c)}$.`),
    );
  }),
  tpl(M1, 3, 1, "La covariance retranche le produit des deux moyennes.", () => {
    const j = `$\\dfrac{1}{n}\\sum x_{i}y_{i} - ${MX}\\,${MY}$`;
    return qcm(
      phrase(SERIE, [`quelle formule donne $${COV}$ ?`, `comment calcule-t-on la covariance $${COV}$ ?`, `à quoi est égale $${COV}$ ?`, `quelle expression vaut $${COV}$ ?`, `quelle est la bonne formule de la covariance ?`]),
      j,
      [`$\\dfrac{1}{n}\\sum x_{i}y_{i} + ${MX}\\,${MY}$`, `$\\sum x_{i}y_{i} - ${MX}\\,${MY}$`, `$${MX}\\,${MY} - \\dfrac{1}{n}\\sum x_{i}y_{i}$`, `$\\dfrac{${MX}}{${MY}}$`],
      expl(DEF_COV, "C'est la moyenne des produits, moins le produit des moyennes.", `On reconnaît ${j}.`, `La bonne formule est ${j}.`),
    );
  }),
  tpl(M1, 4, 1, "Covariance positive : y a tendance à augmenter avec x.", () => {
    const c = un([-40, -18, -7.5, -3, 3, 7.5, 18, 40]);
    const H = "$y$ a tendance à augmenter quand $x$ augmente";
    const B = "$y$ a tendance à diminuer quand $x$ augmente";
    return qcm(
      phrase(["Une série double a pour covariance", "Pour une série à deux variables, on trouve la covariance", "Le calcul donne la covariance", "Sur une série $(x_{i}\\,;y_{i})$, on obtient la covariance"], [`$${COV} = ${nL(c)}$. Que peut-on dire ?`, `$${COV} = ${nL(c)}$. Quelle tendance cela indique-t-il ?`, `$${COV} = ${nL(c)}$. Comment évoluent $x$ et $y$ ?`, `$${COV} = ${nL(c)}$. Que dit ce signe ?`]),
      c > 0 ? H : B,
      [H, B, "$x$ et $y$ sont égaux", "Tous les points sont sur une droite"],
      expl(DEF_COV, "On regarde seulement le signe de la covariance.", `Elle est ${c > 0 ? "positive" : "négative"}.`, c > 0 ? H + "." : B + "."),
    );
  }),
  tpl(M1, 5, 2, "Les moyennes sont données : calcule la moyenne des produits, puis retranche.", () => {
    const s = serie();
    return court(
      `${un(VOICI)} On donne $${MX} = ${nL(moy(s.xs))}$ et $${MY} = ${nL(moy(s.ys))}$. ${un([`Calcule $${COV}$.`, `Que vaut la covariance $${COV}$ ?`, `Trouve $${COV}$.`, `Quelle est la covariance de cette série ?`])}`,
      net(cov(s)),
      expl(DEF_COV, "On calcule la moyenne des produits.", `$${nL(moy(s.xs.map((x, i) => x * s.ys[i])))} - ${nL(moy(s.xs))} \\times ${nL(moy(s.ys))}$.`, `$${COV} = ${nL(cov(s))}$.`),
      tableau(s),
    );
  }),
  tpl(M1, 6, 2, "Calcule les deux moyennes, la moyenne des produits, puis la différence.", () => {
    const s = serie();
    return court(
      `${un(VOICI)} ${un([`Calcule $${COV}$.`, `Calcule les moyennes, puis $${COV}$.`, `Que vaut $${COV}$ ?`, `Détermine la covariance de cette série.`, `Quelle est la valeur de $${COV}$ ?`])}`,
      net(cov(s)),
      expl(DEF_COV, `$${MX} = ${nL(moy(s.xs))}$ et $${MY} = ${nL(moy(s.ys))}$.`, `$${nL(moy(s.xs.map((x, i) => x * s.ys[i])))} - ${nL(moy(s.xs))} \\times ${nL(moy(s.ys))}$.`, `$${COV} = ${nL(cov(s))}$.`),
      tableau(s),
    );
  }),
  tpl(M1, 7, 2, "Regarde le nuage : monte-t-il ou descend-il ?", () => {
    const pos = Math.random() < 0.5;
    const s = serie({ positive: pos, negative: !pos });
    const P = "Positive";
    const N = "Négative";
    return qcm(
      phrase(["Voici le nuage de points d'une série double.", "On a représenté une série à deux variables par ce nuage.", "Observe ce nuage de points.", "Ce nuage représente une série $(x_{i}\\,;y_{i})$."], ["Quel est le signe de la covariance ?", `Sans calculer, quel est le signe de $${COV}$ ?`, "Que peut-on dire de la covariance ?", `D'après la forme du nuage, comment est $${COV}$ ?`, "Quel signe attend-on pour la covariance ?"]),
      pos ? P : N,
      [P, N, "Nulle", "On ne peut pas le savoir"],
      expl(DEF_COV, "On regarde si le nuage monte ou descend de gauche à droite.", `Il ${pos ? "monte" : "descend"}.`, `La covariance est ${pos ? "positive" : "négative"}.`),
      nuage(s),
    );
  }),
  tpl(M1, 8, 2, "La variance est la moyenne des carrés moins le carré de la moyenne.", () => {
    const s = serie({ court: true });
    return court(
      `${un(VOICI)} ${un([`Calcule la variance $${VX}$.`, `Que vaut $${VX}$ ?`, `Trouve la variance $${VX}$ des $x_{i}$.`, `Quelle est la variance des $x_{i}$, notée $${VX}$ ?`, `Calcule $${VX}$, utile pour la droite de régression.`])}`,
      net(vr(s.xs)),
      expl("$V(x)$ est la moyenne des carrés moins le carré de la moyenne.", `$${MX} = ${nL(moy(s.xs))}$.`, `$${nL(moy(s.xs.map((x) => x * x)))} - ${nL(moy(s.xs))}^{2} = ${nL(vr(s.xs))}$.`, `$${VX} = ${nL(vr(s.xs))}$.`),
      tableau(s),
    );
  }),
  tpl(M1, 9, 3, "Dans ce contexte, x et y sont les deux lignes du tableau.", () => {
    const e = etude();
    const s = serie();
    return court(
      `${e.intro} ${un([`Calcule la covariance de cette série.`, `Quelle est la covariance entre ces deux variables ?`, `Que vaut $${COV}$, $x$ étant la première ligne ?`, `Détermine la covariance de cette série double.`])}`,
      net(cov(s)),
      expl(DEF_COV, `$${MX} = ${nL(moy(s.xs))}$ et $${MY} = ${nL(moy(s.ys))}$.`, `$${nL(moy(s.xs.map((x, i) => x * s.ys[i])))} - ${nL(moy(s.xs))} \\times ${nL(moy(s.ys))}$.`, `La covariance vaut $${nL(cov(s))}$.`),
      tableau(s, e.x, e.y),
    );
  }),
  tpl(M1, 10, 3, "Le signe de la covariance dit si les deux variables évoluent dans le même sens.", () => {
    const e = etude();
    const pos = Math.random() < 0.5;
    const s = serie({ positive: pos, negative: !pos, court: true });
    const H = `Quand « ${e.x} » augmente, « ${e.y} » a tendance à augmenter`;
    const B = `Quand « ${e.x} » augmente, « ${e.y} » a tendance à diminuer`;
    return qcm(
      `${e.intro} ${un(["Que montre le signe de la covariance ?", "Quelle tendance se dégage, d'après le signe de la covariance ?", "Calcule le signe de la covariance : que conclure ?", "Que peut-on conclure du signe de la covariance ?"])}`,
      pos ? H : B,
      [H, B, `« ${e.x} » et « ${e.y} » sont toujours égaux`, `« ${e.x} » est la cause de « ${e.y} »`],
      expl(DEF_COV, "On calcule la covariance, ou on regarde le sens du tableau.", `$${COV} = ${nL(cov(s))}$.`, pos ? `${H}.` : `${B}.`),
      tableau(s, e.x, e.y),
    );
  }),
  tpl(M1, 11, 3, "Multiplier x par k multiplie la covariance par k ; ajouter k ne la change pas.", () => {
    const c = un([-18, -12, -7.5, -6, 2.5, 4, 6, 9, 15]);
    const k = entre(2, 12);
    const ajoute = Math.random() < 0.5;
    const v = ajoute ? c : c * k;
    const ctx = ajoute
      ? un([`Un commerçant ajoute $${k}$ à chaque valeur de $x$ pour corriger un défaut de sa caisse.`, `Une technicienne recale son capteur : elle ajoute $${k}$ à toutes les valeurs de $x$.`, `Une enquêtrice ajoute $${k}$ à tous les $x_{i}$ pour changer l'année de référence.`, `Un analyste décale toutes les valeurs de $x$ de $${k}$.`])
      : un([`Un commerçant change d'unité : toutes les valeurs de $x$ sont multipliées par $${k}$.`, `Une technicienne convertit ses mesures : chaque $x_{i}$ est multiplié par $${k}$.`, `Une enquêtrice exprime les $x_{i}$ dans une autre unité, ce qui les multiplie par $${k}$.`, `Un analyste multiplie toutes les valeurs de $x$ par $${k}$.`]);
    return court(
      `Une série a pour covariance $${COV} = ${nL(c)}$. ${ctx} ${un(["Que devient la covariance ?", "Quelle est la nouvelle covariance ?", "Que vaut alors la covariance ?", "Donne la nouvelle valeur de la covariance."])}`,
      net(v),
      expl(DEF_COV, ajoute ? "Ajouter un même nombre à tous les $x_{i}$ ne change pas leurs écarts à la moyenne." : "Multiplier tous les $x_{i}$ par $k$ multiplie leurs écarts à la moyenne par $k$.", ajoute ? "La covariance ne change pas." : `$${k} \\times (${nL(c)}) = ${nL(v)}$.`, `La nouvelle covariance vaut $${nL(v)}$.`),
    );
  }),

  /* ═══════════ Coefficient de corrélation ═══════════ */
  tpl(M2, 1, 1, "La covariance au numérateur, le produit des écarts types au dénominateur.", () => {
    const j = `$\\dfrac{${COV}}{${SX}\\,${SY}}$`;
    return qcm(
      phrase(SERIE, [`quelle formule donne le coefficient de corrélation $r$ ?`, `comment calcule-t-on $r$ ?`, `à quoi est égal le coefficient de corrélation linéaire ?`, `quelle expression vaut $r$ ?`, `quelle est la formule du coefficient $r$ ?`]),
      j,
      [`$\\dfrac{${SX}\\,${SY}}{${COV}}$`, `$${COV} \\times ${SX}\\,${SY}$`, `$\\dfrac{${COV}}{${SX} + ${SY}}$`, `$\\dfrac{${COV}}{${VX}}$`],
      expl(DEF_R, "On divise la covariance par le produit des écarts types.", `C'est ${j}.`, `$r =$ ${j}.`),
    );
  }),
  tpl(M2, 2, 1, "Remplace dans r = cov ÷ (σx × σy).", () => {
    for (;;) {
      const sx = un([1.5, 2, 2.5, 3, 4, 5]);
      const sy = un([2, 3, 4, 5, 6, 8, 10]);
      const r = un([-0.9, -0.8, -0.75, -0.6, -0.5, 0.5, 0.6, 0.75, 0.8, 0.9]);
      const c = r * sx * sy;
      if (Math.abs(c * 100 - Math.round(c * 100)) > 1e-9) continue;
      return court(
        phrase(SERIE, [`on a $${COV} = ${nL(c)}$, $${SX} = ${nL(sx)}$ et $${SY} = ${nL(sy)}$. Calcule $r$.`, `on sait que $${COV} = ${nL(c)}$, $${SX} = ${nL(sx)}$, $${SY} = ${nL(sy)}$. Que vaut le coefficient $r$ ?`, `avec $${SX} = ${nL(sx)}$, $${SY} = ${nL(sy)}$ et $${COV} = ${nL(c)}$, trouve $r$.`, `sachant que $${COV} = ${nL(c)}$, $${SX} = ${nL(sx)}$ et $${SY} = ${nL(sy)}$, quel est le coefficient de corrélation ?`]),
        r,
        expl(DEF_R, "On divise par le produit des écarts types.", `$r = \\dfrac{${nL(c)}}{${nL(sx)} \\times ${nL(sy)}} = ${nL(r)}$.`, `$r = ${nL(r)}$.`),
      );
    }
  }),
  tpl(M2, 3, 1, "Le signe donne le sens, la proximité de ±1 donne la force.", () => {
    const r = un([-0.98, -0.95, -0.91, -0.12, -0.05, 0.05, 0.12, 0.91, 0.95, 0.98]);
    const fort = Math.abs(r) > 0.5;
    const j = !fort ? "Liaison linéaire très faible" : r > 0 ? "Forte liaison linéaire croissante" : "Forte liaison linéaire décroissante";
    return qcm(
      phrase(["Une série double a pour coefficient de corrélation", "Pour une série à deux variables, on trouve", "Le calcul donne le coefficient", "Sur une série $(x_{i}\\,;y_{i})$, on obtient"], [`$r = ${nL(r)}$. Que peut-on dire ?`, `$r = ${nL(r)}$. Comment décrire la liaison ?`, `$r = ${nL(r)}$. Que traduit cette valeur ?`, `$r = ${nL(r)}$. Quelle lecture est juste ?`, `$r = ${nL(r)}$. Comment sont les points du nuage ?`]),
      j,
      ["Liaison linéaire très faible", "Forte liaison linéaire croissante", "Forte liaison linéaire décroissante", "Liaison parfaite : tous les points sont alignés"],
      expl(DEF_R, "On regarde le signe et la proximité de $-1$ ou de $1$.", `$r = ${nL(r)}$.`, `${j}.`),
    );
  }),
  tpl(M2, 4, 1, "Un coefficient de corrélation est toujours entre −1 et 1.", () => {
    const impossible = un([1.2, 1.5, -1.1, -1.4, 2, -2, 1.05, 3]);
    const autres = [un([0.2, 0.35, 0.5]), un([-0.8, -0.65, -0.4]), un([1, -1, 0, 0.99, -0.99])];
    return qcm(
      `${un(["Un élève a calculé plusieurs coefficients de corrélation.", "On lit quatre résultats de calcul de $r$.", "Une calculatrice affiche ces valeurs pour $r$.", "Voici des valeurs proposées pour un coefficient de corrélation.", "Quatre groupes annoncent leur coefficient de corrélation."])} ${un(["Laquelle est forcément fausse ?", "Laquelle ne peut pas être un coefficient de corrélation ?", "Quelle valeur est impossible ?", "Laquelle contient forcément une erreur ?"])}`,
      `$${nL(impossible)}$`,
      autres.map((a) => `$${nL(a)}$`),
      expl(DEF_R, "On compare chaque valeur à $-1$ et à $1$.", `$${nL(impossible)}$ sort de cet intervalle.`, `$${nL(impossible)}$ est impossible.`),
    );
  }),
  tpl(M2, 5, 2, "Calcule la covariance et les deux variances, puis r = cov ÷ √(V(x) V(y)).", () => {
    const s = serie({ court: true });
    return arr(
      `${un(VOICI)} ${un([`Calcule le coefficient de corrélation $r$.`, `Que vaut $r$ ?`, `Détermine le coefficient de corrélation linéaire.`, `Quel est le coefficient $r$ de cette série ?`])} ${un(CENT)}`,
      coefR(s),
      0.01,
      expl(DEF_R, `$${COV} = ${nL(cov(s))}$, $${VX} = ${nL(vr(s.xs))}$, $${VY} = ${nL(vr(s.ys))}$.`, `$r = \\dfrac{${nL(cov(s))}}{\\sqrt{${nL(vr(s.xs))} \\times ${nL(vr(s.ys))}}}$.`, `$r \\approx ${nL(Math.round(coefR(s) * 100) / 100)}$.`),
      tableau(s),
    );
  }),
  tpl(M2, 6, 2, "L'écart type est la racine de la variance.", () => {
    const vx = entre(2, 40);
    const vy = entre(2, 60);
    const borne = Math.sqrt(vx * vy);
    const c = (un([-1, 1]) * Math.round(borne * entre(30, 95))) / 100;
    const r = c / borne;
    return arr(
      `${phrase(SERIE, [`on a $${COV} = ${nL(c)}$, $${VX} = ${vx}$ et $${VY} = ${vy}$. Calcule $r$.`, `on sait que $${VX} = ${vx}$, $${VY} = ${vy}$ et $${COV} = ${nL(c)}$. Que vaut $r$ ?`, `avec $${COV} = ${nL(c)}$, $${VX} = ${vx}$ et $${VY} = ${vy}$, trouve le coefficient de corrélation.`])} ${un(CENT)}`,
      r,
      0.01,
      expl(DEF_R, "L'écart type est la racine carrée de la variance.", `$r = \\dfrac{${nL(c)}}{\\sqrt{${vx} \\times ${vy}}}$.`, `$r \\approx ${nL(Math.round(r * 100) / 100)}$.`),
    );
  }),
  tpl(M2, 7, 2, "La liaison la plus forte est celle dont r est le plus loin de 0, quel que soit son signe.", () => {
    for (;;) {
      const v = [0, 1, 2, 3].map(() => un([1, -1]) * (entre(10, 99) / 100));
      const abs = v.map(Math.abs);
      const max = Math.max(...abs);
      if (abs.filter((a) => Math.abs(a - max) < 0.03).length > 1 || new Set(abs).size < 4) continue;
      const ch = v.map((x) => `$r = ${nL(x)}$`);
      return qcm(
        `${un(["Quatre séries doubles ont ces coefficients de corrélation.", "On compare quatre séries à deux variables.", "Quatre études donnent ces coefficients.", "Une analyste compare ces quatre coefficients."])} ${un(["Laquelle montre la liaison linéaire la plus forte ?", "Quelle série a les points les plus proches d'une droite ?", "Pour laquelle la liaison linéaire est-elle la plus forte ?", "Laquelle se prête le mieux à un ajustement affine ?"])}`,
        ch[abs.indexOf(max)],
        ch,
        expl(DEF_R, "On compare les valeurs absolues de $r$ : le signe ne donne que le sens.", `La plus grande valeur absolue est $${nL(max)}$.`, `Réponse : ${ch[abs.indexOf(max)]}.`),
      );
    }
  }),
  tpl(M2, 8, 2, "r et la covariance ont le même signe : les écarts types sont positifs.", () => {
    const c = un([-40, -12.5, -6, -2, 2, 6, 12.5, 40]);
    const P = "Positif";
    const N = "Négatif";
    return qcm(
      phrase(SERIE, [`on a $${COV} = ${nL(c)}$. Quel est le signe de $r$ ?`, `la covariance vaut $${COV} = ${nL(c)}$. Sans autre calcul, quel est le signe de $r$ ?`, `avec $${COV} = ${nL(c)}$, comment est le coefficient de corrélation ?`, `sachant que $${COV} = ${nL(c)}$, que dire du signe de $r$ ?`]),
      c > 0 ? P : N,
      [P, N, "Nul", "On ne peut pas le savoir"],
      expl(DEF_R, "Les écarts types sont positifs.", "$r$ a donc le signe de la covariance.", `$r$ est ${c > 0 ? "positif" : "négatif"}.`),
    );
  }),
  tpl(M2, 9, 3, "Calcule r sur la série du tableau, puis arrondis.", () => {
    const e = etude();
    const s = serie({ court: true });
    return arr(
      `${e.intro} ${un(["Calcule le coefficient de corrélation.", "Que vaut le coefficient de corrélation $r$ de cette série ?", "Détermine $r$ entre ces deux variables.", "Quel est le coefficient de corrélation linéaire ?"])} ${un(CENT)}`,
      coefR(s),
      0.01,
      expl(DEF_R, `$${COV} = ${nL(cov(s))}$, $${VX} = ${nL(vr(s.xs))}$, $${VY} = ${nL(vr(s.ys))}$.`, `$r = \\dfrac{${nL(cov(s))}}{\\sqrt{${nL(vr(s.xs))} \\times ${nL(vr(s.ys))}}}$.`, `$r \\approx ${nL(Math.round(coefR(s) * 100) / 100)}$.`),
      tableau(s, e.x, e.y),
    );
  }),
  tpl(M2, 10, 3, "Une corrélation ne prouve pas une cause : un troisième facteur peut tout expliquer.", () => {
    const c = un([
      { x: "les ventes de glaces", y: "le nombre de coups de soleil", z: "l'ensoleillement" },
      { x: "le nombre de pompiers envoyés", y: "les dégâts d'un incendie", z: "la taille de l'incendie" },
      { x: "la pointure des enfants", y: "leur score en lecture", z: "l'âge" },
      { x: "le nombre de cigognes", y: "le nombre de naissances dans une ville", z: "la taille de la ville" },
      { x: "la vente de parapluies", y: "le nombre de bouchons sur la route", z: "la pluie" },
      { x: "le nombre de bibliothèques", y: "le nombre de cafés d'une ville", z: "la population" },
    ]);
    const r = un([0.88, 0.91, 0.93, 0.95, 0.97]);
    const j = "Non : un troisième facteur peut expliquer les deux";
    return qcm(
      `${un(["Une journaliste écrit un article à partir d'une étude.", "Un stagiaire présente une étude à son équipe.", "Une analyste reçoit un rapport.", "Un blog relaie un graphique."])} Entre ${c.x} et ${c.y}, on trouve $r = ${nL(r)}$. ${un([`Peut-on dire que l'un cause l'autre ?`, `Cela prouve-t-il un lien de cause à effet ?`, `Peut-on conclure que l'un provoque l'autre ?`])}`,
      j,
      ["Oui : $r$ est proche de 1, donc l'un cause l'autre", "Oui, car $r$ est positif", "Non : $r$ doit valoir exactement 1 pour le prouver", j],
      expl(DEF_R, "Le coefficient mesure un alignement des points, pas une cause.", `Ici, ${c.z} peut faire varier les deux grandeurs.`, `${j}.`),
    );
  }),
  tpl(M2, 11, 3, "Tous les points sont sur une droite : r vaut 1 ou −1 selon le sens.", () => {
    const a = un([2, 3, 4, 5, -2, -3, -4, 1.5, -1.5]);
    const b = entre(20, 90);
    const xs = [2, 4, 6, 8, 10].slice(0, entre(4, 5));
    const ys = xs.map((x) => a * x + b);
    const s: Serie = { n: xs.length, xs, ys, a };
    const e = etude();
    return court(
      `${e.intro} ${un(["Calcule le coefficient de corrélation : les points sont-ils alignés ?", "Quelle est la valeur exacte de $r$ ?", "Que vaut $r$ ? Regarde d'abord si les points sont alignés.", "Sans long calcul, que vaut le coefficient $r$ ?"])}`,
      a > 0 ? 1 : -1,
      expl(DEF_R, "Les accroissements de $y$ sont proportionnels à ceux de $x$ : les points sont alignés.", `La droite ${a > 0 ? "monte" : "descend"}.`, `$r = ${a > 0 ? 1 : -1}$.`),
      tableau(s, e.x, e.y),
    );
  }),

  /* ═══════════ Droites de régression ═══════════ */
  tpl(M3, 1, 1, "Le coefficient directeur est la covariance divisée par la variance de x.", () => {
    const j = `$\\dfrac{${COV}}{${VX}}$`;
    return qcm(
      phrase(SERIE, [`quelle formule donne le coefficient $a$ de la droite de régression de $y$ en $x$ ?`, `comment calcule-t-on $a$ dans $y = ax + b$, la droite de régression de $y$ en $x$ ?`, `que vaut la pente $a$ de la droite de régression de $y$ en $x$ ?`, `quelle expression donne le coefficient directeur $a$ de la droite de régression de $y$ en $x$ ?`]),
      j,
      [`$\\dfrac{${VX}}{${COV}}$`, `$\\dfrac{${COV}}{${VY}}$`, `$${COV} \\times ${VX}$`, `$\\dfrac{${COV}}{${SX}\\,${SY}}$`],
      expl(DEF_REG, "On divise la covariance par la variance de $x$.", `C'est ${j}.`, `$a =$ ${j}.`),
    );
  }),
  tpl(M3, 2, 1, "a = cov ÷ V(x).", () => {
    const vx = un([2, 4, 5, 8, 10, 16, 20, 25]);
    const a = un([-3, -2.5, -2, -1.5, -0.5, 0.5, 1.5, 2, 2.5, 3, 4]);
    const c = a * vx;
    return court(
      phrase(SERIE, [`on a $${COV} = ${nL(c)}$ et $${VX} = ${vx}$. Calcule le coefficient $a$ de la droite de régression de $y$ en $x$.`, `avec $${COV} = ${nL(c)}$ et $${VX} = ${vx}$, que vaut la pente $a$ de la droite de régression de $y$ en $x$ ?`, `sachant que $${VX} = ${vx}$ et $${COV} = ${nL(c)}$, trouve le coefficient directeur $a$ de la droite de régression de $y$ en $x$.`, `la covariance vaut $${COV} = ${nL(c)}$ et $${VX} = ${vx}$. Quel est le coefficient $a$ de la droite de régression de $y$ en $x$ ?`]),
      a,
      expl(DEF_REG, "On divise la covariance par la variance de $x$.", `$a = \\dfrac{${nL(c)}}{${vx}} = ${nL(a)}$.`, `$a = ${nL(a)}$.`),
    );
  }),
  tpl(M3, 3, 1, "b = ȳ − a × x̄ : la droite passe par le point moyen.", () => {
    const a = un([-3, -2, -1.5, -0.5, 0.5, 1.5, 2, 3, 4]);
    const mx = entre(2, 12) * 2;
    const my = entre(20, 90);
    const b = my - a * mx;
    return court(
      phrase(SERIE, [`la droite de régression $y = ax + b$ a pour pente $a = ${nL(a)}$, avec $${MX} = ${mx}$ et $${MY} = ${my}$. Calcule $b$.`, `on a $a = ${nL(a)}$, $${MX} = ${mx}$ et $${MY} = ${my}$. Que vaut $b$ dans la droite de régression $y = ax + b$ ?`, `avec $${MX} = ${mx}$, $${MY} = ${my}$ et la pente $a = ${nL(a)}$, trouve l'ordonnée à l'origine $b$ de la droite de régression $y = ax + b$.`]),
      b,
      expl(DEF_REG, "La droite passe par le point moyen.", `$b = ${my} - ${a < 0 ? `(${nL(a)})` : nL(a)} \\times ${mx} = ${nL(b)}$.`, `$b = ${nL(b)}$.`),
    );
  }),
  tpl(M3, 4, 1, "Remplace x par x̄ : on doit retrouver ȳ.", () => {
    const a = un([-3, -2, -1.5, 0.5, 1.5, 2, 3, 4]);
    const mx = entre(2, 12) * 2;
    const my = entre(20, 90);
    const b = my - a * mx;
    const dr = (p: number, q: number) => `$y = ${somme([T(p * 2, 2, "x"), T(q * 2, 2)])}$`;
    const j = dr(a, b);
    const tr = (v: number) => (Number.isInteger(v) ? v : v);
    return qcm(
      phrase(SERIE, [`le point moyen est $G(${mx}\\,;${my})$. Quelle droite peut être la droite de régression de $y$ en $x$ ?`, `on trouve $${MX} = ${mx}$ et $${MY} = ${my}$. Quelle équation peut être celle de la droite de régression ?`, `$G(${mx}\\,;${my})$ est le point moyen. Laquelle de ces droites passe par $G$ ?`, `le point moyen $G(${mx}\\,;${my})$ doit être sur la droite de régression. Laquelle convient ?`]),
      j,
      [dr(a, tr(b + 3)), dr(a, tr(b - 5)), dr(-a, b), dr(a, tr(my)), dr(a + 1, b)],
      expl(DEF_REG, "La droite de régression passe par le point moyen.", `Pour $x = ${mx}$, ${j} donne $y = ${my}$.`, `C'est ${j}.`),
    );
  }),
  tpl(M3, 5, 2, "Calcule la covariance et la variance de x, puis divise.", () => {
    const s = serie();
    return court(
      `${un(VOICI)} ${un(["Calcule le coefficient directeur $a$ de la droite de régression de $y$ en $x$.", "Que vaut la pente $a$ de la droite de régression de $y$ en $x$ ?", "Détermine $a$ dans $y = ax + b$, la droite de régression de $y$ en $x$.", "Trouve le coefficient $a$ de la droite de régression de $y$ en $x$."])}`,
      net(pente(s)),
      expl(DEF_REG, `$${COV} = ${nL(cov(s))}$ et $${VX} = ${nL(vr(s.xs))}$.`, `$a = \\dfrac{${nL(cov(s))}}{${nL(vr(s.xs))}}$.`, `$a = ${nL(pente(s))}$.`),
      tableau(s),
    );
  }),
  tpl(M3, 6, 2, "Une fois a trouvé, calcule les moyennes pour obtenir b.", () => {
    const s = serie();
    return court(
      `${un(VOICI)} ${un(["Calcule $b$ dans $y = ax + b$, la droite de régression de $y$ en $x$.", "Que vaut l'ordonnée à l'origine $b$ de la droite de régression $y = ax + b$ ?", "Détermine $b$ dans la droite de régression $y = ax + b$.", "Trouve $b$ pour la droite de régression $y = ax + b$."])}`,
      net(ord(s)),
      expl(DEF_REG, `$a = ${nL(pente(s))}$, $${MX} = ${nL(moy(s.xs))}$, $${MY} = ${nL(moy(s.ys))}$.`, `$b = ${MY} - a\\,${MX}$.`, `$b = ${nL(ord(s))}$.`),
      tableau(s),
    );
  }),
  tpl(M3, 7, 2, "Calcule a, puis b, et compare.", () => {
    const s = serie({ court: true });
    const [a, b] = [net(pente(s)), net(ord(s))];
    const dr = (p: number, q: number) => `$y = ${nL(p).replace(/^1$/, "").replace(/^-1$/, "-")}x ${q < 0 ? "-" : "+"} ${nL(Math.abs(q))}$`;
    const j = dr(a, b);
    return qcm(
      `${un(VOICI)} ${un(["Quelle est l'équation de la droite de régression de $y$ en $x$ ?", "Quelle droite est la droite de régression de $y$ en $x$ ?", "Laquelle de ces équations est celle de la droite de régression de $y$ en $x$ ?", "Par les formules, quelle droite obtient-on ?"])}`,
      j,
      [dr(a, b + 2), dr(a + 1, b), dr(-a, b), dr(a, -b), dr(a + 0.5, b - 1)],
      expl(DEF_REG, `$a = \\dfrac{${nL(cov(s))}}{${nL(vr(s.xs))}} = ${nL(a)}$.`, `$b = ${nL(moy(s.ys))} - ${a < 0 ? `(${nL(a)})` : nL(a)} \\times ${nL(moy(s.xs))} = ${nL(b)}$.`, `La droite est ${j}.`),
      tableau(s),
    );
  }),
  tpl(M3, 8, 2, "Pour la droite de x en y, on divise par V(y).", () => {
    const vy = un([2, 4, 5, 8, 10, 16, 20, 25, 40]);
    const a = un([-2.5, -2, -1.5, -0.5, 0.5, 1.5, 2, 2.5, 0.25, -0.25]);
    const c = a * vy;
    return court(
      phrase(SERIE, [`on a $${COV} = ${nL(c)}$ et $${VY} = ${vy}$. Calcule $a'$ dans $x = a'y + b'$, la droite de régression de $x$ en $y$.`, `avec $${COV} = ${nL(c)}$ et $${VY} = ${vy}$, que vaut $a'$ dans $x = a'y + b'$, la droite de régression de $x$ en $y$ ?`, `sachant que $${VY} = ${vy}$ et $${COV} = ${nL(c)}$, trouve $a'$ pour la droite de régression de $x$ en $y$, notée $x = a'y + b'$.`]),
      a,
      expl(DEF_REG, "Pour la droite de $x$ en $y$, on échange les rôles : on divise par $V(y)$.", `$a' = \\dfrac{${nL(c)}}{${vy}} = ${nL(a)}$.`, `$a' = ${nL(a)}$.`),
    );
  }),
  tpl(M3, 9, 3, "Écris la droite, puis remplace x par la valeur demandée.", () => {
    const e = etude();
    const s = serie({ court: true });
    const x0 = Math.max(...s.xs) + entre(1, 4) * 2;
    const v = pente(s) * x0 + ord(s);
    return court(
      `${e.intro} ${un([`On utilise la droite de régression de « ${e.y} » en « ${e.x} ». Quelle valeur prévoit-elle pour $x = ${x0}$ ?`, `Avec la droite de régression de $y$ en $x$, quelle est la prévision pour $x = ${x0}$ ?`, `Estime $y$ pour $x = ${x0}$ par la droite de régression de $y$ en $x$.`, `Par la droite de régression de $y$ en $x$, que prévoit-on pour $x = ${x0}$ ?`])}`,
      net(v),
      expl(DEF_REG, `$a = ${nL(pente(s))}$ et $b = ${nL(ord(s))}$.`, `$y = ${nL(pente(s))} \\times ${x0} ${ord(s) < 0 ? "-" : "+"} ${nL(Math.abs(ord(s)))}$.`, `La prévision vaut $${nL(v)}$.`),
      tableau(s, e.x, e.y),
    );
  }),
  tpl(M3, 10, 3, "Cherche a, puis b, puis la prévision : aucune donnée ne manque.", () => {
    const ctx = un(INTERPRETES);
    const a = un([-3, -2, -1.5, -0.5, 0.5, 1.5, 2, 3, 4]);
    const vx = un([4, 5, 8, 10, 20]);
    const c = a * vx;
    const mx = entre(2, 12) * 2;
    const my = entre(30, 90);
    const x0 = mx + entre(1, 6) * 2;
    const v = a * (x0 - mx) + my;
    return court(
      `${ctx} On trouve $${COV} = ${nL(c)}$, $${VX} = ${vx}$, $${MX} = ${mx}$ et $${MY} = ${my}$. ${un([`Quelle valeur de $y$ la droite de régression de $y$ en $x$ prévoit-elle pour $x = ${x0}$ ?`, `Par la droite de régression de $y$ en $x$, que prévoit-on pour $x = ${x0}$ ?`, `Estime $y$ pour $x = ${x0}$ avec la droite de régression de $y$ en $x$.`, `Que donne la droite de régression de $y$ en $x$ pour $x = ${x0}$ ?`])}`,
      v,
      expl(DEF_REG, `$a = \\dfrac{${nL(c)}}{${vx}} = ${nL(a)}$.`, `$b = ${nL(my - a * mx)}$, puis on remplace $x$ par $${x0}$.`, `La prévision vaut $${nL(v)}$.`),
    );
  }),
  tpl(M3, 11, 3, "Le produit des deux pentes de régression vaut r².", () => {
    const ctx = un(INTERPRETES);
    const a1 = un([0.5, 0.8, 1.5, 2, -0.5, -0.8, -1.5, -2]);
    const a2 = (Math.sign(a1) * un([0.2, 0.25, 0.3, 0.4, 0.45])) as number;
    const r2 = a1 * a2;
    const v = Math.sqrt(r2) * Math.sign(a1);
    return arr(
      `${ctx} La droite de régression de $y$ en $x$ a pour pente $a = ${nL(a1)}$, celle de $x$ en $y$ a pour pente $a' = ${nL(a2)}$. ${un(["Sachant que $r^{2} = a \\times a'$, calcule $r$.", "Avec $a \\times a' = r^{2}$, que vaut le coefficient $r$ ?", "On a $r^{2} = a \\times a'$ : trouve $r$, avec le bon signe.", "Déduis-en $r$, sachant que $r^{2} = a \\times a'$."])} ${un(CENT)}`,
      v,
      0.01,
      expl(DEF_R, `$r^{2} = ${nL(a1)} \\times ${nL(a2)} = ${nL(r2)}$.`, `$r$ a le signe des pentes.`, `$r \\approx ${nL(Math.round(v * 100) / 100)}$.`),
    );
  }),
];
