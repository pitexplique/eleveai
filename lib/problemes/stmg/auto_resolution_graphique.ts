// Énigmes à projeter — STMG (1re), notion résoudre graphiquement
// (le péage de l'autoroute, l'atelier de tabourets, le cours du coton, le
// fumoir à poissons, piège du loueur de camping-cars, défi de l'imprimerie
// de faire-part). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l } from "../dessins-ecole";
import { repereXY, brisee } from "../dessins-1re";

const R1 = repereXY(6, 12, 0, 70, { px: 1, py: 10, ey: 20 });
const peage = svg("Le nombre de voitures par minute au péage, de 6 h à 12 h ; une ligne en pointillés à 40",
  R1.fond + l(R1.X(6), R1.Y(40), R1.X(12), R1.Y(40), C.rose, 3, "10 8") +
    brisee(R1, [[6, 10], [7, 40], [8, 60], [9, 30], [10, 20], [11, 40], [12, 50]], C.bleu) +
    t(R1.X(6) + 8, 24, "voitures par minute", C.pale, 17, "start") + t(462, R1.Y(0) - 10, "h", C.pale, 18, "end") +
    t(240, 400, `f(x)${NB}=${NB}40${NB}?`, C.rose, 26));

const R2 = repereXY(0, 10, -8, 12, { px: 1, py: 2, ex: 100, ey: 4 });
const tabourets = svg("Le bénéfice de l'atelier de tabourets, en centaines d'euros, pour x dizaines de tabourets ; la courbe coupe l'axe en 2 et en 8",
  R2.fond + R2.courbe((x) => -x * x + 10 * x - 16, 1, 9, C.bleu, 4) +
    t(R2.X(2) - 12, R2.Y(0) - 10, "2", C.pale, 17, "end") + t(R2.X(8) + 12, R2.Y(0) - 10, "8", C.pale, 17, "start") +
    t(R2.X(4), R2.Y(0) + 24, "4", C.pale, 17) + t(R2.X(6), R2.Y(0) + 24, "6", C.pale, 17) + t(R2.X(10), R2.Y(0) + 24, "10", C.pale, 17) +
    t(R2.X(0) + 8, 24, "bénéfice (centaines d'€)", C.pale, 17, "start") + t(462, R2.Y(0) - 10, "x", C.pale, 18, "end") +
    t(240, 400, `B(x)${NB}>${NB}0${NB}?`, C.rose, 26));

const R3 = repereXY(0, 12, 50, 90, { px: 1, py: 5, ey: 10 });
const coton = svg("Le prix du coton sur 12 mois : il monte jusqu'au mois 5, baisse jusqu'au mois 9, puis remonte",
  R3.fond + brisee(R3, [[0, 60], [2, 66], [5, 80], [7, 70], [9, 62], [12, 78]], C.bleu) +
    t(R3.X(0) + 8, 24, "prix (€ les 100 kg)", C.pale, 17, "start") + t(462, R3.Y(50) - 10, "mois", C.pale, 18, "end") +
    t(240, 400, `combien de mois de baisse${NB}?`, C.rose, 24));

const R4 = repereXY(0, 8, 0, 100, { px: 1, py: 10, ey: 20 });
const fumoir = svg("La température du fumoir en degrés selon le temps en heures ; une ligne en pointillés à 70 degrés",
  R4.fond + l(R4.X(0), R4.Y(70), R4.X(8), R4.Y(70), C.rose, 3, "10 8") +
    R4.courbe((x) => -5 * x * x + 40 * x + 10, 0, 8, C.bleu, 4) +
    t(R4.X(0) + 8, 24, "température (°C)", C.pale, 17, "start") + t(462, R4.Y(0) - 10, "h", C.pale, 18, "end") +
    t(240, 400, `T${NB}≥${NB}70 pendant combien d'heures${NB}?`, C.rose, 24));

const R5 = repereXY(0, 10, -8, 10, { px: 1, py: 2, ex: 2, ey: 4 });
const campingCars = svg("Le bénéfice du loueur de camping-cars, en milliers d'euros, selon le nombre x de camping-cars loués ; le sommet est au point (6 ; 9)",
  R5.fond + l(R5.X(6), R5.Y(9), R5.X(6), R5.Y(0), C.rose, 3, "8 6") +
    R5.courbe((x) => -x * x + 12 * x - 27, 2, 10, C.bleu, 4) + R5.point(6, 9, C.rose, 8) +
    t(R5.X(6), R5.Y(9) - 16, "9", C.rose, 22) +
    t(R5.X(0) + 8, 24, "bénéfice (milliers d'€)", C.pale, 17, "start") + t(462, R5.Y(0) - 10, "x", C.pale, 18, "end") +
    t(240, 400, `combien de camping-cars${NB}?`, C.rose, 24));

const R6 = repereXY(0, 6, 0, 40, { px: 1, py: 5, ey: 10 });
const fairePart = svg("La recette R et le coût C de l'imprimerie, en dizaines d'euros, pour x centaines de faire-part ; les courbes se coupent en x égale 1 et x égale 4",
  R6.fond + R6.courbe((x) => 5 * x, 0, 6, C.jaune, 4) + R6.courbe((x) => x * x + 4, 0, 6, C.bleu, 4) +
    R6.point(1, 5, C.rose, 7) + R6.point(4, 20, C.rose, 7) +
    t(R6.X(6) + 8, R6.Y(30) + 6, "R", C.jaune, 22, "start") + t(R6.X(6) + 8, R6.Y(40) + 18, "C", C.bleu, 22, "start") +
    t(R6.X(0) + 8, 24, "dizaines d'€", C.pale, 17, "start") +
    t(240, 400, `R(x)${NB}>${NB}C(x)${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_resolution_graphique",
  titre: "Énigmes de résolution graphique",
  description: "Le péage de l'autoroute, l'atelier de tabourets, le cours du coton, le fumoir à poissons, le piège du loueur de camping-cars, le défi de l'imprimerie de faire-part : résoudre f(x) = k, lire un signe, des variations, une inéquation, comparer deux courbes.",
  problemes: [
    {
      tag: "Énigme 1 · Le péage",
      titre: "Résoudre f(x) = k",
      question: `La courbe donne f(x), le nombre de voitures par minute au péage, à l'heure x.<br><br><b>À quelles heures</b> passe-t-il 40 voitures par minute ?`,
      reponse: `On part de 40 sur l'axe vertical.<br>On suit la ligne en pointillés et on note chaque point de la courbe.<br><span class="big">À 7 h et à 11 h</span>.<br>L'équation f(x) = 40 a deux solutions.`,
      consigne: "Résous f(x) = 40 à l'aide de la courbe.",
      verification: { type: "qcm", choix: ["8 h", "11 h seulement", "7 h et 11 h"], bonne: 2 },
      dessin: peage,
    },
    {
      tag: "Énigme 2 · L'atelier de tabourets",
      titre: "Le signe d'une fonction",
      question: `Un atelier fabrique des tabourets en bois.<br>La courbe donne son bénéfice B(x), pour x dizaines de tabourets.<br><br><b>À partir de combien de tabourets</b> le bénéfice devient-il positif ?`,
      reponse: `B(x) > 0 quand la courbe est au-dessus de l'axe.<br>Elle passe au-dessus en x = 2, et redescend en x = 8.<br>2 dizaines : <span class="big">20 tabourets</span>.`,
      consigne: "À partir de combien de tabourets B(x) > 0 ?",
      verification: { type: "courte", attendus: ["20"], unite: "tabourets" },
      dessin: tabourets,
    },
    {
      tag: "Énigme 3 · Le cours du coton",
      titre: "Lire des variations",
      question: `Le graphique montre le prix du coton sur 12 mois.<br><br><b>Pendant combien de mois</b> le prix baisse-t-il ?`,
      reponse: `Le prix monte du mois 0 au mois 5.<br>Il baisse du mois 5 au mois 9.<br>Puis il remonte.<br>9 − 5 = <span class="big">4 mois</span>.`,
      consigne: "Pendant combien de mois le prix baisse-t-il ?",
      verification: { type: "courte", attendus: ["4"], unite: "mois" },
      dessin: coton,
    },
    {
      tag: "Énigme 4 · Le fumoir à poissons",
      titre: "Résoudre une inéquation",
      question: `Un artisan fume des poissons.<br>La courbe donne la température du fumoir, heure par heure.<br>Le poisson cuit quand il fait au moins 70 °C.<br><br><b>Pendant combien d'heures</b> fait-il au moins 70 °C ?`,
      reponse: `On cherche T ≥ 70 : la courbe est sur ou au-dessus des pointillés.<br>C'est le cas de 2 h à 6 h.<br>6 − 2 = <span class="big">4 heures</span>.`,
      consigne: "Pendant combien d'heures T ≥ 70 ?",
      verification: { type: "courte", attendus: ["4"], unite: "heures" },
      dessin: fumoir,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le loueur de camping-cars",
      sorte: "piege",
      question: `Un loueur loue x camping-cars par semaine.<br>La courbe donne son bénéfice, en milliers d'euros.<br>Le sommet est marqué.<br><br><b>Combien de camping-cars</b> doit-il louer pour gagner le plus ?`,
      reponse: `Le sommet est au point (6 ; 9).<br>9, c'est le bénéfice : 9 000 €.<br>Le nombre de camping-cars, c'est l'abscisse : <span class="big">6 camping-cars</span>.`,
      consigne: "Pour combien de camping-cars le bénéfice est-il maximal ?",
      verification: { type: "qcm", choix: ["9 camping-cars", "6 camping-cars", "15 camping-cars"], bonne: 1 },
      dessin: campingCars,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'imprimerie de faire-part",
      sorte: "defi",
      question: `Une imprimerie fabrique x centaines de faire-part.<br>La droite R donne la recette, la courbe C le coût.<br>Elle gagne de l'argent quand la recette dépasse le coût.<br><br><b>Pour combien de faire-part</b> gagne-t-elle de l'argent ?`,
      reponse: `R(x) > C(x) quand la droite est au-dessus de la courbe.<br>C'est le cas entre les deux points où elles se coupent : x = 1 et x = 4.<br><span class="big">Entre 100 et 400 faire-part</span>.`,
      consigne: "Pour quelles valeurs de x a-t-on R(x) > C(x) ?",
      verification: { type: "qcm", choix: ["entre 100 et 400 faire-part", "plus de 400 faire-part", "moins de 100 faire-part"], bonne: 0 },
      dessin: fairePart,
    },
  ],
};

export default problemes;
