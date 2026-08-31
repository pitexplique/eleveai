// ─── Fiche de cours : lire à voix haute avec expressivité (CM2) ───────────────
// DEUXIÈME FICHE DU CHANTIER CM2.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année ». ⛔ MÊME PROGRAMME QUE
// LA 6e — la séparation se fait sur les MICROS, pas sur le texte officiel.
//
// ⛔⛔ ET `lecture_voix_haute` EXISTE EN CM2, EN 6e ET EN 5e. Trois fiches, trois
// contenus, et il a fallu comparer les micros une par une :
//
//   | classe | ce que la fiche porte |
//   |---|---|
//   | 5e (cycle 4) | la PARTITION : groupes de souffle, diagnostic d'une lecture entendue |
//   | 6e (cycle 3) | l'INDICE : ce qui, dans le texte, commande le ton |
//   | CM2 (cycle 3) | LE DESTINATAIRE : on lit POUR quelqu'un, et il juge seul |
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE, ET ELLE VIENT DE DEUX SOURCES QUI SE
// RÉPONDENT : ON NE LIT PAS À VOIX HAUTE POUR PROUVER QU'ON SAIT LIRE — ON LIT
// POUR QUELQU'UN. Le micro `cm2_flue_plaisir_lire` dit « faire vivre un texte et
// PRENDRE PLAISIR à le lire », et l'item fixe pose la situation en clair : « lire
// une histoire à des plus jeunes et leur DONNER ENVIE D'ÉCOUTER ». Le CM2 a un
// auditoire réel, souvent plus jeune que lui — et c'est cet auditoire qui décide
// si la lecture est réussie, pas le nombre d'erreurs.
//
// ⭐ CE RENVERSEMENT CHANGE CHAQUE RÈGLE. On met le ton non parce que c'est
// demandé, mais parce que sans lui l'autre décroche. On respecte les pauses non
// par correction, mais parce qu'elles laissent le temps de comprendre. Et l'on
// ne saute pas les passages difficiles — non parce que c'est tricher, mais parce
// que celui qui écoute perd le fil.
//
// ⭐ ET LE PLAISIR EST DANS LE PROGRAMME, explicitement, ce qui est rare. Il n'y
// est pas comme récompense : il y est comme MOYEN — une lecture que celui qui lit
// n'aime pas donner ne donne envie à personne.
//
// ⛔ CE QUE CETTE FICHE NE REDIT PAS : le repérage des indices de ton (le verbe
// de parole, la ponctuation) appartient à la fiche de 6e ; la préparation, les
// liaisons et le palier de 120 mots appartiennent à `francais-cm2-fluence-lecture`.
// Ici on suppose le texte préparé et l'on parle de ce qu'on en fait.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Bande `nature` centrée sur son mot.
//
// Alignée sur le pool MISE_EN_VOIX de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `cm2_fr_fixed_fluence_4` et `_5` de
// lib/tutor-v4/questionBank/cm2/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `lecture_voix_haute`) :
// - cm2_voix_articulation   → propriétés 1 à 3, méthode 1, usage 1, exemples 1 et 2
// - cm2_flue_mise_en_voix   → propriétés 4 à 6, formule, méthode 2, usage 2, exemple 3
// - cm2_flue_plaisir_lire   → figure, propriétés 7 à 9, méthode 3, usage 3,
//                             exemples 4 et 5
// - cm2_voix_defi           → propriété 10, méthode 4, usage 4, exemple 6

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

/** Ce que fait celui qui écoute. ⚠️ Cellules courtes : à la largeur d'un bloc,
 *  vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand on lit POUR quelqu'un ────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : le juge est celui qui écoute.
const lirePourQuelquun = phrase({
  mots: [
    { texte: "tu lis" },
    { texte: "il écoute", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "juge", type: "question" }],
  legende: "Ce n'est pas le nombre d'erreurs qui décide : c'est lui.",
});

const grilleCeQuIlFait = grille({
  headers: ["Ce que tu fais", "Ce qu'il fait"],
  rows: [
    { values: ["tu mets le ton", "il reste"] },
    { values: ["tu fais les pauses", "il comprend"] },
    { values: ["tu lis d'un trait", "il décroche"] },
    { values: ["tu sautes un passage", "il perd le fil"] },
  ],
  caption: "Chaque règle a une raison, et elle est de son côté.",
});

const grilleCeQuIlFaitPauses = grille({
  headers: ["Ce que tu fais", "Ce qu'il fait"],
  rows: [
    { values: ["tu mets le ton", "il reste"] },
    { values: ["tu fais les pauses", "il comprend"] },
    { values: ["tu lis d'un trait", "il décroche"] },
    { values: ["tu sautes un passage", "il perd le fil"] },
  ],
  highlight: { row: 1 },
  caption: "La pause n'est pas une politesse : c'est du temps qu'on lui donne.",
});

// ── L'ARTICULATION : ce qui se perd au fond de la salle.
const articulerPourLeFond = phrase({
  mots: [
    { texte: "marmonner", barre: true },
    { texte: "jusqu'au fond", focus: true },
  ],
  legende: "Ce qui n'arrive pas au dernier rang n'a pas été lu, même bien lu.",
});

const respecterLarticulation = phrase({
  mots: [
    { texte: "chaque mot" },
    { texte: "entier", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "dit", type: "question" }],
  legende: "Les fins de mots sont ce qui tombe en premier quand on va trop vite.",
});

const trouverSonRythme = phrase({
  mots: [
    { texte: "trop vite", barre: true },
    { texte: "il te suit", focus: true },
  ],
  legende: "Le bon rythme n'est pas le tien : c'est celui auquel il peut suivre.",
});

// ── LA MISE EN VOIX : intonation et effets.
const tonSelonLaScene = phrase({
  mots: [
    { texte: "« Au secours ! »" },
    { texte: "forte et pressée", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "demande", type: "question" }],
  legende: "L'exclamation et l'urgence appellent une voix forte et rapide.",
});

const varierOuEndormir = phrase({
  mots: [
    { texte: "un seul ton", barre: true },
    { texte: "faire varier", focus: true },
  ],
  legende: "Monotone veut dire « un seul ton » : c'est ce qui fait décrocher.",
});

const effetDuSilence = phrase({
  mots: [
    { texte: "un silence", focus: true },
    { texte: "il attend" },
  ],
  liens: [{ de: 0, vers: 1, label: "et", type: "question" }],
  legende: "Une pause avant la surprise vaut mieux que dix mots pour l'annoncer.",
});

// ── LE PLAISIR : dans le programme, et comme moyen.
const plaisirCommeMoyen = phrase({
  mots: [
    { texte: "tu aimes le lire" },
    { texte: "il aime l'entendre", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "donc", type: "question" }],
  legende: "Une lecture que celui qui lit n'aime pas donner ne donne envie à personne.",
});

const choisirCeQuOnAime = phrase({
  mots: [
    { texte: "un passage aimé", focus: true },
    { texte: "s'entend" },
  ],
  legende: "Cela s'entend, et cela ne se joue pas : choisis quand tu le peux.",
});

// ── LE DÉFI : un auditoire plus jeune.
const auditoirePlusJeune = phrase({
  mots: [
    { texte: "des plus jeunes" },
    { texte: "plus lentement", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "donc", type: "question" }],
  legende: "Ils suivent moins vite : le rythme se règle sur eux, pas sur toi.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureVoixHauteCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "lecture-voix-haute",
  titre: `Lire à voix haute avec expressivité en CM2 (${ANNEE_SCOLAIRE})`,
  accroche:
    "ON NE LIT PAS À VOIX HAUTE POUR PROUVER QU'ON SAIT LIRE — ON LIT POUR QUELQU'UN. Et c'est lui qui décide si c'est réussi, pas le nombre d'erreurs. Chaque règle change alors de raison : tu mets le ton parce que sans lui il décroche, tu fais les pauses parce qu'elles lui laissent le temps de comprendre. Le programme va plus loin encore : il demande que tu y prennes PLAISIR.",
  identite: [
    { label: "Mots clés", valeur: "Auditoire, articuler, ton, pauses, plaisir" },
    { label: "Le secret", valeur: "C'est celui qui écoute qui juge" },
    { label: "Outil", valeur: "Est-ce qu'il me suit ?" },
  ],
  definition: {
    texte:
      "Lire à voix haute AVEC EXPRESSIVITÉ, c'est faire vivre un texte devant quelqu'un — et ce quelqu'un est souvent, au CM2, un auditoire plus jeune. Trois choses s'y jouent. L'ARTICULATION d'abord : on dit chaque mot entier, jusqu'au fond de la salle, car ce qui n'arrive pas au dernier rang n'a pas été lu ; et l'on va à un rythme où l'autre peut suivre, qui n'est pas forcément le sien. LA MISE EN VOIX ensuite : l'intonation suit ce que dit le texte — « Au secours ! » se lit d'une voix forte et pressée, parce que l'exclamation et l'urgence le demandent — et l'on FAIT VARIER, car une lecture monotone (le mot veut dire « un seul ton ») fait décrocher ; un silence bien placé vaut mieux que dix mots pour annoncer une surprise. LE PLAISIR enfin, que le programme nomme explicitement : faire vivre un texte et prendre plaisir à le lire. Ce n'est pas une récompense, c'est un moyen — une lecture que celui qui la donne n'aime pas ne donne envie à personne.",
  },
  figure: {
    schema: pile(lirePourQuelquun, grilleCeQuIlFait),
    legende:
      "L'arc part de celui qui écoute et pointe vers celui qui lit : c'est lui le juge, et il n'y en a pas d'autre. Un élève qui lit sans une erreur devant une classe qui n'écoute plus a raté sa lecture ; un élève qui bute deux fois mais qu'on suit jusqu'au bout l'a réussie. Le tableau donne la raison de chaque règle, et elles sont toutes de son côté — le ton pour qu'il reste, les pauses pour qu'il comprenne, la lenteur pour qu'il suive. Aucune n'est une politesse.",
  },
  proprietes: [
    {
      titre: "Ce qui n'arrive pas au fond n'a pas été lu",
      texte:
        "Même bien lu. Articuler n'est pas parler fort : c'est dire chaque mot entier, y compris sa fin — et les fins tombent en premier quand on se presse.",
      schema: articulerPourLeFond,
      micros: ["cm2_voix_articulation"],
    },
    {
      titre: "Les fins de mots tombent en premier",
      texte:
        "« ils partaient » devient « ils parté ». Personne ne s'en rend compte en lisant : on l'entend seulement quand quelqu'un d'autre lit ainsi.",
      schema: respecterLarticulation,
      micros: ["cm2_voix_articulation"],
    },
    {
      titre: "Le bon rythme n'est pas le tien",
      texte:
        "C'est celui auquel l'autre peut suivre. Lire vite ne fait pas gagner de temps : cela fait perdre l'auditoire, et il faut alors tout redire.",
      schema: trouverSonRythme,
      micros: ["cm2_voix_articulation"],
    },
    {
      titre: "Le texte dit quelle voix prendre",
      texte:
        "« — Au secours ! Le feu ! » cria le pompier : l'exclamation et le verbe demandent une voix forte et pressée. Ce n'est pas toi qui choisis.",
      schema: tonSelonLaScene,
      micros: ["cm2_flue_mise_en_voix"],
    },
    {
      titre: "Monotone veut dire « un seul ton »",
      texte:
        "C'est le sens exact du mot, et c'est ce qui fait décrocher. Une lecture peut être forte, nette, sans erreur — et parfaitement monotone.",
      schema: varierOuEndormir,
      micros: ["cm2_flue_mise_en_voix"],
    },
    {
      titre: "Un silence est un effet",
      texte:
        "Une pause juste avant la surprise fait plus que dix mots pour l'annoncer. C'est l'outil le plus simple, et presque personne ne l'utilise.",
      schema: effetDuSilence,
      micros: ["cm2_flue_mise_en_voix"],
    },
    {
      titre: "Le programme demande du plaisir",
      texte:
        "« Faire vivre un texte et prendre plaisir à le lire » : c'est écrit. Et ce n'est pas une récompense — c'est ce qui rend la lecture écoutable.",
      schema: plaisirCommeMoyen,
      micros: ["cm2_flue_plaisir_lire"],
    },
    {
      titre: "Ce que tu aimes s'entend",
      texte:
        "Un passage que tu as choisi se lit autrement qu'un passage imposé, sans que tu fasses rien de particulier. Choisis quand tu le peux.",
      schema: choisirCeQuOnAime,
      micros: ["cm2_flue_plaisir_lire"],
    },
    {
      titre: "Et sauter un passage difficile ne se cache pas",
      texte:
        "Celui qui écoute ne voit pas le texte, mais il perd le fil. Un trou dans l'histoire s'entend, même quand la faute ne s'entend pas.",
      schema: grilleCeQuIlFaitPauses,
      micros: ["cm2_flue_plaisir_lire"],
    },
    {
      titre: "Le défi : lire à des plus jeunes",
      texte:
        "Ils suivent moins vite, comprennent moins vite, et décrochent plus vite. Le rythme se règle sur eux — et c'est le meilleur entrainement qui existe.",
      schema: auditoirePlusJeune,
      micros: ["cm2_voix_defi"],
    },
  ],
  reel: {
    texte:
      "Tu sais déjà tout cela, du côté de celui qui écoute. Quand quelqu'un te lit une consigne d'un trait, sans respirer, tu ne la retiens pas — et ce n'est pas parce qu'il a mal prononcé. Quand un adulte lit une histoire à un petit et s'arrête juste avant le moment où le loup apparait, l'enfant se redresse : c'est un silence, et il vaut tous les mots. Tu as aussi éprouvé l'inverse : quelqu'un qui lit vite pour en finir, et à qui personne ne demande de recommencer parce que personne ne suivait déjà. Retiens ce renversement — quand tu lis à voix haute, la seule question utile n'est pas « est-ce que je fais des erreurs ? » mais « est-ce qu'il me suit ? ». Tu peux d'ailleurs le vérifier en levant les yeux.",
  },
  historique: {
    texte:
      "Avant que les livres soient nombreux et bon marché, la lecture était presque toujours une lecture à voix haute pour d'autres. Dans les ateliers de cigares de Cuba, au XIXe siècle, les ouvriers se cotisaient pour payer un lecteur — le lector — qui lisait le journal le matin et des romans l'après-midi, du haut d'une estrade, pendant qu'ils travaillaient. Ce sont les ouvriers qui choisissaient les livres, et un lecteur qui ennuyait était remplacé. Le métier a existé pendant des décennies et il subsiste encore dans quelques fabriques. Il dit exactement ce que cette fiche dit : celui qui lit à voix haute travaille pour ceux qui écoutent, et ce sont eux qui jugent.",
  },
  formule: {
    contexte: "La seule question utile pendant qu'on lit à voix haute.",
    expression: "est-ce qu'il me suit ?",
    legende:
      "Pas « est-ce que je fais des erreurs » — cela ne se répond pas en lisant, et cela ne concerne que toi. Est-ce qu'il me suit se vérifie en levant les yeux une fois par paragraphe : si les regards sont partis, ralentis ou fais varier. C'est la seule correction qui se fait en direct.",
    schema: lirePourQuelquun,
  },
  methode: [
    {
      titre: "Dire les fins de mots exprès",
      texte:
        "Ce sont elles qui tombent quand on accélère. Les prononcer entières ralentit un peu, et rend la lecture nette du premier rang au dernier.",
      schema: respecterLarticulation,
      micros: ["cm2_voix_articulation"],
    },
    {
      titre: "Décider deux ou trois endroits où varier",
      texte:
        "Avant de lire : ici plus fort, là plus bas, un silence avant cette phrase. Trois marques suffisent à empêcher la monotonie.",
      schema: varierOuEndormir,
      micros: ["cm2_flue_mise_en_voix"],
    },
    {
      titre: "Lever les yeux une fois par paragraphe",
      texte:
        "Pour voir s'ils suivent encore. C'est la seule mesure disponible en direct, et elle te dit quoi corriger tout de suite.",
      schema: lirePourQuelquun,
      micros: ["cm2_flue_plaisir_lire"],
    },
    {
      titre: "S'entrainer sur quelqu'un de plus jeune",
      texte:
        "Un petit frère, une petite sœur, un CP. Ils décrochent vite et ils le montrent : c'est le meilleur retour qu'on puisse avoir.",
      schema: auditoirePlusJeune,
      micros: ["cm2_voix_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour lire une consigne à la classe",
      detail:
        "Articule les fins, ralentis, marque les points. Une consigne mal lue se redemande trois fois — et c'est du temps perdu pour tout le monde.",
      schema: articulerPourLeFond,
      micros: ["cm2_voix_articulation"],
    },
    {
      titre: "Pour lire un dialogue",
      detail:
        "Une voix par personnage, décidée avant. Et le verbe de parole te dit laquelle : « cria », « murmura », « répondit ».",
      schema: tonSelonLaScene,
      micros: ["cm2_flue_mise_en_voix"],
    },
    {
      titre: "Pour donner envie de lire un livre",
      detail:
        "Lis-en un passage que TU aimes. Cela s'entend, et cela fait plus qu'un résumé — c'est même la seule chose qui donne envie.",
      schema: choisirCeQuOnAime,
      micros: ["cm2_flue_plaisir_lire"],
    },
    {
      titre: "Pour lire à des enfants plus jeunes",
      detail:
        "Plus lentement, avec plus de silences, et en les regardant. Leur attention est courte, et elle se voit — ce qui la rend facile à suivre.",
      schema: auditoirePlusJeune,
      micros: ["cm2_voix_defi"],
    },
  ],
  exemples: [
    {
      titre: "Se faire entendre",
      donnees: "Tu lis devant la classe, et ceux du fond te font répéter.",
      schema: articulerPourLeFond,
      question: "Qu'est-ce qui manque ?",
      solution:
        "L'ARTICULATION, pas le volume. On croit qu'il faut parler plus fort, et c'est presque toujours faux : ce sont les fins de mots qui manquent. Dis-les entières — la lecture parait à peine plus lente, et elle porte jusqu'au dernier rang.",
      micros: ["cm2_voix_articulation"],
    },
    {
      titre: "Le rythme",
      donnees: "Tu as fini ta lecture bien avant les autres, et personne n'a rien retenu.",
      schema: trouverSonRythme,
      question: "Que s'est-il passé ?",
      solution:
        "TU AS LU À TON RYTHME, PAS AU LEUR. Lire vite ne fait gagner du temps à personne : ceux qui écoutent décrochent, et il faut redire. Le bon rythme est celui auquel l'autre peut suivre, et il est presque toujours plus lent qu'on ne croit.",
      micros: ["cm2_voix_articulation"],
    },
    {
      titre: "Mettre en voix",
      donnees: "« — Au secours ! Le feu ! » cria le pompier.",
      schema: tonSelonLaScene,
      question: "Comment lis-tu cette phrase ?",
      solution:
        "AVEC UNE VOIX FORTE ET PRESSÉE. Ni douce et lente, ni chuchotée, ni sans expression : les points d'exclamation et le verbe « cria » demandent le volume et la vitesse. Le texte t'indique la voix — tu n'as pas à l'inventer, seulement à l'écouter.",
      micros: ["cm2_flue_mise_en_voix"],
    },
    {
      titre: "Donner envie d'écouter",
      donnees: "« Pour lire une histoire à des plus jeunes et leur donner envie d'écouter… »",
      schema: plaisirCommeMoyen,
      question: "Que fais-tu ?",
      solution:
        "TU METS LE TON ET TU RESPECTES LES PAUSES. Pas lire très vite pour finir vite, pas lire tout bas, et surtout pas sauter les passages difficiles — ils ne voient pas le texte, mais ils perdent le fil. Le ton et les pauses rendent l'histoire vivante.",
      micros: ["cm2_flue_plaisir_lire"],
    },
    {
      titre: "Le plaisir comme moyen",
      donnees: "On te laisse choisir le passage que tu liras à la classe.",
      schema: choisirCeQuOnAime,
      question: "Comment choisis-tu ?",
      solution:
        "TU PRENDS CELUI QUE TU AIMES. Cela s'entend, et cela ne se joue pas : un passage choisi se lit autrement, sans que tu fasses rien de particulier. C'est pour cela que le programme parle de plaisir — non comme d'une récompense, mais comme d'un moyen.",
      micros: ["cm2_flue_plaisir_lire"],
    },
    {
      titre: "Le défi",
      donnees: "Tu lis une histoire à des enfants de CP.",
      schema: auditoirePlusJeune,
      question: "Qu'est-ce qui change par rapport à ta classe ?",
      solution:
        "LE RYTHME, ET IL SE RÈGLE SUR EUX. Ils suivent moins vite, comprennent moins vite, décrochent plus vite — et ils le MONTRENT, ce qui en fait le meilleur entrainement possible. Ralentis, ajoute des silences, et regarde-les entre deux phrases.",
      micros: ["cm2_voix_defi"],
    },
  ],
  pieges: [
    "Croire qu'une lecture réussie est une lecture sans erreur : le juge est celui qui écoute.",
    "Parler plus fort au lieu d'articuler : ce sont les fins de mots qui manquent.",
    "Lire à son propre rythme : le bon rythme est celui auquel l'autre peut suivre.",
    "Lire d'un seul ton : « monotone » veut dire exactement cela, et c'est ce qui fait décrocher.",
    "Sauter un passage difficile : il ne voit pas le texte, mais il perd le fil.",
    "Croire que le plaisir est un supplément : le programme le demande, et il s'entend.",
  ],
  aRetenir: [
    "On lit à voix haute POUR quelqu'un — et c'est lui qui juge.",
    "Ce qui n'arrive pas au fond n'a pas été lu : articule les fins de mots.",
    "Le texte indique la voix : l'exclamation, le verbe de parole, l'urgence.",
    "Monotone veut dire « un seul ton ». Fais varier, deux ou trois fois.",
    "Le programme demande du plaisir, et c'est un moyen, pas une récompense.",
  ],
  entrainement: [
    {
      question: "Ceux du fond te font répéter. Faut-il parler plus fort ?",
      correction: "D'abord articuler : ce sont les fins de mots qui manquent.",
      micros: ["cm2_voix_articulation"],
    },
    {
      question: "« Elle murmura quelque chose à son oreille. » Quelle voix ?",
      correction: "Très basse : le verbe « murmura » commande le volume.",
      micros: ["cm2_flue_mise_en_voix"],
    },
    {
      question: "À quoi sert une pause juste avant une surprise ?",
      correction: "À la faire attendre : un silence vaut mieux que dix mots pour l'annoncer.",
      micros: ["cm2_flue_mise_en_voix"],
    },
    {
      question: "« Pour lire une histoire à des plus jeunes, le mieux est de… »",
      correction: "Mettre le ton et respecter les pauses.",
      micros: ["cm2_flue_plaisir_lire"],
    },
    {
      question: "Tu sautes un mot que tu n'arrives pas à lire. Est-ce que ça se voit ?",
      correction: "Ça ne se voit pas, mais ça s'entend : celui qui écoute perd le fil.",
      micros: ["cm2_flue_plaisir_lire"],
    },
    {
      question: "Comment sais-tu, pendant que tu lis, si ça marche ?",
      correction: "En levant les yeux : s'ils te suivent encore, ça marche.",
      micros: ["cm2_voix_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesLectureVoixHauteCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire à voix haute - CM2",
    section: {
      type: "objectif",
      phrase: "C'est celui qui écoute qui juge",
      sousPhrase:
        "On ne lit pas à voix haute pour prouver qu'on sait lire : on lit POUR quelqu'un.",
      encadre: {
        titre: "L'idée",
        texte: "Une lecture sans erreur devant une classe qui n'écoute plus est ratée.",
      },
    },
  },
  {
    titre: "Chaque règle a sa raison, et elle est de son côté",
    badge: "Lire à voix haute - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le ton", texte: "Sans lui, il décroche." },
        { titre: "Les pauses", texte: "Elles lui laissent le temps de comprendre." },
        { titre: "Le rythme", texte: "Le bon est celui auquel il peut suivre." },
        { titre: "Rien sauter", texte: "Il ne voit pas le texte, mais il perd le fil." },
      ],
    },
    schema: grilleCeQuIlFait,
  },
  {
    titre: "Articuler, pas crier",
    badge: "Lire à voix haute - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce qu'on croit",
        contenu: "Qu'il faut parler plus fort quand ceux du fond font répéter.",
      },
      droite: {
        titre: "Ce qui manque",
        contenu: "Les fins de mots — ce sont elles qui tombent quand on accélère.",
      },
    },
    schema: articulerPourLeFond,
  },
  {
    titre: "Faire varier",
    badge: "Lire à voix haute - CM2",
    section: {
      type: "etapes",
      etapes: [
        "MONOTONE veut dire « un seul ton » — c'est le sens exact.",
        "Une lecture peut être forte, nette, sans erreur, et monotone.",
        "Décide deux ou trois endroits AVANT : plus fort, plus bas, un silence.",
        "Et un silence avant la surprise vaut mieux que dix mots pour l'annoncer.",
      ],
    },
    schema: varierOuEndormir,
  },
  {
    titre: "Le plaisir est dans le programme",
    badge: "Lire à voix haute - CM2",
    section: {
      type: "etapes",
      etapes: [
        "« Faire vivre un texte et PRENDRE PLAISIR à le lire » : c'est écrit.",
        "Ce n'est pas une récompense : c'est un moyen.",
        "Une lecture que tu n'aimes pas donner ne donne envie à personne.",
        "Et un passage que tu as choisi s'entend, sans que tu fasses rien.",
      ],
    },
    schema: plaisirCommeMoyen,
  },
  {
    titre: "À vous",
    badge: "Lire à voix haute - CM2",
    section: {
      type: "exercice",
      enonce: "Tu as fini ta lecture bien avant les autres, et personne n'a rien retenu.",
      question: "Que s'est-il passé ?",
      indice: "Demande-toi sur quel rythme tu as réglé le tien.",
      correction:
        "TU AS LU À TON RYTHME, PAS AU LEUR. Lire vite ne fait gagner du temps à personne : ceux qui écoutent décrochent, et il faut tout redire.",
    },
    schema: trouverSonRythme,
  },
];
