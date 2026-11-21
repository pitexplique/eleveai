// Énigmes à projeter — première (sans spé maths), notion expo_taux_moyen
// (les visiteurs du zoo, le club de badminton, les vélos pliants, la ville de
// Bretagne, piège du prix du cacao, défi du disque SSD). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, fleche } from "../dessins-ecole";

/** Deux valeurs reliées par une flèche, avec ce qu'on sait au-dessus. */
const evolution = (label: string, a: string, b: string, dessus: string, bas: string, label2 = "") =>
  svg(label,
    r(30, 110, 150, 70, C.bleu, 0.12, 3, 12) + t(105, 155, a, C.bleu, 26) +
      r(300, 110, 150, 70, C.jaune, 0.12, 3, 12) + t(375, 155, b, C.jaune, 26) +
      fleche(190, 145, 290, 145, C.craie, 4) + t(240, 90, dessus, C.pale, 20) +
      (label2 ? t(240, 240, label2, C.craie, 22) : "") +
      t(240, 385, bas, C.rose, 24));

const zoo = evolution("Visiteurs d'un zoo : + 10 % par an en moyenne pendant 2 ans", "année 0", "année 2", "taux moyen : + 10 % par an", `que veut dire «${NB}moyen${NB}»${NB}?`, "+ 21 % au total");

const badminton = evolution("Adhérents d'un club de badminton : de 200 à 288 en 2 ans", "200", "288", "en 2 ans", `taux moyen par an${NB}?`, "× 1,44 en tout");

const velos = evolution("Ventes de vélos pliants : + 8 % par an en moyenne pendant 3 ans", "année 0", "année 3", "+ 8 % par an, 3 fois", `taux global${NB}?`, "× 1,08 × 1,08 × 1,08");

const bretagne = evolution("Habitants d'une ville de Bretagne : de 50 000 à 60 000 en 5 ans", "50 000", "60 000", "en 5 ans", `taux moyen par an${NB}?`, "× 1,2 en 5 ans");

const cacao = evolution("Prix du cacao : + 30 % puis + 10 %", "+ 30 %", "+ 10 %", "année 1, puis année 2", `taux moyen${NB}: 20${NB}%${NB}?`, "× 1,3 × 1,1 = × 1,43");

const ssd = evolution("Prix d'un disque SSD : moins 36 % en 2 ans", "année 0", "année 2", "en 2 ans", `baisse moyenne par an${NB}?`, "− 36 % au total");

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "expo_taux_moyen",
  titre: "Énigmes du taux d'évolution moyen",
  description: "Les visiteurs du zoo, le club de badminton, les vélos pliants, la ville de Bretagne, le piège du prix du cacao, le défi du disque SSD : comprendre un taux moyen, le calculer avec l'exposant 1/n, passer du taux moyen au taux global.",
  problemes: [
    {
      tag: "Énigme 1 · Les visiteurs du zoo",
      titre: "Le sens du taux moyen",
      question: `En 2 ans, les visiteurs d'un zoo ont augmenté de 21 % au total. Le directeur dit : « En moyenne, + 10 % par an. »<br><br><b>Que veut dire</b> ce taux moyen ?`,
      reponse: `1,1 × 1,1 = 1,21 : deux hausses de 10 % donnent + 21 %.<br>Le taux moyen, c'est <span class="big">le même taux chaque année qui donnerait la même hausse totale</span>. Les vraies hausses ont pu être différentes.`,
      consigne: "+ 21 % en 2 ans, soit + 10 % par an en moyenne : que veut dire ce taux moyen ?",
      verification: { type: "qcm", choix: ["Le même taux chaque année donnerait la même hausse totale", "Il y a eu exactement + 10 % chaque année", "La hausse totale est de 10 %"], bonne: 0 },
      dessin: zoo,
    },
    {
      tag: "Énigme 2 · Le club de badminton",
      titre: "Calculer un taux moyen",
      question: `Un club de badminton passe de 200 à 288 adhérents en 2 ans.<br><br><b>Quel est</b> le taux d'évolution moyen par an ?`,
      reponse: `Coefficient global : 288 ÷ 200 = 1,44. On cherche q avec q × q = 1,44.<br>q = 1,44<sup>1/2</sup> = 1,2 : <span class="big">+ 20 % par an</span>. (200 × 1,2 = 240, puis 240 × 1,2 = 288.)`,
      consigne: "De 200 à 288 adhérents en 2 ans : quel est le taux moyen par an (en %) ?",
      verification: { type: "courte", attendus: ["20", "+20", "+ 20", "20 %", "20%"], unite: "%" },
      dessin: badminton,
    },
    {
      tag: "Énigme 3 · Les vélos pliants",
      titre: "Du taux moyen au taux global",
      question: `Pendant 3 ans, les ventes de vélos pliants d'un magasin ont augmenté de 8 % par an en moyenne.<br><br><b>Quelle est</b> la hausse totale sur les 3 ans ?`,
      reponse: `On multiplie trois fois par 1,08 : 1,08<sup>3</sup> ≈ 1,2597.<br>Hausse totale ≈ <span class="big">+ 26 %</span>, et pas 3 × 8 = 24 %.`,
      consigne: "+ 8 % par an en moyenne pendant 3 ans : quelle est la hausse totale ?",
      verification: { type: "qcm", choix: ["+ 24 %", "Environ + 26 %", "+ 8 %"], bonne: 1 },
      dessin: velos,
    },
    {
      tag: "Énigme 4 · La ville de Bretagne",
      titre: "L'exposant 1/n",
      question: `Une ville de Bretagne passe de 50 000 à 60 000 habitants en 5 ans.<br><br><b>Quel est</b> le taux moyen par an ? (Arrondir à 0,1 %.)`,
      reponse: `Coefficient global : 60 000 ÷ 50 000 = 1,2. Coefficient moyen : 1,2<sup>1/5</sup>.<br>À la calculatrice : 1,2^(1/5) ≈ 1,037, soit <span class="big">≈ + 3,7 % par an</span>, et pas 20 ÷ 5 = 4 %.`,
      consigne: "De 50 000 à 60 000 habitants en 5 ans : quel est le taux moyen par an ?",
      verification: { type: "qcm", choix: ["+ 4 %", "+ 20 %", "Environ + 3,7 %"], bonne: 2 },
      dessin: bretagne,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le prix du cacao",
      sorte: "piege",
      question: `Le prix du cacao augmente de 30 %, puis de 10 % l'année suivante.<br>Noé dit : « En moyenne, (30 + 10) ÷ 2 = 20 % par an. »<br><br><b>Quel est</b> le vrai taux moyen ? (Arrondir à 0,1 %.)`,
      reponse: `Coefficient global : 1,3 × 1,1 = 1,43. Coefficient moyen : 1,43<sup>1/2</sup> ≈ 1,196.<br>Taux moyen ≈ <span class="big">+ 19,6 %</span> : on ne fait pas la moyenne des pourcentages ! (1,2 × 1,2 = 1,44, trop grand.)`,
      consigne: "+ 30 % puis + 10 % : quel est le taux moyen par an, arrondi à 0,1 % ?",
      verification: { type: "courte", attendus: ["19,6", "19.6", "+19,6", "+ 19,6", "19,6 %"], unite: "%" },
      dessin: cacao,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le disque SSD",
      sorte: "defi",
      question: `Le prix d'un disque SSD baisse de 36 % en 2 ans.<br><br><b>De combien de %</b> baisse-t-il en moyenne chaque année ?`,
      reponse: `Baisser de 36 %, c'est × 0,64. On cherche q avec q × q = 0,64 : q = 0,64<sup>1/2</sup> = 0,8.<br>× 0,8, c'est <span class="big">− 20 % par an</span>, et pas − 18 %.`,
      consigne: "− 36 % en 2 ans : de combien de % le prix baisse-t-il en moyenne chaque année ?",
      verification: { type: "courte", attendus: ["20", "−20", "-20", "- 20", "20 %", "20%"], unite: "%" },
      dessin: ssd,
    },
  ],
};

export default problemes;
