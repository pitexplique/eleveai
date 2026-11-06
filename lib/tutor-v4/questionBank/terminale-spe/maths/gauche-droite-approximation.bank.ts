// LIMITES, CONTINUITÉ ET DÉRIVABILITÉ À GAUCHE ET À DROITE, APPROXIMATION AFFINE (06/11/2026).
// Masquées en France par prudence (registre `hors_france`) : le programme français définit la
// continuité par les limites, mais n'a ni nombres dérivés à gauche et à droite, ni demi-tangentes,
// ni approximation affine en capacité. Lignes visées : Maroc 1re bac AA-4c, AA-4d, 2e bac A2-1 ;
// Sénégal 1re AN 3 ; Côte d'Ivoire Tle C1-L2, C1-L3.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, nL, qcm, un } from "../../lycee-commun";
import { aff, cas, decale, enonce, figure, intro, nonNul, poly, queue, R, Rsauf, VERT } from "./courbes-commun";

const tpl = fabrique("terminale-spe", "gauche_droite_approximation", "tle_");

const M1 = "limite_gauche_droite";
const M2 = "derivabilite_gauche_droite";
const M3 = "approximation_affine";

const COTE = (s: number) => (s < 0 ? "gauche" : "droite");
const limC = (a: number, s: number) => `\\lim\\limits_{x \\to ${a}^{${s < 0 ? "-" : "+"}}}`;

/** Un morceau qui vaut v en a : l'écriture et sa dérivée en a. Une pente imposée donne une droite. */
function morceau(a: number, v: number, pente?: number): { s: string; d: number; f: (x: number) => number } {
  if (pente !== undefined) return { s: aff(pente, v - pente * a), d: pente, f: (x) => pente * (x - a) + v };
  const c = un([1, 1, -1, 2]);
  if (Math.random() < 0.5) {
    const m = nonNul(-4, 4);
    return { s: aff(m, v - m * a), d: m, f: (x) => m * (x - a) + v };
  }
  return { s: poly([c, "x^2"], [v - c * a * a, ""]), d: 2 * c * a, f: (x) => c * x * x + v - c * a * a };
}
const avant = (a: number, large = false) => `x ${large ? "\\leqslant" : "<"} ${a}`;
const apres = (a: number, large = true) => `x ${large ? "\\geqslant" : ">"} ${a}`;
/** Deux morceaux autour de a ; le point a va à gauche ou à droite. */
const deux = (g: string, d: string, a: number) => {
  const pointADroite = Math.random() < 0.5;
  return cas([
    [g, avant(a, !pointADroite)],
    [d, apres(a, pointADroite)],
  ]);
};
const ITR = ["Soit $f$ la fonction définie sur $\\mathbb{R}$ par :", "On considère la fonction $f$ définie sur $\\mathbb{R}$ par :", "Une fonction $f$ est définie par morceaux sur $\\mathbb{R}$ :", "La fonction $f$ change de formule en un point :", "Sur $\\mathbb{R}$, une fonction $f$ est donnée par :", "On étudie sur $\\mathbb{R}$ la fonction $f$ suivante :"];

/* ───────────────── continuité ───────────────── */

const exC = (calcul: string, conclusion: string) =>
  expl(
    "$f$ est continue en $a$ quand sa limite à gauche et sa limite à droite en $a$ existent et sont toutes deux égales à $f(a)$.",
    "pour une limite à gauche, on prend la formule valable pour $x < a$ ; pour une limite à droite, celle valable pour $x > a$.",
    calcul,
    conclusion,
  );
const C_OK = (a: number) => `Oui : $f$ est continue en $${a}$`;
const C_SAUT = "Non : les limites à gauche et à droite sont différentes";
const C_POINT = (a: number) => `Non : les deux limites sont égales, mais différentes de $f(${a})$`;
const C_DOUTE = "On ne peut pas conclure sans la courbe";
const Q_CONT = (a: number) => [`La fonction $f$ est-elle continue en $${a}$ ?`, `Que peut-on dire de la continuité de $f$ en $${a}$ ?`, `Étudie la continuité de $f$ en $${a}$.`, `Sa courbe se trace-t-elle sans lever le crayon en $${a}$ ?`, `Quelle conclusion tirer pour la continuité de $f$ en $${a}$ ?`];
const Q_LIM = (a: number, s: number) => [`Calcule $${limC(a, s)} f(x)$.`, `Que vaut la limite à ${COTE(s)} de $f$ en $${a}$ ?`, `Quelle est la limite de $f(x)$ quand $x$ tend vers $${a}$ par la ${COTE(s)} ?`, `Détermine la limite à ${COTE(s)} de $f$ en $${a}$.`, `Vers quelle valeur $f(x)$ tend-il quand $x$ s'approche de $${a}$ par la ${COTE(s)} ?`];

const CTX_K = [
  "Une cuve se remplit puis se vide. Son volume, en litres, après $x$ minutes, est modélisé par :",
  "L'altitude d'une randonneuse, en centaines de mètres, après $x$ heures, est modélisée par :",
  "La température d'un four de potier, en dizaines de degrés, après $x$ minutes, est modélisée par :",
  "La vitesse d'un train, en dizaines de kilomètres par heure, après $x$ minutes, est modélisée par :",
  "La hauteur d'eau d'une rivière, en décimètres, $x$ heures après un orage, est modélisée par :",
  "La charge d'une batterie de vélo, en pourcents, après $x$ dizaines de minutes, est modélisée par :",
  "La distance parcourue par une nageuse, en dizaines de mètres, après $x$ minutes, est modélisée par :",
  "La production d'un panneau solaire, en kilowatts, $x$ heures après le lever du jour, est modélisée par :",
];

/* ───────────────── dérivabilité ───────────────── */

const exD = (calcul: string, conclusion: string) =>
  expl(
    "le nombre dérivé à droite de $f$ en $a$ est la limite, pour $h$ tendant vers $0$ avec $h > 0$, de $\\dfrac{f(a + h) - f(a)}{h}$ ; à gauche, avec $h < 0$. $f$ est dérivable en $a$ quand ces deux nombres existent et sont égaux. S'ils diffèrent, la courbe a deux demi-tangentes et un point anguleux.",
    "on dérive la formule valable du côté demandé, puis on remplace $x$ par $a$.",
    calcul,
    conclusion,
  );
const D_OK = (a: number) => `$f$ est dérivable en $${a}$`;
const D_ANG = (a: number) => `$f$ n'est pas dérivable en $${a}$ : la courbe a un point anguleux`;
const D_DISC = (a: number) => `$f$ n'est pas continue en $${a}$`;
const D_VERT = (a: number) => `La courbe a une tangente verticale en $${a}$`;
const Q_ND = (a: number, s: number) => [`Calcule le nombre dérivé à ${COTE(s)} de $f$ en $${a}$.`, `Que vaut $f'_{${s < 0 ? "g" : "d"}}(${a})$, le nombre dérivé à ${COTE(s)} en $${a}$ ?`, `Quel est le nombre dérivé à ${COTE(s)} de $f$ en $${a}$ ?`, `Quelle est la pente de la demi-tangente à ${COTE(s)} au point d'abscisse $${a}$ ?`, `Détermine le coefficient directeur de la demi-tangente à ${COTE(s)} en $${a}$.`];
const Q_NAT = (a: number) => [`Que peut-on dire de $f$ en $${a}$ ?`, `Étudie la dérivabilité de $f$ en $${a}$.`, `Quelle est la bonne conclusion en $${a}$ ?`, `Sa courbe présente-t-elle un angle au point d'abscisse $${a}$ ?`, `$f$ est-elle dérivable en $${a}$ ?`];
const DT_V = "Une demi-tangente verticale";
const DT_H = "Une demi-tangente horizontale";
const DT_O = "Une demi-tangente ni verticale ni horizontale";
const DT_N = "Aucune demi-tangente";

const CTX_RAC = [
  "Une piste de ski suit, en dizaines de mètres, le profil :",
  "Un toboggan de parc aquatique suit, en mètres, le profil :",
  "Une voie ferrée de montagne suit, en centaines de mètres, le tracé :",
  "Une route de col suit, en centaines de mètres, le tracé :",
  "Un rail de montagnes russes suit, en mètres, le profil :",
  "Un drone suit, en mètres, la trajectoire :",
  "Une rampe de skateboard suit, en mètres, le profil :",
  "La couverture d'un stade suit, en mètres, le profil :",
];

/* ───────────────── approximation affine ───────────────── */

const exA = (calcul: string, conclusion: string) =>
  expl(
    "si $f$ est dérivable en $a$, alors pour $h$ proche de $0$ : $f(a + h) \\approx f(a) + h f'(a)$. C'est dire qu'on remplace la courbe par sa tangente en $a$.",
    "on repère $a$ et $h$, on calcule $f(a)$ et $f'(a)$, puis on remplace dans la formule.",
    calcul,
    conclusion,
  );
const dec = (x: number) => nL(x);
/** Une fonction usuelle : écriture, dérivée, points a où tout tombe juste. */
type U = { s: string; f: (x: number) => number; d: (x: number) => number; as: number[] };
const USUELLES: U[] = [
  { s: "x^2", f: (x) => x * x, d: (x) => 2 * x, as: [1, 2, 3, 4, 5, 10] },
  { s: "x^3", f: (x) => x ** 3, d: (x) => 3 * x * x, as: [1, 2, 3, 4] },
  { s: "\\sqrt{x}", f: Math.sqrt, d: (x) => 0.5 / Math.sqrt(x), as: [1, 4, 25, 100] },
  { s: "\\dfrac{1}{x}", f: (x) => 1 / x, d: (x) => -1 / (x * x), as: [1, 2, 4, 5, 10] },
  { s: "3x^2 + 1", f: (x) => 3 * x * x + 1, d: (x) => 6 * x, as: [1, 2, 3] },
  { s: "x^2 - 4x", f: (x) => x * x - 4 * x, d: (x) => 2 * x - 4, as: [1, 3, 5, 6] },
];
const HS = [0.1, 0.2, 0.05, 0.02, 0.01, -0.1, -0.2, -0.05, -0.02, -0.01];
const arr = (x: number) => Math.round(x * 1e6) / 1e6;
const Q_APPROX = (cible: string) => [`Donne une valeur approchée de $${cible}$ avec la tangente.`, `Avec l'approximation affine en ce point, quelle valeur approchée de $${cible}$ obtiens-tu ?`, `Utilise $f(a + h) \\approx f(a) + h f'(a)$ pour estimer $${cible}$.`, `Sans calculer exactement, estime $${cible}$ avec l'approximation affine.`, `Quelle estimation de $${cible}$ la tangente donne-t-elle ?`, `Remplace la courbe par sa tangente : que devient $${cible}$ ?`];

/* Valeurs usuelles près de 1 ou de 0, base = x (voir le correcteur). */
const PETITS: [string, number, number, number][] = [
  ["\\sqrt{@}", 1, 1, 0.5],
  ["(@)^{2}", 1, 1, 2],
  ["(@)^{3}", 1, 1, 3],
  ["(@)^{4}", 1, 1, 4],
  ["\\dfrac{1}{@}", 1, 1, -1],
  ["\\mathrm{e}^{@}", 0, 1, 1],
  ["\\ln(@)", 1, 0, 1],
  ["\\sin(@)", 0, 0, 1],
];

const CTX_APPROX: { t: string; L: string; v: string; s: string; f: (x: number) => number; d: (x: number) => number; as: number[]; hs: number[]; unite: string }[] = [
  { t: "Un cube de métal a une arête de $x$ centimètres, et son volume vaut :", L: "V", v: "x", s: "x^3", f: (x) => x ** 3, d: (x) => 3 * x * x, as: [2, 3, 4, 5, 10], hs: [0.1, 0.01, 0.02, 0.05], unite: "centimètres cubes" },
  { t: "Une plaque carrée a un côté de $x$ mètres, et son aire vaut :", L: "A", v: "x", s: "x^2", f: (x) => x * x, d: (x) => 2 * x, as: [3, 5, 8, 10, 20], hs: [0.1, 0.02, 0.05, -0.1], unite: "mètres carrés" },
  { t: "Un pendule de longueur $x$ mètres a une période, en secondes, proche de :", L: "T", v: "x", s: "2\\sqrt{x}", f: (x) => 2 * Math.sqrt(x), d: (x) => 1 / Math.sqrt(x), as: [1, 4, 25, 100], hs: [0.1, 0.2, -0.1, 0.5], unite: "secondes" },
  { t: "Depuis une hauteur de $x$ mètres, l'horizon est à une distance, en kilomètres, proche de :", L: "D", v: "x", s: "3{,}6\\sqrt{x}", f: (x) => 3.6 * Math.sqrt(x), d: (x) => 1.8 / Math.sqrt(x), as: [4, 25, 100], hs: [0.1, 0.5, -0.5, 0.2], unite: "kilomètres" },
  { t: "Une éolienne, pour un vent de $x$ mètres par seconde, fournit une puissance, en watts, proche de :", L: "P", v: "x", s: "2x^3", f: (x) => 2 * x ** 3, d: (x) => 6 * x * x, as: [5, 8, 10], hs: [0.1, 0.2, -0.1], unite: "watts" },
  { t: "La distance de freinage d'un cycliste, à la vitesse de $x$ mètres par seconde, vaut, en mètres :", L: "F", v: "x", s: "0{,}2x^2", f: (x) => 0.2 * x * x, d: (x) => 0.4 * x, as: [5, 10, 20], hs: [0.5, 1, -0.5], unite: "mètres" },
  { t: "Dans un jeu vidéo, le score gagné au niveau $x$ vaut :", L: "G", v: "x", s: "x^2 + 3x", f: (x) => x * x + 3 * x, d: (x) => 2 * x + 3, as: [2, 5, 10], hs: [0.1, 0.2, -0.1], unite: "points" },
  { t: "Une lentille placée à $x$ centimètres d'un capteur donne un grossissement de :", L: "G", v: "x", s: "\\dfrac{100}{x}", f: (x) => 100 / x, d: (x) => -100 / (x * x), as: [5, 10, 20], hs: [0.1, 0.5, -0.5], unite: "fois" },
];

const CTX_PCT: { t: (p: string) => string; n: number }[] = [
  { n: 2, t: (p) => `Le côté d'une parcelle carrée augmente de $${p}$ %. Son aire vaut $A = c^{2}$.` },
  { n: 3, t: (p) => `L'arête d'un cube de glace augmente de $${p}$ %. Son volume vaut $V = c^{3}$.` },
  { n: 0.5, t: (p) => `La longueur d'un pendule augmente de $${p}$ %. Sa période est proportionnelle à $\\sqrt{L}$.` },
  { n: 2, t: (p) => `Le rayon d'un disque de frein augmente de $${p}$ %. Son aire est proportionnelle à $r^{2}$.` },
  { n: 3, t: (p) => `Le rayon d'une bille augmente de $${p}$ %. Son volume est proportionnel à $r^{3}$.` },
  { n: 3, t: (p) => `La vitesse du vent augmente de $${p}$ %. La puissance d'une éolienne est proportionnelle à $v^{3}$.` },
  { n: 2, t: (p) => `La vitesse d'une voiture augmente de $${p}$ %. La distance de freinage est proportionnelle à $v^{2}$.` },
  { n: 0.5, t: (p) => `La hauteur d'un phare augmente de $${p}$ %. La distance de l'horizon est proportionnelle à $\\sqrt{h}$.` },
  { n: 2, t: (p) => `Le diamètre d'un tuyau augmente de $${p}$ %. Son débit est proportionnel à $d^{2}$.` },
];

export const gaucheDroiteApproximationBank: TutorBankItemV4[] = [
  /* ===== limite_gauche_droite ===== */
  tpl(M1, 1, 1, "Prends la formule valable du côté demandé, puis remplace x par la valeur.", () => {
    const a = nonNul(-3, 5);
    const G = nonNul(-8, 9);
    const D = nonNul(-8, 9);
    const s = un([-1, 1]);
    const v = s < 0 ? G : D;
    return court(enonce(un(ITR), `f(x) = ${deux(morceau(a, G).s, morceau(a, D).s, a)}`, un(Q_LIM(a, s))), v, exC(`Du côté ${s < 0 ? "gauche" : "droit"}, la formule donne $${v}$ en $${a}$.`, `La limite à ${COTE(s)} vaut $${v}$.`));
  }),
  tpl(M1, 2, 1, "Calcule les deux limites et f(a), puis compare les trois valeurs.", () => {
    const a = nonNul(-3, 5);
    const G = nonNul(-8, 9);
    const type = un([0, 1, 2]);
    const D = type === 1 ? G + nonNul(-4, 4) : G;
    const fx = type === 2 ? cas([[morceau(a, G).s, `x \\neq ${a}`], [String(G + nonNul(1, 4)), `x = ${a}`]]) : deux(morceau(a, G).s, morceau(a, D).s, a);
    const juste = type === 0 ? C_OK(a) : type === 1 ? C_SAUT : C_POINT(a);
    return qcm(enonce(un(ITR), `f(x) = ${fx}`, un(Q_CONT(a))), juste, [C_OK(a), C_SAUT, C_POINT(a), C_DOUTE], exC(type === 1 ? `Les deux limites valent $${G}$ et $${D}$.` : type === 2 ? `Les limites valent $${G}$, mais $f(${a})$ a une autre valeur.` : `Les limites et $f(${a})$ valent $${G}$.`, type === 0 ? `$f$ est continue en $${a}$.` : `$f$ n'est pas continue en $${a}$.`));
  }),
  tpl(M1, 3, 1, "Continuité : les trois valeurs doivent être égales.", () => {
    const a = nonNul(-3, 5);
    const G = nonNul(-8, 9);
    const type = un([0, 1, 2]);
    const D = type === 1 ? G + nonNul(-4, 4) : G;
    const V = type === 2 ? G + nonNul(1, 4) : type === 1 ? un([G, D]) : G;
    const dit = un(["Pour une fonction $f$, on a mesuré :", "Une étude de la fonction $f$ donne :", "On a calculé, pour une fonction $f$ :", "Une fonction $f$ vérifie :"]);
    const juste = type === 0 ? C_OK(a) : type === 1 ? C_SAUT : C_POINT(a);
    return qcm(`${dit}\n\n$${limC(a, -1)} f(x) = ${G}$\n\n$${limC(a, 1)} f(x) = ${D}$\n\n$f(${a}) = ${V}$\n\n${un(Q_CONT(a))}`, juste, [C_OK(a), C_SAUT, C_POINT(a), C_DOUTE], exC(`On compare $${G}$, $${D}$ et $${V}$.`, type === 0 ? "Les trois valeurs sont égales : $f$ est continue." : "Les trois valeurs ne sont pas égales : $f$ n'est pas continue."));
  }),
  tpl(M1, 4, 1, "Sur la figure, suis le segment jusqu'à son extrémité, du côté demandé.", () => {
    const a = entre(1, 4);
    const G = entre(-3, 5);
    const D = G + nonNul(-3, 3);
    const s = un([-1, 1]);
    const [mg, md] = [un([1, -1, 0]), un([1, -1, 0])];
    const fig = figure({
      xmin: a - 3,
      xmax: a + 3,
      ymin: Math.min(G, D) - 4,
      ymax: Math.max(G, D) + 4,
      branches: [
        [{ x: a - 3, y: G - 3 * mg }, { x: a, y: G }],
        [{ x: a, y: D }, { x: a + 3, y: D + 3 * md }],
      ],
    });
    const q = un([`D'après la courbe, que vaut la limite à ${COTE(s)} de $f$ en $${a}$ ?`, `Lis sur la figure la limite à ${COTE(s)} de $f$ en $${a}$.`, `La figure montre la courbe de $f$ : quelle est sa limite à ${COTE(s)} en $${a}$ ?`, `Quand $x$ s'approche de $${a}$ par la ${COTE(s)}, vers quelle valeur $f(x)$ tend-il sur la figure ?`, `Sur le graphique, vers quel nombre $f(x)$ tend-il en $${a}$ par la ${COTE(s)} ?`, `Trouve sur le graphique $${limC(a, s)} f(x)$.`, `Sur la figure, la courbe saute en $x = ${a}$. Quelle est sa limite à ${COTE(s)} ?`, `Que lit-on sur la figure pour la limite à ${COTE(s)} de $f$ en $${a}$ ?`, `La courbe de $f$ a un saut. Lis sa limite à ${COTE(s)} en $${a}$.`, `Avec la figure, donne la limite de $f$ à ${COTE(s)} de $${a}$.`]);
    return court(q, s < 0 ? G : D, exC(`Le morceau de ${COTE(s)} arrive à la hauteur $${s < 0 ? G : D}$.`, `La limite vaut $${s < 0 ? G : D}$.`), fig);
  }),

  tpl(M1, 5, 2, "Écris que les deux formules donnent la même valeur au point de raccord.", () => {
    const a = nonNul(-3, 5);
    const v = nonNul(-8, 9);
    const k = nonNul(-5, 6);
    const p = v - k * a;
    const kInv = un<[string, number]>([
      [p === 0 ? "kx" : `kx ${p < 0 ? "-" : "+"} ${Math.abs(p)}`, k],
      [poly([1, "x^2"]) + " + k", v - a * a],
      [`k - ${aff(1, 0)}`, v + a],
    ]);
    const q = un(["Pour quelle valeur de $k$ la fonction $f$ est-elle continue sur $\\mathbb{R}$ ?", "Trouve $k$ pour que $f$ soit continue.", "Quelle valeur de $k$ rend $f$ continue ?", `Détermine $k$ pour que $f$ soit continue en $${a}$.`, "Calcule $k$ pour que la courbe de $f$ n'ait pas de saut."]);
    return court(enonce(un(ITR), `f(x) = ${deux(morceau(a, v).s, kInv[0], a)}`, q), kInv[1], exC(`On veut que la limite à droite vaille $${v}$, la valeur de la formule de gauche.`, `$k = ${kInv[1]}$.`));
  }),
  tpl(M1, 6, 2, "Selon le côté, |x − a| vaut x − a ou −(x − a).", () => {
    const a = nonNul(-3, 5);
    const c = entre(1, 6);
    const k = nonNul(-6, 6);
    const s = un([-1, 1]);
    const v = s * c + k;
    const sc = c === 1 ? "" : c;
    return court(enonce(intro(Rsauf(a)), `f(x) = ${k} + \\dfrac{${sc}|${decale(a)}|}{${decale(a)}}`, un(Q_LIM(a, s))), v, exC(`Pour $x ${s < 0 ? "<" : ">"} ${a}$, le quotient vaut $${s * c}$.`, `La limite vaut $${v}$.`));
  }),
  tpl(M1, 7, 2, "Simplifie la fraction : le dénominateur se factorise dans le numérateur.", () => {
    const a = un([1, 4, 25, 100]);
    const p = nonNul(-6, 6);
    const b = nonNul(-5, 6);
    const racine = Math.random() < 0.3;
    const f = racine ? `\\dfrac{\\sqrt{x} - ${Math.sqrt(a)}}{x - ${a}}` : `\\dfrac{${poly([1, "x^2"], [p - b, "x"], [-p * b, ""])}}{${decale(b)}}`;
    const pt = racine ? a : b;
    const val = racine ? 1 / (2 * Math.sqrt(a)) : b + p;
    const dit = `Pour $x \\neq ${pt}$, on pose :`;
    const q = un([`Quelle valeur faut-il donner à $f(${pt})$ pour que $f$ soit continue en $${pt}$ ?`, `Quelle est la limite de $f$ en $${pt}$ ?`, `On veut prolonger $f$ par continuité en $${pt}$. Quelle valeur choisir ?`, `Par quel nombre prolonger $f$ en $${pt}$ pour qu'elle soit continue ?`, `Calcule la limite de $f(x)$ quand $x$ tend vers $${pt}$.`]);
    return court(enonce(dit, `f(x) = ${f}`, q), val, exC(racine ? `On multiplie par la quantité conjuguée : $f(x) = \\dfrac{1}{\\sqrt{x} + ${Math.sqrt(a)}}$.` : `Après simplification : $f(x) = ${aff(1, p)}$.`, `La valeur est $${nL(val)}$.`));
  }),
  tpl(M1, 8, 2, "Regarde le signe du dénominateur juste à côté de la valeur interdite.", () => {
    const a = nonNul(-3, 5);
    const c = nonNul(-7, 7);
    const b = nonNul(-5, 5);
    const s = un([-1, 1]);
    const f = `${b} ${queue(c, decale(a))}`;
    const pos = c * s > 0;
    return qcm(enonce(intro(Rsauf(a)), `f(x) = ${f}`, un(Q_LIM(a, s))), pos ? "$+\\infty$" : "$-\\infty$", [pos ? "$-\\infty$" : "$+\\infty$", `$${b}$`, "$0$", `$${c}$`], exC(`Pour $x ${s < 0 ? "<" : ">"} ${a}$, $${decale(a)}$ est ${s < 0 ? "négatif" : "positif"} et tend vers $0$.`, `La limite vaut ${pos ? "$+\\infty$" : "$-\\infty$"}.`));
  }),

  tpl(M1, 9, 3, "Il n'y a pas de saut dans la réalité : les deux formules se raccordent.", () => {
    const a = entre(2, 6);
    const k = entre(1, 6);
    const m = entre(1, 4);
    const v = m * a + entre(2, 12);
    const p = v - k * a;
    const dPart = p === 0 ? "kx" : `kx ${p < 0 ? "-" : "+"} ${Math.abs(p)}`;
    const q = un(["Le modèle ne doit pas présenter de saut. Que vaut $k$ ?", "La grandeur ne fait aucun saut. Trouve $k$.", "Calcule $k$ pour que la courbe soit continue.", `Quelle valeur de $k$ rend le raccord continu en $x = ${a}$ ?`, "Détermine $k$ pour que le modèle soit continu."]);
    return court(enonce(un(CTX_K), `f(x) = ${cas([[aff(m, v - m * a), avant(a)], [dPart, apres(a)]])}`, q), k, exC(`En $${a}$, la première formule donne $${v}$ : on résout $${a}k ${p < 0 ? "-" : "+"} ${Math.abs(p)} = ${v}$.`, `$k = ${k}$.`));
  }),
  tpl(M1, 10, 3, "Étudie chaque point de raccord : compare les valeurs des deux formules voisines.", () => {
    const a = entre(-2, 1);
    const b = a + entre(2, 4);
    const v = nonNul(-5, 6);
    const typ = un([0, 1, 2, 3]);
    const dA = typ === 0 || typ === 3 ? nonNul(1, 3) : 0;
    const dB = typ === 1 || typ === 3 ? nonNul(1, 3) : 0;
    const m = nonNul(-2, 3);
    const w = v + m * (b - a);
    const f1 = morceau(a, v - dA).s;
    const f2 = aff(m, v - m * a);
    const f3 = morceau(b, w + dB).s;
    const juste = typ === 0 ? `En $${a}$ seulement` : typ === 1 ? `En $${b}$ seulement` : typ === 3 ? `En $${a}$ et en $${b}$` : "Nulle part";
    const q = un(["En quels points $f$ n'est-elle pas continue ?", "Où la courbe de $f$ présente-t-elle un saut ?", "Quels sont les points de discontinuité de $f$ ?", "En quels points faut-il lever le crayon pour tracer la courbe de $f$ ?", "Où $f$ n'est-elle pas continue ?"]);
    return qcm(
      enonce(un(ITR), `f(x) = ${cas([[f1, avant(a)], [f2, `${a} \\leqslant x < ${b}`], [f3, apres(b)]])}`, q),
      juste,
      [`En $${a}$ seulement`, `En $${b}$ seulement`, `En $${a}$ et en $${b}$`, "Nulle part"],
      exC("On calcule les limites à gauche et à droite en chaque point de raccord.", `Réponse : ${juste.charAt(0).toLowerCase()}${juste.slice(1)}.`),
    );
  }),
  tpl(M1, 11, 3, "Juste avant un entier n, la partie entière vaut n − 1 ; juste après, elle vaut n.", () => {
    const n = nonNul(-3, 6);
    const s = un([-1, 1]);
    const c = entre(2, 5);
    const k = nonNul(-5, 5);
    const E = s < 0 ? n - 1 : n;
    const [f, v] = un<[string, number]>([
      ["E(x)", E],
      ["x - E(x)", n - E],
      [`${c}E(x) ${k < 0 ? "-" : "+"} ${Math.abs(k)}`, c * E + k],
      [`E(x) - x`, E - n],
    ]);
    const dit = un(["On note $E(x)$ la partie entière de $x$, le plus grand entier inférieur ou égal à $x$. Soit :", "La partie entière $E(x)$ de $x$ est le plus grand entier inférieur ou égal à $x$. On pose :", "Avec $E(x)$, la partie entière de $x$ (le plus grand entier inférieur ou égal à $x$), on définit :"]);
    return court(enonce(dit, `f(x) = ${f}`, un(Q_LIM(n, s))), v, exC(`Juste ${s < 0 ? "avant" : "après"} $${n}$, on a $E(x) = ${E}$.`, `La limite vaut $${v}$.`));
  }),

  /* ===== derivabilite_gauche_droite ===== */
  tpl(M2, 1, 1, "Dérive la formule valable du côté demandé, puis remplace x.", () => {
    const a = nonNul(-3, 5);
    const v = nonNul(-8, 9);
    const g = morceau(a, v);
    const d = morceau(a, v);
    const s = un([-1, 1]);
    const y = s < 0 ? g.d : d.d;
    return court(enonce(un(ITR), `f(x) = ${deux(g.s, d.s, a)}`, un(Q_ND(a, s))), y, exD(`On dérive la formule de ${COTE(s)}, puis on prend $x = ${a}$.`, `Le nombre dérivé à ${COTE(s)} vaut $${y}$.`));
  }),
  tpl(M2, 2, 1, "Dérivable : mêmes nombres dérivés des deux côtés.", () => {
    const a = nonNul(-3, 5);
    const g = nonNul(-6, 6);
    const egaux = Math.random() < 0.45;
    const d = egaux ? g : g + nonNul(-4, 4);
    const dit = un(["Une fonction $f$, continue, vérifie :", "Pour une fonction $f$ continue, on a calculé :", "Une étude de la fonction continue $f$ donne :", "La fonction $f$ est continue et :"]);
    const juste = egaux ? D_OK(a) : D_ANG(a);
    return qcm(`${dit}\n\n$f'_{g}(${a}) = ${g}$\n\n$f'_{d}(${a}) = ${d}$\n\n${un(Q_NAT(a))}`, juste, [D_OK(a), D_ANG(a), D_DISC(a), D_VERT(a)], exD(`On compare $${g}$ et $${d}$.`, egaux ? "Ils sont égaux : $f$ est dérivable." : "Ils diffèrent : la courbe a un point anguleux."));
  }),
  tpl(M2, 3, 1, "Selon le côté, retire les barres : |x − a| vaut x − a ou −(x − a).", () => {
    const a = nonNul(-3, 5);
    const c = un([1, 2, 3, 4, -1, -2, -3]);
    const k = nonNul(-6, 6);
    const s = un([-1, 1]);
    const sc = c === 1 ? "" : c === -1 ? "-" : c;
    return court(enonce(intro(R), `f(x) = ${sc}|${decale(a)}| ${k < 0 ? "-" : "+"} ${Math.abs(k)}`, un(Q_ND(a, s))), s * c, exD(`Pour $x ${s < 0 ? "<" : ">"} ${a}$, $|${decale(a)}| = ${s < 0 ? `-(${decale(a)})` : decale(a)}$.`, `Le nombre dérivé vaut $${s * c}$.`));
  }),
  tpl(M2, 4, 1, "La limite du taux de variation, d'un seul côté, est le nombre dérivé de ce côté.", () => {
    const a = nonNul(-3, 5);
    const m = nonNul(-7, 7);
    const s = un([-1, 1]);
    const dit = un(["Pour une fonction $f$, on a calculé :", "Une fonction $f$ vérifie :", "Une étude de la fonction $f$ donne :", "On a établi, pour la fonction $f$ :"]);
    const fh = `f(${a} + h) - f(${a})`;
    const q = un([`Quelle est la pente de la demi-tangente à ${COTE(s)} au point d'abscisse $${a}$ ?`, `Que vaut le nombre dérivé à ${COTE(s)} de $f$ en $${a}$ ?`, `Quel est le coefficient directeur de la demi-tangente à ${COTE(s)} en $${a}$ ?`, `Que vaut $f'_{${s < 0 ? "g" : "d"}}(${a})$ ?`, `Déduis-en le nombre dérivé à ${COTE(s)} en $${a}$.`]);
    return court(`${dit}\n\n$\\lim\\limits_{h \\to 0^{${s < 0 ? "-" : "+"}}} \\dfrac{${fh}}{h} = ${m}$\n\n${q}`, m, exD(`Cette limite du taux, avec $h ${s < 0 ? "<" : ">"} 0$, est le nombre dérivé à ${COTE(s)}.`, `La valeur est $${m}$.`));
  }),

  tpl(M2, 5, 2, "Calcule les nombres dérivés à gauche et à droite, puis compare-les.", () => {
    const a = nonNul(-3, 5);
    const v = nonNul(-8, 9);
    const g = morceau(a, v);
    const egaux = Math.random() < 0.45;
    const d = egaux ? morceau(a, v, g.d) : morceau(a, v, g.d + nonNul(-3, 3));
    const juste = egaux ? D_OK(a) : D_ANG(a);
    return qcm(enonce(un(ITR), `f(x) = ${deux(g.s, d.s, a)}`, un(Q_NAT(a))), juste, [D_OK(a), D_ANG(a), D_DISC(a), D_VERT(a)], exD(`$f'_{g}(${a}) = ${g.d}$ et $f'_{d}(${a}) = ${d.d}$. La fonction est bien continue en $${a}$.`, egaux ? `$f$ est dérivable en $${a}$.` : "La courbe a un point anguleux."));
  }),
  tpl(M2, 6, 2, "La demi-tangente passe par le point de raccord, avec la pente du côté demandé.", () => {
    const a = nonNul(-3, 4);
    const v = nonNul(-7, 8);
    const g = morceau(a, v);
    const d = morceau(a, v, g.d + nonNul(-3, 3));
    const s = un([-1, 1]);
    const c = s < 0 ? g : d;
    const y = (m: number) => `$y = ${aff(m, v - m * a)}$`;
    const q = un([`Quelle droite porte la demi-tangente à ${COTE(s)} au point d'abscisse $${a}$ ?`, `Donne l'équation de la demi-tangente à ${COTE(s)} en $${a}$.`, `Quelle est l'équation de la droite qui prolonge la demi-tangente à ${COTE(s)} en $${a}$ ?`, `Laquelle de ces droites est la demi-tangente à ${COTE(s)} en $${a}$ ?`, `Sur quelle droite se trouve la demi-tangente à ${COTE(s)} de la courbe en $${a}$ ?`]);
    const autre = s < 0 ? d : g;
    return qcm(enonce(un(ITR), `f(x) = ${deux(g.s, d.s, a)}`, q), y(c.d), [y(autre.d), `$y = ${aff(c.d, v)}$`, `$y = ${aff(c.d, -v - c.d * a)}$`, y(-c.d), y(c.d + 1), y(c.d - 1), y(c.d + 2), `$y = ${aff(c.d, a)}$`], exD(`La pente est $${c.d}$ et le point est $(${a}\\,;${v})$ : $y = ${c.d}(x ${a < 0 ? "+" : "-"} ${Math.abs(a)}) ${v < 0 ? "-" : "+"} ${Math.abs(v)}$.`, `L'équation est ${y(c.d)}.`));
  }),
  tpl(M2, 7, 2, "Calcule le taux de variation et cherche sa limite quand h tend vers 0.", () => {
    const a = nonNul(-3, 5);
    const k = entre(1, 6);
    const b = nonNul(-5, 5);
    const coef = k === 1 ? "" : String(k);
    const vers = decale(a);
    const avantA = aff(-1, a).replace(/^-x( [-+] )(\d+)$/, (_, s, n) => (s === " + " ? `${n} - x` : `-${n} - x`));
    const sb = `${b < 0 ? "-" : "+"} ${Math.abs(b)}`;
    const [f, dom, juste, s] = un<[string, string, string, number]>([
      [`${coef}\\sqrt{${vers}} ${sb}`, `[${a}\\,;+\\infty[`, DT_V, 1],
      [`${coef}\\sqrt{${avantA}} ${sb}`, `]-\\infty\\,;${a}]`, DT_V, -1],
      [`(${vers})\\sqrt{${vers}} ${sb}`, `[${a}\\,;+\\infty[`, DT_H, 1],
      [`(${vers})^2 ${sb}`, R, DT_H, 1],
      [`${coef}|${vers}| ${sb}`, R, DT_O, un([-1, 1])],
    ]);
    const q = un([`Au point d'abscisse $${a}$, que présente sa courbe, à ${COTE(s)} ?`, `Quelle demi-tangente sa courbe a-t-elle à ${COTE(s)} en $${a}$ ?`, `Décris sa courbe à ${COTE(s)} du point d'abscisse $${a}$.`, `Étudie le taux de variation à ${COTE(s)} en $${a}$ : que présente la courbe ?`, `Que peut-on dire de la courbe à ${COTE(s)} en $${a}$ ?`]);
    return qcm(enonce(intro(dom), `f(x) = ${f}`, q), juste, [DT_V, DT_H, DT_O, DT_N], exD(`Le taux de variation, à ${COTE(s)} de $${a}$, a pour limite ${juste === DT_V ? "l'infini" : juste === DT_H ? "$0$" : "un nombre non nul"}.`, `La courbe a : ${juste.charAt(0).toLowerCase()}${juste.slice(1)}.`));
  }),
  tpl(M2, 8, 2, "Lis la pente du segment du côté demandé : ce que l'on monte pour 1 vers la droite.", () => {
    const a = entre(-1, 2);
    const v = entre(-2, 2);
    const mg = nonNul(-2, 2);
    let md = nonNul(-2, 2);
    if (md === mg) md = -mg;
    const s = un([-1, 1]);
    const X = 3;
    const fig = figure({
      xmin: a - X,
      xmax: a + X,
      ymin: Math.min(v, v - X * mg, v + X * md) - 1,
      ymax: Math.max(v, v - X * mg, v + X * md) + 1,
      branches: [
        [{ x: a - X, y: v - X * mg }, { x: a, y: v }],
        [{ x: a, y: v }, { x: a + X, y: v + X * md }],
      ],
      points: [{ x: a, y: v, label: "A" }],
    });
    const y = s < 0 ? mg : md;
    const q = un([`D'après la figure, que vaut le nombre dérivé à ${COTE(s)} en A ?`, `La courbe de $f$ a un point anguleux en A. Lis le nombre dérivé à ${COTE(s)}.`, `Lis sur la figure la pente de la demi-tangente à ${COTE(s)} en A.`, `Sur le graphique, quel est le coefficient directeur de la demi-tangente à ${COTE(s)} en A ?`, `Quel nombre dérivé à ${COTE(s)} lis-tu en A sur la figure ?`, `La figure montre un point anguleux en A : que vaut le nombre dérivé à ${COTE(s)} ?`, `En suivant le segment à ${COTE(s)} de A, trouve le nombre dérivé à ${COTE(s)}.`, `Que vaut, d'après la figure, la pente à ${COTE(s)} de A ?`]);
    return court(q, y, exD(`Le segment à ${COTE(s)} de A a pour pente $${y}$.`, `Le nombre dérivé à ${COTE(s)} vaut $${y}$.`), fig);
  }),

  tpl(M2, 9, 3, "Il faut d'abord la continuité au point de raccord, puis l'égalité des deux pentes.", () => {
    const a = nonNul(-3, 5);
    const v = nonNul(-6, 7);
    const g = morceau(a, v);
    const k = g.d;
    const p = v - k * a;
    const dPart = p === 0 ? "kx" : `kx ${p < 0 ? "-" : "+"} ${Math.abs(p)}`;
    const q = un([`Quelle valeur de $k$ rend $f$ dérivable en $${a}$ ?`, `Trouve $k$ pour que $f$ soit dérivable en $${a}$.`, "Pour quelle valeur de $k$ la courbe n'a-t-elle pas d'angle ?", `Détermine $k$ pour que le raccord en $${a}$ soit sans point anguleux.`, "Calcule $k$ pour que $f$ soit dérivable."]);
    return court(enonce(un(ITR), `f(x) = ${deux(g.s, dPart, a)}`, q), k, exD(`La pente de gauche en $${a}$ vaut $${g.d}$ : la pente de droite doit être la même.`, `$k = ${k}$.`));
  }),
  tpl(M2, 10, 3, "Deux conditions, deux inconnues : même valeur et même pente au raccord.", () => {
    const a = nonNul(-3, 5);
    const c = un([1, 1, -1, 2]);
    const e = nonNul(-5, 5);
    const m = 2 * c * a;
    const p = c * a * a + e - m * a;
    const demande = un(["m", "p"]);
    const q = un([`Pour que $f$ soit dérivable en $${a}$, que vaut $${demande}$ ?`, `$f$ est dérivable en $${a}$. Calcule $${demande}$.`, `La courbe n'a pas d'angle en $${a}$. Trouve $${demande}$.`, `Détermine $${demande}$ pour que $f$ soit dérivable en $${a}$.`, `Quelle valeur de $${demande}$ rend $f$ dérivable en $${a}$ ?`]);
    const v = demande === "m" ? m : p;
    return court(enonce(un(ITR), `f(x) = ${deux(poly([c, "x^2"], [e, ""]), "mx + p", a)}`, q), v, exD(`Même pente : $m = ${m}$. Même valeur : $${m} \\times ${a < 0 ? `(${a})` : a} + p = ${c * a * a + e}$.`, `$${demande} = ${v}$.`));
  }),
  tpl(M2, 11, 3, "Raccord sans angle : même valeur et même pente de chaque côté.", () => {
    const a = entre(1, 6);
    const v = entre(2, 12);
    const g = morceau(a, v);
    const egaux = Math.random() < 0.5;
    const d = egaux ? morceau(a, v, g.d) : morceau(a, v, g.d + nonNul(-3, 3));
    const q = un([`Ces deux parties se raccordent en $x = ${a}$. Le raccord est-il lisse ?`, `Le passage par $x = ${a}$ se fait-il sans angle ?`, `Quelle conclusion pour le raccord en $x = ${a}$ ?`, `Un ingénieur vérifie le raccord en $x = ${a}$. Que conclut-il ?`, `Que dire de la jonction en $x = ${a}$ ?`]);
    const OUI = "Le raccord est lisse : mêmes valeur et pente";
    const NON = "Il y a un angle : les pentes diffèrent";
    return qcm(enonce(un(CTX_RAC), `f(x) = ${cas([[g.s, avant(a)], [d.s, apres(a)]])}`, q), egaux ? OUI : NON, [OUI, NON, "Il y a un saut : les valeurs diffèrent", "On ne peut rien dire sans mesure"], exD(`Les pentes valent $${g.d}$ à gauche et $${d.d}$ à droite, et les deux formules valent $${v}$ en $${a}$.`, egaux ? "Le raccord est lisse." : "Il y a un angle."));
  }),
  tpl(M2, 12, 3, "Regarde le signe de ce qui est dans les barres, de chaque côté de a.", () => {
    const a = entre(1, 5);
    const c = entre(1, 3);
    const s = un([-1, 1]);
    const fx = c === 1 ? `|x^2 - ${a * a}|` : `${c}|x^2 - ${a * a}|`;
    return court(enonce(intro(R), `f(x) = ${fx}`, un(Q_ND(a, s))), s * c * 2 * a, exD(`Près de $${a}$, à ${COTE(s)}, $x^2 - ${a * a}$ est ${s < 0 ? "négatif" : "positif"} : on dérive ${s < 0 ? `$-${c === 1 ? "" : c}(x^2 - ${a * a})$` : `$${c === 1 ? "" : c}(x^2 - ${a * a})$`}.`, `Le nombre dérivé vaut $${s * c * 2 * a}$.`));
  }),

  /* ===== approximation_affine ===== */
  tpl(M3, 1, 1, "f(a + h) ≈ f(a) + h × f'(a).", () => {
    const a = nonNul(-3, 8);
    const v = entre(-9, 20);
    const d = nonNul(-6, 7);
    const h = un(HS);
    const x = arr(a + h);
    const r = arr(v + h * d);
    const dit = un([`Une fonction $f$ dérivable vérifie $f(${a}) = ${v}$ et $f'(${a}) = ${d}$.`, `On sait que $f(${a}) = ${v}$ et que $f'(${a}) = ${d}$.`, `Pour une fonction dérivable $f$, on a $f(${a}) = ${v}$ et $f'(${a}) = ${d}$.`, `Au point d'abscisse $${a}$, on a relevé $f(${a}) = ${v}$ et $f'(${a}) = ${d}$.`]);
    return court(`${dit}\n\n${un(Q_APPROX(`f(${dec(x)})`))}`, r, exA(`$a = ${a}$ et $h = ${dec(h)}$ : $${v} + (${dec(h)}) \\times ${d < 0 ? `(${d})` : d}$.`, `$f(${dec(x)}) \\approx ${dec(r)}$.`));
  }),
  tpl(M3, 2, 1, "Calcule f(a) et f'(a) : le coefficient de h est le nombre dérivé.", () => {
    const u = un(USUELLES);
    const a = un(u.as);
    const [v, d] = [u.f(a), u.d(a)];
    const q = un([`Pour $h$ proche de $0$, quelle est l'approximation affine de $f(${a} + h)$ ?`, `Quelle expression approche $f(${a} + h)$ quand $h$ est petit ?`, `Pour $h$ petit, par quoi peut-on remplacer $f(${a} + h)$ ?`, `Quelle est l'approximation de $f(${a} + h)$ au voisinage de $h = 0$ ?`, `Parmi ces expressions, laquelle approche $f(${a} + h)$ pour $h$ proche de $0$ ?`]);
    const e = (val: number, co: number) => `$${poly([arr(val), ""], [arr(co), "h"])}$`;
    return qcm(enonce(intro("]0\\,;+\\infty["), `f(x) = ${u.s}`, q), e(v, d), [e(v, -d), e(d, v), e(v, 2 * d + 1), e(v + 1, d), e(0, d), e(v, 0)], exA(`$f(${a}) = ${nL(arr(v))}$ et $f'(${a}) = ${nL(arr(d))}$.`, `$f(${a} + h) \\approx ${poly([arr(v), ""], [arr(d), "h"])}$.`));
  }),
  tpl(M3, 3, 1, "Pense à la tangente en 1 (ou en 0) de la fonction qui apparaît.", () => {
    const [m, base, v0, d] = un(PETITS);
    const pas = un([0.1, 0.02, 0.01, 0.04, 0.05, 0.2, -0.1, -0.02, -0.01, -0.05]);
    const u = arr(base + pas);
    const ecrit = m.replace("@", dec(u));
    const r = arr(v0 + d * pas);
    const debut = un(["Avec la tangente, donne une valeur approchée de :", "Par l'approximation affine, estime :", "Sans calculatrice, donne une valeur approchée de :", "En remplaçant la courbe par sa tangente, estime :", "Donne une estimation, par l'approximation affine, de :", "Que donne l'approximation affine pour ce nombre ?", "Quelle valeur approchée la tangente donne-t-elle ici ?", "Estime ce nombre, sans calculatrice, avec la tangente :"]);
    return court(`${debut}\n\n$${ecrit}$`, r, exA(`On prend $h = ${dec(pas)}$ près de $${base}$.`, `$${ecrit} \\approx ${dec(r)}$.`));
  }),

  tpl(M3, 4, 2, "Repère a et h dans le nombre demandé, puis utilise la tangente.", () => {
    const u = un(USUELLES);
    const a = un(u.as);
    const h = un(HS);
    const x = arr(a + h);
    const r = arr(u.f(a) + h * u.d(a));
    return court(enonce(intro("]0\\,;+\\infty["), `f(x) = ${u.s}`, `Le point de référence est $a = ${a}$. ${un(Q_APPROX(`f(${dec(x)})`))}`), r, exA(`$h = ${dec(h)}$, $f(${a}) = ${nL(arr(u.f(a)))}$ et $f'(${a}) = ${nL(arr(u.d(a)))}$.`, `$f(${dec(x)}) \\approx ${dec(r)}$.`));
  }),
  tpl(M3, 5, 2, "L'écart est la valeur exacte moins l'approximation : ici il vaut h² fois le coefficient.", () => {
    const c = un([1, 2, 3, -1, -2]);
    const b = nonNul(-5, 5);
    const a = entre(1, 5);
    const h = un([0.1, 0.2, 0.3, -0.1, -0.2, 0.5]);
    const x = arr(a + h);
    const err = arr(Math.abs(c) * h * h);
    const q = un([`On estime $f(${dec(x)})$ avec la tangente en $${a}$. Quelle est l'erreur commise, en valeur absolue ?`, `Quel écart sépare $f(${dec(x)})$ de son approximation par la tangente en $${a}$ ?`, `Calcule l'écart, en valeur absolue, entre $f(${dec(x)})$ et sa valeur approchée par la tangente en $${a}$.`, `De combien l'approximation affine en $${a}$ se trompe-t-elle pour $f(${dec(x)})$ ?`, `Quelle erreur fait-on en remplaçant $f(${dec(x)})$ par la valeur de la tangente en $${a}$ ?`]);
    return court(enonce(intro(R), `f(x) = ${poly([c, "x^2"], [b, "x"])}`, q), err, exA(`$f(${a} + h) - \\left(f(${a}) + h f'(${a})\\right) = ${c}h^2$ avec $h = ${dec(h)}$.`, `L'erreur vaut $${dec(err)}$.`));
  }),
  tpl(M3, 6, 2, "Sur la figure, la droite verte est la tangente : calcule sa valeur au point demandé.", () => {
    const a = entre(1, 3);
    const d = un([1, 2, -1, -2]);
    const v = entre(1, 4);
    const c = un([1, -1]);
    const h = un([0.1, 0.2, 0.5, -0.1, -0.2, -0.5]);
    const x = arr(a + h);
    const f = (t: number) => c * (t - a) ** 2 + d * (t - a) + v;
    const b = v - d * a;
    const yvals = [v - 4, v + 4];
    const fig = figure({
      xmin: a - 3,
      xmax: a + 3,
      ymin: yvals[0],
      ymax: yvals[1],
      branches: [Array.from({ length: 61 }, (_, k) => a - 3 + k * 0.1).filter((t) => f(t) >= Math.min(yvals[0], -1) && f(t) <= yvals[1]).map((t) => ({ x: Math.round(t * 10) / 10, y: Math.round(f(t) * 1000) / 1000 }))],
      droites: [{ a: d, b, couleur: VERT, id: "tangente" }],
      points: [{ x: a, y: v, label: "A" }],
    });
    const r = arr(d * x + b);
    const q = un([`La droite verte est la tangente à la courbe de $f$ en A. Quelle valeur approchée de $f(${dec(x)})$ donne-t-elle ?`, `Avec la tangente tracée en vert, estime $f(${dec(x)})$.`, `On remplace la courbe par la tangente verte en A : que vaut alors $f(${dec(x)})$ ?`, `D'après la figure, quelle approximation affine obtient-on pour $f(${dec(x)})$ ?`, `Lis le point A et la pente de la tangente verte, puis estime $f(${dec(x)})$.`, `La tangente en A est en vert. Donne une valeur approchée de $f(${dec(x)})$.`, `Utilise la droite verte pour donner une estimation de $f(${dec(x)})$.`, `Quelle estimation de $f(${dec(x)})$ la tangente verte permet-elle ?`]);
    return court(q, r, exA(`En A, $f(${a}) = ${v}$ ; la pente de la tangente est $${d}$.`, `$f(${dec(x)}) \\approx ${dec(r)}$.`), fig);
  }),
  tpl(M3, 7, 2, "Compare la courbe à sa tangente : la courbe est-elle au-dessus ou en dessous ?", () => {
    const u = un(USUELLES);
    const a = un(u.as);
    const h = un(HS);
    const x = arr(a + h);
    const q = un([`On estime $f(${dec(x)})$ avec la tangente en $${a}$. Comment est cette estimation ?`, `La tangente en $${a}$ donne une estimation de $f(${dec(x)})$. Comment se situe-t-elle ?`, `Comment la valeur approchée de $f(${dec(x)})$, obtenue par la tangente en $${a}$, se place-t-elle ?`, `L'approximation affine en $${a}$ de $f(${dec(x)})$ est-elle trop grande ou trop petite ?`, `Compare la valeur exacte de $f(${dec(x)})$ à son estimation par la tangente en $${a}$.`]);
    const trop = u.f(x) > u.f(a) + h * u.d(a);
    return qcm(enonce(intro("]0\\,;+\\infty["), `f(x) = ${u.s}`, q), trop ? "Elle est un peu trop petite" : "Elle est un peu trop grande", [trop ? "Elle est un peu trop grande" : "Elle est un peu trop petite", "Elle est exactement juste", "On ne peut pas savoir, même avec un calcul"], exA(`Sa courbe est ${trop ? "au-dessus" : "en dessous"} de sa tangente en $${a}$.`, `L'estimation est un peu trop ${trop ? "petite" : "grande"}.`));
  }),

  tpl(M3, 8, 3, "Calcule la grandeur et sa dérivée au point connu, puis ajoute h fois la dérivée.", () => {
    const c = un(CTX_APPROX);
    const a = un(c.as);
    const h = un(c.hs);
    const x = arr(a + h);
    const r = arr(c.f(a) + h * c.d(a));
    const q = un([`Sans calculatrice, estime $${c.L}(${dec(x)})$ à partir de la valeur en $${a}$.`, `Avec la tangente en $${a}$, donne une valeur approchée de $${c.L}(${dec(x)})$, en ${c.unite}.`, `Par approximation affine en $${a}$, que vaut environ $${c.L}(${dec(x)})$ ?`, `Quelle valeur approchée de $${c.L}(${dec(x)})$ tires-tu de la dérivée en $${a}$ ?`]);
    return court(enonce(c.t, `${c.L}(x) = ${c.s}`, q), r, exA(`$${c.L}(${a}) = ${nL(arr(c.f(a)))}$ et $${c.L}'(${a}) = ${nL(arr(c.d(a)))}$, avec $h = ${dec(h)}$.`, `$${c.L}(${dec(x)}) \\approx ${dec(r)}$.`));
  }),
  tpl(M3, 9, 3, "Pour une petite hausse h, (1 + h)ⁿ ≈ 1 + nh : les pourcentages se multiplient par n.", () => {
    const c = un(CTX_PCT);
    const p = un(c.n === 0.5 ? [2, 4, 6, 1] : [1, 2, 0.5, 3]);
    const r = arr(c.n * p);
    const q = un(["De combien de pourcents cette grandeur augmente-t-elle, environ ?", "Par approximation affine, quelle est la hausse en pourcentage de la grandeur étudiée ?", "Quel pourcentage de hausse attendre, environ ?", "Estime en pourcentage la hausse obtenue.", "Quelle est, à peu près, la hausse obtenue en pourcents ?"]);
    return court(`${c.t(dec(p))}\n\n${q}`, r, exA(`$(1 + h)^{${nL(c.n)}} \\approx 1 + ${nL(c.n)}h$ avec $h = ${dec(p / 100)}$.`, `La hausse est d'environ $${dec(r)}$ %.`));
  }),
  tpl(M3, 10, 3, "Isole f'(a) dans f(a + h) ≈ f(a) + h f'(a).", () => {
    const a = nonNul(-3, 8);
    const v = entre(-5, 15);
    const d = nonNul(-6, 7);
    const h = un(HS);
    const x = arr(a + h);
    const w = arr(v + h * d);
    const dit = un([`Une mesure donne $f(${a}) = ${v}$ et, très près, $f(${dec(x)}) \\approx ${dec(w)}$.`, `On a mesuré $f(${a}) = ${v}$, puis $f(${dec(x)}) \\approx ${dec(w)}$.`, `Un capteur indique $f(${a}) = ${v}$, puis $f(${dec(x)}) \\approx ${dec(w)}$.`, `Sur une courbe tracée à la main, on lit $f(${a}) = ${v}$ et $f(${dec(x)}) \\approx ${dec(w)}$.`]);
    const q = un([`Estime le nombre dérivé $f'(${a})$.`, `Quelle valeur approchée de $f'(${a})$ en déduis-tu ?`, `Déduis-en une estimation de $f'(${a})$.`, `Quelle est, environ, la pente de la tangente en $${a}$ ?`, `Que vaut, à peu près, $f'(${a})$ ?`]);
    return court(`${dit}\n\n${q}`, d, exA(`$f'(${a}) \\approx \\dfrac{${dec(w)} - ${v < 0 ? `(${v})` : v}}{${dec(h)}}$.`, `$f'(${a}) \\approx ${d}$.`));
  }),
  tpl(M3, 11, 3, "Écris f(a) + h f'(a) égal à la valeur visée, puis résous en h.", () => {
    const u = un(USUELLES);
    const a = un(u.as);
    const h = un(HS);
    const [v, d] = [u.f(a), u.d(a)];
    const cible = arr(v + h * d);
    const q = un([`Avec la tangente en $${a}$, pour quelle valeur de $h$ a-t-on $f(${a} + h) \\approx ${dec(cible)}$ ?`, `Quelle petite valeur de $h$ donne, par approximation affine en $${a}$, $f(${a} + h) \\approx ${dec(cible)}$ ?`, `On veut $f(${a} + h) \\approx ${dec(cible)}$. Quelle valeur de $h$ l'approximation affine en $${a}$ donne-t-elle ?`, `Trouve $h$ tel que l'approximation affine de $f(${a} + h)$ vaille $${dec(cible)}$.`, `Pour quel réglage $h$ la tangente en $${a}$ prévoit-elle la valeur $${dec(cible)}$ ?`]);
    return court(enonce(intro("]0\\,;+\\infty["), `f(x) = ${u.s}`, q), h, exA(`$f(${a}) = ${nL(arr(v))}$, $f'(${a}) = ${nL(arr(d))}$ : on résout $${poly([arr(v), ""], [arr(d), "h"])} = ${dec(cible)}$.`, `$h = ${dec(h)}$.`));
  }),
];
