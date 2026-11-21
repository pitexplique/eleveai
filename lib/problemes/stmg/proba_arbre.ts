// Énigmes à projeter — STMG (1re), notion arbre de probabilités : construire
// (le vendeur de pergolas, le bureau de change, le loueur de tentes de
// réception, le magasin de matériel de camping, piège de l'éditeur de logiciels
// de caisse, défi du producteur de pommes de terre). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, r, svg, t } from "../dessins-ecole";
import { arbre2 } from "../dessins-2de";
import { ind } from "../dessins-tle";

const pergolas = svg("Arbre du vendeur de pergolas : P la pose avec 0,6 ; la branche de P vers M, la motorisation, porte un point d'interrogation",
  arbre2([["P", "0,6"], ["P̄", "0,4"]], [[["M", "?"], ["M̄", "…"]], [["M", "…"], ["M̄", "…"]]]) +
    t(240, 395, `branche P → M${NB}?`, C.rose, 28));

const change = svg("Arbre du bureau de change : D, changer des dollars, avec 0,35 ; la branche non D porte un point d'interrogation",
  arbre2([["D", "0,35"], ["D̄", "?"]], [[["R", "0,8"], ["R̄", "0,2"]], [["R", "0,5"], ["R̄", "0,5"]]]) +
    t(240, 395, `branche D̄${NB}?`, C.rose, 28));

const tentes = svg("Arbre du loueur de tentes de réception : T tables 0,7 puis C chaises 0,4 ; sans tables 0,3 puis chaises 0,9",
  arbre2([["T", "0,7"], ["T̄", "0,3"]], [[["C", "0,4"], ["C̄", "0,6"]], [["C", "0,9"], ["C̄", "0,1"]]]) +
    t(240, 395, `que veut dire 0,4${NB}?`, C.rose, 26));

const camping = svg("Matériel de camping : 500 clients, 200 achètent une tente T, 50 d'entre eux un réchaud R ; arbre avec un point d'interrogation sur la branche T vers R",
  arbre2([["T", "0,4"], ["T̄", "0,6"]], [[["R", "?"], ["R̄", "…"]], [["R", "…"], ["R̄", "…"]]], { yb: 300 }) +
    t(240, 355, "500 clients · 200 tentes · 50 tentes + réchaud", C.pale, 18) +
    t(240, 400, `branche T → R${NB}?`, C.rose, 26));

const caisse = svg("Logiciels de caisse : A abonnement annuel 0,5 ; 20 % de tous les clients prennent l'annuel et la formation F ; Mia écrit 0,2 sur la branche A vers F",
  arbre2([["A", "0,5"], ["Ā", "0,5"]], [[["F", "0,2 ?"], ["F̄", "…"]], [["F", "…"], ["F̄", "…"]]], { yb: 300 }) +
    t(240, 355, "20 % de TOUS les clients : A et F", C.pale, 20) +
    t(240, 400, `branche A → F${NB}?`, C.rose, 26));

const patates = svg("Pommes de terre : H, parcelle du haut, 0,3 ; P de H inter T égale 0,12 ; P de T égale 0,33",
  r(40, 40, 400, 200, C.craie, 0.04, 3, 12) +
    t(240, 95, "H : parcelle du haut · T : tachée", C.pale, 21) +
    t(240, 145, "P(H) = 0,3 · P(H ∩ T) = 0,12", C.craie, 24) +
    t(240, 200, "P(T) = 0,33", C.craie, 24) +
    t(240, 340, `${ind("P", "H̄", "(T)")}${NB}?`, C.rose, 34));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "proba_arbre",
  titre: "Énigmes de l'arbre de probabilités : construire",
  description: "Le vendeur de pergolas, le bureau de change, le loueur de tentes de réception, le magasin de matériel de camping, le piège de l'éditeur de logiciels de caisse, le défi du producteur de pommes de terre : construire un arbre pondéré, placer et compléter les branches, lire une branche comme une probabilité conditionnelle.",
  problemes: [
    {
      tag: "Énigme 1 · Le vendeur de pergolas",
      titre: "Placer une branche",
      question: `60 % des clients d'un vendeur de pergolas prennent la pose (P).<br>Parmi eux, 30 % prennent aussi la motorisation (M).<br><br><b>Quel nombre</b> va sur la branche P → M ?`,
      reponse: `« Parmi eux » : on part du nœud P.<br>La branche P → M porte <span class="big">0,3</span>.<br>0,6 × 0,3 = 0,18, c'est le chemin entier, pas la branche.`,
      consigne: "Quel nombre va sur la branche P → M ?",
      verification: { type: "qcm", choix: ["0,6", "0,18", "0,3"], bonne: 2 },
      dessin: pergolas,
    },
    {
      tag: "Énigme 2 · Le bureau de change",
      titre: "Les branches d'un nœud font 1",
      question: `Dans un bureau de change, 35 % des clients changent des dollars (D).<br><br><b>Quel nombre</b> va sur la branche D̄ ?`,
      reponse: `Les branches qui partent d'un même nœud font 1 en tout.<br>1 − 0,35 = <span class="big">0,65</span>.`,
      consigne: "Quel nombre va sur la branche D̄ ?",
      verification: { type: "courte", attendus: ["0,65", "0.65", "65 %", "65%"] },
      dessin: change,
    },
    {
      tag: "Énigme 3 · Les tentes de réception",
      titre: "Lire une branche",
      question: `Un loueur de tentes de réception fait un arbre.<br>T : « le client loue des tables ». C : « il loue des chaises ».<br>La branche T → C porte 0,4.<br><br><b>Que veut dire ce 0,4</b> ?`,
      reponse: `Une branche du 2e niveau, c'est « sachant » le nœud d'où elle part.<br><span class="big">Parmi les clients qui louent des tables, 40 % louent des chaises</span> : P<sub>T</sub>(C) = 0,4.`,
      consigne: "Que veut dire le 0,4 de la branche T → C ?",
      verification: { type: "qcm", choix: ["parmi ceux qui louent des tables, 40 % louent des chaises", "40 % des clients louent des tables et des chaises", "parmi ceux qui louent des chaises, 40 % louent des tables"], bonne: 0 },
      dessin: tentes,
    },
    {
      tag: "Énigme 4 · Le matériel de camping",
      titre: "D'un effectif à une branche",
      question: `Un magasin de matériel de camping a 500 clients.<br>200 achètent une tente (T).<br>50 de ces 200 clients achètent aussi un réchaud (R).<br><br><b>Quel nombre</b> va sur la branche T → R ?`,
      reponse: `On part du nœud T : on divise par les 200 clients à tente.<br>50 ÷ 200 = <span class="big">0,25</span>.`,
      consigne: "Quel nombre va sur la branche T → R ?",
      verification: { type: "courte", attendus: ["0,25", "0.25", "1/4", "25 %", "25%"] },
      dessin: camping,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'éditeur de logiciels de caisse",
      sorte: "piege",
      question: `Un éditeur de logiciels de caisse : 50 % des clients prennent l'abonnement annuel (A).<br>20 % de TOUS les clients prennent l'annuel ET la formation (F).<br>Mia écrit 0,2 sur la branche A → F.<br><br><b>Quel nombre</b> faut-il y mettre ?`,
      reponse: `0,2, c'est le chemin entier : P(A ∩ F).<br>La branche vaut P<sub>A</sub>(F) = 0,2 ÷ 0,5 = <span class="big">0,4</span>.<br>Vérification : 0,5 × 0,4 = 0,2.`,
      consigne: "Quel nombre faut-il mettre sur la branche A → F ?",
      verification: { type: "qcm", choix: ["0,2", "0,4", "0,1"], bonne: 1 },
      dessin: caisse,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le producteur de pommes de terre",
      sorte: "defi",
      question: `Un producteur de pommes de terre a deux parcelles.<br>30 % des pommes de terre viennent du haut (H).<br>12 % de toutes les pommes de terre viennent du haut ET sont tachées (T).<br>En tout, 33 % sont tachées.<br><br><b>Quel nombre</b> va sur la branche H̄ → T ?`,
      reponse: `Tachées venant du bas : 0,33 − 0,12 = 0,21.<br>Le bas, c'est 1 − 0,3 = 0,7.<br>La branche : 0,21 ÷ 0,7 = <span class="big">0,3</span>.`,
      consigne: "Quel nombre va sur la branche H̄ → T ?",
      verification: { type: "courte", attendus: ["0,3", "0.3", "3/10", "30 %", "30%"] },
      dessin: patates,
    },
  ],
};

export default problemes;
