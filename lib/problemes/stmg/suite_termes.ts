// Énigmes à projeter — STMG (1re), notion suite : calculer des termes
// (l'atelier de couture, le cabinet de kinésithérapie, l'agence de
// recrutement, la hotline d'assistance, piège du garde-meubles, défi de la
// conserverie de sardines). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, fleche } from "../dessins-ecole";

const IND = ["₀", "₁", "₂", "₃", "₄", "₅"];

const couture = svg("L'atelier de couture : u indice n égale 4 n plus 6 retouches ; on cherche u indice 0, u indice 1 et u indice 2",
  r(60, 60, 360, 90, C.bleu, 0.15, 3, 10) + t(240, 118, "uₙ = 4n + 6", C.craie, 32) +
    [0, 1, 2].map((k) => r(70 + k * 120, 200, 100, 70, C.rose, 0.15, 3, 8) + t(120 + k * 120, 180, `u${IND[k]}`, C.pale, 22) + t(120 + k * 120, 246, "?", C.rose, 28)).join("") +
    t(240, 350, "les 3 premiers termes", C.pale, 24));

const kine = svg("Le cabinet de kinésithérapie : u indice n égale 30 plus 5 n patients ; on cherche u indice 12",
  r(60, 80, 360, 100, C.bleu, 0.15, 3, 10) + t(240, 142, "uₙ = 30 + 5n", C.craie, 32) +
    t(240, 250, "n = 12", C.pale, 26) + t(240, 330, `u₁₂${NB}=${NB}?`, C.rose, 32));

const recrutement = svg("Trois suites de candidatures : A 50, 60, 70, 80 ; B 50, 100, 200, 400 ; C 50, 51, 54, 59",
  r(40, 50, 400, 70, C.bleu, 0.12, 3, 10) + t(240, 97, "A.  50 · 60 · 70 · 80", C.craie, 26) +
    r(40, 150, 400, 70, C.bleu, 0.12, 3, 10) + t(240, 197, "B.  50 · 100 · 200 · 400", C.craie, 26) +
    r(40, 250, 400, 70, C.bleu, 0.12, 3, 10) + t(240, 297, "C.  50 · 51 · 54 · 59", C.craie, 26) +
    t(240, 385, `ni + r, ni × q${NB}?`, C.rose, 26));

let cases = "";
const vals = ["80", "75", "70", "?"];
for (let k = 0; k < 4; k++) {
  const x = 30 + k * 115;
  cases += r(x, 150, 90, 70, k === 3 ? C.rose : C.bleu, 0.18, 3, 8) + t(x + 45, 196, vals[k], k === 3 ? C.rose : C.craie, 26) +
    t(x + 45, 130, `u${IND[k]}`, C.pale, 22);
  if (k < 3) cases += fleche(x + 92, 185, x + 113, 185, C.jaune, 3) + t(x + 102, 260, "−5", C.jaune, 18);
}
const hotline = svg("La hotline d'assistance : u indice 0 égale 80 appels, puis 5 appels de moins chaque semaine ; u indice 3 ?",
  t(240, 60, "uₙ₊₁ = uₙ − 5", C.craie, 30) + cases + t(240, 350, `u₃${NB}=${NB}?`, C.rose, 30));

const garde = svg("Le garde-meubles : le premier mois est u indice 1 ; u indice n égale 10 n plus 20 box loués ; on cherche le 3e terme",
  r(60, 70, 360, 90, C.bleu, 0.15, 3, 10) + t(240, 128, "uₙ = 10n + 20", C.craie, 32) +
    t(240, 230, "1er terme : u₁", C.pale, 24) + t(240, 330, `3e terme${NB}=${NB}?`, C.rose, 32));

const sardines = svg("La conserverie de sardines : u indice 0 égale 10 ; u indice n plus 1 égale 2 fois u indice n moins 5",
  r(50, 80, 380, 100, C.jaune, 0.2, 3, 10) + t(240, 120, "u₀ = 10", C.craie, 28) + t(240, 160, "uₙ₊₁ = 2 × uₙ − 5", C.craie, 28) +
    t(240, 250, "en milliers de boîtes", C.pale, 22) + t(240, 340, `u₃${NB}=${NB}?`, C.rose, 32));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "suite_termes",
  titre: "Énigmes pour calculer les termes d'une suite",
  description: "L'atelier de couture, le cabinet de kinésithérapie, l'agence de recrutement, la hotline d'assistance, le piège du garde-meubles, le défi de la conserverie de sardines : calculer les premiers termes, un terme de rang donné, reconnaître une suite ni arithmétique ni géométrique.",
  problemes: [
    {
      tag: "Énigme 1 · L'atelier de couture",
      titre: "Les trois premiers termes",
      question: `Un atelier de couture fait u<sub>n</sub> = 4n + 6 retouches le jour n.<br>On commence à n = 0.<br><br><b>Combien valent</b> u<sub>0</sub>, u<sub>1</sub> et u<sub>2</sub> ?`,
      reponse: `On remplace n par 0, puis 1, puis 2.<br>u<sub>0</sub> = 6, u<sub>1</sub> = 4 + 6 = 10, u<sub>2</sub> = 8 + 6 = 14.<br><span class="big">6 ; 10 ; 14</span>.`,
      consigne: "uₙ = 4n + 6. Combien vaut u₂ ?",
      verification: { type: "courte", attendus: ["14"], unite: "retouches" },
      dessin: couture,
    },
    {
      tag: "Énigme 2 · Le cabinet de kiné",
      titre: "Un terme de rang donné",
      question: `Un cabinet de kinésithérapie reçoit u<sub>n</sub> = 30 + 5n patients la semaine n.<br><br><b>Combien de patients</b> la semaine 12 ?`,
      reponse: `On calcule u<sub>12</sub> : on remplace n par 12.<br>30 + 5 × 12 = 30 + 60 = <span class="big">90 patients</span>.<br>Pas besoin de calculer les termes d'avant.`,
      consigne: "uₙ = 30 + 5n. Calcule u₁₂.",
      verification: { type: "courte", attendus: ["90"], unite: "patients" },
      dessin: kine,
    },
    {
      tag: "Énigme 3 · L'agence de recrutement",
      titre: "Ni arithmétique ni géométrique",
      question: `Une agence de recrutement compte ses candidatures, semaine après semaine.<br>Trois de ses offres donnent les suites A, B et C.<br><br><b>Laquelle n'est ni arithmétique ni géométrique</b> ?`,
      reponse: `A : on ajoute toujours 10. Arithmétique.<br>B : on multiplie toujours par 2. Géométrique.<br>C : + 1, + 3, + 5. Les écarts changent, et 51 ÷ 50 ≠ 54 ÷ 51.<br><span class="big">La suite C</span>.`,
      consigne: "Quelle suite n'est ni arithmétique ni géométrique ?",
      verification: { type: "qcm", choix: ["50 ; 60 ; 70 ; 80", "50 ; 100 ; 200 ; 400", "50 ; 51 ; 54 ; 59"], bonne: 2 },
      dessin: recrutement,
    },
    {
      tag: "Énigme 4 · La hotline",
      titre: "Terme par terme",
      question: `Une hotline d'assistance reçoit 80 appels la semaine 0 : u<sub>0</sub> = 80.<br>Chaque semaine, elle en reçoit 5 de moins.<br>Donc u<sub>n+1</sub> = u<sub>n</sub> − 5.<br><br><b>Combien vaut</b> u<sub>3</sub> ?`,
      reponse: `u<sub>1</sub> = 75, u<sub>2</sub> = 70.<br>u<sub>3</sub> = 70 − 5 = <span class="big">65 appels</span>.`,
      consigne: "u₀ = 80 et uₙ₊₁ = uₙ − 5. Calcule u₃.",
      verification: { type: "courte", attendus: ["65"], unite: "appels" },
      dessin: hotline,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le garde-meubles",
      sorte: "piege",
      question: `Un garde-meubles loue u<sub>n</sub> = 10n + 20 box le mois n.<br>Ici, le premier mois est u<sub>1</sub>.<br><br><b>Combien vaut le 3<sup>e</sup> terme</b> ?`,
      reponse: `Les termes sont u<sub>1</sub>, u<sub>2</sub>, u<sub>3</sub>.<br>Le 3<sup>e</sup> terme, c'est u<sub>3</sub>.<br>10 × 3 + 20 = <span class="big">50 box</span>.<br>Le piège : prendre u<sub>2</sub> = 40, comme si on partait de u<sub>0</sub>.`,
      consigne: "uₙ = 10n + 20, premier terme u₁. Quel est le 3e terme ?",
      verification: { type: "qcm", choix: ["50", "40", "60"], bonne: 0 },
      dessin: garde,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La conserverie de sardines",
      sorte: "defi",
      question: `Une conserverie produit 10 milliers de boîtes l'année 0 : u<sub>0</sub> = 10.<br>Chaque année, elle double sa production, mais 5 milliers partent en contrôle.<br>Donc u<sub>n+1</sub> = 2 × u<sub>n</sub> − 5.<br><br><b>Combien vaut</b> u<sub>3</sub> ?`,
      reponse: `u<sub>1</sub> = 2 × 10 − 5 = 15.<br>u<sub>2</sub> = 2 × 15 − 5 = 25.<br>u<sub>3</sub> = 2 × 25 − 5 = <span class="big">45 milliers</span>.`,
      consigne: "u₀ = 10 et uₙ₊₁ = 2 × uₙ − 5. Calcule u₃.",
      verification: { type: "qcm", choix: ["35", "45", "65"], bonne: 1 },
      dessin: sardines,
    },
  ],
};

export default problemes;
