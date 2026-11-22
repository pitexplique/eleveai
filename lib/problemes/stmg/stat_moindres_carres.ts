// Énigmes à projeter — STMG (1re), notion méthode des moindres carrés
// (la société de dépannage informatique, le magasin de musique, le fabricant de
// parquet, la friterie, piège de la fabrique de sorbets, défi du loueur de
// motoneiges). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, l, r, svg, t } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const R1 = repereXY(0, 6, 0, 6, { etiquettes: false });
const ecarts1: [number, number][] = [[1, 2.6], [2, 2], [3, 4.2], [4, 3.4], [5, 5.6]];
const d1 = (x: number) => 0.8 * x + 1;
const depannage = svg("Nuage et droite ; chaque écart vertical entre un point et la droite porte un carré",
  R1.fond + R1.courbe(d1, 0, 6, C.bleu, 4) +
    ecarts1.map(([x, y]) => {
      const a = R1.Y(y), b = R1.Y(d1(x)), c = Math.abs(a - b);
      return r(R1.X(x), Math.min(a, b), c, c, C.jaune, 0.3, 2) + l(R1.X(x), a, R1.X(x), b, C.rose, 3);
    }).join("") +
    ecarts1.map(([x, y]) => R1.point(x, y, C.craie, 7)).join("") +
    t(240, 395, `que rend-on le plus petit${NB}?`, C.rose, 24));

const R2 = repereXY(0, 4, 0, 10, { ey: 2 });
const musique = svg("Trois points (1 ; 4), (2 ; 4), (3 ; 8) et la droite y égale 2 x plus 1 ; écarts plus 1, moins 1, plus 1",
  R2.fond + R2.courbe((x) => 2 * x + 1, 0, 4, C.bleu, 4) +
    ([[1, 4, 3], [2, 4, 5], [3, 8, 7]] as const).map(([x, y, f]) => l(R2.X(x), R2.Y(y), R2.X(x), R2.Y(f), C.rose, 3)).join("") +
    ([[1, 4], [2, 4], [3, 8]] as const).map(([x, y]) => R2.point(x, y, C.craie, 8)).join("") +
    t(R2.X(1) - 12, R2.Y(3.5) + 8, "+1", C.rose, 20, "end") + t(R2.X(2) + 12, R2.Y(4.5) + 8, "−1", C.rose, 20, "start") + t(R2.X(3) - 12, R2.Y(7.5) + 8, "+1", C.rose, 20, "end") +
    t(R2.X(4) - 4, R2.Y(9.3), "y = 2x + 1", C.bleu, 20, "end") +
    t(R2.X(0) + 8, 22, "guitares", C.pale, 17, "start") + t(R2.X(4), R2.Y(0) + 46, "semaine", C.pale, 17, "end") +
    t(240, 405, `somme des carrés des écarts${NB}?`, C.rose, 23));

const parquet = svg("Écarts des 4 points : droite d1 : 2, moins 1, 1, moins 2 ; droite d2 : 1, 1, moins 1, 0",
  tableau(25, 70, [110, 80, 80, 80, 80], 55, [["", "point 1", "point 2", "point 3", "point 4"], ["écart d1", 2, "−1", 1, "−2"], ["écart d2", 1, 1, "−1", 0]],
    (i, j) => (i === 0 || j === 0 ? C.pale : i === 1 ? C.jaune : C.bleu), 20) +
    t(240, 340, `quelle droite ajuste le mieux${NB}?`, C.rose, 25));

const friterie = svg("Écran de calculatrice : régression linéaire, y égale a x plus b, a égale 1,8, b égale 12,4",
  r(110, 50, 260, 230, C.craie, 0.08, 4, 16) + r(135, 75, 210, 150, C.bleu, 0.2, 2, 6) +
    t(150, 115, "RegLin", C.craie, 24, "start") + t(150, 152, "y = ax + b", C.craie, 22, "start") +
    t(150, 187, "a = 1,8", C.jaune, 22, "start") + t(150, 216, "b = 12,4", C.jaune, 22, "start") +
    t(240, 258, "x = jour · y = cornets", C.pale, 17) +
    t(240, 350, `quelle équation${NB}?`, C.rose, 28));

const sorbets = svg("Écarts des 4 points : plus 3, moins 3, plus 2, moins 2 ; Léo : la somme fait 0, la droite est parfaite",
  tableau(40, 60, [100, 80, 80, 80, 80], 55, [["point", 1, 2, 3, 4], ["écart", "+3", "−3", "+2", "−2"]], (i, j) => (j === 0 ? C.pale : C.craie), 22) +
    t(240, 230, "Léo : « 3 − 3 + 2 − 2 = 0", C.pale, 23) + t(240, 265, "donc la droite est parfaite ! »", C.pale, 23) +
    t(240, 355, `somme des carrés${NB}?`, C.rose, 30));

const motoneiges = svg("Motoneiges : points (1 ; 4), (2 ; 8), (3 ; 9) ; droite y égale 2 x plus b, b entier",
  tableau(65, 60, [130, 90, 90, 90], 50, [["semaine x", 1, 2, 3], ["locations y", 4, 8, 9]], (i, j) => (j === 0 ? C.pale : C.craie), 21) +
    r(90, 200, 300, 70, C.bleu, 0.15, 3, 10) + t(240, 245, "y = 2x + b", C.craie, 30) +
    t(240, 300, "b est un nombre entier", C.pale, 20) +
    t(240, 370, `quel b${NB}?`, C.rose, 32));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "stat_moindres_carres",
  titre: "Énigmes de la méthode des moindres carrés",
  description: "La société de dépannage informatique, le magasin de musique, le fabricant de parquet, la friterie, le piège de la fabrique de sorbets, le défi du loueur de motoneiges : comprendre ce que minimise la droite des moindres carrés, calculer une somme de carrés d'écarts et comparer deux droites.",
  problemes: [
    {
      tag: "Énigme 1 · Le dépannage informatique",
      titre: "Le principe",
      question: `Une société de dépannage informatique ajuste son nuage par une droite.<br>Elle prend la droite des moindres carrés.<br><br><b>Qu'est-ce que cette droite rend le plus petit possible</b> ?`,
      reponse: `On mesure l'écart vertical de chaque point à la droite.<br>On met chaque écart au carré, puis on additionne.<br><span class="big">La somme des carrés des écarts</span>.`,
      consigne: "Que rend-elle le plus petit possible ?",
      verification: { type: "qcm", choix: ["la somme des écarts", "la somme des carrés des écarts", "le plus grand écart"], bonne: 1 },
      dessin: depannage,
    },
    {
      tag: "Énigme 2 · Le magasin de musique",
      titre: "Calculer la somme des carrés",
      question: `Un magasin de musique compte ses guitares vendues sur 3 semaines.<br>On essaie la droite y = 2x + 1.<br>Les écarts sont +1, −1 et +1.<br><br><b>Combien vaut la somme des carrés des écarts</b> ?`,
      reponse: `1² + (−1)² + 1² = 1 + 1 + 1 = <span class="big">3</span>.`,
      consigne: "Combien vaut la somme des carrés des écarts ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: musique,
    },
    {
      tag: "Énigme 3 · Le fabricant de parquet",
      titre: "Comparer deux droites",
      question: `Un fabricant de parquet hésite entre deux droites, d1 et d2.<br>Le tableau donne les écarts des 4 points.<br><br><b>Quelle droite ajuste le mieux</b> au sens des moindres carrés ?`,
      reponse: `d1 : 4 + 1 + 1 + 4 = 10. d2 : 1 + 1 + 1 + 0 = 3.<br>La plus petite somme gagne : <span class="big">la droite d2</span>.`,
      consigne: "Quelle droite ajuste le mieux ?",
      verification: { type: "qcm", choix: ["d1", "les deux se valent", "d2"], bonne: 2 },
      dessin: parquet,
    },
    {
      tag: "Énigme 4 · La friterie",
      titre: "Lire la calculatrice",
      question: `Une friterie compte ses cornets de frites jour après jour.<br>La calculatrice donne la droite des moindres carrés.<br><br><b>Quelle est son équation</b> ?`,
      reponse: `La calculatrice donne y = ax + b avec a = 1,8 et b = 12,4.<br><span class="big">y = 1,8x + 12,4</span>.`,
      consigne: "Quelle est l'équation de la droite ?",
      verification: { type: "qcm", choix: ["y = 1,8x + 12,4", "y = 12,4x + 1,8", "y = 1,8 + 12,4"], bonne: 0 },
      dessin: friterie,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La fabrique de sorbets",
      sorte: "piege",
      question: `Une fabrique de sorbets teste une droite sur 4 points.<br>Les écarts : +3, −3, +2, −2.<br>Léo : « La somme fait 0, la droite est parfaite ! »<br><br><b>Combien vaut la somme des carrés des écarts</b> ?`,
      reponse: `Les écarts positifs et négatifs s'annulent : c'est pour ça qu'on les met au carré.<br>9 + 9 + 4 + 4 = <span class="big">26</span>.<br>La droite n'est pas parfaite.`,
      consigne: "Combien vaut la somme des carrés des écarts ?",
      verification: { type: "courte", attendus: ["26"] },
      dessin: sorbets,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le loueur de motoneiges",
      sorte: "defi",
      question: `Un loueur de motoneiges compte ses locations sur 3 semaines.<br>Il garde la pente 2 : y = 2x + b, avec b entier.<br><br><b>Quel b</b> donne la plus petite somme des carrés des écarts ?`,
      reponse: `y − 2x vaut 2, 4 et 3.<br>Avec b = 3 : écarts −1, 1, 0, somme 2.<br>Avec b = 2 ou b = 4 : somme 5.<br><span class="big">b = 3</span>.`,
      consigne: "Quel b donne la plus petite somme ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: motoneiges,
    },
  ],
};

export default problemes;
