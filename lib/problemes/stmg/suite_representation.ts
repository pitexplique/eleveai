// Énigmes à projeter — STMG (1re), notion représenter les termes d'une suite
// (les sapins de Noël, la boutique de vinyles, l'imprimeur, la location de
// vélos-cargos au tableur, piège de la tatoueuse, défi de la boutique en
// ligne de plantes d'intérieur). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const nuage = (R: ReturnType<typeof repereXY>, pts: number[], c: string = C.bleu) =>
  pts.map((v, n) => R.point(n, v, c, 8)).join("");

const R1 = repereXY(0, 4, 0, 200, { px: 1, py: 20, ey: 40 });
const sapins = svg("Les sapins de Noël : un nuage de 5 points (n ; u indice n) ; on lit l'ordonnée du point d'abscisse 3",
  R1.fond + nuage(R1, [60, 80, 120, 140, 180]) + R1.point(3, 140, C.rose, 9) +
    t(R1.X(0) + 8, 24, "sapins", C.pale, 17, "start") + t(462, R1.Y(0) - 10, "n", C.pale, 18, "end") +
    t(240, 400, `u₃${NB}=${NB}?`, C.rose, 28));

const cases = (titres: string[], vals: string[], y: number, c: string) => {
  let s = "";
  for (let k = 0; k < vals.length; k++) {
    const x = 120 + k * 80;
    s += r(x, y, 80, 60, c, 0.15, 2) + t(x + 40, y + 40, vals[k], C.craie, 24);
  }
  return r(40, y, 80, 60, c, 0.3, 2) + t(80, y + 40, titres[0], C.pale, 24) + s;
};
const vinyles = svg("La boutique de vinyles : n égale 0, 1, 2, 3 ; u indice n égale 50, 65, 80, 95 disques vendus ; quel point représente u indice 2 ?",
  t(240, 60, "disques vendus", C.pale, 24) + cases(["n"], ["0", "1", "2", "3"], 90, C.bleu) + cases(["uₙ"], ["50", "65", "80", "95"], 150, C.jaune) +
    r(280, 90, 80, 120, C.rose, 0, 4) + t(240, 330, `point de u₂${NB}: (${NB}?${NB};${NB}?${NB})`, C.rose, 28));

const R3 = repereXY(0, 4, 0, 120, { px: 1, py: 15, ey: 30 });
const imprimeur = svg("L'imprimeur : un nuage de 5 points alignés, 30, 45, 60, 75, 90 commandes",
  R3.fond + nuage(R3, [30, 45, 60, 75, 90]) +
    t(R3.X(0) + 8, 24, "commandes", C.pale, 17, "start") + t(462, R3.Y(0) - 10, "n", C.pale, 18, "end") +
    t(240, 400, `arithmétique ou géométrique${NB}?`, C.rose, 24));

const cel = (x: number, y: number, w: number, s: string, c: string, fond = 0.12, taille = 22) =>
  r(x, y, w, 56, c, fond, 2) + t(x + w / 2, y + 37, s, C.craie, taille);
const velos = svg("La location de vélos-cargos au tableur : colonne A, n ; colonne B, u indice n ; B2 égale 200 ; B3 égale B2 fois 1,1, recopiée vers le bas ; B4 ?",
  cel(60, 40, 60, "", C.pale, 0.3) + cel(120, 40, 90, "A", C.pale, 0.3) + cel(210, 40, 210, "B", C.pale, 0.3) +
    [1, 2, 3, 4].map((k) => cel(60, 40 + k * 56, 60, String(k), C.pale, 0.3)).join("") +
    cel(120, 96, 90, "n", C.bleu) + cel(210, 96, 210, "uₙ", C.bleu) +
    cel(120, 152, 90, "0", C.bleu) + cel(210, 152, 210, "200", C.bleu) +
    cel(120, 208, 90, "1", C.bleu) + cel(210, 208, 210, "=B2*1,1", C.jaune) +
    cel(120, 264, 90, "2", C.bleu) + cel(210, 264, 210, "?", C.rose, 0.2) +
    t(240, 380, `B4${NB}=${NB}?`, C.rose, 30));

const R5 = repereXY(0, 4, 0, 90, { px: 1, py: 10, ey: 20 });
const tatoueuse = svg("La tatoueuse : un nuage de 5 points qui monte de plus en plus vite, 16, 24, 36, 54, 81 clients",
  R5.fond + nuage(R5, [16, 24, 36, 54, 81]) +
    [16, 24, 36, 54, 81].map((v, n) => t(R5.X(n) + (n === 4 ? -14 : 14), R5.Y(v) - 12, v, C.jaune, 17, n === 4 ? "end" : "start")).join("") +
    t(R5.X(0) + 8, 24, "clients", C.pale, 17, "start") + t(462, R5.Y(0) - 10, "n", C.pale, 18, "end") +
    t(240, 400, "Camille : « arithmétique »", C.rose, 24));

const R6 = repereXY(0, 4, 0, 200, { px: 1, py: 20, ey: 40 });
const plantes = svg("La boutique en ligne de plantes d'intérieur : un nuage de 4 points alignés, 100, 120, 140, 160 commandes ; on cherche u indice 10",
  R6.fond + nuage(R6, [100, 120, 140, 160]) +
    t(R6.X(0) + 8, 24, "commandes", C.pale, 17, "start") + t(462, R6.Y(0) - 10, "n", C.pale, 18, "end") +
    t(240, 400, `u₁₀${NB}=${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "suite_representation",
  titre: "Énigmes pour représenter les termes d'une suite",
  description: "Les sapins de Noël, la boutique de vinyles, l'imprimeur, la location de vélos-cargos au tableur, le piège de la tatoueuse, le défi des plantes d'intérieur : lire un terme sur un nuage de points, placer un point (n ; uₙ), conjecturer la nature d'une suite, utiliser un tableur.",
  problemes: [
    {
      tag: "Énigme 1 · Les sapins de Noël",
      titre: "Lire un terme",
      question: `Un vendeur de sapins de Noël note ses ventes chaque semaine.<br>u<sub>n</sub> est le nombre de sapins vendus la semaine n.<br>Chaque point a pour coordonnées (n ; u<sub>n</sub>).<br><br><b>Combien vaut</b> u<sub>3</sub> ?`,
      reponse: `On prend le point d'abscisse 3.<br>On lit son ordonnée : 140.<br><span class="big">u<sub>3</sub> = 140 sapins</span>.`,
      consigne: "Lis u₃ sur le nuage de points.",
      verification: { type: "courte", attendus: ["140"] },
      dessin: sapins,
    },
    {
      tag: "Énigme 2 · La boutique de vinyles",
      titre: "Placer un point",
      question: `Une boutique de vinyles note ses ventes de disques.<br>Le tableau donne n et u<sub>n</sub>.<br>On veut tracer le nuage de points.<br><br><b>Quel point représente</b> u<sub>2</sub> ?`,
      reponse: `L'abscisse est le rang : n = 2.<br>L'ordonnée est le terme : u<sub>2</sub> = 80.<br><span class="big">Le point (2 ; 80)</span>.`,
      consigne: "Quel point représente u₂ ?",
      verification: { type: "qcm", choix: ["(2 ; 80)", "(80 ; 2)", "(3 ; 80)"], bonne: 0 },
      dessin: vinyles,
    },
    {
      tag: "Énigme 3 · L'imprimeur",
      titre: "Conjecturer la nature",
      question: `Un imprimeur compte ses commandes de cartes de visite, mois après mois.<br>Il trace le nuage de points (n ; u<sub>n</sub>).<br>Les points sont alignés.<br><br><b>Quelle suite peut-on conjecturer</b> ?`,
      reponse: `Des points alignés : on ajoute toujours le même nombre.<br>Ici, + 15 commandes par mois.<br><span class="big">Une suite arithmétique</span>.`,
      consigne: "Points alignés : quelle suite conjecturer ?",
      verification: { type: "qcm", choix: ["géométrique", "arithmétique", "ni l'une ni l'autre"], bonne: 1 },
      dessin: imprimeur,
    },
    {
      tag: "Énigme 4 · Les vélos-cargos",
      titre: "Le tableur",
      question: `Un loueur de vélos-cargos fait 200 locations le mois 0.<br>Chaque mois, ce nombre est multiplié par 1,1.<br>Dans la cellule B3, il tape =B2*1,1 et il recopie vers le bas.<br><br><b>Quel nombre s'affiche</b> en B4 ?`,
      reponse: `B3 = 200 × 1,1 = 220.<br>B4 = B3 × 1,1 = 220 × 1,1.<br><span class="big">B4 = 242 locations</span>.`,
      consigne: "B2 = 200 et B3 = B2*1,1, recopiée. Que vaut B4 ?",
      verification: { type: "courte", attendus: ["242"] },
      dessin: velos,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La tatoueuse",
      sorte: "piege",
      question: `Une tatoueuse compte ses clients chaque mois : 16, 24, 36, 54, 81.<br>Camille : « Les points montent tout le temps, donc la suite est arithmétique. »<br><br><b>Quelle suite peut-on vraiment conjecturer</b> ?`,
      reponse: `Les points ne sont pas alignés : + 8, + 12, + 18, + 27. Pas arithmétique.<br>Mais 24 ÷ 16 = 36 ÷ 24 = 54 ÷ 36 = 81 ÷ 54 = 1,5.<br><span class="big">Une suite géométrique</span> de raison 1,5.`,
      consigne: "16 ; 24 ; 36 ; 54 ; 81. Quelle suite conjecturer ?",
      verification: { type: "qcm", choix: ["arithmétique", "ni l'une ni l'autre", "géométrique"], bonne: 2 },
      dessin: tatoueuse,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les plantes d'intérieur",
      sorte: "defi",
      question: `Une boutique en ligne de plantes d'intérieur trace ses commandes : 100, 120, 140, 160.<br>Les points sont alignés. On garde le même rythme.<br>Le graphique s'arrête à n = 3.<br><br><b>Combien vaudra</b> u<sub>10</sub> ?`,
      reponse: `Points alignés : suite arithmétique de raison 20.<br>De u<sub>0</sub> à u<sub>10</sub>, on ajoute 10 fois 20.<br>100 + 10 × 20 = <span class="big">300 commandes</span>.`,
      consigne: "100 ; 120 ; 140 ; 160, alignés. Combien vaut u₁₀ ?",
      verification: { type: "courte", attendus: ["300"] },
      dessin: plantes,
    },
  ],
};

export default problemes;
