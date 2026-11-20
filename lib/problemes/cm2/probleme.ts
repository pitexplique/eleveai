// Énigmes à projeter — CM2, notion probleme (problèmes à étapes : le cinéma en
// famille, l'album à compléter, la randonnée, le pack de yaourts ; le piège
// de « l'âge du capitaine », le défi des poules et des lapins). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";

const cinema = svg(
  "Des billets de cinéma : adulte 9 €, enfant 6 € ; 2 adultes et 3 enfants",
  r(40, 70, 180, 90, C.bleu, 0.18, 4, 8) + t(130, 110, "adulte", C.bleu, 22) + t(130, 145, "9 €", C.craie, 30) +
    r(260, 70, 180, 90, C.jaune, 0.2, 4, 8) + t(350, 110, "enfant", C.jaune, 22) + t(350, 145, "6 €", C.craie, 30) +
    t(240, 240, "👩 👨   👧 👦 👶", C.craie, 44) + t(240, 340, `Combien paie la famille${NB}?`, C.rose, 26)
);

// L'album : 240 cases ; bande de 400 px (1 case = 1,67 px), 168 remplies = 280 px.
const album = svg(
  "Un album de 240 cartes : 168 déjà collées, il en manque, paquets de 8",
  r(40, 120, 400, 60, C.craie, 0, 3, 4) + r(40, 120, 280, 60, C.rose, 0.35, 0) +
    t(180, 160, "168 collées", C.craie, 22) + t(380, 160, "?", C.rose, 30) + t(240, 100, "240 cartes", C.craie, 26) +
    r(170, 240, 140, 70, C.jaune, 0.25, 4, 8) + t(240, 285, "paquet de 8", C.craie, 22) + t(240, 370, `Combien de paquets${NB}?`, C.rose, 26)
);

// La randonnée : 12 km = 360 px (1 km = 30 px).
const rando = svg(
  "Un chemin de 12 km : 4,5 km le matin, 3,8 km l'après-midi, le reste est inconnu",
  r(60, 200, 135, 30, C.jaune, 0.4, 3) + r(195, 200, 114, 30, C.bleu, 0.4, 3) + r(309, 200, 111, 30, C.rose, 0, 3).replace("/>", ' stroke-dasharray="6 5"/>') +
    t(127, 185, "4,5 km", C.jaune, 22) + t(127, 260, "matin", C.pale, 18) + t(252, 185, "3,8 km", C.bleu, 22) + t(252, 260, "après-midi", C.pale, 18) +
    t(365, 185, "? km", C.rose, 24) + l(60, 300, 420, 300, C.craie, 3) + t(240, 335, "12 km en tout", C.craie, 24) + t(240, 110, "🥾 ⛰️", C.craie, 50)
);

const yaourts = svg(
  "Un pack de 6 yaourts à 3 €, ou un yaourt seul à 0,60 €",
  [0, 1, 2, 3, 4, 5].map((i) => r(50 + (i % 3) * 50, 110 + Math.floor(i / 3) * 60, 44, 54, C.bleu, 0.2, 3, 6)).join("") +
    r(40, 100, 170, 130, C.craie, 0, 3, 8) + t(125, 270, "pack de 6 : 3 €", C.craie, 22) +
    r(330, 140, 60, 70, C.jaune, 0.25, 3, 6) + t(360, 270, "1 yaourt : 0,60 €", C.craie, 22) + t(240, 360, `Le moins cher par yaourt${NB}?`, C.rose, 24)
);

const bateau = svg(
  "Un bateau avec 26 moutons et 10 chèvres, et un capitaine",
  p("M60 250 L420 250 L380 320 L100 320 Z", C.bleu, 4, 0.2) + l(240, 250, 240, 80, C.craie, 4) + p("M245 90 L360 230 L245 230 Z", C.pale, 3, 0.15) +
    t(140, 235, "🐑 × 26", C.craie, 26) + t(330, 210, "🐐 × 10", C.craie, 24) + t(190, 160, "🧑‍✈️", C.craie, 40) +
    t(240, 380, `l'âge du capitaine${NB}?`, C.rose, 28)
);

const ferme = svg(
  "Une cour avec des poules et des lapins : 10 têtes, 28 pattes",
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => o(60 + (i % 5) * 90, 90 + Math.floor(i / 5) * 90, 30, C.jaune, 0.2, 3) + t(60 + (i % 5) * 90, 101 + Math.floor(i / 5) * 90, "?", C.craie, 30)).join("") +
    t(240, 270, "🐔 ou 🐇 ? 10 têtes", C.craie, 30) + t(240, 330, "28 pattes", C.craie, 32)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "probleme",
  titre: "Énigmes : des problèmes à étapes",
  description: "Le cinéma en famille, l'album de cartes, la randonnée de 12 km, le pack de yaourts, le piège de l'âge du capitaine, le défi des poules et des lapins.",
  problemes: [
    {
      tag: "Énigme 1 · Au cinéma",
      titre: "La sortie en famille",
      question: `Un billet adulte coûte <b>9 €</b>. Un billet enfant coûte <b>6 €</b>.<br>La famille a <b>2 adultes</b> et <b>3 enfants</b>.<br><br><b>Combien paie-t-elle</b> ?`,
      reponse: `Adultes : 2 × 9 = 18 €. Enfants : 3 × 6 = 18 €.<br>18 + 18 = <span class="big">36 €</span>.`,
      consigne: "Combien paie la famille ?",
      verification: { type: "courte", attendus: ["36"], unite: "€" },
      dessin: cinema,
    },
    {
      tag: "Énigme 2 · L'album de cartes",
      titre: "Les paquets qui manquent",
      question: `Un album a <b>240 cartes</b>. Kim en a déjà collé <b>168</b>.<br>Les cartes se vendent par paquets de <b>8</b>, toutes différentes.<br><br><b>Combien de paquets</b> pour finir l'album ?`,
      reponse: `Il manque 240 − 168 = 72 cartes.<br>72 ÷ 8 = <span class="big">9 paquets</span>.`,
      consigne: "Combien de paquets faut-il ?",
      verification: { type: "courte", attendus: ["9"], unite: "paquets" },
      dessin: album,
    },
    {
      tag: "Énigme 3 · En randonnée",
      titre: "Le reste du chemin",
      question: `Le chemin fait <b>12 km</b>.<br>Le matin, Hugo marche <b>4,5 km</b>. L'après-midi, <b>3,8 km</b>.<br><br><b>Combien lui reste-t-il</b> ?`,
      reponse: `Déjà fait : 4,5 + 3,8 = 8,3 km.<br>12 − 8,3 = <span class="big">3,7 km</span>.`,
      consigne: "Combien de kilomètres reste-t-il ?",
      verification: { type: "courte", attendus: ["3,7", "3.7"], unite: "km" },
      dessin: rando,
    },
    {
      tag: "Énigme 4 · Au supermarché",
      titre: "Le pack de yaourts",
      question: `Un pack de <b>6 yaourts</b> coûte <b>3 €</b>.<br>Un yaourt seul coûte <b>0,60 €</b>.<br><br><b>Qu'est-ce qui est le moins cher</b>, par yaourt ?`,
      reponse: `Dans le pack : 3 ÷ 6 = 0,50 € le yaourt.<br>0,50 € est moins que 0,60 €.<br><span class="big">Le pack est moins cher</span>.`,
      consigne: "Qu'est-ce qui est le moins cher, par yaourt ?",
      verification: { type: "qcm", choix: ["Le pack", "Le yaourt seul", "C'est le même prix"], bonne: 0 },
      dessin: yaourts,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'âge du capitaine",
      sorte: "piege",
      question: `Sur un bateau, il y a <b>26 moutons</b> et <b>10 chèvres</b>.<br><br><b>Quel âge a le capitaine</b> ?`,
      reponse: `Les moutons et les chèvres ne disent rien de son âge !<br>26 + 10 ou 26 − 10 n'ont aucun sens ici.<br><span class="big">On ne peut pas savoir</span>.`,
      consigne: "Quel âge a le capitaine ?",
      verification: { type: "qcm", choix: ["36 ans", "16 ans", "On ne peut pas savoir"], bonne: 2 },
      dessin: bateau,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Poules et lapins",
      sorte: "defi",
      question: `Dans une cour, il y a des poules et des lapins.<br>On compte <b>10 têtes</b> et <b>28 pattes</b>.<br><br><b>Combien de lapins</b> ?`,
      reponse: `Si les 10 étaient des poules : 10 × 2 = 20 pattes.<br>Il manque 8 pattes. Un lapin a 2 pattes de plus qu'une poule.<br>8 ÷ 2 = <span class="big">4 lapins</span> (et 6 poules).`,
      consigne: "Combien y a-t-il de lapins ?",
      verification: { type: "courte", attendus: ["4"], unite: "lapins" },
      dessin: ferme,
    },
  ],
};

export default problemes;
