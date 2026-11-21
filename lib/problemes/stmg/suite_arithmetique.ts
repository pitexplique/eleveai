// Énigmes à projeter — STMG (1re), notion suite arithmétique : reconnaître
// (le club d'aviron, le parc photovoltaïque, le stock de gants de
// l'hôpital, le tunnelier, piège de l'agence de location de costumes, défi
// du salon de manucure). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, fleche } from "../dessins-ecole";

const IND = ["₀", "₁", "₂", "₃", "₄"];

function ligne(vals: string[], ecarts: string[], cEcart: string) {
  let s = "";
  for (let k = 0; k < vals.length; k++) {
    const x = 30 + k * 115;
    const der = vals[k] === "?";
    s += r(x, 150, 90, 70, der ? C.rose : C.bleu, 0.18, 3, 8) + t(x + 45, 196, vals[k], der ? C.rose : C.craie, 26);
    if (k < vals.length - 1) s += fleche(x + 92, 185, x + 113, 185, cEcart, 3) + t(x + 102, 260, ecarts[k], cEcart, 18);
  }
  return s;
}

const aviron = svg("Le club d'aviron : cotisations 85, 92, 99, 106 euros sur quatre années ; on cherche la raison",
  t(240, 70, "cotisation (€)", C.pale, 24) + ligne(["85", "92", "99", "106"], ["?", "?", "?"], C.jaune) +
    t(240, 350, `raison r${NB}=${NB}?`, C.rose, 30));

let barres = "";
for (let k = 0; k <= 4; k++) {
  const h = 60 + k * 30;
  barres += r(70 + k * 75, 320 - h, 50, h, k === 4 ? C.rose : C.jaune, 0.35, 3, 4) + t(95 + k * 75, 350, `u${IND[k]}`, C.pale, 20);
}
const photovoltaique = svg("Le parc photovoltaïque : u indice 0 égale 1 200 mégawattheures, plus 150 chaque année ; u indice 4 ?",
  t(240, 60, "uₙ₊₁ = uₙ + 150", C.craie, 30) + t(240, 110, "u₀ = 1 200 MWh", C.pale, 24) + barres +
    t(240, 400, `u₄${NB}=${NB}?`, C.rose, 28));

const gants = svg("Le stock de gants de l'hôpital : u indice n plus 1 égale u indice n moins 120 boîtes ; sens de variation ?",
  r(60, 80, 360, 100, C.bleu, 0.15, 3, 10) + t(240, 142, "uₙ₊₁ = uₙ − 120", C.craie, 32) +
    t(240, 250, "raison r = − 120", C.pale, 26) + t(240, 330, `croissante${NB}? décroissante${NB}?`, C.rose, 26));

const tunnelier = svg("Le tunnelier : u indice n égale 300 plus 25 n mètres creusés ; on calcule u indice n plus 1 moins u indice n",
  r(60, 70, 360, 90, C.bleu, 0.15, 3, 10) + t(240, 128, "uₙ = 300 + 25n", C.craie, 32) +
    t(240, 240, "uₙ₊₁ − uₙ = ?", C.pale, 28) + t(240, 330, `arithmétique${NB}? raison${NB}?`, C.rose, 26));

const costumes = svg("L'agence de location de costumes : 12, 15, 18, 22 costumes loués ; est-ce une suite arithmétique ?",
  t(240, 70, "costumes loués", C.pale, 24) + ligne(["12", "15", "18", "22"], ["+3", "+3", "+4"], C.jaune) +
    t(240, 350, `arithmétique${NB}?`, C.rose, 30));

const manucure = svg("Le salon de manucure : u indice 0 égale 40 clientes, u indice 8 égale 88 ; suite arithmétique, raison ?",
  `<line x1="40" y1="200" x2="440" y2="200" stroke="${C.craie}" stroke-width="3"/>` +
    [0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => `<circle cx="${60 + k * 45}" cy="200" r="7" fill="${k === 0 || k === 8 ? C.rose : C.bleu}"/>`).join("") +
    t(60, 170, "u₀", C.pale, 20) + t(420, 170, "u₈", C.pale, 20) + t(60, 245, "40", C.craie, 24) + t(420, 245, "88", C.craie, 24) +
    t(240, 320, "8 pas de + r", C.pale, 24) + t(240, 385, `r${NB}=${NB}?`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "suite_arithmetique",
  titre: "Énigmes pour reconnaître une suite arithmétique",
  description: "Le club d'aviron, le parc photovoltaïque, le stock de gants de l'hôpital, le tunnelier, le piège de l'agence de location de costumes, le défi du salon de manucure : trouver la raison, utiliser uₙ₊₁ = uₙ + r, le sens de variation, montrer qu'une suite est arithmétique.",
  problemes: [
    {
      tag: "Énigme 1 · Le club d'aviron",
      titre: "Trouver la raison",
      question: `La cotisation d'un club d'aviron vaut 85 €, puis 92 €, 99 € et 106 €.<br>On ajoute toujours le même nombre.<br><br><b>Quelle est la raison</b> de cette suite ?`,
      reponse: `On fait la différence de deux termes qui se suivent.<br>92 − 85 = 7, 99 − 92 = 7, 106 − 99 = 7.<br>Raison <span class="big">r = 7 €</span>.`,
      consigne: "Cotisations : 85 ; 92 ; 99 ; 106. Quelle est la raison ?",
      verification: { type: "courte", attendus: ["7"], unite: "€" },
      dessin: aviron,
    },
    {
      tag: "Énigme 2 · Le parc photovoltaïque",
      titre: "u(n+1) = u(n) + r",
      question: `Un parc photovoltaïque produit 1 200 MWh l'année 0 : u<sub>0</sub> = 1 200.<br>On ajoute des panneaux : + 150 MWh par an.<br>Donc u<sub>n+1</sub> = u<sub>n</sub> + 150.<br><br><b>Combien vaut</b> u<sub>4</sub> ?`,
      reponse: `4 ans, c'est 4 fois + 150.<br>1 200 + 4 × 150 = 1 200 + 600 = <span class="big">1 800 MWh</span>.`,
      consigne: "u₀ = 1 200 et uₙ₊₁ = uₙ + 150. Calcule u₄.",
      verification: { type: "courte", attendus: ["1800", "1 800"], unite: "MWh" },
      dessin: photovoltaique,
    },
    {
      tag: "Énigme 3 · Les gants de l'hôpital",
      titre: "Le sens de variation",
      question: `Un hôpital a un stock de boîtes de gants.<br>Chaque semaine, il en utilise 120.<br>Donc u<sub>n+1</sub> = u<sub>n</sub> − 120.<br><br><b>La suite est-elle croissante ou décroissante</b> ?`,
      reponse: `C'est une suite arithmétique de raison r = − 120.<br>r est négatif : chaque terme est plus petit que le précédent.<br>La suite est <span class="big">décroissante</span>.`,
      consigne: "uₙ₊₁ = uₙ − 120. Quel est le sens de variation ?",
      verification: { type: "qcm", choix: ["croissante", "décroissante", "constante"], bonne: 1 },
      dessin: gants,
    },
    {
      tag: "Énigme 4 · Le tunnelier",
      titre: "Montrer qu'elle est arithmétique",
      question: `Un tunnelier a creusé u<sub>n</sub> = 300 + 25n mètres au jour n.<br>Pour montrer que la suite est arithmétique, on calcule u<sub>n+1</sub> − u<sub>n</sub>.<br><br><b>Combien vaut</b> u<sub>n+1</sub> − u<sub>n</sub> ?`,
      reponse: `u<sub>n+1</sub> = 300 + 25(n + 1) = 300 + 25n + 25.<br>u<sub>n+1</sub> − u<sub>n</sub> = 25 : le même nombre pour tout n.<br>La suite est arithmétique de raison <span class="big">25 m</span>.`,
      consigne: "uₙ = 300 + 25n. Combien vaut uₙ₊₁ − uₙ ?",
      verification: { type: "courte", attendus: ["25"], unite: "m" },
      dessin: tunnelier,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La location de costumes",
      sorte: "piege",
      question: `Une agence loue 12 costumes, puis 15, 18 et 22.<br>Inès : « + 3, + 3… c'est arithmétique, de raison 3. »<br><br><b>Inès a-t-elle raison</b> ?`,
      reponse: `Il faut regarder TOUS les écarts.<br>15 − 12 = 3, 18 − 15 = 3, mais 22 − 18 = 4.<br>L'écart change : <span class="big">non, elle n'est pas arithmétique</span>.`,
      consigne: "12 ; 15 ; 18 ; 22. Est-ce une suite arithmétique ?",
      verification: { type: "qcm", choix: ["Non", "Oui, de raison 3", "Oui, de raison 4"], bonne: 0 },
      dessin: costumes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le salon de manucure",
      sorte: "defi",
      question: `Un salon de manucure a 40 clientes le mois 0 : u<sub>0</sub> = 40.<br>Le mois 8, il en a 88 : u<sub>8</sub> = 88.<br>La suite est arithmétique.<br><br><b>Quelle est sa raison</b> ?`,
      reponse: `De u<sub>0</sub> à u<sub>8</sub>, on ajoute 8 fois la raison.<br>88 − 40 = 48, et 48 ÷ 8 = 6.<br>Raison <span class="big">r = 6 clientes</span> par mois.`,
      consigne: "u₀ = 40 et u₈ = 88 (arithmétique). Quelle est la raison ?",
      verification: { type: "qcm", choix: ["48", "11", "6"], bonne: 2 },
      dessin: manucure,
    },
  ],
};

export default problemes;
