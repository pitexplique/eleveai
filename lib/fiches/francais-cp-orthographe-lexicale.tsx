// ─── Fiche d'activité : la lettre qui commande sa voisine (CP) ────────────────
// DOUZIÈME FICHE DU CYCLE 2. Le BO la range sous « Vocabulaire — Mémoriser
// l'orthographe lexicale » et lui donne cinq objectifs au CP.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE UNIFIE LES TROIS RÈGLES DU POOL, QUI SEMBLENT SANS RAPPORT.
// Le pool écrit trois fois la même consigne, à trois endroits différents :
//   · « Compte les s. Un seul s entre deux voyelles chante z. »
//   · « Regarde la lettre qui vient juste après le c. »
//   · « Devant m, b et p, le n devient m. »
// Trois règles, une seule idée : **une lettre ne se lit pas toute seule — c'est
// sa VOISINE qui décide.** Apprises séparément, ce sont trois caprices à
// retenir ; posées ensemble, c'est un réflexe : avant de lire ou d'écrire une
// lettre douteuse, on regarde celle d'à côté.
//
// ⭐ ET LA PAIRE « poison / poisson » PORTE TOUT : mêmes lettres, un s de plus,
// et deux choses qui n'ont rien à voir. Un enfant qui écrit « poison » pour
// l'animal n'a pas mal écouté — il a écrit ce qu'il entendait.
//
// ⛔ LA LETTRE MUETTE N'EST PAS LE SUJET DE CETTE FICHE. `cp_orthlex_lettre_muette`
// dit la même chose que `cp_dict_lettres_muettes`, déjà porté par la fiche de
// dictée (chat → chaton). Elle est donc RAPPELÉE ici en une propriété, sans
// refaire la démonstration : deux fiches qui enseignent deux fois la même chose
// se volent mutuellement une place.
//
// ⛔ AUCUNE EXCEPTION AU CP, et le pool s'en explique : « bonbon » garde son n
// devant le b et contredit la règle du m. Le BO demande la règle « dans des
// mots fréquemment rencontrés », pas la liste de ses accidents.
//
// ⭐ POURQUOI CETTE NOTION MAINTENANT : ses 7 micros partent toutes de
// `grapheme_phoneme` ou de `ecriture_mots` — deux fiches déjà écrites — et
// convergent sur un défi.
//
// Les 7 micros sont couvertes :
// - cp_orthlex_nommer_accents → propriété 1, entrainements 1 et 2
// - cp_orthlex_valeur_s       → figure, propriété 2, exemple 1, entrainements 3 et 4
// - cp_orthlex_valeur_c_g     → propriété 3, entrainements 5 et 6
// - cp_orthlex_m_devant_mbp   → propriété 4, méthode 2, entrainements 7 et 8
// - cp_orthlex_lettre_muette  → propriété 5 (rappel), entrainement 9
// - cp_orthlex_mots_frequents → méthode 1, entrainement 10
// - cp_orthlex_defi           → exemple 2, entrainement 10
//
// ⛔ AUCUNE NOTATION PHONÉTIQUE : le pool écrit « [z] », la feuille écrit « le
// son z, celui de zébu ».
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/orthographe-lexicale.bank.ts`.

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

function lignes(opts: { modele?: string; aRepasser?: boolean; largeur?: number }) {
  return (
    <div className="reglure">
      <CanvasRenderer
        figure={{
          kind: "reglure",
          modele: opts.modele,
          lignes: 3,
          interligne: 3,
          aRepasser: opts.aRepasser,
          depart: true,
          size: { width: opts.largeur ?? 250 },
        }}
      />
    </div>
  );
}

function etiquettes(opts: {
  cases: string[];
  focus?: number[];
  legende?: string;
  largeur?: number;
}) {
  const mots: PhraseCanvasMot[] = opts.cases.map((c, i) => ({
    texte: c,
    focus: opts.focus?.includes(i),
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
 * ⭐⭐ LA FIGURE : UN SEUL S DE DIFFÉRENCE, ET DEUX MOTS QUI N'ONT RIEN À VOIR.
 * C'est la démonstration la plus courte qu'une lettre ne se lit pas seule — et
 * l'enfant qui écrit « poison » pour l'animal n'a pas mal écouté.
 */
const poisonEtPoisson = etiquettes({
  cases: ["poison", "poisson"],
  focus: [1],
  legende: "Un seul s entre deux voyelles chante z. Deux s sifflent.",
  largeur: 280,
});

/* ⛔ LA PROPRIÉTÉ NE REPREND PAS LA FIGURE (vu au rendu, 04/09). « poison /
   poisson » servait aux deux, à quinze centimètres d'écart sur la même page :
   un dessin répété n'apprend rien la seconde fois.
   ⭐ Et les deux disent des choses différentes. La paire minimale MONTRE que la
   lettre voisine décide ; la liste, elle, fait TRIER — quatre mots, deux
   familles, et l'enfant doit ranger. C'est le passage de l'exemple à la règle. */
const unSOuDeuxS = etiquettes({
  cases: ["maison", "rose", "poisson", "tasse"],
  focus: [2, 3],
  legende: "Un seul s entre deux voyelles chante z. Deux s sifflent.",
  largeur: 320,
});

const lesTroisAccents = etiquettes({
  cases: ["é", "è", "ê"],
  legende: "L'aigu monte, le grave descend, le circonflexe est un chapeau.",
  largeur: 240,
});

/** ⭐ Le c change de son sans changer de forme : ce qui décide, c'est la lettre
 *  d'après. Même chose pour le g. */
const leCEtSaVoisine = etiquettes({
  cases: ["cari", "cerise", "lagon", "girafe"],
  focus: [1, 3],
  legende: "Devant e et i, le c et le g changent de son.",
  largeur: 320,
});

const leNDevientM = etiquettes({
  cases: ["jambe", "tambour", "pompier"],
  legende: "Devant m, b et p, le n devient m.",
  largeur: 300,
});

const laLettreQuiSeReveille = etiquettes({
  cases: ["gros", "grossir"],
  focus: [1],
  legende: "Comme pour la dictée : la famille réveille la lettre muette.",
  largeur: 260,
});

const jeRegardeLaVoisine = perso({
  personnage: "teo",
  pose: "montre",
  expression: "pense",
  bulle: { texte: "Et la lettre d'après ?" },
  consigne: "Avant de lire une lettre, je regarde celle qui la suit.",
});

const lesMotsQuOnRevoit = perso({
  personnage: "nina",
  pose: "bras_leves",
  expression: "yeux_fermes",
  bulle: { texte: "maison" },
  consigne: "Certains mots reviennent tous les jours : on finit par les revoir.",
});

/* ─── Les dessins DES EXERCICES ────────────────────────────────────────────────
   ⭐⭐ AU CYCLE 2, UN EXERCICE SE FAIT AU CRAYON.
   ⛔ Ni `consigne` ni `legende` ici : l'énoncé numéroté les porte déjà.
   ⛔ Et aucune `marque` : entourer d'avance, c'est donner la réponse.
   ⚠️ Les pièges restent PHONÉTIQUEMENT PLAUSIBLES, comme dans le pool :
   « maizon », « écolle ». Une anagramme ne trompe personne ; ce qu'un enfant
   écrit vraiment, c'est ce qu'il entend. */

const exAccentsANommer = etiquettes({ cases: ["é", "è", "ê"], largeur: 220 });

const exMotsAccentues = etiquettes({
  cases: ["école", "très", "fête"],
  largeur: 280,
});

const exPoissonDessine = objets({
  elements: [{ quoi: "poisson" }],
  largeur: 170,
});

const exUnOuDeuxS = etiquettes({
  cases: ["poison", "poisson"],
  largeur: 260,
});

const exLeCDeuxSons = etiquettes({
  cases: ["cari", "cerise"],
  largeur: 260,
});

const exLeG = etiquettes({
  cases: ["lagon", "girafe"],
  largeur: 260,
});

const exNouM = etiquettes({
  cases: ["ja…be", "ta…bour", "ja…din"],
  largeur: 300,
});

const exEcrireJambe = lignes({ largeur: 280 });

const exFamille = etiquettes({
  cases: ["gros", "grossir"],
  largeur: 250,
});

const exMotFrequent = etiquettes({
  cases: ["maizon", "maison"],
  largeur: 250,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOrthographeLexicaleCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "orthographe_lexicale",
  // ⛔ Pas de deux-points : tous les h2 reprennent ce titre après un.
  titre: `La lettre qui commande sa voisine au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "« poison » et « poisson » : un seul s de différence, et deux choses qui n'ont rien à voir.",
  identite: [],
  definition: {
    texte: [
      "Une lettre ne se lit pas toujours pareil. Ce qui décide, c'est la lettre qui vient juste après elle.",
      "Un seul s entre deux voyelles chante comme un z : « poison ». Deux s sifflent : « poisson ». Le c et le g changent aussi de son devant e et i.",
      "Et devant m, b et p, le n se transforme en m : on écrit « jambe », pas « janbe ».",
    ].join("\n\n"),
  },
  figure: {
    schema: poisonEtPoisson,
  },
  proprietes: [
    {
      titre: "Les trois accents ont un nom",
      texte: "L'aigu monte, le grave descend, le circonflexe est un chapeau.",
      schema: lesTroisAccents,
      micros: ["cp_orthlex_nommer_accents"],
    },
    {
      titre: "Un s ou deux s",
      texte: "maison et rose chantent z. poisson et tasse sifflent.",
      schema: unSOuDeuxS,
      micros: ["cp_orthlex_valeur_s"],
    },
    {
      titre: "Le c et le g regardent la lettre d'après",
      texte: "cari, mais cerise. lagon, mais girafe.",
      schema: leCEtSaVoisine,
      micros: ["cp_orthlex_valeur_c_g"],
    },
    {
      titre: "Devant m, b et p, le n devient m",
      texte: "jambe, tambour, pompier. Jamais « janbe ».",
      schema: leNDevientM,
      micros: ["cp_orthlex_m_devant_mbp"],
    },
    {
      titre: "Et la lettre muette se retrouve en famille",
      texte: "gros → grossir. C'est le même geste que sous la dictée.",
      schema: laLettreQuiSeReveille,
      micros: ["cp_orthlex_lettre_muette"],
    },
  ],
  reel: {
    texte:
      "C'est ce qui évite d'écrire « poison » quand on parle d'un poisson : un seul s change le sens, et personne ne l'entend.",
  },
  historique: { texte: "" },
  methode: [
    {
      titre: "Je regarde la lettre d'après",
      texte: "Avant de lire ou d'écrire un s, un c, un g ou un n, je regarde sa voisine.",
      schema: jeRegardeLaVoisine,
      micros: ["cp_orthlex_valeur_s", "cp_orthlex_valeur_c_g", "cp_orthlex_m_devant_mbp"],
    },
    {
      titre: "Je revois le mot dans mon cahier",
      texte: "Certains mots reviennent tous les jours : ils finissent par se photographier.",
      schema: lesMotsQuOnRevoit,
      micros: ["cp_orthlex_mots_frequents"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Un s de trop, ou de moins",
      donnees: "« poison » et « poisson »",
      question: "Pourquoi ne se lisent-ils pas pareil ?",
      solution:
        "Le s de « poison » est seul entre deux voyelles : il chante z. Les deux s de « poisson » sifflent.",
      schema: poisonEtPoisson,
      micros: ["cp_orthlex_valeur_s"],
    },
    {
      titre: "Deux vérifications d'un coup",
      donnees: "On te dicte « jambe ».",
      question: "Quelles sont les deux choses à regarder ?",
      solution:
        "La lettre après le n : c'est un b, donc on écrit m. Et le e de la fin, qu'on entend à peine.",
      schema: leNDevientM,
      micros: ["cp_orthlex_m_devant_mbp", "cp_orthlex_defi"],
    },
  ],
  pieges: [
    "Un s seul entre deux voyelles ne siffle pas : il chante z. « poison » n'est pas « poisson ».",
    "Devant m, b et p, on n'écrit jamais n : c'est « jambe », pas « janbe ».",
  ],
  aRetenir: [
    "Une lettre ne se lit pas seule : c'est sa voisine qui décide.",
    "Un s entre deux voyelles chante z. Deux s sifflent.",
    "Le c et le g changent de son devant e et i.",
    "Devant m, b et p, le n devient m.",
    "L'accent aigu monte, le grave descend, le circonflexe est un chapeau.",
  ],
  /* ⭐ Dix exercices, neuf avec un support. Les corrections s'impriment sur
     leur propre page. */
  entrainement: [
    {
      question: "Écris le nom de chaque accent sous sa lettre.",
      correction: "é : accent aigu. è : accent grave. ê : accent circonflexe.",
      schema: exAccentsANommer,
      micros: ["cp_orthlex_nommer_accents"],
    },
    {
      question: "Entoure le mot qui porte un accent circonflexe.",
      correction: "« fête ». « école » a un aigu, « très » un grave.",
      schema: exMotsAccentues,
      micros: ["cp_orthlex_nommer_accents"],
    },
    {
      question: "Écris le nom de ce dessin. Combien de s faut-il ?",
      correction: "« un poisson », avec deux s. Avec un seul, ce serait « poison ».",
      schema: exPoissonDessine,
      micros: ["cp_orthlex_valeur_s"],
    },
    {
      question: "Entoure le mot où le s chante comme un z.",
      correction: "« poison » : un seul s entre deux voyelles. Dans « poisson », les deux s sifflent.",
      schema: exUnOuDeuxS,
      micros: ["cp_orthlex_valeur_s"],
    },
    {
      question: "Colorie le c dans les deux mots. Se lit-il pareil ?",
      correction: "Non. Devant le a de « cari » il fait k ; devant le e de « cerise » il fait s.",
      schema: exLeCDeuxSons,
      micros: ["cp_orthlex_valeur_c_g"],
    },
    {
      question: "Même travail avec le g. Quelle lettre décide ?",
      correction: "Celle qui suit : le a de « lagon », le i de « girafe ».",
      schema: exLeG,
      micros: ["cp_orthlex_valeur_c_g"],
    },
    {
      question: "Complète avec n ou m.",
      correction: "jambe et tambour prennent un m (devant b), jardin garde son n (devant d).",
      schema: exNouM,
      micros: ["cp_orthlex_m_devant_mbp"],
    },
    {
      question: "Écris « jambe » sur les lignes. Quelle lettre commande le m ?",
      correction: "Le b qui suit. Devant m, b et p, le n devient m.",
      schema: exEcrireJambe,
      micros: ["cp_orthlex_m_devant_mbp"],
    },
    {
      question: "Quel mot de la famille réveille la lettre muette de « gros » ?",
      correction: "« grossir » : on y entend le s.",
      schema: exFamille,
      micros: ["cp_orthlex_lettre_muette"],
    },
    {
      question: "Barre l'écriture qui n'est pas la bonne, puis recopie l'autre.",
      correction: "On barre « maizon ». Ça se dit pareil, mais on écrit « maison » — un s entre deux voyelles chante déjà z.",
      schema: exMotFrequent,
      micros: ["cp_orthlex_mots_frequents", "cp_orthlex_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesOrthographeLexicaleCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "La lettre voisine - CP",
    section: {
      type: "objectif",
      phrase: "Une lettre ne se lit pas toute seule",
      sousPhrase: "« poison » et « poisson » : un seul s de différence.",
      encadre: {
        titre: "L'idée",
        texte: "C'est la lettre d'après qui décide du son.",
      },
    },
    schema: poisonEtPoisson,
  },
  {
    titre: "Trois règles, une seule idée",
    badge: "La lettre voisine - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "s / ss", texte: "poison, poisson" },
        { titre: "c et g", texte: "cari, cerise" },
        { titre: "n → m", texte: "devant m, b, p" },
      ],
    },
    schema: leCEtSaVoisine,
  },
  {
    titre: "Le réflexe",
    badge: "La lettre voisine - CP",
    section: {
      type: "etapes",
      etapes: [
        "Je vois un s, un c, un g ou un n.",
        "Je regarde la lettre juste après.",
        "Elle me dit comment le lire ou l'écrire.",
      ],
    },
    schema: jeRegardeLaVoisine,
  },
  {
    titre: "À vous",
    badge: "La lettre voisine - CP",
    section: {
      type: "exercice",
      enonce: "On te dicte « jambe ».",
      question: "Écrit-on « janbe » ou « jambe » ?",
      indice: "Regarde la lettre qui suit : m, b ou p ?",
      correction: "« jambe » : devant le b, le n devient m.",
    },
    schema: leNDevientM,
  },
];
