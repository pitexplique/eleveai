// Énigmes à projeter — 3e, notion stat_statistique (la moyenne avec
// coefficients du bulletin, les heures de sommeil, les pointures du club,
// le 5e match de basket, piège du salaire moyen, défi des cinq notes
// cachées). 21/11/2026. ⛔ Ne reprend pas la 4e (météo, bus, oiseaux,
// fratries, deux groupes, fléchettes).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

/** Un tableau : colonnes de largeurs w, lignes de hauteur h, texte centré. */
const tableau = (x: number, y: number, w: number[], h: number, lignes: string[][], taille = 22) => {
  let s = "", yy = y;
  lignes.forEach((lg, i) => {
    let xx = x;
    lg.forEach((cel, j) => {
      s += r(xx, yy, w[j], h, i === 0 ? C.bleu : C.craie, i === 0 ? 0.15 : 0, 2) + t(xx + w[j] / 2, yy + h / 2 + taille * 0.35, cel, i === 0 ? C.bleu : C.craie, taille);
      xx += w[j];
    });
    yy += h;
  });
  return s;
};

/** Des barres verticales posées sur yBase, valeur écrite au-dessus. */
const barres = (x0: number, yBase: number, pas: number, larg: number, vals: (number | string)[], k: number, c: string, etiq: string[] = [], affiche = true) =>
  vals.map((v, i) => {
    const x = x0 + i * pas;
    if (typeof v === "string") return r(x, yBase - 90, larg, 90, C.rose, 0, 3).replace("/>", ' stroke-dasharray="8 6"/>') + t(x + larg / 2, yBase - 100, v, C.rose, 26) + (etiq[i] ? t(x + larg / 2, yBase + 26, etiq[i], C.craie, 18) : "");
    const h = v * k;
    return r(x, yBase - h, larg, h, c, 0.35, 3) + (affiche ? t(x + larg / 2, yBase - h - 8, String(v).replace(".", ","), C.craie, 18) : "") + (etiq[i] ? t(x + larg / 2, yBase + 26, etiq[i], C.craie, 18) : "");
  }).join("") + l(x0 - 10, yBase, x0 + vals.length * pas, yBase, C.craie, 3);

const bulletin = svg(
  "Un bulletin : contrôle 14 sur 20 coefficient 2, interrogation 8 coefficient 1, devoir maison 17 coefficient 1",
  tableau(60, 90, [170, 90, 100], 56, [["Évaluation", "Note", "Coef."], ["Contrôle", "14", "2"], ["Interro", "8", "1"], ["DM", "17", "1"]]) +
    t(240, 350, `moyenne${NB}?`, C.rose, 30)
);

const sommeil = svg(
  "Les heures de sommeil de 9 élèves : 7 ; 8,5 ; 6 ; 9 ; 7,5 ; 8 ; 6,5 ; 10 ; 8",
  barres(40, 330, 46, 34, [7, 8.5, 6, 9, 7.5, 8, 6.5, 10, 8], 22, C.bleu) + t(240, 380, "heures de sommeil d'une nuit", C.craie, 20) + t(240, 410, `médiane${NB}?`, C.rose, 24)
);

const pointures = svg(
  "Diagramme en bâtons des pointures d'un club de foot : 38 : 3 joueurs, 39 : 5, 40 : 8, 41 : 6, 42 : 3",
  barres(60, 330, 80, 40, [3, 5, 8, 6, 3], 28, C.jaune, ["38", "39", "40", "41", "42"]) + t(240, 385, "pointure", C.craie, 18) +
    t(240, 410, `25 joueurs · médiane${NB}?`, C.rose, 22)
);

const basket = svg(
  "Les points marqués en 4 matchs : 18, 22, 15, 25, et le 5e match inconnu",
  barres(50, 320, 82, 54, [18, 22, 15, 25, "?"], 9, C.bleu, ["M1", "M2", "M3", "M4", "M5"]) +
    l(40, 320 - 21 * 9, 450, 320 - 21 * 9, C.rose, 2, "8 6") + t(240, 50, "pointillés : moyenne visée, 21", C.rose, 20).replace(" :", `${NB}:`)
);

// 1 px = 40 € : 12 000 € → 300 px.
const salaires = svg(
  "Les salaires mensuels d'une entreprise : 1 800, 1 900, 2 000, 2 100 et 12 000 euros pour le patron",
  barres(50, 360, 82, 54, [1800, 1900, 2000, 2100, 12000], 0.025, C.jaune, [], false) +
    ["1 800", "1 900", "2 000", "2 100"].map((s, i) => t(77 + i * 82, 300, s, C.craie, 17)).join("") + t(405, 50, "12 000", C.craie, 17) + t(405, 390, "patron", C.craie, 18) +
    t(170, 120, "« En moyenne, on gagne", C.rose, 20).replace("« ", `«${NB}`) + t(170, 146, "près de 4 000 € ici. »", C.rose, 20).replace(" »", `${NB}»`) + t(170, 410, "salaires en €, au bon rapport", C.pale, 16)
);

const cartes = svg(
  "Cinq cartes retournées : cinq notes entières de 0 à 20 rangées dans l'ordre",
  [0, 1, 2, 3, 4].map((i) => r(40 + i * 82, 80, 70, 100, C.bleu, 0.2, 3, 8) + t(75 + i * 82, 145, "?", C.bleu, 36)).join("") +
    t(240, 240, "médiane : 15", C.craie, 26).replace(" :", `${NB}:`) + t(240, 285, "moyenne : 10", C.craie, 26).replace(" :", `${NB}:`) + t(240, 330, "étendue : 20", C.craie, 26).replace(" :", `${NB}:`) +
    t(240, 390, "notes entières, de 0 à 20", C.pale, 18)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "stat_statistique",
  titre: "Énigmes des statistiques",
  description: "La moyenne avec coefficients du bulletin, les heures de sommeil, les pointures du club de foot, le 5e match de basket, le piège du salaire moyen, le défi des cinq notes cachées : moyenne pondérée, médiane, étendue, interpréter.",
  problemes: [
    {
      tag: "Énigme 1 · Le bulletin",
      titre: "La moyenne avec coefficients",
      question: `Inès a eu <b>14</b> au contrôle (coefficient <b>2</b>), <b>8</b> à l'interro (coefficient 1) et <b>17</b> au devoir maison (coefficient 1).<br><br><b>Quelle est sa moyenne</b> ?`,
      reponse: `On compte le contrôle deux fois : (14 × 2 + 8 + 17) ÷ (2 + 1 + 1) = 53 ÷ 4 = <span class="big">13,25</span>.<br>Sans coefficients, elle aurait eu 13.`,
      consigne: "Quelle est la moyenne d'Inès ?",
      verification: {"type":"courte","attendus":["13,25"],"unite":"sur 20"},
      dessin: bulletin,
    },
    {
      tag: "Énigme 2 · Le sommeil",
      titre: "Combien d'heures de sommeil ?",
      question: `Neuf élèves ont noté leurs heures de sommeil d'une nuit :<br><b>7 ; 8,5 ; 6 ; 9 ; 7,5 ; 8 ; 6,5 ; 10 ; 8</b><br><br><b>Quelle est la médiane</b> de cette série ?`,
      reponse: `On range : 6 ; 6,5 ; 7 ; 7,5 ; <b>8</b> ; 8 ; 8,5 ; 9 ; 10.<br>9 valeurs : la médiane est la 5e, <span class="big">8 h</span>. La moitié des élèves dort au moins 8 h.`,
      consigne: "Quelle est la médiane, en heures ?",
      verification: {"type":"courte","attendus":["8"],"unite":"h"},
      dessin: sommeil,
    },
    {
      tag: "Énigme 3 · Les pointures",
      titre: "Les chaussures du club",
      question: `Dans un club de foot de <b>25 joueurs</b>, les pointures sont : 38 (3 joueurs), 39 (5), 40 (8), 41 (6), 42 (3).<br><br><b>Quelle est la pointure médiane</b> ?`,
      reponse: `25 valeurs : la médiane est la 13e. On cumule : 3, puis 8, puis 16 : la 13e valeur est dans le 40.<br>Médiane : <span class="big">40</span>.`,
      consigne: "Quelle est la pointure médiane ?",
      verification: {"type":"courte","attendus":["40"]},
      dessin: pointures,
    },
    {
      tag: "Énigme 4 · Le basket",
      titre: "Le cinquième match",
      question: `Noah a marqué <b>18, 22, 15 et 25 points</b> lors de ses quatre premiers matchs.<br><br>Combien doit-il marquer au 5e match pour avoir <b>21 points de moyenne</b> ?`,
      reponse: `Pour 21 de moyenne sur 5 matchs, il faut 21 × 5 = 105 points en tout.<br>Il en a déjà 18 + 22 + 15 + 25 = 80. Il lui faut <span class="big">25 points</span>.`,
      consigne: "Combien de points doit-il marquer au 5e match ?",
      verification: {"type":"courte","attendus":["25"],"unite":"points"},
      dessin: basket,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le salaire moyen",
      sorte: "piege",
      question: `Dans une petite entreprise, les salaires sont : 1 800 €, 1 900 €, 2 000 €, 2 100 € et <b>12 000 €</b> pour le patron. Il annonce : « En moyenne, on gagne près de 4 000 € ici. »<br><br>Combien de personnes gagnent <b>plus de 3 000 €</b> ?`,
      reponse: `La moyenne vaut bien 19 800 ÷ 5 = 3 960 €, mais une seule valeur la tire vers le haut.<br><span class="big">Une seule personne</span> : le patron. La médiane, 2 000 €, décrit mieux le salaire habituel.`,
      consigne: "Combien de personnes gagnent plus de 3 000 € ?",
      verification: {"type":"qcm","choix":["Presque tous","La moitié","Une seule"],"bonne":2},
      dessin: salaires,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les cinq notes cachées",
      sorte: "defi",
      question: `Cinq élèves ont eu des notes entières, de 0 à 20. Leur <b>médiane</b> vaut 15, leur <b>moyenne</b> 10 et leur <b>étendue</b> 20.<br><br><b>Combien d'élèves</b> ont eu 0 ?`,
      reponse: `Étendue 20 entre 0 et 20 : la plus petite note est 0, la plus grande 20. Rangées : 0 ; b ; 15 ; d ; 20.<br>Moyenne 10 : la somme vaut 50, donc b + d = 15. Or d ≥ 15 : d = 15 et b = 0.<br>Les notes : 0 ; 0 ; 15 ; 15 ; 20. <span class="big">Deux élèves</span> ont eu 0.`,
      consigne: "Combien d'élèves ont eu 0 ?",
      verification: {"type":"courte","attendus":["2","deux"],"unite":"élèves"},
      dessin: cartes,
    },
  ],
};

export default problemes;
