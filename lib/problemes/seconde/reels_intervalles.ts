// Énigmes à projeter — seconde, notion reels_intervalles (le frigo à vaccins,
// le manège, la zone de livraison, les deux cours de sport, piège du plus
// grand nombre de [0 ; 1[, défi du thermomètre de la piscine). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";

// Une droite graduée de v0 à v1 (px 50 → 430), avec un intervalle en couleur.
const X = (v: number, v0: number, v1: number) => 50 + ((v - v0) / (v1 - v0)) * 380;
const droite = (y: number, v0: number, v1: number, pas: number, ecrire = (v: number) => String(v)) => {
  let s = l(36, y, 450, y, C.craie, 3);
  for (let v = v0; v <= v1 + 1e-9; v += pas) s += l(X(v, v0, v1), y - 10, X(v, v0, v1), y + 10, C.craie, 2) + t(X(v, v0, v1), y + 36, ecrire(+v.toFixed(2)), C.pale, 20);
  return s;
};
// Un crochet : ouvert vers l'intérieur (fermé) ou vers l'extérieur (ouvert).
const crochet = (x: number, y: number, ferme: boolean, gauche: boolean, c: string) => {
  const s = (ferme ? 1 : -1) * (gauche ? 1 : -1) * 12;
  return p(`M${x + s} ${y - 22} L${x} ${y - 22} L${x} ${y + 22} L${x + s} ${y + 22}`, c, 5);
};
const zone = (y: number, a: number, b: number, v0: number, v1: number, fa: boolean, fb: boolean, c: string) =>
  l(X(a, v0, v1), y, X(b, v0, v1), y, c, 9) + crochet(X(a, v0, v1), y, fa, true, c) + crochet(X(b, v0, v1), y, fb, false, c);

const frigo = svg(
  "Un frigo à vaccins et une droite des températures de 0 à 10 degrés",
  r(170, 30, 140, 190, C.bleu, 0.12, 4, 12) + l(170, 95, 310, 95, C.bleu, 3) + l(290, 120, 290, 160, C.bleu, 5) +
    t(240, 70, "VACCINS", C.bleu, 20) + t(240, 190, "2 °C → 8 °C", C.craie, 22) +
    droite(300, 0, 10, 1) + t(240, 395, `quel intervalle${NB}?`, C.rose, 26)
);

const manege = svg(
  "La toise d'un manège : de 1,20 m compris à 1,95 m non compris",
  droite(230, 1.1, 2, 0.1, (v) => String(v).replace(".", ",")) + zone(230, 1.2, 1.95, 1.1, 2, true, false, C.bleu) +
    t(240, 110, "au moins 1,20 m", C.craie, 26) + t(240, 150, "et moins de 1,95 m", C.craie, 26) + t(240, 340, `combien peuvent monter${NB}?`, C.rose, 26)
);

const livraison = svg(
  "Une route graduée en kilomètres, le dépôt au kilomètre 3, livraison à 2 km au plus",
  droite(250, -1, 7, 1, (v) => String(v).replace("-", "−")) + zone(250, 1, 5, -1, 7, true, true, C.jaune) +
    r(X(3, -1, 7) - 30, 140, 60, 50, C.rose, 0.2, 3, 4) + t(X(3, -1, 7), 125, "dépôt", C.rose, 22) +
    t(240, 70, "|x − 3| ≤ 2", C.bleu, 40) + t(240, 350, "kilomètre de la route", C.pale, 20)
);

const sport = svg(
  "Deux intervalles d'âges : cours A de 8 à 15 ans, cours B de 13 à 18 ans",
  droite(270, 6, 20, 2) + zone(180, 8, 15, 6, 20, true, true, C.bleu) + t(X(11.5, 6, 20), 150, "cours A", C.bleu, 24) +
    zone(225, 13, 18, 6, 20, true, true, C.jaune) + t(X(17, 6, 20), 205, "cours B", C.jaune, 24) +
    t(240, 370, `les deux à la fois${NB}?`, C.rose, 28)
);

const piege = svg(
  "L'intervalle de 0 compris à 1 non compris, et des nombres qui s'approchent de 1",
  droite(220, 0, 1, 0.25, (v) => String(v).replace(".", ",")) + zone(220, 0, 1, 0, 1, true, false, C.bleu) +
    t(240, 110, "[0 ; 1[", C.bleu, 54) + t(240, 320, "0,9   0,99   0,999   …", C.craie, 26) + t(240, 380, `le plus grand${NB}?`, C.rose, 28)
);

const piscine = svg(
  "Un thermomètre de piscine qui affiche des degrés entiers, réglé sur 27 degrés",
  r(90, 40, 300, 150, C.bleu, 0.15, 4, 20) + p("M110 120 q30 -20 60 0 t60 0 t60 0 t60 0 t60 0", C.bleu, 3) +
    r(205, 70, 70, 100, C.craie, 0.85, 3, 10) + t(240, 135, "27°", C.jaune, 32) +
    o(400, 95, 16, C.rose, 0.6, 3) + t(400, 140, "alarme", C.rose, 16) +
    t(240, 270, "|T − 27| &lt; 3,5", C.craie, 40) + t(240, 350, `combien de valeurs${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "reels_intervalles",
  titre: "Énigmes des intervalles",
  description: "Le frigo à vaccins, la toise du manège, la zone de livraison, les deux cours de sport, le piège du plus grand nombre de [0 ; 1[, le défi du thermomètre de la piscine : écrire et lire des intervalles, la valeur absolue comme une distance.",
  problemes: [
    {
      tag: "Énigme 1 · Le frigo à vaccins",
      titre: "Entre 2 et 8 degrés",
      question: `Un vaccin se garde entre <b>2 °C et 8 °C</b>, ces deux températures comprises.<br><br><b>Quel intervalle</b> donne les températures permises ?`,
      reponse: `« Compris » : les bornes appartiennent à l'intervalle, les crochets sont tournés vers l'intérieur.<br>T ∈ <span class="big">[2 ; 8]</span>.<br>]2 ; 8[ refuserait 2 °C et 8 °C.`,
      consigne: "Quel intervalle donne les températures de 2 °C à 8 °C comprises ?",
      verification: { type: "qcm", choix: ["]2 ; 8[", "[2 ; 8]", "[2 ; 8["], bonne: 1 },
      dessin: frigo,
    },
    {
      tag: "Énigme 2 · Le manège",
      titre: "La toise",
      question: `Pour monter dans un manège, il faut mesurer <b>au moins 1,20 m</b> et <b>moins de 1,95 m</b>.<br>Cinq amis mesurent : 1,15 m ; 1,20 m ; 1,64 m ; 1,95 m ; 1,80 m.<br><br><b>Combien</b> peuvent monter ?`,
      reponse: `La taille doit être dans <b>[1,20 ; 1,95[</b> : 1,20 est compris, 1,95 ne l'est pas.<br>1,20 ✓ ; 1,64 ✓ ; 1,80 ✓ ; 1,15 ✗ ; 1,95 ✗.<br><span class="big">3 amis</span> peuvent monter.`,
      consigne: "Combien des cinq amis peuvent monter ?",
      verification: { type: "courte", attendus: ["3"], unite: "amis" },
      dessin: manege,
    },
    {
      tag: "Énigme 3 · La zone de livraison",
      titre: "À 2 km du dépôt",
      question: `Un dépôt est au kilomètre <b>3</b> d'une route. Le livreur ne va qu'aux points x tels que <b>|x − 3| ≤ 2</b>.<br><br><b>Quel intervalle</b> forment ces points ?`,
      reponse: `|x − 3| est la distance entre x et 3. Elle doit valoir 2 au plus.<br>On part de 3, on va 2 à gauche et 2 à droite : x ∈ <span class="big">[1 ; 5]</span>.`,
      consigne: "Quel intervalle forment les x tels que |x − 3| ≤ 2 ?",
      verification: { type: "qcm", choix: ["[1 ; 5]", "[−2 ; 2]", "[3 ; 5]"], bonne: 0 },
      dessin: livraison,
    },
    {
      tag: "Énigme 4 · Les deux cours",
      titre: "Le club de sport",
      question: `Le cours A accueille les âges de <b>[8 ; 15]</b>, le cours B ceux de <b>[13 ; 18]</b>.<br><br><b>Quels âges</b> peuvent suivre les deux cours ? Donne l'intervalle.`,
      reponse: `Il faut être dans A <b>et</b> dans B : c'est l'intersection [8 ; 15] ∩ [13 ; 18].<br>Sur la droite, les deux couleurs se chevauchent de 13 à 15 : <span class="big">[13 ; 15]</span>.`,
      consigne: "Quel intervalle donne [8 ; 15] ∩ [13 ; 18] ?",
      verification: { type: "courte", attendus: ["[13;15]", "[13,15]"] },
      dessin: sport,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le plus grand nombre",
      sorte: "piege",
      question: `<b>Quel est le plus grand nombre</b> de l'intervalle <b>[0 ; 1[</b> ?`,
      reponse: `1 n'en fait pas partie (crochet ouvert). Et 0,999 non plus n'est pas le plus grand : 0,9999 est plus grand, et ainsi de suite.<br>Entre un nombre et 1, il y a toujours un autre nombre.<br><span class="big">Il n'y en a pas.</span>`,
      consigne: "Quel est le plus grand nombre de [0 ; 1[ ?",
      verification: { type: "qcm", choix: ["0,999", "1", "Il n'y en a pas"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le thermomètre de la piscine",
      sorte: "defi",
      question: `Le thermomètre d'une piscine n'affiche que des <b>degrés entiers</b>. L'alarme reste éteinte tant que <b>|T − 27| < 3,5</b>.<br><br><b>Combien de valeurs affichées</b> gardent l'alarme éteinte ?`,
      reponse: `T doit être à moins de 3,5 de 27 : T ∈ ]23,5 ; 30,5[.<br>Les entiers de cet intervalle : 24, 25, 26, 27, 28, 29, 30.<br><span class="big">7 valeurs</span>.`,
      consigne: "Combien d'entiers T vérifient |T − 27| < 3,5 ?",
      verification: { type: "courte", attendus: ["7"], unite: "valeurs" },
      dessin: piscine,
    },
  ],
};

export default problemes;
