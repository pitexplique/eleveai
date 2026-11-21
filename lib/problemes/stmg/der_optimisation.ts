// Énigmes à projeter — STMG (1re), notion dérivée : problème d'optimisation
// (la rôtisserie, le fabricant de jantes, le cabinet dentaire, la société de
// surveillance, piège de la parapharmacie, défi du vannier). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

// B(x) = −2x² + 80x − 300 sur [0 ; 40] ; sommet (20 ; 500).
const RB = repereXY(0, 40, 0, 600, { px: 5, py: 100, ey: 200, ex: 10 });
const rotisserie = svg("La rôtisserie : B de x égale moins 2 x au carré plus 80x moins 300 ; la courbe monte puis descend, sommet en 20",
  RB.fond + RB.courbe((x) => -2 * x * x + 80 * x - 300, 7, 33, C.bleu, 4) +
    t(RB.X(0) + 8, 24, "B(x) en €", C.pale, 17, "start") + t(462, RB.Y(0) - 10, "poulets", C.pale, 18, "end") +
    t(240, 400, `B′(x)${NB}=${NB}−4x${NB}+${NB}80`, C.rose, 26));

const jantes = svg("Le fabricant de jantes : C de x égale x au carré moins 10x plus 40 ; quel x rend le coût minimal ?",
  r(40, 70, 400, 100, C.jaune, 0.2, 3, 10) + t(240, 133, "C(x) = x² − 10x + 40", C.craie, 32) +
    t(240, 240, "x = centaines de jantes", C.pale, 22) + t(240, 340, `coût minimal pour x${NB}=${NB}?`, C.rose, 26));

const dentaire = svg("Le cabinet dentaire : B prime de 30 égale 0, B est maximal en 30, B de 30 égale 1 200 euros",
  r(40, 60, 400, 140, C.bleu, 0.15, 3, 10) + t(240, 115, "B′(30) = 0 · maximum en 30", C.craie, 26) +
    t(240, 165, "B(30) = 1 200 €", C.craie, 28) +
    t(240, 270, "x = séances de blanchiment", C.pale, 22) + t(240, 350, `la bonne phrase${NB}?`, C.rose, 28));

const surveillance = svg("La société de surveillance : B de x égale moins x au cube plus 6 x au carré, x entre 0 et 6 ; le bénéfice maximal ?",
  r(30, 70, 420, 100, C.jaune, 0.2, 3, 10) + t(240, 133, "B(x) = −x³ + 6x²", C.craie, 32) +
    t(240, 240, "x entre 0 et 6 · B en milliers d'€", C.pale, 21) + t(240, 340, `bénéfice maximal${NB}?`, C.rose, 28));

const parapharmacie = svg("La parapharmacie : B prime de x égale moins 2x plus 60, x entre 0 et 20 ; Léo dit que le maximum est en 30",
  r(40, 60, 400, 90, C.bleu, 0.15, 3, 10) + t(240, 118, "B′(x) = −2x + 60", C.craie, 32) +
    t(240, 200, "x entre 0 et 20 (stock limité)", C.pale, 22) +
    t(240, 265, "Léo : « maximum en x = 30 »", C.pale, 24) + t(240, 360, "?", C.rose, 34));

const vannier = svg("Le vannier : recette x fois 50 moins x, coût 10x plus 100 ; le bénéfice maximal ?",
  r(30, 50, 420, 80, C.jaune, 0.2, 3, 10) + t(240, 100, "recette : R(x) = x(50 − x)", C.craie, 26) +
    r(30, 150, 420, 80, C.bleu, 0.15, 3, 10) + t(240, 200, "coût : C(x) = 10x + 100", C.craie, 26) +
    t(240, 290, "x = paniers par semaine", C.pale, 22) + t(240, 365, `bénéfice maximal${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "der_optimisation",
  titre: "Énigmes d'optimisation",
  description: "La rôtisserie, le fabricant de jantes, le cabinet dentaire, la société de surveillance, le piège de la parapharmacie, le défi du vannier : trouver la production qui rend un bénéfice maximal ou un coût minimal, et répondre par une phrase.",
  problemes: [
    {
      tag: "Énigme 1 · La rôtisserie",
      titre: "Le bénéfice maximal",
      question: `Une rôtisserie vend x poulets par jour.<br>Son bénéfice est B(x) = −2x² + 80x − 300, en euros.<br>B′(x) = −4x + 80.<br><br><b>Pour combien de poulets</b> le bénéfice est-il maximal ?`,
      reponse: `−4x + 80 = 0 pour x = 20.<br>Avant 20, B′ &gt; 0. Après 20, B′ &lt; 0.<br>Le bénéfice est maximal pour <span class="big">20 poulets</span>.`,
      consigne: "B′(x) = −4x + 80. Pour combien de poulets le bénéfice est-il maximal ?",
      verification: { type: "qcm", choix: ["20", "40", "80"], bonne: 0 },
      dessin: rotisserie,
    },
    {
      tag: "Énigme 2 · Le fabricant de jantes",
      titre: "Le coût minimal",
      question: `Un fabricant de jantes a un coût C(x) = x² − 10x + 40.<br>x est en centaines de jantes.<br><br><b>Pour quelle valeur de x</b> le coût est-il minimal ?`,
      reponse: `C′(x) = 2x − 10. Il vaut 0 pour x = 5.<br>Avant 5, C′ &lt; 0. Après 5, C′ &gt; 0.<br>Coût minimal pour x = <span class="big">5</span> (500 jantes).`,
      consigne: "C(x) = x² − 10x + 40. Pour quelle valeur de x le coût est-il minimal ?",
      verification: { type: "qcm", choix: ["10", "5", "15"], bonne: 1 },
      dessin: jantes,
    },
    {
      tag: "Énigme 3 · Le cabinet dentaire",
      titre: "Conclure par une phrase",
      question: `Un cabinet dentaire fait x séances de blanchiment par mois.<br>Son bénéfice B est maximal en x = 30. B(30) = 1 200 €.<br><br><b>Quelle phrase</b> répond au problème ?`,
      reponse: `30, c'est le nombre de séances. 1 200 €, c'est le bénéfice.<br>La bonne phrase : <span class="big">avec 30 séances, le bénéfice maximal est 1 200 €</span>.`,
      consigne: "B est maximal en x = 30 et B(30) = 1 200 €. Quelle phrase répond au problème ?",
      verification: {
        type: "qcm",
        choix: ["Le bénéfice maximal est 30 €.", "Il faut faire 1 200 séances.", "Avec 30 séances, le bénéfice maximal est 1 200 €."],
        bonne: 2,
      },
      dessin: dentaire,
    },
    {
      tag: "Énigme 4 · La société de surveillance",
      titre: "Un bénéfice de degré 3",
      question: `Une société de surveillance signe x dizaines de contrats, x entre 0 et 6.<br>Son bénéfice est B(x) = −x³ + 6x², en milliers d'euros.<br><br><b>Quel est le bénéfice maximal</b> ?`,
      reponse: `B′(x) = −3x² + 12x = −3x(x − 4).<br>Sur [0 ; 4], B′ &gt; 0. Sur [4 ; 6], B′ &lt; 0. Maximum en 4.<br>B(4) = −64 + 96 = <span class="big">32</span> milliers d'euros.`,
      consigne: "B(x) = −x³ + 6x², x entre 0 et 6. Quel est le bénéfice maximal, en milliers d'euros ?",
      verification: { type: "courte", attendus: ["32"], unite: "milliers d'€" },
      dessin: surveillance,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La parapharmacie",
      sorte: "piege",
      question: `Une parapharmacie vend x cartons de crème, x entre 0 et 20.<br>B′(x) = −2x + 60.<br>Léo : « B′ s'annule en 30, donc le maximum est en x = 30. »<br><br><b>Où est vraiment le maximum</b> ?`,
      reponse: `30 n'est pas entre 0 et 20 !<br>Pour x entre 0 et 20, −2x + 60 &gt; 0 : B monte tout le temps.<br>Le maximum est au bout : x = <span class="big">20</span>.`,
      consigne: "B′(x) = −2x + 60, x entre 0 et 20. Où est vraiment le maximum ?",
      verification: { type: "courte", attendus: ["20"] },
      dessin: parapharmacie,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le vannier",
      sorte: "defi",
      question: `Un vannier vend x paniers par semaine.<br>Sa recette est R(x) = x(50 − x). Son coût est C(x) = 10x + 100, en euros.<br><br><b>Quel est son bénéfice maximal</b> ?`,
      reponse: `B(x) = R(x) − C(x) = 50x − x² − 10x − 100 = −x² + 40x − 100.<br>B′(x) = −2x + 40 = 0 pour x = 20.<br>B(20) = −400 + 800 − 100 = <span class="big">300 €</span>.`,
      consigne: "R(x) = x(50 − x), C(x) = 10x + 100. Quel est le bénéfice maximal ?",
      verification: { type: "courte", attendus: ["300"], unite: "€" },
      dessin: vannier,
    },
  ],
};

export default problemes;
