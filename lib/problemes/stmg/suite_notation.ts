// Énigmes à projeter — STMG (1re), notion suite : notation et modes de
// génération (le club de squash, la caisse de solidarité du CSE, les
// adhérents de la mutuelle, la marque de kombucha, piège de la crèche
// d'entreprise, défi des voitures en autopartage). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, fleche } from "../dessins-ecole";

const squash = svg("Le club de squash : u de n égale 120 plus 15 n abonnés au mois n ; on cherche u indice 4",
  r(60, 80, 360, 100, C.bleu, 0.15, 3, 10) + t(240, 142, "u(n) = 120 + 15n", C.craie, 32) +
    t(240, 250, "u(n) s'écrit aussi uₙ", C.pale, 24) + t(240, 330, `u₄${NB}=${NB}?`, C.rose, 32));

let cases = "";
const vals = ["200", "230", "260", "?"];
for (let k = 0; k < 4; k++) {
  const x = 30 + k * 115;
  cases += r(x, 150, 90, 70, k === 3 ? C.rose : C.bleu, 0.18, 3, 8) + t(x + 45, 196, vals[k], k === 3 ? C.rose : C.craie, 26) +
    t(x + 45, 130, `u${["₀", "₁", "₂", "₃"][k]}`, C.pale, 22);
  if (k < 3) cases += fleche(x + 92, 185, x + 113, 185, C.jaune, 3) + t(x + 102, 260, "+30", C.jaune, 18);
}
const cse = svg("La caisse de solidarité du CSE : u indice 0 égale 200, puis on ajoute 30 chaque mois ; u indice 3 ?",
  t(240, 60, "uₙ₊₁ = uₙ + 30", C.craie, 30) + cases + t(240, 350, `u₃${NB}=${NB}?`, C.rose, 30));

const mutuelle = svg("Trois écritures de suites : u indice n égale 500 plus 20 n ; u indice n plus 1 égale 1,02 fois u indice n ; u indice n égale 3 n au carré",
  r(60, 50, 360, 70, C.bleu, 0.12, 3, 10) + t(240, 97, "A.  uₙ = 500 + 20n", C.craie, 26) +
    r(60, 150, 360, 70, C.bleu, 0.12, 3, 10) + t(240, 197, "B.  uₙ₊₁ = 1,02 × uₙ", C.craie, 26) +
    r(60, 250, 360, 70, C.bleu, 0.12, 3, 10) + t(240, 297, "C.  uₙ = 3n²", C.craie, 26) +
    t(240, 385, `par récurrence${NB}?`, C.rose, 26));

let frise = "";
for (let k = 0; k <= 6; k++) {
  const x = 60 + k * 60;
  frise += `<circle cx="${x}" cy="200" r="7" fill="${k === 6 ? C.rose : C.bleu}"/>` + t(x, 175, `u${["₀", "₁", "₂", "₃", "₄", "₅", "₆"][k]}`, k === 6 ? C.rose : C.pale, 20);
}
const kombucha = svg("La marque de kombucha : u indice 0 pour l'année 2024, puis un terme par année jusqu'à u indice 6",
  `<line x1="40" y1="200" x2="440" y2="200" stroke="${C.craie}" stroke-width="3"/>` + frise +
    t(60, 240, "2024", C.pale, 18) + t(420, 240, "?", C.rose, 26) +
    t(240, 330, "1 terme = 1 année", C.pale, 24) + t(240, 385, `u₆${NB}: quelle année${NB}?`, C.rose, 26));

const creche = svg("La crèche d'entreprise : u indice n égale 2 n plus 10 places ; Tom calcule u indice 5 plus 1",
  r(60, 70, 360, 90, C.bleu, 0.15, 3, 10) + t(240, 128, "uₙ = 2n + 10", C.craie, 32) +
    t(240, 240, `Tom${NB}: « u₅₊₁ = u₅ + 1 »`, C.pale, 24) + t(240, 330, `u₅₊₁${NB}=${NB}?`, C.rose, 32));

const autopartage = svg("Les voitures en autopartage : u indice 0 égale 100 ; u indice n plus 1 égale 0,9 fois u indice n plus 20",
  r(50, 80, 380, 100, C.jaune, 0.2, 3, 10) + t(240, 120, "u₀ = 100", C.craie, 28) + t(240, 160, "uₙ₊₁ = 0,9 × uₙ + 20", C.craie, 28) +
    t(240, 250, "− 10 % puis + 20 voitures", C.pale, 22) + t(240, 340, `u₂${NB}=${NB}?`, C.rose, 32));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "suite_notation",
  titre: "Énigmes de notation des suites",
  description: "Le club de squash, la caisse de solidarité du CSE, les adhérents de la mutuelle, la marque de kombucha, le piège de la crèche d'entreprise, le défi des voitures en autopartage : passer de u(n) à uₙ, une suite par une formule ou par récurrence, l'indice et le rang.",
  problemes: [
    {
      tag: "Énigme 1 · Le club de squash",
      titre: "De u(n) à uₙ",
      question: `Un club de squash compte u(n) = 120 + 15n abonnés au mois n.<br>On écrit aussi u<sub>n</sub> à la place de u(n).<br><br><b>Combien vaut</b> u<sub>4</sub> ?`,
      reponse: `u<sub>4</sub> = u(4) : on remplace n par 4.<br>120 + 15 × 4 = 120 + 60 = <span class="big">180 abonnés</span>.`,
      consigne: "u(n) = 120 + 15n. Calcule u₄.",
      verification: { type: "courte", attendus: ["180"], unite: "abonnés" },
      dessin: squash,
    },
    {
      tag: "Énigme 2 · La caisse du CSE",
      titre: "Une suite par récurrence",
      question: `Le CSE d'une entreprise a une caisse de solidarité.<br>Au départ, u<sub>0</sub> = 200 €.<br>Chaque mois, on ajoute 30 € : u<sub>n+1</sub> = u<sub>n</sub> + 30.<br><br><b>Combien vaut</b> u<sub>3</sub> ?`,
      reponse: `On avance terme par terme.<br>u<sub>1</sub> = 230, u<sub>2</sub> = 260.<br>u<sub>3</sub> = 260 + 30 = <span class="big">290 €</span>.`,
      consigne: "u₀ = 200 et uₙ₊₁ = uₙ + 30. Calcule u₃.",
      verification: { type: "courte", attendus: ["290"], unite: "€" },
      dessin: cse,
    },
    {
      tag: "Énigme 3 · La mutuelle",
      titre: "Formule ou récurrence ?",
      question: `Une mutuelle gagne 2 % d'adhérents chaque année.<br>Son comptable hésite entre trois écritures.<br><br><b>Laquelle définit la suite par récurrence</b> ?`,
      reponse: `Par récurrence, un terme se calcule avec le précédent.<br>B donne u<sub>n+1</sub> à partir de u<sub>n</sub>.<br><span class="big">L'écriture B</span>.<br>A et C donnent u<sub>n</sub> directement à partir de n.`,
      consigne: "Quelle écriture est une relation de récurrence ?",
      verification: { type: "qcm", choix: ["uₙ = 500 + 20n", "uₙ₊₁ = 1,02 × uₙ", "uₙ = 3n²"], bonne: 1 },
      dessin: mutuelle,
    },
    {
      tag: "Énigme 4 · La marque de kombucha",
      titre: "L'indice et l'année",
      question: `u<sub>n</sub> est le nombre de bouteilles vendues par une marque de kombucha.<br>u<sub>0</sub> correspond à l'année 2024.<br>Chaque terme suivant, c'est une année de plus.<br><br><b>Quelle année</b> correspond à u<sub>6</sub> ?`,
      reponse: `L'indice compte les années après 2024.<br>2024 + 6 = <span class="big">2030</span>.`,
      consigne: "u₀ : 2024. Quelle année pour u₆ ?",
      verification: { type: "courte", attendus: ["2030"] },
      dessin: kombucha,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La crèche d'entreprise",
      sorte: "piege",
      question: `Une crèche d'entreprise a u<sub>n</sub> = 2n + 10 places l'année n.<br>Tom : « u<sub>5+1</sub>, c'est u<sub>5</sub> + 1. »<br><br><b>Combien vaut vraiment</b> u<sub>5+1</sub> ?`,
      reponse: `u<sub>5+1</sub>, c'est u<sub>6</sub> : le + 1 est dans l'indice.<br>u<sub>6</sub> = 2 × 6 + 10 = <span class="big">22</span>.<br>Tom a calculé u<sub>5</sub> + 1 = 20 + 1 = 21.`,
      consigne: "uₙ = 2n + 10. Calcule u₅₊₁.",
      verification: { type: "qcm", choix: ["22", "21", "13"], bonne: 0 },
      dessin: creche,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les voitures en autopartage",
      sorte: "defi",
      question: `Une société d'autopartage a 100 voitures : u<sub>0</sub> = 100.<br>Chaque année, elle retire 10 % des voitures et en achète 20 neuves.<br>Donc u<sub>n+1</sub> = 0,9 × u<sub>n</sub> + 20.<br><br><b>Combien vaut</b> u<sub>2</sub> ?`,
      reponse: `u<sub>1</sub> = 0,9 × 100 + 20 = 90 + 20 = 110.<br>u<sub>2</sub> = 0,9 × 110 + 20 = 99 + 20 = <span class="big">119 voitures</span>.`,
      consigne: "u₀ = 100 et uₙ₊₁ = 0,9 × uₙ + 20. Calcule u₂.",
      verification: { type: "qcm", choix: ["120", "130", "119"], bonne: 2 },
      dessin: autopartage,
    },
  ],
};

export default problemes;
