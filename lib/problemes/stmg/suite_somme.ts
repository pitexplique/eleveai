// Énigmes à projeter — STMG (Tle), somme des n premiers termes (la mosaïste,
// la carrière de pierre, la ferme hydroponique, la fabrique de nems, piège de
// l'atelier de chaudronnerie, défi des lampions). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { ind } from "../dessins-tle";

/** Une rangée de cases (en-tête en haut, valeur dedans), « … » possible, puis deux lignes de texte. */
const cases = (aria: string, tetes: string[], vals: string[], ligne1: string, ligne2: string, w = 84, taille = 22) => {
  const x0 = 240 - (tetes.length * w) / 2;
  return svg(aria,
    tetes.map((h, k) => t(x0 + k * w + w / 2, 70, h, C.pale, 19) +
      r(x0 + k * w + 4, 88, w - 8, 70, vals[k] === "?" ? C.rose : C.bleu, 0.12, 3) +
      t(x0 + k * w + w / 2, 132, vals[k], vals[k] === "?" ? C.rose : C.craie, vals[k] === "?" ? 30 : taille)).join("") +
      r(40, 200, 400, 60, C.jaune, 0.12, 3) + t(240, 239, ligne1, C.craie, 23) +
      t(240, 360, ligne2, C.rose, 27));
};

const mosaiste = svg("La mosaïste : u indice k, carreaux posés le jour k : 12, 15, 18, 21 ; somme de k égale 1 à 4 de u indice k ?",
  [12, 15, 18, 21].map((v, k) => t(78 + k * 108, 60, `jour ${k + 1}`, C.pale, 19) +
    r(40 + k * 108, 75, 76, 60, C.bleu, 0.12, 3) + t(78 + k * 108, 115, String(v), C.craie, 26)).join("") +
    t(190, 240, "4", C.craie, 22) + t(190, 290, "Σ", C.jaune, 70) + t(190, 322, "k = 1", C.craie, 20) +
    t(250, 284, ind("u", "k"), C.craie, 34, "start") + t(300, 284, `=${NB}?`, C.rose, 34, "start"));

const carriere = cases("La carrière de pierre : 200 tonnes le mois 1, 20 tonnes de plus chaque mois ; total sur 12 mois ?",
  ["mois 1", "mois 2", "mois 3", "…", "mois 12"], ["200 t", "220 t", "240 t", "…", "?"],
  "+ 20 t chaque mois", `total sur 12 mois${NB}?`);

const hydro = cases("La ferme hydroponique : 1 000 kg de salades l'année 1, plus 10 % chaque année ; total sur 3 ans ?",
  ["année 1", "année 2", "année 3"], [`1${NB}000`, "?", "?"], "+ 10 % chaque année", `total sur 3 ans${NB}?`, 110, 24);

const nems = cases("La fabrique de nems : 150 nems le jour 1, 30 de plus chaque jour ; total sur 6 jours ?",
  ["jour 1", "jour 2", "jour 3", "…", "jour 6"], ["150", "180", "210", "…", "?"],
  "+ 30 nems chaque jour", `total sur 6 jours${NB}?`);

const chaudron = svg("L'atelier de chaudronnerie : u indice 0 égale 500, 50 de plus chaque mois, jusqu'à u indice 10 ; combien de termes ?",
  ["0", "1", "2", "…", "10"].map((n, k) => t(88 + k * 76, 70, n === "…" ? "…" : ind("u", n), C.pale, 24) +
    r(54 + k * 76, 88, 68, 64, C.bleu, 0.12, 3) +
    t(88 + k * 76, 130, ["500", "550", "600", "…", `1${NB}000`][k], C.craie, 20)).join("") +
    r(40, 200, 400, 60, C.jaune, 0.12, 3) + t(240, 239, `de ${ind("u", 0)} à ${ind("u", 10)}`, C.craie, 26) +
    t(240, 360, `combien de termes${NB}?`, C.rose, 27));

const lampions = cases("Les lampions : 1 le jour 1, 2 le jour 2, 3 le jour 3, un de plus chaque jour ; 210 en tout, combien de jours ?",
  ["jour 1", "jour 2", "jour 3", "…", "jour n"], ["1", "2", "3", "…", "n"],
  `total${NB}: 210 lampions`, `n${NB}=${NB}?`);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "suite_somme",
  titre: "Énigmes de la somme des n premiers termes",
  description: "La mosaïste, la carrière de pierre, la ferme hydroponique, la fabrique de nems, le piège de l'atelier de chaudronnerie, le défi des lampions : lire la notation Σ et additionner les termes d'une suite arithmétique ou géométrique.",
  problemes: [
    {
      tag: "Énigme 1 · La mosaïste",
      titre: "Lire la notation Σ",
      question: `Une mosaïste pose des carreaux sur une fresque.<br>u<sub>k</sub> est le nombre de carreaux posés le jour k.<br>u<sub>1</sub> = 12, u<sub>2</sub> = 15, u<sub>3</sub> = 18, u<sub>4</sub> = 21.<br><br><b>Combien vaut</b> la somme des u<sub>k</sub> pour k allant de 1 à 4 ?`,
      reponse: `Le symbole Σ veut dire : on additionne tous les termes, de k = 1 à k = 4.<br>12 + 15 + 18 + 21 = <span class="big">66</span> carreaux en 4 jours.`,
      consigne: "Combien vaut la somme ?",
      verification: { type: "courte", attendus: ["66"] },
      dessin: mosaiste,
    },
    {
      tag: "Énigme 2 · La carrière de pierre",
      titre: "Somme d'une suite arithmétique",
      question: `Une carrière extrait 200 tonnes de pierre le premier mois.<br>Chaque mois, elle extrait 20 tonnes de plus.<br><br><b>Combien de tonnes</b> en tout sur 12 mois ?`,
      reponse: `Le 12e mois : 200 + 11 × 20 = 420 t.<br>Somme = nombre de termes × (premier + dernier) ÷ 2.<br>12 × (200 + 420) ÷ 2 = 12 × 310 = <span class="big">3 720 t</span>.`,
      consigne: "Combien de tonnes en tout sur 12 mois ?",
      verification: { type: "qcm", choix: ["3 720 t", "5 040 t", "420 t"], bonne: 0 },
      dessin: carriere,
    },
    {
      tag: "Énigme 3 · La ferme hydroponique",
      titre: "Somme d'une suite géométrique",
      question: `Une ferme hydroponique vend 1 000 kg de salades la première année.<br>Chaque année, les ventes augmentent de 10 %.<br><br><b>Combien de kilos</b> en tout sur 3 ans ?`,
      reponse: `Suite géométrique de raison 1,1 : 1 000 ; 1 100 ; 1 210.<br>1 000 + 1 100 + 1 210 = <span class="big">3 310 kg</span>.<br>Avec la formule : 1 000 × (1 − 1,1³) ÷ (1 − 1,1) = 1 000 × 0,331 ÷ 0,1 = 3 310.`,
      consigne: "Combien de kilos en tout sur 3 ans ?",
      verification: { type: "qcm", choix: ["3 300 kg", "3 630 kg", "3 310 kg"], bonne: 2 },
      dessin: hydro,
    },
    {
      tag: "Énigme 4 · La fabrique de nems",
      titre: "Le total de la semaine",
      question: `Une fabrique de nems en roule 150 le premier jour.<br>Chaque jour, elle en roule 30 de plus.<br><br><b>Combien de nems</b> en tout sur 6 jours ?`,
      reponse: `Le 6e jour : 150 + 5 × 30 = 300 nems.<br>6 × (150 + 300) ÷ 2 = 6 × 225 = <span class="big">1 350</span> nems.<br>Vérification : 150 + 180 + 210 + 240 + 270 + 300 = 1 350.`,
      consigne: "Combien de nems en tout sur 6 jours ?",
      verification: { type: "qcm", choix: ["1 800", "1 350", "900"], bonne: 1 },
      dessin: nems,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'atelier de chaudronnerie",
      sorte: "piege",
      question: `Un atelier de chaudronnerie fabrique u<sub>0</sub> = 500 pièces le mois 0.<br>Chaque mois, il en fabrique 50 de plus, jusqu'au mois 10 : u<sub>10</sub> = 1 000.<br>Le chef calcule : 10 × (500 + 1 000) ÷ 2 = 7 500.<br><br><b>Quel est le bon total</b> de u<sub>0</sub> à u<sub>10</sub> ?`,
      reponse: `De u<sub>0</sub> à u<sub>10</sub>, il y a 11 termes, pas 10 : on compte le mois 0.<br>11 × (500 + 1 000) ÷ 2 = 11 × 750 = <span class="big">8 250</span> pièces.`,
      consigne: "Quel est le total de u₀ à u₁₀ ?",
      verification: { type: "courte", attendus: ["8250", "8 250"] },
      dessin: chaudron,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les lampions",
      sorte: "defi",
      question: `Une boutique fabrique des lampions pour une fête.<br>Le jour 1 : 1 lampion. Le jour 2 : 2. Le jour 3 : 3. Chaque jour, un de plus.<br>Il faut 210 lampions en tout.<br><br><b>Combien de jours</b> faut-il ?`,
      reponse: `1 + 2 + … + n = n × (n + 1) ÷ 2.<br>On cherche n × (n + 1) = 420 : 20 × 21 = 420.<br>Il faut <span class="big">20 jours</span>.`,
      consigne: "Combien de jours faut-il ?",
      verification: { type: "courte", attendus: ["20", "20 jours"] },
      dessin: lampions,
    },
  ],
};

export default problemes;
