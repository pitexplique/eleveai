// Énigmes à projeter — seconde, notion homographique_partie_entiere (le sirop
// de grenadine, la loupe du photographe, les boîtes d'œufs, la salle
// d'escalade, piège de la partie entière d'un négatif, défi des pinceaux de
// l'atelier). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p, droiteGraduee } from "../dessins-ecole";
import { repere } from "../dessins-2de";
import { frac } from "../outils";

/** Une fraction en étage dans un dessin, barre de largeur `larg`. */
const fr = (x: number, y: number, n: string, d: string, c: string, taille: number, larg: number) =>
  t(x, y - 8, n, c, taille) + l(x - larg / 2, y, x + larg / 2, y, c, 3) + t(x, y + taille + 2, d, c, taille);

const sirop = svg("Une carafe : 1 litre de sirop et 4 litres d'eau",
  p("M150 60 L150 330 Q150 350 170 350 L310 350 Q330 350 330 330 L330 60", C.craie, 4) +
    r(154, 298, 172, 48, C.rose, 0.55, 0) + r(154, 106, 172, 192, C.bleu, 0.2, 0) +
    [1, 2, 3, 4].map((k) => l(154, 298 - 48 * k, 326, 298 - 48 * k, C.pale, 1.5)).join("") +
    t(240, 330, "1 L sirop", C.craie, 20) + t(240, 233, "4 L d'eau", C.bleu, 22) +
    fr(410, 180, "1", "1 + x", C.craie, 24, 70) + t(410, 260, `part${NB}?`, C.rose, 24) + t(240, 400, `quelle part de sirop${NB}?`, C.rose, 26)
);

const loupe = (() => {
  const R = repere(0, 30, 0, 60, { gl: 330, gh: 300, gy: 20, gx: 90, pasE: 10, pas: 5 });
  return svg("La courbe de la distance de l'image en fonction de la distance d de l'objet ; elle part vers le haut près de d égale 10",
    R.fond + `<path d="M${R.X(10)} ${R.Y(0)} V${R.Y(60)}" stroke="${C.rose}" stroke-width="3" stroke-dasharray="10 8"/>` +
      R.courbe((d) => (10 * d) / (d - 10), 12, 30, C.bleu, 5) + t(R.X(10) - 8, R.Y(55), `d = 10${NB}?`, C.rose, 20, "end") +
      t(R.X(29), R.Y(22), "d'", C.bleu, 22, "end") + t(R.X(30), R.Y(0) + 48, "d (cm)", C.pale, 17, "end") + t(240, 400, `la valeur interdite${NB}?`, C.rose, 26));
})();

const oeufs = (() => {
  const boite = (x: number, y: number) =>
    r(x, y, 80, 55, C.jaune, 0.15, 3, 8) + [0, 1, 2].map((i) => [0, 1].map((j) => o(x + 16 + 24 * i, y + 15 + 25 * j, 9, C.craie, 0.5, 2)).join("")).join("");
  return svg("Sept boîtes de 6 œufs pleines et 3 œufs qui restent",
    t(240, 50, "45 œufs, des boîtes de 6", C.craie, 24) +
      [40, 140, 240, 340].map((x) => boite(x, 80)).join("") + [40, 140, 240].map((x) => boite(x, 165)).join("") +
      [360, 390, 420].map((x) => o(x, 192, 9, C.craie, 0.5, 2)).join("") +
      t(240, 290, "E(45 ÷ 6) = E(7,5)", C.bleu, 28) + t(240, 360, `combien de boîtes pleines${NB}?`, C.rose, 26));
})();

const escalade = (() => {
  const R = repere(0, 30, 0, 20, { gl: 330, gh: 270, gy: 30, gx: 90, pasE: 5, pas: 5 });
  return svg("Le prix moyen d'une séance : une courbe qui descend et s'approche de la droite y égale 5",
    R.fond + `<path d="M${R.X(0)} ${R.Y(5)} H${R.X(30)}" stroke="${C.rose}" stroke-width="3" stroke-dasharray="10 8"/>` +
      R.courbe((x) => 5 + 30 / x, 2, 30, C.bleu, 5) + t(R.X(8), R.Y(14), "5 + 30 ÷ x", C.bleu, 20, "start") +
      t(R.X(30) - 4, R.Y(5) + 24, `y = 5${NB}?`, C.rose, 18, "end") + t(R.X(30), R.Y(0) + 46, "séances", C.pale, 17, "end") +
      t(240, 400, `vers quel prix${NB}?`, C.rose, 26));
})();

const plongeur = (() => {
  const X = (v: number) => 60 + (v + 4) * 90;
  return svg("Une droite graduée de moins 4 à 0 ; le point moins 2,3 est entre moins 3 et moins 2",
    droiteGraduee(200, 60, 420, -4, 0, 0.5, 1).replace(/>-(\d)</g, ">−$1<") + o(X(-2.3), 200, 9, C.rose, 1, 0) +
      t(X(-2.3), 160, "−2,3", C.rose, 22) + t(240, 80, "E(−2,3)", C.bleu, 34) + t(240, 120, "le plus grand entier ≤ −2,3", C.pale, 20) +
      t(240, 340, `E(−2,3) = −2${NB}?`, C.rose, 26));
})();

const pinceaux = svg("n enfants se partagent n plus 6 pinceaux",
  [0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => l(110 + 32 * k, 70, 110 + 32 * k, 150, k % 3 ? C.jaune : C.bleu, 6) + o(110 + 32 * k, 62, 7, C.rose, 1, 0)).join("") +
    t(240, 200, "n enfants, n + 6 pinceaux", C.craie, 24) +
    fr(170, 270, "n + 6", "n", C.bleu, 26, 80) + t(240, 280, "=", C.bleu, 28) + t(260, 280, "1 +", C.bleu, 28, "start") + fr(345, 270, "6", "n", C.bleu, 26, 40) +
    t(240, 385, `combien de valeurs de n${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "homographique_partie_entiere",
  titre: "Énigmes des fonctions homographiques et de la partie entière",
  description: "Le sirop de grenadine, la loupe du photographe, les boîtes d'œufs, la salle d'escalade, le piège de la partie entière d'un négatif, le défi des pinceaux : fonctions homographiques, valeur interdite, asymptote et partie entière.",
  problemes: [
    {
      tag: "Énigme 1 · Le sirop",
      titre: "De plus en plus d'eau",
      question: `On verse x litres d'eau sur <b>1 L</b> de sirop de grenadine. La part de sirop dans la carafe est f(x) = ${frac(1, "1 + x")}.<br><br>Avec <b>4 L d'eau</b>, <b>quelle est la part</b> de sirop, en % ?`,
      reponse: `f(4) = ${frac(1, "1 + 4")} = ${frac(1, 5)} = 0,2.<br>La carafe contient <span class="big">20 %</span> de sirop.`,
      consigne: "f(x) = 1 ÷ (1 + x). Que vaut f(4), en % ?",
      verification: { type: "courte", attendus: ["20"], unite: "%" },
      dessin: sirop,
    },
    {
      tag: "Énigme 2 · La loupe",
      titre: "L'image qui s'envole",
      question: `Avec une loupe de focale 10 cm, un objet à d cm donne une image à d' = ${frac("10d", "d − 10")} cm.<br><br><b>Pour quelle distance d</b> la formule ne donne-t-elle aucun résultat ?`,
      reponse: `On ne divise jamais par 0 : d − 10 = 0 pour d = 10.<br>La valeur interdite est <span class="big">d = 10 cm</span> : près de 10, l'image part très loin, la courbe monte sans fin.`,
      consigne: "d' = 10d ÷ (d − 10) : quelle est la valeur interdite ?",
      verification: { type: "qcm", choix: ["10 cm", "0 cm", "−10 cm"], bonne: 0 },
      dessin: loupe,
    },
    {
      tag: "Énigme 3 · Les boîtes d'œufs",
      titre: "Seulement les boîtes pleines",
      question: `À la ferme, on range <b>45 œufs</b> dans des boîtes de <b>6</b>. Le nombre de boîtes pleines est la partie entière E(45 ÷ 6).<br><br><b>Combien</b> de boîtes sont pleines ?`,
      reponse: `45 ÷ 6 = 7,5. La partie entière garde l'entier juste en dessous : E(7,5) = 7.<br><span class="big">7 boîtes</span> pleines (42 œufs), et 3 œufs restent.`,
      consigne: "Que vaut E(45 ÷ 6) ?",
      verification: { type: "qcm", choix: ["8", "7", "7,5"], bonne: 1 },
      dessin: oeufs,
    },
    {
      tag: "Énigme 4 · La salle d'escalade",
      titre: "Le prix moyen qui baisse",
      question: `Une salle d'escalade demande <b>30 €</b> d'inscription puis <b>5 €</b> par séance. Le prix moyen d'une séance est m(x) = ${frac("5x + 30", "x")}.<br><br>Pour un grimpeur qui vient très souvent, <b>de quel prix</b> m(x) s'approche-t-il ?`,
      reponse: `m(x) = 5 + ${frac(30, "x")}. Quand x devient grand, ${frac(30, "x")} devient presque 0.<br>Le prix moyen s'approche de <span class="big">5 €</span> : la droite y = 5 est une asymptote.`,
      consigne: "m(x) = (5x + 30) ÷ x : de quelle valeur s'approche m(x) quand x est très grand ?",
      verification: { type: "qcm", choix: ["30 €", "0 €", "5 €"], bonne: 2 },
      dessin: escalade,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La partie entière d'un négatif",
      sorte: "piege",
      question: `Un plongeur est à <b>2,3 m</b> sous la surface : son altitude est −2,3 m. Sa montre affiche la partie entière : le plus grand entier inférieur ou égal.<br><br><b>Que vaut</b> E(−2,3) ?`,
      reponse: `On ne « coupe » pas la virgule ! −2 est plus grand que −2,3, donc il ne convient pas.<br>Le plus grand entier ≤ −2,3 est <span class="big">−3</span>.`,
      consigne: "Que vaut E(−2,3) ?",
      verification: { type: "courte", attendus: ["-3", "−3"] },
      dessin: plongeur,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les pinceaux de l'atelier",
      sorte: "defi",
      question: `Un atelier de peinture accueille <b>n</b> enfants et reçoit <b>n + 6</b> pinceaux. On les partage sans reste : chacun reçoit ${frac("n + 6", "n")} pinceaux.<br><br><b>Pour combien de valeurs</b> de n est-ce possible ?`,
      reponse: `${frac("n + 6", "n")} = 1 + ${frac(6, "n")} : il faut que n divise 6.<br>n = 1, 2, 3 ou 6, soit <span class="big">4 valeurs</span>. Avec 6 enfants : 12 pinceaux, 2 chacun.`,
      consigne: "Pour combien d'entiers n ≥ 1 le nombre (n + 6) ÷ n est-il entier ?",
      verification: { type: "courte", attendus: ["4"], unite: "valeurs" },
      dessin: pinceaux,
    },
  ],
};

export default problemes;
