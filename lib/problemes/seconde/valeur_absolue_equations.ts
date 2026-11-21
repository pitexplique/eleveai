// Énigmes à projeter — seconde, notion valeur_absolue_equations (la balance
// de la pâtisserie, l'ascenseur et ses sous-sols, le chien et le chat, le juste
// prix des cahiers, piège du thermomètre à −3 °C, défi des points d'eau du
// Grand Raid (974)). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, fleche, droiteGraduee } from "../dessins-ecole";

const balance = (() => {
  const X = (v: number) => 60 + (v - 230) * 9;
  return svg("Une droite graduée de 230 à 270 grammes ; la zone de 235 à 265 est colorée autour de 250",
    t(240, 70, "250 g ± 15 g", C.craie, 32) + t(240, 120, "|m − 250| ≤ 15", C.bleu, 28) +
      r(X(235), 196, X(265) - X(235), 28, C.bleu, 0.25, 0) + droiteGraduee(210, 60, 420, 230, 270, 5, 10) +
      o(X(235), 210, 7, C.rose, 1, 0) + o(X(265), 210, 7, C.rose, 1, 0) + t(X(235), 180, "?", C.rose, 26) +
      t(240, 340, `la plus petite masse${NB}?`, C.rose, 26));
})();

const ascenseur = (() => {
  const Y = (k: number) => 350 - (k + 2) * 29;
  let s = r(170, 40, 80, 320, C.pale, 0.08, 2, 6);
  for (let k = -2; k <= 8; k++) s += l(170, Y(k), 250, Y(k), C.pale, 1.5) + t(155, Y(k) + 6, String(k).replace("-", "−"), k === 3 ? C.rose : C.craie, 18, "end");
  return svg("Les étages d'un immeuble, de moins 2 à 8 ; Léa est au 3e ; le colis est à 5 étages d'elle, en haut ou en bas",
    s + o(210, Y(3), 9, C.rose, 1, 0) + t(70, Y(3) + 6, "Léa", C.rose, 20, "start") +
      fleche(285, Y(3) - 4, 285, Y(8) + 4, C.bleu, 3) + fleche(285, Y(3) + 4, 285, Y(-2) - 4, C.bleu, 3) +
      t(298, (Y(3) + Y(8)) / 2 + 6, "5 étages", C.bleu, 18, "start") + t(298, (Y(3) + Y(-2)) / 2 + 6, "5 étages", C.bleu, 18, "start") +
      t(210, Y(8) - 6, "?", C.rose, 22) + t(210, Y(-2) - 6, "?", C.rose, 22) + t(240, 402, `quels étages${NB}?`, C.rose, 26));
})();

const chien = (() => {
  const X = (v: number) => 60 + (v + 4) * 36;
  return svg("Une droite graduée de moins 4 à 6 ; le piquet du chien est en 1, sa laisse fait 3 ; le chat est en sécurité au-delà de moins 2 et de 4",
    t(240, 70, "|x − 1| > 3", C.bleu, 32) +
      r(X(-2), 196, X(4) - X(-2), 28, C.rose, 0.15, 0) + droiteGraduee(210, 60, 420, -4, 6, 1, 1).replace(/>-(\d)</g, ">−$1<") +
      l(60, 190, X(-2), 190, C.bleu, 6) + l(X(4), 190, 420, 190, C.bleu, 6) +
      o(X(-2), 210, 7, C.craie, 0, 3) + o(X(4), 210, 7, C.craie, 0, 3) + o(X(1), 210, 7, C.jaune, 1, 0) +
      t(X(1), 160, "piquet", C.jaune, 18) + t(X(1), 300, "zone du chien", C.rose, 18) + t(90, 160, "chat", C.bleu, 18) + t(390, 160, "chat", C.bleu, 18) +
      t(240, 370, `où le chat est-il tranquille${NB}?`, C.rose, 24));
})();

const prix = svg("Deux cahiers ; Maé annonce 6 euros et se trompe de 4 euros",
  r(90, 60, 90, 120, C.bleu, 0.25, 3, 6) + r(200, 60, 90, 120, C.jaune, 0.25, 3, 6) + l(110, 90, 160, 90, C.craie, 2) + l(220, 90, 270, 90, C.craie, 2) +
    t(135, 150, "x €", C.craie, 22) + t(245, 150, "x €", C.craie, 22) +
    r(320, 80, 120, 70, C.rose, 0.12, 3, 10) + t(380, 112, "Maé", C.rose, 20) + t(380, 140, "6 €", C.rose, 24) +
    t(240, 240, "écart de 4 €", C.craie, 24) + t(240, 290, "|2x − 6| = 4", C.bleu, 30) + t(240, 360, `le prix d'un cahier${NB}?`, C.rose, 26)
);

const thermometre = (() => {
  const Y = (v: number) => 340 - (v + 10) * 18.75;
  let s = r(185, 25, 30, 330, C.craie, 0, 3, 15) + o(200, 362, 20, C.rose, 0.6, 3) + r(192, Y(-3), 16, 352 - Y(-3), C.rose, 0.6, 0);
  for (let v = -10; v <= 6; v++) s += l(215, Y(v), v % 2 ? 222 : 228, Y(v), C.craie, 2) + (v % 2 ? "" : t(236, Y(v) + 6, String(v).replace("-", "−"), C.pale, 16, "start"));
  return svg("Un thermomètre qui indique moins 3 degrés ; la température change de 5 degrés",
    s + l(150, Y(-3), 185, Y(-3), C.rose, 3) + t(145, Y(-3) + 7, "−3 °C", C.rose, 20, "end") +
      t(370, 120, "|T + 3| = 5", C.bleu, 28) + t(370, 170, "± 5 °C", C.craie, 24) + t(370, 280, "la plus haute", C.rose, 22) + t(370, 310, `température${NB}?`, C.rose, 22));
})();

const trail = (() => {
  const X = (v: number) => 50 + v * 38;
  return svg("Un sentier de 0 à 10 kilomètres ; deux points d'eau aux kilomètres 2 et 8",
    t(240, 70, "|x − 2| + |x − 8| = 6", C.bleu, 28) + droiteGraduee(230, 50, 430, 0, 10, 1, 1) +
      o(X(2), 185, 13, C.bleu, 0.5, 3) + o(X(8), 185, 13, C.bleu, 0.5, 3) + t(X(2), 150, "eau", C.bleu, 18) + t(X(8), 150, "eau", C.bleu, 18) +
      l(X(2), 300, X(8), 300, C.jaune, 3) + l(X(2), 290, X(2), 310, C.jaune, 3) + l(X(8), 290, X(8), 310, C.jaune, 3) + t(240, 330, "6 km", C.jaune, 20) +
      t(240, 395, `combien de bornes entières${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "valeur_absolue_equations",
  titre: "Énigmes des équations et inéquations avec valeur absolue",
  description: "La balance de la pâtisserie, l'ascenseur et ses sous-sols, le chien et le chat, le juste prix des cahiers, le piège du thermomètre, le défi des points d'eau du Grand Raid : la valeur absolue comme une distance, équations et inéquations.",
  problemes: [
    {
      tag: "Énigme 1 · La pâtisserie",
      titre: "À 15 grammes près",
      question: `Une recette demande <b>250 g</b> de farine. Le pâtissier accepte une erreur de <b>15 g</b> au plus : |m − 250| ≤ 15.<br><br><b>Quelle est la plus petite masse</b> acceptée ?`,
      reponse: `|m − 250| ≤ 15 : la distance entre m et 250 est au plus 15.<br>Donc 250 − 15 ≤ m ≤ 250 + 15, soit 235 ≤ m ≤ 265.<br>La plus petite : <span class="big">235 g</span>.`,
      consigne: "|m − 250| ≤ 15 : quelle est la plus petite masse acceptée, en g ?",
      verification: { type: "courte", attendus: ["235"], unite: "g" },
      dessin: balance,
    },
    {
      tag: "Énigme 2 · L'ascenseur",
      titre: "Cinq étages d'écart",
      question: `Un immeuble a des étages de <b>−2</b> (parking) à <b>8</b>. Léa est au <b>3e</b>. Son colis est à <b>5 étages</b> d'elle : |x − 3| = 5.<br><br><b>À quels étages</b> peut-il être ?`,
      reponse: `Deux cas : x − 3 = 5, donc x = 8 ; ou x − 3 = −5, donc x = −2.<br>Le colis est au <span class="big">8e ou au −2</span> (le parking).`,
      consigne: "|x − 3| = 5 : quelles sont les solutions ?",
      verification: { type: "qcm", choix: ["−2 ou 8", "8 seulement", "2 ou 8"], bonne: 0 },
      dessin: ascenseur,
    },
    {
      tag: "Énigme 3 · Le chien et le chat",
      titre: "Plus loin que la laisse",
      question: `Sur une allée droite, un chien est attaché au piquet placé en <b>1</b> par une laisse de <b>3 m</b>.<br>Le chat est tranquille quand |x − 1| > 3.<br><br><b>Où le chat est-il tranquille</b> ?`,
      reponse: `La distance entre x et 1 doit dépasser 3 : x − 1 > 3 ou x − 1 &lt; −3.<br>Donc <span class="big">x &lt; −2 ou x > 4</span> : deux morceaux, de chaque côté du chien.`,
      consigne: "|x − 1| > 3 : quelles sont les solutions ?",
      verification: { type: "qcm", choix: ["x > 4 seulement", "x < −2 ou x > 4", "−2 < x < 4"], bonne: 1 },
      dessin: chien,
    },
    {
      tag: "Énigme 4 · Le juste prix",
      titre: "Deux cahiers, un écart",
      question: `Un cahier coûte x €. Au jeu du juste prix, Maé annonce <b>6 €</b> pour <b>2 cahiers</b>. Elle se trompe de <b>4 €</b> : |2x − 6| = 4.<br><br><b>Quel peut être le prix</b> d'un cahier ?`,
      reponse: `2x − 6 = 4, donc 2x = 10 et x = 5 ;<br>ou 2x − 6 = −4, donc 2x = 2 et x = 1.<br>Un cahier coûte <span class="big">1 € ou 5 €</span>.`,
      consigne: "|2x − 6| = 4 : quelles sont les solutions ?",
      verification: { type: "qcm", choix: ["5 € seulement", "2 € ou 10 €", "1 € ou 5 €"], bonne: 2 },
      dessin: prix,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le thermomètre sous zéro",
      sorte: "piege",
      question: `Ce matin, il fait <b>−3 °C</b>. À midi, la température a changé de <b>5 degrés</b> : |T + 3| = 5.<br><br><b>Quelle est la plus haute</b> température possible ?`,
      reponse: `|T + 3| = |T − (−3)| : c'est la distance à <b>−3</b>, pas à 3 !<br>T = −3 + 5 = 2 ou T = −3 − 5 = −8.<br>La plus haute : <span class="big">2 °C</span>.`,
      consigne: "|T + 3| = 5 : quelle est la plus grande solution ?",
      verification: { type: "courte", attendus: ["2"], unite: "°C" },
      dessin: thermometre,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les points d'eau du Grand Raid",
      sorte: "defi",
      question: `Sur un tronçon du Grand Raid, à La Réunion, deux points d'eau sont aux kilomètres <b>2</b> et <b>8</b>. Un bénévole cherche les bornes où la somme des distances aux deux points d'eau vaut 6 km : |x − 2| + |x − 8| = 6.<br><br><b>Combien de bornes entières</b> conviennent ?`,
      reponse: `Entre 2 et 8, la somme des deux distances vaut toujours 8 − 2 = 6. En dehors, elle est plus grande.<br>Toutes les bornes de 2 à 8 conviennent : 2, 3, 4, 5, 6, 7, 8, soit <span class="big">7 bornes</span>.`,
      consigne: "Combien d'entiers x vérifient |x − 2| + |x − 8| = 6 ?",
      verification: { type: "courte", attendus: ["7"], unite: "bornes" },
      dessin: trail,
    },
  ],
};

export default problemes;
