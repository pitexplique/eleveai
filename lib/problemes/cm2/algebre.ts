// Énigmes à projeter — CM2, notion algebre (la balance en équilibre, le nombre
// manquant, le programme de calcul à remonter, la formule de location, le
// piège « n + 5 = 12 donc n = 17 », le défi des fruits). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

const balance = svg(
  "Une balance en équilibre : 3 boîtes identiques et 2 kg d'un côté, 14 kg de l'autre",
  p("M240 110 L240 330 M170 330 L310 330", C.craie, 5) + l(80, 140, 400, 140, C.craie, 5) +
    p("M80 140 L50 220 L150 220 Z", C.pale, 3) + p("M400 140 L330 220 L450 220 Z", C.pale, 3).replace("L330 220 L450 220", "L340 220 L460 220") +
    [0, 1, 2].map((i) => r(52 + i * 27, 180, 24, 38, C.bleu, 0.35, 3, 3)).join("") + r(132, 190, 20, 28, C.pale, 0.4, 3, 3) + t(142, 250, "2 kg", C.pale, 18) +
    t(88, 170, "? ? ?", C.bleu, 18) + r(370, 175, 60, 44, C.jaune, 0.3, 3, 4) + t(400, 205, "14 kg", C.craie, 18) +
    t(240, 390, `Combien pèse une boîte${NB}?`, C.rose, 26)
);

const images = svg(
  "7 paquets identiques d'images : 63 images en tout",
  [0, 1, 2, 3, 4, 5, 6].map((i) => r(25 + i * 63, 120, 54, 80, C.rose, 0.2, 3, 6) + t(52 + i * 63, 170, "?", C.craie, 28)).join("") +
    t(240, 280, "□ × 7 = 63", C.craie, 40) + t(240, 350, "63 images en tout", C.pale, 24)
);

const programme = svg(
  "Un programme de calcul : un nombre, fois 3, plus 5, donne 26",
  r(30, 140, 90, 80, C.rose, 0.15, 4, 10) + t(75, 192, "?", C.rose, 40) +
    p("M125 180 L165 180 M152 168 L165 180 L152 192", C.craie, 3) + r(170, 150, 80, 60, C.bleu, 0.15, 3, 8) + t(210, 190, "× 3", C.craie, 26) +
    p("M255 180 L295 180 M282 168 L295 180 L282 192", C.craie, 3) + r(300, 150, 80, 60, C.bleu, 0.15, 3, 8) + t(340, 190, "+ 5", C.craie, 26) +
    p("M385 180 L410 180 M397 168 L410 180 L397 192", C.craie, 3) + t(445, 192, "26", C.jaune, 34) +
    t(240, 320, "on peut remonter le chemin ←", C.pale, 22)
);

const velo = svg(
  "Une location de vélo : 2 € au départ, plus 3 € par heure",
  t(240, 140, "🚲", C.craie, 90) + r(80, 190, 320, 100, C.jaune, 0.15, 4, 10) +
    t(240, 232, "prix = 2 € + 3 € × heures", C.craie, 24) + t(240, 270, "(la formule)", C.pale, 18) + t(240, 360, `pour 5 heures${NB}?`, C.rose, 28)
);

const billes = svg(
  "Léna gagne 5 billes et en a 12 : combien en avait-elle ?",
  r(60, 120, 90, 90, C.bleu, 0.15, 4, 45) + t(105, 178, "?", C.bleu, 44) + t(190, 178, "+ 5", C.craie, 34) + t(260, 178, "=", C.craie, 34) +
    r(300, 120, 120, 90, C.jaune, 0.15, 4, 45) + t(360, 178, "12", C.craie, 40) + t(240, 290, "«17» dit Lucas", C.rose, 30).replace("«17»", `«${NB}17${NB}»`)
);

const fruits = svg(
  "Une énigme de fruits : pomme + pomme = 10, pomme + banane = 8, banane + cerise = 7",
  t(240, 90, "🍎 + 🍎 = 10", C.craie, 40) + t(240, 170, "🍎 + 🍌 = 8", C.craie, 40) + t(240, 250, "🍌 + 🍒 = 7", C.craie, 40) + t(240, 350, `🍒 = ${NB}?`, C.rose, 44)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "algebre",
  titre: "Énigmes d'algèbre : le nombre inconnu",
  description: "La balance en équilibre, les paquets d'images, le programme de calcul à remonter, la formule du vélo, le piège de Lucas, le défi des fruits.",
  problemes: [
    {
      tag: "Énigme 1 · La balance",
      titre: "Les trois boîtes",
      question: `La balance est en équilibre.<br>À gauche : <b>3 boîtes identiques</b> et <b>2 kg</b>. À droite : <b>14 kg</b>.<br><br><b>Combien pèse une boîte</b> ?`,
      reponse: `On enlève 2 kg de chaque côté : 3 boîtes = 12 kg.<br>12 ÷ 3 = <span class="big">4 kg</span>.`,
      consigne: "Combien pèse une boîte, en kg ?",
      verification: { type: "courte", attendus: ["4"], unite: "kg" },
      dessin: balance,
    },
    {
      tag: "Énigme 2 · Les images",
      titre: "Le nombre manquant",
      question: `<b>7 paquets</b> identiques contiennent <b>63 images</b> en tout.<br><br>Trouve le nombre caché : <b>□ × 7 = 63</b>.`,
      reponse: `On cherche dans la table de 7 : 7 × 9 = 63.<br>Chaque paquet contient <span class="big">9 images</span>.`,
      consigne: "□ × 7 = 63. Quel est le nombre caché ?",
      verification: { type: "courte", attendus: ["9"] },
      dessin: images,
    },
    {
      tag: "Énigme 3 · Le programme de calcul",
      titre: "Remonter le chemin",
      question: `Je pense à un nombre.<br>Je le multiplie par <b>3</b>, puis j'ajoute <b>5</b>.<br>J'obtiens <b>26</b>.<br><br><b>À quel nombre</b> ai-je pensé ?`,
      reponse: `On remonte en faisant le contraire.<br>26 − 5 = 21, puis 21 ÷ 3 = 7.<br>J'ai pensé à <span class="big">7</span>. Vérification : 7 × 3 + 5 = 26.`,
      consigne: "À quel nombre ai-je pensé ?",
      verification: { type: "courte", attendus: ["7"] },
      dessin: programme,
    },
    {
      tag: "Énigme 4 · Au loueur de vélos",
      titre: "La formule du prix",
      question: `Louer un vélo coûte <b>2 €</b> au départ, puis <b>3 € par heure</b>.<br><br>Combien coûte une location de <b>5 heures</b> ?`,
      reponse: `prix = 2 + 3 × 5.<br>On fait d'abord la multiplication : 3 × 5 = 15.<br>2 + 15 = <span class="big">17 €</span>.`,
      consigne: "Combien coûtent 5 heures de location ?",
      verification: { type: "qcm", choix: ["17 €", "25 €", "15 €"], bonne: 0 },
      dessin: velo,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les billes de Léna",
      sorte: "piege",
      question: `Léna a des billes. Elle en gagne <b>5</b>.<br>Maintenant, elle en a <b>12</b>.<br><br>Lucas dit : « 12 + 5 = 17, elle en avait 17. »<br><b>A-t-il raison</b> ?`,
      reponse: `Non ! Avant de gagner, elle en avait <b>moins</b>.<br>□ + 5 = 12, donc □ = 12 − 5.<br>Elle en avait <span class="big">7 billes</span>.`,
      consigne: "Combien de billes Léna avait-elle au début ?",
      verification: { type: "qcm", choix: ["17", "7", "60"], bonne: 1 },
      dessin: billes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'énigme des fruits",
      sorte: "defi",
      question: `🍎 + 🍎 = 10<br>🍎 + 🍌 = 8<br>🍌 + 🍒 = 7<br><br><b>Combien vaut la cerise</b> 🍒 ?`,
      reponse: `🍎 = 10 ÷ 2 = 5.<br>🍌 = 8 − 5 = 3.<br>🍒 = 7 − 3 = <span class="big">4</span>.`,
      consigne: "Combien vaut la cerise ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: fruits,
    },
  ],
};

export default problemes;
