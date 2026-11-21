// Énigmes à projeter — CE1, notion instructions et déplacements codés (la
// coccinelle qui suit le code, le chien vers son os, les étapes du brossage
// de dents, la danse codée, le piège de la voiture qui avance de 3 cases, le
// défi de la flèche manquante). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, grille } from "../dessins-ecole";

// Quadrillage 4 × 3 de carreaux de 70 px, coin haut gauche (100, 40) ; case (c, l) : c = 0 → 3 vers la droite, l = 0 → 2 vers le bas.
const X0 = 100, Y0 = 40, PAS = 70;
const em = (c: number, li: number, e: string, taille = 42) => t(X0 + (c + 0.5) * PAS, Y0 + (li + 0.5) * PAS + 15, e, C.craie, taille);
const plan = (corps: string) => grille(X0, Y0, 4, 3, PAS, C.pale, 2) + corps;

const coccinelle = svg(
  "Quadrillage : la coccinelle en haut à gauche ; une feuille, une fleur, une pomme ; code : → → ↓",
  plan(em(0, 0, "🐞") + em(2, 1, "🍃") + em(1, 1, "🌼") + em(3, 0, "🍎")) +
    t(240, 300, `Code${NB}: → → ↓`, C.jaune, 32) + t(240, 375, `Où arrive la coccinelle${NB}?`, C.rose, 28)
);

const chien = svg(
  "Quadrillage : le chien en bas à gauche, l'os en bas à droite, même ligne",
  plan(em(0, 2, "🐕") + em(3, 2, "🦴")) + t(240, 300, "Le chien va tout droit vers la droite.", C.pale, 22) +
    t(240, 375, `Combien de flèches →${NB}?`, C.rose, 28)
);

const etape = (x: number, e: string, txt: string, n: string) => t(x, 140, e, C.craie, 60) + t(x, 200, txt, C.craie, 20) + t(x, 80, n, C.jaune, 26);
const dents = svg(
  "Trois étapes en désordre : rincer, mettre le dentifrice, brosser",
  etape(100, "🚰", "rincer", "") + etape(240, "🪥", "mettre le dentifrice", "") + etape(380, "😁", "brosser", "") +
    t(240, 300, "1re · 2e · 3e ?", C.pale, 24) + t(240, 370, `Quelle étape en 2e${NB}?`, C.rose, 28)
);

const danse = svg(
  "Une danse codée : clap, pas, clap, pas, clap, pas, ?",
  ["👏", "👣", "👏", "👣", "👏", "👣", "?"].map((e, i) => t(50 + i * 64, 180, e, e === "?" ? C.rose : C.craie, 44) + t(50 + i * 64, 230, i + 1, C.pale, 20)).join("") +
    t(240, 340, `Le 7e geste${NB}?`, C.rose, 30)
);

const voiture = svg(
  "Une route de cases numérotées 1 à 6 ; la voiture est sur la case 1",
  grille(30, 140, 6, 1, 70, C.pale, 2) + [1, 2, 3, 4, 5, 6].map((n) => t(65 + (n - 1) * 70, 125, n, C.bleu, 22)).join("") + t(65, 192, "🚗", C.craie, 40) +
    t(240, 300, "La voiture avance de 3 cases.", C.craie, 24) + t(240, 370, `Sur quelle case arrive-t-elle${NB}?`, C.rose, 26)
);

const maison = svg(
  "Quadrillage : le chat en bas à gauche, la maison 2 cases à droite et 1 case plus haut ; code : → ? ↑",
  plan(em(0, 2, "🐈") + em(2, 1, "🏠")) + t(240, 300, `Code${NB}: →  ?  ↑`, C.jaune, 32) +
    t(240, 375, `La flèche qui manque${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "algorithmique",
  titre: "Énigmes sur les instructions et déplacements codés",
  description: "La coccinelle qui suit le code, le chien qui va vers son os, les étapes du brossage de dents, la danse codée, le piège de la voiture qui avance de 3 cases, le défi de la flèche manquante.",
  problemes: [
    {
      tag: "Énigme 1 · Le jardin",
      titre: "La coccinelle",
      question: `La coccinelle suit le code.<br><b>→ → ↓</b><br>Une flèche = une case.<br><br>Où arrive-t-elle ?`,
      reponse: `→ : 1 case à droite. → : encore 1.<br>↓ : 1 case vers le bas.<br>Elle arrive sur <span class="big">la feuille</span>.`,
      consigne: "Sur quoi arrive la coccinelle ?",
      verification: { type: "qcm", choix: ["La feuille", "La fleur", "La pomme"], bonne: 0 },
      dessin: coccinelle,
    },
    {
      tag: "Énigme 2 · Le chien",
      titre: "L'os",
      question: `Le chien veut son os.<br>Il va tout droit vers la droite.<br><br>Combien de flèches <b>→</b> ?`,
      reponse: `On compte les cases à traverser : 1, 2, 3.<br>Le code : → → →.<br><span class="big">3 flèches</span>.`,
      consigne: "Combien de flèches → pour aller à l'os ?",
      verification: { type: "courte", attendus: ["3"], unite: "flèches" },
      dessin: chien,
    },
    {
      tag: "Énigme 3 · La salle de bain",
      titre: "Se brosser les dents",
      question: `Les étapes sont en désordre.<br>On les remet dans l'ordre.<br><br>Quelle étape vient en <b>2<sup>e</sup></b> ?`,
      reponse: `1<sup>re</sup> : mettre le dentifrice.<br>2<sup>e</sup> : <span class="big">brosser</span>.<br>3<sup>e</sup> : rincer.`,
      consigne: "Quelle étape vient en 2e ?",
      verification: { type: "qcm", choix: ["Rincer", "Brosser", "Mettre le dentifrice"], bonne: 1 },
      dessin: dents,
    },
    {
      tag: "Énigme 4 · La danse",
      titre: "La danse codée",
      question: `La danse : <b>clap, pas, clap, pas…</b><br><br>Quel est le <b>7<sup>e</sup></b> geste ?`,
      reponse: `Clap aux places 1, 3, 5, 7.<br>Pas aux places 2, 4, 6.<br>Le 7<sup>e</sup> : <span class="big">clap</span> 👏.`,
      consigne: "Quel est le 7e geste ?",
      verification: { type: "qcm", choix: ["Clap", "Pas", "On ne peut pas savoir"], bonne: 0 },
      dessin: danse,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La voiture",
      sorte: "piege",
      question: `La voiture est sur la case <b>1</b>.<br>Elle avance de <b>3 cases</b>.<br><br>Sur quelle case arrive-t-elle ?`,
      reponse: `Le piège : compter la case de départ et dire 3.<br>On compte les sauts : 2, 3, 4.<br>Elle arrive sur la <span class="big">case 4</span>.`,
      consigne: "Sur quelle case arrive la voiture ?",
      verification: { type: "qcm", choix: ["Case 3", "Case 5", "Case 4"], bonne: 2 },
      dessin: voiture,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La flèche manquante",
      sorte: "defi",
      question: `Le chat rentre à la maison.<br>Code : <b>→ ? ↑</b><br><br>Quelle flèche manque ?`,
      reponse: `La maison est 2 cases à droite et 1 case en haut.<br>Il faut → → ↑.<br>La flèche qui manque : <span class="big">→</span>.`,
      consigne: "Quelle flèche manque dans le code ?",
      verification: { type: "qcm", choix: ["→", "↑", "←"], bonne: 0 },
      dessin: maison,
    },
  ],
};

export default problemes;
