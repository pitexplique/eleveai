// Énigmes à projeter — 4e, notion litteral_factorisation (les boîtes de
// crayons, le tapis du dojo, l'escape game, le verger, piège des guirlandes
// « 6(x + 30) », défi de la mosaïque 2x² + 6x).
// Les tuiles et les rectangles d'aires sont au bon rapport entre eux
// (une barre x a la longueur du côté du carré x², l'unité vaut 30 px) ;
// la valeur de x dessinée est arbitraire. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;
const tuile = (x: number, y: number, w: number, h: number, coul: string, etiquette = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${coul}" fill-opacity=".3" stroke="${C.craie}" stroke-width="2"/>` +
  (etiquette ? txt(x + w / 2, y + h / 2 + 7, etiquette, C.craie, 20) : "");

// Les crayons : 6 barres de longueur x (30 × 120 px) et 9 carrés de 1 (30 px).
const crayons = () => {
  let s = "";
  for (let k = 0; k < 6; k++) s += tuile(50 + k * 40, 100, 30, 120, C.bleu, "x");
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) s += tuile(320 + i * 36, 118 + j * 36, 30, 30, C.jaune);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Des tuiles : 6 barres de longueur x et 9 petits carrés de côté 1">
  <text x="240" y="70" font-size="40" text-anchor="middle">✏️</text>
  ${s}
  ${txt(155, 260, "6 barres x", C.bleu, 22)}
  ${txt(371, 260, "9 carrés de 1", C.jaune, 22)}
  ${txt(240, 330, "6x + 9", C.craie, 34)}
  ${txt(240, 385, "facteur commun le plus grand${NB}?", C.rose, 24)}
  </svg>`;
};

// Le tapis : 30 px par m. Largeur 5 m (150 px) ; la partie 4 m fait 120 px ;
// la partie x est tracée à 180 px (x est inconnu).
const dojo = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un tapis rectangulaire de 5 m de large, fait de deux parties d'aires 5x et 20 mètres carrés">
  ${tuile(90, 120, 180, 150, C.bleu)}
  ${tuile(270, 120, 120, 150, C.jaune)}
  ${txt(180, 203, "5x m²", C.bleu, 26)}
  ${txt(330, 203, "20 m²", C.jaune, 26)}
  ${txt(80, 203, "5 m", C.craie, 24, "end")}
  <path d="M90 108 L90 98 L390 98 L390 108" stroke="${C.rose}" stroke-width="3" fill="none"/>
  ${txt(240, 84, "longueur${NB}: ?", C.rose, 26)}
  ${txt(240, 320, "aire du tapis${NB}: 5x + 20 m²", C.craie, 24)}
  <text x="240" y="390" font-size="44" text-anchor="middle">🥋</text>
  </svg>`;

// L'escape game : la porte et les trois propositions.
const escape = () => {
  const carte = (y: number, nom: string, expr: string) =>
    `<rect x="60" y="${y}" width="360" height="56" rx="14" fill="${C.bleu}" fill-opacity=".1" stroke="${C.bleu}" stroke-width="3"/>` +
    txt(80, y + 37, nom, C.bleu, 24, "start") + txt(330, y + 37, expr, C.craie, 26);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une porte codée : factoriser 8x moins 12 ; trois propositions d'Ana, Ben et Chloé">
  <text x="70" y="100" font-size="48" text-anchor="middle">🔐</text>
  ${txt(260, 100, "8x − 12 = ?", C.rose, 34)}
  ${carte(150, `Ana${NB}:`, "4(2x − 12)")}
  ${carte(230, `Ben${NB}:`, "4(2x − 3)")}
  ${carte(310, `Chloé${NB}:`, "8(x − 4)")}
  ${txt(240, 405, `Qui ouvre la porte${NB}?`, C.craie, 22)}
  </svg>`;
};

// Le verger : 10 px par unité. 23 × 15 (230 × 150 px) et 7 × 15 (70 × 150 px).
const verger = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux rectangles de même hauteur 15 : l'un de longueur 23, l'autre de longueur 7">
  ${tuile(60, 110, 230, 150, C.jaune)}
  ${tuile(290, 110, 70, 150, C.rose)}
  <text x="175" y="200" font-size="44" text-anchor="middle">🍎</text>
  <text x="325" y="200" font-size="36" text-anchor="middle">🍐</text>
  ${txt(175, 96, "23 cagettes", C.jaune, 22)}
  ${txt(325, 96, "7", C.rose, 22)}
  ${txt(52, 193, "15 kg", C.craie, 22, "end")}
  ${txt(240, 320, "23 × 15 + 7 × 15", C.craie, 30)}
  ${txt(240, 370, "= ? kg", C.rose, 30)}
  </svg>`;

// Les guirlandes : l'écriture de Jade, sans figure à l'échelle.
const guirlandes = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Six guirlandes de x ampoules et 30 ampoules de plus ; Jade écrit 6x + 30 = 6(x + 30)">
  <text x="120" y="110" font-size="64" text-anchor="middle">🎄</text>
  <text x="360" y="110" font-size="64" text-anchor="middle">💡</text>
  ${txt(240, 180, "6 guirlandes de x ampoules", C.craie, 24)}
  ${txt(240, 220, "+ 30 ampoules", C.craie, 24)}
  <rect x="50" y="270" width="380" height="80" rx="20" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 320, `Jade${NB}: 6x + 30 = 6(x + 30)`, C.rose, 26)}
  </svg>`;

// La mosaïque : carreaux x² (90 px de côté) et bandes x sur 1 (90 × 30 px).
const mosaique = () => {
  let s = tuile(40, 100, 90, 90, C.bleu, "x²") + tuile(140, 100, 90, 90, C.bleu, "x²");
  for (let col = 0; col < 2; col++) for (let k = 0; k < 3; k++) s += tuile(250 + col * 110, 100 + k * 40, 90, 30, C.jaune, "x");
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une mosaïque : 2 carreaux carrés de côté x et 6 bandes de longueur x et de largeur 1">
  ${s}
  ${txt(85, 214, "x", C.craie, 22)}
  ${txt(135, 250, "2 carreaux x²", C.bleu, 22)}
  ${txt(350, 250, "6 bandes x × 1", C.jaune, 22)}
  ${txt(240, 330, "2x² + 6x", C.craie, 34)}
  ${txt(240, 385, "le plus grand facteur commun${NB}?", C.rose, 24)}
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "litteral_factorisation",
  titre: "Énigmes sur la factorisation",
  description: "Les boîtes de crayons, le tapis du dojo, l'escape game, le verger, le piège des guirlandes, le défi de la mosaïque : repérer le facteur commun, factoriser k·a + k·b = k(a + b), vérifier en développant, calculer vite grâce à la factorisation.",
  problemes: [
    {
      tag: "Énigme 1 · Les boîtes de crayons",
      titre: "Le plus grand facteur commun",
      question: `Sacha a x boîtes de 6 crayons, et 9 crayons en vrac.<br>En tout, il a 6x + 9 crayons.<br><br>Quel est le <b>plus grand</b> facteur commun de 6x et de 9 ?`,
      reponse: `6 divise 6x, mais 6 ne divise pas 9.<br>9 ne divise pas 6x.<br>3 divise les deux : 6x ÷ 3 = 2x et 9 ÷ 3 = 3.<br>Le plus grand facteur commun est <span class="big">3</span>.<br>Donc 6x + 9 = 3(2x + 3) : 3 paquets identiques de 2x + 3 crayons.<br>Contrôle : 3 × 2x + 3 × 3 = 6x + 9.`,
      consigne: "Quel est le plus grand facteur commun de 6x et de 9 ?",
      verification: { type: "qcm", choix: ["6", "9", "3"], bonne: 2 },
      dessin: crayons(),
    },
    {
      tag: "Énigme 2 · Le dojo",
      titre: "La longueur du tapis",
      question: `Le tapis du dojo est un rectangle de 5 m de large.<br>Son aire est 5x + 20 m².<br><br>Quelle est sa longueur, en fonction de x ?`,
      reponse: `Aire = largeur × longueur. On cherche donc 5 × (…) = 5x + 20.<br>On factorise par 5 : 5x ÷ 5 = x et 20 ÷ 5 = 4.<br>5x + 20 = 5(x + 4).<br>La longueur est <span class="big">x + 4</span> mètres.<br>Contrôle : 5 × x + 5 × 4 = 5x + 20.`,
      consigne: "Quelle est la longueur du tapis, en fonction de x ?",
      verification: { type: "courte", attendus: ["x+4", "4+x"], unite: "m" },
      dessin: dojo(),
    },
    {
      tag: "Énigme 3 · L'escape game",
      titre: "La porte codée",
      question: `Pour ouvrir la porte, il faut factoriser 8x − 12.<br>Ana propose 4(2x − 12), Ben 4(2x − 3), Chloé 8(x − 4).<br><br>Qui a raison ? Vérifie en développant.`,
      reponse: `On développe chaque proposition :<br>Ana : 4 × 2x − 4 × 12 = 8x − 48. Non.<br>Ben : 4 × 2x − 4 × 3 = 8x − 12. Oui !<br>Chloé : 8 × x − 8 × 4 = 8x − 32. Non.<br>C'est <span class="big">Ben</span> qui ouvre la porte.`,
      consigne: "Qui a bien factorisé 8x − 12 ?",
      verification: { type: "qcm", choix: ["Ana", "Ben", "Chloé"], bonne: 1 },
      dessin: escape(),
    },
    {
      tag: "Énigme 4 · Le verger",
      titre: "Le calcul malin",
      question: `Au verger, Rubén remplit 23 cagettes de pommes et 7 cagettes de poires.<br>Chaque cagette pèse 15 kg.<br><br>Calcule 23 × 15 + 7 × 15 de tête. Quelle est la masse totale ?`,
      reponse: `Le 15 est commun aux deux produits : on factorise.<br>23 × 15 + 7 × 15 = (23 + 7) × 15.<br>= 30 × 15 = 450.<br>La masse totale est <span class="big">450 kg</span>.<br>Contrôle : 23 × 15 = 345 et 7 × 15 = 105 ; 345 + 105 = 450.`,
      consigne: "Quelle est la masse totale, en kg ?",
      verification: { type: "courte", attendus: ["450"], unite: "kg" },
      dessin: verger(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les guirlandes",
      sorte: "piege",
      question: `Jade a 6 guirlandes de x ampoules, et 30 ampoules en plus.<br>Elle écrit : 6x + 30 = 6(x + 30).<br><br><b>Quelle est la bonne factorisation ?</b>`,
      reponse: `Jade s'est trompée ! On développe : 6(x + 30) = 6x + 180, pas 6x + 30.<br>Elle a divisé 6x par 6, mais elle a oublié de diviser 30.<br>30 ÷ 6 = 5.<br>La bonne factorisation : <span class="big">6(x + 5)</span>.<br>Contrôle : 6 × x + 6 × 5 = 6x + 30.`,
      consigne: "Quelle est la bonne factorisation de 6x + 30 ?",
      verification: { type: "qcm", choix: ["6(x + 5)", "6(x + 30)", "6(x + 24)"], bonne: 0 },
      dessin: guirlandes(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La mosaïque",
      sorte: "defi",
      question: `Pour une mosaïque, Noé a 2 carreaux carrés de côté x et 6 bandes de x sur 1.<br>L'aire totale est 2x² + 6x.<br><br>Factorise 2x² + 6x avec le plus grand facteur commun possible.`,
      reponse: `2 divise 2x² et 6x. x aussi : 2x² = 2x × x et 6x = 2x × 3.<br>Le plus grand facteur commun est 2x.<br>2x² + 6x = <span class="big">2x(x + 3)</span>.<br>Contrôle : 2x × x + 2x × 3 = 2x² + 6x.<br>2(x² + 3x) et x(2x + 6) sont justes aussi, mais on peut encore factoriser.<br>Les tuiles forment un rectangle de 2x sur x + 3.`,
      consigne: "Factorise 2x² + 6x au maximum.",
      verification: { type: "courte", attendus: ["2x(x+3)", "2x(3+x)", "2x×(x+3)", "2x*(x+3)", "(x+3)2x", "(x+3)×2x"] },
      dessin: mosaique(),
    },
  ],
};

export default problemes;
