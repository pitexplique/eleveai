// ─── Fiche de cours : les chaines d'accord et le passif (4e) ──────────────────
// LA HUITIÈME FICHE DE FRANÇAIS DE LA 4e. Elle referme l'orthographe
// grammaticale, ouverte par `francais-4e-orthographe-participe.tsx`.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020, objectif « Connaître le
// fonctionnement des chaînes d'accord ». Le texte nomme lui-même ses cas :
// groupe nominal complexe, accord sujet-verbe dans les cas complexes, et
// construction du passif.
//
// ⭐ CE QUE L'ARC NOIR FAIT ICI, ET QU'IL NE FAISAIT PAS AILLEURS : il part du
// mot qui COMMANDE et arrive au mot qui S'ACCORDE. Quand deux noms coordonnés
// commandent un seul adjectif, DEUX arcs convergent sur lui — et la chaine
// d'accord cesse d'être une métaphore, elle se voit. C'est le seul dessin de
// toute la fiche, décliné neuf fois, et c'est voulu : une seule image à
// reconnaitre pour une notion qui n'en demande qu'une.
//
// ⛔ LA FICHE NE REFAIT PAS LE PARTICIPE PASSÉ. « Le toit a été emporté » est un
// passif, et son participe s'accorde avec le sujet — mais la règle complète des
// accords du participe vit dans sa propre fiche. Ici, le passif est traité comme
// une TRANSFORMATION de phrase, ce qu'il est dans le programme.
//
// Alignée sur les tables GN_COMPLEXE, SUJET_VERBE et PASSIF de
// lib/tutor-v4/questionBank/4e/francais/orthographe-grammaticale.bank.ts, et sur
// la table ACCORDS de socle-grammaire-conjugaison.bank.ts.
//
// Micro-compétences couvertes (les 3 de la notion `orthographe_accords`) :
// - 4e_orth_chaine_gn_complexe   → figure, propriétés 1 à 3, méthode 1,
//                                  exemples 1 et 2
// - 4e_orth_sujet_verbe_complexe → propriétés 4 à 6, formule, méthodes 2 et 3,
//                                  exemples 3 à 5
// - 4e_orth_passif               → propriété 7, méthode 4, exemples 6 et 7
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin ; la couleur
// vient du `label` du groupe ; et le rendu se regarde, il ne se déduit pas du
// script (deux défauts trouvés ainsi le 26/08).

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

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Les chaines, dessinées ───────────────────────────────────────────────────
// ⚠️ L'arc noir va du mot qui COMMANDE vers le mot qui S'ACCORDE. Deux arcs qui
// convergent = deux mots qui commandent ensemble. C'est toute la fiche.

// ── LA FIGURE DE RÉFÉRENCE : deux noms, un adjectif, deux arcs.
const chaineDeuxNoms = phrase({
  mots: [
    { texte: "une" },
    { texte: "robe", focus: true },
    { texte: "et" },
    { texte: "un" },
    { texte: "chapeau", focus: true },
    { texte: "blancs", focus: true },
  ],
  groupes: [{ mots: [0, 4], label: "sujet" }],
  liens: [
    { de: 1, vers: 5, label: "commande", type: "accord" },
    { de: 4, vers: 5, label: "commande", type: "accord" },
  ],
  legende: "Deux noms commandent le même adjectif : il passe au pluriel.",
});

const chaineGenresDifferents = phrase({
  mots: [
    { texte: "la" },
    { texte: "maison", focus: true },
    { texte: "et" },
    { texte: "le" },
    { texte: "jardin", focus: true },
    { texte: "abandonnés", focus: true },
  ],
  liens: [
    { de: 1, vers: 5, label: "féminin", type: "accord" },
    { de: 4, vers: 5, label: "masculin", type: "accord" },
  ],
  legende: "Un féminin et un masculin : le masculin l'emporte au pluriel.",
});

const chaineMemeGenre = phrase({
  mots: [
    { texte: "une" },
    { texte: "chaleur", focus: true },
    { texte: "et" },
    { texte: "une" },
    { texte: "humidité", focus: true },
    { texte: "étouffantes", focus: true },
  ],
  liens: [
    { de: 1, vers: 5, label: "féminin", type: "accord" },
    { de: 4, vers: 5, label: "féminin", type: "accord" },
  ],
  legende: "Deux féminins : l'adjectif reste au féminin, mais passe au pluriel.",
});

// ── LE POSSESSIF SUIT LE POSSESSEUR, pas l'objet possédé.
const possessifChaque = phrase({
  mots: [
    { texte: "Chaque" },
    { texte: "élève", focus: true },
    { texte: "a" },
    { texte: "rendu" },
    { texte: "sa", focus: true },
    { texte: "copie" },
    { texte: "." },
  ],
  liens: [{ de: 1, vers: 4, label: "un seul", type: "accord" }],
  legende: "« Chaque élève » est singulier : chacun n'a qu'une copie.",
});

const possessifLeurs = phrase({
  mots: [
    { texte: "Les" },
    { texte: "élèves", focus: true },
    { texte: "ont" },
    { texte: "rangé" },
    { texte: "leurs", focus: true },
    { texte: "affaires" },
    { texte: "." },
  ],
  liens: [{ de: 1, vers: 4, label: "plusieurs", type: "accord" }],
  legende: "Plusieurs élèves, et chacun plusieurs affaires : « leurs ».",
});

// ── LE SUJET ÉLOIGNÉ : l'oreille entend le mauvais mot.
const sujetEcran = phrase({
  mots: [
    { texte: "Le" },
    { texte: "bruit", focus: true },
    { texte: "des" },
    { texte: "vagues" },
    { texte: "berçait", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 3], label: "complément du nom" },
  ],
  liens: [{ de: 1, vers: 4, label: "commande", type: "accord" }],
  legende: "C'est LE BRUIT qui berçait, pas les vagues. Un seul bruit.",
});

const sujetListe = phrase({
  mots: [
    { texte: "La" },
    { texte: "liste", focus: true },
    { texte: "des" },
    { texte: "fournitures" },
    { texte: "est", focus: true },
    { texte: "affichée" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 1], label: "sujet" }],
  liens: [{ de: 1, vers: 4, label: "commande", type: "accord" }],
  legende: "Le noyau du sujet est « la liste » : tout le reste est un écran.",
});

// ── LES SUJETS QUI SE MÉLANGENT : deux pronoms de personnes différentes.
const sujetToiEtMoi = phrase({
  mots: [
    { texte: "Toi", focus: true },
    { texte: "et" },
    { texte: "moi", focus: true },
    { texte: "avons", focus: true },
    { texte: "raison" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 2], label: "sujet" }],
  liens: [{ de: 2, vers: 3, label: "= nous", type: "accord" }],
  legende: "« Toi et moi » se remplace par NOUS : première personne du pluriel.",
});

const sujetToiEtLui = phrase({
  mots: [
    { texte: "Toi", focus: true },
    { texte: "et" },
    { texte: "lui", focus: true },
    { texte: "devez", focus: true },
    { texte: "recommencer" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 2], label: "sujet" }],
  liens: [{ de: 0, vers: 3, label: "= vous", type: "accord" }],
  legende: "« Toi et lui » se remplace par VOUS : deuxième personne du pluriel.",
});

const sujetCestMoiQui = phrase({
  mots: [
    { texte: "C'est" },
    { texte: "moi", focus: true },
    { texte: "qui", focus: true },
    { texte: "ai", focus: true },
    { texte: "ouvert" },
    { texte: "." },
  ],
  liens: [
    { de: 2, vers: 1, label: "reprend", type: "reprise" },
    { de: 1, vers: 3, label: "1re pers.", type: "accord" },
  ],
  legende: "« Qui » reprend « moi » : le verbe se met à la première personne.",
});

// ── LES COLLECTIFS ET LES QUANTIFIANTS.
const collectifFoule = phrase({
  mots: [
    { texte: "La" },
    { texte: "foule", focus: true },
    { texte: "des" },
    { texte: "spectateurs" },
    { texte: "criait", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 1], label: "sujet" }],
  liens: [{ de: 1, vers: 4, label: "singulier", type: "accord" }],
  legende: "« La foule » est un collectif singulier : c'est lui qui commande.",
});

const quantifiantPlupart = phrase({
  mots: [
    { texte: "La" },
    { texte: "plupart" },
    { texte: "des" },
    { texte: "élèves", focus: true },
    { texte: "ont", focus: true },
    { texte: "compris" },
    { texte: "." },
  ],
  liens: [{ de: 3, vers: 4, label: "pluriel", type: "accord" }],
  legende: "Après « la plupart de », c'est le NOM au pluriel qui commande.",
});

const ainsiQue = phrase({
  mots: [
    { texte: "Le" },
    { texte: "professeur", focus: true },
    { texte: "," },
    { texte: "ainsi" },
    { texte: "que" },
    { texte: "les" },
    { texte: "élèves" },
    { texte: "," },
    { texte: "est", focus: true },
    { texte: "satisfait" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 1], label: "sujet" }],
  liens: [{ de: 1, vers: 8, label: "seul sujet", type: "accord" }],
  legende: "« Ainsi que » n'ajoute pas un sujet : il compare. Verbe au singulier.",
});

// ── LE PASSIF : la même scène, retournée.
const actifDepart = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent", focus: true },
    { texte: "a" },
    { texte: "emporté" },
    { texte: "le" },
    { texte: "toit", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [4, 5], label: "objet" },
  ],
  legende: "À l'actif : le vent fait l'action, le toit la subit.",
});

const passifArrivee = phrase({
  mots: [
    { texte: "Le" },
    { texte: "toit", focus: true },
    { texte: "a" },
    { texte: "été" },
    { texte: "emporté", focus: true },
    { texte: "par" },
    { texte: "le" },
    { texte: "vent" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [5, 7], label: "complément d'agent" },
  ],
  liens: [{ de: 1, vers: 4, label: "commande", type: "accord" }],
  legende: "Au passif : l'objet devient sujet, et il commande le participe.",
});

const passifAgentEfface = phrase({
  mots: [
    { texte: "Les" },
    { texte: "portes", focus: true },
    { texte: "ont" },
    { texte: "été" },
    { texte: "repeintes", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 1], label: "sujet" }],
  liens: [{ de: 1, vers: 4, label: "commande", type: "accord" }],
  legende: "L'agent a disparu : on ne sait plus QUI a repeint. C'est un choix.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOrthographeAccords4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "orthographe-accords",
  titre: "Les chaines d'accord et le passif en 4e (2026-2027)",
  accroche:
    "« Le bruit des vagues berçait la nuit. » L'oreille réclame « berçaient » — elle vient d'entendre « vagues », et c'est le dernier mot qui reste. Mais ce ne sont pas les vagues qui berçaient : c'est le bruit, et il n'y en a qu'un. Presque toutes les fautes d'accord viennent de là : le cerveau accorde avec le mot le plus proche, et le mot le plus proche n'est presque jamais le bon.",
  identite: [
    { label: "Mots clés", valeur: "Chaine d'accord, noyau, sujet éloigné, collectif, passif" },
    { label: "Le secret", valeur: "Trouver le NOYAU, pas le mot le plus proche" },
    { label: "Outil", valeur: "Barrer ce qui s'intercale, puis relire" },
  ],
  definition: {
    texte:
      "Accorder, c'est faire passer une information d'un mot à un autre : un mot COMMANDE, un ou plusieurs mots OBÉISSENT. L'ensemble forme une CHAINE. Dans le groupe nominal, le nom noyau commande ses déterminants et ses adjectifs ; quand deux noms sont coordonnés, ils commandent ensemble, et l'adjectif passe au pluriel — au masculin si les deux genres se rencontrent. Dans la phrase, le sujet commande le verbe, même quand un complément s'intercale, même quand il est inversé, même quand il a l'air pluriel sans l'être. Et le PASSIF retourne la phrase : ce qui était objet devient sujet, ce qui était sujet devient complément d'agent — ou disparait.",
  },
  figure: {
    schema: pile(chaineDeuxNoms, chaineGenresDifferents),
    legende:
      "L'arc noir part du mot qui commande et arrive au mot qui obéit. Ici, DEUX arcs convergent sur le même adjectif : deux noms le commandent ensemble, donc il passe au pluriel. En bas, un féminin et un masculin se rencontrent — et c'est le masculin qui l'emporte. La chaine d'accord n'est pas une image : elle se dessine.",
  },
  proprietes: [
    {
      titre: "Deux noms coordonnés commandent ensemble",
      texte:
        "« Une robe et un chapeau blancs » : l'adjectif porte sur les deux, donc il se met au pluriel. Il ne s'accorde pas avec le plus proche.",
      schema: chaineDeuxNoms,
      micros: ["4e_orth_chaine_gn_complexe"],
    },
    {
      titre: "Quand les genres se rencontrent, le masculin l'emporte",
      texte:
        "« La maison et le jardin abandonnés » : un féminin, un masculin, et l'adjectif se met au masculin pluriel. C'est une règle de forme, pas de sens.",
      schema: pile(chaineGenresDifferents, chaineMemeGenre),
      micros: ["4e_orth_chaine_gn_complexe"],
    },
    {
      titre: "Le possessif suit le possesseur",
      texte:
        "« Chaque élève a rendu SA copie » : un seul élève à la fois. « Les élèves ont rangé LEURS affaires » : plusieurs élèves, plusieurs affaires.",
      schema: pile(possessifChaque, possessifLeurs),
      micros: ["4e_orth_chaine_gn_complexe"],
    },
    {
      titre: "Le noyau du sujet, jamais le mot le plus proche",
      texte:
        "« Le bruit des vagues berçait » : le noyau est « le bruit ». Tout ce qui suit le complète, et ne commande rien.",
      schema: pile(sujetEcran, sujetListe),
      micros: ["4e_orth_sujet_verbe_complexe"],
    },
    {
      titre: "Deux pronoms de personnes différentes se remplacent",
      texte:
        "« Toi et moi » = nous. « Toi et lui » = vous. On remplace, et l'accord devient évident. Et « c'est moi qui » demande la première personne.",
      schema: pile(sujetToiEtMoi, sujetToiEtLui, sujetCestMoiQui),
      micros: ["4e_orth_sujet_verbe_complexe"],
    },
    {
      titre: "Collectifs et quantifiants ne se comportent pas pareil",
      texte:
        "« La foule des spectateurs criait » : singulier, le noyau est « la foule ». « La plupart des élèves ont compris » : pluriel, c'est le nom qui commande. Et « ainsi que » n'ajoute jamais un sujet.",
      schema: pile(collectifFoule, quantifiantPlupart, ainsiQue),
      micros: ["4e_orth_sujet_verbe_complexe"],
    },
    {
      titre: "Le passif retourne la phrase",
      texte:
        "L'objet devient sujet, le sujet devient complément d'agent, et le participe s'accorde avec le nouveau sujet. L'agent peut même disparaitre.",
      schema: pile(actifDepart, passifArrivee, passifAgentEfface),
      micros: ["4e_orth_passif"],
    },
  ],
  reel: {
    texte:
      "L'effacement de l'agent est l'outil le plus discret du langage administratif, et il se voit partout une fois qu'on le connait. « Une erreur a été commise » : par qui ? La phrase ne le dit pas, et ce n'est pas un oubli. « Des mesures ont été prises », « votre dossier a été égaré », « la décision a été validée » : à chaque fois, le passif permet de dire ce qui s'est passé sans nommer celui qui l'a fait. Repérer un passif sans agent, c'est repérer une responsabilité qu'on ne veut pas écrire. Ce n'est pas toujours malhonnête — parfois on ignore vraiment qui —, mais cela mérite d'être remarqué.",
  },
  historique: {
    texte:
      "« Le masculin l'emporte sur le féminin » n'a pas toujours été la règle. Jusqu'au XVIIe siècle, le français pratiquait couramment l'accord DE PROXIMITÉ : l'adjectif s'accordait avec le nom le plus proche, et l'on écrivait sans hésiter « un homme et une femme belle ». Racine et Corneille l'emploient encore. C'est un grammairien, Claude Favre de Vaugelas, qui impose l'autre règle en 1647, et un autre, Bouhours, qui la justifie en 1675 par une phrase restée célèbre sur la supposée noblesse du genre masculin. Autrement dit : l'usage ancien accordait avec l'oreille, et c'est une décision d'académie qui l'a remplacé. La règle que tu apprends est la bonne aujourd'hui — mais elle a une date de naissance, et un auteur.",
  },
  formule: {
    contexte: "Le geste qui trouve le vrai sujet, quel que soit le piège.",
    expression: "je barre ce qui s'intercale, et je relis",
    legende:
      "Cache « des vagues » avec le doigt : il reste « le bruit berçait », et l'accord ne se discute plus. Le même geste vaut pour un participe — cache « construites au bord de la ravine », il reste « les cases résistaient » — et pour une relative entière. Ce qui reste des deux côtés du verbe est ce qui commande.",
    schema: sujetEcran,
  },
  methode: [
    {
      titre: "Dans le groupe nominal : compter les noms",
      texte:
        "Un seul nom ? L'adjectif s'accorde avec lui. Deux noms coordonnés ? Pluriel — et masculin si les genres diffèrent.",
      schema: pile(chaineDeuxNoms, chaineGenresDifferents),
      micros: ["4e_orth_chaine_gn_complexe"],
    },
    {
      titre: "Poser « qui est-ce qui ? » et prendre la réponse ENTIÈRE",
      texte:
        "Puis cherche le noyau de cette réponse : le nom principal, celui dont tout le reste dépend. C'est lui, et lui seul, qui commande.",
      schema: sujetListe,
      micros: ["4e_orth_sujet_verbe_complexe"],
    },
    {
      titre: "Remplacer les pronoms mélangés",
      texte:
        "« Toi et moi » → nous. « Toi et lui » → vous. « Lui et elle » → ils. Remplace avant de conjuguer : la faute devient impossible.",
      schema: pile(sujetToiEtMoi, sujetToiEtLui),
      micros: ["4e_orth_sujet_verbe_complexe"],
    },
    {
      titre: "Pour passer au passif : échanger les places",
      texte:
        "L'objet monte en tête et devient sujet. Le verbe prend « être » au même temps. L'ancien sujet passe derrière, précédé de « par » — ou disparait.",
      schema: pile(actifDepart, passifArrivee),
      micros: ["4e_orth_passif"],
    },
  ],
  usages: [
    {
      titre: "Pour se relire : chercher les écrans",
      detail:
        "Un « de » entre le sujet et le verbe, une relative, un participe : c'est là que la faute se glisse. Barre, relis, décide.",
      schema: sujetEcran,
      micros: ["4e_orth_sujet_verbe_complexe"],
    },
    {
      titre: "Pour lire un texte officiel : chercher l'agent",
      detail:
        "« Une erreur a été commise » — par qui ? Le passif sans agent efface le responsable. Le repérer, c'est lire ce qui n'est pas écrit.",
      schema: passifAgentEfface,
      micros: ["4e_orth_passif"],
    },
    {
      titre: "Pour écrire : le passif met en avant ce qui subit",
      detail:
        "« Le toit a été emporté » place le toit au centre. Ce n'est pas une tournure à éviter : c'est un choix de mise en scène.",
      schema: passifArrivee,
      micros: ["4e_orth_passif"],
    },
  ],
  exemples: [
    {
      titre: "Deux noms, un adjectif",
      donnees: "« une robe et un chapeau ___ » (blanc)",
      schema: chaineDeuxNoms,
      question: "Comment s'écrit l'adjectif ?",
      solution:
        "« Blancs ». L'adjectif porte sur les DEUX noms, donc il passe au pluriel. Et comme « chapeau » est masculin, le masculin l'emporte. ⛔ « blanc » accorderait avec le plus proche, et « blanches » oublierait le chapeau.",
      micros: ["4e_orth_chaine_gn_complexe"],
    },
    {
      titre: "Deux noms de même genre",
      donnees: "« une chaleur et une humidité ___ » (étouffant)",
      schema: chaineMemeGenre,
      question: "Comment s'écrit l'adjectif ?",
      solution:
        "« Étouffantes ». Les deux noms sont féminins : pas de masculin à faire l'emporter. Mais ils sont deux, donc le pluriel s'impose quand même. Le genre et le nombre se décident séparément.",
      micros: ["4e_orth_chaine_gn_complexe"],
    },
    {
      titre: "L'oreille se trompe de mot",
      donnees: "« Le bruit des vagues ___ toute la nuit. » (bercer, imparfait)",
      schema: sujetEcran,
      question: "Singulier ou pluriel ?",
      solution:
        "« Berçait ». Pose la question : qui est-ce qui berçait ? Le BRUIT — un seul. « Des vagues » complète le nom « bruit » et ne commande rien. Barre-le et relis : « le bruit berçait ». La faute vient de ce que l'oreille garde le dernier mot entendu.",
      micros: ["4e_orth_sujet_verbe_complexe"],
    },
    {
      titre: "Deux pronoms mélangés",
      donnees: "« Toi et moi ___ raison depuis le début. » (avoir, présent)",
      schema: sujetToiEtMoi,
      question: "Quelle forme du verbe ?",
      solution:
        "« Avons ». Remplace « toi et moi » par un seul pronom : c'est NOUS. Le verbe se met donc à la première personne du pluriel. Avec « toi et lui », on aurait « vous », donc « devez », « avez ».",
      micros: ["4e_orth_sujet_verbe_complexe"],
    },
    {
      titre: "Collectif ou quantifiant ?",
      donnees: "« La foule des spectateurs criait. » / « La plupart des élèves ont compris. »",
      schema: pile(collectifFoule, quantifiantPlupart),
      question: "Pourquoi l'un est-il au singulier et l'autre au pluriel ?",
      solution:
        "« La foule » est un COLLECTIF : c'est un nom ordinaire, singulier, et c'est lui le noyau. « La plupart de » est un QUANTIFIANT : il ne désigne rien tout seul, et c'est le nom qui suit — « les élèves » — qui commande. Même forme apparente, deux fonctionnements.",
      micros: ["4e_orth_sujet_verbe_complexe"],
    },
    {
      titre: "Passer au passif",
      donnees: "« Le vent a emporté le toit. »",
      schema: pile(actifDepart, passifArrivee),
      question: "Quelle est la phrase au passif ?",
      solution:
        "« Le toit a été emporté par le vent. » L'objet « le toit » monte en tête et devient sujet ; le verbe prend l'auxiliaire être au même temps — passé composé, donc « a été » ; l'ancien sujet passe derrière avec « par ». Et le participe « emporté » s'accorde maintenant avec « le toit », masculin singulier.",
      micros: ["4e_orth_passif"],
    },
    {
      titre: "Le passif qui cache quelqu'un",
      donnees: "« Une erreur a été commise. »",
      schema: passifAgentEfface,
      question: "Que manque-t-il à cette phrase, et est-ce un hasard ?",
      solution:
        "Le COMPLÉMENT D'AGENT : on ne sait pas qui a commis l'erreur. Le passif autorise cet effacement, et c'est pour cela qu'on le trouve partout dans les textes administratifs. Ce n'est pas forcément malhonnête — parfois on ignore vraiment qui —, mais la phrase active obligerait à le dire.",
      micros: ["4e_orth_passif"],
    },
  ],
  pieges: [
    "Accorder avec le mot le plus proche : « le bruit des vagues » commande « berçait », pas « berçaient ».",
    "Oublier qu'un adjectif après deux noms porte sur les deux : « une robe et un chapeau blancs ».",
    "Prendre un collectif pour un pluriel : « la foule des spectateurs criait », au singulier.",
    "Traiter « la plupart de » comme un collectif : là, c'est le nom qui suit qui commande, donc le pluriel.",
    "Croire que « ainsi que » ajoute un sujet : il compare, et le verbe reste au singulier.",
    "Oublier d'accorder le participe passif avec son nouveau sujet : « les portes ont été repeintes ».",
  ],
  aRetenir: [
    "Un mot COMMANDE, les autres OBÉISSENT : c'est une chaine, et elle se dessine.",
    "Deux noms coordonnés → adjectif au pluriel ; genres différents → masculin.",
    "Le verbe s'accorde avec le NOYAU du sujet, jamais avec le mot le plus proche.",
    "« Toi et moi » = nous · « Toi et lui » = vous : remplacer avant de conjuguer.",
    "Au passif, l'objet devient sujet et commande le participe — et l'agent peut disparaitre.",
  ],
  entrainement: [
    {
      question: "« des paysages et des villages ___ » (magnifique)",
      correction: "magnifiques — deux noms coordonnés, donc pluriel ; les deux sont masculins.",
      micros: ["4e_orth_chaine_gn_complexe"],
    },
    {
      question: "« Les deux sœurs ont pris ___ vélo, chacune le sien. »",
      correction: "leur — plusieurs possesseurs, mais un seul vélo chacune.",
      micros: ["4e_orth_chaine_gn_complexe"],
    },
    {
      question: "« Les cris des oiseaux ___ dès l'aube. » (cesser, imparfait)",
      correction: "cessaient — le noyau est « les cris », pluriel. Ici l'oreille tombe juste, mais par hasard.",
      micros: ["4e_orth_sujet_verbe_complexe"],
    },
    {
      question: "« C'est vous qui ___ trouvé la réponse. » (avoir)",
      correction: "avez — « qui » reprend « vous », donc deuxième personne du pluriel.",
      micros: ["4e_orth_sujet_verbe_complexe"],
    },
    {
      question: "« Ni lui ni elle ne ___ venus. » (être, présent)",
      correction: "sont — deux sujets, même reliés par « ni… ni », commandent le pluriel.",
      micros: ["4e_orth_sujet_verbe_complexe"],
    },
    {
      question: "« Les élèves ont repeint les portes. » Au passif ?",
      correction: "« Les portes ont été repeintes par les élèves. » Le participe s'accorde avec « les portes ».",
      micros: ["4e_orth_passif"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesOrthographeAccords4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Chaines d'accord - 4e",
    section: {
      type: "objectif",
      phrase: "Trouver le mot qui commande, pas celui qu'on vient d'entendre",
      sousPhrase:
        "Un mot commande, les autres obéissent. La difficulté n'est jamais la règle : c'est de repérer qui commande.",
      encadre: {
        titre: "L'idée",
        texte: "« Le bruit des vagues berçait. » Ce sont les vagues qu'on entend, c'est le bruit qui commande.",
      },
    },
  },
  {
    titre: "Deux noms commandent ensemble",
    badge: "Chaines d'accord - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Deux noms → pluriel", texte: "« une robe et un chapeau blancs » : l'adjectif porte sur les deux." },
        { titre: "Genres différents → masculin", texte: "« la maison et le jardin abandonnés »." },
        { titre: "Même genre → il reste", texte: "« une chaleur et une humidité étouffantes »." },
      ],
    },
    schema: pile(chaineDeuxNoms, chaineGenresDifferents),
  },
  {
    titre: "Le geste qui règle tout",
    badge: "Chaines d'accord - 4e",
    section: {
      type: "etapes",
      etapes: [
        "Je pose « qui est-ce qui ? » devant le verbe.",
        "Je prends la réponse ENTIÈRE.",
        "Je cherche son noyau : le nom principal.",
        "Je barre ce qui s'intercale, et je relis.",
      ],
    },
    schema: sujetEcran,
  },
  {
    titre: "Les pièges nommés par le programme",
    badge: "Chaines d'accord - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Toi et moi", texte: "= NOUS. « Toi et lui » = VOUS. On remplace avant de conjuguer." },
        { titre: "La foule des spectateurs", texte: "Collectif : singulier. Le noyau est « la foule »." },
        { titre: "La plupart des élèves", texte: "Quantifiant : pluriel. C'est le nom qui commande." },
        { titre: "Ainsi que", texte: "N'ajoute pas un sujet : il compare. Verbe au singulier." },
      ],
    },
    schema: pile(sujetToiEtMoi, collectifFoule, quantifiantPlupart),
  },
  {
    titre: "Le passif retourne la phrase",
    badge: "Chaines d'accord - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "Actif",
        contenu: "« Le vent a emporté le toit. » Le vent fait, le toit subit.",
      },
      droite: {
        titre: "Passif",
        contenu: "« Le toit a été emporté par le vent. » L'objet devient sujet et commande le participe.",
      },
    },
    schema: pile(actifDepart, passifArrivee),
  },
  {
    titre: "À vous",
    badge: "Chaines d'accord - 4e",
    section: {
      type: "exercice",
      enonce: "« Une erreur a été commise. »",
      question: "Que manque-t-il à cette phrase, et est-ce un hasard ?",
      indice: "Cherche qui a fait l'action.",
      correction:
        "Le complément d'agent. On ne sait pas qui a commis l'erreur — et le passif autorise précisément cet effacement. C'est pour cela qu'on le trouve partout dans les textes administratifs.",
    },
    schema: passifAgentEfface,
  },
];
