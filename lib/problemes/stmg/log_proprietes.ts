// Énigmes à projeter — STMG (Tle), propriétés algébriques de log (le
// réparateur de vélos, le maréchal-ferrant, le bourrelier, le pêcheur de
// langoustes, piège du studio de doublage, défi du loueur de yachts).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

/** Une carte : trois lignes (la première en grand) et la question. */
const carte = (aria: string, lignes: string[], question: string, coul: string = C.bleu) =>
  svg(aria,
    r(50, 40, 380, 240, coul, 0.1, 3, 14) +
    lignes.map((s, k) => t(240, 105 + k * 70, s, k ? C.pale : C.craie, k ? 24 : 32)).join("") +
    t(240, 365, question, C.rose, 28));

const velos = carte("Le réparateur de vélos : log de 2 plus log de 5 égale combien ?",
  ["log(2) + log(5) = ?", "log(a) + log(b) = log(ab)", "réparateur de vélos"], `combien${NB}?`);

const marechal = carte("Le maréchal-ferrant : log de 200 moins log de 2 égale combien ?",
  ["log(200) − log(2) = ?", "log(a) − log(b) = log(a ÷ b)", "maréchal-ferrant"], `combien${NB}?`, C.jaune);

const bourrelier = carte("Le bourrelier : log de 2 puissance 5, avec log de 2 environ 0,301",
  ["log(2⁵) = ?", "log(aⁿ) = n × log(a)", "log(2) ≈ 0,301"], `combien${NB}?`);

const langoustes = carte("Le pêcheur de langoustes : log de 1 sur 1 000 égale combien ?",
  ["log(1 ÷ 1 000) = ?", "log(1 ÷ b) = − log(b)", "log(1 000) = 3"], `combien${NB}?`, C.jaune);

const doublage = carte("Le studio de doublage : il écrit log de 2 plus log de 8 égale log de 10",
  ["log(2) + log(8) = ?", "l'ingénieur : « log(10) = 1 »", "car 2 + 8 = 10"], `qui a raison${NB}?`);

const yachts = carte("Le loueur de yachts : log de 5, avec log de 2 environ 0,301",
  ["log(5) = ?", "5 = 10 ÷ 2", "log(2) ≈ 0,301"], `combien${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "log_proprietes",
  titre: "Énigmes des propriétés de log",
  description: "Le réparateur de vélos, le maréchal-ferrant, le bourrelier, le pêcheur de langoustes, le piège du studio de doublage, le défi du loueur de yachts : log(ab) = log(a) + log(b), log(a ÷ b) = log(a) − log(b), log(aⁿ) = n log(a) et log(1 ÷ b) = − log(b).",
  problemes: [
    {
      tag: "Énigme 1 · Le réparateur de vélos",
      titre: "Le logarithme d'un produit",
      question: `Un réparateur de vélos fait ses comptes avec la calculatrice.<br>On sait que log(a) + log(b) = log(a × b).<br><br><b>Combien vaut log(2) + log(5)</b> ?`,
      reponse: `log(2) + log(5) = log(2 × 5) = log(10).<br>Et log(10) = <span class="big">1</span>.`,
      consigne: "Combien vaut log(2) + log(5) ?",
      verification: { type: "courte", attendus: ["1"] },
      dessin: velos,
    },
    {
      tag: "Énigme 2 · Le maréchal-ferrant",
      titre: "Le logarithme d'un quotient",
      question: `Un maréchal-ferrant compare deux nombres.<br>On sait que log(a) − log(b) = log(a ÷ b).<br><br><b>Combien vaut log(200) − log(2)</b> ?`,
      reponse: `log(200) − log(2) = log(200 ÷ 2) = log(100).<br>Et log(100) = <span class="big">2</span>.`,
      consigne: "Combien vaut log(200) − log(2) ?",
      verification: { type: "qcm", choix: ["2", "198", "log(198)"], bonne: 0 },
      dessin: marechal,
    },
    {
      tag: "Énigme 3 · Le bourrelier",
      titre: "Le logarithme d'une puissance",
      question: `Un bourrelier fabrique 2⁵ = 32 selles.<br>On sait que log(aⁿ) = n × log(a).<br>La calculatrice donne log(2) ≈ 0,301.<br><br><b>Combien vaut log(2⁵), environ</b> ?`,
      reponse: `log(2⁵) = 5 × log(2) ≈ 5 × 0,301 = <span class="big">1,505</span>.<br>La calculatrice donne log(32) ≈ 1,505.`,
      consigne: "Combien vaut log(2 puissance 5) ?",
      verification: { type: "courte", attendus: ["1,505", "1.505", "1,5", "1,51"] },
      dessin: bourrelier,
    },
    {
      tag: "Énigme 4 · Le pêcheur de langoustes",
      titre: "Le logarithme d'un inverse",
      question: `Un pêcheur de langoustes calcule une petite proportion : 1 ÷ 1 000.<br>On sait que log(1 ÷ b) = − log(b).<br><br><b>Combien vaut log(1 ÷ 1 000)</b> ?`,
      reponse: `log(1 ÷ 1 000) = − log(1 000) = <span class="big">− 3</span>.<br>En effet 1 ÷ 1 000 = 10⁻³.`,
      consigne: "Combien vaut log(1 ÷ 1 000) ?",
      verification: { type: "qcm", choix: ["1 ÷ 3", "− 3", "3"], bonne: 1 },
      dessin: langoustes,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le studio de doublage",
      sorte: "piege",
      question: `Un ingénieur du son d'un studio de doublage écrit :<br>« log(2) + log(8) = log(2 + 8) = log(10) = 1. »<br><br><b>À quoi est vraiment égal log(2) + log(8)</b> ?`,
      reponse: `La somme des logarithmes est le log du <b>produit</b> :<br>log(2) + log(8) = log(2 × 8) = <span class="big">log(16)</span> ≈ 1,2.<br>log(a + b) n'a pas de formule.`,
      consigne: "À quoi est égal log(2) + log(8) ?",
      verification: { type: "qcm", choix: ["log(10)", "log(6)", "log(16)"], bonne: 2 },
      dessin: doublage,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le loueur de yachts",
      sorte: "defi",
      question: `Un loueur de yachts n'a plus de calculatrice.<br>Il sait seulement que log(2) ≈ 0,301.<br>Il remarque que 5 = 10 ÷ 2.<br><br><b>Combien vaut log(5), environ</b> ?`,
      reponse: `log(5) = log(10 ÷ 2) = log(10) − log(2).<br>log(5) ≈ 1 − 0,301 = <span class="big">0,699</span>.`,
      consigne: "Combien vaut log(5) ?",
      verification: { type: "courte", attendus: ["0,699", "0.699", "0,7"] },
      dessin: yachts,
    },
  ],
};

export default problemes;
