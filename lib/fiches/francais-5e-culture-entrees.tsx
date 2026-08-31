// ─── Fiche de cours : les quatre entrées de culture littéraire (5e) ───────────
// LA VINGT-CINQUIÈME FICHE DE LA 5e — et elle FERME LE DOMAINE DE LA CULTURE,
// ouvert la veille par `culture_connaissances`.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// Perspective annuelle : « Éprouver, expérimenter : la découverte de soi,
// d'autrui et du monde », et sous elle les QUATRE entrées que le texte nomme.
// ⛔ Elles ne valent QUE pour la 5e : la 4e et la 3e ont les leurs, et elles ne
// se ressemblent pas.
//
// ⛔⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE. Les œuvres intégrales sont choisies par
// le professeur, et le coach n'a rien fait lire : ce qui s'interroge, c'est ce
// qui SE TRANSPORTE d'une œuvre à l'autre — ce qui fait une figure héroïque, ce
// qui fait voyager dans un vers, les ressorts du renversement comique, ce qu'un
// personnage de fable incarne. Les figures convoquées (le renard, le loup, le
// valet) sont celles que tout élève a croisées, jamais un titre.
//
// ⭐⭐ LE FIL, ET IL EST DANS LE BO LUI-MÊME : LE MIROIR GROSSISSANT. Le texte
// l'écrit du théâtre — « la scène en folie n'est jamais non-sens, mais miroir
// grossissant tendu aux spectateurs ». La formule vaut pour les quatre entrées,
// et c'est ce qui en fait un programme et non une liste : la fable grossit un
// trait humain jusqu'à en faire un animal, le héros grossit ce qu'on voudrait
// pouvoir, le théâtre grossit la société en la renversant, et la poésie grossit
// un son jusqu'à faire entendre le sable sous les semelles.
//
// ⭐ DEUX AXES, ET LES ÉLÈVES LES CONFONDENT. Le BO trace deux lignes qui ne sont
// PAS la même : « des récits mythologiques jusqu'aux superhéros modernes » est
// une ligne du TEMPS ; « de l'épopée au roman moderne, le héros perd en superbe
// et gagne en banalité » est une ligne d'INTENSITÉ. Le super-héros est tard dans
// le temps et haut en superbe : il casse la première ligne si on les confond.
// La `number_line` porte la seconde — celle que le BO nomme —, et la fiche dit
// explicitement que ce n'est pas une chronologie.
//
// ⭐ TROIS EMPLOIS DE CANVAS, TOUS DÉJÀ INVENTÉS, AUCUN NEUF :
// - LA BANDE `nature` DIT CE QUE LE MOT INCARNE : « le renard » avec « la ruse »
//   au-dessus. Trois animaux cessent d'être trois animaux — c'est le miroir
//   grossissant en un dessin, et c'est la figure de référence.
// - DEUX ARCS PARTANT DU MÊME MOT DESSINENT LE QUIPROQUO : « il » pointe vers le
//   chien pour elle, vers le fiancé pour lui. Le malentendu se voit.
// - LE MOT RÉPÉTÉ TROIS FOIS EST LE RESSORT COMIQUE LUI-MÊME : on n'explique pas
//   la répétition, on la montre.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette de groupe n'est ici une FONCTION
// grammaticale — toutes doivent rester grises. Mots écartés parce que
// `couleurFonction` les attrape : « le sujet », « le nom », « la proposition ».
// On dit « celui d'en bas », « celui d'en haut », « ce qu'on entend ».
//
// Alignée sur les tables HEROS, POESIE, THEATRE et FIGURES de
// lib/tutor-v4/questionBank/5e/francais/culture-litteraire.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `culture_entrees_5e`) :
// - 5e_cult_heros            → propriétés 1 à 3, méthode 1, usage 1, exemples 1 et 2
// - 5e_cult_voyage_poesie    → propriétés 4 et 5, méthode 2, usage 2, exemple 3
// - 5e_cult_theatre          → propriétés 6 à 8, méthode 3, usage 3, exemples 4 et 5
// - 5e_cult_plaire_instruire → figure, propriétés 9 et 10, formule, méthode 4,
//                              usage 4, exemple 6

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

/** L'axe que le BO nomme : « le héros perd en superbe et gagne en banalité ».
 *  ⚠️ `showValues: false` — ce n'est pas une chronologie, et surtout pas des
 *  nombres. Le canvas décale les étiquettes en hauteur : elles ne se marchent
 *  pas dessus même quand elles sont longues. */
function axe(points: NumberLineCanvasPoint[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min: 0,
        max: 5,
        step: 1,
        points,
        size: { width: 235, height: 78 },
        display: { showTicks: false, showValues: false, showZero: false },
      }}
    />
  );
}

/** Les traits d'une figure héroïque, et les ressorts du comique.
 *  ⚠️ Cellules courtes : à la largeur d'un bloc, vingt signes tombent sous le
 *  plancher de 11 px. */
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

// ─── Ce qui se dessine quand un texte tend un miroir ──────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : la bande `nature` dit ce que l'animal INCARNE.
// Trois bêtes, trois facettes de l'être humain — le miroir grossissant en un
// dessin, et l'élève le voit avant qu'on le lui explique.
const troisFigures = phrase({
  mots: [
    { texte: "le renard", nature: "la ruse" },
    { texte: "le lion", nature: "le pouvoir" },
    { texte: "l'agneau", nature: "l'innocence" },
  ],
  legende: "Un animal de fable n'est pas un animal : c'est une facette de l'humain.",
});

const figuresOpposees = phrase({
  mots: [
    { texte: "la cigale", nature: "l'instant" },
    { texte: "la fourmi", nature: "demain" },
  ],
  liens: [{ de: 0, vers: 1, label: "s'oppose à", type: "question" }],
  legende: "Deux figures ne valent que l'une contre l'autre : c'est le débat.",
});

// ── LE HÉROS : l'axe que le BO nomme, et les traits qui le situent.
const axeHeros = axe([
  { value: 1, label: "épopée" },
  { value: 2, label: "conte" },
  { value: 3, label: "super-héros" },
  { value: 4, label: "ordinaire" },
]);

const grilleHeros = grille({
  headers: ["Le trait", "La figure"],
  rows: [
    { values: ["fils d'un dieu", "épopée"] },
    { values: ["aidé en chemin", "conte"] },
    { values: ["un masque", "super-héros"] },
    { values: ["aucun exploit", "ordinaire"] },
  ],
  caption: "Un seul trait suffit à situer un héros.",
});

const grilleHerosOrdinaire = grille({
  headers: ["Le trait", "La figure"],
  rows: [
    { values: ["fils d'un dieu", "épopée"] },
    { values: ["aidé en chemin", "conte"] },
    { values: ["un masque", "super-héros"] },
    { values: ["aucun exploit", "ordinaire"] },
  ],
  highlight: { row: 3 },
  caption: "Tenir sans que personne ne le remarque est aussi un exploit.",
});

// ── LA POÉSIE : ce qui fait voyager, c'est la LANGUE, pas le sujet.
// ⚠️ Vers écrits pour la banque du coach ; aucun texte d'auteur reproduit.
const versSonorites = phrase({
  mots: [
    { texte: "Le" },
    { texte: "sable", focus: true },
    { texte: "siffle", focus: true },
    { texte: "sous", focus: true },
    { texte: "les" },
    { texte: "semelles", focus: true },
  ],
  legende: "Quatre S de suite : le vers siffle comme ce dont il parle.",
});

const versImage = phrase({
  mots: [
    { texte: "La mer", focus: true },
    { texte: "un champ labouré", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "fait voir", type: "question" }],
  legende: "L'image montre une chose à travers une autre : deux mots, un paysage.",
});

const versRythme = phrase({
  mots: [
    { texte: "Je pars,", focus: true },
    { texte: "je pars,", focus: true },
    { texte: "je pars" },
    { texte: "—" },
    { texte: "et je reste" },
  ],
  legende: "Le rythme fait entendre le mouvement — et le tiret l'arrête net.",
});

const versLieux = phrase({
  mots: [
    { texte: "Bombay,", focus: true },
    { texte: "Zanzibar,", focus: true },
    { texte: "Valparaiso", focus: true },
  ],
  legende: "Trois noms, et le lecteur a changé d'hémisphère sans une explication.",
});

// ── LE THÉÂTRE : la société renversée, et les ressorts qui la renversent.
const renversement = phrase({
  mots: [
    { texte: "le valet" },
    { texte: "commande" },
    { texte: "le maitre" },
    { texte: "obéit" },
  ],
  groupes: [
    { mots: [0, 1], label: "celui d'en bas" },
    { mots: [2, 3], label: "celui d'en haut" },
  ],
  legende: "La scène met la société sens dessus dessous — et la salle se reconnait.",
});

// ⭐ DEUX ARCS PARTANT DU MÊME MOT : le quiproquo se voit.
const quiproquo = phrase({
  mots: [
    { texte: "le chien" },
    { texte: "« il »", focus: true },
    { texte: "son fiancé" },
  ],
  liens: [
    { de: 1, vers: 0, label: "elle entend", type: "question" },
    { de: 1, vers: 2, label: "il dit", type: "question" },
  ],
  legende: "Un seul mot, deux directions : chacun croit parler de la même chose.",
});

// ⭐ LE RESSORT MONTRÉ, PAS EXPLIQUÉ.
const repetition = phrase({
  mots: [
    { texte: "il jure de se taire", focus: true },
    { texte: "il jure", focus: true },
    { texte: "il jure", focus: true },
  ],
  legende: "Le même geste revient : à la troisième fois, la salle rit toute seule.",
});

// ⭐ LA BANDE `nature` DIT CE QU'IL Y A DESSOUS.
const deguisement = phrase({
  mots: [
    { texte: "l'habit du docteur", nature: "le valet dessous" },
    { texte: "on le croit", nature: "et cela suffit" },
  ],
  legende: "Le costume fait le savant : c'est ce que la pièce met en accusation.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCultureEntrees5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "culture-entrees-5e",
  titre: `Les quatre entrées de culture littéraire en 5e (${ANNEE_SCOLAIRE})`,
  accroche:
    "Le programme dit du théâtre qu'il tend « un miroir grossissant » à ceux qui regardent. La formule vaut pour les quatre entrées de l'année : la fable grossit un défaut humain jusqu'à en faire un animal, le héros grossit ce qu'on voudrait pouvoir, la poésie grossit un son jusqu'à faire entendre le sable. On lit pour se voir en plus grand.",
  identite: [
    { label: "Mots clés", valeur: "Héros, poésie, théâtre, fable" },
    { label: "Le secret", valeur: "Chaque entrée tend un miroir grossissant" },
    { label: "Outil", valeur: "De quoi ce personnage est-il l'image ?" },
  ],
  definition: {
    texte:
      "Le programme de 5e range l'année entière sous une seule perspective — « Éprouver, expérimenter : la découverte de soi, d'autrui et du monde » — et il la découpe en QUATRE ENTRÉES. DEVENIR HÉROÏNE, HÉROS suit une figure qui change de forme selon les époques : le héros d'épopée descend d'un dieu, celui du conte est le plus jeune et se fait aider, le super-héros cache un pouvoir sous un masque, et le héros du roman moderne ne fait aucun exploit. VOYAGER EN POÉSIE : ce qui fait voyager n'est pas le sujet du poème mais la LANGUE — les sonorités, une image, le rythme, des noms de lieux. EXPÉRIMENTER ET JOUER AU THÉÂTRE : la scène renverse la société, et ses ressorts se retrouvent d'une pièce à l'autre — le renversement des rôles, le quiproquo, la répétition, le déguisement, le mot d'esprit. IMAGINER, SENTIR, RAISONNER : les personnages de fable et de conte incarnent chacun une facette de l'être humain, et les mettre face à face fait le débat.",
  },
  figure: {
    schema: pile(troisFigures, figuresOpposees),
    legende:
      "La bande grise ne dit pas ce que ces mots SONT, elle dit ce qu'ils INCARNENT : au-dessus du renard, la ruse ; au-dessus du lion, le pouvoir ; au-dessus de l'agneau, l'innocence. Une fois cette bande écrite, trois animaux cessent d'être trois animaux — c'est le miroir grossissant, et il vaut pour les quatre entrées de l'année. Et deux figures opposées, la cigale et la fourmi, ne valent que l'une contre l'autre : c'est ainsi qu'une fable fait penser sans faire la leçon.",
  },
  proprietes: [
    {
      titre: "Le héros perd en superbe et gagne en banalité",
      texte:
        "C'est la phrase du programme. De l'épopée au roman moderne, la figure descend : moins d'exploits, plus de ressemblance avec toi.",
      schema: axeHeros,
      micros: ["5e_cult_heros"],
    },
    {
      titre: "Attention : cet axe n'est pas une chronologie",
      texte:
        "Le super-héros est le plus récent et reste très haut en superbe. Deux lignes différentes : le temps, et l'écart avec l'ordinaire.",
      schema: axeHeros,
      micros: ["5e_cult_heros"],
    },
    {
      titre: "Un seul trait suffit à situer un héros",
      texte:
        "Descendre d'un dieu, être aidé en chemin par une vieille femme, porter un masque, n'accomplir aucun exploit : chacun dit la figure.",
      schema: grilleHeros,
      micros: ["5e_cult_heros"],
    },
    {
      titre: "En poésie, c'est la LANGUE qui fait voyager",
      texte:
        "Pas le sujet. Un poème sur la mer ne dépayse pas parce qu'il parle de la mer : il dépayse par ses sons, ses images, son rythme.",
      schema: versSonorites,
      micros: ["5e_cult_voyage_poesie"],
    },
    {
      titre: "Quatre manières de déplacer un lecteur",
      texte:
        "Les sonorités imitent, l'image fait voir une chose à travers une autre, le rythme fait entendre le mouvement, les noms de lieux suffisent.",
      schema: pile(versImage, versLieux),
      micros: ["5e_cult_voyage_poesie"],
    },
    {
      titre: "Au théâtre, celui d'en bas commande",
      texte:
        "Le valet mène l'intrigue, la servante sait tout, le paysan a raison contre les nobles. La scène retourne la société pour la montrer.",
      schema: renversement,
      micros: ["5e_cult_theatre"],
    },
    {
      titre: "Le quiproquo : un mot, deux directions",
      texte:
        "Elle croit qu'il parle du chien, il parle de son fiancé. Personne ne ment, et pourtant tout le monde se trompe.",
      schema: quiproquo,
      micros: ["5e_cult_theatre"],
    },
    {
      titre: "Répétition et déguisement",
      texte:
        "Le même geste qui revient finit par faire rire. Et le costume fait le savant : c'est ce que la pièce met en accusation.",
      schema: pile(repetition, deguisement),
      micros: ["5e_cult_theatre"],
    },
    {
      titre: "Chaque figure incarne une facette de l'humain",
      texte:
        "La ruse, le pouvoir qui ne se justifie pas, l'innocence sans défense, la vanité qu'un compliment achète. Ce sont des gens.",
      schema: troisFigures,
      micros: ["5e_cult_plaire_instruire"],
    },
    {
      titre: "Les figures vont par paires",
      texte:
        "La cigale contre la fourmi, le chêne contre le roseau, le rat des villes contre celui des champs. Le sens nait de l'opposition.",
      schema: figuresOpposees,
      micros: ["5e_cult_plaire_instruire"],
    },
  ],
  reel: {
    texte:
      "Les quatre entrées sont partout autour de toi. Une série de super-héros et un film sur un livreur à vélo racontent le même besoin : voir quelqu'un tenir contre plus fort que lui — et la seconde te ressemble davantage, c'est tout l'axe du programme. Une chanson dont tu ne comprends pas les paroles peut te déplacer : c'est exactement le voyage par la langue, sans le sujet. Une vidéo où un stagiaire explique son métier à son patron, et où le patron n'y comprend rien, est un renversement de rôles vieux de quatre siècles. Et quand tu dis de quelqu'un « c'est un renard », tu fais une fable en trois mots : tu grossis un trait jusqu'à ce qu'il devienne visible. Le cours ne t'apprend pas ces gestes — il t'apprend à voir que ce sont les mêmes.",
  },
  historique: {
    texte:
      "Le renversement des rôles n'a pas été inventé par le théâtre : il vient d'une fête. Au Moyen Âge, pendant quelques jours d'hiver, certaines villes élisaient un « roi » parmi les plus humbles, et l'ordre habituel se retournait le temps de la fête — on appelait cela les fêtes des fous. Tout revenait en place ensuite, et c'était bien la condition pour que l'on tolère la chose. Les comédies ont hérité de ce mécanisme : un valet commande, une servante sait tout, un paysan a raison contre les nobles — puis le rideau tombe et chacun retrouve sa place. C'est ce qui a permis à ces pièces de dire, en faisant rire, ce qu'aucun discours n'aurait pu dire devant les mêmes personnes.",
  },
  formule: {
    contexte: "La question qui ouvre les quatre entrées, et qui ne se répond jamais par un résumé.",
    expression: "de quoi ce personnage est-il l'image ?",
    legende:
      "Le renard n'est pas un renard : il est la ruse. Le valet qui commande n'est pas un valet : il est ce que la société cache. Le héros ordinaire n'est pas quelqu'un de terne : il est toi. Répondre à cette question, c'est passer de l'histoire racontée à ce qu'elle grossit — et c'est tout ce que le programme demande.",
    schema: troisFigures,
  },
  methode: [
    {
      titre: "Chercher le trait, pas l'histoire",
      texte:
        "Un dieu pour père, une aide reçue en chemin, un masque, aucun exploit : un seul détail situe la figure, et il tient en trois mots.",
      schema: grilleHeros,
      micros: ["5e_cult_heros"],
    },
    {
      titre: "Relire un vers à voix haute pour l'entendre",
      texte:
        "Ce qui fait voyager s'entend avant de se comprendre : des sons qui reviennent, un rythme qui court, un nom qu'on n'a jamais dit.",
      schema: versRythme,
      micros: ["5e_cult_voyage_poesie"],
    },
    {
      titre: "Demander qui commande dans la scène",
      texte:
        "Si c'est celui qui devrait obéir, tu tiens le renversement. Puis cherche le ressort : quiproquo, répétition, déguisement, mot d'esprit.",
      schema: renversement,
      micros: ["5e_cult_theatre"],
    },
    {
      titre: "Nommer la facette, pas l'animal",
      texte:
        "« Le loup » ne veut rien dire ; « la force qui invente ses raisons après coup » se discute. Écris la facette au-dessus du nom.",
      schema: troisFigures,
      micros: ["5e_cult_plaire_instruire"],
    },
  ],
  usages: [
    {
      titre: "Pour dire ce qu'un héros a de neuf",
      detail:
        "Situe-le sur l'axe : plus près de l'épopée ou plus près de toi ? C'est ce déplacement que l'autrice ou l'auteur a choisi, et il veut dire quelque chose.",
      schema: grilleHerosOrdinaire,
      micros: ["5e_cult_heros"],
    },
    {
      titre: "Pour parler d'un poème sans le paraphraser",
      detail:
        "Ne redis pas ce qu'il raconte : dis ce qui, dans la langue, t'a déplacé. Un son répété, une image, un rythme — cela se cite.",
      schema: versSonorites,
      micros: ["5e_cult_voyage_poesie"],
    },
    {
      titre: "Pour expliquer pourquoi une scène fait rire",
      detail:
        "Nomme le ressort. « C'est drôle » ne se défend pas ; « il répète six fois qu'il va se taire » se défend, et se retrouve ailleurs.",
      schema: repetition,
      micros: ["5e_cult_theatre"],
    },
    {
      titre: "Pour discuter d'une fable sans la moraliser",
      detail:
        "Mets deux figures face à face. La fourmi a-t-elle raison de ne pas partager ? La question est ouverte, et c'est pour cela qu'on la pose.",
      schema: figuresOpposees,
      micros: ["5e_cult_plaire_instruire"],
    },
  ],
  exemples: [
    {
      titre: "Situer une figure",
      donnees: "« Il descend d'un dieu, il met dix ans à rentrer chez lui, et le récit est en vers. »",
      schema: grilleHeros,
      question: "De quelle figure héroïque s'agit-il ?",
      solution:
        "UN HÉROS D'ÉPOPÉE. Trois traits, et chacun suffirait : une ascendance divine, une durée démesurée, et surtout le vers — l'épopée se chante avant d'être lue. Aucun titre n'est nécessaire pour répondre, et c'est précisément ce qui rend le repère utile.",
      micros: ["5e_cult_heros"],
    },
    {
      titre: "Une autre figure",
      donnees: "« Elle rate son examen, doute d'elle-même, et c'est cela qui nous la rend proche. »",
      schema: grilleHerosOrdinaire,
      question: "Quelle figure ?",
      solution:
        "UN HÉROS ORDINAIRE DU ROMAN MODERNE. Elle a perdu toute superbe et gagné en banalité — la phrase même du programme. L'échec n'est pas ici un défaut du personnage : c'est ce qui permet au lecteur de s'y reconnaitre, et c'est donc le sujet.",
      micros: ["5e_cult_heros"],
    },
    {
      titre: "Ce qui fait voyager",
      donnees: "« Bombay, Zanzibar, Valparaiso, Karikal »",
      schema: versLieux,
      question: "Qu'est-ce qui déplace le lecteur ?",
      solution:
        "LES NOMS DE LIEUX, à eux seuls. Il n'y a pas une phrase, pas un verbe, aucune description : quatre noms alignés, et pourtant on a fait le tour du monde. Ce vers prouve mieux que tout que le voyage est dans la langue et non dans le sujet.",
      micros: ["5e_cult_voyage_poesie"],
    },
    {
      titre: "Un ressort comique",
      donnees: "« Elle croit qu'il parle du chien ; il parle de son fiancé. »",
      schema: quiproquo,
      question: "Quel est le ressort ?",
      solution:
        "LE QUIPROQUO. Les deux arcs partent du même mot et n'aboutissent pas au même endroit : personne ne ment, et pourtant la conversation entière est fausse. Le public, lui, voit les deux flèches — et c'est de le savoir qui le fait rire.",
      micros: ["5e_cult_theatre"],
    },
    {
      titre: "Un autre ressort",
      donnees: "« Le paysan explique la politique aux nobles — et il a raison. »",
      schema: renversement,
      question: "Quel est le ressort ?",
      solution:
        "LE RENVERSEMENT DES RÔLES : celui d'en bas commande. Le rire ne vient pas du paysan mais des nobles, qui perdent leur place. C'est le miroir grossissant du programme : la salle rit d'un monde retourné, et se reconnait dans le monde d'avant.",
      micros: ["5e_cult_theatre"],
    },
    {
      titre: "Une figure de fable",
      donnees: "« le corbeau »",
      schema: troisFigures,
      question: "Qu'est-ce qu'il incarne ?",
      solution:
        "LA VANITÉ, QU'UN COMPLIMENT SUFFIT À ACHETER. Ce n'est pas un oiseau bête : c'est quelqu'un à qui l'on a dit qu'il chantait bien, et qui a ouvert la bouche. Écris la facette au-dessus du nom, et la fable cesse d'être une histoire d'animaux.",
      micros: ["5e_cult_plaire_instruire"],
    },
  ],
  pieges: [
    "Prendre l'axe du héros pour une chronologie : le super-héros est récent et reste très haut en superbe.",
    "Croire qu'un héros ordinaire est un héros raté : c'est le programme qui demande cette figure, et sa banalité est le sujet.",
    "Chercher le voyage d'un poème dans son sujet : il est dans la langue — les sons, l'image, le rythme, les noms.",
    "Dire d'une scène qu'elle est drôle sans nommer le ressort : quiproquo, répétition, déguisement, renversement, mot d'esprit.",
    "Lire une fable comme une histoire d'animaux : chaque bête incarne une facette de l'être humain.",
    "Isoler une figure de fable : elle ne vaut que contre une autre — la cigale contre la fourmi, le chêne contre le roseau.",
  ],
  aRetenir: [
    "Quatre entrées en 5e : le héros, le voyage en poésie, le théâtre renversé, plaire et instruire.",
    "Le programme le dit du théâtre, et c'est vrai des quatre : un miroir grossissant tendu au public.",
    "Le héros perd en superbe et gagne en banalité — et cet axe n'est pas le temps.",
    "En poésie, c'est la LANGUE qui déplace, jamais le sujet.",
    "Un animal de fable est une facette de l'humain, et il ne vaut que face à une autre.",
  ],
  entrainement: [
    {
      question: "« Un objet reçu en chemin le sauve au dernier moment. » Quelle figure ?",
      correction: "Un héros de conte : il est aidé, et l'aide vient d'une rencontre.",
      micros: ["5e_cult_heros"],
    },
    {
      question: "« Sa force lui vient d'un accident, et il apprend à la maitriser. » Quelle figure ?",
      correction: "Un super-héros moderne.",
      micros: ["5e_cult_heros"],
    },
    {
      question: "« Le vent verse et déverse un vertige de vagues. » Qu'est-ce qui fait voyager ?",
      correction: "Les sonorités, qui imitent ce dont on parle.",
      micros: ["5e_cult_voyage_poesie"],
    },
    {
      question: "« Mon île est un radeau amarré au ciel. » Qu'est-ce qui fait voyager ?",
      correction: "Une image, qui fait voir une chose à travers une autre.",
      micros: ["5e_cult_voyage_poesie"],
    },
    {
      question: "« À chaque entrée, il trébuche sur le même tapis. » Quel ressort ?",
      correction: "La répétition : le même geste revient et finit par faire rire.",
      micros: ["5e_cult_theatre"],
    },
    {
      question: "« le roseau » — qu'est-ce qu'il incarne ?",
      correction: "La souplesse, qui plie et qui survit — contre l'orgueil du chêne.",
      micros: ["5e_cult_plaire_instruire"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesCultureEntrees5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les quatre entrées - 5e",
    section: {
      type: "objectif",
      phrase: "Chaque entrée tend un miroir grossissant",
      sousPhrase:
        "La formule est celle du programme. Elle vaut pour le héros, la poésie, le théâtre et la fable.",
      encadre: {
        titre: "L'idée",
        texte: "Le renard n'est pas un renard : il est la ruse. On lit pour se voir en plus grand.",
      },
    },
  },
  {
    titre: "Le héros descend de son piédestal",
    badge: "Les quatre entrées - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "L'épopée", texte: "Il descend d'un dieu, et les dieux se mêlent de ses combats." },
        { titre: "Le conte", texte: "Le plus jeune de trois frères, aidé en chemin." },
        { titre: "Le super-héros", texte: "Un pouvoir sous un masque, une ville qui compte sur lui." },
        { titre: "L'ordinaire", texte: "Aucun exploit — et pourtant on suit sa vie entière." },
      ],
    },
    schema: axeHeros,
  },
  {
    titre: "En poésie, la langue fait le voyage",
    badge: "Les quatre entrées - 5e",
    section: {
      type: "etapes",
      etapes: [
        "LES SONORITÉS imitent : « le sable siffle sous les semelles ».",
        "L'IMAGE fait voir une chose à travers une autre : la mer, un champ labouré.",
        "LE RYTHME fait entendre le mouvement : « je pars, je pars, je pars ».",
        "LES NOMS DE LIEUX suffisent : Bombay, Zanzibar, Valparaiso.",
      ],
    },
    schema: versSonorites,
  },
  {
    titre: "La scène met la société à l'envers",
    badge: "Les quatre entrées - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "Le renversement",
        contenu: "Le valet commande, le maitre obéit — et la salle rit du monde d'avant.",
      },
      droite: {
        titre: "Le quiproquo",
        contenu: "Elle entend « le chien », il dit « son fiancé ». Personne ne ment.",
      },
    },
    schema: pile(renversement, quiproquo),
  },
  {
    titre: "Chaque bête est quelqu'un",
    badge: "Les quatre entrées - 5e",
    section: {
      type: "etapes",
      etapes: [
        "LE RENARD : la ruse, qui obtient par les mots ce qu'elle n'aurait pas par la force.",
        "LE LION : le pouvoir, qui n'a pas à justifier ses décisions.",
        "L'AGNEAU : l'innocence, qui n'a aucun moyen de se défendre.",
        "Et aucune ne vaut seule : la cigale n'existe que contre la fourmi.",
      ],
    },
    schema: troisFigures,
  },
  {
    titre: "À vous",
    badge: "Les quatre entrées - 5e",
    section: {
      type: "exercice",
      enonce: "« Le serviteur enfile l'habit du docteur, et on le prend au sérieux. »",
      question: "Quel ressort comique, et que met-il en accusation ?",
      indice: "Demande-toi ce qui, dans la scène, produit le respect.",
      correction:
        "LE DÉGUISEMENT. Et ce que la pièce accuse n'est pas le serviteur : c'est le fait qu'un habit suffise à faire un savant. Le rire porte sur ceux qui s'y laissent prendre.",
    },
    schema: deguisement,
  },
];
