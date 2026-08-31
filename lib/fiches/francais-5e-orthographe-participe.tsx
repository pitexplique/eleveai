// ─── Fiche de cours : l'accord du participe passé (5e) ────────────────────────
// SIXIÈME FICHE DE FRANÇAIS DE LA 5e, et la seconde moitié de « Savoir accorder
// les mots dans la phrase et expliquer ses choix ».
//
// ⚠️ RÉFÉRENCE : BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026), « Annexe 1
// – Programme de français pour le cycle 4 », applicable en 5e à la RENTRÉE 2026.
//
// ⭐ POURQUOI ELLE EST SEULE. Le participe passé a sa notion depuis le découpage
// du 24/08, et ce n'est pas un rangement de confort : c'est là que se joue
// l'essentiel des erreurs d'orthographe grammaticale de la classe, et une règle
// noyée parmi les chaînes d'accord ne se travaille pas. Le BO lui consacre
// d'ailleurs son attendu le plus long, et le seul qui commence par « Justifier ».
//
// ⭐ L'EXEMPLE DE RÉUSSITE DU PROGRAMME EST LE DÉFI DE LA FICHE. Le document
// d'accompagnement écrit, mot pour mot : « L'élève avec ses pairs justifie à
// l'oral ou à l'écrit la différence d'accord du participe passé dans les deux
// phrases : "tu m'as parlé", "tu m'as appelé(e)". » Deux phrases de quatre mots,
// le même pronom, et deux accords opposés — parce que dans l'une il est COD, et
// dans l'autre COI. Rien d'autre ne résume aussi bien la difficulté.
//
// ⛔ LES EXEMPLES VONT PAR PAIRES, TOUJOURS. Une fiche qui ne montrerait que des
// COD antéposés apprendrait « avec avoir, on accorde » — exactement le contraire
// de la règle. Chaque cas d'accord est donc suivi de son jumeau sans accord :
// même verbe, même personnage, le complément déplacé.
//
// ⭐ LE CANVAS EST `conjugaison`, MODE `composee`, et il est fait pour ça : deux
// caisses accrochées — l'auxiliaire et le participe — avec la flèche d'accord,
// OU la croix rouge qui dit son absence. Montrer qu'on n'accorde pas est aussi
// important que montrer qu'on accorde, et une phrase ne le dit pas.
//
// Alignée sur lib/tutor-v4/knowledge/francais/5e/microSkills.ts (notionId
// `orthographe_participe`) et sur les tables PARTICIPE_ETRE, PARTICIPE_AVOIR et
// COD_COI_ANTEPOSE de
// lib/tutor-v4/questionBank/5e/francais/orthographe-grammaticale.bank.ts.
//
// Micro-compétences couvertes (les 3 de la notion, défi compris) :
// - 5e_orth_participe_etre     → définition, figure, propriété « Avec être, on
//                                regarde le sujet », méthode 1, usages,
//                                exemple 1, piège 1, entraînement 1
// - 5e_orth_participe_avoir    → propriétés « Avec avoir, on cherche le COD » et
//                                « Tout dépend de sa place », méthode 2,
//                                exemples 2 et 3, pièges 2 et 3,
//                                entraînements 2 et 3
// - 5e_orth_cod_coi_antepose   → propriété « Un COI ne commande jamais »,
//                                méthode 3, exemple 4, le défi (exemple 5),
//                                piège 4, entraînements 4 et 5
//
// Les phrases sont CELLES DE LA BANQUE, sans exception : « Elle est partie avant
// l'aube », « Les barques sont rentrées au port », « La lettre a été envoyée hier
// matin », « Elle a perdu ses clés dans le sable », « Les clés, elle les a
// perdues dans le sable », « Nous avons suivi la route côtière », « La route que
// nous avons suivie était longue », « Les élèves, je leur ai parlé hier », « Les
// élèves, je les ai rencontrés hier », « Ma sœur, je lui ai écrit », « Ma sœur,
// je l'ai vue passer ». S'y ajoute la paire que le BO cite lui-même.
//
// ⚠️ Contrôle passé — `npm run verifier:fiches`.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  groupes?: PhraseCanvasGroupe[];
  liens?: PhraseCanvasLien[];
  titre?: string;
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        titre: opts.titre,
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** Les deux caisses d'un temps composé — l'auxiliaire et le participe. La
 *  flèche d'accord part du sujet ; `absent` la remplace par une croix, et
 *  c'est souvent elle qui porte la leçon. */
function composee(opts: {
  pronom?: string;
  auxiliaire: { texte: string; note?: string };
  participe: { texte: string; note?: string };
  accord?: { label?: string; absent?: boolean };
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "composee",
        pronom: opts.pronom,
        auxiliaire: opts.auxiliaire,
        participe: opts.participe,
        accord: opts.accord,
        legende: opts.legende,
      }}
    />
  );
}

// Dans une carte, on EMPILE — jamais deux dessins côte à côte (REGLES § 2 ter).
function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Les temps composés de la banque, démontés ────────────────────────────────

// LA FIGURE DE RÉFÉRENCE : avec être, la flèche part du sujet et arrive sur le
// participe. C'est le cas simple, et c'est celui qu'il faut voir d'abord —
// l'autre auxiliaire se définit par contraste.
const etreParti = composee({
  pronom: "elle",
  auxiliaire: { texte: "est", note: "être" },
  participe: { texte: "partie", note: "accordé" },
  accord: { label: "sujet" },
  legende: "Avec être, le participe s'accorde avec le sujet.",
});

const etreBarques = composee({
  pronom: "les barques",
  auxiliaire: { texte: "sont", note: "être" },
  participe: { texte: "rentrées", note: "fém. plur." },
  accord: { label: "sujet" },
  legende: "« Les barques sont rentrées » : féminin pluriel, comme le sujet.",
});

// ⭐ LA CROIX EST LE POINT DU DESSIN. Avec avoir et le complément placé APRÈS,
// on n'accorde pas — et montrer une absence d'accord par un arc barré est plus
// fort que de l'écrire sous la phrase.
const avoirPerduApres = composee({
  pronom: "elle",
  auxiliaire: { texte: "a", note: "avoir" },
  participe: { texte: "perdu", note: "invariable" },
  accord: { absent: true },
  legende: "« Elle a perdu ses clés » : le COD est après. Pas d'accord.",
});

const avoirPerduAvant = composee({
  pronom: "elle les",
  auxiliaire: { texte: "a", note: "avoir" },
  participe: { texte: "perdues", note: "accordé" },
  accord: { label: "les clés" },
  legende: "« Les clés, elle les a perdues » : le COD est avant. On accorde.",
});

// LA MÊME PAIRE, SUR UN AUTRE VERBE — pour que l'élève retienne la règle et non
// la phrase.
const avoirSuiviApres = composee({
  pronom: "nous",
  auxiliaire: { texte: "avons", note: "avoir" },
  participe: { texte: "suivi", note: "invariable" },
  accord: { absent: true },
  legende: "« Nous avons suivi la route » : le COD suit le verbe.",
});

const avoirSuiviAvant = composee({
  pronom: "que nous",
  auxiliaire: { texte: "avons", note: "avoir" },
  participe: { texte: "suivie", note: "accordé" },
  accord: { label: "la route" },
  legende: "« La route QUE nous avons suivie » : « que » est le COD, devant.",
});

// LA PLACE DU COD, MONTRÉE SUR LA PHRASE : c'est la même information que les
// caisses, vue de l'autre bout — et c'est le geste que l'élève doit faire.
const phraseCodApres = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "a" },
    { texte: "perdu", focus: true },
    { texte: "ses" },
    { texte: "clés" },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 2], label: "verbe" },
    { mots: [3, 4], label: "COD" },
  ],
  liens: [{ de: 2, vers: 4, label: "quoi ?", type: "question" }],
  legende: "Le COD est APRÈS le verbe : le participe ne bouge pas.",
});

const phraseCodAvant = phrase({
  mots: [
    { texte: "Les" },
    { texte: "clés" },
    { texte: "," },
    { texte: "elle" },
    { texte: "les", focus: true },
    { texte: "a" },
    { texte: "perdues", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [4, 4], label: "COD" },
    { mots: [5, 6], label: "verbe" },
  ],
  liens: [{ de: 6, vers: 4, label: "accord", type: "accord" }],
  legende: "Le COD « les » est AVANT : le participe s'accorde avec lui.",
});

// ⭐ LE PIÈGE QUE LE BO NOMME : le pronom devant est-il COD ou COI ? Les deux
// phrases se ressemblent trait pour trait, et l'une s'accorde, l'autre non.
const coiParle = phrase({
  mots: [
    { texte: "Je" },
    { texte: "leur", focus: true },
    { texte: "ai" },
    { texte: "parlé" },
    { texte: "." },
  ],
  groupes: [{ mots: [1, 1], label: "COI" }],
  liens: [{ de: 3, vers: 1, label: "à qui ?", type: "question" }],
  legende: "On parle À quelqu'un : « leur » est un COI. Pas d'accord.",
});

const codRencontre = phrase({
  mots: [
    { texte: "Je" },
    { texte: "les", focus: true },
    { texte: "ai" },
    { texte: "rencontrés" },
    { texte: "." },
  ],
  groupes: [{ mots: [1, 1], label: "COD" }],
  liens: [{ de: 3, vers: 1, label: "qui ?", type: "accord" }],
  legende: "On rencontre quelqu'un : « les » est un COD. On accorde.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2), et c'est la paire du BO — le même
// pronom « m' », deux verbes, deux accords opposés.
const defiParle = composee({
  pronom: "tu m'",
  auxiliaire: { texte: "as", note: "avoir" },
  participe: { texte: "parlé", note: "invariable" },
  accord: { absent: true },
  legende: "« tu m'as parlé » : on parle À moi. « m' » est un COI.",
});

const defiAppele = composee({
  pronom: "tu m'",
  auxiliaire: { texte: "as", note: "avoir" },
  participe: { texte: "appelée", note: "accordé" },
  accord: { label: "m' = moi" },
  legende: "« tu m'as appelée » : on appelle quelqu'un. « m' » est un COD.",
});

const pieges = [
  "Accorder avec le sujet quand l'auxiliaire est « avoir ». « Elle a perdu ses clés » : le participe ne regarde pas « elle », il cherche un COD — et celui-ci est placé après.",
  "Croire qu'avec « avoir » on n'accorde jamais. Si le COD est placé AVANT le verbe, on accorde : « Les clés, elle les a perdues ».",
  "Oublier que « que » est un COD. Dans « la route que nous avons suivie », « que » reprend « la route » et se trouve devant le verbe : l'accord se fait.",
  "Accorder avec un pronom qui n'est pas un COD. « Je leur ai parlé » ne s'accorde pas : on parle À quelqu'un, « leur » est un COI. C'est le piège que le programme nomme expressément.",
];

const aRetenir = [
  "Avec ÊTRE, le participe s'accorde avec le SUJET : « elle est partie », « les barques sont rentrées ».",
  "Avec AVOIR, il ne regarde jamais le sujet. Il cherche le COD — et il ne s'accorde que si celui-ci est placé AVANT le verbe.",
  "Un COI placé avant ne commande jamais l'accord : « je leur ai parlé », « je lui ai écrit ». On parle À quelqu'un, on écrit À quelqu'un.",
];

export const ficheParticipe5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "orthographe-participe",
  titre: `L'accord du participe passé (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Tu m'as parlé. » « Tu m'as appelée. » Même pronom, même auxiliaire, quatre mots chacune — et pourtant l'une s'accorde et l'autre non. Le programme donne cette paire comme exemple : tout l'accord du participe passé tient dans la différence entre les deux.",
  identite: [
    { label: "Mots clés", valeur: "Auxiliaire, participe passé, COD antéposé, COI" },
    { label: "Le secret", valeur: "L'auxiliaire dit où regarder" },
    { label: "Outil", valeur: "Poser la question au verbe, puis regarder la place" },
  ],
  definition: {
    texte:
      "Un temps composé s'écrit en deux parties : un auxiliaire — être ou avoir — et un participe passé. C'est l'AUXILIAIRE qui dit avec quoi le participe s'accorde. Avec être, il s'accorde avec le sujet, toujours : « elle est partie », « les barques sont rentrées ». Avec avoir, il ne regarde jamais le sujet : il cherche le complément d'objet direct, et il ne s'accorde que si celui-ci est placé AVANT le verbe. Reste le piège que le programme nomme : un pronom placé devant n'est pas forcément un COD. « Je les ai rencontrés » s'accorde, « je leur ai parlé » non — parce qu'on parle À quelqu'un.",
  },
  figure: {
    schema: pile(etreParti, avoirPerduApres),
    legende:
      "Deux caisses accrochées : l'auxiliaire et le participe. En haut, avec être, la flèche part du sujet et arrive sur le participe — l'accord se fait. En bas, avec avoir et le complément placé après, la flèche est barrée d'une croix : il n'y a pas d'accord, et c'est cette croix qui porte la leçon.",
  },
  proprietes: [
    {
      titre: "Avec être, on regarde le sujet",
      texte:
        "Le participe prend le genre et le nombre du sujet, sans condition. C'est le cas simple, et le seul qui n'ait pas d'exception.",
      schema: pile(etreParti, etreBarques),
    },
    {
      titre: "Avec avoir, on cherche le COD",
      texte:
        "Le participe ne regarde jamais le sujet. Il cherche le complément d'objet direct — et il se peut qu'il n'y en ait pas.",
      schema: avoirPerduApres,
    },
    {
      titre: "Tout dépend de la place du COD",
      texte:
        "Placé après le verbe : rien ne bouge. Placé avant : le participe s'accorde avec lui.",
      schema: pile(phraseCodApres, phraseCodAvant),
    },
    {
      titre: "« que » est un COD placé avant",
      texte:
        "Dans « la route que nous avons suivie », « que » reprend « la route » et se trouve devant : l'accord se fait.",
      schema: pile(avoirSuiviApres, avoirSuiviAvant),
    },
    {
      titre: "Un COI ne commande jamais",
      texte:
        "« leur », « lui », « en » ne sont pas des COD. On parle À quelqu'un, on écrit À quelqu'un : le participe ne bouge pas.",
      schema: pile(coiParle, codRencontre),
    },
  ],
  reel: {
    texte:
      "C'est la faute qui se voit le plus dans un message, une lettre ou une copie — et c'est celle qu'un correcteur relève en premier, parce qu'elle se corrige sans dictionnaire. « Merci, je les ai bien reçus » ou « reçu » ? Le COD « les » est devant : « reçus ». « Je vous ai écrit hier » ne prend rien : on écrit À quelqu'un. Trois secondes de raisonnement, et la phrase est juste — c'est exactement ce que le programme appelle « justifier son accord ».",
  },
  historique: {
    texte:
      "La règle du COD placé avant vient d'un poète du XVIe siècle, Clément Marot, qui l'a formulée en observant l'italien. Avant lui, l'usage hésitait : on accordait ou non selon l'oreille. Marot en a fait deux vers, et l'Académie française l'a inscrite au XVIIe. Elle a été contestée dès le siècle suivant — et elle l'est encore : la Belgique a autorisé en 2018 de ne plus l'appliquer à l'école. En France, elle reste au programme : ce qu'on apprend ici est une décision de poète, vieille de cinq cents ans.",
  },
  formule: {
    contexte: "La question qui décide, dans l'ordre.",
    expression: "être ou avoir ? puis : où est le COD ?",
    legende:
      "Avec être, on s'arrête là : accord avec le sujet. Avec avoir, on cherche le COD en posant « qui ? » ou « quoi ? » au verbe. S'il n'y en a pas, ou s'il est placé après, le participe ne bouge pas. S'il est placé avant, on accorde avec lui — et on vérifie que c'en est bien un, pas un COI.",
    schema: pile(etreParti, avoirPerduAvant),
  },
  methode: [
    {
      titre: "Je regarde l'auxiliaire",
      texte:
        "Être : j'accorde avec le sujet, et c'est fini. Avoir : je continue, car le sujet ne compte pas.",
      schema: etreBarques,
    },
    {
      titre: "Je pose la question au verbe",
      texte:
        "« qui ? » ou « quoi ? » sans petit mot : c'est un COD. Avec « à » ou « de » : c'est un COI, et il ne commande rien.",
      schema: pile(codRencontre, coiParle),
    },
    {
      titre: "Je regarde où il est",
      texte:
        "Le COD est-il avant ou après le verbe ? Avant : j'accorde avec lui. Après : je ne touche à rien.",
      schema: pile(phraseCodApres, phraseCodAvant),
    },
  ],
  usages: [
    {
      titre: "Raconter un déplacement",
      detail:
        "« Elle est partie », « nous sommes descendus » : ces verbes se conjuguent avec être, donc accord avec le sujet.",
      schema: etreParti,
    },
    {
      titre: "Dire ce qu'on a fait",
      detail:
        "« Nous avons suivi la route », « tu as chanté deux chansons » : le complément suit, rien ne s'accorde.",
      schema: avoirSuiviApres,
    },
    {
      titre: "Reprendre ce dont on parlait",
      detail:
        "« Les clés, elle les a perdues » : on met le complément en tête, et le participe s'accorde avec lui.",
      schema: avoirPerduAvant,
    },
  ],
  exemples: [
    {
      titre: "Avec être, le sujet suffit",
      donnees: "« Les barques sont rentré… au port. »",
      schema: etreBarques,
      question: "Quelle forme prend le participe ?",
      solution:
        "« rentrées ». L'auxiliaire est « être », donc l'accord se fait avec le sujet — « les barques », féminin pluriel. Rien d'autre n'entre en jeu : ni la place d'un complément, ni la question posée au verbe. C'est le seul cas de la fiche qui n'ait aucune condition, et c'est pour cela qu'on le voit en premier.",
    },
    {
      titre: "La même phrase, dans les deux sens",
      donnees: "« Elle a perdu ses clés dans le sable. » puis « Les clés, elle les a perdu… dans le sable. »",
      schema: pile(phraseCodApres, phraseCodAvant),
      question: "Pourquoi le participe change-t-il de forme ?",
      solution:
        "Parce que le COD a changé de place. Dans la première, on demande « elle a perdu quoi ? » — ses clés, et le groupe est APRÈS le verbe : le participe reste « perdu ». Dans la seconde, « les » reprend « les clés » et se trouve AVANT : le participe s'accorde avec lui, « perdues ». Le verbe est le même, le sens est le même, seule la place a bougé — et c'est elle qui commande.",
    },
    {
      titre: "« que » est un complément d'objet",
      donnees: "« La route que nous avons suivi… était longue. »",
      schema: avoirSuiviAvant,
      question: "Faut-il accorder, et avec quoi ?",
      solution:
        "Oui, avec « la route » : « suivie ». Le mot « que » n'est pas un simple mot de liaison — c'est un pronom relatif, et il occupe ici la fonction de COD : on suit QUOI ? « que », c'est-à-dire la route. Il est placé devant le verbe, donc l'accord se fait. C'est le cas le plus souvent manqué, parce qu'on ne voit pas « que » comme un complément.",
    },
    {
      titre: "Le pronom qui ne commande pas",
      donnees: "« Les élèves, je leur ai parlé hier. » puis « Les élèves, je les ai rencontré… hier. »",
      schema: pile(coiParle, codRencontre),
      question: "Pourquoi une seule des deux s'accorde-t-elle ?",
      solution:
        "Parce que les deux verbes ne se construisent pas pareil. On parle À quelqu'un : « leur » est un complément d'objet INDIRECT, et un COI ne commande jamais l'accord — « parlé » reste invariable. On rencontre quelqu'un, sans préposition : « les » est un complément d'objet DIRECT, placé avant le verbe, donc « rencontrés ». Le test tient en une question posée au verbe : « à qui ? » ou « qui ? ».",
    },
    {
      titre: "Le défi",
      donnees: "« Tu m'as parlé. » et « Tu m'as appelée. »",
      schema: pile(defiParle, defiAppele),
      question: "Le même « m' », et deux accords différents : pourquoi ?",
      solution:
        "Parce que « parler » demande un COI et « appeler » un COD. Dans la première, on parle À moi : « m' » est indirect, le participe ne bouge pas. Dans la seconde, on appelle moi : « m' » est direct, placé avant le verbe, et le participe s'accorde avec la personne qu'il désigne — « appelée » si c'est une femme qui parle. Le programme donne exactement cette paire comme exemple de réussite, et demande à l'élève de « justifier à l'oral ou à l'écrit la différence d'accord ». C'est le contraire d'une règle à réciter : c'est un raisonnement à dire.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Ma sœur est tombé… dans l'escalier. »",
      correction:
        "« tombée ». L'auxiliaire est être : on accorde avec le sujet « ma sœur », féminin singulier. Aucune autre question à se poser.",
    },
    {
      question: "« Tu as pris… de très belles photos. » puis « Les photos que tu as pris… sont très belles. »",
      correction:
        "« pris » puis « prises ». Dans la première, le COD « de très belles photos » est après le verbe : rien ne bouge. Dans la seconde, « que » reprend « les photos » et se trouve devant : on accorde.",
    },
    {
      question: "« La lettre a été envoyé… hier matin. »",
      correction:
        "« envoyée ». « a été envoyée » est une forme passive, construite avec être : on accorde avec le sujet « la lettre », féminin singulier.",
    },
    {
      question: "« Ma sœur, je lui ai écrit… la semaine dernière. »",
      correction:
        "« écrit », invariable. On écrit À quelqu'un : « lui » est un COI, et un COI ne commande jamais l'accord — même placé avant le verbe.",
    },
    {
      question: "Défi : « Ma sœur, je l'ai vu… passer devant le portail. »",
      correction:
        "« vue ». On voit quelqu'un, sans préposition : « l' » reprend « ma sœur », c'est un COD placé avant le verbe. Compare avec l'exercice précédent : même sœur, même position du pronom, et pourtant l'un s'accorde et l'autre non — c'est la construction du verbe qui décide.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesParticipe5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le participe passé - 5e",
    section: {
      type: "objectif",
      phrase: "Savoir dire POURQUOI on accorde",
      sousPhrase:
        "Avec être, avec avoir, et le piège du pronom placé devant qui n'est pas toujours un complément d'objet direct.",
      encadre: {
        titre: "L'idée",
        texte: "C'est l'AUXILIAIRE qui dit où regarder : le sujet, ou le COD.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "« Merci, je les ai bien reçus » — le COD est devant, on accorde. « Je vous ai écrit hier » — on écrit À quelqu'un, rien ne bouge. Trois secondes de raisonnement.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "La règle du COD placé avant vient d'un poète du XVIe siècle, Clément Marot, qui l'a tirée de l'italien et mise en deux vers. Elle est contestée depuis : la Belgique a cessé de l'exiger à l'école en 2018.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheParticipe5e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Être ou avoir ?",
    badge: "La distinction clé",
    section: {
      type: "duo",
      gauche: {
        variante: "ok",
        titre: "Avec ÊTRE",
        contenu:
          "« Elle est partie », « les barques sont rentrées ». Accord avec le sujet, sans condition. C'est le cas simple.",
      },
      droite: {
        variante: "info",
        titre: "Avec AVOIR",
        contenu:
          "Le sujet ne compte pas. On cherche le COD — et on ne l'accorde que s'il est placé AVANT le verbe.",
      },
    },
  },
  {
    titre: "La place du complément change tout",
    badge: "Avec avoir",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Le COD après",
        contenu: "« Elle a perdu ses clés. » Le participe ne bouge pas.",
      },
      droite: {
        variante: "info",
        titre: "Le COD avant",
        contenu: "« Les clés, elle les a perdues. » Le participe s'accorde avec lui.",
      },
    },
  },
  {
    titre: "Le pronom qui ne commande pas",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Les élèves, je leur ai parlé. » et « Les élèves, je les ai rencontrés. »",
      question: "Pourquoi une seule des deux s'accorde-t-elle ?",
      correction:
        "On parle À quelqu'un : « leur » est un COI, il ne commande jamais. On rencontre quelqu'un : « les » est un COD placé avant, on accorde.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "Le défi",
    badge: "L'exemple du programme",
    section: {
      type: "exercice",
      enonce: "« Tu m'as parlé. » et « Tu m'as appelée. »",
      question: "Le même « m' », et deux accords différents : pourquoi ?",
      indice: "Pose la question au verbe : parle-t-on quelqu'un, ou parle-t-on À quelqu'un ?",
      correction:
        "« parler » demande un COI — pas d'accord. « appeler » demande un COD, ici placé avant — on accorde. C'est la paire que le BO cite comme exemple de réussite.",
    },
  },
];
