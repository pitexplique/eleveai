// Énigmes à projeter — CM2, notion droite (les rails parallèles, l'étoile d'un
// seul trait, la rue perpendiculaire, une droite n'a pas de fin, le piège des
// droites qui « ne se coupent pas » sur la feuille, le défi des 4 points).
// 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p } from "../dessins-ecole";

const rails = svg(
  "Des rails de train vus de haut, avec les traverses",
  l(40, 160, 440, 160, C.craie, 6) + l(40, 240, 440, 240, C.craie, 6) +
    [0, 1, 2, 3, 4, 5, 6, 7].map((i) => r(55 + i * 50, 145, 18, 110, C.jaune, 0.35, 2, 2)).join("") + t(240, 110, "🚆", C.craie, 50) +
    t(240, 330, `les deux rails${NB}?`, C.rose, 26)
);

// L'étoile à 5 branches : les 5 sommets d'un pentagone régulier, reliés de 2 en 2.
const etoile = () => {
  const P = [0, 1, 2, 3, 4].map((k) => [240 + 150 * Math.sin((k * 2 * Math.PI) / 5), 200 - 150 * Math.cos((k * 2 * Math.PI) / 5)]);
  const d = [0, 2, 4, 1, 3, 0].map((k, i) => `${i ? "L" : "M"}${P[k][0].toFixed(1)} ${P[k][1].toFixed(1)}`).join(" ");
  return svg("Une étoile à 5 branches tracée sans lever le crayon", p(d, C.jaune, 5) + o(P[0][0], P[0][1], 8, C.rose, 1, 2) + t(240, 395, `combien de segments${NB}?`, C.rose, 24));
};

const rues = svg(
  "Un plan de rues : la rue des Lilas, la rue du Port, l'avenue Verte et la rue Haute",
  l(40, 200, 440, 200, C.bleu, 10) + t(60, 185, "rue des Lilas", C.bleu, 20, "start") +
    l(150, 40, 150, 380, C.craie, 10) + t(160, 60, "rue du Port", C.craie, 18, "start") +
    l(260, 40, 420, 380, C.jaune, 10) + t(330, 70, "avenue Verte", C.jaune, 18, "start") +
    l(40, 330, 440, 290, C.pale, 10) + t(60, 360, "rue Haute", C.pale, 18, "start") + p("M150 180 L170 180 L170 200", C.rose, 3)
);

const regle = svg(
  "Une droite qui dépasse la feuille des deux côtés, et une règle",
  l(10, 150, 470, 150, C.bleu, 5, "") + t(20, 135, "…", C.bleu, 30) + t(460, 135, "…", C.bleu, 30) + t(240, 130, "(d)", C.bleu, 24) +
    r(90, 210, 300, 50, C.jaune, 0.25, 3, 4) + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k) => l(100 + k * 28, 210, 100 + k * 28, k % 5 ? 222 : 230, C.craie, 2)).join("") +
    t(240, 340, `longueur de (d)${NB}?`, C.rose, 26)
);

// Deux droites presque parallèles qui se couperaient à droite, hors de la feuille.
const presque = svg(
  "Deux droites qui ne se coupent pas sur la feuille, mais qui se rapprochent",
  r(30, 60, 420, 280, C.pale, 0.05, 2, 4) + l(30, 130, 450, 180, C.bleu, 4) + l(30, 270, 450, 220, C.rose, 4) +
    t(60, 120, "(d1)", C.bleu, 22, "start") + t(60, 300, "(d2)", C.rose, 22, "start") + t(240, 385, `parallèles${NB}?`, C.craie, 26)
);

const points = svg(
  "Quatre points A, B, C, D ; jamais trois sur une même ligne",
  o(110, 120, 8, C.craie, 1, 2) + t(95, 105, "A", C.craie, 26, "end") + o(370, 100, 8, C.craie, 1, 2) + t(385, 90, "B", C.craie, 26, "start") +
    o(400, 300, 8, C.craie, 1, 2) + t(415, 320, "C", C.craie, 26, "start") + o(140, 320, 8, C.craie, 1, 2) + t(125, 345, "D", C.craie, 26, "end") +
    l(110, 120, 370, 100, C.pale, 2, "6 6") + t(240, 230, `combien de droites${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "droite",
  titre: "Énigmes sur les droites",
  description: "Les rails du train, l'étoile d'un seul trait, la rue perpendiculaire, la longueur d'une droite, le piège des droites qui se rapprochent, le défi des 4 points.",
  problemes: [
    {
      tag: "Énigme 1 · À la gare",
      titre: "Les rails",
      question: `Les deux rails d'un train restent toujours à la même distance.<br><br>Les rails sont-ils <b>parallèles</b> ou <b>perpendiculaires</b> ?`,
      reponse: `Ils ne se coupent jamais et gardent le même écart.<br>Les rails sont <span class="big">parallèles</span>.<br>Les traverses, elles, sont perpendiculaires aux rails.`,
      consigne: "Les deux rails sont :",
      verification: { type: "qcm", choix: ["parallèles", "perpendiculaires", "ni l'un ni l'autre"], bonne: 0 },
      dessin: rails,
    },
    {
      tag: "Énigme 2 · Le dessin d'un seul trait",
      titre: "L'étoile",
      question: `Noa trace une étoile à 5 branches <b>sans lever le crayon</b>.<br>Il trace seulement des segments droits.<br><br><b>Combien de segments</b> trace-t-il ?`,
      reponse: `On part d'une pointe et on saute une pointe à chaque fois.<br>On revient au départ après <span class="big">5 segments</span>.`,
      consigne: "Combien de segments pour l'étoile ?",
      verification: { type: "courte", attendus: ["5"], unite: "segments" },
      dessin: etoile(),
    },
    {
      tag: "Énigme 3 · Le plan du quartier",
      titre: "La rue perpendiculaire",
      question: `Voici le plan de quatre rues.<br><br><b>Quelle rue</b> est perpendiculaire à la rue des Lilas ?`,
      reponse: `Perpendiculaire : elle coupe en faisant un angle droit.<br>Le petit carré rose le montre : <span class="big">la rue du Port</span>.`,
      consigne: "Quelle rue est perpendiculaire à la rue des Lilas ?",
      verification: { type: "qcm", choix: ["L'avenue Verte", "La rue Haute", "La rue du Port"], bonne: 2 },
      dessin: rues,
    },
    {
      tag: "Énigme 4 · Avec la règle",
      titre: "La longueur d'une droite",
      question: `Léa veut mesurer la droite (d) avec sa règle.<br><br><b>Peut-elle trouver sa longueur</b> ?`,
      reponse: `Une droite <b>n'a pas de fin</b>, des deux côtés.<br>On ne peut mesurer qu'un segment.<br><span class="big">Non, une droite n'a pas de longueur</span>.`,
      consigne: "Peut-on mesurer la longueur d'une droite ?",
      verification: { type: "qcm", choix: ["Non, une droite n'a pas de fin", "Oui, avec une règle", "Oui, si elle est horizontale"], bonne: 0 },
      dessin: regle,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Elles ne se coupent pas ?",
      sorte: "piege",
      question: `Sur la feuille, les droites (d1) et (d2) ne se coupent pas.<br>Hugo dit : « Elles sont parallèles. »<br><br><b>A-t-il raison</b> ?`,
      reponse: `Non ! Elles se rapprochent vers la droite.<br>Elles se coupent plus loin, hors de la feuille.<br><span class="big">Elles ne sont pas parallèles</span>.`,
      consigne: "Les droites (d1) et (d2) sont-elles parallèles ?",
      verification: { type: "qcm", choix: ["Oui", "Non, elles se coupent plus loin", "On ne peut pas savoir"], bonne: 1 },
      dessin: presque,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les quatre points",
      sorte: "defi",
      question: `Quatre points A, B, C, D. Jamais trois points sur une même droite.<br>On trace toutes les droites qui passent par <b>deux</b> de ces points.<br><br><b>Combien de droites</b> ?`,
      reponse: `Depuis A : AB, AC, AD. Depuis B : BC, BD. Depuis C : CD.<br>3 + 2 + 1 = <span class="big">6 droites</span>.`,
      consigne: "Combien de droites peut-on tracer ?",
      verification: { type: "courte", attendus: ["6"], unite: "droites" },
      dessin: points,
    },
  ],
};

export default problemes;
