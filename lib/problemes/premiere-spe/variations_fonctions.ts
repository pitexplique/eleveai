// Énigmes à projeter — première spé maths, notion variations_fonctions
// (l'entrepôt de matelas, la fabrique de trampolines, le plateau du
// ferronnier, la bordure du mini-golf, piège du toboggan aquatique, défi de
// la fabrique de puzzles). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, ell } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";
import { frac } from "../outils";

const matelas = svg("L'entrepôt de matelas : stocker x centaines de matelas coûte C(x) = x² − 6x + 20, et C′(x) = 2x − 6, pour x entre 0 et 10",
  [0, 1, 2, 3].map((k) => r(120, 220 - 34 * k, 240, 28, k % 2 ? C.bleu : C.jaune, 0.3, 3, 8)).join("") +
    t(240, 70, "C′(x) = 2x − 6 · x ∈ [0 ; 10]", C.craie, 24) +
    t(240, 320, "C croissante sur", C.craie, 24) +
    t(240, 380, `quel intervalle${NB}?`, C.rose, 28));

const trampolines = svg("La fabrique de trampolines : le bénéfice vaut B(x) = −x² + 40x − 300 centaines d'euros pour x trampolines par jour",
  ell(240, 140, 150, 40, C.bleu, 0.25, 4) + l(110, 150, 100, 230, C.craie, 4) + l(370, 150, 380, 230, C.craie, 4) +
    l(200, 178, 195, 240, C.craie, 4) + l(280, 178, 285, 240, C.craie, 4) +
    t(240, 310, "B(x) = −x² + 40x − 300", C.craie, 26) +
    t(240, 385, `bénéfice maximal : x =${NB}?`, C.rose, 26));

const plateau = svg("Le ferronnier découpe un carré de x centimètres à chaque coin d'une tôle carrée de 12 cm, puis relève les bords pour faire un plateau",
  r(120, 40, 240, 240, C.bleu, 0.15, 4) +
    [[120, 40], [320, 40], [120, 240], [320, 240]].map(([x, y]) => r(x, y, 40, 40, C.rose, 0.3, 3)).join("") +
    l(120, 40, 120, 280, C.craie, 1) + t(240, 310, "12 cm", C.craie, 22) + t(140, 30, "x", C.rose, 22) +
    t(240, 350, "V(x) = x(12 − 2x)²", C.craie, 24) +
    t(240, 400, `volume maximal : x =${NB}?`, C.rose, 26));

const minigolf = (() => {
  const R = repereXY(-1, 3, -3, 9, { gx: 90, gy: 30, gl: 320, gh: 330, px: 1, py: 1, ey: 3 });
  return svg("Au mini-golf, la bordure suit la courbe de f(x) = x² et une planche suit la droite de g(x) = 2x − 1 ; elles se touchent au point (1 ; 1)",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => x * x, -1, 3, C.bleu, 4) +
      R.courbe((x) => 2 * x - 1, -1, 3, C.jaune, 4) + R.point(1, 1, C.rose, 8) +
      t(R.X(1.1), R.Y(7.2), "f(x) = x²", C.bleu, 22, "start") +
      t(R.X(1.15), R.Y(-2.75), "g(x) = 2x − 1", C.jaune, 22, "start") +
      t(240, 410, `f au-dessus de g${NB}?`, C.rose, 24));
})();

const toboggan = (() => {
  const R = repereXY(-2, 2, -8, 8, { gx: 90, gy: 30, gl: 320, gh: 330, px: 1, py: 2, ex: 2, ey: 4 });
  return svg("Le toboggan du parc aquatique suit la courbe de f(x) = −x³ : il descend, s'aplatit en 0, puis redescend",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => -x * x * x, -2, 2, C.bleu, 5) + R.point(0, 0, C.rose, 8) +
      t(R.X(0.35), R.Y(5), "f(x) = −x³", C.bleu, 22, "start") +
      t(240, 410, `f′(0) = 0 : un extremum${NB}?`, C.rose, 24));
})();

const puzzles = (() => {
  const R = repereXY(0, 4, 0, 5, { gx: 90, gy: 30, gl: 320, gh: 320, px: 1, py: 1 });
  return svg("La fabrique de puzzles : pour x milliers de puzzles, le coût moyen d'un puzzle vaut CM(x) = x + 1/x euros",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => x + 1 / x, 0.25, 4, C.bleu, 4) +
      t(R.X(1.3), R.Y(4.5), "CM(x) = x + 1/x", C.bleu, 22, "start") +
      t(240, 405, `coût moyen minimal${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "variations_fonctions",
  titre: "Énigmes des variations d'une fonction",
  description: "L'entrepôt de matelas, la fabrique de trampolines, le plateau du ferronnier, la bordure du mini-golf, le piège du toboggan aquatique, le défi de la fabrique de puzzles : signe de f′, extremum, optimisation, position de deux courbes.",
  problemes: [
    {
      tag: "Énigme 1 · L'entrepôt de matelas",
      titre: "Du signe de f′ aux variations",
      question: `Stocker x centaines de matelas coûte C(x) = x² − 6x + 20 euros par jour, pour x entre 0 et 10. On a C′(x) = 2x − 6.<br><br><b>Sur quel intervalle C est-elle croissante</b> ?`,
      reponse: `C est croissante là où C′(x) ≥ 0 : 2x − 6 ≥ 0 ⟺ x ≥ 3.<br><span class="big">Sur [3 ; 10]</span>. Avant 3, C′ est négative : C décroît.`,
      consigne: "C′(x) = 2x − 6 sur [0 ; 10]. Sur quel intervalle C est-elle croissante ?",
      verification: { type: "qcm", choix: ["[3 ; 10]", "[0 ; 3]", "[6 ; 10]"], bonne: 0 },
      dessin: matelas,
    },
    {
      tag: "Énigme 2 · La fabrique de trampolines",
      titre: "Trouver un maximum",
      question: `Pour x trampolines fabriqués par jour, le bénéfice vaut B(x) = −x² + 40x − 300 centaines d'euros.<br><br><b>Pour combien de trampolines</b> le bénéfice est-il maximal ?`,
      reponse: `B′(x) = −2x + 40 : positive avant 20, négative après.<br><span class="big">x = 20 trampolines</span>, pour B(20) = −400 + 800 − 300 = 100 centaines d'euros.`,
      consigne: "B(x) = −x² + 40x − 300. Pour quel x le bénéfice est-il maximal ?",
      verification: { type: "courte", attendus: ["20"] },
      dessin: trampolines,
    },
    {
      tag: "Énigme 3 · Le plateau du ferronnier",
      titre: "Un problème d'optimisation",
      question: `Un ferronnier découpe un carré de x cm à chaque coin d'une tôle carrée de 12 cm, puis relève les bords. Le plateau a pour volume V(x) = x(12 − 2x)², avec 0 &lt; x &lt; 6.<br><br><b>Quelle valeur de x</b> donne le plus grand volume ?`,
      reponse: `V′(x) = (12 − 2x)² + x × 2(12 − 2x)(−2) = (12 − 2x)(12 − 6x).<br>Sur ]0 ; 6[, V′ s'annule en x = 2 : positive avant, négative après. <span class="big">x = 2 cm</span>, pour V(2) = 2 × 8² = 128 cm³.`,
      consigne: "V(x) = x(12 − 2x)² sur ]0 ; 6[. Pour quel x le volume est-il maximal ?",
      verification: { type: "courte", attendus: ["2"], unite: "cm" },
      dessin: plateau,
    },
    {
      tag: "Énigme 4 · Le mini-golf",
      titre: "La position de deux courbes",
      question: `Au mini-golf, une bordure suit la courbe de f(x) = x², et une planche suit la droite de g(x) = 2x − 1.<br><br><b>Comment est placée la courbe de f par rapport à la droite</b> ?`,
      reponse: `On étudie le signe de la différence : f(x) − g(x) = x² − 2x + 1 = (x − 1)² ≥ 0.<br><span class="big">Toujours au-dessus</span>, sauf en x = 1 où elles se touchent : la planche est tangente à la bordure.`,
      consigne: "f(x) = x² et g(x) = 2x − 1 : où est la courbe de f par rapport à celle de g ?",
      verification: { type: "qcm", choix: ["elles se croisent deux fois", "au-dessus, contact en x = 1", "toujours en dessous"], bonne: 1 },
      dessin: minigolf,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le toboggan aquatique",
      sorte: "piege",
      question: `Un toboggan suit la courbe de f(x) = −x³. On a f′(x) = −3x², donc f′(0) = 0.<br>Tom : « La dérivée s'annule en 0, donc il y a un extremum en 0. »<br><br><b>Qu'a f en 0</b> ?`,
      reponse: `f′(x) = −3x² est négative des deux côtés de 0 : f′ s'annule sans changer de signe.<br>f décroît partout : <span class="big">aucun extremum en 0</span>, juste un palier plat.`,
      consigne: "f(x) = −x³ et f′(0) = 0. Qu'a f en 0 ?",
      verification: { type: "qcm", choix: ["un minimum en 0", "un maximum en 0", "aucun extremum en 0"], bonne: 2 },
      dessin: toboggan,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La fabrique de puzzles",
      sorte: "defi",
      question: `Pour x milliers de puzzles (x > 0), le coût moyen d'un puzzle vaut CM(x) = x + ${frac(1, "x")} euros.<br><br><b>Quel est le plus petit coût moyen possible</b> ?`,
      reponse: `CM′(x) = 1 − ${frac(1, "x²")} = ${frac("x² − 1", "x²")} : négative avant 1, positive après.<br>Le minimum est en x = 1 : <span class="big">CM(1) = 2 €</span>. Donc x + ${frac(1, "x")} ≥ 2 pour tout x > 0.`,
      consigne: "CM(x) = x + 1/x pour x > 0. Quel est le coût moyen minimal ?",
      verification: { type: "courte", attendus: ["2"], unite: "€" },
      dessin: puzzles,
    },
  ],
};

export default problemes;
