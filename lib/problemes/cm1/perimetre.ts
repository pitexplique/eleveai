// Énigmes à projeter — CM1, notion périmètres (le cadre photo, le jardin
// triangulaire de Mamie, le carreau de faïence, le panneau stop, le piège des
// mètres et des centimètres, le défi de la figure en escalier). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, p, grille } from "../dessins-ecole";

// Le cadre : 20 cm × 15 cm, 1 cm = 14 px.
const cadre = svg(
  "Un cadre photo rectangulaire de 20 cm sur 15 cm",
  r(100, 80, 280, 210, C.jaune, 0.15, 8, 4) + r(130, 110, 220, 150, C.bleu, 0.1, 2) + t(240, 200, "🖼️", C.craie, 50) +
    t(240, 60, "20 cm", C.craie, 26) + t(80, 190, "15 cm", C.craie, 24, "end") + t(240, 360, `le tour du cadre${NB}?`, C.rose, 28)
);

// Le jardin : triangle 30, 40, 50 m (rectangle), 1 m = 6 px.
const jardin = svg(
  "Un jardin en triangle : côtés 30 m, 40 m et 50 m",
  p("M120 300 L360 300 L120 120 Z", C.bleu, 4, 0.15) + t(240, 335, "40 m", C.craie, 24) + t(105, 215, "30 m", C.craie, 24, "end") + t(260, 195, "50 m", C.craie, 24) +
    t(170, 270, "🌻", C.craie, 30) + t(240, 395, `le tour du jardin${NB}?`, C.rose, 26)
);

const carreau = svg(
  "Un carreau carré de 9 cm de côté",
  r(140, 70, 200, 200, C.bleu, 0.2, 4, 2) + p("M140 170 L240 70 L340 170 L240 270 Z", C.bleu, 2) + t(240, 300, "9 cm", C.craie, 26) +
    t(240, 370, `le périmètre${NB}?`, C.rose, 28)
);

// L'octogone régulier du panneau stop.
const oct = Array.from({ length: 8 }, (_, k) => {
  const a = (Math.PI / 8) * (2 * k + 1);
  return `${(240 + 120 * Math.cos(a)).toFixed(1)} ${(180 + 120 * Math.sin(a)).toFixed(1)}`;
});
const stop = svg(
  "Un panneau stop : un octogone de 25 cm de côté",
  p(`M${oct.join(" L")} Z`, C.rose, 5, 0.3) + t(240, 196, "STOP", C.craie, 44) + t(240, 345, "chaque côté : 25 cm", C.craie, 24) + t(240, 395, `le tour${NB}?`, C.rose, 26)
);

const nappe = svg(
  "Une nappe rectangulaire : 2 m de long, 50 cm de large",
  r(40, 140, 340, 85, C.jaune, 0.2, 4, 4) + t(210, 120, "2 m", C.craie, 28) + t(390, 190, "50 cm", C.craie, 22, "start") +
    t(240, 320, `le tour de la nappe${NB}?`, C.rose, 28)
);

// L'escalier sur un quadrillage de 1 cm (40 px) : boîte 6 × 4.
const pas = 40, x0 = 120, y0 = 80;
const pt = (a: number, b: number) => `${x0 + a * pas} ${y0 + b * pas}`;
const escalier = svg(
  "Une figure en escalier sur un quadrillage de 1 cm",
  grille(x0, y0, 6, 4, pas) + p(`M${pt(0, 0)} L${pt(2, 0)} L${pt(2, 1)} L${pt(4, 1)} L${pt(4, 2)} L${pt(6, 2)} L${pt(6, 4)} L${pt(0, 4)} Z`, C.rose, 5, 0.25) +
    t(240, 290, "1 carreau = 1 cm", C.pale, 22) + t(240, 360, `le périmètre${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "perimetre",
  titre: "Énigmes sur les périmètres",
  description: "Le cadre photo, le jardin triangulaire de Mamie, le carreau de faïence, le panneau stop, le piège des mètres et des centimètres, le défi de la figure en escalier.",
  problemes: [
    {
      tag: "Énigme 1 · Le cadre photo",
      titre: "Le tour du cadre",
      question: `Le cadre est un rectangle.<br>Il mesure <b>20 cm</b> de long et <b>15 cm</b> de large.<br><br>Quel est son <b>périmètre</b> ?`,
      reponse: `On fait le tour : 20 + 15 + 20 + 15.<br>= <span class="big">70 cm</span>.`,
      consigne: "Quel est le périmètre du cadre ?",
      verification: { type: "courte", attendus: ["70"], unite: "cm" },
      dessin: cadre,
    },
    {
      tag: "Énigme 2 · Le jardin de Mamie",
      titre: "Le jardin en triangle",
      question: `Le jardin de Mamie est un triangle.<br>Ses côtés mesurent <b>30 m</b>, <b>40 m</b> et <b>50 m</b>.<br><br>Quel est son <b>périmètre</b> ?`,
      reponse: `On ajoute les trois côtés.<br>30 + 40 + 50 = <span class="big">120 m</span>.`,
      consigne: "Quel est le périmètre du jardin ?",
      verification: { type: "courte", attendus: ["120"], unite: "m" },
      dessin: jardin,
    },
    {
      tag: "Énigme 3 · La salle de bain",
      titre: "Le carreau carré",
      question: `Un carreau est un <b>carré</b> de <b>9 cm</b> de côté.<br><br>Quel est son <b>périmètre</b> ?`,
      reponse: `Un carré a 4 côtés égaux.<br>4 × 9 = <span class="big">36 cm</span>.`,
      consigne: "Quel est le périmètre du carreau ?",
      verification: { type: "qcm", choix: ["36 cm", "18 cm", "81 cm"], bonne: 0 },
      dessin: carreau,
    },
    {
      tag: "Énigme 4 · Le code de la route",
      titre: "Le panneau stop",
      question: `Le panneau stop a <b>8 côtés</b> égaux.<br>Chaque côté mesure <b>25 cm</b>.<br><br>Quel est son <b>périmètre</b>, en cm ?`,
      reponse: `8 × 25 : 4 × 25 = 100, donc 8 × 25 = 200.<br><span class="big">200 cm</span>, soit 2 m.`,
      consigne: "Quel est le périmètre du panneau stop, en centimètres ?",
      verification: { type: "courte", attendus: ["200"], unite: "cm" },
      dessin: stop,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La nappe",
      sorte: "piege",
      question: `La nappe mesure <b>2 m</b> de long et <b>50 cm</b> de large.<br><br>Quel est son <b>périmètre</b> ?`,
      reponse: `Le piège : 2 + 50 + 2 + 50 = 104. Les unités ne sont pas les mêmes !<br>2 m = 200 cm. 200 + 50 + 200 + 50 = 500 cm.<br><span class="big">5 m</span>.`,
      consigne: "Quel est le périmètre de la nappe ?",
      verification: { type: "qcm", choix: ["104 cm", "2 m 50 cm", "5 m"], bonne: 2 },
      dessin: nappe,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La figure en escalier",
      sorte: "defi",
      question: `Chaque carreau mesure <b>1 cm</b> de côté.<br><br>Quel est le <b>périmètre</b> de la figure rose ?`,
      reponse: `Les marches horizontales font 2 + 2 + 2 = 6 cm, comme le bas.<br>Les marches verticales font 1 + 1 + 2 = 4 cm, comme la gauche.<br>6 + 6 + 4 + 4 = <span class="big">20 cm</span>.`,
      consigne: "Quel est le périmètre de la figure en escalier ?",
      verification: { type: "courte", attendus: ["20"], unite: "cm" },
      dessin: escalier,
    },
  ],
};

export default problemes;
