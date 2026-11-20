// Énigmes à projeter — CM2, notion algorithmique (la boucle qui trace un carré,
// la boucle « ajouter 5 », la tortue de Saint-Leu qui rejoint la plage, le
// programme « pair ou impair », le piège de l'ordre des instructions, le défi
// du triangle et de ses 120°). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, grille, fleche } from "../dessins-ecole";

/** Un bloc d'instruction, façon Scratch. */
const bloc = (x: number, y: number, s: string, c: string = C.bleu, larg = 220) => r(x, y, larg, 44, c, 0.2, 3, 8) + t(x + 14, y + 30, s, C.craie, 22, "start");

const carre = svg(
  "Un programme : répéter 4 fois, avancer de 100 pas, tourner de 90 degrés",
  bloc(30, 80, "répéter 4 fois", C.jaune, 230) + bloc(60, 130, "avancer de 100", C.bleu, 200) + bloc(60, 180, "tourner de 90°", C.bleu, 200) +
    r(30, 124, 22, 106, C.jaune, 0.2, 3, 4) + t(380, 200, "🐢", C.craie, 60) + t(240, 330, `quelle figure${NB}?`, C.rose, 28)
);

const boucle = svg(
  "Un programme : nombre = 10, puis répéter 3 fois : ajouter 5",
  bloc(110, 70, "nombre = 10", C.rose, 260) + bloc(110, 130, "répéter 3 fois", C.jaune, 260) + bloc(140, 180, "ajouter 5", C.bleu, 230) +
    r(110, 174, 22, 56, C.jaune, 0.2, 3, 4) + bloc(110, 250, "afficher nombre", C.rose, 260) + t(240, 360, `affiché${NB}?`, C.rose, 28)
);

// La tortue : quadrillage 5 × 4, cases de 60 px.
const tortue = svg(
  "Un quadrillage : une tortue en bas à gauche doit rejoindre la plage, 3 cases à droite et 2 cases en haut",
  grille(90, 60, 5, 4, 60, C.pale, 1.5) + r(270, 120, 60, 60, C.jaune, 0.35, 0) + t(300, 162, "🏖️", C.craie, 34) + t(120, 282, "🐢", C.craie, 36) +
    t(240, 340, "1 flèche = 1 case", C.pale, 20) + t(240, 390, `quel programme${NB}?`, C.rose, 26)
);

const pairImpair = svg(
  "Un programme : si le nombre est pair, le diviser par 2, sinon ajouter 1 ; on part de 7, trois étapes",
  r(40, 60, 400, 120, C.jaune, 0.12, 3, 10) + t(60, 100, "si le nombre est pair :", C.craie, 22, "start") + t(100, 130, "diviser par 2", C.bleu, 22, "start") +
    t(60, 160, "sinon : ajouter 1", C.craie, 22, "start").replace(" :", `${NB}:`) + t(80, 250, "7", C.craie, 40) +
    fleche(110, 240, 170, 240) + t(200, 252, "?", C.rose, 34) + fleche(230, 240, 290, 240) + t(320, 252, "?", C.rose, 34) + fleche(350, 240, 400, 240) + t(430, 252, "?", C.rose, 34) +
    t(240, 340, `après 3 étapes${NB}?`, C.rose, 26)
);

const ordre = svg(
  "Deux programmes avec les mêmes instructions dans un ordre différent",
  t(120, 70, "programme A", C.bleu, 22) + bloc(30, 90, "avancer de 2", C.bleu, 180) + bloc(30, 140, "tourner à droite", C.bleu, 180) +
    t(360, 70, "programme B", C.jaune, 22) + bloc(270, 90, "tourner à droite", C.jaune, 180) + bloc(270, 140, "avancer de 2", C.jaune, 180) +
    t(240, 270, "le robot regarde vers le haut ↑", C.pale, 20) + t(240, 330, `même case d'arrivée${NB}?`, C.rose, 26)
);

const triangle = svg(
  "Un programme pour un triangle : répéter 3 fois, avancer de 100, tourner de ? degrés",
  bloc(30, 70, "répéter 3 fois", C.jaune, 230) + bloc(60, 120, "avancer de 100", C.bleu, 200) + bloc(60, 170, "tourner de ? °", C.rose, 200) + r(30, 114, 22, 106, C.jaune, 0.2, 3, 4) +
    `<path d="M300 300 L440 300 L370 179 Z" fill="${C.jaune}" fill-opacity=".2" stroke="${C.jaune}" stroke-width="4" stroke-linejoin="round"/>` +
    l(440, 300, 470, 300, C.pale, 2, "5 5") + t(240, 380, "triangle équilatéral", C.craie, 24)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "algorithmique",
  titre: "Énigmes d'algorithmique",
  description: "La boucle qui trace un carré, la boucle « ajouter 5 », la tortue de Saint-Leu, le programme pair ou impair, le piège de l'ordre des instructions, le défi du triangle.",
  problemes: [
    {
      tag: "Énigme 1 · La tortue qui dessine",
      titre: "La boucle mystère",
      question: `La tortue suit ce programme :<br><b>répéter 4 fois</b> : avancer de 100, tourner de 90°.<br><br><b>Quelle figure</b> dessine-t-elle ?`,
      reponse: `4 côtés de même longueur, 4 angles droits.<br>Elle dessine <span class="big">un carré</span>.`,
      consigne: "Quelle figure dessine la tortue ?",
      verification: { type: "qcm", choix: ["un triangle", "un carré", "un cercle"], bonne: 1 },
      dessin: carre,
    },
    {
      tag: "Énigme 2 · Le programme de calcul",
      titre: "La boucle « ajouter 5 »",
      question: `Au début, nombre = <b>10</b>.<br>Puis le programme <b>répète 3 fois</b> : ajouter 5.<br><br><b>Quel nombre</b> est affiché à la fin ?`,
      reponse: `10 → 15 → 20 → 25.<br>Le programme affiche <span class="big">25</span>.`,
      consigne: "Quel nombre est affiché ?",
      verification: { type: "courte", attendus: ["25"] },
      dessin: boucle,
    },
    {
      tag: "Énigme 3 · À Saint-Leu",
      titre: "La tortue marine",
      question: `Une petite tortue marine veut rejoindre la plage.<br>Chaque flèche la fait avancer d'une case.<br><br><b>Quel programme</b> l'amène sur la plage ?`,
      reponse: `La plage est 3 cases à droite et 2 cases plus haut.<br>Le bon programme : <span class="big">→ → → ↑ ↑</span>.`,
      consigne: "Quel programme amène la tortue sur la plage ?",
      verification: { type: "qcm", choix: ["→ → ↑ ↑", "↑ ↑ ↑ → →", "→ → → ↑ ↑"], bonne: 2 },
      dessin: tortue,
    },
    {
      tag: "Énigme 4 · Pair ou impair",
      titre: "Trois étapes",
      question: `Le programme : si le nombre est <b>pair</b>, on le divise par 2. Sinon, on <b>ajoute 1</b>.<br>On part de <b>7</b> et on fait <b>3 étapes</b>.<br><br><b>Quel nombre</b> obtient-on ?`,
      reponse: `7 est impair : 7 + 1 = 8.<br>8 est pair : 8 ÷ 2 = 4.<br>4 est pair : 4 ÷ 2 = <span class="big">2</span>.`,
      consigne: "Quel nombre obtient-on après 3 étapes ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: pairImpair,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'ordre des instructions",
      sorte: "piege",
      question: `Les programmes A et B ont les <b>mêmes instructions</b>, dans un ordre différent.<br>Le robot part de la même case, il regarde vers le haut.<br>Zoé dit : « Il arrive au même endroit. »<br><br><b>A-t-elle raison</b> ?`,
      reponse: `A : il monte de 2 cases, puis tourne. B : il tourne, puis va 2 cases à droite.<br>Il n'arrive pas au même endroit.<br><span class="big">Non, l'ordre compte</span>.`,
      consigne: "Le robot arrive-t-il au même endroit avec A et B ?",
      verification: { type: "qcm", choix: ["Non, l'ordre compte", "Oui, ce sont les mêmes instructions", "On ne peut pas savoir"], bonne: 0 },
      dessin: ordre,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le triangle de la tortue",
      sorte: "defi",
      question: `La tortue veut tracer un <b>triangle équilatéral</b> :<br>répéter 3 fois : avancer de 100, tourner de <b>… °</b>.<br>En 3 virages, elle fait <b>un tour complet</b> : 360°.<br><br><b>De combien de degrés</b> tourne-t-elle à chaque fois ?`,
      reponse: `3 virages égaux font un tour : 360 ÷ 3 = <span class="big">120°</span>.<br>(Et pas 60° : c'est l'angle <b>dans</b> le triangle, pas le virage.)`,
      consigne: "De combien de degrés tourne la tortue à chaque virage ?",
      verification: { type: "courte", attendus: ["120"], unite: "°" },
      dessin: triangle,
    },
  ],
};

export default problemes;
