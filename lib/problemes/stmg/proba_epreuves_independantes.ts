// Énigmes à projeter — STMG (1re), notion deux épreuves indépendantes
// (le chalutier, la boîte de clés USB, la marbrerie, le rempailleur de chaises,
// piège du vendeur de spas, défi des samoussas d'un snack de Saint-Louis (974)).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, l, p, r, svg, t } from "../dessins-ecole";
import { arbre2 } from "../dessins-2de";

const chalutier = svg("Arbre du chalutier : chaque jour, bonne pêche B avec 0,7, sinon 0,3 ; deux jours de suite",
  arbre2([["B", "0,7"], ["B̄", "0,3"]], [[["B", "0,7"], ["B̄", "0,3"]], [["B", "0,7"], ["B̄", "0,3"]]]) +
    t(240, 395, `B puis B${NB}?`, C.rose, 28));

const cles = svg("Boîte de 10 clés USB dont 2 défectueuses ; on en prend 2, l'une après l'autre, sans remettre la première",
  Array.from({ length: 10 }, (_, i) =>
    r(38 + 42 * i, 70, 28, 60, i < 2 ? C.rose : C.bleu, 0.35, 3, 6) + r(45 + 42 * i, 58, 14, 14, C.pale, 0.3, 2, 2)).join("") +
    t(240, 180, "2 clés défectueuses sur 10", C.pale, 22) +
    t(240, 235, "on en prend une, on la garde,", C.craie, 22) + t(240, 270, "puis on en prend une autre", C.craie, 22) +
    t(240, 360, `indépendantes${NB}?`, C.rose, 28));

const marbre = (() => {
  const c = C.craie, n1 = [110, 290], n2 = [65, 155, 245, 335];
  let s = "";
  n1.forEach((y, i) => {
    s += l(52, 200, 136, y, c, 2.5) + t(150, y + 7, i ? "F" : "B", c, 22);
    [0, 1].forEach((k) => {
      const y2 = n2[2 * i + k];
      s += l(164, y, 256, y2, c, 2.5) + t(270, y2 + 7, k ? "F" : "B", c, 22);
      [0, 1].forEach((m) => {
        const y3 = y2 + (m ? 22 : -22);
        s += l(284, y2, 372, y3, c, 2.5) + t(384, y3 + 7, m ? "F" : "B", C.bleu, 20, "start");
      });
    });
  });
  return svg("Arbre de la marbrerie : 3 plaques, chacune bonne B ou fêlée F, trois niveaux de branches",
    s + t(40, 207, "●", C.craie, 16) + t(150, 30, "plaque 1", C.pale, 17) + t(270, 30, "plaque 2", C.pale, 17) + t(400, 30, "plaque 3", C.pale, 17) +
      t(240, 405, `combien de chemins${NB}?`, C.rose, 26));
})();

const chaises = svg("Le rempailleur : 3 chaises ; chacune a besoin d'un pied neuf avec la probabilité 0,1",
  [0, 1, 2].map((i) => {
    const x = 70 + 130 * i;
    return p(`M ${x} 70 L ${x} 190 M ${x} 140 L ${x + 70} 140 L ${x + 70} 190 M ${x} 140 L ${x} 70`, C.bleu, 5) +
      r(x - 4, 132, 80, 12, C.jaune, 0.4, 2, 3) + t(x + 35, 235, "pied neuf : 0,1", C.pale, 18);
  }).join("") +
    t(240, 300, "chaque chaise : indépendante", C.craie, 22) +
    t(240, 370, `aucun pied neuf${NB}?`, C.rose, 28));

const spas = svg("Vendeur de spas : 2 démonstrations, chacune finit en vente avec la probabilité 0,4 ; Tom dit 0,4 + 0,4 = 0,8",
  r(40, 45, 400, 150, C.bleu, 0.12, 3, 12) +
    t(240, 105, "2 démonstrations", C.craie, 24) + t(240, 150, "chacune : vente avec 0,4", C.craie, 24) +
    t(240, 255, "Tom : « 0,4 + 0,4 = 0,8 »", C.pale, 24) +
    t(240, 360, `au moins une vente${NB}?`, C.rose, 28));

const samoussas = svg("Samoussas du snack de Saint-Louis : chacun est raté avec la probabilité 0,1 ; on en prend 3",
  [0, 1, 2].map((i) => {
    const x = 90 + 150 * i;
    return p(`M ${x - 50} 170 L ${x + 50} 170 L ${x} 80 Z`, C.jaune, 4, 0.3);
  }).join("") +
    t(240, 240, "raté : 0,1 · réussi : 0,9", C.craie, 24) +
    t(240, 290, "chacun : indépendant", C.pale, 21) +
    t(240, 370, `exactement 1 raté${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "proba_epreuves_independantes",
  titre: "Énigmes des deux épreuves indépendantes",
  description: "Le chalutier, la boîte de clés USB, la marbrerie, le rempailleur de chaises, le piège du vendeur de spas, le défi des samoussas d'un snack de Saint-Louis : arbre de deux épreuves, produit des branches, répétition d'une épreuve de Bernoulli, avec ou sans remise.",
  problemes: [
    {
      tag: "Énigme 1 · Le chalutier",
      titre: "Multiplier le long du chemin",
      question: `Un chalutier sort deux jours de suite.<br>Chaque jour, la probabilité d'une bonne pêche est 0,7.<br>Les deux jours sont indépendants.<br><br><b>Quelle est la probabilité</b> de deux bonnes pêches ?`,
      reponse: `Le chemin « B puis B » : on multiplie les branches.<br>0,7 × 0,7 = <span class="big">0,49</span>.`,
      consigne: "Probabilité de deux bonnes pêches ?",
      verification: { type: "courte", attendus: ["0,49", "0.49", "49 %", "49%"] },
      dessin: chalutier,
    },
    {
      tag: "Énigme 2 · La boîte de clés USB",
      titre: "Avec ou sans remise",
      question: `Une boîte contient 10 clés USB. 2 sont défectueuses.<br>On prend une clé, on la garde, puis on en prend une autre.<br><br><b>Les deux tirages sont-ils indépendants</b> ?`,
      reponse: `Sans remise, la boîte change : il ne reste que 9 clés.<br>Si la 1re est défectueuse, il n'en reste qu'une sur 9.<br><span class="big">Non : le 2e tirage dépend du 1er</span>.`,
      consigne: "Les deux tirages sont-ils indépendants ?",
      verification: { type: "qcm", choix: ["non : le 2e tirage dépend du 1er", "oui : 2 sur 10 à chaque fois", "oui : on fait 0,2 × 0,2"], bonne: 0 },
      dessin: cles,
    },
    {
      tag: "Énigme 3 · La marbrerie",
      titre: "Compter les chemins",
      question: `Une marbrerie contrôle 3 plaques de marbre, l'une après l'autre.<br>Chaque plaque est bonne (B) ou fêlée (F).<br><br><b>Combien de chemins</b> a l'arbre ?`,
      reponse: `Chaque plaque double le nombre de chemins.<br>2 × 2 × 2 = <span class="big">8 chemins</span>.<br>De BBB jusqu'à FFF.`,
      consigne: "Combien de chemins a l'arbre ?",
      verification: { type: "qcm", choix: ["6", "8", "9"], bonne: 1 },
      dessin: marbre,
    },
    {
      tag: "Énigme 4 · Le rempailleur de chaises",
      titre: "Trois fois la même épreuve",
      question: `Un rempailleur reçoit 3 chaises.<br>Chaque chaise a besoin d'un pied neuf avec la probabilité 0,1.<br>Les chaises sont indépendantes.<br><br><b>Quelle est la probabilité</b> qu'aucune n'ait besoin d'un pied neuf ?`,
      reponse: `Pour chaque chaise : pas de pied neuf avec 1 − 0,1 = 0,9.<br>Le chemin « non, non, non » : 0,9 × 0,9 × 0,9 = <span class="big">0,729</span>.`,
      consigne: "Probabilité qu'aucune chaise n'ait besoin d'un pied neuf ?",
      verification: { type: "courte", attendus: ["0,729", "0.729", "72,9 %", "72,9%"] },
      dessin: chaises,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le vendeur de spas",
      sorte: "piege",
      question: `Un vendeur de spas fait 2 démonstrations.<br>Chacune finit en vente avec la probabilité 0,4, indépendamment.<br>Tom : « au moins une vente : 0,4 + 0,4 = 0,8 ».<br><br><b>Quelle est la probabilité</b> d'au moins une vente ?`,
      reponse: `Le contraire : aucune vente, 0,6 × 0,6 = 0,36.<br>Au moins une vente : 1 − 0,36 = <span class="big">0,64</span>.<br>Avec la méthode de Tom, 3 démonstrations donneraient 1,2 : impossible.`,
      consigne: "Probabilité d'au moins une vente ?",
      verification: { type: "qcm", choix: ["0,8", "0,16", "0,64"], bonne: 2 },
      dessin: spas,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les samoussas du snack",
      sorte: "defi",
      question: `Un snack de Saint-Louis frit des samoussas.<br>Chaque samoussa est raté avec la probabilité 0,1, indépendamment.<br>On en prend 3.<br><br><b>Quelle est la probabilité</b> qu'exactement un soit raté ?`,
      reponse: `Un chemin : raté, réussi, réussi : 0,1 × 0,9 × 0,9 = 0,081.<br>Le raté peut être le 1er, le 2e ou le 3e : 3 chemins.<br>3 × 0,081 = <span class="big">0,243</span>.`,
      consigne: "Probabilité qu'exactement un samoussa soit raté ?",
      verification: { type: "courte", attendus: ["0,243", "0.243", "24,3 %", "24,3%"] },
      dessin: samoussas,
    },
  ],
};

export default problemes;
