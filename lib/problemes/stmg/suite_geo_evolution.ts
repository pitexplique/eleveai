// Énigmes à projeter — STMG (1re), notion suite géométrique et taux
// d'évolution (le site de petites annonces, le chariot élévateur,
// l'électricité du bureau, les chèques de la banque, piège du cours de
// salsa, défi du loueur de matériel de chantier). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, fleche } from "../dessins-ecole";

const fl = (x1: number, x2: number, y: number, s: string) => fleche(x1, y, x2, y, C.jaune, 3) + t((x1 + x2) / 2, y - 18, s, C.jaune, 24);

const annonces = svg("Le site de petites annonces : plus 20 % de visiteurs chaque mois ; quelle raison q ?",
  r(40, 140, 120, 80, C.bleu, 0.18, 3, 8) + t(100, 190, "uₙ", C.craie, 30) +
    r(320, 140, 120, 80, C.rose, 0.18, 3, 8) + t(380, 190, "uₙ₊₁", C.craie, 30) + fl(170, 310, 180, "+ 20 %") +
    t(240, 300, "+ 20 %  →  × ?", C.pale, 28) + t(240, 380, `q${NB}=${NB}?`, C.rose, 32));

const chariot = svg("Le chariot élévateur : u indice n plus 1 égale 0,85 fois u indice n ; quel taux d'évolution chaque année ?",
  r(60, 80, 360, 100, C.bleu, 0.15, 3, 10) + t(240, 142, "uₙ₊₁ = 0,85 × uₙ", C.craie, 32) +
    t(240, 250, "× 0,85  →  ? %", C.pale, 28) + t(240, 340, `taux${NB}=${NB}?`, C.rose, 30));

const bureau = svg("L'électricité du bureau : u indice 0 égale 50 000 kilowattheures, moins 3 % par an ; sens de variation ?",
  r(60, 70, 360, 100, C.bleu, 0.15, 3, 10) + t(240, 112, "u₀ = 50 000 kWh", C.craie, 28) + t(240, 152, "− 3 % par an", C.craie, 28) +
    t(240, 250, "q = 0,97", C.pale, 28) + t(240, 340, `croissante${NB}? décroissante${NB}?`, C.rose, 26));

const cheques = svg("Les chèques de la banque : moins 12 % chaque année ; quelle raison q ?",
  r(40, 140, 120, 80, C.bleu, 0.18, 3, 8) + t(100, 190, "uₙ", C.craie, 30) +
    r(320, 140, 120, 80, C.rose, 0.18, 3, 8) + t(380, 190, "uₙ₊₁", C.craie, 30) + fl(170, 310, 180, "− 12 %") +
    t(240, 300, "− 12 %  →  × ?", C.pale, 28) + t(240, 380, `q${NB}=${NB}?`, C.rose, 32));

const salsa = svg("Le cours de salsa : 50 euros, plus 5 % par an pendant 3 ans ; Maé dit plus 15 % ; u indice 3 ?",
  r(60, 60, 360, 90, C.bleu, 0.15, 3, 10) + t(240, 100, "u₀ = 50 €", C.craie, 28) + t(240, 136, "+ 5 % par an", C.craie, 26) +
    t(240, 230, "Maé : « 3 ans = + 15 % »", C.pale, 24) + t(240, 330, `u₃${NB}=${NB}?`, C.rose, 32));

const chantier = svg("Le loueur de matériel de chantier : plus 2 % de clients chaque mois pendant 12 mois ; quelle évolution sur l'année ?",
  r(50, 70, 380, 90, C.jaune, 0.2, 3, 10) + t(240, 126, "q = 1,02 par mois", C.craie, 30) +
    t(240, 230, "12 mois : 1,02 × 1,02 × … × 1,02", C.pale, 22) + t(240, 330, `sur 1 an${NB}: + ? %`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "suite_geo_evolution",
  titre: "Énigmes de suites géométriques et taux d'évolution",
  description: "Le site de petites annonces, le chariot élévateur, l'électricité du bureau, les chèques de la banque, le piège du cours de salsa, le défi du loueur de matériel de chantier : passer d'un taux à la raison q, de q au taux, le sens de variation avec q.",
  problemes: [
    {
      tag: "Énigme 1 · Les petites annonces",
      titre: "Du taux à la raison",
      question: `Un site de petites annonces gagne 20 % de visiteurs chaque mois.<br>u<sub>n</sub> est le nombre de visiteurs le mois n.<br><br><b>Quelle est la raison</b> q de cette suite géométrique ?`,
      reponse: `Augmenter de 20 %, c'est multiplier par 1 + 0,20.<br>Raison <span class="big">q = 1,2</span>.`,
      consigne: "+ 20 % par mois. Quelle est la raison q ?",
      verification: { type: "courte", attendus: ["1,2", "1.2", "1,20"] },
      dessin: annonces,
    },
    {
      tag: "Énigme 2 · Le chariot élévateur",
      titre: "De la raison au taux",
      question: `La valeur d'un chariot élévateur suit u<sub>n+1</sub> = 0,85 × u<sub>n</sub>.<br><br><b>Quel est le taux d'évolution</b> chaque année ?`,
      reponse: `0,85 = 1 − 0,15.<br>Multiplier par 0,85, c'est baisser de 15 %.<br>Taux <span class="big">− 15 %</span> par an.`,
      consigne: "uₙ₊₁ = 0,85 × uₙ. Quel est le taux d'évolution (en %) ?",
      verification: { type: "courte", attendus: ["-15", "−15", "− 15", "-15 %", "− 15 %"], unite: "%" },
      dessin: chariot,
    },
    {
      tag: "Énigme 3 · L'électricité du bureau",
      titre: "Le sens de variation",
      question: `Un bureau consomme 50 000 kWh d'électricité l'année 0.<br>Chaque année, il consomme 3 % de moins.<br>La raison est q = 0,97.<br><br><b>La suite est-elle croissante ou décroissante</b> ?`,
      reponse: `Les termes sont positifs et q = 0,97 est entre 0 et 1.<br>Chaque terme est plus petit que le précédent.<br>La suite est <span class="big">décroissante</span>.`,
      consigne: "u₀ = 50 000 et q = 0,97. Quel est le sens de variation ?",
      verification: { type: "qcm", choix: ["croissante", "constante", "décroissante"], bonne: 2 },
      dessin: bureau,
    },
    {
      tag: "Énigme 4 · Les chèques de la banque",
      titre: "Une baisse en pourcentage",
      question: `Une banque reçoit de moins en moins de chèques.<br>Chaque année, il y en a 12 % de moins.<br><br><b>Quelle est la raison</b> q de cette suite géométrique ?`,
      reponse: `Baisser de 12 %, c'est multiplier par 1 − 0,12.<br>Raison <span class="big">q = 0,88</span>.`,
      consigne: "− 12 % par an. Quelle est la raison q ?",
      verification: { type: "courte", attendus: ["0,88", "0.88"] },
      dessin: cheques,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le cours de salsa",
      sorte: "piege",
      question: `Un cours de salsa coûte 50 € l'année 0.<br>Son prix augmente de 5 % chaque année.<br>Maé : « En 3 ans, + 15 %, donc 57,50 €. »<br><br><b>Combien coûte-t-il vraiment</b> l'année 3 ?`,
      reponse: `On multiplie 3 fois par 1,05.<br>50 × 1,05 = 52,50 ; × 1,05 = 55,125 ; × 1,05 ≈ 57,88.<br>Le cours coûte <span class="big">57,88 €</span>.<br>Les pourcentages ne s'ajoutent pas : chaque hausse porte sur le nouveau prix.`,
      consigne: "u₀ = 50 € et + 5 % par an. Combien vaut u₃ ?",
      verification: { type: "qcm", choix: ["57,50 €", "57,88 €", "65 €"], bonne: 1 },
      dessin: salsa,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le loueur de matériel de chantier",
      sorte: "defi",
      question: `Un loueur de matériel de chantier gagne 2 % de clients chaque mois.<br>Cela dure 12 mois.<br>Avec la calculatrice :<br><br><b>quelle est l'évolution sur l'année</b> ?`,
      reponse: `Sur 12 mois, on multiplie 12 fois par 1,02.<br>1,02<sup>12</sup> ≈ 1,268.<br>Sur l'année : environ <span class="big">+ 26,8 %</span>.<br>Plus que 12 × 2 % = 24 %.`,
      consigne: "+ 2 % par mois pendant 12 mois. Quelle évolution sur l'année ?",
      verification: { type: "qcm", choix: ["+ 26,8 %", "+ 24 %", "+ 2 %"], bonne: 0 },
      dessin: chantier,
    },
  ],
};

export default problemes;
