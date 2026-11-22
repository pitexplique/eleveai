// Énigmes à projeter — première spé maths, notion geometrie_reperee
// (la piste cyclable, le rond de longe du centre équestre, la borne wifi du
// camping, le tuyau sous le massif de fleurs, piège de l'application de
// dessin, défi du lancer de marteau). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, fleche } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";
import { vec, vecS } from "../dessins-tle";

const piste = (() => {
  const R = repereXY(-1, 4, -1, 5, { gx: 115, gy: 25, gl: 250, gh: 300, px: 1, py: 1, ex: 2, ey: 2 });
  return svg("Le plan de la ville : la piste cyclable d passe par A (1 ; 2) et elle est perpendiculaire au vecteur n (3 ; −1)",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => 3 * x - 1, 0, 2, C.jaune, 6) +
      fleche(R.X(1), R.Y(2), R.X(4), R.Y(1), C.rose, 4) + R.point(1, 2, C.bleu, 8) +
      t(R.X(0.75), R.Y(2.25), "A", C.bleu, 22, "end") + vecS(R.X(3.3), R.Y(1.6), "n", C.rose, 24) +
      t(R.X(2.15), R.Y(4.55), "d", C.jaune, 26, "start") +
      t(240, 400, `équation de d${NB}?`, C.rose, 28));
})();

const longe = svg("Le rond de longe du centre équestre, d'équation x² + y² − 4x + 2y − 4 = 0, en mètres",
  o(240, 150, 115, C.jaune, 0.2, 5) + o(240, 150, 6, C.craie, 1, 2) + l(240, 150, 355, 150, C.craie, 2, "6 5") +
    o(320, 68, 12, C.bleu, 0.7, 2) + t(300, 140, "?", C.rose, 26) +
    t(240, 320, "x² + y² − 4x + 2y − 4 = 0", C.craie, 24) +
    t(240, 380, `rayon${NB}?`, C.rose, 28));

const wifi = svg("La borne wifi du camping est en Ω (1 ; 1), sa portée vaut 5 ; une tente est plantée en M (4 ; 5)",
  o(200, 190, 150, C.bleu, 0.12, 3) + o(200, 190, 8, C.bleu, 1, 2) +
    [24, 40, 56].map((k) => `<path d="M${200 - k * 0.7} ${190 - k * 0.7} A${k} ${k} 0 0 1 ${200 + k * 0.7} ${190 - k * 0.7}" fill="none" stroke="${C.bleu}" stroke-width="3"/>`).join("") +
    `<path d="M278 82 L300 50 L322 82 Z" fill="${C.jaune}" fill-opacity="0.5" stroke="${C.craie}" stroke-width="3"/>` +
    t(186, 216, "Ω(1 ; 1)", C.bleu, 20, "end") + t(332, 74, "M(4 ; 5)", C.jaune, 20, "start") + l(200, 190, 306, 296, C.bleu, 2, "6 5") + t(236, 280, "portée 5", C.bleu, 20, "end") +
    t(240, 395, `la tente capte le wifi${NB}?`, C.rose, 26));

const massif = svg("Le massif de fleurs rond a pour équation x² + y² = 25, en mètres ; un tuyau droit suit la droite y = 3",
  o(220, 190, 125, C.jaune, 0.15, 4) + l(70, 190, 370, 190, C.pale, 2) + l(220, 45, 220, 335, C.pale, 2) +
    l(60, 115, 380, 115, C.bleu, 5) + o(120, 115, 8, C.rose, 1, 2) + o(320, 115, 8, C.rose, 1, 2) +
    t(384, 108, "y = 3", C.bleu, 20, "start") + t(330, 300, "x² + y² = 25", C.craie, 22, "start") +
    t(240, 395, `longueur du tuyau dans le massif${NB}?`, C.rose, 23));

const appli = svg("L'application de dessin de la graphiste : on tape x² + y² + 2x − 4y + 10 = 0, et l'écran reste vide",
  r(70, 40, 340, 220, C.craie, 0.08, 4, 14) + r(90, 60, 300, 150, C.pale, 0.1, 2, 6) + l(170, 280, 310, 280, C.craie, 6) + l(240, 260, 240, 280, C.craie, 5) +
    t(240, 238, "x² + y² + 2x − 4y + 10 = 0", C.craie, 20) + t(240, 145, "rien ne s'affiche", C.pale, 22) +
    t(240, 350, `quelle figure${NB}?`, C.rose, 28));

const marteau = (() => {
  const u = 26, ox = 170, oy = 215;
  const P = (x: number, y: number): [number, number] => [ox + u * x, oy - u * y];
  const [ax, ay] = P(4, 3), [tx, ty] = P(6.25, 0), [d1x, d1y] = P(2.2, 5.4), [d2x, d2y] = P(7, -1);
  return svg("Le lancer de marteau : le marteau tourne sur le cercle x² + y² = 25 et s'échappe en A (4 ; 3) le long de la tangente",
    l(30, oy, 440, oy, C.pale, 2) + l(ox, 60, ox, 360, C.pale, 2) + o(ox, oy, 5 * u, C.bleu, 0.1, 3) +
      l(ox, oy, ax, ay, C.craie, 3, "6 5") + l(d1x, d1y, d2x, d2y, C.jaune, 4) +
      o(ax, ay, 9, C.rose, 1, 2) + o(tx, ty, 7, C.jaune, 1, 2) +
      t(ax + 14, ay - 8, "A(4 ; 3)", C.rose, 20, "start") + t(ox - 10, oy + 24, "O", C.pale, 18, "end") +
      t(tx - 10, ty + 28, "?", C.jaune, 26, "end") + t(20, 50, "x² + y² = 25", C.bleu, 20, "start") +
      t(240, 400, `la tangente coupe l'axe des x en${NB}?`, C.rose, 22));
})();

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "geometrie_reperee",
  titre: "Énigmes de géométrie repérée",
  description: "La piste cyclable, le rond de longe du centre équestre, la borne wifi du camping, le tuyau sous le massif de fleurs, le piège de l'application de dessin, le défi du lancer de marteau : vecteur normal, équation de droite, équation de cercle, tangente à un cercle.",
  problemes: [
    {
      tag: "Énigme 1 · La piste cyclable",
      titre: "Une droite et son vecteur normal",
      question: `Sur le plan de la ville, une piste cyclable d passe par A(1 ; 2). Elle est perpendiculaire au vecteur ${vec("n")}(3 ; −1).<br><br><b>Quelle est une équation de d</b> ?`,
      reponse: `Un vecteur normal (a ; b) donne l'équation ax + by + c = 0 : 3x − y + c = 0.<br>A est sur d : 3 − 2 + c = 0, donc c = −1. <span class="big">3x − y − 1 = 0</span>.`,
      consigne: "d passe par A(1 ; 2), de vecteur normal n(3 ; −1). Quelle équation ?",
      verification: { type: "qcm", choix: ["3x − y − 1 = 0", "3x − y + 1 = 0", "x + 3y − 7 = 0"], bonne: 0 },
      dessin: piste,
    },
    {
      tag: "Énigme 2 · Le rond de longe",
      titre: "Retrouver le centre et le rayon",
      question: `Au centre équestre, le rond de longe est un cercle d'équation x² + y² − 4x + 2y − 4 = 0, en mètres.<br><br><b>Quel est son rayon</b> ?`,
      reponse: `On complète les carrés : (x − 2)² − 4 + (y + 1)² − 1 − 4 = 0, soit (x − 2)² + (y + 1)² = 9.<br>Centre (2 ; −1), <span class="big">rayon 3 m</span>.`,
      consigne: "x² + y² − 4x + 2y − 4 = 0. Quel est le rayon ?",
      verification: { type: "courte", attendus: ["3"], unite: "m" },
      dessin: longe,
    },
    {
      tag: "Énigme 3 · La borne wifi du camping",
      titre: "Un point et un cercle",
      question: `Au camping, la borne wifi est en Ω(1 ; 1) ; elle capte dans un disque de rayon 5. Une tente est plantée en M(4 ; 5).<br><br><b>Où est la tente</b> par rapport au cercle de portée ?`,
      reponse: `ΩM² = (4 − 1)² + (5 − 1)² = 9 + 16 = 25, donc ΩM = 5 : c'est le rayon.<br>La tente est <span class="big">exactement sur le cercle</span> : tout juste à la limite.`,
      consigne: "Ω(1 ; 1), rayon 5 et M(4 ; 5). Où est M ?",
      verification: { type: "qcm", choix: ["à l'intérieur du cercle", "exactement sur le cercle", "à l'extérieur du cercle"], bonne: 1 },
      dessin: wifi,
    },
    {
      tag: "Énigme 4 · Le massif de fleurs",
      titre: "Une droite coupe un cercle",
      question: `Un massif de fleurs rond a pour équation x² + y² = 25, en mètres. Un jardinier enterre un tuyau droit qui suit la droite y = 3.<br><br><b>Quelle longueur de tuyau</b> passe sous le massif ?`,
      reponse: `On remplace y par 3 : x² + 9 = 25, donc x² = 16 : x = −4 ou x = 4.<br>Le tuyau entre en (−4 ; 3) et sort en (4 ; 3) : <span class="big">8 m</span>.`,
      consigne: "x² + y² = 25 et y = 3. Quelle longueur de tuyau dans le massif ?",
      verification: { type: "courte", attendus: ["8"], unite: "m" },
      dessin: massif,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'application de dessin",
      sorte: "piege",
      question: `Une graphiste tape x² + y² + 2x − 4y + 10 = 0 dans son application. Rien ne s'affiche.<br>Son stagiaire : « C'est un cercle de rayon √10. »<br><br><b>Quelle figure</b> cette équation décrit-elle ?`,
      reponse: `On complète les carrés : (x + 1)² − 1 + (y − 2)² − 4 + 10 = 0, soit (x + 1)² + (y − 2)² = −5.<br>Une somme de carrés n'est jamais négative : <span class="big">aucun point</span>. L'écran vide avait raison.`,
      consigne: "x² + y² + 2x − 4y + 10 = 0 : quelle figure ?",
      verification: { type: "qcm", choix: ["un cercle de rayon √10", "un cercle de rayon 5", "aucun point : l'ensemble est vide"], bonne: 2 },
      dessin: appli,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le lancer de marteau",
      sorte: "defi",
      question: `Un marteau tourne sur le cercle x² + y² = 25, en mètres. L'athlète le lâche en A(4 ; 3) : il part le long de la tangente en A.<br><br><b>À quelle abscisse</b> sa trajectoire coupe-t-elle l'axe des x ?`,
      reponse: `La tangente en A est perpendiculaire au rayon : ${vec("OA")}(4 ; 3) est un vecteur normal. Équation : 4x + 3y + c = 0, avec 16 + 9 + c = 0, soit 4x + 3y − 25 = 0.<br>Pour y = 0 : 4x = 25, <span class="big">x = 6,25 m</span>.`,
      consigne: "Tangente en A(4 ; 3) au cercle x² + y² = 25. Où coupe-t-elle l'axe des x ?",
      verification: { type: "courte", attendus: ["6,25", "25/4"], unite: "m" },
      dessin: marteau,
    },
  ],
};

export default problemes;
