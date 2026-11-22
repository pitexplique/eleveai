// Énigmes à projeter — première spé maths, notion suites
// (les carpes koï du jardin japonais, le permis de Léna, le carillon de
// l'horloge, la chaîne de la collecte, piège du placement de la grand-mère,
// défi du super-ballon). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";
import { ind } from "../dessins-tle";
import { frac } from "../outils";

const carpes = svg("Le bassin du jardin japonais : 200 carpes au départ ; chaque année, 10 % partent et on en ajoute 30",
  p("M60 120 Q60 60 160 60 L320 60 Q420 60 420 120 L420 160 Q420 220 320 220 L160 220 Q60 220 60 160 Z", C.bleu, 3, 0.15) +
    p("M150 140 q25 -22 50 0 q-25 22 -50 0 z M200 140 l14 -10 l0 20 z", C.jaune, 2, 0.6) +
    p("M280 110 q25 -22 50 0 q-25 22 -50 0 z M330 110 l14 -10 l0 20 z", C.jaune, 2, 0.6) +
    t(240, 270, `${ind("u", 0, " = 200")}`, C.craie, 26) +
    t(240, 315, `${ind("u", "n+1", " = 0,9")} ${ind("u", "n", " + 30")}`, C.bleu, 26) +
    t(240, 390, `${ind("u", 2, " =")}${NB}?`, C.rose, 30));

const permis = (() => {
  let s = "";
  for (let k = 0; k < 6; k++) s += r(70 + k * 58, 220 - 18 * k, 44, 40 + 18 * k, C.jaune, 0.3, 2, 4);
  return svg("Les économies de Léna pour son permis : 150 euros au départ, puis 35 euros de plus chaque mois ; le permis coûte 900 euros",
    s + l(50, 260, 430, 260, C.craie, 3) +
      t(240, 60, "départ : 150 € · +35 € par mois", C.bleu, 24) + t(240, 105, "permis : 900 €", C.craie, 24) +
      t(240, 320, `${ind("u", "n", " = 150 + 35n")}`, C.craie, 26) + t(240, 390, `${ind("u", "n", " ≥ 900")} pour n =${NB}?`, C.rose, 28));
})();

const horloge = (() => {
  let s = o(240, 170, 135, C.craie, 0, 4);
  for (let k = 1; k <= 12; k++) {
    const a = (k * Math.PI) / 6;
    s += t(+(240 + 105 * Math.sin(a)).toFixed(1), +(170 - 105 * Math.cos(a) + 8).toFixed(1), k, C.craie, 22);
  }
  return svg("L'horloge du clocher sonne 1 coup à 1 heure, 2 coups à 2 heures, et ainsi de suite jusqu'à 12 coups à midi",
    s + l(240, 170, 240, 95, C.craie, 5) + l(240, 170, 290, 170, C.craie, 5) +
      t(240, 340, "1 + 2 + 3 + … + 12", C.bleu, 28) + t(240, 395, `coups de 1 h à midi${NB}?`, C.rose, 26));
})();

const chaine = (() => {
  let s = "";
  const rang = [1, 3, 9];
  rang.forEach((n, i) => {
    const y = 60 + 80 * i;
    for (let k = 0; k < n; k++) {
      const x = n === 1 ? 240 : 40 + (400 / (n - 1)) * k;
      s += `<circle cx="${x.toFixed(1)}" cy="${y}" r="13" fill="${C.bleu}" fill-opacity="0.5" stroke="${C.bleu}" stroke-width="2"/>`;
    }
  });
  return svg("La chaîne de la collecte : le jour 0, une personne ; chaque jour, chaque nouvelle personne en prévient 3 autres : 1, puis 3, puis 9",
    s + t(40, 300, "jour 0 : 1 · jour 1 : 3 · jour 2 : 9 · …", C.craie, 22, "start") +
      t(240, 345, "jusqu'au jour 5 compris", C.pale, 20) + t(240, 395, `1 + 3 + … + 3⁵ =${NB}?`, C.rose, 28));
})();

const placement = svg("Le placement de la grand-mère : 1 000 euros à 5 % d'intérêts composés par an, pendant 10 ans ; Tom dit plus 50 %",
  t(240, 70, "1 000 € placés à 5 % par an", C.bleu, 26) + t(240, 120, "(intérêts composés)", C.pale, 20) +
    t(240, 190, "pendant 10 ans", C.craie, 26) + t(240, 260, "Tom : « 10 × 5 % = +50 % »", C.craie, 24) +
    t(240, 370, `hausse en 10 ans${NB}?`, C.rose, 30));

const ballon = (() => {
  let s = l(40, 340, 440, 340, C.craie, 4);
  s += p("M70 100 L70 340", C.bleu, 3, 0) +
    p("M70 340 Q140 100 210 340 Q250 220 290 340 Q315 280 340 340 Q355 310 370 340 Q378 325 386 340", C.bleu, 3) +
    `<circle cx="70" cy="100" r="12" fill="${C.rose}"/>` + l(52, 100, 52, 340, C.pale, 2, "6 6") +
    t(46, 225, "2 m", C.pale, 20, "end");
  return svg("Le super-ballon lâché de 2 mètres remonte chaque fois à la moitié de sa hauteur : 2 m, puis 1 m, puis 0,5 m, et ainsi de suite",
    s + t(260, 60, "rebond : la moitié de la hauteur", C.craie, 22) +
      t(240, 395, `distance totale parcourue${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "suites",
  titre: "Énigmes des suites numériques",
  description: "Les carpes koï du jardin japonais, le permis de Léna, le carillon de l'horloge, la chaîne de la collecte, le piège du placement de la grand-mère, le défi du super-ballon : récurrence, suites arithmétiques et géométriques, sommes, limite.",
  problemes: [
    {
      tag: "Énigme 1 · Les carpes koï",
      titre: "Une suite définie par récurrence",
      question: `Un bassin compte 200 carpes koï. Chaque année, 10 % des carpes partent vers l'étang voisin, puis le jardinier en ajoute 30.<br>On note u<sub>n</sub> le nombre de carpes après n années : u<sub>0</sub> = 200 et u<sub>n+1</sub> = 0,9 u<sub>n</sub> + 30.<br><br><b>Combien y a-t-il de carpes après 2 ans</b> ?`,
      reponse: `u<sub>1</sub> = 0,9 × 200 + 30 = 180 + 30 = 210.<br>u<sub>2</sub> = 0,9 × 210 + 30 = 189 + 30 = <span class="big">219 carpes</span>.`,
      consigne: "u0 = 200 et u(n+1) = 0,9 u(n) + 30 : que vaut u2 ?",
      verification: { type: "courte", attendus: ["219"], unite: "carpes" },
      dessin: carpes,
    },
    {
      tag: "Énigme 2 · Le permis de Léna",
      titre: "Une suite arithmétique",
      question: `Léna a 150 € de côté. Chaque mois, elle ajoute 35 €. Le permis de conduire coûte 900 €.<br>Ses économies après n mois : u<sub>n</sub> = 150 + 35n.<br><br><b>Au bout de combien de mois</b> pourra-t-elle payer le permis ?`,
      reponse: `On cherche le premier n tel que 150 + 35n ≥ 900, soit 35n ≥ 750, soit n ≥ ${frac(750, 35)} ≈ 21,4.<br>u<sub>21</sub> = 885 € (pas assez), u<sub>22</sub> = 920 € : <span class="big">22 mois</span>.`,
      consigne: "u(n) = 150 + 35n : pour quel premier n a-t-on u(n) ≥ 900 ?",
      verification: { type: "courte", attendus: ["22"], unite: "mois" },
      dessin: permis,
    },
    {
      tag: "Énigme 3 · Le carillon de l'horloge",
      titre: "La somme 1 + 2 + … + n",
      question: `L'horloge du clocher sonne 1 coup à 1 h, 2 coups à 2 h, …, 12 coups à midi.<br><br><b>Combien de coups sonne-t-elle de 1 h à midi</b> ?`,
      reponse: `1 + 2 + … + n = ${frac("n(n + 1)", 2)}. Avec n = 12 : ${frac("12 × 13", 2)} = <span class="big">78 coups</span>.`,
      consigne: "Combien vaut 1 + 2 + 3 + … + 12 ?",
      verification: { type: "qcm", choix: ["78", "144", "66"], bonne: 0 },
      dessin: horloge,
    },
    {
      tag: "Énigme 4 · La chaîne de la collecte",
      titre: "Une somme géométrique",
      question: `Pour une collecte de jouets, Sacha prévient 3 personnes le jour 1. Chaque jour, chaque nouvelle personne en prévient 3 autres.<br>Le jour 0, seule Sacha est au courant ; le jour 1, 3 personnes ; le jour 2, 9 personnes…<br><br><b>Combien de personnes sont au courant au total à la fin du jour 5</b> ?`,
      reponse: `1 + 3 + 3² + … + 3⁵ = ${frac("3⁶ − 1", "3 − 1")} = ${frac(728, 2)} = <span class="big">364 personnes</span>.`,
      consigne: "Combien vaut 1 + 3 + 9 + 27 + 81 + 243 ?",
      verification: { type: "courte", attendus: ["364"], unite: "personnes" },
      dessin: chaine,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le placement de la grand-mère",
      sorte: "piege",
      question: `La grand-mère de Sarah place 1 000 € à 5 % par an, à intérêts composés : chaque année, le capital est multiplié par 1,05.<br>Tom : « En 10 ans, ça fait 10 × 5 % = +50 %. »<br><br><b>De combien le capital a-t-il augmenté en 10 ans</b> ?`,
      reponse: `C'est une suite géométrique de raison 1,05 : u<sub>10</sub> = 1 000 × 1,05<sup>10</sup> ≈ 1 628,89 €.<br>La hausse est d'environ <span class="big">+62,9 %</span> : les intérêts produisent eux aussi des intérêts.`,
      consigne: "1 000 € à 5 % par an, intérêts composés : quelle hausse en 10 ans ?",
      verification: { type: "qcm", choix: ["+50 %", "≈ +62,9 %", "+5 %"], bonne: 1 },
      dessin: placement,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le super-ballon",
      sorte: "defi",
      question: `Noé lâche un super-ballon d'une hauteur de 2 m. À chaque rebond, il remonte à la moitié de la hauteur d'où il est tombé.<br><br><b>Quelle distance totale parcourt-il</b> (montées et descentes), si on le laisse rebondir sans fin ?`,
      reponse: `Il descend 2 m, puis monte et descend 1 m, puis 0,5 m, etc. : D = 2 + 2 × (1 + 0,5 + 0,25 + …).<br>1 + 0,5 + … + 0,5<sup>n</sup> = ${frac("1 − 0,5<sup>n+1</sup>", "1 − 0,5")} tend vers 2. Donc D = 2 + 2 × 2 = <span class="big">6 m</span>.`,
      consigne: "Lâché de 2 m, il remonte à chaque fois à la moitié. Distance totale ?",
      verification: { type: "qcm", choix: ["4 m", "infinie", "6 m"], bonne: 2 },
      dessin: ballon,
    },
  ],
};

export default problemes;
