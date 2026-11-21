// Énigmes à projeter — CM1, notion repérage (la place au cinéma, le potager en
// cases, le pion qui avance, le chat et la souris, le piège des flèches, le
// défi de la clé perdue). 21/11/2026.
// Quadrillage : colonnes A → F de gauche à droite, lignes 1 → 5 de bas en haut.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, grille } from "../dessins-ecole";

const X0 = 90, Y0 = 50, PAS = 54, NX = 6, NY = 5;
const LETTRES = "ABCDEF";
/** Le centre de la case (lettre, ligne). */
const cx = (col: string) => X0 + (LETTRES.indexOf(col) + 0.5) * PAS;
const cy = (lig: number) => Y0 + (NY - lig + 0.5) * PAS;
const plateau = () =>
  grille(X0, Y0, NX, NY, PAS, C.pale, 2) +
  [...LETTRES].map((c) => t(cx(c), Y0 + NY * PAS + 30, c, C.craie, 22)).join("") +
  [1, 2, 3, 4, 5].map((k) => t(X0 - 20, cy(k) + 8, k, C.craie, 22)).join("");
const dans = (col: string, lig: number, s: string, taille = 32) => t(cx(col), cy(lig) + taille * 0.35, s, C.craie, taille);

const cinema = svg(
  "Une salle de cinéma en quadrillage ; une étoile marque la place de Max",
  plateau() + dans("D", 3, "⭐") + t(X0 + 3 * PAS, Y0 - 16, "🎬 écran en haut", C.pale, 18) + t(240, 410, `la place de Max${NB}?`, C.rose, 22)
);

const potager = svg(
  "Un potager en cases : une tomate en B2, une carotte en E4, une fraise en C5, une salade en E2",
  plateau() + dans("B", 2, "🍅") + dans("E", 4, "🥕") + dans("C", 5, "🍓") + dans("E", 2, "🥬") + t(240, 410, `Que pousse-t-il en E4${NB}?`, C.rose, 22)
);

const pion = svg(
  "Un pion en A1 ; il va 3 cases à droite puis 2 cases en haut",
  plateau() + dans("A", 1, "♟️") + t(240, 410, `3 → puis 2 ↑${NB}: où arrive-t-il${NB}?`, C.rose, 20)
);

const chat = svg(
  "Un chat en B2 et une souris en F2",
  plateau() + dans("B", 2, "🐈") + dans("F", 2, "🐭") + t(240, 410, `Combien de cases entre eux${NB}?`, C.rose, 22)
);

const fleches = svg(
  "Un pion en A1 et le message : droite, droite, haut, gauche",
  plateau() + dans("A", 1, "♟️") + t(240, 410, "→  →  ↑  ←", C.rose, 30)
);

const cle = svg(
  "Un arbre en B4, un puits en E1 ; la clé est sur la ligne de l'arbre et la colonne du puits",
  plateau() + dans("B", 4, "🌳") + dans("E", 1, "⛲") +
    l(cx("B") + 22, cy(4), X0 + NX * PAS, cy(4), C.bleu, 2, "6 6") + l(cx("E"), cy(1) - 22, cx("E"), Y0, C.rose, 2, "6 6") + t(240, 410, `Où est la clé${NB}? 🔑`, C.rose, 22)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "reperage",
  titre: "Énigmes de repérage",
  description: "La place de Max au cinéma, le potager en cases, le pion qui avance, le chat et la souris, le piège des flèches, le défi de la clé perdue.",
  problemes: [
    {
      tag: "Énigme 1 · Au cinéma",
      titre: "La place de Max",
      question: `La salle est un quadrillage.<br>On donne d'abord la <b>lettre</b>, puis le <b>chiffre</b>.<br><br>Où est assis Max, sur l'<b>étoile</b> ?`,
      reponse: `On descend de l'étoile : colonne D.<br>On va à gauche : ligne 3.<br>Max est en <span class="big">D3</span>.`,
      consigne: "Quelle est la case de l'étoile ? (écris par exemple A2)",
      verification: { type: "courte", attendus: ["D3"] },
      dessin: cinema,
    },
    {
      tag: "Énigme 2 · Le potager",
      titre: "La case E4",
      question: `Le potager est découpé en cases.<br><br><b>Que pousse-t-il</b> dans la case <b>E4</b> ?`,
      reponse: `Colonne E, puis on monte jusqu'à la ligne 4.<br>En E4 : <span class="big">la carotte</span>.`,
      consigne: "Que pousse-t-il dans la case E4 ?",
      verification: { type: "qcm", choix: ["la carotte", "la salade", "la fraise"], bonne: 0 },
      dessin: potager,
    },
    {
      tag: "Énigme 3 · Le jeu de société",
      titre: "Le pion qui avance",
      question: `Le pion est en <b>A1</b>.<br>Il avance de <b>3 cases vers la droite</b>.<br>Puis de <b>2 cases vers le haut</b>.<br><br>Sur quelle case arrive-t-il ?`,
      reponse: `A1 → B1, C1, D1.<br>D1 → D2, D3.<br>Il arrive en <span class="big">D3</span>.`,
      consigne: "Sur quelle case arrive le pion ? (écris par exemple A2)",
      verification: { type: "courte", attendus: ["D3"] },
      dessin: pion,
    },
    {
      tag: "Énigme 4 · Le chat et la souris",
      titre: "Les cases entre eux",
      question: `Le chat est en <b>B2</b>.<br>La souris est en <b>F2</b>.<br><br>De combien de cases le chat doit-il <b>avancer</b> pour l'attraper ?`,
      reponse: `B → C → D → E → F.<br>Il avance de <span class="big">4 cases</span>.`,
      consigne: "De combien de cases le chat doit-il avancer ?",
      verification: { type: "courte", attendus: ["4"], unite: "cases" },
      dessin: chat,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le message fléché",
      sorte: "piege",
      question: `Le pion est en <b>A1</b>.<br>Il suit les flèches : <b>→ → ↑ ←</b><br>Chaque flèche = une case.<br><br>Sur quelle case arrive-t-il ?`,
      reponse: `A1 → B1 → C1, puis ↑ : C2.<br>Le piège : la dernière flèche revient à gauche !<br>C2 ← : <span class="big">B2</span>.`,
      consigne: "Sur quelle case arrive le pion ?",
      verification: { type: "qcm", choix: ["D2", "B2", "C2"], bonne: 1 },
      dessin: fleches,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La clé perdue",
      sorte: "defi",
      question: `La clé est sur la même <b>ligne</b> que l'arbre.<br>Elle est sur la même <b>colonne</b> que le puits.<br><br>Dans <b>quelle case</b> est la clé ?`,
      reponse: `L'arbre est en B4 : ligne 4.<br>Le puits est en E1 : colonne E.<br>La clé est en <span class="big">E4</span>.`,
      consigne: "Dans quelle case est la clé ? (écris par exemple A2)",
      verification: { type: "courte", attendus: ["E4"] },
      dessin: cle,
    },
  ],
};

export default problemes;
