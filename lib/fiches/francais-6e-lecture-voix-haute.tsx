// ─── Fiche de cours : lire à voix haute et mettre en voix (6e) ────────────────
// PREMIÈRE FICHE DU DOMAINE DE LA LECTURE EN 6e, qui n'avait que la fluence.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. ⛔ LA 6e FERME LE CYCLE 3, avec le CM1 et le CM2 — elle ne suit
// PAS le programme du cycle 4. Compétence « Lire à voix haute » (BO6EFRL).
//
// ⛔⛔ ET LE PIÈGE DE CLASSE EST MAXIMAL ICI : `lecture_voix_haute` EXISTE AUSSI
// EN 5e, SOUS LE MÊME NOM, avec un contenu entièrement différent. Copier la
// fiche de 5e produirait un hors-programme parfaitement crédible.
//
//   | | 5e (cycle 4) | 6e (cycle 3) |
//   |—|—|—|
//   | longueur | « une vingtaine de lignes » | « un texte de 10 à 20 lignes » |
//   | le cœur | la PARTITION : groupes de souffle, mots à détacher | l'INDICE : ce qui, dans le texte, commande le ton |
//   | le geste neuf | DIAGNOSTIQUER une lecture entendue | REGARDER L'AUDITOIRE |
//   | le défi | — | dire un texte devant la classe, et gérer un oubli |
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE, ET ELLE EST PROPRE AU CYCLE 3 : LE TON N'EST
// PAS AU CHOIX DU LECTEUR, IL EST ÉCRIT DANS LE TEXTE. Un élève de 6e croit
// qu'« y mettre le ton » veut dire inventer quelque chose. Non : le ton se
// RELÈVE, exactement comme on relève l'indice qui répond à une question. Il est
// à trois endroits, toujours les mêmes — le verbe de parole (« cria »,
// « murmura »), la ponctuation finale (« ! », « ? », « … »), et les mots du
// récit autour (« doucement », « sans un mot »). C'est le même geste que
// `6e_comp_indices`, appliqué à la voix, et cela réunit les cinq micros.
//
// ⭐ DEUX ARCS QUI CONVERGENT SUR LA MÊME RÉPLIQUE : le verbe donne le TON, le
// point d'exclamation donne le VOLUME. Deux indices, deux flèches, une seule
// phrase à dire — et l'élève voit qu'il n'a rien inventé.
//
// ⭐ ET LE TIRET N'EST PAS UN SIGNE À LIRE : C'EST UNE INSTRUCTION DE VOIX. Le
// dessin le montre en le faisant pointer vers « une autre voix ». Un élève qui a
// vu cela ne lit plus un dialogue d'un seul timbre.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette de cette fiche n'est une FONCTION
// grammaticale — toutes doivent rester grises. « le ton », « le volume »,
// « une autre voix » ne tombent dans aucun test de `couleurFonction`.
//
// Alignée sur le pool MISE_EN_VOIX de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les six items `6e_fr_fixed_voix_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `lecture_voix_haute`) :
// - 6e_voix_preparer   → propriétés 1 et 2, méthode 1, usage 1, exemple 1
// - 6e_voix_expressive → figure, propriétés 3 et 4, formule, méthode 2, usage 2,
//                        exemples 2 et 3
// - 6e_voix_emotions   → propriété 5, méthode 3, exemple 4
// - 6e_voix_dialogue   → propriété 6, usage 3, exemple 5
// - 6e_voix_defi       → propriétés 7 et 8, méthode 4, usage 4, exemple 6

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

/** Ce qu'on fait avant de lire, et ce que cela évite. ⚠️ Cellules courtes : à la
 *  largeur d'un bloc, vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand le texte dicte la voix ───────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : deux indices convergent sur la même réplique.
const deuxIndices = phrase({
  mots: [
    { texte: "cria", focus: true },
    { texte: "« Attends-moi »" },
    { texte: "!", focus: true },
  ],
  liens: [
    { de: 0, vers: 1, label: "le ton", type: "question" },
    { de: 2, vers: 1, label: "le volume", type: "question" },
  ],
  legende: "Tu n'inventes rien : le verbe et le point te disent comment dire.",
});

const tonRetenu = phrase({
  mots: [
    { texte: "sans un mot", focus: true },
    { texte: "doucement", focus: true },
  ],
  legende: "Deux mots du récit, et la voix doit être retenue, presque basse.",
});

const monotone = phrase({
  mots: [
    { texte: "un seul ton", barre: true },
    { texte: "faire varier", focus: true },
  ],
  legende: "« Monotone » veut dire « un seul ton » : c'est ce qu'on cherche à éviter.",
});

// ⭐ LE TIRET EST UNE INSTRUCTION, PAS UN SIGNE À LIRE.
const tiretChangeDeVoix = phrase({
  mots: [
    { texte: "—", focus: true },
    { texte: "une autre voix", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "annonce", type: "question" }],
  legende: "Le tiret ne se prononce pas : il dit que quelqu'un d'autre parle.",
});

// ── PRÉPARER : ce qu'on fait avant, et ce que cela évite.
const grillePreparer = grille({
  headers: ["Avant de lire", "Ce que ça évite"],
  rows: [
    { values: ["lire en silence", "buter en public"] },
    { values: ["marquer les pauses", "lire d'un trait"] },
    { values: ["repérer qui parle", "un seul timbre"] },
    { values: ["essayer tout bas", "découvrir devant tous"] },
  ],
  caption: "Le programme demande une lecture travaillée en amont.",
});

const grillePreparerSilence = grille({
  headers: ["Avant de lire", "Ce que ça évite"],
  rows: [
    { values: ["lire en silence", "buter en public"] },
    { values: ["marquer les pauses", "lire d'un trait"] },
    { values: ["repérer qui parle", "un seul timbre"] },
    { values: ["essayer tout bas", "découvrir devant tous"] },
  ],
  highlight: { row: 0 },
  caption: "Une lecture silencieuse d'abord : c'est là qu'on voit les pièges.",
});

// ⭐ LE REGARD FAIT PARTIE DE LA LECTURE — le BO l'écrit.
const regarderLauditoire = phrase({
  mots: [
    { texte: "la feuille" },
    { texte: "l'auditoire", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "lever les yeux", type: "question" }],
  legende: "Le programme dit « en regardant l'auditoire » : le regard en fait partie.",
});

// ── LE DÉFI : dire devant la classe, et réparer un accident.
const oubliEtPause = phrase({
  mots: [
    { texte: "un oubli" },
    { texte: "une courte pause", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "se répare par", type: "question" }],
  legende: "Une courte pause passe inaperçue. Accélérer pour cacher, jamais.",
});

const rythmeDesVers = phrase({
  mots: [
    { texte: "un poème" },
    { texte: "le rythme des vers", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "impose", type: "question" }],
  legende: "On respecte la coupe des vers et l'on articule : le reste suit.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureVoixHaute6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "lecture-voix-haute",
  titre: "Lire à voix haute et mettre en voix en 6e (2026-2027)",
  accroche:
    "« Mettre le ton », ce n'est pas inventer quelque chose : c'est LIRE UN INDICE. Le ton est écrit dans le texte, toujours aux trois mêmes endroits — le verbe de parole, la ponctuation de fin, et les mots du récit autour. « cria » plus « ! » commandent une voix forte. « sans un mot » et « doucement » commandent une voix retenue. Tu ne choisis pas : tu relèves.",
  identite: [
    { label: "Mots clés", valeur: "Préparer, ton, volume, dialogue, auditoire" },
    { label: "Le secret", valeur: "Le ton est écrit dans le texte" },
    { label: "Outil", valeur: "Quel mot me dit comment le dire ?" },
  ],
  definition: {
    texte:
      "Lire à voix haute en 6e, c'est lire un texte de DIX À VINGT LIGNES devant un auditoire, en le regardant. Cela se prépare : on lit d'abord le texte EN SILENCE pour repérer les mots difficiles, on marque les endroits où l'on respire, on repère qui parle. Puis on MET EN VOIX, et le ton n'est pas laissé au hasard : il est indiqué par le VERBE DE PAROLE (« cria », « murmura », « souffla »), par la PONCTUATION de fin (le point d'exclamation demande du volume, le point d'interrogation fait monter la voix, les points de suspension la laissent en suspens) et par les MOTS DU RÉCIT autour de la réplique (« doucement », « sans un mot »). Une lecture MONOTONE — le mot veut dire « un seul ton » — est celle qui ignore tous ces indices. Dans un DIALOGUE, chaque tiret annonce un nouveau personnage : on change de voix. Et si l'on oublie un passage en récitant, on fait une COURTE PAUSE et l'on reprend : elle passe inaperçue, l'accélération non.",
  },
  figure: {
    schema: pile(deuxIndices, tonRetenu),
    legende:
      "Deux flèches tombent sur la même réplique, et aucune ne vient de toi. « cria » dit le TON — un appel. Le point d'exclamation dit le VOLUME — plus fort. Tu n'as rien à inventer : tu relèves deux indices et tu obéis. En bas, le même geste sur un texte sans dialogue : « sans un mot » et « doucement » sont deux indications de voix cachées dans le récit, et elles commandent une lecture retenue, presque basse.",
  },
  proprietes: [
    {
      titre: "On lit d'abord en silence",
      texte:
        "Une lecture à voix haute se prépare. Le premier passage se fait sans un son : c'est là qu'on repère les mots sur lesquels on va buter.",
      schema: grillePreparerSilence,
      micros: ["6e_voix_preparer"],
    },
    {
      titre: "Le regard fait partie de la lecture",
      texte:
        "Le programme demande de lire « en regardant l'auditoire ». Lever les yeux de temps en temps n'est pas un supplément : c'est la consigne.",
      schema: regarderLauditoire,
      micros: ["6e_voix_preparer"],
    },
    {
      titre: "Le verbe de parole donne le ton",
      texte:
        "« cria » demande un appel, « murmura » un souffle, « répondit » une voix ordinaire. Le mot est là, avant ou après la réplique.",
      schema: deuxIndices,
      micros: ["6e_voix_expressive"],
    },
    {
      titre: "La ponctuation donne le volume et la hauteur",
      texte:
        "Le point d'exclamation monte, le point d'interrogation aussi, les points de suspension laissent en l'air, le point pose. Cela s'entend.",
      schema: deuxIndices,
      micros: ["6e_voix_expressive"],
    },
    {
      titre: "Les mots du récit disent l'émotion",
      texte:
        "« Il rangea ses affaires sans un mot et referma doucement la porte. » Aucun personnage ne parle, et le ton est pourtant écrit.",
      schema: tonRetenu,
      micros: ["6e_voix_emotions"],
    },
    {
      titre: "Chaque tiret change de voix",
      texte:
        "Le tiret ne se prononce pas : il annonce que quelqu'un d'autre parle. Lire un dialogue d'un seul timbre le rend incompréhensible.",
      schema: tiretChangeDeVoix,
      micros: ["6e_voix_dialogue"],
    },
    {
      titre: "Une lecture monotone n'a qu'un seul ton",
      texte:
        "C'est le sens exact du mot. Ce n'est pas lire trop bas ni trop vite : c'est ne rien faire varier, du premier mot au dernier.",
      schema: monotone,
      micros: ["6e_voix_defi"],
    },
    {
      titre: "Un oubli se répare par une pause",
      texte:
        "Courte, calme, et l'on reprend. Elle passe inaperçue. Accélérer pour cacher l'oubli s'entend immédiatement, et fait perdre le fil.",
      schema: oubliEtPause,
      micros: ["6e_voix_defi"],
    },
  ],
  reel: {
    texte:
      "Tu fais déjà cela sans y penser. Quand tu lis un message à voix haute à quelqu'un et que tu dis « attends, il l'a écrit en majuscules », tu viens de relever un indice de ton — les majuscules, dans un message, sont le point d'exclamation d'aujourd'hui. Quand tu racontes une dispute en changeant de voix pour chaque personne, tu fais exactement ce que demande le tiret de dialogue, et personne ne t'a appris à le faire. Et quand tu écoutes quelqu'un lire une consigne sans aucune variation et que tu décroches au bout de dix secondes, tu viens d'éprouver ce qu'est une lecture monotone. Le cours ne t'apprend pas à mettre le ton : il t'apprend où le ton est écrit, pour que tu n'aies plus à deviner.",
  },
  historique: {
    texte:
      "Pendant très longtemps, lire a voulu dire lire à voix haute — et il y avait à cela une raison matérielle. Les textes anciens s'écrivaient sans espaces entre les mots, sans majuscules et sans ponctuation : une file de lettres continue, du début à la fin de la ligne. Pour savoir où un mot s'arrêtait, il fallait souvent prononcer, entendre, et laisser l'oreille trancher ce que l'œil ne montrait pas. Les espaces entre les mots se sont généralisés en Occident autour du VIIIe siècle, et la ponctuation bien plus tard encore. Autrement dit, les virgules, les points et les tirets que tu lis aujourd'hui sont d'anciennes indications de VOIX, inventées pour que l'on sache où respirer. Les ignorer en lisant, c'est ne pas se servir de ce qui a été mis là exprès.",
  },
  formule: {
    contexte: "La question à se poser avant de dire une réplique à voix haute.",
    expression: "quel mot me dit comment le dire ?",
    legende:
      "Il y en a presque toujours un, et il est à l'un des trois endroits : le verbe de parole, la ponctuation de fin, ou un mot du récit autour. Si tu n'en trouves aucun, alors la réplique se dit d'une voix ordinaire — et c'est une réponse, pas un échec.",
    schema: deuxIndices,
  },
  methode: [
    {
      titre: "Lire en silence, crayon à la main",
      texte:
        "Souligne les mots difficiles, marque d'un trait les endroits où tu respires, entoure les verbes de parole. Trois passages, trois marques.",
      schema: grillePreparer,
      micros: ["6e_voix_preparer"],
    },
    {
      titre: "Relever les indices de ton",
      texte:
        "Pour chaque réplique : le verbe de parole, la ponctuation de fin. Deux indices, et la voix est décidée avant d'ouvrir la bouche.",
      schema: deuxIndices,
      micros: ["6e_voix_expressive"],
    },
    {
      titre: "Chercher le ton même sans dialogue",
      texte:
        "Un récit sans parole a aussi son ton : « doucement », « sans un mot », « d'un bond ». Ces mots-là commandent la voix.",
      schema: tonRetenu,
      micros: ["6e_voix_emotions"],
    },
    {
      titre: "Préparer l'accident avant qu'il arrive",
      texte:
        "Décide maintenant ce que tu feras si tu oublies : une courte pause, et tu reprends. Décidé d'avance, cela ne panique plus.",
      schema: oubliEtPause,
      micros: ["6e_voix_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour lire devant la classe sans trembler",
      detail:
        "Ce qui rassure n'est pas le courage, c'est la préparation : un texte lu trois fois en silence ne réserve plus de surprise.",
      schema: grillePreparerSilence,
      micros: ["6e_voix_preparer"],
    },
    {
      titre: "Pour qu'on t'écoute jusqu'au bout",
      detail:
        "Fais varier. Une seule chose qui change — le volume, la vitesse, une pause — suffit à rattraper l'attention de ceux qui décrochent.",
      schema: monotone,
      micros: ["6e_voix_expressive"],
    },
    {
      titre: "Pour lire un dialogue qu'on suit",
      detail:
        "Une voix par personnage, décidée avant de commencer. Sans cela, l'auditeur perd qui parle dès la troisième réplique.",
      schema: tiretChangeDeVoix,
      micros: ["6e_voix_dialogue"],
    },
    {
      titre: "Pour réciter un poème",
      detail:
        "Respecte la coupe des vers et articule. Un poème récité comme de la prose perd ce qui en fait un poème.",
      schema: rythmeDesVers,
      micros: ["6e_voix_defi"],
    },
  ],
  exemples: [
    {
      titre: "Avant de lire",
      donnees: "« Tu dois lire un texte long à voix haute devant la classe. »",
      schema: grillePreparerSilence,
      question: "Quelle est la meilleure préparation ?",
      solution:
        "LE LIRE UNE PREMIÈRE FOIS EN SILENCE, pour repérer les mots difficiles. Lire vite une fois ne prépare rien, et apprendre le début par cœur ne sert qu'aux premières secondes. C'est la lecture silencieuse qui montre où tu vas buter — donc où t'entrainer.",
      micros: ["6e_voix_preparer"],
    },
    {
      titre: "Une réplique",
      donnees: "« — Attends-moi ! » cria Léa.",
      schema: deuxIndices,
      question: "Comment mettre le ton ?",
      solution:
        "EN MONTANT LA VOIX, PLUS FORT, COMME UN APPEL. Deux indices le disent, et ils vont dans le même sens : le verbe « cria » et le point d'exclamation. Tu n'as pas choisi ce ton — tu l'as lu. C'est toute la différence avec « inventer une voix ».",
      micros: ["6e_voix_expressive"],
    },
    {
      titre: "Une lecture qu'on n'écoute pas",
      donnees: "« Une lecture monotone, c'est une lecture… »",
      schema: monotone,
      question: "Comment la définir ?",
      solution:
        "SANS VARIATION DE TON NI DE RYTHME. Ce n'est ni « trop faible », ni « trop rapide », ni « hésitante » : le mot dit exactement « un seul ton ». Une lecture peut être forte, nette et parfaitement monotone — et c'est justement celle qu'on n'écoute pas.",
      micros: ["6e_voix_expressive"],
    },
    {
      titre: "Un récit sans dialogue",
      donnees: "« Il rangea ses affaires sans un mot et referma doucement la porte. »",
      schema: tonRetenu,
      question: "Quel ton convient ?",
      solution:
        "TRISTE ET RETENU. Personne ne parle, et pourtant le ton est écrit : « sans un mot » et « doucement » sont deux indications de voix. Une lecture enjouée de cette phrase la contredirait — ce serait une faute de lecture, pas un choix d'interprétation.",
      micros: ["6e_voix_emotions"],
    },
    {
      titre: "Un dialogue",
      donnees: "« Dans un dialogue de récit, comment fait-on entendre qu'un autre personnage parle ? »",
      schema: tiretChangeDeVoix,
      question: "Que fais-tu ?",
      solution:
        "ON CHANGE DE VOIX À CHAQUE TIRET. Le tiret est une instruction, pas un signe à prononcer : il annonce un nouveau locuteur. Lire tout de la même façon oblige l'auditeur à compter les répliques dans sa tête pour savoir qui parle.",
      micros: ["6e_voix_dialogue"],
    },
    {
      titre: "Un oubli",
      donnees: "« Tu oublies un passage en récitant un texte de mémoire. »",
      schema: oubliEtPause,
      question: "Que fais-tu ?",
      solution:
        "TU RESTES CALME, TU FAIS UNE COURTE PAUSE ET TU REPRENDS. Une pause d'une seconde ressemble à une respiration, et personne ne la remarque. Accélérer pour cacher le trou s'entend aussitôt — et fait souvent perdre la suite pour de bon.",
      micros: ["6e_voix_defi"],
    },
  ],
  pieges: [
    "Croire que « mettre le ton » veut dire inventer : le ton est écrit dans le texte.",
    "Ne préparer sa lecture qu'à voix haute : c'est la lecture silencieuse qui montre les pièges.",
    "Garder les yeux sur la feuille : le programme demande de regarder l'auditoire.",
    "Ignorer le verbe de parole : « cria » et « murmura » ne se lisent pas de la même voix.",
    "Lire un dialogue d'un seul timbre : le tiret annonce un changement de personnage.",
    "Accélérer pour cacher un oubli : cela s'entend, alors qu'une courte pause non.",
  ],
  aRetenir: [
    "Dix à vingt lignes, devant un auditoire — et en le regardant.",
    "Le ton est écrit : le verbe de parole, la ponctuation, les mots du récit.",
    "Monotone veut dire « un seul ton », et c'est ce qu'on évite.",
    "Chaque tiret de dialogue annonce une autre voix.",
    "Un oubli se répare par une courte pause, jamais par de la vitesse.",
  ],
  entrainement: [
    {
      question: "« Le programme de 6e demande de lire à voix haute… » comment ?",
      correction: "En regardant l'auditoire.",
      micros: ["6e_voix_preparer"],
    },
    {
      question: "À quoi sert une PAUSE dans une lecture à voix haute ?",
      correction: "À marquer la ponctuation et à laisser comprendre.",
      micros: ["6e_voix_expressive"],
    },
    {
      question: "« — Tu es sûr ? » demanda-t-il. Quel indice donne le ton ?",
      correction: "Le point d'interrogation : la voix monte à la fin.",
      micros: ["6e_voix_expressive"],
    },
    {
      question: "« Elle souffla son secret à l'oreille de son frère. » Quel ton ?",
      correction: "Très bas, presque chuchoté : le verbe « souffla » le commande.",
      micros: ["6e_voix_emotions"],
    },
    {
      question: "Trois tirets se suivent dans un passage. Que dois-tu décider avant de lire ?",
      correction: "Quelle voix pour chaque personnage, et t'y tenir jusqu'au bout.",
      micros: ["6e_voix_dialogue"],
    },
    {
      question: "Pour réciter un poème, il vaut mieux…",
      correction: "Respecter le rythme des vers et articuler.",
      micros: ["6e_voix_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesLectureVoixHaute6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire à voix haute - 6e",
    section: {
      type: "objectif",
      phrase: "Le ton est écrit dans le texte",
      sousPhrase:
        "« Mettre le ton » n'est pas inventer : c'est relever un indice, comme on relève une réponse.",
      encadre: {
        titre: "L'idée",
        texte: "« cria » plus « ! » : deux indices, et la voix est décidée.",
      },
    },
  },
  {
    titre: "Où le ton est écrit",
    badge: "Lire à voix haute - 6e",
    section: {
      type: "etapes",
      etapes: [
        "LE VERBE DE PAROLE : cria, murmura, souffla, répondit.",
        "LA PONCTUATION DE FIN : « ! » monte, « ? » monte, « … » reste en l'air.",
        "LES MOTS DU RÉCIT : doucement, sans un mot, d'un bond.",
        "Et s'il n'y a aucun indice, la voix est ordinaire. C'est une réponse.",
      ],
    },
    schema: deuxIndices,
  },
  {
    titre: "Préparer, c'est lire en silence",
    badge: "Lire à voix haute - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "En silence", texte: "Repère les mots sur lesquels tu vas buter." },
        { titre: "Les pauses", texte: "Marque d'un trait les endroits où tu respires." },
        { titre: "Qui parle", texte: "Décide une voix par personnage, avant de lire." },
        { titre: "Les yeux", texte: "Lève-les vers l'auditoire : le programme le demande." },
      ],
    },
    schema: grillePreparer,
  },
  {
    titre: "Le tiret est une instruction",
    badge: "Lire à voix haute - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce qu'il n'est pas",
        contenu: "Un signe à prononcer, ni un trait qu'on saute en lisant.",
      },
      droite: {
        titre: "Ce qu'il est",
        contenu: "L'annonce d'un nouveau personnage : on change de voix.",
      },
    },
    schema: tiretChangeDeVoix,
  },
  {
    titre: "Le défi : dire devant la classe",
    badge: "Lire à voix haute - 6e",
    section: {
      type: "etapes",
      etapes: [
        "MONOTONE veut dire « un seul ton » — c'est ce qu'on évite.",
        "Une seule chose qui varie suffit à rattraper l'attention.",
        "Un OUBLI se répare par une courte pause, et l'on reprend.",
        "Accélérer pour le cacher s'entend toujours.",
      ],
    },
    schema: oubliEtPause,
  },
  {
    titre: "À vous",
    badge: "Lire à voix haute - 6e",
    section: {
      type: "exercice",
      enonce: "« — Ce n'est pas grave… » murmura-t-il en détournant les yeux.",
      question: "Quels indices donnent le ton, et quelle voix ?",
      indice: "Cherche le verbe de parole, la ponctuation, et les mots autour.",
      correction:
        "TROIS INDICES, tous dans le même sens : « murmura » (très bas), les points de suspension (la phrase reste en l'air), « en détournant les yeux » (il n'y croit pas lui-même). Voix basse, lente, qui ne finit pas.",
    },
    schema: tonRetenu,
  },
];
