// Énigmes à projeter — STMG (1re), notion lire des données chiffrées
// (les chambres d'hôtes de Salazie, les paiements du bureau de tabac,
// l'attente à la préfecture, les commandes du restaurant de sushis, piège des
// deux pharmacies, défi des deux drives). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, o } from "../dessins-ecole";
import { repereXY, barre, boite, secteur, dansSecteur } from "../dessins-1re";

const R1 = repereXY(0, 6, 0, 80, { px: 1, py: 10, ex: 100, ey: 20 });
const mois = ["janv.", "févr.", "mars", "avril", "mai", "juin"];
const nuitees = [40, 30, 50, 60, 70, 50];
const salazie = svg("Les nuitées des chambres d'hôtes de Salazie de janvier à juin : 40, 30, 50, 60, 70, 50",
  R1.fond + nuitees.map((v, k) => barre(R1, k + 0.15, 0.7, v, k < 3 ? C.jaune : C.bleu)).join("") +
    mois.map((m, k) => t(R1.X(k + 0.5), R1.Y(0) + 24, m, C.pale, 16)).join("") +
    t(R1.X(0) + 8, 24, "nuitées", C.pale, 17, "start") +
    t(240, 400, `janvier + février + mars${NB}?`, C.rose, 24));

const [ax, ay] = dansSecteur(240, 200, 85, 0, 216), [bx, by] = dansSecteur(240, 200, 95, 216, 306), [cx, cy] = dansSecteur(240, 200, 100, 306, 360);
const tabac = svg("Les 800 paiements du bureau de tabac : carte 60 pour cent, espèces 25 pour cent, téléphone 15 pour cent",
  secteur(240, 200, 150, 0, 216, C.bleu) + secteur(240, 200, 150, 216, 306, C.jaune) + secteur(240, 200, 150, 306, 360, C.rose) +
    t(ax, ay, "carte 60 %", C.craie, 20) + t(bx, by, "espèces", C.craie, 19) + t(bx, by + 24, "25 %", C.craie, 19) +
    t(cx, cy, "tél.", C.craie, 18) + t(cx, cy + 22, "15 %", C.craie, 18) +
    t(240, 30, "800 paiements", C.pale, 22) + t(240, 400, `espèces${NB}?`, C.rose, 26));

const R3 = repereXY(0, 40, 0, 1, { gx: 70, gy: 40, gl: 370, gh: 250, px: 5, ex: 5, py: 1, ey: 1, quadrillage: false });
const fond3 = R3.fond.replace(/<text[^>]*text-anchor="end">1<\/text>/, "").replace(/<text[^>]*>0<\/text>/, "");
const prefecture = svg("L'attente au guichet de la préfecture, en minutes : minimum 2, premier quartile 6, médiane 10, troisième quartile 18, maximum 40",
  fond3 + boite(R3, 170, [2, 6, 10, 18, 40], C.bleu, 60) +
    t(R3.X(40), R3.Y(0) + 46, "minutes", C.pale, 17, "end") + t(240, 405, `75 % attendent au plus${NB}?`, C.rose, 24));

const sushis = svg("Les commandes du restaurant de sushis : 30 pour cent de plateaux ; quel angle pour ce secteur ?",
  o(240, 200, 150, C.craie, 0, 3) + secteur(240, 200, 150, 0, 108, C.jaune) +
    t(310, 160, "30 %", C.craie, 22) + t(310, 186, "plateaux", C.craie, 18) +
    t(240, 30, "360° pour 100 %", C.pale, 22) + t(240, 400, `angle${NB}?`, C.rose, 26));

const pharmacies = svg("Deux pharmacies : A, 200 ventes dont 30 pour cent de crèmes solaires ; B, 500 ventes dont 20 pour cent",
  o(130, 190, 70, C.craie, 0, 3) + secteur(130, 190, 70, 0, 108, C.jaune) + o(340, 190, 115, C.craie, 0, 3) + secteur(340, 190, 115, 0, 72, C.jaune) +
    t(130, 90, "A : 200 ventes", C.pale, 20) + t(340, 52, "B : 500 ventes", C.pale, 20) +
    t(130, 300, "30 % solaires", C.jaune, 19) + t(340, 340, "20 % solaires", C.jaune, 19) +
    t(240, 400, `qui en vend le plus${NB}?`, C.rose, 24));

const R6 = repereXY(0, 20, 0, 1, { gx: 70, gy: 40, gl: 370, gh: 250, px: 1, ex: 2, py: 1, ey: 1, quadrillage: false });
const fond6 = R6.fond.replace(/<text[^>]*text-anchor="end">1<\/text>/, "").replace(/<text[^>]*>0<\/text>/, "");
const drives = svg("Deux drives : Nord de 3 à 20 minutes, boîte de 5 à 12, médiane 8 ; Sud de 4 à 15 minutes, boîte de 7 à 10, médiane 9",
  fond6 + boite(R6, 110, [3, 5, 8, 12, 20], C.bleu) + boite(R6, 220, [4, 7, 9, 10, 15], C.jaune) +
    t(R6.X(0) + 10, 82, "Nord", C.bleu, 20, "start") + t(R6.X(0) + 10, 192, "Sud", C.jaune, 20, "start") +
    t(R6.X(20), R6.Y(0) + 46, "minutes", C.pale, 17, "end") + t(240, 405, `quelle phrase est sûre${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_donnees_graphiques",
  titre: "Énigmes de lecture de données chiffrées",
  description: "Les chambres d'hôtes de Salazie, les paiements du bureau de tabac, l'attente à la préfecture, les commandes du restaurant de sushis, le piège des deux pharmacies, le défi des deux drives : lire un diagramme en barres, un diagramme circulaire, une boîte à moustaches, passer des données au graphique.",
  problemes: [
    {
      tag: "Énigme 1 · Les chambres d'hôtes",
      titre: "Lire un diagramme en barres",
      question: `Des chambres d'hôtes de Salazie, à La Réunion, comptent leurs nuitées chaque mois.<br><br><b>Combien de nuitées</b> au premier trimestre (janvier, février, mars) ?`,
      reponse: `On lit le haut des trois barres jaunes.<br>40 + 30 + 50 = <span class="big">120 nuitées</span>.`,
      consigne: "Combien de nuitées de janvier à mars ?",
      verification: { type: "courte", attendus: ["120"], unite: "nuitées" },
      dessin: salazie,
    },
    {
      tag: "Énigme 2 · Le bureau de tabac",
      titre: "Lire un diagramme circulaire",
      question: `Un bureau de tabac a reçu 800 paiements cette semaine.<br>Le diagramme montre comment les clients ont payé.<br><br><b>Combien de paiements</b> en espèces ?`,
      reponse: `Les espèces font 25 %, soit un quart.<br>800 ÷ 4 = <span class="big">200 paiements</span>.`,
      consigne: "25 % de 800 paiements. Combien ?",
      verification: { type: "courte", attendus: ["200"], unite: "paiements" },
      dessin: tabac,
    },
    {
      tag: "Énigme 3 · La préfecture",
      titre: "Lire une boîte à moustaches",
      question: `La boîte à moustaches résume l'attente au guichet d'une préfecture, en minutes.<br><br><b>75 % des usagers</b> attendent au plus combien de minutes ?`,
      reponse: `Le bord droit de la boîte est le troisième quartile Q3.<br>Au moins 75 % des valeurs sont inférieures ou égales à Q3.<br>Q3 = <span class="big">18 minutes</span>.`,
      consigne: "Au moins 75 % attendent au plus combien de minutes ?",
      verification: { type: "qcm", choix: ["18 min", "10 min", "40 min"], bonne: 0 },
      dessin: prefecture,
    },
    {
      tag: "Énigme 4 · Le restaurant de sushis",
      titre: "Des données au graphique",
      question: `Dans un restaurant de sushis, 30 % des commandes sont des plateaux.<br>Le gérant fait un diagramme circulaire.<br>Le disque entier fait 360°.<br><br><b>Quel angle</b> pour le secteur des plateaux ?`,
      reponse: `30 % de 360°.<br>0,30 × 360 = <span class="big">108°</span>.`,
      consigne: "30 % de 360°. Quel angle ?",
      verification: { type: "courte", attendus: ["108"], unite: "°" },
      dessin: sushis,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux pharmacies",
      sorte: "piege",
      question: `La pharmacie A a fait 200 ventes : 30 % sont des crèmes solaires.<br>La pharmacie B a fait 500 ventes : 20 % sont des crèmes solaires.<br>Sam : « A en vend plus, 30 % c'est plus que 20 %. »<br><br><b>Qui a vendu le plus</b> de crèmes solaires ?`,
      reponse: `Un pourcentage dépend du total.<br>A : 30 % de 200 = 60 crèmes.<br>B : 20 % de 500 = 100 crèmes.<br><span class="big">La pharmacie B</span>.`,
      consigne: "30 % de 200 ou 20 % de 500 : qui vend le plus ?",
      verification: { type: "qcm", choix: ["la pharmacie A", "la pharmacie B", "autant"], bonne: 1 },
      dessin: pharmacies,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux drives",
      sorte: "defi",
      question: `Deux drives de supermarché mesurent le temps de préparation des commandes, en minutes.<br><br><b>Quelle phrase est sûre</b> ?<br>A. Le Nord est toujours plus rapide.<br>B. Au Sud, aucune commande ne prend plus de 12 min.<br>C. Au Sud, au moins 75 % des commandes sont prêtes en 10 min ou moins.`,
      reponse: `A est fausse : le maximum du Nord (20 min) dépasse celui du Sud.<br>B est fausse : le maximum du Sud vaut 15 min.<br>C est sûre : Q3 du Sud vaut 10 min.<br><span class="big">La phrase C</span>.`,
      consigne: "Quelle phrase est sûre ?",
      verification: { type: "qcm", choix: ["A", "B", "C"], bonne: 2 },
      dessin: drives,
    },
  ],
};

export default problemes;
