// ─── Fiche de cours : écrire à la main de manière fluide et efficace (6e) ─────
// PREMIÈRE FICHE DU DOMAINE DE L'ÉCRITURE EN 6e, qui n'avait rien.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. Compétence « Écrire à la main de manière fluide et efficace »
// (BO6EFRE). Le texte le pose lui-même : « la maitrise de l'écriture cursive
// reste importante ».
//
// ⭐⭐ CETTE NOTION N'EXISTE DANS AUCUNE AUTRE CLASSE DU COLLÈGE. Comme la
// fluence, elle est propre au CYCLE 3 — et pour la même raison : le cycle 4 la
// suppose acquise et ne la travaille plus. ⚠️ C'est le deuxième cas repéré (voir
// la note de la passation sur la fluence) : chercher les autres avant d'attaquer
// le CM1 et le CM2, car une notion sans écho au cycle 4 ne croise jamais le
// chemin de personne quand on fiche du haut vers le bas.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE, ET ELLE EST MÉCANIQUE, PAS MORALE : COPIER
// VITE, CE N'EST PAS ÉCRIRE VITE — C'EST LEVER LES YEUX MOINS SOUVENT. Le pool
// le dit en une ligne : « le temps se perd dans les allers-retours, pas dans la
// main ». Toute la notion en découle, et elle cesse d'être une affaire
// d'application. On ne demande pas à l'élève d'être plus soigneux : on lui
// apprend à garder un plus GROS MORCEAU en tête entre deux regards.
//
// ⭐ ET L'ERREUR LA PLUS FRÉQUENTE A UN REMÈDE TECHNIQUE. Un mot sauté ou doublé
// n'est pas de l'inattention : c'est UNE ERREUR DE REPÉRAGE, au moment où l'œil
// revient au modèle et se pose au mauvais endroit. Le remède ne s'invente pas —
// retenir le dernier mot ÉCRIT, sur SA feuille, avant de lever les yeux.
//
// ⭐ ET LE GESTE QUE PERSONNE N'ENSEIGNE : ON SE RELIT SUR SA FEUILLE, JAMAIS SUR
// LE MODÈLE. « L'œil qui relit le modèle relit un texte juste, et ne voit rien. »
// C'est imparable, et cela explique pourquoi tant d'élèves « relisent » sans rien
// trouver.
//
// ⭐ ENFIN, CE QUE « FLUIDE » VEUT DIRE, ET CE N'EST PAS LA CALLIGRAPHIE : écrire
// « sans y penser, pour garder sa tête libre pour ce qu'on écrit ». Un geste
// automatisé libère l'attention pour le contenu. La notion ne juge donc pas la
// beauté de l'écriture : elle mesure ce que le geste laisse disponible.
//
// ⛔ LA MISE EN FORME N'EST PAS L'ORTHOGRAPHE. Le pool le pose en leurres : les
// marges, les alinéas, les titres et la lisibilité — pas les accords, pas le
// plan, pas la longueur. Deux colonnes dans la fiche, pour que l'écart se voie.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Et la bande `nature` est CENTRÉE SUR SON MOT : chaque mot
// doit être au moins aussi large que son étiquette (mesuré le 29/08).
// ⚠️ `number_line` centre aussi son étiquette sur la valeur : un point posé sur
// une borne déborde de la moitié de sa largeur (mesuré par la session maths le
// 29/08). Les points de cette fiche sont en 1..3 dans un axe 0..4.
//
// Alignée sur les pools ECRIRE_MAIN et ECRITURE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 3 de la notion `ecriture_main`) :
// - 6e_ecrit_copie         → figure, propriétés 1 à 4, formule, méthodes 1 et 2,
//                            usages 1 et 2, exemples 1 à 3
// - 6e_ecrit_mise_en_forme → propriétés 5 à 7, méthode 3, usage 3, exemple 4
// - 6e_ecrit_copie_defi    → propriétés 8 et 9, méthode 4, usage 4, exemples 5 et 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
  NumberLineCanvasPoint,
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

/** L'ordre de relecture. ⚠️ `showValues: false` — ce sont des étapes.
 *  ⚠️ Points en 1..3 dans un axe 0..4 : jamais sur une borne, sinon l'étiquette
 *  déborde de la moitié de sa largeur. */
function axe(points: NumberLineCanvasPoint[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min: 0,
        max: 4,
        step: 1,
        points,
        size: { width: 235, height: 78 },
        display: { showTicks: false, showValues: false, showZero: false },
      }}
    />
  );
}

/** Ce que règle la mise en forme, et ce qu'elle ne règle pas. ⚠️ Cellules
 *  courtes : à la largeur d'un bloc, vingt signes tombent sous 11 px. */
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

// ─── Ce qui se dessine quand on copie ─────────────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : le temps se perd dans les allers-retours.
const ouLeTempsSePerd = phrase({
  mots: [
    { texte: "la main", barre: true },
    { texte: "les allers-retours", focus: true },
  ],
  legende: "Copier vite, ce n'est pas écrire vite : c'est lever les yeux moins souvent.",
});

const groupeGardeEnTete = phrase({
  mots: [
    { texte: "lire un groupe" },
    { texte: "l'écrire de tête", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "puis", type: "question" }],
  legende: "C'est la taille du morceau gardé en tête qui fait toute la différence.",
});

// ⭐ LE REPÈRE SE PREND SUR SA FEUILLE, PAS SUR LE MODÈLE.
const repereSurSaFeuille = phrase({
  mots: [
    { texte: "ton dernier mot", focus: true },
    { texte: "le modèle" },
  ],
  liens: [{ de: 0, vers: 1, label: "avant de voir", type: "question" }],
  legende: "Retiens ce que TU viens d'écrire avant de lever les yeux. C'est le remède.",
});

const motSauteOuDouble = phrase({
  mots: [
    { texte: "un mot sauté" },
    { texte: "un mot doublé" },
  ],
  legende: "L'erreur la plus fréquente — et c'est un défaut de repérage, pas d'inattention.",
});

// ⭐ ON SE RELIT SUR SA FEUILLE.
const relireSurSaFeuille = phrase({
  mots: [
    { texte: "le modèle", barre: true },
    { texte: "ta feuille", focus: true },
  ],
  legende: "L'œil qui relit le modèle relit un texte juste, et ne voit rien.",
});

const ordreDeRelecture = axe([
  { value: 1, label: "les mots" },
  { value: 2, label: "les accents" },
  { value: 3, label: "les points" },
]);

// ── LA MISE EN FORME : ce qu'elle est, et ce qu'elle n'est pas.
const grilleMiseEnForme = grille({
  headers: ["La mise en forme", "Ce n'est pas"],
  rows: [
    { values: ["les marges", "l'orthographe"] },
    { values: ["les alinéas", "les accords"] },
    { values: ["les titres", "le plan"] },
    { values: ["la lisibilité", "la longueur"] },
  ],
  caption: "Quatre réglages, et aucun ne touche à la langue.",
});

const grilleMiseEnFormeLisible = grille({
  headers: ["La mise en forme", "Ce n'est pas"],
  rows: [
    { values: ["les marges", "l'orthographe"] },
    { values: ["les alinéas", "les accords"] },
    { values: ["les titres", "le plan"] },
    { values: ["la lisibilité", "la longueur"] },
  ],
  highlight: { row: 3 },
  caption: "Un texte bien présenté se lit plus vite et se comprend mieux.",
});

const presentationPourLeLecteur = phrase({
  mots: [
    { texte: "la présentation" },
    { texte: "le lecteur", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "sert", type: "question" }],
  legende: "Elle n'est pas une décoration, et elle ne donne pas de point en plus.",
});

// ── LE DÉFI : la main libre, et la tête disponible.
const fluideEgaleTeteLibre = phrase({
  mots: [
    { texte: "le geste" },
    { texte: "la tête libre", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "libère", type: "question" }],
  legende: "Écrire sans y penser, pour garder sa tête à ce qu'on écrit.",
});

const cursiveEtClavier = phrase({
  mots: [
    { texte: "la cursive" },
    { texte: "le clavier" },
  ],
  legende: "Le programme garde les deux : l'un n'a pas remplacé l'autre.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcritureMain6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "ecriture-main",
  titre: `Écrire à la main de manière fluide et efficace en 6e (${ANNEE_SCOLAIRE})`,
  accroche:
    "Copier vite, ce n'est pas écrire vite : c'est LEVER LES YEUX MOINS SOUVENT. Le temps ne se perd pas dans la main, il se perd dans les allers-retours entre le modèle et ta feuille. Ce n'est donc pas une affaire d'application — c'est une affaire de taille du morceau que tu gardes en tête. Et le mot sauté, l'erreur la plus fréquente de toutes, n'est pas de l'inattention : c'est un défaut de repérage, et il a un remède.",
  identite: [
    { label: "Mots clés", valeur: "Copie, repérage, cursive, mise en forme" },
    { label: "Le secret", valeur: "Le temps se perd dans les allers-retours" },
    { label: "Outil", valeur: "Retenir son dernier mot écrit" },
  ],
  definition: {
    texte:
      "Le programme du cycle 3 demande une copie LISIBLE, RÉGULIÈRE, SOIGNÉE ET SANS ERREUR — quatre exigences, et la vitesse n'en fait pas partie. La bonne méthode ne consiste ni à copier lettre par lettre, ni à écrire la phrase entière d'un trait : on LIT UN GROUPE DE MOTS, on le garde en tête, on l'écrit sans regarder, et l'on vérifie. C'est la taille de ce morceau qui décide de tout, car le temps se perd dans les allers-retours entre le modèle et sa feuille, jamais dans la main. L'erreur la plus fréquente est un MOT SAUTÉ OU DOUBLÉ au moment où l'on relève les yeux : c'est une erreur de repérage, et le remède est de retenir le dernier mot ÉCRIT, sur sa propre feuille, avant de revenir au modèle. On se relit d'ailleurs sur SA feuille — jamais sur le modèle, qui est juste et ne montre rien. La MISE EN FORME, elle, désigne les marges, les alinéas, les titres et la lisibilité : ni l'orthographe, ni le plan. Enfin écrire « de manière fluide » veut dire écrire SANS Y PENSER, pour garder sa tête libre pour ce qu'on écrit.",
  },
  figure: {
    schema: pile(ouLeTempsSePerd, groupeGardeEnTete),
    legende:
      "Le mot barré désigne le faux coupable. Quand une copie prend une heure, on croit que la main est lente — et l'on demande à l'élève d'accélérer, ce qui ne change rien et abime l'écriture. Le temps se perd ailleurs : dans les allers-retours entre le modèle et la feuille. Chaque regard coute, et il en faut vingt fois moins si l'on emporte un GROUPE DE MOTS au lieu d'un mot. C'est un réglage, pas un effort — et c'est pour cela qu'il s'apprend en une séance.",
  },
  proprietes: [
    {
      titre: "Quatre exigences, et la vitesse n'en est pas",
      texte:
        "Le programme demande une copie lisible, régulière, soignée et sans erreur. Aller vite n'est pas demandé — cela vient tout seul quand le reste tient.",
      schema: ouLeTempsSePerd,
      micros: ["6e_ecrit_copie"],
    },
    {
      titre: "La bonne méthode tient en quatre temps",
      texte:
        "Lire un groupe de mots, le garder en tête, l'écrire sans regarder, vérifier. Ni lettre à lettre, ni la phrase entière d'un trait.",
      schema: groupeGardeEnTete,
      micros: ["6e_ecrit_copie"],
    },
    {
      titre: "Le mot sauté est une erreur de repérage",
      texte:
        "Pas de l'inattention. L'œil revient au modèle et se pose au mauvais endroit — souvent sur un mot qui ressemble à celui d'avant.",
      schema: motSauteOuDouble,
      micros: ["6e_ecrit_copie"],
    },
    {
      titre: "Le repère se prend sur TA feuille",
      texte:
        "Retiens le dernier mot que tu viens d'écrire avant de lever les yeux. Tu sauras alors exactement où reprendre dans le modèle.",
      schema: repereSurSaFeuille,
      micros: ["6e_ecrit_copie"],
    },
    {
      titre: "On se relit sur sa feuille, jamais sur le modèle",
      texte:
        "L'œil qui relit le modèle relit un texte juste, et ne voit rien. C'est pour cela que tant d'élèves « relisent » sans rien trouver.",
      schema: relireSurSaFeuille,
      micros: ["6e_ecrit_mise_en_forme"],
    },
    {
      titre: "Une chose à la fois, dans cet ordre",
      texte:
        "Les mots oubliés ou doublés d'abord, les accents ensuite, la ponctuation enfin. Chercher les trois en même temps n'en trouve aucun.",
      schema: ordreDeRelecture,
      micros: ["6e_ecrit_mise_en_forme"],
    },
    {
      titre: "La mise en forme n'est pas l'orthographe",
      texte:
        "Ce sont les marges, les alinéas, les titres, la lisibilité. Ni les accords, ni le plan, ni la longueur : ceux-là sont un autre travail.",
      schema: grilleMiseEnForme,
      micros: ["6e_ecrit_mise_en_forme"],
    },
    {
      titre: "La présentation sert au lecteur",
      texte:
        "Un texte bien présenté se lit plus vite et se comprend mieux. Elle ne donne pas de point en plus, et elle en fait gagner partout.",
      schema: pile(presentationPourLeLecteur, grilleMiseEnFormeLisible),
      micros: ["6e_ecrit_copie_defi"],
    },
    {
      titre: "Fluide veut dire : sans y penser",
      texte:
        "Pas vite, pas joli. Un geste automatisé libère l'attention pour le contenu — et la cursive reste importante même si l'on écrit aussi au clavier.",
      schema: pile(fluideEgaleTeteLibre, cursiveEtClavier),
      micros: ["6e_ecrit_copie_defi"],
    },
  ],
  reel: {
    texte:
      "Tu connais déjà le coût d'un aller-retour : c'est celui du regard vers ton téléphone au milieu d'une phrase que tu écrivais. Ce n'est pas la seconde passée à regarder qui te coute, c'est de devoir retrouver où tu en étais. La copie fonctionne exactement pareil, et c'est pour cela que la méthode marche : emporter un plus gros morceau, c'est faire moins de retours. Tu le fais spontanément quand tu recopies un numéro de téléphone — tu ne le lis pas chiffre par chiffre, tu prends des paquets de deux ou trois. Personne ne t'a appris cela, et personne ne t'a dit non plus que c'était la même chose pour un texte. Quant à relire sur sa feuille et non sur le modèle : essaie une fois, tu trouveras des erreurs que tu avais relues trois fois sans les voir.",
  },
  historique: {
    texte:
      "Pendant plus de mille ans, avant l'imprimerie, tous les livres d'Europe ont été copiés à la main, un par un. Et les copistes faisaient très exactement l'erreur que tu fais : le regard revient au modèle, tombe sur un mot identique à celui qu'on venait de quitter — mais plus loin — et toute une ligne disparait. Les spécialistes ont donné un nom à cette faute, le « saut du même au même », et ils s'en servent aujourd'hui pour reconstituer les textes anciens : quand deux copies d'un même livre diffèrent d'une ligne, on sait dans quel sens l'erreur s'est produite. Autrement dit, l'erreur la plus banale de ta copie de 6e a une histoire de quinze siècles, et un remède connu depuis aussi longtemps : prendre son repère avant de lever les yeux.",
  },
  formule: {
    contexte: "Le geste qui supprime l'erreur la plus fréquente de toutes.",
    expression: "retenir son dernier mot écrit",
    legende:
      "Avant de lever les yeux vers le modèle, dis-toi le dernier mot que TU viens d'écrire. Tu ne cherches plus « où j'en étais » dans un texte que tu ne connais pas — tu cherches un mot précis, et tu le trouves du premier coup. Le mot sauté disparait, et la copie accélère sans que la main aille plus vite.",
    schema: repereSurSaFeuille,
  },
  methode: [
    {
      titre: "Emporter un groupe, pas un mot",
      texte:
        "Lis quatre ou cinq mots, ferme les yeux une seconde, écris-les. Puis allonge le groupe. C'est un entrainement, et il se mesure.",
      schema: groupeGardeEnTete,
      micros: ["6e_ecrit_copie"],
    },
    {
      titre: "Prendre son repère avant de regarder",
      texte:
        "Le dernier mot écrit, dit dans sa tête. Une demi-seconde, et le retour au modèle devient précis au lieu d'être approximatif.",
      schema: repereSurSaFeuille,
      micros: ["6e_ecrit_copie"],
    },
    {
      titre: "Relire trois fois, une chose par fois",
      texte:
        "Les mots manquants, puis les accents, puis la ponctuation. Et toujours sur ta feuille : le modèle est juste, il ne t'apprendra rien.",
      schema: ordreDeRelecture,
      micros: ["6e_ecrit_mise_en_forme"],
    },
    {
      titre: "Régler la page avant d'écrire",
      texte:
        "La marge, le titre, l'alinéa du premier paragraphe. Trente secondes au départ valent mieux qu'une copie à refaire.",
      schema: grilleMiseEnForme,
      micros: ["6e_ecrit_copie_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour copier une leçon deux fois plus vite",
      detail:
        "Sans écrire plus vite, et sans abimer ton écriture. Le gain est entier dans le nombre de regards, et il se voit dès la première page.",
      schema: ouLeTempsSePerd,
      micros: ["6e_ecrit_copie"],
    },
    {
      titre: "Pour ne plus perdre de points bêtement",
      detail:
        "Un mot sauté dans une consigne recopiée fait rater tout l'exercice. Ce n'est pas une faute de français, et cela coute pourtant autant.",
      schema: motSauteOuDouble,
      micros: ["6e_ecrit_copie"],
    },
    {
      titre: "Pour rendre une copie qu'on lit sans effort",
      detail:
        "Marges, alinéas, titres. Le correcteur ne met pas de point pour cela — il en enlève moins, parce qu'il comprend du premier coup.",
      schema: presentationPourLeLecteur,
      micros: ["6e_ecrit_mise_en_forme"],
    },
    {
      titre: "Pour écrire en pensant à autre chose qu'à écrire",
      detail:
        "C'est le but réel de la notion : que la main n'occupe plus ta tête, et que ta tête serve à ce que tu as à dire.",
      schema: fluideEgaleTeteLibre,
      micros: ["6e_ecrit_copie_defi"],
    },
  ],
  exemples: [
    {
      titre: "Ce que demande le programme",
      donnees: "« Que demande le programme quand on copie un texte ? »",
      schema: ouLeTempsSePerd,
      question: "Quelles exigences ?",
      solution:
        "UNE COPIE LISIBLE, RÉGULIÈRE, SOIGNÉE ET SANS ERREUR. Quatre exigences, et la vitesse n'en fait pas partie. Ce n'est pas un détail : un élève qui croit qu'on lui demande d'aller vite sacrifie les quatre autres, et il perd du temps en plus.",
      micros: ["6e_ecrit_copie"],
    },
    {
      titre: "La bonne méthode",
      donnees: "« Quelle est la meilleure méthode de copie ? »",
      schema: groupeGardeEnTete,
      question: "Laquelle ?",
      solution:
        "LIRE UN GROUPE DE MOTS, LE GARDER EN TÊTE, L'ÉCRIRE SANS REGARDER, VÉRIFIER. Lettre par lettre est le plus lent de tous ; la phrase entière d'un trait dépasse ce qu'on retient. C'est la taille du morceau qui fait la différence, et elle s'entraine.",
      micros: ["6e_ecrit_copie"],
    },
    {
      titre: "Éviter le mot sauté",
      donnees: "« Comment éviter de sauter un mot en copiant ? »",
      schema: repereSurSaFeuille,
      question: "Comment ?",
      solution:
        "RETENIR LE DERNIER MOT ÉCRIT AVANT DE REVENIR AU MODÈLE. Copier plus lentement ne change rien — l'erreur n'est pas de vitesse. Suivre du doigt occupe une main. Le repère se prend sur TA feuille, et il te dit où reprendre du premier coup.",
      micros: ["6e_ecrit_copie"],
    },
    {
      titre: "La mise en forme",
      donnees: "« La mise en forme d'un texte produit, c'est… »",
      schema: grilleMiseEnForme,
      question: "Qu'est-ce que c'est ?",
      solution:
        "LES MARGES, LES ALINÉAS, LES TITRES, LA LISIBILITÉ. Ni l'orthographe et les accords — c'est la langue —, ni le plan et les connecteurs — c'est l'organisation des idées. Trois travaux différents, et les confondre fait qu'on n'en fait aucun correctement.",
      micros: ["6e_ecrit_mise_en_forme"],
    },
    {
      titre: "Où l'on se relit",
      donnees: "« Sur quelle feuille se relit-on ? »",
      schema: relireSurSaFeuille,
      question: "Sur laquelle ?",
      solution:
        "SUR LA SIENNE, JAMAIS SUR LE MODÈLE. La raison est imparable : l'œil qui relit le modèle relit un texte juste, et ne peut donc rien y trouver. C'est l'explication de ces relectures qui ne trouvent jamais rien — on ne relisait pas le bon texte.",
      micros: ["6e_ecrit_copie_defi"],
    },
    {
      titre: "Écrire de manière fluide",
      donnees: "« Écrire à la main de manière fluide, cela veut dire… »",
      schema: fluideEgaleTeteLibre,
      question: "Quoi ?",
      solution:
        "SANS Y PENSER, POUR GARDER SA TÊTE LIBRE POUR CE QU'ON ÉCRIT. Ni le plus vite possible, ni sans lever le stylo, ni avec une écriture penchée et régulière. La notion ne juge pas la beauté du tracé : elle mesure ce que le geste laisse disponible.",
      micros: ["6e_ecrit_copie_defi"],
    },
  ],
  pieges: [
    "Croire qu'on copie lentement à cause de sa main : le temps se perd dans les allers-retours.",
    "Copier lettre par lettre : c'est la méthode la plus lente de toutes.",
    "Vouloir copier la phrase entière d'un trait : elle dépasse ce qu'on retient.",
    "Prendre le mot sauté pour de l'inattention : c'est un défaut de repérage, et il a un remède.",
    "Se relire sur le modèle : il est juste, donc il ne montre rien.",
    "Confondre la mise en forme et l'orthographe : marges et alinéas ne sont pas des accords.",
    "Croire que « fluide » veut dire rapide ou joli : cela veut dire sans y penser.",
  ],
  aRetenir: [
    "Lisible, régulière, soignée, sans erreur — la vitesse n'est pas demandée.",
    "Lire un groupe, le garder en tête, l'écrire sans regarder, vérifier.",
    "Retenir son dernier mot écrit avant de lever les yeux.",
    "On se relit sur SA feuille : le modèle est juste et ne montre rien.",
    "Fluide veut dire sans y penser — pour garder sa tête à ce qu'on écrit.",
  ],
  entrainement: [
    {
      question: "« Copier vite, ce n'est pas écrire vite. C'est… » quoi ?",
      correction: "Lever les yeux moins souvent.",
      micros: ["6e_ecrit_copie"],
    },
    {
      question: "« Quelle est l'erreur de copie la plus fréquente ? »",
      correction: "Un mot sauté ou doublé au moment où l'on relève les yeux.",
      micros: ["6e_ecrit_copie"],
    },
    {
      question: "« Pourquoi la copie reste-t-elle importante au cycle 3 ? »",
      correction: "Parce qu'elle entraine le geste et fixe l'orthographe des mots.",
      micros: ["6e_ecrit_copie"],
    },
    {
      question: "« Que vérifie-t-on en relisant une copie, et dans quel ordre ? »",
      correction: "Les mots oubliés ou doublés, puis les accents, puis la ponctuation.",
      micros: ["6e_ecrit_mise_en_forme"],
    },
    {
      question: "« Un texte bien présenté… » quoi ?",
      correction: "Se lit plus vite et se comprend mieux.",
      micros: ["6e_ecrit_mise_en_forme"],
    },
    {
      question: "« L'écriture cursive au collège… »",
      correction: "Reste importante, même si l'on écrit aussi au clavier.",
      micros: ["6e_ecrit_copie_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesEcritureMain6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Écrire à la main - 6e",
    section: {
      type: "objectif",
      phrase: "Le temps se perd dans les allers-retours",
      sousPhrase:
        "Copier vite, ce n'est pas écrire vite : c'est lever les yeux moins souvent.",
      encadre: {
        titre: "L'idée",
        texte: "C'est un réglage, pas un effort — et il s'apprend en une séance.",
      },
    },
  },
  {
    titre: "La méthode, en quatre temps",
    badge: "Écrire à la main - 6e",
    section: {
      type: "etapes",
      etapes: [
        "LIRE un groupe de mots — pas une lettre, pas la phrase entière.",
        "LE GARDER en tête.",
        "L'ÉCRIRE sans regarder le modèle.",
        "VÉRIFIER. Et c'est la taille du groupe qui fait la différence.",
      ],
    },
    schema: groupeGardeEnTete,
  },
  {
    titre: "Le mot sauté, et son remède",
    badge: "Écrire à la main - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce que ce n'est pas",
        contenu: "De l'inattention. Copier plus lentement n'y change rien.",
      },
      droite: {
        titre: "Ce que c'est",
        contenu: "Un défaut de repérage : retiens ton dernier mot écrit avant de lever les yeux.",
      },
    },
    schema: repereSurSaFeuille,
  },
  {
    titre: "On se relit sur SA feuille",
    badge: "Écrire à la main - 6e",
    section: {
      type: "etapes",
      etapes: [
        "L'œil qui relit le modèle relit un texte JUSTE — il ne voit rien.",
        "D'où ces relectures qui ne trouvent jamais rien.",
        "Une chose à la fois : les mots manquants, les accents, la ponctuation.",
        "Dans cet ordre, et pas les trois ensemble.",
      ],
    },
    schema: relireSurSaFeuille,
  },
  {
    titre: "La mise en forme n'est pas l'orthographe",
    badge: "Écrire à la main - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Les marges", texte: "Et les alinéas, et les titres." },
        { titre: "La lisibilité", texte: "Un texte bien présenté se comprend mieux." },
        { titre: "Ce n'est pas", texte: "Les accords ni les temps : cela, c'est la langue." },
        { titre: "Ni le plan", texte: "L'ordre des idées est encore un autre travail." },
      ],
    },
    schema: grilleMiseEnForme,
  },
  {
    titre: "À vous",
    badge: "Écrire à la main - 6e",
    section: {
      type: "exercice",
      enonce: "« Écrire à la main de manière fluide, cela veut dire… »",
      question: "Quoi, exactement ?",
      indice: "Ce n'est ni une vitesse, ni une façon de tracer les lettres.",
      correction:
        "SANS Y PENSER, POUR GARDER SA TÊTE LIBRE POUR CE QU'ON ÉCRIT. Un geste automatisé libère l'attention : c'est le but réel de toute la notion.",
    },
    schema: fluideEgaleTeteLibre,
  },
];
