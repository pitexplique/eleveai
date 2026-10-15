// lib/tutor-v4/questionBank/premiere/maths/arbres-ponderes.bank.ts
//
// Notions : alea_arbre et alea_arbre_calcul (domaine BOP1AL)
//
// L'arbre pondéré est explicitement au programme : « Probabilité
// conditionnelle : définition, notation, calcul à partir d'un tableau croisé
// d'effectifs ou d'un arbre de probabilités » (BO du 7 juillet 2022), et la
// liste d'automatismes évaluables reprend les deux supports. Aux sujets de
// juin 2026, l'arbre est à COMPLÉTER aux Antilles, et à LIRE aux Centres
// étrangers (questions 11 et 12 du QCM).
//
// Les arbres sont dessinés par le canvas `arbre_proba` : l'élève voit la même
// figure qu'au tableau, avec ses branches et ses pondérations.
//
// Deux règles que les questions font travailler séparément :
//   - la somme des probabilités des branches issues d'un même nœud vaut 1 ;
//   - la probabilité d'un chemin est le PRODUIT des probabilités rencontrées.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fr(n: number): string {
  const arrondi = Math.round(n * 1000000) / 1000000;
  return String(arrondi).replace(".", ",");
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  const distracteurs = Array.from(new Set(wrongs)).filter((w) => w !== correct);
  return shuffle([correct, ...distracteurs.slice(0, 3)]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/* ── Situations à deux étages, comme aux sujets ── */

type SituationArbre = {
  /** Le décor, terminé par le tirage au hasard. */
  intro: string;
  a: string; // évènement du premier étage (une phrase)
  b: string; // évènement du second étage (une phrase)
  /** Étiquettes courtes portées par l'arbre. */
  labelA: string;
  labelB: string;
  /** La population, au pluriel (« élèves », « pièces »…), pour le tableau croisé. */
  pop: string;
};

const sit = (intro: string, a: string, b: string, labelA: string, labelB: string, pop: string): SituationArbre => ({
  intro,
  a,
  b,
  labelA,
  labelB,
  pop,
});

// Des décors variés : la vie au lycée, le jeu, le sport, La Réunion, l'industrie, la santé.
const SITUATIONS: readonly SituationArbre[] = [
  sit("Dans un lycée, les élèves inscrits aux clubs choisissent des activités. On choisit un élève inscrit au hasard.", "l'élève fait une activité artistique", "l'élève fait une activité sportive", "A", "S", "élèves"),
  sit("Une usine fabrique des pièces sur deux machines. On prélève une pièce au hasard.", "la pièce vient de la machine 1", "la pièce est conforme", "M", "C", "pièces"),
  sit("Un test de dépistage est proposé à une population. On choisit une personne au hasard.", "la personne est malade", "le test est positif", "M", "T", "personnes"),
  sit("À la kermesse du lycée, un premier tirage désigne l'urne, puis on tire un ticket dans cette urne.", "l'urne rouge est désignée", "le ticket est gagnant", "R", "G", "tickets tirés"),
  sit("À Saint-Denis, on observe les matins d'école sur l'année. On choisit un matin au hasard.", "une averse tombe ce matin-là", "le car jaune arrive en retard", "A", "R", "matins"),
  sit("Lors d'une séance de tirs au but, on choisit un tir au hasard.", "le tireur vise le côté droit", "le tir est réussi", "D", "B", "tirs"),
  sit("Un grand sachet contient des bonbons de deux parfums. On prend un bonbon au hasard.", "le bonbon est à la fraise", "le bonbon est acidulé", "F", "A", "bonbons"),
  sit("Un marchand de Saint-Pierre vend des letchis de deux vergers. On prend un letchi au hasard dans son étal.", "le letchi vient du verger des Hauts", "le letchi est bien sucré", "H", "S", "letchis"),
  sit("Des randonneurs partent vers le Piton des Neiges depuis Cilaos. On choisit un randonneur au hasard.", "le randonneur part avant 5 h", "le randonneur voit le lever du soleil au sommet", "T", "L", "randonneurs"),
  sit("Le site du Piton de la Fournaise interroge ses visiteurs. On choisit un visiteur au hasard.", "le visiteur est venu en bus", "le visiteur se dit satisfait", "B", "S", "visiteurs"),
  sit("Un réparateur reçoit des smartphones. On choisit un smartphone reçu au hasard.", "le smartphone a moins de deux ans", "l'écran est fissuré", "J", "F", "smartphones"),
  sit("Une entreprise étudie les trajets de ses salariés. On choisit un salarié au hasard.", "le salarié vient en voiture", "le salarié arrive en retard", "V", "R", "salariés"),
  sit("À la cantine du lycée, on choisit un plateau au hasard.", "le plateau contient un cari", "le plateau contient un dessert", "C", "D", "plateaux"),
  sit("Une médiathèque étudie ses prêts. On choisit un emprunteur au hasard.", "l'emprunteur est un adulte", "l'emprunteur prend un roman", "A", "R", "emprunteurs"),
  sit("Sur la plage de l'Hermitage, on interroge des baigneurs. On en choisit un au hasard.", "le baigneur est un touriste", "le baigneur a mis de la crème solaire", "T", "C", "baigneurs"),
  sit("Un site de vente en ligne étudie ses commandes. On choisit une commande au hasard.", "la commande est envoyée en express", "la commande arrive à l'heure", "E", "L", "commandes"),
  sit("Des candidats passent un concours. On choisit un candidat au hasard.", "le candidat a suivi une préparation", "le candidat réussit le concours", "F", "R", "candidats"),
  sit("Pendant l'hiver austral, on suit les habitants d'une commune. On choisit un habitant au hasard.", "l'habitant est vacciné contre la grippe", "l'habitant attrape la grippe", "V", "G", "habitants"),
  sit("Un joueur enregistre ses parties d'un jeu vidéo. On choisit une partie au hasard.", "la partie est jouée en mode difficile", "la partie est gagnée", "D", "G", "parties"),
  sit("Au marché forain de Saint-Paul, on choisit un client au hasard.", "le client achète des mangues", "le client paie par carte", "M", "C", "clients"),
  sit("Une classe de terminale prépare le bac. On choisit un élève au hasard.", "l'élève révise en groupe", "l'élève obtient plus de 12", "G", "N", "élèves"),
  sit("Une basketteuse tire deux lancers francs de suite. On choisit une série de deux lancers au hasard.", "le premier lancer est réussi", "le second lancer est réussi", "R", "S", "séries"),
  sit("Sur une ligne de car jaune, on choisit un trajet au hasard.", "le car part à l'heure", "le car arrive à l'heure", "D", "A", "trajets"),
  sit("Un pêcheur de Saint-Gilles note ses sorties en mer. On choisit une sortie au hasard.", "la sortie se fait au large", "le pêcheur ramène un thon", "L", "T", "sorties"),
  sit("Une application de musique étudie ses utilisateurs. On choisit un utilisateur au hasard.", "l'utilisateur a un abonnement payant", "l'utilisateur reste plus d'un an", "A", "F", "utilisateurs"),
  sit("Pour la tombola de l'école, on choisit un billet vendu au hasard.", "le billet a été vendu le samedi", "le billet est gagnant", "S", "G", "billets"),
  sit("Une coopérative de vanille de Saint-Philippe suit ses plants. On choisit un plant au hasard.", "le plant est issu d'une bouture", "le plant fleurit dès la troisième année", "B", "F", "plants"),
  sit("Un magasin suit les ordinateurs qu'il vend. On choisit un ordinateur vendu au hasard.", "l'ordinateur est un modèle portable", "l'ordinateur tombe en panne la première année", "M", "N", "ordinateurs"),
  sit("Au Grand Raid, on choisit un coureur inscrit au hasard.", "le coureur s'est entraîné en montagne", "le coureur termine la course", "E", "T", "coureurs"),
  sit("Un cinéma étudie ses entrées. On choisit un spectateur au hasard.", "le spectateur vient en semaine", "le spectateur achète du pop-corn", "S", "C", "spectateurs"),
  sit("Dans un lycée, on choisit un élève de seconde au hasard.", "l'élève étudie l'espagnol", "l'élève part en voyage scolaire", "E", "V", "élèves"),
  sit("Une messagerie analyse les courriels reçus. On choisit un courriel au hasard.", "l'expéditeur est inconnu", "le courriel est classé en indésirable", "I", "S", "courriels"),
  sit("Au jeu de l'oie de la fête de quartier, on choisit une partie au hasard.", "le joueur tombe sur une case piège", "le joueur gagne la partie", "C", "G", "parties"),
  sit("Une auto-école suit ses candidats au permis. On choisit un candidat au hasard.", "le candidat a pris plus de 20 heures de conduite", "le candidat réussit du premier coup", "H", "R", "candidats"),
  sit("Un club de surf de Saint-Leu suit ses élèves. On choisit un élève du club au hasard.", "l'élève a déjà fait du bodyboard", "l'élève tient debout dès la première séance", "B", "D", "élèves"),
  sit("Un jardinier sème des graines de piment. On choisit une graine au hasard.", "la graine vient d'un sachet acheté", "la graine germe", "A", "G", "graines"),
];

// Probabilités « rondes » : les produits tombent sur deux décimales au plus.
// Tous les dixièmes : les produits tombent sur deux décimales, et un effectif
// multiple de 100 donne toujours un nombre entier d'individus.
const PROBAS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9] as const;

/** Arrondi au millionième, pour effacer les 0,30000000000000004. */
const net = (x: number) => Math.round(x * 1000000) / 1000000;

function situationArbre() {
  const s = pick(SITUATIONS);
  const pA = pick(PROBAS);
  const pBsachantA = pick(PROBAS);
  const pBsachantNonA = pick(PROBAS);
  const pNonA = net(1 - pA);
  return {
    s,
    pA,
    pNonA,
    pBsachantA,
    pNonBsachantA: net(1 - pBsachantA),
    pBsachantNonA,
    pNonBsachantNonA: net(1 - pBsachantNonA),
    cheminAB: net(pA * pBsachantA),
    cheminANonB: net(pA * (1 - pBsachantA)),
    cheminNonAB: net(pNonA * pBsachantNonA),
    cheminNonANonB: net(pNonA * (1 - pBsachantNonA)),
    pB: net(pA * pBsachantA + pNonA * pBsachantNonA),
    pNonB: net(1 - (pA * pBsachantA + pNonA * pBsachantNonA)),
  };
}

type Arbre = ReturnType<typeof situationArbre>;
type CleBranche = "pA" | "pNonA" | "pBsachantA" | "pNonBsachantA" | "pBsachantNonA" | "pNonBsachantNonA";

/** Les notations : $\overline{A}$ en LaTeX, « A̅ » sur la figure. */
const barre = (l: string) => `\\overline{${l}}`;

function canvasArbre(t: Arbre, options?: { masquer?: CleBranche }): CanvasFigure {
  const { s } = t;
  const val = (cle: CleBranche) => (options?.masquer === cle ? "?" : fr(t[cle]));
  return {
    kind: "arbre_proba",
    titre: `${s.labelA} : ${s.a} — ${s.labelB} : ${s.b}`,
    racineEnfants: [
      {
        label: s.labelA,
        proba: val("pA"),
        enfants: [
          { label: s.labelB, proba: val("pBsachantA") },
          { label: `${s.labelB}̄`, proba: val("pNonBsachantA") },
        ],
      },
      {
        label: `${s.labelA}̄`,
        proba: val("pNonA"),
        enfants: [
          { label: s.labelB, proba: val("pBsachantNonA") },
          { label: `${s.labelB}̄`, proba: val("pNonBsachantNonA") },
        ],
      },
    ],
  };
}

/** L'énoncé commun : le décor et la définition des deux évènements. */
const notations = (s: SituationArbre) =>
  `${s.intro} On note $${s.labelA}$ : « ${s.a} » et $${s.labelB}$ : « ${s.b} ».`;

/** Les six branches, avec leur notation et leur place sur l'arbre. */
function branches(t: Arbre) {
  const A = t.s.labelA;
  const B = t.s.labelB;
  const nA = barre(A);
  const nB = barre(B);
  return {
    pA: { notation: `P(${A})`, place: `la branche $${A}$ du premier étage`, noeud: "la racine", autre: "pNonA" as CleBranche },
    pNonA: { notation: `P(${nA})`, place: `la branche $${nA}$ du premier étage`, noeud: "la racine", autre: "pA" as CleBranche },
    pBsachantA: { notation: `P_{${A}}(${B})`, place: `la branche $${B}$ issue de $${A}$`, noeud: `$${A}$`, autre: "pNonBsachantA" as CleBranche },
    pNonBsachantA: { notation: `P_{${A}}(${nB})`, place: `la branche $${nB}$ issue de $${A}$`, noeud: `$${A}$`, autre: "pBsachantA" as CleBranche },
    pBsachantNonA: { notation: `P_{${nA}}(${B})`, place: `la branche $${B}$ issue de $${nA}$`, noeud: `$${nA}$`, autre: "pNonBsachantNonA" as CleBranche },
    pNonBsachantNonA: { notation: `P_{${nA}}(${nB})`, place: `la branche $${nB}$ issue de $${nA}$`, noeud: `$${nA}$`, autre: "pBsachantNonA" as CleBranche },
  } satisfies Record<CleBranche, { notation: string; place: string; noeud: string; autre: CleBranche }>;
}

export const arbresPonderesBank: TutorBankItemV4[] = [
  /* ═══════════════ alea_arbre_lire ═══════════════ */

  {
    kind: "template",
    id: "premiere_arbre_lire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre",
    microId: "alea_arbre_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Une branche du second étage porte une probabilité CONDITIONNELLE.",
    tags: ["premiere", "maths", "probabilites", "arbre", "template", "short"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      const br = branches(t);
      const cle = pick(["pA", "pNonA", "pBsachantA", "pNonBsachantA", "pBsachantNonA", "pNonBsachantNonA"] as const);
      const b = br[cle];
      const premierEtage = cle === "pA" || cle === "pNonA";
      // La question en mots, propre à chaque branche.
      const enMots: Record<CleBranche, string> = {
        pA: `la probabilité que « ${s.a} »`,
        pNonA: `la probabilité que l'évènement « ${s.a} » ne soit PAS réalisé`,
        pBsachantA: `la probabilité que « ${s.b} », sachant que « ${s.a} »`,
        pNonBsachantA: `la probabilité que l'évènement « ${s.b} » ne soit pas réalisé, sachant que « ${s.a} »`,
        pBsachantNonA: `la probabilité que « ${s.b} », sachant que l'évènement « ${s.a} » n'est pas réalisé`,
        pNonBsachantNonA: `la probabilité que l'évènement « ${s.b} » ne soit pas réalisé, sachant que l'évènement « ${s.a} » n'est pas réalisé`,
      };
      const question = pick([
        `Lis sur l'arbre ci-contre la valeur de $${b.notation}$.`,
        `D'après l'arbre ci-contre, quelle est ${enMots[cle]} ?`,
        `Quelle probabilité porte ${b.place} sur l'arbre ci-contre ? Donne sa valeur.`,
      ]);
      return {
        text: `${notations(s)} ${question}`,
        format: "short",
        expected: [fr(t[cle])],
        comparator: "number_equal",
        canvas: canvasArbre(t),
        explanation: exp(
          premierEtage
            ? "Les branches du PREMIER étage partent de la racine : elles portent des probabilités simples."
            : "Sur un arbre pondéré, les branches du SECOND étage portent les probabilités CONDITIONNELLES.",
          premierEtage
            ? `On cherche $${b.notation}$ : c'est ${b.place}.`
            : `On cherche $${b.notation}$ : on se place au nœud ${b.noeud}, puis on suit ${b.place}.`,
          `Cette branche porte $${fr(t[cle])}$, donc $${b.notation} = ${fr(t[cle])}$.`,
          `La probabilité cherchée est $${fr(t[cle])}$ — on la LIT, il n'y a aucun calcul à faire.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_arbre_lire_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre",
    microId: "alea_arbre_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un arbre pondéré, que représente la probabilité inscrite sur une branche du DEUXIÈME étage ?",
    format: "qcm",
    choices: [
      "Une probabilité conditionnelle",
      "Une probabilité d'intersection",
      "La probabilité du chemin entier",
      "Une somme de probabilités",
    ],
    expected: ["Une probabilité conditionnelle"],
    comparator: "mcq_exact",
    hint: "Pour arriver à cette branche, on a déjà franchi la première.",
    explanation: exp(
      "Les branches du premier étage portent des probabilités simples ; celles du second, des probabilités conditionnelles.",
      "Une branche du second étage se parcourt SACHANT qu'on a déjà emprunté la première.",
      "La branche menant à $B$ après $A$ porte $P_A(B)$.",
      "C'est une probabilité conditionnelle. L'intersection $P(A \\cap B)$, elle, s'obtient en multipliant les deux branches du chemin."
    ),
    tags: ["premiere", "maths", "probabilites", "arbre"],
  },

  /* ═══════════════ alea_arbre_completer ═══════════════ */

  {
    kind: "template",
    id: "premiere_arbre_completer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre",
    microId: "alea_arbre_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Les probabilités des branches issues d'un même nœud ont pour somme $1$.",
    tags: ["premiere", "maths", "probabilites", "arbre", "template", "short"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      const br = branches(t);
      const cle = pick(["pA", "pNonA"] as const);
      const b = br[cle];
      const autre = br[b.autre];
      const question = pick([
        `Sur l'arbre ci-contre, la probabilité portée par ${b.place} a été effacée. Quelle est-elle ?`,
        `Complète l'arbre ci-contre : quelle valeur remplace le « ? » ?`,
        `Sur l'arbre ci-contre, on a oublié d'écrire $${b.notation}$. Calcule-la.`,
        `Un camarade a recopié l'arbre ci-contre mais a laissé un trou au premier étage. Que faut-il écrire à la place du « ? » ?`,
      ]);
      return {
        text: `${notations(s)} ${question}`,
        format: "short",
        expected: [fr(t[cle])],
        comparator: "number_equal",
        canvas: canvasArbre(t, { masquer: cle }),
        explanation: exp(
          "La somme des probabilités des branches issues d'un même nœud vaut $1$.",
          `Deux branches partent de la racine : $${br.pA.notation}$ et $${br.pNonA.notation}$. On retire à $1$ celle qui est connue, $${autre.notation} = ${fr(t[b.autre])}$.`,
          `$${b.notation} = 1 - ${fr(t[b.autre])} = ${fr(t[cle])}$.`,
          `La branche manquante porte $${fr(t[cle])}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_arbre_completer_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre",
    microId: "alea_arbre_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "La règle vaut à chaque nœud, y compris au second étage.",
    tags: ["premiere", "maths", "probabilites", "arbre", "template", "short"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      const br = branches(t);
      const cle = pick(["pBsachantA", "pNonBsachantA", "pBsachantNonA", "pNonBsachantNonA"] as const);
      const b = br[cle];
      const autre = br[b.autre];
      const tournures = [
        `Sur l'arbre ci-contre, la probabilité portée par ${b.place} a été effacée. Quelle est-elle ?`,
        `Complète l'arbre ci-contre : quelle valeur remplace le « ? » du second étage ?`,
        `Sur l'arbre ci-contre, il manque $${b.notation}$. Calcule-la.`,
        `Un camarade affirme qu'il faut recopier $${fr(t[b.autre])}$ à la place du « ? » de l'arbre ci-contre. Il se trompe : quelle est la bonne valeur ?`,
      ];
      // Si les deux branches valent 0,5, le camarade aurait raison : on écarte cette tournure.
      const question = pick(t[cle] === t[b.autre] ? tournures.slice(0, 3) : tournures);
      return {
        text: `${notations(s)} ${question}`,
        format: "short",
        expected: [fr(t[cle])],
        comparator: "number_equal",
        canvas: canvasArbre(t, { masquer: cle }),
        explanation: exp(
          "À chaque nœud, la somme des branches qui en partent vaut $1$ — y compris au second étage.",
          `Le « ? » part du nœud ${b.noeud}. L'autre branche issue de ce nœud porte $${autre.notation} = ${fr(t[b.autre])}$. Attention : les branches de l'autre nœud n'entrent pas dans ce calcul.`,
          `$${b.notation} = 1 - ${fr(t[b.autre])} = ${fr(t[cle])}$.`,
          `La branche manquante porte $${fr(t[cle])}$.`
        ),
      };
    },
  },

  /* ═══════════════ alea_arbre_construire ═══════════════ */

  {
    kind: "template",
    id: "premiere_arbre_construire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre",
    microId: "alea_arbre_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "« Parmi les… » annonce une branche du SECOND étage.",
    tags: ["premiere", "maths", "probabilites", "arbre", "template"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      const A = s.labelA;
      const B = s.labelB;
      const br = branches(t);
      const pct = (x: number) => `$${fr(x * 100)}\\,\\%$`;
      const chemin = `sur aucune branche : c'est $P(${A} \\cap ${B})$, la probabilité d'un chemin`;
      const sur = (c: CleBranche) => `sur ${br[c].place}`;
      // L'information lue dans l'énoncé, ce qu'elle est, et les erreurs typiques.
      const cas = pick([
        { info: `Dans ${pct(t.pA)} des cas, $${A}$ est réalisé.`, bonne: sur("pA"), leurres: [sur("pBsachantA"), sur("pNonA"), chemin], quoi: `une probabilité simple : $${br.pA.notation}$` },
        { info: `Dans ${pct(t.pNonA)} des cas, $${A}$ n'est pas réalisé.`, bonne: sur("pNonA"), leurres: [sur("pA"), sur("pNonBsachantA"), sur("pBsachantNonA")], quoi: `une probabilité simple : $${br.pNonA.notation}$` },
        { info: `Lorsque $${A}$ est réalisé, $${B}$ l'est dans ${pct(t.pBsachantA)} des cas.`, bonne: sur("pBsachantA"), leurres: [sur("pBsachantNonA"), chemin, sur("pA")], quoi: `une probabilité conditionnelle : $${br.pBsachantA.notation}$` },
        { info: `Parmi les ${s.pop} pour lesquels $${A}$ est réalisé, ${pct(t.pNonBsachantA)} ne réalisent pas $${B}$.`, bonne: sur("pNonBsachantA"), leurres: [sur("pBsachantA"), sur("pNonBsachantNonA"), sur("pNonA")], quoi: `une probabilité conditionnelle : $${br.pNonBsachantA.notation}$` },
        { info: `Parmi les ${s.pop} pour lesquels $${A}$ n'est pas réalisé, ${pct(t.pBsachantNonA)} réalisent $${B}$.`, bonne: sur("pBsachantNonA"), leurres: [sur("pBsachantA"), sur("pNonA"), sur("pNonBsachantNonA")], quoi: `une probabilité conditionnelle : $${br.pBsachantNonA.notation}$` },
        { info: `Quand $${A}$ n'est pas réalisé, $${B}$ ne l'est pas non plus dans ${pct(t.pNonBsachantNonA)} des cas.`, bonne: sur("pNonBsachantNonA"), leurres: [sur("pNonBsachantA"), sur("pBsachantNonA"), sur("pNonA")], quoi: `une probabilité conditionnelle : $${br.pNonBsachantNonA.notation}$` },
        { info: `Dans ${pct(t.cheminAB)} des cas, $${A}$ ET $${B}$ sont réalisés tous les deux.`, bonne: chemin, leurres: [sur("pBsachantA"), sur("pA"), sur("pBsachantNonA")], quoi: `une intersection, $P(${A} \\cap ${B})$ : elle n'est portée par aucune branche, c'est le produit des branches du chemin $${A}$ puis $${B}$` },
      ]);
      const question = pick([
        `L'énoncé dit : « ${cas.info} » Où place-t-on cette information sur l'arbre pondéré ?`,
        `On construit l'arbre pondéré de la situation. L'énoncé indique : « ${cas.info} » Où écrit-on ce nombre ?`,
        `Pour dessiner l'arbre, on lit : « ${cas.info} » À quel endroit de l'arbre ce nombre va-t-il ?`,
      ]);
      return {
        text: `${notations(s)} ${question}`,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.leurres),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le premier étage porte les probabilités simples ; le second, les probabilités conditionnelles (« parmi… », « lorsque… ») ; un « et » donne une intersection, qui n'est sur aucune branche.",
          "On repère d'abord la population de référence : tout le monde (premier étage), ou seulement ceux d'un nœud (second étage).",
          `Cette information est ${cas.quoi}.`,
          cas.bonne === chemin
            ? `Ce nombre ne s'écrit sur aucune branche : on le retrouve en multipliant les branches du chemin $${A}$ puis $${B}$.`
            : `On l'écrit ${cas.bonne}.`
        ),
        choiceDiagnostics: cas.leurres.includes(chemin) && cas.bonne !== chemin
          ? [{ choice: chemin, cause: "confond la probabilité conditionnelle et la probabilité de l'intersection" }]
          : [{ choice: cas.leurres[0], cause: "a rattaché l'information à la mauvaise population (mauvais nœud ou mauvais étage)" }],
      };
    },
  },

  /* ═══════════════ alea_arbre_chemin ═══════════════ */

  {
    kind: "template",
    id: "premiere_arbre_chemin_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre_calcul",
    microId: "alea_arbre_chemin",
    difficulty: 3,
    theme: "neutral",
    hint: "Le long d'un chemin, on MULTIPLIE.",
    tags: ["premiere", "maths", "probabilites", "arbre", "chemin", "template", "short"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      const br = branches(t);
      const A = s.labelA;
      const B = s.labelB;
      // Les quatre chemins : premier étage, second étage, intersection, en mots.
      const c = pick([
        { e1: "pA", e2: "pBsachantA", inter: `${A} \\cap ${B}`, val: t.cheminAB, mots: `« ${s.a} » et « ${s.b} »` },
        { e1: "pA", e2: "pNonBsachantA", inter: `${A} \\cap ${barre(B)}`, val: t.cheminANonB, mots: `« ${s.a} » mais PAS « ${s.b} »` },
        { e1: "pNonA", e2: "pBsachantNonA", inter: `${barre(A)} \\cap ${B}`, val: t.cheminNonAB, mots: `« ${s.b} » mais PAS « ${s.a} »` },
        { e1: "pNonA", e2: "pNonBsachantNonA", inter: `${barre(A)} \\cap ${barre(B)}`, val: t.cheminNonANonB, mots: `ni « ${s.a} » ni « ${s.b} »` },
      ] as const);
      const b1 = br[c.e1];
      const b2 = br[c.e2];
      const donnees =
        `On sait que $${b1.notation} = ${fr(t[c.e1])}$ et $${b2.notation} = ${fr(t[c.e2])}$.`;
      const forme = pick(["arbre", "mots", "donnees", "piege"] as const);
      const question = {
        arbre: `À l'aide de l'arbre ci-contre, calcule $P(${c.inter})$.`,
        mots: `À l'aide de l'arbre ci-contre, calcule la probabilité d'avoir à la fois ${c.mots}.`,
        donnees: `${donnees} Calcule $P(${c.inter})$ (un arbre peut t'aider).`,
        piege: `${donnees} Un élève répond $P(${c.inter}) = ${fr(net(t[c.e1] + t[c.e2]))}$. Il se trompe : quelle est la bonne valeur ?`,
      }[forme];
      return {
        text: `${notations(s)} ${question}`,
        format: "short",
        expected: [fr(c.val)],
        comparator: "number_equal",
        ...(forme === "arbre" || forme === "mots" ? { canvas: canvasArbre(t) } : {}),
        explanation: exp(
          "La probabilité d'un chemin est le produit des probabilités portées par ses branches : $P(A \\cap B) = P(A) \\times P_A(B)$.",
          `On suit le chemin $${c.e1 === "pA" ? A : barre(A)}$ puis $${c.e2.startsWith("pNon") ? barre(B) : B}$ et on MULTIPLIE (on n'additionne pas).`,
          `$P(${c.inter}) = ${b1.notation} \\times ${b2.notation} = ${fr(t[c.e1])} \\times ${fr(t[c.e2])} = ${fr(c.val)}$.`,
          `$P(${c.inter}) = ${fr(c.val)}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_arbre_chemin_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre_calcul",
    microId: "alea_arbre_chemin",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un arbre pondéré, comment calcule-t-on la probabilité d'un chemin ?",
    format: "qcm",
    choices: [
      "On multiplie les probabilités rencontrées le long du chemin",
      "On additionne les probabilités rencontrées le long du chemin",
      "On prend la plus petite des deux",
      "On divise la seconde par la première",
    ],
    expected: ["On multiplie les probabilités rencontrées le long du chemin"],
    comparator: "mcq_exact",
    hint: "Le chemin correspond à une INTERSECTION : les deux évènements se produisent.",
    explanation: exp(
      "Un chemin représente l'intersection des évènements rencontrés.",
      "La formule $P(A \\cap B) = P(A) \\times P_A(B)$ se lit directement sur l'arbre.",
      "On multiplie donc les probabilités des branches successives.",
      "On multiplie LE LONG d'un chemin ; on additionne ENTRE plusieurs chemins qui mènent au même évènement — ce sont deux règles différentes."
    ),
    tags: ["premiere", "maths", "probabilites", "arbre", "chemin"],
  },

  /* ═══════════════ alea_arbre_somme_chemins ═══════════════ */

  {
    kind: "template",
    id: "premiere_arbre_somme_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre_calcul",
    microId: "alea_arbre_somme_chemins",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux chemins mènent à cet évènement : calcule-les, puis additionne.",
    tags: ["premiere", "maths", "probabilites", "arbre", "template", "short"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      const br = branches(t);
      const A = s.labelA;
      // P(B) ou P(B̄) : deux chemins à chaque fois, l'un par A, l'autre par Ā.
      const cible = pick([
        { ev: s.labelB, k1: "pBsachantA", k2: "pBsachantNonA", c1: t.cheminAB, c2: t.cheminNonAB, val: t.pB, mots: `« ${s.b} »` },
        { ev: barre(s.labelB), k1: "pNonBsachantA", k2: "pNonBsachantNonA", c1: t.cheminANonB, c2: t.cheminNonANonB, val: t.pNonB, mots: `que l'évènement « ${s.b} » ne soit PAS réalisé` },
      ] as const);
      const donnees =
        `On sait que $${br.pA.notation} = ${fr(t.pA)}$, $${br[cible.k1].notation} = ${fr(t[cible.k1])}$ ` +
        `et $${br[cible.k2].notation} = ${fr(t[cible.k2])}$.`;
      const forme = pick(["arbre", "mots", "donnees", "piege"] as const);
      const question = {
        arbre: `À l'aide de l'arbre ci-contre, calcule $P(${cible.ev})$.`,
        mots: `D'après l'arbre ci-contre, quelle est la probabilité ${cible.ev === s.labelB ? "que " : ""}${cible.mots} ?`,
        donnees: `${donnees} Calcule $P(${cible.ev})$.`,
        piege: `${donnees} Un élève ne garde que le chemin qui passe par $${A}$ et trouve $${fr(cible.c1)}$. Quelle est la vraie valeur de $P(${cible.ev})$ ?`,
      }[forme];
      return {
        text: `${notations(s)} ${question}`,
        format: "short",
        expected: [fr(cible.val)],
        comparator: "number_equal",
        ...(forme === "arbre" || forme === "mots" ? { canvas: canvasArbre(t) } : {}),
        explanation: exp(
          "Un évènement peut être atteint par plusieurs chemins : sa probabilité est la SOMME des probabilités de ces chemins (formule des probabilités totales).",
          `Deux chemins mènent à $${cible.ev}$ : l'un par $${A}$, l'autre par $${barre(A)}$. On multiplie le long de chacun, puis on additionne.`,
          `$${fr(t.pA)} \\times ${fr(t[cible.k1])} = ${fr(cible.c1)}$ et ` +
            `$${fr(t.pNonA)} \\times ${fr(t[cible.k2])} = ${fr(cible.c2)}$ (avec $${br.pNonA.notation} = 1 - ${fr(t.pA)} = ${fr(t.pNonA)}$). ` +
            `Somme : $${fr(cible.c1)} + ${fr(cible.c2)} = ${fr(cible.val)}$.`,
          `$P(${cible.ev}) = ${fr(cible.val)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_arbre_somme_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre_calcul",
    microId: "alea_arbre_somme_chemins",
    difficulty: 4,
    theme: "neutral",
    hint: "On multiplie le long d'un chemin, on additionne entre les chemins.",
    tags: ["premiere", "maths", "probabilites", "arbre", "template"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      const A = s.labelA;
      const versB = Math.random() < 0.5;
      const ev = versB ? s.labelB : barre(s.labelB);
      const x = versB ? t.pBsachantA : t.pNonBsachantA; // branche vers l'évènement, après A
      const y = versB ? t.pBsachantNonA : t.pNonBsachantNonA; // après Ā
      const val = versB ? t.pB : t.pNonB;
      const [pA, pNA] = [fr(t.pA), fr(t.pNonA)];
      const bon = `$${pA} \\times ${fr(x)} + ${pNA} \\times ${fr(y)}$`;
      const sommeCond = `$${fr(x)} + ${fr(y)}$`;
      const unChemin = `$${pA} \\times ${fr(x)}$`;
      const toutMultiplie = `$${pA} \\times ${fr(x)} \\times ${pNA} \\times ${fr(y)}$`;
      const nonPondere = `$${pA} \\times ${fr(x)} + ${fr(y)}$`;
      const leurres = shuffle([sommeCond, unChemin, toutMultiplie, nonPondere]);
      const question = pick([
        `Quel calcul donne $P(${ev})$ à partir de l'arbre ci-contre ?`,
        `On veut la probabilité de l'évènement $${ev}$. Quel calcul faut-il poser avec l'arbre ci-contre ?`,
        `Parmi ces calculs, lequel donne $P(${ev})$, d'après l'arbre ci-contre ?`,
      ]);
      return {
        text: `${notations(s)} ${question}`,
        format: "qcm",
        choices: makeChoices(bon, leurres),
        expected: [bon],
        comparator: "mcq_exact",
        canvas: canvasArbre(t),
        explanation: exp(
          "On multiplie le long de chaque chemin, puis on additionne les chemins qui mènent au même évènement.",
          `Deux chemins mènent à $${ev}$ : l'un par $${A}$, l'autre par $${barre(A)}$.`,
          `${bon.slice(0, -1)} = ${fr(val)}$.`,
          `C'est le bon calcul, et il donne $P(${ev}) = ${fr(val)}$.`
        ),
        choiceDiagnostics: [
          { choice: sommeCond, cause: "additionne des probabilités conditionnelles sans les pondérer par le premier étage" },
          { choice: unChemin, cause: `ne compte qu'un seul chemin : il oublie celui qui passe par $${barre(A)}$` },
          { choice: toutMultiplie, cause: "multiplie entre les chemins au lieu d'additionner" },
          { choice: nonPondere, cause: `oublie de multiplier le second chemin par $P(${barre(A)})$` },
        ],
      };
    },
  },

  /* ═══════════════ alea_arbre_vers_tableau ═══════════════ */

  {
    kind: "template",
    id: "premiere_arbre_vers_tableau_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre_calcul",
    microId: "alea_arbre_vers_tableau",
    difficulty: 4,
    theme: "neutral",
    hint: "Une case du tableau correspond à un chemin de l'arbre.",
    tags: ["premiere", "maths", "probabilites", "arbre", "tableau", "template", "short"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      const br = branches(t);
      const A = s.labelA;
      const B = s.labelB;
      const nA = barre(A);
      const nB = barre(B);
      // Effectif multiple de 100 : chaque case tombe sur un nombre entier.
      const effectif = pick([200, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000] as const);
      const fois = (p: number) => Math.round(p * effectif);
      const c = pick([
        { ligne: A, col: B, k1: "pA", k2: "pBsachantA", p: t.cheminAB },
        { ligne: A, col: nB, k1: "pA", k2: "pNonBsachantA", p: t.cheminANonB },
        { ligne: nA, col: B, k1: "pNonA", k2: "pBsachantNonA", p: t.cheminNonAB },
        { ligne: nA, col: nB, k1: "pNonA", k2: "pNonBsachantNonA", p: t.cheminNonANonB },
      ] as const);
      const total = Math.random() < 0.3;
      if (total) {
        // La case « Total » de la colonne B : deux chemins à additionner.
        const question = pick([
          `On veut remplir le tableau croisé d'effectifs pour $${effectif}$ ${s.pop}. Quel nombre faut-il écrire dans la case « Total » de la colonne $${B}$ ?`,
          `Sur $${effectif}$ ${s.pop}, combien réalisent l'évènement $${B}$, d'après l'arbre ci-contre ?`,
        ]);
        return {
          text: `${notations(s)} ${question}`,
          format: "short",
          expected: [String(fois(t.pB))],
          comparator: "number_equal",
          canvas: canvasArbre(t),
          explanation: exp(
            "Le total d'une colonne regroupe deux cases, donc deux chemins de l'arbre.",
            `On calcule $P(${B})$ en additionnant les chemins par $${A}$ et par $${nA}$, puis on multiplie par $${effectif}$.`,
            `$P(${B}) = ${fr(t.pA)} \\times ${fr(t.pBsachantA)} + ${fr(t.pNonA)} \\times ${fr(t.pBsachantNonA)} = ${fr(t.cheminAB)} + ${fr(t.cheminNonAB)} = ${fr(t.pB)}$, puis $${fr(t.pB)} \\times ${effectif} = ${fois(t.pB)}$.`,
            `On écrit $${fois(t.pB)}$ dans la case « Total » de la colonne $${B}$.`
          ),
        };
      }
      const question = pick([
        `On veut remplir le tableau croisé d'effectifs pour $${effectif}$ ${s.pop}. Quel nombre faut-il écrire dans la case à l'intersection de la ligne $${c.ligne}$ et de la colonne $${c.col}$ ?`,
        `Sur $${effectif}$ ${s.pop}, combien sont dans la case $${c.ligne} \\cap ${c.col}$ du tableau croisé, d'après l'arbre ci-contre ?`,
        `L'arbre ci-contre décrit les proportions. Pour $${effectif}$ ${s.pop}, quel effectif attend-on pour l'évènement $${c.ligne} \\cap ${c.col}$ ?`,
      ]);
      return {
        text: `${notations(s)} ${question}`,
        format: "short",
        expected: [String(fois(c.p))],
        comparator: "number_equal",
        canvas: canvasArbre(t),
        explanation: exp(
          "Une case d'un tableau croisé correspond à une intersection, c'est-à-dire à un chemin de l'arbre.",
          "On calcule la probabilité du chemin (on multiplie ses branches), puis on la multiplie par l'effectif total.",
          `$P(${c.ligne} \\cap ${c.col}) = ${br[c.k1].notation} \\times ${br[c.k2].notation} = ${fr(t[c.k1])} \\times ${fr(t[c.k2])} = ${fr(c.p)}$, ` +
            `puis $${fr(c.p)} \\times ${effectif} = ${fois(c.p)}$.`,
          `On attend $${fois(c.p)}$ ${s.pop} dans cette case. Arbre et tableau disent la même chose : l'un en proportions, l'autre en effectifs.`
        ),
      };
    },
  },
];
