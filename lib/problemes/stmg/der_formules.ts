// Énigmes à projeter — STMG (1re), notion dérivée : les formules de base (le
// luthier, la tonnellerie, le plâtrier, la poissonnerie, piège de la
// quincaillerie, défi de la rhumerie de Saint-André (974)). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

/** Une carte : la fonction en grand, une ligne d'explication, la question en rose. */
const carte = (aria: string, f: string, aide: string, q: string, coul = C.bleu, taille = 34) =>
  svg(aria,
    r(50, 80, 380, 100, coul, 0.15, 3, 10) + t(240, 145, f, C.craie, taille) +
      t(240, 250, aide, C.pale, 22) + t(240, 340, q, C.rose, 30));

const luthier = carte("Le luthier : f de x égale x au carré ; f prime de x ?", "f(x) = x²", "x = longueur, en dm", `f′(x)${NB}=${NB}?`);
const tonnellerie = carte("La tonnellerie : g de x égale x au cube ; g prime de x ?", "g(x) = x³", "x = côté du fût, en m", `g′(x)${NB}=${NB}?`, C.jaune);
const platrier = carte("Le plâtrier : h de x égale 5 x au carré ; h prime de x ?", "h(x) = 5x²", "x = surface, en dizaines de m²", `h′(x)${NB}=${NB}?`);
const poissonnerie = carte("La poissonnerie : C de x égale x au carré plus 3x ; C prime de x ?", "C(x) = x² + 3x", "x = kilos de poisson", `C′(x)${NB}=${NB}?`, C.jaune);

const quincaillerie = svg("La quincaillerie : f de x égale x au carré plus 7 ; Léo dit que f prime de x égale 2x plus 7",
  r(50, 70, 380, 100, C.bleu, 0.15, 3, 10) + t(240, 135, "f(x) = x² + 7", C.craie, 34) +
    t(240, 240, "Léo : « f′(x) = 2x + 7 »", C.pale, 26) + t(240, 350, "?", C.rose, 34));

const rhumerie = svg("La rhumerie : f de x égale 2 x au cube plus 3 x au carré ; f prime de 2 ?",
  r(40, 70, 400, 100, C.jaune, 0.2, 3, 10) + t(240, 135, "f(x) = 2x³ + 3x²", C.craie, 34) +
    t(240, 240, "x = milliers de bouteilles", C.pale, 22) + t(240, 340, `f′(2)${NB}=${NB}?`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "der_formules",
  titre: "Énigmes des formules de dérivée",
  description: "Le luthier, la tonnellerie, le plâtrier, la poissonnerie, le piège de la quincaillerie, le défi de la rhumerie de Saint-André : dériver x², x³, k × f et une somme, puis calculer un nombre dérivé.",
  problemes: [
    {
      tag: "Énigme 1 · Le luthier",
      titre: "Dériver la fonction carré",
      question: `Un luthier étudie la fonction f(x) = x².<br><br><b>Quelle est sa dérivée</b> f′(x) ?`,
      reponse: `La formule : la dérivée de x² est 2x.<br>On descend le 2 devant, on enlève 1 à l'exposant.<br>f′(x) = <span class="big">2x</span>.`,
      consigne: "f(x) = x². Quelle est sa dérivée f′(x) ?",
      verification: { type: "qcm", choix: ["x", "2x", "x²"], bonne: 1 },
      dessin: luthier,
    },
    {
      tag: "Énigme 2 · La tonnellerie",
      titre: "Dériver la fonction cube",
      question: `Une tonnellerie fabrique des fûts en bois.<br>Elle étudie la fonction g(x) = x³.<br><br><b>Quelle est sa dérivée</b> g′(x) ?`,
      reponse: `La formule : la dérivée de x³ est 3x².<br>Le 3 descend devant, l'exposant devient 2.<br>g′(x) = <span class="big">3x²</span>.`,
      consigne: "g(x) = x³. Quelle est sa dérivée g′(x) ?",
      verification: { type: "qcm", choix: ["3x²", "3x", "x²"], bonne: 0 },
      dessin: tonnellerie,
    },
    {
      tag: "Énigme 3 · Le plâtrier",
      titre: "Un nombre devant",
      question: `Un plâtrier calcule son coût avec h(x) = 5x².<br><br><b>Quelle est la dérivée</b> h′(x) ?`,
      reponse: `Le 5 reste devant.<br>La dérivée de x² est 2x.<br>h′(x) = 5 × 2x = <span class="big">10x</span>.`,
      consigne: "h(x) = 5x². Quelle est la dérivée h′(x) ?",
      verification: { type: "courte", attendus: ["10x", "10*x", "10×x"] },
      dessin: platrier,
    },
    {
      tag: "Énigme 4 · La poissonnerie",
      titre: "Dériver une somme",
      question: `Une poissonnerie a un coût C(x) = x² + 3x, en euros.<br>x est le nombre de kilos de poisson.<br><br><b>Quelle est la dérivée</b> C′(x) ?`,
      reponse: `On dérive chaque morceau.<br>x² donne 2x. 3x donne 3.<br>C′(x) = <span class="big">2x + 3</span>.`,
      consigne: "C(x) = x² + 3x. Quelle est la dérivée C′(x) ?",
      verification: { type: "qcm", choix: ["2x + 3x", "x + 3", "2x + 3"], bonne: 2 },
      dessin: poissonnerie,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La quincaillerie",
      sorte: "piege",
      question: `Une quincaillerie a un coût f(x) = x² + 7.<br>Léo : « f′(x) = 2x + 7. »<br><br><b>Quelle est la bonne dérivée</b> f′(x) ?`,
      reponse: `7 est une constante. Elle ne bouge pas.<br>La dérivée d'une constante est 0.<br>f′(x) = 2x + 0 = <span class="big">2x</span>.`,
      consigne: "f(x) = x² + 7. Quelle est la bonne dérivée f′(x) ?",
      verification: { type: "courte", attendus: ["2x", "2*x", "2×x"] },
      dessin: quincaillerie,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La rhumerie de Saint-André",
      sorte: "defi",
      question: `Une rhumerie de Saint-André (974) a un coût f(x) = 2x³ + 3x².<br>x est en milliers de bouteilles.<br><br><b>Que vaut f′(2)</b> ?`,
      reponse: `2x³ donne 2 × 3x² = 6x². 3x² donne 3 × 2x = 6x.<br>f′(x) = 6x² + 6x.<br>f′(2) = 6 × 4 + 6 × 2 = 24 + 12 = <span class="big">36</span>.`,
      consigne: "f(x) = 2x³ + 3x². Que vaut f′(2) ?",
      verification: { type: "courte", attendus: ["36"] },
      dessin: rhumerie,
    },
  ],
};

export default problemes;
