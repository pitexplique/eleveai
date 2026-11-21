// Énigmes à projeter — première (sans spé maths), notion lin_seuil
// (la cagnotte du voyage scolaire, la guitare de Malik, le groupe électrogène du
// festival, le village de montagne, piège du cours en ligne, défi de l'appli de lecture). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r } from "../dessins-ecole";
import { tableau, code } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 20) =>
  r(30, y, 420, 22 + 34 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 36 + 34 * k, s, c, taille)).join("");

const voyage = svg("Cagnotte d'un voyage scolaire : u(n) = 350 + 125n euros ; objectif 2 100 euros",
  cadre(40, ["u(n) = 350 + 125n", "objectif : 2 100 €"], C.bleu, 24) +
    t(240, 230, "n = nombre de mois", C.pale, 20) +
    t(240, 385, `dès quel mois${NB}?`, C.rose, 26));

const guitare = svg("Tableau des économies de Malik : mois 0 à 6 ; 80, 115, 150, 185, 220, 255, 290 euros ; la guitare coûte 240 euros",
  tableau(10, 70, [96, 52, 52, 52, 52, 52, 52, 52], 60, [["mois", 0, 1, 2, 3, 4, 5, 6], ["€", 80, 115, 150, 185, 220, 255, 290]], (i, j) => (j === 0 ? C.pale : C.craie), 20) +
    t(240, 250, "la guitare coûte 240 €", C.jaune, 22) +
    t(240, 385, `dès quel mois${NB}?`, C.rose, 26));

const groupe = (() => {
  const R = repereXY(0, 18, 0, 450, { gx: 80, gy: 40, gl: 340, gh: 270, px: 2, ex: 2, py: 50, ey: 100 });
  return svg("Gazole d'un groupe électrogène : f(t) = 400 − 25t litres ; une ligne en pointillés à 150 litres, l'alarme",
    R.fond + l(R.X(0), R.Y(150), R.X(18), R.Y(150), C.rose, 3, "8 6") + R.courbe((x) => 400 - 25 * x, 0, 16, C.bleu, 4) +
      t(R.X(17.8), R.Y(150) - 10, "alarme", C.rose, 18, "end") +
      t(R.X(0) + 10, 28, "gazole (L)", C.pale, 17, "start") + t(R.X(18), R.Y(0) + 46, "heures t", C.pale, 17, "end") +
      t(240, 405, `quand sonne l'alarme${NB}?`, C.rose, 24));
})();

const village = svg("Habitants d'un village de montagne : 950 en 2024, puis 12 de moins chaque année ; seuil 800 habitants",
  cadre(40, ["u(n) = 950 − 12n", "n = 0 : l'année 2024"], C.bleu, 24) +
    t(240, 230, "moins de 800 habitants…", C.pale, 20) +
    t(240, 385, `en quelle année${NB}?`, C.rose, 26));

const cours = svg("Inscrits à un cours en ligne : u(n) = 2 400 + 180n ; seuil 5 000 inscrits",
  cadre(40, ["u(n) = 2 400 + 180n", "on veut plus de 5 000 inscrits"], C.bleu, 22) +
    t(240, 230, "n = numéro de la semaine", C.pale, 20) +
    t(240, 385, `dès quelle semaine${NB}?`, C.rose, 26));

const lecture = svg("Programme Python : u = 230, n = 0 ; tant que u est plus petit que 1000, u = u + 35 et n = n + 1 ; afficher n",
  code([["u = 230", 0], ["n = 0", 0], ["while u &lt; 1000:", 0], ["u = u + 35", 1], ["n = n + 1", 1], ["print(n)", 0]], { y: 30, pas: 40, taille: 22 }) +
    t(240, 330, "pages lues dans une appli", C.pale, 20) +
    t(240, 390, `qu'affiche le programme${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "lin_seuil",
  titre: "Énigmes de seuil en croissance linéaire",
  description: "La cagnotte du voyage scolaire, la guitare de Malik, le groupe électrogène du festival, le village de montagne, le piège du cours en ligne, le défi de l'appli de lecture : trouver un seuil par le calcul, avec un tableau de valeurs, sur un graphique ou avec un programme.",
  problemes: [
    {
      tag: "Énigme 1 · Le voyage scolaire",
      titre: "Un seuil par le calcul",
      question: `Une classe a 350 € pour son voyage. Elle ajoute 125 € chaque mois : u(n) = 350 + 125n.<br><br><b>Dès quel mois</b> la cagnotte atteint-elle 2 100 € ?`,
      reponse: `On résout 350 + 125n ≥ 2 100, donc 125n ≥ 1 750 et n ≥ 14.<br>Dès le <span class="big">mois 14</span> : u(14) = 350 + 1 750 = 2 100 €.`,
      consigne: "u(n) = 350 + 125n : dès quel mois la cagnotte atteint-elle 2 100 € ?",
      verification: { type: "courte", attendus: ["14"] },
      dessin: voyage,
    },
    {
      tag: "Énigme 2 · La guitare de Malik",
      titre: "Un seuil avec un tableau",
      question: `Malik économise pour une guitare à 240 €. Le tableau donne ses économies chaque mois.<br><br><b>Dès quel mois</b> peut-il l'acheter ?`,
      reponse: `Au mois 4, il a 220 € : pas assez. Au mois 5, il a 255 €, et 255 ≥ 240.<br>Dès le <span class="big">mois 5</span>.`,
      consigne: "Économies 80, 115, 150, 185, 220, 255, 290 € : dès quel mois atteint-il 240 € ?",
      verification: { type: "qcm", choix: ["Le mois 4", "Le mois 5", "Le mois 6"], bonne: 1 },
      dessin: guitare,
    },
    {
      tag: "Énigme 3 · Le groupe électrogène",
      titre: "Un seuil sur le graphique",
      question: `À un festival, un groupe électrogène a 400 L de gazole. Il en brûle 25 L par heure : f(t) = 400 − 25t. Une alarme sonne à 150 L.<br><br><b>Quand</b> sonne l'alarme ?`,
      reponse: `La droite coupe la ligne de l'alarme en t = 10. Par le calcul : 400 − 25t = 150, donc 25t = 250 et t = 10.<br><span class="big">Après 10 h</span>.`,
      consigne: "f(t) = 400 − 25t et alarme à 150 L : après combien d'heures sonne-t-elle ?",
      verification: { type: "qcm", choix: ["Après 10 h", "Après 16 h", "Après 6 h"], bonne: 0 },
      dessin: groupe,
    },
    {
      tag: "Énigme 4 · Le village de montagne",
      titre: "Un seuil qui descend",
      question: `Un village des Pyrénées a 950 habitants en 2024. Il en perd 12 par an : u(n) = 950 − 12n.<br><br><b>En quelle année</b> aura-t-il moins de 800 habitants ?`,
      reponse: `950 − 12n &lt; 800, donc 12n > 150 et n > 12,5. Le premier entier est n = 13.<br>2024 + 13 = <span class="big">2037</span> (u(13) = 794).`,
      consigne: "u(n) = 950 − 12n habitants l'année 2024 + n : en quelle année moins de 800 ?",
      verification: { type: "courte", attendus: ["2037"] },
      dessin: village,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le cours en ligne",
      sorte: "piege",
      question: `Un cours en ligne a u(n) = 2 400 + 180n inscrits la semaine n. On veut plus de 5 000 inscrits.<br>On trouve n > 14,4…<br><br><b>Dès quelle semaine</b> est-ce vrai ?`,
      reponse: `n est un numéro de semaine : un entier. 14 est trop petit (u(14) = 4 920). On ne coupe pas, on prend l'entier suivant.<br><span class="big">La semaine 15</span> : u(15) = 5 100.`,
      consigne: "u(n) = 2 400 + 180n : dès quelle semaine plus de 5 000 inscrits ?",
      verification: { type: "qcm", choix: ["La semaine 14", "La semaine 14,4", "La semaine 15"], bonne: 2 },
      dessin: cours,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'appli de lecture",
      sorte: "defi",
      question: `Une appli compte les pages lues : 230 au départ, puis 35 de plus chaque jour. Le programme cherche quand on atteint 1 000 pages.<br><br><b>Quel nombre</b> affiche-t-il ?`,
      reponse: `La boucle s'arrête dès que u ≥ 1 000. 230 + 35n ≥ 1 000, donc 35n ≥ 770 et n ≥ 22.<br>Le programme affiche <span class="big">22</span> (u vaut alors 1 000 tout juste).`,
      consigne: "u = 230, puis u = u + 35 tant que u < 1000 : quelle valeur de n s'affiche ?",
      verification: { type: "courte", attendus: ["22"] },
      dessin: lecture,
    },
  ],
};

export default problemes;
