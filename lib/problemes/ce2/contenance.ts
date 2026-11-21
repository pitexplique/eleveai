// Énigmes à projeter — CE2, notion contenances (la baignoire, les verres de
// jus, le seau gradué, la piscine gonflable, le piège du vase étroit, le défi
// des deux seaux de 3 L et 5 L). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

const baignoire = svg(
  "Une baignoire pleine d'eau ; elle contient environ 150 quoi ?",
  p("M60 160 L420 160 L390 290 Q240 320 90 290 Z", C.craie, 5, 0.05) + p("M70 190 L410 190 L390 285 Q240 312 90 285 Z", C.bleu, 0, 0.3) +
    l(110, 300, 100, 340, C.craie, 5) + l(370, 300, 380, 340, C.craie, 5) + t(240, 120, "150 ?", C.rose, 40) + t(240, 395, `cL${NB}? L${NB}?`, C.pale, 26)
);

const bouteilles = svg(
  "Une bouteille de 1 L remplit 4 verres ; on a 3 bouteilles",
  p("M70 330 L70 160 L90 130 L90 90 L120 90 L120 130 L140 160 L140 330 Z", C.jaune, 4, 0.3) + t(105, 260, "1 L", C.craie, 28) +
    t(200, 230, "→", C.craie, 40) + [0, 1, 2, 3].map((i) => p(`M${240 + i * 55} 200 L${280 + i * 55} 200 L${275 + i * 55} 280 L${245 + i * 55} 280 Z`, C.jaune, 3, 0.3)).join("") +
    t(330, 330, "4 verres", C.craie, 24) + t(240, 395, `3 bouteilles${NB}: ? verres`, C.rose, 28)
);

// Seau gradué de 0 à 10 L : 1 L = 22 px, fond à y = 320. L'eau monte à 7 L (y = 166).
const seau = svg(
  "Un seau gradué de 0 à 10 litres ; l'eau arrive à la graduation entre 6 et 8",
  r(150, 320 - 7 * 22, 160, 7 * 22, C.bleu, 0.35, 0) + p("M150 90 L150 320 L310 320 L310 90", C.craie, 5) +
    Array.from({ length: 11 }, (_, k) => l(310, 320 - k * 22, k % 2 ? 325 : 340, 320 - k * 22, C.craie, 3) + (k % 2 ? "" : t(370, 328 - k * 22, `${k} L`, C.craie, 20))).join("") +
    t(240, 395, `Combien de litres d'eau${NB}?`, C.rose, 28)
);

const piscine = svg(
  "Une piscine gonflable de 300 L ; on a déjà versé 180 L",
  `<ellipse cx="240" cy="200" rx="190" ry="80" fill="${C.bleu}" fill-opacity="0.2" stroke="${C.bleu}" stroke-width="6"/>` +
    t(240, 190, "300 L", C.craie, 40) + t(240, 235, "déjà 180 L", C.pale, 26) + t(240, 350, `Combien manque-t-il${NB}?`, C.rose, 28)
);

const vase = svg(
  "La même eau versée d'un bol large dans un vase étroit : l'eau monte plus haut",
  p("M40 220 Q40 300 130 300 Q220 300 220 220 Z", C.craie, 4) + p("M52 250 Q60 296 130 296 Q200 296 208 250 Z", C.bleu, 0, 0.35) + t(130, 340, "avant", C.craie, 24) +
    t(240, 220, "→", C.rose, 40) +
    r(320, 90, 70, 210, C.craie, 0, 4, 4) + r(320, 150, 70, 150, C.bleu, 0.35, 0) + t(355, 340, "après", C.craie, 24) +
    t(240, 395, `Plus d'eau${NB}?`, C.rose, 30)
);

const seaux = svg(
  "Un seau de 3 L et un seau de 5 L, et un robinet ; on veut 2 L",
  p("M60 160 L80 320 L180 320 L200 160 Z", C.craie, 4, 0.05) + t(130, 260, "3 L", C.craie, 34) +
    p("M260 120 L285 320 L405 320 L430 120 Z", C.craie, 4, 0.05) + t(345, 240, "5 L", C.craie, 40) +
    t(240, 80, `Comment avoir 2 L${NB}?`, C.rose, 30) + t(240, 380, "pas de graduations", C.pale, 22)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "contenance",
  titre: "Énigmes sur les contenances",
  description: "La baignoire en litres, les verres de jus, le seau gradué, la piscine gonflable, le piège du vase étroit, le défi des deux seaux de 3 L et 5 L.",
  problemes: [
    {
      tag: "Énigme 1 · La salle de bain",
      titre: "La baignoire",
      question: `Une baignoire pleine contient environ <b>150…</b><br><br>Quelle est la <b>bonne unité</b> ?`,
      reponse: `150 cL : à peine une grande bouteille.<br>La baignoire contient environ <span class="big">150 L</span>.`,
      consigne: "Que contient une baignoire pleine ?",
      verification: { type: "qcm", choix: ["150 L", "150 cL", "15 000 L"], bonne: 0 },
      dessin: baignoire,
    },
    {
      tag: "Énigme 2 · L'anniversaire",
      titre: "Les verres de jus",
      question: `Avec une bouteille de <b>1 L</b>, on remplit <b>4 verres</b>.<br>On a <b>3 bouteilles</b>.<br><br>Combien de verres ?`,
      reponse: `Chaque bouteille remplit 4 verres.<br>3 × 4 = <span class="big">12 verres</span>.`,
      consigne: "Combien de verres avec 3 bouteilles ?",
      verification: { type: "courte", attendus: ["12"], unite: "verres" },
      dessin: bouteilles,
    },
    {
      tag: "Énigme 3 · Le jardin",
      titre: "Le seau gradué",
      question: `Le seau est gradué de <b>0 à 10 L</b>.<br>Regarde bien les petits traits.<br><br>Combien de litres d'eau ?`,
      reponse: `Les grands traits vont de 2 en 2 : 0, 2, 4, 6, 8, 10.<br>Un petit trait au milieu = 1 L de plus.<br>L'eau est entre 6 et 8 : <span class="big">7 L</span>.`,
      consigne: "Combien de litres d'eau dans le seau ?",
      verification: { type: "courte", attendus: ["7"], unite: "L" },
      dessin: seau,
    },
    {
      tag: "Énigme 4 · L'été",
      titre: "La piscine gonflable",
      question: `La piscine contient <b>300 L</b>.<br>On a déjà versé <b>180 L</b>.<br><br>Combien de litres manque-t-il ?`,
      reponse: `180 + 20 = 200, puis 200 + 100 = 300.<br>20 + 100 = <span class="big">120 L</span>.`,
      consigne: "Combien de litres manque-t-il ?",
      verification: { type: "qcm", choix: ["480 L", "220 L", "120 L"], bonne: 2 },
      dessin: piscine,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le vase étroit",
      sorte: "piege",
      question: `On verse l'eau du bol dans un vase étroit.<br>L'eau monte <b>beaucoup plus haut</b>.<br><br>Y a-t-il plus d'eau ?`,
      reponse: `Le piège : l'eau est plus haute, on croit qu'il y en a plus.<br>On n'a rien ajouté, rien renversé !<br><span class="big">Non, c'est la même quantité</span>.`,
      consigne: "Y a-t-il plus d'eau dans le vase ?",
      verification: { type: "qcm", choix: ["Oui, l'eau monte plus haut", "Non, c'est la même quantité", "Non, il y en a moins"], bonne: 1 },
      dessin: vase,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux seaux",
      sorte: "defi",
      question: `Tu as un seau de <b>3 L</b> et un seau de <b>5 L</b>.<br>Ils n'ont pas de graduations.<br><br>Comment avoir <b>exactement 2 L</b> ?`,
      reponse: `On remplit le seau de 5 L.<br>On le verse dans le seau de 3 L jusqu'en haut.<br>Il reste 5 − 3 = <span class="big">2 L</span> dans le grand seau.`,
      consigne: "Comment avoir exactement 2 L ?",
      verification: { type: "qcm", choix: ["Remplir le 3 L deux fois", "Remplir les deux, puis tout mélanger", "Remplir le 5 L, puis le verser dans le 3 L"], bonne: 2 },
      dessin: seaux,
    },
  ],
};

export default problemes;
