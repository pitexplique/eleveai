// ─── Fiche de cours : écouter pour comprendre (CM2) ───────────────────────────
// DOUZIÈME FICHE DU CHANTIER CM2, et PREMIÈRE DU DOMAINE DE L'ORAL.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année » : « ÉCOUTER POUR
// COMPRENDRE » · « Dire pour être compris dans toutes les disciplines » ·
// « Participer à des échanges verbaux ».
//
// ⛔⛔ LE CM2 N'A QUE DEUX NOTIONS D'ORAL LÀ OÙ LA 6e EN A TROIS. La 6e sépare
// `oral_ecouter`, `oral_dire` (parler seul) et `oral_echanger` (parler avec) ; le
// CM2 garde `oral_ecouter` et fond les deux autres dans `oral_echanger`. Le
// découpage n'est donc pas le même, et il faut le dire dans les deux fiches.
//
//   | 6e `oral_ecouter` | CM2 (ici) |
//   |---|---|
//   | écouter en SACHANT CE QU'ON CHERCHE | l'idée principale ET des détails |
//   | reformuler avec ses mots | reformuler ET SYNTHÉTISER |
//   | reconnaitre le genre de discours ; dire son ressenti | — |
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE EST DANS LE MOT QUE LE CM2 AJOUTE À CELUI DE LA 6e :
// REFORMULER ET SYNTHÉTISER NE SONT PAS LE MÊME GESTE, ET LE PROGRAMME DEMANDE
// LES DEUX. Reformuler, c'est redire AVEC SES MOTS — même longueur, d'autres
// mots : cela prouve qu'on a COMPRIS. Synthétiser, c'est redire PLUS COURT —
// mêmes idées, moins de mots : cela prouve qu'on a TRIÉ. On peut très bien
// reformuler sans avoir trié, et l'on peut faire court en ayant simplement
// oublié la moitié.
//
// ⭐⭐ ET C'EST ENCORE LA SIGNATURE DU CM2 : la brièveté est un TEST, pas un
// style — celui qui n'a pas trié ne peut pas faire court. Même mécanique que
// dans `comprehension_textes` (restituer en peu de mots), `lecture_oeuvres` (le
// thème tient en un mot), `culture_lecteur` (trois lignes par livre) et
// `ecriture_preparer` (plus court que ce qu'il prépare).
//
// ⭐ LE SECOND AXE, LUI AUSSI DANS LE LIBELLÉ : « une idée principale ET DES
// DÉTAILS ». L'écoute du CM2 tient DEUX NIVEAUX À LA FOIS. Celui qui n'a que
// l'idée principale a écouté de loin ; celui qui n'a que des détails a écouté
// sans hiérarchiser — il a tout entendu et ne sait pas dire de quoi il
// s'agissait.
//
// ⛔ CE QUE CETTE FICHE NE REDIT PAS : la prise de notes par mots clés et les
// genres de discours sont le cœur de `francais-6e-oral-ecouter`, et le carnet
// d'abréviations médiéval y sert déjà de bloc d'histoire. Ne pas les reprendre.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur le pool ORAL de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
// ⚠️ Le CM2 n'a AUCUN item fixe d'oral : le pool fait seul autorité.
//
// Micro-compétences couvertes (les 3 de la notion `oral_ecouter`) :
// - cm2_oral_ecouter       → propriétés 1 à 4, méthodes 1 et 2, usages 1 et 2,
//                            exemples 1, 2 et 3
// - cm2_oral_reformuler    → figure, propriétés 5 à 8, formule, méthode 3,
//                            usage 3, exemples 4 et 5
// - cm2_oral_ecouter_defi  → propriété 9 et 10, méthode 4, usage 4, exemple 6

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

/** Les deux gestes, et ce que chacun prouve. ⚠️ Cellules courtes : à la largeur
 *  d'un bloc, vingt signes tombent sous le plancher de 11 px. */
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

// ── ⭐⭐ LA FIGURE DE RÉFÉRENCE : deux gestes que tout le monde confond.
const grilleDeuxGestes = grille({
  headers: ["Le geste", "Ce qu'il prouve"],
  rows: [
    { values: ["reformuler", "qu'on a compris"] },
    { values: ["synthétiser", "qu'on a trié"] },
  ],
  caption: "Deux gestes différents — et le CM2 demande les deux.",
});

const grilleDeuxGestesSynthese = grille({
  headers: ["Le geste", "Ce qu'il prouve"],
  rows: [
    { values: ["reformuler", "qu'on a compris"] },
    { values: ["synthétiser", "qu'on a trié"] },
  ],
  highlight: { row: 1 },
  caption: "Celui qui n'a pas trié ne peut pas faire court.",
});

const deuxNiveaux = phrase({
  mots: [
    { texte: "l'idée principale" },
    { texte: "des détails" },
  ],
  legende: "Le CM2 tient les deux à la fois — l'un sans l'autre, c'est écouter à moitié.",
});

// ── ÉCOUTER.
const seRendreDisponible = phrase({
  mots: [
    { texte: "parler aussi", barre: true },
    { texte: "se rendre libre", focus: true },
  ],
  legende: "Écouter, c'est se rendre disponible pour comprendre.",
});

const jusquauBout = phrase({
  mots: [
    { texte: "couper", barre: true },
    { texte: "jusqu'au bout", focus: true },
  ],
  legende: "Écouter quelqu'un jusqu'au bout permet de comprendre ce qu'il veut dire.",
});

const questionnerEstPermis = phrase({
  mots: [
    { texte: "une question" },
    { texte: "mieux comprendre", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "pour", type: "question" }],
  legende: "Poser une question pour mieux comprendre est utile — et permis.",
});

// ── REFORMULER.
const avecSesMots = phrase({
  mots: [
    { texte: "les mêmes mots", barre: true },
    { texte: "les tiens", focus: true },
  ],
  legende: "Reformuler, c'est redire AVEC SES MOTS. Répéter ne prouve rien.",
});

const repeterNeProuveRien = phrase({
  mots: [
    { texte: "répéter" },
    { texte: "avoir compris", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "n'est pas", type: "question" }],
  legende: "On peut répéter une phrase entière sans en avoir saisi le sens.",
});

// ── SYNTHÉTISER.
const plusCourtDoncTrie = phrase({
  mots: [
    { texte: "aussi long", barre: true },
    { texte: "plus court", focus: true },
  ],
  legende: "Synthétiser, c'est redire plus court sans rien perdre d'important.",
});

const courtParOubli = phrase({
  mots: [
    { texte: "avoir trié" },
    { texte: "avoir oublié" },
  ],
  legende: "Les deux font court. Seul le premier garde l'idée principale.",
});

// ── LE DÉFI.
const entenduUneSeuleFois = phrase({
  mots: [
    { texte: "entendu une fois" },
    { texte: "redit", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "puis", type: "question" }],
  legende: "Le défi : redire l'essentiel d'un propos entendu une seule fois.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOralEcouterCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "oral-ecouter",
  titre: "Écouter pour comprendre en CM2 (2026-2027)",
  accroche:
    "Le CM2 ajoute un mot à ce que demandait la classe précédente, et ce mot change tout : REFORMULER ET SYNTHÉTISER. Ce ne sont pas deux façons de dire la même chose. Reformuler, c'est redire AVEC SES MOTS — cela prouve qu'on a compris. Synthétiser, c'est redire PLUS COURT — cela prouve qu'on a TRIÉ. On peut très bien reformuler sans avoir trié, et faire court en ayant simplement oublié la moitié.",
  identite: [
    { label: "Mots clés", valeur: "Écouter, reformuler, synthétiser, trier" },
    { label: "Le secret", valeur: "Court sans rien perdre d'important" },
    { label: "Outil", valeur: "Redis-le en une phrase" },
  ],
  definition: {
    texte:
      "ÉCOUTER POUR COMPRENDRE, au CM2, c'est tenir DEUX NIVEAUX À LA FOIS : l'IDÉE PRINCIPALE — de quoi ça parle — ET DES DÉTAILS précis. Celui qui n'a que l'idée principale a écouté de loin ; celui qui n'a que des détails a tout entendu sans savoir dire de quoi il s'agissait. Écouter suppose de se rendre disponible : ne pas parler en même temps, ne pas couper — écouter quelqu'un JUSQU'AU BOUT est ce qui permet de comprendre ce qu'il veut dire —, et poser une question quand on n'a pas compris, ce qui est utile et permis. Le programme demande ensuite DEUX GESTES DIFFÉRENTS. REFORMULER : redire AVEC SES PROPRES MOTS. Même longueur, d'autres mots — et c'est cela qui prouve qu'on a compris, car on peut répéter une phrase entière sans en avoir saisi le sens. SYNTHÉTISER : redire PLUS COURT, sans rien perdre d'important. Attention : faire court par OUBLI fait court aussi. Ce qui distingue les deux, c'est que la synthèse garde l'idée principale.",
  },
  figure: {
    schema: pile(grilleDeuxGestes, deuxNiveaux),
    legende:
      "Deux mots qu'on emploie souvent l'un pour l'autre, et qui ne mesurent pas la même chose. Reformuler garde la longueur et change les mots : si tu y arrives, c'est que tu as compris — un perroquet ne reformule pas. Synthétiser garde les idées et enlève les mots : si tu y arrives, c'est que tu as trié. Et le second est plus dur, parce qu'il faut décider ce qui saute. En bas, l'autre exigence du CM2 : on te demande l'idée principale ET un détail précis. Deux niveaux, en une seule écoute.",
  },
  proprietes: [
    {
      titre: "Écouter, c'est se rendre disponible",
      texte:
        "Être attentif, et ne pas parler en même temps. Ce n'est pas une question de politesse : on n'entend pas ce qu'on couvre de sa propre voix.",
      schema: seRendreDisponible,
      micros: ["cm2_oral_ecouter"],
    },
    {
      titre: "Écouter jusqu'au bout",
      texte:
        "Cela permet de comprendre ce que l'autre VEUT DIRE. Beaucoup de désaccords viennent d'une phrase interrompue au milieu.",
      schema: jusquauBout,
      micros: ["cm2_oral_ecouter"],
    },
    {
      titre: "L'idée principale ET des détails",
      texte:
        "Deux niveaux à la fois. Le premier dit de quoi ça parle ; les seconds prouvent que tu y étais vraiment.",
      schema: deuxNiveaux,
      micros: ["cm2_oral_ecouter"],
    },
    {
      titre: "Poser une question est permis",
      texte:
        "Et utile. Demander pour mieux comprendre n'est pas avouer qu'on n'a pas suivi : c'est le seul moyen de rattraper ce qui manque.",
      schema: questionnerEstPermis,
      micros: ["cm2_oral_ecouter"],
    },
    {
      titre: "Reformuler, c'est redire avec ses mots",
      texte:
        "Avec SES propres mots — pas ceux de celui qui a parlé. Même longueur, d'autres mots : c'est là toute la différence.",
      schema: avecSesMots,
      micros: ["cm2_oral_reformuler"],
    },
    {
      titre: "Répéter ne prouve rien",
      texte:
        "On peut redire une phrase entière sans en avoir saisi le sens. C'est pour cela qu'on demande TES mots : ils ne s'inventent pas sans comprendre.",
      schema: repeterNeProuveRien,
      micros: ["cm2_oral_reformuler"],
    },
    {
      titre: "Synthétiser, c'est redire plus court",
      texte:
        "Mêmes idées, moins de mots. Et c'est plus difficile que reformuler, parce qu'il faut DÉCIDER CE QUI SAUTE.",
      schema: plusCourtDoncTrie,
      micros: ["cm2_oral_reformuler"],
    },
    {
      titre: "Mais faire court par oubli fait court aussi",
      texte:
        "Les deux tiennent en une phrase. Ce qui les sépare : la synthèse garde l'idée principale, l'oubli la perd sans le savoir.",
      schema: courtParOubli,
      micros: ["cm2_oral_reformuler"],
    },
    {
      titre: "Le défi : entendu une seule fois",
      texte:
        "Pas de retour en arrière, pas de relecture. C'est ce qui distingue l'écoute de la lecture, et ce qui la rend difficile.",
      schema: entenduUneSeuleFois,
      micros: ["cm2_oral_ecouter_defi"],
    },
    {
      titre: "Et c'est pour cela qu'on écoute avec une question",
      texte:
        "Savoir ce qu'on cherche avant que l'autre parle. Sans question en tête, on entend tout et l'on ne retient rien.",
      schema: grilleDeuxGestesSynthese,
      micros: ["cm2_oral_ecouter_defi"],
    },
  ],
  reel: {
    texte:
      "Tu fais la différence tous les jours sans la nommer. Quand quelqu'un te raconte un film pendant vingt minutes, tu ne peux pas le redire en vingt minutes — et si on te demande « ça parlait de quoi ? », tu réponds en une phrase. C'est une synthèse, et tu la réussis parce que tu as suivi. Essaie maintenant avec un film que tu as regardé d'un œil, en faisant autre chose : tu diras aussi une phrase, mais elle sera fausse ou vide. Voilà pourquoi la brièveté est un test et pas un style. Elle ne se décide pas au moment de parler : elle est déjà jouée pendant que l'autre parlait.",
  },
  historique: {
    texte:
      "Le mot « écouter » vient du latin AUSCULTARE, et le français en a tiré deux mots au lieu d'un : « écouter » et « ausculter ». Le second est resté au médecin, qui pose son oreille pour chercher un détail précis à l'intérieur d'un ensemble : un bruit anormal parmi tous les bruits normaux du corps. C'est exactement ce que le programme demande au CM2 — l'idée principale ET des détails —, et le latin l'avait mis dans un seul verbe. Autrement dit, écouter n'a jamais voulu dire recevoir du son : depuis le début, cela veut dire chercher quelque chose dans ce qu'on entend.",
  },
  formule: {
    contexte: "Le test qui prouve, en dix secondes, qu'on a écouté et trié.",
    expression: "redis-le en une phrase",
    legende:
      "Avec TES mots — c'est la reformulation. En UNE phrase — c'est la synthèse. Si tu n'y arrives qu'en reprenant les mots de l'autre, tu n'as pas compris. Si tu n'y arrives qu'en cinq phrases, tu n'as pas trié.",
    schema: grilleDeuxGestesSynthese,
  },
  methode: [
    {
      titre: "Écouter avec une question en tête",
      texte:
        "« De quoi ça parle ? » et « qu'est-ce que je dois retenir ? ». Sans question, on entend tout et l'on ne retient rien.",
      schema: deuxNiveaux,
      micros: ["cm2_oral_ecouter"],
    },
    {
      titre: "Ne pas couper, même pour aider",
      texte:
        "Finir la phrase de l'autre semble poli et fait manquer la fin. Or c'est souvent à la fin qu'on apprend ce qu'il voulait dire.",
      schema: jusquauBout,
      micros: ["cm2_oral_ecouter"],
    },
    {
      titre: "Redire dans sa tête, avec ses mots",
      texte:
        "Pendant que l'autre parle. Si aucun mot à toi ne vient, c'est le signal : tu suis le son sans suivre le sens.",
      schema: avecSesMots,
      micros: ["cm2_oral_reformuler"],
    },
    {
      titre: "Se donner une phrase, pas deux",
      texte:
        "La contrainte fait le tri à ta place : avec une seule phrase, tu es obligé de choisir l'idée principale.",
      schema: plusCourtDoncTrie,
      micros: ["cm2_oral_ecouter_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour comprendre une consigne du premier coup",
      detail:
        "Être attentif et ne pas parler en même temps. La plupart des consignes ratées ont été couvertes, pas mal expliquées.",
      schema: seRendreDisponible,
      micros: ["cm2_oral_ecouter"],
    },
    {
      titre: "Pour rattraper ce qu'on n'a pas compris",
      detail:
        "Poser une question. C'est permis, c'est utile, et cela coute moins cher que de deviner pendant l'exercice.",
      schema: questionnerEstPermis,
      micros: ["cm2_oral_ecouter"],
    },
    {
      titre: "Pour prouver qu'on a suivi",
      detail:
        "Reformuler avec ses mots. Un élève qui répète la phrase du maitre n'a encore rien montré.",
      schema: repeterNeProuveRien,
      micros: ["cm2_oral_reformuler"],
    },
    {
      titre: "Pour raconter un cours à quelqu'un d'absent",
      detail:
        "C'est une synthèse en vrai : il faut faire court, et surtout ne pas perdre l'essentiel en route.",
      schema: entenduUneSeuleFois,
      micros: ["cm2_oral_ecouter_defi"],
    },
  ],
  exemples: [
    {
      titre: "Bien écouter une consigne",
      donnees: "« Pour bien écouter une consigne, il faut… »",
      schema: seRendreDisponible,
      question: "Il faut quoi ?",
      solution:
        "ÊTRE ATTENTIF ET NE PAS PARLER EN MÊME TEMPS. Ce n'est pas une règle de politesse : on n'entend pas ce que sa propre voix couvre. Écouter, c'est SE RENDRE DISPONIBLE pour comprendre — et cela se décide avant que l'autre commence à parler.",
      micros: ["cm2_oral_ecouter"],
    },
    {
      titre: "Écouter jusqu'au bout",
      donnees: "« Écouter quelqu'un jusqu'au bout permet de… »",
      schema: jusquauBout,
      question: "Permet de quoi ?",
      solution:
        "VRAIMENT COMPRENDRE CE QU'IL VEUT DIRE. Une phrase coupée au milieu dit souvent le contraire de la phrase entière — et beaucoup de désaccords n'ont pas d'autre cause que celle-là.",
      micros: ["cm2_oral_ecouter"],
    },
    {
      titre: "Poser une question",
      donnees: "« Poser une question pour mieux comprendre, c'est… »",
      schema: questionnerEstPermis,
      question: "C'est quoi ?",
      solution:
        "UTILE ET PERMIS DANS UN ÉCHANGE. Ce n'est ni couper la parole, ni avouer qu'on n'a pas suivi. C'est le seul moyen de rattraper ce qui manque au moment où cela manque — après, il faudra deviner.",
      micros: ["cm2_oral_ecouter"],
    },
    {
      titre: "Reformuler",
      donnees: "« Reformuler ce qu'on a entendu, c'est le redire… »",
      schema: avecSesMots,
      question: "Le redire comment ?",
      solution:
        "AVEC SES PROPRES MOTS. Pas plus fort, pas plus lentement, pas avec les mots exacts de celui qui a parlé. C'est justement parce que ce sont TES mots que cela prouve quelque chose : on ne peut pas les trouver sans avoir compris.",
      micros: ["cm2_oral_reformuler"],
    },
    {
      titre: "Deux résumés qui font une phrase",
      donnees: "Deux élèves résument le même exposé en une phrase. L'une est juste, l'autre non.",
      schema: courtParOubli,
      question: "Qu'est-ce qui les sépare ?",
      solution:
        "L'UNE A TRIÉ, L'AUTRE A OUBLIÉ. Les deux font court — la brièveté ne dit rien à elle seule. Ce qui se vérifie, c'est l'IDÉE PRINCIPALE : la synthèse la garde, l'oubli la perd sans même s'en apercevoir.",
      micros: ["cm2_oral_reformuler"],
    },
    {
      titre: "Le défi",
      donnees: "On te lit un texte UNE SEULE FOIS, puis on te demande l'essentiel.",
      schema: entenduUneSeuleFois,
      question: "Comment t'y prends-tu ?",
      solution:
        "EN ÉCOUTANT AVEC UNE QUESTION EN TÊTE, dès la première seconde. Il n'y aura pas de retour en arrière — c'est ce qui sépare l'écoute de la lecture. Sans question, on entend tout et l'on ne retient rien ; avec une question, on trie pendant qu'on écoute.",
      micros: ["cm2_oral_ecouter_defi"],
    },
  ],
  pieges: [
    "Parler en même temps : on n'entend pas ce que sa propre voix couvre.",
    "Couper pour aider : c'est souvent à la fin qu'on apprend ce que l'autre voulait dire.",
    "Ne retenir que l'idée principale : le CM2 demande aussi des détails.",
    "Ne retenir que des détails : on a tout entendu sans savoir de quoi il s'agissait.",
    "Répéter la phrase entendue en croyant reformuler : cela ne prouve rien.",
    "Croire que faire court suffit : l'oubli fait court aussi.",
    "Écouter sans question en tête : on entend tout et l'on ne retient rien.",
  ],
  aRetenir: [
    "Reformuler prouve qu'on a compris ; synthétiser prouve qu'on a trié.",
    "Reformuler, c'est redire avec SES mots — répéter ne prouve rien.",
    "Synthétiser, c'est redire plus court sans perdre l'idée principale.",
    "Le CM2 demande l'idée principale ET des détails, en une seule écoute.",
    "Poser une question pour mieux comprendre est utile et permis.",
  ],
  entrainement: [
    {
      question: "« Pour bien écouter une consigne, il faut… »",
      correction: "Être attentif et ne pas parler en même temps.",
      micros: ["cm2_oral_ecouter"],
    },
    {
      question: "« Écouter quelqu'un jusqu'au bout permet de… »",
      correction: "Vraiment comprendre ce qu'il veut dire.",
      micros: ["cm2_oral_ecouter"],
    },
    {
      question: "« Reformuler ce qu'on a entendu, c'est le redire… »",
      correction: "Avec ses propres mots.",
      micros: ["cm2_oral_reformuler"],
    },
    {
      question: "Tu répètes exactement la phrase du maitre. As-tu reformulé ?",
      correction: "Non : on peut répéter sans avoir compris. Il faut TES mots.",
      micros: ["cm2_oral_reformuler"],
    },
    {
      question: "Ton résumé tient en une phrase, mais on n'y voit plus le sujet.",
      correction: "Tu as fait court par oubli : une synthèse garde l'idée principale.",
      micros: ["cm2_oral_reformuler"],
    },
    {
      question: "On te lit un texte une seule fois. Que fais-tu dès le début ?",
      correction: "Tu écoutes avec une question en tête : de quoi ça parle ?",
      micros: ["cm2_oral_ecouter_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesOralEcouterCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Écouter pour comprendre - CM2",
    section: {
      type: "objectif",
      phrase: "Reformuler n'est pas synthétiser",
      sousPhrase:
        "L'un prouve qu'on a compris, l'autre qu'on a trié. Le CM2 demande les deux.",
      encadre: {
        titre: "L'idée",
        texte: "Faire court par oubli fait court aussi. Ce n'est pas une synthèse.",
      },
    },
  },
  {
    titre: "Les deux gestes",
    badge: "Écouter pour comprendre - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Reformuler",
        contenu: "Même longueur, TES mots. Un perroquet ne reformule pas.",
      },
      droite: {
        titre: "Synthétiser",
        contenu: "Mêmes idées, moins de mots. Il faut décider ce qui saute.",
      },
    },
    schema: grilleDeuxGestes,
  },
  {
    titre: "Deux niveaux en une écoute",
    badge: "Écouter pour comprendre - CM2",
    section: {
      type: "etapes",
      etapes: [
        "L'IDÉE PRINCIPALE : de quoi ça parle.",
        "DES DÉTAILS : la preuve que tu y étais vraiment.",
        "Rien que l'idée : tu as écouté de loin.",
        "Rien que des détails : tu n'as pas hiérarchisé.",
      ],
    },
    schema: deuxNiveaux,
  },
  {
    titre: "Se rendre disponible",
    badge: "Écouter pour comprendre - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Ne pas parler", texte: "On n'entend pas ce que sa voix couvre." },
        { titre: "Ne pas couper", texte: "La fin dit souvent ce qu'il voulait dire." },
        { titre: "Questionner", texte: "C'est permis, et cela rattrape ce qui manque." },
        { titre: "Une question en tête", texte: "Sans elle, on entend tout et on ne retient rien." },
      ],
    },
    schema: seRendreDisponible,
  },
  {
    titre: "Le test en dix secondes",
    badge: "Écouter pour comprendre - CM2",
    section: {
      type: "etapes",
      etapes: [
        "REDIS-LE EN UNE PHRASE.",
        "Avec TES mots — c'est la reformulation.",
        "En UNE phrase — c'est la synthèse.",
        "Il te faut cinq phrases ? Tu n'as pas trié.",
      ],
    },
    schema: plusCourtDoncTrie,
  },
  {
    titre: "À vous",
    badge: "Écouter pour comprendre - CM2",
    section: {
      type: "exercice",
      enonce: "Deux élèves résument le même exposé en une phrase. L'une est juste, l'autre non.",
      question: "Qu'est-ce qui les sépare ?",
      indice: "La longueur est la même. Cherche ailleurs.",
      correction:
        "L'UNE A TRIÉ, L'AUTRE A OUBLIÉ. Ce qui se vérifie, c'est l'IDÉE PRINCIPALE : la synthèse la garde, l'oubli la perd sans s'en apercevoir.",
    },
    schema: courtParOubli,
  },
];
