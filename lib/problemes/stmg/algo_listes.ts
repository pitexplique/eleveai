// Énigmes à projeter — STMG (1re), notion listes (le téléski nautique, les
// lentilles de Cilaos (974), le vendeur de beignets, le tournoi de belote,
// piège du concours de cuisine, défi de la cultivatrice d'orchidées).
// 21/11/2026. Le programme Python est dans le dessin.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { code } from "../dessins-2de";

const teleski = svg("Téléski nautique : L = [] ; pour k de 0 à 3, ajouter 5 × k à L ; afficher L",
  code([["L = []", 0], ["for k in range(4):", 0], ["L.append(5 * k)", 1], ["print(L)", 0]], { y: 40, pas: 46, taille: 26 }) +
    t(240, 330, `qu'affiche le programme${NB}?`, C.rose, 27));

const lentilles = svg("Lentilles de Cilaos : S = [25, 30, 18, 22] ; afficher S[0] + S[3]",
  code([["S = [25, 30, 18, 22]", 0], ["print(S[0] + S[3])", 0]], { y: 60, pas: 50, taille: 27 }) +
    t(240, 240, "kilos vendus du lundi au jeudi", C.pale, 20) +
    t(240, 330, `qu'affiche le programme${NB}?`, C.rose, 27));

const beignets = svg("Beignets : V = [120, 95, 140, 85] ; s = 0 ; pour v dans V, s = s + v ; afficher s",
  code([["V = [120, 95, 140, 85]", 0], ["s = 0", 0], ["for v in V:", 0], ["s = s + v", 1], ["print(s)", 0]], { y: 30, pas: 44, taille: 25 }) +
    t(240, 340, `qu'affiche le programme${NB}?`, C.rose, 27));

const belote = svg("Belote : J = [Ana, Bob, Cléo] ; ajouter Dina ; retirer Bob ; afficher la longueur de J",
  code([["J = [\"Ana\", \"Bob\", \"Cléo\"]", 0], ["J.append(\"Dina\")", 0], ["J.remove(\"Bob\")", 0], ["print(len(J))", 0]], { y: 40, pas: 46, taille: 25 }) +
    t(240, 330, `qu'affiche le programme${NB}?`, C.rose, 27));

const cuisine = svg("Concours de cuisine : N = [14, 17, 12, 19] ; afficher N[1] ; Lina répond 14",
  code([["N = [14, 17, 12, 19]", 0], ["print(N[1])", 0]], { y: 50, pas: 50, taille: 27 }) +
    t(240, 230, "Lina : « ça affiche 14 »", C.pale, 23) +
    t(240, 330, `qu'affiche le programme${NB}?`, C.rose, 27));

const orchidees = svg("Orchidées : R = [k × k pour k de 1 à 5] ; afficher la somme de R",
  code([["R = [k * k for k in range(1, 6)]", 0], ["print(sum(R))", 0]], { y: 60, pas: 50, taille: 24 }) +
    t(240, 240, "parcelle k : k rangées de k orchidées", C.pale, 20) +
    t(240, 330, `qu'affiche le programme${NB}?`, C.rose, 27));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "algo_listes",
  titre: "Énigmes des listes",
  description: "Le téléski nautique, les lentilles de Cilaos, le vendeur de beignets, le tournoi de belote, le piège du concours de cuisine, le défi de la cultivatrice d'orchidées : créer une liste, lire un élément par son indice, parcourir une liste, ajouter ou retirer un élément.",
  problemes: [
    {
      tag: "Énigme 1 · Le téléski nautique",
      titre: "Remplir une liste",
      question: `Un téléski nautique offre 5 € de réduction par ami amené.<br>Le programme range les réductions pour 0, 1, 2 et 3 amis.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `k vaut 0, 1, 2, 3 : on ajoute 0, 5, 10, 15.<br>Le programme affiche <span class="big">[0, 5, 10, 15]</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "qcm", choix: ["[0, 5, 10, 15]", "[5, 10, 15, 20]", "[0, 5, 10, 15, 20]"], bonne: 0 },
      dessin: teleski,
    },
    {
      tag: "Énigme 2 · Les lentilles de Cilaos",
      titre: "Lire par l'indice",
      question: `Un producteur de lentilles de Cilaos note ses ventes en kilos.<br>S[0] est le lundi, S[1] le mardi, et ainsi de suite.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `En Python, le premier indice est 0.<br>S[0] = 25 (lundi) et S[3] = 22 (jeudi).<br>25 + 22 = <span class="big">47</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "courte", attendus: ["47", "47 kg"] },
      dessin: lentilles,
    },
    {
      tag: "Énigme 3 · Le vendeur de beignets",
      titre: "Parcourir une liste",
      question: `Un vendeur de beignets range ses ventes de 4 jours dans V.<br>La boucle passe sur chaque nombre de la liste.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `s ajoute chaque élément de V.<br>120 + 95 + 140 + 85 = <span class="big">440</span> beignets.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "qcm", choix: ["85", "440", "4"], bonne: 1 },
      dessin: beignets,
    },
    {
      tag: "Énigme 4 · Le tournoi de belote",
      titre: "Ajouter, retirer",
      question: `Un club de belote tient la liste des inscrits.<br>Dina s'inscrit, puis Bob se désiste.<br>len(J) donne le nombre d'éléments de J.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `3 inscrits, + Dina = 4, − Bob = 3.<br>Le programme affiche <span class="big">3</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: belote,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le concours de cuisine",
      sorte: "piege",
      question: `Un concours de cuisine range les notes du jury dans N.<br>Lina dit que N[1] est la première note : 14.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `La première note est N[0] = 14.<br>N[1] est la deuxième : le programme affiche <span class="big">17</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "courte", attendus: ["17"] },
      dessin: cuisine,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La cultivatrice d'orchidées",
      sorte: "defi",
      question: `Une cultivatrice d'orchidées a 5 parcelles carrées.<br>La parcelle k a k rangées de k orchidées.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `range(1, 6) donne k = 1 à 5 : R = [1, 4, 9, 16, 25].<br>sum(R) = <span class="big">55</span> orchidées.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "qcm", choix: ["15", "25", "55"], bonne: 2 },
      dessin: orchidees,
    },
  ],
};

export default problemes;
