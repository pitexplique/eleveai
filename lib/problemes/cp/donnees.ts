// Énigmes à projeter — CP, notion donnees (tableaux et diagrammes) : les
// animaux de la classe, le coffre à jouets, les tours de points du jeu, les
// formes bleues, le piège des gros et des petits cubes, le défi des pommes
// cueillies. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { rang } from "../dessins-cp";

const animaux = svg(
  "Les animaux des enfants de la classe : chien 4, chat 6, poisson 2",
  t(50, 112, "🐕", C.craie, 40) + rang("🙂", 4, 120, 110, 50, 34) +
    t(50, 192, "🐈", C.craie, 40) + rang("🙂", 6, 120, 190, 50, 34) +
    t(50, 272, "🐟", C.craie, 40) + rang("🙂", 2, 120, 270, 50, 34) +
    l(85, 70, 85, 290, C.pale, 2) + t(240, 370, `L'animal le plus aimé${NB}?`, C.rose, 28)
);

const ligne = (y: number, e: string, n: number) => r(100, y - 40, 140, 60, C.craie, 0, 3) + r(240, y - 40, 140, 60, C.craie, 0, 3) + t(170, y + 2, e, C.craie, 40) + t(310, y + 2, n, C.craie, 34);
const coffre = svg(
  "Un tableau du coffre à jouets : nounours 3, voitures 5, toupies 2",
  ligne(110, "🧸", 3) + ligne(170, "🚗", 5) + ligne(230, "🪀", 2) +
    t(240, 350, `Combien de voitures${NB}?`, C.rose, 30)
);

const tour = (x: number, n: number, nom: string, c: string) => {
  let s = "";
  for (let i = 0; i < n; i++) s += r(x - 25, 290 - (i + 1) * 36, 50, 36, c, 0.35, 3, 3);
  return s + t(x, 325, nom, C.craie, 24);
};
const jeu = svg(
  "Les points du jeu en tours de cubes : Lina 4, Max 6, Eva 3",
  l(50, 290, 430, 290, C.pale, 3) + tour(120, 4, "Lina", C.rose) + tour(240, 6, "Max", C.bleu) + tour(360, 3, "Eva", C.jaune) +
    t(240, 390, `Qui a gagné${NB}?`, C.rose, 30)
);

const rond = (x: number, y: number, c: string) => `<circle cx="${x}" cy="${y}" r="24" fill="${c}" fill-opacity="0.4" stroke="${c}" stroke-width="3"/>`;
const carre = (x: number, y: number, c: string) => r(x - 24, y - 24, 48, 48, c, 0.4, 3);
const formes = svg(
  "Des formes mélangées : 3 ronds bleus, 2 carrés bleus, 4 ronds roses",
  rond(70, 110, C.bleu) + rond(170, 140, C.rose) + carre(260, 100, C.bleu) + rond(360, 120, C.rose) + rond(430, 200, C.bleu) +
    carre(110, 210, C.bleu) + rond(210, 240, C.rose) + rond(310, 230, C.bleu) + rond(60, 290, C.rose) +
    t(240, 370, `Combien de formes bleues${NB}?`, C.rose, 28)
);

const piege = svg(
  "Les points en tours de cubes : Lina a 3 gros cubes, sa tour est haute ; Max a 5 petits cubes, sa tour est plus basse",
  l(80, 300, 400, 300, C.pale, 3) +
    [0, 1, 2].map((i) => r(110, 300 - (i + 1) * 70, 80, 70, C.rose, 0.35, 3, 3)).join("") +
    [0, 1, 2, 3, 4].map((i) => r(300, 300 - (i + 1) * 30, 60, 30, C.bleu, 0.35, 3, 3)).join("") +
    t(150, 335, "Lina", C.craie, 24) + t(330, 335, "Max", C.craie, 24) +
    t(240, 395, `Qui a le plus de cubes${NB}?`, C.rose, 28)
);

const jour = (y: number, nom: string, n: number | null) =>
  t(40, y + 10, nom, C.craie, 24, "start") + (n === null ? t(200, y + 10, "?", C.rose, 40) : rang("🍎", n, 180, y + 12, 50, 36));
const defi = svg(
  "Les pommes cueillies : lundi 2, mardi 4, mercredi caché ; 9 pommes en tout",
  jour(100, "lundi", 2) + jour(170, "mardi", 4) + jour(240, "mercredi", null) +
    t(240, 310, "En tout : 9 pommes", C.craie, 28) + t(240, 380, `Combien mercredi${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "cp",
  notionId: "donnees",
  titre: "Énigmes sur les tableaux et diagrammes",
  description: "Les animaux préférés de la classe, le coffre à jouets, les tours de points du jeu, les formes bleues, le piège des gros et des petits cubes, le défi des pommes cueillies dans la semaine.",
  problemes: [
    {
      tag: "Énigme 1 · Les animaux",
      titre: "Les animaux de la classe",
      question: `Un 🙂 = un enfant.<br><br>Quel animal ont le plus d'enfants ?`,
      reponse: `Chien 4, chat 6, poisson 2.<br><span class="big">Le chat</span>.`,
      consigne: "Quel animal ont le plus d'enfants ?",
      verification: { type: "qcm", choix: ["Le chien", "Le poisson", "Le chat"], bonne: 2 },
      dessin: animaux,
    },
    {
      tag: "Énigme 2 · Le coffre à jouets",
      titre: "Le tableau des jouets",
      question: `Lis le tableau.<br><br>Combien de voitures ?`,
      reponse: `Ligne de la voiture : 5.<br><span class="big">5 voitures</span>.`,
      consigne: "Combien de voitures dans le coffre ?",
      verification: { type: "courte", attendus: ["5"] },
      dessin: coffre,
    },
    {
      tag: "Énigme 3 · Le jeu",
      titre: "Qui a gagné ?",
      question: `Un cube = un point.<br><br>Qui a gagné ?`,
      reponse: `Lina 4, Max 6, Eva 3.<br><span class="big">Max</span>.`,
      consigne: "Lina 4 points, Max 6, Eva 3. Qui a gagné ?",
      verification: { type: "qcm", choix: ["Lina", "Max", "Eva"], bonne: 1 },
      dessin: jeu,
    },
    {
      tag: "Énigme 4 · Les formes",
      titre: "Les formes bleues",
      question: `Combien de formes bleues ?`,
      reponse: `3 ronds bleus, 2 carrés bleus.<br>3 + 2 = <span class="big">5</span>.`,
      consigne: "Combien de formes bleues ?",
      verification: { type: "courte", attendus: ["5"] },
      dessin: formes,
    },
    {
      tag: "Énigme 5 · Le piège",
      titre: "La plus haute tour",
      question: `La tour de Lina est plus haute.<br><br>Qui a le plus de cubes ?`,
      reponse: `On compte les cubes !<br>Lina 3, Max 5.<br><span class="big">Max</span>.`,
      consigne: "Qui a le plus de cubes ?",
      verification: { type: "qcm", choix: ["Max", "Lina", "Pareil"], bonne: 0 },
      dessin: piege,
      sorte: "piege",
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les pommes de la semaine",
      question: `<b>9</b> pommes en tout.<br><br>Combien mercredi ?`,
      reponse: `2 + 4 = 6.<br>6 + 3 = 9.<br><span class="big">3 pommes</span>.`,
      consigne: "Lundi 2 pommes, mardi 4, 9 en tout. Combien mercredi ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: defi,
      sorte: "defi",
    },
  ],
};

export default problemes;
