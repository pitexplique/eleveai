// Énigmes à projeter — première spé maths, notion probabilites_conditionnelles
// (les spectateurs du festival de jazz, la couveuse de la ferme pédagogique,
// les avocats du primeur, le marché de Noël, piège du chien renifleur de la
// douane, défi des chatons du vétérinaire). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { arbre2, tableau } from "../dessins-2de";
import { ind } from "../dessins-tle";
import { frac } from "../outils";

const jazz = svg("Tableau croisé des 400 spectateurs du festival : 75 adultes et 25 jeunes abonnés, 165 adultes et 135 jeunes non abonnés ; 100 abonnés en tout",
  tableau(15, 40, [110, 115, 130, 105], 58, [["", "abonné", "non abonné", "total"], ["adulte", 75, 165, 240], ["jeune", 25, 135, 160], ["total", 100, 300, 400]],
    (i, j) => (i === 0 || j === 0 ? C.pale : (i === 2 && j === 1) || (i === 3 && j === 1) ? C.jaune : C.craie), 22) +
    t(240, 320, "A : abonné · J : jeune", C.pale, 22) + t(240, 385, `${ind("P", "A", "(J)")}${NB}?`, C.rose, 30));

const couveuse = svg("Arbre pondéré de la couveuse : 0,8 des œufs sont fécondés, et un œuf fécondé éclot avec 0,9 ; un œuf non fécondé n'éclot jamais",
  arbre2([["F", "0,8"], ["F̄", "0,2"]], [[["E", "0,9"], ["Ē", "0,1"]], [["E", "0"], ["Ē", "1"]]]) +
    t(240, 395, `P(F ∩ E)${NB}?`, C.rose, 28));

const avocats = svg("Arbre pondéré des avocats : 0,6 viennent du producteur A, dont 0,05 sont abîmés ; 0,4 viennent du producteur B, dont 0,1 sont abîmés",
  arbre2([["A", "0,6"], ["B", "0,4"]], [[["M", "0,05"], ["M̄", "0,95"]], [["M", "0,1"], ["M̄", "0,9"]]]) +
    t(240, 395, `P(M)${NB}?`, C.rose, 28));

const noel = svg("Au marché de Noël : 40 % des visiteurs achètent du vin chaud, 30 % des marrons, 12 % les deux",
  r(40, 50, 400, 210, C.craie, 0.04, 3, 12) +
    t(240, 105, "V : vin chaud · P(V) = 0,4", C.bleu, 24) + t(240, 160, "M : marrons · P(M) = 0,3", C.jaune, 24) +
    t(240, 215, "P(V ∩ M) = 0,12", C.craie, 24) + t(240, 360, `V et M${NB}?`, C.rose, 30));

const chien = svg("Le chien de la douane : 2 % des valises cachent un produit interdit ; le chien aboie pour 95 % d'entre elles, et pour 5 % des valises normales",
  arbre2([["I", "0,02"], ["Ī", "0,98"]], [[["A", "0,95"], ["Ā", "0,05"]], [["A", "0,05"], ["Ā", "0,95"]]]) +
    t(240, 395, `${ind("P", "A", "(I)")}${NB}?`, C.rose, 28));

const chatons = svg("Les quatre portées possibles de deux chatons, également probables : MM, MF, FM, FF ; au moins une femelle laisse trois cas, dont un seul FF",
  [["M M", 0], ["M F", 1], ["F M", 1], ["F F", 2]].map(([s, k], i) =>
    r(40 + 104 * i, 80, 88, 80, k ? (k === 2 ? C.jaune : C.bleu) : C.pale, k ? 0.3 : 0.08, 3, 10) + t(84 + 104 * i, 132, s, k ? C.craie : C.pale, 26)).join("") +
    t(240, 230, "M : mâle · F : femelle", C.pale, 22) + t(240, 275, "« au moins une femelle »", C.bleu, 24) +
    t(240, 375, `P(deux femelles)${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "probabilites_conditionnelles",
  titre: "Énigmes des probabilités conditionnelles",
  description: "Les spectateurs du festival de jazz, la couveuse de la ferme pédagogique, les avocats du primeur, le marché de Noël, le piège du chien renifleur de la douane, le défi des chatons : tableau croisé, arbre pondéré, probabilités totales, indépendance, P sachant A de B ou de A.",
  problemes: [
    {
      tag: "Énigme 1 · Le festival de jazz",
      titre: "Lire un tableau croisé",
      question: `Un festival de jazz compte 400 spectateurs (tableau). On interroge au hasard un spectateur <b>abonné</b>.<br><br><b>Quelle est la probabilité que ce soit un jeune</b> ?`,
      reponse: `On ne regarde que la colonne « abonné » : 100 abonnés, dont 25 jeunes.<br>P<sub>A</sub>(J) = ${frac(25, 100)} = <span class="big">0,25</span>.`,
      consigne: "100 abonnés, dont 25 jeunes : que vaut la probabilité qu'un abonné soit jeune ?",
      verification: { type: "courte", attendus: ["0,25", "0.25", "1/4", "25/100", "25%", "25 %"] },
      dessin: jazz,
    },
    {
      tag: "Énigme 2 · La couveuse",
      titre: "La règle du produit",
      question: `À la ferme pédagogique, 80 % des œufs de la couveuse sont fécondés. Un œuf fécondé éclot avec une probabilité de 0,9.<br><br><b>Que vaut P(F ∩ E)</b> : l'œuf est fécondé et il éclot ?`,
      reponse: `On multiplie le long du chemin F puis E : P(F ∩ E) = P(F) × P<sub>F</sub>(E) = 0,8 × 0,9.<br>P(F ∩ E) = <span class="big">0,72</span> : environ 72 poussins pour 100 œufs.`,
      consigne: "P(F) = 0,8 et P sachant F de E = 0,9 : que vaut P(F ∩ E) ?",
      verification: { type: "courte", attendus: ["0,72", "0.72", "72%", "72 %", "72/100", "18/25"] },
      dessin: couveuse,
    },
    {
      tag: "Énigme 3 · Les avocats du primeur",
      titre: "Les probabilités totales",
      question: `Un primeur achète 60 % de ses avocats au producteur A et 40 % au producteur B. Chez A, 5 % sont abîmés ; chez B, 10 %.<br><br><b>Quelle est la probabilité qu'un avocat pris au hasard soit abîmé</b> ?`,
      reponse: `Deux chemins mènent à M : P(M) = 0,6 × 0,05 + 0,4 × 0,1 = 0,03 + 0,04.<br>P(M) = <span class="big">0,07</span> : 7 % des avocats sont abîmés.`,
      consigne: "A : 60 %, dont 5 % abîmés ; B : 40 %, dont 10 % abîmés. Que vaut P(M) ?",
      verification: { type: "courte", attendus: ["0,07", "0.07", "7%", "7 %", "7/100"] },
      dessin: avocats,
    },
    {
      tag: "Énigme 4 · Le marché de Noël",
      titre: "Indépendants ou incompatibles ?",
      question: `Au marché de Noël, 40 % des visiteurs achètent du vin chaud (V), 30 % des marrons (M), et 12 % les deux.<br><br><b>Les événements V et M sont-ils indépendants, incompatibles, ou ni l'un ni l'autre</b> ?`,
      reponse: `P(V) × P(M) = 0,4 × 0,3 = 0,12 = P(V ∩ M) : V et M sont <span class="big">indépendants</span>.<br>Ils ne sont pas incompatibles : 12 % des visiteurs achètent les deux (incompatibles voudrait dire P(V ∩ M) = 0).`,
      consigne: "P(V) = 0,4, P(M) = 0,3, P(V ∩ M) = 0,12 : V et M sont…",
      verification: { type: "qcm", choix: ["incompatibles", "indépendants", "ni l'un ni l'autre"], bonne: 1 },
      dessin: noel,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le chien renifleur",
      sorte: "piege",
      question: `À la douane, 2 % des valises cachent un produit interdit (I). Le chien aboie (A) pour 95 % d'entre elles, mais aussi pour 5 % des valises normales. Il aboie.<br>Léo : « Il y a 95 % de chances que la valise soit interdite. »<br><br><b>Que vaut P<sub>A</sub>(I)</b> ?`,
      reponse: `95 %, c'est P<sub>I</sub>(A), pas P<sub>A</sub>(I). P(A) = 0,02 × 0,95 + 0,98 × 0,05 = 0,019 + 0,049 = 0,068.<br>P<sub>A</sub>(I) = ${frac("0,019", "0,068")} ≈ <span class="big">0,28</span> : environ 28 % seulement, car les valises normales sont très nombreuses.`,
      consigne: "P(I) = 0,02, P sachant I de A = 0,95, P sachant Ī de A = 0,05 : que vaut P sachant A de I ?",
      verification: { type: "qcm", choix: ["environ 28 %", "95 %", "2 %"], bonne: 0 },
      dessin: chien,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les chatons du vétérinaire",
      sorte: "defi",
      question: `Une chatte a eu deux chatons. Chaque chaton est mâle ou femelle avec la même probabilité, indépendamment. Le vétérinaire dit : « Il y a au moins une femelle. »<br><br><b>Quelle est la probabilité que les deux soient des femelles</b> ?`,
      reponse: `Quatre cas également probables : MM, MF, FM, FF. « Au moins une femelle » garde MF, FM et FF.<br>Un seul de ces trois cas est FF : la probabilité vaut <span class="big">${frac(1, 3)}</span> (et non ${frac(1, 2)}).`,
      consigne: "Deux chatons, au moins une femelle : quelle est la probabilité de deux femelles ?",
      verification: { type: "qcm", choix: ["1/2", "1/4", "1/3"], bonne: 2 },
      dessin: chatons,
    },
  ],
};

export default problemes;
