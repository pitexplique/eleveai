// Énigmes à projeter — 3e, notion entier_racine_carree (côté d'un carré,
// encadrer √50, la nappe trop petite, la pierre qui tombe, piège
// √9 + √16 = √25, défi des 100 casiers). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p, grille, fleche } from "../dessins-ecole";

// Le potager carré de 49 m² : 1 m = 34 px.
const potager = svg(
  "Un potager carré de 49 mètres carrés, partagé en 49 carrés de 1 mètre",
  r(121, 70, 238, 238, C.jaune, 0.2, 4) + grille(121, 70, 7, 7, 34, C.jaune, 1) + t(240, 200, "49 m²", C.craie, 40) +
    t(240, 55, "? m", C.rose, 26).replace("? m", `?${NB}m`) + t(240, 370, "un carreau = 1 m²", C.pale, 20)
);

// √50 sur une droite graduée de 5 à 9 : 1 unité = 90 px.
const encadrer = svg(
  "Une droite graduée de 5 à 9 ; la racine de 50 est entre 7 et 8",
  l(40, 230, 440, 230, C.craie, 3) + [5, 6, 7, 8, 9].map((v) => l(60 + 90 * (v - 5), 216, 60 + 90 * (v - 5), 244, C.craie, 3) + t(60 + 90 * (v - 5), 280, v, C.craie, 24) + t(60 + 90 * (v - 5), 315, `${v * v}`, C.pale, 18)).join("") +
    t(246, 120, "√50", C.rose, 50) + fleche(246, 140, 246, 205, C.rose, 3)
);

// La table carrée de 1,5 m et la nappe de 2 m² : 1 m = 160 px.
const nappe = svg(
  "Une table carrée de 1,5 m de côté et une nappe carrée de 2 mètres carrés posée dessus",
  r(120, 90, 240, 240, C.craie, 0.08, 4) + r(127, 97, 226, 226, C.rose, 0.25, 3).replace("/>", ' stroke-dasharray="10 6"/>') +
    t(240, 80, "table : 1,5 m de côté", C.craie, 22).replace(" :", `${NB}:`) + t(240, 220, "nappe 2 m²", C.rose, 28) +
    t(240, 385, `la nappe couvre-t-elle tout${NB}?`, C.rose, 24)
);

// La pierre qui tombe du pont : 45 m.
const pont = svg(
  "Une pierre lâchée d'un pont, 45 m au-dessus de la rivière",
  r(40, 70, 280, 26, C.craie, 0.25, 3) + l(80, 96, 80, 380, C.craie, 6) + l(260, 96, 260, 380, C.craie, 6) +
    p("M20 380 q60 -14 120 0 t120 0 t120 0 t120 0", C.bleu, 4) + o(330, 92, 12, C.pale, 0.8, 3) +
    l(330, 110, 330, 360, C.pale, 3, "8 8") + fleche(400, 90, 400, 375, C.craie, 3) + fleche(400, 375, 400, 90, C.craie, 3) + t(415, 240, "45 m", C.craie, 26, "start") +
    t(180, 45, "t = √(h ÷ 5)", C.rose, 26)
);

// Le piège : trois carrés de côtés 3, 4 et 5 ? (1 unité = 30 px).
const piege = svg(
  "Au tableau : racine de 9 plus racine de 16 égale racine de 25, avec un point d'interrogation",
  t(240, 200, "√9 + √16 = √25", C.bleu, 50) + t(240, 280, `vrai ou faux${NB}?`, C.rose, 30)
);

// Les 100 casiers : 10 rangées de 10 (la réponse ne se voit pas).
const casiers = () => {
  let s = "";
  for (let k = 1; k <= 100; k++) {
    const x = 50 + 38 * ((k - 1) % 10), y = 40 + 30 * Math.floor((k - 1) / 10);
    s += r(x, y, 34, 26, C.craie, 0, 2, 3) + t(x + 17, y + 19, k, C.pale, 13);
  }
  return svg("Cent casiers numérotés de 1 à 100, en dix rangées", s + t(240, 370, `combien restent ouverts${NB}?`, C.rose, 26));
};

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "entier_racine_carree",
  titre: "Énigmes de la racine carrée",
  description: "Le potager carré, √50 sur la droite graduée, la nappe trop petite, la pierre qui tombe du pont, le piège √9 + √16, le défi des 100 casiers : définition de la racine carrée, encadrement, calcul et règles.",
  problemes: [
    {
      tag: "Énigme 1 · Le potager carré",
      titre: "Le côté du potager",
      question: `Un potager <b>carré</b> a une aire de <b>49 m²</b>.<br><br><b>Combien mesure</b> son côté ?`,
      reponse: `On cherche le nombre positif dont le carré vaut 49 : c'est la <b>racine carrée</b> de 49.<br>√49 = <span class="big">7 m</span>, car 7 × 7 = 49.`,
      consigne: "Combien mesure le côté d'un carré de 49 m² ?",
      verification: {"type":"courte","attendus":["7"],"unite":"m"},
      dessin: potager,
    },
    {
      tag: "Énigme 2 · Encadrer",
      titre: "Où se cache √50 ?",
      question: `√50 n'est pas un nombre entier.<br><br><b>Entre quels entiers consécutifs</b> se trouve-t-il ?`,
      reponse: `On cherche les carrés autour de 50 : 7² = 49 et 8² = 64.<br>49 &lt; 50 &lt; 64, donc <span class="big">7 &lt; √50 &lt; 8</span>. Il est même tout près de 7 : √50 ≈ 7,07.`,
      consigne: "Entre quels entiers se trouve √50 ?",
      verification: {"type":"qcm","choix":["Entre 24 et 26","Entre 6 et 7","Entre 7 et 8"],"bonne":2},
      dessin: encadrer,
    },
    {
      tag: "Énigme 3 · La nappe",
      titre: "Assez grande ?",
      question: `Une table carrée mesure <b>1,5 m</b> de côté. Lucas a une nappe carrée de <b>2 m²</b>.<br><br>La nappe <b>couvre-t-elle</b> toute la table ?`,
      reponse: `Le côté de la nappe vaut √2 ≈ 1,41 m. C'est moins que 1,5 m : <span class="big">non, elle est trop petite</span>.<br>On peut aussi comparer les aires : la table fait 1,5² = 2,25 m², plus que 2 m².`,
      consigne: "La nappe carrée de 2 m² couvre-t-elle la table de 1,5 m de côté ?",
      verification: {"type":"qcm","choix":["Oui, il reste même du tissu","Non, elle est trop petite","Oui, tout juste"],"bonne":1},
      dessin: nappe,
    },
    {
      tag: "Énigme 4 · Sciences",
      titre: "La pierre qui tombe",
      question: `Quand on lâche une pierre, la durée de sa chute (en secondes) vaut environ <b>t = √(h ÷ 5)</b>, où h est la hauteur en mètres.<br><br>Une pierre tombe d'un pont de <b>45 m</b>. <b>Combien de secondes</b> dure la chute ?`,
      reponse: `h ÷ 5 = 45 ÷ 5 = 9, puis √9 = 3.<br>La chute dure <span class="big">3 secondes</span>.<br>Attention : pour une chute deux fois plus longue (6 s), il faut un pont 4 fois plus haut (180 m) !`,
      consigne: "Combien de secondes dure la chute depuis 45 m ?",
      verification: {"type":"courte","attendus":["3"],"unite":"s"},
      dessin: pont,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Racines qui s'ajoutent ?",
      sorte: "piege",
      question: `Au tableau, quelqu'un a écrit :<br><br><b>√9 + √16 = √25</b><br><br>Est-ce vrai ? <b>Combien vaut</b> √9 + √16 ?`,
      reponse: `√9 = 3 et √16 = 4, donc √9 + √16 = <span class="big">7</span>. Or √25 = 5.<br>7 ≠ 5 : <b>c'est faux</b>. On n'additionne pas les racines comme ça ! Par contre, √9 × √16 = √144 = 12 est vrai.`,
      consigne: "Combien vaut √9 + √16 ?",
      verification: {"type":"qcm","choix":["7","5","25"],"bonne":0},
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les 100 casiers",
      sorte: "defi",
      question: `Un couloir a <b>100 casiers fermés</b>, numérotés de 1 à 100. Cent élèves passent l'un après l'autre.<br>L'élève n° 1 change tous les casiers. L'élève n° 2 change les casiers 2, 4, 6… L'élève n° k change les casiers multiples de k. (Changer = ouvrir s'il est fermé, fermer s'il est ouvert.)<br><br><b>Combien de casiers</b> sont ouverts à la fin ?`,
      reponse: `Un casier est touché une fois par diviseur de son numéro. Il finit ouvert s'il a un nombre <b>impair</b> de diviseurs.<br>Les diviseurs vont par paires (12 = 1 × 12 = 2 × 6 = 3 × 4), sauf pour les carrés : 16 = 4 × 4.<br>Restent ouverts 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 : <span class="big">10 casiers</span>, car √100 = 10.`,
      consigne: "Combien de casiers sont ouverts à la fin ?",
      verification: {"type":"courte","attendus":["10"],"unite":"casiers"},
      dessin: casiers(),
    },
  ],
};

export default problemes;
