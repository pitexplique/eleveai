// Énigmes à projeter — seconde, notion fonctions_affines_2de (la salle des
// fêtes, le plombier, le réservoir de la moto, la pente lue sur le graphique,
// piège « 3x est-elle affine ? », défi de la course-poursuite). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";
import { repere } from "../dessins-2de";
import { frac } from "../outils";

const salle = svg(
  "Une salle des fêtes : 150 euros plus 12 euros par invité",
  p("M90 170 L240 80 L390 170", C.jaune, 5) + r(110, 170, 260, 150, C.jaune, 0.15, 4) + r(215, 240, 50, 80, C.craie, 0.2, 3) +
    t(240, 215, "150 € + 12 € / invité", C.craie, 22) + t(240, 380, `40 invités${NB}: combien${NB}?`, C.rose, 26)
);

const plombier = svg(
  "Deux factures de plombier : 70 euros pour 1 heure, 110 euros pour 3 heures",
  r(50, 80, 170, 150, C.craie, 0.06, 3, 8) + t(135, 130, "1 h", C.craie, 26) + t(135, 190, "70 €", C.bleu, 34) +
    r(260, 80, 170, 150, C.craie, 0.06, 3, 8) + t(345, 130, "3 h", C.craie, 26) + t(345, 190, "110 €", C.bleu, 34) + t(240, 320, `quelle fonction affine${NB}?`, C.rose, 26)
);

const moto = (() => {
  const R = repere(0, 18, 0, 9, { gl: 340, gh: 270, gy: 40, gx: 80, pas: 2, pasE: 4 });
  return svg("La droite du carburant restant L de t égale 8 moins 0,5 t",
    R.fond + R.courbe((x) => 8 - 0.5 * x, 0, 16, C.bleu, 5) + t(R.X(8), R.Y(7.2), "L(t) = 8 − 0,5t", C.bleu, 22, "start") +
      t(R.X(18), R.Y(0) + 46, "t (h)", C.pale, 16, "end") + t(R.X(0) + 8, R.Y(9) + 4, "litres", C.pale, 16, "start") + t(240, 400, `croissante${NB}?`, C.rose, 24));
})();

const pente = (() => {
  const R = repere(0, 6, 0, 6, { gl: 300, gh: 300, gy: 30, gx: 90 });
  return svg("Une droite qui passe par les points de coordonnées 0 et 2, et 4 et 4",
    R.fond + R.courbe((x) => 0.5 * x + 2, 0, 6, C.bleu, 5) + R.point(0, 2, C.jaune, 9) + R.point(4, 4, C.jaune, 9) +
      l(R.X(0), R.Y(2), R.X(4), R.Y(2), C.rose, 3, "8 6") + l(R.X(4), R.Y(2), R.X(4), R.Y(4), C.rose, 3, "8 6") + t(240, 400, `coefficient directeur${NB}?`, C.rose, 24));
})();

const piege = svg(
  "Au tableau : f de x égale 3x",
  t(240, 160, "f(x) = 3x", C.bleu, 64) + t(240, 260, "f(x) = ax + b", C.craie, 30) + t(240, 340, `affine${NB}?`, C.rose, 32)
);

const course = svg(
  "Ana part à 8 kilomètres par heure, Ben part 10 minutes plus tard à 12 kilomètres par heure",
  l(40, 300, 440, 300, C.craie, 4) + o(240, 250, 18, C.jaune, 0.5, 3) + p("M240 268 l0 30", C.jaune, 4) + t(240, 210, "Ana 8 km/h", C.jaune, 22) +
    o(70, 250, 18, C.bleu, 0.5, 3) + p("M70 268 l0 30", C.bleu, 4) + t(70, 210, "Ben 12 km/h", C.bleu, 20) +
    t(240, 110, "Ben part 10 min après", C.craie, 24) + t(240, 370, `il la rattrape à quelle distance${NB}?`, C.rose, 22)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "fonctions_affines_2de",
  titre: "Énigmes des fonctions affines",
  description: "La salle des fêtes, le plombier, le réservoir de la moto, la pente lue sur le graphique, le piège « 3x est-elle affine ? », le défi de la course-poursuite : coefficient directeur, ordonnée à l'origine, sens de variation.",
  problemes: [
    {
      tag: "Énigme 1 · La salle des fêtes",
      titre: "40 invités",
      question: `Louer la salle des fêtes coûte <b>150 €</b>, plus <b>12 €</b> par invité : f(x) = 12x + 150.<br><br><b>Combien</b> coûte la fête pour 40 invités ?`,
      reponse: `f(40) = 12 × 40 + 150 = 480 + 150 = <span class="big">630 €</span>.`,
      consigne: "Combien coûte la fête pour 40 invités, en euros ?",
      verification: { type: "courte", attendus: ["630"], unite: "€" },
      dessin: salle,
    },
    {
      tag: "Énigme 2 · Le plombier",
      titre: "Deux factures",
      question: `Un plombier facture selon une fonction affine du temps : <b>70 €</b> pour 1 h, <b>110 €</b> pour 3 h.<br><br><b>Quelle est cette fonction</b> ?`,
      reponse: `a = (110 − 70) ÷ (3 − 1) = 40 ÷ 2 = 20 € par heure.<br>b = 70 − 20 × 1 = 50 € (le déplacement).<br><span class="big">f(x) = 20x + 50</span>. Vérif : 20 × 3 + 50 = 110 ✓.`,
      consigne: "Quelle est la fonction affine du plombier ?",
      verification: { type: "qcm", choix: ["f(x) = 20x + 50", "f(x) = 40x + 30", "f(x) = 70x"], bonne: 0 },
      dessin: plombier,
    },
    {
      tag: "Énigme 3 · Le réservoir",
      titre: "La moto roule",
      question: `Le réservoir d'une moto contient <b>L(t) = 8 − 0,5t</b> litres après t heures de route.<br><br>La fonction L est-elle croissante, décroissante ou constante ?`,
      reponse: `Le coefficient directeur vaut <b>−0,5</b>, il est négatif.<br>L est <span class="big">décroissante</span> : on perd 0,5 L par heure. Le réservoir est vide au bout de 16 h.`,
      consigne: "L(t) = 8 − 0,5t est-elle croissante, décroissante ou constante ?",
      verification: { type: "qcm", choix: ["croissante", "décroissante", "constante"], bonne: 1 },
      dessin: moto,
    },
    {
      tag: "Énigme 4 · La pente",
      titre: "Lire sur le graphique",
      question: `La droite passe par <b>(0 ; 2)</b> et <b>(4 ; 4)</b>.<br><br><b>Quel est son coefficient directeur</b> ?`,
      reponse: `On avance de 4 en x, on monte de 2 en y.<br>a = 2 ÷ 4 = <span class="big">0,5</span>.<br>La fonction est f(x) = 0,5x + 2.`,
      consigne: "Coefficient directeur de la droite passant par (0 ; 2) et (4 ; 4) ?",
      verification: { type: "courte", attendus: ["0,5", "0.5", "1/2"] },
      dessin: pente,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Affine ou pas ?",
      sorte: "piege",
      question: `La fonction <b>f(x) = 3x</b> est-elle une fonction affine ?<br>A. Non, il manque b B. Non, elle est linéaire C. Oui, avec b = 0`,
      reponse: `Affine : f(x) = ax + b. Ici a = 3 et b = 0.<br><span class="big">Oui</span> : une fonction linéaire est une fonction affine particulière, sa droite passe par l'origine.`,
      consigne: "f(x) = 3x est-elle affine ?",
      verification: { type: "qcm", choix: ["Non, il manque b", "Non, elle est linéaire", "Oui, avec b = 0"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La course-poursuite",
      sorte: "defi",
      question: `Ana part en courant à <b>8 km/h</b>. Ben part du même endroit <b>10 minutes plus tard</b>, à <b>12 km/h</b>.<br><br><b>À combien de km</b> du départ Ben rattrape-t-il Ana ?`,
      reponse: `10 min = ${frac(1, 6)} h. Après t heures (départ d'Ana) : Ana a fait 8t, Ben 12(t − ${frac(1, 6)}) = 12t − 2.<br>8t = 12t − 2 donne t = 0,5 h. Distance : 8 × 0,5 = <span class="big">4 km</span>.`,
      consigne: "À combien de km du départ Ben rattrape-t-il Ana ?",
      verification: { type: "courte", attendus: ["4"], unite: "km" },
      dessin: course,
    },
  ],
};

export default problemes;
