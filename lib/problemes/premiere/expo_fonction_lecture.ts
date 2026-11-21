// Énigmes à projeter — première (sans spé maths), notion expo_fonction_lecture
// (la caféine dans le sang, les algues du bassin, le site de covoiturage, l'élevage
// de crevettes, piège du gong, défi du tuto de tricot). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

/** « a puissance e » dans un texte SVG : l'exposant en petit, puis on redescend. */
const pw = (a: string, e: string, suite = "") => `${a}<tspan dy="-11" font-size="16">${e}</tspan><tspan dy="11"${suite ? ' dx="7"' : ""}>${suite || "​"}</tspan>`;

const cafeine = (() => {
  const R = repereXY(0, 8, 0, 1.2, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 2, py: 0.2, ey: 0.4 });
  return svg("Caféine dans le sang : f(x) = 0,85 puissance x, x en heures",
    R.fond + R.courbe((x) => 0.85 ** x, 0, 8, C.bleu, 4) +
      t(R.X(4.5), R.Y(1.05), "f(x) = " + pw("0,85", "x"), C.bleu, 22) +
      t(R.X(0) + 10, 28, "caféine (part restante)", C.pale, 17, "start") + t(R.X(8), R.Y(0) + 46, "heures", C.pale, 17, "end") +
      t(240, 405, `croissante ou décroissante${NB}?`, C.rose, 24));
})();

const algues = (() => {
  const R = repereXY(0, 5, 0, 20, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 2, ey: 4 });
  return svg("Surface d'algues dans un bassin : courbe de f(x) = 2 puissance x mètres carrés, x en semaines ; un trait à 8 m²",
    R.fond + R.courbe((x) => 2 ** x, 0, Math.log2(20), C.bleu, 4) + l(R.X(0), R.Y(8), R.X(5), R.Y(8), C.rose, 3, "8 6") +
      t(R.X(4.6), R.Y(8) - 10, "8", C.rose, 18) +
      t(R.X(0) + 10, 28, "surface (m²)", C.pale, 17, "start") + t(R.X(5), R.Y(0) + 46, "semaines", C.pale, 17, "end") +
      t(240, 405, `8 m² au bout de${NB}?`, C.rose, 24));
})();

const covoit = (() => {
  const R = repereXY(0, 4, 0, 16, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 2, ey: 4 });
  let s = "";
  for (let n = 0; n <= 4; n++) s += R.point(n, 3 * 1.5 ** n, C.jaune, 8);
  return svg("Inscrits d'un site de covoiturage : points de la suite u(n) = 3 × 1,5 puissance n et la courbe qui les relie",
    R.fond + R.courbe((x) => 3 * 1.5 ** x, 0, 4, C.bleu, 3) + s +
      t(R.X(0) + 10, 28, "inscrits (milliers)", C.pale, 17, "start") + t(R.X(4), R.Y(0) + 46, "mois", C.pale, 17, "end") +
      t(240, 405, `quelle courbe${NB}?`, C.rose, 24));
})();

const crevettes = (() => {
  const R = repereXY(0, 3, 0, 700, { gx: 90, gy: 40, gl: 330, gh: 270, px: 0.5, ex: 1, py: 100, ey: 100 });
  return svg("Élevage de crevettes : courbe de f(x) = k × a puissance x, passant par (0 ; 200) et (1 ; 300)",
    R.fond + R.courbe((x) => 200 * 1.5 ** x, 0, 3, C.bleu, 4) + R.point(0, 200, C.rose, 8) + R.point(1, 300, C.rose, 8) +
      t(R.X(1) + 12, R.Y(300) + 26, "(1 ; 300)", C.rose, 18, "start") +
      t(R.X(0) + 10, 28, "crevettes (kg)", C.pale, 17, "start") + t(R.X(3), R.Y(0) + 46, "mois", C.pale, 17, "end") +
      t(240, 405, `f(x) = k × ${pw("a", "x", `${NB}: a${NB}?`)}`, C.rose, 24));
})();

const gong = (() => {
  const R = repereXY(0, 10, 0, 100, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 2, py: 10, ey: 20 });
  return svg("Son d'un gong : f(x) = 100 × 0,5 puissance x, x en secondes ; la courbe s'approche de l'axe",
    R.fond + R.courbe((x) => 100 * 0.5 ** x, 0, 10, C.bleu, 4) +
      t(R.X(5), R.Y(70), "f(x) = 100 × " + pw("0,5", "x"), C.bleu, 22) +
      t(R.X(0) + 10, 28, "intensité (%)", C.pale, 17, "start") + t(R.X(10), R.Y(0) + 46, "secondes", C.pale, 17, "end") +
      t(240, 405, `f(10) = 0${NB}?`, C.rose, 26));
})();

const tricot = (() => {
  const R = repereXY(0, 4, 0, 6, { gx: 80, gy: 40, gl: 340, gh: 270, px: 0.5, ex: 1, py: 0.5, ey: 1 });
  return svg("Vues d'un tuto de tricot : courbe de f(x) = a puissance x passant par le point (2 ; 2,25)",
    R.fond + R.courbe((x) => 1.5 ** x, 0, 4, C.bleu, 4) + R.point(2, 2.25, C.rose, 8) +
      t(R.X(2) + 14, R.Y(2.25) + 26, "(2 ; 2,25)", C.rose, 18, "start") +
      t(R.X(0) + 10, 28, "vues (milliers)", C.pale, 17, "start") + t(R.X(4), R.Y(0) + 46, "jours", C.pale, 17, "end") +
      t(240, 405, `f(3) = ${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "expo_fonction_lecture",
  titre: "Énigmes de lecture d'une fonction exponentielle",
  description: "La caféine dans le sang, les algues du bassin, le site de covoiturage, l'élevage de crevettes, le piège du gong, le défi du tuto de tricot : le sens de variation selon a, lire une courbe exponentielle, relier une suite géométrique à la fonction qui la prolonge.",
  problemes: [
    {
      tag: "Énigme 1 · La caféine dans le sang",
      titre: "Le sens de variation",
      question: `Après un café, la part de caféine qui reste dans le sang au bout de x heures est f(x) = 0,85<sup>x</sup>.<br><br><b>Comment varie</b> la fonction f ?`,
      reponse: `La base est a = 0,85, et 0 &lt; 0,85 &lt; 1.<br>f est <span class="big">décroissante</span> : chaque heure, il reste 85 % de la caféine de l'heure d'avant.`,
      consigne: "f(x) = 0,85ˣ : la fonction f est-elle croissante ou décroissante ?",
      verification: { type: "qcm", choix: ["Croissante, car 0,85 > 0", "Décroissante, car 0 < 0,85 < 1", "Ni croissante ni décroissante"], bonne: 1 },
      dessin: cafeine,
    },
    {
      tag: "Énigme 2 · Les algues du bassin",
      titre: "Lire la courbe",
      question: `Des algues couvrent f(x) = 2<sup>x</sup> m² d'un bassin de jardin, au bout de x semaines.<br><br><b>Au bout de combien de semaines</b> couvrent-elles 8 m² ?`,
      reponse: `On part de 8 sur l'axe vertical, on rejoint la courbe, on descend : x = 3.<br>Vérification : 2<sup>3</sup> = 8. Au bout de <span class="big">3 semaines</span>.`,
      consigne: "f(x) = 2ˣ m² au bout de x semaines : quand les algues couvrent-elles 8 m² ?",
      verification: { type: "courte", attendus: ["3"], unite: "semaines" },
      dessin: algues,
    },
    {
      tag: "Énigme 3 · Le site de covoiturage",
      titre: "Prolonger une suite",
      question: `Un site de covoiturage a u(n) = 3 × 1,5<sup>n</sup> milliers d'inscrits au mois n. Les points de la suite sont sur une courbe.<br><br><b>De quelle fonction</b> est-ce la courbe ?`,
      reponse: `On garde la même formule, mais pour tout réel x ≥ 0 : <span class="big">f(x) = 3 × 1,5<sup>x</sup></span>.<br>Elle « remplit » les trous entre les mois : f(n) = u(n) pour tout entier n.`,
      consigne: "Les points de u(n) = 3 × 1,5ⁿ sont sur la courbe de quelle fonction ?",
      verification: { type: "qcm", choix: ["f(x) = 3 + 1,5x", "f(x) = 1,5 × 3ˣ", "f(x) = 3 × 1,5ˣ"], bonne: 2 },
      dessin: covoit,
    },
    {
      tag: "Énigme 4 · L'élevage de crevettes",
      titre: "Retrouver a sur le graphique",
      question: `La masse de crevettes d'un élevage suit f(x) = k × a<sup>x</sup> kg au mois x. La courbe passe par (0 ; 200) et (1 ; 300).<br><br><b>Combien vaut</b> a ?`,
      reponse: `f(0) = k × a<sup>0</sup> = k, donc k = 200. f(1) = 200 × a = 300.<br>a = 300 ÷ 200 = <span class="big">1,5</span> : + 50 % par mois.`,
      consigne: "f(x) = k × aˣ passe par (0 ; 200) et (1 ; 300) : combien vaut a ?",
      verification: { type: "courte", attendus: ["1,5", "1.5"] },
      dessin: crevettes,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le gong",
      sorte: "piege",
      question: `L'intensité du son d'un gong est f(x) = 100 × 0,5<sup>x</sup> %, x secondes après le coup. Sur le graphique, la courbe semble toucher l'axe.<br>Tom dit : « f(10) = 0 ».<br><br><b>A-t-il raison</b> ?`,
      reponse: `0,5<sup>x</sup> est toujours strictement positif : la courbe se rapproche de l'axe sans jamais le toucher.<br>f(10) = 100 × 0,5<sup>10</sup> ≈ 0,1 % : <span class="big">non, f(x) > 0 pour tout x</span>.`,
      consigne: "f(x) = 100 × 0,5ˣ : Tom dit « f(10) = 0 ». A-t-il raison ?",
      verification: { type: "qcm", choix: ["Non : f(x) > 0 pour tout x", "Oui : f(10) = 0", "Oui, et même dès x = 2"], bonne: 0 },
      dessin: gong,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le tuto de tricot",
      sorte: "defi",
      question: `Les vues d'un tuto de tricot suivent f(x) = a<sup>x</sup> milliers, avec a > 0, au jour x. La courbe passe par (2 ; 2,25).<br><br><b>Combien vaut</b> f(3) ?`,
      reponse: `a<sup>2</sup> = 2,25 et a > 0, donc a = 1,5 (1,5 × 1,5 = 2,25).<br>f(3) = 1,5<sup>3</sup> = 2,25 × 1,5 = <span class="big">3,375</span> : 3 375 vues.`,
      consigne: "f(x) = aˣ avec a > 0 passe par (2 ; 2,25) : combien vaut f(3) ?",
      verification: { type: "courte", attendus: ["3,375", "3.375"] },
      dessin: tricot,
    },
  ],
};

export default problemes;
