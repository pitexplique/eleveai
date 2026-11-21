// Énigmes à projeter — CM1, notion longueurs (le crayon en millimètres, la
// course de 2 km 300 m, le terrain de basket, le ruban de Maman, le piège de la
// règle qui ne part pas de 0, le défi de la fourmi sur le banc). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

// Une règle graduée en cm de x0, 1 cm = pas px, n cm.
const regle = (x0: number, y: number, n: number, pas: number) => {
  let s = r(x0 - 12, y, n * pas + 24, 50, C.jaune, 0.15, 3, 4);
  for (let k = 0; k <= n; k++) s += l(x0 + k * pas, y, x0 + k * pas, y + 18, C.craie, 2) + t(x0 + k * pas, y + 40, k, C.craie, 16);
  return s;
};

const crayon = svg(
  "Un crayon de 15 cm",
  p("M60 160 L370 160 L420 180 L370 200 L60 200 Z", C.bleu, 4, 0.25) + l(370, 160, 370, 200, C.bleu, 3) +
    t(240, 120, "15 cm", C.craie, 34) + t(240, 300, `en millimètres${NB}?`, C.rose, 28)
);

const course = svg(
  "Une course de 2 km 300 m",
  p("M40 300 Q120 120 240 220 T440 120", C.jaune, 6) + t(40, 340, "départ", C.pale, 20) + t(440, 100, "🏁", C.craie, 36) +
    t(240, 80, "2 km 300 m", C.craie, 34) + t(240, 380, `en mètres${NB}?`, C.rose, 28)
);

const basket = svg(
  "Un terrain de basket : 28 quoi ?",
  r(70, 90, 340, 190, C.jaune, 0.15, 4) + l(240, 90, 240, 280, C.craie, 3) + `<circle cx="240" cy="185" r="36" fill="none" stroke="${C.craie}" stroke-width="3"/>` +
    t(240, 70, "28 ?", C.rose, 30) + t(240, 340, "🏀", C.craie, 40) + t(240, 395, `mm${NB}? cm${NB}? m${NB}?`, C.pale, 24)
);

// Le ruban : 3 m = 360 px ; 4 morceaux de 60 cm = 72 px chacun.
const ruban = svg(
  "Un ruban de 3 m ; on coupe 4 morceaux de 60 cm",
  r(60, 150, 360, 34, C.rose, 0.3, 3) + [1, 2, 3, 4].map((k) => l(60 + k * 72, 138, 60 + k * 72, 196, C.craie, 3, "6 5")).join("") +
    t(240, 120, "3 m", C.craie, 30) + t(96, 230, "60 cm", C.pale, 18) + t(384, 230, "reste ?", C.rose, 22) + t(240, 330, `Il reste combien${NB}?`, C.rose, 28)
);

// Le clou : de 2 cm à 9 cm, 1 cm = 40 px.
const clou = svg(
  "Un clou posé sur une règle, de la graduation 2 à la graduation 9",
  regle(40, 200, 10, 40) + p("M120 170 L384 170 L400 182 L384 194 L120 194 Z", C.pale, 3, 0.4) + r(110, 160, 10, 44, C.craie, 0.6, 2) +
    t(240, 120, "🔩 le clou", C.craie, 28) + t(240, 340, `Il mesure combien${NB}?`, C.rose, 28)
);

const fourmi = svg(
  "Un banc de 1 m 20 ; une fourmi fait 5 allers-retours",
  r(60, 170, 360, 30, C.jaune, 0.4, 4, 4) + l(90, 200, 90, 280, C.craie, 6) + l(390, 200, 390, 280, C.craie, 6) +
    t(240, 150, "1 m 20", C.craie, 28) + t(130, 160, "🐜", C.craie, 26) + p("M120 110 L360 110", C.rose, 3) + p("M345 100 L360 110 L345 120", C.rose, 3) + p("M360 90 L120 90", C.bleu, 3) + p("M135 80 L120 90 L135 100", C.bleu, 3) +
    t(240, 340, "5 allers-retours", C.craie, 26) + t(240, 390, `en mètres${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "longueur",
  titre: "Énigmes sur les longueurs",
  description: "Le crayon en millimètres, la course de 2 km 300 m, l'unité du terrain de basket, le ruban de Maman, le piège de la règle qui ne part pas de 0, le défi de la fourmi sur le banc.",
  problemes: [
    {
      tag: "Énigme 1 · La trousse",
      titre: "Le crayon",
      question: `Le crayon mesure <b>15 cm</b>.<br><br>Combien de <b>millimètres</b> ?`,
      reponse: `1 cm = 10 mm.<br>15 cm = 15 × 10 = <span class="big">150 mm</span>.`,
      consigne: "15 cm, c'est combien de millimètres ?",
      verification: { type: "courte", attendus: ["150"], unite: "mm" },
      dessin: crayon,
    },
    {
      tag: "Énigme 2 · La course",
      titre: "Le parcours du cross",
      question: `La course mesure <b>2 km 300 m</b>.<br><br>Combien de <b>mètres</b> en tout ?`,
      reponse: `1 km = 1 000 m. Donc 2 km = 2 000 m.<br>2 000 + 300 = <span class="big">2 300 m</span>.`,
      consigne: "2 km 300 m, c'est combien de mètres ?",
      verification: { type: "courte", attendus: ["2300"], unite: "m" },
      dessin: course,
    },
    {
      tag: "Énigme 3 · Le gymnase",
      titre: "Le terrain de basket",
      question: `Un terrain de basket est long de <b>28…</b><br><br>Quelle est la <b>bonne unité</b> ?`,
      reponse: `28 mm : moins qu'un doigt. 28 cm : une feuille.<br>Un terrain mesure <span class="big">28 m</span>.`,
      consigne: "Quelle est la longueur d'un terrain de basket ?",
      verification: { type: "qcm", choix: ["28 mm", "28 cm", "28 m"], bonne: 2 },
      dessin: basket,
    },
    {
      tag: "Énigme 4 · La couture",
      titre: "Le ruban de Maman",
      question: `Maman a <b>3 m</b> de ruban.<br>Elle coupe <b>4 morceaux</b> de <b>60 cm</b>.<br><br>Combien de <b>centimètres</b> reste-t-il ?`,
      reponse: `3 m = 300 cm. 4 × 60 = 240 cm.<br>300 − 240 = <span class="big">60 cm</span>.`,
      consigne: "Combien de centimètres de ruban reste-t-il ?",
      verification: { type: "courte", attendus: ["60"], unite: "cm" },
      dessin: ruban,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La règle",
      sorte: "piege",
      question: `Le clou commence à la graduation <b>2</b>.<br>Il finit à la graduation <b>9</b>.<br><br><b>Combien mesure</b> le clou ?`,
      reponse: `Le piège : lire 9 cm. Mais le clou ne part pas de 0 !<br>9 − 2 = <span class="big">7 cm</span>.`,
      consigne: "Combien mesure le clou ?",
      verification: { type: "qcm", choix: ["9 cm", "7 cm", "11 cm"], bonne: 1 },
      dessin: clou,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La fourmi sur le banc",
      sorte: "defi",
      question: `Le banc mesure <b>1 m 20</b>.<br>Une fourmi le parcourt d'un bout à l'autre, puis revient.<br>Elle fait <b>5 allers-retours</b>.<br><br>Combien de <b>mètres</b> parcourt-elle ?`,
      reponse: `1 aller-retour : 1 m 20 + 1 m 20 = 2 m 40.<br>5 allers-retours, c'est 10 fois le banc.<br>10 × 1 m 20 = 10 m + 200 cm = <span class="big">12 m</span>.`,
      consigne: "Combien de mètres la fourmi parcourt-elle ?",
      verification: { type: "courte", attendus: ["12"], unite: "m" },
      dessin: fourmi,
    },
  ],
};

export default problemes;
