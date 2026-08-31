// ─── Fiche de cours : jouer avec les mots (5e) ────────────────────────────────
// LA TROISIÈME FICHE DE VOCABULAIRE DE LA 5e. Elle suit `vocabulaire-enrichir`
// (attraper un mot) et `vocabulaire-relations` (le relier aux autres) : ici, le
// mot BOUGE — il change de sens dans une autre phrase, ou il entre tout neuf
// dans la langue.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ». La
// compétence « Réemployer son lexique et jouer avec les mots » y porte deux
// objectifs : « Utiliser les mots en exploitant les variations de sens » et
// « Comprendre le fonctionnement du néologisme (de forme et de sens) ».
// ⛔ CE N'EST PAS LE PROGRAMME DE LA 4e. Ne rien transposer.
//
// ⭐ CE QUE LA 4e NE FAIT PAS, ET QU'IL FAUT GARDER. `francais-4e-vocabulaire-
// sens.tsx` demande « polysémie ou homonymie ? » — une question de classement.
// La 5e ne classe pas : elle CHOISIT le sens qui va avec la phrase, et c'est
// pour cela que la banque range ses lignes PAR PAIRES. Le même mot, deux
// phrases, deux sens : « la note était salée » et « la soupe était salée ». Le
// piège d'un exercice est l'autre sens du même mot, jamais un sens étranger.
//
// ⭐⭐ LES QUATRE PORTES D'ENTRÉE D'UN MOT SE DESSINENT, ET CHACUNE AVEC LE
// CANVAS QUI DIT SON MÉCANISME — c'est la règle du CATALOGUE (« le canvas se
// choisit pour ce qu'il MONTRE ») appliquée à quatre cas voisins qu'on
// confondrait s'ils portaient la même image :
//   • le néologisme DE FORME    → `conjugaison` en wagons : le mot est
//     FABRIQUÉ, on voit les morceaux (co + voitur + age) ;
//   • le néologisme DE SENS     → deux `phrase` : le mot ne bouge pas, la
//     phrase autour de lui a changé ;
//   • l'EMPRUNT                 → une `phrase` étiquetée de sa langue d'origine ;
//   • le SIGLE                  → une `phrase` où chaque mot est une initiale,
//     et le groupe montre ce que les lettres cachaient.
// ⛔ La correspondance des wagons est celle de `francais-4e-vocabulaire-
// formation.tsx` et ne change pas : temps = préfixe (orange), radical = radical
// (bleu), personne = suffixe (vert).
//
// Alignée sur les tables VARIATIONS et NEOLOGISMES de
// lib/tutor-v4/questionBank/5e/francais/vocabulaire-discours.bank.ts.
//
// Micro-compétences couvertes (les 2 de la notion `vocabulaire_jouer`) :
// - 5e_voc_variations_sens → figure, propriétés 1 à 3, formule, méthodes 1 et 2,
//                            usage 1, exemples 1 à 3
// - 5e_voc_neologisme      → propriétés 4 à 6, méthodes 3 et 4, usages 2 et 3,
//                            exemples 4 à 6
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin `phrase` ;
// la couleur vient du `role` ou du `label`, jamais de l'appelant ; un mot par
// entrée, ponctuation comprise ; les blocs n'interprètent pas le markdown ; et
// aucun caractère d'une autre écriture, emprunts compris.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ConjugaisonSegment,
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";
import type { SchemaBarrePart } from "@/lib/tutor-v4/types_canvas";

/** Le mot FABRIQUÉ, démonté en morceaux. ⛔ Correspondance FIXE des rôles :
 *  `temps` = préfixe (orange) · `radical` = radical (bleu) · `personne` =
 *  suffixe (vert). Le `note` écrit le vrai nom, en huit signes. */
function morceaux(opts: { segments: ConjugaisonSegment[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "wagons",
        segments: opts.segments,
        legende: opts.legende,
      }}
    />
  );
}

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

/** Le tout et ses parts : les quatre portes par lesquelles un mot entre. */
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

// ─── Ce qui se dessine quand un mot bouge ─────────────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : le même mot, deux phrases. Rien n'a changé dans
//    le mot ; tout a changé autour de lui.
const salePropre = phrase({
  mots: [
    { texte: "La" },
    { texte: "soupe" },
    { texte: "était" },
    { texte: "trop" },
    { texte: "salée", focus: true },
    { texte: "." },
  ],
  legende: "Sens PROPRE : on y a mis du sel. Le mot dit ce qu'il dit.",
});

const saleFigure = phrase({
  mots: [
    { texte: "La" },
    { texte: "note" },
    { texte: "du" },
    { texte: "restaurant" },
    { texte: "était" },
    { texte: "salée", focus: true },
    { texte: "." },
  ],
  legende: "Sens FIGURÉ : elle est trop chère. Personne n'a salé l'addition.",
});

const filPropre = phrase({
  mots: [
    { texte: "Le" },
    { texte: "fil", focus: true },
    { texte: "s'est" },
    { texte: "cassé" },
    { texte: "pendant" },
    { texte: "la" },
    { texte: "couture" },
    { texte: "." },
  ],
  legende: "Sens PROPRE : le brin de coton, celui qu'on tient entre les doigts.",
});

const filFigure = phrase({
  mots: [
    { texte: "Il" },
    { texte: "a" },
    { texte: "perdu" },
    { texte: "le" },
    { texte: "fil", focus: true },
    { texte: "de" },
    { texte: "son" },
    { texte: "histoire" },
    { texte: "." },
  ],
  legende: "Sens FIGURÉ : la suite logique. L'image du fil qu'on suit est restée.",
});

const mainPropre = phrase({
  mots: [
    { texte: "Sa" },
    { texte: "main" },
    { texte: "était" },
    { texte: "verte", focus: true },
    { texte: "de" },
    { texte: "peinture" },
    { texte: "." },
  ],
  legende: "Sens PROPRE : la couleur, sur la peau. On pourrait la photographier.",
});

const mainFigure = phrase({
  mots: [
    { texte: "Sa" },
    { texte: "grand-mère" },
    { texte: "a" },
    { texte: "la" },
    { texte: "main" },
    { texte: "verte", focus: true },
    { texte: "." },
  ],
  legende: "Sens FIGURÉ : elle fait pousser les plantes. Sa main n'est pas verte.",
});

// ── LES QUATRE PORTES. Un canvas différent par mécanisme, exprès.

// 1. LE NÉOLOGISME DE FORME : le mot est FABRIQUÉ. On voit les morceaux.
const neoForme = morceaux({
  segments: [
    { texte: "co", role: "temps", note: "ensemble" },
    { texte: "voitur", role: "radical", note: "voiture" },
    { texte: "age", role: "personne", note: "l'action" },
  ],
  legende: "« Covoiturage » : un mot neuf, bâti avec des morceaux très anciens.",
});

const neoFormeTele = morceaux({
  segments: [
    { texte: "télé", role: "temps", note: "au loin" },
    { texte: "travail", role: "radical", note: "radical" },
  ],
  legende: "« Télétravail » : travailler au loin. Le mot date de 2020, « télé- » de l'Antiquité.",
});

// 2. LE NÉOLOGISME DE SENS : le mot ne bouge pas, la phrase change.
const neoSensAnimal = phrase({
  mots: [
    { texte: "La" },
    { texte: "souris", focus: true },
    { texte: "a" },
    { texte: "filé" },
    { texte: "sous" },
    { texte: "l'armoire" },
    { texte: "." },
  ],
  legende: "Le sens ancien : la petite bête. Il n'a pas disparu.",
});

const neoSensObjet = phrase({
  mots: [
    { texte: "La" },
    { texte: "souris", focus: true },
    { texte: "de" },
    { texte: "l'ordinateur" },
    { texte: "ne" },
    { texte: "répond" },
    { texte: "plus" },
    { texte: "." },
  ],
  legende: "Le sens neuf : aucun mot n'a été fabriqué, on a prêté celui-ci.",
});

// 3. L'EMPRUNT : le mot arrive tout fait d'une autre langue.
const empruntFootball = phrase({
  mots: [
    { texte: "le" },
    { texte: "football", focus: true },
    { texte: "le" },
    { texte: "week-end" },
    { texte: "un" },
    { texte: "selfie" },
  ],
  groupes: [{ mots: [0, 5], label: "venus de l'anglais" }],
  legende: "Un EMPRUNT : le mot arrive tout fait, et le français le garde tel quel.",
});

// 4. LE SIGLE : les initiales se soudent, et l'on oublie ce qu'elles cachaient.
const sigleOvni = phrase({
  mots: [
    { texte: "objet", focus: true },
    { texte: "volant", focus: true },
    { texte: "non", focus: true },
    { texte: "identifié", focus: true },
  ],
  groupes: [{ mots: [0, 3], label: "un OVNI" }],
  legende: "Un SIGLE : quatre initiales soudées, et le mot se prononce comme un mot.",
});

// ── LES QUATRE PORTES ENSEMBLE : un tout, quatre parts.
const quatrePortes = barre("un mot neuf", [
  { label: "fabriqué" },
  { label: "sens neuf" },
  { label: "emprunté" },
  { label: "sigle" },
]);

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireJouer5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "vocabulaire-jouer",
  titre: `Jouer avec les mots en 5e (${ANNEE_SCOLAIRE})`,
  accroche:
    "« La note du restaurant était salée. » Personne n'a mis de sel dans l'addition. Le mot n'a pas bougé d'une lettre, et pourtant il ne dit plus la même chose — parce que la phrase autour de lui a changé. C'est le mouvement que fait la langue tous les jours : elle prête ses mots à des choses nouvelles plutôt que d'en inventer.",
  identite: [
    { label: "Mots clés", valeur: "Sens propre, sens figuré, néologisme, emprunt, sigle" },
    { label: "Le secret", valeur: "Le sens n'est pas dans le mot, il est dans la phrase" },
    { label: "Outil", valeur: "Se demander si l'on pourrait le photographier" },
  ],
  definition: {
    texte:
      "Un mot a rarement un seul sens. Le premier, celui qu'on peut montrer du doigt, est le SENS PROPRE : la soupe salée contient du sel. Le second vient par IMAGE, et c'est le SENS FIGURÉ : la note salée ne contient rien du tout, on a seulement gardé l'idée de ce qui pique. Aucun des deux n'est plus juste que l'autre — c'est la phrase, et elle seule, qui décide duquel il s'agit. Ce mouvement ne s'arrête jamais, et c'est ainsi que la langue se renouvelle : un mot NEUF peut être fabriqué avec des morceaux anciens (le néologisme de forme), un mot ANCIEN peut recevoir un sens neuf (le néologisme de sens), un mot peut arriver tout fait d'une autre langue (l'emprunt), ou naitre de quelques initiales soudées (le sigle). Quatre portes, et la plus empruntée est la deuxième : la langue préfère prêter ses mots plutôt qu'en inventer.",
  },
  figure: {
    schema: pile(salePropre, saleFigure),
    legende:
      "Le même mot, deux phrases, deux sens. En haut on peut goûter le sel ; en bas il n'y en a pas un grain, et pourtant tout le monde comprend. Ce qui est passé d'une phrase à l'autre, c'est l'IMAGE : ce qui pique. Voilà pourquoi le sens ne se cherche pas dans le mot, mais autour de lui.",
  },
  proprietes: [
    {
      titre: "Le sens propre se montre du doigt",
      texte:
        "C'est le sens premier, celui qu'on pourrait photographier : le fil de la couture, la main couverte de peinture, la soupe qui contient du sel.",
      schema: pile(filPropre, mainPropre),
      micros: ["5e_voc_variations_sens"],
    },
    {
      titre: "Le sens figuré passe par une image",
      texte:
        "On garde l'idée et l'on abandonne la chose : le fil qu'on suit devient la suite d'un récit, la main verte devient un talent.",
      schema: pile(filFigure, mainFigure),
      micros: ["5e_voc_variations_sens"],
    },
    {
      titre: "C'est la phrase qui tranche, jamais le mot",
      texte:
        "« Salée » n'est ni propre ni figuré tout seul. Mets-le dans une phrase : la soupe, ou la note. Le mot attend qu'on l'emploie.",
      schema: pile(salePropre, saleFigure),
      micros: ["5e_voc_variations_sens"],
    },
    {
      titre: "Un mot neuf peut être FABRIQUÉ",
      texte:
        "C'est le néologisme de forme : des morceaux anciens assemblés pour une chose nouvelle. Covoiturage, télétravail, cyberharcèlement, écoresponsable.",
      schema: pile(neoForme, neoFormeTele),
      micros: ["5e_voc_neologisme"],
    },
    {
      titre: "Un mot ancien peut recevoir un SENS neuf",
      texte:
        "C'est le néologisme de sens, et c'est la porte la plus fréquente : souris, naviguer, surfer, virus. Aucun mot n'a été inventé.",
      schema: pile(neoSensAnimal, neoSensObjet),
      micros: ["5e_voc_neologisme"],
    },
    {
      titre: "Un mot peut venir d'ailleurs, ou de quelques initiales",
      texte:
        "L'EMPRUNT arrive tout fait d'une autre langue : football, week-end, selfie. Le SIGLE naît de lettres soudées : SMS, OVNI, sida.",
      schema: pile(empruntFootball, sigleOvni),
      micros: ["5e_voc_neologisme"],
    },
    {
      titre: "Quatre portes, et une seule question",
      texte:
        "Le mot existait-il déjà ? S'il existait, c'est son sens qui est neuf. S'il est neuf, est-il fabriqué en français, emprunté, ou fait d'initiales ?",
      schema: quatrePortes,
      micros: ["5e_voc_neologisme"],
    },
  ],
  reel: {
    texte:
      "Ouvre ton téléphone : presque chaque mot que tu y lis est passé par l'une des quatre portes, et la plupart ont moins de trente ans. Tu déplaces une SOURIS qui n'est pas un animal, tu NAVIGUES sans bateau, tu SURFES sans planche, tu attrapes un VIRUS qui ne rend pas malade, tu enregistres tes mots de passe dans un COFFRE-FORT qui ne pèse rien. Aucun de ces mots n'a été inventé : on les a prêtés. À côté, le SMS et le wifi sont des sigles, le smartphone et le selfie des emprunts, le covoiturage et le télétravail des fabrications. Tu emploies une vingtaine de néologismes avant le petit-déjeuner, et tu les comprends tous — parce que l'image de départ est restée visible.",
  },
  historique: {
    texte:
      "En 1955, IBM France cherche un mot français pour remplacer computer et écrit à un professeur de lettres de la Sorbonne, Jacques Perret. Il répond par une lettre où il propose « ordinateur » — un vieux mot rare, presque oublié, qui désignait celui qui met en ordre. Le mot est repris, et il gagne : soixante-dix ans plus tard, tout le monde l'emploie sans savoir qu'un professeur de latin l'a tiré d'un dictionnaire poussiéreux. Le Québec a fait pareil avec « logiciel » et « courriel », qui ont traversé l'Atlantique dans l'autre sens. Cela dit une chose utile : un mot ne s'impose pas par décret, il s'impose quand les gens le trouvent commode. « Ordinateur » a réussi ; « fouineur » pour hacker et « frimousse » pour smiley ont échoué, et personne n'y peut rien.",
  },
  formule: {
    contexte: "Le test qui sépare le sens propre du sens figuré, en une seconde.",
    expression: "est-ce que je pourrais le photographier ?",
    legende:
      "Une main verte de peinture, ça se photographie : sens propre. La main verte d'une grand-mère qui fait pousser ses plantes, non : sens figuré. Le test marche parce que le sens figuré abandonne justement la chose et ne garde que l'idée.",
    schema: pile(mainPropre, mainFigure),
  },
  methode: [
    {
      titre: "Se demander si l'on pourrait le photographier",
      texte:
        "Si oui, sens propre. Si non — s'il ne reste qu'une idée, une image —, sens figuré. Le test est plus sûr que l'impression.",
      schema: mainFigure,
      micros: ["5e_voc_variations_sens"],
    },
    {
      titre: "Chercher l'autre sens du même mot",
      texte:
        "Le piège d'un exercice n'est jamais un sens étranger : c'est l'AUTRE emploi du même mot. Remets chaque sens dans la phrase et garde celui qui la laisse debout.",
      schema: pile(filPropre, filFigure),
      micros: ["5e_voc_variations_sens"],
    },
    {
      titre: "Pour un mot neuf : demander s'il existait déjà",
      texte:
        "S'il existait, c'est son sens qui est neuf. S'il est neuf, regarde s'il est fabriqué en français, venu d'ailleurs, ou fait d'initiales.",
      schema: quatrePortes,
      micros: ["5e_voc_neologisme"],
    },
    {
      titre: "Pour un mot fabriqué : le démonter",
      texte:
        "Les morceaux sont vieux même quand le mot est jeune. « Covoiturage » : co, voitur, age — trois pièces connues pour une chose de 2010.",
      schema: neoForme,
      micros: ["5e_voc_neologisme"],
    },
  ],
  usages: [
    {
      titre: "Pour ne pas faire de contresens",
      detail:
        "« Il avait le cœur lourd » ne parle pas de l'organe. Prendre un sens figuré au sens propre est l'erreur qui fait rater une lecture entière.",
      schema: pile(filFigure, mainFigure),
      micros: ["5e_voc_variations_sens"],
    },
    {
      titre: "Pour écrire une image qui tient",
      detail:
        "Une bonne image garde un lien visible avec la chose : le fil qu'on suit, la note qui pique. Une image sans lien ne se comprend pas.",
      schema: saleFigure,
      micros: ["5e_voc_neologisme"],
    },
    {
      titre: "Pour comprendre un mot que les adultes ne connaissent pas",
      detail:
        "Les mots du numérique passent par les mêmes quatre portes que ceux du Moyen Âge. Savoir laquelle, c'est pouvoir l'expliquer à quelqu'un.",
      schema: pile(neoSensObjet, empruntFootball),
      micros: ["5e_voc_neologisme"],
    },
  ],
  exemples: [
    {
      titre: "Le même mot, deux phrases",
      donnees: "« Il avait le cœur lourd en partant. »",
      schema: filFigure,
      question: "Que signifie « le cœur » ici ?",
      solution:
        "Les sentiments, l'émotion — sens FIGURÉ. Le piège est l'autre sens du même mot : « le cœur bat plus vite après la course », où il s'agit de l'organe. Fais le test : un cœur lourd ne se photographie pas, un cœur qui bat s'entend au stéthoscope.",
      micros: ["5e_voc_variations_sens"],
    },
    {
      titre: "Une expression entière",
      donnees: "« Cette histoire ne tient pas debout. »",
      schema: pile(salePropre, saleFigure),
      question: "Sens propre ou figuré ?",
      solution:
        "FIGURÉ : l'histoire n'est pas croyable. Une histoire n'a pas de jambes. Compare : « le vase ne tient pas debout sur ce meuble » — là, c'est l'équilibre, et cela se photographie. L'image de départ, ce qui tombe faute d'appui, est restée dans les deux.",
      micros: ["5e_voc_variations_sens"],
    },
    {
      titre: "Le verbe qui bascule",
      donnees: "« Le temps file, il faut partir. »",
      schema: filFigure,
      question: "Que signifie « filer » ici ?",
      solution:
        "Passer très vite — sens FIGURÉ. Le sens propre est dans « elle file la laine depuis l'aube » : transformer en fil. Le lien entre les deux est l'idée de ce qui s'étire et s'échappe entre les doigts, et c'est elle qui a permis le passage.",
      micros: ["5e_voc_variations_sens"],
    },
    {
      titre: "Un mot fabriqué",
      donnees: "« le cyberharcèlement »",
      schema: neoForme,
      question: "Par quelle porte ce mot est-il entré ?",
      solution:
        "C'est un NÉOLOGISME DE FORME : un mot nouveau a été construit. Démonte-le — « cyber- » et « harcèlement » — et les deux morceaux existaient avant lui. Ce n'est ni un emprunt (il est bâti en français) ni un sigle (aucune initiale).",
      micros: ["5e_voc_neologisme"],
    },
    {
      titre: "Un mot qui existait déjà",
      donnees: "« surfer sur Internet »",
      schema: pile(neoSensAnimal, neoSensObjet),
      question: "Même question.",
      solution:
        "C'est un NÉOLOGISME DE SENS : « surfer » existait, il désignait la planche sur la vague. On lui a prêté un emploi neuf, en gardant l'image — glisser d'un endroit à l'autre sans s'arrêter. Le mot n'a pas changé d'une lettre.",
      micros: ["5e_voc_neologisme"],
    },
    {
      titre: "Deux lettres et un mot",
      donnees: "« un SMS » et « un smartphone »",
      schema: pile(sigleOvni, empruntFootball),
      question: "Quelle porte pour chacun ?",
      solution:
        "« SMS » est un SIGLE : trois initiales soudées, devenues un mot qu'on prononce. « Smartphone » est un EMPRUNT : il arrive tout fait de l'anglais, et le français l'écrit sans le traduire. Deux mots du même téléphone, deux portes différentes.",
      micros: ["5e_voc_neologisme"],
    },
  ],
  pieges: [
    "Croire qu'un sens figuré est un sens faux : « la note salée » est parfaitement correct, et tout le monde le comprend.",
    "Chercher le sens dans le mot : il est dans la phrase. « Salée » ne veut rien dire tant qu'on ne l'emploie pas.",
    "Écarter l'autre sens du même mot trop vite : c'est justement lui, le piège de l'exercice — pas un sens venu d'ailleurs.",
    "Confondre néologisme de forme et néologisme de sens : le premier fabrique un mot, le second en recycle un.",
    "Prendre un emprunt pour une fabrication : « football » n'a pas été bâti en français, il est arrivé tel quel.",
    "Croire qu'un mot neuf est un mot mal écrit : la langue en fabrique depuis toujours, et le dictionnaire en ajoute chaque année.",
  ],
  aRetenir: [
    "Sens propre : on pourrait le photographier. Sens figuré : il ne reste qu'une image.",
    "C'est la PHRASE qui décide du sens, jamais le mot tout seul.",
    "Quatre portes pour un mot neuf : fabriqué, sens neuf, emprunté, sigle.",
    "La porte la plus fréquente est la deuxième : la langue prête ses mots plutôt que d'en inventer.",
    "Un mot fabriqué se démonte : ses morceaux sont vieux même quand le mot est jeune.",
  ],
  entrainement: [
    {
      question: "« Elle a la tête ailleurs depuis ce matin. » Sens propre ou figuré ?",
      correction: "Figuré : c'est l'attention, la pensée. Une tête ailleurs ne se photographie pas.",
      micros: ["5e_voc_variations_sens"],
    },
    {
      question: "« Il s'est cogné la tête contre la poutre. » Et ici ?",
      correction: "Propre : la partie du corps. C'est l'autre sens du même mot.",
      micros: ["5e_voc_variations_sens"],
    },
    {
      question: "« Le vase ne tient pas debout sur ce meuble. » Sens propre ou figuré ?",
      correction: "Propre : c'est une question d'équilibre, et cela se voit.",
      micros: ["5e_voc_variations_sens"],
    },
    {
      question: "« un virus informatique » : par quelle porte le mot est-il entré ?",
      correction: "Néologisme de sens : le mot existait en médecine, on lui a prêté un emploi.",
      micros: ["5e_voc_neologisme"],
    },
    {
      question: "« écoresponsable » : quelle porte ?",
      correction: "Néologisme de forme : un mot neuf, bâti avec « éco- » et « responsable ».",
      micros: ["5e_voc_neologisme"],
    },
    {
      question: "« le sida » : quelle porte ?",
      correction: "Un sigle devenu un mot : les initiales se sont soudées, et l'on ne les lit plus.",
      micros: ["5e_voc_neologisme"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesVocabulaireJouer5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Jouer avec les mots - 5e",
    section: {
      type: "objectif",
      phrase: "Le sens n'est pas dans le mot",
      sousPhrase:
        "Il est dans la phrase. Le même mot y dit deux choses différentes, et personne ne s'y trompe.",
      encadre: {
        titre: "L'idée",
        texte: "« La note du restaurant était salée. » Il n'y avait pas un grain de sel.",
      },
    },
  },
  {
    titre: "Le test, en une seconde",
    badge: "Jouer avec les mots - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "Je pourrais le photographier",
        contenu: "La main verte de peinture, la soupe salée, le fil de la couture. Sens PROPRE.",
      },
      droite: {
        titre: "Il ne reste qu'une image",
        contenu: "La main verte de la grand-mère, la note salée, le fil de l'histoire. Sens FIGURÉ.",
      },
    },
    schema: pile(mainPropre, mainFigure),
  },
  {
    titre: "Les quatre portes d'un mot neuf",
    badge: "Jouer avec les mots - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Fabriqué", texte: "covoiturage, télétravail. Des morceaux vieux, un mot jeune." },
        { titre: "Sens neuf", texte: "souris, surfer, virus. Le mot existait : on l'a prêté." },
        { titre: "Emprunté", texte: "football, week-end, selfie. Il arrive tout fait d'ailleurs." },
        { titre: "Sigle", texte: "SMS, OVNI, sida. Des initiales soudées en un mot." },
      ],
    },
    schema: quatrePortes,
  },
  {
    titre: "La porte la plus empruntée",
    badge: "Jouer avec les mots - 5e",
    section: {
      type: "etapes",
      etapes: [
        "La langue préfère PRÊTER ses mots plutôt que d'en inventer.",
        "« Souris » : la bête d'abord, l'objet ensuite. Le mot n'a pas changé.",
        "« Naviguer », « surfer », « virus » : même mécanisme, même semaine de ta vie.",
        "L'image de départ reste visible — c'est pour cela qu'on comprend sans l'apprendre.",
      ],
    },
    schema: pile(neoSensAnimal, neoSensObjet),
  },
  {
    titre: "Un mot né d'une lettre",
    badge: "Jouer avec les mots - 5e",
    section: {
      type: "etapes",
      etapes: [
        "En 1955, IBM France cherche un mot français pour computer.",
        "Un professeur de lettres répond : « ordinateur », un vieux mot presque oublié.",
        "Il désignait celui qui met en ordre.",
        "Soixante-dix ans plus tard, tout le monde l'emploie sans le savoir.",
      ],
    },
    schema: neoFormeTele,
  },
  {
    titre: "À vous",
    badge: "Jouer avec les mots - 5e",
    section: {
      type: "exercice",
      enonce: "« un SMS » et « un smartphone »",
      question: "Par quelle porte chacun est-il entré dans la langue ?",
      indice: "L'un est fait d'initiales, l'autre arrive tout fait d'une autre langue.",
      correction:
        "« SMS » est un SIGLE : trois initiales soudées. « Smartphone » est un EMPRUNT à l'anglais. Deux mots du même téléphone, deux portes différentes.",
    },
    schema: pile(sigleOvni, empruntFootball),
  },
];
