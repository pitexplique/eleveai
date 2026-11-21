// Énigmes à projeter — STMG (1re), notion formules et calcul littéral
// (la camionnette de location, le guide du car de tourisme, la croisière
// d'entreprise, le bénéfice de l'ébéniste, piège de la baguette du vitrier,
// défi de l'entrepôt frigorifique). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { frac } from "../outils";

const camionnette = svg("Location d'une camionnette : coût égale 30 plus 0,4 fois d ; d égale 80 kilomètres",
  r(60, 90, 360, 100, C.bleu, 0.15, 3, 10) + t(240, 152, "C = 30 + 0,4 × d", C.craie, 32) +
    t(240, 260, "d = 80 km", C.pale, 26) + t(240, 335, `C${NB}=${NB}?`, C.rose, 30));

const car = svg("Le guide du car : distance égale vitesse fois temps ; on cherche le temps",
  r(80, 100, 320, 100, C.jaune, 0.2, 3, 10) + t(240, 165, "d = v × t", C.craie, 36) +
    t(240, 300, `t${NB}=${NB}?`, C.rose, 32));

const croisiere = svg("La croisière d'entreprise : prix égale 300 plus 25 n ; prix payé 1 050 euros",
  r(60, 90, 360, 100, C.bleu, 0.15, 3, 10) + t(240, 152, "P = 300 + 25 × n", C.craie, 32) +
    t(240, 260, "P = 1 050 €", C.pale, 26) + t(240, 335, `n${NB}=${NB}?`, C.rose, 30));

const ebeniste = svg("Le bénéfice de l'ébéniste : une moitié réinvestie, un tiers en primes, le reste ?",
  r(40, 120, 400, 70, C.craie, 0, 3) + r(40, 120, 200, 70, C.bleu, 0.3, 0) + r(240, 120, 133, 70, C.jaune, 0.3, 0) +
    l(240, 120, 240, 190, C.craie, 2) + l(373, 120, 373, 190, C.craie, 2) +
    t(140, 165, "réinvesti", C.craie, 20) + t(306, 165, "primes", C.craie, 20) + t(406, 165, "?", C.rose, 26) +
    t(140, 235, "1/2", C.pale, 24) + t(306, 235, "1/3", C.pale, 24) + t(406, 235, "?", C.rose, 24));

const vitrier = svg("La baguette du vitrier : périmètre égale 2 fois L plus l. Inès écrit L égale P moins 2l",
  r(130, 60, 220, 150, C.bleu, 0.15, 5) + t(240, 50, "L", C.pale, 24) + t(365, 142, "l", C.pale, 24, "start") +
    t(240, 270, "P = 2(L + l)", C.craie, 30) + t(240, 330, "Inès : « L = P − 2l »", C.pale, 24) + t(240, 385, "?", C.rose, 30));

const frigo = svg("Le thermomètre de l'entrepôt : F égale 1,8 C plus 32 ; même nombre dans les deux unités ?",
  r(60, 100, 360, 100, C.bleu, 0.15, 3, 10) + t(240, 165, "F = 1,8 × C + 32", C.craie, 32) +
    t(240, 280, "F = C", C.pale, 28) + t(240, 345, `C${NB}=${NB}?`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_formules",
  titre: "Énigmes de formules et de calcul littéral",
  description: "La camionnette de location, le guide du car de tourisme, la croisière d'entreprise, le bénéfice de l'ébéniste, le piège de la baguette du vitrier, le défi de l'entrepôt frigorifique : appliquer une formule, isoler une variable, calculer avec des fractions.",
  problemes: [
    {
      tag: "Énigme 1 · La camionnette",
      titre: "Appliquer une formule",
      question: `Une agence loue une camionnette.<br>Le coût vaut C = 30 + 0,4 × d, en euros.<br>d est le nombre de kilomètres parcourus.<br>Un artisan roule 80 km.<br><br><b>Combien paie-t-il</b> ?`,
      reponse: `0,4 × 80 = 32.<br>C = 30 + 32 = <span class="big">62 €</span>.`,
      consigne: "C = 30 + 0,4 × d avec d = 80. Combien vaut C ?",
      verification: { type: "courte", attendus: ["62"], unite: "€" },
      dessin: camionnette,
    },
    {
      tag: "Énigme 2 · Le car de tourisme",
      titre: "Isoler une variable",
      question: `Le guide d'un car de tourisme connaît la formule d = v × t.<br>d est la distance, v la vitesse, t le temps.<br>Il connaît d et v.<br><br><b>Quelle formule donne t</b> ?`,
      reponse: `On divise les deux membres par v.<br><span class="big">t = d ÷ v</span>.<br>Exemple : 150 km à 75 km/h, t = 150 ÷ 75 = 2 h.`,
      consigne: "d = v × t. Exprime t.",
      verification: { type: "qcm", choix: ["t = d × v", "t = d ÷ v", "t = v ÷ d"], bonne: 1 },
      dessin: car,
    },
    {
      tag: "Énigme 3 · La croisière d'entreprise",
      titre: "Retrouver une valeur",
      question: `Une entreprise loue un bateau pour un séminaire.<br>Le prix vaut P = 300 + 25 × n, en euros.<br>n est le nombre de passagers.<br>L'entreprise a payé 1 050 €.<br><br><b>Combien de passagers</b> y avait-il ?`,
      reponse: `300 + 25n = 1 050, donc 25n = 750.<br>n = 750 ÷ 25 = <span class="big">30 passagers</span>.`,
      consigne: "300 + 25n = 1 050. Combien vaut n ?",
      verification: { type: "courte", attendus: ["30"], unite: "passagers" },
      dessin: croisiere,
    },
    {
      tag: "Énigme 4 · L'ébéniste",
      titre: "Calculer avec des fractions",
      question: `Une ébéniste partage le bénéfice de son atelier.<br>Elle réinvestit ${frac(1, 2)} du bénéfice.<br>Elle verse ${frac(1, 3)} en primes à ses salariés.<br><br><b>Quelle fraction du bénéfice reste-t-il</b> ?`,
      reponse: `${frac(1, 2)} + ${frac(1, 3)} = ${frac(3, 6)} + ${frac(2, 6)} = ${frac(5, 6)}.<br>Il reste 1 − ${frac(5, 6)} = <span class="big">${frac(1, 6)}</span> du bénéfice.`,
      consigne: "1 − 1/2 − 1/3 = ?",
      verification: { type: "qcm", choix: ["1/6", "2/5", "1/5"], bonne: 0 },
      dessin: ebeniste,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La baguette du vitrier",
      sorte: "piege",
      question: `Un vitrier pose une baguette autour d'une fenêtre rectangulaire.<br>La longueur de baguette vaut P = 2(L + l).<br>Il connaît P et la largeur l. Il cherche L.<br>Inès : « L = P − 2l. »<br><br><b>Quelle est la bonne formule</b> ?`,
      reponse: `P = 2(L + l), donc P ÷ 2 = L + l.<br><span class="big">L = P ÷ 2 − l</span>.<br>Test : P = 10 m, l = 2 m. La vraie longueur vaut 5 − 2 = 3 m. Inès trouve 10 − 4 = 6 m : elle a oublié de diviser par 2.`,
      consigne: "P = 2(L + l). Exprime L.",
      verification: { type: "qcm", choix: ["L = P − 2l", "L = 2P − l", "L = P ÷ 2 − l"], bonne: 2 },
      dessin: vitrier,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'entrepôt frigorifique",
      sorte: "defi",
      question: `Un entrepôt frigorifique a un thermomètre à deux échelles.<br>On passe des degrés Celsius (C) aux degrés Fahrenheit (F) par F = 1,8 × C + 32.<br><br><b>Pour quelle température</b> les deux échelles affichent-elles le même nombre ?`,
      reponse: `On cherche C = 1,8 × C + 32.<br>C − 1,8C = 32, donc −0,8C = 32.<br>C = 32 ÷ (−0,8) = <span class="big">−40 °C</span>.<br>Vérification : 1,8 × (−40) + 32 = −72 + 32 = −40.`,
      consigne: "C = 1,8 × C + 32. Combien vaut C ?",
      verification: { type: "courte", attendus: ["-40", "−40"], unite: "°C" },
      dessin: frigo,
    },
  ],
};

export default problemes;
