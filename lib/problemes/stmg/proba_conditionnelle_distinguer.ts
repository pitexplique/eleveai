// Énigmes à projeter — STMG (1re), notion « ne pas confondre les probabilités
// conditionnelles » (la patinoire, le centre de thalasso, le chantier naval,
// le logiciel anti-fraude d'un site de vente, piège de la trieuse d'œufs,
// défi de la location de bateaux). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, r, svg, t } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { ind } from "../dessins-tle";

const coul = (rose: [number, number][]) => (i: number, j: number) =>
  rose.some(([a, b]) => a === i && b === j) ? C.rose : i === 0 || j === 0 ? C.pale : C.craie;

const patinoire = svg("Patinoire : parmi ceux qui louent des patins, 30 % prennent un casque ; L : loue des patins, K : prend un casque",
  r(40, 45, 400, 150, C.bleu, 0.12, 3, 12) +
    t(240, 105, "Parmi ceux qui louent des patins,", C.craie, 23) + t(240, 150, "30 % prennent un casque.", C.craie, 23) +
    t(240, 245, "L : loue des patins · K : prend un casque", C.pale, 20) +
    t(240, 290, `P(L ∩ K)${NB}? · ${ind("P", "L", "(K)")}${NB}? · ${ind("P", "K", "(L)")}${NB}?`, C.bleu, 24) +
    t(240, 370, `quelle notation${NB}?`, C.rose, 28));

const thalasso = svg("Curistes de la thalasso : femmes 60 avec enveloppement d'algues, 40 sans ; hommes 30 avec, 70 sans ; 200 curistes",
  tableau(25, 50, [120, 110, 110, 90], 55, [["", "algues", "sans", "total"], ["femme", 60, 40, 100], ["homme", 30, 70, 100], ["total", 90, 110, 200]], coul([[1, 1], [3, 3]]), 21) +
    t(240, 340, `femme ET algues${NB}?`, C.rose, 26));

const chantier = svg("Chantier naval : A : la coque doit être repeinte, B : le bateau est un voilier ; P indice B de A égale 0,7",
  r(90, 55, 300, 110, C.bleu, 0.15, 3, 10) + t(240, 130, `${ind("P", "B", "(A)")} = 0,7`, C.craie, 40) +
    t(240, 225, "A : la coque doit être repeinte", C.pale, 22) + t(240, 260, "B : le bateau est un voilier", C.pale, 22) +
    t(240, 350, `quelle phrase${NB}?`, C.rose, 28));

const fraude = svg("Logiciel anti-fraude : 50 commandes frauduleuses, 45 bloquées ; 950 commandes normales, 38 bloquées ; 1 000 commandes",
  tableau(25, 50, [120, 110, 130, 80], 55, [["", "bloquée", "pas bloquée", "total"], ["fraude", 45, 5, 50], ["normale", 38, 912, 950], ["total", 83, 917, `1${NB}000`]], coul([[2, 1], [2, 3]]), 20) +
    t(240, 320, "faux positif : une commande normale bloquée", C.pale, 19) +
    t(240, 380, `commande normale${NB}: bloquée${NB}?`, C.rose, 24));

const oeufs = svg("Trieuse d'œufs : 20 œufs fêlés, elle sonne pour 19 ; 980 bons, elle sonne pour 49 ; elle sonne 68 fois sur 1 000",
  tableau(25, 50, [100, 100, 150, 90], 55, [["", "sonne", "ne sonne pas", "total"], ["fêlé", 19, 1, 20], ["bon", 49, 931, 980], ["total", 68, 932, `1${NB}000`]], coul([]), 20) +
    t(240, 320, "Léo : « 19 ÷ 20 = 0,95 »", C.pale, 23) +
    t(240, 375, `elle sonne${NB}: œuf fêlé${NB}?`, C.rose, 25));

const bateaux = svg("Location de bateaux : 400 clients, 25 % ont le permis ; parmi eux 60 % louent un bateau à moteur ; 150 bateaux à moteur loués",
  r(30, 40, 420, 210, C.craie, 0.04, 3, 12) +
    t(240, 90, "400 clients · 25 % ont le permis", C.craie, 22) +
    t(240, 145, "avec permis : 60 % louent à moteur", C.bleu, 22) +
    t(240, 200, "en tout : 150 bateaux à moteur", C.craie, 22) +
    t(240, 330, "client avec un bateau à moteur :", C.pale, 22) + t(240, 375, `permis${NB}?`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "proba_conditionnelle_distinguer",
  titre: "Énigmes : ne pas confondre les probabilités conditionnelles",
  description: "La patinoire, le centre de thalasso, le chantier naval, le logiciel anti-fraude, le piège de la trieuse d'œufs, le défi de la location de bateaux : distinguer P(A ∩ B), P_A(B) et P_B(A), les dire par une phrase, lire un faux positif.",
  problemes: [
    {
      tag: "Énigme 1 · La patinoire",
      titre: "Choisir la bonne notation",
      question: `À la patinoire, parmi les clients qui louent des patins, 30 % prennent un casque.<br>L : « il loue des patins ». K : « il prend un casque ».<br><br><b>Quelle notation vaut 0,3</b> ?`,
      reponse: `« Parmi ceux qui louent des patins » : on sait déjà L.<br>La lettre connue se met en bas : <span class="big">P<sub>L</sub>(K) = 0,3</span>.`,
      consigne: "Quelle notation vaut 0,3 ?",
      verification: { type: "qcm", choix: ["P(L ∩ K)", "P_L(K)", "P_K(L)"], bonne: 1 },
      dessin: patinoire,
    },
    {
      tag: "Énigme 2 · Le centre de thalasso",
      titre: "« Et » n'est pas « sachant que »",
      question: `Un centre de thalasso a 200 curistes.<br>On choisit un curiste au hasard.<br><br><b>Quelle est la probabilité</b> que ce soit une femme ET qu'elle prenne l'enveloppement d'algues ?`,
      reponse: `« Et » : on garde tous les curistes, 200.<br>60 sont des femmes avec algues : 60 ÷ 200 = <span class="big">0,3</span>.<br>À ne pas confondre avec P<sub>F</sub>(A) = 60 ÷ 100 = 0,6.`,
      consigne: "Probabilité : une femme ET l'enveloppement d'algues ?",
      verification: { type: "courte", attendus: ["0,3", "0.3", "3/10", "30 %", "30%", "60/200"] },
      dessin: thalasso,
    },
    {
      tag: "Énigme 3 · Le chantier naval",
      titre: "Dire la probabilité par une phrase",
      question: `Un chantier naval répare des bateaux.<br>A : « la coque doit être repeinte ». B : « le bateau est un voilier ».<br>On sait que P<sub>B</sub>(A) = 0,7.<br><br><b>Quelle phrase dit la même chose</b> ?`,
      reponse: `La lettre en bas, B, c'est ce que l'on sait : c'est un voilier.<br><span class="big">Parmi les voiliers, 70 % ont la coque à repeindre</span>.`,
      consigne: "Quelle phrase dit la même chose que P_B(A) = 0,7 ?",
      verification: { type: "qcm", choix: ["70 % des coques à repeindre sont des voiliers", "70 % des bateaux sont des voiliers à repeindre", "parmi les voiliers, 70 % ont la coque à repeindre"], bonne: 2 },
      dessin: chantier,
    },
    {
      tag: "Énigme 4 · Le logiciel anti-fraude",
      titre: "Le faux positif",
      question: `Un site de vente en ligne a un logiciel anti-fraude.<br>Sur 1 000 commandes, 50 sont des fraudes.<br>Le logiciel bloque 45 fraudes et 38 commandes normales.<br><br>On choisit une commande normale.<br><b>Quelle est la probabilité</b> qu'elle soit bloquée ?`,
      reponse: `On sait qu'elle est normale : ligne « normale », 950 commandes.<br>38 sont bloquées : 38 ÷ 950 = <span class="big">0,04</span>.<br>C'est le taux de faux positifs : 4 %.`,
      consigne: "Commande normale : probabilité qu'elle soit bloquée ?",
      verification: { type: "courte", attendus: ["0,04", "0.04", "4 %", "4%", "1/25", "38/950"] },
      dessin: fraude,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La trieuse d'œufs",
      sorte: "piege",
      question: `Une trieuse d'œufs sonne quand elle voit un œuf fêlé.<br>Sur 1 000 œufs, 20 sont fêlés. Elle sonne pour 19 d'entre eux.<br>Elle sonne aussi pour 49 bons œufs.<br>Léo : « elle sonne, donc c'est fêlé à 0,95 ».<br><br><b>Elle sonne : quelle est la probabilité</b> que l'œuf soit fêlé ?`,
      reponse: `On sait qu'elle sonne : colonne « sonne », 68 œufs.<br>19 sont fêlés : 19 ÷ 68 ≈ <span class="big">0,28</span>.<br>Léo a calculé l'inverse : « sonne sachant fêlé ».`,
      consigne: "Elle sonne : probabilité que l'œuf soit fêlé ?",
      verification: { type: "qcm", choix: ["environ 0,28", "0,95", "0,019"], bonne: 0 },
      dessin: oeufs,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La location de bateaux",
      sorte: "defi",
      question: `Une agence de location de bateaux a 400 clients. 25 % ont le permis bateau.<br>Parmi ceux qui ont le permis, 60 % louent un bateau à moteur.<br>En tout, 150 clients louent un bateau à moteur.<br><br>On choisit un client qui loue un bateau à moteur.<br><b>Quelle est la probabilité</b> qu'il ait le permis ?`,
      reponse: `Avec permis : 400 × 0,25 = 100 clients. Avec permis et moteur : 100 × 0,6 = 60.<br>Parmi les 150 bateaux à moteur : 60 ÷ 150 = <span class="big">0,4</span>.<br>Ce n'est pas 0,6 : on ne sait pas la même chose.`,
      consigne: "Client avec un bateau à moteur : probabilité qu'il ait le permis ?",
      verification: { type: "courte", attendus: ["0,4", "0.4", "2/5", "40 %", "40%", "60/150"] },
      dessin: bateaux,
    },
  ],
};

export default problemes;
