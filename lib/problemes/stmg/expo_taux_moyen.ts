// Énigmes à projeter — STMG (Tle), taux d'évolution moyen (le stand de tir,
// le cabinet de podologie, la salaison, l'étude d'huissier, piège de la
// vitrerie, défi des achards de Saint-Benoît). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

/** Un exposant dans un texte de dessin : la base, puis l'exposant en haut. */
const ex = (base: string, e: string, suite = "") =>
  `${base}<tspan dy="-12" font-size="20">${e}</tspan>${suite ? `<tspan dy="12" dx="6">${suite}</tspan>` : ""}`;

/** Une carte : trois lignes (la première en grand) et la question. */
const carte = (aria: string, lignes: string[], question: string, coul: string = C.bleu) =>
  svg(aria,
    r(50, 40, 380, 240, coul, 0.1, 3, 14) +
    lignes.map((s, k) => t(240, 105 + k * 70, s, k ? C.pale : C.craie, k ? 24 : 32)).join("") +
    t(240, 365, question, C.rose, 28));

const tir = carte("Le stand de tir : 1,44 puissance un demi égale combien ?",
  [`${ex("1,44", "1/2")} = ?`, "licenciés × 1,44 en 2 ans", "coefficient moyen par an"], `combien${NB}?`);

const podologue = carte("Le cabinet de podologie : plus 21 pour cent en 2 ans ; quel taux moyen par an ?",
  ["+ 21 % en 2 ans", `CM = ${ex("1,21", "1/2")}`, "même taux chaque année"], `taux moyen${NB}?`, C.jaune);

const salaison = carte("La salaison : chiffre d'affaires multiplié par 1,331 en 3 ans ; quel taux moyen par an ?",
  ["× 1,331 en 3 ans", `CM = ${ex("1,331", "1/3")}`, "chiffre d'affaires"], `taux moyen${NB}?`);

const huissier = carte("L'étude d'huissier : moins 19 pour cent en 2 ans ; quel taux moyen par an ?",
  ["− 19 % en 2 ans", `CM = ${ex("0,81", "1/2")}`, "nombre de dossiers"], `taux moyen${NB}?`, C.jaune);

const vitrerie = carte("La vitrerie : plus 60 pour cent puis moins 10 pour cent ; le patron dit plus 25 pour cent par an en moyenne",
  ["+ 60 % puis − 10 %", "le patron : « + 25 % par an »", "en moyenne sur 2 ans"], `qui a raison${NB}?`);

const achards = carte("Les achards de Saint-Benoît : ventes doublées en 5 ans ; quel taux moyen par an ?",
  ["ventes × 2 en 5 ans", `CM = ${ex("2", "1/5")}`, "arrondi à 0,1 %"], `taux moyen${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "expo_taux_moyen",
  titre: "Énigmes du taux d'évolution moyen",
  description: "Le stand de tir, le cabinet de podologie, la salaison, l'étude d'huissier, le piège de la vitrerie, le défi des achards de Saint-Benoît : calculer un coefficient moyen avec l'exposant 1/n et voir que le taux moyen n'est pas la moyenne des taux.",
  problemes: [
    {
      tag: "Énigme 1 · Le stand de tir",
      titre: "L'exposant 1/2",
      question: `Un stand de tir a multiplié ses licenciés par 1,44 en 2 ans.<br>Le coefficient moyen par an est 1,44<sup>1/2</sup>.<br>C'est le nombre qui, au carré, donne 1,44.<br><br><b>Combien vaut 1,44<sup>1/2</sup></b> ?`,
      reponse: `1,2 × 1,2 = 1,44.<br>Donc 1,44<sup>1/2</sup> = <span class="big">1,2</span> : + 20 % par an en moyenne.`,
      consigne: "Combien vaut 1,44 puissance 1/2 ?",
      verification: { type: "courte", attendus: ["1,2", "1.2"] },
      dessin: tir,
    },
    {
      tag: "Énigme 2 · Le cabinet de podologie",
      titre: "Le taux moyen sur 2 ans",
      question: `Un cabinet de podologie a gagné 21 % de patients en 2 ans.<br>Le coefficient global est 1,21.<br>Le coefficient moyen par an est 1,21<sup>1/2</sup>.<br><br><b>Quel est le taux moyen par an</b> ?`,
      reponse: `1,21<sup>1/2</sup> = 1,1 car 1,1 × 1,1 = 1,21.<br>Le taux moyen est <span class="big">+ 10 %</span> par an.<br>Pas 10,5 % : les hausses se multiplient.`,
      consigne: "Quel taux moyen par an ?",
      verification: { type: "qcm", choix: ["10 %", "10,5 %", "21 %"], bonne: 0 },
      dessin: podologue,
    },
    {
      tag: "Énigme 3 · La salaison",
      titre: "Le taux moyen sur 3 ans",
      question: `Une salaison a multiplié son chiffre d'affaires par 1,331 en 3 ans.<br>Le coefficient moyen par an est 1,331<sup>1/3</sup>.<br>La calculatrice donne 1,1.<br><br><b>Quel est le taux moyen par an, en %</b> ?`,
      reponse: `1,1 × 1,1 × 1,1 = 1,331 : le compte est bon.<br>Un coefficient de 1,1, c'est <span class="big">+ 10 %</span> par an.`,
      consigne: "Quel taux moyen par an, en % ?",
      verification: { type: "courte", attendus: ["10", "+10", "10%", "+10%"], unite: "%" },
      dessin: salaison,
    },
    {
      tag: "Énigme 4 · L'étude d'huissier",
      titre: "Une baisse moyenne",
      question: `Une étude d'huissier a perdu 19 % de dossiers en 2 ans.<br>Le coefficient global est 0,81.<br>Le coefficient moyen par an est 0,81<sup>1/2</sup>.<br><br><b>Quel est le taux moyen par an</b> ?`,
      reponse: `0,81<sup>1/2</sup> = 0,9 car 0,9 × 0,9 = 0,81.<br>Un coefficient de 0,9, c'est <span class="big">− 10 %</span> par an.`,
      consigne: "Quel taux moyen par an ?",
      verification: { type: "qcm", choix: ["− 9,5 %", "− 10 %", "− 19 %"], bonne: 1 },
      dessin: huissier,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La vitrerie",
      sorte: "piege",
      question: `Une vitrerie a vendu 60 % de vitres en plus la 1re année.<br>La 2e année, ses ventes ont baissé de 10 %.<br>Le patron dit : « (60 − 10) ÷ 2 = 25, donc + 25 % par an en moyenne ».<br><br><b>Quel est le vrai taux moyen</b> ?`,
      reponse: `Coefficient global : 1,6 × 0,9 = 1,44.<br>Coefficient moyen : 1,44<sup>1/2</sup> = 1,2.<br>Le vrai taux moyen est <span class="big">+ 20 %</span>.<br>Le taux moyen n'est pas la moyenne des taux : 1,25 × 1,25 = 1,5625, pas 1,44.`,
      consigne: "Quel est le vrai taux moyen ?",
      verification: { type: "qcm", choix: ["+ 25 %", "+ 44 %", "+ 20 %"], bonne: 2 },
      dessin: vitrerie,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les achards de Saint-Benoît",
      sorte: "defi",
      question: `Une petite entreprise de Saint-Benoît fabrique des achards.<br>Ses ventes ont doublé en 5 ans.<br>Le coefficient moyen par an est 2<sup>1/5</sup>.<br><br><b>Quel est le taux moyen par an, arrondi à 0,1 %</b> ?`,
      reponse: `À la calculatrice : 2<sup>1/5</sup> ≈ 1,1487.<br>Le taux moyen est d'environ <span class="big">+ 14,9 %</span> par an.<br>Vérification : 1,149 × 1,149 × 1,149 × 1,149 × 1,149 ≈ 2. Pas 20 % !`,
      consigne: "Quel taux moyen par an, en % ?",
      verification: { type: "courte", attendus: ["14,9", "+14,9", "14.9", "14,9%"], unite: "%" },
      dessin: achards,
    },
  ],
};

export default problemes;
