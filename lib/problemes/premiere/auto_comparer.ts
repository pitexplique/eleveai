// Énigmes à projeter — première (sans spé maths), notion auto_comparer (deux
// offres de streaming, deux lycées, deux vinaigrettes, deux bouteilles d'huile,
// piège du ticket et de l'abonnement qui prennent 1 € chacun, défi des deux
// compagnies aériennes à 999 sur 1 000). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, bande } from "../dessins-ecole";
import { frac, svgFrac } from "../outils";

const streaming = svg("Deux offres : 9,99 euros par mois, ou 109 euros pour l'année",
  r(40, 70, 180, 150, C.bleu, 0.15, 3, 12) + r(260, 70, 180, 150, C.jaune, 0.15, 3, 12) +
    t(130, 115, "offre A", C.bleu, 22) + t(130, 165, "9,99 €", C.craie, 30) + t(130, 200, "par mois", C.pale, 18) +
    t(350, 115, "offre B", C.jaune, 22) + t(350, 165, "109 €", C.craie, 30) + t(350, 200, "par an", C.pale, 18) +
    t(240, 290, "sur 12 mois", C.craie, 22) + t(240, 380, `l'écart${NB}?`, C.rose, 28));

const lycees = (() => {
  const b = (x: number, h: number, c: string, n: string, eff: string) =>
    r(x, 330 - h, 110, h, c, 0.3, 3, 4) + t(x + 55, 320 - h, eff, C.craie, 22) + t(x + 55, 360, n, c, 22);
  return svg("Deux barres : le lycée A a 1 200 élèves, le lycée B en a 800",
    b(100, 240, C.bleu, "lycée A", "1 200") + b(270, 160, C.jaune, "lycée B", "800") + l(70, 330, 410, 330, C.craie, 3) +
      t(240, 405, `A = ? × B`, C.rose, 26));
})();

const vinaigrette = svg("Deux bandes : 2 parts sur 5 de vinaigre pour Léa, 3 parts sur 8 pour Sam",
  t(70, 105, "Léa", C.craie, 22, "start") + bande(140, 80, 300, 40, 5, 2, C.jaune) +
    t(70, 205, "Sam", C.craie, 22, "start") + bande(140, 180, 300, 40, 8, 3, C.bleu) +
    svgFrac(110, 290, 2, 5, C.jaune, 28) + t(170, 300, "ou", C.pale, 22) + svgFrac(230, 290, 3, 8, C.bleu, 28) +
    t(240, 395, `la plus grande part${NB}?`, C.rose, 26));

const huile = (() => {
  const bouteille = (x: number, h: number, c: string) =>
    r(x + 25, 300 - h - 30, 30, 30, c, 0.2, 3, 4) + r(x, 300 - h, 80, h, c, 0.3, 3, 14);
  return svg("Deux bouteilles d'huile : 1,5 litre à 4,20 euros, 2 litres à 5,40 euros",
    bouteille(110, 150, C.jaune) + bouteille(290, 200, C.bleu) +
      t(150, 330, "1,5 L", C.craie, 22) + t(150, 360, "4,20 €", C.jaune, 22) + t(330, 330, "2 L", C.craie, 22) + t(330, 360, "5,40 €", C.bleu, 22) +
      t(240, 405, `le prix d'un litre${NB}?`, C.rose, 26));
})();

const ticket = svg("Le ticket passe de 2 à 3 euros, l'abonnement de 100 à 101 euros : un euro de plus chacun",
  r(40, 70, 180, 120, C.bleu, 0.15, 3, 10) + t(130, 115, "ticket", C.bleu, 22) + t(130, 160, "2 € → 3 €", C.craie, 26) +
    r(260, 70, 180, 120, C.jaune, 0.15, 3, 10) + t(350, 115, "abonnement", C.jaune, 22) + t(350, 160, "100 € → 101 €", C.craie, 22) +
    t(130, 240, "+ 1 €", C.pale, 24) + t(350, 240, "+ 1 €", C.pale, 24) +
    t(240, 320, "différence : la même", C.craie, 22) + t(240, 390, `et le quotient${NB}?`, C.rose, 28));

const avions = svg("Deux compagnies : la A a 999 vols à l'heure sur 1 000, la B 1 000 sur 1 001",
  t(130, 80, "compagnie A", C.bleu, 22) + svgFrac(130, 150, "999", "1 000", C.bleu, 32) +
    t(350, 80, "compagnie B", C.jaune, 22) + svgFrac(350, 150, "1 000", "1 001", C.jaune, 32) +
    t(240, 270, "vols à l'heure", C.craie, 22) + t(240, 380, `la plus ponctuelle${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_comparer",
  titre: "Énigmes pour comparer deux nombres",
  description: "Deux offres de streaming, deux lycées, deux vinaigrettes, deux bouteilles d'huile, le piège du ticket et de l'abonnement, le défi des compagnies aériennes : comparer par la différence, par le quotient, comparer des fractions.",
  problemes: [
    {
      tag: "Énigme 1 · Les deux offres",
      titre: "Au mois ou à l'année",
      question: `Une plateforme de films propose l'offre A à <b>9,99 €</b> par mois, ou l'offre B à <b>109 €</b> pour un an.<br><br>Sur un an, <b>combien économise-t-on</b> avec la moins chère ?`,
      reponse: `Offre A sur un an : 12 × 9,99 = 119,88 €.<br>Différence : 119,88 − 109 = <span class="big">10,88 €</span>. La différence est positive : l'offre B est la moins chère.`,
      consigne: "9,99 € par mois ou 109 € par an : combien économise-t-on sur un an avec la moins chère ?",
      verification: { type: "courte", attendus: ["10,88"], unite: "€" },
      dessin: streaming,
    },
    {
      tag: "Énigme 2 · Les deux lycées",
      titre: "Combien de fois plus ?",
      question: `Le lycée A compte <b>1 200</b> élèves, le lycée B en compte <b>800</b>.<br><br>Le lycée A a <b>combien de fois plus</b> d'élèves que le B ?`,
      reponse: `On compare par le quotient : 1 200 ÷ 800 = <span class="big">1,5</span>.<br>Le lycée A a 1,5 fois plus d'élèves (400 de plus, c'est la différence).`,
      consigne: "1 200 élèves contre 800 : combien de fois plus ?",
      verification: { type: "qcm", choix: ["1,5 fois", "400 fois", "2 fois"], bonne: 0 },
      dessin: lycees,
    },
    {
      tag: "Énigme 3 · La vinaigrette",
      titre: "Deux fractions à comparer",
      question: `Dans sa vinaigrette, Léa met ${frac(2, 5)} de vinaigre. Sam en met ${frac(3, 8)}.<br><br><b>Qui met la plus grande part</b> de vinaigre ?`,
      reponse: `En décimal : ${frac(2, 5)} = 0,4 et ${frac(3, 8)} = 0,375.<br>Ou au même dénominateur : ${frac(16, 40)} > ${frac(15, 40)}. C'est <span class="big">Léa</span>.`,
      consigne: "Léa met 2/5 de vinaigre, Sam 3/8. Qui en met la plus grande part ?",
      verification: { type: "qcm", choix: ["Sam", "Léa", "La même part"], bonne: 1 },
      dessin: vinaigrette,
    },
    {
      tag: "Énigme 4 · L'huile d'olive",
      titre: "Le prix au litre",
      question: `Au supermarché, une bouteille de <b>1,5 L</b> d'huile coûte <b>4,20 €</b> ; une bouteille de <b>2 L</b> coûte <b>5,40 €</b>.<br><br><b>Quel est le prix d'un litre</b> pour la moins chère des deux ?`,
      reponse: `1,5 L : 4,20 ÷ 1,5 = 2,80 € le litre.<br>2 L : 5,40 ÷ 2 = 2,70 € le litre.<br>La grande bouteille revient à <span class="big">2,70 €</span> le litre.`,
      consigne: "1,5 L à 4,20 € ou 2 L à 5,40 € : quel est le plus petit prix au litre ?",
      verification: { type: "courte", attendus: ["2,70", "2,7"], unite: "€" },
      dessin: huile,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Un euro de plus chacun",
      sorte: "piege",
      question: `Le ticket de tram passe de <b>2 €</b> à <b>3 €</b>. L'abonnement de la salle de musique passe de <b>100 €</b> à <b>101 €</b>.<br><br><b>Lequel a le plus augmenté</b>, en proportion ?`,
      reponse: `La différence est la même (1 €), mais le quotient non !<br>Ticket : 3 ÷ 2 = 1,5 (+ 50 %). Abonnement : 101 ÷ 100 = 1,01 (+ 1 %).<br>C'est <span class="big">le ticket</span>.`,
      consigne: "Ticket : 2 € → 3 €. Abonnement : 100 € → 101 €. Lequel a le plus augmenté en proportion ?",
      verification: { type: "qcm", choix: ["L'abonnement", "Les deux autant", "Le ticket"], bonne: 2 },
      dessin: ticket,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Si près de 1",
      sorte: "defi",
      question: `La compagnie aérienne A a fait partir à l'heure <b>999</b> vols sur <b>1 000</b>. La compagnie B, <b>1 000</b> vols sur <b>1 001</b>.<br><br><b>Quelle compagnie</b> est la plus ponctuelle ?`,
      reponse: `On compare à 1 : il manque ${frac(1, "1 000")} à A et ${frac(1, "1 001")} à B.<br>${frac(1, "1 001")} est plus petit : B est plus proche de 1. C'est <span class="big">la compagnie B</span>.`,
      consigne: "A : 999 vols à l'heure sur 1 000. B : 1 000 sur 1 001. Quelle compagnie est la plus ponctuelle (A ou B) ?",
      verification: { type: "courte", attendus: ["B", "la B", "compagnie B", "la compagnie B"] },
      dessin: avions,
    },
  ],
};

export default problemes;
