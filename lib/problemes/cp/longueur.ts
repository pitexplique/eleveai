// Énigmes à projeter — CP, notion longueur : les trois rubans, la clé
// mesurée en trombones, le plus petit des trois enfants, le train sur le
// quadrillage, le piège des deux crayons décalés, le défi des planches du
// pont. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p, grille } from "../dessins-ecole";

const ruban = (y: number, long: number, nom: string, c: string) => t(40, y + 12, nom, C.craie, 28) + r(80, y - 15, long, 30, c, 0.4, 3, 4);
const rubans = svg(
  "Trois rubans : A, B et C, de longueurs différentes",
  ruban(110, 300, "A", C.bleu) + ruban(190, 200, "B", C.jaune) + ruban(270, 360, "C", C.rose) +
    t(240, 370, `Le plus long${NB}?`, C.rose, 30)
);

const trombone = (x: number, y: number) => r(x, y, 66, 22, C.pale, 0, 3, 11) + r(x + 10, y + 5, 46, 12, C.pale, 0, 2, 6);
const cle = svg(
  "Une clé, et en dessous 4 trombones mis bout à bout, de la même longueur que la clé",
  o(100, 140, 30, C.jaune, 0.3, 4) + r(130, 130, 230, 20, C.jaune, 0.3, 3, 4) + r(320, 150, 14, 22, C.jaune, 0.3, 3, 2) + r(345, 150, 14, 16, C.jaune, 0.3, 3, 2) +
    l(70, 115, 70, 250, C.pale, 2, "6 6") + l(360, 115, 360, 250, C.pale, 2, "6 6") +
    [0, 1, 2, 3].map((i) => trombone(73 + i * 72, 215)).join("") +
    t(240, 350, `Combien de trombones${NB}?`, C.rose, 30)
);

const bonhomme = (x: number, h: number, nom: string, c: string) => {
  const sol = 300, tete = sol - h;
  return o(x, tete + 18, 18, c, 0.3, 3) + l(x, tete + 36, x, sol - 50, c, 4) + l(x, sol - 50, x - 18, sol, c, 4) + l(x, sol - 50, x + 18, sol, c, 4) +
    l(x - 30, tete + 60, x + 30, tete + 60, c, 4) + t(x, sol + 40, nom, C.craie, 26);
};
const enfants = svg(
  "Trois enfants debout côte à côte : Mia, Paul et Nour ; Mia est la plus petite",
  l(40, 300, 440, 300, C.pale, 3) + bonhomme(100, 130, "Mia", C.rose) + bonhomme(240, 200, "Paul", C.bleu) + bonhomme(380, 165, "Nour", C.jaune) +
    t(240, 395, `Qui est le plus petit${NB}?`, C.rose, 28)
);

const train = svg(
  "Un train dessiné sur un quadrillage ; il occupe 7 carreaux de long",
  grille(30, 100, 9, 4, 46) + r(76, 192, 7 * 46, 46, C.bleu, 0.35, 4, 6) + o(110, 245, 12, C.craie, 0, 3) + o(350, 245, 12, C.craie, 0, 3) +
    t(240, 360, `Combien de carreaux de long${NB}?`, C.rose, 28)
);

const crayon = (x: number, y: number, long: number, c: string) =>
  r(x, y - 14, long - 40, 28, c, 0.45, 3, 3) + p(`M${x + long - 40} ${y - 14} L${x + long} ${y} L${x + long - 40} ${y + 14} Z`, c, 3, 0.15);
const piege = svg(
  "Deux crayons de même longueur, le jaune décalé vers la droite",
  crayon(40, 140, 280, C.bleu) + crayon(150, 230, 280, C.jaune) +
    t(240, 350, `Lequel est le plus long${NB}?`, C.rose, 30)
);

const defi = svg(
  "Une rivière de 9 carreaux de large ; une planche fait 3 carreaux",
  grille(33, 90, 9, 1, 46) + r(33, 150, 9 * 46, 60, C.bleu, 0.25, 2, 0) + t(240, 190, "rivière : 9 carreaux", C.craie, 22) +
    r(33, 255, 3 * 46, 30, C.jaune, 0.4, 3, 3) + t(250, 278, "1 planche = 3 carreaux", C.craie, 22, "start") +
    t(240, 370, `Combien de planches${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "cp",
  notionId: "longueur",
  titre: "Énigmes sur les longueurs",
  description: "Le plus long des trois rubans, la clé mesurée en trombones, le plus petit des trois enfants, le train sur le quadrillage, le piège des deux crayons décalés, le défi des planches du pont.",
  problemes: [
    {
      tag: "Énigme 1 · Les rubans",
      titre: "Le plus long ruban",
      question: `Quel ruban est le plus long ?`,
      reponse: `Ils partent du même trait.<br>Le C va le plus loin.<br><span class="big">Le ruban C</span>.`,
      consigne: "Quel ruban est le plus long ?",
      verification: { type: "qcm", choix: ["A", "B", "C"], bonne: 2 },
      dessin: rubans,
    },
    {
      tag: "Énigme 2 · La clé",
      titre: "La clé et les trombones",
      question: `La clé mesure combien de trombones ?`,
      reponse: `On compte : 1, 2, 3, 4.<br><span class="big">4 trombones</span>.`,
      consigne: "La clé mesure combien de trombones ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: cle,
    },
    {
      tag: "Énigme 3 · La photo de classe",
      titre: "Le plus petit",
      question: `Qui est le plus petit ?`,
      reponse: `Les pieds sont sur la même ligne.<br>La tête la plus basse :<br><span class="big">Mia</span>.`,
      consigne: "Qui est le plus petit des trois enfants ?",
      verification: { type: "qcm", choix: ["Mia", "Paul", "Nour"], bonne: 0 },
      dessin: enfants,
    },
    {
      tag: "Énigme 4 · Le train",
      titre: "Le train sur les carreaux",
      question: `Le train mesure combien de carreaux ?`,
      reponse: `On compte les carreaux.<br><span class="big">7 carreaux</span>.`,
      consigne: "Le train mesure combien de carreaux de long ?",
      verification: { type: "courte", attendus: ["7"] },
      dessin: train,
    },
    {
      tag: "Énigme 5 · Le piège",
      titre: "Les deux crayons",
      question: `Le jaune va plus loin.<br><br>Est-il plus long ?`,
      reponse: `Il ne part pas du même endroit !<br>Même longueur.<br><span class="big">Pareil</span>.`,
      consigne: "Quel crayon est le plus long ?",
      verification: { type: "qcm", choix: ["Le bleu", "Pareil", "Le jaune"], bonne: 1 },
      dessin: piege,
      sorte: "piege",
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le pont de planches",
      question: `La rivière : <b>9</b> carreaux.<br>Une planche : <b>3</b> carreaux.<br><br>Combien de planches ?`,
      reponse: `3 + 3 + 3 = 9.<br><span class="big">3 planches</span>.`,
      consigne: "Rivière de 9 carreaux, planche de 3 : combien de planches ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: defi,
      sorte: "defi",
    },
  ],
};

export default problemes;
