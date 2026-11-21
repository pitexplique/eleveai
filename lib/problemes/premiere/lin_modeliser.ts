// Énigmes à projeter — première (sans spé maths), notion lin_modeliser
// (les trois abonnements, la baignoire, les coraux du lagon de l'Hermitage,
// le camion de pompiers, piège des cours de natation, défi des deux ascenseurs). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 20) =>
  r(30, y, 420, 22 + 30 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 32 + 30 * k, s, c, taille)).join("");

const trois = svg("Trois situations : A, plus 2 euros chaque mois ; B, plus 3 pour cent par an ; C, fois 2 chaque semaine",
  cadre(30, ["A · + 2 € chaque mois"]) + cadre(110, ["B · + 3 % chaque année"]) + cadre(190, ["C · × 2 chaque semaine"]) +
    t(240, 320, "on ajoute toujours la même quantité…", C.pale, 19) +
    t(240, 385, `laquelle est linéaire${NB}?`, C.rose, 24));

const baignoire = svg("Trois situations : A, une cotisation versée chaque mois ; B, le niveau d'une baignoire qui se remplit ; C, les livres achetés chaque année",
  cadre(30, ["A · la cotisation de chaque mois"]) + cadre(110, ["B · l'eau d'une baignoire qui coule"]) + cadre(190, ["C · les livres achetés chaque année"]) +
    t(240, 320, "suite (étape par étape) ou fonction (à tout instant)", C.pale, 18) +
    t(240, 385, `laquelle est continue${NB}?`, C.rose, 24));

const coraux = svg("Tableau des boutures de coraux : mois 0, 1, 2, 3 ; 140, 165, 190, 215 coraux",
  tableau(25, 70, [130, 75, 75, 75, 75], 60, [["mois n", 0, 1, 2, 3], ["coraux", 140, 165, 190, 215]], (i, j) => (j === 0 ? C.pale : C.craie), 22) +
    t(240, 250, "+ 25 coraux par mois", C.pale, 20) +
    t(240, 385, `après 1 an${NB}?`, C.rose, 26));

const pompiers = (() => {
  const R = repereXY(0, 10, 0, 1800, { gx: 90, gy: 40, gl: 330, gh: 270, px: 1, ex: 2, py: 200, ey: 400 });
  return svg("Citerne d'un camion de pompiers qui se remplit : 500 litres au départ, plus 120 litres par minute ; une droite",
    R.fond + R.courbe((x) => 500 + 120 * x, 0, 10, C.bleu, 4) + R.point(0, 500, C.jaune, 8) +
      t(R.X(0) + 14, R.Y(500) + 26, "500 L", C.jaune, 18, "start") +
      t(R.X(0) + 10, 28, "volume (L)", C.pale, 17, "start") + t(R.X(10), R.Y(0) + 46, "minutes", C.pale, 17, "end") +
      t(240, 405, `après 7,5 min${NB}?`, C.rose, 24));
})();

const natation = svg("Tableau des cours de natation : 1 séance, 12 euros ; 2 séances, 21 euros ; 3 séances, 30 euros ; 8 séances, inconnu",
  tableau(25, 70, [130, 75, 75, 75, 75], 60, [["séances", 1, 2, 3, 8], ["prix (€)", 12, 21, 30, "?"]], (i, j) => (j === 0 ? C.pale : i === 1 && j === 4 ? C.jaune : C.craie), 22) +
    t(240, 250, "+ 9 € par séance de plus", C.pale, 20) +
    t(240, 385, `8 séances${NB}?`, C.rose, 26));

const ascenseurs = (() => {
  const R = repereXY(0, 25, 0, 70, { gx: 80, gy: 40, gl: 340, gh: 270, px: 5, ex: 5, py: 10, ey: 10 });
  return svg("Deux ascenseurs : le premier part de 0 mètre et monte de 2,5 mètres par seconde ; le second part de 60 mètres et descend de 1,5 mètre par seconde",
    R.fond + R.courbe((x) => 2.5 * x, 0, 24, C.bleu, 4) + R.courbe((x) => 60 - 1.5 * x, 0, 25, C.jaune, 4) +
      t(R.X(20) - 10, R.Y(50) - 12, "ascenseur 1", C.bleu, 18, "end") + t(R.X(1), R.Y(60) - 14, "ascenseur 2", C.jaune, 18, "start") +
      t(R.X(0) + 10, 28, "hauteur (m)", C.pale, 17, "start") + t(R.X(25), R.Y(0) + 46, "secondes", C.pale, 17, "end") +
      t(240, 405, `même hauteur quand${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "lin_modeliser",
  titre: "Énigmes pour modéliser une croissance linéaire",
  description: "Les trois abonnements, la baignoire, les coraux du lagon de l'Hermitage, le camion de pompiers, le piège des cours de natation, le défi des deux ascenseurs : reconnaître une croissance linéaire, choisir une suite ou une fonction affine, et répondre par une phrase.",
  problemes: [
    {
      tag: "Énigme 1 · Les trois abonnements",
      titre: "Reconnaître une croissance linéaire",
      question: `Trois montants évoluent. A : +2 € chaque mois. B : +3 % chaque année. C : × 2 chaque semaine.<br><br><b>Lequel</b> a une croissance linéaire ?`,
      reponse: `Linéaire : on ajoute toujours la <b>même quantité</b>.<br>B et C multiplient (croissance exponentielle). C'est <span class="big">A, +2 € chaque mois</span>.`,
      consigne: "A : +2 € par mois ; B : +3 % par an ; C : × 2 par semaine. Lequel est linéaire ?",
      verification: { type: "qcm", choix: ["A, +2 € chaque mois", "B, +3 % chaque année", "C, × 2 chaque semaine"], bonne: 0 },
      dessin: trois,
    },
    {
      tag: "Énigme 2 · La baignoire",
      titre: "Discret ou continu",
      question: `Trois situations sont linéaires. A : la cotisation versée chaque mois. B : l'eau d'une baignoire qui coule. C : les livres achetés chaque année.<br><br><b>Laquelle</b> se modélise par une fonction affine plutôt qu'une suite ?`,
      reponse: `A et C avancent par étapes (mois 1, 2, 3…) : ce sont des suites.<br>L'eau monte à <b>tout instant</b>, même à 2,7 min : <span class="big">B, la baignoire</span>, avec une fonction affine.`,
      consigne: "Cotisation mensuelle, baignoire qui se remplit, livres achetés par an : laquelle est une fonction affine (continue) ?",
      verification: { type: "qcm", choix: ["A, la cotisation", "B, la baignoire", "C, les livres"], bonne: 1 },
      dessin: baignoire,
    },
    {
      tag: "Énigme 3 · Les coraux de l'Hermitage",
      titre: "Modéliser par une suite",
      question: `Dans le lagon de l'Hermitage, une association a déjà 140 boutures de coraux. Elle en ajoute 25 chaque mois.<br><br><b>Combien</b> de boutures après 1 an ?`,
      reponse: `Suite arithmétique : u(0) = 140, r = 25, donc u(n) = 140 + 25n. Un an, c'est n = 12.<br>u(12) = 140 + 300 = 440. <span class="big">Après un an, il y a 440 boutures.</span>`,
      consigne: "140 boutures, puis 25 de plus chaque mois : combien après 12 mois ?",
      verification: { type: "courte", attendus: ["440"], unite: "boutures" },
      dessin: coraux,
    },
    {
      tag: "Énigme 4 · Le camion de pompiers",
      titre: "Modéliser par une fonction affine",
      question: `La citerne d'un camion de pompiers contient 500 L. On la remplit à 120 L par minute.<br><br><b>Combien de litres</b> contient-elle après 7,5 min ?`,
      reponse: `Le volume coule à tout instant : f(t) = 500 + 120t.<br>f(7,5) = 500 + 900 = 1 400. <span class="big">Après 7,5 min, la citerne contient 1 400 L.</span>`,
      consigne: "500 L au départ et 120 L par minute : combien de litres après 7,5 min ?",
      verification: { type: "courte", attendus: ["1400", "1 400"], unite: "L" },
      dessin: pompiers,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les cours de natation",
      sorte: "piege",
      question: `Une piscine vend des cours de natation : 1 séance 12 €, 2 séances 21 €, 3 séances 30 €.<br><br><b>Combien</b> coûtent 8 séances ?`,
      reponse: `Ce n'est pas proportionnel : 2 séances ne coûtent pas 24 €. On ajoute 9 € par séance de plus.<br>u(8) = 12 + 7 × 9 = 12 + 63 = <span class="big">75 €</span>. « 96 € » ferait 8 × 12.`,
      consigne: "1 séance 12 €, 2 séances 21 €, 3 séances 30 € : combien pour 8 séances ?",
      verification: { type: "qcm", choix: ["96 €", "72 €", "75 €"], bonne: 2 },
      dessin: natation,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux ascenseurs",
      sorte: "defi",
      question: `Dans une tour, l'ascenseur 1 part du sol et monte de 2,5 m par seconde. Au même instant, l'ascenseur 2 part de 60 m et descend de 1,5 m par seconde.<br><br><b>Au bout de combien</b> de secondes sont-ils à la même hauteur ?`,
      reponse: `Hauteurs : 2,5t et 60 − 1,5t. On résout 2,5t = 60 − 1,5t, donc 4t = 60 et t = 15.<br><span class="big">Après 15 s</span>, les deux sont à 37,5 m (2,5 × 15 = 37,5).`,
      consigne: "L'un monte de 2,5 m/s depuis 0 m, l'autre descend de 1,5 m/s depuis 60 m : au bout de combien de secondes même hauteur ?",
      verification: { type: "courte", attendus: ["15"], unite: "s" },
      dessin: ascenseurs,
    },
  ],
};

export default problemes;
