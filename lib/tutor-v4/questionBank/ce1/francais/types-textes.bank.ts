// lib/tutor-v4/questionBank/ce1/francais/types-textes.bank.ts
//
// Les types de textes au CE1, écrits à la main. Cinq micro-compétences.
//
// CE QU'ELLE REMPLACE : DEUX énoncés figés pour cinq micro-compétences — « Un
// texte qui raconte une histoire avec des personnages est un texte… » et
// « Quelle caractéristique appartient au texte poétique ? ». Aucun vrai texte
// n'était montré : on demandait la définition, jamais la reconnaissance. Et
// l'explication du second contenait deux mots anglais, « organize » et
// « sonorities ».
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Lire et comprendre en autonomie un texte narratif, informatif ou
//     PRESCRIPTIF d'une quinzaine de lignes ».
//
// Le texte PRESCRIPTIF est la nouveauté du CE1 : la recette, la règle du jeu,
// la notice. Il ne raconte pas et n'explique pas — il dit quoi faire, dans
// l'ordre, et ses verbes sont à l'impératif ou à l'infinitif.
//
// ⚠️ ON MONTRE LE TEXTE, TOUJOURS. Reconnaitre un type de texte, ce n'est pas
// réciter une définition : c'est repérer des indices dans ce qu'on a sous les
// yeux. Chaque texte de ce corpus porte donc ses marqueurs, écrits à côté.

import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";

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

type TypeTexte = "narratif" | "documentaire" | "prescriptif" | "poétique";

const ETIQUETTES: Record<TypeTexte, string> = {
  narratif: "un texte qui raconte une histoire",
  documentaire: "un texte qui explique et donne des informations",
  prescriptif: "un texte qui dit quoi faire",
  poétique: "un poème",
};

const NOMS: Record<TypeTexte, string> = {
  narratif: "narratif",
  documentaire: "documentaire",
  prescriptif: "prescriptif",
  poétique: "poétique",
};

type Extrait = {
  readonly type: TypeTexte;
  readonly texte: string;
  /** L'indice qui permet de reconnaitre le type dans CE texte-là. */
  readonly indice: string;
  readonly ou: string;
};

const EXTRAITS: readonly Extrait[] = [
  {
    type: "narratif",
    texte: "Ce matin-là, Léa poussa la porte de la case sans faire de bruit. Le margouillat dormait encore sur le mur. Elle prit son panier et sortit dans le jardin mouillé.",
    indice: "des personnages, un lieu, et des choses qui arrivent l'une après l'autre",
    ou: "dans un roman ou un album",
  },
  {
    type: "narratif",
    texte: "Le bateau quitta le port au lever du jour. Yann rama longtemps, puis posa ses filets. Une heure plus tard, il les remonta, lourds et pleins.",
    indice: "un personnage qui agit, et des évènements qui se suivent",
    ou: "dans un livre d'histoires",
  },
  {
    type: "narratif",
    texte: "Karim traça la marelle à la craie. Trois camarades attendaient déjà. Le jeu commença, et la cloche sonna bien trop tôt.",
    indice: "quelqu'un fait quelque chose, et l'histoire avance",
    ou: "dans un recueil de récits",
  },
  {
    type: "documentaire",
    texte: "Le margouillat est un petit lézard des maisons. Il mesure une dizaine de centimètres. Ses pattes portent de minuscules lamelles qui lui permettent de grimper aux murs lisses.",
    indice: "on donne des informations vraies sur un animal, sans raconter d'histoire",
    ou: "dans un documentaire ou une encyclopédie",
  },
  {
    type: "documentaire",
    texte: "Un cyclone se forme au-dessus de la mer chaude. Il tourne sur lui-même et avance lentement. La saison des cyclones dure de novembre à avril.",
    indice: "des faits et des chiffres, au présent, sans personnage",
    ou: "dans un livre de sciences",
  },
  {
    type: "documentaire",
    texte: "La mangue est le fruit du manguier. Ses fleurs apparaissent à la fin de l'hiver. Un manguier adulte peut porter plusieurs centaines de fruits.",
    indice: "on explique comment ça marche, pas ce qui est arrivé à quelqu'un",
    ou: "dans un livre sur les plantes",
  },
  {
    type: "prescriptif",
    texte: "Épluche deux mangues. Coupe-les en morceaux. Mets-les dans un saladier. Ajoute un peu de sucre et mélange doucement.",
    indice: "des verbes qui donnent des ordres, et des étapes dans l'ordre",
    ou: "dans un livre de recettes",
  },
  {
    type: "prescriptif",
    texte: "Placez les pions sur la première ligne. Chaque joueur lance le dé à son tour. Le premier arrivé à la case d'arrivée a gagné.",
    indice: "on t'explique quoi faire, étape par étape",
    ou: "dans une règle du jeu",
  },
  {
    type: "prescriptif",
    texte: "Ouvrir la boite avec précaution. Sortir les six pièces. Emboiter la pièce A dans la pièce B, puis serrer la vis.",
    indice: "des verbes à l'infinitif, et une action après l'autre",
    ou: "dans une notice de montage",
  },
  {
    type: "prescriptif",
    texte: "Range ton cartable. Mets ton cahier rouge sur la table. Écris la date en haut de la page, puis lève la main.",
    indice: "on te dit ce que tu dois faire, sans raconter ni expliquer",
    ou: "dans une consigne de classe",
  },
  {
    type: "poétique",
    texte: "Le vent du soir descend du piton,\nIl siffle entre les tamarins,\nEt pose sur nos toits de tôle\nUne chanson qui n'a pas de fin.",
    indice: "des lignes courtes qui vont à la ligne, et des sons qui se répondent",
    ou: "dans un recueil de poèmes",
  },
  {
    type: "poétique",
    texte: "Petite pluie du matin clair,\nTu laves les feuilles et la terre,\nTu remplis la ravine en riant,\nPuis tu repars avec le vent.",
    indice: "des vers, une rime, et des images",
    ou: "dans un poème",
  },
  {
    type: "poétique",
    texte: "Margouillat, margouillat,\nQui te cache derrière le cadre ?\nDis-moi donc combien de pas\nIl te faut pour traverser l'âtre.",
    indice: "la disposition en lignes courtes et les rimes",
    ou: "dans une comptine ou un poème",
  },
  {
    type: "narratif",
    texte: "Nina retourna son vélo sur la varangue. Elle desserra l'écrou, trouva le trou, et colla une rustine. Le lendemain, elle arriva la première à l'école.",
    indice: "quelqu'un fait quelque chose, et le temps passe d'une phrase à l'autre",
    ou: "dans un livre d'histoires",
  },
  {
    type: "narratif",
    texte: "À la nuit tombée, la tortue sortit de l'eau. Elle remonta le sable, creusa longtemps, puis redescendit vers les vagues. Au matin, il ne restait que deux traces.",
    indice: "une suite d'actions, dans l'ordre où elles arrivent",
    ou: "dans un récit",
  },
  {
    type: "documentaire",
    texte: "Le paille-en-queue est un oiseau blanc au bec rouge. Il niche dans les falaises et passe sa vie au-dessus de la mer. Il ne pond qu'un seul œuf.",
    indice: "des informations vraies sur une espèce, sans personnage ni histoire",
    ou: "dans un documentaire sur les animaux",
  },
  {
    type: "documentaire",
    texte: "Une ravine se creuse quand l'eau de pluie emporte la terre d'une pente. Au fond, l'eau ne coule qu'après les grosses averses. Le reste du temps, elle est sèche.",
    indice: "on explique un phénomène, au présent, sans personnage",
    ou: "dans un livre de géographie",
  },
  {
    type: "prescriptif",
    texte: "Verse la farine dans un saladier. Casse deux œufs par-dessus. Mélange jusqu'à ce que la pâte soit lisse. Laisse reposer une heure.",
    indice: "chaque phrase commence par un ordre, et les étapes se suivent",
    ou: "dans un livre de recettes",
  },
  {
    type: "prescriptif",
    texte: "Avant le cyclone : fermer les volets. Remplir des bouteilles d'eau. Ranger tout ce qui traine dehors. Écouter la radio.",
    indice: "des verbes à l'infinitif, et une liste de choses à faire",
    ou: "dans une consigne de sécurité",
  },
  {
    type: "poétique",
    texte: "La ravine chante après la pluie,\nElle roule ses cailloux ronds,\nElle emporte la terre et l'ombre,\nEt s'endort au fond du vallon.",
    indice: "des vers, des rimes, et des images",
    ou: "dans un recueil de poèmes",
  },
  {
    type: "poétique",
    texte: "Un letchi rouge sur la branche,\nDeux letchis rouges dans ma main,\nTrois letchis rouges dans ma bouche,\nEt plus rien du tout demain.",
    indice: "des lignes courtes qui se répètent, et une rime à la fin",
    ou: "dans une comptine",
  },
];

const MARQUEURS: readonly { readonly type: TypeTexte; readonly marqueur: string }[] = [
  { type: "narratif", marqueur: "des personnages et des évènements qui se suivent" },
  { type: "documentaire", marqueur: "des informations vraies, souvent avec des chiffres" },
  { type: "prescriptif", marqueur: "des verbes qui disent quoi faire, dans l'ordre" },
  { type: "poétique", marqueur: "des vers, des rimes et une disposition en lignes courtes" },
];

/* ── Les trois gabarits, fabriqués une fois et posés quatre fois ─────────────
   Le corps des questions est écrit ici ; les douze items eux-mêmes sont
   déroulés plus bas, un par un.

   ⚠️ POURQUOI DÉROULÉS, ET PAS ENGENDRÉS PAR UNE BOUCLE. La première écriture
   les fabriquait dans un `.flatMap()`, en passant l'identifiant de la
   micro-compétence par une VARIABLE. `scripts/verifier-banque.mjs` lit le
   SOURCE et compte les identifiants écrits en toutes lettres, entre
   guillemets : il trouvait sept items pour quatre identifiants, concluait à
   une « mise en forme inattendue » et SAUTAIT LE FICHIER ENTIER. Un fichier
   qu'aucun contrôle ne lit vaut moins qu'un fichier verbeux.
   ⛔ Ne pas écrire le motif que ce script compte à l'intérieur d'un
   commentaire : il le compterait aussi. */

function choisirLeTexte(cible: TypeTexte): TutorGeneratedQuestionV4 {
  const bon = randomChoice(EXTRAITS.filter((e) => e.type === cible));
  const autres = shuffle(EXTRAITS.filter((e) => e.type !== cible))
    .slice(0, 3)
    .map((e) => e.texte);
  return {
    text: `Lequel de ces textes est ${ETIQUETTES[cible]} ?`,
    format: "qcm",
    choices: makeChoices(bon.texte, autres),
    expected: [bon.texte],
    comparator: "mcq_exact",
    explanation: exp(
      `Un texte ${NOMS[cible]} se reconnait à ses indices : ${MARQUEURS.find((m) => m.type === cible)?.marqueur}.`,
      "Lis les premières lignes et demande-toi : est-ce qu'on me raconte, qu'on m'explique, qu'on me dit de faire, ou qu'on me fait entendre des sons ?",
      `Dans le bon texte, on trouve ${bon.indice}. On le rencontre ${bon.ou}.`,
      `Le texte ${NOMS[cible]} est celui qui commence par « ${bon.texte.split(" ").slice(0, 5).join(" ")}… »`,
    ),
  };
}

function nommerLeType(cible: TypeTexte): TutorGeneratedQuestionV4 {
  const e = randomChoice(EXTRAITS.filter((x) => x.type === cible));
  return {
    text: `Lis ce texte :\n\n« ${e.texte} »\n\nDe quel type de texte s'agit-il ?`,
    format: "qcm",
    choices: shuffle(Object.values(ETIQUETTES)),
    expected: [ETIQUETTES[e.type]],
    comparator: "mcq_exact",
    explanation: exp(
      "Quatre types de textes se croisent au CE1 : celui qui raconte, celui qui explique, celui qui dit quoi faire, et le poème.",
      "Cherche les indices : des personnages ? des chiffres ? des ordres ? des lignes courtes qui riment ?",
      `Ici, on trouve ${e.indice}. C'est donc ${ETIQUETTES[e.type]}, comme on en lit ${e.ou}.`,
      `C'est ${ETIQUETTES[e.type]}.`,
    ),
  };
}

function ouOnLeLit(cible: TypeTexte): TutorGeneratedQuestionV4 {
  const e = randomChoice(EXTRAITS.filter((x) => x.type === cible));
  const autres = shuffle([
    ...new Set(EXTRAITS.filter((x) => x.type !== e.type).map((x) => x.ou)),
  ]).slice(0, 3);
  return {
    text: `Lis ce texte :\n\n« ${e.texte} »\n\nOù rencontre-t-on ce genre de texte ?`,
    format: "qcm",
    choices: makeChoices(e.ou, autres),
    expected: [e.ou],
    comparator: "mcq_exact",
    explanation: exp(
      "Chaque type de texte a ses endroits à lui : le récit dans les albums, le documentaire dans les encyclopédies, la consigne dans les recettes et les notices, le poème dans les recueils.",
      "Repère d'abord ce que fait le texte, puis demande-toi dans quel livre on le trouverait.",
      `Ce texte donne ${e.indice}. On le lit ${e.ou}.`,
      `On rencontre ce texte ${e.ou}.`,
    ),
  };
}

export const typesTextesBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_TYPE_NARRATIF · DOCUMENTAIRE · PRESCRIPTIF · POÉTIQUE
     Un gabarit de reconnaissance par type, sur de VRAIS textes.
  ========================================================= */
  {
    kind: "template",
    id: "ce1_type_narratif_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_narratif",
    difficulty: 2,
    theme: "reunion",
    hint: "Ne devine pas : cherche les indices dans le texte que tu as sous les yeux.",
    tags: ["ce1", "types-textes", "narratif", "template"],
    generate: () => choisirLeTexte("narratif"),
  },
  {
    kind: "template",
    id: "ce1_type_narratif_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_narratif",
    difficulty: 3,
    theme: "reunion",
    hint: "Demande-toi ce que le texte veut de toi : te raconter, t'expliquer, te faire faire, ou te faire entendre.",
    tags: ["ce1", "types-textes", "narratif", "template"],
    generate: () => nommerLeType("narratif"),
  },
  {
    kind: "template",
    id: "ce1_type_narratif_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_narratif",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque type de texte se lit à un endroit différent.",
    tags: ["ce1", "types-textes", "narratif", "template"],
    generate: () => ouOnLeLit("narratif"),
  },
  {
    kind: "template",
    id: "ce1_type_documentaire_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_documentaire",
    difficulty: 2,
    theme: "reunion",
    hint: "Ne devine pas : cherche les indices dans le texte que tu as sous les yeux.",
    tags: ["ce1", "types-textes", "documentaire", "template"],
    generate: () => choisirLeTexte("documentaire"),
  },
  {
    kind: "template",
    id: "ce1_type_documentaire_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_documentaire",
    difficulty: 3,
    theme: "reunion",
    hint: "Demande-toi ce que le texte veut de toi : te raconter, t'expliquer, te faire faire, ou te faire entendre.",
    tags: ["ce1", "types-textes", "documentaire", "template"],
    generate: () => nommerLeType("documentaire"),
  },
  {
    kind: "template",
    id: "ce1_type_documentaire_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_documentaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque type de texte se lit à un endroit différent.",
    tags: ["ce1", "types-textes", "documentaire", "template"],
    generate: () => ouOnLeLit("documentaire"),
  },
  {
    kind: "template",
    id: "ce1_type_prescriptif_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_prescriptif",
    difficulty: 2,
    theme: "reunion",
    hint: "Ne devine pas : cherche les indices dans le texte que tu as sous les yeux.",
    tags: ["ce1", "types-textes", "prescriptif", "template"],
    generate: () => choisirLeTexte("prescriptif"),
  },
  {
    kind: "template",
    id: "ce1_type_prescriptif_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_prescriptif",
    difficulty: 3,
    theme: "reunion",
    hint: "Demande-toi ce que le texte veut de toi : te raconter, t'expliquer, te faire faire, ou te faire entendre.",
    tags: ["ce1", "types-textes", "prescriptif", "template"],
    generate: () => nommerLeType("prescriptif"),
  },
  {
    kind: "template",
    id: "ce1_type_prescriptif_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_prescriptif",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque type de texte se lit à un endroit différent.",
    tags: ["ce1", "types-textes", "prescriptif", "template"],
    generate: () => ouOnLeLit("prescriptif"),
  },
  {
    kind: "template",
    id: "ce1_type_poetique_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_poetique",
    difficulty: 2,
    theme: "reunion",
    hint: "Ne devine pas : cherche les indices dans le texte que tu as sous les yeux.",
    tags: ["ce1", "types-textes", "poétique", "template"],
    generate: () => choisirLeTexte("poétique"),
  },
  {
    kind: "template",
    id: "ce1_type_poetique_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_poetique",
    difficulty: 3,
    theme: "reunion",
    hint: "Demande-toi ce que le texte veut de toi : te raconter, t'expliquer, te faire faire, ou te faire entendre.",
    tags: ["ce1", "types-textes", "poétique", "template"],
    generate: () => nommerLeType("poétique"),
  },
  {
    kind: "template",
    id: "ce1_type_poetique_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_poetique",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque type de texte se lit à un endroit différent.",
    tags: ["ce1", "types-textes", "poétique", "template"],
    generate: () => ouOnLeLit("poétique"),
  },
  {
    kind: "fixed",
    id: "ce1_type_prescriptif_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_prescriptif",
    difficulty: 3,
    theme: "neutral",
    text: "« Épluche deux mangues. Coupe-les en morceaux. Ajoute un peu de sucre. »\n\nÀ quoi reconnait-on qu'un texte dit quoi faire ?",
    format: "qcm",
    choices: [
      "Les verbes donnent des ordres, et les actions sont dans l'ordre",
      "Il y a des personnages et une histoire",
      "Il y a des rimes",
      "Il donne des dates et des chiffres",
    ],
    expected: ["Les verbes donnent des ordres, et les actions sont dans l'ordre"],
    comparator: "mcq_exact",
    hint: "Regarde le premier mot de chaque phrase.",
    explanation: exp(
      "Un texte prescriptif dit quoi faire : recette, règle du jeu, notice, consigne.",
      "Regarde les verbes : ils commencent souvent les phrases et s'adressent directement à toi.",
      "Épluche, coupe, ajoute : chaque phrase commence par un ordre, et l'ordre des phrases compte — on ne coupe pas avant d'éplucher.",
      "Les verbes donnent des ordres, et les actions sont dans l'ordre.",
    ),
    tags: ["ce1", "types-textes", "prescriptif", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_type_poetique_tpl_4",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_poetique",
    difficulty: 2,
    theme: "neutral",
    hint: "Un poème se voit avant de se lire : regarde la forme des lignes.",
    tags: ["ce1", "types-textes", "poetique", "template"],
    generate: () => {
      const m = randomChoice(MARQUEURS);
      const autres = MARQUEURS.filter((x) => x.type !== m.type).map((x) => x.marqueur);
      return {
        text: `À quoi reconnait-on un texte ${NOMS[m.type]} ?`,
        format: "qcm" as const,
        choices: makeChoices(m.marqueur, autres),
        expected: [m.marqueur],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque type de texte porte des marques qui se voient dès le premier coup d'œil.",
          "Avant même de lire, regarde la forme : des lignes courtes ? des étapes ? un long récit ?",
          `Un texte ${NOMS[m.type]} porte ${m.marqueur}.`,
          `On le reconnait à : ${m.marqueur}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_TYPE_DEFI
  ========================================================= */
  {
    kind: "template",
    id: "ce1_type_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Deux choses : le type du texte, et l'indice qui te l'a fait trouver.",
    tags: ["ce1", "types-textes", "defi", "template"],
    generate: () => {
      const e = randomChoice(EXTRAITS);
      const autre = randomChoice(EXTRAITS.filter((x) => x.type !== e.type));
      const bon = `${ETIQUETTES[e.type]}, parce qu'on y trouve ${e.indice}`;
      return {
        text: `Lis ce texte :\n\n« ${e.texte} »\n\nQuelle réponse est entièrement juste ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `${ETIQUETTES[e.type]}, parce qu'on y trouve ${autre.indice}`,
          `${ETIQUETTES[autre.type]}, parce qu'on y trouve ${e.indice}`,
          `${ETIQUETTES[autre.type]}, parce qu'on y trouve ${autre.indice}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une réponse n'est juste que si les deux moitiés le sont : le type du texte, ET la raison.",
          "Trouve d'abord le type, puis vérifie que l'indice cité se trouve vraiment dans le texte.",
          `Ce texte est ${ETIQUETTES[e.type]}, et l'indice est bien ${e.indice}. On le lit ${e.ou}.`,
          `La réponse juste est : ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_type_defi_meth_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce1_type_defi",
    difficulty: 3,
    theme: "neutral",
    text: "« Épluche deux mangues. Coupe-les en morceaux. Ajoute un peu de sucre. »\n\nCe texte n'est ni une histoire, ni un poème. Comment l'as-tu vu ?",
    format: "qcm",
    choices: [
      "Les phrases commencent par des verbes qui disent quoi faire, et les étapes se suivent dans un ordre.",
      // LE piège de la notion : le sujet du texte ne donne pas son type.
      "Parce qu'il parle de nourriture.",
      "Parce qu'il n'y a pas de personnage.",
      "Parce qu'il est court.",
    ],
    expected: [
      "Les phrases commencent par des verbes qui disent quoi faire, et les étapes se suivent dans un ordre.",
    ],
    comparator: "mcq_exact",
    hint: "Regarde le premier mot de chaque phrase.",
    explanation: exp(
      "Un texte prescriptif ne raconte pas et n'explique pas : il dit quoi faire, dans l'ordre.",
      "Regarde les verbes du début de phrase : ils s'adressent directement à toi.",
      "Épluche, coupe, ajoute : ce sont des ordres. Et l'ordre des phrases compte — on n'ajoute pas le sucre avant d'éplucher.",
      "Les phrases commencent par des verbes qui disent quoi faire, et les étapes se suivent dans un ordre.",
    ),
    tags: ["ce1", "types-textes", "defi", "methode", "qcm"],
  },
];
