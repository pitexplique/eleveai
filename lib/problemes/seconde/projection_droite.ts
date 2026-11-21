// Énigmes à projeter — seconde, notion projection_droite (la corde à linge à
// midi, l'ombre de la guirlande, le bâton et son ombre, le crochet de la grue,
// piège du bâton pointé vers le soleil, défi du téléphérique et de la carte).
// 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o } from "../dessins-ecole";
import { repere } from "../dessins-2de";
import { frac } from "../outils";

const sol = (y = 340) => l(30, y, 450, y, C.craie, 4);

const linge = svg("Une corde à linge inclinée avec trois pinces A, B, C ; les rayons verticaux du soleil de midi donnent leurs ombres au sol",
  sol(330) + l(80, 120, 400, 220, C.craie, 3) +
    [[80, 120, "A"], [240, 170, "B"], [400, 220, "C"]].map(([x, y, n]) =>
      l(x as number, (y as number) + 12, x as number, 330, C.jaune, 2.5, "8 6") + r((x as number) - 6, (y as number) - 4, 12, 22, C.bleu, 0.6, 2, 2) + t(x as number, (y as number) - 14, n as string, C.bleu, 22)).join("") +
    o(80, 330, 7, C.rose, 1, 0) + o(400, 330, 7, C.rose, 1, 0) + o(240, 330, 9, C.rose, 0, 3) +
    t(80, 360, "0", C.pale, 18) + t(400, 360, "120 cm", C.pale, 18) + t(240, 362, "?", C.rose, 26) +
    t(240, 60, "soleil de midi : rayons verticaux", C.jaune, 18) + t(240, 405, `l'ombre de B${NB}?`, C.rose, 26)
);

const guirlande = (() => {
  // A(152 ; 110), B(444 ; 280), rayons de direction (−0,4 ; 1) vers le sol y = 340.
  const A = [152, 110], B = [444, 280];
  const pt = (k: number) => [A[0] + ((B[0] - A[0]) * k) / 4, A[1] + ((B[1] - A[1]) * k) / 4];
  const ombre = (P: number[]) => P[0] - 0.4 * (340 - P[1]);
  let s = sol() + l(A[0], A[1], B[0], B[1], C.craie, 3);
  [0, 1, 2, 3, 4].forEach((k) => {
    const P = pt(k);
    if (k === 0 || k === 1 || k === 4) s += l(P[0], P[1], ombre(P), 340, C.jaune, 2.5, "8 6") + o(ombre(P), 340, 6, C.rose, 1, 0);
    s += o(P[0], P[1], 9, C.jaune, 0.7, 2);
  });
  const M = pt(1);
  return svg("Une guirlande AB avec cinq ampoules régulièrement espacées ; M est la deuxième ; leurs ombres au sol A', M', B' par des rayons parallèles",
    s + t(A[0] - 14, A[1] - 6, "A", C.bleu, 22, "end") + t(M[0] - 2, M[1] - 16, "M", C.bleu, 22) + t(B[0] + 4, B[1] - 16, "B", C.bleu, 22) +
      t(ombre(A), 368, "A'", C.rose, 20) + t(ombre(M), 368, "M'", C.rose, 20) + t(ombre(B), 368, "B'", C.rose, 20) +
      t(300, 398, "A'B' = 12 cm", C.craie, 20) + t(240, 50, `A'M'${NB}?`, C.rose, 26));
})();

const baton = svg("Un bâton incliné de 10 centimètres et son ombre au sol, plus longue, par des rayons parallèles",
  sol(330) + l(130, 330, 230, 130, C.jaune, 7) + l(230, 130, 430, 330, C.pale, 2.5, "8 6") + l(330, 130, 450, 250, C.pale, 2.5, "8 6") +
    l(130, 330, 430, 330, C.rose, 7) + t(160, 220, "10 cm", C.jaune, 20, "end") + t(280, 372, `ombre${NB}: 10 cm${NB}?`, C.rose, 22) +
    t(240, 60, "rayons parallèles", C.pale, 18)
);

const grue = (() => {
  const R = repere(0, 6, 0, 6, { gl: 300, gh: 300, gy: 30, gx: 110, pasE: 1 });
  return svg("Le crochet d'une grue au point M de coordonnées 3 ; 5 et sa projection sur l'axe des abscisses, parallèlement à l'axe des ordonnées",
    R.fond + l(R.X(0.5), R.Y(0), R.X(0.5), R.Y(5.8), C.jaune, 6) + l(R.X(0.5), R.Y(5.8), R.X(5), R.Y(5.8), C.jaune, 6) +
      l(R.X(3), R.Y(5.8), R.X(3), R.Y(5), C.craie, 2) + R.point(3, 5, C.bleu, 8) + t(R.X(3) + 14, R.Y(5) + 8, "M(3 ; 5)", C.bleu, 18, "start") +
      l(R.X(3), R.Y(5) + 10, R.X(3), R.Y(0), C.rose, 3, "8 6") + o(R.X(3), R.Y(0), 9, C.rose, 0, 3) + t(R.X(3) + 14, R.Y(0) - 12, "?", C.rose, 26, "start") +
      t(240, 400, `où tombe le crochet${NB}?`, C.rose, 26));
})();

const pointe = svg("Des rayons de soleil parallèles et un bâton tenu exactement dans leur direction : son ombre est un seul point",
  sol(340) + [70, 170, 270, 370].map((x) => l(x, 40, x + 90, 300, C.pale, 2.5, "8 6")).join("") +
    l(204, 120, 280, 340, C.jaune, 8) + o(280, 340, 8, C.rose, 1, 0) + t(250, 200, "bâton", C.jaune, 20, "start") +
    t(380, 300, "ombre", C.rose, 20) + l(350, 308, 292, 336, C.rose, 2) + t(240, 400, `la longueur de l'ombre${NB}?`, C.rose, 26)
);

const telepherique = svg("Un câble de téléphérique avec trois pylônes A, B, C ; AB 300 mètres, BC 500 mètres ; sur la carte, A'C' mesure 640 mètres",
  sol(330) + l(60, 300, 380, 60, C.craie, 3) +
    [[60, 300, "A"], [180, 210, "B"], [380, 60, "C"]].map(([x, y, n]) =>
      l(x as number, y as number, x as number, 330, C.jaune, 2.5, "8 6") + o(x as number, y as number, 8, C.bleu, 1, 0) + t((x as number) - 14, (y as number) - 8, n as string, C.bleu, 22, "end") +
      o(x as number, 330, 6, C.rose, 1, 0) + t(x as number, 358, `${n}'`, C.rose, 20)).join("") +
    t(108, 239, "300 m", C.craie, 18, "end") + t(268, 119, "500 m", C.craie, 18, "end") +
    t(220, 398, "A'C' = 640 m", C.craie, 20) + t(280, 358, "?", C.rose, 24) + t(400, 398, `B'C'${NB}?`, C.rose, 22)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "projection_droite",
  titre: "Énigmes de la projection sur une droite",
  description: "La corde à linge à midi, l'ombre de la guirlande, le bâton et son ombre, le crochet de la grue, le piège du bâton pointé vers le soleil, le défi du téléphérique : une projection conserve les milieux et les rapports, pas les longueurs.",
  problemes: [
    {
      tag: "Énigme 1 · La corde à linge",
      titre: "L'ombre du milieu",
      question: `À midi, les rayons du soleil tombent à la verticale. Sur une corde à linge inclinée, la pince B est au <b>milieu</b> des pinces A et C.<br>Au sol, l'ombre de A est à 0 et celle de C à <b>120 cm</b>.<br><br><b>Où est l'ombre de B</b> ?`,
      reponse: `Une projection conserve les milieux : l'ombre de B est au milieu des ombres de A et de C.<br>${frac("0 + 120", 2)} = <span class="big">60 cm</span>.`,
      consigne: "B est le milieu de [AC]. Les ombres de A et de C sont à 0 et 120 cm : où est l'ombre de B, en cm ?",
      verification: { type: "courte", attendus: ["60"], unite: "cm" },
      dessin: linge,
    },
    {
      tag: "Énigme 2 · La guirlande",
      titre: "Le premier quart",
      question: `Une guirlande tendue de A à B porte 5 ampoules régulièrement espacées. L'ampoule M est la 2e : AM = ${frac(1, 4)} AB.<br>Le soleil du soir projette la guirlande au sol : A'B' = <b>12 cm</b>.<br><br><b>Combien mesure</b> A'M' ?`,
      reponse: `Une projection conserve les rapports : A'M' = ${frac(1, 4)} A'B'.<br>A'M' = 12 ÷ 4 = <span class="big">3 cm</span>.`,
      consigne: "AM = AB ÷ 4 et A'B' = 12 cm. Combien mesure A'M' ?",
      verification: { type: "qcm", choix: ["3 cm", "4 cm", "On ne peut pas savoir"], bonne: 0 },
      dessin: guirlande,
    },
    {
      tag: "Énigme 3 · Le bâton et son ombre",
      titre: "Une longueur qui change",
      question: `Un bâton de <b>10 cm</b> est planté de travers dans le sable. Le soleil le projette au sol.<br><br><b>Son ombre mesure-t-elle 10 cm</b> ?`,
      reponse: `<span class="big">Pas forcément</span> : l'ombre peut être plus longue ou plus courte, selon la direction des rayons.<br>Une projection conserve les milieux et les rapports, <b>pas les longueurs</b>.`,
      consigne: "Une projection conserve-t-elle les longueurs ?",
      verification: { type: "qcm", choix: ["Oui, toujours", "Non : seuls les milieux et les rapports sont conservés", "Oui, si le soleil est haut"], bonne: 1 },
      dessin: baton,
    },
    {
      tag: "Énigme 4 · La grue",
      titre: "Le crochet au sol",
      question: `Le crochet d'une grue est en M(3 ; 5). On le descend à la verticale, parallèlement à l'axe des ordonnées, jusqu'à l'axe des abscisses.<br><br><b>Où arrive-t-il</b> ?`,
      reponse: `On garde l'abscisse, l'ordonnée devient 0.<br>Le projeté de M sur l'axe des abscisses est <span class="big">(3 ; 0)</span>.`,
      consigne: "Projeté de M(3 ; 5) sur l'axe des abscisses, parallèlement à l'axe des ordonnées ?",
      verification: { type: "qcm", choix: ["(0 ; 5)", "(5 ; 3)", "(3 ; 0)"], bonne: 2 },
      dessin: grue,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le bâton pointé vers le soleil",
      sorte: "piege",
      question: `Un randonneur tient son bâton de <b>1 m</b> exactement dans la direction des rayons du soleil.<br><br><b>Quelle est la longueur</b> de son ombre au sol, en cm ?`,
      reponse: `Tous les points du bâton sont sur le même rayon : ils ont la même ombre.<br>L'ombre est un seul point : <span class="big">0 cm</span>. Un segment parallèle à la direction de projection se projette en un point.`,
      consigne: "Un segment parallèle aux rayons : quelle est la longueur de son ombre, en cm ?",
      verification: { type: "courte", attendus: ["0"], unite: "cm" },
      dessin: pointe,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le téléphérique sur la carte",
      sorte: "defi",
      question: `Sur le câble droit d'un téléphérique, les pylônes A, B, C sont tels que AB = <b>300 m</b> et BC = <b>500 m</b>.<br>Sur la carte (vue de dessus), A'C' = <b>640 m</b>.<br><br><b>Combien mesure</b> B'C' sur la carte ?`,
      reponse: `Les rapports sont conservés : BC = ${frac(500, 800)} AC, donc B'C' = ${frac(5, 8)} A'C'.<br>B'C' = ${frac(5, 8)} × 640 = <span class="big">400 m</span>. Et A'B' = 240 m.`,
      consigne: "AB = 300 m, BC = 500 m, A'C' = 640 m. Combien mesure B'C', en m ?",
      verification: { type: "courte", attendus: ["400"], unite: "m" },
      dessin: telepherique,
    },
  ],
};

export default problemes;
