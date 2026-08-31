// ─── Fiche de cours : la formation des mots et l'orthographe lexicale (4e) ────
// LA SEPTIÈME FICHE DE FRANÇAIS DE LA 4e. Elle ferme le lexique, ouvert par
// `francais-4e-vocabulaire-sens.tsx`.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020. Deux objectifs y sont réunis ici :
// la fin d'« Enrichir et structurer le lexique » — formation des mots, racines
// latines et grecques, construction des verbes — et « Acquérir l'orthographe
// lexicale ».
//
// ⭐⭐ LE CANVAS `conjugaison` EST DÉTOURNÉ, ET C'EST VOULU. Il démonte une
// FORME VERBALE en wagons : radical bleu, marque de temps orange, marque de
// personne verte. Or un mot dérivé se démonte exactement pareil — un préfixe,
// un radical, un suffixe — et c'est le même geste mental pour l'élève : trouver
// le morceau qui porte le sens, puis lire ce qu'on lui a accroché.
//
// ⛔ LE DÉTOURNEMENT EST ASSUMÉ ET IL A UNE RÈGLE FIXE, à ne pas changer :
//     role: "temps"    → LE PRÉFIXE   (orange, devant)
//     role: "radical"  → LE RADICAL   (bleu, au centre)
//     role: "personne" → LE SUFFIXE   (vert, derrière)
// Le `note` sous chaque wagon écrit le vrai nom, pour qu'aucun élève ne lise
// « marque de temps » sous un préfixe. ⚠️ Toute autre fiche qui démonte un mot
// doit reprendre CETTE correspondance, sinon deux fiches diront deux choses.
//
// ⭐ POURQUOI NE PAS AVOIR ÉCRIT UN CANVAS `mot` : parce que le catalogue le
// dit — « avant d'en écrire un autre, vérifier que celui-ci ne suffit pas ». Il
// suffit, et un canvas de plus, c'est une grammaire visuelle de plus à
// apprendre pour l'élève.
//
// Alignée sur les tables DERIVATION, RACINES et CONSTRUCTIONS de
// lib/tutor-v4/questionBank/4e/francais/vocabulaire.bank.ts, sur FORMATION,
// REEMPLOI et ORTHOGRAPHE de socle-lexique-discours.bank.ts, et sur les items
// figés `4e_voc_orthographe` de complements-etude-langue.bank.ts.
//
// Micro-compétences couvertes (les 4 de `vocabulaire_formation` et les 2 de
// `vocabulaire_orthographe`) :
// - 4e_voc_formation            → figure, propriété 1, méthode 1, exemple 1
// - 4e_voc_derivation_categorie → propriété 2, méthode 2, exemple 2
// - 4e_voc_racines              → propriété 3, formule, méthode 3, exemple 3
// - 4e_voc_construction_verbe   → propriété 4, méthode 4, exemple 4
// - 4e_voc_reemploi             → propriété 5, usages, exemple 5
// - 4e_voc_orthographe          → propriétés 6 et 7, méthode 5, exemples 6 et 7
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin `phrase` ;
// la couleur vient du `role` ou du `label`, jamais de l'appelant ; et un canvas
// de maths se règle en largeur (voir `vocabulaire-sens`, réglages mesurés).

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ConjugaisonSegment,
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

/** Le mot démonté en morceaux. ⛔ Correspondance FIXE des rôles :
 *  `temps` = préfixe (orange) · `radical` = radical (bleu) · `personne` =
 *  suffixe (vert). Le `note` écrit le vrai nom sous le wagon. */
function morceaux(opts: {
  segments: ConjugaisonSegment[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "wagons",
        segments: opts.segments,
        legende: opts.legende,
      }}
    />
  );
}

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

// ─── Les mots, démontés ───────────────────────────────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : les trois places, sur un mot que tout le monde
//    connait. Une fois qu'on les voit, on les voit partout.
const motPrefixeSuffixe = morceaux({
  segments: [
    { texte: "trans", role: "temps", note: "préfixe : à travers" },
    { texte: "port", role: "radical", note: "radical : porter" },
    { texte: "able", role: "personne", note: "suffixe : qu'on peut" },
  ],
  legende: "Trois morceaux : « transportable », ce qu'on peut porter à travers.",
});

const motPrefixeSeul = morceaux({
  segments: [
    { texte: "re", role: "temps", note: "préfixe : de nouveau" },
    { texte: "faire", role: "radical", note: "radical" },
  ],
  legende: "Un préfixe seul : il change le sens, pas la classe du mot.",
});

const motSuffixeSeul = morceaux({
  segments: [
    { texte: "chant", role: "radical", note: "radical" },
    { texte: "eur", role: "personne", note: "suffixe : celui qui" },
  ],
  legende: "Un suffixe seul : et le verbe devient un nom de personne.",
});

// ── LA DÉRIVATION CHANGE LA CLASSE. Le programme donne lui-même ses exemples.
const derivationVerbeNom = phrase({
  mots: [
    { texte: "déménager", nature: "verbe", focus: true },
    { texte: "→" },
    { texte: "déménagement", nature: "nom", focus: true },
  ],
  legende: "Le suffixe « -ment » fait passer du verbe au nom.",
});

const derivationAdjectifNom = phrase({
  mots: [
    { texte: "beau", nature: "adjectif", focus: true },
    { texte: "→" },
    { texte: "beauté", nature: "nom", focus: true },
  ],
  legende: "« -té » fait un nom à partir d'un adjectif.",
});

const derivationAdjectifAdverbe = phrase({
  mots: [
    { texte: "lent", nature: "adjectif", focus: true },
    { texte: "→" },
    { texte: "lentement", nature: "adverbe", focus: true },
  ],
  legende: "« -ment » sur un adjectif fait un adverbe, qui ne varie jamais.",
});

// ── LES RACINES : reconnaitre un élément ancien ouvre toute une famille.
const racineChrono = morceaux({
  segments: [
    { texte: "chrono", role: "radical", note: "grec : le temps qui passe", alerte: true },
    { texte: "logie", role: "personne", note: "grec : l'étude" },
  ],
  legende: "« Chronologie » : l'étude de l'ordre du temps.",
});

const racineAnthropo = morceaux({
  segments: [
    { texte: "phil", role: "temps", note: "grec : qui aime" },
    { texte: "anthrope", role: "radical", note: "grec : l'être humain", alerte: true },
  ],
  legende: "« Philanthrope » : qui aime les êtres humains. Deux racines collées.",
});

const racineSpect = morceaux({
  segments: [
    { texte: "in", role: "temps", note: "latin : dans" },
    { texte: "spect", role: "radical", note: "latin : regarder", alerte: true },
    { texte: "er", role: "personne", note: "suffixe" },
  ],
  legende: "« Inspecter » : regarder dedans. La même racine que « spectateur ».",
});

// ── LA CONSTRUCTION DU VERBE CHANGE SON SENS. Le programme donne l'exemple.
const constructionDirecte = phrase({
  mots: [
    { texte: "Il" },
    { texte: "manque" },
    { texte: "son" },
    { texte: "train" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 3], label: "objet" }],
  legende: "Construction directe : il le RATE.",
});

const constructionIndirecte = phrase({
  mots: [
    { texte: "Il" },
    { texte: "manque" },
    { texte: "de", focus: true },
    { texte: "sel" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 3], label: "complément indirect" }],
  legende: "Une préposition, et le sens change : il n'y en a PAS ASSEZ.",
});

const constructionTenirA = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "tient" },
    { texte: "à", focus: true },
    { texte: "toi" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 3], label: "complément indirect" }],
  legende: "« Tenir à » : elle t'est attachée. Sans le « à », tout change.",
});

// ── L'ORTHOGRAPHE PAR LA FAMILLE : la lettre muette se révèle ailleurs.
const orthographeFamille = phrase({
  mots: [
    { texte: "grand", focus: true },
    { texte: "·" },
    { texte: "grandeur", focus: true },
    { texte: "·" },
    { texte: "grandir", focus: true },
  ],
  liens: [{ de: 2, vers: 0, label: "révèle le d", type: "question" }],
  legende: "On n'entend pas le « d » de « grand ». On l'entend dans « grandeur ».",
});

const orthographeAdverbeAnt = phrase({
  mots: [
    { texte: "courant", nature: "adjectif en -ant", focus: true },
    { texte: "→" },
    { texte: "couramment", nature: "adverbe en -amment", focus: true },
  ],
  legende: "Adjectif en -ant : l'adverbe prend deux m et un a.",
});

const orthographeAdverbeEnt = phrase({
  mots: [
    { texte: "évident", nature: "adjectif en -ent", focus: true },
    { texte: "→" },
    { texte: "évidemment", nature: "adverbe en -emment", focus: true },
  ],
  legende: "Adjectif en -ent : l'adverbe prend deux m et un e. Même son, autre lettre.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireFormation4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "vocabulaire-formation",
  titre: `La formation des mots et l'orthographe lexicale en 4e (${ANNEE_SCOLAIRE})`,
  accroche:
    "On n'entend pas le « d » de « grand ». Aucune règle ne peut le faire entendre, aucun effort d'oreille non plus. Mais on l'entend très bien dans « grandeur » et dans « grandir » — et c'est ainsi qu'on l'écrit. Un mot ne s'apprend pas seul : il s'apprend avec sa famille, et la famille répond aux questions que le mot ne peut pas trancher.",
  identite: [
    { label: "Mots clés", valeur: "Préfixe, radical, suffixe, racine, dérivation, famille" },
    { label: "Le secret", valeur: "Trouver le radical, puis lire ce qu'on lui a accroché" },
    { label: "Outil", valeur: "Passer par un mot de la même famille" },
  ],
  definition: {
    texte:
      "Un mot construit se démonte en trois places : un PRÉFIXE devant, qui change le sens sans changer la classe ; un RADICAL au centre, qui porte le sens ; un SUFFIXE derrière, qui change souvent la classe du mot — « déménager » est un verbe, « déménagement » est un nom. Beaucoup de radicaux savants viennent du latin et du grec : reconnaitre « chrono », « anthropo » ou « spect », c'est ouvrir d'un coup toute une famille, et souvent deviner un mot jamais rencontré. Enfin, la construction d'un verbe fait partie de son sens : « il manque son train » et « il manque de sel » n'ont en commun que les lettres. Et c'est cette même parenté de forme qui règle l'orthographe : la lettre qu'on n'entend pas dans un mot s'entend dans un autre de sa famille.",
  },
  figure: {
    schema: pile(motPrefixeSuffixe, motPrefixeSeul, motSuffixeSeul),
    legende:
      "Le même mot démonté que dans la fiche du verbe, et ce n'est pas un hasard : c'est le même geste. Le radical est bleu au centre, le préfixe orange devant, le suffixe vert derrière. Sous chaque morceau, ce qu'il apporte. Une fois les trois places vues, on les retrouve dans des milliers de mots.",
  },
  proprietes: [
    {
      titre: "Trois places, et le radical au milieu",
      texte:
        "Le préfixe modifie le sens, le suffixe change la classe. On peut n'en avoir qu'un des deux — « refaire » n'a pas de suffixe, « chanteur » n'a pas de préfixe.",
      schema: pile(motPrefixeSuffixe, motPrefixeSeul),
      micros: ["4e_voc_formation"],
    },
    {
      titre: "Le suffixe fait changer le mot de classe",
      texte:
        "C'est ce que le programme demande de « mettre en évidence » : déménager est un verbe, déménagement un nom ; beau est un adjectif, beauté un nom.",
      schema: pile(derivationVerbeNom, derivationAdjectifNom, derivationAdjectifAdverbe),
      micros: ["4e_voc_derivation_categorie"],
    },
    {
      titre: "Une racine ancienne ouvre une famille entière",
      texte:
        "« Chrono » dit le temps, « anthropo » l'être humain, « spect » regarder. Deux racines peuvent même se coller : « philanthrope », qui aime les humains.",
      schema: pile(racineChrono, racineAnthropo, racineSpect),
      micros: ["4e_voc_racines"],
    },
    {
      titre: "La construction d'un verbe fait partie de son sens",
      texte:
        "« Il manque son train » : il le rate. « Il manque de sel » : il n'y en a pas assez. Une préposition, et ce n'est plus le même verbe.",
      schema: pile(constructionDirecte, constructionIndirecte, constructionTenirA),
      micros: ["4e_voc_construction_verbe"],
    },
    {
      titre: "Réemployer, c'est choisir la marche exacte",
      texte:
        "Les mots voisins ne sont pas faux, ils sont imprécis. « La peur s'installait » ne dit pas la même chose que « la peur arrivait » : le premier dit la lenteur ET la durée.",
      micros: ["4e_voc_reemploi"],
      schema: derivationAdjectifAdverbe,
    },
    {
      titre: "La famille révèle la lettre qu'on n'entend pas",
      texte:
        "Le « d » de « grand » se tait, et parle dans « grandeur ». Le « t » de « petit » se tait, et parle dans « petite ». C'est la première question à se poser.",
      schema: orthographeFamille,
      micros: ["4e_voc_orthographe"],
    },
    {
      titre: "Les adverbes en -ment se règlent sur l'adjectif",
      texte:
        "Adjectif en -ant → adverbe en -amment. Adjectif en -ent → adverbe en -emment. Le son est le même ; c'est l'adjectif qui décide de la lettre.",
      schema: pile(orthographeAdverbeAnt, orthographeAdverbeEnt),
      micros: ["4e_voc_orthographe"],
    },
  ],
  reel: {
    texte:
      "Reconnaitre une racine, c'est comprendre un mot qu'on n'a jamais lu — et c'est ce qui sépare une lecture fluide d'une lecture qui s'arrête. « Anthropocène », « chronophage », « bibliophile », « démographie » : aucun de ces mots ne s'apprend, tous se devinent, à condition de connaitre une dizaine d'éléments. C'est le meilleur rapport effort-résultat de tout le vocabulaire : dix racines apprises une fois donnent accès à des centaines de mots savants, ceux des articles de presse, des notices, des sujets d'examen. Et cela fonctionne dans les autres langues : « chronology », « anthropology » se lisent sans dictionnaire.",
  },
  historique: {
    texte:
      "Le français a pris ses mots savants au latin et au grec longtemps après avoir cessé de les parler, et il l'a fait deux fois pour les mêmes racines. C'est pourquoi la langue possède des doublets : « hôtel » et « hôpital » viennent du même mot latin hospitale, l'un par l'usure de la bouche pendant mille ans, l'autre recopié tel quel par des clercs au XIVe siècle. Pareil pour « frêle » et « fragile », « écouter » et « ausculter », « raide » et « rigide ». Le premier de chaque paire a vécu, le second a été rangé dans un livre. C'est aussi pour cela que l'orthographe française est difficile : elle garde la trace écrite d'une prononciation qui a disparu — le « d » de « grand » s'entendait vraiment, il y a huit cents ans.",
  },
  formule: {
    contexte: "Le geste qui fait comprendre un mot savant jamais rencontré.",
    expression: "je coupe le mot, et je cherche ce que je reconnais",
    legende:
      "« Anthropocène » : « anthropo », c'est l'être humain — comme dans philanthrope. « -cène » vient du grec kainos, récent, et sert à nommer les ères géologiques. L'ère de l'être humain. On n'a rien appris de nouveau : on a reconnu deux morceaux.",
    schema: racineAnthropo,
  },
  methode: [
    {
      titre: "Chercher le radical avant tout",
      texte:
        "Trouve le morceau qui porte le sens et que tu reconnais ailleurs. Ce qui est devant est un préfixe, ce qui est derrière un suffixe.",
      schema: motPrefixeSuffixe,
      micros: ["4e_voc_formation"],
    },
    {
      titre: "Pour la classe : mettre le mot dans une phrase",
      texte:
        "Ce qui accepte un déterminant est un nom, ce qui se conjugue est un verbe, ce qui s'accorde avec un nom est un adjectif, ce qui ne bouge jamais est un adverbe.",
      schema: pile(derivationVerbeNom, derivationAdjectifAdverbe),
      micros: ["4e_voc_derivation_categorie"],
    },
    {
      titre: "Pour un mot savant : couper et reconnaitre",
      texte:
        "Découpe aux jointures et cherche ce que tu as déjà vu. Deux morceaux reconnus suffisent presque toujours à cerner le sens.",
      schema: racineChrono,
      micros: ["4e_voc_racines"],
    },
    {
      titre: "Pour un verbe : regarder ce qui le suit",
      texte:
        "Rien du tout ? Une préposition ? Laquelle ? La construction n'est pas un détail de forme : elle fait partie de la définition du verbe.",
      schema: pile(constructionDirecte, constructionIndirecte),
      micros: ["4e_voc_construction_verbe"],
    },
    {
      titre: "Pour l'orthographe : passer par la famille",
      texte:
        "Une lettre muette à la fin ? Cherche un mot de la même famille où elle s'entend. Un adverbe en -ment ? Remonte à l'adjectif : c'est lui qui décide.",
      schema: pile(orthographeFamille, orthographeAdverbeEnt),
      micros: ["4e_voc_orthographe"],
    },
  ],
  usages: [
    {
      titre: "Pour lire la presse et les sciences",
      detail:
        "Dix racines apprises donnent accès à des centaines de mots savants — et elles fonctionnent aussi en anglais et en espagnol.",
      schema: racineSpect,
      micros: ["4e_voc_racines"],
    },
    {
      titre: "Pour écrire : la précision se choisit",
      detail:
        "« Il bredouillait » n'est pas « il déclamait ». Un mot voisin n'est pas faux, il est approximatif — et l'approximation est le vrai défaut des copies.",
      micros: ["4e_voc_reemploi"],
      schema: derivationAdjectifNom,
    },
    {
      titre: "Pour se relire sans dictionnaire",
      detail:
        "Une lettre finale qui hésite, un adverbe en -ment : deux réflexes de famille suffisent à trancher la plupart des cas.",
      schema: orthographeFamille,
      micros: ["4e_voc_orthographe"],
    },
  ],
  exemples: [
    {
      titre: "Démonter un mot",
      donnees: "« transportable »",
      schema: motPrefixeSuffixe,
      question: "Quels sont ses morceaux, et que dit chacun ?",
      solution:
        "« Trans- » est un préfixe : à travers. « -port- » est le radical, celui de « porter ». « -able » est un suffixe : ce qu'on peut faire. Ce qu'on peut porter à travers. Le mot n'a pas besoin d'être appris : il se lit.",
      micros: ["4e_voc_formation"],
    },
    {
      titre: "Ce que change un suffixe",
      donnees: "« déménager → déménagement »",
      schema: derivationVerbeNom,
      question: "Que change la dérivation ici ?",
      solution:
        "Le sens reste le même — il s'agit toujours de déménager. Ce qui change, c'est la CLASSE : « déménager » se conjugue, c'est un verbe ; « déménagement » accepte un déterminant — « le déménagement » —, c'est un nom. C'est l'exemple que le programme donne lui-même.",
      micros: ["4e_voc_derivation_categorie"],
    },
    {
      titre: "Deviner un mot savant",
      donnees: "L'élément « anthropo » se retrouve dans « anthropologie » et « philanthrope ».",
      schema: racineAnthropo,
      question: "Que signifie-t-il ?",
      solution:
        "L'ÊTRE HUMAIN. L'anthropologie est l'étude de l'être humain, un philanthrope est celui qui aime les humains. Une racine reconnue une fois donne les deux mots — et tous ceux qu'on croisera plus tard.",
      micros: ["4e_voc_racines"],
    },
    {
      titre: "La préposition change le verbe",
      donnees: "« Il manque son train. » / « Il manque de sel. »",
      schema: pile(constructionDirecte, constructionIndirecte),
      question: "Est-ce le même verbe ?",
      solution:
        "Les mêmes lettres, et deux verbes différents. Sans préposition, « manquer » veut dire RATER. Avec « de », il veut dire qu'il n'y en a PAS ASSEZ. On ne peut donc pas donner le sens d'un verbe sans regarder ce qui le suit.",
      micros: ["4e_voc_construction_verbe"],
    },
    {
      titre: "Le mot exact",
      donnees: "Une peur qui monte lentement et ne repart pas.",
      question: "« La peur ___ » : arrivait, venait, était là, ou s'installait ?",
      solution:
        "« S'installait ». Les trois autres ne sont pas fautifs — la peur arrivait bien, elle était bien là — mais aucun ne dit à la fois la LENTEUR et la DURÉE. « S'installer » dit les deux d'un seul mot, et c'est cela, réemployer un lexique précis.",
      micros: ["4e_voc_reemploi"],
    },
    {
      titre: "La lettre qu'on n'entend pas",
      donnees: "Comment savoir que « grand » se termine par un d ?",
      schema: orthographeFamille,
      question: "Quel réflexe permet de trancher ?",
      solution:
        "Passer par la famille : « grandeur », « grandir », « grandement ». La lettre muette du mot se prononce dans ses parents. Le même réflexe donne le « t » de « petit » par « petite », le « s » de « gros » par « grosse ».",
      micros: ["4e_voc_orthographe"],
    },
    {
      titre: "Deux adverbes, deux graphies",
      donnees: "« courant » et « évident »",
      schema: pile(orthographeAdverbeAnt, orthographeAdverbeEnt),
      question: "Comment s'écrivent leurs adverbes ?",
      solution:
        "« Couramment » et « évidemment ». On entend exactement la même chose dans les deux, et pourtant l'un prend un a, l'autre un e. C'est l'ADJECTIF qui décide : -ant donne -amment, -ent donne -emment. L'oreille ne peut pas trancher ; la famille, si.",
      micros: ["4e_voc_orthographe"],
    },
  ],
  pieges: [
    "Confondre préfixe et suffixe : le préfixe est devant et change le sens, le suffixe est derrière et change souvent la classe.",
    "Croire qu'un mot de la même famille a forcément le même sens : « enterrer » et « terrestre » partagent « terre » et ne veulent pas dire la même chose.",
    "Donner le sens d'un verbe sans regarder ce qui le suit : « manquer » a deux sens selon qu'il est direct ou indirect.",
    "Écrire un adverbe à l'oreille : « couramment » et « évidemment » sonnent pareil et ne s'écrivent pas pareil.",
    "Oublier de chercher la famille devant une lettre muette : c'est le réflexe qui tranche le plus de cas, et le plus vite.",
    "Prendre un mot voisin pour un synonyme exact : « arriver » et « s'installer » ne disent pas la même durée.",
  ],
  aRetenir: [
    "Trois places : préfixe devant, radical au centre, suffixe derrière.",
    "Le préfixe change le sens ; le suffixe change souvent la CLASSE du mot.",
    "Une racine latine ou grecque reconnue ouvre toute une famille de mots savants.",
    "La construction d'un verbe fait partie de son sens : « manquer son train » ≠ « manquer de sel ».",
    "Devant une lettre muette ou un adverbe en -ment : passer par la famille du mot.",
  ],
  entrainement: [
    {
      question: "« illisible » : quels morceaux, et que dit le préfixe ?",
      correction: "il- (préfixe : qu'on ne peut pas) + lis- (radical de lire) + -ible (qu'on peut). Le préfixe nie.",
      micros: ["4e_voc_formation"],
    },
    {
      question: "« lent → lentement » : que change la dérivation ?",
      correction: "Un adjectif devient un adverbe — et l'adverbe, lui, ne varie jamais.",
      micros: ["4e_voc_derivation_categorie"],
    },
    {
      question: "L'élément « biblio » se retrouve dans « bibliothèque » et « bibliographie ». Que signifie-t-il ?",
      correction: "Le livre, l'écrit. Une bibliothèque est un rangement de livres, une bibliographie une liste de livres.",
      micros: ["4e_voc_racines"],
    },
    {
      question: "« Elle tient à toi. » / « Elle tient un journal. » Même verbe ?",
      correction: "Non. Avec « à », elle t'est attachée. Sans préposition, elle l'écrit régulièrement.",
      micros: ["4e_voc_construction_verbe"],
    },
    {
      question: "Comment écrire l'adverbe formé sur « prudent » ?",
      correction: "« prudemment » — adjectif en -ent, donc adverbe en -emment.",
      micros: ["4e_voc_orthographe"],
    },
    {
      question: "Comment savoir que « bavard » prend un d final ?",
      correction: "Par la famille : « bavarde », « bavardage », « bavarder ». La lettre muette s'y entend.",
      micros: ["4e_voc_orthographe"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesVocabulaireFormation4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Formation des mots - 4e",
    section: {
      type: "objectif",
      phrase: "Un mot se démonte, et sa famille répond pour lui",
      sousPhrase:
        "Préfixe, radical, suffixe. Une racine reconnue ouvre des centaines de mots — et la famille tranche l'orthographe que l'oreille ne peut pas trancher.",
      encadre: {
        titre: "L'idée",
        texte: "On n'entend pas le « d » de « grand ». On l'entend dans « grandeur ».",
      },
    },
  },
  {
    titre: "Trois places",
    badge: "Formation des mots - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le préfixe — devant", texte: "Il change le SENS. « refaire », « illisible », « transporter »." },
        { titre: "Le radical — au centre", texte: "Il porte le sens, et on le reconnait ailleurs." },
        { titre: "Le suffixe — derrière", texte: "Il change souvent la CLASSE. « chanter » → « chanteur »." },
      ],
    },
    schema: pile(motPrefixeSuffixe, motSuffixeSeul),
  },
  {
    titre: "Le suffixe change la classe",
    badge: "Formation des mots - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "verbe → nom", texte: "déménager → déménagement" },
        { titre: "adjectif → nom", texte: "beau → beauté" },
        { titre: "adjectif → adverbe", texte: "lent → lentement" },
        { titre: "Le test", texte: "Ce qui accepte « le » est un nom. Ce qui ne bouge jamais est un adverbe." },
      ],
    },
    schema: pile(derivationVerbeNom, derivationAdjectifAdverbe),
  },
  {
    titre: "Deviner un mot savant",
    badge: "Formation des mots - 4e",
    section: {
      type: "etapes",
      etapes: [
        "Je coupe le mot aux jointures.",
        "Je cherche ce que je reconnais : chrono, anthropo, biblio, spect, phil…",
        "Deux morceaux reconnus suffisent presque toujours.",
        "« Anthropocène » : l'ère de l'être humain. Rien à apprendre — tout à reconnaitre.",
      ],
    },
    schema: pile(racineChrono, racineAnthropo),
  },
  {
    titre: "La préposition change le verbe",
    badge: "Formation des mots - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "« Il manque son train. »",
        contenu: "Construction directe : il le RATE.",
      },
      droite: {
        titre: "« Il manque de sel. »",
        contenu: "Construction indirecte : il n'y en a PAS ASSEZ.",
      },
    },
    schema: pile(constructionDirecte, constructionIndirecte),
  },
  {
    titre: "À vous",
    badge: "Formation des mots - 4e",
    section: {
      type: "exercice",
      enonce: "« courant » et « évident »",
      question: "Comment s'écrivent leurs adverbes, et pourquoi ?",
      indice: "Regarde la terminaison de l'ADJECTIF, pas ce que tu entends.",
      correction:
        "« Couramment » et « évidemment ». Même son, deux lettres différentes : -ant donne -amment, -ent donne -emment. C'est l'adjectif qui décide.",
    },
    schema: pile(orthographeAdverbeAnt, orthographeAdverbeEnt),
  },
];
