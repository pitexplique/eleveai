// Énigmes à projeter — CM2, notion angle (l'angle droit de 3 h, les angles de
// l'équerre, le robot qui tourne d'un quart de tour, le piège des longues
// branches, le défi « aigu + aigu = obtus ? »). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p } from "../dessins-ecole";

/** Un angle de sommet (x, y) : une branche horizontale vers la droite, l'autre à « deg » degrés. */
const angle = (x: number, y: number, long: number, deg: number, c: string = C.craie, arc = 40) => {
  const a = (deg * Math.PI) / 180;
  const X = (k: number) => (x + k * Math.cos(a)).toFixed(1), Y = (k: number) => (y - k * Math.sin(a)).toFixed(1);
  return l(x, y, x + long, y, c, 4) + l(x, y, Number(X(long)), Number(Y(long)), c, 4) +
    `<path d="M${x + arc} ${y} A${arc} ${arc} 0 0 0 ${X(arc)} ${Y(arc)}" fill="none" stroke="${C.rose}" stroke-width="3"/>`;
};

const horloge = svg(
  "Une horloge qui marque 3 h 00",
  o(240, 190, 140, C.craie, 0.05, 5) + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((k) => {
    const a = (k * Math.PI) / 6;
    return l(240 + 125 * Math.sin(a), 190 - 125 * Math.cos(a), 240 + 140 * Math.sin(a), 190 - 140 * Math.cos(a), C.craie, 3);
  }).join("") + l(240, 190, 240, 75, C.bleu, 5) + l(240, 190, 320, 190, C.rose, 7) + o(240, 190, 6, C.craie, 1, 2) +
    t(240, 385, `3 h 00${NB}: quel angle${NB}?`, C.rose, 26)
);

const equerre = svg(
  "Une équerre : un triangle avec un angle droit",
  p("M100 330 L100 80 L380 330 Z", C.jaune, 4, 0.25) + p("M100 300 L130 300 L130 330", C.rose, 3) +
    t(80, 345, "droit", C.rose, 20, "end") + t(115, 120, "?", C.bleu, 32, "start") + t(320, 318, "?", C.bleu, 32) + t(330, 140, "📐", C.craie, 50)
);

const robot = svg(
  "Un robot vu de haut qui tourne d'un quart de tour, puis d'un autre quart de tour",
  r(200, 160, 80, 80, C.bleu, 0.2, 4, 10) + o(225, 190, 7, C.craie, 1, 2) + o(255, 190, 7, C.craie, 1, 2) + l(240, 160, 240, 110, C.rose, 4) + t(240, 100, "↑", C.rose, 30) +
    `<path d="M310 200 A70 70 0 0 1 240 270" fill="none" stroke="${C.jaune}" stroke-width="4"/>` + `<path d="M240 270 A70 70 0 0 1 170 200" fill="none" stroke="${C.jaune}" stroke-width="4" stroke-dasharray="8 6"/>` +
    t(330, 260, "¼ de tour", C.jaune, 20, "start") + t(150, 260, "+ ¼", C.jaune, 20, "end") + t(240, 360, "angle droit = 90°", C.pale, 22) + t(240, 400, `en tout${NB}: ? °`, C.rose, 26)
);

const branches = svg(
  "Deux angles : l'angle A a de longues branches et une petite ouverture, l'angle B a de courtes branches et une grande ouverture",
  angle(40, 300, 200, 35, C.craie, 60) + t(80, 345, "angle A", C.craie, 24) + angle(300, 300, 90, 70, C.craie, 40) + t(340, 345, "angle B", C.craie, 24) +
    t(240, 70, `Lequel est le plus grand${NB}?`, C.rose, 24)
);

const aigus = svg(
  "Deux angles aigus de 60°, et la question : ensemble, font-ils un angle obtus ?",
  angle(60, 260, 140, 60, C.bleu, 36) + t(130, 320, "aigu", C.bleu, 22) + t(230, 220, "+", C.craie, 40) + angle(290, 260, 140, 60, C.jaune, 36) + t(360, 320, "aigu", C.jaune, 22) +
    t(240, 385, `= un angle obtus${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "angle",
  titre: "Énigmes sur les angles",
  description: "Les aiguilles à 3 h, les angles de l'équerre, le robot qui tourne, le piège des longues branches, le défi des deux angles aigus.",
  problemes: [
    {
      tag: "Énigme 1 · L'horloge",
      titre: "Trois heures pile",
      question: `Il est <b>3 h 00</b>.<br><br>Les deux aiguilles de l'horloge forment <b>quel angle</b> ?`,
      reponse: `La grande aiguille est sur le 12, la petite sur le 3.<br>C'est un quart de tour : un <span class="big">angle droit</span>.`,
      consigne: "À 3 h 00, quel angle font les aiguilles ?",
      verification: { type: "qcm", choix: ["Un angle aigu", "Un angle droit", "Un angle obtus"], bonne: 1 },
      dessin: horloge,
    },
    {
      tag: "Énigme 2 · Dans la trousse",
      titre: "Les angles de l'équerre",
      question: `Une équerre a un <b>angle droit</b>.<br><br>Ses <b>deux autres angles</b> sont-ils aigus, droits ou obtus ?`,
      reponse: `Chacun est plus fermé que l'angle droit.<br>Les deux autres angles sont <span class="big">aigus</span>.`,
      consigne: "Les deux autres angles de l'équerre sont :",
      verification: { type: "qcm", choix: ["aigus", "droits", "obtus"], bonne: 0 },
      dessin: equerre,
    },
    {
      tag: "Énigme 3 · Le robot",
      titre: "Deux quarts de tour",
      question: `Un robot tourne d'un <b>quart de tour</b>.<br>Puis encore d'un <b>quart de tour</b>, dans le même sens.<br>Un quart de tour mesure <b>90°</b>.<br><br>De combien de <b>degrés</b> a-t-il tourné ?`,
      reponse: `90° + 90° = <span class="big">180°</span>.<br>C'est un demi-tour : le robot regarde derrière lui.`,
      consigne: "De combien de degrés le robot a-t-il tourné ?",
      verification: { type: "courte", attendus: ["180"], unite: "°" },
      dessin: robot,
    },
    {
      tag: "Énigme 4 · Le grand angle",
      titre: "L'angle plat",
      question: `Un angle droit mesure <b>90°</b>.<br>Un angle obtus est plus grand que l'angle droit, mais plus petit qu'un demi-tour.<br><br>Lequel de ces angles est <b>obtus</b> : 45°, 90° ou 130° ?`,
      reponse: `45° est plus petit que 90° : il est aigu.<br>90°, c'est l'angle droit.<br><span class="big">130°</span> est entre 90° et 180° : il est obtus.`,
      consigne: "Quel angle est obtus ?",
      verification: { type: "qcm", choix: ["45°", "90°", "130°"], bonne: 2 },
      dessin: svg(
        "Trois angles : 45°, 90° et 130°",
        angle(30, 250, 110, 45, C.craie, 30) + t(85, 310, "45°", C.craie, 24) + angle(180, 250, 110, 90, C.craie, 30) + t(220, 310, "90°", C.craie, 24) +
          angle(360, 250, 90, 130, C.craie, 30) + t(380, 310, "130°", C.craie, 24) + t(240, 380, `lequel est obtus${NB}?`, C.rose, 26)
      ),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les longues branches",
      sorte: "piege",
      question: `L'angle A a de <b>longues branches</b>.<br>L'angle B a de <b>courtes branches</b>.<br>Sam dit : « A est le plus grand, ses branches sont plus longues. »<br><br><b>Quel angle est le plus grand</b> ?`,
      reponse: `Non ! La taille d'un angle, c'est son <b>ouverture</b>, pas la longueur des branches.<br>B est plus ouvert : <span class="big">l'angle B est le plus grand</span>.`,
      consigne: "Quel angle est le plus grand ?",
      verification: { type: "qcm", choix: ["L'angle A", "Ils sont égaux", "L'angle B"], bonne: 2 },
      dessin: branches,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Aigu + aigu",
      sorte: "defi",
      question: `On met deux <b>angles aigus</b> côte à côte.<br><br>Peut-on obtenir un <b>angle obtus</b> ?<br>Jamais ? Parfois ? Toujours ?`,
      reponse: `60° + 60° = 120° : c'est obtus !<br>Mais 20° + 30° = 50° : c'est aigu.<br>La réponse est <span class="big">parfois</span>.`,
      consigne: "Deux angles aigus côte à côte font un angle obtus :",
      verification: { type: "qcm", choix: ["jamais", "parfois", "toujours"], bonne: 1 },
      dessin: aigus,
    },
  ],
};

export default problemes;
