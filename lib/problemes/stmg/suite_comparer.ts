// Énigmes à projeter — STMG (Tle), comparer deux suites (les deux restaurants
// de tacos, le club de water-polo, la vidéaste, le vendeur de bateaux
// pneumatiques, piège du club de cyclisme, défi de la joueuse de roller
// derby). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

/** Un tableau de valeurs en colonnes : n en haut, puis une ligne par suite. */
const tab = (tete: string, ns: string[], lignes: { nom: string; vals: string[]; c: string }[], y = 40, w = 50, taille = 17) => {
  const x0 = 470 - ns.length * w;
  let s = r(10, y, x0 - 10, 50, C.pale, 0.3, 2) + t((10 + x0) / 2, y + 33, tete, C.craie, 18);
  ns.forEach((n, k) => (s += r(x0 + k * w, y, w, 50, C.pale, 0.3, 2) + t(x0 + k * w + w / 2, y + 33, n, C.craie, 20)));
  lignes.forEach((L, i) => {
    const yy = y + 50 + i * 50;
    s += r(10, yy, x0 - 10, 50, L.c, 0.25, 2) + t((10 + x0) / 2, yy + 33, L.nom, C.craie, 20);
    L.vals.forEach((v, k) => (s += r(x0 + k * w, yy, w, 50, L.c, 0.1, 2) + t(x0 + k * w + w / 2, yy + 33, v, C.craie, taille)));
  });
  return s;
};

/** Deux offres côte à côte (A en bleu, B en jaune), puis la question. */
const offres = (aria: string, a: string[], b: string[], question: string, taille = 22) =>
  svg(aria,
    r(20, 40, 210, 200, C.bleu, 0.12, 3, 12) + t(125, 85, "A", C.bleu, 34) +
    a.map((s, k) => t(125, 140 + k * 42, s, C.craie, taille)).join("") +
    r(250, 40, 210, 200, C.jaune, 0.12, 3, 12) + t(355, 85, "B", C.jaune, 34) +
    b.map((s, k) => t(355, 140 + k * 42, s, C.craie, taille)).join("") +
    t(240, 350, question, C.rose, 27));

const mois = ["0", "1", "2", "3", "4", "5", "6", "7"];
const tacos = svg("Deux restaurants de tacos : A part de 500 clients, plus 10 % par mois ; B part de 800, plus 2 % par mois ; mois 0 à 7 ; quand A dépasse B ?",
  tab("mois", mois, [
    { nom: "A", vals: ["500", "550", "605", "666", "732", "805", "886", "974"], c: C.bleu },
    { nom: "B", vals: ["800", "816", "832", "849", "866", "883", "901", "919"], c: C.jaune },
  ]) +
    t(240, 250, "A : + 10 % par mois · B : + 2 % par mois", C.pale, 20) +
    t(240, 350, `A dépasse B au mois${NB}?`, C.rose, 27));

const waterPolo = offres("Le club de water-polo : offre A, 1 500 euros plus 100 euros par an ; offre B, 1 500 euros plus 4 % par an ; après 10 ans ?",
  [`1${NB}500 €`, "+ 100 € par an"], [`1${NB}500 €`, "+ 4 % par an"], `après 10 ans${NB}?`);

const videaste = offres("La vidéaste : 2 000 euros à 5 % pendant 2 ans ; A intérêts simples, B intérêts composés ; combien de plus avec B ?",
  [`2${NB}000 €`, "5 % par an", "intérêts simples"], [`2${NB}000 €`, "5 % par an", "intérêts composés"], `B donne combien de plus${NB}?`, 21);

const pneumatiques = svg("Le vendeur de bateaux pneumatiques : crédit à 1 % par mois ; quel taux annuel équivalent ?",
  r(110, 50, 260, 150, C.bleu, 0.12, 3, 14) + t(240, 100, "crédit", C.pale, 22) + t(240, 160, "1 % par mois", C.craie, 32) +
    t(240, 250, "12 mois de suite", C.pale, 24) + t(240, 350, `taux par an${NB}?`, C.rose, 28));

const cyclisme = svg("Le club de cyclisme : 10 000 euros placés à 10 % par an, intérêts composés, pendant 3 ans ; combien à la fin ?",
  r(110, 50, 260, 150, C.jaune, 0.12, 3, 14) + t(240, 100, "placement", C.pale, 22) + t(240, 160, `10${NB}000 €`, C.craie, 32) +
    t(240, 250, "10 % par an · 3 ans", C.pale, 24) + t(240, 350, `à la fin${NB}?`, C.rose, 28));

const roller = svg("La joueuse de roller derby : sponsor A, 100 euros plus 20 euros par semaine ; sponsor B, 1 euro doublé chaque semaine ; semaine 0 à 3 ; quand B dépasse A ?",
  tab("semaine", ["0", "1", "2", "3", "…"], [
    { nom: "A", vals: ["100", "120", "140", "160", "…"], c: C.bleu },
    { nom: "B", vals: ["1", "2", "4", "8", "…"], c: C.jaune },
  ], 40, 64, 20) +
    t(240, 250, "A : + 20 € · B : × 2", C.pale, 22) +
    t(240, 350, `B dépasse A en semaine${NB}?`, C.rose, 27));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "suite_comparer",
  titre: "Énigmes pour comparer deux suites",
  description: "Les deux restaurants de tacos, le club de water-polo, la vidéaste, le vendeur de bateaux pneumatiques, le piège du club de cyclisme, le défi de la joueuse de roller derby : comparer deux suites géométriques, une suite arithmétique et une géométrique, intérêts simples et composés, taux équivalent et taux proportionnel.",
  problemes: [
    {
      tag: "Énigme 1 · Les deux restaurants de tacos",
      titre: "Deux suites géométriques",
      question: `Le restaurant A a 500 clients ce mois-ci : + 10 % chaque mois.<br>Le restaurant B a 800 clients : + 2 % chaque mois.<br><br><b>À partir de quel mois</b> A a-t-il plus de clients que B ?`,
      reponse: `Au mois 6 : A ≈ 886 et B ≈ 901 : B est encore devant.<br>Au mois 7 : A ≈ 974 et B ≈ 919.<br>A dépasse B au <span class="big">mois 7</span> : le plus fort pourcentage finit toujours par gagner.`,
      consigne: "À partir de quel mois ?",
      verification: { type: "courte", attendus: ["7", "mois 7"] },
      dessin: tacos,
    },
    {
      tag: "Énigme 2 · Le club de water-polo",
      titre: "Arithmétique ou géométrique",
      question: `Un sponsor propose deux contrats à un club de water-polo.<br>A : 1 500 € la première année, puis 100 € de plus chaque année.<br>B : 1 500 € la première année, puis + 4 % chaque année.<br>On donne 1,04<sup>10</sup> ≈ 1,48.<br><br><b>Quel contrat</b> donne le plus dans 10 ans ?`,
      reponse: `A (arithmétique) : 1 500 + 10 × 100 = 2 500 €.<br>B (géométrique) : 1 500 × 1,04<sup>10</sup> ≈ 1 500 × 1,48 = 2 220 €.<br>Dans 10 ans, c'est <span class="big">A</span>. (Beaucoup plus tard, B passera devant.)`,
      consigne: "Quel contrat donne le plus dans 10 ans ?",
      verification: { type: "qcm", choix: ["A : 2 500 €", "B : environ 2 220 €", "ils sont égaux"], bonne: 0 },
      dessin: waterPolo,
    },
    {
      tag: "Énigme 3 · La vidéaste",
      titre: "Intérêts simples ou composés",
      question: `Une vidéaste place 2 000 € à 5 % par an pendant 2 ans.<br>Banque A : intérêts simples. Banque B : intérêts composés.<br><br><b>Combien d'euros de plus</b> avec la banque B ?`,
      reponse: `A : 100 € d'intérêts par an : 2 000 + 2 × 100 = 2 200 €.<br>B : 2 000 × 1,05 × 1,05 = 2 205 €.<br>B donne <span class="big">5 €</span> de plus : les intérêts de la 1re année rapportent aussi.`,
      consigne: "Combien d'euros de plus avec B ?",
      verification: { type: "courte", attendus: ["5", "5 €"] },
      dessin: videaste,
    },
    {
      tag: "Énigme 4 · Le vendeur de bateaux pneumatiques",
      titre: "Le taux équivalent",
      question: `Un vendeur de bateaux pneumatiques propose un crédit à 1 % par mois.<br>On donne 1,01<sup>12</sup> ≈ 1,1268.<br><br><b>Quel est le taux annuel</b> équivalent ?`,
      reponse: `12 % par an, c'est le taux proportionnel : 12 × 1 %. Il oublie les intérêts sur les intérêts.<br>Taux équivalent : 1,01<sup>12</sup> ≈ 1,1268, donc <span class="big">12,68 %</span> par an.`,
      consigne: "Quel est le taux annuel équivalent ?",
      verification: { type: "qcm", choix: ["12 %", "12,68 %", "11,36 %"], bonne: 1 },
      dessin: pneumatiques,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le club de cyclisme",
      sorte: "piege",
      question: `La trésorière d'un club de cyclisme place 10 000 € à 10 % par an pendant 3 ans.<br>Les intérêts sont composés.<br>Elle dit : « 3 × 10 % = 30 %, j'aurai 13 000 € ».<br><br><b>Combien aura-t-elle</b> vraiment ?`,
      reponse: `13 000 €, ce serait avec des intérêts simples.<br>Composés : 10 000 × 1,1 × 1,1 × 1,1 = 10 000 × 1,331 = <span class="big">13 310 €</span>.`,
      consigne: "Combien aura-t-elle au bout de 3 ans ?",
      verification: { type: "qcm", choix: ["13 000 €", "13 300 €", "13 310 €"], bonne: 2 },
      dessin: cyclisme,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La joueuse de roller derby",
      sorte: "defi",
      question: `Deux sponsors aident une joueuse de roller derby.<br>A : 100 € la semaine 0, puis 20 € de plus chaque semaine.<br>B : 1 € la semaine 0, puis le double chaque semaine.<br><br><b>À partir de quelle semaine</b> B donne-t-il plus que A ?`,
      reponse: `Semaine 8 : A = 100 + 8 × 20 = 260 € et B = 2<sup>8</sup> = 256 € : A est encore devant.<br>Semaine 9 : A = 280 € et B = 512 €.<br>B passe devant en <span class="big">semaine 9</span>.`,
      consigne: "À partir de quelle semaine ?",
      verification: { type: "courte", attendus: ["9", "semaine 9"] },
      dessin: roller,
    },
  ],
};

export default problemes;
