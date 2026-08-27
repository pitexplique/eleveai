// ─── Fiche de cours : l'emploi des temps et des modes (5e) ────────────────────
// LA DOUZIÈME FICHE DE LA 5e, et elle FERME LA CONJUGAISON DE LA CLASSE : les
// trois notions — formes, temps, valeurs — ont désormais leur fiche.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// Compétence « Maitriser l'emploi des temps et des modes ».
//
// ⛔⛔ L'ÉCART AVEC LA 4e EST MAXIMAL SUR CETTE NOTION, et c'est le piège le plus
// couteux de tout le chantier : LE CONDITIONNEL EST UN MODE EN 4e ET UN TEMPS DE
// L'INDICATIF EN 5e. Les deux fiches disent l'inverse et ont raison chacune pour
// sa classe. Ici, on suit le BO de 2026 : le conditionnel figure parmi les modes
// que l'intention appelle, aux côtés de l'impératif, du subjonctif et de
// l'infinitif — c'est la table MODES du socle qui le range ainsi.
//
// ⛔ ET LE PARTAGE AVEC LES DEUX AUTRES FICHES DE CONJUGAISON :
//     `conjugaison_formes` → DE QUOI une forme est faite
//     `conjugaison_temps`  → les temps à BÂTIR
//     `conjugaison_valeurs`→ ce que chaque temps EXPRIME, et quel mode choisir
// Ici on ne conjugue rien : on emploie.
//
// ⛔⛔ LA FRISE EST INTERDITE, ET C'EST DOMMAGE. `mode: "frise"` a été créé pour
// « la valeur des temps » — c'est-à-dire exactement cette fiche. Mais sa largeur
// naturelle vaut `max(size.width, 3 × largeurRepère + marges)` ≈ 420 px, quand le
// bloc le plus large d'une fiche en fait 226 : elle y tombe à 8 px de police, et
// `apercu-canvas.mjs` la refuse. Le correctif appartient à
// `lib/canvas/ConjugaisonCanvas.tsx`, fichier partagé — signalé à Frédéric, pas
// modifié. On emploie `phrase` à la place, et l'on ne perd rien : ce qui compte
// n'est pas la ligne du temps, c'est le PARTAGE DES RÔLES entre deux temps dans
// une même phrase, et le canvas de la phrase le montre mieux.
//
// ⭐ LA FIGURE : UNE SEULE PHRASE, DEUX TEMPS, DEUX MÉTIERS. « Il pleuvait depuis
// trois jours quand la porte s'ouvrit » — l'imparfait installe le décor, le passé
// simple fait avancer. Deux crochets sur une seule ligne, et le partage se voit.
// C'est ce partage qui fait tenir un récit, et aucune définition ne le montre.
//
// ⭐ ET L'ARC DE QUESTION DIT L'ANTÉRIORITÉ : « quand il eut fini, il sortit » —
// l'arc va de l'action accomplie vers celle qui suit. L'ordre des évènements
// n'est pas l'ordre des mots, et c'est précisément ce qui se rate.
//
// ⛔ RÈGLE DE COULEUR : « le décor », « ça avance », « sous condition » ne sont
// pas des fonctions et doivent rester GRIS — vérifié au rendu.
//
// Alignée sur les tables VALEURS et MODES de
// lib/tutor-v4/questionBank/5e/francais/conjugaison.bank.ts et sur la table MODES
// de socle-grammaire-conjugaison.bank.ts.
//
// Micro-compétences couvertes (les 3 de la notion `conjugaison_valeurs`) :
// - 5e_conj_valeurs  → figure, propriétés 1 à 3, formule, méthode 1, usage 1,
//                      exemples 1 et 2
// - 5e_conj_modes    → propriétés 4 et 5, méthode 2, usage 2, exemple 3
// - 5e_conj_employer → propriétés 6 à 8, méthodes 3 et 4, usage 3,
//                      exemples 4 à 6

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

// ─── Ce qui se dessine quand on emploie un temps ──────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : une phrase, deux temps, deux métiers.
const decorEtAction = phrase({
  mots: [
    { texte: "Il" },
    { texte: "pleuvait", focus: true },
    { texte: "quand" },
    { texte: "la" },
    { texte: "porte" },
    { texte: "s'ouvrit", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "le décor" },
    { mots: [3, 5], label: "ça avance" },
  ],
  legende: "L'imparfait installe, le passé simple fait avancer. Deux métiers, une phrase.",
});

const arrierePlan = phrase({
  mots: [
    { texte: "Chaque" },
    { texte: "matin" },
    { texte: "," },
    { texte: "elle" },
    { texte: "relisait", focus: true },
    { texte: "ses" },
    { texte: "notes" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 7], label: "une habitude" }],
  legende: "L'imparfait dit aussi ce qui se répétait : rien n'avance, on décrit.",
});

const actionBreve = phrase({
  mots: [
    { texte: "Un" },
    { texte: "cri" },
    { texte: "déchira", focus: true },
    { texte: "le" },
    { texte: "silence" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 5], label: "ça avance" }],
  legende: "Le passé simple : une action brève, et le récit fait un pas.",
});

// ── L'ANTÉRIORITÉ : l'arc dit ce qui était DÉJÀ fait.
const accompliAvant = phrase({
  mots: [
    { texte: "Quand" },
    { texte: "il" },
    { texte: "eut fini", focus: true },
    { texte: "," },
    { texte: "il" },
    { texte: "sortit", focus: true },
    { texte: "." },
  ],
  liens: [{ de: 5, vers: 2, label: "déjà fait", type: "question" }],
  legende: "Le temps composé dit ce qui était accompli AVANT l'autre action.",
});

const actionAVenir = phrase({
  mots: [
    { texte: "Nous" },
    { texte: "partirons", focus: true },
    { texte: "demain" },
    { texte: "à" },
    { texte: "l'aube" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 5], label: "pas encore" }],
  legende: "Le futur : une action qui n'a pas eu lieu au moment où l'on parle.",
});

// ── L'IMPÉRATIF N'ÉCRIT PAS SON SUJET.
const modeImperatif = phrase({
  mots: [
    { texte: "Ferme", focus: true, nature: "impératif" },
    { texte: "la" },
    { texte: "porte" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 3], label: "un ordre" }],
  legende: "Aucun sujet écrit : c'est le premier signe de l'impératif.",
});

const modeIndicatif = phrase({
  mots: [
    { texte: "Tu", nature: "pronom" },
    { texte: "fermes", focus: true, nature: "indicatif" },
    { texte: "la" },
    { texte: "porte" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 4], label: "un fait" }],
  legende: "Le sujet est écrit, et la phrase constate au lieu d'ordonner.",
});

// ── LES AUTRES MODES, SELON L'INTENTION.
const modeConditionnel = phrase({
  mots: [
    { texte: "Je" },
    { texte: "viendrais", focus: true },
    { texte: "si" },
    { texte: "j'avais" },
    { texte: "le" },
    { texte: "temps" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 6], label: "sous condition" }],
  legende: "Le conditionnel : le fait dépend d'une condition posée à côté.",
});

const modeSubjonctif = phrase({
  mots: [
    { texte: "Il" },
    { texte: "faut" },
    { texte: "que" },
    { texte: "tu" },
    { texte: "viennes", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 2], label: "ce qui l'appelle" }],
  legende: "Le subjonctif : le fait est voulu, craint ou envisagé — pas constaté.",
});

const modeInfinitif = phrase({
  mots: [
    { texte: "Ne" },
    { texte: "pas" },
    { texte: "courir", focus: true },
    { texte: "au" },
    { texte: "bord" },
    { texte: "du" },
    { texte: "bassin" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 7], label: "pour tous" }],
  legende: "L'infinitif : la consigne vaut pour n'importe qui, on ne nomme personne.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheConjugaisonValeurs5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "conjugaison-valeurs",
  titre: "L'emploi des temps et des modes en 5e (2026-2027)",
  accroche:
    "« Il pleuvait depuis trois jours quand la porte s'ouvrit. » Deux verbes dans une seule phrase, et deux métiers différents : le premier installe le décor, le second fait avancer l'histoire. Choisir un temps, ce n'est pas choisir un moment — c'est choisir ce que le verbe va FAIRE dans le récit.",
  identite: [
    { label: "Mots clés", valeur: "Décor, action, accompli, futur, modes" },
    { label: "Le secret", valeur: "Un temps a un métier, pas seulement une date" },
    { label: "Outil", valeur: "Est-ce que ça avance, ou est-ce que ça décrit ?" },
  ],
  definition: {
    texte:
      "Un temps ne dit pas seulement QUAND : il dit ce que le verbe fait dans la phrase. L'IMPARFAIT installe — il décrit un décor ou une habitude, et pendant ce temps le récit n'avance pas. Le PASSÉ SIMPLE fait avancer — une action brève, et l'histoire fait un pas. Les TEMPS COMPOSÉS disent ce qui était DÉJÀ accompli quand l'autre action arrive. Le FUTUR annonce ce qui n'a pas encore eu lieu. Ce partage-là est ce qui fait tenir un récit. Le MODE, lui, dit avec quelle intention on parle : l'INDICATIF présente le fait comme réel, l'IMPÉRATIF ordonne ou conseille sans écrire son sujet, le CONDITIONNEL suspend le fait à une condition, le SUBJONCTIF le donne pour voulu ou craint, et l'INFINITIF écrit une consigne valable pour n'importe qui.",
  },
  figure: {
    schema: pile(decorEtAction, accompliAvant),
    legende:
      "En haut, une seule phrase et deux temps : « pleuvait » pose le décor — il pleuvait déjà avant, il pleuvra encore après —, « s'ouvrit » fait avancer d'un coup. Les deux crochets montrent le partage des rôles, et c'est lui qui fait tenir un récit. En bas, l'arc violet dit l'antériorité : « eut fini » était DÉJÀ accompli quand « sortit » arrive. L'ordre des évènements n'est pas l'ordre des mots.",
  },
  proprietes: [
    {
      titre: "L'imparfait installe, il ne fait pas avancer",
      texte:
        "Un décor, une habitude, ce qui durait. Pendant un imparfait, l'histoire ne bouge pas — elle se met en place.",
      schema: arrierePlan,
      micros: ["5e_conj_valeurs"],
    },
    {
      titre: "Le passé simple fait avancer",
      texte:
        "Une action brève, et le récit fait un pas. « Un cri déchira le silence » : avant, on ne pouvait pas être ailleurs qu'avant.",
      schema: actionBreve,
      micros: ["5e_conj_valeurs"],
    },
    {
      titre: "Le temps composé dit ce qui est DÉJÀ fait",
      texte:
        "« Quand il eut fini, il sortit » : finir vient avant sortir, même si les deux sont au passé. C'est l'accompli.",
      schema: pile(accompliAvant, actionAVenir),
      micros: ["5e_conj_valeurs"],
    },
    {
      titre: "L'impératif n'écrit pas son sujet",
      texte:
        "« Ferme la porte » contre « tu fermes la porte » : même verbe, même personne — et un sujet en moins. C'est le premier signe.",
      schema: pile(modeImperatif, modeIndicatif),
      micros: ["5e_conj_modes"],
    },
    {
      titre: "Le mode ne se lit pas sur le verbe seul",
      texte:
        "« Ferme » et « fermes » ne diffèrent que d'une lettre. C'est la PHRASE qui dit si l'on ordonne ou si l'on constate.",
      schema: modeIndicatif,
      micros: ["5e_conj_modes"],
    },
    {
      titre: "Le conditionnel suspend le fait",
      texte:
        "« Je viendrais si j'avais le temps » : le fait n'est pas donné pour réel, il dépend d'une condition posée à côté.",
      schema: modeConditionnel,
      micros: ["5e_conj_employer"],
    },
    {
      titre: "Le subjonctif suit ce qui l'appelle",
      texte:
        "« Il faut que », « je souhaite que », « je crains que » : le fait est voulu, craint ou envisagé — jamais constaté.",
      schema: modeSubjonctif,
      micros: ["5e_conj_employer"],
    },
    {
      titre: "L'infinitif écrit pour tout le monde",
      texte:
        "« Ne pas courir au bord du bassin. » Une consigne qui vaut pour n'importe qui : on ne nomme personne, et c'est voulu.",
      schema: modeInfinitif,
      micros: ["5e_conj_employer"],
    },
  ],
  reel: {
    texte:
      "Regarde les panneaux autour de toi : ils changent de mode selon à qui ils parlent. « Ne pas stationner » — infinitif, cela vaut pour tout le monde. « Composez le code » — impératif, on s'adresse à celui qui est devant la porte. « Il est interdit de fumer » — indicatif, on présente une règle comme un fait. Un mode d'emploi, une recette, une consigne d'examen, un règlement intérieur : chacun choisit son mode, et ce choix n'est jamais neutre. « Vous devez rendre le formulaire » et « rendre le formulaire avant vendredi » ne s'adressent pas de la même façon — le premier désigne quelqu'un, le second parle à personne et donc à tous.",
  },
  historique: {
    texte:
      "Le passé simple a presque disparu de la bouche des Français, et cela s'est fait vite. Au XVIIe siècle, on le disait encore couramment ; aujourd'hui, plus personne ne raconte sa journée en disant « je pris le bus et je descendis à la troisième station ». Le passé composé l'a remplacé partout à l'oral. Mais il est resté vivant dans les livres, et il y garde une fonction que le passé composé ne remplit pas : il détache le récit du moment où l'on parle. C'est pour cela qu'il sonne « comme un roman » — il n'est plus la langue de personne, il est la langue du récit. Une forme peut donc mourir dans les conversations et continuer de travailler à l'écrit, si elle y fait un métier que rien d'autre ne fait.",
  },
  formule: {
    contexte: "La question qui choisit le temps d'un récit, phrase après phrase.",
    expression: "est-ce que ça AVANCE, ou est-ce que ça DÉCRIT ?",
    legende:
      "Ça avance ? Passé simple. Ça décrit, ça installe, ça durait ? Imparfait. C'était déjà fait avant ? Temps composé. Ce n'a pas encore eu lieu ? Futur. Un récit tient quand chaque phrase répond à cette question au lieu de mettre tout au même temps.",
    schema: decorEtAction,
  },
  methode: [
    {
      titre: "Se demander si le récit fait un pas",
      texte:
        "Après cette phrase, l'histoire a-t-elle avancé ? Oui : passé simple. Non, on plante le décor : imparfait. La question se pose phrase par phrase.",
      schema: pile(arrierePlan, actionBreve),
      micros: ["5e_conj_valeurs"],
    },
    {
      titre: "Chercher le sujet écrit",
      texte:
        "Pas de sujet devant le verbe ? Impératif. Un sujet écrit ? Indicatif. C'est le signe le plus rapide, et il ne trompe pas.",
      schema: pile(modeImperatif, modeIndicatif),
      micros: ["5e_conj_modes"],
    },
    {
      titre: "Regarder ce qui vient AVANT le verbe",
      texte:
        "« Il faut que », « je souhaite que » appellent le subjonctif. « Si » appelle le conditionnel dans l'autre moitié de la phrase.",
      schema: pile(modeSubjonctif, modeConditionnel),
      micros: ["5e_conj_employer"],
    },
    {
      titre: "Se demander à qui l'on parle",
      texte:
        "À quelqu'un de précis ? Impératif. À n'importe qui ? Infinitif. C'est l'intention qui choisit le mode, pas le verbe.",
      schema: modeInfinitif,
      micros: ["5e_conj_employer"],
    },
  ],
  usages: [
    {
      titre: "Pour écrire un récit qui tient debout",
      detail:
        "Tout à l'imparfait, rien n'avance ; tout au passé simple, il n'y a plus de décor. C'est l'alternance qui fait une histoire.",
      schema: decorEtAction,
      micros: ["5e_conj_valeurs"],
    },
    {
      titre: "Pour comprendre un ordre",
      detail:
        "« Range ta chambre » et « tu ranges ta chambre » n'ont pas le même poids. Le second constate — ou reproche.",
      schema: pile(modeImperatif, modeIndicatif),
      micros: ["5e_conj_modes"],
    },
    {
      titre: "Pour écrire une consigne ou une recette",
      detail:
        "Infinitif si elle vaut pour tous, impératif si elle s'adresse à celui qui lit. Le choix se voit, et il se sent.",
      schema: modeInfinitif,
      micros: ["5e_conj_employer"],
    },
  ],
  exemples: [
    {
      titre: "Ce que fait un imparfait",
      donnees: "« Il pleuvait depuis trois jours. »",
      schema: arrierePlan,
      question: "Qu'exprime ce temps ?",
      solution:
        "UNE DESCRIPTION, à l'arrière-plan du récit. Il pleuvait avant cette phrase, il pleuvra encore après : rien ne commence, rien ne finit. C'est le décor sur lequel l'action viendra se poser — et tant qu'on reste à l'imparfait, l'histoire ne bouge pas d'un pas.",
      micros: ["5e_conj_valeurs"],
    },
    {
      titre: "Ce qui était déjà fait",
      donnees: "« Quand il eut fini, il sortit. »",
      schema: accompliAvant,
      question: "Quelle action vient en premier ?",
      solution:
        "FINIR. Le temps composé — ici le passé antérieur — dit une action DÉJÀ ACCOMPLIE quand l'autre arrive. Les deux verbes sont au passé, mais ils ne sont pas au même moment : l'arc le montre. L'ordre des évènements n'est pas l'ordre des mots, et c'est exactement ce qui se rate en lecture.",
      micros: ["5e_conj_valeurs"],
    },
    {
      titre: "Ordonner ou constater",
      donnees: "« Ferme la porte derrière toi. » et « Tu fermes la porte derrière toi. »",
      schema: pile(modeImperatif, modeIndicatif),
      question: "Quel mode dans chaque phrase ?",
      solution:
        "IMPÉRATIF puis INDICATIF. Une seule lettre les sépare — « ferme » et « fermes » — mais le sujet fait toute la différence : l'impératif ne l'écrit pas. Le premier ordonne, le second présente le fait comme réel. Le mode ne se lit donc pas sur le verbe seul.",
      micros: ["5e_conj_modes"],
    },
    {
      titre: "Une demande qu'on veut adoucir",
      donnees: "Tu demandes quelque chose sans vouloir paraitre brusque.",
      schema: modeConditionnel,
      question: "Quel mode emploies-tu ?",
      solution:
        "LE CONDITIONNEL. « Je voudrais » au lieu de « je veux » : le fait n'est plus donné pour acquis, il est suspendu. C'est le même mode que dans « je viendrais si j'avais le temps » — et c'est le même mécanisme : on ne présente pas la chose comme réelle. ⚠️ En 5e, le conditionnel est un temps de l'indicatif ; il n'en garde pas moins cet emploi.",
      micros: ["5e_conj_employer"],
    },
    {
      titre: "Après « il faut que »",
      donnees: "« Il faut que tu ___ plus tôt. » (venir)",
      schema: modeSubjonctif,
      question: "Quelle forme, et quel mode ?",
      solution:
        "VIENNES, au SUBJONCTIF. « Il faut que » appelle toujours ce mode : le fait n'est pas constaté, il est voulu. « Il faut que tu viens » est fautif ; « il faut que tu viendras » aussi. Le mode est décidé par ce qui vient AVANT le verbe, pas par le verbe.",
      micros: ["5e_conj_employer"],
    },
    {
      titre: "Une règle affichée dans un couloir",
      donnees: "Tu rédiges un mode d'emploi valable pour n'importe qui.",
      schema: modeInfinitif,
      question: "Quel mode ?",
      solution:
        "L'INFINITIF : « ne pas courir », « appuyer sur le bouton rouge ». La consigne vaut pour tous, et l'on ne nomme personne — c'est justement pourquoi on l'emploie sur un panneau. L'impératif, lui, s'adresserait à celui qui est devant : « n'appuyez pas ». Les deux sont corrects ; ils ne parlent pas au même destinataire.",
      micros: ["5e_conj_employer"],
    },
  ],
  pieges: [
    "Écrire tout un récit au passé simple : sans imparfait, il n'y a plus de décor et l'on ne voit rien.",
    "Écrire tout un récit à l'imparfait : rien n'avance, et le lecteur attend une histoire qui ne vient pas.",
    "Lire un temps composé comme une action ordinaire : « quand il eut fini » se passe AVANT « il sortit ».",
    "Chercher le mode sur le verbe seul : « ferme » et « fermes » se ressemblent, c'est le sujet écrit qui tranche.",
    "Écrire « il faut que tu viens » : « il faut que » appelle le subjonctif, toujours.",
    "Confondre l'infinitif et l'impératif sur une consigne : le premier parle à tous, le second à celui qui lit.",
  ],
  aRetenir: [
    "Un temps a un métier : l'imparfait installe, le passé simple fait avancer.",
    "Le temps composé dit ce qui était DÉJÀ accompli quand l'autre action arrive.",
    "La question qui choisit : est-ce que ça avance, ou est-ce que ça décrit ?",
    "L'impératif n'écrit pas son sujet — c'est le signe le plus rapide.",
    "Le mode se décide par l'INTENTION, et par ce qui vient avant le verbe.",
  ],
  entrainement: [
    {
      question: "« La mer était calme ce matin-là. » Qu'exprime ce temps ?",
      correction: "Une description, à l'arrière-plan : rien n'avance encore.",
      micros: ["5e_conj_valeurs"],
    },
    {
      question: "« Elle poussa la porte et entra. » Qu'exprime ce temps ?",
      correction: "Deux actions brèves qui font avancer le récit.",
      micros: ["5e_conj_valeurs"],
    },
    {
      question: "« Il avait rangé sa chambre avant de sortir. » Que dit ce temps ?",
      correction: "Une action déjà accomplie avant une autre.",
      micros: ["5e_conj_valeurs"],
    },
    {
      question: "« Prenons le sentier de gauche. » Quel mode ?",
      correction: "L'impératif : aucun sujet écrit, et c'est un conseil.",
      micros: ["5e_conj_modes"],
    },
    {
      question: "« Nous prenons le sentier de gauche. » Et ici ?",
      correction: "L'indicatif : le sujet est écrit, on présente le fait comme réel.",
      micros: ["5e_conj_modes"],
    },
    {
      question: "Tu écris la règle d'un jeu, valable pour chaque joueur. Quel mode ?",
      correction: "L'infinitif : la consigne vaut pour tous, sans nommer personne.",
      micros: ["5e_conj_employer"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesConjugaisonValeurs5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "L'emploi des temps - 5e",
    section: {
      type: "objectif",
      phrase: "Un temps a un métier, pas seulement une date",
      sousPhrase:
        "L'imparfait installe le décor, le passé simple fait avancer. C'est ce partage qui fait tenir un récit.",
      encadre: {
        titre: "L'idée",
        texte: "« Il pleuvait quand la porte s'ouvrit. » Deux verbes, deux métiers.",
      },
    },
  },
  {
    titre: "Ce que fait chaque temps",
    badge: "L'emploi des temps - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "L'imparfait", texte: "Il installe : un décor, une habitude. Rien n'avance." },
        { titre: "Le passé simple", texte: "Il fait avancer : une action brève, et un pas." },
        { titre: "Le temps composé", texte: "Il dit ce qui était DÉJÀ fait avant l'autre." },
        { titre: "Le futur", texte: "Il annonce ce qui n'a pas encore eu lieu." },
      ],
    },
    schema: pile(decorEtAction, accompliAvant),
  },
  {
    titre: "La question qui choisit",
    badge: "L'emploi des temps - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ça AVANCE ?",
        contenu: "Passé simple. « Un cri déchira le silence. » Le récit fait un pas.",
      },
      droite: {
        titre: "Ça DÉCRIT ?",
        contenu: "Imparfait. « Il pleuvait depuis trois jours. » L'histoire ne bouge pas.",
      },
    },
    schema: pile(actionBreve, arrierePlan),
  },
  {
    titre: "L'impératif n'écrit pas son sujet",
    badge: "L'emploi des temps - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "« Ferme la porte. »",
        contenu: "Impératif : aucun sujet. On ordonne ou l'on conseille.",
      },
      droite: {
        titre: "« Tu fermes la porte. »",
        contenu: "Indicatif : le sujet est là. On présente le fait comme réel.",
      },
    },
    schema: pile(modeImperatif, modeIndicatif),
  },
  {
    titre: "Le mode suit l'intention",
    badge: "L'emploi des temps - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Je constate un fait réel ? Indicatif.",
        "J'ordonne à quelqu'un de précis ? Impératif.",
        "Le fait dépend d'une condition ? Conditionnel.",
        "Après « il faut que », « je souhaite que » ? Subjonctif. Pour tous ? Infinitif.",
      ],
    },
    schema: pile(modeSubjonctif, modeInfinitif),
  },
  {
    titre: "À vous",
    badge: "L'emploi des temps - 5e",
    section: {
      type: "exercice",
      enonce: "« Quand il eut fini, il sortit. »",
      question: "Quelle action a lieu en premier ?",
      indice: "Les deux verbes sont au passé — mais pas au même moment.",
      correction:
        "FINIR. Le temps composé dit ce qui était déjà accompli quand l'autre action arrive. L'ordre des évènements n'est pas l'ordre des mots.",
    },
    schema: accompliAvant,
  },
];
