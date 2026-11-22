// Énigmes à projeter — première (sans spé maths), notion expo_modeliser
// (les trois boutiques de bijoux, l'antibiotique, les vers du compost, la goutte
// de lait, piège de la place de voilier, défi des deux colonies de fourmis). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 20) =>
  r(30, y, 420, 22 + 34 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 36 + 34 * k, s, c, taille)).join("");

const bijoux = svg("Ventes de trois boutiques de bijoux : Lune 100, 150, 200, 250 ; Soleil 100, 120, 160, 170 ; Étoile 100, 150, 225, 337,5",
  tableau(25, 50, [110, 80, 80, 80, 80], 52, [["mois", 0, 1, 2, 3], ["Lune", 100, 150, 200, 250], ["Soleil", 100, 120, 160, 170], ["Étoile", 100, 150, 225, "337,5"]], (i, j) => (j === 0 || i === 0 ? C.pale : C.craie), 21) +
    t(240, 385, `laquelle est exponentielle${NB}?`, C.rose, 24));

const antibio = svg("Antibiotique : dose de 500 mg, le corps en élimine 30 % chaque heure",
  cadre(40, ["dose : 500 mg", "− 30 % chaque heure"], C.bleu, 24) +
    t(240, 220, "f(x) : mg restants après x heures", C.pale, 20) +
    t(240, 385, `quel modèle${NB}?`, C.rose, 26));

const compost = (() => {
  const R = repereXY(0, 12, 0, 2800, { gx: 90, gy: 40, gl: 330, gh: 270, px: 2, ex: 2, py: 400, ey: 400 });
  return svg("Vers d'un compost : plan A, 1 000 + 100n ; plan B, 1 000 × 1,08 puissance n, sur 12 semaines",
    R.fond + R.courbe((x) => 1000 + 100 * x, 0, 12, C.jaune, 4) + R.courbe((x) => 1000 * 1.08 ** x, 0, 12, C.bleu, 4) +
      t(R.X(10), R.Y(2000) + 34, "A", C.jaune, 22) + t(R.X(11.4), R.Y(2600), "B", C.bleu, 22, "end") +
      t(R.X(0) + 10, 28, "vers", C.pale, 17, "start") + t(R.X(12), R.Y(0) + 46, "semaines", C.pale, 17, "end") +
      t(240, 405, `à la semaine 12${NB}?`, C.rose, 24));
})();

const lait = svg("Bactéries dans une goutte de lait : leur nombre double toutes les 20 minutes, 30 doublements en 10 heures",
  cadre(40, ["1 bactérie au départ", "× 2 toutes les 20 min"], C.bleu, 24) +
    t(240, 210, `10 h = 30 doublements`, C.pale, 20) +
    t(240, 255, `2${"<tspan dy=\"-11\" font-size=\"16\">10</tspan><tspan dy=\"11\" dx=\"7\">≈ 1 000</tspan>"}`, C.jaune, 26) +
    t(240, 385, `combien de zéros${NB}?`, C.rose, 26));

const voilier = svg("Place de voilier au port : 2 000 € par an, + 5 % chaque année ; Lou dit 2 200 € dans 2 ans",
  cadre(40, ["2 000 € cette année", "+ 5 % chaque année"], C.bleu, 24) +
    t(240, 220, "Lou : « dans 2 ans, 2 200 € »", C.pale, 20) +
    t(240, 385, `dans 2 ans${NB}?`, C.rose, 26));

const fourmis = svg("Deux colonies de fourmis : A, 1 000 × 1,1 puissance n ; B, 2 000 + 100n ; valeurs pour n = 11 à 13",
  tableau(25, 50, [110, 105, 105, 105], 56, [["année n", 11, 12, 13], ["A", "≈ 2 853", "≈ 3 138", "?"], ["B", "3 100", "3 200", "3 300"]], (i, j) => (j === 0 || i === 0 ? C.pale : C.craie), 21) +
    t(240, 250, "A : 1 000 × 1,1ⁿ  ·  B : 2 000 + 100n", C.pale, 20) +
    t(240, 385, `A dépasse B en n = ${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "expo_modeliser",
  titre: "Énigmes pour modéliser une croissance exponentielle",
  description: "Les trois boutiques de bijoux, l'antibiotique, les vers du compost, la goutte de lait, le piège de la place de voilier, le défi des deux colonies de fourmis : reconnaître un phénomène exponentiel, choisir le modèle, comparer modèle linéaire et modèle exponentiel, estimer un ordre de grandeur.",
  problemes: [
    {
      tag: "Énigme 1 · Les trois boutiques de bijoux",
      titre: "Reconnaître une croissance exponentielle",
      question: `Le tableau donne les ventes de trois boutiques de bijoux en ligne : Lune, Soleil et Étoile.<br><br><b>Laquelle</b> a une croissance exponentielle ?`,
      reponse: `Lune : + 50 chaque mois (linéaire). Soleil : ni + ni × constant.<br>Étoile : 150 ÷ 100 = 225 ÷ 150 = 337,5 ÷ 225 = 1,5. <span class="big">Étoile</span> : × 1,5 chaque mois.`,
      consigne: "Lune 100, 150, 200, 250 ; Soleil 100, 120, 160, 170 ; Étoile 100, 150, 225, 337,5 : laquelle est exponentielle ?",
      verification: { type: "qcm", choix: ["Lune", "Soleil", "Étoile"], bonne: 2 },
      dessin: bijoux,
    },
    {
      tag: "Énigme 2 · L'antibiotique",
      titre: "Choisir le modèle",
      question: `Un patient prend 500 mg d'antibiotique. Chaque heure, son corps en élimine 30 %.<br><br><b>Quel modèle</b> donne la quantité restante f(x) après x heures ?`,
      reponse: `Perdre 30 %, c'est garder 70 % : × 0,7 chaque heure.<br><span class="big">f(x) = 500 × 0,7<sup>x</sup></span>. (500 − 30x enlèverait 30 mg, pas 30 %.)`,
      consigne: "500 mg, − 30 % chaque heure : quel modèle donne la quantité restante f(x) ?",
      verification: { type: "qcm", choix: ["f(x) = 500 − 30x", "f(x) = 500 × 0,7ˣ", "f(x) = 500 × 0,3ˣ"], bonne: 1 },
      dessin: antibio,
    },
    {
      tag: "Énigme 3 · Les vers du compost",
      titre: "Linéaire ou exponentiel",
      question: `Un composteur a 1 000 vers. Plan A : + 100 vers par semaine. Plan B : + 8 % par semaine, soit 1 000 × 1,08<sup>n</sup>.<br><br><b>Quel plan</b> donne le plus de vers à la semaine 12 ?`,
      reponse: `A : 1 000 + 100 × 12 = 2 200 vers. B : 1 000 × 1,08<sup>12</sup> ≈ 2 518 vers.<br>C'est <span class="big">le plan B</span> : l'exponentielle part doucement, puis dépasse la droite.`,
      consigne: "A : 1 000 + 100n ; B : 1 000 × 1,08ⁿ : quel plan donne le plus de vers à la semaine 12 ?",
      verification: { type: "qcm", choix: ["Le plan B (exponentiel)", "Le plan A (linéaire)", "Les deux donnent autant"], bonne: 0 },
      dessin: compost,
    },
    {
      tag: "Énigme 4 · La goutte de lait",
      titre: "Un ordre de grandeur",
      question: `Dans une goutte de lait oubliée au soleil, le nombre de bactéries double toutes les 20 minutes. On part d'une bactérie. En 10 h, il y a 30 doublements : 2<sup>30</sup> bactéries.<br>On sait que 2<sup>10</sup> ≈ 1 000.<br><br>2<sup>30</sup> s'écrit environ 1 suivi de <b>combien de zéros</b> ?`,
      reponse: `2<sup>30</sup> = 2<sup>10</sup> × 2<sup>10</sup> × 2<sup>10</sup> ≈ 1 000 × 1 000 × 1 000 = 10<sup>9</sup>.<br><span class="big">9 zéros</span> : environ un milliard de bactéries en 10 h !`,
      consigne: "2 puissance 10 ≈ 1 000 : 2 puissance 30 s'écrit environ 1 suivi de combien de zéros ?",
      verification: { type: "courte", attendus: ["9", "neuf"], unite: "zéros" },
      dessin: lait,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La place de voilier",
      sorte: "piege",
      question: `Au port, la place d'un voilier coûte 2 000 € cette année. Le prix augmente de 5 % chaque année.<br>Lou dit : « + 100 € par an, donc 2 200 € dans 2 ans. »<br><br><b>Combien</b> coûtera la place dans 2 ans ?`,
      reponse: `+ 5 % chaque année, c'est × 1,05 : le modèle est exponentiel, pas linéaire.<br>2 000 × 1,05 × 1,05 = 2 000 × 1,1025 = <span class="big">2 205 €</span>.`,
      consigne: "2 000 €, + 5 % chaque année : combien coûtera la place dans 2 ans (en €) ?",
      verification: { type: "courte", attendus: ["2205", "2 205"], unite: "€" },
      dessin: voilier,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux colonies de fourmis",
      sorte: "defi",
      question: `Dans un terrarium, la colonie A compte 1 000 × 1,1<sup>n</sup> fourmis l'année n. La colonie B compte 2 000 + 100n fourmis.<br><br><b>À partir de quelle année</b> n la colonie A dépasse-t-elle B ?`,
      reponse: `n = 12 : A ≈ 3 138 et B = 3 200, donc A &lt; B.<br>n = 13 : A = 1 000 × 1,1<sup>13</sup> ≈ 3 452 et B = 3 300. A dépasse B à partir de <span class="big">n = 13</span>.`,
      consigne: "A : 1 000 × 1,1ⁿ ; B : 2 000 + 100n : à partir de quelle année n A dépasse-t-elle B ?",
      verification: { type: "courte", attendus: ["13", "n = 13", "n=13"] },
      dessin: fourmis,
    },
  ],
};

export default problemes;
