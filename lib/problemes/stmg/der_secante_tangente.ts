// Énigmes à projeter — STMG (1re), notion dérivée : sécantes et tangente (les
// sandales, les planches de bodyboard, les genouillères, les tongs, piège des
// ventilateurs, défi des couteaux de cuisine). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

// Bénéfice en milliers d'euros : f(x) = −0,5(x − 4)² + 8 ; A (2 ; 6).
const RA = repereXY(0, 7, 0, 10, { py: 1, ey: 2, gh: 300 });
const fA = (x: number) => -0.5 * (x - 4) ** 2 + 8;
const sandales = svg("Les sandales : la courbe du bénéfice et trois droites d1, d2, d3 qui passent par le point A de coordonnées 2 et 6",
  RA.fond + RA.courbe(fA, 0, 7, C.bleu, 4) +
    RA.courbe((x) => 0.5 * x + 5, 0, 7, C.jaune, 3) + RA.courbe(() => 6, 0, 7, C.pale, 3) + RA.courbe((x) => 2 * x + 2, 0, 3.9, C.rose, 3) +
    RA.point(2, 6, C.craie, 7) + t(RA.X(2) + 6, RA.Y(6) + 30, "A", C.craie, 22, "start") +
    t(RA.X(7) - 4, RA.Y(8.5) - 12, "d₁", C.jaune, 22, "end") + t(RA.X(5), RA.Y(6) + 28, "d₂", C.pale, 22) +
    t(RA.X(3.9) + 10, RA.Y(9.8) + 4, "d₃", C.rose, 22, "start") +
    t(240, 400, `tangente en A${NB}?`, C.rose, 26));

const bodyboard = svg("Les planches de bodyboard : C de x égale x au carré ; A de coordonnées 1 et 1, B de coordonnées 3 et 9 ; pente de la sécante ?",
  r(80, 60, 320, 80, C.bleu, 0.15, 3, 10) + t(240, 113, "C(x) = x²", C.craie, 32) +
    t(240, 200, "A (1 ; 1) · B (3 ; 9)", C.pale, 26) +
    t(240, 290, "sécante (AB)", C.pale, 24) + t(240, 360, `coefficient directeur${NB}?`, C.rose, 26));

// Tableau des pentes des sécantes (AB) quand B se rapproche de A.
const cases = (y: number, vals: string[], c: string) => vals.map((v, i) => r(40 + i * 100, y, 100, 60, C.craie, 0, 2) + t(90 + i * 100, y + 40, v, c, 22)).join("");
const genouilleres = svg("Les genouillères : B se rapproche de A ; pentes des sécantes 3 ; 2,5 ; 2,1 ; 2,01 ; pente de la tangente ?",
  t(240, 60, "B se rapproche de A (x = 1)", C.pale, 22) +
    cases(90, ["x de B", "2", "1,5", "1,1"], C.pale) + cases(150, ["pente", "3", "2,5", "2,1"], C.craie) +
    t(240, 270, "x de B = 1,01 : pente 2,01", C.craie, 22) + t(240, 350, `pente de la tangente${NB}?`, C.rose, 26));

// Bénéfice des tongs : sommet S (5 ; 9).
const RS = repereXY(0, 10, 0, 10, { ey: 2, gh: 290 });
const tongs = svg("Les tongs : la courbe du bénéfice et son sommet S de coordonnées 5 et 9 ; la tangente en S est à trouver",
  RS.fond + RS.courbe((x) => -0.36 * (x - 5) ** 2 + 9, 0, 10, C.bleu, 4) +
    RS.point(5, 9, C.rose, 7) + t(RS.X(5), RS.Y(9) - 16, "S", C.craie, 22) +
    t(240, 400, `tangente en S${NB}?`, C.rose, 26));

// Ventilateurs : g(x) = 0,25x² + 1 ; A (2 ; 2), B (6 ; 10) ; tangente en A : y = x.
const RV = repereXY(0, 7, 0, 14, { py: 2, ey: 4, gh: 300 });
const ventilateurs = svg("Les ventilateurs : la courbe, la tangente en A en jaune et une droite rose qui passe par A et par B",
  RV.fond + RV.courbe((x) => 0.25 * x * x + 1, 0, 7, C.bleu, 4) +
    RV.courbe((x) => x, 0, 7, C.jaune, 3) + RV.courbe((x) => 2 * x - 2, 1, 7, C.rose, 3) +
    RV.point(2, 2, C.craie, 7) + RV.point(6, 10, C.craie, 7) +
    t(RV.X(2) + 14, RV.Y(2) + 22, "A", C.craie, 22, "start") + t(RV.X(6) - 14, RV.Y(10) - 6, "B", C.craie, 22, "end") +
    t(240, 400, "Noé : « la rose est la tangente en A »", C.pale, 20));

const couteaux = svg("Les couteaux de cuisine : C de x égale x au carré plus 10 x ; pentes des sécantes entre 5 et 5 plus h ?",
  r(70, 50, 340, 80, C.bleu, 0.15, 3, 10) + t(240, 103, "C(x) = x² + 10x", C.craie, 30) +
    t(240, 180, "sécante entre x = 5 et x = 5 + h", C.pale, 21) +
    t(240, 235, "h = 1 · h = 0,1 · h = 0,01", C.pale, 22) +
    t(240, 320, "pentes : ? · ? · ?", C.craie, 26) + t(240, 385, `et la tangente${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "der_secante_tangente",
  titre: "Énigmes de sécantes et de tangentes",
  description: "Les sandales, les planches de bodyboard, les genouillères, les tongs, le piège des ventilateurs, le défi des couteaux de cuisine : tracer une sécante, voir la tangente comme la limite des sécantes, reconnaître une tangente.",
  problemes: [
    {
      tag: "Énigme 1 · Les sandales",
      titre: "Reconnaître la tangente",
      question: `Un fabricant de sandales trace la courbe de son bénéfice.<br>Trois droites passent par le point A.<br><br><b>Laquelle est la tangente</b> à la courbe en A ?`,
      reponse: `d₁ et d₂ recoupent la courbe plus loin : ce sont des sécantes.<br>La tangente « frôle » la courbe en A et suit sa direction.<br>C'est <span class="big">d₃</span>.`,
      consigne: "Trois droites passent par A. Laquelle est la tangente en A ?",
      verification: { type: "qcm", choix: ["d₁", "d₂", "d₃"], bonne: 2 },
      dessin: sandales,
    },
    {
      tag: "Énigme 2 · Les planches de bodyboard",
      titre: "La pente d'une sécante",
      question: `Un fabricant de planches de bodyboard a un coût C(x) = x².<br>La sécante passe par A (1 ; 1) et B (3 ; 9).<br><br><b>Quel est son coefficient directeur</b> ?`,
      reponse: `Pente = (9 − 1) ÷ (3 − 1).<br>8 ÷ 2 = <span class="big">4</span>.<br>C'est le taux de variation de C entre 1 et 3.`,
      consigne: "A (1 ; 1) et B (3 ; 9). Coefficient directeur de la sécante (AB) ?",
      verification: { type: "qcm", choix: ["4", "8", "2"], bonne: 0 },
      dessin: bodyboard,
    },
    {
      tag: "Énigme 3 · Les genouillères",
      titre: "Les sécantes se rapprochent",
      question: `Un fabricant de genouillères a un coût C(x) = x².<br>A est le point d'abscisse 1. B se rapproche de A.<br>Les pentes des sécantes (AB) valent 3 ; 2,5 ; 2,1 ; 2,01.<br><br><b>Quelle est la pente de la tangente</b> en A ?`,
      reponse: `Quand B se rapproche de A, la sécante devient la tangente.<br>Les pentes se rapprochent de 2.<br>La pente de la tangente est <span class="big">2</span>.`,
      consigne: "Pentes des sécantes : 3 ; 2,5 ; 2,1 ; 2,01. Pente de la tangente ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: genouilleres,
    },
    {
      tag: "Énigme 4 · Les tongs",
      titre: "La tangente au sommet",
      question: `Une marque de tongs trace la courbe de son bénéfice.<br>S est le sommet de la courbe.<br><br><b>Comment est la tangente</b> en S ?`,
      reponse: `Au sommet, la courbe ne monte plus et ne descend pas encore.<br>La tangente en S est <span class="big">horizontale</span>.<br>Sa pente vaut 0.`,
      consigne: "S est le sommet de la courbe. Comment est la tangente en S ?",
      verification: { type: "qcm", choix: ["verticale", "horizontale", "inclinée vers le haut"], bonne: 1 },
      dessin: tongs,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les ventilateurs",
      sorte: "piege",
      question: `Un vendeur de ventilateurs trace une courbe.<br>Noé : « La droite rose passe par A, c'est la tangente en A. »<br><br><b>Combien de points</b> la droite rose a-t-elle en commun avec la courbe ?`,
      reponse: `La droite rose coupe la courbe en A et en B : <span class="big">2</span> points.<br>C'est une sécante, pas la tangente.<br>La tangente en A est la droite jaune.`,
      consigne: "Combien de points la droite rose a-t-elle en commun avec la courbe ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: ventilateurs,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les couteaux de cuisine",
      sorte: "defi",
      question: `Un coutelier a un coût C(x) = x² + 10x.<br>On trace la sécante entre x = 5 et x = 5 + h.<br>Sa pente vaut (C(5 + h) − C(5)) ÷ h.<br><br>Calcule-la pour h = 1, puis 0,1, puis 0,01.<br><b>Vers quel nombre</b> vont les pentes ?`,
      reponse: `C(5) = 75. C(6) = 96 : pente 21.<br>C(5,1) = 77,01 : pente 2,01 ÷ 0,1 = 20,1. Puis 20,01.<br>Les pentes vont vers <span class="big">20</span> : c'est la pente de la tangente.`,
      consigne: "C(x) = x² + 10x. Pentes des sécantes entre 5 et 5 + h : vers quel nombre ?",
      verification: { type: "courte", attendus: ["20"] },
      dessin: couteaux,
    },
  ],
};

export default problemes;
