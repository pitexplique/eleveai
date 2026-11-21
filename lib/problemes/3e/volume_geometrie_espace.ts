// Énigmes à projeter — 3e, notion volume_geometrie_espace (la boule, se
// repérer sur la Terre depuis La Réunion, le cornet de glace, la pyramide du
// Louvre, piège du cône versé dans le cylindre, défi d'Archimède). 21/11/2026.
// ⛔ La 4e a déjà le pavé, le prisme et le cylindre : ici boule, cône, pyramide, sphère.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, o, p, ell } from "../dessins-ecole";
import { frac } from "../outils";

// La boule : rayon 3 cm, dessinée agrandie (120 px).
const boule = svg(
  "Une boule de rayon 3 cm",
  o(240, 200, 120, C.pale, 0.25) + ell(240, 200, 120, 34, C.pale, 0, 2).replace("/>", ' stroke-dasharray="8 6"/>') + l(240, 200, 360, 200, C.rose, 4) +
    `<circle cx="240" cy="200" r="5" fill="${C.craie}"/>` + t(300, 188, "3 cm", C.rose, 24) + t(240, 375, `volume${NB}?`, C.rose, 28) + t(240, 410, "V = 4/3 × π × r³", C.pale, 18)
);

// La Terre : équateur, méridien de Greenwich, et un point à 21° S, 55° E.
const terre = () => {
  const R = 150, cx = 240, cy = 200, rad = Math.PI / 180;
  // Projection orthographique centrée sur (0° N, 30° E) : x = R cos φ sin(λ − 30°), y = −R sin φ.
  const pr = (phi: number, lam: number): [number, number] => [Math.round(cx + R * Math.cos(phi * rad) * Math.sin((lam - 30) * rad)), Math.round(cy - R * Math.sin(phi * rad))];
  let s = o(cx, cy, R, C.bleu, 0.12, 3);
  let eq = "", gr = "";
  for (let lam = -60; lam <= 120; lam += 5) { const q = pr(0, lam); eq += `${lam === -60 ? "M" : "L"}${q[0]} ${q[1]} `; }
  for (let phi = -90; phi <= 90; phi += 5) { const q = pr(phi, 0); gr += `${phi === -90 ? "M" : "L"}${q[0]} ${q[1]} `; }
  s += p(eq, C.craie, 3) + p(gr, C.jaune, 3);
  const re = pr(-21, 55);
  s += `<circle cx="${re[0]}" cy="${re[1]}" r="8" fill="${C.rose}"/>` + t(re[0] + 14, re[1] + 26, "La Réunion", C.rose, 18, "start");
  return svg("La Terre avec l'équateur, le méridien de Greenwich et La Réunion, à 21° Sud et 55° Est", s +
    t(60, 196, "équateur", C.craie, 16, "start").replace('x="60"', 'x="20"') + t(165, 40, "Greenwich", C.jaune, 16) + t(240, 395, "21° S · 55° E", C.craie, 24));
};

// Le cornet : rayon 3 cm, hauteur 10 cm ; 1 cm = 26 px.
const cornet = svg(
  "Un cornet de glace en forme de cône de rayon 3 cm et de hauteur 10 cm",
  p("M162 90 L240 350 L318 90", C.jaune, 4, 0.3) + ell(240, 90, 78, 20, C.jaune, 0.4, 4) + l(240, 90, 240, 350, C.pale, 2, "6 6") + l(240, 90, 318, 90, C.rose, 3) +
    t(280, 58, "3 cm", C.rose, 20) + t(250, 230, "10 cm", C.craie, 20, "start") + t(240, 395, `volume${NB}?`, C.rose, 26) + t(400, 395, "au bon rapport", C.pale, 14)
);

// La pyramide du Louvre : base 35 m, hauteur 21,6 m ; 1 m = 9 px (vue de face, cavalière).
const louvre = svg(
  "La pyramide du Louvre : base carrée de 35 m de côté, hauteur 21,6 m",
  p("M82 330 L397 330 L240 136 Z", C.bleu, 4, 0.12) + p("M82 330 L150 290 L397 330 M150 290 L240 136", C.pale, 2) + l(240, 136, 240, 330, C.rose, 3, "8 6") +
    [1, 2, 3, 4, 5].map((k) => l(82 + 31.5 * k, 330 - 38.8 * k, 397 - 31.5 * k, 330 - 38.8 * k, C.bleu, 1)).join("") +
    t(240, 365, "35 m", C.craie, 22) + t(250, 260, "21,6 m", C.rose, 20, "start") + t(240, 405, `volume${NB}?`, C.rose, 26)
);

// Cône et cylindre de même base et même hauteur.
const piege = svg(
  "Un cône plein d'eau et un cylindre vide de même base et de même hauteur",
  p("M70 120 L140 320 L210 120", C.bleu, 4, 0.35) + ell(140, 120, 70, 18, C.bleu, 0.45, 4) +
    p("M270 120 L270 320 M410 120 L410 320", C.craie, 4) + ell(340, 120, 70, 18, C.craie, 0, 4) + ell(340, 320, 70, 18, C.craie, 0.05, 4) +
    p("M230 160 q20 -30 30 0", C.bleu, 3) + t(340, 230, "?", C.rose, 40) + t(240, 380, `rempli jusqu'où${NB}?`, C.rose, 26)
);

// La balle dans sa boîte : rayon 3,3 cm, boîte de 6,6 cm de diamètre et de haut ; 1 cm = 36 px.
const archimede = svg(
  "Une balle dans une boîte cylindrique qui la touche en haut, en bas et sur les côtés",
  p("M121 80 L121 318 M359 80 L359 318", C.craie, 4) + ell(240, 80, 119, 22, C.craie, 0, 4) + ell(240, 318, 119, 22, C.craie, 0, 4) +
    o(240, 199, 119, C.jaune, 0.35) + p("M150 140 q90 60 180 0 M150 258 q90 -60 180 0", C.craie, 3) + t(240, 385, `quelle part de la boîte${NB}?`, C.rose, 24)
);

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "volume_geometrie_espace",
  titre: "Énigmes de la géométrie dans l'espace",
  description: "La boule de rayon 3 cm, La Réunion sur le globe, le cornet de glace, la pyramide du Louvre, le piège du cône versé dans le cylindre, le défi d'Archimède : volumes de la boule, du cône et de la pyramide, se repérer sur la sphère.",
  problemes: [
    {
      tag: "Énigme 1 · La boule",
      titre: "Le volume d'une boule",
      question: `Une boule a un rayon de <b>3 cm</b>. Son volume vaut V = ${frac(4, 3)} × π × r³.<br><br><b>Quel est son volume</b>, arrondi au cm³ ?`,
      reponse: `V = 4/3 × π × 3³ = 4/3 × π × 27 = 36π ≈ <span class="big">113 cm³</span>.`,
      consigne: "Quel est le volume de la boule, arrondi au cm³ ?",
      verification: {"type":"courte","attendus":["113"],"unite":"cm³"},
      dessin: boule,
    },
    {
      tag: "Énigme 2 · Se repérer sur la Terre",
      titre: "Latitude et longitude",
      question: `La Réunion se trouve à environ <b>21° Sud</b> de latitude et <b>55° Est</b> de longitude.<br><br>Dans <b>quels hémisphères</b> est-elle ?`,
      reponse: `La latitude se compte depuis l'équateur : 21° <b>Sud</b>, donc sous l'équateur.<br>La longitude se compte depuis le méridien de Greenwich : 55° <b>Est</b>.<br>La Réunion est dans les hémisphères <span class="big">Sud et Est</span>.`,
      consigne: "Dans quels hémisphères se trouve La Réunion ?",
      verification: {"type":"qcm","choix":["Sud et Est","Nord et Est","Sud et Ouest"],"bonne":0},
      dessin: terre(),
    },
    {
      tag: "Énigme 3 · Le cornet de glace",
      titre: "Un cône bien rempli",
      question: `Un cornet de glace est un cône de <b>3 cm</b> de rayon et <b>10 cm</b> de hauteur.<br>Volume d'un cône : V = (aire de la base × hauteur) ÷ 3.<br><br><b>Quel est son volume</b>, arrondi au cm³ ?`,
      reponse: `Aire de la base : π × 3² = 9π cm².<br>V = 9π × 10 ÷ 3 = 30π ≈ <span class="big">94 cm³</span>.`,
      consigne: "Quel est le volume du cornet, arrondi au cm³ ?",
      verification: {"type":"courte","attendus":["94"],"unite":"cm³"},
      dessin: cornet,
    },
    {
      tag: "Énigme 4 · La pyramide du Louvre",
      titre: "Le volume de verre",
      question: `La pyramide du Louvre, à Paris, a une base carrée d'environ <b>35 m</b> de côté et une hauteur d'environ <b>21,6 m</b>.<br><br><b>Quel est son volume</b> ?`,
      reponse: `Aire de la base : 35 × 35 = 1 225 m².<br>V = 1 225 × 21,6 ÷ 3 = 1 225 × 7,2 = <span class="big">8 820 m³</span>.`,
      consigne: "Quel est le volume de la pyramide ?",
      verification: {"type":"courte","attendus":["8820","8 820"],"unite":"m³"},
      dessin: louvre,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le cône dans le cylindre",
      sorte: "piege",
      question: `Un cône et un cylindre ont la <b>même base</b> et la <b>même hauteur</b>. On remplit le cône d'eau, puis on le vide dans le cylindre.<br><br><b>Jusqu'où</b> le cylindre est-il rempli ?`,
      reponse: `V cône = (base × hauteur) ÷ 3 et V cylindre = base × hauteur.<br>Le cône contient le tiers du cylindre : il est rempli <span class="big">au tiers</span>, pas à moitié !<br>Il faut 3 cônes pour remplir le cylindre.`,
      consigne: "Jusqu'où le cylindre est-il rempli ?",
      verification: {"type":"qcm","choix":["À moitié","Au tiers","Entièrement"],"bonne":1},
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La découverte d'Archimède",
      sorte: "defi",
      question: `Une balle est dans une boîte cylindrique qui la touche juste en haut, en bas et sur les côtés.<br><br>Quelle <b>fraction</b> du volume de la boîte la balle occupe-t-elle ?`,
      reponse: `Avec r le rayon : la boîte a un rayon r et une hauteur 2r, donc V = π × r² × 2r = 2πr³.<br>La balle : 4/3 πr³. Rapport : (4/3) ÷ 2 = <span class="big">${frac(2, 3)}</span>.<br>Archimède était si fier de cette découverte qu'il l'a fait graver sur sa tombe.`,
      consigne: "Quelle fraction de la boîte la balle occupe-t-elle ?",
      verification: {"type":"courte","attendus":["2/3"]},
      dessin: archimede,
    },
  ],
};

export default problemes;
