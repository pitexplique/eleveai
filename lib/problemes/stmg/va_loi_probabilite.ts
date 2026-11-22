// Énigmes à projeter — STMG (1re), notion variable aléatoire : loi de probabilité
// (le standard de la mairie, le fabricant de lessive, la location saisonnière,
// le vendeur de fauteuils, piège du stand de gaufres, défi de la fête de l'ail
// de Petite-Île, 974). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, o, r, svg, t } from "../dessins-ecole";
import { tableau } from "../dessins-2de";

const coul = (rose: [number, number][]) => (i: number, j: number) =>
  rose.some(([a, b]) => a === i && b === j) ? C.rose : j === 0 ? C.pale : C.craie;

const standard = svg("Standard de la mairie : X est le nombre d'appels en une minute ; que veut dire X inférieur ou égal à 2 ?",
  t(240, 80, "X = nombre d'appels", C.pale, 24) + t(240, 115, "en une minute", C.pale, 24) +
    r(140, 150, 200, 100, C.bleu, 0.15, 3, 10) + t(240, 218, "{X ≤ 2}", C.craie, 44) +
    t(240, 340, `que veut dire cette écriture${NB}?`, C.rose, 25));

const lessive = svg("Lessive : X nombre de taches qui restent ; 0 : 0,5 ; 1 : 0,3 ; 2 : 0,15 ; 3 : 0,05",
  tableau(25, 70, [110, 80, 80, 80, 80], 60, [["x", 0, 1, 2, 3], ["P(X = x)", "0,5", "0,3", "0,15", "0,05"]], coul([[1, 3], [1, 4]]), 21) +
    t(240, 250, "X = nombre de taches qui restent", C.pale, 21) +
    t(240, 340, `au moins 2 taches${NB}?`, C.rose, 28));

const studio = svg("Location saisonnière : sur 20 week-ends, 4 sans réservation, 6 avec une nuit, 10 avec deux nuits",
  tableau(40, 60, [160, 80, 80, 80], 60, [["nuits louées", 0, 1, 2], ["week-ends", 4, 6, 10]], coul([]), 22) +
    t(240, 230, "20 week-ends en tout", C.pale, 22) +
    t(240, 270, "X = nuits louées un week-end", C.pale, 22) +
    t(240, 350, `la loi de X${NB}?`, C.rose, 28));

const fauteuils = svg("Fauteuils vendus en un jour : 0 : 0,1 ; 1 : 0,25 ; 2 : 0,35 ; 3 : 0,2 ; 4 : 0,1",
  tableau(15, 70, [110, 70, 70, 70, 70, 70], 60, [["x", 0, 1, 2, 3, 4], ["P(X = x)", "0,1", "0,25", "0,35", "0,2", "0,1"]], coul([[1, 1], [1, 2], [1, 3]]), 20) +
    t(240, 250, "X = fauteuils vendus en un jour", C.pale, 21) +
    t(240, 340, `P(X ≤ 2)${NB}?`, C.rose, 32));

const gaufres = svg("Stand de gaufres : X nombre de gaufres achetées ; 1 : 0,5 ; 2 : 0,3 ; 3 : Lina a écrit 0,3",
  tableau(40, 60, [160, 80, 80, 80], 60, [["gaufres", 1, 2, 3], ["probabilité", "0,5", "0,3", "0,3 ?"]], coul([[1, 3]]), 22) +
    t(240, 230, "X = gaufres achetées par un client", C.pale, 21) +
    t(240, 270, "Lina : « 0,3 pour 3 gaufres »", C.pale, 22) +
    t(240, 350, `la bonne valeur${NB}?`, C.rose, 28));

const piece = (cx: number, cy: number, s: string) => o(cx, cy, 34, C.jaune, 0.2, 3) + t(cx, cy + 9, s, C.craie, 24);
const ail = svg("Fête de l'ail de Petite-Île : on lance deux pièces ; deux piles 5 euros, un pile 1 euro, aucun pile 0 euro",
  piece(190, 85, "P") + piece(290, 85, "F") +
    t(240, 170, "2 piles : 5 €", C.craie, 24) + t(240, 208, "1 pile : 1 €", C.craie, 24) + t(240, 246, "0 pile : 0 €", C.craie, 24) +
    t(240, 290, "X = le gain", C.pale, 22) +
    t(240, 360, `P(X ≥ 1)${NB}?`, C.rose, 32));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "va_loi_probabilite",
  titre: "Énigmes de la loi de probabilité",
  description: "Le standard de la mairie, le fabricant de lessive, la location saisonnière, le vendeur de fauteuils, le piège du stand de gaufres, le défi de la fête de l'ail de Petite-Île : lire {X ≤ a}, calculer P(X = a) et P(X ≤ a), dresser une loi et vérifier que la somme vaut 1.",
  problemes: [
    {
      tag: "Énigme 1 · Le standard de la mairie",
      titre: "Lire l'écriture",
      question: `Le standard de la mairie reçoit des appels.<br>X est le nombre d'appels en une minute.<br><br><b>Que veut dire {X ≤ 2}</b> ?`,
      reponse: `X ≤ 2 : X vaut 0, 1 ou 2.<br><span class="big">Au plus 2 appels en une minute</span>.`,
      consigne: "Que veut dire {X ≤ 2} ?",
      verification: { type: "qcm", choix: ["au plus 2 appels", "au moins 2 appels", "exactement 2 appels"], bonne: 0 },
      dessin: standard,
    },
    {
      tag: "Énigme 2 · Le fabricant de lessive",
      titre: "Calculer une probabilité",
      question: `Un fabricant de lessive teste un lavage.<br>X est le nombre de taches qui restent sur le linge.<br><br><b>Quelle est la proba</b> qu'il reste au moins 2 taches ?`,
      reponse: `Au moins 2 : X = 2 ou X = 3.<br>0,15 + 0,05 = <span class="big">0,2</span>.`,
      consigne: "Proba qu'il reste au moins 2 taches ?",
      verification: { type: "courte", attendus: ["0,2", "0.2", "0,20", "20 %", "20%"] },
      dessin: lessive,
    },
    {
      tag: "Énigme 3 · La location saisonnière",
      titre: "Dresser la loi",
      question: `Une propriétaire loue un studio le week-end.<br>Sur 20 week-ends : 4 sans réservation, 6 avec une nuit, 10 avec deux nuits.<br>X est le nombre de nuits louées.<br><br><b>Quelle est la loi de X</b> (pour 0, 1, 2 nuits) ?`,
      reponse: `On divise chaque nombre par 20.<br>4 ÷ 20 = 0,2 · 6 ÷ 20 = 0,3 · 10 ÷ 20 = 0,5.<br><span class="big">0,2 ; 0,3 ; 0,5</span>. La somme vaut bien 1.`,
      consigne: "Loi de X pour 0, 1, 2 nuits ?",
      verification: { type: "qcm", choix: ["0,2 ; 0,3 ; 0,4", "0,2 ; 0,3 ; 0,5", "4 ; 6 ; 10"], bonne: 1 },
      dessin: studio,
    },
    {
      tag: "Énigme 4 · Le vendeur de fauteuils",
      titre: "Calculer P(X ≤ a)",
      question: `Un vendeur de fauteuils note ses ventes.<br>X est le nombre de fauteuils vendus en un jour.<br><br><b>Combien vaut P(X ≤ 2)</b> ?`,
      reponse: `X ≤ 2 : X vaut 0, 1 ou 2.<br>0,1 + 0,25 + 0,35 = <span class="big">0,7</span>.`,
      consigne: "Combien vaut P(X ≤ 2) ?",
      verification: { type: "qcm", choix: ["0,35", "0,6", "0,7"], bonne: 2 },
      dessin: fauteuils,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le stand de gaufres",
      sorte: "piege",
      question: `Un stand de gaufres note les achats.<br>X est le nombre de gaufres achetées par un client.<br>P(X = 1) = 0,5 et P(X = 2) = 0,3.<br>Lina écrit P(X = 3) = 0,3.<br><br><b>Quelle est la bonne valeur</b> de P(X = 3) ?`,
      reponse: `La somme des probabilités doit valoir 1.<br>Avec Lina : 0,5 + 0,3 + 0,3 = 1,1. C'est trop.<br>1 − 0,5 − 0,3 = <span class="big">0,2</span>.`,
      consigne: "Bonne valeur de P(X = 3) ?",
      verification: { type: "courte", attendus: ["0,2", "0.2", "0,20", "20 %", "20%"] },
      dessin: gaufres,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La fête de l'ail de Petite-Île",
      sorte: "defi",
      question: `À la fête de l'ail de Petite-Île, un stand propose un jeu.<br>On lance deux pièces.<br>Deux piles : 5 €. Un seul pile : 1 €. Aucun pile : 0 €.<br>X est le gain.<br><br><b>Combien vaut P(X ≥ 1)</b> ?`,
      reponse: `Quatre issues pareilles : PP, PF, FP, FF.<br>X = 0 seulement pour FF : P(X = 0) = 0,25.<br>P(X ≥ 1) = 1 − 0,25 = <span class="big">0,75</span>.`,
      consigne: "Combien vaut P(X ≥ 1) ?",
      verification: { type: "courte", attendus: ["0,75", "0.75", "3/4", "75 %", "75%"] },
      dessin: ail,
    },
  ],
};

export default problemes;
