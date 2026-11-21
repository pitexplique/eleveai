// Énigmes à projeter — seconde, notion expressions_litterales_2de (le vélo
// loué à Saint-Gilles, le programme qui rend le nombre, isoler l dans le
// périmètre, trois entiers qui se suivent, piège « le double de la somme »,
// défi du nombre magique 1). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, fleche } from "../dessins-ecole";

const velo = svg(
  "Un vélo de location : 5 euros plus 2 euros par heure",
  o(150, 210, 55, C.craie, 0, 4) + o(330, 210, 55, C.craie, 0, 4) + `<path d="M150 210 L210 130 L300 130 L330 210 M210 130 L240 210 L300 130 M240 210 L150 210 M195 110 L225 110 M300 130 L295 105 L320 105" fill="none" stroke="${C.bleu}" stroke-width="5" stroke-linejoin="round"/>` +
    t(240, 60, "P = 5 + 2h", C.jaune, 36) + t(240, 330, "h = 3,5 heures", C.craie, 26) + t(240, 385, `prix${NB}?`, C.rose, 28)
);

const programme = svg(
  "Un programme de calcul en quatre étapes",
  ["choisir un nombre", "ajouter 3", "multiplier par 2", "soustraire 6", "diviser par 2"].map((e, k) => r(110, 30 + 66 * k, 260, 46, k ? C.bleu : C.jaune, 0.15, 3, 10) + t(240, 61 + 66 * k, e, C.craie, 22) + (k < 4 ? fleche(240, 76 + 66 * k, 240, 96 + 66 * k, C.pale, 3) : "")).join("") +
    t(420, 395, `résultat${NB}?`, C.rose, 22, "end")
);

const perimetre = svg(
  "Un rectangle de longueur L et de largeur l, de périmètre P",
  r(90, 110, 300, 160, C.jaune, 0.15, 4) + t(240, 95, "L", C.craie, 30) + t(405, 200, "l", C.craie, 30, "start") +
    t(240, 200, "P = 2(L + l)", C.bleu, 34) + t(240, 350, `l = ?`, C.rose, 34).replace(" ?", `${NB}?`)
);

const consecutifs = svg(
  "Trois entiers qui se suivent : n, n plus 1, n plus 2, de somme 2025",
  r(50, 140, 110, 80, C.bleu, 0.15, 3, 10) + r(185, 140, 110, 80, C.bleu, 0.15, 3, 10) + r(320, 140, 110, 80, C.bleu, 0.15, 3, 10) +
    t(105, 190, "n", C.craie, 30) + t(240, 190, "n + 1", C.craie, 28) + t(375, 190, "n + 2", C.craie, 28) +
    t(240, 290, "somme = 2 025", C.jaune, 32) + t(240, 360, `le plus petit${NB}?`, C.rose, 28)
);

const piege = svg(
  "Une phrase à traduire : le double de la somme de x et de 5",
  t(240, 140, "« le double", C.craie, 34) + t(240, 190, "de la somme de x et de 5 »", C.craie, 30) + l(110, 210, 370, 210, C.jaune, 3) + t(240, 300, `en calcul${NB}?`, C.rose, 30)
);

const magique = svg(
  "Le nombre magique : n au carré moins le produit du nombre d'avant et du nombre d'après",
  t(240, 110, "n² − (n − 1)(n + 1)", C.bleu, 34) + t(240, 190, "n = 7 : 49 − 6 × 8", C.craie, 26).replace(" :", `${NB}:`) + t(240, 235, "n = 12 : 144 − 11 × 13", C.craie, 26).replace(" :", `${NB}:`) +
    t(240, 330, `toujours le même résultat${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "expressions_litterales_2de",
  titre: "Énigmes des expressions littérales",
  description: "Le vélo loué à Saint-Gilles, le programme qui rend le nombre, isoler une longueur dans une formule, trois entiers qui se suivent, le piège du double de la somme, le défi du nombre magique : écrire, utiliser et transformer des expressions.",
  problemes: [
    {
      tag: "Énigme 1 · Le vélo",
      titre: "La location à Saint-Gilles",
      question: `À Saint-Gilles, la location d'un vélo coûte <b>P = 5 + 2h</b> euros, où h est la durée en heures.<br><br><b>Quel est le prix</b> pour 3 h 30 ?`,
      reponse: `3 h 30 = 3,5 h (une demi-heure = 0,5 h).<br>P = 5 + 2 × 3,5 = 5 + 7 = <span class="big">12 €</span>.`,
      consigne: "Quel est le prix en euros pour 3 h 30 ?",
      verification: { type: "courte", attendus: ["12"], unite: "€" },
      dessin: velo,
    },
    {
      tag: "Énigme 2 · Le programme",
      titre: "Il rend le nombre",
      question: `Choisis un nombre, ajoute 3, multiplie par 2, soustrais 6, divise par 2.<br><br><b>Que trouve-t-on</b> à chaque fois ?`,
      reponse: `Avec x : x + 3, puis 2(x + 3) = 2x + 6, puis 2x + 6 − 6 = 2x, puis 2x ÷ 2 = x.<br>On retrouve toujours <span class="big">le nombre de départ</span>.`,
      consigne: "Que donne le programme à chaque fois ?",
      verification: { type: "qcm", choix: ["Le nombre de départ", "Toujours 3", "Le double du nombre"], bonne: 0 },
      dessin: programme,
    },
    {
      tag: "Énigme 3 · Isoler une lettre",
      titre: "La largeur",
      question: `Le périmètre d'un rectangle s'écrit <b>P = 2(L + l)</b>.<br><br><b>Quelle formule</b> donne la largeur l ?`,
      reponse: `On divise par 2 : P ÷ 2 = L + l.<br>On enlève L : <span class="big">l = P ÷ 2 − L</span>.<br>Vérif : P = 20, L = 6 donne l = 10 − 6 = 4, et 2(6 + 4) = 20.`,
      consigne: "Quelle formule donne l à partir de P = 2(L + l) ?",
      verification: { type: "qcm", choix: ["l = P − 2L", "l = P ÷ 2 − L", "l = 2P − L"], bonne: 1 },
      dessin: perimetre,
    },
    {
      tag: "Énigme 4 · Trois qui se suivent",
      titre: "La somme 2 025",
      question: `Trois entiers qui se suivent ont pour somme <b>2 025</b>.<br><br><b>Quel est le plus petit</b> ?`,
      reponse: `n + (n + 1) + (n + 2) = 3n + 3 = 2 025, donc 3n = 2 022 et n = 674.<br>Le plus petit est <span class="big">674</span> (674 + 675 + 676 = 2 025).`,
      consigne: "Quel est le plus petit des trois entiers ?",
      verification: { type: "courte", attendus: ["674"] },
      dessin: consecutifs,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le double de la somme",
      sorte: "piege",
      question: `<b>Traduis</b> en calcul : « le double de la somme de x et de 5 ».<br>A. 2x + 5 B. x + 10 C. 2(x + 5)`,
      reponse: `On fait d'abord la somme x + 5, puis on la double : les parenthèses sont obligatoires.<br>Réponse <span class="big">2(x + 5)</span>, soit 2x + 10.<br>2x + 5, c'est « la somme du double de x et de 5 ».`,
      consigne: "Traduire « le double de la somme de x et de 5 ».",
      verification: { type: "qcm", choix: ["2x + 5", "x + 10", "2(x + 5)"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le nombre magique",
      sorte: "defi",
      question: `Choisis un entier n. Calcule son carré, puis retire le produit du nombre d'avant et du nombre d'après : n² − (n − 1)(n + 1).<br><br><b>Que trouve-t-on</b> toujours ?`,
      reponse: `(n − 1)(n + 1) = n² − 1, donc n² − (n² − 1) = <span class="big">1</span>.<br>Avec 7 : 49 − 48 = 1. Avec 12 : 144 − 143 = 1. Toujours 1 !`,
      consigne: "Que vaut toujours n² − (n − 1)(n + 1) ?",
      verification: { type: "courte", attendus: ["1"] },
      dessin: magique,
    },
  ],
};

export default problemes;
