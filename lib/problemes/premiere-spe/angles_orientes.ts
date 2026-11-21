// Énigmes à projeter — première spé maths, notion angles_orientes
// (le volant du tracteur, le radar de la tour de contrôle, la girouette,
// l'alvéole de la ruche, piège du sémaphore, défi du robot aspirateur). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, o, p, fleche } from "../dessins-ecole";
import { vecS } from "../dessins-tle";

/** Un arc de cercle de a0 à a1 (degrés, sens trigonométrique, 0° = vers la droite). */
const arc = (cx: number, cy: number, k: number, a0: number, a1: number, c: string = C.rose, ep = 3) => {
  const pt = (a: number) => `${+(cx + k * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${+(cy - k * Math.sin((a * Math.PI) / 180)).toFixed(1)}`;
  return p(`M${pt(a0)} A${k} ${k} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${pt(a1)}`, c, ep);
};
/** Le point du cercle de centre (cx, cy), de rayon k, à l'angle a (degrés). */
const sur = (cx: number, cy: number, k: number, a: number): [number, number] =>
  [+(cx + k * Math.cos((a * Math.PI) / 180)).toFixed(1), +(cy - k * Math.sin((a * Math.PI) / 180)).toFixed(1)];
/** Une flèche au bout d'un arc qui tourne dans le sens des aiguilles d'une montre. */
const boutHoraire = (cx: number, cy: number, k: number, a: number, c: string) => {
  const [x, y] = sur(cx, cy, k, a), [x2, y2] = sur(cx, cy, k, a - 8);
  return fleche(x, y, x2, y2, c, 4);
};

const volant = svg("Le volant du tracteur : le conducteur le tourne de 13π/4 dans le sens des aiguilles d'une montre",
  o(240, 170, 110, C.craie, 0, 10) + o(240, 170, 22, C.craie, 0.6, 4) +
    l(218, 170, 130, 170, C.craie, 8) + l(262, 170, 350, 170, C.craie, 8) + l(240, 192, 240, 280, C.craie, 8) +
    arc(240, 170, 140, 90, -200, C.rose, 4) + boutHoraire(240, 170, 140, -200, C.rose) +
    t(240, 352, "angle : −13π/4 rad", C.craie, 26) +
    t(240, 400, `mesure principale${NB}?`, C.rose, 26));

const radar = (() => {
  const O: [number, number] = [140, 300];
  const [vx, vy] = sur(O[0], O[1], 230, 60), [wx, wy] = sur(O[0], O[1], 230, 105);
  return svg("Le radar de la tour de contrôle : l'angle orienté de u vers v vaut π/3, celui de v vers w vaut π/4",
    fleche(O[0], O[1], 370, 300, C.craie, 4) + fleche(O[0], O[1], vx, vy, C.bleu, 4) + fleche(O[0], O[1], wx, wy, C.jaune, 4) + o(O[0], O[1], 7, C.craie, 1, 2) +
      arc(O[0], O[1], 70, 0, 60, C.rose) + t(222, 256, "π/3", C.rose, 20) +
      arc(O[0], O[1], 110, 60, 105, C.rose) + t(158, 165, "π/4", C.rose, 20) +
      vecS(392, 312, "u", C.craie) + vecS(278, 108, "v", C.bleu) + vecS(62, 82, "w", C.jaune) +
      t(350, 390, `(u, w) =${NB}?`, C.rose, 28));
})();

const girouette = (() => {
  const [wx, wy] = sur(240, 200, 140, 120), [gx, gy] = sur(240, 200, 140, -60);
  return svg("La rose des vents : le vecteur n pointe vers le nord, le vent w fait un angle π/6 avec n ; la girouette pointe dans le sens de −w",
    o(240, 200, 150, C.pale, 0, 2) + fleche(240, 200, 240, 60, C.craie, 4) + fleche(240, 200, wx, wy, C.bleu, 4) + fleche(240, 200, gx, gy, C.jaune, 5) +
      o(240, 200, 7, C.craie, 1, 2) +
      arc(240, 200, 60, 90, 120, C.rose) + t(218, 120, "π/6", C.rose, 20) +
      vecS(262, 70, "n", C.craie) + vecS(150, 78, "w", C.bleu) + t(276, 300, "−w", C.jaune, 24, "end") +
      t(120, 400, `(n, −w) =${NB}?`, C.rose, 26));
})();

const ruche = (() => {
  const S = [0, 60, 120, 180, 240, 300].map((a) => sur(240, 190, 140, a));
  const noms = "ABCDEF".split("");
  return svg("L'alvéole de la ruche est un hexagone régulier ABCDEF de centre O, tourné dans le sens trigonométrique",
    p(`M${S.map(([x, y]) => `${x} ${y}`).join(" L")} Z`, C.jaune, 4, 0.2) +
      fleche(240, 190, S[0][0] - 4, S[0][1], C.bleu, 4) + fleche(240, 190, S[2][0] + 2, S[2][1] + 4, C.bleu, 4) + o(240, 190, 7, C.craie, 1, 2) +
      noms.map((n, i) => { const [x, y] = sur(240, 190, 166, i * 60); return t(x, y + 8, n, C.craie, 22); }).join("") +
      t(254, 220, "O", C.craie, 20, "start") +
      t(240, 400, `(OA, OC) =${NB}?`, C.rose, 28));
})();

const semaphore = (() => {
  const [vx, vy] = sur(200, 250, 200, 60);
  return svg("Le sémaphore : le bras u est horizontal, le bras v fait avec lui l'angle orienté π/3",
    l(200, 250, 200, 360, C.craie, 8) + fleche(200, 250, 410, 250, C.bleu, 6) + fleche(200, 250, vx, vy, C.jaune, 6) + o(200, 250, 9, C.craie, 1, 2) +
      arc(200, 250, 60, 0, 60, C.rose) + t(278, 232, "π/3", C.rose, 20) +
      vecS(420, 236, "u", C.bleu) + vecS(318, 62, "v", C.jaune) +
      t(60, 120, "(u, v) = π/3", C.craie, 24, "start") +
      t(330, 330, `(v, u) =${NB}?`, C.rose, 28));
})();

const robot = svg("Le robot aspirateur tourne dix fois de suite de 3π/4 dans le sens trigonométrique",
  o(240, 170, 90, C.craie, 0.15, 4) + o(240, 170, 20, C.bleu, 0.6, 3) + fleche(240, 170, 240, 98, C.jaune, 4) +
    arc(240, 170, 125, 90, 225, C.rose, 4) + fleche(...sur(240, 170, 125, 217), ...sur(240, 170, 125, 225), C.rose, 4) +
    t(240, 340, "10 fois de suite : + 3π/4", C.craie, 26) +
    t(240, 395, `mesure principale${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "angles_orientes",
  titre: "Énigmes d'angles orientés",
  description: "Le volant du tracteur, le radar de la tour de contrôle, la girouette, l'alvéole de la ruche, le piège du sémaphore, le défi du robot aspirateur : mesure principale, relation de Chasles, angles (−u, v) et (v, u), lecture sur une figure.",
  problemes: [
    {
      tag: "Énigme 1 · Le volant du tracteur",
      titre: "La mesure principale",
      question: `Pour manœuvrer, un conducteur tourne le volant de son tracteur de 13π/4 dans le sens des aiguilles d'une montre : l'angle vaut −13π/4.<br><br><b>Quelle est sa mesure principale</b>, dans ]−π ; π] ?`,
      reponse: `On ajoute des tours complets : −13π/4 + 4π = −13π/4 + 16π/4 = 3π/4.<br>3π/4 est dans ]−π ; π] : <span class="big">3π/4</span>.`,
      consigne: "Quelle est la mesure principale de −13π/4 ?",
      verification: { type: "qcm", choix: ["3π/4", "−3π/4", "π/4"], bonne: 0 },
      dessin: volant,
    },
    {
      tag: "Énigme 2 · Le radar",
      titre: "La relation de Chasles",
      question: `Sur l'écran radar d'une tour de contrôle, trois avions sont repérés par les vecteurs u, v et w. L'angle orienté (u, v) vaut π/3 et l'angle (v, w) vaut π/4.<br><br><b>Combien vaut l'angle (u, w)</b> ?`,
      reponse: `Chasles : (u, w) = (u, v) + (v, w) = π/3 + π/4 = 4π/12 + 3π/12.<br><span class="big">(u, w) = 7π/12</span>.`,
      consigne: "(u, v) = π/3 et (v, w) = π/4. Combien vaut (u, w) ?",
      verification: { type: "courte", attendus: ["7π/12", "7pi/12"] },
      dessin: radar,
    },
    {
      tag: "Énigme 3 · La girouette",
      titre: "Le vecteur opposé",
      question: `Sur une rose des vents, n pointe vers le nord. Le vent w fait avec n l'angle orienté (n, w) = π/6. La girouette pointe dans le sens de −w.<br><br><b>Quelle est la mesure principale</b> de (n, −w) ?`,
      reponse: `Changer w en −w ajoute un demi-tour : (n, −w) = π/6 + π = 7π/6.<br>On retire 2π pour revenir dans ]−π ; π] : <span class="big">−5π/6</span>.`,
      consigne: "(n, w) = π/6. Quelle est la mesure principale de (n, −w) ?",
      verification: { type: "qcm", choix: ["5π/6", "−5π/6", "−π/6"], bonne: 1 },
      dessin: girouette,
    },
    {
      tag: "Énigme 4 · La ruche",
      titre: "Lire un angle sur une figure",
      question: `Une alvéole de ruche a la forme d'un hexagone régulier ABCDEF de centre O. Les sommets tournent dans le sens trigonométrique.<br><br><b>Combien vaut l'angle orienté (OA, OC)</b> ?`,
      reponse: `Un tour complet vaut 2π, partagé en 6 : de A à B, on tourne de π/3.<br>De A à C, deux crans : <span class="big">(OA, OC) = 2π/3</span>.`,
      consigne: "Hexagone régulier ABCDEF de centre O. Combien vaut (OA, OC) ?",
      verification: { type: "courte", attendus: ["2π/3", "2pi/3"] },
      dessin: ruche,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le sémaphore",
      sorte: "piege",
      question: `Un sémaphore a deux bras, u et v. L'angle orienté (u, v) vaut π/3.<br>Maëlle : « Alors (v, u) vaut aussi π/3. »<br><br><b>Combien vaut (v, u)</b> ?`,
      reponse: `Un angle orienté a un sens : de v vers u, on tourne dans l'autre sens.<br>(v, u) = −(u, v) : <span class="big">(v, u) = −π/3</span>.`,
      consigne: "(u, v) = π/3. Combien vaut (v, u) ?",
      verification: { type: "qcm", choix: ["π/3", "2π/3", "−π/3"], bonne: 2 },
      dessin: semaphore,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le robot aspirateur",
      sorte: "defi",
      question: `Un robot aspirateur tourne sur place de 3π/4, dix fois de suite, toujours dans le sens trigonométrique.<br><br><b>Quelle est la mesure principale</b> de l'angle total ?`,
      reponse: `Total : 10 × 3π/4 = 30π/4 = 15π/2.<br>On retire 4 tours, soit 8π = 16π/2 : 15π/2 − 16π/2 = −π/2.<br><span class="big">−π/2</span> : le robot regarde un quart de tour à droite de son départ.`,
      consigne: "10 fois 3π/4. Quelle est la mesure principale de l'angle total ?",
      verification: { type: "courte", attendus: ["−π/2", "-π/2", "-pi/2", "−pi/2"] },
      dessin: robot,
    },
  ],
};

export default problemes;
