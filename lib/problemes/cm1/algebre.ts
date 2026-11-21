// Énigmes à projeter — CM1, notion algèbre (les perles de Zoé, le jeu des trois
// carrés, le programme « × 3 puis + 5 », l'égalité vraie, le piège du signe =,
// le défi du cahier et du stylo). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

const perles = svg(
  "Une boîte de perles : ? + 18 = 45",
  r(60, 120, 110, 90, C.jaune, 0.25, 4, 10) + t(115, 180, "?", C.jaune, 50) + t(210, 180, "+", C.craie, 44) +
    r(250, 120, 90, 90, C.bleu, 0.2, 4, 10) + t(295, 180, "18", C.craie, 40) + t(380, 180, "=", C.craie, 44) + t(435, 180, "45", C.craie, 40) +
    t(240, 320, `Combien au début${NB}?`, C.rose, 28) + t(240, 80, "📿 les perles de Zoé", C.pale, 24)
);

const symboles = svg(
  "Trois carrés pareils font 24",
  [0, 1, 2].map((i) => r(40 + i * 110, 140, 70, 70, C.rose, 0.35, 4, 6) + (i < 2 ? t(130 + i * 110, 190, "+", C.craie, 40) : "")).join("") +
    t(370, 190, "= 24", C.craie, 40, "start") + t(240, 320, `Combien vaut un carré${NB}?`, C.rose, 26)
);

const programme = svg(
  "Un programme : penser à 6, multiplier par 3, ajouter 5",
  [["Pense à 6", C.craie], ["× 3", C.bleu], ["+ 5", C.bleu], ["?", C.rose]].map(([s, c], i) =>
    r(150, 40 + i * 85, 180, 60, c as string, 0.15, 3, 12) + t(240, 81 + i * 85, s as string, c as string, 30) + (i < 3 ? t(240, 118 + i * 85, "↓", C.pale, 22) : "")).join("")
);

const egalites = svg(
  "Trois égalités au tableau",
  r(40, 50, 400, 280, C.craie, 0.05, 4, 6) +
    t(240, 120, "7 × 4 = 30 + 2", C.craie, 34) + t(240, 195, "7 × 4 = 20 + 4", C.craie, 34) + t(240, 270, "7 × 4 = 30 − 2", C.craie, 34) +
    t(240, 385, `Laquelle est vraie${NB}?`, C.rose, 28)
);

const egal = svg(
  "8 + 4 = ? + 5",
  t(240, 180, "8 + 4 = ? + 5", C.craie, 54) + t(240, 270, "⚖️", C.craie, 60) + t(240, 360, "Le = veut dire : autant des deux côtés", C.pale, 20)
);

const cahier = svg(
  "1 cahier et 1 stylo : 5 € ; 2 cahiers et 1 stylo : 8 €",
  t(80, 130, "📒", C.craie, 50) + t(150, 130, "🖊️", C.craie, 46) + t(320, 130, "= 5 €", C.craie, 40) +
    t(60, 240, "📒", C.craie, 50) + t(120, 240, "📒", C.craie, 50) + t(190, 240, "🖊️", C.craie, 46) + t(320, 240, "= 8 €", C.craie, 40) +
    t(240, 350, `le stylo${NB}: ? €`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "algebre",
  titre: "Énigmes d'algèbre",
  description: "Les perles de Zoé, le jeu des trois carrés, le programme « × 3 puis + 5 », l'égalité vraie, le piège du signe =, le défi du cahier et du stylo.",
  problemes: [
    {
      tag: "Énigme 1 · Les perles de Zoé",
      titre: "Le nombre du début",
      question: `Zoé a des perles.<br>Sa tante lui en donne <b>18</b>.<br>Maintenant, elle en a <b>45</b>.<br><br>Combien de perles avait-elle <b>au début</b> ?`,
      reponse: `? + 18 = 45.<br>On fait le chemin inverse : 45 − 18 = 27.<br><span class="big">27 perles</span>.`,
      consigne: "Combien de perles Zoé avait-elle au début ?",
      verification: { type: "courte", attendus: ["27"], unite: "perles" },
      dessin: perles,
    },
    {
      tag: "Énigme 2 · Le jeu des symboles",
      titre: "Les trois carrés",
      question: `Trois carrés <b>pareils</b> font <b>24</b>.<br>■ + ■ + ■ = 24<br><br><b>Combien vaut</b> un carré ?`,
      reponse: `3 carrés = 24, donc 3 × ■ = 24.<br>24 ÷ 3 = <span class="big">8</span>.`,
      consigne: "Combien vaut un carré ?",
      verification: { type: "courte", attendus: ["8"] },
      dessin: symboles,
    },
    {
      tag: "Énigme 3 · Le programme",
      titre: "Pense à un nombre",
      question: `Pense à <b>6</b>.<br>Multiplie-le par <b>3</b>.<br>Puis ajoute <b>5</b>.<br><br>Quel nombre trouves-tu ?`,
      reponse: `On suit l'ordre : d'abord × 3, puis + 5.<br>6 × 3 = 18. 18 + 5 = <span class="big">23</span>.`,
      consigne: "Quel nombre trouves-tu ?",
      verification: { type: "qcm", choix: ["23", "33", "29"], bonne: 0 },
      dessin: programme,
    },
    {
      tag: "Énigme 4 · Au tableau",
      titre: "L'égalité vraie",
      question: `Au tableau, trois égalités.<br>Une seule est <b>vraie</b>.<br><br><b>Laquelle</b> ?`,
      reponse: `7 × 4 = 28.<br>30 + 2 = 32. 20 + 4 = 24. 30 − 2 = 28.<br>La vraie : <span class="big">7 × 4 = 30 − 2</span>.`,
      consigne: "Quelle égalité est vraie ?",
      verification: { type: "qcm", choix: ["7 × 4 = 30 + 2", "7 × 4 = 20 + 4", "7 × 4 = 30 − 2"], bonne: 2 },
      dessin: egalites,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le signe égal",
      sorte: "piege",
      question: `Complète :<br><b>8 + 4 = ? + 5</b><br><br>Quel nombre faut-il écrire à la place du <b>point d'interrogation</b> ?`,
      reponse: `Le piège : écrire 12. Mais 12 + 5 = 17, pas 12 !<br>Le = veut dire « autant des deux côtés ».<br>8 + 4 = 12, et 7 + 5 = 12. Donc <span class="big">7</span>.`,
      consigne: "Quel nombre remplace le point d'interrogation ?",
      verification: { type: "courte", attendus: ["7"] },
      dessin: egal,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le cahier et le stylo",
      sorte: "defi",
      question: `1 cahier et 1 stylo coûtent <b>5 €</b>.<br>2 cahiers et 1 stylo coûtent <b>8 €</b>.<br><br>Combien coûte <b>le stylo</b> ?`,
      reponse: `La différence, c'est 1 cahier : 8 − 5 = 3 €.<br>Le stylo : 5 − 3 = <span class="big">2 €</span>.`,
      consigne: "Combien coûte le stylo ?",
      verification: { type: "courte", attendus: ["2"], unite: "€" },
      dessin: cahier,
    },
  ],
};

export default problemes;
