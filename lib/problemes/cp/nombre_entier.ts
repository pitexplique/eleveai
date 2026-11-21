// Énigmes à projeter — CP, notion nombre_entier (nombres jusqu'à 100) : les
// paquets de 10 crayons, le ballon au plus grand nombre, la carte après 49,
// les chats et les bols, le piège des éléphants et des souris, le défi des
// boîtes de 10 billes. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r } from "../dessins-ecole";
import { rang, carte } from "../dessins-cp";

const crayon = (x: number, y: number, c: string) => l(x, y, x, y + 110, c, 6);
const paquet = (x0: number) => {
  let s = "";
  for (let i = 0; i < 10; i++) s += crayon(x0 + i * 9, 90, i % 2 ? C.bleu : C.jaune);
  return s + r(x0 - 8, 135, 97, 14, C.rose, 0.6, 2, 4);
};
const crayons = svg(
  "Deux paquets de 10 crayons tenus par un élastique, et 4 crayons seuls",
  paquet(40) + paquet(170) + [0, 1, 2, 3].map((i) => crayon(320 + i * 32, 90, C.bleu)).join("") +
    t(85, 240, "10", C.pale, 24) + t(215, 240, "10", C.pale, 24) +
    t(240, 350, `Combien de crayons${NB}?`, C.rose, 30)
);

const ballon = (x: number, v: number, c: string) =>
  `<ellipse cx="${x}" cy="150" rx="55" ry="68" fill="${c}" fill-opacity="0.3" stroke="${c}" stroke-width="3"/>` +
  l(x, 218, x, 300, C.pale, 2) + t(x, 162, v, C.craie, 38);
const ballons = svg(
  "Trois ballons : 38, 83 et 29",
  ballon(100, 38, C.bleu) + ballon(240, 83, C.rose) + ballon(380, 29, C.jaune) +
    t(240, 370, `Le plus grand nombre${NB}?`, C.rose, 30)
);

const apres = svg(
  "Des cartes : 46, 47, 48, 49, puis une carte cachée",
  carte(60, 180, 46) + carte(150, 180, 47) + carte(240, 180, 48) + carte(330, 180, 49) + carte(420, 180, "?", C.rose) +
    t(240, 330, `Quelle carte${NB}?`, C.rose, 30)
);

const chats = svg(
  "7 chats en haut, 5 bols en bas, chaque bol sous un chat",
  rang("🐱", 7, 60, 150, 60, 44) + rang("🥣", 5, 60, 260, 60, 44) +
    t(240, 370, `Assez de bols${NB}?`, C.rose, 30)
);

const piege = svg(
  "En haut, 6 éléphants bien espacés sur toute la ligne ; en bas, 8 souris serrées",
  rang("🐘", 6, 50, 150, 76, 50) + rang("🐭", 8, 60, 280, 34, 28) +
    t(240, 380, `Où y en a-t-il le plus${NB}?`, C.rose, 30)
);

const boite = (x: number) => r(x - 60, 120, 120, 80, C.jaune, 0.2, 3, 8) + t(x, 170, "10", C.pale, 24);
const defi = svg(
  "27 billes à ranger ; des boîtes de 10 billes",
  t(240, 80, "27 billes", C.bleu, 40) + boite(100) + boite(240) + boite(380) +
    t(240, 250, "Une boîte = 10 billes", C.craie, 26) +
    t(240, 350, `Combien de boîtes pleines${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "cp",
  notionId: "nombre_entier",
  titre: "Énigmes sur les nombres jusqu'à 100",
  description: "Compter les paquets de 10 crayons, trouver le plus grand nombre des ballons, la carte après 49, les chats et les bols, le piège des éléphants et des souris, le défi des boîtes de 10 billes.",
  problemes: [
    {
      tag: "Énigme 1 · Les crayons",
      titre: "Les paquets de crayons",
      question: `Un paquet = <b>10</b> crayons.<br><br>Combien de crayons en tout ?`,
      reponse: `10, 20…<br>puis 21, 22, 23, 24.<br><span class="big">24 crayons</span>.`,
      consigne: "Combien de crayons en tout ?",
      verification: { type: "courte", attendus: ["24"] },
      dessin: crayons,
    },
    {
      tag: "Énigme 2 · La fête",
      titre: "Les ballons",
      question: `Quel ballon a le plus grand nombre ?`,
      reponse: `83 : 8 dizaines.<br>C'est le plus grand.<br><span class="big">83</span>.`,
      consigne: "Quel ballon a le plus grand nombre ?",
      verification: { type: "qcm", choix: ["38", "83", "29"], bonne: 1 },
      dessin: ballons,
    },
    {
      tag: "Énigme 3 · Les cartes",
      titre: "La carte cachée",
      question: `46, 47, 48, 49…<br><br>Quelle est la carte cachée ?`,
      reponse: `Après 49 vient <span class="big">50</span>.`,
      consigne: "Quel nombre vient juste après 49 ?",
      verification: { type: "courte", attendus: ["50"] },
      dessin: apres,
    },
    {
      tag: "Énigme 4 · Le repas des chats",
      titre: "Les chats et les bols",
      question: `Un bol pour chaque chat.<br><br>Y a-t-il assez de bols ?`,
      reponse: `7 chats, 5 bols.<br>2 chats n'ont pas de bol.<br><span class="big">Non, pas assez</span>.`,
      consigne: "Y a-t-il assez de bols pour les chats ?",
      verification: { type: "qcm", choix: ["Oui", "Non, pas assez", "Il y a trop de bols"], bonne: 1 },
      dessin: chats,
    },
    {
      tag: "Énigme 5 · Le piège",
      titre: "Les éléphants et les souris",
      question: `Les éléphants prennent toute la place.<br><br>Où y en a-t-il le plus ?`,
      reponse: `On compte !<br>6 éléphants, 8 souris.<br><span class="big">Les souris</span>.`,
      consigne: "Y a-t-il plus d'éléphants ou plus de souris ?",
      verification: { type: "qcm", choix: ["Les souris", "Les éléphants", "Pareil"], bonne: 0 },
      dessin: piege,
      sorte: "piege",
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les boîtes de billes",
      question: `J'ai <b>27</b> billes.<br>Une boîte = <b>10</b> billes.<br><br>Combien de boîtes pleines ?`,
      reponse: `27 = 2 dizaines et 7.<br><span class="big">2 boîtes pleines</span>.<br>Il reste 7 billes.`,
      consigne: "Avec 27 billes, combien de boîtes de 10 pleines ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: defi,
      sorte: "defi",
    },
  ],
};

export default problemes;
