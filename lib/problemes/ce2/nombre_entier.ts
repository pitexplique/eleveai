// Énigmes à projeter — CE2, notion nombres jusqu'à 10 000 (les crayons de
// l'usine, le dossard, les étagères de la bibliothèque, le saut de la puce,
// le piège du jeu vidéo, le défi des quatre cases). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, droiteGraduee, o } from "../dessins-ecole";

const crayons = svg(
  "2 cartons de 1 000 crayons, 4 boîtes de 100, 5 paquets de 10 et 3 crayons seuls",
  r(20, 90, 110, 110, C.jaune, 0.25, 4, 6) + t(75, 155, "1 000", C.craie, 26) + r(20, 215, 110, 110, C.jaune, 0.25, 4, 6) + t(75, 280, "1 000", C.craie, 26) +
    [0, 1, 2, 3].map((i) => r(150 + (i % 2) * 70, 100 + Math.floor(i / 2) * 110, 60, 90, C.bleu, 0.25, 3, 4) + t(180 + (i % 2) * 70, 155 + Math.floor(i / 2) * 110, "100", C.craie, 22)).join("") +
    [0, 1, 2, 3, 4].map((i) => r(305 + i * 22, 110, 16, 160, C.rose, 0.25, 3, 3)).join("") + t(355, 300, "5 × 10", C.craie, 22) +
    [0, 1, 2].map((i) => r(435, 110 + i * 55, 12, 42, C.craie, 0.3, 2, 2)).join("") +
    t(240, 385, `Combien de crayons${NB}?`, C.rose, 28)
);

const dossard = svg(
  "Un dossard de course avec le nombre 6 729",
  r(90, 90, 300, 210, C.craie, 0.05, 5, 12) + o(115, 115, 8, C.pale, 0, 3) + o(365, 115, 8, C.pale, 0, 3) +
    t(240, 230, "6 729", C.bleu, 96) + t(240, 375, `le chiffre des centaines${NB}?`, C.rose, 28)
);

const etageres = svg(
  "Trois étagères de livres : A 1 250, B 1 205, C 1 520",
  [["A", "1 250"], ["B", "1 205"], ["C", "1 520"]].map(([n, v], i) =>
    r(40, 70 + i * 95, 400, 70, C.jaune, 0.15, 4, 4) + t(80, 117 + i * 95, n, C.craie, 32) +
    [0, 1, 2, 3, 4, 5].map((k) => r(120 + k * 22, 80 + i * 95, 16, 50, [C.bleu, C.rose, C.pale][k % 3], 0.35, 2, 2)).join("") +
    t(370, 117 + i * 95, v, C.craie, 32)).join("") + t(240, 385, `Le plus de livres${NB}?`, C.rose, 28)
);

// Droite de 3 000 à 4 000 entre x = 50 et x = 430 : 3 600 tombe à x = 50 + 380 × 0,6 = 278.
const puce = svg(
  "Une droite graduée de 3 000 à 4 000, de 100 en 100 ; la puce est sur la 6e graduation",
  droiteGraduee(230, 50, 430, 3000, 4000, 100, 100000) + t(50, 275, "3 000", C.craie, 22) + t(430, 275, "4 000", C.craie, 22) +
    o(278, 230, 8, C.rose, 1, 2) + t(278, 205, "🦗", C.craie, 54) +
    t(240, 120, `La puce est sur quel nombre${NB}?`, C.rose, 28) + t(240, 340, "une graduation = 100", C.pale, 24)
);

const jeu = svg(
  "Deux scores de jeu vidéo : Lucas 999 points, Inès 1 000 points",
  r(40, 110, 180, 150, C.bleu, 0.15, 4, 10) + t(130, 160, "Lucas", C.craie, 28) + t(130, 225, "999", C.bleu, 50) +
    r(260, 110, 180, 150, C.rose, 0.15, 4, 10) + t(350, 160, "Inès", C.craie, 28) + t(350, 225, "1 000", C.rose, 50) +
    t(240, 340, `« 9 est plus grand que 1${NB}! »`, C.pale, 26) + t(240, 390, `Qui a le plus${NB}?`, C.rose, 28)
);

const cases = svg(
  "Quatre cases vides pour un nombre de 4 chiffres tous différents",
  [0, 1, 2, 3].map((i) => r(60 + i * 95, 130, 80, 100, C.craie, 0.05, 4, 8) + t(100 + i * 95, 200, "?", C.jaune, 50)).join("") +
    t(240, 300, "4 chiffres, tous différents", C.craie, 28) + t(240, 360, `le plus petit${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "nombre_entier",
  titre: "Énigmes sur les nombres jusqu'à 10 000",
  description: "Les crayons de l'usine en milliers et centaines, le dossard, les étagères de la bibliothèque, la puce sur la droite graduée, le piège du score 999, le défi des quatre cases.",
  problemes: [
    {
      tag: "Énigme 1 · À l'usine",
      titre: "Les crayons",
      question: `Regarde le dessin.<br>2 cartons de <b>1 000</b>, 4 boîtes de <b>100</b>, 5 paquets de <b>10</b>, et 3 crayons seuls.<br><br>Combien de crayons ?`,
      reponse: `2 milliers, 4 centaines, 5 dizaines, 3 unités.<br>2 000 + 400 + 50 + 3 = <span class="big">2 453</span>.`,
      consigne: "Combien de crayons en tout ?",
      verification: { type: "courte", attendus: ["2453"], unite: "crayons" },
      dessin: crayons,
    },
    {
      tag: "Énigme 2 · La course",
      titre: "Le dossard",
      question: `Le dossard de Jade porte le nombre <b>6 729</b>.<br><br>Quel est le chiffre des <b>centaines</b> ?`,
      reponse: `6 milliers, 7 centaines, 2 dizaines, 9 unités.<br>Le chiffre des centaines : <span class="big">7</span>.`,
      consigne: "Quel est le chiffre des centaines de 6 729 ?",
      verification: { type: "qcm", choix: ["6", "2", "7"], bonne: 2 },
      dessin: dossard,
    },
    {
      tag: "Énigme 3 · La bibliothèque",
      titre: "Les trois étagères",
      question: `Trois étagères de livres.<br>A : <b>1 250</b>. B : <b>1 205</b>. C : <b>1 520</b>.<br><br>Laquelle a le <b>plus</b> de livres ?`,
      reponse: `Même chiffre des milliers : 1.<br>On regarde les centaines : 2, 2 et 5.<br>5 est le plus grand : <span class="big">C, 1 520 livres</span>.`,
      consigne: "Quelle étagère a le plus de livres ?",
      verification: { type: "qcm", choix: ["1 520", "1 250", "1 205"], bonne: 0 },
      dessin: etageres,
    },
    {
      tag: "Énigme 4 · Le saut de la puce",
      titre: "Sur la droite graduée",
      question: `La droite va de <b>3 000</b> à <b>4 000</b>.<br>Une graduation, c'est <b>100</b>.<br><br>Sur quel nombre est la puce ?`,
      reponse: `On compte de 100 en 100 : 3 100, 3 200… 3 600.<br>La puce est sur <span class="big">3 600</span>.`,
      consigne: "Sur quel nombre est la puce ?",
      verification: { type: "qcm", choix: ["3 060", "3 600", "3 006"], bonne: 1 },
      dessin: puce,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le score du jeu vidéo",
      sorte: "piege",
      question: `Lucas a <b>999</b> points. Inès a <b>1 000</b> points.<br>Lucas dit : « J'ai gagné, 9 est plus grand que 1 ! »<br><br>Qui a le plus de points ?`,
      reponse: `Le piège : on ne compare pas le premier chiffre.<br>999 a 3 chiffres, 1 000 en a 4.<br>1 000 est plus grand : <span class="big">Inès</span>.`,
      consigne: "Qui a le plus de points ?",
      verification: { type: "qcm", choix: ["Lucas", "Ils sont à égalité", "Inès"], bonne: 2 },
      dessin: jeu,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les quatre cases",
      sorte: "defi",
      question: `Écris un nombre de <b>4 chiffres</b>.<br>Ses chiffres sont <b>tous différents</b>.<br><br>Quel est le <b>plus petit</b> possible ?`,
      reponse: `Le premier chiffre ne peut pas être 0 : on met 1.<br>Puis les plus petits restants : 0, 2, 3.<br><span class="big">1 023</span>.`,
      consigne: "Quel est le plus petit nombre de 4 chiffres tous différents ?",
      verification: { type: "courte", attendus: ["1023"] },
      dessin: cases,
    },
  ],
};

export default problemes;
