// Énigmes à projeter — première spé maths, notion trigo_formules_equations
// (la rampe du camion, la tente canadienne, la corde du violon, le métronome,
// piège de la lampe de bureau, défi des néons de la vitrine). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, o, p, r } from "../dessins-ecole";

/** Un arc de cercle de a0 à a1 (degrés, sens trigonométrique, 0° = vers la droite). */
const arc = (cx: number, cy: number, k: number, a0: number, a1: number, c: string = C.rose, ep = 3) => {
  const pt = (a: number) => `${+(cx + k * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${+(cy - k * Math.sin((a * Math.PI) / 180)).toFixed(1)}`;
  return p(`M${pt(a0)} A${k} ${k} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${pt(a1)}`, c, ep);
};

const rampe = svg("La rampe de chargement du camion fait un angle de π/12 radian, soit 15 degrés, avec le sol",
  l(30, 320, 450, 320, C.pale, 3) + r(330, 150, 120, 98, C.bleu, 0.3, 3, 4) + r(340, 248, 110, 32, C.craie, 0.2, 3) + o(362, 300, 20, C.craie, 0, 3) + o(425, 300, 20, C.craie, 0, 3) +
    l(60, 320, 330, 247.7, C.jaune, 7) + l(330, 247.7, 330, 320, C.rose, 3, "6 5") +
    arc(60, 320, 70, 0, 15, C.rose) + t(318, 292, "h", C.rose, 26, "end") +
    t(110, 356, "15° = π/12", C.rose, 22) +
    t(240, 400, `sin(π/12) =${NB}?`, C.craie, 28));

const tente = svg("La tente canadienne vue de face : deux pans de 2 mètres, chacun fait un angle a avec l'axe vertical, sin a = 0,6 et cos a = 0,8",
  l(40, 240, 440, 240, C.pale, 3) + p("M240 80 L120 240 L360 240 Z", C.jaune, 4, 0.25) + l(240, 80, 240, 240, C.pale, 2, "8 6") +
    arc(240, 80, 44, -90, -53.13, C.rose) + t(261, 146, "a", C.rose, 22) +
    t(168, 146, "2 m", C.craie, 22, "end") + t(312, 146, "2 m", C.craie, 22, "start") +
    t(240, 296, "sin a = 0,6 · cos a = 0,8", C.craie, 24) +
    t(240, 380, `aire de la toile de face${NB}?`, C.rose, 26));

const violon = svg("La corde du violon vibre : sa position vaut 3 cos t + 4 sin t, en millimètres",
  o(60, 180, 9, C.craie, 1, 2) + o(420, 180, 9, C.craie, 1, 2) +
    p("M60 180 Q240 90 420 180 Q240 270 60 180", C.bleu, 4, 0.15) + l(60, 180, 420, 180, C.pale, 2, "8 6") +
    l(240, 135, 240, 180, C.rose, 3) + t(252, 166, "?", C.rose, 24, "start") +
    t(240, 320, "y = 3 cos t + 4 sin t (mm)", C.craie, 26) +
    t(240, 385, `écart le plus grand${NB}?`, C.rose, 26));

const metronome = svg("Le métronome : l'aiguille est verticale quand cos(2x) = 0",
  p("M180 300 L300 300 L268 60 L212 60 Z", C.bleu, 4, 0.25) + l(240, 280, 280, 110, C.jaune, 5) + o(240, 280, 8, C.craie, 1, 2) +
    r(255, 160, 22, 16, C.rose, 0.8, 2) + l(240, 280, 240, 90, C.pale, 2, "6 5") +
    t(240, 352, "cos(2x) = 0", C.craie, 28) +
    t(240, 400, `sur [0 ; 2π[ : combien de x${NB}?`, C.rose, 24));

const lampe = svg("La lampe de bureau : le premier bras fait π/3 avec la table, le second tourne encore de π/6",
  l(30, 320, 450, 320, C.pale, 3) + p("M160 320 L240 320 L230 306 L170 306 Z", C.craie, 3, 0.3) +
    l(200, 306, 270, 185, C.bleu, 6) + l(270, 185, 270, 80, C.bleu, 6) + l(270, 185, 325, 89.7, C.pale, 2, "6 5") +
    p("M248 80 L292 80 L282 56 L258 56 Z", C.jaune, 3, 0.6) + o(270, 185, 7, C.craie, 1, 2) +
    arc(200, 306, 44, 0, 60, C.rose) + t(262, 296, "π/3", C.rose, 20, "start") +
    arc(270, 185, 40, 60, 90, C.jaune) + t(318, 150, "π/6", C.jaune, 20, "start") +
    t(240, 395, `cos(π/3 + π/6) =${NB}?`, C.craie, 28));

const neons = svg("La vitrine : deux néons clignotent, leurs intensités valent sin x et sin 2x",
  r(40, 40, 400, 230, C.pale, 0.08, 3, 10) +
    r(80, 80, 140, 60, C.rose, 0.35, 4, 30) + t(150, 122, "sin x", C.craie, 26) +
    r(260, 80, 140, 60, C.bleu, 0.35, 4, 30) + t(330, 122, "sin 2x", C.craie, 26) +
    t(240, 220, "même éclat ?", C.jaune, 26) +
    t(240, 330, "sin 2x = sin x", C.craie, 28) +
    t(240, 385, `sur [0 ; π] : combien de x${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "trigo_formules_equations",
  titre: "Énigmes de formules et équations trigonométriques",
  description: "La rampe du camion, la tente canadienne, la corde du violon, le métronome, le piège de la lampe de bureau, le défi des néons : formules d'addition et de duplication, a cos t + b sin t, équations cos x = a et sin u = sin v.",
  problemes: [
    {
      tag: "Énigme 1 · La rampe du camion",
      titre: "Une formule d'addition",
      question: `La rampe de chargement d'un camion fait un angle de 15° avec le sol, soit π/12 rad. Or π/12 = π/3 − π/4.<br><br><b>Quelle est la valeur exacte</b> de sin(π/12) ?`,
      reponse: `sin(a − b) = sin a cos b − cos a sin b.<br>sin(π/12) = (√3/2)(√2/2) − (1/2)(√2/2) = (√6 − √2)/4.<br><span class="big">sin(π/12) = (√6 − √2)/4 ≈ 0,259</span>.`,
      consigne: "π/12 = π/3 − π/4. Quelle est la valeur exacte de sin(π/12) ?",
      verification: { type: "qcm", choix: ["(√6 − √2)/4", "(√6 + √2)/4", "√3/2 − √2/2"], bonne: 0 },
      dessin: rampe,
    },
    {
      tag: "Énigme 2 · La tente canadienne",
      titre: "La formule de duplication",
      question: `Vue de face, une tente canadienne est un triangle. Ses deux pans mesurent 2 m. Chacun fait avec l'axe vertical un angle a, avec sin a = 0,6 et cos a = 0,8. L'angle au sommet vaut donc 2a.<br><br><b>Quelle est l'aire</b> du triangle, en m² ?`,
      reponse: `Aire = ½ × 2 × 2 × sin(2a) = 2 sin(2a).<br>sin(2a) = 2 sin a cos a = 2 × 0,6 × 0,8 = 0,96.<br><span class="big">Aire = 1,92 m²</span>.`,
      consigne: "Pans de 2 m, sin a = 0,6, cos a = 0,8, angle au sommet 2a. Quelle est l'aire, en m² ?",
      verification: { type: "courte", attendus: ["1,92", "1.92"], unite: "m²" },
      dessin: tente,
    },
    {
      tag: "Énigme 3 · La corde du violon",
      titre: "Deux vibrations qui s'ajoutent",
      question: `Deux vibrations s'ajoutent dans la corde d'un violon. Au temps t, la corde est à y = 3 cos t + 4 sin t millimètres de sa position de repos.<br><br><b>Quel est l'écart le plus grand</b>, en mm ?`,
      reponse: `On écrit 3 cos t + 4 sin t = R cos(t − φ), avec R = √(3² + 4²) = √25 = 5.<br>Un cosinus vaut au plus 1 : <span class="big">5 mm</span>.`,
      consigne: "y = 3 cos t + 4 sin t (en mm). Quel est l'écart le plus grand ?",
      verification: { type: "courte", attendus: ["5"], unite: "mm" },
      dessin: violon,
    },
    {
      tag: "Énigme 4 · Le métronome",
      titre: "Une équation trigonométrique",
      question: `L'aiguille d'un métronome est verticale quand cos(2x) = 0.<br><br><b>Combien de solutions</b> cette équation a-t-elle dans [0 ; 2π[ ?`,
      reponse: `cos(2x) = 0 donne 2x = π/2 + kπ, donc x = π/4 + kπ/2.<br>Dans [0 ; 2π[ : π/4, 3π/4, 5π/4, 7π/4.<br><span class="big">4 solutions</span>.`,
      consigne: "cos(2x) = 0. Combien de solutions dans [0 ; 2π[ ?",
      verification: { type: "qcm", choix: ["2", "4", "8"], bonne: 1 },
      dessin: metronome,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La lampe de bureau",
      sorte: "piege",
      question: `Le premier bras d'une lampe de bureau fait un angle de π/3 avec la table. Le second bras tourne encore de π/6.<br>Hugo : « cos(π/3 + π/6) = cos(π/3) + cos(π/6). »<br><br><b>Combien vaut cos(π/3 + π/6)</b> ?`,
      reponse: `Hugo a tort : le cosinus d'une somme n'est pas la somme des cosinus.<br>π/3 + π/6 = π/2 : le second bras est vertical.<br><span class="big">cos(π/2) = 0</span>.`,
      consigne: "Combien vaut cos(π/3 + π/6) ?",
      verification: { type: "qcm", choix: ["(1 + √3)/2", "1/2", "0"], bonne: 2 },
      dessin: lampe,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les néons de la vitrine",
      sorte: "defi",
      question: `Dans une vitrine, deux néons clignotent. Leurs éclats valent sin x et sin 2x.<br><br><b>Pour combien de valeurs de x</b> dans [0 ; π] ont-ils le même éclat ?`,
      reponse: `sin 2x = sin x s'écrit 2 sin x cos x − sin x = 0, soit sin x (2 cos x − 1) = 0.<br>sin x = 0 : x = 0 ou x = π. cos x = 1/2 : x = π/3.<br><span class="big">3 valeurs</span> : 0, π/3 et π.`,
      consigne: "sin 2x = sin x. Combien de solutions dans [0 ; π] ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: neons,
    },
  ],
};

export default problemes;
