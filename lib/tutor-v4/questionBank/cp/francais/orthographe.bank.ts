// lib/tutor-v4/questionBank/cp/francais/orthographe.bank.ts
//
// L'orthographe grammaticale du CP, écrite à la main. C'est le pendant écrit
// de la conjugaison : là où le verbe suit son sujet, ici le nom entraine avec
// lui son déterminant et son adjectif.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Comprendre les notions de masculin et de féminin » ;
//   — « Comprendre les notions de singulier et de pluriel (plusieurs, plus
//     qu'un) » ;
//   — « Se familiariser avec la notion de "chaine d'accords"
//     (déterminant/nom/adjectif) en repérant et en identifiant les régularités
//     des marques de genre et de nombre » ;
//   — « S'initier à l'identification de la relation sujet-verbe. »
//
// Les exemples de réussite du BO sont repris tels quels, ce sont les meilleurs :
//   un petit garçon → une petite fille ; le chien → deux chiens ;
//   une olive → des olives ; un boulanger → une boulangère ;
//   un joli vélo → de jolis vélos ; le chat miaule → les chats miaulent ;
//   La voiture roule → Les voitures roulent.
//
// LE PIÈGE DE LA NOTION, et le BO l'écrit lui-même : « s muet, précédés de
// leur déterminant : deux lapins, mes amis, des pommes ». La marque du pluriel
// NE S'ENTEND PAS. « une pomme » et « des pommes » se disent presque pareil ;
// c'est le petit mot devant qui prévient. L'enfant qui écrit ce qu'il entend
// oublie le s, systématiquement, et il a de bonnes raisons.
//
// ⛔ Pas de féminin irrégulier au-delà des exemples du BO, pas d'accord de
// l'adjectif éloigné du nom : c'est le CE1. Ici, le déterminant, le nom et
// l'adjectif se touchent.

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

const NOMS = [
  { mot: "garçon", genre: "m" }, { mot: "chien", genre: "m" },
  { mot: "letchi", genre: "m" }, { mot: "lagon", genre: "m" },
  { mot: "cahier", genre: "m" }, { mot: "bateau", genre: "m" },
  { mot: "vélo", genre: "m" }, { mot: "livre", genre: "m" },
  { mot: "fille", genre: "f" }, { mot: "maison", genre: "f" },
  { mot: "mangue", genre: "f" }, { mot: "case", genre: "f" },
  { mot: "voiture", genre: "f" }, { mot: "gomme", genre: "f" },
  { mot: "fleur", genre: "f" }, { mot: "table", genre: "f" },
  { mot: "crayon", genre: "m" }, { mot: "tapis", genre: "m" },
  { mot: "piton", genre: "m" }, { mot: "cari", genre: "m" },
  { mot: "trousse", genre: "f" }, { mot: "chaise", genre: "f" },
  { mot: "école", genre: "f" }, { mot: "récréation", genre: "f" },
] as const;

const ADJECTIFS = [
  { m: "petit", f: "petite" },
  { m: "grand", f: "grande" },
  { m: "joli", f: "jolie" },
  { m: "vert", f: "verte" },
  { m: "gris", f: "grise" },
  { m: "noir", f: "noire" },
  { m: "content", f: "contente" },
  { m: "froid", f: "froide" },
  { m: "chaud", f: "chaude" },
  { m: "bleu", f: "bleue" },
] as const;

// La marque du pluriel : un s qu'on n'entend pas, et quelques x.
const PLURIELS_S = [
  { s: "lapin", p: "lapins" }, { s: "ami", p: "amis" },
  { s: "pomme", p: "pommes" }, { s: "olive", p: "olives" },
  { s: "vélo", p: "vélos" }, { s: "letchi", p: "letchis" },
  { s: "mangue", p: "mangues" }, { s: "chien", p: "chiens" },
  { s: "fleur", p: "fleurs" }, { s: "cahier", p: "cahiers" },
] as const;

const PLURIELS_X = [
  { s: "bateau", p: "bateaux" },
  { s: "chapeau", p: "chapeaux" },
  { s: "gâteau", p: "gâteaux" },
] as const;

// Les couples du BO, mot pour mot.
const CHAINES = [
  { depart: "un petit garçon", arrivee: "une petite fille", change: "le genre" },
  { depart: "le chien", arrivee: "deux chiens", change: "le nombre" },
  { depart: "une olive", arrivee: "des olives", change: "le nombre" },
  { depart: "un boulanger", arrivee: "une boulangère", change: "le genre" },
  { depart: "un joli vélo", arrivee: "de jolis vélos", change: "le nombre" },
  { depart: "un grand bateau", arrivee: "de grands bateaux", change: "le nombre" },
  { depart: "une mangue mûre", arrivee: "des mangues mûres", change: "le nombre" },
] as const;

const SUJET_VERBE = [
  { s: "Le chat miaule.", p: "Les chats miaulent." },
  { s: "La voiture roule.", p: "Les voitures roulent." },
  { s: "L'oiseau chante.", p: "Les oiseaux chantent." },
  { s: "Le letchi tombe.", p: "Les letchis tombent." },
  { s: "La fleur pousse.", p: "Les fleurs poussent." },
  { s: "Le bateau arrive.", p: "Les bateaux arrivent." },
] as const;

const INVARIABLES = [
  "et", "dans", "avec", "pour", "sur", "sous", "mais", "puis",
  "très", "bien", "aussi", "alors", "encore", "toujours", "jamais",
  "beaucoup", "chez", "sans", "depuis", "assez",
] as const;

// ⚠️ Les pièges sont écrits à la main, jamais fabriqués en ajoutant un « s »
// ou un « e » : « dans » donnerait « danse », « bien » donnerait « biens »,
// « puis » donnerait « puise ». Trois mots bien réels, et l'élève aurait eu
// deux bonnes réponses sous les yeux.
const INVARIABLES_PIEGES = [
  { mot: "avec", faux: ["avecs", "aveque", "avecque"] },
  { mot: "pour", faux: ["pours", "poure", "pourre"] },
  { mot: "sous", faux: ["souss", "sousse", "soues"] },
  { mot: "très", faux: ["trèss", "trése", "trèse"] },
  { mot: "aussi", faux: ["aussis", "aussie", "auci"] },
  { mot: "alors", faux: ["alorss", "alorse", "aloreu"] },
  { mot: "encore", faux: ["encores", "encors", "ancore"] },
  { mot: "toujours", faux: ["toujourss", "toujour", "toujourse"] },
  { mot: "jamais", faux: ["jamaiss", "jamai", "jamaise"] },
  { mot: "beaucoup", faux: ["beaucoups", "beaucou", "bocoup"] },
  { mot: "chez", faux: ["chezs", "cheze", "chés"] },
  { mot: "assez", faux: ["assezs", "asseze", "assé"] },
] as const;

export const orthographeBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_ORTH_MASCULIN_FEMININ
  ========================================================= */
  {
    kind: "template",
    id: "cp_orth_masculin_feminin_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_masculin_feminin",
    difficulty: 1,
    theme: "neutral",
    hint: "Essaie « un » devant, puis « une ». Lequel se dit ?",
    tags: ["cp", "orthographe", "genre", "template"],
    generate: () => {
      const n = randomChoice(NOMS);
      const bon = n.genre === "m" ? "masculin" : "féminin";
      return {
        text: `Le mot « ${n.mot} » est-il masculin ou féminin ?`,
        format: "qcm" as const,
        choices: ["masculin", "féminin"],
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un nom est masculin si on peut dire « un » ou « le » devant, féminin si on dit « une » ou « la ».",
          "Pose les deux petits mots devant et écoute lequel se dit.",
          `On dit « ${n.genre === "m" ? "un" : "une"} ${n.mot} », pas « ${n.genre === "m" ? "une" : "un"} ${n.mot} ».`,
          `« ${n.mot} » est ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_orth_masculin_feminin_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_masculin_feminin",
    difficulty: 2,
    theme: "neutral",
    hint: "Trois vont ensemble, un seul n'est pas du même genre.",
    tags: ["cp", "orthographe", "genre", "template"],
    generate: () => {
      const genre = randomChoice(["m", "f"] as const);
      const memeGenre = shuffle(NOMS.filter((n) => n.genre === genre)).slice(0, 3);
      const intrus = randomChoice(NOMS.filter((n) => n.genre !== genre));
      return {
        text: `Trois de ces noms sont ${genre === "m" ? "masculins" : "féminins"}. Lequel est l'intrus ?`,
        format: "qcm" as const,
        choices: shuffle([intrus.mot, ...memeGenre.map((n) => n.mot)]),
        expected: [intrus.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un nom masculin prend « un » ou « le » ; un nom féminin prend « une » ou « la ».",
          "Pose « un » devant chaque mot : ceux qui refusent sont féminins.",
          `${memeGenre.map((n) => `« ${genre === "m" ? "un" : "une"} ${n.mot} »`).join(", ")} — et « ${intrus.genre === "m" ? "un" : "une"} ${intrus.mot} », qui ne suit pas.`,
          `L'intrus est « ${intrus.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ORTH_MARQUE_FEMININ — le « e » qui s'ajoute
  ========================================================= */
  {
    kind: "template",
    id: "cp_orth_marque_feminin_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_marque_feminin",
    difficulty: 2,
    theme: "neutral",
    hint: "Au féminin, l'adjectif prend souvent un « e » de plus.",
    tags: ["cp", "orthographe", "feminin", "template"],
    generate: () => {
      const a = randomChoice(ADJECTIFS);
      const nomF = randomChoice(NOMS.filter((n) => n.genre === "f"));
      const autres = shuffle(ADJECTIFS.filter((x) => x.f !== a.f))
        .slice(0, 2)
        .map((x) => x.f);
      return {
        text: `Complète : « une ${nomF.mot} ___ » avec l'adjectif « ${a.m} ».`,
        format: "qcm" as const,
        choices: makeChoices(a.f, [a.m, ...autres]),
        expected: [a.f],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand l'adjectif décrit un nom féminin, il prend souvent un « e » de plus.",
          "Regarde le genre du nom, puis ajoute le « e » si c'est du féminin.",
          `${a.m} → ${a.f}. On écrit « une ${nomF.mot} ${a.f} ».`,
          `L'adjectif s'écrit « ${a.f} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_orth_marque_feminin_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_marque_feminin",
    difficulty: 2,
    theme: "neutral",
    text: "« un petit garçon » devient « une ___ fille ». Que devient l'adjectif ?",
    format: "qcm",
    choices: ["petite", "petit", "petits", "petites"],
    expected: ["petite"],
    comparator: "mcq_exact",
    hint: "Une seule fille, et c'est du féminin.",
    explanation: exp(
      "Quand le nom change de genre, l'adjectif change avec lui.",
      "Regarde le déterminant : « une » annonce du féminin singulier.",
      "un petit garçon → une petite fille. Le « e » s'ajoute, et cette fois on l'entend : peti-T-e.",
      "L'adjectif devient « petite ».",
    ),
    tags: ["cp", "orthographe", "feminin", "methode", "qcm"],
  },

  /* =========================================================
     CP_ORTH_ACCORD_DET_NOM
  ========================================================= */
  {
    kind: "template",
    id: "cp_orth_accord_det_nom_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_accord_det_nom",
    difficulty: 2,
    theme: "neutral",
    hint: "Le déterminant et le nom doivent aller ensemble.",
    tags: ["cp", "orthographe", "accord", "template"],
    generate: () => {
      const n = randomChoice(NOMS);
      const bon = `${n.genre === "m" ? "un" : "une"} ${n.mot}`;
      const faux = [
        `${n.genre === "m" ? "une" : "un"} ${n.mot}`,
        `les ${n.mot}`,
        `des ${n.mot}`,
      ];
      return {
        text: "Quel groupe est correctement écrit ?",
        format: "qcm" as const,
        choices: makeChoices(bon, faux),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le déterminant s'accorde avec le nom : même genre, même nombre.",
          "Vérifie deux choses : est-ce masculin ou féminin ? un seul ou plusieurs ?",
          `« ${n.mot} » est ${n.genre === "m" ? "masculin" : "féminin"} et il est tout seul : on écrit « ${bon} ». « les ${n.mot} » et « des ${n.mot} » annoncent plusieurs, mais le nom n'a pas son « s ».`,
          `Le groupe correct est « ${bon} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cp_orth_accord_det_nom_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_accord_det_nom",
    difficulty: 2,
    theme: "neutral",
    hint: "Un seul de ces petits mots va devant ce nom-là.",
    tags: ["cp", "orthographe", "accord", "template"],
    generate: () => {
      const n = randomChoice(NOMS);
      const bon = n.genre === "m" ? "un" : "une";
      // « le » et « la » sont volontairement absents des propositions : ils
      // conviendraient aussi, et la question aurait deux bonnes réponses.
      const faux = n.genre === "m" ? ["une", "la", "des"] : ["un", "le", "des"];
      return {
        text: `Quel petit mot peut-on mettre devant « ${n.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, faux),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le déterminant s'accorde avec le nom : « un » pour le masculin, « une » pour le féminin.",
          "Essaie les deux à voix haute : un seul se dit.",
          `On dit « ${bon} ${n.mot} ». « des » annoncerait plusieurs, et il faudrait alors un « s » au nom.`,
          `Le petit mot est « ${bon} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ORTH_MARQUE_PLURIEL — LE piège : le s ne s'entend pas
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_orth_marque_pluriel_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_marque_pluriel",
    difficulty: 3,
    theme: "neutral",
    text: "« une pomme » et « des pommes » : entend-on le « s » quand on les dit ?",
    format: "qcm",
    choices: [
      "Non : c'est le petit mot devant qui prévient",
      "Oui, on entend un sifflement à la fin",
      "Oui, le second est plus long",
      "Non, et il ne s'écrit pas non plus",
    ],
    expected: ["Non : c'est le petit mot devant qui prévient"],
    comparator: "mcq_exact",
    hint: "Dis les deux à voix haute et compare la fin.",
    explanation: exp(
      "La marque du pluriel est un « s ». Il s'écrit, mais il ne s'entend pas.",
      "Regarde le déterminant : « des », « les », « deux », « mes » annoncent plusieurs. Le nom doit alors prendre son s.",
      "une pomme / des pommes : ta bouche dit la même chose. C'est « des » qui prévient qu'il y en a plusieurs — et que le nom prend un s.",
      "Non : c'est le petit mot devant qui prévient.",
    ),
    tags: ["cp", "orthographe", "pluriel", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_orth_marque_pluriel_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_marque_pluriel",
    difficulty: 2,
    theme: "neutral",
    hint: "Le déterminant annonce plusieurs : le nom doit suivre.",
    tags: ["cp", "orthographe", "pluriel", "template"],
    generate: () => {
      const p = randomChoice(PLURIELS_S);
      const det = randomChoice(["des", "les", "deux", "mes"]);
      const bon = `${det} ${p.p}`;
      return {
        text: `Complète : « ${det} ___ »`,
        format: "qcm" as const,
        choices: makeChoices(bon, [
          `${det} ${p.s}`,
          `une ${p.s}`,
          `${det} ${p.p}s`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand le déterminant annonce plusieurs, le nom prend un « s ».",
          "Repère le déterminant : des, les, deux, mes… puis ajoute le s au nom.",
          `« ${det} » annonce plusieurs, donc « ${p.s} » devient « ${p.p} ». On ne l'entend pas, mais on l'écrit.`,
          `On écrit « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_orth_marque_pluriel_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_marque_pluriel",
    difficulty: 3,
    theme: "neutral",
    hint: "Quelques noms prennent un « x » au lieu d'un « s ».",
    tags: ["cp", "orthographe", "pluriel", "template"],
    generate: () => {
      const x = randomChoice(PLURIELS_X);
      const autres = shuffle(PLURIELS_S).slice(0, 3).map((q) => q.p);
      return {
        text: `Au pluriel, « ${x.s} » ne prend pas un « s ». Comment s'écrit-il ?`,
        format: "qcm" as const,
        choices: makeChoices(x.p, [`${x.s}s`, ...autres]),
        expected: [x.p],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La plupart des noms prennent un « s » au pluriel. Quelques-uns prennent un « x ».",
          "Retiens-les au fur et à mesure : ce sont souvent des mots en -eau.",
          `un ${x.s} → des ${x.p}. Le x remplace le s, et lui non plus ne s'entend pas.`,
          `On écrit « ${x.p} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ORTH_CHAINE_ACCORDS — les couples du BO
  ========================================================= */
  {
    kind: "template",
    id: "cp_orth_chaine_accords_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_chaine_accords",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand un mot du groupe change, tous les autres changent avec lui.",
    tags: ["cp", "orthographe", "chaine-accords", "template"],
    generate: () => {
      const c = randomChoice(CHAINES);
      const autres = shuffle(CHAINES.filter((x) => x.arrivee !== c.arrivee))
        .slice(0, 3)
        .map((x) => x.arrivee);
      return {
        text: `« ${c.depart} » devient quoi si on change ${c.change} ?`,
        format: "qcm" as const,
        choices: makeChoices(c.arrivee, autres),
        expected: [c.arrivee],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le déterminant, le nom et l'adjectif forment une chaine : si un maillon change, les autres suivent.",
          "Change le mot demandé, puis relis tout le groupe et corrige chaque maillon.",
          `${c.depart} → ${c.arrivee}. Tout le groupe a bougé ensemble.`,
          `Cela devient « ${c.arrivee} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_orth_chaine_accords_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_chaine_accords",
    difficulty: 3,
    theme: "neutral",
    text: "Dans « de jolis vélos », combien de mots portent la marque du pluriel ?",
    format: "qcm",
    choices: ["2 : jolis et vélos", "1 : vélos seulement", "3 : tous", "aucun"],
    expected: ["2 : jolis et vélos"],
    comparator: "mcq_exact",
    hint: "Regarde la fin de chaque mot, l'un après l'autre.",
    explanation: exp(
      "Dans un groupe, le nom entraine avec lui son déterminant et son adjectif.",
      "Regarde la fin de chaque mot : qui porte un s ?",
      "de joliS véloS : l'adjectif et le nom en portent un. Et « de » annonce déjà qu'il y en a plusieurs.",
      "Deux mots le portent : jolis et vélos.",
    ),
    tags: ["cp", "orthographe", "chaine-accords", "methode", "qcm"],
  },

  /* =========================================================
     CP_ORTH_SUJET_VERBE — le chat miaule, les chats miaulent
  ========================================================= */
  {
    kind: "template",
    id: "cp_orth_sujet_verbe_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_sujet_verbe",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte d'abord : un seul, ou plusieurs ? Le verbe suivra.",
    tags: ["cp", "orthographe", "sujet-verbe", "template"],
    generate: () => {
      const sv = randomChoice(SUJET_VERBE);
      const versPluriel = randomChoice([true, false]);
      const depart = versPluriel ? sv.s : sv.p;
      const arrivee = versPluriel ? sv.p : sv.s;
      const autres = shuffle(SUJET_VERBE.filter((x) => x.s !== sv.s))
        .slice(0, 3)
        .map((x) => (versPluriel ? x.p : x.s));
      return {
        text: `« ${depart} »\n\nÉcris la même phrase ${versPluriel ? "au PLURIEL" : "au SINGULIER"}.`,
        format: "qcm" as const,
        choices: makeChoices(arrivee, autres),
        expected: [arrivee],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe suit son sujet : si le sujet passe au pluriel, le verbe aussi.",
          "Change d'abord le sujet, puis regarde la fin du verbe.",
          `${sv.s} → ${sv.p}. Le nom prend son s, et le verbe prend « -nt ». Ni l'un ni l'autre ne s'entendent.`,
          `On écrit « ${arrivee} »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_orth_sujet_verbe_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_sujet_verbe",
    difficulty: 3,
    theme: "neutral",
    text: "« Les chats miaule. » Qu'est-ce qui ne va pas ?",
    format: "qcm",
    choices: [
      "Le verbe : il faut « miaulent », parce qu'ils sont plusieurs",
      "Le nom : il faut « chat »",
      "Le déterminant : il faut « le »",
      "Rien, la phrase est correcte",
    ],
    expected: ["Le verbe : il faut « miaulent », parce qu'ils sont plusieurs"],
    comparator: "mcq_exact",
    hint: "Le sujet est au pluriel. Le verbe a-t-il suivi ?",
    explanation: exp(
      "Le verbe s'accorde avec son sujet : plusieurs sujets, verbe au pluriel.",
      "Remonte du verbe vers le sujet et compte combien ils sont.",
      "« Les chats » : ils sont plusieurs. Le verbe doit prendre « -nt » : les chats miaulent. Ça se dit pareil, mais ça ne s'écrit pas pareil.",
      "C'est le verbe : il faut « miaulent ».",
    ),
    tags: ["cp", "orthographe", "sujet-verbe", "piege", "qcm"],
  },

  /* =========================================================
     CP_ORTH_MOT_INVARIABLE
  ========================================================= */
  {
    kind: "template",
    id: "cp_orth_mot_invariable_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_mot_invariable",
    difficulty: 2,
    theme: "neutral",
    hint: "Un mot invariable ne change jamais, même quand tout change autour.",
    tags: ["cp", "orthographe", "invariables", "template"],
    generate: () => {
      const mot = randomChoice(INVARIABLES);
      const autres = shuffle(PLURIELS_S).slice(0, 3).map((p) => p.s);
      return {
        text: "Parmi ces mots, lequel ne change JAMAIS, ni au féminin ni au pluriel ?",
        format: "qcm" as const,
        choices: makeChoices(mot, autres),
        expected: [mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certains mots sont invariables : ils s'écrivent toujours de la même façon.",
          "Essaie de les mettre au pluriel : si rien ne bouge, ils sont invariables.",
          `« ${mot} » s'écrit pareil partout. « ${autres[0]} » devient « ${autres[0]}s » quand il y en a plusieurs.`,
          `Le mot invariable est « ${mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_orth_mot_invariable_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_mot_invariable",
    difficulty: 2,
    theme: "neutral",
    hint: "Ces mots-là s'apprennent par cœur : ils ne se devinent pas.",
    tags: ["cp", "orthographe", "invariables", "template"],
    generate: () => {
      const item = randomChoice(INVARIABLES_PIEGES);
      const mot = item.mot;
      return {
        text: `Comment écrit-on le mot invariable « ${mot} » quand il y a plusieurs choses ?`,
        format: "qcm" as const,
        choices: makeChoices(mot, item.faux),
        expected: [mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot invariable ne prend ni « s » au pluriel, ni « e » au féminin.",
          "Ne lui ajoute rien : il s'écrit toujours pareil.",
          `Qu'il y en ait un ou mille, on écrit toujours « ${mot} ».`,
          `On écrit « ${mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ORTH_DEFI — toute la chaine d'un coup
  ========================================================= */
  {
    kind: "template",
    id: "cp_orth_defi_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois choses bougent en même temps : le déterminant, le nom, et le verbe.",
    tags: ["cp", "orthographe", "defi", "template"],
    generate: () => {
      const sv = randomChoice(SUJET_VERBE);
      const mots = sv.p.replace(/\.$/, "").split(" ");
      return {
        text: `Dans « ${sv.p} », combien de mots ont changé par rapport à « ${sv.s} » ?`,
        format: "qcm" as const,
        choices: ["3 : le déterminant, le nom et le verbe", "1 : le verbe seulement", "2 : le nom et le verbe", "aucun"],
        expected: ["3 : le déterminant, le nom et le verbe"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand on passe au pluriel, tout le monde bouge : le déterminant, le nom, puis le verbe.",
          "Compare les deux phrases mot à mot, du début à la fin.",
          `${sv.s} → ${sv.p}. « ${mots[0]} », « ${mots[1]} » et « ${mots[2]} » ont tous les trois changé — et seul le premier s'entend.`,
          "Trois mots ont changé : le déterminant, le nom et le verbe.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_orth_defi_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "orthographe",
    microId: "cp_orth_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie le genre ET le nombre, dans les trois mots du groupe.",
    tags: ["cp", "orthographe", "defi", "template"],
    generate: () => {
      const a = randomChoice(
        ADJECTIFS.filter((x) => ["petit", "grand", "joli", "vert", "gris", "noir", "bleu"].includes(x.m)),
      );
      const n = randomChoice(
        NOMS.filter((x) => x.genre === "f" && ["mangue", "maison", "case", "voiture", "gomme", "fleur", "table"].includes(x.mot)),
      );
      const bon = `des ${n.mot}s ${a.f}s`;
      const faux = [
        `des ${n.mot} ${a.f}`,
        `des ${n.mot}s ${a.f}`,
        `une ${n.mot}s ${a.f}s`,
      ];
      return {
        text: `Comment écrit-on plusieurs « ${n.mot} ${a.f} » ?`,
        format: "qcm" as const,
        choices: shuffle([bon, ...faux]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Au pluriel, le nom ET l'adjectif prennent un « s ». Le déterminant aussi change.",
          "Fais le tour du groupe : déterminant, nom, adjectif. Chacun doit porter sa marque.",
          `une ${n.mot} ${a.f} → des ${n.mot}s ${a.f}s. Trois maillons, trois changements — et aucun ne s'entend.`,
          `On écrit « ${bon} ».`,
        ),
      };
    },
  },
];
