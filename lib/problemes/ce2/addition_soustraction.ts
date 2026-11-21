// Énigmes à projeter — CE2, notion additions et soustractions posées (les
// visiteurs du musée, le livre de Zoé, l'opération bien posée, le vélo de
// Maman, le piège de la soustraction de Tom, le défi des chiffres cachés).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

/** Une opération posée : lignes de chiffres alignées à droite sur x (pas de 30 px). */
const posee = (x: number, y: number, haut: string, bas: string, signe: string, c: string = C.craie, decalBas = 0) => {
  const chiffres = (s: string, yy: number, dec: number) =>
    s.split("").reverse().map((ch, i) => t(x - i * 30 - dec, yy, ch, ch === "★" || ch === "▲" ? C.rose : c, 34)).join("");
  return chiffres(haut, y, 0) + t(x - 110, y + 50, signe, c, 34) + chiffres(bas, y + 50, decalBas) + l(x - 120, y + 68, x + 16, y + 68, c, 3);
};

const musee = svg(
  "Le musée : 2 345 visiteurs samedi, 1 432 visiteurs dimanche",
  r(60, 70, 160, 120, C.bleu, 0.15, 4, 8) + t(140, 115, "samedi", C.craie, 24) + t(140, 160, "2 345", C.bleu, 34) +
    r(260, 70, 160, 120, C.rose, 0.15, 4, 8) + t(340, 115, "dimanche", C.craie, 24) + t(340, 160, "1 432", C.rose, 34) +
    t(240, 250, "🏛️", C.craie, 60) + t(240, 360, `en tout${NB}?`, C.rose, 32)
);

const livre = svg(
  "Un livre de 312 pages ; Zoé a lu 145 pages",
  r(70, 100, 340, 60, C.craie, 0, 3) + r(70, 100, 159, 60, C.bleu, 0.4, 3) + t(150, 140, "145 lues", C.craie, 22) + t(320, 140, "?", C.rose, 32) +
    l(70, 190, 410, 190, C.craie, 3) + l(70, 180, 70, 200, C.craie, 3) + l(410, 180, 410, 200, C.craie, 3) + t(240, 225, "312 pages", C.craie, 26) +
    t(240, 320, "📖", C.craie, 60) + t(240, 395, `Combien en reste-t-il${NB}?`, C.rose, 28)
);

const troisPosees = svg(
  "Trois façons de poser 425 + 38 : A, B et C",
  t(115, 80, "A", C.jaune, 32) + t(270, 80, "B", C.jaune, 32) + t(425, 80, "C", C.jaune, 32) +
    posee(145, 150, "425", "38", "+", C.craie, 30) + posee(300, 150, "425", "38", "+") + posee(455, 150, "425", "380", "+") +
    t(240, 340, "On veut calculer 425 + 38.", C.craie, 26) + t(240, 390, `Laquelle est bien posée${NB}?`, C.rose, 28)
);

const velo = svg(
  "Le vélo coûte 1 250 € ; Maman a 980 €",
  r(40, 90, 400, 60, C.craie, 0.05, 3) + t(240, 130, "le vélo : 1 250 €", C.craie, 26) +
    r(40, 180, 314, 60, C.bleu, 0.35, 3) + t(197, 220, "Maman : 980 €", C.craie, 24) + r(354, 180, 86, 60, C.rose, 0.2, 3, 0) + t(397, 222, "?", C.rose, 34) +
    t(240, 320, "🚲", C.craie, 60) + t(240, 395, `Combien manque-t-il${NB}?`, C.rose, 28)
);

const tom = svg(
  "La soustraction de Tom : 507 − 128 = 421",
  t(240, 80, "Tom a calculé :", C.pale, 26) + posee(300, 160, "507", "128", "−") + ["4", "2", "1"].map((ch, i) => t(240 + i * 30, 280, ch, C.bleu, 34)).join("") +
    t(240, 370, `A-t-il raison${NB}?`, C.rose, 30)
);

const cachee = svg(
  "Une addition posée avec deux chiffres cachés : 4 ★ 6 + 2 3 ▲ = 7 0 1",
  posee(300, 130, "4★6", "23▲", "+") + ["7", "0", "1"].map((ch, i) => t(240 + i * 30, 250, ch, C.craie, 34)).join("") +
    t(240, 340, "★ et ▲ sont des chiffres.", C.craie, 26) + t(240, 390, `Que vaut ★${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "addition_soustraction",
  titre: "Énigmes sur les additions et soustractions posées",
  description: "Les visiteurs du musée, les pages du livre de Zoé, l'opération bien posée, le vélo de Maman, le piège de la soustraction de Tom, le défi des chiffres cachés.",
  problemes: [
    {
      tag: "Énigme 1 · Au musée",
      titre: "Les visiteurs",
      question: `Samedi, <b>2 345</b> visiteurs.<br>Dimanche, <b>1 432</b> visiteurs.<br><br>Combien de visiteurs en tout ?`,
      reponse: `On pose 2 345 + 1 432, chiffre sous chiffre.<br>5 + 2 = 7 ; 4 + 3 = 7 ; 3 + 4 = 7 ; 2 + 1 = 3.<br><span class="big">3 777 visiteurs</span>.`,
      consigne: "Combien de visiteurs en tout ?",
      verification: { type: "courte", attendus: ["3777"], unite: "visiteurs" },
      dessin: musee,
    },
    {
      tag: "Énigme 2 · La lecture",
      titre: "Le livre de Zoé",
      question: `Le livre a <b>312</b> pages.<br>Zoé en a lu <b>145</b>.<br><br>Combien de pages lui reste-t-il ?`,
      reponse: `312 − 145 = <span class="big">167 pages</span>.<br>On vérifie : 167 + 145 = 312.`,
      consigne: "Combien de pages reste-t-il à lire ?",
      verification: { type: "courte", attendus: ["167"], unite: "pages" },
      dessin: livre,
    },
    {
      tag: "Énigme 3 · Au tableau",
      titre: "L'opération bien posée",
      question: `On veut calculer <b>425 + 38</b>.<br>Trois élèves l'ont posée.<br><br>Laquelle est bien posée ?`,
      reponse: `Les unités sous les unités : 8 sous le 5.<br>Les dizaines sous les dizaines : 3 sous le 2.<br><span class="big">La B</span> : 425 + 38 = 463.`,
      consigne: "Quelle opération est bien posée ?",
      verification: { type: "qcm", choix: ["L'opération A", "L'opération B", "L'opération C"], bonne: 1 },
      dessin: troisPosees,
    },
    {
      tag: "Énigme 4 · Le magasin",
      titre: "Le vélo de Maman",
      question: `Le vélo coûte <b>1 250 €</b>.<br>Maman a <b>980 €</b>.<br><br>Combien d'euros lui manque-t-il ?`,
      reponse: `Le morceau rose de la barre : 1 250 − 980.<br>980 + 20 = 1 000, puis 1 000 + 250 = 1 250.<br>20 + 250 = <span class="big">270 €</span>.`,
      consigne: "Combien d'euros manque-t-il ?",
      verification: { type: "courte", attendus: ["270"], unite: "€" },
      dessin: velo,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La soustraction de Tom",
      sorte: "piege",
      question: `Tom calcule <b>507 − 128</b>.<br>Il trouve <b>421</b>.<br><br>A-t-il raison ?`,
      reponse: `Le piège : Tom a fait 8 − 7 au lieu de 7 − 8.<br>On ne peut pas retourner les chiffres !<br>507 − 128 = <span class="big">379</span>. On vérifie : 379 + 128 = 507.`,
      consigne: "507 − 128, ça fait combien ?",
      verification: { type: "qcm", choix: ["Oui, 421", "Non, 389", "Non, 379"], bonne: 2 },
      dessin: tom,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les chiffres cachés",
      sorte: "defi",
      question: `Deux chiffres sont cachés : <b>★</b> et <b>▲</b>.<br>4★6 + 23▲ = 701.<br><br>Quel chiffre cache l'étoile ★ ?`,
      reponse: `Unités : 6 + ▲ finit par 1, donc ▲ = 5 (6 + 5 = 11, je retiens 1).<br>Dizaines : ★ + 3 + 1 finit par 0, donc ★ = 6.<br>466 + 235 = 701. ★ = <span class="big">6</span>.`,
      consigne: "Quel chiffre cache l'étoile ?",
      verification: { type: "courte", attendus: ["6"] },
      dessin: cachee,
    },
  ],
};

export default problemes;
