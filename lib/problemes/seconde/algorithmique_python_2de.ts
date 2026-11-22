// Énigmes à projeter — seconde, notion algorithmique_python_2de (la location
// de kayak, la tirelire, la vidéo qui double, les températures, piège du
// range, défi de la suite de Syracuse). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { code } from "../dessins-2de";

const kayak = svg(
  "Une fonction Python tarif de h : 3 euros jusqu'à 2 heures, puis 2 euros par heure en plus",
  code([["def tarif(h):", 0], ["if h &lt;= 2:", 1], ["return 3", 2], ["else:", 1], ["return 3 + 2 * (h - 2)", 2]], { y: 40, surligne: 4 }) +
    t(240, 300, "location de kayak (h en heures)", C.pale, 20) + t(240, 360, `tarif(5)${NB}?`, C.rose, 30)
);

const tirelire = svg(
  "Une boucle Python qui ajoute 1, 2, 3, 4, 5 à une somme s",
  code([["s = 0", 0], ["for k in range(1, 6):", 0], ["s = s + k", 1], ["print(s)", 0]], { y: 50, surligne: 1 }) +
    t(240, 290, "la tirelire de Zoé", C.pale, 20) + t(240, 350, `qu'affiche-t-il${NB}?`, C.rose, 30)
);

const video = svg(
  "Une boucle while : les vues doublent chaque jour tant qu'elles sont sous 5 000",
  code([["vues = 100", 0], ["jours = 0", 0], ["while vues &lt; 5000:", 0], ["vues = vues * 2", 1], ["jours = jours + 1", 1], ["print(jours)", 0]], { y: 30, surligne: 2 }) +
    t(240, 330, "une vidéo qui double chaque jour", C.pale, 20) + t(240, 385, `qu'affiche-t-il${NB}?`, C.rose, 28)
);

const temperatures = svg(
  "Une liste Python de cinq températures et le calcul de leur moyenne",
  code([["T = [24, 27, 31, 29, 26]", 0], ["m = sum(T) / len(T)", 0], ["print(m)", 0]], { y: 70, surligne: 1 }) +
    t(240, 290, "températures de la semaine (°C)", C.pale, 20) + t(240, 350, `qu'affiche-t-il${NB}?`, C.rose, 30)
);

const bonjour = svg(
  "Une boucle for k in range de 1 à 10 qui affiche Bonjour",
  code([["for k in range(1, 10):", 0], ["print(\"Bonjour\")", 1]], { y: 90, surligne: 0 }) +
    t(240, 300, `combien de «${NB}Bonjour${NB}»${NB}?`, C.rose, 30)
);

const syracuse = svg(
  "L'algorithme de Syracuse : si n est pair on le divise par 2, sinon on calcule 3n plus 1, et on compte les étapes jusqu'à 1",
  code([["n = 6", 0], ["etapes = 0", 0], ["while n != 1:", 0], ["if n % 2 == 0:", 1], ["n = n // 2", 2], ["else:", 1], ["n = 3 * n + 1", 2], ["etapes = etapes + 1", 1], ["print(etapes)", 0]],
    { y: 10, pas: 33, taille: 20 }) + t(240, 375, `qu'affiche-t-il${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "algorithmique_python_2de",
  titre: "Énigmes d'algorithmique et Python",
  description: "La location de kayak, la tirelire, la vidéo qui double, les températures, le piège du range, le défi de Syracuse : fonctions, conditions, boucles for et while, listes, exécuter un programme à la main.",
  problemes: [
    {
      tag: "Énigme 1 · La location de kayak",
      titre: "Une fonction avec une condition",
      question: `Un kayak se loue <b>3 €</b> jusqu'à 2 heures, puis <b>2 €</b> par heure en plus. La fonction tarif(h) le calcule.<br><br><b>Que renvoie</b> tarif(5) ?`,
      reponse: `5 &lt;= 2 est faux : on passe dans le else.<br>3 + 2 × (5 − 2) = 3 + 6 = <span class="big">9</span>, soit 9 €.`,
      consigne: "Que renvoie tarif(5) ?",
      verification: { type: "courte", attendus: ["9"], unite: "€" },
      dessin: kayak,
    },
    {
      tag: "Énigme 2 · La tirelire",
      titre: "La boucle for",
      question: `Zoé met 1 € dans sa tirelire le 1<sup>er</sup> jour, 2 € le 2<sup>e</sup>, et ainsi de suite. Le programme fait le total.<br><br><b>Qu'affiche</b> ce programme ?`,
      reponse: `range(1, 6) donne k = 1, 2, 3, 4, 5 (le 6 est exclu).<br>s = 1 + 2 + 3 + 4 + 5 = <span class="big">15</span>.`,
      consigne: "Qu'affiche le programme de la tirelire ?",
      verification: { type: "qcm", choix: ["15", "10", "21"], bonne: 0 },
      dessin: tirelire,
    },
    {
      tag: "Énigme 3 · La vidéo qui double",
      titre: "La boucle while",
      question: `Une vidéo a <b>100 vues</b>. Le nombre de vues <b>double</b> chaque jour. Le programme compte les jours tant qu'on est sous 5 000 vues.<br><br><b>Qu'affiche</b> ce programme ?`,
      reponse: `100 → 200 → 400 → 800 → 1 600 → 3 200 → 6 400.<br>6 400 n'est plus sous 5 000 : la boucle s'arrête après <span class="big">6</span> jours.`,
      consigne: "Qu'affiche le programme de la vidéo ?",
      verification: { type: "courte", attendus: ["6"], unite: "jours" },
      dessin: video,
    },
    {
      tag: "Énigme 4 · Les températures",
      titre: "Une liste",
      question: `La liste T contient les températures de la semaine : 24, 27, 31, 29, 26.<br><br><b>Qu'affiche</b> le programme ?`,
      reponse: `sum(T) = 24 + 27 + 31 + 29 + 26 = 137 ; len(T) = 5.<br>137 ÷ 5 = <span class="big">27,4</span> : la moyenne (Python écrit 27.4).`,
      consigne: "Qu'affiche le programme des températures ?",
      verification: { type: "qcm", choix: ["29", "27,4", "137"], bonne: 1 },
      dessin: temperatures,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le range",
      sorte: "piege",
      question: `Combien de fois ce programme affiche-t-il « Bonjour » ?<br><br>A. 10 B. 11 C. 9`,
      reponse: `range(1, 10) va de 1 à 9 : le 10 est <b>exclu</b>.<br>Bonjour s'affiche <span class="big">9 fois</span>.`,
      consigne: "Combien de fois for k in range(1, 10) affiche-t-il Bonjour ?",
      verification: { type: "qcm", choix: ["10", "11", "9"], bonne: 2 },
      dessin: bonjour,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La suite de Syracuse",
      sorte: "defi",
      question: `On part de n = 6. Si n est pair, on le divise par 2 ; sinon, on le remplace par 3n + 1. On compte les étapes jusqu'à 1.<br><br><b>Qu'affiche</b> le programme ?`,
      reponse: `6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1.<br>On compte les flèches : <span class="big">8</span> étapes. Personne n'a jamais prouvé que ça finit toujours à 1 !`,
      consigne: "En partant de n = 6, combien d'étapes pour arriver à 1 ?",
      verification: { type: "courte", attendus: ["8"], unite: "étapes" },
      dessin: syracuse,
    },
  ],
};

export default problemes;
