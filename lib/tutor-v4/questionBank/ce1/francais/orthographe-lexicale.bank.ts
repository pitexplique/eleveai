// lib/tutor-v4/questionBank/ce1/francais/orthographe-lexicale.bank.ts
//
// L'orthographe lexicale du CE1, écrite à la main. Six micro-compétences.
//
// NOTION NEUVE : elle n'existait pas dans l'ancienne liste, et le repli
// l'envoyait sur un générateur hors sujet — « orthographe_lexicale » contient
// « orthographe », donc le routeur y expédiait « Quel groupe est écrit
// correctement ? Le chat / la chat », qui est de l'orthographe GRAMMATICALE et
// qui est écrit pour un CP.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Tenir compte des accents » ;
//   — « Connaitre la valeur sonore de certaines lettres selon le contexte :
//     s / ss entre deux voyelles, c et g devant e, i, y » ;
//   — « Trouver la lettre finale muette d'un mot en s'appuyant sur un mot de
//     la même famille » ;
//   — « Mémoriser l'orthographe des mots invariables ».
//
// LA DIFFÉRENCE AVEC `sons_complexes` : là-bas on LIT — quel son fait ce
// groupe de lettres ? Ici on ÉCRIT — quelle lettre faut-il poser pour ce
// son-là ? C'est le même savoir pris dans l'autre sens, et c'est le sens
// difficile : à la lecture, une seule réponse est possible ; à l'écriture, il
// faut choisir.
//
// LE PIÈGE DE LA NOTION, et il est mécanique : ENTRE DEUX VOYELLES, UN SEUL
// « s » SE DIT [z]. poison / poisson, cousin / coussin, désert / dessert. Un
// enfant qui écrit ce qu'il entend met un « s » et obtient l'autre mot.
//
// ⚠️ Les pièges d'orthographe sont écrits À LA MAIN et phonétiquement
// plausibles — bocou, écolle, maizon. Une anagramme ou une lettre ajoutée au
// hasard ne trompe personne, et fabriquer un piège donne parfois un vrai mot :
// « mon » à l'envers donne « nom », « dans » plus un e donne « danse ».

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

/* ── Les accents à poser ─────────────────────────────────────────────────────
   ⛔ On ne demande pas quel son on entend — voir l'en-tête de
   `sons-complexes.bank.ts` : « lait » ne se dit pas pareil ici et dans le
   nord. On demande quel accent s'ÉCRIT dans le mot, ce qui ne change nulle
   part, et les pièges sont des orthographes plausibles. */

type MotAccentue = {
  readonly mot: string;
  readonly nu: string;
  readonly nom: string;
  /** Une orthographe fausse mais crédible : le mauvais accent. */
  readonly faux: string;
};

const ACCENTUES: readonly MotAccentue[] = [
  { mot: "école", nu: "ecole", nom: "un accent aigu", faux: "ècole" },
  { mot: "été", nu: "ete", nom: "un accent aigu", faux: "èté" },
  { mot: "vélo", nu: "velo", nom: "un accent aigu", faux: "vèlo" },
  { mot: "café", nu: "cafe", nom: "un accent aigu", faux: "cafè" },
  { mot: "récré", nu: "recre", nom: "un accent aigu", faux: "récrè" },
  { mot: "cinéma", nu: "cinema", nom: "un accent aigu", faux: "cinèma" },
  { mot: "père", nu: "pere", nom: "un accent grave", faux: "péré" },
  { mot: "mère", nu: "mere", nom: "un accent grave", faux: "méré" },
  { mot: "frère", nu: "frere", nom: "un accent grave", faux: "fréré" },
  { mot: "règle", nu: "regle", nom: "un accent grave", faux: "régle" },
  { mot: "colère", nu: "colere", nom: "un accent grave", faux: "coléré" },
  { mot: "fête", nu: "fete", nom: "un accent circonflexe", faux: "féte" },
  { mot: "tête", nu: "tete", nom: "un accent circonflexe", faux: "tète" },
  { mot: "forêt", nu: "foret", nom: "un accent circonflexe", faux: "forét" },
  { mot: "gâteau", nu: "gateau", nom: "un accent circonflexe", faux: "gàteau" },
  { mot: "île", nu: "ile", nom: "un accent circonflexe", faux: "ìle" },
];

/* ── s ou ss entre deux voyelles ─────────────────────────────────────────── */

type PaireS = {
  readonly avecSS: string;
  readonly avecS: string;
  readonly sensSS: string;
  readonly sensS: string;
};

const S_ENTRE_VOYELLES: readonly PaireS[] = [
  { avecSS: "poisson", avecS: "poison", sensSS: "un animal qui nage", sensS: "un produit dangereux" },
  { avecSS: "coussin", avecS: "cousin", sensSS: "un objet moelleux", sensS: "un membre de la famille" },
  { avecSS: "dessert", avecS: "désert", sensSS: "ce qu'on mange à la fin du repas", sensS: "un lieu de sable sans eau" },
  { avecSS: "basse", avecS: "base", sensSS: "pas haute", sensS: "le point de départ" },
  { avecSS: "cassé", avecS: "casé", sensSS: "en morceaux", sensS: "rangé dans une case" },
  { avecSS: "russe", avecS: "ruse", sensSS: "de Russie", sensS: "un tour malin" },
];

/** Des mots où le [s] entre deux voyelles s'écrit forcément « ss ». */
const MOTS_SS: readonly string[] = [
  "chausson", "assiette", "brosse", "tasse", "boisson", "chaussure",
  "poussière", "mousse", "aussi", "assez", "essayer", "dessin",
];

/** Des mots où le [z] entre deux voyelles s'écrit avec un seul « s ». */
const MOTS_S: readonly string[] = [
  "maison", "chaise", "vase", "église", "oiseau", "raisin",
  "cuisine", "saison", "valise", "chemise", "rose", "musique",
];

/* ── c et g devant e, i, y ───────────────────────────────────────────────── */

type LettreVariable = {
  readonly mot: string;
  readonly lettre: "c" | "g";
  /** Le son que la lettre fait dans CE mot-là. */
  readonly son: string;
  /** La lettre qui suit, et qui décide. */
  readonly suivante: string;
};

const C_ET_G: readonly LettreVariable[] = [
  { mot: "citron", lettre: "c", son: "s", suivante: "i" },
  { mot: "cerise", lettre: "c", son: "s", suivante: "e" },
  { mot: "cinéma", lettre: "c", son: "s", suivante: "i" },
  { mot: "ciseaux", lettre: "c", son: "s", suivante: "i" },
  { mot: "cygne", lettre: "c", son: "s", suivante: "y" },
  { mot: "cerf", lettre: "c", son: "s", suivante: "e" },
  { mot: "carotte", lettre: "c", son: "k", suivante: "a" },
  { mot: "cochon", lettre: "c", son: "k", suivante: "o" },
  { mot: "cube", lettre: "c", son: "k", suivante: "u" },
  { mot: "cahier", lettre: "c", son: "k", suivante: "a" },
  { mot: "colle", lettre: "c", son: "k", suivante: "o" },
  { mot: "cuisine", lettre: "c", son: "k", suivante: "u" },
  { mot: "girafe", lettre: "g", son: "j", suivante: "i" },
  { mot: "gilet", lettre: "g", son: "j", suivante: "i" },
  { mot: "geler", lettre: "g", son: "j", suivante: "e" },
  { mot: "genou", lettre: "g", son: "j", suivante: "e" },
  { mot: "gymnase", lettre: "g", son: "j", suivante: "y" },
  { mot: "gâteau", lettre: "g", son: "g", suivante: "â" },
  { mot: "gomme", lettre: "g", son: "g", suivante: "o" },
  { mot: "gorge", lettre: "g", son: "g", suivante: "o" },
  { mot: "guitare", lettre: "g", son: "g", suivante: "u" },
  { mot: "goûter", lettre: "g", son: "g", suivante: "o" },
];

/* ── La lettre finale muette, retrouvée par la famille ───────────────────── */

type Muette = {
  readonly mot: string;
  readonly lettre: string;
  readonly famille: string;
  /** L'orthographe qu'un enfant écrit quand il écrit ce qu'il entend. */
  readonly faux: string;
};

const MUETTES: readonly Muette[] = [
  { mot: "chat", lettre: "t", famille: "chaton", faux: "cha" },
  { mot: "grand", lettre: "d", famille: "grandir", faux: "gran" },
  { mot: "gros", lettre: "s", famille: "grossir", faux: "gro" },
  { mot: "blanc", lettre: "c", famille: "blanche", faux: "blan" },
  { mot: "petit", lettre: "t", famille: "petite", faux: "peti" },
  { mot: "long", lettre: "g", famille: "longue", faux: "lon" },
  { mot: "lourd", lettre: "d", famille: "lourde", faux: "lour" },
  { mot: "dent", lettre: "t", famille: "dentiste", faux: "den" },
  { mot: "chaud", lettre: "d", famille: "chaude", faux: "chau" },
  { mot: "froid", lettre: "d", famille: "froide", faux: "froi" },
  { mot: "vert", lettre: "t", famille: "verte", faux: "ver" },
  { mot: "plat", lettre: "t", famille: "plate", faux: "pla" },
  { mot: "rang", lettre: "g", famille: "ranger", faux: "ran" },
  { mot: "sang", lettre: "g", famille: "sanguin", faux: "san" },
  { mot: "tard", lettre: "d", famille: "tardif", faux: "tar" },
  { mot: "bond", lettre: "d", famille: "bondir", faux: "bon" },
];

/* ── Les mots invariables ────────────────────────────────────────────────────
   ⚠️ ÉCRITS À LA MAIN, ET PHONÉTIQUEMENT PLAUSIBLES. Fabriquer les pièges en
   ajoutant un « s » ou un « e » donne de vrais mots : « dans » + e = danse,
   « bien » + s = biens, « puis » + e = puise. L'élève aurait alors deux
   bonnes réponses sous les yeux, et rien ne le signalerait. */

type Invariable = {
  readonly mot: string;
  readonly faux: readonly string[];
};

const INVARIABLES: readonly Invariable[] = [
  { mot: "beaucoup", faux: ["bocou", "beaucou", "beaucoud"] },
  { mot: "toujours", faux: ["toujour", "toujourt", "toujoure"] },
  { mot: "aussitôt", faux: ["aussito", "ossitôt", "aussitau"] },
  { mot: "plutôt", faux: ["pluto", "plutau", "plustôt"] },
  { mot: "bientôt", faux: ["biento", "bientau", "bien tôt"] },
  { mot: "jamais", faux: ["jamai", "jamet", "jamaix"] },
  { mot: "quelquefois", faux: ["quelquefoi", "quelkefois", "quelquefoit"] },
  { mot: "longtemps", faux: ["longtan", "lontemps", "longtemp"] },
  { mot: "maintenant", faux: ["maintenan", "mintenant", "maintenent"] },
  { mot: "pourquoi", faux: ["pourkoi", "pourquoit", "pour quoi"] },
  { mot: "assez", faux: ["assé", "asser", "assais"] },
  { mot: "aujourd'hui", faux: ["aujourdui", "ojourd'hui", "aujourd'huit"] },
  { mot: "ensemble", faux: ["ansemble", "ensanble", "en semble"] },
  { mot: "presque", faux: ["preske", "presq", "près que"] },
  { mot: "tôt", faux: ["to", "tau", "taut"] },
  { mot: "encore", faux: ["ancore", "encor", "en core"] },
];

export const orthographeLexicaleBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_ORTHLEX_ACCENTS
  ========================================================= */
  {
    kind: "template",
    id: "ce1_orthlex_accents_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_accents",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde le sens du trait : é monte vers la droite, è descend, ê porte un chapeau.",
    tags: ["ce1", "orthographe-lexicale", "accents", "template"],
    generate: () => {
      const m = randomChoice(ACCENTUES);
      const autres = shuffle(ACCENTUES.filter((x) => x.mot !== m.mot))
        .slice(0, 2)
        .map((x) => x.mot);
      return {
        text: `Comment s'écrit correctement ce mot : « ${m.nu} » ?`,
        format: "qcm" as const,
        choices: makeChoices(m.mot, [m.nu, m.faux, ...autres]),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'accent fait partie du mot, au même titre que ses lettres. Oublier l'accent, c'est faire une faute.",
          "Repère la voyelle accentuée, puis vérifie le dessin du trait.",
          `On écrit « ${m.mot} », avec ${m.nom}. « ${m.nu} » n'a pas d'accent du tout, et « ${m.faux} » n'a pas le bon.`,
          `Le mot correct est « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orthlex_accents_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_accents",
    difficulty: 2,
    theme: "neutral",
    hint: "Aigu monte, grave descend, circonflexe est un petit toit.",
    tags: ["ce1", "orthographe-lexicale", "accents", "template"],
    generate: () => {
      const m = randomChoice(ACCENTUES);
      return {
        text: `Quel accent faut-il écrire dans le mot « ${m.mot} » ?`,
        format: "qcm" as const,
        choices: shuffle([
          "un accent aigu",
          "un accent grave",
          "un accent circonflexe",
          "aucun accent",
        ]),
        expected: [m.nom],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Trois accents se posent sur les voyelles : aigu, grave et circonflexe.",
          "Écris le mot de mémoire, puis compare le dessin de ton accent avec le modèle.",
          `« ${m.mot} » porte ${m.nom}.`,
          `Il faut ${m.nom}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORTHLEX_S_ENTRE_VOYELLES — le piège de la notion
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_orthlex_s_entre_voyelles_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_s_entre_voyelles",
    difficulty: 3,
    theme: "neutral",
    text: "Entre deux voyelles, que faut-il écrire pour entendre le son « s », comme dans « poisson » ?",
    format: "qcm",
    choices: [
      "deux « s » : sinon on lit le son « z »",
      "un seul « s »",
      "un « c »",
      "un « z »",
    ],
    expected: ["deux « s » : sinon on lit le son « z »"],
    comparator: "mcq_exact",
    hint: "Compare « poisson » et « poison » à voix haute.",
    explanation: exp(
      "Entre deux voyelles, un seul « s » se lit [z]. Pour entendre [s], il en faut deux.",
      "Regarde les deux lettres qui encadrent le s : si ce sont des voyelles, la règle s'applique.",
      "poisson / poison, cousin / coussin, désert / dessert. Un enfant qui écrit ce qu'il entend met un seul s — et obtient l'autre mot, celui qui rend malade.",
      "Il faut deux « s ».",
    ),
    tags: ["ce1", "orthographe-lexicale", "s-ss", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_orthlex_s_entre_voyelles_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_s_entre_voyelles",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul « s » entre deux voyelles se lit « z ». Deux « s » se lisent « s ».",
    tags: ["ce1", "orthographe-lexicale", "s-ss", "template"],
    generate: () => {
      const p = randomChoice(S_ENTRE_VOYELLES);
      const versSS = Math.random() < 0.5;
      const bon = versSS ? p.avecSS : p.avecS;
      const sens = versSS ? p.sensSS : p.sensS;
      const autres = shuffle(S_ENTRE_VOYELLES.filter((x) => x.avecSS !== p.avecSS))
        .slice(0, 2)
        .map((x) => x.avecSS);
      return {
        text: `Comment s'écrit le mot qui veut dire « ${sens} » ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, [versSS ? p.avecS : p.avecSS, ...autres]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Entre deux voyelles : un « s » se lit [z], deux « ss » se lisent [s].",
          "Dis le mot en allongeant le son du milieu : si ta gorge vibre, c'est [z], donc un seul s.",
          `« ${p.avecSS} » (${p.sensSS}) et « ${p.avecS} » (${p.sensS}) : une lettre de différence, et deux mots qui n'ont rien à voir.`,
          `On écrit « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orthlex_s_entre_voyelles_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_s_entre_voyelles",
    difficulty: 2,
    theme: "neutral",
    hint: "Écoute le milieu du mot : si ça vibre, c'est un seul « s ».",
    tags: ["ce1", "orthographe-lexicale", "s-ss", "template"],
    generate: () => {
      const double = Math.random() < 0.5;
      const mot = double ? randomChoice(MOTS_SS) : randomChoice(MOTS_S);
      const bon = double ? "deux « ss »" : "un seul « s »";
      return {
        text: `Dans le mot « ${mot} », faut-il écrire un seul « s » ou deux ?`,
        format: "qcm" as const,
        choices: ["un seul « s »", "deux « ss »"],
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Entre deux voyelles, un « s » se lit [z] et « ss » se lit [s].",
          "Pose ta main sur ta gorge et allonge le son du milieu du mot : si ça vibre, c'est [z], donc un seul s.",
          double
            ? `Dans « ${mot} », on entend [s] : il faut deux « ss ». Avec un seul, on lirait [z].`
            : `Dans « ${mot} », on entend [z] : un seul « s » suffit. Avec deux, on lirait [s].`,
          `Il faut ${bon}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORTHLEX_C_G_VARIABLE
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_orthlex_c_g_variable_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_c_g_variable",
    difficulty: 2,
    theme: "neutral",
    text: "Devant quelles lettres le « c » se lit-il « s », comme dans « citron » ?",
    format: "qcm",
    choices: [
      "devant e, i et y",
      "devant a, o et u",
      "devant toutes les voyelles",
      "à la fin des mots",
    ],
    expected: ["devant e, i et y"],
    comparator: "mcq_exact",
    hint: "citron, cerise, cygne : quelle lettre suit le c à chaque fois ?",
    explanation: exp(
      "Le « c » se lit [s] devant e, i et y. Devant a, o et u, il se lit [k].",
      "Regarde la lettre qui SUIT le c : c'est elle qui décide, pas le c lui-même.",
      "citron, cerise, cygne : [s]. carotte, cochon, cube : [k]. Le « g » suit exactement la même règle : girafe, genou, gymnase contre gomme, gâteau, guitare.",
      "Le « c » se lit « s » devant e, i et y.",
    ),
    tags: ["ce1", "orthographe-lexicale", "c-g", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_orthlex_c_g_variable_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_c_g_variable",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde la lettre qui vient juste après.",
    tags: ["ce1", "orthographe-lexicale", "c-g", "template"],
    generate: () => {
      const m = randomChoice(C_ET_G);
      const sonsPossibles = m.lettre === "c" ? ["s", "k"] : ["j", "g"];
      return {
        text: `Dans le mot « ${m.mot} », comment se lit la lettre « ${m.lettre} » ?`,
        format: "qcm" as const,
        choices: shuffle(sonsPossibles),
        expected: [m.son],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le « c » et le « g » changent de son selon la lettre qui les suit : [s] et [j] devant e, i, y ; [k] et [g] devant a, o, u.",
          "Ne regarde pas la lettre elle-même : regarde celle d'après.",
          `Dans « ${m.mot} », le « ${m.lettre} » est suivi de « ${m.suivante} » : il se lit donc « ${m.son} ».`,
          `Le « ${m.lettre} » se lit « ${m.son} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orthlex_c_g_variable_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_c_g_variable",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois mots suivent la même règle. Le quatrième, non.",
    tags: ["ce1", "orthographe-lexicale", "c-g", "template"],
    generate: () => {
      const m = randomChoice(C_ET_G);
      const memes = shuffle(
        C_ET_G.filter((x) => x.lettre === m.lettre && x.son === m.son && x.mot !== m.mot),
      )
        .slice(0, 2)
        .map((x) => x.mot);
      const intrus = randomChoice(
        C_ET_G.filter((x) => x.lettre === m.lettre && x.son !== m.son),
      ).mot;
      return {
        text: `Dans trois de ces mots, la lettre « ${m.lettre} » se lit « ${m.son} ». Lequel est l'intrus ?\n\n${shuffle([intrus, m.mot, ...memes]).join(" · ")}`,
        format: "qcm" as const,
        choices: makeChoices(intrus, [m.mot, ...memes]),
        expected: [intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "C'est la lettre qui SUIT le c ou le g qui décide de son son.",
          "Souligne la lettre d'après dans chaque mot, puis applique la règle : e, i, y d'un côté ; a, o, u de l'autre.",
          `${[m.mot, ...memes].join(", ")} : la lettre « ${m.lettre} » y fait « ${m.son} ». Dans « ${intrus} », elle est suivie d'une autre voyelle, et le son change.`,
          `L'intrus est « ${intrus} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORTHLEX_LETTRE_MUETTE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_orthlex_lettre_muette_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_lettre_muette",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche un mot de la même famille : la lettre endormie s'y réveille.",
    tags: ["ce1", "orthographe-lexicale", "muettes", "template"],
    generate: () => {
      const m = randomChoice(MUETTES);
      const autres = shuffle(MUETTES.filter((x) => x.mot !== m.mot))
        .slice(0, 2)
        .map((x) => x.mot);
      return {
        text: `On entend « ${m.faux} ». Comment ce mot s'écrit-il vraiment ?`,
        format: "qcm" as const,
        choices: makeChoices(m.mot, [m.faux, ...autres]),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Beaucoup de mots finissent par une consonne qu'on écrit sans la dire.",
          "Cherche un mot de la même famille, plus long : la lettre muette s'y prononce.",
          `${m.mot} → ${m.famille} : le « ${m.lettre} » se réveille. C'est la preuve qu'il faut l'écrire.`,
          `On écrit « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orthlex_lettre_muette_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_lettre_muette",
    difficulty: 2,
    theme: "neutral",
    hint: "Allonge le mot : cherche un mot plus long qui commence pareil.",
    tags: ["ce1", "orthographe-lexicale", "muettes", "template"],
    generate: () => {
      const m = randomChoice(MUETTES);
      const autres = shuffle(MUETTES.filter((x) => x.mot !== m.mot))
        .slice(0, 3)
        .map((x) => x.famille);
      return {
        text: `Quel mot permet de savoir quelle lettre muette écrire à la fin de « ${m.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(m.famille, autres),
        expected: [m.famille],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La lettre finale muette se retrouve grâce à un mot de la même famille, où elle se prononce.",
          "Allonge le mot, ou mets-le au féminin : la lettre apparait.",
          `${m.mot} → ${m.famille}. On entend le « ${m.lettre} » : c'est donc lui qu'il faut écrire à la fin de « ${m.mot} ».`,
          `Le mot qui aide est « ${m.famille} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORTHLEX_MOTS_INVARIABLES
  ========================================================= */
  {
    kind: "template",
    id: "ce1_orthlex_mots_invariables_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_mots_invariables",
    difficulty: 3,
    theme: "neutral",
    hint: "Ces mots-là ne se devinent pas : ils s'apprennent par cœur.",
    tags: ["ce1", "orthographe-lexicale", "invariables", "template"],
    generate: () => {
      const m = randomChoice(INVARIABLES);
      return {
        text: `Comment s'écrit le mot « ${m.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(m.mot, m.faux),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot invariable ne change jamais : ni féminin, ni pluriel. Son orthographe s'apprend une fois pour toutes.",
          "Écris-le les yeux fermés, puis compare lettre à lettre avec le modèle.",
          `On écrit « ${m.mot} ». Les autres orthographes se disent pareil, et c'est bien ce qui les rend dangereuses.`,
          `Le mot s'écrit « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orthlex_mots_invariables_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_mots_invariables",
    difficulty: 3,
    theme: "neutral",
    hint: "Toutes ces orthographes se disent pareil. Une seule s'écrit comme il faut.",
    tags: ["ce1", "orthographe-lexicale", "invariables", "template"],
    generate: () => {
      const m = randomChoice(INVARIABLES);
      const juste = Math.random() < 0.4;
      const ecrit = juste ? m.mot : randomChoice(m.faux);
      return {
        text: `Ce mot est-il correctement écrit : « ${ecrit} » ?`,
        format: "qcm" as const,
        choices: ["oui", "non"],
        expected: [juste ? "oui" : "non"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'orthographe d'un mot invariable ne se devine pas : elle se retient.",
          "Compare lettre à lettre avec le mot que tu as appris. Ton oreille ne peut pas t'aider : toutes ces façons de l'écrire se disent pareil.",
          juste
            ? `« ${m.mot} » est la bonne orthographe.`
            : `« ${ecrit} » se dit comme « ${m.mot} », mais ce n'est pas ainsi qu'on l'écrit.`,
          juste ? "Oui." : `Non : on écrit « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_orthlex_mots_invariables_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_mots_invariables",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qu'un mot invariable ?",
    format: "qcm",
    choices: [
      "Un mot qui s'écrit toujours pareil, même au pluriel",
      "Un mot qui change à chaque phrase",
      "Un mot très court",
      "Un mot sans accent",
    ],
    expected: ["Un mot qui s'écrit toujours pareil, même au pluriel"],
    comparator: "mcq_exact",
    hint: "Essaie de mettre « toujours » au pluriel. Que se passe-t-il ?",
    explanation: exp(
      "Un mot invariable garde exactement la même orthographe, quelles que soient les autres mots autour de lui.",
      "Ne lui ajoute rien : ni « s » au pluriel, ni « e » au féminin.",
      "toujours, beaucoup, plutôt, longtemps : qu'il y en ait un ou mille, ces mots ne bougent pas d'une lettre.",
      "C'est un mot qui s'écrit toujours pareil, même au pluriel.",
    ),
    tags: ["ce1", "orthographe-lexicale", "invariables", "definition", "qcm"],
  },

  /* =========================================================
     CE1_ORTHLEX_DEFI
  ========================================================= */
  {
    kind: "template",
    id: "ce1_orthlex_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses à vérifier : l'orthographe du mot, et ce qu'il veut dire.",
    tags: ["ce1", "orthographe-lexicale", "defi", "template"],
    generate: () => {
      const p = randomChoice(S_ENTRE_VOYELLES);
      const bon = `« ${p.avecSS} » : ${p.sensSS} · « ${p.avecS} » : ${p.sensS}`;
      return {
        text: `« ${p.avecSS} » et « ${p.avecS} » ne changent que d'un « s ».\n\nQuelle réponse est entièrement juste ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `« ${p.avecSS} » : ${p.sensS} · « ${p.avecS} » : ${p.sensSS}`,
          `« ${p.avecSS} » : ${p.sensSS} · « ${p.avecS} » : ${p.sensSS}`,
          `« ${p.avecSS} » : ${p.sensS} · « ${p.avecS} » : ${p.sensS}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Entre deux voyelles, le nombre de « s » décide du son — et donc du mot.",
          "Prends un mot à la fois : compte les « s », applique la règle, puis donne le sens.",
          `« ${p.avecSS} » avec deux s : on entend [s], et ça veut dire ${p.sensSS}. « ${p.avecS} » avec un seul : on entend [z], et ça veut dire ${p.sensS}.`,
          `La réponse juste est : ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orthlex_defi_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses à trouver : l'orthographe, et le mot de la famille qui la prouve.",
    tags: ["ce1", "orthographe-lexicale", "defi", "template"],
    generate: () => {
      const m = randomChoice(MUETTES);
      const autre = randomChoice(MUETTES.filter((x) => x.mot !== m.mot));
      const bon = `« ${m.mot} », grâce à « ${m.famille} »`;
      return {
        text: `On entend « ${m.faux} ». Comment ce mot s'écrit-il, et grâce à quel mot de la même famille le sait-on ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `« ${m.mot} », grâce à « ${autre.famille} »`,
          `« ${m.faux} », grâce à « ${m.famille} »`,
          `« ${autre.mot} », grâce à « ${autre.famille} »`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une réponse n'est juste que si les deux moitiés le sont : l'orthographe, ET la preuve.",
          "Trouve d'abord le mot de la famille, écoute la lettre qui s'y réveille, puis écris le mot court.",
          `${m.mot} → ${m.famille} : le « ${m.lettre} » se prononce. C'est donc « ${m.lettre} » qu'il faut écrire à la fin de « ${m.mot} », et « ${m.famille} » qui le prouve.`,
          `La réponse juste est : ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_orthlex_defi_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "C'est la lettre qui SUIT qui décide du son.",
    tags: ["ce1", "orthographe-lexicale", "defi", "template"],
    generate: () => {
      const m = randomChoice(C_ET_G);
      const bon = `« ${m.son} », parce que le « ${m.lettre} » est suivi de « ${m.suivante} »`;
      const autreSon = m.lettre === "c" ? (m.son === "s" ? "k" : "s") : m.son === "j" ? "g" : "j";
      const autre = randomChoice(C_ET_G.filter((x) => x.lettre === m.lettre && x.son !== m.son));
      return {
        text: `Dans « ${m.mot} », quel son fait la lettre « ${m.lettre} », et pourquoi ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `« ${autreSon} », parce que le « ${m.lettre} » est suivi de « ${m.suivante} »`,
          `« ${m.son} », parce que le « ${m.lettre} » est suivi de « ${autre.suivante} »`,
          `« ${autreSon} », parce que le « ${m.lettre} » est en début de mot`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le « c » et le « g » ne décident pas tout seuls : c'est la lettre qui les suit qui fixe leur son.",
          "Souligne la lettre d'après, puis applique la règle : e, i, y d'un côté ; a, o, u de l'autre.",
          `Dans « ${m.mot} », le « ${m.lettre} » est suivi de « ${m.suivante} », donc il se lit « ${m.son} ». Dans « ${autre.mot} », la lettre d'après est « ${autre.suivante} », et le son devient « ${autre.son} ».`,
          `La réponse juste est : ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_orthlex_defi_ouverte_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "orthographe_lexicale",
    microId: "ce1_orthlex_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Tu veux écrire le mot « grand » mais tu n'entends pas la dernière lettre.\n\nExplique avec tes mots comment tu peux savoir laquelle écrire.",
    format: "open",
    expected: ["grandir", "grande", "famille", "allonge", "féminin", "feminin", "mot plus long", "entend"],
    comparator: "contains_keyword",
    hint: "Cherche un mot de la même famille, plus long.",
    explanation: exp(
      "La lettre finale muette d'un mot se retrouve grâce à un mot de la même famille, où elle se prononce.",
      "Allonge le mot, ou mets-le au féminin, et écoute la fin.",
      "grand → grandir, ou grand → grande. Dans les deux, on entend le « d ». C'est donc un « d » qu'il faut écrire, et pas un « t ».",
      "On cherche un mot de la même famille : « grandir » ou « grande » réveillent le « d ».",
    ),
    tags: ["ce1", "orthographe-lexicale", "defi", "methode", "open"],
  },
];
