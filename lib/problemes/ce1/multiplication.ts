// Énigmes à projeter — CE1, notion multiplication (les roues des vélos, les
// doigts des mains, la tablette de chocolat, les dominos de 5 points, le
// piège des canards par 2, le défi des tabourets et des chaises). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, ell, grille } from "../dessins-ecole";

const velos = svg(
  "Quatre vélos",
  [0, 1, 2, 3].map((i) => t(70 + i * 113, 200, "🚲", C.craie, 80)).join("") + t(240, 330, `Combien de roues${NB}?`, C.rose, 32)
);

const mains = svg(
  "Trois mains ouvertes",
  [0, 1, 2].map((i) => t(100 + i * 140, 210, "🖐️", C.craie, 100)).join("") + t(240, 330, `Combien de doigts${NB}?`, C.rose, 32)
);

const chocolat = svg(
  "Une tablette de chocolat : 3 rangées de 4 carrés",
  r(120, 90, 240, 180, C.jaune, 0.35, 5, 6) + grille(120, 90, 4, 3, 60, C.craie, 3) +
    t(240, 340, `Combien de carrés${NB}?`, C.rose, 32)
);

const domino = (x: number) => {
  const pts = [[-16, -16], [16, -16], [0, 0], [-16, 16], [16, 16]];
  return r(x - 38, 110, 76, 100, C.bleu, 0.15, 4, 10) + pts.map(([a, b]) => o(x + a, 160 + b, 6, C.craie, 1, 2)).join("");
};
const dominos = svg(
  "Quatre cartes de 5 points chacune",
  [0, 1, 2, 3].map((i) => domino(90 + i * 100)).join("") + t(240, 270, "5 + 5 + 5 + 5", C.craie, 32) + t(240, 350, `Quelle multiplication${NB}?`, C.rose, 28)
);

const mare = (x: number) => ell(x, 200, 62, 38, C.bleu, 0.2, 3) + t(x - 18, 210, "🦆", C.craie, 32) + t(x + 20, 210, "🦆", C.craie, 32);
const canards = svg(
  "Trois mares, deux canards dans chaque mare",
  mare(95) + mare(240) + mare(385) + t(240, 120, "3 mares de 2 canards", C.pale, 24) + t(240, 330, `Combien de canards${NB}?`, C.rose, 32)
);

const tabouret = (x: number) => r(x - 40, 140, 80, 16, C.jaune, 0.4, 3, 4) + [-30, 0, 30].map((d) => `<path d="M${x} 156 L${x + d} 250" stroke="${C.craie}" stroke-width="4" stroke-linecap="round"/>`).join("");
const chaise = (x: number) => r(x - 40, 160, 80, 14, C.rose, 0.4, 3, 4) + r(x + 32, 90, 8, 70, C.rose, 0.4, 3) +
  [-34, -18, 18, 34].map((d) => `<path d="M${x + d} 174 L${x + d} 250" stroke="${C.craie}" stroke-width="4" stroke-linecap="round"/>`).join("");
const meubles = svg(
  "Deux tabourets à 3 pieds et deux chaises à 4 pieds",
  tabouret(70) + tabouret(180) + chaise(300) + chaise(410) +
    t(125, 290, "3 pieds", C.jaune, 22) + t(355, 290, "4 pieds", C.rose, 22) + t(240, 370, `Combien de pieds en tout${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "multiplication",
  titre: "Énigmes sur la multiplication",
  description: "Les roues des vélos, les doigts des mains, la tablette de chocolat, les cartes de 5 points, le piège des canards par deux, le défi des tabourets et des chaises.",
  problemes: [
    {
      tag: "Énigme 1 · Le garage à vélos",
      titre: "Les roues",
      question: `Il y a <b>4 vélos</b>.<br>Un vélo a <b>2 roues</b>.<br><br>Combien de roues en tout ?`,
      reponse: `2 + 2 + 2 + 2 = 8.<br>4 fois 2 : 4 × 2 = <span class="big">8 roues</span>.`,
      consigne: "Combien de roues pour 4 vélos ?",
      verification: { type: "courte", attendus: ["8"], unite: "roues" },
      dessin: velos,
    },
    {
      tag: "Énigme 2 · Les mains levées",
      titre: "Les doigts",
      question: `<b>3 mains</b> sont levées.<br>Une main a <b>5 doigts</b>.<br><br>Combien de doigts ?`,
      reponse: `5 + 5 + 5 = 15.<br>3 × 5 = <span class="big">15 doigts</span>.`,
      consigne: "Combien de doigts sur 3 mains ?",
      verification: { type: "courte", attendus: ["15"], unite: "doigts" },
      dessin: mains,
    },
    {
      tag: "Énigme 3 · Le goûter",
      titre: "La tablette de chocolat",
      question: `La tablette a <b>3 rangées</b>.<br>Chaque rangée a <b>4 carrés</b>.<br><br>Combien de carrés ?`,
      reponse: `4 + 4 + 4 = 12.<br>3 × 4 = <span class="big">12 carrés</span>.`,
      consigne: "Combien de carrés dans la tablette ?",
      verification: { type: "qcm", choix: ["7", "34", "12"], bonne: 2 },
      dessin: chocolat,
    },
    {
      tag: "Énigme 4 · Le jeu de cartes",
      titre: "Les cartes à points",
      question: `<b>4 cartes</b>, avec <b>5 points</b> sur chacune.<br>5 + 5 + 5 + 5.<br><br>Quelle multiplication ?`,
      reponse: `5 est écrit 4 fois.<br>C'est <span class="big">4 × 5</span> = 20.`,
      consigne: "Quelle multiplication pour 5 + 5 + 5 + 5 ?",
      verification: { type: "qcm", choix: ["4 + 5", "4 × 5", "5 × 5"], bonne: 1 },
      dessin: dominos,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les canards",
      sorte: "piege",
      question: `Il y a <b>3 mares</b>.<br>Dans chaque mare, <b>2 canards</b>.<br><br>Combien de canards ?`,
      reponse: `Le piège : on voit 3 et 2, on fait 3 + 2 = 5.<br>Mais il y a 3 <b>fois</b> 2 canards.<br>2 + 2 + 2 = <span class="big">6 canards</span>.`,
      consigne: "Combien de canards en tout ?",
      verification: { type: "qcm", choix: ["6", "5", "32"], bonne: 0 },
      dessin: canards,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Tabourets et chaises",
      sorte: "defi",
      question: `<b>2 tabourets</b> à 3 pieds.<br><b>2 chaises</b> à 4 pieds.<br><br>Combien de pieds en tout ?`,
      reponse: `Tabourets : 3 + 3 = 6.<br>Chaises : 4 + 4 = 8.<br>6 + 8 = <span class="big">14 pieds</span>.`,
      consigne: "Combien de pieds en tout ?",
      verification: { type: "courte", attendus: ["14"], unite: "pieds" },
      dessin: meubles,
    },
  ],
};

export default problemes;
