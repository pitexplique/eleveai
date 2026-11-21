// Énigmes à projeter — CM1, notion aires (le jardin partagé en carrés, les deux
// figures à comparer, la couverture en patchwork, le timbre en cm², le piège de
// la bande longue, le défi des rectangles de 12 carreaux). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, p, grille } from "../dessins-ecole";

const jardin = svg(
  "Un jardin rectangulaire de 6 carrés sur 4",
  grille(90, 70, 6, 4, 50, C.pale) + r(90, 70, 300, 200, C.bleu, 0.15, 4) + t(140, 105, "🌱", C.craie, 24) + t(340, 255, "🥕", C.craie, 24) +
    t(240, 320, "1 carré = 1 m²", C.pale, 22) + t(240, 380, `Combien de carrés${NB}?`, C.rose, 28)
);

// A : un L de 10 carreaux ; B : un carré de 3 × 3 = 9 carreaux. 1 carreau = 34 px.
const q = 34;
const comparer = svg(
  "Deux figures sur un quadrillage : A en forme de L, B carrée",
  grille(30, 80, 12, 6, q, C.pale, 1) +
    p(`M${30 + q} ${80 + q} L${30 + 3 * q} ${80 + q} L${30 + 3 * q} ${80 + 4 * q} L${30 + 5 * q} ${80 + 4 * q} L${30 + 5 * q} ${80 + 5 * q} L${30 + q} ${80 + 5 * q} Z`, C.rose, 4, 0.3) +
    r(30 + 7 * q, 80 + 2 * q, 3 * q, 3 * q, C.bleu, 0.3, 4) + t(30 + 2 * q, 80 + 3 * q + 10, "A", C.craie, 28) + t(30 + 8.5 * q, 80 + 3.5 * q + 10, "B", C.craie, 28) +
    t(240, 360, `La plus grande aire${NB}?`, C.rose, 28)
);

const patchwork = svg(
  "Une couverture de 5 rangées de 7 carrés de tissu",
  Array.from({ length: 35 }, (_, i) => r(65 + (i % 7) * 50, 50 + Math.floor(i / 7) * 50, 50, 50, [C.rose, C.jaune, C.bleu][(i % 7 + Math.floor(i / 7)) % 3], 0.3, 2)).join("") +
    t(240, 350, `Combien de carrés de tissu${NB}?`, C.rose, 26)
);

// Le timbre : 3 cm sur 2 cm, 1 cm = 60 px.
const timbre = svg(
  "Un timbre de 3 cm sur 2 cm, sur un quadrillage de 1 cm",
  grille(150, 90, 3, 2, 60, C.pale, 1.5) + r(150, 90, 180, 120, C.rose, 0.2, 4) + t(240, 165, "✉️", C.craie, 40) +
    t(240, 70, "3 cm", C.craie, 24) + t(135, 158, "2 cm", C.craie, 24, "end") + t(240, 290, "1 carreau = 1 cm²", C.pale, 22) + t(240, 360, `l'aire du timbre${NB}?`, C.rose, 28)
);

const bande = svg(
  "Une bande de 8 carreaux sur 1 et un carré de 3 carreaux sur 3",
  grille(40, 100, 8, 1, 40, C.pale, 1.5) + r(40, 100, 320, 40, C.rose, 0.3, 4) + t(40, 85, "la bande : 8 × 1", C.craie, 22, "start") +
    grille(160, 200, 3, 3, 40, C.pale, 1.5) + r(160, 200, 120, 120, C.bleu, 0.3, 4) + t(300, 265, "le carré : 3 × 3", C.craie, 22, "start") +
    t(240, 385, `La plus grande aire${NB}?`, C.rose, 26)
);

const douze = svg(
  "12 carreaux pour faire des rectangles",
  Array.from({ length: 12 }, (_, i) => r(60 + (i % 6) * 60, 90 + Math.floor(i / 6) * 60, 50, 50, C.jaune, 0.35, 3, 4)).join("") +
    t(240, 290, "on utilise les 12 carreaux", C.craie, 24) + t(240, 350, `Combien de rectangles différents${NB}?`, C.rose, 22)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "aire",
  titre: "Énigmes sur les aires",
  description: "Le jardin partagé en carrés, les deux figures à comparer, la couverture en patchwork, l'aire du timbre en cm², le piège de la bande longue, le défi des rectangles de 12 carreaux.",
  problemes: [
    {
      tag: "Énigme 1 · Le jardin partagé",
      titre: "Les carrés du jardin",
      question: `Le jardin est partagé en carrés de <b>1 m²</b>.<br>Il a <b>6 carrés</b> sur la longueur et <b>4</b> sur la largeur.<br><br>Quelle est son <b>aire</b> ?`,
      reponse: `4 rangées de 6 carrés : 4 × 6 = 24.<br>L'aire est <span class="big">24 m²</span>.`,
      consigne: "Quelle est l'aire du jardin, en m² ?",
      verification: { type: "courte", attendus: ["24"], unite: "m²" },
      dessin: jardin,
    },
    {
      tag: "Énigme 2 · Le quadrillage",
      titre: "Les deux figures",
      question: `Regarde les figures <b>A</b> et <b>B</b>.<br><br>Laquelle a la <b>plus grande aire</b> ?`,
      reponse: `On compte les carreaux.<br>A : 8 + 2 = 10 carreaux. B : 3 × 3 = 9 carreaux.<br>La plus grande aire : <span class="big">A</span>.`,
      consigne: "Quelle figure a la plus grande aire ?",
      verification: { type: "qcm", choix: ["A", "B", "Elles ont la même aire"], bonne: 0 },
      dessin: comparer,
    },
    {
      tag: "Énigme 3 · La couture",
      titre: "La couverture en patchwork",
      question: `Papi coud une couverture.<br>Elle a <b>5 rangées</b> de <b>7 carrés</b> de tissu.<br><br><b>Combien de carrés</b> de tissu ?`,
      reponse: `5 rangées de 7 : 5 × 7.<br>5 × 7 = <span class="big">35 carrés</span>.`,
      consigne: "Combien de carrés de tissu dans la couverture ?",
      verification: { type: "courte", attendus: ["35"], unite: "carrés" },
      dessin: patchwork,
    },
    {
      tag: "Énigme 4 · La lettre",
      titre: "Le timbre",
      question: `Le timbre mesure <b>3 cm</b> sur <b>2 cm</b>.<br>Un carreau de 1 cm de côté a une aire de <b>1 cm²</b>.<br><br>Quelle est l'<b>aire</b> du timbre ?`,
      reponse: `2 rangées de 3 carreaux : 2 × 3 = 6.<br>L'aire du timbre : <span class="big">6 cm²</span>.`,
      consigne: "Quelle est l'aire du timbre, en cm² ?",
      verification: { type: "courte", attendus: ["6"], unite: "cm²" },
      dessin: timbre,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La bande et le carré",
      sorte: "piege",
      question: `La bande mesure <b>8 carreaux</b> sur <b>1</b>.<br>Le carré mesure <b>3 carreaux</b> sur <b>3</b>.<br><br>Lequel a la <b>plus grande aire</b> ?`,
      reponse: `Le piège : la bande est plus longue, elle semble plus grande.<br>Bande : 8 × 1 = 8 carreaux. Carré : 3 × 3 = 9 carreaux.<br>C'est <span class="big">le carré</span>.`,
      consigne: "Qui a la plus grande aire ?",
      verification: { type: "qcm", choix: ["La bande", "Le carré", "Ils ont la même aire"], bonne: 1 },
      dessin: bande,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les rectangles de 12 carreaux",
      sorte: "defi",
      question: `Avec <b>12 carreaux</b>, on fait un rectangle plein.<br>On utilise tous les carreaux.<br><br>Combien de rectangles <b>différents</b> peut-on faire ?`,
      reponse: `1 × 12, 2 × 6, 3 × 4.<br>(6 × 2 ou 4 × 3, c'est le même rectangle tourné.)<br><span class="big">3 rectangles</span>.`,
      consigne: "Combien de rectangles différents avec 12 carreaux ?",
      verification: { type: "courte", attendus: ["3"], unite: "rectangles" },
      dessin: douze,
    },
  ],
};

export default problemes;
