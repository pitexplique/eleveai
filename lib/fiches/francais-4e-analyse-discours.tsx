// ─── Fiche de cours : registres, paroles rapportées et argumentation (4e) ─────
// LA NEUVIÈME FICHE DE FRANÇAIS DE LA 4e.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020. Trois objectifs y sont réunis :
// « Distinguer les registres de langue et ajuster ses choix au contexte »,
// « Analyser et employer des paroles rapportées », et les procédés du discours
// argumentatif — que le questionnement « Critiquer, dénoncer, penser : les
// Lumières en héritage » place au cœur de l'année de 4e.
//
// ⭐⭐ LA TERMINOLOGIE EXIGE LES TROIS FORMES DE PAROLES, ET LA TROISIÈME EST
// CELLE QU'ON SAUTE : « discours direct, indirect, INDIRECT LIBRE ». Le
// programme la nomme, et elle n'était nulle part avant le 13/08. Elle est ici
// avec sa méthode de reconnaissance — ni guillemets ni « que », et pourtant ce
// n'est plus le narrateur qui pense.
//
// ⭐ CE QUI SE DESSINE, ET COMMENT. Le canvas `phrase` porte les quatre formes
// en montrant leur MARQUE : les guillemets en relief pour le direct, le crochet
// de subordonnée pour l'indirect, et RIEN pour l'indirect libre — c'est
// l'absence qui devient l'indice, et un dessin sans marque à côté de trois
// dessins marqués le fait voir mieux qu'une phrase de cours.
//
// ⛔ LA FICHE NE REFAIT PAS LA PHRASE COMPLEXE. Le discours indirect passe par
// une subordonnée conjonctive, et l'analyse complète des subordonnées vit dans
// `francais-4e-phrase-complexe.tsx`. Ici, la subordonnée est un INDICE de forme
// rapportée, rien de plus.
//
// Alignée sur la table RAPPORTEES de
// lib/tutor-v4/questionBank/4e/francais/documents-composites.bank.ts et sur les
// tables REGISTRES, RAPPORTEES et ARGUMENTATIF de socle-lexique-discours.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `analyse_discours`) :
// - 4e_discours_registres       → propriétés 1 et 2, méthode 1, exemples 1 et 2
// - 4e_discours_rapportees      → figure, propriétés 3 et 5, formule, méthodes 2
//                                 et 3, exemples 3 et 4
// - 4e_discours_indirect_libre  → propriété 4, méthode 4, exemple 5
// - 4e_discours_argumentatif    → propriétés 6 et 7, méthode 5, exemples 6 et 7
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION, tous payés le 26/08 : aucun `titre` sur
// un dessin ; aucun markdown dans un texte de bloc (les tildes s'affichent) ;
// aucun champ `infinitif` sur un canvas `conjugaison` détourné ; et LE RENDU SE
// REGARDE — le script mesure la police et le cadre, il ne lit pas les mots.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
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

// ─── Les quatre formes, dessinées par leur MARQUE ─────────────────────────────
// ⚠️ Les trois premières ont un signe visible ; la quatrième n'en a aucun, et
// c'est précisément ce que le dessin doit faire remarquer.

const paroleDirecte = phrase({
  mots: [
    { texte: "Il" },
    { texte: "pensa" },
    { texte: ":" },
    { texte: "«", focus: true },
    { texte: "Je" },
    { texte: "n'y" },
    { texte: "arriverai" },
    { texte: "jamais" },
    { texte: ".", focus: true },
    { texte: "»", focus: true },
  ],
  groupes: [{ mots: [3, 9], label: "paroles citées" }],
  legende: "DIRECT : deux-points, guillemets. Les mots exacts, tels quels.",
});

const paroleIndirecte = phrase({
  mots: [
    { texte: "Il" },
    { texte: "pensa" },
    { texte: "qu'", focus: true },
    { texte: "il" },
    { texte: "n'y" },
    { texte: "arriverait" },
    { texte: "jamais" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 6], label: "subordonnée" }],
  legende: "INDIRECT : plus de guillemets, un « que », et tout se transpose.",
});

const paroleIndirecteLibre = phrase({
  mots: [
    { texte: "Il" },
    { texte: "s'arrêta" },
    { texte: "net" },
    { texte: "." },
    { texte: "Il" },
    { texte: "n'y" },
    { texte: "arriverait" },
    { texte: "jamais" },
    { texte: "." },
  ],
  legende: "INDIRECT LIBRE : aucune marque. Et pourtant, c'est lui qui pense.",
});

const paroleRecit = phrase({
  mots: [
    { texte: "Il" },
    { texte: "annonça", focus: true },
    { texte: "son" },
    { texte: "départ" },
    { texte: "à" },
    { texte: "la" },
    { texte: "classe" },
    { texte: "." },
  ],
  legende: "RÉCIT DE PAROLES : on dit qu'il a parlé, sans un seul de ses mots.",
});

// ── LES TROIS TRANSPOSITIONS, montrées une par une.
const transpositionPersonne = phrase({
  mots: [
    { texte: "«" },
    { texte: "Je", focus: true },
    { texte: "viendrai" },
    { texte: "»" },
    { texte: "→" },
    { texte: "il", focus: true },
    { texte: "viendrait" },
  ],
  liens: [{ de: 1, vers: 5, label: "personne", type: "question" }],
  legende: "1. La personne change de camp : « je » devient « il ».",
});

const transpositionTemps = phrase({
  mots: [
    { texte: "«" },
    { texte: "viendrai", focus: true },
    { texte: "»" },
    { texte: "→" },
    { texte: "viendrait", focus: true },
  ],
  liens: [{ de: 1, vers: 4, label: "recule", type: "question" }],
  legende: "2. Le temps recule : futur → conditionnel, présent → imparfait.",
});

const transpositionRepere = phrase({
  mots: [
    { texte: "«" },
    { texte: "demain", focus: true },
    { texte: "»" },
    { texte: "→" },
    { texte: "le" },
    { texte: "lendemain", focus: true },
  ],
  liens: [{ de: 1, vers: 5, label: "se déplace", type: "question" }],
  legende: "3. Les repères bougent : demain → le lendemain, hier → la veille.",
});

// ── L'INTERROGATIVE RAPPORTÉE perd son point d'interrogation.
const questionDirecte = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "demanda" },
    { texte: ":" },
    { texte: "«" },
    { texte: "Où" },
    { texte: "vas-tu", focus: true },
    { texte: "?", focus: true },
    { texte: "»" },
  ],
  legende: "Direct : inversion du sujet, et point d'interrogation.",
});

const questionIndirecte = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "demanda" },
    { texte: "où" },
    { texte: "il", focus: true },
    { texte: "allait", focus: true },
    { texte: "." },
  ],
  legende: "Indirect : plus d'inversion, plus de point d'interrogation.",
});

// ── LES REGISTRES : même demande, trois façons.
const registreSoutenu = phrase({
  mots: [
    { texte: "Auriez-vous", focus: true },
    { texte: "l'obligeance", focus: true },
    { texte: "de" },
    { texte: "patienter" },
    { texte: "?" },
  ],
  legende: "SOUTENU : lexique rare, tournure complète. Un écrit, un supérieur.",
});

const registreCourant = phrase({
  mots: [
    { texte: "Pouvez-vous" },
    { texte: "attendre", focus: true },
    { texte: "un" },
    { texte: "moment" },
    { texte: "?" },
  ],
  legende: "COURANT : la langue neutre, qui convient presque partout.",
});

const registreFamilier = phrase({
  mots: [
    { texte: "Attends", focus: true },
    { texte: "deux" },
    { texte: "secondes", focus: true },
    { texte: "," },
    { texte: "j'arrive" },
    { texte: "." },
  ],
  legende: "FAMILIER : tutoiement, exagération. Entre proches, à l'oral.",
});

// ── LES PROCÉDÉS DE L'ARGUMENTATION.
const procedeQuestionRhetorique = phrase({
  mots: [
    { texte: "Faut-il" },
    { texte: "attendre" },
    { texte: "le" },
    { texte: "pire" },
    { texte: "pour" },
    { texte: "agir" },
    { texte: "?", focus: true },
  ],
  legende: "Question rhétorique : elle affirme en ayant l'air de demander.",
});

const procedeConcession = phrase({
  mots: [
    { texte: "Certes", focus: true },
    { texte: "," },
    { texte: "le" },
    { texte: "cout" },
    { texte: "est" },
    { texte: "élevé" },
    { texte: ";" },
    { texte: "mais", focus: true },
    { texte: "l'inaction" },
    { texte: "couterait" },
    { texte: "plus" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 5], label: "concession" },
    { mots: [7, 10], label: "thèse" },
  ],
  legende: "Concession : on accorde un point pour mieux emporter le reste.",
});

const procedeMetaphore = phrase({
  mots: [
    { texte: "Ce" },
    { texte: "projet" },
    { texte: "est" },
    { texte: "un" },
    { texte: "navire", focus: true },
    { texte: "sans" },
    { texte: "gouvernail", focus: true },
    { texte: "." },
  ],
  legende: "Métaphore : elle fait VOIR l'idée, au lieu de l'expliquer.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheAnalyseDiscours4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "analyse-discours",
  titre: "Registres, paroles rapportées et argumentation en 4e (2026-2027)",
  accroche:
    "« Il s'arrêta net. Il n'y arriverait jamais. » Aucun guillemet, aucun « que », et pourtant ce n'est plus le narrateur qui parle : c'est le personnage qui pense, et on l'entend. Cette forme sans marque a un nom — le discours indirect libre —, elle est au programme de 4e, et c'est celle que presque personne n'apprend à repérer.",
  identite: [
    { label: "Mots clés", valeur: "Registre, discours direct, indirect, indirect libre, procédé" },
    { label: "Le secret", valeur: "Chercher la marque — ou son absence" },
    { label: "Outil", valeur: "Transposer : personne, temps, repères" },
  ],
  definition: {
    texte:
      "Un même contenu peut se dire de plusieurs façons, et le choix n'est jamais neutre. Le REGISTRE ajuste la langue à la situation : soutenu pour un écrit ou un supérieur, courant presque partout, familier entre proches et à l'oral — aucun n'est meilleur, chacun a sa place. Les PAROLES RAPPORTÉES, elles, choisissent la distance : le discours direct cite entre guillemets, l'indirect fait passer les paroles dans une subordonnée en transposant tout, l'indirect libre supprime les deux marques et laisse la voix du personnage traverser le récit, et le récit de paroles se contente de dire que quelqu'un a parlé. Enfin, un discours qui veut CONVAINCRE emploie des procédés qui reviennent d'un texte à l'autre : la question qui n'attend pas de réponse, la concession qui désarme, l'image qui fait voir.",
  },
  figure: {
    schema: pile(paroleDirecte, paroleIndirecte, paroleIndirecteLibre),
    legende:
      "Les mêmes paroles, trois fois. En haut la marque saute aux yeux : deux-points et guillemets. Au milieu elle est plus discrète : un « que » et un crochet de subordonnée. En bas, il n'y a RIEN — et c'est justement l'indice. Quand une phrase du récit sonne comme si le personnage la pensait, sans guillemets ni « que », c'est du discours indirect libre.",
  },
  proprietes: [
    {
      titre: "Trois registres, et aucun n'est meilleur",
      texte:
        "Le soutenu emploie un lexique rare et des tournures complètes, le courant est la langue neutre, le familier abrège et tutoie. Ce sont trois outils, pas trois niveaux de qualité.",
      schema: pile(registreSoutenu, registreCourant, registreFamilier),
      micros: ["4e_discours_registres"],
    },
    {
      titre: "Le registre se choisit sur le DESTINATAIRE",
      texte:
        "La question n'est pas « est-ce correct ? » mais « à qui puis-je dire cela sans surprendre personne ? ». Un inconnu qui vous reçoit, n'importe qui, ou seulement un proche.",
      schema: pile(registreSoutenu, registreFamilier),
      micros: ["4e_discours_registres"],
    },
    {
      titre: "Quatre façons de rapporter des paroles",
      texte:
        "Le direct cite, l'indirect transpose, l'indirect libre efface les marques, et le récit de paroles dit seulement qu'on a parlé — sans un seul mot prononcé.",
      schema: pile(paroleDirecte, paroleIndirecte, paroleRecit),
      micros: ["4e_discours_rapportees"],
    },
    {
      titre: "L'indirect libre : deux voix en même temps",
      texte:
        "Les paroles gardent leur mouvement propre — questions, exclamations, « donc » — mais prennent les temps et les personnes du récit. On entend le personnage à travers le narrateur.",
      schema: paroleIndirecteLibre,
      micros: ["4e_discours_indirect_libre"],
    },
    {
      titre: "Passer au discours indirect transpose TROIS choses",
      texte:
        "Les personnes changent de camp, les temps reculent quand le verbe introducteur est au passé, et les repères de temps se déplacent. Les trois, jamais deux.",
      schema: pile(transpositionPersonne, transpositionTemps, transpositionRepere),
      micros: ["4e_discours_rapportees"],
    },
    {
      titre: "Une question rapportée perd son point d'interrogation",
      texte:
        "« Où vas-tu ? » devient « où il allait ». Plus d'inversion du sujet, plus de point d'interrogation : ce n'est plus une question, c'est une question racontée.",
      schema: pile(questionDirecte, questionIndirecte),
      micros: ["4e_discours_rapportees"],
    },
    {
      titre: "Les procédés qui cherchent à convaincre",
      texte:
        "La question rhétorique affirme en ayant l'air de demander. La concession accorde un point pour emporter le reste. La métaphore fait voir l'idée au lieu de l'expliquer.",
      schema: pile(procedeQuestionRhetorique, procedeConcession, procedeMetaphore),
      micros: ["4e_discours_argumentatif"],
    },
  ],
  reel: {
    texte:
      "Le discours indirect libre est partout dans la presse, et il y sert à quelque chose de précis : glisser une opinion sans en prendre la responsabilité. « Le ministre a quitté la salle. Ces critiques étaient décidément insupportables. » La seconde phrase n'a pas de guillemets, aucun « il pensa que » : le journal ne dit pas qu'il l'a écrite, ni que le ministre l'a dite. Elle flotte. C'est très efficace, et c'est exactement pourquoi il faut savoir la repérer — comme il faut savoir repérer une question rhétorique, qui affirme sans avoir l'air d'affirmer. Le questionnement de 4e sur les Lumières demande de « développer son esprit critique » : cela commence par là.",
  },
  historique: {
    texte:
      "Le discours indirect libre existe depuis le Moyen Âge, mais c'est Flaubert qui en fait un instrument, vers 1856, dans Madame Bovary. Avant lui, un romancier signalait toujours qui parlait ; après lui, la frontière entre le narrateur et le personnage devient volontairement floue, et le lecteur ne sait plus si une phrase est un jugement de l'auteur ou une illusion du personnage. Le procès intenté au roman en 1857 s'appuie d'ailleurs là-dessus : le procureur reproche à Flaubert de ne pas condamner son héroïne, et une partie du malentendu vient de ces phrases sans propriétaire. Une forme grammaticale a donc bel et bien été jugée au tribunal — ce qui donne une idée de ce qu'elle permet.",
  },
  formule: {
    contexte: "Le test qui reconnait le discours indirect libre, et lui seul.",
    expression: "ni guillemets, ni « que » — et pourtant quelqu'un pense",
    legende:
      "Si la phrase n'a aucune marque de citation ET qu'elle sonne comme si le personnage la pensait — avec sa question, son exclamation, son « décidément » —, c'est du discours indirect libre. Le test de confirmation : essaie d'ajouter « il pensa que » devant. Si cela s'emboite sans effort, c'était bien lui.",
    schema: paroleIndirecteLibre,
  },
  methode: [
    {
      titre: "Pour le registre : penser au destinataire",
      texte:
        "À qui pourrais-tu dire cette phrase telle quelle ? Un inconnu qui te reçoit : soutenu. N'importe qui : courant. Seulement un proche : familier.",
      schema: pile(registreSoutenu, registreCourant),
      micros: ["4e_discours_registres"],
    },
    {
      titre: "Pour identifier une forme : chercher la marque",
      texte:
        "Des guillemets ? Direct. Un « que » ou un mot interrogatif après le verbe de parole ? Indirect. Rien du tout, mais quelqu'un pense ? Indirect libre. Rien du tout et personne ne pense ? Récit de paroles.",
      schema: pile(paroleDirecte, paroleIndirecte),
      micros: ["4e_discours_rapportees"],
    },
    {
      titre: "Pour transposer : trois passes, dans cet ordre",
      texte:
        "D'abord les personnes, ensuite les temps, enfin les repères. Les erreurs de copie viennent presque toujours d'en avoir oublié une — souvent la troisième.",
      schema: pile(transpositionPersonne, transpositionRepere),
      micros: ["4e_discours_rapportees"],
    },
    {
      titre: "Pour confirmer un indirect libre : ajouter « il pensa que »",
      texte:
        "Si la phrase accepte cet ajout sans qu'on ait à la modifier, c'était bien du discours indirect libre. Si elle résiste, c'est le narrateur qui parlait.",
      schema: paroleIndirecteLibre,
      micros: ["4e_discours_indirect_libre"],
    },
    {
      titre: "Pour un procédé : séparer ce que la phrase DIT de ce qu'elle FAIT",
      texte:
        "Une question qui n'attend pas de réponse fait une affirmation. Un « certes » annonce un « mais ». Une image remplace une démonstration.",
      schema: pile(procedeQuestionRhetorique, procedeConcession),
      micros: ["4e_discours_argumentatif"],
    },
  ],
  usages: [
    {
      titre: "Pour écrire un récit : varier la distance",
      detail:
        "Le direct rapproche, l'indirect résume, l'indirect libre fait entrer dans la tête. Trois distances, à choisir selon l'effet voulu.",
      schema: pile(paroleDirecte, paroleIndirecteLibre),
      micros: ["4e_discours_rapportees", "4e_discours_indirect_libre"],
    },
    {
      titre: "Pour lire la presse : repérer la phrase sans propriétaire",
      detail:
        "Une phrase de jugement sans guillemets ni attribution : ni le journal ni la personne citée n'en assume la responsabilité. C'est voulu.",
      schema: paroleIndirecteLibre,
      micros: ["4e_discours_indirect_libre"],
    },
    {
      titre: "Pour argumenter à l'écrit : la concession désarme",
      detail:
        "Accorder d'abord un point à l'adversaire rend la suite plus difficile à refuser. C'est le procédé le plus efficace, et le moins employé par les élèves.",
      schema: procedeConcession,
      micros: ["4e_discours_argumentatif"],
    },
  ],
  exemples: [
    {
      titre: "Quel registre ?",
      donnees: "« Auriez-vous l'obligeance de patienter un instant ? »",
      schema: registreSoutenu,
      question: "À quel registre cette phrase appartient-elle, et à qui la dirais-tu ?",
      solution:
        "SOUTENU : « obligeance » est un mot rare, l'inversion du sujet est complète. On la dit à un supérieur, ou on l'écrit. La même demande au courant donne « Pouvez-vous attendre un moment ? », et au familier « Attends deux secondes ».",
      micros: ["4e_discours_registres"],
    },
    {
      titre: "Ajuster au contexte",
      donnees: "« Salut, c'est pour mon colis qu'est jamais arrivé. »",
      schema: registreFamilier,
      question: "Cette phrase est-elle fautive ?",
      solution:
        "Non — elle est FAMILIÈRE, et parfaitement à sa place entre proches. Elle devient inadaptée dans un courrier à une entreprise, où l'on écrirait « Bonjour, je vous écris au sujet de ma commande ». Le problème n'est jamais la correction : c'est l'ajustement.",
      micros: ["4e_discours_registres"],
    },
    {
      titre: "Reconnaitre la forme",
      donnees: "« Il murmura que c'était fini pour cette année. »",
      schema: paroleIndirecte,
      question: "Quelle forme de paroles rapportées ?",
      solution:
        "Le discours INDIRECT : pas de guillemets, et un « que » qui ouvre une subordonnée. Le verbe introducteur « murmura » est au passé, donc le présent des paroles d'origine — « c'est fini » — est devenu imparfait : « c'était fini ».",
      micros: ["4e_discours_rapportees"],
    },
    {
      titre: "Transposer sans rien oublier",
      donnees: "Il déclara : « Nous partirons demain. »",
      schema: pile(transpositionPersonne, transpositionRepere),
      question: "Comment cette phrase se dit-elle au discours indirect ?",
      solution:
        "« Il déclara qu'ils partiraient le lendemain. » Trois transpositions : « nous » devient « ils » (personne), le futur « partirons » devient le conditionnel « partiraient » (temps, parce que l'introducteur est au passé), et « demain » devient « le lendemain » (repère). Oublier la troisième est l'erreur la plus fréquente.",
      micros: ["4e_discours_rapportees"],
    },
    {
      titre: "La forme sans marque",
      donnees: "« Elle scruta la cour vide. Où étaient-ils donc passés ? »",
      schema: paroleIndirecteLibre,
      question: "Qui pose cette question, et de quelle forme s'agit-il ?",
      solution:
        "C'est ELLE qui se le demande, pas le narrateur — et pourtant il n'y a ni guillemets ni « elle se demanda que ». C'est du discours INDIRECT LIBRE : la question garde son mouvement propre et son « donc », mais prend l'imparfait et la troisième personne du récit. Le test : « elle se demanda où ils étaient donc passés » s'emboite sans effort.",
      micros: ["4e_discours_indirect_libre"],
    },
    {
      titre: "Ce que fait la phrase",
      donnees: "« Faut-il vraiment attendre le pire pour agir ? »",
      schema: procedeQuestionRhetorique,
      question: "Quel procédé est employé, et que produit-il ?",
      solution:
        "Une QUESTION RHÉTORIQUE. Elle a la forme d'une question mais n'attend aucune réponse : elle affirme qu'il ne faut pas attendre. Son avantage sur l'affirmation directe est qu'elle donne au lecteur l'impression d'avoir conclu tout seul.",
      micros: ["4e_discours_argumentatif"],
    },
    {
      titre: "Le procédé qui désarme",
      donnees: "« Certes, le cout est élevé ; mais l'inaction couterait plus. »",
      schema: procedeConcession,
      question: "Pourquoi commencer par donner raison à l'adversaire ?",
      solution:
        "C'est une CONCESSION. En accordant d'abord un point — le cout est élevé, c'est vrai —, on retire à l'adversaire son meilleur argument avant qu'il le donne, et la suite devient plus difficile à refuser. « Certes » annonce toujours un « mais » : c'est à ce couple qu'on le reconnait.",
      micros: ["4e_discours_argumentatif"],
    },
  ],
  pieges: [
    "Croire qu'un registre familier est une faute : il est à sa place à l'oral, entre proches. Le défaut est l'inadaptation, pas le registre.",
    "Oublier la transposition des repères : « demain » devient « le lendemain », « hier » la veille, « ici » là.",
    "Garder le point d'interrogation dans une question rapportée : « elle demanda où il allait » se termine par un point.",
    "Garder l'inversion du sujet : on écrit « elle demanda où il allait », jamais « où allait-il ».",
    "Prendre un discours indirect libre pour la voix du narrateur : sans marque, c'est souvent le personnage qui pense.",
    "Confondre l'indirect libre et le récit de paroles : dans le second, aucun mot n'est rapporté, on dit seulement qu'on a parlé.",
  ],
  aRetenir: [
    "Trois registres — soutenu, courant, familier — et le choix se fait sur le DESTINATAIRE.",
    "Quatre formes de paroles : direct, indirect, indirect libre, récit de paroles.",
    "Passer à l'indirect transpose TROIS choses : les personnes, les temps, les repères.",
    "L'indirect libre n'a ni guillemets ni « que » — et pourtant c'est le personnage qui pense.",
    "Une question rhétorique affirme, une concession désarme, une métaphore fait voir.",
  ],
  entrainement: [
    {
      question: "« Veuillez agréer l'expression de mes salutations. » Quel registre ?",
      correction: "Soutenu : formule figée d'un écrit, à un destinataire qu'on ne tutoie pas.",
      micros: ["4e_discours_registres"],
    },
    {
      question: "Au discours indirect : « Il avoua : “J'étais là hier.” »",
      correction: "« Il avoua qu'il était là la veille. » L'imparfait ne bouge pas, mais « hier » devient « la veille ».",
      micros: ["4e_discours_rapportees"],
    },
    {
      question: "Au discours indirect : « Elle demanda : “Es-tu prêt ?” »",
      correction: "« Elle demanda s'il était prêt. » L'interrogation totale se rapporte par « si », sans inversion ni point d'interrogation.",
      micros: ["4e_discours_rapportees"],
    },
    {
      question: "« Il referma le cahier. C'était fini pour cette année. » Quelle forme ?",
      correction: "Discours indirect libre : aucune marque, et c'est pourtant lui qui pense.",
      micros: ["4e_discours_indirect_libre"],
    },
    {
      question: "« Ils discutèrent du voyage pendant une heure. » Quelle forme ?",
      correction: "Récit de paroles : on dit qu'ils ont parlé, sans rapporter un seul de leurs mots.",
      micros: ["4e_discours_rapportees"],
    },
    {
      question: "« L'école est le laboratoire où se fabrique la République. » Quel procédé ?",
      correction: "Une métaphore : elle fait voir l'idée par une image, au lieu de la démontrer.",
      micros: ["4e_discours_argumentatif"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesAnalyseDiscours4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Discours et registres - 4e",
    section: {
      type: "objectif",
      phrase: "Savoir qui parle, et à quelle distance",
      sousPhrase:
        "Le registre ajuste la langue au destinataire. Les paroles rapportées choisissent la distance. Les procédés cherchent à convaincre.",
      encadre: {
        titre: "L'idée",
        texte: "« Il s'arrêta net. Il n'y arriverait jamais. » Aucune marque — et pourtant, c'est lui qui pense.",
      },
    },
  },
  {
    titre: "Les mêmes paroles, trois fois",
    badge: "Discours et registres - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Direct", texte: "« Je n'y arriverai jamais. » Deux-points, guillemets, les mots exacts." },
        { titre: "Indirect", texte: "Il pensa QU'il n'y arriverait jamais. Un « que », et tout se transpose." },
        { titre: "Indirect libre", texte: "Il s'arrêta net. Il n'y arriverait jamais. Aucune marque." },
        { titre: "Récit de paroles", texte: "Il annonça son départ. On dit qu'il a parlé, sans ses mots." },
      ],
    },
    schema: pile(paroleDirecte, paroleIndirecte, paroleIndirecteLibre),
  },
  {
    titre: "Transposer : trois passes",
    badge: "Discours et registres - 4e",
    section: {
      type: "etapes",
      etapes: [
        "1. Les PERSONNES changent de camp : « je » → « il ».",
        "2. Les TEMPS reculent si l'introducteur est au passé : futur → conditionnel.",
        "3. Les REPÈRES se déplacent : demain → le lendemain, hier → la veille.",
        "Les erreurs viennent presque toujours d'avoir oublié la troisième.",
      ],
    },
    schema: pile(transpositionPersonne, transpositionRepere),
  },
  {
    titre: "Le test de l'indirect libre",
    badge: "Discours et registres - 4e",
    section: {
      type: "objectif",
      phrase: "Ni guillemets, ni « que » — et pourtant quelqu'un pense",
      sousPhrase:
        "Confirmation : essaie d'ajouter « il pensa que » devant. Si cela s'emboite sans effort, c'était bien lui.",
    },
    schema: paroleIndirecteLibre,
  },
  {
    titre: "Trois registres, aucun meilleur",
    badge: "Discours et registres - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Soutenu", texte: "« Auriez-vous l'obligeance de patienter ? » Un écrit, un supérieur." },
        { titre: "Courant", texte: "« Pouvez-vous attendre un moment ? » Presque partout." },
        { titre: "Familier", texte: "« Attends deux secondes. » Entre proches, à l'oral." },
        { titre: "Le test", texte: "À qui pourrais-tu le dire sans surprendre personne ?" },
      ],
    },
    schema: pile(registreSoutenu, registreCourant, registreFamilier),
  },
  {
    titre: "À vous",
    badge: "Discours et registres - 4e",
    section: {
      type: "exercice",
      enonce: "« Elle scruta la cour vide. Où étaient-ils donc passés ? »",
      question: "Qui pose cette question, et de quelle forme s'agit-il ?",
      indice: "Cherche les guillemets et le « que ». Puis demande-toi qui pense.",
      correction:
        "C'est ELLE qui se le demande. Aucune marque, et pourtant la question garde son « donc » : c'est du discours indirect libre. Le test le confirme — « elle se demanda où ils étaient donc passés » s'emboite sans effort.",
    },
    schema: paroleIndirecteLibre,
  },
];
