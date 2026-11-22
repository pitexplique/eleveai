// Énigmes à projeter — seconde, notion developpement_factorisation_2de (le
// jardin rectangulaire, le facteur commun caché, le libraire, la terrasse
// agrandie, piège −(2x − 5), défi de l'aire x² + 5x + 6). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

// Un rectangle (x + a)(x + b) découpé en 4 morceaux (x = 160 px, unité = 30 px).
const decoupe = (a: number, b: number, xa: string, xb: string, centre: string) => {
  const X0 = 70, Y0 = 60, x = 160, u = 30;
  return r(X0, Y0, x, x, C.bleu, 0.15, 3) + r(X0 + x, Y0, a * u, x, C.jaune, 0.2, 3) + r(X0, Y0 + x, x, b * u, C.jaune, 0.2, 3) + r(X0 + x, Y0 + x, a * u, b * u, C.rose, 0.2, 3) +
    t(X0 + x / 2, Y0 - 12, "x", C.craie, 24) + t(X0 + x + (a * u) / 2, Y0 - 12, xa, C.craie, 24) +
    t(X0 - 12, Y0 + x / 2 + 8, "x", C.craie, 24, "end") + t(X0 - 12, Y0 + x + (b * u) / 2 + 8, xb, C.craie, 24, "end") + t(X0 + x / 2, Y0 + x / 2 + 10, centre, C.bleu, 28);
};

const jardin = svg(
  "Un jardin rectangulaire de côtés x plus 3 et x plus 5, découpé en quatre morceaux",
  decoupe(3, 5, "3", "5", "x²") + t(240, 395, `aire développée${NB}?`, C.rose, 26)
);

const facteur = svg(
  "Au tableau : x moins 1 fois 2x plus 3, moins x moins 1 fois x plus 4",
  t(240, 150, "(x − 1)(2x + 3)", C.craie, 34) + t(240, 200, "− (x − 1)(x + 4)", C.craie, 34) +
    l(118, 165, 196, 165, C.jaune, 4) + l(154, 215, 232, 215, C.jaune, 4) + t(240, 320, `factoriser${NB}?`, C.rose, 30)
);

const libraire = svg(
  "Un libraire : 13 livres le matin et 87 l'après-midi, 47 euros chacun",
  r(60, 90, 30, 140, C.bleu, 0.4, 3) + r(95, 110, 30, 120, C.jaune, 0.4, 3) + r(130, 80, 30, 150, C.rose, 0.3, 3) + l(40, 232, 180, 232, C.craie, 4) +
    t(330, 110, "47 € le livre", C.craie, 26) + t(330, 170, "matin : 13", C.craie, 24).replace(" :", `${NB}:`) + t(330, 215, "soir : 87", C.craie, 24).replace(" :", `${NB}:`) +
    t(240, 330, "47 × 13 + 47 × 87", C.bleu, 32) + t(240, 385, `de tête${NB}?`, C.rose, 28)
);

// La terrasse : carré x = 4 m (1 m = 40 px), agrandie à 5 × 6 m.
const terrasse = svg(
  "Une terrasse carrée de 4 mètres agrandie d'1 mètre d'un côté et de 2 mètres de l'autre",
  r(60, 60, 200, 240, C.jaune, 0.15, 3) + r(60, 60, 160, 160, C.bleu, 0.25, 4) + t(140, 150, "x²", C.bleu, 30) +
    t(140, 48, "x", C.craie, 22) + t(240, 48, "1", C.craie, 22) + t(272, 140, "x", C.craie, 22, "start") + t(272, 265, "2", C.craie, 22, "start") +
    t(380, 150, "x = 4 m", C.craie, 26) + t(240, 360, `l'aire gagnée${NB}?`, C.rose, 28)
);

const piege = svg(
  "Au tableau : moins parenthèse 2x moins 5",
  t(240, 190, "−(2x − 5)", C.bleu, 64) + t(240, 290, `= ?`, C.rose, 40).replace(" ?", `${NB}?`)
);

const defi = svg(
  "Un rectangle d'aire x au carré plus 5x plus 6, ses côtés sont inconnus",
  r(50, 110, 310, 170, C.bleu, 0.15, 4) + t(205, 205, "x² + 5x + 6", C.craie, 36) + t(205, 95, `x + ?`, C.rose, 28).replace(" ?", `${NB}?`) +
    t(372, 205, "x + ?", C.rose, 28, "start").replace(" ?", `${NB}?`) + t(240, 350, `périmètre${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "developpement_factorisation_2de",
  titre: "Énigmes du développement et de la factorisation",
  description: "Le jardin rectangulaire, le facteur commun caché, le libraire, la terrasse agrandie, le piège −(2x − 5), le défi de l'aire x² + 5x + 6 : développer, réduire, factoriser par un facteur commun.",
  problemes: [
    {
      tag: "Énigme 1 · Le jardin",
      titre: "(x + 3)(x + 5)",
      question: `Un jardin rectangulaire mesure <b>(x + 3) m</b> sur <b>(x + 5) m</b>.<br><br><b>Quelle est son aire</b>, développée et réduite ?`,
      reponse: `(x + 3)(x + 5) = x² + 5x + 3x + 15 = <span class="big">x² + 8x + 15</span>.<br>Sur le dessin : le carré x², deux bandes 5x et 3x, le petit coin 15.`,
      consigne: "Développer et réduire (x + 3)(x + 5).",
      verification: { type: "qcm", choix: ["x² + 8x + 15", "x² + 15", "x² + 8x + 8"], bonne: 0 },
      dessin: jardin,
    },
    {
      tag: "Énigme 2 · Le facteur caché",
      titre: "Factoriser",
      question: `<b>Factorise</b> : A = (x − 1)(2x + 3) − (x − 1)(x + 4).`,
      reponse: `Le facteur commun est (x − 1).<br>A = (x − 1)[(2x + 3) − (x + 4)] = (x − 1)(2x + 3 − x − 4) = <span class="big">(x − 1)(x − 1)</span>, soit (x − 1)².`,
      consigne: "Factoriser (x − 1)(2x + 3) − (x − 1)(x + 4).",
      verification: { type: "qcm", choix: ["(x − 1)(3x + 7)", "(x − 1)(x + 7)", "(x − 1)(x − 1)"], bonne: 2 },
      dessin: facteur,
    },
    {
      tag: "Énigme 3 · Le libraire",
      titre: "De tête",
      question: `Un libraire vend des livres à <b>47 €</b>. Il en vend <b>13</b> le matin et <b>87</b> l'après-midi.<br><br><b>Combien</b> encaisse-t-il ? Calcule de tête.`,
      reponse: `On factorise par 47 : 47 × 13 + 47 × 87 = 47 × (13 + 87) = 47 × 100.<br>Il encaisse <span class="big">4 700 €</span>.`,
      consigne: "Combien vaut 47 × 13 + 47 × 87 ?",
      verification: { type: "courte", attendus: ["4700"], unite: "€" },
      dessin: libraire,
    },
    {
      tag: "Énigme 4 · La terrasse",
      titre: "Agrandie",
      question: `Une terrasse est un carré de côté <b>x</b> mètres. On l'agrandit : <b>+ 1 m</b> d'un côté, <b>+ 2 m</b> de l'autre.<br><br>Pour <b>x = 4</b>, de combien de m² l'aire augmente-t-elle ?`,
      reponse: `Gain = (x + 1)(x + 2) − x² = x² + 3x + 2 − x² = 3x + 2.<br>Pour x = 4 : 3 × 4 + 2 = <span class="big">14 m²</span>.<br>Vérif : 5 × 6 − 4 × 4 = 30 − 16 = 14.`,
      consigne: "Pour x = 4, de combien de m² l'aire augmente-t-elle ?",
      verification: { type: "courte", attendus: ["14"], unite: "m²" },
      dessin: terrasse,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le signe moins",
      sorte: "piege",
      question: `<b>Développe</b> −(2x − 5).<br>A. −2x − 5 B. −2x + 5 C. 2x + 5`,
      reponse: `Un « − » devant une parenthèse change le signe de <b>chaque</b> terme.<br>−(2x − 5) = −2x + 5. Réponse <span class="big">−2x + 5</span>.<br>Vérif avec x = 0 : −(0 − 5) = 5.`,
      consigne: "Développer −(2x − 5).",
      verification: { type: "qcm", choix: ["−2x − 5", "−2x + 5", "2x + 5"], bonne: 1 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les côtés cachés",
      sorte: "defi",
      question: `Un rectangle a pour aire <b>x² + 5x + 6</b>. Ses côtés s'écrivent x + a et x + b, avec a et b entiers positifs.<br><br><b>Quel est son périmètre</b> ?`,
      reponse: `(x + a)(x + b) = x² + (a + b)x + ab : il faut a + b = 5 et ab = 6, donc 2 et 3.<br>Côtés x + 2 et x + 3. Périmètre : 2(x + 2 + x + 3) = <span class="big">4x + 10</span>.`,
      consigne: "Quel est le périmètre du rectangle d'aire x² + 5x + 6 ?",
      verification: { type: "courte", attendus: ["4x+10", "10+4x"] },
      dessin: defi,
    },
  ],
};

export default problemes;
