// Énigmes à projeter — STMG (1re), notion tableau croisé d'effectifs
// (le centre de contrôle technique, le centre de formation, le laboratoire
// d'analyses, le magasin de produits locaux, piège du port de plaisance, défi
// de l'agence de webdesign). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";

/** Couleur des cellules : en-têtes en pâle, la case cherchée en rose. */
const coul = (cible: [number, number][]) => (i: number, j: number) =>
  cible.some(([a, b]) => a === i && b === j) ? C.rose : i === 0 || j === 0 ? C.pale : C.craie;

const controle = svg("Tableau croisé du contrôle technique : essence, 120 acceptées et 30 contre-visites ; diesel, 70 acceptées et 40 contre-visites ; 260 voitures",
  tableau(5, 40, [120, 115, 145, 90], 60, [["", "acceptée", "contre-visite", "total"], ["essence", 120, 30, 150], ["diesel", 70, 40, 110], ["total", 190, 70, 260]],
    coul([[2, 2]]), 22) +
    t(240, 350, `diesel ET contre-visite${NB}?`, C.rose, 26));

const formation = svg("Tableau croisé du centre de formation : moins de 30 ans, 18 en bureautique et 12 en langues ; 30 ans et plus, 25 en bureautique et 35 en langues ; les totaux sont à trouver",
  tableau(5, 40, [140, 130, 110, 90], 60, [["", "bureautique", "langues", "total"], ["− de 30 ans", 18, 12, "?"], ["30 ans et +", 25, 35, "?"], ["total", "?", "?", "?"]],
    coul([[3, 2]]), 22) +
    t(240, 350, `total des langues${NB}?`, C.rose, 26));

const labo = svg("Tableau croisé du laboratoire : 200 prélèvements, 140 le matin, 150 de sang, 30 d'urine le matin ; sang l'après-midi à trouver",
  tableau(5, 40, [150, 100, 100, 120], 60, [["", "sang", "urine", "total"], ["matin", "", 30, 140], ["après-midi", "?", "", ""], ["total", 150, "", 200]],
    coul([[2, 1]]), 22) +
    t(240, 350, `sang l'après-midi${NB}?`, C.rose, 26));

const tickets = [["confiture", "carte"], ["tisane", "espèces"], ["confiture", "carte"], ["confiture", "espèces"], ["tisane", "carte"],
  ["confiture", "carte"], ["tisane", "carte"], ["confiture", "espèces"], ["tisane", "espèces"], ["confiture", "carte"]];
const locaux = svg("Les 10 tickets du magasin de produits locaux : confiture ou tisane, payé par carte ou en espèces ; un tableau croisé à remplir",
  tickets.map(([p, m], k) => {
    const x = 8 + (k % 5) * 94, y = 14 + Math.floor(k / 5) * 104;
    return r(x, y, 88, 90, C.pale, 0.12, 2, 8) + t(x + 44, y + 22, `n°${NB}${k + 1}`, C.pale, 16) +
      t(x + 43, y + 52, p, p === "confiture" ? C.jaune : C.bleu, 18) + t(x + 43, y + 77, m, C.craie, 18);
  }).join("") +
    tableau(80, 240, [120, 100, 100], 50, [["", "carte", "espèces"], ["confiture", "?", ""], ["tisane", "", ""]],
      (i, j) => (i === 1 && j === 1 ? C.rose : i === 0 ? C.craie : j === 0 ? (i === 1 ? C.jaune : C.bleu) : C.craie), 20));

const port = svg("Tableau croisé du port de plaisance : résidents, 60 voiliers et 40 bateaux à moteur ; visiteurs, 30 voiliers et 20 à moteur ; total général à trouver",
  tableau(5, 40, [130, 110, 120, 110], 60, [["", "voiliers", "à moteur", "total"], ["résidents", 60, 40, 100], ["visiteurs", 30, 20, 50], ["total", 90, 60, "?"]],
    coul([[3, 3]]), 22) +
    t(240, 350, `100 + 50 + 90 + 60${NB}?`, C.jaune, 24) + t(240, 395, `combien de bateaux${NB}?`, C.rose, 24));

const web = svg("Tableau croisé de l'agence de webdesign à compléter : 40 salariés, 15 graphistes, 30 en CDI, 8 graphistes en CDD",
  tableau(5, 40, [150, 100, 100, 120], 60, [["", "CDI", "CDD", "total"], ["graphistes", "", 8, 15], ["développeurs", "?", "", ""], ["total", 30, "", 40]],
    coul([[2, 1]]), 22) +
    t(240, 350, `développeurs en CDI${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "donnees_tableau_croise",
  titre: "Énigmes du tableau croisé d'effectifs",
  description: "Le centre de contrôle technique, le centre de formation, le laboratoire d'analyses, le magasin de produits locaux, le piège du port de plaisance, le défi de l'agence de webdesign : lire un effectif, calculer les totaux, compléter un tableau croisé, le dresser à partir de données brutes.",
  problemes: [
    {
      tag: "Énigme 1 · Le contrôle technique",
      titre: "Lire un effectif",
      question: `Un centre de contrôle technique a reçu 260 voitures ce mois-ci.<br>Le tableau les range par carburant et par résultat.<br><br><b>Combien de voitures diesel</b> doivent repasser en contre-visite ?`,
      reponse: `On croise la ligne « diesel » et la colonne « contre-visite ».<br><span class="big">40 voitures</span>.`,
      consigne: "Diesel ET contre-visite : combien de voitures ?",
      verification: { type: "courte", attendus: ["40"], unite: "voitures" },
      dessin: controle,
    },
    {
      tag: "Énigme 2 · Le centre de formation",
      titre: "Calculer un total",
      question: `Un centre de formation accueille des salariés.<br>Chacun suit un seul stage : bureautique ou langues.<br><br><b>Combien de stagiaires</b> suivent le stage de langues ?`,
      reponse: `On additionne la colonne « langues ».<br>12 + 35 = <span class="big">47 stagiaires</span>.`,
      consigne: "Combien de stagiaires en langues en tout ?",
      verification: { type: "courte", attendus: ["47"], unite: "stagiaires" },
      dessin: formation,
    },
    {
      tag: "Énigme 3 · Le laboratoire d'analyses",
      titre: "Compléter un tableau",
      question: `Un laboratoire d'analyses a fait 200 prélèvements aujourd'hui.<br>140 ont eu lieu le matin.<br>150 sont des prises de sang.<br>Le matin, il y a eu 30 prélèvements d'urine.<br><br><b>Combien de prises de sang</b> l'après-midi ?`,
      reponse: `Le matin : 140 − 30 = 110 prises de sang.<br>L'après-midi : 150 − 110 = <span class="big">40 prises de sang</span>.`,
      consigne: "Combien de prises de sang l'après-midi ?",
      verification: { type: "qcm", choix: ["40", "60", "120"], bonne: 0 },
      dessin: labo,
    },
    {
      tag: "Énigme 4 · Le magasin de produits locaux",
      titre: "Dresser le tableau",
      question: `Un magasin de produits locaux relit ses 10 tickets du matin.<br>Chaque ticket : un produit (confiture ou tisane) et un paiement (carte ou espèces).<br>Le gérant range les tickets dans un tableau croisé.<br><br><b>Quel nombre</b> va dans la case « confiture et carte » ?`,
      reponse: `On compte les tickets « confiture » payés par carte.<br>Les n° 1, 3, 6 et 10 : <span class="big">4 tickets</span>.`,
      consigne: "Combien de tickets « confiture » payés par carte ?",
      verification: { type: "courte", attendus: ["4"], unite: "tickets" },
      dessin: locaux,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le port de plaisance",
      sorte: "piege",
      question: `Le port de plaisance compte ses bateaux.<br>Léo additionne la colonne « total » et la ligne « total » :<br>100 + 50 + 90 + 60 = 300 bateaux.<br><br><b>Combien de bateaux</b> y a-t-il vraiment au port ?`,
      reponse: `Chaque bateau est compté deux fois par Léo : une fois en ligne, une fois en colonne.<br>100 + 50 = 150 et 90 + 60 = 150.<br><span class="big">150 bateaux</span>.`,
      consigne: "Combien de bateaux au port ?",
      verification: { type: "qcm", choix: ["300", "150", "250"], bonne: 1 },
      dessin: port,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'agence de webdesign",
      sorte: "defi",
      question: `Une agence de webdesign a 40 salariés : des graphistes et des développeurs.<br>15 salariés sont graphistes.<br>30 salariés sont en CDI, les autres en CDD.<br>8 graphistes sont en CDD.<br><br><b>Combien de développeurs</b> sont en CDI ?`,
      reponse: `Graphistes en CDI : 15 − 8 = 7.<br>Tous les CDI : 30, donc développeurs en CDI : 30 − 7 = <span class="big">23</span>.`,
      consigne: "Combien de développeurs en CDI ?",
      verification: { type: "qcm", choix: ["7", "25", "23"], bonne: 2 },
      dessin: web,
    },
  ],
};

export default problemes;
