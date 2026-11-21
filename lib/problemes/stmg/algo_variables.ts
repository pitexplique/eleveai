// Énigmes à projeter — STMG (1re), notion variables, compteur et accumulateur
// (le charpentier, le chapelier, le guide de pêche, les baies vitrées, piège
// de la borne de photos d'identité, défi de la fabrique de madeleines).
// 21/11/2026. Le programme Python est dans le dessin.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { code } from "../dessins-2de";

const charpentier = svg("Programme : p = 40 ; p = p − 12 ; p = p + 25 ; afficher p",
  code([["p = 40", 0], ["p = p - 12", 0], ["p = p + 25", 0], ["print(p)", 0]], { y: 40, pas: 46, taille: 26 }) +
    t(240, 330, `qu'affiche le programme${NB}?`, C.rose, 27));

const chapelier = svg("Caisse du chapelier : à chaque chapeau vendu, n = n + 1 et s = s + prix ; quelle ligne compte les chapeaux ?",
  code([["n = 0", 0], ["s = 0", 0], ["# un chapeau est vendu :", 0], ["n = n + 1", 0], ["s = s + prix", 0]], { y: 30, pas: 44, taille: 25 }) +
    t(240, 340, `quelle ligne compte${NB}?`, C.rose, 28));

const peche = svg("Guide de pêche : s = 0 ; pour k de 0 à 3, s = s + 35 ; afficher s",
  code([["s = 0", 0], ["for k in range(4):", 0], ["s = s + 35", 1], ["print(s)", 0]], { y: 40, pas: 46, taille: 26 }) +
    t(240, 330, `qu'affiche le programme${NB}?`, C.rose, 27));

const baies = svg("Baies vitrées : si random() est inférieur à 0,2 alors d = 1, sinon d = 0 ; probabilité que d vaille 1 ?",
  code([["from random import random", 0], ["if random() &lt; 0.2:", 0], ["d = 1", 1], ["else:", 0], ["d = 0", 1]], { y: 24, pas: 44, taille: 24 }) +
    t(240, 300, "random() : un nombre au hasard entre 0 et 1", C.pale, 18) +
    t(240, 360, `proba que d = 1${NB}?`, C.rose, 28));

const photo = svg("Borne photo : p = 6 ; t = p × 2 ; p = 8 ; afficher t ; Tom répond 16",
  code([["p = 6", 0], ["t = p * 2", 0], ["p = 8", 0], ["print(t)", 0]], { y: 30, pas: 46, taille: 26 }) +
    t(240, 290, "Tom : « ça affiche 16 »", C.pale, 23) +
    t(240, 360, `qu'affiche le programme${NB}?`, C.rose, 27));

const madeleines = svg("Madeleines : m = 1000 ; trois fois, m = m × 1,5 ; afficher m",
  code([["m = 1000", 0], ["for k in range(3):", 0], ["m = m * 1.5", 1], ["print(m)", 0]], { y: 40, pas: 46, taille: 26 }) +
    t(240, 330, `qu'affiche le programme${NB}?`, C.rose, 27));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "algo_variables",
  titre: "Énigmes des variables, compteur et accumulateur",
  description: "Le charpentier, le chapelier, le guide de pêche, les baies vitrées, le piège de la borne de photos d'identité, le défi de la fabrique de madeleines : suivre la valeur d'une variable, reconnaître un compteur et un accumulateur, simuler une loi de Bernoulli avec random().",
  problemes: [
    {
      tag: "Énigme 1 · Le charpentier",
      titre: "Suivre une variable",
      question: `Un charpentier suit son stock de poutres.<br>Il en a 40, en utilise 12, puis en reçoit 25.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `p vaut 40, puis 40 − 12 = 28, puis 28 + 25.<br>Le programme affiche <span class="big">53</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "courte", attendus: ["53"] },
      dessin: charpentier,
    },
    {
      tag: "Énigme 2 · Le chapelier",
      titre: "Le compteur",
      question: `La caisse d'un chapelier a deux variables.<br>n compte les chapeaux vendus.<br>s fait la somme des prix.<br><br><b>Quelle ligne compte les chapeaux</b> ?`,
      reponse: `Un compteur ajoute 1 à chaque fois.<br><span class="big">n = n + 1</span>.<br>s = s + prix est un accumulateur : il ajoute les prix.`,
      consigne: "Quelle ligne compte les chapeaux vendus ?",
      verification: { type: "qcm", choix: ["n = n + 1", "s = s + prix", "n = 0"], bonne: 0 },
      dessin: chapelier,
    },
    {
      tag: "Énigme 3 · Le guide de pêche",
      titre: "L'accumulateur",
      question: `Un guide de pêche fait 4 sorties à 35 € dans la semaine.<br>Son programme ajoute chaque sortie à s.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `range(4) fait 4 tours : s ajoute 35 à chaque tour.<br>35 + 35 + 35 + 35 = <span class="big">140</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "qcm", choix: ["35", "4", "140"], bonne: 2 },
      dessin: peche,
    },
    {
      tag: "Énigme 4 · Les baies vitrées",
      titre: "Simuler avec random()",
      question: `Une entreprise pose des baies vitrées.<br>Elle simule un client avec ce programme.<br>d = 1 : le client demande un volet.<br><br><b>Avec quelle probabilité d vaut-il 1</b> ?`,
      reponse: `random() est plus petit que 0,2 dans 20 % des cas.<br>d vaut 1 avec la probabilité <span class="big">0,2</span> : une loi de Bernoulli.`,
      consigne: "Avec quelle probabilité d vaut-il 1 ?",
      verification: { type: "qcm", choix: ["0,8", "0,2", "20"], bonne: 1 },
      dessin: baies,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La borne de photos d'identité",
      sorte: "piege",
      question: `Une borne de photos d'identité vend la planche 6 €.<br>Un client en prend 2.<br>Ensuite, le prix passe à 8 €.<br>Tom dit que le programme affiche 16.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `t est calculé à la ligne 2 : t = 6 × 2 = 12.<br>Changer p ensuite ne change pas t.<br>Le programme affiche <span class="big">12</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "courte", attendus: ["12"] },
      dessin: photo,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La fabrique de madeleines",
      sorte: "defi",
      question: `Une fabrique produit 1${NB}000 madeleines par jour.<br>Chaque mois, la production augmente de moitié.<br><br><b>Qu'affiche le programme</b> après 3 mois ?`,
      reponse: `× 1,5 à chaque tour : 1${NB}000, puis 1${NB}500, puis 2${NB}250, puis 3${NB}375.<br>Le programme affiche <span class="big">3${NB}375</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "courte", attendus: ["3375", "3 375", "3375.0", "3 375 madeleines"] },
      dessin: madeleines,
    },
  ],
};

export default problemes;
