// ─── Fiche d'activité : parler pour être compris (CP) ─────────────────────────
// QUATORZIÈME FICHE DU CYCLE 2, et la seule dont l'objet ne s'écrit pas. Le BO
// lui donne cinq objectifs, et le pool prévient honnêtement : le coach
// « n'entend pas l'élève ». Ce qui reste, et qui est beaucoup, c'est la part
// qui SE RÉFLÉCHIT — savoir ce que l'autre a besoin d'entendre.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE UNIFIE LES CINQ OBJECTIFS DU BO, QUI SEMBLENT SANS RAPPORT.
// Les quatre indices du pool disent tous la même chose, vue de quatre côtés :
//   · « Celui qui t'écoute n'a pas entendu l'histoire. »
//   · « Ceux qui écoutent sont au fond de la classe. »
//   · « Un échange se fait à deux — mais pas en même temps. »
//   · « On ne parle pas de la même manière en classe et dans la cour. »
// Une seule idée : **parler, c'est se mettre à la place de celui qui écoute.**
// Ce n'est pas une règle de politesse, c'est un calcul — il n'a pas l'histoire
// dans la tête, il est loin, il ne peut pas parler en même temps que moi, et ce
// n'est pas mon copain de cour. Chaque objectif du BO devient alors une
// conséquence, pas une consigne de plus à retenir.
//
// ⭐ ET LES ORGANISATEURS DU DISCOURS SONT NOMMÉS PAR LE BO LUI-MÊME : parce
// que, alors, ensuite. Trois mots, trois services — la raison, la conséquence,
// la suite. Ils sont repris tels quels.
//
// ⛔ CE QUE CETTE FICHE NE PEUT PAS FAIRE, et elle ne le prétend pas : elle
// n'entend pas l'enfant. L'articulation, le volume et le respect du tour de
// parole se jugent en classe. La feuille travaille ce qui se DÉCIDE avant de
// parler : à qui je parle, ce qu'il sait déjà, avec quels mots.
//
// ⭐ POURQUOI CETTE NOTION MAINTENANT : ses 7 micros forment un arbre à UNE
// racine (`cp_oral_ecouter`), sans embranchement à trancher.
//
// Les 7 micros sont couvertes :
// - cp_oral_ecouter        → propriété 1, entrainements 1 et 2
// - cp_oral_consigne       → propriété 2, méthode 1, entrainements 3 et 4
// - cp_oral_reformuler     → propriété 3, entrainement 5
// - cp_oral_raconter       → figure, propriété 4, exemple 1, entrainements 6 et 7
// - cp_oral_prendre_parole → propriété 5, entrainement 8
// - cp_oral_echanges       → propriété 5, méthode 2, entrainement 9
// - cp_oral_niveau_langue  → propriété 6, exemple 2, entrainement 10
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/oral-et-lecteur.bank.ts`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PersonnageBulle,
  PersonnageExpression,
  PersonnageId,
  PersonnagePose,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

function perso(opts: {
  personnage: PersonnageId;
  pose?: PersonnagePose;
  expression?: PersonnageExpression;
  bulle?: PersonnageBulle;
  mode?: "couleur" | "coloriage";
  consigne?: string;
  largeur?: number;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "personnage",
        personnage: opts.personnage,
        pose: opts.pose,
        expression: opts.expression,
        bulle: opts.bulle,
        mode: opts.mode ?? "coloriage",
        consigne: opts.consigne,
        size: { width: opts.largeur ?? 250 },
      }}
    />
  );
}

function etiquettes(opts: {
  cases: string[];
  focus?: number[];
  legende?: string;
  largeur?: number;
}) {
  const mots: PhraseCanvasMot[] = opts.cases.map((c, i) => ({
    texte: c,
    focus: opts.focus?.includes(i),
  }));
  return (
    <div className="dessin-mots">
      <CanvasRenderer
        figure={{
          kind: "phrase",
          mots,
          legende: opts.legende,
          largeurMax: opts.largeur ?? 280,
        }}
      />
    </div>
  );
}

/**
 * ⭐⭐ DEUX PERSONNAGES CÔTE À CÔTE, ET C'EST LE SUJET DE LA FICHE.
 * Celui qui parle a l'histoire dans la tête ; celui qui écoute ne l'a pas.
 * Aucun dessin isolé ne montre ça — il faut les deux, et l'écart entre leurs
 * deux bulles EST la notion.
 *
 * ⚠️ Chaque personnage garde sa largeur : deux dessins côte à côte dans une
 * carte de tiers de page tomberaient sous le plancher de lisibilité (mesuré le
 * 03/09 sur trois objets alignés, à 17 mm de large). Ils s'empilent donc.
 */
function deuxPersonnages(gauche: React.ReactNode, droite: React.ReactNode) {
  return (
    <div className="grid gap-2">
      {gauche}
      {droite}
    </div>
  );
}

// ─── Les dessins ──────────────────────────────────────────────────────────────

const celuiQuiRaconte = perso({
  personnage: "teo",
  pose: "marche",
  expression: "rire",
  bulle: { texte: "Et après il est tombé !" },
  largeur: 260,
});

const celuiQuiEcoute = perso({
  personnage: "zoe",
  pose: "debout",
  expression: "surpris",
  bulle: { texte: "Qui est tombé ?", forme: "pensee" },
  largeur: 260,
});

/** ⭐⭐ LA FIGURE : l'histoire est dans une tête, pas dans l'autre. */
const laTeteDeLAutre = deuxPersonnages(celuiQuiRaconte, celuiQuiEcoute);

const retenirLImportant = perso({
  personnage: "nina",
  pose: "debout",
  expression: "pense",
  bulle: { texte: "Mardi. Piscine.", forme: "pensee" },
  consigne: "On retient ce qui compte, pas tous les mots.",
});

const leVerbeDeLaConsigne = etiquettes({
  cases: ["Entoure", "les mots", "en rouge"],
  focus: [0],
  legende: "Le verbe dit ce qu'il faut faire. On le cherche en premier.",
  largeur: 300,
});

const redireAutrement = etiquettes({
  cases: ["Le chat dort.", "Le chat fait la sieste."],
  legende: "Les mêmes choses, d'autres mots, et rien d'inventé.",
  largeur: 320,
});

/** ⭐ Les trois organisateurs sont ceux que le BO nomme. */
const lesTroisPetitsMots = etiquettes({
  cases: ["parce que", "alors", "ensuite"],
  legende: "La raison, la conséquence, la suite.",
  largeur: 300,
});

const chacunSonTour = perso({
  personnage: "ravi",
  pose: "bras_leves",
  expression: "sourire",
  bulle: { texte: "À toi !" },
  consigne: "Un échange se fait à deux, mais pas en même temps.",
});

const classeOuCour = etiquettes({
  cases: ["Je peux sortir ?", "J'peux sortir ?"],
  focus: [0],
  legende: "En classe, ou dans la cour : ce n'est pas la même façon de dire.",
  largeur: 320,
});

/* ─── Les dessins DES EXERCICES ────────────────────────────────────────────────
   ⭐⭐ AU CYCLE 2, UN EXERCICE SE FAIT AU CRAYON — même quand la notion est
   orale : on colorie celui qui parle, on barre la phrase de la cour, on entoure
   le verbe de la consigne. Le geste remplace la parole que la feuille ne peut
   pas entendre.
   ⛔ Ni `consigne` ni `legende` ici : l'énoncé numéroté les porte déjà. */

const exDeuxTetes = deuxPersonnages(celuiQuiRaconte, celuiQuiEcoute);

const exMessage = perso({
  personnage: "nina",
  pose: "debout",
  expression: "sourire",
  bulle: { texte: "Mardi, on va à la piscine." },
  largeur: 260,
});

const exConsigne = etiquettes({
  cases: ["Colorie", "le bateau", "en bleu"],
  largeur: 300,
});

const exDeuxConsignes = etiquettes({
  cases: ["Entoure le nom.", "Souligne le nom."],
  largeur: 300,
});

const exReformuler = etiquettes({
  cases: ["Léa mange une mangue.", "Léa croque un fruit."],
  largeur: 320,
});

const exOrganisateurs = etiquettes({
  cases: ["parce que", "alors", "ensuite"],
  largeur: 280,
});

const exQuiEstTombe = perso({
  personnage: "teo",
  pose: "marche",
  expression: "rire",
  bulle: { texte: "Et après il est tombé !" },
  largeur: 250,
});

const exTourDeParole = perso({
  personnage: "ravi",
  pose: "bras_leves",
  expression: "sourire",
  bulle: { texte: "À toi !" },
  largeur: 230,
});

const exNiveauDeLangue = etiquettes({
  cases: ["Je peux sortir ?", "J'peux sortir ?"],
  largeur: 300,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOralCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "langage_oral",
  // ⛔ Pas de deux-points : tous les h2 reprennent ce titre après un.
  titre: `Parler pour être compris au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "Celui qui t'écoute n'a pas entendu l'histoire. Parler, c'est se mettre à sa place.",
  identite: [],
  definition: {
    texte: [
      "Quand tu racontes quelque chose, l'histoire est dans TA tête. Elle n'est pas dans celle de l'autre.",
      "Alors il faut lui donner ce qui lui manque : de qui on parle, où c'était, ce qui est arrivé. « Il est tombé » ne veut rien dire si personne ne sait qui.",
      "Et il faut penser à lui autrement encore : il est peut-être au fond de la classe, il ne peut pas parler en même temps que toi, et ce n'est pas ton copain de la cour.",
    ].join("\n\n"),
  },
  figure: {
    schema: laTeteDeLAutre,
  },
  proprietes: [
    {
      titre: "Écouter, c'est garder l'important",
      texte: "On ne retient pas tous les mots : on retient ce qui compte.",
      schema: retenirLImportant,
      micros: ["cp_oral_ecouter"],
    },
    {
      titre: "Une consigne a un verbe",
      texte: "C'est lui qui dit quoi faire. Entoure, colorie, souligne : ce n'est pas pareil.",
      schema: leVerbeDeLaConsigne,
      micros: ["cp_oral_consigne"],
    },
    {
      titre: "Redire avec d'autres mots",
      texte: "La même chose, autrement — et sans rien ajouter.",
      schema: redireAutrement,
      micros: ["cp_oral_reformuler"],
    },
    {
      titre: "Trois petits mots qui rangent l'histoire",
      texte: "parce que dit la raison, alors la suite, ensuite ce qui vient après.",
      schema: lesTroisPetitsMots,
      micros: ["cp_oral_raconter"],
    },
    {
      titre: "On parle chacun son tour",
      texte: "Un échange se fait à deux, mais pas en même temps.",
      schema: chacunSonTour,
      micros: ["cp_oral_prendre_parole", "cp_oral_echanges"],
    },
    {
      titre: "On ne parle pas pareil partout",
      texte: "En classe, on dit « Je peux sortir ? ». Dans la cour, on dit autrement.",
      schema: classeOuCour,
      micros: ["cp_oral_niveau_langue"],
    },
  ],
  reel: {
    texte:
      "Tu racontes ta journée tous les soirs. Si on te demande sans arrêt « qui ? », « où ? », c'est qu'il manquait ce que toi seul savais.",
  },
  historique: { texte: "" },
  methode: [
    {
      titre: "Je cherche le verbe de la consigne",
      texte: "Il dit quoi faire. Ensuite seulement je regarde sur quoi.",
      schema: leVerbeDeLaConsigne,
      micros: ["cp_oral_consigne"],
    },
    {
      titre: "Je pense à celui qui écoute",
      texte: "Sait-il de qui je parle ? M'entend-il du fond de la classe ? Est-ce son tour ?",
      schema: chacunSonTour,
      micros: ["cp_oral_echanges", "cp_oral_raconter"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "« Il est tombé »",
      donnees: "Téo raconte : « Et après il est tombé ! »",
      question: "Pourquoi Zoé ne comprend-elle pas ?",
      solution:
        "Parce que « il » ne désigne personne pour elle. Téo a l'histoire dans la tête ; elle, non. Il faut dire qui.",
      schema: laTeteDeLAutre,
      micros: ["cp_oral_raconter"],
    },
    {
      titre: "En classe ou dans la cour",
      donnees: "« Je peux sortir ? » et « J'peux sortir ? »",
      question: "Les deux se disent-elles partout ?",
      solution:
        "Non. La première se dit en classe, à un adulte. La seconde s'entend dans la cour, entre copains. On choisit selon à qui on parle.",
      schema: classeOuCour,
      micros: ["cp_oral_niveau_langue"],
    },
  ],
  pieges: [
    "« il », « là-bas », « le truc » ne disent rien à celui qui n'était pas là.",
    "Écouter, ce n'est pas retenir tous les mots : c'est garder l'important.",
  ],
  aRetenir: [
    "Celui qui m'écoute n'a pas l'histoire dans la tête : je dis qui, où, et ce qui arrive.",
    "Dans une consigne, je cherche d'abord le verbe.",
    "Redire avec d'autres mots, c'est dire la même chose — sans rien inventer.",
    "parce que, alors, ensuite : trois mots qui rangent une histoire.",
    "On parle chacun son tour, et pas de la même façon en classe et dans la cour.",
  ],
  /* ⭐ Dix exercices, neuf avec un support à colorier, entourer, barrer ou
     relier. Les corrections s'impriment sur leur propre page. */
  entrainement: [
    {
      question: "Colorie celui qui a l'histoire dans la tête.",
      correction: "Téo, celui qui raconte. Zoé ne sait pas encore de qui il parle.",
      schema: exDeuxTetes,
      micros: ["cp_oral_ecouter", "cp_oral_raconter"],
    },
    {
      question: "Écoute le message et entoure les deux mots importants à retenir.",
      correction: "« mardi » et « piscine ». On retient ce qui compte, pas tous les mots.",
      schema: exMessage,
      micros: ["cp_oral_ecouter"],
    },
    {
      question: "Entoure le verbe de la consigne : c'est lui qui dit quoi faire.",
      correction: "« Colorie ». Le reste dit sur quoi et de quelle couleur.",
      schema: exConsigne,
      micros: ["cp_oral_consigne"],
    },
    {
      question: "Ces deux consignes demandent-elles la même chose ?",
      correction: "Non : « entoure » demande un rond, « souligne » demande un trait dessous.",
      schema: exDeuxConsignes,
      micros: ["cp_oral_consigne"],
    },
    {
      question: "Les deux phrases disent-elles la même chose ?",
      correction: "Oui : une mangue est un fruit, croquer c'est manger. Rien n'a été inventé.",
      schema: exReformuler,
      micros: ["cp_oral_reformuler"],
    },
    {
      question: "Relie chaque petit mot à ce qu'il annonce : la raison, la suite, ce qui vient après.",
      correction: "parce que → la raison. alors → la suite. ensuite → ce qui vient après.",
      schema: exOrganisateurs,
      micros: ["cp_oral_raconter"],
    },
    {
      question: "Que manque-t-il dans ce que dit Téo ? Écris le mot qui manque.",
      correction: "Il manque QUI est tombé. « il » ne désigne personne pour celui qui écoute.",
      schema: exQuiEstTombe,
      micros: ["cp_oral_raconter"],
    },
    {
      question: "Ravi dit « À toi ! ». Que fait-il ?",
      correction: "Il donne son tour de parole. Un échange se fait à deux, mais pas en même temps.",
      schema: exTourDeParole,
      micros: ["cp_oral_prendre_parole"],
    },
    {
      question: "Deux élèves parlent en même temps. Que faut-il faire ?",
      correction: "L'un attend et écoute, puis parle à son tour. On ne se comprend pas à deux voix.",
      micros: ["cp_oral_echanges"],
    },
    {
      question: "Barre la phrase qu'on ne dit pas à la maitresse.",
      correction: "On barre « J'peux sortir ? ». Elle s'entend dans la cour, pas en classe.",
      schema: exNiveauDeLangue,
      micros: ["cp_oral_niveau_langue"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesOralCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Parler pour être compris - CP",
    section: {
      type: "objectif",
      phrase: "L'histoire est dans TA tête",
      sousPhrase: "Celui qui t'écoute ne l'a pas.",
      encadre: {
        titre: "L'idée",
        texte: "Parler, c'est se mettre à la place de celui qui écoute.",
      },
    },
    schema: laTeteDeLAutre,
  },
  {
    titre: "Trois petits mots",
    badge: "Parler pour être compris - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "parce que", texte: "la raison" },
        { titre: "alors", texte: "la conséquence" },
        { titre: "ensuite", texte: "la suite" },
      ],
    },
    schema: lesTroisPetitsMots,
  },
  {
    titre: "Avant de parler",
    badge: "Parler pour être compris - CP",
    section: {
      type: "etapes",
      etapes: [
        "Sait-il de qui je parle ?",
        "M'entend-il du fond de la classe ?",
        "Est-ce bien mon tour ?",
      ],
    },
    schema: chacunSonTour,
  },
  {
    titre: "À vous",
    badge: "Parler pour être compris - CP",
    section: {
      type: "exercice",
      enonce: "Téo raconte : « Et après il est tombé ! »",
      question: "Pourquoi Zoé ne comprend-elle pas ?",
      indice: "Celui qui t'écoute n'a pas entendu l'histoire.",
      correction: "« il » ne désigne personne pour elle : il faut dire QUI est tombé.",
    },
    schema: laTeteDeLAutre,
  },
];
