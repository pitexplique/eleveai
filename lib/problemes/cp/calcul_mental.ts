// Énigmes à projeter — CP, notion calcul_mental : le double 4 + 4 aux dés,
// le gâteau de 7 ans plus une bougie, le petit train de 10 places, le paquet
// de 10 cartes et 4 cartes, le piège de l'assiette vide, le défi du 12 aux
// deux dés. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l, ell } from "../dessins-ecole";
import { rang, de } from "../dessins-cp";

const des = svg(
  "Deux dés : 4 et 4",
  de(160, 170, 4, 110) + de(320, 170, 4, 110) + t(240, 340, `Combien en tout${NB}?`, C.rose, 30)
);

const bougie = (x: number, c: string) => r(x - 6, 130, 12, 50, c, 0.5, 2, 3) + `<path d="M${x} 112 Q${x + 9} 122 ${x} 128 Q${x - 9} 122 ${x} 112 Z" fill="${C.jaune}" stroke="${C.jaune}" stroke-width="2"/>`;
const gateau = svg(
  "Un gâteau avec 7 bougies ; l'an prochain, une bougie de plus",
  r(80, 180, 240, 90, C.rose, 0.25, 3, 10) +
    [0, 1, 2, 3, 4, 5, 6].map((i) => bougie(110 + i * 30, C.bleu)).join("") +
    t(390, 90, "+ 1", C.rose, 36) + bougie(390, C.rose) +
    t(240, 360, `L'an prochain${NB}?`, C.rose, 30)
);

const wagon = (x: number, plein: boolean) => r(x - 20, 150, 40, 50, C.bleu, plein ? 0.3 : 0, 3, 6) + (plein ? t(x, 140, "🙂", C.craie, 28) : "");
const train = svg(
  "Un petit train de 10 places ; 7 enfants assis, 3 places vides",
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => wagon(40 + i * 44, i < 7)).join("") +
    l(20, 205, 460, 205, C.pale, 3) + o(60, 215, 10, C.craie, 0, 3) + o(420, 215, 10, C.craie, 0, 3) +
    t(240, 290, "10 places", C.pale, 24) + t(240, 370, `Combien de places vides${NB}?`, C.rose, 28)
);

const paquet = r(60, 110, 120, 160, C.jaune, 0.25, 3, 10) + r(70, 100, 120, 160, C.jaune, 0.25, 3, 10) + t(130, 195, "10", C.craie, 40);
const cartes = svg(
  "Un paquet de 10 cartes et 4 cartes seules",
  paquet + [0, 1, 2, 3].map((i) => r(250 + i * 50, 120, 40, 60, C.bleu, 0.2, 3, 6)).join("") +
    t(240, 350, `Combien de cartes${NB}?`, C.rose, 30)
);

const assiette = (x: number) => ell(x, 200, 100, 40, C.craie, 0, 3);
const piege = svg(
  "Une assiette avec 4 cookies, une assiette vide",
  assiette(130) + rang("🍪", 4, 70, 205, 40, 32) + assiette(350) +
    t(240, 340, `4 + 0 = ?`, C.rose, 34)
);

const defi = svg(
  "Deux dés cachés ; ensemble ils font 12",
  r(110, 110, 110, 110, C.craie, 0, 3, 12) + t(165, 182, "?", C.rose, 50) +
    r(260, 110, 110, 110, C.craie, 0, 3, 12) + t(315, 182, "?", C.rose, 50) +
    t(240, 290, "Ensemble : 12", C.craie, 32) + t(240, 360, `Quels dés${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "cp",
  notionId: "calcul_mental",
  titre: "Énigmes de calcul mental",
  description: "Le double 4 + 4 aux dés, le gâteau d'anniversaire et une bougie de plus, les places libres du petit train, le paquet de 10 cartes, le piège de l'assiette vide, le défi des deux dés qui font 12.",
  problemes: [
    {
      tag: "Énigme 1 · Les dés",
      titre: "Le double",
      question: `Deux dés.<br><br>Combien de points en tout ?`,
      reponse: `4 + 4 = <span class="big">8</span>.<br>C'est le double de 4.`,
      consigne: "4 + 4 = ?",
      verification: { type: "courte", attendus: ["8"] },
      dessin: des,
    },
    {
      tag: "Énigme 2 · L'anniversaire",
      titre: "Une bougie de plus",
      question: `Inès a <b>7</b> ans.<br><br>Quel âge l'an prochain ?`,
      reponse: `7 + 1 = <span class="big">8 ans</span>.`,
      consigne: "Inès a 7 ans. Quel âge aura-t-elle l'an prochain ?",
      verification: { type: "qcm", choix: ["8 ans", "6 ans", "17 ans"], bonne: 0 },
      dessin: gateau,
    },
    {
      tag: "Énigme 3 · Le petit train",
      titre: "Les places vides",
      question: `Le train a <b>10</b> places.<br><b>7</b> enfants sont assis.<br><br>Combien de places vides ?`,
      reponse: `7 + 3 = 10.<br><span class="big">3 places vides</span>.`,
      consigne: "10 places, 7 enfants assis : combien de places vides ?",
      verification: { type: "qcm", choix: ["17", "4", "3"], bonne: 2 },
      dessin: train,
    },
    {
      tag: "Énigme 4 · Les cartes",
      titre: "Le paquet de cartes",
      question: `Un paquet de <b>10</b> cartes.<br>Et <b>4</b> cartes.<br><br>Combien de cartes ?`,
      reponse: `10 + 4 = <span class="big">14 cartes</span>.`,
      consigne: "10 + 4 = ?",
      verification: { type: "courte", attendus: ["14"] },
      dessin: cartes,
    },
    {
      tag: "Énigme 5 · Le piège",
      titre: "L'assiette vide",
      question: `4 cookies, et une assiette vide.<br><br>4 + 0 = ?`,
      reponse: `0, c'est rien.<br>On n'ajoute rien.<br><span class="big">4</span>.`,
      consigne: "4 + 0 = ?",
      verification: { type: "qcm", choix: ["0", "4", "40"], bonne: 1 },
      dessin: piege,
      sorte: "piege",
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux dés",
      question: `Deux dés font <b>12</b>.<br><br>Quels sont les dés ?`,
      reponse: `Un dé va jusqu'à 6.<br>6 + 6 = 12.<br><span class="big">6 et 6</span>.`,
      consigne: "Deux dés font 12. Quels sont les dés ?",
      verification: { type: "qcm", choix: ["5 et 7", "6 et 6", "10 et 2"], bonne: 1 },
      dessin: defi,
      sorte: "defi",
    },
  ],
};

export default problemes;
