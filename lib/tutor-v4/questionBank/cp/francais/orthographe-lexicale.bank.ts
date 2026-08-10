// lib/tutor-v4/questionBank/cp/francais/orthographe-lexicale.bank.ts
//
// L'orthographe lexicale du CP, écrite à la main. Notion NEUVE : elle n'existait
// pas dans le coach, alors que le BO lui consacre cinq objectifs au CP, rangés
// sous « Vocabulaire — Mémoriser l'orthographe lexicale ».
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire), au mot près :
//   — « Mémoriser l'orthographe des mots réguliers fréquemment rencontrés » ;
//   — « Identifier et nommer les accents » ;
//   — « Connaitre la valeur sonore de certaines lettres (s – c – g) et la
//     composition de certains graphèmes selon la lettre qui suit (an/am, en/em,
//     on/om, in/im), en fonction du contexte et dans des mots fréquemment
//     rencontrés » ;
//   — « Être capable de comprendre la présence d'une lettre muette finale à
//     l'aide d'un mot de la même famille : chat/chaton, gros/grossir, etc. »
//
// LE PIÈGE DE LA NOTION : l'enfant écrit ce qu'il entend. Or la fin d'un mot
// ne s'entend pas toujours — « chat » finit par un t qu'aucune oreille ne
// capte. La parade est dans le BO lui-même : on va chercher un mot de la même
// famille où la lettre se réveille. chat → chatton, non : chat → chaton, et le
// t se met à parler.
//
// ⛔ Aucune exception au CP. « bonbon » garde son « n » devant le « b » et
// contredit la règle du m ; le BO demande la règle « dans des mots
// fréquemment rencontrés », pas la liste de ses accidents. On l'enseignera
// quand la règle sera solide.
//
// ⚠️ Les pièges d'orthographe sont PHONÉTIQUEMENT PLAUSIBLES — « bocou »,
// « écolle », « maizon ». Une anagramme ne trompe personne ; ce que l'enfant
// écrit vraiment, c'est ce qu'il entend.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

const ACCENTS = [
  { lettre: "é", nom: "un accent aigu", mots: ["vélo", "école", "été", "café"] },
  { lettre: "è", nom: "un accent grave", mots: ["mère", "règle", "très", "père"] },
  { lettre: "ê", nom: "un accent circonflexe", mots: ["tête", "fête", "forêt", "rêve"] },
  { lettre: "â", nom: "un accent circonflexe", mots: ["âne", "gâteau", "château"] },
  { lettre: "î", nom: "un accent circonflexe", mots: ["île", "maître"] },
  { lettre: "ô", nom: "un accent circonflexe", mots: ["hôpital", "drôle", "côte"] },
  { lettre: "à", nom: "un accent grave", mots: ["là", "voilà", "déjà"] },
] as const;

// Le s seul entre deux voyelles chante [z] ; il faut deux s pour qu'il siffle.
const PAIRES_S = [
  { z: "poison", s: "poisson" },
  { z: "cousin", s: "coussin" },
  { z: "désert", s: "dessert" },
  { z: "base", s: "basse" },
  { z: "case", s: "casse" },
] as const;

const MOTS_S_DOUX = ["maison", "rose", "chemise", "cerise", "vase", "usine"] as const;
const MOTS_S_DUR = ["tasse", "classe", "dessin", "assiette", "poisson", "brosse"] as const;

// ⚠️ Typées à la main : `const table = surC ? VALEUR_C : VALEUR_G` produisait
// une union de deux tuples littéraux, que TypeScript refuse de passer aux
// helpers génériques.
type LettreValeur = { readonly mot: string; readonly suite: string; readonly son: string };

const VALEUR_C: readonly LettreValeur[] = [
  { mot: "cari", suite: "a", son: "[k]" },
  { mot: "colle", suite: "o", son: "[k]" },
  { mot: "cube", suite: "u", son: "[k]" },
  { mot: "carotte", suite: "a", son: "[k]" },
  { mot: "cadeau", suite: "a", son: "[k]" },
  { mot: "cerise", suite: "e", son: "[s]" },
  { mot: "citron", suite: "i", son: "[s]" },
  { mot: "ciel", suite: "i", son: "[s]" },
  { mot: "cinéma", suite: "i", son: "[s]" },
  { mot: "cerf", suite: "e", son: "[s]" },
];

const VALEUR_G: readonly LettreValeur[] = [
  { mot: "gomme", suite: "o", son: "[g]" },
  { mot: "lagon", suite: "o", son: "[g]" },
  { mot: "gâteau", suite: "â", son: "[g]" },
  { mot: "gare", suite: "a", son: "[g]" },
  { mot: "légume", suite: "u", son: "[g]" },
  { mot: "girafe", suite: "i", son: "[ʒ]" },
  { mot: "gilet", suite: "i", son: "[ʒ]" },
  { mot: "genou", suite: "e", son: "[ʒ]" },
  { mot: "geler", suite: "e", son: "[ʒ]" },
  { mot: "gymnase", suite: "y", son: "[ʒ]" },
];

// Le m se met à la place du n devant m, b et p.
const MOTS_M = [
  { mot: "jambe", graphie: "am", faux: "an", declencheur: "b" },
  { mot: "lampe", graphie: "am", faux: "an", declencheur: "p" },
  { mot: "tambour", graphie: "am", faux: "an", declencheur: "b" },
  { mot: "chambre", graphie: "am", faux: "an", declencheur: "b" },
  { mot: "campagne", graphie: "am", faux: "an", declencheur: "p" },
  { mot: "temps", graphie: "em", faux: "en", declencheur: "p" },
  { mot: "ensemble", graphie: "em", faux: "en", declencheur: "b" },
  { mot: "emporter", graphie: "em", faux: "en", declencheur: "p" },
  { mot: "nombre", graphie: "om", faux: "on", declencheur: "b" },
  { mot: "pompier", graphie: "om", faux: "on", declencheur: "p" },
  { mot: "tomber", graphie: "om", faux: "on", declencheur: "b" },
  { mot: "ombre", graphie: "om", faux: "on", declencheur: "b" },
  { mot: "timbre", graphie: "im", faux: "in", declencheur: "b" },
  { mot: "simple", graphie: "im", faux: "in", declencheur: "p" },
  { mot: "important", graphie: "im", faux: "in", declencheur: "p" },
  { mot: "impossible", graphie: "im", faux: "in", declencheur: "p" },
] as const;

// La lettre finale qui dort, et le mot de la famille qui la réveille.
const LETTRES_MUETTES = [
  { mot: "chat", lettre: "t", famille: "chaton" },
  { mot: "gros", lettre: "s", famille: "grossir" },
  { mot: "grand", lettre: "d", famille: "grande" },
  { mot: "petit", lettre: "t", famille: "petite" },
  { mot: "blanc", lettre: "c", famille: "blanche" },
  { mot: "lait", lettre: "t", famille: "laitier" },
  { mot: "dent", lettre: "t", famille: "dentiste" },
  { mot: "chant", lettre: "t", famille: "chanter" },
  { mot: "saut", lettre: "t", famille: "sauter" },
  { mot: "froid", lettre: "d", famille: "froide" },
  { mot: "vert", lettre: "t", famille: "verte" },
  { mot: "long", lettre: "g", famille: "longue" },
  { mot: "bond", lettre: "d", famille: "bondir" },
  { mot: "plat", lettre: "t", famille: "plate" },
  { mot: "sang", lettre: "g", famille: "sanguin" },
] as const;

// ⚠️ Pièges phonétiquement plausibles : ce que l'enfant écrit vraiment.
const ORTHOGRAPHES = [
  { mot: "école", faux: ["ecole", "écolle", "éccole"] },
  { mot: "maison", faux: ["maizon", "méson", "maisson"] },
  { mot: "beaucoup", faux: ["bocou", "beaucou", "boucoup"] },
  { mot: "toujours", faux: ["toujour", "tousjours", "toujourse"] },
  { mot: "comme", faux: ["come", "komme", "commme"] },
  { mot: "avec", faux: ["avèc", "avek", "aveque"] },
  { mot: "très", faux: ["trés", "trè", "traiss"] },
  { mot: "chien", faux: ["chian", "chein", "chiene"] },
  { mot: "petit", faux: ["petis", "ptit", "petitt"] },
  { mot: "grand", faux: ["gran", "granp", "granth"] },
  { mot: "dans", faux: ["dan", "dens", "danss"] },
  { mot: "pour", faux: ["poure", "pourre", "pou"] },
  { mot: "vélo", faux: ["velo", "vélau", "vélot"] },
  { mot: "jardin", faux: ["jardain", "jardein", "jardim"] },
  { mot: "cahier", faux: ["cayer", "caillé", "cahié"] },
] as const;

export const orthographeLexicaleBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_ORTHLEX_NOMMER_ACCENTS
     Le BO demande de les NOMMER, pas seulement de les voir.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_orthlex_nommer_accents_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_nommer_accents",
    difficulty: 1,
    theme: "neutral",
    text: "Comment s'appelle l'accent du « é » dans « école » ?",
    format: "qcm",
    choices: ["un accent aigu", "un accent grave", "un accent circonflexe", "un tréma"],
    expected: ["un accent aigu"],
    comparator: "mcq_exact",
    hint: "Il monte vers la droite, comme une côte qu'on grimpe.",
    explanation: exp(
      "L'accent aigu monte vers la droite : é. L'accent grave descend : è. L'accent circonflexe est un petit chapeau : ê.",
      "Regarde dans quel sens penche le trait au-dessus de la lettre.",
      "Dans « école », le trait monte : c'est un accent aigu. Sans lui, on écrirait « ecole », et ce n'est pas un mot.",
      "C'est un accent aigu.",
    ),
    tags: ["cp", "orthographe-lexicale", "accents", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "cp_orthlex_nommer_accents_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_nommer_accents",
    difficulty: 2,
    theme: "neutral",
    hint: "Aigu, il monte. Grave, il descend. Circonflexe, c'est un chapeau.",
    tags: ["cp", "orthographe-lexicale", "accents", "template"],
    generate: () => {
      const a = randomChoice(ACCENTS);
      const mot = randomChoice(a.mots);
      return {
        text: `Dans le mot « ${mot} », comment s'appelle l'accent du « ${a.lettre} » ?`,
        format: "qcm" as const,
        choices: ["un accent aigu", "un accent grave", "un accent circonflexe", "un tréma"],
        expected: [a.nom],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'accent aigu monte vers la droite : é. L'accent grave descend : è, à. L'accent circonflexe est un petit chapeau : ê, â, î, ô.",
          "Regarde le trait au-dessus de la lettre et son inclinaison.",
          `Dans « ${mot} », le « ${a.lettre} » porte ${a.nom}.`,
          `C'est ${a.nom}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_orthlex_nommer_accents_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_nommer_accents",
    difficulty: 2,
    theme: "neutral",
    hint: "Un seul de ces mots porte cet accent-là.",
    tags: ["cp", "orthographe-lexicale", "accents", "template"],
    generate: () => {
      const a = randomChoice(ACCENTS);
      const mot = randomChoice(a.mots);
      const autres = shuffle([
        ...new Set(
          ACCENTS.filter((x) => x.nom !== a.nom).flatMap((x) => x.mots),
        ),
      ]).slice(0, 3);
      return {
        text: `Quel mot contient ${a.nom} ?`,
        format: "qcm" as const,
        choices: makeChoices(mot, autres),
        expected: [mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque accent a sa forme : aigu monte, grave descend, circonflexe fait un chapeau.",
          "Cherche le trait au-dessus des voyelles de chaque mot.",
          `« ${mot} » porte ${a.nom} sur son « ${a.lettre} ».`,
          `Le mot est « ${mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ORTHLEX_VALEUR_S — poison / poisson
     Le BO nomme cette paire lui-même.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_orthlex_valeur_s_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_valeur_s",
    difficulty: 3,
    theme: "neutral",
    text: "« poison » et « poisson » : lequel se mange ?",
    format: "qcm",
    choices: ["poisson", "poison", "les deux", "aucun des deux"],
    expected: ["poisson"],
    comparator: "mcq_exact",
    hint: "Compte les « s ». Un seul s entre deux voyelles chante [z].",
    explanation: exp(
      "Entre deux voyelles, un seul « s » se met à chanter [z]. Il en faut deux pour qu'il siffle [s].",
      "Compte les s, puis dis le mot : un s → [z], deux s → [s].",
      "poi-Z-on : c'est ce qui empoisonne. poi-S-son : c'est ce qui nage, et qu'on mange. Une lettre en plus, et le repas change.",
      "C'est « poisson » qui se mange.",
    ),
    tags: ["cp", "orthographe-lexicale", "valeur-s", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_orthlex_valeur_s_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_valeur_s",
    difficulty: 2,
    theme: "neutral",
    hint: "Un seul s entre deux voyelles chante [z]. Deux s sifflent [s].",
    tags: ["cp", "orthographe-lexicale", "valeur-s", "template"],
    generate: () => {
      const doux = randomChoice([true, false]);
      const mot = doux ? randomChoice(MOTS_S_DOUX) : randomChoice(MOTS_S_DUR);
      return {
        text: `Dans le mot « ${mot} », le « s » se dit-il [s] comme dans « sac », ou [z] comme dans « zébu » ?`,
        format: "qcm" as const,
        choices: ["[s] comme dans sac", "[z] comme dans zébu"],
        expected: [doux ? "[z] comme dans zébu" : "[s] comme dans sac"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Entre deux voyelles, un seul « s » chante [z] ; il en faut deux pour siffler [s].",
          "Regarde s'il y a un s ou deux, puis dis le mot à voix haute.",
          doux
            ? `« ${mot} » n'a qu'un seul s entre deux voyelles : il chante [z].`
            : `« ${mot} » a deux s : ils sifflent [s].`,
          `Dans « ${mot} », le s se dit ${doux ? "[z]" : "[s]"}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_orthlex_valeur_s_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_valeur_s",
    difficulty: 3,
    theme: "neutral",
    hint: "Ces deux mots ne diffèrent que d'un « s ».",
    tags: ["cp", "orthographe-lexicale", "valeur-s", "template"],
    generate: () => {
      const p = randomChoice(PAIRES_S);
      const chercheDouble = randomChoice([true, false]);
      const bon = chercheDouble ? p.s : p.z;
      const autres = shuffle(
        PAIRES_S.filter((q) => q.z !== p.z).flatMap((q) => [q.z, q.s]),
      ).slice(0, 3);
      return {
        text: `Quel mot s'écrit avec ${chercheDouble ? "DEUX s" : "UN SEUL s"} ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, [chercheDouble ? p.z : p.s, ...autres]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un seul s entre deux voyelles chante [z] ; deux s sifflent [s].",
          "Dis le mot : si tu entends [z], il n'y a qu'un s ; si tu entends [s], il y en a deux.",
          `« ${p.z} » a un seul s, « ${p.s} » en a deux. Ce n'est pas le même mot du tout.`,
          `Le mot est « ${bon} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ORTHLEX_VALEUR_C_G — la lettre qui suit décide
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_orthlex_valeur_c_g_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_valeur_c_g",
    difficulty: 3,
    theme: "neutral",
    text: "Le « c » de « cari » et le « c » de « cerise » se lisent-ils pareil ?",
    format: "qcm",
    choices: [
      "Non : [k] dans cari, [s] dans cerise",
      "Oui : toujours [k]",
      "Oui : toujours [s]",
      "Non : [s] dans cari, [k] dans cerise",
    ],
    expected: ["Non : [k] dans cari, [s] dans cerise"],
    comparator: "mcq_exact",
    hint: "Regarde la lettre qui vient juste après le c.",
    explanation: exp(
      "Le « c » change de son selon la lettre qui le suit : devant a, o, u il dit [k] ; devant e, i, y il dit [s].",
      "Ne regarde pas le c tout seul : regarde ce qu'il y a derrière lui.",
      "cari : c suivi de a → [k]. cerise : c suivi de e → [s]. La même lettre, deux voix.",
      "Non : [k] dans cari, [s] dans cerise.",
    ),
    tags: ["cp", "orthographe-lexicale", "valeur-c-g", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_orthlex_valeur_c_g_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_valeur_c_g",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde la lettre qui vient juste après.",
    tags: ["cp", "orthographe-lexicale", "valeur-c-g", "template"],
    generate: () => {
      const surC = randomChoice([true, false]);
      const item = surC ? randomChoice(VALEUR_C) : randomChoice(VALEUR_G);
      const lettre = surC ? "c" : "g";
      const dur = surC ? "[k] comme dans cari" : "[g] comme dans gomme";
      const doux = surC ? "[s] comme dans cerise" : "[ʒ] comme dans girafe";
      const bon = item.son === "[k]" || item.son === "[g]" ? dur : doux;
      return {
        text: `Dans le mot « ${item.mot} », comment se lit le « ${lettre} » ?`,
        format: "qcm" as const,
        choices: shuffle([dur, doux]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `Le « ${lettre} » change de son selon la lettre qui le suit : devant a, o, u il fait ${surC ? "[k]" : "[g]"} ; devant e, i, y il fait ${surC ? "[s]" : "[ʒ]"}.`,
          `Ne regarde pas le « ${lettre} » tout seul : regarde ce qu'il y a derrière lui.`,
          `Dans « ${item.mot} », le « ${lettre} » est suivi de « ${item.suite} », donc il se lit ${item.son}.`,
          `Il se lit ${item.son}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_orthlex_valeur_c_g_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_valeur_c_g",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul de ces mots fait ce son-là.",
    tags: ["cp", "orthographe-lexicale", "valeur-c-g", "template"],
    generate: () => {
      const surC = randomChoice([true, false]);
      const table = surC ? VALEUR_C : VALEUR_G;
      const item = randomChoice(table);
      const autres = shuffle(
        table.filter((x) => x.son !== item.son).map((x) => x.mot),
      ).slice(0, 3);
      return {
        text: `Dans quel mot le « ${surC ? "c" : "g"} » se lit-il ${item.son} ?`,
        format: "qcm" as const,
        choices: makeChoices(item.mot, autres),
        expected: [item.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `Devant a, o, u, la lettre fait ${surC ? "[k]" : "[g]"}. Devant e, i, y, elle fait ${surC ? "[s]" : "[ʒ]"}.`,
          "Regarde la lettre qui suit, dans chaque mot.",
          `Dans « ${item.mot} », il y a « ${item.suite} » juste après : le son est ${item.son}.`,
          `Le mot est « ${item.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ORTHLEX_M_DEVANT_MBP
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_orthlex_m_devant_mbp_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_m_devant_mbp",
    difficulty: 2,
    theme: "neutral",
    text: "On entend [ɑ̃] dans « jambe ». Pourquoi écrit-on « am » et non « an » ?",
    format: "qcm",
    choices: [
      "Parce qu'il y a un « b » juste après",
      "Parce que le mot est long",
      "Parce qu'il commence par un j",
      "Il n'y a pas de raison, c'est comme ça",
    ],
    expected: ["Parce qu'il y a un « b » juste après"],
    comparator: "mcq_exact",
    hint: "Regarde la lettre qui suit le son.",
    explanation: exp(
      "Devant les lettres m, b et p, le « n » se change en « m ».",
      "Écris le son, puis regarde la lettre d'après : si c'est m, b ou p, tu mets un m.",
      "ja-m-be : le b oblige le n à devenir m. Trois lettres commandent : m, b, p.",
      "On écrit « am » parce qu'il y a un « b » juste après.",
    ),
    tags: ["cp", "orthographe-lexicale", "m-devant-mbp", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_orthlex_m_devant_mbp_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_m_devant_mbp",
    difficulty: 2,
    theme: "neutral",
    hint: "Devant m, b et p, le n devient m.",
    tags: ["cp", "orthographe-lexicale", "m-devant-mbp", "template"],
    generate: () => {
      const item = randomChoice(MOTS_M);
      const faux = item.mot.replace(item.graphie, item.faux);
      // Deux autres mots de la table, écrits de travers eux aussi : sans eux
      // l'élève aurait une chance sur deux au hasard.
      const autresFaux = shuffle(MOTS_M.filter((x) => x.mot !== item.mot))
        .slice(0, 2)
        .map((x) => x.mot.replace(x.graphie, x.faux));
      return {
        text: "Quel mot est correctement écrit ?",
        format: "qcm" as const,
        choices: shuffle([item.mot, faux, ...autresFaux]),
        expected: [item.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Devant les lettres m, b et p, le « n » se change en « m ».",
          "Repère la lettre qui suit le son, puis choisis n ou m.",
          `Dans « ${item.mot} », il y a un « ${item.declencheur} » juste après : c'est donc « ${item.graphie} », pas « ${item.faux} ».`,
          `Le mot correct est « ${item.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_orthlex_m_devant_mbp_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_m_devant_mbp",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la lettre qui commande : m, b ou p.",
    tags: ["cp", "orthographe-lexicale", "m-devant-mbp", "template"],
    generate: () => {
      const item = randomChoice(MOTS_M);
      return {
        text: `Dans « ${item.mot} », quelle lettre oblige à écrire « ${item.graphie} » et non « ${item.faux} » ?`,
        format: "qcm" as const,
        choices: makeChoices(item.declencheur, ["t", "l", "r", "s"]),
        expected: [item.declencheur],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Seules trois lettres commandent ce changement : m, b et p.",
          "Regarde ce qui vient juste après le son, et vérifie si c'est l'une des trois.",
          `Dans « ${item.mot} », c'est le « ${item.declencheur} » qui suit. Il fait basculer le n en m.`,
          `C'est la lettre « ${item.declencheur} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ORTHLEX_LETTRE_MUETTE — le mot de la famille réveille
     la lettre qui dort. Les exemples sont ceux du BO.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_orthlex_lettre_muette_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_lettre_muette",
    difficulty: 3,
    theme: "neutral",
    text: "On n'entend pas la fin de « chat ». Quel mot prouve qu'il finit par un « t » ?",
    format: "qcm",
    choices: ["chaton", "chien", "chapeau", "château"],
    expected: ["chaton"],
    comparator: "mcq_exact",
    hint: "Cherche un mot de la même famille où la lettre se remet à parler.",
    explanation: exp(
      "Certaines lettres finales ne s'entendent pas. Pour les retrouver, on cherche un mot de la même famille.",
      "Pense au petit du mot, ou au verbe qui va avec : la lettre endormie s'y réveille.",
      "cha… on n'entend rien après. Mais dans « chaton », le t se met à parler. C'est donc « chat » avec un t.",
      "C'est « chaton » qui le prouve.",
    ),
    tags: ["cp", "orthographe-lexicale", "lettre-muette", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_orthlex_lettre_muette_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_lettre_muette",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le mot de la même famille où la lettre se réveille.",
    tags: ["cp", "orthographe-lexicale", "lettre-muette", "template"],
    generate: () => {
      const item = randomChoice(LETTRES_MUETTES);
      const autres = shuffle(
        LETTRES_MUETTES.filter((x) => x.mot !== item.mot).map((x) => x.famille),
      ).slice(0, 3);
      return {
        text: `On n'entend pas la fin de « ${item.mot} ». Quel mot prouve qu'il finit par un « ${item.lettre} » ?`,
        format: "qcm" as const,
        choices: makeChoices(item.famille, autres),
        expected: [item.famille],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une lettre finale muette se retrouve grâce à un mot de la même famille.",
          "Cherche le mot de la famille où la lettre se remet à parler.",
          `Dans « ${item.famille} », le « ${item.lettre} » s'entend. C'est donc « ${item.mot} » avec un « ${item.lettre} ».`,
          `Le mot qui le prouve est « ${item.famille} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_orthlex_lettre_muette_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_lettre_muette",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis le mot de la famille et écoute la dernière lettre qui apparaît.",
    tags: ["cp", "orthographe-lexicale", "lettre-muette", "template"],
    generate: () => {
      const item = randomChoice(LETTRES_MUETTES);
      const autres = ["t", "d", "s", "c", "g", "p"].filter((l) => l !== item.lettre);
      return {
        text: `« ${item.famille} » vient de « ${item.mot} ». Par quelle lettre muette se termine « ${item.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(item.lettre, shuffle(autres).slice(0, 3)),
        expected: [item.lettre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le mot de la famille fait entendre la lettre que le mot court cache.",
          "Dis le mot de la famille lentement et écoute la consonne qui apparaît au milieu.",
          `Dans « ${item.famille} », on entend « ${item.lettre} ». Elle dormait à la fin de « ${item.mot} ».`,
          `« ${item.mot} » se termine par un « ${item.lettre} » muet.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ORTHLEX_MOTS_FREQUENTS
     ⚠️ Pièges phonétiquement plausibles : ce que l'enfant
     écrit vraiment, pas des anagrammes.
  ========================================================= */
  {
    kind: "template",
    id: "cp_orthlex_mots_frequents_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_mots_frequents",
    difficulty: 2,
    theme: "neutral",
    hint: "Les quatre se disent pareil. Un seul s'écrit comme il faut.",
    tags: ["cp", "orthographe-lexicale", "mots-frequents", "template"],
    generate: () => {
      const item = randomChoice(ORTHOGRAPHES);
      return {
        text: "Quel mot est correctement écrit ?",
        format: "qcm" as const,
        choices: makeChoices(item.mot, item.faux),
        expected: [item.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Beaucoup de mots ne s'écrivent pas comme ils s'entendent : il faut les mettre en mémoire.",
          "Ferme les yeux et essaie de revoir le mot tel qu'il est écrit dans ton cahier.",
          `« ${item.mot} » est la bonne orthographe. Les trois autres s'entendent pareil et ne s'écrivent pas.`,
          `Le mot correct est « ${item.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_orthlex_mots_frequents_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_mots_frequents",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde bien : il manque quelque chose, ou il y a quelque chose en trop.",
    tags: ["cp", "orthographe-lexicale", "mots-frequents", "template"],
    generate: () => {
      const item = randomChoice(ORTHOGRAPHES);
      const errone = randomChoice(item.faux);
      const autres = shuffle(
        ORTHOGRAPHES.filter((x) => x.mot !== item.mot).map((x) => x.mot),
      ).slice(0, 3);
      return {
        text: `Voici un mot mal écrit : « ${errone} ». Comment s'écrit-il vraiment ?`,
        format: "qcm" as const,
        choices: makeChoices(item.mot, autres),
        expected: [item.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Corriger un mot, c'est comparer ce qu'on voit avec ce qu'on a mémorisé.",
          "Dis le mot mal écrit, retrouve le vrai dans ta tête, puis compare lettre à lettre.",
          `« ${errone} » se dit comme « ${item.mot} », mais ce n'est pas comme ça qu'on l'écrit.`,
          `Le mot s'écrit « ${item.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ORTHLEX_DEFI — deux règles à la fois
  ========================================================= */
  {
    kind: "template",
    id: "cp_orthlex_defi_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux mots suivent la même règle du m. Cherche celui qui a la même lettre déclencheuse.",
    tags: ["cp", "orthographe-lexicale", "defi", "template"],
    generate: () => {
      const item = randomChoice(MOTS_M);
      const memeDeclencheur = MOTS_M.filter(
        (x) => x.declencheur === item.declencheur && x.mot !== item.mot,
      );
      const bon = randomChoice(memeDeclencheur);
      const autres = shuffle(
        MOTS_M.filter((x) => x.declencheur !== item.declencheur).map((x) => x.mot),
      ).slice(0, 3);
      return {
        text: `Dans « ${item.mot} », c'est le « ${item.declencheur} » qui fait écrire « ${item.graphie} ». Quel autre mot a la même lettre déclencheuse ?`,
        format: "qcm" as const,
        choices: makeChoices(bon.mot, autres),
        expected: [bon.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Trois lettres commandent le passage du n au m : m, b et p.",
          "Repère la lettre qui suit le son dans chaque mot proposé.",
          `Dans « ${bon.mot} », c'est aussi un « ${item.declencheur} » qui suit, comme dans « ${item.mot} ».`,
          `Le mot est « ${bon.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_orthlex_defi_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "cp_orthlex_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "D'abord la lettre muette, ensuite le mot qui la réveille.",
    tags: ["cp", "orthographe-lexicale", "defi", "template"],
    generate: () => {
      const item = randomChoice(LETTRES_MUETTES);
      const autres = shuffle(
        LETTRES_MUETTES.filter((x) => x.lettre !== item.lettre),
      ).slice(0, 3).map((x) => `${x.mot} → ${x.famille}`);
      const bon = `${item.mot} → ${item.famille}`;
      return {
        text: `Quel couple de mots montre une lettre muette « ${item.lettre} » qui se réveille ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot de la même famille fait entendre la lettre que le mot court cache.",
          "Regarde chaque couple : dans le second mot, quelle consonne se met à parler ?",
          `${item.mot} → ${item.famille} : le « ${item.lettre} » s'entend dans le second.`,
          `Le couple est « ${bon} ».`,
        ),
      };
    },
  },
];
