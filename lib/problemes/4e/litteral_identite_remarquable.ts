// Énigmes à projeter — 4e, notion litteral_identite_remarquable (le patio
// carré découpé : (x + 4)², le coffre du rallye : reconnaître la différence de
// deux carrés, la toile du trampoline : (x − 2)², les chaises de la salle des
// fêtes : 49 × 51 = 50² − 1, piège du carré d'une différence « x² − 49 »,
// défi : (n − 1)(n + 1) + 1 = n² avec 2 025 × 2 027 + 1).
// Exemples différents de ceux de la fiche ((x + 3)², (x − 4)², (x − 5)(x + 5),
// 101², 99 × 101). Figures au bon rapport : patio dessiné pour x = 10 (25 px
// par mètre : x → 250 px, 4 m → 100 px) ; trampoline pour x = 6 (50 px par
// mètre : 300 px, bord de 1 m → 50 px, toile 4 m → 200 px) ; salle à 6 px par
// chaise (51 → 306 px, 49 → 294 px). Pas de prix, pas de La Réunion. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

// Le patio : coin (90 ; 50), x = 250 px, 4 m = 100 px, côté total 350 px.
const patio = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un carré de côté x plus 4, découpé en un carré de côté x, deux rectangles de x sur 4 et un petit carré de côté 4">
  <rect x="90" y="50" width="250" height="250" fill="${C.bleu}" fill-opacity=".15"/>
  <rect x="340" y="50" width="100" height="250" fill="${C.jaune}" fill-opacity=".3"/>
  <rect x="90" y="300" width="250" height="100" fill="${C.jaune}" fill-opacity=".3"/>
  <rect x="340" y="300" width="100" height="100" fill="${C.rose}" fill-opacity=".25"/>
  <rect x="90" y="50" width="350" height="350" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <path d="M340 50 L340 400 M90 300 L440 300" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${txt(215, 38, "x", C.craie, 26)}
  ${txt(390, 38, "4", C.craie, 26)}
  ${txt(70, 184, "x", C.craie, 26)}
  ${txt(70, 359, "4", C.craie, 26)}
  </svg>`;

// Le rallye : trois cartes, dans l'ordre des choix A, B, C.
const rallye = () => {
  const carte = (y: number, lettre: string, expr: string) =>
    `<rect x="90" y="${y}" width="320" height="64" rx="12" fill="none" stroke="${C.craie}" stroke-width="3"/>` +
    txt(120, y + 41, lettre, C.pale, 24) + txt(265, y + 42, expr, C.craie, 28);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois cartes : A, a plus 8 fois a plus 8 ; B, a plus 8 fois a moins 3 ; C, a plus 8 fois a moins 8">
  <text x="240" y="70" font-size="48" text-anchor="middle">🧰</text>
  ${carte(110, "A", "(a + 8)(a + 8)")}
  ${carte(190, "B", "(a + 8)(a − 3)")}
  ${carte(270, "C", "(a + 8)(a − 8)")}
  ${txt(240, 385, `deux termes seulement${NB}?`, C.rose, 24)}
  </svg>`;
};

// Le trampoline : dessiné pour x = 6, 50 px par mètre.
// Bord (90 ; 60) → (390 ; 360) ; toile (140 ; 110) → (340 ; 310).
const trampoline = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un trampoline carré de côté x ; un filet de 1 mètre tout autour ; la toile au centre est un carré de côté x moins 2">
  <rect x="90" y="60" width="300" height="300" fill="${C.pale}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3"/>
  <rect x="140" y="110" width="200" height="200" fill="${C.bleu}" fill-opacity=".2" stroke="${C.bleu}" stroke-width="3"/>
  ${txt(240, 46, "x", C.craie, 26)}
  ${txt(115, 216, "1 m", C.pale, 20)}
  ${txt(365, 216, "1 m", C.pale, 20)}
  ${txt(240, 90, "1 m", C.pale, 20)}
  ${txt(240, 218, "toile", C.bleu, 26)}
  ${txt(240, 400, `aire de la toile${NB}?`, C.rose, 24)}
  </svg>`;

// La salle : 51 chaises par rangée (306 px), 49 rangées (294 px), 6 px par chaise.
const salle = () => {
  let grille = "";
  for (let k = 1; k < 51; k++) grille += `M${120 + 6 * k} 90 L${120 + 6 * k} 384 `;
  for (let k = 1; k < 49; k++) grille += `M120 ${90 + 6 * k} L426 ${90 + 6 * k} `;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un rectangle de chaises : 49 rangées de 51 chaises">
  <text x="60" y="70" font-size="40" text-anchor="middle">🪑</text>
  <rect x="120" y="90" width="306" height="294" fill="${C.bleu}" fill-opacity=".12"/>
  <path d="${grille}" stroke="${C.pale}" stroke-width="1" stroke-opacity=".45" fill="none"/>
  <rect x="120" y="90" width="306" height="294" fill="none" stroke="${C.craie}" stroke-width="3"/>
  ${txt(273, 74, "51 chaises par rangée", C.craie, 22)}
  <text x="100" y="237" fill="${C.craie}" font-size="22" text-anchor="middle" transform="rotate(-90 100 237)">49 rangées</text>
  ${txt(273, 405, `combien de chaises${NB}?`, C.rose, 22)}
  </svg>`;
};

// Le cahier de Léo.
const cahier = () => {
  let lignes = "";
  for (let k = 0; k < 6; k++) lignes += `M50 ${120 + 44 * k} L430 ${120 + 44 * k} `;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le cahier de Léo : il a écrit x moins 7 au carré égale x carré moins 49">
  <text x="240" y="70" font-size="44" text-anchor="middle">📓</text>
  <path d="${lignes}" stroke="${C.bleu}" stroke-width="1.5" stroke-opacity=".5" fill="none"/>
  <rect x="50" y="170" width="380" height="80" rx="16" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  <text x="240" y="222" fill="${C.rose}" font-size="32" text-anchor="middle">(x − 7)<tspan dy="-12" font-size="22">2</tspan><tspan dy="12"> = x</tspan><tspan dy="-12" font-size="22">2</tspan><tspan dy="12"> − 49</tspan></text>
  ${txt(240, 330, `Léo a-t-il raison${NB}?`, C.craie, 24)}
  </svg>`;
};

// Le défi : les exemples de Malo.
const defi = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux exemples : 3 fois 5 plus 1 égale 16, le carré de 4 ; 6 fois 8 plus 1 égale 49, le carré de 7 ; puis la question : 2 025 fois 2 027 plus 1">
  <text x="240" y="70" font-size="44" text-anchor="middle">🔍</text>
  <text x="240" y="140" fill="${C.pale}" font-size="28" text-anchor="middle">3 × 5 + 1 = 16 = 4<tspan dy="-12" font-size="20">2</tspan></text>
  <text x="240" y="200" fill="${C.pale}" font-size="28" text-anchor="middle">6 × 8 + 1 = 49 = 7<tspan dy="-12" font-size="20">2</tspan></text>
  <rect x="40" y="245" width="400" height="80" rx="16" fill="none" stroke="${C.bleu}" stroke-width="3"/>
  ${txt(240, 297, `2${NB}025 × 2${NB}027 + 1`, C.bleu, 32)}
  <text x="240" y="385" fill="${C.rose}" font-size="30" text-anchor="middle">= ?<tspan dy="-12" font-size="20">2</tspan></text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "litteral_identite_remarquable",
  titre: "Énigmes sur les identités remarquables",
  description: "Le patio carré découpé, le coffre du rallye, la toile du trampoline, les chaises de la salle des fêtes, le piège du carré d'une différence, le défi des carrés cachés : relier une identité à la double distributivité, reconnaître sa forme, développer, calculer de tête.",
  problemes: [
    {
      tag: "Énigme 1 · Le patio",
      titre: "Le carré découpé",
      question: `Un patio carré a pour côté x + 4 mètres.<br>On le découpe : un carré de côté x, deux rectangles, un petit carré de côté 4.<br><br>Quelle expression développée donne l'aire du patio ?`,
      reponse: `(x + 4)<sup>2</sup> = (x + 4)(x + 4).<br>Double distributivité : x<sup>2</sup> + 4x + 4x + 16.<br>Sur le dessin : le carré x<sup>2</sup>, deux rectangles de 4x, le petit carré de 16.<br>L'aire vaut <span class="big">x<sup>2</sup> + 8x + 16</span>.<br>Contrôle avec x = 1 : (1 + 4)<sup>2</sup> = 25, et 1 + 8 + 16 = 25.`,
      consigne: "Quelle expression développée donne l'aire du patio ?",
      verification: { type: "qcm", choix: ["x² + 8x + 16", "x² + 16", "x² + 4x + 16"], bonne: 0 },
      dessin: patio(),
    },
    {
      tag: "Énigme 2 · Au rallye maths",
      titre: "La carte du coffre",
      question: `Au rallye maths, un coffre s'ouvre avec la bonne carte.<br>C'est celle dont le développement n'a que <b>deux termes</b>.<br><br>Quelle carte ouvre le coffre ?`,
      reponse: `A : deux parenthèses identiques, c'est un carré : a<sup>2</sup> + 16a + 64. Trois termes.<br>B : ce n'est pas une identité : a<sup>2</sup> − 3a + 8a − 24 = a<sup>2</sup> + 5a − 24. Trois termes.<br>C : mêmes nombres, signes contraires : a<sup>2</sup> − 8a + 8a − 64. Le milieu s'annule.<br>La carte <span class="big">C : a<sup>2</sup> − 64</span>.<br>Contrôle avec a = 10 : 18 × 2 = 36, et 100 − 64 = 36.`,
      consigne: "Quelle carte donne un développement à deux termes seulement ?",
      verification: { type: "qcm", choix: ["(a + 8)(a + 8)", "(a + 8)(a − 3)", "(a + 8)(a − 8)"], bonne: 2 },
      dessin: rallye(),
    },
    {
      tag: "Énigme 3 · Au trampoline",
      titre: "La toile du trampoline",
      question: `Un trampoline carré a pour côté x mètres.<br>Le filet de sécurité prend 1 m tout autour.<br>La toile où l'on saute est donc un carré de côté x − 2.<br><br>Développe et réduis l'aire de la toile.`,
      reponse: `(x − 2)<sup>2</sup> = (x − 2)(x − 2).<br>Double distributivité : x<sup>2</sup> − 2x − 2x + 4.<br>Le double produit est négatif : −4x. Le dernier terme reste positif : (−2) × (−2) = 4.<br>L'aire de la toile vaut <span class="big">x<sup>2</sup> − 4x + 4</span>.<br>Contrôle avec x = 6 : 4<sup>2</sup> = 16, et 36 − 24 + 4 = 16.`,
      consigne: "Écris l'aire de la toile, développée et réduite.",
      verification: { type: "courte", attendus: ["x²-4x+4", "x^2-4x+4", "x2-4x+4", "x²−4x+4", "x^2−4x+4", "x2−4x+4"] },
      dessin: trampoline(),
    },
    {
      tag: "Énigme 4 · À la salle des fêtes",
      titre: "Les chaises du spectacle",
      question: `Pour le spectacle, on installe 49 rangées de 51 chaises.<br>Remarque : 49 = 50 − 1 et 51 = 50 + 1.<br><br>Calcule de tête 49 × 51 avec une identité remarquable.`,
      reponse: `49 × 51 = (50 − 1)(50 + 1).<br>C'est une différence de deux carrés : 50<sup>2</sup> − 1<sup>2</sup>.<br>2 500 − 1 = 2 499.<br>Il y a <span class="big">2 499 chaises</span>.<br>Contrôle : 49 × 51 = 49 × 50 + 49 = 2 450 + 49 = 2 499.`,
      consigne: "Combien y a-t-il de chaises ?",
      verification: { type: "courte", attendus: ["2499"], unite: "chaises" },
      dessin: salle(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le carré de Léo",
      sorte: "piege",
      question: `Léo développe (x − 7)<sup>2</sup>.<br>Il écrit : (x − 7)<sup>2</sup> = x<sup>2</sup> − 49.<br><br><b>Quel est le bon développement ?</b>`,
      reponse: `Léo s'est trompé ! Il a oublié le double produit.<br>(x − 7)<sup>2</sup> = (x − 7)(x − 7) = x<sup>2</sup> − 7x − 7x + 49.<br>Le milieu vaut −14x. Le dernier terme est positif : (−7) × (−7) = 49.<br>Le bon développement : <span class="big">x<sup>2</sup> − 14x + 49</span>.<br>Contrôle avec x = 10 : 3<sup>2</sup> = 9, et 100 − 140 + 49 = 9. Léo trouverait 51.<br>x<sup>2</sup> − 49, c'est (x − 7)(x + 7) : une autre identité.`,
      consigne: "Quel est le bon développement de (x − 7)² ?",
      verification: { type: "qcm", choix: ["x² − 49", "x² − 14x + 49", "x² − 14x − 49"], bonne: 1 },
      dessin: cahier(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le carré caché",
      sorte: "defi",
      question: `Malo remarque : 3 × 5 + 1 = 16 = 4<sup>2</sup>. Et 6 × 8 + 1 = 49 = 7<sup>2</sup>.<br>Il multiplie deux nombres qui entourent un nombre n, puis il ajoute 1.<br><br>2 025 × 2 027 + 1 est le carré de quel nombre ?`,
      reponse: `Les deux nombres entourent n : ce sont n − 1 et n + 1.<br>(n − 1)(n + 1) + 1 = n<sup>2</sup> − 1 + 1 = n<sup>2</sup>.<br>Ça marche pour tous les nombres !<br>Ici, 2 025 et 2 027 entourent 2 026.<br>C'est le carré de <span class="big">2 026</span>.<br>Contrôle : 2 026<sup>2</sup> = 4 104 676 et 2 025 × 2 027 = 4 104 675. On ajoute 1 : ça tombe juste.`,
      consigne: "2 025 × 2 027 + 1 est le carré de quel nombre ?",
      verification: { type: "courte", attendus: ["2026"] },
      dessin: defi(),
    },
  ],
};

export default problemes;
