// Énigmes à projeter — STMG (1re), notion modéliser par une suite
// (le contrat de maintenance des climatiseurs, le compte à terme d'une
// association de quartier, le magazine en ligne, la voiture de fonction,
// piège du menu du kebab, défi des deux offres d'emploi). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, fleche } from "../dessins-ecole";

const clim = svg("Le contrat de maintenance des climatiseurs : 1 200 euros par an ; le prix augmente de 2,5 pour cent chaque année",
  r(110, 60, 260, 110, C.bleu, 0.15, 3, 12) + t(240, 105, "contrat", C.pale, 22) + t(240, 150, "1 200 € / an", C.craie, 32) +
    t(240, 240, "+ 2,5 % chaque année", C.jaune, 28) + t(240, 340, `quelle suite${NB}?`, C.rose, 30));

const boite = (x: number, s: string, c: string) => r(x, 150, 120, 70, c, 0.18, 3, 8) + t(x + 60, 196, s, c === C.rose ? C.rose : C.craie, 24);
const compte = svg("Le compte à terme de l'association de quartier : 5 000 euros, puis multiplié par 1,03 chaque année, deux fois",
  t(240, 70, "compte à terme · 3 % par an", C.pale, 22) + boite(20, "5 000 €", C.bleu) + boite(180, "?", C.bleu) + boite(340, "?", C.rose) +
    fleche(142, 185, 178, 185, C.jaune, 3) + fleche(302, 185, 338, 185, C.jaune, 3) +
    t(160, 262, "× 1,03", C.jaune, 20) + t(320, 262, "× 1,03", C.jaune, 20) +
    t(80, 130, "u₀", C.pale, 20) + t(240, 130, "u₁", C.pale, 20) + t(400, 130, "u₂", C.pale, 20) +
    t(240, 350, `u₂${NB}=${NB}?`, C.rose, 30));

const magazine = svg("Le magazine en ligne : 2 000 abonnés au départ, 150 abonnés de plus chaque mois",
  r(140, 50, 200, 150, C.bleu, 0.12, 3, 14) + t(240, 105, "abonnés", C.pale, 22) + t(240, 160, "2 000", C.craie, 40) +
    t(240, 260, "+ 150 chaque mois", C.jaune, 28) + t(240, 350, `uₙ₊₁${NB}=${NB}?`, C.rose, 30));

const voiture = svg("La voiture de fonction : 30 000 euros, elle perd 15 pour cent de sa valeur chaque année ; sa valeur au bout de 2 ans ?",
  t(240, 70, "voiture de fonction", C.pale, 22) + boite(20, "30 000 €", C.bleu) + boite(180, "?", C.bleu) + boite(340, "?", C.rose) +
    fleche(142, 185, 178, 185, C.jaune, 3) + fleche(302, 185, 338, 185, C.jaune, 3) +
    t(160, 262, "− 15 %", C.jaune, 20) + t(320, 262, "− 15 %", C.jaune, 20) +
    t(80, 130, "année 0", C.pale, 18) + t(240, 130, "année 1", C.pale, 18) + t(400, 130, "année 2", C.pale, 18) +
    t(240, 350, `valeur${NB}?`, C.rose, 30));

const kebab = svg("Le menu du kebab : 8 euros, il augmente de 5 pour cent par an ; Inès écrit u indice n plus 1 égale u indice n plus 5",
  r(150, 50, 180, 110, C.jaune, 0.2, 3, 14) + t(240, 95, "menu", C.pale, 22) + t(240, 140, "8 €", C.craie, 36) +
    t(240, 225, "+ 5 % par an", C.jaune, 28) + t(240, 295, "Inès : uₙ₊₁ = uₙ + 5", C.pale, 24) +
    t(240, 370, `u₁${NB}=${NB}?`, C.rose, 30));

const offres = svg("Deux offres d'emploi de technicien : A, 1 800 euros plus 60 euros par an ; B, 1 800 euros plus 3 pour cent par an ; offre B après 3 ans ?",
  r(30, 60, 200, 170, C.bleu, 0.15, 3, 12) + t(130, 105, "offre A", C.bleu, 26) + t(130, 155, "1 800 €", C.craie, 28) + t(130, 200, "+ 60 € / an", C.craie, 22) +
    r(250, 60, 200, 170, C.jaune, 0.18, 3, 12) + t(350, 105, "offre B", C.jaune, 26) + t(350, 155, "1 800 €", C.craie, 28) + t(350, 200, "+ 3 % / an", C.craie, 22) +
    t(240, 320, `offre B après 3 ans${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "suite_modeliser",
  titre: "Énigmes pour modéliser par une suite",
  description: "Le contrat de maintenance des climatiseurs, le compte à terme d'une association, le magazine en ligne, la voiture de fonction, le piège du menu du kebab, le défi des deux offres d'emploi : reconnaître une croissance linéaire ou exponentielle, choisir la bonne suite, faire évoluer un capital, conclure par une phrase.",
  problemes: [
    {
      tag: "Énigme 1 · Les climatiseurs",
      titre: "Linéaire ou exponentiel ?",
      question: `Une entreprise paie 1 200 € par an pour l'entretien de ses climatiseurs.<br>Le prix augmente de 2,5 % chaque année.<br>u<sub>n</sub> est le prix l'année n.<br><br><b>Quel modèle convient</b> ?`,
      reponse: `+ 2,5 %, c'est multiplier par 1 + 2,5 ÷ 100 = 1,025.<br>On multiplie toujours par le même nombre : croissance exponentielle.<br><span class="big">Suite géométrique de raison 1,025</span>.`,
      consigne: "+ 2,5 % par an : quel modèle ?",
      verification: { type: "qcm", choix: ["suite arithmétique de raison 2,5", "suite géométrique de raison 1,025", "suite géométrique de raison 2,5"], bonne: 1 },
      dessin: clim,
    },
    {
      tag: "Énigme 2 · Le compte à terme",
      titre: "Faire évoluer un capital",
      question: `Une association de quartier place 5 000 € sur un compte à terme.<br>Le taux est de 3 % par an. Les intérêts restent sur le compte.<br><br><b>Combien y a-t-il</b> sur le compte au bout de 2 ans ?`,
      reponse: `+ 3 %, c'est × 1,03.<br>u<sub>1</sub> = 5 000 × 1,03 = 5 150.<br>u<sub>2</sub> = 5 150 × 1,03 = <span class="big">5 304,50 €</span>.`,
      consigne: "5 000 € à 3 % par an. Combien au bout de 2 ans ?",
      verification: { type: "courte", attendus: ["5304,5", "5 304,5", "5304,50", "5 304,50", "5304.5"], unite: "€" },
      dessin: compte,
    },
    {
      tag: "Énigme 3 · Le magazine en ligne",
      titre: "Choisir la suite",
      question: `Un magazine en ligne a 2 000 abonnés.<br>Chaque mois, il gagne 150 abonnés de plus.<br>u<sub>n</sub> est le nombre d'abonnés au mois n.<br><br><b>Quelle relation est juste</b> ?`,
      reponse: `On ajoute toujours 150 : croissance linéaire.<br>La suite est arithmétique de raison 150.<br><span class="big">u<sub>n+1</sub> = u<sub>n</sub> + 150</span>.`,
      consigne: "+ 150 abonnés par mois. Quelle relation ?",
      verification: { type: "qcm", choix: ["uₙ₊₁ = 150 × uₙ", "uₙ₊₁ = uₙ × 1,5", "uₙ₊₁ = uₙ + 150"], bonne: 2 },
      dessin: magazine,
    },
    {
      tag: "Énigme 4 · La voiture de fonction",
      titre: "Une valeur qui baisse",
      question: `Une société achète une voiture de fonction 30 000 €.<br>Chaque année, la voiture perd 15 % de sa valeur.<br><br><b>Combien vaut-elle</b> au bout de 2 ans ?`,
      reponse: `− 15 %, c'est × 0,85.<br>Année 1 : 30 000 × 0,85 = 25 500.<br>Année 2 : 25 500 × 0,85 = <span class="big">21 675 €</span>.`,
      consigne: "30 000 €, − 15 % par an. Valeur au bout de 2 ans ?",
      verification: { type: "courte", attendus: ["21675", "21 675"], unite: "€" },
      dessin: voiture,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le menu du kebab",
      sorte: "piege",
      question: `Un menu de kebab coûte 8 €. Son prix augmente de 5 % par an.<br>Inès écrit : « u<sub>n+1</sub> = u<sub>n</sub> + 5 ».<br><br><b>Combien coûtera vraiment</b> le menu dans un an ?`,
      reponse: `+ 5 %, ce n'est pas + 5 € : c'est × 1,05.<br>8 × 1,05 = <span class="big">8,40 €</span>.<br>Avec la formule d'Inès, on trouverait 13 € : bien trop cher !`,
      consigne: "8 €, + 5 % par an. Prix dans un an ?",
      verification: { type: "qcm", choix: ["8,40 €", "13 €", "8,05 €"], bonne: 0 },
      dessin: kebab,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Deux offres d'emploi",
      sorte: "defi",
      question: `Un technicien hésite entre deux offres d'emploi. Les deux démarrent à 1 800 € par mois.<br>Offre A : + 60 € chaque année. Offre B : + 3 % chaque année.<br><br><b>Quel salaire donne l'offre B</b> au bout de 3 ans, arrondi à l'euro ?`,
      reponse: `B : 1 800 × 1,03 × 1,03 × 1,03 ≈ 1 966,91. Donc <span class="big">1 967 €</span>.<br>A : 1 800 + 3 × 60 = 1 980 €.<br>Au bout de 3 ans, l'offre A paie encore un peu plus.`,
      consigne: "1 800 €, + 3 % par an. Salaire après 3 ans, à l'euro ?",
      verification: { type: "courte", attendus: ["1967", "1 967"], unite: "€" },
      dessin: offres,
    },
  ],
};

export default problemes;
