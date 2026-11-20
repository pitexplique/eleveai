// Énigmes à projeter — CM2, notion proportionnalite (la pâte à crêpes, le prix
// des cahiers par l'unité, le tableau du jus de pomme, la voiture qui roule
// toujours pareil, le piège de la taille et de l'âge, le défi des robinets).
// 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o } from "../dessins-ecole";

const crepes = svg(
  "Une recette : pour 4 crêpes, 100 g de farine",
  [0, 1, 2, 3].map((i) => o(80 + i * 105, 130, 42, C.jaune, 0.3, 3)).join("") + t(240, 220, "4 crêpes → 100 g de farine", C.craie, 26) +
    t(240, 300, "12 crêpes → ? g", C.rose, 30) + t(240, 370, "même recette", C.pale, 20)
);

const cahiers = svg(
  "3 cahiers coûtent 4,50 €",
  [0, 1, 2].map((i) => r(60 + i * 60, 100, 80, 110, [C.bleu, C.rose, C.jaune][i], 0.2, 3, 4)).join("") + t(150, 250, "3 cahiers : 4,50 €", C.craie, 24) +
    t(360, 170, "7 cahiers", C.rose, 26) + t(360, 210, "? €", C.rose, 30) + t(240, 340, "chaque cahier a le même prix", C.pale, 20)
);

const tableau = () => {
  const cases = [["litres", "5", "10", "15"], ["prix (€)", "9", "18", "?"]];
  let s = "";
  cases.forEach((ligne, j) => ligne.forEach((v, i) => {
    const x = 30 + (i ? 120 + (i - 1) * 105 : 0), w = i ? 105 : 120;
    s += r(x, 120 + j * 70, w, 70, i ? C.bleu : C.pale, i ? 0.08 : 0.2, 3) + t(x + w / 2, 165 + j * 70, v, v === "?" ? C.rose : C.craie, i ? 32 : 22);
  }));
  return svg("Un tableau de proportionnalité : 5 L pour 9 €, 10 L pour 18 €, 15 L pour ? €", s + t(240, 80, "🍎 jus de pomme au marché", C.craie, 24) + t(240, 340, "prix proportionnel aux litres", C.pale, 20));
};

const voiture = svg(
  "Une voiture qui roule toujours à la même vitesse : 180 km en 2 heures",
  t(90, 160, "🚗", C.craie, 60) + l(60, 200, 420, 200, C.pale, 3, "10 8") +
    t(240, 250, "2 h → 180 km", C.craie, 30) + t(240, 310, "5 h → ? km", C.rose, 30) + t(240, 380, "toujours la même vitesse", C.pale, 20)
);

// Deux silhouettes : 1,10 m et 2,20 m (1 m = 140 px), pour montrer l'absurde.
const tailles = svg(
  "Tim à 5 ans mesure 1,10 m ; un garçon de 2,20 m serait un géant",
  l(30, 380, 450, 380, C.craie, 3) +
    o(130, 380 - 154 + 14, 14, C.bleu, 0, 4) + l(130, 380 - 154 + 28, 130, 330, C.bleu, 4) + l(130, 330, 115, 380, C.bleu, 4) + l(130, 330, 145, 380, C.bleu, 4) + t(130, 210, "5 ans : 1,10 m", C.bleu, 20) +
    o(340, 380 - 308 + 18, 18, C.rose, 0, 4) + l(340, 380 - 308 + 36, 340, 280, C.rose, 4, "8 6") + l(340, 280, 320, 380, C.rose, 4, "8 6") + l(340, 280, 360, 380, C.rose, 4, "8 6") + t(410, 120, "10 ans :", C.rose, 20) + t(410, 145, "2,20 m ?", C.rose, 20)
);

const piscine = svg(
  "Une piscine remplie par 6 robinets en 4 heures",
  r(60, 220, 360, 120, C.bleu, 0.25, 4, 6) + [0, 1, 2, 3, 4, 5].map((i) => t(85 + i * 62, 180, "🚰", C.craie, 34)).join("") +
    t(240, 90, "6 robinets → 4 h", C.craie, 30) + t(240, 385, `3 robinets → ? h`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "proportionnalite",
  titre: "Énigmes sur la proportionnalité",
  description: "La pâte à crêpes, le prix de 7 cahiers, le tableau du jus de pomme, la voiture régulière, le piège de la taille de Tim, le défi des robinets.",
  problemes: [
    {
      tag: "Énigme 1 · En cuisine",
      titre: "La pâte à crêpes",
      question: `Pour <b>4 crêpes</b>, il faut <b>100 g</b> de farine.<br><br>Combien de farine pour <b>12 crêpes</b> ?`,
      reponse: `12 crêpes, c'est 3 fois 4 crêpes.<br>Il faut 3 fois plus de farine : 3 × 100 = <span class="big">300 g</span>.`,
      consigne: "Combien de farine pour 12 crêpes, en grammes ?",
      verification: { type: "courte", attendus: ["300"], unite: "g" },
      dessin: crepes,
    },
    {
      tag: "Énigme 2 · À la papeterie",
      titre: "Le prix des cahiers",
      question: `<b>3 cahiers</b> coûtent <b>4,50 €</b>.<br><br>Combien coûtent <b>7 cahiers</b> ?`,
      reponse: `Un cahier : 4,50 ÷ 3 = 1,50 €.<br>7 cahiers : 7 × 1,50 = <span class="big">10,50 €</span>.`,
      consigne: "Combien coûtent 7 cahiers ?",
      verification: { type: "courte", attendus: ["10,50", "10,5", "10.50", "10.5"], unite: "€" },
      dessin: cahiers,
    },
    {
      tag: "Énigme 3 · Au marché",
      titre: "Le tableau du jus",
      question: `Au marché, le prix du jus de pomme est proportionnel aux litres.<br>5 L coûtent <b>9 €</b>. 10 L coûtent <b>18 €</b>.<br><br>Combien coûtent <b>15 L</b> ?`,
      reponse: `15 L = 5 L + 10 L.<br>Le prix aussi s'ajoute : 9 + 18 = <span class="big">27 €</span>.`,
      consigne: "Combien coûtent 15 L de jus ?",
      verification: { type: "qcm", choix: ["24 €", "27 €", "30 €"], bonne: 1 },
      dessin: tableau(),
    },
    {
      tag: "Énigme 4 · Sur l'autoroute",
      titre: "La voiture régulière",
      question: `Une voiture roule <b>toujours à la même vitesse</b>.<br>En <b>2 heures</b>, elle fait <b>180 km</b>.<br><br>Combien de km en <b>5 heures</b> ?`,
      reponse: `En 1 heure : 180 ÷ 2 = 90 km.<br>En 5 heures : 5 × 90 = <span class="big">450 km</span>.`,
      consigne: "Combien de kilomètres en 5 heures ?",
      verification: { type: "courte", attendus: ["450"], unite: "km" },
      dessin: voiture,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La taille de Tim",
      sorte: "piege",
      question: `À <b>5 ans</b>, Tim mesurait <b>1,10 m</b>.<br>Sa sœur dit : « À 10 ans, il mesurera 2 fois plus : 2,20 m ! »<br><br><b>A-t-elle raison</b> ?`,
      reponse: `Non ! La taille n'est pas proportionnelle à l'âge.<br>On ne grandit pas toujours de la même façon.<br>Un enfant de 2,20 m serait un géant ! <span class="big">On ne peut pas le calculer ainsi</span>.`,
      consigne: "Peut-on trouver la taille de Tim à 10 ans en faisant × 2 ?",
      verification: { type: "qcm", choix: ["Oui, il mesurera 2,20 m", "Oui, il mesurera 1,10 m", "Non, ce n'est pas proportionnel"], bonne: 2 },
      dessin: tailles,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les robinets de la piscine",
      sorte: "defi",
      question: `<b>6 robinets</b> remplissent une piscine en <b>4 heures</b>.<br>Tous les robinets donnent autant d'eau.<br><br>Combien de temps avec <b>3 robinets</b> ?`,
      reponse: `Attention : moins de robinets, c'est <b>plus</b> de temps !<br>2 fois moins de robinets : 2 fois plus de temps.<br>2 × 4 = <span class="big">8 heures</span>.`,
      consigne: "Combien d'heures avec 3 robinets ?",
      verification: { type: "courte", attendus: ["8"], unite: "h" },
      dessin: piscine,
    },
  ],
};

export default problemes;
