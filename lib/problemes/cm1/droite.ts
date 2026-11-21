// Énigmes à projeter — CM1, notion droites (les poteaux alignés, les routes des
// trois villages, les lignes du cahier, les côtés du mouchoir, le piège des
// extrémités de la droite, le défi des trois droites). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o } from "../dessins-ecole";

// Quatre poteaux : A, B, D alignés sur y = 300 − 0,5 (x − 60) ; C bien en dessous.
const yAl = (x: number) => 300 - 0.5 * (x - 60);
const poteaux = svg(
  "Quatre poteaux A, B, C, D ; trois sont alignés",
  [["A", 60, yAl(60)], ["B", 180, yAl(180)], ["C", 290, 290], ["D", 400, yAl(400)]].map(([n, x, y]) =>
    o(x as number, y as number, 9, C.bleu, 1, 2) + t(x as number, (y as number) + 40, n as string, C.craie, 28)).join("") +
    t(240, 390, `Lequel n'est pas aligné${NB}?`, C.rose, 26)
);

const villages = svg(
  "Trois villages, chacun relié aux deux autres par une route droite",
  o(100, 300, 12, C.jaune, 1, 3) + o(380, 300, 12, C.jaune, 1, 3) + o(240, 90, 12, C.jaune, 1, 3) +
    t(100, 345, "🏠", C.craie, 30) + t(380, 345, "🏠", C.craie, 30) + t(240, 60, "🏠", C.craie, 30) +
    l(100, 300, 380, 300, C.pale, 2, "8 8") + t(240, 390, `Combien de routes${NB}?`, C.rose, 26)
);

const lignes = svg(
  "Les lignes d'un cahier",
  r(90, 60, 300, 260, C.craie, 0.04, 3, 4) + [100, 140, 180, 220, 260, 300].map((y) => l(100, y, 380, y, C.bleu, 3)).join("") +
    l(140, 60, 140, 320, C.rose, 3) + t(240, 380, `Les lignes bleues sont${NB}…`, C.rose, 26)
);

const mouchoir = svg(
  "Un mouchoir carré",
  r(130, 70, 220, 220, C.rose, 0.15, 5, 2) + r(150, 90, 180, 180, C.rose, 0, 2) + t(240, 195, "🌸", C.craie, 40) +
    t(240, 360, `Paires de côtés parallèles${NB}?`, C.rose, 26)
);

const segment = svg(
  "Un segment et une droite",
  l(80, 130, 280, 130, C.bleu, 5) + o(80, 130, 7, C.bleu, 1, 2) + o(280, 130, 7, C.bleu, 1, 2) + t(330, 140, "segment", C.craie, 24, "start") +
    l(20, 250, 460, 250, C.rose, 5) + t(240, 230, "droite", C.craie, 24) + t(30, 290, "…", C.rose, 28) + t(450, 290, "…", C.rose, 28) +
    t(240, 370, `Combien d'extrémités pour la droite${NB}?`, C.rose, 22)
);

const trois = svg(
  "Des droites qui se croisent",
  l(40, 300, 440, 120, C.bleu, 4) + l(40, 120, 440, 300, C.rose, 4) + o(240, 210, 8, C.craie, 1, 2) +
    t(240, 70, "2 droites : 1 croisement", C.craie, 24) + t(240, 380, `3 droites${NB}: combien au plus${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "droite",
  titre: "Énigmes sur les droites",
  description: "Les poteaux alignés, les routes des trois villages, les lignes du cahier, les côtés du mouchoir, le piège des extrémités de la droite, le défi des trois droites.",
  problemes: [
    {
      tag: "Énigme 1 · La clôture",
      titre: "Les poteaux alignés",
      question: `On veut planter une clôture bien droite.<br>Trois poteaux sont <b>alignés</b>, un ne l'est pas.<br><br><b>Lequel</b> n'est pas aligné ?`,
      reponse: `Avec la règle, A, B et D sont sur la même droite.<br>Le poteau qui dépasse : <span class="big">C</span>.`,
      consigne: "Quel poteau n'est pas aligné avec les autres ?",
      verification: { type: "qcm", choix: ["A", "B", "C"], bonne: 2 },
      dessin: poteaux,
    },
    {
      tag: "Énigme 2 · Les trois villages",
      titre: "Les routes",
      question: `Il y a <b>3 villages</b>.<br>Chaque village est relié à chacun des autres par une route droite.<br><br><b>Combien de routes</b> ?`,
      reponse: `On trace les segments : un en bas, deux sur les côtés.<br>Les routes forment un triangle : <span class="big">3 routes</span>.`,
      consigne: "Combien de routes relient les 3 villages ?",
      verification: { type: "courte", attendus: ["3"], unite: "routes" },
      dessin: villages,
    },
    {
      tag: "Énigme 3 · Le cahier",
      titre: "Les lignes du cahier",
      question: `Les lignes bleues du cahier ne se croisent jamais.<br>Elles restent toujours au même écart.<br><br>Ces droites sont…`,
      reponse: `Des droites qui ne se coupent jamais, à écart constant :<br>elles sont <span class="big">parallèles</span>.`,
      consigne: "Les lignes bleues du cahier sont…",
      verification: { type: "qcm", choix: ["perpendiculaires", "parallèles", "sécantes"], bonne: 1 },
      dessin: lignes,
    },
    {
      tag: "Énigme 4 · Le mouchoir",
      titre: "Les côtés du carré",
      question: `Le mouchoir est un <b>carré</b>.<br><br>Combien de <b>paires de côtés parallèles</b> a-t-il ?`,
      reponse: `Le haut est parallèle au bas.<br>La gauche est parallèle à la droite.<br><span class="big">2 paires</span>.`,
      consigne: "Combien de paires de côtés parallèles a le carré ?",
      verification: { type: "courte", attendus: ["2"], unite: "paires" },
      dessin: mouchoir,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Segment ou droite ?",
      sorte: "piege",
      question: `Un <b>segment</b> a 2 extrémités.<br><br>Combien d'<b>extrémités</b> a une <b>droite</b> ?`,
      reponse: `Le piège : on la dessine avec un début et une fin.<br>Mais une droite continue sans fin, des deux côtés !<br><span class="big">Aucune</span> extrémité.`,
      consigne: "Combien d'extrémités a une droite ?",
      verification: { type: "qcm", choix: ["2", "1", "aucune"], bonne: 2 },
      dessin: segment,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les trois droites",
      sorte: "defi",
      question: `Deux droites qui se coupent font <b>1</b> croisement.<br>On trace une <b>3e droite</b>.<br><br>Combien de croisements, <b>au plus</b> ?`,
      reponse: `La 3e droite peut couper chacune des deux autres.<br>Et éviter le premier croisement.<br>1 + 2 = <span class="big">3 croisements</span>.`,
      consigne: "Combien de croisements au plus avec 3 droites ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: trois,
    },
  ],
};

export default problemes;
