// Énigmes à projeter — STMG (1re), notion résoudre x² = c et x³ = c (les dalles
// de liège, l'assistante des ressources humaines, la caisse du transitaire, le
// bac à granulés de bois, piège de la benne de la déchetterie, défi du terrain
// à bâtir). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

const liege = svg("Les dalles de liège : une dalle carrée de 2 500 centimètres carrés ; son côté ?",
  r(150, 60, 180, 180, C.jaune, 0.25, 3) + t(240, 160, "2 500 cm²", C.craie, 28) +
    t(240, 275, "côté = x", C.pale, 24) + t(240, 350, `x²${NB}=${NB}2${NB}500 · x${NB}=${NB}?`, C.rose, 28));

const rh = svg("L'assistante des ressources humaines : l'équation x au carré égale 64 ; ses solutions ?",
  r(90, 90, 300, 100, C.bleu, 0.15, 3, 10) + t(240, 157, "x² = 64", C.craie, 36) +
    t(240, 290, `solutions${NB}?`, C.rose, 30));

// Un cube en perspective cavalière.
const cube = (x: number, y: number, a: number, d: number, c: string) =>
  r(x, y, a, a, c, 0.2, 3) + p(`M${x} ${y} L${x + d} ${y - d} L${x + a + d} ${y - d} L${x + a} ${y}`, c, 3) +
  p(`M${x + a + d} ${y - d} L${x + a + d} ${y + a - d} L${x + a} ${y + a}`, c, 3);

const transitaire = svg("La caisse cubique du transitaire : volume 8 mètres cubes ; son arête ?",
  cube(150, 110, 150, 50, C.bleu) + t(225, 195, "8 m³", C.craie, 30) +
    t(225, 300, "arête = x", C.pale, 24) + t(240, 370, `x³${NB}=${NB}8 · x${NB}=${NB}?`, C.rose, 28));

const granules = svg("Le bac à granulés de bois : un cube de 64 décimètres cubes ; quelle écriture donne son arête ?",
  cube(160, 100, 140, 45, C.jaune) + t(230, 180, "64 dm³", C.craie, 28) +
    t(240, 290, "x³ = 64", C.pale, 26) + t(240, 360, `x${NB}=${NB}?`, C.rose, 30));

const benne = svg("La benne cubique de la déchetterie : 27 mètres cubes ; Hugo dit que l'arête vaut 27 divisé par 3, soit 9 mètres",
  cube(160, 90, 130, 40, C.bleu) + t(225, 165, "27 m³", C.craie, 28) +
    t(240, 280, "Hugo : « 27 ÷ 3 = 9 m »", C.pale, 24) + t(240, 350, `arête${NB}?`, C.rose, 30));

const terrain = svg("Le terrain à bâtir : 50 000 euros, puis 66 550 euros trois ans plus tard, avec le même taux chaque année",
  r(40, 80, 170, 100, C.bleu, 0.15, 3, 10) + r(270, 80, 170, 100, C.jaune, 0.2, 3, 10) +
    t(125, 120, "année 0", C.pale, 20) + t(125, 160, "50 000 €", C.craie, 26) +
    t(355, 120, "année 3", C.pale, 20) + t(355, 160, "66 550 €", C.craie, 26) +
    l(215, 130, 262, 130, C.pale, 3) + t(240, 265, "même taux chaque année", C.pale, 24) + t(240, 345, `taux${NB}?`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "fct_equations_puissance",
  titre: "Énigmes de carrés et de cubes",
  description: "Les dalles de liège, l'assistante des ressources humaines, la caisse du transitaire, le bac à granulés de bois, le piège de la benne de la déchetterie, le défi du terrain à bâtir : résoudre x² = c et x³ = c, utiliser la racine cubique.",
  problemes: [
    {
      tag: "Énigme 1 · Les dalles de liège",
      titre: "Le côté d'un carré",
      question: `Un magasin vend des dalles de liège carrées.<br>Une dalle a une aire de 2 500 cm².<br><br><b>Quel est son côté</b> ?`,
      reponse: `On résout x² = 2 500 avec x positif.<br>50 × 50 = 2 500.<br>Le côté mesure <span class="big">50 cm</span>.`,
      consigne: "Une dalle carrée a une aire de 2 500 cm². Quel est son côté ?",
      verification: { type: "qcm", choix: ["50 cm", "1 250 cm", "25 cm"], bonne: 0 },
      dessin: liege,
    },
    {
      tag: "Énigme 2 · Les ressources humaines",
      titre: "Deux solutions",
      question: `Une assistante des ressources humaines tape une équation dans son tableur : x² = 64.<br><br><b>Quelles sont les solutions</b> ?`,
      reponse: `8² = 64 et (−8)² = 64.<br>Les solutions sont <span class="big">8 et −8</span>.<br>x² = c, avec c positif, a deux solutions : √c et −√c.`,
      consigne: "Quelles sont les solutions de x² = 64 ?",
      verification: { type: "qcm", choix: ["8", "8 et −8", "32 et −32"], bonne: 1 },
      dessin: rh,
    },
    {
      tag: "Énigme 3 · La caisse du transitaire",
      titre: "L'arête d'un cube",
      question: `Un transitaire expédie une caisse cubique.<br>Son volume est 8 m³.<br><br><b>Quelle est son arête</b> ?`,
      reponse: `On résout x³ = 8.<br>2 × 2 × 2 = 8.<br>L'arête mesure <span class="big">2 m</span>.`,
      consigne: "Une caisse cubique a un volume de 8 m³. Quelle est son arête ?",
      verification: { type: "courte", attendus: ["2"], unite: "m" },
      dessin: transitaire,
    },
    {
      tag: "Énigme 4 · Le bac à granulés",
      titre: "La racine cubique",
      question: `Un bac à granulés de bois est un cube de 64 dm³.<br>Son arête x vérifie x³ = 64.<br><br><b>Quelle écriture donne x</b> ?`,
      reponse: `La solution de x³ = 64 est la racine cubique de 64.<br>On l'écrit ∛64, ou 64<sup>1/3</sup>.<br>x = <span class="big">∛64 = 4</span> dm, car 4 × 4 × 4 = 64.`,
      consigne: "x³ = 64. Quelle écriture donne x ?",
      verification: { type: "qcm", choix: ["64 ÷ 3", "64³", "∛64"], bonne: 2 },
      dessin: granules,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La benne de la déchetterie",
      sorte: "piege",
      question: `Une benne de déchetterie est un cube de 27 m³.<br>Hugo : « L'arête vaut 27 ÷ 3 = 9 m. »<br><br><b>Quelle est la vraie arête</b> ?`,
      reponse: `Hugo se trompe : 9 × 9 × 9 = 729, pas 27.<br>On résout x³ = 27 : 3 × 3 × 3 = 27.<br>L'arête mesure <span class="big">3 m</span>.`,
      consigne: "Un cube a un volume de 27 m³. Quelle est son arête ?",
      verification: { type: "courte", attendus: ["3"], unite: "m" },
      dessin: benne,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le terrain à bâtir",
      sorte: "defi",
      question: `Un terrain à bâtir vaut 50 000 €.<br>Trois ans plus tard, il vaut 66 550 €.<br>Son prix a augmenté du même taux chaque année.<br><br><b>Quel est ce taux</b> ?`,
      reponse: `66 550 ÷ 50 000 = 1,331.<br>Le coefficient annuel x vérifie x³ = 1,331, donc x = ∛1,331 = 1,1.<br>Le taux annuel est de <span class="big">10 %</span>.`,
      consigne: "50 000 € devient 66 550 € en 3 ans, même taux chaque année. Quel taux ?",
      verification: { type: "courte", attendus: ["10"], unite: "%" },
      dessin: terrain,
    },
  ],
};

export default problemes;
