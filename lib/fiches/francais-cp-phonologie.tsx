// ─── Fiche d'activité : écouter les sons des mots (CP) ────────────────────────
// SIXIÈME FICHE DU CYCLE 2, et la FONDATION : `grapheme_phoneme`,
// `lecture_syllabique`, puis toute la lecture en dépendent. Un enfant qui ne
// sépare pas les sons ne peut pas les rattacher à des lettres.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE VIENT DU POOL, ET C'EST UNE PHRASE ENTIÈRE :
// « Les lettres, ça se voit. Les syllabes, ça s'entend. »
// Elle est portée par un contre-exemple que le pool pose tel quel : Léo dit que
// « margouillat » a onze syllabes parce qu'il a onze lettres. Onze lettres,
// trois frappes. Un enfant qui compte des lettres trouve TOUJOURS trop, et rien
// dans le mot ne le prévient — il faut le lui montrer.
//
// ⭐ ET LA MÉTHODE EST PHYSIQUE, pas verbale : « ferme les yeux et frappe dans
// tes mains ». Les yeux fermés, on ne PEUT plus compter les lettres. Ce n'est
// pas une astuce de confort, c'est ce qui rend l'erreur impossible — la seule
// consigne de la fiche qui supprime le piège au lieu d'en avertir.
//
// ⭐ POURQUOI CETTE NOTION MAINTENANT : ses 6 micros forment un arbre à UNE
// racine qui converge sur un défi (`compter` → `découper` et `rime`, puis
// `son_identifier` → `son_position`, et le défi réunit les deux branches). Un
// objet cohérent, aucun découpage à décider.
//
// Les 6 micros sont couvertes :
// - cp_phono_syllabe_compter    → figure, propriété 1, méthode 1, entrainements 1 à 5
// - cp_phono_syllabe_decouper   → propriété 2, exemple 1, entrainement 6
// - cp_phono_rime_reconnaitre   → propriété 3, exemple 2, entrainements 7 et 8
// - cp_phono_son_identifier     → propriété 4, méthode 2, entrainement 9
// - cp_phono_son_position       → propriété 4, entrainement 10
// - cp_phono_defi               → méthode 2, entrainements 9 et 10
//
// ⛔ AUCUNE NOTATION PHONÉTIQUE. Le pool écrit « [u] (ou) » — c'est bon pour un
// corrigé lu par un adulte, pas pour une feuille que l'enfant a sous les yeux.
// Frédéric l'a tranché sur la vidéo des lettres : « [a] » est une notation de
// spécialiste. Ici, un son se nomme par un mot qui le contient : « le son de
// chou », « le son a ».
//
// ⛔ ET AUCUN MOT À « E » MUET FINAL, comme le pool s'en explique : « porte » se
// dit en une syllabe à Paris et souvent en deux à La Réunion. Compter ces
// mots-là punirait un enfant d'ici pour son accent. Tous les mots de cette
// feuille se découpent pareil partout.
//
// ⚠️ Les mots de l'île sont là au même titre que les autres — « margouillat »
// vient du pool, pas d'une couleur locale ajoutée après coup.
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/conscience-phonologique.bank.ts`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ObjetsElement,
  PersonnageBulle,
  PersonnageExpression,
  PersonnageId,
  PersonnagePose,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

function objets(opts: {
  elements: ObjetsElement[];
  colonnes?: number;
  mode?: "couleur" | "coloriage";
  consigne?: string;
  largeur?: number;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "objets",
        elements: opts.elements,
        colonnes: opts.colonnes,
        mode: opts.mode ?? "coloriage",
        consigne: opts.consigne,
        size: { width: opts.largeur ?? 250 },
      }}
    />
  );
}

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

/**
 * ⭐ LE CANVAS DE LA PHRASE SERT ICI DE MOT DÉCOUPÉ : une étiquette par
 * syllabe, et la ligne des « natures » porte le NUMÉRO DE LA FRAPPE. C'est le
 * même objet que la grammaire — un mot dans une boite, un nom au-dessus — mais
 * ce qu'il nomme n'est plus une classe grammaticale, c'est un temps du geste.
 *
 * ⚠️ Le nom au-dessus reste à UN CARACTÈRE. Les natures se centrent sur leur
 * mot et se chevauchent dès qu'elles sont plus larges que lui ; « mar » et
 * « pil » sont des étiquettes courtes, « début » ou « milieu » les déborderaient
 * (défaut déjà payé sur la fiche de grammaire, où deux natures nommées côte à
 * côte donnaient « déterminadjectif »).
 *
 * ⭐ Et le dessin porte du TEXTE : il échappe au plafond de largeur du cycle 2
 * par `.dessin-mots`, sans quoi les syllabes tombent sous le plancher de lecture.
 */
function motDecoupe(opts: {
  syllabes: string[];
  numerote?: boolean;
  focus?: number;
  legende?: string;
  largeur?: number;
}) {
  const mots: PhraseCanvasMot[] = opts.syllabes.map((s, i) => ({
    texte: s,
    nature: opts.numerote ? String(i + 1) : undefined,
    focus: opts.focus === i,
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

// ─── Les dessins ──────────────────────────────────────────────────────────────

/**
 * ⭐⭐ LA FIGURE EST LA CONTRADICTION ELLE-MÊME. Onze lettres au-dessus, trois
 * boites en dessous : l'enfant n'a pas besoin qu'on lui explique l'écart, il le
 * voit. C'est l'exemple du pool, repris tel quel.
 */
const margouillatDecoupe = motDecoupe({
  syllabes: ["mar", "gouil", "lat"],
  numerote: true,
  legende: "« margouillat » : onze lettres, et seulement trois frappes.",
  largeur: 300,
});

/* ⛔ `yeux_fermes`, ET C'EST TOUT L'INTÉRÊT DU DESSIN. Avec `sourire`, Nina
   annonçait « Je ferme les yeux » en regardant droit devant elle : le dessin
   démentait sa propre bulle, et la seule consigne de la fiche qui SUPPRIME le
   piège au lieu d'en avertir passait pour une figure de style. L'expression
   n'existait pas ; elle a été ajoutée pour cette fiche. */
const fermerLesYeux = perso({
  personnage: "nina",
  pose: "bras_leves",
  expression: "yeux_fermes",
  bulle: { texte: "Je ferme les yeux." },
  consigne: "Les yeux fermés, on ne peut plus compter les lettres.",
});

/** ⭐ Trois mots à frapper, et un seul tient en une frappe. Les étiquettes ne
 *  sont PAS découpées : le découpage est le travail, pas la consigne. */
const troisMotsAFrapper = objets({
  elements: [
    { quoi: "chat", label: "un chat" },
    { quoi: "bateau", label: "un bateau" },
    { quoi: "papillon", label: "un papillon" },
  ],
  colonnes: 2,
  consigne: "Frappe chaque mot. Entoure celui qui n'a qu'une seule frappe.",
  largeur: 300,
});

/** ⭐ La rime se joue sur la FIN, et deux des trois dessins finissent pareil.
 *  Le troisième commence comme l'un d'eux — c'est le début qui trompe l'œil. */
const laFinQuiChantePareil = objets({
  elements: [
    { quoi: "chapeau", label: "un chapeau" },
    { quoi: "bateau", label: "un bateau" },
    { quoi: "chat", label: "un chat" },
  ],
  colonnes: 2,
  consigne: "Deux mots finissent par le même son. Entoure-les.",
  largeur: 300,
});

const auRalenti = perso({
  personnage: "teo",
  pose: "debout",
  expression: "pense",
  bulle: { texte: "sssoleil", forme: "pensee" },
  consigne: "Dire le mot au ralenti fait sortir les sons un par un.",
});

/** ⭐ Le son cherché est mis en avant à sa place : ni au début, ni au milieu. */
const ouSeCacheLeSon = motDecoupe({
  syllabes: ["cho", "co", "lat"],
  focus: 2,
  legende: "Dans « chocolat », le son a s'entend à la fin.",
  largeur: 300,
});

const laMaisonQuiRime = objets({
  elements: [{ quoi: "maison", label: "une maison" }],
  mode: "couleur",
  consigne: "« maison » et « garçon » : la fin chante pareil.",
  largeur: 200,
});

/* ─── Les dessins DES EXERCICES ────────────────────────────────────────────────
   ⭐⭐ AU CYCLE 2, UN EXERCICE SE FAIT AU CRAYON (Frédéric, 03/09/2026 :
   « intégrer des images des feuilles précédentes »). Dix questions écrites, à
   six ans, c'est dix déchiffrages avant le premier travail ; dix supports à
   entourer, colorier ou barrer, c'est dix fois le geste qu'on enseigne.
   ⭐ Et les dessins sont ceux DU COURS, volontairement : on ne découvre pas une
   figure au moment d'être évalué dessus.
   ⛔ ET AUCUNE `consigne` SUR CES DESSINS-LÀ (vu au rendu du PDF, 03/09). Le
   canvas écrit sa consigne en légende, et l'énoncé numéroté la portait déjà :
   la même phrase s'imprimait deux fois, au-dessus et en dessous du dessin. Pour
   un enfant qui déchiffre encore, c'est deux lectures pour une seule
   instruction. Ici, c'est l'énoncé qui commande ; le dessin est le support. */

const exFrapper = objets({
  elements: [
    { quoi: "chat", label: "un chat" },
    { quoi: "papillon", label: "un papillon" },
  ],
  colonnes: 2,
  largeur: 260,
});

/* ⛔ AUCUN MOT À « E » MUET FINAL, ICI NON PLUS. « arbre », « voiture »,
   « pomme » et « livre » étaient écrits en premier jet : ils se disent en une
   syllabe à Paris et souvent en deux à La Réunion, et un enfant d'ici aurait eu
   faux en comptant juste. Le pool s'en explique ; la feuille doit s'y tenir. */
const exCompterTrois = objets({
  elements: [
    { quoi: "cle", label: "une clé" },
    { quoi: "soleil", label: "un soleil" },
    { quoi: "papillon", label: "un papillon" },
  ],
  colonnes: 2,
  largeur: 280,
});

const exDecouperBateau = motDecoupe({
  syllabes: ["ba", "teau"],
  numerote: true,
  largeur: 260,
});

const exRimes = objets({
  elements: [
    { quoi: "chapeau", label: "un chapeau" },
    { quoi: "maison", label: "une maison" },
    { quoi: "bateau", label: "un bateau" },
    { quoi: "cle", label: "une clé" },
  ],
  colonnes: 2,
  largeur: 280,
});

const exIntrus = objets({
  elements: [
    { quoi: "chat", label: "un chat" },
    { quoi: "chapeau", label: "un chapeau" },
    { quoi: "ballon", label: "un ballon" },
  ],
  colonnes: 2,
  largeur: 280,
});

const exPosition = motDecoupe({
  syllabes: ["pa", "pil", "lon"],
  largeur: 260,
});

const exYeuxFermes = perso({
  personnage: "nina",
  pose: "bras_leves",
  expression: "yeux_fermes",
  bulle: { texte: "un papillon" },
  largeur: 230,
});

const exUneSeuleFrappe = objets({
  elements: [
    { quoi: "fleur", label: "une fleur" },
    { quoi: "bateau", label: "un bateau" },
  ],
  colonnes: 2,
  largeur: 260,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const fichePhonologieCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "conscience_phonologique",
  // ⛔ Pas de deux-points : tous les h2 reprennent ce titre après un.
  titre: `Écouter les sons des mots au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "« margouillat » a onze lettres et trois frappes. Les lettres, ça se voit ; les syllabes, ça s'entend.",
  identite: [],
  definition: {
    texte: [
      "Une syllabe, c'est un morceau de mot qu'on dit d'un seul souffle.",
      "Pour les compter, on ne regarde pas le mot : on le dit, et on frappe dans ses mains à chaque morceau.",
      "Les lettres, ça se voit. Les syllabes, ça s'entend. Ce n'est pas la même chose, et il y en a presque toujours moins qu'on ne croit.",
    ].join("\n\n"),
  },
  figure: {
    schema: margouillatDecoupe,
  },
  proprietes: [
    {
      titre: "On compte avec les mains",
      texte: "Une frappe par morceau. Les yeux fermés, on ne triche plus.",
      schema: fermerLesYeux,
      micros: ["cp_phono_syllabe_compter"],
    },
    {
      titre: "Chaque morceau se dit d'un souffle",
      texte: "chat : une frappe. ba-teau : deux. pa-pil-lon : trois.",
      schema: troisMotsAFrapper,
      micros: ["cp_phono_syllabe_decouper"],
    },
    {
      titre: "Deux mots riment quand leur fin chante pareil",
      texte: "C'est l'oreille qui décide, pas l'œil.",
      schema: laFinQuiChantePareil,
      micros: ["cp_phono_rime_reconnaitre"],
    },
    {
      titre: "Un son se cache quelque part",
      texte: "Au début, au milieu ou à la fin du mot.",
      schema: ouSeCacheLeSon,
      micros: ["cp_phono_son_identifier", "cp_phono_son_position"],
    },
  ],
  reel: {
    texte:
      "Écouter les sons d'un mot, c'est ce qui permettra de l'écrire. Tant qu'on ne les sépare pas, on ne sait pas quelles lettres poser.",
  },
  historique: { texte: "" },
  methode: [
    {
      titre: "Je ferme les yeux et je frappe",
      texte: "Une frappe par morceau, et je compte mes frappes.",
      schema: fermerLesYeux,
      micros: ["cp_phono_syllabe_compter", "cp_phono_syllabe_decouper"],
    },
    {
      titre: "Je dis le mot au ralenti",
      texte: "Les sons sortent un par un, et j'entends celui que je cherche.",
      schema: auRalenti,
      micros: ["cp_phono_son_identifier", "cp_phono_defi"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Onze lettres, trois frappes",
      donnees: "Léo dit : « margouillat a onze syllabes, parce qu'il a onze lettres. »",
      question: "A-t-il raison ?",
      solution:
        "Non. mar — gouil — lat : trois frappes. « ou », « ill » et « at » ne font qu'un son chacun.",
      schema: margouillatDecoupe,
      micros: ["cp_phono_syllabe_compter", "cp_phono_syllabe_decouper"],
    },
    {
      titre: "Ce que l'œil ne dit pas",
      donnees: "« maison » et « garçon »",
      question: "Est-ce que ces deux mots riment ?",
      solution:
        "Oui. mais-ON, gar-ÇON : la fin chante pareil, même si elle ne s'écrit pas pareil.",
      schema: laMaisonQuiRime,
      micros: ["cp_phono_rime_reconnaitre"],
    },
  ],
  pieges: [
    "On compte les frappes, jamais les lettres : il y en a presque toujours moins.",
    "Pour la rime, on écoute la fin. Deux mots peuvent rimer sans s'écrire pareil.",
  ],
  aRetenir: [
    "Une syllabe se dit d'un seul souffle.",
    "On compte les syllabes en frappant dans ses mains, les yeux fermés.",
    "Les lettres se voient, les syllabes s'entendent.",
    "Deux mots riment quand leur fin chante pareil.",
    "Un son se cache au début, au milieu ou à la fin d'un mot.",
  ],
  /* ⭐⭐ DIX EXERCICES, ET NEUF ONT UN SUPPORT À FAIRE AU CRAYON. Les
     corrections s'impriment sur leur PROPRE PAGE (cycle 2) : la feuille de
     l'enfant ne porte plus la réponse sous la question.
     ⭐ L'ordre suit la difficulté du pool : compter, découper, rimer, situer un
     son, puis les deux à la fois. Les deux derniers sont les seuls « défis ». */
  entrainement: [
    {
      question: "Frappe les deux mots. Entoure celui qui a le plus de frappes.",
      correction: "« papillon » : pa-pil-lon, trois frappes, contre une seule pour « chat ».",
      schema: exFrapper,
      micros: ["cp_phono_syllabe_compter"],
    },
    {
      question: "Écris sous chaque mot le nombre de frappes que tu entends.",
      correction: "clé → 1 frappe. so-leil → 2 frappes. pa-pil-lon → 3 frappes.",
      schema: exCompterTrois,
      micros: ["cp_phono_syllabe_compter"],
    },
    {
      question: "Combien de syllabes entends-tu dans « chat » ?",
      correction: "Une seule frappe. Le mot a quatre lettres, mais on ne compte pas les lettres.",
      micros: ["cp_phono_syllabe_compter"],
    },
    {
      question: "Ferme les yeux, dis le mot, et colorie une main par frappe.",
      correction: "Trois mains coloriées : pa-pil-lon.",
      schema: exYeuxFermes,
      micros: ["cp_phono_syllabe_compter"],
    },
    {
      question: "Entoure le mot qui n'a qu'une seule frappe.",
      correction: "« fleur ». « bateau » en a deux : ba-teau.",
      schema: exUneSeuleFrappe,
      micros: ["cp_phono_syllabe_compter"],
    },
    {
      question: "Colorie la première syllabe de « bateau ».",
      correction: "« ba ». La deuxième est « teau ».",
      schema: exDecouperBateau,
      micros: ["cp_phono_syllabe_decouper"],
    },
    {
      question: "Relie les deux mots dont la fin chante pareil.",
      correction: "« chapeau » et « bateau » : les deux finissent par le même son.",
      schema: exRimes,
      micros: ["cp_phono_rime_reconnaitre"],
    },
    {
      question: "Est-ce que « maison » et « garçon » riment ?",
      correction: "Oui : mais-ON, gar-ÇON. La fin chante pareil, même si elle ne s'écrit pas pareil.",
      micros: ["cp_phono_rime_reconnaitre"],
    },
    {
      question: "Deux mots commencent par le même son. Barre l'intrus.",
      correction: "On barre « ballon ». « chat » et « chapeau » commencent tous les deux par le son ch.",
      schema: exIntrus,
      micros: ["cp_phono_son_identifier", "cp_phono_defi"],
    },
    {
      question: "Entoure la syllabe où tu entends le son on.",
      correction: "« lon », la dernière : pa — pil — lon.",
      schema: exPosition,
      micros: ["cp_phono_son_position", "cp_phono_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesPhonologieCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Les sons des mots - CP",
    section: {
      type: "objectif",
      phrase: "Les lettres se voient, les syllabes s'entendent",
      sousPhrase: "« margouillat » : onze lettres, trois frappes.",
      encadre: {
        titre: "L'idée",
        texte: "On compte avec ses mains, pas avec ses yeux.",
      },
    },
    schema: margouillatDecoupe,
  },
  {
    titre: "On frappe dans ses mains",
    badge: "Les sons des mots - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "chat", texte: "1 frappe" },
        { titre: "ba-teau", texte: "2 frappes" },
        { titre: "pa-pil-lon", texte: "3 frappes" },
      ],
    },
    schema: troisMotsAFrapper,
  },
  {
    titre: "Je ferme les yeux",
    badge: "Les sons des mots - CP",
    section: {
      type: "etapes",
      etapes: [
        "Je ferme les yeux.",
        "Je dis le mot et je frappe à chaque morceau.",
        "Je compte mes frappes.",
      ],
    },
    schema: fermerLesYeux,
  },
  {
    titre: "À vous",
    badge: "Les sons des mots - CP",
    section: {
      type: "exercice",
      enonce: "« maison » et « garçon »",
      question: "Est-ce que ces deux mots riment ?",
      indice: "N'écoute que la fin des deux mots. Ferme les yeux.",
      correction: "Oui : la fin chante pareil, même si elle ne s'écrit pas pareil.",
    },
    schema: laFinQuiChantePareil,
  },
];
