// Énigmes à projeter — 3e, notion sections_solides (le pain de mie coupé,
// la bûche fendue, l'orange coupée à 3 cm du centre, la pyramide coupée
// parallèlement à la base, piège de l'hexagone dans le cube, défi du verre
// conique rempli à mi-hauteur). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, o, p, ell } from "../dessins-ecole";
import { frac } from "../outils";

// Le pain de mie (pavé) et une tranche parallèle à une face.
const pain = svg(
  "Un pain de mie en forme de pavé, coupé par un plan parallèle à une face",
  p("M60 180 L320 180 L320 320 L60 320 Z", C.jaune, 4, 0.12) + p("M60 180 L130 120 L390 120 L320 180 M390 120 L390 260 L320 320", C.jaune, 4) +
    p("M220 180 L290 120 L290 260 L220 320 Z", C.rose, 4, 0.35) + t(240, 380, `forme de la tranche${NB}?`, C.rose, 26)
);

// La bûche (cylindre couché) fendue dans sa longueur, par un plan parallèle à l'axe.
const buche = svg(
  "Une bûche en forme de cylindre, coupée dans sa longueur par un plan parallèle à son axe",
  ell(90, 200, 50, 90, C.jaune, 0.3, 4) + p("M90 110 L380 110 M90 290 L380 290", C.jaune, 4) + p("M380 110 a50 90 0 0 1 0 180", C.jaune, 4) +
    p("M60 128 L350 128 L350 272 L60 272 Z", C.rose, 3, 0.3).replace('stroke-linejoin', 'stroke-dasharray="10 6" stroke-linejoin') + o(90, 200, 6, C.craie, 1, 1) + l(90, 200, 380, 200, C.pale, 2, "4 6") +
    t(240, 365, `forme de la coupe${NB}?`, C.rose, 26) + t(240, 405, "le plan est parallèle à l'axe", C.pale, 16)
);

// L'orange coupée : boule de rayon 5, plan à 3 cm du centre ; 1 cm = 30 px.
const orange = svg(
  "Une orange de rayon 5 cm, coupée par un plan à 3 cm de son centre",
  o(200, 220, 150, C.jaune, 0.2) + l(80, 130, 320, 130, C.rose, 5) + `<circle cx="200" cy="220" r="5" fill="${C.craie}"/>` +
    l(200, 220, 200, 130, C.bleu, 3) + l(200, 220, 320, 130, C.craie, 3) + l(200, 130, 320, 130, C.rose, 6) +
    t(188, 180, "3", C.bleu, 22, "end") + t(270, 190, "5", C.craie, 22) + t(260, 118, "?", C.rose, 30) + t(420, 300, "au bon", C.pale, 16) + t(420, 320, "rapport", C.pale, 16)
);

// La pyramide de hauteur 12 cm, base carrée de 9 cm, coupée à 4 cm du sommet (vue de face) ; 1 cm = 24 px.
const pyramide = svg(
  "Une pyramide à base carrée de 9 cm de côté et de 12 cm de hauteur, coupée à 4 cm du sommet par un plan parallèle à la base",
  p("M132 360 L348 360 L240 72 Z", C.bleu, 4, 0.12) + l(240, 72, 240, 360, C.pale, 2, "6 6") + l(204, 168, 276, 168, C.rose, 5) +
    t(240, 395, "9 cm", C.craie, 22) + t(250, 260, "12 cm", C.craie, 20, "start") + t(186, 128, "4 cm", C.rose, 18, "end") + t(310, 160, "?", C.rose, 30, "start") +
    t(420, 60, "vue de face", C.pale, 16)
);

// Le cube et une coupe hexagonale (par les milieux de 6 arêtes).
const cube = () => {
  // Cube en perspective cavalière : face avant 200 px, fuite (80, −60).
  const F = (x: number, y: number, z: number): [number, number] => [Math.round(100 + 200 * x + 80 * z), Math.round(340 - 200 * y - 60 * z)];
  const s = (a: [number, number], b: [number, number], c: string, ep: number, d = "") => l(a[0], a[1], b[0], b[1], c, ep, d);
  let g = "";
  const arete = [[[0, 0, 0], [1, 0, 0]], [[1, 0, 0], [1, 1, 0]], [[1, 1, 0], [0, 1, 0]], [[0, 1, 0], [0, 0, 0]], [[0, 1, 0], [0, 1, 1]], [[1, 1, 0], [1, 1, 1]], [[1, 0, 0], [1, 0, 1]], [[0, 1, 1], [1, 1, 1]], [[1, 1, 1], [1, 0, 1]]] as const;
  for (const [a, b] of arete) g += s(F(a[0], a[1], a[2]), F(b[0], b[1], b[2]), C.craie, 4);
  g += s(F(0, 0, 0), F(0, 0, 1), C.pale, 2, "6 6") + s(F(0, 0, 1), F(1, 0, 1), C.pale, 2, "6 6") + s(F(0, 0, 1), F(0, 1, 1), C.pale, 2, "6 6");
  const hex = [F(0.5, 0, 0), F(1, 0.5, 0), F(1, 1, 0.5), F(0.5, 1, 1), F(0, 0.5, 1), F(0, 0, 0.5)];
  g += p(`M${hex.map((q) => q.join(" ")).join(" L")} Z`, C.rose, 3, 0.3);
  return svg("Un cube coupé par un plan qui passe par les milieux de six arêtes", g + t(240, 400, `combien de côtés${NB}?`, C.rose, 24));
};

// Le verre conique rempli à mi-hauteur ; 1 cm = 26 px.
const verre = svg(
  "Un verre en forme de cône, rempli jusqu'à la moitié de sa hauteur",
  p("M140 60 L240 300 L340 60", C.craie, 4) + ell(240, 60, 100, 18, C.craie, 0, 4) + p("M190 180 L240 300 L290 180 Z", C.bleu, 0, 0.45) + ell(240, 180, 50, 9, C.bleu, 0.5, 3) +
    l(240, 300, 240, 350, C.craie, 6) + l(190, 352, 290, 352, C.craie, 6) + t(360, 125, "h ÷ 2", C.pale, 20, "start") + t(360, 245, "h ÷ 2", C.bleu, 20, "start") +
    l(352, 60, 352, 300, C.pale, 2) + l(345, 180, 359, 180, C.pale, 2) + t(240, 400, `quelle part du verre${NB}?`, C.rose, 24)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "sections_solides",
  titre: "Énigmes des sections de solides",
  description: "La tranche de pain de mie, la bûche fendue, l'orange coupée, la pyramide coupée, le piège de l'hexagone caché dans le cube, le défi du verre à moitié plein : sections planes du pavé, du cylindre, de la sphère, de la pyramide et du cône.",
  problemes: [
    {
      tag: "Énigme 1 · Le pain de mie",
      titre: "La tranche",
      question: `Un pain de mie a la forme d'un pavé. On le coupe en tranches, parallèlement à une face.<br><br><b>Quelle forme</b> a chaque tranche ?`,
      reponse: `La section d'un pavé par un plan parallèle à une face est <span class="big">un rectangle</span>, de mêmes dimensions que cette face.`,
      consigne: "Quelle forme a la section d'un pavé parallèle à une face ?",
      verification: {"type":"qcm","choix":["Un triangle","Un trapèze","Un rectangle"],"bonne":2},
      dessin: pain,
    },
    {
      tag: "Énigme 2 · La bûche",
      titre: "Fendre dans la longueur",
      question: `Une bûche a la forme d'un cylindre. On la fend dans sa longueur, avec un plan <b>parallèle à son axe</b>.<br><br><b>Quelle forme</b> a la face coupée ?`,
      reponse: `Un plan parallèle à l'axe coupe le cylindre selon <span class="big">un rectangle</span>.<br>Un plan perpendiculaire à l'axe, lui, donnerait un disque (une rondelle).`,
      consigne: "Quelle forme a la section d'un cylindre parallèle à l'axe ?",
      verification: {"type":"qcm","choix":["Un disque","Un rectangle","Un ovale"],"bonne":1},
      dessin: buche,
    },
    {
      tag: "Énigme 3 · L'orange",
      titre: "Une coupe pas au milieu",
      question: `Une orange est une boule de <b>5 cm</b> de rayon. On la coupe avec un plan situé à <b>3 cm</b> de son centre.<br><br><b>Quel est le rayon</b> du disque coupé ?`,
      reponse: `Le centre, le centre du disque et un point du bord forment un triangle rectangle d'hypoténuse 5 cm.<br>r² = 5² − 3² = 25 − 9 = 16, donc r = <span class="big">4 cm</span>.`,
      consigne: "Quel est le rayon du disque coupé ?",
      verification: {"type":"courte","attendus":["4"],"unite":"cm"},
      dessin: orange,
    },
    {
      tag: "Énigme 4 · La pyramide",
      titre: "Le petit carré",
      question: `Une pyramide a une base carrée de <b>9 cm</b> de côté et une hauteur de <b>12 cm</b>. On la coupe parallèlement à la base, à <b>4 cm du sommet</b>.<br><br><b>Quel est le côté</b> du carré obtenu ?`,
      reponse: `La petite pyramide du haut est une réduction de la grande, de rapport 4 ÷ 12 = ${frac(1, 3)}.<br>Le côté du carré : 9 × ${frac(1, 3)} = <span class="big">3 cm</span>.`,
      consigne: "Quel est le côté du carré de la section ?",
      verification: {"type":"courte","attendus":["3"],"unite":"cm"},
      dessin: pyramide,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Un hexagone dans un cube ?",
      sorte: "piege",
      question: `Tom affirme : « Quand on coupe un cube avec un plan, on obtient toujours un carré, un rectangle ou un triangle. »<br><br>Peut-on obtenir un <b>hexagone</b> (6 côtés) ?`,
      reponse: `Oui ! Un plan qui passe par les milieux de 6 arêtes, comme sur le dessin, coupe les 6 faces du cube.<br>On obtient <span class="big">un hexagone régulier</span>. Le plan peut couper jusqu'à 6 faces, donc jusqu'à 6 côtés.`,
      consigne: "Peut-on obtenir un hexagone en coupant un cube ?",
      verification: {"type":"qcm","choix":["Oui, un hexagone régulier","Non, au plus 4 côtés","Non, seulement carrés et rectangles"],"bonne":0},
      dessin: cube(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le verre à moitié plein ?",
      sorte: "defi",
      question: `Un verre a la forme d'un cône, pointe en bas. On le remplit d'eau jusqu'à la <b>moitié de sa hauteur</b>.<br><br>Quelle <b>fraction</b> du verre est remplie ?`,
      reponse: `L'eau forme un petit cône, réduction du verre de rapport ${frac(1, 2)}.<br>Les volumes sont multipliés par (${frac(1, 2)})³ = ${frac(1, 8)}.<br>Le verre n'est rempli qu'au <span class="big">${frac(1, 8)}</span> : il paraît à moitié plein, mais il est presque vide !`,
      consigne: "Quelle fraction du verre est remplie ?",
      verification: {"type":"courte","attendus":["1/8"]},
      dessin: verre,
    },
  ],
};

export default problemes;
