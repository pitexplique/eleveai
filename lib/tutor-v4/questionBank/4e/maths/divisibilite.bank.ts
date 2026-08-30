// lib/tutor-v4/questionBank/4e/maths/divisibilite.bank.ts
//
// ⭐ NOTION OUVERTE LE 30/08/2026 : `divisibilite`. Avec sa sœur
// `nombre_premier`, elle ferme les DIX puces du chapitre « Comprendre et
// utiliser les notions de divisibilité et de nombres premiers » — le plus gros
// bloc restant du programme de 4e.
//
// ⭐ QUATRE MICROS REPRENNENT LEURS IDENTIFIANTS DE LA 5e À L'IDENTIQUE :
// `div_multiple_diviseur`, `div_critere_2_5_10`, `div_critere_3_9`,
// `div_lister_diviseurs`. C'est le motif qui a marché huit fois — trouver la
// notion sœur, reprendre ses identifiants pour la continuité verticale, puis
// ajouter ce que le BO place ici : la DIVISION EUCLIDIENNE et les PROBLÈMES.
//
// ⚠️ LE CRITÈRE PAR 4 N'EST PAS AU PROGRAMME. Le BO énonce 2, 3, 5, 9 dans les
// connaissances (4e-A-divisibilite-2) et 2, 3, 5, 9, 10 dans les compétences
// (4e-A-divisibilite-8). Il n'apparaît donc nulle part ici, même comme leurre
// « qui aurait pu servir » : un leurre enseigne autant qu'une bonne réponse.
//
// ⭐ LE CANVAS `calcul_pose` PORTE LA DIVISION EUCLIDIENNE avec son champ
// `division` — dividende, diviseur, quotient, reste. C'est exactement l'objet
// de la puce, et aucun tableau ne le dirait aussi bien : la potence MONTRE que
// le reste est ce qui n'a pas pu être distribué.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux VALEURS
// PARTICULIÈRES : la condition sur le reste (0 ⩽ r < diviseur), et le fait que
// 1 et le nombre lui-même sont toujours des diviseurs.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** Tous les diviseurs d'un entier, dans l'ordre croissant. */
function diviseurs(n: number): number[] {
  const d: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      d.push(i);
      if (i !== n / i) d.push(n / i);
    }
  }
  return d.sort((a, b) => a - b);
}

/** La potence de la division euclidienne, avec son quotient et son reste. */
function potence(a: number, b: number, montrerReste = true) {
  const q = Math.floor(a / b);
  const r = a - b * q;
  return {
    kind: "calcul_pose" as const,
    operation: "division" as const,
    numbers: [String(a), String(b)],
    division: {
      dividende: String(a),
      diviseur: String(b),
      quotient: String(q),
      reste: montrerReste ? String(r) : undefined,
    },
    display: { showResult: true },
    size: { width: 240 },
  };
}

export const divisibiliteBank: TutorBankItemV4[] = [
  /* =========================================================================
     DIV_MULTIPLE_DIVISEUR — réactivation 5e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_multiple_diviseur_tpl_1_reconnaitre",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    hint: "Le multiple est le GRAND, le diviseur est le PETIT.",
    tags: ["divisibilite", "multiple", "qcm", "template"],
    generate: () => {
      const d = randomInt(3, 12);
      const k = randomInt(3, 12);
      const m = d * k;
      const correct = `${m} est un multiple de ${d}`;
      return {
        text: `Entre ${m} et ${d}, quelle phrase est juste ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${d} est un multiple de ${m}`,
          `${m} est un diviseur de ${d}`,
          `${m} et ${d} n'ont aucun lien`,
          `${d} n'est pas un diviseur de ${m}`,
          `${m} est un multiple de ${d + 1}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un nombre est MULTIPLE d'un autre lorsqu'il s'obtient en le multipliant par un entier. L'autre en est alors un DIVISEUR.\n\n" +
          "Méthode : on regarde lequel des deux est le plus grand — le multiple est toujours le plus grand.\n\n" +
          `Calcul : ${d} \\times ${k} = ${m}, donc ${m} est un multiple de ${d}, et ${d} est un diviseur de ${m}.\n\n` +
          "Conclusion : ⭐ c'est une SEULE relation dite dans les deux sens, comme « parent » et « enfant ». Les deux mots ne s'échangent jamais.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_div_multiple_diviseur_tpl_2_tester",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise, et regarde si le reste vaut zéro.",
    tags: ["divisibilite", "multiple", "qcm", "template"],
    generate: () => {
      const d = randomInt(4, 13);
      const divisible = Math.random() < 0.5;
      const n = divisible ? d * randomInt(4, 15) : d * randomInt(4, 15) + randomInt(1, d - 1);
      const correct = divisible ? "oui" : "non";
      return {
        text: `${n} est-il un multiple de ${d} ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un nombre est multiple d'un autre lorsque la division tombe juste — autrement dit lorsque le RESTE vaut zéro.\n\n" +
          "Méthode : on divise et on regarde le reste.\n\n" +
          `Calcul : ${n} \\div ${d} donne ${Math.floor(n / d)} et il reste ${n - d * Math.floor(n / d)}.\n\n` +
          (divisible
            ? `Conclusion : le reste vaut 0, donc ${n} est bien un multiple de ${d}.`
            : `Conclusion : ⚠️ le reste ne vaut pas 0, donc ${n} n'est PAS un multiple de ${d}. « Presque divisible » n'existe pas.`),
      };
    },
  },

  /* =========================================================================
     DIV_CRITERE_2_5_10 — réactivation 5e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_critere_2_5_10_tpl_1_lequel",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Ces trois critères ne regardent QUE le chiffre des unités.",
    tags: ["divisibilite", "critere", "qcm", "template"],
    generate: () => {
      const n = randomInt(120, 9800);
      const par2 = n % 2 === 0;
      const par5 = n % 5 === 0;
      const par10 = n % 10 === 0;
      const correct = par10
        ? "par 2, par 5 et par 10"
        : par5
          ? "par 5 seulement"
          : par2
            ? "par 2 seulement"
            : "par aucun des trois";
      return {
        text: `Le nombre ${n} est-il divisible par 2, par 5, par 10 ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "par 2, par 5 et par 10",
          "par 5 seulement",
          "par 2 seulement",
          "par aucun des trois",
          "par 2 et par 10 seulement",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les critères par 2, 5 et 10 ne regardent QUE le chiffre des unités — le reste du nombre ne compte pas.\n\n" +
          "Méthode : par 2 si le chiffre des unités est 0, 2, 4, 6 ou 8 ; par 5 s'il est 0 ou 5 ; par 10 s'il est 0.\n\n" +
          `Calcul : ${n} se termine par ${n % 10}, donc il est ${par2 ? "" : "non "}divisible par 2, ${par5 ? "" : "non "}divisible par 5, ${par10 ? "" : "non "}divisible par 10.\n\n` +
          "Conclusion : ⭐ un nombre divisible par 10 l'est forcément par 2 ET par 5 — c'est le seul cas où les trois tombent ensemble.",
      };
    },
  },

  {
    // ⭐ SECOND GABARIT EXIGÉ PAR LE MODE COMPLET, qui oppose deux questions et
    // ne peut pas le faire avec un seul. Il travaille le critère À L'ENVERS :
    // au lieu de tester un nombre, on complète celui qui manque.
    kind: "template",
    id: "4e_div_critere_2_5_10_tpl_2_unite_manquante",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 3,
    theme: "neutral",
    hint: "Seul le chiffre des unités compte pour ces trois critères.",
    tags: ["divisibilite", "critere", "qcm", "template"],
    generate: () => {
      const base = randomInt(24, 987);
      const par = randomChoice([2, 5, 10] as const);
      const correct =
        par === 10
          ? "0 seulement"
          : par === 5
            ? "0 ou 5"
            : "0, 2, 4, 6 ou 8";
      return {
        text: `Par quel chiffre le nombre ${base}? doit-il se terminer pour être divisible par ${par} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "0 seulement",
          "0 ou 5",
          "0, 2, 4, 6 ou 8",
          "n'importe quel chiffre pair sauf 0",
          "il faut regarder la somme des chiffres",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les critères par 2, 5 et 10 ne regardent QUE le chiffre des unités.\n\n" +
          "Méthode : on se demande quels chiffres conviennent, sans jamais regarder le reste du nombre.\n\n" +
          `Calcul : pour ${par}, les chiffres possibles sont ${correct}.\n\n` +
          `Conclusion : ⚠️ « il faut regarder la somme des chiffres » est le piège : c'est vrai pour 3 et 9, jamais pour 2, 5 et 10. Chaque critère a sa méthode, et les confondre fait rater les deux.`,
      };
    },
  },

  /* =========================================================================
     DIV_CRITERE_3_9 — réactivation 5e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_critere_3_9_tpl_1_somme",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 3,
    theme: "neutral",
    hint: "On additionne les chiffres, et on regarde la somme.",
    tags: ["divisibilite", "critere", "qcm", "template", "canvas"],
    generate: () => {
      const n = randomInt(120, 9800);
      const somme = String(n).split("").reduce((s, c) => s + Number(c), 0);
      const par3 = somme % 3 === 0;
      const par9 = somme % 9 === 0;
      const correct = par9
        ? "par 3 et par 9"
        : par3
          ? "par 3 seulement"
          : "ni par 3 ni par 9";
      return {
        text: `Le nombre ${n} est-il divisible par 3, par 9 ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "par 3 et par 9",
          "par 3 seulement",
          "ni par 3 ni par 9",
          "par 9 seulement",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un nombre est divisible par 3 si la SOMME DE SES CHIFFRES l'est, et par 9 si cette même somme est divisible par 9.\n\n" +
          "Méthode : on additionne tous les chiffres, puis on teste la somme — plus petite, donc plus facile.\n\n" +
          `Calcul : ${String(n).split("").join(" + ")} = ${somme}. Or ${somme} ${par3 ? "est" : "n'est pas"} divisible par 3, et ${par9 ? "est" : "n'est pas"} divisible par 9.\n\n` +
          "Conclusion : ⚠️ « par 9 seulement » est IMPOSSIBLE : si la somme est divisible par 9, elle l'est aussi par 3. Tout multiple de 9 est un multiple de 3.",
        canvas: {
          kind: "tableau_donnees",
          headers: ["le nombre", "somme des chiffres", "divisible par"],
          rows: [
            {
              values: [
                String(n),
                String(somme),
                par9 ? "3 et 9" : par3 ? "3" : "aucun",
              ],
            },
          ],
          highlight: { col: 1 },
          caption: "la somme décide",
          display: { compact: true, striped: true },
          size: { width: 320 },
        },
      };
    },
  },
  {
    // ⭐ SECOND GABARIT EXIGÉ PAR LE MODE COMPLET. Il fait CHOISIR parmi
    // plusieurs nombres au lieu d'en tester un — c'est le geste de l'exercice
    // « entoure ceux qui sont divisibles par 3 ».
    kind: "template",
    id: "4e_div_critere_3_9_tpl_2_lequel",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les chiffres de chacun, et compare les sommes à 3.",
    tags: ["divisibilite", "critere", "choisir", "qcm", "template"],
    generate: () => {
      const somme = (x: number) =>
        String(x).split("").reduce((s, c) => s + Number(c), 0);
      // Un divisible par 3, et quatre qui ne le sont pas.
      const bon = 3 * randomInt(40, 330);
      const faux: number[] = [];
      while (faux.length < 4) {
        const c = randomInt(120, 990);
        if (c % 3 !== 0 && !faux.includes(c)) faux.push(c);
      }
      const correct = String(bon);
      return {
        text: `Lequel de ces nombres est divisible par 3 ?`,
        format: "qcm",
        choices: makeChoices(correct, faux.map(String)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un nombre est divisible par 3 lorsque la somme de ses chiffres l'est.\n\n" +
          "Méthode : on additionne les chiffres de chaque candidat — c'est bien plus rapide que de poser cinq divisions.\n\n" +
          `Calcul : ${bon} donne ${String(bon).split("").join(" + ")} = ${somme(bon)}, qui est un multiple de 3. Les autres donnent ${faux.map((f) => `${f} → ${somme(f)}`).join(", ")} : aucune de ces sommes n'est un multiple de 3.\n\n` +
          "Conclusion : ⭐ le critère transforme un test de divisibilité sur un grand nombre en un test sur un tout petit. C'est exactement ce à quoi il sert.",
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : l'implication « multiple de 9 ⇒ multiple de 3 »,
    // et son inverse qui est FAUX. C'est la connaissance du chapitre, et elle
    // ne se génère pas — elle se retient.
    kind: "fixed",
    id: "4e_div_critere_3_9_fixed_implication",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 4,
    theme: "neutral",
    text: "Un nombre est divisible par 3. Peut-on en conclure qu'il est divisible par 9 ?",
    format: "qcm",
    choices: [
      "non : 6 est divisible par 3 mais pas par 9",
      "oui, toujours",
      "oui, si le nombre est pair",
      "on ne peut jamais savoir",
    ],
    expected: ["non : 6 est divisible par 3 mais pas par 9"],
    comparator: "mcq_exact",
    hint: "Cherche un contre-exemple parmi les petits multiples de 3.",
    explanation:
      "Définition : 9 est un multiple de 3, donc tout multiple de 9 est un multiple de 3. Mais la réciproque est fausse.\n\n" +
      "Méthode : pour réfuter une affirmation, un seul contre-exemple suffit.\n\n" +
      "Calcul : 6 est divisible par 3, car $6 = 3 \\times 2$. Mais $6 \\div 9$ ne tombe pas juste.\n\n" +
      "Conclusion : ⭐ l'implication ne marche que dans UN sens — de 9 vers 3, jamais de 3 vers 9. C'est la même logique que « tout carré est un rectangle, mais pas l'inverse ».",
    tags: ["divisibilite", "critere", "valeur_particuliere", "logique", "qcm"],
  },

  /* =========================================================================
     DIV_EUCLIDIENNE — ce que la 4e ajoute
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_euclidienne_tpl_1_quotient_reste",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_euclidienne",
    difficulty: 3,
    theme: "neutral",
    hint: "Le quotient est le nombre de parts entières, le reste est ce qui ne se partage pas.",
    tags: ["divisibilite", "euclidienne", "template", "canvas"],
    generate: () => {
      const b = randomInt(4, 15);
      const q = randomInt(5, 30);
      const r = randomInt(1, b - 1);
      const a = b * q + r;
      return {
        text: `Dans la division euclidienne de ${a} par ${b}, combien vaut le reste ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation:
          "Définition : la division euclidienne de a par b donne un quotient q et un reste r tels que $a = b \\times q + r$, avec $0 \\leqslant r < b$.\n\n" +
          "Méthode : on cherche le plus grand multiple de b qui ne dépasse pas a ; ce qui manque pour atteindre a est le reste.\n\n" +
          `Calcul : ${b} \\times ${q} = ${b * q}, et ${a} - ${b * q} = ${r}.\n\n` +
          `Conclusion : le reste vaut ${r}. ⚠️ Il est TOUJOURS plus petit que le diviseur : s'il atteignait ${b}, on pourrait faire une part de plus.`,
        canvas: potence(a, b),
      };
    },
  },
  {
    kind: "template",
    id: "4e_div_euclidienne_tpl_2_egalite",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_euclidienne",
    difficulty: 4,
    theme: "neutral",
    hint: "Dividende = diviseur × quotient + reste.",
    tags: ["divisibilite", "euclidienne", "qcm", "template"],
    generate: () => {
      const b = randomInt(5, 14);
      const q = randomInt(6, 25);
      const r = randomInt(1, b - 1);
      const a = b * q + r;
      const correct = `${a} = ${b} × ${q} + ${r}`;
      return {
        text: `On divise ${a} par ${b} : le quotient vaut ${q} et le reste ${r}. Quelle égalité traduit cette division ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${a} = ${b} × ${q} - ${r}`,
          `${a} = ${q} × ${r} + ${b}`,
          `${b} = ${a} × ${q} + ${r}`,
          `${a} = ${b} + ${q} + ${r}`,
          `${a} = ${b} × ${r} + ${q}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : toute division euclidienne s'écrit $a = b \\times q + r$, où a est le dividende, b le diviseur, q le quotient et r le reste.\n\n" +
          "Méthode : on repère chaque rôle avant d'écrire — le dividende est SEUL d'un côté.\n\n" +
          `Calcul : ${b} \\times ${q} = ${b * q}, puis ${b * q} + ${r} = ${a}. L'égalité est vérifiée.\n\n` +
          `Conclusion : ⭐ cette égalité est le CONTRÔLE de la division : si elle ne tombe pas juste, c'est que le quotient ou le reste est faux.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : la condition sur le reste. C'est ce qui rend le
    // couple (quotient, reste) UNIQUE, et c'est la moitié de la définition.
    kind: "fixed",
    id: "4e_div_euclidienne_fixed_condition_reste",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_euclidienne",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : « 47 divisé par 6 donne un quotient de 6 et un reste de 11 », car 6 × 6 + 11 = 47. Qu'en penses-tu ?",
    format: "qcm",
    choices: [
      "faux : le reste doit être plus petit que 6",
      "juste, puisque l'égalité tombe",
      "faux : l'égalité ne tombe pas",
      "faux : le quotient doit être plus grand que le diviseur",
    ],
    expected: ["faux : le reste doit être plus petit que 6"],
    comparator: "mcq_exact",
    hint: "L'égalité ne suffit pas : il y a une seconde condition.",
    explanation:
      "Définition : la division euclidienne demande DEUX choses — l'égalité $a = b \\times q + r$, ET la condition $0 \\leqslant r < b$.\n\n" +
      "Méthode : on vérifie toujours les deux, jamais une seule.\n\n" +
      "Calcul : ici l'égalité tombe bien, $6 \\times 6 + 11 = 47$. Mais $11 > 6$ : le reste dépasse le diviseur. La bonne réponse est $47 = 6 \\times 7 + 5$.\n\n" +
      "Conclusion : ⭐ c'est cette seconde condition qui rend le quotient et le reste UNIQUES. Sans elle, on pourrait écrire une infinité d'égalités justes.",
    tags: ["divisibilite", "euclidienne", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     DIV_LISTER_DIVISEURS — réactivation 5e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_lister_diviseurs_tpl_1_combien",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 4,
    theme: "neutral",
    hint: "On cherche par PAIRES : chaque diviseur en appelle un autre.",
    tags: ["divisibilite", "diviseurs", "template", "canvas"],
    generate: () => {
      const n = randomChoice([18, 24, 28, 30, 36, 40, 42, 45, 48, 50, 54, 56, 60, 63, 64, 72] as const);
      const d = diviseurs(n);
      return {
        text: `Combien ${n} a-t-il de diviseurs en tout ?`,
        format: "short",
        expected: [String(d.length)],
        comparator: "number_equal",
        explanation:
          "Définition : un diviseur d'un nombre est un entier par lequel la division tombe juste.\n\n" +
          "Méthode : on cherche par PAIRES, en partant de 1. Chaque diviseur trouvé en donne un second — celui qui le complète.\n\n" +
          `Calcul : ${d
            .slice(0, Math.ceil(d.length / 2))
            .map((x) => `${x} × ${n / x}`)
            .join(", ")}. On s'arrête quand les deux se croisent.\n\n` +
          `Conclusion : les diviseurs de ${n} sont ${d.join(", ")}, soit ${d.length} en tout. ⭐ Chercher par paires garantit de n'en oublier aucun.`,
        canvas: {
          kind: "tableau_donnees",
          headers: ["paire", "produit"],
          rows: d.slice(0, Math.ceil(d.length / 2)).map((x) => ({
            values: [`${x} et ${n / x}`, String(n)],
          })),
          caption: `les diviseurs de ${n}, par paires`,
          display: { compact: true, striped: true },
          size: { width: 320 },
        },
      };
    },
  },
  {
    // ⭐ SECOND GABARIT EXIGÉ PAR LE MODE COMPLET. Il travaille l'INTRUS, qui
    // est le geste inverse du précédent : au lieu de construire la liste, on
    // repère celui qui n'y est pas.
    kind: "template",
    id: "4e_div_lister_diviseurs_tpl_2_intrus",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 4,
    theme: "neutral",
    hint: "Teste chaque candidat : la division tombe-t-elle juste ?",
    tags: ["divisibilite", "diviseurs", "intrus", "qcm", "template"],
    generate: () => {
      const n = randomChoice([24, 30, 36, 40, 48, 54, 60, 72, 84, 90] as const);
      const d = diviseurs(n).filter((x) => x !== 1 && x !== n);
      const vrais = shuffle([...d]).slice(0, 3);
      // Un intrus qui n'est PAS un diviseur, et pas déjà dans la liste.
      let intrus = 0;
      while (!intrus || n % intrus === 0 || vrais.includes(intrus)) {
        intrus = randomInt(2, Math.max(9, Math.floor(n / 2)));
      }
      return {
        text: `Dans la liste ${shuffle([...vrais, intrus]).join(", ")}, lequel n'est PAS un diviseur de ${n} ?`,
        format: "qcm",
        choices: shuffle([...vrais, intrus]).map(String),
        expected: [String(intrus)],
        comparator: "mcq_exact",
        explanation:
          "Définition : un diviseur d'un nombre est un entier par lequel la division tombe juste, sans reste.\n\n" +
          "Méthode : on teste chaque candidat. Un reste non nul suffit à l'éliminer.\n\n" +
          `Calcul : ${vrais.map((v) => `${n} ÷ ${v} = ${n / v}`).join(", ")} — trois divisions justes. Mais ${n} ÷ ${intrus} donne ${Math.floor(n / intrus)} et il reste ${n - intrus * Math.floor(n / intrus)}.\n\n` +
          `Conclusion : l'intrus est ${intrus}. ⭐ Les diviseurs de ${n} sont ${diviseurs(n).join(", ")} — et les repérer par paires évite d'en oublier.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : 1 et le nombre lui-même sont TOUJOURS des
    // diviseurs. C'est ce qui empêche de croire qu'un nombre peut n'en avoir
    // aucun, et c'est la clé de la définition d'un nombre premier.
    kind: "fixed",
    id: "4e_div_lister_diviseurs_fixed_toujours",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 3,
    theme: "neutral",
    text: "Quels diviseurs tout nombre entier plus grand que 1 possède-t-il forcément ?",
    format: "qcm",
    choices: [
      "1 et lui-même",
      "1 et 2",
      "seulement lui-même",
      "aucun en particulier",
    ],
    expected: ["1 et lui-même"],
    comparator: "mcq_exact",
    hint: "Que donne la division d'un nombre par 1 ? Et par lui-même ?",
    explanation:
      "Définition : un diviseur est un entier par lequel la division tombe juste.\n\n" +
      "Méthode : on teste les deux cas extrêmes.\n\n" +
      "Calcul : $n \\div 1 = n$, sans reste. Et $n \\div n = 1$, sans reste. Les deux tombent toujours juste.\n\n" +
      "Conclusion : ⭐ tout nombre a donc AU MOINS deux diviseurs. Ceux qui n'en ont QUE ces deux-là portent un nom : ce sont les nombres premiers.",
    tags: ["divisibilite", "diviseurs", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     DIV_PROBLEME — ce que la 4e ajoute : engrenages, conjonction
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_probleme_tpl_1_paquets",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Un paquet complet, c'est un diviseur commun aux deux quantités.",
    tags: ["divisibilite", "probleme", "template"],
    generate: () => {
      const d = randomChoice([6, 8, 9, 12, 15] as const);
      const a = d * randomInt(3, 8);
      const b = d * randomInt(3, 8);
      const communs = diviseurs(a).filter((x) => b % x === 0);
      const max = communs[communs.length - 1];
      return {
        text: `Un professeur a ${a} crayons et ${b} gommes. Il veut faire des lots identiques, sans rien laisser. Quel est le plus grand nombre de lots possible ?`,
        format: "short",
        expected: [String(max)],
        comparator: "number_equal",
        explanation:
          "Définition : faire des lots identiques sans reste, c'est chercher un DIVISEUR COMMUN aux deux quantités.\n\n" +
          "Méthode : on liste les diviseurs de chaque nombre, on garde ceux qui figurent dans les deux listes, et on prend le plus grand.\n\n" +
          `Calcul : les diviseurs communs à ${a} et ${b} sont ${communs.join(", ")}. Le plus grand vaut ${max}.\n\n` +
          `Conclusion : on peut faire ${max} lots, avec ${a / max} crayons et ${b / max} gommes chacun. ⚠️ « Le plus grand nombre de LOTS » n'est pas « le plus gros lot » : plus il y a de lots, plus chacun est petit.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_div_probleme_tpl_2_engrenages",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "On cherche un MULTIPLE commun, pas un diviseur : les deux événements doivent retomber ensemble.",
    tags: ["divisibilite", "probleme", "engrenages", "template"],
    generate: () => {
      const cas = randomChoice([
        { a: 4, b: 6, quoi: "bus", lieu: "à l'arrêt" },
        { a: 6, b: 8, quoi: "bus", lieu: "à l'arrêt" },
        { a: 9, b: 12, quoi: "phares", lieu: "en même temps" },
        { a: 10, b: 15, quoi: "bus", lieu: "à l'arrêt" },
        { a: 8, b: 12, quoi: "phares", lieu: "en même temps" },
      ]);
      // Le plus petit multiple commun, cherché sans PGCD — hors programme de 4e.
      let ppcm = Math.max(cas.a, cas.b);
      while (ppcm % cas.a !== 0 || ppcm % cas.b !== 0) ppcm += Math.max(cas.a, cas.b);
      return {
        text: `Deux ${cas.quoi} passent ${cas.lieu}, l'un toutes les ${cas.a} minutes, l'autre toutes les ${cas.b} minutes. Ils viennent de se croiser. Dans combien de minutes se croiseront-ils à nouveau ?`,
        format: "short",
        expected: [String(ppcm)],
        comparator: "number_equal",
        explanation:
          "Définition : deux phénomènes qui se répètent retombent ensemble sur un MULTIPLE COMMUN de leurs périodes.\n\n" +
          "Méthode : on écrit les multiples de chaque nombre et on cherche le premier qui figure dans les deux listes.\n\n" +
          `Calcul : multiples de ${cas.a} : ${[1, 2, 3, 4, 5].map((k) => cas.a * k).join(", ")}… ; multiples de ${cas.b} : ${[1, 2, 3, 4].map((k) => cas.b * k).join(", ")}… Le premier commun vaut ${ppcm}.\n\n` +
          `Conclusion : ils se croiseront dans ${ppcm} minutes. ⚠️ Ne pas confondre avec les LOTS : ici on cherche un multiple commun (le plus PETIT), là un diviseur commun (le plus GRAND). Les deux mots se ressemblent, les deux calculs sont inverses.`,
      };
    },
  },

  /* =========================================================================
     DIV_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_div_defi_tpl_1_quel_critere",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde ce que le nombre a de particulier : ses unités, ou la somme de ses chiffres.",
    tags: ["divisibilite", "defi", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { n: 4275, correct: "par 3, 5 et 9" },
        { n: 1260, correct: "par 2, 3, 5, 9 et 10" },
        { n: 3438, correct: "par 2, 3 et 9" },
        { n: 2025, correct: "par 3, 5 et 9" },
        { n: 1110, correct: "par 2, 3, 5 et 10" },
      ]);
      return {
        text: `Par lesquels de 2, 3, 5, 9 et 10 le nombre ${cas.n} est-il divisible ?`,
        format: "qcm",
        choices: makeChoices(cas.correct, [
          "par 3, 5 et 9",
          "par 2, 3, 5, 9 et 10",
          "par 2, 3 et 9",
          "par 2, 3, 5 et 10",
          "par 2 et 5 seulement",
        ]),
        expected: [cas.correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : on applique les cinq critères, chacun dans son ordre.\n\n" +
          "Méthode : on regarde d'abord le chiffre des unités (2, 5, 10), puis la somme des chiffres (3, 9).\n\n" +
          `Calcul : ${cas.n} se termine par ${cas.n % 10}, et la somme de ses chiffres vaut ${String(cas.n).split("").reduce((s, c) => s + Number(c), 0)}.\n\n` +
          `Conclusion : il est divisible ${cas.correct}. ⭐ Le contrôle rapide : si 9 marche, 3 marche forcément ; si 10 marche, 2 et 5 marchent forcément.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_div_defi_tpl_2_chiffre_manquant",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris la somme des chiffres connus, puis cherche ce qu'il faut ajouter.",
    tags: ["divisibilite", "defi", "chiffre_manquant", "template"],
    generate: () => {
      const base = randomInt(120, 980);
      const chiffres = String(base).split("").map(Number);
      const sommeConnue = chiffres.reduce((s, c) => s + c, 0);
      // Le chiffre manquant qui rend la somme divisible par 9.
      const manquant = (9 - (sommeConnue % 9)) % 9;
      return {
        text: `Dans le nombre ${base}?, quel chiffre faut-il mettre à la place du ? pour qu'il soit divisible par 9 ?`,
        format: "short",
        expected: [String(manquant)],
        comparator: "number_equal",
        explanation:
          "Définition : un nombre est divisible par 9 lorsque la somme de ses chiffres l'est.\n\n" +
          "Méthode : on additionne les chiffres connus, puis on cherche ce qu'il faut ajouter pour atteindre le prochain multiple de 9.\n\n" +
          `Calcul : ${chiffres.join(" + ")} = ${sommeConnue}. Le prochain multiple de 9 est ${sommeConnue + manquant}, donc il faut ajouter ${manquant}.\n\n` +
          `Conclusion : le chiffre est ${manquant}. ⚠️ Si la somme est déjà un multiple de 9, le chiffre cherché est 0 — pas 9, car on demande UN chiffre et 0 convient.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_div_defi_tpl_3_vrai_ou_faux",
    niveau: "4e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Une affirmation se réfute par un seul contre-exemple.",
    tags: ["divisibilite", "defi", "logique", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { phrase: "Tout multiple de 9 est un multiple de 3.", vrai: true },
        { phrase: "Tout multiple de 3 est un multiple de 9.", vrai: false },
        { phrase: "Tout multiple de 10 est un multiple de 5.", vrai: true },
        { phrase: "Tout multiple de 2 est un multiple de 10.", vrai: false },
        { phrase: "Un nombre divisible par 2 et par 5 est divisible par 10.", vrai: true },
        { phrase: "Un nombre divisible par 2 et par 3 est divisible par 9.", vrai: false },
      ]);
      const correct = cas.vrai ? "vrai" : "faux";
      return {
        text: `« ${cas.phrase} » Vrai ou faux ?`,
        format: "qcm",
        choices: shuffle(["vrai", "faux"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une affirmation générale est fausse dès qu'UN cas la contredit ; elle est vraie s'il n'en existe aucun.\n\n" +
          "Méthode : on cherche d'abord un contre-exemple parmi les petits nombres. Si on n'en trouve pas, on cherche pourquoi.\n\n" +
          (cas.vrai
            ? "Calcul : aucun contre-exemple n'existe, et la raison est structurelle — le second nombre est un diviseur du premier, donc tout multiple du premier est multiple du second.\n\n"
            : "Calcul : un contre-exemple suffit. 6 est multiple de 3 mais pas de 9 ; 4 est multiple de 2 mais pas de 10 ; 6 est divisible par 2 et 3 mais pas par 9.\n\n") +
          `Conclusion : c'est ${correct}. ⭐ Ces implications ne marchent que dans UN sens, et savoir lequel évite la moitié des erreurs du chapitre.`,
      };
    },
  },
];
