// Énigmes à projeter — STMG (Tle), automatismes de terminale : reconnaître
// (la blanchisserie, les vols en hélicoptère, l'huile de vétiver (974), le
// fabricant de raquettes, piège de la régie publicitaire, défi de l'atelier de
// tréteaux). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

/** Un cadre jaune (situation), des lignes bleues et la question (rose). */
const carte = (aria: string, cadre: string[], lignes: string[], question: string) =>
  svg(aria,
    r(30, 30, 420, 50 + 40 * (cadre.length - 1), C.jaune, 0.12, 3) +
      cadre.map((s, k) => t(240, 64 + 40 * k, s, C.craie, 24)).join("") +
      lignes.map((s, k) => t(240, 150 + 40 * (cadre.length - 1) + 44 * k, s, C.bleu, 23)).join("") +
      t(240, 380, question, C.rose, 27));

/** Un axe avec deux racines marquées et le signe de a. */
const axe = (aria: string, f: string, a: string, x1: string, x2: string, question: string) =>
  svg(aria,
    r(30, 30, 420, 60, C.jaune, 0.12, 3) + t(240, 70, f, C.craie, 26) +
    t(240, 150, a, C.bleu, 24) +
    l(50, 240, 430, 240, C.craie, 3) + `<path d="M430 240 L418 233 L418 247 Z" fill="${C.craie}"/>` +
    l(160, 228, 160, 252, C.bleu, 4) + l(320, 228, 320, 252, C.bleu, 4) +
    t(160, 285, x1, C.bleu, 26) + t(320, 285, x2, C.bleu, 26) + t(440, 285, "x", C.pale, 22) +
    t(240, 380, question, C.rose, 27));

const blanchisserie = carte("Blanchisserie : 1 200 clients ; perd 4 % de ses clients chaque mois",
  [`1${NB}200 clients en janvier`], ["chaque mois :", "− 4 % de clients"], `quelle suite${NB}?`);

const helico = carte("Vols en hélicoptère : 5 000 passagers ; plus 15 % chaque année",
  [`5${NB}000 passagers en 2025`], ["chaque année :", "+ 15 % de passagers"], `raison${NB}q${NB}?`);

const vetiver = carte("Huile de vétiver : 300 euros le litre ; plus 2 % chaque année",
  [`huile de vétiver : 300${NB}€ le litre`], ["chaque année :", "+ 2 %"], `raison${NB}q${NB}?`);

const raquettes = axe("Raquettes : B(x) = −3(x − 2)(x − 10) ; a = −3 négatif ; racines 2 et 10",
  "B(x) = −3(x − 2)(x − 10)", "a = −3 : négatif", "2", "10", `B(x) > 0${NB}?`);

const regie = axe("Régie publicitaire : R(x) = 2(x − 1)(x − 5) ; a = 2 positif ; racines 1 et 5 ; signe de R(3) ?",
  "R(x) = 2(x − 1)(x − 5)", "a = 2 : positif", "1", "5", `R(3) > 0${NB}?`);

const treteaux = svg("Atelier de tréteaux : 800, 840, 882, 926,1 tréteaux vendus de 2023 à 2026",
  r(40, 40, 400, 60, C.jaune, 0.12, 3) + r(40, 100, 400, 60, C.bleu, 0.12, 3) +
    [90, 190, 290, 390].map((x, k) => t(x, 80, String(2023 + k), C.craie, 23)).join("") +
    l(140, 40, 140, 160, C.craie, 2) + l(240, 40, 240, 160, C.craie, 2) + l(340, 40, 340, 160, C.craie, 2) +
    t(90, 140, "800", C.bleu, 24) + t(190, 140, "840", C.bleu, 24) + t(290, 140, "882", C.bleu, 24) + t(390, 140, "926,1", C.bleu, 24) +
    t(240, 225, "+ 40, puis + 42, puis + 44,1", C.pale, 22) +
    t(240, 375, `taux annuel${NB}?`, C.rose, 27));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_terminale_reconnaitre",
  titre: "Énigmes des automatismes de terminale : reconnaître",
  description: "La blanchisserie, les vols en hélicoptère, l'huile de vétiver, le fabricant de raquettes, le piège de la régie publicitaire, le défi de l'atelier de tréteaux : reconnaître une suite géométrique et sa raison, trouver le signe d'une expression factorisée avec l'image de la parabole.",
  problemes: [
    {
      tag: "Énigme 1 · La blanchisserie",
      titre: "Reconnaître la suite",
      question: `Une blanchisserie a 1 200 clients en janvier.<br>Chaque mois, elle perd 4 % de ses clients.<br><br>Le nombre de clients suit <b>quelle sorte de suite</b> ?`,
      reponse: `Perdre 4 %, c'est multiplier par 0,96 chaque mois.<br>On multiplie toujours par le même nombre.<br>Suite <span class="big">géométrique</span> de raison 0,96.`,
      consigne: "Quelle sorte de suite ?",
      verification: { type: "qcm", choix: ["Arithmétique", "Géométrique", "Ni l'une ni l'autre"], bonne: 1 },
      dessin: blanchisserie,
    },
    {
      tag: "Énigme 2 · Les vols en hélicoptère",
      titre: "Trouver la raison",
      question: `Une société de vols touristiques en hélicoptère a eu 5 000 passagers en 2025.<br>Chaque année, le nombre de passagers augmente de 15 %.<br><br><b>Quelle est la raison</b> de la suite géométrique ?`,
      reponse: `Augmenter de 15 %, c'est multiplier par 1 + 0,15.<br>Raison : <span class="big">1,15</span>.`,
      consigne: "Quelle est la raison ?",
      verification: { type: "courte", attendus: ["1,15", "1.15"] },
      dessin: helico,
    },
    {
      tag: "Énigme 3 · L'huile de vétiver",
      titre: "Une petite hausse",
      question: `Dans les Hauts de La Réunion, un producteur vend son huile de vétiver 300 € le litre.<br>Chaque année, le prix augmente de 2 %.<br><br><b>Quelle est la raison</b> de la suite des prix ?`,
      reponse: `+ 2 %, c'est multiplier par 1 + 0,02.<br>Raison : <span class="big">1,02</span>.<br>Attention : 1,2 voudrait dire + 20 %.`,
      consigne: "Quelle est la raison ?",
      verification: { type: "qcm", choix: ["0,02", "1,2", "1,02"], bonne: 2 },
      dessin: vetiver,
    },
    {
      tag: "Énigme 4 · Le fabricant de raquettes",
      titre: "Le signe avec la parabole",
      question: `Un fabricant de raquettes calcule son bénéfice : B(x) = −3(x − 2)(x − 10).<br>x est en centaines de raquettes.<br><br><b>Pour quelles valeurs de x</b> le bénéfice est-il positif ?`,
      reponse: `B s'annule en 2 et en 10.<br>a = −3 est négatif : la parabole est tournée vers le bas, le sommet est en haut.<br>Elle est au-dessus de l'axe entre les racines.<br>B(x) > 0 <span class="big">entre 2 et 10</span>.`,
      consigne: "Pour quelles valeurs de x le bénéfice est-il positif ?",
      verification: { type: "qcm", choix: ["Entre 2 et 10", "Avant 2 et après 10", "Jamais"], bonne: 0 },
      dessin: raquettes,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La régie publicitaire",
      sorte: "piege",
      question: `Une régie publicitaire modélise son résultat par R(x) = 2(x − 1)(x − 5), en milliers d'euros.<br>x est le nombre de centaines de spots diffusés.<br><br>Avec 300 spots (x = 3), le résultat est-il <b>positif</b> ?`,
      reponse: `Ici a = 2 est positif : la parabole est tournée vers le haut.<br>Elle passe sous l'axe entre 1 et 5.<br>Vérification : R(3) = 2 × 2 × (−2) = −8.<br>Réponse : <span class="big">non</span>, c'est une perte.`,
      consigne: "Le résultat est-il positif pour x = 3 (oui ou non) ?",
      verification: { type: "courte", attendus: ["non"] },
      dessin: regie,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'atelier de tréteaux",
      sorte: "defi",
      question: `Un atelier vend 800 tréteaux en 2023, puis 840, puis 882, puis 926,1 en 2026.<br>Les écarts ne sont pas égaux.<br><br>La suite est géométrique : <b>quel est le taux d'évolution annuel</b>, en % ?`,
      reponse: `840 ÷ 800 = 1,05 ; 882 ÷ 840 = 1,05 ; 926,1 ÷ 882 = 1,05.<br>On multiplie par 1,05 chaque année.<br>Taux : <span class="big">+ 5 %</span> par an.`,
      consigne: "Quel est le taux d'évolution annuel, en % ?",
      verification: { type: "courte", attendus: ["5", "5 %", "5%", "+5 %", "+ 5 %"] },
      dessin: treteaux,
    },
  ],
};

export default problemes;
