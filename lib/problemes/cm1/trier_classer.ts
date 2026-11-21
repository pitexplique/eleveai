// Énigmes à projeter — CM1, notion trier et classer (masquée en France :
// Belgique, Suisse, Sénégal, Côte d'Ivoire). Les formes bleues et rondes, le
// diagramme du foot et de la natation (placer Zoé, compter), l'arbre de tri, le
// piège de la partie commune, le défi de la forme mystère. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o, ell } from "../dessins-ecole";

type Forme = "rond" | "carre" | "triangle" | "rectangle";
const forme = (f: Forme, x: number, y: number, c: string) =>
  f === "rond" ? o(x, y, 28, c, 0.45, 3)
  : f === "carre" ? r(x - 27, y - 27, 54, 54, c, 0.45, 3)
  : f === "rectangle" ? r(x - 38, y - 22, 76, 44, c, 0.45, 3)
  : p(`M${x} ${y - 30} L${x + 32} ${y + 26} L${x - 32} ${y + 26} Z`, c, 3, 0.45);

const TAS: [Forme, string][] = [
  ["rond", C.bleu], ["carre", C.rose], ["rond", C.rose],
  ["carre", C.bleu], ["rond", C.bleu], ["rond", C.jaune],
  ["rond", C.rose], ["carre", C.bleu], ["rond", C.bleu],
];
const tas = svg(
  "Neuf formes : 3 ronds bleus, 2 carrés bleus, 2 ronds roses, 1 carré rose, 1 rond jaune",
  TAS.map(([f, c], i) => forme(f, 130 + (i % 3) * 110, 80 + Math.floor(i / 3) * 95, c)).join("") +
    t(240, 385, `bleue ET ronde${NB}?`, C.rose, 28)
);

/** Le diagramme foot / natation, avec ou sans les nombres. */
const sports = (q: string, nombres: boolean) => svg(
  nombres
    ? "Deux ensembles qui se chevauchent : 7 élèves foot seulement, 4 élèves les deux, 5 élèves natation seulement"
    : "Deux ensembles qui se chevauchent : foot et natation",
  ell(175, 200, 125, 105, C.jaune, 0.15, 4) + ell(305, 200, 125, 105, C.bleu, 0.15, 4) +
    t(130, 75, "⚽ foot", C.craie, 24) + t(350, 75, "🏊 natation", C.craie, 24) +
    (nombres ? t(120, 212, 7, C.craie, 36) + t(240, 212, 4, C.craie, 36) + t(360, 212, 5, C.craie, 36) : t(240, 212, "?", C.rose, 40)) +
    t(240, 375, q, C.rose, 26)
);

const boite = (x: number, y: number, s: string, c: string = C.craie) => r(x - 70, y - 26, 140, 52, c, 0.15, 3, 10) + t(x, y + 8, s, C.craie, 22);
const arbre = svg(
  "Un arbre de tri : est-ce un triangle ? oui : case 1 ; non : est-ce bleu ? oui : case 2 ; non : case 3",
  forme("carre", 55, 60, C.rose) + t(92, 68, `où${NB}?`, C.rose, 22, "start") +
    boite(240, 60, `triangle${NB}?`, C.jaune) +
    l(215, 86, 130, 160, C.craie, 3) + t(150, 120, "oui", C.pale, 18) + boite(110, 186, "case 1") +
    l(265, 86, 350, 160, C.craie, 3) + t(335, 120, "non", C.pale, 18) + boite(350, 186, `bleu${NB}?`, C.jaune) +
    l(325, 212, 250, 280, C.craie, 3) + t(268, 240, "oui", C.pale, 18) + boite(240, 306, "case 2") +
    l(375, 212, 400, 280, C.craie, 3) + t(410, 240, "non", C.pale, 18) + boite(400, 306, "case 3") +
    t(240, 395, `Le carré rose${NB}?`, C.rose, 26)
);

const MYSTERE: [Forme, string][] = [["rond", C.bleu], ["carre", C.jaune], ["triangle", C.rose], ["carre", C.rose], ["rectangle", C.bleu], ["triangle", C.bleu]];
const mystere = svg(
  "Six formes numérotées : 1 rond bleu, 2 carré jaune, 3 triangle rose, 4 carré rose, 5 rectangle bleu, 6 triangle bleu",
  MYSTERE.map(([f, c], i) => {
    const x = 100 + (i % 3) * 140, y = 110 + Math.floor(i / 3) * 140;
    return forme(f, x, y, c) + t(x, y + 62, i + 1, C.craie, 24);
  }).join("") + t(240, 395, `Qui suis-je${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "trier_classer",
  titre: "Énigmes pour trier et classer",
  description: "Les formes bleues et rondes, le diagramme du foot et de la natation (placer Zoé, compter les élèves), l'arbre de tri, le piège de la partie commune, le défi de la forme mystère.",
  problemes: [
    {
      tag: "Énigme 1 · Le tas de formes",
      titre: "Deux critères",
      question: `Garde d'abord les formes <b>bleues</b>.<br>Parmi elles, garde les <b>rondes</b>.<br><br>Combien en reste-t-il ?`,
      reponse: `Les bleues : 3 ronds et 2 carrés.<br>Les rondes parmi elles : <span class="big">3 formes</span>.`,
      consigne: "Combien de formes sont à la fois bleues et rondes ?",
      verification: { type: "courte", attendus: ["3"], unite: "formes" },
      dessin: tas,
    },
    {
      tag: "Énigme 2 · Foot et natation",
      titre: "Placer Zoé",
      question: `Chaque élève se place dans le diagramme.<br>Zoé aime le <b>foot</b> et aussi la <b>natation</b>.<br><br>Où se place-t-elle ?`,
      reponse: `Elle est dans les deux ensembles à la fois.<br>Elle va dans <span class="big">la partie commune</span>.`,
      consigne: "Zoé aime le foot et la natation. Où se place-t-elle ?",
      verification: { type: "qcm", choix: ["dans le foot seulement", "dans la partie commune", "dans la natation seulement"], bonne: 1 },
      dessin: sports(`Zoé${NB}?`, false),
    },
    {
      tag: "Énigme 3 · L'arbre de tri",
      titre: "Suivre les questions",
      question: `On trie les formes avec cet arbre.<br>On répond à chaque question, de haut en bas.<br><br>Où va le <b>carré rose</b> ?`,
      reponse: `Triangle ? Non.<br>Bleu ? Non.<br>Il va dans <span class="big">la case 3</span>.`,
      consigne: "Où va le carré rose ?",
      verification: { type: "qcm", choix: ["case 1", "case 2", "case 3"], bonne: 2 },
      dessin: arbre,
    },
    {
      tag: "Énigme 4 · Foot et natation",
      titre: "Compter tout le monde",
      question: `Le diagramme est rempli.<br>Chaque élève est compté une seule fois.<br><br>Combien d'élèves <b>en tout</b> ?`,
      reponse: `7 + 4 + 5.<br>7 + 4 = 11, 11 + 5 = <span class="big">16 élèves</span>.`,
      consigne: "Combien d'élèves en tout dans le diagramme ?",
      verification: { type: "courte", attendus: ["16"], unite: "élèves" },
      dessin: sports(`En tout${NB}?`, true),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La partie commune",
      sorte: "piege",
      question: `Regarde encore le diagramme.<br><br>Combien d'élèves aiment la <b>natation</b> ?`,
      reponse: `Le piège : ne lire que le 5.<br>Les 4 du milieu aiment aussi la natation.<br>5 + 4 = <span class="big">9 élèves</span>.`,
      consigne: "Combien d'élèves aiment la natation ?",
      verification: { type: "qcm", choix: ["5", "16", "9"], bonne: 2 },
      dessin: sports(`La natation${NB}?`, true),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La forme mystère",
      sorte: "defi",
      question: `Je ne suis pas <b>jaune</b>.<br>J'ai <b>4 côtés</b>.<br>Je ne suis pas <b>bleue</b>.<br><br>Quel est mon numéro ?`,
      reponse: `Pas jaune : on enlève 2.<br>4 côtés : il reste 4 et 5.<br>Pas bleue : on enlève 5. C'est <span class="big">la forme 4</span>.`,
      consigne: "Quel est le numéro de la forme mystère ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: mystere,
    },
  ],
};

export default problemes;
