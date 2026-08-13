// lib/tutor-v4/questionBank/4e/francais/vocabulaire.bank.ts
//
// ENRICHIR ET STRUCTURER LE LEXIQUE, EN 4e — écrit le 13/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020 — celui qui s'applique encore à la
// 4e jusqu'en septembre 2027.
//
// PÉRIMÈTRE — l'objectif « Enrichir et structurer le lexique » énumère sept
// attendus ; le coach en avait cinq micros génériques. On ouvre ce qui n'était
// nulle part :
//   « mettre en évidence les changements de catégorie syntaxique induits par la
//   dérivation (déménager / déménagement ; beau / beauté, etc.) » ;
//   « Connaître le sens des préfixes et suffixes les plus fréquents et de
//   certaines racines latines et grecques » ; « maîtriser leur classement par
//   degré d'intensité et de généralité » ; « dénotation, connotation et niveaux
//   de langue » ; « polysémie et synonymie, antonymie et homonymie » ;
//   « construction des verbes et variations de sens ».
//
// ⭐ Le programme donne LUI-MÊME ses exemples — « déménager / déménagement »,
// « beau / beauté », « Pierre lave une pomme / Pierre se lave les mains ». Ils
// sont repris tels quels dans les tables : ce sont les cas que le texte juge
// exemplaires.
//
// ⛔ QCM uniquement, quatre propositions.

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

type Cas = { readonly gauche: string; readonly droite: string };

/* =============================================================================
   1. LA DÉRIVATION CHANGE LA CLASSE DU MOT
   ---------------------------------------------------------------------------
   « déménager / déménagement ; beau / beauté » : les deux exemples du
   programme. Un suffixe ne modifie pas seulement le sens, il fait changer le
   mot de classe grammaticale — et souvent d'orthographe.
   ========================================================================== */

const DERIVATION: readonly Cas[] = [
  { gauche: "déménager → déménagement", droite: "un verbe devient un nom" },
  { gauche: "beau → beauté", droite: "un adjectif devient un nom" },
  { gauche: "lent → lentement", droite: "un adjectif devient un adverbe" },
  { gauche: "terre → terrestre", droite: "un nom devient un adjectif" },
  { gauche: "grand → grandir", droite: "un adjectif devient un verbe" },
  { gauche: "jardin → jardiner", droite: "un nom devient un verbe" },
  { gauche: "construire → construction", droite: "un verbe devient un nom" },
  { gauche: "rapide → rapidité", droite: "un adjectif devient un nom" },
  { gauche: "doux → doucement", droite: "un adjectif devient un adverbe" },
  { gauche: "montagne → montagneux", droite: "un nom devient un adjectif" },
  { gauche: "rouge → rougir", droite: "un adjectif devient un verbe" },
  { gauche: "sel → saler", droite: "un nom devient un verbe" },
  { gauche: "partir → départ", droite: "un verbe devient un nom" },
  { gauche: "franc → franchement", droite: "un adjectif devient un adverbe" },
  { gauche: "peur → peureux", droite: "un nom devient un adjectif" },
];

const TOUTES_DERIVATIONS: readonly string[] = [...new Set(DERIVATION.map((d) => d.droite))];

/* =============================================================================
   2. LES RACINES LATINES ET GRECQUES
   ---------------------------------------------------------------------------
   Deux mots par racine : reconnaitre un élément, c'est ouvrir d'un coup toute
   une famille — et souvent deviner un mot savant jamais rencontré.
   ========================================================================== */

const RACINES: readonly { readonly element: string; readonly langue: string; readonly sens: string; readonly mots: string }[] = [
  { element: "chrono-", langue: "grec", sens: "le temps", mots: "chronologie, anachronisme" },
  { element: "anthropo-", langue: "grec", sens: "l'être humain", mots: "anthropologie, philanthrope" },
  { element: "démo-", langue: "grec", sens: "le peuple", mots: "démocratie, démographie" },
  { element: "-cratie", langue: "grec", sens: "le pouvoir", mots: "démocratie, aristocratie" },
  { element: "biblio-", langue: "grec", sens: "le livre", mots: "bibliothèque, bibliographie" },
  { element: "path-", langue: "grec", sens: "la souffrance, le sentiment", mots: "sympathie, pathétique" },
  { element: "phil-", langue: "grec", sens: "l'amour, l'amitié", mots: "philosophie, francophile" },
  { element: "bene-", langue: "latin", sens: "le bien", mots: "bénéfique, bénévole" },
  { element: "mal-", langue: "latin", sens: "le mal", mots: "malveillant, malédiction" },
  { element: "voc-", langue: "latin", sens: "la voix, appeler", mots: "vocal, convoquer" },
  { element: "script-", langue: "latin", sens: "écrire", mots: "manuscrit, inscription" },
  { element: "duc-", langue: "latin", sens: "conduire, mener", mots: "conduire, éduquer" },
  { element: "spect-", langue: "latin", sens: "regarder", mots: "spectateur, inspecter" },
  { element: "-cide", langue: "latin", sens: "tuer", mots: "homicide, insecticide" },
];

const SENS_RACINES: readonly string[] = [...new Set(RACINES.map((r) => r.sens))];

/* =============================================================================
   3. INTENSITÉ ET GÉNÉRALITÉ
   ---------------------------------------------------------------------------
   « maîtriser leur classement par degré d'intensité et de généralité » : deux
   axes différents, que les élèves confondent. Le générique englobe ; l'intense
   renforce.
   ========================================================================== */

const DEGRES: readonly Cas[] = [
  { gauche: "un chien → un animal", droite: "le second est plus général : il englobe le premier" },
  { gauche: "un animal → un caniche", droite: "le second est plus particulier : il est un cas du premier" },
  { gauche: "la crainte → l'épouvante", droite: "le second est plus intense : c'est le même sentiment, en plus fort" },
  { gauche: "la fureur → l'agacement", droite: "le second est moins intense : c'est le même sentiment, atténué" },
  { gauche: "un fruit → une mangue", droite: "le second est plus particulier : il est un cas du premier" },
  { gauche: "une rose → une fleur", droite: "le second est plus général : il englobe le premier" },
  { gauche: "content → enthousiaste", droite: "le second est plus intense : c'est le même sentiment, en plus fort" },
  { gauche: "hurler → murmurer", droite: "le second est moins intense : c'est le même sentiment, atténué" },
  { gauche: "un véhicule → un camion", droite: "le second est plus particulier : il est un cas du premier" },
  { gauche: "un cyclone → un phénomène météorologique", droite: "le second est plus général : il englobe le premier" },
  { gauche: "tiède → brulant", droite: "le second est plus intense : c'est le même sentiment, en plus fort" },
  { gauche: "détester → ne pas apprécier", droite: "le second est moins intense : c'est le même sentiment, atténué" },
  { gauche: "un outil → un marteau", droite: "le second est plus particulier : il est un cas du premier" },
  { gauche: "le basilic → une plante", droite: "le second est plus général : il englobe le premier" },
];

const TOUS_DEGRES: readonly string[] = [...new Set(DEGRES.map((d) => d.droite))];

/* =============================================================================
   4. DÉNOTATION ET CONNOTATION
   ---------------------------------------------------------------------------
   Deux mots peuvent désigner exactement la même chose — c'est la dénotation —
   et ne pas dire du tout la même chose : l'un juge, l'autre non ; l'un est
   familier, l'autre soutenu. C'est la connotation.
   ========================================================================== */

const CONNOTATIONS: readonly Cas[] = [
  { gauche: "un logement → un taudis", droite: "même chose désignée, mais le second porte un jugement négatif" },
  { gauche: "une maison → une demeure", droite: "même chose désignée, mais le second porte un jugement valorisant" },
  { gauche: "une voiture → une bagnole", droite: "même chose désignée, mais le second appartient au registre familier" },
  { gauche: "un travail → un labeur", droite: "même chose désignée, mais le second appartient au registre soutenu" },
  { gauche: "un repas → une bouffe", droite: "même chose désignée, mais le second appartient au registre familier" },
  { gauche: "un chef → un tyran", droite: "même chose désignée, mais le second porte un jugement négatif" },
  { gauche: "une odeur → un parfum", droite: "même chose désignée, mais le second porte un jugement valorisant" },
  { gauche: "un cheval → un canasson", droite: "même chose désignée, mais le second porte un jugement négatif" },
  { gauche: "un livre → un ouvrage", droite: "même chose désignée, mais le second appartient au registre soutenu" },
  { gauche: "un enfant → un gamin", droite: "même chose désignée, mais le second appartient au registre familier" },
  { gauche: "une réunion → un conciliabule", droite: "même chose désignée, mais le second porte un jugement négatif" },
  { gauche: "de la nourriture → des mets", droite: "même chose désignée, mais le second appartient au registre soutenu" },
  { gauche: "un vêtement → une fringue", droite: "même chose désignée, mais le second appartient au registre familier" },
  { gauche: "un logement → un foyer", droite: "même chose désignée, mais le second porte un jugement valorisant" },
];

const TOUTES_CONNOTATIONS: readonly string[] = [...new Set(CONNOTATIONS.map((c) => c.droite))];

/* =============================================================================
   5. POLYSÉMIE, HOMONYMIE, SYNONYMIE, ANTONYMIE
   ---------------------------------------------------------------------------
   ⚠️ La confusion à défaire : polysémie et homonymie se ressemblent de loin.
   Dans la polysémie, c'est UN SEUL mot dont les sens se tiennent — le pied de
   la table est bien un pied. Dans l'homonymie, ce sont DEUX mots différents
   que le hasard a fait sonner pareil.
   ========================================================================== */

const RELATIONS: readonly Cas[] = [
  { gauche: "« la souris de l'ordinateur » et « la souris grise »", droite: "la polysémie : un seul mot, dont les sens se tiennent" },
  { gauche: "« le ver de terre » et « le verre d'eau »", droite: "l'homonymie : deux mots différents que le hasard fait sonner pareil" },
  { gauche: "« content » et « satisfait »", droite: "la synonymie : deux mots de sens très proche" },
  { gauche: "« content » et « mécontent »", droite: "l'antonymie : deux mots de sens contraire" },
  { gauche: "« le pied de la table » et « le pied du coureur »", droite: "la polysémie : un seul mot, dont les sens se tiennent" },
  { gauche: "« le mousse du bateau » et « la mousse au chocolat »", droite: "l'homonymie : deux mots différents que le hasard fait sonner pareil" },
  { gauche: "« rapide » et « lent »", droite: "l'antonymie : deux mots de sens contraire" },
  { gauche: "« débuter » et « commencer »", droite: "la synonymie : deux mots de sens très proche" },
  { gauche: "« l'aile de l'oiseau » et « l'aile du bâtiment »", droite: "la polysémie : un seul mot, dont les sens se tiennent" },
  { gauche: "« la tour du château » et « le tour de magie »", droite: "l'homonymie : deux mots différents que le hasard fait sonner pareil" },
  { gauche: "« obscur » et « lumineux »", droite: "l'antonymie : deux mots de sens contraire" },
  { gauche: "« achever » et « terminer »", droite: "la synonymie : deux mots de sens très proche" },
  { gauche: "« la bouche d'égout » et « la bouche de l'enfant »", droite: "la polysémie : un seul mot, dont les sens se tiennent" },
  { gauche: "« le pêcheur en mer » et « le pécheur repentant »", droite: "l'homonymie : deux mots différents que le hasard fait sonner pareil" },
];

const TOUTES_RELATIONS: readonly string[] = [...new Set(RELATIONS.map((r) => r.droite))];

/* =============================================================================
   6. LA CONSTRUCTION DU VERBE CHANGE SON SENS
   ---------------------------------------------------------------------------
   « construction des verbes et variations de sens » — le programme donne son
   exemple : « Pierre lave une pomme » / « Pierre se lave les mains ».
   ⚠️ PAR PAIRES : le même verbe, deux constructions, deux sens. Les deux sens
   du couple se servent de pièges l'un à l'autre.
   ========================================================================== */

const CONSTRUCTIONS: readonly { readonly phrase: string; readonly verbe: string; readonly sens: string }[] = [
  { phrase: "Il manque de sel.", verbe: "manquer", sens: "il n'y en a pas assez" },
  { phrase: "Il manque son train.", verbe: "manquer", sens: "il le rate" },
  { phrase: "Elle tient à toi.", verbe: "tenir", sens: "elle t'est attachée" },
  { phrase: "Elle tient un journal.", verbe: "tenir", sens: "elle l'écrit régulièrement" },
  { phrase: "Il joue du piano.", verbe: "jouer", sens: "il pratique cet instrument" },
  { phrase: "Il joue au football.", verbe: "jouer", sens: "il pratique ce sport" },
  { phrase: "Elle pense à toi.", verbe: "penser", sens: "tu occupes ses pensées" },
  { phrase: "Elle pense que tu as raison.", verbe: "penser", sens: "c'est son opinion" },
  { phrase: "Il use ses chaussures.", verbe: "user", sens: "il les abime à force de s'en servir" },
  { phrase: "Il use de son droit.", verbe: "user", sens: "il s'en sert" },
  { phrase: "Elle répond à la question.", verbe: "répondre", sens: "elle donne la réponse" },
  { phrase: "Elle répond de ses actes.", verbe: "répondre", sens: "elle en assume la responsabilité" },
  { phrase: "Il croit en toi.", verbe: "croire", sens: "il te fait confiance" },
  { phrase: "Il croit ce qu'on lui dit.", verbe: "croire", sens: "il le tient pour vrai" },
];

const TOUS_SENS: readonly string[] = [...new Set(CONSTRUCTIONS.map((c) => c.sens))];

function gabarit(
  id: string,
  microId: string,
  table: readonly Cas[],
  pool: readonly string[],
  question: string,
  difficulty: 2 | 3,
  hint: string,
  definition: string,
  methode: string,
  tags: readonly string[],
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "4e",
    matiere: "francais",
    notionId: "vocabulaire",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [...tags],
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `${c.gauche}\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.droite, pool),
        expected: [c.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(definition, methode, `${c.gauche} → ${c.droite}.`, `${c.droite.charAt(0).toUpperCase()}${c.droite.slice(1)}.`),
      };
    },
  };
}

export const vocabulaire4eBank: TutorBankItemV4[] = [
  gabarit(
    "4e_voc_derivation_categorie_tpl_1",
    "4e_voc_derivation_categorie",
    DERIVATION,
    TOUTES_DERIVATIONS,
    "Que change la dérivation ici ?",
    3,
    "Demande-toi devant quel mot tu pourrais mettre « le » ou « très ».",
    "Un suffixe ne change pas seulement le sens : il fait changer le mot de classe grammaticale. « Déménager » est un verbe, « déménagement » est un nom ; « beau » est un adjectif, « beauté » est un nom.",
    "Essaie de mettre chaque mot dans une phrase. Ce qui accepte un déterminant est un nom, ce qui se conjugue est un verbe, ce qui s'accorde avec un nom est un adjectif, et ce qui ne bouge jamais est un adverbe.",
    ["4e", "vocabulaire", "derivation", "template"],
  ),
  {
    kind: "template",
    id: "4e_voc_racines_tpl_1",
    niveau: "4e",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "4e_voc_racines",
    difficulty: 3,
    theme: "neutral",
    hint: "Les deux mots donnés partagent cet élément. Que peuvent-ils avoir en commun ?",
    tags: ["4e", "vocabulaire", "etymologie", "template"],
    generate: () => {
      const r = randomChoice(RACINES);
      return {
        text: `L'élément « ${r.element} » vient du ${r.langue}. On le retrouve dans ${r.mots}.\n\nQue signifie-t-il ?`,
        format: "qcm" as const,
        choices: makeChoices(r.sens, SENS_RACINES),
        expected: [r.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une grande partie du vocabulaire savant vient du latin et du grec. Reconnaitre un élément ancien ouvre d'un coup toute une famille de mots — et permet souvent de deviner le sens d'un mot rencontré pour la première fois.",
          "Prends les deux mots donnés et cherche ce qu'ils ont en commun. Ce point commun est le sens de la racine.",
          `${r.mots} : dans les deux, « ${r.element} » signifie ${r.sens}.`,
          `Il signifie ${r.sens}.`,
        ),
      };
    },
  },
  gabarit(
    "4e_voc_intensite_generalite_tpl_1",
    "4e_voc_intensite_generalite",
    DEGRES,
    TOUS_DEGRES,
    "Comment le second mot se situe-t-il par rapport au premier ?",
    3,
    "Deux axes différents : englober n'est pas renforcer.",
    "Deux mots peuvent se classer de deux façons : par la GÉNÉRALITÉ — l'un englobe l'autre, comme « animal » englobe « chien » — ou par l'INTENSITÉ — c'est le même sens, mais plus ou moins fort, comme « crainte » et « épouvante ».",
    "Demande-toi si l'un est un cas de l'autre : alors c'est la généralité. Si les deux désignent la même chose à un degré différent, c'est l'intensité.",
    ["4e", "vocabulaire", "generique", "intensite", "template"],
  ),
  gabarit(
    "4e_voc_denotation_connotation_tpl_1",
    "4e_voc_denotation_connotation",
    CONNOTATIONS,
    TOUTES_CONNOTATIONS,
    "Qu'est-ce qui change entre les deux mots ?",
    3,
    "Ils désignent la même chose. Ce n'est donc pas le sens qui change.",
    "La dénotation est ce qu'un mot désigne — le dictionnaire la donne, et elle est la même pour tous. La connotation est ce qu'il suggère en plus : un jugement, ou l'appartenance à un registre. « Un logement » et « un taudis » désignent la même chose ; ils ne disent pas la même chose.",
    "Vérifie d'abord que les deux mots désignent bien la même réalité. Puis demande-toi si le second juge — en bien ou en mal — ou s'il change seulement de niveau de langue.",
    ["4e", "vocabulaire", "connotation", "registres", "template"],
  ),
  gabarit(
    "4e_voc_homonymie_polysemie_tpl_1",
    "4e_voc_homonymie_polysemie",
    RELATIONS,
    TOUTES_RELATIONS,
    "Quelle relation ces deux emplois entretiennent-ils ?",
    3,
    "Un seul mot à plusieurs sens, ou deux mots qui se ressemblent ?",
    "La polysémie, c'est un seul mot dont les sens se tiennent : le pied de la table est bien un pied. L'homonymie, ce sont deux mots différents que le hasard fait sonner ou s'écrire pareil : le ver et le verre n'ont rien à voir. La synonymie rapproche, l'antonymie oppose.",
    "Demande-toi si un lien de sens relie les deux emplois. S'il y en a un — même lointain, même imagé —, c'est la polysémie. S'il n'y en a aucun, c'est l'homonymie.",
    ["4e", "vocabulaire", "polysemie", "homonymie", "template"],
  ),
  {
    kind: "template",
    id: "4e_voc_construction_verbe_tpl_1",
    niveau: "4e",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "4e_voc_construction_verbe",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde la préposition, ou son absence : c'est elle qui décide du sens.",
    tags: ["4e", "vocabulaire", "construction-verbe", "template"],
    generate: () => {
      const c = randomChoice(CONSTRUCTIONS);
      // ⚠️ L'autre emploi du MÊME verbe est forcé parmi les propositions :
      // c'est le seul piège qui oblige à regarder la construction. Tiré au
      // hasard, il ne sortirait qu'une fois sur cinq.
      const jumeau = CONSTRUCTIONS.find((x) => x.verbe === c.verbe && x.sens !== c.sens);
      const autres = shuffle(TOUS_SENS.filter((s) => s !== c.sens && s !== jumeau?.sens)).slice(0, 2);
      return {
        text: `« ${c.phrase} »\n\nQue signifie « ${c.verbe} » ici ?`,
        format: "qcm" as const,
        choices: shuffle([c.sens, ...(jumeau ? [jumeau.sens] : []), ...autres]),
        expected: [c.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un même verbe change de sens selon sa construction. Le programme donne son exemple : « Pierre lave une pomme » et « Pierre se lave les mains » n'emploient pas le verbe de la même façon. La préposition — ou son absence — décide.",
          "Regarde ce qui suit le verbe : un complément direct, ou une préposition ? « Jouer du piano » et « jouer au football » ne se construisent pas pareil, et ne veulent pas dire la même chose.",
          `Dans « ${c.phrase} », « ${c.verbe} » signifie ${c.sens}.`,
          `Il signifie ${c.sens}.`,
        ),
      };
    },
  },
];
