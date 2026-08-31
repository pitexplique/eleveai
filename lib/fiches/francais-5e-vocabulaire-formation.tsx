// ─── Fiche de cours : la formation des mots (5e) ──────────────────────────────
// LA QUATRIÈME FICHE DE VOCABULAIRE DE LA 5e.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ». La
// compétence « Comprendre la formation des mots » porte deux objectifs :
// « Comprendre la formation des mots » et « Appréhender la dimension historique
// des mots (étymologie) en maitrisant quelques éléments latins, grecs ou
// empruntés aux langues étrangères ». ⛔ CE N'EST PAS LE PROGRAMME DE LA 4e.
//
// ⛔⛔ LE PARTAGE AVEC LES TROIS AUTRES FICHES DU LEXIQUE EST ÉCRIT DANS LES
// EN-TÊTES DES BANQUES, ET IL FAUT LE RESPECTER — sinon quatre fiches disent la
// même chose et aucune ne dit la sienne :
//   `vocabulaire_relations`   → le SENS d'un affixe (« que veut dire trans- ? »)
//   `vocabulaire_formation`   → le GESTE DE PRODUCTION (ci-dessous) et l'ORIGINE
//   `vocabulaire_orthographe` → ce que la dérivation impose à l'ÉCRITURE
// Ici, on ne reconnait pas un suffixe : on FABRIQUE le mot que la définition
// demande. Partir de « courage » et devoir produire « courageux » plutôt que
// « encourager » ou « découragé » — tous de la même famille, un seul répond.
//
// ⭐ CE QUE LA FICHE MONTRE ET QUE LE COURS SE CONTENTE HABITUELLEMENT
// D'AFFIRMER : le suffixe donne un MÉTIER au mot. Le canvas `phrase` porte la
// `nature` en gris au-dessus de chaque étiquette — on écrit donc dans cette
// bande ce que le mot FAIT (« la qualité », « la personne », « l'action »), et
// trois mots d'une même famille cessent d'être trois mots qui se ressemblent.
//
// ⛔ Les wagons gardent la correspondance fixe de `francais-4e-vocabulaire-
// formation.tsx` : temps = préfixe/élément de tête (orange), radical = radical
// (bleu), personne = suffixe (vert). ⚠️ `note` en huit signes : c'est elle, et
// non le mot, qui fixe la largeur du wagon.
//
// Alignée sur la table FABRIQUER de
// lib/tutor-v4/questionBank/5e/francais/socle-lexique-discours.bank.ts et sur la
// table RACINES de vocabulaire-discours.bank.ts.
//
// Micro-compétences couvertes (les 2 de la notion `vocabulaire_formation`) :
// - 5e_voc_formation   → figure, propriétés 1 à 3, formule, méthodes 1 et 2,
//                        usage 1, exemples 1 à 3
// - 5e_voc_etymologie  → propriétés 4 à 6, méthodes 3 et 4, usages 2 et 3,
//                        exemples 4 à 6
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin `phrase` ;
// la couleur vient du `role` ou du `label` ; un mot par entrée ; les blocs
// n'interprètent pas le markdown ; aucun caractère d'une autre écriture — les
// éléments grecs s'écrivent en alphabet latin, comme dans toute la banque.

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
import type { SchemaBarrePart } from "@/lib/tutor-v4/types_canvas";

/** Le mot assemblé, démonté en morceaux. ⛔ Correspondance FIXE :
 *  `temps` = l'élément de tête (orange) · `radical` = le radical (bleu) ·
 *  `personne` = le suffixe (vert). `note` en huit signes. */
function morceaux(opts: { segments: ConjugaisonSegment[]; legende?: string }) {
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

/** Un élément ancien est un TOUT dont chaque mot savant est une part. */
function barre(total: string, parts: SchemaBarrePart[]) {
  return (
    <CanvasRenderer
      figure={{ kind: "schema_barre", total, parts, size: { width: 205, height: 110 } }}
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

// ─── Ce qui se dessine quand on fabrique un mot ───────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : un radical, trois suffixes, trois MÉTIERS. La
//    bande grise des natures dit ce que chaque mot FAIT.
const familleCourage = phrase({
  mots: [
    { texte: "courage", nature: "la qualité" },
    { texte: "courageux", nature: "la personne" },
    { texte: "encourager", nature: "l'action" },
  ],
  legende: "Même radical, trois suffixes : c'est le suffixe qui donne le métier.",
});

const familleNoble = phrase({
  mots: [
    { texte: "noble", nature: "la personne" },
    { texte: "noblesse", nature: "l'ensemble" },
    { texte: "anoblir", nature: "l'action" },
  ],
  legende: "Le radical ne change pas de sens ; il change de rôle dans la phrase.",
});

// ── LE PIÈGE DU FAUX FRÈRE : même famille, mauvais suffixe.
const mauvaisSuffixe = phrase({
  mots: [
    { texte: "courage", barre: true },
    { texte: "courageux", focus: true },
  ],
  legende: "On demandait ce qui qualifie une PERSONNE, pas le nom de la qualité.",
});

// ── LE MOT FABRIQUÉ, MORCEAU PAR MORCEAU.
const fabriqueChevalerie = morceaux({
  segments: [
    { texte: "cheval", role: "radical", note: "radical" },
    { texte: "erie", role: "personne", note: "l'ensemble" },
  ],
  legende: "« Chevalerie » : l'ensemble des chevaliers. Le suffixe fait le groupe.",
});

const fabriqueVoyageur = morceaux({
  segments: [
    { texte: "voyag", role: "radical", note: "radical" },
    { texte: "eur", role: "personne", note: "celui qui" },
  ],
  legende: "« -eur » : celui qui fait l'action. Voyageur, chanteur, joueur, menteur.",
});

const fabriqueSouterrain = morceaux({
  segments: [
    { texte: "sous", role: "temps", note: "en dessous" },
    { texte: "terr", role: "radical", note: "la terre" },
    { texte: "ain", role: "personne", note: "suffixe" },
  ],
  legende: "Trois places à remplir, et la définition dit laquelle il faut changer.",
});

// ── L'ÉTYMOLOGIE : un élément ancien, et plusieurs mots s'ouvrent.
const elementGeo = morceaux({
  segments: [
    { texte: "géo", role: "temps", note: "la terre" },
    { texte: "graphie", role: "radical", note: "écrire" },
  ],
  legende: "« Géographie » : écrire la terre. Deux mots grecs, et rien de mystérieux.",
});

const elementTele = morceaux({
  segments: [
    { texte: "télé", role: "temps", note: "au loin" },
    { texte: "phone", role: "radical", note: "la voix" },
  ],
  legende: "« Téléphone » : la voix au loin. Le mot a été bâti en 1830, les morceaux en Grèce.",
});

const elementThermo = morceaux({
  segments: [
    { texte: "thermo", role: "temps", note: "chaleur" },
    { texte: "mètre", role: "radical", note: "mesurer" },
  ],
  legende: "« Thermomètre » : ce qui mesure la chaleur. Le mot se lit, il ne s'apprend pas.",
});

const famillePort = phrase({
  mots: [
    { texte: "transporter" },
    { texte: "portable" },
    { texte: "portefeuille" },
  ],
  groupes: [{ mots: [0, 2], label: "port- : porter" }],
  legende: "Un élément latin reconnu, et trois mots s'expliquent d'un coup.",
});

const familleAqua = phrase({
  mots: [{ texte: "aquarium" }, { texte: "aquatique" }, { texte: "aqueduc" }],
  groupes: [{ mots: [0, 2], label: "aqua- : l'eau" }],
  legende: "Le latin de l'eau. Il est dans le bassin, dans l'animal et dans le pont.",
});

// ── UN ÉLÉMENT EST UN TOUT DONT CHAQUE MOT SAVANT EST UNE PART.
const inclusionLogue = barre("-logue : qui étudie", [
  { label: "cardio" },
  { label: "dermato" },
  { label: "ophtalmo" },
  { label: "…" },
]);

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireFormation5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "vocabulaire-formation",
  titre: `La formation des mots en 5e (${ANNEE_SCOLAIRE})`,
  accroche:
    "Sur la porte d'un cabinet médical : « dermatologue ». Tu n'as jamais appris ce mot, et tu sais pourtant à quoi t'attendre — « -logue », c'est celui qui étudie, et « dermato- », c'est la peau. Le mot ne t'a rien caché : il était écrit en morceaux, et les morceaux ont deux mille ans.",
  identite: [
    { label: "Mots clés", valeur: "Radical, suffixe, dérivation, élément latin ou grec" },
    { label: "Le secret", valeur: "Le suffixe donne au mot son métier" },
    { label: "Outil", valeur: "Deux mots qui partagent un morceau" },
  ],
  definition: {
    texte:
      "Fabriquer un mot, c'est prendre un RADICAL — le morceau qui porte le sens — et lui accrocher quelque chose. Devant, un préfixe change le sens. Derrière, un SUFFIXE change le métier du mot : « courage » nomme la qualité, « courageux » qualifie la personne, « encourager » désigne l'action. Les trois sont de la même famille et disent la même idée ; ils ne s'emploient pas à la même place dans la phrase, et c'est le suffixe qui décide. Beaucoup de radicaux, enfin, ne sont pas français : ce sont des ÉLÉMENTS latins ou grecs, entrés dans la langue il y a des siècles et toujours actifs. « Géo- » la terre, « thermo- » la chaleur, « -phone » la voix, « port- » porter. En reconnaitre une quinzaine, c'est pouvoir lire des centaines de mots savants qu'on n'a jamais rencontrés — et pas seulement en français.",
  },
  figure: {
    schema: pile(familleCourage, familleNoble),
    legende:
      "Trois mots d'une même famille, et au-dessus de chacun, en gris, ce qu'il FAIT. Le radical est identique, l'idée aussi : c'est le suffixe, et lui seul, qui décide si le mot nommera la qualité, qualifiera une personne ou désignera une action. Choisir le bon mot d'une famille, c'est donc choisir le bon suffixe.",
  },
  proprietes: [
    {
      titre: "Le suffixe donne son métier au mot",
      texte:
        "Il ne change pas l'idée, il change ce que le mot peut faire dans la phrase : nommer, qualifier, agir.",
      schema: familleCourage,
      micros: ["5e_voc_formation"],
    },
    {
      titre: "Chaque suffixe a sa spécialité",
      texte:
        "« -eur » : celui qui fait. « -erie », « -esse » : l'ensemble ou la qualité. « -able » : ce qui peut être fait. « -ir » : devenir.",
      schema: pile(fabriqueVoyageur, fabriqueChevalerie),
      micros: ["5e_voc_formation"],
    },
    {
      titre: "Le faux frère est le vrai piège",
      texte:
        "« Courage », « encourager », « découragé » sont tous de la famille de « courageux ». Un seul répond à la définition demandée.",
      schema: mauvaisSuffixe,
      micros: ["5e_voc_formation"],
    },
    {
      titre: "Beaucoup de radicaux sont grecs ou latins",
      texte:
        "Ils ne s'emploient jamais seuls, seulement accrochés : « géo- » la terre, « thermo- » la chaleur, « -phone » la voix, « -graphe » l'écriture.",
      schema: pile(elementGeo, elementThermo),
      micros: ["5e_voc_etymologie"],
    },
    {
      titre: "Un élément reconnu ouvre plusieurs mots",
      texte:
        "« Port- » se retrouve dans transporter, portable, portefeuille. Une seule clé, et trois portes s'ouvrent d'un coup.",
      schema: pile(famillePort, familleAqua),
      micros: ["5e_voc_etymologie"],
    },
    {
      titre: "Les mots savants sont écrits en clair",
      texte:
        "« -logue » : celui qui étudie. Devant lui, ce qu'il étudie. Cardiologue, dermatologue, ophtalmologue : le mot dit son métier.",
      schema: inclusionLogue,
      micros: ["5e_voc_etymologie"],
    },
    {
      titre: "Le mot est jeune, ses morceaux sont vieux",
      texte:
        "« Téléphone » a été fabriqué au XIXe siècle avec deux mots grecs de l'Antiquité. Les morceaux ne vieillissent pas : ils resserviront.",
      schema: elementTele,
      micros: ["5e_voc_etymologie"],
    },
  ],
  reel: {
    texte:
      "Dans le hall d'un hôpital, il y a une liste de portes et personne pour te l'expliquer. Cardiologue, dermatologue, ophtalmologue, radiologue, pneumologue : cinq mots que tu n'as jamais appris, et tu peux trouver la bonne porte. « -logue », celui qui étudie ; devant, ce qu'il étudie — le cœur, la peau, l'œil, les rayons, le poumon. C'est vrai aussi de tes manuels : « géothermie », « hydraulique », « sismographe », « thermique », « biodiversité » n'ont pas à être appris un par un si l'on connait « géo », « hydro », « thermo », « bio » et « -graphe ». Une quinzaine d'éléments, et des centaines de mots deviennent lisibles — en SVT, en physique, en histoire, sur une notice ou sur un panneau.",
  },
  historique: {
    texte:
      "Le français a souvent pris le même mot latin DEUX FOIS, et il en garde les deux. Une première fois par la bouche des gens, en le déformant siècle après siècle : hospitale est devenu « hôtel ». Une seconde fois par la plume des savants, qui l'ont recopié tel quel du latin des livres : hospitale a donné « hôpital ». Les deux mots sont le même mot, séparés par mille ans d'usage — on les appelle des doublets. Il y en a des centaines : fragile et frêle, cause et chose, rigide et raide, potion et poison. La forme populaire est courte et usée par les bouches ; la forme savante est longue et intacte, parce qu'elle est venue par écrit. Quand un mot te parait long et compliqué, c'est souvent qu'il a voyagé sur du papier plutôt que dans des conversations.",
  },
  formule: {
    contexte: "Le geste qui donne le sens d'un élément latin ou grec inconnu.",
    expression: "je cherche deux autres mots qui portent le même morceau",
    legende:
      "Un élément seul ne veut rien dire : « aqua- » ne s'emploie jamais tout seul. Mais aquarium, aquatique et aqueduc, mis côte à côte, n'ont qu'une chose en commun — l'eau. Ce point commun EST le sens de l'élément, et il se trouve sans dictionnaire.",
    schema: familleAqua,
  },
  methode: [
    {
      titre: "Lire la définition avant de choisir le mot",
      texte:
        "Une qualité, une personne, une action, un ensemble ? Chacune appelle un suffixe différent. La définition te dit lequel, si tu la lis jusqu'au bout.",
      schema: mauvaisSuffixe,
      micros: ["5e_voc_formation"],
    },
    {
      titre: "Trouver le radical, puis remplir la place qui manque",
      texte:
        "Cache ce qu'il y a devant et derrière : ce qui reste porte le sens. Il ne reste plus qu'à accrocher le morceau demandé.",
      schema: fabriqueSouterrain,
      micros: ["5e_voc_formation"],
    },
    {
      titre: "Chercher deux autres mots qui portent le morceau",
      texte:
        "Ce que ces mots ont en commun est le sens de l'élément. « Thermomètre » et « thermal » : la chaleur, dans les deux.",
      schema: pile(famillePort, familleAqua),
      micros: ["5e_voc_etymologie"],
    },
    {
      titre: "Découper un mot savant en deux",
      texte:
        "Presque tous en ont exactement deux morceaux : ce dont on parle, et ce qu'on en fait. Géo + graphie. Thermo + mètre. Télé + phone.",
      schema: pile(elementGeo, elementThermo),
      micros: ["5e_voc_etymologie"],
    },
  ],
  usages: [
    {
      titre: "Pour écrire le mot juste plutôt que la périphrase",
      detail:
        "« L'ensemble des chevaliers » tient en un mot : la chevalerie. Une copie qui fabrique le mot exact gagne en précision et en place.",
      schema: fabriqueChevalerie,
      micros: ["5e_voc_formation"],
    },
    {
      titre: "Pour lire un manuel de sciences",
      detail:
        "« Hydrographie », « géothermie », « sismographe » : trois mots savants, six morceaux, et pas un seul à apprendre par cœur.",
      schema: pile(elementGeo, elementThermo),
      micros: ["5e_voc_etymologie"],
    },
    {
      titre: "Pour trouver la bonne porte",
      detail:
        "Sur une liste de spécialistes, une notice, un panneau : le mot savant dit son métier à qui sait le couper en deux.",
      schema: inclusionLogue,
      micros: ["5e_voc_etymologie"],
    },
  ],
  exemples: [
    {
      titre: "Fabriquer le mot demandé",
      donnees: "Le mot de la famille de « chevalier » qui nomme leur ensemble.",
      schema: fabriqueChevalerie,
      question: "Chevaleresque, chevaucher, chevalerie ou chevalière ?",
      solution:
        "CHEVALERIE. Le suffixe « -erie » fait un ensemble, un groupe : chevalerie, bijouterie, boulangerie. « Chevaleresque » qualifie (c'est un adjectif), « chevaucher » est une action, « chevalière » est une bague. Les quatre sont de la famille ; un seul nomme le groupe.",
      micros: ["5e_voc_formation"],
    },
    {
      titre: "Le suffixe de la personne",
      donnees: "Le mot de la famille de « voyage » qui désigne celui qui voyage.",
      schema: fabriqueVoyageur,
      question: "Voyagiste, voyager, voyageur ou convoyer ?",
      solution:
        "VOYAGEUR. « -eur » désigne celui qui fait l'action : voyageur, chanteur, joueur, menteur. Attention à « voyagiste » : « -iste » désigne un métier, celui qui VEND des voyages. Un suffixe de plus, et ce n'est plus la même personne.",
      micros: ["5e_voc_formation"],
    },
    {
      titre: "La place à remplir",
      donnees: "Le mot de la famille de « terre » qui dit « sous la terre ».",
      schema: fabriqueSouterrain,
      question: "Terrien, terrasse, souterrain ou atterrir ?",
      solution:
        "SOUTERRAIN. Ici ce n'est pas le suffixe qu'il faut changer mais le PRÉFIXE : la définition contient le mot « sous ». Trouve d'abord le radical — terr —, puis regarde quelle place la définition demande de remplir : devant ou derrière.",
      micros: ["5e_voc_formation"],
    },
    {
      titre: "Un élément grec",
      donnees: "« chrono- » se trouve dans chronomètre et chronologie.",
      schema: elementThermo,
      question: "Que signifie-t-il ?",
      solution:
        "LE TEMPS. Un chronomètre mesure le temps, une chronologie range les évènements dans le temps. Tu n'avais pas à le savoir : les deux mots donnés suffisaient, il fallait chercher ce qu'ils ont en commun. C'est la méthode, et elle marche pour tous les éléments.",
      micros: ["5e_voc_etymologie"],
    },
    {
      titre: "Un élément latin",
      donnees: "« manu- » se trouve dans manuscrit et manuel.",
      schema: famillePort,
      question: "Même question.",
      solution:
        "LA MAIN. Un manuscrit est écrit à la main, un travail manuel se fait avec les mains. Le même élément est dans « manutention » et dans « manœuvre ». Une fois « manu- » reconnu, cinq mots cessent d'être des mots à apprendre.",
      micros: ["5e_voc_etymologie"],
    },
    {
      titre: "Un mot savant jamais rencontré",
      donnees: "« hydrographie »",
      schema: elementGeo,
      question: "Que peut-il bien désigner ?",
      solution:
        "Coupe-le en deux : « hydro- », l'eau, et « -graphie », l'écriture ou la description. L'hydrographie décrit donc les eaux d'une région — ses rivières, ses ravines, ses nappes. Le mot ne cachait rien : il fallait le couper au bon endroit.",
      micros: ["5e_voc_etymologie"],
    },
  ],
  pieges: [
    "Choisir un mot de la bonne famille sans lire la définition : « courage » et « courageux » sont parents, un seul qualifie une personne.",
    "Croire que le suffixe change le sens : c'est le préfixe qui le fait. Le suffixe change le métier du mot.",
    "Confondre « -eur » (celui qui fait) et « -iste » (celui dont c'est le métier) : voyageur et voyagiste ne font pas le même voyage.",
    "Prendre le début d'un mot pour un élément ancien : le « ter- » de « terminer » n'est pas le « terr- » de « terrain ».",
    "Apprendre les éléments en liste : « aqua- » seul ne veut rien dire. Il s'apprend dans deux ou trois mots qui le portent.",
    "Croire qu'un mot long est un mot savant : « anticonstitutionnellement » est du français ordinaire, empilé.",
  ],
  aRetenir: [
    "Le radical porte le sens ; le SUFFIXE donne au mot son métier dans la phrase.",
    "Lis la définition jusqu'au bout : elle dit quelle place remplir, devant ou derrière.",
    "Une quinzaine d'éléments grecs et latins rendent lisibles des centaines de mots savants.",
    "Un élément se devine dans DEUX mots qui le portent, jamais tout seul.",
    "Un mot savant se coupe presque toujours en deux : ce dont on parle, ce qu'on en fait.",
  ],
  entrainement: [
    {
      question: "Le mot de la famille de « juste » qui nomme ce qui est juste ?",
      correction: "Justice. « Justement » est un adverbe, « justifier » une action.",
      micros: ["5e_voc_formation"],
    },
    {
      question: "Le mot de la famille de « peur » qui qualifie ce qui fait peur ?",
      correction: "Effrayant. « Peureux » qualifie celui qui A peur — c'est l'inverse.",
      micros: ["5e_voc_formation"],
    },
    {
      question: "Le mot de la famille de « guerre » qui désigne celui qui la fait ?",
      correction: "Guerrier. « Guerroyer » est l'action, « aguerri » un adjectif.",
      micros: ["5e_voc_formation"],
    },
    {
      question: "« bio- » se trouve dans biologie et biographie. Que signifie-t-il ?",
      correction: "La vie : l'étude de la vie, et le récit d'une vie.",
      micros: ["5e_voc_etymologie"],
    },
    {
      question: "« poly- » se trouve dans polygone et polyglotte. Que signifie-t-il ?",
      correction: "Plusieurs : plusieurs angles, plusieurs langues.",
      micros: ["5e_voc_etymologie"],
    },
    {
      question: "« vis- » se trouve dans vision et évident. Que signifie-t-il ?",
      correction: "Voir. Ce qui est évident se voit tout de suite.",
      micros: ["5e_voc_etymologie"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesVocabulaireFormation5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La formation des mots - 5e",
    section: {
      type: "objectif",
      phrase: "Un mot savant est écrit en clair",
      sousPhrase:
        "Il suffit de le couper au bon endroit. Ses morceaux ont deux mille ans et servent encore.",
      encadre: {
        titre: "L'idée",
        texte: "« Dermatologue » : la peau, et celui qui l'étudie. Rien à apprendre.",
      },
    },
  },
  {
    titre: "Le suffixe donne le métier",
    badge: "La formation des mots - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "courage", texte: "La qualité. C'est un nom : il peut être sujet ou complément." },
        { titre: "courageux", texte: "La personne. C'est un adjectif : il qualifie." },
        { titre: "encourager", texte: "L'action. C'est un verbe : il se conjugue." },
        { titre: "La règle", texte: "Même idée, même radical — le suffixe décide de la place." },
      ],
    },
    schema: familleCourage,
  },
  {
    titre: "Fabriquer le mot demandé",
    badge: "La formation des mots - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Je lis la définition jusqu'au bout : une qualité ? une personne ? un ensemble ?",
        "Je trouve le radical en cachant ce qu'il y a devant et derrière.",
        "Je regarde quelle place la définition demande de remplir.",
        "J'accroche le morceau — et je vérifie que le mot existe vraiment.",
      ],
    },
    schema: fabriqueSouterrain,
  },
  {
    titre: "Une clé, plusieurs portes",
    badge: "La formation des mots - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "« port- » : porter",
        contenu: "transporter, portable, portefeuille. Un élément latin, trois mots.",
      },
      droite: {
        titre: "« aqua- » : l'eau",
        contenu: "aquarium, aquatique, aqueduc. Le bassin, l'animal et le pont.",
      },
    },
    schema: pile(famillePort, familleAqua),
  },
  {
    titre: "Le même mot, pris deux fois",
    badge: "La formation des mots - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Le latin hospitale est entré dans le français DEUX fois.",
        "Par la bouche des gens, usé siècle après siècle : « hôtel ».",
        "Par la plume des savants, recopié tel quel : « hôpital ».",
        "Fragile et frêle, cause et chose : des centaines de doublets vivent ainsi.",
      ],
    },
    schema: elementTele,
  },
  {
    titre: "À vous",
    badge: "La formation des mots - 5e",
    section: {
      type: "exercice",
      enonce: "« hydravion, hydratation, hydrographie »",
      question: "Que signifie « hydro- » ?",
      indice: "Cherche ce que les trois mots ont en commun, pas ce qui les sépare.",
      correction:
        "L'EAU. Un hydravion se pose sur l'eau, l'hydratation apporte de l'eau au corps, l'hydrographie décrit les eaux d'une région. Trois mots suffisaient.",
    },
    schema: inclusionLogue,
  },
];
