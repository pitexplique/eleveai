// Énigmes à projeter — 3e, notion angles_cercle (angle inscrit et angle au
// centre : la figure de base, l'angle de tir face au but, le cadran de
// l'horloge, le triangle dans le demi-cercle, piège de la moitié à l'envers,
// défi des pointes de l'étoile). 21/11/2026. Notion hors programme français
// (masquée en France, gardée pour /pays).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, o } from "../dessins-ecole";
import { type P, seg, poly, pt, arcAngle } from "../dessins-3e";

const r1 = (v: number) => Math.round(v * 10) / 10;
/** Le point du cercle (centre O, rayon R) à l'angle θ en degrés (sens direct, y vers le haut). */
const sur = (O: P, R: number, deg: number): P => [r1(O[0] + R * Math.cos((deg * Math.PI) / 180)), r1(O[1] - R * Math.sin((deg * Math.PI) / 180))];

// Figure de base : AOB = 110°, M en haut.
const base = () => {
  const O: P = [240, 200], R = 140, A = sur(O, R, 215), B = sur(O, R, 325), M = sur(O, R, 100);
  return svg("Un cercle de centre O, les points A et B avec un angle au centre de 110 degrés, et le point M sur le cercle",
    o(240, 200, 140, C.craie, 0, 3) + seg(O, A, C.bleu, 3) + seg(O, B, C.bleu, 3) + seg(M, A, C.craie, 3) + seg(M, B, C.craie, 3) +
      arcAngle(O, A, B, 30, C.bleu) + arcAngle(M, A, B, 44, C.rose) + pt(O, "O", 0, -14) + pt(A, "A", -18, 22) + pt(B, "B", 18, 22) + pt(M, "M", -4, -14) +
      t(240, 262, "110°", C.bleu, 20) + t(234, 118, "?", C.rose, 26));
};

// Le but : les poteaux sur une corde qui sous-tend 60°, trois joueurs sur l'arc.
const but = () => {
  const O: P = [240, 200], R = 140, P1 = sur(O, R, 240), P2 = sur(O, R, 300), L = sur(O, R, 140), S = sur(O, R, 50), K = sur(O, R, 95);
  return svg("Les deux poteaux d'un but et trois joueurs placés sur un même arc de cercle passant par les poteaux",
    o(240, 200, 140, C.pale, 0, 2).replace("/>", ' stroke-dasharray="6 6"/>') + seg(P1, P2, C.craie, 8) +
    seg(L, P1, C.bleu, 2) + seg(L, P2, C.bleu, 2) + seg(S, P1, C.rose, 2) + seg(S, P2, C.rose, 2) + seg(K, P1, C.pale, 2) + seg(K, P2, C.pale, 2) +
      arcAngle(L, P1, P2, 50, C.bleu) + arcAngle(S, P1, P2, 60, C.rose) + pt(L, "Léo", -30, -6, C.bleu, 20) + pt(S, "Sam", 32, -6, C.rose, 20) + pt(K, "", 0, 0, C.pale) +
      t(240, 360, "but", C.craie, 20) + t(176, 162, "30°", C.bleu, 18) + t(300, 158, "?", C.rose, 24) + t(240, 405, "au bon rapport", C.pale, 16));
};

// L'horloge : 12 en haut, 4 et 8.
const horloge = () => {
  const O: P = [240, 200], R = 150;
  const h = (k: number) => sur(O, R, 90 - 30 * k), lab = (k: number) => sur(O, R - 26, 90 - 30 * k);
  const H12 = h(0), H4 = h(4), H8 = h(8);
  return svg("Le cadran d'une horloge : on relie le 8 au 12 et au 4",
    o(240, 200, 150, C.jaune, 0.12, 4) + Array.from({ length: 12 }, (_, i) => t(lab(i)[0], lab(i)[1] + 7, i === 0 ? 12 : i, C.pale, 18)).join("") +
      seg(H8, H12, C.bleu, 3) + seg(H8, H4, C.bleu, 3) + pt(H12, "", 0, 0) + pt(H4, "", 0, 0) + pt(H8, "", 0, 0) +
      arcAngle(H8, H12, H4, 46, C.rose) + t(178, 262, "?", C.rose, 26) + pt(O, "", 0, 0, C.pale) + t(240, 405, `angle au 8${NB}?`, C.rose, 22));
};

// Le demi-cercle : AB = 10 cm, AM = 6 cm ; 1 cm = 32 px.
const demi = () => {
  const A: P = [80, 300], B: P = [400, 300], M: P = [195.2, 146.4];
  return svg("Un demi-cercle de diamètre AB = 10 cm et un point M sur le cercle, avec AM = 6 cm",
    `<path d="M80 300 A160 160 0 0 1 400 300" fill="none" stroke="${C.craie}" stroke-width="3"/>` + poly([A, M, B], C.bleu, 4, 0.1) +
      pt(A, "A", -18, 8) + pt(B, "B", 18, 8) + pt(M, "M", -8, -14) + pt([240, 300], "", 0, 0, C.pale) +
      t(240, 330, "10 cm", C.craie, 22) + t(130, 258, "6 cm", C.craie, 22, "start") + t(318, 212, "?", C.rose, 30) + t(240, 405, "au bon rapport", C.pale, 16));
};

// Le piège : angle inscrit 50°, angle au centre 100°.
const piege = () => {
  const O: P = [240, 210], R = 140, A = sur(O, R, 220), B = sur(O, R, 320), M = sur(O, R, 90);
  return svg("Un cercle de centre O : l'angle inscrit AMB mesure 50 degrés, on cherche l'angle au centre AOB",
    o(240, 210, 140, C.craie, 0, 3) + seg(O, A, C.bleu, 3) + seg(O, B, C.bleu, 3) + seg(M, A, C.craie, 3) + seg(M, B, C.craie, 3) +
      arcAngle(O, A, B, 30, C.bleu) + arcAngle(M, A, B, 48, C.rose) + pt(O, "O", 0, -14) + pt(A, "A", -18, 22) + pt(B, "B", 18, 22) + pt(M, "M", 0, -14) +
      t(240, 132, "50°", C.rose, 20) + t(240, 272, "?", C.bleu, 24) + t(240, 405, "Léa : « l'angle au centre, c'est la moitié »", C.bleu, 18).replace(" :", `${NB}:`).replace("« ", `«${NB}`).replace(" »", `${NB}»`));
};

// L'étoile à cinq branches inscrite dans un cercle.
const etoile = () => {
  const O: P = [240, 215], R = 160, S = [0, 1, 2, 3, 4].map((k) => sur(O, R, 90 + 72 * k));
  return svg("Une étoile à cinq branches dont les pointes sont sur un cercle",
    o(240, 215, 160, C.pale, 0, 2) + poly([S[0], S[2], S[4], S[1], S[3]], C.jaune, 4, 0.25) + S.map((q) => pt(q, "", 0, 0)).join("") +
      arcAngle(S[0], S[2], S[3], 60, C.rose) + t(240, 120, "?", C.rose, 26) + t(240, 405, `angle d'une pointe${NB}?`, C.rose, 22));
};

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "angles_cercle",
  titre: "Énigmes des angles et du cercle",
  description: "L'angle inscrit et l'angle au centre, l'angle de tir face au but, le cadran de l'horloge, le triangle dans le demi-cercle, le piège de la moitié à l'envers, le défi des pointes de l'étoile : angle inscrit, angle au centre, arcs interceptés, polygones réguliers.",
  problemes: [
    {
      tag: "Énigme 1 · La figure",
      titre: "L'angle inscrit",
      question: `Sur un cercle de centre O, l'angle au centre <b>AOB</b> mesure <b>110°</b>. Le point M est sur le cercle, de l'autre côté.<br><br><b>Combien mesure l'angle AMB</b> ?`,
      reponse: `L'angle inscrit AMB et l'angle au centre AOB interceptent le même arc AB.<br>L'angle inscrit vaut la moitié : 110 ÷ 2 = <span class="big">55°</span>.`,
      consigne: "Combien mesure l'angle AMB, en degrés ?",
      verification: {"type":"courte","attendus":["55"],"unite":"°"},
      dessin: base(),
    },
    {
      tag: "Énigme 2 · Face au but",
      titre: "L'angle de tir",
      question: `Léo et Sam sont sur un <b>même arc de cercle</b> qui passe par les deux poteaux du but. Léo voit le but sous un angle de <b>30°</b>.<br><br>Sous quel angle <b>Sam</b> voit-il le but ?`,
      reponse: `Les deux angles sont inscrits et interceptent le même arc : celui entre les poteaux.<br>Ils sont égaux : <span class="big">30°</span>. Partout sur cet arc, on voit le but sous le même angle !`,
      consigne: "Sous quel angle Sam voit-il le but, en degrés ?",
      verification: {"type":"courte","attendus":["30"],"unite":"°"},
      dessin: but(),
    },
    {
      tag: "Énigme 3 · L'horloge",
      titre: "Le triangle du cadran",
      question: `Sur le cadran d'une horloge, on relie le <b>8</b> au <b>12</b> et au <b>4</b>.<br><br><b>Quel angle</b> forment les deux traits au niveau du 8 ?`,
      reponse: `Entre deux heures, l'angle au centre vaut 360 ÷ 12 = 30°. De 12 à 4 : 4 × 30 = 120°.<br>L'angle au 8 est inscrit et intercepte cet arc : 120 ÷ 2 = <span class="big">60°</span>. (Le triangle 12-4-8 est équilatéral.)`,
      consigne: "Quel angle forment les deux traits au niveau du 8, en degrés ?",
      verification: {"type":"courte","attendus":["60"],"unite":"°"},
      dessin: horloge(),
    },
    {
      tag: "Énigme 4 · Le demi-cercle",
      titre: "Un angle droit caché",
      question: `[AB] est un diamètre de <b>10 cm</b>. M est sur le cercle, avec <b>AM = 6 cm</b>.<br><br><b>Combien mesure MB</b> ?`,
      reponse: `AMB intercepte un demi-cercle, soit un angle au centre de 180° : AMB = 90°. Le triangle est rectangle en M.<br>Pythagore : MB² = 10² − 6² = 64, donc MB = <span class="big">8 cm</span>.`,
      consigne: "Combien mesure MB, en cm ?",
      verification: {"type":"courte","attendus":["8"],"unite":"cm"},
      dessin: demi(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La moitié à l'envers",
      sorte: "piege",
      question: `L'angle inscrit <b>AMB</b> mesure <b>50°</b>. Léa dit : « L'angle au centre, c'est la moitié : 25°. »<br><br>Combien mesure vraiment l'angle au centre <b>AOB</b> ?`,
      reponse: `C'est l'angle <b>inscrit</b> qui vaut la moitié de l'angle au centre, pas l'inverse.<br>AOB = 2 × 50 = <span class="big">100°</span>. Sur la figure, l'angle au centre est bien le plus ouvert.`,
      consigne: "Combien mesure l'angle au centre AOB ?",
      verification: {"type":"qcm","choix":["25°","50°","100°"],"bonne":2},
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les pointes de l'étoile",
      sorte: "defi",
      question: `Une étoile à cinq branches a ses <b>cinq pointes</b> sur un cercle, régulièrement espacées.<br><br><b>Combien mesure l'angle</b> d'une pointe ?`,
      reponse: `Les 5 pointes découpent le cercle en 5 arcs égaux : 360 ÷ 5 = 72° d'angle au centre chacun.<br>Une pointe est un angle inscrit qui intercepte un seul de ces arcs : 72 ÷ 2 = <span class="big">36°</span>.<br>Les cinq pointes font 5 × 36 = 180° en tout.`,
      consigne: "Combien mesure l'angle d'une pointe, en degrés ?",
      verification: {"type":"courte","attendus":["36"],"unite":"°"},
      dessin: etoile(),
    },
  ],
};

export default problemes;
