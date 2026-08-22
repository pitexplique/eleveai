// ─── Le repérage dans le temps et les durées (6e) ──────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). « Le repérage dans le temps et
// les durées » est un chapitre entier du programme de 6e — trois objectifs
// d'apprentissage — et le coach n'en avait AUCUNE micro. Ni horaire, ni durée,
// ni conversion. Le canvas `duree` existait pourtant depuis des mois (horloge,
// double horloge, affichage digital, frise) : le dessin était prêt, les
// questions n'ont jamais été écrites.
//
// Les objectifs, mot pour mot (Exemples pour la mise en œuvre des programmes,
// 6e, 2025, p. 10-11) :
//   · « Effectuer des calculs sur des horaires et des durées » ;
//   · « Résoudre des problèmes impliquant des horaires, des durées » ;
//   · « Convertir des durées ».
//
// Et les exemples de réussite que le BO cite, tous repris ici :
//   la séance de cinéma de 17 h 40 qui dure 110 minutes · la durée hebdomadaire
//   de cours · le tableau des bus · « combien font 609 h en semaines, jours et
//   heures ? » · « combien font 34 990 s en heures, minutes et secondes ? » ·
//   « est-il plus long d'emprunter sur 76 mois ou sur 5 ans ? » ·
//   0,5 h = 30 min · 0,25 h = 15 min · 0,75 h = 45 min · 0,1 h = 6 min.
//
// ⭐ LA DIFFICULTÉ DU CHAPITRE TIENT EN UNE LIGNE : le temps ne se compte pas en
// base dix. 8 h 50 + 20 min ne fait pas 8 h 70, et 1,30 h ne vaut pas 1 h 30.
// Chaque micro porte au moins un item sur ce point — c'est là que l'élève tombe.
//
// ⭐ CHAQUE MICRO A SES GÉNÉRATEURS (règle d'or : dix variantes minimum, sinon
// l'élève retombe sur la même question en dix minutes), dont un qui pose une
// question OUVERTE — sans gabarit, une question ouverte se répète elle aussi.

import type { TutorBankItemV4, DureeCanvasData } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : une durée est un écart entre deux instants ; un horaire est un instant.\n\n" +
    "Méthode : on compte en heures, minutes et secondes — jamais en base dix : 1 h = 60 min et 1 min = 60 s.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/** hh h mm, à la française — et « 9 h » tout court quand il n'y a pas de minute. */
function hhmm(h: number, m: number) {
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
}

/** Deux horloges côte à côte : le début et la fin, donc la durée entre les deux. */
function deuxHorloges(
  debut: { h: number; m: number },
  fin: { h: number; m: number }
): DureeCanvasData {
  return {
    kind: "duree",
    variant: "double_horloge",
    start: { hour: debut.h, minute: debut.m, label: "début" },
    end: { hour: fin.h, minute: fin.m, label: "fin" },
    display: { showNumbers: true, showLabels: true },
  };
}

/** L'affichage digital : l'heure telle qu'on la lit sur un écran. */
function digital(texte: string, label?: string): DureeCanvasData {
  return { kind: "duree", variant: "digital", digital: { text: texte, label } };
}

/**
 * La frise : la durée devient une LONGUEUR, découpée en étapes.
 * C'est le dessin qui fait comprendre pourquoi on passe par l'heure ronde
 * (de 17 h 40 à 18 h, puis de 18 h à 19 h 30) au lieu de poser une soustraction.
 */
function frise(
  debut: string,
  fin: string,
  etapes: { label: string; minutes: number; color?: string }[]
): DureeCanvasData {
  return {
    kind: "duree",
    variant: "frise",
    frise: { startLabel: debut, endLabel: fin, steps: etapes },
    display: { showLabels: true },
  };
}

export const dureesBank: TutorBankItemV4[] = [
  // =========================
  // DUREE_CALCULER — un instant, une durée, l'autre instant
  // =========================
  {
    kind: "fixed",
    id: "duree_calculer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Une séance de cinéma commence à 17 h 40 et dure 110 minutes. À quelle heure se termine-t-elle ?",
    format: "short",
    expected: ["19 h 30", "19h30", "19:30", "19h 30"],
    comparator: "contains_keyword",
    hint: "Commence par écrire 110 minutes en heures et minutes.",
    explanation: expl(
      "110 min = 60 min + 50 min = 1 h 50 min. On avance d'abord jusqu'à l'heure ronde : de 17 h 40 à 18 h, il y a 20 min. Il reste 1 h 30 min à ajouter : 18 h + 1 h 30 = 19 h 30."
    ),
    tags: ["duree_temps", "calculer", "canvas"],
    canvas: frise("17 h 40", "19 h 30", [
      { label: "jusqu'à 18 h", minutes: 20 },
      { label: "1 h 30 de plus", minutes: 90 },
    ]),
  },
  {
    kind: "fixed",
    id: "duree_calculer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 1,
    theme: "neutral",
    text: "Un cours commence à 8 h 15 et se termine à 9 h 10. Combien de temps dure-t-il ?",
    format: "short",
    expected: ["55 min", "55 minutes", "55"],
    comparator: "contains_keyword",
    hint: "Passe par 9 h : de 8 h 15 à 9 h, puis de 9 h à 9 h 10.",
    explanation: expl(
      "De 8 h 15 à 9 h, il y a 45 min. De 9 h à 9 h 10, il y a 10 min. La durée du cours est 45 + 10 = 55 min."
    ),
    tags: ["duree_temps", "calculer", "canvas"],
    canvas: deuxHorloges({ h: 8, m: 15 }, { h: 9, m: 10 }),
  },
  {
    kind: "fixed",
    id: "duree_calculer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Un train part à 14 h 25 et arrive à 16 h 05. Quelle est la durée du trajet ?",
    format: "short",
    expected: ["1 h 40", "1h40", "100 min", "100 minutes"],
    comparator: "contains_keyword",
    hint: "De 14 h 25 à 16 h 25, il y a 2 h — c'est trop de 20 minutes.",
    explanation: expl(
      "De 14 h 25 à 15 h, il y a 35 min. De 15 h à 16 h, il y a 1 h. De 16 h à 16 h 05, il y a 5 min. Total : 35 min + 1 h + 5 min = 1 h 40 min."
    ),
    tags: ["duree_temps", "calculer", "short"],
  },
  {
    kind: "fixed",
    id: "duree_calculer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Un film se termine à 22 h 10. Il a duré 1 h 55. À quelle heure a-t-il commencé ?",
    format: "short",
    expected: ["20 h 15", "20h15", "20:15"],
    comparator: "contains_keyword",
    hint: "On recule : d'abord 1 h, puis 55 min.",
    explanation: expl(
      "On recule de 1 h : 22 h 10 − 1 h = 21 h 10. Puis de 55 min : de 21 h 10 on recule 10 min jusqu'à 21 h, puis encore 45 min, ce qui donne 20 h 15."
    ),
    tags: ["duree_temps", "calculer", "short"],
  },
  {
    kind: "fixed",
    id: "duree_calculer_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève écrit : 8 h 50 + 20 min = 8 h 70. A-t-il raison ?",
    format: "qcm",
    choices: [
      "non : 60 minutes font une heure, donc c'est 9 h 10",
      "oui : on additionne les minutes entre elles",
      "non : c'est 8 h 10",
      "oui, mais il faudrait écrire 8,70 h",
    ],
    expected: ["non : 60 minutes font une heure, donc c'est 9 h 10"],
    comparator: "mcq_exact",
    hint: "Une horloge ne compte pas jusqu'à 100.",
    explanation: expl(
      "50 + 20 = 70 minutes, mais une heure n'en contient que 60. On échange 60 min contre 1 h : 70 min = 1 h 10 min. Donc 8 h 50 + 20 min = 9 h 10."
    ),
    tags: ["duree_temps", "calculer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "duree_calculer_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Il est 17 h 22. Lis l'affichage et donne l'heure qu'il sera dans 50 minutes.",
    format: "short",
    expected: ["18 h 12", "18h12", "18:12"],
    comparator: "contains_keyword",
    hint: "De 17 h 22 à 18 h, il y a 38 minutes.",
    explanation: expl(
      "De 17 h 22 à 18 h, il y a 38 min. Il reste 50 − 38 = 12 min à ajouter après 18 h : il sera 18 h 12."
    ),
    tags: ["duree_temps", "calculer", "canvas"],
    canvas: digital("17:22", "maintenant"),
  },
  {
    kind: "template",
    id: "duree_calculer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe par l'heure ronde : c'est le chemin le plus court.",
    tags: ["duree_temps", "calculer", "template"],
    generate: () => {
      const h1 = randomInt(8, 20);
      const m1 = randomInt(5, 55);
      const ajout = randomInt(20, 150);
      const total = h1 * 60 + m1 + ajout;
      const h2 = Math.floor(total / 60) % 24;
      const m2 = total % 60;
      const versRonde = 60 - m1;
      return {
        text: `Un atelier commence à ${hhmm(h1, m1)} et dure ${ajout} minutes. À quelle heure se termine-t-il ?`,
        format: "short",
        expected: [hhmm(h2, m2), `${h2}h${String(m2).padStart(2, "0")}`],
        comparator: "contains_keyword",
        explanation: expl(
          `De ${hhmm(h1, m1)} à ${h1 + 1} h, il y a ${versRonde} min. Il reste ${ajout - versRonde} min à ajouter, ce qui mène à ${hhmm(h2, m2)}.`
        ),
        canvas: deuxHorloges({ h: h1, m: m1 }, { h: h2, m: m2 }),
      };
    },
  },
  {
    kind: "template",
    id: "duree_calculer_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte d'abord jusqu'à l'heure ronde suivante.",
    tags: ["duree_temps", "calculer", "template"],
    generate: () => {
      const h1 = randomInt(7, 17);
      const m1 = randomInt(5, 55);
      const duree = randomInt(25, 180);
      const total = h1 * 60 + m1 + duree;
      const h2 = Math.floor(total / 60);
      const m2 = total % 60;
      const heures = Math.floor(duree / 60);
      const minutes = duree % 60;
      const reponse = heures === 0 ? `${minutes} min` : hhmm(heures, minutes);
      return {
        text: `Une activité commence à ${hhmm(h1, m1)} et se termine à ${hhmm(h2, m2)}. Combien de temps a-t-elle duré ?`,
        format: "short",
        expected: [reponse, `${duree} min`, `${duree} minutes`],
        comparator: "contains_keyword",
        explanation: expl(
          `De ${hhmm(h1, m1)} à ${h1 + 1} h il y a ${60 - m1} min, puis on avance jusqu'à ${hhmm(h2, m2)}. La durée totale est ${duree} min, soit ${reponse}.`
        ),
        canvas: deuxHorloges({ h: h1, m: m1 }, { h: h2 % 24, m: m2 }),
      };
    },
  },
  {
    kind: "template",
    id: "duree_calculer_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis en quoi le temps ne se compte pas comme les nombres décimaux.",
    tags: ["duree_temps", "calculer", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi on ne peut pas poser 9 h 10 − 8 h 15 comme une soustraction ordinaire, chiffre par chiffre.",
          mots: ["60", "soixante", "base dix", "retenue", "heure"],
          r: "Une heure vaut 60 minutes, pas 100 : la retenue ne vaut donc pas 10 mais 60. On échange 1 h contre 60 min — 9 h 10 devient 8 h 70 — et alors 8 h 70 − 8 h 15 = 55 min. Plus simple encore : on passe par 9 h.",
        },
        {
          q: "Explique pourquoi il est plus sûr de passer par l'heure ronde pour calculer une durée.",
          mots: ["heure ronde", "ronde", "étapes", "etapes", "60"],
          r: "En coupant le calcul à l'heure ronde, on ne manipule jamais plus de 60 minutes d'un coup, donc on n'a aucune retenue à gérer. De 8 h 15 à 9 h : 45 min. De 9 h à 9 h 10 : 10 min. Total 55 min.",
        },
        {
          q: "Un élève trouve une durée de 45 minutes entre 8 h 30 et 9 h 30. Explique son erreur.",
          mots: ["une heure", "1 h", "60", "égales", "egales"],
          r: "Entre 8 h 30 et 9 h 30, il s'écoule exactement une heure, soit 60 minutes : les minutes sont les mêmes des deux côtés, seule l'heure a changé. Il a probablement soustrait de travers.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // DUREE_CONVERTIR
  // =========================
  {
    kind: "fixed",
    id: "duree_convertir_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de minutes dans 3 heures ?",
    format: "short",
    expected: ["180"],
    comparator: "number_equal",
    hint: "1 h = 60 min.",
    explanation: expl("3 × 60 = 180 minutes."),
    tags: ["duree_temps", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "duree_convertir_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 3 h 20 min en minutes.",
    format: "short",
    expected: ["200"],
    comparator: "number_equal",
    hint: "On convertit les heures, puis on ajoute les minutes restantes.",
    explanation: expl("3 h = 3 × 60 = 180 min. On ajoute les 20 min : 180 + 20 = 200 minutes."),
    tags: ["duree_temps", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "duree_convertir_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 150 minutes en heures et minutes.",
    format: "short",
    expected: ["2 h 30", "2h30", "2 h 30 min"],
    comparator: "contains_keyword",
    hint: "Combien de fois 60 tient-il dans 150 ?",
    explanation: expl(
      "150 ÷ 60 = 2 et il reste 30, car 2 × 60 = 120 et 150 − 120 = 30. Donc 150 min = 2 h 30 min."
    ),
    tags: ["duree_temps", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "duree_convertir_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 4,
    theme: "neutral",
    text: "Combien font 34 990 secondes en heures, minutes et secondes ?",
    format: "short",
    expected: ["9 h 43 min 10 s", "9 h 43 min 10", "9h43min10s", "9 h 43 10"],
    comparator: "contains_keyword",
    hint: "Une heure vaut 3 600 secondes.",
    explanation: expl(
      "34 990 ÷ 3 600 = 9, car 9 × 3 600 = 32 400, et il reste 34 990 − 32 400 = 2 590 s. Puis 2 590 ÷ 60 = 43, car 43 × 60 = 2 580, et il reste 10 s. Donc 34 990 s = 9 h 43 min 10 s."
    ),
    tags: ["duree_temps", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "duree_convertir_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 4,
    theme: "neutral",
    text: "Combien font 609 heures en semaines, jours et heures ?",
    format: "short",
    expected: ["3 semaines 4 jours 9 heures", "3 semaines, 4 jours et 9 heures", "3 4 9"],
    comparator: "contains_keyword",
    hint: "Un jour vaut 24 h, une semaine 7 jours.",
    explanation: expl(
      "609 ÷ 24 = 25 jours et il reste 9 h (25 × 24 = 600). Puis 25 ÷ 7 = 3 semaines et il reste 4 jours (3 × 7 = 21). Donc 609 h = 3 semaines, 4 jours et 9 heures."
    ),
    tags: ["duree_temps", "convertir", "short"],
  },
  {
    kind: "fixed",
    id: "duree_convertir_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Est-il plus long d'emprunter de l'argent sur 76 mois ou sur 5 ans ?",
    format: "qcm",
    choices: [
      "sur 76 mois, car 5 ans ne font que 60 mois",
      "sur 5 ans, car 5 ans font 80 mois",
      "c'est la même durée",
      "on ne peut pas comparer des mois et des années",
    ],
    expected: ["sur 76 mois, car 5 ans ne font que 60 mois"],
    comparator: "mcq_exact",
    hint: "Mets les deux durées dans la même unité.",
    explanation: expl(
      "5 ans = 5 × 12 = 60 mois. On compare alors 76 mois et 60 mois : l'emprunt sur 76 mois est le plus long, de 16 mois."
    ),
    tags: ["duree_temps", "convertir", "qcm"],
  },
  {
    kind: "fixed",
    id: "duree_convertir_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de secondes dans 4 minutes ?",
    format: "short",
    expected: ["240"],
    comparator: "number_equal",
    hint: "1 min = 60 s.",
    explanation: expl("4 × 60 = 240 secondes."),
    tags: ["duree_temps", "convertir", "short"],
  },
  {
    kind: "template",
    id: "duree_convertir_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise par 60 : le quotient donne les heures, le reste les minutes.",
    tags: ["duree_temps", "convertir", "template"],
    generate: () => {
      const h = randomInt(1, 6);
      const m = randomInt(5, 55);
      const total = h * 60 + m;
      return {
        text: `Écris ${total} minutes en heures et minutes.`,
        format: "short",
        expected: [hhmm(h, m), `${h}h${String(m).padStart(2, "0")}`, `${h} h ${m} min`],
        comparator: "contains_keyword",
        explanation: expl(
          `${total} ÷ 60 = ${h} et il reste ${m}, car ${h} × 60 = ${h * 60} et ${total} − ${h * 60} = ${m}. Donc ${total} min = ${hhmm(h, m)}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "duree_convertir_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "On convertit les heures en minutes, puis on ajoute le reste.",
    tags: ["duree_temps", "convertir", "template"],
    generate: () => {
      const h = randomInt(1, 8);
      const m = randomInt(5, 55);
      return {
        text: `Écris ${hhmm(h, m)} en minutes.`,
        format: "short",
        expected: [String(h * 60 + m)],
        comparator: "number_equal",
        explanation: expl(
          `${h} h = ${h} × 60 = ${h * 60} min. On ajoute les ${m} min : ${h * 60} + ${m} = ${h * 60 + m} minutes.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "duree_convertir_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_convertir",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare la façon de compter le temps à celle des longueurs.",
    tags: ["duree_temps", "convertir", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi convertir 2,5 km en mètres est plus simple que convertir 2 h 30 en minutes.",
          mots: ["1000", "60", "base dix", "dix", "soixante"],
          r: "Les longueurs se convertissent par 10, 100, 1 000 : 2,5 km = 2 500 m, il suffit de décaler la virgule. Le temps, lui, se compte par 60 : 2 h 30 = 2 × 60 + 30 = 150 min. Aucune virgule ne se décale.",
        },
        {
          q: "Explique comment convertir un nombre de secondes en heures, minutes et secondes.",
          mots: ["3600", "60", "reste", "diviser", "division"],
          r: "On divise d'abord par 3 600, car une heure vaut 3 600 secondes : le quotient donne les heures. On reprend le reste et on le divise par 60 : le quotient donne les minutes, et le nouveau reste donne les secondes.",
        },
        {
          q: "Explique pourquoi une même durée peut s'écrire de plusieurs façons.",
          mots: ["unité", "unite", "minutes", "heures", "même", "meme"],
          r: "Une durée ne change pas quand on change d'unité : 150 minutes, 2 h 30 min et 2,5 h désignent la même durée. On choisit l'écriture la plus commode — les minutes pour calculer, les heures et minutes pour lire un horaire.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // DUREE_DECIMALE — l'écriture décimale d'une durée
  // =========================
  {
    kind: "fixed",
    id: "duree_decimale_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de minutes valent 0,5 h ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "0,5 h, c'est la moitié d'une heure.",
    explanation: expl("0,5 h = 1/2 h, soit la moitié de 60 minutes : 30 min."),
    tags: ["duree_temps", "decimale", "short"],
  },
  {
    kind: "fixed",
    id: "duree_decimale_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de minutes valent 0,25 h ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "0,25 h, c'est un quart d'heure.",
    explanation: expl("0,25 h = 1/4 h, soit le quart de 60 minutes : 60 ÷ 4 = 15 min."),
    tags: ["duree_temps", "decimale", "short"],
  },
  {
    kind: "fixed",
    id: "duree_decimale_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de minutes valent 0,75 h ?",
    format: "short",
    expected: ["45"],
    comparator: "number_equal",
    hint: "0,75 h, ce sont trois quarts d'heure.",
    explanation: expl("0,75 h = 3/4 h, soit 3 × 15 = 45 min."),
    tags: ["duree_temps", "decimale", "short"],
  },
  {
    kind: "fixed",
    id: "duree_decimale_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de minutes valent 0,1 h ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "0,1 h, c'est le dixième d'une heure.",
    explanation: expl("0,1 h = 1/10 h, soit 60 ÷ 10 = 6 min."),
    tags: ["duree_temps", "decimale", "short"],
  },
  {
    kind: "fixed",
    id: "duree_decimale_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 3,
    theme: "neutral",
    text: "L'écriture 1,30 h désigne-t-elle la même durée que 1 h 30 min ?",
    format: "qcm",
    choices: [
      "non : 1,30 h vaut 1 h 18 min",
      "oui : ce sont deux façons d'écrire la même durée",
      "non : 1,30 h vaut 1 h 03 min",
      "oui, à condition d'écrire 1,3 h sans le zéro",
    ],
    expected: ["non : 1,30 h vaut 1 h 18 min"],
    comparator: "mcq_exact",
    hint: "Le chiffre après la virgule compte des dixièmes d'heure, pas des minutes.",
    explanation: expl(
      "1,30 h = 1,3 h = 1 h + 0,3 h. Or 0,3 h = 3 × 6 = 18 min. Donc 1,30 h = 1 h 18 min, et non 1 h 30 min (qui s'écrirait 1,5 h)."
    ),
    tags: ["duree_temps", "decimale", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "duree_decimale_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 1 h 30 min sous forme décimale, en heures.",
    format: "short",
    expected: ["1,5", "1.5", "1,5 h"],
    comparator: "number_equal",
    hint: "30 minutes, c'est une demi-heure.",
    explanation: expl("30 min = 0,5 h, donc 1 h 30 min = 1,5 h."),
    tags: ["duree_temps", "decimale", "short"],
  },
  {
    kind: "template",
    id: "duree_decimale_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 3,
    theme: "neutral",
    hint: "Un dixième d'heure vaut 6 minutes.",
    tags: ["duree_temps", "decimale", "template"],
    generate: () => {
      const dixiemes = randomInt(1, 9);
      const minutes = dixiemes * 6;
      return {
        text: `Combien de minutes valent 0,${dixiemes} h ?`,
        format: "short",
        expected: [String(minutes)],
        comparator: "number_equal",
        explanation: expl(
          `0,1 h vaut 6 minutes (60 ÷ 10). Donc 0,${dixiemes} h = ${dixiemes} × 6 = ${minutes} minutes.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "duree_decimale_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_decimale",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis ce que compte le chiffre placé après la virgule.",
    tags: ["duree_temps", "decimale", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi 2,5 h ne se lit pas « 2 h 5 min ».",
          mots: ["dixième", "dixieme", "moitié", "moitie", "30", "0,5"],
          r: "Le chiffre après la virgule compte des dixièmes d'HEURE, pas des minutes. 0,5 h est la moitié d'une heure, soit 30 min : 2,5 h = 2 h 30 min. « 2 h 5 min » s'écrirait plutôt 2,08 h.",
        },
        {
          q: "Explique pourquoi une calculatrice affiche 1,75 quand on lui demande 1 h 45 min en heures.",
          mots: ["45", "60", "0,75", "trois quarts", "quart"],
          r: "45 minutes, ce sont trois quarts d'heure : 45 ÷ 60 = 0,75. La calculatrice affiche donc 1,75 h. Pour revenir aux minutes, on refait le chemin inverse : 0,75 × 60 = 45.",
        },
        {
          q: "Explique comment passer d'une durée en minutes à une durée en heures écrite avec une virgule.",
          mots: ["60", "diviser", "division"],
          r: "On divise le nombre de minutes par 60, puisqu'une heure en contient 60. Par exemple 90 ÷ 60 = 1,5, donc 90 min = 1,5 h. Le résultat ne tombe pas toujours juste : 50 ÷ 60 n'est pas un nombre décimal.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // DUREE_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "duree_probleme_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Il est 17 h 26. D'après le tableau, quel est le prochain bus au départ ?",
    format: "qcm",
    choices: ["le 185, à 17 h 54", "le 303, à 17 h 42", "le 321, à 17 h 50", "le 70, à 17 h 30"],
    expected: ["le 70, à 17 h 30"],
    comparator: "mcq_exact",
    hint: "Cherche le plus petit horaire qui vient APRÈS 17 h 26.",
    explanation: expl(
      "On écarte les départs déjà passés (17 h 24 et 17 h 25). Parmi ceux qui restent — 17 h 30, 17 h 42, 17 h 50, 17 h 54 — le plus proche est 17 h 30 : c'est le bus 70."
    ),
    tags: ["duree_temps", "probleme", "canvas"],
    canvas: {
      kind: "tableau_donnees",
      headers: ["Bus", "Heure de départ"],
      rows: [
        { values: ["70", "17 h 30"] },
        { values: ["179", "17 h 25"] },
        { values: ["185", "17 h 54"] },
        { values: ["303", "17 h 42"] },
        { values: ["321", "17 h 50"] },
        { values: ["325", "17 h 24"] },
      ],
      questionLabel: "Il est 17 h 26.",
    },
  },
  {
    kind: "fixed",
    id: "duree_probleme_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Il est 17 h 26. Un ami te prévient qu'il te rejoint dans 12 minutes. Pourrez-vous prendre ensemble le bus 303, qui part à 17 h 42 ?",
    format: "qcm",
    choices: [
      "oui : il arrive à 17 h 38, soit 4 minutes avant le départ",
      "non : il arrive à 17 h 38, soit après le départ",
      "oui : il arrive à 17 h 48, juste à temps",
      "non : il arrive à 17 h 44, soit 2 minutes trop tard",
    ],
    expected: ["oui : il arrive à 17 h 38, soit 4 minutes avant le départ"],
    comparator: "mcq_exact",
    hint: "Calcule d'abord son heure d'arrivée.",
    explanation: expl(
      "17 h 26 + 12 min = 17 h 38. Le bus part à 17 h 42, soit 4 minutes plus tard : vous pouvez le prendre ensemble."
    ),
    tags: ["duree_temps", "probleme", "qcm"],
  },
  {
    kind: "fixed",
    id: "duree_probleme_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève a 26 heures de cours par semaine, en séances de 55 minutes. Quelle est la durée hebdomadaire réelle de ses cours, en heures et minutes ?",
    format: "short",
    expected: ["23 h 50", "23h50", "1430 min"],
    comparator: "contains_keyword",
    hint: "26 séances de 55 minutes, puis on convertit.",
    explanation: expl(
      "26 × 55 = 1 430 minutes. Puis 1 430 ÷ 60 = 23 et il reste 50 (23 × 60 = 1 380). La durée réelle est 23 h 50 min — soit un peu plus de 2 heures de moins que les « 26 heures » annoncées."
    ),
    tags: ["duree_temps", "probleme", "short"],
  },
  {
    kind: "template",
    id: "duree_probleme_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie, puis convertis en heures et minutes.",
    tags: ["duree_temps", "probleme", "template"],
    generate: () => {
      const seances = randomInt(4, 14);
      const minutes = [40, 45, 50, 55][randomInt(0, 3)];
      const total = seances * minutes;
      const h = Math.floor(total / 60);
      const m = total % 60;
      const activites = ["natation", "musique", "athlétisme", "théâtre", "escalade"];
      const a = activites[randomInt(0, activites.length - 1)];
      return {
        text: `Un club de ${a} propose ${seances} séances de ${minutes} minutes dans le trimestre. Quelle est la durée totale, en heures et minutes ?`,
        format: "short",
        expected: [hhmm(h, m), `${h}h${String(m).padStart(2, "0")}`, `${total} min`],
        comparator: "contains_keyword",
        explanation: expl(
          `${seances} × ${minutes} = ${total} minutes. Puis ${total} ÷ 60 = ${h} et il reste ${m} : la durée totale est ${hhmm(h, m)}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "duree_probleme_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule l'heure d'arrivée, puis compare-la à l'horaire.",
    tags: ["duree_temps", "probleme", "template"],
    generate: () => {
      const h = randomInt(7, 18);
      const m = randomInt(5, 45);
      const trajet = randomInt(8, 40);
      const marge = randomInt(-10, 15);
      const arriveeTotal = h * 60 + m + trajet;
      const departTotal = arriveeTotal + marge;
      const dh = Math.floor(departTotal / 60);
      const dm = departTotal % 60;
      const ah = Math.floor(arriveeTotal / 60);
      const am = arriveeTotal % 60;
      const aTemps = marge >= 0;
      return {
        text: `Il est ${hhmm(h, m)}. Le trajet jusqu'à l'arrêt dure ${trajet} minutes, et le bus part à ${hhmm(dh, dm)}. Arriveras-tu à temps ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [aTemps ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          `${hhmm(h, m)} + ${trajet} min = ${hhmm(ah, am)}. Le bus part à ${hhmm(dh, dm)}, soit ${Math.abs(marge)} minute(s) ${aTemps ? "plus tard" : "plus tôt"} : ${aTemps ? "tu arrives à temps" : "tu arrives trop tard"}.`
        ),
      };
    },
  },

  // =========================
  // DUREE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "duree_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un réveil sonne à 6 h 30. On appuie trois fois sur « répéter », qui décale la sonnerie de 9 minutes à chaque fois. À quelle heure sonne-t-il pour de bon ?",
    format: "short",
    expected: ["6 h 57", "6h57"],
    comparator: "contains_keyword",
    hint: "Trois fois neuf minutes.",
    explanation: expl("3 × 9 = 27 minutes. 6 h 30 + 27 min = 6 h 57."),
    tags: ["duree_temps", "defi", "short"],
  },
  {
    kind: "fixed",
    id: "duree_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un film commence à 23 h 20 et dure 1 h 50. À quelle heure se termine-t-il ?",
    format: "short",
    expected: ["1 h 10", "1h10", "01:10"],
    comparator: "contains_keyword",
    hint: "Attention : on passe minuit.",
    explanation: expl(
      "De 23 h 20 à minuit, il y a 40 min. Il reste 1 h 50 − 40 min = 1 h 10 après minuit. Le film se termine à 1 h 10 du matin, le lendemain."
    ),
    tags: ["duree_temps", "defi", "short"],
  },
  {
    kind: "fixed",
    id: "duree_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_defi",
    difficulty: 5,
    theme: "neutral",
    text: "À La Réunion, la course de la Diagonale des Fous a été terminée en 23 h 45 min par le vainqueur, parti à 22 h 00 le jeudi. À quelle heure est-il arrivé, et quel jour ?",
    format: "qcm",
    choices: [
      "vendredi à 21 h 45",
      "vendredi à 22 h 45",
      "jeudi à 21 h 45",
      "samedi à 21 h 45",
    ],
    expected: ["vendredi à 21 h 45"],
    comparator: "mcq_exact",
    hint: "23 h 45, c'est 15 minutes de moins qu'une journée entière.",
    explanation: expl(
      "Une journée fait 24 h. 23 h 45 min, c'est 15 minutes de moins : l'arrivée est donc 15 minutes AVANT 22 h le lendemain, soit vendredi à 21 h 45."
    ),
    tags: ["duree_temps", "defi", "974", "qcm"],
  },
  {
    kind: "template",
    id: "duree_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte d'abord ce qu'il reste jusqu'à minuit.",
    tags: ["duree_temps", "defi", "template"],
    generate: () => {
      const h = randomInt(21, 23);
      const m = randomInt(5, 55);
      const duree = randomInt(70, 200);
      const versMinuit = (24 - h) * 60 - m;
      const apres = duree - versMinuit;
      const fh = Math.floor(apres / 60);
      const fm = apres % 60;
      return {
        text: `Une émission commence à ${hhmm(h, m)} et dure ${duree} minutes. À quelle heure se termine-t-elle ?`,
        format: "short",
        expected: [hhmm(fh, fm), `${fh}h${String(fm).padStart(2, "0")}`],
        comparator: "contains_keyword",
        explanation: expl(
          `De ${hhmm(h, m)} à minuit, il y a ${versMinuit} min. Il reste ${apres} min après minuit, soit ${hhmm(fh, fm)} le lendemain matin.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "duree_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "duree_temps",
    microId: "duree_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique le raisonnement, pas seulement le résultat.",
    tags: ["duree_temps", "defi", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique comment calculer une durée qui passe minuit, sans se tromper.",
          mots: ["minuit", "24", "deux", "coupe", "étapes", "etapes"],
          r: "On coupe la durée en deux morceaux : ce qu'il reste jusqu'à minuit, puis ce qui déborde après. De 23 h 20 à minuit il y a 40 min ; si la durée est de 1 h 50, il reste 1 h 10 après minuit, donc la fin est à 1 h 10.",
        },
        {
          q: "Explique pourquoi « 26 heures de cours par semaine » ne fait pas vraiment 26 heures.",
          mots: ["55", "séance", "seance", "heure", "moins"],
          r: "Une « heure de cours » dure en réalité 55 minutes, pas 60. Vingt-six séances font donc 26 × 55 = 1 430 minutes, soit 23 h 50 min : plus de deux heures de moins que ce que le mot laisse croire.",
        },
        {
          q: "Explique pourquoi une horloge revient au même endroit toutes les 12 heures alors qu'une journée en compte 24.",
          mots: ["12", "24", "deux tours", "tour", "matin"],
          r: "La petite aiguille fait un tour complet du cadran en 12 heures. Il lui en faut donc deux pour couvrir une journée de 24 heures : un tour le matin, un tour l'après-midi. C'est pourquoi on précise « du matin » ou « du soir », ou qu'on écrit 14 h plutôt que 2 h.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },
];
