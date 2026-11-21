// Énigmes à projeter — CE1, notion suites de nombres (la marelle de 2 en 2,
// les wagons de 10 en 10, le compte à rebours de 5 en 5, le compteur de pas
// après 399, le piège des maisons impaires, le défi de Lili qui compte de 5 en
// 5). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l } from "../dessins-ecole";

const marelle = svg(
  "Une marelle : cases 2, 4, 6, ?, 10",
  [2, 4, 6, 0, 10].map((n, i) => r(40 + i * 82, 150, 74, 74, i === 3 ? C.rose : C.bleu, 0.15, 4, 6) + t(77 + i * 82, 200, n ? n : "?", i === 3 ? C.rose : C.craie, 36)).join("") +
    t(240, 320, `La case cachée${NB}?`, C.rose, 32)
);

const wagon = (x: number, n: string, c: string) =>
  r(x, 140, 78, 60, c, 0.2, 3, 6) + o(x + 18, 210, 10, C.craie, 0.8, 2) + o(x + 60, 210, 10, C.craie, 0.8, 2) + t(x + 39, 180, n, n === "?" ? C.rose : C.craie, 26);
const wagons = svg(
  "Un train de 5 wagons : 120, 130, 140, ?, 160",
  ["120", "130", "140", "?", "160"].map((n, i) => wagon(30 + i * 86, n, n === "?" ? C.rose : C.jaune) + (i ? l(22 + i * 86, 175, 30 + i * 86, 175, C.craie, 3) : "")).join("") +
    t(240, 320, `Le wagon caché${NB}?`, C.rose, 32)
);

const fusee = svg(
  "Un écran de compte à rebours : 50, 45, 40, ? ; une fusée",
  t(90, 260, "🚀", C.craie, 110) +
    r(190, 80, 260, 70, C.craie, 0.1, 3, 10) + t(320, 128, "50  45  40  ?", C.craie, 32) +
    t(320, 230, "de 5 en 5", C.pale, 24) + t(320, 330, `Le nombre suivant${NB}?`, C.rose, 28)
);

const pas = svg(
  "Un compteur de pas affiche 399 ; plus 1 pas",
  r(110, 90, 260, 140, C.bleu, 0.15, 4, 24) + t(240, 180, "399", C.craie, 64) + t(240, 75, "👟", C.craie, 40) +
    t(240, 300, "+ 1 pas", C.jaune, 32) + t(240, 370, `Le compteur affiche${NB}?`, C.rose, 28)
);

const maison = (x: number, n: string) =>
  `<path d="M${x - 35} 170 L${x} 125 L${x + 35} 170 Z" fill="${C.rose}" fill-opacity="0.3" stroke="${C.rose}" stroke-width="3" stroke-linejoin="round"/>` +
  r(x - 30, 170, 60, 70, C.craie, 0, 3) + t(x, 220, n, n === "?" ? C.rose : C.craie, 28);
const maisons = svg(
  "Une rue : maisons numéro 1, 3, 5, 7, ?",
  ["1", "3", "5", "7", "?"].map((n, i) => maison(60 + i * 90, n)).join("") + l(20, 245, 460, 245, C.pale, 4) +
    t(240, 330, `Le numéro de la dernière maison${NB}?`, C.rose, 26)
);

const lili = svg(
  "Lili compte de 5 en 5 : 0, 5, 10, 15… ; trois étiquettes 35, 42, 51",
  t(240, 90, "0   5   10   15  …", C.craie, 34) + t(240, 140, "de 5 en 5", C.pale, 24) +
    r(60, 200, 100, 70, C.bleu, 0.2, 3, 10) + t(110, 247, "35", C.craie, 34) +
    r(190, 200, 100, 70, C.jaune, 0.2, 3, 10) + t(240, 247, "42", C.craie, 34) +
    r(320, 200, 100, 70, C.rose, 0.2, 3, 10) + t(370, 247, "51", C.craie, 34) +
    t(240, 350, `Lequel dira Lili${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "suite_nombre",
  titre: "Énigmes sur les suites de nombres",
  description: "La marelle de 2 en 2, les wagons de 10 en 10, le compte à rebours de la fusée, le compteur de pas après 399, le piège des maisons impaires, le défi de Lili qui compte de 5 en 5.",
  problemes: [
    {
      tag: "Énigme 1 · La cour",
      titre: "La marelle",
      question: `Sur la marelle : <b>2, 4, 6, …, 10</b>.<br>Une case est effacée.<br><br>Quel nombre manque ?`,
      reponse: `On avance de 2 en 2.<br>6 + 2 = 8, puis 8 + 2 = 10.<br>Il manque <span class="big">8</span>.`,
      consigne: "Quel nombre manque sur la marelle ?",
      verification: { type: "courte", attendus: ["8"] },
      dessin: marelle,
    },
    {
      tag: "Énigme 2 · Le petit train",
      titre: "Les wagons",
      question: `Les wagons portent des numéros.<br><b>120, 130, 140, …, 160</b>.<br><br>Quel numéro est caché ?`,
      reponse: `On avance de 10 en 10.<br>140 + 10 = <span class="big">150</span>.`,
      consigne: "Quel numéro porte le wagon caché ?",
      verification: { type: "qcm", choix: ["141", "150", "145"], bonne: 1 },
      dessin: wagons,
    },
    {
      tag: "Énigme 3 · La fusée",
      titre: "Le compte à rebours",
      question: `La fusée va partir.<br>On compte : <b>50, 45, 40, …</b><br><br>Quel nombre vient ensuite ?`,
      reponse: `On recule de 5 en 5.<br>40 − 5 = <span class="big">35</span>.`,
      consigne: "Quel nombre vient après 40 ?",
      verification: { type: "qcm", choix: ["35", "45", "30"], bonne: 0 },
      dessin: fusee,
    },
    {
      tag: "Énigme 4 · La promenade",
      titre: "Le compteur de pas",
      question: `Le compteur de pas affiche <b>399</b>.<br>Maman fait <b>1 pas</b> de plus.<br><br>Que montre le compteur ?`,
      reponse: `399 + 1 = <span class="big">400</span>.<br>Après 99 vient 100 ; après 399 vient 400.`,
      consigne: "Quel nombre vient juste après 399 ?",
      verification: { type: "qcm", choix: ["3 100", "390", "400"], bonne: 2 },
      dessin: pas,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les maisons de la rue",
      sorte: "piege",
      question: `Les maisons d'un côté de la rue : <b>1, 3, 5, 7, …</b><br><br>Quel est le numéro suivant ?`,
      reponse: `Le piège : après 7, on dit 8.<br>Mais ici, on saute de 2 en 2.<br>7 + 2 = <span class="big">9</span>.`,
      consigne: "Quel est le numéro de la maison suivante ?",
      verification: { type: "qcm", choix: ["8", "9", "10"], bonne: 1 },
      dessin: maisons,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Lili compte de 5 en 5",
      sorte: "defi",
      question: `Lili compte de 5 en 5 : <b>0, 5, 10, 15…</b><br>Elle continue longtemps.<br><br>Quel nombre va-t-elle dire ?`,
      reponse: `De 5 en 5, on tombe sur des nombres qui finissent par <b>0</b> ou par <b>5</b>.<br>42 et 51 ne finissent pas par 0 ou 5.<br>Lili dira <span class="big">35</span>.`,
      consigne: "Lili dira-t-elle 35, 42 ou 51 ?",
      verification: { type: "qcm", choix: ["42", "51", "35"], bonne: 2 },
      dessin: lili,
    },
  ],
};

export default problemes;
