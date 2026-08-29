// ─── Fiche de cours : suivre les reprises et les liens logiques (6e) ──────────
// TROISIÈME FICHE DU DOMAINE DE LA LECTURE EN 6e.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. ⛔ LA 6e FERME LE CYCLE 3 — elle ne suit PAS le cycle 4.
// Objectif nommé : « Repérer les informations explicites et implicites, LES
// LIENS LOGIQUES, LES REPRISES NOMINALES » (BO6EFRL).
//
// ⛔⛔ LE RISQUE N'EST PAS LA CLASSE, C'EST LA FICHE VOISINE :
// `francais-6e-grammaire-pronoms.tsx` EXISTE DÉJÀ et traite l'antécédent. Écrire
// celle-ci sans lire celle-là produit deux fois la même fiche. La ligne de
// partage, et elle est nette :
//
//   | `grammaire_pronoms` (déjà fichée) | `comprehension_reprises` (ici) |
//   |---|---|
//   | LE PRONOM COMME MOT : sa nature, sa fonction, son accord | LA CHAÎNE DANS UN TEXTE : suivre qui est qui sur un passage |
//   | de la LANGUE | de la LECTURE |
//   | « il » reprend « le pêcheur » | « le monstre » reprend « le cyclope » |
//
// ⭐⭐ D'OÙ LA DÉCOUVERTE QUI JUSTIFIE CETTE FICHE : UNE REPRISE N'EST PAS
// TOUJOURS UN PRONOM — et le pronom est le cas FACILE. Ce qui perd les élèves,
// c'est la reprise NOMINALE : « le monstre » pour le cyclope, « l'arbre » pour le
// vieux chêne, « le convoi » pour le train, « cette excursion » pour toute une
// visite. Un mot entièrement différent, qui désigne la même chose — et rien dans
// la phrase ne signale qu'il s'agit d'une reprise. Deux cas extrêmes, tous deux
// dans la banque : la reprise PLUS GÉNÉRALE que ce qu'elle reprend (chêne →
// arbre), et la reprise qui RÉSUME UNE ACTION ENTIÈRE (visiter le volcan →
// cette excursion).
//
// ⭐⭐ ET LE SECOND FIL, QUE LE BO NOMME DANS LA MÊME PHRASE : UN TEXTE TIENT PAR
// DEUX FILS, PAS UN. Les reprises disent DE QUI on parle ; les mots de liaison
// disent COMMENT les idées se tiennent. Ce sont deux fils différents, et perdre
// l'un ou l'autre fait perdre le texte de deux manières différentes. C'est ce qui
// fait tenir les quatre micros ensemble.
//
// ⭐ L'AMBIGUÏTÉ EST UNE BONNE RÉPONSE, et la banque la pose : « Paul appela
// Théo. Il ne répondit pas » — « Il » peut reprendre les deux. Comme le « rien à
// savoir » de la 5e : savoir s'arrêter fait partie du programme. Dessinée par
// DEUX arcs de reprise partant du même pronom.
//
// ⭐ LE CANVAS A L'ARC QU'IL FAUT, ET IL NE RESSEMBLE À AUCUN AUTRE :
// `type: "reprise"` trace un arc POINTILLÉ SOUS la phrase. L'accord et la
// question passent au-dessus, en trait plein. L'élève voit le fil qu'il doit
// suivre, et il ne le confond avec rien.
//
// ⭐ ET LA BANDE `nature` DÉMÊLE TROIS PRONOMS D'AFFILÉE : « Elle la lui a
// rendue » avec Nina, la raquette et Sami écrits au-dessus. C'est le seul moyen
// de montrer les trois d'un coup.
//
// ⚠️ RÈGLE DE COULEUR : les étiquettes de cette fiche ne sont PAS des fonctions
// grammaticales — « ce qu'on reprend », « le lien » doivent rester grises. ⛔ Le
// mot « sujet » est écarté partout pour cette raison, et « antécédent » aussi
// n'est employé qu'en texte, jamais en étiquette.
//
// Alignée sur les pools REPRISES et LIENS_LOGIQUES de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les six items `6e_fr_fixed_repr_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `comprehension_reprises`) :
// - 6e_comp_indices        → propriété 1, méthode 1, usage 1, exemple 1
// - 6e_comp_reprises       → figure, propriétés 2 à 5, formule, méthodes 2 et 3,
//                            usage 2, exemples 2 et 3
// - 6e_comp_liens_logiques → propriétés 6 et 7, méthode 4, usage 3, exemple 4
// - 6e_comp_reprises_defi  → propriétés 8 et 9, usage 4, exemples 5 et 6

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

/** Ce qu'un mot de liaison annonce. ⚠️ Cellules courtes : à la largeur d'un
 *  bloc, vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand on suit un fil ───────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : la reprise NOMINALE, pas le pronom.
// L'arc pointillé passe SOUS la phrase — il ne ressemble à aucun autre.
const repriseNominale = phrase({
  mots: [
    { texte: "le cyclope", focus: true },
    { texte: "Le monstre", focus: true },
    { texte: "hurla" },
  ],
  liens: [{ de: 1, vers: 0, label: "reprend", type: "reprise" }],
  legende: "Deux mots sans rien de commun, et c'est le même personnage.",
});

const reprisePronom = phrase({
  mots: [
    { texte: "le margouillat", focus: true },
    { texte: "Il", focus: true },
    { texte: "ne bougeait plus" },
  ],
  liens: [{ de: 1, vers: 0, label: "reprend", type: "reprise" }],
  legende: "Le pronom est le cas facile : il annonce lui-même qu'il remplace.",
});

// ⭐ LA REPRISE PLUS GÉNÉRALE QUE CE QU'ELLE REPREND.
const reprisePlusGenerale = phrase({
  mots: [
    { texte: "le vieux chêne", focus: true },
    { texte: "L'arbre", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "reprend", type: "reprise" }],
  legende: "Un mot plus général reprend un mot précis. C'est encore une reprise.",
});

// ⭐ LA REPRISE QUI RÉSUME UNE ACTION ENTIÈRE.
const repriseDuneAction = phrase({
  mots: [
    { texte: "visiter le volcan", focus: true },
    { texte: "cette excursion", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "reprend", type: "reprise" }],
  legende: "Une reprise peut résumer toute une action, pas seulement un nom.",
});

// ⭐ L'AMBIGUÏTÉ : deux arcs partent du même pronom, et c'est la réponse.
const ambiguite = phrase({
  mots: [
    { texte: "Paul" },
    { texte: "appela" },
    { texte: "Théo" },
    { texte: "Il", focus: true },
  ],
  liens: [
    { de: 3, vers: 0, label: "ou", type: "reprise" },
    { de: 3, vers: 2, label: "ou", type: "reprise" },
  ],
  legende: "Deux antécédents possibles : ici, le texte devait nommer, pas remplacer.",
});

// ⭐ LA BANDE `nature` DÉMÊLE TROIS PRONOMS D'AFFILÉE.
// ⛔ ET C'EST ICI QUE LA MESURE DE SUPERPOSITION A SERVI POUR LA PREMIÈRE FOIS.
// Première version : « Elle » / « la » / « lui » avec « Nina » / « la raquette »
// / « Sami » au-dessus. La bande `nature` est CENTRÉE SUR SON MOT et ne se plie
// pas à la largeur de la boite : au-dessus de mots de deux à quatre lettres, les
// étiquettes se recouvraient de 12 et 17 px. Police à 12 px, dessin dans son
// cadre, et illisible — les deux mesures d'avant ne voyaient rien.
// La parade : élargir les MOTS (les guillemets y suffisent) et raccourcir les
// natures, de façon que chaque boite soit au moins aussi large que son étiquette.
const troisPronoms = phrase({
  mots: [
    { texte: "« Elle »", nature: "Nina" },
    { texte: "« la »", nature: "raquette" },
    { texte: "« lui »", nature: "Sami" },
  ],
  legende: "Trois pronoms de suite se démêlent un par un, jamais tous ensemble.",
});

// ⭐ LA VÉRIFICATION : on remplace, et on relit.
const substitution = phrase({
  mots: [
    { texte: "« Il »", barre: true },
    { texte: "le margouillat", focus: true },
  ],
  legende: "Remplace, puis relis. Le mot le plus proche n'est pas toujours le bon.",
});

// ── LE SECOND FIL : les mots de liaison.
const lienDeConsequence = phrase({
  mots: [
    { texte: "il pleuvait" },
    { texte: "donc", focus: true },
    { texte: "match annulé" },
  ],
  legende: "Le mot de liaison ne raconte rien : il dit comment les deux idées tiennent.",
});

const grilleLiens = grille({
  headers: ["Le mot", "Ce qu'il dit"],
  rows: [
    { values: ["donc", "la conséquence"] },
    { values: ["car", "la cause"] },
    { values: ["pourtant", "l'opposition"] },
    { values: ["si", "la condition"] },
  ],
  caption: "Quatre rapports, et ils changent tout le sens.",
});

const grilleLiensOpposition = grille({
  headers: ["Le mot", "Ce qu'il dit"],
  rows: [
    { values: ["donc", "la conséquence"] },
    { values: ["car", "la cause"] },
    { values: ["pourtant", "l'opposition"] },
    { values: ["si", "la condition"] },
  ],
  highlight: { row: 2 },
  caption: "« Pourtant » annonce que la suite contredit l'attente.",
});

// ── LE DÉFI : deux chaines courent en même temps.
const deuxChaines = phrase({
  mots: [
    { texte: "le capitaine", focus: true },
    { texte: "l'équipage", focus: true },
    { texte: "L'homme" },
    { texte: "Tous" },
  ],
  liens: [
    { de: 2, vers: 0, label: "reprend", type: "reprise" },
    { de: 3, vers: 1, label: "reprend", type: "reprise" },
  ],
  legende: "Deux fils courent ensemble : « L'homme » suit l'un, « Tous » suit l'autre.",
});

const chaineDuPersonnage = phrase({
  mots: [
    { texte: "le pêcheur", focus: true },
    { texte: "il" },
    { texte: "cet homme" },
  ],
  liens: [
    { de: 1, vers: 0, label: "reprend", type: "reprise" },
    { de: 2, vers: 0, label: "reprend", type: "reprise" },
  ],
  legende: "Un même personnage change de nom trois fois : c'est une chaine.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheComprehensionReprises6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "comprehension-reprises",
  titre: "Suivre les reprises et les liens logiques d'un texte en 6e (2026-2027)",
  accroche:
    "Un texte tient par DEUX FILS, et tu peux perdre l'un sans perdre l'autre. Le premier dit DE QUI on parle : « le cyclope » devient « le monstre » deux lignes plus loin, et rien ne te prévient. Le second dit COMMENT LES IDÉES SE TIENNENT : « donc » et « pourtant » ne racontent rien, ils rangent. Lâche le premier fil et tu ne sais plus qui fait quoi ; lâche le second et tu comprends chaque phrase sans comprendre le texte.",
  identite: [
    { label: "Mots clés", valeur: "Reprise, pronom, chaine, mot de liaison" },
    { label: "Le secret", valeur: "Une reprise n'est pas toujours un pronom" },
    { label: "Outil", valeur: "Je remplace, et je relis" },
  ],
  definition: {
    texte:
      "Suivre un texte, c'est tenir deux fils en même temps. LE FIL DES REPRISES dit de qui ou de quoi l'on parle. Le cas facile est le PRONOM — « Léa observait le margouillat. Il ne bougeait plus » — parce qu'un pronom annonce lui-même qu'il remplace quelque chose. Le cas difficile est la REPRISE NOMINALE : un mot entièrement différent qui désigne la même chose — « le monstre » pour le cyclope, « le convoi » pour le train, « l'arbre » pour le vieux chêne, « cette excursion » pour toute une visite. Rien ne signale ces reprises-là, et un lecteur qui les manque croit qu'un nouveau personnage vient d'entrer. LE FIL DES MOTS DE LIAISON, lui, ne dit pas de qui l'on parle mais COMMENT LES IDÉES SE TIENNENT : « donc » annonce une conséquence, « car » une cause, « pourtant » une opposition, « si » une condition, « afin que » un but, « d'abord… ensuite… enfin » l'ordre des étapes. Et il arrive qu'une reprise soit AMBIGUË — « Paul appela Théo. Il ne répondit pas » — : le dire est alors la bonne réponse.",
  },
  figure: {
    schema: pile(repriseNominale, reprisePronom),
    legende:
      "L'arc pointillé passe SOUS la phrase, et il ne ressemble à aucun autre trait de la matière : il va de la reprise vers ce qu'elle reprend. En haut, le cas qui perd les élèves — « le monstre » et « le cyclope » n'ont pas une lettre en commun, aucun signe ne prévient, et c'est pourtant le même personnage. En bas, le cas facile : un pronom annonce lui-même qu'il remplace. Le programme demande les deux, et c'est le premier qui se travaille.",
  },
  proprietes: [
    {
      titre: "L'indice qui répond est écrit quelque part",
      texte:
        "« Les valises attendaient près de la porte et les billets étaient posés sur la table. » Un départ se prépare : deux objets le disent.",
      schema: chaineDuPersonnage,
      micros: ["6e_comp_indices"],
    },
    {
      titre: "Un pronom reprend un groupe déjà écrit",
      texte:
        "Il vient toujours APRÈS lui — c'est le sens du mot antécédent : « anté » veut dire avant. On remonte le texte jusqu'à ce qu'on le trouve.",
      schema: reprisePronom,
      micros: ["6e_comp_reprises"],
    },
    {
      titre: "Mais une reprise n'est pas toujours un pronom",
      texte:
        "« Ulysse affronta le cyclope. Le monstre hurla. » Aucun signe ne prévient, et il faut pourtant savoir que c'est le même.",
      schema: repriseNominale,
      micros: ["6e_comp_reprises"],
    },
    {
      titre: "Une reprise peut être plus générale",
      texte:
        "« Le vieux chêne dominait la cour. L'arbre avait cent ans. » Un mot plus large reprend un mot précis : c'est encore la même chose.",
      schema: pile(reprisePlusGenerale, repriseDuneAction),
      micros: ["6e_comp_reprises"],
    },
    {
      titre: "Trois pronoms de suite se démêlent un par un",
      texte:
        "« Sami a prêté sa raquette à Nina. Elle la lui a rendue. » Elle, c'est Nina ; la, c'est la raquette ; lui, c'est Sami.",
      schema: troisPronoms,
      micros: ["6e_comp_reprises"],
    },
    {
      titre: "Les mots de liaison rangent les idées",
      texte:
        "Ils ne racontent rien. « donc » dit une conséquence, « car » une cause, « pourtant » une opposition, « si » une condition.",
      schema: grilleLiens,
      micros: ["6e_comp_liens_logiques"],
    },
    {
      titre: "Changer le lien change tout le sens",
      texte:
        "« Il pleuvait DONC le match fut annulé » et « Le match fut annulé CAR il pleuvait » disent la même chose dans l'autre sens.",
      schema: lienDeConsequence,
      micros: ["6e_comp_liens_logiques"],
    },
    {
      titre: "Deux chaines peuvent courir en même temps",
      texte:
        "« Le capitaine réunit l'équipage. L'homme parlait peu. Tous l'écoutaient. » Deux fils, et chaque reprise appartient à l'un des deux.",
      schema: deuxChaines,
      micros: ["6e_comp_reprises_defi"],
    },
    {
      titre: "Et parfois le texte est ambigu",
      texte:
        "« Paul appela Théo. Il ne répondit pas. » Les deux sont possibles. Le dire est la bonne réponse : ce n'est pas un aveu d'ignorance.",
      schema: ambiguite,
      micros: ["6e_comp_reprises_defi"],
    },
  ],
  reel: {
    texte:
      "Tu tiens ces deux fils dans la moindre conversation. Quand quelqu'un te raconte une histoire et dit « et là, l'autre lui répond… », tu sais qui est « l'autre » sans qu'on te le dise — c'est une reprise, et une reprise nominale, la plus difficile de toutes. Quand tu perds le fil, tu demandes exactement la bonne chose : « attends, qui ça ? » Tu viens de signaler une reprise ambiguë. Et le second fil aussi : « il a raté son bus, DU COUP il est arrivé en retard » — tu emploies un connecteur de conséquence sans y penser. La différence à l'école est qu'on te demande de NOMMER ce que tu fais déjà : dire que « du coup » marque une conséquence, et montrer du doigt ce que « l'autre » reprenait.",
  },
  historique: {
    texte:
      "L'école t'apprend à éviter les répétitions — et il existe des textes où l'on fait exactement l'inverse, exprès. Un contrat, un jugement, une loi répètent « le vendeur », « le vendeur », « le vendeur » cent fois de suite, là où un roman écrirait « il », puis « cet homme », puis « le propriétaire ». La raison est simple : un « il » ambigu dans un contrat peut coûter une maison. Les juristes ont donc renoncé à l'élégance pour supprimer tout risque de chaine mal suivie. Cela dit deux choses utiles : que les reprises sont un vrai risque de compréhension, et non une coquetterie de style ; et que la répétition n'est pas une faute en soi — c'est un choix, qui a ses moments.",
  },
  formule: {
    contexte: "La vérification qui départage une bonne lecture d'une devinette.",
    expression: "je remplace, et je relis",
    legende:
      "Tu crois savoir ce que « il » reprend ? Écris le groupe à la place du pronom et relis la phrase entière. Si elle tient, tu as raison. Le mot le plus proche avant le pronom est très souvent le mauvais — et c'est la seule vérification qui ne se trompe pas.",
    schema: substitution,
  },
  methode: [
    {
      titre: "Relever l'indice, pas le raconter",
      texte:
        "La question demande sur quoi tu t'appuies : montre les mots. « Les valises et les billets », et non « on dirait qu'ils partent ».",
      schema: chaineDuPersonnage,
      micros: ["6e_comp_indices"],
    },
    {
      titre: "Remonter le texte, jamais le descendre",
      texte:
        "Un pronom vient toujours après ce qu'il reprend. Pars du pronom et remonte : la réponse est derrière toi, jamais devant.",
      schema: reprisePronom,
      micros: ["6e_comp_reprises"],
    },
    {
      titre: "Remplacer et relire",
      texte:
        "Écris le groupe à la place du pronom, puis relis toute la phrase. Le mot le plus proche n'est pas toujours le bon : seule la substitution le prouve.",
      schema: substitution,
      micros: ["6e_comp_reprises"],
    },
    {
      titre: "Entourer les mots de liaison en premier",
      texte:
        "Avant même de lire pour comprendre, entoure « donc », « mais », « car », « pourtant ». Ils dessinent la charpente du texte.",
      schema: grilleLiensOpposition,
      micros: ["6e_comp_liens_logiques"],
    },
  ],
  usages: [
    {
      titre: "Pour justifier une réponse",
      detail:
        "La question « quel indice montre que… » ne demande pas ton avis : elle demande deux ou trois mots du texte, que tu peux montrer du doigt.",
      schema: chaineDuPersonnage,
      micros: ["6e_comp_indices"],
    },
    {
      titre: "Pour ne pas croire qu'un personnage est arrivé",
      detail:
        "« Le monstre » n'est pas un nouveau venu. Quand un nom inconnu apparait, demande-toi d'abord s'il ne reprend pas quelqu'un.",
      schema: repriseNominale,
      micros: ["6e_comp_reprises"],
    },
    {
      titre: "Pour comprendre un texte qui explique",
      detail:
        "Dans une leçon d'histoire ou de sciences, les connecteurs portent tout : cause, conséquence, condition. Les sauter, c'est lire une liste.",
      schema: grilleLiens,
      micros: ["6e_comp_liens_logiques"],
    },
    {
      titre: "Pour suivre un personnage sur une page entière",
      detail:
        "Souligne d'une même couleur tout ce qui le désigne — son nom, les pronoms, les autres mots. La ligne apparait, et le passage s'éclaire.",
      schema: deuxChaines,
      micros: ["6e_comp_reprises_defi"],
    },
  ],
  exemples: [
    {
      titre: "Un indice",
      donnees: "« Les valises attendaient près de la porte et les billets étaient posés sur la table. »",
      schema: chaineDuPersonnage,
      question: "Quel indice montre qu'un départ se prépare ?",
      solution:
        "LES VALISES PRÊTES ET LES BILLETS. Deux objets, et c'est leur présence ensemble qui compte : des valises seules pourraient revenir d'un voyage. « La porte » et « la table » sont dans le texte aussi, et ne prouvent rien — un indice n'est pas n'importe quel mot présent.",
      micros: ["6e_comp_indices"],
    },
    {
      titre: "Un pronom",
      donnees: "« Léa observait le margouillat. Il ne bougeait plus. »",
      schema: reprisePronom,
      question: "Que reprend « Il » ?",
      solution:
        "LE MARGOUILLAT. Le pronom est masculin singulier, comme lui ; « Léa » ne conviendrait pas. Vérifie par la substitution : « Le margouillat ne bougeait plus » tient debout. C'est le cas facile — et c'est celui sur lequel on s'entraine pour les autres.",
      micros: ["6e_comp_reprises"],
    },
    {
      titre: "Une reprise nominale",
      donnees: "« Ulysse affronta le cyclope. Le monstre hurla de douleur. »",
      schema: repriseNominale,
      question: "Qui « Le monstre » désigne-t-il ?",
      solution:
        "LE CYCLOPE. Aucun mot ne prévient : ce n'est pas un pronom, c'est un nom tout neuf. Il faut savoir qu'un cyclope EST un monstre — et donc que le texte n'a fait que le nommer autrement. Un lecteur pressé croit ici qu'un troisième personnage vient d'entrer.",
      micros: ["6e_comp_reprises"],
    },
    {
      titre: "Un mot de liaison",
      donnees: "« Il avait beaucoup travaillé, POURTANT il rata l'épreuve. »",
      schema: grilleLiensOpposition,
      question: "Que marque « pourtant » ?",
      solution:
        "UNE OPPOSITION. Le mot annonce que la suite va contredire ce qu'on attendait : après « il avait beaucoup travaillé », on attend une réussite. Remplace par « donc » et la phrase devient absurde — c'est le test le plus rapide pour vérifier un connecteur.",
      micros: ["6e_comp_liens_logiques"],
    },
    {
      titre: "Deux chaines",
      donnees: "« Le capitaine réunit l'équipage. L'homme parlait peu. Tous l'écoutaient. »",
      schema: deuxChaines,
      question: "Qui « Tous » désigne-t-il ?",
      solution:
        "L'ÉQUIPAGE. On suit les deux fils : « le capitaine » devient « L'homme », puis « l' » — un seul homme, singulier tout du long. « Tous » est un pluriel : il ne peut donc pas rejoindre cette chaine-là, et il ne reste que l'équipage. Le genre et le nombre départagent.",
      micros: ["6e_comp_reprises_defi"],
    },
    {
      titre: "Une phrase ambiguë",
      donnees: "« Paul appela Théo. Il ne répondit pas. »",
      schema: ambiguite,
      question: "Pourquoi cette phrase pose-t-elle un problème ?",
      solution:
        "PARCE QUE « IL » PEUT REPRENDRE PAUL COMME THÉO. Deux antécédents possibles, même genre, même nombre : rien ne tranche. Ce n'est pas toi qui lis mal — c'est le texte qui aurait dû nommer plutôt que remplacer. Le repérer est la bonne réponse.",
      micros: ["6e_comp_reprises_defi"],
    },
  ],
  pieges: [
    "Croire qu'une reprise est toujours un pronom : « le monstre » et « le convoi » en sont aussi.",
    "Prendre un nom inconnu pour un nouveau personnage : demande-toi d'abord s'il ne reprend pas quelqu'un.",
    "Rattacher un pronom au mot le plus proche : c'est très souvent le mauvais.",
    "Chercher l'antécédent APRÈS le pronom : « anté » veut dire avant.",
    "Démêler trois pronoms d'un coup : on les prend un par un, dans l'ordre.",
    "Sauter les mots de liaison : ils ne racontent rien, et ils portent tout le raisonnement.",
    "Croire qu'une ambiguïté est une faute de lecture : la signaler est la bonne réponse.",
  ],
  aRetenir: [
    "Deux fils : les reprises disent DE QUI, les liens disent COMMENT.",
    "Une reprise n'est pas toujours un pronom — la nominale est la plus difficile.",
    "L'antécédent vient toujours AVANT : on remonte le texte.",
    "La vérification, c'est de remplacer et de relire.",
    "Quand deux antécédents sont possibles, le dire est la bonne réponse.",
  ],
  entrainement: [
    {
      question: "« Les élèves rangèrent leurs cahiers. Ils sortirent en silence. » Qui sort ?",
      correction: "Les élèves : le pronom pluriel reprend le seul groupe pluriel qui précède.",
      micros: ["6e_comp_reprises"],
    },
    {
      question: "« Le train entra en gare. Le convoi s'arrêta. » Combien de trains ?",
      correction: "Un seul : « le convoi » est une reprise nominale du même train.",
      micros: ["6e_comp_reprises"],
    },
    {
      question: "« Nous avons visité le volcan. Cette excursion nous a épuisés. » Que reprend « cette excursion » ?",
      correction: "La visite du volcan — toute l'action, pas seulement le volcan.",
      micros: ["6e_comp_reprises"],
    },
    {
      question: "« SI tu viens, nous partirons ensemble. » Que marque « si » ?",
      correction: "Une condition : ce qui doit arriver pour que la suite ait lieu.",
      micros: ["6e_comp_liens_logiques"],
    },
    {
      question: "Quel connecteur ne marque PAS le temps : puis, alors, enfin, cependant ?",
      correction: "« Cependant » : il oppose, les trois autres situent des moments.",
      micros: ["6e_comp_liens_logiques"],
    },
    {
      question: "« Marie tendit le livre à Paul. Il la remercia. » Que reprend « la » ?",
      correction: "Marie : « Il » a déjà pris Paul, et le féminin le confirme.",
      micros: ["6e_comp_reprises_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesComprehensionReprises6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Reprises et liens - 6e",
    section: {
      type: "objectif",
      phrase: "Un texte tient par deux fils",
      sousPhrase:
        "Les reprises disent DE QUI on parle. Les mots de liaison disent COMMENT les idées se tiennent.",
      encadre: {
        titre: "L'idée",
        texte: "« Le cyclope » devient « le monstre », et rien ne te prévient.",
      },
    },
  },
  {
    titre: "Une reprise n'est pas toujours un pronom",
    badge: "Reprises et liens - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Le cas facile",
        contenu: "« Il », « elle », « les » : un pronom annonce lui-même qu'il remplace.",
      },
      droite: {
        titre: "Le cas difficile",
        contenu: "« Le monstre », « le convoi », « l'arbre » : un nom tout neuf, aucun signe.",
      },
    },
    schema: repriseNominale,
  },
  {
    titre: "Trois pronoms se démêlent un par un",
    badge: "Reprises et liens - 6e",
    section: {
      type: "etapes",
      etapes: [
        "« Sami a prêté sa raquette à Nina. Elle la lui a rendue. »",
        "ELLE, c'est Nina — féminin singulier, et c'est elle qui rend.",
        "LA, c'est la raquette — l'objet qu'on rend.",
        "LUI, c'est Sami — celui à qui on rend.",
      ],
    },
    schema: troisPronoms,
  },
  {
    titre: "Le second fil : les mots de liaison",
    badge: "Reprises et liens - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "donc", texte: "La conséquence : ce qui résulte de ce qui précède." },
        { titre: "car", texte: "La cause : la raison de ce qu'on vient de dire." },
        { titre: "pourtant", texte: "L'opposition : la suite contredit l'attente." },
        { titre: "si", texte: "La condition : ce qui doit arriver pour que la suite ait lieu." },
      ],
    },
    schema: grilleLiens,
  },
  {
    titre: "Quand le texte est ambigu",
    badge: "Reprises et liens - 6e",
    section: {
      type: "etapes",
      etapes: [
        "« Paul appela Théo. Il ne répondit pas. »",
        "Deux antécédents possibles, même genre, même nombre.",
        "Rien ne tranche — et ce n'est pas toi qui lis mal.",
        "LE DIRE est la bonne réponse : le texte devait nommer.",
      ],
    },
    schema: ambiguite,
  },
  {
    titre: "À vous",
    badge: "Reprises et liens - 6e",
    section: {
      type: "exercice",
      enonce: "« Le capitaine réunit l'équipage. L'homme parlait peu. Tous l'écoutaient. »",
      question: "Qui « Tous » désigne-t-il ?",
      indice: "Suis les deux fils, et regarde le nombre.",
      correction:
        "L'ÉQUIPAGE. « Le capitaine » devient « L'homme » puis « l' » : singulier tout du long. « Tous » est un pluriel, il ne peut donc pas rejoindre cette chaine.",
    },
    schema: deuxChaines,
  },
];
