// Énigmes à projeter — première (sans spé maths), notion lin_suite_terme_general
// (l'amphithéâtre, le sel de déneigement, la carte de fidélité, le club de kayak,
// piège des cartes à collectionner, défi des deux podcasts). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 20) =>
  r(30, y, 420, 22 + 34 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 36 + 34 * k, s, c, taille)).join("");

const amphi = svg("Tableau des sièges d'un amphithéâtre : rang 0, 1, 2, 3 ; 18, 20, 22, 24 sièges",
  tableau(30, 70, [120, 75, 75, 75, 75], 60, [["rang n", 0, 1, 2, 3], ["sièges", 18, 20, 22, 24]], (i, j) => (j === 0 ? C.pale : C.craie), 22) +
    t(240, 250, "+ 2 sièges à chaque rang", C.pale, 20) +
    t(240, 385, `u(n) = ${NB}?`, C.rose, 26));

const sel = (() => {
  const R = repereXY(0, 6, 600, 1000, { gx: 90, gy: 40, gl: 330, gh: 270, px: 1, ex: 1, py: 50, ey: 100 });
  let s = "";
  for (let n = 0; n <= 5; n++) s += R.point(n, 900 - 40 * n, C.bleu, 7);
  return svg("Stock de sel de déneigement : u(n) = 900 − 40n tonnes, points pour n = 0 à 5",
    R.fond + t(R.X(0), R.Y(600) + 24, "0", C.pale, 17) + s +
      t(R.X(0) + 10, 28, "sel (t)", C.pale, 17, "start") + t(R.X(6), R.Y(600) + 46, "jour n", C.pale, 17, "end") +
      t(R.X(3), R.Y(980), "u(n) = 900 − 40n", C.bleu, 20) +
      t(240, 405, `croissante ou décroissante${NB}?`, C.rose, 24));
})();

const fidelite = (() => {
  const R = repereXY(0, 5, 0, 120, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 15, ey: 30 });
  let s = "";
  for (let n = 0; n <= 3; n++) s += R.point(n, 30 + 15 * n, C.jaune, 8);
  return svg("Points de fidélité : 30, 45, 60, 75 points pour n = 0, 1, 2, 3 achats",
    R.fond + s + t(R.X(0) + 10, 28, "points", C.pale, 17, "start") + t(R.X(5), R.Y(0) + 46, "achats n", C.pale, 17, "end") +
      t(240, 405, `u(12)${NB}?`, C.rose, 26));
})();

const kayak = svg("Membres d'un club de kayak : u(n) = 120 + 8n, l'année 2020 + n ; u(5) = 160",
  cadre(40, ["u(n) = 120 + 8n", "n = 0 : l'année 2020"], C.bleu, 24) +
    t(240, 240, "u(5) = 160", C.jaune, 30) +
    t(240, 385, `que veut dire u(5) = 160${NB}?`, C.rose, 24));

const cartes = svg("Cartes à collectionner : semaine 1, 2, 3, 4 ; 50, 56, 62, 68 cartes",
  tableau(25, 70, [130, 75, 75, 75, 75], 60, [["semaine", 1, 2, 3, 4], ["cartes", 50, 56, 62, 68]], (i, j) => (j === 0 ? C.pale : C.craie), 22) +
    t(240, 250, "+ 6 cartes par semaine", C.pale, 20) +
    t(240, 385, `la 10e semaine${NB}?`, C.rose, 26));

const podcasts = svg("Deux podcasts : A, u(n) = 300 + 20n auditeurs ; B, v(n) = 500 + 12n auditeurs, au mois n",
  cadre(40, ["A · u(n) = 300 + 20n", "B · v(n) = 500 + 12n"], C.bleu, 24) +
    t(240, 220, "A part plus bas, mais grandit plus vite", C.pale, 20) +
    t(240, 385, `u(n) = v(n) pour n = ${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "lin_suite_terme_general",
  titre: "Énigmes du terme général d'une suite arithmétique",
  description: "L'amphithéâtre, le sel de déneigement, la carte de fidélité, le club de kayak, le piège des cartes à collectionner, le défi des deux podcasts : écrire u(n) = u(0) + nr, trouver le sens de variation avec le signe de r, lire une suite sur un graphique, interpréter un terme.",
  problemes: [
    {
      tag: "Énigme 1 · L'amphithéâtre",
      titre: "Écrire u(n) en fonction de n",
      question: `Dans un amphithéâtre, le premier rang (rang 0) a 18 sièges. Chaque rang a 2 sièges de plus que le précédent.<br><br><b>Quelle formule</b> donne u(n), le nombre de sièges du rang n ?`,
      reponse: `Suite arithmétique de premier terme u(0) = 18 et de raison r = 2.<br>Donc <span class="big">u(n) = 18 + 2n</span>. Vérification : u(3) = 18 + 6 = 24.`,
      consigne: "18 sièges au rang 0, puis 2 de plus par rang : quelle formule donne u(n) ?",
      verification: { type: "qcm", choix: ["u(n) = 18 + 2n", "u(n) = 2 + 18n", "u(n) = 18 × 2ⁿ"], bonne: 0 },
      dessin: amphi,
    },
    {
      tag: "Énigme 2 · Le sel de déneigement",
      titre: "Le sens de variation",
      question: `À Montréal, une ville a 900 tonnes de sel pour les routes. Elle en utilise 40 tonnes par jour de neige : u(n) = 900 − 40n.<br><br><b>Comment varie</b> la suite (u(n)) ?`,
      reponse: `La raison est r = −40, et −40 &lt; 0.<br>La suite est <span class="big">décroissante</span> : le stock baisse de 40 t chaque jour.`,
      consigne: "u(n) = 900 − 40n : la suite est-elle croissante, décroissante ou constante ?",
      verification: { type: "qcm", choix: ["Croissante", "Décroissante", "Constante"], bonne: 1 },
      dessin: sel,
    },
    {
      tag: "Énigme 3 · La carte de fidélité",
      titre: "Lire la suite sur un graphique",
      question: `Le graphique montre les points d'une carte de fidélité après n achats. Les points sont alignés.<br><br><b>Combien de points</b> après 12 achats ?`,
      reponse: `On lit u(0) = 30, puis +15 à chaque achat : u(n) = 30 + 15n.<br>u(12) = 30 + 15 × 12 = 30 + 180 = <span class="big">210 points</span>.`,
      consigne: "u(0) = 30 et +15 points par achat : combien de points après 12 achats ?",
      verification: { type: "courte", attendus: ["210"], unite: "points" },
      dessin: fidelite,
    },
    {
      tag: "Énigme 4 · Le club de kayak",
      titre: "Interpréter un terme",
      question: `Un club de kayak compte u(n) = 120 + 8n membres l'année 2020 + n.<br>On calcule u(5) = 160.<br><br><b>Que veut dire</b> ce résultat ?`,
      reponse: `n = 5, c'est l'année 2020 + 5 = 2025. u(5) est le nombre de membres cette année-là.<br><span class="big">En 2025, le club compte 160 membres.</span>`,
      consigne: "u(n) = 120 + 8n membres l'année 2020 + n : que veut dire u(5) = 160 ?",
      verification: { type: "qcm", choix: ["En 2025, le club a 160 membres de plus qu'en 2020", "Il faut 5 ans pour gagner 160 membres", "En 2025, le club compte 160 membres"], bonne: 2 },
      dessin: kayak,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les cartes à collectionner",
      sorte: "piege",
      question: `Sacha a 50 cartes à la semaine 1 : u(1) = 50. Il en gagne 6 par semaine.<br>Il écrit : u(10) = 50 + 6 × 10.<br><br><b>Combien</b> de cartes a-t-il la 10<sup>e</sup> semaine ?`,
      reponse: `La suite commence au rang 1, pas au rang 0 ! De u(1) à u(10), il y a 9 semaines, pas 10.<br>u(10) = 50 + 9 × 6 = 50 + 54 = <span class="big">104 cartes</span>.`,
      consigne: "u(1) = 50 et +6 cartes par semaine : combien de cartes la 10e semaine ?",
      verification: { type: "courte", attendus: ["104"], unite: "cartes" },
      dessin: cartes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux podcasts",
      sorte: "defi",
      question: `Au mois n, le podcast A a u(n) = 300 + 20n auditeurs. Le podcast B a v(n) = 500 + 12n auditeurs.<br><br><b>Pour quel n</b> ont-ils le même nombre d'auditeurs ?`,
      reponse: `On cherche 300 + 20n = 500 + 12n, donc 8n = 200 et n = 25.<br>Au <span class="big">mois 25</span>, les deux ont 800 auditeurs : 300 + 20 × 25 = 800 et 500 + 12 × 25 = 800.`,
      consigne: "u(n) = 300 + 20n et v(n) = 500 + 12n : pour quel n a-t-on u(n) = v(n) ?",
      verification: { type: "courte", attendus: ["25"] },
      dessin: podcasts,
    },
  ],
};

export default problemes;
