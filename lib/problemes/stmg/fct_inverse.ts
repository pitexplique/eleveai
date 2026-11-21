// Énigmes à projeter — STMG (Tle), fonction inverse (la sucrerie du Gol, la
// caméra de l'agence de sécurité, le fabricant d'étuis à lunettes, la cabane
// perchée, piège du chariot filoguidé, défi des magnets). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

/** Une carte : trois lignes (la première en grand) et la question. */
const carte = (aria: string, lignes: string[], question: string, coul: string = C.bleu) =>
  svg(aria,
    r(50, 40, 380, 240, coul, 0.1, 3, 14) +
    lignes.map((s, k) => t(240, 105 + k * 70, s, k ? C.pale : C.craie, k ? 24 : 32)).join("") +
    t(240, 365, question, C.rose, 28));

const R1 = repereXY(0, 5, 0, 2.5, { px: 1, py: 0.5 });
const sucre = svg("La sucrerie du Gol : f de x égale 1 sur x, tonnes de sucre par magasin ; la courbe descend ; un point en x égale 4",
  R1.fond + R1.courbe((x) => 1 / x, 0.42, 5, C.bleu, 4) +
    l(R1.X(4), R1.Y(0), R1.X(4), R1.Y(0.25), C.rose, 2, "8 6") + l(R1.X(0), R1.Y(0.25), R1.X(4), R1.Y(0.25), C.rose, 2, "8 6") +
    R1.point(4, 0.25, C.rose, 7) +
    t(R1.X(0) + 8, 24, "tonnes par magasin", C.pale, 17, "start") + t(462, R1.Y(0) + 46, "magasins", C.pale, 18, "end") +
    t(330, 110, "f(x) = 1 ÷ x", C.craie, 24) + t(240, 405, `4 magasins${NB}: chacun${NB}?`, C.rose, 26));

const R2 = repereXY(0, 1000, 0, 100, { px: 100, py: 20, ex: 200 });
const camera = svg("L'agence de sécurité : coût par jour de la caméra, f de x égale 1 000 sur x ; la courbe descend vers l'axe quand x grandit",
  R2.fond + R2.courbe((x) => 1000 / x, 10.5, 1000, C.bleu, 4) +
    t(R2.X(0) + 8, 24, "€ par jour", C.pale, 17, "start") + t(462, R2.Y(0) + 46, "jours", C.pale, 18, "end") +
    t(320, 110, `f(x) = 1${NB}000 ÷ x`, C.craie, 24) + t(240, 405, `x très grand${NB}: f(x)${NB}?`, C.rose, 26));

const etuis = carte("Le fabricant d'étuis à lunettes : C de x égale 300 plus 2 x ; coût moyen C de x divisé par x ; pour 100 étuis ?",
  ["C(x) = 300 + 2x", "coût moyen = C(x) ÷ x", "x = 100 étuis"], `coût moyen${NB}?`);

const cabane = carte("La cabane perchée : 1 200 euros la nuit partagés entre x personnes ; 150 euros chacun ; x ?",
  [`1${NB}200 € ÷ x`, "la nuit, à partager", "150 € chacun"], `x${NB}=${NB}?`, C.jaune);

const chariot = carte("Le chariot filoguidé : 1 kilomètre à la vitesse x ; temps égale 1 sur x heures ; x très petit ?",
  ["temps = 1 ÷ x", "1 km à x km/h", "x très proche de 0"], `le temps${NB}?`);

const magnets = carte("Les magnets : coût moyen 3 plus 600 sur x euros ; au plus 4 euros ; à partir de combien de magnets ?",
  ["3 + 600 ÷ x", "coût moyen en €", "au plus 4 €"], `x${NB}=${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "fct_inverse",
  titre: "Énigmes de la fonction inverse",
  description: "La sucrerie du Gol, la caméra de l'agence de sécurité, le fabricant d'étuis à lunettes, la cabane perchée, le piège du chariot filoguidé, le défi des magnets : lire la courbe de la fonction inverse, son comportement près de 0 et quand x devient très grand, et calculer un coût moyen ou un prix par personne.",
  problemes: [
    {
      tag: "Énigme 1 · La sucrerie du Gol",
      titre: "Lire la courbe",
      question: `La sucrerie du Gol, à Saint-Louis, partage 1 tonne de sucre roux entre x magasins.<br>Chaque magasin reçoit f(x) = 1 ÷ x tonne.<br><br><b>Combien reçoit chaque magasin</b> s'il y a 4 magasins ?`,
      reponse: `f(4) = 1 ÷ 4 = <span class="big">0,25 t</span>, soit 250 kg par magasin.<br>Sur la courbe : le point d'abscisse 4 a pour ordonnée 0,25.`,
      consigne: "Combien de tonnes par magasin ?",
      verification: { type: "courte", attendus: ["0,25", "0.25", "0,25 t", "250 kg", "1/4"] },
      dessin: sucre,
    },
    {
      tag: "Énigme 2 · L'agence de sécurité",
      titre: "Quand x devient très grand",
      question: `Une agence de sécurité achète une caméra 1 000 €.<br>Si elle s'en sert x jours, la caméra coûte f(x) = 1 000 ÷ x euros par jour.<br><br><b>Que devient f(x)</b> quand x devient très grand ?`,
      reponse: `1 000 ÷ 100 = 10 ; 1 000 ÷ 1 000 = 1 ; 1 000 ÷ 100 000 = 0,01…<br>f(x) <span class="big">devient proche de 0</span>, sans jamais l'atteindre : la courbe se rapproche de l'axe des abscisses.`,
      consigne: "Que devient f(x) ?",
      verification: { type: "qcm", choix: ["il devient très grand", "il devient proche de 0", "il devient négatif"], bonne: 1 },
      dessin: camera,
    },
    {
      tag: "Énigme 3 · Le fabricant d'étuis à lunettes",
      titre: "Le coût moyen",
      question: `Fabriquer x étuis à lunettes coûte C(x) = 300 + 2x euros.<br>Le coût moyen d'un étui, c'est C(x) ÷ x.<br><br><b>Quel est le coût moyen</b> pour 100 étuis ?`,
      reponse: `C(100) = 300 + 200 = 500 €.<br>Coût moyen : 500 ÷ 100 = <span class="big">5 €</span> par étui.<br>Autre écriture : 2 + 300 ÷ x = 2 + 3 = 5.`,
      consigne: "Quel est le coût moyen d'un étui ?",
      verification: { type: "qcm", choix: ["5 €", "2 €", "3 €"], bonne: 0 },
      dessin: etuis,
    },
    {
      tag: "Énigme 4 · La cabane perchée",
      titre: "Le prix par personne",
      question: `Une cabane perchée se loue 1 200 € la nuit.<br>Le prix est partagé entre x personnes : 1 200 ÷ x euros chacun.<br><br><b>Combien de personnes</b> pour payer 150 € chacun ?`,
      reponse: `1 200 ÷ x = 150, donc x = 1 200 ÷ 150 = <span class="big">8</span> personnes.<br>Plus on est nombreux, moins chacun paie.`,
      consigne: "Combien de personnes ?",
      verification: { type: "courte", attendus: ["8", "8 personnes"] },
      dessin: cabane,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le chariot filoguidé",
      sorte: "piege",
      question: `Dans un entrepôt, un chariot filoguidé parcourt 1 km à la vitesse de x km/h.<br>Il met 1 ÷ x heures.<br>Le chef dit : « si x est tout petit, le temps est tout petit aussi ».<br><br><b>Que devient le temps</b> quand x est très proche de 0 ?`,
      reponse: `1 ÷ 0,1 = 10 h ; 1 ÷ 0,01 = 100 h ; 1 ÷ 0,001 = 1 000 h.<br>Diviser par un nombre tout petit donne un résultat très grand : le temps devient <span class="big">très long</span>.`,
      consigne: "Que devient le temps ?",
      verification: { type: "qcm", choix: ["très proche de 0", "égal à 1 heure", "très long"], bonne: 2 },
      dessin: chariot,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les magnets",
      sorte: "defi",
      question: `Un atelier fabrique des magnets.<br>Pour x magnets, le coût moyen est 3 + 600 ÷ x euros.<br><br><b>À partir de combien de magnets</b> le coût moyen ne dépasse-t-il pas 4 € ?`,
      reponse: `3 + 600 ÷ x ≤ 4, donc 600 ÷ x ≤ 1, donc x ≥ 600.<br>Vérification : 3 + 600 ÷ 600 = 4 €.<br>À partir de <span class="big">600 magnets</span>.`,
      consigne: "À partir de combien de magnets ?",
      verification: { type: "courte", attendus: ["600", "600 magnets"] },
      dessin: magnets,
    },
  ],
};

export default problemes;
