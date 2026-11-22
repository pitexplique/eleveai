// Énigmes à projeter — STMG (1re), notion développer, factoriser, réduire
// (les coffrets de la boutique de cosmétiques, la feuille de la comptable, le
// stand du salon, le panneau publicitaire, piège de la borne de commande, défi
// de l'entretien d'embauche). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

const coffrets = svg("Quatre coffrets cadeaux : chacun contient x savons et 3 bougies",
  [0, 1, 2, 3].map((k) => r(30 + k * 108, 120, 96, 110, C.jaune, 0.2, 3, 8) +
    t(78 + k * 108, 160, "x savons", C.craie, 19) + t(78 + k * 108, 186, "+", C.pale, 19) + t(78 + k * 108, 212, "3 bougies", C.craie, 19)).join("") +
    t(240, 300, "4 × (x + 3)", C.pale, 28) + t(240, 360, `objets en tout${NB}?`, C.rose, 26));

const comptable = svg("La feuille de la comptable : 2 fois x plus 5, plus 3 fois x moins 1",
  r(40, 130, 400, 100, C.bleu, 0.15, 3, 10) + t(240, 192, "2(x + 5) + 3(x − 1)", C.craie, 32) +
    t(240, 320, `réduire :${NB}?`, C.rose, 28));

const stand = svg("Le stand du salon : un carré de côté x, agrandi de 3 mètres dans les deux sens",
  r(90, 90, 160, 160, C.bleu, 0.3, 3) + r(90, 90, 250, 250, C.craie, 0, 3) +
    t(170, 80, "x", C.pale, 24) + t(295, 80, "3", C.pale, 24) +
    t(75, 178, "x", C.pale, 24, "end") + t(75, 302, "3", C.pale, 24, "end") +
    l(250, 90, 250, 340, C.craie, 2, "6 5") + l(90, 250, 340, 250, C.craie, 2, "6 5") +
    t(400, 220, "aire", C.rose, 24) + t(400, 255, `${NB}?`, C.rose, 28));

const panneau = svg("Le panneau publicitaire : aire x carré plus 5x, largeur x, longueur inconnue",
  r(60, 130, 340, 140, C.jaune, 0.2, 4, 4) + t(230, 210, "aire : x² + 5x", C.craie, 30) +
    t(420, 208, "x", C.pale, 26, "start") + t(230, 310, `longueur :${NB}?`, C.rose, 28));

const borne = svg("La borne de commande : écran carré de côté x, cadre de 1 cm tout autour. Max dit x carré moins 4",
  r(110, 70, 220, 220, C.craie, 0.1, 4, 6) + r(132, 92, 176, 176, C.bleu, 0.3, 3) +
    t(220, 60, "x", C.pale, 24) + t(220, 186, "x − 2", C.craie, 28) +
    t(240, 350, `Max :${NB}« x² − 4 »${NB}?`, C.rose, 26));

const entretien = svg("L'entretien d'embauche : calculer 53 au carré moins 47 au carré sans calculatrice",
  r(60, 120, 360, 100, C.jaune, 0.2, 3, 10) + t(240, 185, "53² − 47²", C.craie, 40) +
    t(240, 300, "sans calculatrice", C.pale, 24) + t(240, 350, "?", C.rose, 34));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_developper_factoriser",
  titre: "Énigmes de développement et de factorisation",
  description: "Les coffrets de la boutique de cosmétiques, la feuille de la comptable, le stand du salon, le panneau publicitaire, le piège de la borne de commande, le défi de l'entretien d'embauche : développer, réduire, identités remarquables, factoriser.",
  problemes: [
    {
      tag: "Énigme 1 · Les coffrets cadeaux",
      titre: "Développer",
      question: `Une boutique de cosmétiques prépare 4 coffrets cadeaux.<br>Chaque coffret contient x savons et 3 bougies.<br>Il y a donc 4(x + 3) objets.<br><br><b>Quelle est la forme développée</b> de 4(x + 3) ?`,
      reponse: `On multiplie 4 par CHAQUE terme : 4 × x + 4 × 3.<br><span class="big">4x + 12</span> : 4x savons et 12 bougies.`,
      consigne: "Développe 4(x + 3).",
      verification: { type: "qcm", choix: ["4x + 3", "4x + 12", "x + 12"], bonne: 1 },
      dessin: coffrets,
    },
    {
      tag: "Énigme 2 · La comptable",
      titre: "Développer et réduire",
      question: `Sur sa feuille de calcul, une comptable écrit :<br>2(x + 5) + 3(x − 1).<br><br><b>Écris cette expression plus simplement</b> (développe et réduis).`,
      reponse: `2(x + 5) = 2x + 10 et 3(x − 1) = 3x − 3.<br>2x + 10 + 3x − 3 = <span class="big">5x + 7</span>.`,
      consigne: "Développe et réduis 2(x + 5) + 3(x − 1).",
      verification: { type: "courte", attendus: ["5x+7"] },
      dessin: comptable,
    },
    {
      tag: "Énigme 3 · Le stand du salon",
      titre: "Une identité remarquable",
      question: `Au salon de l'artisanat, un stand est un carré de côté x mètres.<br>On l'agrandit de 3 m en longueur et de 3 m en largeur.<br>Sa nouvelle aire vaut (x + 3)².<br><br><b>Quelle est la forme développée</b> de (x + 3)² ?`,
      reponse: `(x + 3)² = x² + 2 × x × 3 + 3².<br><span class="big">x² + 6x + 9</span>.<br>Sur le dessin : un carré x², deux bandes 3x et un petit carré 9.`,
      consigne: "Développe (x + 3)².",
      verification: { type: "qcm", choix: ["x² + 6x + 9", "x² + 9", "x² + 3x + 9"], bonne: 0 },
      dessin: stand,
    },
    {
      tag: "Énigme 4 · Le panneau publicitaire",
      titre: "Factoriser",
      question: `Un panneau publicitaire est un rectangle.<br>Son aire vaut x² + 5x (en m²).<br>Sa largeur vaut x mètres.<br><br><b>Combien mesure sa longueur</b> ?`,
      reponse: `On met x en facteur : x² + 5x = x × x + x × 5 = x(x + 5).<br>Aire = largeur × longueur : la longueur vaut <span class="big">x + 5</span> mètres.`,
      consigne: "Aire x² + 5x, largeur x. Combien mesure la longueur ?",
      verification: { type: "courte", attendus: ["x+5", "5+x"], unite: "m" },
      dessin: panneau,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La borne de commande",
      sorte: "piege",
      question: `Une borne de commande a un écran carré de côté x cm.<br>Un cadre noir de 1 cm fait le tour de l'écran.<br>La partie utile est un carré de côté x − 2.<br>Max : « Son aire vaut (x − 2)² = x² − 4. »<br><br><b>Quelle est la bonne forme développée</b> ?`,
      reponse: `(x − 2)² = x² − 2 × x × 2 + 2² = <span class="big">x² − 4x + 4</span>.<br>Test avec x = 10 : 8² = 64, mais 10² − 4 = 96. Max a oublié le terme du milieu.`,
      consigne: "Développe (x − 2)².",
      verification: { type: "qcm", choix: ["x² − 4", "x² + 4", "x² − 4x + 4"], bonne: 2 },
      dessin: borne,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'entretien d'embauche",
      sorte: "defi",
      question: `À un entretien d'embauche, on demande à Sarah de calculer de tête :<br>53² − 47².<br><br><b>Combien trouve-t-elle</b> ? Pense à a² − b².`,
      reponse: `a² − b² = (a − b)(a + b).<br>53² − 47² = (53 − 47)(53 + 47) = 6 × 100 = <span class="big">600</span>.`,
      consigne: "Calcule 53² − 47² sans calculatrice.",
      verification: { type: "courte", attendus: ["600"] },
      dessin: entretien,
    },
  ],
};

export default problemes;
