// Énigmes à projeter — 3e, notion trigo_trigonometrie (sinus, tangente :
// le côté opposé, choisir le bon rapport, le phare, le panneau 10 % à La
// Réunion, piège « angle doublé, hauteur doublée », défi cos = 0,6).
// Figures au bon rapport. 21/11/2026.
// ⛔ Ne reprend pas la 4e (skate-park, cerf-volant, tyrolienne, camion, pompiers, portique).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, p } from "../dessins-ecole";
import { type P, poly, pt, angleDroit, arcAngle, milieu } from "../dessins-3e";

const rad = Math.PI / 180;

// Rectangle en B, Â = 30°, AC = 10 ; 1 cm = 34 px.
const sinus = () => {
  const A: P = [60, 330], B: P = [Math.round(60 + 340 * Math.cos(30 * rad)), 330], Cc: P = [B[0], Math.round(330 - 340 * Math.sin(30 * rad))];
  const m = milieu(A, Cc, -14, -16);
  return svg("Triangle ABC rectangle en B, angle A de 30°, hypoténuse AC de 10 cm",
    poly([A, B, Cc]) + angleDroit(B, A, Cc) + arcAngle(A, B, Cc, 56) + pt(A, "A", -18, 8) + pt(B, "B", 18, 24) + pt(Cc, "C", 18, -6) +
      t(A[0] + 74, 318, "30°", C.rose, 20) + t(m[0], m[1], "10 cm", C.craie, 24) + t(B[0] + 16, (B[1] + Cc[1]) / 2 + 8, `BC${NB}?`, C.bleu, 24, "start").replace(/x="[\d.]+"/, `x="${B[0] + 12}"`) +
      t(240, 400, "au bon rapport", C.pale, 16));
};

// SOH CAH TOA : un triangle rectangle avec les trois côtés nommés.
const rapports = () => {
  const A: P = [70, 320], B: P = [370, 320], Cc: P = [370, 120];
  return svg("Un triangle rectangle : l'angle marqué, le côté opposé, le côté adjacent et l'hypoténuse",
    poly([A, B, Cc]) + angleDroit(B, A, Cc) + arcAngle(A, B, Cc, 60) + t(150, 308, "Â", C.rose, 22) +
      t(220, 355, "adjacent", C.jaune, 24) + t(385, 228, "opposé", C.bleu, 24, "start").replace('x="385"', 'x="380"') + t(190, 200, "hypoténuse", C.craie, 24) +
      t(240, 60, `opposé ÷ adjacent = ?`.replace(" ?", `${NB}?`), C.rose, 26));
};

// Le phare de 50 m, vu sous 8° : 1 m = 1 px, la mer en bas.
const phare = () => {
  const d = 50 / Math.tan(8 * rad); // ≈ 355,8
  const Bt: P = [60, 330], Ph: P = [Math.round(60 + d), 330], H: P = [Ph[0], 280];
  return svg("Un bateau voit le haut d'un phare de 50 m sous un angle de 8°",
    p("M0 340 q30 -10 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0", C.bleu, 3) + p(`M${Ph[0] - 12} 330 L${Ph[0] - 6} 280 L${Ph[0] + 6} 280 L${Ph[0] + 12} 330 Z`, C.craie, 3, 0.15) +
      p("M36 326 l48 0 l-8 14 l-32 0 Z", C.jaune, 3, 0.4) + l(Bt[0], Bt[1], H[0], H[1], C.rose, 2, "8 6") + l(Bt[0], Bt[1], Ph[0], 330, C.pale, 2, "4 6") +
      arcAngle(Bt, Ph, H, 90, C.rose) + t(170, 312, "8°", C.rose, 22) + t(Ph[0] - 18, 270, "50 m", C.craie, 22, "end") +
      t(240, 390, `distance${NB}?`, C.rose, 26) + t(240, 120, "au bon rapport : 1 px = 1 m", C.pale, 16).replace(" :", `${NB}:`));
};

// Le panneau 10 % : 100 m à l'horizontale, 10 m de montée ; 1 m = 3,6 px.
const route = () => {
  const A: P = [60, 330], B: P = [420, 330], Cc: P = [420, 294];
  return svg("Une route qui monte de 10 m pour 100 m à l'horizontale, et un panneau 10 %",
    poly([A, B, Cc], C.craie, 3, 0) + l(A[0], A[1], Cc[0], Cc[1], C.jaune, 6) + angleDroit(B, A, Cc, 12) + arcAngle(A, B, Cc, 120) +
      t(240, 365, "100 m", C.craie, 22) + t(430, 318, "10 m", C.craie, 20, "start").replace('x="430"', 'x="426"') + t(200, 318, "?", C.rose, 26) +
      p("M240 80 L300 190 L180 190 Z", C.rose, 6, 0.06) + t(240, 175, "10 %", C.craie, 26) + l(240, 190, 240, 260, C.pale, 5) + t(240, 405, "au bon rapport", C.pale, 16));
};

// Deux rampes de 2 m : 30° et 60° ; 1 m = 110 px.
const rampes = () => {
  const A1: P = [40, 340], H1: P = [Math.round(40 + 220 * Math.cos(30 * rad)), Math.round(340 - 220 * Math.sin(30 * rad))];
  const A2: P = [270, 340], H2: P = [Math.round(270 + 220 * Math.cos(60 * rad)), Math.round(340 - 220 * Math.sin(60 * rad))];
  return svg("Deux rampes de 2 m : l'une inclinée à 30°, l'autre à 60°",
    l(20, 340, 460, 340, C.craie, 3) + l(A1[0], A1[1], H1[0], H1[1], C.jaune, 6) + l(H1[0], H1[1], H1[0], 340, C.pale, 2, "6 6") +
      l(A2[0], A2[1], H2[0], H2[1], C.bleu, 6) + l(H2[0], H2[1], H2[0], 340, C.pale, 2, "6 6") +
      arcAngle(A1, [460, 340], H1, 50) + arcAngle(A2, [460, 340], H2, 50) + t(110, 330, "30°", C.rose, 18) + t(330, 320, "60°", C.rose, 18) +
      t(H1[0] + 8, 300, "1 m", C.craie, 20, "start") + t(H2[0] + 8, 230, `2 m${NB}?`, C.rose, 22, "start") + t(240, 390, "deux rampes de 2 m, au bon rapport", C.pale, 16));
};

// cos Â = 0,6 : le triangle 3-4-5, 1 unité = 60 px.
const defi = () => {
  const A: P = [80, 330], B: P = [260, 330], Cc: P = [260, 90];
  return svg("Un triangle rectangle où cos A vaut 0,6",
    poly([A, B, Cc]) + angleDroit(B, A, Cc) + arcAngle(A, B, Cc, 46) + pt(A, "A", -16, 8) + t(380, 150, "cos Â = 0,6", C.bleu, 26) + t(380, 220, `sin Â = ?`.replace(" ?", `${NB}?`), C.rose, 28) +
      t(380, 290, "sans rapporteur", C.pale, 18));
};

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "trigo_trigonometrie",
  titre: "Énigmes de trigonométrie",
  description: "Le côté opposé à 30°, le bon rapport, la distance du phare, le panneau 10 % d'une route de La Réunion, le piège de l'angle doublé, le défi cos = 0,6 : sinus, cosinus et tangente dans le triangle rectangle.",
  problemes: [
    {
      tag: "Énigme 1 · Le sinus",
      titre: "Le côté opposé",
      question: `ABC est rectangle en B, avec <b>Â = 30°</b> et <b>AC = 10 cm</b>.<br><br><b>Combien mesure</b> BC ?`,
      reponse: `BC est le côté <b>opposé</b> à Â, AC est l'hypoténuse : sin Â = BC ÷ AC.<br>BC = 10 × sin 30° = 10 × 0,5 = <span class="big">5 cm</span>.`,
      consigne: "Combien mesure BC ?",
      verification: {"type":"courte","attendus":["5"],"unite":"cm"},
      dessin: sinus(),
    },
    {
      tag: "Énigme 2 · Le bon rapport",
      titre: "SOH CAH TOA",
      question: `Dans un triangle rectangle, pour l'angle Â :<br><br><b>côté opposé ÷ côté adjacent</b>, c'est…<br>sin Â ? cos Â ? tan Â ?`,
      reponse: `<span class="big">tan Â</span> = opposé ÷ adjacent.<br>Pour retenir : <b>SOH CAH TOA</b> — Sinus = Opposé ÷ Hypoténuse, Cosinus = Adjacent ÷ Hypoténuse, Tangente = Opposé ÷ Adjacent.`,
      consigne: "Opposé ÷ adjacent, c'est quel rapport ?",
      verification: {"type":"qcm","choix":["tan Â","sin Â","cos Â"],"bonne":0},
      dessin: rapports(),
    },
    {
      tag: "Énigme 3 · Le phare",
      titre: "À quelle distance ?",
      question: `Depuis un bateau, Mathis voit le haut d'un phare de <b>50 m</b> sous un angle de <b>8°</b> au-dessus de l'horizon.<br><br>À <b>quelle distance</b> du pied du phare est le bateau ? (Arrondis au mètre.)`,
      reponse: `La hauteur est opposée à l'angle, la distance d lui est adjacente : tan 8° = 50 ÷ d.<br>d = 50 ÷ tan 8° ≈ 50 ÷ 0,1405 ≈ <span class="big">356 m</span>.`,
      consigne: "À quelle distance du phare est le bateau, arrondie au mètre ?",
      verification: {"type":"courte","attendus":["356"],"unite":"m"},
      dessin: phare(),
    },
    {
      tag: "Énigme 4 · La route qui monte",
      titre: "Le panneau 10 %",
      question: `Sur une route de montagne de La Réunion, un panneau indique <b>10 %</b> : la route monte de 10 m pour 100 m parcourus à l'horizontale.<br><br><b>Quel angle</b> fait la route avec l'horizontale, au dixième de degré ?`,
      reponse: `tan(angle) = 10 ÷ 100 = 0,1.<br>Avec la touche arctan (tan⁻¹) : angle ≈ <span class="big">5,7°</span>.<br>Une pente de 10 % n'est donc pas un angle de 10° !`,
      consigne: "Quel angle fait la route avec l'horizontale, au dixième ?",
      verification: {"type":"courte","attendus":["5,7","5.7"],"unite":"°"},
      dessin: route(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Deux fois plus penché",
      sorte: "piege",
      question: `Une rampe de <b>2 m</b> inclinée à <b>30°</b> monte à 1 m de haut.<br>Ilan dit : « À <b>60°</b>, c'est deux fois plus penché, donc elle monte à 2 m. »<br><br><b>A-t-il raison</b> ?`,
      reponse: `Hauteur = 2 × sin 60° ≈ 2 × 0,87 ≈ 1,73 m.<br><span class="big">Non : sin 60° ≈ 0,87, pas 1</span>. Le sinus n'est pas proportionnel à l'angle.<br>Pour monter à 2 m, la rampe devrait être verticale (90°) !`,
      consigne: "La rampe de 2 m à 60° monte-t-elle à 2 m ?",
      verification: {"type":"qcm","choix":["Non : sin 60° ≈ 0,87, elle monte à 1,73 m","Oui, car 60 = 2 × 30","Oui, l'angle double donc la hauteur double"],"bonne":0},
      dessin: rampes(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Sans rapporteur",
      sorte: "defi",
      question: `Dans un triangle rectangle, on sait que <b>cos Â = 0,6</b>.<br><br>Sans calculer l'angle, trouve <b>sin Â</b>.`,
      reponse: `Prenons une hypoténuse de 5 : le côté adjacent vaut 0,6 × 5 = 3.<br>Pythagore : opposé² = 5² − 3² = 16, donc opposé = 4.<br>sin Â = 4 ÷ 5 = <span class="big">0,8</span>. Et toujours : cos² + sin² = 0,36 + 0,64 = 1.`,
      consigne: "Si cos Â = 0,6, combien vaut sin Â ?",
      verification: {"type":"courte","attendus":["0,8","0.8"]},
      dessin: defi(),
    },
  ],
};

export default problemes;
