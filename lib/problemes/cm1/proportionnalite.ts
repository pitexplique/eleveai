// Énigmes à projeter — CM1, notion proportionnalité (les cookies et les œufs,
// les pochettes d'autocollants, les tours de piste, l'imprimante, le piège des
// musiciens, le défi des pommes au kilo). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, ell } from "../dessins-ecole";

const cookies = svg(
  "12 cookies avec 2 œufs ; 36 cookies avec combien d'œufs ?",
  t(110, 140, "🍪 12", C.craie, 40) + t(330, 140, "🥚 2", C.craie, 40) + l(190, 130, 260, 130, C.pale, 3) +
    t(110, 250, "🍪 36", C.craie, 40) + t(330, 250, "🥚 ?", C.rose, 40) + l(190, 240, 260, 240, C.pale, 3) +
    t(240, 350, "même recette", C.pale, 24)
);

const pochettes = svg(
  "3 pochettes d'autocollants coûtent 6 €",
  Array.from({ length: 3 }, (_, i) => r(60 + i * 70, 90, 60, 80, C.rose, 0.25, 3, 6) + t(90 + i * 70, 140, "⭐", C.craie, 26)).join("") + t(380, 140, "6 €", C.craie, 36) +
    Array.from({ length: 5 }, (_, i) => r(40 + i * 62, 220, 52, 70, C.bleu, 0.2, 3, 6) + t(66 + i * 62, 265, "⭐", C.craie, 22)).join("") + t(410, 265, "? €", C.rose, 36)
);

const piste = svg(
  "Tableau : 1 tour = 300 m, 2 tours = 600 m, 4 tours = ?",
  ell(240, 110, 170, 60, C.jaune, 0.1, 6) + t(240, 120, "🏃", C.craie, 34) +
    r(60, 210, 360, 120, C.craie, 0, 3) + l(60, 270, 420, 270, C.craie, 3) + [150, 240, 330].map((x) => l(x, 210, x, 330, C.craie, 3)).join("") +
    t(105, 250, "tours", C.pale, 18) + t(105, 310, "mètres", C.pale, 18) +
    ["1", "2", "4"].map((s, i) => t(195 + i * 90, 252, s, C.craie, 26)).join("") + ["300", "600", "?"].map((s, i) => t(195 + i * 90, 312, s, i === 2 ? C.rose : C.craie, 26)).join("")
);

const imprimante = svg(
  "Une imprimante : 20 pages en 2 minutes",
  r(130, 120, 220, 110, C.craie, 0.1, 4, 12) + r(170, 70, 140, 50, C.craie, 0.04, 3) + r(170, 230, 140, 60, C.craie, 0.04, 3) +
    t(240, 180, "🖨️", C.craie, 40) + t(240, 340, "20 pages en 2 min", C.craie, 26) + t(240, 390, `7 min${NB}: ? pages`, C.rose, 26)
);

const musiciens = svg(
  "3 musiciens jouent un morceau en 5 minutes",
  t(240, 140, "🎻 🎺 🥁", C.craie, 60) + t(240, 220, "3 musiciens : 5 min", C.craie, 28) + t(240, 290, "6 musiciens : ?", C.rose, 28) + t(240, 360, "le même morceau 🎵", C.pale, 22)
);

const pommes = svg(
  "4 kg de pommes coûtent 10 €",
  [0, 1, 2, 3].map((i) => t(70 + i * 60, 150, "🍎", C.craie, 46)).join("") + t(380, 150, "4 kg : 10 €", C.craie, 28) +
    [0, 1, 2, 3, 4, 5].map((i) => t(50 + i * 50, 260, "🍎", C.craie, 40)).join("") + t(390, 260, "6 kg : ?", C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "proportionnalite",
  titre: "Énigmes sur la proportionnalité",
  description: "Les cookies et les œufs, les pochettes d'autocollants, les tours de piste, l'imprimante, le piège des musiciens, le défi des pommes au kilo.",
  problemes: [
    {
      tag: "Énigme 1 · En cuisine",
      titre: "Les cookies",
      question: `Pour <b>12 cookies</b>, il faut <b>2 œufs</b>.<br>Papa veut faire <b>36 cookies</b>.<br><br>Combien d'<b>œufs</b> lui faut-il ?`,
      reponse: `36, c'est 3 fois 12.<br>Il faut 3 fois plus d'œufs : 3 × 2 = <span class="big">6 œufs</span>.`,
      consigne: "Combien d'œufs pour 36 cookies ?",
      verification: { type: "courte", attendus: ["6"], unite: "œufs" },
      dessin: cookies,
    },
    {
      tag: "Énigme 2 · Les autocollants",
      titre: "Le prix des pochettes",
      question: `<b>3 pochettes</b> d'autocollants coûtent <b>6 €</b>.<br><br>Combien coûtent <b>5 pochettes</b> ?`,
      reponse: `1 pochette : 6 ÷ 3 = 2 €.<br>5 pochettes : 5 × 2 = <span class="big">10 €</span>.`,
      consigne: "Combien coûtent 5 pochettes ?",
      verification: { type: "courte", attendus: ["10"], unite: "€" },
      dessin: pochettes,
    },
    {
      tag: "Énigme 3 · Au stade",
      titre: "Les tours de piste",
      question: `Un tour de piste mesure <b>300 m</b>.<br>2 tours : 600 m.<br><br>Combien de mètres pour <b>4 tours</b> ?`,
      reponse: `4 tours, c'est 2 fois 2 tours.<br>2 × 600 = <span class="big">1 200 m</span>.`,
      consigne: "Combien de mètres pour 4 tours ?",
      verification: { type: "qcm", choix: ["1 000 m", "1 200 m", "900 m"], bonne: 1 },
      dessin: piste,
    },
    {
      tag: "Énigme 4 · L'imprimante",
      titre: "Les pages imprimées",
      question: `L'imprimante sort <b>20 pages</b> en <b>2 minutes</b>.<br>Elle va toujours à la même vitesse.<br><br>Combien de pages en <b>7 minutes</b> ?`,
      reponse: `En 1 minute : 20 ÷ 2 = 10 pages.<br>En 7 minutes : 7 × 10 = <span class="big">70 pages</span>.`,
      consigne: "Combien de pages en 7 minutes ?",
      verification: { type: "courte", attendus: ["70"], unite: "pages" },
      dessin: imprimante,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les musiciens",
      sorte: "piege",
      question: `<b>3 musiciens</b> jouent un morceau en <b>5 minutes</b>.<br><br>Combien de temps pour <b>6 musiciens</b> qui jouent le même morceau ?`,
      reponse: `Le piège : doubler, ou diviser par 2.<br>Ici, ce n'est pas proportionnel ! Le morceau dure pareil.<br><span class="big">5 minutes</span>.`,
      consigne: "Combien de temps mettent 6 musiciens ?",
      verification: { type: "qcm", choix: ["5 min", "10 min", "2 min 30 s"], bonne: 0 },
      dessin: musiciens,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les pommes au kilo",
      sorte: "defi",
      question: `<b>4 kg</b> de pommes coûtent <b>10 €</b>.<br><br>Combien coûtent <b>6 kg</b> ?`,
      reponse: `2 kg, c'est la moitié de 4 kg : 5 €.<br>6 kg = 4 kg + 2 kg.<br>10 + 5 = <span class="big">15 €</span>.`,
      consigne: "Combien coûtent 6 kg de pommes ?",
      verification: { type: "courte", attendus: ["15"], unite: "€" },
      dessin: pommes,
    },
  ],
};

export default problemes;
