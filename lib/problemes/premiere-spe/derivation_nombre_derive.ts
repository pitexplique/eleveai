// Énigmes à projeter — première spé maths, notion derivation_nombre_derive
// (la montée au col à vélo, le caillou dans le puits, la cyclotouriste et ses
// 60 km, la piste de luge, piège du ring de boxe, défi de la comtoise de
// grand-père). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";
import { frac } from "../outils";

const col = svg("Le profil de la montée au col : au kilomètre 3, l'altitude est 800 mètres ; au kilomètre 18, elle est 2 000 mètres",
  p("M40 330 L100 300 Q200 250 260 190 Q330 120 440 90 L440 330 Z", C.jaune, 3, 0.2) +
    `<circle cx="100" cy="300" r="9" fill="${C.bleu}"/><circle cx="410" cy="97" r="9" fill="${C.bleu}"/>` +
    l(100, 300, 410, 97, C.rose, 3, "10 8") +
    t(70, 362, "km 3 : 800 m", C.bleu, 20, "start") + t(400, 72, "km 18 : 2 000 m", C.bleu, 20, "end") +
    t(240, 395, `pente moyenne (m par km)${NB}?`, C.rose, 26));

const puits = svg("Le caillou lâché dans le puits : après t secondes, il a parcouru d(t) = 5t² mètres ; on cherche le taux de variation entre 2 et 2 + h",
  r(150, 60, 30, 300, C.craie, 0.15, 3) + r(300, 60, 30, 300, C.craie, 0.15, 3) + l(150, 60, 330, 60, C.craie, 3) +
    `<circle cx="240" cy="110" r="10" fill="${C.pale}"/><circle cx="240" cy="230" r="10" fill="${C.craie}"/>` +
    l(240, 125, 240, 210, C.pale, 2, "6 6") +
    t(140, 115, "t = 2", C.pale, 20, "end") + t(140, 235, "t = 2 + h", C.craie, 20, "end") +
    t(345, 160, "d(t) = 5t²", C.bleu, 24, "start") + t(240, 400, `taux entre 2 et 2 + h${NB}?`, C.rose, 26));

const velo = svg("La cyclotouriste parcourt 60 kilomètres à la vitesse v : la durée est T(v) = 60 ÷ v heures ; on cherche T′(30)",
  o(150, 190, 50, C.craie, 0, 4) + o(330, 190, 50, C.craie, 0, 4) +
    p("M150 190 L215 120 L300 120 L330 190 M215 120 L245 190 L300 120 M245 190 L150 190 M205 100 L230 100 M290 120 L300 95 L320 95", C.bleu, 4) +
    t(240, 60, "60 km à v km/h", C.craie, 24) + t(240, 300, `T(v) = ${"60"} ÷ v (en h)`, C.bleu, 26) +
    t(240, 385, `T′(30)${NB}?`, C.rose, 30));

const luge = (() => {
  const R = repereXY(-1, 5, -5, 3, { gx: 80, gy: 40, gl: 340, gh: 300, px: 1, py: 1 });
  return svg("La piste de luge suit la courbe de f(x) = x² − 4x ; une sécante passe par les points d'abscisses 1 et 1 + h",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => x * x - 4 * x, -0.7, 4.7, C.bleu, 4) +
      R.courbe((x) => -0.5 * (x - 1) - 3, -0.3, 3.6, C.rose, 3) + R.point(1, -3, C.rose) + R.point(2.5, -3.75, C.rose) +
      l(R.X(1), R.Y(-3), R.X(1), R.Y(-4.3), C.rose, 2, "5 5") + l(R.X(2.5), R.Y(-3.75), R.X(2.5), R.Y(-4.3), C.rose, 2, "5 5") + t(R.X(1), R.Y(-4.75), "1", C.rose, 20) + t(R.X(2.5), R.Y(-4.75), "1 + h", C.rose, 20) +
      t(R.X(2), R.Y(2.3), "f(x) = x² − 4x", C.bleu, 22) +
      t(240, 400, `f′(1)${NB}?`, C.rose, 28));
})();

const ring = svg("Le ring de boxe carré : un côté de x mètres, une aire de x² mètres carrés ; Malo écrit (3 + h)² = 9 + h²",
  r(110, 50, 260, 200, C.craie, 0.06, 4, 2) + r(130, 70, 220, 160, C.craie, 0, 2) + r(150, 90, 180, 120, C.craie, 0, 2) +
    t(240, 160, "aire : x²", C.bleu, 26) + t(240, 280, "côté x = 3 m", C.craie, 22) +
    t(240, 330, "Malo : « (3 + h)² = 9 + h² »", C.craie, 22) + t(240, 390, `f′(3)${NB}?`, C.rose, 30));

const comtoise = svg("La comtoise de grand-père : un balancier de longueur L mètres a une période T(L) = 2√L secondes ; on cherche T′(4)",
  r(190, 30, 100, 330, C.jaune, 0.15, 3, 10) + o(240, 90, 38, C.craie, 0.05, 3) + l(240, 90, 240, 70, C.craie, 3) + l(240, 90, 255, 98, C.craie, 3) +
    l(240, 140, 270, 290, C.bleu, 3) + o(273, 305, 18, C.bleu, 0.4, 3) + l(240, 140, 240, 300, C.pale, 2, "6 6") +
    t(275, 220, "L", C.bleu, 24, "start") + t(60, 200, "T(L) = 2√L", C.craie, 24, "start") +
    t(240, 405, `T′(4)${NB}?`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "derivation_nombre_derive",
  titre: "Énigmes du nombre dérivé",
  description: "La montée au col à vélo, le caillou dans le puits, la cyclotouriste et ses 60 km, la piste de luge, le piège du ring de boxe, le défi de la comtoise : taux de variation, pente d'une sécante, nombre dérivé comme limite.",
  problemes: [
    {
      tag: "Énigme 1 · La montée au col",
      titre: "Le taux de variation",
      question: `Sur la route d'un col, au kilomètre 3, l'altitude est 800 m. Au kilomètre 18, elle est 2 000 m.<br><br><b>Quelle est la pente moyenne</b>, en mètres gagnés par kilomètre ?`,
      reponse: `Taux de variation = ${frac("2 000 − 800", "18 − 3")} = ${frac("1 200", 15)} = <span class="big">80 m par km</span>, soit une pente moyenne de 8 %.`,
      consigne: "Altitude 800 m au km 3, 2 000 m au km 18 : combien de mètres gagnés par km en moyenne ?",
      verification: { type: "courte", attendus: ["80"], unite: "m par km" },
      dessin: col,
    },
    {
      tag: "Énigme 2 · Le caillou dans le puits",
      titre: "La vitesse moyenne entre 2 et 2 + h",
      question: `On lâche un caillou dans un puits. Après t secondes, il a parcouru d(t) = 5t² mètres.<br><br><b>Que vaut le taux de variation de d entre 2 et 2 + h</b> (h ≠ 0) ?`,
      reponse: `${frac("d(2 + h) − d(2)", "h")} = ${frac("5(4 + 4h + h²) − 20", "h")} = ${frac("20h + 5h²", "h")} = <span class="big">20 + 5h</span>.<br>Quand h tend vers 0, il tend vers 20 : à t = 2 s, le caillou va à 20 m/s.`,
      consigne: "d(t) = 5t² : que vaut le taux de variation entre 2 et 2 + h ?",
      verification: { type: "qcm", choix: ["20 + 5h", "20h + 5h²", "5h"], bonne: 0 },
      dessin: puits,
    },
    {
      tag: "Énigme 3 · La cyclotouriste",
      titre: "Le nombre dérivé comme limite",
      question: `Une cyclotouriste fait 60 km à la vitesse v (en km/h). Sa durée, en heures, est T(v) = ${frac(60, "v")}.<br><br><b>Que vaut T′(30)</b> ? (Calculer le taux de variation entre 30 et 30 + h.)`,
      reponse: `T(30 + h) − T(30) = ${frac(60, "30 + h")} − 2 = ${frac("−2h", "30 + h")}. Divisé par h : ${frac("−2", "30 + h")}, qui tend vers ${frac("−2", 30)}.<br>T′(30) = <span class="big">${frac("−1", 15)}</span> h par km/h : 1 km/h de plus fait gagner environ 4 minutes.`,
      consigne: "T(v) = 60 ÷ v : que vaut T′(30) ?",
      verification: { type: "courte", attendus: ["-1/15", "−1/15", "-2/30", "−2/30"], unite: "h par km/h" },
      dessin: velo,
    },
    {
      tag: "Énigme 4 · La piste de luge",
      titre: "Calculer un nombre dérivé par la définition",
      question: `Le profil d'une piste de luge suit la courbe de f(x) = x² − 4x (pas à l'échelle).<br><br><b>Que vaut f′(1)</b> ? (Calculer ${frac("f(1 + h) − f(1)", "h")}, puis faire tendre h vers 0.)`,
      reponse: `f(1) = −3 et f(1 + h) = 1 + 2h + h² − 4 − 4h = h² − 2h − 3.<br>${frac("f(1 + h) − f(1)", "h")} = ${frac("h² − 2h", "h")} = h − 2, qui tend vers −2. Donc <span class="big">f′(1) = −2</span>.`,
      consigne: "f(x) = x² − 4x : que vaut f′(1) ?",
      verification: { type: "qcm", choix: ["2", "h − 2", "−2"], bonne: 2 },
      dessin: luge,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le ring de boxe",
      sorte: "piege",
      question: `Un ring de boxe carré a un côté de x mètres. Son aire est f(x) = x².<br>Malo calcule f′(3) : « (3 + h)² = 9 + h², donc le taux vaut ${frac("h²", "h")} = h, qui tend vers 0. »<br><br><b>Que vaut f′(3)</b> ?`,
      reponse: `(3 + h)² = 9 + 6h + h² : Malo a oublié le double produit.<br>${frac("6h + h²", "h")} = 6 + h, qui tend vers 6. Donc <span class="big">f′(3) = 6</span> (m² par mètre de côté).`,
      consigne: "f(x) = x² : que vaut f′(3) ?",
      verification: { type: "qcm", choix: ["0", "6", "9"], bonne: 1 },
      dessin: ring,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La comtoise de grand-père",
      sorte: "defi",
      question: `Le balancier d'une horloge comtoise, de longueur L mètres, fait un aller-retour en environ T(L) = 2√L secondes.<br><br><b>Que vaut T′(4)</b> ? (Astuce : multiplier par la quantité conjuguée √(4 + h) + 2.)`,
      reponse: `${frac("2√(4 + h) − 4", "h")} = ${frac("2(√(4 + h) − 2)(√(4 + h) + 2)", "h(√(4 + h) + 2)")} = ${frac("2h", "h(√(4 + h) + 2)")} = ${frac(2, "√(4 + h) + 2")}.<br>Quand h tend vers 0 : ${frac(2, 4)}, donc <span class="big">T′(4) = 0,5</span> seconde par mètre.`,
      consigne: "T(L) = 2√L : que vaut T′(4) ?",
      verification: { type: "courte", attendus: ["0,5", "0.5", "1/2"] },
      dessin: comtoise,
    },
  ],
};

export default problemes;
