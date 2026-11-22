// Énigmes à projeter — première spé maths, notion tangente_reel
// (le toit de l'abri de jardin, l'élagueur, le deltaplane, le gyrophare,
// piège du hauban du pont, défi du projecteur du stade). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, o, p, ell } from "../dessins-ecole";

/** Un arc de cercle de a0 à a1 (degrés, sens trigonométrique, 0° = vers la droite). */
const arc = (cx: number, cy: number, k: number, a0: number, a1: number, c: string = C.rose, ep = 3) => {
  const pt = (a: number) => `${+(cx + k * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${+(cy - k * Math.sin((a * Math.PI) / 180)).toFixed(1)}`;
  return p(`M${pt(a0)} A${k} ${k} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${pt(a1)}`, c, ep);
};

const toit = svg("Le toit de l'abri de jardin monte avec un angle de π/6 ; pour 1 m à l'horizontale, de combien monte-t-il ?",
  p("M60 330 L420 122 L420 330 Z", C.craie, 0, 0.08) +
    l(60, 330, 420, 330, C.craie, 3, "8 8") + l(420, 330, 420, 122, C.craie, 3, "8 8") +
    l(50, 336, 430, 116, C.jaune, 8) +
    arc(60, 330, 80, 0, 30, C.rose) + t(178, 320, "π/6", C.rose, 20) +
    t(240, 362, "1 m", C.craie, 24) + t(436, 236, "h ?", C.rose, 26, "start") +
    t(170, 110, "le toit", C.jaune, 24));

const elagueur = svg("L'élagueur, à 10 m du pied de l'arbre, voit la cime sous un angle de π/3",
  l(30, 360, 450, 360, C.craie, 4) +
    l(330, 360, 330, 150, C.jaune, 10) + ell(330, 108, 70, 60, C.craie, 0.15, 4) + o(330, 48, 6, C.rose, 1, 2) +
    o(150, 330, 12, C.bleu, 0.6, 3) + l(150, 342, 150, 360, C.bleu, 5) +
    l(150, 360, 330, 48, C.rose, 3, "10 8") +
    arc(150, 360, 60, 0, 60, C.rose) + t(226, 326, "π/3", C.rose, 20) +
    t(240, 394, "10 m", C.craie, 24) + t(412, 270, "h ?", C.rose, 26, "start"));

const deltaplane = svg("Le deltaplane descend : 3 m vers le bas pour 4 m vers l'avant ; l'angle de descente x vérifie tan x = 3/4",
  p("M30 72 L92 72 L60 50 Z", C.bleu, 3, 0.5) +
    l(60, 80, 420, 80, C.craie, 3, "8 8") + l(420, 80, 420, 350, C.craie, 3, "8 8") +
    l(60, 80, 420, 350, C.jaune, 5) +
    arc(60, 80, 70, 0, -36.87, C.rose) + t(154, 116, "x", C.rose, 24) +
    t(240, 66, "4", C.craie, 24) + t(436, 224, "3", C.craie, 24, "start") +
    t(170, 330, `cos x =${NB}?`, C.rose, 28));

const gyrophare = svg("Le gyrophare tourne à 10 m d'un mur ; la tache de lumière est à la hauteur y = 10 tan θ",
  l(390, 30, 390, 380, C.craie, 8) +
    o(170, 340, 12, C.bleu, 0.8, 3) +
    l(170, 340, 390, 340, C.craie, 3, "8 8") + l(170, 340, 390, 120, C.jaune, 5) + o(390, 120, 9, C.jaune, 1, 2) +
    arc(170, 340, 60, 0, 45, C.rose) + t(252, 316, "θ", C.rose, 24) +
    t(280, 374, "10 m", C.craie, 22) + t(410, 238, "y", C.jaune, 26, "start") +
    t(40, 80, "y = 10 tan θ", C.craie, 26, "start") +
    t(40, 130, `vitesse en π/4${NB}?`, C.rose, 26, "start"));

const hauban = svg("Le hauban du pont part du point A et fait un angle orienté de 3π/4 avec la direction de la route",
  l(30, 300, 460, 300, C.craie, 8) + l(140, 300, 140, 70, C.craie, 10) +
    l(140, 90, 350, 300, C.jaune, 4) + l(140, 120, 280, 300, C.pale, 3) + l(140, 90, 40, 300, C.pale, 3) + l(140, 120, 80, 300, C.pale, 3) +
    o(350, 300, 7, C.craie, 1, 2) + t(350, 334, "A", C.craie, 22) +
    l(350, 300, 445, 300, C.bleu, 5) + p("M445 300 L430 292 L430 308 Z", C.bleu, 2, 1) +
    arc(350, 300, 50, 0, 135, C.rose) + t(392, 236, "3π/4", C.rose, 20) +
    t(240, 385, `pente = tan(3π/4) =${NB}?`, C.rose, 26));

const projecteur = svg("Le projecteur, en haut d'un mât de 30 m, éclaire le terrain de 30 m à 30√3 m du pied du mât ; de quel angle α pivote-t-il ?",
  l(30, 340, 460, 340, C.craie, 4) + l(80, 340, 80, 130, C.craie, 8) + o(80, 124, 10, C.jaune, 1, 2) +
    l(80, 130, 290, 340, C.jaune, 3) + l(80, 130, 444, 340, C.jaune, 3) +
    arc(80, 130, 90, -45, -30, C.rose) + t(178, 168, "α ?", C.rose, 20, "start") +
    t(64, 240, "30 m", C.craie, 20, "end") +
    l(80, 362, 290, 362, C.pale, 2) + t(185, 384, "30 m", C.craie, 20) +
    l(80, 404, 444, 404, C.pale, 2) + t(368, 390, "30√3 m", C.craie, 20));

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "tangente_reel",
  titre: "Énigmes de tangente",
  description: "Le toit de l'abri de jardin, l'élagueur, le deltaplane, le gyrophare, le piège du hauban du pont, le défi du projecteur du stade : valeurs remarquables de tan, signe, 1 + tan² x = 1 ÷ cos² x, dérivée de tan.",
  problemes: [
    {
      tag: "Énigme 1 · L'abri de jardin",
      titre: "Une valeur remarquable",
      question: `Le toit d'un abri de jardin fait un angle de π/6 avec l'horizontale.<br>La pente du toit vaut tan(π/6).<br><br><b>De combien le toit monte-t-il</b> pour 1 m à l'horizontale ?`,
      reponse: `tan(π/6) = sin(π/6) ÷ cos(π/6) = (1/2) ÷ (√3/2) = 1/√3.<br>En multipliant en haut et en bas par √3 : <span class="big">√3/3 m</span>, soit environ 0,58 m.`,
      consigne: "Le toit monte de tan(π/6) mètre pour 1 m. Combien vaut tan(π/6) ?",
      verification: { type: "qcm", choix: ["√3/3", "√3", "1/2"], bonne: 0 },
      dessin: toit,
    },
    {
      tag: "Énigme 2 · L'élagueur",
      titre: "Mesurer un arbre",
      question: `Un élagueur se place à 10 m du pied d'un arbre. Il voit la cime sous un angle de π/3 avec le sol.<br><br><b>Quelle est la hauteur h de l'arbre</b> ?`,
      reponse: `Dans le triangle rectangle : tan(π/3) = h ÷ 10, donc h = 10 × tan(π/3).<br>tan(π/3) = √3 : <span class="big">h = 10√3 m</span>, soit environ 17,3 m.`,
      consigne: "À 10 m, la cime est vue sous π/3. Quelle est la hauteur de l'arbre ?",
      verification: { type: "courte", attendus: ["10√3", "10√3 m", "17,3", "17,3 m", "17,32", "17.3"] },
      dessin: elagueur,
    },
    {
      tag: "Énigme 3 · Le deltaplane",
      titre: "De tan à cos",
      question: `Un deltaplane descend de 3 m pour 4 m vers l'avant. Son angle de descente x est entre 0 et π/2, avec tan x = 3/4.<br><br><b>Combien vaut cos x</b> ? (On utilise 1 + tan² x = 1 ÷ cos² x.)`,
      reponse: `1 + tan² x = 1 + 9/16 = 25/16, donc cos² x = 16/25.<br>x est entre 0 et π/2, donc cos x est positif : <span class="big">cos x = 4/5</span>.`,
      consigne: "tan x = 3/4 et x entre 0 et π/2. Combien vaut cos x ?",
      verification: { type: "qcm", choix: ["3/5", "4/5", "16/25"], bonne: 1 },
      dessin: deltaplane,
    },
    {
      tag: "Énigme 4 · Le gyrophare",
      titre: "La dérivée de tan",
      question: `Un gyrophare tourne à 10 m d'un mur. Quand il a tourné de l'angle θ, la tache de lumière est à la hauteur y = 10 tan θ.<br><br><b>Combien vaut la dérivée de y</b> en θ = π/4 ? (On sait que tan' = 1 + tan².)`,
      reponse: `y' = 10 × (1 + tan² θ).<br>En π/4, tan(π/4) = 1 : y' = 10 × (1 + 1) = <span class="big">20</span>.<br>La tache monte de 20 m par radian à ce moment-là.`,
      consigne: "y = 10 tan θ. Combien vaut y' en θ = π/4 ?",
      verification: { type: "courte", attendus: ["20", "20 m"] },
      dessin: gyrophare,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le hauban du pont",
      sorte: "piege",
      question: `Un hauban de pont fait un angle orienté de 3π/4 avec la direction de la route.<br>Inès : « tan(3π/4) = tan(π/4) = 1. »<br><br><b>Combien vaut tan(3π/4)</b> ?`,
      reponse: `sin(3π/4) = √2/2, mais cos(3π/4) = −√2/2 : le cosinus est négatif.<br>tan(3π/4) = (√2/2) ÷ (−√2/2) = <span class="big">−1</span>.<br>Le hauban descend vers la droite : sa pente est négative.`,
      consigne: "Combien vaut tan(3π/4) ?",
      verification: { type: "qcm", choix: ["1", "√2/2", "−1"], bonne: 2 },
      dessin: hauban,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le projecteur du stade",
      sorte: "defi",
      question: `Un projecteur est en haut d'un mât de 30 m. Il éclaire le terrain d'un point à 30 m du pied du mât jusqu'à un point à 30√3 m.<br><br><b>De quel angle α le faisceau pivote-t-il</b> entre les deux points ?`,
      reponse: `Angle avec le mât pour le point proche : tan = 30 ÷ 30 = 1, donc π/4.<br>Pour le point loin : tan = 30√3 ÷ 30 = √3, donc π/3.<br>α = π/3 − π/4 = 4π/12 − 3π/12 = <span class="big">π/12</span>.`,
      consigne: "Mât de 30 m, points à 30 m et 30√3 m. De quel angle le faisceau pivote-t-il ?",
      verification: { type: "courte", attendus: ["π/12", "pi/12"] },
      dessin: projecteur,
    },
  ],
};

export default problemes;
