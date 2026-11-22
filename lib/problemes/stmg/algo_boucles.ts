// Énigmes à projeter — STMG (1re), notion boucles et instruction
// conditionnelle (les badges du salon, la boutique en ligne d'encens, la box
// de livres, la briqueterie, piège de la station d'épuration, défi de la
// bétonnière). 21/11/2026. Le programme Python est dans le dessin.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { code } from "../dessins-2de";

const badges = svg("Badges : pour k dans range(12), imprimer un badge ; combien de badges ?",
  code([["for k in range(12):", 0], ["print(\"badge\")", 1]], { y: 60, pas: 50, taille: 27 }) +
    t(240, 300, `combien de badges${NB}?`, C.rose, 30));

const encens = svg("Encens : m = 42 ; si m supérieur ou égal à 50 alors frais = 0, sinon frais = 6 ; afficher frais",
  code([["m = 42", 0], ["if m >= 50:", 0], ["frais = 0", 1], ["else:", 0], ["frais = 6", 1], ["print(frais)", 0]], { y: 20, pas: 44, taille: 25 }) +
    t(240, 360, `qu'affiche le programme${NB}?`, C.rose, 27));

const box = svg("Box de livres : a = 2000 ; n = 0 ; tant que a inférieur à 3000, a = a × 1,1 et n = n + 1 ; afficher n",
  code([["a = 2000", 0], ["n = 0", 0], ["while a &lt; 3000:", 0], ["a = a * 1.1", 1], ["n = n + 1", 1], ["print(n)", 0]], { y: 20, pas: 44, taille: 25 }) +
    t(240, 360, `qu'affiche le programme${NB}?`, C.rose, 27));

const briques = svg("Briqueterie : s = 0 ; pour k de 1 à 3, s = s + k × k ; afficher s",
  code([["s = 0", 0], ["for k in range(1, 4):", 0], ["s = s + k * k", 1], ["print(s)", 0]], { y: 40, pas: 46, taille: 26 }) +
    t(240, 330, `qu'affiche le programme${NB}?`, C.rose, 27));

const epuration = svg("Station d'épuration : v = 0 ; tant que v inférieur à 100, v = v + 30 ; afficher v ; Tom répond 90",
  code([["v = 0", 0], ["while v &lt; 100:", 0], ["v = v + 30", 1], ["print(v)", 0]], { y: 30, pas: 46, taille: 26 }) +
    t(240, 290, "Tom : « ça affiche 90 »", C.pale, 23) +
    t(240, 360, `qu'affiche le programme${NB}?`, C.rose, 27));

const betonniere = svg("Bétonnière : p = 100 ; n = 0 ; tant que p supérieur à 50, p = p × 0,8 et n = n + 1 ; afficher n",
  code([["p = 100", 0], ["n = 0", 0], ["while p > 50:", 0], ["p = p * 0.8", 1], ["n = n + 1", 1], ["print(n)", 0]], { y: 20, pas: 44, taille: 25 }) +
    t(240, 360, `qu'affiche le programme${NB}?`, C.rose, 27));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "algo_boucles",
  titre: "Énigmes des boucles et de l'instruction conditionnelle",
  description: "Les badges du salon, la boutique en ligne d'encens, la box de livres, la briqueterie, le piège de la station d'épuration, le défi de la bétonnière : compter les tours d'une boucle for, lire un if / else, dérouler une boucle while pour trouver un seuil.",
  problemes: [
    {
      tag: "Énigme 1 · Les badges du salon",
      titre: "Une boucle bornée",
      question: `Un salon professionnel imprime les badges des visiteurs.<br>Chaque tour de boucle imprime un badge.<br><br><b>Combien de badges</b> le programme imprime-t-il ?`,
      reponse: `range(12) donne k = 0, 1, …, 11 : 12 tours.<br>Le programme imprime <span class="big">12 badges</span>.`,
      consigne: "Combien de badges sont imprimés ?",
      verification: { type: "courte", attendus: ["12", "12 badges"] },
      dessin: badges,
    },
    {
      tag: "Énigme 2 · La boutique en ligne d'encens",
      titre: "Si… sinon",
      question: `Une boutique en ligne d'encens offre la livraison dès 50 € d'achat.<br>Sinon, la livraison coûte 6 €.<br>Une cliente commande pour 42 €.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `42 n'est pas supérieur ou égal à 50 : on passe dans else.<br>Le programme affiche <span class="big">6</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "qcm", choix: ["6", "0", "42"], bonne: 0 },
      dessin: encens,
    },
    {
      tag: "Énigme 3 · La box de livres",
      titre: "Chercher un seuil",
      question: `Une box de livres a 2${NB}000 abonnés.<br>Elle gagne 10 % d'abonnés chaque mois.<br>n compte les mois.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `a vaut 2${NB}200, 2${NB}420, 2${NB}662, 2${NB}928,2, puis 3${NB}221,02.<br>La boucle s'arrête au 5e tour : le programme affiche <span class="big">5</span>.<br>Il faut 5 mois pour dépasser 3${NB}000 abonnés.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "courte", attendus: ["5", "5 mois"] },
      dessin: box,
    },
    {
      tag: "Énigme 4 · La briqueterie",
      titre: "Dérouler une boucle",
      question: `Une briqueterie empile des briques en pyramide.<br>Étage du haut : 1 × 1 brique, puis 2 × 2, puis 3 × 3.<br>s compte les briques.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `range(1, 4) donne k = 1, 2, 3.<br>s = 1 + 4 + 9 = <span class="big">14</span> briques.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "qcm", choix: ["9", "14", "6"], bonne: 1 },
      dessin: briques,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La station d'épuration",
      sorte: "piege",
      question: `Une station d'épuration remplit une cuve.<br>Elle ajoute 30 m³ tant que la cuve a moins de 100 m³.<br>Tom dit que le programme affiche 90.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `v vaut 30, 60, 90 : 90 est plus petit que 100, la boucle refait un tour.<br>v = 120 : la boucle s'arrête.<br>Le programme affiche <span class="big">120</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "courte", attendus: ["120"] },
      dessin: epuration,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La bétonnière",
      sorte: "defi",
      question: `Une bétonnière vaut 100 (en centaines d'euros).<br>Elle perd 20 % de sa valeur chaque année.<br>n compte les années.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `p vaut 80, 64, 51,2, puis 40,96.<br>40,96 n'est plus supérieur à 50 : la boucle s'arrête.<br>Le programme affiche <span class="big">4</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "qcm", choix: ["3", "5", "4"], bonne: 2 },
      dessin: betonniere,
    },
  ],
};

export default problemes;
