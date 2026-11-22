// Énigmes à projeter — STMG (Tle), logarithme : durées et ordres de grandeur
// (le créateur de mots fléchés, le comité des fêtes, la médecine nucléaire,
// le chef à domicile, piège du fonds d'investissement, défi du chantier de
// démolition). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

/** Une carte : trois lignes (la première en grand) et la question. */
const carte = (aria: string, lignes: string[], question: string, coul: string = C.bleu) =>
  svg(aria,
    r(50, 40, 380, 240, coul, 0.1, 3, 14) +
    lignes.map((s, k) => t(240, 105 + k * 70, s, k ? C.pale : C.craie, k ? 24 : 32)).join("") +
    t(240, 365, question, C.rose, 28));

const fleches = carte("Le créateur de mots fléchés : 2 puissance 50 grilles, log de 2 environ 0,301",
  ["N = 2⁵⁰", "log(N) = 50 × log(2) ≈ 15,05", "créateur de mots fléchés"], `combien de chiffres${NB}?`);

const fetes = carte("Le comité des fêtes : un placement à 5 % par an doit doubler",
  ["1,05ⁿ ≥ 2", "placement à 5 % par an", "comité des fêtes"], `combien d'années${NB}?`, C.jaune);

const nucleaire = carte("La médecine nucléaire : 0,85 puissance t égale 0,5",
  ["0,85ᵗ = 0,5", "− 15 % par heure", "médecine nucléaire"], `t${NB}≈${NB}?`);

const chef = carte("Le chef à domicile : 3 000 euros à 6 % par an, objectif 5 000 euros",
  ["3 000 € → 5 000 €", "3 000 × 1,06ⁿ ≥ 5 000", "chef à domicile · 6 % par an"], `combien d'années${NB}?`, C.jaune);

const fonds = carte("Le fonds d'investissement : log de N environ 11,3",
  ["log(N) ≈ 11,3", "un analyste : « 11 chiffres »", "fonds d'investissement"], `combien de chiffres${NB}?`);

const demolition = carte("Le chantier de démolition : L égale 10 fois log de I sur I zéro",
  ["L = 10 × log(I ÷ I₀)", "1 marteau-piqueur : 80 dB", "2 marteaux-piqueurs : ?"], `combien de dB${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "log_applications",
  titre: "Énigmes des durées et ordres de grandeur",
  description: "Le créateur de mots fléchés, le comité des fêtes, la médecine nucléaire, le chef à domicile, le piège du fonds d'investissement, le défi du chantier de démolition : nombre de chiffres avec log, temps de doublement, demi-vie, durée d'un placement et décibels.",
  problemes: [
    {
      tag: "Énigme 1 · Le créateur de mots fléchés",
      titre: "Le nombre de chiffres",
      question: `Un créateur de mots fléchés compte N = 2⁵⁰ grilles possibles.<br>On sait que log(2) ≈ 0,301.<br>Donc log(N) = 50 × log(2) ≈ 15,05.<br><br><b>Combien de chiffres a N</b> ?`,
      reponse: `log(N) ≈ 15,05 : N est entre 10¹⁵ et 10¹⁶.<br>10¹⁵ a 16 chiffres.<br>N a donc <span class="big">16</span> chiffres.`,
      consigne: "Combien de chiffres a N ?",
      verification: { type: "courte", attendus: ["16", "16 chiffres"] },
      dessin: fleches,
    },
    {
      tag: "Énigme 2 · Le comité des fêtes",
      titre: "Le temps de doublement",
      question: `La trésorière d'un comité des fêtes place l'argent de la caisse.<br>Le taux est de 5 % par an.<br>Elle cherche quand la somme aura doublé : 1,05ⁿ ≥ 2.<br><br><b>Au bout de combien d'années</b> ?`,
      reponse: `n ≥ log(2) ÷ log(1,05) ≈ 14,2.<br>Il faut donc <span class="big">15 ans</span>.<br>Vérification : 1,05¹⁴ ≈ 1,98 et 1,05¹⁵ ≈ 2,08.`,
      consigne: "Au bout de combien d'années la somme a-t-elle doublé ?",
      verification: { type: "qcm", choix: ["15 ans", "20 ans", "14 ans"], bonne: 0 },
      dessin: fetes,
    },
    {
      tag: "Énigme 3 · La médecine nucléaire",
      titre: "La demi-vie",
      question: `En médecine nucléaire, un produit perd 15 % de son activité par heure.<br>La demi-vie est la durée t où il en reste la moitié.<br>Il faut résoudre 0,85ᵗ = 0,5.<br><br><b>Combien vaut t, au dixième près</b> ?`,
      reponse: `t = log(0,5) ÷ log(0,85) ≈ 4,27.<br>La demi-vie vaut environ <span class="big">4,3 heures</span>.`,
      consigne: "Combien vaut la demi-vie t, au dixième près ?",
      verification: { type: "courte", attendus: ["4,3", "4.3", "4,27", "4,26"] },
      dessin: nucleaire,
    },
    {
      tag: "Énigme 4 · Le chef à domicile",
      titre: "La durée d'un placement",
      question: `Un chef à domicile place 3 000 € à 6 % par an.<br>Il veut au moins 5 000 € pour acheter un four.<br>Il faut 3 000 × 1,06ⁿ ≥ 5 000.<br><br><b>Au bout de combien d'années</b> ?`,
      reponse: `1,06ⁿ ≥ 5 000 ÷ 3 000 ≈ 1,667.<br>n ≥ log(1,667) ÷ log(1,06) ≈ 8,8.<br>Il faut <span class="big">9 ans</span>.`,
      consigne: "Au bout de combien d'années a-t-il 5 000 € ?",
      verification: { type: "qcm", choix: ["8 ans", "9 ans", "10 ans"], bonne: 1 },
      dessin: chef,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le fonds d'investissement",
      sorte: "piege",
      question: `Un fonds d'investissement gère une somme N en euros.<br>La calculatrice donne log(N) ≈ 11,3.<br>Un analyste dit : « N a 11 chiffres. »<br><br><b>Combien de chiffres a vraiment N</b> ?`,
      reponse: `log(N) ≈ 11,3 : N est entre 10¹¹ et 10¹².<br>10¹¹ = 100 000 000 000 a déjà 12 chiffres.<br>N a <span class="big">12</span> chiffres.`,
      consigne: "Combien de chiffres a N ?",
      verification: { type: "qcm", choix: ["11", "13", "12"], bonne: 2 },
      dessin: fonds,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le chantier de démolition",
      sorte: "defi",
      question: `Sur un chantier de démolition, un marteau-piqueur fait 80 dB.<br>Le niveau sonore est L = 10 × log(I ÷ I₀).<br>Un 2e marteau-piqueur double l'intensité I.<br>On sait que log(2) ≈ 0,301.<br><br><b>Combien de dB font les deux, environ</b> ?`,
      reponse: `Doubler I ajoute 10 × log(2) ≈ 3 dB.<br>L ≈ 80 + 3 = <span class="big">83 dB</span>.<br>Pas 160 dB !`,
      consigne: "Combien de décibels font les deux marteaux-piqueurs ?",
      verification: { type: "courte", attendus: ["83", "83 dB", "83,01"] },
      dessin: demolition,
    },
  ],
};

export default problemes;
