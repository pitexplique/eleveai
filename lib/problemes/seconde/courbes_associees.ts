// Énigmes à projeter — seconde, notion courbes_associees (le toboggan sur
// l'estrade, l'affluence décalée, le zoom en hauteur, la distance à la borne,
// piège du f(x + 2), défi du film en accéléré). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { repere } from "../dessins-2de";

// f : une bosse de sommet (1 ; 2), nulle en −1 et 3.
const f = (x: number) => 2 - 0.5 * (x - 1) ** 2;

const estrade = (() => {
  const R = repere(-1, 3, 0, 6, { gl: 300, gh: 300, gy: 20, gx: 110, pasE: 1 });
  return svg("La courbe de f, une bosse de sommet 1 ; 2, et la même courbe montée de 3",
    R.fond + R.courbe(f, -1, 3, C.pale, 3) + R.courbe((x) => f(x) + 3, -1, 3, C.bleu, 5) + R.point(1, 2, C.pale, 6) +
      t(R.X(3) + 6, R.Y(0.2), "f", C.pale, 20, "start") + t(R.X(3) + 6, R.Y(3.2), "f + 3", C.bleu, 20, "start") + t(240, 400, `hauteur maximale${NB}?`, C.rose, 26));
})();

const affluence = (() => {
  const R = repere(-1, 5, 0, 3, { gl: 340, gh: 270, gy: 30, gx: 80, pasE: 1 });
  return svg("La courbe de f, sommet en 1 ; 2, et la courbe de x donne f de x moins 2, en pointillés",
    R.fond + R.courbe(f, -1, 3, C.bleu, 4) + R.courbe((x) => f(x - 2), 1, 5, C.jaune, 4).replace("/>", ` stroke-dasharray="10 8"/>`) + R.point(1, 2, C.bleu, 7) +
      t(R.X(1), R.Y(2) - 16, "(1 ; 2)", C.bleu, 18) + t(R.X(4.3), R.Y(2.85), "f(x − 2)", C.jaune, 20) + t(240, 390, `sommet de f(x − 2)${NB}?`, C.rose, 26));
})();

const zoom = (() => {
  const R = repere(0, 3.5, 0, 20, { gl: 300, gh: 300, gy: 20, gx: 110, pasE: 5 });
  return svg("La parabole y égale x au carré et la courbe deux fois plus haute",
    R.fond + R.courbe((x) => x * x, 0, 3.5, C.pale, 3) + R.courbe((x) => 2 * x * x, 0, Math.sqrt(10), C.bleu, 5) + R.point(3, 9, C.pale, 6) +
      t(R.X(3) + 10, R.Y(9) + 6, "(3 ; 9)", C.pale, 18, "start") + t(R.X(2.2), R.Y(17), "2f", C.bleu, 22, "end") + t(240, 400, `g(3) = 2f(3)${NB}?`, C.rose, 26));
})();

const borne = (() => {
  const R = repere(-1, 6, -3, 4, { gl: 330, gh: 300, gy: 20, gx: 90, pasE: 1 });
  return svg("La droite y égale x moins 3 et sa valeur absolue, en forme de V",
    R.fond + R.courbe((x) => x - 3, 0, 6, C.pale, 3) + R.courbe((x) => Math.abs(x - 3), -1, 6, C.bleu, 5) + R.point(1, 2, C.rose, 7) +
      t(R.X(1.5), R.Y(-2.6), "x − 3", C.pale, 18, "start") + t(R.X(5.5), R.Y(3.6), "|x − 3|", C.bleu, 20, "end") + t(240, 400, `|1 − 3|${NB}?`, C.rose, 26));
})();

const piege = (() => {
  const R = repere(-4, 4, 0, 5, { gl: 340, gh: 300, gy: 20, gx: 70, pasE: 1 });
  return svg("La parabole y égale x au carré et la parabole y égale x plus 2 au carré, décalée",
    R.fond + R.courbe((x) => x * x, -2.2, 2.2, C.pale, 3) + R.courbe((x) => (x + 2) ** 2, -4, 0.2, C.bleu, 5) +
      t(R.X(2.4), R.Y(3.2), "x²", C.pale, 20, "start") + t(R.X(-3.9), R.Y(4.6), "(x + 2)²", C.bleu, 20, "start") + t(240, 400, `où est le sommet${NB}?`, C.rose, 26));
})();

const film = (() => {
  const R = repere(0, 8, 0, 5, { gl: 340, gh: 270, gy: 20, gx: 80, pasE: 1 });
  const g = (x: number) => 1 + 3 * Math.exp(-((x - 6) ** 2) / 1.2);
  return svg("Le son d'un film : un pic à la minute 6, et le même film en accéléré, pic plus tôt",
    R.fond + R.courbe(g, 0, 8, C.pale, 3) + R.courbe((x) => g(2 * x), 0, 4, C.bleu, 5) +
      t(R.X(6), R.Y(4.5), "f", C.pale, 20) + t(R.X(1.5), R.Y(3.6), "f(2t)", C.bleu, 20) + t(240, 345, "t en minutes", C.pale, 18) + t(240, 395, `le pic en accéléré${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "courbes_associees",
  titre: "Énigmes des courbes associées",
  description: "Le toboggan sur l'estrade, l'affluence décalée, le zoom en hauteur, la distance à la borne, le piège du f(x + 2), le défi du film en accéléré : translations, dilatations et valeur absolue d'une courbe.",
  problemes: [
    {
      tag: "Énigme 1 · L'estrade",
      titre: "Tout monte de 3",
      question: `Le profil d'un toboggan est la courbe de f : son point le plus haut est à <b>2 m</b>.<br>On pose le toboggan sur une estrade de <b>3 m</b> : son profil devient g(x) = f(x) + 3.<br><br><b>Quelle est la hauteur maximale</b> de g ?`,
      reponse: `f(x) + 3 : chaque point monte de 3, la forme ne change pas.<br>Maximum : 2 + 3 = <span class="big">5 m</span>.`,
      consigne: "f a pour maximum 2. Quel est le maximum de f(x) + 3 ?",
      verification: { type: "courte", attendus: ["5"], unite: "m" },
      dessin: estrade,
    },
    {
      tag: "Énigme 2 · L'affluence décalée",
      titre: "Deux heures plus tard",
      question: `L'affluence d'un musée suit la courbe de f, avec un pic en (1 ; 2). Le dimanche, tout arrive <b>2 heures plus tard</b> : g(x) = f(x − 2).<br><br><b>Où est le sommet</b> de g ?`,
      reponse: `g(3) = f(3 − 2) = f(1) = 2 : ce qui se passait en 1 se passe en 3.<br>La courbe glisse de 2 vers la droite : sommet en <span class="big">(3 ; 2)</span>.`,
      consigne: "f a pour sommet (1 ; 2). Où est le sommet de f(x − 2) ?",
      verification: { type: "qcm", choix: ["(3 ; 2)", "(−1 ; 2)", "(1 ; 4)"], bonne: 0 },
      dessin: affluence,
    },
    {
      tag: "Énigme 3 · Le zoom en hauteur",
      titre: "Deux fois plus haut",
      question: `Sur un écran, on étire la courbe de f(x) = x² <b>deux fois en hauteur</b> : g(x) = 2f(x).<br>Le point (3 ; 9) est sur la courbe de f.<br><br><b>Que vaut</b> g(3) ?`,
      reponse: `g(3) = 2 × f(3) = 2 × 9 = <span class="big">18</span>.<br>Les abscisses ne bougent pas, les ordonnées sont multipliées par 2.`,
      consigne: "f(x) = x². Que vaut g(3) = 2f(3) ?",
      verification: { type: "courte", attendus: ["18"] },
      dessin: zoom,
    },
    {
      tag: "Énigme 4 · La borne",
      titre: "Une distance n'est jamais négative",
      question: `Une borne est au kilomètre <b>3</b> d'une piste. Lucas est au kilomètre <b>1</b>.<br>Sa distance à la borne est |x − 3|.<br><br><b>Quelle est cette distance</b> ?`,
      reponse: `1 − 3 = −2, mais une distance est positive : |−2| = <span class="big">2 km</span>.<br>La valeur absolue « replie » vers le haut la partie de la courbe sous l'axe : un V.`,
      consigne: "Que vaut |1 − 3| ?",
      verification: { type: "qcm", choix: ["−2", "2", "4"], bonne: 1 },
      dessin: borne,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le plus qui va à gauche",
      sorte: "piege",
      question: `La parabole y = x² a son sommet en (0 ; 0).<br><br><b>Où est le sommet</b> de y = (x + 2)² ?`,
      reponse: `(x + 2)² vaut 0 quand x = −2, pas 2 !<br>f(x + 2) décale la courbe de 2 vers la <b>gauche</b> : sommet en <span class="big">(−2 ; 0)</span>.`,
      consigne: "Où est le sommet de la parabole y = (x + 2)² ?",
      verification: { type: "qcm", choix: ["(2 ; 0)", "(0 ; 2)", "(−2 ; 0)"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le film en accéléré",
      sorte: "defi",
      question: `Le son d'un film suit la courbe de f : un gros pic à la <b>minute 6</b>.<br>On regarde le film en <b>accéléré × 2</b> : le son suit g(t) = f(2t).<br><br><b>À quelle minute</b> arrive le pic ?`,
      reponse: `On veut 2t = 6, donc t = 3.<br>Le pic arrive à la minute <span class="big">3</span> : f(2t) comprime la courbe de moitié vers l'axe des ordonnées.`,
      consigne: "f a un pic en t = 6. En quel t la courbe de f(2t) a-t-elle son pic ?",
      verification: { type: "courte", attendus: ["3"], unite: "min" },
      dessin: film,
    },
  ],
};

export default problemes;
