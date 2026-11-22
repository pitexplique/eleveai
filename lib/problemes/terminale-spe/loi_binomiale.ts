// Énigmes à projeter — terminale spé maths, notion loi_binomiale
// (le club de tir à l'arc, la fabrique de stylos, les tortues de Kélonia (974),
// les jouets des paquets de céréales, piège de la famille de quatre enfants,
// défi du photographe et du léopard des neiges). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o, ell } from "../dessins-ecole";
import { frac } from "../outils";

const archer = svg("Une cible de tir à l'arc : l'archer tire 5 flèches indépendantes, chacune touche la cible avec une probabilité 0,8",
  o(240, 140, 90, C.bleu, 0.1, 4) + o(240, 140, 60, C.rose, 0.15, 4) + o(240, 140, 30, C.jaune, 0.35, 4) +
    l(395, 55, 262, 128, C.craie, 4) + l(395, 55, 410, 48, C.pale, 6) +
    t(240, 270, "5 flèches indépendantes", C.craie, 24) + t(240, 310, "dans la cible : 0,8 à chaque fois", C.bleu, 22) +
    t(240, 385, `la loi de X${NB}?`, C.rose, 28));

const stylos = svg("Trois stylos d'un même lot ; chacun est défectueux avec une probabilité 0,1, indépendamment des autres",
  [60, 115, 170].map((y) => r(100, y, 250, 28, C.bleu, 0.2, 3, 6) + p(`M350 ${y} L388 ${y + 14} L350 ${y + 28} Z`, C.bleu, 3, 0.4)).join("") +
    t(240, 255, "lot de 3 stylos", C.craie, 24) + t(240, 295, "défectueux : 10 % (indépendants)", C.bleu, 22) +
    t(240, 385, `P(X = 1)${NB}?`, C.rose, 28));

const tortues = svg("Un nid de 100 œufs de tortue verte ; chaque œuf éclot avec une probabilité 0,8, indépendamment des autres",
  [120, 180, 240, 300, 360].map((x) => ell(x, 80, 18, 22, C.craie, 0.08, 3) + ell(x, 140, 18, 22, C.craie, 0.08, 3)).join("") +
    t(240, 215, "100 œufs · éclosion : 0,8", C.bleu, 24) + t(240, 255, "(œufs indépendants)", C.pale, 20) +
    t(240, 300, "X = nombre de bébés tortues", C.craie, 22) + t(240, 385, `σ(X)${NB}?`, C.rose, 28));

const cereales = (() => {
  const pr = [0.4096, 0.4096, 0.1536, 0.0256, 0.0016], val = ["0,41", "0,41", "0,15", "0,03", "0,002"];
  let s = l(50, 290, 450, 290, C.craie, 3);
  pr.forEach((v, k) => {
    const x = 100 + 80 * k, h = Math.max(2, +(v * 450).toFixed(1));
    s += r(x - 25, 290 - h, 50, h, k ? C.bleu : C.rose, 0.35, 3) + t(x, 280 - h, val[k], k ? C.bleu : C.rose, 17) + t(x, 318, k, C.pale, 18);
  });
  return svg("Diagramme de la loi binomiale de paramètres 4 et 0,2 : P(X = 0) = 0,41, P(X = 1) = 0,41, P(X = 2) = 0,15, P(X = 3) = 0,03, P(X = 4) = 0,002 ; la barre de 0 est en rose",
    s + t(240, 45, "X suit B(4 ; 0,2)", C.craie, 24) + t(240, 385, `P(X ≥ 1)${NB}?`, C.rose, 28));
})();

const famille = svg("Quatre enfants, chacun fille ou garçon avec une probabilité 1/2 ; Léo dit que P(2 filles) = (1/2) puissance 4 = 1/16",
  [120, 200, 280, 360].map((x) => o(x, 85, 28, C.jaune, 0.2, 3) + t(x, 95, "?", C.jaune, 28)).join("") +
    t(240, 170, "chaque enfant : fille avec 1/2", C.craie, 22) +
    t(240, 235, "Léo : « P(2 filles) = (1/2)⁴ »", C.bleu, 22) + t(240, 270, "« = 1/16 »", C.bleu, 22) +
    t(240, 375, `P(2 filles et 2 garçons)${NB}?`, C.rose, 26));

const leopard = svg("Des montagnes : chaque jour, le photographe a 10 % de chances de voir le léopard des neiges ; il veut au moins 99 % de chances de le voir au moins une fois",
  p("M40 200 L140 90 L210 160 L300 60 L440 200 Z", C.pale, 3, 0.15) + p("M275 85 L300 60 L325 85", C.craie, 3) +
    t(240, 250, "chaque jour : 10 % de chances", C.bleu, 22) + t(240, 285, "(jours indépendants)", C.pale, 20) +
    t(240, 325, "P(au moins une fois) ≥ 0,99", C.craie, 22) + t(240, 390, `n minimal${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "loi_binomiale",
  titre: "Énigmes de la loi binomiale",
  description: "Le club de tir à l'arc, la fabrique de stylos, les tortues de Kélonia, les jouets des paquets de céréales, le piège de la famille de quatre enfants, le défi du léopard des neiges : schéma de Bernoulli, P(X = k), espérance et écart-type, au moins un succès, seuil.",
  problemes: [
    {
      tag: "Énigme 1 · Le club de tir à l'arc",
      titre: "Reconnaître une loi binomiale",
      question: `Au club de tir à l'arc, Maya touche la cible avec une probabilité 0,8. Elle tire 5 flèches, de façon indépendante. X est le nombre de flèches dans la cible.<br><br><b>Quelle est la loi de X</b> ?`,
      reponse: `On répète 5 fois, de façon indépendante, la même épreuve à deux issues (succès : « dans la cible », p = 0,8).<br>X compte les succès : X suit <span class="big">B(5 ; 0,8)</span> (n = 5 essais, p = 0,8).`,
      consigne: "5 tirs indépendants, succès avec p = 0,8, X = le nombre de succès : quelle est la loi de X ?",
      verification: { type: "qcm", choix: ["B(5 ; 0,8)", "B(0,8 ; 5)", "B(5 ; 0,2)"], bonne: 0 },
      dessin: archer,
    },
    {
      tag: "Énigme 2 · La fabrique de stylos",
      titre: "Calculer P(X = k)",
      question: `Dans une fabrique, chaque stylo est défectueux avec une probabilité 0,1, indépendamment des autres. On prend un lot de 3 stylos.<br><br><b>Quelle est la probabilité qu'un seul soit défectueux</b> ?`,
      reponse: `X suit B(3 ; 0,1). P(X = 1) = « 1 parmi 3 » × 0,1 × 0,9² = 3 × 0,1 × 0,81.<br>P(X = 1) = <span class="big">0,243</span> : le défectueux peut être le 1<sup>er</sup>, le 2<sup>e</sup> ou le 3<sup>e</sup>.`,
      consigne: "X suit B(3 ; 0,1) : que vaut P(X = 1) ?",
      verification: { type: "courte", attendus: ["0,243", "0.243", "24,3%"] },
      dessin: stylos,
    },
    {
      tag: "Énigme 3 · Les tortues de Kélonia",
      titre: "Espérance et écart-type",
      question: `À Kélonia, à Saint-Leu, on suit un nid de 100 œufs de tortue verte. On suppose que chaque œuf éclot avec une probabilité 0,8, indépendamment des autres. X est le nombre de bébés tortues.<br><br><b>Que vaut l'écart-type σ(X)</b> ?`,
      reponse: `X suit B(100 ; 0,8). E(X) = np = 80 et V(X) = np(1 − p) = 100 × 0,8 × 0,2 = 16.<br>σ(X) = √16 = <span class="big">4</span> : on attend environ 80 bébés tortues, à 4 près en moyenne.`,
      consigne: "X suit B(100 ; 0,8) : que vaut σ(X) ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: tortues,
    },
    {
      tag: "Énigme 4 · Les jouets des céréales",
      titre: "Au moins un succès",
      question: `Un paquet de céréales contient un jouet rare avec une probabilité 0,2. Nora achète 4 paquets (indépendants).<br><br><b>Quelle est la probabilité qu'elle ait au moins un jouet rare</b> ?`,
      reponse: `X suit B(4 ; 0,2). « Au moins un » est le contraire de « aucun » : P(X ≥ 1) = 1 − P(X = 0) = 1 − 0,8⁴.<br>0,8⁴ = 0,4096, donc P(X ≥ 1) = <span class="big">0,5904</span>.`,
      consigne: "X suit B(4 ; 0,2) : que vaut P(X ≥ 1) ?",
      verification: { type: "qcm", choix: ["0,8", "0,5904", "0,4096"], bonne: 1 },
      dessin: cereales,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La famille de quatre enfants",
      sorte: "piege",
      question: `Une famille a 4 enfants. On suppose que chaque enfant est une fille avec une probabilité ${frac(1, 2)}, indépendamment des autres.<br>Léo : « P(2 filles et 2 garçons) = (${frac(1, 2)})⁴ = ${frac(1, 16)}. »<br><br><b>Que vaut cette probabilité</b> ?`,
      reponse: `(${frac(1, 2)})⁴ est la probabilité d'UN seul ordre, par exemple FFGG. Il y a « 2 parmi 4 » = 6 ordres (FFGG, FGFG, FGGF, GFFG, GFGF, GGFF).<br>P(X = 2) = 6 × ${frac(1, 16)} = <span class="big">${frac(3, 8)}</span> = 0,375.`,
      consigne: "X suit B(4 ; 1/2) : que vaut P(X = 2) ?",
      verification: { type: "qcm", choix: ["1/16", "1/2", "3/8"], bonne: 2 },
      dessin: famille,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le léopard des neiges",
      sorte: "defi",
      question: `Un photographe guette le léopard des neiges. Chaque jour, il a 10 % de chances de le voir, indépendamment des autres jours.<br><br><b>Combien de jours au minimum</b> doit-il rester pour avoir au moins 99 % de chances de le voir au moins une fois ?`,
      reponse: `En n jours : P(au moins une fois) = 1 − 0,9<sup>n</sup>. On veut 1 − 0,9<sup>n</sup> ≥ 0,99, soit 0,9<sup>n</sup> ≤ 0,01.<br>n ≥ ${frac("ln 0,01", "ln 0,9")} ≈ 43,7 (on divise par ln 0,9, qui est négatif : le sens change). Donc <span class="big">n = 44 jours</span> (0,9<sup>43</sup> ≈ 0,0108 et 0,9<sup>44</sup> ≈ 0,0097).`,
      consigne: "Chaque jour : 10 % de chances. Combien de jours au minimum pour P(au moins une fois) ≥ 0,99 ?",
      verification: { type: "courte", attendus: ["44"], unite: "jours" },
      dessin: leopard,
    },
  ],
};

export default problemes;
