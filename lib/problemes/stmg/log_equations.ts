// Énigmes à projeter — STMG (Tle), résoudre aˣ = b avec le logarithme (le
// mytiliculteur, la conseillère en patrimoine, la société de leasing, le
// cirier, piège du laminoir de l'aciérie, défi du financement participatif).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

/** Une carte : trois lignes (la première en grand) et la question. */
const carte = (aria: string, lignes: string[], question: string, coul: string = C.bleu) =>
  svg(aria,
    r(50, 40, 380, 240, coul, 0.1, 3, 14) +
    lignes.map((s, k) => t(240, 105 + k * 70, s, k ? C.pale : C.craie, k ? 24 : 32)).join("") +
    t(240, 365, question, C.rose, 28));

const moules = carte("Le mytiliculteur : 2 puissance x égale 50",
  ["2ˣ = 50", "x = log(50) ÷ log(2)", "mytiliculteur"], `x${NB}≈${NB}?`);

const patrimoine = carte("La conseillère en patrimoine : 1,04 puissance x égale 1,5",
  ["1,04ˣ = 1,5", "on prend le log des deux côtés", "conseillère en patrimoine"], `quelle écriture${NB}?`, C.jaune);

const leasing = carte("La société de leasing : x au cube égale 1,331",
  ["x³ = 1,331", "x = 1,331^(1 ÷ 3)", "société de leasing"], `x${NB}=${NB}?`);

const cire = carte("Le cirier : 0,9 puissance n plus petit que 0,5",
  ["0,9ⁿ &lt; 0,5", "le stock baisse de 10 % par mois", "cirier"], `n${NB}=${NB}?`, C.jaune);

const laminoir = carte("Le laminoir de l'aciérie : 0,8 puissance n plus petit que 0,1",
  ["0,8ⁿ &lt; 0,1", "log(0,8) est négatif", "laminoir de l'aciérie"], `quels n${NB}?`);

const participatif = carte("Le financement participatif : 5 fois 1,2 puissance x égale 30",
  ["5 × 1,2ˣ = 30", "d'abord : 1,2ˣ = ?", "financement participatif"], `x${NB}≈${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "log_equations",
  titre: "Énigmes des équations avec log",
  description: "Le mytiliculteur, la conseillère en patrimoine, la société de leasing, le cirier, le piège du laminoir de l'aciérie, le défi du financement participatif : aˣ = b donne x = log(b) ÷ log(a), xⁿ = b donne x = b^(1/n), et le sens de l'inégalité change quand on divise par un log négatif.",
  problemes: [
    {
      tag: "Énigme 1 · Le mytiliculteur",
      titre: "Résoudre 2ˣ = 50",
      question: `Un mytiliculteur élève des moules.<br>Il cherche x tel que 2ˣ = 50.<br>On sait que x = log(50) ÷ log(2).<br><br><b>Combien vaut x, au centième près</b> ?`,
      reponse: `x = log(50) ÷ log(2) ≈ 1,699 ÷ 0,301.<br>x ≈ <span class="big">5,64</span>.<br>Vérification : 2^5,64 ≈ 50.`,
      consigne: "Combien vaut x, au centième près ?",
      verification: { type: "courte", attendus: ["5,64", "5.64", "5,6", "5,644"] },
      dessin: moules,
    },
    {
      tag: "Énigme 2 · La conseillère en patrimoine",
      titre: "La bonne écriture de x",
      question: `Une conseillère en patrimoine place de l'argent à 4 % par an.<br>Elle cherche quand le capital est multiplié par 1,5.<br>Il faut résoudre 1,04ˣ = 1,5.<br><br><b>Quelle écriture donne x</b> ?`,
      reponse: `On prend le log des deux côtés : x × log(1,04) = log(1,5).<br>Donc <span class="big">x = log(1,5) ÷ log(1,04)</span> ≈ 10,3.<br>Il faut environ 10,3 ans.`,
      consigne: "Quelle écriture donne x ?",
      verification: { type: "qcm", choix: ["x = log(1,5) ÷ log(1,04)", "x = 1,5 ÷ 1,04", "x = log(1,5 ÷ 1,04)"], bonne: 0 },
      dessin: patrimoine,
    },
    {
      tag: "Énigme 3 · La société de leasing",
      titre: "Résoudre x³ = 1,331",
      question: `Une société de leasing voit le prix d'une voiture multiplié par 1,331 en 3 ans.<br>Le coefficient annuel x vérifie x³ = 1,331.<br>On sait que x = 1,331^(1 ÷ 3).<br><br><b>Combien vaut x</b> ?`,
      reponse: `x = 1,331^(1 ÷ 3) = <span class="big">1,1</span>.<br>Vérification : 1,1 × 1,1 × 1,1 = 1,331.<br>Le prix monte de 10 % par an.`,
      consigne: "Combien vaut x ?",
      verification: { type: "courte", attendus: ["1,1", "1.1", "1,10"] },
      dessin: leasing,
    },
    {
      tag: "Énigme 4 · Le cirier",
      titre: "Une inéquation avec une puissance",
      question: `Un cirier a un stock de cire.<br>Le stock baisse de 10 % par mois.<br>Il cherche le premier mois n où 0,9ⁿ &lt; 0,5.<br><br><b>Quelle est la plus petite valeur de n</b> ?`,
      reponse: `n > log(0,5) ÷ log(0,9) ≈ 6,58.<br>Donc <span class="big">n = 7</span>.<br>Vérification : 0,9⁶ ≈ 0,53 et 0,9⁷ ≈ 0,48.`,
      consigne: "Quelle est la plus petite valeur de n ?",
      verification: { type: "qcm", choix: ["n = 6", "n = 7", "n = 5"], bonne: 1 },
      dessin: cire,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le laminoir de l'aciérie",
      sorte: "piege",
      question: `Un laminoir d'aciérie perd 20 % de sa valeur par an.<br>On cherche quand 0,8ⁿ &lt; 0,1.<br>Un stagiaire écrit : « n &lt; log(0,1) ÷ log(0,8) ≈ 10,3. »<br><br><b>Quelles valeurs de n conviennent vraiment</b> ?`,
      reponse: `log(0,8) est <b>négatif</b> : en divisant, le sens change.<br>n > 10,3, donc <span class="big">n ≥ 11</span>.<br>Vérification : 0,8¹⁰ ≈ 0,107 et 0,8¹¹ ≈ 0,086.`,
      consigne: "Quelles valeurs de n conviennent ?",
      verification: { type: "qcm", choix: ["n ≤ 10", "n ≥ 10", "n ≥ 11"], bonne: 2 },
      dessin: laminoir,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le financement participatif",
      sorte: "defi",
      question: `Un projet de financement participatif a 5 000 contributeurs.<br>Ce nombre est multiplié par 1,2 chaque mois.<br>On cherche quand on atteint 30 000 : 5 × 1,2ˣ = 30.<br><br><b>Combien vaut x, au centième près</b> ?`,
      reponse: `D'abord 1,2ˣ = 30 ÷ 5 = 6.<br>x = log(6) ÷ log(1,2) ≈ <span class="big">9,83</span>.<br>Il faut donc 10 mois.`,
      consigne: "Combien vaut x, au centième près ?",
      verification: { type: "courte", attendus: ["9,83", "9.83", "9,8", "10"] },
      dessin: participatif,
    },
  ],
};

export default problemes;
