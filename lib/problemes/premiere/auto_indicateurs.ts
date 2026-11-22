// Énigmes à projeter — première (sans spé maths), notion auto_indicateurs
// (les appels du service client, le Rubik's cube, l'équipe de foot, les deux
// marques d'ampoules, piège du salaire du patron, défi de la joueuse de
// fléchettes). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY, boite } from "../dessins-1re";

const appels = svg("Un tableau : durée des appels de 0 à 4 min, 10 appels ; de 4 à 8 min, 25 appels ; de 8 à 12 min, 15 appels",
  tableau(40, 60, [170, 80, 80, 80], 60, [["durée (min)", "[0 ; 4[", "[4 ; 8[", "[8 ; 12["], ["appels", "10", "25", "15"], ["centre", "2", "6", "10"]],
    (i, j) => (i === 2 && j > 0 ? C.jaune : C.craie), 22) +
    t(240, 290, "50 appels en tout", C.craie, 22) + t(240, 380, `la durée moyenne${NB}?`, C.rose, 26));

const rubik = (() => {
  const v = [18, 22, 25, 27, 31, 34, 40, 55];
  let s = "";
  v.forEach((n, i) => { const x = 40 + i * 52; s += r(x, 120, 44, 60, i === 3 || i === 4 ? C.jaune : C.bleu, 0.25, 3, 8) + t(x + 22, 160, n, C.craie, 22); });
  return svg("Huit temps rangés, en secondes : 18, 22, 25, 27, 31, 34, 40, 55",
    t(240, 80, "8 temps au Rubik's cube (s)", C.craie, 22) + s + t(240, 380, `le temps médian${NB}?`, C.rose, 26));
})();

const foot = (() => {
  const v = [19, 20, 21, 22, 23, 24, 25, 27, 28, 30, 33];
  let s = "";
  v.forEach((n, i) => {
    const x = 50 + (i % 6) * 76, y = i < 6 ? 120 : 220;
    s += o(x, y, 28, C.bleu, 0.2, 3) + t(x, y + 8, n, C.craie, 22);
  });
  return svg("Les âges rangés des 11 joueurs d'une équipe : 19, 20, 21, 22, 23, 24, 25, 27, 28, 30, 33",
    t(240, 60, "âges des 11 joueurs, rangés", C.craie, 22) + s + t(240, 380, `Q1 et Q3${NB}?`, C.rose, 26));
})();

const ampoules = (() => {
  const R = repereXY(0, 18, 0, 1, { gx: 70, gy: 40, gl: 370, gh: 250, px: 1, ex: 2, py: 1, ey: 1, quadrillage: false });
  const fond = R.fond.replace(/<text[^>]*text-anchor="end">1<\/text>/, "").replace(/<text[^>]*>0<\/text>/, "");
  return svg("Deux boîtes à moustaches : marque A de 6 à 14 avec la boîte de 9 à 11 et la médiane 10 ; marque B de 4 à 16 avec la boîte de 7 à 13 et la médiane 11",
    fond + boite(R, 110, [6, 9, 10, 11, 14], C.bleu) + boite(R, 220, [4, 7, 11, 13, 16], C.jaune) +
      t(R.X(0) + 10, 90, "A", C.bleu, 22, "start") + t(R.X(0) + 10, 200, "B", C.jaune, 22, "start") +
      t(R.X(18), R.Y(0) + 46, "milliers d'heures", C.pale, 17, "end") + t(240, 405, `la plus régulière${NB}?`, C.rose, 26));
})();

const salaires = (() => {
  let s = "";
  for (let i = 0; i < 9; i++) {
    const x = 50 + (i % 5) * 70, y = 90 + Math.floor(i / 5) * 90;
    s += o(x, y, 14, C.bleu, 0.4, 3) + l(x, y + 14, x, y + 40, C.bleu, 4) + t(x, y + 62, "1 800", C.craie, 15);
  }
  s += o(400, 190, 24, C.jaune, 0.5, 3) + l(400, 214, 400, 260, C.jaune, 6) + t(400, 290, "12 000", C.jaune, 20);
  return svg("Neuf salariés à 1 800 euros et le patron à 12 000 euros",
    s + t(240, 340, "« Salaire moyen : 2 820 € ! »", C.craie, 20) + t(240, 395, `et le salaire médian${NB}?`, C.rose, 24));
})();

const flechettes = svg("Une cible de fléchettes ; 5 lancers de moyenne 12, puis un 6e lancer qui fait passer la moyenne à 13",
  o(150, 180, 110, C.craie, 0, 3) + o(150, 180, 75, C.bleu, 0.2, 3) + o(150, 180, 40, C.jaune, 0.3, 3) + o(150, 180, 10, C.rose, 1, 2) +
    l(250, 120, 175, 170, C.craie, 4) + t(290, 130, "5 lancers", C.craie, 20, "start") + t(290, 160, "moyenne 12", C.bleu, 20, "start") +
    t(290, 220, "6e lancer ?", C.rose, 20, "start") + t(290, 250, "moyenne 13", C.jaune, 20, "start") +
    t(240, 380, `combien de points au 6e${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_indicateurs",
  titre: "Énigmes de la moyenne, de la médiane et des quartiles",
  description: "Les appels du service client, le Rubik's cube, l'équipe de foot, les deux marques d'ampoules, le piège du salaire du patron, le défi des fléchettes : moyenne par classes, médiane, quartiles, boîtes à moustaches et interprétation.",
  problemes: [
    {
      tag: "Énigme 1 · Le service client",
      titre: "Une moyenne par classes",
      question: `Un service client a noté la durée de ses 50 appels de la matinée, par classes.<br><br><b>Quelle est la durée moyenne</b> d'un appel ?`,
      reponse: `On remplace chaque classe par son centre : (10 × 2 + 25 × 6 + 15 × 10) ÷ 50 = (20 + 150 + 150) ÷ 50 = 320 ÷ 50.<br>Durée moyenne : <span class="big">6,4 min</span>.`,
      consigne: "Centres 2, 6, 10 et effectifs 10, 25, 15 : quelle durée moyenne, en minutes ?",
      verification: { type: "courte", attendus: ["6,4"], unite: "min" },
      dessin: appels,
    },
    {
      tag: "Énigme 2 · Le Rubik's cube",
      titre: "Une médiane, 8 valeurs",
      question: `Huit amis résolvent un Rubik's cube. Leurs temps, rangés : 18, 22, 25, 27, 31, 34, 40 et 55 secondes.<br><br><b>Quel est le temps médian</b> ?`,
      reponse: `8 valeurs : la médiane est entre la 4e et la 5e, 27 et 31.<br>(27 + 31) ÷ 2 = <span class="big">29 s</span>. Moitié des amis plus rapides, moitié plus lents.`,
      consigne: "18, 22, 25, 27, 31, 34, 40, 55 : quel est le temps médian ?",
      verification: { type: "qcm", choix: ["31,5 s", "29 s", "34 s"], bonne: 1 },
      dessin: rubik,
    },
    {
      tag: "Énigme 3 · L'équipe de foot",
      titre: "Les quartiles",
      question: `Les âges des 11 joueurs d'une équipe, rangés : 19, 20, 21, 22, 23, 24, 25, 27, 28, 30, 33.<br><br><b>Que valent Q1 et Q3</b> ?`,
      reponse: `11 ÷ 4 = 2,75 : Q1 est la 3e valeur, <b>21</b>. 3 × 11 ÷ 4 = 8,25 : Q3 est la 9e valeur, <b>28</b>.<br><span class="big">Q1 = 21 et Q3 = 28</span> : la moitié centrale a entre 21 et 28 ans.`,
      consigne: "19, 20, 21, 22, 23, 24, 25, 27, 28, 30, 33 : que valent Q1 et Q3 ?",
      verification: { type: "qcm", choix: ["21 et 28", "20,5 et 28,5", "22 et 27"], bonne: 0 },
      dessin: foot,
    },
    {
      tag: "Énigme 4 · Les ampoules",
      titre: "Comparer deux boîtes",
      question: `On a testé la durée de vie de deux marques d'ampoules (en milliers d'heures).<br><br><b>Quelle marque</b> a l'écart interquartile le plus petit, donc les durées les plus régulières ?`,
      reponse: `A : Q3 − Q1 = 11 − 9 = 2. B : 13 − 7 = 6.<br><span class="big">La marque A</span> est la plus régulière, même si B a une meilleure médiane (11 contre 10).`,
      consigne: "Boîte A de 9 à 11, boîte B de 7 à 13 : quelle marque a l'écart interquartile le plus petit ?",
      verification: { type: "qcm", choix: ["La marque B", "Aucune différence", "La marque A"], bonne: 2 },
      dessin: ampoules,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le salaire du patron",
      sorte: "piege",
      question: `Dans une petite entreprise, 9 salariés gagnent 1 800 € par mois et le patron 12 000 €. Le patron annonce : « Chez nous, le salaire moyen est de 2 820 € ! »<br><br><b>Quel est le salaire médian</b> ?`,
      reponse: `La moyenne est juste : (9 × 1 800 + 12 000) ÷ 10 = 28 200 ÷ 10 = 2 820 €. Mais une seule valeur extrême la tire vers le haut.<br>Rangés, les 5e et 6e salaires valent 1 800 € : médiane <span class="big">1 800 €</span>. Personne ne gagne 2 820 € !`,
      consigne: "9 salaires de 1 800 € et un de 12 000 € : quel est le salaire médian ?",
      verification: { type: "courte", attendus: ["1800"], unite: "€" },
      dessin: salaires,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La joueuse de fléchettes",
      sorte: "defi",
      question: `Une joueuse de fléchettes a une moyenne de <b>12 points</b> sur ses 5 premiers lancers. Après le 6e lancer, sa moyenne passe à <b>13 points</b>.<br><br><b>Combien de points</b> a-t-elle marqués au 6e lancer ?`,
      reponse: `Total des 5 lancers : 5 × 12 = 60. Total des 6 lancers : 6 × 13 = 78.<br>Le 6e lancer vaut 78 − 60 = <span class="big">18 points</span>.`,
      consigne: "Moyenne 12 sur 5 lancers, puis 13 sur 6 lancers : combien de points au 6e ?",
      verification: { type: "courte", attendus: ["18"], unite: "points" },
      dessin: flechettes,
    },
  ],
};

export default problemes;
