// Énigmes à projeter — CE2, notion calcul mental (le jeu de fléchettes
// jusqu'à 100, les deux pochettes d'autocollants, la moitié des cartes, le bus
// et le « + 9 », le piège des 400 trombones, le défi des trois fléchettes).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l } from "../dessins-ecole";

const cible = (cx: number, cy: number, ray: number) =>
  o(cx, cy, ray, C.rose, 0.15, 4) + o(cx, cy, ray * 0.66, C.craie, 0, 3) + o(cx, cy, ray * 0.33, C.jaune, 0.5, 3);

const flechettes = svg(
  "Un score de 65 points ; il faut 100 pour gagner",
  cible(140, 190, 100) + r(280, 110, 170, 80, C.bleu, 0.15, 4, 8) + t(365, 165, "65", C.bleu, 46) +
    r(280, 220, 170, 80, C.jaune, 0.15, 4, 8) + t(365, 275, "100", C.jaune, 46) + t(240, 380, `Combien manque-t-il${NB}?`, C.rose, 28)
);

const stickers = svg(
  "Deux pochettes de 45 autocollants",
  [0, 1].map((i) => r(60 + i * 200, 90, 160, 180, C.jaune, 0.2, 4, 10) + t(140 + i * 200, 175, "⭐", C.craie, 50) + t(140 + i * 200, 235, "45", C.craie, 40)).join("") +
    t(240, 350, `en tout${NB}?`, C.rose, 32)
);

const moitie = svg(
  "60 cartes partagées en deux tas égaux",
  r(170, 70, 140, 100, C.bleu, 0.25, 4, 8) + t(240, 135, "60", C.craie, 44) +
    l(240, 180, 130, 240, C.pale, 3) + l(240, 180, 350, 240, C.pale, 3) +
    r(60, 250, 140, 90, C.rose, 0.15, 4, 8) + t(130, 310, "?", C.rose, 44) + r(280, 250, 140, 90, C.rose, 0.15, 4, 8) + t(350, 310, "?", C.rose, 44) +
    t(240, 395, "deux tas égaux", C.craie, 26)
);

const bus = svg(
  "Un bus avec 47 passagers ; 9 personnes montent",
  r(50, 110, 380, 140, C.jaune, 0.25, 5, 20) + [0, 1, 2, 3, 4].map((i) => r(75 + i * 70, 130, 50, 45, C.craie, 0.05, 3, 4)).join("") +
    o(120, 260, 24, C.craie, 0.3, 4) + o(360, 260, 24, C.craie, 0.3, 4) + t(240, 220, "47 passagers", C.craie, 28) +
    t(240, 330, "+ 9 qui montent", C.bleu, 28) + t(240, 385, `Combien dans le bus${NB}?`, C.rose, 28)
);

const trombones = svg(
  "Une boîte de 400 trombones ; on en prend 1",
  r(120, 80, 240, 160, C.pale, 0.15, 4, 10) + t(240, 175, "400", C.craie, 60) + t(240, 290, "− 1 trombone", C.bleu, 30) +
    t(240, 370, `Combien en reste-t-il${NB}?`, C.rose, 28)
);

const trois = svg(
  "Une cible : 5, 10 ou 25 points ; 3 fléchettes font 45 points",
  o(240, 180, 130, C.rose, 0.12, 4) + o(240, 180, 85, C.craie, 0.05, 3) + o(240, 180, 40, C.jaune, 0.5, 3) +
    t(240, 192, "25", C.craie, 32) + t(240, 120, "10", C.craie, 28) + t(240, 75, "5", C.craie, 26) +
    t(240, 360, `3 fléchettes = 45 points${NB}!`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "calcul_mental",
  titre: "Énigmes de calcul mental",
  description: "Le jeu de fléchettes jusqu'à 100, le double de 45, la moitié de 60 cartes, le bus et le « + 9 », le piège des 400 trombones, le défi des trois fléchettes.",
  problemes: [
    {
      tag: "Énigme 1 · Les fléchettes",
      titre: "Jusqu'à 100",
      question: `Sami a <b>65 points</b>.<br>Pour gagner, il faut <b>100</b>.<br><br>Combien de points lui manque-t-il ?`,
      reponse: `65 + 5 = 70, puis 70 + 30 = 100.<br>5 + 30 = <span class="big">35 points</span>.`,
      consigne: "Combien manque-t-il de 65 pour aller à 100 ?",
      verification: { type: "courte", attendus: ["35"], unite: "points" },
      dessin: flechettes,
    },
    {
      tag: "Énigme 2 · Les autocollants",
      titre: "Le double",
      question: `Nora a <b>deux pochettes</b>.<br>Chaque pochette a <b>45</b> autocollants.<br><br>Combien en tout ?`,
      reponse: `Le double de 45 : le double de 40 = 80, le double de 5 = 10.<br>80 + 10 = <span class="big">90</span>.`,
      consigne: "Quel est le double de 45 ?",
      verification: { type: "qcm", choix: ["80", "810", "90"], bonne: 2 },
      dessin: stickers,
    },
    {
      tag: "Énigme 3 · Le jeu de société",
      titre: "La moitié des cartes",
      question: `Le jeu a <b>60 cartes</b>.<br>On fait <b>deux tas égaux</b>.<br><br>Combien de cartes dans un tas ?`,
      reponse: `La moitié de 60 : 30 + 30 = 60.<br><span class="big">30 cartes</span> par tas.`,
      consigne: "Quelle est la moitié de 60 ?",
      verification: { type: "courte", attendus: ["30"], unite: "cartes" },
      dessin: moitie,
    },
    {
      tag: "Énigme 4 · Le bus",
      titre: "Le « + 9 »",
      question: `Le bus a <b>47 passagers</b>.<br>À l'arrêt, <b>9</b> personnes montent.<br><br>Combien de passagers maintenant ?`,
      reponse: `Astuce : + 9, c'est + 10 puis − 1.<br>47 + 10 = 57, puis 57 − 1 = <span class="big">56</span>.`,
      consigne: "Combien font 47 + 9 ?",
      verification: { type: "qcm", choix: ["56", "57", "46"], bonne: 0 },
      dessin: bus,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les 400 trombones",
      sorte: "piege",
      question: `La boîte contient <b>400 trombones</b>.<br>Tu en prends <b>un seul</b>.<br><br>Combien en reste-t-il ?`,
      reponse: `Le piège : enlever 1 au chiffre des centaines et écrire 300.<br>On recule d'un pas : 400 − 1 = <span class="big">399</span>.`,
      consigne: "Combien font 400 − 1 ?",
      verification: { type: "qcm", choix: ["300", "399", "3 999"], bonne: 1 },
      dessin: trombones,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les trois fléchettes",
      sorte: "defi",
      question: `Sur la cible : <b>5</b>, <b>10</b> ou <b>25</b> points.<br>Lina lance <b>3 fléchettes</b>. Elle marque <b>45</b>.<br><br>Où sont ses fléchettes ?`,
      reponse: `Deux fois 25 = 50 : déjà trop. Donc une seule 25.<br>Il reste 45 − 25 = 20 pour deux fléchettes : 10 + 10.<br><span class="big">25 + 10 + 10</span>.`,
      consigne: "Quelles sont les 3 fléchettes de Lina ?",
      verification: { type: "qcm", choix: ["25 + 25 + 5", "10 + 10 + 10", "25 + 10 + 10"], bonne: 2 },
      dessin: trois,
    },
  ],
};

export default problemes;
