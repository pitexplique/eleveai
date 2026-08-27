// ─── Fiche de cours : les mots entre eux, et comment ils sont faits (6e) ──────
// LA ONZIÈME FICHE DE FRANÇAIS DE LA 6e.
//
// ⚠️⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Sixième ». ⛔⛔ LA 6e FERME LE CYCLE 3 — elle ne
// suit pas le programme de cycle 4. Ne jamais transposer depuis la 5e.
//
// ⛔⛔ ET LE CONTRÔLE EST FACILE À FAIRE, PARCE QUE LA 5e A UNE NOTION DU MÊME
// NOM. `vocabulaire_relations` existe dans les deux classes et porte deux
// programmes différents :
//     5e → vérifier un synonyme en récrivant la phrase · le SENS des affixes
//     6e → l'antonyme DE LA MÊME CLASSE · simple/dérivé/COMPOSÉ · les racines
// Le mot COMPOSÉ n'est pas au programme de 5e ; il est ici. Et la 6e ne demande
// pas le sens d'un affixe mais de RECONNAITRE comment un mot est fabriqué.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE : LA BANDE `nature` PORTE LA RÈGLE ENTIÈRE.
// Le BO demande un antonyme « qui respecte la classe grammaticale » — à un
// adjectif répond un adjectif. Or le canvas `phrase` écrit la nature en gris
// au-dessus de chaque étiquette : il suffit d'aligner « courageux » (adjectif),
// « lâche » (adjectif), « la peur » (nom) et « craindre » (verbe), de barrer les
// deux derniers, et la règle se lit sans qu'on l'énonce. Les quatre mots disent
// la même idée ; deux seulement ont la même classe.
//
// ⭐ ET LA DIFFÉRENCE DÉRIVÉ / COMPOSÉ SE VOIT AU CHOIX DU CANVAS, pas à la
// légende — c'est exactement ce que le CATALOGUE demande :
//     mot DÉRIVÉ  → les WAGONS : des morceaux qui n'existent pas tout seuls ;
//     mot COMPOSÉ → deux ÉTIQUETTES de `phrase` : deux mots entiers, côte à côte.
// Un élève qui voit les deux dessins n'a plus besoin de retenir la définition.
//
// ⛔ Correspondance fixe des wagons, celle de la 4e et de la 5e : `temps` =
// préfixe (orange) · `radical` = radical (bleu) · `personne` = suffixe (vert).
// ⚠️ `note` en huit signes. ⛔ Ne pas envoyer `infinitif` : le canvas l'imprime
// EN DUR, et c'est faux sur un mot dérivé.
//
// ⛔ RÈGLE DE COULEUR : un crochet qui n'est pas une fonction reste GRIS, et cela
// se vérifie AU RENDU (une étiquette « le sujet » est sortie en bleu en 5e).
// Mots piégés : sujet, verbe, objet, nom, attribut, circonstanciel, proposition.
// ⚠️ Ici « deux mots entiers » est sûr, mais PAS « un nom composé » — qui
// contient « nom » et sortirait en rose.
//
// Alignée sur les items `6e_fr_fixed_rel_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `vocabulaire_relations`) :
// - 6e_voc_relations       → figure, propriétés 1 et 2, méthode 1, usage 1,
//                            exemples 1 et 2
// - 6e_voc_formation       → propriétés 3 et 4, méthode 2, exemple 3
// - 6e_voc_composition     → propriété 5, formule, méthode 3, exemple 4
// - 6e_voc_racines         → propriétés 6 et 7, méthode 4, usage 2, exemple 5
// - 6e_voc_formation_defi  → propriété 8, usage 3, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ConjugaisonSegment,
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

/** ⭐ LE MOT DÉRIVÉ : des morceaux qui n'existent pas tout seuls. ⛔ Rôles fixes :
 *  `temps` = préfixe (orange) · `radical` = radical (bleu) · `personne` =
 *  suffixe (vert). ⚠️ `note` en huit signes ; ⛔ jamais `infinitif`. */
function morceaux(opts: { segments: ConjugaisonSegment[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{ kind: "conjugaison", mode: "wagons", segments: opts.segments, legende: opts.legende }}
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

// ─── Ce qui se dessine quand on relie et qu'on fabrique ───────────────────────

// ── LA FIGURE DE RÉFÉRENCE : la bande grise des natures porte la règle.
const antonymeMemeClasse = phrase({
  mots: [
    { texte: "courageux", nature: "adjectif", focus: true },
    { texte: "lâche", nature: "adjectif", focus: true },
    { texte: "la peur", nature: "nom", barre: true },
    { texte: "craindre", nature: "verbe", barre: true },
  ],
  legende: "Les quatre parlent de la même idée. Deux seulement ont la même classe.",
});

const synonymeMemeClasse = phrase({
  mots: [
    { texte: "rapide", nature: "adjectif", focus: true },
    { texte: "vif", nature: "adjectif", focus: true },
    { texte: "la vitesse", nature: "nom", barre: true },
  ],
  legende: "Un synonyme aussi respecte la classe : à un adjectif, un adjectif.",
});

// ── LE CHAMP LEXICAL : un thème, pas une classe.
const champLexicalMer = phrase({
  mots: [{ texte: "vague" }, { texte: "marée" }, { texte: "rivage" }],
  groupes: [{ mots: [0, 2], label: "le thème : la mer" }],
  legende: "Un CHAMP LEXICAL réunit les mots d'un même monde, de toutes classes.",
});

// ── TROIS SORTES DE MOTS, TROIS DESSINS DIFFÉRENTS. ⭐ Le canvas dit la règle.
const motSimple = morceaux({
  segments: [{ texte: "froid", role: "radical", note: "tout seul" }],
  legende: "Un mot SIMPLE : un seul morceau, et rien d'accroché.",
});

const motDerive = morceaux({
  segments: [
    { texte: "re", role: "temps", note: "à nouveau" },
    { texte: "froid", role: "radical", note: "radical" },
    { texte: "ir", role: "personne", note: "devenir" },
  ],
  legende: "Un mot DÉRIVÉ : des morceaux accrochés, qui n'existent pas seuls.",
});

const motCompose = phrase({
  mots: [
    { texte: "porte", focus: true },
    { texte: "manteau", focus: true },
  ],
  groupes: [{ mots: [0, 1], label: "deux mots entiers" }],
  legende: "Un mot COMPOSÉ : deux mots qui existent chacun tout seul, soudés.",
});

// ── COMPOSER ET DÉCOMPOSER : où se place chaque morceau.
const placesDuMot = morceaux({
  segments: [
    { texte: "re", role: "temps", note: "devant" },
    { texte: "froid", role: "radical", note: "au centre" },
    { texte: "ir", role: "personne", note: "derrière" },
  ],
  legende: "Le préfixe devant, le radical au centre, le suffixe derrière.",
});

// ── LES RACINES ANCIENNES.
const racineBiblio = morceaux({
  segments: [
    { texte: "biblio", role: "temps", note: "le livre" },
    { texte: "thèque", role: "radical", note: "ranger" },
  ],
  legende: "« Bibliothèque » : là où l'on range les livres. Deux mots grecs.",
});

const familleTheque = phrase({
  mots: [
    { texte: "bibliothèque" },
    { texte: "discothèque" },
    { texte: "médiathèque" },
  ],
  groupes: [{ mots: [0, 2], label: "-thèque : ranger" }],
  legende: "Une racine reconnue, et trois mots s'expliquent d'un coup.",
});

// ── LE DÉFI : fabriquer un mot avec un suffixe connu.
const defiNageur = morceaux({
  segments: [
    { texte: "nag", role: "radical", note: "nager" },
    { texte: "eur", role: "personne", note: "celui qui" },
  ],
  legende: "« -eur » désigne celui qui fait l'action : nageur, chanteur, joueur.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireRelations6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "vocabulaire-relations",
  titre: "Les mots entre eux, et comment ils sont faits (6e)",
  accroche:
    "Quel est le contraire de « courageux » ? Beaucoup répondent « la peur ». C'est la bonne idée — et la mauvaise réponse : « courageux » qualifie quelqu'un, « la peur » nomme une chose. Le contraire d'un adjectif est un adjectif : « lâche ». Un mot ne se remplace jamais par n'importe quel autre, même quand le sens y est.",
  identite: [
    { label: "Mots clés", valeur: "Synonyme, antonyme, dérivé, composé, racine" },
    { label: "Le secret", valeur: "Même sens contraire, MÊME classe de mot" },
    { label: "Outil", valeur: "Regarder de quoi le mot est fait" },
  ],
  definition: {
    texte:
      "Les mots se tiennent de deux façons. Par le SENS d'abord : deux mots sont SYNONYMES quand ils veulent dire la même chose, ANTONYMES quand ils disent le contraire — et dans les deux cas ils doivent avoir la MÊME CLASSE GRAMMATICALE, sinon on ne peut pas les échanger dans une phrase. Un CHAMP LEXICAL, lui, réunit des mots d'un même thème sans se soucier de leur classe. Par leur FABRICATION ensuite : un mot SIMPLE tient en un seul morceau (froid) ; un mot DÉRIVÉ ajoute au radical un préfixe devant, un suffixe derrière, ou les deux (re-froid-ir) ; un mot COMPOSÉ réunit deux mots qui existent chacun tout seul (porte + manteau). Et beaucoup de radicaux ne sont pas français : ce sont des RACINES grecques ou latines, très anciennes, qui servent encore à fabriquer des mots aujourd'hui.",
  },
  figure: {
    schema: pile(antonymeMemeClasse, synonymeMemeClasse),
    legende:
      "Au-dessus de chaque mot, en gris, sa classe grammaticale. Les quatre mots du haut parlent tous du courage et de la peur — mais « la peur » est un nom et « craindre » un verbe : on ne peut pas les mettre à la place de « courageux » dans une phrase. Seul « lâche », adjectif comme lui, en est vraiment le contraire. La règle se lit dans la bande grise, sans qu'on ait à l'énoncer.",
  },
  proprietes: [
    {
      titre: "Le contraire garde la classe du mot",
      texte:
        "À un adjectif répond un adjectif, à un nom un nom, à un verbe un verbe. « Courageux » → « lâche », et non « la peur ».",
      schema: antonymeMemeClasse,
      micros: ["6e_voc_relations"],
    },
    {
      titre: "Le champ lexical, lui, mélange les classes",
      texte:
        "« Vague », « marée », « rivage » : un même thème, la mer. Ce n'est pas une question de classe mais de monde.",
      schema: champLexicalMer,
      micros: ["6e_voc_relations"],
    },
    {
      titre: "Un mot simple tient en un morceau",
      texte:
        "« Froid », « mer », « livre » : rien devant, rien derrière. C'est le point de départ de tous les autres.",
      schema: motSimple,
      micros: ["6e_voc_formation"],
    },
    {
      titre: "Dérivé ou composé : regarde les morceaux",
      texte:
        "Dérivé : les morceaux n'existent pas seuls (re-, -ir). Composé : chaque morceau est un mot entier (porte, manteau).",
      schema: pile(motDerive, motCompose),
      micros: ["6e_voc_formation"],
    },
    {
      titre: "Trois places, toujours les mêmes",
      texte:
        "Le préfixe devant, le radical au centre, le suffixe derrière. Décomposer un mot, c'est retrouver ces trois places.",
      schema: placesDuMot,
      micros: ["6e_voc_composition"],
    },
    {
      titre: "Beaucoup de racines sont grecques ou latines",
      texte:
        "« Biblio » (le livre) et « thèque » (ranger) sont grecs. Une bibliothèque range des livres : le mot le dit.",
      schema: racineBiblio,
      micros: ["6e_voc_racines"],
    },
    {
      titre: "Une racine reconnue ouvre plusieurs mots",
      texte:
        "Bibliothèque, discothèque, médiathèque, ludothèque : partout « -thèque », partout un endroit où l'on range.",
      schema: familleTheque,
      micros: ["6e_voc_racines"],
    },
    {
      titre: "Le défi : fabriquer un mot qui n'existait pas pour toi",
      texte:
        "Un radical connu, un suffixe connu, et le mot se construit : nag- + -eur, celui qui nage. Tu peux l'inventer et il sera juste.",
      schema: defiNageur,
      micros: ["6e_voc_formation_defi"],
    },
  ],
  reel: {
    texte:
      "Les mots en « -thèque » se lisent sur des portes, dans toutes les villes : bibliothèque, médiathèque, ludothèque, discothèque, vidéothèque. Aucun n'est à apprendre séparément — la racine dit à chaque fois « endroit où l'on range », et le début dit ce qu'on y range. C'est vrai de la moitié des mots que tu croiseras au collège et bien après : sur un panneau, une notice, une ordonnance, un formulaire. Savoir de quoi un mot est fait, c'est pouvoir lire des mots qu'on ne t'a jamais appris — et c'est aussi pouvoir en fabriquer : quand tu écris « nageur » sans l'avoir jamais lu, tu appliques une règle, tu ne devines pas.",
  },
  historique: {
    texte:
      "« Thêkê » voulait dire « le rangement » en grec ancien, il y a deux mille cinq cents ans, et le mot n'a jamais cessé de servir. La bibliothèque est très vieille ; la discothèque date des années 1930, quand il a fallu nommer l'endroit où l'on rangeait les disques ; la ludothèque et la vidéothèque sont des années 1970 ; la médiathèque des années 1980. Une racine grecque a donc fabriqué des mots français pour des objets — le disque, la cassette — que les Grecs n'auraient pas pu imaginer. C'est ainsi que la langue fonctionne : elle ne jette presque rien, elle réemploie. Et le jour où l'on inventera un nouvel endroit où ranger quelque chose, il y a de bonnes chances qu'il finisse en « -thèque » lui aussi.",
  },
  formule: {
    contexte: "Le geste qui sépare un mot dérivé d'un mot composé, sans hésiter.",
    expression: "est-ce que chaque morceau existe tout seul ?",
    legende:
      "« Porte » existe, « manteau » existe : portemanteau est COMPOSÉ. « Re- » n'existe pas tout seul, « -ir » non plus : refroidir est DÉRIVÉ. Une seule question, et elle tranche à tous les coups — y compris sur les mots qu'on n'a jamais vus.",
    schema: pile(motDerive, motCompose),
  },
  methode: [
    {
      titre: "Vérifier la classe avant de répondre",
      texte:
        "On te demande le contraire d'un adjectif ? Réponds par un adjectif. Le piège propose toujours le nom ou le verbe de la même famille.",
      schema: antonymeMemeClasse,
      micros: ["6e_voc_relations"],
    },
    {
      titre: "Se demander si chaque morceau existe seul",
      texte:
        "Oui pour les deux ? Mot composé. Non ? Mot dérivé. Aucun morceau à enlever ? Mot simple. Trois questions, trois réponses.",
      schema: pile(motSimple, motCompose),
      micros: ["6e_voc_formation"],
    },
    {
      titre: "Chercher le radical d'abord",
      texte:
        "Cache ce qu'il y a devant et derrière : ce qui reste porte le sens. Dans « refroidir », il reste « froid » — le reste s'y accroche.",
      schema: placesDuMot,
      micros: ["6e_voc_composition"],
    },
    {
      titre: "Pour une racine : chercher deux autres mots",
      texte:
        "Ce que ces mots ont en commun est le sens de la racine. Bibliothèque et discothèque : dans les deux, un endroit où l'on range.",
      schema: familleTheque,
      micros: ["6e_voc_racines"],
    },
  ],
  usages: [
    {
      titre: "Pour ne pas se tromper dans un exercice",
      detail:
        "Les quatre propositions disent souvent la même idée ; une seule a la bonne classe. Regarder la classe fait gagner la question.",
      schema: synonymeMemeClasse,
      micros: ["6e_voc_relations"],
    },
    {
      titre: "Pour lire un mot savant sur une porte",
      detail:
        "Médiathèque, ludothèque, vidéothèque : la racine dit « on range », le début dit quoi. Aucun n'est à apprendre.",
      schema: racineBiblio,
      micros: ["6e_voc_racines"],
    },
    {
      titre: "Pour écrire un mot qu'on n'a jamais lu",
      detail:
        "Un radical, un suffixe, et le mot se construit. Ce n'est pas de la chance : c'est une règle, et elle marche.",
      schema: defiNageur,
      micros: ["6e_voc_formation_defi"],
    },
  ],
  exemples: [
    {
      titre: "Le contraire qui se trompe de classe",
      donnees: "Quel est l'antonyme de l'ADJECTIF « courageux » ?",
      schema: antonymeMemeClasse,
      question: "« La peur », « lâche », « craindre » ou « courageusement » ?",
      solution:
        "LÂCHE. Les quatre parlent bien du courage et de la peur, et c'est ce qui rend la question difficile. Mais « la peur » est un NOM, « craindre » un VERBE, « courageusement » un ADVERBE. Un seul est un adjectif comme « courageux », et c'est le seul qu'on puisse mettre à sa place dans une phrase.",
      micros: ["6e_voc_relations"],
    },
    {
      titre: "Le champ lexical",
      donnees: "Quels mots appartiennent au même champ lexical que « la mer » ?",
      schema: champLexicalMer,
      question: "« montagne, sommet, neige » ou « vague, marée, rivage » ?",
      solution:
        "VAGUE, MARÉE, RIVAGE. Un champ lexical réunit les mots d'un même thème — ici tout ce qui touche à la mer. Remarque la différence avec l'antonyme : ici la classe ne compte pas, on peut mélanger noms, verbes et adjectifs, du moment qu'on reste dans le même monde.",
      micros: ["6e_voc_relations"],
    },
    {
      titre: "Dérivé ou composé ?",
      donnees: "Le mot « portemanteau ».",
      schema: motCompose,
      question: "Simple, dérivé ou composé ?",
      solution:
        "COMPOSÉ. Pose la question qui tranche : est-ce que chaque morceau existe tout seul ? « Porte » existe, « manteau » existe : ce sont deux mots entiers soudés. Dans « refroidir », « re- » et « -ir » n'existent pas seuls — c'est un dérivé. La question est la même, la réponse change.",
      micros: ["6e_voc_formation"],
    },
    {
      titre: "Trouver le préfixe",
      donnees: "Le mot « refroidir ».",
      schema: placesDuMot,
      question: "Quel est le préfixe ?",
      solution:
        "RE-. Le préfixe se place DEVANT le radical. Trouve le radical d'abord — cache ce qu'il y a autour, il reste « froid » —, et ce qui était devant est le préfixe. « -ir » est derrière : c'est le suffixe, et il dit ici « devenir ». Refroidir : redevenir froid.",
      micros: ["6e_voc_composition"],
    },
    {
      titre: "Une racine grecque",
      donnees: "Dans « bibliothèque », la racine « biblio ».",
      schema: racineBiblio,
      question: "Que veut-elle dire ?",
      solution:
        "LIVRE. Et « thèque » veut dire « rangement » : une bibliothèque est l'endroit où l'on range les livres. Le mot ne cachait rien. La même racine « -thèque » est dans discothèque, médiathèque, ludothèque — à chaque fois un endroit où l'on range, et le début dit quoi.",
      micros: ["6e_voc_racines"],
    },
    {
      titre: "Le défi",
      donnees: "Le suffixe « -eur » dans « nageur ».",
      schema: defiNageur,
      question: "À quoi sert-il ?",
      solution:
        "À désigner LA PERSONNE QUI FAIT L'ACTION : nager → nageur, chanter → chanteur, jouer → joueur. C'est ce qui te permet de fabriquer un mot que tu n'as jamais lu : prends un verbe, ajoute « -eur », et tu obtiens celui qui le fait. Tu n'as pas deviné — tu as appliqué une règle.",
      micros: ["6e_voc_formation_defi"],
    },
  ],
  pieges: [
    "Répondre « la peur » au contraire de « courageux » : la bonne idée, la mauvaise classe. Le piège est toujours dans la même famille.",
    "Confondre champ lexical et famille de mots : le champ partage un thème, la famille partage un radical.",
    "Prendre un mot composé pour un dérivé : le test est « chaque morceau existe-t-il tout seul ? ».",
    "Chercher le préfixe avant le radical : trouve le radical d'abord, le reste se place tout seul.",
    "Croire qu'une racine grecque est un mot ancien inutile : « -thèque » a fabriqué la discothèque en 1930 et la médiathèque en 1980.",
    "Apprendre les racines en liste : une racine s'apprend dans deux ou trois mots qui la portent.",
  ],
  aRetenir: [
    "Synonyme et antonyme gardent la CLASSE du mot : à un adjectif, un adjectif.",
    "Le champ lexical, lui, réunit un thème et mélange les classes.",
    "Simple = un morceau. Dérivé = des morceaux accrochés. Composé = deux mots entiers.",
    "Le test qui tranche : est-ce que chaque morceau existe tout seul ?",
    "Préfixe devant, radical au centre, suffixe derrière — et le radical porte le sens.",
  ],
  entrainement: [
    {
      question: "Quel est l'antonyme de l'ADJECTIF « rapide » ?",
      correction: "Lent — un adjectif. « La lenteur » est un nom, « ralentir » un verbe.",
      micros: ["6e_voc_relations"],
    },
    {
      question: "« four, casserole, recette » : quel champ lexical ?",
      correction: "La cuisine. Les classes sont mélangées, c'est le thème qui compte.",
      micros: ["6e_voc_relations"],
    },
    {
      question: "« tire-bouchon » est un mot simple, dérivé ou composé ?",
      correction: "Composé : « tire » et « bouchon » existent chacun tout seul.",
      micros: ["6e_voc_formation"],
    },
    {
      question: "Dans « déplacer », quel est le préfixe et que dit-il ?",
      correction: "« Dé- », qui dit le contraire ou l'éloignement. Le radical est « plac ».",
      micros: ["6e_voc_composition"],
    },
    {
      question: "Dans « chronomètre », que veut dire la racine « chrono » ?",
      correction: "Le temps. Et « mètre » veut dire mesurer : il mesure le temps.",
      micros: ["6e_voc_racines"],
    },
    {
      question: "Comment appelle-t-on celui qui chante, avec le suffixe « -eur » ?",
      correction: "Un chanteur. Radical « chant » + suffixe « -eur » : celui qui fait l'action.",
      micros: ["6e_voc_formation_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesVocabulaireRelations6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les mots entre eux - 6e",
    section: {
      type: "objectif",
      phrase: "Le contraire garde la classe du mot",
      sousPhrase:
        "« Courageux » est un adjectif : son contraire est un adjectif. « La peur » est la bonne idée et la mauvaise réponse.",
      encadre: {
        titre: "L'idée",
        texte: "Un mot ne se remplace pas par n'importe quel autre, même quand le sens y est.",
      },
    },
  },
  {
    titre: "La classe se lit au-dessus du mot",
    badge: "Les mots entre eux - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "courageux", texte: "ADJECTIF — il qualifie quelqu'un." },
        { titre: "lâche", texte: "ADJECTIF — c'est le bon contraire." },
        { titre: "la peur", texte: "NOM — la bonne idée, la mauvaise classe." },
        { titre: "craindre", texte: "VERBE — même famille, même piège." },
      ],
    },
    schema: antonymeMemeClasse,
  },
  {
    titre: "Trois sortes de mots",
    badge: "Les mots entre eux - 6e",
    section: {
      type: "etapes",
      etapes: [
        "SIMPLE : « froid ». Un seul morceau, rien d'accroché.",
        "DÉRIVÉ : « re-froid-ir ». Des morceaux qui n'existent pas tout seuls.",
        "COMPOSÉ : « porte + manteau ». Deux mots entiers, soudés.",
        "Le test : est-ce que chaque morceau existe tout seul ?",
      ],
    },
    schema: pile(motDerive, motCompose),
  },
  {
    titre: "Une racine, plusieurs portes",
    badge: "Les mots entre eux - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "« biblio » : le livre",
        contenu: "Une racine grecque de deux mille cinq cents ans.",
      },
      droite: {
        titre: "« -thèque » : ranger",
        contenu: "Bibliothèque, discothèque, médiathèque, ludothèque.",
      },
    },
    schema: pile(racineBiblio, familleTheque),
  },
  {
    titre: "Une racine qui n'a jamais pris sa retraite",
    badge: "Les mots entre eux - 6e",
    section: {
      type: "etapes",
      etapes: [
        "« Thêkê » voulait dire « rangement » en grec ancien.",
        "La discothèque date des années 1930 : il fallait ranger les disques.",
        "La ludothèque et la vidéothèque, des années 1970.",
        "Une racine grecque a nommé des objets que les Grecs n'imaginaient pas.",
      ],
    },
    schema: familleTheque,
  },
  {
    titre: "À vous",
    badge: "Les mots entre eux - 6e",
    section: {
      type: "exercice",
      enonce: "« portemanteau » et « refroidir »",
      question: "Lequel est composé, lequel est dérivé ?",
      indice: "Pose la même question aux deux : chaque morceau existe-t-il tout seul ?",
      correction:
        "« Portemanteau » est COMPOSÉ : porte et manteau existent chacun. « Refroidir » est DÉRIVÉ : ni « re- » ni « -ir » n'existent seuls.",
    },
    schema: pile(motCompose, motDerive),
  },
];
