// Énigmes à projeter — seconde, notion identites_remarquables_2de (101², le
// cadre photo, le parking 99 × 101, le carré évidé, piège (x + 3)², défi
// 2025 × 2027 − 2026²). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

const carre101 = svg(
  "Un carré de 101 sur 101 découpé en un carré de 100, deux bandes de 100 sur 1 et un petit carré",
  r(80, 50, 250, 250, C.bleu, 0.15, 3) + r(330, 50, 22, 250, C.jaune, 0.4, 3) + r(80, 300, 250, 22, C.jaune, 0.4, 3) + r(330, 300, 22, 22, C.rose, 0.5, 3) +
    t(205, 185, "100²", C.bleu, 40) + t(205, 40, "100", C.craie, 20) + t(341, 40, "1", C.craie, 20) + t(240, 380, `101² de tête${NB}?`, C.rose, 30)
);

const cadre = svg(
  "Une photo carrée de côté x dans un cadre de 2 centimètres de large",
  r(100, 50, 280, 280, C.jaune, 0.35, 4, 6) + r(140, 90, 200, 200, C.bleu, 0.15, 3) + t(240, 200, "photo", C.bleu, 26) +
    t(240, 80, "2", C.craie, 20) + t(240, 120, "x", C.craie, 24) + l(140, 120, 228, 120, C.pale, 1.5) + l(252, 120, 340, 120, C.pale, 1.5) +
    t(240, 380, `aire totale${NB}?`, C.rose, 28)
);

const parking = () => {
  let s = "";
  for (let i = 0; i < 11; i++) for (let j = 0; j < 9; j++) s += r(70 + 31 * i, 50 + 26 * j, 24, 18, C.pale, 0.3, 1.5, 2);
  return svg("Un parking de 99 rangées de 101 places, dessin réduit", s + t(240, 315, "99 rangées de 101 places", C.craie, 24) + t(240, 345, "(pas à l'échelle)", C.pale, 16) + t(240, 395, `combien de places${NB}?`, C.rose, 26));
};

// Carré x = 10 (20 px/unité), on retire un carré de 7 dans le coin (pas à l'échelle exacte pour x).
const evide = svg(
  "Un carré de côté x dont on retire un carré de côté 7 dans un coin",
  `<path d="M80 60 L360 60 L360 200 L220 200 L220 340 L80 340 Z" fill="${C.bleu}" fill-opacity="0.18" stroke="${C.bleu}" stroke-width="4"/>` +
    r(220, 200, 140, 140, C.pale, 0, 3).replace("/>", ` stroke-dasharray="8 6"/>`) + t(290, 280, "7", C.pale, 30) +
    t(220, 45, "x", C.craie, 24) + t(65, 205, "x", C.craie, 24, "end") + t(240, 395, `x² − 49 en produit${NB}?`, C.rose, 26)
);

const piege = svg(
  "Au tableau : x plus 3 au carré",
  t(240, 170, "(x + 3)² = ?", C.bleu, 60).replace(" ?", `${NB}?`) + t(240, 280, "x² + 9 ?", C.craie, 36).replace(" ?", `${NB}?`)
);

const defi = svg(
  "Au tableau : 2025 fois 2027 moins 2026 au carré",
  t(240, 170, "2025 × 2027", C.craie, 44) + t(240, 240, "− 2026²", C.craie, 44) + t(240, 340, `sans calculatrice${NB}!`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "identites_remarquables_2de",
  titre: "Énigmes des identités remarquables",
  description: "101² de tête, le cadre photo, le parking de 99 rangées, le carré évidé, le piège (x + 3)², le défi 2025 × 2027 − 2026² : développer et factoriser avec (a + b)², (a − b)² et (a + b)(a − b).",
  problemes: [
    {
      tag: "Énigme 1 · 101²",
      titre: "Un carré de tête",
      question: `<b>Calcule de tête</b> 101², en pensant à (a + b)² avec a = 100 et b = 1.`,
      reponse: `(100 + 1)² = 100² + 2 × 100 × 1 + 1² = 10 000 + 200 + 1 = <span class="big">10 201</span>.<br>Sur le dessin : le grand carré, deux bandes, le petit coin.`,
      consigne: "Combien vaut 101² ?",
      verification: { type: "courte", attendus: ["10201"] },
      dessin: carre101,
    },
    {
      tag: "Énigme 2 · Le cadre photo",
      titre: "2 cm tout autour",
      question: `Une photo carrée de côté <b>x</b> cm est entourée d'un cadre de <b>2 cm</b> de large.<br><br><b>Quelle est l'aire totale</b>, photo et cadre, développée ?`,
      reponse: `Le grand carré a pour côté x + 2 + 2 = x + 4.<br>(x + 4)² = x² + 2 × x × 4 + 4² = <span class="big">x² + 8x + 16</span>.`,
      consigne: "Développer (x + 4)².",
      verification: { type: "qcm", choix: ["x² + 16", "x² + 8x + 16", "x² + 4x + 16"], bonne: 1 },
      dessin: cadre,
    },
    {
      tag: "Énigme 3 · Le parking",
      titre: "99 × 101",
      question: `Un parking a <b>99 rangées</b> de <b>101 places</b>.<br><br><b>Combien de places</b> en tout ? Calcule de tête.`,
      reponse: `99 × 101 = (100 − 1)(100 + 1) = 100² − 1² = 10 000 − 1 = <span class="big">9 999 places</span>.`,
      consigne: "Combien font 99 × 101 ?",
      verification: { type: "courte", attendus: ["9999"], unite: "places" },
      dessin: parking(),
    },
    {
      tag: "Énigme 4 · Le carré évidé",
      titre: "x² − 49",
      question: `D'un carré de côté x, on retire un carré de côté 7 : il reste <b>x² − 49</b>.<br><br><b>Quel produit</b> est égal à x² − 49 ?`,
      reponse: `x² − 49 = x² − 7², de la forme a² − b² = (a − b)(a + b).<br>x² − 49 = <span class="big">(x − 7)(x + 7)</span>.<br>On peut le vérifier en développant.`,
      consigne: "Factoriser x² − 49.",
      verification: { type: "qcm", choix: ["(x − 7)(x + 7)", "(x − 7)²", "(x − 49)(x + 1)"], bonne: 0 },
      dessin: evide,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le carré d'une somme",
      sorte: "piege",
      question: `<b>Que vaut</b> (x + 3)² ?<br>A. x² + 9 B. x² + 3x + 9 C. x² + 6x + 9`,
      reponse: `(x + 3)² = (x + 3)(x + 3) = x² + 3x + 3x + 9 = <span class="big">x² + 6x + 9</span>.<br>Il ne faut pas oublier le double produit 2 × x × 3.<br>Test avec x = 1 : (1 + 3)² = 16, et 1 + 9 = 10 seulement.`,
      consigne: "Développer (x + 3)².",
      verification: { type: "qcm", choix: ["x² + 9", "x² + 3x + 9", "x² + 6x + 9"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Trois années",
      sorte: "defi",
      question: `<b>Sans calculatrice</b> : combien vaut 2025 × 2027 − 2026² ?`,
      reponse: `On pose n = 2026 : 2025 × 2027 = (n − 1)(n + 1) = n² − 1.<br>Donc n² − 1 − n² = <span class="big">−1</span>.<br>Le même résultat avec trois entiers qui se suivent, quels qu'ils soient !`,
      consigne: "Combien vaut 2025 × 2027 − 2026² ?",
      verification: { type: "courte", attendus: ["−1", "-1"] },
      dessin: defi,
    },
  ],
};

export default problemes;
