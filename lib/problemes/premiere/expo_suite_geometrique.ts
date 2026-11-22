// Énigmes à projeter — première (sans spé maths), notion expo_suite_geometrique
// (les nénuphars de l'étang, le blog de voyage, le timbre de collection, la balle
// de ping-pong, piège du bubble tea, défi de la newsletter d'astronomie). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 20) =>
  r(30, y, 420, 22 + 34 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 36 + 34 * k, s, c, taille)).join("");

const nenuphars = svg("Nénuphars d'un étang : semaine 0, 1, 2, 3 ; 5, 10, 20, 40 nénuphars",
  tableau(25, 70, [130, 75, 75, 75, 75], 60, [["semaine n", 0, 1, 2, 3], ["nénuphars", 5, 10, 20, 40]], (i, j) => (j === 0 ? C.pale : C.craie), 22) +
    t(240, 250, "× ? à chaque semaine", C.pale, 20) +
    t(240, 385, `la raison q = ${NB}?`, C.rose, 26));

const blog = svg("Lecteurs d'un blog de voyage : u(0) = 400 et u(n + 1) = 1,5 × u(n)",
  cadre(40, ["u(0) = 400 lecteurs", "u(n + 1) = 1,5 × u(n)"], C.bleu, 24) +
    t(240, 220, "u(0) → u(1) → u(2)", C.pale, 22) +
    t(240, 385, `u(2) = ${NB}?`, C.rose, 26));

const timbre = svg("Timbre de collection : 50 € aujourd'hui, + 20 % chaque année",
  r(170, 60, 140, 160, C.jaune, 0.12, 3, 6) + r(185, 75, 110, 130, C.jaune, 0, 2, 4) + t(240, 150, "50 €", C.jaune, 30) +
    t(240, 270, "+ 20 % par an", C.bleu, 26) +
    t(240, 385, `u(n + 1) = ${NB}?`, C.rose, 26));

const pingpong = (() => {
  const R = repereXY(0, 4, 0, 90, { gx: 80, gy: 40, gl: 340, gh: 270, px: 1, ex: 1, py: 10, ey: 100, quadrillage: false });
  const h = [80, 60, 45];
  let s = "";
  h.forEach((v, n) => { s += l(R.X(n), R.Y(0), R.X(n), R.Y(v), C.bleu, 5) + t(R.X(n) + 12, R.Y(v) + 6, String(v), C.bleu, 18, "start"); });
  s += t(R.X(3), R.Y(40), "?", C.jaune, 30);
  return svg("Hauteurs d'une balle de ping-pong : 80, 60, 45 cm après 0, 1, 2 rebonds ; la hauteur après 3 rebonds est inconnue",
    R.fond + s + t(R.X(0) + 10, 28, "hauteur (cm)", C.pale, 17, "start") + t(R.X(4), R.Y(0) + 46, "rebonds n", C.pale, 17, "end") +
      t(240, 405, `× 0,75 à chaque rebond${NB}: h(3)${NB}?`, C.rose, 24));
})();

const bubble = svg("Gobelets de bubble tea vendus : mois 1, 2, 3, 4 ; 4, 8, 12, 16 milliers",
  tableau(25, 70, [130, 75, 75, 75, 75], 60, [["mois", 1, 2, 3, 4], ["milliers", 4, 8, 12, 16]], (i, j) => (j === 0 ? C.pale : C.craie), 22) +
    t(240, 250, "Léa : « 4 puis 8, ça double ! »", C.pale, 20) +
    t(240, 385, `géométrique${NB}?`, C.rose, 26));

const astro = svg("Newsletter d'astronomie : u(2) = 500 abonnés et u(4) = 2 000 abonnés, suite géométrique à termes positifs",
  cadre(40, ["u(2) = 500", "u(4) = 2 000"], C.bleu, 26) +
    t(240, 210, "suite géométrique, termes > 0", C.pale, 20) +
    t(240, 385, `la raison q${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "expo_suite_geometrique",
  titre: "Énigmes des suites géométriques",
  description: "Les nénuphars de l'étang, le blog de voyage, le timbre de collection, la balle de ping-pong, le piège du bubble tea, le défi de la newsletter d'astronomie : trouver la raison, utiliser u(n + 1) = q × u(n), passer d'un pourcentage à la raison, calculer un terme.",
  problemes: [
    {
      tag: "Énigme 1 · Les nénuphars de l'étang",
      titre: "Trouver la raison",
      question: `Sur un étang, on compte 5 nénuphars à la semaine 0, puis 10, puis 20, puis 40.<br><br><b>Quelle est la raison</b> de cette suite géométrique ?`,
      reponse: `On passe d'un terme au suivant en multipliant : 10 ÷ 5 = 2, 20 ÷ 10 = 2, 40 ÷ 20 = 2.<br>La raison est <span class="big">q = 2</span> : le nombre double chaque semaine.`,
      consigne: "5, 10, 20, 40 nénuphars : quelle est la raison de la suite géométrique ?",
      verification: { type: "qcm", choix: ["q = 2", "q = 5", "q = 10"], bonne: 0 },
      dessin: nenuphars,
    },
    {
      tag: "Énigme 2 · Le blog de voyage",
      titre: "La relation de récurrence",
      question: `Un blog de voyage a u(0) = 400 lecteurs. Chaque mois : u(n + 1) = 1,5 × u(n).<br><br><b>Combien</b> de lecteurs au mois 2 ?`,
      reponse: `u(1) = 1,5 × 400 = 600.<br>u(2) = 1,5 × 600 = <span class="big">900 lecteurs</span>.`,
      consigne: "u(0) = 400 et u(n + 1) = 1,5 × u(n) : combien vaut u(2) ?",
      verification: { type: "courte", attendus: ["900"], unite: "lecteurs" },
      dessin: blog,
    },
    {
      tag: "Énigme 3 · Le timbre de collection",
      titre: "Du pourcentage à la raison",
      question: `Un timbre de collection vaut 50 €. Sa valeur augmente de 20 % chaque année. On note u(n) sa valeur dans n années.<br><br><b>Quelle relation</b> relie u(n + 1) et u(n) ?`,
      reponse: `Augmenter de 20 %, c'est multiplier par 1 + 20 ÷ 100 = 1,2.<br>Donc <span class="big">u(n + 1) = 1,2 × u(n)</span> : suite géométrique de raison 1,2.`,
      consigne: "+ 20 % par an : quelle relation relie u(n + 1) et u(n) ?",
      verification: { type: "qcm", choix: ["u(n + 1) = u(n) + 20", "u(n + 1) = 0,2 × u(n)", "u(n + 1) = 1,2 × u(n)"], bonne: 2 },
      dessin: timbre,
    },
    {
      tag: "Énigme 4 · La balle de ping-pong",
      titre: "Calculer un terme",
      question: `On lâche une balle de ping-pong de 80 cm. À chaque rebond, elle remonte aux 3/4 de la hauteur d'avant : 80, puis 60, puis 45 cm.<br><br><b>À quelle hauteur</b> remonte-t-elle après 3 rebonds ?`,
      reponse: `Raison q = 0,75. h(3) = 45 × 0,75 = 33,75.<br>Ou bien : h(3) = 80 × 0,75<sup>3</sup> = <span class="big">33,75 cm</span>.`,
      consigne: "80, 60, 45 cm, puis × 0,75 à chaque rebond : quelle hauteur après 3 rebonds (en cm) ?",
      verification: { type: "courte", attendus: ["33,75", "33.75"], unite: "cm" },
      dessin: pingpong,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le bubble tea",
      sorte: "piege",
      question: `Une boutique vend 4, puis 8, puis 12, puis 16 milliers de bubble tea par mois.<br>Léa dit : « 4 puis 8, ça double : c'est géométrique de raison 2. »<br><br><b>A-t-elle raison</b> ?`,
      reponse: `Il faut vérifier sur <b>tous</b> les termes : 8 ÷ 4 = 2, mais 12 ÷ 8 = 1,5. Pas toujours le même facteur !<br>En revanche, on ajoute 4 à chaque fois : <span class="big">suite arithmétique de raison 4</span>.`,
      consigne: "4, 8, 12, 16 : Léa dit « géométrique de raison 2 ». A-t-elle raison ?",
      verification: { type: "qcm", choix: ["Oui, de raison 2", "Non : arithmétique de raison 4", "Non : géométrique de raison 4"], bonne: 1 },
      dessin: bubble,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La newsletter d'astronomie",
      sorte: "defi",
      question: `Le nombre d'abonnés d'une newsletter d'astronomie suit une suite géométrique à termes positifs. u(2) = 500 et u(4) = 2 000.<br><br><b>Quelle est la raison</b> q ?`,
      reponse: `De u(2) à u(4), on multiplie deux fois par q : q × q = 2 000 ÷ 500 = 4.<br>q > 0, donc <span class="big">q = 2</span>. (Et u(3) = 1 000.)`,
      consigne: "Suite géométrique à termes positifs, u(2) = 500 et u(4) = 2 000 : quelle est la raison q ?",
      verification: { type: "courte", attendus: ["2", "q = 2", "q=2"] },
      dessin: astro,
    },
  ],
};

export default problemes;
