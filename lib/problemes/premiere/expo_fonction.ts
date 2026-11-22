// Énigmes à projeter — première (sans spé maths), notion expo_fonction
// (les levures du biologiste, les lunettes de soleil, la rumeur du lycée, les panneaux
// solaires, piège de la pâte feuilletée, défi de la vanille de Saint-Philippe). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 20) =>
  r(30, y, 420, 22 + 34 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 36 + 34 * k, s, c, taille)).join("");

/** « a puissance e » dans un texte SVG : l'exposant en petit, puis on redescend. */
const pw = (a: string, e: string, suite = "") => `${a}<tspan dy="-11" font-size="17">${e}</tspan><tspan dy="11"${suite ? ' dx="7"' : ""}>${suite || "​"}</tspan>`;

const levures = svg("Trois modèles pour une culture de levures : 3x, x au cube, 3 puissance x",
  r(40, 50, 400, 70, C.craie, 0.06, 2, 10) + t(240, 97, `A${NB}: f(x) = 3x`, C.craie, 26) +
    r(40, 135, 400, 70, C.craie, 0.06, 2, 10) + t(240, 182, `B${NB}: f(x) = ` + pw("x", "3"), C.craie, 26) +
    r(40, 220, 400, 70, C.craie, 0.06, 2, 10) + t(240, 267, `C${NB}: f(x) = ` + pw("3", "x"), C.craie, 26) +
    t(240, 385, `laquelle est exponentielle${NB}?`, C.rose, 24));

const lunettes = svg("Verre teinté de lunettes de soleil : f(x) = 100 × 0,8 puissance x pour cent de la lumière passe, x en mm",
  r(70, 60, 140, 90, C.bleu, 0.3, 3, 30) + r(270, 60, 140, 90, C.bleu, 0.3, 3, 30) + t(240, 112, "—", C.craie, 30) +
    t(240, 220, "f(x) = 100 × " + pw("0,8", "x"), C.jaune, 28) +
    t(240, 265, "% de lumière, x en mm de verre", C.pale, 20) +
    t(240, 385, `f(2,5) ≈ ${NB}?`, C.rose, 26));

const rumeur = svg("Une rumeur dans un lycée : f(x) = 2 puissance x centaines d'élèves ; 2 puissance 1,5 environ 2,83",
  cadre(40, ["f(x) = " + pw("2", "x"), "centaines d'élèves, x en jours"], C.bleu, 24) +
    t(240, 220, pw("2", "1,5", `${NB}≈ 2,83`), C.jaune, 30) +
    t(240, 385, pw("2", "2,5", `${NB}≈ ?`), C.rose, 28));

const solaires = svg("Panneaux solaires d'une ville : leur nombre double en 3 ans, multiplié par a chaque année",
  t(240, 70, "× a   × a   × a", C.bleu, 28) +
    t(240, 140, "en 3 ans : × 2", C.jaune, 30) +
    t(240, 220, pw("a", "3", `${NB}= 2`), C.craie, 30) +
    t(240, 385, `a ≈ ${NB}?`, C.rose, 28));

const feuilletee = svg("Pâte feuilletée : f(x) = 3 puissance x couches après x pliages",
  r(90, 80, 300, 16, C.jaune, 0.5, 2, 4) + r(90, 104, 300, 16, C.jaune, 0.5, 2, 4) + r(90, 128, 300, 16, C.jaune, 0.5, 2, 4) +
    t(240, 220, "f(x) = " + pw("3", "x"), C.bleu, 30) +
    t(240, 265, "couches après x pliages", C.pale, 20) +
    t(240, 385, `avant tout pliage${NB}?`, C.rose, 26));

const vanille = svg("Prix de la vanille de Saint-Philippe : multiplié par a chaque année, par 1,331 en 3 ans",
  cadre(40, ["prix × a chaque année", "en 3 ans : × 1,331"], C.bleu, 24) +
    t(240, 230, pw("a", "3", `${NB}= 1,331`), C.jaune, 30) +
    t(240, 385, `a = ${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "expo_fonction",
  titre: "Énigmes des fonctions exponentielles",
  description: "Les levures du biologiste, les lunettes de soleil, la rumeur du lycée, les panneaux solaires, le piège de la pâte feuilletée, le défi de la vanille de Saint-Philippe : reconnaître x ↦ aˣ, calculer une image, utiliser aˣ⁺ʸ = aˣ × aʸ et l'exposant 1/n.",
  problemes: [
    {
      tag: "Énigme 1 · Les levures du biologiste",
      titre: "Reconnaître une fonction exponentielle",
      question: `Un biologiste hésite entre trois modèles pour une culture de levures : f(x) = 3x, f(x) = x<sup>3</sup> et f(x) = 3<sup>x</sup>.<br><br><b>Lequel</b> est une fonction exponentielle ?`,
      reponse: `Dans une fonction exponentielle, la variable x est <b>en exposant</b> : x ↦ a<sup>x</sup>, avec a > 0.<br>C'est <span class="big">f(x) = 3<sup>x</sup></span>. (3x est affine, x<sup>3</sup> est la fonction cube.)`,
      consigne: "3x, x³ ou 3ˣ : laquelle est une fonction exponentielle ?",
      verification: { type: "qcm", choix: ["f(x) = 3x", "f(x) = x³", "f(x) = 3ˣ"], bonne: 2 },
      dessin: levures,
    },
    {
      tag: "Énigme 2 · Les lunettes de soleil",
      titre: "Calculer une image",
      question: `Un verre teinté de x mm laisse passer f(x) = 100 × 0,8<sup>x</sup> % de la lumière.<br><br><b>Quel pourcentage</b> passe à travers un verre de 2,5 mm ? (Arrondir à l'unité.)`,
      reponse: `À la calculatrice : 0,8<sup>2,5</sup> ≈ 0,572.<br>f(2,5) ≈ 100 × 0,572 ≈ <span class="big">57 %</span> de la lumière.`,
      consigne: "f(x) = 100 × 0,8ˣ : combien vaut f(2,5), arrondi à l'unité (en %) ?",
      verification: { type: "courte", attendus: ["57", "57 %", "57%"], unite: "%" },
      dessin: lunettes,
    },
    {
      tag: "Énigme 3 · La rumeur du lycée",
      titre: "Les propriétés des puissances",
      question: `Une rumeur touche f(x) = 2<sup>x</sup> centaines d'élèves après x jours. On sait que 2<sup>1,5</sup> ≈ 2,83.<br><br><b>Combien vaut</b> 2<sup>2,5</sup>, sans calculatrice ?`,
      reponse: `2,5 = 1,5 + 1, donc 2<sup>2,5</sup> = 2<sup>1,5</sup> × 2<sup>1</sup>.<br>2<sup>2,5</sup> ≈ 2,83 × 2 ≈ <span class="big">5,66</span> : environ 566 élèves.`,
      consigne: "On sait que 2 puissance 1,5 ≈ 2,83 : combien vaut 2 puissance 2,5 ?",
      verification: { type: "qcm", choix: ["2,83 + 1 = 3,83", "2 × 2,83 ≈ 5,66", "2,83 × 2,83 ≈ 8"], bonne: 1 },
      dessin: rumeur,
    },
    {
      tag: "Énigme 4 · Les panneaux solaires",
      titre: "L'exposant 1/n",
      question: `Dans une ville, le nombre de panneaux solaires est multiplié par a chaque année. En 3 ans, il double : a<sup>3</sup> = 2.<br><br><b>Combien vaut</b> a ? (Arrondir au centième.)`,
      reponse: `a = 2<sup>1/3</sup> (la racine cubique de 2). À la calculatrice : 2^(1/3) ≈ 1,26.<br><span class="big">a ≈ 1,26</span> : environ + 26 % par an. (Vérification : 1,26<sup>3</sup> ≈ 2,0.)`,
      consigne: "a³ = 2 : combien vaut a, arrondi au centième ?",
      verification: { type: "qcm", choix: ["a ≈ 1,26", "a ≈ 0,67", "a ≈ 1,33"], bonne: 0 },
      dessin: solaires,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La pâte feuilletée",
      sorte: "piege",
      question: `Un pâtissier plie sa pâte en trois, encore et encore. Après x pliages, elle a f(x) = 3<sup>x</sup> couches.<br><br><b>Combien de couches</b> avant tout pliage (x = 0) ?`,
      reponse: `Le piège : 3<sup>0</sup> ne vaut pas 0 ! Pour tout a > 0, a<sup>0</sup> = 1.<br>f(0) = <span class="big">1 couche</span> : la pâte de départ.`,
      consigne: "f(x) = 3ˣ couches après x pliages : combien de couches pour x = 0 ?",
      verification: { type: "courte", attendus: ["1"], unite: "couche" },
      dessin: feuilletee,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La vanille de Saint-Philippe",
      sorte: "defi",
      question: `À Saint-Philippe, le prix du kilo de vanille d'un producteur est multiplié par a chaque année. En 3 ans, il est multiplié par 1,331.<br><br><b>Combien vaut</b> a ?`,
      reponse: `a<sup>3</sup> = 1,331, donc a = 1,331<sup>1/3</sup>.<br>Or 1,1 × 1,1 × 1,1 = 1,21 × 1,1 = 1,331. Donc <span class="big">a = 1,1</span> : + 10 % par an.`,
      consigne: "a³ = 1,331 : combien vaut a ?",
      verification: { type: "courte", attendus: ["1,1", "1.1"] },
      dessin: vanille,
    },
  ],
};

export default problemes;
