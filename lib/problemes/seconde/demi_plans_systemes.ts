// Énigmes à projeter — seconde, notion demi_plans_systemes (le budget de
// l'anniversaire, la zone colorée, l'atelier de céramique, le coin de la zone,
// piège du signe qui change, défi de la brodeuse de Cilaos (974)). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, p } from "../dessins-ecole";
import { repere } from "../dessins-2de";

const anniversaire = svg(
  "Quatre pizzas à 10 euros et des boissons à 2 euros, budget 60 euros",
  [0, 1, 2, 3].map((k) => o(80 + 70 * k, 120, 30, C.jaune, 0.3, 3) + o(80 + 70 * k, 120, 6, C.rose, 0.8, 0)).join("") +
    t(195, 185, "4 pizzas à 10 €", C.craie, 20) +
    r(370, 85, 26, 70, C.bleu, 0.25, 3, 6) + t(383, 185, "2 € la boisson", C.bleu, 18) +
    t(240, 265, "10x + 2y ≤ 60", C.bleu, 30) + t(240, 345, `combien de boissons au plus${NB}?`, C.rose, 24)
);

const zone = (() => {
  const R = repere(-3, 3, -3, 3, { gl: 330, gh: 300, gy: 20, gx: 90, pasE: 1 });
  const poly = `M${R.X(-3)} ${R.Y(-3)} L${R.X(-1)} ${R.Y(-3)} L${R.X(2)} ${R.Y(3)} L${R.X(-3)} ${R.Y(3)} Z`;
  return svg("La droite y égale 2x moins 1 ; la zone au-dessus de la droite est colorée",
    `<path d="${poly}" fill="${C.bleu}" fill-opacity="0.18" stroke="none"/>` + R.fond + R.courbe((x) => 2 * x - 1, -1, 2, C.bleu, 4) +
      t(R.X(2) + 6, R.Y(2.6), "y = 2x − 1", C.bleu, 18, "start") + t(240, 395, `quelle inéquation${NB}?`, C.rose, 26));
})();

const ceramique = (() => {
  const R = repere(0, 6, 0, 10, { gl: 330, gh: 300, gy: 20, gx: 90, pasE: 2 });
  const poly = `M${R.X(0)} ${R.Y(0)} L${R.X(4)} ${R.Y(0)} L${R.X(4)} ${R.Y(2)} L${R.X(0)} ${R.Y(10)} Z`;
  return svg("La zone 2x plus y inférieur ou égal à 10 et x inférieur ou égal à 4, et le point de coordonnées 4 ; 3",
    `<path d="${poly}" fill="${C.bleu}" fill-opacity="0.18" stroke="none"/>` + R.fond + R.courbe((x) => 10 - 2 * x, 0, 5, C.bleu, 4) +
      p(`M${R.X(4)} ${R.Y(0)} V${R.Y(10)}`, C.jaune, 4) + R.point(4, 3, C.rose) + t(R.X(4) + 12, R.Y(3) - 8, "(4 ; 3)", C.rose, 18, "start") +
      t(R.X(1.8), R.Y(8.5), "2x + y = 10", C.bleu, 17, "start") + t(R.X(4) + 8, R.Y(8.6), "x = 4", C.jaune, 17, "start") + t(240, 395, `le point convient${NB}?`, C.rose, 26));
})();

const coin = (() => {
  const R = repere(0, 8, 0, 8, { gl: 320, gh: 320, gy: 20, gx: 90, pasE: 2 });
  return svg("Les droites x plus y égale 8 et x moins y égale 2, qui se coupent en un point marqué d'un point d'interrogation",
    R.fond + R.courbe((x) => 8 - x, 0, 8, C.bleu, 4) + R.courbe((x) => x - 2, 2, 8, C.jaune, 4) + R.point(5, 3, C.rose) +
      t(R.X(5) + 14, R.Y(3) + 6, "?", C.rose, 26, "start") + t(R.X(1.2), R.Y(7.6), "x + y = 8", C.bleu, 17, "start") + t(R.X(8) - 4, R.Y(6) - 16, "x − y = 2", C.jaune, 17, "end") +
      t(240, 400, `le coin de la zone${NB}?`, C.rose, 24));
})();

const signe = svg(
  "Au tableau : moins 2y inférieur ou égal à 4x moins 6, on divise par moins 2",
  t(240, 120, "−2y ≤ 4x − 6", C.craie, 34) + p("M240 150 v50", C.rose, 3) + t(250, 185, "÷ (−2)", C.rose, 22, "start") +
    t(175, 250, "y", C.bleu, 34) + r(205, 218, 46, 44, C.rose, 0.12, 3, 6) + t(228, 251, "?", C.rose, 30) + t(268, 250, "−2x + 3", C.bleu, 34, "start") + t(240, 340, `quel symbole${NB}?`, C.rose, 28)
);

const broderie = (() => {
  const R = repere(0, 10, 0, 14, { gl: 330, gh: 300, gy: 20, gx: 90, pasE: 2 });
  const poly = `M${R.X(0)} ${R.Y(0)} L${R.X(7)} ${R.Y(0)} L${R.X(4)} ${R.Y(6)} L${R.X(0)} ${R.Y(10)} Z`;
  return svg("La zone des productions possibles : x plus y inférieur ou égal à 10 et 2x plus y inférieur ou égal à 14, avec ses coins",
    `<path d="${poly}" fill="${C.jaune}" fill-opacity="0.2" stroke="none"/>` + R.fond + R.courbe((x) => 10 - x, 0, 10, C.bleu, 3) + R.courbe((x) => 14 - 2 * x, 2, 7, C.jaune, 3) +
      R.point(7, 0, C.rose, 7) + R.point(4, 6, C.rose, 7) + R.point(0, 10, C.rose, 7) + t(R.X(4) - 12, R.Y(6) + 24, "(4 ; 6)", C.rose, 18, "end") +
      t(R.X(5), R.Y(12.5), "nappes x, napperons y", C.pale, 17) + t(240, 395, `le bénéfice maximal${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "demi_plans_systemes",
  titre: "Énigmes des demi-plans et des systèmes d'inéquations",
  description: "Le budget de l'anniversaire, la zone colorée, l'atelier de céramique, le coin de la zone, le piège du signe qui change, le défi de la brodeuse de Cilaos : inéquations à deux inconnues, demi-plans, systèmes, optimisation.",
  problemes: [
    {
      tag: "Énigme 1 · L'anniversaire",
      titre: "Le budget",
      question: `Pour un anniversaire, une pizza coûte <b>10 €</b>, une boisson <b>2 €</b>. Le budget est de <b>60 €</b> : 10x + 2y ≤ 60.<br><br>Avec <b>4 pizzas</b>, combien de boissons au plus ?`,
      reponse: `x = 4 : 40 + 2y ≤ 60, donc 2y ≤ 20, donc y ≤ 10.<br>Au plus <span class="big">10 boissons</span>.`,
      consigne: "Avec 4 pizzas, combien de boissons au plus ?",
      verification: { type: "courte", attendus: ["10"], unite: "boissons" },
      dessin: anniversaire,
    },
    {
      tag: "Énigme 2 · La zone colorée",
      titre: "Au-dessus de la droite",
      question: `La zone colorée est au-dessus de la droite d'équation y = 2x − 1 (droite exclue).<br><br><b>Quelle inéquation</b> la décrit ?`,
      reponse: `Au-dessus de la droite, l'ordonnée est plus grande que 2x − 1.<br>Test avec O(0 ; 0), dans la zone : 0 > −1, vrai. <span class="big">y > 2x − 1</span>.`,
      consigne: "Quelle inéquation décrit la zone au-dessus de la droite y = 2x − 1 ?",
      verification: { type: "qcm", choix: ["y > 2x − 1", "y < 2x − 1", "y > −2x + 1"], bonne: 0 },
      dessin: zone,
    },
    {
      tag: "Énigme 3 · L'atelier de céramique",
      titre: "Deux contraintes à la fois",
      question: `Un vase demande <b>2 h</b> de travail, un bol <b>1 h</b>. L'atelier dispose de 10 h et fait au plus 4 vases : 2x + y ≤ 10 et x ≤ 4.<br><br><b>4 vases et 3 bols</b> : est-ce possible ?`,
      reponse: `x = 4 ≤ 4 : d'accord. Mais 2 × 4 + 3 = 11 > 10.<br><span class="big">Non : trop d'heures</span>. Le point (4 ; 3) est hors de la zone.`,
      consigne: "2x + y ≤ 10 et x ≤ 4 : 4 vases et 3 bols, est-ce possible ?",
      verification: { type: "qcm", choix: ["Oui", "Non : trop d'heures", "Non : trop de vases"], bonne: 1 },
      dessin: ceramique,
    },
    {
      tag: "Énigme 4 · Le coin de la zone",
      titre: "Deux droites qui se coupent",
      question: `La zone est limitée par les droites x + y = 8 et x − y = 2.<br><br><b>Quelles sont les coordonnées</b> du coin où elles se coupent ?`,
      reponse: `On additionne : 2x = 10, donc x = 5. Puis y = 8 − 5 = 3.<br>Le coin est <span class="big">(5 ; 3)</span>. Vérification : 5 − 3 = 2.`,
      consigne: "Coordonnées du point d'intersection de x + y = 8 et x − y = 2 ?",
      verification: { type: "courte", attendus: ["(5;3)", "5;3", "(5,3)"] },
      dessin: coin,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Diviser par un négatif",
      sorte: "piege",
      question: `On veut isoler y dans −2y ≤ 4x − 6. On divise par −2.<br><br><b>Qu'obtient-on</b> ?`,
      reponse: `Diviser par un nombre <b>négatif</b> change le sens de l'inégalité !<br>4x ÷ (−2) = −2x et −6 ÷ (−2) = 3 : <span class="big">y ≥ −2x + 3</span>. La zone est au-dessus de la droite.`,
      consigne: "−2y ≤ 4x − 6 : qu'obtient-on en divisant par −2 ?",
      verification: { type: "qcm", choix: ["y ≤ −2x + 3", "y ≥ 2x − 3", "y ≥ −2x + 3"], bonne: 2 },
      dessin: signe,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La brodeuse de Cilaos",
      sorte: "defi",
      question: `Une brodeuse de Cilaos fait x nappes et y napperons par mois : x + y ≤ 10 (tissu) et 2x + y ≤ 14 (temps).<br>Une nappe rapporte <b>50 €</b>, un napperon <b>30 €</b>.<br><br><b>Quel est le bénéfice maximal</b> ?`,
      reponse: `Le maximum est à un coin de la zone :<br>(7 ; 0) : 350 € ; (0 ; 10) : 300 € ; (4 ; 6) : 200 + 180 = 380 €.<br>Bénéfice maximal : <span class="big">380 €</span>, avec 4 nappes et 6 napperons.`,
      consigne: "Quel est le bénéfice maximal de la brodeuse, en € ?",
      verification: { type: "courte", attendus: ["380"], unite: "€" },
      dessin: broderie,
    },
  ],
};

export default problemes;
