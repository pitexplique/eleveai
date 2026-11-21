// Énigmes à projeter — première spé maths, notion trigonometrie
// (le carrousel de la fête foraine, la roue du moulin à eau, la barrière qui
// se lève, la pirouette de la danseuse, piège de la boussole, défi du transat
// de la plage). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, o, p } from "../dessins-ecole";
import { secteur } from "../dessins-1re";

/** Un arc de cercle de a0 à a1 (degrés, sens trigonométrique, 0° = vers la droite). */
const arc = (cx: number, cy: number, k: number, a0: number, a1: number, c: string = C.rose, ep = 3) => {
  const pt = (a: number) => `${+(cx + k * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${+(cy - k * Math.sin((a * Math.PI) / 180)).toFixed(1)}`;
  return p(`M${pt(a0)} A${k} ${k} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${pt(a1)}`, c, ep);
};
/** Le point du cercle de centre (cx, cy), de rayon k, à l'angle a (degrés). */
const sur = (cx: number, cy: number, k: number, a: number): [number, number] =>
  [+(cx + k * Math.cos((a * Math.PI) / 180)).toFixed(1), +(cy - k * Math.sin((a * Math.PI) / 180)).toFixed(1)];

const carrousel = svg("Le carrousel vu de dessus : un cheval de bois tourne de 120 degrés autour du centre",
  o(240, 170, 130, C.craie, 0, 4) + secteur(240, 170, 130, 0, 120, C.jaune, 0.35) +
    [0, 60, 120, 180, 240, 300].map((a) => { const [x, y] = sur(240, 170, 105, 90 - a); return o(x, y, 10, C.bleu, 0.6, 2); }).join("") +
    o(240, 170, 8, C.craie, 1, 2) +
    t(240, 350, `120° =${NB}? rad`, C.rose, 30));

const moulin = (() => {
  const [px, py] = sur(190, 190, 130, 30);
  return svg("La roue du moulin à eau, de rayon 2 mètres : un godet est à un angle de π/6 au-dessus de l'horizontale du centre",
    o(190, 190, 130, C.bleu, 0.12, 4) + l(40, 190, 360, 190, C.pale, 2, "8 6") +
      l(190, 190, px, py, C.craie, 4) + l(px, py, px, 190, C.rose, 4, "6 5") + o(px, py, 10, C.jaune, 0.8, 3) +
      arc(190, 190, 44, 0, 30, C.jaune) + t(252, 182, "π/6", C.jaune, 20, "start") +
      t(232, 128, "2 m", C.craie, 22, "end") + t(px + 16, 160, "h", C.rose, 26, "start") +
      t(240, 380, `h =${NB}? m`, C.rose, 30));
})();

const barriere = (() => {
  const [bx, by] = sur(240, 260, 190, 53.13);
  return svg("La barrière du parking se lève : elle fait un angle a avec la route à droite, et un angle π − a avec la route à gauche ; cos a = 0,6",
    l(30, 260, 450, 260, C.pale, 3) + l(240, 260, bx, by, C.rose, 8) + o(240, 260, 10, C.craie, 1, 2) +
      arc(240, 260, 50, 0, 53.13, C.jaune) + arc(240, 260, 36, 53.13, 180, C.bleu) +
      t(300, 248, "a", C.jaune, 24, "start") + t(168, 222, "π − a", C.bleu, 22, "end") +
      t(240, 330, "cos a = 0,6", C.craie, 26) +
      t(240, 385, `cos(π − a) =${NB}?`, C.rose, 28));
})();

const danseuse = svg("La danseuse fait une pirouette de 17π/6 radians",
  o(240, 160, 110, C.pale, 0, 2) + arc(240, 160, 110, 90, 90 - 358, C.jaune, 4) + arc(240, 160, 80, 90, 90 - 150, C.bleu, 5) +
    o(240, 160, 14, C.rose, 0.8, 2) + l(240, 174, 240, 210, C.craie, 4) +
    t(240, 330, "pirouette : 17π/6 rad", C.craie, 26) +
    t(240, 385, `mesure principale${NB}?`, C.rose, 28));

const boussole = (() => {
  const [ax, ay] = sur(240, 180, 140, 60), [bx, by] = sur(240, 180, 140, -60);
  return svg("Le cercle trigonométrique : la droite verticale d'abscisse 1/2 coupe le cercle en deux points",
    o(240, 180, 140, C.craie, 0, 4) + l(80, 180, 400, 180, C.pale, 2) + l(240, 30, 240, 330, C.pale, 2) +
      l(ax, 24, bx, 336, C.jaune, 3, "8 6") + o(ax, ay, 9, C.rose, 1, 2) + o(bx, by, 9, C.rose, 1, 2) +
      t(ax + 8, 204, "1/2", C.jaune, 20, "start") + t(392, 172, "1", C.pale, 18, "end") +
      t(240, 390, `cos x = 1/2 sur ]−π ; π]${NB}?`, C.rose, 24));
})();

const transat = (() => {
  const [mx, my] = sur(260, 210, 150, 180 - 36.87);
  return svg("Le dossier du transat fait un angle x obtus avec le sol, et sin x = 3/5",
    o(260, 210, 150, C.pale, 0, 2) + l(90, 210, 430, 210, C.pale, 2) + l(260, 50, 260, 370, C.pale, 2) +
      l(260, 210, mx, my, C.bleu, 7) + l(260, 210, 410, 210, C.bleu, 7) + l(mx, my, mx, 210, C.rose, 3, "6 5") +
      arc(260, 210, 44, 0, 143.13, C.jaune) + t(292, 160, "x", C.jaune, 24, "start") +
      t(30, 50, "sin x = 3/5", C.craie, 24, "start") +
      t(240, 400, `cos x =${NB}?`, C.rose, 28));
})();

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "trigonometrie",
  titre: "Énigmes de trigonométrie",
  description: "Le carrousel de la fête foraine, la roue du moulin à eau, la barrière du parking, la pirouette de la danseuse, le piège de la boussole, le défi du transat : radians, cercle trigonométrique, angles associés, mesure principale, équation cos x = a, cos² + sin² = 1.",
  problemes: [
    {
      tag: "Énigme 1 · Le carrousel",
      titre: "Des degrés aux radians",
      question: `Sur le carrousel de la fête foraine, un cheval de bois tourne de 120° autour du centre.<br><br><b>Combien de radians</b> cela fait-il ?`,
      reponse: `180° = π rad, donc 120° = 120 × π ÷ 180 rad.<br><span class="big">120° = 2π/3 rad</span>.`,
      consigne: "Le cheval tourne de 120°. Combien de radians ?",
      verification: { type: "qcm", choix: ["2π/3 rad", "3π/2 rad", "π/3 rad"], bonne: 0 },
      dessin: carrousel,
    },
    {
      tag: "Énigme 2 · Le moulin à eau",
      titre: "Lire un sinus sur le cercle",
      question: `La roue d'un moulin à eau a un rayon de 2 m. Un godet est à un angle de π/6 au-dessus de l'horizontale qui passe par le centre.<br><br><b>De combien de mètres</b> le godet est-il plus haut que le centre ?`,
      reponse: `La hauteur vaut 2 × sin(π/6) = 2 × 0,5.<br><span class="big">h = 1 m</span>.`,
      consigne: "Rayon 2 m, angle π/6. De combien le godet est-il plus haut que le centre ?",
      verification: { type: "courte", attendus: ["1"], unite: "m" },
      dessin: moulin,
    },
    {
      tag: "Énigme 3 · La barrière du parking",
      titre: "Un angle associé",
      question: `La barrière d'un parking se lève. Avec la route, à droite, elle fait un angle a tel que cos a = 0,6. À gauche, elle fait un angle π − a.<br><br><b>Combien vaut cos(π − a)</b> ?`,
      reponse: `Sur le cercle, π − a est le symétrique de a par rapport à l'axe des ordonnées : cos(π − a) = −cos a.<br><span class="big">cos(π − a) = −0,6</span>.`,
      consigne: "cos a = 0,6. Combien vaut cos(π − a) ?",
      verification: { type: "courte", attendus: ["−0,6", "-0,6", "−3/5", "-3/5"] },
      dessin: barriere,
    },
    {
      tag: "Énigme 4 · La pirouette",
      titre: "La mesure principale",
      question: `Une danseuse fait une pirouette de 17π/6 rad.<br><br><b>Quelle est la mesure principale</b> de cet angle, c'est-à-dire sa mesure dans ]−π ; π] ?`,
      reponse: `On retire un tour complet : 17π/6 − 2π = 17π/6 − 12π/6 = 5π/6.<br>5π/6 est bien dans ]−π ; π] : <span class="big">5π/6</span>.`,
      consigne: "Quelle est la mesure principale de 17π/6 ?",
      verification: { type: "qcm", choix: ["π/6", "5π/6", "−5π/6"], bonne: 1 },
      dessin: danseuse,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La boussole",
      sorte: "piege",
      question: `Une randonneuse cherche un cap x, entre −π et π, tel que cos x = 1/2.<br>Lucas : « Il n'y a qu'une solution : π/3. »<br><br><b>Quelles sont les solutions dans ]−π ; π]</b> ?`,
      reponse: `La droite d'abscisse 1/2 coupe le cercle en <b>deux</b> points, symétriques par rapport à l'axe des abscisses : cos(−x) = cos x.<br><span class="big">π/3 et −π/3</span>.`,
      consigne: "cos x = 1/2 dans ]−π ; π]. Quelles sont les solutions ?",
      verification: { type: "qcm", choix: ["π/3 seulement", "π/3 et 2π/3", "π/3 et −π/3"], bonne: 2 },
      dessin: boussole,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le transat de la plage",
      sorte: "defi",
      question: `Le dossier d'un transat fait avec le sol un angle x compris entre π/2 et π, tel que sin x = 3/5.<br><br><b>Combien vaut cos x</b> ?`,
      reponse: `cos² x + sin² x = 1, donc cos² x = 1 − 9/25 = 16/25 : cos x = 4/5 ou −4/5.<br>x est entre π/2 et π : le cosinus est négatif. <span class="big">cos x = −4/5 = −0,8</span>.`,
      consigne: "sin x = 3/5 et x entre π/2 et π. Combien vaut cos x ?",
      verification: { type: "courte", attendus: ["−0,8", "-0,8", "−4/5", "-4/5"] },
      dessin: transat,
    },
  ],
};

export default problemes;
