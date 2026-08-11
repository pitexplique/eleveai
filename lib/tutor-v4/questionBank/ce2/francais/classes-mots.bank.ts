// lib/tutor-v4/questionBank/ce2/francais/classes-mots.bank.ts
//
// Les classes de mots du CE2, écrites à la main.
//
// CE QU'ELLE REMPLACE : six micro-compétences sur dix recevaient LA MÊME
// question — « Quel mot est un nom commun ? » — que l'enfant cherche le
// déterminant, l'adjectif, le verbe, le pronom ou l'adverbe. Le repli aiguille
// sur la NOTION, jamais sur la micro-compétence : dix cases du coach, une seule
// question derrière.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, CE2) : SEPT classes de mots, l'adverbe
// compris — « le nom, le déterminant, l'adjectif, le verbe, le pronom personnel
// sujet, l'adverbe et les mots invariables ». L'adverbe entre au CE2 ; il
// n'était nulle part dans le coach.
//
// ⛔ PAS de fonction de l'adjectif : le BO écrit « sans que cette notion soit
// enseignée ». On identifie l'adjectif, on ne dit pas s'il est épithète.
//
// LE PIÈGE DE LA NOTION : la majuscule. « Le margouillat dort. » commence par
// une majuscule, et « Le » n'est pas un nom propre pour autant. L'enfant qui
// cherche la majuscule trouve toujours le premier mot de la phrase.
//
// ⚠️ AUCUN GROUPE NOMINAL N'EST RECOMPOSÉ. Coller un déterminant, un adjectif
// et un nom au hasard donne « une mûre mangue » et « le bleu lagon » — proposés
// comme la BONNE réponse, et aucun script ne l'attrape : la question est bien
// formée, elle est juste fausse. Les phrases sont donc écrites en toutes
// lettres, une par une, et chaque mot y est étiqueté à la main.
//
// ⚠️ UNE SEULE BONNE RÉPONSE. Une phrase contient souvent deux déterminants ou
// deux noms. Les distracteurs sont donc pris dans les AUTRES classes de la même
// phrase, jamais dans la même : sinon l'élève a deux bonnes réponses sous les
// yeux et se fait corriger d'avoir eu raison.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function choix(correct: string, ...reserves: readonly (readonly string[])[]): string[] {
  const vus = new Set<string>([correct]);
  const faux: string[] = [];
  for (const mot of shuffle(reserves.flat())) {
    if (vus.has(mot)) continue;
    vus.add(mot);
    faux.push(mot);
    if (faux.length === 3) break;
  }
  return shuffle([correct, ...faux]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   LES PHRASES ÉTIQUETÉES

   Chaque phrase est écrite en entier, puis découpée à la main. C'est plus long
   qu'un générateur de groupes nominaux, et c'est le seul moyen d'être sûr que
   « une mangue mûre » ne devienne jamais « une mûre mangue ».
   ═══════════════════════════════════════════════════════════════════════════ */

type Classe = "determinant" | "nom" | "adjectif" | "verbe" | "pronom" | "adverbe";

type PhraseAnalysee = {
  readonly phrase: string;
  readonly determinants: readonly string[];
  readonly noms: readonly string[];
  readonly adjectifs: readonly string[];
  readonly verbe: string;
  readonly infinitif: string;
  readonly pronoms: readonly string[];
  readonly adverbes: readonly string[];
};

const PHRASES: readonly PhraseAnalysee[] = [
  {
    phrase: "Les enfants ramassent doucement les letchis mûrs.",
    determinants: ["Les", "les"],
    noms: ["enfants", "letchis"],
    adjectifs: ["mûrs"],
    verbe: "ramassent",
    infinitif: "ramasser",
    pronoms: [],
    adverbes: ["doucement"],
  },
  {
    phrase: "Elle grimpe vite sur le grand tamarin.",
    determinants: ["le"],
    noms: ["tamarin"],
    adjectifs: ["grand"],
    verbe: "grimpe",
    infinitif: "grimper",
    pronoms: ["Elle"],
    adverbes: ["vite"],
  },
  {
    phrase: "Nous regardons souvent les bateaux colorés.",
    determinants: ["les"],
    noms: ["bateaux"],
    adjectifs: ["colorés"],
    verbe: "regardons",
    infinitif: "regarder",
    pronoms: ["Nous"],
    adverbes: ["souvent"],
  },
  {
    phrase: "Le pêcheur range soigneusement ses filets lourds.",
    determinants: ["Le", "ses"],
    noms: ["pêcheur", "filets"],
    adjectifs: ["lourds"],
    verbe: "range",
    infinitif: "ranger",
    pronoms: [],
    adverbes: ["soigneusement"],
  },
  {
    phrase: "Tu écoutes toujours la maitresse avec attention.",
    determinants: ["la"],
    noms: ["maitresse", "attention"],
    adjectifs: [],
    verbe: "écoutes",
    infinitif: "écouter",
    pronoms: ["Tu"],
    adverbes: ["toujours"],
  },
  {
    phrase: "Un margouillat file rapidement entre les pierres chaudes.",
    determinants: ["Un", "les"],
    noms: ["margouillat", "pierres"],
    adjectifs: ["chaudes"],
    verbe: "file",
    infinitif: "filer",
    pronoms: [],
    adverbes: ["rapidement"],
  },
  {
    phrase: "Vous préparez tranquillement un cari délicieux.",
    determinants: ["un"],
    noms: ["cari"],
    adjectifs: ["délicieux"],
    verbe: "préparez",
    infinitif: "préparer",
    pronoms: ["Vous"],
    adverbes: ["tranquillement"],
  },
  {
    phrase: "Ils traversent prudemment la route étroite.",
    determinants: ["la"],
    noms: ["route"],
    adjectifs: ["étroite"],
    verbe: "traversent",
    infinitif: "traverser",
    pronoms: ["Ils"],
    adverbes: ["prudemment"],
  },
  {
    phrase: "Ma sœur dessine joliment une case créole.",
    determinants: ["Ma", "une"],
    noms: ["sœur", "case"],
    adjectifs: ["créole"],
    verbe: "dessine",
    infinitif: "dessiner",
    pronoms: [],
    adverbes: ["joliment"],
  },
  {
    phrase: "Le vent souffle fort sur le piton nuageux.",
    determinants: ["Le", "le"],
    noms: ["vent", "piton"],
    adjectifs: ["nuageux"],
    verbe: "souffle",
    infinitif: "souffler",
    pronoms: [],
    adverbes: ["fort"],
  },
  {
    phrase: "On entend parfois les vagues bruyantes.",
    determinants: ["les"],
    noms: ["vagues"],
    adjectifs: ["bruyantes"],
    verbe: "entend",
    infinitif: "entendre",
    pronoms: ["On"],
    adverbes: ["parfois"],
  },
  {
    phrase: "Je range maintenant mon cartable neuf.",
    determinants: ["mon"],
    noms: ["cartable"],
    adjectifs: ["neuf"],
    verbe: "range",
    infinitif: "ranger",
    pronoms: ["Je"],
    adverbes: ["maintenant"],
  },
  {
    phrase: "Mamie prépare lentement un gâteau sucré.",
    determinants: ["un"],
    noms: ["gâteau"],
    adjectifs: ["sucré"],
    verbe: "prépare",
    infinitif: "préparer",
    pronoms: [],
    adverbes: ["lentement"],
  },
  {
    phrase: "Les touristes montent difficilement le sentier raide.",
    determinants: ["Les", "le"],
    noms: ["touristes", "sentier"],
    adjectifs: ["raide"],
    verbe: "montent",
    infinitif: "monter",
    pronoms: [],
    adverbes: ["difficilement"],
  },
  {
    phrase: "Elles chantent gaiement une chanson connue.",
    determinants: ["une"],
    noms: ["chanson"],
    adjectifs: ["connue"],
    verbe: "chantent",
    infinitif: "chanter",
    pronoms: ["Elles"],
    adverbes: ["gaiement"],
  },
  {
    phrase: "Mon cousin arrose régulièrement les plantes vertes.",
    determinants: ["Mon", "les"],
    noms: ["cousin", "plantes"],
    adjectifs: ["vertes"],
    verbe: "arrose",
    infinitif: "arroser",
    pronoms: [],
    adverbes: ["régulièrement"],
  },
  {
    phrase: "Il ferme brusquement la porte lourde.",
    determinants: ["la"],
    noms: ["porte"],
    adjectifs: ["lourde"],
    verbe: "ferme",
    infinitif: "fermer",
    pronoms: ["Il"],
    adverbes: ["brusquement"],
  },
  {
    phrase: "Le maitre explique clairement la nouvelle leçon.",
    determinants: ["Le", "la"],
    noms: ["maitre", "leçon"],
    adjectifs: ["nouvelle"],
    verbe: "explique",
    infinitif: "expliquer",
    pronoms: [],
    adverbes: ["clairement"],
  },
  {
    phrase: "Nous marchons longuement sous un soleil brulant.",
    determinants: ["un"],
    noms: ["soleil"],
    adjectifs: ["brulant"],
    verbe: "marchons",
    infinitif: "marcher",
    pronoms: ["Nous"],
    adverbes: ["longuement"],
  },
  {
    phrase: "Ces mangues tombent souvent dans l'herbe humide.",
    determinants: ["Ces"],
    noms: ["mangues", "herbe"],
    adjectifs: ["humide"],
    verbe: "tombent",
    infinitif: "tomber",
    pronoms: [],
    adverbes: ["souvent"],
  },
  {
    phrase: "Tu ranges rarement ta chambre bleue.",
    determinants: ["ta"],
    noms: ["chambre"],
    adjectifs: ["bleue"],
    verbe: "ranges",
    infinitif: "ranger",
    pronoms: ["Tu"],
    adverbes: ["rarement"],
  },
  {
    phrase: "Papa conduit prudemment sur la route mouillée.",
    determinants: ["la"],
    noms: ["route"],
    adjectifs: ["mouillée"],
    verbe: "conduit",
    infinitif: "conduire",
    pronoms: [],
    adverbes: ["prudemment"],
  },
  {
    phrase: "Les élèves recopient silencieusement la phrase écrite.",
    determinants: ["Les", "la"],
    noms: ["élèves", "phrase"],
    adjectifs: ["écrite"],
    verbe: "recopient",
    infinitif: "recopier",
    pronoms: [],
    adverbes: ["silencieusement"],
  },
  {
    phrase: "Je goute enfin le cari épicé.",
    determinants: ["le"],
    noms: ["cari"],
    adjectifs: ["épicé"],
    verbe: "goute",
    infinitif: "gouter",
    pronoms: ["Je"],
    adverbes: ["enfin"],
  },
  {
    phrase: "Le bateau avance lentement vers le lagon calme.",
    determinants: ["Le", "le"],
    noms: ["bateau", "lagon"],
    adjectifs: ["calme"],
    verbe: "avance",
    infinitif: "avancer",
    pronoms: [],
    adverbes: ["lentement"],
  },
  {
    phrase: "Ils construisent patiemment une cabane solide.",
    determinants: ["une"],
    noms: ["cabane"],
    adjectifs: ["solide"],
    verbe: "construisent",
    infinitif: "construire",
    pronoms: ["Ils"],
    adverbes: ["patiemment"],
  },
];

function motsDe(p: PhraseAnalysee, classe: Classe): readonly string[] {
  switch (classe) {
    case "determinant":
      return p.determinants;
    case "nom":
      return p.noms;
    case "adjectif":
      return p.adjectifs;
    case "verbe":
      return [p.verbe];
    case "pronom":
      return p.pronoms;
    case "adverbe":
      return p.adverbes;
  }
}

const TOUTES_CLASSES: readonly Classe[] = [
  "determinant",
  "nom",
  "adjectif",
  "verbe",
  "pronom",
  "adverbe",
];

/** Les mots de la phrase qui ne sont PAS de la classe demandée. C'est là, et
 *  seulement là, qu'on prend les distracteurs : une phrase a souvent deux
 *  déterminants, et l'élève aurait alors deux bonnes réponses.
 *  ⚠️ Dédoublonné SANS TENIR COMPTE DE LA CASSE : « Les » en tête de phrase et
 *  « les » au milieu sont le même mot, et l'élève verrait deux lignes qui ne se
 *  distinguent que par une majuscule. */
function motsDesAutresClasses(p: PhraseAnalysee, classe: Classe): string[] {
  const vus = new Set<string>();
  const sortie: string[] = [];
  for (const c of TOUTES_CLASSES) {
    if (c === classe) continue;
    for (const mot of motsDe(p, c)) {
      const cle = mot.toLowerCase();
      if (vus.has(cle)) continue;
      vus.add(cle);
      sortie.push(mot);
    }
  }
  return sortie;
}

/** Les phrases où la classe demandée est présente ET où il reste de quoi bâtir
 *  trois distracteurs. */
function phrasesAvec(classe: Classe): readonly PhraseAnalysee[] {
  return PHRASES.filter(
    (p) =>
      motsDe(p, classe).length > 0 &&
      new Set(motsDesAutresClasses(p, classe).map((m) => m.toLowerCase())).size >= 3,
  );
}

const LABEL_CLASSE: Record<Classe, string> = {
  determinant: "déterminant",
  nom: "nom",
  adjectif: "adjectif",
  verbe: "verbe",
  pronom: "pronom personnel sujet",
  adverbe: "adverbe",
};

/* ═══════════════════════════════════════════════════════════════════════════
   NOMS PROPRES ET NOMS COMMUNS
   ═══════════════════════════════════════════════════════════════════════════ */

const NOMS_PROPRES: readonly string[] = [
  "Léa",
  "Tom",
  "Karim",
  "Nina",
  "Léo",
  "Sofia",
  "Saint-Pierre",
  "Saint-Denis",
  "Cilaos",
  "Salazie",
  "La Réunion",
  "Le Tampon",
  "Mafate",
  "l'Étang-Salé",
  "Mayotte",
  "Yann",
];

const NOMS_COMMUNS: readonly string[] = [
  "letchi",
  "lagon",
  "margouillat",
  "cari",
  "piton",
  "tamarin",
  "case",
  "pêcheur",
  "maitresse",
  "cartable",
  "mangue",
  "sentier",
  "bateau",
  "cour",
  "vague",
  "brouette",
  "chemin",
  "gâteau",
  "cousin",
  "école",
];

/* ═══════════════════════════════════════════════════════════════════════════
   L'ADVERBE EN -MENT

   La règle du BO : on part du FÉMININ de l'adjectif, et on ajoute -ment.
   ⚠️ Les adjectifs masculins terminés par une voyelle ne suivent pas cette
   règle (vrai → vraiment, poli → poliment, gentil → gentiment). Ils sont donc
   absents de la table, et traités à part comme le piège qu'ils sont.
   ═══════════════════════════════════════════════════════════════════════════ */

type AdjectifAdverbe = {
  readonly m: string;
  readonly f: string;
  readonly adverbe: string;
  /** L'adverbe s'écrit-il sans accent ? Seuls ceux-là passent en réponse libre. */
  readonly clavier: boolean;
};

const ADVERBES_MENT: readonly AdjectifAdverbe[] = [
  { m: "lent", f: "lente", adverbe: "lentement", clavier: true },
  { m: "doux", f: "douce", adverbe: "doucement", clavier: true },
  { m: "fort", f: "forte", adverbe: "fortement", clavier: true },
  { m: "joyeux", f: "joyeuse", adverbe: "joyeusement", clavier: true },
  { m: "heureux", f: "heureuse", adverbe: "heureusement", clavier: true },
  { m: "vif", f: "vive", adverbe: "vivement", clavier: true },
  { m: "long", f: "longue", adverbe: "longuement", clavier: true },
  { m: "franc", f: "franche", adverbe: "franchement", clavier: true },
  { m: "sérieux", f: "sérieuse", adverbe: "sérieusement", clavier: false },
  { m: "silencieux", f: "silencieuse", adverbe: "silencieusement", clavier: true },
  { m: "curieux", f: "curieuse", adverbe: "curieusement", clavier: true },
  { m: "léger", f: "légère", adverbe: "légèrement", clavier: false },
  { m: "premier", f: "première", adverbe: "premièrement", clavier: false },
  { m: "calme", f: "calme", adverbe: "calmement", clavier: true },
  { m: "rapide", f: "rapide", adverbe: "rapidement", clavier: true },
  { m: "simple", f: "simple", adverbe: "simplement", clavier: true },
  { m: "tranquille", f: "tranquille", adverbe: "tranquillement", clavier: true },
  { m: "sage", f: "sage", adverbe: "sagement", clavier: true },
  { m: "timide", f: "timide", adverbe: "timidement", clavier: true },
  { m: "agréable", f: "agréable", adverbe: "agréablement", clavier: false },
  { m: "solide", f: "solide", adverbe: "solidement", clavier: true },
  { m: "propre", f: "propre", adverbe: "proprement", clavier: true },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES ADVERBES FRÉQUENTS, ET LEURS PIÈGES

   ⚠️ Les formes fautives sont ÉCRITES À LA MAIN, et phonétiquement plausibles.
   Fabriquer un piège en ajoutant un « s » à « bien » donnerait « biens », un
   mot bien réel : l'élève aurait deux bonnes réponses sous les yeux. Une
   anagramme, elle, ne trompe personne.
   ═══════════════════════════════════════════════════════════════════════════ */

/** ⚠️ Chaque mot vient avec une PHRASE À TROU, et c'est indispensable : une
 *  question qui écrit le mot pour demander comment il s'écrit donne la réponse.
 *  La phrase désigne le mot sans l'orthographier. */
type MotPiege = {
  readonly mot: string;
  readonly phrase: string;
  readonly fautes: readonly string[];
};

const ADVERBES_FREQUENTS: readonly MotPiege[] = [
  { mot: "très", phrase: "Le cari de mamie est ___ épicé.", fautes: ["trés", "trè", "tres"] },
  { mot: "si", phrase: "Il court ___ vite qu'on ne le voit plus.", fautes: ["sy", "cy", "ci"] },
  { mot: "bien", phrase: "Tu as ___ travaillé cette semaine.", fautes: ["bein", "biun", "biem"] },
  { mot: "assez", phrase: "J'ai ___ mangé, merci.", fautes: ["assé", "asser", "assai"] },
  {
    mot: "aujourd'hui",
    phrase: "___ , nous allons à la plage. (le jour où l'on est)",
    fautes: ["aujourdhui", "ojourd'hui", "aujourd'huit"],
  },
  {
    mot: "demain",
    phrase: "___ , il y aura école. (le jour d'après)",
    fautes: ["demein", "dmain", "demint"],
  },
  {
    mot: "beaucoup",
    phrase: "Il y a ___ de letchis cette année.",
    fautes: ["bocoup", "beaucou", "beaucoups"],
  },
  {
    mot: "toujours",
    phrase: "Mamie se lève ___ à cinq heures.",
    fautes: ["toujour", "toujourt", "toujourss"],
  },
  {
    mot: "souvent",
    phrase: "On va ___ au marché le samedi.",
    fautes: ["souven", "souvant", "souvend"],
  },
  {
    mot: "jamais",
    phrase: "Je ne suis ___ allé à Mafate.",
    fautes: ["jamai", "jamet", "jammais"],
  },
  {
    mot: "hier",
    phrase: "___ , il a plu toute la journée. (le jour d'avant)",
    fautes: ["ier", "hiere", "yer"],
  },
  {
    mot: "vite",
    // ⚠️ Pas de « vit » en distracteur : c'est un vrai mot, et pas de ceux
    // qu'on met sous les yeux d'un enfant de neuf ans.
    phrase: "Le margouillat file ___ entre les pierres.",
    fautes: ["vitte", "vyte", "vithe"],
  },
  { mot: "alors", phrase: "Il pleuvait, ___ nous sommes rentrés.", fautes: ["alor", "allors", "alorts"] },
  { mot: "encore", phrase: "Tu en veux ___ un peu ?", fautes: ["ancore", "encors", "encor"] },
  { mot: "dehors", phrase: "Les enfants jouent ___ , sous le tamarin.", fautes: ["deors", "dehor", "déhors"] },
  { mot: "ensuite", phrase: "On range la classe, ___ on sort.", fautes: ["ensuitte", "ansuite", "ensuit"] },
  { mot: "pendant", phrase: "Il a plu ___ toute la nuit.", fautes: ["pandant", "pendan", "pendand"] },
  { mot: "depuis", phrase: "Nous l'attendons ___ ce matin.", fautes: ["depui", "depuit", "dpuis"] },
  { mot: "presque", phrase: "Le panier est ___ plein.", fautes: ["presq", "prèsque", "presqun"] },
  { mot: "surtout", phrase: "N'oublie ___ pas ta gourde.", fautes: ["surtou", "surtous", "surtoux"] },
  { mot: "enfin", phrase: "Après deux heures de marche, nous voilà ___ au sommet.", fautes: ["anfin", "enfein", "enfain"] },
  { mot: "moins", phrase: "Il y a ___ de vent aujourd'hui.", fautes: ["moin", "moints", "moinss"] },
  { mot: "plutôt", phrase: "Je prendrais ___ une mangue.", fautes: ["plutot", "plustôt", "plutôts"] },
  { mot: "dedans", phrase: "Ouvre le panier et regarde ___ .", fautes: ["dedan", "dedent", "dedens"] },
];

/* Les mots qui bougent, pour les opposer à ceux qui ne bougent jamais. Chaque
   couple est écrit en entier : personne ne fabrique un pluriel ici. */
type MotVariable = { readonly singulier: string; readonly pluriel: string };

const MOTS_VARIABLES: readonly MotVariable[] = [
  { singulier: "letchi", pluriel: "letchis" },
  { singulier: "mangue", pluriel: "mangues" },
  { singulier: "case", pluriel: "cases" },
  { singulier: "bateau", pluriel: "bateaux" },
  { singulier: "cheval", pluriel: "chevaux" },
  { singulier: "sentier", pluriel: "sentiers" },
  { singulier: "vague", pluriel: "vagues" },
  { singulier: "grand", pluriel: "grands" },
  { singulier: "mûre", pluriel: "mûres" },
  { singulier: "verte", pluriel: "vertes" },
  { singulier: "cartable", pluriel: "cartables" },
  { singulier: "margouillat", pluriel: "margouillats" },
];

const MOTS_INVARIABLES: readonly string[] = [
  "toujours",
  "jamais",
  "souvent",
  "beaucoup",
  "assez",
  "très",
  "bien",
  "vite",
  "hier",
  "demain",
  "aujourd'hui",
  "parfois",
  "dehors",
  "ensuite",
  "pourtant",
  "doucement",
  "lentement",
  "rapidement",
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

export const classesMotsBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_CM_NOM — nom propre / nom commun
  ========================================================= */
  {
    kind: "template",
    id: "ce2_cm_nom_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_nom",
    difficulty: 1,
    theme: "neutral",
    hint: "Un nom propre désigne UNE seule personne, UN seul lieu.",
    tags: ["ce2", "classes-mots", "nom", "template"],
    generate: () => {
      const propre = Math.random() < 0.5;
      const mot = randomChoice(propre ? NOMS_PROPRES : NOMS_COMMUNS);
      return {
        text: `« ${mot} » est-il un nom propre ou un nom commun ?`,
        format: "qcm" as const,
        choices: ["un nom propre", "un nom commun"],
        expected: [propre ? "un nom propre" : "un nom commun"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un nom commun désigne une chose, un animal ou une personne en général. Un nom propre en désigne un seul, celui qu'on a nommé.",
          "Essaie de mettre « un » ou « une » devant : un letchi, une case, ça marche. Un Cilaos, ça ne se dit pas.",
          propre
            ? `« ${mot} » ne désigne qu'un seul être ou un seul endroit au monde. Il garde sa majuscule partout dans la phrase.`
            : `On peut dire « un ${mot} » ou « des ${mot}s » : il y en a beaucoup, et il ne prend pas de majuscule.`,
          `« ${mot} » est ${propre ? "un nom propre" : "un nom commun"}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_cm_nom_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_nom",
    difficulty: 2,
    theme: "neutral",
    hint: "Trois se ressemblent, un seul n'est pas de la même sorte.",
    tags: ["ce2", "classes-mots", "nom", "template"],
    generate: () => {
      const intrusEstPropre = Math.random() < 0.5;
      const intrus = randomChoice(intrusEstPropre ? NOMS_PROPRES : NOMS_COMMUNS);
      const autres = shuffle(intrusEstPropre ? NOMS_COMMUNS : NOMS_PROPRES).slice(0, 3);
      return {
        text: `Trois de ces mots sont des noms ${intrusEstPropre ? "communs" : "propres"}. Lequel est l'intrus ?`,
        format: "qcm" as const,
        choices: shuffle([intrus, ...autres]),
        expected: [intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un nom propre désigne un seul être ou un seul lieu, et garde toujours sa majuscule. Un nom commun désigne une sorte de chose.",
          "Pose « un » ou « une » devant chaque mot. Ceux qui refusent sont des noms propres.",
          `${autres.map((m) => `« ${m} »`).join(", ")} sont des noms ${intrusEstPropre ? "communs" : "propres"}. « ${intrus} », non.`,
          `L'intrus est « ${intrus} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_cm_nom_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_nom",
    difficulty: 3,
    theme: "neutral",
    text: "« Le margouillat dort sur le mur. »\n\nLe mot « Le » commence par une majuscule. Est-ce un nom propre ?",
    format: "qcm",
    choices: [
      "Non : la majuscule est là parce que la phrase commence",
      "Oui, puisqu'il a une majuscule",
      "Oui, c'est le nom du margouillat",
      "On ne peut pas savoir",
    ],
    expected: ["Non : la majuscule est là parce que la phrase commence"],
    comparator: "mcq_exact",
    hint: "Demande-toi POURQUOI ce mot-là a une majuscule.",
    explanation: exp(
      "Un nom propre garde sa majuscule PARTOUT dans la phrase, pas seulement au début.",
      "Déplace le mot au milieu de la phrase, dans ta tête : garde-t-il sa majuscule ?",
      "« Sur le mur dort le margouillat. » — le « le » a perdu sa majuscule, donc ce n'était pas un nom propre. Écris la même chose avec Léa : « Sur le mur dort Léa. » Léa garde la sienne.",
      "Non : la majuscule est là parce que la phrase commence.",
    ),
    tags: ["ce2", "classes-mots", "nom", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_cm_nom_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_nom",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention : la majuscule du début de phrase ne compte pas.",
    tags: ["ce2", "classes-mots", "nom", "methode"],
    generate: () => {
      const mot = randomChoice(NOMS_PROPRES);
      const bonne = "Je le déplace au milieu d'une phrase : s'il garde sa majuscule, c'est un nom propre.";
      return {
        text: `« ${mot} » est un nom propre.\n\nComment le reconnais-tu, sans te tromper avec le premier mot d'une phrase ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // LE piège : le premier mot d'une phrase a lui aussi sa majuscule.
          "Je regarde s'il a une majuscule : ça suffit.",
          // La voisine : le déterminant annonce le nom commun.
          "Je regarde s'il y a un déterminant devant.",
          "Je regarde s'il est plus long que les autres mots.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un nom propre désigne un seul être ou un seul lieu, et sa majuscule le suit partout.",
          "Déplace le mot au milieu de la phrase : s'il garde sa majuscule, c'est un nom propre.",
          `« Nous allons à ${mot}. » — la majuscule est toujours là, alors qu'elle n'est plus au début.`,
          `« ${mot} » garde sa majuscule même au milieu d'une phrase : c'est un nom propre.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CM_DETERMINANT
  ========================================================= */
  {
    kind: "template",
    id: "ce2_cm_determinant_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_determinant",
    difficulty: 2,
    theme: "neutral",
    hint: "Le déterminant est le petit mot placé juste devant le nom.",
    tags: ["ce2", "classes-mots", "determinant", "template"],
    generate: () => {
      const p = randomChoice(phrasesAvec("determinant"));
      const bon = randomChoice(p.determinants);
      return {
        text: `Lis : « ${p.phrase} »\n\nQuel mot est un déterminant ?`,
        format: "qcm" as const,
        choices: choix(bon, motsDesAutresClasses(p, "determinant")),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le déterminant est le petit mot qui annonce le nom : le, la, les, un, une, des, mon, ma, ce, cette, deux…",
          "Cherche un nom, puis regarde le mot juste devant lui.",
          `Dans cette phrase, « ${bon} » annonce le nom « ${p.noms[0]} ».`,
          `Le déterminant est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_cm_determinant_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_determinant",
    difficulty: 2,
    theme: "neutral",
    hint: "Le déterminant change avec le nom : genre et nombre.",
    tags: ["ce2", "classes-mots", "determinant", "template"],
    generate: () => {
      const p = randomChoice(phrasesAvec("determinant"));
      const bon = randomChoice(p.determinants);
      const nom = p.noms[0];
      return {
        text: `Lis : « ${p.phrase} »\n\nCombien de déterminants y a-t-il dans cette phrase ?`,
        format: "qcm" as const,
        choices: ["1", "2", "3", "aucun"],
        expected: [String(p.determinants.length)],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque nom commun de la phrase est annoncé par un déterminant.",
          "Repère d'abord tous les noms, puis regarde le petit mot placé devant chacun.",
          `Ici : ${p.determinants.map((d) => `« ${d} »`).join(" et ")} — un par nom commun (${p.noms.map((n) => `« ${n} »`).join(", ")}). Et « ${bon} » annonce bien « ${nom} ».`,
          `Il y a ${p.determinants.length} déterminant${p.determinants.length > 1 ? "s" : ""}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_cm_determinant_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_determinant",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert un déterminant ?",
    format: "qcm",
    choices: [
      "À annoncer le nom, et à dire s'il y en a un ou plusieurs",
      "À dire comment est le nom",
      "À dire ce que fait le nom",
      "À remplacer le nom",
    ],
    expected: ["À annoncer le nom, et à dire s'il y en a un ou plusieurs"],
    comparator: "mcq_exact",
    hint: "Compare « une mangue » et « des mangues ». Qu'est-ce qui t'a prévenu ?",
    explanation: exp(
      "Le déterminant est le petit mot placé devant le nom : il l'annonce et donne son genre et son nombre.",
      "Enlève-le pour voir : « mangue tombe » ne se dit pas. Le nom commun a presque toujours besoin de lui.",
      "une mangue / des mangues : ta bouche dit presque la même chose. C'est le déterminant qui prévient qu'il y en a plusieurs — et que le nom prend un s.",
      "Il sert à annoncer le nom, et à dire s'il y en a un ou plusieurs.",
    ),
    tags: ["ce2", "classes-mots", "determinant", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_cm_determinant_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_determinant",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne cherche pas le déterminant en premier : on cherche le nom.",
    tags: ["ce2", "classes-mots", "determinant", "methode"],
    generate: () => {
      const p = randomChoice(phrasesAvec("determinant"));
      const d = p.determinants[0];
      const bonne = `Je cherche d'abord un nom, puis je regarde le petit mot collé devant : ici « ${d} », devant « ${p.noms[0]} ».`;
      return {
        text: `Dans « ${p.phrase} », le mot « ${d} » est un déterminant.\n\nComment repères-tu un déterminant dans une phrase ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // La voisine : dire comment est le nom, c'est le travail de l'adjectif.
          "Je cherche le mot qui dit comment est le nom.",
          "Je cherche le mot le plus court de la phrase.",
          "Je cherche le mot placé juste après le verbe.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le déterminant est le petit mot placé juste devant le nom : il l'annonce et donne son genre et son nombre.",
          "Cherche d'abord un nom, puis regarde le mot collé devant lui.",
          `Ici, « ${d} » est juste devant « ${p.noms[0]} ».`,
          `On le repère au mot placé juste devant le nom : « ${d} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CM_ADJECTIF
  ========================================================= */
  {
    kind: "template",
    id: "ce2_cm_adjectif_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adjectif",
    difficulty: 2,
    theme: "neutral",
    hint: "L'adjectif dit COMMENT est le nom.",
    tags: ["ce2", "classes-mots", "adjectif", "template"],
    generate: () => {
      const p = randomChoice(phrasesAvec("adjectif"));
      const bon = randomChoice(p.adjectifs);
      return {
        text: `Lis : « ${p.phrase} »\n\nQuel mot est un adjectif ?`,
        format: "qcm" as const,
        choices: choix(bon, motsDesAutresClasses(p, "adjectif")),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'adjectif dit comment est le nom : sa couleur, sa taille, son gout, son humeur.",
          "Trouve le nom, puis demande-toi quel mot le décrit. Il se place juste avant ou juste après lui.",
          `Ici, « ${bon} » dit comment est « ${p.noms[0]} ».`,
          `L'adjectif est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_cm_adjectif_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adjectif",
    difficulty: 3,
    theme: "neutral",
    hint: "Enlève un mot : si la phrase tient encore debout, c'était souvent l'adjectif.",
    tags: ["ce2", "classes-mots", "adjectif", "template"],
    generate: () => {
      const p = randomChoice(phrasesAvec("adjectif"));
      const bon = randomChoice(p.adjectifs);
      const sans = p.phrase.replace(new RegExp(`\\s?${bon}`), "");
      return {
        text: `« ${p.phrase} »\n\nQuel mot a-t-on enlevé pour obtenir : « ${sans} » ?`,
        format: "qcm" as const,
        choices: choix(bon, motsDesAutresClasses(p, "adjectif")),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'adjectif ajoute un détail au nom. On peut l'enlever : la phrase reste correcte, elle en dit seulement moins.",
          "Compare les deux phrases mot à mot et cherche celui qui a disparu.",
          `« ${bon} » a disparu. La phrase tient toujours debout — c'est bien un adjectif, pas le nom ni le verbe.`,
          `Le mot enlevé est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_cm_adjectif_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adjectif",
    difficulty: 3,
    theme: "neutral",
    text: "« une grande case » et « une case créole ». Où se place l'adjectif ?",
    format: "qcm",
    choices: [
      "Avant OU après le nom, selon l'adjectif",
      "Toujours avant le nom",
      "Toujours après le nom",
      "Toujours en fin de phrase",
    ],
    expected: ["Avant OU après le nom, selon l'adjectif"],
    comparator: "mcq_exact",
    hint: "Regarde les deux groupes, l'un après l'autre.",
    explanation: exp(
      "L'adjectif décrit le nom. Il se place tout près de lui, mais pas toujours du même côté.",
      "Ne cherche pas une position : cherche le mot qui dit COMMENT est le nom.",
      "une GRANDE case : l'adjectif est devant. une case CRÉOLE : il est derrière. Dans les deux cas, il touche le nom et il s'accorde avec lui.",
      "Avant ou après le nom, selon l'adjectif.",
    ),
    tags: ["ce2", "classes-mots", "adjectif", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_cm_adjectif_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adjectif",
    difficulty: 3,
    theme: "neutral",
    hint: "Enlève-le : la phrase reste correcte, mais elle en dit moins. Moins de quoi ?",
    tags: ["ce2", "classes-mots", "adjectif", "methode"],
    generate: () => {
      const p = randomChoice(phrasesAvec("adjectif"));
      const bon = p.adjectifs[0];
      const bonne = `Il dit comment est « ${p.noms[0]} » : si on l'enlève, la phrase reste correcte, mais elle en dit moins.`;
      return {
        text: `Dans « ${p.phrase} », le mot « ${bon} » est un adjectif.\n\nQu'apporte-t-il à la phrase ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // Les trois voisines : sujet, adverbe, pronom. Chacune est le rôle
          // d'une autre classe, et aucune n'est celui de l'adjectif.
          "Il dit qui fait l'action.",
          "Il dit quand l'action se passe.",
          "Il remplace le nom pour ne pas le répéter.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'adjectif dit comment est le nom : sa couleur, sa taille, son gout, son humeur.",
          "Enlève-le : la phrase reste correcte, mais elle en dit moins.",
          `Sans « ${bon} », on ne sait plus comment est « ${p.noms[0]} ».`,
          `« ${bon} » dit comment est « ${p.noms[0]} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CM_VERBE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_cm_verbe_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_verbe",
    difficulty: 2,
    theme: "neutral",
    hint: "Le verbe est le mot qui change quand tu dis « hier », puis « demain ».",
    tags: ["ce2", "classes-mots", "verbe", "template"],
    generate: () => {
      const p = randomChoice(phrasesAvec("verbe"));
      return {
        text: `Lis : « ${p.phrase} »\n\nQuel mot est le verbe ?`,
        format: "qcm" as const,
        choices: choix(p.verbe, motsDesAutresClasses(p, "verbe")),
        expected: [p.verbe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe dit ce qui se passe. C'est le seul mot de la phrase qui change quand on change le moment.",
          "Relis la phrase avec « hier », puis avec « demain ». Le mot qui bouge est le verbe.",
          `Ici, c'est « ${p.verbe} ». Son infinitif est « ${p.infinitif} ».`,
          `Le verbe est « ${p.verbe} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_cm_verbe_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_verbe",
    difficulty: 3,
    theme: "neutral",
    hint: "Trouve d'abord le verbe, puis mets-le à l'infinitif.",
    tags: ["ce2", "classes-mots", "verbe", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const autres = shuffle(PHRASES.filter((x) => x.infinitif !== p.infinitif)).map(
        (x) => x.infinitif,
      );
      return {
        text: `Lis : « ${p.phrase} »\n\nQuel est l'infinitif du verbe de cette phrase ?`,
        format: "qcm" as const,
        choices: choix(p.infinitif, autres),
        expected: [p.infinitif],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'infinitif est le nom du verbe, celui du dictionnaire.",
          "Repère le verbe conjugué, puis pose « il faut… » devant.",
          `« ${p.verbe} » → il faut ${p.infinitif}.`,
          `L'infinitif est « ${p.infinitif} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_cm_verbe_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_verbe",
    difficulty: 3,
    theme: "neutral",
    text: "Comment être sûr qu'un mot est bien le verbe de la phrase ?",
    format: "qcm",
    choices: [
      "On change le moment (hier, demain) : le verbe est le mot qui bouge",
      "C'est toujours le deuxième mot",
      "C'est le mot le plus long",
      "C'est le mot qui suit le déterminant",
    ],
    expected: ["On change le moment (hier, demain) : le verbe est le mot qui bouge"],
    comparator: "mcq_exact",
    hint: "Essaie de dire la même phrase à un autre moment.",
    explanation: exp(
      "Le verbe est le seul mot de la phrase qui se conjugue : il change avec le temps et avec la personne.",
      "Dis la phrase avec « hier », puis avec « demain », et regarde quel mot n'est plus le même.",
      "Les enfants ramassent les letchis. → Hier, les enfants RAMASSAIENT les letchis. Un seul mot a bougé.",
      "On change le moment : le verbe est le mot qui bouge.",
    ),
    tags: ["ce2", "classes-mots", "verbe", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_cm_verbe_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_verbe",
    difficulty: 3,
    theme: "neutral",
    // ⚠️ Le geste du MOMENT (hier / demain) est déjà posé par
    // ce2_cm_verbe_fixed_1. Celui-ci est l'autre moitié de la définition :
    // le verbe change aussi avec la PERSONNE. Deux vérifications, deux items.
    hint: "Le verbe change avec le moment, mais aussi avec qui fait l'action.",
    tags: ["ce2", "classes-mots", "verbe", "methode"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const bonne = `Je change le sujet — « ils », « nous » — et je regarde si « ${p.verbe} » bouge : le verbe est le seul mot qui suive.`;
      return {
        text: `« ${p.phrase} »\n\nTu penses que le verbe est « ${p.verbe} ». Comment le vérifies-tu ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : la place prise pour la classe.
          "Je regarde s'il est placé après le sujet : le verbe est toujours là.",
          // La voisine : -er, -ir, -re, ce sont les fins de l'INFINITIF, pas
          // celles d'un verbe conjugué dans une phrase.
          "Je regarde s'il se termine par -er, -ir ou -re.",
          "Je vérifie qu'il y a un déterminant devant.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe est le seul mot qui se conjugue : il change avec le moment ET avec la personne.",
          "Redis la phrase avec « ils », puis avec « nous ». Le mot qui bouge est le verbe.",
          `${p.phrase} — si le sujet devient « nous » ou « ils », seul « ${p.verbe} » change.`,
          `Le verbe est « ${p.verbe} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CM_PRONOM
  ========================================================= */
  {
    kind: "template",
    id: "ce2_cm_pronom_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_pronom",
    difficulty: 2,
    theme: "neutral",
    hint: "Le pronom sujet remplace le groupe qui fait l'action : je, tu, il, elle, on, nous, vous, ils, elles.",
    tags: ["ce2", "classes-mots", "pronom", "template"],
    generate: () => {
      const p = randomChoice(phrasesAvec("pronom"));
      const bon = p.pronoms[0];
      return {
        text: `Lis : « ${p.phrase} »\n\nQuel mot est un pronom personnel sujet ?`,
        format: "qcm" as const,
        choices: choix(bon, motsDesAutresClasses(p, "pronom")),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un pronom personnel sujet remplace le groupe qui fait l'action : je, tu, il, elle, on, nous, vous, ils, elles.",
          "Cherche qui fait l'action. Si ce n'est pas un nom mais un petit mot, c'est un pronom.",
          `Ici, c'est « ${bon} » qui fait l'action « ${p.verbe} ».`,
          `Le pronom personnel sujet est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_cm_pronom_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_pronom",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte : un seul, ou plusieurs ? Masculin, ou féminin ?",
    tags: ["ce2", "classes-mots", "pronom", "template"],
    generate: () => {
      const groupes: readonly { readonly gn: string; readonly pronom: string }[] = [
        { gn: "les enfants", pronom: "ils" },
        { gn: "le pêcheur", pronom: "il" },
        { gn: "ma sœur", pronom: "elle" },
        { gn: "les vagues", pronom: "elles" },
        { gn: "le margouillat", pronom: "il" },
        { gn: "les touristes", pronom: "ils" },
        { gn: "la maitresse", pronom: "elle" },
        { gn: "mon cousin", pronom: "il" },
        { gn: "les mangues", pronom: "elles" },
        { gn: "le bateau", pronom: "il" },
        { gn: "les élèves", pronom: "ils" },
        { gn: "la case", pronom: "elle" },
      ];
      const g = randomChoice(groupes);
      return {
        text: `Par quel pronom peux-tu remplacer « ${g.gn} » ?`,
        format: "qcm" as const,
        choices: ["il", "elle", "ils", "elles"],
        expected: [g.pronom],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le pronom remplace le groupe sujet en gardant son genre et son nombre.",
          "Pose-toi deux questions : un seul ou plusieurs ? masculin ou féminin ?",
          `« ${g.gn} » est ${g.pronom === "il" || g.pronom === "ils" ? "masculin" : "féminin"} et ${g.pronom.endsWith("s") ? "au pluriel" : "au singulier"} : on dit « ${g.pronom} ».`,
          `On peut le remplacer par « ${g.pronom} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_cm_pronom_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_pronom",
    difficulty: 3,
    theme: "neutral",
    text: "« On entend les vagues. » Le mot « on » est-il un pronom sujet ?",
    format: "qcm",
    choices: [
      "Oui, et le verbe se conjugue comme avec « il »",
      "Non, ce n'est pas dans la liste",
      "Oui, et le verbe se conjugue comme avec « nous »",
      "Non, c'est un déterminant",
    ],
    expected: ["Oui, et le verbe se conjugue comme avec « il »"],
    comparator: "mcq_exact",
    hint: "Écoute la fin du verbe : « on entend », ou « on entendons » ?",
    explanation: exp(
      "« on » est un pronom personnel sujet, au même titre que je, tu, il, elle, nous, vous, ils, elles.",
      "Même s'il veut souvent dire « nous », le verbe derrière « on » se conjugue comme derrière « il ».",
      "On entend les vagues. Pas « on entendons ». Le sens dit « nous », la conjugaison dit « il » — c'est là que l'erreur se glisse.",
      "Oui, et le verbe se conjugue comme avec « il ».",
    ),
    tags: ["ce2", "classes-mots", "pronom", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_cm_pronom_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_pronom",
    difficulty: 3,
    theme: "neutral",
    hint: "Il tient une place. Laquelle, et de quoi ?",
    tags: ["ce2", "classes-mots", "pronom", "methode"],
    generate: () => {
      const p = randomChoice(phrasesAvec("pronom"));
      const bon = p.pronoms[0];
      const bonne = `Il se met à la place du groupe qui fait l'action, pour ne pas le répéter — et c'est lui qui commande la fin du verbe « ${p.verbe} ».`;
      return {
        text: `Dans « ${p.phrase} », à quoi sert le pronom « ${bon} » ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // La voisine la plus proche : le déterminant annonce aussi, mais il
          // ne remplace rien — il se colle devant le nom, qui reste là.
          "Il annonce le nom et donne son genre et son nombre.",
          "Il dit comment est le nom.",
          "Il dit quand se passe l'action.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un pronom personnel sujet se met à la place du groupe qui fait l'action, pour ne pas le répéter.",
          "Demande-toi qui fait l'action, puis vérifie deux choses : un seul ou plusieurs ? masculin ou féminin ?",
          `« ${bon} » tient la place d'un nom qu'on a déjà dit, ou qu'on connait. C'est lui qui commande la fin du verbe « ${p.verbe} ».`,
          `« ${bon} » remplace le groupe sujet pour ne pas le répéter.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CM_ADVERBE — la nouveauté du CE2
  ========================================================= */
  {
    kind: "template",
    id: "ce2_cm_adverbe_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adverbe",
    difficulty: 2,
    theme: "neutral",
    hint: "L'adverbe dit COMMENT, QUAND ou OÙ se passe l'action.",
    tags: ["ce2", "classes-mots", "adverbe", "template"],
    generate: () => {
      const p = randomChoice(phrasesAvec("adverbe"));
      const bon = p.adverbes[0];
      return {
        text: `Lis : « ${p.phrase} »\n\nQuel mot est un adverbe ?`,
        format: "qcm" as const,
        choices: choix(bon, motsDesAutresClasses(p, "adverbe")),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'adverbe accompagne le verbe et dit comment, quand ou où se passe l'action. Il ne change JAMAIS de forme.",
          "Trouve le verbe, puis demande-toi : comment ? quand ? où ? Le mot qui répond est l'adverbe.",
          `${p.verbe} comment ? ${bon}.`,
          `L'adverbe est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_cm_adverbe_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adverbe",
    difficulty: 2,
    theme: "neutral",
    hint: "Un adverbe ne prend jamais ni « s » ni « e ».",
    tags: ["ce2", "classes-mots", "adverbe", "template"],
    generate: () => {
      const bon = randomChoice(MOTS_INVARIABLES);
      const autres = shuffle(MOTS_VARIABLES).slice(0, 6).map((m) => m.singulier);
      return {
        text: "Parmi ces mots, lequel est un adverbe ?",
        format: "qcm" as const,
        choices: choix(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'adverbe dit comment, quand ou où se passe l'action, et il ne change jamais de forme.",
          "Essaie de mettre chaque mot au pluriel. Celui qui refuse de bouger est l'adverbe.",
          `« ${bon} » s'écrit pareil partout. « ${autres[0]} » devient « ${autres[0]}s » quand il y en a plusieurs.`,
          `L'adverbe est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_cm_adverbe_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adverbe",
    difficulty: 3,
    theme: "neutral",
    text: "« une marche lente » et « il marche lentement ». Lequel des deux mots est l'adverbe ?",
    format: "qcm",
    choices: [
      "« lentement », parce qu'il accompagne le verbe",
      "« lente », parce qu'il accompagne le nom",
      "Les deux",
      "Aucun des deux",
    ],
    expected: ["« lentement », parce qu'il accompagne le verbe"],
    comparator: "mcq_exact",
    hint: "Demande-toi quel mot est décrit : le nom, ou l'action ?",
    explanation: exp(
      "L'adjectif décrit un NOM et s'accorde avec lui. L'adverbe accompagne un VERBE et ne change jamais.",
      "Repère ce que le mot décrit. Une marche : c'est un nom, donc adjectif. Il marche : c'est un verbe, donc adverbe.",
      "une marche lente → des marches lentes : l'adjectif a bougé. il marche lentement → ils marchent lentement : l'adverbe n'a pas bougé d'un cheveu.",
      "C'est « lentement », parce qu'il accompagne le verbe.",
    ),
    tags: ["ce2", "classes-mots", "adverbe", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_cm_adverbe_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adverbe",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux vérifications : la question à laquelle il répond, et ce qu'il fait au pluriel.",
    tags: ["ce2", "classes-mots", "adverbe", "methode"],
    generate: () => {
      const p = randomChoice(phrasesAvec("adverbe"));
      const bon = p.adverbes[0];
      const bonne = `Je pose la question au verbe — ${p.verbe} comment ? ${bon} — et je vérifie qu'il ne change jamais, même au pluriel.`;
      return {
        text: `Dans « ${p.phrase} », le mot « ${bon} » est un adverbe.\n\nComment le reconnais-tu ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : tous les adverbes ne finissent pas par -ment,
          // et « vraiment » n'est pas plus adverbe que « bien » ou « hier ».
          "Je regarde s'il se termine par « -ment » : tous les adverbes finissent ainsi.",
          "Je regarde s'il est placé juste après le verbe.",
          // La voisine : s'accorder avec le nom, c'est le propre de l'adjectif.
          "Je regarde s'il s'accorde avec le nom.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'adverbe accompagne le verbe et dit comment, quand ou où se passe l'action.",
          "Pose la question au verbe : comment ? quand ? où ?",
          `${p.verbe} comment ? ${bon}. Et il s'écrit pareil que le sujet soit seul ou à plusieurs : il est invariable.`,
          `« ${bon} » dit comment se passe l'action, et il ne change jamais.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CM_ADVERBES_MENT
  ========================================================= */
  {
    kind: "template",
    id: "ce2_cm_adverbes_ment_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adverbes_ment",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe d'abord l'adjectif au FÉMININ, puis ajoute -ment.",
    tags: ["ce2", "classes-mots", "adverbe", "template"],
    generate: () => {
      const a = randomChoice(ADVERBES_MENT);
      const autres = shuffle(ADVERBES_MENT.filter((x) => x.adverbe !== a.adverbe)).map(
        (x) => x.adverbe,
      );
      return {
        text: `Quel adverbe se forme à partir de l'adjectif « ${a.m} » ?`,
        format: "qcm" as const,
        choices: choix(a.adverbe, [`${a.m}ment`], autres),
        expected: [a.adverbe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un adverbe en -ment se fabrique à partir du FÉMININ de l'adjectif.",
          "Mets l'adjectif au féminin, puis colle « -ment » derrière.",
          `${a.m} → ${a.f} → ${a.adverbe}. On part du féminin, jamais du masculin : « ${a.m}ment » n'existe pas.`,
          `L'adverbe est « ${a.adverbe} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_cm_adverbes_ment_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adverbes_ment",
    difficulty: 3,
    theme: "neutral",
    hint: "Féminin de l'adjectif, puis -ment. Écris le mot en entier.",
    tags: ["ce2", "classes-mots", "adverbe", "template"],
    generate: () => {
      const a = randomChoice(ADVERBES_MENT.filter((x) => x.clavier));
      return {
        text: `L'adjectif est « ${a.m} », son féminin est « ${a.f} ».\n\nÉcris l'adverbe qui se forme dessus.`,
        format: "short" as const,
        expected: [a.adverbe],
        comparator: "exact_text" as const,
        explanation: exp(
          "Un adverbe en -ment se fabrique sur le féminin de l'adjectif.",
          "Prends le féminin en entier et ajoute « -ment » sans rien enlever.",
          `${a.f} + ment = ${a.adverbe}.`,
          `On écrit « ${a.adverbe} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_cm_adverbes_ment_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adverbes_ment",
    difficulty: 3,
    theme: "neutral",
    text: "L'adjectif « gentil » donne quel adverbe ?",
    format: "qcm",
    choices: ["gentiment", "gentillement", "gentilment", "gentilement"],
    expected: ["gentiment"],
    comparator: "mcq_exact",
    hint: "Celui-là ne suit pas la règle du féminin. Il faut le retenir.",
    explanation: exp(
      "La règle habituelle part du féminin de l'adjectif : douce → doucement, longue → longuement.",
      "Quelques adverbes ne la suivent pas : ils s'apprennent un par un.",
      "gentille → on attendrait « gentillement », et on écrit gentiment. Comme vrai → vraiment, poli → poliment, absolu → absolument. Ce sont les adjectifs qui finissent par une voyelle au masculin.",
      "On écrit « gentiment ».",
    ),
    tags: ["ce2", "classes-mots", "adverbe", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_cm_adverbes_ment_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adverbes_ment",
    difficulty: 3,
    theme: "neutral",
    hint: "Il y a une étape entre les deux mots. Laquelle ?",
    tags: ["ce2", "classes-mots", "adverbe", "methode"],
    generate: () => {
      const a = randomChoice(ADVERBES_MENT.filter((x) => x.m !== x.f));
      const bonne = `Parce qu'on part du FÉMININ : ${a.m} → ${a.f} → ${a.adverbe}.`;
      return {
        text: `L'adjectif « ${a.m} » donne l'adverbe « ${a.adverbe} ».\n\nPourquoi ce n'est pas « ${a.m}ment » ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : bricoler la fin du masculin au lieu de passer
          // par le féminin.
          "Parce qu'on enlève la dernière lettre de l'adjectif avant de coller « -ment ».",
          "Parce que « -ment » ne se colle jamais directement sur un adjectif.",
          "Parce que le mot serait trop long à prononcer.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un adverbe en -ment se fabrique sur le FÉMININ de l'adjectif, jamais sur son masculin.",
          "Passe l'adjectif au féminin d'abord, puis colle « -ment » derrière.",
          `${a.m} → ${a.f} → ${a.adverbe}. Si on part du masculin, on obtient « ${a.m}ment », qui n'existe pas.`,
          `Parce qu'on part du féminin « ${a.f} », et non du masculin.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CM_ADVERBES_FREQUENTS
  ========================================================= */
  {
    kind: "template",
    id: "ce2_cm_adverbes_frequents_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adverbes_frequents",
    difficulty: 2,
    theme: "neutral",
    hint: "Ces mots-là s'apprennent par cœur : ils ne se devinent pas.",
    tags: ["ce2", "classes-mots", "adverbe", "template"],
    generate: () => {
      const m = randomChoice(ADVERBES_FREQUENTS);
      return {
        text: `Complète : « ${m.phrase} »`,
        format: "qcm" as const,
        choices: shuffle([m.mot, ...m.fautes]),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les adverbes fréquents s'écrivent toujours de la même façon : ce sont des mots invariables.",
          "Il n'y a rien à calculer. On les apprend par cœur, et on les relit dans son cahier.",
          `On écrit « ${m.mot} », et jamais « ${m.fautes[0]} ».`,
          `On écrit « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_cm_adverbes_frequents_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adverbes_frequents",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul de ces mots est bien orthographié.",
    tags: ["ce2", "classes-mots", "adverbe", "template"],
    generate: () => {
      const m = randomChoice(ADVERBES_FREQUENTS);
      const autresFautes = shuffle(
        ADVERBES_FREQUENTS.filter((x) => x.mot !== m.mot).flatMap((x) => [...x.fautes]),
      );
      return {
        text: `Parmi ces quatre mots, un seul est bien écrit. Lequel ?`,
        format: "qcm" as const,
        choices: choix(m.mot, autresFautes),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les mots invariables ne se devinent pas : on les reconnait de l'œil, à force de les lire.",
          "Regarde le mot en entier, pas seulement son début. Les fautes se cachent souvent à la fin.",
          `« ${m.mot} » est le seul bien écrit. Les autres ressemblent à des mots, mais n'en sont pas.`,
          `Le mot bien écrit est « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_cm_adverbes_frequents_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adverbes_frequents",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : « ___ , nous allons à la plage. » (le jour où l'on est)",
    format: "qcm",
    choices: ["Aujourd'hui", "Aujourdhui", "Aujourd'huit", "Ojourd'hui"],
    expected: ["Aujourd'hui"],
    comparator: "mcq_exact",
    hint: "Il y a une apostrophe, et rien après le « i ».",
    explanation: exp(
      "« aujourd'hui » est un mot invariable, et l'un des plus difficiles à écrire du CE2.",
      "Découpe-le pour le retenir : au-jour-d'-hui. L'apostrophe est au milieu, et le mot se termine par « hui ».",
      "Il contient un « h » qu'on n'entend pas et une apostrophe qu'on oublie. Écris-le trois fois de suite dans ton cahier : c'est le seul moyen.",
      "On écrit « Aujourd'hui ».",
    ),
    tags: ["ce2", "classes-mots", "adverbe", "lexique", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_cm_adverbes_frequents_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_adverbes_frequents",
    difficulty: 3,
    theme: "neutral",
    text: "« aujourd'hui » est un mot difficile à écrire.\n\nQuel truc t'aide à t'en souvenir ?",
    format: "qcm",
    choices: [
      "Je le découpe en morceaux que je reconnais : au + JOUR + d' + hui. Et c'est bien du jour qu'il parle.",
      // L'erreur réelle : écrire ce qu'on entend, et perdre le h et l'apostrophe.
      "Je l'écris comme je l'entends : aujourdui.",
      "Je cherche sa famille : il vient du verbe « aujourder ».",
      "Je compte ses syllabes avant de l'écrire.",
    ],
    expected: [
      "Je le découpe en morceaux que je reconnais : au + JOUR + d' + hui. Et c'est bien du jour qu'il parle.",
    ],
    comparator: "mcq_exact",
    hint: "Regarde s'il n'y aurait pas un mot que tu connais déjà caché dedans.",
    explanation: exp(
      "Les mots invariables ne se devinent pas : on les apprend de l'œil et de la main.",
      "Découpe le mot en morceaux que tu reconnais, et recopie-le plusieurs fois.",
      "au-JOUR-d'-hui : le mot « jour » est caché dedans, et c'est bien du jour qu'il parle. Reste l'apostrophe, qui est au milieu.",
      "On peut le découper : au + jour + d' + hui, avec l'apostrophe au milieu.",
    ),
    tags: ["ce2", "classes-mots", "adverbe", "methode", "qcm"],
  },

  /* =========================================================
     CE2_CM_VARIABLES
  ========================================================= */
  {
    kind: "template",
    id: "ce2_cm_variables_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_variables",
    difficulty: 2,
    theme: "neutral",
    hint: "Essaie de le mettre au pluriel, dans ta tête.",
    tags: ["ce2", "classes-mots", "invariables", "template"],
    generate: () => {
      const invariable = Math.random() < 0.5;
      const m = invariable
        ? randomChoice(MOTS_INVARIABLES)
        : randomChoice(MOTS_VARIABLES).singulier;
      const pluriel = MOTS_VARIABLES.find((x) => x.singulier === m)?.pluriel ?? m;
      return {
        text: `Le mot « ${m} » change-t-il quand il y en a plusieurs ?`,
        format: "qcm" as const,
        choices: ["oui, il est variable", "non, il est invariable"],
        expected: [invariable ? "non, il est invariable" : "oui, il est variable"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot variable change de forme selon le genre et le nombre. Un mot invariable s'écrit toujours pareil.",
          "Mets le mot au pluriel dans ta tête, puis au féminin. S'il ne bouge ni l'un ni l'autre, il est invariable.",
          invariable
            ? `« ${m} » s'écrit pareil qu'il y en ait un ou mille. Les adverbes sont tous comme ça.`
            : `un ${m} → des ${pluriel}. Le mot a bougé : il est variable.`,
          `« ${m} » est ${invariable ? "invariable" : "variable"}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_cm_variables_tpl_3",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_variables",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois de ces mots bougeraient. Un seul resterait tel quel.",
    tags: ["ce2", "classes-mots", "invariables", "template"],
    generate: () => {
      const p = randomChoice(
        PHRASES.filter((x) => x.adverbes.length > 0 && x.adjectifs.length > 0 && x.noms.length > 0),
      );
      const bon = p.adverbes[0];
      return {
        text: `Lis : « ${p.phrase} »\n\nSi tu mettais tout au pluriel, quel mot ne changerait PAS ?`,
        format: "qcm" as const,
        choices: shuffle([bon, p.noms[0], p.adjectifs[0], p.verbe]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le nom, l'adjectif, le déterminant et le verbe sont variables : ils portent des marques de genre, de nombre ou de personne. L'adverbe, lui, ne bouge jamais.",
          "Passe la phrase au pluriel dans ta tête et regarde chaque mot l'un après l'autre.",
          `« ${p.noms[0]} », « ${p.adjectifs[0]} » et « ${p.verbe} » prendraient tous une marque. « ${bon} » resterait « ${bon} ».`,
          `Le mot qui ne changerait pas est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_cm_variables_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_variables",
    difficulty: 2,
    theme: "neutral",
    hint: "Certains noms ne prennent pas un « s » : ils prennent un « x », ou changent de fin.",
    tags: ["ce2", "classes-mots", "invariables", "template"],
    generate: () => {
      const m = randomChoice(MOTS_VARIABLES);
      const autres = shuffle(MOTS_VARIABLES.filter((x) => x.pluriel !== m.pluriel)).map(
        (x) => x.pluriel,
      );
      return {
        text: `Comment s'écrit « ${m.singulier} » quand il y en a plusieurs ?`,
        format: "qcm" as const,
        choices: choix(m.pluriel, [`${m.singulier}s`, `${m.singulier}x`], autres),
        expected: [m.pluriel],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot variable change quand il y en a plusieurs. C'est ce qui l'oppose aux mots invariables.",
          "Ajoute la marque du pluriel — le plus souvent un « s », parfois un « x », parfois toute la fin change.",
          `un ${m.singulier} → des ${m.pluriel}. Le mot a bougé : il est variable.`,
          `On écrit « ${m.pluriel} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_cm_variables_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_variables",
    difficulty: 3,
    theme: "neutral",
    text: "Comment fais-tu pour savoir si un mot est variable ou invariable ?",
    format: "qcm",
    choices: [
      "Je le mets au pluriel dans ma tête : un letchi → des letchis, il a bougé ; toujours → toujours, il n'a pas bougé.",
      // L'erreur réelle : lire le « s » déjà présent comme une marque de pluriel.
      "Je regarde s'il se termine déjà par un « s ».",
      "Je regarde sa classe : les noms sont variables, tout le reste ne l'est pas.",
      "Je regarde s'il est court : les mots courts sont invariables.",
    ],
    expected: [
      "Je le mets au pluriel dans ma tête : un letchi → des letchis, il a bougé ; toujours → toujours, il n'a pas bougé.",
    ],
    comparator: "mcq_exact",
    hint: "Il y a un test que tu peux faire dans ta tête, sur n'importe quel mot.",
    explanation: exp(
      "Un mot variable change de forme selon le genre et le nombre ; un mot invariable garde toujours la même.",
      "Mets le mot au pluriel, puis au féminin, dans ta tête. S'il ne bouge ni l'un ni l'autre, il est invariable.",
      "un letchi → des letchis : il a bougé, il est variable. toujours → toujours : rien n'a bougé, il est invariable.",
      "On essaie de le mettre au pluriel : s'il ne change pas, il est invariable.",
    ),
    tags: ["ce2", "classes-mots", "invariables", "methode", "qcm"],
  },

  /* =========================================================
     CE2_CM_DEFI — reconnaitre la classe SANS qu'on la nomme
  ========================================================= */
  {
    kind: "template",
    id: "ce2_cm_defi_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Sept classes possibles. Demande-toi d'abord ce que ce mot fait dans la phrase.",
    tags: ["ce2", "classes-mots", "defi", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const classe = randomChoice(TOUTES_CLASSES.filter((c) => motsDe(p, c).length > 0));
      const mot = randomChoice(motsDe(p, classe));
      return {
        text: `Lis : « ${p.phrase} »\n\nQuelle est la classe du mot « ${mot} » ?`,
        format: "qcm" as const,
        choices: choix(
          LABEL_CLASSE[classe],
          TOUTES_CLASSES.map((c) => LABEL_CLASSE[c]),
        ),
        expected: [LABEL_CLASSE[classe]],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque mot d'une phrase appartient à une classe : nom, déterminant, adjectif, verbe, pronom, adverbe.",
          "Demande-toi ce que le mot FAIT : il nomme ? il annonce un nom ? il le décrit ? il dit l'action ? il remplace le sujet ? il dit comment ?",
          `« ${mot} » est un ${LABEL_CLASSE[classe]} dans cette phrase.`,
          `« ${mot} » est un ${LABEL_CLASSE[classe]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_cm_defi_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le mot qui accompagne le VERBE, pas celui qui accompagne le nom.",
    tags: ["ce2", "classes-mots", "defi", "template"],
    generate: () => {
      const p = randomChoice(
        PHRASES.filter((x) => x.adverbes.length > 0 && x.adjectifs.length > 0),
      );
      const adverbe = p.adverbes[0];
      const adjectif = p.adjectifs[0];
      return {
        text: `Lis : « ${p.phrase} »\n\nDans cette phrase, « ${adverbe} » et « ${adjectif} » se ressemblent : tous deux ajoutent un détail. Lequel des deux accompagne le VERBE ?`,
        format: "qcm" as const,
        choices: shuffle([adverbe, adjectif, p.verbe, p.noms[0]]),
        expected: [adverbe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'adjectif décrit un nom et s'accorde avec lui. L'adverbe accompagne un verbe et ne change jamais.",
          "Demande-toi ce que chaque mot décrit : une chose, ou une action ?",
          `« ${adjectif} » dit comment est « ${p.noms[0]} ». « ${adverbe} » dit comment se passe « ${p.verbe} ». Seul le second est un adverbe.`,
          `C'est « ${adverbe} » qui accompagne le verbe.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_cm_defi_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce2_cm_defi",
    difficulty: 3,
    theme: "neutral",
    // Le cran de plus : personne ne nomme la classe. Il faut la trouver, et
    // les trois pièges sont les trois raccourcis — la place, la terminaison,
    // la lettre finale.
    hint: "Regarde ce que le mot fait, pas où il est placé.",
    tags: ["ce2", "classes-mots", "defi", "methode"],
    generate: () => {
      const p = randomChoice(phrasesAvec("adverbe"));
      const mot = p.adverbes[0];
      const bonne = `Je regarde ce que le mot FAIT : il répond à « ${p.verbe} comment ? », et il ne changera pas au pluriel. C'est un adverbe.`;
      return {
        text: `Dans « ${p.phrase} », comment trouves-tu à quelle classe appartient le mot « ${mot} » ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // LE piège de la notion : la place ne fait pas la classe.
          "Je regarde où il est placé dans la phrase : la place donne la classe.",
          "Je regarde sa terminaison : elle donne toujours la classe.",
          "Je regarde s'il porte un « s » : les mots avec un « s » sont des noms.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Pour trouver la classe d'un mot, on regarde ce qu'il fait dans la phrase, pas où il est placé.",
          "Pose la question au verbe : comment ? quand ? où ? Si le mot répond et qu'il ne change jamais, c'est un adverbe.",
          `${p.verbe} comment ? ${mot}. Et « ${mot} » s'écrira pareil au pluriel.`,
          `« ${mot} » est un adverbe.`,
        ),
      };
    },
  },
];
