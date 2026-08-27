// ─── Fiche de cours : dire, lire, jouer un texte (5e) ─────────────────────────
// LA HUITIÈME FICHE DE LA 5e ÉCRITE LE 26/08/2026.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// Compétence « Dire, lire, jouer un texte », deux objectifs : « Dire, lire ou
// jouer un texte » et « Utiliser les ressources de la voix et du corps ».
// ⛔ CE N'EST PAS LE PROGRAMME DE LA 4e.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE : LE CROCHET DEVIENT LE CORPS. Le canvas
// `phrase` sert ici une quatrième fois, et chaque fois le crochet a voulu dire
// autre chose — c'est ce qui rend ce canvas si rentable :
//     une FONCTION grammaticale   (toutes les fiches de langue)
//     une RESPIRATION             (`francais-4e-lecture-voix-haute.tsx`)
//     un DÉFAUT à nommer          (`francais-5e-lecture-voix-haute.tsx`)
//     LE CORPS, sous la réplique  (ici)
// « Je n'ai peur de rien ! » avec, sous la ligne, le crochet « il recule » : on
// VOIT l'écart entre ce que la bouche dit et ce que le corps fait. Or cet écart
// est le ressort même du comique, et c'est le questionnement de l'année en 5e
// (« Expérimenter et jouer au théâtre : la société sens dessus dessous »).
// Aucune phrase de cours ne fait voir cela ; un crochet, si.
//
// ⛔ ET LA RÈGLE DE COULEUR QUI VA AVEC, VÉRIFIÉE AU RENDU SUR LA FICHE
// PRÉCÉDENTE : un crochet qui n'est pas une fonction DOIT RESTER GRIS.
// `couleurFonction` déduit la couleur du `label` ; « il recule », « à la
// salle », « autre hauteur » ne tombent dans aucun test, donc neutre. Si l'un
// passait en bleu, l'élève lirait « sujet » sur un geste.
//
// ⛔⛔ LE PARTAGE AVEC LES DEUX AUTRES FICHES D'ORAL, écrit dans les en-têtes des
// banques : `5e_oral_corps` tient la POSTURE, le souffle, le regard et le débit ;
// `5e_oral_jouer` tient le JEU — la surprise, le mensonge, l'aparté, la
// répétition, la peur. Et la 5e joue la COMÉDIE là où la 4e joue une réplique au
// ton juste et la 3e un texte engagé.
//
// Alignée sur la table JOUER de
// lib/tutor-v4/questionBank/5e/francais/socle-ecriture-oral.bank.ts et sur la
// table CORPS de ecriture-oral.bank.ts.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE : aucun titre, aucun auteur dans ce qui est
// demandé à l'élève. Les situations de jeu sont génériques, comme dans la banque.
//
// Micro-compétences couvertes (les 2 de la notion `oral_dire_jouer`) :
// - 5e_oral_jouer → figure, propriétés 1 à 4, formule, méthodes 1 et 2,
//                   usages 1 et 2, exemples 1 à 3
// - 5e_oral_corps → propriétés 5 à 8, méthodes 3 et 4, usage 3, exemples 4 à 6
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin `phrase` ;
// une étiquette de groupe ne se plie pas (trois mots au maximum) ; un mot par
// entrée, ponctuation comprise ; les blocs n'interprètent pas le markdown.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
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

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Le crochet devient le corps ──────────────────────────────────────────────
// ⚠️ Sous la réplique, le crochet ne marque plus une fonction ni une
// respiration : il marque CE QUE FAIT LE CORPS pendant qu'on dit la ligne.

// ── LA FIGURE DE RÉFÉRENCE : la bouche dit une chose, le corps en dit une
//    autre — et l'écart est tout le comique.
const peurVoix = phrase({
  mots: [
    { texte: "Je" },
    { texte: "n'ai" },
    { texte: "peur" },
    { texte: "de" },
    { texte: "rien" },
    { texte: "!", focus: true },
  ],
  legende: "Ce que la bouche dit : la voix tient bon, jusqu'au bout.",
});

const peurCorps = phrase({
  mots: [
    { texte: "Je" },
    { texte: "n'ai" },
    { texte: "peur" },
    { texte: "de" },
    { texte: "rien" },
    { texte: "!", focus: true },
  ],
  groupes: [{ mots: [0, 5], label: "il recule" }],
  legende: "Ce que le corps fait : il recule vers la porte. L'écart fait rire.",
});

// ── LES QUATRE AUTRES GESTES DE LA COMÉDIE.
const surpriseRatee = phrase({
  mots: [
    { texte: "Vous" },
    { texte: "…" },
    { texte: "ici" },
    { texte: "?" },
  ],
  groupes: [{ mots: [0, 3], label: "il savait déjà" }],
  legende: "Joué comme s'il savait : la surprise n'a pas lieu, la scène tombe.",
});

const surpriseJuste = phrase({
  mots: [
    { texte: "Vous" },
    { texte: "…" },
    { texte: "ici", focus: true },
    { texte: "?" },
  ],
  groupes: [{ mots: [0, 3], label: "il découvre" }],
  legende: "Il découvre à l'instant, pas avant. Tout le jeu est dans ce retard.",
});

const mensongeSeul = phrase({
  mots: [
    { texte: "Je" },
    { texte: "n'ai" },
    { texte: "rien" },
    { texte: "pris" },
    { texte: "!" },
  ],
  groupes: [{ mots: [0, 4], label: "lui seul y croit" }],
  legende: "Le public a vu le contraire : le personnage est seul à y croire.",
});

const aparte = phrase({
  mots: [
    { texte: "Il" },
    { texte: "ne" },
    { texte: "se" },
    { texte: "doute" },
    { texte: "de" },
    { texte: "rien" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 6], label: "à la salle" }],
  legende: "L'aparté : on prend le public à témoin, pas son partenaire de scène.",
});

const repetition = phrase({
  mots: [
    { texte: "Non", focus: true },
    { texte: "·" },
    { texte: "Non", focus: true },
    { texte: "·" },
    { texte: "NON", focus: true },
  ],
  liens: [{ de: 4, vers: 0, label: "plus fort", type: "reprise" }],
  legende: "Le mot revient, et chaque fois plus fort. Sinon rien ne monte.",
});

// ── LES RESSOURCES DE LA VOIX ET DU CORPS.
const silenceAvant = phrase({
  mots: [
    { texte: "…", focus: true },
    { texte: "Il" },
    { texte: "est" },
    { texte: "parti" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 0], label: "un silence" }],
  legende: "Un silence juste avant : la salle sait qu'une chose importante arrive.",
});

const motAppuye = phrase({
  mots: [
    { texte: "Ce" },
    { texte: "n'est" },
    { texte: "pas" },
    { texte: "moi", focus: true },
    { texte: "qui" },
    { texte: "l'ai" },
    { texte: "pris" },
    { texte: "." },
  ],
  legende: "Un seul mot appuyé. Appuyer partout, c'est n'appuyer nulle part.",
});

const citationHauteur = phrase({
  mots: [
    { texte: "Il" },
    { texte: "m'a" },
    { texte: "dit" },
    { texte: ":" },
    { texte: "«" },
    { texte: "reviens" },
    { texte: "demain" },
    { texte: "»" },
  ],
  groupes: [{ mots: [4, 7], label: "autre hauteur" }],
  legende: "On cite : la voix change de hauteur, et l'on entend les guillemets.",
});

const questionAttend = phrase({
  mots: [
    { texte: "Qui" },
    { texte: "donc" },
    { texte: "a" },
    { texte: "ouvert" },
    { texte: "?", focus: true },
  ],
  groupes: [{ mots: [0, 4], label: "puis on attend" }],
  legende: "La voix monte au dernier mot — et l'on attend vraiment une réponse.",
});

const finQuiTombe = phrase({
  mots: [
    { texte: "et" },
    { texte: "personne" },
    { texte: "ne" },
    { texte: "revint", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 4], label: "voix haute" }],
  legende: "La fin ne retombe pas : la voix tient jusqu'au dernier mot.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOralDireJouer5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "oral-dire-jouer",
  titre: "Dire, lire et jouer un texte en 5e (2026-2027)",
  accroche:
    "« Je n'ai peur de rien ! » — et le personnage recule vers la porte. Personne n'a écrit « il recule » dans la réplique, et c'est pourtant là que se trouve le rire : dans l'écart entre ce que la bouche affirme et ce que le corps fait. Jouer un texte, ce n'est pas le dire avec plus d'énergie. C'est ajouter ce que les mots ne disent pas.",
  identite: [
    { label: "Mots clés", valeur: "Surprise, aparté, répétition, silence, geste" },
    { label: "Le secret", valeur: "L'écart entre la voix et le corps" },
    { label: "Outil", valeur: "Un effet, un moyen. Un seul." },
  ],
  definition: {
    texte:
      "Dire un texte devant les autres, ce n'est pas le prononcer plus fort : c'est ajouter au texte ce qu'il ne contient pas. Le SILENCE, le débit, la hauteur de la voix, le regard, la place occupée sur scène et le geste portent une part du sens — souvent celle que les mots taisent. Et quand on JOUE, un cran de plus est demandé : le personnage doit découvrir à l'instant ce qu'il découvre, croire seul à son mensonge, prendre la salle à témoin quand il parle en aparté, faire monter un mot qui revient. Le ressort le plus puissant, celui que la comédie emploie depuis toujours, est la CONTRADICTION : la voix affirme, le corps dément. C'est cela que le public voit, et c'est cela qui le fait rire.",
  },
  figure: {
    schema: pile(peurVoix, peurCorps),
    legende:
      "La même réplique, deux fois. En haut ce que la bouche dit : la voix tient bon jusqu'au point d'exclamation. En bas, le crochet sous la ligne dit ce que le CORPS fait pendant ce temps — il recule. Le crochet ne marque plus une fonction grammaticale ni une respiration : il marque le corps. Et l'écart entre les deux lignes est exactement ce qui fait rire.",
  },
  proprietes: [
    {
      titre: "Le corps peut contredire la voix",
      texte:
        "« Je n'ai peur de rien » en reculant, « approchez donc » en se cachant. La voix tient bon, le corps dément : c'est le ressort du comique.",
      schema: peurCorps,
      micros: ["5e_oral_jouer"],
    },
    {
      titre: "Le personnage découvre à l'instant",
      texte:
        "Tu connais la scène par cœur ; lui ne la connait pas. Joué comme s'il savait déjà, le moment de surprise n'a pas lieu et la scène tombe.",
      schema: pile(surpriseRatee, surpriseJuste),
      micros: ["5e_oral_jouer"],
    },
    {
      titre: "Le menteur est seul à y croire",
      texte:
        "Le public a vu le contraire. Le comique ne vient pas du mensonge mais de l'aplomb : plus le personnage y croit, plus la salle rit.",
      schema: mensongeSeul,
      micros: ["5e_oral_jouer"],
    },
    {
      titre: "L'aparté s'adresse à la salle",
      texte:
        "Le texte indique « à part » : on se tourne vers le public, pas vers l'autre personnage. Il n'est pas censé entendre — et tout le monde le sait.",
      schema: aparte,
      micros: ["5e_oral_jouer"],
    },
    {
      titre: "Un silence annonce mieux qu'un mot",
      texte:
        "Juste avant la chose importante : on s'arrête. La salle comprend qu'il va se passer quelque chose, sans qu'on l'ait dit.",
      schema: silenceAvant,
      micros: ["5e_oral_corps"],
    },
    {
      titre: "On appuie UN mot, pas la phrase",
      texte:
        "« Ce n'est pas MOI qui l'ai pris. » Le mot appuyé change le sens de la phrase entière — et appuyer partout revient à n'appuyer nulle part.",
      schema: motAppuye,
      micros: ["5e_oral_corps"],
    },
    {
      titre: "La voix monte pour citer, et pour questionner",
      texte:
        "Changer de hauteur fait entendre les guillemets. Monter au dernier mot fait entendre la question — à condition d'attendre ensuite.",
      schema: pile(citationHauteur, questionAttend),
      micros: ["5e_oral_corps"],
    },
    {
      titre: "La fin d'une phrase ne retombe pas",
      texte:
        "La voix qui redescend sur les derniers mots donne l'impression qu'on abandonne. On la tient jusqu'au point, et l'on s'arrête net.",
      schema: finQuiTombe,
      micros: ["5e_oral_corps"],
    },
  ],
  reel: {
    texte:
      "Tout ce qui est ici sert bien au-delà d'une scène de théâtre : un exposé, une soutenance, un entretien, une explication à un groupe. Le silence avant la phrase importante, le mot appuyé plutôt que la phrase entière, le regard qui balaie la salle au lieu de fixer ses notes, la voix qui ne retombe pas à la fin — ce sont les mêmes gestes, et ce sont eux qui font qu'on vous écoute jusqu'au bout. Une chose vaut la peine d'être sue tôt : personne ne trouve cela naturel. Ceux qui parlent bien en public ne sont pas nés ainsi, ils ont répété — et la contradiction entre ce qu'ils disent et ce que leur corps montre est le premier défaut qu'ils ont appris à voir chez eux.",
  },
  historique: {
    texte:
      "La comédie a longtemps eu ses gestes fixés d'avance. Dans la commedia dell'arte, née en Italie au XVIe siècle et jouée dans toute l'Europe, les acteurs n'avaient pas de texte écrit : seulement un canevas — l'histoire en quelques lignes — et des personnages que le public reconnaissait au premier coup d'œil, chacun avec son masque, sa démarche et ses tics. Arlequin bondissait, le Docteur pérorait, le Capitan se vantait de sa bravoure et s'enfuyait au premier danger. Tout se jouait donc dans le geste, et les répliques s'inventaient chaque soir. C'est de là que vient la plupart des ressorts qu'on emploie encore — l'aparté, le valet plus malin que son maitre, le vantard qui recule. Le comique de contradiction a quatre siècles au bas mot, et il fonctionne toujours.",
  },
  formule: {
    contexte: "La règle qui évite de tout jouer en même temps, et donc de ne rien jouer.",
    expression: "un effet, un moyen — et un seul",
    legende:
      "Tu veux montrer que ton personnage a peur ? Choisis : le corps qui recule, OU la voix qui tremble, OU le silence. Employer les trois à la fois brouille tout et n'atteint personne. Le jeu se construit en additionnant des choix simples, pas en accumulant des intentions.",
    schema: peurCorps,
  },
  methode: [
    {
      titre: "Chercher où la voix et le corps peuvent se contredire",
      texte:
        "Relis la réplique et demande-toi ce que le personnage ferait vraiment. S'il affirme le contraire de ce qu'il fait, tu tiens ta scène.",
      schema: peurCorps,
      micros: ["5e_oral_jouer"],
    },
    {
      titre: "Oublier ce que tu sais de la suite",
      texte:
        "Le personnage découvre à l'instant. Repère les moments où il apprend quelque chose et joue-les comme s'ils te surprenaient toi.",
      schema: surpriseJuste,
      micros: ["5e_oral_jouer"],
    },
    {
      titre: "Partir de l'effet, puis choisir le moyen",
      texte:
        "Que veux-tu que la salle ressente ? Puis un seul moyen : un silence, un mot appuyé, un changement de place, un geste. Pas les quatre.",
      schema: pile(silenceAvant, motAppuye),
      micros: ["5e_oral_corps"],
    },
    {
      titre: "Articuler plutôt que pousser la voix",
      texte:
        "Pour être entendu du fond, on n'augmente pas le volume : on détache les syllabes. Crier fatigue et rend moins clair, pas plus.",
      schema: finQuiTombe,
      micros: ["5e_oral_corps"],
    },
  ],
  usages: [
    {
      titre: "Pour jouer une scène de comédie",
      detail:
        "Cinq gestes suffisent : la surprise, le mensonge auquel il croit seul, l'aparté, la répétition qui monte, la peur que le corps trahit.",
      schema: pile(mensongeSeul, aparte),
      micros: ["5e_oral_jouer"],
    },
    {
      titre: "Pour faire monter un passage",
      detail:
        "Un mot qui revient trois fois doit revenir trois fois PLUS FORT. Répété à volume égal, il n'est plus une répétition : c'est une répétition ratée.",
      schema: repetition,
      micros: ["5e_oral_jouer"],
    },
    {
      titre: "Pour un exposé qu'on écoute jusqu'au bout",
      detail:
        "Le silence avant l'idée importante, le regard qui balaie, la voix qui ne retombe pas : les mêmes gestes qu'au théâtre, sans le costume.",
      schema: pile(silenceAvant, questionAttend),
      micros: ["5e_oral_corps"],
    },
  ],
  exemples: [
    {
      titre: "Le corps contre la voix",
      donnees: "« Il affirme qu'il n'a peur de rien et recule vers la porte. »",
      schema: peurCorps,
      question: "Comment joues-tu cela ?",
      solution:
        "Tu joues LA PEUR : le corps recule, et la voix tient bon. Surtout ne pas faire trembler la voix — ce serait dire deux fois la même chose, et l'écart disparaitrait. Tout le comique tient à ce que le personnage continue d'affirmer pendant que son corps le dément.",
      micros: ["5e_oral_jouer"],
    },
    {
      titre: "Le moment de la découverte",
      donnees: "« Le personnage ouvre une porte et découvre ce qu'il ne devait pas voir. »",
      schema: pile(surpriseRatee, surpriseJuste),
      question: "Qu'est-ce qui se joue ici ?",
      solution:
        "LA SURPRISE : il découvre à l'instant, pas avant. C'est le geste le plus souvent raté, parce que l'acteur, lui, sait depuis trois répétitions ce qu'il y a derrière la porte. Il faut retarder la réaction d'une fraction de seconde — le temps que le personnage voie, avant que la bouche parle.",
      micros: ["5e_oral_jouer"],
    },
    {
      titre: "Il parle, mais à qui ?",
      donnees: "« Le texte indique “à part” avant la réplique du valet. »",
      schema: aparte,
      question: "Vers qui te tournes-tu ?",
      solution:
        "Vers LA SALLE. L'aparté prend le public à témoin : l'autre personnage n'est pas censé entendre, et toute la salle sait qu'il n'entend pas. Joué vers le partenaire, l'aparté n'existe plus — et la complicité avec le public, qui est tout son intérêt, disparait avec lui.",
      micros: ["5e_oral_jouer"],
    },
    {
      titre: "Faire attendre une phrase",
      donnees: "Tu veux que la salle sente qu'une chose importante arrive.",
      schema: silenceAvant,
      question: "Quelle ressource emploies-tu ?",
      solution:
        "UN SILENCE, juste avant de la dire. C'est le moyen le plus simple et le plus sûr : le silence attire l'attention mieux qu'un mot plus fort, parce qu'il rompt le flot. Attention à ne pas y ajouter un geste et un changement de ton — un effet, un moyen.",
      micros: ["5e_oral_corps"],
    },
    {
      titre: "Le fond de la salle n'entend pas",
      donnees: "Tu veux que le fond de la salle t'entende sans forcer.",
      schema: finQuiTombe,
      question: "Que fais-tu ?",
      solution:
        "Tu ARTICULES DAVANTAGE plutôt que de pousser la voix. Crier abime la voix, la rend moins claire, et donne l'impression d'être en difficulté. Détacher les syllabes porte plus loin qu'augmenter le volume — c'est contre-intuitif, et c'est vérifiable dès le premier essai.",
      micros: ["5e_oral_corps"],
    },
    {
      titre: "Séparer deux idées sans le dire",
      donnees: "Tu passes d'une partie de ton exposé à la suivante.",
      schema: citationHauteur,
      question: "Quelle ressource emploies-tu ?",
      solution:
        "Tu CHANGES DE PLACE sur la scène entre les deux. Le déplacement dit « nouvelle partie » sans qu'aucun mot ne l'annonce, et la salle le comprend immédiatement. C'est le même principe que le changement de hauteur pour une citation : le corps et la voix ponctuent ce que les mots ne ponctuent pas.",
      micros: ["5e_oral_corps"],
    },
  ],
  pieges: [
    "Jouer la surprise comme si le personnage savait déjà : c'est le défaut le plus fréquent, et la scène tombe avec lui.",
    "Faire trembler la voix ET reculer : les deux disent la peur, l'écart disparait, et le comique avec.",
    "Jouer l'aparté vers l'autre personnage : il n'est plus un aparté, et la complicité avec la salle est perdue.",
    "Répéter un mot au même volume : une répétition qui ne monte pas n'est pas une répétition, c'est une redite.",
    "Employer quatre effets sur la même phrase : ils s'annulent. Un effet, un moyen.",
    "Crier pour être entendu du fond : on articule, on ne pousse pas. Crier porte moins loin et s'entend comme de la panique.",
  ],
  aRetenir: [
    "Jouer, c'est ajouter au texte ce qu'il ne dit pas : le corps, le silence, le regard.",
    "Le ressort du comique est la CONTRADICTION : la voix affirme, le corps dément.",
    "Le personnage découvre à l'instant — toi tu sais, lui non.",
    "L'aparté s'adresse à la salle ; la répétition monte à chaque retour.",
    "Un effet, un moyen. Tout employer à la fois ne produit rien.",
  ],
  entrainement: [
    {
      question: "« Il jure n'avoir rien pris, et le public a vu le contraire. » Que joues-tu ?",
      correction: "Le mensonge : lui seul y croit, et c'est son aplomb qui fait rire.",
      micros: ["5e_oral_jouer"],
    },
    {
      question: "« Le même mot revient dans quatre répliques de suite. » Que joues-tu ?",
      correction: "La répétition : le mot revient, et chaque fois plus fort.",
      micros: ["5e_oral_jouer"],
    },
    {
      question: "« Il se tourne vers le public au milieu d'une dispute. » Que joues-tu ?",
      correction: "L'aparté : tu prends la salle à témoin, pas ton partenaire.",
      micros: ["5e_oral_jouer"],
    },
    {
      question: "Tu veux qu'on retienne un mot précis de ta phrase. Que fais-tu ?",
      correction: "Tu appuies ce mot plus fort que les autres. Un seul, pas la phrase.",
      micros: ["5e_oral_corps"],
    },
    {
      question: "Tu veux montrer la colère d'un personnage sans crier. Que fais-tu ?",
      correction: "Tu durcis le débit, en détachant chaque syllabe.",
      micros: ["5e_oral_corps"],
    },
    {
      question: "Tu veux tenir l'attention d'un public dispersé. Que fais-tu ?",
      correction: "Tu regardes successivement plusieurs endroits de la salle.",
      micros: ["5e_oral_corps"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesOralDireJouer5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Dire, lire, jouer - 5e",
    section: {
      type: "objectif",
      phrase: "Jouer, c'est ajouter ce que le texte ne dit pas",
      sousPhrase:
        "Le corps, le silence, le regard. La réplique ne contient pas tout — et c'est là qu'est le jeu.",
      encadre: {
        titre: "L'idée",
        texte: "« Je n'ai peur de rien ! » — et il recule vers la porte.",
      },
    },
  },
  {
    titre: "La voix affirme, le corps dément",
    badge: "Dire, lire, jouer - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce que dit la bouche",
        contenu: "« Je n'ai peur de rien ! » La voix tient bon jusqu'au bout.",
      },
      droite: {
        titre: "Ce que fait le corps",
        contenu: "Il recule vers la porte. Personne ne l'a écrit dans la réplique.",
      },
    },
    schema: pile(peurVoix, peurCorps),
  },
  {
    titre: "Les cinq gestes de la comédie",
    badge: "Dire, lire, jouer - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "La surprise", texte: "Il découvre à l'instant. Toi tu sais, lui non." },
        { titre: "Le mensonge", texte: "Lui seul y croit. Plus il y croit, plus ça marche." },
        { titre: "L'aparté", texte: "On se tourne vers la salle, pas vers l'autre." },
        { titre: "La répétition", texte: "Le mot revient — et chaque fois plus fort." },
      ],
    },
    schema: pile(surpriseJuste, aparte),
  },
  {
    titre: "Les ressources de la voix et du corps",
    badge: "Dire, lire, jouer - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Un silence juste avant : la salle sait qu'une chose importante arrive.",
        "Un seul mot appuyé : « Ce n'est pas MOI qui l'ai pris. »",
        "Un changement de hauteur pour citer : on entend les guillemets.",
        "Une voix qui ne retombe pas : on tient jusqu'au dernier mot.",
      ],
    },
    schema: pile(silenceAvant, motAppuye),
  },
  {
    titre: "La règle qui évite de tout gâcher",
    badge: "Dire, lire, jouer - 5e",
    section: {
      type: "objectif",
      phrase: "Un effet, un moyen",
      sousPhrase:
        "Le corps qui recule OU la voix qui tremble OU le silence. Les trois ensemble n'atteignent personne.",
      encadre: {
        titre: "Pourquoi",
        texte: "Le jeu s'additionne par choix simples, jamais par intentions empilées.",
      },
    },
    schema: repetition,
  },
  {
    titre: "À vous",
    badge: "Dire, lire, jouer - 5e",
    section: {
      type: "exercice",
      enonce: "« Il dit “approchez donc” et se cache derrière une chaise. »",
      question: "Comment joues-tu cette réplique ?",
      indice: "Que dit la bouche ? Que fait le corps ? Ne joue pas deux fois la même chose.",
      correction:
        "La voix invite, ferme et assurée ; le corps se cache. Surtout ne pas faire trembler la voix : l'écart entre les deux disparaitrait, et le rire avec.",
    },
    schema: peurCorps,
  },
];
