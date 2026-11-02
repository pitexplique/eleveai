// Renfort du CALCUL de dérivées, 1re technologique (02/11/2026).
//
// Mesure du 02/11 (scripts/mesurer-squelettes-coach.ts premiere der_formules
// der_polynome der_signe der_variations) : 1 à 12 squelettes par micro, 9 à
// 19 répétitions sur 20. On branche des générateurs : familles de fonctions ×
// tournures × situations de métiers (STI2D, STL, ST2S, économie, sport…).
// Aucune question « open » : QCM ou réponse courte (nombre seulement).
// Toute réponse qui est une expression passe en QCM. Pas de discriminant :
// les racines se lisent sur une forme factorisée.

import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import {
  arr, cap, cleP, construire, court, der, ev, expl, fr, fx, GESTION, itv, melange, n, par, pref, PRODUITS, qcm, qcmNombres, qcmPoly,
  randomInt, rc, SITUATIONS, tex, termesDe, verif, verifDer, versP, vraiFaux, poly, proche, dnum, monte, baisse, stable, de,
  type Ligne, type P, type Termes,
} from "./derivee-renfort-outils";

/* =========================================================
   der_derivee_constante (★1)
========================================================= */

const CONSTANTES: Array<[string, string, string, number[]]> = [
  ["Une chambre froide est réglée à température fixe : $T(t) = {K}$ (en °C, $t$ en heures).", "T", "t", [-18, -20, -25, 4, 3]],
  ["Un abonnement de musique coûte le même prix, quel que soit le nombre de titres écoutés : $P(x) = {K}$ (en euros, $x$ titres).", "P", "x", [9.99, 10.99, 5.99, 11.99]],
  ["Une pile neuve garde une tension stable : $U(t) = {K}$ (en volts, $t$ en heures).", "U", "t", [1.5, 4.5, 9, 3.7]],
  ["Un livreur facture un forfait, quelle que soit la distance : $F(d) = {K}$ (en euros, $d$ en km).", "F", "d", [5, 7, 12, 15]],
  ["Une pompe de perfusion délivre un débit réglé : $D(t) = {K}$ (en mL par heure, $t$ en heures).", "D", "t", [20, 25, 50, 125]],
  ["Un TGV roule à vitesse constante sur une portion de ligne : $v(t) = {K}$ (en km/h, $t$ en minutes).", "v", "t", [300, 320, 280]],
  ["Le loyer d’un local reste le même toute l’année : $L(m) = {K}$ (en euros, $m$ le numéro du mois).", "L", "m", [850, 1200, 640]],
  ["Une solution tampon garde un pH stable pendant une expérience : $p(t) = {K}$ ($t$ en minutes).", "p", "t", [7, 7.4, 4.8]],
  ["Un drone fait du vol stationnaire. Son altitude vaut $z(t) = {K}$ (en mètres, $t$ en secondes).", "z", "t", [12, 25, 40]],
  ["Un thermostat garde une serre à température fixe : $T(h) = {K}$ (en °C, $h$ en heures).", "T", "h", [22, 25, 19]],
  ["Le salaire fixe d’une vendeuse ne dépend pas de ses ventes : $S(x) = {K}$ (en euros, $x$ ventes).", "S", "x", [1450, 1600, 1520]],
  ["Le niveau d’eau d’un aquarium couvert reste fixe : $h(t) = {K}$ (en cm, $t$ en jours).", "h", "t", [35, 42, 50]],
];

function genConstanteContexte() {
  const [phrase, g, v, ks] = rc(CONSTANTES);
  const K = rc(ks);
  const a = randomInt(1, 12);
  const debut = phrase.replace("{K}", n(K));
  const t = randomInt(1, 3);
  const point = t === 1 ? v : String(a);
  const text =
    t === 1 ? `${debut} Que vaut $${g}'(${v})$ ?` : t === 2 ? `${debut} Calcule $${g}'(${a})$.` : `${debut} Quel est le nombre dérivé $${g}'(${a})$ ?`;
  return court(
    text,
    0,
    expl("la dérivée d’une fonction constante est nulle.", "la grandeur ne change pas : sa vitesse de variation vaut 0.", `$${g}(${v}) = ${n(K)}$ pour tout $${v}$, donc $${g}'(${v}) = 0$.`, `$${g}'(${point}) = 0$. Attention : ce n’est pas $${n(K)}$.`)
  );
}

const KS = ["5", "-3", "12", "0{,}5", "-7", "\\sqrt{2}", "\\pi", "-\\dfrac{3}{4}", "100", "2{,}5", "-1{,}2", "\\dfrac{1}{3}"];

function genConstanteQcm() {
  const K = rc(KS);
  const f = rc(["f", "g", "h"]);
  const v = rc(["x", "t"]);
  const text = rc([
    `Soit $${f}(${v}) = ${K}$. Quelle est sa dérivée ?`,
    `Une technicienne programme la fonction $${f}(${v}) = ${K}$. Quelle est la dérivée de cette fonction ?`,
    `On considère la fonction constante $${f}(${v}) = ${K}$. Que vaut $${f}'(${v})$ ?`,
    `Un élève doit dériver $${f}(${v}) = ${K}$. Quel résultat est juste ?`,
  ]);
  return qcm(
    text,
    `$${f}'(${v}) = 0$`,
    [`$${f}'(${v}) = ${K}$`, `$${f}'(${v}) = 1$`, `$${f}'(${v}) = ${K} ${v}$`, `$${f}'(${v}) = ${v}$`],
    expl("la dérivée d’une fonction constante est nulle.", "une constante ne dépend pas de la variable : elle ne varie pas.", `$${f}(${v}) = ${K}$ pour tout $${v}$.`, `$${f}'(${v}) = 0$.`)
  );
}

function genConstanteGraphe() {
  const K = randomInt(-4, 4) || 2;
  const x0 = randomInt(-3, 3);
  const titre = rc(["Température d’une chambre froide", "Altitude d’un drone immobile", "Tension d’une pile", "La courbe de f", "Niveau d’eau d’une cuve fermée", "Prix d’un forfait"]);
  const canvas = {
    kind: "fonctionGraphique",
    titre,
    xmin: -5,
    xmax: 5,
    ymin: -6,
    ymax: 6,
    grille: true,
    courbes: [{ id: "f", type: "affine", a: 0, b: K, couleur: "#e11d48" }],
    points: [{ x: x0, y: K, label: "A" }],
  } as TutorGeneratedQuestionV4["canvas"];
  const text = rc([
    `La courbe de $f$ est la droite horizontale tracée. Que vaut $f'(${x0})$ ?`,
    `Le point A, d’abscisse $${x0}$, est sur la courbe de $f$. Quel est le nombre dérivé $f'(${x0})$ ?`,
    `Une technicienne a tracé cette courbe. Quel est le nombre dérivé de $f$ en $${x0}$ ?`,
    `Sur ce graphique, la tangente en A est la droite elle-même. Quel est son coefficient directeur ?`,
  ]);
  return court(
    text,
    0,
    expl("le nombre dérivé est le coefficient directeur de la tangente.", "une droite horizontale ne monte pas et ne descend pas.", `la courbe est la droite $y = ${n(K)}$ : son coefficient directeur est 0.`, `le nombre dérivé vaut 0 (et non $${n(K)}$, qui est l’ordonnée).`),
    canvas
  );
}

function genConstanteVraiFaux() {
  const K = rc([-6, -2, 3, 5, 8, 12, 0.5, 2.5]);
  const a = randomInt(-4, 6);
  const AFF: Array<[string, boolean, string]> = [
    [`La dérivée de $f(x) = ${n(K)}$ est $f'(x) = 0$.`, true, "une constante a une dérivée nulle"],
    [`La dérivée de $f(x) = ${n(K)}$ est $f'(x) = ${n(K)}$.`, false, "la dérivée d’une constante est 0, pas la constante elle-même"],
    [`La dérivée de $f(x) = ${n(K)}$ est $f'(x) = 1$.`, false, "c’est la dérivée de $x$ qui vaut 1 ; celle d’une constante vaut 0"],
    [`Pour $f(x) = ${n(K)}$, on a $f'(${a}) = 0$.`, true, "la dérivée est nulle partout, donc aussi en ce point"],
    [`Pour $f(x) = ${n(K)}$, on a $f'(${a}) = ${n(K)}$.`, false, `$f(${a}) = ${n(K)}$, mais $f'(${a}) = 0$`],
    [`La courbe de $f(x) = ${n(K)}$ a des tangentes horizontales.`, true, "la courbe est une droite horizontale : en chaque point, la tangente est cette droite"],
    [`Si $f'(x) = 0$ pour tout $x$, alors $f$ est constante.`, true, "une fonction qui ne varie jamais est constante"],
    [`La dérivée de $f(x) = ${n(K)}x$ est 0, car $${n(K)}$ est un nombre.`, false, `ici $f$ n’est pas constante : $f'(x) = ${n(K)}$`],
  ];
  const [aff, vrai, raison] = rc(AFF);
  return vraiFaux(aff, vrai, expl("la dérivée d’une fonction constante est nulle.", "on compare l’affirmation à cette règle.", `${raison}.`, `l’affirmation est ${vrai ? "vraie" : "fausse"}.`));
}

/* =========================================================
   der_derivee_identite (★2)
========================================================= */

type Affine = [string, string, string, string, 1 | -1, number[], number[]];
const AFFINES: Affine[] = [
  ["Un taxi facture {b} € de prise en charge, puis {a} € par kilomètre.", "Le prix d’une course de $x$ km", "P", "x", 1, [1.2, 1.5, 1.8, 2], [3, 4, 5]],
  ["Une plombière facture {b} € de déplacement, puis {a} € par heure de travail.", "Le prix pour $t$ heures", "P", "t", 1, [35, 40, 45, 50], [20, 25, 30]],
  ["Une cuve contient {b} litres et se remplit de {a} litres par minute.", "Le volume au bout de $t$ minutes", "V", "t", 1, [5, 8, 12, 15], [50, 100, 200]],
  ["Une bougie mesure {b} cm et fond de {a} cm par heure.", "Sa hauteur au bout de $t$ heures", "h", "t", -1, [0.5, 1.5, 2, 2.5], [12, 15, 20]],
  ["Une poche de perfusion contient {b} mL et se vide de {a} mL par heure.", "Le volume restant au bout de $t$ heures", "V", "t", -1, [25, 50, 75, 100], [500, 1000]],
  ["Un camion-citerne contient {b} litres de gazole et en consomme {a} par heure.", "Le volume restant au bout de $t$ heures", "V", "t", -1, [20, 25, 30, 35], [400, 500, 600]],
  ["Une vendeuse touche {b} € de fixe, plus {a} € par abonnement vendu.", "Son salaire pour $x$ abonnements", "S", "x", 1, [12, 15, 20, 25], [1200, 1300, 1400]],
  ["Un parking coûte {b} € à l’entrée, puis {a} € par heure.", "Le prix pour $t$ heures", "P", "t", 1, [1.5, 2, 2.5, 3], [1, 2, 3]],
  ["Un ascenseur part de {b} m de hauteur et monte à {a} m par seconde.", "Son altitude au bout de $t$ secondes", "z", "t", 1, [1.5, 2, 2.5, 4], [3, 6, 9]],
  ["Une imprimante 3D dépose {a} g de plastique par minute sur une pièce qui pèse déjà {b} g.", "La masse de la pièce au bout de $t$ minutes", "m", "t", 1, [2, 3, 4, 5], [10, 20, 40]],
  ["Un glacier mesure {b} m d’épaisseur et perd {a} m par an.", "Son épaisseur dans $t$ années", "e", "t", -1, [1.5, 2, 3, 4], [80, 120, 150]],
  ["Une batterie de vélo est chargée à {b} % et perd {a} % par kilomètre.", "Sa charge au bout de $x$ km", "Q", "x", -1, [1.5, 2, 2.5], [80, 90, 100]],
  ["Un patient a déjà bu {b} mL d’eau, puis il boit {a} mL par heure.", "La quantité bue au bout de $t$ heures", "Q", "t", 1, [100, 120, 150], [250, 300, 500]],
  ["Une salle d’escalade fait payer {b} € l’adhésion, puis {a} € par séance.", "Le coût pour $x$ séances", "C", "x", 1, [6, 8, 9], [20, 30, 40]],
];

function genAffineContexte() {
  const [intro, nom, g, v, s, as, bs] = rc(AFFINES);
  const a = rc(as);
  const b = rc(bs);
  const m = s * a;
  const c = randomInt(1, 9);
  const formule = randomInt(1, 2) === 1 ? poly([[m, 1], [b, 0]], v) : poly([[b, 0], [m, 1]], v);
  const debut = `${intro.replace("{a}", fr(a)).replace("{b}", fr(b))} ${nom} est $${g}(${v}) = ${formule}$.`;
  const t = randomInt(1, 3);
  const text = t === 1 ? `${debut} Que vaut $${g}'(${v})$ ?` : t === 2 ? `${debut} Calcule $${g}'(${c})$.` : `${debut} Quelle est la vitesse de variation $${g}'(${v})$ ?`;
  return court(
    text,
    m,
    expl("la dérivée de $x \\mapsto ax + b$ est le nombre $a$.", "on garde le coefficient de la variable ; le nombre seul disparaît.", `$${g}(${v}) = ${formule}$, donc $${g}'(${v}) = ${n(m)}$.`, `$${g}'(${t === 2 ? c : v}) = ${n(m)}$. Le nombre $${n(b)}$ ne change pas la pente.`)
  );
}

function genAffineQcm() {
  let a = rc([-5, -4, -3, -2, 2, 3, 4, 5, 6, 0.5, 1.5, -1, 1]);
  let b = rc([-7, -4, -2, 1, 3, 5, 8, 2.5]);
  if (b === a) b = a + 3;
  const v = rc(["x", "t"]);
  const f = rc(["f", "g", "h"]);
  const ordre = randomInt(1, 2);
  const forme = ordre === 1 ? poly([[a, 1], [b, 0]], v) : poly([[b, 0], [a, 1]], v);
  const text = rc([
    `Soit $${f}(${v}) = ${forme}$. Quelle est sa dérivée ?`,
    `On dérive la fonction affine $${f}(${v}) = ${forme}$. On obtient :`,
    `Un ingénieur utilise $${f}(${v}) = ${forme}$. Que vaut $${f}'(${v})$ ?`,
    `Quelle est la dérivée de $${f}(${v}) = ${forme}$ ?`,
  ]);
  return qcmNombres(
    text,
    a,
    [b, a + b, 0],
    expl("la dérivée de $x \\mapsto ax + b$ est le nombre $a$.", "on garde le coefficient de la variable.", `le coefficient de $${v}$ est $${n(a)}$.`, `$${f}'(${v}) = ${n(a)}$.`),
    (x) => `$${f}'(${v}) = ${n(x)}$`
  );
}

function genAffineGraphe() {
  for (let essai = 0; essai < 50; essai++) {
    const m = rc([-3, -2, -1, -0.5, 0.5, 1, 2, 3]);
    const dx = Math.abs(m) === 0.5 ? 2 : rc([1, 2]);
    const x0 = randomInt(-3, 1);
    const b = randomInt(-2, 2);
    const y0 = m * x0 + b;
    const y1 = y0 + m * dx;
    if (!Number.isInteger(y0) || Math.abs(y0) > 4 || Math.abs(y1) > 4) continue;
    const canvas = {
      kind: "fonctionGraphique",
      titre: rc(["La droite représente f", "Un modèle affine", "Prix en fonction de la durée", "Niveau d’une cuve"]),
      xmin: -5,
      xmax: 5,
      ymin: -5,
      ymax: 5,
      grille: true,
      courbes: [{ id: "f", type: "affine", a: m, b, couleur: "#e11d48" }],
      points: [
        { x: x0, y: y0, label: "A" },
        { x: x0 + dx, y: y1, label: "B" },
      ],
    } as TutorGeneratedQuestionV4["canvas"];
    const text = rc([
      "La droite tracée est la courbe d’une fonction affine $f$. Les points A et B sont sur cette droite. Que vaut $f'(x)$ ?",
      "Lis sur le graphique le nombre dérivé de la fonction affine $f$ (il est le même partout).",
      "Une technicienne a tracé la droite d’une fonction affine $f$. Que vaut $f'(x)$ ?",
      "Grâce aux points A et B, trouve la dérivée de la fonction affine $f$ tracée.",
    ]);
    return court(
      text,
      m,
      expl("la dérivée d’une fonction affine est son coefficient directeur.", "de A à B, on lit le déplacement horizontal puis vertical.", `de A à B : on avance de ${dx}, on ${m > 0 ? "monte" : "descend"} de ${fr(Math.abs(m * dx))} ; pente $= \\dfrac{${n(m * dx)}}{${dx}} = ${n(m)}$.`, `$f'(x) = ${n(m)}$.`),
      canvas
    );
  }
  return genAffineQcm();
}

function genIdentiteVraiFaux() {
  const a = rc([-4, -3, -2, 2, 3, 5, 7, 0.5]);
  const b = rc([-6, -1, 2, 4, 9]);
  const c = rc([1, 2, 3, 4]);
  const aff = poly([[a, 1], [b, 0]]);
  const AFF: Array<[string, boolean, string]> = [
    ["La dérivée de $f(x) = x$ est $f'(x) = 1$.", true, "la fonction identité a pour dérivée 1"],
    ["La dérivée de $f(x) = x$ est $f'(x) = 0$.", false, "$x$ n’est pas une constante : $(x)' = 1$"],
    ["La dérivée de $f(x) = x$ est $f'(x) = x$.", false, "$(x)' = 1$"],
    [`La dérivée de $f(x) = ${aff}$ est $f'(x) = ${n(a)}$.`, true, `on garde le coefficient de $x$, soit $${n(a)}$`],
    [`La dérivée de $f(x) = ${aff}$ est $f'(x) = ${n(b)}$.`, false, `le nombre seul $${n(b)}$ disparaît ; $f'(x) = ${n(a)}$`],
    [`La dérivée de $f(x) = ${aff}$ est $f'(x) = ${poly([[a, 1]])}$.`, false, `$f'(x) = ${n(a)}$ : le $x$ disparaît`],
    [`La dérivée de $f(x) = ${aff}$ ne dépend pas de $x$.`, true, `$f'(x) = ${n(a)}$ pour tout $x$`],
    [`Pour $f(x) = ${aff}$, on a $f'(${c}) = ${n(a * c + b)}$.`, false, `$${n(a * c + b)}$ est $f(${c})$ ; or $f'(${c}) = ${n(a)}$`],
    ["La tangente à une droite, en un de ses points, est cette droite elle-même.", true, "c’est pourquoi le nombre dérivé d’une fonction affine est son coefficient directeur"],
  ];
  const [txt, vrai, raison] = rc(AFF);
  return vraiFaux(txt, vrai, expl("$(x)' = 1$ et $(ax + b)' = a$.", "on compare l’affirmation à ces règles.", `${raison}.`, `l’affirmation est ${vrai ? "vraie" : "fausse"}.`));
}

/* =========================================================
   der_derivee_carre_cube (★2)
========================================================= */

const CC: Array<[string, string, string, 2 | 3, boolean]> = [
  ["L’aire d’un carré de côté $c$ (en cm) est $A(c) = c^2$.", "A", "c", 2, true],
  ["Le volume d’un cube d’arête $a$ (en cm) est $V(a) = a^3$.", "V", "a", 3, true],
  ["Une architecte calcule l’aire d’une dalle carrée de côté $x$ (en m) : $S(x) = x^2$.", "S", "x", 2, true],
  ["Un fabricant d’emballages calcule le volume d’une boîte cubique d’arête $x$ (en dm) : $V(x) = x^3$.", "V", "x", 3, true],
  ["Soit la fonction carré $f(x) = x^2$.", "f", "x", 2, false],
  ["Soit la fonction cube $f(x) = x^3$.", "f", "x", 3, false],
  ["On considère $g(t) = t^2$.", "g", "t", 2, false],
  ["On considère $g(t) = t^3$.", "g", "t", 3, false],
  ["Une ingénieure modélise une grandeur par $h(x) = x^3$.", "h", "x", 3, false],
  ["Un carreleur calcule l’aire d’un carreau carré de côté $x$ (en dm) : $A(x) = x^2$.", "A", "x", 2, true],
];

function genCarreCubeQcm() {
  const [phrase, g, v, p] = rc(CC);
  const text = `${phrase} ${rc([`Quelle est la dérivée $${g}'(${v})$ ?`, `Que vaut $${g}'(${v})$ ?`, `On dérive. On obtient :`])}`;
  const bon: Termes = [[p, p - 1]];
  const pieges: Termes[] = p === 2 ? [[[1, 1]], [[2, 0]], [[2, 2]], [[1, 3]]] : [[[3, 1]], [[1, 2]], [[3, 3]], [[2, 3]]];
  return qcmPoly(
    text,
    `${g}'(${v})`,
    bon,
    pieges,
    v,
    expl("la dérivée de $x^n$ est $nx^{n-1}$.", "l’exposant descend devant, puis il diminue de 1.", `$(${v}^${p})' = ${poly([[p, p - 1]], v)}$.`, `$${g}'(${v}) = ${poly(bon, v)}$.`)
  );
}

function genCarreCubeValeur() {
  const [phrase, g, v, p, geo] = rc(CC);
  const a = geo ? rc([1, 2, 3, 4, 5, 0.5, 1.5, 2.5, 10]) : rc([-4, -3, -2, -1, 1, 2, 3, 4, 5, 0.5, 1.5]);
  const val = p === 2 ? 2 * a : 3 * a * a;
  verif(proche(dnum((x) => x ** p, a), val), "carré/cube : valeur");
  const text = `${phrase} ${rc([`Calcule $${g}'(${n(a)})$.`, `Quelle est la valeur du nombre dérivé de $${g}$ en $${n(a)}$ ?`, `Que vaut $${g}'(${n(a)})$ ?`])}`;
  return court(
    text,
    val,
    expl("la dérivée de $x^n$ est $nx^{n-1}$.", "on dérive, puis on remplace la variable par la valeur.", p === 2 ? `$${g}'(${v}) = 2${v}$, donc $${g}'(${n(a)}) = 2 \\times ${par(a)} = ${n(val)}$.` : `$${g}'(${v}) = 3${v}^2$, donc $${g}'(${n(a)}) = 3 \\times ${par(a)}^2 = ${n(val)}$.`, `$${g}'(${n(a)}) = ${n(val)}$.`)
  );
}

function genCarreCubeErreur() {
  const p = rc([2, 3] as const);
  const v = rc(["x", "t"]);
  const OUBLI_MULT = "il a oublié de multiplier par l’exposant";
  const OUBLI_DIM = "il a oublié de diminuer l’exposant de 1";
  const TROP = "il a trop diminué l’exposant";
  const RIEN = "il n’y a pas d’erreur";
  const cas: Array<[Termes, string]> = p === 2 ? [[[[1, 1]], OUBLI_MULT], [[[2, 2]], OUBLI_DIM], [[[2, 0]], TROP], [[[2, 1]], RIEN]] : [[[[1, 2]], OUBLI_MULT], [[[3, 3]], OUBLI_DIM], [[[3, 1]], TROP], [[[3, 2]], RIEN]];
  const [ecrit, bon] = rc(cas);
  const text = rc([
    `Un élève écrit : « la dérivée de $${v}^${p}$ est $${poly(ecrit, v)}$ ». Que penses-tu de sa réponse ?`,
    `Pour dériver $f(${v}) = ${v}^${p}$, Léo trouve $f'(${v}) = ${poly(ecrit, v)}$. Quelle phrase est juste ?`,
    `Une camarade affirme que $(${v}^${p})' = ${poly(ecrit, v)}$. Que dis-tu ?`,
  ]);
  return qcm(text, bon, [OUBLI_MULT, OUBLI_DIM, TROP, RIEN].filter((x) => x !== bon), expl("la dérivée de $x^n$ est $nx^{n-1}$.", "deux gestes : l’exposant descend devant, ET il diminue de 1.", `la bonne dérivée est $${poly([[p, p - 1]], v)}$ ; l’élève a écrit $${poly(ecrit, v)}$.`, `${bon}.`));
}

/* =========================================================
   der_derivee_produit_reel (★2)
========================================================= */

type Prod = [string, string, string, 2 | 3, number[], string];
const PROD: Prod[] = [
  ["En chute libre, la distance parcourue par une bille est $d(t) = {k}t^2$ (en m, $t$ en s).", "d", "t", 2, [4.9], "sa vitesse en m/s"],
  ["L’énergie cinétique d’un scooter roulant à $v$ m/s est $E(v) = {k}v^2$ (en joules).", "E", "v", 2, [50, 60, 75, 100], "le gain d’énergie par m/s"],
  ["La puissance d’une éolienne est $P(v) = {k}v^3$ (en W, $v$ vitesse du vent en m/s).", "P", "v", 3, [0.5, 1.5, 2, 3], "le gain de puissance par m/s"],
  ["La distance de freinage d’une voiture sur route sèche est $D(v) = {k}v^2$ (en m, $v$ en km/h).", "D", "v", 2, [0.005, 0.006, 0.008], "l’allongement du freinage par km/h"],
  ["L’aire d’un disque de rayon $r$ (en cm) vaut environ $A(r) = {k}r^2$.", "A", "r", 2, [3.14], "le gain d’aire par cm de rayon"],
  ["Le coût de production de $q$ tonnes est $C(q) = {k}q^3$ (en milliers d’euros).", "C", "q", 3, [0.2, 0.5, 2], "le coût marginal"],
  ["La résistance de l’air sur un cycliste est $F(v) = {k}v^2$ (en newtons, $v$ en m/s).", "F", "v", 2, [0.2, 0.25, 0.3], "le gain de force par m/s"],
  ["Une boîte a une base de côtés $x$ et ${k}x$, et une hauteur $x$ : son volume est $V(x) = {k}x^3$.", "V", "x", 3, [2, 3, 4], "le gain de volume par unité"],
  ["Soit $f(x) = {k}x^2$.", "f", "x", 2, [-7, -5, -3, 3, 4, 6, 9], ""],
  ["Soit $f(x) = {k}x^3$.", "f", "x", 3, [-4, -2, 2, 5, 7], ""],
  ["On considère $g(t) = {k}t^3$.", "g", "t", 3, [-0.5, 0.5, 1.5, 4], ""],
  ["On considère $h(x) = {k}x^2$.", "h", "x", 2, [-1.5, 0.5, 2.5, 8], ""],
];

function tirageProd() {
  const [phrase, g, v, p, ks, sens] = rc(PROD);
  const k = rc(ks);
  return { intro: phrase.replace(/\{k\}/g, n(k)), g, v, p, k, sens, physique: sens !== "" };
}

function genProduitQcm() {
  const q = tirageProd();
  const { g, v, p, k } = q;
  const bon: Termes = [[k * p, p - 1]];
  return qcmPoly(
    `${q.intro} ${rc([`Quelle est la dérivée $${g}'(${v})$ ?`, `Que vaut $${g}'(${v})$ ?`, `On dérive $${g}$. On obtient :`])}`,
    `${g}'(${v})`,
    bon,
    [[[k, p - 1]], [[p, p - 1]], [[k * p, p]], [[k + p, p - 1]]],
    v,
    expl("$(k \\times u)' = k \\times u'$ : le nombre $k$ reste en facteur.", `on dérive $${v}^${p}$ en $${poly([[p, p - 1]], v)}$, puis on multiplie par $${n(k)}$.`, `$${g}'(${v}) = ${n(k)} \\times ${poly([[p, p - 1]], v)} = ${poly(bon, v)}$.`, `$${g}'(${v}) = ${poly(bon, v)}$.`)
  );
}

function genProduitValeur() {
  const q = tirageProd();
  const { g, v, p, k } = q;
  const a = q.physique ? (g === "D" ? rc([50, 80, 90, 100, 130]) : rc([1, 2, 3, 4, 5, 10])) : rc([-3, -2, -1, 1, 2, 3]);
  const val = k * p * a ** (p - 1);
  verif(proche(dnum((x) => k * x ** p, a), val), "produit : valeur");
  const text = q.physique
    ? `${q.intro} Calcule $${g}'(${a})$ : c’est ${q.sens} quand $${v} = ${a}$.`
    : `${q.intro} ${rc([`Calcule $${g}'(${a})$.`, `Que vaut le nombre dérivé $${g}'(${a})$ ?`])}`;
  return court(
    text,
    val,
    expl("$(k \\times u)' = k \\times u'$.", "on dérive, puis on remplace la variable.", `$${g}'(${v}) = ${poly([[k * p, p - 1]], v)}$, donc $${g}'(${a}) = ${n(k * p)} \\times ${par(a)}${p === 3 ? "^2" : ""} = ${n(val)}$.`, `$${g}'(${a}) = ${n(val)}$.`)
  );
}

function genProduitVraiFaux() {
  const q = tirageProd();
  const { g, v, p, k } = q;
  const bon: Termes = [[k * p, p - 1]];
  const props: Array<[Termes, boolean]> = [[bon, true], [[[k, p - 1]], false], [[[p, p - 1]], false], [[[k * p, p]], false]];
  const [prop, vrai0] = rc(props);
  const vrai = vrai0 || cleP(versP(prop)) === cleP(versP(bon));
  return vraiFaux(
    `${q.intro} On a $${g}'(${v}) = ${poly(prop, v)}$.`,
    vrai,
    expl("$(k \\times u)' = k \\times u'$.", `on dérive $${v}^${p}$, puis on multiplie par $${n(k)}$.`, `$${g}'(${v}) = ${poly(bon, v)}$.`, `l’affirmation est ${vrai ? "vraie" : "fausse"}.`)
  );
}

/* =========================================================
   der_derivee_somme (★2)
========================================================= */

function termesSomme(): { t: Termes; p: P } {
  const degres = rc([[2, 1, 0], [3, 0], [2, 0], [3, 1], [2, 1], [3, 2, 0], [3, 1, 0]]);
  const t: Termes = degres.map((d) => [rc([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 7]), d]);
  return { t: randomInt(1, 3) === 1 ? (t.slice().reverse() as Termes) : t, p: versP(t) };
}

function piegesDerivee(p: P): Termes[] {
  const d = der(p);
  const out: Termes[] = [];
  if (p[0]) out.push([...termesDe(d), [p[0], 0]]); // garde la constante
  if (p[1]) out.push(termesDe(der(p).map((c, k) => (k === 0 ? 0 : c))).concat([[p[1], 1]])); // (cx)' = cx
  const top = p.length - 1;
  out.push(termesDe(d.map((c, k) => (k === top - 1 ? p[top] : c)))); // oublie l'exposant du terme de plus haut degré
  out.push(termesDe(p.map((c, k) => (k === 0 ? 0 : c * k)))); // n'abaisse pas les exposants
  return out;
}

function genSommeQcm() {
  const { t, p } = termesSomme();
  const f = rc(["f", "g", "h"]);
  const text = rc([
    `Soit $${f}(x) = ${poly(t)}$. Quelle est sa dérivée ?`,
    `On dérive terme à terme $${f}(x) = ${poly(t)}$. On obtient :`,
    `Une ingénieure modélise un signal par $${f}(x) = ${poly(t)}$. Que vaut $${f}'(x)$ ?`,
    `Quelle est la dérivée de la somme $${f}(x) = ${poly(t)}$ ?`,
  ]);
  verifDer(p, der(p), "somme");
  return qcmPoly(text, `${f}'(x)`, termesDe(der(p)), piegesDerivee(p), "x", expl("$(u + v)' = u' + v'$ : on dérive chaque terme.", "$(x^3)' = 3x^2$, $(x^2)' = 2x$, $(x)' = 1$, et un nombre seul a pour dérivée 0.", `$${f}'(x) = ${tex(der(p))}$.`, `$${f}'(x) = ${tex(der(p))}$.`));
}

function genSommeValeur() {
  const { t, p } = termesSomme();
  const a = rc([-3, -2, -1, 1, 2, 3]);
  const val = ev(der(p), a);
  verif(proche(dnum((x) => ev(p, x), a), val), "somme : valeur");
  const f = rc(["f", "g"]);
  const text = rc([`Soit $${f}(x) = ${poly(t)}$. Calcule $${f}'(${a})$.`, `Pour $${f}(x) = ${poly(t)}$, que vaut le nombre dérivé en $${a}$ ?`, `Un technicien a $${f}(x) = ${poly(t)}$. Il veut $${f}'(${a})$. Que trouve-t-il ?`]);
  return court(text, val, expl("$(u + v)' = u' + v'$.", "on dérive terme à terme, puis on remplace $x$.", `$${f}'(x) = ${tex(der(p))}$, donc $${f}'(${a}) = ${n(val)}$.`, `$${f}'(${a}) = ${n(val)}$.`));
}

function genSommeErreur() {
  const deg = rc([2, 3]);
  const a = rc([-3, -2, 2, 3, 4, 5]);
  const c = rc([-7, -4, -1, 2, 5, 6]);
  const d = rc([-9, -3, 4, 8, 10]);
  const p = versP([[a, deg], [c, 1], [d, 0]]);
  const bon = termesDe(der(p));
  const CONST = "la dérivée du nombre seul doit être 0";
  const LIN = "la dérivée du terme en $x$ doit être un nombre";
  const EXP = "il faut multiplier par l’exposant";
  const RIEN = "il n’y a pas d’erreur";
  const cas: Array<[Termes, string]> = [
    [[...bon, [d, 0]], CONST],
    [[[a * deg, deg - 1], [c, 1]], LIN],
    [[[a, deg - 1], [c, 0]], EXP],
    [bon, RIEN],
  ];
  const [ecrit, raison] = rc(cas);
  const text = rc([
    `Un élève dérive $f(x) = ${poly([[a, deg], [c, 1], [d, 0]])}$ et écrit $f'(x) = ${poly(ecrit)}$. Que penses-tu de sa réponse ?`,
    `Pour $f(x) = ${poly([[d, 0], [c, 1], [a, deg]])}$, Inès trouve $f'(x) = ${poly(ecrit)}$. Quelle phrase est juste ?`,
  ]);
  return qcm(text, raison, [CONST, LIN, EXP, RIEN].filter((x) => x !== raison), expl("$(u + v)' = u' + v'$ ; $(x^n)' = nx^{n-1}$ ; un nombre seul a pour dérivée 0.", "on dérive chaque terme et on compare.", `la bonne dérivée est $f'(x) = ${poly(bon)}$.`, `${raison}.`));
}

/* =========================================================
   der_derivee_degre2 (★3) et der_derivee_degre3 (★4)
========================================================= */

type Ctx = [string, string, string, number[], number[], number[], number[]?];
// [phrase avec {f}, g, v, a, b, c, d?]
const DEG2: Ctx[] = [
  ["La hauteur d’un ballon de volley frappé par une joueuse est $h(t) = {f}$ (en m, $t$ en s).", "h", "t", [-4.9, -5], [6, 8, 10, 12], [1, 1.5, 2]],
  ["Le bénéfice d’une petite entreprise est $B(q) = {f}$ (en milliers d’euros, $q$ en centaines d’objets).", "B", "q", [-1, -2, -0.5], [20, 30, 40], [-50, -80, -100]],
  ["Le coût de fabrication d’un lot est $C(q) = {f}$ (en euros, $q$ en kg).", "C", "q", [0.5, 1, 2], [5, 10, 15], [100, 200]],
  ["Le jet d’eau d’une fontaine suit la courbe $y(x) = {f}$ (en m).", "y", "x", [-0.5, -1, -0.25], [2, 3, 4], [0.5, 1]],
  ["Une biologiste modélise une population de bactéries par $N(t) = {f}$ (en milliers, $t$ en heures).", "N", "t", [0.5, 1, 2], [3, 5, -2], [10, 20]],
  ["La température d’un four qui chauffe est $T(t) = {f}$ (en °C, $t$ en minutes).", "T", "t", [-0.5, -1], [20, 30], [20, 25]],
  ["Une ingénieure modélise le profil d’une rampe de skate par $y(x) = {f}$ (en m).", "y", "x", [0.25, 0.5], [-2, -1, 1], [3, 4]],
  ["La recette d’un concert, selon le prix $x$ du billet en euros, est $R(x) = {f}$ (en centaines d’euros).", "R", "x", [-2, -3], [60, 80, 90], [-10, -20]],
  ["Un kinésithérapeute modélise l’amplitude d’un mouvement par $A(t) = {f}$ (en degrés, $t$ en semaines).", "A", "t", [-0.5, -1], [12, 16], [30, 40]],
  ["Soit $f(x) = {f}$.", "f", "x", [-3, -2, -1, 2, 3, 4, 5], [-7, -4, -1, 2, 6, 9], [-8, -5, 1, 3, 7]],
  ["Un économiste étudie la fonction $g(x) = {f}$.", "g", "x", [-4, -1, 1, 3, 6], [-9, -2, 3, 5, 8], [-6, -2, 4, 11]],
  ["On considère $h(t) = {f}$.", "h", "t", [-0.5, 0.5, 1.5, -2], [-5, -3, 4, 7], [-4, 2, 6]],
];

const DEG3: Ctx[] = [
  ["Le volume d’une boîte en carton est $V(x) = {f}$ (en cm³, $x$ en cm).", "V", "x", [4], [-60, -80, -40], [200, 300, 400], [0]],
  ["Le coût total de production d’une usine est $C(q) = {f}$ (en milliers d’euros, $q$ en tonnes).", "C", "q", [1, 0.5, 2], [-6, -9, -12], [15, 30, 40], [20, 50, 100]],
  ["Une pharmacologue modélise la concentration d’un médicament par $C(t) = {f}$ (en mg/L, $t$ en heures).", "C", "t", [-1, -0.5], [6, 9, 3], [2, 4], [0]],
  ["L’altitude d’un drone pendant un vol test est $z(t) = {f}$ (en m, $t$ en s).", "z", "t", [-0.5, -1], [3, 6], [2, 4], [1, 2]],
  ["Une ingénieure modélise la flèche d’une poutre par $y(x) = {f}$ (en mm, $x$ en m).", "y", "x", [0.2, 0.5, -0.2], [-1, -2, 1], [3, 5], [0]],
  ["Le nombre de visiteurs d’un salon (en centaines) est $N(t) = {f}$, $t$ en heures après l’ouverture.", "N", "t", [-1], [9, 12], [3, 6], [2, 5]],
  ["Soit $f(x) = {f}$.", "f", "x", [-2, -1, 1, 2, 3], [-6, -3, 2, 4, 5], [-5, -1, 3, 8], [-4, 0, 2, 7]],
  ["Soit $g(x) = {f}$.", "g", "x", [-3, -1, 1, 4], [-2, 1, 3, 6], [-7, -2, 4, 9], [-1, 5, 6]],
  ["On considère $h(t) = {f}$.", "h", "t", [0.5, -0.5, 2], [-4, 3, 5], [-6, 1, 2], [0, 3, -8]],
];

function tirageCtx(liste: Ctx[], deg: 2 | 3) {
  const [phrase, g, v, as, bs, cs, ds] = rc(liste);
  const coef = deg === 2 ? [rc(cs), rc(bs), rc(as)] : [rc(ds ?? [0]), rc(cs), rc(bs), rc(as)];
  const p: P = coef.map(arr);
  const t = termesDe(p);
  const affiche = randomInt(1, 4) === 1 && t.length >= 3 ? (melange(t) as Termes) : t;
  return { phrase: phrase.replace("{f}", poly(affiche, v)), g, v, p, contexte: !/^(Soit|On considère|Un économiste)/.test(phrase) };
}

function piegesDeg(p: P): Termes[] {
  const d = der(p);
  const out = piegesDerivee(p);
  if (p.length >= 3 && p[2]) out.push(termesDe(d.map((c, k) => (k === 1 ? p[2] : c)))); // oublie le 2 de x²
  if (p.length >= 3) out.push(termesDe(d.map((c, k) => (k === 0 ? 0 : c)))); // oublie le terme constant de f'
  return melange(out);
}

function qcmDerivee(q: ReturnType<typeof tirageCtx>, tournures: string[]) {
  const d = der(q.p);
  verifDer(q.p, d, "degré 2/3");
  return qcmPoly(
    `${q.phrase} ${rc(tournures)}`,
    `${q.g}'(${q.v})`,
    termesDe(d),
    piegesDeg(q.p),
    q.v,
    expl("$(u + v)' = u' + v'$, $(kx^n)' = knx^{n-1}$, et un nombre seul a pour dérivée 0.", "on dérive terme à terme.", termesDe(q.p).map(([c, k]) => `$(${poly([[c, k]], q.v)})' = ${k === 0 ? "0" : poly([[c * k, k - 1]], q.v)}$`).join(" ; ") + ".", `$${q.g}'(${q.v}) = ${tex(d, q.v)}$.`)
  );
}

function genDeg2Qcm() {
  const q = tirageCtx(DEG2.slice(-3), 2);
  return qcmDerivee(q, [`Quelle est sa dérivée ?`, `Que vaut $${q.g}'(${q.v})$ ?`, `On dérive : on obtient`]);
}

function genDeg2Contexte() {
  const q = tirageCtx(DEG2.slice(0, -3), 2);
  return qcmDerivee(q, [`Quelle est la dérivée $${q.g}'(${q.v})$ ?`, `Pour étudier les variations, on calcule $${q.g}'(${q.v})$. On trouve :`, `Que vaut $${q.g}'(${q.v})$ ?`]);
}

function genDeg2Coef() {
  const q = tirageCtx(DEG2, 2);
  const d = der(q.p);
  const quoi = rc(["m", "p"] as const);
  const val = quoi === "m" ? d[1] : d[0];
  return court(
    `${q.phrase} On écrit $${q.g}'(${q.v}) = m${q.v} + p$. Que vaut $${quoi}$ ?`,
    val,
    expl("$(ax^2 + bx + c)' = 2ax + b$.", "on dérive terme à terme, puis on lit le coefficient demandé.", `$${q.g}'(${q.v}) = ${tex(d, q.v)}$.`, `$${quoi} = ${n(val)}$.`)
  );
}

function genDeg3Qcm() {
  const q = tirageCtx(DEG3.slice(-3), 3);
  return qcmDerivee(q, [`Quelle est sa dérivée ?`, `Que vaut $${q.g}'(${q.v})$ ?`, `On dérive terme à terme. On obtient :`]);
}

function genDeg3Contexte() {
  const q = tirageCtx(DEG3.slice(0, -3), 3);
  return qcmDerivee(q, [`Quelle est la dérivée $${q.g}'(${q.v})$ ?`, `Pour étudier ses variations, on calcule $${q.g}'(${q.v})$. On trouve :`, `Que vaut $${q.g}'(${q.v})$ ?`]);
}

function genDeg3Coef() {
  const q = tirageCtx(DEG3, 3);
  const d = der(q.p);
  const quoi = rc(["m", "p", "q"] as const);
  const val = quoi === "m" ? d[2] : quoi === "p" ? d[1] : d[0];
  return court(
    `${q.phrase} On écrit $${q.g}'(${q.v}) = m${q.v}^2 + p${q.v} + q$. Que vaut $${quoi}$ ?`,
    val,
    expl("$(ax^3 + bx^2 + cx + d)' = 3ax^2 + 2bx + c$.", "on dérive terme à terme, puis on lit le coefficient demandé (0 s’il manque).", `$${q.g}'(${q.v}) = ${tex(d, q.v)}$.`, `$${quoi} = ${n(val)}$.`)
  );
}

function genDeg3Erreur() {
  const a = rc([-3, -2, -1, 1, 2, 4]);
  const b = rc([-5, -3, 2, 3, 6]);
  const c = rc([-8, -4, 1, 5, 7]);
  const d = rc([-6, 2, 9]);
  const v = rc(["x", "t"]);
  const t: Termes = [[a, 3], [b, 2], [c, 1], [d, 0]];
  const bon: Termes = [[3 * a, 2], [2 * b, 1], [c, 0]];
  const T3 = `l’erreur est dans la dérivée de $${poly([[a, 3]], v)}$`;
  const T2 = `l’erreur est dans la dérivée de $${poly([[b, 2]], v)}$`;
  const T1 = `l’erreur est dans la dérivée de $${poly([[c, 1]], v)}$`;
  const RIEN = "il n’y a pas d’erreur";
  const cas: Array<[Termes, string]> = [
    [[rc<[number, number]>([[a, 2], [3 * a, 3]]), [2 * b, 1], [c, 0]], T3],
    [[[3 * a, 2], rc<[number, number]>([[b, 1], [2 * b, 2]]), [c, 0]], T2],
    [[[3 * a, 2], [2 * b, 1], [c, 1]], T1],
    [bon, RIEN],
  ];
  let [ecrit, raison] = rc(cas);
  // Un « faux » écrit qui tombe juste par hasard n'est pas une erreur.
  if (raison !== RIEN && cleP(versP(ecrit)) === cleP(versP(bon))) raison = RIEN;
  return qcm(
    `Un élève dérive $f(${v}) = ${poly(t, v)}$ et écrit $f'(${v}) = ${poly(ecrit, v)}$. Que penses-tu de sa réponse ?`,
    raison,
    [T3, T2, T1, RIEN].filter((x) => x !== raison),
    expl("$(kx^n)' = knx^{n-1}$, et un nombre seul a pour dérivée 0.", "on dérive chaque terme et on compare à ce que l’élève a écrit.", `la bonne dérivée est $f'(${v}) = ${poly(bon, v)}$.`, `${raison}.`)
  );
}

/* =========================================================
   der_calculer_nombre_derive (★3)
========================================================= */

function genNdDepuisFprime() {
  const deg = rc([1, 2]);
  const p: P = deg === 1 ? [rc([-7, -3, 2, 5, 8]), rc([-4, -2, 3, 6])] : [rc([-5, -1, 4, 7]), rc([-6, -2, 3, 5]), rc([-3, -1, 2, 3])];
  const tournure = randomInt(0, 3);
  // Coût marginal et vitesse : quantité ou temps positif.
  const a = tournure >= 2 ? rc([1, 2, 3, 4, 5]) : rc([-3, -2, -1, 1, 2, 3, 4]);
  const val = ev(p, a);
  const pr = rc(PRODUITS);
  const text = ([
    `On a $f'(x) = ${tex(p)}$. Calcule $f'(${a})$.`,
    `La dérivée d’une fonction $g$ est $g'(x) = ${tex(p)}$. Que vaut $g'(${a})$ ?`,
    `Pour ${pr.ent}, le coût marginal est $C'(q) = ${tex(p, "q")}$. Calcule $C'(${a})$.`,
    `La vitesse d’un robot est $v(t) = d'(t) = ${tex(p, "t")}$. Calcule $d'(${a})$.`,
  ])[tournure];
  const calc = deg === 1 ? `${n(p[1])} \\times ${par(a)} ${p[0] < 0 ? "-" : "+"} ${n(Math.abs(p[0]))}` : `${n(p[2])} \\times ${par(a)}^2 ${p[1] < 0 ? "-" : "+"} ${n(Math.abs(p[1]))} \\times ${par(a)} ${p[0] < 0 ? "-" : "+"} ${n(Math.abs(p[0]))}`;
  return court(text, val, expl("$f'(a)$ s’obtient en remplaçant $x$ par $a$ dans $f'(x)$.", "on remplace, avec des parenthèses autour des nombres négatifs.", `$${calc} = ${n(val)}$.`, `le nombre dérivé vaut $${n(val)}$.`));
}

function genNdDepuisF() {
  const q = rc([true, false]) ? tirageCtx(DEG2, 2) : tirageCtx(DEG3, 3);
  const d = der(q.p);
  const a = q.contexte ? rc([1, 2, 3, 4, 5]) : rc([-3, -2, -1, 1, 2, 3]);
  const val = ev(d, a);
  verif(proche(dnum((x) => ev(q.p, x), a), val), "nombre dérivé depuis f");
  return court(
    `${q.phrase} ${rc([`Calcule $${q.g}'(${a})$.`, `Que vaut le nombre dérivé $${q.g}'(${a})$ ?`, `Calcule le nombre dérivé de $${q.g}$ en $${a}$.`])}`,
    val,
    expl("on dérive d’abord, puis on remplace.", "dérivée terme à terme, puis calcul de $f'(a)$.", `$${q.g}'(${q.v}) = ${tex(d, q.v)}$, donc $${q.g}'(${a}) = ${n(val)}$.`, `$${q.g}'(${a}) = ${n(val)}$.`)
  );
}

function genNdQcm() {
  const q = tirageCtx(DEG2, 2);
  const d = der(q.p);
  const a = rc([-2, -1, 1, 2, 3]);
  const val = ev(d, a);
  const pieges = [ev(q.p, a), q.p[2] * a + q.p[1], ev(d, -a), 2 * q.p[2] * a * a + q.p[1]];
  return qcmNombres(
    `${q.phrase} Que vaut $${q.g}'(${a})$ ?`,
    val,
    pieges,
    expl("$f'(a)$ est la valeur de la dérivée en $a$ (et non $f(a)$).", "on dérive, puis on remplace.", `$${q.g}'(${q.v}) = ${tex(d, q.v)}$, donc $${q.g}'(${a}) = ${n(val)}$.`, `$${q.g}'(${a}) = ${n(val)}$.`)
  );
}

function genNdContexte() {
  const s = rc(SITUATIONS);
  const p: P = [rc([5, 10, 20, 40]), rc([-6, -3, 2, 4, 8]), rc([-1, -0.5, 0.5, 1, 2])];
  const a = rc([1, 2, 3, 4, 5]);
  const val = ev(der(p), a);
  return court(
    `${s.qui} modélise ${s.quoi} par $${s.g}(${s.v}) = ${tex(p, s.v)}$ ($${s.v}$ en ${s.uv}). Calcule $${s.g}'(${a})$, la vitesse de variation à $${s.v} = ${a}$ (en ${s.vit}).`,
    val,
    expl("la vitesse de variation à l’instant $a$ est le nombre dérivé.", "on dérive, puis on remplace.", `$${s.g}'(${s.v}) = ${tex(der(p), s.v)}$, donc $${s.g}'(${a}) = ${n(val)}$.`, `à $${s.v} = ${a}$, la vitesse de variation vaut $${n(val)}$ (en ${s.vit}).`)
  );
}

/* =========================================================
   der_signe_etudier (★3)
========================================================= */

const RACINES = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 0.5, 1.5, 2.5, -1.5];

function affineRacine() {
  const r = rc(RACINES);
  let m = rc([-4, -3, -2, -1, 1, 2, 3, 4, 0.5, -0.5]);
  if (!Number.isInteger(r) && Math.abs(m) === 0.5) m = 2 * m;
  const p: P = [arr(-m * r), m];
  const forme = randomInt(1, 4);
  const txt = forme === 1 && p[0] !== 0 ? poly([[p[0], 0], [m, 1]]) : forme === 2 && Math.abs(m) !== 1 && r !== 0 ? `${n(m)}${fx(r)}` : tex(p);
  return { r, m, p, txt };
}

function genSigneAffine() {
  const { r, m, p, txt } = affineRacine();
  const sens = rc(["\\ge", "\\le"] as const);
  const positifADroite = m > 0;
  const bon = (sens === "\\ge") === positifADroite ? itv(r, Infinity) : itv(-Infinity, r);
  const autre = bon === itv(r, Infinity) ? itv(-Infinity, r) : itv(r, Infinity);
  const pieges = [autre, itv(-r, Infinity), itv(-Infinity, -r), itv(p[0], Infinity), itv(-Infinity, p[0]), itv(-Infinity, Infinity)].filter((x) => x !== bon);
  verif(Math.abs(ev(p, r)) < 1e-9, "signe affine : racine");
  verif((ev(p, r + 1) > 0) === positifADroite, "signe affine : sens");
  return qcm(
    rc([`On a $f'(x) = ${txt}$. Sur quel intervalle $f'(x) ${sens} 0$ ?`, `La dérivée d’une fonction $f$ est $f'(x) = ${txt}$. Pour quels $x$ a-t-on $f'(x) ${sens} 0$ ?`, `Un technicien obtient $f'(x) = ${txt}$. Où $f'(x) ${sens} 0$ ?`]),
    bon,
    melange(pieges),
    expl("une expression $mx + p$ change de signe en une seule valeur.", "on résout $f'(x) = 0$, puis on regarde le signe de $m$.", `$f'(x) = 0$ pour $x = ${n(r)}$ ; $m = ${n(m)}$ est ${m > 0 ? "positif" : "négatif"}, donc $f'$ est ${m > 0 ? "négative puis positive" : "positive puis négative"}.`, `$f'(x) ${sens} 0$ sur ${bon}.`)
  );
}

function signeMot(x: number) {
  return Math.abs(x) < 1e-9 ? "nul" : x > 0 ? "positif" : "négatif";
}

function genSigneValeur() {
  const deg = rc([1, 2]);
  let p: P;
  let racines: number[];
  if (deg === 1) {
    const a = affineRacine();
    p = a.p;
    racines = [a.r];
  } else {
    const r1 = randomInt(-3, 1);
    const r2 = r1 + randomInt(2, 4);
    const k = rc([-2, -1, 1, 2, 3]);
    p = [k * r1 * r2, -k * (r1 + r2), k];
    racines = [r1, r2];
  }
  const c0 = randomInt(1, 5) === 1 ? rc(racines) : rc([-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].filter((x) => !racines.includes(x)));
  const val = ev(p, c0);
  const c = n(c0);
  const bon = signeMot(val);
  const s = rc(SITUATIONS);
  const text = rc([
    `On a $f'(x) = ${tex(p)}$. Quel est le signe de $f'(${c})$ ?`,
    `${s.qui} étudie une fonction $f$ de dérivée $f'(x) = ${tex(p)}$. Quel est le signe de $f'(${c})$ ?`,
    `Sans tracer de courbe : si $f'(x) = ${tex(p)}$, quel est le signe de $f'(${c})$ ?`,
  ]);
  return qcm(
    text,
    bon,
    ["positif", "négatif", "nul", "on ne peut pas savoir"].filter((x) => x !== bon),
    expl("le signe de $f'(c)$ se trouve en calculant $f'(c)$.", "on remplace $x$ par la valeur, avec des parenthèses.", `$f'(${c}) = ${n(val)}$.`, `$f'(${c})$ est ${bon}.`)
  );
}

function genSigneRacine() {
  const s = rc(SITUATIONS);
  const a = rc([-2, -1, -0.5, 0.5, 1, 2, 3]);
  const r = rc([1, 2, 3, 4, 5, 6, 1.5, 2.5]);
  const b = arr(-2 * a * r);
  const c = rc([5, 10, 12, 20, 30]);
  const p: P = [c, b, a];
  verif(Math.abs(ev(der(p), r)) < 1e-9, "racine de f'");
  const text = rc([
    `${s.qui} modélise ${s.quoi} par $${s.g}(${s.v}) = ${tex(p, s.v)}$ ($${s.v}$ en ${s.uv}). Pour quelle valeur de $${s.v}$ la dérivée $${s.g}'$ s’annule-t-elle ?`,
    `Soit $f(x) = ${tex(p)}$. En quelle valeur de $x$ la dérivée $f'$ s’annule-t-elle ?`,
    `On étudie le signe de la dérivée de $f(x) = ${tex(p)}$. Pour quel $x$ a-t-on $f'(x) = 0$ ?`,
  ]);
  return court(text, r, expl("étudier le signe de $f'$ commence par chercher où elle s’annule.", "on dérive, puis on résout $f'(x) = 0$.", `$f'(x) = ${tex(der(p))}$ ; $${tex(der(p))} = 0$ donne $x = ${n(r)}$.`, `la dérivée s’annule en $${n(r)}$.`));
}

function genSigneGrapheFp() {
  const r = randomInt(-3, 3);
  const m = rc([-2, -1, -0.5, 0.5, 1, 2]);
  const sens = rc(["\\ge", "\\le"] as const);
  const bon = (sens === "\\ge") === m > 0 ? itv(r, Infinity) : itv(-Infinity, r);
  const pieges = [bon === itv(r, Infinity) ? itv(-Infinity, r) : itv(r, Infinity), itv(-Infinity, Infinity), itv(-r * m, Infinity), itv(-Infinity, -r * m)];
  const canvas = {
    kind: "fonctionGraphique",
    titre: "La courbe de f ′ (et non celle de f)",
    xmin: -5,
    xmax: 5,
    ymin: -5,
    ymax: 5,
    grille: true,
    courbes: [{ id: "fp", type: "affine", a: m, b: -m * r, couleur: "#7c3aed" }],
  } as TutorGeneratedQuestionV4["canvas"];
  return qcm(
    rc([
      `La droite tracée est la courbe de la dérivée $f'$. Sur quel intervalle a-t-on $f'(x) ${sens} 0$ ?`,
      `On a tracé $f'$ (et non $f$). Pour quels $x$ a-t-on $f'(x) ${sens} 0$ ?`,
      `Une ingénieure a tracé la dérivée $f'$ d’une fonction. Lis sur quel intervalle $f'(x) ${sens} 0$.`,
    ]),
    bon,
    pieges.filter((x) => x !== bon),
    expl("$f'(x) \\ge 0$ là où la courbe de $f'$ est au-dessus de l’axe des abscisses.", "on repère où la droite coupe l’axe, puis de quel côté elle est au-dessus.", `la droite coupe l’axe en $x = ${r}$ et elle ${m > 0 ? "monte" : "descend"}.`, `$f'(x) ${sens} 0$ sur ${bon}.`),
    canvas
  );
}

/* =========================================================
   der_signe_factorisee (★4) et der_verifier_forme_factorisee (★4)
========================================================= */

/** k(x − a)(x − b), le facteur « x » (racine 0) écrit en premier : « 2x(x - 3) ». */
export function prodFact(K: number, a: number, b: number, v = "x") {
  const [u, w] = b === 0 && a !== 0 ? [b, a] : [a, b];
  return `${pref(K)}${fx(u, v)}${fx(w, v)}`;
}

/** f'(x) = K(x − r1)(x − r2), affichée sous une forme factorisée variée. */
function factorisee(v = "x") {
  for (;;) {
    const r1 = randomInt(-4, 5);
    const r2 = randomInt(-4, 6);
    if (r1 === r2) continue;
    const forme = randomInt(1, 5);
    let K = 1;
    let txt = "";
    if (forme === 1) {
      K = rc([2, 3, -2, -3, 4, 0.5]);
      txt = prodFact(K, r1, r2, v);
    } else if (forme === 2) {
      if (r2 === 0) continue;
      K = -1;
      txt = randomInt(1, 2) === 1 || r1 === 0 ? `${fx(r1, v)}(${n(r2)} - ${v})` : `(${n(r2)} - ${v})${fx(r1, v)}`;
    } else if (forme === 3) {
      if (r1 === 0) continue;
      const a = rc([2, 3, 4]);
      K = a;
      const f1 = `(${poly([[a, 1], [-a * r1, 0]], v)})`;
      txt = randomInt(1, 2) === 1 && r2 !== 0 ? `${f1}${fx(r2, v)}` : `${fx(r2, v)}${f1}`;
    } else if (forme === 4) {
      if (r1 === 0 || r2 === 0) continue;
      const a = rc([2, 3]);
      K = -a;
      txt = `(${poly([[a, 1], [-a * r1, 0]], v)})(${n(r2)} - ${v})`;
    } else {
      K = -1;
      txt = prodFact(-1, r1, r2, v);
    }
    const lo = Math.min(r1, r2);
    const hi = Math.max(r1, r2);
    const fp = (x: number) => K * (x - r1) * (x - r2);
    const P2: P = [arr(K * r1 * r2), arr(-K * (r1 + r2)), K];
    return { r1, r2, lo, hi, K, txt, fp, P2 };
  }
}

function domaine(lo: number, hi: number) {
  return { al: lo - randomInt(1, 3), be: hi + randomInt(1, 3) };
}

function genFactIntervalle() {
  const F = factorisee();
  const { al, be } = domaine(F.lo, F.hi);
  const sens = rc(["\\ge", "\\le"] as const);
  const milieuPositif = F.K < 0;
  const veutPositif = sens === "\\ge";
  const MIL = itv(F.lo, F.hi);
  const EXT = `${itv(al, F.lo)} et ${itv(F.hi, be)}`;
  const bon = milieuPositif === veutPositif ? MIL : EXT;
  verif(F.fp((F.lo + F.hi) / 2) > 0 === milieuPositif, "factorisée : signe au milieu");
  const pieges = [bon === MIL ? EXT : MIL, itv(al, F.lo), itv(F.hi, be), itv(-F.hi, -F.lo)].filter((x) => x !== bon);
  return qcm(
    rc([
      `Sur $[${n(al)}\\,;${n(be)}]$, on a $f'(x) = ${F.txt}$. Sur quel(s) intervalle(s) a-t-on $f'(x) ${sens} 0$ ?`,
      `La dérivée d’une fonction $f$ définie sur $[${n(al)}\\,;${n(be)}]$ est $f'(x) = ${F.txt}$. Où $f'(x) ${sens} 0$ ?`,
      `${rc(GESTION)} étudie une fonction sur $[${n(al)}\\,;${n(be)}]$, de dérivée $f'(x) = ${F.txt}$. Où $f'(x) ${sens} 0$ ?`,
    ]),
    bon,
    melange(pieges),
    expl("un produit est positif quand ses facteurs ont le même signe.", "on cherche où chaque facteur s’annule, puis on fait un tableau de signes.", `$f'$ s’annule en $${n(F.lo)}$ et en $${n(F.hi)}$ ; elle est ${milieuPositif ? "positive" : "négative"} entre les deux et ${milieuPositif ? "négative" : "positive"} à l’extérieur.`, `$f'(x) ${sens} 0$ sur ${bon}.`)
  );
}

function genFactRacines() {
  const F = factorisee();
  const ens = (a: number, b: number) => (a === b ? `$x = ${n(a)}$ seulement` : `$x = ${n(Math.min(a, b))}$ ou $x = ${n(Math.max(a, b))}$`);
  const bon = ens(F.r1, F.r2);
  const pieges = [ens(-F.r1, -F.r2), `$x = ${n(F.r1)}$ seulement`, `$x = ${n(F.r2)}$ seulement`];
  if (Math.abs(F.K) !== 1) pieges.push(`$x = ${n(F.K)}$, $x = ${n(F.lo)}$ ou $x = ${n(F.hi)}$`);
  verif(Math.abs(F.fp(F.r1)) < 1e-9 && Math.abs(F.fp(F.r2)) < 1e-9, "factorisée : racines");
  return qcm(
    rc([`On a $f'(x) = ${F.txt}$. Pour quelles valeurs de $x$ a-t-on $f'(x) = 0$ ?`, `Où s’annule la dérivée $f'(x) = ${F.txt}$ ?`, `Un élève doit résoudre $f'(x) = 0$ avec $f'(x) = ${F.txt}$. Quelles sont les solutions ?`]),
    bon,
    melange(pieges.filter((x) => x !== bon)),
    expl("un produit est nul si l’un de ses facteurs est nul.", "on annule chaque facteur qui contient $x$ (le nombre devant ne s’annule jamais).", `les facteurs s’annulent en $${n(F.r1)}$ et en $${n(F.r2)}$.`, `$f'(x) = 0$ pour ${bon}.`)
  );
}

function genFactSigneEn() {
  const F = factorisee();
  const c = randomInt(1, 5) === 1 ? rc([F.r1, F.r2]) : rc([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].filter((x) => x !== F.r1 && x !== F.r2));
  const bon = signeMot(F.fp(c));
  return qcm(
    rc([`On a $f'(x) = ${F.txt}$. Quel est le signe de $f'(${c})$ ?`, `Avec $f'(x) = ${F.txt}$, $f'(${c})$ est :`, `${rc(SITUATIONS).qui} trouve $f'(x) = ${F.txt}$. Quel est le signe de $f'(${c})$ ?`]),
    bon,
    ["positif", "négatif", "nul", "on ne peut pas savoir"].filter((x) => x !== bon),
    expl("le signe d’un produit dépend du signe de chaque facteur.", "on remplace $x$ par la valeur dans chaque facteur.", `$f'(${c}) = ${n(F.fp(c))}$.`, `$f'(${c})$ est ${bon}.`)
  );
}

function genFactSignes() {
  const F = factorisee();
  const { al, be } = domaine(F.lo, F.hi);
  const motif = (a: string, b: string, c: string) => `$${a}$, puis $${b}$, puis $${c}$`;
  const bon = F.K > 0 ? motif("+", "-", "+") : motif("-", "+", "-");
  const tous = [motif("+", "-", "+"), motif("-", "+", "-"), motif("+", "+", "-"), motif("-", "-", "+"), motif("+", "-", "-")];
  verif((F.fp(al) > 0) === F.K > 0, "factorisée : motif");
  return qcm(
    rc([
      `Sur $[${n(al)}\\,;${n(be)}]$, $f'(x) = ${F.txt}$. De gauche à droite, quels sont les signes successifs de $f'(x)$ ?`,
      `Dans le tableau de signes de $f'(x) = ${F.txt}$ sur $[${n(al)}\\,;${n(be)}]$, quelle ligne de signes trouve-t-on ?`,
    ]),
    bon,
    melange(tous.filter((x) => x !== bon)),
    expl("un produit de deux facteurs du premier degré change de signe en chacune de ses racines.", "on remplit un tableau de signes, facteur par facteur.", `$f'$ s’annule en $${n(F.lo)}$ et en $${n(F.hi)}$ ; le coefficient de $x^2$ dans le produit est $${n(F.K)}$.`, `les signes sont ${bon}.`)
  );
}

function piegesForme(F: ReturnType<typeof factorisee>) {
  const g = (K: number, a: number, b: number) => ({ txt: prodFact(K, a, b), P: [arr(K * a * b), arr(-K * (a + b)), K] as P });
  return [g(F.K, -F.r1, -F.r2), g(1, F.r1, F.r2), g(F.K, F.r1, -F.r2), g(-F.K, F.r1, F.r2), g(F.K, -F.r1, F.r2)];
}

function genVerifForme() {
  const F = factorisee();
  const bonK = cleP(F.P2);
  const vus = new Set([bonK]);
  const pieges: string[] = [];
  for (const p of melange(piegesForme(F))) {
    const k = cleP(p.P);
    if (!vus.has(k)) {
      vus.add(k);
      pieges.push(`$${p.txt}$`);
    }
  }
  verif(proche(F.fp(1.7), ev(F.P2, 1.7)), "forme factorisée");
  return qcm(
    rc([`On a calculé $f'(x) = ${tex(F.P2)}$. Quelle forme factorisée est égale à $f'(x)$ ?`, `Laquelle de ces expressions est égale à $${tex(F.P2)}$ pour tout $x$ ?`, `Pour étudier le signe de $f'(x) = ${tex(F.P2)}$, on cherche sa forme factorisée. Laquelle est juste ?`]),
    `$${F.txt}$`,
    pieges,
    expl("deux expressions sont égales si elles ont le même développement.", "on développe chaque proposition et on compare à $f'(x)$.", `$${F.txt} = ${tex(F.P2)}$.`, `la bonne forme est $${F.txt}$.`)
  );
}

function genVerifDevelopper() {
  const F = factorisee();
  const bon = termesDe(F.P2);
  const [c, b, a] = F.P2;
  return qcmPoly(
    rc([`On développe $${F.txt}$. On obtient :`, `Pour vérifier que $f'(x) = ${F.txt}$, on développe ce produit. Quel est le résultat ?`, `Quelle est la forme développée de $${F.txt}$ ?`]),
    "",
    bon,
    [[[a, 2], [b, 1], [-c, 0]], [[a, 2], [-b, 1], [c, 0]], [[1, 2], [arr(b / a), 1], [arr(c / a), 0]], [[a, 2], [c, 0]], [[-a, 2], [b, 1], [c, 0]]],
    "x",
    expl("développer, c’est distribuer chaque terme du premier facteur sur le second.", "on multiplie terme à terme, puis on regroupe.", `$${F.txt} = ${tex(F.P2)}$.`, `le développement est $${tex(F.P2)}$.`)
  );
}

function genVerifCoef() {
  const F = factorisee();
  const quoi = rc(["x^2", "x", "c"] as const);
  const val = quoi === "x^2" ? F.P2[2] : quoi === "x" ? F.P2[1] : F.P2[0];
  const txt = quoi === "c" ? "le nombre seul (sans $x$)" : `le coefficient de $${quoi}$`;
  return court(
    rc([`On développe $${F.txt}$. Quel est ${txt} ?`, `Pour vérifier une dérivée, on développe $${F.txt}$. Que vaut ${txt} ?`]),
    val,
    expl("développer, c’est distribuer puis regrouper.", "on développe le produit en entier, puis on lit le coefficient demandé.", `$${F.txt} = ${tex(F.P2)}$.`, `${txt} vaut $${n(val)}$.`)
  );
}

function genVerifOuiNon() {
  const F = factorisee();
  const juste = randomInt(1, 2) === 1;
  let propose = F.txt;
  if (!juste) {
    const p = rc(piegesForme(F).filter((q) => cleP(q.P) !== cleP(F.P2)));
    propose = p.txt;
  }
  const vf = randomInt(1, 2) === 1;
  const [oui, non] = vf ? ["Vrai", "Faux"] : ["Oui", "Non"];
  return qcm(
    vf
      ? `Vrai ou faux ? Pour tout $x$, $${tex(F.P2)} = ${propose}$.`
      : `On a calculé $f'(x) = ${tex(F.P2)}$. Un camarade affirme que $f'(x) = ${propose}$. A-t-il raison ?`,
    juste ? oui : non,
    [juste ? non : oui],
    expl("pour vérifier une forme factorisée, on la développe.", "on développe la proposition et on compare.", `$${F.txt} = ${tex(F.P2)}$.`, juste ? "les deux expressions sont égales." : "le développement ne donne pas $f'(x)$ : la proposition est fausse.")
  );
}

function genVerifDepuisF() {
  // Le sujet type bac : f donnée, on calcule f', on vérifie sa forme factorisée.
  for (;;) {
    const F = factorisee();
    // f(x) = K(x³/3 − (r1+r2)x²/2 + r1r2 x) + d, avec des coefficients « propres ».
    const c3 = F.K / 3;
    const c2 = (-F.K * (F.r1 + F.r2)) / 2;
    if (!Number.isInteger(c3 * 2) || !Number.isInteger(c2 * 2)) continue;
    const d = rc([-4, 1, 2, 5]);
    const p: P = [d, arr(F.K * F.r1 * F.r2), arr(c2), arr(c3)];
    verifDer(p, F.P2, "vérifier depuis f");
    const vus = new Set([cleP(F.P2)]);
    const pieges: string[] = [];
    for (const q of melange(piegesForme(F))) {
      if (!vus.has(cleP(q.P))) {
        vus.add(cleP(q.P));
        pieges.push(`$f'(x) = ${q.txt}$`);
      }
    }
    return qcm(
      rc([`Soit $f(x) = ${tex(p)}$. Quelle est la forme factorisée de $f'(x)$ ?`, `On donne $f(x) = ${tex(p)}$. Après avoir calculé $f'(x)$, laquelle de ces égalités est vraie ?`]),
      `$f'(x) = ${F.txt}$`,
      pieges,
      expl("on dérive, puis on développe chaque proposition pour comparer.", "$(ax^3 + bx^2 + cx + d)' = 3ax^2 + 2bx + c$.", `$f'(x) = ${tex(F.P2)}$ et $${F.txt} = ${tex(F.P2)}$.`, `$f'(x) = ${F.txt}$.`)
    );
  }
}

/* =========================================================
   der_variations_deduire (★3)
========================================================= */

function genVarAffine() {
  const { r, m, txt } = affineRacine();
  const demande = rc(["croissante", "décroissante"] as const);
  const croitADroite = m > 0;
  const bon = (demande === "croissante") === croitADroite ? itv(r, Infinity) : itv(-Infinity, r);
  const autre = bon === itv(r, Infinity) ? itv(-Infinity, r) : itv(r, Infinity);
  return qcm(
    rc([`Une fonction $f$ a pour dérivée $f'(x) = ${txt}$. Sur quel intervalle $f$ est-elle ${demande} ?`, `On sait que $f'(x) = ${txt}$ sur $\\mathbb{R}$. Où $f$ est-elle ${demande} ?`, `${rc(SITUATIONS).qui} trouve $f'(x) = ${txt}$. Sur quel intervalle $f$ est-elle ${demande} ?`]),
    bon,
    [autre, itv(-Infinity, Infinity), itv(-r, Infinity), itv(-Infinity, -r)].filter((x) => x !== bon),
    expl("$f$ est croissante là où $f' \\ge 0$, décroissante là où $f' \\le 0$.", "on cherche où $f'$ s’annule, puis son signe de chaque côté.", `$f'$ s’annule en $${n(r)}$ ; elle est ${m > 0 ? "négative avant, positive après" : "positive avant, négative après"}.`, `$f$ est ${demande} sur ${bon}.`)
  );
}

function genVarSigneMots() {
  const s = rc(SITUATIONS);
  const a = 0;
  const r1 = rc([2, 3, 4, 5]);
  const r2 = r1 + rc([2, 3, 4]);
  const b = r2 + rc([2, 3]);
  const trois = randomInt(1, 2) === 1;
  const debutPositif = rc([true, false]);
  const mot = (pos: boolean) => (pos ? "croissante" : "décroissante");
  const signe = (pos: boolean) => (pos ? "$> 0$" : "$< 0$");
  const g = `${s.g}'(${s.v})`;
  const desc = trois
    ? `$${g}$ est ${signe(debutPositif)} sur $[${a}\\,;${r1}[$, ${signe(!debutPositif)} sur $]${r1}\\,;${r2}[$ et ${signe(debutPositif)} sur $]${r2}\\,;${b}]$`
    : `$${g}$ est ${signe(debutPositif)} sur $[${a}\\,;${r1}[$ et ${signe(!debutPositif)} sur $]${r1}\\,;${b}]$`;
  const rep = (pos: boolean) =>
    trois
      ? `${mot(pos)} sur $[${a}\\,;${r1}]$, ${mot(!pos)} sur $[${r1}\\,;${r2}]$, ${mot(pos)} sur $[${r2}\\,;${b}]$`
      : `${mot(pos)} sur $[${a}\\,;${r1}]$, puis ${mot(!pos)} sur $[${r1}\\,;${b}]$`;
  const bon = cap(rep(debutPositif));
  const pieges = [cap(rep(!debutPositif)), `${mot(debutPositif) === "croissante" ? "Croissante" : "Décroissante"} sur $[${a}\\,;${b}]$`, trois ? `Croissante sur $[${a}\\,;${r2}]$, puis décroissante sur $[${r2}\\,;${b}]$` : `Croissante sur $[${a}\\,;${b}]$, car $${g}$ change de signe`];
  return qcm(
    `${s.qui} étudie ${s.quoi}, ${s.fem ? "notée" : "noté"} $${s.g}(${s.v})$ ($${s.v}$ en ${s.uv}). On sait que ${desc}. Quelles sont les variations de $${s.g}$ ?`,
    bon,
    pieges.filter((x) => x !== bon),
    expl("$f' > 0$ : $f$ croît ; $f' < 0$ : $f$ décroît.", "on traduit chaque signe de la dérivée en sens de variation.", `${desc}.`, `$${s.g}$ est ${rep(debutPositif)}.`)
  );
}

function genVarGrapheFp() {
  const parab = randomInt(1, 2) === 1;
  const demande = rc(["croissante", "décroissante"] as const);
  let bon = "";
  let pieges: string[] = [];
  let courbe: object;
  let obs = "";
  if (parab) {
    const r1 = randomInt(-3, 0);
    const r2 = r1 + randomInt(2, 4);
    const k = rc([0.5, 1, -0.5, -1]);
    courbe = { id: "fp", type: "quadratique", a: k, b: -k * (r1 + r2), c: k * r1 * r2, couleur: "#7c3aed" };
    const milieuPos = k < 0;
    const MIL = itv(r1, r2);
    const EXT = `${itv(-5, r1)} et ${itv(r2, 5)}`;
    bon = (demande === "croissante") === milieuPos ? MIL : EXT;
    pieges = [bon === MIL ? EXT : MIL, k > 0 ? itv((r1 + r2) / 2, 5) : itv(-5, (r1 + r2) / 2), itv(-5, 5)];
    obs = `la courbe de $f'$ coupe l’axe en $${r1}$ et $${r2}$ ; elle est ${milieuPos ? "au-dessus" : "au-dessous"} de l’axe entre les deux`;
  } else {
    const r = randomInt(-3, 3);
    const m = rc([-2, -1, -0.5, 0.5, 1, 2]);
    courbe = { id: "fp", type: "affine", a: m, b: -m * r, couleur: "#7c3aed" };
    bon = (demande === "croissante") === m > 0 ? itv(r, 5) : itv(-5, r);
    pieges = [bon === itv(r, 5) ? itv(-5, r) : itv(r, 5), itv(-5, 5), itv(-r, 5)];
    obs = `la courbe de $f'$ coupe l’axe en $${r}$ ; elle est au-dessus de l’axe ${m > 0 ? "à droite" : "à gauche"}`;
  }
  const canvas = { kind: "fonctionGraphique", titre: "La courbe de f ′ (et non celle de f)", xmin: -5, xmax: 5, ymin: -5, ymax: 5, grille: true, courbes: [courbe] } as TutorGeneratedQuestionV4["canvas"];
  return qcm(
    rc([`On a tracé la courbe de la DÉRIVÉE $f'$ sur $[-5\\,;5]$. Sur quel(s) intervalle(s) $f$ est-elle ${demande} ?`, `Attention : la courbe tracée est celle de $f'$. Où la fonction $f$ est-elle ${demande} sur $[-5\\,;5]$ ?`, `Un technicien a tracé $f'$ sur $[-5\\,;5]$. Sur quel(s) intervalle(s) $f$ est-elle ${demande} ?`]),
    bon,
    pieges.filter((x) => x !== bon),
    expl("$f$ croît là où $f' \\ge 0$ (courbe de $f'$ au-dessus de l’axe).", "on lit le SIGNE de $f'$, pas son sens de variation.", `${obs}.`, `$f$ est ${demande} sur ${bon}.`),
    canvas
  );
}

function genVarContexte() {
  const s = rc(SITUATIONS);
  const a = randomInt(0, 4);
  const b = a + randomInt(2, 6);
  const pos = rc([true, false]);
  const ent = `entre $${s.v} = ${a}$ et $${s.v} = ${b}$`;
  const bon = pos ? `${monte(s)} ${ent}` : `${baisse(s)} ${ent}`;
  return qcm(
    `${s.qui} étudie ${s.quoi}, ${s.fem ? "notée" : "noté"} $${s.g}(${s.v})$ ($${s.v}$ en ${s.uv}). On sait que $${s.g}'(${s.v}) ${pos ? ">" : "<"} 0$ sur $[${a}\\,;${b}]$. Que peut-on dire ?`,
    bon,
    [pos ? `${baisse(s)} ${ent}` : `${monte(s)} ${ent}`, `Les valeurs de $${s.g}$ sont ${pos ? "positives" : "négatives"} ${ent}`, `${cap(s.quoi)} ne varie pas ${ent}`],
    expl("le signe de la dérivée donne le sens de variation.", "$f' > 0$ : la grandeur augmente ; $f' < 0$ : elle diminue.", `$${s.g}' ${pos ? ">" : "<"} 0$ sur $[${a}\\,;${b}]$.`, `${bon.charAt(0).toLowerCase() + bon.slice(1)}. Attention : le signe de $${s.g}'$ ne dit rien du signe de $${s.g}$.`)
  );
}

/* =========================================================
   der_tableau_dresser (★4) et der_extremum_determiner (★4)
========================================================= */

/** f(x) = s(2x³ − 3(r1+r2)x² + 6r1r2x) + d, f'(x) = 6s(x − r1)(x − r2). */
function cubiqueEntiere() {
  const r1 = randomInt(-3, 3);
  const r2 = r1 + randomInt(1, 3);
  const s = rc([1, -1]);
  const d = randomInt(-5, 5);
  const p: P = [d, 6 * s * r1 * r2, -3 * s * (r1 + r2), 2 * s];
  const fpTxt = prodFact(6 * s, r1, r2);
  const fp: P = der(p);
  verifDer(p, fp, "cubique");
  verif(proche(ev(fp, 1.3), 6 * s * (1.3 - r1) * (1.3 - r2)), "cubique : forme factorisée");
  return { r1, r2, s, d, p, fpTxt, f: (x: number) => ev(p, x) };
}

function genTabVariations() {
  const C = cubiqueEntiere();
  const al = C.r1 - randomInt(1, 2);
  const be = C.r2 + randomInt(1, 2);
  const mot = (up: boolean) => (up ? "croissante" : "décroissante");
  const rep = (up: boolean) => `${cap(mot(up))} sur $[${al}\\,;${C.r1}]$, ${mot(!up)} sur $[${C.r1}\\,;${C.r2}]$, ${mot(up)} sur $[${C.r2}\\,;${be}]$`;
  const bon = rep(C.s > 0);
  return qcm(
    rc([
      `Sur $[${al}\\,;${be}]$, $f(x) = ${tex(C.p)}$ et on admet que $f'(x) = ${C.fpTxt}$. Quelles sont les variations de $f$ ?`,
      `Une fonction $f$ définie sur $[${al}\\,;${be}]$ a pour dérivée $f'(x) = ${C.fpTxt}$. Quel tableau de variations est juste ?`,
      `${rc(GESTION)} étudie $f(x) = ${tex(C.p)}$ sur $[${al}\\,;${be}]$, avec $f'(x) = ${C.fpTxt}$. Quelles sont les variations de $f$ ?`,
    ]),
    bon,
    [rep(C.s < 0), `Croissante sur $[${al}\\,;${be}]$`, `${cap(mot(C.s > 0))} sur $[${al}\\,;${C.r2}]$, puis ${mot(C.s < 0)} sur $[${C.r2}\\,;${be}]$`],
    expl("$f$ croît là où $f' \\ge 0$, décroît là où $f' \\le 0$.", "on fait le tableau de signes de $f'$, puis on met les flèches.", `$f'$ s’annule en $${C.r1}$ et $${C.r2}$ ; elle est ${C.s > 0 ? "positive" : "négative"} à l’extérieur et ${C.s > 0 ? "négative" : "positive"} entre les deux.`, `${bon}.`)
  );
}

function genTabValeur() {
  const C = cubiqueEntiere();
  const al = C.r1 - randomInt(1, 2);
  const be = C.r2 + randomInt(1, 2);
  const x = rc([C.r1, C.r2, al, be]);
  const val = C.f(x);
  return court(
    rc([
      `Sur $[${al}\\,;${be}]$, $f(x) = ${tex(C.p)}$ et $f'(x) = ${C.fpTxt}$. Dans le tableau de variations de $f$, quelle valeur écrit-on en $x = ${x}$ ?`,
      `On dresse le tableau de variations de $f(x) = ${tex(C.p)}$ sur $[${al}\\,;${be}]$ (avec $f'(x) = ${C.fpTxt}$). Quel nombre place-t-on au bout de la flèche, en $x = ${x}$ ?`,
    ]),
    val,
    expl("dans un tableau de variations, on écrit les images $f(x)$ aux bornes et là où $f'$ s’annule.", "on calcule $f(x)$ à la valeur demandée.", `$f(${x}) = ${n(val)}$.`, `on écrit $${n(val)}$ en $x = ${x}$.`)
  );
}

function genTabFleches() {
  const trois = randomInt(1, 2) === 1;
  const M = (...xs: string[]) => xs.join(" puis ");
  let text = "";
  let bon = "";
  let ex = "";
  if (trois) {
    const C = cubiqueEntiere();
    const al = C.r1 - 2;
    const be = C.r2 + 2;
    bon = C.s > 0 ? M("↗", "↘", "↗") : M("↘", "↗", "↘");
    text = rc([`Sur $[${al}\\,;${be}]$, $f'(x) = ${C.fpTxt}$. Quelles flèches trouve-t-on, de gauche à droite, dans le tableau de variations de $f$ ?`, `On admet que $f'(x) = ${C.fpTxt}$ sur $[${al}\\,;${be}]$. Comment varie $f$, de gauche à droite ?`]);
    ex = `$f'$ s’annule en $${C.r1}$ et $${C.r2}$ ; son signe est ${C.s > 0 ? "$+$, $-$, $+$" : "$-$, $+$, $-$"}.`;
  } else {
    const { r, m, txt } = affineRacine();
    bon = m > 0 ? M("↘", "↗") : M("↗", "↘");
    text = rc([`Sur $\\mathbb{R}$, $f'(x) = ${txt}$. Quelles flèches trouve-t-on, de gauche à droite, dans le tableau de variations de $f$ ?`, `On a $f'(x) = ${txt}$. Comment varie $f$ sur $\\mathbb{R}$, de gauche à droite ?`]);
    ex = `$f'$ s’annule en $${n(r)}$ ; son signe est ${m > 0 ? "$-$ puis $+$" : "$+$ puis $-$"}.`;
  }
  const tous = [M("↗", "↘"), M("↘", "↗"), M("↗", "↘", "↗"), M("↘", "↗", "↘"), M("↗", "↗", "↘")];
  return qcm(text, bon, tous.filter((x) => x !== bon), expl("signe $+$ de $f'$ : flèche ↗ ; signe $-$ : flèche ↘.", "on fait le tableau de signes de $f'$, puis on traduit chaque signe en flèche.", ex, `les flèches sont : ${bon}.`));
}

function genTabDeg2() {
  const a = rc([-2, -1, -0.5, 0.5, 1, 2]);
  const sx = rc([-3, -2, -1, 1, 2, 3, 4]);
  const w = rc([-6, -4, -1, 2, 5, 7, 8].filter((x) => x !== sx && x !== -sx));
  const p: P = [arr(a * sx * sx + w), arr(-2 * a * sx), a];
  verif(Math.abs(ev(der(p), sx)) < 1e-9 && proche(ev(p, sx), w), "tableau degré 2");
  const mini = a > 0;
  const rep = (min: boolean, x: number, y: number) =>
    min ? `Décroissante sur $]-\\infty\\,;${n(x)}]$, puis croissante ; minimum $${n(y)}$ en $x = ${n(x)}$` : `Croissante sur $]-\\infty\\,;${n(x)}]$, puis décroissante ; maximum $${n(y)}$ en $x = ${n(x)}$`;
  const bon = rep(mini, sx, w);
  const pieges = [rep(!mini, sx, w), rep(mini, sx, p[0]), rep(mini, w, sx), rep(mini, -sx, w)];
  const vus = new Set([bon]);
  return qcm(
    rc([`Soit $f(x) = ${tex(p)}$ sur $\\mathbb{R}$. Quel est son tableau de variations ?`, `${rc(SITUATIONS).qui} étudie $f(x) = ${tex(p)}$. Quel résumé du tableau de variations est juste ?`]),
    bon,
    pieges.filter((x) => !vus.has(x) && (vus.add(x), true)),
    expl("$f$ croît là où $f' \\ge 0$, décroît là où $f' \\le 0$.", "on dérive, on résout $f'(x) = 0$, puis on calcule l’image.", `$f'(x) = ${tex(der(p))}$ s’annule en $${n(sx)}$ ; $f(${n(sx)}) = ${n(w)}$.`, `${bon}.`)
  );
}

/** Une cubique et un intervalle où l'extremum intérieur demandé est global. */
function cubiqueExtremum() {
  for (;;) {
    const C = cubiqueEntiere();
    const al = C.r1 - rc([0.5, 1]);
    const be = C.r2 + rc([0.5, 1]);
    const veutMax = rc([true, false]);
    // s > 0 : maximum local en r1, minimum local en r2.
    const x = (veutMax === C.s > 0) ? C.r1 : C.r2;
    const y = C.f(x);
    // Extremum STRICT : ailleurs (et aux bornes), f reste nettement en dessous (au-dessus).
    let ok = true;
    for (let k = 0; k <= 200; k++) {
      const t = al + ((be - al) * k) / 200;
      if (Math.abs(t - x) < 0.3) continue;
      if (veutMax ? C.f(t) > y - 0.1 : C.f(t) < y + 0.1) ok = false;
    }
    for (const b of [al, be]) if (veutMax ? C.f(b) > y - 0.5 : C.f(b) < y + 0.5) ok = false;
    if (!ok) continue;
    return { C, al, be, veutMax, x, y };
  }
}

function genExtAbscisse() {
  const E = cubiqueExtremum();
  const mot = E.veutMax ? "maximum" : "minimum";
  return court(
    rc([
      `Sur $[${n(E.al)}\\,;${n(E.be)}]$, $f(x) = ${tex(E.C.p)}$ et $f'(x) = ${E.C.fpTxt}$. En quelle valeur de $x$ la fonction $f$ atteint-elle son ${mot} ?`,
      `${rc(GESTION)} étudie $f(x) = ${tex(E.C.p)}$ sur $[${n(E.al)}\\,;${n(E.be)}]$, avec $f'(x) = ${E.C.fpTxt}$. Pour quel $x$ $f$ est-elle ${mot === "maximum" ? "maximale" : "minimale"} ?`,
    ]),
    E.x,
    expl(`un ${mot} est atteint là où $f'$ s’annule en passant ${E.veutMax ? "du $+$ au $-$" : "du $-$ au $+$"}.`, "on dresse le tableau de signes de $f'$ et on compare aussi aux bornes.", `$f'$ change de signe en $${E.C.r1}$ et $${E.C.r2}$ ; $f(${E.x}) = ${n(E.y)}$, et $f(${n(E.al)}) = ${n(E.C.f(E.al))}$, $f(${n(E.be)}) = ${n(E.C.f(E.be))}$.`, `le ${mot} est atteint en $x = ${E.x}$.`)
  );
}

function genExtValeur() {
  const E = cubiqueExtremum();
  const mot = E.veutMax ? "maximum" : "minimum";
  return court(
    rc([
      `Sur $[${n(E.al)}\\,;${n(E.be)}]$, $f(x) = ${tex(E.C.p)}$ et $f'(x) = ${E.C.fpTxt}$. Quelle est la valeur du ${mot} de $f$ ?`,
      `On étudie $f(x) = ${tex(E.C.p)}$ sur $[${n(E.al)}\\,;${n(E.be)}]$, avec $f'(x) = ${E.C.fpTxt}$. Quel est le ${mot} de $f$ sur cet intervalle ?`,
    ]),
    E.y,
    expl(`le ${mot} est la plus ${E.veutMax ? "grande" : "petite"} valeur prise par $f$.`, "on trouve où il est atteint (tableau de signes de $f'$), puis on calcule l’image.", `il est atteint en $x = ${E.x}$ : $f(${E.x}) = ${n(E.y)}$.`, `le ${mot} vaut $${n(E.y)}$.`)
  );
}

function genExtDeg2() {
  const s = rc(SITUATIONS);
  const a = rc([-2, -1, -0.5, 0.5, 1, 2]);
  const sx = randomInt(2, 8);
  const w = rc([5, 10, 15, 20, 30, 40]);
  const p: P = [arr(a * sx * sx + w), arr(-2 * a * sx), a];
  const max = a < 0;
  const quoiDemande = rc(["x", "y"] as const);
  verif(Math.abs(ev(der(p), sx)) < 1e-9, "extremum degré 2");
  const text =
    quoiDemande === "x"
      ? `${s.qui} modélise ${s.quoi} par $${s.g}(${s.v}) = ${tex(p, s.v)}$ pour $${s.v}$ entre 0 et ${2 * sx} (en ${s.uv}). Pour quelle valeur de $${s.v}$ la grandeur est-elle ${max ? "maximale" : "minimale"} ?`
      : `${s.qui} modélise ${s.quoi} par $${s.g}(${s.v}) = ${tex(p, s.v)}$ pour $${s.v}$ entre 0 et ${2 * sx} (en ${s.uv}). Quelle est sa valeur ${max ? "maximale" : "minimale"} (en ${s.ug}) ?`;
  return court(
    text,
    quoiDemande === "x" ? sx : w,
    expl(`un ${max ? "maximum" : "minimum"} est atteint là où la dérivée s’annule en changeant de signe.`, "on dérive, on résout $f'(x) = 0$, on calcule l’image.", `$${s.g}'(${s.v}) = ${tex(der(p), s.v)}$ s’annule en $${sx}$ ; $${s.g}(${sx}) = ${n(w)}$.`, quoiDemande === "x" ? `l’extremum est atteint pour $${s.v} = ${sx}$.` : `la valeur ${max ? "maximale" : "minimale"} est $${n(w)}$ ${s.ug}.`)
  );
}

export function genExtNature() {
  const r = randomInt(-3, 4);
  const cas = randomInt(1, 4);
  const MAX = "un maximum";
  const MIN = "un minimum";
  const NI = "ni maximum, ni minimum";
  let txt = "";
  let bon = MAX;
  let pourquoi = "";
  if (cas === 1) {
    const q = r + rc([-3, -2, 2, 3]);
    const K = rc([-3, -2, -1, 1, 2, 3]);
    txt = prodFact(K, r, q);
    // Signe de f' juste avant r : K·(r−ε−r)(r−ε−q) = K·(−)(r−q).
    const avant = K * -1 * (r - q) > 0;
    bon = avant ? MAX : MIN;
    pourquoi = `$f'$ passe du ${avant ? "$+$ au $-$" : "$-$ au $+$"} en $${r}$`;
    verif(Math.sign(K * (r - 0.01 - r) * (r - 0.01 - q)) === (avant ? 1 : -1), "nature extremum");
  } else if (cas === 2) {
    const K = rc([-3, -1, 1, 2, 3]);
    txt = `${pref(K)}${r === 0 ? "x^2" : `${fx(r)}^2`}`;
    bon = NI;
    pourquoi = `$f'(x)$ a le signe de $${n(K)}$ partout : elle s’annule en $${r}$ sans changer de signe`;
  } else {
    const m = rc([-3, -2, -1, 1, 2, 4]);
    txt = r === 0 ? poly([[m, 1]]) : `${pref(m)}${fx(r)}`;
    bon = m > 0 ? MIN : MAX;
    pourquoi = `$f'$ passe du ${m > 0 ? "$-$ au $+$" : "$+$ au $-$"} en $${r}$`;
  }
  return qcm(
    rc([`La dérivée de $f$ est $f'(x) = ${txt}$. En $x = ${r}$, la fonction $f$ admet :`, `On a $f'(x) = ${txt}$, donc $f'(${r}) = 0$. Que se passe-t-il pour $f$ en $x = ${r}$ ?`, `En $x = ${r}$, la tangente à la courbe de $f$ est horizontale, car $f'(x) = ${txt}$. En ce point, $f$ a :`]),
    bon,
    [MAX, MIN, NI, "on ne peut pas savoir"].filter((x) => x !== bon),
    expl("un extremum est atteint là où $f'$ s’annule EN CHANGEANT DE SIGNE.", "on regarde le signe de $f'$ juste avant et juste après la valeur.", `${pourquoi}.`, `en $x = ${r}$, $f$ admet ${bon}.`)
  );
}

/* =========================================================
   der_optimisation (★5)
========================================================= */

function genOptiBenefice() {
  const pr = rc(PRODUITS);
  const a = rc([0.5, 1, 2]);
  const qs = rc([3, 4, 5, 6, 8, 10, 12]);
  const c = rc([5, 8, 10, 15, 20]);
  const p: P = [-c, 2 * a * qs, -a];
  const max = ev(p, qs);
  if (max <= 0) return genOptiEnclos();
  verif(Math.abs(ev(der(p), qs)) < 1e-9, "optimisation bénéfice");
  const demande = rc(["q", "B"] as const);
  return court(
    `Le bénéfice ${de(pr.ent)} est $B(q) = ${tex(p, "q")}$ (en ${pr.ue}), pour $q$ entre 0 et ${2 * qs} (en ${pr.uq}). ${demande === "q" ? "Quelle quantité faut-il produire pour que le bénéfice soit maximal ?" : "Quel est le bénéfice maximal ?"}`,
    demande === "q" ? qs : max,
    expl("optimiser, c’est chercher un extremum avec le signe de la dérivée.", "on dérive, on résout $B'(q) = 0$, on vérifie le changement de signe.", `$B'(q) = ${tex(der(p), "q")}$, positive avant $${qs}$ et négative après ; $B(${qs}) = ${n(max)}$.`, demande === "q" ? `il faut produire $${qs}$ ${pr.uq}.` : `le bénéfice maximal vaut $${n(max)}$ ${pr.ue}.`)
  );
}

function genOptiBoite() {
  const m = rc([2, 3, 4, 5, 6, 8, 10]);
  const cote = 6 * m;
  const p: P = [0, 36 * m * m, -24 * m, 4];
  verif(proche(ev(p, 1.3), 1.3 * (cote - 2.6) ** 2), "boîte : volume");
  verif(proche(ev(der(p), 1.3), 12 * (1.3 - m) * (1.3 - 3 * m)), "boîte : dérivée");
  const demande = rc(["x", "V"] as const);
  const qui = rc(["Une ingénieure en emballage", "Un technicien de cartonnerie", "Une designer produit", "Un élève de STI2D"]);
  return court(
    `${qui} découpe un carré de côté $x$ cm à chaque coin d’une plaque carrée de ${cote} cm, puis plie les bords pour faire une boîte sans couvercle. Son volume est $V(x) = ${tex(p)}$ (en cm³), et on admet que $V'(x) = 12${fx(m)}${fx(3 * m)}$, pour $x$ entre 0 et ${3 * m}. ${demande === "x" ? "Pour quelle valeur de $x$ le volume est-il maximal ?" : "Quel est le volume maximal (en cm³) ?"}`,
    demande === "x" ? m : 16 * m ** 3,
    expl("le maximum est atteint là où $V'$ passe du $+$ au $-$.", "tableau de signes de $V'$ sur $[0\\,;" + 3 * m + "]$.", `$V'(x) > 0$ pour $x < ${m}$ et $V'(x) < 0$ entre $${m}$ et $${3 * m}$ ; $V(${m}) = ${n(16 * m ** 3)}$.`, demande === "x" ? `le volume est maximal pour $x = ${m}$ cm.` : `le volume maximal est $${n(16 * m ** 3)}$ cm³.`)
  );
}

function genOptiEnclos() {
  const L = rc([40, 60, 80, 100, 120, 200]);
  const [qui, quoi] = rc([
    ["Une éleveuse", "un enclos rectangulaire pour ses chèvres, le long d’un mur"],
    ["Un maraîcher", "un potager rectangulaire, le long d’une haie"],
    ["Une organisatrice de festival", "une zone rectangulaire devant la scène, le long d’une barrière"],
    ["Un paysagiste", "une pelouse rectangulaire, le long d’une maison"],
    ["Une responsable de chantier", "une zone de stockage rectangulaire, le long d’un bâtiment"],
  ]);
  const p: P = [0, L, -2];
  const xs = L / 4;
  const Amax = (L * L) / 8;
  verif(proche(ev(p, xs), Amax) && Math.abs(ev(der(p), xs)) < 1e-9, "enclos");
  const demande = rc(["x", "A"] as const);
  return court(
    `${qui} veut délimiter ${quoi} avec ${L} m de clôture (pas de clôture côté mur). Si $x$ est la largeur, l’aire est $A(x) = ${tex(p)}$ (en m²). ${demande === "x" ? "Quelle largeur $x$ donne l’aire maximale ?" : "Quelle est l’aire maximale (en m²) ?"}`,
    demande === "x" ? xs : Amax,
    expl("l’aire est maximale là où $A'$ s’annule en passant du $+$ au $-$.", "on dérive, on résout $A'(x) = 0$, on calcule l’image.", `$A'(x) = ${tex(der(p))}$ s’annule en $${n(xs)}$ ; $A(${n(xs)}) = ${n(Amax)}$.`, demande === "x" ? `la largeur optimale est $${n(xs)}$ m.` : `l’aire maximale est $${n(Amax)}$ m².`)
  );
}

function genOptiCubique() {
  const k = rc([1, 2, 3, 4]);
  const al = rc([0.5, 1, 2]);
  const [qui, quoi, g, v, uv, ug, quand] = rc([
    ["Une pharmacologue", "la concentration d’un médicament dans le sang", "C", "t", "heures", "mg/L", "la concentration est-elle maximale"],
    ["Un community manager", "le nombre de spectateurs d’un direct", "S", "t", "heures", "centaines de spectateurs", "le nombre de spectateurs est-il maximal"],
    ["Une agronome", "la quantité de sucre dans un fruit qui mûrit puis s’abîme", "Q", "t", "semaines", "grammes", "la quantité de sucre est-elle maximale"],
    ["Un ingénieur hydraulique", "le débit d’une source après un orage", "D", "t", "heures", "litres par seconde", "le débit est-il maximal"],
    ["Une épidémiologiste", "le nombre de nouveaux cas d’une épidémie", "N", "t", "semaines", "centaines de cas par semaine", "le nombre de nouveaux cas est-il maximal"],
  ]);
  const p: P = [0, 0, 3 * k * al, -al];
  const ts = 2 * k;
  const ymax = ev(p, ts);
  verif(Math.abs(ev(der(p), ts)) < 1e-9 && proche(ymax, 4 * al * k ** 3), "optimisation cubique");
  const demande = rc(["t", "y"] as const);
  const fpTxt = `${n(-3 * al)}${v}${fx(ts, v)}`;
  return court(
    `${qui} modélise ${quoi} par $${g}(${v}) = ${tex(p, v)}$ pour $${v}$ entre 0 et ${3 * k} (en ${uv}). On admet que $${g}'(${v}) = ${fpTxt}$. ${demande === "t" ? `À quel instant ${quand} ?` : `Quelle est la valeur maximale (en ${ug}) ?`}`,
    demande === "t" ? ts : ymax,
    expl("le maximum est atteint là où la dérivée passe du $+$ au $-$.", "tableau de signes de la dérivée sur l’intervalle.", `$${g}'(${v}) = ${fpTxt}$ est positive entre 0 et $${ts}$, négative après ; $${g}(${ts}) = ${n(ymax)}$.`, demande === "t" ? `le maximum est atteint à $${v} = ${ts}$ ${uv}.` : `la valeur maximale est $${n(ymax)}$ ${ug}.`)
  );
}

function genOptiCarburant() {
  const [qui, quoi, g, v, uv, ug] = rc([
    ["Une logisticienne", "la consommation d’un camion", "C", "v", "km/h", "litres aux 100 km"],
    ["Un ingénieur automobile", "la consommation d’une voiture", "C", "v", "km/h", "litres aux 100 km"],
    ["Une gestionnaire de flotte", "la consommation d’un utilitaire de livraison", "C", "v", "km/h", "litres aux 100 km"],
    ["Un capitaine de cargo", "la consommation de son navire", "C", "v", "nœuds", "tonnes de fioul par jour"],
  ]);
  const a = rc([0.002, 0.004, 0.005]);
  const v0 = uv === "nœuds" ? rc([12, 14, 15, 16]) : rc([50, 60, 70, 80, 90]);
  const aa = uv === "nœuds" ? rc([0.05, 0.1, 0.2]) : a;
  const w = rc([5, 6, 7, 8, 9]);
  const p: P = [arr(aa * v0 * v0 + w), arr(-2 * aa * v0), aa];
  verif(Math.abs(ev(der(p), v0)) < 1e-9 && proche(ev(p, v0), w), "carburant");
  const demande = rc(["v", "C"] as const);
  return court(
    `${qui} modélise ${quoi} en fonction de la vitesse $${v}$ (en ${uv}) par $${g}(${v}) = ${tex(p, v)}$ (en ${ug}). ${demande === "v" ? "Pour quelle vitesse la consommation est-elle la plus faible ?" : "Quelle est la consommation minimale ?"}`,
    demande === "v" ? v0 : w,
    expl("le minimum est atteint là où la dérivée passe du $-$ au $+$.", "on dérive, on résout $C'(v) = 0$, on calcule l’image.", `$${g}'(${v}) = ${tex(der(p), v)}$ s’annule pour $${v} = ${v0}$ ; $${g}(${v0}) = ${n(w)}$.`, demande === "v" ? `la consommation est minimale à ${v0} ${uv}.` : `la consommation minimale est $${n(w)}$ ${ug}.`)
  );
}

/* =========================================================
   der_prevoir_evolution (★4)
========================================================= */

const VALS = [2, 3, 4, 5, 8, 10, 12, 15, 20, 2.5, 3.5];

function genPrevSigne() {
  const s = rc(SITUATIONS);
  const a = randomInt(1, 12);
  const val = randomInt(1, 6) === 1 ? 0 : rc([1, -1]) * rc(VALS);
  const bon = val > 0 ? monte(s) : val < 0 ? baisse(s) : stable(s);
  return qcm(
    rc([
      `${s.qui} modélise ${s.quoi} par une fonction $${s.g}$ ($${s.v}$ en ${s.uv}). On calcule $${s.g}'(${a}) = ${n(val)}$. Que peut-on prévoir autour de $${s.v} = ${a}$ ?`,
      `On note $${s.g}(${s.v})$ ${s.quoi} ($${s.v}$ en ${s.uv}). On sait que $${s.g}'(${a}) = ${n(val)}$. Que se passe-t-il autour de $${s.v} = ${a}$ ?`,
    ]),
    bon,
    [monte(s), baisse(s), stable(s), `${cap(s.quoi)} vaut ${fr(Math.abs(val) || 1)} ${s.ug}`].filter((x) => x !== bon),
    expl("le signe du nombre dérivé donne le sens de variation au voisinage du point.", "on regarde seulement le signe de $f'(a)$.", `$${s.g}'(${a}) = ${n(val)}$ est ${signeMot(val)}.`, `${bon.charAt(0).toLowerCase() + bon.slice(1)} autour de $${s.v} = ${a}$. Attention : $${s.g}'(${a})$ n’est pas la valeur de la grandeur.`)
  );
}

function genPrevApprox() {
  const s = rc(SITUATIONS);
  const a = randomInt(1, 10);
  const A = rc([20, 35, 50, 80, 120, 200, 12.5, 64]);
  const v = rc([1, -1]) * rc([0.5, 1, 2, 3, 4, 1.5]);
  const h = rc([1, 2, 0.5]);
  const est = A + v * h;
  return court(
    rc([
      `${s.qui} relève qu’à $${s.v} = ${a}$, ${s.quoi} vaut ${fr(A)} ${s.ug}, et que $${s.g}'(${a}) = ${n(v)}$ (en ${s.vit}). En gardant cette vitesse, quelle valeur peut-on prévoir à $${s.v} = ${n(a + h)}$ ?`,
      `On note $${s.g}(${s.v})$ ${s.quoi}. On a $${s.g}(${a}) = ${n(A)}$ et $${s.g}'(${a}) = ${n(v)}$. Estime $${s.g}(${n(a + h)})$.`,
    ]),
    est,
    expl("le nombre dérivé est la vitesse de variation : sur une courte durée, la grandeur varie d’environ $f'(a) \\times h$.", "valeur estimée $\\approx f(a) + f'(a) \\times h$.", `$${n(A)} + ${par(v)} \\times ${n(h)} = ${n(est)}$.`, `on peut prévoir environ $${n(est)}$ ${s.ug}.`)
  );
}

function genPrevQuand() {
  const s = rc(SITUATIONS);
  const r = randomInt(2, 9);
  const m = rc([0.5, 1, 2, 3, 4]);
  const signe = rc([1, -1]);
  const p: P = [arr(-signe * m * r), signe * m];
  const L = r + randomInt(3, 6);
  // signe > 0 : G' < 0 puis > 0 → la grandeur diminue puis augmente.
  const mot = signe > 0 ? "augmenter" : "diminuer";
  verif(Math.abs(ev(p, r)) < 1e-9, "prévoir : racine");
  return court(
    `${s.qui} étudie ${s.quoi}, ${s.fem ? "notée" : "noté"} $${s.g}(${s.v})$ pour $${s.v}$ entre 0 et ${L} (en ${s.uv}). On a $${s.g}'(${s.v}) = ${tex(p, s.v)}$. À partir de quel instant la grandeur va-t-elle ${mot} ?`,
    r,
    expl("la grandeur augmente là où sa dérivée est positive, diminue là où elle est négative.", "on cherche où la dérivée s’annule et change de signe.", `$${tex(p, s.v)} = 0$ pour $${s.v} = ${r}$ ; la dérivée est ${signe > 0 ? "négative avant, positive après" : "positive avant, négative après"}.`, `la grandeur se met à ${mot} à partir de $${s.v} = ${r}$.`)
  );
}

function genPrevExpr() {
  const s = rc(SITUATIONS);
  const F = factorisee(s.v);
  const t0 = rc([0, 1, 2, 3, 4, 5, 6, 7].filter((x) => x !== F.r1 && x !== F.r2));
  const val = F.fp(t0);
  const bon = val > 0 ? monte(s) : baisse(s);
  return qcm(
    `${s.qui} modélise ${s.quoi} par une fonction $${s.g}$ ($${s.v}$ en ${s.uv}), de dérivée $${s.g}'(${s.v}) = ${F.txt}$. Que se passe-t-il autour de $${s.v} = ${t0}$ ?`,
    bon,
    [monte(s), baisse(s), stable(s), `${cap(s.quoi)} vaut ${fr(Math.abs(val))} ${s.ug}`].filter((x) => x !== bon),
    expl("le signe de la dérivée donne le sens de variation.", "on calcule la dérivée en ce point (ou on fait un tableau de signes).", `$${s.g}'(${t0}) = ${n(val)}$, ${signeMot(val)}.`, `${bon.charAt(0).toLowerCase() + bon.slice(1)} autour de $${s.v} = ${t0}$.`)
  );
}

/* ---------- Gabarits ---------- */

const H_CONST = "Une constante ne varie pas : sa dérivée vaut 0.";
const H_AFF = "La dérivée de ax + b est le nombre a.";
const H_XN = "La dérivée de xⁿ est n·xⁿ⁻¹ : l’exposant descend, puis diminue de 1.";
const H_K = "(k·u)' = k·u' : le nombre reste devant.";
const H_SOMME = "(u + v)' = u' + v' : on dérive terme à terme.";
const H_ND = "On dérive d’abord, puis on remplace x par la valeur.";
const H_SIGNE = "On cherche où f' s’annule, puis son signe de chaque côté.";
const H_FACT = "Un produit est nul si un facteur est nul ; son signe vient d’un tableau de signes.";
const H_VERIF = "Pour vérifier une forme factorisée, on la développe.";
const H_VAR = "f' ≥ 0 : f croît ; f' ≤ 0 : f décroît.";
const H_EXT = "Un extremum : f' s’annule EN CHANGEANT de signe.";
const H_OPTI = "On dérive, on étudie le signe de la dérivée, on conclut.";
const H_PREV = "Le signe de la dérivée dit si la grandeur monte ou descend.";

const F = "der_formules";
const PO = "der_polynome";
const SI = "der_signe";
const VA = "der_variations";

const LIGNES: Ligne[] = [
  [F, "der_derivee_constante", 1, genConstanteContexte, H_CONST],
  [F, "der_derivee_constante", 1, genConstanteQcm, H_CONST],
  [F, "der_derivee_constante", 1, genConstanteGraphe, H_CONST],
  [F, "der_derivee_constante", 1, genConstanteVraiFaux, H_CONST],

  [F, "der_derivee_identite", 2, genAffineContexte, H_AFF],
  [F, "der_derivee_identite", 2, genAffineQcm, H_AFF],
  [F, "der_derivee_identite", 2, genAffineGraphe, H_AFF],
  [F, "der_derivee_identite", 2, genIdentiteVraiFaux, H_AFF],

  [F, "der_derivee_carre_cube", 2, genCarreCubeQcm, H_XN],
  [F, "der_derivee_carre_cube", 2, genCarreCubeValeur, H_XN],
  [F, "der_derivee_carre_cube", 2, genCarreCubeErreur, H_XN],

  [PO, "der_derivee_produit_reel", 2, genProduitQcm, H_K],
  [PO, "der_derivee_produit_reel", 2, genProduitValeur, H_K],
  [PO, "der_derivee_produit_reel", 2, genProduitVraiFaux, H_K],

  [PO, "der_derivee_somme", 2, genSommeQcm, H_SOMME],
  [PO, "der_derivee_somme", 2, genSommeValeur, H_SOMME],
  [PO, "der_derivee_somme", 2, genSommeErreur, H_SOMME],

  [PO, "der_derivee_degre2", 3, genDeg2Qcm, H_SOMME],
  [PO, "der_derivee_degre2", 3, genDeg2Contexte, H_SOMME],
  [PO, "der_derivee_degre2", 3, genDeg2Coef, H_SOMME],

  [PO, "der_derivee_degre3", 4, genDeg3Qcm, H_SOMME],
  [PO, "der_derivee_degre3", 4, genDeg3Contexte, H_SOMME],
  [PO, "der_derivee_degre3", 4, genDeg3Coef, H_SOMME],
  [PO, "der_derivee_degre3", 4, genDeg3Erreur, H_SOMME],

  [PO, "der_calculer_nombre_derive", 3, genNdDepuisFprime, H_ND],
  [PO, "der_calculer_nombre_derive", 3, genNdDepuisF, H_ND],
  [PO, "der_calculer_nombre_derive", 3, genNdQcm, H_ND],
  [PO, "der_calculer_nombre_derive", 3, genNdContexte, H_ND],

  [SI, "der_signe_etudier", 3, genSigneAffine, H_SIGNE],
  [SI, "der_signe_etudier", 3, genSigneValeur, H_SIGNE],
  [SI, "der_signe_etudier", 3, genSigneRacine, H_SIGNE],
  [SI, "der_signe_etudier", 3, genSigneGrapheFp, H_SIGNE],

  [SI, "der_signe_factorisee", 4, genFactIntervalle, H_FACT],
  [SI, "der_signe_factorisee", 4, genFactRacines, H_FACT],
  [SI, "der_signe_factorisee", 4, genFactSigneEn, H_FACT],
  [SI, "der_signe_factorisee", 4, genFactSignes, H_FACT],

  [SI, "der_verifier_forme_factorisee", 4, genVerifForme, H_VERIF],
  [SI, "der_verifier_forme_factorisee", 4, genVerifDevelopper, H_VERIF],
  [SI, "der_verifier_forme_factorisee", 4, genVerifCoef, H_VERIF],
  [SI, "der_verifier_forme_factorisee", 4, genVerifOuiNon, H_VERIF],
  [SI, "der_verifier_forme_factorisee", 4, genVerifDepuisF, H_VERIF],

  [VA, "der_variations_deduire", 3, genVarAffine, H_VAR],
  [VA, "der_variations_deduire", 3, genVarSigneMots, H_VAR],
  [VA, "der_variations_deduire", 3, genVarGrapheFp, H_VAR],
  [VA, "der_variations_deduire", 3, genVarContexte, H_VAR],

  [VA, "der_tableau_dresser", 4, genTabVariations, H_VAR],
  [VA, "der_tableau_dresser", 4, genTabValeur, H_VAR],
  [VA, "der_tableau_dresser", 4, genTabFleches, H_VAR],
  [VA, "der_tableau_dresser", 4, genTabDeg2, H_VAR],

  [VA, "der_extremum_determiner", 4, genExtAbscisse, H_EXT],
  [VA, "der_extremum_determiner", 4, genExtValeur, H_EXT],
  [VA, "der_extremum_determiner", 4, genExtDeg2, H_EXT],
  [VA, "der_extremum_determiner", 4, genExtNature, H_EXT],

  [VA, "der_optimisation", 5, genOptiBenefice, H_OPTI],
  [VA, "der_optimisation", 5, genOptiBoite, H_OPTI],
  [VA, "der_optimisation", 5, genOptiEnclos, H_OPTI],
  [VA, "der_optimisation", 5, genOptiCubique, H_OPTI],
  [VA, "der_optimisation", 5, genOptiCarburant, H_OPTI],

  [VA, "der_prevoir_evolution", 4, genPrevSigne, H_PREV],
  [VA, "der_prevoir_evolution", 4, genPrevApprox, H_PREV],
  [VA, "der_prevoir_evolution", 4, genPrevQuand, H_PREV],
  [VA, "der_prevoir_evolution", 4, genPrevExpr, H_PREV],
];

export const renfortDeriveeCalcul = construire("premiere_der_renfort", LIGNES, ["calcul"]);

// Partagés avec la banque de lecture.
export { factorisee, signeMot, cubiqueEntiere };
