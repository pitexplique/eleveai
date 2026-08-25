// ─── Fiche de cours : les reprises et la chaîne anaphorique (5e) ──────────────
// QUATRIÈME FICHE DE FRANÇAIS DE LA 5e, et celle qui vise le point le plus bas
// de tout ce qu'on mesure.
//
// ⭐ POURQUOI CELLE-CI MAINTENANT. L'évaluation nationale de 5e mesure
// « maîtriser la chaine anaphorique et l'emploi des pronoms représentants » sur
// six items. Les résultats 2025 d'un collège de l'île y donnent 19 %, 24 % et
// 43 % de réussite — le point le plus bas du document, français et maths
// confondus. Aucune autre notion de la classe n'est aussi mal tenue.
//
// ⚠️ CE N'EST PAS LA MÊME COMPÉTENCE QUE « reconnaître un pronom ». Dire que
// « celui-ci » est un pronom démonstratif, c'est une question de classe de mot,
// qui se règle sans lire la phrase d'avant. Dire que « celui-ci » désigne le
// voyageur et non le marchand, c'est une question de TEXTE. C'est pour cela que
// la fiche du groupe nominal ne suffisait pas, et que la notion existe à part.
//
// ⛔ LE CANVAS `phrase` S'INTERDIT « UN TEXTE DE PLUSIEURS PHRASES », et la
// chaîne anaphorique en est un par définition. On ne contourne pas l'interdit,
// on l'utilise à sa limite : les passages dessinés font DEUX phrases courtes, la
// ponctuation forte est un mot comme un autre, et le lien `reprise` passe SOUS
// la ligne — c'est le seul arc du canvas qui descend, précisément parce qu'une
// reprise se lit en remontant le texte. Au-delà de deux phrases, on écrit le
// passage dans l'énoncé et on ne dessine que le maillon qui pose problème.
//
// Alignée sur lib/tutor-v4/knowledge/francais/5e/microSkills.ts (notionId
// `grammaire_reprises`) et sur les tables ANAPHORES, REPRISES et CHAINES de
// lib/tutor-v4/questionBank/5e/francais/anaphore.bank.ts.
//
// Micro-compétences couvertes (les 3 de la notion, défi compris) :
// - 5e_gram_anaphore_pronom   → définition, figure, propriétés « Un pronom ne
//                               dit rien tout seul » et « Le plus proche, pas
//                               le premier venu », méthode 1, exemples 1 et 2,
//                               pièges 1 et 2, entraînements 1 et 2
// - 5e_gram_reprise_nominale  → propriétés « La reprise change de mot » et
//                               « Le démonstratif annonce une reprise »,
//                               méthode 2, usages, exemple 3, piège 3,
//                               entraînement 3
// - 5e_gram_chaine_reference  → propriété « Deux chaînes peuvent courir
//                               ensemble », méthode 3, exemples 4 et 5, le défi
//                               (exemple 6), piège 4, entraînements 4 et 5
//
// Les passages sont CEUX DE LA BANQUE, sans exception : « Le marchand rencontra
// un voyageur… Celui-ci portait un sac », « Les pêcheurs remontèrent les
// filets. Ils étaient déchirés », « Le cyclone a traversé l'île. Il a arraché
// les tôles », « Un margouillat s'était glissé sous l'armoire. Le petit lézard
// ne bougeait plus », « Un vieux camion s'est arrêté. Le véhicule bloquait la
// rue », « Une odeur de vanille montait. Ce parfum réveilla la maison », « Mon
// grand-père gardait une vieille montre. L'objet ne marchait plus », « Sarah et
// Maëva ont monté la tente. Celle-ci s'est effondrée », « Le boulanger prépare
// le pain. Cet artisan travaille pendant que le quartier dort ».
//
// ⚠️ `largeurMax` à 190 : le bloc le plus étroit d'une fiche fait 201 px sur un
// téléphone, et un dessin réduit perd ses lettres avant de perdre sa largeur
// (REGLES.md § 2 quater). Contrôle passé — `npm run verifier:fiches`.

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
  titre?: string;
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        titre: opts.titre,
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

// Dans une carte, on EMPILE — jamais deux dessins côte à côte (REGLES § 2 ter).
function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Les passages de la banque, dessinés ──────────────────────────────────────

// LA FIGURE DE RÉFÉRENCE. Deux personnages dans la première phrase, un pronom
// dans la seconde : c'est la situation entière de la compétence, en six mots.
// L'arc pointillé passe SOUS le texte et remonte vers ce que le pronom reprend —
// et il ne va pas vers le premier des deux noms, mais vers le plus proche.
const passageVoyageur = phrase({
  mots: [
    { texte: "Le" },
    { texte: "marchand" },
    { texte: "rencontra" },
    { texte: "un" },
    { texte: "voyageur" },
    { texte: "." },
    { texte: "Celui-ci", focus: true },
    { texte: "portait" },
    { texte: "un" },
    { texte: "sac" },
    { texte: "." },
  ],
  liens: [{ de: 6, vers: 4, label: "reprend", type: "reprise" }],
  legende: "« Celui-ci » désigne le plus proche des deux : le voyageur.",
});

// LE PRONOM NE DIT RIEN TOUT SEUL. Ici les deux noms sont au masculin pluriel :
// le genre ne tranche pas, seul le SENS tranche. Des filets se déchirent, des
// pêcheurs non.
const passageFilets = phrase({
  mots: [
    { texte: "Les" },
    { texte: "pêcheurs" },
    { texte: "remontèrent" },
    { texte: "les" },
    { texte: "filets" },
    { texte: "." },
    { texte: "Ils", focus: true },
    { texte: "étaient" },
    { texte: "déchirés" },
    { texte: "." },
  ],
  liens: [{ de: 6, vers: 4, label: "quoi ?", type: "reprise" }],
  legende: "Les deux sont au masculin pluriel : c'est le sens qui décide.",
});

// LE MÊME PIÈGE, dans l'autre sens : « le hangar » est masculin lui aussi, et
// c'est le cyclone qui arrache.
const passageCyclone = phrase({
  mots: [
    { texte: "Le" },
    { texte: "cyclone" },
    { texte: "a traversé" },
    { texte: "l'île" },
    { texte: "." },
    { texte: "Il", focus: true },
    { texte: "a arraché" },
    { texte: "les" },
    { texte: "tôles" },
    { texte: "." },
  ],
  liens: [{ de: 5, vers: 1, label: "reprend", type: "reprise" }],
  legende: "Seul un cyclone arrache des tôles. Le genre n'y suffit pas.",
});

// LA REPRISE NOMINALE : le mot change complètement, la personne désignée non.
// C'est la partie que les élèves voient le moins — rien ne signale que c'est le
// même être, sinon le sens.
const passageMargouillat = phrase({
  mots: [
    { texte: "Un" },
    { texte: "margouillat" },
    { texte: "s'était glissé" },
    { texte: "là" },
    { texte: "." },
    { texte: "Le" },
    { texte: "petit" },
    { texte: "lézard", focus: true },
    { texte: "ne bougeait plus" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "première désignation" },
    { mots: [5, 7], label: "reprise nominale" },
  ],
  liens: [{ de: 7, vers: 1, label: "le même", type: "reprise" }],
  legende: "Un margouillat EST un lézard : le mot change, l'animal non.",
});

// LA REPRISE PAR UN MOT PLUS GÉNÉRAL — la plus fréquente, et la moins repérée.
const passageCamion = phrase({
  mots: [
    { texte: "Un" },
    { texte: "vieux" },
    { texte: "camion" },
    { texte: "s'arrêta" },
    { texte: "." },
    { texte: "Le" },
    { texte: "véhicule", focus: true },
    { texte: "bloquait" },
    { texte: "la rue" },
    { texte: "." },
  ],
  liens: [{ de: 6, vers: 2, label: "le même", type: "reprise" }],
  legende: "« Véhicule » est plus général que « camion ». C'est le même.",
});

// LE DÉTERMINANT DÉMONSTRATIF ANNONCE À LUI SEUL QU'ON REPREND. « ce », « cet »,
// « cette » ne se mettent pas devant un nom qu'on découvre.
const passageParfum = phrase({
  mots: [
    { texte: "Une" },
    { texte: "odeur" },
    { texte: "de vanille" },
    { texte: "montait" },
    { texte: "." },
    { texte: "Ce", focus: true },
    { texte: "parfum" },
    { texte: "réveilla" },
    { texte: "la maison" },
    { texte: "." },
  ],
  groupes: [{ mots: [5, 5], label: "démonstratif" }],
  liens: [{ de: 6, vers: 1, label: "déjà nommée", type: "reprise" }],
  legende: "« Ce » ne s'emploie que sur ce dont on a déjà parlé.",
});

// ⭐ DEUX CHAÎNES QUI COURENT EN PARALLÈLE — le cas où la réussite s'effondre.
// L'élève suit une chaîne et perd l'autre. On dessine les deux, de deux couleurs
// différentes, sur le même passage.
const passageMontre = phrase({
  mots: [
    { texte: "Mon" },
    { texte: "grand-père" },
    { texte: "gardait" },
    { texte: "une" },
    { texte: "montre" },
    { texte: "." },
    { texte: "Il", focus: true },
    { texte: "n'en" },
    { texte: "voulait pas" },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "sujet" },
    { mots: [4, 4], label: "objet" },
  ],
  liens: [
    { de: 6, vers: 1, label: "il", type: "reprise" },
    { de: 7, vers: 4, label: "en", type: "reprise" },
  ],
  legende: "Deux chaînes à la fois : « il » l'homme, « en » la montre.",
});

// LE PRONOM SINGULIER QUI NE PEUT PAS REPRENDRE DEUX NOMS. Le nombre est ici la
// preuve, et c'est la seule fois où il suffit.
const passageTente = phrase({
  mots: [
    { texte: "Sarah" },
    { texte: "et" },
    { texte: "Maëva" },
    { texte: "montèrent" },
    { texte: "la" },
    { texte: "tente" },
    { texte: "." },
    { texte: "Celle-ci", focus: true },
    { texte: "s'effondra" },
    { texte: "." },
  ],
  liens: [{ de: 7, vers: 5, label: "singulier", type: "reprise" }],
  legende: "« Celle-ci » est au singulier : ce n'est pas « Sarah et Maëva ».",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). Trois expressions désignent le
// boulanger, une quatrième n'est pas lui : c'est l'intrus qu'il faut voir.
const passageBoulanger = phrase({
  mots: [
    { texte: "Le" },
    { texte: "boulanger" },
    { texte: "prépare" },
    { texte: "le pain" },
    { texte: "." },
    { texte: "Cet" },
    { texte: "artisan", focus: true },
    { texte: "travaille" },
    { texte: "seul" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "première désignation" },
    { mots: [5, 6], label: "reprise nominale" },
  ],
  liens: [{ de: 6, vers: 1, label: "le même", type: "reprise" }],
  legende: "« Cet artisan », c'est le boulanger. « Ses clients », non.",
});

// LE COMPTE DES MAILLONS : trois façons de nommer le même colis.
const passageColis = phrase({
  mots: [
    { texte: "Le facteur" },
    { texte: "déposa" },
    { texte: "un" },
    { texte: "colis" },
    { texte: "." },
    { texte: "Le" },
    { texte: "paquet" },
    { texte: "resta" },
    { texte: "là" },
    { texte: "." },
  ],
  groupes: [
    { mots: [2, 3], label: "maillon 1" },
    { mots: [5, 6], label: "maillon 2" },
  ],
  liens: [{ de: 6, vers: 3, label: "le même", type: "reprise" }],
  legende: "« un colis », « le paquet », puis « l' » : trois maillons.",
});

const pieges = [
  "Renvoyer le pronom au premier nom de la phrase d'avant. Dans « Le marchand rencontra un voyageur. Celui-ci portait un sac », « celui-ci » désigne le PLUS PROCHE : le voyageur.",
  "Croire que le genre suffit à trancher. Dans « Les pêcheurs remontèrent les filets. Ils étaient déchirés », les deux groupes sont au masculin pluriel — c'est le sens qui décide, pas la grammaire.",
  "Ne pas voir une reprise parce que le mot a changé. « Un margouillat » puis « le petit lézard », « un vieux camion » puis « le véhicule » : c'est le même être, nommé autrement.",
  "Perdre une chaîne quand deux courent ensemble. Dans « Mon grand-père gardait une montre. Il n'en voulait pas », « il » est l'homme et « en » est la montre : deux fils, pas un.",
];

const aRetenir = [
  "Un pronom ne veut rien dire tout seul : il faut remonter le texte pour savoir ce qu'il reprend.",
  "Une reprise peut changer complètement de mot — un margouillat devient « le petit lézard ». Un déterminant démonstratif (« ce », « cette ») signale toujours qu'on reprend.",
  "Quand deux êtres sont en jeu, on suit les deux chaînes en même temps, et on vérifie le sens à chaque maillon.",
];

export const ficheReprises5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "grammaire-reprises",
  titre: "Les reprises et la chaîne anaphorique (2026-2027)",
  accroche:
    "« Le marchand rencontra un voyageur. Celui-ci portait un sac trop lourd. » Qui porte le sac ? Le voyageur — et pas le marchand, même s'il est nommé le premier. Toute la difficulté du texte est là, dans un mot de deux syllabes.",
  identite: [
    { label: "Mots clés", valeur: "Pronom, reprise nominale, chaîne, antécédent" },
    { label: "Le secret", valeur: "Remonter le texte, pas deviner" },
    { label: "Outil", valeur: "Remplacer le pronom par le nom, et relire" },
  ],
  definition: {
    texte:
      "Dans un texte, on ne répète pas le même mot à chaque phrase : on le REPREND autrement. Tantôt par un pronom — « il », « celui-ci », « en » —, tantôt par un autre nom — « un margouillat » devient « le petit lézard », « un vieux camion » devient « le véhicule ». Toutes ces désignations d'un même être forment une chaîne, et chaque maillon renvoie au précédent. Comprendre un texte, c'est tenir cette chaîne : un pronom dont on ne sait plus de qui il parle, et la phrase entière devient fausse.",
  },
  figure: {
    schema: passageVoyageur,
    legende:
      "Deux personnages dans la première phrase, un pronom dans la seconde. L'arc pointillé passe SOUS le texte et remonte vers ce que le pronom reprend — c'est le seul arc du canvas qui descend, parce qu'une reprise se lit en remontant. Et il ne va pas vers le premier nom, mais vers le plus proche.",
  },
  proprietes: [
    {
      titre: "Un pronom ne dit rien tout seul",
      texte:
        "Il n'a de sens que par ce qu'il reprend. Retire la phrase d'avant, et « Ils étaient déchirés » ne veut plus rien dire.",
      schema: passageFilets,
    },
    {
      titre: "Le plus proche, pas le premier venu",
      texte:
        "« Celui-ci » désigne le dernier nommé. Quand deux noms sont possibles, c'est le sens qui tranche, pas l'ordre.",
      schema: pile(passageVoyageur, passageCyclone),
    },
    {
      titre: "La reprise change de mot",
      texte:
        "Un nom peut être repris par un autre, plus général : margouillat → lézard, camion → véhicule. C'est le même être.",
      schema: pile(passageMargouillat, passageCamion),
    },
    {
      titre: "Le démonstratif annonce une reprise",
      texte:
        "« ce », « cet », « cette » ne se mettent jamais devant un nom qu'on découvre : ils disent « on en a déjà parlé ».",
      schema: passageParfum,
    },
    {
      titre: "Deux chaînes peuvent courir ensemble",
      texte:
        "Dans une même phrase, un pronom suit une personne et un autre suit un objet. On tient les deux fils à la fois.",
      schema: passageMontre,
    },
  ],
  reel: {
    texte:
      "C'est la compétence qui décide de tout le reste en lecture. Dans un énoncé de mathématiques — « Un commerçant achète 12 caisses. Il en revend la moitié » —, si « en » ne renvoie pas aux caisses, le problème est perdu avant d'être commencé. Même chose dans un article, un règlement, une notice : celui qui perd le fil d'un « celui-ci » ne comprend plus qui fait quoi. Et c'est mesuré : sur les six items de chaîne anaphorique de l'évaluation nationale de 5e, un collège de l'île obtient 19 %, 24 % et 43 % de réussite — le point le plus bas de toutes les matières.",
  },
  historique: {
    texte:
      "« Anaphore » vient du grec anaphora, « action de porter en arrière ». Le mot dit exactement le geste : le pronom porte le lecteur en arrière, vers ce qui a déjà été nommé. Les grammairiens grecs l'employaient déjà il y a deux mille ans, et les rhéteurs lui ont donné un second sens — la répétition d'un mot en tête de plusieurs phrases, comme dans « Rien de ce qui est humain… Rien de ce qui est juste… ». Deux emplois, une même idée : quelque chose revient de l'arrière.",
  },
  formule: {
    contexte: "Le test qui vérifie qu'on a trouvé la bonne reprise.",
    expression: "je remplace le pronom par le nom, et je relis",
    legende:
      "« Celui-ci portait un sac » → « Le voyageur portait un sac » : la phrase tient. → « Le marchand portait un sac » : elle tient aussi, mais elle ne dit plus la même chose que le texte. Quand les deux passent, c'est le SENS de la suite qui départage — un sac trop lourd, c'est celui qui marche depuis longtemps.",
    schema: passageVoyageur,
  },
  methode: [
    {
      titre: "Je repère le pronom et je remonte",
      texte:
        "Je cherche le dernier groupe nominal qui pourrait convenir, en remontant phrase par phrase — jamais en devinant.",
      schema: passageFilets,
    },
    {
      titre: "Je vérifie le genre, le nombre et le sens",
      texte:
        "Le nombre élimine parfois d'un coup : « celle-ci » ne peut pas reprendre « Sarah et Maëva ». Sinon, c'est le sens.",
      schema: passageTente,
    },
    {
      titre: "Je remplace et je relis",
      texte:
        "Je mets le nom à la place du pronom. Si la phrase reste vraie dans le texte, la reprise est la bonne.",
      schema: passageCyclone,
    },
  ],
  usages: [
    {
      titre: "Éviter la répétition",
      detail:
        "Redire « le camion » à chaque phrase alourdit. « Le véhicule » dit la même chose, autrement.",
      schema: passageCamion,
    },
    {
      titre: "Ajouter une information",
      detail:
        "La reprise en profite pour préciser : « Madame Lucie » devient « la vieille dame », et l'on apprend son âge.",
      schema: passageMargouillat,
    },
    {
      titre: "Signaler qu'on continue",
      detail:
        "Le démonstratif « ce parfum » dit au lecteur qu'on parle encore de la même chose.",
      schema: passageParfum,
    },
  ],
  exemples: [
    {
      titre: "Le premier ou le plus proche ?",
      donnees:
        "« Le marchand rencontra un voyageur sur la route de Cilaos. Celui-ci portait un sac trop lourd pour lui. »",
      schema: passageVoyageur,
      question: "Que reprend « Celui-ci » ?",
      solution:
        "Le voyageur. « Celui-ci » désigne le plus proche des deux, celui qui vient d'être nommé. Le test le confirme : « Le voyageur portait un sac trop lourd » — et la suite du texte va dans le même sens, puisque c'est lui qui marche depuis longtemps. L'erreur ordinaire est de renvoyer au premier nom de la phrase, le marchand : la place dans le texte compte, et elle compte à l'envers de ce qu'on croit.",
    },
    {
      titre: "Quand le genre ne suffit pas",
      donnees: "« Les pêcheurs remontèrent les filets. Ils étaient déchirés en trois endroits. »",
      schema: passageFilets,
      question: "Qui est « Ils » ?",
      solution:
        "Les filets. Les deux groupes sont au masculin pluriel : la grammaire ne tranche pas du tout ici. C'est le sens qui décide — des filets se déchirent, des pêcheurs non. C'est le cas le plus difficile, et le plus fréquent : quand le genre et le nombre ne départagent pas, il faut se demander de quoi la phrase peut être vraie.",
    },
    {
      titre: "Le mot a changé, pas l'animal",
      donnees: "« Un margouillat s'était glissé sous l'armoire. Le petit lézard ne bougeait plus. »",
      schema: passageMargouillat,
      question: "« Le petit lézard » est-il un second animal ?",
      solution:
        "Non : c'est le même. Un margouillat EST un lézard, et rien dans le texte n'introduit une deuxième bête. C'est une reprise nominale — le nom change, l'être désigné non. On la reconnaît à deux indices : le déterminant passe de « un » à « le » (on ne découvre plus, on désigne), et le second mot est plus général que le premier.",
    },
    {
      titre: "Deux fils dans la même phrase",
      donnees: "« Mon grand-père gardait une vieille montre. Il n'en voulait pas se séparer. »",
      schema: passageMontre,
      question: "Qui est « il », et que désigne « en » ?",
      solution:
        "« Il » est le grand-père, « en » est la montre. Deux chaînes courent en parallèle, et il faut les tenir toutes les deux. Le sens tranche sans hésitation : seul un être humain peut vouloir quelque chose, et ce dont on ne se sépare pas est l'objet. C'est exactement le cas où la réussite s'effondre à l'évaluation : l'élève suit un fil et perd l'autre.",
    },
    {
      titre: "Compter les maillons",
      donnees:
        "« Le facteur a déposé un colis devant la porte. Le paquet est resté là toute la journée. Personne ne l'a vu. »",
      schema: passageColis,
      question: "Combien de mots différents désignent le colis ?",
      solution:
        "Trois : « un colis » qui l'introduit, « le paquet » qui le reprend par un autre nom, et « l' » qui le reprend par un pronom. Une chaîne se compte comme cela — le mot qui présente, les reprises nominales, les pronoms. Compter les maillons est la meilleure façon de vérifier qu'on n'en a pas perdu un en route.",
    },
    {
      titre: "Le défi",
      donnees:
        "« Le boulanger prépare le pain dès quatre heures. Cet artisan travaille pendant que le quartier dort. Ses clients ne le voient jamais à l'œuvre. »",
      schema: passageBoulanger,
      question: "Quelle expression ne désigne PAS le boulanger ?",
      solution:
        "« Ses clients ». Tout le reste est lui : « cet artisan » le reprend par un autre nom — et le démonstratif « cet » le signale —, « ses » est son possessif, « le » dans « ne le voient » est encore lui. « Ses clients » sont d'autres personnes, introduites par ce possessif justement parce qu'elles se définissent par rapport à lui. Repérer l'intrus dans une chaîne, c'est le geste que l'évaluation demande, et c'est celui qui se rate.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Maëva tendit la lettre à sa grand-mère. Elle l'avait écrite la veille. » Qui est « Elle » ?",
      correction:
        "Maëva. La suite de la phrase le prouve : c'est elle qui avait écrit la lettre, la veille, sans rien dire à personne. Les deux personnages sont féminins, donc le genre ne tranche pas — c'est encore le sens qui décide.",
    },
    {
      question: "« Le Piton de la Fournaise est entré en éruption. Le volcan a rejeté de la lave. » Deux volcans ?",
      correction:
        "Non, un seul. « Le volcan » reprend « le Piton de la Fournaise » par le nom commun qui dit ce qu'il est. C'est une reprise nominale très ordinaire : on présente par le nom propre, on reprend par le nom commun.",
    },
    {
      question: "« Une odeur de vanille montait de la cuisine. Ce parfum réveilla toute la maison. » Que désigne « Ce parfum » ?",
      correction:
        "L'odeur de vanille. Le déterminant démonstratif « ce » suffit à le dire : il ne s'emploie que sur ce dont on vient de parler. Si l'auteur découvrait un parfum nouveau, il écrirait « un parfum ».",
    },
    {
      question: "« Sarah et Maëva ont monté la tente. Celle-ci s'est effondrée pendant la nuit. » Que reprend « Celle-ci » ?",
      correction:
        "La tente. « Celle-ci » est au singulier : il ne peut pas reprendre « Sarah et Maëva », qui sont deux. C'est le seul cas où le nombre suffit à trancher — profites-en, il est rare.",
    },
    {
      question: "Défi : « Les pompiers sont arrivés les premiers. Ces hommes travaillaient depuis douze heures. Ils ont tenu jusqu'au matin. » « Ces hommes » et « Ils » désignent-ils la même chose ?",
      correction:
        "Oui, les pompiers dans les deux cas. Rien dans le passage n'introduit un nouveau groupe : tant qu'aucun nom nouveau n'apparaît, la chaîne continue. C'est la règle qui permet de suivre un texte long sans se perdre.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesReprises5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les reprises - 5e",
    section: {
      type: "objectif",
      phrase: "Savoir de qui, de quoi on parle",
      sousPhrase:
        "Retrouver ce qu'un pronom reprend, reconnaître une reprise nominale, et suivre une chaîne d'un bout à l'autre d'un texte.",
      encadre: {
        titre: "L'idée",
        texte: "Un pronom ne veut rien dire tout seul : il faut remonter le texte.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "« Un commerçant achète 12 caisses. Il en revend la moitié. » Si « en » ne renvoie pas aux caisses, le problème de maths est perdu avant d'être commencé.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Anaphore » vient du grec anaphora, « action de porter en arrière ». Le mot dit le geste : le pronom porte le lecteur en arrière, vers ce qui a déjà été nommé.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheReprises5e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Le premier ou le plus proche ?",
    badge: "La distinction clé",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on croit",
        contenu:
          "« Le marchand rencontra un voyageur. Celui-ci portait un sac. » On renvoie au premier nommé : le marchand.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qu'il faut",
        contenu:
          "« Celui-ci » désigne le PLUS PROCHE, celui qui vient d'être nommé : le voyageur. Et la suite du texte le confirme.",
      },
    },
  },
  {
    titre: "Quand le mot change",
    badge: "La reprise nominale",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Un autre nom",
        contenu:
          "« Un margouillat » puis « le petit lézard ». Le nom change, l'animal non — et le déterminant passe de « un » à « le ».",
      },
      droite: {
        variante: "info",
        titre: "Un démonstratif",
        contenu:
          "« Une odeur de vanille » puis « ce parfum ». « Ce » ne se met jamais devant un nom qu'on découvre : il dit qu'on reprend.",
      },
    },
  },
  {
    titre: "Deux fils à la fois",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Mon grand-père gardait une vieille montre. Il n'en voulait pas se séparer. »",
      question: "Qui est « il », et que désigne « en » ?",
      correction:
        "« Il » est le grand-père — seul un être humain peut vouloir. « En » est la montre. Deux chaînes courent ensemble : c'est là que la réussite s'effondre.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "Le défi",
    badge: "À toi de jouer",
    section: {
      type: "exercice",
      enonce:
        "« Le boulanger prépare le pain dès quatre heures. Cet artisan travaille pendant que le quartier dort. Ses clients ne le voient jamais à l'œuvre. »",
      question: "Quelle expression ne désigne PAS le boulanger ?",
      indice: "Cherche celle qui définit d'AUTRES personnes par rapport à lui.",
      correction:
        "« Ses clients ». « Cet artisan » le reprend, « ses » est son possessif, « le » est encore lui. Les clients sont d'autres personnes.",
    },
  },
];
