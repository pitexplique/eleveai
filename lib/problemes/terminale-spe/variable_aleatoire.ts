// Énigmes à projeter — terminale spé maths, notion variable_aleatoire
// (les dés du jeu de rôle, la tombola du lycée, l'attente au télésiège, le
// vendeur de churros, piège du chauffeur de VTC, défi de la fête foraine). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { frac } from "../outils";

const des = (() => {
  let s = t(120, 45, "+", C.pale, 24);
  for (let i = 1; i <= 4; i++) s += t(120 + 62 * i, 45, i, C.bleu, 24) + t(120, 45 + 56 * i, i, C.bleu, 24);
  for (let i = 1; i <= 4; i++)
    for (let j = 1; j <= 4; j++) {
      const x = 120 + 62 * j, y = 45 + 56 * i, cinq = i + j === 5;
      if (cinq) s += r(x - 26, y - 34, 52, 46, C.jaune, 0.35, 2, 8);
      s += t(x, y, i + j, cinq ? C.jaune : C.craie, 24);
    }
  return svg("Tableau des sommes de deux dés à 4 faces : 16 cases ; la somme 5 apparaît 4 fois, sur la diagonale",
    s + l(95, 62, 400, 62, C.pale, 2) + l(150, 20, 150, 290, C.pale, 2) + t(240, 380, `P(X = 5)${NB}?`, C.rose, 28));
})();

const tombola = svg("Loi du gain net à la tombola : 298 euros avec probabilité 1 sur 500, 18 euros avec 10 sur 500, moins 2 euros avec 489 sur 500",
  r(30, 70, 420, 150, C.craie, 0.04, 3, 8) + l(30, 145, 450, 145, C.craie, 2) + l(130, 70, 130, 220, C.craie, 2) +
    t(80, 117, "gain", C.pale, 20) + t(80, 192, "proba", C.pale, 20) +
    t(185, 117, "298 €", C.bleu, 22) + t(295, 117, "18 €", C.bleu, 22) + t(395, 117, "−2 €", C.bleu, 22) +
    t(185, 192, "1/500", C.craie, 22) + t(295, 192, "10/500", C.craie, 22) + t(395, 192, "489/500", C.craie, 22) +
    t(240, 290, "ticket : 2 €", C.jaune, 24) + t(240, 380, `E(gain net)${NB}?`, C.rose, 28));

const telesiege = svg("Loi de l'attente au télésiège : 0 minute avec probabilité 0,25, 10 minutes avec 0,5, 20 minutes avec 0,25 ; l'espérance vaut 10",
  r(30, 70, 420, 150, C.craie, 0.04, 3, 8) + l(30, 145, 450, 145, C.craie, 2) + l(150, 70, 150, 220, C.craie, 2) +
    t(90, 117, "attente", C.pale, 20) + t(90, 192, "proba", C.pale, 20) +
    t(210, 117, "0 min", C.bleu, 22) + t(310, 117, "10 min", C.bleu, 22) + t(400, 117, "20 min", C.bleu, 22) +
    t(210, 192, "0,25", C.craie, 22) + t(310, 192, "0,5", C.craie, 22) + t(400, 192, "0,25", C.craie, 22) +
    t(240, 290, "E(X) = 10 min", C.jaune, 24) + t(240, 380, `V(X)${NB}?`, C.rose, 28));

const churros = svg("Le vendeur de churros : le matin, espérance 40 et variance 25 ; l'après-midi, espérance 60 et variance 36 ; les deux sont indépendants",
  r(30, 50, 195, 160, C.bleu, 0.12, 3, 10) + r(255, 50, 195, 160, C.jaune, 0.12, 3, 10) +
    t(127, 90, "matin : X", C.bleu, 22) + t(127, 140, "E = 40", C.craie, 22) + t(127, 185, "V = 25", C.craie, 22) +
    t(352, 90, "après-midi : Y", C.jaune, 22) + t(352, 140, "E = 60", C.craie, 22) + t(352, 185, "V = 36", C.craie, 22) +
    t(240, 270, "X et Y indépendantes", C.pale, 20) + t(240, 370, `σ(X + Y)${NB}?`, C.rose, 28));

const vtc = svg("Le chauffeur de VTC : sa recette X a une variance de 900 ; la nuit, il double ses tarifs et sa recette devient 2X",
  t(240, 80, "le jour : recette X", C.bleu, 26) + t(240, 130, "V(X) = 900 · σ(X) = 30 €", C.craie, 24) +
    t(240, 210, "la nuit : recette 2X", C.jaune, 26) + t(240, 260, "Inès : « V(2X) = 1 800 »", C.craie, 24) +
    t(240, 370, `V(2X)${NB}?`, C.rose, 30));

const foraine = svg("Le stand de la fête foraine : on paie 1 euro, on lance un dé ; si on fait 6, on reçoit a euros, sinon rien",
  r(190, 50, 100, 100, C.craie, 0.08, 4, 14) +
    [[215, 75], [265, 75], [215, 100], [265, 100], [215, 125], [265, 125]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="${C.craie}"/>`).join("") +
    t(240, 200, "mise : 1 € (jamais rendue)", C.pale, 22) + t(240, 250, "un 6 : on reçoit a €", C.bleu, 26) + t(240, 290, "sinon : rien", C.bleu, 22) +
    t(240, 375, `jeu équitable : a =${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "variable_aleatoire",
  titre: "Énigmes des variables aléatoires",
  description: "Les dés du jeu de rôle, la tombola du lycée, l'attente au télésiège, le vendeur de churros, le piège du chauffeur de VTC, le défi de la fête foraine : loi, espérance, variance, somme de variables, V(aX), jeu équitable.",
  problemes: [
    {
      tag: "Énigme 1 · Les dés du jeu de rôle",
      titre: "La loi d'une variable aléatoire",
      question: `Dans un jeu de rôle, on lance deux dés équilibrés à 4 faces. X est la somme des deux faces.<br><br><b>Que vaut P(X = 5)</b> ?`,
      reponse: `Il y a 4 × 4 = 16 issues équiprobables. La somme 5 : (1 ; 4), (2 ; 3), (3 ; 2), (4 ; 1).<br>P(X = 5) = ${frac(4, 16)} = <span class="big">${frac(1, 4)}</span>.`,
      consigne: "Deux dés à 4 faces, X = la somme : que vaut P(X = 5) ?",
      verification: { type: "courte", attendus: ["1/4", "0,25", "0.25", "4/16", "25%"] },
      dessin: des,
    },
    {
      tag: "Énigme 2 · La tombola du lycée",
      titre: "Calculer une espérance",
      question: `Une tombola vend 500 tickets à 2 €. Il y a un lot de 300 € et dix lots de 20 €.<br><br><b>Quelle est l'espérance du gain net</b> d'un ticket ?`,
      reponse: `E = 298 × ${frac(1, 500)} + 18 × ${frac(10, 500)} − 2 × ${frac(489, 500)} = ${frac("298 + 180 − 978", 500)}.<br>E = <span class="big">−1 €</span> : en moyenne, on perd 1 € par ticket.`,
      consigne: "Gain net : 298 € (1/500), 18 € (10/500), −2 € (489/500). Que vaut E ?",
      verification: { type: "courte", attendus: ["-1", "−1"], unite: "€" },
      dessin: tombola,
    },
    {
      tag: "Énigme 3 · L'attente au télésiège",
      titre: "Calculer une variance",
      question: `L'attente X au télésiège vaut 0 min (probabilité 0,25), 10 min (0,5) ou 20 min (0,25). Son espérance est 10 min.<br><br><b>Que vaut V(X)</b> ?`,
      reponse: `V(X) = 0,25 × (0 − 10)² + 0,5 × (10 − 10)² + 0,25 × (20 − 10)² = 25 + 0 + 25.<br>V(X) = <span class="big">50</span> (min²), et σ(X) = √50 ≈ 7,1 min.`,
      consigne: "X = 0 (0,25), 10 (0,5), 20 (0,25), E(X) = 10 : que vaut V(X) ?",
      verification: { type: "courte", attendus: ["50"] },
      dessin: telesiege,
    },
    {
      tag: "Énigme 4 · Le vendeur de churros",
      titre: "La somme de deux variables",
      question: `Un vendeur de churros vend X cornets le matin (E = 40, V = 25) et Y l'après-midi (E = 60, V = 36). X et Y sont indépendantes.<br><br><b>Que vaut l'écart-type σ(X + Y)</b> ?`,
      reponse: `Les variances s'ajoutent (X et Y indépendantes), pas les écarts-types : V(X + Y) = 25 + 36 = 61.<br>σ(X + Y) = <span class="big">√61 ≈ 7,8</span> (et non 5 + 6 = 11).`,
      consigne: "V(X) = 25, V(Y) = 36, X et Y indépendantes : que vaut σ(X + Y) ?",
      verification: { type: "qcm", choix: ["√61 ≈ 7,8", "11", "61"], bonne: 0 },
      dessin: churros,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le chauffeur de VTC",
      sorte: "piege",
      question: `La recette X d'un chauffeur de VTC a une variance V(X) = 900. La nuit, il double ses tarifs : sa recette est 2X.<br>Inès : « V(2X) = 2 × 900 = 1 800. »<br><br><b>Que vaut V(2X)</b> ?`,
      reponse: `V(aX) = a² V(X) : la variance est faite de carrés d'écarts.<br>V(2X) = 4 × 900 = <span class="big">3 600</span> ; c'est l'écart-type qui double : σ(2X) = 60 €.`,
      consigne: "V(X) = 900 : que vaut V(2X) ?",
      verification: { type: "qcm", choix: ["1 800", "3 600", "900"], bonne: 1 },
      dessin: vtc,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La fête foraine",
      sorte: "defi",
      question: `À un stand de fête foraine, on paie 1 € pour lancer un dé. Si on fait 6, on reçoit a € ; sinon, rien. La mise n'est jamais rendue.<br><br><b>Pour quelle valeur de a</b> le jeu est-il équitable ?`,
      reponse: `Gain net : a − 1 (probabilité ${frac(1, 6)}) ou −1 (probabilité ${frac(5, 6)}). E = ${frac("a − 1", 6)} − ${frac(5, 6)} = ${frac("a", 6)} − 1.<br>E = 0 ⟺ <span class="big">a = 6 €</span> (et non 5 € : la mise est perdue aussi quand on gagne).`,
      consigne: "On paie 1 €, un 6 rapporte a €. Pour quel a le jeu est-il équitable ?",
      verification: { type: "qcm", choix: ["5 €", "1,20 €", "6 €"], bonne: 2 },
      dessin: foraine,
    },
  ],
};

export default problemes;
