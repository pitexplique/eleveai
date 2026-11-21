// Énigmes à projeter — STMG (1re), notion indépendance de deux événements
// (l'agence bancaire, le fabricant de jeans, la téléconsultation, le loueur de
// vans, piège de la biscuiterie, défi du chenil). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, r, svg, t } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { ind } from "../dessins-tle";

const coul = (rose: [number, number][]) => (i: number, j: number) =>
  rose.some(([a, b]) => a === i && b === j) ? C.rose : i === 0 || j === 0 ? C.pale : C.craie;

const banque = svg("Agence bancaire : P de B vaut 0,4 et P indice A de B vaut 0,4",
  r(30, 50, 195, 130, C.bleu, 0.15, 3, 10) + t(127, 100, "P(B)", C.pale, 30) + t(127, 155, "0,4", C.craie, 40) +
    r(255, 50, 195, 130, C.jaune, 0.15, 3, 10) + t(352, 100, `${ind("P", "A", "(B)")}`, C.pale, 30) + t(352, 155, "0,4", C.craie, 40) +
    t(240, 235, "A : le client a moins de 30 ans", C.pale, 21) + t(240, 270, "B : il a une carte en ligne", C.pale, 21) +
    t(240, 350, `A et B indépendants${NB}?`, C.rose, 27));

const jeans = svg("Jeans : défaut de couture 0,05, défaut de teinture 0,1, les deux défauts sont indépendants",
  r(40, 50, 400, 70, C.bleu, 0.15, 3, 10) + t(240, 95, "défaut de couture : 0,05", C.craie, 25) +
    r(40, 140, 400, 70, C.jaune, 0.15, 3, 10) + t(240, 185, "défaut de teinture : 0,1", C.craie, 25) +
    t(240, 260, "les deux défauts sont indépendants", C.pale, 21) +
    t(240, 350, `les deux défauts à la fois${NB}?`, C.rose, 26));

const teleconsult = svg("Téléconsultations : le soir 20 patients de moins de 40 ans sur 50 ; en journée 60 sur 150 ; 80 sur 200 en tout",
  tableau(20, 45, [120, 130, 120, 70], 55, [["", "moins de 40", "40 et plus", "total"], ["le soir", 20, 30, 50], ["la journée", 60, 90, 150], ["total", 80, 120, 200]], coul([[1, 1], [1, 3], [3, 1]]), 21) +
    t(240, 300, "A : moins de 40 ans · B : le soir", C.pale, 21) +
    t(240, 365, `A et B indépendants${NB}?`, C.rose, 27));

const vans = svg("Loueur de vans : P de A vaut 0,3, P de B vaut 0,4, P de A et B vaut 0,2",
  t(240, 75, "A : le client a des enfants", C.pale, 21) + t(240, 110, "B : il prend le porte-vélos", C.pale, 21) +
    r(90, 140, 300, 150, C.bleu, 0.15, 3, 10) +
    t(240, 180, "P(A) = 0,3", C.craie, 27) + t(240, 222, "P(B) = 0,4", C.craie, 27) + t(240, 264, "P(A ∩ B) = 0,2", C.jaune, 27) +
    t(240, 360, `A et B indépendants${NB}?`, C.rose, 27));

const biscuits = svg("Biscuiterie : paquets au chocolat 0,3, paquets à la vanille 0,5, un seul parfum par paquet ; Léo calcule 0,3 fois 0,5",
  r(40, 50, 180, 110, C.jaune, 0.15, 3, 10) + t(130, 95, "chocolat", C.craie, 26) + t(130, 135, "0,3", C.craie, 28) +
    r(260, 50, 180, 110, C.bleu, 0.15, 3, 10) + t(350, 95, "vanille", C.craie, 26) + t(350, 135, "0,5", C.craie, 28) +
    t(240, 210, "un seul parfum par paquet", C.pale, 22) +
    t(240, 270, "Léo : « 0,3 × 0,5 = 0,15 »", C.pale, 23) +
    t(240, 355, `chocolat ET vanille${NB}?`, C.rose, 27));

const chenil = svg("Chenil : 100 chiens, 40 grands chiens, 30 chiens restent plus d'une semaine ; la case grand chien et plus d'une semaine est à trouver",
  tableau(20, 45, [110, 150, 90, 90], 55, [["", "+ d'1 semaine", "moins", "total"], ["grand", "?", "", 40], ["petit", "", "", 60], ["total", 30, 70, 100]], coul([[1, 1]]), 20) +
    t(240, 300, "A : grand chien · B : plus d'une semaine", C.pale, 20) +
    t(240, 365, `combien pour l'indépendance${NB}?`, C.rose, 25));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "proba_independance",
  titre: "Énigmes de l'indépendance de deux événements",
  description: "L'agence bancaire, le fabricant de jeans, la téléconsultation, le loueur de vans, le piège de la biscuiterie, le défi du chenil : reconnaître l'indépendance, utiliser P(A ∩ B) = P(A) × P(B), le vérifier par un calcul et ne pas confondre indépendants et incompatibles.",
  problemes: [
    {
      tag: "Énigme 1 · L'agence bancaire",
      titre: "Reconnaître l'indépendance",
      question: `Une agence bancaire étudie ses clients.<br>A : « le client a moins de 30 ans ». B : « il a une carte en ligne ».<br>P(B) = 0,4 et P<sub>A</sub>(B) = 0,4.<br><br><b>A et B sont-ils indépendants</b> ?`,
      reponse: `Savoir que le client a moins de 30 ans ne change rien : la proba reste 0,4.<br><span class="big">Oui, car P<sub>A</sub>(B) = P(B)</span>.`,
      consigne: "A et B sont-ils indépendants ?",
      verification: { type: "qcm", choix: ["oui, car P_A(B) = P(B)", "non, car P_A(B) n'est pas P(A)", "on ne peut pas savoir"], bonne: 0 },
      dessin: banque,
    },
    {
      tag: "Énigme 2 · Le fabricant de jeans",
      titre: "Utiliser le produit",
      question: `Un fabricant de jeans contrôle sa production.<br>Un jean a un défaut de couture avec la proba 0,05.<br>Il a un défaut de teinture avec la proba 0,1.<br>Les deux défauts sont indépendants.<br><br><b>Quelle est la proba</b> qu'un jean ait les deux défauts ?`,
      reponse: `Indépendants : on multiplie.<br>0,05 × 0,1 = <span class="big">0,005</span>.<br>Cela fait 5 jeans sur 1${NB}000.`,
      consigne: "Proba d'avoir les deux défauts ?",
      verification: { type: "courte", attendus: ["0,005", "0.005", "0,5 %", "0,5%", "0.5%"] },
      dessin: jeans,
    },
    {
      tag: "Énigme 3 · La téléconsultation",
      titre: "Justifier par un calcul",
      question: `Un site de téléconsultation compte 200 consultations.<br>A : « le patient a moins de 40 ans ». B : « la consultation a lieu le soir ».<br><br><b>A et B sont-ils indépendants</b> ?`,
      reponse: `P(A) = 80 ÷ 200 = 0,4 et P(B) = 50 ÷ 200 = 0,25.<br>P(A) × P(B) = 0,1. Et P(A ∩ B) = 20 ÷ 200 = 0,1.<br><span class="big">Oui : les deux valent 0,1</span>.`,
      consigne: "A et B sont-ils indépendants ?",
      verification: { type: "qcm", choix: ["non, car 20 n'est pas 50", "oui : 0,4 × 0,25 = 0,1 = P(A ∩ B)", "on ne peut pas savoir sans arbre"], bonne: 1 },
      dessin: teleconsult,
    },
    {
      tag: "Énigme 4 · Le loueur de vans",
      titre: "Montrer qu'ils ne le sont pas",
      question: `Un loueur de vans étudie ses clients.<br>A : « le client a des enfants ». B : « il prend le porte-vélos ».<br>P(A) = 0,3, P(B) = 0,4 et P(A ∩ B) = 0,2.<br><br><b>A et B sont-ils indépendants</b> ?`,
      reponse: `0,3 × 0,4 = 0,12. Mais P(A ∩ B) = 0,2.<br><span class="big">Non : 0,12 n'est pas 0,2</span>.<br>Les familles prennent plus souvent le porte-vélos.`,
      consigne: "A et B sont-ils indépendants ?",
      verification: { type: "qcm", choix: ["oui, car 0,2 est plus petit que 0,3", "oui, car P(A ∩ B) n'est pas nul", "non : 0,3 × 0,4 = 0,12, pas 0,2"], bonne: 2 },
      dessin: vans,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La biscuiterie",
      sorte: "piege",
      question: `Une biscuiterie fait des paquets au chocolat (proba 0,3) ou à la vanille (proba 0,5).<br>Un paquet n'a qu'un seul parfum.<br>Léo calcule 0,3 × 0,5 = 0,15.<br><br><b>Quelle est la proba</b> qu'un paquet soit au chocolat ET à la vanille ?`,
      reponse: `C'est impossible : un paquet n'a qu'un parfum.<br>P(A ∩ B) = <span class="big">0</span>.<br>Les événements sont incompatibles, pas indépendants : on ne multiplie pas.`,
      consigne: "Proba d'un paquet chocolat ET vanille ?",
      verification: { type: "courte", attendus: ["0", "0 %", "0%", "zéro"] },
      dessin: biscuits,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le chenil",
      sorte: "defi",
      question: `Un chenil garde 100 chiens. 40 sont de grands chiens.<br>30 chiens restent plus d'une semaine.<br>A : « grand chien ». B : « reste plus d'une semaine ».<br><br><b>Combien de grands chiens</b> doivent rester plus d'une semaine pour que A et B soient indépendants ?`,
      reponse: `Il faut P(A ∩ B) = P(A) × P(B) = 0,4 × 0,3 = 0,12.<br>Sur 100 chiens : 0,12 × 100 = <span class="big">12 grands chiens</span>.`,
      consigne: "Combien de grands chiens restent plus d'une semaine ?",
      verification: { type: "courte", attendus: ["12", "12 chiens", "12 grands chiens"] },
      dessin: chenil,
    },
  ],
};

export default problemes;
