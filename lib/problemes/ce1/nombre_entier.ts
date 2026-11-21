// Énigmes à projeter — CE1, notion nombres jusqu'à 1 000 (les cartes en
// boîtes, le plus grand dossard, le nombre dit en lettres, le chiffre des
// dizaines du bus, le piège de 91 et 109, le défi des trois cartes). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, grille } from "../dessins-ecole";

/** Une boîte de 100 (plaque quadrillée), un paquet de 10 (barre), une carte seule. */
const cent = (x: number, y: number) => r(x, y, 70, 70, C.bleu, 0.25, 3) + grille(x, y, 5, 5, 14, C.bleu, 1);
const dix = (x: number, y: number) => r(x, y, 14, 70, C.jaune, 0.35, 3);
const un = (x: number, y: number) => r(x, y, 14, 14, C.rose, 0.4, 2);

const cartes = svg(
  "3 plaques de 100, 4 barres de 10 et 6 petits carrés",
  [0, 1, 2].map((i) => cent(30 + i * 85, 90)).join("") + t(130, 200, "3 boîtes de 100", C.bleu, 20) +
    [0, 1, 2, 3].map((i) => dix(300 + i * 24, 90)).join("") + t(336, 200, "4 paquets de 10", C.jaune, 20) +
    [0, 1, 2].map((i) => un(410 + i * 20, 100) + un(410 + i * 20, 125)).join("") + t(430, 170, "6", C.rose, 22) +
    t(240, 300, `Combien de cartes${NB}?`, C.rose, 32)
);

const maillot = (x: number, n: string, c: string) =>
  `<path d="M${x - 55} 120 L${x - 25} 100 L${x + 25} 100 L${x + 55} 120 L${x + 45} 160 L${x + 32} 155 L${x + 32} 250 L${x - 32} 250 L${x - 32} 155 L${x - 45} 160 Z" fill="${c}" fill-opacity="0.25" stroke="${c}" stroke-width="3" stroke-linejoin="round"/>` +
  t(x, 205, n, C.craie, 34);

const dossards = svg(
  "Trois maillots : 527, 572 et 275",
  maillot(90, "527", C.bleu) + maillot(240, "572", C.jaune) + maillot(390, "275", C.rose) +
    t(240, 340, `Le plus grand nombre${NB}?`, C.rose, 30)
);

const lettres = svg(
  "Une bulle : deux cent huit",
  r(60, 80, 360, 120, C.bleu, 0.15, 3, 30) + `<path d="M140 200 L120 250 L190 200" fill="none" stroke="${C.bleu}" stroke-width="3" stroke-linejoin="round"/>` +
    t(240, 152, "deux cent huit", C.craie, 40) + t(240, 330, `En chiffres${NB}?`, C.rose, 32)
);

const bus = svg(
  "Un bus numéro 735 et un tableau centaines, dizaines, unités",
  r(70, 50, 340, 130, C.jaune, 0.25, 4, 20) + r(95, 75, 70, 50, C.craie, 0, 3) + r(185, 75, 70, 50, C.craie, 0, 3) + r(320, 72, 70, 40, C.craie, 0.9, 2, 6) +
    t(355, 102, "735", C.jaune, 28) + `<circle cx="140" cy="185" r="22" fill="${C.craie}" fill-opacity="0.8" stroke="${C.craie}" stroke-width="3"/><circle cx="340" cy="185" r="22" fill="${C.craie}" fill-opacity="0.8" stroke="${C.craie}" stroke-width="3"/>` +
    r(120, 250, 80, 50, C.bleu, 0.15, 3) + r(200, 250, 80, 50, C.jaune, 0.15, 3) + r(280, 250, 80, 50, C.rose, 0.15, 3) +
    t(160, 240, "c", C.bleu, 22) + t(240, 240, "d", C.jaune, 22) + t(320, 240, "u", C.rose, 22) +
    t(160, 287, "7", C.craie, 30) + t(240, 287, "?", C.jaune, 30) + t(320, 287, "5", C.craie, 30) +
    t(240, 370, `Le chiffre des dizaines${NB}?`, C.rose, 28)
);

const piege = svg(
  "Deux coureurs : dossard 91 et dossard 109",
  r(60, 110, 150, 110, C.bleu, 0.2, 4, 10) + t(135, 185, "91", C.craie, 56) +
    r(270, 110, 150, 110, C.rose, 0.2, 4, 10) + t(345, 185, "109", C.craie, 56) +
    t(240, 320, `Le plus grand${NB}?`, C.rose, 32)
);

const carte = (x: number, n: string) => r(x - 40, 110, 80, 110, C.jaune, 0.25, 4, 10) + t(x, 185, n, C.craie, 52);
const defi = svg(
  "Trois cartes : 4, 1 et 7, et trois cases vides",
  carte(140, "4") + carte(240, "1") + carte(340, "7") +
    [0, 1, 2].map((i) => l(160 + i * 60, 320, 200 + i * 60, 320, C.craie, 4)).join("") +
    t(240, 385, `Le plus grand nombre${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "nombre_entier",
  titre: "Énigmes sur les nombres jusqu'à 1 000",
  description: "Les cartes rangées en boîtes de 100, le plus grand dossard, le nombre dit en lettres, le chiffre des dizaines du bus, le piège de 91 et 109, le défi des trois cartes.",
  problemes: [
    {
      tag: "Énigme 1 · Les cartes de Noa",
      titre: "Les boîtes de cartes",
      question: `Noa range ses cartes.<br><b>3 boîtes de 100</b>.<br><b>4 paquets de 10</b>.<br><b>6 cartes</b> seules.<br><br>Combien de cartes ?`,
      reponse: `3 centaines, 4 dizaines, 6 unités.<br>300 + 40 + 6 = <span class="big">346 cartes</span>.`,
      consigne: "Combien de cartes a Noa ?",
      verification: { type: "courte", attendus: ["346"], unite: "cartes" },
      dessin: cartes,
    },
    {
      tag: "Énigme 2 · La course",
      titre: "Le plus grand dossard",
      question: `Trois maillots : <b>527</b>, <b>572</b>, <b>275</b>.<br><br>Quel est le plus grand nombre ?`,
      reponse: `On regarde d'abord les centaines : 5, 5 et 2.<br>Puis les dizaines : 2 et 7.<br>Le plus grand : <span class="big">572</span>.`,
      consigne: "Quel est le plus grand nombre ?",
      verification: { type: "qcm", choix: ["527", "275", "572"], bonne: 2 },
      dessin: dossards,
    },
    {
      tag: "Énigme 3 · La dictée de nombres",
      titre: "Deux cent huit",
      question: `La maîtresse dit : « <b>deux cent huit</b> ».<br><br>Comment l'écrire en chiffres ?`,
      reponse: `Deux cents : 2 centaines.<br>Pas de dizaine : on écrit 0.<br>Huit : 8 unités.<br><span class="big">208</span>.`,
      consigne: "Écris deux cent huit en chiffres.",
      verification: { type: "qcm", choix: ["208", "280", "2008"], bonne: 0 },
      dessin: lettres,
    },
    {
      tag: "Énigme 4 · Le bus",
      titre: "Le bus 735",
      question: `Léo prend le bus <b>735</b>.<br><br>Quel est le chiffre des <b>dizaines</b> ?`,
      reponse: `7 centaines, 3 dizaines, 5 unités.<br>Le chiffre des dizaines : <span class="big">3</span>.`,
      consigne: "Quel est le chiffre des dizaines de 735 ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: bus,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "91 ou 109",
      sorte: "piege",
      question: `Deux coureurs : <b>91</b> et <b>109</b>.<br><br>Quel nombre est le plus grand ?`,
      reponse: `Le piège : 9 est plus grand que 1.<br>Mais 109 a <b>3 chiffres</b>, 91 en a 2.<br>109, c'est plus de 100 !<br>Le plus grand : <span class="big">109</span>.`,
      consigne: "Quel nombre est le plus grand ?",
      verification: { type: "qcm", choix: ["91", "109", "Ils sont pareils"], bonne: 1 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les trois cartes",
      sorte: "defi",
      question: `Trois cartes : <b>4</b>, <b>1</b>, <b>7</b>.<br>On les pose côte à côte.<br><br>Quel est le plus grand nombre possible ?`,
      reponse: `Le plus grand chiffre va aux centaines : 7.<br>Puis 4 aux dizaines, 1 aux unités.<br><span class="big">741</span>.`,
      consigne: "Quel est le plus grand nombre avec 4, 1 et 7 ?",
      verification: { type: "courte", attendus: ["741"] },
      dessin: defi,
    },
  ],
};

export default problemes;
