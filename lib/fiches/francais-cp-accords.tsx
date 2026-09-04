// ─── Fiche d'activité : les mots qui s'accordent (CP) ─────────────────────────
// ONZIÈME FICHE DU CYCLE 2. Le pendant écrit de la conjugaison : là où le verbe
// suivait son sujet, ici le nom entraine avec lui son déterminant et son adjectif.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE N'EST PAS CELLE DE LA CONJUGAISON. La fiche
// `conjugaison` disait déjà que la marque du pluriel ne s'entend pas ; la
// répéter n'apprendrait rien. Ce qui est propre à cette notion-ci, c'est que
// **le pluriel n'est pas une marque sur UN mot, c'est une marque sur TOUT LE
// GROUPE** : « un joli vélo » → « de jolis vélos », trois mots changent d'un
// coup. Le BO l'appelle la « chaine d'accords » et c'est le mot juste — on ne
// peut pas en tirer un maillon tout seul. « des pomme » n'existe pas.
//
// ⭐ ET C'EST LE DÉTERMINANT QUI PRÉVIENT. Le pool le pose : « c'est le petit
// mot devant qui prévient. L'enfant qui écrit ce qu'il entend oublie le s,
// systématiquement, et il a de bonnes raisons. » On ne lui demande donc pas
// d'entendre le s — on lui apprend à REGARDER le petit mot d'avant.
//
// ⭐ LE PLURIEL SE DESSINE, ce qui est rare pour de l'orthographe : le canvas
// `objets` a un champ `nombre` qui répète l'objet. « une pomme » à côté de
// « des pommes », ce sont deux dessins différents pour deux écritures
// différentes — et pour un seul son.
//
// ⭐ POURQUOI CETTE NOTION MAINTENANT : ses 8 micros convergent tous sur
// `cp_orth_defi`, et ses deux racines (`cp_gram_determinant`,
// `cp_dict_mot_courant`) sont couvertes par des fiches déjà écrites — les
// classes de mots et la dictée. Un objet cohérent.
//
// Les 8 micros sont couvertes :
// - cp_orth_masculin_feminin → propriété 1, entrainements 1 et 2
// - cp_orth_marque_feminin   → propriété 1, exemple 1, entrainement 3
// - cp_orth_accord_det_nom   → propriété 2, entrainement 4
// - cp_orth_marque_pluriel   → figure, propriété 2, méthode 1, entrainements 5 et 6
// - cp_orth_chaine_accords   → propriété 3, exemple 2, entrainement 7
// - cp_orth_sujet_verbe      → propriété 4, entrainement 8
// - cp_orth_mot_invariable   → propriété 4, entrainement 9
// - cp_orth_defi             → méthode 2, entrainement 10
//
// ⛔ PAS DE FÉMININ IRRÉGULIER au-delà des exemples du BO, et pas d'adjectif
// éloigné du nom : c'est le CE1. Ici, les trois mots se touchent.
//
// Les exemples sont ceux du BO, repris tels quels : un petit garçon → une petite
// fille ; le chien → deux chiens ; un joli vélo → de jolis vélos ; le chat
// miaule → les chats miaulent.
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/orthographe.bank.ts`.

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

function lignes(opts: { modele?: string; aRepasser?: boolean; largeur?: number }) {
  return (
    <div className="reglure">
      <CanvasRenderer
        figure={{
          kind: "reglure",
          modele: opts.modele,
          lignes: 3,
          interligne: 3,
          aRepasser: opts.aRepasser,
          depart: true,
          size: { width: opts.largeur ?? 250 },
        }}
      />
    </div>
  );
}

/** ⭐ Une boite par mot. `.dessin-mots` le fait échapper au plafond de largeur
 *  du cycle 2 : un dessin qui porte du texte devient illisible si on le
 *  rétrécit au lieu de le raccourcir. */
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
 * ⭐⭐ LA FIGURE MONTRE LE PLURIEL AU LIEU DE LE DIRE. Une pomme d'un côté,
 * trois de l'autre : les dessins ne se ressemblent pas, alors que les deux
 * étiquettes se disent presque pareil. C'est tout l'écart entre ce qu'on voit
 * et ce qu'on entend, et c'est précisément là que le s se perd.
 */
const uneEtPlusieurs = objets({
  elements: [
    { quoi: "pomme", label: "une pomme" },
    { quoi: "pomme", nombre: 3, label: "des pommes" },
  ],
  colonnes: 2,
  consigne: "Ça se dit presque pareil. Ça ne s'écrit pas pareil.",
  largeur: 300,
});

const garconEtFille = etiquettes({
  cases: ["un petit garçon", "une petite fille"],
  focus: [1],
  legende: "Au féminin, le déterminant ET l'adjectif prennent un e.",
  largeur: 320,
});

const leDeterminantPrevient = etiquettes({
  cases: ["le chien", "deux chiens"],
  focus: [1],
  legende: "« deux » annonce plusieurs : le nom doit suivre.",
  largeur: 300,
});

/** ⭐⭐ LA CHAINE : trois mots, trois marques, un seul changement de sens. Le
 *  mot du BO, et le dessin qui le montre. */
const laChaineDAccords = etiquettes({
  cases: ["un joli vélo", "de jolis vélos"],
  focus: [1],
  legende: "Trois mots changent d'un coup : on ne tire pas un maillon tout seul.",
  largeur: 320,
});

const leSujetEntraineLeVerbe = etiquettes({
  cases: ["le chat miaule", "les chats miaulent"],
  focus: [1],
  legende: "Le sujet passe au pluriel, le verbe suit.",
  largeur: 320,
});

const jeRegardeLePetitMot = perso({
  personnage: "nina",
  pose: "montre",
  expression: "pense",
  bulle: { texte: "des… donc un s !" },
  consigne: "Je regarde le petit mot devant AVANT d'écrire le nom.",
});

const toutBougeEnsemble = perso({
  personnage: "teo",
  pose: "bras_leves",
  expression: "surpris",
  bulle: { texte: "Tout le groupe !", forme: "cri" },
  consigne: "Quand un mot du groupe change, les autres changent avec lui.",
});

/* ─── Les dessins DES EXERCICES ────────────────────────────────────────────────
   ⭐⭐ AU CYCLE 2, UN EXERCICE SE FAIT AU CRAYON.
   ⛔ Ni `consigne` ni `legende` ici : l'énoncé numéroté les porte déjà.
   ⛔ Et aucune `marque` : entourer d'avance, c'est donner la réponse. */

const exUnOuUne = objets({
  elements: [
    { quoi: "bateau", label: "… bateau" },
    { quoi: "fleur", label: "… fleur" },
  ],
  colonnes: 2,
  largeur: 260,
});

const exPetitPetite = etiquettes({
  cases: ["un petit garçon", "une … fille"],
  largeur: 300,
});

const exUneOuDes = objets({
  elements: [
    { quoi: "chat", label: "un chat" },
    { quoi: "chat", nombre: 3, label: "des …" },
  ],
  colonnes: 2,
  largeur: 280,
});

const exDeuxFleurs = objets({
  elements: [{ quoi: "fleur", nombre: 2, label: "deux …" }],
  largeur: 200,
});

const exChaine = etiquettes({
  cases: ["un joli vélo", "de … …"],
  largeur: 300,
});

const exSujetVerbe = etiquettes({
  cases: ["les chats", "miaule"],
  largeur: 260,
});

const exGroupeAEcrire = lignes({ largeur: 300 });

const exMotsInvariables = etiquettes({
  cases: ["avec", "dans", "pour", "toujours"],
  largeur: 300,
});

const exToutBouge = perso({
  personnage: "teo",
  pose: "bras_leves",
  expression: "surpris",
  bulle: { texte: "Tout le groupe !", forme: "cri" },
  largeur: 230,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheAccordsCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "orthographe",
  // ⛔ Pas de deux-points : tous les h2 reprennent ce titre après un.
  titre: `Les mots qui s'accordent au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "« des pomme » n'existe pas : quand un mot du groupe passe au pluriel, tous les autres suivent.",
  identite: [],
  definition: {
    texte: [
      "Les mots d'un groupe vont ensemble : le petit mot devant, le nom, et l'adjectif s'il y en a un.",
      "Quand il y en a plusieurs, ils prennent presque tous un s — et ce s ne s'entend pas. « une pomme » et « des pommes » se disent presque pareil.",
      "C'est le petit mot devant qui prévient : « des », « deux », « les » annoncent plusieurs. On le regarde AVANT d'écrire le nom.",
    ].join("\n\n"),
  },
  figure: {
    schema: uneEtPlusieurs,
  },
  proprietes: [
    {
      titre: "Masculin ou féminin",
      texte: "un petit garçon → une petite fille. Le e se met partout dans le groupe.",
      schema: garconEtFille,
      micros: ["cp_orth_masculin_feminin", "cp_orth_marque_feminin"],
    },
    {
      titre: "Le petit mot devant prévient",
      texte: "le chien → deux chiens. « deux » annonce plusieurs, le nom prend un s.",
      schema: leDeterminantPrevient,
      micros: ["cp_orth_accord_det_nom", "cp_orth_marque_pluriel"],
    },
    {
      titre: "Tout le groupe change en même temps",
      texte: "un joli vélo → de jolis vélos. Trois mots, trois marques.",
      schema: laChaineDAccords,
      micros: ["cp_orth_chaine_accords"],
    },
    {
      titre: "Le sujet entraine le verbe",
      texte: "le chat miaule → les chats miaulent. Et quelques mots ne bougent jamais : avec, dans, pour.",
      schema: leSujetEntraineLeVerbe,
      micros: ["cp_orth_sujet_verbe", "cp_orth_mot_invariable"],
    },
  ],
  reel: {
    texte:
      "C'est ce qui sépare une phrase parlée d'une phrase écrite : à l'oral personne n'entend le s, à l'écrit tout le monde le voit.",
  },
  historique: { texte: "" },
  methode: [
    {
      titre: "Je regarde le petit mot devant",
      texte: "« des », « deux », « les » : ils annoncent plusieurs. J'écris le s après.",
      schema: jeRegardeLePetitMot,
      micros: ["cp_orth_marque_pluriel", "cp_orth_accord_det_nom"],
    },
    {
      titre: "Je vérifie tout le groupe",
      texte: "Le petit mot, le nom, l'adjectif : si l'un change, je regarde les autres.",
      schema: toutBougeEnsemble,
      micros: ["cp_orth_chaine_accords", "cp_orth_defi"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Du garçon à la fille",
      donnees: "« un petit garçon »",
      question: "Comment l'écrire au féminin ?",
      solution:
        "« une petite fille ». Le petit mot devient « une », et l'adjectif prend un e : les deux changent, pas seulement le nom.",
      schema: garconEtFille,
      micros: ["cp_orth_marque_feminin"],
    },
    {
      titre: "Trois mots d'un coup",
      donnees: "« un joli vélo »",
      question: "Et s'il y en a plusieurs ?",
      solution:
        "« de jolis vélos ». Le déterminant, l'adjectif ET le nom changent ensemble. On ne peut pas écrire « de joli vélos ».",
      schema: laChaineDAccords,
      micros: ["cp_orth_chaine_accords", "cp_orth_defi"],
    },
  ],
  pieges: [
    "Le s du pluriel ne s'entend pas : c'est le petit mot devant qui prévient.",
    "On n'accorde jamais un seul mot du groupe : si le nom prend un s, l'adjectif aussi.",
  ],
  aRetenir: [
    "Les mots d'un groupe s'accordent entre eux.",
    "Au féminin, on ajoute souvent un e : un petit garçon → une petite fille.",
    "Au pluriel, on ajoute souvent un s, et il ne s'entend pas.",
    "Le petit mot devant prévient : des, deux, les annoncent plusieurs.",
    "Quand le sujet est au pluriel, le verbe suit : les chats miaulent.",
  ],
  /* ⭐ Dix exercices, neuf avec un support. Les corrections s'impriment sur
     leur propre page. */
  entrainement: [
    {
      question: "Écris « un » ou « une » devant chaque dessin.",
      correction: "« un bateau » et « une fleur ». On essaie les deux à voix haute : un seul se dit.",
      schema: exUnOuUne,
      micros: ["cp_orth_masculin_feminin"],
    },
    {
      /* ⛔ L'ÉNONCÉ SE DONNAIT SA PROPRE RÉPONSE (vu au rendu, 04/09) : il
         demandait le genre de « une souris » — l'article était déjà écrit, il
         n'y avait plus rien à chercher. Le mot se pose donc NU, et c'est le
         test du pool qui tranche : « essaie un devant, puis une ». */
      question: "« souris » : est-ce masculin ou féminin ? Écris le petit mot devant.",
      correction: "Féminin : « une souris ». On essaie les deux à voix haute, un seul se dit.",
      micros: ["cp_orth_masculin_feminin"],
    },
    {
      question: "Complète l'adjectif qui manque.",
      correction: "« une petite fille ». Au féminin, l'adjectif prend un e de plus.",
      schema: exPetitPetite,
      micros: ["cp_orth_marque_feminin"],
    },
    {
      question: "Écris le nom qui manque après « des ».",
      correction: "« des chats », avec un s. « des » annonce plusieurs.",
      schema: exUneOuDes,
      micros: ["cp_orth_accord_det_nom"],
    },
    {
      question: "Écris le nom qui manque après « deux ».",
      correction: "« deux fleurs », avec un s — même si on ne l'entend pas.",
      schema: exDeuxFleurs,
      micros: ["cp_orth_marque_pluriel"],
    },
    {
      question: "« une pomme » et « des pommes » : entend-on une différence ?",
      correction: "Presque pas. C'est le petit mot devant qui prévient, et l'œil qui voit le s.",
      micros: ["cp_orth_marque_pluriel"],
    },
    {
      question: "Écris le groupe au pluriel. Attention : trois mots changent.",
      correction: "« de jolis vélos ». Le déterminant, l'adjectif et le nom, tous les trois.",
      schema: exChaine,
      micros: ["cp_orth_chaine_accords"],
    },
    {
      question: "Le sujet est au pluriel. Corrige le verbe.",
      correction: "« les chats miaulent ». Le sujet entraine le verbe.",
      schema: exSujetVerbe,
      micros: ["cp_orth_sujet_verbe"],
    },
    {
      question: "Entoure les mots qui ne changent JAMAIS, même au pluriel.",
      correction: "Les quatre : avec, dans, pour, toujours. Ce sont des mots invariables.",
      schema: exMotsInvariables,
      micros: ["cp_orth_mot_invariable"],
    },
    {
      question: "Écris « le petit chat dort » avec plusieurs chats, puis vérifie tout le groupe.",
      correction: "« les petits chats dorment ». Quatre mots changent : le, petit, chat et le verbe.",
      schema: exGroupeAEcrire,
      micros: ["cp_orth_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesAccordsCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Les accords - CP",
    section: {
      type: "objectif",
      phrase: "On n'accorde pas un mot, on accorde un groupe",
      sousPhrase: "« des pomme » n'existe pas.",
      encadre: {
        titre: "L'idée",
        texte: "Le petit mot devant prévient, et tout le groupe suit.",
      },
    },
    schema: uneEtPlusieurs,
  },
  {
    titre: "Tout bouge ensemble",
    badge: "Les accords - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "un joli vélo", texte: "un seul" },
        { titre: "de jolis vélos", texte: "trois mots changent" },
        { titre: "les chats miaulent", texte: "le verbe suit aussi" },
      ],
    },
    schema: laChaineDAccords,
  },
  {
    titre: "Avant d'écrire le nom",
    badge: "Les accords - CP",
    section: {
      type: "etapes",
      etapes: [
        "Je regarde le petit mot devant.",
        "S'il annonce plusieurs, j'ajoute un s.",
        "Je vérifie l'adjectif et le verbe.",
      ],
    },
    schema: jeRegardeLePetitMot,
  },
  {
    titre: "À vous",
    badge: "Les accords - CP",
    section: {
      type: "exercice",
      enonce: "« un joli vélo »",
      question: "Comment l'écrire s'il y en a plusieurs ?",
      indice: "Compte les mots du groupe : combien doivent changer ?",
      correction: "« de jolis vélos » — les trois, pas seulement le nom.",
    },
    schema: toutBougeEnsemble,
  },
];
