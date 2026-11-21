// Énigmes à projeter — première spé maths, notion algorithmique
// (le stock de croissants, le relais 4 × 100 m, les gradins de la salle de
// concert, le radar de la rue, piège de l'échange des casiers, défi du coureur
// qui prépare son semi-marathon). 21/11/2026. Le programme est dans le dessin.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { code } from "../dessins-2de";

const croissants = svg("Programme Python : s = 50 ; s = s + 20 ; s = s * 2 ; afficher s",
  code([["s = 50", 0], ["s = s + 20", 0], ["s = s * 2", 0], ["print(s)", 0]], { y: 40, pas: 46, taille: 26 }) +
    t(240, 290, "le stock de croissants", C.jaune, 22) + t(240, 380, `affichage${NB}?`, C.rose, 28));

const relais = svg("Programme Python : T = la liste 11, 12, 10, 13 ; afficher T[1] + T[3]",
  code([["T = [11, 12, 10, 13]", 0], ["print(T[1] + T[3])", 0]], { y: 50, pas: 50, taille: 26 }) +
    t(240, 250, "temps des 4 coureurs, en secondes", C.jaune, 22) + t(240, 375, `affichage${NB}?`, C.rose, 28));

const gradins = svg("Programme Python : L = la liste des 10 + 2*k pour k dans range(5) ; afficher la somme de L",
  code([["L = [10 + 2*k for k in range(5)]", 0], ["print(sum(L))", 0]], { y: 50, pas: 50, taille: 24 }) +
    t(240, 250, "rangée k : 10 + 2k sièges", C.jaune, 22) + t(240, 375, `affichage${NB}?`, C.rose, 28));

const radar = svg("Programme Python : V = la liste 48, 55, 61, 47, 53 ; c = 0 ; pour v dans V, si v est strictement supérieur à 50, c = c + 1 ; afficher c",
  code([["V = [48, 55, 61, 47, 53]", 0], ["c = 0", 0], ["for v in V:", 0], ["if v > 50:", 1], ["c = c + 1", 2], ["print(c)", 0]], { y: 24, pas: 42, taille: 24 }) +
    t(240, 385, `affichage${NB}?`, C.rose, 28));

const casiers = svg("Programme Python de Nina : a = 7 ; b = 12 ; a = b ; b = a ; afficher a et b ; elle pense avoir échangé les deux casiers",
  code([["a = 7", 0], ["b = 12", 0], ["a = b", 0], ["b = a", 0], ["print(a, b)", 0]], { y: 24, pas: 42, taille: 26 }) +
    t(240, 300, "Nina : « ça affiche 12 7 »", C.bleu, 24) + t(240, 385, `Python affiche${NB}?`, C.rose, 28));

const coureur = svg("Programme Python : s = 0 ; d = 5 ; n = 0 ; tant que s est strictement inférieur à 100, s = s + d, d = d + 1, n = n + 1 ; afficher n",
  code([["s = 0", 0], ["d = 5", 0], ["n = 0", 0], ["while s &lt; 100:", 0], ["s = s + d", 1], ["d = d + 1", 1], ["n = n + 1", 1], ["print(n)", 0]], { y: 14, pas: 38, taille: 23 }) +
    t(240, 395, `affichage${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "algorithmique",
  titre: "Énigmes d'algorithmique et programmation",
  description: "Le stock de croissants, le relais 4 × 100 m, les gradins de la salle de concert, le radar de la rue, le piège de l'échange des casiers, le défi du coureur : affectation, indices d'une liste, liste en compréhension, parcours avec condition, boucle while et seuil.",
  problemes: [
    {
      tag: "Énigme 1 · Le stock de croissants",
      titre: "Variables et affectation",
      question: `Un boulanger suit son stock de croissants avec ce programme : il en a 50, en cuit 20, puis double tout pour le week-end.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `Chaque ligne remplace la valeur de s : 50, puis 50 + 20 = 70, puis 70 × 2.<br>Le programme affiche <span class="big">140</span>.`,
      consigne: "s = 50 ; s = s + 20 ; s = s * 2 : qu'affiche print(s) ?",
      verification: { type: "courte", attendus: ["140"] },
      dessin: croissants,
    },
    {
      tag: "Énigme 2 · Le relais 4 × 100 m",
      titre: "Les indices d'une liste",
      question: `La liste T contient les temps des 4 coureurs d'un relais, dans l'ordre de passage.<br><br><b>Qu'affiche print(T[1] + T[3])</b> ?`,
      reponse: `En Python, les indices commencent à 0 : T[0] = 11, T[1] = 12, T[2] = 10, T[3] = 13.<br>T[1] + T[3] = 12 + 13 = <span class="big">25</span> : le 2e et le 4e coureur.`,
      consigne: "T = [11, 12, 10, 13] : qu'affiche print(T[1] + T[3]) ?",
      verification: { type: "qcm", choix: ["21", "25", "23"], bonne: 1 },
      dessin: relais,
    },
    {
      tag: "Énigme 3 · Les gradins",
      titre: "Une liste en compréhension",
      question: `Une salle de concert a 5 rangées de gradins. La rangée k (k de 0 à 4) compte 10 + 2k sièges.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `range(5) donne k = 0, 1, 2, 3, 4 : L = [10, 12, 14, 16, 18].<br>sum(L) = 10 + 12 + 14 + 16 + 18 = <span class="big">70</span> sièges.`,
      consigne: "L = [10 + 2*k for k in range(5)] : qu'affiche print(sum(L)) ?",
      verification: { type: "courte", attendus: ["70"] },
      dessin: gradins,
    },
    {
      tag: "Énigme 4 · Le radar de la rue",
      titre: "Parcourir une liste",
      question: `Dans une rue limitée à 50 km/h, un radar pédagogique relève 5 vitesses (liste V). Le programme compte les voitures trop rapides.<br><br><b>Qu'affiche-t-il</b> ?`,
      reponse: `La boucle lit chaque vitesse : 55, 61 et 53 dépassent 50 ; 48 et 47 non.<br>Le programme affiche <span class="big">3</span>.`,
      consigne: "V = [48, 55, 61, 47, 53] ; on compte les v > 50 : qu'affiche print(c) ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: radar,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'échange des casiers",
      sorte: "piege",
      question: `À la piscine, Nina veut échanger les casiers a = 7 et b = 12. Elle écrit a = b puis b = a.<br>Nina : « Le programme affiche 12 7. »<br><br><b>Qu'affiche Python</b> ?`,
      reponse: `a = b met 12 dans a : l'ancien 7 est perdu. Puis b = a remet 12 dans b.<br>Python affiche <span class="big">12 12</span>. Pour échanger, il faut une variable de plus (c = a ; a = b ; b = c), ou a, b = b, a.`,
      consigne: "a = 7 ; b = 12 ; a = b ; b = a : qu'affiche print(a, b) ?",
      verification: { type: "qcm", choix: ["12 7", "7 7", "12 12"], bonne: 2 },
      dessin: casiers,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le coureur et son semi-marathon",
      sorte: "defi",
      question: `Un coureur court 5 km la 1re semaine, puis 1 km de plus chaque semaine. Ce programme cherche au bout de combien de semaines il aura couru 100 km en tout.<br><br><b>Qu'affiche-t-il</b> ?`,
      reponse: `Après n semaines, s = 5 + 6 + … : 10 semaines donnent 5 + 6 + … + 14 = 95 &lt; 100, la boucle continue.<br>La 11e semaine ajoute 15 : s = 110. Le programme affiche <span class="big">11</span>.`,
      consigne: "s = 0, d = 5, n = 0 ; tant que s < 100 : s = s + d, d = d + 1, n = n + 1. Qu'affiche print(n) ?",
      verification: { type: "qcm", choix: ["11", "10", "20"], bonne: 0 },
      dessin: coureur,
    },
  ],
};

export default problemes;
