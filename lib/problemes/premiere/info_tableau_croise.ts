// Énigmes à projeter — première (sans spé maths), notion info_tableau_croise
// (l'auto-école, la cantine d'entreprise, l'animalerie, le parc d'attractions,
// piège des deux journaux, défi de l'hôtel vue sur mer). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { tableau } from "../dessins-2de";

const coul = (cible: [number, number][], rose: [number, number][] = []) => (i: number, j: number) =>
  cible.some(([a, b]) => a === i && b === j) ? C.jaune : rose.some(([a, b]) => a === i && b === j) ? C.rose : i === 0 || j === 0 ? C.pale : C.craie;

const autoecole = svg("Un tableau de 150 candidats au permis : boîte manuelle 60 réussis et 40 échecs ; automatique 35 réussis et 15 échecs",
  tableau(30, 60, [150, 100, 90, 80], 56, [["", "réussi", "échec", "total"], ["manuelle", 60, 40, 100], ["automatique", 35, 15, 50], ["total", 95, 55, 150]], coul([[2, 1]]), 20) +
    t(240, 385, `auto ET réussi${NB}?`, C.rose, 26));

const cantine = svg("Un tableau de menus à compléter : midi 24 végétariens, viande inconnue, total 80 ; soir végétariens inconnu, 70 viande ; total végétariens 54",
  tableau(40, 60, [130, 110, 90, 80], 56, [["", "végétarien", "viande", "total"], ["midi", 24, "?", 80], ["soir", "…", 70, "…"], ["total", 54, "…", "…"]], coul([], [[1, 2]]), 20) +
    t(240, 385, `combien de menus viande à midi${NB}?`, C.rose, 22));

const animalerie = svg("Une animalerie : 400 poissons, 70 % d'eau douce ; 30 poissons-clowns parmi ceux d'eau de mer",
  tableau(20, 60, [130, 110, 140, 60], 56, [["", "eau douce", "eau de mer", "total"], ["clowns", 0, 30, 30], ["autres", "…", "?", "…"], ["total", "…", "…", 400]], coul([], [[2, 2]]), 20) +
    t(240, 320, "70 % d'eau douce", C.craie, 22) + t(240, 385, `eau de mer, pas clown${NB}?`, C.rose, 24));

const parc = svg("Un parc d'attractions : 600 visiteurs, 240 enfants, 150 cartes annuelles dont 90 pour des enfants",
  tableau(30, 60, [120, 90, 100, 110], 56, [["", "enfants", "adultes", "total"], ["carte", 90, "…", 150], ["sans carte", "…", "?", "…"], ["total", 240, "…", 600]], coul([], [[2, 2]]), 20) +
    t(240, 385, `adultes sans carte${NB}?`, C.rose, 26));

const journaux = svg("Un tableau de 100 lecteurs : matin et soir 20 ; matin seul 28 ; soir seul 16 ; aucun 36",
  tableau(30, 60, [150, 100, 100, 70], 56, [["", "soir oui", "soir non", "total"], ["matin oui", 20, 28, 48], ["matin non", 16, 36, 52], ["total", 36, 64, 100]], coul([[1, 3], [3, 1]]), 20) +
    t(240, 320, "48 + 36 = 84 ?", C.pale, 22) + t(240, 385, `abonnés à au moins un${NB}?`, C.rose, 24));

const hotel = svg("Un hôtel de 80 chambres : 25 % avec vue sur mer, la moitié de celles-ci avec balcon, 30 balcons en tout",
  tableau(20, 60, [150, 100, 120, 70], 56, [["", "vue mer", "sans vue", "total"], ["balcon", "…", "…", 30], ["sans balcon", "…", "?", "…"], ["total", "…", "…", 80]], coul([], [[2, 2]]), 20) +
    t(240, 320, "25 % vue mer, dont la moitié avec balcon", C.craie, 18) + t(240, 385, `ni vue ni balcon${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "info_tableau_croise",
  titre: "Énigmes du tableau croisé",
  description: "L'auto-école, la cantine d'entreprise, l'animalerie, le parc d'attractions, le piège des deux journaux, le défi de l'hôtel vue sur mer : lire un effectif, compléter les marges et dresser un tableau croisé de deux caractères.",
  problemes: [
    {
      tag: "Énigme 1 · L'auto-école",
      titre: "Lire un effectif",
      question: `Une auto-école a présenté 150 candidats au permis, en boîte manuelle ou automatique.<br><br><b>Combien de candidats</b> en boîte automatique ont réussi ?`,
      reponse: `On lit la case au croisement de la ligne « automatique » et de la colonne « réussi ».<br><span class="big">35 candidats</span>, sur les 50 en boîte automatique.`,
      consigne: "D'après le tableau, combien de candidats en boîte automatique ont réussi ?",
      verification: { type: "courte", attendus: ["35"], unite: "candidats" },
      dessin: autoecole,
    },
    {
      tag: "Énigme 2 · La cantine",
      titre: "Compléter une case",
      question: `Une cantine d'entreprise a servi 80 menus à midi, dont 24 végétariens.<br><br><b>Combien de menus viande</b> a-t-elle servis à midi ?`,
      reponse: `Sur une ligne, les cases s'ajoutent pour donner le total : 24 + ? = 80.<br>Il y a <span class="big">56</span> menus viande à midi.`,
      consigne: "Ligne midi : 24 végétariens, total 80. Combien de menus viande ?",
      verification: { type: "qcm", choix: ["56", "46", "104"], bonne: 0 },
      dessin: cantine,
    },
    {
      tag: "Énigme 3 · L'animalerie",
      titre: "Dresser le tableau",
      question: `Une animalerie a 400 poissons. 70 % sont des poissons d'eau douce. Parmi les poissons d'eau de mer, 30 sont des poissons-clowns.<br><br><b>Combien</b> de poissons d'eau de mer ne sont pas des poissons-clowns ?`,
      reponse: `Eau de mer : 30 % de 400 = 120 poissons. On retire les clowns : 120 − 30.<br><span class="big">90 poissons</span>.`,
      consigne: "400 poissons, 70 % d'eau douce, 30 clowns en eau de mer : combien d'eau de mer ne sont pas des clowns ?",
      verification: { type: "courte", attendus: ["90"], unite: "poissons" },
      dessin: animalerie,
    },
    {
      tag: "Énigme 4 · Le parc d'attractions",
      titre: "Avec les marges",
      question: `Un jour, un parc d'attractions a reçu 600 visiteurs, dont 240 enfants. 150 visiteurs avaient une carte annuelle, dont 90 enfants.<br><br><b>Combien d'adultes</b> n'avaient pas de carte ?`,
      reponse: `Adultes : 600 − 240 = 360. Adultes avec carte : 150 − 90 = 60.<br>Adultes sans carte : 360 − 60 = <span class="big">300</span>.`,
      consigne: "600 visiteurs, 240 enfants, 150 cartes dont 90 enfants : combien d'adultes sans carte ?",
      verification: { type: "qcm", choix: ["210", "300", "270"], bonne: 1 },
      dessin: parc,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux journaux",
      sorte: "piege",
      question: `On a interrogé 100 personnes : 48 lisent le journal du matin, 36 celui du soir.<br><br><b>Combien</b> lisent au moins un des deux journaux ?`,
      reponse: `48 + 36 = 84 compte deux fois les 20 personnes qui lisent les deux !<br>20 + 28 + 16 = <span class="big">64</span>, ou 100 − 36 (ceux qui ne lisent aucun).`,
      consigne: "48 lisent le matin, 36 le soir, 20 les deux : combien lisent au moins un journal ?",
      verification: { type: "qcm", choix: ["84", "100", "64"], bonne: 2 },
      dessin: journaux,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'hôtel vue sur mer",
      sorte: "defi",
      question: `Un hôtel a 80 chambres. 25 % ont vue sur la mer, et la moitié de celles-ci ont un balcon. En tout, 30 chambres ont un balcon.<br><br><b>Combien de chambres</b> n'ont ni vue sur la mer ni balcon ?`,
      reponse: `Vue mer : 20 chambres, dont 10 avec balcon. Balcons sans vue : 30 − 10 = 20.<br>Sans vue : 80 − 20 = 60, dont 20 avec balcon : <span class="big">40 chambres</span> sans rien.`,
      consigne: "80 chambres, 25 % vue mer dont la moitié avec balcon, 30 balcons en tout : combien sans vue ni balcon ?",
      verification: { type: "courte", attendus: ["40"], unite: "chambres" },
      dessin: hotel,
    },
  ],
};

export default problemes;
