// Énigmes à projeter — seconde, notion arithmetique_entiers (les deux bus,
// le carrelage sans découpe, deux impairs, le cadenas premier, piège de
// n² + n + 41, défi des 360 chocolats). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, grille } from "../dessins-ecole";

const bus = (x: number, y: number, c: string, txt: string) =>
  r(x, y, 150, 60, c, 0.25, 4, 10) + r(x + 12, y + 10, 30, 20, C.craie, 0, 2) + r(x + 52, y + 10, 30, 20, C.craie, 0, 2) + r(x + 92, y + 10, 30, 20, C.craie, 0, 2) +
  o(x + 32, y + 64, 11, C.craie, 1, 2) + o(x + 118, y + 64, 11, C.craie, 1, 2) + t(x + 170, y + 40, txt, c, 24, "start");

const lesBus = svg(
  "Deux bus partent ensemble : l'un toutes les 12 minutes, l'autre toutes les 18 minutes",
  bus(40, 70, C.bleu, "toutes les 12 min") + bus(40, 190, C.jaune, "toutes les 18 min") + t(240, 340, "départ ensemble à 7 h", C.craie, 24) + t(240, 390, `de nouveau ensemble${NB}?`, C.rose, 26)
);

// Pièce 240 × 180 cm, carreaux de 60 cm : 4 × 3 carreaux (1 cm = 1,5 px).
const carrelage = svg(
  "Une pièce rectangulaire de 240 centimètres sur 180 centimètres à couvrir de carreaux carrés",
  r(60, 60, 360, 270, C.jaune, 0.12, 4) + grille(60, 60, 4, 3, 90, C.pale, 2).replace(/stroke-width="2"/g, 'stroke-width="2" stroke-dasharray="8 6"') +
    t(240, 45, "240 cm", C.craie, 24) + t(440, 200, "180", C.craie, 24, "start") + t(440, 226, "cm", C.craie, 20, "start") + t(240, 380, `le plus grand carreau${NB}?`, C.rose, 26)
);

const impairs = svg(
  "Deux nombres impairs : 2k + 1 et 2m + 1, leur somme",
  t(240, 120, "7 + 9 = 16", C.craie, 40) + t(240, 180, "13 + 21 = 34", C.craie, 40) + t(240, 260, "(2k + 1) + (2m + 1)", C.bleu, 34) + t(240, 350, `toujours${NB}?`, C.rose, 30)
);

const cadenas = svg(
  "Un cadenas à code : un nombre premier entre 90 et 100",
  `<path d="M180 170 v-50 a60 60 0 0 1 120 0 v50" fill="none" stroke="${C.pale}" stroke-width="14"/>` + r(150, 170, 180, 150, C.jaune, 0.3, 4, 14) +
    r(175, 220, 130, 50, C.craie, 0.85, 2, 6) + t(240, 256, "? ?", C.jaune, 32) + t(240, 375, "premier, entre 90 et 100", C.craie, 24)
);

const euler = svg(
  "Le tableau des valeurs de n au carré plus n plus 41, toutes premières jusqu'à n égale 10",
  t(240, 70, "n² + n + 41", C.bleu, 40) + t(130, 130, "n = 0 → 41", C.craie, 22) + t(130, 170, "n = 1 → 43", C.craie, 22) + t(130, 210, "n = 2 → 47", C.craie, 22) +
    t(350, 130, "n = 3 → 53", C.craie, 22) + t(350, 170, "n = 4 → 61", C.craie, 22) + t(350, 210, "n = 10 → 151", C.craie, 22) +
    t(240, 290, "tous premiers…", C.jaune, 26) + t(240, 350, `toujours${NB}?`, C.rose, 30)
);

// 360 chocolats : un exemple 12 rangées de 30 (dessin réduit : 6 × 15 points, pas à l'échelle).
const chocolats = () => {
  let s = "";
  for (let i = 0; i < 15; i++) for (let j = 0; j < 6; j++) s += `<circle cx="${70 + 24 * i}" cy="${80 + 24 * j}" r="8" fill="${C.jaune}"/>`;
  return svg("Une boîte de 360 chocolats rangés en rectangle, dessin réduit", r(50, 60, 376, 160, C.craie, 0, 3, 8) + s +
    t(240, 270, "360 chocolats", C.craie, 30) + t(240, 310, "(pas à l'échelle)", C.pale, 18) + t(240, 370, `combien de rectangles${NB}?`, C.rose, 26));
};

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "arithmetique_entiers",
  titre: "Énigmes des multiples et des diviseurs",
  description: "Les deux bus, le carrelage sans découpe, la somme de deux impairs, le cadenas premier, le piège de n² + n + 41, le défi des 360 chocolats : multiples communs, diviseurs, parité, nombres premiers.",
  problemes: [
    {
      tag: "Énigme 1 · Les deux bus",
      titre: "Ensemble à 7 h",
      question: `Deux bus partent ensemble à 7 h. L'un repasse <b>toutes les 12 min</b>, l'autre <b>toutes les 18 min</b>.<br><br><b>Dans combien de minutes</b> repartiront-ils de nouveau ensemble ?`,
      reponse: `On cherche le plus petit multiple commun de 12 et 18.<br>Multiples de 18 : 18, 36… et 36 = 3 × 12.<br>Dans <span class="big">36 minutes</span>, à 7 h 36.`,
      consigne: "Dans combien de minutes les deux bus repartent-ils ensemble ?",
      verification: { type: "courte", attendus: ["36"], unite: "min" },
      dessin: lesBus,
    },
    {
      tag: "Énigme 2 · Le carrelage",
      titre: "Sans rien couper",
      question: `Une pièce mesure <b>240 cm sur 180 cm</b>. On veut la couvrir de carreaux carrés tous pareils, <b>sans en couper</b>, les plus grands possible.<br><br><b>Quel est le côté</b> d'un carreau ?`,
      reponse: `Le côté doit diviser 240 et 180 : on cherche leur plus grand diviseur commun.<br>240 = 4 × 60 et 180 = 3 × 60, et 4 et 3 n'ont pas d'autre diviseur commun que 1.<br>Côté : <span class="big">60 cm</span>, soit 4 × 3 = 12 carreaux.`,
      consigne: "Quel est le côté du plus grand carreau possible ?",
      verification: { type: "qcm", choix: ["30 cm", "60 cm", "20 cm"], bonne: 1 },
      dessin: carrelage,
    },
    {
      tag: "Énigme 3 · Deux impairs",
      titre: "Toujours pair ?",
      question: `7 + 9 = 16, 13 + 21 = 34…<br><br>La somme de deux nombres impairs est-elle <b>toujours</b> paire, toujours impaire, ou ça dépend ?`,
      reponse: `Un impair s'écrit 2k + 1. Deux impairs : (2k + 1) + (2m + 1) = 2k + 2m + 2 = 2(k + m + 1).<br>C'est un multiple de 2 : la somme est <span class="big">toujours paire</span>.<br>Des exemples ne prouvent rien ; le calcul, si.`,
      consigne: "La somme de deux impairs est-elle paire, impaire, ou ça dépend ?",
      verification: { type: "qcm", choix: ["Toujours paire", "Toujours impaire", "Ça dépend"], bonne: 0 },
      dessin: impairs,
    },
    {
      tag: "Énigme 4 · Le cadenas",
      titre: "Un code premier",
      question: `Le code du cadenas est le <b>seul nombre premier</b> compris entre 90 et 100.<br><br><b>Quel est le code</b> ?`,
      reponse: `Pairs : non. 91 = 7 × 13 ; 93 = 3 × 31 ; 95 = 5 × 19 ; 99 = 9 × 11.<br>97 : ni 2, ni 3, ni 5, ni 7 ne le divisent, et 11² = 121 > 97.<br>Le code est <span class="big">97</span>.`,
      consigne: "Quel est le nombre premier entre 90 et 100 ?",
      verification: { type: "courte", attendus: ["97"] },
      dessin: cadenas,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Toujours premier ?",
      sorte: "piege",
      question: `Sami calcule <b>n² + n + 41</b> pour n = 0, 1, 2, … jusqu'à 10 : il trouve toujours un nombre premier.<br><br>Peut-il dire que c'est <b>vrai pour tout n</b> ?`,
      reponse: `Non ! Pour n = 40 : 40² + 40 + 41 = 1 600 + 40 + 41 = 1 681 = 41 × 41.<br><span class="big">1 681 = 41²</span> n'est pas premier.<br>Onze exemples ne font pas une preuve ; un seul contre-exemple suffit à dire non.`,
      consigne: "n² + n + 41 est-il premier pour tout n ?",
      verification: { type: "qcm", choix: ["Oui, toujours", "Non : pour n = 2, il ne l'est pas", "Non : pour n = 40, on trouve 41²"], bonne: 2 },
      dessin: euler,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les 360 chocolats",
      sorte: "defi",
      question: `On range <b>360 chocolats</b> en rectangle : des rangées de même longueur. 1 rangée de 360 compte, 360 rangées de 1 aussi, et 12 × 30 n'est pas 30 × 12.<br><br><b>Combien de rangements</b> sont possibles ?`,
      reponse: `Un rangement = un diviseur de 360 (le nombre de rangées).<br>360 = 2³ × 3² × 5. Un diviseur prend 2⁰ à 2³ (4 choix), 3⁰ à 3² (3 choix), 5⁰ ou 5¹ (2 choix).<br>4 × 3 × 2 = <span class="big">24 rangements</span>.`,
      consigne: "Combien de rangements en rectangle pour 360 chocolats ?",
      verification: { type: "courte", attendus: ["24"] },
      dessin: chocolats(),
    },
  ],
};

export default problemes;
