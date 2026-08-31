// ─── Fiche de cours : écrire les mots avec justesse (5e) ──────────────────────
// LA CINQUIÈME ET DERNIÈRE FICHE DU LEXIQUE DE LA 5e. Elle ferme le domaine
// « Vocabulaire et orthographe lexicale », ouvert le 26/08/2026 par
// `francais-5e-vocabulaire-enrichir.tsx`.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ». Deux
// objectifs : « Écrire avec justesse les mots étudiés » et « Comprendre le
// principe de la dérivation des mots et son incidence sur l'orthographe ».
// ⛔ CE N'EST PAS LE PROGRAMME DE LA 4e.
//
// ⛔⛔ ORTHOGRAPHE LEXICALE, PAS GRAMMATICALE. Les accords — sujet-verbe, groupe
// nominal, participe passé — sont dans `orthographe_accords` et
// `orthographe_participe`, qui ont déjà leurs fiches. Ici on n'accorde rien : on
// écrit un MOT, et ce qui le décide est son SENS ou sa FAMILLE, jamais sa
// fonction dans la phrase.
//
// ⭐ L'IDÉE QUI TIENT TOUTE LA FICHE, ET QUE LES DEUX MICROS PARTAGENT SANS QUE
// LE PROGRAMME LE DISE : DANS LES DEUX CAS, ON NE SE SOUVIENT PAS, ON RAISONNE.
// Pour la lettre muette, on cherche un mot de la famille où elle s'entend
// (tapis → tapisser). Pour l'homophone, on remplace le mot par sa définition
// (sont → étaient). Deux gestes, un seul principe : l'orthographe d'un mot se
// retrouve, elle ne se récite pas. C'est ce qui rend la leçon utile à un élève
// qui « ne retient pas l'orthographe » — il n'a pas à la retenir.
//
// ⭐ LE CANVAS `conjugaison` EN WAGONS MONTRE CE QU'AUCUNE PHRASE NE DIT : la
// lettre muette est DANS le radical, et le suffixe la réveille. `tapis` + `ser`,
// et le « s » qu'on n'entendait pas se met à sonner au joint des deux wagons.
// ⛔ Correspondance fixe conservée : temps = préfixe (orange), radical = radical
// (bleu), personne = suffixe (vert). ⚠️ `note` en huit signes.
//
// ⚠️ LES LEURRES DE LA BANQUE SONT DES FAUTES VOLONTAIRES (en-tête de
// socle-lexique-discours.bank.ts) : « plustôt », « dificile », « patiance ». La
// fiche n'en écrit AUCUNE — un élève qui lit une faute la mémorise. Elle
// n'écrit que la forme juste, et dit ce qui la décide.
//
// Alignée sur la table ORTHOGRAPHE de
// lib/tutor-v4/questionBank/5e/francais/socle-lexique-discours.bank.ts et sur la
// table FAMILLES de vocabulaire-discours.bank.ts.
//
// Micro-compétences couvertes (les 2 de la notion `vocabulaire_orthographe`) :
// - 5e_voc_derivation_orthographe → figure, propriétés 1 à 3, formule,
//                                   méthodes 1 et 2, usage 1, exemples 1 à 3
// - 5e_voc_orthographe            → propriétés 4 à 6, méthodes 3 et 4,
//                                   usages 2 et 3, exemples 4 à 6
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin `phrase` ;
// un mot par entrée, ponctuation comprise ; les blocs n'interprètent pas le
// markdown ; aucun caractère d'une autre écriture.

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

/** Le mot dérivé, démonté : la lettre muette est dans le radical, et le suffixe
 *  la réveille. ⛔ Correspondance FIXE : `temps` = préfixe (orange) ·
 *  `radical` = radical (bleu) · `personne` = suffixe (vert). */
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

// ─── Ce qui se dessine quand on écrit un mot ──────────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : la lettre muette est dans le radical, et le
//    suffixe la réveille. On la VOIT passer d'un wagon à l'autre.
const muetTapis = morceaux({
  segments: [
    { texte: "tapis", role: "radical", note: "s muet" },
    { texte: "ser", role: "personne", note: "s'entend" },
  ],
  legende: "« Tapisser » fait sonner le s de « tapis ». La famille écrit le mot.",
});

const muetGalop = morceaux({
  segments: [
    { texte: "galop", role: "radical", note: "p muet" },
    { texte: "er", role: "personne", note: "s'entend" },
  ],
  legende: "« Galoper » fait sonner le p. Sans lui, on écrirait « galo ».",
});

const muetBond = morceaux({
  segments: [
    { texte: "bond", role: "radical", note: "d muet" },
    { texte: "ir", role: "personne", note: "s'entend" },
  ],
  legende: "« Bondir » réveille le d. Le verbe est la clé du nom.",
});

const muetLong = morceaux({
  segments: [
    { texte: "long", role: "radical", note: "g muet" },
    { texte: "ueur", role: "personne", note: "s'entend" },
  ],
  legende: "« Longueur » réveille le g — et « longue » aussi, au féminin.",
});

const muetRespect = morceaux({
  segments: [
    { texte: "respect", role: "radical", note: "ct muet" },
    { texte: "er", role: "personne", note: "s'entend" },
  ],
  legende: "Deux lettres muettes d'un coup : « respecter » les fait entendre.",
});

// ── LA FAMILLE, VUE COMME UNE CHAÎNE : un mot en écrit un autre.
const chaineDent = phrase({
  mots: [{ texte: "dent", focus: true }, { texte: "dentiste", focus: true }],
  liens: [{ de: 1, vers: 0, label: "écrit", type: "question" }],
  legende: "Le mot où la lettre s'entend décide de l'écriture de l'autre.",
});

// ── L'HOMOPHONE : deux mots que l'oreille confond et que le SENS sépare.
const homophonePlusTot = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "est" },
    { texte: "arrivée" },
    { texte: "plutôt", barre: true },
    { texte: "plus tôt", focus: true },
    { texte: "que" },
    { texte: "prévu" },
    { texte: "." },
  ],
  legende: "« Plus tôt » s'oppose à « plus tard ». Le test tient en un mot.",
});

const homophoneSont = phrase({
  mots: [
    { texte: "Ils" },
    { texte: "son", barre: true },
    { texte: "sont", focus: true },
    { texte: "partis" },
    { texte: "sans" },
    { texte: "nous" },
    { texte: "." },
  ],
  legende: "Remplace par « étaient » : si la phrase tient, c'est « sont ».",
});

const homophoneOu = phrase({
  mots: [
    { texte: "Ou", barre: true },
    { texte: "Où", focus: true },
    { texte: "vas-tu" },
    { texte: "si" },
    { texte: "tard" },
    { texte: "?" },
  ],
  legende: "« Où » indique un lieu ; « ou » propose un choix entre deux choses.",
});

const homophoneSa = phrase({
  mots: [
    { texte: "Le" },
    { texte: "chien" },
    { texte: "remue" },
    { texte: "ça", barre: true, nature: "pronom" },
    { texte: "sa", focus: true, nature: "déterminant" },
    { texte: "queue" },
    { texte: "." },
  ],
  legende: "« Sa » accompagne un nom ; « ça » le remplace. Deux classes, deux mots.",
});

const homophoneDes = phrase({
  mots: [
    { texte: "Des", barre: true },
    { texte: "Dès", focus: true },
    { texte: "le" },
    { texte: "matin" },
    { texte: "," },
    { texte: "il" },
    { texte: "travaille" },
    { texte: "." },
  ],
  legende: "« Dès » veut dire « à partir de ». Remplace, et la phrase le confirme.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireOrthographe5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "vocabulaire-orthographe",
  titre: `Écrire les mots avec justesse en 5e (${ANNEE_SCOLAIRE})`,
  accroche:
    "Comment sais-tu qu'il y a un « s » à la fin de « tapis » ? Tu ne l'entends pas. Mais dis « tapisser », et le voilà. La lettre muette n'est pas un caprice : elle dort dans le mot, et un autre mot de la même famille vient la réveiller. L'orthographe d'un mot ne se retient pas — elle se retrouve.",
  identite: [
    { label: "Mots clés", valeur: "Lettre muette, famille, dérivation, homophone" },
    { label: "Le secret", valeur: "On ne se souvient pas, on raisonne" },
    { label: "Outil", valeur: "Un mot de la famille, ou le remplacement" },
  ],
  definition: {
    texte:
      "Deux difficultés, et un seul principe. La première est la LETTRE MUETTE : « tapis », « galop », « bond », « respect » finissent par une lettre qu'on n'entend pas. Elle n'est pas là par hasard — elle appartient à la famille du mot, et un mot dérivé la fait sonner : tapisser, galoper, bondir, respecter. La seconde est l'HOMOPHONE LEXICAL : « plutôt » et « plus tôt », « sont » et « son », « où » et « ou », « sa » et « ça » s'entendent pareil et ne s'écrivent pas pareil. L'oreille ne peut rien pour toi ; le SENS, lui, tranche sans hésiter, à condition de remplacer le mot par ce qu'il veut dire. Dans les deux cas, on ne se souvient pas : on raisonne. C'est pourquoi cette leçon sert même à celui qui pense « ne pas retenir l'orthographe » — il n'a rien à retenir.",
  },
  figure: {
    schema: pile(muetTapis, muetGalop),
    legende:
      "Le mot est démonté en deux wagons. La lettre muette est DANS le radical — le « s » de tapis, le « p » de galop — et le suffixe accroché derrière la réveille : on l'entend au joint des deux wagons. C'est tout le mécanisme de la dérivation appliqué à l'écriture, et il se voit ici au lieu de s'expliquer.",
  },
  proprietes: [
    {
      titre: "La lettre muette dort dans le mot",
      texte:
        "Elle appartient à la famille, pas au hasard. Un mot dérivé la fait entendre : tapis → tapisser, galop → galoper.",
      schema: pile(muetTapis, muetGalop),
      micros: ["5e_voc_derivation_orthographe"],
    },
    {
      titre: "Le verbe est souvent la clé du nom",
      texte:
        "« Bond » s'écrit avec un d parce que « bondir » le dit. « Chant » avec un t parce que « chanter » le dit.",
      schema: muetBond,
      micros: ["5e_voc_derivation_orthographe"],
    },
    {
      titre: "Le féminin et le nom marchent aussi",
      texte:
        "« Long » garde son g : « longue », « longueur ». « Gros » garde son s : « grosse », « grossir ». Cherche n'importe quel parent.",
      schema: pile(muetLong, chaineDent),
      micros: ["5e_voc_derivation_orthographe"],
    },
    {
      titre: "Deux lettres muettes se réveillent ensemble",
      texte:
        "« Respect » finit par c ET par t, et « respecter » les fait sonner toutes les deux. Un seul mot dérivé suffit.",
      schema: muetRespect,
      micros: ["5e_voc_derivation_orthographe"],
    },
    {
      titre: "L'oreille ne tranche pas un homophone",
      texte:
        "« Plutôt » et « plus tôt » sonnent pareil. Il faut remplacer le mot par ce qu'il veut dire : « de préférence », ou « plus tard » à l'envers.",
      schema: homophonePlusTot,
      micros: ["5e_voc_orthographe"],
    },
    {
      titre: "Chaque homophone a son test",
      texte:
        "« Sont » se remplace par « étaient ». « Son » par « le sien ». « Où » indique un lieu, « ou » propose un choix.",
      schema: pile(homophoneSont, homophoneOu),
      micros: ["5e_voc_orthographe"],
    },
    {
      titre: "Parfois c'est la classe du mot qui décide",
      texte:
        "« Sa » accompagne un nom : c'est un déterminant. « Ça » remplace un nom : c'est un pronom. Regarde ce qui suit.",
      schema: pile(homophoneSa, homophoneDes),
      micros: ["5e_voc_orthographe"],
    },
  ],
  reel: {
    texte:
      "« Je viens plutôt vers 15 h » et « je viens plus tôt, vers 15 h » ne disent pas la même chose : le premier hésite encore, le second annonce qu'il avance l'heure. Un message envoyé à la va-vite, une lettre muette oubliée, un « où » écrit « ou », et celui qui te lit comprend autre chose que ce que tu voulais dire — sans pouvoir te le demander. C'est là que l'orthographe cesse d'être une affaire de note : à l'oral tu peux corriger, préciser, montrer du doigt ; à l'écrit tu n'es pas là. Le lecteur n'a que tes lettres. Une candidature, un mot d'excuse, un message à un professeur ou à un employeur se lisent sans toi, et ils te ressemblent.",
  },
  historique: {
    texte:
      "Beaucoup de lettres muettes ont été ajoutées volontairement, et parfois par erreur. Au Moyen Âge, les copistes étaient payés à la lettre, et l'on soupçonne quelques « h » et quelques doubles consonnes d'y avoir gagné leur place. Plus sérieusement, les savants de la Renaissance ont voulu rendre visible l'origine latine des mots : ils ont glissé un « g » dans « doigt » pour rappeler digitus, un « p » dans « corps » pour corpus, un « b » dans « doubter » pour dubitare — celui-là est reparti depuis, et l'on écrit « douter ». Le meilleur exemple est « poids » : son « d » vient d'un rapprochement avec le latin pondus, alors que le mot descend en réalité de pensum. La lettre est fausse, elle est restée. L'orthographe garde ainsi la trace de ce que les gens ont cru, autant que de ce qui est vrai.",
  },
  formule: {
    contexte: "Le geste qui trouve la lettre muette, sans dictionnaire et sans mémoire.",
    expression: "je cherche un mot de la même famille où la lettre s'entend",
    legende:
      "Un verbe, un féminin, un nom dérivé : n'importe quel parent fait l'affaire. « Tard » ? « Tardif » — le d s'entend. « Sang » ? « Sanguin ». « Lait » ? « Laitier ». La lettre était là depuis le début ; il fallait un mot pour la réveiller.",
    schema: muetTapis,
  },
  methode: [
    {
      titre: "Chercher un verbe de la même famille",
      texte:
        "C'est le parent le plus fiable : bond → bondir, camp → camper, chant → chanter, respect → respecter. Le verbe fait presque toujours sonner la fin.",
      schema: muetBond,
      micros: ["5e_voc_derivation_orthographe"],
    },
    {
      titre: "À défaut, essayer le féminin ou un nom",
      texte:
        "« Gros » → « grosse ». « Long » → « longue », « longueur ». « Froid » → « froideur ». Tout parent où la lettre s'entend fait l'affaire.",
      schema: pile(muetLong, chaineDent),
      micros: ["5e_voc_derivation_orthographe"],
    },
    {
      titre: "Remplacer l'homophone par sa définition",
      texte:
        "« Sont » par « étaient ». « Dès » par « à partir de ». Si la phrase tient, c'est le bon. Le test décide sans hésiter.",
      schema: pile(homophoneSont, homophoneDes),
      micros: ["5e_voc_orthographe"],
    },
    {
      titre: "Regarder ce qui suit le mot",
      texte:
        "Un nom derrière ? C'est « sa », déterminant. Rien derrière, ou un verbe ? C'est « ça », pronom. La place tranche quand le sens hésite.",
      schema: homophoneSa,
      micros: ["5e_voc_orthographe"],
    },
  ],
  usages: [
    {
      titre: "Pour se relire vraiment",
      detail:
        "On ne repère pas une faute en relisant vite. On la repère en s'arrêtant sur les fins de mots, et en cherchant un parent pour chacune qui hésite.",
      schema: muetRespect,
      micros: ["5e_voc_derivation_orthographe"],
    },
    {
      titre: "Pour une dictée",
      detail:
        "Les mots dictés sont presque toujours des mots de famille connue. Le temps de la relecture sert à réveiller les lettres, pas à deviner.",
      schema: pile(muetTapis, muetGalop),
      micros: ["5e_voc_orthographe"],
    },
    {
      titre: "Pour un message qu'on ne pourra pas rattraper",
      detail:
        "Celui qui te lit n'est pas là pour te demander ce que tu voulais dire. « Plutôt » et « plus tôt » fixent deux rendez-vous différents.",
      schema: homophonePlusTot,
      micros: ["5e_voc_orthographe"],
    },
  ],
  exemples: [
    {
      titre: "Une fin de mot qui hésite",
      donnees: "« Il rentra ___ dans la nuit. » (tar / tard)",
      schema: muetBond,
      question: "Comment trancher sans dictionnaire ?",
      solution:
        "Cherche un mot de la famille : « TARDIF », ou « attarder ». Le d s'entend dans les deux. On écrit donc « tard ». Aucune mémoire n'a été sollicitée : un parent a suffi, et il en existe toujours au moins un.",
      micros: ["5e_voc_derivation_orthographe"],
    },
    {
      titre: "Une lettre qu'on n'attendait pas",
      donnees: "« sang »",
      schema: muetTapis,
      question: "Pourquoi un g à la fin ?",
      solution:
        "Parce que « SANGUIN » le fait entendre — et « sanglant », et « sanguinaire ». Le g dort dans le nom et se réveille dans les dérivés. C'est le même mécanisme que pour le s de « tapis » : la famille écrit le mot.",
      micros: ["5e_voc_derivation_orthographe"],
    },
    {
      titre: "Deux lettres d'un coup",
      donnees: "« respect »",
      schema: muetRespect,
      question: "Quelle est la fin exacte ?",
      solution:
        "Un c ET un t : « RESPECTER » les fait sonner tous les deux. Sans le verbe, on écrirait « respé » ou « respec ». Un seul mot dérivé a réglé deux difficultés à la fois — c'est pour cela qu'on cherche le verbe d'abord.",
      micros: ["5e_voc_derivation_orthographe"],
    },
    {
      titre: "L'homophone du rendez-vous",
      donnees: "« Elle est arrivée ___ que prévu. »",
      schema: homophonePlusTot,
      question: "« Plutôt » ou « plus tôt » ?",
      solution:
        "PLUS TÔT, en deux mots : la phrase compare avec ce qui était prévu, et « plus tôt » s'oppose à « plus tard ». « Plutôt » veut dire « de préférence » — essaie-le dans la phrase : « elle est arrivée de préférence que prévu » ne veut rien dire.",
      micros: ["5e_voc_orthographe"],
    },
    {
      titre: "Le verbe ou le déterminant",
      donnees: "« Ils ___ partis sans nous. »",
      schema: homophoneSont,
      question: "« Son » ou « sont » ?",
      solution:
        "SONT. Remplace par « étaient » : « ils étaient partis sans nous » tient debout. « Son » se remplacerait par « le sien », et « ils le sien partis » ne veut rien dire. Un test, une seconde, aucune hésitation.",
      micros: ["5e_voc_orthographe"],
    },
    {
      titre: "Le lieu ou le choix",
      donnees: "« ___ vas-tu si tard ? » et « Prends le rouge ___ le bleu. »",
      schema: homophoneOu,
      question: "Où va l'accent ?",
      solution:
        "« OÙ vas-tu si tard ? » : la question porte sur un LIEU, donc accent. « Prends le rouge OU le bleu » : on propose un CHOIX, donc pas d'accent. Le test le plus rapide : remplace par « ou bien ». Si la phrase tient, c'est « ou » sans accent.",
      micros: ["5e_voc_orthographe"],
    },
  ],
  pieges: [
    "Croire que la lettre muette est arbitraire : elle appartient à la famille, et un dérivé la fait toujours entendre.",
    "Chercher le dérivé au hasard : le VERBE est le parent le plus fiable. Le féminin et le nom viennent ensuite.",
    "Trancher un homophone à l'oreille : ils sonnent pareil, c'est leur définition. Seul le remplacement décide.",
    "Écrire « plutôt » quand on compare deux moments : « plus tôt » s'oppose à « plus tard », en deux mots.",
    "Confondre « sa » et « ça » : le premier accompagne un nom, le second le remplace. Regarde ce qui suit.",
    "Se relire trop vite : une faute de lettre muette ne se voit pas, elle se cherche — fin de mot par fin de mot.",
  ],
  aRetenir: [
    "Une lettre muette se trouve par un mot de la même famille où elle s'entend.",
    "Le VERBE est le parent le plus fiable : bond → bondir, respect → respecter.",
    "Un homophone se tranche en remplaçant le mot par ce qu'il veut dire.",
    "« Sont » → « étaient ». « Dès » → « à partir de ». « Ou » → « ou bien ».",
    "Dans les deux cas on ne se souvient pas : on raisonne. Rien n'est à apprendre par cœur.",
  ],
  entrainement: [
    {
      question: "Quelle lettre à la fin de « lait », et quel mot le prouve ?",
      correction: "Un t : « laitier », « laitage ». Le t s'y entend.",
      micros: ["5e_voc_derivation_orthographe"],
    },
    {
      question: "Quelle lettre à la fin de « plomb », et quel mot le prouve ?",
      correction: "Un b : « plomberie », « plombier ». Le b s'y entend.",
      micros: ["5e_voc_derivation_orthographe"],
    },
    {
      question: "Quelle lettre à la fin de « toit », et quel mot le prouve ?",
      correction: "Un t : « toiture ». Un seul dérivé suffit à trancher.",
      micros: ["5e_voc_derivation_orthographe"],
    },
    {
      question: "« Je viendrai ___ demain. » : « plutôt » ou « plus tôt » ?",
      correction: "Plutôt : on peut le remplacer par « de préférence ».",
      micros: ["5e_voc_orthographe"],
    },
    {
      question: "« ___ frère habite à côté. » : « Son » ou « Sont » ?",
      correction: "Son : on peut le remplacer par « le sien ». « Étaient » ne tient pas.",
      micros: ["5e_voc_orthographe"],
    },
    {
      question: "« ___ ne me plait pas du tout. » : « Sa » ou « Ça » ?",
      correction: "Ça : il remplace un nom, aucun nom ne le suit. C'est un pronom.",
      micros: ["5e_voc_orthographe"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesVocabulaireOrthographe5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Écrire avec justesse - 5e",
    section: {
      type: "objectif",
      phrase: "L'orthographe se retrouve, elle ne se récite pas",
      sousPhrase:
        "Une lettre muette se réveille avec un mot de la famille. Un homophone se tranche en le remplaçant.",
      encadre: {
        titre: "L'idée",
        texte: "Le « s » de « tapis », tu ne l'entends pas. Dis « tapisser » : le voilà.",
      },
    },
  },
  {
    titre: "Réveiller la lettre muette",
    badge: "Écrire avec justesse - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Je m'arrête sur la fin du mot qui hésite.",
        "Je cherche un VERBE de la même famille : bondir, camper, chanter, respecter.",
        "À défaut, un féminin ou un nom : grosse, longue, longueur, froideur.",
        "La lettre s'entend dans le parent : je l'écris dans le mot de départ.",
      ],
    },
    schema: muetBond,
  },
  {
    titre: "Deux lettres d'un seul coup",
    badge: "Écrire avec justesse - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "« respect »",
        contenu: "Un c et un t, tous deux muets. Impossible à entendre.",
      },
      droite: {
        titre: "« respecter »",
        contenu: "Les deux sonnent. Un seul dérivé règle deux difficultés.",
      },
    },
    schema: muetRespect,
  },
  {
    titre: "Chaque homophone a son test",
    badge: "Écrire avec justesse - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "sont / son", texte: "« étaient » d'un côté, « le sien » de l'autre." },
        { titre: "où / ou", texte: "Un lieu, ou un choix. « Ou bien » tranche." },
        { titre: "plus tôt / plutôt", texte: "« Plus tard » à l'envers, ou « de préférence »." },
        { titre: "sa / ça", texte: "Un nom derrière : « sa ». Rien derrière : « ça »." },
      ],
    },
    schema: pile(homophoneSont, homophoneOu),
  },
  {
    titre: "Pourquoi ces lettres existent",
    badge: "Écrire avec justesse - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Les savants de la Renaissance ont voulu montrer l'origine latine des mots.",
        "Ils ont glissé un g dans « doigt », pour rappeler digitus.",
        "Un p dans « corps », pour corpus.",
        "Et un d dans « poids » — celui-là par erreur, et il est resté.",
      ],
    },
    schema: chaineDent,
  },
  {
    titre: "À vous",
    badge: "Écrire avec justesse - 5e",
    section: {
      type: "exercice",
      enonce: "« Il rentra ___ dans la nuit. »",
      question: "« tar » ou « tard » ? Et comment le prouver ?",
      indice: "Cherche un mot de la même famille où la dernière lettre s'entend.",
      correction:
        "« Tard », avec un d — parce que « tardif » et « attarder » le font entendre. Aucune mémoire : un parent a suffi.",
    },
    schema: muetGalop,
  },
];
