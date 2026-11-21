// Énigmes à projeter — première (sans spé maths), notion auto_proba_lecture
// (les vélos en libre-service, l'avant-première au cinéma, les colis de la
// boutique en ligne, le trail, piège de la cagette de fruits, défi du ferry).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { frac } from "../outils";
import { tableau, arbre2 } from "../dessins-2de";

const jaune = (cible: [number, number][]) => (i: number, j: number) => (cible.some(([a, b]) => a === i && b === j) ? C.jaune : i === 0 || j === 0 ? C.pale : C.craie);

const velos = svg("Un tableau de 500 vélos : électriques 20 avec incident et 180 sans ; classiques 45 avec incident et 255 sans",
  tableau(30, 60, [140, 100, 110, 70], 56, [["", "incident", "sans", "total"], ["électrique", 20, 180, 200], ["classique", 45, 255, 300], ["total", 65, 435, 500]], jaune([[1, 1]]), 20) +
    t(240, 330, "un vélo au hasard", C.craie, 22) + t(240, 385, `électrique ET incident${NB}?`, C.rose, 24));

const film = svg("Un tableau de 400 spectateurs : 160 ados dont 120 ont aimé, 240 adultes dont 120 ont aimé",
  tableau(40, 60, [130, 90, 110, 70], 56, [["", "aimé", "pas aimé", "total"], ["ados", 120, 40, 160], ["adultes", 120, 120, 240], ["total", 240, 160, 400]], jaune([[1, 1], [1, 3]]), 20) +
    t(240, 330, "on choisit un ado", C.craie, 22) + t(240, 385, `P(il a aimé)${NB}?`, C.rose, 24));

const colis = svg("Un arbre : relais 0,6 puis retard 0,1 ; domicile 0,4 puis retard 0,25",
  arbre2([["R", "0,6"], ["D", "0,4"]], [[["retard", "0,1"], ["à l'heure", "0,9"]], [["retard", "0,25"], ["à l'heure", "0,75"]]], { yb: 300 }) +
    t(240, 360, "R : point relais · D : domicile", C.pale, 18) + t(240, 400, `P sachant D (retard)${NB}?`, C.rose, 24));

const trail = svg("Un tableau de 320 coureurs : 100 femmes dont 90 finissent, 220 hommes dont 180 finissent",
  tableau(40, 60, [130, 90, 110, 70], 56, [["", "finit", "abandon", "total"], ["femmes", 90, 10, 100], ["hommes", 180, 40, 220], ["total", 270, 50, 320]], jaune([[1, 1], [3, 1]]), 20) +
    t(240, 330, "parmi les finisseurs", C.craie, 22) + t(240, 385, `la part des femmes${NB}?`, C.rose, 24));

const fruits = svg("Un tableau de 200 fruits : 120 pommes dont 30 abîmées, 80 poires dont 30 abîmées",
  tableau(40, 60, [130, 100, 100, 70], 56, [["", "abîmés", "bons", "total"], ["pommes", 30, 90, 120], ["poires", 30, 50, 80], ["total", 60, 140, 200]], jaune([[1, 1], [3, 1]]), 20) +
    t(240, 330, "on tire un fruit abîmé", C.craie, 22) + t(240, 385, `P(pomme)${NB}?`, C.rose, 24));

const ferry = svg("Un arbre : voiture 0,4 puis aller-retour 0,75 ; piéton 0,6 puis aller-retour 0,5",
  arbre2([["V", "0,4"], ["P", "0,6"]], [[["AR", "0,75"], ["aller", "0,25"]], [["AR", "0,5"], ["aller", "0,5"]]], { yb: 300 }) +
    t(240, 360, "V : voiture · P : piéton", C.pale, 18) + t(240, 400, `sachant AR, P(V)${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_proba_lecture",
  titre: "Énigmes des probabilités : lire un tableau, un arbre",
  description: "Les vélos en libre-service, l'avant-première au cinéma, les colis de la boutique en ligne, le trail, le piège de la cagette de fruits, le défi du ferry : lire P(A ∩ B), une probabilité conditionnelle, et ne pas confondre « sachant A » et « sachant B ».",
  problemes: [
    {
      tag: "Énigme 1 · Les vélos en libre-service",
      titre: "Lire une intersection",
      question: `Le tableau classe les 500 vélos d'une ville selon leur type et un incident ce mois-ci. On choisit un vélo au hasard.<br><br><b>Quelle est la probabilité</b> qu'il soit électrique <b>et</b> ait eu un incident ?`,
      reponse: `On lit la case au croisement : 20 vélos sur 500.<br>P(E ∩ I) = ${frac(20, 500)} = <span class="big">0,04</span>.`,
      consigne: "20 vélos électriques avec incident sur 500 vélos : quelle probabilité ?",
      verification: { type: "courte", attendus: ["0,04"] },
      dessin: velos,
    },
    {
      tag: "Énigme 2 · L'avant-première",
      titre: "Sachant que c'est un ado",
      question: `Après une avant-première, on a interrogé 400 spectateurs. On choisit un <b>ado</b> au hasard.<br><br><b>Quelle est la probabilité</b> qu'il ait aimé le film ?`,
      reponse: `On ne regarde que la ligne des ados : 120 ont aimé sur 160.<br>P<sub>ado</sub>(aimé) = ${frac(120, 160)} = <span class="big">0,75</span>.`,
      consigne: "120 ados ont aimé sur 160 ados : quelle probabilité qu'un ado ait aimé ?",
      verification: { type: "qcm", choix: ["0,3", "0,75", "0,5"], bonne: 1 },
      dessin: film,
    },
    {
      tag: "Énigme 3 · Les colis",
      titre: "Lire une branche",
      question: `Une boutique en ligne livre 60 % des colis en point relais (R) et 40 % à domicile (D). L'arbre donne les retards.<br><br>Un colis est livré à domicile. <b>Quelle est la probabilité</b> qu'il soit en retard ?`,
      reponse: `« Sachant D » : on suit la branche D, puis la branche « retard ».<br>P<sub>D</sub>(retard) = <span class="big">0,25</span>. Ce n'est pas 0,4 × 0,25 : on sait déjà que le colis va à domicile.`,
      consigne: "D'après l'arbre, un colis livré à domicile : probabilité d'être en retard ?",
      verification: { type: "qcm", choix: ["0,4", "0,1", "0,25"], bonne: 2 },
      dessin: colis,
    },
    {
      tag: "Énigme 4 · Le trail",
      titre: "Dans l'autre sens",
      question: `Le tableau donne les 320 coureurs d'un trail en montagne. On choisit au hasard un coureur qui a fini la course.<br><br><b>Quelle est la probabilité</b> que ce soit une femme ?`,
      reponse: `On ne garde que la colonne « finit » : 270 coureurs, dont 90 femmes.<br>P<sub>finit</sub>(femme) = ${frac(90, 270)} = <span class="big">${frac(1, 3)}</span>.`,
      consigne: "90 femmes parmi les 270 coureurs qui finissent : quelle probabilité ?",
      verification: { type: "courte", attendus: ["1/3", "0,33", "0,333"] },
      dessin: trail,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La cagette de fruits",
      sorte: "piege",
      question: `Une cagette contient 120 pommes (30 abîmées) et 80 poires (30 abîmées). On tire un fruit au hasard : il est <b>abîmé</b>.<br><br><b>Quelle est la probabilité</b> que ce soit une pomme ?`,
      reponse: `Le piège : répondre ${frac(30, 120)} = 0,25, c'est la probabilité d'être abîmée <b>sachant pomme</b>.<br>Ici, on sait « abîmé » : 30 pommes sur 60 fruits abîmés, ${frac(30, 60)} = <span class="big">0,5</span>.`,
      consigne: "30 pommes abîmées, 30 poires abîmées : un fruit abîmé est tiré, probabilité que ce soit une pomme ?",
      verification: { type: "qcm", choix: ["0,5", "0,25", "0,3"], bonne: 0 },
      dessin: fruits,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le ferry",
      sorte: "defi",
      question: `Sur un ferry, 40 % des passagers ont une voiture. 75 % d'entre eux font l'aller-retour. Chez les piétons, c'est 50 %.<br><br>Un passager fait l'aller-retour. <b>Quelle est la probabilité</b> qu'il ait une voiture ?`,
      reponse: `P(V ∩ AR) = 0,4 × 0,75 = 0,3 et P(P ∩ AR) = 0,6 × 0,5 = 0,3. Donc P(AR) = 0,6.<br>P<sub>AR</sub>(V) = 0,3 ÷ 0,6 = <span class="big">0,5</span>. Autant de voitures que de piétons parmi les allers-retours !`,
      consigne: "P(V) = 0,4, P sachant V (AR) = 0,75, P sachant P (AR) = 0,5 : sachant AR, probabilité d'avoir une voiture ?",
      verification: { type: "courte", attendus: ["0,5", "1/2"] },
      dessin: ferry,
    },
  ],
};

export default problemes;
