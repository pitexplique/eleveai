// Énigmes à projeter — CE2, notion données (les animaux de la ferme, les
// livres de la bibliothèque, le sport du mercredi en tableau à double entrée,
// le piège des chats noirs, le défi de la barre effacée). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

/** Un diagramme en barres : axe à gauche en x0, base en yb, u px par unité, graduations 0 → max. */
const barres = (valeurs: (number | null)[], noms: string[], max: number, couleurs: string[], x0 = 90, yb = 300, u = 24, pasBarre = 90) => {
  let s = l(x0, yb, x0 + pasBarre * valeurs.length + 10, yb, C.craie, 3) + l(x0, yb, x0, yb - max * u - 15, C.craie, 3);
  for (let v = 0; v <= max; v++) {
    s += l(x0 - 6, yb - v * u, x0, yb - v * u, C.craie, 2);
    if (v % 2 === 0) s += t(x0 - 14, yb - v * u + 7, v, C.craie, 18, "end") + (v ? l(x0, yb - v * u, x0 + pasBarre * valeurs.length + 10, yb - v * u, C.pale, 1, "4 6") : "");
  }
  valeurs.forEach((v, i) => {
    const x = x0 + 20 + i * pasBarre;
    if (v === null) s += t(x + 25, yb - 20, "?", C.rose, 40);
    else s += r(x, yb - v * u, 50, v * u, couleurs[i % couleurs.length], 0.45, 3);
    s += t(x + 25, yb + 28, noms[i], C.craie, 18);
  });
  return s;
};

/** Un tableau : lignes de cellules, la première ligne et la première colonne en jaune. */
const tableau = (lignes: (string | number)[][], x = 60, y = 60, lc = [150, 110], h = 50) => {
  let s = "";
  lignes.forEach((ligne, i) => {
    let xx = x;
    ligne.forEach((cel, j) => {
      const w = j === 0 ? lc[0] : lc[1];
      s += r(xx, y + i * h, w, h, i === 0 || j === 0 ? C.jaune : C.craie, i === 0 || j === 0 ? 0.15 : 0, 2) + t(xx + w / 2, y + i * h + 33, cel, C.craie, 22);
      xx += w;
    });
  });
  return s;
};

const ferme = svg(
  "Tableau de la ferme : poules 12, vaches 5, chèvres 8, moutons 9",
  tableau([["Animal", "Nombre"], ["🐔 poules", 12], ["🐄 vaches", 5], ["🐐 chèvres", 8], ["🐑 moutons", 9]], 105, 40, [160, 110], 52) +
    t(240, 365, `Le plus nombreux${NB}?`, C.rose, 28)
);

const biblio = (question: string) => svg(
  "Diagramme des livres empruntés : lundi 6, mardi 9, jeudi 4, vendredi 7",
  t(240, 30, "Livres empruntés", C.craie, 22) + barres([6, 9, 4, 7], ["lun", "mar", "jeu", "ven"], 10, [C.bleu]) +
    t(240, 385, question, C.rose, 26)
);

const sport = svg(
  "Tableau du sport du mercredi : filles natation 4, foot 3, danse 6 ; garçons natation 5, foot 7, danse 2",
  tableau([["", "natation", "foot", "danse"], ["filles", 4, 3, 6], ["garçons", 5, 7, 2]], 30, 70, [120, 105], 60) +
    t(240, 340, `Garçons et natation${NB}?`, C.rose, 28)
);

const chats = svg(
  "Diagramme des animaux de la classe : chiens 7, chats 6, poissons 3",
  t(240, 30, "Nos animaux", C.craie, 22) + barres([7, 6, 3], ["chiens", "chats", "poissons"], 8, [C.jaune, C.rose, C.bleu], 110, 290, 28, 100) +
    t(240, 385, `Combien de chats noirs${NB}?`, C.rose, 26)
);

const vote = svg(
  "Diagramme des votes pour la sortie : zoo 8, plage 5, la barre de la ferme est effacée ; 20 votes en tout",
  t(240, 30, "Vote pour la sortie", C.craie, 22) + barres([8, 5, null], ["zoo", "plage", "ferme"], 10, [C.bleu, C.jaune], 110, 300, 24, 100) +
    t(240, 365, "20 votes en tout", C.craie, 22) + t(240, 405, `Combien pour la ferme${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "donnees",
  titre: "Énigmes sur les tableaux et les graphiques",
  description: "Le tableau des animaux de la ferme, le diagramme des livres empruntés à la bibliothèque, le tableau à double entrée du sport du mercredi, le piège des chats noirs, le défi de la barre effacée.",
  problemes: [
    {
      tag: "Énigme 1 · La ferme",
      titre: "Les animaux",
      question: `Le fermier compte ses animaux.<br><br>Quels animaux sont <b>les plus nombreux</b> ?`,
      reponse: `On cherche le plus grand nombre : 12.<br>Ce sont <span class="big">les poules</span>.`,
      consigne: "Quels animaux sont les plus nombreux ?",
      verification: { type: "qcm", choix: ["Les poules", "Les moutons", "Les chèvres"], bonne: 0 },
      dessin: ferme,
    },
    {
      tag: "Énigme 2 · La bibliothèque",
      titre: "Le jour des livres",
      question: `Le diagramme montre les livres empruntés.<br><br>Quel jour en a-t-on emprunté <b>le plus</b> ?`,
      reponse: `On cherche la barre la plus haute.<br>Elle monte jusqu'à 9.<br>C'est <span class="big">mardi</span>.`,
      consigne: "Quel jour a-t-on emprunté le plus de livres ?",
      verification: { type: "qcm", choix: ["Lundi", "Mardi", "Vendredi"], bonne: 1 },
      dessin: biblio(`Quel jour le plus${NB}?`),
    },
    {
      tag: "Énigme 3 · La bibliothèque",
      titre: "Mardi et jeudi",
      question: `Mardi : <b>9 livres</b>.<br>Jeudi : <b>4 livres</b>.<br><br>Combien de livres <b>de plus</b> le mardi ?`,
      reponse: `On cherche l'écart : 9 − 4 = 5.<br><span class="big">5 livres</span> de plus.`,
      consigne: "Combien de livres de plus le mardi que le jeudi ?",
      verification: { type: "courte", attendus: ["5"], unite: "livres" },
      dessin: biblio(`Mardi${NB}: combien de plus${NB}?`),
    },
    {
      tag: "Énigme 4 · Le mercredi",
      titre: "Le sport",
      question: `Le tableau a des <b>lignes</b> et des <b>colonnes</b>.<br><br>Combien de <b>garçons</b> font de la <b>natation</b> ?`,
      reponse: `On prend la ligne « garçons ».<br>On descend la colonne « natation ».<br>On lit <span class="big">5</span>.`,
      consigne: "Combien de garçons font de la natation ?",
      verification: { type: "qcm", choix: ["4", "7", "5"], bonne: 2 },
      dessin: sport,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les chats noirs",
      sorte: "piege",
      question: `La classe a fait un diagramme de ses animaux.<br><br>Combien de chats sont <b>noirs</b> ?`,
      reponse: `Le piège : on lit 6 et on répond vite.<br>Mais le diagramme ne donne pas la couleur !<br><span class="big">On ne peut pas savoir</span>.`,
      consigne: "Combien de chats sont noirs ?",
      verification: { type: "qcm", choix: ["On ne peut pas savoir", "6", "3"], bonne: 0 },
      dessin: chats,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La barre effacée",
      sorte: "defi",
      question: `La classe vote pour la sortie.<br>Il y a <b>20 votes</b> en tout.<br>La barre de la ferme est effacée.<br><br>Combien de votes pour la ferme ?`,
      reponse: `Zoo et plage : 8 + 5 = 13.<br>Il manque 20 − 13 = 7.<br><span class="big">7 votes</span> pour la ferme.`,
      consigne: "Combien de votes pour la ferme ?",
      verification: { type: "courte", attendus: ["7"], unite: "votes" },
      dessin: vote,
    },
  ],
};

export default problemes;
