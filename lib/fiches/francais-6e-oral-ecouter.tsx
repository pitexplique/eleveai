// ─── Fiche de cours : écouter pour comprendre (6e) ────────────────────────────
// PREMIÈRE FICHE DU DOMAINE DE L'ORAL EN 6e, qui n'avait rien.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. Compétence « Écouter pour comprendre » (BO6EFRO).
//
// ⛔ PIÈGE DE CLASSE : `oral_ecouter` EXISTE AUSSI EN 5e, sous le même nom. La 5e
// (cycle 4) travaille CE QU'ON NOTE en écoutant — ranger ce qu'on entend en
// thèse, argument, exemple — et ce que l'orateur ATTEND de l'auditeur (« je
// sais », « j'adhère », « je fais »). La 6e travaille autre chose : orienter son
// écoute par un BUT, reformuler, reconnaitre un GENRE DE DISCOURS, exprimer un
// ressenti, et noter des mots clés. Aucun recouvrement.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE, ET ELLE EST DANS LE FIXED BANK : SAVOIR CE
// QU'ON CHERCHE CHANGE CE QU'ON ENTEND. « Cherchez les causes de l'éruption »,
// dit avant l'écoute, « oriente ton écoute vers un but précis ». C'est ce que le
// programme appelle une écoute ACTIVE, et ce n'est pas une question d'effort :
// deux élèves également attentifs, l'un avec un but et l'autre sans, ne
// retiennent pas la même chose du même enregistrement. L'attention ne se
// commande pas ; l'orientation, si.
//
// ⭐ ET REFORMULER PROUVE, RÉPÉTER NE PROUVE RIEN. « Reformuler prouve qu'on a
// compris : répéter mot pour mot ne le prouve pas. » Un perroquet répète. C'est
// pour cela qu'on demande à un élève de redire une consigne AVEC SES MOTS — non
// pour vérifier qu'il a entendu, mais pour vérifier qu'il a compris.
//
// ⭐ LE DÉFI EST MÉCANIQUE, COMME LA COPIE : quand on n'entend un propos qu'une
// fois, on note des MOTS CLÉS — « écrire des phrases entières fait perdre la
// suite ». Même analyse que pour `ecriture_main` : ce n'est pas une question
// d'application, c'est une question de ce qu'on peut faire pendant que ça
// continue.
//
// ⭐ ET DEUX DISTINCTIONS QUI SE TIENNENT EN UNE PHRASE CHACUNE : reconnaitre le
// GENRE d'un discours, c'est reconnaitre À QUOI IL SERT (informer, raconter,
// convaincre) ; et le RESSENTI n'est pas le contenu — c'est ce que le texte t'a
// fait éprouver, pas le nom de l'auteur ni le nombre de personnages.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Bande `nature` centrée sur son mot ; `number_line` centre
// aussi son étiquette sur la valeur — pas de point sur une borne.
//
// Alignée sur le pool ORAL de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `6e_fr_fixed_ecoute_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `oral_ecouter`) :
// - 6e_oral_ecouter        → figure, propriétés 1 à 3, formule, méthode 1,
//                            usage 1, exemples 1 et 2
// - 6e_oral_reformuler     → propriétés 4 et 5, méthode 2, usage 2, exemple 3
// - 6e_oral_genres_discours → propriété 6, méthode 3, usage 3, exemple 4
// - 6e_oral_ressenti       → propriétés 7 et 8, usage 4, exemple 5
// - 6e_oral_ecouter_defi   → propriétés 9 et 10, méthode 4, exemple 6

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

/** Les genres de discours, et ce qu'ils servent. ⚠️ Cellules courtes : à la
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

// ─── Ce qui se dessine quand on écoute ────────────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : le but change ce qu'on entend.
const butAvantEcoute = phrase({
  mots: [
    { texte: "cherche les causes", focus: true },
    { texte: "tu les entends" },
  ],
  liens: [{ de: 0, vers: 1, label: "avant", type: "question" }],
  legende: "La consigne donnée AVANT oriente l'écoute — et change ce qu'on retient.",
});

const memeEcouteDeuxResultats = phrase({
  mots: [
    { texte: "sans but", barre: true },
    { texte: "avec un but", focus: true },
  ],
  legende: "Même attention, même enregistrement, et deux résultats différents.",
});

const ecouterNestPasNoterTout = phrase({
  mots: [
    { texte: "noter chaque mot", barre: true },
    { texte: "les idées", focus: true },
  ],
  legende: "Écouter, c'est se rendre disponible — pas transcrire ce qui se dit.",
});

// ── REFORMULER : ce qui prouve, et ce qui ne prouve rien.
const reformulerProuve = phrase({
  mots: [
    { texte: "répéter mot à mot", barre: true },
    { texte: "avec tes mots", focus: true },
  ],
  legende: "Reformuler prouve qu'on a compris. Répéter ne prouve rien du tout.",
});

const questionPermise = phrase({
  mots: [
    { texte: "une question" },
    { texte: "permise", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "toujours", type: "question" }],
  legende: "Poser une question pour mieux comprendre est utile, et jamais impoli.",
});

// ── LE GENRE DE DISCOURS : à quoi il sert.
const grilleGenresDiscours = grille({
  headers: ["Ce que tu entends", "À quoi ça sert"],
  rows: [
    { values: ["la météo", "informer"] },
    { values: ["un conte", "raconter"] },
    { values: ["un débat", "confronter"] },
    { values: ["une consigne", "faire agir"] },
  ],
  caption: "Reconnaitre un genre, c'est reconnaitre à quoi il sert.",
});

const grilleGenresMeteo = grille({
  headers: ["Ce que tu entends", "À quoi ça sert"],
  rows: [
    { values: ["la météo", "informer"] },
    { values: ["un conte", "raconter"] },
    { values: ["un débat", "confronter"] },
    { values: ["une consigne", "faire agir"] },
  ],
  highlight: { row: 0 },
  caption: "« Et maintenant, la météo de votre samedi » : on informe d'un fait à venir.",
});

// ── LE RESSENTI : ce que ça t'a fait, pas ce qu'il y avait dedans.
const ressentiNestPasContenu = phrase({
  mots: [
    { texte: "ce qu'il y avait", barre: true },
    { texte: "ce que ça t'a fait", focus: true },
  ],
  legende: "Le ressenti est personnel : ni l'auteur, ni le nombre de personnages.",
});

const ecouterJusquAuBout = phrase({
  mots: [
    { texte: "préparer ta réponse", barre: true },
    { texte: "écouter la fin", focus: true },
  ],
  legende: "Préparer sa réponse pendant qu'il parle, c'est cesser d'écouter.",
});

// ── LE DÉFI : une seule écoute, des mots clés.
const motsClesPasDePhrases = phrase({
  mots: [
    { texte: "des phrases", barre: true },
    { texte: "des mots clés", focus: true },
  ],
  legende: "Écrire des phrases entières fait perdre la suite. Les mots clés suffisent.",
});

const uneSeuleEcoute = phrase({
  mots: [
    { texte: "une seule fois" },
    { texte: "pendant, pas après", focus: true },
  ],
  legende: "Attendre la fin pour tout écrire ne marche pas : ça continue sans toi.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOralEcouter6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "oral-ecouter",
  titre: "Écouter pour comprendre en 6e (2026-2027)",
  accroche:
    "SAVOIR CE QU'ON CHERCHE CHANGE CE QU'ON ENTEND. Deux élèves également attentifs, devant le même enregistrement : celui à qui l'on a dit « cherche les causes » les entendra, l'autre non. Ce n'est pas une question d'effort — l'attention ne se commande pas. L'orientation, elle, se décide avant d'écouter, et elle coute une phrase.",
  identite: [
    { label: "Mots clés", valeur: "But, reformuler, genre, ressenti, mots clés" },
    { label: "Le secret", valeur: "Le but oriente ce que tu entends" },
    { label: "Outil", valeur: "Qu'est-ce que je cherche ?" },
  ],
  definition: {
    texte:
      "ÉCOUTER POUR COMPRENDRE, ce n'est pas seulement se taire. C'est d'abord une écoute ACTIVE, c'est-à-dire ORIENTÉE PAR UN BUT : une consigne donnée avant l'écoute — « cherchez les causes de l'éruption » — change ce que l'on retient, à attention égale. Ce n'est pas non plus noter chaque mot prononcé : on repère LES IDÉES IMPORTANTES. REFORMULER ce qu'on a entendu, c'est le redire AVEC SES PROPRES MOTS — et c'est ce qui prouve qu'on a compris, alors que répéter mot pour mot ne prouve rien. RECONNAITRE LE GENRE d'un discours, c'est reconnaitre À QUOI IL SERT : une chronique informe, un conte raconte, un débat confronte, une consigne fait agir. EXPRIMER SON RESSENTI, c'est dire ce que le texte t'a fait ÉPROUVER — pas le nom de l'auteur ni la durée de l'enregistrement. Enfin, quand on n'entend un propos QU'UNE SEULE FOIS, on note DES MOTS CLÉS pendant l'écoute : écrire des phrases entières fait perdre la suite, et attendre la fin pour tout écrire ne marche pas non plus.",
  },
  figure: {
    schema: pile(butAvantEcoute, memeEcouteDeuxResultats),
    legende:
      "L'arc part de la consigne et pointe vers ce qu'on entendra : il va donc dans le sens du temps, mais il agit à l'envers — c'est ce qui est dit AVANT qui décide de ce qui sera perçu APRÈS. En bas, la comparaison qui explique tout : la même personne, la même attention, le même enregistrement — et deux résultats différents selon qu'on lui a donné un but ou non. On répète aux élèves « sois attentif », qui ne se commande pas. « Cherche ceci », si.",
  },
  proprietes: [
    {
      titre: "Une consigne donnée avant oriente l'écoute",
      texte:
        "« Cherchez les causes » ne raccourcit rien et ne dispense d'aucune partie : cela dirige l'attention vers un but précis, et l'on entend autrement.",
      schema: butAvantEcoute,
      micros: ["6e_oral_ecouter"],
    },
    {
      titre: "Écouter n'est pas transcrire",
      texte:
        "Noter chaque mot prononcé est impossible et inutile. On repère les idées importantes, et l'on se rend disponible pour comprendre.",
      schema: ecouterNestPasNoterTout,
      micros: ["6e_oral_ecouter"],
    },
    {
      titre: "Écouter jusqu'au bout",
      texte:
        "Préparer sa réponse pendant que l'autre parle, c'est cesser d'écouter. On n'entend plus alors que ce qui confirme ce qu'on allait dire.",
      schema: ecouterJusquAuBout,
      micros: ["6e_oral_ecouter"],
    },
    {
      titre: "Reformuler prouve, répéter ne prouve rien",
      texte:
        "Redire avec ses propres mots montre qu'on a compris. Répéter mot pour mot montre seulement qu'on a entendu — un perroquet en fait autant.",
      schema: reformulerProuve,
      micros: ["6e_oral_reformuler"],
    },
    {
      titre: "Poser une question est permis",
      texte:
        "Ce n'est ni interdit, ni une perte de temps, ni impoli : questionner pour mieux comprendre fait partie de l'écoute, et c'est même son signe.",
      schema: questionPermise,
      micros: ["6e_oral_reformuler"],
    },
    {
      titre: "Un genre de discours se reconnait à son but",
      texte:
        "La météo informe, un conte raconte, un débat confronte, une consigne fait agir. Savoir lequel on écoute dit comment l'écouter.",
      schema: grilleGenresDiscours,
      micros: ["6e_oral_genres_discours"],
    },
    {
      titre: "Le ressenti n'est pas le contenu",
      texte:
        "Ce que le texte t'a fait éprouver — pas le nom de l'auteur, pas le nombre de personnages, pas la durée. Cela ne se trouve que chez toi.",
      schema: ressentiNestPasContenu,
      micros: ["6e_oral_ressenti"],
    },
    {
      titre: "Et il n'a pas à ressembler à celui du voisin",
      texte:
        "Deux personnes peuvent éprouver deux choses différentes en écoutant le même texte, et aucune des deux ne se trompe.",
      schema: ressentiNestPasContenu,
      micros: ["6e_oral_ressenti"],
    },
    {
      titre: "Une seule écoute : des mots clés",
      texte:
        "Écrire des phrases entières fait perdre la suite — pendant que tu écris, cela continue. Des mots clés suffisent à reconstruire le propos.",
      schema: motsClesPasDePhrases,
      micros: ["6e_oral_ecouter_defi"],
    },
    {
      titre: "On note pendant, pas après",
      texte:
        "Attendre la fin pour tout écrire ne marche pas davantage : ce qu'on ne note pas au moment où on l'entend est déjà en train de partir.",
      schema: uneSeuleEcoute,
      micros: ["6e_oral_ecouter_defi"],
    },
  ],
  reel: {
    texte:
      "Tu as éprouvé cent fois l'effet du but sur l'écoute. Quand tu attends ton nom dans une liste, tu l'entends au milieu du bruit — et tu ne retiens rien des autres noms. Quand quelqu'un te dit « écoute bien, il y a un piège », tu écoutes autrement la même phrase. C'est cela, l'écoute active, et cela n'a rien à voir avec la concentration : c'est une question de consigne. Alors donne-la-toi. Avant un exposé, avant une vidéo de cours, avant une consigne longue : « qu'est-ce que je cherche ? ». Une phrase, et tu n'écoutes plus la même chose. Et si tu n'as pas compris, pose la question — c'est permis, et c'est même le signe que tu écoutais.",
  },
  historique: {
    texte:
      "Avant l'imprimerie, enseigner voulait dire lire à voix haute. Le mot « lecture », dans les universités du Moyen Âge, désignait le cours lui-même : un maitre lisait un texte rare, souvent unique, et les étudiants notaient — car ils ne posséderaient jamais le livre. Personne ne pouvait écrire aussi vite qu'on parle, et ils ont donc inventé des systèmes d'abréviations, parfois très élaborés, pour tenir la cadence. Autrement dit, la prise de notes par mots clés n'est pas une astuce moderne : c'est la solution qu'on a trouvée à un problème vieux de huit siècles, et le problème n'a pas changé. Pendant que tu écris une phrase entière, celui qui parle en a dit trois.",
  },
  formule: {
    contexte: "La phrase à se dire avant d'écouter quoi que ce soit d'un peu long.",
    expression: "qu'est-ce que je cherche ?",
    legende:
      "Une réponse, même approximative, suffit à orienter toute l'écoute qui suit. Sans elle, tu écoutes tout également — donc tu ne retiens presque rien. Le professeur qui donne une consigne avant un enregistrement ne fait pas autre chose : il t'épargne d'avoir à te la poser toi-même.",
    schema: butAvantEcoute,
  },
  methode: [
    {
      titre: "Se donner un but avant d'écouter",
      texte:
        "Une question, écrite ou pensée : « qu'est-ce que je cherche ? ». Si le professeur l'a donnée, relis-la juste avant que cela commence.",
      schema: butAvantEcoute,
      micros: ["6e_oral_ecouter"],
    },
    {
      titre: "Redire avec ses mots, à voix basse",
      texte:
        "Après une consigne, reformule-la pour toi. Si tu n'y arrives pas, tu ne l'as pas comprise — et tu le sais avant d'avoir commencé le travail.",
      schema: reformulerProuve,
      micros: ["6e_oral_reformuler"],
    },
    {
      titre: "Se demander à quoi ça sert",
      texte:
        "Informer, raconter, confronter, faire agir. La réponse te dit quoi noter : des faits, une histoire, des arguments, ou des étapes.",
      schema: grilleGenresDiscours,
      micros: ["6e_oral_genres_discours"],
    },
    {
      titre: "Noter des mots, jamais des phrases",
      texte:
        "Trois ou quatre mots par idée. Tu reconstruiras après — et tu n'auras rien perdu de ce qui se disait pendant que tu écrivais.",
      schema: motsClesPasDePhrases,
      micros: ["6e_oral_ecouter_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour suivre un exposé sans décrocher",
      detail:
        "Donne-toi une question avant qu'il commence. Tu auras quelque chose à chercher, et chercher tient l'attention bien mieux que la volonté.",
      schema: memeEcouteDeuxResultats,
      micros: ["6e_oral_ecouter"],
    },
    {
      titre: "Pour être sûr d'avoir compris une consigne",
      detail:
        "Redis-la avec tes mots. C'est le seul test qui marche — et il se fait en cinq secondes, avant de perdre une heure sur autre chose.",
      schema: reformulerProuve,
      micros: ["6e_oral_reformuler"],
    },
    {
      titre: "Pour savoir quoi noter",
      detail:
        "Le genre le dit. Dans une chronique, des faits ; dans un débat, qui pense quoi ; dans une consigne, les étapes et l'ordre.",
      schema: grilleGenresMeteo,
      micros: ["6e_oral_genres_discours"],
    },
    {
      titre: "Pour dire ce qu'un texte lu t'a fait",
      detail:
        "On ne te demande ni un résumé ni une analyse : ce que tu as éprouvé. C'est court, c'est personnel, et cela ne se corrige pas.",
      schema: ressentiNestPasContenu,
      micros: ["6e_oral_ressenti"],
    },
  ],
  exemples: [
    {
      titre: "Bien comprendre un exposé",
      donnees: "« Pour bien comprendre un exposé oral, il faut… »",
      schema: ecouterNestPasNoterTout,
      question: "Il faut quoi ?",
      solution:
        "ÉCOUTER ATTENTIVEMENT ET REPÉRER LES IDÉES IMPORTANTES. Pas recopier chaque mot entendu — c'est impossible, et cela empêche d'écouter. Écouter pour comprendre, c'est se concentrer et retenir les idées principales, pas transcrire.",
      micros: ["6e_oral_ecouter"],
    },
    {
      titre: "Une consigne avant l'écoute",
      donnees: "On te dit avant l'écoute : « Cherchez les causes de l'éruption. »",
      schema: butAvantEcoute,
      question: "À quoi sert cette consigne ?",
      solution:
        "À ORIENTER TON ÉCOUTE VERS UN BUT PRÉCIS. Elle ne raccourcit pas l'enregistrement, elle ne te dispense pas d'écouter la fin, et elle ne remplace pas la prise de notes. Une écoute active est « orientée en fonction du but » : savoir ce qu'on cherche change ce qu'on entend.",
      micros: ["6e_oral_ecouter"],
    },
    {
      titre: "Reformuler",
      donnees: "« Reformuler ce qu'on vient d'entendre, c'est… »",
      schema: reformulerProuve,
      question: "C'est quoi ?",
      solution:
        "LE REDIRE AVEC SES PROPRES MOTS. Pas le répéter mot pour mot — cela ne prouve pas qu'on a compris —, ni en donner son avis, ni poser une question : ce sont trois autres gestes, tous utiles, mais ce n'est pas reformuler.",
      micros: ["6e_oral_reformuler"],
    },
    {
      titre: "Un genre de discours",
      donnees: "Tu entends : « Et maintenant, la météo de votre samedi. »",
      schema: grilleGenresMeteo,
      question: "Quel genre de discours ?",
      solution:
        "UNE CHRONIQUE D'INFORMATION. Ni un conte, ni un poème, ni un débat. Identifier le genre, c'est reconnaitre à quoi il sert — ici, informer sur un fait à venir. Et cela te dit aussitôt quoi retenir : des faits, pas une histoire.",
      micros: ["6e_oral_genres_discours"],
    },
    {
      titre: "Le ressenti",
      donnees: "« Exprimer son ressenti après l'écoute d'un texte, c'est dire… »",
      schema: ressentiNestPasContenu,
      question: "Dire quoi ?",
      solution:
        "CE QUE LE TEXTE T'A FAIT ÉPROUVER. Pas le nom de l'auteur, pas le nombre de personnages, pas la durée de l'enregistrement — ces trois-là sont dans le texte, et le ressenti est en toi. C'est d'ailleurs pour cela qu'il ne peut pas être faux.",
      micros: ["6e_oral_ressenti"],
    },
    {
      titre: "Le défi",
      donnees: "« Tu n'entends un propos qu'une seule fois. »",
      schema: motsClesPasDePhrases,
      question: "Que fais-tu pendant l'écoute ?",
      solution:
        "TU NOTES DES MOTS CLÉS. Écrire chaque phrase entière fait perdre la suite : pendant que tu écris, cela continue. Attendre la fin pour tout écrire ne marche pas non plus. Trois ou quatre mots par idée suffisent à reconstruire le propos ensuite.",
      micros: ["6e_oral_ecouter_defi"],
    },
  ],
  pieges: [
    "Croire qu'écouter est une affaire de volonté : c'est d'abord une affaire de but.",
    "Vouloir noter chaque mot : c'est impossible, et cela empêche d'écouter.",
    "Préparer sa réponse pendant que l'autre parle : on n'entend plus que soi.",
    "Répéter mot pour mot en croyant reformuler : cela ne prouve pas qu'on a compris.",
    "Croire qu'une question est impolie ou fait perdre du temps.",
    "Confondre le ressenti et le contenu : l'un est en toi, l'autre dans le texte.",
    "Écrire des phrases entières en une seule écoute : la suite passe pendant ce temps.",
  ],
  aRetenir: [
    "Savoir ce qu'on cherche change ce qu'on entend.",
    "Écouter, c'est repérer les idées — pas transcrire les mots.",
    "Reformuler avec ses mots prouve qu'on a compris ; répéter ne prouve rien.",
    "Un genre de discours se reconnait à ce à quoi il sert.",
    "Une seule écoute : des mots clés, notés pendant et non après.",
  ],
  entrainement: [
    {
      question: "« Pour bien écouter une consigne, il faut… »",
      correction: "Être attentif et ne pas parler en même temps.",
      micros: ["6e_oral_ecouter"],
    },
    {
      question: "« Écouter quelqu'un jusqu'au bout permet de… »",
      correction: "Vraiment comprendre ce qu'il veut dire.",
      micros: ["6e_oral_ecouter"],
    },
    {
      question: "« Poser une question pour mieux comprendre, c'est… »",
      correction: "Utile et permis dans un échange.",
      micros: ["6e_oral_reformuler"],
    },
    {
      question: "« Reformuler une consigne entendue, c'est… »",
      correction: "La redire avec ses propres mots.",
      micros: ["6e_oral_reformuler"],
    },
    {
      question: "Tu entends deux personnes défendre des avis contraires. Quel genre de discours ?",
      correction: "Un débat : il sert à confronter des points de vue.",
      micros: ["6e_oral_genres_discours"],
    },
    {
      question: "« Tu écris chaque phrase entière pendant l'écoute. » Que se passe-t-il ?",
      correction: "Tu perds la suite : pendant que tu écris, cela continue.",
      micros: ["6e_oral_ecouter_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesOralEcouter6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Écouter pour comprendre - 6e",
    section: {
      type: "objectif",
      phrase: "Le but change ce que tu entends",
      sousPhrase:
        "Deux élèves également attentifs, un seul à qui l'on a dit quoi chercher — et deux résultats.",
      encadre: {
        titre: "L'idée",
        texte: "L'attention ne se commande pas. L'orientation, si — et elle coute une phrase.",
      },
    },
  },
  {
    titre: "Écouter, ce n'est pas transcrire",
    badge: "Écouter pour comprendre - 6e",
    section: {
      type: "etapes",
      etapes: [
        "SE DONNER UN BUT avant : « qu'est-ce que je cherche ? »",
        "REPÉRER LES IDÉES, pas noter chaque mot.",
        "ÉCOUTER JUSQU'AU BOUT — préparer sa réponse, c'est cesser d'écouter.",
        "Et POSER UNE QUESTION est permis : c'est même le signe qu'on écoutait.",
      ],
    },
    schema: butAvantEcoute,
  },
  {
    titre: "Reformuler prouve, répéter ne prouve rien",
    badge: "Écouter pour comprendre - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Répéter",
        contenu: "Mot pour mot. Cela montre qu'on a entendu — un perroquet en fait autant.",
      },
      droite: {
        titre: "Reformuler",
        contenu: "Avec tes mots. Si tu n'y arrives pas, c'est que tu n'as pas compris.",
      },
    },
    schema: reformulerProuve,
  },
  {
    titre: "Un genre se reconnait à son but",
    badge: "Écouter pour comprendre - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Une chronique", texte: "Elle informe : retiens des faits." },
        { titre: "Un conte", texte: "Il raconte : retiens une histoire." },
        { titre: "Un débat", texte: "Il confronte : retiens qui pense quoi." },
        { titre: "Une consigne", texte: "Elle fait agir : retiens les étapes." },
      ],
    },
    schema: grilleGenresDiscours,
  },
  {
    titre: "Une seule écoute",
    badge: "Écouter pour comprendre - 6e",
    section: {
      type: "etapes",
      etapes: [
        "DES MOTS CLÉS — trois ou quatre par idée.",
        "Des phrases entières font perdre la suite : ça continue pendant que tu écris.",
        "Attendre la fin pour tout écrire ne marche pas non plus.",
        "On note PENDANT, et l'on reconstruit après.",
      ],
    },
    schema: motsClesPasDePhrases,
  },
  {
    titre: "À vous",
    badge: "Écouter pour comprendre - 6e",
    section: {
      type: "exercice",
      enonce: "« Exprimer son ressenti après l'écoute d'un texte, c'est dire… »",
      question: "Quoi, et pourquoi cela ne peut pas être faux ?",
      indice: "Cherche où se trouve la réponse : dans le texte, ou en toi ?",
      correction:
        "CE QUE LE TEXTE T'A FAIT ÉPROUVER. L'auteur, le nombre de personnages et la durée sont dans le texte ; ton ressenti est en toi — c'est pour cela qu'un autre peut éprouver autre chose sans se tromper.",
    },
    schema: ressentiNestPasContenu,
  },
];
