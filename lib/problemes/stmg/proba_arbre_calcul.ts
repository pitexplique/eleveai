// Énigmes à projeter — STMG (1re), notion arbre : chemins et probabilités
// totales (la fabrique de casseroles, l'usine de bouilloires, la salle de
// réalité virtuelle, la boutique de prêt-à-porter, piège du magasin de
// déstockage, défi des mobil-homes du camping). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { arbre2 } from "../dessins-2de";
import { ind } from "../dessins-tle";

const casseroles = svg("Arbre des casseroles : machine A 0,6 puis défaut D 0,05 ; machine B 0,4 puis défaut 0,1",
  arbre2([["A", "0,6"], ["B", "0,4"]], [[["D", "0,05"], ["D̄", "0,95"]], [["D", "0,1"], ["D̄", "0,9"]]]) +
    t(240, 395, `P(A ∩ D)${NB}?`, C.rose, 28));

const bouilloires = svg("Arbre des bouilloires : chaîne A 0,7 puis défaut 0,02 ; chaîne B 0,3 puis défaut 0,05",
  arbre2([["A", "0,7"], ["B", "0,3"]], [[["D", "0,02"], ["D̄", "0,98"]], [["D", "0,05"], ["D̄", "0,95"]]]) +
    t(240, 395, `quel calcul pour P(D)${NB}?`, C.rose, 26));

const virtuelle = svg("Arbre de la salle de réalité virtuelle : en groupe G 0,7 puis revient R 0,9 ; seul S 0,3 puis revient 0,5",
  arbre2([["G", "0,7"], ["S", "0,3"]], [[["R", "0,9"], ["R̄", "0,1"]], [["R", "0,5"], ["R̄", "0,5"]]]) +
    t(240, 395, `P(R)${NB}?`, C.rose, 28));

const pretaporter = svg("Arbre de la boutique : achat en promo P 0,3 puis retour R 0,2 ; sans promo 0,7 puis retour 0,05 ; 1 000 tickets",
  arbre2([["P", "0,3"], ["P̄", "0,7"]], [[["R", "0,2"], ["R̄", "0,8"]], [["R", "0,05"], ["R̄", "0,95"]]], { yb: 300 }) +
    t(240, 355, "1 000 tickets de caisse", C.pale, 21) +
    t(240, 400, `combien en promo ET rendus${NB}?`, C.rose, 24));

const destockage = svg("Arbre du déstockage : entrepôt A 0,8 puis défaut 0,1 ; entrepôt B 0,2 puis défaut 0,6 ; Zoé fait la moyenne de 0,1 et 0,6",
  arbre2([["A", "0,8"], ["B", "0,2"]], [[["D", "0,1"], ["D̄", "0,9"]], [["D", "0,6"], ["D̄", "0,4"]]], { yb: 300 }) +
    t(240, 355, "Zoé : « (0,1 + 0,6) ÷ 2 = 0,35 »", C.pale, 21) +
    t(240, 400, `P(D)${NB}?`, C.rose, 28));

const mobilhomes = svg("Arbre des mobil-homes : haute saison H 0,4 puis réclamation R 0,1 ; hors saison 0,6 puis réclamation 0,2",
  arbre2([["H", "0,4"], ["H̄", "0,6"]], [[["R", "0,1"], ["R̄", "0,9"]], [["R", "0,2"], ["R̄", "0,8"]]]) +
    t(240, 400, `${ind("P", "R", "(H)")}${NB}?`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "proba_arbre_calcul",
  titre: "Énigmes de l'arbre : chemins et probabilités totales",
  description: "La fabrique de casseroles, l'usine de bouilloires, la salle de réalité virtuelle, la boutique de prêt-à-porter, le piège du magasin de déstockage, le défi des mobil-homes du camping : multiplier le long d'un chemin, ajouter les chemins, passer de l'arbre aux effectifs.",
  problemes: [
    {
      tag: "Énigme 1 · La fabrique de casseroles",
      titre: "La probabilité d'un chemin",
      question: `Une fabrique de casseroles a deux machines.<br>60 % des casseroles sortent de la machine A.<br>Sur la machine A, 5 % ont un défaut (D).<br><br><b>Quelle est la probabilité</b> qu'une casserole vienne de A ET ait un défaut ?`,
      reponse: `Le chemin A puis D : on multiplie les branches.<br>0,6 × 0,05 = <span class="big">0,03</span>.`,
      consigne: "Probabilité : machine A ET un défaut ?",
      verification: { type: "courte", attendus: ["0,03", "0.03", "3 %", "3%", "3/100"] },
      dessin: casseroles,
    },
    {
      tag: "Énigme 2 · L'usine de bouilloires",
      titre: "Ajouter les chemins",
      question: `Une usine de bouilloires a deux chaînes.<br>La chaîne A fait 70 % des bouilloires, avec 2 % de défauts.<br>La chaîne B fait 30 %, avec 5 % de défauts.<br><br><b>Quel calcul donne P(D)</b>, la probabilité d'un défaut ?`,
      reponse: `Deux chemins mènent à D : A puis D, B puis D.<br>On multiplie sur chaque chemin, puis on ajoute.<br><span class="big">0,7 × 0,02 + 0,3 × 0,05</span> = 0,029.`,
      consigne: "Quel calcul donne la probabilité d'un défaut ?",
      verification: { type: "qcm", choix: ["0,02 + 0,05", "0,7 × 0,02 + 0,3 × 0,05", "0,7 × 0,02 × 0,3 × 0,05"], bonne: 1 },
      dessin: bouilloires,
    },
    {
      tag: "Énigme 3 · La salle de réalité virtuelle",
      titre: "Les probabilités totales",
      question: `Une salle de réalité virtuelle : 70 % des clients viennent en groupe, 30 % seuls.<br>En groupe, 90 % reviennent. Seuls, 50 % reviennent.<br><br><b>Quelle est la probabilité</b> qu'un client revienne ?`,
      reponse: `Groupe puis revient : 0,7 × 0,9 = 0,63.<br>Seul puis revient : 0,3 × 0,5 = 0,15.<br>P(R) = 0,63 + 0,15 = <span class="big">0,78</span>.`,
      consigne: "Probabilité qu'un client revienne ?",
      verification: { type: "courte", attendus: ["0,78", "0.78", "78 %", "78%"] },
      dessin: virtuelle,
    },
    {
      tag: "Énigme 4 · La boutique de prêt-à-porter",
      titre: "De l'arbre aux effectifs",
      question: `Une boutique de prêt-à-porter a 1 000 tickets de caisse.<br>30 % des achats sont en promo. Parmi eux, 20 % sont rendus.<br><br><b>Combien de tickets</b> sont en promo ET rendus ?`,
      reponse: `Promo : 1 000 × 0,3 = 300 tickets.<br>Rendus parmi eux : 300 × 0,2 = <span class="big">60 tickets</span>.<br>C'est la case « promo et rendu » du tableau croisé.`,
      consigne: "Combien de tickets sont en promo ET rendus ?",
      verification: { type: "qcm", choix: ["200", "300", "60"], bonne: 2 },
      dessin: pretaporter,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le magasin de déstockage",
      sorte: "piege",
      question: `Un magasin de déstockage a deux entrepôts.<br>80 % des articles viennent de A : 10 % ont un défaut.<br>20 % viennent de B : 60 % ont un défaut.<br>Zoé : « (0,1 + 0,6) ÷ 2 = 0,35 ».<br><br><b>Quelle est la probabilité</b> d'un article avec défaut ?`,
      reponse: `A pèse bien plus que B : pas de moyenne simple.<br>0,8 × 0,1 + 0,2 × 0,6 = 0,08 + 0,12 = <span class="big">0,2</span>.`,
      consigne: "Probabilité d'un article avec défaut ?",
      verification: { type: "qcm", choix: ["0,2", "0,35", "0,7"], bonne: 0 },
      dessin: destockage,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les mobil-homes du camping",
      sorte: "defi",
      question: `Un camping loue des mobil-homes.<br>40 % des locations sont en haute saison (H).<br>En haute saison, 10 % des locations ont une réclamation (R). Hors saison, 20 %.<br><br>On reçoit une réclamation.<br><b>Quelle est la probabilité</b> qu'elle vienne de la haute saison ?`,
      reponse: `P(H ∩ R) = 0,4 × 0,1 = 0,04. P(R) = 0,04 + 0,6 × 0,2 = 0,16.<br>P<sub>R</sub>(H) = 0,04 ÷ 0,16 = <span class="big">0,25</span>.`,
      consigne: "Réclamation reçue : probabilité qu'elle vienne de la haute saison ?",
      verification: { type: "courte", attendus: ["0,25", "0.25", "1/4", "25 %", "25%"] },
      dessin: mobilhomes,
    },
  ],
};

export default problemes;
