// Énigmes à projeter — première (sans spé maths), notion quad_racines_signe
// (la ferme aquaponique, le sous-marin de poche, le vendeur de crêpes, le fossé
// d'irrigation, piège de l'affiche de concert, défi de la boutique de souvenirs). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 20) =>
  r(30, y, 420, 22 + 34 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 36 + 34 * k, s, c, taille)).join("");

const ferme = svg("Bénéfice d'une ferme aquaponique : f(x) = 3(x − 5)(x + 2)",
  cadre(40, ["f(x) = 3(x − 5)(x + 2)"], C.bleu, 26) +
    t(240, 180, "un produit est nul…", C.pale, 20) + t(240, 215, "… quand un facteur est nul", C.pale, 20) +
    t(240, 385, `les racines${NB}?`, C.rose, 26));

const sousMarin = svg("Tableau de signes : x de moins l'infini à plus l'infini, valeurs 1 et 6 ; x − 1 : moins, 0, plus ; x − 6 : moins, 0, plus ; signe de f inconnu",
  tableau(30, 40, [96, 46, 46, 46, 46, 46, 46, 46], 50, [
    ["x", "−∞", "", "1", "", "6", "", "+∞"],
    ["x − 1", "", "−", "0", "+", "", "+", ""],
    ["x − 6", "", "−", "", "−", "0", "+", ""],
    ["f(x)", "", "?", "0", "?", "0", "?", ""],
  ], (i, j) => (j === 0 ? C.pale : i === 3 ? C.jaune : C.craie), 20) +
    t(240, 290, "f(x) = (x − 1)(x − 6)", C.bleu, 22) +
    t(240, 385, `f(x) &lt; 0 sur${NB}?`, C.rose, 26));

const crepes = svg("Bénéfice d'un vendeur de crêpes : B(x) = −(x − 2)(x − 8), x en centaines de crêpes",
  cadre(40, ["B(x) = −(x − 2)(x − 8)", "x en centaines de crêpes"], C.bleu, 24) +
    t(240, 230, "pas de perte : B(x) ≥ 0", C.pale, 20) +
    t(240, 385, `au plus combien de crêpes${NB}?`, C.rose, 24));

const fosse = (() => {
  const R = repereXY(-4, 6, -35, 10, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 2, py: 5, ey: 100 });
  return svg("Coupe d'un fossé d'irrigation : f(x) = a(x + 3)(x − 5) ; la courbe passe par (0 ; −30)",
    R.fond + R.courbe((x) => 2 * (x + 3) * (x - 5), -3, 5, C.bleu, 4) + R.point(0, -30, C.jaune, 7) + t(R.X(0) + 12, R.Y(-30) - 10, "−30", C.jaune, 18, "start") +
      t(R.X(0) + 10, 28, "profondeur (cm)", C.pale, 17, "start") +
      t(240, 405, `f(x) = a(x + 3)(x − 5)${NB}: a = ${NB}?`, C.rose, 22));
})();

const affiche = svg("Aire d'une affiche de concert : (x − 3)(x + 4) ; on cherche sa forme développée",
  cadre(40, ["(x − 3)(x + 4) = ?"], C.bleu, 26) +
    t(240, 180, "x × x, x × 4, −3 × x, −3 × 4", C.pale, 20) +
    t(240, 385, `la forme développée${NB}?`, C.rose, 24));

const boutique = svg("Solde d'une boutique de souvenirs : S(x) = (x − 2)(x − 9), x = numéro du mois de 1 à 12",
  cadre(40, ["S(x) = (x − 2)(x − 9)", "x = numéro du mois (1 à 12)"], C.bleu, 24) +
    t(240, 230, "S(x) &lt; 0 : un mois en déficit", C.pale, 20) +
    t(240, 385, `combien de mois en déficit${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "quad_racines_signe",
  titre: "Énigmes des racines et du signe d'un polynôme du second degré",
  description: "La ferme aquaponique, le sous-marin de poche, le vendeur de crêpes, le fossé d'irrigation, le piège de l'affiche de concert, le défi de la boutique de souvenirs : lire les racines dans la forme factorisée, dresser un tableau de signes, résoudre une inéquation, retrouver a, vérifier un développement.",
  problemes: [
    {
      tag: "Énigme 1 · La ferme aquaponique",
      titre: "Les racines",
      question: `Le bénéfice d'une ferme aquaponique est f(x) = 3(x − 5)(x + 2).<br><br><b>Quelles sont</b> les racines de f ?`,
      reponse: `x − 5 = 0 donne x = 5 ; x + 2 = 0 donne x = −2. Le 3 n'est jamais nul.<br>Les racines sont <span class="big">5 et −2</span>.`,
      consigne: "f(x) = 3(x − 5)(x + 2) : quelles sont les racines ?",
      verification: { type: "qcm", choix: ["x = 5 et x = −2", "x = −5 et x = 2", "x = 3, x = 5 et x = −2"], bonne: 0 },
      dessin: ferme,
    },
    {
      tag: "Énigme 2 · Le sous-marin de poche",
      titre: "Le tableau de signes",
      question: `L'altitude d'un sous-marin de poche, en dizaines de m, est f(x) = (x − 1)(x − 6). Il est sous l'eau quand f(x) &lt; 0.<br><br><b>Sur quel intervalle</b> f(x) &lt; 0 ?`,
      reponse: `Entre 1 et 6, un facteur est positif et l'autre négatif : le produit est négatif.<br>f(x) &lt; 0 sur <span class="big">]1 ; 6[</span> : le sous-marin plonge entre 1 et 6 min.`,
      consigne: "f(x) = (x − 1)(x − 6) : sur quel intervalle a-t-on f(x) < 0 ?",
      verification: { type: "qcm", choix: ["]−∞ ; 1[ et ]6 ; +∞[", "]1 ; 6[", "]−6 ; −1["], bonne: 1 },
      dessin: sousMarin,
    },
    {
      tag: "Énigme 3 · Le vendeur de crêpes",
      titre: "Résoudre une inéquation",
      question: `Un vendeur de crêpes vend x centaines de crêpes. Son bénéfice est B(x) = −(x − 2)(x − 8).<br><br><b>Au plus combien</b> de crêpes peut-il vendre sans perdre d'argent ?`,
      reponse: `a = −1 &lt; 0 : B est positif entre les racines 2 et 8. B(x) ≥ 0 sur [2 ; 8].<br>Au plus x = 8, soit <span class="big">800 crêpes</span>. Au-delà, il perd de l'argent.`,
      consigne: "B(x) = −(x − 2)(x − 8), x en centaines : au plus combien de crêpes sans perte ?",
      verification: { type: "courte", attendus: ["800"], unite: "crêpes" },
      dessin: crepes,
    },
    {
      tag: "Énigme 4 · Le fossé d'irrigation",
      titre: "Écrire la forme factorisée",
      question: `La coupe d'un fossé a ses bords en x = −3 et x = 5 : f(x) = a(x + 3)(x − 5). Au milieu du fossé, en x = 0, la profondeur est f(0) = −30.<br><br><b>Combien vaut</b> a ?`,
      reponse: `f(0) = a × 3 × (−5) = −15a. Donc −15a = −30.<br><span class="big">a = 2</span> : f(x) = 2(x + 3)(x − 5).`,
      consigne: "f(x) = a(x + 3)(x − 5) et f(0) = −30 : combien vaut a ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: fosse,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'affiche de concert",
      sorte: "piege",
      question: `L'aire d'une affiche de concert est (x − 3)(x + 4). Yanis dit : « ça fait x² − 12 ».<br><br><b>Quelle est</b> la bonne forme développée ?`,
      reponse: `On n'oublie pas les termes du milieu : x² + 4x − 3x − 12.<br>On réduit : <span class="big">x² + x − 12</span>. Yanis a oublié 4x − 3x.`,
      consigne: "Quelle est la forme développée de (x − 3)(x + 4) ?",
      verification: { type: "qcm", choix: ["x² − 12", "x² + 7x − 12", "x² + x − 12"], bonne: 2 },
      dessin: affiche,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La boutique de souvenirs",
      sorte: "defi",
      question: `Le solde d'une boutique de souvenirs au mois x (de 1 à 12) est S(x) = (x − 2)(x − 9), en k€.<br><br><b>Combien de mois</b> la boutique est-elle en déficit ?`,
      reponse: `a = 1 > 0 : S(x) &lt; 0 entre les racines, sur ]2 ; 9[. En x = 2 et x = 9, S = 0 : pas de déficit.<br>Les mois 3, 4, 5, 6, 7 et 8 : <span class="big">6 mois</span>.`,
      consigne: "S(x) = (x − 2)(x − 9), x entier de 1 à 12 : combien de mois a-t-on S(x) < 0 ?",
      verification: { type: "courte", attendus: ["6"], unite: "mois" },
      dessin: boutique,
    },
  ],
};

export default problemes;
