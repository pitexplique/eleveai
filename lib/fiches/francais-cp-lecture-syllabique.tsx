// ─── Fiche d'activité : lire en assemblant les syllabes (CP) ──────────────────
// HUITIÈME FICHE DU CYCLE 2. Elle suit `grapheme_phoneme` : on sait quelles
// lettres font quels sons, on apprend à les ASSEMBLER pour lire.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE VIENT DU POOL, ET C'EST UN PIÈGE DE COMPORTEMENT, PAS DE
// SAVOIR : « le mot deviné sur sa première syllabe. Un enfant qui voit "cha…"
// lit "chat" et ne va pas plus loin — alors que c'était "chapeau". » Il ne lui
// manque aucune connaissance : il a arrêté de lire. La fiche ne lui apprend
// donc pas une règle de plus, elle lui apprend à ALLER JUSQU'AU BOUT.
//
// ⭐ ET LE PIÈGE SE DESSINE, ce qui est rare : « un chat » et « un chapeau »
// existent tous deux dans la bibliothèque d'objets. Les poser côte à côte sous
// le même début « cha… » dit tout ce qu'un paragraphe expliquerait.
//
// ⭐ LA FUSION, ELLE, EST UN GESTE : « fais glisser le premier son sur le
// deuxième, sans t'arrêter au milieu ». Ce n'est pas « b puis a », c'est un
// mouvement continu — la formule du pool est reprise telle quelle.
//
// ⭐ POURQUOI CETTE NOTION MAINTENANT : ses 5 micros forment UNE SEULE CHAINE,
// sans embranchement — syllabes → mots → mots fréquents → phrase → défi. Aucune
// ligne de fracture, donc aucune décision de découpage à prendre.
//
// Les 5 micros sont couvertes :
// - cp_lec_syllabes_cv    → propriété 1, entrainements 1, 2 et 3
// - cp_lec_mots_simples   → propriété 2, exemple 1, entrainements 4 et 5
// - cp_lec_mots_frequents → propriété 3, entrainement 6
// - cp_lec_phrase_simple  → propriété 4, méthode 2, entrainements 7 et 8
// - cp_lec_defi           → figure, méthode 1, exemple 2, entrainements 9 et 10
//
// ⛔ AUCUNE NOTATION PHONÉTIQUE, comme sur les deux fiches précédentes : un son
// se nomme par un mot qui le contient.
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/lecture-syllabique.bank.ts`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ObjetsElement,
  PersonnageBulle,
  PersonnageExpression,
  PersonnageId,
  PersonnagePose,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

function objets(opts: {
  elements: ObjetsElement[];
  colonnes?: number;
  mode?: "couleur" | "coloriage";
  consigne?: string;
  largeur?: number;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "objets",
        elements: opts.elements,
        colonnes: opts.colonnes,
        mode: opts.mode ?? "coloriage",
        consigne: opts.consigne,
        size: { width: opts.largeur ?? 250 },
      }}
    />
  );
}

function perso(opts: {
  personnage: PersonnageId;
  pose?: PersonnagePose;
  expression?: PersonnageExpression;
  bulle?: PersonnageBulle;
  mode?: "couleur" | "coloriage";
  consigne?: string;
  largeur?: number;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "personnage",
        personnage: opts.personnage,
        pose: opts.pose,
        expression: opts.expression,
        bulle: opts.bulle,
        mode: opts.mode ?? "coloriage",
        consigne: opts.consigne,
        size: { width: opts.largeur ?? 250 },
      }}
    />
  );
}

/**
 * ⭐ LE CANVAS DE LA PHRASE SERT DE JEU D'ÉTIQUETTES : une boite par lettre, par
 * syllabe ou par mot. `.dessin-mots` le fait échapper au plafond de largeur du
 * cycle 2 — un dessin qui porte du texte ne se raccourcit pas quand on le
 * rétrécit, il devient illisible.
 * ⚠️ Pas de `nature` au-dessus des boites courtes : elles se centrent sur leur
 * boite et se chevauchent dès qu'elles sont plus larges qu'elle.
 */
function etiquettes(opts: {
  cases: string[];
  focus?: number[];
  legende?: string;
  largeur?: number;
}) {
  const mots: PhraseCanvasMot[] = opts.cases.map((c, i) => ({
    texte: c,
    focus: opts.focus?.includes(i),
  }));
  return (
    <div className="dessin-mots">
      <CanvasRenderer
        figure={{
          kind: "phrase",
          mots,
          legende: opts.legende,
          largeurMax: opts.largeur ?? 280,
        }}
      />
    </div>
  );
}

// ─── Les dessins ──────────────────────────────────────────────────────────────

/**
 * ⭐⭐ LA FIGURE EST LE PIÈGE LUI-MÊME. Deux mots commencent par « cha » et ne
 * disent pas la même chose. L'enfant qui devine sur le début choisit au hasard ;
 * celui qui lit jusqu'au bout n'a rien à deviner.
 */
const chaEtLaSuite = objets({
  elements: [
    { quoi: "chat", label: "un chat" },
    { quoi: "chapeau", label: "un chapeau" },
  ],
  colonnes: 2,
  consigne: "Les deux commencent par « cha ». Seule la suite les sépare.",
  largeur: 280,
});

const fairreGlisser = etiquettes({
  cases: ["b", "a", "ba"],
  focus: [2],
  legende: "On fait glisser le premier son sur le deuxième, sans s'arrêter.",
  largeur: 280,
});

const assemblerLesSyllabes = etiquettes({
  cases: ["cha", "peau", "chapeau"],
  focus: [2],
  legende: "Deux morceaux collés l'un à l'autre font un mot.",
  largeur: 300,
});

/** ⭐ Les mots outils ne se déchiffrent pas, ils se reconnaissent : ce sont les
 *  seuls mots du CP qu'on lit sans les découper. */
const lesMotsQuOnConnait = etiquettes({
  cases: ["le", "la", "un", "et", "est"],
  legende: "Ceux-là, on les reconnait d'un coup d'œil.",
  largeur: 300,
});

const laPhraseEtSesBlancs = etiquettes({
  cases: ["Le", "chat", "dort", "."],
  legende: "Quatre mots, trois blancs, et un point tout au bout.",
  largeur: 300,
});

const lireJusquAuBout = perso({
  personnage: "teo",
  pose: "montre",
  expression: "surpris",
  bulle: { texte: "cha… peau !" },
  consigne: "Je ne m'arrête pas au début du mot.",
});

const suivreDuDoigt = perso({
  personnage: "nina",
  pose: "montre",
  expression: "pense",
  bulle: { texte: "Le — chat — dort.", forme: "pensee" },
  consigne: "Je pose mon doigt et j'avance mot par mot.",
});

/* ─── Les dessins DES EXERCICES ────────────────────────────────────────────────
   ⭐⭐ AU CYCLE 2, UN EXERCICE SE FAIT AU CRAYON (règle du 03/09/2026).
   ⛔ Ni `consigne` ni `legende` sur ces dessins-là : l'énoncé numéroté les porte
   déjà, et la répéter sous le dessin fait deux déchiffrages pour une seule
   instruction.
   ⛔ Et aucune `marque` : entourer d'avance, c'est donner la réponse. */

const exFusion = etiquettes({ cases: ["m", "i"], largeur: 220 });

const exQuatreSyllabes = etiquettes({ cases: ["ba", "bi", "bo", "la"], largeur: 280 });

const exAssembler = etiquettes({ cases: ["la", "pin"], largeur: 240 });

const exTroisMorceaux = etiquettes({ cases: ["pa", "pil", "lon"], largeur: 280 });

const exMotsOutils = etiquettes({ cases: ["le", "chat", "un", "et"], largeur: 280 });

const exCompterLesMots = etiquettes({
  cases: ["Le", "chat", "dort", "."],
  largeur: 300,
});

const exLePoint = etiquettes({
  cases: ["Ma", "tortue", "mange", "."],
  largeur: 300,
});

const exChaOuChapeau = objets({
  elements: [
    { quoi: "chat", label: "un chat" },
    { quoi: "chapeau", label: "un chapeau" },
  ],
  colonnes: 2,
  largeur: 260,
});

const exJusquAuBout = perso({
  personnage: "teo",
  pose: "montre",
  expression: "surpris",
  bulle: { texte: "cha… peau !" },
  largeur: 240,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureSyllabiqueCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "lecture_syllabique",
  // ⛔ Pas de deux-points : tous les h2 reprennent ce titre après un.
  titre: `Lire en assemblant les syllabes au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "« cha… » ne suffit pas : c'est peut-être « chat », c'est peut-être « chapeau ». On lit jusqu'au bout.",
  identite: [],
  definition: {
    texte: [
      "Lire, c'est faire glisser les sons les uns sur les autres : b et a font « ba », sans s'arrêter au milieu.",
      "Ensuite on colle les morceaux : « cha » et « peau » font « chapeau ».",
      "Et surtout, on lit le mot EN ENTIER. Deviner sur le début, c'est se tromper une fois sur deux : « cha… », c'est peut-être « chat », c'est peut-être « chapeau ».",
    ].join("\n\n"),
  },
  figure: {
    schema: chaEtLaSuite,
  },
  proprietes: [
    {
      titre: "Deux lettres glissent l'une sur l'autre",
      texte: "b et a ne font pas « b, a » : ils font « ba », d'un seul souffle.",
      schema: fairreGlisser,
      micros: ["cp_lec_syllabes_cv"],
    },
    {
      titre: "Les morceaux se collent",
      texte: "cha + peau = chapeau. On dit les morceaux de plus en plus vite.",
      schema: assemblerLesSyllabes,
      micros: ["cp_lec_mots_simples"],
    },
    {
      titre: "Quelques mots se reconnaissent d'un coup",
      texte: "le, la, un, et, est : on les voit tous les jours, on ne les découpe plus.",
      schema: lesMotsQuOnConnait,
      micros: ["cp_lec_mots_frequents"],
    },
    {
      titre: "Une phrase, ce sont des mots séparés par des blancs",
      texte: "On compte les blancs, puis on ajoute un. Et le point ferme tout.",
      schema: laPhraseEtSesBlancs,
      micros: ["cp_lec_phrase_simple"],
    },
  ],
  reel: {
    texte:
      "C'est le moment où on n'a plus besoin de personne : dès qu'on assemble les syllabes, on peut lire un mot qu'on n'a jamais vu.",
  },
  historique: { texte: "" },
  methode: [
    {
      titre: "Je lis jusqu'au bout",
      texte: "Même si je crois avoir deviné, je regarde ce qui reste après le début.",
      schema: lireJusquAuBout,
      micros: ["cp_lec_defi"],
    },
    {
      titre: "Je suis la phrase du doigt",
      texte: "Un mot à la fois, du début au point, sans sauter de blanc.",
      schema: suivreDuDoigt,
      micros: ["cp_lec_phrase_simple"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Coller deux morceaux",
      donnees: "la — pin",
      question: "Quel mot cela fait-il ?",
      solution: "« lapin ». On dit les deux morceaux de plus en plus vite jusqu'à les coller.",
      schema: assemblerLesSyllabes,
      micros: ["cp_lec_mots_simples"],
    },
    {
      titre: "Le mot deviné trop tôt",
      donnees: "Un élève voit « cha… » et lit « chat ». Le mot était « chapeau ».",
      question: "Qu'a-t-il oublié de faire ?",
      solution:
        "Regarder ce qu'il reste après « cha ». Il n'a pas mal lu : il a arrêté de lire.",
      schema: chaEtLaSuite,
      micros: ["cp_lec_defi"],
    },
  ],
  pieges: [
    "Deviner un mot sur sa première syllabe : « cha… » peut être chat ou chapeau.",
    "S'arrêter entre les deux lettres d'une syllabe : b-a ne fait pas « ba ».",
  ],
  aRetenir: [
    "On fait glisser les sons l'un sur l'autre, sans s'arrêter au milieu.",
    "On colle les morceaux : cha + peau = chapeau.",
    "le, la, un, et, est : ces mots-là se reconnaissent d'un coup d'œil.",
    "Dans une phrase, chaque mot est séparé du suivant par un blanc.",
    "On lit le mot jusqu'au bout, même quand on croit avoir deviné.",
  ],
  /* ⭐ Dix exercices, neuf avec un support à entourer, colorier, relier ou
     compléter. Les corrections s'impriment sur leur propre page. */
  entrainement: [
    {
      question: "Colle les deux lettres et écris la syllabe qu'elles font.",
      correction: "« mi ». On fait glisser le m sur le i, sans s'arrêter au milieu.",
      schema: exFusion,
      micros: ["cp_lec_syllabes_cv"],
    },
    {
      question: "Entoure les syllabes qui commencent par la lettre b.",
      correction: "« ba », « bi » et « bo ». « la » commence par un l.",
      schema: exQuatreSyllabes,
      micros: ["cp_lec_syllabes_cv"],
    },
    {
      question: "Que font ensemble les lettres p et a ?",
      correction: "« pa », d'un seul souffle.",
      micros: ["cp_lec_syllabes_cv"],
    },
    {
      question: "Colle les deux morceaux et écris le mot.",
      correction: "« lapin ».",
      schema: exAssembler,
      micros: ["cp_lec_mots_simples"],
    },
    {
      question: "Colle les trois morceaux et écris le mot.",
      correction: "« papillon ». On les dit de plus en plus vite jusqu'à les coller.",
      schema: exTroisMorceaux,
      micros: ["cp_lec_mots_simples"],
    },
    {
      question: "Barre le seul qui ne soit pas un mot qu'on reconnait d'un coup d'œil.",
      correction: "On barre « chat » : il se déchiffre. « le », « un » et « et » se reconnaissent.",
      schema: exMotsOutils,
      micros: ["cp_lec_mots_frequents"],
    },
    {
      question: "Compte les blancs, puis écris combien il y a de mots.",
      correction: "Trois blancs, donc quatre étiquettes — mais trois mots, car le point n'en est pas un.",
      schema: exCompterLesMots,
      micros: ["cp_lec_phrase_simple"],
    },
    {
      question: "Entoure ce qui ferme la phrase.",
      correction: "Le point, tout au bout.",
      schema: exLePoint,
      micros: ["cp_lec_phrase_simple"],
    },
    {
      question: "« cha… » : entoure les DEUX dessins que ce début pourrait annoncer.",
      correction: "Les deux : « un chat » et « un chapeau ». Le début ne suffit jamais.",
      schema: exChaOuChapeau,
      micros: ["cp_lec_defi"],
    },
    {
      question: "Téo lisait « chat ». Qu'a-t-il fait pour trouver le bon mot ?",
      correction: "Il a regardé ce qui restait après « cha ». Il a lu jusqu'au bout.",
      schema: exJusquAuBout,
      micros: ["cp_lec_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesLectureSyllabiqueCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Lire les syllabes - CP",
    section: {
      type: "objectif",
      phrase: "On lit jusqu'au bout",
      sousPhrase: "« cha… », c'est chat ou chapeau ?",
      encadre: {
        titre: "L'idée",
        texte: "Deviner sur le début, c'est se tromper une fois sur deux.",
      },
    },
    schema: chaEtLaSuite,
  },
  {
    titre: "Les sons glissent",
    badge: "Lire les syllabes - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "b + a", texte: "ba" },
        { titre: "cha + peau", texte: "chapeau" },
        { titre: "Le geste", texte: "sans s'arrêter au milieu" },
      ],
    },
    schema: fairreGlisser,
  },
  {
    titre: "Je suis la phrase du doigt",
    badge: "Lire les syllabes - CP",
    section: {
      type: "etapes",
      etapes: [
        "Je pose mon doigt au début.",
        "J'avance d'un mot à chaque blanc.",
        "Je m'arrête au point.",
      ],
    },
    schema: suivreDuDoigt,
  },
  {
    titre: "À vous",
    badge: "Lire les syllabes - CP",
    section: {
      type: "exercice",
      enonce: "la — pin",
      question: "Quel mot font ces deux morceaux collés ?",
      indice: "Dis-les l'un après l'autre, de plus en plus vite.",
      correction: "« lapin ».",
    },
    schema: assemblerLesSyllabes,
  },
];
