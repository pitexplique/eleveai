// lib/tutor-v4/questionBank/cp/francais/vocabulaire.bank.ts
//
// Le vocabulaire du CP, écrit à la main. La plus grosse notion de la classe
// après la grammaire : dix micro-compétences, dont six qui n'existaient pas
// dans l'ancienne liste — les antonymes, le champ lexical, la polysémie,
// les affixes, l'ordre alphabétique et le dictionnaire.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Enrichir en contexte le vocabulaire appris au cycle 1 » ;
//   — « Être sensible, SANS EN APPRENDRE LES CONCEPTS, à la polysémie et à la
//     différence entre sens propre et sens figuré » ;
//   — « Commencer à mobiliser l'ordre alphabétique pour utiliser un
//     dictionnaire adapté (papier ou numérique) » ;
//   — « Constituer des répertoires de mots par thème, par classe grammaticale,
//     par famille de mots, par analogies morphologiques » ;
//   — « Savoir proposer et justifier une catégorisation du corpus de mots
//     étudié » ;
//   — « Savoir trouver des synonymes et des antonymes » ;
//   — quatre corpus par période.
//
// Les exemples du BO sont repris tels quels, ce sont les meilleurs :
//   trousse/colle/bureau/ardoise pour le champ lexical ;
//   coller/décoller/recoller pour la dérivation ;
//   lourd/léger et visible/invisible pour les antonymes ;
//   chant/chanter et dormeur/dormir pour la famille ;
//   dé-, re-, in-, -eur, -ier, -ette pour les affixes ;
//   « il tombe dans la cour » / « la nuit tombe » pour la polysémie.
//
// LE PIÈGE DE LA NOTION : deux mots qui se ressemblent ne sont pas forcément
// de la même famille. « lait » et « laid » se disent pareil et n'ont rien à
// voir ; « pomme » et « pommade » non plus. Une famille, ce n'est pas une
// ressemblance de lettres — c'est une parenté de sens.
//
// ⛔ On ne NOMME pas la polysémie ni le sens figuré : le BO dit « sans en
// apprendre les concepts ». On montre qu'un mot a plusieurs sens, on ne fait
// pas réciter le mot « polysémie ».
//
// ⚠️ Tables typées à la main, jamais en `as const` : leurs champs se comparent
// entre eux, et des types littéraux font casser le build à la compilation
// sans que `verifier-generateurs.mjs` n'y voie rien.

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

type Famille = { readonly radical: string; readonly mots: readonly string[]; readonly intrus: string };
type Affixe = { readonly affixe: string; readonly place: string; readonly sens: string; readonly paires: readonly (readonly [string, string])[] };
type Paire = { readonly a: string; readonly b: string };
type Champ = { readonly theme: string; readonly mots: readonly string[]; readonly intrus: string };
type MotDeuxSens = { readonly mot: string; readonly sens1: string; readonly sens2: string; readonly phrase1: string; readonly phrase2: string };

const FAMILLES: readonly Famille[] = [
  { radical: "jardin", mots: ["jardiner", "jardinier", "jardinage"], intrus: "cuisine" },
  { radical: "chant", mots: ["chanter", "chanteur", "chanson"], intrus: "courir" },
  { radical: "dent", mots: ["dentiste", "dentier", "dentifrice"], intrus: "pied" },
  { radical: "fleur", mots: ["fleurir", "fleuriste", "fleuri"], intrus: "arbre" },
  { radical: "lait", mots: ["laitier", "laiterie", "laitage"], intrus: "pain" },
  { radical: "terre", mots: ["terrain", "atterrir", "terrier"], intrus: "ciel" },
  { radical: "dormir", mots: ["dormeur", "endormi", "dortoir"], intrus: "manger" },
  { radical: "cuisine", mots: ["cuisinier", "cuisiner", "cuisinière"], intrus: "jardin" },
  { radical: "pêche", mots: ["pêcheur", "pêcher", "pêcherie"], intrus: "montagne" },
  { radical: "glace", mots: ["glacé", "glacier", "glaçon"], intrus: "soleil" },
  { radical: "mer", mots: ["marin", "marée", "maritime"], intrus: "montagne" },
  { radical: "feuille", mots: ["feuillage", "feuillu", "feuilleter"], intrus: "racine" },
  { radical: "danse", mots: ["danser", "danseur", "danseuse"], intrus: "chanter" },
  { radical: "nage", mots: ["nager", "nageur", "nageoire"], intrus: "courir" },
  { radical: "coiffer", mots: ["coiffeur", "coiffure", "coiffeuse"], intrus: "laver" },
  { radical: "laver", mots: ["lavage", "laveur", "lavabo"], intrus: "sécher" },
  { radical: "long", mots: ["longueur", "allonger", "longer"], intrus: "large" },
];

const AFFIXES: readonly Affixe[] = [
  { affixe: "dé-", place: "devant", sens: "faire le contraire", paires: [["coller", "décoller"], ["faire", "défaire"], ["monter", "démonter"], ["plier", "déplier"]] },
  { affixe: "re-", place: "devant", sens: "recommencer", paires: [["faire", "refaire"], ["coller", "recoller"], ["voir", "revoir"], ["lire", "relire"]] },
  { affixe: "in-", place: "devant", sens: "le contraire", paires: [["visible", "invisible"], ["connu", "inconnu"], ["utile", "inutile"]] },
  { affixe: "-eur", place: "derrière", sens: "celui qui fait", paires: [["chanter", "chanteur"], ["coiffer", "coiffeur"], ["danser", "danseur"], ["pêcher", "pêcheur"]] },
  { affixe: "-ier", place: "derrière", sens: "l'arbre qui donne le fruit", paires: [["poire", "poirier"], ["cerise", "cerisier"], ["pomme", "pommier"], ["prune", "prunier"]] },
  { affixe: "-ette", place: "derrière", sens: "en plus petit", paires: [["table", "tablette"], ["maison", "maisonnette"], ["fille", "fillette"], ["camion", "camionnette"]] },
];

const SYNONYMES: readonly Paire[] = [
  { a: "content", b: "joyeux" },
  { a: "grand", b: "immense" },
  { a: "petit", b: "minuscule" },
  { a: "joli", b: "beau" },
  { a: "triste", b: "malheureux" },
  { a: "drôle", b: "amusant" },
  { a: "gentil", b: "aimable" },
  { a: "calme", b: "tranquille" },
  { a: "malin", b: "rusé" },
  { a: "bizarre", b: "étrange" },
];

const ANTONYMES: readonly Paire[] = [
  { a: "lourd", b: "léger" },
  { a: "visible", b: "invisible" },
  { a: "grand", b: "petit" },
  { a: "chaud", b: "froid" },
  { a: "jour", b: "nuit" },
  { a: "ouvert", b: "fermé" },
  { a: "propre", b: "sale" },
  { a: "content", b: "triste" },
  { a: "plein", b: "vide" },
  { a: "monter", b: "descendre" },
  { a: "rapide", b: "lent" },
];

const CHAMPS: readonly Champ[] = [
  { theme: "l'école", mots: ["trousse", "colle", "bureau", "ardoise"], intrus: "mangue" },
  { theme: "la mer", mots: ["bateau", "vague", "sable", "poisson"], intrus: "cahier" },
  { theme: "la cuisine", mots: ["marmite", "cari", "assiette", "cuillère"], intrus: "vélo" },
  { theme: "le jardin", mots: ["fleur", "arbre", "feuille", "arrosoir"], intrus: "trousse" },
  { theme: "les animaux", mots: ["chien", "chat", "margouillat", "oiseau"], intrus: "table" },
  { theme: "les fruits", mots: ["letchi", "mangue", "banane", "ananas"], intrus: "chaise" },
];

const DEUX_SENS: readonly MotDeuxSens[] = [
  { mot: "tomber", sens1: "faire une chute", sens2: "arriver, venir", phrase1: "Léo tombe dans la cour.", phrase2: "La nuit tombe." },
  { mot: "décoller", sens1: "détacher ce qui est collé", sens2: "quitter le sol", phrase1: "Je décolle l'étiquette.", phrase2: "L'avion décolle." },
  { mot: "souris", sens1: "un petit animal", sens2: "un objet de l'ordinateur", phrase1: "La souris grignote le pain.", phrase2: "Je clique avec la souris." },
  { mot: "feuille", sens1: "une partie de l'arbre", sens2: "un morceau de papier", phrase1: "Une feuille tombe de l'arbre.", phrase2: "J'écris sur une feuille." },
  { mot: "pied", sens1: "le bas de la jambe", sens2: "le bas d'un objet", phrase1: "Léa se lave les pieds.", phrase2: "Le pied de la table est cassé." },
  { mot: "glace", sens1: "un dessert froid", sens2: "un miroir", phrase1: "Je mange une glace au coco.", phrase2: "Je me regarde dans la glace." },
  { mot: "orange", sens1: "un fruit", sens2: "une couleur", phrase1: "Je presse une orange.", phrase2: "Mon cartable est orange." },
];

// Deux mots qui se ressemblent, sans aucun lien de famille. C'est le piège.
const FAUX_AMIS: readonly (readonly [string, string])[] = [
  ["lait", "laid"],
  ["pomme", "pommade"],
  ["dent", "dedans"],
  ["chat", "château"],
  ["mer", "merci"],
  ["pain", "peine"],
  ["car", "carotte"],
  ["vent", "vendredi"],
  ["mont", "monde"],
  ["sol", "soldat"],
];

const MOTS_ALPHABET = [
  "arbre", "bateau", "cari", "dent", "école", "fleur", "gomme", "hibou",
  "île", "jardin", "kayak", "lagon", "mangue", "nid", "orange", "piton",
  "requin", "souris", "tamarin", "vélo",
];

export const vocabulaireBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_VOC_MOT_INCONNU — deviner par le contexte
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_voc_mot_inconnu_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_mot_inconnu",
    difficulty: 3,
    theme: "neutral",
    text: "« Le sentier s'ouvre sur une CLAIRIÈRE : au milieu des arbres, il n'y a soudain plus d'arbres du tout, juste de l'herbe et du soleil. »\n\nQu'est-ce qu'une clairière ?",
    format: "qcm",
    choices: [
      "un endroit sans arbres au milieu de la forêt",
      "un très grand arbre",
      "un chemin de montagne",
      "un petit animal de la forêt",
    ],
    expected: ["un endroit sans arbres au milieu de la forêt"],
    comparator: "mcq_exact",
    hint: "La phrase explique elle-même ce qu'on y trouve.",
    explanation: exp(
      "Quand un mot est inconnu, on ne s'arrête pas : on cherche autour de lui.",
      "Relis la phrase entière : elle contient souvent l'explication, juste avant ou juste après.",
      "« au milieu des arbres, il n'y a soudain plus d'arbres du tout » : la phrase te dit exactement ce que c'est. Tu n'avais pas besoin du dictionnaire.",
      "Une clairière est un endroit sans arbres au milieu de la forêt.",
    ),
    tags: ["cp", "vocabulaire", "contexte", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_voc_mot_inconnu_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_mot_inconnu",
    difficulty: 2,
    theme: "neutral",
    hint: "Le reste de la phrase te met sur la piste.",
    tags: ["cp", "vocabulaire", "contexte", "template"],
    generate: () => {
      const c = randomChoice(CHAMPS);
      const mot = randomChoice(c.mots);
      const autres = shuffle(CHAMPS.filter((x) => x.theme !== c.theme).map((x) => x.theme)).slice(0, 3);
      return {
        text: `« Range ton ${mot} avant de partir. »\n\nDe quoi parle-t-on ?`,
        format: "qcm" as const,
        choices: makeChoices(c.theme, autres),
        expected: [c.theme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot appartient à un univers : quand on le connait, on sait de quoi parle la phrase.",
          "Demande-toi où l'on trouve cet objet-là.",
          `Un « ${mot} », on en trouve du côté de ${c.theme}.`,
          `On parle de ${c.theme}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_VOC_FAMILLE — LE piège : se ressembler ≠ être parents
  ========================================================= */
  {
    kind: "template",
    id: "cp_voc_famille_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_famille",
    difficulty: 2,
    theme: "neutral",
    hint: "Les mots d'une famille ont un morceau commun ET un sens qui se tient.",
    tags: ["cp", "vocabulaire", "famille", "template"],
    generate: () => {
      const f = randomChoice(FAMILLES);
      return {
        text: `Quel mot n'est PAS de la famille de « ${f.radical} » ?`,
        format: "qcm" as const,
        choices: shuffle([f.intrus, ...f.mots.slice(0, 3)]),
        expected: [f.intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les mots d'une même famille partagent un morceau de départ et une idée commune.",
          "Cherche le morceau qui revient, puis vérifie que le sens se tient.",
          `${f.mots.join(", ")} : on retrouve « ${f.radical} » dans chacun. « ${f.intrus} », non.`,
          `L'intrus est « ${f.intrus} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_voc_famille_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_famille",
    difficulty: 3,
    theme: "neutral",
    hint: "Se ressembler ne suffit pas : il faut aussi que le sens aille ensemble.",
    tags: ["cp", "vocabulaire", "famille", "piege", "template"],
    generate: () => {
      const [a, b] = randomChoice(FAUX_AMIS);
      const f = randomChoice(FAMILLES);
      return {
        text: `« ${a} » et « ${b} » se ressemblent. Sont-ils de la même famille ?`,
        format: "qcm" as const,
        choices: [
          "Non : ils se ressemblent, mais leur sens n'a rien à voir",
          "Oui : ils commencent pareil",
          "Oui : ils se disent presque pareil",
          "On ne peut pas savoir",
        ],
        expected: ["Non : ils se ressemblent, mais leur sens n'a rien à voir"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une famille de mots, ce n'est pas une ressemblance de lettres : c'est une parenté de sens.",
          "Demande-toi si les deux mots parlent de la même chose.",
          `« ${a} » et « ${b} » ne racontent pas la même histoire. En revanche « ${f.radical} » et « ${f.mots[0]} », oui.`,
          `Non : ils se ressemblent, mais ils ne sont pas de la même famille.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cp_voc_famille_tpl_3",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_famille",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le mot qui contient le morceau de départ.",
    tags: ["cp", "vocabulaire", "famille", "template"],
    generate: () => {
      const f = randomChoice(FAMILLES);
      const bon = randomChoice(f.mots);
      const autres = shuffle(
        FAMILLES.filter((x) => x.radical !== f.radical).flatMap((x) => x.mots),
      ).slice(0, 3);
      return {
        text: `Quel mot est de la même famille que « ${f.radical} » ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les mots d'une même famille partagent un morceau de départ et une idée commune.",
          "Cherche le mot dans lequel tu retrouves le morceau, puis vérifie que le sens se tient.",
          `On retrouve « ${f.radical} » dans « ${bon} », et les deux parlent bien de la même chose.`,
          `Le mot de la famille est « ${bon} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_VOC_AFFIXES — les exemples du BO
  ========================================================= */
  {
    kind: "template",
    id: "cp_voc_affixes_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_affixes",
    difficulty: 2,
    theme: "neutral",
    hint: "Un petit morceau ajouté au mot change son sens.",
    tags: ["cp", "vocabulaire", "affixes", "template"],
    generate: () => {
      const a = randomChoice(AFFIXES);
      const [base, derive] = randomChoice(a.paires);
      const autres = shuffle(
        AFFIXES.filter((x) => x.affixe !== a.affixe).flatMap((x) => x.paires.map((pp) => pp[1])),
      ).slice(0, 3);
      return {
        text: `Quel mot est fabriqué à partir de « ${base} » en ajoutant « ${a.affixe} » ?`,
        format: "qcm" as const,
        choices: makeChoices(derive, autres),
        expected: [derive],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On fabrique des mots nouveaux en ajoutant un petit morceau devant ou derrière.",
          `Prends le mot de départ et colle « ${a.affixe} » ${a.place}.`,
          `${base} → ${derive}. Le morceau « ${a.affixe} » veut dire « ${a.sens} ».`,
          `Le mot est « ${derive} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_voc_affixes_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_affixes",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde ce qui a été ajouté, et ce que ça change.",
    tags: ["cp", "vocabulaire", "affixes", "template"],
    generate: () => {
      const a = randomChoice(AFFIXES);
      const [base, derive] = randomChoice(a.paires);
      const autres = shuffle(AFFIXES.filter((x) => x.affixe !== a.affixe).map((x) => x.sens)).slice(0, 3);
      return {
        text: `« ${base} » devient « ${derive} ». Que veut dire le morceau « ${a.affixe} » ?`,
        format: "qcm" as const,
        choices: makeChoices(a.sens, autres),
        expected: [a.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque petit morceau ajouté a son sens à lui, toujours le même.",
          "Compare le mot de départ et le mot d'arrivée : qu'est-ce qui a changé dans le sens ?",
          `${base} → ${derive} : « ${a.affixe} » veut dire « ${a.sens} ».`,
          `« ${a.affixe} » veut dire « ${a.sens} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_VOC_SYNONYME
  ========================================================= */
  {
    kind: "template",
    id: "cp_voc_synonyme_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_synonyme",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le mot qui pourrait le remplacer sans changer la phrase.",
    tags: ["cp", "vocabulaire", "synonyme", "template"],
    generate: () => {
      const p = randomChoice(SYNONYMES);
      const sens = randomChoice([true, false]);
      const mot = sens ? p.a : p.b;
      const bon = sens ? p.b : p.a;
      const autres = shuffle(ANTONYMES.flatMap((q) => [q.a, q.b]))
        .filter((m) => m !== mot && m !== bon)
        .slice(0, 3);
      return {
        text: `Quel mot veut dire à peu près la même chose que « ${mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux synonymes veulent dire presque la même chose : on peut remplacer l'un par l'autre.",
          "Essaie de mettre le mot proposé à la place du premier, dans une phrase.",
          `« ${mot} » et « ${bon} » disent la même idée avec d'autres lettres.`,
          `Le synonyme est « ${bon} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_VOC_ANTONYME — lourd/léger, visible/invisible (BO)
  ========================================================= */
  {
    kind: "template",
    id: "cp_voc_antonyme_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_antonyme",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le mot qui dit exactement le contraire.",
    tags: ["cp", "vocabulaire", "antonyme", "template"],
    generate: () => {
      const p = randomChoice(ANTONYMES);
      const sens = randomChoice([true, false]);
      const mot = sens ? p.a : p.b;
      const bon = sens ? p.b : p.a;
      const autres = shuffle(SYNONYMES.flatMap((q) => [q.a, q.b]))
        .filter((m) => m !== mot && m !== bon)
        .slice(0, 3);
      return {
        text: `Quel mot dit le CONTRAIRE de « ${mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux contraires disent l'inverse l'un de l'autre.",
          "Imagine la chose, puis imagine tout l'inverse.",
          `Le contraire de « ${mot} », c'est « ${bon} ».`,
          `Le contraire est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_voc_antonyme_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_antonyme",
    difficulty: 3,
    theme: "neutral",
    text: "Comment fabrique-t-on le contraire de « visible » ?",
    format: "qcm",
    choices: [
      "en ajoutant « in- » devant : invisible",
      "en ajoutant « re- » devant : revisible",
      "en enlevant la dernière lettre : visibl",
      "il n'y a pas de contraire",
    ],
    expected: ["en ajoutant « in- » devant : invisible"],
    comparator: "mcq_exact",
    hint: "Un petit morceau devant le mot suffit à le retourner.",
    explanation: exp(
      "Certains contraires ne s'inventent pas : on les fabrique en ajoutant un morceau devant le mot.",
      "Essaie « in- » devant, et écoute si le mot existe.",
      "visible → invisible. De la même façon : connu → inconnu, utile → inutile.",
      "On ajoute « in- » devant : invisible.",
    ),
    tags: ["cp", "vocabulaire", "antonyme", "methode", "qcm"],
  },

  /* =========================================================
     CP_VOC_CHAMP_LEXICAL — trousse/colle/bureau/ardoise (BO)
  ========================================================= */
  {
    kind: "template",
    id: "cp_voc_champ_lexical_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_champ_lexical",
    difficulty: 2,
    theme: "neutral",
    hint: "Trois de ces mots vivent au même endroit. Un seul est de passage.",
    tags: ["cp", "vocabulaire", "champ-lexical", "template"],
    generate: () => {
      const c = randomChoice(CHAMPS);
      return {
        text: `Quel mot ne va PAS avec les autres ?`,
        format: "qcm" as const,
        choices: shuffle([c.intrus, ...shuffle([...c.mots]).slice(0, 3)]),
        expected: [c.intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Des mots peuvent aller ensemble parce qu'ils parlent du même univers.",
          "Demande-toi : où trouve-t-on chacun de ces objets ?",
          `${c.mots.join(", ")} : tous du côté de ${c.theme}. « ${c.intrus} », non.`,
          `L'intrus est « ${c.intrus} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_voc_champ_lexical_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_champ_lexical",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche l'univers commun à tous ces mots.",
    tags: ["cp", "vocabulaire", "champ-lexical", "template"],
    generate: () => {
      const c = randomChoice(CHAMPS);
      const autres = shuffle(CHAMPS.filter((x) => x.theme !== c.theme).map((x) => x.theme)).slice(0, 3);
      return {
        text: `${shuffle([...c.mots]).join(", ")} : de quoi parlent tous ces mots ?`,
        format: "qcm" as const,
        choices: makeChoices(c.theme, autres),
        expected: [c.theme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un groupe de mots qui parlent du même univers forme ce qu'on appelle un champ lexical.",
          "Cherche l'endroit ou la situation où l'on rencontrerait tous ces mots à la fois.",
          `${c.mots.join(", ")} : tous du côté de ${c.theme}.`,
          `Ces mots parlent de ${c.theme}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_VOC_POLYSEMIE — « il tombe » / « la nuit tombe » (BO)
     ⛔ On ne nomme jamais le mot « polysémie ».
  ========================================================= */
  {
    kind: "template",
    id: "cp_voc_polysemie_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_polysemie",
    difficulty: 3,
    theme: "neutral",
    hint: "Le même mot, mais pas la même chose dans les deux phrases.",
    tags: ["cp", "vocabulaire", "plusieurs-sens", "template"],
    generate: () => {
      const m = randomChoice(DEUX_SENS);
      const deuxieme = randomChoice([true, false]);
      const phrase = deuxieme ? m.phrase2 : m.phrase1;
      const bon = deuxieme ? m.sens2 : m.sens1;
      const autres = shuffle(
        DEUX_SENS.filter((x) => x.mot !== m.mot).flatMap((x) => [x.sens1, x.sens2]),
      ).slice(0, 3);
      return {
        text: `Dans cette phrase, que veut dire « ${m.mot} » ?\n\n« ${phrase} »`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un même mot peut vouloir dire plusieurs choses. C'est la phrase qui décide laquelle.",
          "Relis toute la phrase avant de choisir : le sens se cache autour du mot.",
          `« ${m.phrase1} » et « ${m.phrase2} » : le même mot, deux choses différentes.`,
          `Ici, « ${m.mot} » veut dire ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_voc_polysemie_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_polysemie",
    difficulty: 3,
    theme: "neutral",
    text: "« Léo tombe dans la cour. » et « La nuit tombe. »\n\nLe mot « tombe » veut-il dire la même chose ?",
    format: "qcm",
    choices: [
      "Non : Léo fait une chute, la nuit arrive",
      "Oui, c'est pareil dans les deux",
      "Non : la nuit fait une chute aussi",
      "On ne peut pas savoir",
    ],
    expected: ["Non : Léo fait une chute, la nuit arrive"],
    comparator: "mcq_exact",
    hint: "Est-ce que la nuit peut se faire mal aux genoux ?",
    explanation: exp(
      "Un même mot peut avoir plusieurs sens. C'est la phrase qui dit lequel.",
      "Imagine la scène dans chaque phrase : sont-elles pareilles ?",
      "Léo, on le voit par terre. La nuit, elle, ne se cogne pas — elle arrive, tout simplement.",
      "Non : Léo fait une chute, la nuit arrive.",
    ),
    tags: ["cp", "vocabulaire", "plusieurs-sens", "piege", "qcm"],
  },

  /* =========================================================
     CP_VOC_ORDRE_ALPHABETIQUE
  ========================================================= */
  {
    kind: "template",
    id: "cp_voc_ordre_alphabetique_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_ordre_alphabetique",
    difficulty: 2,
    theme: "neutral",
    hint: "Récite l'alphabet et regarde la première lettre de chaque mot.",
    tags: ["cp", "vocabulaire", "alphabet", "template"],
    generate: () => {
      const tirage = shuffle([...MOTS_ALPHABET]).slice(0, 4);
      const premier = [...tirage].sort((x, y) => x.localeCompare(y, "fr"))[0];
      return {
        text: `Lequel de ces mots vient en PREMIER dans l'ordre alphabétique ?\n\n${tirage.join(" · ")}`,
        format: "qcm" as const,
        choices: shuffle(tirage),
        expected: [premier],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'ordre alphabétique range les mots comme les lettres de l'alphabet : a, b, c, d…",
          "Regarde la première lettre de chaque mot et récite l'alphabet jusqu'à trouver la plus proche du début.",
          `Ici la première lettre la plus proche du a, c'est celle de « ${premier} ».`,
          `Le premier est « ${premier} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_voc_ordre_alphabetique_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_ordre_alphabetique",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand deux mots commencent pareil, on compare la deuxième lettre.",
    tags: ["cp", "vocabulaire", "alphabet", "template"],
    generate: () => {
      const paires: readonly (readonly [string, string])[] = [
        ["cari", "colle"], ["mangue", "mer"], ["piton", "pomme"],
        ["lagon", "letchi"], ["bateau", "bonbon"], ["fleur", "fromage"],
        ["tamarin", "trousse"], ["souris", "sable"],
      ];
      const [x, y] = randomChoice(paires);
      const premier = [x, y].sort((a, b) => a.localeCompare(b, "fr"))[0];
      const second = premier === x ? y : x;
      return {
        text: `Dans un dictionnaire, lequel de ces deux mots vient en premier : « ${x} » ou « ${y} » ?`,
        format: "qcm" as const,
        choices: shuffle([x, y]),
        expected: [premier],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand deux mots commencent par la même lettre, on regarde la suivante.",
          "Compare lettre à lettre, de gauche à droite, jusqu'à ce qu'elles soient différentes.",
          `« ${premier} » et « ${second} » commencent pareil. C'est la lettre d'après qui décide.`,
          `« ${premier} » vient en premier.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_VOC_DICTIONNAIRE
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_voc_dictionnaire_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_dictionnaire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un dictionnaire, comment les mots sont-ils rangés ?",
    format: "qcm",
    choices: [
      "dans l'ordre alphabétique",
      "du plus court au plus long",
      "du plus facile au plus difficile",
      "dans n'importe quel ordre",
    ],
    expected: ["dans l'ordre alphabétique"],
    comparator: "mcq_exact",
    hint: "Ouvre-le au début : par quelle lettre commencent les premiers mots ?",
    explanation: exp(
      "Un dictionnaire range tous les mots dans l'ordre de l'alphabet.",
      "Pour chercher un mot, on regarde sa première lettre et on ouvre le livre à peu près là.",
      "Les mots en a sont au début, ceux en z tout à la fin. C'est ce qui permet de trouver vite.",
      "Les mots sont rangés dans l'ordre alphabétique.",
    ),
    tags: ["cp", "vocabulaire", "dictionnaire", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "cp_voc_dictionnaire_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_dictionnaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare la première lettre du mot cherché avec celle de la page.",
    tags: ["cp", "vocabulaire", "dictionnaire", "template"],
    generate: () => {
      const cherche = randomChoice(MOTS_ALPHABET);
      const page = randomChoice(MOTS_ALPHABET.filter((m) => m[0] !== cherche[0]));
      const avant = cherche.localeCompare(page, "fr") < 0;
      return {
        text: `Tu cherches « ${cherche} » dans le dictionnaire. Tu es arrivé à la page de « ${page} ». Où faut-il aller ?`,
        format: "qcm" as const,
        choices: ["vers le début du dictionnaire", "vers la fin du dictionnaire"],
        expected: [avant ? "vers le début du dictionnaire" : "vers la fin du dictionnaire"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le dictionnaire suit l'alphabet : les mots en a au début, ceux en z à la fin.",
          "Compare la première lettre du mot cherché avec celle de la page où tu es.",
          `« ${cherche} » commence par « ${cherche[0]} », « ${page} » par « ${page[0]} ». Dans l'alphabet, « ${cherche[0]} » vient ${avant ? "avant" : "après"}.`,
          `Il faut aller vers ${avant ? "le début" : "la fin"}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_VOC_DEFI
  ========================================================= */
  {
    kind: "template",
    id: "cp_voc_defi_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Fabrique d'abord le contraire, puis vérifie le sens.",
    tags: ["cp", "vocabulaire", "defi", "template"],
    generate: () => {
      const a = AFFIXES.find((x) => x.affixe === "in-") ?? AFFIXES[0];
      const [base, derive] = randomChoice(a.paires);
      const autres = shuffle(ANTONYMES.map((q) => q.b)).filter((m) => m !== derive).slice(0, 3);
      return {
        text: `Quel mot veut dire « pas ${base} » ?`,
        format: "qcm" as const,
        choices: makeChoices(derive, autres),
        expected: [derive],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certains contraires se fabriquent en ajoutant « in- » devant le mot.",
          "Colle « in- » devant, puis vérifie que le mot obtenu veut bien dire le contraire.",
          `${base} → ${derive}. « in- » retourne le sens du mot.`,
          `Le mot est « ${derive} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_voc_defi_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "cp_voc_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses à vérifier : la famille, et le sens dans la phrase.",
    tags: ["cp", "vocabulaire", "defi", "template"],
    generate: () => {
      const f = randomChoice(FAMILLES);
      const bon = f.mots[0];
      const autres = shuffle(
        FAMILLES.filter((x) => x.radical !== f.radical).map((x) => x.mots[0]),
      ).slice(0, 3);
      return {
        text: `Quel mot est de la famille de « ${f.radical} » ET désigne une action ou un métier ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux conditions à vérifier : le morceau commun, et ce que le mot désigne.",
          "Cherche d'abord les mots qui contiennent le morceau, puis regarde ce qu'ils veulent dire.",
          `« ${bon} » contient « ${f.radical} » et parle bien de ce qu'on fait.`,
          `Le mot est « ${bon} ».`,
        ),
      };
    },
  },
];
