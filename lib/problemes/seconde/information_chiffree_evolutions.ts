// Énigmes à projeter — seconde, notion information_chiffree_evolutions (les
// filles handballeuses, le litre de lait, revenir au prix de départ, les
// tortues vertes de La Réunion, piège +20 % puis −20 %, défi des indices).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o, bande, fleche } from "../dessins-ecole";

const hand = svg(
  "Un lycée : 60 pour cent de filles, et 25 pour cent d'entre elles font du handball",
  r(60, 80, 360, 80, C.pale, 0.1, 3) + r(60, 80, 216, 80, C.rose, 0.25, 3) + r(60, 80, 54, 80, C.jaune, 0.5, 3) +
    t(168, 70, "60 % de filles", C.rose, 22) + t(87, 195, "25 %", C.jaune, 20) + t(87, 218, "d'entre", C.jaune, 16) + t(87, 236, "elles", C.jaune, 16) +
    t(240, 320, `part du lycée qui fait du hand${NB}?`, C.rose, 24)
);

const lait = svg(
  "Un litre de lait passé de 1,20 euro à 1,32 euro",
  p("M110 300 L110 150 L140 110 L190 110 L220 150 L220 300 Z", C.bleu, 4, 0.12) + t(165, 230, "LAIT", C.bleu, 24) +
    t(340, 150, "1,20 €", C.pale, 30) + fleche(340, 175, 340, 225, C.rose, 4) + t(340, 270, "1,32 €", C.craie, 34) + t(240, 375, `taux d'évolution${NB}?`, C.rose, 26)
);

const retour = svg(
  "Un prix augmente de 25 pour cent, quelle baisse pour revenir au prix de départ",
  t(100, 200, "100 €", C.craie, 30) + p("M150 170 Q240 90 330 170", C.jaune, 4) + t(240, 105, "+ 25 %", C.jaune, 26) + t(380, 200, "125 €", C.craie, 30) +
    p("M330 230 Q240 310 150 230", C.rose, 4) + t(240, 320, `− ? %`, C.rose, 30).replace(" %", `${NB}%`)
);

const tortues = svg(
  "Une tortue verte : la population augmente de 10 pour cent par an pendant deux ans",
  `<ellipse cx="200" cy="190" rx="110" ry="70" fill="${C.bleu}" fill-opacity="0.2" stroke="${C.bleu}" stroke-width="4"/>` + o(330, 180, 30, C.bleu, 0.2, 4) +
    p("M120 140 l-40 -30 M120 240 l-40 30 M280 140 l30 -30 M280 240 l30 30", C.bleu, 8) + p("M150 190 L250 190 M200 135 L200 245", C.bleu, 2) +
    t(240, 320, "+ 10 % par an, 2 ans", C.craie, 26) + t(240, 375, `évolution globale${NB}?`, C.rose, 26)
);

const piege = svg(
  "Un prix de 100 euros augmente de 20 pour cent puis baisse de 20 pour cent",
  t(80, 200, "100 €", C.craie, 28) + fleche(130, 190, 190, 190, C.jaune, 4) + t(160, 170, "+20 %", C.jaune, 18) + t(240, 200, "120 €", C.craie, 28) +
    fleche(290, 190, 350, 190, C.rose, 4) + t(320, 170, "−20 %", C.rose, 18) + t(405, 200, `?`, C.rose, 34) + t(240, 320, `retour au départ${NB}?`, C.craie, 26)
);

const indices = svg(
  "Les indices d'un prix : 100 en 2020, 125 en 2024, 150 en 2026",
  [[2020, 100], [2024, 125], [2026, 150]].map(([a, v], k) => r(90 + 120 * k, 320 - v * 1.6, 70, v * 1.6, k === 2 ? C.rose : C.bleu, 0.25, 3) + t(125 + 120 * k, 310 - v * 1.6, v, C.craie, 24) + t(125 + 120 * k, 350, a, C.pale, 20)).join("") +
    l(70, 320, 430, 320, C.craie, 3) + t(240, 400, `de 2024 à 2026${NB}: + ? %`, C.rose, 24).replace(" %", `${NB}%`)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "information_chiffree_evolutions",
  titre: "Énigmes des pourcentages et des évolutions",
  description: "Les handballeuses du lycée, le litre de lait, revenir au prix de départ, les tortues vertes de La Réunion, le piège +20 % puis −20 %, le défi des indices : proportion de proportion, taux d'évolution, coefficient multiplicateur, évolutions successives et réciproques.",
  problemes: [
    {
      tag: "Énigme 1 · Les handballeuses",
      titre: "Une part d'une part",
      question: `Dans un lycée, <b>60 %</b> des élèves sont des filles. <b>25 %</b> de ces filles font du handball.<br><br><b>Quel pourcentage des élèves du lycée</b> sont des filles qui font du handball ?`,
      reponse: `On multiplie les proportions : 0,60 × 0,25 = 0,15.<br>C'est <span class="big">15 %</span> des élèves du lycée.`,
      consigne: "Quel pourcentage des élèves sont des filles qui font du hand ?",
      verification: { type: "courte", attendus: ["15"], unite: "%" },
      dessin: hand,
    },
    {
      tag: "Énigme 2 · Le litre de lait",
      titre: "De 1,20 € à 1,32 €",
      question: `Le litre de lait passe de <b>1,20 €</b> à <b>1,32 €</b>.<br><br><b>Quel est le taux d'évolution</b>, en pourcentage ?`,
      reponse: `Taux = (1,32 − 1,20) ÷ 1,20 = 0,12 ÷ 1,20 = 0,10.<br>Une hausse de <span class="big">10 %</span>. Coefficient multiplicateur : 1,10.`,
      consigne: "Quel est le taux d'évolution de 1,20 € à 1,32 €, en % ?",
      verification: { type: "courte", attendus: ["10", "+10"], unite: "%" },
      dessin: lait,
    },
    {
      tag: "Énigme 3 · Revenir en arrière",
      titre: "Après + 25 %",
      question: `Un prix augmente de <b>25 %</b>.<br><br><b>Quelle baisse</b> faut-il ensuite pour revenir au prix de départ ?`,
      reponse: `Hausse de 25 % : × 1,25. Pour revenir, on divise par 1,25, soit × 0,8.<br>× 0,8, c'est une baisse de <span class="big">20 %</span>. Exemple : 100 € → 125 € → 100 €.`,
      consigne: "Après une hausse de 25 %, quelle baisse ramène au prix de départ ?",
      verification: { type: "qcm", choix: ["−25 %", "−20 %", "−80 %"], bonne: 1 },
      dessin: retour,
    },
    {
      tag: "Énigme 4 · Les tortues vertes",
      titre: "Deux ans de suite",
      question: `Sur la côte ouest de La Réunion, le nombre de tortues vertes observées augmente de <b>10 %</b> par an, pendant <b>2 ans</b>.<br><br><b>Quelle est l'évolution globale</b> ?`,
      reponse: `Deux fois × 1,10 : 1,10 × 1,10 = 1,21.<br>Une hausse globale de <span class="big">21 %</span>, pas 20 % : la 2e hausse porte sur un nombre déjà plus grand.`,
      consigne: "Deux hausses de 10 % : quelle évolution globale ?",
      verification: { type: "qcm", choix: ["+21 %", "+20 %", "+110 %"], bonne: 0 },
      dessin: tortues,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "+ 20 % puis − 20 %",
      sorte: "piege",
      question: `Un article augmente de <b>20 %</b>, puis baisse de <b>20 %</b>.<br><br><b>Quelle est l'évolution globale</b> ?<br>A. 0 % B. +4 % C. −4 %`,
      reponse: `1,20 × 0,80 = 0,96.<br>Globalement : <span class="big">−4 %</span>. 100 € → 120 € → 96 €.<br>Les 20 % de baisse portent sur 120 €, pas sur 100 €.`,
      consigne: "+20 % puis −20 % : quelle évolution globale ?",
      verification: { type: "qcm", choix: ["0 %", "+4 %", "−4 %"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les indices",
      sorte: "defi",
      question: `Le prix d'un panier a pour indice <b>100</b> en 2020, <b>125</b> en 2024 et <b>150</b> en 2026.<br><br><b>De combien de pourcents</b> le prix a-t-il augmenté de 2024 à 2026 ?`,
      reponse: `Attention, pas 25 % ! On compare 150 à 125 : (150 − 125) ÷ 125 = 25 ÷ 125 = 0,20.<br>Hausse de <span class="big">20 %</span>. Les points d'indice ne sont des pourcents que par rapport à l'année de base.`,
      consigne: "Évolution de l'indice 125 à l'indice 150, en % ?",
      verification: { type: "courte", attendus: ["20", "+20"], unite: "%" },
      dessin: indices,
    },
  ],
};

export default problemes;
