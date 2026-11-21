// Énigmes à projeter — 3e, notion thales_theoreme (calcul de MN, la
// réciproque, l'appareil sténopé en papillon, la largeur de la rivière,
// piège « ça a l'air parallèle », défi des diagonales du trapèze).
// Figures au bon rapport (sauf le sténopé, signalé). 21/11/2026.
// ⛔ Ne reprend pas la 4e (tente, peintre, ombre du chêne, toboggan, chevalet, lac).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";
import { type P, sommet, sur, seg, poly, pt, angleDroit, milieu } from "../dessins-3e";

const lg = (a: P, b: P, s: string | number, dx: number, dy: number, c: string = C.craie, taille = 22) => { const m = milieu(a, b, dx, dy); return t(m[0], m[1], s, c, taille); };

// AB = 5, AC = 6, BC = 8 ; 1 cm = 44 px ; AM = 3.
const calcul = () => {
  const B: P = [64, 350], Cc: P = [416, 350], A = sommet(B, Cc, 220, 264);
  const M = sur(A, B, 3 / 5), N = sur(A, Cc, 3 / 5);
  return svg("Triangle ABC avec M sur [AB] et N sur [AC], la droite (MN) parallèle à (BC)",
    poly([A, B, Cc]) + seg(M, N, C.bleu, 4) + pt(A, "A", 0, -14) + pt(B, "B", -18, 8) + pt(Cc, "C", 18, 8) + pt(M, "M", -20, 0, C.bleu) + pt(N, "N", 20, 0, C.bleu) +
      lg(A, M, "3", -14, 0) + lg(B, Cc, "8", 0, 30) + lg(M, N, `?`, 0, -10, C.rose, 28) +
      t(410, 60, "AB = 5", C.craie, 22, "end") + t(410, 90, "(MN) // (BC)", C.bleu, 22, "end") + t(70, 60, "au bon rapport", C.pale, 16, "start"));
};

// Réciproque : AM = 4, AB = 10, AN = 6, AC = 15 ; BC = 12 ; 1 cm = 26 px.
const reciproque = () => {
  const B: P = [84, 350], Cc: P = [396, 350], A = sommet(B, Cc, 260, 390);
  const M = sur(A, B, 0.4), N = sur(A, Cc, 0.4);
  return svg("Triangle ABC avec M sur [AB] et N sur [AC] : AM = 4, AB = 10, AN = 6, AC = 15",
    poly([A, B, Cc]) + seg(M, N, C.bleu, 4, "10 7") + pt(A, "A", 0, -14) + pt(B, "B", -18, 8) + pt(Cc, "C", 18, 8) + pt(M, "M", -20, 4, C.bleu) + pt(N, "N", 22, 4, C.bleu) +
      lg(A, M, "4", -16, 0) + lg(A, N, "6", 16, 0) + t(460, 120, "AB = 10", C.craie, 20, "end") + t(460, 150, "AC = 15", C.craie, 20, "end") +
      t(460, 60, `(MN) // (BC)${NB}?`, C.rose, 22, "end"));
};

// Le sténopé (pas à l'échelle) : la bougie, le trou O, l'image renversée.
const stenope = svg(
  "Un appareil sténopé : la lumière d'un arbre passe par un petit trou et dessine l'arbre à l'envers au fond de la boîte",
  r(300, 120, 150, 180, C.craie, 0.08, 4) + l(300, 120, 300, 200, C.craie, 6) + l(300, 220, 300, 300, C.craie, 6) +
    l(60, 110, 60, 310, C.jaune, 8) + p("M60 110 q-40 30 0 60 q40 -30 0 -60", C.jaune, 3, 0.4) +
    l(60, 110, 450, 260, C.pale, 2, "6 6") + l(60, 310, 450, 160, C.pale, 2, "6 6") + l(450, 160, 450, 260, C.rose, 6) +
    t(40, 215, "2 m", C.craie, 22, "end").replace('x="40"', 'x="48"') + t(180, 360, "5 m", C.craie, 22) + t(375, 340, "10 cm", C.craie, 20) + t(300, 100, "O", C.craie, 22) +
    t(468, 215, "?", C.rose, 30, "start").replace('x="468"', 'x="456"') + t(240, 405, "pas à l'échelle", C.pale, 16)
);

// La rivière : 1 m = 20 px. B(80,300), A 12 m au nord, O 8 m à l'est, C 2 m plus loin, D 3 m au sud.
const riviere = () => {
  const A: P = [80, 60], B: P = [80, 300], O: P = [240, 300], Cc: P = [280, 300], D: P = [280, 360];
  return svg("La largeur d'une rivière : un arbre A sur l'autre rive, B en face, O et C le long de la rive, D tel que A, O, D sont alignés",
    r(0, 92, 480, 196, C.bleu, 0.15, 0) + l(0, 92, 480, 92, C.bleu, 3) + l(0, 288, 480, 288, C.bleu, 3) + t(400, 200, "rivière", C.bleu, 22) +
      seg(A, B, C.rose, 3, "10 7") + seg(B, Cc) + seg(Cc, D) + seg(A, D, C.craie, 3) + angleDroit(B, A, Cc, 14) + angleDroit(Cc, B, D, 14) +
      t(80, 40, "🌳", C.craie, 30) + pt(A, "A", 18, 6) + pt(B, "B", -16, 26) + pt(O, "O", 0, -12) + pt(Cc, "C", 16, -10) + pt(D, "D", 18, 14) +
      t(160, 330, "8 m", C.craie, 20) + t(262, 330, "2", C.craie, 18) + t(300, 340, "3 m", C.craie, 20, "start") + t(60, 200, "?", C.rose, 34, "end") + t(240, 410, "au bon rapport", C.pale, 16));
};

// Piège : AM = 5, AB = 8, AN = 6, AC = 10 ; BC = 9 ; 1 cm = 36 px.
const piege = () => {
  const B: P = [78, 360], Cc: P = [402, 360], A = sommet(B, Cc, 288, 360);
  const M = sur(A, B, 5 / 8), N = sur(A, Cc, 6 / 10);
  return svg("Triangle ABC, M sur [AB] avec AM = 5 et AB = 8, N sur [AC] avec AN = 6 et AC = 10",
    poly([A, B, Cc]) + seg(M, N, C.bleu, 4) + pt(A, "A", 0, -14) + pt(B, "B", -18, 8) + pt(Cc, "C", 18, 8) + pt(M, "M", -20, 4, C.bleu) + pt(N, "N", 22, 4, C.bleu) +
      lg(A, M, "5", -16, 0) + lg(A, N, "6", 16, 0) + t(40, 80, "AB = 8", C.craie, 20, "start") + t(40, 110, "AC = 10", C.craie, 20, "start") +
      t(440, 80, `parallèles${NB}?`, C.rose, 22, "end") + t(440, 400, "au bon rapport", C.pale, 16, "end"));
};

// Le trapèze isocèle : bases 6 et 12, diagonales de 15 ; 1 cm = 20 px.
const trapeze = () => {
  const A: P = [120, 340], B: P = [360, 340], Cc: P = [300, 100], D: P = [180, 100];
  const O = sur(A, Cc, 2 / 3);
  return svg("Un trapèze ABCD de bases 12 cm et 6 cm ; ses diagonales de 15 cm se coupent en O",
    poly([A, B, Cc, D], C.craie, 4, 0) + seg(A, Cc, C.jaune, 4) + seg(B, D, C.bleu, 3) +
      pt(A, "A", -16, 20) + pt(B, "B", 16, 20) + pt(Cc, "C", 16, -8) + pt(D, "D", -16, -8) + pt(O, "O", 0, 34, C.rose) +
      t(240, 380, "12 cm", C.craie, 22) + t(240, 85, "6 cm", C.craie, 22) + t(440, 210, "AC = 15 cm", C.jaune, 20, "end").replace('x="440"', 'x="470"') +
      t(60, 200, `OC${NB}?`, C.rose, 26) + t(240, 412, "au bon rapport", C.pale, 16));
};

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "thales_theoreme",
  titre: "Énigmes de Thalès",
  description: "La longueur MN, la réciproque, l'appareil sténopé, la largeur de la rivière, le piège des droites qui ont l'air parallèles, le défi des diagonales du trapèze : théorème de Thalès, configuration papillon et réciproque.",
  problemes: [
    {
      tag: "Énigme 1 · Une longueur",
      titre: "Calculer MN",
      question: `Dans le triangle ABC, M est sur [AB] et N sur [AC], avec <b>(MN) // (BC)</b>.<br><b>AM = 3 cm, AB = 5 cm, BC = 8 cm.</b><br><br><b>Combien mesure</b> MN ?`,
      reponse: `D'après le théorème de Thalès : AM/AB = AN/AC = MN/BC.<br>Donc 3/5 = MN/8 et MN = 8 × 3 ÷ 5 = <span class="big">4,8 cm</span>.`,
      consigne: "Combien mesure MN ?",
      verification: {"type":"courte","attendus":["4,8","4.8"],"unite":"cm"},
      dessin: calcul(),
    },
    {
      tag: "Énigme 2 · La réciproque",
      titre: "Parallèles ou pas ?",
      question: `M est sur [AB] et N sur [AC], avec <b>AM = 4, AB = 10, AN = 6, AC = 15</b> (en cm).<br><br>Les droites (MN) et (BC) sont-elles <b>parallèles</b> ?`,
      reponse: `AM/AB = 4/10 = 0,4 et AN/AC = 6/15 = 0,4.<br>Les rapports sont égaux et les points sont dans le même ordre : d'après la réciproque de Thalès, <span class="big">(MN) // (BC)</span>.`,
      consigne: "Les droites (MN) et (BC) sont-elles parallèles ?",
      verification: {"type":"qcm","choix":["Non, elles se coupent","Oui, (MN) // (BC)","On ne peut pas savoir"],"bonne":1},
      dessin: reciproque(),
    },
    {
      tag: "Énigme 3 · Le sténopé",
      titre: "Une image à l'envers",
      question: `Un sténopé est une boîte noire percée d'un petit trou O. Un arbre de <b>2 m</b>, à <b>5 m</b> du trou, dessine son image <b>renversée</b> au fond de la boîte, à <b>10 cm</b> du trou. L'arbre et l'image sont parallèles.<br><br><b>Combien mesure</b> l'image, en cm ?`,
      reponse: `C'est une configuration « papillon » de Thalès autour du trou O.<br>image ÷ 2 m = 10 cm ÷ 5 m, soit image ÷ 200 = 10 ÷ 500 = 0,02.<br>Image : 200 × 0,02 = <span class="big">4 cm</span>.`,
      consigne: "Combien mesure l'image de l'arbre, en cm ?",
      verification: {"type":"courte","attendus":["4"],"unite":"cm"},
      dessin: stenope,
    },
    {
      tag: "Énigme 4 · La rivière",
      titre: "Mesurer sans nager",
      question: `Pour mesurer la largeur AB d'une rivière sans la traverser, Maëlle plante des piquets : B en face de l'arbre A, O à <b>8 m</b> de B le long de la rive, C <b>2 m</b> plus loin. Puis elle recule de C jusqu'à D, à <b>3 m</b>, en voyant A et O alignés. (AB) et (CD) sont perpendiculaires à la rive.<br><br><b>Quelle est la largeur</b> AB ?`,
      reponse: `(AB) et (CD) sont parallèles : configuration papillon en O.<br>AB/CD = OB/OC, donc AB/3 = 8/2 = 4 et AB = <span class="big">12 m</span>.`,
      consigne: "Quelle est la largeur AB de la rivière ?",
      verification: {"type":"courte","attendus":["12"],"unite":"m"},
      dessin: riviere(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Ça a l'air parallèle…",
      sorte: "piege",
      question: `M est sur [AB] et N sur [AC], avec <b>AM = 5, AB = 8, AN = 6, AC = 10</b> (en cm).<br>Sur le dessin, (MN) a l'air parallèle à (BC).<br><br><b>L'est-elle vraiment</b> ?`,
      reponse: `AM/AB = 5/8 = 0,625 et AN/AC = 6/10 = 0,6.<br>0,625 ≠ 0,6 : <span class="big">non, (MN) n'est pas parallèle à (BC)</span>.<br>On ne conclut jamais à l'œil, et on ne peut pas utiliser Thalès pour calculer MN ici.`,
      consigne: "(MN) est-elle parallèle à (BC) ?",
      verification: {"type":"qcm","choix":["Oui, ça se voit","Oui, car 5 + 3 = 8","Non, les rapports sont différents"],"bonne":2},
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les diagonales du trapèze",
      sorte: "defi",
      question: `ABCD est un trapèze : (AB) // (CD), avec <b>AB = 12 cm</b> et <b>CD = 6 cm</b>. Ses diagonales se coupent en O. La diagonale [AC] mesure <b>15 cm</b>.<br><br><b>Combien mesure</b> OC ?`,
      reponse: `Les triangles OAB et OCD forment un papillon : OC/OA = CD/AB = 6/12 = 1/2.<br>Donc OA est le double de OC, et OA + OC = 15 : 3 × OC = 15.<br>OC = <span class="big">5 cm</span> (et OA = 10 cm).`,
      consigne: "Combien mesure OC ?",
      verification: {"type":"courte","attendus":["5"],"unite":"cm"},
      dessin: trapeze(),
    },
  ],
};

export default problemes;
