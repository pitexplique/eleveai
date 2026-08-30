// ─── Fiche de cours : employer les mots (CM2) ─────────────────────────────────
// SEIZIÈME FICHE DU CHANTIER CM2, et TROISIÈME DU VOCABULAIRE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année » : « UTILISER DES
// DICTIONNAIRES » · l'emploi du vocabulaire étudié dans les écrits · la
// mémorisation de l'orthographe lexicale.
//
// ⭐⭐ LA TROISIÈME NOTION DU VOCABULAIRE FERME UNE PROGRESSION QUE LE BO A
// CONSTRUITE, ET IL FAUT LA DIRE AUX ÉLÈVES :
//   1. `vocabulaire_sens`      → COMPRENDRE en regardant AUTOUR du mot ;
//   2. `vocabulaire_formation` → COMPRENDRE en regardant DEDANS ;
//   3. ici                     → S'EN SERVIR.
// Et le dictionnaire arrive en TROISIÈME RESSORT, pas en premier : le commentaire
// du 22/08 dans `microSkills.ts` le dit en cinq mots — « chercher un mot n'est
// pas le deviner ».
//
// ⭐⭐ LA DÉCOUVERTE : UN MOT N'EST À TOI QUE QUAND TU PEUX L'ÉCRIRE DANS UNE
// PHRASE À TOI. Comprendre en lisant est PASSIF, et tout le monde comprend
// beaucoup plus de mots qu'il n'en emploie — c'est précisément cet écart que la
// notion travaille. Les trois autres micros sont d'ailleurs toutes des preuves
// ACTIVES, et toutes se voient dans ce qu'on ÉCRIT : le réemploi, le niveau de
// langue, l'orthographe.
//
// ⭐⭐ ET LE POOL VOC_REEMPLOI DIT UNE CHOSE QU'ON N'ATTENDAIT PAS ICI : CE QUI
// DÉCIDE N'EST PAS SEULEMENT LE SENS, C'EST LA CLASSE GRAMMATICALE. « L'adjectif
// accompagne un nom », « l'adverbe accompagne un verbe » — les méthodes du pool
// sont grammaticales. On peut donc connaitre parfaitement le sens de
// « prudemment » et écrire « une fille prudemment » : la faute existe, et elle
// n'est pas une faute de sens. EMPLOYER UN MOT, C'EST AUSSI LE METTRE À LA BONNE
// PLACE — ce qui prépare directement `grammaire_nature_fonction`.
//
// ⛔ COMPARAISON AVEC LA 6e, QUI A UNE NOTION DU MÊME NOM (vérifié micro par
// micro) :
//
//   | 6e `vocabulaire_emploi` | CM2 (ici) |
//   |---|---|
//   | réemployer « À BON ESCIENT » un mot qu'on vient d'apprendre | réemployer le vocabulaire ÉTUDIÉ DANS UN ÉCRIT |
//   | CHOISIR le registre qui convient à la situation | IDENTIFIER le niveau de langue |
//   | employer un mot POLYSÉMIQUE dans le bon contexte | *(la polysémie est en `vocabulaire_sens` au CM2)* |
//   | écrire les mots fréquents, SEUL | mémoriser ET VÉRIFIER l'orthographe |
//   | — | ⭐ LE DICTIONNAIRE |
//
// ⭐ La 6e CHOISIT le registre, le CM2 l'IDENTIFIE : reconnaitre d'abord,
// choisir ensuite — la même progression que pour la polysémie.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises — y compris les libellés « un nom » et « un verbe » de
// `adjectifAvecUnNom`, qui nomment des CLASSES et non des fonctions.
//
// Alignée sur les pools NIVEAU_LANGUE, VOC_REEMPLOI, VOC_ORTH et DICTIONNAIRE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `vocabulaire_emploi`) :
// - cm2_voc_niveau_langue → propriétés 1 à 3, méthode 1, usage 1, exemples 1 et 2
// - cm2_voc_reemploi      → figure, propriétés 4 et 5, formule, méthode 2,
//                           usage 2, exemple 3
// - cm2_voc_orthographe   → propriétés 6 et 7, méthode 3, usage 3, exemple 4
// - cm2_voc_dictionnaire  → propriétés 8 et 9, méthode 4, usage 4, exemple 5
// - cm2_voc_emploi_defi   → propriété 10, exemple 6

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

/** Les trois niveaux de langue. ⚠️ Cellules courtes : à la largeur d'un bloc,
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

// ─── Ce qui se dessine quand on se sert d'un mot ──────────────────────────────

// ── ⭐⭐ LA FIGURE DE RÉFÉRENCE : l'écart entre comprendre et employer.
const comprendreOuEmployer = phrase({
  mots: [
    { texte: "tu le comprends" },
    { texte: "tu l'emploies", focus: true },
  ],
  legende: "Un mot n'est à toi que quand tu peux l'écrire dans une phrase à toi.",
});

const grilleTroisNiveaux = grille({
  headers: ["Niveau", "Exemple"],
  rows: [
    { values: ["familier", "bouquin"] },
    { values: ["courant", "livre"] },
    { values: ["soutenu", "ouvrage"] },
  ],
  caption: "Trois mots pour une même chose — et trois situations différentes.",
});

// ── LE NIVEAU DE LANGUE.
const memeChoseTroisMots = phrase({
  mots: [
    { texte: "fringues" },
    { texte: "vêtements", focus: true },
  ],
  legende: "Le mot familier a presque toujours un équivalent courant.",
});

const auMaire = phrase({
  mots: [
    { texte: "« je suis crevé »", barre: true },
    { texte: "« je vous prie »", focus: true },
  ],
  legende: "Une lettre au maire n'appelle pas les mots d'une cour de récréation.",
});

// ── LE RÉEMPLOI. ⭐⭐ Et la classe grammaticale décide.
const adjectifAvecUnNom = phrase({
  mots: [
    { texte: "timide" },
    { texte: "un nom", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "accompagne", type: "question" }],
  legende: "« Le petit garçon timide » : un adjectif se pose à côté d'un nom.",
});

const adverbeAvecUnVerbe = phrase({
  mots: [
    { texte: "prudemment" },
    { texte: "un verbe", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "accompagne", type: "question" }],
  legende: "« Elle traverse prudemment » : un adverbe se pose à côté d'un verbe.",
});

// ── L'ORTHOGRAPHE LEXICALE.
const motsFrequents = phrase({
  mots: [
    { texte: "femme" },
    { texte: "monsieur" },
    { texte: "longtemps" },
  ],
  legende: "Les mots les plus fréquents sont ceux qui s'écrivent le moins comme ils s'entendent.",
});

const memoriserEtVerifier = phrase({
  mots: [
    { texte: "mémoriser" },
    { texte: "vérifier", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "puis", type: "question" }],
  legende: "Le CM2 demande les deux : retenir le mot, et savoir aller le contrôler.",
});

// ── LE DICTIONNAIRE.
const chercherALinfinitif = phrase({
  mots: [
    { texte: "courais", barre: true },
    { texte: "courir", focus: true },
  ],
  legende: "Un verbe se cherche à l'infinitif : « courais » n'est nulle part.",
});

const motsReperes = phrase({
  mots: [
    { texte: "toute la page", barre: true },
    { texte: "deux mots en haut", focus: true },
  ],
  legende: "Les mots-repères disent le premier et le dernier mot de la page.",
});

const chercherNestPasDeviner = phrase({
  mots: [
    { texte: "deviner" },
    { texte: "chercher", focus: true },
  ],
  legende: "Chercher un mot n'est pas le deviner — c'est ce qu'on fait après.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireEmploiCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "vocabulaire-emploi",
  titre: "Employer les mots en CM2 : niveaux de langue et dictionnaire (2026-2027)",
  accroche:
    "Tu comprends beaucoup plus de mots que tu n'en emploies — c'est vrai de tout le monde, et c'est exactement cet écart que le CM2 travaille. UN MOT N'EST À TOI QUE QUAND TU PEUX L'ÉCRIRE DANS UNE PHRASE À TOI. Comprendre en lisant est passif ; le réemploi, le niveau de langue et l'orthographe sont trois preuves actives, et toutes les trois se voient dans ce que tu écris.",
  identite: [
    { label: "Mots clés", valeur: "Niveau de langue, réemploi, dictionnaire" },
    { label: "Le secret", valeur: "Un mot compris n'est pas un mot possédé" },
    { label: "Outil", valeur: "Écris-le dans une phrase à toi" },
  ],
  definition: {
    texte:
      "LE NIVEAU DE LANGUE, d'abord : un même objet a souvent trois noms — bouquin (FAMILIER), livre (COURANT), ouvrage (SOUTENU). Aucun n'est meilleur : c'est la SITUATION qui décide. « Je suis crevé » se dit entre amis et ne s'écrit pas au maire de la commune. LE RÉEMPLOI ensuite : employer un mot, c'est l'écrire dans une phrase où il a du sens — ⛔ et où il est À SA PLACE. Car ce n'est pas seulement le sens qui décide : un ADJECTIF accompagne un NOM (« le petit garçon timide »), un ADVERBE accompagne un VERBE (« elle traverse prudemment »). On peut connaitre parfaitement le sens d'un mot et le poser au mauvais endroit. L'ORTHOGRAPHE LEXICALE : les mots les plus fréquents sont souvent ceux qui s'écrivent le moins comme ils s'entendent — femme, monsieur, longtemps —, et le CM2 demande de les MÉMORISER ET DE SAVOIR LES VÉRIFIER. LE DICTIONNAIRE, enfin, qui sert quand deviner n'a pas suffi : on y cherche en ordre alphabétique LETTRE À LETTRE, on se guide avec les MOTS-REPÈRES en haut de page, et l'on cherche un verbe À SON INFINITIF — « courais » n'est nulle part, « courir » y est.",
  },
  figure: {
    schema: pile(comprendreOuEmployer, grilleTroisNiveaux),
    legende:
      "Deux tas de mots vivent dans ta tête, et le premier est bien plus gros que le second : ceux que tu RECONNAIS quand tu les lis, et ceux que tu SORS quand tu écris. Toute cette notion travaille le passage du premier tas au second, et le test est simple — écris le mot dans une phrase à toi. Si tu n'y arrives pas, tu le reconnais, tu ne le possèdes pas. En bas, la première chose qu'un mot possédé exige : savoir DANS QUELLE SITUATION il se dit. Bouquin, livre, ouvrage désignent la même chose et ne s'emploient pas au même endroit.",
  },
  proprietes: [
    {
      titre: "Trois niveaux pour une même chose",
      texte:
        "Familier, courant, soutenu. Bouquin, livre, ouvrage. Le sens est le même ; ce qui change est la situation où le mot convient.",
      schema: grilleTroisNiveaux,
      micros: ["cm2_voc_niveau_langue"],
    },
    {
      titre: "Aucun niveau n'est meilleur",
      texte:
        "Le soutenu n'est pas « mieux » : il est déplacé dans une cour de récréation. Employer un mot, c'est le mettre où il convient.",
      schema: memeChoseTroisMots,
      micros: ["cm2_voc_niveau_langue"],
    },
    {
      titre: "C'est la situation qui décide",
      texte:
        "Une lettre au maire, un devoir, un message à un ami : trois situations, trois façons de dire la même chose.",
      schema: auMaire,
      micros: ["cm2_voc_niveau_langue"],
    },
    {
      titre: "Un adjectif accompagne un nom",
      texte:
        "« Le petit garçon timide n'osait pas parler. » L'adjectif se pose à côté d'un nom — c'est sa place, et elle ne dépend pas du sens.",
      schema: adjectifAvecUnNom,
      micros: ["cm2_voc_reemploi"],
    },
    {
      titre: "Un adverbe accompagne un verbe",
      texte:
        "« Elle traverse la rue prudemment. » On peut connaitre le sens de « prudemment » et écrire « une fille prudemment » : la faute n'est pas de sens.",
      schema: adverbeAvecUnVerbe,
      micros: ["cm2_voc_reemploi"],
    },
    {
      titre: "Les mots fréquents s'écrivent mal",
      texte:
        "Femme, monsieur, longtemps, pharmacie. Ce sont ceux qu'on écrit le plus souvent, et ceux qui s'écrivent le moins comme ils s'entendent.",
      schema: motsFrequents,
      micros: ["cm2_voc_orthographe"],
    },
    {
      titre: "Mémoriser ET vérifier",
      texte:
        "Le CM2 demande les deux mots. Retenir ne suffit pas : il faut aussi savoir aller contrôler quand un doute arrive.",
      schema: memoriserEtVerifier,
      micros: ["cm2_voc_orthographe"],
    },
    {
      titre: "Un verbe se cherche à l'infinitif",
      texte:
        "« Courais » ne se trouve dans aucun dictionnaire. C'est « courir » qu'il faut chercher — et c'est le premier piège du dictionnaire.",
      schema: chercherALinfinitif,
      micros: ["cm2_voc_dictionnaire"],
    },
    {
      titre: "Les mots-repères évitent de tout lire",
      texte:
        "Les deux mots en haut de page disent le premier et le dernier de la page. En trois coups d'œil, tu sais si ton mot y est.",
      schema: motsReperes,
      micros: ["cm2_voc_dictionnaire"],
    },
    {
      titre: "Le défi : chercher n'est pas deviner",
      texte:
        "Le dictionnaire vient en troisième, après le contexte et la coupe du mot. Il confirme ou corrige — il ne remplace pas.",
      schema: chercherNestPasDeviner,
      micros: ["cm2_voc_emploi_defi"],
    },
  ],
  reel: {
    texte:
      "Le niveau de langue, tu le maitrises déjà mieux que tu ne crois : tu ne parles pas à ton grand-père comme à ton meilleur ami, et personne ne t'a appris la règle. Tu l'as attrapée en écoutant. Ce que l'école ajoute, c'est le troisième niveau — le soutenu —, que l'on rencontre presque uniquement à l'écrit, et qu'on ne peut donc pas attraper en parlant. C'est aussi la raison pour laquelle il faut lire : le vocabulaire soutenu ne vit nulle part ailleurs. Et l'écart entre comprendre et employer se referme de la même façon — un mot rencontré cinq fois dans cinq phrases différentes finit par sortir tout seul le jour où tu écris.",
  },
  historique: {
    texte:
      "L'ordre alphabétique n'a rien de naturel, et il a longtemps semblé absurde. Les premiers recueils de mots, dans l'Antiquité et au Moyen Âge, étaient rangés PAR THÈME : les animaux ensemble, les outils ensemble, les parties du corps ensemble — ce qui paraissait logique, puisque les mots qui vont ensemble se trouvaient ensemble. Quand des copistes ont commencé à ranger par la première lettre, certains s'en sont presque excusés dans leur préface : le procédé séparait « chien » de « chat » pour les mettre l'un près de « chiffre » et l'autre près de « chaise ». Ils avaient raison sur le fond — et pourtant c'est cet ordre-là qui a gagné, pour une seule raison : il permet de trouver un mot sans rien savoir de lui.",
  },
  formule: {
    contexte: "Le test qui dit si un mot est vraiment à toi.",
    expression: "écris-le dans une phrase à toi",
    legende:
      "Pas la phrase du livre où tu l'as rencontré, pas celle du dictionnaire : la tienne. Si elle vient, le mot est passé du tas des mots reconnus à celui des mots employés. Si elle ne vient pas, tu comprends le mot — ce qui est déjà bien — mais tu ne le possèdes pas encore.",
    schema: comprendreOuEmployer,
  },
  methode: [
    {
      titre: "Se demander à qui l'on écrit",
      texte:
        "Avant de choisir ses mots. À un ami, au maire, au correcteur d'un devoir : la réponse donne le niveau de langue.",
      schema: auMaire,
      micros: ["cm2_voc_niveau_langue"],
    },
    {
      titre: "Vérifier la place, pas seulement le sens",
      texte:
        "Un adjectif cherche un nom, un adverbe cherche un verbe. Si le mot n'a personne à accompagner, il est mal placé.",
      schema: adverbeAvecUnVerbe,
      micros: ["cm2_voc_reemploi"],
    },
    {
      titre: "Faire une liste des mots qui te trahissent",
      texte:
        "Cinq ou six mots fréquents que tu rates toujours. C'est une liste courte, et elle vaut mieux que toute l'orthographe du dictionnaire.",
      schema: motsFrequents,
      micros: ["cm2_voc_orthographe"],
    },
    {
      titre: "Chercher un verbe : remonter à l'infinitif",
      texte:
        "« Nous partions » → partir. « Il crut » → croire. Cette seule habitude fait gagner la moitié des recherches ratées.",
      schema: chercherALinfinitif,
      micros: ["cm2_voc_dictionnaire"],
    },
  ],
  usages: [
    {
      titre: "Pour écrire une lettre officielle",
      detail:
        "Une demande, une réclamation, une candidature. Le niveau de langue y est jugé avant le contenu, et cela commence dès le CM2.",
      schema: auMaire,
      micros: ["cm2_voc_niveau_langue"],
    },
    {
      titre: "Pour que les mots appris servent enfin",
      detail:
        "Un mot vu en classe et jamais réemployé s'oublie en trois semaines. Le réemploi est ce qui le fixe.",
      schema: comprendreOuEmployer,
      micros: ["cm2_voc_reemploi"],
    },
    {
      titre: "Pour ne plus perdre de points sur des mots courants",
      detail:
        "Les fautes les plus fréquentes portent sur les mots les plus fréquents. La liste à retenir est plus courte qu'on ne croit.",
      schema: motsFrequents,
      micros: ["cm2_voc_orthographe"],
    },
    {
      titre: "Pour trouver un mot en dix secondes",
      detail:
        "Les mots-repères et l'ordre lettre à lettre. Un dictionnaire mal utilisé prend trois minutes ; bien utilisé, dix secondes.",
      schema: motsReperes,
      micros: ["cm2_voc_dictionnaire"],
    },
  ],
  exemples: [
    {
      titre: "Reconnaitre un niveau de langue",
      donnees: "« Je suis crevé. »",
      schema: grilleTroisNiveaux,
      question: "Dans quel niveau de langue est cette phrase ?",
      solution:
        "FAMILIER. Elle se dit très bien entre amis — le familier n'est pas une faute. Mais elle ne s'écrit pas dans un devoir ni dans une lettre : en courant on dirait « je suis fatigué », et en soutenu « je suis épuisé ».",
      micros: ["cm2_voc_niveau_langue"],
    },
    {
      titre: "Écrire au maire",
      donnees: "Tu écris une lettre au maire de ta commune.",
      schema: auMaire,
      question: "Quelle formulation choisis-tu ?",
      solution:
        "« JE VOUS PRIE DE BIEN VOULOIR EXAMINER MA DEMANDE. » Ce n'est pas de la politesse décorative : c'est le niveau de langue qu'appelle la situation. « Faudrait voir mon truc » dit la même chose et ne sera pas lu de la même façon.",
      micros: ["cm2_voc_niveau_langue"],
    },
    {
      titre: "Employer un mot",
      donnees: "« Quelle phrase emploie bien le mot prudemment ? »",
      schema: adverbeAvecUnVerbe,
      question: "Laquelle ?",
      solution:
        "« ELLE TRAVERSE LA RUE PRUDEMMENT. » L'adverbe accompagne un VERBE — c'est sa place. Et remarque le piège : on peut savoir parfaitement ce que veut dire « prudemment » et écrire « une fille prudemment ». La faute n'est alors pas une faute de sens.",
      micros: ["cm2_voc_reemploi"],
    },
    {
      titre: "L'orthographe d'un mot fréquent",
      donnees: "« Quelle est l'orthographe correcte ? »",
      schema: motsFrequents,
      question: "Femme, fame ou famme ?",
      solution:
        "FEMME. Il s'écrit avec « e-m-m » et se prononce « fa » : c'est exactement pour cela qu'il faut le mémoriser. Les mots les plus fréquents sont souvent les plus irréguliers — et ce sont ceux qu'on écrit le plus souvent.",
      micros: ["cm2_voc_orthographe"],
    },
    {
      titre: "Chercher un verbe",
      donnees: "Tu veux chercher le verbe « courais » dans le dictionnaire.",
      schema: chercherALinfinitif,
      question: "Que cherches-tu ?",
      solution:
        "COURIR. Les verbes sont rangés à l'INFINITIF : « courais » n'apparait nulle part. Il faut donc remonter au verbe avant de chercher — et c'est le premier piège du dictionnaire, celui qui fait croire qu'un mot n'y est pas.",
      micros: ["cm2_voc_dictionnaire"],
    },
    {
      titre: "Le défi",
      donnees: "Tu as deviné le sens d'un mot par le contexte, puis en le coupant.",
      schema: chercherNestPasDeviner,
      question: "Le dictionnaire sert-il encore ?",
      solution:
        "OUI, ET C'EST SA VRAIE PLACE : LE TROISIÈME RESSORT. Il confirme ou corrige ce que tu as deviné — il ne remplace pas le fait de deviner, qui est plus rapide et te fait progresser. « Chercher un mot n'est pas le deviner » : ce sont deux gestes, et ils viennent dans cet ordre.",
      micros: ["cm2_voc_emploi_defi"],
    },
  ],
  pieges: [
    "Croire que le soutenu est « meilleur » : il est déplacé dans une cour de récréation.",
    "Employer un mot familier dans un devoir ou une lettre officielle.",
    "Vérifier le sens d'un mot sans vérifier sa place : un adverbe cherche un verbe.",
    "Croire que la faute de place est une faute de sens : ce sont deux choses.",
    "Négliger les mots fréquents : ce sont eux qui coutent le plus de points.",
    "Chercher un verbe conjugué dans le dictionnaire : il faut l'infinitif.",
    "Ouvrir le dictionnaire en premier : il vient après le contexte et la coupe du mot.",
  ],
  aRetenir: [
    "Un mot n'est à toi que quand tu peux l'écrire dans une phrase à toi.",
    "Trois niveaux de langue, et c'est la situation qui décide — pas la qualité.",
    "Employer un mot, c'est aussi le mettre à sa place : adjectif-nom, adverbe-verbe.",
    "Les mots fréquents sont les plus irréguliers : à mémoriser et à vérifier.",
    "Un verbe se cherche à l'infinitif ; les mots-repères font gagner du temps.",
  ],
  entrainement: [
    {
      question: "« Parmi ces mots, lequel appartient au langage familier ? »",
      correction: "Bouquin.",
      micros: ["cm2_voc_niveau_langue"],
    },
    {
      question: "« Quel est l'équivalent COURANT du mot familier fringues ? »",
      correction: "Vêtements.",
      micros: ["cm2_voc_niveau_langue"],
    },
    {
      question: "« Quelle phrase emploie bien le mot immense ? »",
      correction: "Le désert est immense — l'adjectif accompagne un nom.",
      micros: ["cm2_voc_reemploi"],
    },
    {
      question: "Femme, fame ou famme ?",
      correction: "Femme.",
      micros: ["cm2_voc_orthographe"],
    },
    {
      question: "Pour chercher le verbe « courais », on cherche…",
      correction: "Courir — les verbes sont rangés à l'infinitif.",
      micros: ["cm2_voc_dictionnaire"],
    },
    {
      question: "À quoi servent les deux mots écrits en haut d'une page ?",
      correction: "À indiquer le premier et le dernier mot de la page.",
      micros: ["cm2_voc_dictionnaire"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesVocabulaireEmploiCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Employer les mots - CM2",
    section: {
      type: "objectif",
      phrase: "Comprendre n'est pas posséder",
      sousPhrase:
        "Tu comprends beaucoup plus de mots que tu n'en emploies. C'est cet écart qu'on travaille.",
      encadre: {
        titre: "Le test",
        texte: "Écris le mot dans une phrase à toi — pas celle du livre.",
      },
    },
  },
  {
    titre: "Trois niveaux de langue",
    badge: "Employer les mots - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Familier", texte: "Bouquin, fringues, crevé. Entre amis." },
        { titre: "Courant", texte: "Livre, vêtements, fatigué. Partout." },
        { titre: "Soutenu", texte: "Ouvrage, épuisé. À l'écrit surtout." },
        { titre: "Aucun n'est meilleur", texte: "C'est la situation qui décide." },
      ],
    },
    schema: grilleTroisNiveaux,
  },
  {
    titre: "Employer, c'est aussi placer",
    badge: "Employer les mots - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Un adjectif",
        contenu: "Il accompagne un NOM : « le petit garçon timide ».",
      },
      droite: {
        titre: "Un adverbe",
        contenu: "Il accompagne un VERBE : « elle traverse prudemment ».",
      },
    },
    schema: adverbeAvecUnVerbe,
  },
  {
    titre: "Le dictionnaire, troisième ressort",
    badge: "Employer les mots - CM2",
    section: {
      type: "etapes",
      etapes: [
        "1. Le contexte : ce qu'il y a autour du mot.",
        "2. La coupe : ce qu'il y a dedans.",
        "3. Le dictionnaire : il confirme ou corrige.",
        "⛔ « Chercher un mot n'est pas le deviner. »",
      ],
    },
    schema: chercherNestPasDeviner,
  },
  {
    titre: "Deux réflexes de dictionnaire",
    badge: "Employer les mots - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Un verbe se cherche à l'INFINITIF : « courais » → courir.",
        "Sinon, tu conclus que le mot n'existe pas.",
        "Les deux mots en haut de page : le premier et le dernier.",
        "Trois coups d'œil suffisent pour savoir si ton mot y est.",
      ],
    },
    schema: chercherALinfinitif,
  },
  {
    titre: "À vous",
    badge: "Employer les mots - CM2",
    section: {
      type: "exercice",
      enonce: "Tu écris une lettre au maire de ta commune.",
      question: "« Je suis crevé » ou « je vous prie de bien vouloir » ?",
      indice: "Demande-toi à qui tu écris.",
      correction:
        "LA SECONDE. Ce n'est pas de la politesse décorative : c'est le niveau de langue qu'appelle la situation. Le familier n'est pas une faute — il est déplacé ici.",
    },
    schema: auMaire,
  },
];
