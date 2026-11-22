// Énigmes à projeter — terminale spé maths, notion equation_differentielle
// (la champignonnière, le parfum qui s'évapore, la pataugeoire percée, le
// radiateur, piège de la billetterie en ligne, défi du souffleur de verre). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, fleche } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";
import { frac } from "../outils";

const champignons = (() => {
  const R = repereXY(0, 10, 0, 40, { gx: 80, gy: 50, gl: 350, gh: 270, px: 1, py: 5, ex: 2, ey: 10 });
  return svg("Surface de la champignonnière : une courbe qui part de 5 mètres carrés et grandit de plus en plus vite jusqu'à environ 37 au bout de 10 jours ; S′ = 0,2 S",
    R.fond + R.courbe((x) => 5 * Math.exp(0.2 * x), 0, 10, C.bleu, 4) + R.point(0, 5, C.jaune, 7) +
      t(R.X(0) + 16, R.Y(35), "S′ = 0,2 S", C.bleu, 26, "start") + t(R.X(2.5), R.Y(2), "S(0) = 5", C.jaune, 20, "start") +
      t(R.X(10), R.Y(0) - 12, "t (jours)", C.pale, 18, "end") +
      t(240, 405, `quelle fonction S${NB}?`, C.rose, 24));
})();

const parfum = (() => {
  const R = repereXY(0, 20, 0, 50, { gx: 80, gy: 50, gl: 350, gh: 270, px: 2, py: 5, ex: 4, ey: 10 });
  return svg("Masse du parfum : une courbe qui part de 50 grammes et décroît vers 0 ; m′ = −0,1 m ; on cherche la masse au bout de 10 jours",
    R.fond + R.courbe((x) => 50 * Math.exp(-0.1 * x), 0, 20, C.bleu, 4) + R.point(0, 50, C.jaune, 7) +
      l(R.X(10), R.Y(0), R.X(10), R.Y(50 * Math.exp(-1)), C.rose, 3, "8 6") + R.point(10, 50 * Math.exp(-1), C.rose, 7) +
      t(R.X(20), R.Y(44), "m′ = −0,1 m", C.bleu, 26, "end") + t(R.X(10) + 12, R.Y(50 * Math.exp(-1)) - 14, "?", C.rose, 26, "start") +
      t(R.X(20), R.Y(0) - 12, "t (jours)", C.pale, 18, "end") +
      t(240, 405, `masse au bout de 10 jours${NB}?`, C.rose, 24));
})();

const pataugeoire = (() => {
  const R = repereXY(0, 40, 0, 240, { gx: 80, gy: 50, gl: 350, gh: 270, px: 5, py: 20, ex: 10, ey: 40 });
  const V = (x: number) => 200 * (1 - Math.exp(-0.1 * x));
  return svg("Volume de la pataugeoire : une courbe qui part de 0 et monte vers 200 litres sans l'atteindre ; V′ = −0,1 V + 20 ; on cherche le volume à t = 10 minutes",
    R.fond + l(R.X(0), R.Y(200), R.X(40), R.Y(200), C.pale, 3, "8 6") + R.courbe(V, 0, 40, C.bleu, 4) +
      l(R.X(10), R.Y(0), R.X(10), R.Y(V(10)), C.rose, 3, "8 6") + R.point(10, V(10), C.rose, 7) +
      t(R.X(40), R.Y(200) - 12, "200 L", C.pale, 20, "end") + t(R.X(40), R.Y(60), "V′ = −0,1 V + 20", C.bleu, 24, "end") +
      t(R.X(40), R.Y(0) - 12, "t (min)", C.pale, 18, "end") +
      t(240, 405, `V(10)${NB}?`, C.rose, 26));
})();

const radiateur = svg("Le radiateur : la température T de la pièce vérifie T′ = −0,2 T + 4 ; on cherche la température qui ne bouge plus",
  t(240, 90, "T′ = −0,2 T + 4", C.bleu, 36) + t(240, 150, "(T en °C, t en heures)", C.pale, 20) +
    t(240, 230, "T constante ⟹ T′ = 0", C.craie, 28) + t(240, 290, "0 = −0,2 T + 4", C.jaune, 30) +
    t(240, 380, `quelle température T${NB}?`, C.rose, 26));

const billetterie = svg("La billetterie en ligne : 10 milliers d'acheteurs arrivent par minute, la moitié des présents repart chaque minute ; N′ = −0,5 N + 10",
  t(240, 70, "N′ = −0,5 N + 10", C.bleu, 36) + t(240, 120, "(N en milliers de connectés)", C.pale, 20) +
    fleche(60, 190, 190, 190, C.jaune, 4) + t(125, 230, "+10 par min", C.jaune, 22) +
    fleche(290, 190, 420, 190, C.rose, 4) + t(355, 230, "−0,5 N par min", C.rose, 22) +
    t(240, 300, "Léo : « N tend vers 10 »", C.craie, 26) +
    t(240, 385, `vers quoi tend N${NB}?`, C.rose, 26));

const verre = (() => {
  const R = repereXY(0, 30, 0, 1100, { gx: 90, gy: 50, gl: 340, gh: 270, px: 5, py: 100, ex: 10, ey: 200 });
  const T = (x: number) => 20 + 1000 * Math.pow(2, -x / 10);
  return svg("Température du verre : une courbe qui part de 1 020 degrés, passe par 520 degrés à 10 minutes, et descend vers 20 degrés ; on cherche quand elle vaut 270 degrés",
    R.fond + R.courbe(T, 0, 30, C.bleu, 4) + R.point(0, 1020, C.jaune, 7) + R.point(10, 520, C.jaune, 7) +
      l(R.X(0), R.Y(270), R.X(30), R.Y(270), C.rose, 3, "8 6") +
      t(R.X(0) + 16, R.Y(1020) + 6, "1 020 °C", C.jaune, 20, "start") + t(R.X(10) + 14, R.Y(650), "520 °C à 10 min", C.jaune, 20, "start") +
      t(R.X(0) + 16, R.Y(270) - 12, "270 °C : quand ?", C.rose, 20, "start") +
      t(R.X(30), R.Y(0) - 12, "t (min)", C.pale, 18, "end") +
      t(240, 405, `T′ = −k (T − 20)`, C.craie, 24));
})();

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "equation_differentielle",
  titre: "Énigmes des équations différentielles",
  description: "La champignonnière, le parfum qui s'évapore, la pataugeoire percée, le radiateur, le piège de la billetterie en ligne, le défi du souffleur de verre : reconnaître une solution, y′ = ay, y′ = ay + b, condition initiale, solution constante.",
  problemes: [
    {
      tag: "Énigme 1 · La champignonnière",
      titre: "Reconnaître une solution",
      question: `Dans une champignonnière, la surface couverte S(t), en m², vérifie S′ = 0,2 S, avec S(0) = 5 (t en jours).<br><br><b>Quelle fonction</b> convient ?`,
      reponse: `Les solutions de y′ = ay sont y = C e<sup>at</sup>. Ici a = 0,2 et C = S(0) = 5.<br><span class="big">S(t) = 5 e<sup>0,2t</sup></span> : S′ = 0,2 × 5 e<sup>0,2t</sup> = 0,2 S.`,
      consigne: "S′ = 0,2 S et S(0) = 5 : quelle fonction S convient ?",
      verification: { type: "qcm", choix: ["S(t) = 0,2 e^t", "S(t) = 5 e^(0,2t)", "S(t) = e^t + 0,2"], bonne: 1 },
      dessin: champignons,
    },
    {
      tag: "Énigme 2 · Le parfum qui s'évapore",
      titre: "y′ = ay et une condition initiale",
      question: `Un flacon ouvert contient 50 g de parfum. La masse m(t) vérifie m′ = −0,1 m (t en jours).<br><br><b>Quelle masse reste-t-il</b> au bout de 10 jours ?`,
      reponse: `m(t) = C e<sup>−0,1t</sup> et m(0) = C = 50, donc m(t) = 50 e<sup>−0,1t</sup>.<br>m(10) = 50 e<sup>−1</sup> ≈ <span class="big">18,4 g</span>.`,
      consigne: "m′ = −0,1 m et m(0) = 50 : combien vaut m(10), en grammes ?",
      verification: { type: "courte", attendus: ["18,4", "18.4", "18", "18,39", "18.39"], unite: "g" },
      dessin: parfum,
    },
    {
      tag: "Énigme 3 · La pataugeoire percée",
      titre: "Résoudre y′ = ay + b",
      question: `On remplit une pataugeoire vide à 20 L par minute, mais elle perd 10 % de son eau par minute : V′ = −0,1 V + 20, avec V(0) = 0.<br><br><b>Combien de litres</b> contient-elle au bout de 10 min ?`,
      reponse: `V(t) = C e<sup>−0,1t</sup> + 200, car −0,1 V + 20 = 0 donne V = 200. V(0) = 0 donne C = −200.<br>V(10) = 200 − 200 e<sup>−1</sup> ≈ <span class="big">126,4 L</span>.`,
      consigne: "V′ = −0,1 V + 20 et V(0) = 0 : combien vaut V(10), en litres ?",
      verification: { type: "courte", attendus: ["126,4", "126.4", "126", "126,42", "126.42"], unite: "L" },
      dessin: pataugeoire,
    },
    {
      tag: "Énigme 4 · Le radiateur",
      titre: "Une solution constante",
      question: `Avec un radiateur, la température T d'une pièce vérifie T′ = −0,2 T + 4 (T en °C, t en heures).<br><br><b>Quelle température constante</b> est solution ?`,
      reponse: `Une fonction constante a une dérivée nulle : 0 = −0,2 T + 4, donc T = ${frac(4, "0,2")}.<br><span class="big">T = 20 °C</span> : la pièce s'en approche, quelle que soit la température de départ.`,
      consigne: "T′ = −0,2 T + 4 : quelle fonction constante T est solution ?",
      verification: { type: "courte", attendus: ["20", "T=20"], unite: "°C" },
      dessin: radiateur,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La billetterie en ligne",
      sorte: "piege",
      question: `Sur un site de billetterie, N(t) est le nombre de connectés, en milliers : N′ = −0,5 N + 10. Il en arrive 10 milliers par minute.<br>Léo : « N tend vers 10 milliers. »<br><br><b>Vers quoi tend N</b> ?`,
      reponse: `N(t) = C e<sup>−0,5t</sup> + 20, car −0,5 N + 10 = 0 donne N = 20. Et e<sup>−0,5t</sup> tend vers 0.<br>N tend vers <span class="big">20 milliers</span> : il faut 20 milliers de présents pour que 10 milliers repartent chaque minute.`,
      consigne: "N′ = −0,5 N + 10 : vers quelle valeur tend N ?",
      verification: { type: "qcm", choix: ["10 milliers", "−20 milliers", "20 milliers"], bonne: 2 },
      dessin: billetterie,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le souffleur de verre",
      sorte: "defi",
      question: `Un vase sort du four à 1 020 °C ; l'atelier est à 20 °C. Sa température vérifie T′ = −k(T − 20). Au bout de 10 min, il est à 520 °C.<br><br><b>Au bout de combien de temps</b> sera-t-il à 270 °C ?`,
      reponse: `T(t) − 20 = 1 000 e<sup>−kt</sup>. À 10 min : 500 = 1 000 e<sup>−10k</sup>, donc l'écart est divisé par 2 toutes les 10 min.<br>270 − 20 = 250 = 1 000 ÷ 4 : deux moitiés, donc <span class="big">20 min</span> (et non 15 min : la baisse ralentit).`,
      consigne: "T′ = −k(T − 20), T(0) = 1 020, T(10) = 520 : quand T vaut-il 270 ?",
      verification: { type: "qcm", choix: ["20 min", "15 min", "30 min"], bonne: 0 },
      dessin: verre,
    },
  ],
};

export default problemes;
