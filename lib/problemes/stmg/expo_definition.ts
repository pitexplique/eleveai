// Énigmes à projeter — STMG (Tle), fonction x ↦ aˣ : définition (le cuisiniste,
// l'équipe d'e-sport, la plantation de piments de Saint-Joseph, les
// climatiseurs, piège de la crémerie en ligne, défi de la centrale de
// géothermie). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

/** Une carte : trois lignes (la première en grand) et la question. */
const carte = (aria: string, lignes: string[], question: string, coul: string = C.bleu) =>
  svg(aria,
    r(50, 40, 380, 240, coul, 0.1, 3, 14) +
    lignes.map((s, k) => t(240, 105 + k * 70, s, k ? C.pale : C.craie, k ? 24 : 32)).join("") +
    t(240, 365, question, C.rose, 28));

const cuisiniste = svg("Le cuisiniste : trois formules, A f de x égale x au carré, B f de x égale 1,2 puissance x, C f de x égale 2 x ; laquelle est exponentielle ?",
  ["A", "B", "C"].map((n, k) =>
    r(40, 30 + k * 100, 400, 80, C.bleu, 0.1, 3, 12) + t(85, 82 + k * 100, n, C.jaune, 30) +
    t(270, 82 + k * 100, ["f(x) = x²", "f(x) = 1,2ˣ", "f(x) = 2x"][k], C.craie, 30)).join("") +
    t(240, 395, `laquelle est exponentielle${NB}?`, C.rose, 26));

const R1 = repereXY(0, 3.5, 0, 10, { px: 1, py: 2 });
const esport = svg("L'équipe d'e-sport : la courbe de f de x égale 2 puissance x, en milliers d'abonnés ; elle part de 1 et monte ; point d'interrogation en x égale 3",
  R1.fond + R1.courbe((x) => Math.pow(2, x), 0, 3.3, C.bleu, 4) +
    l(R1.X(3), R1.Y(0), R1.X(3), R1.Y(8), C.rose, 2, "8 6") + t(R1.X(3) - 14, R1.Y(8) + 10, "?", C.rose, 28, "end") +
    t(R1.X(0) + 8, 24, "milliers d'abonnés", C.pale, 17, "start") + t(462, R1.Y(0) + 46, "années", C.pale, 18, "end") +
    t(205, 110, "f(x) = 2ˣ", C.craie, 26) + t(240, 405, `f(3)${NB}=${NB}?`, C.rose, 26));

const piments = carte("La plantation de piments de Saint-Joseph : f de x égale 4 puissance x tonnes ; x égale 0,5 an ; f de 0,5 ?",
  ["f(x) = 4ˣ", "récolte en tonnes", "x = 0,5 an (six mois)"], `f(0,5)${NB}=${NB}?`, C.jaune);

const clim = carte("Les climatiseurs : f de x égale 2 puissance x milliers ; x en années depuis 2026 ; en 2023, x égale moins 3",
  ["f(x) = 2ˣ", "milliers de climatiseurs", "2023 : x = −3"], `f(−3)${NB}=${NB}?`);

const cremerie = carte("La crémerie en ligne : f de x égale 3 puissance x centaines de fromages ; le stagiaire dit f de 2 égale 6",
  ["f(x) = 3ˣ", "le stagiaire : f(2) = 6", "centaines de fromages"], `f(2)${NB}=${NB}?`);

const geothermie = carte("La centrale de géothermie : f de x égale a puissance x ; f de 2 égale 1,44 ; a positif ; a ?",
  ["f(x) = aˣ, a > 0", "f(2) = 1,44", "production × aˣ"], `a${NB}=${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "expo_definition",
  titre: "Énigmes de la fonction x ↦ aˣ",
  description: "Le cuisiniste, l'équipe d'e-sport, la plantation de piments de Saint-Joseph, les climatiseurs, le piège de la crémerie en ligne, le défi de la centrale de géothermie : reconnaître une fonction exponentielle, calculer une image, même pour x décimal ou négatif, et retrouver a.",
  problemes: [
    {
      tag: "Énigme 1 · Le cuisiniste",
      titre: "Reconnaître une exponentielle",
      question: `Un cuisiniste teste trois formules pour prévoir ses ventes.<br>Dans une fonction exponentielle, x est en <b>exposant</b>.<br><br><b>Laquelle est une fonction exponentielle</b> ?`,
      reponse: `Dans f(x) = 1,2ˣ, la variable x est en exposant et 1,2 > 0.<br>C'est la formule <span class="big">B</span>.<br>x² est une fonction carré, 2x une fonction affine.`,
      consigne: "Laquelle est exponentielle ?",
      verification: { type: "qcm", choix: ["A : f(x) = x²", "B : f(x) = 1,2ˣ", "C : f(x) = 2x"], bonne: 1 },
      dessin: cuisiniste,
    },
    {
      tag: "Énigme 2 · L'équipe d'e-sport",
      titre: "Calculer une image",
      question: `Une équipe d'e-sport a 1 000 abonnés au départ.<br>Après x années, elle en a f(x) = 2ˣ milliers.<br><br><b>Combien de milliers d'abonnés</b> au bout de 3 ans ?`,
      reponse: `f(3) = 2³ = 2 × 2 × 2 = <span class="big">8</span> milliers, soit 8 000 abonnés.<br>Chaque année, le nombre d'abonnés double.`,
      consigne: "Combien de milliers d'abonnés ?",
      verification: { type: "courte", attendus: ["8", "8 milliers", "8000", "8 000"] },
      dessin: esport,
    },
    {
      tag: "Énigme 3 · La plantation de piments",
      titre: "Un exposant décimal",
      question: `Une plantation de piments, à Saint-Joseph, suit f(x) = 4ˣ tonnes.<br>x est en années ; la fonction marche aussi entre deux années.<br>Avec la calculatrice : 4<sup>0,5</sup>.<br><br><b>Combien de tonnes</b> au bout de six mois (x = 0,5) ?`,
      reponse: `f(0,5) = 4<sup>0,5</sup> = <span class="big">2</span> tonnes.<br>Contrôle : 2 × 2 = 4, donc deux fois six mois donnent bien × 4 en un an.`,
      consigne: "Combien de tonnes ?",
      verification: { type: "qcm", choix: ["2", "8", "0,5"], bonne: 0 },
      dessin: piments,
    },
    {
      tag: "Énigme 4 · Les climatiseurs",
      titre: "Un exposant négatif",
      question: `Une marque vend f(x) = 2ˣ milliers de climatiseurs, x en années depuis 2026.<br>En 2023, x = −3.<br>On sait que 2⁻³ = 1 ÷ 2³.<br><br><b>Combien de milliers</b> en 2023 ?`,
      reponse: `f(−3) = 2⁻³ = 1 ÷ 2³ = 1 ÷ 8 = <span class="big">0,125</span> millier, soit 125 climatiseurs.`,
      consigne: "Combien de milliers ?",
      verification: { type: "courte", attendus: ["0,125", "0.125", "1/8", "125"] },
      dessin: clim,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La crémerie en ligne",
      sorte: "piege",
      question: `Une crémerie en ligne vend f(x) = 3ˣ centaines de fromages, x en mois.<br>Le stagiaire calcule : f(2) = 3 × 2 = 6.<br><br><b>Que vaut vraiment f(2)</b> ?`,
      reponse: `3² veut dire 3 × 3, pas 3 × 2.<br>f(2) = 3² = <span class="big">9</span> centaines de fromages.`,
      consigne: "Que vaut f(2) ?",
      verification: { type: "qcm", choix: ["6", "5", "9"], bonne: 2 },
      dessin: cremerie,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La centrale de géothermie",
      sorte: "defi",
      question: `La production d'une centrale de géothermie est multipliée par f(x) = aˣ au bout de x années (a > 0).<br>Au bout de 2 ans, elle est multipliée par 1,44.<br><br><b>Que vaut a</b> ?`,
      reponse: `a² = 1,44 et a > 0, donc a = <span class="big">1,2</span>.<br>Vérification : 1,2 × 1,2 = 1,44.<br>La production augmente de 20 % par an.`,
      consigne: "Que vaut a ?",
      verification: { type: "courte", attendus: ["1,2", "1.2", "a = 1,2"] },
      dessin: geothermie,
    },
  ],
};

export default problemes;
