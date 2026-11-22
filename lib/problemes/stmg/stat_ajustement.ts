// Énigmes à projeter — STMG (1re), notion ajustement affine
// (l'installateur de volets roulants, l'étude de notaire, le carrossier, le
// pisciniste, piège du ramoneur, défi du fabricant de moules à gâteau). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, l, r, svg, t } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const mini = (k: number, pts: [number, number][], nom: string) => {
  const R = repereXY(0, 6, 0, 6, { gx: 25 + k * 152, gy: 70, gl: 125, gh: 220, etiquettes: false, quadrillage: false });
  return R.fond + pts.map(([x, y]) => R.point(x, y, C.bleu, 7)).join("") + t(25 + k * 152 + 62, 335, nom, C.jaune, 30);
};
const volets = svg("Trois nuages de points : A en forme de U, B dispersé au hasard, C presque aligné",
  t(240, 40, "devis (→) et ventes (↑)", C.pale, 20) +
    mini(0, [[0.5, 5.5], [1.5, 3], [2.5, 1.6], [3.5, 1.3], [4.5, 2], [5.5, 4.5]], "A") +
    mini(1, [[0.5, 2], [1.5, 5], [2.5, 1], [3.5, 4.5], [4.5, 2.5], [5.5, 5]], "B") +
    mini(2, [[0.5, 1], [1.5, 1.9], [2.5, 2.8], [3.5, 3.9], [4.5, 4.6], [5.5, 5.5]], "C") +
    t(240, 400, `quel nuage pour une droite${NB}?`, C.rose, 24));

const R2 = repereXY(0, 8, 0, 35, { py: 5, ey: 10 });
const notaire = svg("Nuage de l'étude de notaire : mois 1 à 6, actes 12, 15, 17, 21, 22, 26 ; trois droites d1 jaune, d2 rose, d3 bleue",
  R2.fond + R2.courbe((x) => 2.7 * x + 9.3, 0.3, 7, C.jaune, 3) + R2.courbe((x) => 2 * x + 18, 0.3, 7, C.rose, 3) + R2.courbe((x) => x + 10, 0.3, 7, C.bleu, 3) +
    ([[1, 12], [2, 15], [3, 17], [4, 21], [5, 22], [6, 26]] as const).map(([x, y]) => R2.point(x, y, C.craie, 7)).join("") +
    t(R2.X(7) + 8, R2.Y(28.2) + 8, "d1", C.jaune, 22, "start") + t(R2.X(7) + 8, R2.Y(32) + 4, "d2", C.rose, 22, "start") + t(R2.X(7) + 8, R2.Y(17) + 8, "d3", C.bleu, 22, "start") +
    t(R2.X(0) + 8, 22, "actes", C.pale, 17, "start") + t(R2.X(8), R2.Y(0) + 46, "mois", C.pale, 17, "end") +
    t(240, 405, `quelle droite va le mieux${NB}?`, C.rose, 24));

const R3 = repereXY(0, 12, 0, 60, { ex: 2, py: 10 });
const carrossier = svg("Droite d'ajustement du carrossier : elle passe par A, 0 et 20, et par B, 10 et 50",
  R3.fond + ([[1, 25], [2, 24], [3, 30], [5, 33], [6, 39], [7, 40], [8, 46], [9, 45]] as const).map(([x, y]) => R3.point(x, y, C.pale, 6)).join("") +
    R3.courbe((x) => 3 * x + 20, 0, 12, C.bleu, 4) + R3.point(0, 20, C.rose, 9) + R3.point(10, 50, C.rose, 9) +
    t(R3.X(0) + 14, R3.Y(20) + 30, `A(0${NB}; 20)`, C.rose, 20, "start") + t(R3.X(10) - 14, R3.Y(50) - 16, `B(10${NB}; 50)`, C.rose, 20, "end") +
    t(R3.X(0) + 8, 22, "devis", C.pale, 17, "start") + t(R3.X(12), R3.Y(0) + 46, "rang du mois", C.pale, 17, "end") +
    t(240, 405, `coefficient directeur${NB}?`, C.rose, 24));

const pisciniste = svg("Le pisciniste : y égale 2,5 x plus 40 ; x égale 12 ; y ?",
  r(50, 80, 380, 100, C.bleu, 0.15, 3, 10) + t(240, 145, "y = 2,5x + 40", C.craie, 36) +
    t(240, 235, "x = budget pub (centaines d'€)", C.pale, 21) + t(240, 268, "y = demandes de devis", C.pale, 21) +
    t(240, 350, `x = 12${NB}: y${NB}=${NB}?`, C.rose, 30));

const ramoneur = svg("Le ramoneur : années 2021 à 2025, rang x de 1 à 5 ; ajustement y égale 4 x plus 100 ; en 2030 ?",
  tableau(25, 60, [110, 64, 64, 64, 64, 64], 50, [["année", 2021, 2022, 2023, 2024, 2025], ["rang x", 1, 2, 3, 4, 5]], (i, j) => (j === 0 ? C.pale : C.craie), 20) +
    r(90, 200, 300, 70, C.bleu, 0.15, 3, 10) + t(240, 245, "y = 4x + 100", C.craie, 30) +
    t(240, 300, "y = interventions dans l'année", C.pale, 20) +
    t(240, 375, `en 2030${NB}: y${NB}=${NB}?`, C.rose, 30));

const moules = svg("Moules à gâteau : x de 1 à 5, y égale 10, 14, 15, 19, 22 ; droite y égale 3 x plus b passant par le point moyen G",
  tableau(25, 50, [110, 64, 64, 64, 64, 64], 50, [["mois x", 1, 2, 3, 4, 5], ["ventes y", 10, 14, 15, 19, 22]], (i, j) => (j === 0 ? C.pale : C.craie), 20) +
    l(60, 185, 420, 185, C.pale, 1) +
    t(240, 230, "droite : y = 3x + b", C.craie, 28) + t(240, 280, "elle passe par le point moyen G", C.pale, 21) +
    t(240, 365, `b${NB}=${NB}?`, C.rose, 34));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "stat_ajustement",
  titre: "Énigmes de l'ajustement affine",
  description: "L'installateur de volets roulants, l'étude de notaire, le carrossier, le pisciniste, le piège du ramoneur, le défi du fabricant de moules à gâteau : juger si une droite convient, la tracer au jugé, trouver son équation et s'en servir.",
  problemes: [
    {
      tag: "Énigme 1 · Les volets roulants",
      titre: "Un nuage pour une droite",
      question: `Un installateur de volets roulants compare trois nuages de points.<br>Il veut résumer un nuage par une droite.<br><br><b>Quel nuage</b> s'y prête : A, B ou C ?`,
      reponse: `Le nuage A fait une courbe en U. Le nuage B est dispersé.<br>Le nuage C est presque aligné : <span class="big">le nuage C</span>.`,
      consigne: "Quel nuage peut être résumé par une droite ?",
      verification: { type: "qcm", choix: ["A", "B", "C"], bonne: 2 },
      dessin: volets,
    },
    {
      tag: "Énigme 2 · L'étude de notaire",
      titre: "Une droite au jugé",
      question: `Une étude de notaire compte les actes signés chaque mois.<br>Trois stagiaires ont tracé une droite.<br><br><b>Quelle droite</b> passe au plus près des points ?`,
      reponse: `d2 passe au-dessus de tous les points. d3 est trop plate.<br>d1 passe au milieu du nuage : <span class="big">la droite d1</span>.`,
      consigne: "Quelle droite passe au plus près des points ?",
      verification: { type: "qcm", choix: ["d1", "d2", "d3"], bonne: 0 },
      dessin: notaire,
    },
    {
      tag: "Énigme 3 · Le carrossier",
      titre: "L'équation de la droite",
      question: `Un carrossier compte ses devis chaque mois.<br>Sa droite d'ajustement passe par A(0 ; 20) et B(10 ; 50).<br><br><b>Quel est son coefficient directeur</b> ?`,
      reponse: `De A à B : x avance de 10, y monte de 30.<br>30 ÷ 10 = 3 : <span class="big">le coefficient vaut 3</span>.<br>L'équation est y = 3x + 20.`,
      consigne: "Quel est le coefficient directeur ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: carrossier,
    },
    {
      tag: "Énigme 4 · Le pisciniste",
      titre: "Calculer avec l'équation",
      question: `Un pisciniste a trouvé un ajustement : y = 2,5x + 40.<br>x : son budget pub, en centaines d'euros. y : ses demandes de devis.<br><br>Il met 1 200 € de pub.<br><b>Combien de devis</b> peut-il attendre ?`,
      reponse: `1 200 € = 12 centaines, donc x = 12.<br>y = 2,5 × 12 + 40 = 30 + 40 = <span class="big">70 devis</span>.`,
      consigne: "Pub de 1 200 € : combien de devis ?",
      verification: { type: "courte", attendus: ["70"], unite: "devis" },
      dessin: pisciniste,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le ramoneur",
      sorte: "piege",
      question: `Un ramoneur note ses interventions par année.<br>Son ajustement : y = 4x + 100, avec x le rang de l'année.<br>Le rang 1, c'est 2021.<br><br><b>Combien d'interventions</b> prévoir en 2030 ?`,
      reponse: `On ne remplace pas x par 2030 ! On cherche le rang.<br>2021 → 1, 2022 → 2… 2030 → 10.<br>y = 4 × 10 + 100 = <span class="big">140 interventions</span>.`,
      consigne: "Combien d'interventions en 2030 ?",
      verification: { type: "qcm", choix: ["136", "140", "8 220"], bonne: 1 },
      dessin: ramoneur,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le fabricant de moules à gâteau",
      sorte: "defi",
      question: `Un fabricant de moules à gâteau note ses ventes (en centaines) sur 5 mois.<br>Sa droite d'ajustement s'écrit y = 3x + b.<br>Elle passe par le point moyen G : la moyenne des x, la moyenne des y.<br><br><b>Combien vaut b</b> ?`,
      reponse: `Moyenne des x : 15 ÷ 5 = 3. Moyenne des y : 80 ÷ 5 = 16.<br>G(3 ; 16) est sur la droite : 16 = 3 × 3 + b.<br><span class="big">b = 7</span>.`,
      consigne: "Combien vaut b ?",
      verification: { type: "courte", attendus: ["7"] },
      dessin: moules,
    },
  ],
};

export default problemes;
