// Énigmes à projeter — CE1, notion monnaie (la tirelire, la balle et la
// corde, le livre à 12 €, la monnaie du jeu de 15 €, le piège des 3 pièces et
// du billet, le défi de payer 8 € avec peu de pièces). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o } from "../dessins-ecole";

const billet = (x: number, y: number, v: string, c: string = C.bleu) => r(x - 55, y - 30, 110, 60, c, 0.25, 3, 6) + t(x, y + 10, `${v}${NB}€`, C.craie, 26);
const piece = (x: number, y: number, v: string) => o(x, y, 26, C.jaune, 0.35, 3) + t(x, y + 8, `${v}${NB}€`, C.craie, 18);

const tirelire = svg(
  "Dans la tirelire : un billet de 20 €, un billet de 5 €, une pièce de 2 €, une pièce de 1 €",
  billet(100, 140, "20", C.rose) + billet(240, 140, "5", C.bleu) + piece(350, 140, "2") + piece(420, 140, "1") +
    t(240, 260, "🐷", C.craie, 70) + t(240, 370, `Combien d'euros${NB}?`, C.rose, 30)
);

const etiquette = (x: number, objet: string, prix: string) => t(x, 180, objet, C.craie, 70) + r(x - 45, 220, 90, 44, C.jaune, 0.25, 3, 8) + t(x, 251, prix, C.craie, 24);
const jouets = svg(
  "Une balle à 3 € et une corde à sauter à 4 €",
  etiquette(140, "⚽", `3${NB}€`) + etiquette(340, "🪢", `4${NB}€`) + t(240, 360, `Les deux${NB}?`, C.rose, 30)
);

const livre = svg(
  "Malo a un billet de 10 € ; le livre coûte 12 €",
  billet(130, 160, "10") + t(130, 240, "Malo", C.pale, 24) +
    t(340, 170, "📕", C.craie, 90) + r(295, 210, 90, 44, C.jaune, 0.25, 3, 8) + t(340, 241, `12${NB}€`, C.craie, 24) +
    t(240, 350, `Assez d'argent${NB}?`, C.rose, 30)
);

const monnaie = svg(
  "Un jeu à 15 € ; Clara paie avec un billet de 20 €",
  t(130, 180, "🧩", C.craie, 80) + r(85, 210, 90, 44, C.jaune, 0.25, 3, 8) + t(130, 241, `15${NB}€`, C.craie, 24) +
    billet(340, 160, "20", C.rose) + t(340, 240, "Clara paie", C.pale, 24) +
    t(240, 350, `La monnaie${NB}?`, C.rose, 30)
);

const piege = svg(
  "Max a 3 pièces de 1 € ; Sara a 1 billet de 5 €",
  t(130, 90, "Max", C.craie, 26) + piece(80, 170, "1") + piece(130, 170, "1") + piece(180, 170, "1") +
    t(350, 90, "Sara", C.craie, 26) + billet(350, 170, "5") +
    t(240, 330, `Qui a le plus d'argent${NB}?`, C.rose, 30)
);

const huit = svg(
  "Des billets de 5 €, des pièces de 2 € et de 1 € ; il faut payer 8 €",
  billet(110, 130, "5") + piece(250, 130, "2") + piece(340, 130, "1") +
    t(240, 230, `Payer 8${NB}€`, C.craie, 34) + t(240, 330, `Le moins possible de pièces et billets${NB}?`, C.rose, 22)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "monnaie",
  titre: "Énigmes sur la monnaie",
  description: "Compter la tirelire, la balle et la corde à sauter, le livre à 12 € avec un billet de 10 €, la monnaie du puzzle, le piège des trois pièces contre un billet, le défi de payer 8 € avec peu de pièces.",
  problemes: [
    {
      tag: "Énigme 1 · La tirelire",
      titre: "La tirelire de Yanis",
      question: `Dans la tirelire :<br>un billet de <b>20 €</b>, un billet de <b>5 €</b>,<br>une pièce de <b>2 €</b>, une pièce de <b>1 €</b>.<br><br>Combien d'euros ?`,
      reponse: `20 + 5 = 25.<br>25 + 2 + 1 = <span class="big">28 €</span>.`,
      consigne: "Combien d'euros dans la tirelire ?",
      verification: { type: "courte", attendus: ["28"], unite: "€" },
      dessin: tirelire,
    },
    {
      tag: "Énigme 2 · Le magasin de sport",
      titre: "La balle et la corde",
      question: `La balle coûte <b>3 €</b>.<br>La corde à sauter coûte <b>4 €</b>.<br><br>Combien pour les deux ?`,
      reponse: `3 + 4 = <span class="big">7 €</span>.`,
      consigne: "Combien coûtent la balle et la corde ?",
      verification: { type: "courte", attendus: ["7"], unite: "€" },
      dessin: jouets,
    },
    {
      tag: "Énigme 3 · La librairie",
      titre: "Le livre",
      question: `Malo a <b>10 €</b>.<br>Le livre coûte <b>12 €</b>.<br><br>Peut-il l'acheter ?`,
      reponse: `10 est plus petit que 12.<br>De 10 à 12 : 2.<br><span class="big">Non, il manque 2 €</span>.`,
      consigne: "Malo peut-il acheter le livre ?",
      verification: { type: "qcm", choix: ["Non, il manque 2 €", "Oui", "Non, il manque 12 €"], bonne: 0 },
      dessin: livre,
    },
    {
      tag: "Énigme 4 · Le magasin de jouets",
      titre: "La monnaie",
      question: `Le puzzle coûte <b>15 €</b>.<br>Clara paie avec <b>20 €</b>.<br><br>Combien lui rend-on ?`,
      reponse: `De 15 à 20 : on compte 16, 17, 18, 19, 20.<br>On lui rend <span class="big">5 €</span>.`,
      consigne: "Combien d'euros rend-on à Clara ?",
      verification: { type: "courte", attendus: ["5"], unite: "€" },
      dessin: monnaie,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Pièces ou billet",
      sorte: "piege",
      question: `Max a <b>3 pièces de 1 €</b>.<br>Sara a <b>1 billet de 5 €</b>.<br><br>Qui a le plus d'argent ?`,
      reponse: `Le piège : Max a plus d'objets.<br>Mais Max a 1 + 1 + 1 = 3 €. Sara a 5 €.<br>Le plus d'argent : <span class="big">Sara</span>.`,
      consigne: "Qui a le plus d'argent ?",
      verification: { type: "qcm", choix: ["Max", "Sara", "Ils ont pareil"], bonne: 1 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Payer 8 €",
      sorte: "defi",
      question: `On a des billets de <b>5 €</b>,<br>des pièces de <b>2 €</b> et de <b>1 €</b>.<br>On paie <b>8 €</b> avec le moins possible de pièces et billets.<br><br>Combien en faut-il ?`,
      reponse: `D'abord le plus gros : 5 €. Il reste 3 €.<br>Puis 2 €. Il reste 1 €. Puis 1 €.<br>5 + 2 + 1 = 8 : <span class="big">3</span> (un billet, deux pièces).`,
      consigne: "Combien de pièces et billets au minimum pour 8 € ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: huit,
    },
  ],
};

export default problemes;
