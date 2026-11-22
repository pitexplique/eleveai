// Énigmes à projeter — première (sans spé maths), notion expo_suite_terme_general
// (le livret de Yanis, l'ordinateur portable, la vidéo de danse, la colonie de
// manchots, piège de l'appli de jardinage, défi des monstres du jeu vidéo). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 20) =>
  r(30, y, 420, 22 + 34 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 36 + 34 * k, s, c, taille)).join("");

const livret = svg("Livret d'épargne : 2 000 € au départ, + 3 % par an",
  cadre(40, ["u(0) = 2 000 €", "+ 3 % chaque année"], C.bleu, 24) +
    t(240, 220, "u(n) : l'argent dans n années", C.pale, 20) +
    t(240, 385, `u(n) = ${NB}?`, C.rose, 26));

const ordi = (() => {
  const R = repereXY(0, 6, 0, 1000, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 100, ey: 200 });
  let s = "";
  for (let n = 0; n <= 5; n++) s += R.point(n, 900 * 0.8 ** n, C.bleu, 7);
  return svg("Valeur d'un ordinateur portable : u(n) = 900 × 0,8 puissance n euros, points pour n = 0 à 5",
    R.fond + s + t(R.X(0) + 10, 28, "valeur (€)", C.pale, 17, "start") + t(R.X(6), R.Y(0) + 46, "années n", C.pale, 17, "end") +
      t(R.X(4.2), R.Y(820), "u(n) = 900 × 0,8ⁿ", C.bleu, 20) +
      t(240, 405, `croissante ou décroissante${NB}?`, C.rose, 24));
})();

const danse = (() => {
  const R = repereXY(0, 4, 0, 900, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 100, ey: 200 });
  let s = "";
  for (let n = 0; n <= 3; n++) s += R.point(n, 100 * 2 ** n, C.jaune, 8);
  return svg("Vues d'une vidéo de danse : 100, 200, 400, 800 vues aux jours 0, 1, 2, 3",
    R.fond + s + t(R.X(0) + 10, 28, "vues", C.pale, 17, "start") + t(R.X(4), R.Y(0) + 46, "jour n", C.pale, 17, "end") +
      t(240, 405, `les vues au jour 5${NB}?`, C.rose, 24));
})();

const manchots = svg("Colonie de manchots : u(n) = 3 000 × 0,95 puissance n, l'année 2024 + n ; u(10) environ 1 796",
  cadre(40, ["u(n) = 3 000 × 0,95ⁿ", "n = 0 : l'année 2024"], C.bleu, 24) +
    t(240, 240, "u(10) ≈ 1 796", C.jaune, 30) +
    t(240, 385, `que veut dire u(10)${NB}?`, C.rose, 24));

const jardinage = svg("Téléchargements d'une appli de jardinage : semaine 1, 2, 3, 4 ; 500, 1 000, 2 000, 4 000",
  tableau(25, 70, [130, 75, 75, 75, 75], 60, [["semaine", 1, 2, 3, 4], ["téléch.", "500", "1 000", "2 000", "4 000"]], (i, j) => (j === 0 ? C.pale : C.craie), 22) +
    t(240, 250, "× 2 chaque semaine", C.pale, 20) +
    t(240, 385, `la 6e semaine${NB}?`, C.rose, 26));

const monstres = svg("Monstres d'un jeu vidéo : 3 au niveau 0, 81 au niveau 3, suite géométrique",
  tableau(25, 70, [130, 75, 75, 75, 75], 60, [["niveau", 0, 1, 2, 3], ["monstres", 3, "?", "?", 81]], (i, j) => (j === 0 ? C.pale : C.craie), 22) +
    t(240, 250, "suite géométrique", C.pale, 20) +
    t(240, 385, `au niveau 5${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "expo_suite_terme_general",
  titre: "Énigmes du terme général d'une suite géométrique",
  description: "Le livret de Yanis, l'ordinateur portable, la vidéo de danse, la colonie de manchots, le piège de l'appli de jardinage, le défi des monstres du jeu vidéo : écrire u(n) = u(0) × qⁿ, trouver le sens de variation, lire les termes sur un graphique, interpréter un terme.",
  problemes: [
    {
      tag: "Énigme 1 · Le livret de Yanis",
      titre: "Écrire u(n) en fonction de n",
      question: `Yanis place 2 000 € sur un livret à 3 % par an. On note u(n) l'argent sur le livret dans n années.<br><br><b>Quelle formule</b> donne u(n) ?`,
      reponse: `+ 3 %, c'est × 1,03 chaque année : suite géométrique de raison 1,03.<br>Donc <span class="big">u(n) = 2 000 × 1,03<sup>n</sup></span>.`,
      consigne: "2 000 € au départ, + 3 % par an : quelle formule donne u(n) ?",
      verification: { type: "qcm", choix: ["u(n) = 2 000 + 1,03n", "u(n) = 2 000 × 1,03ⁿ", "u(n) = 2 000 × 0,03ⁿ"], bonne: 1 },
      dessin: livret,
    },
    {
      tag: "Énigme 2 · L'ordinateur portable",
      titre: "Le sens de variation",
      question: `Un ordinateur portable vaut u(n) = 900 × 0,8<sup>n</sup> euros, n années après l'achat.<br><br><b>Comment varie</b> la suite (u(n)) ?`,
      reponse: `u(0) = 900 > 0 et la raison est q = 0,8, avec 0 &lt; 0,8 &lt; 1.<br>La suite est <span class="big">décroissante</span> : l'ordinateur perd 20 % de sa valeur chaque année.`,
      consigne: "u(n) = 900 × 0,8ⁿ : la suite est-elle croissante, décroissante ou constante ?",
      verification: { type: "qcm", choix: ["Croissante, car 900 > 0", "Constante", "Décroissante, car 0 < 0,8 < 1"], bonne: 2 },
      dessin: ordi,
    },
    {
      tag: "Énigme 3 · La vidéo de danse",
      titre: "Lire la suite sur un graphique",
      question: `Le graphique montre les vues d'une vidéo de danse au jour n. Elles suivent une suite géométrique.<br><br><b>Combien de vues</b> au jour 5 ?`,
      reponse: `On lit u(0) = 100, puis 200, 400, 800 : la raison est 2. Donc u(n) = 100 × 2<sup>n</sup>.<br>u(5) = 100 × 2<sup>5</sup> = 100 × 32 = <span class="big">3 200 vues</span>.`,
      consigne: "100, 200, 400, 800 vues aux jours 0 à 3, suite géométrique : combien de vues au jour 5 ?",
      verification: { type: "courte", attendus: ["3200", "3 200"], unite: "vues" },
      dessin: danse,
    },
    {
      tag: "Énigme 4 · La colonie de manchots",
      titre: "Interpréter un terme",
      question: `Une colonie compte u(n) = 3 000 × 0,95<sup>n</sup> manchots l'année 2024 + n.<br>On calcule u(10) ≈ 1 796.<br><br><b>Que veut dire</b> ce résultat ?`,
      reponse: `n = 10, c'est l'année 2024 + 10 = 2034. u(10) est le nombre de manchots cette année-là.<br><span class="big">En 2034, la colonie compte environ 1 796 manchots.</span>`,
      consigne: "u(n) = 3 000 × 0,95ⁿ manchots l'année 2024 + n : que veut dire u(10) ≈ 1 796 ?",
      verification: { type: "qcm", choix: ["En 2034, la colonie compte environ 1 796 manchots", "La colonie perd 1 796 manchots en 10 ans", "En 2010, la colonie comptait 1 796 manchots"], bonne: 0 },
      dessin: manchots,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'appli de jardinage",
      sorte: "piege",
      question: `Une appli de jardinage est téléchargée 500 fois la semaine 1 : u(1) = 500. Ce nombre double chaque semaine.<br>Inès écrit : u(6) = 500 × 2<sup>6</sup>.<br><br><b>Combien</b> de téléchargements la 6<sup>e</sup> semaine ?`,
      reponse: `La suite commence au rang 1 ! De u(1) à u(6), on double 5 fois, pas 6.<br>u(6) = 500 × 2<sup>5</sup> = 500 × 32 = <span class="big">16 000</span> téléchargements.`,
      consigne: "u(1) = 500 et × 2 chaque semaine : combien de téléchargements la 6e semaine ?",
      verification: { type: "courte", attendus: ["16000", "16 000"], unite: "téléchargements" },
      dessin: jardinage,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les monstres du jeu vidéo",
      sorte: "defi",
      question: `Dans un jeu vidéo, le nombre de monstres suit une suite géométrique : 3 au niveau 0 et 81 au niveau 3.<br><br><b>Combien</b> de monstres au niveau 5 ?`,
      reponse: `u(3) = 3 × q<sup>3</sup> = 81, donc q<sup>3</sup> = 27 et q = 3 (car 3 × 3 × 3 = 27).<br>u(5) = 3 × 3<sup>5</sup> = 3 × 243 = <span class="big">729 monstres</span>.`,
      consigne: "Suite géométrique, 3 monstres au niveau 0 et 81 au niveau 3 : combien au niveau 5 ?",
      verification: { type: "courte", attendus: ["729"], unite: "monstres" },
      dessin: monstres,
    },
  ],
};

export default problemes;
