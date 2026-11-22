// Énigmes à projeter — première (sans spé maths), notion info_tableur
// (la tirelire de Noah, les billets de train, le nageur et ses longueurs, la
// boutique de jeux de société, piège du concours de pâtisserie, défi de la
// chaîne de cuisine). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";

/** Une feuille de tableur : en-têtes A, B, C… et numéros de ligne en pâle ;
 *  `vise` = [ligne, colonne] (1 = A) de la cellule à surligner. */
const feuille = (x: number, y: number, cols: number[], h: number, lignes: (string | number)[][], vise: [number, number][] = [], taille = 20) => {
  const lettres = ["", ...cols.slice(1).map((_, k) => "ABCDE"[k])];
  const cel = [lettres, ...lignes.map((li, i) => [i + 1, ...li])];
  const couleur = (i: number, j: number) =>
    vise.some(([a, b]) => a === i && b === j) ? C.jaune : i === 0 || j === 0 ? C.pale : C.craie;
  let s = "";
  for (const [a, b] of vise) {
    const gx = x + cols.slice(0, b).reduce((u, v) => u + v, 0);
    s += r(gx, y + a * h, cols[b], h, C.jaune, 0.18, 0);
  }
  return s + tableau(x, y, cols, h, cel, couleur, taille);
};

const tirelire = svg("Feuille de tableur : mois 1 à 5 en colonne A, épargne 50, 65, 80, 95, 110 en colonne B ; la cellule B4 est surlignée",
  feuille(70, 30, [50, 120, 170], 48, [["mois", "épargne (€)"], [1, 50], [2, 65], [3, 80], [4, 95], [5, 110]], [[4, 2]]) +
    t(240, 395, `que contient B4${NB}?`, C.rose, 26));

const train = svg("Feuille de tableur : B2 vaut 40, C2 contient la formule =B2*1,05",
  feuille(30, 70, [50, 140, 110, 120], 56, [["trajet", "prix 2025", "prix 2026"], ["Lyon", 40, "=B2*1,05"]], [[2, 3]], 21) +
    t(240, 290, "+ 5 % sur les billets", C.pale, 20) + t(240, 385, `quel nombre s'affiche en C2${NB}?`, C.rose, 24));

const nageur = svg("Feuille de tableur : semaine 1 à 4 en colonne A, longueurs en B ; B2 vaut 20, B3 est à remplir et à recopier vers le bas",
  feuille(70, 30, [50, 120, 170], 44, [["semaine", "longueurs"], [1, 20], [2, "?"], [3, ""], [4, ""]], [[3, 2]]) +
    t(240, 330, "+ 15 longueurs chaque semaine", C.pale, 20) + t(240, 390, `quelle formule en B3${NB}?`, C.rose, 24));

const jeux = svg("Feuille de tableur : les 12 mois en colonne A et les ventes d'une boutique de jeux en colonne B (extrait)",
  feuille(70, 20, [50, 120, 140], 38, [["mois", "ventes"], ["janvier", 320], ["février", 280], ["mars", 300], ["…", "…"], ["novembre", 610], ["décembre", 940]], [], 19) +
    t(240, 390, `quel diagramme choisir${NB}?`, C.rose, 24));

const patisserie = svg("Feuille de tableur : manche 1 en A, manche 2 en B, total en C ; C2 contient =A2+B2, recopiée vers le bas jusqu'à C5",
  feuille(40, 30, [50, 110, 110, 140], 44, [["manche 1", "manche 2", "total"], [12, 15, "=A2+B2"], [14, 11, ""], [9, 17, ""], [16, 13, "?"]], [[5, 3]]) +
    t(240, 340, "C2 recopiée vers le bas", C.pale, 20) + t(240, 390, `quelle formule en C5${NB}?`, C.rose, 24));

const cuisine = svg("Feuille de tableur : mois 0 en A2, 1 000 abonnés en B2, B3 contient =B2*1,1 recopiée vers le bas",
  feuille(70, 30, [50, 120, 170], 40, [["mois", "abonnés"], [0, "1 000"], [1, "=B2*1,1"], [2, "…"], [3, "…"], ["…", "…"]], [[3, 2]]) +
    t(240, 340, "+ 10 % par mois", C.pale, 20) + t(240, 390, `quand dépasse-t-on 1 500${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "info_tableur",
  titre: "Énigmes du tableur",
  description: "La tirelire de Noah, les billets de train, le nageur et ses longueurs, la boutique de jeux de société, le piège du concours de pâtisserie, le défi de la chaîne de cuisine : lire une cellule, comprendre et écrire une formule, la recopier, choisir un diagramme.",
  problemes: [
    {
      tag: "Énigme 1 · La tirelire de Noah",
      titre: "Lire une cellule",
      question: `Noah note dans un tableur ce qu'il a dans sa tirelire chaque mois.<br><br><b>Quel nombre</b> contient la cellule B4 ?`,
      reponse: `B4, c'est la colonne B (l'épargne) et la ligne 4 (le mois 3).<br>Elle contient <span class="big">80</span> : Noah a 80 € au bout de 3 mois.`,
      consigne: "Colonne B, ligne 4 : quel nombre contient la cellule B4 ?",
      verification: { type: "courte", attendus: ["80"] },
      dessin: tirelire,
    },
    {
      tag: "Énigme 2 · Les billets de train",
      titre: "Comprendre une formule",
      question: `Un billet Paris – Lyon coûte 40 € (cellule B2). En C2, on tape <b>=B2*1,05</b>.<br><br><b>Quel nombre</b> s'affiche en C2 ?`,
      reponse: `La formule multiplie B2 par 1,05, c'est-à-dire une hausse de 5 %.<br>40 × 1,05 = <span class="big">42</span> : le billet passe à 42 €.`,
      consigne: "B2 vaut 40 et C2 contient =B2*1,05 : quel nombre s'affiche en C2 ?",
      verification: { type: "courte", attendus: ["42"], unite: "€" },
      dessin: train,
    },
    {
      tag: "Énigme 3 · Le nageur",
      titre: "Écrire une formule",
      question: `Un nageur fait 20 longueurs la 1re semaine (B2), puis 15 de plus chaque semaine.<br><br><b>Quelle formule</b> taper en B3, pour la recopier ensuite vers le bas ?`,
      reponse: `Chaque cellule = celle du dessus + 15. En B3 : <span class="big">=B2+15</span>.<br>Recopiée, elle devient =B3+15 en B4, puis =B4+15 en B5 : 20, 35, 50, 65.`,
      consigne: "Chaque semaine, 15 longueurs de plus que la précédente : quelle formule en B3 ?",
      verification: { type: "qcm", choix: ["=B2+15", "=B3+15", "=20*15"], bonne: 0 },
      dessin: nageur,
    },
    {
      tag: "Énigme 4 · La boutique de jeux",
      titre: "Choisir un diagramme",
      question: `Une boutique de jeux de société a noté ses ventes des 12 mois dans un tableur. Elle veut voir comment elles évoluent dans l'année.<br><br><b>Quel diagramme</b> choisir ?`,
      reponse: `Pour suivre une évolution dans le temps, on relie les mois dans l'ordre.<br><span class="big">Une ligne brisée mois par mois</span> : on y verra le pic de décembre (les cadeaux de Noël !).`,
      consigne: "Pour voir l'évolution des ventes sur 12 mois, quel diagramme choisir ?",
      verification: { type: "qcm", choix: ["Un diagramme circulaire", "Une ligne brisée mois par mois", "Un tableau croisé"], bonne: 1 },
      dessin: jeux,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le concours de pâtisserie",
      sorte: "piege",
      question: `Dans un concours de pâtisserie, on note deux manches. En C2, on tape <b>=A2+B2</b>, puis on recopie vers le bas jusqu'à C5.<br><br><b>Quelle formule</b> contient C5 ?`,
      reponse: `En recopiant vers le bas, les numéros de ligne avancent avec la cellule : A2 devient A5, B2 devient B5.<br>C5 contient <span class="big">=A5+B5</span>, soit 16 + 13 = 29 points.`,
      consigne: "C2 contient =A2+B2, recopiée vers le bas : quelle formule contient C5 ?",
      verification: { type: "qcm", choix: ["=A2+B2", "=A5+B2", "=A5+B5"], bonne: 2 },
      dessin: patisserie,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La chaîne de cuisine",
      sorte: "defi",
      question: `Une chaîne de cuisine a 1 000 abonnés (B2). En B3, on tape <b>=B2*1,1</b>, recopiée vers le bas : + 10 % par mois.<br><br><b>Au bout de combien de mois</b> dépasse-t-elle 1 500 abonnés ?`,
      reponse: `La colonne affiche 1 000 ; 1 100 ; 1 210 ; 1 331 ; 1 464,1 ; 1 610,51…<br>1 464,1 est encore sous 1 500 : on dépasse au bout de <span class="big">5 mois</span>.`,
      consigne: "1 000 abonnés, + 10 % par mois : au bout de combien de mois dépasse-t-on 1 500 ?",
      verification: { type: "courte", attendus: ["5"], unite: "mois" },
      dessin: cuisine,
    },
  ],
};

export default problemes;
