// Énigmes à projeter — terminale spé maths, notion limite_suite
// (la tasse de thé, les abonnés de l'influenceuse, la cave à vin, le record du
// club d'athlétisme, piège de la barre de chargement, défi de la balançoire). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";
import { ind } from "../dessins-tle";

const the = (() => {
  const R = repereXY(0, 15, 0, 90, { gx: 80, gy: 60, gl: 340, gh: 260, px: 1, py: 10, ex: 5, ey: 20 });
  let s = R.fond + l(R.X(0), R.Y(20), R.X(15), R.Y(20), C.rose, 3, "8 6");
  for (let n = 0; n <= 15; n++) s += R.point(n, 20 + 60 * 0.8 ** n, C.bleu, 6);
  return svg("Température du thé u(n) = 20 + 60 × 0,8 puissance n : les points descendent de 80 vers une droite en pointillés à 20",
    s + t(R.X(0) + 12, 40, `${ind("u", "n", " = 20 + 60 × 0,8ⁿ")}`, C.bleu, 22, "start") + t(R.X(15) + 22, R.Y(20) + 8, "?", C.rose, 26) +
      t(240, 405, `vers quelle température${NB}?`, C.rose, 22));
})();

const abonnes = svg("Tableau : pour n = 10, 100 et 1 000, u(n) = 3n² − 5n + 2 vaut 252, 29 502 et 2 995 002",
  t(240, 60, `${ind("u", "n", " = 3n² − 5n + 2")}`, C.bleu, 28) +
    tableau(20, 110, [80, 90, 110, 160], 64, [["n", 10, 100, "1 000"], [ind("u", "n"), 252, "29 502", "2 995 002"]], (i, j) => (j === 0 ? C.pale : C.craie), 24) +
    t(240, 300, "en abonnés, au mois n", C.pale, 20) + t(240, 385, `et quand n devient très grand${NB}?`, C.rose, 22));

const cave = (() => {
  const R = repereXY(0, 10, 10.5, 13.5, { gx: 80, gy: 60, gl: 340, gh: 260, px: 1, py: 0.5, ex: 2, ey: 0.5 });
  let s = R.fond + R.courbe((x) => 12 + 1 / x, 1, 10, C.pale, 2) + R.courbe((x) => 12 - 1 / x, 1, 10, C.pale, 2);
  for (let n = 1; n <= 10; n++) s += R.point(n, 12 + (-1) ** n / n, C.bleu, 7);
  return svg("Température de la cave u(n) = 12 + (−1) puissance n ÷ n : les points oscillent entre deux courbes qui se resserrent",
    s + t(R.X(0) + 12, 40, `${ind("u", "n", " = 12 + (−1)ⁿ ÷ n")}`, C.bleu, 22, "start") +
      t(240, 405, `la limite${NB}?`, C.rose, 24));
})();

const record = (() => {
  const R = repereXY(0, 8, 6.5, 9.5, { gx: 80, gy: 60, gl: 340, gh: 260, px: 1, py: 0.5, ex: 2, ey: 0.5 });
  const v = [7.0, 7.4, 7.7, 7.85, 7.95, 8.0, 8.05, 8.08, 8.1];
  let s = R.fond + l(R.X(0), R.Y(9), R.X(8), R.Y(9), C.rose, 3, "8 6");
  v.forEach((y, n) => { s += R.point(n, y, C.bleu, 7); });
  return svg("Record du club en mètres : les points montent doucement de 7 à 8,1 et restent sous une droite en pointillés à 9",
    s + t(R.X(0) + 12, 40, "record de l'année n, en m", C.bleu, 22, "start") + t(R.X(7.5), R.Y(9) - 12, "9 m", C.rose, 20) +
      t(240, 405, `que fait la suite${NB}?`, C.rose, 22));
})();

const chargement = (() => {
  const barre = (y: number, n: number, pc: number) =>
    t(100, y + 28, `n = ${n}`, C.pale, 22, "end") + r(120, y, 290, 40, C.craie, 0, 3, 6) + (pc ? r(120, y, 2.9 * pc, 40, C.bleu, 0.5, 0, 6) : "") + t(475, y + 28, `${pc}${NB}%`, C.bleu, 22, "end");
  return svg("Barre de chargement : 0 % pour n = 0, 50 % pour n = 1, 75 % pour n = 3, 90 % pour n = 9 ; Léa dit que ça tend vers l'infini",
    t(240, 45, `${ind("p", "n", " = 100 − 100 ÷ (n + 1)")}`, C.bleu, 24) +
      barre(70, 0, 0) + barre(125, 1, 50) + barre(180, 3, 75) + barre(235, 9, 90) +
      t(240, 330, `Léa${NB}: « ça monte toujours, donc +∞${NB}»`, C.jaune, 22) + t(240, 395, `la limite${NB}?`, C.rose, 24));
})();

const balancoire = (() => {
  const X = (v: number) => 40 + v * 25;
  const pas = [4, 3, 2.25, 1.6875, 1.265625, 0.94921875];
  let s = l(X(0), 220, X(16) + 10, 220, C.pale, 2);
  let a = 0;
  pas.forEach((d, k) => { s += l(X(a), 220, X(a + d), 220, k % 2 ? C.jaune : C.bleu, 10); a += d; });
  for (const v of [0, 4, 8, 12, 16]) s += l(X(v), 205, X(v), 235, C.craie, 2) + t(X(v), 265, v, C.pale, 20);
  s += l(X(16), 120, X(16), 205, C.rose, 3, "8 6") + t(X(16) - 14, 110, "?", C.rose, 26);
  return svg("Distance totale de la balançoire, en mètres, sur une droite graduée de 0 à 16 : 4, puis 3, puis 2,25… les morceaux bout à bout",
    t(240, 60, "aller 1 : 4 m · ensuite × 0,75", C.bleu, 24) + s + t(240, 330, "distance totale après n allers", C.pale, 20) +
      t(240, 395, `la distance totale ne dépasse jamais${NB}?`, C.rose, 22));
})();

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "limite_suite",
  titre: "Énigmes des limites de suites",
  description: "La tasse de thé, les abonnés de l'influenceuse, la cave à vin, le record du club d'athlétisme, le piège de la barre de chargement, le défi de la balançoire : limite d'une suite, opérations, théorème des gendarmes, convergence monotone, somme géométrique.",
  problemes: [
    {
      tag: "Énigme 1 · La tasse de thé",
      titre: "Une limite simple",
      question: `Un thé à 80 °C refroidit dans une pièce. Après n minutes, sa température est u<sub>n</sub> = 20 + 60 × 0,8<sup>n</sup>.<br><br><b>Vers quelle température</b> tend le thé ?`,
      reponse: `0 &lt; 0,8 &lt; 1, donc 0,8<sup>n</sup> tend vers 0, et 60 × 0,8<sup>n</sup> aussi.<br>u<sub>n</sub> tend vers <span class="big">20 °C</span> : la température de la pièce.`,
      consigne: "u(n) = 20 + 60 × 0,8^n : vers quelle température tend le thé ?",
      verification: { type: "courte", attendus: ["20"], unite: "°C" },
      dessin: the,
    },
    {
      tag: "Énigme 2 · Les abonnés de l'influenceuse",
      titre: "Les opérations sur les limites",
      question: `Au mois n, une influenceuse a u<sub>n</sub> = 3n² − 5n + 2 abonnés.<br><br><b>Quelle est la limite</b> de (u<sub>n</sub>) ?`,
      reponse: `On factorise par n² : u<sub>n</sub> = n²(3 − 5 ÷ n + 2 ÷ n²).<br>La parenthèse tend vers 3 et n² vers +∞ : u<sub>n</sub> tend vers <span class="big">+∞</span>.`,
      consigne: "u(n) = 3n² − 5n + 2 : quelle est la limite de la suite ?",
      verification: { type: "qcm", choix: ["+∞", "−∞", "3"], bonne: 0 },
      dessin: abonnes,
    },
    {
      tag: "Énigme 3 · La cave à vin",
      titre: "Le théorème des gendarmes",
      question: `Au n-ième relevé (n ≥ 1), la température d'une cave à vin est u<sub>n</sub> = 12 + (−1)<sup>n</sup> ÷ n, en °C.<br><br><b>Vers quelle température</b> tend la cave ?`,
      reponse: `−1 ≤ (−1)<sup>n</sup> ≤ 1, donc 12 − 1 ÷ n ≤ u<sub>n</sub> ≤ 12 + 1 ÷ n.<br>Les deux bornes tendent vers 12 : par les gendarmes, u<sub>n</sub> tend vers <span class="big">12 °C</span>.`,
      consigne: "u(n) = 12 + (−1)^n ÷ n : vers quelle température tend la cave ?",
      verification: { type: "courte", attendus: ["12"], unite: "°C" },
      dessin: cave,
    },
    {
      tag: "Énigme 4 · Le record du club d'athlétisme",
      titre: "La convergence monotone",
      question: `Chaque année, le record de saut en longueur d'un club est battu ou égalé. On sait qu'il restera toujours sous 9 m.<br><br>La suite des records est croissante et majorée par 9. <b>Que peut-on dire</b> ?`,
      reponse: `Une suite croissante et majorée <b>converge</b>.<br>Sa limite est au plus 9 m, mais pas forcément 9 : <span class="big">elle converge vers une limite ≤ 9</span>.`,
      consigne: "Une suite croissante et majorée par 9 : que peut-on dire ?",
      verification: { type: "qcm", choix: ["Elle tend vers +∞", "Elle converge vers une limite ≤ 9", "Elle converge forcément vers 9"], bonne: 1 },
      dessin: record,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La barre de chargement",
      sorte: "piege",
      question: `Un jeu se charge : après n secondes, la barre affiche p<sub>n</sub> = 100 − 100 ÷ (n + 1) %.<br>Léa : « Elle monte toujours, donc elle tend vers +∞. »<br><br><b>Quelle est la limite</b> de (p<sub>n</sub>) ?`,
      reponse: `Croissante ne veut pas dire « tend vers +∞ ». 100 ÷ (n + 1) tend vers 0.<br>p<sub>n</sub> tend vers <span class="big">100 %</span>, sans jamais le dépasser.`,
      consigne: "p(n) = 100 − 100 ÷ (n + 1) : quelle est la limite de la suite ?",
      verification: { type: "qcm", choix: ["+∞", "99", "100"], bonne: 2 },
      dessin: chargement,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La balançoire",
      sorte: "defi",
      question: `On lâche une balançoire. Le 1er aller fait 4 m, puis chaque aller fait 0,75 fois le précédent.<br><br>La distance totale après n allers est S<sub>n</sub> = 4 + 3 + 2,25 + … <b>Quelle est sa limite</b> ?`,
      reponse: `Somme géométrique : S<sub>n</sub> = 4 × (1 − 0,75<sup>n</sup>) ÷ (1 − 0,75) = 16(1 − 0,75<sup>n</sup>).<br>0,75<sup>n</sup> tend vers 0 : S<sub>n</sub> tend vers <span class="big">16 m</span>.`,
      consigne: "4 + 3 + 2,25 + … (chaque terme × 0,75) : quelle est la limite de la distance totale ?",
      verification: { type: "courte", attendus: ["16"], unite: "m" },
      dessin: balancoire,
    },
  ],
};

export default problemes;
