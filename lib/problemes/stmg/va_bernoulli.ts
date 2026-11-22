// Énigmes à projeter — STMG (1re), notion loi de Bernoulli (la verrerie,
// l'isolation des combles, le bateau-école, le vendeur de tapis de course,
// piège du vélo-taxi, défi du doreur). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, r, svg, t } from "../dessins-ecole";
import { code } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const verre = svg("Verrerie : trois variables aléatoires ; laquelle suit une loi de Bernoulli ?",
  `<path d="M200 60 L280 60 L268 190 Q240 205 212 190 Z" fill="${C.bleu}" fill-opacity="0.15" stroke="${C.craie}" stroke-width="4"/>` +
    `<path d="M248 80 L238 110 L252 130 L242 160" fill="none" stroke="${C.rose}" stroke-width="3"/>` +
    t(240, 260, "deux issues seulement : 1 ou 0", C.pale, 22) +
    t(240, 350, `laquelle est de Bernoulli${NB}?`, C.rose, 27));

const combles = svg("Isolation des combles : 15 clients sur 100 acceptent ; X vaut 1 si le client accepte, 0 sinon",
  r(70, 60, 340, 160, C.bleu, 0.15, 3, 10) +
    t(240, 110, "15 clients sur 100 acceptent", C.craie, 24) + t(240, 155, "X = 1 : il accepte", C.craie, 24) + t(240, 195, "X = 0 : il refuse", C.craie, 24) +
    t(240, 330, `E(X)${NB}?`, C.rose, 32));

const bateau = svg("Bateau-école : formule du tableur SI(ALEA() inférieur à 0,7 ; 1 ; 0) ; que simule-t-elle ?",
  code([["=SI(ALEA()&lt;0,7;1;0)", 0]], { x: 40, y: 80, larg: 400, taille: 26 }) +
    t(240, 220, "1 : l'élève réussit le permis bateau", C.pale, 20) + t(240, 255, "0 : il le rate", C.pale, 20) +
    t(240, 340, `que simule la formule${NB}?`, C.rose, 27));

const R = repereXY(0, 10, 0, 0.4, { gx: 80, gy: 40, gl: 360, gh: 220, px: 1, py: 0.1, ex: 1, ey: 0.1 });
const freq = [0.18, 0.24, 0.2, 0.16, 0.22, 0.26, 0.2, 0.14, 0.22, 0.18];
const tapis = svg("Tapis de course : fréquences de clients qui prennent l'extension de garantie dans 10 échantillons de 50 clients, entre 0,14 et 0,26",
  R.fond + freq.map((f, k) => R.point(k + 1, f)).join("") +
    t(260, 318, "n° de l'échantillon", C.pale, 18) +
    t(240, 375, `autour de quelle valeur${NB}?`, C.rose, 26));

const veloTaxi = svg("Vélo-taxi : 35 clients sur 100 paient par carte ; X vaut 1 si le client paie en espèces ; Tom répond 0,35",
  r(70, 50, 340, 170, C.jaune, 0.15, 3, 10) +
    t(240, 100, "35 % paient par carte", C.craie, 25) + t(240, 145, "X = 1 : il paie en espèces", C.craie, 23) + t(240, 188, "X = 0 : il paie par carte", C.craie, 23) +
    t(240, 265, "Tom : « E(X) = 0,35 »", C.pale, 23) +
    t(240, 350, `E(X)${NB}?`, C.rose, 32));

const doreur = svg("Doreur : 100 échantillons de 40 cadres ; moyenne des fréquences de cadres ratés 0,1 ; combien de ratés sur 300 cadres ?",
  r(60, 50, 360, 170, C.bleu, 0.15, 3, 10) +
    t(240, 100, "100 échantillons de 40 cadres", C.craie, 23) + t(240, 145, "moyenne des fréquences", C.craie, 23) + t(240, 188, "de cadres ratés : 0,1", C.craie, 23) +
    t(240, 330, `ratés sur 300 cadres${NB}?`, C.rose, 27));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "va_bernoulli",
  titre: "Énigmes de la loi de Bernoulli",
  description: "La verrerie, l'isolation des combles, le bateau-école, le vendeur de tapis de course, le piège du vélo-taxi, le défi du doreur : reconnaître une loi de Bernoulli, savoir que E(X) = p, lire une simulation au tableur et des fréquences sur un nuage de points.",
  problemes: [
    {
      tag: "Énigme 1 · La verrerie",
      titre: "Reconnaître une loi de Bernoulli",
      question: `Une verrerie contrôle ses verres.<br>Une loi de Bernoulli n'a que deux valeurs : 1 (succès) et 0.<br><br><b>Laquelle de ces variables suit une loi de Bernoulli</b> ?`,
      reponse: `Le verre est fêlé ou il ne l'est pas : deux issues.<br><span class="big">X = 1 si le verre est fêlé, 0 sinon</span>.<br>Un carton de 6 verres donne 7 valeurs possibles (0 à 6).`,
      consigne: "Laquelle suit une loi de Bernoulli ?",
      verification: { type: "qcm", choix: ["X = 1 si le verre est fêlé, 0 sinon", "X = nombre de verres fêlés dans un carton de 6", "X = prix du verre"], bonne: 0 },
      dessin: verre,
    },
    {
      tag: "Énigme 2 · L'isolation des combles",
      titre: "L'espérance d'une Bernoulli",
      question: `Une entreprise propose l'isolation des combles.<br>15 clients sur 100 acceptent le devis.<br>X vaut 1 si le client accepte, 0 sinon.<br><br><b>Combien vaut E(X)</b> ?`,
      reponse: `E(X) = 1 × 0,15 + 0 × 0,85 = 0,15.<br>Pour une loi de Bernoulli : <span class="big">E(X) = p = 0,15</span>.`,
      consigne: "Combien vaut E(X) ?",
      verification: { type: "courte", attendus: ["0,15", "0.15", "15 %", "15%"] },
      dessin: combles,
    },
    {
      tag: "Énigme 3 · Le bateau-école",
      titre: "Simuler au tableur",
      question: `Un bateau-école simule ses élèves au tableur.<br>Il écrit =SI(ALEA()&lt;0,7;1;0).<br>ALEA() donne un nombre au hasard entre 0 et 1.<br><br><b>Que simule cette formule</b> ?`,
      reponse: `ALEA() est plus petit que 0,7 dans 70 % des cas : la cellule vaut alors 1.<br><span class="big">Un élève qui réussit le permis avec la proba 0,7</span>.`,
      consigne: "Que simule cette formule ?",
      verification: { type: "qcm", choix: ["un élève qui rate avec la proba 0,7", "un élève qui réussit le permis avec la proba 0,7", "70 élèves qui passent le permis"], bonne: 1 },
      dessin: bateau,
    },
    {
      tag: "Énigme 4 · Le vendeur de tapis de course",
      titre: "Lire les fréquences",
      question: `Un vendeur de tapis de course simule 10 échantillons de 50 clients.<br>Chaque point est la fréquence des clients qui prennent l'extension de garantie.<br><br><b>Autour de quelle valeur</b> les points se regroupent-ils ?`,
      reponse: `Les points vont de 0,14 à 0,26.<br>Ils tournent autour de <span class="big">0,2</span> : c'est la proba p du modèle.`,
      consigne: "Autour de quelle valeur se regroupent les points ?",
      verification: { type: "qcm", choix: ["0,5", "50", "0,2"], bonne: 2 },
      dessin: tapis,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le vélo-taxi",
      sorte: "piege",
      question: `Un vélo-taxi note comment paient ses clients.<br>35 % paient par carte, les autres en espèces.<br>X vaut 1 si le client paie en espèces, 0 sinon.<br>Tom répond E(X) = 0,35.<br><br><b>Combien vaut E(X)</b> ?`,
      reponse: `Le succès (X = 1), c'est payer en espèces.<br>p = 1 − 0,35 = 0,65.<br>E(X) = p = <span class="big">0,65</span>.`,
      consigne: "Combien vaut E(X) ?",
      verification: { type: "courte", attendus: ["0,65", "0.65", "65 %", "65%"] },
      dessin: veloTaxi,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le doreur",
      sorte: "defi",
      question: `Un doreur pose de la feuille d'or sur des cadres.<br>Il simule 100 échantillons de 40 cadres.<br>La moyenne des fréquences de cadres ratés est 0,1.<br><br><b>Combien de cadres ratés</b> peut-il attendre sur 300 cadres ?`,
      reponse: `La moyenne des fréquences donne une valeur de p : 0,1.<br>Sur 300 cadres : 300 × 0,1 = <span class="big">30 cadres ratés</span>, environ.`,
      consigne: "Combien de cadres ratés sur 300 ?",
      verification: { type: "courte", attendus: ["30", "30 cadres", "environ 30"] },
      dessin: doreur,
    },
  ],
};

export default problemes;
