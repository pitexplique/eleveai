// Énigmes à projeter — STMG (Tle), propriétés algébriques de aˣ (l'hébergeur
// de sites, la société de cybersécurité, l'inflation, le cabinet
// d'orthophonie, piège du cordiste, défi de la vidéo virale). 21/11/2026.
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

const hebergeur = carte("L'hébergeur de sites : 1,2 puissance 3 fois 1,2 puissance 2 égale 1,2 puissance combien ?",
  [`1,2³ × 1,2² = ${ex("1,2", "?")}`, "aˣ × aʸ = aˣ⁺ʸ", "stockage × 1,2 par an"], `l'exposant${NB}?`);

const cyber = carte("La société de cybersécurité : 2 puissance 7 divisé par 2 puissance 4 égale 2 puissance combien ?",
  [`2⁷ ÷ 2⁴ = ${ex("2", "?")}`, "aˣ ÷ aʸ = aˣ⁻ʸ", "alertes × 2 par mois"], `l'exposant${NB}?`, C.jaune);

const inflation = carte("L'inflation : 1,02 au carré, le tout puissance 3, égale 1,02 puissance combien ?",
  [`(1,02²)³ = ${ex("1,02", "?")}`, "3 périodes de 2 ans", "prix × 1,02 par an"], `l'exposant${NB}?`);

const ortho = carte("Le cabinet d'orthophonie : 3 puissance x plus 1 s'écrit comment ?",
  [ex("3", "x+1", "= ?"), "liste d'attente × 3 par an", "x en années"], `une autre écriture${NB}?`, C.jaune);

const cordiste = carte("Le cordiste : il écrit 2 puissance 3 fois 2 puissance 4 égale 2 puissance 12",
  ["2³ × 2⁴ = ?", "le cordiste : « 2¹² »", "nœuds × 2 à chaque étage"], `qui a raison${NB}?`);

const virale = carte("La vidéo virale : 2 puissance x vues ; 3 heures plus tard, 2 puissance x plus 3 ; combien de fois plus ?",
  [ex("2", "x+3", "= ? × 2ˣ"), "vues × 2 par heure", "3 heures plus tard"], `combien de fois plus${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "expo_proprietes",
  titre: "Énigmes des propriétés de aˣ",
  description: "L'hébergeur de sites, la société de cybersécurité, l'inflation, le cabinet d'orthophonie, le piège du cordiste, le défi de la vidéo virale : additionner ou soustraire les exposants, utiliser (aˣ)ⁿ = aⁿˣ et transformer une écriture.",
  problemes: [
    {
      tag: "Énigme 1 · L'hébergeur de sites",
      titre: "Multiplier, c'est additionner les exposants",
      question: `Un hébergeur de sites multiplie son stockage par 1,2 chaque année.<br>Sur 3 ans puis 2 ans, il est multiplié par 1,2³ × 1,2².<br>On sait que aˣ × aʸ = aˣ⁺ʸ.<br><br><b>1,2³ × 1,2² = 1,2 puissance combien</b> ?`,
      reponse: `On additionne les exposants : 3 + 2 = 5.<br>1,2³ × 1,2² = 1,2<sup><span class="big">5</span></sup> : 5 ans au total.`,
      consigne: "Quel exposant ?",
      verification: { type: "courte", attendus: ["5", "1,2^5"] },
      dessin: hebergeur,
    },
    {
      tag: "Énigme 2 · La société de cybersécurité",
      titre: "Diviser, c'est soustraire les exposants",
      question: `Une société de cybersécurité voit ses alertes doubler chaque mois.<br>Elle compare le mois 7 et le mois 4 : 2⁷ ÷ 2⁴.<br>On sait que aˣ ÷ aʸ = aˣ⁻ʸ.<br><br><b>2⁷ ÷ 2⁴ = 2 puissance combien</b> ?`,
      reponse: `On soustrait les exposants : 7 − 4 = 3.<br>2⁷ ÷ 2⁴ = 2<sup><span class="big">3</span></sup> = 8 : 8 fois plus d'alertes.`,
      consigne: "Quel exposant ?",
      verification: { type: "qcm", choix: ["3", "11", "1,75"], bonne: 0 },
      dessin: cyber,
    },
    {
      tag: "Énigme 3 · L'inflation",
      titre: "Une puissance de puissance",
      question: `Les prix sont multipliés par 1,02 chaque année.<br>Sur 2 ans : × 1,02². Sur 3 périodes de 2 ans : × (1,02²)³.<br>On sait que (aˣ)ⁿ = aⁿˣ.<br><br><b>(1,02²)³ = 1,02 puissance combien</b> ?`,
      reponse: `On multiplie les exposants : 2 × 3 = 6.<br>(1,02²)³ = 1,02<sup><span class="big">6</span></sup> : c'est bien 6 ans.`,
      consigne: "Quel exposant ?",
      verification: { type: "courte", attendus: ["6", "1,02^6"] },
      dessin: inflation,
    },
    {
      tag: "Énigme 4 · Le cabinet d'orthophonie",
      titre: "Transformer une écriture",
      question: `La liste d'attente d'un cabinet d'orthophonie est multipliée par 3 chaque année.<br>Une année plus tard, on passe de 3ˣ à 3ˣ⁺¹.<br><br><b>Quelle écriture est égale à 3ˣ⁺¹</b> ?`,
      reponse: `3ˣ⁺¹ = 3ˣ × 3¹ = <span class="big">3 × 3ˣ</span>.<br>Une année de plus, c'est une multiplication par 3, pas une addition.`,
      consigne: "Quelle écriture ?",
      verification: { type: "qcm", choix: ["3ˣ + 1", "3 × 3ˣ", "3ˣ + 3"], bonne: 1 },
      dessin: ortho,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le cordiste",
      sorte: "piege",
      question: `Un cordiste compte ses nœuds : 2³ × 2⁴.<br>Il écrit : « 3 × 4 = 12, donc 2¹² ».<br><br><b>Combien vaut vraiment 2³ × 2⁴</b> ?`,
      reponse: `Quand on multiplie, on <b>additionne</b> les exposants : 3 + 4 = 7.<br>2³ × 2⁴ = 8 × 16 = 128 = <span class="big">2⁷</span>.<br>2¹² vaut 4 096 : c'est faux.`,
      consigne: "Combien vaut 2³ × 2⁴ ?",
      verification: { type: "qcm", choix: ["2¹²", "4⁷", "2⁷"], bonne: 2 },
      dessin: cordiste,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La vidéo virale",
      sorte: "defi",
      question: `Sur un réseau social, une vidéo a 2ˣ milliers de vues au bout de x heures.<br>3 heures plus tard, elle en a 2ˣ⁺³ milliers.<br><br><b>Combien de fois plus de vues</b> ?`,
      reponse: `2ˣ⁺³ = 2ˣ × 2³ = 2ˣ × 8.<br>Il y a <span class="big">8 fois plus</span> de vues, quelle que soit l'heure x de départ.`,
      consigne: "Combien de fois plus ?",
      verification: { type: "courte", attendus: ["8", "8 fois", "8 fois plus"] },
      dessin: virale,
    },
  ],
};

export default problemes;
