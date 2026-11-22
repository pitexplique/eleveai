// Énigmes à projeter — première (sans spé maths), notion alea_conditionnelle_calcul
// (le garage, l'auberge de jeunesse, les œufs de plein air, le test de grippe,
// piège du détecteur de faux billets, défi du jardin botanique). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { tableau } from "../dessins-2de";

/** P avec un indice : P_cond(ev). */
const Ps = (cond: string, ev: string) => `P<tspan dy="7" font-size="15">${cond}</tspan><tspan dy="-7">(${ev})</tspan>`;

const coul = (cible: [number, number][]) => (i: number, j: number) =>
  cible.some(([a, b]) => a === i && b === j) ? C.jaune : i === 0 || j === 0 ? C.pale : C.craie;

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 19) =>
  r(30, y, 420, 22 + 30 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 32 + 30 * k, s, c, taille)).join("");

const garage = svg("Un garage : R la voiture vient pour une révision, N on change les pneus ; P(R) = 0,5 et P(R et N) = 0,2 ; formule P sachant R de N égale P(R et N) divisé par P(R)",
  cadre(30, ["R : la voiture vient pour une révision", "N : on change les pneus"]) +
    t(240, 170, "P(R) = 0,5", C.bleu, 28) + t(240, 220, "P(R ∩ N) = 0,2", C.jaune, 28) +
    t(240, 295, `${Ps("R", "N")} = P(R ∩ N) ÷ P(R)`, C.craie, 24) +
    t(240, 385, `${Ps("R", "N")}${NB}?`, C.rose, 26));

const auberge = svg("Une bande : tous les voyageurs d'une auberge ; 60 % sont étrangers ; 35 % des étrangers restent plus de 3 nuits",
  t(160, 105, "étrangers : 60 %", C.bleu, 19) + t(360, 105, "autres : 40 %", C.pale, 19) +
    r(40, 120, 400, 70, C.pale, 0.12, 3, 6) + r(40, 120, 240, 70, C.bleu, 0.3, 3, 6) + r(40, 120, 84, 70, C.jaune, 0.55, 3, 6) +
    l(82, 196, 82, 222, C.jaune, 3) +
    t(40, 248, "35 % des étrangers restent", C.jaune, 19, "start") + t(40, 276, "plus de 3 nuits", C.jaune, 19, "start") +
    t(240, 330, "étrangers ET plus de 3 nuits", C.craie, 20) +
    t(240, 385, `P(E ∩ L)${NB}?`, C.rose, 26));

const oeufs = svg("Deux évènements sur les œufs d'une ferme : V l'œuf vient d'une poule en plein air, G l'œuf est gros ; P sachant V de G = 0,7",
  cadre(30, ["V : l'œuf vient d'une poule en plein air", "G : l'œuf est gros"]) +
    t(240, 215, `${Ps("V", "G")} = 0,7`, C.jaune, 40) +
    t(240, 290, "on sait que … ; on regarde si …", C.pale, 20) +
    t(240, 385, `quelle phrase le dit${NB}?`, C.rose, 24));

const grippe = svg("Tableau de 1 000 personnes testées en pharmacie : grippés 180 test positif, 20 test négatif, total 200 ; non grippés 30 et 770, total 800 ; totaux 210, 790, 1 000",
  tableau(20, 60, [150, 100, 100, 90], 56, [["", "test +", "test −", "total"], ["grippés", 180, 20, 200], ["non grippés", 30, 770, 800], ["total", 210, 790, "1 000"]], coul([[1, 2], [1, 3]]), 20) +
    t(240, 330, "on choisit une personne grippée", C.craie, 20) + t(240, 385, `P(test −)${NB}?`, C.rose, 26));

const billets = svg("Tableau de 10 000 billets passés au détecteur : faux 99 sonne, 1 ne sonne pas, total 100 ; vrais 99 et 9 801, total 9 900 ; totaux 198, 9 802, 10 000",
  t(240, 40, "« fiable à 99 % »", C.bleu, 20) +
    tableau(20, 60, [100, 110, 140, 90], 56, [["", "sonne", "ne sonne pas", "total"], ["faux", 99, 1, 100], ["vrais", 99, "9 801", "9 900"], ["total", 198, "9 802", "10 000"]], coul([[1, 1], [3, 1]]), 20) +
    t(240, 330, "le détecteur sonne", C.craie, 20) + t(240, 385, `P(faux billet)${NB}?`, C.rose, 26));

const botanique = svg("Trois phrases sur les visiteurs d'un jardin botanique : 30 % viennent en bus ; parmi eux 60 % achètent une plante ; en tout 50 % achètent une plante",
  cadre(25, ["B · 30 % des visiteurs viennent en bus"]) +
    cadre(100, ["parmi ceux venus en bus,", "60 % achètent une plante (A)"]) +
    cadre(205, ["en tout, 50 % des visiteurs", "achètent une plante"]) +
    t(240, 385, `${Ps("A", "B")}${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "alea_conditionnelle_calcul",
  titre: "Énigmes du calcul d'une probabilité conditionnelle",
  description: "Le garage, l'auberge de jeunesse, les œufs de plein air, le test de grippe, le piège du détecteur de faux billets, le défi du jardin botanique : utiliser la formule P_A(B) = P(A ∩ B) ÷ P(A), calculer une intersection, lire un faux négatif et un faux positif.",
  problemes: [
    {
      tag: "Énigme 1 · Le garage",
      titre: "La formule",
      question: `Dans un garage, la moitié des voitures viennent pour une révision : P(R) = 0,5.<br>Et 20 % des voitures font une révision ET changent leurs pneus : P(R ∩ N) = 0,2.<br><br><b>Quelle est la probabilité</b> de changer les pneus, sachant que la voiture vient pour une révision ?`,
      reponse: `P<sub>R</sub>(N) = P(R ∩ N) ÷ P(R) = 0,2 ÷ 0,5 = <span class="big">0,4</span>.<br>Parmi les voitures en révision, 40 % repartent avec des pneus neufs.`,
      consigne: "P(R) = 0,5 et P(R ∩ N) = 0,2 : que vaut la probabilité de N sachant R ?",
      verification: { type: "courte", attendus: ["0,4", "0.4", "40%"] },
      dessin: garage,
    },
    {
      tag: "Énigme 2 · L'auberge de jeunesse",
      titre: "Calculer une intersection",
      question: `Dans une auberge de jeunesse, 60 % des voyageurs sont étrangers (E).<br>Parmi les étrangers, 35 % restent plus de 3 nuits (L).<br><br><b>Quelle est la probabilité</b> qu'un voyageur soit étranger ET reste plus de 3 nuits ?`,
      reponse: `P(E ∩ L) = P(E) × P<sub>E</sub>(L) = 0,6 × 0,35 = <span class="big">0,21</span>.<br>On prend 35 % … des 60 % : 21 % des voyageurs.`,
      consigne: "60 % d'étrangers, dont 35 % restent plus de 3 nuits : que vaut P(E ∩ L) ?",
      verification: { type: "qcm", choix: ["0,21", "0,95", "0,35"], bonne: 0 },
      dessin: auberge,
    },
    {
      tag: "Énigme 3 · Les œufs de plein air",
      titre: "Dire la phrase",
      question: `Une ferme vend des œufs. On en choisit un au hasard.<br>V : « l'œuf vient d'une poule en plein air » ; G : « l'œuf est gros ».<br>On lit : P<sub>V</sub>(G) = 0,7.<br><br><b>Quelle phrase</b> dit la même chose ?`,
      reponse: `P<sub>V</sub>(G) : on <b>sait</b> que l'œuf vient du plein air (V), on regarde s'il est gros (G).<br><span class="big">Parmi les œufs de plein air, 70 % sont gros.</span>`,
      consigne: "P sachant V de G = 0,7 : quelle phrase dit la même chose ?",
      verification: { type: "qcm", choix: ["70 % des œufs sont de plein air et gros", "Parmi les œufs de plein air, 70 % sont gros", "Parmi les gros œufs, 70 % sont de plein air"], bonne: 1 },
      dessin: oeufs,
    },
    {
      tag: "Énigme 4 · Le test de grippe",
      titre: "Le faux négatif",
      question: `Une pharmacie fait un test rapide de la grippe à 1 000 personnes.<br>Parmi les 200 personnes grippées, le test est positif pour 180.<br><br><b>Quelle est la probabilité</b> que le test soit négatif, sachant que la personne a la grippe ?`,
      reponse: `On ne garde que les 200 grippés : 20 ont un test négatif. Ce sont les <b>faux négatifs</b>.<br>P<sub>grippe</sub>(test −) = 20 ÷ 200 = <span class="big">0,1</span>. Le test repère 90 % des malades : c'est sa sensibilité.`,
      consigne: "20 tests négatifs parmi les 200 personnes grippées : quelle probabilité ?",
      verification: { type: "courte", attendus: ["0,1", "0.1", "10%"] },
      dessin: grippe,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le détecteur de faux billets",
      sorte: "piege",
      question: `Un magasin passe 10 000 billets au détecteur ; 100 sont faux. Le détecteur est « fiable à 99 % » : il sonne pour 99 % des faux, et ne sonne que pour 1 % des vrais.<br><br>Le détecteur sonne. <b>Quelle est la probabilité</b> que le billet soit faux ?`,
      reponse: `Il sonne pour 99 faux billets… mais aussi pour 1 % des 9 900 vrais : 99 vrais ! En tout, il sonne 198 fois.<br>P<sub>sonne</sub>(faux) = 99 ÷ 198 = <span class="big">0,5</span>. Une fois sur deux, c'est une fausse alerte : 0,99, c'était P<sub>faux</sub>(sonne).`,
      consigne: "Le détecteur sonne 198 fois, dont 99 pour un faux billet : quelle probabilité que le billet soit faux ?",
      verification: { type: "qcm", choix: ["0,99", "0,01", "0,5"], bonne: 2 },
      dessin: billets,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le jardin botanique",
      sorte: "defi",
      question: `Dans un jardin botanique, 30 % des visiteurs viennent en bus (B). Parmi eux, 60 % achètent une plante (A). En tout, 50 % des visiteurs achètent une plante.<br><br>On choisit un visiteur qui a acheté une plante. <b>Quelle est la probabilité</b> qu'il soit venu en bus ?`,
      reponse: `D'abord P(A ∩ B) = 0,3 × 0,6 = 0,18.<br>Puis P<sub>A</sub>(B) = P(A ∩ B) ÷ P(A) = 0,18 ÷ 0,5 = <span class="big">0,36</span>. On a « retourné » la condition.`,
      consigne: "P(B) = 0,3, P sachant B de A = 0,6, P(A) = 0,5 : que vaut la probabilité de B sachant A ?",
      verification: { type: "courte", attendus: ["0,36", "0.36", "36%"] },
      dessin: botanique,
    },
  ],
};

export default problemes;
