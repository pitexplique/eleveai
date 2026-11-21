// Énigmes à projeter — CE2, notion multiplication (le plateau de muffins,
// les pattes des chats, les paquets de 10 crayons, les boîtes de feutres, le
// piège des billes gagnées, le défi des étoiles de mer et des pieuvres).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o } from "../dessins-ecole";

const muffins = svg(
  "Un plateau de muffins : 4 rangées de 5",
  r(50, 60, 380, 260, C.pale, 0.1, 4, 14) +
    Array.from({ length: 20 }, (_, k) => o(100 + (k % 5) * 70, 105 + Math.floor(k / 5) * 60, 24, C.jaune, 0.45, 3)).join("") +
    t(240, 385, `Combien de muffins${NB}?`, C.rose, 28)
);

const chats = svg(
  "8 chats ; chaque chat a 4 pattes",
  Array.from({ length: 8 }, (_, k) => t(75 + (k % 4) * 110, 130 + Math.floor(k / 4) * 110, "🐈", C.craie, 64)).join("") +
    t(240, 320, "1 chat = 4 pattes", C.craie, 28) + t(240, 380, `8 chats${NB}: ? pattes`, C.rose, 28)
);

const paquets = svg(
  "34 paquets de 10 crayons",
  Array.from({ length: 6 }, (_, k) => r(40 + k * 70, 90, 50, 150, C.bleu, 0.25, 3, 4) + t(65 + k * 70, 175, "10", C.craie, 22)).join("") +
    t(240, 290, "… 34 paquets de 10", C.craie, 30) + t(240, 370, `Combien de crayons${NB}?`, C.rose, 28)
);

const feutres = svg(
  "3 boîtes de 24 feutres",
  [0, 1, 2].map((i) => r(40 + i * 140, 110, 120, 140, C.rose, 0.2, 4, 8) + t(100 + i * 140, 195, "24", C.craie, 40)).join("") +
    t(240, 310, "3 boîtes de 24 feutres", C.craie, 28) + t(240, 370, `en tout${NB}?`, C.rose, 30)
);

const billes = svg(
  "Léo a 5 billes ; il en gagne 3",
  Array.from({ length: 5 }, (_, k) => o(80 + k * 55, 140, 20, C.bleu, 0.5, 3)).join("") + t(240, 200, "Léo a 5 billes.", C.craie, 26) +
    Array.from({ length: 3 }, (_, k) => o(185 + k * 55, 260, 20, C.jaune, 0.5, 3)).join("") + t(240, 320, "Il en gagne 3.", C.craie, 26) +
    t(240, 385, `Combien de billes maintenant${NB}?`, C.rose, 26)
);

const mer = svg(
  "3 étoiles de mer à 5 bras et 2 pieuvres à 8 bras",
  [0, 1, 2].map((i) => t(80 + i * 80, 160, "⭐", C.craie, 56)).join("") + t(160, 220, "5 bras chacune", C.craie, 22) +
    [0, 1].map((i) => t(350 + i * 80, 160, "🐙", C.craie, 56)).join("") + t(390, 220, "8 bras chacune", C.craie, 22) +
    t(240, 340, `Combien de bras en tout${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "multiplication",
  titre: "Énigmes sur la multiplication",
  description: "Le plateau de muffins en rangées, les pattes des chats, les paquets de 10 crayons, les boîtes de feutres, le piège des billes gagnées, le défi des étoiles de mer et des pieuvres.",
  problemes: [
    {
      tag: "Énigme 1 · La boulangerie",
      titre: "Le plateau de muffins",
      question: `Sur le plateau, <b>4 rangées</b> de <b>5 muffins</b>.<br><br>Combien de muffins ?`,
      reponse: `4 rangées de 5 : 4 × 5 = <span class="big">20 muffins</span>.<br>On peut aussi compter 5, 10, 15, 20.`,
      consigne: "Combien de muffins sur le plateau ?",
      verification: { type: "courte", attendus: ["20"], unite: "muffins" },
      dessin: muffins,
    },
    {
      tag: "Énigme 2 · Les chats du quartier",
      titre: "Les pattes des chats",
      question: `Il y a <b>8 chats</b>.<br>Chaque chat a <b>4 pattes</b>.<br><br>Combien de pattes en tout ?`,
      reponse: `8 fois 4 pattes : 8 × 4 = <span class="big">32 pattes</span>.`,
      consigne: "Combien de pattes ont les 8 chats ?",
      verification: { type: "courte", attendus: ["32"], unite: "pattes" },
      dessin: chats,
    },
    {
      tag: "Énigme 3 · La papeterie",
      titre: "Les paquets de 10",
      question: `Le magasin a <b>34 paquets</b>.<br>Dans chaque paquet, <b>10 crayons</b>.<br><br>Combien de crayons ?`,
      reponse: `34 × 10 : 34 dizaines.<br>34 dizaines = <span class="big">340 crayons</span>.`,
      consigne: "Combien font 34 paquets de 10 crayons ?",
      verification: { type: "qcm", choix: ["340", "3 400", "44"], bonne: 0 },
      dessin: paquets,
    },
    {
      tag: "Énigme 4 · Le cadeau de la classe",
      titre: "Les boîtes de feutres",
      question: `Une boîte contient <b>24 feutres</b>.<br>La maîtresse achète <b>3 boîtes</b>.<br><br>Combien de feutres en tout ?`,
      reponse: `3 × 24 = 3 × 20 + 3 × 4.<br>60 + 12 = <span class="big">72 feutres</span>.`,
      consigne: "Combien de feutres dans 3 boîtes de 24 ?",
      verification: { type: "courte", attendus: ["72"], unite: "feutres" },
      dessin: feutres,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les billes gagnées",
      sorte: "piege",
      question: `Léo a <b>5 billes</b>.<br>À la récré, il en gagne <b>3</b>.<br><br>Combien de billes a-t-il maintenant ?`,
      reponse: `Le piège : faire 5 × 3.<br>Léo gagne 3 billes : on les <b>ajoute</b>.<br>5 + 3 = <span class="big">8 billes</span>.`,
      consigne: "Combien de billes a Léo maintenant ?",
      verification: { type: "qcm", choix: ["15", "8", "2"], bonne: 1 },
      dessin: billes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Étoiles de mer et pieuvres",
      sorte: "defi",
      question: `Dans l'aquarium : <b>3 étoiles de mer</b> et <b>2 pieuvres</b>.<br>Une étoile a 5 bras. Une pieuvre a 8 bras.<br><br>Combien de bras en tout ?`,
      reponse: `Étoiles : 3 × 5 = 15.<br>Pieuvres : 2 × 8 = 16.<br>15 + 16 = <span class="big">31 bras</span>.`,
      consigne: "Combien de bras en tout ?",
      verification: { type: "courte", attendus: ["31"], unite: "bras" },
      dessin: mer,
    },
  ],
};

export default problemes;
