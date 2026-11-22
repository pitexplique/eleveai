// Énigmes à projeter — STMG, covariance, coefficient de corrélation, droites
// de régression (la boutique de maillots de bain, le cabinet de conseil, le
// sonomètre près de l'autoroute, le fabricant de brioches, piège du magasin
// de bonnets, défi de l'atelier de reprographie). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

/** Une carte : trois lignes (la première en grand) et la question. */
const carte = (aria: string, lignes: string[], question: string, coul: string = C.bleu) =>
  svg(aria,
    r(50, 40, 380, 240, coul, 0.1, 3, 14) +
    lignes.map((s, k) => t(240, 105 + k * 70, s, k ? C.pale : C.craie, k ? 24 : 32)).join("") +
    t(240, 365, question, C.rose, 28));

const R1 = repereXY(20, 34, 0, 30, { px: 2, py: 5, etiquettes: false });
const pts1: [number, number][] = [[22, 10], [24, 14], [26, 15], [28, 20], [30, 24], [32, 27]];
const maillots = svg("Nuage de points montant : plus il fait chaud, plus la boutique vend de maillots",
  R1.fond + pts1.map(([x, y]) => R1.point(x, y, C.craie, 8)).join("") +
    t(R1.X(20) + 8, 22, "maillots vendus", C.pale, 17, "start") + t(R1.X(34), R1.Y(0) + 28, "température", C.pale, 17, "end") +
    t(240, 395, `signe de la covariance${NB}?`, C.rose, 26));

const conseil = carte("Le cabinet de conseil : x égale 1, 2, 3 ; y égale 2, 5, 8 ; moyennes 2 et 5",
  ["x : 1 · 2 · 3", "y : 2 · 5 · 8", "x̄ = 2 · ȳ = 5"], `cov(x${NB};${NB}y)${NB}=${NB}?`, C.jaune);

const sonometre = carte("Le sonomètre : distance à l'autoroute et bruit, r égale moins 0,95",
  ["r = −0,95", "x = distance (m)", "y = bruit (dB)"], `que dit r${NB}?`);

const brioches = carte("Le fabricant de brioches : covariance 12, variance de x égale 4",
  ["cov(x ; y) = 12", "V(x) = 4", "y = ax + b"], `a${NB}=${NB}?`, C.jaune);

const bonnets = carte("Le magasin de bonnets : ventes de bonnets et nombre de rhumes, r égale 0,96",
  ["r = 0,96", "bonnets vendus", "rhumes en ville"], `les bonnets donnent le rhume${NB}?`);

const repro = carte("L'atelier de reprographie : covariance 6, écarts-types 2 et 4",
  ["cov(x ; y) = 6", "σx = 2 · σy = 4", "atelier de reprographie"], `r${NB}=${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "stat_correlation",
  titre: "Énigmes sur la covariance et la corrélation",
  description: "La boutique de maillots de bain, le cabinet de conseil, le sonomètre près de l'autoroute, le fabricant de brioches, le piège du magasin de bonnets, le défi de l'atelier de reprographie : signe et calcul de la covariance, lire le coefficient r, pente de la droite de régression, corrélation n'est pas causalité. Notion hors programme français.",
  problemes: [
    {
      tag: "Énigme 1 · La boutique de maillots de bain",
      titre: "Le signe de la covariance",
      question: `Une boutique de maillots de bain note chaque semaine :<br>x = la température, y = les maillots vendus.<br>Les points du nuage montent.<br><br><b>Quel est le signe de la covariance</b> ?`,
      reponse: `Quand x est grand, y est grand aussi.<br>Les produits (x − x̄)(y − ȳ) sont surtout positifs.<br>La covariance est <span class="big">positive</span>.`,
      consigne: "Quel est le signe de la covariance ?",
      verification: { type: "qcm", choix: ["positive", "négative", "nulle"], bonne: 0 },
      dessin: maillots,
    },
    {
      tag: "Énigme 2 · Le cabinet de conseil",
      titre: "Calculer la covariance",
      question: `Un cabinet de conseil suit 3 consultants.<br>x = jours de formation : 1, 2, 3.<br>y = contrats signés : 2, 5, 8.<br>Moyennes : x̄ = 2 et ȳ = 5.<br>cov(x ; y) = moyenne des produits (x − x̄)(y − ȳ).<br><br><b>Combien vaut la covariance</b> ?`,
      reponse: `Produits : (−1) × (−3) = 3, 0 × 0 = 0, 1 × 3 = 3.<br>Moyenne : (3 + 0 + 3) ÷ 3 = <span class="big">2</span>.`,
      consigne: "Combien vaut la covariance ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: conseil,
    },
    {
      tag: "Énigme 3 · Le sonomètre",
      titre: "Lire le coefficient r",
      question: `Un technicien mesure le bruit près d'une autoroute.<br>x = distance à la route, y = bruit en décibels.<br>Il trouve r = −0,95.<br><br><b>Que dit ce coefficient</b> ?`,
      reponse: `r est proche de −1.<br>Les points sont presque alignés sur une droite qui descend.<br>La corrélation est <span class="big">forte et négative</span> : plus on s'éloigne, moins il y a de bruit.`,
      consigne: "Que dit ce coefficient ?",
      verification: { type: "qcm", choix: ["forte et positive", "faible", "forte et négative"], bonne: 2 },
      dessin: sonometre,
    },
    {
      tag: "Énigme 4 · Le fabricant de brioches",
      titre: "La pente de la droite de régression",
      question: `Un fabricant de brioches compare :<br>x = pages de publicité, y = brioches vendues (en milliers).<br>Il trouve cov(x ; y) = 12 et V(x) = 4.<br>La droite de régression de y en x a pour pente a = cov(x ; y) ÷ V(x).<br><br><b>Combien vaut a</b> ?`,
      reponse: `a = 12 ÷ 4 = <span class="big">3</span>.<br>Une page de pub de plus : environ 3 000 brioches de plus.`,
      consigne: "Combien vaut a ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: brioches,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le magasin de bonnets",
      sorte: "piege",
      question: `Un magasin de bonnets note chaque semaine d'hiver :<br>x = bonnets vendus, y = rhumes en ville.<br>Il trouve r = 0,96.<br>Le vendeur dit : « Les bonnets donnent le rhume. »<br><br><b>A-t-il raison</b> ?`,
      reponse: `r dit seulement que x et y varient ensemble.<br>Ici, c'est le froid qui fait monter les deux.<br><span class="big">Non</span> : corrélation n'est pas causalité.`,
      consigne: "A-t-il raison ?",
      verification: { type: "qcm", choix: ["oui, car r est proche de 1", "non : le froid fait monter les deux", "oui, car r est positif"], bonne: 1 },
      dessin: bonnets,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'atelier de reprographie",
      sorte: "defi",
      question: `Un atelier de reprographie compare :<br>x = commandes du jour, y = ramettes de papier utilisées.<br>Il trouve cov(x ; y) = 6, σx = 2 et σy = 4.<br>r = cov(x ; y) ÷ (σx × σy).<br><br><b>Combien vaut r</b> ?`,
      reponse: `σx × σy = 2 × 4 = 8.<br>r = 6 ÷ 8 = <span class="big">0,75</span>.<br>La corrélation est positive, assez forte.`,
      consigne: "Combien vaut r ?",
      verification: { type: "courte", attendus: ["0,75", "0.75"] },
      dessin: repro,
    },
  ],
};

export default problemes;
