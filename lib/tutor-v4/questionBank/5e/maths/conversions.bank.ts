// CONVERSIONS ET DURÉES (5ᵉ) — notion `grandeur_conversion`.
//
// POURQUOI CETTE BANQUE EXISTE (15/08/2026). L'évaluation nationale de 4ᵉ teste
// les conversions et les durées dans son domaine « grandeurs et mesures » :
// 135 minutes en heures et minutes, 75 L en centilitres, et un problème de
// lait et de beurre qui mêle kilogrammes et grammes. Or `BO5M1 « Grandeurs et
// mesures »` ne portait qu'une notion, les aires — le thème « grandeurs » de
// l'épreuve blanche de 4ᵉ ne pouvait donc proposer que des aires et des
// volumes. Cinq questions sur vingt ne ressemblaient pas à celles du jour J.
//
// ⭐ TROIS ITEMS SONT OFFICIELS, repris des ressources d'accompagnement Éduscol
// de juillet 2023 avec l'analyse de leurs distracteurs faite avec la DEPP. Ils
// sont signalés un par un. Les autres sont écrits ici, et leurs diagnostics
// disent une méprise qu'on peut défendre — jamais une méprise inventée pour
// remplir la case.
//
// ⚠️ CE QUE LA FICHE ÉDUSCOL DÉSIGNE COMME L'ERREUR CENTRALE : « calculs
// effectués ou comparaisons de grandeurs, mesurées dans des unités
// différentes, sans conversion ». C'est ce que teste la micro-compétence
// `conversion_avant_calcul`, et c'est elle qui porte le plus de distracteurs.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

const OFFICIEL = ["evaluation_nationale_4e", "eval4e_automatismes"];
const OFFICIEL_PB = ["evaluation_nationale_4e", "eval4e_resolution"];

export const conversionsBank: TutorBankItemV4[] = [
  /* ══════════════════════════════════════════════════════════════════════
     conversion_decimal — longueurs, masses, contenances
     ══════════════════════════════════════════════════════════════════════ */
  // ⭐ ITEM OFFICIEL (Éduscol/DEPP, automatismes). Les trois distracteurs et
  // leurs causes sont ceux de la fiche.
  // ⚠️ LE COMMENTAIRE RESTE AU-DESSUS DE L'ACCOLADE : `verifier-banque.mjs`
  // lit le SOURCE et cherche l'`id:` dans le bloc ; un commentaire glissé
  // entre `kind:` et `id:` lui fait voir un item « sans id ».
  {
    kind: "fixed",
    id: "5e_conversion_decimal_qcm_1_litres_centilitres",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Complète l’égalité : $75\\ \\text{L} = \\ldots\\ \\text{cL}$",
    format: "qcm",
    choices: ["7500", "0,75", "7,5", "750"],
    expected: ["7500"],
    comparator: "mcq_exact",
    hint: "Le préfixe « centi » veut dire centième : il y a 100 cL dans 1 L.",
    explanation: exp(
      "le préfixe « centi » désigne un centième d’unité.",
      "on passe d’une unité grande à une unité petite, donc on multiplie.",
      "1 L = 100 cL, donc 75 L = 75 × 100 = 7 500 cL.",
      "75 L font 7 500 cL."
    ),
    tags: [...OFFICIEL, "grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "0,75",
        cause:
          "Tu as divisé par 100 au lieu de multiplier. En allant vers une unité plus petite, le nombre devient plus grand.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "7,5",
        cause:
          "Tu as divisé par 10. Deux choses à revoir : le sens de l’opération, et le rapport entre le litre et le centilitre, qui est 100.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "750",
        cause:
          "Tu as multiplié par 10 : c’est le décilitre. Le préfixe « centi » vaut 100.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_decimal_qcm_2_km_metres",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_decimal",
    difficulty: 2,
    theme: "reunion",
    text: "La route du littoral fait environ $3,5\\ \\text{km}$.\nCombien cela fait-il de mètres ?",
    format: "qcm",
    choices: ["3500 m", "350 m", "35 m", "0,0035 m"],
    expected: ["3500 m"],
    comparator: "mcq_exact",
    hint: "1 km = 1 000 m.",
    explanation: exp(
      "le kilomètre vaut mille mètres.",
      "on passe du kilomètre au mètre, donc on multiplie par 1 000.",
      "3,5 × 1 000 = 3 500.",
      "la route fait environ 3 500 m."
    ),
    tags: ["grandeur_conversion", "reunion"],
    choiceDiagnostics: [
      {
        choice: "350 m",
        cause:
          "Tu as multiplié par 100. Le préfixe « kilo » vaut 1 000, pas 100.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "35 m",
        cause:
          "Tu as seulement déplacé la virgule d’un rang, c’est-à-dire multiplié par 10.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "0,0035 m",
        cause:
          "Tu as divisé par 1 000 au lieu de multiplier : 3,5 km deviendrait plus court que ta main.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_decimal_qcm_3_grammes_kilos",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_decimal",
    difficulty: 2,
    theme: "cuisine",
    text: "Un sac de riz pèse $2400\\ \\text{g}$.\nQuelle est sa masse en kilogrammes ?",
    format: "qcm",
    choices: ["2,4 kg", "24 kg", "240 kg", "0,24 kg"],
    expected: ["2,4 kg"],
    comparator: "mcq_exact",
    hint: "1 kg = 1 000 g. On va vers une unité plus grande.",
    explanation: exp(
      "le kilogramme vaut mille grammes.",
      "on passe du gramme au kilogramme, donc on divise par 1 000.",
      "2 400 ÷ 1 000 = 2,4.",
      "le sac pèse 2,4 kg."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "24 kg",
        cause:
          "Tu as divisé par 100. Entre le gramme et le kilogramme, le rapport est 1 000.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "240 kg",
        cause:
          "Tu as divisé par 10. Et 240 kg, ce serait le poids de trois personnes.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
      {
        choice: "0,24 kg",
        cause:
          "Tu as divisé par 10 000 : un rang de trop. Compte les zéros de 1 000.",
        errorKind: "careless",
        prereqMicroId: "conversion_decimal",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_decimal_open_1_sens_de_la_conversion",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_decimal",
    difficulty: 3,
    theme: "neutral",
    text: "Explique avec tes mots comment savoir, avant même de calculer, si le nombre va devenir plus grand ou plus petit quand on change d’unité.",
    format: "open",
    expected: [
      "plus petite",
      "plus grande",
      "multiplie",
      "divise",
      "unité",
      "unite",
    ],
    comparator: "contains_keyword",
    hint: "Compare la taille de l’unité de départ et celle de l’unité d’arrivée.",
    explanation: exp(
      "changer d’unité ne change pas la grandeur, seulement le nombre qui la mesure.",
      "on compare les deux unités : si l’unité d’arrivée est plus petite, il en faut davantage.",
      "d’un litre vers des centilitres, l’unité rétrécit cent fois, donc le nombre est multiplié par 100.",
      "unité plus petite, nombre plus grand — et l’inverse."
    ),
    tags: ["grandeur_conversion", "oral"],
  },
  {
    kind: "template",
    id: "5e_conversion_decimal_tpl_1_longueurs",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère d’abord le rapport entre les deux unités : 10, 100 ou 1 000.",
    tags: ["grandeur_conversion", "template"],
    generate: () => {
      const paires = [
        { de: "m", vers: "cm", facteur: 100 },
        { de: "km", vers: "m", facteur: 1000 },
        { de: "cm", vers: "mm", facteur: 10 },
        { de: "kg", vers: "g", facteur: 1000 },
        { de: "L", vers: "cL", facteur: 100 },
      ];
      const p = randomChoice(paires);
      const valeur = randomChoice([2, 3, 5, 7, 12, 25]);
      const resultat = valeur * p.facteur;

      return {
        text: `Convertis : $${valeur}\\ \\text{${p.de}} = \\ldots\\ \\text{${p.vers}}$`,
        format: "short" as const,
        expected: [String(resultat)],
        comparator: "number_equal" as const,
        explanation: exp(
          `il y a ${p.facteur} ${p.vers} dans 1 ${p.de}.`,
          "on va vers une unité plus petite, donc on multiplie.",
          `${valeur} × ${p.facteur} = ${resultat}.`,
          `${valeur} ${p.de} font ${resultat} ${p.vers}.`
        ),
      };
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     conversion_duree — le système sexagésimal
     ══════════════════════════════════════════════════════════════════════ */
  // ⭐ ITEM OFFICIEL (Éduscol/DEPP, automatismes).
  {
    kind: "fixed",
    id: "5e_conversion_duree_qcm_1_spectacle",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_duree",
    difficulty: 2,
    theme: "neutral",
    text: "Max assiste à un spectacle qui dure 135 minutes.\nComment cette durée peut-elle s’écrire autrement ?",
    format: "qcm",
    choices: ["2 h 15 min", "2 h 35 min", "1 h 15 min", "1 h 35 min"],
    expected: ["2 h 15 min"],
    comparator: "mcq_exact",
    hint: "Une heure fait 60 minutes, pas 100.",
    explanation: exp(
      "les durées ne se comptent pas de dix en dix : une heure vaut 60 minutes.",
      "on cherche combien de fois 60 tient dans 135, et ce qu’il reste.",
      "135 = 60 + 60 + 15, donc 135 min = 2 h 15 min.",
      "le spectacle dure 2 h 15 min."
    ),
    tags: [...OFFICIEL, "grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "2 h 35 min",
        cause:
          "Tu as compté 100 minutes pour 2 heures, comme si les durées se comptaient de dix en dix. Une heure fait 60 minutes.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_duree",
      },
      {
        choice: "1 h 15 min",
        cause:
          "Tu as compté 120 minutes pour une seule heure. 120 minutes, ce sont deux heures.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_duree",
      },
      {
        choice: "1 h 35 min",
        cause:
          "Tu as lu 135 comme « 1 » et « 35 » en séparant les chiffres. Une durée ne se découpe pas comme un nombre décimal.",
        errorKind: "format",
        prereqMicroId: "conversion_duree",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_duree_qcm_2_deux_heures_quarante_cinq",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_duree",
    difficulty: 2,
    theme: "neutral",
    text: "$2\\ \\text{h}\\ 45\\ \\text{min}$, c’est combien de minutes ?",
    format: "qcm",
    choices: ["165 min", "245 min", "105 min", "285 min"],
    expected: ["165 min"],
    comparator: "mcq_exact",
    hint: "Convertis d’abord les 2 heures en minutes, puis ajoute les 45.",
    explanation: exp(
      "une heure vaut 60 minutes.",
      "on transforme les heures en minutes, puis on ajoute les minutes restantes.",
      "2 × 60 = 120, puis 120 + 45 = 165.",
      "2 h 45 min font 165 minutes."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "245 min",
        cause:
          "Tu as collé le 2 des heures devant les 45 minutes. Il faut convertir les heures, pas les juxtaposer.",
        errorKind: "format",
        prereqMicroId: "conversion_duree",
      },
      {
        choice: "105 min",
        cause:
          "Tu n’as compté qu’une seule heure : 60 + 45. Il y en a deux.",
        errorKind: "careless",
        prereqMicroId: "conversion_duree",
      },
      {
        choice: "285 min",
        cause:
          "Tu as compté 120 minutes par heure au lieu de 60 : 240 + 45.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_duree",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_duree_qcm_3_une_heure_vingt",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_duree",
    difficulty: 1,
    theme: "sport",
    text: "Un entraînement dure $1\\ \\text{h}\\ 20\\ \\text{min}$.\nCette durée, c’est aussi …",
    format: "qcm",
    choices: ["80 min", "120 min", "1,20 min", "100 min"],
    expected: ["80 min"],
    comparator: "mcq_exact",
    hint: "Une heure, c’est 60 minutes. Ajoute ensuite les 20.",
    explanation: exp(
      "une heure vaut 60 minutes.",
      "on remplace l’heure par 60 minutes, puis on ajoute.",
      "60 + 20 = 80.",
      "l’entraînement dure 80 minutes."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "120 min",
        cause:
          "Tu as lu « 1 h 20 » comme le nombre 120. Ce sont deux écritures différentes.",
        errorKind: "format",
        prereqMicroId: "conversion_duree",
      },
      {
        choice: "1,20 min",
        cause:
          "Tu as écrit la durée avec une virgule. Une durée ne s’écrit pas comme un nombre décimal : la partie après la virgule ne compte pas des centièmes d’heure.",
        errorKind: "format",
        prereqMicroId: "conversion_duree",
      },
      {
        choice: "100 min",
        cause:
          "Tu as compté 80 minutes pour une heure, ou arrondi à la centaine. Une heure fait exactement 60 minutes.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_duree",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_duree_open_1_pourquoi_pas_soixante_dix",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_duree",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « 1 h 50 min + 20 min = 1 h 70 min ».\nExplique pourquoi cette écriture ne va pas, et donne la bonne.",
    format: "open",
    expected: ["60", "soixante", "heure", "2 h 10", "2h10", "retenue"],
    comparator: "contains_keyword",
    hint: "Que se passe-t-il quand les minutes dépassent 60 ?",
    explanation: exp(
      "une durée en minutes ne dépasse jamais 59 : à 60, on change d’heure.",
      "on additionne les minutes, puis on convertit tout ce qui dépasse 60.",
      "50 + 20 = 70, et 70 min = 1 h 10 min, donc 1 h + 1 h 10 = 2 h 10 min.",
      "l’écriture correcte est 2 h 10 min."
    ),
    tags: ["grandeur_conversion", "oral"],
  },
  {
    kind: "template",
    id: "5e_conversion_duree_tpl_1_minutes_vers_heures",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_duree",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche combien de fois 60 tient dans le nombre de minutes.",
    tags: ["grandeur_conversion", "template"],
    generate: () => {
      const heures = randomChoice([1, 2, 3]);
      const minutes = randomChoice([5, 15, 20, 25, 40, 50]);
      const total = heures * 60 + minutes;

      return {
        text: `Un trajet dure ${total} minutes. Combien de minutes reste-t-il une fois qu’on a compté ${heures} h ?`,
        format: "short" as const,
        expected: [String(minutes)],
        comparator: "number_equal" as const,
        explanation: exp(
          "une heure vaut 60 minutes.",
          "on retire autant de fois 60 qu’il y a d’heures entières.",
          `${total} − ${heures} × 60 = ${minutes}.`,
          `il reste ${minutes} minutes, donc ${total} min = ${heures} h ${minutes} min.`
        ),
      };
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     conversion_avant_calcul — l'erreur centrale de la fiche Éduscol
     ══════════════════════════════════════════════════════════════════════ */
  // ⭐ ITEM OFFICIEL (Éduscol/DEPP, résolution de problèmes).
  {
    kind: "fixed",
    id: "5e_conversion_avant_calcul_qcm_1_lait_beurre",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_avant_calcul",
    difficulty: 4,
    theme: "cuisine",
    text: "Avec $20\\ \\text{L}$ de lait on obtient $1\\ \\text{kg}$ de beurre.\nPour obtenir $100\\ \\text{g}$ de beurre, il faut :",
    format: "qcm",
    choices: [
      "2 L de lait",
      "2000 L de lait",
      "20 cL de lait",
      "200 L de lait",
    ],
    expected: ["2 L de lait"],
    comparator: "mcq_exact",
    hint: "Commence par écrire les deux masses de beurre dans la même unité.",
    explanation: exp(
      "les deux masses de beurre sont données dans des unités différentes.",
      "on convertit d’abord, puis on applique la proportionnalité.",
      "1 kg = 1 000 g, et 100 g, c’est dix fois moins ; il faut donc dix fois moins de lait : 20 ÷ 10 = 2.",
      "il faut 2 L de lait."
    ),
    tags: [...OFFICIEL_PB, "grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "2000 L de lait",
        cause:
          "Tu as multiplié 20 par 100. Or 100 g, c’est MOINS que 1 kg : il faut donc moins de lait, pas davantage.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
      {
        choice: "20 cL de lait",
        cause:
          "Tu as changé l’unité du lait au lieu de convertir la masse du beurre. C’est le beurre qui est donné en deux unités.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_avant_calcul",
      },
      {
        choice: "200 L de lait",
        cause:
          "Tu as bien converti 1 kg en 1 000 g et repéré le rapport 10, mais tu as multiplié par 10 au lieu de diviser.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_avant_calcul",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_avant_calcul_qcm_2_comparer_contenances",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_avant_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Laquelle de ces trois contenances est la plus grande : $0,5\\ \\text{L}$, $75\\ \\text{cL}$, $400\\ \\text{mL}$ ?",
    format: "qcm",
    choices: ["75 cL", "400 mL", "0,5 L", "Elles sont égales"],
    expected: ["75 cL"],
    comparator: "mcq_exact",
    hint: "Mets les trois dans la même unité avant de comparer.",
    explanation: exp(
      "on ne peut comparer des grandeurs que dans une même unité.",
      "on convertit tout en centilitres, puis on compare les nombres.",
      "0,5 L = 50 cL ; 75 cL ; 400 mL = 40 cL.",
      "la plus grande est 75 cL."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "400 mL",
        cause:
          "Tu as comparé les nombres écrits, et 400 est le plus grand des trois. Mais 400 mL ne font que 40 cL : il faut convertir avant de comparer.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_avant_calcul",
      },
      {
        choice: "0,5 L",
        cause:
          "Tu as choisi celle dont l’unité est la plus grande, le litre, sans regarder le nombre : 0,5 L ne font que 50 cL.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_avant_calcul",
      },
      {
        choice: "Elles sont égales",
        cause:
          "En convertissant, on obtient 50 cL, 75 cL et 40 cL : elles sont bien différentes.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_avant_calcul_qcm_3_ruban",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_avant_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Un ruban mesure $1,2\\ \\text{m}$. On en coupe $45\\ \\text{cm}$.\nQuelle longueur reste-t-il ?",
    format: "qcm",
    choices: ["75 cm", "0,75 cm", "43,8 cm", "75 m"],
    expected: ["75 cm"],
    comparator: "mcq_exact",
    hint: "Écris les deux longueurs dans la même unité avant de soustraire.",
    explanation: exp(
      "on ne soustrait que des grandeurs exprimées dans la même unité.",
      "on convertit le mètre en centimètres, puis on soustrait.",
      "1,2 m = 120 cm, puis 120 − 45 = 75.",
      "il reste 75 cm."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "0,75 cm",
        cause:
          "Ton calcul est juste en mètres — 1,2 − 0,45 = 0,75 — mais l’unité écrite ne l’est pas : 0,75 m, c’est 75 cm.",
        errorKind: "format",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "43,8 cm",
        cause:
          "Tu as calculé 45 − 1,2 comme si les deux nombres étaient dans la même unité. Il fallait convertir d’abord.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_avant_calcul",
      },
      {
        choice: "75 m",
        cause:
          "Le nombre est bon, l’unité non : 75 m, ce serait la longueur d’une piste d’athlétisme.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_avant_calcul_open_1_deux_unites",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_avant_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Un problème donne une masse en kilogrammes et une autre en grammes, puis demande la masse totale.\nExplique ce qu’il faut faire avant d’additionner, et pourquoi.",
    format: "open",
    expected: [
      "convertir",
      "conversion",
      "même unité",
      "meme unite",
      "unité",
      "unite",
    ],
    comparator: "contains_keyword",
    hint: "Peut-on ajouter des kilogrammes à des grammes tels quels ?",
    explanation: exp(
      "une addition n’a de sens qu’entre grandeurs exprimées dans la même unité.",
      "on choisit une unité commune, on convertit, puis on additionne.",
      "2 kg + 300 g devient 2 000 g + 300 g = 2 300 g.",
      "on convertit d’abord, sinon on additionne des nombres qui ne comptent pas la même chose."
    ),
    tags: ["grandeur_conversion", "oral"],
  },
  {
    kind: "template",
    id: "5e_conversion_avant_calcul_tpl_1_somme_deux_unites",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_avant_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis d’abord les kilogrammes en grammes.",
    tags: ["grandeur_conversion", "template"],
    generate: () => {
      const kg = randomChoice([1, 2, 3, 4]);
      const g = randomChoice([150, 250, 400, 750]);
      const total = kg * 1000 + g;

      return {
        text: `Un colis contient un paquet de ${kg} kg et un paquet de ${g} g. Quelle est la masse totale, en grammes ?`,
        format: "short" as const,
        expected: [String(total)],
        comparator: "number_equal" as const,
        explanation: exp(
          "on n’additionne que des grandeurs de même unité.",
          "on convertit les kilogrammes en grammes, puis on additionne.",
          `${kg} kg = ${kg * 1000} g, puis ${kg * 1000} + ${g} = ${total}.`,
          `la masse totale est ${total} g.`
        ),
      };
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     conversion_coherence — « contrôle de l'unité finale » (fiche Éduscol)
     ══════════════════════════════════════════════════════════════════════ */
  {
    kind: "fixed",
    id: "5e_conversion_coherence_qcm_1_deux_km",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_coherence",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : $2\\ \\text{km} = 200\\ \\text{m}$.\nSans poser de calcul, qu’est-ce qui montre que c’est faux ?",
    format: "qcm",
    choices: [
      "1 km vaut 1 000 m, donc 2 km valent bien plus que 200 m",
      "Il fallait diviser par 100",
      "2 est plus petit que 200",
      "On ne peut pas convertir des kilomètres en mètres",
    ],
    expected: ["1 km vaut 1 000 m, donc 2 km valent bien plus que 200 m"],
    comparator: "mcq_exact",
    hint: "Combien de mètres dans un seul kilomètre ?",
    explanation: exp(
      "un ordre de grandeur se contrôle avant tout calcul.",
      "on compare le résultat annoncé à ce que vaut une seule unité.",
      "1 km = 1 000 m, donc 2 km = 2 000 m, dix fois plus que 200 m.",
      "le résultat annoncé est dix fois trop petit."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "Il fallait diviser par 100",
        cause:
          "Non : du kilomètre vers le mètre on multiplie, et par 1 000. Diviser rendrait le résultat encore plus petit.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
      {
        choice: "2 est plus petit que 200",
        cause:
          "Comparer les nombres seuls ne dit rien : 2 km sont plus longs que 200 m, justement parce que les unités diffèrent.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_avant_calcul",
      },
      {
        choice: "On ne peut pas convertir des kilomètres en mètres",
        cause:
          "Si : ce sont deux unités de longueur du même système, on passe de l’une à l’autre en multipliant par 1 000.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_decimal",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_coherence_qcm_2_bouteille",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_coherence",
    difficulty: 1,
    theme: "neutral",
    text: "Une grande bouteille d’eau contient environ …",
    format: "qcm",
    choices: ["1,5 L", "1,5 mL", "1,5 cL", "1500 L"],
    expected: ["1,5 L"],
    comparator: "mcq_exact",
    hint: "Pense à une bouteille que tu as déjà tenue.",
    explanation: exp(
      "un ordre de grandeur se vérifie en pensant à un objet réel.",
      "on compare chaque proposition à ce qu’on connaît.",
      "1,5 mL tiendrait dans une cuillère, 1,5 cL dans un dé à coudre, 1 500 L rempliraient une citerne.",
      "une grande bouteille contient environ 1,5 L."
    ),
    tags: ["grandeur_conversion"],
    choiceDiagnostics: [
      {
        choice: "1,5 mL",
        cause:
          "Le millilitre est mille fois plus petit que le litre : 1,5 mL tiendrait au fond d’une cuillère.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
      {
        choice: "1,5 cL",
        cause:
          "Le centilitre est cent fois plus petit que le litre : 1,5 cL, c’est une gorgée.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
      {
        choice: "1500 L",
        cause:
          "1 500 L, c’est le volume d’une citerne. Tu as pris le nombre de millilitres et gardé l’unité litre.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_coherence_qcm_3_marche",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_coherence",
    difficulty: 2,
    theme: "reunion",
    text: "Pour aller à pied au marché de Saint-Pierre, il y a $3\\ \\text{km}$.\nLe trajet dure environ …",
    format: "qcm",
    choices: ["35 minutes", "35 secondes", "3 heures", "3 minutes"],
    expected: ["35 minutes"],
    comparator: "mcq_exact",
    hint: "À pied, on parcourt environ 5 km en une heure.",
    explanation: exp(
      "on contrôle une durée en la rapprochant d’une vitesse connue.",
      "à pied, on marche à environ 5 km/h ; on compare 3 km à cette vitesse.",
      "5 km en 60 min, donc 3 km en un peu plus de la moitié : environ 35 min.",
      "le trajet dure environ 35 minutes."
    ),
    tags: ["grandeur_conversion", "reunion"],
    choiceDiagnostics: [
      {
        choice: "35 secondes",
        cause:
          "Le nombre est bon, l’unité non : en 35 secondes on parcourt une centaine de mètres, pas 3 km.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
      {
        choice: "3 heures",
        cause:
          "Tu as repris le 3 des kilomètres comme une durée. En 3 heures à pied, on ferait environ 15 km.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
      {
        choice: "3 minutes",
        cause:
          "Même report du 3, dans l’autre unité : 3 minutes à pied, c’est environ 250 mètres.",
        errorKind: "conceptual",
        prereqMicroId: "conversion_coherence",
      },
    ],
  },
  {
    kind: "fixed",
    id: "5e_conversion_coherence_open_1_stylo_de_quatorze_metres",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_coherence",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève trouve qu’un stylo mesure 14 mètres.\nExplique comment il aurait pu s’en apercevoir tout seul, sans refaire le calcul.",
    format: "open",
    expected: [
      "ordre de grandeur",
      "trop grand",
      "centimètre",
      "centimetre",
      "cm",
      "réel",
      "reel",
      "comparer",
    ],
    comparator: "contains_keyword",
    hint: "À quoi ressemblerait un objet de 14 mètres ?",
    explanation: exp(
      "un résultat de mesure se relit toujours en pensant à l’objet réel.",
      "on compare le résultat à une taille connue avant de l’écrire.",
      "14 m, c’est la hauteur d’un immeuble de quatre étages ; un stylo mesure environ 14 cm.",
      "l’erreur porte sur l’unité, et l’ordre de grandeur suffisait à la voir."
    ),
    tags: ["grandeur_conversion", "oral"],
  },
  {
    kind: "template",
    id: "5e_conversion_coherence_tpl_1_choisir_unite",
    niveau: "5e",
    matiere: "maths",
    notionId: "grandeur_conversion",
    microId: "conversion_coherence",
    difficulty: 2,
    theme: "neutral",
    hint: "Pense à l’objet réel avant de choisir l’unité.",
    tags: ["grandeur_conversion", "template"],
    generate: () => {
      const objets = [
        { quoi: "une porte", valeur: 2, unite: "m", autres: ["cm", "km", "mm"] },
        { quoi: "un crayon", valeur: 17, unite: "cm", autres: ["m", "km", "mm"] },
        { quoi: "un sac de riz", valeur: 5, unite: "kg", autres: ["g", "mg", "t"] },
        { quoi: "une cuillère de sirop", valeur: 15, unite: "mL", autres: ["L", "cL", "hL"] },
        { quoi: "un terrain de foot", valeur: 100, unite: "m", autres: ["cm", "mm", "km"] },
      ];
      const o = randomChoice(objets);

      return {
        text: `Quelle unité convient pour dire que ${o.quoi} mesure environ ${o.valeur} … ? Réponds par l’unité seule.`,
        format: "short" as const,
        expected: [o.unite],
        comparator: "exact_text" as const,
        explanation: exp(
          "une mesure ne se lit qu’avec son unité.",
          "on essaie mentalement chaque unité et on garde celle qui donne un objet reconnaissable.",
          `${o.valeur} ${o.unite} correspond bien à ${o.quoi}.`,
          `l’unité qui convient est le ${o.unite}.`
        ),
      };
    },
  },
];
