// Énigmes à projeter — 3e, notion volume_solide (la citerne de jardin, le
// silo à grain, la piscine en L, le remplissage de la cuve, piège du carton
// aux dimensions doublées, défi du cube dans l'aquarium). 21/11/2026.
// ⛔ Ne reprend pas la 4e (bac à sable, chocolat, savon, tortues, tambour,
// laboratoire) ni volume_geometrie_espace 3e (boule, cône, Louvre, Archimède).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, ell } from "../dessins-ecole";

// La citerne : rayon 0,5 m, hauteur 1,2 m ; 1 m = 200 px.
const citerne = svg(
  "Une citerne en forme de cylindre de 0,5 m de rayon et 1,2 m de haut",
  p("M140 90 L140 330 A100 24 0 0 0 340 330 L340 90", C.bleu, 4, 0) + ell(240, 90, 100, 24, C.bleu, 0.2, 4) +
    p("M140 330 A100 24 0 0 1 340 330", C.bleu, 2) + l(240, 90, 340, 90, C.craie, 3) + t(348, 97, "0,5 m", C.craie, 18, "start") +
    l(400, 90, 400, 330, C.craie, 2) + t(408, 218, "1,2 m", C.craie, 22, "start") +
    t(240, 210, `? L`, C.rose, 34) + t(240, 400, "au bon rapport", C.pale, 16)
);

// Le silo : cylindre r = 3 m, h = 10 m, surmonté d'un cône de 3 m ; 1 m = 25 px.
const silo = svg(
  "Un silo : un cylindre de 3 m de rayon et 10 m de haut, surmonté d'un cône de 3 m de haut",
  p("M165 115 L240 40 L315 115", C.jaune, 4, 0) + ell(240, 115, 75, 14, C.jaune, 0.15, 3) +
    p("M165 115 L165 365 A75 14 0 0 0 315 365 L315 115", C.jaune, 4, 0) + p("M165 365 A75 14 0 0 1 315 365", C.jaune, 2) +
    l(240, 40, 240, 115, C.pale, 2, "6 5") + l(240, 115, 315, 115, C.craie, 3) + t(278, 138, "3 m", C.craie, 18) +
    l(345, 40, 345, 115, C.craie, 2) + t(355, 84, "3 m", C.craie, 20, "start") + l(345, 115, 345, 365, C.craie, 2) + t(355, 246, "10 m", C.craie, 20, "start") +
    t(110, 230, `V${NB}?`, C.rose, 30) + t(240, 405, "au bon rapport", C.pale, 16)
);

// La piscine en L, vue de dessus : 8 × 4 m et 4 × 3 m ; 1 m = 35 px.
const piscine = svg(
  "Une piscine en forme de L vue de dessus : un rectangle de 8 m sur 4 m et un rectangle de 4 m sur 3 m",
  p("M60 80 L340 80 L340 220 L200 220 L200 325 L60 325 Z", C.bleu, 4, 0.25) + l(60, 220, 200, 220, C.pale, 2, "6 5") +
    t(200, 66, "8 m", C.craie, 22) + t(352, 157, "4 m", C.craie, 22, "start") + t(130, 352, "4 m", C.craie, 22) + t(212, 280, "3 m", C.craie, 22, "start") +
    t(400, 290, "profondeur", C.craie, 18) + t(400, 314, "1,5 m", C.craie, 22) + t(240, 400, "vue de dessus, au bon rapport", C.pale, 16)
);

// La cuve 2 × 1,5 × 1 m et le tuyau (pas à l'échelle).
const cuve = svg(
  "Une cuve en forme de pavé de 2 m sur 1,5 m sur 1 m, remplie par un tuyau à 12 litres par minute",
  p("M70 180 L310 180 L310 320 L70 320 Z", C.bleu, 4, 0.15) + p("M70 180 L150 120 L390 120 L310 180 M390 120 L390 260 L310 320", C.bleu, 4) +
    t(190, 350, "2 m", C.craie, 22) + t(362, 305, "1,5 m", C.craie, 22, "start") + t(58, 256, "1 m", C.craie, 22, "end") +
    p("M440 40 L440 70 Q440 90 420 90 L250 90 L250 110", C.craie, 6) + l(250, 120, 250, 160, C.bleu, 3, "4 6") +
    t(340, 60, "12 L/min", C.rose, 22) + t(190, 255, `durée${NB}?`, C.rose, 28) + t(240, 405, "pas à l'échelle", C.pale, 16)
);

// Deux cartons cubiques : 40 cm et 80 cm (1 cm = 2 px).
const cube = (x: number, y: number, a: number, c: string) => {
  const d = a * 0.4;
  return p(`M${x} ${y} L${x + a} ${y} L${x + a} ${y + a} L${x} ${y + a} Z`, c, 4, 0.2) +
    p(`M${x} ${y} L${x + d} ${y - d} L${x + a + d} ${y - d} L${x + a} ${y} M${x + a + d} ${y - d} L${x + a + d} ${y + a - d} L${x + a} ${y + a}`, c, 4);
};
const cartons = svg(
  "Un petit carton cubique de 40 cm d'arête et un grand de 80 cm d'arête",
  cube(50, 250, 80, C.jaune) + cube(220, 170, 160, C.jaune) + t(90, 360, "40 cm", C.craie, 20) + t(300, 360, "80 cm", C.craie, 20) +
    t(90, 160, "0,064 m³", C.pale, 18) + t(320, 80, `? m³`, C.rose, 28) + t(240, 405, "au bon rapport", C.pale, 16)
);

// L'aquarium vu de face : 60 cm de long, 40 de haut, eau à 25 cm, cube de 15 cm ; 1 cm = 5 px.
const aquarium = svg(
  "Un aquarium de 60 cm de long et 30 cm de large, rempli d'eau sur 25 cm, où l'on plonge un cube de 15 cm d'arête",
  r(90, 185, 300, 125, C.bleu, 0.25, 0) + r(90, 110, 300, 200, C.craie, 0, 4) + r(240, 235, 75, 75, C.jaune, 0.5, 3) +
    l(90, 185, 390, 185, C.bleu, 3) + l(90, 176, 390, 176, C.rose, 2, "8 6") + t(400, 172, `+${NB}?`, C.rose, 24, "start") +
    t(240, 340, "60 cm", C.craie, 22) + t(78, 252, "25 cm", C.bleu, 20, "end") + t(278, 280, "15", C.craie, 20) +
    t(240, 90, "largeur : 30 cm", C.craie, 20).replace(" :", `${NB}:`) + t(240, 400, "vue de face, au bon rapport", C.pale, 16)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "volume_solide",
  titre: "Énigmes des volumes",
  description: "La citerne du jardin, le silo à grain, la piscine en L, le remplissage de la cuve, le piège du carton aux dimensions doublées, le défi du cube dans l'aquarium : volume du cylindre, du cône, du prisme, conversions m³ → L, effet d'un agrandissement.",
  problemes: [
    {
      tag: "Énigme 1 · La citerne",
      titre: "Combien de litres ?",
      question: `Une citerne de jardin a la forme d'un <b>cylindre</b> de rayon <b>0,5 m</b> et de hauteur <b>1,2 m</b>.<br><br><b>Combien de litres</b> d'eau de pluie peut-elle contenir, au litre près ?`,
      reponse: `V = π × r² × h = π × 0,5² × 1,2 = 0,3π ≈ 0,942 m³.<br>1 m³ = 1 000 L, donc environ <span class="big">942 L</span>.`,
      consigne: "Combien de litres la citerne contient-elle, au litre près ?",
      verification: {"type":"courte","attendus":["942"],"unite":"L"},
      dessin: citerne,
    },
    {
      tag: "Énigme 2 · Le silo",
      titre: "Le silo à grain",
      question: `Un silo est formé d'un <b>cylindre</b> de rayon 3 m et de hauteur 10 m, surmonté d'un <b>cône</b> de même rayon et de hauteur 3 m.<br><br><b>Quel est son volume</b>, au m³ près ?`,
      reponse: `Cylindre : π × 3² × 10 = 90π. Cône : π × 3² × 3 ÷ 3 = 9π.<br>Total : 99π ≈ <span class="big">311 m³</span>.`,
      consigne: "Quel est le volume du silo, au m³ près ?",
      verification: {"type":"courte","attendus":["311"],"unite":"m³"},
      dessin: silo,
    },
    {
      tag: "Énigme 3 · La piscine",
      titre: "Une piscine en L",
      question: `Vue de dessus, une piscine a la forme d'un <b>L</b> : un rectangle de 8 m sur 4 m et un rectangle de 4 m sur 3 m. Elle est profonde de <b>1,5 m</b> partout.<br><br><b>Combien de litres</b> faut-il pour la remplir ?`,
      reponse: `C'est un prisme droit. Aire de la base : 8 × 4 + 4 × 3 = 32 + 12 = 44 m².<br>V = 44 × 1,5 = 66 m³ = <span class="big">66 000 L</span>.`,
      consigne: "Combien de litres faut-il pour remplir la piscine ?",
      verification: {"type":"qcm","choix":["6 600 L","66 000 L","660 000 L"],"bonne":1},
      dessin: piscine,
    },
    {
      tag: "Énigme 4 · Le remplissage",
      titre: "La cuve et le tuyau",
      question: `Une cuve en forme de pavé mesure <b>2 m</b> × <b>1,5 m</b> × <b>1 m</b>. Un tuyau la remplit à <b>12 litres par minute</b>.<br><br><b>Combien de minutes</b> faut-il pour la remplir ?`,
      reponse: `V = 2 × 1,5 × 1 = 3 m³ = 3 000 L.<br>3 000 ÷ 12 = <span class="big">250 min</span>, soit 4 h 10 min.`,
      consigne: "Combien de minutes faut-il pour remplir la cuve ?",
      verification: {"type":"courte","attendus":["250"],"unite":"min"},
      dessin: cuve,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le grand carton",
      sorte: "piege",
      question: `Un carton cubique de <b>40 cm</b> d'arête a un volume de 0,064 m³. Le grand modèle a une arête <b>deux fois plus longue</b> : 80 cm.<br><br>Combien de fois plus de place offre-t-il ?`,
      reponse: `Longueurs × 2, donc volume × 2³ = <span class="big">× 8</span> (et pas × 2).<br>0,8³ = 0,512 m³ = 8 × 0,064. On pourrait ranger 8 petits cartons dans le grand.`,
      consigne: "Combien de fois plus de place offre le grand carton ?",
      verification: {"type":"qcm","choix":["2 fois plus","4 fois plus","8 fois plus"],"bonne":2},
      dessin: cartons,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le cube dans l'aquarium",
      sorte: "defi",
      question: `Un aquarium a un fond de <b>60 cm</b> sur <b>30 cm</b>. L'eau monte à 25 cm. On y pose un <b>cube</b> de pierre de <b>15 cm</b> d'arête, qui coule au fond.<br><br><b>De combien</b> le niveau de l'eau monte-t-il ?`,
      reponse: `Le cube, entièrement sous l'eau, pousse 15³ = 3 375 cm³ d'eau.<br>Cette eau s'étale sur le fond : 60 × 30 = 1 800 cm².<br>Hausse : 3 375 ÷ 1 800 = <span class="big">1,875 cm</span>, presque 2 cm.`,
      consigne: "De combien de centimètres le niveau monte-t-il ?",
      verification: {"type":"courte","attendus":["1,875","1,88","1,9"],"unite":"cm"},
      dessin: aquarium,
    },
  ],
};

export default problemes;
