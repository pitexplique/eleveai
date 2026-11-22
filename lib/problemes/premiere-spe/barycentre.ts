// Énigmes à projeter — première spé maths, notion barycentre
// (la bascule, le guéridon triangulaire, le jeu de piste, le radeau,
// piège du mobile du bébé, défi du bureau d'angle en L). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p } from "../dessins-ecole";

/** Une étoile à cinq branches de centre (cx, cy). */
const etoile = (cx: number, cy: number, k: number, c: string) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (-90 + i * 36) * (Math.PI / 180), d = i % 2 ? k * 0.45 : k;
    return `${+(cx + d * Math.cos(a)).toFixed(1)} ${+(cy + d * Math.sin(a)).toFixed(1)}`;
  });
  return p(`M${pts.join(" L")} Z`, c, 3, 0.6);
};

const bascule = svg("La bascule : une planche AB de 5 m, un enfant de 30 kg en A, un enfant de 20 kg en B",
  r(55, 195, 60, 55, C.bleu, 0.35) + t(85, 180, "30 kg", C.bleu, 22) +
    r(370, 205, 50, 45, C.jaune, 0.35) + t(395, 190, "20 kg", C.jaune, 22) +
    l(40, 254, 440, 254, C.craie, 8) +
    t(60, 290, "A", C.craie, 24) + t(420, 290, "B", C.craie, 24) + t(240, 290, "5 m", C.craie, 22) +
    t(240, 370, `point d'appui G : AG =${NB}?`, C.rose, 26));

const gueridon = svg("Le plateau triangulaire du guéridon : A(0 ; 0), B(6 ; 0), C(3 ; 6)",
  p("M90 350 L390 350 L240 50 Z", C.jaune, 4, 0.2) +
    t(90, 384, "A(0 ; 0)", C.craie, 22) + t(390, 384, "B(6 ; 0)", C.craie, 22) + t(262, 56, "C(3 ; 6)", C.craie, 22, "start") +
    t(240, 290, `G =${NB}?`, C.rose, 28));

const jeuDePiste = svg("Le jeu de piste : le trésor est au barycentre de A(−4 ; 6) avec le poids 3 et de B(8 ; 2) avec le poids 1",
  l(80, 150, 400, 280, C.pale, 3, "10 8") +
    l(80, 150, 80, 90, C.craie, 4) + p("M80 90 L120 104 L80 118 Z", C.bleu, 3, 0.7) + o(80, 150, 7, C.craie, 1, 2) +
    l(400, 280, 400, 220, C.craie, 4) + p("M400 220 L440 234 L400 248 Z", C.jaune, 3, 0.7) + o(400, 280, 7, C.craie, 1, 2) +
    t(132, 112, "A(−4 ; 6) · poids 3", C.bleu, 22, "start") + t(420, 320, "B(8 ; 2) · poids 1", C.jaune, 22, "end") +
    t(240, 400, `le trésor G =${NB}?`, C.rose, 28));

const radeau = svg("Le radeau carré ABCD de 4 m de côté : 30 kg en A et en B, 90 kg en C et en D",
  r(120, 90, 240, 240, C.jaune, 0.2, 4) +
    o(120, 330, 14, C.bleu, 0.6, 3) + o(360, 330, 14, C.bleu, 0.6, 3) + o(120, 90, 20, C.rose, 0.6, 3) + o(360, 90, 20, C.rose, 0.6, 3) +
    t(100, 372, "A(0 ; 0) · 30 kg", C.bleu, 20, "start") + t(380, 372, "B(4 ; 0) · 30 kg", C.bleu, 20, "end") +
    t(100, 50, "D(0 ; 4) · 90 kg", C.rose, 20, "start") + t(380, 50, "C(4 ; 4) · 90 kg", C.rose, 20, "end") +
    t(240, 218, `G =${NB}?`, C.craie, 28));

const mobile = svg("Le mobile du bébé : une baguette AB de 50 cm, une étoile de 10 g en A, une lune de 40 g en B",
  l(60, 160, 420, 160, C.craie, 6) +
    l(60, 160, 60, 240, C.pale, 2) + etoile(60, 272, 32, C.jaune) +
    l(420, 160, 420, 230, C.pale, 2) + o(420, 272, 40, C.bleu, 0.5, 3) +
    t(60, 140, "A", C.craie, 24) + t(420, 140, "B", C.craie, 24) + t(240, 140, "50 cm", C.craie, 22) +
    t(60, 340, "10 g", C.jaune, 22) + t(420, 340, "40 g", C.bleu, 22) +
    t(240, 400, `on l'accroche à${NB}?${NB}de A`, C.rose, 26));

const bureau = svg("Le plateau du bureau d'angle en L, en décimètres : un rectangle 12 × 6 et, au-dessus à gauche, un rectangle 6 × 12",
  p("M120 380 L336 380 L336 272 L228 272 L228 56 L120 56 Z", C.jaune, 4, 0.2) +
    l(120, 272, 228, 272, C.pale, 2, "8 6") +
    t(228, 410, "12 dm", C.craie, 20) + t(346, 332, "6 dm", C.craie, 20, "start") +
    t(174, 44, "6 dm", C.craie, 20) + t(108, 222, "18 dm", C.craie, 20, "end") +
    t(104, 404, "O", C.craie, 20) +
    t(360, 150, `G =${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "barycentre",
  titre: "Énigmes de barycentre",
  description: "La bascule, le guéridon triangulaire, le jeu de piste, le radeau, le piège du mobile du bébé, le défi du bureau d'angle en L : barycentre de deux points, position sur le segment, coordonnées, centre d'inertie d'une plaque.",
  problemes: [
    {
      tag: "Énigme 1 · La bascule",
      titre: "Le point d'équilibre",
      question: `Sur une bascule de 5 m, Noé (30 kg) est en A et sa sœur (20 kg) est en B.<br>La bascule est en équilibre si le point d'appui G est le barycentre de (A ; 30) et (B ; 20).<br><br><b>À quelle distance de A</b> faut-il mettre G ?`,
      reponse: `AG = 20 ÷ (30 + 20) × AB = 20/50 × 5.<br><span class="big">AG = 2 m</span> : G est plus près de l'enfant le plus lourd.`,
      consigne: "Planche de 5 m, 30 kg en A, 20 kg en B. À quelle distance de A est le point d'appui ?",
      verification: { type: "qcm", choix: ["2 m", "3 m", "2,5 m"], bonne: 0 },
      dessin: bascule,
    },
    {
      tag: "Énigme 2 · Le guéridon",
      titre: "Le centre d'un triangle",
      question: `Le plateau d'un guéridon est un triangle A(0 ; 0), B(6 ; 0), C(3 ; 6). Le pied se place au centre de gravité G, l'isobarycentre de A, B et C.<br><br><b>Quelles sont les coordonnées de G</b> ?`,
      reponse: `On fait la moyenne des coordonnées.<br>x = (0 + 6 + 3) ÷ 3 = 3 et y = (0 + 0 + 6) ÷ 3 = 2.<br><span class="big">G(3 ; 2)</span>.`,
      consigne: "A(0 ; 0), B(6 ; 0), C(3 ; 6). Quelles sont les coordonnées de G ?",
      verification: { type: "courte", attendus: ["(3;2)", "3;2", "(3,2)"] },
      dessin: gueridon,
    },
    {
      tag: "Énigme 3 · Le jeu de piste",
      titre: "Des poids différents",
      question: `Dans un jeu de piste, le trésor est au barycentre G de (A ; 3) et (B ; 1), avec A(−4 ; 6) et B(8 ; 2).<br><br><b>Où est le trésor</b> ?`,
      reponse: `On divise par la somme des poids, 3 + 1 = 4.<br>x = (3 × (−4) + 1 × 8) ÷ 4 = −4 ÷ 4 = −1.<br>y = (3 × 6 + 1 × 2) ÷ 4 = 20 ÷ 4 = 5.<br><span class="big">G(−1 ; 5)</span>.`,
      consigne: "(A ; 3) et (B ; 1), avec A(−4 ; 6) et B(8 ; 2). Où est G ?",
      verification: { type: "qcm", choix: ["(5 ; 3)", "(−1 ; 5)", "(2 ; 4)"], bonne: 1 },
      dessin: jeuDePiste,
    },
    {
      tag: "Énigme 4 · Le radeau",
      titre: "Quatre points",
      question: `Un radeau carré a pour sommets A(0 ; 0), B(4 ; 0), C(4 ; 4), D(0 ; 4), en mètres. Deux enfants de 30 kg sont en A et en B, deux adultes de 90 kg en C et en D.<br><br><b>Où est le centre de gravité G</b> des quatre passagers ?`,
      reponse: `Poids 30, 30, 90, 90 : total 240.<br>x = (30 × 0 + 30 × 4 + 90 × 4 + 90 × 0) ÷ 240 = 480 ÷ 240 = 2.<br>y = (90 × 4 + 90 × 4) ÷ 240 = 720 ÷ 240 = 3.<br><span class="big">G(2 ; 3)</span> : le radeau penche du côté des adultes.`,
      consigne: "30 kg en A(0 ; 0) et B(4 ; 0), 90 kg en C(4 ; 4) et D(0 ; 4). Où est G ?",
      verification: { type: "courte", attendus: ["(2;3)", "2;3", "(2,3)"] },
      dessin: radeau,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le mobile du bébé",
      sorte: "piege",
      question: `Un mobile de bébé : une baguette AB de 50 cm, une étoile de 10 g en A et une lune de 40 g en B.<br>Léo : « On l'accroche près de l'étoile, à 10 cm de A. »<br><br><b>À quelle distance de A</b> faut-il l'accrocher ?`,
      reponse: `Le point d'accroche est le barycentre de (A ; 10) et (B ; 40).<br>AG = 40 ÷ 50 × 50 = <span class="big">40 cm</span>.<br>G est près de la lune, l'objet le plus lourd. Léo a mesuré à partir de B.`,
      consigne: "Baguette de 50 cm, 10 g en A, 40 g en B. À quelle distance de A accrocher le mobile ?",
      verification: { type: "qcm", choix: ["10 cm", "25 cm", "40 cm"], bonne: 2 },
      dessin: mobile,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le bureau d'angle",
      sorte: "defi",
      question: `Le plateau d'un bureau d'angle a la forme d'un L, en décimètres : le rectangle de 0 à 12 en x et de 0 à 6 en y, plus le rectangle de 0 à 6 en x et de 6 à 18 en y.<br><br><b>Où est son centre d'inertie G</b> ?`,
      reponse: `Chaque rectangle a son centre : (6 ; 3) et (3 ; 12).<br>Ils ont la même aire, 72 dm², donc le même poids.<br>G est leur milieu : <span class="big">G(4,5 ; 7,5)</span>.`,
      consigne: "Rectangles 0 à 12 × 0 à 6 et 0 à 6 × 6 à 18. Où est le centre d'inertie ?",
      verification: { type: "courte", attendus: ["(4,5;7,5)", "4,5;7,5", "(4.5;7.5)", "(4.5,7.5)", "4.5;7.5"] },
      dessin: bureau,
    },
  ],
};

export default problemes;
