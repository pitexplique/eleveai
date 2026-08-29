// ─── Fiche de cours : participer à des échanges verbaux (6e) ──────────────────
// TROISIÈME FICHE D'ORAL DE LA 6e — ET ELLE FERME LE DOMAINE, DONC LA CLASSE :
// les vingt-neuf notions de 6e ont désormais leur fiche.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. Compétence « Participer à des échanges verbaux » (BO6EFRO).
//
// ⛔ PIÈGE DE CLASSE : la 5e (cycle 4) a `oral_prendre_parole`, qui travaille la
// prise de parole et la posture. La 6e travaille l'INTERACTION elle-même : ce
// qu'on fait de ce que l'autre vient de dire.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE : UN ÉCHANGE N'EST PAS UNE SUITE DE
// MONOLOGUES. Le pool l'écrit deux fois. « Intervenir en tenant compte de ce qui
// a précédemment été dit : on répond à l'autre, ON NE SE RÉPÈTE PAS. » Et la
// formule qui le prouve, donnée comme bonne réponse : « Comme le disait Nina,
// mais j'ajouterais que… » — REPRENDRE AVANT D'AJOUTER. C'est ce qui distingue
// une discussion de quatre exposés consécutifs, et c'est très exactement ce qui
// manque à la plupart des débats de classe : chacun y redit sa phrase, un peu
// plus fort.
//
// ⭐ ET LE DÉFI LE POUSSE JUSQU'AU BOUT : quelqu'un vient de dire le contraire de
// toi. La bonne réponse n'est pas « tu répètes ton argument à l'identique » —
// c'est « tu reprends son idée et tu montres OÙ tu n'es pas d'accord ». Le
// désaccord se localise ; sans cela, les deux parlent à côté l'un de l'autre.
//
// ⭐⭐ ET UN FIL QUI TRAVERSE TOUTE LA 6e, REPÉRÉ EN ÉCRIVANT CETTE FICHE : UNE
// REMARQUE N'EST UTILE QUE SI ELLE DÉSIGNE UN ENDROIT. On le retrouve dans trois
// domaines différents, formulé trois fois par les banques :
//   · en ÉCRITURE — un camarade dit « on ne comprend pas qui parle » : on agit
//     précisément là, on ne réécrit pas tout ;
//   · en LECTURE — « c'est nul » ne se discute pas, « au chapitre 3 » se discute ;
//   · à l'ORAL, ici — un regard critique utile dit « je parlais trop vite au
//     début », jamais « c'était nul ».
// Trois notions, trois domaines, une seule règle. Elle mérite d'être dite comme
// telle à l'élève.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Bande `nature` centrée sur son mot : chaque mot doit être au
// moins aussi large que son étiquette.
//
// Alignée sur le pool ORAL de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `6e_fr_fixed_ech_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `oral_echanger`) :
// - 6e_oral_codes           → propriétés 1 à 3, méthode 1, usage 1, exemple 1
// - 6e_oral_argumenter      → propriétés 4 et 5, méthode 2, usage 2, exemple 2
// - 6e_oral_interagir       → figure, propriétés 6 et 7, formule, méthode 3,
//                             usage 3, exemples 3 et 4
// - 6e_oral_regard_critique → propriétés 8 et 9, méthode 4, usage 4, exemple 5
// - 6e_oral_echanger_defi   → propriété 10, exemple 6

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

/** Les codes de l'échange, et la remarque utile. ⚠️ Cellules courtes : à la
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

// ─── Ce qui se dessine quand on échange ───────────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : reprendre avant d'ajouter.
const reprendrePuisAjouter = phrase({
  mots: [
    { texte: "« comme tu disais »", focus: true },
    { texte: "« j'ajouterais »", focus: true },
  ],
  legende: "Reprendre, puis ajouter : c'est ce qui fait d'un échange une discussion.",
});

const suiteDeMonologues = phrase({
  mots: [
    { texte: "chacun sa phrase", barre: true },
    { texte: "on se répond", focus: true },
  ],
  legende: "Quatre avis à la suite ne font pas un débat : ils font quatre exposés.",
});

// ── LES CODES : le tour de parole d'abord.
const grilleCodes = grille({
  headers: ["Ce qu'on fait", "Ce qu'on ne fait pas"],
  rows: [
    { values: ["attendre son tour", "parler plus fort"] },
    { values: ["écouter", "couper"] },
    { values: ["expliquer", "se moquer"] },
    { values: ["questionner", "changer de sujet"] },
  ],
  caption: "Un échange n'existe que si chacun peut parler.",
});

const grilleCodesTour = grille({
  headers: ["Ce qu'on fait", "Ce qu'on ne fait pas"],
  rows: [
    { values: ["attendre son tour", "parler plus fort"] },
    { values: ["écouter", "couper"] },
    { values: ["expliquer", "se moquer"] },
    { values: ["questionner", "changer de sujet"] },
  ],
  highlight: { row: 0 },
  caption: "Le tour de parole est la première règle, et elle tient tout le reste.",
});

const desaccordPoli = phrase({
  mots: [
    { texte: "pas d'accord" },
    { texte: "expliquer pourquoi", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "donc", type: "question" }],
  legende: "On donne un avis contraire en respectant celui qui l'a dit.",
});

// ── ARGUMENTER : un avis ET une raison.
const avisEtRaison = phrase({
  mots: [
    { texte: "ton avis" },
    { texte: "une raison", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "et", type: "question" }],
  legende: "Un bon argument est une raison qui explique son idée — pas un ton plus fort.",
});

const parceQueVide = phrase({
  mots: [
    { texte: "« parce que » seul", barre: true },
    { texte: "ce qui suit", focus: true },
  ],
  legende: "Répéter « parce que » sans expliquer ne justifie rien du tout.",
});

// ── INTERAGIR : localiser le désaccord.
const localiserLeDesaccord = phrase({
  mots: [
    { texte: "son idée" },
    { texte: "où ça coince", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "puis", type: "question" }],
  legende: "On reprend son idée, et l'on montre l'endroit précis du désaccord.",
});

const repeterPlusFort = phrase({
  mots: [
    { texte: "le même argument", barre: true },
    { texte: "répondre au sien", focus: true },
  ],
  legende: "Redire sa phrase à l'identique ne répond à personne, même en insistant.",
});

// ── LE REGARD CRITIQUE : précis, ou inutile.
const remarquePrecise = phrase({
  mots: [
    { texte: "« c'était nul »", barre: true },
    { texte: "« vite au début »", focus: true },
  ],
  legende: "Une remarque n'est utile que si elle désigne un endroit.",
});

const seReecouter = phrase({
  mots: [
    { texte: "se réécouter" },
    { texte: "un point à changer", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "pour trouver", type: "question" }],
  legende: "Réécouter sans rien noter ne sert à rien : on cherche UN point.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOralEchanger6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "oral-echanger",
  titre: "Participer à un échange en 6e (2026-2027)",
  accroche:
    "Un échange n'est pas une suite de monologues. Dans la plupart des débats de classe, chacun attend son tour pour redire sa phrase — un peu plus fort. La formule qui change tout tient en six mots : « comme tu disais, mais j'ajouterais que… ». On REPREND avant d'ajouter, et c'est ce qui fait d'une série d'avis une véritable discussion.",
  identite: [
    { label: "Mots clés", valeur: "Tour de parole, argument, reprendre, précis" },
    { label: "Le secret", valeur: "Reprendre avant d'ajouter" },
    { label: "Outil", valeur: "Où exactement je ne suis pas d'accord ?" },
  ],
  definition: {
    texte:
      "PARTICIPER À UN ÉCHANGE demande d'abord d'en RESPECTER LES CODES, et le premier de tous est le TOUR DE PAROLE : un échange n'existe que si chacun peut parler. On écoute sans couper, on attend son tour, et quand on n'est pas d'accord on EXPLIQUE POLIMENT POURQUOI — on ne crie pas plus fort et l'on ne se moque pas. ARGUMENTER, c'est donner son AVIS ET UNE RAISON qui l'explique : un bon argument est une raison, pas un ton. Répéter « parce que » sans rien expliquer derrière ne justifie rien. INTERAGIR, ensuite, est ce que le programme demande de plus exigeant : « intervenir en tenant compte de ce qui a précédemment été dit ». Quand quelqu'un vient de dire le contraire de toi, tu ne répètes pas ton argument à l'identique : tu REPRENDS SON IDÉE et tu montres OÙ tu n'es pas d'accord. Enfin, PORTER UN REGARD CRITIQUE sur un oral — le sien ou celui d'un autre — n'est utile que si la remarque est PRÉCISE : « je parlais trop vite au début » se répare, « c'était nul » ne se répare pas.",
  },
  figure: {
    schema: pile(reprendrePuisAjouter, suiteDeMonologues),
    legende:
      "Deux boites, et l'ordre compte : on REPREND d'abord ce que l'autre a dit, on AJOUTE ensuite. Cette formule est donnée comme bonne réponse dans la banque du coach, et elle est presque une définition : reprendre montre qu'on a écouté, ajouter montre qu'on a réfléchi. En bas, ce qui se passe quand on saute la première moitié : quatre élèves donnent quatre avis, chacun juste, et personne n'a parlé à personne. C'est le défaut le plus courant des débats de classe, et il ne vient pas d'un manque de politesse.",
  },
  proprietes: [
    {
      titre: "Le tour de parole est la première règle",
      texte:
        "Un échange n'existe que si chacun peut parler. Ce n'est pas une politesse ajoutée : c'est la condition sans laquelle il n'y a pas d'échange du tout.",
      schema: grilleCodesTour,
      micros: ["6e_oral_codes"],
    },
    {
      titre: "Quatre gestes, et leurs quatre contraires",
      texte:
        "Attendre son tour, écouter, expliquer, questionner — contre parler plus fort, couper, se moquer, changer de sujet.",
      schema: grilleCodes,
      micros: ["6e_oral_codes"],
    },
    {
      titre: "On peut n'être pas d'accord, poliment",
      texte:
        "Expliquer pourquoi, sans se moquer, sans crier, sans refuser d'écouter. Le désaccord fait partie de l'échange : c'est même ce qui le rend utile.",
      schema: desaccordPoli,
      micros: ["6e_oral_codes"],
    },
    {
      titre: "Un argument est une raison",
      texte:
        "Pas une moquerie, pas un cri, pas une phrase sans rapport. Justifier, c'est appuyer son avis sur quelque chose qu'on peut dire à voix haute.",
      schema: avisEtRaison,
      micros: ["6e_oral_argumenter"],
    },
    {
      titre: "« Parce que » ne suffit pas",
      texte:
        "Le mot annonce une raison : il ne la remplace pas. Répéter « parce que » sans expliquer derrière laisse l'avis exactement où il était.",
      schema: parceQueVide,
      micros: ["6e_oral_argumenter"],
    },
    {
      titre: "Reprendre avant d'ajouter",
      texte:
        "« Comme le disait Nina, mais j'ajouterais que… » Reprendre montre qu'on a écouté ; ajouter montre qu'on a réfléchi. Les deux, dans cet ordre.",
      schema: reprendrePuisAjouter,
      micros: ["6e_oral_interagir"],
    },
    {
      titre: "Un désaccord se localise",
      texte:
        "Tu reprends son idée, et tu montres où ça coince. Répéter ton argument à l'identique ne répond à personne — même en insistant.",
      schema: pile(localiserLeDesaccord, repeterPlusFort),
      micros: ["6e_oral_interagir"],
    },
    {
      titre: "Une remarque n'est utile que si elle désigne un endroit",
      texte:
        "« Je parlais trop vite au début » se répare. « C'était nul » ne se répare pas — et cela vaut pour ton oral comme pour celui des autres.",
      schema: remarquePrecise,
      micros: ["6e_oral_regard_critique"],
    },
    {
      titre: "Se réécouter en cherchant UN point",
      texte:
        "Réécouter sans rien noter ne sert à rien, et se comparer à un camarade non plus. On cherche un point précis à améliorer, un seul.",
      schema: seReecouter,
      micros: ["6e_oral_regard_critique"],
    },
    {
      titre: "Le défi : répondre sans répéter",
      texte:
        "Ni redire la même chose, ni changer de sujet, ni attendre la fin sans rien dire. On répond à ce qui vient d'être dit — c'est tout l'exercice.",
      schema: suiteDeMonologues,
      micros: ["6e_oral_echanger_defi"],
    },
  ],
  reel: {
    texte:
      "Tu as déjà vu la différence entre une vraie discussion et une suite de monologues : c'est celle qu'il y a entre parler avec quelqu'un et commenter sous une vidéo. Dans les commentaires, chacun écrit son avis sans lire les autres, et la même phrase revient cent fois. Dans une discussion, quelqu'un dit « oui mais toi tu parlais du début, moi je parle de la fin » — et à cet instant précis le désaccord devient utile, parce qu'on sait enfin OÙ il se trouve. C'est exactement ce que demande le programme. Et pour le regard critique : quand un ami te dit « c'était bien », tu n'en fais rien ; quand il te dit « on n'entendait pas la fin de tes phrases », tu sais quoi changer demain.",
  },
  historique: {
    texte:
      "Beaucoup de sociétés ont matérialisé le tour de parole par un OBJET : un bâton, une pierre, un bâton sculpté que l'on se passe, et seul celui qui le tient a le droit de parler. On en trouve la trace dans des conseils de nombreux peuples, sur plusieurs continents. Le procédé règle d'un coup ce que les mots ont du mal à régler : plus besoin de juger si quelqu'un a « fini », plus besoin d'arbitre, plus de course à celui qui parlera le plus fort — l'objet est là ou il n'y est pas. Certaines classes le réemploient aujourd'hui, avec une balle ou un carnet. Cela peut sembler enfantin, et c'est pourtant l'invention la plus efficace jamais trouvée pour ce problème précis.",
  },
  formule: {
    contexte: "La question qui transforme un désaccord en discussion.",
    expression: "où exactement je ne suis pas d'accord ?",
    legende:
      "Pas « est-ce que je suis d'accord » — cela se répond par oui ou par non, et cela n'avance à rien. OÙ. Sur quel mot, sur quelle partie de ce qu'il vient de dire. Souvent, la réponse révèle qu'on parlait de deux choses différentes — et le désaccord disparait de lui-même.",
    schema: localiserLeDesaccord,
  },
  methode: [
    {
      titre: "Attendre la fin de la phrase, vraiment",
      texte:
        "Pas la fin de l'idée que tu crois avoir devinée. La plupart des coupures arrivent parce qu'on a cru comprendre où l'autre allait.",
      schema: grilleCodesTour,
      micros: ["6e_oral_codes"],
    },
    {
      titre: "Toujours faire suivre son avis d'un « parce que »",
      texte:
        "Et surtout, de ce qui vient après. Le mot seul annonce une raison sans la donner : c'est la raison qui compte, pas la formule.",
      schema: avisEtRaison,
      micros: ["6e_oral_argumenter"],
    },
    {
      titre: "Commencer par nommer ce qu'a dit l'autre",
      texte:
        "« Tu dis que… » puis « moi je pense que… ». Deux secondes, et ton intervention cesse d'être un monologue de plus.",
      schema: reprendrePuisAjouter,
      micros: ["6e_oral_interagir"],
    },
    {
      titre: "Chercher un seul point à améliorer",
      texte:
        "En te réécoutant, ou en écoutant un camarade : un point, précis, réparable. Une liste de dix reproches ne se corrige pas.",
      schema: remarquePrecise,
      micros: ["6e_oral_regard_critique"],
    },
  ],
  usages: [
    {
      titre: "Pour qu'un débat de classe avance",
      detail:
        "Il avance quand les interventions se répondent. Sinon, dix élèves ont parlé et la question est exactement où elle était au début.",
      schema: grilleCodes,
      micros: ["6e_oral_codes"],
    },
    {
      titre: "Pour défendre un avis sans hausser le ton",
      detail:
        "Une raison vaut plus qu'un volume. Et si tu n'en trouves aucune, c'est peut-être que l'avis mérite d'être ajusté — cela aussi est permis.",
      schema: avisEtRaison,
      micros: ["6e_oral_argumenter"],
    },
    {
      titre: "Pour répondre à quelqu'un qui te contredit",
      detail:
        "Reprends son idée d'abord. Tu découvriras souvent que vous ne parliez pas de la même chose — et le désaccord tombe tout seul.",
      schema: localiserLeDesaccord,
      micros: ["6e_oral_interagir"],
    },
    {
      titre: "Pour progresser après un exposé",
      detail:
        "Demande un point précis, pas une note. « Qu'est-ce que je devrais changer la prochaine fois ? » appelle une réponse utilisable.",
      schema: seReecouter,
      micros: ["6e_oral_regard_critique"],
    },
  ],
  exemples: [
    {
      titre: "Les codes de l'échange",
      donnees: "« Respecter les codes de l'échange en classe, c'est d'abord… »",
      schema: grilleCodesTour,
      question: "C'est d'abord quoi ?",
      solution:
        "ATTENDRE SON TOUR DE PAROLE. Pas parler plus fort que les autres, pas couper celui qui se trompe — même quand il se trompe —, pas lever la main sans écouter. Un échange n'existe que si chacun peut parler : c'est la règle qui tient toutes les autres.",
      micros: ["6e_oral_codes"],
    },
    {
      titre: "Justifier son point de vue",
      donnees: "« Pour justifier ton point de vue à l'oral, tu dois… »",
      schema: avisEtRaison,
      question: "Tu dois quoi ?",
      solution:
        "DONNER TON AVIS ET UNE RAISON QUI L'EXPLIQUE. Répéter « parce que » sans expliquer ne justifie rien ; parler plus fort n'est pas un argument ; changer d'avis à chaque phrase n'en est pas un non plus. C'est la raison qui fait l'argument.",
      micros: ["6e_oral_argumenter"],
    },
    {
      titre: "Quelqu'un te contredit",
      donnees: "« Dans un débat, quelqu'un vient de dire le contraire de toi. »",
      schema: localiserLeDesaccord,
      question: "Que fais-tu ?",
      solution:
        "TU REPRENDS SON IDÉE ET TU MONTRES OÙ TU N'ES PAS D'ACCORD. Pas répéter ton argument à l'identique — il a déjà été entendu et rejeté —, pas changer de sujet, pas attendre la fin sans rien dire. « Intervenir en tenant compte de ce qui a été dit » veut dire exactement cela.",
      micros: ["6e_oral_interagir"],
    },
    {
      titre: "La formule qui montre qu'on écoutait",
      donnees: "« Quelle formule montre que tu tiens compte de ce qui vient d'être dit ? »",
      schema: reprendrePuisAjouter,
      question: "Laquelle ?",
      solution:
        "« COMME LE DISAIT NINA, MAIS J'AJOUTERAIS QUE… ». « Moi je pense que… » ouvre un monologue de plus ; « bref, passons » efface ce qui précède ; « j'ai fini » ne dit rien. Reprendre le propos d'un camarade avant d'ajouter le sien, c'est ce qui fait d'un échange une discussion.",
      micros: ["6e_oral_interagir"],
    },
    {
      titre: "Se réécouter",
      donnees: "« Après un exposé enregistré, tu te réécoutes. Porter un regard critique, c'est… »",
      schema: remarquePrecise,
      question: "C'est quoi ?",
      solution:
        "REPÉRER UN POINT PRÉCIS À AMÉLIORER. Pas dire que c'était nul — cela ne se répare pas —, pas réécouter sans rien noter, pas se comparer à un camarade. Un regard critique n'est utile qu'à la condition d'être précis : « je parlais trop vite au début ».",
      micros: ["6e_oral_regard_critique"],
    },
    {
      titre: "Le défi",
      donnees: "Un camarade vient de donner son avis. C'est ton tour.",
      schema: suiteDeMonologues,
      question: "Comment commences-tu ?",
      solution:
        "EN REPRENANT CE QU'IL VIENT DE DIRE. « Tu dis que… » puis ton apport. Si tu commences par « moi je pense que », tu ajoutes un exposé à la file — et à la fin, chacun aura parlé sans que personne n'ait répondu à personne.",
      micros: ["6e_oral_echanger_defi"],
    },
  ],
  pieges: [
    "Croire qu'un débat avance parce que beaucoup d'élèves ont parlé : il faut qu'ils se répondent.",
    "Couper parce qu'on a deviné la fin de la phrase : c'est l'origine de presque toutes les coupures.",
    "Répéter son argument plus fort quand on est contredit : cela ne répond à personne.",
    "Dire « parce que » sans donner de raison derrière.",
    "Commencer toutes ses interventions par « moi je pense que » : c'est un monologue de plus.",
    "Porter un jugement au lieu d'une remarque : « c'était nul » ne se répare pas.",
    "Se réécouter sans chercher un point précis : on n'en retient alors rien.",
  ],
  aRetenir: [
    "Le tour de parole est la première règle : un échange n'existe que si chacun peut parler.",
    "Un argument est une RAISON, jamais un ton plus fort.",
    "Reprendre avant d'ajouter : « comme tu disais, mais j'ajouterais que… ».",
    "Un désaccord se localise : où, exactement, ça coince.",
    "Une remarque n'est utile que si elle désigne un endroit.",
  ],
  entrainement: [
    {
      question: "« Dans un échange, quand un camarade parle, on… »",
      correction: "Attend son tour et on l'écoute.",
      micros: ["6e_oral_codes"],
    },
    {
      question: "« Quand on n'est pas d'accord avec un camarade, on peut… »",
      correction: "Expliquer poliment pourquoi.",
      micros: ["6e_oral_codes"],
    },
    {
      question: "« Dans un débat, un bon argument est… »",
      correction: "Une raison qui explique son idée.",
      micros: ["6e_oral_argumenter"],
    },
    {
      question: "« Pendant un débat en classe, quelle attitude est attendue ? »",
      correction: "Écouter les autres et justifier son avis.",
      micros: ["6e_oral_interagir"],
    },
    {
      question: "Un camarade te dit : « ton exposé était bien ». Que lui demandes-tu ?",
      correction: "Un point précis : ce qu'il changerait, et à quel moment.",
      micros: ["6e_oral_regard_critique"],
    },
    {
      question: "Tu commences ton intervention par « moi je pense que ». Qu'est-ce qui manque ?",
      correction: "La reprise de ce qui vient d'être dit — sinon c'est un monologue de plus.",
      micros: ["6e_oral_echanger_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesOralEchanger6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Participer à un échange - 6e",
    section: {
      type: "objectif",
      phrase: "Reprendre avant d'ajouter",
      sousPhrase:
        "Un échange n'est pas une suite de monologues — et c'est le défaut le plus courant des débats de classe.",
      encadre: {
        titre: "L'idée",
        texte: "« Comme tu disais, mais j'ajouterais que… » : six mots qui changent tout.",
      },
    },
  },
  {
    titre: "Les codes de l'échange",
    badge: "Participer à un échange - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Attendre son tour", texte: "La première règle — elle tient toutes les autres." },
        { titre: "Écouter", texte: "Sans couper, même celui qui se trompe." },
        { titre: "Expliquer", texte: "Le désaccord se dit poliment, et il est utile." },
        { titre: "Questionner", texte: "Demander pour comprendre fait partie de l'échange." },
      ],
    },
    schema: grilleCodes,
  },
  {
    titre: "Un argument est une raison",
    badge: "Participer à un échange - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce que ce n'est pas",
        contenu: "Un ton plus fort, une moquerie, ou « parce que » sans rien derrière.",
      },
      droite: {
        titre: "Ce que c'est",
        contenu: "Ton avis ET la raison qui l'explique. La raison seule fait l'argument.",
      },
    },
    schema: avisEtRaison,
  },
  {
    titre: "Un désaccord se localise",
    badge: "Participer à un échange - 6e",
    section: {
      type: "etapes",
      etapes: [
        "Quelqu'un dit le contraire de toi.",
        "TU REPRENDS SON IDÉE — pour montrer que tu l'as entendue.",
        "TU MONTRES OÙ ça coince — pas que tu n'es pas d'accord, mais OÙ.",
        "Souvent, on découvre qu'on parlait de deux choses différentes.",
      ],
    },
    schema: localiserLeDesaccord,
  },
  {
    titre: "Une remarque utile désigne un endroit",
    badge: "Participer à un échange - 6e",
    section: {
      type: "etapes",
      etapes: [
        "« C'était nul » ne se répare pas.",
        "« Tu parlais trop vite au début » se répare demain.",
        "La même règle vaut à l'écrit, en lecture et à l'oral.",
        "En te réécoutant : cherche UN point, un seul.",
      ],
    },
    schema: remarquePrecise,
  },
  {
    titre: "À vous",
    badge: "Participer à un échange - 6e",
    section: {
      type: "exercice",
      enonce: "Un camarade vient de dire le contraire de ce que tu penses. C'est ton tour.",
      question: "Par quoi commences-tu, et pourquoi ?",
      indice: "Pense à ce qui manque quand chacun redit sa phrase.",
      correction:
        "PAR REPRENDRE SON IDÉE, puis montrer OÙ tu n'es pas d'accord. Répéter ton argument à l'identique ne répond à personne : il a déjà été entendu.",
    },
    schema: reprendrePuisAjouter,
  },
];
