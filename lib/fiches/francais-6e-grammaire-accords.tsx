// ─── Fiche de cours : les accords et les homophones (6e) ──────────────────────
// CINQUIÈME FICHE DE FRANÇAIS DE LA 6e, et la dernière de la série « grammaire ».
// Les quatre précédentes apprenaient à NOMMER — ce que le verbe appelle, ce qui
// s'accroche au nom, ce qui remplace le nom, comment deux propositions se
// relient. Celle-ci en tire la conséquence : une fois qu'on sait qui est quoi,
// on sait quoi écrire à la fin des mots.
//
// ⭐ CE QUE LA 6e AJOUTE, ET QUI EST DANS LE VERBE DU BO. Le programme n'écrit
// pas « appliquer » : il écrit « Identifier le groupe sujet et RAISONNER sur
// l'accord sujet/verbe », et « MAÎTRISER la chaîne d'accords dans le groupe
// nominal, EN LIEN AVEC L'ANALYSE GRAMMATICALE ». Autrement dit : l'accord n'est
// pas une règle à réciter, c'est une conclusion qu'on tire d'une analyse. C'est
// pour cela que cette fiche vient après les quatre autres et s'y appuie
// explicitement.
//
// ⭐ ET UN OBJECTIF QUE LE CM2 N'A PAS TOUT À FAIT : « Accorder le participe
// passé avec le COD pour les verbes conjugués avec l'auxiliaire avoir (PRONOM
// PERSONNEL ANTÉPOSÉ) ». Le CM2 rencontre le cas ; la 6e le nomme et le limite —
// le COD placé AVANT, et un pronom. C'est la règle la plus coûteuse du cycle, et
// le canvas la rend visible : l'arc d'accord part du COD, qui est à gauche.
//
// Alignée sur lib/tutor-v4/knowledge/francais/6e/microSkills.ts
// (notionId `grammaire_accords`) et sur les moteurs paramétriques d'accord du
// groupe nominal et d'accord sujet-verbe, plus les pools PARTICIPE_PASSE et
// HOMOPHONES de buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 5 de la notion, défi compris) :
// - 6e_orth_accord_gn        → propriété « La chaîne du groupe nominal »,
//                              exemple 1, entraînement 1
// - 6e_orth_sujet_verbe      → définition, figure, propriété « Le sujet peut
//                              être loin », méthode 1, exemple 2, piège 1,
//                              entraînement 2
// - 6e_orth_participe_passe  → propriétés « Avec être » et « Avec avoir »,
//                              formule, méthodes 2 et 3, exemples 3 et 4,
//                              pièges 2 et 3, entraînements 3 et 4
// - 6e_orth_homophones       → propriété « Les homophones », usages,
//                              entraînement 5
// - 6e_orth_accords_defi     → le défi, dessiné (exemple 5)
//
// Les phrases sont CELLES DE LA BANQUE : « Les vagues sont hautes », « Les
// élèves de la classe sont attentifs », « Ma sœur est devenue institutrice »,
// « Elles sont venues hier », « Tom et Léo sont arrivés ensemble », « Elle a
// mangé une mangue », « La mangue qu'elle a mangée », « Nous avons ramassé des
// letchis », « Il a pris son cartable ».
//
// ⚠️ Contrôle passé avant commit : REGLES.md § 2 quater — dessins rendus hors du
// site en 250 / 340 / 400 px, aucun texte sous 11 px une fois à l'échelle.
// ⚠️ Deux arcs d'accord au maximum par dessin : au-delà, ils se chevauchent et
// leurs étiquettes se disputent les mêmes pixels (constaté au rendu).

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

// Le helper commun à toutes les fiches de français. `largeurMax: 250` est le
// défaut du composant, écrit ici pour qu'on n'ait pas à aller le chercher.
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
        largeurMax: 250,
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

// ─── Les phrases de la banque, dessinées ──────────────────────────────────────

// LA FIGURE DE RÉFÉRENCE : deux chaînes d'accord dans une phrase de trois mots.
// Le nom commande à gauche, le sujet commande à droite — et l'on voit que le
// même mot, « vagues », est au départ des deux.
const phraseReference = phrase({
  mots: [
    { texte: "Les" },
    { texte: "vagues", focus: true },
    { texte: "sont" },
    { texte: "hautes" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [3, 3], label: "attribut du sujet" },
  ],
  liens: [
    { de: 1, vers: 0, label: "pluriel", type: "accord" },
    { de: 1, vers: 3, label: "pluriel", type: "accord" },
  ],
  legende: "« vagues » commande deux fois : le déterminant et l'attribut.",
});

// LA CHAÎNE DU GROUPE NOMINAL, isolée.
const phraseChaineGn = phrase({
  mots: [
    { texte: "des", nature: "dét." },
    { texte: "histoires", nature: "nom", focus: true },
    { texte: "merveilleuses", nature: "adj." },
  ],
  liens: [
    { de: 1, vers: 0, label: "fém. plur.", type: "accord" },
    { de: 1, vers: 2, label: "fém. plur.", type: "accord" },
  ],
  legende: "Le nom donne son genre et son nombre à tout le groupe.",
});

// LE SUJET ÉLOIGNÉ : le groupe qui s'intercale est barré, pour montrer que ce
// n'est pas lui qui commande.
const phraseSujetEloigne = phrase({
  mots: [
    { texte: "Les" },
    { texte: "élèves", focus: true },
    { texte: "de", barre: true },
    { texte: "la", barre: true },
    { texte: "classe", barre: true },
    { texte: "sont" },
    { texte: "attentifs" },
  ],
  groupes: [{ mots: [0, 4], label: "sujet" }],
  liens: [{ de: 1, vers: 5, label: "pluriel", type: "accord" }],
  legende: "On barre le complément du nom : c'est « élèves » qui commande.",
});

// L'ATTRIBUT S'ACCORDE AUSSI — le pont avec la fiche des compléments du verbe.
const phraseAttribut = phrase({
  mots: [
    { texte: "Ma" },
    { texte: "sœur", focus: true },
    { texte: "est" },
    { texte: "devenue" },
    { texte: "institutrice" },
    { texte: "." },
  ],
  groupes: [{ mots: [4, 4], label: "attribut du sujet" }],
  liens: [{ de: 1, vers: 4, label: "féminin", type: "accord" }],
  legende: "Après un verbe d'état, l'attribut prend le genre du sujet.",
});

// PARTICIPE PASSÉ AVEC ÊTRE : l'accord part du sujet, à gauche.
const phraseEtre = phrase({
  mots: [
    { texte: "Elles", focus: true },
    { texte: "sont" },
    { texte: "venues" },
    { texte: "hier" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 0], label: "sujet" }],
  liens: [{ de: 0, vers: 2, label: "fém. plur.", type: "accord" }],
  legende: "Avec être, le participe s'accorde avec le sujet.",
});

const phraseEtreDeuxSujets = phrase({
  mots: [
    { texte: "Tom" },
    { texte: "et" },
    { texte: "Léo" },
    { texte: "sont" },
    { texte: "arrivés" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 2], label: "sujet" }],
  liens: [{ de: 2, vers: 4, label: "pluriel", type: "accord" }],
  legende: "Deux noms coordonnés font un sujet pluriel.",
});

// PARTICIPE PASSÉ AVEC AVOIR : le cas où l'on N'ACCORDE PAS. Le COD est à
// DROITE — c'est ce que le dessin doit faire voir, par contraste avec le suivant.
const phraseAvoirSansAccord = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "a" },
    { texte: "mangé", focus: true },
    { texte: "une" },
    { texte: "mangue" },
    { texte: "." },
  ],
  groupes: [{ mots: [3, 4], label: "COD" }],
  legende: "Le COD est APRÈS le participe : on n'accorde pas.",
});

// … ET LE CAS OÙ L'ON ACCORDE : le même COD, passé devant, repris par un
// pronom. L'arc part de la gauche : la direction dit la règle.
const phraseAvoirAccord = phrase({
  mots: [
    { texte: "La" },
    { texte: "mangue", focus: true },
    { texte: "qu'" },
    { texte: "elle" },
    { texte: "a" },
    { texte: "mangée" },
  ],
  groupes: [{ mots: [0, 1], label: "COD" }],
  liens: [{ de: 1, vers: 5, label: "féminin", type: "accord" }],
  legende: "Le COD est AVANT, repris par « qu' » : on accorde.",
});

const phraseAvoirLetchis = phrase({
  mots: [
    { texte: "Nous" },
    { texte: "avons" },
    { texte: "ramassé", focus: true },
    { texte: "des" },
    { texte: "letchis" },
    { texte: "." },
  ],
  groupes: [{ mots: [3, 4], label: "COD" }],
  legende: "« des letchis » est après : « ramassé » ne bouge pas.",
});

// LES HOMOPHONES : le test de remplacement, montré sur la phrase.
const phraseHomophoneEst = phrase({
  mots: [
    { texte: "Il" },
    { texte: "est", focus: true },
    { texte: "parti" },
    { texte: "sans" },
    { texte: "son" },
    { texte: "carnet" },
    { texte: "." },
  ],
  legende: "« est » se remplace par « était » ; « son » par « le sien ».",
});

const phraseHomophoneOnt = phrase({
  mots: [
    { texte: "Ils" },
    { texte: "ont", focus: true },
    { texte: "trouvé" },
    { texte: "leur" },
    { texte: "chemin" },
    { texte: "." },
  ],
  legende: "« ont » se remplace par « avaient ». Sinon, c'est « on ».",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). Trois chaînes d'accord dans une
// phrase, dont un sujet éloigné.
const phraseDefi = phrase({
  mots: [
    { texte: "Les" },
    { texte: "vagues", focus: true },
    { texte: "du", barre: true },
    { texte: "lagon", barre: true },
    { texte: "sont" },
    { texte: "montées" },
  ],
  groupes: [{ mots: [0, 3], label: "sujet" }],
  liens: [
    { de: 1, vers: 0, label: "pluriel", type: "accord" },
    { de: 1, vers: 5, label: "fém. plur.", type: "accord" },
  ],
  legende: "« lagon » est barré : ce n'est pas lui qui commande.",
});

const pieges = [
  "Accorder le verbe avec le mot le plus proche : dans « Les élèves de la classe sont attentifs », c'est « élèves » qui commande, pas « classe ». On barre le complément du nom pour le voir.",
  "Accorder le participe passé avec avoir quand le COD est APRÈS : « Elle a mangé une mangue » ne prend rien. On n'accorde que si le COD est placé avant.",
  "Oublier d'accorder quand le COD est un pronom placé avant : « La mangue qu'elle a mangée » prend un « e », parce que « qu' » reprend « la mangue », qui est devant.",
  "Écrire un homophone au jugé : chacun a son test de remplacement. « est » se remplace par « était », « ont » par « avaient », « à » ne se remplace par rien du tout.",
];

const aRetenir = [
  "Dans le groupe nominal, c'est le nom noyau qui donne son genre et son nombre au déterminant et à l'adjectif.",
  "Le verbe s'accorde avec le NOYAU du groupe sujet, même quand un complément du nom s'intercale.",
  "Le participe passé s'accorde avec le sujet quand l'auxiliaire est être ; avec l'auxiliaire avoir, seulement si le COD est placé avant.",
];

export const ficheAccords6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "grammaire-accords",
  titre: "Les accords et les homophones",
  accroche:
    "« Les élèves de la classe sont attentifs. » Le mot juste avant le verbe est « classe », au singulier — et pourtant on écrit « sont ». L'accord ne se devine pas à l'oreille : il se raisonne.",
  identite: [
    { label: "Mots clés", valeur: "Chaîne d'accords, groupe sujet, participe passé, homophones" },
    { label: "Le secret", valeur: "Trouver qui commande, pas ce qui est le plus près" },
    { label: "Outil", valeur: "Barrer ce qui s'intercale, remplacer l'homophone" },
  ],
  definition: {
    texte:
      "Accorder, c'est faire porter à un mot les marques d'un autre. Dans le groupe nominal, c'est le nom noyau qui commande : le déterminant et l'adjectif prennent son genre et son nombre. Entre le sujet et le verbe, c'est le noyau du groupe sujet qui commande, même s'il est loin. Et le participe passé suit une règle qui dépend de l'auxiliaire : avec être, il s'accorde avec le sujet ; avec avoir, il ne s'accorde que si le complément d'objet direct est placé avant lui.",
  },
  figure: {
    schema: phraseReference,
    legende:
      "« Les vagues sont hautes. » Le mot « vagues » est au départ de DEUX arcs : il commande le déterminant à sa gauche et l'attribut à sa droite. Un seul mot, deux chaînes d'accord — c'est ce qu'on appelle raisonner sur l'accord plutôt que l'appliquer.",
  },
  proprietes: [
    {
      titre: "La chaîne du groupe nominal",
      texte: "Le nom noyau donne son genre et son nombre au déterminant et à l'adjectif épithète.",
      schema: phraseChaineGn,
    },
    {
      titre: "Le sujet peut être loin du verbe",
      texte: "C'est le noyau du groupe sujet qui commande, jamais le mot qui se trouve juste avant le verbe.",
      schema: phraseSujetEloigne,
    },
    {
      titre: "L'attribut s'accorde avec le sujet",
      texte: "Après un verbe d'état, l'attribut prend le genre et le nombre du sujet — un complément d'objet, non.",
      schema: phraseAttribut,
    },
    {
      titre: "Avec ÊTRE : accord avec le sujet",
      texte: "Le participe passé se comporte comme un adjectif : il suit le sujet, où qu'il soit.",
      schema: pile(phraseEtre, phraseEtreDeuxSujets),
    },
    {
      titre: "Avec AVOIR : seulement si le COD est avant",
      texte: "COD après le participe : rien ne bouge. COD placé avant, souvent repris par un pronom : on accorde.",
      schema: pile(phraseAvoirSansAccord, phraseAvoirAccord),
    },
    {
      titre: "Les homophones se remplacent",
      texte: "Chacun a son test : « est » devient « était », « ont » devient « avaient », « son » devient « le sien ».",
      schema: pile(phraseHomophoneEst, phraseHomophoneOnt),
    },
  ],
  reel: {
    texte:
      "C'est le dernier geste avant de rendre une copie, et c'est celui qui se voit le plus. Une phrase peut être juste, claire, bien construite : deux accords manqués et le lecteur ne voit plus qu'eux. Le programme demande d'ailleurs d'« améliorer son orthographe grammaticale DANS LE CADRE DE LA PRODUCTION D'ÉCRITS » — pas dans un exercice à part. Relire pour les accords, ce n'est pas une punition, c'est la dernière étape de l'écriture.",
  },
  historique: {
    texte:
      "La règle du participe passé avec « avoir » vient d'un poète : Clément Marot, en 1538, la formule en vers après avoir observé les Italiens. À l'époque, on accordait un peu comme on voulait. Sa règle s'est imposée, puis on a passé cinq siècles à essayer de la simplifier — sans y parvenir. C'est la seule règle de français dont on connaisse l'auteur et la date.",
  },
  formule: {
    contexte: "Le participe passé, en deux questions.",
    expression: "être ? → le sujet. avoir ? → le COD, s'il est avant.",
    legende:
      "On regarde d'abord l'auxiliaire. Avec être, on accorde avec le sujet, toujours. Avec avoir, on cherche le complément d'objet direct : s'il est après le participe, on n'écrit rien ; s'il est avant — souvent un pronom, « l' », « les », « qu' » —, on accorde avec lui.",
    schema: pile(phraseEtre, phraseAvoirAccord),
  },
  methode: [
    {
      titre: "Je barre ce qui s'intercale",
      texte: "Entre le noyau du sujet et le verbe, je barre le complément du nom : le vrai donneur d'accord apparaît.",
      schema: phraseSujetEloigne,
    },
    {
      titre: "Je regarde l'auxiliaire",
      texte: "Être : j'accorde avec le sujet. Avoir : je passe à la question suivante.",
      schema: phraseEtre,
    },
    {
      titre: "Avec avoir, je cherche le COD et sa place",
      texte: "S'il est après le participe, je n'écris rien. S'il est avant, j'accorde avec lui.",
      schema: pile(phraseAvoirSansAccord, phraseAvoirAccord),
    },
  ],
  usages: [
    {
      titre: "est / et",
      detail: "« est » se remplace par « était » ; « et » se remplace par « et puis ».",
      schema: phraseHomophoneEst,
    },
    {
      titre: "on / ont",
      detail: "« ont » se remplace par « avaient » ; « on » se remplace par « il ».",
      schema: phraseHomophoneOnt,
    },
    {
      titre: "son / sont",
      detail: "« son » se remplace par « le sien » ; « sont » se remplace par « étaient ».",
      schema: phraseHomophoneEst,
    },
  ],
  exemples: [
    {
      titre: "La chaîne du groupe nominal",
      donnees: "« des histoires merveilleuses »",
      schema: phraseChaineGn,
      question: "Quel mot commande l'accord, et sur combien de mots ?",
      solution:
        "Le nom noyau « histoires », féminin pluriel. Il commande deux fois : sur le déterminant « des » et sur l'épithète « merveilleuses ». C'est ce qu'on appelle une chaîne d'accords — un seul donneur, plusieurs receveurs.",
    },
    {
      titre: "Le sujet éloigné",
      donnees: "« Les élèves de la classe ___ attentifs. »",
      schema: phraseSujetEloigne,
      question: "Faut-il écrire « est » ou « sont » ?",
      solution:
        "« sont ». Le groupe sujet est « les élèves de la classe », et son noyau est « élèves », au pluriel. « classe » n'est que dans le complément du nom : il ne commande rien, même s'il est juste avant le verbe. On le barre, et le doute disparaît.",
    },
    {
      titre: "Le participe passé avec être",
      donnees: "« Elles sont venu___ hier. »",
      schema: phraseEtre,
      question: "Quelle terminaison faut-il ?",
      solution:
        "« venues ». L'auxiliaire est « sont », donc être : le participe s'accorde avec le sujet « Elles », féminin pluriel. Avec être, il n'y a pas d'autre question à se poser.",
    },
    {
      titre: "Le participe passé avec avoir",
      donnees: "« Elle a mangé une mangue. » puis « La mangue qu'elle a mangé___. »",
      schema: pile(phraseAvoirSansAccord, phraseAvoirAccord),
      question: "Pourquoi la terminaison change-t-elle d'une phrase à l'autre ?",
      solution:
        "Dans la première, le COD « une mangue » est APRÈS le participe : on n'accorde pas, on écrit « mangé ». Dans la seconde, le COD est « la mangue », repris par « qu' » et placé AVANT : on accorde, on écrit « mangée ». Le verbe est le même, le complément est le même — seule sa place a changé.",
    },
    {
      titre: "Le défi",
      donnees: "« Les vagues du lagon sont mont___. »",
      schema: phraseDefi,
      question: "Quelle terminaison, et pourquoi ?",
      solution:
        "« montées ». On barre « du lagon », qui n'est qu'un complément du nom : le noyau du sujet est « vagues », féminin pluriel. L'auxiliaire est « sont », donc être, et le participe s'accorde avec le sujet. Deux chaînes d'accord dans une seule phrase : « Les » suit « vagues », et « montées » aussi.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« des histoire merveilleuses » — qu'est-ce qui ne va pas ?",
      correction:
        "« histoires » manque son « s ». Le déterminant « des » et l'adjectif « merveilleuses » sont au pluriel : le nom noyau doit l'être aussi. La chaîne d'accords se tient ou se casse en entier.",
    },
    {
      question: "« La bande de pirates ___ à l'abordage. » — « se lance » ou « se lancent » ?",
      correction:
        "« se lance ». Le noyau du groupe sujet est « la bande », au singulier ; « de pirates » n'est qu'un complément du nom. On le barre pour entendre juste.",
    },
    {
      question: "« Tom et Léo sont arrivé___ ensemble. »",
      correction:
        "« arrivés ». Deux noms coordonnés forment un sujet pluriel, et l'auxiliaire est être : le participe s'accorde avec ce sujet.",
    },
    {
      question: "« Nous avons ramassé___ des letchis. »",
      correction:
        "« ramassé », sans rien. L'auxiliaire est avoir et le COD « des letchis » est placé APRÈS le participe : il n'y a pas d'accord.",
    },
    {
      question: "« Il ___ parti sans ___ carnet. » — est/et, son/sont ?",
      correction:
        "« Il est parti sans son carnet. » « est » se remplace par « était » ; « son » se remplace par « le sien ». « et » et « sont » ne passent ni l'un ni l'autre.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesAccords6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les accords - 6e",
    section: {
      type: "objectif",
      phrase: "Raisonner l'accord, au lieu de l'entendre",
      sousPhrase:
        "On cherche qui commande — le nom noyau, le groupe sujet, l'auxiliaire — et la terminaison suit.",
      encadre: {
        titre: "L'idée",
        texte: "Ce n'est jamais le mot le plus proche qui commande, c'est le noyau.",
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
          "Une phrase peut être juste, claire, bien construite : deux accords manqués et le lecteur ne voit plus qu'eux. Relire pour les accords est la dernière étape de l'écriture.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "La règle du participe passé avec « avoir » vient d'un poète, Clément Marot, en 1538. C'est la seule règle de français dont on connaisse l'auteur et la date — et on n'a jamais réussi à la simplifier.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheAccords6e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Le sujet n'est pas le mot le plus proche",
    badge: "Sujet éloigné",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on entend",
        contenu:
          "« Les élèves de la classe ___ attentifs. » Juste avant le verbe : « classe », au singulier. L'oreille dit « est ».",
      },
      droite: {
        variante: "ok",
        titre: "Ce qu'on raisonne",
        contenu:
          "On barre « de la classe », complément du nom. Le noyau du sujet est « élèves », pluriel : on écrit « sont ».",
      },
    },
  },
  {
    titre: "Le participe passé, en deux questions",
    badge: "Être ou avoir",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Avec ÊTRE",
        contenu:
          "« Elles sont venues. » Le participe s'accorde avec le sujet, toujours. Il n'y a pas d'autre question.",
      },
      droite: {
        variante: "ok",
        titre: "Avec AVOIR",
        contenu:
          "« Elle a mangé une mangue » : le COD est après, rien ne bouge. « La mangue qu'elle a mangée » : le COD est avant, on accorde.",
      },
    },
  },
  {
    titre: "La place du complément change tout",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Elle a mangé une mangue. » puis « La mangue qu'elle a mangée. »",
      question: "Pourquoi la terminaison change-t-elle ?",
      correction:
        "Même verbe, même complément — seule sa place a changé. Après le participe : pas d'accord. Avant, repris par « qu' » : on accorde.",
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
      enonce: "« Les vagues du lagon sont mont___. »",
      question: "Quelle terminaison, et pourquoi ?",
      indice: "Barre le complément du nom. Puis regarde l'auxiliaire.",
      correction:
        "« montées ». Le noyau du sujet est « vagues », féminin pluriel, et l'auxiliaire est être : le participe s'accorde avec le sujet.",
    },
  },
];
