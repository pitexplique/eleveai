// Énigmes à projeter — 3e, notion triangle_figure (triangles semblables :
// coefficient, longueur manquante, logo agrandi, mêmes angles, piège « on
// ajoute 2 à chaque côté », défi du triangle de Sierpinski). 21/11/2026.
// ⛔ Ne reprend pas la 4e (bouées, handball, fanion, antenne, phare).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { type P, sommet, poly, milieu, arcAngle } from "../dessins-3e";

const lg = (a: P, b: P, s: string | number, dx: number, dy: number, c: string = C.craie, taille = 22) => { const m = milieu(a, b, dx, dy); return t(m[0], m[1], s, c, taille); };

// Triangles 3-4-6 et 6-8-12 : 1 cm = 20 px.
const deux = () => {
  const B1: P = [40, 330], C1: P = [160, 330], A1 = sommet(B1, C1, 60, 80);
  const B2: P = [210, 330], C2: P = [450, 330], A2 = sommet(B2, C2, 120, 160);
  return svg("Deux triangles de même forme : côtés 3, 4, 6 cm et côtés 6, 8, 12 cm",
    poly([A1, B1, C1], C.jaune, 4, 0.2) + poly([A2, B2, C2], C.bleu, 4, 0.15) +
      lg(A1, B1, 3, -14, 0) + lg(A1, C1, 4, 14, 0) + lg(B1, C1, 6, 0, 28) + lg(A2, B2, 6, -16, 0) + lg(A2, C2, 8, 16, 0) + lg(B2, C2, 12, 0, 28) +
      t(240, 60, `× ?`.replace(" ?", `${NB}?`), C.rose, 34) + t(240, 405, "en cm, au bon rapport", C.pale, 16));
};

// Triangles 5-7-9 et 15-21-27 : 1 unité = 14 px pour le petit, 9,8 px pour le grand (même forme).
const longueur = () => {
  const B1: P = [30, 300], C1: P = [156, 300], A1 = sommet(B1, C1, 70, 98);
  const k = 0.7, B2: P = [190, 300], C2: P = [190 + 378 * k, 300], A2 = sommet(B2, C2, 210 * k, 294 * k);
  return svg("Deux triangles semblables : le petit a pour côtés 5, 7 et 9 ; le grand a 15 pour plus petit côté",
    poly([A1, B1, C1], C.jaune, 4, 0.2) + poly([A2, B2, C2], C.bleu, 4, 0.15) +
      lg(A1, B1, 5, -14, 0) + lg(A1, C1, 7, 14, 0) + lg(B1, C1, 9, 0, 28) + lg(A2, B2, 15, -20, 0) + lg(B2, C2, "?", 0, 32, C.rose, 30) +
      t(240, 390, "le grand est réduit pour tenir", C.pale, 16));
};

// Le logo : 2,4 / 3,2 / 4 cm (triangle rectangle) et son agrandissement : 1 cm = 25 px puis × 2,5.
const logo = () => {
  const B1: P = [30, 330], C1: P = [130, 330], A1 = sommet(B1, C1, 60, 80);
  const k = 2.5 * 0.88, B2: P = [170, 330], C2: P = [170 + 100 * k, 330], A2 = sommet(B2, C2, 60 * k, 80 * k);
  return svg("Un logo triangulaire de côtés 2,4 cm, 3,2 cm et 4 cm, et le même logo agrandi dont le grand côté mesure 10 cm",
    poly([A1, B1, C1], C.rose, 4, 0.25) + poly([A2, B2, C2], C.rose, 4, 0.12) +
      lg(A1, B1, "2,4", -24, 0, C.craie, 18) + lg(A1, C1, "3,2", 22, 0, C.craie, 18) + lg(B1, C1, "4", 0, 26, C.craie, 18) + lg(B2, C2, "10 cm", 0, 30) +
      t(330, 80, `périmètre${NB}?`, C.rose, 26) + t(330, 405, "le grand est réduit pour tenir", C.pale, 14));
};

// Deux triangles : angles 40°, 60°, 80° et 80°, 40°, ? (dessinés tournés).
const angles = () => {
  // Triangle 1 : base 150 px, angles 40° en B, 60° en C.
  const rad = Math.PI / 180;
  const tri = (B: P, base: number, b: number, c: number, sens: number): P[] => {
    const Cc: P = [B[0] + sens * base, B[1]];
    const ab = (base * Math.sin(c * rad)) / Math.sin((180 - b - c) * rad);
    return [[Math.round(B[0] + sens * ab * Math.cos(b * rad)), Math.round(B[1] - ab * Math.sin(b * rad))], B, Cc];
  };
  const [A1, B1, C1] = tri([30, 330], 190, 40, 60, 1);
  const [A2, B2, C2] = tri([450, 330], 170, 80, 40, -1);
  return svg("Deux cerfs-volants triangulaires : le premier a des angles de 40°, 60° et 80° ; le second de 80°, 40° et un angle inconnu",
    poly([A1, B1, C1], C.jaune, 4, 0.2) + poly([A2, B2, C2], C.bleu, 4, 0.15) +
      arcAngle(B1, C1, A1, 30, C.craie) + arcAngle(C1, A1, B1, 30, C.craie) + arcAngle(A1, B1, C1, 26, C.craie) +
      arcAngle(B2, C2, A2, 30, C.craie) + arcAngle(C2, A2, B2, 30, C.craie) + arcAngle(A2, B2, C2, 26, C.rose) +
      t(B1[0] + 50, B1[1] - 10, "40°", C.craie, 18) + t(C1[0] - 46, C1[1] - 10, "60°", C.craie, 18) + t(A1[0], A1[1] + 52, "80°", C.craie, 18) +
      t(B2[0] - 38, B2[1] - 30, "80°", C.craie, 18) + t(C2[0] + 54, C2[1] - 10, "40°", C.craie, 18) + t(A2[0] + 6, A2[1] + 56, "?", C.rose, 24) +
      t(240, 395, `semblables${NB}?`, C.rose, 26));
};

// 2-3-4 et 4-5-6 : 1 unité = 30 px.
const piege = () => {
  const B1: P = [40, 320], C1: P = [160, 320], A1 = sommet(B1, C1, 60, 90);
  const B2: P = [230, 320], C2: P = [410, 320], A2 = sommet(B2, C2, 120, 150);
  return svg("Deux triangles : côtés 2, 3, 4 et côtés 4, 5, 6",
    poly([A1, B1, C1], C.jaune, 4, 0.2) + poly([A2, B2, C2], C.bleu, 4, 0.15) +
      lg(A1, B1, 2, -14, 0) + lg(A1, C1, 3, 14, 0) + lg(B1, C1, 4, 0, 28) + lg(A2, B2, 4, -16, 0) + lg(A2, C2, 5, 16, 0) + lg(B2, C2, 6, 0, 28) +
      t(240, 80, "+2 partout", C.rose, 28) + t(240, 400, "au bon rapport", C.pale, 16));
};

// Sierpinski, 2 étapes : 9 triangles pleins. Base 360 px.
const sierpinski = () => {
  const tri = (a: P, b: P, c: P, n: number): string => {
    if (!n) return poly([a, b, c], C.jaune, 2, 0.5);
    const m = (u: P, v: P): P => [(u[0] + v[0]) / 2, (u[1] + v[1]) / 2];
    return tri(a, m(a, b), m(a, c), n - 1) + tri(m(a, b), b, m(b, c), n - 1) + tri(m(a, c), m(b, c), c, n - 1);
  };
  const A: P = [240, 40], B: P = [60, 352], Cc: P = [420, 352];
  return svg("Le triangle de Sierpinski après deux étapes : 9 petits triangles colorés", poly([A, B, Cc], C.craie, 3) + tri(A, B, Cc, 2) +
    t(240, 395, `grand triangle${NB}: 48 cm²`, C.craie, 22));
};

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "triangle_figure",
  titre: "Énigmes des triangles semblables",
  description: "Les deux triangles de même forme, la longueur manquante, le logo agrandi, les deux cerfs-volants, le piège « +2 à chaque côté », le défi du triangle de Sierpinski : reconnaître des triangles semblables par les angles ou les longueurs, calculer avec le coefficient.",
  problemes: [
    {
      tag: "Énigme 1 · Même forme",
      titre: "Le coefficient",
      question: `Un triangle a pour côtés <b>3 cm, 4 cm et 6 cm</b>. Un autre a pour côtés <b>6 cm, 8 cm et 12 cm</b>.<br><br>Ils sont semblables. <b>Par combien</b> multiplie-t-on les longueurs du petit pour obtenir le grand ?`,
      reponse: `6 ÷ 3 = 2, 8 ÷ 4 = 2 et 12 ÷ 6 = 2 : les longueurs sont proportionnelles.<br>Le coefficient d'agrandissement vaut <span class="big">2</span>.`,
      consigne: "Quel est le coefficient d'agrandissement ?",
      verification: {"type":"courte","attendus":["2"]},
      dessin: deux(),
    },
    {
      tag: "Énigme 2 · Une longueur",
      titre: "Le côté manquant",
      question: `Un petit triangle a pour côtés <b>5, 7 et 9</b> cm. Un grand triangle lui est semblable : son plus petit côté mesure <b>15 cm</b>.<br><br><b>Combien mesure</b> son plus grand côté ?`,
      reponse: `Le petit côté passe de 5 à 15 : coefficient 15 ÷ 5 = 3.<br>Le plus grand côté mesure 9 × 3 = <span class="big">27 cm</span> (et le troisième 21 cm).`,
      consigne: "Combien mesure le plus grand côté du grand triangle ?",
      verification: {"type":"courte","attendus":["27"],"unite":"cm"},
      dessin: longueur(),
    },
    {
      tag: "Énigme 3 · Le logo",
      titre: "Agrandir pour l'affiche",
      question: `Le logo d'un club est un triangle de côtés <b>2,4 cm, 3,2 cm et 4 cm</b>. Pour une affiche, on l'agrandit : le côté de 4 cm devient <b>10 cm</b>.<br><br><b>Quel est le périmètre</b> du logo agrandi ?`,
      reponse: `Coefficient : 10 ÷ 4 = 2,5. Périmètre du petit logo : 2,4 + 3,2 + 4 = 9,6 cm.<br>Le périmètre est aussi multiplié par 2,5 : 9,6 × 2,5 = <span class="big">24 cm</span>.<br>(Côtés : 6 cm, 8 cm et 10 cm.)`,
      consigne: "Quel est le périmètre du logo agrandi ?",
      verification: {"type":"courte","attendus":["24"],"unite":"cm"},
      dessin: logo(),
    },
    {
      tag: "Énigme 4 · Les cerfs-volants",
      titre: "Des angles qui se ressemblent",
      question: `Un cerf-volant triangulaire a des angles de <b>40°, 60° et 80°</b>. Un autre a deux angles de <b>80° et 40°</b>.<br><br>Ces deux triangles sont-ils <b>semblables</b> ?`,
      reponse: `Le 3<sup>e</sup> angle du second vaut 180° − 80° − 40° = 60°.<br>Les deux triangles ont les mêmes angles (40°, 60°, 80°) : <span class="big">oui, ils sont semblables</span>, même s'ils ne sont pas tournés pareil.<br>Deux angles égaux suffisent pour le savoir.`,
      consigne: "Les deux triangles sont-ils semblables ?",
      verification: {"type":"qcm","choix":["Non, ils ne sont pas tournés pareil","Oui, ils ont les mêmes angles","On ne peut pas savoir sans les longueurs"],"bonne":1},
      dessin: angles(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "On ajoute 2",
      sorte: "piege",
      question: `Un triangle a pour côtés <b>2, 3 et 4</b> cm. Noé ajoute 2 cm à chaque côté : <b>4, 5 et 6</b> cm.<br>« J'ai agrandi pareil partout, ils sont semblables ! »<br><br><b>A-t-il raison</b> ?`,
      reponse: `4 ÷ 2 = 2, mais 5 ÷ 3 ≈ 1,67 et 6 ÷ 4 = 1,5. Les rapports ne sont pas égaux.<br><span class="big">Non, ils ne sont pas semblables</span>. Agrandir, c'est <b>multiplier</b> toutes les longueurs par le même nombre, pas ajouter.`,
      consigne: "Les triangles 2-3-4 et 4-5-6 sont-ils semblables ?",
      verification: {"type":"qcm","choix":["Oui, on a ajouté 2 partout","Oui, ils ont la même forme","Non, les rapports ne sont pas égaux"],"bonne":2},
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le triangle de Sierpinski",
      sorte: "defi",
      question: `On part d'un triangle équilatéral de <b>48 cm²</b>. On relie les milieux de ses côtés : 4 petits triangles semblables. On enlève celui du milieu.<br>Puis on recommence sur chacun des 3 triangles restants.<br><br>Quelle est l'<b>aire coloriée</b> après ces deux étapes ?`,
      reponse: `Les longueurs sont divisées par 2, donc les aires par 4.<br>Étape 1 : 3 triangles de 12 cm². Étape 2 : 9 triangles de 3 cm².<br>Aire coloriée : 9 × 3 = <span class="big">27 cm²</span>. À chaque étape, on garde ¾ de l'aire.`,
      consigne: "Quelle est l'aire coloriée après deux étapes ?",
      verification: {"type":"courte","attendus":["27"],"unite":"cm²"},
      dessin: sierpinski(),
    },
  ],
};

export default problemes;
