// Énigmes à projeter — STMG (1re), notion problème de seuil
// (l'entrepôt de riz, le fablab, le placement de l'infirmière libérale, deux
// salles d'arcade, piège de la plateforme de soutien scolaire, défi du data
// center). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

/** Un tableau de valeurs en colonnes : n en haut, les termes dessous. */
const tab = (ns: string[], lignes: { nom: string; vals: string[]; c: string }[], y = 60, w = 74, taille = 19) => {
  const x0 = 470 - ns.length * w;
  let s = r(10, y, x0 - 10, 50, C.pale, 0.3, 2) + t((10 + x0) / 2, y + 33, "n", C.craie, 22);
  ns.forEach((n, k) => (s += r(x0 + k * w, y, w, 50, C.pale, 0.3, 2) + t(x0 + k * w + w / 2, y + 33, n, C.craie, 22)));
  lignes.forEach((L, i) => {
    const yy = y + 50 + i * 50;
    s += r(10, yy, x0 - 10, 50, L.c, 0.25, 2) + t((10 + x0) / 2, yy + 33, L.nom, C.craie, 20);
    L.vals.forEach((v, k) => (s += r(x0 + k * w, yy, w, 50, L.c, 0.1, 2) + t(x0 + k * w + w / 2, yy + 33, v, C.craie, taille)));
  });
  return s;
};

const riz = svg("L'entrepôt de riz : le stock en sacs, semaine 0 à 4 : 10 000, 8 000, 6 400, 5 120, 4 096 ; sous 5 000 quand ?",
  tab(["0", "1", "2", "3", "4"], [{ nom: "sacs", vals: ["10 000", "8 000", "6 400", "5 120", "4 096"], c: C.bleu }], 80, 80, 18) +
    t(240, 290, `stock${NB}&lt;${NB}5 000`, C.jaune, 30) + t(240, 360, `à partir de n${NB}=${NB}?`, C.rose, 28));

const R2 = repereXY(0, 5, 0, 140, { px: 1, py: 10, ey: 20 });
const fablab = svg("Le fablab : un nuage de 6 points, 30, 50, 70, 90, 110, 130 membres ; une ligne en pointillés à 100",
  R2.fond + l(R2.X(0), R2.Y(100), R2.X(5) + 10, R2.Y(100), C.rose, 3, "10 8") +
    [30, 50, 70, 90, 110, 130].map((v, n) => R2.point(n, v, C.bleu, 8)).join("") +
    t(R2.X(0) + 8, 24, "membres", C.pale, 17, "start") + t(462, R2.Y(0) - 10, "n", C.pale, 18, "end") +
    t(R2.X(0) + 10, R2.Y(100) - 10, "100", C.rose, 18, "start") +
    t(240, 400, `au-dessus de 100 à partir de n${NB}=${NB}?`, C.rose, 22));

const infirmiere = svg("Le placement de l'infirmière libérale : 8 000 euros à 4 pour cent par an ; années 0 à 4 : 8 000 ; 8 320 ; 8 652,80 ; 8 998,91 ; 9 358,87",
  tab(["0", "1", "2", "3", "4"], [{ nom: "€", vals: ["8 000", "8 320", "8 652,80", "8 998,91", "9 358,87"], c: C.bleu }], 80, 84, 16) +
    t(240, 290, `capital${NB}>${NB}9 000`, C.jaune, 30) + t(240, 360, `à partir de n${NB}=${NB}?`, C.rose, 28));

const arcade = svg("Deux salles d'arcade : A, 500, 540, 580, 620, 660, 700 clients ; B, 300, 360, 432, 518, 622, 746 clients ; B dépasse A quand ?",
  tab(["0", "1", "2", "3", "4", "5"], [
    { nom: "A", vals: ["500", "540", "580", "620", "660", "700"], c: C.bleu },
    { nom: "B", vals: ["300", "360", "432", "518", "622", "746"], c: C.jaune },
  ], 70, 66, 20) +
    t(240, 290, "A : + 40 par mois · B : × 1,2", C.pale, 22) + t(240, 360, `B${NB}>${NB}A à partir de${NB}?`, C.rose, 28));

const soutien = svg("La plateforme de soutien scolaire : 1 000 inscrits en 2024, plus 25 pour cent par an ; 2024 à 2028 : 1 000, 1 250, 1 563, 1 953, 2 441",
  tab(["0", "1", "2", "3", "4"], [{ nom: "inscrits", vals: ["1 000", "1 250", "1 563", "1 953", "2 441"], c: C.bleu }], 80, 70, 19) +
    t(240, 260, "n = 0 : année 2024", C.pale, 22) + t(240, 340, `plus de 2 000 en${NB}?`, C.rose, 28));

const datacenter = svg("Le data center : 500 tonnes de CO2 par an, moins 10 pour cent chaque année ; sous 250 tonnes au bout de combien d'années ?",
  r(130, 50, 220, 120, C.bleu, 0.15, 3, 12) + t(240, 95, "CO₂ par an", C.pale, 22) + t(240, 145, "500 t", C.craie, 36) +
    t(240, 230, "− 10 % chaque année", C.jaune, 26) + t(240, 290, `objectif${NB}: moins de 250 t`, C.pale, 24) +
    t(240, 370, `combien d'années${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "suite_seuil",
  titre: "Énigmes de seuil avec une suite",
  description: "L'entrepôt de riz, le fablab, le placement de l'infirmière libérale, deux salles d'arcade, le piège de la plateforme de soutien scolaire, le défi du data center : trouver un seuil dans un tableau ou sur un graphique, le rang où une suite dépasse une valeur, ou dépasse une autre suite.",
  problemes: [
    {
      tag: "Énigme 1 · L'entrepôt de riz",
      titre: "Un seuil dans un tableau",
      question: `Un entrepôt a 10 000 sacs de riz. Chaque semaine, le stock baisse de 20 %.<br>Le tableau donne le stock u<sub>n</sub> la semaine n.<br>Sous 5 000 sacs, il faut commander.<br><br><b>À partir de quelle semaine</b> le stock passe-t-il sous 5 000 ?`,
      reponse: `u<sub>3</sub> = 5 120 : c'est encore au-dessus de 5 000.<br>u<sub>4</sub> = 4 096 : c'est en dessous.<br>À partir de la <span class="big">semaine 4</span>.`,
      consigne: "Stock : 10 000 ; 8 000 ; 6 400 ; 5 120 ; 4 096. Sous 5 000 à partir de quel n ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: riz,
    },
    {
      tag: "Énigme 2 · Le fablab",
      titre: "Un seuil sur un graphique",
      question: `Un fablab compte ses membres chaque mois.<br>Le nuage de points montre u<sub>n</sub>, le nombre de membres au mois n.<br>Une ligne en pointillés marque 100 membres.<br><br><b>À partir de quel mois</b> le fablab a-t-il plus de 100 membres ?`,
      reponse: `Au mois 3, le point est sous la ligne : 90 membres.<br>Au mois 4, il est au-dessus : 110 membres.<br>À partir du <span class="big">mois 4</span>.`,
      consigne: "Lis sur le graphique : plus de 100 membres à partir de quel n ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: fablab,
    },
    {
      tag: "Énigme 3 · L'infirmière libérale",
      titre: "Le rang qui dépasse",
      question: `Une infirmière libérale place 8 000 € à 4 % par an.<br>Le tableau donne son capital u<sub>n</sub> l'année n.<br><br><b>À partir de quelle année</b> dépasse-t-elle 9 000 € ?`,
      reponse: `u<sub>3</sub> = 8 998,91 € : c'est tout près, mais pas encore 9 000.<br>u<sub>4</sub> = 9 358,87 € : c'est au-dessus.<br>À partir de l'<span class="big">année 4</span>.`,
      consigne: "8 000 € à 4 % par an. Plus de 9 000 € à partir de quel n ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: infirmiere,
    },
    {
      tag: "Énigme 4 · Les salles d'arcade",
      titre: "Quand B dépasse A",
      question: `Deux salles d'arcade comptent leurs clients par mois.<br>A a 500 clients et en gagne 40 par mois.<br>B a 300 clients, et leur nombre est multiplié par 1,2 chaque mois.<br><br><b>À partir de quel mois</b> B a-t-elle plus de clients que A ?`,
      reponse: `Au mois 4 : A = 660 et B ≈ 622. A est encore devant.<br>Au mois 5 : A = 700 et B ≈ 746. B est devant.<br>À partir du <span class="big">mois 5</span>.`,
      consigne: "A : 500 + 40 par mois. B : 300 × 1,2 par mois. B > A à partir de quand ?",
      verification: { type: "qcm", choix: ["mois 4", "mois 5", "mois 6"], bonne: 1 },
      dessin: arcade,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le soutien scolaire",
      sorte: "piege",
      question: `Une plateforme de soutien scolaire a 1 000 inscrits en 2024 : c'est u<sub>0</sub>.<br>Chaque année, + 25 %.<br>Lina répond « 4 », car u<sub>4</sub> est le premier terme au-dessus de 2 000.<br><br><b>En quelle année</b> la plateforme dépasse-t-elle 2 000 inscrits ?`,
      reponse: `Lina a trouvé le rang n = 4. Mais on demande une année !<br>n = 0, c'est 2024. Donc n = 4, c'est 2024 + 4.<br><span class="big">En 2028</span>.`,
      consigne: "u₀ = 1 000 en 2024, + 25 % par an. Plus de 2 000 en quelle année ?",
      verification: { type: "qcm", choix: ["2028", "2027", "4"], bonne: 0 },
      dessin: soutien,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le data center",
      sorte: "defi",
      question: `Un data center rejette 500 tonnes de CO<sub>2</sub> par an.<br>Il réduit ses rejets de 10 % chaque année.<br>Objectif : moins de 250 tonnes, la moitié.<br><br><b>Au bout de combien d'années</b> l'objectif est-il atteint ?`,
      reponse: `Ce n'est pas 5 ans : les 10 % portent sur un nombre qui baisse.<br>500 → 450 → 405 → 364,5 → 328,05 → 295,25 → 265,72 → 239,15.<br>Il faut <span class="big">7 ans</span>.`,
      consigne: "500 t, − 10 % par an. Moins de 250 t au bout de combien d'années ?",
      verification: { type: "qcm", choix: ["5 ans", "6 ans", "7 ans"], bonne: 2 },
      dessin: datacenter,
    },
  ],
};

export default problemes;
