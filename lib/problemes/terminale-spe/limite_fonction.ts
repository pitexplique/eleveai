// Énigmes à projeter — terminale spé maths, notion limite_fonction
// (la salle des fêtes, le sirop de la limonaderie, la loupe de l'horloger, le
// parachutiste, piège du fabricant de planches à voile, défi de la bille de
// Galilée). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const salle = (() => {
  const R = repereXY(0, 200, 0, 120, { gx: 80, gy: 60, gl: 340, gh: 260, px: 25, py: 20, ex: 50, ey: 40 });
  return svg("Prix par invité f(x) = 1 200 ÷ x : la courbe descend de 120 vers l'axe des abscisses quand x grandit",
    R.fond + R.courbe((x) => 1200 / x, 10, 200, C.bleu, 4) +
      t(R.X(70), 110, "f(x) = 1 200 ÷ x", C.bleu, 24, "start") + t(R.X(200), R.Y(0) + 44, "invités", C.pale, 18, "end") +
      t(240, 405, `quand x devient très grand${NB}?`, C.rose, 22));
})();

const sirop = (() => {
  const R = repereXY(0, 20, 0, 35, { gx: 80, gy: 60, gl: 340, gh: 260, px: 2, py: 5, ex: 4, ey: 10 });
  return svg("Concentration du sirop C(t) = (30t + 10) ÷ (t + 2) : la courbe part de 5 et monte vers une droite en pointillés",
    R.fond + l(R.X(0), R.Y(30), R.X(20), R.Y(30), C.rose, 3, "8 6") + R.courbe((x) => (30 * x + 10) / (x + 2), 0, 20, C.bleu, 4) +
      t(R.X(0) + 12, 40, "C(t) = (30t + 10) ÷ (t + 2)", C.bleu, 22, "start") + t(R.X(19), R.Y(30) - 12, "?", C.rose, 24) +
      t(240, 405, `la limite en +∞${NB}?`, C.rose, 22));
})();

const loupe = (() => {
  const R = repereXY(0, 8, 0, 20, { gx: 80, gy: 60, gl: 340, gh: 260, px: 1, py: 5, ex: 1, ey: 5 });
  return svg("Taille de l'image f(x) = 10 ÷ (x − 2) pour x plus grand que 2 : près de la droite x = 2, la courbe monte très haut",
    R.fond + l(R.X(2), R.Y(0), R.X(2), R.Y(20), C.rose, 3, "8 6") + R.courbe((x) => 10 / (x - 2), 2.5, 8, C.bleu, 4) +
      t(R.X(3.7), 110, "f(x) = 10 ÷ (x − 2)", C.bleu, 22, "start") + t(R.X(2) - 10, 100, "x = 2", C.rose, 20, "end") +
      t(240, 405, `quand x s'approche de 2${NB}?`, C.rose, 22));
})();

const parachute = (() => {
  const R = repereXY(0, 60, 0, 60, { gx: 80, gy: 60, gl: 340, gh: 260, px: 10, py: 10, ex: 20, ey: 20 });
  return svg("Vitesse du parachutiste v(t) = 55t ÷ (t + 5) : la courbe monte vite puis se rapproche d'une droite en pointillés à 55",
    R.fond + l(R.X(0), R.Y(55), R.X(60), R.Y(55), C.rose, 3, "8 6") + R.courbe((x) => (55 * x) / (x + 5), 0, 60, C.bleu, 4) +
      t(R.X(0) + 12, 40, "v(t) = 55t ÷ (t + 5)", C.bleu, 22, "start") + t(R.X(60), R.Y(55) - 12, "55", C.rose, 20, "end") +
      t(240, 405, `quelle asymptote${NB}?`, C.rose, 24));
})();

const voile = svg("Tableau : pour x = 100, 1 000 et 10 000 planches, B(x) = x² − 50x vaut 5 000, 950 000 et 99 500 000 ; Léo dit que plus l'infini moins l'infini fait 0",
  t(240, 55, "B(x) = x² − 50x", C.bleu, 28) +
    tableau(20, 95, [80, 90, 120, 150], 60, [["x", 100, "1 000", "10 000"], ["B(x)", "5 000", "950 000", "99 500 000"]], (i, j) => (j === 0 ? C.pale : C.craie), 22) +
    t(240, 290, `Léo${NB}: « +∞ − ∞ = 0${NB}»`, C.jaune, 24) + t(240, 380, `la limite en +∞${NB}?`, C.rose, 24));

const galilee = svg("Tableau : la vitesse moyenne de la bille entre 3 s et t vaut 6,1 pour t = 3,1 ; 6,01 pour t = 3,01 ; 6,001 pour t = 3,001",
  t(240, 55, "d(t) = t²", C.bleu, 28) +
    tableau(40, 90, [180, 80, 80, 80], 60, [["t", "3,1", "3,01", "3,001"], ["(t² − 9) ÷ (t − 3)", "6,1", "6,01", "6,001"]], (i, j) => (j === 0 ? C.pale : C.craie), 20) +
    t(240, 280, "vitesse moyenne entre 3 s et t, en m/s", C.pale, 20) + t(240, 380, `la vitesse à t = 3${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "limite_fonction",
  titre: "Énigmes des limites de fonctions",
  description: "La salle des fêtes, le sirop de la limonaderie, la loupe de l'horloger, le parachutiste, le piège du fabricant de planches à voile, le défi de la bille de Galilée : limites des fonctions de référence, limite en l'infini, limite en un point, asymptote, forme indéterminée.",
  problemes: [
    {
      tag: "Énigme 1 · La salle des fêtes",
      titre: "Une fonction de référence",
      question: `Louer une salle des fêtes coûte 1 200 €. Avec x invités, chacun paie f(x) = 1 200 ÷ x euros.<br><br><b>Vers quoi tend</b> le prix par invité quand x devient très grand ?`,
      reponse: `1 ÷ x tend vers 0 en +∞, donc 1 200 ÷ x aussi.<br>Le prix par invité tend vers <span class="big">0 €</span>, sans jamais l'atteindre.`,
      consigne: "f(x) = 1 200 ÷ x : quelle est la limite de f en +∞ ?",
      verification: { type: "courte", attendus: ["0"], unite: "€" },
      dessin: salle,
    },
    {
      tag: "Énigme 2 · Le sirop de la limonaderie",
      titre: "Une limite en l'infini",
      question: `Dans une cuve de limonaderie, la concentration de sucre après t minutes est C(t) = (30t + 10) ÷ (t + 2), en g/L.<br><br><b>Vers quelle concentration</b> tend le sirop ?`,
      reponse: `On divise en haut et en bas par t : C(t) = (30 + 10 ÷ t) ÷ (1 + 2 ÷ t).<br>En +∞, cela tend vers 30 ÷ 1 = <span class="big">30 g/L</span>.`,
      consigne: "C(t) = (30t + 10) ÷ (t + 2) : quelle est la limite de C en +∞ ?",
      verification: { type: "courte", attendus: ["30"], unite: "g/L" },
      dessin: sirop,
    },
    {
      tag: "Énigme 3 · La loupe de l'horloger",
      titre: "Une limite en un point",
      question: `Un horloger approche sa loupe d'un rouage de montre. Pour x > 2 cm, la taille de l'image est f(x) = 10 ÷ (x − 2).<br><br><b>Vers quoi tend</b> f(x) quand x s'approche de 2 ?`,
      reponse: `Quand x tend vers 2 (avec x > 2), x − 2 tend vers 0 en restant positif.<br>10 ÷ (x − 2) tend vers <span class="big">+∞</span> : l'image devient immense.`,
      consigne: "f(x) = 10 ÷ (x − 2) : quelle est la limite quand x tend vers 2, avec x > 2 ?",
      verification: { type: "qcm", choix: ["+∞", "−∞", "0"], bonne: 0 },
      dessin: loupe,
    },
    {
      tag: "Énigme 4 · Le parachutiste",
      titre: "Une asymptote",
      question: `Un parachutiste saute. Sa vitesse après t secondes est v(t) = 55t ÷ (t + 5), en m/s. Sa limite en +∞ est 55.<br><br><b>Quelle asymptote</b> a la courbe de v ?`,
      reponse: `v(t) tend vers 55 quand t tend vers +∞.<br>La droite <span class="big">y = 55</span> est asymptote horizontale : la vitesse plafonne à 55 m/s.`,
      consigne: "La limite de v en +∞ est 55 : quelle asymptote a la courbe ?",
      verification: { type: "qcm", choix: ["x = 55", "y = 55", "y = 0"], bonne: 1 },
      dessin: parachute,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le fabricant de planches à voile",
      sorte: "piege",
      question: `Pour x planches à voile vendues, un fabricant gagne B(x) = x² − 50x euros.<br>Léo : « x² tend vers +∞, 50x aussi, et +∞ − ∞ = 0. »<br><br><b>Quelle est la limite</b> de B en +∞ ?`,
      reponse: `« +∞ − ∞ » est une forme indéterminée : on factorise. B(x) = x(x − 50).<br>x et x − 50 tendent vers +∞ : B(x) tend vers <span class="big">+∞</span>.`,
      consigne: "B(x) = x² − 50x : quelle est la limite de B en +∞ ?",
      verification: { type: "qcm", choix: ["0", "On ne peut rien dire", "+∞"], bonne: 2 },
      dessin: voile,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La bille de Galilée",
      sorte: "defi",
      question: `Une bille roule dans une gouttière. Elle a parcouru d(t) = t² mètres après t secondes.<br>Sa vitesse moyenne entre 3 s et t est (t² − 9) ÷ (t − 3).<br><br><b>Vers quoi tend</b> cette vitesse quand t tend vers 3 ?`,
      reponse: `t² − 9 = (t − 3)(t + 3), donc pour t ≠ 3 : (t² − 9) ÷ (t − 3) = t + 3.<br>Quand t tend vers 3, cela tend vers <span class="big">6 m/s</span> : la vitesse à l'instant 3 s.`,
      consigne: "(t² − 9) ÷ (t − 3) : quelle est la limite quand t tend vers 3 ?",
      verification: { type: "courte", attendus: ["6"], unite: "m/s" },
      dessin: galilee,
    },
  ],
};

export default problemes;
