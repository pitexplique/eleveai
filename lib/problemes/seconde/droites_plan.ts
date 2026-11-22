// Énigmes à projeter — seconde, notion droites_plan (la rampe de skate, la
// route sur la carte, la droite parallèle, les deux lasers, piège de la
// droite verticale, défi des trois droites concourantes). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l } from "../dessins-ecole";
import { repere } from "../dessins-2de";

const rampe = (() => {
  const R = repere(0, 4, 0, 9, { gl: 300, gh: 300, gy: 30, gx: 90 });
  return svg("Une rampe de skate qui passe par A de coordonnées 0 et 3 et B de coordonnées 2 et 7",
    R.fond + R.courbe((x) => 2 * x + 3, 0, 3, C.jaune, 6) + R.point(0, 3, C.bleu, 10) + R.point(2, 7, C.bleu, 10) +
      t(R.X(0) + 16, R.Y(3) + 26, "A (0 ; 3)", C.bleu, 20, "start") + t(R.X(2) + 18, R.Y(7) + 6, "B (2 ; 7)", C.bleu, 20, "start") + t(240, 405, `équation${NB}?`, C.rose, 24));
})();

const route = (() => {
  const R = repere(0, 6, 0, 16, { gl: 300, gh: 340, gy: 30, gx: 90, pas: 2, pasE: 2 });
  return svg("La route d'équation y égale 2x plus 3 sur une carte, et le point d'abscisse 5",
    R.fond + R.courbe((x) => 2 * x + 3, 0, 6, C.craie, 8) + l(R.X(5), R.Y(0), R.X(5), R.Y(13), C.rose, 3, "8 6") +
      t(R.X(1.5), R.Y(11), "y = 2x + 3", C.bleu, 24) + t(R.X(5) + 10, R.Y(14.4), `y${NB}?`, C.rose, 26, "start"));
})();

const paralleles = (() => {
  const R = repere(-2, 4, -3, 6, { gl: 300, gh: 300, gy: 30, gx: 90 });
  return svg("La droite d'équation y égale moins 3x plus 1, et une parallèle à trouver",
    R.fond + R.courbe((x) => -3 * x + 1, -1.6, 1.3, C.bleu, 5) + t(R.X(0.4), R.Y(4.5), "y = −3x + 1", C.bleu, 22, "start") +
      t(240, 405, `une parallèle${NB}?`, C.rose, 24));
})();

const lasers = (() => {
  const R = repere(0, 6, 0, 8, { gl: 340, gh: 300, gy: 30, gx: 70 });
  return svg("Deux rayons laser : y égale 2x plus 1 et y égale moins x plus 7, qui se croisent",
    R.fond + R.courbe((x) => 2 * x + 1, 0, 3.5, C.rose, 4) + R.courbe((x) => -x + 7, 0, 6, C.bleu, 4) +
      t(R.X(3.4), R.Y(7.6), "y = 2x + 1", C.rose, 20, "start") + t(R.X(4.3), R.Y(3.6), "y = −x + 7", C.bleu, 20, "start") + t(240, 405, `point de croisement${NB}?`, C.craie, 24));
})();

const verticale = (() => {
  const R = repere(-1, 5, -1, 6, { gl: 330, gh: 320, gy: 30, gx: 75 });
  return svg("La droite passant par A de coordonnées 3 et 1 et B de coordonnées 3 et 5",
    R.fond + l(R.X(3), R.Y(-1), R.X(3), R.Y(6), C.bleu, 5) + R.point(3, 1, C.jaune, 10) + R.point(3, 5, C.jaune, 10) +
      t(R.X(3) + 16, R.Y(1) + 6, "A", C.craie, 22, "start") + t(R.X(3) + 16, R.Y(5) + 6, "B", C.craie, 22, "start") + t(240, 400, `équation${NB}?`, C.rose, 24));
})();

const concourantes = (() => {
  const R = repere(-1, 5, -1, 7, { gl: 330, gh: 330, gy: 30, gx: 75 });
  return svg("Deux droites qui se croisent au point de coordonnées 2 et 3, et une troisième à faire passer par ce point",
    R.fond + R.courbe((x) => x + 1, -1, 5, C.bleu, 4) + R.courbe((x) => -x + 5, -1, 5, C.jaune, 4) + R.point(2, 3, C.rose, 9) +
      t(R.X(4.1), R.Y(6.4), "y = x + 1", C.bleu, 20, "end") + t(R.X(4.6), R.Y(1.6), "y = −x + 5", C.jaune, 20, "start").replace('text-anchor="start"', 'text-anchor="end"') +
      t(240, 400, `y = 3x + k${NB}: k${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "droites_plan",
  titre: "Énigmes des droites",
  description: "La rampe de skate, la route sur la carte, la droite parallèle, les deux lasers qui se croisent, le piège de la droite verticale, le défi des trois droites concourantes : équation réduite, coefficient directeur, intersection de deux droites.",
  problemes: [
    {
      tag: "Énigme 1 · La rampe de skate",
      titre: "Deux points",
      question: `Le bord d'une rampe de skate passe par <b>A(0 ; 3)</b> et <b>B(2 ; 7)</b>.<br><br><b>Quelle est l'équation</b> de cette droite ?`,
      reponse: `Coefficient directeur : m = (7 − 3) ÷ (2 − 0) = 2. Ordonnée à l'origine : 3 (le point A).<br>Équation : <span class="big">y = 2x + 3</span>.`,
      consigne: "Équation de la droite passant par A(0 ; 3) et B(2 ; 7) ?",
      verification: { type: "qcm", choix: ["y = 2x + 3", "y = 3x + 2", "y = 4x + 3"], bonne: 0 },
      dessin: rampe,
    },
    {
      tag: "Énigme 2 · La route",
      titre: "Le point d'abscisse 5",
      question: `Sur une carte, une route droite a pour équation <b>y = 2x + 3</b>.<br><br><b>Quelle est l'ordonnée</b> du point de la route d'abscisse 5 ?`,
      reponse: `On remplace x par 5 : y = 2 × 5 + 3 = <span class="big">13</span>.<br>Le point (5 ; 13) est sur la route ; (5 ; 12) ne l'est pas.`,
      consigne: "Ordonnée du point d'abscisse 5 de la droite y = 2x + 3 ?",
      verification: { type: "courte", attendus: ["13"] },
      dessin: route,
    },
    {
      tag: "Énigme 3 · Les parallèles",
      titre: "Même pente",
      question: `<b>Quelle droite</b> est parallèle à y = −3x + 1 ?<br>A. y = 3x + 1 B. y = −3x + 7 C. y = x − 3`,
      reponse: `Deux droites sont parallèles quand elles ont le <b>même coefficient directeur</b>.<br>Ici −3 : <span class="big">y = −3x + 7</span>.<br>Elle est juste « décalée » de 6 vers le haut.`,
      consigne: "Quelle droite est parallèle à y = −3x + 1 ?",
      verification: { type: "qcm", choix: ["y = 3x + 1", "y = −3x + 7", "y = x − 3"], bonne: 1 },
      dessin: paralleles,
    },
    {
      tag: "Énigme 4 · Les lasers",
      titre: "Le croisement",
      question: `Deux rayons laser suivent les droites <b>y = 2x + 1</b> et <b>y = −x + 7</b>.<br><br><b>En quel point</b> se croisent-ils ?`,
      reponse: `Au croisement, les deux y sont égaux : 2x + 1 = −x + 7, donc 3x = 6 et x = 2.<br>y = 2 × 2 + 1 = 5. Le point est <span class="big">(2 ; 5)</span>.`,
      consigne: "Point d'intersection de y = 2x + 1 et y = −x + 7 ?",
      verification: { type: "courte", attendus: ["(2;5)", "2;5"] },
      dessin: lasers,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Une droite debout",
      sorte: "piege",
      question: `<b>Quelle est l'équation</b> de la droite passant par A(3 ; 1) et B(3 ; 5) ?<br>A. y = 3 B. y = 3x C. x = 3`,
      reponse: `A et B ont la même abscisse : la droite est verticale. Pas de coefficient directeur (on diviserait par 3 − 3 = 0).<br>Tous ses points ont x = 3 : <span class="big">x = 3</span>.<br>y = 3 serait une droite horizontale.`,
      consigne: "Équation de la droite passant par (3 ; 1) et (3 ; 5) ?",
      verification: { type: "qcm", choix: ["y = 3", "y = 3x", "x = 3"], bonne: 2 },
      dessin: verticale,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Trois droites, un point",
      sorte: "defi",
      question: `Les droites <b>y = x + 1</b>, <b>y = −x + 5</b> et <b>y = 3x + k</b> passent par un même point.<br><br><b>Combien vaut k</b> ?`,
      reponse: `Les deux premières se croisent quand x + 1 = −x + 5 : x = 2, y = 3.<br>La troisième passe par (2 ; 3) : 3 = 3 × 2 + k, donc <span class="big">k = −3</span>.`,
      consigne: "Combien vaut k ?",
      verification: { type: "courte", attendus: ["−3", "-3"] },
      dessin: concourantes,
    },
  ],
};

export default problemes;
