// Énigmes à projeter — STMG (1re), notion fréquences marginales et
// conditionnelles (le club de karaté, l'office de tourisme, la recyclerie, les
// vêtements en ligne dans la presse, piège de la boutique de thé, défi du
// curcuma de la Plaine des Grègues). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { frac } from "../outils";

/** Couleur des cellules : en-têtes en pâle, les cases utiles en jaune. */
const coul = (utiles: [number, number][]) => (i: number, j: number) =>
  utiles.some(([a, b]) => a === i && b === j) ? C.jaune : i === 0 || j === 0 ? C.pale : C.craie;

const karate = svg("Tableau croisé du club de karaté : enfants, 18 en compétition et 42 en loisir ; adultes, 6 et 14 ; 80 membres",
  tableau(5, 40, [120, 140, 100, 110], 60, [["", "compétition", "loisir", "total"], ["enfants", 18, 42, 60], ["adultes", 6, 14, 20], ["total", 24, 56, 80]],
    coul([[2, 3], [3, 3]]), 22) +
    t(240, 350, `fréquence des adultes${NB}?`, C.rose, 26));

const tourisme = svg("Tableau croisé de l'office de tourisme : Français, 90 brochures et 60 applis ; étrangers, 20 brochures et 30 applis ; 200 visiteurs",
  tableau(5, 40, [130, 120, 100, 120], 60, [["", "brochure", "appli", "total"], ["Français", 90, 60, 150], ["étrangers", 20, 30, 50], ["total", 110, 90, 200]],
    coul([[2, 2], [2, 3]]), 22) +
    t(240, 350, `parmi les étrangers : appli${NB}?`, C.rose, 26));

const recyclerie = svg("La recyclerie : 300 objets vendus, 120 meubles et 180 pièces de vaisselle ; 25 pour cent des meubles vendus le samedi",
  r(30, 40, 190, 150, C.jaune, 0.2, 3, 10) + t(125, 105, "120", C.jaune, 40) + t(125, 145, "meubles", C.craie, 22) +
    r(260, 40, 190, 150, C.bleu, 0.2, 3, 10) + t(355, 105, "180", C.bleu, 40) + t(355, 145, "vaisselle", C.craie, 22) +
    t(125, 240, "25 % le samedi", C.jaune, 24) +
    t(240, 300, "300 objets vendus", C.pale, 22) + t(240, 370, `meubles du samedi${NB}?`, C.rose, 26));

const presse = svg("Un titre de journal : 70 pour cent des acheteurs de vêtements en ligne ont moins de 35 ans",
  r(30, 60, 420, 200, C.pale, 0.12, 3, 6) + t(240, 110, "LE JOURNAL DU COMMERCE", C.pale, 20) +
    t(240, 170, "70 % des acheteurs de", C.craie, 28) + t(240, 210, "vêtements en ligne ont", C.craie, 28) +
    t(240, 250, `moins de 35${NB}ans`, C.craie, 28) +
    t(240, 350, `70 % de qui${NB}?`, C.rose, 28));

const the = svg("Tableau croisé de la boutique de thé : thé vert, 30 femmes et 20 hommes ; thé noir, 90 femmes et 60 hommes ; 200 clients",
  tableau(5, 40, [130, 120, 110, 110], 60, [["", "femmes", "hommes", "total"], ["thé vert", 30, 20, 50], ["thé noir", 90, 60, 150], ["total", 120, 80, 200]],
    coul([[1, 1], [3, 1]]), 22) +
    t(240, 350, `parmi les femmes : thé vert${NB}?`, C.rose, 25));

const curcuma = svg("Le curcuma de la Plaine des Grègues : 400 pots, 40 pour cent bio ; 75 pour cent des pots bio et 25 pour cent des non bio vendus au marché",
  t(240, 50, "400 pots de curcuma", C.craie, 26) +
    r(20, 80, 205, 130, C.jaune, 0.2, 3, 10) + t(122, 125, "40 % bio", C.jaune, 26) + t(122, 170, "75 % au marché", C.craie, 21) +
    r(255, 80, 205, 130, C.bleu, 0.2, 3, 10) + t(357, 125, "60 % non bio", C.bleu, 26) + t(357, 170, "25 % au marché", C.craie, 21) +
    t(240, 290, "au marché :", C.pale, 24) + t(240, 350, `part des pots bio${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "donnees_frequences",
  titre: "Énigmes des fréquences marginales et conditionnelles",
  description: "Le club de karaté, l'office de tourisme, la recyclerie, les vêtements en ligne dans la presse, le piège de la boutique de thé, le défi du curcuma de la Plaine des Grègues : fréquence marginale, fréquence conditionnelle, compléter un tableau, lire une phrase de journal.",
  problemes: [
    {
      tag: "Énigme 1 · Le club de karaté",
      titre: "Une fréquence marginale",
      question: `Un club de karaté compte 80 membres.<br>Le tableau les range par âge et par pratique.<br><br><b>Quelle est la fréquence</b> des adultes dans le club ?`,
      reponse: `20 adultes sur 80 membres.<br>${frac(20, 80)} = <span class="big">0,25</span>, soit 25 %.`,
      consigne: "20 adultes sur 80 membres : quelle fréquence ?",
      verification: { type: "courte", attendus: ["0,25", "0.25", "25%", "25 %", "1/4", "20/80"] },
      dessin: karate,
    },
    {
      tag: "Énigme 2 · L'office de tourisme",
      titre: "Une fréquence conditionnelle",
      question: `Un office de tourisme a reçu 200 visiteurs.<br>Chacun a pris une brochure ou utilisé l'appli.<br><br><b>Parmi les visiteurs étrangers</b>, quelle est la fréquence de ceux qui utilisent l'appli ?`,
      reponse: `On ne regarde que la ligne « étrangers » : 50 visiteurs.<br>30 utilisent l'appli : ${frac(30, 50)} = <span class="big">0,6</span>, soit 60 %.`,
      consigne: "Parmi les 50 étrangers, 30 utilisent l'appli : quelle fréquence ?",
      verification: { type: "qcm", choix: ["0,6", "0,15", "environ 0,33"], bonne: 0 },
      dessin: tourisme,
    },
    {
      tag: "Énigme 3 · La recyclerie",
      titre: "Compléter avec une fréquence",
      question: `Une recyclerie a vendu 300 objets ce mois-ci.<br>120 sont des meubles, 180 de la vaisselle.<br>25 % des meubles ont été vendus le samedi.<br><br><b>Combien de meubles</b> ont été vendus le samedi ?`,
      reponse: `25 % des meubles, pas des 300 objets.<br>0,25 × 120 = <span class="big">30 meubles</span>.`,
      consigne: "25 % de 120 meubles : combien ?",
      verification: { type: "courte", attendus: ["30"], unite: "meubles" },
      dessin: recyclerie,
    },
    {
      tag: "Énigme 4 · La phrase du journal",
      titre: "Lire une fréquence dans la presse",
      question: `Un journal titre : « 70 % des acheteurs de vêtements en ligne ont moins de 35 ans. »<br><br><b>Quelle phrase dit la même chose</b> ?<br>A. 70 % des moins de 35 ans achètent leurs vêtements en ligne.<br>B. Parmi les acheteurs en ligne, 70 % ont moins de 35 ans.<br>C. 70 % des Français achètent leurs vêtements en ligne.`,
      reponse: `Le « 70 % » se calcule <b>parmi les acheteurs en ligne</b>.<br>On ne sait rien sur l'ensemble des moins de 35 ans.<br><span class="big">La phrase B</span>.`,
      consigne: "Quelle phrase dit la même chose que le journal ?",
      verification: { type: "qcm", choix: ["A", "B", "C"], bonne: 1 },
      dessin: presse,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La boutique de thé",
      sorte: "piege",
      question: `Une boutique de thé a eu 200 clients.<br>Parmi les clients du thé vert, 60 % sont des femmes.<br>Lina : « Donc 60 % des femmes prennent du thé vert. »<br><br><b>Parmi les femmes</b>, quelle est la fréquence de celles qui prennent du thé vert ?`,
      reponse: `Lina inverse les deux groupes.<br>On regarde la colonne « femmes » : 120 femmes, dont 30 en thé vert.<br>${frac(30, 120)} = <span class="big">0,25</span>, soit 25 % (et pas 60 %).`,
      consigne: "Parmi les 120 femmes, 30 prennent du thé vert : quelle fréquence ?",
      verification: { type: "courte", attendus: ["0,25", "0.25", "25%", "25 %", "1/4", "30/120"] },
      dessin: the,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le curcuma de la Plaine des Grègues",
      sorte: "defi",
      question: `Un producteur de la Plaine des Grègues, à La Réunion, vend 400 pots de curcuma.<br>40 % des pots sont bio.<br>75 % des pots bio sont vendus au marché.<br>25 % des pots non bio sont vendus au marché.<br><br><b>Parmi les pots vendus au marché</b>, quelle part est bio ?`,
      reponse: `Bio : 0,4 × 400 = 160 pots, dont 0,75 × 160 = 120 au marché.<br>Non bio : 240 pots, dont 0,25 × 240 = 60 au marché.<br>Au marché : 180 pots, dont 120 bio.<br>${frac(120, 180)} = ${frac(2, 3)}, soit <span class="big">environ 0,67</span>.`,
      consigne: "Parmi les pots vendus au marché, quelle part est bio ?",
      verification: { type: "qcm", choix: ["0,75", "0,3", "environ 0,67"], bonne: 2 },
      dessin: curcuma,
    },
  ],
};

export default problemes;
