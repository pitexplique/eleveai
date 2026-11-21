// Énigmes à projeter — terminale spé maths, notion derivation_fonction
// (l'atelier de céramique, l'écran géant du stade, la flaque de peinture, le
// tremplin de ski, piège de la piste de VTT, défi de la boîte du chocolatier). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r, o } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const ceramique = svg("Le coût C(x) = 2x³ − 3x² + 5 de l'atelier de céramique ; on cherche la dérivée en x = 2",
  r(60, 110, 360, 90, C.bleu, 0.12, 3, 12) + t(240, 168, "C(x) = 2x³ − 3x² + 5", C.bleu, 30) +
    t(240, 250, "x en dizaines de vases", C.pale, 20) + t(240, 280, "C en centaines d'euros", C.pale, 20) +
    t(240, 370, `C′(2) = ${NB}?`, C.rose, 32));

const ecran = svg("Un écran rectangulaire de côtés 2x + 1 et x − 3 ; son aire A(x) = (2x + 1)(x − 3)",
  r(80, 110, 320, 160, C.bleu, 0.15, 4, 4) + t(240, 95, "2x + 1", C.craie, 26) + t(412, 200, "x − 3", C.craie, 26, "start") +
    t(240, 200, "écran", C.bleu, 26) + t(240, 330, "A(x) = (2x + 1)(x − 3)", C.bleu, 26) +
    t(240, 395, `A′(x) = ${NB}?`, C.rose, 28));

const flaque = svg("Une flaque de peinture ronde qui s'étale : trois cercles de plus en plus grands ; son rayon est r(t) = racine de (4t + 9)",
  o(150, 200, 40, C.jaune, 0.35, 3) + o(150, 200, 75, C.jaune, 0, 3) + o(150, 200, 110, C.jaune, 0, 3) + l(150, 200, 260, 200, C.rose, 3) + t(205, 190, "r", C.rose, 24) +
    t(300, 150, "r(t) = √(4t + 9)", C.bleu, 24, "start") + t(300, 190, "r en cm", C.pale, 20, "start") + t(300, 220, "t en s", C.pale, 20, "start") +
    t(240, 385, `r′(4) = ${NB}?`, C.rose, 28));

const tremplin = (() => {
  const R = repereXY(0, 5, 0, 10, { gx: 80, gy: 60, gl: 340, gh: 260, px: 1, py: 1, ex: 1, ey: 2 });
  return svg("Profil du tremplin f(x) = x² − 4x + 5 et sa tangente en pointillés au point (3 ; 2), là où le skieur décolle",
    R.fond + R.courbe((x) => x * x - 4 * x + 5, 0, 4.6, C.bleu, 4) + l(R.X(2), R.Y(0), R.X(5), R.Y(6), C.rose, 3, "8 6") + R.point(3, 2, C.rose, 8) +
      t(R.X(0) + 12, 40, "f(x) = x² − 4x + 5", C.bleu, 22, "start") + t(R.X(3) + 14, R.Y(2) + 26, "(3 ; 2)", C.rose, 20, "start") +
      t(240, 405, `la tangente en 3${NB}?`, C.rose, 22));
})();

const vtt = (() => {
  const R = repereXY(-1.5, 1.5, -3, 3, { gx: 80, gy: 60, gl: 340, gh: 260, px: 0.5, py: 1, ex: 1, ey: 1 });
  return svg("Profil de la piste f(x) = x³ : la courbe monte, s.aplatit en 0 puis remonte",
    R.fond + R.courbe((x) => x ** 3, -1.44, 1.44, C.bleu, 4) + R.point(0, 0, C.rose, 8) +
      t(R.X(-1.5) + 12, 40, "f(x) = x³ · f′(0) = 0", C.bleu, 22, "start") +
      t(240, 405, `un sommet ou un creux en 0${NB}?`, C.rose, 22));
})();

const boite = svg("Un carré de carton de 30 cm ; on découpe un carré de côté x à chaque coin, puis on plie les bords en pointillés",
  r(90, 60, 300, 300, C.jaune, 0.12, 3) +
    [[90, 60], [330, 60], [90, 300], [330, 300]].map(([x, y]) => r(x, y, 60, 60, C.rose, 0.35, 2)).join("") +
    l(150, 120, 330, 120, C.craie, 2, "8 6") + l(150, 300, 330, 300, C.craie, 2, "8 6") + l(150, 120, 150, 300, C.craie, 2, "8 6") + l(330, 120, 330, 300, C.craie, 2, "8 6") +
    t(120, 52, "x", C.rose, 22) + t(80, 95, "x", C.rose, 22, "end") + t(240, 52, "30 cm", C.craie, 22) +
    t(240, 215, "fond", C.pale, 22) + t(240, 400, `quel x pour le plus grand volume${NB}?`, C.rose, 22));

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "derivation_fonction",
  titre: "Énigmes de dérivation et variations",
  description: "L'atelier de céramique, l'écran géant du stade, la flaque de peinture, le tremplin de ski, le piège de la piste de VTT, le défi de la boîte du chocolatier : formules de dérivation, produit, fonction composée, tangente, signe de la dérivée, optimisation.",
  problemes: [
    {
      tag: "Énigme 1 · L'atelier de céramique",
      titre: "Les formules de dérivation",
      question: `Fabriquer x dizaines de vases coûte C(x) = 2x³ − 3x² + 5, en centaines d'euros, à un atelier de céramique.<br><br><b>Combien vaut</b> C′(2) ?`,
      reponse: `C′(x) = 2 × 3x² − 3 × 2x = 6x² − 6x.<br>C′(2) = 6 × 4 − 6 × 2 = 24 − 12 = <span class="big">12</span>.`,
      consigne: "C(x) = 2x³ − 3x² + 5 : combien vaut C′(2) ?",
      verification: { type: "courte", attendus: ["12"] },
      dessin: ceramique,
    },
    {
      tag: "Énigme 2 · L'écran géant du stade",
      titre: "La dérivée d'un produit",
      question: `L'écran géant d'un stade mesure 2x + 1 mètres sur x − 3 mètres (x > 3). Son aire est A(x) = (2x + 1)(x − 3).<br><br><b>Que vaut</b> A′(x) ?`,
      reponse: `(uv)′ = u′v + uv′ avec u = 2x + 1 et v = x − 3 : A′(x) = 2(x − 3) + (2x + 1) × 1.<br>A′(x) = 2x − 6 + 2x + 1 = <span class="big">4x − 5</span>.`,
      consigne: "A(x) = (2x + 1)(x − 3) : que vaut A′(x) ?",
      verification: { type: "qcm", choix: ["2", "4x − 5", "2x² − 5x − 3"], bonne: 1 },
      dessin: ecran,
    },
    {
      tag: "Énigme 3 · La flaque de peinture",
      titre: "Une fonction composée",
      question: `Un pot de peinture se renverse. Après t secondes, la flaque a pour rayon r(t) = √(4t + 9), en cm.<br><br><b>À quelle vitesse</b> le rayon grandit-il à t = 4 s ?`,
      reponse: `(√u)′ = u′ ÷ (2√u) : r′(t) = 4 ÷ (2√(4t + 9)) = 2 ÷ √(4t + 9).<br>r′(4) = 2 ÷ √25 = 2 ÷ 5 = <span class="big">0,4 cm/s</span>.`,
      consigne: "r(t) = √(4t + 9) : combien vaut r′(4) ?",
      verification: { type: "courte", attendus: ["0,4", "2/5"], unite: "cm/s" },
      dessin: flaque,
    },
    {
      tag: "Énigme 4 · Le tremplin de ski",
      titre: "L'équation d'une tangente",
      question: `Le profil d'un tremplin de ski est la courbe de f(x) = x² − 4x + 5. Le skieur décolle en x = 3 et part tout droit, sur la tangente.<br><br><b>Quelle est l'équation</b> de cette tangente ?`,
      reponse: `f(3) = 9 − 12 + 5 = 2 et f′(x) = 2x − 4, donc f′(3) = 2.<br>y = f′(3)(x − 3) + f(3) = 2(x − 3) + 2 : <span class="big">y = 2x − 4</span>.`,
      consigne: "f(x) = x² − 4x + 5 : équation de la tangente en x = 3 ?",
      verification: { type: "qcm", choix: ["y = 2x − 4", "y = 2x + 2", "y = 3x − 7"], bonne: 0 },
      dessin: tremplin,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La piste de VTT",
      sorte: "piege",
      question: `Le profil d'une piste de VTT est f(x) = x³. En 0, la pente est nulle : f′(0) = 0.<br>Sam : « La pente est nulle en 0, donc c'est un sommet ou un creux. »<br><br><b>A-t-il raison</b> ?`,
      reponse: `f′(x) = 3x² ≥ 0 : la dérivée ne change pas de signe en 0. La piste monte avant et après.<br><span class="big">Non</span> : en 0, c'est un simple replat, ni sommet ni creux.`,
      consigne: "f(x) = x³ et f′(0) = 0 : la piste a-t-elle un sommet ou un creux en 0 ?",
      verification: { type: "qcm", choix: ["Oui, un sommet", "Oui, un creux", "Non : f′ ne change pas de signe"], bonne: 2 },
      dessin: vtt,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La boîte du chocolatier",
      sorte: "defi",
      question: `Un chocolatier découpe un carré de côté x à chaque coin d'un carton carré de 30 cm, puis plie les bords. Le volume de la boîte est V(x) = x(30 − 2x)².<br><br><b>Quel x</b> donne le plus grand volume ?`,
      reponse: `V′(x) = (30 − 2x)² − 4x(30 − 2x) = (30 − 2x)(30 − 6x). Sur ]0 ; 15[, V′ s'annule en x = 5 : positive avant, négative après.<br><span class="big">x = 5 cm</span>, pour V(5) = 5 × 20² = 2 000 cm³.`,
      consigne: "V(x) = x(30 − 2x)² : quel x donne le plus grand volume ?",
      verification: { type: "courte", attendus: ["5", "x = 5", "x=5"], unite: "cm" },
      dessin: boite,
    },
  ],
};

export default problemes;
