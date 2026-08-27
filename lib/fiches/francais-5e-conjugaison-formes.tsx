// ─── Fiche de cours : la composition d'une forme verbale (5e) ─────────────────
// LA ONZIÈME FICHE DE LA 5e ÉCRITE LE 26-27/08/2026.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// Compétence « Maitriser la composition des formes verbales ». ⛔ CE N'EST PAS LE
// PROGRAMME DE LA 4e — et sur la conjugaison, l'écart est maximal : le
// conditionnel est un MODE en 4e et un TEMPS de l'indicatif en 5e.
//
// ⛔⛔ NE PAS EMPIÉTER SUR `francais-5e-conjugaison-temps.tsx`, QUI EXISTE DÉJÀ.
// Le partage est net, et il vient du BO lui-même :
//     `conjugaison_formes` → DE QUOI une forme verbale est faite (ici)
//     `conjugaison_temps`  → les temps à BÂTIR (passé simple, conditionnel,
//                            temps composés, antérieurs)
//     `conjugaison_valeurs`→ ce que chaque temps EXPRIME
// Ici on ne conjugue aucun temps nouveau : on démonte ce qui est écrit, et l'on
// compose ce qui est demandé.
//
// ⛔ ET LA DIFFÉRENCE AVEC LA 4e, dont la notion porte le même nom : la 4e traite
// `modes_personnels` et `irreguliers`. La 5e traite l'INFINITIF (le retrouver
// quand il ne se devine pas), la TERMINAISON (ce qu'elle porte), le RADICAL
// VARIABLE et la COMPOSITION. Deux fiches, deux découpages du même objet.
//
// ⭐⭐ LE CANVAS `conjugaison` EN WAGONS EST ICI CHEZ LUI, ET NON DÉTOURNÉ. Il a
// été créé pour cela : le BO parle de « la composition de la terminaison
// (marques de temps ET de personne) », et les wagons montrent exactement les
// trois places. Dans les fiches de lexique, les mêmes wagons servaient à démonter
// un mot dérivé — c'était un détournement assumé. Ici, la correspondance est
// littérale :
//     role: "radical"  → le radical du verbe (bleu)
//     role: "temps"    → la marque de TEMPS (orange)
//     role: "personne" → la marque de PERSONNE (verte)
// ⚠️ `note` en huit signes : c'est elle, et non le mot, qui fixe la largeur.
//
// ⭐ ET LE MODE `tableau` PORTE LE RADICAL VARIABLE, avec `alerte: true` sur la
// ligne où le radical change — « nous prenons » face à « ils prennent ». C'est
// la seule façon de faire voir une régularité qui ne se dit pas : le programme
// demande de conjuguer « en fonction de la variation de leur radical », donc de
// voir la variation, pas de l'apprendre par cœur.
// ⛔ Le mode `frise` reste interdit dans une carte de propriété (largeur
// naturelle ~420 px, il tombe à 8 px de police) : il n'est pas employé ici.
//
// Alignée sur les tables INFINITIFS et COMPOSER de
// lib/tutor-v4/questionBank/5e/francais/socle-grammaire-conjugaison.bank.ts et
// sur les tables TERMINAISONS et RADICAL_VARIABLE de conjugaison.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `conjugaison_formes`) :
// - 5e_conj_identifier          → propriétés 1 et 2, méthode 1, usage 1,
//                                 exemples 1 et 2
// - 5e_conj_radical_terminaison → figure, propriétés 3 et 4, formule, méthode 2,
//                                 usage 2, exemple 3
// - 5e_conj_radical_variable    → propriétés 5 et 6, méthode 3, exemples 4 et 5
// - 5e_conj_composer            → propriétés 7 et 8, méthode 4, usage 3, exemple 6
//
// ⛔ RAPPEL DES PIÈGES : aucun `titre` sur un dessin ; la couleur vient du `role`
// ou du `label` ; les blocs n'interprètent pas le markdown.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ConjugaisonSegment,
  ConjugaisonLigne,
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

/** La forme verbale démontée. ⭐ Ici la correspondance est LITTÉRALE, pas
 *  détournée : `radical` = le radical du verbe, `temps` = la marque de temps,
 *  `personne` = la marque de personne. ⚠️ `note` en huit signes. */
function morceaux(opts: { pronom?: string; segments: ConjugaisonSegment[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "wagons",
        pronom: opts.pronom,
        segments: opts.segments,
        legende: opts.legende,
      }}
    />
  );
}

/** Les six personnes d'un temps. `alerte: true` met en relief la ligne où le
 *  radical change — c'est ce qui fait VOIR la variation. */
function tableau(opts: { temps: string; lignes: ConjugaisonLigne[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "tableau",
        temps: opts.temps,
        lignes: opts.lignes,
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

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Ce qui se dessine quand on démonte un verbe ──────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : la terminaison porte DEUX choses à la fois.
const formeChantions = morceaux({
  pronom: "nous",
  segments: [
    { texte: "chant", role: "radical", note: "radical" },
    { texte: "i", role: "temps", note: "imparfait" },
    { texte: "ons", role: "personne", note: "nous" },
  ],
  legende: "« Nous chantions » : le radical, puis DEUX marques — le temps, la personne.",
});

const formeFiniront = morceaux({
  pronom: "ils",
  segments: [
    { texte: "fini", role: "radical", note: "radical" },
    { texte: "r", role: "temps", note: "futur" },
    { texte: "ont", role: "personne", note: "ils" },
  ],
  legende: "« Ils finiront » : le r du futur, puis la marque de la 3e personne.",
});

const formePartira = morceaux({
  pronom: "elle",
  segments: [
    { texte: "parti", role: "radical", note: "radical" },
    { texte: "r", role: "temps", note: "futur" },
    { texte: "a", role: "personne", note: "elle" },
  ],
  legende: "Le même r du futur, une autre personne. Les deux marques sont séparables.",
});

// ── L'INFINITIF QUI NE SE DEVINE PAS.
const infinitifVit = phrase({
  mots: [
    { texte: "il vit", focus: true },
    { texte: "voir", focus: true },
    { texte: "vivre", barre: true },
  ],
  liens: [{ de: 0, vers: 1, label: "vient de", type: "reprise" }],
  legende: "« Il vit la lumière » : c'est VOIR au passé simple, pas « vivre ».",
});

const infinitifDurent = phrase({
  mots: [
    { texte: "ils durent", focus: true },
    { texte: "devoir", focus: true },
    { texte: "durer", barre: true },
  ],
  liens: [{ de: 0, vers: 1, label: "vient de", type: "reprise" }],
  legende: "« Ils durent renoncer » : c'est DEVOIR. Le piège se voit et s'entend.",
});

// ── LE RADICAL QUI CHANGE : le tableau le montre, on ne l'apprend pas.
const tableauPrendre = tableau({
  temps: "prendre, présent",
  lignes: [
    { pronom: "je", radical: "pren", terminaison: "ds" },
    { pronom: "tu", radical: "pren", terminaison: "ds" },
    { pronom: "il", radical: "pren", terminaison: "d" },
    { pronom: "nous", radical: "pren", terminaison: "ons" },
    { pronom: "vous", radical: "pren", terminaison: "ez" },
    { pronom: "ils", radical: "prenn", terminaison: "ent", alerte: true },
  ],
  legende: "Cinq fois « pren- », et un seul « prenn- ». La variation se voit.",
});

const tableauAller = tableau({
  temps: "aller, présent",
  lignes: [
    { pronom: "je", radical: "v", terminaison: "ais", alerte: true },
    { pronom: "tu", radical: "v", terminaison: "as", alerte: true },
    { pronom: "il", radical: "v", terminaison: "a", alerte: true },
    { pronom: "nous", radical: "all", terminaison: "ons" },
    { pronom: "vous", radical: "all", terminaison: "ez" },
    { pronom: "ils", radical: "v", terminaison: "ont", alerte: true },
  ],
  legende: "« Aller » a DEUX radicaux : all- au pluriel des deux premières, v- ailleurs.",
});

// ── COMPOSER : l'opération inverse, celle qui se rate en rédaction.
const composerOuvrit = morceaux({
  pronom: "il",
  segments: [
    { texte: "ouvr", role: "radical", note: "ouvrir" },
    { texte: "it", role: "personne", note: "p. simple" },
  ],
  legende: "(ouvrir, passé simple, il) → « ouvrit ». On bâtit au lieu d'analyser.",
});

const composerPrenions = morceaux({
  pronom: "nous",
  segments: [
    { texte: "pren", role: "radical", note: "prendre" },
    { texte: "i", role: "temps", note: "imparfait" },
    { texte: "ons", role: "personne", note: "nous" },
  ],
  legende: "(prendre, imparfait, nous) → « prenions ». Trois choix, trois places.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheConjugaisonFormes5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "conjugaison-formes",
  titre: "La composition d'une forme verbale en 5e (2026-2027)",
  accroche:
    "« Nous chantions. » Six lettres après le radical, et elles disent DEUX choses en même temps : que c'est l'imparfait, et que c'est nous. Une forme verbale n'est pas un mot à retenir — c'est un mot ASSEMBLÉ, avec trois places. Qui voit les trois places peut conjuguer un verbe qu'il n'a jamais rencontré.",
  identite: [
    { label: "Mots clés", valeur: "Infinitif, radical, terminaison, personne" },
    { label: "Le secret", valeur: "La terminaison porte le temps ET la personne" },
    { label: "Outil", valeur: "Démonter avant de conjuguer" },
  ],
  definition: {
    texte:
      "Une forme verbale est un mot assemblé, et le programme le dit ainsi : « les éléments qui constituent une forme verbale — radical verbal et terminaison (marques de temps et de personne) ». Il y a donc TROIS places. Le RADICAL porte le sens du verbe : c'est ce qui reste quand on enlève tout le reste. La MARQUE DE TEMPS dit à quel temps on est — le « r » du futur, le « i » de l'imparfait. La MARQUE DE PERSONNE dit qui fait l'action — « ons » pour nous, « ez » pour vous. Avant tout cela vient un geste qu'on oublie : retrouver l'INFINITIF, car sans lui on ne cherche dans aucun tableau. Et certains verbes changent de radical selon la personne — « nous prenons » mais « ils prennent » : ce n'est pas une liste à apprendre, c'est une variation à voir.",
  },
  figure: {
    schema: pile(formeChantions, formeFiniront),
    legende:
      "Deux formes démontées, et la même architecture. Le wagon bleu porte le radical — le sens du verbe. Puis viennent DEUX marques, et c'est le point de la leçon : l'orange dit le temps (le « i » de l'imparfait, le « r » du futur), la verte dit la personne (« ons » pour nous, « ont » pour ils). La terminaison n'est donc pas un bloc à mémoriser : ce sont deux informations empilées, et chacune se change indépendamment de l'autre.",
  },
  proprietes: [
    {
      titre: "Le premier geste : retrouver l'infinitif",
      texte:
        "Sans lui, on ne cherche dans aucun tableau, on ne trouve pas le groupe, on n'accorde pas le participe. C'est le point de départ de tout.",
      schema: infinitifVit,
      micros: ["5e_conj_identifier"],
    },
    {
      titre: "Certains infinitifs ne se devinent pas",
      texte:
        "« Il vit » ne vient pas de « vivre » mais de VOIR. « Ils durent » ne vient pas de « durer » mais de DEVOIR. Le passé simple déguise.",
      schema: pile(infinitifVit, infinitifDurent),
      micros: ["5e_conj_identifier"],
    },
    {
      titre: "La terminaison porte DEUX choses",
      texte:
        "Le temps et la personne, en même temps. « Chantions » : le « i » dit l'imparfait, le « ons » dit nous. Deux informations, deux marques.",
      schema: formeChantions,
      micros: ["5e_conj_radical_terminaison"],
    },
    {
      titre: "Les deux marques se changent séparément",
      texte:
        "« Ils finiront », « elle partira » : le même « r » du futur, deux personnes différentes. On peut changer l'une sans toucher l'autre.",
      schema: pile(formeFiniront, formePartira),
      micros: ["5e_conj_radical_terminaison"],
    },
    {
      titre: "Certains radicaux changent selon la personne",
      texte:
        "« Nous prenons » garde « pren- », « ils prennent » le double. Ce n'est pas une exception : c'est une régularité, et elle se voit.",
      schema: tableauPrendre,
      micros: ["5e_conj_radical_variable"],
    },
    {
      titre: "Quelques verbes ont deux radicaux",
      texte:
        "« Aller » fait « all- » avec nous et vous, « v- » partout ailleurs. Six formes, deux radicaux — et la ligne en relief le montre.",
      schema: tableauAller,
      micros: ["5e_conj_radical_variable"],
    },
    {
      titre: "Composer, c'est l'opération inverse",
      texte:
        "Analyser une forme écrite est une chose ; en fabriquer une qu'on te demande en est une autre. C'est celle-là qui se rate en rédaction.",
      schema: composerOuvrit,
      micros: ["5e_conj_composer"],
    },
    {
      titre: "Trois choix, trois places",
      texte:
        "Le verbe donne le radical, le temps donne sa marque, la personne donne la sienne. On remplit les trois places, dans cet ordre.",
      schema: composerPrenions,
      micros: ["5e_conj_composer"],
    },
  ],
  reel: {
    texte:
      "Personne ne conjugue en récitant un tableau. Quand tu écris, tu produis une forme en une fraction de seconde, et ce qui décide alors n'est pas ta mémoire : c'est ce que tu sais de la construction. Un élève qui a vu les trois places écrit « nous prenions » sans hésiter, parce qu'il sait que l'imparfait met un « i » avant la marque de personne. Un élève qui a seulement appris des listes écrit « nous prendrions », qui est un autre temps. C'est vrai aussi pour lire : dans un roman au passé simple, la moitié des formes te seront inconnues — « il vainquit », « elle acquit », « ils résolurent ». Aucune ne s'apprend d'avance ; toutes se démontent.",
  },
  historique: {
    texte:
      "Le « r » du futur français n'a pas toujours été une marque de temps : c'était un verbe. Le latin classique disait cantabo pour « je chanterai », mais les gens ont pris l'habitude de dire cantare habeo — littéralement « chanter j'ai », c'est-à-dire « j'ai à chanter ». Les deux mots se sont soudés au fil des siècles : cantare habeo est devenu chanterai, et le « ai » final est resté, qui est le verbe avoir. Le futur français est donc un ancien présent d'obligation, collé à un infinitif — et c'est pourquoi il se forme sur l'infinitif : chanter + ai, finir + ai, partir + ai. Ce que tu prends pour une terminaison arbitraire est un mot entier, aplati par mille cinq cents ans d'usage.",
  },
  formule: {
    contexte: "Ce que dit une terminaison, et qu'on lit d'un coup une fois qu'on le sait.",
    expression: "radical + marque de temps + marque de personne",
    legende:
      "« Nous chantions » : chant- (le sens), -i- (l'imparfait), -ons (nous). Chaque place répond à une question différente — quel verbe ? quel temps ? qui ? Et l'on peut changer une réponse sans toucher aux deux autres : « vous chantiez », « nous chanterons ».",
    schema: formeChantions,
  },
  methode: [
    {
      titre: "Chercher l'infinitif d'abord, même s'il se cache",
      texte:
        "Essaie la forme dans une phrase avec « il faut » : « il faut… voir ». Au passé simple, méfie-toi — « vit », « durent », « sut » ne disent pas leur verbe.",
      schema: infinitifDurent,
      micros: ["5e_conj_identifier"],
    },
    {
      titre: "Couper la forme en trois",
      texte:
        "Ce qui reste quand on enlève la fin est le radical. Dans ce qui reste, la première marque dit le temps, la seconde la personne.",
      schema: formeFiniront,
      micros: ["5e_conj_radical_terminaison"],
    },
    {
      titre: "Pour un radical variable : écrire les six personnes",
      texte:
        "La variation apparait d'un coup d'œil, et elle est régulière : c'est presque toujours « nous » et « vous » qui gardent le radical de l'infinitif.",
      schema: tableauAller,
      micros: ["5e_conj_radical_variable"],
    },
    {
      titre: "Pour composer : remplir les trois places dans l'ordre",
      texte:
        "Quel verbe ? le radical. Quel temps ? sa marque. Qui ? sa marque. Ne jamais partir de la forme entière — on la fabrique morceau par morceau.",
      schema: composerPrenions,
      micros: ["5e_conj_composer"],
    },
  ],
  usages: [
    {
      titre: "Pour lire un récit au passé simple",
      detail:
        "« Il vainquit », « elle acquit », « ils résolurent » : aucune ne s'apprend d'avance. Retrouver l'infinitif suffit à comprendre.",
      schema: infinitifVit,
      micros: ["5e_conj_identifier"],
    },
    {
      titre: "Pour conjuguer un verbe jamais rencontré",
      detail:
        "Si tu sais où vont le « r » du futur et le « ons » de nous, tu conjugues un verbe régulier que tu n'as jamais vu, sans tableau.",
      schema: formePartira,
      micros: ["5e_conj_radical_terminaison"],
    },
    {
      titre: "Pour ne pas se tromper de temps en rédigeant",
      detail:
        "« Nous prenions » et « nous prendrions » ne sont pas la même chose. Une marque de différence, et deux sens : l'imparfait ou le conditionnel.",
      schema: composerPrenions,
      micros: ["5e_conj_composer"],
    },
  ],
  exemples: [
    {
      titre: "L'infinitif déguisé",
      donnees: "« Il vit la lumière au loin. »",
      schema: infinitifVit,
      question: "De quel verbe vient « vit » ?",
      solution:
        "DE VOIR, au passé simple. Le piège est « vivre », qui a bien une forme « il vit » — mais au PRÉSENT, et le sens de la phrase le refuse : on ne « vit » pas une lumière. Le contexte tranche, et c'est lui qu'il faut lire avant de décider.",
      micros: ["5e_conj_identifier"],
    },
    {
      titre: "Un autre déguisement",
      donnees: "« Ils durent renoncer au voyage. »",
      schema: infinitifDurent,
      question: "De quel verbe vient « durent » ?",
      solution:
        "DE DEVOIR, au passé simple. « Durer » ferait « ils durèrent », et surtout « durer » ne se construit pas avec un infinitif : on ne « dure » pas renoncer. Deux indices concordants — la forme et la construction.",
      micros: ["5e_conj_identifier"],
    },
    {
      titre: "Ce que porte la terminaison",
      donnees: "« nous chantions »",
      schema: formeChantions,
      question: "Que t'indique la terminaison ?",
      solution:
        "L'IMPARFAIT ET LA 1re PERSONNE DU PLURIEL — les deux à la fois. Le « i » est la marque du temps, le « ons » celle de la personne. C'est ce qui permet de conjuguer un verbe inconnu : on sait où poser chaque marque, même sans avoir jamais vu le verbe.",
      micros: ["5e_conj_radical_terminaison"],
    },
    {
      titre: "Le radical qui double",
      donnees: "« prendre » au présent, avec « ils »",
      schema: tableauPrendre,
      question: "« Prenent », « prendent » ou « prennent » ?",
      solution:
        "PRENNENT. À la 3e personne du pluriel, le « n » double. Écris les six personnes et la régularité saute aux yeux : cinq fois « pren- », une seule fois « prenn- ». Ce n'est pas une exception à mémoriser, c'est une variation à repérer.",
      micros: ["5e_conj_radical_variable"],
    },
    {
      titre: "Le verbe à deux radicaux",
      donnees: "« aller » au présent, avec « nous »",
      schema: tableauAller,
      question: "« Vons », « allons » ou « irons » ?",
      solution:
        "ALLONS. « Aller » a deux radicaux : « all- » avec nous et vous, « v- » partout ailleurs (je vais, ils vont). « Irons » existe, mais c'est le futur — un troisième radical encore. Le tableau des six personnes montre le partage d'un seul coup d'œil.",
      micros: ["5e_conj_radical_variable"],
    },
    {
      titre: "Fabriquer la forme demandée",
      donnees: "« Chaque soir, nous ___ le même chemin. » (prendre, imparfait)",
      schema: composerPrenions,
      question: "Quelle forme écris-tu ?",
      solution:
        "PRENIONS. Remplis les trois places : radical « pren- », marque d'imparfait « i », marque de personne « ons ». Le piège est « prendrions », qui met un « r » — donc le conditionnel, pas l'imparfait. Une marque de plus, et ce n'est plus le même temps.",
      micros: ["5e_conj_composer"],
    },
  ],
  pieges: [
    "Deviner l'infinitif à l'oreille : « il vit » ressemble à vivre et vient de voir ; « ils durent » ressemble à durer et vient de devoir.",
    "Prendre la terminaison pour un bloc : elle porte DEUX marques, et l'on peut changer la personne sans changer le temps.",
    "Écrire « nous prendrions » pour l'imparfait : le « r » est la marque du futur et du conditionnel, pas de l'imparfait.",
    "Apprendre les radicaux variables en liste : écris les six personnes, et la variation se voit — c'est presque toujours nous et vous qui gardent le radical.",
    "Confondre « nous prenons » et « ils prennent » : le n double seulement à la 3e personne du pluriel.",
    "Partir de la forme entière pour composer : on la fabrique morceau par morceau, jamais d'un bloc.",
  ],
  aRetenir: [
    "Trois places : radical + marque de TEMPS + marque de PERSONNE.",
    "La terminaison porte deux informations à la fois, et elles se changent séparément.",
    "Premier geste : retrouver l'infinitif — au passé simple, il se cache souvent.",
    "Un radical variable se VOIT en écrivant les six personnes ; il ne s'apprend pas.",
    "Composer est l'opération inverse d'analyser, et c'est celle qui se rate en rédigeant.",
  ],
  entrainement: [
    {
      question: "« Elle sut répondre sans hésiter. » De quel verbe vient « sut » ?",
      correction: "De SAVOIR, au passé simple. Pas de « suivre » ni de « servir ».",
      micros: ["5e_conj_identifier"],
    },
    {
      question: "« Nous pûmes enfin traverser. » Quel infinitif ?",
      correction: "POUVOIR. « Pûmes » est le passé simple, 1re personne du pluriel.",
      micros: ["5e_conj_identifier"],
    },
    {
      question: "« vous partirez » : que porte la terminaison ?",
      correction: "Le futur simple (le r) et la 2e personne du pluriel (le ez).",
      micros: ["5e_conj_radical_terminaison"],
    },
    {
      question: "« ils disaient » : quel temps, quelle personne ?",
      correction: "L'imparfait (le ai) et la 3e personne du pluriel (le ent).",
      micros: ["5e_conj_radical_terminaison"],
    },
    {
      question: "« vouloir » au présent avec « ils » : quelle forme ?",
      correction: "Veulent — le radical devient veul- à la 3e personne du pluriel.",
      micros: ["5e_conj_radical_variable"],
    },
    {
      question: "« Demain, vous ___ la réponse. » (savoir, futur simple)",
      correction: "Saurez : le radical devient saur- au futur, puis la marque -ez.",
      micros: ["5e_conj_composer"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesConjugaisonFormes5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La forme verbale - 5e",
    section: {
      type: "objectif",
      phrase: "Un verbe conjugué est un mot ASSEMBLÉ",
      sousPhrase:
        "Trois places : le radical, la marque de temps, la marque de personne. Qui les voit conjugue un verbe qu'il n'a jamais vu.",
      encadre: {
        titre: "L'idée",
        texte: "« Nous chantions » : le i dit l'imparfait, le ons dit nous. Deux marques.",
      },
    },
  },
  {
    titre: "Les trois places",
    badge: "La forme verbale - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le radical", texte: "Le sens du verbe : chant-, fini-, parti-." },
        { titre: "La marque de temps", texte: "Le i de l'imparfait, le r du futur." },
        { titre: "La marque de personne", texte: "-ons pour nous, -ez pour vous, -ont pour ils." },
        { titre: "La conséquence", texte: "On change l'une sans toucher aux deux autres." },
      ],
    },
    schema: pile(formeChantions, formeFiniront),
  },
  {
    titre: "L'infinitif se cache",
    badge: "La forme verbale - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "« Il vit la lumière. »",
        contenu: "Ce n'est pas « vivre » : c'est VOIR, au passé simple.",
      },
      droite: {
        titre: "« Ils durent renoncer. »",
        contenu: "Ce n'est pas « durer » : c'est DEVOIR.",
      },
    },
    schema: pile(infinitifVit, infinitifDurent),
  },
  {
    titre: "Le radical qui change",
    badge: "La forme verbale - 5e",
    section: {
      type: "etapes",
      etapes: [
        "J'écris les six personnes, sans en sauter une.",
        "La variation apparait d'un coup d'œil, en relief.",
        "« prendre » : cinq fois pren-, une seule fois prenn-.",
        "« aller » : all- avec nous et vous, v- partout ailleurs.",
      ],
    },
    schema: pile(tableauPrendre, tableauAller),
  },
  {
    titre: "Le futur est un ancien verbe",
    badge: "La forme verbale - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Le latin disait cantare habeo : « chanter j'ai », j'ai à chanter.",
        "Les deux mots se sont soudés au fil des siècles.",
        "cantare habeo est devenu « chanterai ».",
        "Le -ai du futur est le verbe avoir, aplati par mille cinq cents ans.",
      ],
    },
    schema: formePartira,
  },
  {
    titre: "À vous",
    badge: "La forme verbale - 5e",
    section: {
      type: "exercice",
      enonce: "« Chaque soir, nous ___ le même chemin. » (prendre, imparfait)",
      question: "Quelle forme écris-tu ?",
      indice: "Trois places à remplir : le radical, la marque du temps, celle de la personne.",
      correction:
        "PRENIONS. Radical pren-, marque d'imparfait i, marque de personne ons. « Prendrions » mettrait un r : ce serait le conditionnel.",
    },
    schema: composerPrenions,
  },
];
