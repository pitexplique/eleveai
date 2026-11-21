// Énigmes à projeter — STMG (1re), notion tableur : recopier et exploiter (le
// loueur de tuk-tuks, le loueur de bateaux, la location de robes de mariée,
// la salle de réceptions, piège de l'entreprise de dératisation, défi de la
// banque alimentaire). 21/11/2026. La feuille de calcul est dessinée.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";

const H = 46;
/** Extrait de feuille de calcul : en-têtes A, B, C… et numéros de ligne ; la case `rose` est surlignée. */
const feuille = (larg: number[], lignes: string[][], { y = 30, rose = "", taille = 20 } = {}) => {
  const xs: number[] = [];
  let x = 74;
  for (const w of larg) { xs.push(x); x += w; }
  let s = r(30, y, 44, H, C.pale, 0.3, 2);
  larg.forEach((w, k) => { s += r(xs[k], y, w, H, C.pale, 0.3, 2) + t(xs[k] + w / 2, y + 31, "ABCDE"[k], C.pale, 20); });
  lignes.forEach((L, i) => {
    const yy = y + H * (i + 1);
    s += r(30, yy, 44, H, C.pale, 0.3, 2) + t(52, yy + 31, String(i + 1), C.pale, 20);
    L.forEach((v, k) => {
      const rosee = "ABCDE"[k] + (i + 1) === rose;
      s += r(xs[k], yy, larg[k], H, rosee ? C.rose : C.bleu, rosee ? 0.25 : 0.1, 2) + t(xs[k] + larg[k] / 2, yy + 31, v, C.craie, taille);
    });
  });
  return s;
};

const tuktuk = svg("Tuk-tuks : A, heures ; B2 contient =A2*12, recopiée vers le bas ; quelle formule en B4 ?",
  feuille([130, 160], [["heures", "prix (€)"], ["1", "=A2*12"], ["2", ""], ["3", "?"]], { y: 40, rose: "B4", taille: 21 }) +
    t(240, 318, "B2 est recopiée vers le bas", C.pale, 22) +
    t(240, 380, `quelle formule en B4${NB}?`, C.rose, 28));

const bateaux = svg("Bateaux : B1 = 25 euros de l'heure ; B3 contient =A3*$B$1, recopiée vers le bas ; quelle formule en B6 ?",
  feuille([130, 170], [["tarif", "25"], ["heures", "prix (€)"], ["2", "=A3*$B$1"], ["3", ""], ["5", ""], ["8", "?"]], { y: 20, rose: "B6", taille: 21 }) +
    t(240, 395, `quelle formule en B6${NB}?`, C.rose, 28));

const robes = svg("Robes de mariée : recette cumulée janvier 1 800, février 3 900, mars 5 700, avril 8 200, mai 10 100 ; quand dépasse-t-on 8 000 euros ?",
  feuille([140, 200], [["mois", "recette cumulée"], ["janvier", `1${NB}800`], ["février", `3${NB}900`], ["mars", `5${NB}700`], ["avril", `8${NB}200`], ["mai", `10${NB}100`]], { y: 20 }) +
    t(240, 395, `quand dépasse-t-on 8${NB}000${NB}€${NB}?`, C.rose, 26));

// ① une courbe sur 12 mois ; ② un diagramme en secteurs à 12 parts.
const vals = [8, 10, 9, 12, 15, 21, 26, 24, 17, 12, 9, 11];
const courbe = l(40, 280, 220, 280, C.pale, 2) + l(40, 280, 40, 120, C.pale, 2) +
  p("M" + vals.map((v, k) => `${50 + k * 15} ${275 - v * 5.5}`).join(" L"), C.bleu, 4);
const secteurs = o(350, 200, 80, C.jaune, 0.15, 3) +
  vals.map((_, k) => { const a = (k * 30 - 90) * Math.PI / 180; return l(350, 200, 350 + 80 * Math.cos(a), 200 + 80 * Math.sin(a), C.jaune, 2); }).join("");
const salle = svg("Salle de réceptions : graphique 1, une courbe des réservations sur 12 mois ; graphique 2, un diagramme en secteurs à 12 parts",
  t(240, 50, "réservations sur 12 mois", C.pale, 23) + courbe + secteurs +
    t(130, 320, "①", C.bleu, 30) + t(350, 320, "②", C.jaune, 30) +
    t(240, 390, `lequel montre l'évolution${NB}?`, C.rose, 26));

const derat = svg("Dératisation : A2 = 150, A3 = 200 ; E1 = 0,2 ; B2 contient =A2*E1, recopiée en B3 ; Tom dit que B3 affiche 40",
  feuille([100, 110, 40, 70, 76], [["prix HT", "TVA", "", "taux", "0,2"], ["150", "=A2*E1", "", "", ""], ["200", "?", "", "", ""]], { y: 40, rose: "B3", taille: 19 }) +
    t(240, 270, "B2 est recopiée en B3", C.pale, 22) +
    t(240, 315, "Tom : « B3 affiche 40 »", C.pale, 22) +
    t(240, 375, `qu'affiche B3${NB}?`, C.rose, 28));

const banque = svg("Banque alimentaire : colis par centre 200, 280, 120, 200 ; total B6 = 800 ; C2 contient =B2/$B$6, recopiée vers le bas ; que vaut C4 ?",
  feuille([110, 100, 166], [["centre", "colis", "part"], ["Nord", "200", "=B2/$B$6"], ["Est", "280", ""], ["Sud", "120", "?"], ["Ouest", "200", ""], ["total", "800", ""]], { y: 20, rose: "C4" }) +
    t(240, 395, `que vaut C4${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "tableur_recopie",
  titre: "Énigmes du tableur : recopier et exploiter",
  description: "Le loueur de tuk-tuks, le loueur de bateaux, la location de robes de mariée, la salle de réceptions, le piège de l'entreprise de dératisation, le défi de la banque alimentaire : recopier une formule (adresse relative ou absolue avec $), lire un seuil dans une colonne, choisir le bon graphique.",
  problemes: [
    {
      tag: "Énigme 1 · Le loueur de tuk-tuks",
      titre: "Recopier vers le bas",
      question: `Un loueur de tuk-tuks fait payer 12 € de l'heure.<br>La formule de B2 est recopiée vers le bas.<br><br><b>Quelle formule</b> trouve-t-on en B4 ?`,
      reponse: `Vers le bas, le numéro de ligne avance avec la case.<br>De B2 à B4, A2 devient A4 : <span class="big">=A4*12</span>.`,
      consigne: "Quelle formule est en B4 ?",
      verification: { type: "qcm", choix: ["=A4*12", "=A2*12", "=B4*12"], bonne: 0 },
      dessin: tuktuk,
    },
    {
      tag: "Énigme 2 · Le loueur de bateaux",
      titre: "Le $ bloque une case",
      question: `Un loueur de bateaux écrit son tarif horaire en B1.<br>En B3, il écrit =A3*$B$1, puis il recopie vers le bas.<br><br><b>Quelle formule</b> trouve-t-on en B6 ?`,
      reponse: `A3 avance : il devient A6.<br>$B$1 est bloqué : il ne bouge pas.<br>En B6 : <span class="big">=A6*$B$1</span>, soit 8 × 25 = 200 €.`,
      consigne: "Quelle formule est en B6 ?",
      verification: { type: "courte", attendus: ["=A6*$B$1", "A6*$B$1", "=$B$1*A6"] },
      dessin: bateaux,
    },
    {
      tag: "Énigme 3 · La location de robes de mariée",
      titre: "Lire un seuil",
      question: `Une boutique loue des robes de mariée.<br>La colonne B cumule la recette depuis janvier.<br><br><b>Quel mois</b> la recette dépasse-t-elle 8${NB}000 € ?`,
      reponse: `Fin mars : 5${NB}700 €, moins de 8${NB}000 €.<br>Fin avril : 8${NB}200 €, plus de 8${NB}000 €.<br>Le seuil est dépassé en <span class="big">avril</span>.`,
      consigne: "Quel mois la recette dépasse-t-elle 8 000 € ?",
      verification: { type: "qcm", choix: ["Mars", "Avril", "Mai"], bonne: 1 },
      dessin: robes,
    },
    {
      tag: "Énigme 4 · La salle de réceptions",
      titre: "Choisir le graphique",
      question: `Une salle de réceptions compte ses réservations chaque mois.<br>La gérante veut voir si elles montent ou baissent.<br><br><b>Quel graphique</b> choisir : ① ou ② ?`,
      reponse: `Une courbe montre l'évolution d'un mois à l'autre.<br>Les secteurs montrent des parts d'un total, pas une évolution.<br>Il faut le graphique <span class="big">①</span>.`,
      consigne: "Quel graphique montre l'évolution : 1 ou 2 ?",
      verification: { type: "courte", attendus: ["1", "①", "la courbe", "courbe", "le 1"] },
      dessin: salle,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'entreprise de dératisation",
      sorte: "piege",
      question: `Une entreprise de dératisation calcule la TVA de ses devis.<br>Le taux est en E1.<br>B2 contient =A2*E1, puis on recopie en B3.<br>Tom dit que B3 affiche 40.<br><br><b>Qu'affiche B3</b> ?`,
      reponse: `En recopiant, E1 devient E2 : B3 contient =A3*E2.<br>E2 est vide : le tableur compte 0.<br>B3 affiche <span class="big">0</span>.<br>Il fallait écrire =A2*$E$1.`,
      consigne: "Quel nombre s'affiche en B3 ?",
      verification: { type: "courte", attendus: ["0"] },
      dessin: derat,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La banque alimentaire",
      sorte: "defi",
      question: `Une banque alimentaire répartit ses colis entre 4 centres.<br>La colonne C donne la part de chaque centre.<br>La formule de C2 est recopiée vers le bas.<br><br><b>Que vaut C4</b> ?`,
      reponse: `C4 contient =B4/$B$6 : le total reste bloqué.<br>120 ÷ 800 = <span class="big">0,15</span>.<br>Le centre Sud reçoit 15 % des colis.`,
      consigne: "Que vaut C4 ?",
      verification: { type: "qcm", choix: ["0,25", "0", "0,15"], bonne: 2 },
      dessin: banque,
    },
  ],
};

export default problemes;
