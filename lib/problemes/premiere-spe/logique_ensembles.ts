// Énigmes à projeter — première spé maths, notion logique_ensembles
// (les options latin et chinois du lycée, les coques de téléphone, le bureau
// de vote, les cars jaunes de La Réunion (974), piège de la piste de ski, défi
// du carnet d'Euler). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, ell } from "../dessins-ecole";

const options = svg("Diagramme des options : 35 élèves font latin, 28 font chinois, 9 font les deux ; on cherche combien font au moins une option",
  r(20, 30, 440, 270, C.craie, 0.03, 3, 12) +
    ell(180, 180, 120, 90, C.bleu, 0.15, 3) + ell(300, 180, 120, 90, C.jaune, 0.15, 3) +
    t(125, 64, "L : latin · 35", C.bleu, 22) + t(355, 64, "C : chinois · 28", C.jaune, 22) +
    t(240, 190, "9", C.craie, 26) + t(240, 220, "les deux", C.pale, 16) +
    t(240, 375, `card(L ∪ C)${NB}?`, C.rose, 30));

const coques = svg("Les coques : 3 modèles de téléphone et 5 motifs ; un couple, par exemple modèle 2 et étoiles",
  t(40, 80, "A = { M1 ; M2 ; M3 }", C.bleu, 26, "start") +
    t(40, 145, "B = { fleurs ; étoiles ; cœurs ;", C.jaune, 24, "start") + t(100, 185, "rayures ; pois }", C.jaune, 24, "start") +
    t(240, 260, "un couple : (M2 ; étoiles)", C.craie, 24) + t(240, 375, `card(A × B)${NB}?`, C.rose, 30));

const vote = svg("Au bureau de vote : il faut être majeur pour voter ; il faut aussi être inscrit sur les listes",
  r(60, 50, 360, 90, C.bleu, 0.12, 3, 10) + t(240, 105, "« il faut être majeur »", C.bleu, 26) +
    t(240, 200, "Léa, 19 ans, pas inscrite :", C.craie, 22) + t(240, 235, "elle ne peut pas voter", C.craie, 22) +
    t(240, 360, `majeur : condition${NB}?`, C.rose, 28));

const cars = svg("L'affiche du réseau : tous les cars jaunes de la ligne sont à l'heure ; on cherche la négation",
  r(40, 60, 400, 110, C.jaune, 0.15, 3, 12) + t(240, 110, "« Tous les cars jaunes", C.jaune, 26) + t(240, 148, "de la ligne sont à l'heure »", C.jaune, 26) +
    t(240, 250, "le contraire de cette phrase", C.pale, 22) + t(240, 360, `négation${NB}?`, C.rose, 30));

const ski = svg("La station de ski : s'il a neigé cette nuit, la piste est blanche ; ce matin, la piste est blanche, et les canons à neige ont tourné",
  t(240, 70, "« S'il a neigé, la piste est blanche. »", C.bleu, 24) + t(240, 140, "ce matin : la piste est blanche", C.craie, 24) +
    t(240, 195, "(les canons à neige ont tourné)", C.pale, 20) + t(240, 265, "Hugo : « donc il a neigé »", C.jaune, 24) +
    t(240, 370, `Hugo a raison${NB}?`, C.rose, 28));

const euler = svg("Le carnet d'Euler : n² + n + 41 vaut 41, 43, 47, 53, 61 pour n = 0 à 4, tous premiers ; on cherche le plus petit n qui donne un nombre non premier",
  t(240, 70, "n² + n + 41", C.bleu, 32) +
    [[0, 41], [1, 43], [2, 47], [3, 53], [4, 61]].map(([n, v], i) => t(80 + 80 * i, 140, `n = ${n}`, C.pale, 20) + t(80 + 80 * i, 180, v, C.craie, 26)).join("") +
    t(240, 250, "tous premiers… pour tout n ?", C.jaune, 24) + t(240, 370, `plus petit contre-exemple${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "logique_ensembles",
  titre: "Énigmes de vocabulaire ensembliste et de logique",
  description: "Les options latin et chinois, les coques de téléphone, le bureau de vote, les cars jaunes de La Réunion, le piège de la piste de ski, le défi du carnet d'Euler : réunion et intersection, produit cartésien, condition nécessaire, négation d'un « pour tout », réciproque, contre-exemple.",
  problemes: [
    {
      tag: "Énigme 1 · Les options du lycée",
      titre: "Réunion et intersection",
      question: `Au lycée, 35 élèves de première font l'option latin (L) et 28 l'option chinois (C). 9 font les deux.<br><br><b>Combien d'élèves font au moins une des deux options</b> ?`,
      reponse: `En ajoutant 35 et 28, les 9 élèves de L ∩ C sont comptés deux fois.<br>card(L ∪ C) = 35 + 28 − 9 = <span class="big">54</span> élèves.`,
      consigne: "35 en latin, 28 en chinois, 9 dans les deux : combien font au moins une option ?",
      verification: { type: "courte", attendus: ["54"], unite: "élèves" },
      dessin: options,
    },
    {
      tag: "Énigme 2 · Les coques de téléphone",
      titre: "Le produit cartésien",
      question: `Une boutique imprime des coques : 3 modèles de téléphone (ensemble A) et 5 motifs (ensemble B). Une coque est un couple (modèle ; motif).<br><br><b>Combien de coques différentes peut-elle faire</b> ?`,
      reponse: `A × B est l'ensemble des couples (a ; b) avec a dans A et b dans B : chaque modèle va avec chaque motif.<br>card(A × B) = 3 × 5 = <span class="big">15</span> coques.`,
      consigne: "3 modèles et 5 motifs : combien de couples (modèle ; motif) ?",
      verification: { type: "courte", attendus: ["15"], unite: "coques" },
      dessin: coques,
    },
    {
      tag: "Énigme 3 · Le bureau de vote",
      titre: "Condition nécessaire, condition suffisante",
      question: `En France, il faut être majeur pour voter. Mais Léa, 19 ans, n'est pas inscrite sur les listes : elle ne peut pas voter.<br><br><b>Pour voter, « être majeur » est une condition…</b>`,
      reponse: `Sans être majeur, on ne vote pas : la condition est <b>nécessaire</b> (voter ⟹ majeur).<br>Léa montre qu'elle ne suffit pas : être majeur est une condition <span class="big">nécessaire, pas suffisante</span>.`,
      consigne: "Pour voter, « être majeur » est une condition…",
      verification: { type: "qcm", choix: ["nécessaire, pas suffisante", "suffisante, pas nécessaire", "nécessaire et suffisante"], bonne: 0 },
      dessin: vote,
    },
    {
      tag: "Énigme 4 · Les cars jaunes",
      titre: "Nier un « pour tout »",
      question: `À La Réunion, une affiche annonce : « Tous les cars jaunes de la ligne sont à l'heure. »<br><br><b>Quelle est la négation de cette phrase</b> ?`,
      reponse: `Pour qu'une phrase en « tous » soit fausse, un seul contre-exemple suffit.<br>La négation est : <span class="big">au moins un car de la ligne est en retard</span> (« il existe »).`,
      consigne: "Négation de « Tous les cars jaunes de la ligne sont à l'heure » ?",
      verification: { type: "qcm", choix: ["Aucun car n'est à l'heure", "Tous les cars sont en retard", "Au moins un car est en retard"], bonne: 2 },
      dessin: cars,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La piste de ski",
      sorte: "piege",
      question: `À la station de ski, c'est vrai : « S'il a neigé cette nuit, la piste est blanche. » Ce matin, la piste est blanche.<br>Hugo : « Donc il a neigé cette nuit. »<br><br><b>Hugo a-t-il raison</b> ?`,
      reponse: `Hugo utilise la réciproque : « si la piste est blanche, il a neigé ». Elle n'est pas forcément vraie.<br><span class="big">Non</span> : les canons à neige ont pu blanchir la piste sans qu'il neige.`,
      consigne: "« S'il a neigé, la piste est blanche. » La piste est blanche : Hugo dit « donc il a neigé ». A-t-il raison ?",
      verification: { type: "qcm", choix: ["Oui, c'est sûr", "Non : il utilise la réciproque", "Oui : c'est la contraposée"], bonne: 1 },
      dessin: ski,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le carnet d'Euler",
      sorte: "defi",
      question: `Au musée, un carnet d'Euler note : n² + n + 41 donne 41, 43, 47, 53, 61… tous des nombres premiers.<br><br><b>Quel est le plus petit entier naturel n</b> pour lequel n² + n + 41 n'est pas premier ?`,
      reponse: `Pour n = 40 : 40² + 40 + 41 = 40 × 41 + 41 = 41 × 41 = 1 681, qui n'est pas premier.<br>De n = 0 à n = 39, tous les résultats sont premiers : le plus petit contre-exemple est <span class="big">n = 40</span>.`,
      consigne: "Plus petit entier naturel n tel que n² + n + 41 n'est pas premier ?",
      verification: { type: "courte", attendus: ["40", "n=40", "n = 40"] },
      dessin: euler,
    },
  ],
};

export default problemes;
