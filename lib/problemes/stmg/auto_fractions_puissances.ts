// Énigmes à projeter — STMG (1re), notion fractions, puissances et écritures
// (la journée de la commerciale, les deux magasins d'électroménager, l'usine
// d'eau minérale, le constructeur automobile, piège du magasin de peinture, défi
// du serveur de la banque en ligne). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { frac, svgFrac } from "../outils";

const journee = svg("La journée de la commerciale : un quart en rendez-vous, un tiers au téléphone",
  r(40, 150, 400, 80, C.craie, 0, 3, 6) +
    r(40, 150, 100, 80, C.bleu, 0.35, 3) + r(140, 150, 133, 80, C.jaune, 0.35, 3) +
    svgFrac(90, 110, 1, 4, C.bleu, 28) + svgFrac(206, 110, 1, 3, C.jaune, 28) +
    t(90, 270, "rendez-vous", C.bleu, 20) + t(206, 270, "téléphone", C.jaune, 20) +
    t(240, 360, `en tout :${NB}?`, C.rose, 28));

const magasins = svg("Deux magasins d'électroménager : trois cinquièmes de clients satisfaits dans A, cinq huitièmes dans B",
  r(40, 90, 180, 160, C.bleu, 0.15, 3, 10) + t(130, 135, "magasin A", C.craie, 24) + svgFrac(130, 205, 3, 5, C.bleu, 34) +
    r(260, 90, 180, 160, C.jaune, 0.15, 3, 10) + t(350, 135, "magasin B", C.craie, 24) + svgFrac(350, 205, 5, 8, C.jaune, 34) +
    t(240, 330, "clients satisfaits", C.pale, 24) + t(240, 380, `le meilleur :${NB}?`, C.rose, 28));

const usine = svg("L'usine d'eau minérale : dix puissance 4 bouteilles par jour pendant dix puissance 2 jours",
  r(50, 110, 380, 70, C.bleu, 0.15, 3, 10) + t(240, 157, "10⁴ bouteilles par jour", C.craie, 26) +
    r(50, 210, 380, 70, C.jaune, 0.15, 3, 10) + t(240, 257, "pendant 10² jours", C.craie, 26) +
    t(240, 360, `en tout :${NB}?`, C.rose, 28));

const constructeur = svg("Le constructeur automobile : 3 400 000 000 € de chiffre d'affaires",
  r(40, 130, 400, 90, C.jaune, 0.2, 3, 10) + t(240, 188, "3 400 000 000 €", C.craie, 34) +
    t(240, 300, "écriture scientifique", C.pale, 24) + t(240, 350, "?", C.rose, 34));

const peinture = svg("Le magasin de peinture : un demi-litre de blanc plus un tiers de litre de bleu. Hugo dit deux cinquièmes de litre",
  r(60, 110, 140, 150, C.craie, 0.15, 3, 10) + svgFrac(130, 195, 1, 2, C.craie, 34) + t(130, 290, "L de blanc", C.craie, 22) +
    t(240, 200, "+", C.craie, 40) +
    r(280, 110, 140, 150, C.bleu, 0.25, 3, 10) + svgFrac(350, 195, 1, 3, C.bleu, 34) + t(350, 290, "L de bleu", C.bleu, 22) +
    t(240, 370, `Hugo :${NB}« 2/5 L »${NB}?`, C.rose, 26));

const banque = svg("Le serveur de la banque : 2 fois dix puissance 12 octets ; un dossier client : 5 fois dix puissance 5 octets",
  r(40, 100, 400, 80, C.bleu, 0.15, 3, 10) + t(240, 152, "serveur : 2 × 10¹² octets", C.craie, 26) +
    r(40, 210, 400, 80, C.jaune, 0.15, 3, 10) + t(240, 262, "1 dossier : 5 × 10⁵ octets", C.craie, 26) +
    t(240, 360, `combien de dossiers${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_fractions_puissances",
  titre: "Énigmes de fractions et de puissances",
  description: "La journée de la commerciale, les deux magasins d'électroménager, l'usine d'eau minérale, le constructeur automobile, le piège du magasin de peinture, le défi du serveur de la banque : calculer avec des fractions, les comparer, calculer avec des puissances de 10, écriture scientifique.",
  problemes: [
    {
      tag: "Énigme 1 · La commerciale",
      titre: "Sa journée",
      question: `Une commerciale passe ${frac(1, 4)} de sa journée en rendez-vous.<br>Elle passe ${frac(1, 3)} de sa journée au téléphone.<br><br><b>Quelle fraction de sa journée</b> cela fait-il en tout ?`,
      reponse: `On met tout en douzièmes : ${frac(1, 4)} = ${frac(3, 12)} et ${frac(1, 3)} = ${frac(4, 12)}.<br>${frac(3, 12)} + ${frac(4, 12)} = <span class="big">${frac(7, 12)}</span> de sa journée.`,
      consigne: "1/4 de la journée en rendez-vous, 1/3 au téléphone. Quelle fraction en tout ?",
      verification: { type: "courte", attendus: ["7/12"] },
      dessin: journee,
    },
    {
      tag: "Énigme 2 · L'électroménager",
      titre: "Les clients satisfaits",
      question: `Deux magasins d'électroménager font une enquête.<br>Magasin A : ${frac(3, 5)} des clients sont satisfaits.<br>Magasin B : ${frac(5, 8)} des clients sont satisfaits.<br><br><b>Quel magasin a la plus grande part</b> de clients satisfaits ?`,
      reponse: `${frac(3, 5)} = 3 ÷ 5 = 0,6 et ${frac(5, 8)} = 5 ÷ 8 = 0,625.<br>0,625 > 0,6 : <span class="big">le magasin B</span>.<br>Autre façon : ${frac(3, 5)} = ${frac(24, 40)} et ${frac(5, 8)} = ${frac(25, 40)}.`,
      consigne: "Magasin A : 3/5 de clients satisfaits. Magasin B : 5/8. Quel magasin a la plus grande part ?",
      verification: { type: "qcm", choix: ["le magasin A", "le magasin B", "les deux pareil"], bonne: 1 },
      dessin: magasins,
    },
    {
      tag: "Énigme 3 · L'eau minérale",
      titre: "Des puissances de 10",
      question: `Une usine remplit 10<sup>4</sup> bouteilles d'eau par jour.<br>Elle tourne pendant 10<sup>2</sup> jours.<br><br><b>Combien de bouteilles</b> remplit-elle en tout ?`,
      reponse: `10<sup>4</sup> × 10<sup>2</sup> = 10<sup>4 + 2</sup> = <span class="big">10<sup>6</sup></span> bouteilles.<br>C'est un million de bouteilles. On ADDITIONNE les exposants.`,
      consigne: "10⁴ bouteilles par jour pendant 10² jours. Combien de bouteilles en tout ?",
      verification: { type: "qcm", choix: ["10⁶", "10⁸", "20⁶"], bonne: 0 },
      dessin: usine,
    },
    {
      tag: "Énigme 4 · Le constructeur automobile",
      titre: "Un très grand nombre",
      question: `Un constructeur automobile annonce 3 400 000 000 € de chiffre d'affaires.<br><br><b>Quelle est son écriture scientifique</b> ?`,
      reponse: `On place la virgule après le premier chiffre : 3,4.<br>On a décalé la virgule de 9 rangs : <span class="big">3,4 × 10<sup>9</sup> €</span>.<br>34 × 10<sup>8</sup> est juste, mais ce n'est pas l'écriture scientifique : 34 n'est pas entre 1 et 10.`,
      consigne: "3 400 000 000 €. Quelle est l'écriture scientifique ?",
      verification: { type: "qcm", choix: ["34 × 10⁸", "3,4 × 10⁸", "3,4 × 10⁹"], bonne: 2 },
      dessin: constructeur,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le magasin de peinture",
      sorte: "piege",
      question: `Dans un magasin de peinture, on mélange ${frac(1, 2)} L de blanc et ${frac(1, 3)} L de bleu.<br>Hugo : « 1 + 1 = 2 et 2 + 3 = 5, donc ${frac(2, 5)} L. »<br><br><b>Combien de litres</b> de peinture a-t-on vraiment ?`,
      reponse: `${frac(2, 5)} L est plus petit que ${frac(1, 2)} L : impossible !<br>${frac(1, 2)} = ${frac(3, 6)} et ${frac(1, 3)} = ${frac(2, 6)}.<br>${frac(3, 6)} + ${frac(2, 6)} = <span class="big">${frac(5, 6)} L</span>. On n'additionne pas les dénominateurs.`,
      consigne: "1/2 L de blanc et 1/3 L de bleu. Combien de litres en tout ?",
      verification: { type: "courte", attendus: ["5/6"], unite: "L" },
      dessin: peinture,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le serveur de la banque",
      sorte: "defi",
      question: `Le serveur d'une banque en ligne peut stocker 2 × 10<sup>12</sup> octets.<br>Un dossier client pèse 5 × 10<sup>5</sup> octets.<br><br><b>Combien de millions de dossiers</b> peut-il stocker ?`,
      reponse: `(2 × 10<sup>12</sup>) ÷ (5 × 10<sup>5</sup>) = (2 ÷ 5) × 10<sup>12 − 5</sup> = 0,4 × 10<sup>7</sup>.<br>0,4 × 10<sup>7</sup> = 4 × 10<sup>6</sup> : <span class="big">4 millions</span> de dossiers.`,
      consigne: "Un serveur de 2 × 10¹² octets, un dossier de 5 × 10⁵ octets. Combien de millions de dossiers ?",
      verification: { type: "courte", attendus: ["4"], unite: "millions" },
      dessin: banque,
    },
  ],
};

export default problemes;
