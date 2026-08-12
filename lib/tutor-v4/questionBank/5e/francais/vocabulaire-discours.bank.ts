// lib/tutor-v4/questionBank/5e/francais/vocabulaire-discours.bank.ts
//
// LE VOCABULAIRE ET LES PAROLES RAPPORTÉES EN 5e — écrit le 12/08/2026.
//
// ⚠️ BO n° 10 du 5 mars 2026, applicable en 5e À LA RENTRÉE 2026 seulement.
// ⛔ Ne pas étendre à la 4e (2027) ni à la 3e (2028).
//
// PÉRIMÈTRE — « Vocabulaire et orthographe lexicale », cinq objectifs et seize
// attendus, contre cinq micros génériques dans le coach. Ce fichier ouvre ce
// qui n'était nulle part : « Connaitre le sens des préfixes et suffixes les
// plus fréquents » ; « Appréhender la dimension historique des mots
// (étymologie) en maitrisant quelques éléments latins, grecs ou empruntés aux
// langues étrangères » ; « Comprendre le fonctionnement du néologisme (de
// forme et de sens) » ; « Comprendre le principe de la dérivation des mots et
// son incidence sur l'orthographe » ; « Utiliser les mots en exploitant les
// variations de sens » ; « Maitriser l'usage du dictionnaire de langue en
// version papier et numérique ».
// Plus, sous la grammaire de l'oral et de l'écrit : « Identifier des paroles
// rapportées aux discours direct et indirect » et « Insérer des paroles au
// discours direct dans un texte ».
//
// ⚠️ Les registres de langue ne sont PAS ici : ils sont déjà tenus par
// `5e_discours_registres`. On n'ouvre que ce qui manque.
//
// ⚠️ LES LIGNES VONT PAR PAIRES dans trois tables — variations de sens, discours
// direct/indirect, et sens propre contre figuré. Le même mot, les mêmes
// paroles, dans deux emplois : c'est ce qui montre que le sens ne tient pas au
// mot mais à la phrase.
//
// ⛔ QCM uniquement, quatre propositions.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

type Paire = { readonly gauche: string; readonly droite: string };

/* =============================================================================
   1. LE SENS DES PRÉFIXES ET DES SUFFIXES
   ---------------------------------------------------------------------------
   Chaque affixe est donné DANS un mot : un préfixe seul ne veut rien dire, et
   c'est en le retrouvant ailleurs qu'on l'apprend.
   ========================================================================== */

const AFFIXES: readonly (Paire & { readonly affixe: string })[] = [
  { gauche: "relire", affixe: "re-", droite: "la répétition : faire à nouveau" },
  { gauche: "impossible", affixe: "im-", droite: "la négation : le contraire" },
  { gauche: "transporter", affixe: "trans-", droite: "le passage d'un lieu à un autre" },
  { gauche: "prévoir", affixe: "pré-", droite: "ce qui vient avant" },
  { gauche: "bicyclette", affixe: "bi-", droite: "le nombre deux" },
  { gauche: "antivol", affixe: "anti-", droite: "ce qui s'oppose, ce qui protège contre" },
  { gauche: "souterrain", affixe: "sous-", droite: "ce qui est en dessous" },
  { gauche: "hypermarché", affixe: "hyper-", droite: "le degré supérieur, l'excès" },
  { gauche: "dentiste", affixe: "-iste", droite: "le métier : celui qui l'exerce" },
  { gauche: "buvable", affixe: "-able", droite: "ce qui peut être fait" },
  { gauche: "fillette", affixe: "-ette", droite: "le petit : c'est un diminutif" },
  { gauche: "lenteur", affixe: "-eur", droite: "la qualité, devenue nom" },
  { gauche: "grandir", affixe: "-ir", droite: "l'action de devenir" },
  { gauche: "jardinage", affixe: "-age", droite: "l'action ou son résultat" },
];

const SENS_AFFIXES: readonly string[] = [...new Set(AFFIXES.map((a) => a.droite))];

/* =============================================================================
   2. L'ÉTYMOLOGIE : LES ÉLÉMENTS LATINS ET GRECS
   ---------------------------------------------------------------------------
   « en maitrisant quelques éléments » : le BO n'attend pas une liste, il
   attend qu'un élément reconnu ouvre plusieurs mots à la fois. Chaque ligne
   donne donc deux mots de la même racine.
   ========================================================================== */

const RACINES: readonly { readonly element: string; readonly langue: string; readonly sens: string; readonly mots: string }[] = [
  { element: "géo-", langue: "grec", sens: "la terre", mots: "géographie, géologie" },
  { element: "chrono-", langue: "grec", sens: "le temps", mots: "chronomètre, chronologie" },
  { element: "bio-", langue: "grec", sens: "la vie", mots: "biologie, biographie" },
  { element: "thermo-", langue: "grec", sens: "la chaleur", mots: "thermomètre, thermal" },
  { element: "hydro-", langue: "grec", sens: "l'eau", mots: "hydravion, hydratation" },
  { element: "-phone", langue: "grec", sens: "la voix, le son", mots: "téléphone, francophone" },
  { element: "-graphe", langue: "grec", sens: "l'écriture", mots: "orthographe, télégraphe" },
  { element: "poly-", langue: "grec", sens: "plusieurs", mots: "polygone, polyglotte" },
  { element: "micro-", langue: "grec", sens: "le petit", mots: "microscope, microbe" },
  { element: "aqua-", langue: "latin", sens: "l'eau", mots: "aquarium, aquatique" },
  { element: "terr-", langue: "latin", sens: "la terre", mots: "terrain, territoire" },
  { element: "vis-", langue: "latin", sens: "voir", mots: "vision, évident" },
  { element: "port-", langue: "latin", sens: "porter", mots: "transporter, portable" },
  { element: "manu-", langue: "latin", sens: "la main", mots: "manuscrit, manuel" },
  { element: "audi-", langue: "latin", sens: "entendre", mots: "audition, auditoire" },
];

const SENS_RACINES: readonly string[] = [...new Set(RACINES.map((r) => r.sens))];

/* =============================================================================
   3. LE NÉOLOGISME, DE FORME ET DE SENS
   ---------------------------------------------------------------------------
   Le BO distingue les deux : un mot NOUVEAU fabriqué, ou un mot ANCIEN qui
   prend un sens nouveau. On ajoute l'emprunt et le sigle, qui sont les deux
   autres portes d'entrée d'un mot dans la langue.
   ========================================================================== */

const NEOLOGISMES: readonly Paire[] = [
  { gauche: "télétravail", droite: "un néologisme de forme : un mot nouveau a été fabriqué" },
  { gauche: "une souris d'ordinateur", droite: "un néologisme de sens : un mot ancien prend un sens nouveau" },
  { gauche: "un smartphone", droite: "un emprunt à une langue étrangère" },
  { gauche: "covoiturage", droite: "un néologisme de forme : un mot nouveau a été fabriqué" },
  { gauche: "surfer sur Internet", droite: "un néologisme de sens : un mot ancien prend un sens nouveau" },
  { gauche: "un selfie", droite: "un emprunt à une langue étrangère" },
  { gauche: "un SMS", droite: "un sigle devenu un mot" },
  { gauche: "cyberharcèlement", droite: "un néologisme de forme : un mot nouveau a été fabriqué" },
  { gauche: "un virus informatique", droite: "un néologisme de sens : un mot ancien prend un sens nouveau" },
  { gauche: "un week-end", droite: "un emprunt à une langue étrangère" },
  { gauche: "le sida", droite: "un sigle devenu un mot" },
  { gauche: "écoresponsable", droite: "un néologisme de forme : un mot nouveau a été fabriqué" },
  { gauche: "naviguer sur un site", droite: "un néologisme de sens : un mot ancien prend un sens nouveau" },
  { gauche: "le football", droite: "un emprunt à une langue étrangère" },
  { gauche: "un OVNI", droite: "un sigle devenu un mot" },
];

const TYPES_NEO: readonly string[] = [...new Set(NEOLOGISMES.map((n) => n.droite))];

/* =============================================================================
   4. LA DÉRIVATION ET LA LETTRE MUETTE
   ---------------------------------------------------------------------------
   « son incidence sur l'orthographe » : la famille de mots ne sert pas qu'au
   sens, elle sert à ÉCRIRE. Un mot de la famille fait entendre la lettre qu'on
   n'entend pas.
   ========================================================================== */

const FAMILLES: readonly Paire[] = [
  { gauche: "tapis", droite: "tapisser" },
  { gauche: "galop", droite: "galoper" },
  { gauche: "tard", droite: "tardif" },
  { gauche: "sang", droite: "sanguin" },
  { gauche: "dent", droite: "dentiste" },
  { gauche: "camp", droite: "camper" },
  { gauche: "bond", droite: "bondir" },
  { gauche: "lait", droite: "laitier" },
  { gauche: "chant", droite: "chanter" },
  { gauche: "plomb", droite: "plomberie" },
  { gauche: "froid", droite: "froideur" },
  { gauche: "gros", droite: "grossir" },
  { gauche: "long", droite: "longueur" },
  { gauche: "respect", droite: "respecter" },
  { gauche: "toit", droite: "toiture" },
];

const TOUS_DERIVES: readonly string[] = [...new Set(FAMILLES.map((f) => f.droite))];

/* =============================================================================
   5. LES VARIATIONS DE SENS
   ---------------------------------------------------------------------------
   ⚠️ Les lignes vont PAR PAIRES : le même mot, deux phrases, deux sens. C'est
   la seule façon de montrer que le sens n'est pas dans le mot mais dans la
   phrase — et les deux sens du couple se servent de pièges l'un à l'autre.
   ========================================================================== */

const VARIATIONS: readonly { readonly phrase: string; readonly mot: string; readonly sens: string }[] = [
  { phrase: "Il a perdu le fil de son histoire.", mot: "le fil", sens: "la suite logique de ce qu'on dit" },
  { phrase: "Le fil s'est cassé pendant la couture.", mot: "le fil", sens: "le brin de coton" },
  { phrase: "Elle a la tête ailleurs depuis ce matin.", mot: "la tête", sens: "l'attention, la pensée" },
  { phrase: "Il s'est cogné la tête contre la poutre.", mot: "la tête", sens: "la partie du corps" },
  { phrase: "La note du restaurant était salée.", mot: "salée", sens: "beaucoup trop chère" },
  { phrase: "La soupe était trop salée pour moi.", mot: "salée", sens: "où l'on a mis trop de sel" },
  { phrase: "Il avait le cœur lourd en partant.", mot: "le cœur", sens: "les sentiments, l'émotion" },
  { phrase: "Le cœur bat plus vite après la course.", mot: "le cœur", sens: "l'organe qui envoie le sang" },
  { phrase: "Cette histoire ne tient pas debout.", mot: "tenir debout", sens: "ne pas être croyable" },
  { phrase: "Le vase ne tient pas debout sur ce meuble.", mot: "tenir debout", sens: "rester en équilibre" },
  { phrase: "Sa grand-mère a la main verte.", mot: "la main verte", sens: "le talent pour faire pousser les plantes" },
  { phrase: "Sa main était verte de peinture.", mot: "la main verte", sens: "une main couverte de couleur" },
  { phrase: "Le temps file, il faut partir.", mot: "filer", sens: "passer très vite" },
  { phrase: "Elle file la laine depuis l'aube.", mot: "filer", sens: "transformer en fil" },
];

const TOUS_SENS: readonly string[] = [...new Set(VARIATIONS.map((v) => v.sens))];

/* =============================================================================
   6. LIRE UN ARTICLE DE DICTIONNAIRE
   ---------------------------------------------------------------------------
   « en version papier ET numérique » : le BO nomme les deux, et elles ne se
   consultent pas pareil — l'une exige de connaitre la forme du mot, l'autre
   propose des formes proches.
   ========================================================================== */

const DICTIONNAIRE: readonly Paire[] = [
  { gauche: "Un mot a plusieurs sens numérotés dans l'article.", droite: "tu choisis celui qui va avec la phrase où tu as rencontré le mot" },
  { gauche: "L'article indique « n. m. ».", droite: "le mot est un nom masculin" },
  { gauche: "L'article indique « v. tr. ».", droite: "c'est un verbe transitif : il se construit avec un complément d'objet direct" },
  { gauche: "Tu cherches le mot « recommencerait ».", droite: "tu cherches son infinitif, « recommencer »" },
  { gauche: "Tu cherches le mot « chevaux ».", droite: "tu cherches son singulier, « cheval »" },
  { gauche: "Une indication figure entre crochets au début de l'article.", droite: "c'est l'origine du mot, son étymologie" },
  { gauche: "Une phrase en italique suit la définition.", droite: "c'est un exemple, qui montre le mot employé" },
  { gauche: "L'article distingue « voler¹ » et « voler² ».", droite: "ce sont deux mots différents qui s'écrivent de la même façon" },
  { gauche: "Tu ne connais pas l'orthographe exacte du mot.", droite: "tu tapes les premières lettres : le dictionnaire numérique propose des formes proches" },
  { gauche: "L'article indique « fam. ».", droite: "le mot appartient au registre familier" },
  { gauche: "Tu cherches un mot de sens voisin.", droite: "tu regardes la fin de l'article, ou tu ouvres un dictionnaire des synonymes" },
  { gauche: "Le dictionnaire numérique propose un haut-parleur.", droite: "tu peux écouter la prononciation du mot" },
  { gauche: "L'article indique « fig. » devant un sens.", droite: "le mot y est employé au sens figuré" },
  { gauche: "Tu cherches l'adjectif « belle ».", droite: "tu cherches son masculin, « beau »" },
];

/* =============================================================================
   7. DISCOURS DIRECT ET DISCOURS INDIRECT
   ---------------------------------------------------------------------------
   ⚠️ Les lignes vont PAR PAIRES : les mêmes paroles, une fois citées, une fois
   rapportées. Le passage de l'une à l'autre fait bouger la ponctuation, les
   personnes et les temps — et c'est ce déplacement qu'il faut voir.
   ========================================================================== */

const DISCOURS: readonly { readonly phrase: string; readonly direct: boolean }[] = [
  { phrase: "Il dit : « Je pars demain. »", direct: true },
  { phrase: "Il dit qu'il part le lendemain.", direct: false },
  { phrase: "Elle demanda : « Qui a ouvert la porte ? »", direct: true },
  { phrase: "Elle demanda qui avait ouvert la porte.", direct: false },
  { phrase: "« Attends-moi ! » cria-t-il.", direct: true },
  { phrase: "Il cria de l'attendre.", direct: false },
  { phrase: "Le maitre annonça : « Le contrôle est reporté. »", direct: true },
  { phrase: "Le maitre annonça que le contrôle était reporté.", direct: false },
  { phrase: "« Je ne sais pas », répondit-elle.", direct: true },
  { phrase: "Elle répondit qu'elle ne savait pas.", direct: false },
  { phrase: "Il murmura : « C'est fini. »", direct: true },
  { phrase: "Il murmura que c'était fini.", direct: false },
  { phrase: "« Viendras-tu avec nous ? » demanda-t-elle.", direct: true },
  { phrase: "Elle demanda s'il viendrait avec eux.", direct: false },
];

const D_DIRECT = "au discours direct : les paroles sont citées telles quelles, entre guillemets";
const D_INDIRECT = "au discours indirect : les paroles passent dans une subordonnée, sans guillemets";
const D_FAUX_1 = "au discours direct : les paroles passent dans une subordonnée, sans guillemets";
const D_FAUX_2 = "au discours indirect : les paroles sont citées telles quelles, entre guillemets";

/* =============================================================================
   8. INSÉRER DES PAROLES AU DISCOURS DIRECT
   ========================================================================== */

const INSERER: readonly Paire[] = [
  { gauche: "Le verbe de parole est placé AVANT les paroles.", droite: "il est suivi de deux-points, puis les paroles s'ouvrent sur un guillemet" },
  { gauche: "Le verbe de parole est placé APRÈS les paroles.", droite: "il forme une incise, et le sujet passe derrière le verbe" },
  { gauche: "Dans un dialogue, un autre personnage prend la parole.", droite: "on va à la ligne, et la réplique commence par un tiret" },
  { gauche: "Tu veux préciser qui parle au milieu de la réplique.", droite: "tu insères une incise entre virgules : « …, dit-il, … »" },
  { gauche: "Comment écrit-on l'incise « dit-il » ?", droite: "le verbe d'abord, le sujet ensuite, reliés par un trait d'union" },
  { gauche: "La réplique citée est une question.", droite: "le point d'interrogation reste à l'intérieur des guillemets" },
  { gauche: "Le récit est au passé et le personnage parle.", droite: "les paroles citées gardent leurs propres temps, souvent le présent" },
  { gauche: "Tu rapportes les paroles sans vouloir les citer.", droite: "tu passes au discours indirect : ni deux-points, ni guillemets" },
  { gauche: "Où se ferme le guillemet, quand il y a une incise à la fin ?", droite: "après la dernière parole, pas après l'incise" },
  { gauche: "Le personnage hésite au milieu de sa phrase.", droite: "on peut employer des points de suspension, à l'intérieur des guillemets" },
  { gauche: "La réplique reprend après l'incise, et la phrase n'était pas finie.", droite: "elle reprend sans nouvelle majuscule" },
  { gauche: "Trois répliques s'enchainent dans le dialogue.", droite: "chaque nouvelle prise de parole va à la ligne, précédée d'un tiret" },
  { gauche: "Tu veux montrer que le personnage crie.", droite: "tu choisis un verbe de parole précis, et le point d'exclamation reste dans les guillemets" },
  { gauche: "Les paroles citées se terminent la phrase.", droite: "le point final se met à l'intérieur des guillemets" },
];

export const vocabulaireDiscours5eBank: TutorBankItemV4[] = [
  /* ── 1. PRÉFIXES ET SUFFIXES ────────────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_voc_prefixe_suffixe_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "5e_voc_prefixe_suffixe",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche d'autres mots qui portent le même morceau.",
    tags: ["5e", "vocabulaire", "affixes", "template"],
    generate: () => {
      const a = randomChoice(AFFIXES);
      return {
        text: `Dans le mot « ${a.gauche} », que signifie « ${a.affixe} » ?`,
        format: "qcm" as const,
        choices: makeChoices(a.droite, SENS_AFFIXES),
        expected: [a.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot construit se lit en morceaux : le préfixe modifie le sens du radical, le suffixe en change souvent la classe. Connaitre les plus fréquents permet de comprendre des mots qu'on n'a jamais vus.",
          "Cherche deux ou trois autres mots qui portent le même morceau. Ce qu'ils ont en commun est le sens de l'affixe.",
          `« ${a.gauche} » : ${a.affixe} porte ${a.droite}.`,
          `« ${a.affixe} » porte ${a.droite}.`,
        ),
      };
    },
  },

  /* ── 2. ÉTYMOLOGIE ──────────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_voc_etymologie_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "5e_voc_etymologie",
    difficulty: 3,
    theme: "neutral",
    hint: "Les deux mots donnés partagent cet élément. Que peuvent-ils avoir en commun ?",
    tags: ["5e", "vocabulaire", "etymologie", "template"],
    generate: () => {
      const r = randomChoice(RACINES);
      return {
        text: `L'élément « ${r.element} » vient du ${r.langue}. On le retrouve dans ${r.mots}.\n\nQue signifie-t-il ?`,
        format: "qcm" as const,
        choices: makeChoices(r.sens, SENS_RACINES),
        expected: [r.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une grande partie du français vient du latin et du grec. Reconnaitre un élément ancien, c'est ouvrir d'un coup toute une famille de mots — et souvent deviner le sens d'un mot savant qu'on rencontre pour la première fois.",
          "Prends les deux mots donnés et cherche ce qu'ils ont en commun. Ce point commun est le sens de l'élément.",
          `${r.mots} : dans les deux, « ${r.element} » signifie ${r.sens}.`,
          `Il signifie ${r.sens}.`,
        ),
      };
    },
  },

  /* ── 3. NÉOLOGISME ──────────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_voc_neologisme_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "5e_voc_neologisme",
    difficulty: 3,
    theme: "neutral",
    hint: "Le mot est-il nouveau, ou est-ce son sens qui l'est ?",
    tags: ["5e", "vocabulaire", "neologisme", "template"],
    generate: () => {
      const n = randomChoice(NEOLOGISMES);
      return {
        text: `« ${n.gauche} »\n\nComment ce mot est-il entré dans la langue ?`,
        format: "qcm" as const,
        choices: makeChoices(n.droite, TYPES_NEO),
        expected: [n.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La langue fabrique des mots sans arrêt, de quatre façons : en construisant un mot neuf, en donnant un sens neuf à un mot ancien, en empruntant à une autre langue, ou en transformant un sigle en mot.",
          "Demande-toi si le mot existait déjà. S'il existait, c'est son sens qui est nouveau ; s'il est neuf, regarde s'il est fabriqué en français ou venu d'ailleurs.",
          `« ${n.gauche} » : c'est ${n.droite}.`,
          `C'est ${n.droite}.`,
        ),
      };
    },
  },

  /* ── 4. DÉRIVATION ET LETTRE MUETTE ─────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_voc_derivation_orthographe_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "5e_voc_derivation_orthographe",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche un mot de la même famille où la lettre s'entend.",
    tags: ["5e", "vocabulaire", "derivation", "orthographe", "template"],
    generate: () => {
      const f = randomChoice(FAMILLES);
      return {
        text: `Le mot « ${f.gauche} » se termine par une lettre qu'on n'entend pas.\n\nQuel mot de la même famille la fait entendre ?`,
        format: "qcm" as const,
        choices: makeChoices(f.droite, TOUS_DERIVES),
        expected: [f.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La dérivation ne sert pas qu'au sens : elle sert à écrire. Un mot de la même famille fait souvent entendre la lettre finale qui reste muette dans le mot de départ.",
          "Cherche un verbe, un adjectif ou un nom de la même famille, et écoute la fin.",
          `« ${f.gauche} » → « ${f.droite} » : la lettre finale s'entend, et on sait comment écrire le premier.`,
          `C'est « ${f.droite} ».`,
        ),
      };
    },
  },

  /* ── 5. VARIATIONS DE SENS ──────────────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_voc_variations_sens_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "5e_voc_variations_sens",
    difficulty: 3,
    theme: "neutral",
    hint: "Le sens n'est pas dans le mot : il est dans la phrase.",
    tags: ["5e", "vocabulaire", "polysemie", "template"],
    generate: () => {
      const v = randomChoice(VARIATIONS);
      // ⚠️ Le piège qui compte est L'AUTRE SENS DU MÊME MOT — c'est celui-là
      // que l'élève doit écarter en relisant la phrase. Tiré au hasard dans la
      // table, il ne sortait qu'une fois sur cinq, et les autres propositions
      // s'éliminaient d'un coup d'œil. On le force.
      const jumeau = VARIATIONS.find((x) => x.mot === v.mot && x.sens !== v.sens);
      const autres = shuffle(TOUS_SENS.filter((s) => s !== v.sens && s !== jumeau?.sens)).slice(0, 2);
      return {
        text: `« ${v.phrase} »\n\nQue signifie « ${v.mot} » ici ?`,
        format: "qcm" as const,
        choices: shuffle([v.sens, ...(jumeau ? [jumeau.sens] : []), ...autres]),
        expected: [v.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un même mot change de sens selon la phrase. Parfois il garde son sens premier — le sens propre —, parfois il en prend un autre par image — le sens figuré. Les deux sont justes ; c'est le contexte qui tranche.",
          "Remplace le mot par chacun des sens proposés et relis la phrase entière. Un seul la laisse debout.",
          `Dans « ${v.phrase} », « ${v.mot} » signifie ${v.sens}.`,
          `Il signifie ${v.sens}.`,
        ),
      };
    },
  },

  /* ── 6. LE DICTIONNAIRE ─────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_voc_dictionnaire_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "vocabulaire",
    microId: "5e_voc_dictionnaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Un article de dictionnaire est plein d'abréviations, et chacune dit quelque chose.",
    tags: ["5e", "vocabulaire", "dictionnaire", "template"],
    generate: () => {
      const d = randomChoice(DICTIONNAIRE);
      return {
        text: `${d.gauche}\n\nQu'est-ce que cela veut dire, ou que fais-tu ?`,
        format: "qcm" as const,
        choices: makeChoices(d.droite, DICTIONNAIRE.map((x) => x.droite)),
        expected: [d.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un dictionnaire de langue ne donne pas qu'une définition : il donne la classe du mot, son origine, ses sens numérotés, des exemples, et le registre auquel il appartient. Le dictionnaire numérique ajoute la prononciation et rattrape les orthographes approchantes.",
          "Cherche toujours le mot sous sa forme de base : l'infinitif pour un verbe, le masculin singulier pour un nom ou un adjectif.",
          `${d.gauche} → ${d.droite}.`,
          `${d.droite.charAt(0).toUpperCase()}${d.droite.slice(1)}.`,
        ),
      };
    },
  },

  /* ── 7. DISCOURS DIRECT ET INDIRECT ─────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_discours_direct_indirect_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "analyse_discours",
    microId: "5e_discours_direct_indirect",
    difficulty: 2,
    theme: "neutral",
    hint: "Y a-t-il des guillemets, ou un « que » qui ouvre une subordonnée ?",
    tags: ["5e", "discours", "paroles-rapportees", "template"],
    generate: () => {
      const d = randomChoice(DISCOURS);
      const bon = d.direct ? D_DIRECT : D_INDIRECT;
      return {
        text: `« ${d.phrase} »\n\nComment les paroles sont-elles rapportées ?`,
        format: "qcm" as const,
        choices: shuffle([D_DIRECT, D_INDIRECT, D_FAUX_1, D_FAUX_2]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Au discours direct, on entend le personnage : ses mots sont cités tels quels, entre guillemets, après un verbe de parole. Au discours indirect, c'est le narrateur qui rapporte : les paroles deviennent une subordonnée, et les personnes comme les temps se déplacent.",
          "Cherche les guillemets. S'ils manquent et qu'un « que », un « si » ou un mot interrogatif ouvre la suite, c'est du discours indirect.",
          d.direct
            ? `« ${d.phrase} » cite les paroles entre guillemets : c'est du discours direct.`
            : `« ${d.phrase} » n'a pas de guillemets et fait passer les paroles dans une subordonnée : c'est du discours indirect.`,
          `Elles sont ${bon}.`,
        ),
      };
    },
  },

  /* ── 8. INSÉRER DES PAROLES ─────────────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_discours_inserer_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "analyse_discours",
    microId: "5e_discours_inserer",
    difficulty: 3,
    theme: "neutral",
    hint: "La ponctuation du dialogue n'est pas décorative : elle dit qui parle et quand.",
    tags: ["5e", "discours", "dialogue", "ponctuation", "template"],
    generate: () => {
      const i = randomChoice(INSERER);
      const enonce = i.gauche.endsWith("?") ? i.gauche : `${i.gauche}\n\nQue fais-tu ?`;
      return {
        text: enonce,
        format: "qcm" as const,
        choices: makeChoices(i.droite, INSERER.map((x) => x.droite)),
        expected: [i.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Insérer des paroles dans un récit demande une ponctuation précise : deux-points et guillemets quand le verbe de parole précède, incise avec inversion du sujet quand il suit, tiret et retour à la ligne à chaque changement de personne.",
          "Repère d'abord où se trouve le verbe de parole — avant, après, ou au milieu. La ponctuation en découle.",
          `${i.gauche} → ${i.droite}.`,
          `${i.droite.charAt(0).toUpperCase()}${i.droite.slice(1)}.`,
        ),
      };
    },
  },
];
