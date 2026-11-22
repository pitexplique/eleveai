// Énigmes à projeter — STMG (1re), notion degré 2 : axe de symétrie et extremum
// (la sandwicherie, la fabrique de pâtes fraîches, la maroquinerie, le
// fabricant de stores, piège de l'agence de traduction, défi de la brocante).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const R1 = repereXY(0, 10, -8, 10, { px: 1, py: 2, ex: 100, ey: 4 });
const sandwicherie = svg("Le bénéfice de la sandwicherie : une parabole tournée vers le bas qui coupe l'axe en 2 et en 8",
  R1.fond + R1.courbe((x) => -(x - 2) * (x - 8), 1, 9, C.bleu, 5) +
    R1.point(2, 0, C.rose, 7) + R1.point(8, 0, C.rose, 7) +
    t(R1.X(2) - 10, R1.Y(0) - 10, "2", C.craie, 20, "end") + t(R1.X(8) + 10, R1.Y(0) - 10, "8", C.craie, 20, "start") +
    t(R1.X(0) + 8, 24, "bénéfice", C.pale, 17, "start") +
    t(240, 400, `axe de symétrie${NB}?`, C.rose, 26));

const pates = svg("La fabrique de pâtes fraîches : C de x égale x au carré moins 6x plus 10 ; C de 0 égale 10",
  r(50, 60, 380, 90, C.bleu, 0.15, 3, 10) + t(240, 118, "C(x) = x² − 6x + 10", C.craie, 30) +
    t(240, 210, "C(0) = 10", C.pale, 26) + t(240, 260, `C(x) = 10 pour x = 0 et x = ?`, C.pale, 22) +
    t(240, 350, `axe : x${NB}=${NB}?`, C.rose, 28));

const maroquinerie = svg("La maroquinerie : B de x égale moins x au carré plus 8x",
  r(60, 80, 360, 100, C.jaune, 0.2, 3, 10) + t(240, 145, "B(x) = −x² + 8x", C.craie, 32) +
    t(240, 250, "en milliers d'euros", C.pale, 22) + t(240, 330, `bénéfice maximal${NB}?`, C.rose, 26));

const stores = svg("Le fabricant de stores : B de x égale moins 2 fois x moins 3 fois x moins 11",
  r(30, 80, 420, 100, C.bleu, 0.15, 3, 10) + t(240, 145, "B(x) = −2(x − 3)(x − 11)", C.craie, 30) +
    t(240, 250, "parabole tournée vers le bas", C.pale, 22) + t(240, 330, `le sommet${NB}?`, C.rose, 28));

const traduction = svg("L'agence de traduction : B de x égale moins x plus 2 fois x moins 6 ; Inès dit axe x égale 4",
  r(40, 70, 400, 100, C.jaune, 0.2, 3, 10) + t(240, 135, "B(x) = −(x + 2)(x − 6)", C.craie, 30) +
    t(240, 240, "Inès : « racines 2 et 6 »", C.pale, 24) + t(240, 290, "« donc axe x = 4 »", C.pale, 24) +
    t(240, 370, "?", C.rose, 34));

const brocante = svg("La brocante : f de 2 égale f de 10 ; f de 3 égale 40 ; f de quel autre x égale 40 ?",
  r(70, 60, 340, 80, C.bleu, 0.15, 3, 10) + t(240, 112, "f(2) = f(10)", C.craie, 30) +
    r(70, 165, 340, 80, C.jaune, 0.2, 3, 10) + t(240, 217, "f(3) = 40", C.craie, 30) +
    t(240, 330, `f(?)${NB}=${NB}40`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "fct_degre2_symetrie",
  titre: "Énigmes de sommets",
  description: "La sandwicherie, la fabrique de pâtes fraîches, la maroquinerie, le fabricant de stores, le piège de l'agence de traduction, le défi de la brocante : trouver l'axe de symétrie d'une parabole, son sommet et son maximum, et se servir de la symétrie.",
  problemes: [
    {
      tag: "Énigme 1 · La sandwicherie",
      titre: "Lire l'axe de symétrie",
      question: `Une sandwicherie trace la courbe de son bénéfice.<br>C'est une parabole. Elle coupe l'axe en x = 2 et en x = 8.<br><br><b>Quel est son axe de symétrie</b> ?`,
      reponse: `L'axe passe au milieu des deux points.<br>(2 + 8) ÷ 2 = 10 ÷ 2 = 5.<br>L'axe est la droite <span class="big">x = 5</span>.`,
      consigne: "La parabole coupe l'axe en 2 et en 8. Quel axe de symétrie ?",
      verification: { type: "qcm", choix: ["x = 5", "x = 10", "x = 6"], bonne: 0 },
      dessin: sandwicherie,
    },
    {
      tag: "Énigme 2 · Les pâtes fraîches",
      titre: "L'axe par deux images égales",
      question: `Une fabrique de pâtes fraîches a un coût C(x) = x² − 6x + 10.<br>C(0) = 10.<br>On cherche l'autre x tel que C(x) = 10.<br><br><b>Quel est l'axe de symétrie</b> ? Donne x.`,
      reponse: `C(x) = 10 donne x² − 6x = 0, soit x(x − 6) = 0.<br>Donc x = 0 ou x = 6.<br>Le milieu de 0 et 6 : l'axe est <span class="big">x = 3</span>.`,
      consigne: "C(x) = x² − 6x + 10. C(x) = 10 pour x = 0 et x = 6. Axe : x = ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: pates,
    },
    {
      tag: "Énigme 3 · La maroquinerie",
      titre: "Le sommet et le maximum",
      question: `Une maroquinerie vend x centaines de sacs.<br>Son bénéfice vaut B(x) = −x² + 8x, en milliers d'euros.<br>B(0) = 0 et B(8) = 0.<br><br><b>Quel est le bénéfice maximal</b> ?`,
      reponse: `L'axe passe au milieu de 0 et 8 : x = 4.<br>B(4) = −16 + 32 = 16.<br>Le maximum vaut <span class="big">16 milliers d'euros</span>.`,
      consigne: "B(x) = −x² + 8x. B(0) = B(8) = 0. Bénéfice maximal ?",
      verification: { type: "courte", attendus: ["16", "16000", "16 000"] },
      dessin: maroquinerie,
    },
    {
      tag: "Énigme 4 · Les stores",
      titre: "L'extremum de la forme factorisée",
      question: `Un fabricant vend x centaines de stores.<br>Son bénéfice vaut B(x) = −2(x − 3)(x − 11), en milliers d'euros.<br><br><b>Quel est le sommet</b> de la parabole ?`,
      reponse: `B(x) = 0 pour x = 3 et x = 11. Le milieu : x = 7.<br>B(7) = −2 × 4 × (−4) = 32.<br>Le maximum vaut <span class="big">32, atteint en x = 7</span>.`,
      consigne: "B(x) = −2(x − 3)(x − 11). Quel est le sommet ?",
      verification: { type: "qcm", choix: ["maximum 7, atteint en x = 32", "maximum 32, atteint en x = 7", "maximum 11, atteint en x = 3"], bonne: 1 },
      dessin: stores,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'agence de traduction",
      sorte: "piege",
      question: `Une agence de traduction a un bénéfice B(x) = −(x + 2)(x − 6).<br>Inès : « Les racines sont 2 et 6. L'axe est x = 4. »<br><br><b>Quel est le vrai axe</b> ?`,
      reponse: `x + 2 = 0 donne x = −2, pas 2.<br>Les racines sont −2 et 6.<br>(−2 + 6) ÷ 2 = 2 : l'axe est <span class="big">x = 2</span>.`,
      consigne: "B(x) = −(x + 2)(x − 6). Quel est l'axe de symétrie ?",
      verification: { type: "qcm", choix: ["x = 4", "x = −2", "x = 2"], bonne: 2 },
      dessin: traduction,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La brocante",
      sorte: "defi",
      question: `Une brocante note ses visiteurs selon l'heure x : c'est une parabole f.<br>Il y a autant de visiteurs à x = 2 qu'à x = 10.<br>À x = 3, il y en a 40.<br><br><b>Pour quel autre x</b> y en a-t-il aussi 40 ?`,
      reponse: `f(2) = f(10) : l'axe est au milieu, x = 6.<br>3 est à 3 unités à gauche de 6.<br>À 3 unités à droite : <span class="big">x = 9</span>.`,
      consigne: "f(2) = f(10) et f(3) = 40. Pour quel autre x a-t-on f(x) = 40 ?",
      verification: { type: "courte", attendus: ["9"] },
      dessin: brocante,
    },
  ],
};

export default problemes;
