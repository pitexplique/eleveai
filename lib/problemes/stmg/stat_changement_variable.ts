// Énigmes à projeter — STMG (Tle), changement de variable pour linéariser
// (l'application de comptabilité, le studio d'animation 3D, la société de
// micro-crédit, l'usine de microalgues, piège de l'atelier de
// vulcanisation, défi du fabricant de tables rondes). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

/** Une carte : trois lignes (la première en grand) et la question. */
const carte = (aria: string, lignes: string[], question: string, coul: string = C.bleu) =>
  svg(aria,
    r(50, 40, 380, 240, coul, 0.1, 3, 14) +
    lignes.map((s, k) => t(240, 105 + k * 70, s, k ? C.pale : C.craie, k ? 24 : 32)).join("") +
    t(240, 365, question, C.rose, 28));

const compta = carte("L'application de comptabilité : z égale log de y, avec y égal 10 000",
  ["z = log(y)", "y = 10 000 téléchargements", "application de comptabilité"], `z${NB}=${NB}?`);

const animation = carte("Le studio d'animation 3D : z égale 1 sur t, avec t égal 4 heures",
  ["z = 1 ÷ t", "t = 4 heures de rendu", "studio d'animation 3D"], `z${NB}=${NB}?`, C.jaune);

const microcredit = carte("La société de micro-crédit : le nuage x, log y est presque aligné",
  ["(x ; log y) aligné", "log(y) ≈ m x + p", "société de micro-crédit"], `quel modèle pour y${NB}?`);

const algues = carte("L'usine de microalgues : z égale 0,2 x plus 1, avec z égal log de y",
  ["z = 0,2x + 1", "z = log(y) · x = 10", "usine de microalgues"], `y${NB}=${NB}?`, C.jaune);

const vulcanisation = carte("L'atelier de vulcanisation : z égale 1 sur t et z égale 0,5 x",
  ["z = 0,5x · z = 1 ÷ t", "x = 4 · un apprenti : t = 2", "atelier de vulcanisation"], `t${NB}=${NB}?`);

const tables = carte("Le fabricant de tables rondes : y égale 3 u plus 2, avec u égal x au carré",
  ["y = 3u + 2", "u = x² · x = 4 dm", "fabricant de tables rondes"], `y${NB}=${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "stat_changement_variable",
  titre: "Énigmes du changement de variable",
  description: "L'application de comptabilité, le studio d'animation 3D, la société de micro-crédit, l'usine de microalgues, le piège de l'atelier de vulcanisation, le défi du fabricant de tables rondes : on remplace y par log(y), t par 1 ÷ t ou x par x², on ajuste par une droite, puis on revient aux variables de départ.",
  problemes: [
    {
      tag: "Énigme 1 · L'application de comptabilité",
      titre: "Calculer z = log(y)",
      question: `Une application de comptabilité compte ses téléchargements y.<br>Pour linéariser, on pose z = log(y).<br>Un mois, y = 10 000.<br><br><b>Combien vaut z</b> ?`,
      reponse: `10 000 = 10⁴.<br>Donc z = log(10 000) = <span class="big">4</span>.`,
      consigne: "Combien vaut z ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: compta,
    },
    {
      tag: "Énigme 2 · Le studio d'animation 3D",
      titre: "Calculer z = 1 ÷ t",
      question: `Un studio d'animation 3D note la durée t de rendu d'une image.<br>On pose z = 1 ÷ t.<br>Une image demande t = 4 heures.<br><br><b>Combien vaut z</b> ?`,
      reponse: `z = 1 ÷ 4 = <span class="big">0,25</span>.`,
      consigne: "Combien vaut z ?",
      verification: { type: "qcm", choix: ["0,25", "4", "− 4"], bonne: 0 },
      dessin: animation,
    },
    {
      tag: "Énigme 3 · La société de micro-crédit",
      titre: "Lire le nuage transformé",
      question: `Une société de micro-crédit suit son nombre de clients y selon l'année x.<br>Le nuage des points (x ; log y) est presque aligné.<br>Donc log(y) ≈ m x + p.<br><br><b>Quel modèle convient pour y</b> ?`,
      reponse: `log(y) ≈ m x + p donne y ≈ 10^p × (10^m)ˣ.<br>C'est un modèle <span class="big">y = k × aˣ</span> (exponentiel).`,
      consigne: "Quel modèle convient pour y ?",
      verification: { type: "qcm", choix: ["y = ax + b", "y = a × x²", "y = k × aˣ"], bonne: 2 },
      dessin: microcredit,
    },
    {
      tag: "Énigme 4 · L'usine de microalgues",
      titre: "Revenir à y",
      question: `Une usine de microalgues mesure sa production y.<br>On a posé z = log(y).<br>L'ajustement donne z = 0,2x + 1.<br><br><b>Combien vaut y pour x = 10</b> ?`,
      reponse: `z = 0,2 × 10 + 1 = 3.<br>log(y) = 3, donc y = 10³ = <span class="big">1 000</span>.`,
      consigne: "Combien vaut y pour x = 10 ?",
      verification: { type: "courte", attendus: ["1 000", "1000", "10^3"] },
      dessin: algues,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'atelier de vulcanisation",
      sorte: "piege",
      question: `Un atelier de vulcanisation note la durée t d'une réparation.<br>On a posé z = 1 ÷ t et ajusté : z = 0,5x.<br>Pour x = 4, z = 2.<br>Un apprenti conclut : « t = 2 heures. »<br><br><b>Combien vaut vraiment t</b> ?`,
      reponse: `z = 2, mais z = 1 ÷ t.<br>Il faut revenir à t : t = 1 ÷ 2 = <span class="big">0,5 heure</span>.`,
      consigne: "Combien vaut vraiment t ?",
      verification: { type: "qcm", choix: ["2", "0,5", "4"], bonne: 1 },
      dessin: vulcanisation,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le fabricant de tables rondes",
      sorte: "defi",
      question: `Un fabricant de tables rondes fixe le prix y (en €) selon le rayon x (en dm).<br>On a posé u = x² et ajusté : y = 3u + 2.<br><br><b>Combien coûte une table de rayon x = 4 dm</b> ?`,
      reponse: `u = 4² = 16.<br>y = 3 × 16 + 2 = <span class="big">50 €</span>.`,
      consigne: "Combien coûte une table de rayon 4 dm ?",
      verification: { type: "courte", attendus: ["50", "50 €"] },
      dessin: tables,
    },
  ],
};

export default problemes;
