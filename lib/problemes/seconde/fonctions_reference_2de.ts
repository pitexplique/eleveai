// Énigmes à projeter — seconde, notion fonctions_reference_2de (l'aire du
// carré de 3 à 5 m, le trajet de 60 km, la racine qui double, x² ≤ 16, piège
// de l'inverse d'un négatif, défi « plus grand que son carré »). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";
import { repere } from "../dessins-2de";
import { frac, svgFrac } from "../outils";

const carre = (() => {
  const R = repere(0, 6, 0, 30, { gl: 320, gh: 300, gy: 30, gx: 90, pas: 1, pasE: 1, etiquettes: false });
  let g = R.fond;
  for (const v of [9, 25]) g += l(R.X(0), R.Y(v), R.X(Math.sqrt(v)), R.Y(v), C.rose, 2, "8 6") + t(R.X(0) - 8, R.Y(v) + 6, v, C.rose, 20, "end");
  for (const v of [3, 5]) g += l(R.X(v), R.Y(0), R.X(v), R.Y(v * v), C.jaune, 2, "8 6") + t(R.X(v), R.Y(0) + 26, v, C.jaune, 20);
  return svg("La courbe de la fonction carré entre 0 et 5,5, avec x égale 3 et x égale 5",
    g + R.courbe((x) => x * x, 0, 5.4, C.bleu, 5) + t(R.X(1.6), R.Y(22), "f(x) = x²", C.bleu, 22) + t(240, 400, `aire entre${NB}?`, C.rose, 24));
})();

const trajet = svg(
  "Une route de 60 kilomètres parcourue à 90 kilomètres par heure",
  l(40, 240, 440, 240, C.craie, 6) + l(40, 240, 440, 240, C.jaune, 2, "20 16") + r(70, 190, 90, 40, C.bleu, 0.4, 3, 10) +
    t(240, 290, "60 km", C.craie, 26) + t(250, 130, "t = 60 ÷ v", C.bleu, 30) + t(240, 360, `à 90 km/h${NB}: combien de minutes${NB}?`, C.rose, 24)
);

const racine = svg(
  "Deux carrés : le grand a une aire quatre fois plus grande que le petit",
  r(60, 200, 90, 90, C.bleu, 0.2, 4) + t(105, 252, "A", C.craie, 26) + r(200, 110, 180, 180, C.jaune, 0.2, 4) + t(290, 210, "4A", C.craie, 30) +
    t(105, 320, "côté √A", C.pale, 20) + t(290, 320, `côté ?`, C.rose, 22).replace(" ?", `${NB}?`) + t(240, 385, `côté multiplié par${NB}?`, C.rose, 26)
);

const inequation = (() => {
  const R = repere(-6, 6, 0, 30, { gl: 360, gh: 300, gy: 30, gx: 60, pas: 1, pasE: 2, etiquettes: true });
  return svg("La parabole de la fonction carré et la droite horizontale y égale 16",
    R.fond.replace(/<text[^>]*>(10|20|30)<\/text>/g, "") + R.courbe((x) => x * x, -5.4, 5.4, C.bleu, 4) + l(R.X(-6), R.Y(16), R.X(6), R.Y(16), C.rose, 3, "10 6") +
      t(R.X(6) - 4, R.Y(16) - 10, "16", C.rose, 20, "end") + t(240, 400, `x² ≤ 16${NB}?`, C.rose, 26));
})();

const piege = svg(
  "Au tableau : comparer un sur moins deux et un tiers",
  svgFrac(150, 190, 1, "−2", C.bleu, 48) + t(240, 205, "?", C.rose, 48) + svgFrac(330, 190, 1, 3, C.bleu, 48) +
    t(240, 350, "−2 &lt; 3, donc l'inverse change l'ordre ?", C.craie, 22).replace(" ?", `${NB}?`)
);

const defi = (() => {
  const R = repere(-0.5, 2, -0.5, 2.5, { gl: 330, gh: 300, gy: 30, gx: 90, pas: 0.5, pasE: 1 });
  return svg("La droite y égale x et la parabole y égale x au carré, qui se croisent en 0 et en 1",
    R.fond + R.courbe((x) => x, -0.5, 2, C.jaune, 4) + R.courbe((x) => x * x, -0.5, 1.58, C.bleu, 4) +
      t(R.X(2) - 4, R.Y(2) - 12, "y = x", C.jaune, 20, "end") + t(R.X(1.55), R.Y(2.4) + 6, "y = x²", C.bleu, 20, "end") + t(240, 400, `x² &lt; x${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "fonctions_reference_2de",
  titre: "Énigmes des fonctions de référence",
  description: "L'aire du carré, le trajet de 60 km, la racine qui double, x² ≤ 16, le piège de l'inverse d'un négatif, le défi « plus grand que son carré » : fonctions carré, inverse, racine carrée et leurs variations.",
  problemes: [
    {
      tag: "Énigme 1 · L'aire du carré",
      titre: "Entre 3 et 5 m",
      question: `Le côté d'un carré mesure entre <b>3 m et 5 m</b>.<br><br><b>Entre quelles valeurs</b> est son aire ?`,
      reponse: `La fonction carré est croissante sur [0 ; +∞[ : elle garde l'ordre des nombres positifs.<br>3 ≤ x ≤ 5 donne 9 ≤ x² ≤ 25 : l'aire est dans <span class="big">[9 ; 25]</span> m².`,
      consigne: "Si 3 ≤ x ≤ 5, entre quelles valeurs est x² ?",
      verification: { type: "qcm", choix: ["[3 ; 5]", "[9 ; 25]", "[6 ; 10]"], bonne: 1 },
      dessin: carre,
    },
    {
      tag: "Énigme 2 · Le trajet",
      titre: "60 km",
      question: `Pour faire <b>60 km</b> à la vitesse v (en km/h), il faut <b>t = 60 ÷ v</b> heures.<br><br><b>Combien de minutes</b> faut-il à 90 km/h ?`,
      reponse: `t = 60 ÷ 90 = ${frac(2, 3)} h, et ${frac(2, 3)} × 60 min = 40 min.<br>Il faut <span class="big">40 minutes</span>.<br>t est une fonction inverse de v : plus on va vite, moins c'est long.`,
      consigne: "Combien de minutes pour 60 km à 90 km/h ?",
      verification: { type: "courte", attendus: ["40"], unite: "min" },
      dessin: trajet,
    },
    {
      tag: "Énigme 3 · La racine",
      titre: "Quatre fois l'aire",
      question: `Le côté d'un carré d'aire A vaut <b>√A</b>. On construit un carré d'aire <b>4 fois plus grande</b>.<br><br><b>Par combien</b> son côté est-il multiplié ?`,
      reponse: `√(4A) = √4 × √A = 2√A.<br>Le côté est multiplié par <span class="big">2</span>, pas par 4.`,
      consigne: "L'aire est multipliée par 4 : le côté est multiplié par combien ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: racine,
    },
    {
      tag: "Énigme 4 · Une inéquation",
      titre: "x² ≤ 16",
      question: `<b>Quelles sont les solutions</b> de x² ≤ 16 ?`,
      reponse: `La parabole est sous la droite y = 16 entre ses deux points de rencontre, x = −4 et x = 4.<br>Solutions : <span class="big">[−4 ; 4]</span>. Les négatifs comptent : (−3)² = 9 ≤ 16.`,
      consigne: "Solutions de x² ≤ 16 ?",
      verification: { type: "qcm", choix: ["[−4 ; 4]", "]−∞ ; 4]", "[0 ; 4]"], bonne: 0 },
      dessin: inequation,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'inverse d'un négatif",
      sorte: "piege",
      question: `On a −2 &lt; 3. On dit souvent : « la fonction inverse change l'ordre ».<br><br><b>Comment se rangent</b> ${frac(1, "−2")} et ${frac(1, 3)} ?`,
      reponse: `${frac(1, "−2")} = −0,5 est négatif, ${frac(1, 3)} est positif : <span class="big">${frac(1, "−2")} &lt; ${frac(1, 3)}</span>.<br>La fonction inverse est décroissante sur ]−∞ ; 0[ et sur ]0 ; +∞[ <b>séparément</b>, pas d'un intervalle à l'autre.`,
      consigne: "Comparer 1/(−2) et 1/3.",
      verification: { type: "qcm", choix: ["Ils sont égaux", "1/(−2) > 1/3", "1/(−2) < 1/3"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Plus grand que son carré",
      sorte: "defi",
      question: `On croit souvent qu'un nombre au carré est plus grand que lui-même.<br><br><b>Pour quels x</b> a-t-on au contraire x² &lt; x ? Donne l'intervalle.`,
      reponse: `x² &lt; x ⟺ x² − x &lt; 0 ⟺ x(x − 1) &lt; 0 : les deux facteurs de signes contraires, entre 0 et 1.<br><span class="big">x ∈ ]0 ; 1[</span>. Exemple : 0,5² = 0,25 &lt; 0,5.`,
      consigne: "Pour quels x a-t-on x² < x ?",
      verification: { type: "courte", attendus: ["]0;1["] },
      dessin: defi,
    },
  ],
};

export default problemes;
