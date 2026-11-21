// Énigmes à projeter — 3e, notion aire_perimetre (périmètres : la piste
// d'athlétisme, la roue du vélo, l'enclos du poulailler, la part de pizza,
// piège des demi-cercles, défi de la corde autour de la Terre). 21/11/2026.
// ⛔ Ne reprend pas la 4e (affiche, échecs, panneau, château, photocopieuse, temple).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p } from "../dessins-ecole";
import { frac } from "../outils";

// La piste : deux droites de 100 m, deux demi-cercles de rayon 32 m ; 1 m = 1,7 px.
const piste = svg(
  "Une piste d'athlétisme : deux lignes droites de 100 m et deux demi-cercles de 32 m de rayon",
  p("M155 145 L325 145 A54.4 54.4 0 0 1 325 253.8 L155 253.8 A54.4 54.4 0 0 1 155 145 Z", C.rose, 8, 0.12) + p("M155 145 L155 253.8 M325 145 L325 253.8", C.pale, 2) +
    t(240, 130, "100 m", C.craie, 22) + l(325, 199.4, 379.4, 199.4, C.bleu, 3) + t(352, 190, "32 m", C.bleu, 18) + t(240, 330, `un tour${NB}: ? m`, C.rose, 28) + t(240, 395, "au bon rapport", C.pale, 16)
);

// La roue : diamètre 70 cm.
const roue = svg(
  "Une roue de vélo de 70 cm de diamètre",
  o(240, 190, 130, C.craie, 0, 10) + o(240, 190, 14, C.craie, 0.5, 3) +
    [...Array(12)].map((_, k) => l(240, 190, Math.round(240 + 124 * Math.cos((k * Math.PI) / 6)), Math.round(190 + 124 * Math.sin((k * Math.PI) / 6)), C.pale, 1.5)).join("") +
    l(110, 190, 370, 190, C.rose, 4) + t(240, 178, "70 cm", C.rose, 24) + t(240, 375, `1 km${NB}: combien de tours${NB}?`, C.craie, 24)
);

// L'enclos : 30 m × 20 m (600 m²), 1 m = 10 px.
const enclos = svg(
  "Un enclos rectangulaire de 600 mètres carrés dont la longueur mesure 30 m",
  r(90, 90, 300, 200, C.jaune, 0.15, 4).replace("/>", ' stroke-dasharray="4 10"/>') + t(240, 200, "600 m²", C.craie, 34) + t(240, 75, "30 m", C.craie, 24) + t(80, 196, "?", C.rose, 30, "end") +
    t(240, 340, "🐔 🐔 🐔", C.craie, 30) + t(240, 395, `grillage${NB}: ? m`, C.rose, 26)
);

// La part de pizza : rayon 15 cm, angle 60° ; 1 cm = 16 px.
const part = () => {
  const O = [130, 330], R = 240, a = (60 * Math.PI) / 180;
  const B = [O[0] + R, O[1]], A = [Math.round(O[0] + R * Math.cos(a)), Math.round(O[1] - R * Math.sin(a))];
  return svg("Une part de pizza : un secteur de disque de rayon 15 cm et d'angle 60°",
    p(`M${O[0]} ${O[1]} L${B[0]} ${B[1]} A${R} ${R} 0 0 0 ${A[0]} ${A[1]} Z`, C.jaune, 5, 0.3) + p(`M${B[0]} ${B[1]} A${R} ${R} 0 0 0 ${A[0]} ${A[1]}`, C.rose, 8) +
      `<circle cx="230" cy="290" r="12" fill="${C.rose}" fill-opacity=".5"/><circle cx="270" cy="230" r="12" fill="${C.rose}" fill-opacity=".5"/><circle cx="210" cy="220" r="10" fill="${C.bleu}" fill-opacity=".4"/>` +
      t(250, 360, "15 cm", C.craie, 22) + t(175, 312, "60°", C.craie, 20) + t(390, 120, `tour${NB}?`, C.rose, 28));
};

// Les demi-cercles : un de diamètre 12, deux de diamètre 6 ; 1 cm = 30 px.
const piege = svg(
  "Deux chemins de A à B : un grand demi-cercle de 12 cm de diamètre, ou deux petits demi-cercles de 6 cm",
  p("M60 260 A180 180 0 0 1 420 260", C.bleu, 5) + p("M60 260 A90 90 0 0 0 240 260 A90 90 0 0 0 420 260", C.jaune, 5) + l(60, 260, 420, 260, C.pale, 2, "6 6") +
    `<circle cx="60" cy="260" r="7" fill="${C.craie}"/><circle cx="420" cy="260" r="7" fill="${C.craie}"/>` + t(45, 290, "A", C.craie, 24) + t(435, 290, "B", C.craie, 24) +
    t(240, 290, "12 cm", C.pale, 20) + t(240, 395, `le plus court${NB}?`, C.rose, 26)
);

// La Terre et la corde : pas à l'échelle.
const corde = svg(
  "La Terre entourée d'une corde, puis la même corde rallongée de 1 m, qui flotte au-dessus du sol",
  o(240, 220, 150, C.bleu, 0.15, 4) + o(240, 220, 170, C.rose, 0, 3).replace("/>", ' stroke-dasharray="10 6"/>') + l(240, 70, 240, 50, C.craie, 3) +
    t(262, 70, `h${NB}?`, C.rose, 22, "start") + t(240, 230, "40 000 km", C.craie, 24) + t(240, 405, "+ 1 m de corde · pas à l'échelle", C.pale, 16)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "aire_perimetre",
  titre: "Énigmes des périmètres",
  description: "Le tour de la piste d'athlétisme, les tours de roue du vélo, le grillage du poulailler, le bord de la part de pizza, le piège des demi-cercles, le défi de la corde autour de la Terre : périmètre du cercle, d'un arc, de figures composées.",
  problemes: [
    {
      tag: "Énigme 1 · La piste",
      titre: "Un tour de stade",
      question: `Une piste d'athlétisme a deux lignes droites de <b>100 m</b> et deux virages en demi-cercle de <b>32 m</b> de rayon.<br><br><b>Combien mesure</b> un tour, arrondi au mètre ?`,
      reponse: `Les deux demi-cercles font un cercle entier : 2 × π × 32 ≈ 201 m.<br>Un tour : 100 + 100 + 201 ≈ <span class="big">401 m</span>. Les vraies pistes sont réglées pour faire 400 m dans le couloir 1.`,
      consigne: "Combien mesure un tour de piste, arrondi au mètre ?",
      verification: {"type":"courte","attendus":["401"],"unite":"m"},
      dessin: piste,
    },
    {
      tag: "Énigme 2 · Le vélo",
      titre: "Les tours de roue",
      question: `Une roue de vélo a un diamètre de <b>70 cm</b>.<br><br>Combien de <b>tours</b> fait-elle sur <b>1 km</b> ? (Arrondis à l'unité.)`,
      reponse: `Un tour de roue : π × 70 ≈ 219,9 cm, soit environ 2,199 m.<br>1 000 ÷ 2,199 ≈ <span class="big">455 tours</span>.`,
      consigne: "Combien de tours la roue fait-elle sur 1 km, arrondi à l'unité ?",
      verification: {"type":"courte","attendus":["455"],"unite":"tours"},
      dessin: roue,
    },
    {
      tag: "Énigme 3 · Le poulailler",
      titre: "Le grillage",
      question: `Un enclos rectangulaire pour des poules a une aire de <b>600 m²</b>. Sa longueur mesure <b>30 m</b>.<br><br>Quelle longueur de <b>grillage</b> faut-il pour en faire le tour ?`,
      reponse: `Largeur : 600 ÷ 30 = 20 m.<br>Périmètre : 2 × (30 + 20) = <span class="big">100 m</span> de grillage.`,
      consigne: "Quelle longueur de grillage faut-il ?",
      verification: {"type":"courte","attendus":["100"],"unite":"m"},
      dessin: enclos,
    },
    {
      tag: "Énigme 4 · La pizza",
      titre: "Le tour de la part",
      question: `Une pizza a un rayon de <b>15 cm</b>. On coupe une part de <b>60°</b>.<br><br>Quel est le <b>périmètre</b> de la part, au dixième de cm ?`,
      reponse: `60° = ${frac(1, 6)} de tour. L'arc de croûte : 2 × π × 15 ÷ 6 = 5π ≈ 15,7 cm.<br>On ajoute les deux côtés droits : 15 + 15 + 15,7 = <span class="big">45,7 cm</span>.`,
      consigne: "Quel est le périmètre de la part, au dixième ?",
      verification: {"type":"courte","attendus":["45,7","45.7"],"unite":"cm"},
      dessin: part(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Grand ou petits ?",
      sorte: "piege",
      question: `Pour aller de A à B, une fourmi peut suivre un <b>grand demi-cercle</b> de 12 cm de diamètre, ou <b>deux petits demi-cercles</b> de 6 cm de diamètre.<br><br><b>Quel chemin</b> est le plus court ?`,
      reponse: `Grand : π × 12 ÷ 2 = 6π cm. Petits : 2 × (π × 6 ÷ 2) = 6π cm.<br><span class="big">Les deux chemins ont la même longueur</span> ! Le grand a l'air plus long, mais non.`,
      consigne: "Quel chemin est le plus court ?",
      verification: {"type":"qcm","choix":["Le grand demi-cercle","Les deux petits demi-cercles","Les deux ont la même longueur"],"bonne":2},
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La corde autour de la Terre",
      sorte: "defi",
      question: `On entoure la Terre (40 000 km de tour) d'une corde bien serrée. Puis on rallonge la corde de <b>1 m</b> et on la soulève partout de la même hauteur.<br><br>De combien de <b>centimètres</b> flotte-t-elle au-dessus du sol ?`,
      reponse: `Périmètre = 2πr. Si le périmètre augmente de 1 m, le rayon augmente de 1 ÷ (2π) ≈ 0,16 m.<br>La corde flotte à <span class="big">16 cm</span> : un chat passe dessous ! Et c'est pareil autour d'un ballon de foot.`,
      consigne: "De combien de centimètres la corde flotte-t-elle ?",
      verification: {"type":"courte","attendus":["16"],"unite":"cm"},
      dessin: corde,
    },
  ],
};

export default problemes;
