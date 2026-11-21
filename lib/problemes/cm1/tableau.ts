// Énigmes à projeter — CM1, notion tableaux (les animaux de la classe : une
// case, le total, le moins nombreux ; les points des trois équipes, le piège des
// filles et des garçons, le défi de la case vide). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

/** Un tableau : lignes de cellules, la première ligne en en-tête. */
const tableau = (x: number, y: number, larg: number[], h: number, lignes: (string | number)[][], vide?: [number, number]) => {
  const L = larg.reduce((a, b) => a + b, 0);
  let s = r(x, y, L, h * lignes.length, C.craie, 0, 3) + r(x, y, L, h, C.jaune, 0.2, 0);
  lignes.forEach((ligne, i) => {
    if (i) s += l(x, y + i * h, x + L, y + i * h, C.craie, 2);
    let cx = x;
    ligne.forEach((c, j) => {
      if (i === 0 && j) s += l(cx, y, cx, y + h * lignes.length, C.craie, 2);
      const rose = vide && vide[0] === i && vide[1] === j;
      s += t(cx + larg[j] / 2, y + i * h + h / 2 + 8, c, rose ? C.rose : C.craie, 22);
      cx += larg[j];
    });
  });
  return s;
};

const ANIMAUX = [["animal", "élèves"], ["🐕 chien", 7], ["🐈 chat", 9], ["🐟 poisson", 4], ["🐇 lapin", 3]];
const animaux = (q: string) => svg(
  "Tableau des animaux de la classe : chien 7, chat 9, poisson 4, lapin 3",
  t(240, 40, "Nos animaux", C.craie, 26) + tableau(100, 60, [170, 110], 50, ANIMAUX) + t(240, 380, q, C.rose, 26)
);

const equipes = svg(
  "Tableau des points : Rouges 12 et 15, Bleus 14 et 10, Verts 9 et 17",
  tableau(50, 70, [140, 120, 120], 55, [["équipe", "manche 1", "manche 2"], ["Rouges", 12, 15], ["Bleus", 14, 10], ["Verts", 9, 17]]) +
    t(240, 370, `Le plus de points au total${NB}?`, C.rose, 24)
);

const sports = svg(
  "Tableau : filles foot 6, danse 8, judo 3 ; garçons foot 9, danse 2, judo 5",
  tableau(40, 90, [130, 100, 100, 100], 60, [["", "foot", "danse", "judo"], ["filles", 6, 8, 3], ["garçons", 9, 2, 5]]) +
    t(240, 340, `Garçons qui font de la danse${NB}?`, C.rose, 24)
);

const billets = svg(
  "Tableau des billets vendus : lundi 45, mardi ?, mercredi 38, total 120",
  tableau(90, 60, [170, 130], 52, [["jour", "billets"], ["lundi", 45], ["mardi", "?"], ["mercredi", 38], ["total", 120]], [2, 1]) +
    t(240, 385, `Mardi${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "tableau",
  titre: "Énigmes sur les tableaux",
  description: "Les animaux de la classe (lire une case, faire le total, trouver le moins nombreux), les points des trois équipes, le piège des filles et des garçons, le défi de la case vide.",
  problemes: [
    {
      tag: "Énigme 1 · Nos animaux",
      titre: "Lire une case",
      question: `La classe a fait un tableau de ses animaux.<br><br>Combien d'élèves ont un <b>chat</b> ?`,
      reponse: `On cherche la ligne « chat ».<br>On lit la case à côté : <span class="big">9 élèves</span>.`,
      consigne: "Combien d'élèves ont un chat ?",
      verification: { type: "courte", attendus: ["9"], unite: "élèves" },
      dessin: animaux(`Le chat${NB}?`),
    },
    {
      tag: "Énigme 2 · Nos animaux",
      titre: "Le total",
      question: `Regarde encore le tableau.<br><br>Combien d'<b>animaux</b> en tout ?`,
      reponse: `7 + 9 + 4 + 3.<br>7 + 3 = 10, 9 + 4 = 13. 10 + 13 = <span class="big">23 animaux</span>.`,
      consigne: "Combien d'animaux en tout ?",
      verification: { type: "courte", attendus: ["23"], unite: "animaux" },
      dessin: animaux(`En tout${NB}?`),
    },
    {
      tag: "Énigme 3 · Nos animaux",
      titre: "Le moins nombreux",
      question: `Quel animal est le <b>moins nombreux</b> dans la classe ?`,
      reponse: `On cherche le plus petit nombre : 3.<br>C'est <span class="big">le lapin</span>.`,
      consigne: "Quel animal est le moins nombreux ?",
      verification: { type: "qcm", choix: ["le poisson", "le lapin", "le chien"], bonne: 1 },
      dessin: animaux(`Le moins nombreux${NB}?`),
    },
    {
      tag: "Énigme 4 · Le tournoi",
      titre: "Les trois équipes",
      question: `Le tableau donne les points de chaque équipe, en <b>2 manches</b>.<br><br>Quelle équipe a le <b>plus de points au total</b> ?`,
      reponse: `Rouges : 12 + 15 = 27. Bleus : 14 + 10 = 24. Verts : 9 + 17 = 26.<br>Le plus : <span class="big">les Rouges</span>.`,
      consigne: "Quelle équipe a le plus de points au total ?",
      verification: { type: "qcm", choix: ["les Rouges", "les Bleus", "les Verts"], bonne: 0 },
      dessin: equipes,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Filles et garçons",
      sorte: "piege",
      question: `Le tableau compte les élèves inscrits à chaque sport.<br><br>Combien de <b>garçons</b> font de la <b>danse</b> ?`,
      reponse: `Le piège : lire la ligne des filles (8).<br>Ligne « garçons », colonne « danse ».<br>La case donne <span class="big">2</span>.`,
      consigne: "Combien de garçons font de la danse ?",
      verification: { type: "qcm", choix: ["8", "9", "2"], bonne: 2 },
      dessin: sports,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La case vide",
      sorte: "defi",
      question: `Au spectacle de l'école, on a vendu <b>120 billets</b> en 3 jours.<br>Lundi : <b>45</b>. Mercredi : <b>38</b>.<br><br>Combien de billets <b>mardi</b> ?`,
      reponse: `Lundi et mercredi : 45 + 38 = 83.<br>120 − 83 = <span class="big">37 billets</span>.`,
      consigne: "Combien de billets ont été vendus mardi ?",
      verification: { type: "courte", attendus: ["37"], unite: "billets" },
      dessin: billets,
    },
  ],
};

export default problemes;
