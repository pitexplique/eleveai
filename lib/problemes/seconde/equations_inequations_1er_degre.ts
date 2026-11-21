// Énigmes à projeter — seconde, notion equations_inequations_1er_degre (les
// deux forfaits, la carte de cinéma, la citerne, l'âge de la mère, piège
// −3x ≤ 12, défi de la bouteille et du bouchon). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

const forfaits = svg(
  "Deux forfaits de téléphone : A à 20 euros par mois, B à 8 euros plus 50 centimes par gigaoctet",
  r(50, 70, 170, 200, C.bleu, 0.15, 4, 16) + r(260, 70, 170, 200, C.jaune, 0.15, 4, 16) + t(135, 120, "A", C.bleu, 40) + t(345, 120, "B", C.jaune, 40) +
    t(135, 190, "20 €", C.craie, 30) + t(135, 225, "illimité", C.pale, 18) + t(345, 190, "8 €", C.craie, 30) + t(345, 225, "+ 0,50 € / Go", C.pale, 18) +
    t(240, 350, `même prix pour combien de Go${NB}?`, C.rose, 24)
);

const cinema = svg(
  "Deux tarifs de cinéma : 9 euros la séance, ou une carte à 12 euros par mois plus 5 euros la séance",
  r(60, 70, 360, 70, C.craie, 0.08, 3, 10) + t(240, 115, "sans carte : 9 € la séance", C.craie, 24).replace(" :", `${NB}:`) +
    r(60, 165, 360, 70, C.bleu, 0.12, 3, 10) + t(240, 210, "carte : 12 € + 5 € la séance", C.bleu, 24).replace(" :", `${NB}:`) +
    t(240, 320, `à partir de combien de séances${NB}?`, C.rose, 24)
);

// La citerne : 6 milliers de litres, vidée de 2 milliers par jour (1 millier = 40 px).
const citerne = svg(
  "Une citerne de 6 000 litres qui perd 2 000 litres par jour",
  r(150, 60, 180, 240, C.craie, 0, 4, 10) + r(152, 62, 176, 236, C.bleu, 0.25, 0, 8) +
    [1, 2, 3, 4, 5].map((k) => l(330, 300 - 40 * k, 345, 300 - 40 * k, C.craie, 2) + t(352, 306 - 40 * k, `${k} 000 L`, C.pale, 16, "start")).join("") +
    t(240, 180, "6 − 2x", C.craie, 34) + t(240, 345, "(en milliers de litres, x en jours)", C.pale, 18) + t(240, 390, `encore de l'eau quand${NB}?`, C.rose, 24)
);

const ages = svg(
  "Une mère de 41 ans et sa fille de 11 ans",
  `<circle cx="160" cy="120" r="34" fill="${C.jaune}" fill-opacity="0.4" stroke="${C.jaune}" stroke-width="3"/>` + p("M110 280 L160 160 L210 280 Z", C.jaune, 3, 0.25) + t(160, 320, "41 ans", C.craie, 26) +
    `<circle cx="320" cy="170" r="26" fill="${C.bleu}" fill-opacity="0.4" stroke="${C.bleu}" stroke-width="3"/>` + p("M285 280 L320 200 L355 280 Z", C.bleu, 3, 0.25) + t(320, 320, "11 ans", C.craie, 26) +
    t(240, 385, `le double, dans combien d'années${NB}?`, C.rose, 22)
);

const piege = svg(
  "Au tableau : moins 3x inférieur ou égal à 12",
  t(240, 170, "−3x ≤ 12", C.bleu, 64) + t(240, 270, "÷ (−3)", C.rose, 34) + t(240, 340, `et le sens${NB}?`, C.craie, 28)
);

const bouteille = svg(
  "Une bouteille et son bouchon coûtent 1 euro 10 en tout",
  p("M190 330 L190 170 Q190 140 215 125 L215 95 L265 95 L265 125 Q290 140 290 170 L290 330 Z", C.bleu, 4, 0.15) + r(212, 70, 56, 25, C.rose, 0.5, 3, 4) +
    t(370, 200, "1,10 €", C.craie, 30) + t(370, 240, "en tout", C.pale, 20) + t(240, 385, `le bouchon${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "equations_inequations_1er_degre",
  titre: "Énigmes des équations et inéquations",
  description: "Les deux forfaits de téléphone, la carte de cinéma, la citerne qui se vide, l'âge de la mère, le piège de −3x ≤ 12, le défi de la bouteille et du bouchon : mettre en équation, résoudre, changer le sens d'une inégalité.",
  problemes: [
    {
      tag: "Énigme 1 · Les forfaits",
      titre: "Le même prix",
      question: `Forfait A : <b>20 €</b> par mois. Forfait B : <b>8 €</b> par mois + <b>0,50 €</b> par Go.<br><br><b>Pour combien de Go</b> les deux forfaits coûtent-ils le même prix ?`,
      reponse: `8 + 0,5g = 20, donc 0,5g = 12 et g = 12 ÷ 0,5 = 24.<br>Pour <span class="big">24 Go</span>, les deux coûtent 20 €.<br>Au-delà, A devient moins cher.`,
      consigne: "Pour combien de Go les deux forfaits coûtent-ils pareil ?",
      verification: { type: "qcm", choix: ["12 Go", "40 Go", "24 Go"], bonne: 2 },
      dessin: forfaits,
    },
    {
      tag: "Énigme 2 · La carte de cinéma",
      titre: "Rentable à partir de…",
      question: `Sans carte : <b>9 €</b> la séance. Avec la carte : <b>12 €</b> par mois + <b>5 €</b> la séance.<br><br><b>À partir de combien de séances</b> par mois la carte est-elle moins chère ?`,
      reponse: `On veut 12 + 5n &lt; 9n, donc 12 &lt; 4n et n > 3.<br>À partir de <span class="big">4 séances</span>. (À 3 séances : 27 € des deux côtés.)`,
      consigne: "À partir de combien de séances la carte est-elle moins chère ?",
      verification: { type: "courte", attendus: ["4"], unite: "séances" },
      dessin: cinema,
    },
    {
      tag: "Énigme 3 · La citerne",
      titre: "Encore de l'eau",
      question: `Une citerne contient <b>6 000 L</b> et perd <b>2 000 L</b> par jour. Il reste (6 − 2x) milliers de litres après x jours.<br><br><b>Pour quels x</b> reste-t-il de l'eau ?`,
      reponse: `On résout 6 − 2x > 0 : −2x > −6.<br>On divise par −2, négatif : le sens change. <span class="big">x &lt; 3</span>.<br>Il reste de l'eau pendant moins de 3 jours.`,
      consigne: "Pour quels x a-t-on 6 − 2x > 0 ?",
      verification: { type: "qcm", choix: ["x > 3", "x < 3", "x > −3"], bonne: 1 },
      dessin: citerne,
    },
    {
      tag: "Énigme 4 · L'âge de la mère",
      titre: "Le double",
      question: `Une mère a <b>41 ans</b>, sa fille <b>11 ans</b>.<br><br><b>Dans combien d'années</b> la mère aura-t-elle le double de l'âge de sa fille ?`,
      reponse: `Dans x ans : 41 + x = 2(11 + x), soit 41 + x = 22 + 2x, donc x = 19.<br>Dans <span class="big">19 ans</span> : 60 ans et 30 ans.`,
      consigne: "Dans combien d'années la mère aura-t-elle le double ?",
      verification: { type: "courte", attendus: ["19"], unite: "ans" },
      dessin: ages,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Diviser par un négatif",
      sorte: "piege",
      question: `<b>Résous</b> −3x ≤ 12.<br>A. x ≥ −4 B. x ≤ −4 C. x ≤ 4`,
      reponse: `On divise par −3, un nombre <b>négatif</b> : le sens de l'inégalité change.<br><span class="big">x ≥ −4</span>.<br>Vérif avec x = 0 : −3 × 0 = 0 ≤ 12, et 0 est bien ≥ −4.`,
      consigne: "Résoudre −3x ≤ 12.",
      verification: { type: "qcm", choix: ["x ≥ −4", "x ≤ −4", "x ≤ 4"], bonne: 0 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La bouteille et le bouchon",
      sorte: "defi",
      question: `Une bouteille et son bouchon coûtent <b>1,10 €</b> en tout. La bouteille coûte <b>1 € de plus</b> que le bouchon.<br><br><b>Combien coûte le bouchon</b> ?`,
      reponse: `Ce n'est pas 0,10 € (sinon la bouteille ferait 1,10 € et le tout 1,20 €).<br>Bouchon x : x + (x + 1) = 1,10, donc 2x = 0,10 et x = <span class="big">0,05 €</span>.<br>5 centimes, et la bouteille 1,05 €.`,
      consigne: "Combien coûte le bouchon, en euros ?",
      verification: { type: "courte", attendus: ["0,05", "0.05"], unite: "€" },
      dessin: bouteille,
    },
  ],
};

export default problemes;
