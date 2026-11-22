// Énigmes à projeter — STMG (1re), notion taux d'évolution
// (le loueur de voitures, le ticket de bus, le fabricant de vélos, la PME de
// logistique, piège des deux boutiques de téléphonie, défi de la prime). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, fleche } from "../dessins-ecole";

/** Deux barres sur une même base (y = 330), hauteurs en pixels. */
const deuxBarres = (h1: number, h2: number, v1: string, v2: string, a1: string, a2: string) =>
  l(70, 330, 410, 330, C.craie, 3) +
  r(110, 330 - h1, 90, h1, C.bleu, 0.35, 3) + r(280, 330 - h2, 90, h2, C.bleu, 0.35, 3) +
  t(155, 318 - h1, v1, C.bleu, 22) + t(325, 318 - h2, v2, C.bleu, 22) +
  t(155, 360, a1, C.craie, 22) + t(325, 360, a2, C.craie, 22);

const loueur = svg("Le loueur de voitures : 400 clients en 2025, 460 clients en 2026",
  deuxBarres(200, 230, "400 clients", "460 clients", "2025", "2026") +
    t(240, 405, `taux d'évolution :${NB}?`, C.rose, 26));

const ticket = svg("Le ticket de bus : 1,60 € avant, 1,80 € après",
  t(130, 120, "avant", C.pale, 22) + t(355, 120, "après", C.pale, 22) +
    r(50, 140, 160, 90, C.jaune, 0.25, 3, 8) + t(130, 196, "1,60 €", C.craie, 30) +
    fleche(222, 185, 262, 185, C.craie, 4) +
    r(275, 140, 160, 90, C.jaune, 0.25, 3, 8) + t(355, 196, "1,80 €", C.craie, 30) +
    t(240, 320, `taux d'évolution :${NB}?`, C.rose, 28));

const velos = svg("Le fabricant de vélos : 2 500 vélos vendus en 2025, 2 000 en 2026",
  deuxBarres(200, 160, "2 500 vélos", "2 000 vélos", "2025", "2026") +
    t(240, 405, `taux d'évolution :${NB}?`, C.rose, 26));

const pme = svg("Deux phrases : A, les CDD sont 30 % des salariés ; B, le nombre de CDD a augmenté de 30 %",
  r(40, 90, 400, 90, C.bleu, 0.15, 3, 10) + t(60, 143, "A : les CDD sont 30 % des salariés", C.craie, 18, "start") +
    r(40, 220, 400, 90, C.jaune, 0.15, 3, 10) + t(60, 273, "B : le nombre de CDD a augmenté de 30 %", C.craie, 18, "start") +
    t(240, 380, `une évolution :${NB}A ou B${NB}?`, C.rose, 26));

const boutiques = svg("Deux boutiques : le centre passe de 100 à 150 clients, la gare de 1 000 à 1 200 clients",
  r(40, 90, 400, 90, C.bleu, 0.15, 3, 10) + t(240, 145, "centre : 100 → 150 clients", C.craie, 24) +
    r(40, 220, 400, 90, C.jaune, 0.15, 3, 10) + t(240, 275, "gare : 1 000 → 1 200 clients", C.craie, 24) +
    t(240, 380, `la plus forte évolution :${NB}?`, C.rose, 24));

const prime = svg("La prime de fin d'année : elle augmente de 45 €, soit 6 %",
  r(70, 140, 200, 130, C.jaune, 0.2, 4, 6) + p("M70 140 L170 210 L270 140", C.jaune, 4) +
    t(375, 170, "+ 45 €", C.bleu, 30) + t(375, 230, "soit + 6 %", C.rose, 26) +
    t(240, 360, `nouvelle prime :${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_evo_taux",
  titre: "Énigmes de taux d'évolution",
  description: "Le loueur de voitures, le ticket de bus, le fabricant de vélos, la PME de logistique, le piège des deux boutiques, le défi de la prime : variation absolue et relative, taux d'évolution en pourcentage, proportion ou évolution.",
  problemes: [
    {
      tag: "Énigme 1 · Le loueur de voitures",
      titre: "Plus de clients",
      question: `Un loueur de voitures avait 400 clients en 2025 et 460 clients en 2026.<br><br><b>Quel est le taux d'évolution</b> du nombre de clients ?`,
      reponse: `Variation absolue : 460 − 400 = 60 clients.<br>Taux = 60 ÷ 400 = 0,15, soit <span class="big">+ 15 %</span>.<br>60 est un nombre de clients, pas un pourcentage.`,
      consigne: "400 clients puis 460 clients. Quel est le taux d'évolution ?",
      verification: { type: "qcm", choix: ["+ 60 %", "+ 6 %", "+ 15 %"], bonne: 2 },
      dessin: loueur,
    },
    {
      tag: "Énigme 2 · Le ticket de bus",
      titre: "Vingt centimes de plus",
      question: `Le ticket de bus passe de 1,60 € à 1,80 €.<br><br><b>De quel pourcentage</b> le prix a-t-il augmenté ?`,
      reponse: `Taux = (1,80 − 1,60) ÷ 1,60 = 0,20 ÷ 1,60 = 0,125.<br><span class="big">+ 12,5 %</span>. On divise toujours par la valeur de DÉPART.`,
      consigne: "Le prix passe de 1,60 € à 1,80 €. Quel est le taux d'évolution ?",
      verification: { type: "qcm", choix: ["+ 12,5 %", "+ 20 %", "+ 11,1 %"], bonne: 0 },
      dessin: ticket,
    },
    {
      tag: "Énigme 3 · Le fabricant de vélos",
      titre: "Une baisse",
      question: `Un fabricant a vendu 2 500 vélos en 2025 et 2 000 vélos en 2026.<br><br><b>Quel est le taux d'évolution</b> des ventes, en pourcentage ?`,
      reponse: `Taux = (2 000 − 2 500) ÷ 2 500 = −500 ÷ 2 500 = −0,2.<br><span class="big">− 20 %</span> : les ventes ont baissé de 20 %.`,
      consigne: "2 500 vélos puis 2 000 vélos. Quel est le taux d'évolution en % ?",
      verification: { type: "courte", attendus: ["-20", "−20", "-20%", "−20%"], unite: "%" },
      dessin: velos,
    },
    {
      tag: "Énigme 4 · La PME de logistique",
      titre: "Proportion ou évolution ?",
      question: `Le directeur d'une PME de logistique lit deux phrases.<br>A : « Les CDD représentent 30 % des salariés. »<br>B : « Le nombre de CDD a augmenté de 30 %. »<br><br><b>Quelle phrase parle d'une évolution</b> ?`,
      reponse: `A compare une partie à un tout, au même moment : c'est une proportion.<br>B compare deux moments : <span class="big">B</span> est une évolution.`,
      consigne: "A : les CDD sont 30 % des salariés. B : le nombre de CDD a augmenté de 30 %. Quelle phrase parle d'une évolution ?",
      verification: { type: "courte", attendus: ["B"] },
      dessin: pme,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux boutiques",
      sorte: "piege",
      question: `Deux boutiques de téléphonie.<br>Centre : de 100 à 150 clients. Gare : de 1 000 à 1 200 clients.<br>Inès : « La gare progresse le plus, elle a gagné 200 clients. »<br><br><b>Quelle boutique a le plus fort taux d'évolution</b> ?`,
      reponse: `Centre : 50 ÷ 100 = + 50 %.<br>Gare : 200 ÷ 1 000 = + 20 %.<br><span class="big">La boutique du centre</span>. Inès compare des variations absolues, pas des taux.`,
      consigne: "Centre : 100 → 150 clients. Gare : 1 000 → 1 200 clients. Quelle boutique a le plus fort taux d'évolution ?",
      verification: { type: "qcm", choix: ["la boutique de la gare", "la boutique du centre", "les deux pareil"], bonne: 1 },
      dessin: boutiques,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La prime",
      sorte: "defi",
      question: `Cette année, la prime de fin d'année de Karim augmente de 45 €.<br>Cela fait une hausse de 6 %.<br><br><b>Combien vaut sa nouvelle prime</b> ?`,
      reponse: `6 % de l'ancienne prime = 45 €, donc ancienne prime = 45 ÷ 0,06 = 750 €.<br>Nouvelle prime : 750 + 45 = <span class="big">795 €</span>.`,
      consigne: "Une prime augmente de 45 €, soit 6 %. Combien vaut la nouvelle prime ?",
      verification: { type: "courte", attendus: ["795"], unite: "€" },
      dessin: prime,
    },
  ],
};

export default problemes;
