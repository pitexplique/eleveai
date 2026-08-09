// lib/tutor-v4/questionBank/ce2/maths/masse.bank.ts
//
// Les masses du CE2, écrites à la main. Même histoire que les longueurs : les
// sept micro-compétences passaient par le constructeur commun, qui aiguille sur
// la NOTION. « Comparer des masses » et « estimer la masse d'un objet »
// recevaient la même question, et le CE1 leur servait même un ruban en
// centimètres.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : les unités g, kg et t, et
// les relations 1 kg = 1000 g, 1 t = 1000 kg. Deux interdits du texte :
//   — pas de tableau de conversion : on passe par les relations connues ;
//   — pas d'écriture à virgule pour les masses. On écrit « 2 kg 500 g », et
//     jamais « 2,5 kg ». La virgule est réservée à la monnaie.
// Et le nombre reste sous 10 000 : on ne demande donc jamais le nombre de
// grammes dans une tonne.
//
// LE PIÈGE DE LA NOTION : le même que pour les longueurs, en plus sournois,
// parce qu'ici l'élève a l'objet en tête. « 900 g est plus lourd que 1 kg,
// parce que 900 est plus grand que 1. » Et son cousin, la tare : la boîte
// pleine pèse la boîte PLUS ce qu'il y a dedans.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type { MasseCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

// La bonne réponse est mise de côté, trois pièges distincts sont tirés ensuite,
// puis on mélange. L'écrire autrement a rendu des questions impossibles à
// réussir dans 79 banques : voir scripts/verifier-generateurs.mjs.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function masseCanvas(data: Omit<MasseCanvasData, "kind">): MasseCanvasData {
  return { kind: "masse", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const masseBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_MASSE_UNITES — connaître g, kg et t
     Trois unités seulement au cycle 2, et le même « kilo »
     que dans kilomètre : mille.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_unites_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Parmi le gramme, le kilogramme et la tonne, quelle est la plus PETITE unité de masse ?",
    format: "qcm",
    choices: ["le gramme", "le kilogramme", "la tonne", "elles sont pareilles"],
    expected: ["le gramme"],
    comparator: "mcq_exact",
    hint: "On pèse une plume avec laquelle de ces trois unités ?",
    explanation: exp(
      "Les trois unités de masse du CE2 se rangent dans cet ordre : gramme, kilogramme, tonne.",
      "On se rappelle qu'il faut mille grammes pour faire un kilogramme.",
      "1 kg = 1000 g, et 1 t = 1000 kg. Le gramme est donc tout en bas : c'est lui la plus petite.",
      "La plus petite est le gramme.",
    ),
    tags: ["ce2", "masse", "unites", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_unites_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_unites",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le mot « kilogramme », que veut dire « kilo » ?",
    format: "qcm",
    choices: ["mille", "cent", "dix", "un million"],
    expected: ["mille"],
    comparator: "mcq_exact",
    hint: "C'est le même « kilo » que dans kilomètre.",
    explanation: exp(
      "« Kilo » est un mot grec qui veut dire mille.",
      "On lit le début du mot pour savoir combien de fois l'unité est répétée.",
      "Un kilogramme, c'est mille grammes. C'est le même « kilo » que dans kilomètre, qui vaut mille mètres.",
      "« Kilo » veut dire mille.",
    ),
    tags: ["ce2", "masse", "unites", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_unites_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_unites",
    difficulty: 3,
    theme: "reunion",
    text: "À l'usine sucrière, on pèse les camions de canne à sucre. Avec quelle unité ?",
    format: "qcm",
    choices: ["la tonne", "le kilogramme", "le gramme", "le mètre"],
    expected: ["la tonne"],
    comparator: "mcq_exact",
    hint: "Un camion chargé pèse plus de dix mille kilogrammes.",
    explanation: exp(
      "La tonne sert à peser ce qui est très lourd : elle vaut 1000 kg.",
      "On imagine le nombre obtenu avec chaque unité et on garde celle qui donne le plus court.",
      "Un camion de canne pèse une vingtaine de tonnes. En kilogrammes, cela ferait 20 000 kg, et en grammes un nombre à huit chiffres.",
      "On pèse les camions de canne en tonnes.",
    ),
    tags: ["ce2", "masse", "unites", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_masse_unites_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_unites",
    difficulty: 2,
    theme: "neutral",
    hint: "Le g final dit « gramme », ce qu'il y a devant dit combien.",
    tags: ["ce2", "masse", "unites", "template"],
    generate: () => {
      const unites = [
        { abrev: "g", nom: "gramme" },
        { abrev: "kg", nom: "kilogramme" },
        { abrev: "t", nom: "tonne" },
      ] as const;
      const u = randomChoice(unites);
      return {
        text: `Que veut dire l'abréviation « ${u.abrev} » ?`,
        format: "qcm",
        choices: makeChoices(u.nom, [
          ...unites.map((x) => x.nom),
          "mètre",
          "litre",
        ]),
        expected: [u.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque unité de masse a une abréviation, écrite sans point et sans s.",
          "On lit l'abréviation lettre par lettre.",
          `« ${u.abrev} » se lit « ${u.nom} ». On l'écrit toujours pareil, même au pluriel : 5 ${u.abrev}, jamais 5 ${u.abrev}s.`,
          `« ${u.abrev} » veut dire ${u.nom}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_masse_unites_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_unites",
    difficulty: 3,
    theme: "neutral",
    hint: "Range-les dans ta tête : gramme, kilogramme, tonne.",
    tags: ["ce2", "masse", "unites", "template"],
    generate: () => {
      // « la tonne » et non « le tonne » : l'article voyage avec le nom.
      const ordre = [
        { nom: "le gramme", sujet: "Le gramme" },
        { nom: "le kilogramme", sujet: "Le kilogramme" },
        { nom: "la tonne", sujet: "La tonne" },
      ] as const;
      const [i, j] = shuffle([0, 1, 2]).slice(0, 2).sort((a, b) => a - b);
      const plusLourde = randomChoice([true, false]);
      const bonne = plusLourde ? ordre[j].nom : ordre[i].nom;
      return {
        text: plusLourde
          ? `Laquelle de ces deux unités est la PLUS GRANDE : ${ordre[i].nom} ou ${ordre[j].nom} ?`
          : `Laquelle de ces deux unités est la PLUS PETITE : ${ordre[i].nom} ou ${ordre[j].nom} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          plusLourde ? ordre[i].nom : ordre[j].nom,
          "elles sont égales",
          "on ne peut pas comparer",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Les unités de masse se rangent toujours dans le même ordre : gramme, kilogramme, tonne.",
          "On place les deux unités dans cette liste et on regarde laquelle vient après.",
          `${ordre[i].sujet} vient avant ${ordre[j].nom} dans la liste : c'est donc la plus petite des deux. Chaque fois qu'on avance d'un cran, on multiplie par 1000.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MASSE_RELATIONS — 1 kg = 1000 g, 1 t = 1000 kg
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_relations_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_relations",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de grammes dans 1 kilogramme ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "« Kilo » veut dire mille.",
    explanation: exp(
      "1 kilogramme vaut 1000 grammes.",
      "On lit le début du mot : « kilo » annonce mille.",
      "Un paquet de sucre de 1 kg, c'est le même que celui marqué 1000 g : les deux étiquettes disent la même masse.",
      "1 kg = 1000 g.",
    ),
    tags: ["ce2", "masse", "relations", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_relations_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_relations",
    difficulty: 2,
    theme: "neutral",
    text: "Combien pèse un demi-kilogramme, en grammes ?",
    format: "short",
    expected: ["500"],
    comparator: "number_equal",
    hint: "La moitié de 1000.",
    explanation: exp(
      "Un demi-kilogramme, c'est la moitié de 1000 grammes.",
      "On partage 1000 en deux parts égales.",
      "1000 ÷ 2 = 500. Un paquet marqué 500 g pèse donc un demi-kilo : c'est la même chose.",
      "Un demi-kilogramme pèse 500 g.",
    ),
    tags: ["ce2", "masse", "relations", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_relations_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_relations",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « 1 kg = 100 g ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 kg = 1000 g",
      "oui",
      "non, 1 kg = 10 g",
      "non, 1 kg = 100 t",
    ],
    expected: ["non, 1 kg = 1000 g"],
    comparator: "mcq_exact",
    hint: "100 g, c'est à peine une petite pomme. Un kilo, c'est bien plus.",
    explanation: exp(
      "1 kilogramme vaut 1000 grammes.",
      "On vérifie avec un objet connu : une petite pomme pèse environ 100 g.",
      "Il a confondu avec « centi ». Un kilo, ce n'est pas une pomme : il en faudrait dix pour l'atteindre. 1 kg = 1000 g.",
      "Non : 1 kg = 1000 g.",
    ),
    tags: ["ce2", "masse", "relations", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_masse_relations_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_relations",
    difficulty: 2,
    theme: "neutral",
    hint: "Une seule grande unité en vaut déjà mille petites : multiplie.",
    tags: ["ce2", "masse", "relations", "template"],
    generate: () => {
      const r = randomChoice([
        { grande: "kg", petite: "g", nomGrande: "kilogramme", nomPetite: "grammes" },
        { grande: "t", petite: "kg", nomGrande: "tonne", nomPetite: "kilogrammes" },
      ]);
      const n = randomInt(2, 9);
      const total = n * 1000;
      return {
        text: `Combien de ${r.nomPetite} font ${n} ${r.grande} ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          `1 ${r.nomGrande} vaut 1000 ${r.nomPetite}.`,
          "Pour passer d'une grande unité à une petite, on multiplie : il faut plus de petites unités pour la même masse.",
          `${n} × 1000 = ${total}. Donc ${n} ${r.grande} = ${total} ${r.petite}.`,
          `${n} ${r.grande} font ${total} ${r.petite}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_masse_relations_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_relations",
    difficulty: 3,
    theme: "neutral",
    hint: "Mille petites unités font une seule grande : partage.",
    tags: ["ce2", "masse", "relations", "template"],
    generate: () => {
      const r = randomChoice([
        { grande: "kg", petite: "g", nomGrande: "kilogrammes", nomPetite: "grammes" },
        { grande: "t", petite: "kg", nomGrande: "tonnes", nomPetite: "kilogrammes" },
      ]);
      const n = randomInt(2, 9);
      const total = n * 1000;
      return {
        text: `Combien de ${r.nomGrande} font ${total} ${r.petite} ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          `1 ${r.grande} vaut 1000 ${r.nomPetite}.`,
          "Pour passer d'une petite unité à une grande, on partage : il faut moins de grandes unités pour la même masse.",
          `${total} ÷ 1000 = ${n}. Donc ${total} ${r.petite} = ${n} ${r.grande}.`,
          `${total} ${r.petite} font ${n} ${r.grande}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_masse_relations_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_relations",
    difficulty: 4,
    theme: "neutral",
    hint: "Convertis d'abord les kilogrammes, puis ajoute les grammes qui restent.",
    tags: ["ce2", "masse", "relations", "template"],
    generate: () => {
      const kg = randomInt(1, 8);
      const g = randomInt(50, 900);
      const total = kg * 1000 + g;
      return {
        text: `Un sac pèse ${kg} kg ${g} g. Combien pèse-t-il en grammes ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une masse écrite en deux unités se convertit en une seule en additionnant.",
          "On transforme d'abord les kilogrammes en grammes, puis on ajoute les grammes déjà là.",
          `${kg} kg = ${kg * 1000} g. On ajoute les ${g} g : ${kg * 1000} + ${g} = ${total}.`,
          `Le sac pèse ${total} g.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MASSE_COMPARER — comparer des masses
     LE piège : comparer les nombres au lieu des masses.
     900 g contre 1 kg, et l'élève choisit 900.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_comparer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus lourd : 1 kg ou 900 g ?",
    format: "qcm",
    choices: ["1 kg", "900 g", "c'est pareil", "on ne peut pas savoir"],
    expected: ["1 kg"],
    comparator: "mcq_exact",
    hint: "Écris les deux masses dans la même unité avant de comparer.",
    explanation: exp(
      "On ne compare deux masses qu'après les avoir écrites dans la même unité.",
      "On choisit la plus petite unité des deux et on convertit.",
      "1 kg = 1000 g. Or 1000 g est plus lourd que 900 g. Le nombre 900 est plus grand que 1, mais il compte des grammes, pas des kilos.",
      "1 kg est plus lourd que 900 g.",
    ),
    // ⛔ Pas de canvas balance ici : le fléau penche tout seul selon `grammes`,
    // et l'élève lirait la réponse sur le dessin sans jamais convertir. Le
    // piège de cette question est justement de devoir passer par 1 kg = 1000 g.
    tags: ["ce2", "masse", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_comparer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une balance à deux plateaux, un paquet de 1 kg et un paquet de 1000 g. Que se passe-t-il ?",
    format: "qcm",
    choices: [
      "la balance reste en équilibre",
      "le côté du 1000 g descend",
      "le côté du 1 kg descend",
      "la balance ne peut pas peser des grammes",
    ],
    expected: ["la balance reste en équilibre"],
    comparator: "mcq_exact",
    hint: "1 kg et 1000 g, est-ce que ça pèse pareil ?",
    explanation: exp(
      "Une balance à deux plateaux reste en équilibre quand les deux masses sont égales.",
      "On écrit les deux masses dans la même unité, puis on compare.",
      "1 kg = 1000 g : les deux paquets pèsent exactement la même chose. Deux écritures différentes, une seule masse.",
      "La balance reste en équilibre.",
    ),
    // ⛔ Idem : le canvas afficherait « même masse » en toutes lettres.
    tags: ["ce2", "masse", "comparer", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_comparer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus lourd : 1 kg de plumes ou 1 kg de cailloux ?",
    format: "qcm",
    choices: [
      "c'est pareil, les deux pèsent 1 kg",
      "les cailloux",
      "les plumes",
      "on ne peut pas savoir",
    ],
    expected: ["c'est pareil, les deux pèsent 1 kg"],
    comparator: "mcq_exact",
    hint: "Ne regarde pas la taille du tas : lis la masse écrite.",
    explanation: exp(
      "La masse ne dépend pas de la place que prend l'objet.",
      "On lit la masse annoncée, sans se laisser tromper par le volume.",
      "Le tas de plumes est énorme et celui de cailloux tout petit, mais les deux pèsent 1 kg. La balance ne voit pas la taille, elle voit la masse.",
      "C'est pareil : les deux pèsent 1 kg.",
    ),
    tags: ["ce2", "masse", "comparer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_masse_comparer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Même unité d'abord, comparaison ensuite.",
    // ⛔ Sans canvas, pour la même raison : la balance penche et vend la mèche.
    tags: ["ce2", "masse", "comparer", "piege", "template"],
    generate: () => {
      // Le nombre en grammes est TOUJOURS plus grand que celui en kilogrammes :
      // c'est ce décalage qui fait tomber les élèves dans le piège.
      const kg = randomInt(1, 5);
      const enG = kg * 1000;
      const g = randomChoice([enG - randomInt(50, 400), enG + randomInt(50, 400)]);
      const gagnant = g > enG ? `${g} g` : `${kg} kg`;
      return {
        text: `Qu'est-ce qui est le plus lourd : ${kg} kg ou ${g} g ?`,
        format: "qcm",
        choices: makeChoices(gagnant, [
          g > enG ? `${kg} kg` : `${g} g`,
          "c'est pareil",
          "on ne peut pas savoir",
        ]),
        expected: [gagnant],
        comparator: "mcq_exact",
        explanation: exp(
          "On ne compare deux masses qu'après les avoir écrites dans la même unité.",
          "On convertit les kilogrammes en grammes, car 1 kg = 1000 g.",
          `${kg} kg = ${enG} g. On compare alors ${enG} g et ${g} g : ${g > enG ? `${g} est plus grand que ${enG}` : `${enG} est plus grand que ${g}`}.`,
          `Le plus lourd est ${gagnant}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_masse_comparer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris les trois masses en grammes avant de choisir.",
    tags: ["ce2", "masse", "comparer", "template"],
    generate: () => {
      const petit = randomInt(150, 700);
      const moyen = randomInt(1100, 1900);
      const gros = randomInt(2, 5) * 1000 + randomInt(100, 900);
      const items = shuffle([
        { texte: `${petit} g`, g: petit },
        { texte: `${moyen} g`, g: moyen },
        { texte: `${Math.floor(gros / 1000)} kg ${gros % 1000} g`, g: gros },
      ]);
      const maxG = Math.max(...items.map((i) => i.g));
      const gagnant = items.find((i) => i.g === maxG)!;
      return {
        text: `Laquelle de ces trois masses est la PLUS LOURDE : ${items.map((i) => i.texte).join(", ")} ?`,
        format: "qcm",
        choices: makeChoices(gagnant.texte, [
          ...items.filter((i) => i.g !== maxG).map((i) => i.texte),
          "elles sont égales",
        ]),
        expected: [gagnant.texte],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer plusieurs masses, on les écrit toutes dans la même unité.",
          "On choisit le gramme, la plus petite unité de la liste, et on convertit : 1 kg = 1000 g.",
          `En grammes : ${items.map((i) => `${i.texte} = ${i.g} g`).join(" ; ")}. Le plus grand nombre est ${maxG}.`,
          `La plus lourde est ${gagnant.texte}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MASSE_CHOISIR_UNITE — l'unité la mieux adaptée
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_choisir_unite_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_choisir_unite",
    difficulty: 1,
    theme: "reunion",
    text: "Avec quelle unité pèse-t-on un letchi ?",
    format: "qcm",
    choices: ["le gramme", "le kilogramme", "la tonne", "le litre"],
    expected: ["le gramme"],
    comparator: "mcq_exact",
    hint: "Un letchi tient au creux de la main.",
    explanation: exp(
      "On choisit l'unité qui donne le nombre le plus simple à dire.",
      "On imagine l'objet dans la main, puis on essaie chaque unité.",
      "Un letchi pèse environ 20 g. En kilogrammes, il faudrait écrire une virgule et beaucoup de zéros.",
      "On pèse un letchi en grammes.",
    ),
    tags: ["ce2", "masse", "choisir_unite", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_choisir_unite_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_choisir_unite",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « mon cartable pèse 3 t ». Quelle unité aurait-il dû écrire ?",
    format: "qcm",
    choices: ["kg", "g", "t", "km"],
    expected: ["kg"],
    comparator: "mcq_exact",
    hint: "3 tonnes, c'est trois voitures sur ton dos.",
    explanation: exp(
      "Une unité mal choisie rend la phrase absurde, même si le nombre est juste.",
      "On compare avec un objet connu : une voiture pèse environ 1 t.",
      "Un cartable plein pèse environ 3 kg. Avec 3 t, il pèserait autant que trois voitures : personne ne le soulèverait.",
      "Il fallait écrire 3 kg.",
    ),
    tags: ["ce2", "masse", "choisir_unite", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_choisir_unite_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_choisir_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Avec quelle unité pèse-t-on un camion ?",
    format: "qcm",
    choices: ["la tonne", "le kilogramme", "le gramme", "le mètre"],
    expected: ["la tonne"],
    comparator: "mcq_exact",
    hint: "Cherche l'unité qui donne le nombre le plus court.",
    explanation: exp(
      "La tonne sert à peser ce qui est très lourd : 1 t = 1000 kg.",
      "On imagine le nombre obtenu avec chaque unité.",
      "Un camion pèse une dizaine de tonnes. En kilogrammes, cela ferait 10 000 kg, et en grammes un nombre à huit chiffres.",
      "On pèse un camion en tonnes.",
    ),
    tags: ["ce2", "masse", "choisir_unite", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_masse_choisir_unite_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_choisir_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Imagine l'objet dans tes bras, puis choisis l'unité.",
    tags: ["ce2", "masse", "choisir_unite", "template"],
    generate: () => {
      const objets = [
        { nom: "une gomme", unite: "le gramme", ordre: "environ 15 g" },
        { nom: "une lettre", unite: "le gramme", ordre: "environ 20 g" },
        { nom: "une mangue", unite: "le gramme", ordre: "environ 400 g" },
        { nom: "un sac de riz", unite: "le kilogramme", ordre: "environ 5 kg" },
        { nom: "un élève de CE2", unite: "le kilogramme", ordre: "environ 25 kg" },
        { nom: "une voiture", unite: "la tonne", ordre: "environ 1 t" },
        { nom: "un bus", unite: "la tonne", ordre: "environ 12 t" },
        { nom: "un cahier", unite: "le gramme", ordre: "environ 200 g" },
      ] as const;
      const o = randomChoice(objets);
      return {
        text: `Quelle unité choisis-tu pour peser ${o.nom} ?`,
        format: "qcm",
        choices: makeChoices(o.unite, [
          "le gramme",
          "le kilogramme",
          "la tonne",
          "le litre",
        ]),
        expected: [o.unite],
        comparator: "mcq_exact",
        explanation: exp(
          "On choisit l'unité qui donne un nombre simple, sans virgule et sans une file de zéros.",
          "On imagine l'objet, puis on essaie les unités une par une.",
          `Pour ${o.nom}, la bonne masse est ${o.ordre}. Une autre unité donnerait un nombre trop grand ou trop petit.`,
          `On utilise ${o.unite}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_masse_choisir_unite_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_choisir_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre peut être juste et l'unité fausse. Regarde l'unité.",
    tags: ["ce2", "masse", "choisir_unite", "piege", "template"],
    generate: () => {
      const phrases = [
        { objet: "une pomme", nombre: 150, bonne: "g", fausse: "kg" },
        { objet: "un élève de CE2", nombre: 25, bonne: "kg", fausse: "g" },
        { objet: "un camion", nombre: 15, bonne: "t", fausse: "kg" },
        { objet: "un stylo", nombre: 10, bonne: "g", fausse: "kg" },
        { objet: "un sac de ciment", nombre: 25, bonne: "kg", fausse: "t" },
        { objet: "un chat", nombre: 4, bonne: "kg", fausse: "t" },
      ] as const;
      const p = randomChoice(phrases);
      return {
        text: `Un élève écrit : « ${p.objet} pèse ${p.nombre} ${p.fausse} ». Quelle unité fallait-il écrire ?`,
        format: "qcm",
        choices: makeChoices(p.bonne, ["g", "kg", "t", "L"]),
        expected: [p.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre et l'unité vont ensemble : changer l'unité change complètement la masse.",
          "On garde le nombre et on cherche l'unité qui rend la phrase possible.",
          `${p.nombre} ${p.fausse} est absurde pour ${p.objet}. Avec ${p.bonne}, la phrase devient juste : ${p.objet} pèse environ ${p.nombre} ${p.bonne}.`,
          `Il fallait écrire ${p.nombre} ${p.bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MASSE_ESTIMER — estimer à partir de références
     Les repères qu'on fabrique en classe : la brique de lait,
     le paquet de sucre, l'élève sur la balance.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_estimer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Environ combien pèse un élève de CE2 ?",
    format: "qcm",
    choices: ["25 kg", "25 g", "250 kg", "25 t"],
    expected: ["25 kg"],
    comparator: "mcq_exact",
    hint: "Souviens-toi de la balance de l'infirmerie.",
    explanation: exp(
      "Estimer, c'est comparer à une masse qu'on connaît déjà.",
      "On prend une référence sûre : un adulte pèse environ 70 kg.",
      "Un élève de CE2 pèse à peu près le tiers d'un adulte, donc environ 25 kg. 25 g, ce serait une gomme ; 250 kg, ce serait quatre adultes.",
      "Un élève de CE2 pèse environ 25 kg.",
    ),
    tags: ["ce2", "masse", "estimer", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_estimer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que sa gomme pèse 1 kg. Qu'aurait-il dû dire ?",
    format: "qcm",
    choices: ["15 g", "1 t", "150 kg", "1500 g"],
    expected: ["15 g"],
    comparator: "mcq_exact",
    hint: "Un kilo, c'est une brique de lait. Ta gomme est-elle aussi lourde ?",
    explanation: exp(
      "Une bonne référence permet de repérer tout de suite une estimation absurde.",
      "On compare la gomme à un objet dont on connaît la masse : une brique de lait pèse 1 kg.",
      "Une gomme pèse environ 15 g. Il en faudrait plus de soixante pour faire 1 kg : on ne remplirait pas une trousse.",
      "Il aurait dû dire environ 15 g.",
    ),
    tags: ["ce2", "masse", "estimer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_estimer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_estimer",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché forain, un vendeur remplit un sac de mangues. Le sac contient 5 mangues et pèse environ 2 kg. Environ combien pèse une mangue ?",
    format: "qcm",
    choices: ["400 g", "4 g", "4 kg", "40 kg"],
    expected: ["400 g"],
    comparator: "mcq_exact",
    hint: "2 kg partagés entre 5 mangues. Convertis d'abord en grammes.",
    explanation: exp(
      "Pour estimer la masse d'un objet, on partage la masse du lot par le nombre d'objets.",
      "On convertit d'abord en grammes, puis on partage.",
      "2 kg = 2000 g. Puis 2000 ÷ 5 = 400. Une mangue pèse donc environ 400 g, soit un peu moins d'un demi-kilo.",
      "Une mangue pèse environ 400 g.",
    ),
    tags: ["ce2", "masse", "estimer", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_masse_estimer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_estimer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare à un objet que tu as déjà soulevé.",
    tags: ["ce2", "masse", "estimer", "template"],
    generate: () => {
      const refs = [
        { objet: "une brique de lait", bonne: "1 kg", pourquoi: "on la soulève d'une main, sans effort" },
        { objet: "une gomme", bonne: "15 g", pourquoi: "on la sent à peine dans la trousse" },
        { objet: "un cartable plein", bonne: "3 kg", pourquoi: "on le porte sur le dos toute la journée" },
        { objet: "une voiture", bonne: "1 t", pourquoi: "il faut une grue pour la soulever" },
        { objet: "un œuf", bonne: "60 g", pourquoi: "il tient dans le creux de la main" },
        { objet: "un sac de riz de la cuisine", bonne: "5 kg", pourquoi: "on le porte à deux mains" },
      ] as const;
      const r = randomChoice(refs);
      const autres = refs.filter((x) => x.bonne !== r.bonne).map((x) => x.bonne);
      return {
        text: `Environ combien pèse ${r.objet} ?`,
        format: "qcm",
        choices: makeChoices(r.bonne, autres),
        expected: [r.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Estimer, c'est comparer à une masse qu'on connaît par cœur.",
          "On cherche un repère du quotidien avant de choisir un nombre.",
          `Pour ${r.objet}, le repère est simple : ${r.pourquoi}. Cela donne ${r.bonne}.`,
          `${r.objet} pèse environ ${r.bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_masse_estimer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien de fois la référence tient-elle dans la masse cherchée ?",
    tags: ["ce2", "masse", "estimer", "template"],
    generate: () => {
      const ref = randomChoice([
        { objet: "un paquet de sucre", masse: 500 },
        { objet: "une tablette de chocolat", masse: 100 },
        { objet: "une boîte de conserve", masse: 250 },
      ]);
      const kg = randomInt(2, 6);
      const nb = (kg * 1000) / ref.masse;
      return {
        text: `${ref.objet.charAt(0).toUpperCase() + ref.objet.slice(1)} pèse ${ref.masse} g. Combien en faut-il pour atteindre ${kg} kg ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "Estimer une masse, c'est reporter une référence connue autant de fois qu'il faut.",
          "On écrit la masse cherchée dans la même unité que la référence, puis on partage.",
          `${kg} kg = ${kg * 1000} g. Puis ${kg * 1000} ÷ ${ref.masse} = ${nb}.`,
          `Il en faut ${nb}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MASSE_PROBLEME — un problème de masses
     La tare est ici : la boîte pleine pèse la boîte PLUS ce
     qu'il y a dedans.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_probleme_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_probleme",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché, maman achète 2 kg de letchis et 750 g de mangues. Combien pèse son panier, en grammes ?",
    format: "short",
    expected: ["2750"],
    comparator: "number_equal",
    hint: "Mets les deux masses en grammes avant d'additionner.",
    explanation: exp(
      "On n'additionne des masses que si elles sont écrites dans la même unité.",
      "On convertit d'abord, on additionne ensuite.",
      "2 kg = 2000 g. Puis 2000 + 750 = 2750.",
      "Le panier pèse 2750 g, soit 2 kg 750 g.",
    ),
    tags: ["ce2", "masse", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_probleme_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Une boîte vide pèse 300 g. Remplie de billes, elle pèse 1 kg 200 g. Combien pèsent les billes, en grammes ?",
    format: "short",
    expected: ["900"],
    comparator: "number_equal",
    hint: "La boîte pleine, c'est la boîte PLUS les billes.",
    explanation: exp(
      "Quand on pèse un objet dans un récipient, la balance affiche les deux ensemble.",
      "On convertit la masse totale en grammes, puis on retire la masse de la boîte vide.",
      "1 kg 200 g = 1200 g. Puis 1200 - 300 = 900. Les billes seules pèsent 900 g.",
      "Les billes pèsent 900 g.",
    ),
    tags: ["ce2", "masse", "probleme", "piege", "tare"],
  },
  {
    kind: "template",
    id: "ce2_masse_probleme_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Même unité d'abord, opération ensuite.",
    tags: ["ce2", "masse", "probleme", "reunion", "template"],
    generate: () => {
      const contexte = randomChoice([
        { qui: "Malia", a: "de letchis", b: "de bringelles", ou: "au marché forain de Saint-Paul" },
        { qui: "Kevin", a: "de mangues", b: "de chouchous", ou: "au marché de Saint-Pierre" },
        { qui: "Naïla", a: "de riz", b: "de grains", ou: "à la boutique du quartier" },
      ]);
      const kg = randomInt(1, 5);
      const g = randomInt(100, 900);
      const total = kg * 1000 + g;
      return {
        text: `${contexte.qui} achète ${kg} kg ${contexte.a} et ${g} g ${contexte.b} ${contexte.ou}. Combien pèse le panier, en grammes ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "On n'additionne des masses que si elles sont écrites dans la même unité.",
          "On convertit les kilogrammes en grammes, puis on additionne.",
          `${kg} kg = ${kg * 1000} g. Puis ${kg * 1000} + ${g} = ${total}.`,
          `Le panier pèse ${total} g.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_masse_probleme_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Le récipient plein pèse le récipient PLUS son contenu.",
    tags: ["ce2", "masse", "probleme", "tare", "template"],
    generate: () => {
      const recipient = randomChoice([
        { nom: "un seau", contenu: "de sable" },
        { nom: "une caisse", contenu: "de fruits" },
        { nom: "un panier", contenu: "de légumes" },
        { nom: "un bocal", contenu: "de billes" },
      ]);
      const vide = randomInt(2, 9) * 100;
      const kgPlein = randomInt(2, 6);
      const gPlein = randomInt(1, 9) * 100;
      const plein = kgPlein * 1000 + gPlein;
      const contenu = plein - vide;
      return {
        text: `${recipient.nom.charAt(0).toUpperCase() + recipient.nom.slice(1)} vide pèse ${vide} g. Rempli ${recipient.contenu}, il pèse ${kgPlein} kg ${gPlein} g. Combien pèse le contenu, en grammes ?`,
        format: "short",
        expected: [String(contenu)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on pèse un contenu dans un récipient, la balance affiche les deux ensemble.",
          "On convertit la masse totale en grammes, puis on retire la masse du récipient vide.",
          `${kgPlein} kg ${gPlein} g = ${plein} g. Puis ${plein} - ${vide} = ${contenu}.`,
          `Le contenu pèse ${contenu} g.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MASSE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois élèves pèsent le même paquet. Léa écrit 1 kg 500 g, Kevin écrit 1500 g, Malia écrit un kilo et demi. Qui a raison ?",
    format: "qcm",
    choices: [
      "les trois : c'est la même masse",
      "Léa seulement",
      "Kevin seulement",
      "Léa et Kevin seulement",
    ],
    expected: ["les trois : c'est la même masse"],
    comparator: "mcq_exact",
    hint: "Écris les trois masses en grammes.",
    explanation: exp(
      "Une même masse peut s'écrire de plusieurs façons.",
      "On ramène tout à la même unité, ici le gramme.",
      "1 kg 500 g = 1000 + 500 = 1500 g. Et un kilo et demi, c'est 1 kg plus un demi-kilo, soit 1000 + 500 = 1500 g. Les trois écritures donnent la même chose.",
      "Les trois ont raison.",
    ),
    tags: ["ce2", "masse", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Sur une balance à deux plateaux, un paquet est en équilibre avec une masse de 500 g et deux masses de 200 g. Combien pèse le paquet, en grammes ?",
    format: "short",
    expected: ["900"],
    comparator: "number_equal",
    hint: "Il y a DEUX masses de 200 g, pas une.",
    explanation: exp(
      "Une balance en équilibre annonce que les deux plateaux pèsent pareil.",
      "On additionne toutes les masses posées sur l'autre plateau, sans en oublier.",
      "500 + 200 + 200 = 900. Le piège est de ne compter qu'un seul poids de 200 g et de répondre 700.",
      "Le paquet pèse 900 g.",
    ),
    tags: ["ce2", "masse", "defi", "piege"],
  },
  {
    kind: "template",
    id: "ce2_masse_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Additionne toutes les masses posées sur l'autre plateau.",
    tags: ["ce2", "masse", "defi", "template", "canvas"],
    generate: () => {
      const grosse = randomChoice([500, 200, 1000]);
      const petite = randomChoice([50, 100, 200]);
      const nb = randomInt(2, 4);
      const total = grosse + nb * petite;
      return {
        text: `Une balance est en équilibre : d'un côté un paquet, de l'autre une masse de ${grosse} g et ${nb} masses de ${petite} g. Combien pèse le paquet, en grammes ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une balance en équilibre annonce que les deux plateaux pèsent pareil.",
          "On additionne toutes les masses de l'autre plateau, en comptant chaque exemplaire.",
          `Les petites masses font ${nb} × ${petite} = ${nb * petite} g. Avec la grosse : ${grosse} + ${nb * petite} = ${total} g.`,
          `Le paquet pèse ${total} g.`,
        ),
        canvas: masseCanvas({
          variant: "balance",
          gauche: { label: "Paquet", icon: "📦", masse: "? g", grammes: total },
          droite: { label: "Masses", icon: "⚖️", masse: `${grosse} g + ${nb} × ${petite} g`, grammes: total },
          display: { showMasses: true, showLabels: true, showComparison: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_masse_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Cherche d'abord ce que pèse un seul, puis multiplie.",
    tags: ["ce2", "masse", "defi", "reunion", "template"],
    generate: () => {
      const contexte = randomChoice([
        { objet: "cageots de letchis", lieu: "à la coopérative de Saint-Joseph" },
        { objet: "sacs de riz", lieu: "à la boutique du quartier" },
        { objet: "caisses de mangues", lieu: "au marché forain" },
      ]);
      const parUnite = randomChoice([2, 4, 5]);
      const nbUnites = randomInt(3, 8);
      const totalKg = parUnite * nbUnites;
      return {
        text: `${nbUnites} ${contexte.objet} identiques pèsent ${totalKg} kg en tout ${contexte.lieu}. On en emporte 3. Combien de kilogrammes emporte-t-on ?`,
        format: "short",
        expected: [String(parUnite * 3)],
        comparator: "number_equal",
        explanation: exp(
          "Quand des objets sont identiques, ils pèsent tous la même chose.",
          "On cherche d'abord la masse d'un seul, en partageant le total, puis on multiplie par ce qu'on emporte.",
          `Un seul pèse ${totalKg} ÷ ${nbUnites} = ${parUnite} kg. Pour 3 : ${parUnite} × 3 = ${parUnite * 3} kg.`,
          `On emporte ${parUnite * 3} kg.`,
        ),
      };
    },
  },
];
