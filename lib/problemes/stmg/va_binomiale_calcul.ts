// Énigmes à projeter — STMG (Tle), loi binomiale : calculer (le fabricant
// d'airbags, la démarcheuse en porte-à-porte, la rédactrice web, le
// fabricant de LED, piège de l'installateur de fibre optique, défi du
// chasseur de têtes). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

/** Une carte : trois lignes (la première en grand) et la question. */
const carte = (aria: string, lignes: string[], question: string, coul: string = C.bleu) =>
  svg(aria,
    r(50, 40, 380, 240, coul, 0.1, 3, 14) +
    lignes.map((s, k) => t(240, 105 + k * 70, s, k ? C.pale : C.craie, k ? 24 : 32)).join("") +
    t(240, 365, question, C.rose, 28));

const airbags = carte("Le fabricant d'airbags : X suit B(3 ; 0,1), probabilité que X égale 0",
  ["X suit B(3 ; 0,1)", "3 airbags testés", "X = nombre de défauts"], `P(X${NB}=${NB}0)${NB}?`);

const porte = carte("La démarcheuse : X suit B(4 ; 0,5), 2 parmi 4 égale 6, probabilité que X égale 2",
  ["X suit B(4 ; 0,5)", "2 parmi 4 = 6", "4 maisons visitées"], `P(X${NB}=${NB}2)${NB}?`, C.jaune);

const redactrice = carte("La rédactrice web : X suit B(3 ; 0,2), probabilité d'au moins un article accepté",
  ["X suit B(3 ; 0,2)", "3 articles envoyés", "X = articles acceptés"], `P(X${NB}≥${NB}1)${NB}?`);

const led = carte("Le fabricant de LED : X suit B(200 ; 0,03), espérance de X",
  ["X suit B(200 ; 0,03)", "200 LED contrôlées", "3 % défectueuses"], `E(X)${NB}=${NB}?`, C.jaune);

const fibre = carte("L'installateur de fibre : X suit B(3 ; 0,2), probabilité que X égale 1",
  ["X suit B(3 ; 0,2)", "3 raccordements", "X = raccordements ratés"], `P(X${NB}=${NB}1)${NB}?`);

const tetes = carte("Le chasseur de têtes : chaque candidat accepte avec une probabilité de 0,5, au moins un oui avec plus de 90 %",
  ["p = 0,5 par candidat", "au moins 1 oui", "probabilité > 0,9"], `combien d'appels${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "va_binomiale_calcul",
  titre: "Énigmes pour calculer avec une loi binomiale",
  description: "Le fabricant d'airbags, la démarcheuse en porte-à-porte, la rédactrice web, le fabricant de LED, le piège de l'installateur de fibre optique, le défi du chasseur de têtes : P(X = 0), P(X = k) avec les coefficients, « au moins un » par le contraire, l'espérance n × p et un seuil.",
  problemes: [
    {
      tag: "Énigme 1 · Le fabricant d'airbags",
      titre: "Aucun défaut",
      question: `Un fabricant d'airbags en teste 3.<br>Chacun a un défaut avec une probabilité de 0,1.<br>X = nombre d'airbags avec un défaut. X suit B(3 ; 0,1).<br><br><b>Combien vaut P(X = 0)</b> ?`,
      reponse: `X = 0 : les 3 airbags sont bons.<br>Un seul chemin : 0,9 × 0,9 × 0,9.<br>P(X = 0) = 0,9³ = <span class="big">0,729</span>.`,
      consigne: "Combien vaut P(X = 0) ?",
      verification: { type: "courte", attendus: ["0,729", "0.729"] },
      dessin: airbags,
    },
    {
      tag: "Énigme 2 · La démarcheuse",
      titre: "P(X = k) avec un coefficient",
      question: `Une démarcheuse en porte-à-porte visite 4 maisons.<br>Chaque maison achète avec une probabilité de 0,5.<br>X = nombre de ventes. X suit B(4 ; 0,5).<br>On sait que 2 parmi 4 = 6.<br><br><b>Combien vaut P(X = 2)</b> ?`,
      reponse: `6 chemins, chacun de probabilité 0,5² × 0,5² = 0,0625.<br>P(X = 2) = 6 × 0,0625 = <span class="big">0,375</span>.`,
      consigne: "Combien vaut P(X = 2) ?",
      verification: { type: "qcm", choix: ["0,375", "0,25", "0,0625"], bonne: 0 },
      dessin: porte,
    },
    {
      tag: "Énigme 3 · La rédactrice web",
      titre: "Au moins un",
      question: `Une rédactrice web envoie 3 articles à des journaux.<br>Chacun est accepté avec une probabilité de 0,2.<br>X = nombre d'articles acceptés. X suit B(3 ; 0,2).<br><br><b>Combien vaut P(X ≥ 1)</b> ?`,
      reponse: `Le contraire de « au moins un » est « aucun ».<br>P(X = 0) = 0,8³ = 0,512.<br>P(X ≥ 1) = 1 − 0,512 = <span class="big">0,488</span>.`,
      consigne: "Combien vaut P(X ≥ 1) ?",
      verification: { type: "qcm", choix: ["0,2", "0,488", "0,6"], bonne: 1 },
      dessin: redactrice,
    },
    {
      tag: "Énigme 4 · Le fabricant de LED",
      titre: "L'espérance",
      question: `Un fabricant de LED en contrôle 200.<br>3 % sont défectueuses.<br>X = nombre de LED défectueuses. X suit B(200 ; 0,03).<br><br><b>Combien de LED défectueuses en moyenne</b> ?`,
      reponse: `E(X) = n × p = 200 × 0,03 = <span class="big">6</span>.<br>Sur beaucoup de contrôles, il y a en moyenne 6 LED défectueuses.`,
      consigne: "Combien vaut E(X) ?",
      verification: { type: "courte", attendus: ["6"] },
      dessin: led,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'installateur de fibre optique",
      sorte: "piege",
      question: `Un installateur de fibre optique fait 3 raccordements.<br>Chacun rate avec une probabilité de 0,2.<br>X = nombre de raccordements ratés. X suit B(3 ; 0,2).<br>Son apprenti calcule : P(X = 1) = 0,2 × 0,8² = 0,128.<br><br><b>Combien vaut vraiment P(X = 1)</b> ?`,
      reponse: `L'apprenti a compté un seul chemin.<br>Il y en a 3 : REE, ERE, EER (1 parmi 3 = 3).<br>P(X = 1) = 3 × 0,128 = <span class="big">0,384</span>.`,
      consigne: "Combien vaut P(X = 1) ?",
      verification: { type: "qcm", choix: ["0,128", "0,2", "0,384"], bonne: 2 },
      dessin: fibre,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le chasseur de têtes",
      sorte: "defi",
      question: `Un chasseur de têtes appelle des candidats.<br>Chacun accepte un entretien avec une probabilité de 0,5.<br>Il veut au moins un oui avec une probabilité de plus de 0,9.<br><br><b>Combien d'appels au minimum</b> ?`,
      reponse: `P(au moins un oui) = 1 − 0,5ⁿ.<br>3 appels : 1 − 0,125 = 0,875, pas assez.<br>4 appels : 1 − 0,0625 = 0,9375.<br>Il faut <span class="big">4</span> appels.`,
      consigne: "Combien d'appels au minimum ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: tetes,
    },
  ],
};

export default problemes;
