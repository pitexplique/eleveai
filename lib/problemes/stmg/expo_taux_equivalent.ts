// Énigmes à projeter — STMG (Tle), taux équivalent sur une autre période
// (le tisserand, la boutique de sneakers, le terrain de paintball, la boutique
// de cosplay, piège de l'école de pilotage, défi de la chaîne de télé locale).
// 21/11/2026.
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

const tisserand = carte("Le tisserand : plus 5 pour cent par an en moyenne pendant 3 ans ; quelle hausse en tout ?",
  ["+ 5 % par an, 3 ans", `CM global = ${ex("1,05", "3")}`, "pièces de tissu vendues"], `hausse globale${NB}?`);

const sneakers = carte("La boutique de sneakers : plus 12,68 pour cent par an ; quel taux par mois ?",
  ["+ 12,68 % par an", `CM mensuel = ${ex("1,1268", "1/12")}`, "12 mois dans un an"], `taux par mois${NB}?`, C.jaune);

const paintball = carte("Le terrain de paintball : plus 4 pour cent par an en moyenne pendant 10 ans ; que veut dire cette phrase ?",
  ["+ 4 % par an", "en moyenne, pendant 10 ans", "entrées du paintball"], `ça veut dire${NB}?`);

const cosplay = carte("La boutique de cosplay : plus 2 pour cent par mois ; quel taux par an ?",
  ["+ 2 % par mois", `CM annuel = ${ex("1,02", "12")}`, "arrondi à 0,1 %"], `taux par an${NB}?`, C.jaune);

const pilotage = carte("L'école de pilotage : plus 1 pour cent par mois ; le directeur dit plus 12 pour cent par an",
  ["+ 1 % par mois", "le directeur : « + 12 % par an »", "nombre d'élèves pilotes"], `qui a raison${NB}?`);

const tele = carte("La chaîne de télé locale : plus 10 pour cent par trimestre ; quel taux par an ?",
  ["+ 10 % par trimestre", "4 trimestres dans un an", "abonnés de la chaîne"], `taux par an${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "expo_taux_equivalent",
  titre: "Énigmes du taux équivalent",
  description: "Le tisserand, la boutique de sneakers, le terrain de paintball, la boutique de cosplay, le piège de l'école de pilotage, le défi de la chaîne de télé locale : passer d'un taux annuel à un taux mensuel, d'un taux moyen à un taux global, et interpréter un taux moyen.",
  problemes: [
    {
      tag: "Énigme 1 · Le tisserand",
      titre: "Du taux moyen au taux global",
      question: `Un tisserand vend 5 % de pièces de tissu en plus chaque année, en moyenne.<br>Cela dure 3 ans.<br>Le coefficient global est 1,05³ ≈ 1,1576.<br><br><b>Quelle est la hausse globale sur 3 ans</b> ?`,
      reponse: `1,05 × 1,05 × 1,05 = 1,157625.<br>La hausse globale est d'environ <span class="big">+ 15,76 %</span>.<br>Pas 15 % : chaque hausse porte sur un nombre déjà augmenté.`,
      consigne: "Quelle hausse globale ?",
      verification: { type: "qcm", choix: ["+ 15,76 %", "+ 15 %", "+ 5 %"], bonne: 0 },
      dessin: tisserand,
    },
    {
      tag: "Énigme 2 · La boutique de sneakers",
      titre: "Du taux annuel au taux mensuel",
      question: `Une boutique de sneakers voit ses ventes monter de 12,68 % par an.<br>Le coefficient mensuel équivalent est 1,1268<sup>1/12</sup>.<br>La calculatrice donne 1,01.<br><br><b>Quel est le taux mensuel équivalent, en %</b> ?`,
      reponse: `Un coefficient de 1,01, c'est <span class="big">+ 1 %</span> par mois.<br>Vérification : 1,01<sup>12</sup> ≈ 1,1268.`,
      consigne: "Quel taux par mois, en % ?",
      verification: { type: "courte", attendus: ["1", "+1", "1%", "+1%"], unite: "%" },
      dessin: sneakers,
    },
    {
      tag: "Énigme 3 · Le terrain de paintball",
      titre: "Lire un taux moyen",
      question: `Un terrain de paintball annonce :<br>« En 10 ans, nos entrées ont augmenté en moyenne de 4 % par an. »<br><br><b>Que veut dire cette phrase</b> ?`,
      reponse: `Les hausses ont pu varier d'une année à l'autre.<br>Mais le total est <span class="big">le même qu'avec + 4 % chaque année</span>.<br>En tout : 1,04<sup>10</sup> ≈ 1,48, soit + 48 %, pas + 40 %.`,
      consigne: "Que veut dire la phrase ?",
      verification: { type: "qcm", choix: ["+ 4 % exactement chaque année", "le même total que + 4 % chaque année", "+ 40 % en tout"], bonne: 1 },
      dessin: paintball,
    },
    {
      tag: "Énigme 4 · La boutique de cosplay",
      titre: "Du taux mensuel au taux annuel",
      question: `Une boutique de cosplay gagne 2 % de clients chaque mois.<br>Sur un an, le coefficient est 1,02<sup>12</sup>.<br><br><b>Quel est le taux annuel équivalent, arrondi à 0,1 %</b> ?`,
      reponse: `À la calculatrice : 1,02<sup>12</sup> ≈ 1,268.<br>Le taux annuel est d'environ <span class="big">+ 26,8 %</span>.<br>C'est plus que 12 × 2 = 24 %.`,
      consigne: "Quel taux par an, en % ?",
      verification: { type: "courte", attendus: ["26,8", "+26,8", "26.8", "26,8%"], unite: "%" },
      dessin: cosplay,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'école de pilotage",
      sorte: "piege",
      question: `Une école de pilotage gagne 1 % d'élèves chaque mois.<br>Le directeur dit : « 12 mois × 1 % = 12 %, donc + 12 % par an ».<br><br><b>Quel est le vrai taux annuel</b> ?`,
      reponse: `Les hausses se multiplient : 1,01<sup>12</sup> ≈ 1,1268.<br>Le vrai taux est <span class="big">+ 12,68 %</span> par an.<br>On n'additionne pas des taux successifs.`,
      consigne: "Quel est le vrai taux annuel ?",
      verification: { type: "qcm", choix: ["+ 12 %", "+ 1,2 %", "+ 12,68 %"], bonne: 2 },
      dessin: pilotage,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La chaîne de télé locale",
      sorte: "defi",
      question: `Une chaîne de télé locale gagne 10 % d'abonnés chaque trimestre.<br>Il y a 4 trimestres dans un an.<br><br><b>Quel est le taux annuel équivalent, en %</b> ?`,
      reponse: `Coefficient annuel : 1,1<sup>4</sup> = 1,1 × 1,1 × 1,1 × 1,1 = 1,4641.<br>Le taux annuel est <span class="big">+ 46,41 %</span>.<br>Pas 40 % : les hausses se multiplient.`,
      consigne: "Quel taux par an, en % ?",
      verification: { type: "courte", attendus: ["46,41", "+46,41", "46.41", "46,41%", "46,4"], unite: "%" },
      dessin: tele,
    },
  ],
};

export default problemes;
