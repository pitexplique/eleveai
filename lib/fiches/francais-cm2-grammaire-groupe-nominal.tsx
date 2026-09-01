// ─── Fiche de cours : le groupe nominal et ses expansions (CM2) ───────────────
// TROISIÈME DES QUATRE FICHES DE GRAMMAIRE DU CM2, et l'avant-dernière notion
// que l'ancienne fiche `grammaire-orthographe` servait par alias.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année ».
//
// ⛔⛔ CE QUE CETTE FICHE DÉBLOQUE. Depuis le 20/08/2026, la grammaire du CM2 est
// coupée en trois notions, mais `grammaire_groupe_nominal` et
// `grammaire_accords` n'avaient toujours pas leur fiche : deux ALIAS de
// `lib/fiches/registre.ts` les renvoyaient sur `francais/cm2/grammaire-
// orthographe`, la fiche d'avant le chantier — qui cite seize micros et n'en
// traite aucune dans un bloc. Le commentaire de ces alias le dit lui-même :
// « elles s'effacent dès que les trois fiches sont écrites ».
// ⭐ DÉCISION DE FRÉDÉRIC, 01/09/2026 : écrire les deux fiches, puis retirer
// `grammaire-orthographe` du registre et poser une 301 vers
// `grammaire-nature-fonction`. ⚠️ LA REDIRECTION NE SE POSE QU'UNE FOIS LES DEUX
// ÉCRITES — sinon on coupe la seule page qui sert ces notions. Cette URL est une
// clé du registre, donc une URL du sitemap : voir
// [[rendez-vous-indexation-fin-septembre-2026]].
//
// ⛔ LA 6e PORTE UNE NOTION DU MÊME NOM, ET L'OPPOSITION N'EST PAS LA MÊME —
// son en-tête le dit : « c'est une autre opposition que celle du CM2, qui oppose
// l'épithète à l'ATTRIBUT ».
//
//   | | CM2 (ici) | 6e | CM1 |
//   |---|---|---|---|
//   | l'opposition | ⭐ épithète / ATTRIBUT | épithète / complément du nom, « sans ambigüité » | *(épithète seulement abordée)* |
//   | le fil | ⭐ regarde ce qu'il y a ENTRE le nom et l'adjectif | le noyau commande | réduis, et regarde ce qui reste |
//
// ⛔ NE PAS REDIRE : « Le noyau commande » est un titre de propriété de la 6e ;
// « réduis le groupe, le dernier mot debout est le noyau » est le fil du CM1
// (`francais-cm1-grammaire-groupe-nominal`, écrit le 01/09).
//
// ⭐⭐ LA DÉCOUVERTE, ET LE POOL LA POSE COMME UNE QUESTION À COUP SÛR :
// « qu'est-ce qui distingue à coup sûr l'épithète de l'attribut ? — L'ATTRIBUT
// EST RELIÉ AU NOM PAR UN VERBE D'ÉTAT », avec pour méthode « c'est LE VERBE qui
// décide ». Les trois leurres écartés sont trois fausses pistes de PLACE ou de
// FORME — « toujours après le nom », « toujours au masculin », « toujours un
// seul mot ». Autrement dit : ni la place ni la forme ne tranchent.
//
// ⭐⭐ D'OÙ LE TEST, ET IL RANGE LES TROIS EXPANSIONS D'UN COUP — signature du
// CM2, une vérification et non un avis : REGARDE CE QU'IL Y A ENTRE LE NOM ET
// CE QUI LE COMPLÈTE.
//     rien                → ÉPITHÈTE          « une plage déserte »
//     un verbe d'état     → ATTRIBUT DU SUJET « la plage est déserte »
//     une préposition     → COMPLÉMENT DU NOM « le cari de ma grand-mère »
// Une seule question, trois réponses, et l'élève n'a rien à juger.
//
// ⭐ Les cinq verbes d'état sont ceux du pool : être, devenir, sembler,
// paraitre, rester. C'est la liste qu'il faut connaitre — pas une définition.
//
// ⚠️ RÈGLE DE COULEUR : cette fiche PARLE de fonctions. Les étiquettes
// `épithète`, `attribut` et `complément du nom` sont donc posées sur
// `groupes[].label`, et le canvas les colore — c'est la leçon elle-même.
//
// Alignée sur les pools GN, COMPLEMENT_NOM, EPITHETE_ATTRIBUT et PREPOSITIONS de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
// Les groupes sont CEUX DE LA BANQUE : « une plage déserte », « la plage est
// déserte », « le cari de ma grand-mère », « le ciel devient sombre », « les
// enfants heureux courent ».
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
//
// Micro-compétences couvertes (les 5 de la notion `grammaire_groupe_nominal`) :
// - cm2_gram_gn                → propriété 1, méthode 1, exemple 1
// - cm2_gram_complement_nom    → propriété 4, exemple 4
// - cm2_gram_prepositions      → propriété 5
// - cm2_gram_epithete_attribut → figure, propriétés 2 et 3, méthodes 2 et 3, exemples 2 et 3
// - cm2_gram_gn_defi           → propriété 6

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

/** ⚠️ Cellules courtes : à la largeur d'un bloc, vingt signes tombent sous le
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

// ─── Les dessins ──────────────────────────────────────────────────────────────

const plageDeserte = phrase({
  mots: ["une", "plage", "déserte"],
  groupes: [{ mots: [2, 2], label: "épithète" }],
  legende: "Rien entre le nom et l'adjectif : il est épithète.",
});

const grilleTroisReponses = grille({
  headers: ["Entre les deux", "C'est"],
  rows: [
    { values: ["rien", "une épithète"] },
    { values: ["un verbe d'état", "un attribut"] },
    { values: ["une préposition", "un compl. du nom"] },
  ],
  caption: "Une seule question, et les trois se rangent.",
});

const plageEstDeserte = phrase({
  mots: ["la plage", "est", "déserte"],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [2, 2], label: "attribut" },
  ],
  liens: [{ de: 1, vers: 2, label: "verbe d'état", type: "question" }],
  legende: "Le verbe s'est glissé entre les deux : ce n'est plus une épithète.",
});

const cinqVerbesDEtat = grille({
  headers: ["Les verbes d'état", ""],
  rows: [
    { values: ["être, devenir", "sembler"] },
    { values: ["paraitre, rester", ""] },
  ],
  caption: "Cinq verbes à connaitre. Après eux, l'adjectif est attribut.",
});

const cariDeGrandMere = phrase({
  mots: ["le cari", "de ma grand-mère"],
  groupes: [{ mots: [1, 1], label: "complément du nom" }],
  legende: "Une préposition ouvre le groupe : c'est un complément du nom.",
});

const enfantsHeureuxCourent = phrase({
  mots: ["les enfants", "heureux", "courent"],
  groupes: [{ mots: [1, 1], label: "épithète" }],
  legende: "« Courir » n'est pas un verbe d'état : l'adjectif reste au nom.",
});

const niPlaceNiForme = phrase({
  mots: [
    { texte: "la place", barre: true },
    { texte: "ce qu'il y a entre", focus: true },
  ],
  legende: "Ni la place ni la forme ne tranchent. Le verbe, oui.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheGrammaireGroupeNominalCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "grammaire-groupe-nominal",
  titre: `Le groupe nominal et ses expansions en CM2 (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Une plage déserte » et « la plage est déserte » : le même adjectif, et pourtant deux fonctions différentes. Ce qui change n'est ni sa place ni sa forme — c'est ce qui s'est glissé entre les deux.",
  identite: [
    { label: "Mots clés", valeur: "Épithète, attribut, complément du nom" },
    { label: "Le secret", valeur: "Regarde ce qu'il y a entre les deux" },
    { label: "Outil", valeur: "Cherche le verbe d'état" },
  ],
  definition: {
    texte: [
      "Autour d'un nom viennent se greffer des expansions. Trois sortes, et une seule question les sépare : qu'y a-t-il entre le nom et ce qui le complète ?",
      "Rien du tout : l'adjectif est collé au nom, c'est une épithète. « Une plage déserte ».",
      "Un verbe d'état — être, devenir, sembler, paraitre, rester : l'adjectif passe de l'autre côté, c'est un attribut du sujet. « La plage est déserte ».",
      "Une préposition : le groupe qu'elle ouvre est un complément du nom. « Le cari de ma grand-mère ».",
      "Ni la place ni la forme ne tranchent : c'est le verbe qui décide. « Les enfants heureux courent » garde une épithète, parce que courir n'est pas un verbe d'état.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(plageDeserte, grilleTroisReponses),
  },
  proprietes: [
    {
      titre: "Le nom reçoit des expansions",
      texte: "Un adjectif, un groupe avec préposition : ils précisent le nom sans le remplacer.",
      schema: plageDeserte,
      micros: ["cm2_gram_gn"],
    },
    {
      titre: "Rien entre les deux : épithète",
      texte: "« Une plage déserte ». L'adjectif est dans le groupe nominal, collé au nom.",
      schema: plageDeserte,
      micros: ["cm2_gram_epithete_attribut"],
    },
    {
      titre: "Un verbe d'état : attribut du sujet",
      texte: "« La plage est déserte ». Le verbe sépare, et l'adjectif change de fonction.",
      schema: plageEstDeserte,
      micros: ["cm2_gram_epithete_attribut"],
    },
    {
      titre: "Une préposition : complément du nom",
      texte: "« Le cari de ma grand-mère ». Ce n'est pas un adjectif, mais un groupe entier.",
      schema: cariDeGrandMere,
      micros: ["cm2_gram_complement_nom"],
    },
    {
      titre: "Cinq verbes d'état à connaitre",
      texte: "être, devenir, sembler, paraitre, rester. Les autres verbes ne font pas d'attribut.",
      schema: cinqVerbesDEtat,
      micros: ["cm2_gram_prepositions"],
    },
    {
      titre: "Le défi : ni la place, ni la forme",
      texte: "Un attribut n'est pas « toujours après » ni « toujours un seul mot ». Cherche le verbe.",
      schema: niPlaceNiForme,
      micros: ["cm2_gram_gn_defi"],
    },
  ],
  reel: {
    texte:
      "« Un café chaud » et « le café est chaud » ne se disent pas dans les mêmes moments : le premier commande, le second constate. La grammaire ne fait ici que nommer une différence que tu entends déjà.",
  },
  historique: {
    texte:
      "Le mot attribut vient du latin attribuere : assigner, donner en partage. L'attribut n'ajoute pas une précision au nom — il lui donne quelque chose, par l'intermédiaire du verbe. Son nom dit son mécanisme.",
  },
  methode: [
    {
      titre: "Trouve le nom, puis ce qui s'y accroche",
      texte: "Repère d'abord le nom noyau. Les expansions se comptent ensuite.",
      schema: plageDeserte,
      micros: ["cm2_gram_gn"],
    },
    {
      titre: "Cherche un verbe entre le nom et l'adjectif",
      texte: "S'il y en a un, vérifie qu'il est bien dans la liste des cinq.",
      schema: cinqVerbesDEtat,
      micros: ["cm2_gram_epithete_attribut"],
    },
    {
      titre: "Essaie de supprimer l'adjectif",
      texte: "« Une plage » se dit ; « la plage est » ne se dit pas. L'attribut ne s'enlève pas.",
      schema: plageEstDeserte,
      micros: ["cm2_gram_epithete_attribut"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Une plage déserte",
      donnees: "« une plage déserte »",
      schema: plageDeserte,
      question: "Quelle est la fonction de « déserte » ?",
      solution:
        "Épithète. Rien ne s'est glissé entre le nom et l'adjectif : il reste dans le groupe nominal.",
      micros: ["cm2_gram_epithete_attribut"],
    },
    {
      titre: "La plage est déserte",
      donnees: "« La plage est déserte. »",
      schema: plageEstDeserte,
      question: "Et maintenant ?",
      solution:
        "Attribut du sujet. Le verbe « est » sépare le nom de l'adjectif : c'est lui qui change la fonction, pas la place du mot.",
      micros: ["cm2_gram_epithete_attribut"],
    },
    {
      titre: "Les enfants heureux courent",
      donnees: "« Les enfants heureux courent. »",
      schema: enfantsHeureuxCourent,
      question: "Y a-t-il un attribut ?",
      solution:
        "Non. « Courir » n'est pas un verbe d'état, et l'adjectif est resté collé au nom : « heureux » est épithète.",
      micros: ["cm2_gram_epithete_attribut"],
    },
    {
      titre: "Le cari de ma grand-mère",
      donnees: "« le cari de ma grand-mère »",
      schema: cariDeGrandMere,
      question: "Épithète ou complément du nom ?",
      solution:
        "Complément du nom : ce n'est pas un adjectif, et une préposition ouvre le groupe. Une épithète n'en a jamais.",
      micros: ["cm2_gram_complement_nom"],
    },
  ],
  pieges: [
    "Croire que l'attribut se reconnait à sa place après le nom.",
    "Prendre « heureux » pour un attribut parce qu'il suit un sujet pluriel.",
    "Oublier que devenir, sembler, paraitre et rester sont des verbes d'état.",
    "Appeler épithète un groupe introduit par une préposition.",
    "Trancher à l'oreille au lieu de regarder ce qu'il y a entre les deux.",
  ],
  aRetenir: [
    "Trois expansions, une seule question : qu'y a-t-il entre les deux ?",
    "Rien : épithète.",
    "Un verbe d'état : attribut du sujet.",
    "Une préposition : complément du nom.",
    "Les cinq verbes d'état : être, devenir, sembler, paraitre, rester.",
  ],
  entrainement: [
    {
      question: "Dans « une plage déserte », « déserte » est…",
      correction: "Une épithète.",
      micros: ["cm2_gram_epithete_attribut"],
    },
    {
      question: "Dans « la plage est déserte », « déserte » est…",
      correction: "Un attribut du sujet.",
      micros: ["cm2_gram_epithete_attribut"],
    },
    {
      question: "Dans « le cari de ma grand-mère », « de ma grand-mère » est…",
      correction: "Un complément du nom.",
      micros: ["cm2_gram_complement_nom"],
    },
    {
      question: "Cite les cinq verbes d'état.",
      correction: "Être, devenir, sembler, paraitre, rester.",
      micros: ["cm2_gram_prepositions"],
    },
    {
      question: "Qu'est-ce qui distingue à coup sûr l'épithète de l'attribut ?",
      correction: "L'attribut est relié au nom par un verbe d'état.",
      micros: ["cm2_gram_gn_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesGrammaireGroupeNominalCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le groupe nominal - CM2",
    section: {
      type: "objectif",
      phrase: "Regarde ce qu'il y a entre les deux",
      sousPhrase: "« Une plage déserte » et « la plage est déserte » : même mot, deux fonctions.",
      encadre: { titre: "L'idée", texte: "C'est le verbe qui décide, pas la place." },
    },
  },
  {
    titre: "Une question, trois réponses",
    badge: "Le groupe nominal - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Rien", texte: "Épithète : « une plage déserte »." },
        { titre: "Un verbe d'état", texte: "Attribut : « la plage est déserte »." },
        { titre: "Une préposition", texte: "Complément du nom : « le cari de… »." },
      ],
    },
    schema: grilleTroisReponses,
  },
  {
    titre: "Tu l'entends déjà",
    badge: "Le groupe nominal - CM2",
    section: {
      type: "etapes",
      etapes: [
        "« Un café chaud » : tu commandes.",
        "« Le café est chaud » : tu constates.",
        "La grammaire nomme une différence que tu entends.",
      ],
    },
    schema: plageEstDeserte,
  },
  {
    titre: "À vous",
    badge: "Le groupe nominal - CM2",
    section: {
      type: "exercice",
      enonce: "« Les enfants heureux courent. »",
      question: "Y a-t-il un attribut ?",
      indice: "« Courir » est-il un verbe d'état ?",
      correction: "Non : « heureux » est épithète, collé au nom.",
    },
    schema: enfantsHeureuxCourent,
  },
];
