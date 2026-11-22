// Énigmes à projeter — seconde, notion racine_carree_2de (le potager carré,
// deux baguettes bout à bout, la pomme qui tombe, l'horizon du phare, piège
// √(9 + 16), défi du rectangle (√3 + 1)(√3 − 1)). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o, grille } from "../dessins-ecole";

const potager = svg(
  "Un potager carré de 50 mètres carrés",
  r(110, 70, 260, 260, C.jaune, 0.15, 4) + grille(110, 70, 5, 5, 52, C.pale, 1) + t(240, 210, "50 m²", C.craie, 44) +
    t(240, 365, "côté = ?", C.rose, 30).replace(" ?", `${NB}?`)
);

const baguettes = svg(
  "Deux baguettes bout à bout : racine de 12 centimètres et racine de 27 centimètres",
  l(50, 200, 196, 200, C.bleu, 12) + l(200, 200, 430, 200, C.jaune, 12) +
    t(123, 170, "√12 cm", C.bleu, 28) + t(315, 170, "√27 cm", C.jaune, 28) + t(240, 320, `longueur totale${NB}?`, C.rose, 28)
);

const pomme = svg(
  "Une pomme lâchée d'une hauteur de 45 mètres",
  r(60, 60, 90, 320, C.pale, 0.15, 3) + o(230, 70, 16, C.rose, 0.7, 3) + l(230, 90, 230, 360, C.craie, 3, "8 8") + l(40, 380, 440, 380, C.craie, 4) +
    t(300, 230, "45 m", C.craie, 30, "start") + t(330, 120, "t = √(h ÷ 5)", C.bleu, 24) + t(330, 330, `durée${NB}?`, C.rose, 26)
);

const phare = svg(
  "Un phare de 49 mètres au bord de la mer, et l'horizon au loin",
  p("M120 340 L140 120 L180 120 L200 340 Z", C.craie, 4, 0.1) + r(130, 95, 60, 25, C.jaune, 0.6, 3) + p("M190 108 L440 60 M190 108 L440 150", C.jaune, 2) +
    p("M30 340 q40 -12 80 0 t80 0 t80 0 t80 0 t80 0 t80 0", C.bleu, 3) + l(225, 120, 225, 340, C.pale, 2, "6 6") + t(260, 240, "49 m", C.craie, 26, "start") +
    t(320, 290, "d ≈ 3,57 √h", C.bleu, 24) + t(240, 395, `horizon à combien de km${NB}?`, C.rose, 24)
);

const piege = svg(
  "Un triangle rectangle de côtés 3 et 4 : la racine de 9 plus 16",
  p("M100 330 L340 330 L100 150 Z", C.craie, 4, 0.06) + p("M100 310 L120 310 L120 330", C.craie, 2) +
    t(220, 365, "√16", C.bleu, 24) + t(70, 245, "√9", C.bleu, 24) + t(232, 225, `√(9 + 16)${NB}?`, C.rose, 28, "start") + t(240, 80, "√(9 + 16) = √9 + √16 ?".replace(" ?", `${NB}?`), C.craie, 28)
);

const rectangle = svg(
  "Un rectangle de côtés racine de 3 plus 1 et racine de 3 moins 1",
  r(150, 160, 280, 76, C.bleu, 0.15, 4) + t(290, 145, "√3 + 1 cm", C.craie, 28) + t(140, 207, "√3 − 1", C.craie, 24, "end") +
    t(290, 210, `aire${NB}?`, C.rose, 32) + t(240, 340, "pas à l'échelle", C.pale, 18)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "racine_carree_2de",
  titre: "Énigmes des racines carrées",
  description: "Le potager carré, les baguettes bout à bout, la pomme qui tombe, l'horizon du phare, le piège √(9 + 16), le défi du rectangle (√3 + 1)(√3 − 1) : simplifier, ajouter et multiplier des racines carrées.",
  problemes: [
    {
      tag: "Énigme 1 · Le potager",
      titre: "Un carré de 50 m²",
      question: `Un potager carré a une aire de <b>50 m²</b>.<br><br><b>Quelle est la valeur exacte</b> de son côté, sous la forme la plus simple ?`,
      reponse: `Côté = √50 = √(25 × 2) = √25 × √2 = <span class="big">5√2 m</span>.<br>Environ 7,07 m.`,
      consigne: "Quelle est la valeur exacte du côté d'un carré de 50 m² ?",
      verification: { type: "qcm", choix: ["5√2 m", "25 m", "10√5 m"], bonne: 0 },
      dessin: potager,
    },
    {
      tag: "Énigme 2 · Les baguettes",
      titre: "Bout à bout",
      question: `Deux baguettes mesurent <b>√12 cm</b> et <b>√27 cm</b>. On les met bout à bout.<br><br><b>Quelle est la longueur totale</b>, sous la forme a√3 ?`,
      reponse: `√12 = √(4 × 3) = 2√3 et √27 = √(9 × 3) = 3√3.<br>2√3 + 3√3 = <span class="big">5√3 cm</span>.<br>Mais √12 + √27 n'est pas √39 !`,
      consigne: "Que vaut √12 + √27 ?",
      verification: { type: "qcm", choix: ["√39 cm", "5√3 cm", "6√3 cm"], bonne: 1 },
      dessin: baguettes,
    },
    {
      tag: "Énigme 3 · La pomme",
      titre: "45 mètres de chute",
      question: `Un objet lâché d'une hauteur h (en m) met environ <b>t = √(h ÷ 5)</b> secondes à toucher le sol.<br><br><b>Combien de secondes</b> pour une chute de <b>45 m</b> ?`,
      reponse: `h ÷ 5 = 45 ÷ 5 = 9.<br>t = √9 = <span class="big">3 secondes</span>.`,
      consigne: "Combien de secondes pour tomber de 45 m ?",
      verification: { type: "courte", attendus: ["3"], unite: "s" },
      dessin: pomme,
    },
    {
      tag: "Énigme 4 · L'horizon",
      titre: "Du haut du phare",
      question: `Du haut d'un point situé à h mètres, on voit l'horizon à environ <b>d ≈ 3,57 √h</b> km.<br>Le gardien est en haut d'un phare de <b>49 m</b>.<br><br><b>À combien de km</b> environ voit-il l'horizon ?`,
      reponse: `√49 = 7, donc d ≈ 3,57 × 7 = 24,99.<br>Il voit à environ <span class="big">25 km</span>.`,
      consigne: "À combien de km voit-on l'horizon depuis 49 m ?",
      verification: { type: "courte", attendus: ["25", "24,99"], unite: "km" },
      dessin: phare,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La racine d'une somme",
      sorte: "piege",
      question: `<b>Que vaut</b> √(9 + 16) ?<br>A. 7 B. 25 C. 5`,
      reponse: `On calcule d'abord sous la racine : 9 + 16 = 25, et √25 = <span class="big">5</span>.<br>√9 + √16 = 3 + 4 = 7 : ce n'est pas pareil !<br>La racine d'une somme n'est pas la somme des racines (le triangle 3-4-5 le montre).`,
      consigne: "Que vaut √(9 + 16) ?",
      verification: { type: "qcm", choix: ["7", "25", "5"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Un rectangle étonnant",
      sorte: "defi",
      question: `Un rectangle mesure <b>(√3 + 1) cm</b> sur <b>(√3 − 1) cm</b>.<br><br><b>Quelle est son aire</b> ? Elle tombe juste !`,
      reponse: `On reconnaît (a + b)(a − b) = a² − b².<br>(√3 + 1)(√3 − 1) = (√3)² − 1² = 3 − 1 = <span class="big">2 cm²</span>.`,
      consigne: "Quelle est l'aire en cm² du rectangle (√3 + 1) sur (√3 − 1) ?",
      verification: { type: "courte", attendus: ["2"], unite: "cm²" },
      dessin: rectangle,
    },
  ],
};

export default problemes;
