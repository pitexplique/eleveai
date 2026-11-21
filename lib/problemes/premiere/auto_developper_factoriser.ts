// Énigmes à projeter — première (sans spé maths), notion auto_developper_factoriser
// (le tapis, la pelouse agrandie, le carreleur, la plaque percée, piège de
// (x + 4)², défi des deux nappes carrées 51 cm et 49 cm). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

const tapis = svg("Un tapis rectangulaire de x par x plus 3",
  r(80, 80, 320, 200, C.jaune, 0.25, 4, 6) + t(240, 310, "x + 3", C.craie, 24) + t(60, 186, "x", C.craie, 24, "end") +
    t(240, 190, "aire = ?", C.craie, 26) + t(240, 390, `développe${NB}!`, C.rose, 28));

const pelouse = svg("Un carré de pelouse de côté x, agrandi de 5 mètres dans les deux sens",
  r(80, 60, 300, 300, C.pale, 0.05, 3) + r(80, 60, 210, 210, C.bleu, 0.25, 3) + r(290, 60, 90, 210, C.jaune, 0.25, 3) +
    r(80, 270, 210, 90, C.jaune, 0.25, 3) + r(290, 270, 90, 90, C.rose, 0.25, 3) +
    t(185, 172, "x²", C.bleu, 28) + t(335, 172, "5x", C.jaune, 22) + t(185, 322, "5x", C.jaune, 22) + t(335, 322, "25", C.rose, 22) +
    t(185, 50, "x", C.craie, 22) + t(335, 50, "5", C.craie, 22) + t(65, 172, "x", C.craie, 22, "end") + t(65, 322, "5", C.craie, 22, "end") +
    t(240, 405, `(x + 5)² = ?`, C.rose, 26));

const carreleur = svg("Deux zones à carreler : un carré de 4 x carré et une bande de 12 x",
  r(60, 100, 160, 160, C.bleu, 0.25, 3) + r(260, 100, 160, 160, C.jaune, 0.25, 3) +
    t(140, 190, "4x²", C.bleu, 30) + t(340, 190, "12x", C.jaune, 30) + t(240, 190, "+", C.craie, 30) +
    t(240, 320, "un facteur commun", C.craie, 22) + t(240, 390, `factorise${NB}!`, C.rose, 28));

const plaque = svg("Une plaque carrée de côté x dont on retire un petit carré de côté 3",
  r(100, 60, 280, 280, C.bleu, 0.25, 4) + r(300, 60, 80, 80, C.craie, 0, 3) +
    t(240, 360, "x", C.craie, 24) + t(340, 108, "3", C.rose, 24) + t(200, 220, "x² − 9", C.craie, 28) +
    t(240, 405, `en produit${NB}?`, C.rose, 26));

const piege = svg("Le test avec x = 1 : (1 + 4) au carré vaut 25, alors que 1 + 16 vaut 17",
  t(240, 80, "(x + 4)² = x² + 16 ?", C.craie, 28) +
    r(60, 130, 160, 120, C.bleu, 0.15, 3, 10) + t(140, 170, "x = 1", C.pale, 20) + t(140, 215, "(1 + 4)² = 25", C.bleu, 20) +
    r(260, 130, 160, 120, C.jaune, 0.15, 3, 10) + t(340, 170, "x = 1", C.pale, 20) + t(340, 215, "1² + 16 = 17", C.jaune, 20) +
    t(240, 310, "25 ≠ 17", C.rose, 30) + t(240, 385, `la bonne forme${NB}?`, C.rose, 26));

const nappes = svg("Deux nappes carrées de 51 et 49 centimètres posées l'une sur l'autre",
  r(110, 70, 255, 255, C.jaune, 0.2, 3) + r(110, 70, 245, 245, C.bleu, 0.25, 3) +
    t(238, 60, "51 cm", C.jaune, 20) + t(232, 200, "49 cm", C.bleu, 22) +
    t(240, 365, "pas à l'échelle", C.pale, 16) + t(240, 400, `51² − 49² = ?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_developper_factoriser",
  titre: "Énigmes pour développer et factoriser",
  description: "Le tapis, la pelouse agrandie, le carreleur, la plaque percée, le piège de (x + 4)², le défi des deux nappes : développer, identités remarquables, factoriser par un facteur commun ou une identité.",
  problemes: [
    {
      tag: "Énigme 1 · Le tapis",
      titre: "Développer un produit",
      question: `Un tapis rectangulaire mesure <b>x</b> mètres de large et <b>x + 3</b> mètres de long.<br><br><b>Développe</b> son aire x(x + 3).`,
      reponse: `On distribue x : x × x + x × 3 = <span class="big">x² + 3x</span>.`,
      consigne: "Développe x(x + 3).",
      verification: { type: "courte", attendus: ["x²+3x", "x^2+3x", "3x+x²", "3x+x^2"] },
      dessin: tapis,
    },
    {
      tag: "Énigme 2 · La pelouse agrandie",
      titre: "Une identité remarquable",
      question: `Un carré de pelouse a pour côté <b>x</b> mètres. On l'agrandit de <b>5 m</b> dans les deux sens.<br><br><b>Développe</b> sa nouvelle aire (x + 5)².`,
      reponse: `(a + b)² = a² + 2ab + b² : le dessin montre les 4 morceaux.<br>(x + 5)² = <span class="big">x² + 10x + 25</span>.`,
      consigne: "Développe (x + 5)².",
      verification: { type: "qcm", choix: ["x² + 25", "x² + 10x + 25", "x² + 5x + 25"], bonne: 1 },
      dessin: pelouse,
    },
    {
      tag: "Énigme 3 · Le carreleur",
      titre: "Le facteur commun",
      question: `Un carreleur doit couvrir deux zones : l'une a pour aire <b>4x²</b>, l'autre <b>12x</b>.<br><br><b>Factorise</b> au maximum 4x² + 12x.`,
      reponse: `4x² = 4x × x et 12x = 4x × 3 : le facteur commun est 4x.<br>4x² + 12x = <span class="big">4x(x + 3)</span>.`,
      consigne: "Factorise au maximum 4x² + 12x.",
      verification: { type: "qcm", choix: ["4(x² + 12x)", "2x(2x + 12)", "4x(x + 3)"], bonne: 2 },
      dessin: carreleur,
    },
    {
      tag: "Énigme 4 · La plaque percée",
      titre: "Une différence de deux carrés",
      question: `Dans une plaque carrée de côté <b>x</b> cm, on découpe un carré de <b>3 cm</b> de côté. Il reste une aire x² − 9.<br><br><b>Écris</b> x² − 9 comme un produit.`,
      reponse: `x² − 9 = x² − 3², et a² − b² = (a − b)(a + b).<br>x² − 9 = <span class="big">(x − 3)(x + 3)</span>.`,
      consigne: "Factorise x² − 9.",
      verification: { type: "courte", attendus: ["(x-3)(x+3)", "(x+3)(x-3)", "(x−3)(x+3)", "(x+3)(x−3)"] },
      dessin: plaque,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le carré d'une somme",
      sorte: "piege",
      question: `Un élève écrit : « (x + 4)² = x² + 16 ».<br>Teste avec x = 1.<br><br><b>Quelle est</b> la bonne forme développée ?`,
      reponse: `Avec x = 1 : (1 + 4)² = 25, mais 1 + 16 = 17. C'est faux !<br>Il manque le double produit : (x + 4)² = <span class="big">x² + 8x + 16</span>.`,
      consigne: "Développe (x + 4)².",
      verification: { type: "qcm", choix: ["x² + 8x + 16", "x² + 16", "x² + 4x + 16"], bonne: 0 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux nappes",
      sorte: "defi",
      question: `Une nappe carrée mesure <b>51 cm</b> de côté, une autre <b>49 cm</b>.<br><br>Sans calculatrice, <b>quelle est la différence</b> de leurs aires ?`,
      reponse: `51² − 49² = (51 − 49)(51 + 49) = 2 × 100 = <span class="big">200 cm²</span>.<br>La factorisation évite de calculer 2 601 − 2 401.`,
      consigne: "Calcule 51² − 49², en cm².",
      verification: { type: "courte", attendus: ["200"], unite: "cm²" },
      dessin: nappes,
    },
  ],
};

export default problemes;
