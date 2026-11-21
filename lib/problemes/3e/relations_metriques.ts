// Énigmes à projeter — 3e, notion relations_metriques (triangle rectangle et
// hauteur : la hauteur du triangle 6-8-10, le toit de la case créole,
// l'étagère d'angle, la ferme au bord de la route, piège de la moyenne,
// défi du carré d'Euclide). 21/11/2026. Notion hors programme français
// (masquée en France, gardée pour /pays). Relations : AB × AC = BC × AH,
// AH² = HB × HC, AB² = BH × BC.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { type P, seg, poly, pt, angleDroit, milieu } from "../dessins-3e";

/** Triangle ABC rectangle en A, hauteur [AH] : base [BC] horizontale. */
const triangle = (B: P, Cc: P, H: P, A: P, nomA = "A") =>
  poly([A, B, Cc], C.craie, 4, 0) + seg(A, H, C.bleu, 3, "8 6") + angleDroit(A, B, Cc, 16) + angleDroit(H, Cc, A, 14, C.bleu) +
  pt(A, nomA, 0, -14) + pt(B, "B", -18, 8) + pt(Cc, "C", 18, 8) + pt(H, "H", 0, 28, C.bleu);

const t1 = () => {
  const B: P = [70, 320], Cc: P = [410, 320], H: P = [192.4, 320], A: P = [192.4, 156.8];
  const mb = milieu(A, B, -22, 0), mc = milieu(A, Cc, 22, -6);
  return svg("Le triangle ABC rectangle en A, avec AB = 6 cm, AC = 8 cm, BC = 10 cm, et sa hauteur AH",
    triangle(B, Cc, H, A) + t(mb[0], mb[1], "6", C.craie, 24, "end") + t(mc[0], mc[1], "8", C.craie, 24, "start") + t(300, 360, "10 cm", C.craie, 22) +
      t(204, 270, `AH${NB}?`, C.rose, 24, "start") + t(240, 405, "au bon rapport", C.pale, 16));
};

// La case créole : HB = 4 m, HC = 9 m, AH = 6 m ; 1 m = 26 px.
const case_ = () => {
  const B: P = [71, 290], Cc: P = [409, 290], H: P = [175, 290], A: P = [175, 134];
  return svg("Une case créole dont le toit forme un angle droit au faîte : le pied de la hauteur partage la largeur en 4 m et 9 m",
    r(85, 290, 310, 95, C.jaune, 0.2, 3) + r(215, 315, 50, 70, C.craie, 0.15, 3) + r(110, 315, 60, 40, C.bleu, 0.25, 3) + r(310, 315, 60, 40, C.bleu, 0.25, 3) +
      poly([A, B, Cc], C.rose, 4, 0.15) + seg(A, H, C.bleu, 3, "8 6") + angleDroit(A, B, Cc, 16) + pt(A, "", 0, 0) +
      t(123, 280, "4 m", C.craie, 20) + t(292, 280, "9 m", C.craie, 20) + t(188, 220, `hauteur${NB}?`, C.bleu, 20, "start") + t(240, 412, "au bon rapport", C.pale, 16));
};

// L'étagère d'angle : BC = 80 cm, BH = 20 cm, AB = 40 cm ; 1 cm = 4,4 px.
const etagere = () => {
  const B: P = [64, 340], Cc: P = [416, 340], H: P = [152, 340], A: P = [152, 187.6];
  return svg("Une étagère d'angle vue de dessus : un triangle rectangle en A, coin du mur ; le bord avant BC mesure 80 cm et BH = 20 cm",
    l(152, 187.6, 64 - 30, 340 + 52, C.pale, 10) + l(152, 187.6, 416 + 40, 340 + 46.2 * 0.5, C.pale, 10) +
      poly([A, B, Cc], C.jaune, 4, 0.3) + seg(A, H, C.bleu, 3, "8 6") + angleDroit(A, B, Cc, 16) + angleDroit(H, Cc, A, 14, C.bleu) +
      pt(A, "A", -24, -6) + pt(B, "B", -22, 4) + pt(Cc, "C", 4, -16) + pt(H, "H", 0, 28, C.bleu) +
      t(108, 370, "20", C.craie, 20) + t(240, 405, "BC = 80 cm", C.craie, 20) + t(88, 250, `AB${NB}?`, C.rose, 24, "end") + t(400, 120, "vue de dessus", C.pale, 16) + t(400, 140, "au bon rapport", C.pale, 16));
};

// La ferme et la route : AB = 70 m, AC = 240 m, BC = 250 m ; 1 m = 1,4 px.
const ferme = () => {
  const B: P = [65, 300], Cc: P = [415, 300], H: P = [92.4, 300], A: P = [92.4, 205.9];
  return svg("Un champ en triangle rectangle en A, avec AB = 70 m et AC = 240 m ; la route longe le côté BC",
    l(30, 300, 450, 300, C.pale, 16) + poly([A, B, Cc], C.jaune, 4, 0.2) + seg(A, H, C.rose, 3, "8 6") + angleDroit(A, B, Cc, 14) +
      pt(A, "", 0, 0) + t(100, 190, "ferme", C.craie, 20, "start") + t(62, 258, "70 m", C.craie, 20, "end") + t(260, 240, "240 m", C.craie, 20, "start") +
      t(240, 345, "route", C.pale, 22) + t(112, 280, "?", C.rose, 26, "start") + t(240, 405, "au bon rapport", C.pale, 16));
};

// Le piège : HB = 1, HC = 9, AH = 3 ; 1 cm = 34 px.
const piege = () => {
  const B: P = [70, 320], Cc: P = [410, 320], H: P = [104, 320], A: P = [104, 218];
  return svg("Le triangle ABC rectangle en A, sa hauteur AH, avec HB = 1 cm et HC = 9 cm",
    triangle(B, Cc, H, A) + t(87, 376, "1", C.craie, 20) + t(257, 350, "9 cm", C.craie, 20) + t(118, 280, `AH${NB}?`, C.rose, 22, "start") +
      t(240, 120, "Tom : AH = (1 + 9) ÷ 2 = 5", C.bleu, 22).replace(" :", `${NB}:`) + t(240, 405, "au bon rapport", C.pale, 16));
};

// Le carré d'Euclide : diamètre 25 cm, HB = 5, HC = 20, HM = 10 ; 1 cm = 14 px.
const euclide = () => {
  const B: P = [65, 330], Cc: P = [415, 330], H: P = [135, 330], M: P = [135, 190];
  return svg("Un demi-cercle de diamètre BC = 25 cm ; H sur le diamètre avec HB = 5 cm et HC = 20 cm ; M sur le cercle au-dessus de H",
    `<path d="M65 330 L415 330 A175 175 0 0 0 65 330" fill="none" stroke="${C.craie}" stroke-width="3"/>` + seg(M, B, C.pale, 2) + seg(M, Cc, C.pale, 2) + angleDroit(M, B, Cc, 14, C.pale) +
      seg(H, M, C.rose, 4) + angleDroit(H, Cc, M, 14) + pt(B, "B", -18, 8) + pt(Cc, "C", 18, 8) + pt(H, "H", 0, 28) + pt(M, "M", -8, -14) +
      t(100, 360, "5", C.craie, 20) + t(275, 360, "20 cm", C.craie, 20) + t(148, 270, `HM${NB}?`, C.rose, 22, "start") +
      t(240, 405, "rectangle 5 × 20 → carré de même aire ?", C.bleu, 18).replace(" ?", `${NB}?`));
};

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "relations_metriques",
  titre: "Énigmes des relations métriques",
  description: "La hauteur du triangle 6-8-10, le toit de la case créole, l'étagère d'angle, la ferme au bord de la route, le piège de la moyenne, le défi du carré d'Euclide : relations métriques dans le triangle rectangle (AB × AC = BC × AH, AH² = HB × HC, AB² = BH × BC).",
  problemes: [
    {
      tag: "Énigme 1 · La hauteur",
      titre: "Deux façons de voir l'aire",
      question: `ABC est rectangle en A : <b>AB = 6 cm</b>, <b>AC = 8 cm</b>, <b>BC = 10 cm</b>. [AH] est la hauteur issue de A.<br><br><b>Combien mesure AH</b> ?`,
      reponse: `L'aire se calcule de deux façons : AB × AC ÷ 2 = BC × AH ÷ 2.<br>Donc 6 × 8 = 10 × AH, et AH = 48 ÷ 10 = <span class="big">4,8 cm</span>.`,
      consigne: "Combien mesure AH, en cm ?",
      verification: {"type":"courte","attendus":["4,8"],"unite":"cm"},
      dessin: t1(),
    },
    {
      tag: "Énigme 2 · La case créole",
      titre: "Le toit à angle droit",
      question: `Le toit d'une case créole forme un <b>angle droit</b> au faîte. La verticale du faîte partage la largeur en <b>4 m</b> et <b>9 m</b>.<br><br>À quelle <b>hauteur</b> au-dessus des murs se trouve le faîte ?`,
      reponse: `Dans un triangle rectangle, la hauteur vérifie AH² = HB × HC.<br>AH² = 4 × 9 = 36, donc AH = <span class="big">6 m</span>.`,
      consigne: "À quelle hauteur se trouve le faîte, en mètres ?",
      verification: {"type":"courte","attendus":["6"],"unite":"m"},
      dessin: case_(),
    },
    {
      tag: "Énigme 3 · L'étagère d'angle",
      titre: "Le long du mur",
      question: `Une étagère d'angle est un triangle rectangle en A, le coin du mur. Son bord avant <b>BC</b> mesure <b>80 cm</b>. H, le pied de la hauteur issue de A, est à <b>20 cm</b> de B.<br><br><b>Combien mesure AB</b>, le long du mur ?`,
      reponse: `Dans un triangle rectangle : AB² = BH × BC.<br>AB² = 20 × 80 = 1 600, donc AB = <span class="big">40 cm</span>.`,
      consigne: "Combien mesure AB, en cm ?",
      verification: {"type":"courte","attendus":["40"],"unite":"cm"},
      dessin: etagere(),
    },
    {
      tag: "Énigme 4 · La ferme",
      titre: "Le chemin le plus court",
      question: `Un champ est un triangle rectangle en A, où se trouve la ferme : <b>AB = 70 m</b>, <b>AC = 240 m</b>. Une route longe le côté [BC].<br><br>Quelle est la <b>distance la plus courte</b> de la ferme à la route ?`,
      reponse: `Le plus court chemin vers une droite est la perpendiculaire : c'est la hauteur AH.<br>Pythagore : BC² = 70² + 240² = 62 500, BC = 250 m. Puis AH = 70 × 240 ÷ 250 = <span class="big">67,2 m</span>.`,
      consigne: "Quelle est la distance la plus courte de la ferme à la route, en mètres ?",
      verification: {"type":"courte","attendus":["67,2"],"unite":"m"},
      dessin: ferme(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Pas la moyenne",
      sorte: "piege",
      question: `ABC est rectangle en A. Sa hauteur [AH] coupe [BC] en <b>HB = 1 cm</b> et <b>HC = 9 cm</b>. Tom dit : « AH est la moyenne : (1 + 9) ÷ 2 = 5 cm. »<br><br>Combien mesure vraiment <b>AH</b> ?`,
      reponse: `La relation est AH² = HB × HC, un produit, pas une somme.<br>AH² = 1 × 9 = 9, donc AH = <span class="big">3 cm</span> (et pas 9 : il faut prendre la racine).`,
      consigne: "Combien mesure AH ?",
      verification: {"type":"qcm","choix":["5 cm","3 cm","9 cm"],"bonne":1},
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le carré d'Euclide",
      sorte: "defi",
      question: `Pour transformer un rectangle de <b>5 cm sur 20 cm</b> en un <b>carré de même aire</b>, Euclide aligne 5 cm et 20 cm, trace le demi-cercle de diamètre 25 cm, puis la perpendiculaire en H jusqu'au cercle, en M.<br><br><b>Combien mesure HM</b> ?`,
      reponse: `M est sur le demi-cercle, donc BMC est rectangle en M, de hauteur [MH].<br>HM² = HB × HC = 5 × 20 = 100, donc HM = <span class="big">10 cm</span>.<br>Le carré de côté HM a une aire de 100 cm², comme le rectangle : HM² = 5 × 20 !`,
      consigne: "Combien mesure HM, en cm ?",
      verification: {"type":"courte","attendus":["10"],"unite":"cm"},
      dessin: euclide(),
    },
  ],
};

export default problemes;
