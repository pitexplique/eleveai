// ─── Fiche de cours : comprendre, interpréter et apprécier un texte (4e) ──────
// LA CINQUIÈME FICHE DE FRANÇAIS DE LA 4e, ET LA PREMIÈRE QUI N'EST PAS DE
// L'ÉTUDE DE LA LANGUE.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020.
//
// ⭐⭐ POURQUOI ELLE EXISTE, ALORS QU'AUCUNE CLASSE N'EN A. Mesuré le 26/08/2026 :
// sur les 208 notions de français du site, les fiches ne couvrent QUE l'étude de
// la langue. La 5e a huit fiches, toutes de grammaire, d'orthographe ou de
// conjugaison ; la lecture, l'écriture, l'oral et la culture n'en ont aucune, à
// aucun niveau. La raison tacite : « il n'y a rien à dessiner ».
// Arbitrage de Frédéric, 26/08 : « une fiche de méthode sans dessin resterait
// utile à un élève. D'accord avec toi ! »
//
// ⛔⛔ ET CE N'EST PAS UNE FICHE SANS DESSIN — C'EST LA DÉCOUVERTE DE L'ÉCRITURE.
// Première version : six blocs nus, parce que « comment dessiner une méthode de
// lecture ? ». Frédéric, le 26/08 : « je suis sûr que tu peux trouver des
// schémas qui aident l'élève ! » Il avait raison, et le catalogue donnait déjà
// les outils. **Tous les blocs portent un dessin, et aucun n'est décoratif.**
//
// ⭐ LES TROIS OUTILS QUI ONT DÉBLOQUÉ LES BLOCS « INDESSINABLES » :
//
//   1. L'ARC DE QUESTION (`type: "question"`, violet et fléché, avec étiquette).
//      Il va de ce qu'on affirme vers ce qui le prouve : c'est le geste entier
//      de la fiche en un trait. Voir `preuveMouvement`.
//   2. LA NATURE EN GRIS au-dessus des mots (`nature:`). Trois adjectifs
//      alignés, sans verbe d'action, et l'on VOIT qu'un portrait n'est pas un
//      récit. Voir `gestePortrait`.
//   3. ⭐ LA MÊME PHRASE DESSINÉE DEUX FOIS, AVEC DES GROUPES DIFFÉRENTS. « Il
//      regarda l'homme avec le télescope » : selon que le groupe prépositionnel
//      s'accroche au verbe ou au nom, ce n'est pas la même personne qui tient
//      l'instrument. Le débat interprétatif cesse d'être une formule vague : il
//      se voit. Voir `lectureUne` et `lectureDeux`.
//
// ⚠️ Ces dessins n'illustrent PAS une règle de grammaire. C'est le même canvas
// employé pour autre chose : montrer ce qui, dans le texte, a fait comprendre.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE. Les livres sont choisis par le professeur :
// aucun titre, aucun auteur. Ce qui s'apprend ici est un geste de lecteur, et il
// doit servir sur le texte que l'élève aura devant lui, quel qu'il soit.
//
// Alignée sur lib/tutor-v4/questionBank/4e/francais/lecture-culture.bank.ts
// (tables ENSEMBLE, INDICES, IMPLICITE, APPRECIER), écrite le 25/08.
//
// Micro-compétences couvertes (les 4 de la notion `lecture_comprehension`) :
// - 4e_comp_sens_global → définition, propriété 1, méthode 1, exemple 1
// - 4e_comp_indices     → figure, propriétés 2 et 3, formule, méthode 2,
//                         exemples 2 et 3
// - 4e_comp_implicite   → propriété 4, méthode 3, exemples 4 et 5
// - 4e_comp_apprecier   → propriétés 5 et 6, méthode 4, exemples 6 et 7
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin ; la couleur
// vient du `label` du groupe, jamais de l'appelant.

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

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Ce qui se dessine dans un texte ──────────────────────────────────────────
// ⚠️ Ces dessins ne montrent pas une règle de grammaire : ils montrent CE QUI A
// FAIT COMPRENDRE. C'est le même canvas, employé pour autre chose.

// ── LA FIGURE DE RÉFÉRENCE : l'indice rendu visible. Trois mots d'un même
//    domaine, et le lieu devient menaçant sans qu'aucune phrase ne le dise.
const indiceChampLexical = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "mordait", focus: true },
    { texte: "," },
    { texte: "la" },
    { texte: "pierre" },
    { texte: "griffait", focus: true },
    { texte: "," },
    { texte: "la" },
    { texte: "nuit" },
    { texte: "guettait", focus: true },
    { texte: "." },
  ],
  legende: "Mordre, griffer, guetter : trois mots de la bête. Le lieu devient menaçant.",
});

const indiceNotationPhysique = phrase({
  mots: [
    { texte: "Ses" },
    { texte: "mains" },
    { texte: "tremblaient", focus: true },
    { texte: "," },
    { texte: "sa" },
    { texte: "gorge" },
    { texte: "était" },
    { texte: "sèche", focus: true },
    { texte: "." },
  ],
  legende: "Le mot « peur » n'est pas écrit. C'est le corps qui le dit.",
});

const indiceChangementTemps = phrase({
  mots: [
    { texte: "Il" },
    { texte: "dormait", focus: true },
    { texte: "depuis" },
    { texte: "une" },
    { texte: "heure" },
    { texte: "quand" },
    { texte: "la" },
    { texte: "porte" },
    { texte: "claqua", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "imparfait" },
    { mots: [8, 8], label: "passé simple" },
  ],
  legende: "L'imparfait dure, le passé simple rompt. C'est là que tout bascule.",
});

const indicePonctuation = phrase({
  mots: [
    { texte: "Je" },
    { texte: "crois" },
    { texte: "que" },
    { texte: "…", focus: true },
    { texte: "non" },
    { texte: "," },
    { texte: "rien" },
    { texte: "." },
  ],
  legende: "Les points de suspension font entendre l'hésitation, sans la nommer.",
});

const indiceImage = phrase({
  mots: [
    { texte: "La" },
    { texte: "ville" },
    { texte: "l'" },
    { texte: "avalait", focus: true },
    { texte: "comme" },
    { texte: "une" },
    { texte: "bouche", focus: true },
    { texte: "." },
  ],
  legende: "Une comparaison, et la ville devient un animal qui dévore.",
});

const indiceMotQuiEvalue = phrase({
  mots: [
    { texte: "Ce" },
    { texte: "prétendu", focus: true },
    { texte: "savant" },
    { texte: "reprit" },
    { texte: "la" },
    { texte: "parole" },
    { texte: "." },
  ],
  legende: "« Prétendu » n'est pas neutre : le narrateur a glissé son avis.",
});

// ── L'implicite : la phrase dit une chose, elle en fait une autre.
const impliciteReproche = phrase({
  mots: [
    { texte: "Tu" },
    { texte: "as" },
    { texte: "vu" },
    { texte: "l'heure" },
    { texte: "?", focus: true },
  ],
  legende: "Ce n'est pas une question : personne n'attend qu'on donne l'heure.",
});

const impliciteRefus = phrase({
  mots: [
    { texte: "J'" },
    { texte: "ai" },
    { texte: "beaucoup" },
    { texte: "de" },
    { texte: "travail", focus: true },
    { texte: "en" },
    { texte: "ce" },
    { texte: "moment" },
    { texte: "." },
  ],
  legende: "Invité à sortir, il refuse — sans prononcer le mot « non ».",
});

const impliciteIronie = phrase({
  mots: [
    { texte: "Élégant", focus: true },
    { texte: "," },
    { texte: "vraiment" },
    { texte: "." },
  ],
  legende: "Dit après une chute : les mots disent l'inverse de ce qu'on pense.",
});

// ── LE GESTE DU TEXTE : raconter, ou donner à voir. Deux dessins suffisent à
//    montrer la différence, et c'est ce que les élèves ne voient pas.
const gesteRaconte = phrase({
  mots: [
    { texte: "Il" },
    { texte: "poussa", focus: true },
    { texte: "la" },
    { texte: "porte" },
    { texte: "et" },
    { texte: "entra", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe" },
    { mots: [5, 5], label: "verbe" },
  ],
  legende: "Deux actions qui se suivent : le texte RACONTE.",
});

const gestePortrait = phrase({
  mots: [
    { texte: "Un" },
    { texte: "homme" },
    { texte: "ridé", nature: "adjectif" },
    { texte: "," },
    { texte: "voûté", nature: "adjectif" },
    { texte: "," },
    { texte: "silencieux", nature: "adjectif" },
    { texte: "." },
  ],
  legende: "Aucune action, trois adjectifs : le texte fait un PORTRAIT.",
});

// ── LA JUSTIFICATION, DESSINÉE. L'arc de question est violet et fléché : il va
//    de ce qu'on affirme vers ce qui le prouve. C'est le geste entier de la
//    fiche, en un trait.
const preuveMouvement = phrase({
  mots: [
    { texte: "Il" },
    { texte: "avait" },
    { texte: "peur", focus: true },
    { texte: "." },
    { texte: "Ses" },
    { texte: "mains" },
    { texte: "tremblaient", focus: true },
    { texte: "." },
  ],
  liens: [{ de: 2, vers: 6, label: "prouvé par", type: "question" }],
  legende: "À gauche ce que je comprends, à droite ce qui me le fait dire.",
});

// ── UNE APPRÉCIATION SE DÉMONTE, elle aussi : un jugement, un « parce que », un
//    fait du texte. Quand une pièce manque, le dessin le montre par un vide.
const appreciationFondee = phrase({
  mots: [
    { texte: "J'ai" },
    { texte: "trouvé" },
    { texte: "ça" },
    { texte: "long" },
    { texte: "," },
    { texte: "parce que", focus: true },
    { texte: "la" },
    { texte: "description" },
    { texte: "tient" },
    { texte: "trois" },
    { texte: "pages" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 3], label: "le jugement" },
    { mots: [6, 10], label: "le fait du texte" },
  ],
  legende: "Trois pièces : un jugement, un « parce que », un fait vérifiable.",
});

const appreciationSansAppui = phrase({
  mots: [
    { texte: "Je" },
    { texte: "n'ai" },
    { texte: "pas" },
    { texte: "aimé" },
    { texte: "," },
    { texte: "c'est" },
    { texte: "tout" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 3], label: "le jugement" }],
  legende: "Le jugement seul. Aucun « parce que » : rien ne peut se discuter.",
});

// ── DEUX LECTURES QUI TIENNENT TOUTES LES DEUX. La même phrase, deux découpages
//    en groupes — et le sens change. C'est le débat interprétatif rendu visible,
//    et c'est aussi la preuve que « plusieurs lectures » n'a rien de vague.
const lectureUne = phrase({
  mots: [
    { texte: "Il" },
    { texte: "regarda" },
    { texte: "l'homme" },
    { texte: "avec" },
    { texte: "le" },
    { texte: "télescope" },
    { texte: "." },
  ],
  groupes: [
    { mots: [2, 2], label: "objet" },
    { mots: [3, 5], label: "circonstanciel" },
  ],
  legende: "Première lecture : c'est LUI qui tient le télescope.",
});

const lectureDeux = phrase({
  mots: [
    { texte: "Il" },
    { texte: "regarda" },
    { texte: "l'homme" },
    { texte: "avec" },
    { texte: "le" },
    { texte: "télescope" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 5], label: "objet" }],
  legende: "Seconde lecture : c'est L'HOMME qui a le télescope. Les deux tiennent.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureComprehension4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "lecture-comprehension",
  titre: `Comprendre, interpréter et apprécier un texte en 4e (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Ses mains tremblaient, sa gorge était sèche. » Le mot « peur » n'est écrit nulle part, et pourtant tout le monde le lit. Interpréter, ce n'est pas deviner ni imaginer : c'est montrer du doigt ce qui, dans le texte, vous l'a fait comprendre. Une interprétation qui ne peut pas se prouver n'est qu'une impression.",
  identite: [
    { label: "Mots clés", valeur: "Indice, implicite, interprétation, appréciation, débat" },
    { label: "Le secret", valeur: "Toujours revenir au texte" },
    { label: "Outil", valeur: "La question « qu'est-ce qui me le fait dire ? »" },
  ],
  definition: {
    texte:
      "Lire un texte littéraire, c'est faire trois choses en même temps, et le programme insiste sur ce mot : simultanément. COMPRENDRE, c'est saisir ce qui est écrit — qui, quoi, dans quel ordre. INTERPRÉTER, c'est saisir ce qui n'est pas écrit mais que le texte fait entendre, et pouvoir dire sur quoi l'on s'appuie. APPRÉCIER, c'est porter un jugement — aimer, ne pas aimer, être surpris — et le fonder sur autre chose que son gout. Ces trois opérations se soutiennent : on n'interprète pas un texte qu'on n'a pas compris, et on ne juge pas honnêtement un texte qu'on n'a pas interprété.",
  },
  figure: {
    schema: pile(indiceChampLexical, indiceNotationPhysique),
    legende:
      "Deux textes où rien n'est dit, et où tout se comprend. En haut, trois verbes du même domaine — mordre, griffer, guetter — font du lieu une bête à l'affut. En bas, deux notations du corps disent la peur sans le mot. Les mots en relief sont les INDICES : ce sont eux qu'on montre du doigt quand on doit justifier.",
  },
  proprietes: [
    {
      titre: "Un texte fait quelque chose : demande-toi quoi",
      texte:
        "Raconter, décrire un lieu, faire un portrait, faire parler, faire entendre une pensée, argumenter. Six gestes, et ils ne se lisent pas pareil. Un élève qui prend un portrait pour un récit cherche une action qui n'existe pas.",
      schema: pile(gesteRaconte, gestePortrait),
      micros: ["4e_comp_sens_global"],
    },
    {
      titre: "Les indices se rangent en familles",
      texte:
        "Champ lexical, notations du corps, temps des verbes, images, ponctuation, mots qui évaluent. Nommer la famille, c'est pouvoir la retrouver dans le texte suivant.",
      schema: pile(indiceChampLexical, indiceChangementTemps, indiceImage),
      micros: ["4e_comp_indices"],
    },
    {
      titre: "Le temps des verbes raconte à lui seul",
      texte:
        "L'imparfait installe et fait durer, le passé simple rompt et fait avancer. Le point où l'un cède à l'autre est presque toujours le point où le texte bascule.",
      schema: indiceChangementTemps,
      micros: ["4e_comp_indices"],
    },
    {
      titre: "L'implicite : ce que la phrase FAIT, pas ce qu'elle dit",
      texte:
        "Une question peut accuser, une politesse peut refuser, un compliment peut se moquer. Le sens est ailleurs que dans les mots, et il se prouve quand même.",
      schema: pile(impliciteReproche, impliciteRefus, impliciteIronie),
      micros: ["4e_comp_implicite"],
    },
    {
      titre: "Une appréciation se fonde, et elle peut être un rejet",
      texte:
        "« J'ai trouvé ça long, parce que la description tient trois pages sans action » est une appréciation fondée. « Je n'ai pas aimé, c'est tout » n'en est pas une.",
      schema: pile(appreciationFondee, appreciationSansAppui),
      micros: ["4e_comp_apprecier"],
    },
    {
      titre: "Deux lectures peuvent tenir. Pas trois, pas n'importe lesquelles",
      texte:
        "Le débat interprétatif suppose que plusieurs lectures s'appuient sur le texte. Celle qui ne s'appuie sur rien n'entre pas dans le débat : elle en est exclue, poliment mais fermement.",
      schema: pile(lectureUne, lectureDeux),
      micros: ["4e_comp_sens_global", "4e_comp_apprecier"],
    },
  ],
  reel: {
    texte:
      "Ce geste ne sert pas qu'en cours de français, et c'est même là qu'il sert le moins. Un message qui dit « je regarderai ça quand j'aurai le temps » refuse sans le dire ; une annonce qui dit « poste évolutif » promet sans s'engager ; un commentaire qui dit « intéressant, dans son genre » critique en ayant l'air de complimenter. Toute la journée, on lit des phrases dont le sens n'est pas dans les mots. La différence entre quelqu'un qui s'en aperçoit et quelqu'un qui tombe dans le panneau, c'est exactement ce qui s'apprend ici : chercher ce que la phrase FAIT, et pas seulement ce qu'elle dit.",
  },
  historique: {
    texte:
      "Pendant des siècles, on a cru qu'un texte avait UN sens, caché par l'auteur, et que lire consistait à le retrouver — comme une énigme dont la solution existerait quelque part. C'est ainsi qu'on lisait les textes sacrés au Moyen Âge, en cherchant sous la lettre un sens second réservé aux savants. Le renversement est récent : au XXe siècle, des critiques ont montré qu'un texte ne délivre pas un sens, il en rend plusieurs possibles — et que le lecteur travaille autant que l'auteur. C'est de là que vient le « débat interprétatif » de ton programme. Mais attention : dire que plusieurs lectures sont possibles ne veut pas dire que toutes le sont. Le texte reste le juge, et il refuse ce qu'il ne porte pas.",
  },
  formule: {
    contexte: "La question à se poser après chaque chose comprise.",
    expression: "qu'est-ce qui, dans le texte, me le fait dire ?",
    legende:
      "Si la réponse est un mot, un temps verbal, une image ou un signe de ponctuation, l'interprétation tient et elle se défend. Si la réponse est « je le sens » ou « ça me fait penser à », ce n'est pas encore une interprétation — c'est une impression, et elle ne se discute pas.",
    schema: indiceNotationPhysique,
  },
  methode: [
    {
      titre: "Commencer par ce que le texte fait",
      texte:
        "Avant de chercher un sens caché, demande-toi si quelque chose se passe. Si oui, dans quel ordre. Si non, qu'est-ce qui occupe la place — un être, un lieu, une parole, une pensée, une idée à défendre ?",
      schema: pile(gesteRaconte, gestePortrait),
      micros: ["4e_comp_sens_global"],
    },
    {
      titre: "Souligner avant d'interpréter",
      texte:
        "Passe une première fois en soulignant ce qui te frappe : les mots qui reviennent, les images, un temps qui change, une ponctuation inhabituelle. Tu ne sais pas encore pourquoi — c'est normal, et c'est la bonne méthode.",
      schema: pile(indiceChampLexical, indicePonctuation),
      micros: ["4e_comp_indices"],
    },
    {
      titre: "Retourner en arrière après chaque compréhension",
      texte:
        "Tu as compris quelque chose ? Remonte et mets le doigt sur ce qui te l'a fait comprendre. Puis nomme la famille de l'indice : c'est elle qui te resservira ailleurs.",
      schema: indiceMotQuiEvalue,
      micros: ["4e_comp_indices", "4e_comp_implicite"],
    },
    {
      titre: "Pour l'implicite : remplacer par la version franche",
      texte:
        "Récris la phrase comme si l'on disait les choses directement. Si le remplacement change tout — « tu as vu l'heure ? » devient « tu rentres trop tard » —, c'est que le sens était ailleurs que dans les mots.",
      schema: pile(impliciteReproche, impliciteRefus),
      micros: ["4e_comp_implicite"],
    },
    {
      titre: "Pour apprécier : chercher son propre « parce que »",
      texte:
        "Note ta réaction, puis oblige-toi à écrire « parce que ». Si ce qui suit renvoie à quelque chose que le texte fait, ton jugement est fondé — même si c'est un rejet. S'il renvoie à tes gouts, c'est de toi qu'il parle.",
      schema: appreciationFondee,
      micros: ["4e_comp_apprecier"],
    },
  ],
  usages: [
    {
      titre: "En classe : justifier une réponse",
      detail:
        "« Parce que c'est écrit » ne suffit pas : on cite le mot, et on dit ce qu'il produit. C'est ce qu'attend toute question de compréhension, du contrôle au brevet.",
      schema: indiceChampLexical,
      micros: ["4e_comp_indices"],
    },
    {
      titre: "En lisant seul : repérer où le texte bascule",
      detail:
        "Le passage de l'imparfait au passé simple signale presque toujours l'évènement qui change tout. C'est un repère gratuit, valable dans n'importe quel récit.",
      schema: indiceChangementTemps,
      micros: ["4e_comp_indices"],
    },
    {
      titre: "Dans un débat : écouter la preuve, pas le ton",
      detail:
        "Une lecture assurée n'est pas une lecture fondée. Demande toujours sur quoi elle s'appuie — et accepte qu'on te le demande.",
      schema: pile(lectureUne, lectureDeux),
      micros: ["4e_comp_apprecier"],
    },
  ],
  exemples: [
    {
      titre: "Que fait ce texte ?",
      donnees: "« Rien ne bouge : le texte détaille le visage, les mains et l'allure d'un homme. »",
      schema: gestePortrait,
      question: "Quel est le geste de ce passage ?",
      solution:
        "Il fait un PORTRAIT : c'est un être qu'il donne à voir, pas une action. Chercher ce qui s'y passe serait une perte de temps — et c'est l'erreur qui fait dire à un élève que « rien ne se passe ». Rien ne se passe, en effet : ce n'est pas ce qu'on lui demande.",
      micros: ["4e_comp_sens_global"],
    },
    {
      titre: "Sur quel indice t'appuies-tu ?",
      donnees: "Tu veux montrer que le lieu est menaçant. On lit : « le vent mordait, la pierre griffait, la nuit guettait ».",
      schema: indiceChampLexical,
      question: "Quelle sorte d'indice justifie ta lecture ?",
      solution:
        "Un CHAMP LEXICAL : trois verbes du domaine de l'animal qui attaque, réunis dans la même phrase. Aucun d'eux ne dit « danger », mais leur rassemblement le produit. Nommer la famille compte autant que citer les mots : c'est elle qui te resservira sur un autre texte.",
      micros: ["4e_comp_indices"],
    },
    {
      titre: "L'indice est dans la conjugaison",
      donnees: "« Il dormait depuis une heure quand la porte claqua. »",
      schema: indiceChangementTemps,
      question: "Où le texte bascule-t-il, et qu'est-ce qui le montre ?",
      solution:
        "Sur « claqua ». L'imparfait « dormait » installe une durée, le passé simple « claqua » la rompt d'un coup. La rupture n'est pas dite, elle est CONJUGUÉE — et ce repère vaut pour n'importe quel récit au passé.",
      micros: ["4e_comp_indices"],
    },
    {
      titre: "Que fait vraiment cette phrase ?",
      donnees: "La mère ouvre la porte à minuit et demande : « Tu as vu l'heure ? »",
      schema: impliciteReproche,
      question: "Est-ce une question ?",
      solution:
        "Non : c'est un REPROCHE. La preuve se fait en répondant vraiment — « il est minuit dix » ne convient pas, et tout le monde le sait. Une question qui n'attend aucune réponse ne demande pas : elle accuse.",
      micros: ["4e_comp_implicite"],
    },
    {
      titre: "Dire non sans le mot",
      donnees: "Invité à sortir, il répond : « J'ai beaucoup de travail en ce moment. »",
      schema: impliciteRefus,
      question: "A-t-il accepté ou refusé ?",
      solution:
        "Il a REFUSÉ, poliment. Le mot « non » n'apparait pas, et pourtant personne ne s'y trompe : donner un obstacle au lieu d'une réponse, c'est refuser en laissant à l'autre la possibilité de ne pas insister.",
      micros: ["4e_comp_implicite"],
    },
    {
      titre: "Cette réaction vaut-elle quelque chose ?",
      donnees: "« J'ai trouvé ça long, parce que la description tient trois pages sans action. »",
      schema: appreciationFondee,
      question: "Est-ce une appréciation fondée ?",
      solution:
        "Oui, entièrement — et c'est pourtant un rejet. Le jugement s'appuie sur un fait du texte, vérifiable par n'importe qui : trois pages, pas d'action. Une appréciation fondée n'est pas une appréciation aimable ; c'est une appréciation qu'on peut discuter.",
      micros: ["4e_comp_apprecier"],
    },
    {
      titre: "Et celle-ci ?",
      donnees: "« Je préfère les histoires de sport, alors forcément. »",
      schema: appreciationSansAppui,
      question: "Que vaut cette réaction de lecteur ?",
      solution:
        "C'est un jugement sur SOI, pas sur le texte : elle nous apprend quelque chose sur le lecteur et rien sur le livre. Ce n'est pas interdit de le penser — c'est même honnête —, mais cela ne peut pas entrer dans un débat interprétatif, parce que rien dans le texte ne permet d'en discuter.",
      micros: ["4e_comp_apprecier"],
    },
  ],
  pieges: [
    "Chercher une action dans un texte qui n'en raconte pas : un portrait ou une description n'ont rien à « faire se passer ».",
    "Confondre interpréter et inventer : une interprétation se montre du doigt dans le texte, une invention ne s'appuie sur rien.",
    "Répondre « parce que c'est écrit » sans citer : il faut le mot ET ce qu'il produit.",
    "Croire qu'une appréciation doit être positive : « je n'ai pas aimé, parce que… » est une appréciation parfaitement fondée.",
    "Prendre le ton pour la preuve : dans un débat, une lecture assurée n'est pas une lecture justifiée.",
    "Croire que toutes les lectures se valent : plusieurs sont possibles, mais le texte refuse celles qu'il ne porte pas.",
  ],
  aRetenir: [
    "Comprendre, interpréter, apprécier : trois opérations en même temps, pas l'une après l'autre.",
    "Une interprétation se prouve. La question est toujours : qu'est-ce qui, dans le texte, me le fait dire ?",
    "Six familles d'indices : champ lexical, notations du corps, temps des verbes, images, ponctuation, mots qui évaluent.",
    "L'implicite se trouve en récrivant la phrase franchement : si tout change, le sens était ailleurs.",
    "Une appréciation fondée peut être un rejet. Une appréciation sans « parce que » n'en est pas une.",
  ],
  entrainement: [
    {
      question: "« Le texte affirme une idée, donne une raison, puis un exemple qui l'appuie. » Que fait-il ?",
      correction: "Il argumente : il cherche à faire admettre quelque chose au lecteur.",
      micros: ["4e_comp_sens_global"],
    },
    {
      question: "Tu veux montrer qu'il est épuisé. Le texte dit : « ses jambes ne le portaient plus. » Quel indice ?",
      correction: "Des notations physiques : le corps dit ce que le personnage tait.",
      micros: ["4e_comp_indices"],
    },
    {
      question: "« La ville l'avalait comme une bouche. » Quel indice, et que produit-il ?",
      correction: "Une image — une comparaison — qui fait de la ville un animal dévorant : elle porte le jugement.",
      micros: ["4e_comp_indices"],
    },
    {
      question: "Le père regarde le bulletin et dit seulement : « Bien. Très bien. » Que fait-il ?",
      correction: "De l'ironie : il dit le contraire de ce qu'il veut faire entendre.",
      micros: ["4e_comp_implicite"],
    },
    {
      question: "Le visiteur sourit : « Vous avez une bien belle maison, ici. » Que fait cette phrase ?",
      correction: "Une menace voilée : la douceur des mots dit tout autre chose.",
      micros: ["4e_comp_implicite"],
    },
    {
      question: "« C'était pas mal, dans l'ensemble, je dirais. » Que vaut cette réaction ?",
      correction: "Un avis sans appui : rien n'est dit de ce qui l'aurait provoqué, donc rien ne peut se discuter.",
      micros: ["4e_comp_apprecier"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesLectureComprehension4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Comprendre un texte - 4e",
    section: {
      type: "objectif",
      phrase: "Prouver ce qu'on a compris, au lieu de l'affirmer",
      sousPhrase:
        "Comprendre, interpréter et apprécier : trois opérations en même temps, et toutes les trois se justifient par le texte.",
      encadre: {
        titre: "L'idée",
        texte: "« Ses mains tremblaient. » Le mot « peur » n'y est pas — et tout le monde le lit.",
      },
    },
  },
  {
    titre: "La question qui change tout",
    badge: "Comprendre un texte - 4e",
    section: {
      type: "objectif",
      phrase: "Qu'est-ce qui, dans le texte, me le fait dire ?",
      sousPhrase:
        "Un mot, un temps verbal, une image, un signe de ponctuation : l'interprétation tient. « Je le sens » : ce n'est qu'une impression.",
    },
    schema: indiceNotationPhysique,
  },
  {
    titre: "Six familles d'indices",
    badge: "Comprendre un texte - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Champ lexical", texte: "Des mots d'un même domaine reviennent : « mordait, griffait, guettait »." },
        { titre: "Le corps", texte: "« Ses mains tremblaient » — le corps dit ce que le personnage tait." },
        { titre: "Le temps des verbes", texte: "L'imparfait dure, le passé simple rompt. C'est là que le texte bascule." },
        { titre: "Image, ponctuation, mot qui juge", texte: "Une comparaison, des points de suspension, un « prétendu » glissé par le narrateur." },
      ],
    },
    schema: pile(indiceChampLexical, indiceChangementTemps),
  },
  {
    titre: "Ce que la phrase FAIT",
    badge: "Comprendre un texte - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce qu'elle dit",
        contenu: "« Tu as vu l'heure ? » — une question sur l'heure.",
      },
      droite: {
        titre: "Ce qu'elle fait",
        contenu: "Un reproche. La preuve : répondre « il est minuit dix » ne convient pas.",
      },
    },
    schema: impliciteReproche,
  },
  {
    titre: "Une appréciation peut être un rejet",
    badge: "Comprendre un texte - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "Fondée",
        contenu: "« J'ai trouvé ça long, parce que la description tient trois pages sans action. »",
      },
      droite: {
        titre: "Sans appui",
        contenu: "« Je n'ai pas aimé, c'est tout. » Rien ne peut se discuter.",
      },
    },
    schema: pile(appreciationFondee, appreciationSansAppui),
  },
  {
    titre: "À vous",
    badge: "Comprendre un texte - 4e",
    section: {
      type: "exercice",
      enonce: "« Il dormait depuis une heure quand la porte claqua. »",
      question: "Où le texte bascule-t-il, et qu'est-ce qui le montre ?",
      indice: "Regarde les deux verbes, et le temps de chacun.",
      correction:
        "Sur « claqua ». L'imparfait « dormait » installe une durée, le passé simple « claqua » la rompt. La rupture n'est pas dite : elle est conjuguée.",
    },
    schema: indiceChangementTemps,
  },
];
