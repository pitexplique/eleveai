// Énigmes à projeter — terminale spé maths, notion continuite_tvi
// (le parking de l'aéroport, le Piton des Neiges (974), le torréfacteur, la dalle
// de béton, piège du compte de Jade, défi de la montagne russe). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, o, fleche } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const parking = (() => {
  const R = repereXY(0, 3, 0, 8, { gx: 80, gy: 60, gl: 340, gh: 260, px: 1, py: 1, ex: 1, ey: 1 });
  let s = R.fond;
  [[0, 3], [1, 5], [2, 7]].forEach(([a, y]) => {
    s += l(R.X(a), R.Y(y), R.X(a + 1), R.Y(y), C.bleu, 5) + o(R.X(a), R.Y(y), 7, C.bleu, 0, 3) + R.point(a + 1, y, C.bleu, 7);
  });
  return svg("Prix du parking en euros selon la durée en heures : 3 € jusqu'à 1 h, 5 € jusqu'à 2 h, 7 € jusqu'à 3 h ; la courbe fait des marches",
    s + t(R.X(0) + 12, 40, "prix (€) selon la durée (h)", C.bleu, 22, "start") + t(240, 405, `continue sur [0${NB}; 3]${NB}?`, C.rose, 22));
})();

const piton = (() => {
  const R = repereXY(0, 3, 2400, 3100, { gx: 90, gy: 60, gl: 330, gh: 260, px: 0.5, py: 100, ex: 1, ey: 250 });
  const f = (x: number) => 2478 + (592 * x) / 3 + 30 * Math.sin(2 * Math.PI * x);
  return svg("Altitude de la randonneuse : de 2 478 m au départ à 3 070 m au sommet, en montant et descendant ; une droite en pointillés à 3 000 m",
    R.fond + l(R.X(0), R.Y(3000), R.X(3), R.Y(3000), C.rose, 3, "8 6") + R.courbe(f, 0, 3, C.bleu, 4) +
      R.point(0, 2478, C.bleu, 7) + R.point(3, 3070, C.bleu, 7) +
      t(R.X(0) + 12, 40, "altitude (m) selon l'heure", C.bleu, 22, "start") + t(R.X(1), R.Y(3000) - 10, "3 000 m", C.rose, 20) +
      t(240, 405, `combien de fois à 3 000 m${NB}?`, C.rose, 22));
})();

const torrefacteur = svg("Tableau de variations : B(x) = x³ + x − 5 croît de −3 en x = 1 à 5 en x = 2 ; on cherche combien de fois B vaut 0",
  t(240, 55, "B(x) = x³ + x − 5", C.bleu, 28) + t(240, 95, "B′(x) = 3x² + 1", C.pale, 22) +
    l(40, 130, 440, 130, C.craie, 3) + l(40, 190, 440, 190, C.craie, 3) + l(40, 320, 440, 320, C.craie, 3) +
    l(40, 130, 40, 320, C.craie, 3) + l(440, 130, 440, 320, C.craie, 3) + l(120, 130, 120, 320, C.craie, 3) +
    t(80, 170, "x", C.pale, 24) + t(160, 170, "1", C.craie, 24) + t(400, 170, "2", C.craie, 24) +
    t(80, 265, "B", C.pale, 24) + t(160, 300, "−3", C.craie, 24) + t(400, 160 + 60, "5", C.craie, 24) +
    fleche(185, 295, 375, 215, C.bleu, 3) + t(280, 240, "0", C.rose, 24) +
    t(240, 395, `combien de solutions à B(x) = 0${NB}?`, C.rose, 22));

const dalle = svg("Tableau : côté 1,3 ; 1,4 ; 1,5 ; 1,6 et aire 1,69 ; 1,96 ; 2,25 ; 2,56 ; on cherche le côté d'une aire de 2 m²",
  t(240, 60, "dalle carrée de 2 m²", C.bleu, 26) +
    tableau(30, 100, [100, 80, 80, 80, 80], 62, [["c (m)", "1,3", "1,4", "1,5", "1,6"], ["c²", "1,69", "1,96", "2,25", "2,56"]], (i, j) => (j === 0 ? C.pale : C.craie), 24) +
    t(240, 300, "c ↦ c² est continue et croissante", C.pale, 20) + t(240, 380, `le côté est entre${NB}?`, C.rose, 24));

const compte = (() => {
  const R = repereXY(0, 31, -30, 40, { gx: 80, gy: 60, gl: 340, gh: 260, px: 5, py: 10, ex: 5, ey: 10 });
  return svg("Solde du compte de Jade : −20 € du 1er au 15, puis 30 € jusqu'au 31 ; la courbe saute au jour 15 sans passer par 0",
    R.fond + l(R.X(1), R.Y(-20), R.X(15), R.Y(-20), C.bleu, 5) + R.point(15, -20, C.bleu, 7) + o(R.X(15), R.Y(30), 7, C.bleu, 0, 3) +
      l(R.X(15) + 7, R.Y(30), R.X(31), R.Y(30), C.bleu, 5) +
      t(R.X(0) + 12, 40, "solde (€) selon le jour", C.bleu, 22, "start") + t(R.X(18), R.Y(5), "virement + 50 €", C.jaune, 18, "start") +
      t(240, 405, `le solde a-t-il valu 0 €${NB}?`, C.rose, 22));
})();

const montagne = svg("Tableau : pour x = −2, −1, 0, 1, 2, la hauteur h(x) = x³ − 3x + 1 vaut −1, 3, 1, −1, 3",
  t(240, 60, "h(x) = x³ − 3x + 1", C.bleu, 28) +
    tableau(30, 100, [100, 80, 80, 80, 80], 62, [["x", "−2", "−1", "0", "1"], ["h(x)", "−1", "3", "1", "−1"]], (i, j) => (j === 0 ? C.pale : C.craie), 24) +
    t(240, 285, `et h(2) = 3`, C.craie, 24) + t(240, 325, "h en dizaines de mètres, 0 = le sol", C.pale, 20) +
    t(240, 390, `combien de fois au niveau du sol${NB}?`, C.rose, 22));

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "continuite_tvi",
  titre: "Énigmes de continuité et du théorème des valeurs intermédiaires",
  description: "Le parking de l'aéroport, le Piton des Neiges, le torréfacteur, la dalle de béton, le piège du compte de Jade, le défi de la montagne russe : fonction continue, théorème des valeurs intermédiaires, unicité de la solution, encadrement, nombre de solutions.",
  problemes: [
    {
      tag: "Énigme 1 · Le parking de l'aéroport",
      titre: "Une fonction continue ?",
      question: `Au parking de l'aéroport, on paie 3 € jusqu'à 1 h, 5 € jusqu'à 2 h, 7 € jusqu'à 3 h.<br><br><b>Le prix est-il une fonction continue</b> de la durée sur [0 ; 3] ?`,
      reponse: `La courbe se trace par morceaux : il faut lever le crayon à 1 h et à 2 h.<br><span class="big">Non</span> : le prix saute de 3 € à 5 €, puis de 5 € à 7 €.`,
      consigne: "Prix du parking en marches (3 €, 5 €, 7 €) : est-il continu sur [0 ; 3] ?",
      verification: { type: "qcm", choix: ["Non : il saute à chaque heure", "Oui : il est croissant", "Oui : il est défini partout"], bonne: 0 },
      dessin: parking,
    },
    {
      tag: "Énigme 2 · Le Piton des Neiges",
      titre: "Le théorème des valeurs intermédiaires",
      question: `À La Réunion, une randonneuse part de la Caverne Dufour (2 478 m) et arrive au sommet du Piton des Neiges (3 070 m). Le sentier monte et descend.<br><br><b>Au moins combien de fois</b> passe-t-elle à 3 000 m d'altitude ?`,
      reponse: `L'altitude est une fonction continue du temps, et 3 000 est entre 2 478 et 3 070.<br>Par le théorème des valeurs intermédiaires, elle passe <span class="big">au moins une fois</span> à 3 000 m.`,
      consigne: "Altitude continue, de 2 478 m à 3 070 m : au moins combien de fois passe-t-elle à 3 000 m ?",
      verification: { type: "courte", attendus: ["1", "une", "une fois", "au moins une fois"], unite: "fois" },
      dessin: piton,
    },
    {
      tag: "Énigme 3 · Le torréfacteur",
      titre: "L'unicité de la solution",
      question: `Un torréfacteur vend x tonnes de café, x entre 1 et 2. Son bénéfice est B(x) = x³ + x − 5, en milliers d'euros. B(1) = −3 et B(2) = 5.<br><br><b>Combien de solutions</b> a l'équation B(x) = 0 sur [1 ; 2] ?`,
      reponse: `B′(x) = 3x² + 1 > 0 : B est continue et strictement croissante sur [1 ; 2]. Et 0 est entre −3 et 5.<br>L'équation a <span class="big">une seule solution</span>.`,
      consigne: "B(x) = x³ + x − 5, B(1) = −3, B(2) = 5 : combien de solutions à B(x) = 0 sur [1 ; 2] ?",
      verification: { type: "courte", attendus: ["1", "une"] },
      dessin: torrefacteur,
    },
    {
      tag: "Énigme 4 · La dalle de béton",
      titre: "Encadrer une solution",
      question: `Un maçon coule une dalle carrée de 2 m². Son côté c vérifie c² = 2.<br><br>D'après le tableau, <b>entre quelles valeurs</b> se trouve c ?`,
      reponse: `1,4² = 1,96 &lt; 2 et 1,5² = 2,25 > 2. La fonction c ↦ c² est continue et croissante.<br>Le côté est <span class="big">entre 1,4 m et 1,5 m</span> (c = √2 ≈ 1,41).`,
      consigne: "c² = 2 : entre quelles valeurs se trouve c ?",
      verification: { type: "qcm", choix: ["Entre 1,3 et 1,4", "Entre 1,4 et 1,5", "Entre 1,5 et 1,6"], bonne: 1 },
      dessin: dalle,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le compte de Jade",
      sorte: "piege",
      question: `Le 1er du mois, le compte de Jade est à −20 €. Le 15, elle reçoit un virement de 50 €. C'est le seul mouvement. Le 31, son solde est de 30 €.<br>Tom : « Par le théorème des valeurs intermédiaires, le solde a valu 0 €. »<br><br><b>A-t-il raison</b> ?`,
      reponse: `Le théorème demande une fonction <b>continue</b>. Ici, le solde saute d'un coup de −20 € à 30 €.<br><span class="big">Non</span> : le solde n'a jamais valu 0 €.`,
      consigne: "Le solde saute de −20 € à 30 € en un virement : a-t-il valu 0 € ?",
      verification: { type: "qcm", choix: ["Oui, par le théorème", "Oui, le 15 du mois", "Non : le solde saute sans passer par 0"], bonne: 2 },
      dessin: compte,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La montagne russe",
      sorte: "defi",
      question: `Le rail d'une montagne russe a pour hauteur h(x) = x³ − 3x + 1, en dizaines de mètres, pour x entre −2 et 2. Le niveau 0 est le sol.<br><br><b>Combien de fois</b> le rail passe-t-il au niveau du sol ?`,
      reponse: `h change de signe sur [−2 ; −1], sur [0 ; 1] et sur [1 ; 2] : au moins 3 solutions, par le théorème.<br>Un polynôme de degré 3 a au plus 3 racines : <span class="big">3 fois</span>.`,
      consigne: "h(x) = x³ − 3x + 1 sur [−2 ; 2] : combien de solutions à h(x) = 0 ?",
      verification: { type: "courte", attendus: ["3", "trois"], unite: "fois" },
      dessin: montagne,
    },
  ],
};

export default problemes;
