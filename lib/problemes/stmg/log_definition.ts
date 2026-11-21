// Énigmes à projeter — STMG (Tle), logarithme décimal : définition (l'agence
// de presse, la serrure à code, le fabricant de gilets de sauvetage, la
// coopérative des vendanges, piège du technicien de forage, défi du saunier).
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

const presse = carte("L'agence de presse : 10 puissance x égale 1 000 ; x égale log de 1 000 ; combien ?",
  [`${ex("10", "x")} = 1${NB}000`, "x = log(1 000)", "lecteurs d'un article"], `x${NB}?`);

const serrure = carte("La serrure à code : 10 puissance x codes ; 100 000 codes ; combien de chiffres ?",
  [`${ex("10", "x")} = 100${NB}000`, "x chiffres → 10ˣ codes", "x = log(100 000)"], `combien de chiffres${NB}?`, C.jaune);

const gilets = carte("Le fabricant de gilets de sauvetage : log de 1 plus log de 10 égale combien ?",
  ["log(1) + log(10) = ?", "10⁰ = 1 et 10¹ = 10", "gilets de sauvetage"], `combien${NB}?`);

const vendanges = carte("La coopérative des vendanges : 500 tonnes ; log de 500 est entre quels entiers ?",
  ["log(500) entre … et … ?", "100 → 500 → 1 000", "log est croissante"], `quels entiers${NB}?`, C.jaune);

const forage = carte("Le technicien de forage : il dit que log de 100 égale 10",
  ["log(100) = ?", "le technicien : « 10 »", "car 10 × 10 = 100"], `qui a raison${NB}?`);

const saunier = carte("Le saunier : 10 puissance x égale 0,01 ; combien vaut x ?",
  [`${ex("10", "x")} = 0,01`, "x = log(0,01)", "0,01 = 1 ÷ 100"], `x${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "log_definition",
  titre: "Énigmes du logarithme décimal",
  description: "L'agence de presse, la serrure à code, le fabricant de gilets de sauvetage, la coopérative des vendanges, le piège du technicien de forage, le défi du saunier : log(b) est la solution de 10ˣ = b, log(1) = 0, log(10ⁿ) = n, et log est croissante.",
  problemes: [
    {
      tag: "Énigme 1 · L'agence de presse",
      titre: "log, c'est l'exposant de 10",
      question: `Une agence de presse compte les lecteurs d'un article.<br>Il y en a 10ˣ, et ce nombre vaut 1 000.<br>La solution de 10ˣ = 1 000 s'appelle log(1 000).<br><br><b>Combien vaut x = log(1 000)</b> ?`,
      reponse: `1 000 = 10 × 10 × 10 = 10³.<br>Donc x = log(1 000) = <span class="big">3</span>.`,
      consigne: "Combien vaut log(1 000) ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: presse,
    },
    {
      tag: "Énigme 2 · La serrure à code",
      titre: "Le nombre de chiffres",
      question: `Une serrure à x chiffres a 10ˣ codes possibles.<br>Un fabricant vend une serrure à 100 000 codes.<br>Son nombre de chiffres est log(100 000).<br><br><b>Combien de chiffres a cette serrure</b> ?`,
      reponse: `100 000 = 10⁵.<br>Donc log(100 000) = <span class="big">5</span> chiffres.<br>On retient : log(10ⁿ) = n.`,
      consigne: "Combien de chiffres ?",
      verification: { type: "qcm", choix: ["5", "50 000", "10 000"], bonne: 0 },
      dessin: serrure,
    },
    {
      tag: "Énigme 3 · Le fabricant de gilets de sauvetage",
      titre: "Les deux valeurs à connaître",
      question: `Un fabricant de gilets de sauvetage révise son cours de maths.<br>Il sait que 10⁰ = 1 et 10¹ = 10.<br><br><b>Combien vaut log(1) + log(10)</b> ?`,
      reponse: `log(1) = 0 car 10⁰ = 1.<br>log(10) = 1 car 10¹ = 10.<br>log(1) + log(10) = 0 + 1 = <span class="big">1</span>.`,
      consigne: "Combien vaut log(1) + log(10) ?",
      verification: { type: "courte", attendus: ["1"] },
      dessin: gilets,
    },
    {
      tag: "Énigme 4 · La coopérative des vendanges",
      titre: "Encadrer un logarithme",
      question: `Une coopérative a récolté 500 tonnes de raisin aux vendanges.<br>On sait que 100 &lt; 500 &lt; 1 000.<br>La fonction log est croissante.<br><br><b>Entre quels entiers se trouve log(500)</b> ?`,
      reponse: `log(100) = 2 et log(1 000) = 3.<br>log est croissante, donc log(500) est <span class="big">entre 2 et 3</span>.<br>La calculatrice donne log(500) ≈ 2,7.`,
      consigne: "Entre quels entiers ?",
      verification: { type: "qcm", choix: ["1 et 2", "2 et 3", "5 et 6"], bonne: 1 },
      dessin: vendanges,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le technicien de forage",
      sorte: "piege",
      question: `Un technicien de forage dit :<br>« 10 × 10 = 100, donc log(100) = 10. »<br><br><b>Combien vaut vraiment log(100)</b> ?`,
      reponse: `log(100) est l'exposant x tel que 10ˣ = 100.<br>100 = 10², donc log(100) = <span class="big">2</span>.<br>Le 10 de « 10 × 10 », c'est la base, pas l'exposant.`,
      consigne: "Combien vaut log(100) ?",
      verification: { type: "qcm", choix: ["10", "50", "2"], bonne: 2 },
      dessin: forage,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le saunier",
      sorte: "defi",
      question: `Un saunier dilue une saumure.<br>La concentration vaut 10ˣ, et il la veut égale à 0,01.<br>On sait que 0,01 = 1 ÷ 100.<br><br><b>Combien vaut x = log(0,01)</b> ?`,
      reponse: `0,01 = 1 ÷ 10² = 10⁻².<br>Donc x = log(0,01) = <span class="big">− 2</span>.<br>Un nombre entre 0 et 1 a un logarithme négatif.`,
      consigne: "Combien vaut log(0,01) ?",
      verification: { type: "courte", attendus: ["-2", "−2", "- 2", "− 2"] },
      dessin: saunier,
    },
  ],
};

export default problemes;
