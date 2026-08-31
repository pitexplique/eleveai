// ─── Fiche de cours : le sens des mots et leurs relations (4e) ────────────────
// LA SIXIÈME FICHE DE FRANÇAIS DE LA 4e.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020. L'objectif « Enrichir et structurer
// le lexique » y énumère sept attendus ; cinq sont ici, les deux autres — la
// formation des mots et l'orthographe lexicale — feront la fiche suivante.
//
// ⭐⭐ CE QUE CETTE FICHE APPORTE À TOUTES LES AUTRES : LE LEXIQUE N'EST PAS UNE
// PHRASE, et le canvas `phrase` ne peut donc pas tout porter. Deux canvas de
// MATHÉMATIQUES font ici un travail que rien d'autre ne fait :
//
//   • `number_line` pour le DEGRÉ D'INTENSITÉ. Le catalogue dit qu'elle sert
//     « position, ordre, comparaison » : une échelle crainte → peur → épouvante
//     est un ordre, et elle se lit d'un coup d'œil. ⚠️ `showValues: false` —
//     l'échelle n'a pas de nombres, seulement des mots.
//   • `schema_barre` pour le DEGRÉ DE GÉNÉRALITÉ. Le catalogue dit « un tout
//     découpé en parts » : « un animal » découpé en chien, chat, oiseau montre
//     l'inclusion, et deux barres empilées montrent l'emboitement.
//
// ⛔ CE SONT DEUX AXES DIFFÉRENTS, et le programme les nomme ensemble —
// « maîtriser leur classement par degré d'intensité ET de généralité ». Les
// élèves les confondent parce qu'on les leur enseigne avec le même mot,
// « plus ». Deux dessins différents, c'est la seule façon de les séparer.
//
// ⭐ Suite de `francais-4e-lecture-comprehension.tsx` : l'arc de question
// (violet, fléché) va de ce qu'on cherche vers ce qui l'explique. Ici il montre
// que la phrase porte elle-même l'explication du mot rare.
//
// Alignée sur les tables DEGRES, CONNOTATION et RELATIONS de
// lib/tutor-v4/questionBank/4e/francais/vocabulaire.bank.ts et sur les tables
// CONTEXTE et RELATIONS de socle-lexique-discours.bank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `vocabulaire_sens`) :
// - 4e_voc_contexte                → figure, propriété 1, formule, méthode 1,
//                                    exemple 1
// - 4e_voc_relations               → propriété 2, méthode 2, exemple 2
// - 4e_voc_intensite_generalite    → propriétés 3 et 4, méthode 3, exemples 3 et 4
// - 4e_voc_denotation_connotation  → propriété 5, méthode 4, exemples 5 et 6
// - 4e_voc_homonymie_polysemie     → propriété 6, méthode 5, exemple 7
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin `phrase` ;
// la couleur vient du `label` du groupe, jamais de l'appelant.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
  NumberLineCanvasPoint,
} from "@/lib/tutor-v4/types";
import type { SchemaBarrePart } from "@/lib/tutor-v4/types_canvas";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  groupes?: PhraseCanvasGroupe[];
  liens?: PhraseCanvasLien[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** L'échelle d'INTENSITÉ. ⚠️ `showValues: false` : il n'y a pas de nombres sur
 *  une échelle de mots, seulement un ordre. Et la droite est plate — une droite
 *  n'a rien à montrer en hauteur (l'étalon de 2de). */
function echelle(points: NumberLineCanvasPoint[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min: 0,
        max: 4,
        step: 1,
        points,
        size: { width: 235, height: 78 },
        display: { showTicks: false, showValues: false, showZero: false },
      }}
    />
  );
}

/** L'emboitement de GÉNÉRALITÉ : le générique est le tout, le particulier une
 *  part. Deux barres l'une sous l'autre montrent qu'on peut descendre encore. */
function barre(total: string, parts: SchemaBarrePart[]) {
  return (
    <CanvasRenderer
      figure={{ kind: "schema_barre", total, parts, size: { width: 205, height: 110 } }}
    />
  );
}

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Ce qui se dessine dans le lexique ────────────────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : la phrase porte l'explication du mot rare, et
//    l'arc de question va de l'un à l'autre.
const contexteCoi = phrase({
  mots: [
    { texte: "Il" },
    { texte: "resta" },
    { texte: "coi", focus: true },
    { texte: "," },
    { texte: "incapable" },
    { texte: "de" },
    { texte: "répondre", focus: true },
    { texte: "un" },
    { texte: "mot" },
    { texte: "." },
  ],
  liens: [{ de: 2, vers: 6, label: "expliqué par", type: "question" }],
  legende: "Le mot rare est à gauche, son explication à droite. Elle est dans la phrase.",
});

const contexteProlixe = phrase({
  mots: [
    { texte: "Son" },
    { texte: "discours" },
    { texte: "était" },
    { texte: "si" },
    { texte: "prolixe", focus: true },
    { texte: "que" },
    { texte: "personne" },
    { texte: "n'en" },
    { texte: "retint", focus: true },
    { texte: "rien" },
    { texte: "." },
  ],
  liens: [{ de: 4, vers: 8, label: "conséquence", type: "question" }],
  legende: "Ici c'est la conséquence qui éclaire : trop long, donc rien retenu.",
});

// ── FAMILLE contre CHAMP LEXICAL : parenté de FORME, parenté de SENS.
const familleRadical = phrase({
  mots: [
    { texte: "terre", focus: true },
    { texte: "terrestre", focus: true },
    { texte: "atterrir", focus: true },
    { texte: "enterrer", focus: true },
  ],
  groupes: [{ mots: [0, 3], label: "même radical" }],
  legende: "Une FAMILLE : la même suite de lettres revient. Parenté de forme.",
});

const champLexicalTheme = phrase({
  mots: [
    { texte: "voile" },
    { texte: "mât" },
    { texte: "écume" },
    { texte: "marée" },
  ],
  groupes: [{ mots: [0, 3], label: "même thème" }],
  legende: "Un CHAMP LEXICAL : aucun radical commun, mais un seul monde. Parenté de sens.",
});

// ── L'INTENSITÉ : un ordre, donc une échelle.
const echelleSentiment = echelle([
  { value: 1, label: "la crainte" },
  { value: 2, label: "la peur" },
  { value: 3, label: "l'épouvante" },
]);

const echelleTemperature = echelle([
  { value: 1, label: "tiède" },
  { value: 2, label: "chaud" },
  { value: 3, label: "brulant" },
]);

const echelleVoix = echelle([
  { value: 1, label: "murmurer" },
  { value: 2, label: "parler" },
  { value: 3, label: "hurler" },
]);

// ── LA GÉNÉRALITÉ : une inclusion, donc un tout et ses parts.
const inclusionAnimal = barre("un animal", [
  { label: "un chien" },
  { label: "un chat" },
  { label: "un oiseau" },
  { label: "…" },
]);

const inclusionChien = barre("un chien", [
  { label: "un caniche" },
  { label: "un berger" },
  { label: "…" },
]);

// ── DÉNOTATION et CONNOTATION : même objet désigné, jugement différent.
const connotationNeutre = phrase({
  mots: [
    { texte: "Il" },
    { texte: "habite" },
    { texte: "un" },
    { texte: "logement", focus: true },
    { texte: "en" },
    { texte: "ville" },
    { texte: "." },
  ],
  legende: "« Logement » désigne, et ne juge pas. C'est la dénotation seule.",
});

const connotationNegative = phrase({
  mots: [
    { texte: "Il" },
    { texte: "habite" },
    { texte: "un" },
    { texte: "taudis", focus: true },
    { texte: "en" },
    { texte: "ville" },
    { texte: "." },
  ],
  legende: "Même objet, mais « taudis » ajoute un mépris. C'est la connotation.",
});

const connotationValorisante = phrase({
  mots: [
    { texte: "Il" },
    { texte: "habite" },
    { texte: "une" },
    { texte: "demeure", focus: true },
    { texte: "en" },
    { texte: "ville" },
    { texte: "." },
  ],
  legende: "Toujours le même objet, et « demeure » le grandit.",
});

// ── POLYSÉMIE et HOMONYMIE : un seul mot, ou deux qui se ressemblent.
const polysemiePied = phrase({
  mots: [
    { texte: "le" },
    { texte: "pied", focus: true },
    { texte: "de" },
    { texte: "la" },
    { texte: "table" },
    { texte: "·" },
    { texte: "le" },
    { texte: "pied", focus: true },
    { texte: "du" },
    { texte: "coureur" },
  ],
  liens: [{ de: 1, vers: 7, label: "même mot", type: "reprise" }],
  legende: "POLYSÉMIE : un seul mot, et ses deux sens se tiennent — ce qui porte.",
});

const homonymieVer = phrase({
  mots: [
    { texte: "le" },
    { texte: "ver", focus: true },
    { texte: "de" },
    { texte: "terre" },
    { texte: "·" },
    { texte: "le" },
    { texte: "verre", focus: true },
    { texte: "d'eau" },
  ],
  legende: "HOMONYMIE : deux mots différents, que le hasard fait sonner pareil.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireSens4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "vocabulaire-sens",
  titre: `Le sens des mots et leurs relations en 4e (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Il habite un logement. » « Il habite un taudis. » « Il habite une demeure. » C'est le même endroit dans les trois phrases : rien n'a changé dehors. Ce qui change, c'est ce que le mot choisi fait entendre — et donc ce qu'on apprend, non pas sur le lieu, mais sur celui qui parle.",
  identite: [
    { label: "Mots clés", valeur: "Contexte, famille, champ lexical, intensité, connotation" },
    { label: "Le secret", valeur: "Deux axes : plus fort, ou plus large" },
    { label: "Outil", valeur: "Cacher le mot et relire la phrase" },
  ],
  definition: {
    texte:
      "Un mot ne vaut jamais seul. Il vaut par la PHRASE qui l'entoure, qui porte presque toujours de quoi le comprendre — une explication, une conséquence, une opposition. Il vaut aussi par les mots auxquels il se relie : ceux de sa FAMILLE, qui partagent son radical, et ceux de son CHAMP LEXICAL, qui partagent son thème sans lui ressembler. Il se range enfin sur deux axes qu'il ne faut pas confondre : celui de l'INTENSITÉ — la crainte, la peur, l'épouvante disent le même sentiment de plus en plus fort — et celui de la GÉNÉRALITÉ — un caniche est un chien, un chien est un animal. Et par-dessus tout cela, un mot DÉSIGNE quelque chose et en même temps SUGGÈRE un jugement : c'est la différence entre la dénotation et la connotation.",
  },
  figure: {
    schema: pile(contexteCoi, contexteProlixe),
    legende:
      "Deux phrases où un mot rare s'explique tout seul. L'arc violet part du mot qu'on ne connait pas et pointe vers ce qui l'éclaire : une explication en haut, une conséquence en bas. Inférer, ce n'est pas deviner — c'est lire ce que la phrase dit AUTOUR du mot.",
  },
  proprietes: [
    {
      titre: "La phrase porte l'explication",
      texte:
        "Une explication, une conséquence, une opposition, un exemple : le contexte donne presque toujours de quoi cerner un mot jamais rencontré.",
      schema: pile(contexteCoi, contexteProlixe),
      micros: ["4e_voc_contexte"],
    },
    {
      titre: "Famille et champ lexical ne se ressemblent pas",
      texte:
        "La famille partage un RADICAL — terre, terrestre, atterrir. Le champ lexical partage un THÈME, avec des mots qui n'ont rien de commun à l'œil.",
      schema: pile(familleRadical, champLexicalTheme),
      micros: ["4e_voc_relations"],
    },
    {
      titre: "L'intensité est une échelle",
      texte:
        "Les mots disent la même chose, de plus en plus fort. On peut les ranger dans l'ordre, comme des points sur une droite.",
      schema: pile(echelleSentiment, echelleTemperature),
      micros: ["4e_voc_intensite_generalite"],
    },
    {
      titre: "La généralité est un emboitement",
      texte:
        "Ce n'est pas « plus fort », c'est « plus large ». Le mot générique contient les autres : un chien est une part de « animal », un caniche une part de « chien ».",
      schema: pile(inclusionAnimal, inclusionChien),
      micros: ["4e_voc_intensite_generalite"],
    },
    {
      titre: "Un mot désigne, et en même temps il juge",
      texte:
        "Logement, taudis, demeure désignent le même endroit. Le premier est neutre, le deuxième méprise, le troisième grandit — et rien du lieu n'a changé.",
      schema: pile(connotationNeutre, connotationNegative, connotationValorisante),
      micros: ["4e_voc_denotation_connotation"],
    },
    {
      titre: "Un seul mot, ou deux qui se ressemblent",
      texte:
        "Le pied de la table et le pied du coureur : un seul mot, deux sens qui se tiennent — c'est la polysémie. Le ver et le verre : deux mots différents, et le hasard.",
      schema: pile(polysemiePied, homonymieVer),
      micros: ["4e_voc_homonymie_polysemie"],
    },
  ],
  reel: {
    texte:
      "La connotation est l'outil le plus employé du monde, et personne ne le nomme. Une offre d'emploi parle d'un poste « exigeant » là où un salarié dirait « épuisant » : le travail est le même. Un article écrit « manifestants » ou « casseurs » selon le journal, et décrit la même rue. Un vendeur dit « d'occasion », un autre « vintage », un troisième « usagé » — même objet, trois prix. Repérer le mot qui juge, c'est repérer d'où l'on vous parle. C'est exactement ce que le programme appelle « développer son esprit critique », et cela commence par le vocabulaire, pas par les grandes déclarations.",
  },
  historique: {
    texte:
      "Les mots dérivent, et parfois ils tombent. « Vilain » désignait simplement un paysan, un habitant de la villa ; le mépris est venu avec le temps, et il est resté quand le paysan a disparu du mot. « Idiot » voulait dire « simple particulier » en grec, quelqu'un qui ne s'occupe pas des affaires publiques. « Travail » vient du latin tripalium, un instrument de torture à trois pieux. À l'inverse, « formidable » signifiait « qui inspire la terreur » — de formido, l'effroi — et le voilà devenu un compliment. Rien de tout cela n'a été décidé : ce sont des millions de gens qui, en parlant, ont fait glisser les mots. La connotation d'aujourd'hui est la dénotation de demain.",
  },
  formule: {
    contexte: "Le geste qui fait trouver le sens d'un mot inconnu, sans dictionnaire.",
    expression: "je cache le mot, et je relis la phrase entière",
    legende:
      "Ce qui reste donne déjà la moitié du sens : « Il resta ___, incapable de répondre un mot. » On sait qu'il s'est tu, avant même de savoir ce que « coi » veut dire. Il ne reste plus qu'à choisir la proposition qui se loge dans le trou.",
    schema: contexteCoi,
  },
  methode: [
    {
      titre: "Cacher le mot avant de deviner",
      texte:
        "Relis la phrase sans lui. Cherche ensuite ce qui l'éclaire : un « incapable de », un « si… que », un « mais », deux points. C'est là qu'est la réponse.",
      schema: contexteProlixe,
      micros: ["4e_voc_contexte"],
    },
    {
      titre: "Pour trancher famille ou champ lexical : chercher les lettres",
      texte:
        "Une suite de lettres commune ? C'est une famille. Rien de commun à l'œil, mais un même monde ? C'est un champ lexical.",
      schema: pile(familleRadical, champLexicalTheme),
      micros: ["4e_voc_relations"],
    },
    {
      titre: "Se demander : plus FORT, ou plus LARGE ?",
      texte:
        "« Plus fort » range sur une échelle : crainte, peur, épouvante. « Plus large » emboite : caniche, chien, animal. Ce ne sont pas les mêmes questions.",
      schema: pile(echelleVoix, inclusionAnimal),
      micros: ["4e_voc_intensite_generalite"],
    },
    {
      titre: "Pour la connotation : remplacer par le mot neutre",
      texte:
        "Récris la phrase avec le mot le plus plat que tu trouves. Si le sens factuel ne bouge pas mais que le ton change, tu tenais une connotation.",
      schema: pile(connotationNegative, connotationNeutre),
      micros: ["4e_voc_denotation_connotation"],
    },
    {
      titre: "Pour polysémie ou homonymie : chercher le lien entre les sens",
      texte:
        "Les deux sens se tiennent par une image — ce qui porte, ce qui est en bas ? C'est un seul mot, donc polysémie. Aucun rapport ? Deux mots, donc homonymie.",
      schema: pile(polysemiePied, homonymieVer),
      micros: ["4e_voc_homonymie_polysemie"],
    },
  ],
  usages: [
    {
      titre: "Pour lire la presse : repérer le mot qui juge",
      detail:
        "« Manifestants » ou « casseurs », « migrants » ou « réfugiés » : la même rue, deux mots, deux camps. Le fait est identique ; le mot vous place.",
      schema: pile(connotationNegative, connotationValorisante),
      micros: ["4e_voc_denotation_connotation"],
    },
    {
      titre: "Pour écrire : choisir l'intensité juste",
      detail:
        "« Il fut surpris » n'est pas « il fut stupéfait ». Placer son mot sur la bonne marche de l'échelle, c'est ce qui distingue une copie précise d'une copie approximative.",
      schema: echelleSentiment,
      micros: ["4e_voc_intensite_generalite"],
    },
    {
      titre: "Pour comprendre seul : le contexte avant le dictionnaire",
      detail:
        "Dans un contrôle, tu n'as pas de dictionnaire. Tu as toujours la phrase — et elle suffit dans la plupart des cas.",
      schema: contexteCoi,
      micros: ["4e_voc_contexte"],
    },
  ],
  exemples: [
    {
      titre: "Un mot jamais rencontré",
      donnees: "« La foule s'égailla dans toutes les rues dès la fin du concert. »",
      schema: contexteCoi,
      question: "Que signifie « s'égailla » ?",
      solution:
        "Cache le mot : « La foule ___ dans toutes les rues. » « Dans toutes les rues » suppose un éparpillement, pas un rassemblement ni une joie. « S'égailler », c'est SE DISPERSER. La phrase portait la réponse — il fallait la lire au lieu de deviner.",
      micros: ["4e_voc_contexte"],
    },
    {
      titre: "Famille ou champ lexical ?",
      donnees: "« voile, mât, écume, cabotage, marée »",
      schema: champLexicalTheme,
      question: "Quelle relation lie ces mots ?",
      solution:
        "Aucune suite de lettres ne revient : ce n'est pas une famille. Mais tous appartiennent au monde de la mer : c'est un CHAMP LEXICAL. Une famille serait « mer, marin, maritime, amerrir » — là, le radical se voit.",
      micros: ["4e_voc_relations"],
    },
    {
      titre: "L'axe de l'intensité",
      donnees: "« la crainte → l'épouvante »",
      schema: echelleSentiment,
      question: "Que change-t-on en passant de l'un à l'autre ?",
      solution:
        "C'est le même sentiment, en plus fort : on monte d'une marche sur l'échelle de l'INTENSITÉ. On n'a pas changé de catégorie — l'épouvante n'est pas une sorte de crainte, c'est de la crainte poussée à bout.",
      micros: ["4e_voc_intensite_generalite"],
    },
    {
      titre: "L'axe de la généralité",
      donnees: "« un animal → un caniche »",
      schema: pile(inclusionAnimal, inclusionChien),
      question: "Que change-t-on ici ?",
      solution:
        "Rien n'est « plus fort » : on RESSERRE. Le caniche est une sorte de chien, et le chien une sorte d'animal. C'est l'axe de la GÉNÉRALITÉ, et c'est un emboitement, pas une échelle. Confondre les deux axes est l'erreur la plus fréquente de cette leçon.",
      micros: ["4e_voc_intensite_generalite"],
    },
    {
      titre: "Le mot qui juge",
      donnees: "« un logement → un taudis »",
      schema: pile(connotationNeutre, connotationNegative),
      question: "Qu'est-ce qui a changé entre les deux ?",
      solution:
        "Rien du lieu : c'est le même endroit. « Taudis » désigne la même chose que « logement » — c'est la DÉNOTATION, identique — mais il y ajoute un jugement négatif : c'est la CONNOTATION. Ce que la phrase nous apprend, c'est donc ce que pense celui qui parle.",
      micros: ["4e_voc_denotation_connotation"],
    },
    {
      titre: "Et dans l'autre sens",
      donnees: "« une maison → une demeure »",
      schema: connotationValorisante,
      question: "Même exercice.",
      solution:
        "Même mécanisme, jugement inverse : « demeure » grandit ce que « maison » désignait platement. La connotation n'est pas toujours péjorative — elle peut valoriser, ou marquer un registre familier ou soutenu.",
      micros: ["4e_voc_denotation_connotation"],
    },
    {
      titre: "Un mot ou deux ?",
      donnees: "« le mousse du bateau » et « la mousse au chocolat »",
      schema: homonymieVer,
      question: "Polysémie ou homonymie ?",
      solution:
        "Cherche le lien entre les deux sens : un jeune marin et une crème fouettée n'ont rigoureusement rien de commun. Ce sont donc DEUX mots différents, que le hasard fait sonner pareil : c'est de l'HOMONYMIE. Pour « le pied de la table » et « le pied du coureur », le lien existe — ce qui porte, ce qui est en bas —, et c'est de la polysémie.",
      micros: ["4e_voc_homonymie_polysemie"],
    },
  ],
  pieges: [
    "Confondre les deux axes : « plus fort » range sur une échelle, « plus large » emboite. L'épouvante n'est pas une sorte de crainte.",
    "Prendre un champ lexical pour une famille : « mer » et « voile » parlent du même monde, mais n'ont aucun radical commun.",
    "Croire qu'un mot connoté est un mot faux : « taudis » est parfaitement exact — il ajoute simplement un jugement.",
    "Croire que la connotation est toujours péjorative : « demeure » valorise, et c'est une connotation aussi.",
    "Trancher polysémie ou homonymie à l'oreille : les deux sonnent pareil. Le test est le LIEN entre les sens, pas le son.",
    "Chercher un mot dans le dictionnaire avant d'avoir relu la phrase : elle porte la réponse dans la plupart des cas.",
  ],
  aRetenir: [
    "Le contexte porte presque toujours l'explication d'un mot rare : cache le mot et relis.",
    "Famille = même radical, parenté de forme. Champ lexical = même thème, parenté de sens.",
    "Deux axes différents : l'INTENSITÉ est une échelle, la GÉNÉRALITÉ est un emboitement.",
    "Un mot DÉSIGNE (dénotation) et en même temps SUGGÈRE un jugement (connotation).",
    "Polysémie : un seul mot, des sens qui se tiennent. Homonymie : deux mots, et le hasard.",
  ],
  entrainement: [
    {
      question: "« Il fit une réponse laconique : “Non.” Et rien de plus. » Que signifie « laconique » ?",
      correction: "Très brève — « Non. Et rien de plus » donne la réponse dans la phrase.",
      micros: ["4e_voc_contexte"],
    },
    {
      question: "« chant, chanteur, chantonner, déchanter » : quelle relation ?",
      correction: "Une famille de mots : ils partagent tous le radical « chant ».",
      micros: ["4e_voc_relations"],
    },
    {
      question: "« hurler → murmurer » : quel axe, et dans quel sens ?",
      correction: "L'intensité, en descendant : c'est la même action, atténuée.",
      micros: ["4e_voc_intensite_generalite"],
    },
    {
      question: "« un fruit → une mangue » : quel axe ?",
      correction: "La généralité : on resserre. La mangue est une sorte de fruit.",
      micros: ["4e_voc_intensite_generalite"],
    },
    {
      question: "« un cheval → un canasson » : qu'ajoute le second mot ?",
      correction: "Un jugement négatif. La dénotation est la même, la connotation méprise.",
      micros: ["4e_voc_denotation_connotation"],
    },
    {
      question: "« l'aile de l'oiseau » et « l'aile du bâtiment » : polysémie ou homonymie ?",
      correction: "Polysémie : un seul mot, et les deux sens se tiennent — ce qui s'étend sur le côté.",
      micros: ["4e_voc_homonymie_polysemie"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesVocabulaireSens4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le sens des mots - 4e",
    section: {
      type: "objectif",
      phrase: "Un mot ne vaut jamais seul",
      sousPhrase:
        "Il vaut par la phrase qui l'entoure, par les mots auxquels il se relie, et par le jugement qu'il glisse sans le dire.",
      encadre: {
        titre: "L'idée",
        texte: "« Un logement », « un taudis », « une demeure » : le même endroit, trois fois.",
      },
    },
  },
  {
    titre: "Le contexte porte la réponse",
    badge: "Le sens des mots - 4e",
    section: {
      type: "etapes",
      etapes: [
        "Je cache le mot que je ne connais pas.",
        "Je relis la phrase entière : elle donne déjà la moitié du sens.",
        "Je cherche ce qui éclaire : « incapable de », « si… que », « mais », deux points.",
        "Je choisis la proposition qui se loge dans le trou.",
      ],
    },
    schema: contexteCoi,
  },
  {
    titre: "Deux axes, pas un",
    badge: "Le sens des mots - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "Plus FORT — l'intensité",
        contenu: "crainte → peur → épouvante. Une échelle : le même sentiment, poussé.",
      },
      droite: {
        titre: "Plus LARGE — la généralité",
        contenu: "caniche → chien → animal. Un emboitement : une sorte de.",
      },
    },
    schema: pile(echelleSentiment, inclusionAnimal),
  },
  {
    titre: "Ce que le mot désigne, ce qu'il suggère",
    badge: "Le sens des mots - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "« un logement »", texte: "Désigne, et ne juge pas. Dénotation seule." },
        { titre: "« un taudis »", texte: "Même endroit, et un mépris en plus." },
        { titre: "« une demeure »", texte: "Même endroit, et il grandit." },
        { titre: "Ce qu'on apprend", texte: "Rien sur le lieu. Tout sur celui qui parle." },
      ],
    },
    schema: pile(connotationNeutre, connotationNegative, connotationValorisante),
  },
  {
    titre: "Un mot, ou deux ?",
    badge: "Le sens des mots - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "Polysémie",
        contenu: "« le pied de la table », « le pied du coureur ». Un seul mot : les sens se tiennent.",
      },
      droite: {
        titre: "Homonymie",
        contenu: "« le ver de terre », « le verre d'eau ». Deux mots, et le hasard.",
      },
    },
    schema: pile(polysemiePied, homonymieVer),
  },
  {
    titre: "À vous",
    badge: "Le sens des mots - 4e",
    section: {
      type: "exercice",
      enonce: "« le mousse du bateau » et « la mousse au chocolat »",
      question: "Polysémie ou homonymie ?",
      indice: "Cherche un lien de sens entre les deux. S'il n'y en a aucun, ce sont deux mots.",
      correction:
        "Un jeune marin et une crème fouettée n'ont rien de commun : deux mots différents que le hasard fait sonner pareil. C'est de l'HOMONYMIE.",
    },
    schema: homonymieVer,
  },
];
