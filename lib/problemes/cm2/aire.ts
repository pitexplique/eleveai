// Énigmes à projeter — CM2, notion aire (la moquette de la chambre, compter
// les carreaux et les demi-carreaux, les dalles de la terrasse, 1 m² en dm²,
// le piège « côtés doublés, aire doublée », le défi aire et périmètre).
// 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, p, grille } from "../dessins-ecole";

// La chambre 4 m × 3 m : 1 m = 70 px.
const chambre = svg(
  "Une chambre rectangulaire de 4 m sur 3 m, vue de haut",
  r(100, 80, 280, 210, C.rose, 0.15, 4) + grille(100, 80, 4, 3, 70, C.rose, 1) + t(240, 65, "4 m", C.craie, 26) + t(90, 192, "3 m", C.craie, 26, "end") +
    t(240, 350, `moquette${NB}: ? m²`, C.rose, 28) + t(240, 395, "un carreau = 1 m²", C.pale, 18)
);

// La figure : rectangle 5 × 3 carreaux + triangle de 2 sur 2 (1 carreau = 50 px).
const figure = svg(
  "Une figure sur un quadrillage : un rectangle de 5 sur 3 carreaux et un triangle de 2 sur 2 carreaux",
  grille(40, 60, 8, 5, 50, C.pale, 1) + p("M90 110 L340 110 L340 160 L440 260 L90 260 Z", C.bleu, 5, 0.25) +
    t(240, 350, "1 carreau = 1 cm²", C.pale, 20) + t(240, 395, `aire${NB}?`, C.rose, 28)
);

// La terrasse 6 m × 5 m : 1 m = 50 px.
const terrasse = svg(
  "Une terrasse de 6 m sur 5 m couverte de dalles de 1 m²",
  grille(90, 50, 6, 5, 50, C.jaune, 2) + r(90, 50, 300, 250, C.jaune, 0.15, 4) + t(240, 40, "6 m", C.craie, 22) + t(80, 182, "5 m", C.craie, 22, "end") +
    t(240, 345, "1 dalle = 12 €", C.craie, 24) + t(240, 390, `prix${NB}?`, C.rose, 28)
);

// 1 m² = 10 dm × 10 dm : 1 dm = 26 px.
const metre = svg(
  "Un carré de 1 m de côté, partagé en carrés de 1 dm de côté",
  grille(110, 50, 10, 10, 26, C.pale, 1) + r(110, 50, 260, 260, C.bleu, 0.1, 4) + r(110, 50, 26, 26, C.rose, 0.5, 2) +
    t(240, 40, "1 m", C.craie, 22).replace('y="40"', 'y="38"') + t(140, 335, "1 dm²", C.rose, 18) + t(300, 345, `1 m² = ? dm²`, C.rose, 24)
);

// Carré de 3 m et carré de 6 m : 1 m = 40 px.
const carres = svg(
  "Un carré de 3 m de côté et un carré de 6 m de côté, au bon rapport",
  grille(40, 110, 3, 3, 40, C.pale, 1) + r(40, 110, 120, 120, C.jaune, 0.25, 4) + t(100, 95, "3 m", C.craie, 22) +
    grille(200, 110, 6, 6, 40, C.pale, 1) + r(200, 110, 240, 240, C.bleu, 0.2, 4) + t(320, 95, "6 m", C.craie, 22) +
    t(100, 290, "Léa :", C.rose, 22).replace(" :", `${NB}:`) + t(100, 320, "aire × 2 ?", C.rose, 22).replace(" ?", `${NB}?`)
);

const rect = svg(
  "Un rectangle mystère : aire 24 cm², périmètre 20 cm",
  r(90, 100, 300, 180, C.rose, 0.15, 4).replace("/>", ' stroke-dasharray="14 8"/>') + t(240, 175, "aire = 24 cm²", C.craie, 30) + t(240, 225, "périmètre = 20 cm", C.craie, 30) +
    t(240, 75, "? cm", C.rose, 26) + t(80, 196, "? cm", C.rose, 24, "end") + t(240, 360, "pas à l'échelle", C.pale, 18)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "aire",
  titre: "Énigmes sur les aires",
  description: "La moquette de la chambre, la figure aux demi-carreaux, les dalles de la terrasse, 1 m² en dm², le piège du carré de Léa, le défi du rectangle mystère.",
  problemes: [
    {
      tag: "Énigme 1 · Dans la chambre",
      titre: "La moquette",
      question: `Une chambre rectangulaire mesure <b>4 m</b> sur <b>3 m</b>.<br><br>Quelle surface de <b>moquette</b> faut-il, en m² ?`,
      reponse: `On compte les carrés de 1 m : 3 rangées de 4.<br>4 × 3 = <span class="big">12 m²</span>.`,
      consigne: "Combien de m² de moquette ?",
      verification: { type: "courte", attendus: ["12"], unite: "m²" },
      dessin: chambre,
    },
    {
      tag: "Énigme 2 · Sur le quadrillage",
      titre: "Carreaux et demi-carreaux",
      question: `La figure bleue est tracée sur un quadrillage.<br>Un carreau vaut <b>1 cm²</b>.<br><br><b>Quelle est son aire</b> ?`,
      reponse: `Le rectangle : 5 × 3 = 15 carreaux.<br>Le triangle, c'est la moitié d'un carré de 2 sur 2 : 4 ÷ 2 = 2 carreaux.<br>15 + 2 = <span class="big">17 cm²</span>.`,
      consigne: "Quelle est l'aire de la figure, en cm² ?",
      verification: { type: "courte", attendus: ["17"], unite: "cm²" },
      dessin: figure,
    },
    {
      tag: "Énigme 3 · Sur la terrasse",
      titre: "Les dalles",
      question: `Une terrasse mesure <b>6 m</b> sur <b>5 m</b>.<br>On la couvre de dalles de <b>1 m²</b>. Une dalle coûte <b>12 €</b>.<br><br><b>Combien coûtent</b> les dalles ?`,
      reponse: `Aire : 6 × 5 = 30 m², donc 30 dalles.<br>30 × 12 = <span class="big">360 €</span>.`,
      consigne: "Combien coûtent toutes les dalles ?",
      verification: { type: "courte", attendus: ["360"], unite: "€" },
      dessin: terrasse,
    },
    {
      tag: "Énigme 4 · Le grand carré",
      titre: "Un mètre carré",
      question: `Un carré a <b>1 m</b> de côté : son aire est 1 m².<br>On le découpe en petits carrés de <b>1 dm</b> de côté.<br><br><b>Combien de dm²</b> dans 1 m² ?`,
      reponse: `1 m = 10 dm. Il y a 10 rangées de 10 petits carrés.<br>10 × 10 = <span class="big">100 dm²</span>.`,
      consigne: "1 m², c'est combien de dm² ?",
      verification: { type: "qcm", choix: ["100 dm²", "10 dm²", "1 000 dm²"], bonne: 0 },
      dessin: metre,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le carré de Léa",
      sorte: "piege",
      question: `Le carré de Léa a <b>3 m</b> de côté.<br>Elle dessine un carré de <b>6 m</b> de côté.<br>Elle dit : « Côtés 2 fois plus grands, aire 2 fois plus grande. »<br><br><b>Combien de fois</b> plus grande est l'aire ?`,
      reponse: `Petit carré : 3 × 3 = 9 m². Grand carré : 6 × 6 = 36 m².<br>36 = 4 × 9 : l'aire est <span class="big">4 fois plus grande</span>.<br>Le dessin le montre : 4 petits carrés tiennent dans le grand.`,
      consigne: "Combien de fois plus grande est l'aire du grand carré ?",
      verification: { type: "qcm", choix: ["2 fois", "4 fois", "3 fois"], bonne: 1 },
      dessin: carres,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le rectangle mystère",
      sorte: "defi",
      question: `Un rectangle a une aire de <b>24 cm²</b>.<br>Son périmètre est <b>20 cm</b>.<br><br>Quelle est sa <b>longueur</b> ?`,
      reponse: `Longueur + largeur = 20 ÷ 2 = 10.<br>Longueur × largeur = 24. On essaie : 6 × 4 = 24, et 6 + 4 = 10.<br>La longueur est <span class="big">6 cm</span> (largeur 4 cm).`,
      consigne: "Quelle est la longueur du rectangle, en cm ?",
      verification: { type: "courte", attendus: ["6"], unite: "cm" },
      dessin: rect,
    },
  ],
};

export default problemes;
