// ─── Fiche de cours : les compléments du verbe (CM2) ──────────────────────────
// DEUXIÈME DES QUATRE FICHES DE GRAMMAIRE DU CM2. Elle suit
// `francais-cm2-grammaire-phrase.tsx` : là-bas on a trouvé le verbe et son
// sujet, ici on regarde ce qui s'accroche au verbe. La suivante regardera ce
// qui s'accroche au nom, la dernière apprendra à tout accorder.
//
// Alignée sur lib/tutor-v4/knowledge/francais/cm2/microSkills.ts
// (notionId `grammaire_complements`) et sur les pools COMPLEMENTS, COD_COI,
// CC_SORTES, ATTRIBUT de buildCycle3FrancaisBank.ts.
//
// ⭐ POUR LE CRPE : la fiche ne demande jamais de reconnaître un complément « à
// l'œil ». Elle donne les trois manipulations que le concours attend — poser la
// question au verbe, déplacer, supprimer — et le dessin les MONTRE : le groupe
// part en fantôme à l'autre bout de la phrase, ou se barre en rouge. Un COD
// qu'on essaie de déplacer casse la phrase ; un CC, non. C'est cette différence
// de comportement qui définit les deux, pas leur place.
//
// Micro-compétences couvertes (les 5 de la notion, défi compris) :
// - cm2_gram_complements  → définition, figure, propriété « Deux familles »,
//                           méthode 2 et 3, exemple 1, entraînement 1
// - cm2_gram_cod_coi      → propriété « Direct ou indirect », formule,
//                           exemple 2, piège 2, entraînements 2 et 3
// - cm2_gram_cc_sortes    → propriété « Quand, où, pourquoi », usages (3),
//                           exemple 3, entraînement 4
// - cm2_gram_attribut     → propriété « L'attribut du sujet », exemple 4,
//                           piège 3, entraînement 5
// - cm2_gram_complements_defi → le défi, dessiné (exemple 5) + entraînement 6
//
// Les phrases sont CELLES DE LA BANQUE : « Léa mange une mangue », « Léa parle
// à sa grand-mère », « Hier, nous sommes allés au marché », « Il est rentré
// parce qu'il pleuvait », « Le lagon est calme », « Elle est devenue
// maitresse », « Le samedi, les enfants jouent sur la plage ».
//
// ⚠️ Contrôle avant commit : REGLES.md § 2 quater.

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

// ─── Les phrases de la banque, dessinées ──────────────────────────────────────

// La figure de référence : les deux familles de compléments sur une même
// phrase. L'un tient au verbe, l'autre est de passage.
const phraseReference = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "mange", focus: true },
    { texte: "une" },
    { texte: "mangue" },
    { texte: "ce" },
    { texte: "soir" },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe" },
    { mots: [2, 3], label: "COD" },
    { mots: [4, 5], label: "CC de temps" },
  ],
  legende: "L'un tient au verbe, l'autre est de passage.",
});

// COD : rien entre le verbe et lui.
const phraseCod = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "mange", focus: true },
    { texte: "une" },
    { texte: "mangue" },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe" },
    { mots: [2, 3], label: "COD" },
  ],
  liens: [{ de: 1, vers: 3, label: "quoi ?", type: "question" }],
  legende: "Rien entre le verbe et lui : direct.",
});

// COI : on y arrive par un petit mot.
const phraseCoi = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "parle", focus: true },
    { texte: "à", nature: "préposition" },
    { texte: "sa" },
    { texte: "grand-mère" },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe" },
    { mots: [2, 4], label: "COI" },
  ],
  liens: [{ de: 1, vers: 4, label: "à qui ?", type: "question" }],
  legende: "Une préposition s'est glissée : indirect.",
});

// LA MANIPULATION QUI TRANCHE, en deux dessins qui ne montrent pas la même
// chose : le CC se déplace (fantôme + flèche), le COD se barre et la phrase
// tombe.
const phraseCcDeplace = phrase({
  mots: ["Hier", ",", "nous", "partons", "."],
  groupes: [
    { mots: [0, 0], label: "CC de temps", deplacable: true },
    { mots: [2, 2], label: "sujet" },
    { mots: [3, 3], label: "verbe" },
  ],
  legende: "Je le déplace : la phrase tient debout.",
});

const phraseCodSupprime = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "mange" },
    { texte: "une", barre: true },
    { texte: "mangue", barre: true },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 3], label: "COD" }],
  legende: "Je le supprime : « Léa mange » perd son sens.",
});

// Les trois circonstances : trois phrases, trois questions différentes.
const phraseCcTemps = phrase({
  mots: ["Hier", ",", "nous", "sommes", "allés", "au", "marché", "."],
  groupes: [{ mots: [0, 0], label: "CC de temps" }],
  legende: "quand ?",
});

const phraseCcLieu = phrase({
  mots: ["Nous", "sommes", "allés", "au", "marché", "."],
  groupes: [{ mots: [3, 4], label: "CC de lieu" }],
  legende: "où ?",
});

const phraseCcCause = phrase({
  mots: ["Il", "rentre", "parce", "qu'", "il", "pleut", "."],
  groupes: [{ mots: [2, 5], label: "CC de cause" }],
  legende: "pourquoi ?",
});

// L'attribut : un « = » entre le sujet et lui, par-dessus le verbe d'état.
const phraseAttribut = phrase({
  mots: [
    { texte: "Le" },
    { texte: "lagon" },
    { texte: "est", focus: true },
    { texte: "calme" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 2], label: "verbe d'état" },
    { mots: [3, 3], label: "attribut du sujet" },
  ],
  liens: [{ de: 1, vers: 3, label: "=", type: "accord" }],
  legende: "L'attribut dit ce que le sujet EST.",
});

const phraseAttributDevenir = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "est" },
    { texte: "devenue", focus: true },
    { texte: "maitresse" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 2], label: "verbe d'état" },
    { mots: [3, 3], label: "attribut du sujet" },
  ],
  liens: [{ de: 0, vers: 3, label: "=", type: "accord" }],
  legende: "être, sembler, devenir, paraitre, rester.",
});

// LE DÉFI A SON PROPRE DESSIN : deux compléments circonstanciels dans la même
// phrase, et un COD qui n'y est pas — il faut compter, pas deviner.
const phraseDefi = phrase({
  mots: [
    { texte: "Le" },
    { texte: "samedi" },
    { texte: "," },
    { texte: "les" },
    { texte: "enfants" },
    { texte: "jouent", focus: true },
    { texte: "sur" },
    { texte: "la" },
    { texte: "plage" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "CC de temps" },
    { mots: [3, 4], label: "sujet" },
    { mots: [5, 5], label: "verbe" },
    { mots: [6, 8], label: "CC de lieu" },
  ],
  legende: "Deux circonstanciels, aucun complément d'objet.",
});

const pieges = [
  "Croire qu'un complément placé en tête de phrase est le sujet : « Le samedi, les enfants jouent » — le sujet est « les enfants ».",
  "Prendre « à » pour un simple mot de liaison : c'est la préposition qui rend le complément d'objet INDIRECT.",
  "Confondre l'attribut et le complément d'objet : « Le lagon est calme » ne dit pas ce que le lagon subit, mais ce qu'il EST.",
  "Déplacer un complément d'objet comme on déplace un circonstanciel : « Une mangue, Léa mange » ne se dit pas.",
];

const aRetenir = [
  "Complément d'objet DIRECT : le verbe, puis « qui ? » ou « quoi ? », sans préposition.",
  "Complément d'objet INDIRECT : on y arrive par une préposition — à, de.",
  "Le complément circonstanciel se déplace et se supprime ; le complément d'objet, non.",
];

export const ficheComplementsCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "grammaire-complements",
  titre: "Les compléments du verbe",
  accroche:
    "Autour du verbe, tous les groupes ne se valent pas : certains lui tiennent, d'autres sont de passage. Pour les distinguer, on ne regarde pas leur place — on les déplace, on les supprime, on pose une question.",
  identite: [
    { label: "Mots clés", valeur: "COD, COI, circonstanciel, attribut du sujet" },
    { label: "Le secret", valeur: "On pose la question au verbe" },
    { label: "Outil", valeur: "Déplacer, supprimer" },
  ],
  definition: {
    texte:
      "Un complément du verbe complète le verbe de la phrase. Il y a deux familles. Le complément d'objet répond à « qui ? », « quoi ? », « à qui ? », « de quoi ? » : il tient au verbe, on ne peut ni le déplacer ni le supprimer. Le complément circonstanciel dit quand, où ou pourquoi : il se déplace et il se supprime sans casser la phrase. À part, l'attribut du sujet dit ce que le sujet EST, après un verbe d'état.",
  },
  figure: {
    schema: phraseReference,
    legende:
      "« Léa mange une mangue ce soir. » Le complément d'objet en vert, le circonstanciel en orange : deux couleurs parce que ce sont deux comportements différents.",
  },
  proprietes: [
    {
      titre: "Deux familles",
      texte: "Le complément d'objet tient au verbe ; le circonstanciel se déplace et se supprime.",
      schema: pile(phraseCcDeplace, phraseCodSupprime),
    },
    {
      titre: "Direct ou indirect",
      texte: "Direct s'il suit le verbe sans préposition (quoi ?), indirect s'il passe par à ou de (à qui ?).",
      schema: pile(phraseCod, phraseCoi),
    },
    {
      titre: "Quand, où, pourquoi",
      texte: "Le circonstanciel répond à l'une de ces trois questions : temps, lieu, cause.",
      schema: phraseCcCause,
    },
    {
      titre: "L'attribut du sujet",
      texte: "Après être, sembler, devenir, paraitre ou rester, il dit ce que le sujet EST.",
      schema: pile(phraseAttribut, phraseAttributDevenir),
    },
  ],
  reel: {
    texte:
      "C'est ce qui décide du sens d'une phrase : « Léa parle à sa grand-mère » et « Léa parle de sa grand-mère » ne racontent pas la même chose, et seule la préposition les sépare. Savoir supprimer un circonstanciel, c'est aussi savoir résumer : on garde le verbe, son sujet et son objet, on laisse tomber le reste.",
  },
  historique: {
    texte:
      "« Complément » vient du latin complementum : ce qui achève, ce qui remplit. Les grammairiens latins disaient déjà qu'une phrase sans complément est une phrase inachevée — et le mot « objet » vient d'objectum, « ce qui est jeté devant » : ce que l'action rencontre.",
  },
  formule: {
    contexte: "La question se pose toujours APRÈS le verbe.",
    expression: "verbe + qui ? quoi ?  →  COD        verbe + à qui ? de quoi ?  →  COI",
    legende:
      "« Léa mange QUOI ? une mangue » : rien entre les deux, c'est direct. « Léa parle À QUI ? à sa grand-mère » : on y arrive par « à », c'est indirect.",
    schema: pile(phraseCod, phraseCoi),
  },
  methode: [
    {
      titre: "Je pose la question au verbe",
      texte: "« Quoi ? » ou « à qui ? » après le verbe : la réponse est le complément d'objet.",
      schema: phraseCod,
    },
    {
      titre: "J'essaie de le déplacer",
      texte: "S'il accepte de partir en tête ou en fin de phrase, c'est un circonstanciel.",
      schema: phraseCcDeplace,
    },
    {
      titre: "J'essaie de le supprimer",
      texte: "Si la phrase garde son sens sans lui, c'est un circonstanciel ; sinon, c'est un objet.",
      schema: phraseCodSupprime,
    },
  ],
  usages: [
    {
      titre: "Dire quand",
      detail: "Complément circonstanciel de temps : il répond à « quand ? ».",
      schema: phraseCcTemps,
    },
    {
      titre: "Dire où",
      detail: "Complément circonstanciel de lieu : il répond à « où ? ».",
      schema: phraseCcLieu,
    },
    {
      titre: "Dire pourquoi",
      detail: "Complément circonstanciel de cause : il répond à « pourquoi ? ».",
      schema: phraseCcCause,
    },
  ],
  exemples: [
    {
      titre: "Objet ou circonstanciel ?",
      donnees: "« Léa mange une mangue ce soir. »",
      schema: phraseReference,
      question: "Lequel des deux groupes peut disparaître ?",
      solution:
        "« ce soir » se déplace et se supprime : « Ce soir, Léa mange une mangue », « Léa mange une mangue ». C'est un circonstanciel. « une mangue » ne peut ni bouger ni partir : c'est le complément d'objet.",
    },
    {
      titre: "Direct ou indirect ?",
      donnees: "« Léa mange une mangue. » et « Léa parle à sa grand-mère. »",
      schema: pile(phraseCod, phraseCoi),
      question: "Quelle est la fonction du groupe qui suit le verbe ?",
      solution:
        "« une mangue » suit le verbe sans préposition (mange quoi ?) : complément d'objet direct. « à sa grand-mère » passe par « à » (parle à qui ?) : complément d'objet indirect.",
    },
    {
      titre: "Quelle circonstance ?",
      donnees: "« Il est rentré parce qu'il pleuvait. »",
      schema: phraseCcCause,
      question: "Que dit le groupe souligné ?",
      solution:
        "Il répond à « pourquoi ? » : c'est un complément circonstanciel de cause. Dans « Hier, nous sommes allés au marché », « Hier » répond à « quand ? » et « au marché » à « où ? ».",
    },
    {
      titre: "Attribut ou complément d'objet ?",
      donnees: "« Le lagon est calme. »",
      schema: phraseAttribut,
      question: "Quelle est la fonction de « calme » ?",
      solution:
        "« est » est un verbe d'état : « calme » dit ce que le lagon EST, c'est un attribut du sujet. On peut mettre un « = » entre les deux, ce qui est impossible avec un complément d'objet — « Léa = une mangue » ne veut rien dire.",
    },
    {
      titre: "Le défi",
      donnees: "« Le samedi, les enfants jouent sur la plage. »",
      schema: phraseDefi,
      question: "Combien de compléments circonstanciels ? Y a-t-il un complément d'objet ?",
      solution:
        "Deux circonstanciels : « Le samedi » (quand ?) et « sur la plage » (où ?). Aucun complément d'objet — on ne joue pas « quelque chose » ici. Les deux se suppriment : « Les enfants jouent » reste une phrase.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Léa mange une mangue. » Quelle est la fonction de « une mangue » ?",
      correction:
        "Complément d'objet direct : il suit le verbe sans préposition — mange QUOI ? une mangue.",
    },
    {
      question: "« Léa parle à sa grand-mère. » Direct ou indirect, et pourquoi ?",
      correction:
        "Indirect : la préposition « à » s'est glissée entre le verbe et son complément — parle À QUI ?",
    },
    {
      question: "Comment reconnait-on un complément d'objet direct ?",
      correction:
        "Il suit le verbe sans préposition, et on le trouve en demandant « qui ? » ou « quoi ? ». Il ne se déplace pas et ne se supprime pas.",
    },
    {
      question: "« Hier, nous sommes allés au marché. » De quelles circonstances parlent les deux groupes ?",
      correction:
        "« Hier » est un complément circonstanciel de temps (quand ?), « au marché » un complément circonstanciel de lieu (où ?).",
    },
    {
      question: "« Elle est devenue maitresse. » Quelle est la fonction de « maitresse » ?",
      correction:
        "Attribut du sujet : « devenir » est un verbe d'état, et le mot dit ce que le sujet EST.",
    },
    {
      question: "Défi : « Le samedi, les enfants jouent sur la plage. » Combien de compléments circonstanciels ?",
      correction:
        "Deux : « Le samedi » (temps) et « sur la plage » (lieu). Il n'y a pas de complément d'objet dans cette phrase.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesComplementsCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les compléments - CM2",
    section: {
      type: "objectif",
      phrase: "Distinguer ce qui tient au verbe de ce qui est de passage",
      sousPhrase:
        "On pose la question au verbe, puis on essaie de déplacer et de supprimer le groupe.",
      encadre: {
        titre: "L'idée",
        texte: "Ce n'est pas la place d'un groupe qui dit sa fonction, c'est son comportement.",
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
          "« Léa parle à sa grand-mère » et « Léa parle de sa grand-mère » ne racontent pas la même chose : seule la préposition les sépare.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Objet » vient du latin objectum, « ce qui est jeté devant » : ce que l'action rencontre sur son chemin.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheComplementsCm2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Direct ou indirect ?",
    badge: "Le complément d'objet",
    section: {
      type: "duo",
      gauche: {
        variante: "ok",
        titre: "Direct",
        contenu: "« Léa mange une mangue. » Mange QUOI ? Rien entre le verbe et son complément.",
      },
      droite: {
        variante: "info",
        titre: "Indirect",
        contenu: "« Léa parle à sa grand-mère. » Parle À QUI ? On y arrive par la préposition « à ».",
      },
    },
  },
  {
    titre: "Les 3 circonstances",
    badge: "3 usages",
    section: {
      type: "cartes",
      cartes: ficheComplementsCm2.usages.map((u) => ({ titre: u.titre, texte: u.detail })),
    },
  },
  {
    titre: "Attribut ou objet ?",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Le lagon est calme. »",
      question: "Quelle est la fonction de « calme » ?",
      correction:
        "« est » est un verbe d'état : « calme » dit ce que le lagon EST. C'est un attribut du sujet — on peut mettre un « = » entre les deux.",
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
      enonce: "« Le samedi, les enfants jouent sur la plage. »",
      question: "Combien de compléments circonstanciels, et y a-t-il un complément d'objet ?",
      indice: "Essaie de supprimer chaque groupe, puis de le déplacer.",
      correction:
        "Deux circonstanciels : « Le samedi » (quand ?) et « sur la plage » (où ?). Aucun complément d'objet : « Les enfants jouent » reste une phrase.",
    },
  },
];
