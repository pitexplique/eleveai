// Énigmes à projeter — CE2, notion longueurs (la hauteur de la porte, le
// tapis en centimètres, le chemin de l'école, la balade de 2 km, le piège de
// la règle qui ne part pas de 0, le défi de la guirlande). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

const porte = svg(
  "Une porte et un enfant à côté ; la porte mesure 2 quoi ?",
  r(150, 60, 140, 280, C.jaune, 0.2, 5, 4) + p("M265 200 L275 200", C.craie, 6) + t(360, 340, "🧒", C.craie, 80) +
    l(110, 60, 110, 340, C.rose, 3) + l(100, 60, 120, 60, C.rose, 3) + l(100, 340, 120, 340, C.rose, 3) + t(70, 210, "2 ?", C.rose, 30) +
    t(240, 395, `cm${NB}? m${NB}? km${NB}?`, C.pale, 26)
);

const tapis = svg(
  "Un tapis de 1 m 20 cm de long",
  r(60, 140, 360, 120, C.rose, 0.2, 4, 6) + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => l(70 + i * 48, 260, 70 + i * 48, 280, C.rose, 3)).join("") +
    l(60, 100, 420, 100, C.craie, 3) + l(60, 90, 60, 110, C.craie, 3) + l(420, 90, 420, 110, C.craie, 3) + t(240, 85, "1 m 20 cm", C.craie, 30) +
    t(240, 360, `en centimètres${NB}?`, C.rose, 30)
);

const chemin = svg(
  "Maison vers boulangerie : 350 m ; boulangerie vers école : 450 m",
  t(60, 170, "🏠", C.craie, 56) + t(240, 120, "🥖", C.craie, 50) + t(420, 170, "🏫", C.craie, 56) +
    l(85, 175, 215, 135, C.jaune, 5, "10 8") + l(265, 135, 395, 175, C.jaune, 5, "10 8") +
    t(130, 210, "350 m", C.craie, 26) + t(350, 210, "450 m", C.craie, 26) + t(240, 330, `Le trajet en tout${NB}?`, C.rose, 30)
);

const balade = svg(
  "Une balade de 2 km",
  p("M40 260 Q130 140 220 230 T440 180", C.jaune, 6) + t(40, 300, "départ", C.craie, 22) + t(440, 230, "arrivée", C.craie, 22) +
    t(240, 110, "2 km", C.bleu, 50) + t(240, 360, `en mètres${NB}?`, C.rose, 30)
);

// Règle : 1 cm = 40 px, graduation 0 à x = 40. Le crayon va de 2 cm (x = 120) à 9 cm (x = 400).
const regle = svg(
  "Un crayon posé sur une règle, de la graduation 2 à la graduation 9",
  r(30, 200, 420, 70, C.jaune, 0.2, 3, 4) +
    Array.from({ length: 11 }, (_, k) => l(40 + k * 40, 200, 40 + k * 40, 225, C.craie, 2) + t(40 + k * 40, 255, k, C.craie, 20)).join("") +
    p("M120 150 L370 150 L400 170 L370 190 L120 190 Z", C.bleu, 3, 0.3) + l(120, 190, 120, 200, C.rose, 3) + l(400, 170, 400, 200, C.rose, 3) +
    t(240, 110, `Lucas lit${NB}: 9 cm.`, C.craie, 28) + t(240, 340, `A-t-il raison${NB}?`, C.rose, 30)
);

const guirlande = svg(
  "Une guirlande de 6 fanions de 10 cm, avec 5 cm entre deux fanions",
  l(20, 120, 460, 120, C.pale, 3) +
    Array.from({ length: 6 }, (_, k) => p(`M${30 + k * 72} 120 L${86 + k * 72} 120 L${58 + k * 72} 200 Z`, [C.jaune, C.rose, C.bleu][k % 3], 3, 0.45)).join("") +
    t(58, 240, "10 cm", C.craie, 20) + t(94, 100, "5 cm", C.rose, 18) +
    t(240, 320, "6 fanions, 5 cm entre deux", C.craie, 26) + t(240, 380, `De l'un au dernier${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "longueur",
  titre: "Énigmes sur les longueurs",
  description: "La hauteur de la porte, le tapis en centimètres, le chemin de l'école, la balade de 2 km, le piège de la règle qui ne part pas de 0, le défi de la guirlande de fanions.",
  problemes: [
    {
      tag: "Énigme 1 · À la maison",
      titre: "La hauteur de la porte",
      question: `La porte de la chambre mesure environ <b>2…</b><br><br>Quelle est la <b>bonne unité</b> ?`,
      reponse: `2 cm : plus petit qu'un doigt. 2 km : une longue promenade !<br>La porte mesure environ <span class="big">2 m</span>.`,
      consigne: "Quelle est la hauteur d'une porte ?",
      verification: { type: "qcm", choix: ["2 cm", "2 km", "2 m"], bonne: 2 },
      dessin: porte,
    },
    {
      tag: "Énigme 2 · Le salon",
      titre: "Le tapis",
      question: `Le tapis mesure <b>1 m 20 cm</b>.<br><br>Combien de <b>centimètres</b> ?`,
      reponse: `1 m = 100 cm.<br>100 cm + 20 cm = <span class="big">120 cm</span>.`,
      consigne: "1 m 20 cm, c'est combien de centimètres ?",
      verification: { type: "courte", attendus: ["120"], unite: "cm" },
      dessin: tapis,
    },
    {
      tag: "Énigme 3 · Le chemin de l'école",
      titre: "Le trajet du matin",
      question: `De la maison à la boulangerie : <b>350 m</b>.<br>De la boulangerie à l'école : <b>450 m</b>.<br><br>Quelle longueur en tout ?`,
      reponse: `350 + 450 = <span class="big">800 m</span>.<br>Moins d'un kilomètre !`,
      consigne: "Quelle est la longueur du trajet ?",
      verification: { type: "courte", attendus: ["800"], unite: "m" },
      dessin: chemin,
    },
    {
      tag: "Énigme 4 · La randonnée",
      titre: "La balade",
      question: `La balade mesure <b>2 km</b>.<br><br>Combien de <b>mètres</b> ?`,
      reponse: `1 km = 1 000 m.<br>2 km = <span class="big">2 000 m</span>.`,
      consigne: "2 km, c'est combien de mètres ?",
      verification: { type: "qcm", choix: ["200 m", "2 000 m", "20 m"], bonne: 1 },
      dessin: balade,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La règle de Lucas",
      sorte: "piege",
      question: `Lucas mesure son crayon.<br>Il lit <b>9 cm</b> au bout.<br><br>Quelle est la vraie longueur du crayon ?`,
      reponse: `Le piège : le crayon ne part pas de 0.<br>Il va de 2 à 9.<br>9 − 2 = <span class="big">7 cm</span>.`,
      consigne: "Quelle est la vraie longueur du crayon ?",
      verification: { type: "qcm", choix: ["7 cm", "9 cm", "11 cm"], bonne: 0 },
      dessin: regle,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La guirlande",
      sorte: "defi",
      question: `La guirlande a <b>6 fanions</b> de <b>10 cm</b>.<br>Entre deux fanions, il y a <b>5 cm</b>.<br><br>Quelle longueur du premier au dernier fanion ?`,
      reponse: `Les fanions : 6 × 10 = 60 cm.<br>Les espaces : 6 fanions, seulement <b>5</b> espaces. 5 × 5 = 25 cm.<br>60 + 25 = <span class="big">85 cm</span>.`,
      consigne: "Quelle longueur du premier au dernier fanion ?",
      verification: { type: "courte", attendus: ["85"], unite: "cm" },
      dessin: guirlande,
    },
  ],
};

export default problemes;
