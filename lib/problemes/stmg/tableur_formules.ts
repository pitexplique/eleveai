// Énigmes à projeter — STMG (1re), notion tableur : écrire une formule (le
// magasin de papier peint, l'agence de communication, la standardiste, le
// boulodrome, piège du vélodrome, défi du café Bourbon pointu de La Réunion).
// 21/11/2026. La feuille de calcul est dessinée.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

const H = 50;
/** Extrait de feuille de calcul : en-têtes A, B, C… et numéros de ligne ; la case `rose` est surlignée. */
const feuille = (larg: number[], lignes: string[][], { y = 30, rose = "", taille = 21 } = {}) => {
  const xs: number[] = [];
  let x = 74;
  for (const w of larg) { xs.push(x); x += w; }
  let s = r(30, y, 44, H, C.pale, 0.3, 2);
  larg.forEach((w, k) => { s += r(xs[k], y, w, H, C.pale, 0.3, 2) + t(xs[k] + w / 2, y + 33, "ABCDE"[k], C.pale, 21); });
  lignes.forEach((L, i) => {
    const yy = y + H * (i + 1);
    s += r(30, yy, 44, H, C.pale, 0.3, 2) + t(52, yy + 33, String(i + 1), C.pale, 21);
    L.forEach((v, k) => {
      const rosee = "ABCDE"[k] + (i + 1) === rose;
      s += r(xs[k], yy, larg[k], H, rosee ? C.rose : C.bleu, rosee ? 0.25 : 0.1, 2) + t(xs[k] + larg[k] / 2, yy + 33, v, C.craie, taille);
    });
  });
  return s;
};

const papier = svg("Papier peint : A, modèle ; B, prix du rouleau ; C, rouleaux. Lin 18 et 6, fleurs 24 et 4, rayures 21 et 8. Que contient B4 ?",
  feuille([150, 120, 120], [["modèle", "prix (€)", "rouleaux"], ["lin", "18", "6"], ["fleurs", "24", "4"], ["rayures", "21", "8"]], { y: 40 }) +
    t(240, 350, `que contient B4${NB}?`, C.rose, 30));

const com = svg("Agence de communication : B2 = 2 000 ; C2 contient =B2*1,05",
  feuille([150, 120, 136], [["poste", "2026", "2027"], ["affiches", `2${NB}000`, "=B2*1,05"]], { y: 60, rose: "C2" }) +
    t(240, 290, "budget en euros", C.pale, 22) +
    t(240, 360, `que fait cette formule${NB}?`, C.rose, 28));

const standard = svg("Standardiste : B2 à B6, appels du lundi au vendredi : 64, 52, 47, 58, 71 ; quelle formule en B7 pour le total ?",
  feuille([150, 120], [["jour", "appels"], ["lundi", "64"], ["mardi", "52"], ["mercredi", "47"], ["jeudi", "58"], ["vendredi", "71"], ["total", "?"]], { y: 10, rose: "B7", taille: 20 }) +
    t(400, 190, "formule", C.rose, 24) + t(400, 222, `en B7${NB}?`, C.rose, 24));

const boulo = svg("Boulodrome : A2 = 12 équipes ; B2 = 8 euros par équipe ; C2 contient =A2*B2+20",
  feuille([120, 120, 166], [["équipes", "€ / équipe", "recette"], ["12", "8", "=A2*B2+20"]], { y: 60, rose: "C2" }) +
    t(240, 290, "20 € : location du terrain", C.pale, 22) +
    t(240, 360, `que voit-on en C2${NB}?`, C.rose, 28));

const velo = svg("Vélodrome : B2 = 300 spectateurs samedi ; B3 = 500 dimanche ; B4 contient =B2+B3/2 ; Tom veut la moyenne",
  feuille([150, 160], [["jour", "spectateurs"], ["samedi", "300"], ["dimanche", "500"], ["moyenne", "=B2+B3/2"]], { y: 30, rose: "B4" }) +
    t(240, 318, "formule écrite par Tom", C.pale, 22) +
    t(240, 380, `qu'affiche B4${NB}?`, C.rose, 28));

const cafe = svg("Café Bourbon pointu : B2 = 300 kg ; C2 contient =B2*1,1, recopiée vers la droite jusqu'en E2 ; que vaut D2 ?",
  feuille([80, 100, 110, 110], [["", "2024", "2025", "2026"], ["kg", "300", "=B2*1,1", "?"]], { y: 60, rose: "D2", taille: 20 }) +
    t(240, 290, "C2 est recopiée vers la droite", C.pale, 22) +
    t(240, 360, `que vaut D2${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "tableur_formules",
  titre: "Énigmes du tableur : écrire une formule",
  description: "Le magasin de papier peint, l'agence de communication, la standardiste, le boulodrome, le piège du vélodrome, le défi du café Bourbon pointu : lire une case, comprendre une formule, écrire la bonne formule et calculer ce qu'elle affiche.",
  problemes: [
    {
      tag: "Énigme 1 · Le magasin de papier peint",
      titre: "Lire une case",
      question: `Un magasin de papier peint note ses modèles dans un tableur.<br>La colonne B donne le prix d'un rouleau.<br><br><b>Que contient la case B4</b> ?`,
      reponse: `B4 : colonne B, ligne 4.<br>C'est le prix du modèle à rayures : <span class="big">21</span> €.`,
      consigne: "Que contient la case B4 ?",
      verification: { type: "courte", attendus: ["21", "21 €"] },
      dessin: papier,
    },
    {
      tag: "Énigme 2 · L'agence de communication",
      titre: "Comprendre une formule",
      question: `Une agence de communication prévoit son budget d'affiches.<br>En C2, elle écrit =B2*1,05.<br><br><b>Que fait cette formule</b> ?`,
      reponse: `Multiplier par 1,05, c'est augmenter de 5 %.<br>La formule <span class="big">augmente B2 de 5 %</span> : 2${NB}100 €.`,
      consigne: "Que fait la formule =B2*1,05 ?",
      verification: { type: "qcm", choix: ["Elle augmente B2 de 5 %", "Elle ajoute 1,05 € à B2", "Elle augmente B2 de 105 %"], bonne: 0 },
      dessin: com,
    },
    {
      tag: "Énigme 3 · La standardiste",
      titre: "Écrire la formule",
      question: `Une standardiste note les appels de la semaine.<br>Elle veut le total en B7.<br><br><b>Quelle formule</b> écrit-elle ?`,
      reponse: `B2:B6 veut dire « de B2 à B6 ».<br>La bonne formule est <span class="big">=SOMME(B2:B6)</span>.<br>Le total vaut 292 appels.`,
      consigne: "Quelle formule écrire en B7 ?",
      verification: { type: "qcm", choix: ["=B2+B6", "=SOMME(B2:B6)", "=SOMME(B2;B6)"], bonne: 1 },
      dessin: standard,
    },
    {
      tag: "Énigme 4 · Le boulodrome",
      titre: "Calculer une formule",
      question: `Un boulodrome organise un tournoi.<br>12 équipes paient 8 € chacune.<br>Le club ajoute 20 € de location du terrain.<br><br><b>Que voit-on en C2</b> ?`,
      reponse: `=A2*B2+20 donne 12 × 8 + 20.<br>12 × 8 = 96, puis 96 + 20 = <span class="big">116</span>.`,
      consigne: "Quel nombre s'affiche en C2 ?",
      verification: { type: "courte", attendus: ["116", "116 €"] },
      dessin: boulo,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le vélodrome",
      sorte: "piege",
      question: `Un vélodrome compte ses spectateurs du week-end.<br>Tom veut la moyenne des deux jours.<br>Il écrit =B2+B3/2.<br><br><b>Qu'affiche la case B4</b> ?`,
      reponse: `Le tableur divise avant d'ajouter : 500 ÷ 2 = 250.<br>Puis 300 + 250 = <span class="big">550</span>.<br>Pour la moyenne, il faut =(B2+B3)/2, qui donne 400.`,
      consigne: "Quel nombre s'affiche en B4 ?",
      verification: { type: "courte", attendus: ["550"] },
      dessin: velo,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le café Bourbon pointu",
      sorte: "defi",
      question: `Une coopérative de La Réunion récolte le café Bourbon pointu.<br>Elle prévoit 10 % de plus chaque année.<br>La formule de C2 est recopiée vers la droite.<br><br><b>Que vaut D2</b> ?`,
      reponse: `En recopiant vers la droite, D2 contient =C2*1,1.<br>C2 = 330, donc D2 = 330 × 1,1 = <span class="big">363</span>.`,
      consigne: "Que vaut D2 ?",
      verification: { type: "qcm", choix: ["330", "360", "363"], bonne: 2 },
      dessin: cafe,
    },
  ],
};

export default problemes;
