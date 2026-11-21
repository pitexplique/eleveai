// Énigmes à projeter — CP, notion figures_solides : les triangles du
// voilier, la forme de l'horloge, les carrés du tableau de formes, la trace
// du cube tamponné, le piège du triangle la pointe en bas, le défi des carrés
// cachés dans la fenêtre. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p } from "../dessins-ecole";

const voilier = svg(
  "Un voilier : deux voiles en triangle, une coque, un drapeau rectangle, un soleil rond",
  p("M100 260 L380 260 L340 310 L140 310 Z", C.jaune, 4, 0.3) + l(240, 80, 240, 260, C.craie, 4) +
    p("M232 100 L232 245 L120 245 Z", C.bleu, 4, 0.3) + p("M248 120 L248 245 L340 245 Z", C.rose, 4, 0.3) +
    r(240, 60, 50, 26, C.rose, 0.4, 3, 0) + o(410, 90, 32, C.jaune, 0.3, 3) +
    t(240, 380, `Combien de triangles${NB}?`, C.rose, 30)
);

const horloge = svg(
  "Une horloge accrochée au mur",
  o(240, 170, 110, C.craie, 0.05, 5) + l(240, 170, 240, 95, C.craie, 5) + l(240, 170, 295, 170, C.craie, 5) +
    t(240, 88, "12", C.pale, 22) + t(330, 178, "3", C.pale, 22) + t(240, 268, "6", C.pale, 22) + t(150, 178, "9", C.pale, 22) +
    t(240, 360, `Quelle forme${NB}?`, C.rose, 30)
);

const formes = svg(
  "Un tableau de formes : 3 carrés, 2 ronds, 2 triangles, 1 long rectangle",
  r(40, 80, 80, 80, C.bleu, 0.3, 3) + o(200, 120, 40, C.rose, 0.3, 3) + p("M280 160 L330 80 L380 160 Z", C.jaune, 3, 0.3) +
    r(400, 90, 60, 60, C.bleu, 0.3, 3) + r(40, 200, 200, 50, C.jaune, 0.3, 3) + o(300, 225, 30, C.rose, 0.3, 3) +
    r(360, 190, 70, 70, C.bleu, 0.3, 3) + p("M60 315 L120 315 L90 265 Z", C.rose, 3, 0.3) +
    t(240, 370, `Combien de carrés${NB}?`, C.rose, 30)
);

const tampon = svg(
  "Un cube trempé dans la peinture, posé sur une feuille ; sa trace est cachée",
  p("M80 120 L180 120 L180 220 L80 220 Z", C.bleu, 4, 0.3) + p("M80 120 L120 85 L220 85 L180 120 Z", C.bleu, 4, 0.15) + p("M180 120 L220 85 L220 185 L180 220 Z", C.bleu, 4, 0.2) +
    l(200, 250, 270, 250, C.pale, 3) + p("M262 242 L272 250 L262 258", C.pale, 3) +
    r(300, 110, 150, 150, C.pale, 0.1, 3, 6) + t(375, 200, "?", C.rose, 50) +
    t(240, 360, `Quelle trace${NB}?`, C.rose, 30)
);

const piege = svg(
  "Un triangle posé la pointe en bas",
  p("M110 90 L370 90 L240 290 Z", C.jaune, 5, 0.3) + t(240, 370, `Est-ce un triangle${NB}?`, C.rose, 30)
);

const defi = svg(
  "Une fenêtre carrée coupée en 4 petits carreaux pareils",
  r(130, 60, 220, 220, C.bleu, 0.15, 5) + l(240, 60, 240, 280, C.craie, 5) + l(130, 170, 350, 170, C.craie, 5) +
    t(240, 360, `Combien de carrés en tout${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "cp",
  notionId: "figures_solides",
  titre: "Énigmes sur les figures et les solides",
  description: "Les triangles du voilier, la forme de l'horloge, les carrés du tableau de formes, la trace d'un cube tamponné, le piège du triangle la pointe en bas, le défi des carrés de la fenêtre.",
  problemes: [
    {
      tag: "Énigme 1 · Le voilier",
      titre: "Les triangles du bateau",
      question: `Combien de triangles sur le bateau ?`,
      reponse: `Les deux voiles.<br>La coque a 4 côtés.<br><span class="big">2 triangles</span>.`,
      consigne: "Combien de triangles sur le voilier ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: voilier,
    },
    {
      tag: "Énigme 2 · L'horloge",
      titre: "La forme de l'horloge",
      question: `Quelle forme a l'horloge ?`,
      reponse: `Pas de coin, pas de côté droit.<br><span class="big">Un rond</span>.`,
      consigne: "Quelle forme a l'horloge ?",
      verification: { type: "qcm", choix: ["Un carré", "Un triangle", "Un rond"], bonne: 2 },
      dessin: horloge,
    },
    {
      tag: "Énigme 3 · Les formes",
      titre: "Les carrés",
      question: `Combien de carrés ?`,
      reponse: `4 côtés pareils.<br>Le long rectangle n'en est pas un.<br><span class="big">3 carrés</span>.`,
      consigne: "Combien de carrés sur le tableau ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: formes,
    },
    {
      tag: "Énigme 4 · La peinture",
      titre: "Le cube tampon",
      question: `On pose le cube plein de peinture.<br><br>Quelle trace sur la feuille ?`,
      reponse: `Une face du cube est un carré.<br><span class="big">Un carré</span>.`,
      consigne: "Quelle trace laisse une face du cube ?",
      verification: { type: "qcm", choix: ["Un carré", "Un rond", "Un triangle"], bonne: 0 },
      dessin: tampon,
    },
    {
      tag: "Énigme 5 · Le piège",
      titre: "La pointe en bas",
      question: `La pointe est en bas.<br><br>Est-ce un triangle ?`,
      reponse: `3 côtés, 3 coins.<br>Tourné, il reste un triangle.<br><span class="big">Oui</span>.`,
      consigne: "Un triangle la pointe en bas : est-ce un triangle ?",
      verification: { type: "qcm", choix: ["Oui", "Non", "On ne sait pas"], bonne: 0 },
      dessin: piege,
      sorte: "piege",
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La fenêtre",
      question: `Combien de carrés en tout ?`,
      reponse: `4 petits carrés.<br>Et le grand tout autour !<br><span class="big">5 carrés</span>.`,
      consigne: "Combien de carrés en tout dans la fenêtre ?",
      verification: { type: "courte", attendus: ["5"] },
      dessin: defi,
      sorte: "defi",
    },
  ],
};

export default problemes;
