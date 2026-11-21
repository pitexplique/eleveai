// Énigmes à projeter — terminale spé maths, notion fonctions_sinus_cosinus
// (la grande roue, le bouchon de pêche, le phare, l'enceinte, piège de la corde
// à sauter, défi de la tôle ondulée d'une case créole (974)). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, p, o } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";
import { frac } from "../outils";

const roue = (() => {
  let s = l(40, 360, 440, 360, C.pale, 3) + l(240, 190, 170, 358, C.craie, 4) + l(240, 190, 310, 358, C.craie, 4) + o(240, 190, 160, C.bleu, 0, 4);
  for (let k = 0; k < 8; k++) {
    const a = (k * Math.PI) / 4;
    const x = +(240 + 160 * Math.cos(a)).toFixed(1), y = +(190 + 160 * Math.sin(a)).toFixed(1);
    s += l(240, 190, x, y, C.pale, 2) + `<circle cx="${x}" cy="${y}" r="9" fill="${C.jaune}"/>`;
  }
  return svg("Une grande roue de 36 m de diamètre : les cabines passent de 2 m à 38 m de haut",
    s + t(470, 40, "38 m en haut", C.jaune, 20, "end") + t(420, 395, "2 m en bas", C.jaune, 20, "end") +
      t(60, 395, `un tour en${NB}?`, C.rose, 22, "start"));
})();

const bouchon = (() => {
  const R = repereXY(0, 3.2, -3.5, 3.5, { gx: 80, gy: 70, gl: 350, gh: 260, px: 0.5, py: 1, ex: 1, ey: 1 });
  return svg("Courbe de la hauteur du bouchon y(t) = 3 sin(2t) en centimètres, pour t de 0 à 3,2 secondes : il monte, redescend, remonte",
    R.fond.replace(">0</text>", "></text>").replace(">3</text>", "></text>") + R.courbe((x) => 3 * Math.sin(2 * x), 0, 3.2, C.bleu, 4) + R.point(0, 0, C.rose, 7) +
      t(R.X(0) + 12, 40, "y(t) = 3 sin(2t) (cm)", C.bleu, 22, "start") +
      t(240, 405, `sa vitesse au départ${NB}?`, C.rose, 22));
})();

const phare = (() => {
  const cx = 230, cy = 210, ra = 140;
  const a = Math.PI / 3;
  const xa = cx + ra * Math.cos(a), ya = cy - ra * Math.sin(a), yb = cy + ra * Math.sin(a);
  return svg("Cercle trigonométrique : la droite verticale x = un demi coupe le cercle en π sur 3 et en moins π sur 3 ; l'arc de droite entre les deux est en gras",
    l(cx - ra - 30, cy, cx + ra + 30, cy, C.pale, 2) + l(cx, cy - ra - 25, cx, cy + ra + 25, C.pale, 2) + o(cx, cy, ra, C.craie, 0, 3) +
      p(`M${xa.toFixed(1)} ${ya.toFixed(1)} A${ra} ${ra} 0 0 1 ${xa.toFixed(1)} ${yb.toFixed(1)}`, C.rose, 8) +
      l(xa, cy - ra - 15, xa, cy + ra + 15, C.jaune, 3, "8 6") +
      t(xa + 6, cy + 26, "½", C.jaune, 22, "start") + t(xa + 14, ya - 8, "π/3", C.rose, 22, "start") + t(xa + 14, yb + 22, "−π/3", C.rose, 22, "start") +
      t(cx - 12, cy + 26, "0", C.pale, 18, "end") +
      t(240, 405, `cos x ≥ ½ sur [−π${NB}; π]${NB}?`, C.rose, 22));
})();

const enceinte = (() => {
  const R = repereXY(0, 6.5, -1.5, 1.5, { gx: 80, gy: 70, gl: 350, gh: 260, px: 0.5, py: 0.5, ex: 1, ey: 0.5 });
  return svg("Courbe du son s(t) = sin t + cos t pour t de 0 à 6,5 : une onde qui monte un peu au-dessus de 1",
    R.fond + R.courbe((x) => Math.sin(x) + Math.cos(x), 0, 6.5, C.bleu, 4) +
      t(R.X(0) + 12, 40, "s(t) = sin t + cos t", C.bleu, 22, "start") +
      t(240, 405, `la plus grande valeur de s${NB}?`, C.rose, 22));
})();

const corde = svg("Une corde à sauter dont la hauteur vaut y(t) = sin(3t) ; Léo écrit que sa dérivée est cos(3t)",
  l(70, 300, 70, 240, C.jaune, 8) + l(410, 300, 410, 240, C.jaune, 8) + p("M70 240 Q240 20 410 240", C.bleu, 5) +
    t(240, 200, "y(t) = sin(3t)", C.bleu, 28) + t(240, 270, "Léo : y′(t) = cos(3t)", C.craie, 24) +
    t(240, 390, `Léo a-t-il raison${NB}?`, C.rose, 24));

const tole = (() => {
  const R = repereXY(0, 3.4, 0, 1.4, { gx: 80, gy: 80, gl: 350, gh: 240, px: 0.5, py: 0.2, ex: 1, ey: 0.2 });
  let d = `M${R.X(0)} ${R.Y(0)} `;
  for (let k = 0; k <= 60; k++) { const x = (Math.PI * k) / 60; d += `L${R.X(x)} ${R.Y(Math.sin(x))} `; }
  d += "Z";
  return svg("Une ondulation de la tôle : la courbe y = sin x de 0 à π, l'aire sous la courbe est coloriée",
    R.fond + p(d, C.jaune, 0, 0.35) + R.courbe(Math.sin, 0, Math.PI, C.bleu, 5) +
      t(R.X(Math.PI), R.Y(0) + 46, "π", C.rose, 22) + t(R.X(1.57), R.Y(0.45), "aire ?", C.craie, 24) +
      t(R.X(0) + 12, 45, "y = sin x (cm)", C.bleu, 22, "start") +
      t(240, 405, `l'aire d'une ondulation${NB}?`, C.rose, 22));
})();

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "fonctions_sinus_cosinus",
  titre: "Énigmes des fonctions sinus et cosinus",
  description: "La grande roue, le bouchon de pêche, le phare, l'enceinte, le piège de la corde à sauter, le défi de la tôle ondulée d'une case créole : période, dérivée de sin et cos, inéquation cos x ≥ a, maximum, intégrale de sinus.",
  problemes: [
    {
      tag: "Énigme 1 · La grande roue",
      titre: "La période",
      question: `Sur une grande roue, la hauteur d'une cabine est h(t) = 20 − 18 cos(${frac("π t", 5)}), en mètres, après t minutes.<br><br><b>Combien de temps</b> dure un tour ?`,
      reponse: `cos(a t) a pour période ${frac("2π", "a")}. Ici a = ${frac("π", 5)}, donc la période vaut 2π × ${frac(5, "π")} = 10.<br>Un tour dure <span class="big">10 min</span>.`,
      consigne: "h(t) = 20 − 18 cos(πt/5) : combien de minutes dure un tour ?",
      verification: { type: "qcm", choix: ["10 min", "5 min", "20 min"], bonne: 0 },
      dessin: roue,
    },
    {
      tag: "Énigme 2 · Le bouchon de pêche",
      titre: "Dériver un sinus",
      question: `Un bouchon de pêche danse sur l'eau. Sa hauteur est y(t) = 3 sin(2t), en cm, après t secondes.<br><br><b>Quelle est sa vitesse</b> y′(0) au départ ?`,
      reponse: `(sin(2t))′ = 2 cos(2t), donc y′(t) = 6 cos(2t).<br>y′(0) = 6 × cos 0 = <span class="big">6 cm/s</span>.`,
      consigne: "y(t) = 3 sin(2t) : combien vaut y′(0) ?",
      verification: { type: "courte", attendus: ["6", "6cm/s"], unite: "cm/s" },
      dessin: bouchon,
    },
    {
      tag: "Énigme 3 · Le phare",
      titre: "Résoudre cos x ≥ a",
      question: `Un phare tourne. Un bateau est éclairé quand cos x ≥ ${frac(1, 2)}, x étant l'angle du faisceau, entre −π et π.<br><br><b>Pour quels angles</b> le bateau est-il éclairé ?`,
      reponse: `cos x = ${frac(1, 2)} pour x = ${frac("π", 3)} et x = −${frac("π", 3)}. Le cosinus est plus grand sur l'arc de droite, entre les deux.<br><span class="big">x ∈ [−π/3 ; π/3]</span>.`,
      consigne: "Sur [−π ; π], pour quels x a-t-on cos x ≥ 1/2 ?",
      verification: { type: "qcm", choix: ["[−π/6 ; π/6]", "[−π/3 ; π/3]", "[π/3 ; π]"], bonne: 1 },
      dessin: phare,
    },
    {
      tag: "Énigme 4 · L'enceinte",
      titre: "Le maximum",
      question: `Dans une enceinte, deux ondes s'ajoutent : s(t) = sin t + cos t.<br><br><b>Quelle est la plus grande valeur</b> de s(t) ?`,
      reponse: `s′(t) = cos t − sin t s'annule en t = ${frac("π", 4)}, où s passe d'une hausse à une baisse.<br>s(${frac("π", 4)}) = ${frac("√2", 2)} + ${frac("√2", 2)} = <span class="big">√2 ≈ 1,41</span>.`,
      consigne: "s(t) = sin t + cos t : quelle est la plus grande valeur de s ?",
      verification: { type: "courte", attendus: ["√2", "racine de 2", "racinede2", "1,41", "1,414", "1,4"] },
      dessin: enceinte,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La corde à sauter",
      sorte: "piege",
      question: `La hauteur d'une corde à sauter est y(t) = sin(3t).<br>Léo : « Sa dérivée est y′(t) = cos(3t). »<br><br><b>Quelle est la bonne dérivée</b> ?`,
      reponse: `(sin(u))′ = u′ cos(u), avec u = 3t et u′ = 3. Léo a oublié de multiplier par 3.<br><span class="big">y′(t) = 3 cos(3t)</span>.`,
      consigne: "y(t) = sin(3t) : quelle est la dérivée y′(t) ?",
      verification: { type: "qcm", choix: ["cos(3t)", "−3 cos(3t)", "3 cos(3t)"], bonne: 2 },
      dessin: corde,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La tôle ondulée de la case créole",
      sorte: "defi",
      question: `À La Réunion, le toit d'une case créole est en tôle ondulée. Une ondulation a pour profil y = sin x, pour x de 0 à π (en cm).<br><br><b>Quelle est l'aire</b> sous une ondulation ?`,
      reponse: `Une primitive de sin est −cos. L'aire vaut −cos π − (−cos 0) = 1 + 1.<br><span class="big">2 cm²</span>.`,
      consigne: "Aire sous y = sin x, de x = 0 à x = π : combien de cm² ?",
      verification: { type: "courte", attendus: ["2", "2cm²", "2cm2"], unite: "cm²" },
      dessin: tole,
    },
  ],
};

export default problemes;
