// Énigmes à projeter — 3e, notion aire_surface (aires : la pizza de 30 cm,
// une grande ou deux moyennes, la fenêtre cintrée, le rond-point, piège du
// rayon doublé, défi des lunules d'Hippocrate). 21/11/2026.
// ⛔ Ne reprend pas la 4e (salle de bains, voile, manège, grange, lavande, chèvres).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p } from "../dessins-ecole";

const garniture = (cx: number, cy: number, R: number) =>
  [[-0.4, -0.3], [0.3, -0.4], [0.1, 0.2], [-0.3, 0.4], [0.5, 0.25]].map(([a, b], k) => `<circle cx="${Math.round(cx + a * R)}" cy="${Math.round(cy + b * R)}" r="${Math.round(R / 9)}" fill="${k % 2 ? C.bleu : C.rose}" fill-opacity=".45"/>`).join("");

// Pizza de 30 cm : 1 cm = 8 px.
const pizza = svg(
  "Une pizza ronde de 30 cm de diamètre",
  o(240, 190, 120, C.jaune, 0.3, 8) + garniture(240, 190, 120) + l(120, 190, 360, 190, C.craie, 3, "8 6") + t(240, 180, "30 cm", C.craie, 24) +
    t(240, 370, `aire${NB}?`, C.rose, 28) + t(240, 405, "au cm² près", C.pale, 18)
);

// Une pizza de 30 cm contre deux de 20 cm, au bon rapport (1 cm = 6 px).
const choix = svg(
  "Une pizza de 30 cm de diamètre à gauche, deux pizzas de 20 cm à droite, au même prix",
  o(130, 200, 90, C.jaune, 0.3, 6) + garniture(130, 200, 90) + t(130, 330, "30 cm", C.craie, 22) +
    o(350, 120, 60, C.jaune, 0.3, 5) + garniture(350, 120, 60) + o(350, 260, 60, C.jaune, 0.3, 5) + garniture(350, 260, 60) + t(430, 340, "2 × 20 cm", C.craie, 20, "end") +
    t(240, 395, `même prix${NB}: le plus à manger${NB}?`, C.rose, 22)
);

// La fenêtre : rectangle 1 m × 1,2 m et demi-disque de 1 m ; 1 m = 200 px.
const fenetre = svg(
  "Une fenêtre : un rectangle de 1 m de large et 1,2 m de haut, surmonté d'un demi-disque",
  p("M140 380 L140 140 A100 100 0 0 1 340 140 L340 380 Z", C.bleu, 5, 0.15) + l(140, 140, 340, 140, C.craie, 3) + l(240, 40, 240, 380, C.craie, 3) +
    t(240, 405, "1 m", C.craie, 20) + t(360, 265, "1,2 m", C.craie, 20, "start") + t(420, 90, `aire${NB}?`, C.rose, 26) + t(60, 90, "au bon", C.pale, 14) + t(60, 108, "rapport", C.pale, 14)
);

// Le rond-point : rayons 15 m et 9 m ; 1 m = 10 px.
const rondpoint = svg(
  "Un rond-point : une chaussée en anneau entre un cercle de 15 m et un îlot de 9 m de rayon",
  o(240, 200, 150, C.pale, 0.35, 4) + o(240, 200, 90, C.jaune, 0.5, 4) + t(240, 190, "🌴", C.craie, 40) +
    l(240, 200, 390, 200, C.craie, 3) + t(345, 190, "15 m", C.craie, 18) + l(240, 200, 240, 110, C.bleu, 3) + t(250, 150, "9 m", C.bleu, 18, "start") +
    t(240, 395, `aire de la chaussée${NB}?`, C.rose, 24)
);

// Disques de rayon 10 et 20 : 1 cm = 6 px.
const piege = svg(
  "Un disque de rayon 10 cm et un disque de rayon 20 cm",
  o(110, 200, 60, C.bleu, 0.25) + o(320, 200, 120, C.rose, 0.15) + l(110, 200, 170, 200, C.craie, 3) + l(320, 200, 440, 200, C.craie, 3) +
    t(140, 190, "10", C.craie, 20) + t(380, 190, "20 cm", C.craie, 20) + t(110, 300, "314 cm²", C.bleu, 22) + t(320, 365, `? cm²`, C.rose, 26) + t(240, 405, "au bon rapport", C.pale, 16)
);

// Les lunules : triangle rectangle isocèle A(100,300) B(380,300) C(240,160).
const lunules = svg(
  "Un triangle rectangle et ses deux lunules, entre les demi-cercles des petits côtés et le grand demi-cercle",
  p("M100 300 A99 99 0 0 1 240 160 A140 140 0 0 0 100 300 Z", C.jaune, 3, 0.5) + p("M240 160 A99 99 0 0 1 380 300 A140 140 0 0 0 240 160 Z", C.jaune, 3, 0.5) +
    p("M100 300 L380 300 L240 160 Z", C.bleu, 4, 0.3) + p("M100 300 A140 140 0 0 1 380 300", C.pale, 2) +
    t(120, 120, "lunule", C.jaune, 20) + t(360, 120, "lunule", C.jaune, 20) + t(240, 360, `jaune ou bleu${NB}: qui a la plus grande aire${NB}?`, C.rose, 20)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "aire_surface",
  titre: "Énigmes des aires",
  description: "La pizza de 30 cm, une grande ou deux moyennes, la fenêtre cintrée, le rond-point, le piège du rayon doublé, le défi des lunules d'Hippocrate : aire du disque, figures composées, couronne, agrandissement.",
  problemes: [
    {
      tag: "Énigme 1 · La pizza",
      titre: "Combien de cm² ?",
      question: `Une pizza ronde a un diamètre de <b>30 cm</b>.<br><br><b>Quelle est son aire</b>, au cm² près ?`,
      reponse: `Le rayon vaut 15 cm. Aire = π × r² = π × 15² = 225π ≈ <span class="big">707 cm²</span>.`,
      consigne: "Quelle est l'aire de la pizza, au cm² près ?",
      verification: {"type":"courte","attendus":["707"],"unite":"cm²"},
      dessin: pizza,
    },
    {
      tag: "Énigme 2 · Le bon choix",
      titre: "Une grande ou deux moyennes ?",
      question: `Au même prix, la pizzeria propose <b>une grande pizza de 30 cm</b> ou <b>deux moyennes de 20 cm</b> de diamètre.<br><br>Quel choix donne <b>le plus à manger</b> ?`,
      reponse: `Une grande : π × 15² ≈ 707 cm². Deux moyennes : 2 × π × 10² ≈ 628 cm².<br><span class="big">La grande pizza</span> l'emporte, de presque 80 cm² !`,
      consigne: "Quel choix donne le plus à manger ?",
      verification: {"type":"qcm","choix":["La grande pizza de 30 cm","Les deux pizzas de 20 cm","C'est pareil"],"bonne":0},
      dessin: choix,
    },
    {
      tag: "Énigme 3 · La fenêtre",
      titre: "Une fenêtre cintrée",
      question: `Une fenêtre est formée d'un rectangle de <b>1 m</b> de large et <b>1,2 m</b> de haut, surmonté d'un <b>demi-disque</b> de 1 m de diamètre.<br><br><b>Quelle est l'aire</b> de la vitre, au centième de m² ?`,
      reponse: `Rectangle : 1 × 1,2 = 1,2 m². Demi-disque : π × 0,5² ÷ 2 ≈ 0,39 m².<br>Total : 1,2 + 0,39 ≈ <span class="big">1,59 m²</span>.`,
      consigne: "Quelle est l'aire de la vitre, au centième ?",
      verification: {"type":"courte","attendus":["1,59","1.59"],"unite":"m²"},
      dessin: fenetre,
    },
    {
      tag: "Énigme 4 · Le rond-point",
      titre: "La chaussée en anneau",
      question: `Un rond-point a un rayon de <b>15 m</b>. Au centre, un îlot planté de palmiers a un rayon de <b>9 m</b>.<br><br><b>Quelle est l'aire</b> de la chaussée, au m² près ?`,
      reponse: `Grand disque moins îlot : π × 15² − π × 9² = π × (225 − 81) = 144π.<br>144π ≈ <span class="big">452 m²</span> de bitume.`,
      consigne: "Quelle est l'aire de la chaussée, au m² près ?",
      verification: {"type":"courte","attendus":["452"],"unite":"m²"},
      dessin: rondpoint,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Un rayon doublé",
      sorte: "piege",
      question: `Un disque de rayon <b>10 cm</b> a une aire d'environ <b>314 cm²</b>.<br><br>Quelle est l'aire d'un disque de rayon <b>20 cm</b> ?`,
      reponse: `Rayon × 2, donc aire × 2² = × 4 (et pas × 2).<br>π × 20² = 400π ≈ <span class="big">1 256 cm²</span>, soit 4 × 314.`,
      consigne: "Quelle est l'aire d'un disque de rayon 20 cm ?",
      verification: {"type":"qcm","choix":["628 cm²","1 256 cm²","942 cm²"],"bonne":1},
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les lunules d'Hippocrate",
      sorte: "defi",
      question: `Sur les trois côtés d'un triangle rectangle isocèle, on trace des demi-disques. Les deux <b>lunules jaunes</b> sont ce qui dépasse du grand demi-disque.<br><br>Qui a la plus grande aire : les <b>deux lunules</b> ensemble, ou le <b>triangle bleu</b> ?`,
      reponse: `Grâce à Pythagore, les deux petits demi-disques ont ensemble la même aire que le grand.<br>On enlève à chacun la partie commune (les deux segments blancs) : il reste les lunules d'un côté, le triangle de l'autre.<br><span class="big">Ils ont exactement la même aire</span> ! Une surface courbe égale à une surface droite : Hippocrate de Chios l'a montré il y a 2 400 ans.`,
      consigne: "Les deux lunules ou le triangle : qui a la plus grande aire ?",
      verification: {"type":"qcm","choix":["Le triangle","Les lunules","Ils ont la même aire"],"bonne":2},
      dessin: lunules,
    },
  ],
};

export default problemes;
