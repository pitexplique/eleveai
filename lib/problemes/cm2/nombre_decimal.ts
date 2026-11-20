// Énigmes à projeter — CM2, notion nombre_decimal (un saut en mètres et en
// centimètres, le meilleur saut, un point sur la droite au dixième, unités,
// dixièmes, centièmes, le piège 2,15 > 2,5 « car 15 > 5 », le défi du nombre
// caché entre 3,4 et 3,5). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, droiteGraduee } from "../dessins-ecole";

// Le sautoir : 1 m = 110 px. Le saut de 3,07 m va de x = 50 à x = 388.
const saut = svg(
  "Un bac à sable de saut en longueur, le saut mesure 3,07 m",
  r(40, 220, 420, 70, C.jaune, 0.25, 3, 6) + l(50, 200, 50, 300, C.craie, 5) +
    l(50, 330, 388, 330, C.rose, 3) + l(50, 320, 50, 340, C.rose, 3) + l(388, 320, 388, 340, C.rose, 3) +
    o(388, 250, 9, C.craie, 0.6, 2) + t(219, 370, "3,07 m", C.rose, 30) + t(240, 120, "🏃", C.craie, 60) +
    t(240, 410, `en centimètres${NB}?`, C.pale, 22)
);

const podium = svg(
  "Trois sauteurs et leurs sauts : 2,8 m ; 2,75 m ; 2,09 m",
  [["Ali", "2,8 m", C.bleu], ["Béa", "2,75 m", C.jaune], ["Cyril", "2,09 m", C.rose]]
    .map(([n, v, c], i) => r(40 + i * 145, 110, 120, 130, c, 0.15, 4, 10) + t(100 + i * 145, 160, "🏅", C.craie, 34) + t(100 + i * 145, 220, v, C.craie, 28) + t(100 + i * 145, 280, n, c, 26))
    .join("") + t(240, 360, `Qui a sauté le plus loin${NB}?`, C.rose, 26)
);

const droite = svg(
  "Une droite graduée de 4 à 5 au dixième, le point C sur la 6e graduation",
  droiteGraduee(200, 50, 430, 4, 5, 0.1, 1) + l(278, 170, 278, 188, C.rose, 4) + t(278, 160, "C", C.rose, 32) + t(240, 330, `C = ${NB}?`, C.rose, 30)
);

const colis = svg(
  "Un colis sur une balance, et un tableau : 7 unités, 4 dixièmes, 5 centièmes",
  r(160, 50, 160, 110, C.jaune, 0.25, 4, 6) + l(160, 105, 320, 105, C.jaune, 3) + r(130, 160, 220, 30, C.pale, 0.3, 3, 4) +
    ["unités", "dixièmes", "centièmes"].map((n, i) => r(60 + i * 125, 240, 110, 80, C.bleu, 0.1, 3) + t(115 + i * 125, 230, n, C.pale, 20) + t(115 + i * 125, 295, [7, 4, 5][i], C.craie, 38)).join("") +
    t(240, 380, `la masse en kg${NB}?`, C.rose, 26)
);

const bouteilles = svg(
  "Deux bouteilles : 2,15 L et 2,5 L, dessinées au bon rapport",
  r(100, 400 - 2.15 * 120, 100, 2.15 * 120, C.bleu, 0.3, 4, 10) + t(150, 400 - 2.15 * 120 - 14, "2,15 L", C.craie, 28) +
    r(280, 400 - 2.5 * 120, 100, 2.5 * 120, C.rose, 0.3, 4, 10) + t(330, 400 - 2.5 * 120 - 14, "2,5 L", C.craie, 28) +
    t(240, 50, `«${NB}15 est plus grand que 5${NB}»`, C.pale, 22)
);

const cache = svg(
  "Un nombre caché entre 3,4 et 3,5, avec 7 au chiffre des centièmes",
  droiteGraduee(170, 50, 430, 3.4, 3.5, 0.01, 0.1) + l(316, 140, 316, 158, C.rose, 4) + t(316, 130, "?", C.rose, 32) +
    t(240, 290, "2 chiffres après la virgule", C.craie, 24) + t(240, 335, "centièmes = 7", C.craie, 24)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "nombre_decimal",
  titre: "Énigmes sur les nombres décimaux",
  description: "Un saut en longueur en centimètres, le meilleur saut, le point C au dixième, la masse du colis, le piège des deux bouteilles, le défi du nombre caché.",
  problemes: [
    {
      tag: "Énigme 1 · Au stade",
      titre: "Le saut en longueur",
      question: `Maé saute <b>3,07 m</b>.<br><br>Combien de <b>centimètres</b> cela fait-il ?`,
      reponse: `3 m = 300 cm. Le 0 dit : 0 dixième. Le 7 dit : 7 centièmes de mètre, donc 7 cm.<br>300 + 7 = <span class="big">307 cm</span>.`,
      consigne: "3,07 m, c'est combien de centimètres ?",
      verification: { type: "courte", attendus: ["307"], unite: "cm" },
      dessin: saut,
    },
    {
      tag: "Énigme 2 · Le concours",
      titre: "Le meilleur saut",
      question: `Ali saute <b>2,8 m</b>. Béa saute <b>2,75 m</b>. Cyril saute <b>2,09 m</b>.<br><br><b>Qui a sauté le plus loin</b> ?`,
      reponse: `Les trois ont 2 unités. On compare les dixièmes : 8, 7 et 0.<br>2,8 = 2,80, c'est plus que 2,75.<br><span class="big">Ali</span> a sauté le plus loin.`,
      consigne: "Qui a sauté le plus loin ?",
      verification: { type: "qcm", choix: ["Béa", "Ali", "Cyril"], bonne: 1 },
      dessin: podium,
    },
    {
      tag: "Énigme 3 · Sur la droite",
      titre: "Le point C",
      question: `De 4 à 5, la droite est partagée en <b>10 parts égales</b>.<br>Le point C est sur la <b>6e graduation</b> après 4.<br><br><b>Quel nombre</b> repère C ?`,
      reponse: `Une part, c'est 1 dixième : 0,1.<br>6 parts après 4 : <span class="big">C = 4,6</span>.`,
      consigne: "Quel nombre repère le point C ?",
      verification: { type: "courte", attendus: ["4,6", "4.6"] },
      dessin: droite,
    },
    {
      tag: "Énigme 4 · À la poste",
      titre: "La masse du colis",
      question: `La masse d'un colis s'écrit avec <b>7 unités</b>, <b>4 dixièmes</b> et <b>5 centièmes</b> de kilogramme.<br><br><b>Quelle est sa masse</b> ?`,
      reponse: `Les unités avant la virgule. Puis dixièmes, puis centièmes.<br>La masse est <span class="big">7,45 kg</span>.`,
      consigne: "Quelle est la masse du colis, en kg ?",
      verification: { type: "courte", attendus: ["7,45", "7.45"], unite: "kg" },
      dessin: colis,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux bouteilles",
      sorte: "piege",
      question: `Une bouteille contient <b>2,15 L</b>. Une autre contient <b>2,5 L</b>.<br><br>Nour dit : « La première contient plus, car 15 est plus grand que 5. »<br><b>A-t-elle raison</b> ?`,
      reponse: `Non ! On compare chiffre par chiffre : d'abord les dixièmes.<br>2,5 = 2,50 : 5 dixièmes. 2,15 : 1 dixième.<br><span class="big">2,5 L est plus grand</span>.`,
      consigne: "Quelle bouteille contient le plus ?",
      verification: { type: "qcm", choix: ["Elles contiennent autant", "Celle de 2,15 L", "Celle de 2,5 L"], bonne: 2 },
      dessin: bouteilles,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le nombre caché",
      sorte: "defi",
      question: `Mon nombre est <b>entre 3,4 et 3,5</b>.<br>Il a <b>deux chiffres</b> après la virgule.<br>Son chiffre des centièmes est <b>7</b>.<br><br><b>Qui suis-je</b> ?`,
      reponse: `Entre 3,4 et 3,5 : il commence par 3,4…<br>Le chiffre suivant, celui des centièmes, est 7.<br>C'est <span class="big">3,47</span>.`,
      consigne: "Quel est le nombre caché ?",
      verification: { type: "courte", attendus: ["3,47", "3.47"] },
      dessin: cache,
    },
  ],
};

export default problemes;
