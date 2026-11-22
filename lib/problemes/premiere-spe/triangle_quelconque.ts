// Énigmes à projeter — première spé maths, notion triangle_quelconque
// (l'enclos des chèvres, la voile du catamaran, les deux tours de guet,
// les palmiers du rond-point, piège de l'équerre du menuisier, défi du carré
// d'aromatiques). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
// Al-Kashi reste dans produit_scalaire.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, o, p, r, ell } from "../dessins-ecole";

/** Un arc de cercle de a0 à a1 (degrés, sens trigonométrique, 0° = vers la droite). */
const arc = (cx: number, cy: number, k: number, a0: number, a1: number, c: string = C.rose, ep = 3) => {
  const pt = (a: number) => `${+(cx + k * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${+(cy - k * Math.sin((a * Math.PI) / 180)).toFixed(1)}`;
  return p(`M${pt(a0)} A${k} ${k} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${pt(a1)}`, c, ep);
};

const enclos = svg("L'enclos triangulaire des chèvres : deux côtés de 10 mètres et 8 mètres font un angle de 30 degrés",
  p("M100 320 L400 320 L307.8 200 Z", C.jaune, 4, 0.2) +
    arc(100, 320, 50, 0, 30, C.rose) + t(190, 306, "30°", C.rose, 20) +
    t(250, 352, "10 m", C.craie, 22) + t(190, 240, "8 m", C.craie, 22, "end") +
    t(240, 400, `aire de l'enclos${NB}?`, C.rose, 28));

const voile = svg("La voile du catamaran est un triangle de côtés 13, 14 et 15 décimètres",
  p("M100 330 L352 330 L190 114 Z", C.bleu, 4, 0.25) + ell(226, 352, 170, 12, C.craie, 0.2, 3) +
    t(226, 318, "14 dm", C.craie, 22) + t(130, 222, "13 dm", C.craie, 22, "end") + t(288, 222, "15 dm", C.craie, 22, "start") +
    t(240, 405, `aire de la voile${NB}?`, C.rose, 26));

const tours = svg("Les deux tours de guet A et B sont à 10 kilomètres l'une de l'autre ; le feu F est vu sous 45 degrés depuis B, et l'angle en F vaut 30 degrés",
  l(150, 340, 330, 340, C.craie, 4) + l(150, 340, 84.1, 94.2, C.pale, 3, "8 6") + l(330, 340, 84.1, 94.2, C.craie, 4) +
    r(140, 316, 20, 24, C.bleu, 0.6, 2) + r(320, 316, 20, 24, C.bleu, 0.6, 2) + o(84.1, 94.2, 10, C.jaune, 0.9, 2) +
    arc(330, 340, 50, 135, 180, C.rose) + t(258, 310, "45°", C.rose, 20) +
    arc(84.1, 94.2, 50, -75, -45, C.rose) + t(132, 172, "30°", C.rose, 20) +
    t(150, 374, "A", C.craie, 22) + t(330, 374, "B", C.craie, 22) + t(84, 76, "F", C.jaune, 22) +
    t(240, 374, "10 km", C.craie, 22) +
    t(330, 160, `AF =${NB}?`, C.rose, 28));

const rondPoint = svg("Le rond-point est un cercle : deux palmiers sont à 6 mètres l'un de l'autre, et le troisième les voit sous un angle de 30 degrés",
  o(240, 190, 130, C.pale, 0.08, 3) +
    l(240, 60, 175, 302.6, C.craie, 3) + l(240, 60, 305, 302.6, C.craie, 3) + l(175, 302.6, 305, 302.6, C.jaune, 4) +
    o(240, 60, 9, C.bleu, 1, 2) + o(175, 302.6, 9, C.bleu, 1, 2) + o(305, 302.6, 9, C.bleu, 1, 2) +
    arc(240, 60, 50, -105, -75, C.rose) + t(240, 140, "30°", C.rose, 20) +
    t(240, 292, "6 m", C.jaune, 22) +
    t(240, 390, `rayon du rond-point${NB}?`, C.rose, 26));

const equerre = svg("L'équerre du menuisier est un triangle de côtés 3, 4 et 5 décimètres",
  p("M120 320 L360 320 L120 140 Z", C.jaune, 4, 0.2) + p("M120 300 L140 300 L140 320", C.craie, 2) +
    t(240, 352, "4 dm", C.craie, 22) + t(106, 236, "3 dm", C.craie, 22, "end") + t(256, 214, "5 dm", C.craie, 22, "start") +
    t(240, 400, `Héron : aire${NB}?`, C.rose, 28));

const potager = svg("Deux murets de 4 mètres et 5 mètres forment un coin ; on ferme le triangle avec un grillage et on choisit l'angle θ entre les murets",
  l(120, 320, 420, 320, C.craie, 8) + l(120, 320, 202.1, 94.5, C.craie, 8) + l(202.1, 94.5, 420, 320, C.bleu, 3, "8 6") +
    arc(120, 320, 44, 0, 70, C.rose) + t(174, 290, "θ", C.rose, 22) +
    t(270, 352, "5 m", C.craie, 22) + t(146, 207, "4 m", C.craie, 22, "end") + t(326, 200, "grillage", C.bleu, 20, "start") +
    t(240, 400, `aire la plus grande${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "triangle_quelconque",
  titre: "Énigmes du triangle quelconque",
  description: "L'enclos des chèvres, la voile du catamaran, les tours de guet, les palmiers du rond-point, le piège de l'équerre, le défi du carré d'aromatiques : aire ½ ab sin C, formule de Héron, loi des sinus, rayon du cercle circonscrit.",
  problemes: [
    {
      tag: "Énigme 1 · L'enclos des chèvres",
      titre: "L'aire avec un sinus",
      question: `L'enclos des chèvres est un triangle. Deux de ses côtés mesurent 10 m et 8 m. Ils font entre eux un angle de 30°.<br><br><b>Quelle est l'aire</b> de l'enclos, en m² ?`,
      reponse: `Aire = ½ × a × b × sin C = ½ × 10 × 8 × sin 30°.<br>sin 30° = 0,5, donc aire = 40 × 0,5.<br><span class="big">Aire = 20 m²</span>.`,
      consigne: "Côtés 10 m et 8 m, angle de 30° entre eux. Quelle est l'aire, en m² ?",
      verification: { type: "courte", attendus: ["20"], unite: "m²" },
      dessin: enclos,
    },
    {
      tag: "Énigme 2 · La voile du catamaran",
      titre: "La formule de Héron",
      question: `La voile d'un catamaran est un triangle de côtés 13 dm, 14 dm et 15 dm.<br><br><b>Quelle est son aire</b> ? (Héron : aire = √(p(p − a)(p − b)(p − c)), où p est le demi-périmètre.)`,
      reponse: `p = (13 + 14 + 15) ÷ 2 = 21.<br>Aire = √(21 × 8 × 7 × 6) = √7 056.<br><span class="big">Aire = 84 dm²</span>.`,
      consigne: "Côtés 13, 14 et 15 dm. Quelle est l'aire de la voile ?",
      verification: { type: "qcm", choix: ["84 dm²", "168 dm²", "42 dm²"], bonne: 0 },
      dessin: voile,
    },
    {
      tag: "Énigme 3 · Les tours de guet",
      titre: "La loi des sinus",
      question: `Deux tours de guet A et B sont à 10 km l'une de l'autre. Un feu F apparaît. L'angle en B vaut 45° et l'angle en F vaut 30°.<br><br><b>À quelle distance</b> de la tour A est le feu ?`,
      reponse: `Loi des sinus : AF ÷ sin B = AB ÷ sin F.<br>AF = 10 × sin 45° ÷ sin 30° = 10 × (√2/2) ÷ (1/2) = 10√2.<br><span class="big">AF ≈ 14,1 km</span>.`,
      consigne: "AB = 10 km, angle en B 45°, angle en F 30°. Combien vaut AF ?",
      verification: { type: "qcm", choix: ["≈ 7,1 km", "≈ 14,1 km", "≈ 5 km"], bonne: 1 },
      dessin: tours,
    },
    {
      tag: "Énigme 4 · Le rond-point",
      titre: "Le cercle circonscrit",
      question: `Trois palmiers sont plantés sur le bord d'un rond-point circulaire. Deux d'entre eux sont à 6 m l'un de l'autre. Depuis le troisième, on les voit sous un angle de 30°.<br><br><b>Quel est le rayon</b> du rond-point, en m ?`,
      reponse: `Loi des sinus : a ÷ sin A = 2R.<br>2R = 6 ÷ sin 30° = 6 ÷ 0,5 = 12.<br><span class="big">R = 6 m</span>.`,
      consigne: "Côté de 6 m, angle opposé de 30°. Quel est le rayon du cercle, en m ?",
      verification: { type: "courte", attendus: ["6"], unite: "m" },
      dessin: rondPoint,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'équerre du menuisier",
      sorte: "piege",
      question: `L'équerre d'un menuisier a des côtés de 3 dm, 4 dm et 5 dm.<br>Théo applique Héron avec p = 3 + 4 + 5 = 12 et trouve √(12 × 9 × 8 × 7).<br><br><b>Quelle est la vraie aire</b> ?`,
      reponse: `Dans Héron, p est le <b>demi</b>-périmètre : p = 12 ÷ 2 = 6.<br>Aire = √(6 × 3 × 2 × 1) = √36 = 6. Vérification : l'équerre est rectangle, ½ × 3 × 4 = 6.<br><span class="big">6 dm²</span>.`,
      consigne: "Côtés 3, 4 et 5 dm. Quelle est l'aire avec Héron ?",
      verification: { type: "qcm", choix: ["≈ 77,8 dm²", "12 dm²", "6 dm²"], bonne: 2 },
      dessin: equerre,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le carré d'aromatiques",
      sorte: "defi",
      question: `Pour planter des herbes aromatiques, on place deux murets de 4 m et 5 m qui se touchent en un coin. On ferme le triangle avec un grillage. On peut choisir l'angle θ entre les murets.<br><br><b>Quelle est la plus grande aire</b> possible, en m² ?`,
      reponse: `Aire = ½ × 4 × 5 × sin θ = 10 sin θ.<br>Un sinus vaut au plus 1, atteint pour θ = 90°.<br><span class="big">10 m²</span>, avec des murets à angle droit.`,
      consigne: "Murets de 4 m et 5 m, angle θ au choix. Quelle est la plus grande aire, en m² ?",
      verification: { type: "courte", attendus: ["10"], unite: "m²" },
      dessin: potager,
    },
  ],
};

export default problemes;
