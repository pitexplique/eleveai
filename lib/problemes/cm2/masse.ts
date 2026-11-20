// Énigmes à projeter — CM2, notion masse (les pommes de 250 g dans 2 kg, la
// valise de 23 kg, lire une pesée en kg et g, choisir l'unité, le piège des
// plumes et du plomb, le défi du panier d'œufs). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";

const pommes = svg(
  "Un sac de pommes de 2 kg ; une pomme pèse 250 g",
  p("M90 140 L210 140 L230 330 L70 330 Z", C.jaune, 4, 0.15) + t(150, 250, "2 kg", C.craie, 36) +
    t(330, 210, "🍎", C.craie, 70) + t(330, 270, "250 g", C.craie, 26) + t(240, 390, `Combien de pommes${NB}?`, C.rose, 26)
);

const valise = svg(
  "Une valise de 18,5 kg ; la compagnie accepte 23 kg au plus",
  r(140, 110, 200, 230, C.bleu, 0.2, 4, 16) + r(205, 80, 70, 30, C.bleu, 0, 4, 8) + l(170, 140, 170, 310, C.bleu, 3) + l(310, 140, 310, 310, C.bleu, 3) +
    t(240, 235, "18,5 kg", C.craie, 34) + t(240, 50, "maximum : 23 kg ✈️", C.rose, 26) + t(240, 395, `On peut ajouter${NB}?`, C.pale, 24)
);

const pesee = svg(
  "Une balance à plateaux en équilibre : un melon d'un côté ; 1 kg, 500 g, 200 g et 50 g de l'autre",
  l(240, 120, 240, 330, C.craie, 5) + l(150, 330, 330, 330, C.craie, 5) + l(70, 140, 410, 140, C.craie, 5) + o(240, 140, 8, C.craie, 0.5, 3) +
    p("M40 220 L160 220", C.pale, 5) + l(100, 140, 60, 220, C.pale, 2) + l(100, 140, 140, 220, C.pale, 2) + t(100, 210, "🍈", C.craie, 50) +
    p("M320 220 L460 220", C.pale, 5) + l(380, 140, 330, 220, C.pale, 2) + l(380, 140, 450, 220, C.pale, 2) +
    r(328, 172, 40, 46, C.jaune, 0.4, 3, 4) + r(372, 186, 30, 32, C.jaune, 0.4, 3, 4) + r(406, 196, 24, 22, C.jaune, 0.4, 3, 4) + r(434, 204, 16, 14, C.jaune, 0.4, 3, 3) +
    t(390, 260, "1 kg 500 g 200 g 50 g", C.craie, 16) + t(240, 390, `le melon${NB}: ? g`, C.rose, 28)
);

const elephant = svg(
  "Un éléphant : quelle est sa masse ?",
  t(240, 260, "🐘", C.craie, 200) + t(240, 380, `5 tonnes${NB}? 5 kg${NB}? 500 g${NB}?`, C.pale, 24)
);

const plumes = svg(
  "Un sac de 1 kg de plumes et un sac de 1 kg de plomb",
  p("M60 150 L200 150 L220 320 L40 320 Z", C.pale, 4, 0.12) + t(130, 230, "🪶", C.craie, 50) + t(130, 290, "1 kg", C.craie, 30) + t(130, 360, "plumes", C.pale, 22) +
    r(300, 250, 120, 70, C.craie, 0.25, 4, 6) + t(360, 295, "1 kg", C.craie, 30) + t(360, 360, "plomb", C.pale, 22) + t(240, 80, `Lequel est le plus lourd${NB}?`, C.rose, 26)
);

const panier = svg(
  "Un panier avec 10 œufs pèse 800 g ; avec 4 œufs, il pèse 440 g",
  p("M40 160 L210 160 L190 260 L60 260 Z", C.jaune, 4, 0.2) + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<ellipse cx="${62 + (i % 5) * 32}" cy="${140 + Math.floor(i / 5) * 14}" rx="13" ry="17" fill="${C.craie}" fill-opacity=".06" stroke="${C.craie}" stroke-width="2"/>`).join("") +
    t(125, 300, "800 g", C.craie, 30) +
    p("M270 160 L440 160 L420 260 L290 260 Z", C.jaune, 4, 0.2) + [0, 1, 2, 3].map((i) => `<ellipse cx="${308 + i * 32}" cy="140" rx="13" ry="17" fill="${C.craie}" fill-opacity=".06" stroke="${C.craie}" stroke-width="2"/>`).join("") +
    t(355, 300, "440 g", C.craie, 30) + t(240, 385, `le panier vide${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "masse",
  titre: "Énigmes sur les masses",
  description: "Les pommes du sac de 2 kg, la valise à l'aéroport, la pesée du melon, la masse d'un éléphant, le piège des plumes et du plomb, le défi du panier d'œufs.",
  problemes: [
    {
      tag: "Énigme 1 · Au marché",
      titre: "Le sac de pommes",
      question: `Un sac de pommes pèse <b>2 kg</b>.<br>Chaque pomme pèse <b>250 g</b>.<br><br><b>Combien de pommes</b> dans le sac ?`,
      reponse: `2 kg = 2 000 g.<br>4 pommes font 1 000 g. Donc 8 pommes font 2 000 g.<br>Il y a <span class="big">8 pommes</span>.`,
      consigne: "Combien de pommes dans le sac ?",
      verification: { type: "courte", attendus: ["8"], unite: "pommes" },
      dessin: pommes,
    },
    {
      tag: "Énigme 2 · À l'aéroport",
      titre: "La valise",
      question: `La valise ne doit pas dépasser <b>23 kg</b>.<br>Elle pèse déjà <b>18,5 kg</b>.<br><br>Combien de <b>kg</b> peut-on encore ajouter, au plus ?`,
      reponse: `18,5 + 0,5 = 19, puis 19 + 4 = 23.<br>0,5 + 4 = <span class="big">4,5 kg</span>.`,
      consigne: "Combien de kilogrammes peut-on encore ajouter ?",
      verification: { type: "courte", attendus: ["4,5", "4.5"], unite: "kg" },
      dessin: valise,
    },
    {
      tag: "Énigme 3 · Chez le primeur",
      titre: "La pesée du melon",
      question: `La balance est en équilibre.<br>D'un côté, le melon. De l'autre : <b>1 kg</b>, <b>500 g</b>, <b>200 g</b> et <b>50 g</b>.<br><br>Combien pèse le melon, en <b>grammes</b> ?`,
      reponse: `1 kg = 1 000 g.<br>1 000 + 500 + 200 + 50 = <span class="big">1 750 g</span>, soit 1,750 kg.`,
      consigne: "Combien pèse le melon, en grammes ?",
      verification: { type: "courte", attendus: ["1750"], unite: "g" },
      dessin: pesee,
    },
    {
      tag: "Énigme 4 · Au zoo",
      titre: "La masse de l'éléphant",
      question: `<b>Quelle est la masse</b> d'un éléphant adulte ?<br><br>5 tonnes ? 5 kg ? 500 g ?`,
      reponse: `5 kg, c'est un chat. 500 g, c'est un pain.<br>Un éléphant pèse environ <span class="big">5 tonnes</span>, soit 5 000 kg.`,
      consigne: "Quelle est la masse d'un éléphant adulte ?",
      verification: { type: "qcm", choix: ["5 tonnes", "5 kg", "500 g"], bonne: 0 },
      dessin: elephant,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Plumes ou plomb ?",
      sorte: "piege",
      question: `Un sac contient <b>1 kg de plumes</b>.<br>Un autre contient <b>1 kg de plomb</b>.<br><br><b>Lequel est le plus lourd</b> ?`,
      reponse: `Le sac de plumes est plus gros, mais pas plus lourd !<br>1 kg = 1 kg.<br><span class="big">Ils pèsent pareil</span>.`,
      consigne: "Lequel est le plus lourd ?",
      verification: { type: "qcm", choix: ["Le plomb", "Ils pèsent pareil", "Les plumes"], bonne: 1 },
      dessin: plumes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le panier d'œufs",
      sorte: "defi",
      question: `Le panier avec <b>10 œufs</b> pèse <b>800 g</b>.<br>Le même panier avec <b>4 œufs</b> pèse <b>440 g</b>.<br>Tous les œufs pèsent pareil.<br><br>Combien pèse le <b>panier vide</b> ?`,
      reponse: `6 œufs de différence : 800 − 440 = 360 g.<br>Un œuf : 360 ÷ 6 = 60 g. 10 œufs : 600 g.<br>Le panier vide : 800 − 600 = <span class="big">200 g</span>.`,
      consigne: "Combien pèse le panier vide, en grammes ?",
      verification: { type: "courte", attendus: ["200"], unite: "g" },
      dessin: panier,
    },
  ],
};

export default problemes;
