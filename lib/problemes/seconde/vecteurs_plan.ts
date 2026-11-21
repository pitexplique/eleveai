// Énigmes à projeter — seconde, notion vecteurs_plan (le personnage du jeu
// vidéo, le drone en deux temps, les deux bouées, les deux remorqueurs, piège
// du parallélogramme, défi des trois arbres alignés). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, fleche } from "../dessins-ecole";
import { repere } from "../dessins-2de";

const vec = (nom: string) => `<span style="position:relative;display:inline-block">${nom}<span style="position:absolute;left:0;right:0;top:-0.55em;text-align:center;font-size:.8em">→</span></span>`;

const jeu = (() => {
  const R = repere(0, 6, 0, 4, { gl: 380, gh: 260, gy: 40 });
  return svg("Un personnage de jeu vidéo au point A de coordonnées 1 et 2, et le vecteur u de coordonnées 3 et moins 1",
    R.fond + R.point(1, 2, C.bleu, 10) + t(R.X(1) - 10, R.Y(2) - 14, "A", C.bleu, 24, "end") + fleche(R.X(1), R.Y(2), R.X(4), R.Y(1), C.jaune, 4) +
      t(R.X(2.5), R.Y(1.5) - 20, "u (3 ; −1)", C.jaune, 22) + t(240, 395, `où arrive-t-il${NB}?`, C.rose, 26));
})();

const drone = svg(
  "Un drone va du point A au point B, puis du point B au point C",
  fleche(70, 320, 230, 110, C.bleu, 4) + fleche(230, 110, 410, 260, C.jaune, 4) + `<path d="M70 320 L410 260" stroke="${C.pale}" stroke-width="3" stroke-dasharray="10 8"/>` +
    t(55, 340, "A", C.craie, 26) + t(230, 95, "B", C.craie, 26) + t(430, 270, "C", C.craie, 26) + t(240, 395, `un seul vecteur${NB}?`, C.rose, 26)
);

const bouees = (() => {
  const R = repere(0, 8, 0, 6, { gl: 360, gh: 270, gy: 40, gx: 70 });
  return svg("Un bateau va de la bouée A de coordonnées 2 et 5 à la bouée B de coordonnées 7 et 1",
    R.fond + R.point(2, 5, C.jaune, 11) + R.point(7, 1, C.jaune, 11) + t(R.X(2), R.Y(5) - 18, "A", C.craie, 24) + t(R.X(7) + 18, R.Y(1) - 10, "B", C.craie, 24, "start") +
      fleche(R.X(2), R.Y(5), R.X(7), R.Y(1), C.bleu, 4) + t(240, 400, `coordonnées du vecteur AB${NB}?`, C.rose, 24));
})();

const remorqueurs = svg(
  "Deux remorqueurs tirent un bateau : les vecteurs u de coordonnées 4 et 1, et v de coordonnées 2 et 3",
  r(60, 230, 90, 50, C.craie, 0.2, 3, 10) + fleche(150, 255, 330, 210, C.bleu, 5) + fleche(150, 255, 240, 120, C.jaune, 5) +
    t(330, 245, "u (4 ; 1)", C.bleu, 24, "start") + t(250, 110, "v (2 ; 3)", C.jaune, 24, "start") + t(240, 360, `u + v${NB}?`, C.rose, 30)
);

const piege = svg(
  "Un parallélogramme ABCD",
  `<path d="M80 300 L320 300 L400 120 L160 120 Z" fill="${C.bleu}" fill-opacity="0.12" stroke="${C.bleu}" stroke-width="4"/>` +
    t(65, 325, "A", C.craie, 26) + t(330, 330, "B", C.craie, 26) + t(415, 115, "C", C.craie, 26) + t(150, 108, "D", C.craie, 26) +
    t(240, 395, `quelle égalité${NB}?`, C.rose, 26)
);

const arbres = (() => {
  const R = repere(0, 8, 0, 11, { gl: 300, gh: 340, gy: 30, gx: 90, pasE: 2 });
  const arbre = (x: number, y: number) => `<circle cx="${R.X(x)}" cy="${R.Y(y) - 14}" r="14" fill="${C.jaune}" fill-opacity="0.6"/>` + R.point(x, y, C.craie, 5);
  return svg("Trois arbres A, B et C à aligner, C d'abscisse 7 et d'ordonnée inconnue",
    R.fond + arbre(1, 1) + arbre(3, 4) + t(R.X(1) + 22, R.Y(1), "A", C.craie, 22, "start") + t(R.X(3) + 22, R.Y(4), "B", C.craie, 22, "start") +
      `<path d="M${R.X(7)} ${R.Y(0)} L${R.X(7)} ${R.Y(11)}" stroke="${C.rose}" stroke-width="3" stroke-dasharray="8 6"/>` + t(R.X(7) + 10, R.Y(6), `C (7 ; y)`, C.rose, 22, "start"));
})();

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "vecteurs_plan",
  titre: "Énigmes des vecteurs",
  description: "Le personnage du jeu vidéo, le drone en deux temps, les deux bouées, les deux remorqueurs, le piège du parallélogramme, le défi des trois arbres alignés : translation, relation de Chasles, coordonnées, somme et colinéarité de vecteurs.",
  problemes: [
    {
      tag: "Énigme 1 · Le jeu vidéo",
      titre: "Un déplacement",
      question: `Dans un jeu vidéo, un personnage est en <b>A(1 ; 2)</b>. Il se déplace selon le vecteur <b>${vec("u")}(3 ; −1)</b>.<br><br><b>Quelles sont les coordonnées</b> de son point d'arrivée ?`,
      reponse: `On ajoute les coordonnées : x = 1 + 3 = 4 et y = 2 + (−1) = 1.<br>Il arrive en <span class="big">(4 ; 1)</span>.`,
      consigne: "Coordonnées de l'image de A(1 ; 2) par la translation de vecteur (3 ; −1) ?",
      verification: { type: "courte", attendus: ["(4;1)", "4;1"] },
      dessin: jeu,
    },
    {
      tag: "Énigme 2 · Le drone",
      titre: "Deux vols en un",
      question: `Un drone vole de A à B, puis de B à C.<br><br><b>Quel vecteur</b> donne le même déplacement en un seul vol ?`,
      reponse: `Relation de Chasles : ${vec("AB")} + ${vec("BC")} = <span class="big">${vec("AC")}</span>.<br>Le point d'arrivée de l'un est le point de départ de l'autre.`,
      consigne: "AB + BC est égal à quel vecteur ?",
      verification: { type: "qcm", choix: ["le vecteur AC", "le vecteur CA", "le vecteur BC"], bonne: 0 },
      dessin: drone,
    },
    {
      tag: "Énigme 3 · Les bouées",
      titre: "De A à B",
      question: `Un bateau va de la bouée <b>A(2 ; 5)</b> à la bouée <b>B(7 ; 1)</b>.<br><br><b>Quelles sont les coordonnées</b> du vecteur ${vec("AB")} ?`,
      reponse: `${vec("AB")}(x<sub>B</sub> − x<sub>A</sub> ; y<sub>B</sub> − y<sub>A</sub>) = (7 − 2 ; 1 − 5) = <span class="big">(5 ; −4)</span>.<br>5 vers la droite, 4 vers le bas.`,
      consigne: "Coordonnées du vecteur AB pour A(2 ; 5) et B(7 ; 1) ?",
      verification: { type: "courte", attendus: ["(5;−4)", "(5;-4)", "5;-4", "5;−4"] },
      dessin: bouees,
    },
    {
      tag: "Énigme 4 · Les remorqueurs",
      titre: "Tirer ensemble",
      question: `Deux remorqueurs tirent un bateau. Leurs forces sont représentées par <b>${vec("u")}(4 ; 1)</b> et <b>${vec("v")}(2 ; 3)</b>.<br><br><b>Quelles sont les coordonnées</b> de ${vec("u")} + ${vec("v")} ?`,
      reponse: `On ajoute coordonnée par coordonnée : (4 + 2 ; 1 + 3) = <span class="big">(6 ; 4)</span>.<br>Le bateau part dans cette direction.`,
      consigne: "Coordonnées de u(4 ; 1) + v(2 ; 3) ?",
      verification: { type: "qcm", choix: ["(2 ; −2)", "(6 ; 4)", "(8 ; 3)"], bonne: 1 },
      dessin: remorqueurs,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le parallélogramme",
      sorte: "piege",
      question: `ABCD est un parallélogramme.<br><br><b>Quelle égalité</b> est vraie ?<br>A. ${vec("AB")} = ${vec("CD")} B. ${vec("AD")} = ${vec("CB")} C. ${vec("AB")} = ${vec("DC")}`,
      reponse: `${vec("AB")} va de A vers B, vers la droite ; ${vec("CD")} va de C vers D, vers la gauche : sens contraires !<br>La bonne : <span class="big">${vec("AB")} = ${vec("DC")}</span> (même direction, même sens, même longueur).`,
      consigne: "ABCD parallélogramme : quelle égalité de vecteurs est vraie ?",
      verification: { type: "qcm", choix: ["AB = CD", "AD = CB", "AB = DC"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les trois arbres",
      sorte: "defi",
      question: `On plante trois arbres alignés : <b>A(1 ; 1)</b>, <b>B(3 ; 4)</b> et <b>C(7 ; y)</b>.<br><br><b>Combien vaut y</b> ?`,
      reponse: `${vec("AB")}(2 ; 3) et ${vec("AC")}(6 ; y − 1) doivent être colinéaires : 2(y − 1) − 3 × 6 = 0.<br>2y − 2 = 18, donc <span class="big">y = 10</span>.<br>Vérif : ${vec("AC")}(6 ; 9) = 3 × ${vec("AB")}.`,
      consigne: "A(1 ; 1), B(3 ; 4), C(7 ; y) alignés : combien vaut y ?",
      verification: { type: "courte", attendus: ["10"] },
      dessin: arbres,
    },
  ],
};

export default problemes;
