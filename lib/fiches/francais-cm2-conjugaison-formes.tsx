// ─── Fiche de cours : la forme d'un verbe conjugué (CM2) ──────────────────────
// DEUXIÈME FICHE DE CONJUGAISON DU CM2. La première apprenait à conjuguer aux
// trois temps simples ; celle-ci démonte le résultat. On passe de « quelle
// forme écrire » à « de quoi cette forme est-elle faite ».
//
// ⭐ DEUX OBJECTIFS DU BO, MOT POUR MOT, ET ILS COMMANDENT LES DEUX MODES DU
// CANVAS.
// « Identifier dans la terminaison des verbes conjugués : la MARQUE DE TEMPS et
// la MARQUE DE PERSONNE » → le mode `wagons` : chaque marque est une caisse, et
// l'on voit qu'une terminaison de trois lettres en porte deux.
// « Consolider la connaissance des variations du radical pour certains verbes du
// PREMIER GROUPE ET DU TROISIÈME GROUPE » → le mode `tableau` : une variation ne
// se voit qu'en comparant les six personnes entre elles.
//
// ⛔ ET LE TROISIÈME GROUPE EST PROPRE AU CM2 — À NE PAS RECOPIER PLUS BAS. Le
// CM1 et la 6e portent une micro au nom identique (`conj_radical_variations`),
// et leur BO à eux s'arrête au premier groupe. Le pool
// RADICAL_TROISIEME_GROUPE et sa branche `cm2_` ont été écrits le 23/08 pour
// cette raison ; verser ces verbes dans le pool commun mettrait deux classes en
// avance sur leur programme, en silence.
//
// Alignée sur lib/tutor-v4/knowledge/francais/cm2/microSkills.ts
// (notionId `conjugaison_formes`) et sur les pools MARQUES_TEMPS_PERSONNE,
// RADICAL_VARIATIONS et RADICAL_TROISIEME_GROUPE de buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 3 de la notion, défi compris) :
// - cm2_conj_marques            → définition, figure, propriétés « Radical et
//                                 terminaison », « La marque de temps », « Le r
//                                 du futur », « La marque de personne »,
//                                 formule, méthodes 1 à 3, usages, exemples 1
//                                 à 3, pièges 1 et 2, entraînements 1 à 3
// - cm2_conj_radical_variations → propriétés « Le radical bouge au 1er groupe »
//                                 et « … et davantage au 3e », exemple 4,
//                                 pièges 3 et 4, entraînements 4 et 5
// - cm2_conj_marques_defi       → le défi, dessiné (exemple 5)
//
// Les formes sont CELLES DE LA BANQUE : « nous chantions », « tu chantais »,
// « je chanterai », « je finissais », « nous rangeons », « nous commençons »,
// « je viens / nous venons », « il prend / nous prenons », « je peux / nous
// pouvons », « vous dites ».
//
// ⚠️ Contrôle passé avant commit : REGLES.md § 2 quater — dessins rendus hors du
// site en 250 / 340 / 400 px, aucun texte sous 11 px, aucun texte hors cadre.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { ConjugaisonLigne, ConjugaisonSegment } from "@/lib/tutor-v4/types";

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

// ─── Les formes de la banque, démontées ───────────────────────────────────────

// LA FIGURE DE RÉFÉRENCE. « nous chantions » est la forme sur laquelle le pool
// MARQUES_TEMPS_PERSONNE pose ses deux questions.
const trainReference = train({
  infinitif: "chanter",
  pronom: "nous",
  segments: [
    { texte: "chant", role: "radical", note: "radical" },
    { texte: "i", role: "temps", note: "imparfait" },
    { texte: "ons", role: "personne", note: "nous" },
  ],
  legende: "Un mot, trois morceaux.",
});

const trainFutur = train({
  infinitif: "chanter",
  pronom: "je",
  segments: [
    { texte: "chante", role: "radical", note: "radical" },
    { texte: "r", role: "temps", note: "futur", alerte: true },
    { texte: "ai", role: "personne", note: "je" },
  ],
  legende: "Le « r » annonce le futur.",
});

// « -ais » DIT DEUX CHOSES À LA FOIS : c'est la question du pool, et deux wagons
// séparés en donnent la réponse sans un mot d'explication.
const trainImparfait = train({
  infinitif: "chanter",
  pronom: "tu",
  segments: [
    { texte: "chant", role: "radical", note: "radical" },
    { texte: "ai", role: "temps", note: "imparfait" },
    { texte: "s", role: "personne", note: "tu" },
  ],
  legende: "« -ais » = « -ai- » + « -s ».",
});

// LE PREMIER GROUPE : le radical change d'ORTHOGRAPHE, pour garder son SON.
const tableauRanger = tableau({
  temps: "ranger, au présent",
  lignes: [
    { pronom: "je", radical: "rang", terminaison: "e" },
    { pronom: "tu", radical: "rang", terminaison: "es" },
    { pronom: "il", radical: "rang", terminaison: "e" },
    { pronom: "nous", radical: "range", terminaison: "ons", alerte: true },
    { pronom: "vous", radical: "rang", terminaison: "ez" },
    { pronom: "ils", radical: "rang", terminaison: "ent" },
  ],
  legende: "Le « e » revient devant « -ons ».",
});

// … ET LE TROISIÈME GROUPE, que le CM2 est la seule classe du cycle à voir. Ici
// le radical ne change pas d'orthographe : il change VRAIMENT.
const tableauPrendre = tableau({
  temps: "prendre, au présent",
  lignes: [
    { pronom: "je", radical: "pren", terminaison: "ds" },
    { pronom: "tu", radical: "pren", terminaison: "ds" },
    { pronom: "il", radical: "pren", terminaison: "d" },
    { pronom: "nous", radical: "pren", terminaison: "ons" },
    { pronom: "vous", radical: "pren", terminaison: "ez" },
    { pronom: "ils", radical: "pren", terminaison: "nent", alerte: true },
  ],
  legende: "« pren- » tient, sauf devant « -ent ».",
});

const tableauVenir = tableau({
  temps: "venir, au présent",
  lignes: [
    { pronom: "je", radical: "vien", terminaison: "s", alerte: true },
    { pronom: "tu", radical: "vien", terminaison: "s", alerte: true },
    { pronom: "il", radical: "vien", terminaison: "t", alerte: true },
    { pronom: "nous", radical: "ven", terminaison: "ons" },
    { pronom: "vous", radical: "ven", terminaison: "ez" },
    { pronom: "ils", radical: "vienn", terminaison: "ent", alerte: true },
  ],
  legende: "Deux radicaux : « vien- » et « ven- ».",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2).
const trainDefi = train({
  infinitif: "pouvoir",
  pronom: "nous",
  segments: [
    { texte: "pouv", role: "radical", note: "change", alerte: true },
    { texte: "ons", role: "personne", note: "nous" },
  ],
  legende: "« je peux » devient « nous pouvons ».",
});

const pieges = [
  "Croire que la terminaison ne dit qu'une chose : dans « tu chantais », « -ai- » donne le temps et « -s » donne la personne. Deux marques dans trois lettres.",
  "Confondre le « r » du futur avec un « r » du radical : dans « je pars », le « r » appartient à « part- ». Le « r » du futur arrive APRÈS le radical, juste avant la terminaison.",
  "Écrire « nous mangons » ou « nous commencons » : sans le « e » et sans la cédille on lirait « manguons » et « commenkons ». Au 1er groupe, le radical change d'orthographe pour garder son SON.",
  "Croire qu'un verbe n'a qu'un radical : au 3e groupe, « je peux » et « nous pouvons » sont le même verbe. « peu- » et « pouv- » sont deux radicaux, et il faut les connaître tous les deux.",
];

const aRetenir = [
  "Un verbe conjugué se coupe en deux : le radical porte le sens, la terminaison dit quand et qui.",
  "La terminaison contient une marque de temps — le « r » du futur, le « -ai- » ou « -i- » de l'imparfait — et une marque de personne : -s, -ons, -ez, -ent.",
  "Le radical peut changer : d'orthographe au 1er groupe (nous rangeons), pour de bon au 3e (je viens, nous venons).",
];

export const ficheConjugaisonFormesCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "conjugaison-formes",
  titre: "La forme d'un verbe : radical, temps, personne",
  accroche:
    "« tu chantais ». La terminaison « -ais » fait trois lettres, et elle dit deux choses : « -ai- » annonce l'imparfait, « -s » annonce que c'est toi. Une fois qu'on sait couper, on ne devine plus une conjugaison — on la lit.",
  identite: [
    { label: "Mots clés", valeur: "Radical, terminaison, marque de temps, marque de personne" },
    { label: "Le secret", valeur: "Couper le verbe en morceaux au lieu de le réciter" },
    { label: "Outil", valeur: "Comparer les six personnes pour voir ce qui bouge" },
  ],
  definition: {
    texte: [
      "Un verbe conjugué est un mot assemblé : un radical, qui porte le sens, puis une terminaison.",
      "Et cette terminaison se lit elle-même en deux morceaux : la marque de temps, qui dit quand, et la marque de personne, qui dit qui.",
      "Le radical, lui, n'est pas toujours immobile : au 1er groupe il change parfois d'orthographe, au 3e il change carrément.",
    ].join("\n\n"),
  },
  figure: {
    schema: trainReference,
  },
  proprietes: [
    {
      titre: "Radical + terminaison",
      texte: "Le radical porte le sens du verbe ; la terminaison dit le temps et la personne.",
      schema: trainReference,
    },
    {
      titre: "La marque de temps",
      texte: "L'imparfait se signe « -ai- » ou « -i- ». Au présent, il n'y a pas de marque de temps.",
      schema: trainImparfait,
    },
    {
      titre: "Le « r » du futur",
      texte: "Le futur porte toujours un « r », dans tous les verbes, juste avant la terminaison.",
      schema: trainFutur,
    },
    {
      titre: "La marque de personne",
      texte: "Elle ferme le mot : -s avec tu, -ons avec nous, -ez avec vous, -ent avec ils.",
      schema: trainImparfait,
    },
    {
      titre: "Au 1er groupe, le radical change d'orthographe",
      texte: "« nous rangeons », « nous commençons » : il s'écrit autrement pour garder le même son.",
      schema: tableauRanger,
    },
    {
      titre: "Au 3e groupe, il change pour de bon",
      texte: "« je viens » mais « nous venons », « je peux » mais « nous pouvons » : deux radicaux.",
      schema: pile(tableauVenir, tableauPrendre),
    },
  ],
  reel: {
    texte:
      "Devant « ils accoururent », personne n'a appris la forme par cœur : on la comprend en repérant le radical et les marques. C'est ce qui permet d'ouvrir un roman au passé simple sans s'arrêter au premier verbe inconnu.",
  },
  historique: {
    texte:
      "Trois verbes seulement font « -tes » avec vous : vous faites, vous dites, vous êtes. Tous les autres font « -ez ». Ce sont les plus employés de la langue : un mot très fréquent s'use, mais il ne se range pas.",
  },
  methode: [
    {
      titre: "J'écris les six personnes",
      texte: "Le morceau qui revient à chaque ligne, c'est le radical. Ce qui change, c'est la terminaison.",
      schema: tableauRanger,
    },
    {
      titre: "Je cherche la marque de temps",
      texte: "Un « r » ? c'est le futur. Un « -ai- » ou « -i- » ? c'est l'imparfait. Rien ? c'est le présent.",
      schema: trainFutur,
    },
    {
      titre: "Je lis la marque de personne",
      texte: "Elle ferme le mot : -s pour tu, -ons pour nous, -ez pour vous, -ent pour ils.",
      schema: trainImparfait,
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Les deux marques d'une terminaison",
      donnees: "« nous chantions »",
      schema: trainReference,
      question: "Quelle est la marque de TEMPS, et quelle est la marque de PERSONNE ?",
      solution:
        "La marque de temps est « -i- » : c'est elle qui fait l'imparfait. La marque de personne est « -ons » : c'est elle qui va avec « nous ». Et le radical est « chant- », celui de « chanter ». Sans le « -i- », on aurait « nous chantons », au présent.",
    },
    {
      titre: "Le « r » du futur",
      donnees: "« je chanterai »",
      schema: trainFutur,
      question: "Quelle lettre annonce le futur ?",
      solution:
        "Le « r ». Je chanteRAI, tu finiRAS, il viendRA : le futur porte toujours un « r » avant la marque de personne, dans tous les verbes. Le « a » final, lui, n'est pas la marque du temps — c'est celle de la personne.",
    },
    {
      titre: "Un radical qui change",
      donnees: "« Je ___ à la fête, nous ___ ensemble. » (venir, au présent)",
      schema: tableauVenir,
      question: "Pourquoi les deux formes n'ont-elles pas le même radical ?",
      solution:
        "« je viens » et « nous venons » : le même verbe, deux radicaux. Ce n'est pas une faute d'orthographe comme au 1er groupe — c'est le verbe qui change de forme.",
    },
    {
      titre: "Le défi",
      donnees: "« je peux » puis « nous ___ ». (pouvoir, au présent)",
      schema: trainDefi,
      question: "Quelle forme, et comment la retrouver ?",
      solution:
        "« nous pouvons ». « Pouvoir » a même trois radicaux au présent : peu-, pouv-, peuv-. Le réflexe reste le même : écrire les six personnes et regarder où la coupure se déplace.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Dans « nous chantions », quelle est la marque de TEMPS de l'imparfait ?",
      correction:
        "« -i- ». La terminaison se lit en deux morceaux : « -i- » pour le temps, « -ons » pour la personne. Le radical, lui, est « chant- ».",
    },
    {
      question: "Quelle lettre annonce le futur dans « je chanterai » ?",
      correction:
        "Le « r ». C'est la marque du futur dans tous les verbes ; le « ai » final est la marque de la personne « je ».",
    },
    {
      question: "Dans « je finissais », quel est le radical ?",
      correction:
        "« finiss- ». C'est le morceau qui ne bouge pas d'une personne à l'autre. Ni « fin- », ni « je », ni « -ais ».",
    },
    {
      question: "« Nous ___ un dessin. » (commencer, au présent)",
      correction:
        "« commençons ». La cédille garde le son « s » devant le « o » ; sans elle on lirait « commenkons ». Mais « vous commencez » n'en prend pas : devant un « e », le « c » se dit déjà « s ».",
    },
    {
      question: "« Il ___ son cartable, nous ___ nos cartables. » (prendre, au présent)",
      correction:
        "« il prend » et « nous prenons ». Le radical « pren- » ne bouge pas ; c'est la terminaison qui change — et elle double le « n » à la 3e du pluriel : « ils prennent ».",
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesConjugaisonFormesCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La forme du verbe - CM2",
    section: {
      type: "objectif",
      phrase: "Démonter un verbe au lieu de le réciter",
      sousPhrase:
        "Radical, marque de temps, marque de personne : trois morceaux, et toute conjugaison se lit.",
      encadre: {
        titre: "L'idée",
        texte: "Un verbe conjugué n'est pas un mot : c'est un mot assemblé.",
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
          "Devant « ils accoururent » ou « nous parviendrons », personne n'a appris la forme par cœur : on la comprend en repérant le radical et les marques. C'est ce qui permet d'ouvrir un roman sans s'arrêter au premier verbe inconnu.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Trois verbes seulement font « -tes » avec « vous » : vous faites, vous dites, vous êtes. Ce sont les plus anciens et les plus employés — un mot très fréquent s'use, mais il ne se range pas. Les verbes rares, eux, finissent par imiter les autres.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheConjugaisonFormesCm2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Une terminaison dit deux choses",
    badge: "Marques",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on croit",
        contenu:
          "« tu chantais » : la terminaison est « -ais », et c'est celle de l'imparfait. Un seul bloc à retenir.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qu'on lit",
        contenu:
          "« -ai- » est la marque du temps, « -s » celle de la personne. Deux marques dans trois lettres.",
      },
    },
  },
  {
    titre: "Deux façons de changer de radical",
    badge: "1er et 3e groupes",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au 1er groupe : l'orthographe",
        contenu:
          "« nous rangeons », « nous commençons ». Le radical s'écrit autrement pour garder le même SON — sans eux on lirait « ranguons » et « commenkons ».",
      },
      droite: {
        variante: "ok",
        titre: "Au 3e groupe : le radical",
        contenu:
          "« je viens » mais « nous venons ». Ce n'est pas une question de son : le verbe possède deux radicaux, et il faut connaître les deux.",
      },
    },
  },
  {
    titre: "Trouver le radical",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« je finissais »",
      question: "Quel est le radical ?",
      correction:
        "« finiss- » : le morceau qui ne bouge pas d'une personne à l'autre — je finissais, tu finissais, nous finissions. Ni « fin- », ni « je ».",
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
      enonce: "« je peux » puis « nous ___ ». (pouvoir, au présent)",
      question: "Quelle forme, et comment la retrouver ?",
      indice: "Écris les six personnes. Où la coupure se déplace-t-elle ?",
      correction:
        "« nous pouvons ». « pouvoir » a trois radicaux au présent : peu-, pouv-, peuv-. Le réflexe reste le même : poser les six lignes.",
    },
  },
];
