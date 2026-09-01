// ─── Fiche de cours : la forme d'un verbe conjugué (CM1) ──────────────────────
// VINGT-QUATRIÈME FICHE DU CHANTIER CM1, deuxième des trois de conjugaison.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année » : « Identifier dans la
// terminaison des verbes conjugués la MARQUE DE TEMPS et la MARQUE DE PERSONNE »
// · « Consolider la connaissance des variations du radical pour certains verbes
// du PREMIER GROUPE ».
//
// ⛔⛔ NOTION LA PLUS SATURÉE DU CHANTIER : le CM2 ET la 6e ont chacun une fiche
// `conjugaison_formes` complète, et j'ai vérifié ligne à ligne. Sont pris :
//
//   ⛔ « un verbe conjugué se coupe en deux : le radical porte le sens, la
//      terminaison dit quand et qui » → CM2 et 6e.
//   ⛔ « le radical change d'orthographe pour garder son SON », avec
//      « manguons » et « commenkons » → CM2 l. 191 ET 6e l. 259, presque mot
//      pour mot. C'était mon premier angle ; abandonné.
//   ⛔ « Le r du futur » → titre de propriété du CM2.
//   ⛔ Le TROISIÈME GROUPE est propre au CM2, qui le dit lui-même dans son
//      en-tête : le BO du CM1 s'arrête au premier groupe. Ne rien en verser ici.
//
// ⭐⭐ CE QUI RESTE EST UNE MICRO QUE NI LE CM2 NI LA 6e N'ONT :
// `cm1_conj_marques_personne` — « CONNAITRE LES MARQUES DE PERSONNE AU PRÉSENT,
// À L'IMPARFAIT ET AU FUTUR ». Aux trois temps, donc comparées entre elles. Or
// dès qu'on les met côte à côte, une régularité saute aux yeux, et un enfant
// peut la constater seul :
//
//     présent    nous jou-ons      vous jou-ez       ils jou-ent
//     imparfait  nous jou-i-ons    vous jou-i-ez     ils jou-ai-ent
//     futur      nous jouer-ons    vous jouer-ez     ils jouer-ont
//
// ⭐⭐ « NOUS » FINIT TOUJOURS PAR -ONS, « VOUS » PAR -EZ, « ILS » PAR -NT — aux
// trois temps, une fois la marque de temps mise de côté. C'est exactement ce que
// le mode `wagons` du canvas montre : -ions n'est pas une terminaison, c'est
// deux caisses, « i » puis « ons ».
// ⚠️ Honnêteté de la fiche, comme pour « ou / où » et pour « j'irai » : « je »
// N'EST PAS dans la liste — il fait -e, -ais, -ai selon le temps. La fiche donne
// trois repères sûrs, pas six.
//
// ⭐ D'où le fil, qui prolonge celui des petits mots (`grammaire_classes_mots`) :
// DANS UNE TERMINAISON, UNE MOITIÉ CHANGE ET L'AUTRE NON. La marque de temps
// change avec le temps ; la marque de personne, elle, tient bon.
//
// ⭐ Le radical du premier groupe est traité, parce que la micro l'exige, mais
// comme une PROPRIÉTÉ et non comme la découverte — le son y est nommé sans
// reprendre les deux exemples déjà employés deux fois ailleurs.
//
// Alignée sur les pools MARQUES_TEMPS_PERSONNE et RADICAL_VARIATIONS de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// ⚠️ Le helper `train` n'écrit JAMAIS de couleur : `role` suffit.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// Micro-compétences couvertes (les 4 de la notion `conjugaison_formes`) :
// - cm1_conj_marques            → propriétés 1 et 2, méthode 1, exemple 1
// - cm1_conj_marques_personne   → figure, propriétés 3 et 4, méthode 2, exemples 2 et 4
// - cm1_conj_radical_variations → propriété 5, méthode 3, exemple 3
// - cm1_conj_marques_defi       → propriété 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { ConjugaisonLigne, ConjugaisonSegment } from "@/lib/tutor-v4/types";

/** Les wagons d'un verbe conjugué. ⚠️ N'écrit jamais de couleur : `role` suffit. */
function train(opts: {
  infinitif?: string;
  pronom?: string;
  segments: ConjugaisonSegment[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "wagons",
        infinitif: opts.infinitif,
        pronom: opts.pronom,
        segments: opts.segments,
        legende: opts.legende,
      }}
    />
  );
}

function tableau(opts: { temps: string; lignes: ConjugaisonLigne[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "tableau",
        temps: opts.temps,
        lignes: opts.lignes,
        legende: opts.legende,
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

// LA FIGURE DE RÉFÉRENCE : trois caisses, et la dernière ne bougera plus.
const nousImparfait = train({
  infinitif: "jouer",
  pronom: "nous",
  segments: [
    { texte: "jou", role: "radical", note: "radical" },
    { texte: "i", role: "temps", note: "imparfait" },
    { texte: "ons", role: "personne", note: "nous" },
  ],
  legende: "« -ions » n'est pas un bloc : c'est « i », puis « ons ».",
});

const tableauTroisNous = tableau({
  temps: "jouer, avec « nous »",
  lignes: [
    { pronom: "présent", radical: "jou", terminaison: "ons" },
    { pronom: "imparfait", radical: "joui", terminaison: "ons" },
    { pronom: "futur", radical: "jouer", terminaison: "ons" },
  ],
  legende: "Trois temps, et « nous » finit toujours par « -ons ».",
});

const nousPresent = train({
  infinitif: "jouer",
  pronom: "nous",
  segments: [
    { texte: "jou", role: "radical", note: "radical" },
    { texte: "ons", role: "personne", note: "nous" },
  ],
  legende: "Au présent, pas de marque de temps : deux caisses suffisent.",
});

const ilsFutur = train({
  infinitif: "jouer",
  pronom: "ils",
  segments: [
    { texte: "jouer", role: "radical", note: "l'infinitif" },
    { texte: "ont", role: "personne", note: "ils" },
  ],
  legende: "« ils » finit par « -nt », au futur comme ailleurs.",
});

const vousImparfait = train({
  infinitif: "jouer",
  pronom: "vous",
  segments: [
    { texte: "jou", role: "radical", note: "radical" },
    { texte: "i", role: "temps", note: "imparfait" },
    { texte: "ez", role: "personne", note: "vous" },
  ],
  legende: "Même découpage pour « vous » : le « i », puis « ez ».",
});

const radicalQuiSecrit = train({
  infinitif: "ranger",
  pronom: "nous",
  segments: [
    { texte: "range", role: "radical", note: "un e en plus", alerte: true },
    { texte: "ons", role: "personne", note: "nous" },
  ],
  legende: "Le radical s'écrit autrement pour se prononcer pareil.",
});

const tableauMarqueDeTemps = tableau({
  temps: "jouer, avec « vous »",
  lignes: [
    { pronom: "présent", radical: "jou", terminaison: "ez" },
    { pronom: "imparfait", radical: "joui", terminaison: "ez", alerte: true },
    { pronom: "futur", radical: "jouer", terminaison: "ez", alerte: true },
  ],
  legende: "Ce qui bouge devant « -ez », c'est la marque de temps.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheConjugaisonFormesCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "conjugaison-formes",
  titre: `La forme d'un verbe conjugué en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "nous jouons, nous jouions, nous jouerons. Trois temps différents — et à chaque fois, « nous » finit par « -ons ». Ce n'est pas un hasard.",
  identite: [
    { label: "Mots clés", valeur: "Radical, temps, personne" },
    { label: "Le secret", valeur: "Une moitié change, l'autre non" },
    { label: "Outil", valeur: "Cherche -ons, -ez, -nt" },
  ],
  definition: {
    texte: [
      "Ce qu'on ajoute à la fin d'un verbe n'est pas un seul morceau : c'est souvent deux.",
      "Une marque de temps, qui dit quand. Une marque de personne, qui dit qui.",
      "« Nous jouions » n'a donc pas la terminaison « -ions » : il a « i », qui dit l'imparfait, puis « ons », qui dit nous.",
      "Et voilà ce qui rend le tout facile : la marque de temps change, mais la marque de personne, elle, tient bon. « Nous » finit toujours par -ons, « vous » par -ez, « ils » par -nt.",
      "Trois repères sûrs aux trois temps. Attention : « je » n'en fait pas partie — il fait -e, puis -ais, puis -ai.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(nousImparfait, tableauTroisNous),
  },
  proprietes: [
    {
      titre: "Une terminaison porte deux marques",
      texte: "Une pour le temps, une pour la personne. On peut les séparer.",
      schema: nousImparfait,
      micros: ["cm1_conj_marques"],
    },
    {
      titre: "La marque de temps est celle qui change",
      texte: "Le « i » de l'imparfait, le « r » du futur. C'est elle qui déménage.",
      schema: tableauMarqueDeTemps,
      micros: ["cm1_conj_marques"],
    },
    {
      titre: "« Nous » finit toujours par -ons",
      texte: "Présent, imparfait, futur : jouons, jouions, jouerons.",
      schema: tableauTroisNous,
      micros: ["cm1_conj_marques_personne"],
    },
    {
      titre: "« Vous » fait -ez, et « ils » fait -nt",
      texte: "jouez, jouiez, jouerez. Et jouent, jouaient, joueront.",
      schema: vousImparfait,
      micros: ["cm1_conj_marques_personne"],
    },
    {
      titre: "Le radical peut changer d'écriture",
      texte: "« Nous rangeons » garde un e : sans lui, le g ne se dirait plus pareil.",
      schema: radicalQuiSecrit,
      micros: ["cm1_conj_radical_variations"],
    },
    {
      titre: "Le défi : coupe la terminaison",
      texte: "Deux caisses au lieu d'une, et il n'y a plus grand-chose à retenir.",
      schema: nousPresent,
      micros: ["cm1_conj_marques_defi"],
    },
  ],
  reel: {
    texte:
      "Une plaque de voiture se lit en deux morceaux : une partie change d'un véhicule à l'autre, une autre dit le département et revient sans arrêt. Une terminaison de verbe se lit pareil, en deux morceaux.",
  },
  historique: {
    texte:
      "Ces marques viennent du latin, où elles étaient déjà là : amamus donnait « nous aimons », amatis donnait « vous aimez ». Le -mus et le -tis se sont usés en -ons et -ez, mais ils n'ont jamais changé de métier.",
  },
  methode: [
    {
      titre: "Enlève le radical et regarde ce qui reste",
      texte: "Dans « nous jouions », enlève « jou » : il reste « i » et « ons ».",
      schema: nousImparfait,
      micros: ["cm1_conj_marques"],
    },
    {
      titre: "Cherche -ons, -ez ou -nt à la fin",
      texte: "Si tu les trouves, tu connais déjà la personne, quel que soit le temps.",
      schema: tableauTroisNous,
      micros: ["cm1_conj_marques_personne"],
    },
    {
      titre: "Avec « nous », relis le radical à voix haute",
      texte: "S'il ne se prononce plus pareil, c'est qu'il lui manque une lettre.",
      schema: radicalQuiSecrit,
      micros: ["cm1_conj_radical_variations"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Nous jouions",
      donnees: "« Nous jouions dans la cour. »",
      schema: nousImparfait,
      question: "Combien de marques après le radical ?",
      solution:
        "Deux. « i » dit l'imparfait, « ons » dit nous. Ce n'est pas une terminaison en un bloc.",
      micros: ["cm1_conj_marques"],
    },
    {
      titre: "Trois fois « nous »",
      donnees: "nous jouons · nous jouions · nous jouerons",
      schema: tableauTroisNous,
      question: "Qu'y a-t-il de commun ?",
      solution:
        "La fin : -ons, aux trois temps. Seule la marque de temps a changé devant elle.",
      micros: ["cm1_conj_marques_personne"],
    },
    {
      titre: "Nous rangeons",
      donnees: "« Nous rangeons la salle. »",
      schema: radicalQuiSecrit,
      question: "Pourquoi ce « e » ?",
      solution:
        "Pour que le « g » se prononce comme dans « ranger ». Le radical s'écrit autrement pour rester le même à l'oreille.",
      micros: ["cm1_conj_radical_variations"],
    },
    {
      titre: "Et « je » ?",
      donnees: "je joue · je jouais · je jouerai",
      schema: vousImparfait,
      question: "Est-ce que « je » a une marque fixe ?",
      solution:
        "Non, et c'est bon à savoir : -e, -ais, -ai. Les trois repères sûrs sont « nous », « vous » et « ils ».",
      micros: ["cm1_conj_marques_personne"],
    },
  ],
  pieges: [
    "Croire que « -ions » est une seule terminaison.",
    "Chercher une marque fixe pour « je » : il n'y en a pas.",
    "Oublier le « e » de « nous rangeons ».",
    "Confondre la marque de temps et la marque de personne.",
    "Apprendre les terminaisons par cœur sans jamais les couper.",
  ],
  aRetenir: [
    "Une terminaison porte deux marques : temps et personne.",
    "La marque de temps change, celle de personne tient bon.",
    "« Nous » finit toujours par -ons.",
    "« Vous » fait -ez, « ils » fait -nt.",
    "« Je » n'a pas de marque fixe.",
  ],
  entrainement: [
    {
      question: "Dans « nous jouions », que dit le « i » ?",
      correction: "Que le verbe est à l'imparfait : c'est la marque de temps.",
      micros: ["cm1_conj_marques"],
    },
    {
      question: "Par quoi « nous » finit-il aux trois temps ?",
      correction: "Par -ons.",
      micros: ["cm1_conj_marques_personne"],
    },
    {
      question: "Par quoi finissent « vous » et « ils » ?",
      correction: "« Vous » par -ez, « ils » par -nt.",
      micros: ["cm1_conj_marques_personne"],
    },
    {
      question: "Pourquoi écrit-on « nous rangeons » avec un e ?",
      correction: "Pour garder le son du « g » devant le « o ».",
      micros: ["cm1_conj_radical_variations"],
    },
    {
      question: "Comment lire une terminaison sans l'apprendre par cœur ?",
      correction: "En la coupant en deux : la marque de temps, puis celle de personne.",
      micros: ["cm1_conj_marques_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesConjugaisonFormesCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La forme d'un verbe - CM1",
    section: {
      type: "objectif",
      phrase: "Une moitié change, l'autre non",
      sousPhrase: "nous jouons, nous jouions, nous jouerons : toujours « -ons ».",
      encadre: { titre: "L'idée", texte: "Une terminaison porte deux marques." },
    },
  },
  {
    titre: "Trois repères sûrs",
    badge: "La forme d'un verbe - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "nous", texte: "-ons, aux trois temps." },
        { titre: "vous", texte: "-ez, aux trois temps." },
        { titre: "ils", texte: "-nt, aux trois temps." },
      ],
    },
    schema: tableauTroisNous,
  },
  {
    titre: "Comme une plaque",
    badge: "La forme d'un verbe - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Elle se lit en deux morceaux.",
        "Une partie change d'une voiture à l'autre.",
        "L'autre revient sans arrêt.",
      ],
    },
    schema: nousImparfait,
  },
  {
    titre: "À vous",
    badge: "La forme d'un verbe - CM1",
    section: {
      type: "exercice",
      enonce: "« Nous jouions dans la cour. »",
      question: "Combien de marques après le radical ?",
      indice: "Enlève « jou » et regarde ce qui reste.",
      correction: "Deux : « i » pour l'imparfait, « ons » pour nous.",
    },
    schema: nousImparfait,
  },
];
