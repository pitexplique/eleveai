// Énigmes à projeter — STMG (1re), notion taux de variation et sécante
// (l'application de réservation de restaurants, la cressonnière, le camion de
// ciment, le fabricant de sacs à dos, piège des doudounes, défi des piscines
// hors-sol). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const appli = svg("L'application de réservation de restaurants : 300 restaurants au mois 2, 700 au mois 6 ; le taux de variation ?",
  r(50, 70, 170, 110, C.bleu, 0.15, 3, 10) + r(260, 70, 170, 110, C.jaune, 0.2, 3, 10) +
    t(135, 115, "mois 2", C.pale, 22) + t(135, 155, "300", C.craie, 30) +
    t(345, 115, "mois 6", C.pale, 22) + t(345, 155, "700", C.craie, 30) +
    t(240, 270, "restaurants inscrits", C.pale, 24) + t(240, 350, `taux de variation${NB}?`, C.rose, 28));

const R2 = repereXY(0, 5, 0, 280, { px: 1, py: 40, ey: 80 });
const cresson = svg("La cressonnière : la récolte cumulée en kilos selon les semaines ; A (1 ; 90) et B (4 ; 240) ; la sécante passe par A et B",
  R2.fond + R2.courbe((x) => -10 * x * x + 100 * x, 0.04, 5, C.bleu, 4) +
    R2.courbe((x) => 50 * x + 40, 0, 4.8, C.jaune, 3) +
    R2.point(1, 90, C.rose, 7) + R2.point(4, 240, C.rose, 7) +
    t(R2.X(1) + 14, R2.Y(90) + 28, "A (1 ; 90)", C.craie, 18, "start") + t(R2.X(4) - 12, R2.Y(240) - 18, "B (4 ; 240)", C.craie, 18, "end") +
    t(R2.X(0) + 8, 24, "kg", C.pale, 17, "start") + t(462, R2.Y(0) - 10, "sem.", C.pale, 18, "end") +
    t(240, 400, `pente de (AB)${NB}?`, C.rose, 26));

const ciment = svg("Le camion de ciment : à 8 heures, 40 kilomètres au compteur ; à 11 heures, 250 kilomètres ; vitesse moyenne ?",
  r(50, 70, 170, 110, C.bleu, 0.15, 3, 10) + r(260, 70, 170, 110, C.jaune, 0.2, 3, 10) +
    t(135, 115, "8 h", C.pale, 24) + t(135, 155, "40 km", C.craie, 28) +
    t(345, 115, "11 h", C.pale, 24) + t(345, 155, "250 km", C.craie, 28) +
    l(225, 125, 255, 125, C.pale, 3) + t(240, 280, "distance parcourue", C.pale, 24) + t(240, 350, `vitesse moyenne${NB}?`, C.rose, 28));

const sacs = svg("Le fabricant de sacs à dos : C de 100 égale 2 000 euros, C de 150 égale 2 600 euros ; coût d'un sac en plus ?",
  r(70, 80, 340, 70, C.bleu, 0.15, 3, 10) + t(240, 127, "C(100) = 2 000 €", C.craie, 28) +
    r(70, 170, 340, 70, C.jaune, 0.2, 3, 10) + t(240, 217, "C(150) = 2 600 €", C.craie, 28) +
    t(240, 330, `par sac en plus${NB}?`, C.rose, 28));

const doudounes = svg("Les doudounes : 800 ventes au mois 2, 500 au mois 5 ; Léo dit que le taux vaut 100",
  r(50, 70, 170, 110, C.bleu, 0.15, 3, 10) + r(260, 70, 170, 110, C.jaune, 0.2, 3, 10) +
    t(135, 115, "mois 2", C.pale, 22) + t(135, 155, "800", C.craie, 30) +
    t(345, 115, "mois 5", C.pale, 22) + t(345, 155, "500", C.craie, 30) +
    t(240, 270, "Léo : « taux = 100 »", C.pale, 26) + t(240, 350, "?", C.rose, 34));

const piscines = svg("Les piscines hors-sol : f de x égale 20 x au carré plus 100 ; f de 1 égale 120, f de 3 égale 280, f de 5 égale 600",
  r(80, 50, 320, 80, C.bleu, 0.15, 3, 10) + t(240, 103, "f(x) = 20x² + 100", C.craie, 30) +
    t(240, 190, "f(1) = 120 · f(3) = 280 · f(5) = 600", C.pale, 22) +
    t(240, 260, "entre 1 et 3 : taux 80", C.pale, 24) + t(240, 340, `entre 3 et 5${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "fct_taux_variation",
  titre: "Énigmes de taux de variation",
  description: "L'application de réservation de restaurants, la cressonnière, le camion de ciment, le fabricant de sacs à dos, le piège des doudounes, le défi des piscines hors-sol : calculer un taux de variation, le lire comme la pente d'une sécante, l'interpréter en vitesse moyenne ou en coût.",
  problemes: [
    {
      tag: "Énigme 1 · L'application de restaurants",
      titre: "Calculer un taux de variation",
      question: `Une application permet de réserver au restaurant.<br>Au mois 2, 300 restaurants y sont inscrits.<br>Au mois 6, ils sont 700.<br><br><b>Quel est le taux de variation</b> entre le mois 2 et le mois 6 ?`,
      reponse: `Taux = (700 − 300) ÷ (6 − 2).<br>400 ÷ 4 = <span class="big">100</span>.<br>En moyenne, 100 restaurants de plus chaque mois.`,
      consigne: "300 au mois 2, 700 au mois 6. Quel est le taux de variation ?",
      verification: { type: "courte", attendus: ["100"] },
      dessin: appli,
    },
    {
      tag: "Énigme 2 · La cressonnière",
      titre: "La pente de la sécante",
      question: `Une cressonnière note sa récolte totale, en kg, semaine après semaine.<br>La droite jaune passe par A et B : c'est une sécante.<br><br><b>Quelle est sa pente</b> ?`,
      reponse: `Pente = (240 − 90) ÷ (4 − 1).<br>150 ÷ 3 = <span class="big">50</span>.<br>C'est le taux de variation entre 1 et 4 : 50 kg par semaine en moyenne.`,
      consigne: "A (1 ; 90), B (4 ; 240). Quelle est la pente de (AB) ?",
      verification: { type: "qcm", choix: ["50", "150", "80"], bonne: 0 },
      dessin: cresson,
    },
    {
      tag: "Énigme 3 · Le camion de ciment",
      titre: "Une vitesse moyenne",
      question: `Un camion livre du ciment.<br>À 8 h, son compteur du jour marque 40 km.<br>À 11 h, il marque 250 km.<br><br><b>Quelle est sa vitesse moyenne</b> entre 8 h et 11 h ?`,
      reponse: `Il roule 250 − 40 = 210 km.<br>Il met 11 − 8 = 3 h.<br>210 ÷ 3 = <span class="big">70 km/h</span>.<br>Le taux de variation, ici, c'est une vitesse.`,
      consigne: "40 km à 8 h, 250 km à 11 h. Quelle vitesse moyenne ?",
      verification: { type: "qcm", choix: ["83 km/h", "70 km/h", "210 km/h"], bonne: 1 },
      dessin: ciment,
    },
    {
      tag: "Énigme 4 · Les sacs à dos",
      titre: "Un coût par unité",
      question: `C(x) est le coût de fabrication de x sacs à dos, en euros.<br>C(100) = 2 000 et C(150) = 2 600.<br><br><b>Combien coûte, en moyenne,</b> chaque sac en plus ?`,
      reponse: `50 sacs de plus coûtent 2 600 − 2 000 = 600 €.<br>600 ÷ 50 = <span class="big">12 €</span>.<br>C'est le taux de variation de C entre 100 et 150.`,
      consigne: "C(100) = 2 000 €, C(150) = 2 600 €. Coût moyen d'un sac en plus ?",
      verification: { type: "courte", attendus: ["12"], unite: "€" },
      dessin: sacs,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les doudounes",
      sorte: "piege",
      question: `Un magasin vend 800 doudounes au mois 2.<br>Il en vend 500 au mois 5.<br>Léo : « Le taux de variation vaut 100. »<br><br><b>Quel est le vrai taux</b> ?`,
      reponse: `Taux = (500 − 800) ÷ (5 − 2).<br>−300 ÷ 3 = <span class="big">−100</span>.<br>Les ventes baissent : le taux est négatif.`,
      consigne: "800 au mois 2, 500 au mois 5. Quel est le taux de variation ?",
      verification: { type: "qcm", choix: ["100", "−300", "−100"], bonne: 2 },
      dessin: doudounes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les piscines hors-sol",
      sorte: "defi",
      question: `Une piscine hors-sol carrée de x mètres de côté coûte f(x) = 20x² + 100 euros.<br>Entre 1 et 3 mètres, le taux de variation vaut 80.<br><br><b>Quel est le taux</b> entre 3 et 5 mètres ?`,
      reponse: `f(3) = 20 × 9 + 100 = 280. f(5) = 20 × 25 + 100 = 600.<br>(600 − 280) ÷ (5 − 3) = 320 ÷ 2 = <span class="big">160</span>.<br>Le taux double : le prix monte de plus en plus vite.`,
      consigne: "f(x) = 20x² + 100. Taux de variation entre 3 et 5 ?",
      verification: { type: "courte", attendus: ["160"] },
      dessin: piscines,
    },
  ],
};

export default problemes;
