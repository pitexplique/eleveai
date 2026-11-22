// Énigmes à projeter — seconde, notion fonctions_par_intervalles (la facture
// d'eau par tranches, le timbre selon le poids, le panneau du quai, la piste de
// VTT qui se raccorde, piège du tarif du zoo à 18 ans pile, défi de l'impôt
// par tranches). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { repere, type Repere } from "../dessins-2de";

/** Une marche de l'escalier : fermée à gauche (point plein) ou à droite selon `ferme`. */
const marche = (R: Repere, a: number, b: number, y: number, ferme: "g" | "d", c: string = C.bleu) =>
  l(R.X(a), R.Y(y), R.X(b), R.Y(y), c, 5) +
  `<circle cx="${R.X(ferme === "g" ? a : b)}" cy="${R.Y(y)}" r="7" fill="${c}"/>` +
  `<circle cx="${R.X(ferme === "g" ? b : a)}" cy="${R.Y(y)}" r="7" fill="${C.craie}" fill-opacity="0.05" stroke="${c}" stroke-width="3"/>`;

const eau = (() => {
  const R = repere(0, 20, 0, 50, { gl: 330, gh: 300, gy: 20, gx: 90, pasE: 10, pas: 5 });
  return svg("Le prix de l'eau : une pente douce jusqu'à 10 mètres cubes, puis une pente plus forte",
    R.fond + l(R.X(0), R.Y(0), R.X(10), R.Y(20), C.bleu, 5) + l(R.X(10), R.Y(20), R.X(20), R.Y(50), C.jaune, 5) +
      `<path d="M${R.X(15)} ${R.Y(0)} V${R.Y(35)} H${R.X(0)}" stroke="${C.rose}" stroke-width="2.5" fill="none" stroke-dasharray="8 6"/>` + R.point(15, 35, C.rose, 7) +
      t(R.X(6) + 8, R.Y(6), "2x", C.bleu, 20, "start") + t(R.X(15) - 14, R.Y(42), "20 + 3(x − 10)", C.jaune, 18, "end") +
      t(R.X(20), R.Y(0) + 46, "m³", C.pale, 17, "end") + t(240, 400, `le prix pour 15 m³${NB}?`, C.rose, 26));
})();

const timbre = (() => {
  const R = repere(0, 250, 0, 6, { gl: 330, gh: 280, gy: 30, gx: 90, pasE: 50, pas: 50 });
  return svg("Le prix du timbre en escalier : 1,50 euro jusqu'à 20 grammes, 3 euros jusqu'à 100 grammes, 5 euros jusqu'à 250 grammes",
    R.fond + marche(R, 0, 20, 1.5, "d") + marche(R, 20, 100, 3, "d") + marche(R, 100, 250, 5, "d") +
      `<path d="M${R.X(60)} ${R.Y(0)} V${R.Y(3) + 10}" stroke="${C.rose}" stroke-width="2.5" stroke-dasharray="8 6"/>` +
      t(R.X(60), R.Y(3) - 16, "60 g", C.rose, 18) + t(R.X(5), R.Y(1.5) - 14, "1,50", C.pale, 16, "start") + t(R.X(20), R.Y(3) - 14, "3", C.pale, 16, "start") + t(R.X(110), R.Y(5) - 14, "5", C.pale, 16, "start") +
      t(R.X(250), R.Y(0) + 46, "masse (g)", C.pale, 17, "end") + t(240, 400, `le prix pour 60 g${NB}?`, C.rose, 26));
})();

const quai = (() => {
  const R = repere(-1, 6, 0, 4, { gl: 330, gh: 280, gy: 30, gx: 90, pasE: 1 });
  return svg("La courbe de la distance au panneau, en forme de V, pointe en 2 ; la branche de gauche est en rose",
    R.fond + R.courbe((x) => 2 - x, -1, 2, C.rose, 6) + R.courbe((x) => x - 2, 2, 6, C.bleu, 5) + R.point(2, 0, C.craie, 7) +
      t(R.X(0.4), R.Y(0.8), `?`, C.rose, 26, "start") + t(R.X(4.6) + 6, R.Y(1.8), "x − 2", C.bleu, 20, "start") + t(R.X(3.2), R.Y(3.6), "|x − 2|", C.craie, 22) +
      t(240, 400, `la formule à gauche de 2${NB}?`, C.rose, 24));
})();

const vtt = (() => {
  const R = repere(0, 5, 0, 10, { gl: 330, gh: 300, gy: 20, gx: 90, pasE: 1 });
  return svg("Une piste en deux morceaux droits : 3x jusqu'à 2, puis x plus a, qui doit partir du même point",
    R.fond + l(R.X(0), R.Y(0), R.X(2), R.Y(6), C.bleu, 5) + l(R.X(2), R.Y(6), R.X(5), R.Y(9), C.jaune, 5) + R.point(2, 6, C.rose, 8) +
      t(R.X(1.1) - 10, R.Y(3.6), "3x", C.bleu, 20, "end") + t(R.X(3.8), R.Y(6.4), "x + a", C.jaune, 20, "start") +
      t(R.X(2) - 12, R.Y(6) - 12, "(2 ; 6)", C.rose, 18, "end") + t(240, 400, `quelle valeur pour a${NB}?`, C.rose, 26));
})();

const zoo = (() => {
  const R = repere(0, 25, 0, 10, { gl: 330, gh: 280, gy: 30, gx: 90, pasE: 5, pas: 5 });
  return svg("Le tarif du zoo en escalier : 0 euro avant 12 ans, 5 euros de 12 à 18 ans exclu, 9 euros à partir de 18 ans",
    R.fond + marche(R, 0, 12, 0, "g") + marche(R, 12, 18, 5, "g") + marche(R, 18, 25, 9, "g").replace(/<circle[^>]*fill-opacity[^>]*\/>$/, "") +
      `<path d="M${R.X(18)} ${R.Y(0)} V${R.Y(9)}" stroke="${C.rose}" stroke-width="2.5" stroke-dasharray="8 6"/>` +
      t(R.X(18) + 8, R.Y(0) - 12, "18 ans", C.rose, 18, "start") + t(R.X(13), R.Y(5) - 14, "5 €", C.pale, 16, "start") + t(R.X(21), R.Y(9) + 26, "9 €", C.pale, 16) +
      t(R.X(25), R.Y(0) + 46, "âge", C.pale, 17, "end") + t(240, 400, `combien paie Tom${NB}?`, C.rose, 26));
})();

const impot = (() => {
  const X = (v: number) => 40 + v * 10;
  return svg("Un revenu de 40 000 euros coupé en tranches : 10 000 à 0 %, 20 000 à 10 %, 10 000 à 30 %",
    t(240, 60, "revenu : 40 000 €", C.craie, 26) +
      r(X(0), 110, X(10) - X(0), 70, C.pale, 0.2, 3) + r(X(10), 110, X(30) - X(10), 70, C.bleu, 0.25, 3) + r(X(30), 110, X(40) - X(30), 70, C.jaune, 0.3, 3) +
      t((X(0) + X(10)) / 2, 153, "0 %", C.craie, 22) + t((X(10) + X(30)) / 2, 153, "10 %", C.bleu, 22) + t((X(30) + X(40)) / 2, 153, "30 %", C.jaune, 22) +
      t(X(0), 215, "0", C.pale, 17) + t(X(10), 215, "10 000", C.pale, 17) + t(X(30), 215, "30 000", C.pale, 17) + t(X(40) - 10, 215, "40 000", C.pale, 17) +
      t(240, 300, "chaque taux sur sa tranche", C.craie, 22) + t(240, 380, `l'impôt total${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "fonctions_par_intervalles",
  titre: "Énigmes des fonctions par intervalles",
  description: "La facture d'eau par tranches, le timbre selon le poids, le panneau du quai, la piste de VTT, le piège du tarif du zoo, le défi de l'impôt par tranches : fonctions affines par morceaux, fonctions en escalier, valeur absolue tracée.",
  problemes: [
    {
      tag: "Énigme 1 · La facture d'eau",
      titre: "Deux tranches de prix",
      question: `Une commune fait payer l'eau par tranches : <b>2 €</b> le m³ jusqu'à 10 m³, puis <b>3 €</b> le m³ au-delà.<br>Le prix est f(x) = 2x si x ≤ 10, et f(x) = 20 + 3(x − 10) si x > 10.<br><br><b>Combien coûtent 15 m³</b> ?`,
      reponse: `15 > 10 : on prend le 2e morceau.<br>f(15) = 20 + 3 × 5 = <span class="big">35 €</span> : 20 € pour les 10 premiers m³, 15 € pour les 5 suivants.`,
      consigne: "f(x) = 2x si x ≤ 10, f(x) = 20 + 3(x − 10) si x > 10. Que vaut f(15) ?",
      verification: { type: "courte", attendus: ["35"], unite: "€" },
      dessin: eau,
    },
    {
      tag: "Énigme 2 · Le timbre",
      titre: "Un prix en escalier",
      question: `Le prix d'un timbre dépend de la masse de la lettre : <b>1,50 €</b> jusqu'à 20 g, <b>3 €</b> de plus de 20 g à 100 g, <b>5 €</b> de plus de 100 g à 250 g.<br><br><b>Combien coûte</b> une lettre de 60 g ?`,
      reponse: `60 est dans ]20 ; 100] : on lit la marche du milieu.<br>Le timbre coûte <span class="big">3 €</span>. Le prix reste le même sur toute la marche.`,
      consigne: "Avec ce tarif en escalier, combien coûte une lettre de 60 g ?",
      verification: { type: "qcm", choix: ["3 €", "1,50 €", "5 €"], bonne: 0 },
      dessin: timbre,
    },
    {
      tag: "Énigme 3 · Le quai de la gare",
      titre: "La valeur absolue en deux morceaux",
      question: `Sur un quai, le panneau du wagon est au mètre <b>2</b>. La distance d'un voyageur au panneau est f(x) = |x − 2|.<br><br>Pour x &lt; 2, <b>quelle formule</b> donne f(x) sans valeur absolue ?`,
      reponse: `Si x &lt; 2, alors x − 2 est négatif : on change son signe.<br>f(x) = −(x − 2) = <span class="big">−x + 2</span>. À droite de 2, f(x) = x − 2 : deux morceaux de droites, un V.`,
      consigne: "f(x) = |x − 2|. Pour x < 2, que vaut f(x) ?",
      verification: { type: "qcm", choix: ["x − 2", "−x + 2", "x + 2"], bonne: 1 },
      dessin: quai,
    },
    {
      tag: "Énigme 4 · La piste de VTT",
      titre: "Sans marche ni trou",
      question: `Le profil d'une piste de VTT est f(x) = 3x pour x ≤ 2, puis f(x) = x + a pour x > 2.<br>Les deux morceaux doivent se raccorder, sans saut.<br><br><b>Quelle valeur</b> faut-il pour a ?`,
      reponse: `En x = 2, le 1er morceau donne 3 × 2 = 6.<br>Le 2e doit aussi donner 6 : 2 + a = 6, donc <span class="big">a = 4</span>.`,
      consigne: "f(x) = 3x si x ≤ 2 et f(x) = x + a si x > 2. Quelle valeur de a évite le saut ?",
      verification: { type: "qcm", choix: ["6", "2", "4"], bonne: 2 },
      dessin: vtt,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le zoo à 18 ans pile",
      sorte: "piege",
      question: `Au zoo, l'entrée est <b>gratuite</b> avant 12 ans, coûte <b>5 €</b> de 12 ans à moins de 18 ans, et <b>9 €</b> à partir de 18 ans.<br><br>Tom fête ses <b>18 ans</b> aujourd'hui. <b>Combien paie-t-il</b> ?`,
      reponse: `La marche à 5 € est [12 ; 18[ : le crochet ouvert exclut 18 !<br>18 est dans [18 ; +∞[ : Tom paie <span class="big">9 €</span>. Sur le graphique, le point plein est à 9.`,
      consigne: "Tarif : [0 ; 12[ → 0 €, [12 ; 18[ → 5 €, 18 et plus → 9 €. Combien paie-t-on à 18 ans ?",
      verification: { type: "courte", attendus: ["9"], unite: "€" },
      dessin: zoo,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'impôt par tranches",
      sorte: "defi",
      question: `Dans un pays, l'impôt se calcule par tranches : <b>0 %</b> jusqu'à 10 000 €, <b>10 %</b> de 10 000 € à 30 000 €, <b>30 %</b> au-delà.<br><br>Pour un revenu de <b>40 000 €</b>, <b>quel est l'impôt</b> ?`,
      reponse: `Chaque taux ne touche que sa tranche :<br>0 + 10 % × 20 000 + 30 % × 10 000 = 2 000 + 3 000 = <span class="big">5 000 €</span>.<br>Pas 30 % × 40 000 = 12 000 € : l'impôt est une fonction affine par morceaux.`,
      consigne: "Quel est l'impôt pour un revenu de 40 000 €, en € ?",
      verification: { type: "courte", attendus: ["5000"], unite: "€" },
      dessin: impot,
    },
  ],
};

export default problemes;
