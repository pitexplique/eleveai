// ─── Fiche de cours : lire et former un verbe conjugué (4e) ───────────────────
// LA QUATRIÈME FICHE DE FRANÇAIS DE LA 4e.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020.
//
// ⛔⛔ DANS CE PROGRAMME, LE CONDITIONNEL EST UN MODE. La terminologie exigible
// dit « mode conditionnel présent, passé ». C'est l'INVERSE du texte de 2026
// suivi par la 5e, où il redevient un temps de l'indicatif. Les deux fiches
// disent donc deux choses différentes et elles ont raison chacune pour sa
// classe : ⛔ NE PAS « HARMONISER ». La 4e ne bascule qu'en septembre 2027.
//
// ⭐ CE QUE LE PROGRAMME NOMME LUI-MÊME, et qu'on ne peut donc pas choisir :
// « Mémoriser […] les verbes irréguliers du 3e groupe : faire, aller, dire,
// venir, pouvoir, voir, vouloir, prendre, savoir, falloir, valoir. » Onze, pas
// douze, pas dix. La fiche les liste tels quels.
//
// ⭐ LE CANVAS EST `conjugaison`, PAS `phrase`. L'objet de cette fiche est LE
// VERBE, seul, démonté en wagons : radical bleu, marque de temps orange, marque
// de personne verte. La couleur vient du `role` du segment — comme dans
// `phrase`, elle ne s'écrit jamais dans la fiche.
// ⚠️ Sa largeur par défaut est 250, pas 190 : le canvas `conjugaison` calcule sa
// hauteur autrement. On laisse le défaut, comme la fiche de 5e qui passe le
// vérificateur.
//
// Alignée sur les tables MODES, SUBJONCTIF, CONDITIONNEL, COMPOSES et
// IRREGULIERS de lib/tutor-v4/questionBank/4e/francais/conjugaison.bank.ts, et
// sur la table COMPOSER de socle-grammaire-conjugaison.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `conjugaison_formes`) :
// - 4e_conj_identifier       → définition, figure, propriétés 1 et 5, formule,
//                              méthodes 1 et 3, exemples 1 et 4
// - 4e_conj_modes_personnels → propriétés 2 et 3, méthode 2, exemples 2 et 3
// - 4e_conj_composer         → propriétés 4 et 6, méthodes 4 et 5, exemples 5 et 6
// - 4e_conj_irreguliers      → propriété 7, usages, exemple 7
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin (il élargit
// la boite et divise la police par deux) ; la couleur vient du `role` ou du
// `label`, jamais de l'appelant.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ConjugaisonLigne,
  ConjugaisonSegment,
} from "@/lib/tutor-v4/types";

/** La forme verbale démontée : radical + marque de temps + marque de personne. */
function wagons(opts: {
  infinitif?: string;
  pronom?: string;
  segments: ConjugaisonSegment[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "wagons",
        infinitif: opts.infinitif,
        pronom: opts.pronom,
        segments: opts.segments,
        legende: opts.legende,
      }}
    />
  );
}

/** Les deux caisses d'un temps composé. ⛔ JAMAIS de flèche d'accord ici : elle
 *  appartient à la fiche du participe passé, et deux dessins qui se ressemblent
 *  ne doivent pas raconter deux règles différentes. */
function composee(opts: {
  pronom?: string;
  auxiliaire: { texte: string; note?: string };
  participe: { texte: string; note?: string };
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
        legende: opts.legende,
      }}
    />
  );
}

/** Les six personnes d'un temps, la partie qui varie mise en relief. */
function tableau(opts: {
  temps: string;
  lignes: ConjugaisonLigne[];
  legende?: string;
}) {
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

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Les formes de la banque, démontées ───────────────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : deux formes qui ne diffèrent que d'un wagon, et
//    qui ne sont pourtant ni au même temps ni au même mode.
const imparfaitChanter = wagons({
  infinitif: "chanter",
  pronom: "il",
  segments: [
    { texte: "chant", role: "radical", note: "radical du « nous » du présent" },
    { texte: "ait", role: "temps", note: "imparfait" },
  ],
  legende: "« il chantait » : radical du présent, terminaison d'imparfait.",
});

const conditionnelChanter = wagons({
  infinitif: "chanter",
  pronom: "il",
  segments: [
    { texte: "chanter", role: "radical", note: "radical du futur", alerte: true },
    { texte: "ait", role: "temps", note: "terminaison d'imparfait" },
  ],
  legende: "« il chanterait » : le « r » du futur, et c'est un autre MODE.",
});

// ── Les modes : personnels (la forme bouge avec la personne) et non personnels.
const modePersonnel = tableau({
  temps: "présent de l'indicatif",
  lignes: [
    { pronom: "je", radical: "part", terminaison: "s" },
    { pronom: "tu", radical: "part", terminaison: "s" },
    { pronom: "il", radical: "part", terminaison: "" },
    { pronom: "nous", radical: "part", terminaison: "ons", alerte: true },
    { pronom: "vous", radical: "part", terminaison: "ez" },
    { pronom: "ils", radical: "part", terminaison: "ent" },
  ],
  legende: "Mode personnel : la forme change à chaque personne.",
});

const modeNonPersonnel = wagons({
  infinitif: "partir",
  segments: [
    { texte: "part", role: "radical" },
    { texte: "ir", role: "temps", note: "infinitif : aucune personne" },
  ],
  legende: "Mode non personnel : rien ne change, il n'y a pas de personne.",
});

const modeParticipe = wagons({
  infinitif: "partir",
  segments: [
    { texte: "part", role: "radical" },
    { texte: "i", role: "temps", note: "participe passé" },
  ],
  legende: "Le participe est non personnel lui aussi : « parti », sans pronom.",
});

// ── Le subjonctif : sa base est celle du « ils » du présent.
const subjonctifVenir = wagons({
  infinitif: "venir",
  pronom: "qu'il",
  segments: [
    { texte: "vienn", role: "radical", note: "base du « ils » du présent", alerte: true },
    { texte: "e", role: "temps", note: "subjonctif présent" },
  ],
  legende: "« qu'il vienne » : la base vient de « ils viennent ».",
});

const subjonctifFaire = wagons({
  infinitif: "faire",
  pronom: "que nous",
  segments: [
    { texte: "fass", role: "radical", note: "base propre au subjonctif", alerte: true },
    { texte: "ions", role: "personne", note: "1re pers. plur." },
  ],
  legende: "« que nous fassions » : « faire » a une base à lui.",
});

// ── Le conditionnel, MODE dans ce programme : présent et passé.
const conditionnelPresent = wagons({
  infinitif: "pouvoir",
  pronom: "ils",
  segments: [
    { texte: "pourr", role: "radical", note: "radical du futur", alerte: true },
    { texte: "aient", role: "temps", note: "terminaison d'imparfait" },
  ],
  legende: "« ils pourraient » : radical du futur + terminaison d'imparfait.",
});

const conditionnelPasse = composee({
  pronom: "j'",
  auxiliaire: { texte: "aurais", note: "avoir au conditionnel présent" },
  participe: { texte: "dû", note: "participe passé" },
  legende: "« j'aurais dû » : le conditionnel passé est un temps composé.",
});

// ── Les temps composés : deux caisses, et l'auxiliaire porte le temps.
const passeCompose = composee({
  pronom: "elle",
  auxiliaire: { texte: "a", note: "avoir au présent" },
  participe: { texte: "écrit", note: "participe passé" },
  legende: "Auxiliaire au présent : le temps composé est un passé composé.",
});

const plusQueParfait = composee({
  pronom: "elle",
  auxiliaire: { texte: "avait", note: "avoir à l'imparfait" },
  participe: { texte: "écrit", note: "participe passé" },
  legende: "Le MÊME participe : c'est l'auxiliaire qui a changé le temps.",
});

const plusQueParfaitEtre = composee({
  pronom: "elles",
  auxiliaire: { texte: "étaient", note: "être à l'imparfait" },
  participe: { texte: "parties", note: "accordé avec le sujet" },
  legende: "Avec être, le participe s'accorde — voir la fiche du participe passé.",
});

// ── Le passé simple : trois séries, et c'est tout.
const passeSimpleIs = wagons({
  infinitif: "écrire",
  pronom: "elle",
  segments: [
    { texte: "écriv", role: "radical", note: "base du passé simple", alerte: true },
    { texte: "it", role: "temps", note: "série en -is" },
  ],
  legende: "« elle écrivit » : série en -is, -is, -it, -irent.",
});

const passeSimpleUs = wagons({
  infinitif: "savoir",
  pronom: "je",
  segments: [
    { texte: "s", role: "radical", note: "base réduite", alerte: true },
    { texte: "us", role: "temps", note: "série en -us" },
  ],
  legende: "« je sus » : série en -us, -us, -ut, -urent.",
});

const passeSimpleIn = wagons({
  infinitif: "venir",
  pronom: "il",
  segments: [
    { texte: "v", role: "radical", note: "base réduite", alerte: true },
    { texte: "int", role: "temps", note: "série en -in" },
  ],
  legende: "« il vint » : « venir » et « tenir » ont leur série à eux.",
});

// ── Les onze irréguliers : le tableau qui montre où le radical bouge.
const irregulierAller = tableau({
  temps: "présent de l'indicatif",
  lignes: [
    { pronom: "je", radical: "v", terminaison: "ais", alerte: true },
    { pronom: "tu", radical: "v", terminaison: "as", alerte: true },
    { pronom: "il", radical: "v", terminaison: "a", alerte: true },
    { pronom: "nous", radical: "all", terminaison: "ons", alerte: true },
    { pronom: "vous", radical: "all", terminaison: "ez", alerte: true },
    { pronom: "ils", radical: "v", terminaison: "ont", alerte: true },
  ],
  legende: "« Aller » change de radical trois fois : v-, all-, et ir- au futur.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheConjugaisonFormes4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "conjugaison-formes",
  titre: "Lire et former un verbe conjugué en 4e (2026-2027)",
  accroche:
    "« Il chantait » et « il chanterait » ne diffèrent que d'une lettre. Et pourtant, ce n'est ni le même temps, ni même le même MODE : le premier raconte ce qui a duré, le second suppose ce qui n'a pas eu lieu. Toute la conjugaison tient dans ce « r » — celui du futur, qu'on entend à peine.",
  identite: [
    { label: "Mots clés", valeur: "Radical, terminaison, mode, temps simple, temps composé" },
    { label: "Le secret", valeur: "Chercher la base avant la terminaison" },
    { label: "Outil", valeur: "Le « r » du futur, et le « ils » du présent" },
  ],
  definition: {
    texte:
      "Un verbe conjugué se démonte en deux ou trois morceaux : un RADICAL, qui porte le sens, une marque de TEMPS, et une marque de PERSONNE. Le radical n'est pas toujours celui de l'infinitif — chaque temps va chercher sa base ailleurs : l'imparfait prend celle du « nous » du présent, le subjonctif celle du « ils », le futur et le conditionnel gardent l'infinitif entier avec son « r ». Les modes se partagent en deux familles : les modes PERSONNELS — indicatif, subjonctif, impératif, conditionnel — changent de forme avec la personne ; les modes NON PERSONNELS — infinitif, participe — n'en portent aucune. Enfin, un temps composé n'est pas une forme de plus à apprendre : c'est un auxiliaire conjugué, qui porte le temps, suivi d'un participe passé, qui porte le sens.",
  },
  figure: {
    schema: pile(imparfaitChanter, conditionnelChanter),
    legende:
      "La même terminaison, deux radicaux. Le radical est bleu, la marque de temps orange — les mêmes couleurs dans toutes les fiches. En haut, « chant- » vient du « nous » du présent : c'est l'imparfait. En bas, « chanter- » garde le « r » de l'infinitif : c'est le conditionnel. Un seul wagon change, et le mode change avec lui.",
  },
  proprietes: [
    {
      titre: "Une forme se démonte en wagons",
      texte:
        "Radical, marque de temps, marque de personne. Trouve d'abord le radical : c'est lui qui décide, la terminaison suit une série connue.",
      schema: pile(imparfaitChanter, subjonctifVenir),
      micros: ["4e_conj_identifier"],
    },
    {
      titre: "Modes personnels et non personnels",
      texte:
        "Essaie de changer la personne. Si la forme bouge, le mode est personnel. Si elle ne bouge pas, c'est un infinitif ou un participe.",
      schema: pile(modePersonnel, modeNonPersonnel, modeParticipe),
      micros: ["4e_conj_modes_personnels"],
    },
    {
      titre: "Ici, le conditionnel est un MODE",
      texte:
        "Le programme de 4e le range parmi les modes, à côté de l'indicatif, du subjonctif et de l'impératif. Il a un présent et un passé.",
      schema: pile(conditionnelPresent, conditionnelPasse),
      micros: ["4e_conj_modes_personnels"],
    },
    {
      titre: "Chaque temps va chercher sa base ailleurs",
      texte:
        "L'imparfait prend le radical du « nous » du présent, le subjonctif celui du « ils ». Ce n'est pas à retenir par cœur : ça se retrouve.",
      schema: pile(subjonctifVenir, subjonctifFaire),
      micros: ["4e_conj_composer"],
    },
    {
      titre: "Le « r » sépare l'imparfait du conditionnel",
      texte:
        "« Je chantais » n'a pas de « r », « je chanterais » en a un. C'est le seul indice, et il est fiable pour tous les verbes.",
      schema: pile(imparfaitChanter, conditionnelChanter),
      micros: ["4e_conj_identifier"],
    },
    {
      titre: "Un temps composé : l'auxiliaire porte le temps",
      texte:
        "Le participe ne change pas ; c'est l'auxiliaire qui fait le passé composé, le plus-que-parfait ou le conditionnel passé.",
      schema: pile(passeCompose, plusQueParfait, plusQueParfaitEtre),
      micros: ["4e_conj_composer"],
    },
    {
      titre: "Les onze irréguliers que le programme nomme",
      texte:
        "Faire, aller, dire, venir, pouvoir, voir, vouloir, prendre, savoir, falloir, valoir. Ce sont les plus fréquents de la langue : ils s'apprennent une fois, et ils servent toute la vie.",
      schema: irregulierAller,
      micros: ["4e_conj_irreguliers"],
    },
  ],
  reel: {
    texte:
      "Le « r » du conditionnel s'entend à peine, et il change tout dans un message. « Je passais te voir » raconte une habitude ancienne ; « je passerais te voir » propose quelque chose qui dépend de ta réponse. Une seule lettre, et l'un est un souvenir quand l'autre est une offre. C'est aussi ce qui distingue une information d'une rumeur dans la presse : « le suspect a pris la fuite » affirme, « le suspect aurait pris la fuite » rapporte sans garantir. Les journalistes appellent cela le conditionnel de l'information non confirmée, et savoir le repérer, c'est savoir lire un article.",
  },
  historique: {
    texte:
      "Le futur et le conditionnel français ne viennent pas du latin classique : ils ont été fabriqués au fil des siècles, en collant l'infinitif au verbe « avoir ». « Chanter ai » a donné « chanterai », « chanter avais » a donné « chanterais ». C'est pour cela que ces deux temps gardent l'infinitif entier — le fameux « r » —, alors que tous les autres rognent le radical. On peut encore voir la couture : les terminaisons du futur sont exactement les formes courtes d'avoir au présent (ai, as, a, ons, ez, ont), et celles du conditionnel sont celles de l'imparfait (ais, ais, ait, ions, iez, aient). Ce n'est pas une coïncidence : c'est un fossile, et il a mille ans.",
  },
  formule: {
    contexte: "Le test qui distingue l'imparfait du conditionnel, pour tous les verbes.",
    expression: "y a-t-il un « r » avant la terminaison ?",
    legende:
      "Sans « r » : imparfait de l'indicatif — « je partais », « nous voyions ». Avec « r » : conditionnel présent — « je partirais », « nous verrions ». Le test marche même sur les verbes irréguliers, parce que le « r » est un morceau d'infinitif, pas une terminaison.",
    schema: pile(imparfaitChanter, conditionnelChanter),
  },
  methode: [
    {
      titre: "Séparer le radical de la terminaison",
      texte:
        "Coupe la forme en deux et regarde la partie de droite : elle appartient à une série connue. La partie de gauche te dira quel temps.",
      schema: imparfaitChanter,
      micros: ["4e_conj_identifier"],
    },
    {
      titre: "Tester la personne pour trouver le mode",
      texte:
        "Change le pronom. La forme bouge : mode personnel. Elle ne bouge pas : infinitif ou participe, donc mode non personnel.",
      schema: pile(modePersonnel, modeNonPersonnel),
      micros: ["4e_conj_modes_personnels"],
    },
    {
      titre: "Chercher le « r » avant de trancher",
      texte:
        "Entre imparfait et conditionnel, ne te fie pas à l'oreille : regarde s'il y a un « r » juste avant la terminaison.",
      schema: conditionnelChanter,
      micros: ["4e_conj_identifier"],
    },
    {
      titre: "Pour former : retrouver la base d'abord",
      texte:
        "Imparfait ? Prends le « nous » du présent et enlève « -ons ». Subjonctif ? Prends le « ils » et enlève « -ent ». Futur ou conditionnel ? Garde l'infinitif entier.",
      schema: pile(subjonctifVenir, conditionnelPresent),
      micros: ["4e_conj_composer"],
    },
    {
      titre: "Pour un temps composé : choisir l'auxiliaire, puis son temps",
      texte:
        "Être ou avoir ? Puis mets l'auxiliaire au temps voulu : présent pour le passé composé, imparfait pour le plus-que-parfait, conditionnel pour le conditionnel passé.",
      schema: pile(passeCompose, plusQueParfait),
      micros: ["4e_conj_composer"],
    },
  ],
  usages: [
    {
      titre: "Pour réviser : onze verbes, et presque tout est couvert",
      detail:
        "Faire, aller, dire, venir, pouvoir, voir, vouloir, prendre, savoir, falloir, valoir sont les plus fréquents de la langue. Les apprendre une fois vaut mieux que dix listes.",
      schema: irregulierAller,
      micros: ["4e_conj_irreguliers"],
    },
    {
      titre: "Pour écrire un récit : le passé simple a trois séries",
      detail:
        "En -is, en -us, en -in. Une fois la série repérée, toutes les personnes suivent — c'est beaucoup moins lourd qu'il n'y parait.",
      schema: pile(passeSimpleIs, passeSimpleUs, passeSimpleIn),
      micros: ["4e_conj_composer"],
    },
    {
      titre: "Pour se relire : un temps composé se vérifie en deux fois",
      detail:
        "D'abord l'auxiliaire — est-il au bon temps ? Ensuite le participe — s'accorde-t-il ? Les deux questions sont séparées.",
      schema: plusQueParfaitEtre,
      micros: ["4e_conj_composer"],
    },
  ],
  exemples: [
    {
      titre: "Imparfait ou conditionnel ?",
      donnees: "« il chantait » et « il chanterait »",
      schema: pile(imparfaitChanter, conditionnelChanter),
      question: "Comment les distinguer à coup sûr ?",
      solution:
        "On cherche le « r » avant la terminaison. « chant-ait » n'en a pas : imparfait de l'indicatif. « chanter-ait » en a un, celui de l'infinitif : conditionnel présent — et dans le programme de 4e, le conditionnel est un MODE, pas un temps de l'indicatif.",
      micros: ["4e_conj_identifier"],
    },
    {
      titre: "Personnel ou non personnel ?",
      donnees: "« partir » et « il part »",
      schema: pile(modeNonPersonnel, modePersonnel),
      question: "Quel mode est personnel, et comment le prouver ?",
      solution:
        "On change le pronom. « Il part », « nous partons », « ils partent » : la forme bouge, le mode est personnel. « Partir » ne bouge pas, quel que soit le sujet : c'est l'infinitif, un mode non personnel. Le participe se teste de la même façon.",
      micros: ["4e_conj_modes_personnels"],
    },
    {
      titre: "Le conditionnel passé",
      donnees: "« J'___ te prévenir plus tôt. » (devoir, conditionnel passé)",
      schema: conditionnelPasse,
      question: "Comment se forme cette forme verbale ?",
      solution:
        "Le conditionnel passé est un temps composé : l'auxiliaire au conditionnel PRÉSENT, suivi du participe passé. « Avoir » au conditionnel présent donne « aurais », et le participe de « devoir » est « dû ». On écrit « j'aurais dû ».",
      micros: ["4e_conj_modes_personnels", "4e_conj_composer"],
    },
    {
      titre: "Reconnaitre une forme composée",
      donnees: "« elle a écrit » et « elle avait écrit »",
      schema: pile(passeCompose, plusQueParfait),
      question: "Qu'est-ce qui change le temps entre les deux ?",
      solution:
        "Le participe est identique : « écrit ». Seul l'auxiliaire a bougé — « a » au présent donne un passé composé, « avait » à l'imparfait donne un plus-que-parfait. Dans un temps composé, c'est toujours l'auxiliaire qui porte le temps.",
      micros: ["4e_conj_composer"],
    },
    {
      titre: "Former un subjonctif",
      donnees: "« Il faut que nous ___ vite. » (faire)",
      schema: subjonctifFaire,
      question: "Quelle est la forme correcte ?",
      solution:
        "Le subjonctif se construit d'ordinaire sur la base du « ils » du présent. Mais « faire » a une base à lui, « fass- », et il faut la connaitre. Avec la terminaison de première personne du pluriel : « que nous fassions ». ⛔ « que nous faisions » est l'imparfait de l'indicatif, pas le subjonctif.",
      micros: ["4e_conj_composer"],
    },
    {
      titre: "Le passé simple d'un irrégulier",
      donnees: "« il ___ sans répondre. » (venir, passé simple)",
      schema: passeSimpleIn,
      question: "Quelle est la forme correcte ?",
      solution:
        "« Venir » et « tenir » ont une série de passé simple à eux, en -in : je vins, tu vins, il vint, nous vînmes, ils vinrent. On écrit « il vint ». ⛔ « il vena » n'existe pas, et « il venait » est un imparfait.",
      micros: ["4e_conj_irreguliers"],
    },
    {
      titre: "Un radical qui change trois fois",
      donnees: "Le verbe « aller » au présent",
      schema: irregulierAller,
      question: "Pourquoi ce verbe est-il si irrégulier ?",
      solution:
        "« Aller » a fusionné trois verbes latins différents au cours de son histoire. Il en garde trois radicaux : « v- » pour je vais, tu vas, il va, ils vont ; « all- » pour nous allons, vous allez ; et « ir- » pour le futur, j'irai. C'est le verbe le plus irrégulier de la langue, et il est aussi l'un des plus fréquents.",
      micros: ["4e_conj_irreguliers"],
    },
  ],
  pieges: [
    "Confondre imparfait et conditionnel : « je partais » n'a pas de « r », « je partirais » en a un. L'oreille ne suffit pas.",
    "Croire que le radical est toujours celui de l'infinitif : l'imparfait prend celui du « nous » du présent, le subjonctif celui du « ils ».",
    "Écrire « que nous faisions » pour un subjonctif : c'est l'imparfait de l'indicatif. Le subjonctif est « que nous fassions ».",
    "Oublier la cédille et le « e » de liaison : « nous commencions » sans cédille devant le i, « nous mangeons » avec un e devant le o.",
    "Chercher un temps composé dans la terminaison : c'est l'auxiliaire qui porte le temps, jamais le participe.",
    "Traiter le conditionnel comme un temps de l'indicatif : dans le programme de 4e, c'est un MODE. La 5e, elle, suit un autre texte.",
  ],
  aRetenir: [
    "Une forme conjuguée = un radical + une marque de temps + une marque de personne.",
    "Modes personnels : indicatif, subjonctif, impératif, conditionnel. Non personnels : infinitif, participe.",
    "Le « r » avant la terminaison sépare le conditionnel de l'imparfait, pour tous les verbes.",
    "Imparfait → base du « nous » du présent. Subjonctif → base du « ils ». Futur et conditionnel → l'infinitif entier.",
    "Dans un temps composé, l'auxiliaire porte le temps et le participe porte le sens.",
    "Onze irréguliers nommés par le programme : faire, aller, dire, venir, pouvoir, voir, vouloir, prendre, savoir, falloir, valoir.",
  ],
  entrainement: [
    {
      question: "« nous voyions » : quel temps, quel mode ?",
      correction: "Imparfait de l'indicatif — pas de « r », et la base « voy- » vient de « nous voyons ».",
      micros: ["4e_conj_identifier"],
    },
    {
      question: "« tu voudrais » : quel temps, quel mode ?",
      correction: "Conditionnel présent — la base « voudr- » porte le « r » du futur.",
      micros: ["4e_conj_identifier"],
    },
    {
      question: "« Il faut qu'il ___ raison. » (avoir)",
      correction: "ait — le subjonctif présent d'« avoir » est irrégulier : que j'aie, qu'il ait.",
      micros: ["4e_conj_composer"],
    },
    {
      question: "« Vous ___ trop vite. » (commencer, imparfait, 2e pers. plur.)",
      correction: "commenciez — la cédille ne se met que devant a et o ; devant i, on écrit c.",
      micros: ["4e_conj_composer"],
    },
    {
      question: "« elle était partie » : combien de morceaux, et lequel porte le temps ?",
      correction: "Deux : l'auxiliaire « était », qui porte le temps (imparfait → plus-que-parfait), et le participe « partie », qui porte le sens.",
      micros: ["4e_conj_composer"],
    },
    {
      question: "« Je ___ la réponse. » (savoir, passé simple, 1re pers. sing.)",
      correction: "sus — « savoir » suit la série en -us : je sus, il sut, ils surent.",
      micros: ["4e_conj_irreguliers"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesConjugaisonFormes4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le verbe conjugué - 4e",
    section: {
      type: "objectif",
      phrase: "Savoir démonter un verbe avant de le conjuguer",
      sousPhrase:
        "Un radical, une marque de temps, une marque de personne — et une base qui change selon le temps qu'on demande.",
      encadre: {
        titre: "L'idée",
        texte: "« Il chantait » et « il chanterait » : une lettre d'écart, et ce n'est même pas le même mode.",
      },
    },
  },
  {
    titre: "Le « r » qui change tout",
    badge: "Le verbe conjugué - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "« il chantait »",
        contenu: "Base « chant- », celle du « nous » du présent. Imparfait de l'indicatif.",
      },
      droite: {
        titre: "« il chanterait »",
        contenu: "Base « chanter- », l'infinitif entier. Conditionnel — et c'est un MODE.",
      },
    },
    schema: pile(imparfaitChanter, conditionnelChanter),
  },
  {
    titre: "Où chaque temps prend sa base",
    badge: "Le verbe conjugué - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Imparfait", texte: "Le « nous » du présent, sans « -ons ». Nous voyons → je voyais." },
        { titre: "Subjonctif", texte: "Le « ils » du présent, sans « -ent ». Ils viennent → qu'il vienne." },
        { titre: "Futur et conditionnel", texte: "L'infinitif entier, avec son « r ». Partir → je partirai, je partirais." },
      ],
    },
    schema: pile(subjonctifVenir, conditionnelPresent),
  },
  {
    titre: "Un temps composé : deux caisses",
    badge: "Le verbe conjugué - 4e",
    section: {
      type: "etapes",
      etapes: [
        "Je choisis l'auxiliaire : être ou avoir ?",
        "Je le mets au temps voulu — c'est LUI qui porte le temps.",
        "Présent → passé composé. Imparfait → plus-que-parfait. Conditionnel → conditionnel passé.",
        "J'ajoute le participe passé, qui ne change pas de temps.",
      ],
    },
    schema: pile(passeCompose, plusQueParfait),
  },
  {
    titre: "Les onze du programme",
    badge: "Le verbe conjugué - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Les onze", texte: "Faire, aller, dire, venir, pouvoir, voir, vouloir, prendre, savoir, falloir, valoir." },
        { titre: "Pourquoi eux", texte: "Ce sont les plus fréquents de la langue : les apprendre une fois sert toute la vie." },
        { titre: "Le pire", texte: "« Aller » a trois radicaux — v-, all-, ir- — parce qu'il a fusionné trois verbes latins." },
      ],
    },
    schema: irregulierAller,
  },
  {
    titre: "À vous",
    badge: "Le verbe conjugué - 4e",
    section: {
      type: "exercice",
      enonce: "« Il faut que nous ___ vite. » (faire)",
      question: "Quelle est la forme correcte, et pourquoi ?",
      indice: "Le subjonctif prend d'ordinaire la base du « ils » du présent — mais « faire » a la sienne.",
      correction:
        "« que nous fassions ». « Faire » a une base propre au subjonctif, « fass- ». ⛔ « que nous faisions » est l'imparfait de l'indicatif, pas le subjonctif.",
    },
    schema: subjonctifFaire,
  },
];
