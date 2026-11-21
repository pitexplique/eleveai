// Énigmes à projeter — CE2, notion masses (le chaton, le melon sur la
// balance, les plaquettes de beurre, les trois objets comparés, le piège des
// plumes et des cailloux, le défi des cubes et de la boule). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p } from "../dessins-ecole";

/** Une balance à deux plateaux ; penche = +1 : le plateau gauche descend.
 *  gauche / droite dessinent la charge posée sur le plateau (x = centre, y = dessus du plateau). */
type Charge = (x: number, y: number) => string;
const balance = (cx: number, cy: number, larg: number, penche: number, gauche: Charge, droite: Charge, pw = 42) => {
  const d = penche * 16;
  const xg = cx - larg / 2, xd = cx + larg / 2, yg = cy + d - 16, yd = cy - d - 16;
  return l(cx, cy, cx, cy + 110, C.craie, 5) + l(cx - 45, cy + 110, cx + 45, cy + 110, C.craie, 5) + l(xg, yg + 16, xd, yd + 16, C.craie, 5) + o(cx, cy, 6, C.craie, 0.5, 3) +
    l(xg, yg + 16, xg, yg, C.pale, 4) + l(xd, yd + 16, xd, yd, C.pale, 4) +
    p(`M${xg - pw} ${yg} L${xg + pw} ${yg}`, C.pale, 5) + p(`M${xd - pw} ${yd} L${xd + pw} ${yd}`, C.pale, 5) +
    gauche(xg, yg - 3) + droite(xd, yd - 3);
};
const mot = (m: string, taille = 20): Charge => (x, y) => t(x, y - 6, m, C.craie, taille);
const poids = (g: string, w: number): Charge => (x, y) => r(x - w / 2, y - w * 0.7, w, w * 0.7, C.jaune, 0.4, 2, 3) + t(x, y - w * 0.2, g, C.craie, 14);
const cube = (x: number, y: number) => r(x - 11, y - 22, 22, 22, C.bleu, 0.4, 2);
const boule = (x: number, y: number) => o(x, y - 14, 14, C.rose, 0.5, 2);

const chaton = svg(
  "Un chaton ; il pèse environ 1 quoi ?",
  t(240, 230, "🐱", C.craie, 150) + t(240, 340, "1 ?", C.rose, 40) + t(240, 395, `g${NB}? kg${NB}?`, C.pale, 26)
);

const melon = svg(
  "Une balance en équilibre : un melon d'un côté ; 500 g, 200 g et 100 g de l'autre",
  balance(240, 170, 280, 0, (x, y) => t(x, y - 4, "🍈", C.craie, 56), (x, y) => poids("500", 42)(x - 38, y) + poids("200", 34)(x + 4, y) + poids("100", 28)(x + 40, y), 64) +
    t(240, 320, "500 g + 200 g + 100 g", C.craie, 24) + t(240, 380, `Le melon${NB}: ? g`, C.rose, 30)
);

const beurre = svg(
  "Une plaquette de beurre de 250 g ; il faut 1 kg",
  [0, 1, 2, 3].map((i) => r(50 + i * 100, 120, 80, 50, i ? C.pale : C.jaune, i ? 0 : 0.35, 3, 4)).join("") + t(90, 152, "250 g", C.craie, 18) +
    [1, 2, 3].map((i) => t(90 + i * 100, 155, "?", C.pale, 26)).join("") +
    t(240, 260, "1 kg de beurre", C.craie, 30) + t(240, 350, `Combien de plaquettes${NB}?`, C.rose, 28)
);

const objets = svg(
  "Balance 1 : le livre descend, la trousse monte. Balance 2 : la trousse descend, la gomme monte",
  t(120, 60, "1", C.jaune, 26) + balance(120, 160, 150, 1, mot("livre"), mot("trousse")) +
    t(360, 60, "2", C.jaune, 26) + balance(360, 160, 150, 1, mot("trousse"), mot("gomme")) +
    t(240, 375, `Le plus léger${NB}?`, C.rose, 30)
);

const plumes = svg(
  "Un sac de 1 kg de plumes et un sac de 1 kg de cailloux",
  p("M70 300 Q60 150 140 130 Q220 150 210 300 Z", C.pale, 4, 0.12) + t(140, 230, "🪶", C.craie, 50) + t(140, 280, "1 kg", C.craie, 28) +
    p("M270 300 Q260 150 340 130 Q420 150 410 300 Z", C.pale, 4, 0.12) + t(340, 230, "🪨", C.craie, 50) + t(340, 280, "1 kg", C.craie, 28) +
    t(240, 375, `Le plus lourd${NB}?`, C.rose, 30)
);

const cubes = svg(
  "Balance 1 : 3 cubes = 1 boule. Balance 2 : 1 boule et 1 cube = 400 g",
  t(120, 60, "1", C.jaune, 26) + balance(120, 160, 150, 0, (x, y) => cube(x - 24, y) + cube(x, y) + cube(x + 24, y), boule) +
    t(360, 60, "2", C.jaune, 26) + balance(360, 160, 150, 0, (x, y) => boule(x - 14, y) + cube(x + 16, y), mot("400 g")) +
    t(240, 320, "carré bleu = un cube ; rond rose = une boule", C.pale, 20) + t(240, 375, `Un cube${NB}: ? g`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "masse",
  titre: "Énigmes sur les masses",
  description: "La masse d'un chaton, le melon sur la balance, les plaquettes de beurre pour 1 kg, le plus léger de trois objets, le piège des plumes et des cailloux, le défi des cubes et de la boule.",
  problemes: [
    {
      tag: "Énigme 1 · L'animalerie",
      titre: "Le chaton",
      question: `Un chaton pèse environ <b>1…</b><br><br>Quelle est la <b>bonne unité</b> ?`,
      reponse: `1 g : le poids d'un trombone !<br>Un chaton pèse environ <span class="big">1 kg</span>, comme un paquet de sucre.`,
      consigne: "Combien pèse un chaton ?",
      verification: { type: "qcm", choix: ["1 g", "1 kg", "100 kg"], bonne: 1 },
      dessin: chaton,
    },
    {
      tag: "Énigme 2 · L'épicerie",
      titre: "Le melon",
      question: `La balance est en équilibre.<br>D'un côté, le melon.<br>De l'autre : <b>500 g</b>, <b>200 g</b> et <b>100 g</b>.<br><br>Combien pèse le melon ?`,
      reponse: `500 + 200 + 100 = 800.<br>Le melon pèse <span class="big">800 g</span>.`,
      consigne: "Combien pèse le melon, en grammes ?",
      verification: { type: "courte", attendus: ["800"], unite: "g" },
      dessin: melon,
    },
    {
      tag: "Énigme 3 · La pâtisserie",
      titre: "Les plaquettes de beurre",
      question: `Une plaquette de beurre pèse <b>250 g</b>.<br>La recette demande <b>1 kg</b>.<br><br>Combien de plaquettes ?`,
      reponse: `1 kg = 1 000 g.<br>250 + 250 + 250 + 250 = 1 000.<br><span class="big">4 plaquettes</span>.`,
      consigne: "Combien de plaquettes de 250 g pour 1 kg ?",
      verification: { type: "courte", attendus: ["4"], unite: "plaquettes" },
      dessin: beurre,
    },
    {
      tag: "Énigme 4 · Le cartable",
      titre: "Le plus léger",
      question: `Balance 1 : le <b>livre</b> descend, la trousse monte.<br>Balance 2 : la <b>trousse</b> descend, la gomme monte.<br><br>Quel objet est le <b>plus léger</b> ?`,
      reponse: `Le plateau qui descend porte le plus lourd.<br>Livre plus lourd que trousse, trousse plus lourde que gomme.<br>Le plus léger : <span class="big">la gomme</span>.`,
      consigne: "Quel objet est le plus léger ?",
      verification: { type: "qcm", choix: ["La gomme", "Le livre", "La trousse"], bonne: 0 },
      dessin: objets,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Plumes et cailloux",
      sorte: "piege",
      question: `Un sac de <b>1 kg de plumes</b>.<br>Un sac de <b>1 kg de cailloux</b>.<br><br>Lequel est le plus lourd ?`,
      reponse: `Le piège : on pense « les cailloux sont lourds ».<br>Mais les deux sacs pèsent 1 kg !<br><span class="big">Ils pèsent pareil</span>. Le sac de plumes est juste plus gros.`,
      consigne: "Quel sac est le plus lourd ?",
      verification: { type: "qcm", choix: ["Les cailloux", "Ils pèsent pareil", "Les plumes"], bonne: 1 },
      dessin: plumes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Cubes et boule",
      sorte: "defi",
      question: `Balance 1 : <b>3 cubes</b> pèsent autant qu'<b>une boule</b>.<br>Balance 2 : <b>une boule et un cube</b> pèsent <b>400 g</b>.<br><br>Combien pèse un cube ?`,
      reponse: `On remplace la boule par 3 cubes.<br>3 cubes + 1 cube = 4 cubes = 400 g.<br>Un cube : 100 + 100 + 100 + 100 = 400, donc <span class="big">100 g</span>.`,
      consigne: "Combien pèse un cube, en grammes ?",
      verification: { type: "courte", attendus: ["100"], unite: "g" },
      dessin: cubes,
    },
  ],
};

export default problemes;
