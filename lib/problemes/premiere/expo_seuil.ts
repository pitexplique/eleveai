// Énigmes à projeter — première (sans spé maths), notion expo_seuil
// (les méduses de la baie, le groupe de K-pop, la coopérative de pêcheurs, l'os de
// mammouth, piège de l'iode médical, défi de la spiruline). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 20) =>
  r(30, y, 420, 22 + 34 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 36 + 34 * k, s, c, taille)).join("");

const meduses = svg("Méduses d'une baie : u(n) = 200 × 1,3 puissance n ; environ 571, 743, 965, 1 255 pour n = 4 à 7",
  t(240, 45, "u(n) = 200 × 1,3ⁿ", C.bleu, 24) +
    tableau(25, 70, [110, 80, 80, 80, 80], 60, [["année n", 4, 5, 6, 7], ["méduses", "≈ 571", "≈ 743", "≈ 965", "≈ 1 255"]], (i, j) => (j === 0 ? C.pale : C.craie), 20) +
    t(240, 250, "seuil : 1 000 méduses", C.pale, 20) +
    t(240, 385, `première année au-dessus${NB}?`, C.rose, 24));

const kpop = (() => {
  const R = repereXY(0, 6, 0, 24, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 2, ey: 4 });
  return svg("Fans d'un groupe de K-pop : courbe de f(x) = 2 × 1,5 puissance x millions ; un trait à 10 millions",
    R.fond + R.courbe((x) => 2 * 1.5 ** x, 0, 6, C.bleu, 4) + l(R.X(0), R.Y(10), R.X(6), R.Y(10), C.rose, 3, "8 6") +
      t(R.X(1), R.Y(10) - 10, "10", C.rose, 18) +
      t(R.X(0) + 10, 28, "fans (millions)", C.pale, 17, "start") + t(R.X(6), R.Y(0) + 46, "mois", C.pale, 17, "end") +
      t(240, 405, `plus de 10 millions${NB}: quel mois${NB}?`, C.rose, 24));
})();

const peche = svg("Fonds d'une coopérative de pêcheurs : 5 000 € placés à 4 % par an ; 1,04 puissance 17 environ 1,948 et 1,04 puissance 18 environ 2,026",
  cadre(40, ["5 000 € à + 4 % par an", "quand le fonds double-t-il ?"], C.bleu, 22) +
    t(240, 220, "1,04¹⁷ ≈ 1,948", C.craie, 24) + t(240, 265, "1,04¹⁸ ≈ 2,026", C.craie, 24) +
    t(240, 385, `au bout de combien d'années${NB}?`, C.rose, 24));

const demiVie = (titre: string, label: string, pas: string, bas: string) => {
  const R = repereXY(0, 3, 0, 100, { gx: 90, gy: 40, gl: 330, gh: 270, px: 1, ex: 1, py: 25, ey: 25, etiquettes: true });
  let s = "";
  [100, 50, 25, 12.5].forEach((v, k) => { s += R.point(k, v, C.jaune, 8); });
  return svg(label,
    R.fond + R.courbe((x) => 100 * 0.5 ** x, 0, 3, C.bleu, 4) + s +
      t(R.X(0) + 10, 28, titre, C.pale, 17, "start") + t(R.X(3), R.Y(0) + 46, pas, C.pale, 17, "end") +
      t(240, 405, bas, C.rose, 24));
};

const mammouth = demiVie("carbone 14 restant (%)", "Carbone 14 d'un os de mammouth : la moitié disparaît en 5 730 ans ; 100, 50, 25, 12,5 %", "demi-vies (5 730 ans)", `25${NB}% restant${NB}: quel âge${NB}?`);

const iode = demiVie("iode restant (%)", "Iode médical : la moitié disparaît en 8 jours ; 100, 50, 25, 12,5 %", "demi-vies (8 jours)", `après 16 jours${NB}?`);

const spiruline = svg("Spiruline : 50 g au départ, la masse double tous les 3 jours ; seuil 1 kg",
  cadre(40, ["50 g au départ", "× 2 tous les 3 jours"], C.bleu, 24) +
    t(240, 210, "50 → 100 → 200 → …", C.pale, 22) +
    t(240, 260, "seuil : 1 kg = 1 000 g", C.jaune, 24) +
    t(240, 385, `plus de 1 kg après${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "expo_seuil",
  titre: "Énigmes de seuil en croissance exponentielle",
  description: "Les méduses de la baie, le groupe de K-pop, la coopérative de pêcheurs, l'os de mammouth, le piège de l'iode médical, le défi de la spiruline : trouver un seuil avec un tableau, un graphique ou un calcul, utiliser une demi-vie ou un temps de doublement.",
  problemes: [
    {
      tag: "Énigme 1 · Les méduses de la baie",
      titre: "Un seuil avec un tableau",
      question: `Dans une baie, il y a u(n) = 200 × 1,3<sup>n</sup> méduses l'année n.<br><br><b>Quelle est la première année</b> où il y a plus de 1 000 méduses ?`,
      reponse: `Le tableau : u(6) ≈ 965 &lt; 1 000, mais u(7) ≈ 1 255 > 1 000.<br>La première année est <span class="big">n = 7</span>.`,
      consigne: "u(n) = 200 × 1,3ⁿ : pour quel premier n a-t-on plus de 1 000 méduses ?",
      verification: { type: "courte", attendus: ["7", "n = 7", "n=7"] },
      dessin: meduses,
    },
    {
      tag: "Énigme 2 · Le groupe de K-pop",
      titre: "Un seuil sur un graphique",
      question: `Un groupe de K-pop a f(x) = 2 × 1,5<sup>x</sup> millions de fans au mois x.<br><br><b>À partir de quel mois</b> entier dépasse-t-il 10 millions de fans ?`,
      reponse: `Sur le graphique, la courbe passe la ligne des 10 juste avant x = 4.<br>Vérification : f(3) = 6,75 &lt; 10 et f(4) = 10,125 > 10. À partir du <span class="big">mois 4</span>.`,
      consigne: "f(x) = 2 × 1,5ˣ millions de fans : à partir de quel mois entier dépasse-t-il 10 millions ?",
      verification: { type: "courte", attendus: ["4", "x = 4", "x=4"], unite: "mois" },
      dessin: kpop,
    },
    {
      tag: "Énigme 3 · La coopérative de pêcheurs",
      titre: "Un seuil par le calcul",
      question: `Une coopérative de pêcheurs place 5 000 € à 4 % par an.<br><br><b>Au bout de combien d'années</b> le fonds aura-t-il doublé ?`,
      reponse: `On cherche le premier n avec 1,04<sup>n</sup> ≥ 2. À la calculatrice : 1,04<sup>17</sup> ≈ 1,948 &lt; 2 et 1,04<sup>18</sup> ≈ 2,026 ≥ 2.<br>Au bout de <span class="big">18 ans</span> (plus de 10 000 €).`,
      consigne: "5 000 € placés à 4 % par an : au bout de combien d'années le fonds aura-t-il doublé ?",
      verification: { type: "qcm", choix: ["18 ans", "25 ans", "17 ans"], bonne: 0 },
      dessin: peche,
    },
    {
      tag: "Énigme 4 · L'os de mammouth",
      titre: "La demi-vie",
      question: `Le carbone 14 d'un os perd la moitié de sa quantité tous les 5 730 ans (sa demi-vie). Dans un os de mammouth, il reste 25 % du carbone 14.<br><br><b>Quel âge</b> a cet os ?`,
      reponse: `100 % → 50 % : une demi-vie. 50 % → 25 % : une deuxième.<br>2 × 5 730 = <span class="big">11 460 ans</span>.`,
      consigne: "Demi-vie 5 730 ans, il reste 25 % du carbone 14 : quel âge a l'os ?",
      verification: { type: "qcm", choix: ["2 865 ans", "11 460 ans", "17 190 ans"], bonne: 1 },
      dessin: mammouth,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'iode médical",
      sorte: "piege",
      question: `Un iode médical a une demi-vie de 8 jours.<br>Tom dit : « En 8 jours, la moitié disparaît ; en 16 jours, l'autre moitié. Il ne reste rien. »<br><br><b>Quel pourcentage</b> reste-t-il après 16 jours ?`,
      reponse: `La deuxième demi-vie enlève la moitié de <b>ce qui reste</b>, pas la moitié du départ.<br>100 % → 50 % → <span class="big">25 %</span>. Il en reste même toujours un peu.`,
      consigne: "Demi-vie de 8 jours : quel pourcentage reste-t-il après 16 jours ?",
      verification: { type: "qcm", choix: ["0 %", "50 %", "25 %"], bonne: 2 },
      dessin: iode,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La spiruline",
      sorte: "defi",
      question: `Un bassin de spiruline démarre avec 50 g. La masse double tous les 3 jours.<br><br><b>Après combien de jours</b> dépasse-t-elle 1 kg pour la première fois ?`,
      reponse: `50 → 100 → 200 → 400 → 800 → 1 600 g : il faut 5 doublements (800 g &lt; 1 kg après 4).<br>5 × 3 = <span class="big">15 jours</span>.`,
      consigne: "50 g, × 2 tous les 3 jours : après combien de jours la masse dépasse-t-elle 1 kg ?",
      verification: { type: "courte", attendus: ["15"], unite: "jours" },
      dessin: spiruline,
    },
  ],
};

export default problemes;
