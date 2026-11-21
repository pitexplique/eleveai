// Énigmes à projeter — CM1, notion algorithmique (l'ascenseur qui suit les
// instructions, le motif qui se répète, le code du robot sur quadrillage, la
// grenouille et la répétition, le piège de l'escargot qui recule, le défi du
// programme à l'envers). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, p, o, grille, droiteGraduee, fleche } from "../dessins-ecole";

// L'immeuble : étages 0 → 7, 38 px chacun, le rez-de-chaussée en bas (y 330 → 368).
const etage = (k: number) => 368 - (k + 1) * 38;
const ascenseur = svg(
  "Un immeuble de 8 niveaux, du rez-de-chaussée (0) au 7e étage ; l'ascenseur est au 0 ; programme : monte 4, descends 1, monte 3",
  [0, 1, 2, 3, 4, 5, 6, 7].map((k) => r(70, etage(k), 130, 38, C.pale, 0, 2) + t(60, etage(k) + 27, k, C.craie, 20, "end")).join("") +
    r(115, etage(0) + 5, 40, 28, C.jaune, 0.6, 3, 4) +
    r(240, 90, 210, 190, C.bleu, 0.12, 3, 10) +
    t(345, 130, "1. monte 4", C.craie, 24) + t(345, 185, "2. descends 1", C.craie, 24) + t(345, 240, "3. monte 3", C.craie, 24) +
    t(345, 330, `Quel étage${NB}?`, C.rose, 26)
);

// Le motif : carré jaune, rond bleu, rond bleu, et ça recommence.
const element = (k: number, x: number, y: number) =>
  k % 3 === 0 ? r(x - 20, y - 20, 40, 40, C.jaune, 0.5, 3) : o(x, y, 20, C.bleu, 0.45, 3);
const motif = svg(
  "Un motif qui se répète : carré jaune, rond bleu, rond bleu ; on montre les 7 premiers",
  [0, 1, 2, 3, 4, 5, 6].map((k) => element(k, 50 + k * 55, 170) + t(50 + k * 55, 225, k + 1, C.pale, 18)).join("") +
    t(425, 180, "…", C.craie, 32) +
    r(190, 270, 100, 70, C.rose, 0.1, 3, 10) + t(240, 318, "?", C.rose, 40) + t(240, 365, "le 10ᵉ", C.rose, 24)
);

// Le quadrillage du robot : 5 colonnes, 3 lignes, la ligne 0 en bas.
const X0 = 65, Y0 = 50, PAS = 70;
const cx = (c: number) => X0 + (c + 0.5) * PAS, cy = (lg: number) => Y0 + (3 - lg - 0.5) * PAS;
const robot = svg(
  "Un quadrillage de 5 colonnes et 3 lignes : le robot en bas à gauche, le drapeau 3 cases à droite et 1 case plus haut",
  grille(X0, Y0, 5, 3, PAS, C.pale, 2) + t(cx(0), cy(0) + 13, "🤖", C.craie, 38) + t(cx(3), cy(1) + 13, "🚩", C.craie, 38) +
    t(240, 320, "A : ↑ → → →", C.craie, 24) + t(240, 355, "B : → → ↑ ↑", C.craie, 24) + t(240, 390, "C : → → → ↓", C.craie, 24)
);

const grenouille = svg(
  "Une droite graduée de 0 à 20 ; la grenouille part de 0 ; programme : répète 5 fois, saute de 3",
  r(110, 60, 260, 90, C.bleu, 0.12, 3, 10) + t(240, 98, "répète 5 fois :", C.craie, 24) + t(240, 132, "saute de 3", C.craie, 24) +
    droiteGraduee(280, 40, 440, 0, 20, 1, 5) + t(40, 250, "🐸", C.craie, 34) +
    p("M40 262 Q70 205 100 262", C.rose, 3) + t(240, 380, `Où arrive-t-elle${NB}?`, C.rose, 26)
);

const escargot = svg(
  "Une droite graduée de 0 à 8 ; l'escargot part de 0 ; programme : répète 3 fois, avance de 2, recule de 1",
  r(100, 50, 280, 120, C.bleu, 0.12, 3, 10) + t(240, 88, "répète 3 fois :", C.craie, 24) + t(240, 122, "avance de 2", C.craie, 24) + t(240, 154, "recule de 1", C.craie, 24) +
    droiteGraduee(290, 50, 430, 0, 8, 1, 1) + t(50, 262, "🐌", C.craie, 32) + t(240, 395, `Où s'arrête-t-il${NB}?`, C.rose, 26)
);

const boiteP = (x: number, s: string, c: string) => r(x - 42, 150, 84, 70, c, 0.15, 3, 10) + t(x, 196, s, C.craie, 28);
const envers = svg(
  "Un programme : un nombre caché, fois 3, plus 2, on trouve 20",
  boiteP(60, "?", C.rose) + fleche(105, 185, 140, 185, C.craie, 3) + boiteP(185, "× 3", C.bleu) +
    fleche(230, 185, 265, 185, C.craie, 3) + boiteP(310, "+ 2", C.bleu) + fleche(355, 185, 385, 185, C.craie, 3) +
    boiteP(428, "20", C.jaune) + t(240, 330, `Le nombre de départ${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "algorithmique",
  titre: "Énigmes d'algorithmique",
  description: "L'ascenseur qui suit les instructions, le motif qui se répète, le code du robot sur quadrillage, la grenouille et la répétition, le piège de l'escargot qui recule, le défi du programme à l'envers.",
  problemes: [
    {
      tag: "Énigme 1 · L'ascenseur",
      titre: "Suivre les instructions",
      question: `L'ascenseur part du <b>rez-de-chaussée</b> (0).<br>Il suit les 3 instructions, dans l'ordre.<br><br>À quel étage arrive-t-il ?`,
      reponse: `0 + 4 = 4. Puis 4 − 1 = 3.<br>Puis 3 + 3 = 6.<br>Il arrive au <span class="big">6ᵉ étage</span>.`,
      consigne: "À quel étage arrive l'ascenseur ?",
      verification: { type: "courte", attendus: ["6", "6e", "6ème"] },
      dessin: ascenseur,
    },
    {
      tag: "Énigme 2 · Le motif",
      titre: "Ce qui se répète",
      question: `Le motif se répète : <b>carré, rond, rond</b>.<br><br>Quelle forme sera à la <b>10ᵉ place</b> ?`,
      reponse: `Les carrés sont aux places 1, 4, 7, puis 10.<br>À la 10ᵉ place : <span class="big">le carré jaune</span>.`,
      consigne: "Quelle forme sera à la 10e place ?",
      verification: { type: "qcm", choix: ["le rond bleu", "le carré jaune", "on ne peut pas savoir"], bonne: 1 },
      dessin: motif,
    },
    {
      tag: "Énigme 3 · Le robot",
      titre: "Le bon code",
      question: `Chaque flèche fait avancer le robot d'<b>une case</b>.<br><br>Quel code l'amène sur le <b>drapeau</b> ?`,
      reponse: `A : 1 en haut, puis 3 à droite : le drapeau.<br>B finit trop haut. C sort du quadrillage.<br>C'est <span class="big">le code A</span>.`,
      consigne: "Quel code amène le robot sur le drapeau ?",
      verification: { type: "qcm", choix: ["↑ → → →", "→ → ↑ ↑", "→ → → ↓"], bonne: 0 },
      dessin: robot,
    },
    {
      tag: "Énigme 4 · La grenouille",
      titre: "Répéter",
      question: `La grenouille part de <b>0</b>.<br>Elle suit le programme.<br><br>Sur quel nombre arrive-t-elle ?`,
      reponse: `5 sauts de 3 : 3, 6, 9, 12, 15.<br>5 × 3 = <span class="big">15</span>.`,
      consigne: "Sur quel nombre arrive la grenouille ?",
      verification: { type: "courte", attendus: ["15"] },
      dessin: grenouille,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'escargot qui recule",
      sorte: "piege",
      question: `L'escargot part de <b>0</b>.<br>Il suit le programme, puis il s'arrête.<br><br>Sur quel nombre est-il ?`,
      reponse: `Le piège : oublier qu'il recule.<br>Chaque tour : + 2 − 1, donc 1 de plus.<br>1, puis 2, puis 3 : <span class="big">sur le 3</span>.`,
      consigne: "Sur quel nombre l'escargot s'arrête-t-il ?",
      verification: { type: "qcm", choix: ["sur le 3", "sur le 6", "sur le 9"], bonne: 0 },
      dessin: escargot,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le programme à l'envers",
      sorte: "defi",
      question: `Noé pense à un nombre.<br>Il le multiplie par <b>3</b>, puis il ajoute <b>2</b>.<br>Il trouve <b>20</b>.<br><br>À quel nombre a-t-il pensé ?`,
      reponse: `On remonte : 20 − 2 = 18.<br>Puis 18 ÷ 3 = 6.<br>Vérification : 6 × 3 + 2 = 20. C'est <span class="big">6</span>.`,
      consigne: "À quel nombre Noé a-t-il pensé ?",
      verification: { type: "courte", attendus: ["6"] },
      dessin: envers,
    },
  ],
};

export default problemes;
