// ─── Fiche de cours : écouter, comprendre et interpréter (5e) ─────────────────
// LA NEUVIÈME FICHE DE LA 5e ÉCRITE LE 26/08/2026.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// Compétence « Écouter, comprendre et interpréter », deux objectifs : « Écouter,
// comprendre et interpréter un propos oral » et « Comprendre les visées d'une
// production orale spécifique ». ⛔ CE N'EST PAS LE PROGRAMME DE LA 4e.
//
// ⭐⭐ CE QUE CETTE FICHE APPORTE : `tableau_donnees` ENTRE EN FRANÇAIS. Le
// catalogue le réserve à « un tableau, colonnes ou cellules surlignables », et
// c'est exactement ce qu'est une grille de prise de notes. Or la micro dit
// littéralement cela — la 5e apprend à ÉCRIRE EN ÉCOUTANT, ce qui ne va pas de
// soi : « un élève qui note tout ne retient rien, un élève qui ne note rien n'a
// plus rien à dire quand vient son tour » (en-tête de la banque). Une grille de
// cinq lignes est la réponse, et elle se DESSINE — jusqu'ici toutes les fiches
// de français n'avaient que `phrase` et `conjugaison`.
//
// ⭐ ET LE CROCHET SERT UNE CINQUIÈME FOIS. Après la fonction, la respiration,
// le défaut et le corps, il marque ici CE QUE L'AUDITEUR DOIT FAIRE : « je
// sais », « j'adhère », « je ressens », « je fais ». Une visée ne se définit pas
// par ce que dit celui qui parle, mais par ce qui doit changer chez celui qui
// écoute — et le crochet, posé sous la phrase entendue, le montre d'un trait.
// ⛔ Ces étiquettes doivent rester GRISES : elles ne sont pas des fonctions.
//
// ⛔⛔ LE PARTAGE AVEC LES AUTRES CLASSES, écrit dans l'en-tête de la banque : la
// 4e RANGE ce qu'elle entend en thèse, argument, exemple ; la 3e juge ce qu'on
// fait de son objection. La 5e apprend d'abord le geste matériel — quoi noter,
// et quand.
//
// Alignée sur la table ECOUTER de
// lib/tutor-v4/questionBank/5e/francais/socle-ecriture-oral.bank.ts et sur les
// tables VISEES et PRODUCTIONS de ecriture-oral.bank.ts.
//
// Micro-compétences couvertes (les 2 de la notion `oral_ecouter`) :
// - 5e_oral_ecouter → figure, propriétés 1 à 4, formule, méthodes 1 et 2,
//                     usage 1, exemples 1 à 3
// - 5e_oral_visees  → propriétés 5 à 7, méthodes 3 et 4, usages 2 et 3,
//                     exemples 4 à 6
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin `phrase` ;
// une étiquette de groupe ne se plie pas ; un mot par entrée ; les blocs
// n'interprètent pas le markdown.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types_canvas";

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

/** La grille de prise de notes. ⚠️ Les cellules sont COURTES exprès : à la
 *  largeur d'un bloc de fiche (201 à 226 px), une cellule de vingt signes
 *  tombe sous le plancher de 11 px. Deux colonnes, cinq lignes, pas plus. */
function grille(opts: {
  headers: string[];
  rows: { values: string[] }[];
  highlight?: { row?: number };
  caption?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        headers: opts.headers,
        rows: opts.rows,
        highlight: opts.highlight,
        caption: opts.caption,
        display: { compact: true, striped: true },
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

// ─── Ce qui se dessine quand on écoute ────────────────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : la grille des cinq choses à noter.
const grilleNotes = grille({
  headers: ["Je note", "Pour"],
  rows: [
    { values: ["le sujet", "suivre"] },
    { values: ["son avis", "répondre"] },
    { values: ["ses exemples", "vérifier"] },
    { values: ["mes trous", "demander"] },
    { values: ["mon désaccord", "objecter"] },
  ],
  caption: "Cinq lignes, et rien d'autre.",
});

const grilleSujet = grille({
  headers: ["Je note", "Pour"],
  rows: [
    { values: ["le sujet", "suivre"] },
    { values: ["son avis", "répondre"] },
    { values: ["ses exemples", "vérifier"] },
    { values: ["mes trous", "demander"] },
    { values: ["mon désaccord", "objecter"] },
  ],
  highlight: { row: 0 },
  caption: "La première ligne se remplit dans les dix premières secondes.",
});

const grilleTrous = grille({
  headers: ["Je note", "Pour"],
  rows: [
    { values: ["le sujet", "suivre"] },
    { values: ["son avis", "répondre"] },
    { values: ["ses exemples", "vérifier"] },
    { values: ["mes trous", "demander"] },
    { values: ["mon désaccord", "objecter"] },
  ],
  highlight: { row: 3 },
  caption: "Ce qu'on n'a pas compris se note aussi : c'est une question à poser.",
});

// ── LE SUJET, EN UNE PHRASE, TOUT DE SUITE.
const sujetUnePhrase = phrase({
  mots: [
    { texte: "Je" },
    { texte: "vais" },
    { texte: "parler" },
    { texte: "de" },
    { texte: "trois", focus: true },
    { texte: "choses" },
    { texte: "." },
  ],
  // ⛔ « le sujet » ÉTAIT LA PREMIÈRE ÉTIQUETTE, ET ELLE SORTAIT EN BLEU.
  // `couleurFonction` teste `includes("sujet")` : l'élève lisait la couleur de
  // la FONCTION GRAMMATICALE sur un crochet qui désigne le thème d'un exposé.
  // Trouvé au rendu, invisible dans le code et au typecheck. « le thème » ne
  // tombe dans aucun test, donc gris — et le mot est plus juste ici.
  groupes: [{ mots: [0, 6], label: "le thème" }],
  legende: "Dès la première phrase : de quoi il parle, et en combien de parties.",
});

const desaccordGarde = phrase({
  mots: [
    { texte: "La" },
    { texte: "fin" },
    { texte: "est" },
    { texte: "ratée", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 4], label: "à discuter" }],
  legende: "On ne coupe pas : on note, et l'on garde pour son tour de parole.",
});

// ── LES QUATRE VISÉES. ⭐ Le crochet dit ce que l'AUDITEUR doit faire.
const viseeInformer = phrase({
  mots: [
    { texte: "Il" },
    { texte: "pleuvra" },
    { texte: "demain" },
    { texte: "matin" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 4], label: "je sais" }],
  legende: "INFORMER : à la fin, l'auditeur sait quelque chose qu'il ignorait.",
});

const viseeConvaincre = phrase({
  mots: [
    { texte: "Votez" },
    { texte: "pour" },
    { texte: "moi", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 3], label: "j'adhère" }],
  legende: "CONVAINCRE : à la fin, l'auditeur pense autrement qu'avant.",
});

const viseeEmouvoir = phrase({
  mots: [
    { texte: "Il" },
    { texte: "est" },
    { texte: "parti" },
    { texte: "sans" },
    { texte: "rien" },
    { texte: "dire" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 6], label: "je ressens" }],
  legende: "ÉMOUVOIR : à la fin, l'auditeur a éprouvé quelque chose.",
});

const viseeAgir = phrase({
  mots: [
    { texte: "Rangez-vous" },
    { texte: "deux" },
    { texte: "par" },
    { texte: "deux" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 4], label: "je fais" }],
  legende: "FAIRE AGIR : à la fin, l'auditeur accomplit un geste précis.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOralEcouter5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "oral-ecouter",
  titre: `Écouter, comprendre et interpréter en 5e (${ANNEE_SCOLAIRE})`,
  accroche:
    "Celui qui note tout ne retient rien : il recopie sans écouter. Celui qui ne note rien n'a plus rien à dire quand vient son tour. Écouter n'est pas rester silencieux pendant que quelqu'un parle — c'est un travail, et il tient dans une grille de cinq lignes qu'on peut apprendre en une fois.",
  identite: [
    { label: "Mots clés", valeur: "Sujet, avis, exemples, désaccord, visée" },
    { label: "Le secret", valeur: "Cinq choses à noter, et rien d'autre" },
    { label: "Outil", valeur: "Que doit faire celui qui écoute ?" },
  ],
  definition: {
    texte:
      "Écouter un propos oral, c'est en retenir la CHARPENTE, pas les mots. Cinq choses seulement se notent, et elles suffisent : de quoi il parle — le sujet, en une phrase, dès les premières secondes ; ce qu'il en pense — son avis, s'il en a vraiment donné un ; sur quoi il s'appuie — les exemples qu'il cite ; ce qu'on n'a pas compris — à lui demander tout à l'heure ; et son désaccord éventuel — à dire quand ce sera son tour. Écouter, c'est aussi reconnaitre la VISÉE de ce qu'on entend : celui qui parle veut-il vous informer, vous convaincre, vous émouvoir, ou vous faire accomplir un geste ? La visée ne se lit pas dans ce qu'il dit, mais dans ce qui doit avoir changé chez vous quand il se tait.",
  },
  figure: {
    schema: grilleNotes,
    legende:
      "La grille tient en cinq lignes, et elles ne changent jamais — quel que soit le sujet, quel que soit celui qui parle. À gauche ce qu'on écrit, à droite pourquoi on l'écrit : chaque ligne sert à quelque chose ensuite. C'est ce qui distingue prendre des notes de recopier — et un élève qui recopie n'écoute déjà plus.",
  },
  proprietes: [
    {
      titre: "Le sujet se note dans les dix premières secondes",
      texte:
        "Une phrase : de quoi il parle, et en combien de parties. Sans cela, on écoute deux minutes sans savoir où l'on va, et l'on décroche.",
      schema: pile(grilleSujet, sujetUnePhrase),
      micros: ["5e_oral_ecouter"],
    },
    {
      titre: "On sépare son avis de ses exemples",
      texte:
        "« Ce livre n'est pas fait pour nous » est un avis. « Au chapitre trois, il ment » est un appui. Les deux se notent, mais pas au même endroit.",
      schema: grilleNotes,
      micros: ["5e_oral_ecouter"],
    },
    {
      titre: "Ce qu'on n'a pas compris se note aussi",
      texte:
        "Un mot inconnu, une phrase trop rapide : c'est une question à poser, pas un échec. Notée, elle devient utile ; oubliée, elle disparait.",
      schema: grilleTrous,
      micros: ["5e_oral_ecouter"],
    },
    {
      titre: "On garde son désaccord pour son tour",
      texte:
        "Couper coupe aussi l'écoute : on n'entend plus la suite parce qu'on prépare sa phrase. On note, et l'on attend.",
      schema: desaccordGarde,
      micros: ["5e_oral_ecouter"],
    },
    {
      titre: "Informer, ou convaincre",
      texte:
        "Informer laisse l'auditeur libre : il sait davantage. Convaincre veut qu'il change d'avis — et cela se prépare autrement.",
      schema: pile(viseeInformer, viseeConvaincre),
      micros: ["5e_oral_visees"],
    },
    {
      titre: "Émouvoir, ou faire agir",
      texte:
        "Émouvoir veut qu'on ressente. Faire agir veut un geste précis, et tout de suite : se ranger, s'inscrire, rapporter un manuel.",
      schema: pile(viseeEmouvoir, viseeAgir),
      micros: ["5e_oral_visees"],
    },
    {
      titre: "La visée se lit chez celui qui écoute",
      texte:
        "Pas dans les mots de celui qui parle. Demande-toi ce qui doit avoir changé chez toi quand il se tait : tu sais ? tu penses autrement ? tu ressens ? tu fais ?",
      schema: pile(viseeConvaincre, viseeAgir),
      micros: ["5e_oral_visees"],
    },
  ],
  reel: {
    texte:
      "Reconnaitre une visée est ce qui protège le mieux de se faire mener. Une publicité informe en apparence — les caractéristiques du produit, son prix — mais sa visée est de convaincre, et tout y est choisi pour cela. Une vidéo qui commence par « je vais juste vous expliquer » cherche presque toujours à faire adopter un avis. Un discours qui raconte une histoire triste avant de demander quelque chose émeut d'abord pour faire agir ensuite. Rien de tout cela n'est malhonnête en soi : convaincre est légitime, émouvoir aussi. Ce qui compte, c'est de savoir lequel des quatre est en train de se produire — parce qu'on n'écoute pas de la même façon quelque chose qui informe et quelque chose qui veut obtenir un geste de vous.",
  },
  historique: {
    texte:
      "Prendre des notes en écoutant a été une invention, et on lui connait une date. Vers 63 avant notre ère, Tiron, le secrétaire de Cicéron, met au point un système de signes abrégés pour transcrire les discours du Sénat à la vitesse où on les prononçait — les notae tironianae. Certains de ces signes ont survécu deux mille ans : l'esperluette « & » vient de là, et le « etc. » aussi. Avant lui, un discours n'existait que dans la mémoire de ceux qui l'avaient entendu ; après lui, il pouvait être relu, contesté, cité exactement. Toute la sténographie moderne, et les comptes rendus de tribunaux, descendent de cette idée : écrire assez vite pour suivre une bouche. Ta grille de cinq lignes est la version courte de ce problème vieux de vingt siècles.",
  },
  formule: {
    contexte: "La question qui donne la visée d'un propos, en une seconde.",
    expression: "que doit faire celui qui écoute, quand l'autre s'est tu ?",
    legende:
      "Il sait quelque chose de plus ? C'est informer. Il pense autrement ? Convaincre. Il a ressenti ? Émouvoir. Il accomplit un geste précis ? Faire agir. La réponse n'est jamais dans les mots de celui qui parle — elle est dans ce qui a changé chez celui qui écoute.",
    schema: pile(viseeInformer, viseeAgir),
  },
  methode: [
    {
      titre: "Écrire le sujet avant tout le reste",
      texte:
        "Une phrase, dans les dix premières secondes. Si tu ne peux pas l'écrire, c'est que tu n'as pas compris de quoi on parle — et c'est déjà une question à poser.",
      schema: sujetUnePhrase,
      micros: ["5e_oral_ecouter"],
    },
    {
      titre: "Cinq lignes, et refuser d'en écrire plus",
      texte:
        "Noter tout, c'est recopier ; recopier, c'est ne plus écouter. La grille est courte exprès : elle t'oblige à trier pendant que tu entends.",
      schema: grilleNotes,
      micros: ["5e_oral_ecouter"],
    },
    {
      titre: "Se demander ce qui doit changer chez toi",
      texte:
        "Tu sauras ? tu penseras autrement ? tu ressentiras ? tu feras quelque chose ? La réponse donne la visée, et elle arrive avant la fin.",
      schema: pile(viseeInformer, viseeConvaincre),
      micros: ["5e_oral_visees"],
    },
    {
      titre: "Se méfier de ce qui a l'air d'informer",
      texte:
        "Une publicité donne des faits vrais, et sa visée reste de convaincre. Regarde ce qu'on te demandera à la fin : c'est là qu'elle se trahit.",
      schema: viseeAgir,
      micros: ["5e_oral_visees"],
    },
  ],
  usages: [
    {
      titre: "Pour écouter un exposé et pouvoir répondre",
      detail:
        "Sans notes, on ne se souvient que de la dernière phrase. Avec cinq lignes, on peut poser une vraie question ou objecter précisément.",
      schema: pile(grilleNotes, desaccordGarde),
      micros: ["5e_oral_ecouter"],
    },
    {
      titre: "Pour lire une publicité pour ce qu'elle est",
      detail:
        "Elle informe en surface et cherche à convaincre. Repérer la visée n'est pas se méfier de tout : c'est savoir ce qui se joue.",
      schema: viseeConvaincre,
      micros: ["5e_oral_visees"],
    },
    {
      titre: "Pour préparer sa propre prise de parole",
      detail:
        "Avant d'écrire un mot : que veux-tu que la salle SACHE, PENSE, RESSENTE ou FASSE ? Le reste en découle.",
      schema: pile(viseeEmouvoir, viseeAgir),
      micros: ["5e_oral_visees"],
    },
  ],
  exemples: [
    {
      titre: "Les dix premières secondes",
      donnees: "« Il annonce qu'il va parler de trois choses différentes. »",
      schema: grilleSujet,
      question: "Que notes-tu ?",
      solution:
        "DE QUOI IL PARLE : le sujet, en une phrase, tout de suite — et les trois parties annoncées. C'est la ligne la plus rentable de la grille : elle te permet de savoir, à chaque instant de l'exposé, où tu en es. Sans elle, on écoute sans carte.",
      micros: ["5e_oral_ecouter"],
    },
    {
      titre: "Un mot qu'on ne connait pas",
      donnees: "« Il emploie un mot que tu n'as jamais entendu de ta vie. »",
      schema: grilleTrous,
      question: "Que fais-tu ?",
      solution:
        "Tu le notes dans CE QUE TU N'AS PAS COMPRIS, pour le lui demander tout à l'heure. Ni l'interrompre — tu perdrais la suite —, ni l'oublier. Un trou noté devient une question ; un trou non noté disparait avec la fin de l'exposé.",
      micros: ["5e_oral_ecouter"],
    },
    {
      titre: "Il dit le contraire de ce que tu as lu",
      donnees: "« Il présente le personnage comme un lâche, et tu en doutes. »",
      schema: desaccordGarde,
      question: "Que fais-tu ?",
      solution:
        "Tu notes TON DÉSACCORD, à dire quand ce sera ton tour. Couper a un cout que l'on sous-estime : dès qu'on prépare sa phrase, on n'entend plus la suite — et il donne peut-être, trente secondes plus tard, l'argument qui te ferait changer d'avis.",
      micros: ["5e_oral_ecouter"],
    },
    {
      titre: "Une annonce dans le couloir",
      donnees: "« Une annonce demande de rapporter les manuels avant vendredi. »",
      schema: viseeAgir,
      question: "Quelle est la visée ?",
      solution:
        "FAIRE AGIR : obtenir un geste précis. Le test le montre — quand la voix se tait, l'auditeur doit FAIRE quelque chose, pas seulement savoir. Une information pure aurait été « la date de retour des manuels est vendredi » ; ici, on te demande d'aller les chercher.",
      micros: ["5e_oral_visees"],
    },
    {
      titre: "Un candidat délégué",
      donnees: "« Un candidat explique pourquoi il devrait être délégué. »",
      schema: viseeConvaincre,
      question: "Quelle est la visée ?",
      solution:
        "CONVAINCRE : faire adopter un avis. Il donnera des informations — ce qu'il compte faire, ce qu'il a déjà fait — mais elles servent toutes le même but : que tu penses autrement qu'avant. Informer serait dire ce qu'est un délégué ; ici, il veut ta voix.",
      micros: ["5e_oral_visees"],
    },
    {
      titre: "Un élève raconte",
      donnees: "« Un élève raconte le jour où il a quitté son île. »",
      schema: viseeEmouvoir,
      question: "Quelle est la visée ?",
      solution:
        "ÉMOUVOIR : faire ressentir. Rien ne t'est demandé, et tu n'apprends pas grand-chose de vérifiable ; ce qui doit avoir changé quand il se tait, c'est ce que tu éprouves. C'est une visée entière et légitime — la moitié de la littérature ne fait rien d'autre.",
      micros: ["5e_oral_visees"],
    },
  ],
  pieges: [
    "Tout noter : on recopie, on n'écoute plus, et l'on ne retrouve rien ensuite dans ses pages pleines.",
    "Ne rien noter : au moment de répondre, il ne reste que la dernière phrase entendue.",
    "Couper pour objecter : on perd la suite, et peut-être l'argument qui aurait répondu à l'objection.",
    "Confondre l'avis et l'exemple : « ce livre est ennuyeux » n'est pas « il ne se passe rien avant la page 80 ».",
    "Croire qu'un propos qui donne des faits vrais informe : une publicité en donne, et sa visée est de convaincre.",
    "Chercher la visée dans les mots de celui qui parle : elle est dans ce qui doit changer chez celui qui écoute.",
  ],
  aRetenir: [
    "Cinq lignes à noter : le sujet, son avis, ses exemples, mes trous, mon désaccord.",
    "Le sujet s'écrit dans les dix premières secondes, en une phrase.",
    "Ce qu'on n'a pas compris se note : c'est une question, pas un échec.",
    "Quatre visées : informer, convaincre, émouvoir, faire agir.",
    "La visée se lit chez celui qui ÉCOUTE : que doit-il faire quand l'autre s'est tu ?",
  ],
  entrainement: [
    {
      question: "« Il cite une scène précise pour appuyer ce qu'il avance. » Que notes-tu ?",
      correction: "Sur quoi il s'appuie : les exemples qu'il vient de citer.",
      micros: ["5e_oral_ecouter"],
    },
    {
      question: "« Il termine en disant qu'il conseille ce livre à tout le monde. » Que notes-tu ?",
      correction: "Ce qu'il en pense : son avis, puisqu'il en a donné un vraiment.",
      micros: ["5e_oral_ecouter"],
    },
    {
      question: "« Il dit une phrase trop vite et tu n'en gardes que la moitié. » Que notes-tu ?",
      correction: "Ce que tu n'as pas compris, à lui demander tout à l'heure.",
      micros: ["5e_oral_ecouter"],
    },
    {
      question: "« Un bulletin météo annonce les températures de la semaine. » Quelle visée ?",
      correction: "Informer : faire savoir quelque chose. Rien ne t'est demandé.",
      micros: ["5e_oral_visees"],
    },
    {
      question: "« Un discours rend hommage à quelqu'un qui vient de partir. » Quelle visée ?",
      correction: "Émouvoir : faire ressentir.",
      micros: ["5e_oral_visees"],
    },
    {
      question: "« Un appel demande aux volontaires de s'inscrire avant midi. » Quelle visée ?",
      correction: "Faire agir : obtenir un geste précis, et daté.",
      micros: ["5e_oral_visees"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesOralEcouter5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Écouter et interpréter - 5e",
    section: {
      type: "objectif",
      phrase: "Écouter est un travail, pas un silence",
      sousPhrase:
        "Celui qui note tout ne retient rien. Celui qui ne note rien n'a plus rien à dire à son tour.",
      encadre: {
        titre: "L'idée",
        texte: "Cinq lignes suffisent, et elles ne changent jamais.",
      },
    },
  },
  {
    titre: "La grille des cinq lignes",
    badge: "Écouter et interpréter - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le sujet", texte: "En une phrase, dans les dix premières secondes." },
        { titre: "Son avis", texte: "S'il en a donné un vraiment. À ne pas confondre avec un fait." },
        { titre: "Ses exemples", texte: "Ce sur quoi il s'appuie — la scène, le chapitre, le chiffre." },
        { titre: "Mes trous", texte: "Un mot inconnu : une question à poser, pas un échec." },
      ],
    },
    schema: grilleNotes,
  },
  {
    titre: "Le désaccord attend son tour",
    badge: "Écouter et interpréter - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Il dit une chose que tu as lue autrement.",
        "Tu ne coupes pas : dès qu'on prépare sa phrase, on n'entend plus la suite.",
        "Tu notes — et il donnera peut-être l'argument qui te fera changer d'avis.",
        "Tu le dis quand ce sera ton tour, en citant l'endroit du texte.",
      ],
    },
    schema: desaccordGarde,
  },
  {
    titre: "Les quatre visées",
    badge: "Écouter et interpréter - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Informer", texte: "À la fin, tu SAIS quelque chose de plus." },
        { titre: "Convaincre", texte: "À la fin, tu PENSES autrement qu'avant." },
        { titre: "Émouvoir", texte: "À la fin, tu as RESSENTI quelque chose." },
        { titre: "Faire agir", texte: "À la fin, tu FAIS un geste précis." },
      ],
    },
    schema: pile(viseeInformer, viseeAgir),
  },
  {
    titre: "La question qui donne la visée",
    badge: "Écouter et interpréter - 5e",
    section: {
      type: "objectif",
      phrase: "Que dois-tu faire, quand l'autre s'est tu ?",
      sousPhrase:
        "La visée ne se lit jamais dans les mots de celui qui parle. Elle se lit dans ce qui a changé chez toi.",
      encadre: {
        titre: "Pourquoi ça compte",
        texte: "Une publicité donne des faits vrais — et cherche à convaincre.",
      },
    },
    schema: viseeConvaincre,
  },
  {
    titre: "À vous",
    badge: "Écouter et interpréter - 5e",
    section: {
      type: "exercice",
      enonce: "« Une publicité explique pourquoi ce produit est meilleur que les autres. »",
      question: "Quelle est la visée ?",
      indice: "Que dois-tu faire, ou penser, quand la voix s'arrête ?",
      correction:
        "CONVAINCRE : faire adopter un avis. Elle donne des informations — le prix, les caractéristiques — mais toutes servent à te faire penser autrement. Informer aurait été de dire ce que fait le produit, sans le comparer.",
    },
    schema: viseeConvaincre,
  },
];
