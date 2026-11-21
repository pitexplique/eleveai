// Énigmes à projeter — CM1, notion nombres décimaux (le jus à 1,35 €, les 7
// dixièmes de l'escargot, la pluie de la semaine, le point sur la droite entre
// 3 et 4, le piège des deux bébés, le défi du nombre caché). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, droiteGraduee } from "../dessins-ecole";
import { frac } from "../outils";

const jus = svg(
  "Une brique de jus à 1,35 €",
  r(170, 80, 140, 210, C.jaune, 0.25, 4, 8) + t(240, 190, "🧃", C.craie, 70) + r(300, 60, 130, 60, C.rose, 0.15, 3, 10) + t(365, 100, "1,35 €", C.craie, 28) +
    t(240, 360, `1 € et${NB}? centimes`, C.rose, 28)
);

// L'escargot : 1 m = 360 px, partagé en 10 ; il est à 7 dixièmes.
const escargot = svg(
  "Un mètre partagé en 10 ; l'escargot a avancé de 7 dixièmes de mètre",
  r(60, 200, 360, 30, C.craie, 0.05, 3) + Array.from({ length: 9 }, (_, i) => `<path d="M${60 + (i + 1) * 36} 200 L${60 + (i + 1) * 36} 230" stroke="${C.pale}" stroke-width="2"/>`).join("") +
    r(60, 200, 252, 30, C.jaune, 0.4, 3) + t(312, 185, "🐌", C.craie, 40) + t(60, 270, "0 m", C.pale, 20) + t(420, 270, "1 m", C.pale, 20) +
    t(240, 350, `en nombre décimal${NB}?`, C.rose, 28)
);

// La pluie : 1 cm = 60 px, au bon rapport.
const pluie = svg(
  "La pluie tombée : lundi 2,8 cm, mardi 2,15 cm, mercredi 2,5 cm",
  [["lundi", 2.8, "2,8 cm"], ["mardi", 2.15, "2,15 cm"], ["mercredi", 2.5, "2,5 cm"]].map(([j, h, s], i) =>
    r(70 + i * 130, 300 - (h as number) * 60, 80, (h as number) * 60, C.bleu, 0.35, 3) + t(110 + i * 130, 290 - (h as number) * 60, s as string, C.craie, 22) + t(110 + i * 130, 335, j as string, C.pale, 22)).join("") +
    t(240, 60, "🌧️", C.craie, 40) + t(240, 390, `Le jour le plus pluvieux${NB}?`, C.rose, 26)
);

const droite = svg(
  "Une droite graduée de 3 à 4 en dixièmes ; le point B",
  droiteGraduee(200, 50, 430, 3, 4, 0.1, 1) + o(50 + 380 * 0.6, 200, 9, C.rose, 1, 2) + t(50 + 380 * 0.6, 160, "B", C.rose, 34) +
    t(240, 330, `B${NB}= ?`, C.rose, 34)
);

const bebes = svg(
  "Deux bébés : Lou pèse 4,9 kg, Max pèse 4,12 kg",
  t(130, 180, "👶", C.craie, 100) + t(350, 180, "👶", C.craie, 100) + t(130, 260, "Lou", C.craie, 26) + t(350, 260, "Max", C.craie, 26) +
    t(130, 305, "4,9 kg", C.bleu, 30) + t(350, 305, "4,12 kg", C.bleu, 30) + t(240, 385, `Le plus lourd${NB}?`, C.rose, 28)
);

const cache = svg(
  "Un nombre caché entre 5 et 6",
  r(150, 70, 180, 100, C.jaune, 0.2, 4, 12) + t(240, 140, "5, ? ?", C.craie, 50) +
    t(240, 230, `dixièmes${NB}: 3`, C.bleu, 26) + t(240, 280, `centièmes${NB}: double des dixièmes`, C.bleu, 22) + t(240, 360, `Qui suis-je${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "nombre_decimal",
  titre: "Énigmes sur les nombres décimaux",
  description: "Le jus à 1,35 €, les 7 dixièmes de l'escargot, la pluie de la semaine, le point entre 3 et 4 sur la droite, le piège des deux bébés, le défi du nombre caché.",
  problemes: [
    {
      tag: "Énigme 1 · La cantine",
      titre: "Le prix du jus",
      question: `Un jus coûte <b>1,35 €</b>.<br><br>C'est 1 euro et <b>combien de centimes</b> ?`,
      reponse: `1,35 € : 1 euro, 3 dixièmes et 5 centièmes d'euro.<br>Après la virgule : <span class="big">35 centimes</span>.`,
      consigne: "1,35 €, c'est 1 euro et combien de centimes ?",
      verification: { type: "courte", attendus: ["35"], unite: "centimes" },
      dessin: jus,
    },
    {
      tag: "Énigme 2 · Au jardin",
      titre: "L'escargot",
      question: `Un escargot avance de <b>7 dixièmes</b> de mètre.<br><br>Écris cette longueur en <b>nombre décimal</b>.`,
      reponse: `7 dixièmes = ${frac(7, 10)}.<br>0 unité, 7 au rang des dixièmes : <span class="big">0,7 m</span>.`,
      consigne: "Écris 7 dixièmes de mètre en nombre décimal.",
      verification: { type: "courte", attendus: ["0,7", "0.7"], unite: "m" },
      dessin: escargot,
    },
    {
      tag: "Énigme 3 · La météo",
      titre: "La pluie de la semaine",
      question: `Lundi, il tombe <b>2,8 cm</b> de pluie.<br>Mardi, <b>2,15 cm</b>. Mercredi, <b>2,5 cm</b>.<br><br><b>Quel jour</b> a-t-il le plus plu ?`,
      reponse: `Les unités sont pareilles : 2.<br>On compare les dixièmes : 8, 1 et 5.<br>Le plus : <span class="big">lundi</span> (2,8 cm).`,
      consigne: "Quel jour a-t-il le plus plu ?",
      verification: { type: "qcm", choix: ["lundi", "mardi", "mercredi"], bonne: 0 },
      dessin: pluie,
    },
    {
      tag: "Énigme 4 · La droite graduée",
      titre: "Le point B",
      question: `La droite va de <b>3</b> à <b>4</b>.<br>Elle est partagée en <b>dixièmes</b>.<br><br>Quel nombre est au point <b>B</b> ?`,
      reponse: `Chaque petit trait vaut 0,1.<br>B est à 6 traits après 3.<br>B = <span class="big">3,6</span>.`,
      consigne: "Quel nombre est au point B ?",
      verification: { type: "courte", attendus: ["3,6", "3.6"] },
      dessin: droite,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux bébés",
      sorte: "piege",
      question: `Le bébé Lou pèse <b>4,9 kg</b>.<br>Le bébé Max pèse <b>4,12 kg</b>.<br><br><b>Qui est le plus lourd</b> ?`,
      reponse: `Le piège : 12 est plus grand que 9.<br>Mais on compare les dixièmes : 9 contre 1.<br>4,9 = 4,90 &gt; 4,12. C'est <span class="big">Lou</span>.`,
      consigne: "Qui est le plus lourd ?",
      verification: { type: "qcm", choix: ["Max", "Lou", "Ils pèsent pareil"], bonne: 1 },
      dessin: bebes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le nombre caché",
      sorte: "defi",
      question: `Je suis entre <b>5 et 6</b>.<br>Mon chiffre des dixièmes est <b>3</b>.<br>Mon chiffre des centièmes est le <b>double</b> de celui des dixièmes.<br><br><b>Qui suis-je</b> ?`,
      reponse: `Entre 5 et 6 : 5 unités.<br>Dixièmes : 3. Centièmes : 3 × 2 = 6.<br>Je suis <span class="big">5,36</span>.`,
      consigne: "Quel est le nombre caché ?",
      verification: { type: "courte", attendus: ["5,36", "5.36"] },
      dessin: cache,
    },
  ],
};

export default problemes;
