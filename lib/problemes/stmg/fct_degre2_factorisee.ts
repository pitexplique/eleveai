// Énigmes à projeter — STMG (1re), notion degré 2 : racines et signe (forme
// factorisée) (le grossiste en fruits, le fabricant de chaises de jardin, les
// bateaux-mouches, le studio d'enregistrement, piège des tablettes graphiques,
// défi des bananes de Sainte-Suzanne). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

const fruits = svg("Le grossiste en fruits : S de x égale 3 fois x moins 4 fois x plus 2",
  r(50, 90, 380, 100, C.bleu, 0.15, 3, 10) + t(240, 155, "S(x) = 3(x − 4)(x + 2)", C.craie, 30) +
    t(240, 270, `S(x) = 0 pour x${NB}=${NB}?`, C.rose, 26));

// Tableau de signes dessiné à la main : colonnes −∞ (170), 1 (255), 5 (355), +∞ (440).
const ligneSignes = (y: number, vals: [number, string][]) => vals.map(([x, v]) => t(x, y, v, C.craie, 24)).join("");
const chaises = svg("Tableau de signes de 2 fois x moins 1 fois x moins 5 ; le signe entre 1 et 5 est à trouver",
  t(240, 46, "E(x) = 2(x − 1)(x − 5)", C.craie, 26) +
    r(20, 70, 440, 260, C.craie, 0, 3) + l(140, 70, 140, 330, C.craie, 2) +
    [130, 195, 260].map((y) => l(20, y, 460, y, C.craie, 2)).join("") +
    t(80, 108, "x", C.pale, 24) + t(80, 172, "x − 1", C.pale, 22) + t(80, 237, "x − 5", C.pale, 22) + t(80, 302, "E(x)", C.pale, 22) +
    ligneSignes(108, [[170, "−∞"], [255, "1"], [355, "5"], [440, "+∞"]]) +
    ligneSignes(172, [[205, "−"], [255, "0"], [305, "+"], [400, "+"]]) +
    ligneSignes(237, [[205, "−"], [305, "−"], [355, "0"], [400, "+"]]) +
    ligneSignes(302, [[205, "+"], [255, "0"], [355, "0"], [400, "+"]]) + t(305, 302, "?", C.rose, 30));

const bateaux = svg("Les bateaux-mouches : B de x égale moins x moins 2 fois x moins 10 ; B de x positif ou nul ?",
  r(40, 90, 400, 100, C.jaune, 0.2, 3, 10) + t(240, 155, "B(x) = −(x − 2)(x − 10)", C.craie, 30) +
    t(240, 280, `B(x) ≥ 0${NB}?`, C.rose, 30));

const studio = svg("Le studio d'enregistrement : B de x égale moins 5 fois x moins 20 fois x moins 60 ; x est le prix de l'heure",
  r(30, 80, 420, 100, C.bleu, 0.15, 3, 10) + t(240, 145, "B(x) = −5(x − 20)(x − 60)", C.craie, 28) +
    t(240, 250, "x = prix de l'heure, en €", C.pale, 22) + t(240, 330, `plus grand prix entier${NB}?`, C.rose, 26));

const tablettes = svg("Les tablettes graphiques : f de x égale moins 2 fois x moins 1 fois x moins 4 ; Tom dit négatif entre 1 et 4",
  r(40, 70, 400, 100, C.jaune, 0.2, 3, 10) + t(240, 135, "f(x) = −2(x − 1)(x − 4)", C.craie, 30) +
    t(240, 240, "Tom : « entre 1 et 4,", C.pale, 24) + t(240, 290, "f(x) est négatif »", C.pale, 24) +
    t(240, 370, `f(2)${NB}=${NB}?`, C.rose, 30));

const bananes = svg("Les bananes de Sainte-Suzanne : E de x égale x moins 4 fois x moins 12 ; combien d'entiers rendent E de x négatif ?",
  r(60, 90, 360, 100, C.bleu, 0.15, 3, 10) + t(240, 155, "E(x) = (x − 4)(x − 12)", C.craie, 30) +
    t(240, 260, "E(x) &lt; 0", C.craie, 30) + t(240, 335, `combien d'entiers${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "fct_degre2_factorisee",
  titre: "Énigmes de racines et de signes",
  description: "Le grossiste en fruits, le fabricant de chaises de jardin, les bateaux-mouches, le studio d'enregistrement, le piège des tablettes graphiques, le défi des bananes de Sainte-Suzanne : lire les racines d'une forme factorisée, trouver son signe et résoudre une inéquation.",
  problemes: [
    {
      tag: "Énigme 1 · Le grossiste en fruits",
      titre: "Les racines",
      question: `Un grossiste en fruits calcule un écart S(x) = 3(x − 4)(x + 2).<br><br><b>Pour quelles valeurs</b> de x a-t-on S(x) = 0 ?`,
      reponse: `Un produit est nul si un facteur est nul.<br>x − 4 = 0 donne x = 4. x + 2 = 0 donne x = −2.<br>Les racines sont <span class="big">4 et −2</span>.`,
      consigne: "S(x) = 3(x − 4)(x + 2). Quelles sont les racines ?",
      verification: { type: "qcm", choix: ["4 et 2", "4 et −2", "−4 et 2"], bonne: 1 },
      dessin: fruits,
    },
    {
      tag: "Énigme 2 · Les chaises de jardin",
      titre: "Le tableau de signes",
      question: `Un fabricant de chaises de jardin étudie E(x) = 2(x − 1)(x − 5).<br>Il remplit un tableau de signes.<br><br><b>Quel est le signe</b> de E(x) entre 1 et 5 ?`,
      reponse: `Entre 1 et 5 : x − 1 est positif, x − 5 est négatif.<br>2 est positif. + × + × − donne −.<br>E(x) est <span class="big">négatif</span> entre 1 et 5.`,
      consigne: "E(x) = 2(x − 1)(x − 5). Signe de E(x) entre 1 et 5 ?",
      verification: { type: "qcm", choix: ["négatif", "positif", "nul"], bonne: 0 },
      dessin: chaises,
    },
    {
      tag: "Énigme 3 · Les bateaux-mouches",
      titre: "Résoudre une inéquation",
      question: `Une compagnie de bateaux-mouches fait x croisières par jour.<br>Son bénéfice vaut B(x) = −(x − 2)(x − 10).<br><br><b>Pour quels x</b> a-t-on B(x) ≥ 0 ?`,
      reponse: `Les racines sont 2 et 10. a = −1 est négatif.<br>La parabole est tournée vers le bas : positive entre les racines.<br>B(x) ≥ 0 pour <span class="big">x entre 2 et 10</span>.`,
      consigne: "B(x) = −(x − 2)(x − 10). Pour quels x a-t-on B(x) ≥ 0 ?",
      verification: { type: "qcm", choix: ["x ≤ 2 ou x ≥ 10", "x ≥ 10", "x entre 2 et 10"], bonne: 2 },
      dessin: bateaux,
    },
    {
      tag: "Énigme 4 · Le studio d'enregistrement",
      titre: "Le bénéfice positif",
      question: `Un studio d'enregistrement loue une heure au prix de x euros.<br>Son bénéfice vaut B(x) = −5(x − 20)(x − 60).<br>Il est positif entre les deux racines.<br><br><b>Quel est le plus grand prix entier</b> avec un bénéfice positif ?`,
      reponse: `Les racines sont 20 et 60.<br>B(x) > 0 pour x entre 20 et 60, sans 60 : B(60) = 0.<br>Le plus grand prix entier est <span class="big">59 €</span>.`,
      consigne: "B(x) = −5(x − 20)(x − 60). Plus grand x entier avec B(x) > 0 ?",
      verification: { type: "courte", attendus: ["59"], unite: "€" },
      dessin: studio,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les tablettes graphiques",
      sorte: "piege",
      question: `Une marque de tablettes graphiques étudie f(x) = −2(x − 1)(x − 4).<br>Tom : « Entre les racines 1 et 4, f(x) est négatif. »<br><br><b>Calcule f(2)</b> pour vérifier.`,
      reponse: `f(2) = −2 × (2 − 1) × (2 − 4) = −2 × 1 × (−2).<br>f(2) = <span class="big">4</span> : c'est positif.<br>Ici a = −2 est négatif : f(x) est positif entre les racines.`,
      consigne: "f(x) = −2(x − 1)(x − 4). Calcule f(2).",
      verification: { type: "courte", attendus: ["4"] },
      dessin: tablettes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les bananes de Sainte-Suzanne",
      sorte: "defi",
      question: `Un producteur de bananes de Sainte-Suzanne (974) livre x caisses par heure.<br>Son écart vaut E(x) = (x − 4)(x − 12).<br>Quand E(x) est négatif, il perd de l'argent.<br><br><b>Combien d'entiers x</b> donnent E(x) &lt; 0 ?`,
      reponse: `Les racines sont 4 et 12. a = 1 est positif.<br>E(x) est négatif entre 4 et 12, sans 4 ni 12.<br>Les entiers 5, 6, 7, 8, 9, 10, 11 : il y en a <span class="big">7</span>.`,
      consigne: "E(x) = (x − 4)(x − 12). Combien d'entiers x donnent E(x) < 0 ?",
      verification: { type: "courte", attendus: ["7"] },
      dessin: bananes,
    },
  ],
};

export default problemes;
