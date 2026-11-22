// Énigmes à projeter — STMG (Tle), fonction x ↦ kaˣ : variations et allure
// (la dépanneuse, la cristallerie, le transport scolaire, l'agence
// matrimoniale, piège du fabricant de lustres, défi du grossiste en
// emballages). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

/** Une carte : trois lignes (la première en grand) et la question. */
const carte = (aria: string, lignes: string[], question: string, coul: string = C.bleu) =>
  svg(aria,
    r(50, 40, 380, 240, coul, 0.1, 3, 14) +
    lignes.map((s, k) => t(240, 105 + k * 70, s, k ? C.pale : C.craie, k ? 24 : 32)).join("") +
    t(240, 365, question, C.rose, 28));

const depanneuse = carte("La dépanneuse : sa valeur est multipliée par 0,85 puissance x ; 0,85 est entre 0 et 1",
  ["f(x) = 0,85ˣ", "part de la valeur d'achat", "x en années"], `croissante ou décroissante${NB}?`);

const R1 = repereXY(0, 4, 0, 5.5, { px: 1, py: 1 });
const cristallerie = svg("La cristallerie : trois courbes ; A part de 1 et monte de plus en plus vite ; B part de 1 et descend vers 0 ; C est une droite qui monte doucement",
  R1.fond +
    R1.courbe((x) => Math.pow(1.5, x), 0, 3.6, C.bleu, 4) +
    R1.courbe((x) => Math.pow(0.6, x), 0, 3.6, C.jaune, 4) +
    R1.courbe((x) => 2 + 0.3 * x, 0, 3.6, C.rose, 4) +
    t(R1.X(3.6) + 12, R1.Y(4.3) + 8, "A", C.bleu, 24, "start") +
    t(R1.X(3.6) + 12, R1.Y(0.35) + 8, "B", C.jaune, 24, "start") +
    t(R1.X(3.6) + 12, R1.Y(3.08) + 8, "C", C.rose, 24, "start") +
    t(240, 405, `laquelle est 1,5ˣ${NB}?`, C.rose, 26));

const scolaire = carte("Le transport scolaire : solde f de x égale moins 2 fois 1,1 puissance x milliers d'euros ; k négatif",
  ["f(x) = −2 × 1,1ˣ", "solde en milliers d'€", "k = −2, a = 1,1"], `comment varie f${NB}?`, C.jaune);

const agence = carte("L'agence matrimoniale : u n égale 500 fois 1,04 puissance n inscrits ; prolongée par f de x égale 500 fois 1,04 puissance x",
  ["f(x) = 500 × 1,04ˣ", "uₙ = 500 × 1,04ⁿ", "x en années"], `inscrits au départ${NB}?`);

const lustres = carte("Le fabricant de lustres : f de x égale 3 fois 0,9 puissance x milliers ; le vendeur dit croissante car 3 est plus grand que 1",
  ["f(x) = 3 × 0,9ˣ", "le vendeur : « 3 > 1, ça monte »", "milliers de lustres"], `croissante${NB}?`);

const emballages = carte("Le grossiste en emballages : f de x égale k fois a puissance x ; f de 0 égale 200 ; f de 1 égale 150",
  ["f(x) = k × aˣ", "f(0) = 200", "f(1) = 150"], `a${NB}=${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "expo_variations",
  titre: "Énigmes des variations de x ↦ kaˣ",
  description: "La dépanneuse, la cristallerie, le transport scolaire, l'agence matrimoniale, le piège du fabricant de lustres, le défi du grossiste en emballages : trouver le sens de variation de aˣ selon a, celui de kaˣ selon le signe de k, reconnaître l'allure de la courbe et faire le lien avec les suites géométriques.",
  problemes: [
    {
      tag: "Énigme 1 · La dépanneuse",
      titre: "Le sens selon a",
      question: `Une dépanneuse perd de la valeur.<br>Au bout de x années, il reste f(x) = 0,85ˣ de son prix d'achat.<br>Le nombre a = 0,85 est entre 0 et 1.<br><br><b>La fonction f est-elle croissante ou décroissante</b> ?`,
      reponse: `Si 0 &lt; a &lt; 1, la fonction aˣ est décroissante.<br>Ici a = 0,85 : f est <span class="big">décroissante</span>.<br>Chaque année, la valeur est multipliée par 0,85 : elle baisse de 15 %.`,
      consigne: "Croissante ou décroissante ?",
      verification: { type: "courte", attendus: ["décroissante", "decroissante"] },
      dessin: depanneuse,
    },
    {
      tag: "Énigme 2 · La cristallerie",
      titre: "Reconnaître l'allure",
      question: `Une cristallerie prévoit ses ventes à l'export avec f(x) = 1,5ˣ.<br>Trois courbes sont tracées.<br><br><b>Laquelle représente f</b> ?`,
      reponse: `1,5ˣ vaut 1 pour x = 0 et a > 1 : la courbe part de 1 et monte de plus en plus vite.<br>C'est la courbe <span class="big">A</span>.<br>B descend (a &lt; 1) ; C est une droite (fonction affine).`,
      consigne: "Quelle courbe ?",
      verification: { type: "qcm", choix: ["A", "B", "C"], bonne: 0 },
      dessin: cristallerie,
    },
    {
      tag: "Énigme 3 · Le transport scolaire",
      titre: "Le rôle de k",
      question: `Une société de transport scolaire est à découvert.<br>Son solde est f(x) = −2 × 1,1ˣ milliers d'euros, x en mois.<br>Ici k = −2 est négatif et a = 1,1 est plus grand que 1.<br><br><b>Comment varie f</b> ?`,
      reponse: `1,1ˣ est croissante ; multiplier par k = −2 (négatif) inverse le sens.<br>f est <span class="big">décroissante</span> : le découvert se creuse.<br>f(0) = −2 ; f(1) = −2,2 ; f(2) = −2,42.`,
      consigne: "Comment varie f ?",
      verification: { type: "qcm", choix: ["croissante", "décroissante", "constante"], bonne: 1 },
      dessin: scolaire,
    },
    {
      tag: "Énigme 4 · L'agence matrimoniale",
      titre: "Le lien avec la suite",
      question: `Une agence matrimoniale a uₙ = 500 × 1,04ⁿ inscrits après n années.<br>On prolonge la suite par f(x) = 500 × 1,04ˣ, pour tout x ≥ 0.<br><br><b>Combien d'inscrits au départ</b> (x = 0) ?`,
      reponse: `f(0) = 500 × 1,04⁰ = 500 × 1 = <span class="big">500</span> inscrits.<br>k = 500 est la valeur de départ ; a = 1,04 > 1 : f est croissante, comme la suite géométrique de raison 1,04.`,
      consigne: "Combien d'inscrits au départ ?",
      verification: { type: "courte", attendus: ["500", "500 inscrits"] },
      dessin: agence,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le fabricant de lustres",
      sorte: "piege",
      question: `Un fabricant de lustres vend f(x) = 3 × 0,9ˣ milliers de lustres, x en années.<br>Le vendeur dit : « 3 est plus grand que 1, donc ça monte ».<br><br><b>Comment varie vraiment f</b> ?`,
      reponse: `Le sens dépend de a = 0,9, pas de k = 3 (k positif garde le sens).<br>0,9 &lt; 1 : f est <span class="big">décroissante</span>.<br>f(0) = 3 ; f(1) = 2,7 ; f(2) = 2,43.`,
      consigne: "Comment varie f ?",
      verification: { type: "qcm", choix: ["croissante, car 3 > 1", "constante", "décroissante, car 0,9 < 1"], bonne: 2 },
      dessin: lustres,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le grossiste en emballages",
      sorte: "defi",
      question: `Le stock d'un grossiste en emballages suit f(x) = k × aˣ cartons, x en semaines.<br>Au départ, f(0) = 200. Une semaine plus tard, f(1) = 150.<br><br><b>Que vaut a</b> ? Le stock monte-t-il ou descend-il ?`,
      reponse: `f(0) = k × 1 = k, donc k = 200.<br>f(1) = 200 × a = 150, donc a = 150 ÷ 200 = <span class="big">0,75</span>.<br>k > 0 et a &lt; 1 : le stock descend.`,
      consigne: "Que vaut a ?",
      verification: { type: "courte", attendus: ["0,75", "0.75", "a = 0,75", "3/4"] },
      dessin: emballages,
    },
  ],
};

export default problemes;
