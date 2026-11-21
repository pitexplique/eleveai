// Énigmes à projeter — CP, notion monnaie : les trois pièces du
// porte-monnaie, la pièce ou le billet qui vaut le plus, la glace à 3 €, le
// jouet à 4 € avec 6 €, le piège des cinq pièces contre un billet de 5 €, le
// défi des trois pièces qui font 5 €. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o } from "../dessins-ecole";

const piece = (x: number, y: number, v: number) => o(x, y, v === 2 ? 34 : 30, C.jaune, 0.35, 3) + t(x, y + 9, `${v}${NB}€`, C.craie, 22);
const billet = (x: number, y: number, v: number, c: string = C.bleu) => r(x - 70, y - 38, 140, 76, c, 0.25, 3, 8) + t(x, y + 11, `${v}${NB}€`, C.craie, 32);
const prix = (x: number, y: number, v: number) => r(x - 40, y - 24, 80, 44, C.rose, 0.15, 3, 8) + t(x, y + 8, `${v}${NB}€`, C.craie, 24);

const portemonnaie = svg(
  "Trois pièces : 2 €, 2 € et 1 €",
  piece(130, 170, 2) + piece(240, 170, 2) + piece(350, 170, 1) +
    t(240, 330, `Combien d'euros${NB}?`, C.rose, 30)
);

const valeur = svg(
  "Une pièce de 2 €, un billet de 10 €, une pièce de 1 €",
  piece(80, 170, 2) + billet(240, 170, 10, C.rose) + piece(400, 170, 1) +
    t(240, 330, `Qui vaut le plus${NB}?`, C.rose, 30)
);

const glace = svg(
  "Une glace à 3 € ; Nora a une pièce de 2 €, une pièce de 2 € et une pièce de 1 €",
  t(110, 170, "🍦", C.craie, 80) + prix(110, 240, 3) +
    t(340, 100, "Nora a :", C.craie, 24) + piece(270, 170, 2) + piece(345, 170, 2) + piece(415, 170, 1) +
    t(240, 350, `Assez d'argent${NB}?`, C.rose, 30)
);

const jouet = svg(
  "Tom a 6 € : un billet de 5 € et une pièce de 1 € ; la petite voiture coûte 4 €",
  t(100, 80, "Tom a 6 €", C.craie, 24) + billet(100, 150, 5) + piece(100, 240, 1) +
    t(340, 170, "🚗", C.craie, 80) + prix(340, 240, 4) +
    t(240, 350, `Combien lui reste-t-il${NB}?`, C.rose, 28)
);

const piege = svg(
  "À gauche, 5 pièces de 1 € ; à droite, un billet de 5 €",
  [0, 1, 2, 3, 4].map((i) => piece(50 + (i % 3) * 66, 130 + Math.floor(i / 3) * 76, 1)).join("") +
    billet(360, 165, 5) + t(240, 330, `Qui a le plus d'argent${NB}?`, C.rose, 28)
);

const defi = svg(
  "Trois pièces cachées dans une main ; elles font 5 € en tout",
  o(160, 170, 34, C.pale, 0.2, 3) + t(160, 182, "?", C.rose, 34) + o(240, 170, 34, C.pale, 0.2, 3) + t(240, 182, "?", C.rose, 34) +
    o(320, 170, 34, C.pale, 0.2, 3) + t(320, 182, "?", C.rose, 34) +
    t(240, 270, "3 pièces = 5 €", C.craie, 32) + t(240, 350, `Quelles pièces${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "cp",
  notionId: "monnaie",
  titre: "Énigmes sur la monnaie",
  description: "Compter trois pièces, trouver ce qui vaut le plus, la glace à 3 €, le jouet à 4 € avec 6 €, le piège des cinq pièces contre un billet de 5 €, le défi des trois pièces qui font 5 €.",
  problemes: [
    {
      tag: "Énigme 1 · Le porte-monnaie",
      titre: "Les trois pièces",
      question: `Combien d'euros en tout ?`,
      reponse: `2 + 2 = 4.<br>4 + 1 = <span class="big">5 €</span>.`,
      consigne: "Une pièce de 2 €, une de 2 €, une de 1 € : combien d'euros ?",
      verification: { type: "courte", attendus: ["5"], unite: "€" },
      dessin: portemonnaie,
    },
    {
      tag: "Énigme 2 · Le plus précieux",
      titre: "Pièce ou billet ?",
      question: `Qu'est-ce qui vaut le plus ?`,
      reponse: `10, c'est plus que 2 et 1.<br><span class="big">Le billet de 10 €</span>.`,
      consigne: "Qu'est-ce qui vaut le plus ?",
      verification: { type: "qcm", choix: ["La pièce de 2 €", "Le billet de 10 €", "La pièce de 1 €"], bonne: 1 },
      dessin: valeur,
    },
    {
      tag: "Énigme 3 · Le glacier",
      titre: "La glace de Nora",
      question: `La glace coûte <b>3 €</b>.<br><br>Nora a-t-elle assez ?`,
      reponse: `Nora a 2 + 2 + 1 = 5 €.<br>5, c'est plus que 3.<br><span class="big">Oui</span>.`,
      consigne: "La glace coûte 3 €. Nora a 5 €. A-t-elle assez ?",
      verification: { type: "qcm", choix: ["Oui", "Non", "On ne sait pas"], bonne: 0 },
      dessin: glace,
    },
    {
      tag: "Énigme 4 · Le magasin de jouets",
      titre: "La petite voiture",
      question: `Tom a <b>6 €</b>.<br>La voiture coûte <b>4 €</b>.<br><br>Combien lui reste-t-il ?`,
      reponse: `6 − 4 = <span class="big">2 €</span>.`,
      consigne: "Tom a 6 €, la voiture coûte 4 €. Combien lui reste-t-il ?",
      verification: { type: "courte", attendus: ["2"], unite: "€" },
      dessin: jouet,
    },
    {
      tag: "Énigme 5 · Le piège",
      titre: "Beaucoup de pièces",
      question: `5 pièces de 1 €,<br>ou 1 billet de 5 € ?<br><br>Qui a le plus d'argent ?`,
      reponse: `1 + 1 + 1 + 1 + 1 = 5.<br>5 € et 5 € :<br><span class="big">pareil</span>.`,
      consigne: "5 pièces de 1 € ou un billet de 5 € : qui a le plus d'argent ?",
      verification: { type: "qcm", choix: ["Les pièces", "Le billet", "Pareil"], bonne: 2 },
      dessin: piege,
      sorte: "piege",
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Trois pièces",
      question: `<b>3</b> pièces font <b>5 €</b>.<br><br>Quelles pièces ?`,
      reponse: `2 + 2 + 1 = 5.<br><span class="big">2 €, 2 € et 1 €</span>.`,
      consigne: "3 pièces font 5 €. Quelles pièces ?",
      verification: { type: "qcm", choix: ["2 €, 2 € et 1 €", "1 €, 1 € et 1 €", "2 €, 2 € et 2 €"], bonne: 0 },
      dessin: defi,
      sorte: "defi",
    },
  ],
};

export default problemes;
