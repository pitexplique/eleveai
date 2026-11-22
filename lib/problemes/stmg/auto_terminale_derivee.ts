// Énigmes à projeter — STMG (Tle), automatismes de terminale : dérivée et
// tangente (le fabricant de lits, le tapis roulant, la location de tracteurs,
// le bijoutier, piège du facteur d'orgues, défi du fabricant de vitres). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";

/** Une fonction en grand (jaune), une aide (bleu) et la question (rose). */
const carte = (aria: string, f: string, aides: string[], question: string) =>
  svg(aria,
    r(30, 40, 420, 80, C.jaune, 0.12, 3) + t(240, 92, f, C.craie, 27) +
      aides.map((s, k) => t(240, 185 + 44 * k, s, C.bleu, 23)).join("") +
      t(240, 375, question, C.rose, 27));

const lits = carte("Fabricant de lits : C(x) = x³ − 6x² + 15x + 20 ; dérivée ?",
  "C(x) = x³ − 6x² + 15x + 20", ["(xⁿ)′ = n xⁿ⁻¹", "la constante disparaît"], `C′(x)${NB}?`);

const tapis = carte("Tapis roulant : f(x) = 2x² − 3x + 1 ; coefficient directeur de la tangente en x = 2",
  "f(x) = 2x² − 3x + 1", ["tangente en x = 2", "coefficient = f′(2)"], `f′(2)${NB}?`);

const tracteurs = carte("Location de tracteurs : R(x) = −x² + 10x ; coefficient de la tangente en x = 3",
  "R(x) = −x² + 10x", ["tangente en x = 3"], `coefficient${NB}?`);

/** Le bijoutier : courbe y = x²/8 + 0,5, tangente en x = 2 : y = 0,5x. */
const X = (x: number) => 60 + 60 * x, Y = (y: number) => 360 - 60 * y;
const pts = Array.from({ length: 13 }, (_, k) => k / 2).map((x) => `${X(x)} ${Y(x * x / 8 + 0.5).toFixed(1)}`);
const bijoutier = svg("Bijoutier : une courbe et sa tangente au point A d'abscisse 2 ; on avance de 2, on monte de 1 ; coefficient directeur ?",
  [1, 2, 3, 4, 5, 6].map((k) => l(X(k), Y(0), X(k), Y(5), C.pale, 1)).join("") +
    [1, 2, 3, 4, 5].map((k) => l(X(0), Y(k), X(6), Y(k), C.pale, 1)).join("") +
    l(X(0), Y(0), X(6.3), Y(0), C.craie, 3) + l(X(0), Y(0), X(0), Y(5.3), C.craie, 3) +
    [0, 1, 2, 3, 4, 5, 6].map((k) => t(X(k), 388, k, C.pale, 20)).join("") +
    [1, 2, 3, 4, 5].map((k) => t(42, Y(k) + 7, k, C.pale, 20)).join("") +
    p("M" + pts.join(" L"), C.bleu, 4) +
    l(X(0), Y(0), X(6), Y(3), C.jaune, 3) +
    l(X(2), Y(1), X(4), Y(1), C.rose, 3, "8 6") + l(X(4), Y(1), X(4), Y(2), C.rose, 3, "8 6") +
    `<circle cx="${X(2)}" cy="${Y(1)}" r="7" fill="${C.bleu}"/>` + t(X(2) - 4, Y(1) - 16, "A", C.bleu, 24) +
    t(X(3), Y(1) + 30, "+ 2", C.rose, 22) + t(X(4) + 10, Y(1.5) + 8, "+ 1", C.rose, 22, "start") +
    t(200, 100, `coefficient${NB}?`, C.rose, 27));

const orgues = carte("Facteur d'orgues : C(x) = x³ ; coefficient de la tangente en x = 2",
  "C(x) = x³", ["tangente en x = 2"], `coefficient${NB}?`);

const vitres = svg("Fabricant de vitres : f(x) = x² − 4x + 7 ; en quel x la tangente est-elle horizontale ?",
  r(30, 40, 420, 80, C.jaune, 0.12, 3) + t(240, 92, "f(x) = x² − 4x + 7", C.craie, 27) +
    l(130, 230, 350, 230, C.bleu, 4) + o(240, 230, 7, C.bleu, 1, 2) +
    t(240, 280, "tangente horizontale", C.bleu, 23) +
    t(240, 375, `x${NB}?`, C.rose, 27));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_terminale_derivee",
  titre: "Énigmes des automatismes de terminale : dérivée et tangente",
  description: "Le fabricant de lits, le tapis roulant, la location de tracteurs, le bijoutier, le piège du facteur d'orgues, le défi du fabricant de vitres : dériver un polynôme, calculer le coefficient directeur d'une tangente avec la dérivée ou sur un graphique.",
  problemes: [
    {
      tag: "Énigme 1 · Le fabricant de lits",
      titre: "Dériver un polynôme",
      question: `Un fabricant de lits calcule son coût : C(x) = x³ − 6x² + 15x + 20.<br><br><b>Quelle est la dérivée</b> C′(x) ?`,
      reponse: `x³ donne 3x² ; −6x² donne −12x ; 15x donne 15 ; 20 donne 0.<br>C′(x) = <span class="big">3x² − 12x + 15</span>.`,
      consigne: "Quelle est la dérivée C′(x) ?",
      verification: { type: "qcm", choix: ["3x² − 12x + 15", "3x² − 6x + 15", "x² − 12x + 15"], bonne: 0 },
      dessin: lits,
    },
    {
      tag: "Énigme 2 · Le tapis roulant",
      titre: "Le coefficient avec la dérivée",
      question: `Un fabricant de tapis roulants étudie la courbe de f(x) = 2x² − 3x + 1.<br><br><b>Quel est le coefficient directeur</b> de la tangente au point d'abscisse 2 ?`,
      reponse: `f′(x) = 4x − 3.<br>Le coefficient est f′(2) = 4 × 2 − 3 = <span class="big">5</span>.`,
      consigne: "Quel est le coefficient directeur de la tangente en x = 2 ?",
      verification: { type: "courte", attendus: ["5"] },
      dessin: tapis,
    },
    {
      tag: "Énigme 3 · La location de tracteurs",
      titre: "Une recette qui monte",
      question: `Une société loue des tracteurs. Sa recette est R(x) = −x² + 10x, en centaines d'euros.<br><br><b>Quel est le coefficient directeur</b> de la tangente au point d'abscisse 3 ?`,
      reponse: `R′(x) = −2x + 10.<br>R′(3) = −6 + 10 = <span class="big">4</span>.<br>Attention : 21, c'est R(3), le point, pas le coefficient.`,
      consigne: "Quel est le coefficient directeur de la tangente en x = 3 ?",
      verification: { type: "qcm", choix: ["21", "4", "10"], bonne: 1 },
      dessin: tracteurs,
    },
    {
      tag: "Énigme 4 · Le bijoutier",
      titre: "Lire le coefficient",
      question: `Un bijoutier trace la courbe de son coût et sa tangente au point A.<br>Sur la tangente, on avance de 2 carreaux et on monte de 1 carreau.<br><br><b>Quel est le coefficient directeur</b> de la tangente ?`,
      reponse: `Coefficient = ce qu'on monte ÷ ce qu'on avance.<br>1 ÷ 2 = <span class="big">0,5</span>.`,
      consigne: "Quel est le coefficient directeur de la tangente ?",
      verification: { type: "qcm", choix: ["2", "1", "0,5"], bonne: 2 },
      dessin: bijoutier,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le facteur d'orgues",
      sorte: "piege",
      question: `Un facteur d'orgues modélise un coût par C(x) = x³.<br>Il dit : « la tangente en x = 2 a pour coefficient 2³ = 8 ».<br><br><b>Quel est le bon coefficient</b> ?`,
      reponse: `8, c'est C(2) : la hauteur du point.<br>Le coefficient, c'est C′(2), avec C′(x) = 3x².<br>C′(2) = 3 × 4 = <span class="big">12</span>.`,
      consigne: "Quel est le coefficient directeur de la tangente en x = 2 ?",
      verification: { type: "courte", attendus: ["12"] },
      dessin: orgues,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le fabricant de vitres",
      sorte: "defi",
      question: `Un fabricant de vitres étudie la courbe de f(x) = x² − 4x + 7.<br>En un point, la tangente est horizontale.<br><br><b>Quelle est l'abscisse x</b> de ce point ?`,
      reponse: `Tangente horizontale : coefficient 0, donc f′(x) = 0.<br>f′(x) = 2x − 4 = 0, donc x = <span class="big">2</span>.`,
      consigne: "Quelle est l'abscisse du point ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: vitres,
    },
  ],
};

export default problemes;
