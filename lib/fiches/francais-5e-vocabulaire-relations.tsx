// ─── Fiche de cours : les relations entre les mots (5e) ───────────────────────
// LA DEUXIÈME FICHE DE VOCABULAIRE DE LA 5e. Elle suit
// `francais-5e-vocabulaire-enrichir.tsx`, qui apprenait à ATTRAPER un mot ;
// celle-ci apprend à le RELIER aux autres.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ». ⛔ CE
// N'EST PAS LE PROGRAMME DE LA 4e. Ne rien transposer d'une classe à l'autre.
//
// ⭐⭐ CE QUI DISTINGUE CETTE FICHE DE CELLE DE 4e, ET IL FAUT LE GARDER : LA 5e
// NE NOMME PAS LA RELATION, ELLE LA FAIT. `francais-4e-vocabulaire-sens.tsx`
// demande « quelle relation lie ces mots ? » — une question d'étiquette. Le BO
// de 2026 demande à la 5e l'OPÉRATION : remplacer le mot, et vérifier que la
// phrase tient toujours debout. C'est l'angle de la table REMPLACER de la
// banque, et c'est ce qui s'apprend ici : un synonyme n'est un synonyme que
// DANS UNE PHRASE DONNÉE. « Costaud » et « vaillant » se ressemblent partout
// sauf là où on les emploie.
//
// ⛔ LE CANVAS `conjugaison` EST DÉTOURNÉ, ET LA CORRESPONDANCE EST FIXE. Elle
// vient de `francais-4e-vocabulaire-formation.tsx` et ne se change pas, sinon
// deux fiches disent deux choses à l'élève :
//     role: "temps"    → LE PRÉFIXE   (orange, devant)
//     role: "radical"  → LE RADICAL   (bleu, au centre)
//     role: "personne" → LE SUFFIXE   (vert, derrière)
// ⚠️ Les `note` se comptent en CARACTÈRES : c'est la note, et non le mot, qui
// fixe la largeur d'un wagon (CATALOGUE.md). Viser huit signes — « préfixe »,
// « négation », « le métier ». C'est pourquoi elles sont plus courtes ici qu'en
// 4e, où les dessins ne vivaient que dans des blocs larges.
//
// Alignée sur la table REMPLACER de
// lib/tutor-v4/questionBank/5e/francais/socle-lexique-discours.bank.ts et sur
// les tables AFFIXES et RACINES de vocabulaire-discours.bank.ts. Les mots sont
// ceux des récits de chevalerie que la 5e lit toute l'année.
//
// Micro-compétences couvertes (les 2 de la notion `vocabulaire_relations`) :
// - 5e_voc_relations        → figure, propriétés 1 à 4, formule, méthodes 1 et 2,
//                             usages 1 et 2, exemples 1 à 3
// - 5e_voc_prefixe_suffixe  → propriétés 5 et 6, méthodes 3 et 4, usage 3,
//                             exemples 4 à 6
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin `phrase` ;
// la couleur vient du `role` ou du `label`, jamais de l'appelant ; un mot par
// entrée, ponctuation comprise ; les blocs n'interprètent pas le markdown.

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

/** Le mot démonté en morceaux. ⛔ Correspondance FIXE des rôles :
 *  `temps` = préfixe (orange) · `radical` = radical (bleu) · `personne` =
 *  suffixe (vert). Le `note` écrit le vrai nom sous le wagon, en huit signes. */
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

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Ce qui se dessine quand on relie les mots ────────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : la même phrase, deux remplacements. L'un tient,
//    l'autre glisse — et c'est TOUT l'exercice de la 5e.
const remplacementJuste = phrase({
  mots: [
    { texte: "Le" },
    { texte: "chevalier" },
    { texte: "était" },
    { texte: "vaillant", barre: true },
    { texte: "courageux", focus: true },
    { texte: "au" },
    { texte: "combat" },
    { texte: "." },
  ],
  legende: "Le mot prend la place et la phrase ne bouge pas : c'est un synonyme.",
});

const remplacementFaux = phrase({
  mots: [
    { texte: "Le" },
    { texte: "chevalier" },
    { texte: "était" },
    { texte: "vaillant", barre: true },
    { texte: "costaud", focus: true },
    { texte: "au" },
    { texte: "combat" },
    { texte: "." },
  ],
  legende: "« Costaud » dit la force, pas le courage : la phrase a glissé.",
});

const remplacementLas = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vieil" },
    { texte: "homme" },
    { texte: "était" },
    { texte: "las", barre: true },
    { texte: "fatigué", focus: true },
    { texte: "." },
  ],
  legende: "Un mot rare remplacé par un mot courant : le sens ne bouge pas.",
});

// ── L'ANTONYME : la même phrase, et le monde bascule.
const antonymeHostile = phrase({
  mots: [
    { texte: "La" },
    { texte: "forêt" },
    { texte: "paraissait" },
    { texte: "hostile", focus: true },
    { texte: "aux" },
    { texte: "voyageurs" },
    { texte: "." },
  ],
  legende: "La forêt menace : les voyageurs vont avoir peur.",
});

const antonymeAccueillante = phrase({
  mots: [
    { texte: "La" },
    { texte: "forêt" },
    { texte: "paraissait" },
    { texte: "accueillante", focus: true },
    { texte: "aux" },
    { texte: "voyageurs" },
    { texte: "." },
  ],
  legende: "Un seul mot changé, et c'est le contraire : voilà un antonyme.",
});

// ── FAMILLE contre CHAMP LEXICAL : parenté de FORME, parenté de SENS.
const familleRadical = phrase({
  mots: [
    { texte: "terre", focus: true },
    { texte: "terrain", focus: true },
    { texte: "territoire", focus: true },
    { texte: "souterrain", focus: true },
  ],
  groupes: [{ mots: [0, 3], label: "même radical" }],
  legende: "Une FAMILLE : la même suite de lettres revient. Parenté de forme.",
});

const champLexicalChateau = phrase({
  mots: [
    { texte: "heaume" },
    { texte: "douve" },
    { texte: "monture" },
    { texte: "suzerain" },
  ],
  groupes: [{ mots: [0, 3], label: "même thème" }],
  legende: "Un CHAMP LEXICAL : aucun radical commun, un seul monde. Parenté de sens.",
});

// ── LE MOT CONSTRUIT, DÉMONTÉ EN WAGONS.
const motSouterrain = morceaux({
  segments: [
    { texte: "sous", role: "temps", note: "préfixe" },
    { texte: "terr", role: "radical", note: "la terre" },
    { texte: "ain", role: "personne", note: "suffixe" },
  ],
  legende: "« Souterrain » : ce qui est sous la terre. Le mot le dit tout seul.",
});

const motImpossible = morceaux({
  segments: [
    { texte: "im", role: "temps", note: "négation" },
    { texte: "possible", role: "radical", note: "radical" },
  ],
  legende: "Le PRÉFIXE change le sens : « im- » retourne le mot en son contraire.",
});

const motDentiste = morceaux({
  segments: [
    { texte: "dent", role: "radical", note: "radical" },
    { texte: "iste", role: "personne", note: "le métier" },
  ],
  legende: "Le SUFFIXE change la classe : d'une chose à celui qui s'en occupe.",
});

const motRelire = morceaux({
  segments: [
    { texte: "re", role: "temps", note: "à nouveau" },
    { texte: "lire", role: "radical", note: "radical" },
  ],
  legende: "Le même « re- » dans relire, refaire, revenir, redire : une seule clé.",
});

const motBuvable = morceaux({
  segments: [
    { texte: "buv", role: "radical", note: "boire" },
    { texte: "able", role: "personne", note: "qui peut" },
  ],
  legende: "« -able » : qu'on peut faire. Buvable, mangeable, lisible, portable.",
});

const motAntivol = morceaux({
  segments: [
    { texte: "anti", role: "temps", note: "contre" },
    { texte: "vol", role: "radical", note: "radical" },
  ],
  legende: "« Anti- » protège contre : antivol, antigel, antidote, anticyclone.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireRelations5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "vocabulaire-relations",
  titre: `Les relations entre les mots en 5e (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Le chevalier était vaillant au combat. » Remplace « vaillant » par « courageux » : la phrase ne bouge pas. Remplace-le par « costaud » : elle glisse — le costaud a des muscles, le vaillant a du courage, et ce n'est pas la même histoire. Un synonyme ne se reconnait pas dans une liste : il se vérifie dans une phrase.",
  identite: [
    { label: "Mots clés", valeur: "Synonyme, antonyme, famille, champ lexical, affixe" },
    { label: "Le secret", valeur: "Un synonyme ne l'est que dans une phrase donnée" },
    { label: "Outil", valeur: "Récrire la phrase entière, et la relire" },
  ],
  definition: {
    texte:
      "Les mots ne vivent pas seuls : ils se tiennent les uns les autres, et de quatre façons. Deux mots sont SYNONYMES quand l'un peut prendre la place de l'autre sans que la phrase change de sens — et cela se vérifie, phrase par phrase, jamais dans l'absolu. Ils sont ANTONYMES quand l'un dit le contraire de l'autre au même endroit. Ils font FAMILLE quand ils partagent un RADICAL, c'est-à-dire une suite de lettres : c'est une parenté de forme, qui se voit. Ils forment un CHAMP LEXICAL quand ils parlent du même monde sans rien avoir de commun à l'œil : c'est une parenté de sens. Et il y a le mot CONSTRUIT, qui porte sa relation en lui : un préfixe devant, un radical au centre, un suffixe derrière. Le préfixe change le SENS ; le suffixe change la CLASSE.",
  },
  figure: {
    schema: pile(remplacementJuste, remplacementFaux),
    legende:
      "La même phrase, deux fois, et un seul mot remplacé. En haut le mot barré cède sa place et rien ne bouge : « courageux » est bien un synonyme de « vaillant » ICI. En bas, « costaud » est pourtant un mot proche — et la phrase ne dit plus la même chose. C'est cet essai, et lui seul, qui tranche.",
  },
  proprietes: [
    {
      titre: "Un synonyme se vérifie dans la phrase",
      texte:
        "Il prend la place de l'autre et la phrase garde son sens. Aucun mot n'est synonyme d'un autre partout : c'est le contexte qui décide.",
      schema: pile(remplacementJuste, remplacementLas),
      micros: ["5e_voc_relations"],
    },
    {
      titre: "Presque le même sens ne suffit pas",
      texte:
        "« Costaud », « content », « curieux » sont proches de « vaillant » — et aucun ne tient dans la phrase. Le presque-synonyme est le vrai piège.",
      schema: remplacementFaux,
      micros: ["5e_voc_relations"],
    },
    {
      titre: "L'antonyme dit le contraire, au même endroit",
      texte:
        "Un seul mot change, et toute la phrase bascule. C'est le même test que pour le synonyme, mené jusqu'au bout du sens.",
      schema: pile(antonymeHostile, antonymeAccueillante),
      micros: ["5e_voc_relations"],
    },
    {
      titre: "Famille et champ lexical ne se ressemblent pas",
      texte:
        "La famille partage un RADICAL, une suite de lettres qui se voit. Le champ lexical partage un THÈME, et ses mots n'ont rien de commun à l'œil.",
      schema: pile(familleRadical, champLexicalChateau),
      micros: ["5e_voc_relations"],
    },
    {
      titre: "Un mot construit se lit en morceaux",
      texte:
        "Préfixe devant, radical au centre, suffixe derrière. Trouve le radical d'abord : c'est lui qui porte le sens, le reste s'y accroche.",
      schema: motSouterrain,
      micros: ["5e_voc_prefixe_suffixe"],
    },
    {
      titre: "Le préfixe change le sens, le suffixe change la classe",
      texte:
        "« Im- » retourne « possible » en son contraire, et cela reste un adjectif. « -iste » fait de « dent » un métier, donc un nom de personne.",
      schema: pile(motImpossible, motDentiste),
      micros: ["5e_voc_prefixe_suffixe"],
    },
    {
      titre: "Un affixe connu ouvre plusieurs mots à la fois",
      texte:
        "« Re- » se retrouve dans relire, refaire, revenir. « -able » dans buvable, mangeable, portable. Une clé, et une dizaine de portes.",
      schema: pile(motRelire, motBuvable),
      micros: ["5e_voc_prefixe_suffixe"],
    },
  ],
  reel: {
    texte:
      "« Anticyclone. » Le mot passe à la radio tous les jours d'hiver austral, et il se démonte comme les autres : « anti- » contre, « cyclone » le vent tournant. Un anticyclone est ce qui s'oppose au cyclone — de l'air qui descend, un ciel dégagé, pas de pluie. Personne n'a besoin de l'avoir appris pour le comprendre : il suffit de connaitre le préfixe. C'est vrai de la moitié du vocabulaire que tu rencontres au collège, et pas seulement en français : « hydraulique », « thermomètre », « biodiversité », « géothermie » sont tous construits ainsi. Apprendre quinze préfixes et quinze suffixes, c'est ouvrir des centaines de mots qu'on n'a jamais vus — en SVT, en physique, en histoire, et sur les panneaux de la route.",
  },
  historique: {
    texte:
      "Les morceaux qui servent à fabriquer les mots français sont beaucoup plus vieux que le français. « Télé- », qui veut dire « loin » en grec ancien, a d'abord servi pour le télescope au XVIIe siècle, puis pour le télégraphe, puis le téléphone, puis la télévision — et enfin, en 2020, pour le télétravail. Un élément de langue parlé il y a deux mille cinq cents ans a servi à nommer une façon de travailler inventée pendant une épidémie. C'est cela, un affixe vivant : il ne vieillit pas, il resservira. Et l'on peut souvent dater un mot à son préfixe — « cyber- » ne peut pas avoir plus de quarante ans, « éco- » pas plus de cinquante, tandis que « re- », lui, vient du latin et n'a jamais cessé de servir.",
  },
  formule: {
    contexte: "Le test qui décide si deux mots sont vraiment synonymes.",
    expression: "je récris la phrase entière avec le mot proposé, et je la relis",
    legende:
      "Pas le mot tout seul : la PHRASE ENTIÈRE, relue à voix haute. Si quelque chose sonne faux, ou si le sens a glissé d'un pas, ce n'était pas le bon mot — même s'il figure dans la liste des synonymes du dictionnaire.",
    schema: pile(remplacementJuste, remplacementFaux),
  },
  methode: [
    {
      titre: "Remplacer, puis relire en entier",
      texte:
        "Jamais le mot seul : la phrase entière, à voix haute. Le sens a-t-il bougé d'un pas ? Alors ce n'était pas un synonyme ici.",
      schema: remplacementLas,
      micros: ["5e_voc_relations"],
    },
    {
      titre: "Pour trancher famille ou champ lexical : chercher les lettres",
      texte:
        "Une suite de lettres commune ? C'est une famille. Rien de commun à l'œil, mais un même monde ? C'est un champ lexical.",
      schema: pile(familleRadical, champLexicalChateau),
      micros: ["5e_voc_relations"],
    },
    {
      titre: "Trouver le radical d'abord",
      texte:
        "Cache ce qu'il y a devant et derrière : ce qui reste porte le sens. « Souterrain » sans « sous » ni « ain », il reste la terre.",
      schema: motSouterrain,
      micros: ["5e_voc_prefixe_suffixe"],
    },
    {
      titre: "Pour deviner un affixe : chercher deux autres mots",
      texte:
        "Un préfixe seul ne veut rien dire. « Anti- » dans antivol, antigel, antidote : ce que les trois ont en commun est son sens.",
      schema: motAntivol,
      micros: ["5e_voc_prefixe_suffixe"],
    },
  ],
  usages: [
    {
      titre: "Pour écrire sans répéter",
      detail:
        "Un paragraphe qui dit trois fois « la forêt » se remplace par « les bois », « les arbres », « ce lieu sombre » — à condition de relire chaque fois.",
      schema: remplacementJuste,
      micros: ["5e_voc_relations"],
    },
    {
      titre: "Pour décrire une atmosphère",
      detail:
        "Un champ lexical bien choisi installe un décor sans le décrire : trois mots du monde du château, et le lecteur y est.",
      schema: champLexicalChateau,
      micros: ["5e_voc_relations"],
    },
    {
      titre: "Pour comprendre un mot savant en sciences",
      detail:
        "« Hydravion », « thermomètre », « biodiversité » : le mot est neuf pour toi, ses morceaux ne le sont pas. Démonte, et lis.",
      schema: pile(motAntivol, motSouterrain),
      micros: ["5e_voc_prefixe_suffixe"],
    },
  ],
  exemples: [
    {
      titre: "Le remplacement qui tient",
      donnees: "« Ils entreprirent un périlleux voyage. »",
      schema: remplacementJuste,
      question: "Quel mot peut prendre la place de « périlleux » ?",
      solution:
        "DANGEREUX. Récris la phrase entière : « Ils entreprirent un dangereux voyage. » Elle tient, et le sens est intact. « Difficile », « lointain », « couteux » sont pourtant plausibles — mais aucun ne dit le danger, et c'est ce que « périlleux » disait.",
      micros: ["5e_voc_relations"],
    },
    {
      titre: "Le presque-synonyme",
      donnees: "« Elle demeura muette devant l'accusation. »",
      schema: remplacementFaux,
      question: "« Sourde », « immobile » ou « silencieuse » ?",
      solution:
        "SILENCIEUSE. Les deux autres sont des pièges qui parlent du même corps : « sourde » dit qu'elle n'entend pas, « immobile » qu'elle ne bouge pas. « Muette » dit qu'elle ne parle pas — et c'est de sa réponse qu'il s'agit, pas de ses oreilles.",
      micros: ["5e_voc_relations"],
    },
    {
      titre: "Famille ou champ lexical ?",
      donnees: "« heaume, douve, monture, suzerain »",
      schema: champLexicalChateau,
      question: "Quelle relation lie ces mots ?",
      solution:
        "Aucune suite de lettres ne revient : ce n'est pas une famille. Mais tous appartiennent au monde du château et de la chevalerie — c'est un CHAMP LEXICAL. Une famille serait « terre, terrain, territoire, souterrain » : là, le radical se voit à l'œil nu.",
      micros: ["5e_voc_relations"],
    },
    {
      titre: "Un mot à démonter",
      donnees: "« transporter »",
      schema: motSouterrain,
      question: "Que signifie « trans- » ?",
      solution:
        "Le passage d'un lieu à un autre. Cache le préfixe : il reste « porter ». Transporter, c'est donc porter d'un endroit à un autre. Le même « trans- » est dans transatlantique, transpercer, transmettre — et il y dit toujours la traversée.",
      micros: ["5e_voc_prefixe_suffixe"],
    },
    {
      titre: "Le suffixe qui change la classe",
      donnees: "« lenteur »",
      schema: motDentiste,
      question: "Qu'a fait le suffixe « -eur » ?",
      solution:
        "Il a transformé l'adjectif « lent » en un NOM : la lenteur. Le suffixe ne change pas le sens — c'est toujours la même idée —, il change la classe grammaticale, donc la place du mot dans la phrase. « Lent » qualifie un nom ; « lenteur » peut être sujet ou complément.",
      micros: ["5e_voc_prefixe_suffixe"],
    },
    {
      titre: "Deviner un affixe jamais appris",
      donnees: "« bicyclette, bimensuel, bilingue »",
      schema: motAntivol,
      question: "Que signifie « bi- » ?",
      solution:
        "Le nombre DEUX. Une bicyclette a deux roues, un journal bimensuel parait deux fois par mois, une personne bilingue parle deux langues. Aucun des trois mots n'était à apprendre : il suffisait de chercher ce qu'ils ont en commun.",
      micros: ["5e_voc_prefixe_suffixe"],
    },
  ],
  pieges: [
    "Croire qu'un synonyme l'est partout : « vaillant » et « costaud » ne se remplacent pas au combat, même si le dictionnaire les voisine.",
    "Ne remplacer que le mot, dans sa tête : le test n'a de valeur qu'en relisant la PHRASE ENTIÈRE.",
    "Prendre un champ lexical pour une famille : « heaume » et « douve » parlent du même monde, sans un radical commun.",
    "Prendre pour un préfixe le début d'un mot : le « ré- » de « réel » n'est pas celui de « refaire », et « terrible » n'est pas de la famille de « terre ».",
    "Croire que le suffixe change le sens : c'est le préfixe qui le fait. Le suffixe, lui, change la classe du mot.",
    "Apprendre les affixes en liste : un préfixe seul ne veut rien dire. Il s'apprend dans deux ou trois mots qui le portent.",
  ],
  aRetenir: [
    "Un synonyme se vérifie : on remplace, on relit la phrase entière, on regarde si le sens a bougé.",
    "Famille = même radical, parenté de forme. Champ lexical = même thème, parenté de sens.",
    "Préfixe devant, radical au centre, suffixe derrière — et le radical porte le sens.",
    "Le PRÉFIXE change le sens ; le SUFFIXE change la classe du mot.",
    "Un affixe s'apprend dans trois mots qui le portent, jamais tout seul.",
  ],
  entrainement: [
    {
      question: "« Il répondit d'un ton assuré. » Quel mot peut prendre la place de « assuré » ?",
      correction: "Ferme. « Fort », « doux », « vif » parlent de la voix, pas de la confiance.",
      micros: ["5e_voc_relations"],
    },
    {
      question: "« La nouvelle se répandit avec célérité. » Par quel mot remplacer « célérité » ?",
      correction: "Rapidité. Récris la phrase entière : elle tient, et rien n'a bougé.",
      micros: ["5e_voc_relations"],
    },
    {
      question: "« voile, mât, écume, marée » : famille ou champ lexical ?",
      correction: "Champ lexical : aucun radical commun, mais un seul monde — la mer.",
      micros: ["5e_voc_relations"],
    },
    {
      question: "Dans « prévoir », que signifie « pré- » ?",
      correction: "Ce qui vient avant : prévoir, c'est voir avant. Comme prédire, prévenir.",
      micros: ["5e_voc_prefixe_suffixe"],
    },
    {
      question: "Dans « fillette », que signifie « -ette » ?",
      correction: "Le petit : c'est un diminutif. Comme maisonnette, camionnette, tartelette.",
      micros: ["5e_voc_prefixe_suffixe"],
    },
    {
      question: "Dans « hypermarché », que signifie « hyper- » ?",
      correction: "Le degré supérieur, l'excès — plus grand qu'un supermarché.",
      micros: ["5e_voc_prefixe_suffixe"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesVocabulaireRelations5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les relations entre les mots - 5e",
    section: {
      type: "objectif",
      phrase: "Un synonyme se vérifie, il ne se récite pas",
      sousPhrase:
        "Deux mots ne sont synonymes que dans une phrase donnée. Ailleurs, ils se séparent.",
      encadre: {
        titre: "L'idée",
        texte: "« Vaillant » et « courageux » tiennent au combat. « Costaud » n'y tient pas.",
      },
    },
  },
  {
    titre: "Le test, en quatre gestes",
    badge: "Les relations entre les mots - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Je choisis le mot que je veux mettre à la place.",
        "Je récris la PHRASE ENTIÈRE avec lui.",
        "Je la relis à voix haute.",
        "Si quelque chose sonne faux, ou si le sens a glissé, ce n'était pas le bon.",
      ],
    },
    schema: remplacementJuste,
  },
  {
    titre: "Parenté de forme, parenté de sens",
    badge: "Les relations entre les mots - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "La FAMILLE",
        contenu: "terre, terrain, territoire, souterrain. Le radical se voit à l'œil nu.",
      },
      droite: {
        titre: "Le CHAMP LEXICAL",
        contenu: "heaume, douve, monture, suzerain. Rien de commun, sauf le monde.",
      },
    },
    schema: pile(familleRadical, champLexicalChateau),
  },
  {
    titre: "Le mot démonté",
    badge: "Les relations entre les mots - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le préfixe", texte: "Devant. Il change le SENS : possible, impossible." },
        { titre: "Le radical", texte: "Au centre. C'est lui qui porte le sens du mot." },
        { titre: "Le suffixe", texte: "Derrière. Il change la CLASSE : dent, dentiste." },
        { titre: "La clé", texte: "Un affixe connu ouvre dix mots qu'on n'a jamais vus." },
      ],
    },
    schema: pile(motSouterrain, motDentiste),
  },
  {
    titre: "Un mot de tous les jours",
    badge: "Les relations entre les mots - 5e",
    section: {
      type: "etapes",
      etapes: [
        "« Anticyclone » : personne ne l'a appris, tout le monde le comprend.",
        "« Anti- » : contre. On le retrouve dans antivol, antigel, antidote.",
        "« Cyclone » : le vent qui tourne.",
        "Un anticyclone s'oppose donc au cyclone : ciel dégagé, pas de pluie.",
      ],
    },
    schema: motAntivol,
  },
  {
    titre: "À vous",
    badge: "Les relations entre les mots - 5e",
    section: {
      type: "exercice",
      enonce: "« bicyclette, bimensuel, bilingue »",
      question: "Que signifie « bi- » ?",
      indice: "Compte les roues, les parutions, les langues.",
      correction:
        "Le nombre DEUX. Deux roues, deux fois par mois, deux langues. Aucun des trois mots n'était à apprendre : il suffisait de chercher ce qu'ils ont en commun.",
    },
    schema: motRelire,
  },
];
