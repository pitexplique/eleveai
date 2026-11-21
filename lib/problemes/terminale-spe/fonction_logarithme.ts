// Énigmes à projeter — terminale spé maths, notion fonction_logarithme
// (la chasse au trésor, le synthétiseur du DJ, le studio de jeux vidéo, la Cité
// du Volcan (974), piège du capteur de lumière, défi des deux cousines). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r, p, fleche } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";
import { frac } from "../outils";

const tresor = svg("Un cadenas à code : le code est le nombre ln de e puissance 7",
  p("M175 200 L175 140 Q175 70 240 70 Q305 70 305 140 L305 200", C.pale, 14) + r(140, 195, 200, 150, C.jaune, 0.3, 4, 14) +
    t(240, 285, "ln(e⁷)", C.craie, 40) + t(240, 395, `le code du cadenas${NB}?`, C.rose, 24));

const dj = svg("Fréquences du synthétiseur : 110 Hz, 220 Hz, 440 Hz, 880 Hz, chaque fois multipliées par 2 ; de 110 à 880, multipliées par 8",
  t(70, 130, "110", C.bleu, 26) + t(183, 130, "220", C.bleu, 26) + t(297, 130, "440", C.bleu, 26) + t(410, 130, "880", C.bleu, 26) +
    t(240, 70, "fréquences en Hz", C.pale, 20) +
    fleche(95, 160, 160, 160, C.jaune, 3) + fleche(208, 160, 273, 160, C.jaune, 3) + fleche(322, 160, 387, 160, C.jaune, 3) +
    t(127, 192, "× 2", C.jaune, 20) + t(240, 192, "× 2", C.jaune, 20) + t(354, 192, "× 2", C.jaune, 20) +
    fleche(70, 240, 410, 240, C.rose, 3) + t(240, 275, "× 8", C.rose, 24) +
    t(240, 340, "octaves = ln 8 ÷ ln 2", C.craie, 26) + t(240, 395, `ln 8 =${NB}?`, C.rose, 24));

const studio = (() => {
  const R = repereXY(0, 20, -2, 14, { gx: 80, gy: 70, gl: 350, gh: 250, px: 2, py: 2, ex: 4, ey: 4 });
  return svg("Courbe du bénéfice B(x) = 10 ln x − x pour x de 1 à 20 : elle monte jusqu'à environ 13 puis redescend",
    R.fond + R.courbe((x) => 10 * Math.log(x) - x, 1, 20, C.bleu, 4) +
      t(R.X(0) + 12, 40, "B(x) = 10 ln x − x", C.bleu, 22, "start") + t(R.X(10), R.Y(2), "x en milliers de jeux", C.pale, 18) +
      t(240, 405, `B maximal pour x =${NB}?`, C.rose, 22));
})();

const volcan = svg("Les visiteurs augmentent de 7 % par an : on cherche n tel que 1,07 puissance n soit au moins 2 ; ln 2 vaut environ 0,693 et ln 1,07 environ 0,0677",
  t(240, 70, "chaque année : × 1,07", C.jaune, 26) + t(240, 150, "1,07ⁿ ≥ 2", C.bleu, 34) +
    t(240, 220, "n × ln 1,07 ≥ ln 2", C.craie, 26) +
    t(240, 290, "ln 2 ≈ 0,693 · ln 1,07 ≈ 0,0677", C.pale, 22) +
    t(240, 385, `au bout de combien d'années${NB}?`, C.rose, 22));

const capteur = (() => {
  const R = repereXY(0, 8, -3, 3, { gx: 80, gy: 70, gl: 350, gh: 250, px: 1, py: 1, ex: 1, ey: 1 });
  return svg("Courbe de ln x pour x de 0,05 à 8, et la droite horizontale y = −2 qui la coupe très près de l'axe vertical",
    R.fond.replace(">0</text>", "></text>") + R.courbe(Math.log, 0.05, 8, C.bleu, 4) + l(R.X(0), R.Y(-2), R.X(8), R.Y(-2), C.rose, 3, "8 6") + R.point(Math.exp(-2), -2, C.jaune, 7) +
      t(R.X(7.8), R.Y(1.1), "y = ln x", C.bleu, 22, "end") + t(R.X(7.8), R.Y(-2) - 12, "y = −2", C.rose, 22, "end") +
      t(240, 405, `ln x = −2 a-t-elle une solution${NB}?`, C.rose, 21));
})();

const cousines = (() => {
  const R = repereXY(0, 8, 0, 0.5, { gx: 80, gy: 70, gl: 350, gh: 250, px: 1, py: 0.1, ex: 1, ey: 0.1 });
  return svg("Courbe de f(x) = ln x divisé par x pour x de 1 à 8 : maximum en e, environ 2,72 ; le point d'abscisse π, environ 3,14, est un peu plus bas",
    R.fond + R.courbe((x) => Math.log(x) / x, 1, 8, C.bleu, 4) + R.point(Math.E, 1 / Math.E, C.jaune, 7) + R.point(Math.PI, Math.log(Math.PI) / Math.PI, C.rose, 7) +
      t(R.X(Math.E) - 10, R.Y(1 / Math.E) - 14, "e", C.jaune, 22, "end") + t(R.X(Math.PI) + 12, R.Y(0.39) - 4, "π", C.rose, 22, "start") +
      t(R.X(4), R.Y(0.1), "f(x) = ln x ÷ x", C.bleu, 22, "start") +
      t(240, 405, `e puissance π ou π puissance e${NB}?`, C.rose, 21));
})();

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "fonction_logarithme",
  titre: "Énigmes de la fonction logarithme népérien",
  description: "La chasse au trésor, le synthétiseur du DJ, le studio de jeux vidéo, la Cité du Volcan, le piège du capteur de lumière, le défi des deux cousines : ln(eˣ) = x, ln(aⁿ) = n ln a, dérivée de ln, inéquation, ln x ÷ x.",
  problemes: [
    {
      tag: "Énigme 1 · La chasse au trésor",
      titre: "ln et exp se défont",
      question: `À une chasse au trésor, le code du cadenas est le nombre ln(e<sup>7</sup>).<br><br><b>Quel est le code</b> ?`,
      reponse: `ln est la réciproque de exp : ln(e<sup>x</sup>) = x pour tout x.<br>Le code est <span class="big">7</span>.`,
      consigne: "Combien vaut ln(e^7) ?",
      verification: { type: "courte", attendus: ["7"] },
      dessin: tresor,
    },
    {
      tag: "Énigme 2 · Le synthétiseur du DJ",
      titre: "ln(aⁿ) = n ln a",
      question: `Un DJ monte une note de 110 Hz à 880 Hz : la fréquence est multipliée par 8. Le nombre d'octaves est ${frac("ln 8", "ln 2")}.<br><br><b>Comment s'écrit ln 8</b> avec ln 2 ?`,
      reponse: `8 = 2³, donc ln 8 = ln(2³) = 3 ln 2.<br><span class="big">ln 8 = 3 ln 2</span> : la note monte de 3 octaves.`,
      consigne: "ln 8 s'écrit comment avec ln 2 ?",
      verification: { type: "qcm", choix: ["8 ln 2", "ln 6 + ln 2", "3 ln 2"], bonne: 2 },
      dessin: dj,
    },
    {
      tag: "Énigme 3 · Le studio de jeux vidéo",
      titre: "Dériver ln x",
      question: `Un studio vend x milliers de jeux, x entre 1 et 20. Son bénéfice est B(x) = 10 ln x − x, en milliers d'euros.<br><br><b>Pour quelle valeur de x</b> le bénéfice est-il maximal ?`,
      reponse: `B′(x) = ${frac(10, "x")} − 1 = ${frac("10 − x", "x")} : positif avant 10, négatif après.<br>B est maximal pour <span class="big">x = 10</span> (10 000 jeux, B ≈ 13 000 €).`,
      consigne: "B(x) = 10 ln x − x sur [1 ; 20] : pour quel x le bénéfice est-il maximal ?",
      verification: { type: "courte", attendus: ["10", "x=10", "10000"] },
      dessin: studio,
    },
    {
      tag: "Énigme 4 · La Cité du Volcan",
      titre: "Une inéquation avec ln",
      question: `À La Réunion, les visiteurs de la Cité du Volcan augmentent de 7 % par an.<br><br><b>Au bout de combien d'années</b> leur nombre aura-t-il doublé ?`,
      reponse: `1,07<sup>n</sup> ≥ 2 ⟺ n ln 1,07 ≥ ln 2 ⟺ n ≥ ${frac("ln 2", "ln 1,07")} ≈ 10,2 (ln 1,07 > 0).<br>Au bout de <span class="big">11 ans</span> (1,07<sup>11</sup> ≈ 2,10).`,
      consigne: "1,07^n ≥ 2 : à partir de quel entier n ?",
      verification: { type: "courte", attendus: ["11", "n=11"], unite: "ans" },
      dessin: volcan,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le capteur de lumière",
      sorte: "piege",
      question: `Un capteur de lumière affiche ln x, où x est l'éclairement. Il affiche −2.<br>Noé : « Impossible, un logarithme ne peut pas être négatif. »<br><br><b>Que vaut x</b> ?`,
      reponse: `ln x est négatif dès que 0 &lt; x &lt; 1. C'est x qui doit être positif, pas ln x.<br>ln x = −2 ⟺ <span class="big">x = e⁻² ≈ 0,14</span>.`,
      consigne: "ln x = −2 : que vaut x ?",
      verification: { type: "qcm", choix: ["x = e⁻² ≈ 0,14", "Pas de solution", "x = −e² ≈ −7,39"], bonne: 0 },
      dessin: capteur,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux cousines",
      sorte: "defi",
      question: `À Noël, deux cousines se lancent un défi, sans calculatrice. Quel est le plus grand : e<sup>π</sup> ou π<sup>e</sup> ?<br>Indice : f(x) = ${frac("ln x", "x")} est maximale en x = e.<br><br><b>Lequel est le plus grand</b> ?`,
      reponse: `π ≠ e, donc f(π) &lt; f(e) : ${frac("ln π", "π")} &lt; ${frac("1", "e")}, soit e ln π &lt; π, soit ln(π<sup>e</sup>) &lt; ln(e<sup>π</sup>).<br><span class="big">e<sup>π</sup></span> est le plus grand (≈ 23,1 contre ≈ 22,5).`,
      consigne: "Sans calculatrice : e^π ou π^e, lequel est le plus grand ?",
      verification: { type: "qcm", choix: ["π puissance e", "e puissance π", "Ils sont égaux"], bonne: 1 },
      dessin: cousines,
    },
  ],
};

export default problemes;
