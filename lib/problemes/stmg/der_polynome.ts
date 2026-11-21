// Énigmes à projeter — STMG (1re), notion dérivée des polynômes de degré ≤ 3
// (le sellier, la manufacture de porcelaine, la charcuterie, la teinturerie,
// piège des glacières, défi de l'audioprothésiste). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

const carte = (aria: string, f: string, aide: string, q: string, coul: string = C.bleu, taille = 30) =>
  svg(aria,
    r(30, 80, 420, 100, coul, 0.15, 3, 10) + t(240, 143, f, C.craie, taille) +
      t(240, 250, aide, C.pale, 22) + t(240, 340, q, C.rose, 30));

const sellier = carte("Le sellier : f de x égale 3 x au carré moins 12x plus 5 ; f prime de x ?", "f(x) = 3x² − 12x + 5", "x = selles par mois", `f′(x)${NB}=${NB}?`);
const porcelaine = carte("La manufacture de porcelaine : f de x égale x au cube moins 6 x au carré plus 9x ; f prime de x ?", "f(x) = x³ − 6x² + 9x", "x = centaines de tasses", `f′(x)${NB}=${NB}?`, C.jaune);
const charcuterie = carte("La charcuterie : f de x égale moins 2 x au carré plus 40x moins 100 ; f prime de 5 ?", "f(x) = −2x² + 40x − 100", "x = kilos de saucisses", `f′(5)${NB}=${NB}?`, C.bleu, 28);

const teinturerie = svg("La teinturerie : f de x égale x au cube moins 9 x au carré plus 24x ; Rose propose f prime de x égale 3 fois x moins 2 fois x moins 4",
  r(30, 60, 420, 90, C.jaune, 0.2, 3, 10) + t(240, 118, "f(x) = x³ − 9x² + 24x", C.craie, 30) +
    t(240, 220, "Rose propose :", C.pale, 22) + t(240, 270, "f′(x) = 3(x − 2)(x − 4)", C.craie, 28) +
    t(240, 360, `juste${NB}?`, C.rose, 30));

const glacieres = svg("Les glacières : f de x égale 5 x au carré moins 3x plus 8 ; Léo calcule f prime de 1 égale 15",
  r(30, 60, 420, 90, C.bleu, 0.15, 3, 10) + t(240, 118, "f(x) = 5x² − 3x + 8", C.craie, 30) +
    t(240, 215, "Léo : « f′(x) = 10x − 3 + 8 »", C.pale, 24) + t(240, 265, "« donc f′(1) = 15 »", C.pale, 24) +
    t(240, 360, "?", C.rose, 34));

const audio = svg("L'audioprothésiste : f de x égale x au cube moins 3 x au carré plus 4 ; pour quel a positif f prime de a égale 0 ?",
  r(30, 70, 420, 100, C.jaune, 0.2, 3, 10) + t(240, 133, "f(x) = x³ − 3x² + 4", C.craie, 30) +
    t(240, 240, "a > 0", C.pale, 26) + t(240, 340, `f′(a)${NB}=${NB}0 pour a${NB}=${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "der_polynome",
  titre: "Énigmes de dérivée d'un polynôme",
  description: "Le sellier, la manufacture de porcelaine, la charcuterie, la teinturerie, le piège des glacières, le défi de l'audioprothésiste : dériver un polynôme de degré 2 ou 3, calculer f′(a), vérifier une forme factorisée de la dérivée.",
  problemes: [
    {
      tag: "Énigme 1 · Le sellier",
      titre: "Un polynôme de degré 2",
      question: `Un sellier fabrique des selles de cheval.<br>Son coût est f(x) = 3x² − 12x + 5.<br><br><b>Quelle est la dérivée</b> f′(x) ?`,
      reponse: `3x² donne 6x. −12x donne −12.<br>Le 5 est une constante : il donne 0.<br>f′(x) = <span class="big">6x − 12</span>.`,
      consigne: "f(x) = 3x² − 12x + 5. Quelle est la dérivée f′(x) ?",
      verification: { type: "qcm", choix: ["6x − 12", "3x − 12", "6x − 7"], bonne: 0 },
      dessin: sellier,
    },
    {
      tag: "Énigme 2 · La manufacture de porcelaine",
      titre: "Un polynôme de degré 3",
      question: `Une manufacture de porcelaine fabrique des tasses.<br>Son bénéfice est f(x) = x³ − 6x² + 9x.<br><br><b>Quelle est la dérivée</b> f′(x) ?`,
      reponse: `x³ donne 3x². −6x² donne −12x. 9x donne 9.<br>f′(x) = <span class="big">3x² − 12x + 9</span>.`,
      consigne: "f(x) = x³ − 6x² + 9x. Quelle est la dérivée f′(x) ?",
      verification: { type: "qcm", choix: ["3x² − 6x + 9", "3x² − 12x + 9", "x² − 12x + 9"], bonne: 1 },
      dessin: porcelaine,
    },
    {
      tag: "Énigme 3 · La charcuterie",
      titre: "Calculer f′(a)",
      question: `Une charcuterie a un bénéfice f(x) = −2x² + 40x − 100.<br>x est le nombre de kilos de saucisses.<br><br><b>Que vaut f′(5)</b> ?`,
      reponse: `f′(x) = −4x + 40.<br>f′(5) = −4 × 5 + 40 = −20 + 40.<br>f′(5) = <span class="big">20</span>.`,
      consigne: "f(x) = −2x² + 40x − 100. Que vaut f′(5) ?",
      verification: { type: "courte", attendus: ["20"] },
      dessin: charcuterie,
    },
    {
      tag: "Énigme 4 · La teinturerie",
      titre: "Vérifier une forme factorisée",
      question: `Une teinturerie a un bénéfice f(x) = x³ − 9x² + 24x.<br>Rose propose : f′(x) = 3(x − 2)(x − 4).<br><br><b>A-t-elle raison</b> ?`,
      reponse: `On dérive : f′(x) = 3x² − 18x + 24.<br>On développe : 3(x − 2)(x − 4) = 3(x² − 6x + 8) = 3x² − 18x + 24.<br>C'est pareil : <span class="big">oui</span>.`,
      consigne: "f(x) = x³ − 9x² + 24x. Rose propose f′(x) = 3(x − 2)(x − 4). A-t-elle raison ?",
      verification: { type: "qcm", choix: ["non, il faut 3(x − 2)(x + 4)", "non, il manque + 24", "oui"], bonne: 2 },
      dessin: teinturerie,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les glacières",
      sorte: "piege",
      question: `Un vendeur de glacières a un coût f(x) = 5x² − 3x + 8.<br>Léo : « f′(x) = 10x − 3 + 8, donc f′(1) = 15. »<br><br><b>Que vaut vraiment f′(1)</b> ?`,
      reponse: `Le 8 est une constante : sa dérivée est 0.<br>f′(x) = 10x − 3.<br>f′(1) = 10 − 3 = <span class="big">7</span>.`,
      consigne: "f(x) = 5x² − 3x + 8. Que vaut vraiment f′(1) ?",
      verification: { type: "courte", attendus: ["7"] },
      dessin: glacieres,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'audioprothésiste",
      sorte: "defi",
      question: `Un audioprothésiste a un bénéfice f(x) = x³ − 3x² + 4.<br>x est en centaines d'appareils.<br><br><b>Pour quel nombre a &gt; 0</b> a-t-on f′(a) = 0 ?`,
      reponse: `f′(x) = 3x² − 6x = 3x(x − 2).<br>Un produit est nul si un facteur est nul : x = 0 ou x = 2.<br>Avec a &gt; 0 : a = <span class="big">2</span>.`,
      consigne: "f(x) = x³ − 3x² + 4. Pour quel nombre a > 0 a-t-on f′(a) = 0 ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: audio,
    },
  ],
};

export default problemes;
