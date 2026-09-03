// ─── Fiche de cours : copier sans se tromper (CP) ─────────────────────────────
// DEUXIÈME FICHE DU CYCLE 2, et la première dont l'objet EST l'écriture : c'est
// elle qui fait vivre le canvas `reglure`.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ POURQUOI CETTE NOTION-LÀ EN DEUXIÈME. `copie` est la seule notion du CP
// dont les cinq micros forment UNE SEULE CHAINE, sans embranchement :
//
//   cp_copie_lettre → cp_copie_mot → cp_copie_phrase → cp_copie_strategie
//                                                    ↘ cp_copie_relire
//
// Aucune ligne de fracture, donc aucune décision de découpage à prendre — au
// contraire de `grammaire_phrase` et de ses onze micros en deux branches. Une
// notion = un objet cohérent, et celle-ci l'est déjà.
//
// Les 5 micros sont couvertes :
// - cp_copie_lettre     → propriétés 1 et 2, entrainement 1
// - cp_copie_mot        → exemple 1, entrainement 3
// - cp_copie_phrase     → figure, méthode 1, entrainement 5
// - cp_copie_strategie  → propriété 3, exemple 2, entrainement 2
// - cp_copie_relire     → propriété 4, méthode 2, entrainement 4
//
// ⭐ LA DÉCOUVERTE EST DANS LA DÉFINITION, et elle vient du pool : « copier
// lettre à lettre oblige à regarder le modèle à chaque lettre — on peut retenir
// plus gros ». Ce n'est pas une consigne de soin, c'est une STRATÉGIE : on
// prend un morceau, on le garde dans sa tête, on l'écrit d'un trait.
//
// ⭐ Et le second fil vient du même pool : « une lettre tracée à l'envers se lit
// peut-être, mais elle ne s'attachera pas à la suivante ». Voilà pourquoi le
// sens du tracé compte — pas pour la beauté, pour la SUITE.
//
// ⭐ Les modèles s'écrivent en MARELLE, la police cursive libre conçue pour
// l'enseignement de l'écriture à l'école élémentaire (Forge des communs
// numériques éducatifs, licence OFL) — embarquée le 02/09/2026. Avant elle, le
// modèle d'une fiche dont l'objet EST l'écriture était une manuscrite d'adulte.
//
// Aligné sur le pool de `lib/tutor-v4/questionBank/cp/francais/ecriture.bank.ts`
// (11 items sur les micros `cp_copie_*`). Le mot du pool est repris tel quel :
// « le margouillat ».

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PersonnageBulle,
  PersonnageExpression,
  PersonnageId,
  PersonnagePose,
} from "@/lib/tutor-v4/types";

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
 * ⭐ La réglure échappe au plafond de largeur du cycle 2 grâce à cette classe :
 * des lignes rétrécies sont des lignes où l'enfant ne peut plus écrire.
 *
 * ⭐⭐ TROIS LIGNES, JAMAIS DEUX (Frédéric, 02/09/2026 : « j'aime bien quand tu
 * mets trois lignes, et pas 2 »). Les trois ne sont pas décoratives, elles sont
 * les trois temps du geste : la 1re porte le MODÈLE, la 2e le pointillé qu'on
 * REPASSE, la 3e est VIDE — c'est là que l'enfant écrit seul. À deux lignes,
 * il n'a nulle part où écrire, et l'exercice s'arrête au repassage.
 */
function lignes(opts: {
  modele?: string;
  lignes?: number;
  aRepasser?: boolean;
  consigne?: string;
  largeur?: number;
}) {
  return (
    <div className="reglure">
      <CanvasRenderer
        figure={{
          kind: "reglure",
          modele: opts.modele,
          lignes: opts.lignes ?? 3,
          interligne: 3,
          aRepasser: opts.aRepasser,
          depart: true,
          consigne: opts.consigne,
          size: { width: opts.largeur ?? 250 },
        }}
      />
    </div>
  );
}

// ─── Les dessins ──────────────────────────────────────────────────────────────

const laPhraseACopier = lignes({
  modele: "Le margouillat dort.",
  lignes: 3,
  aRepasser: true,
  consigne: "Repasse la phrase, puis écris-la tout seul.",
  largeur: 320,
});

const leCheminDeLaLettre = lignes({
  modele: "a c d o q",
  aRepasser: true,
  consigne: "Pars du point vert. Ces lettres commencent par un petit tour.",
});

/** ⭐ Trois hauteurs dans un seul mot : le « l » monte, le « j » descend, les
 *  autres restent entre les deux. La réglure les montre sans un mot. */
const lesTroisHauteurs = lignes({
  modele: "le jardin",
  aRepasser: true,
  consigne: "Entoure la lettre qui descend sous la ligne.",
});

const parMorceaux = perso({
  personnage: "teo",
  pose: "debout",
  expression: "pense",
  bulle: { texte: "mar gouil lat", forme: "pensee" },
  consigne: "Colorie les trois morceaux du mot.",
});

const seRelire = perso({
  personnage: "zoe",
  pose: "montre",
  expression: "pense",
  bulle: { texte: "Et le point ?" },
  consigne: "Suis ta phrase du doigt, du début au point.",
});

const leModeleEtLaCopie = perso({
  personnage: "nina",
  pose: "debout",
  expression: "surpris",
  mode: "couleur",
  bulle: { texte: "le margoullat" },
  consigne: "Il manque une lettre. Laquelle ?",
});

/* ─── Les dessins DES EXERCICES ────────────────────────────────────────────────
   ⭐⭐ ICI LE SUPPORT VA DE SOI : la notion EST l'écriture, donc l'exercice est
   une réglure sur laquelle l'enfant copie pour de bon. Une question écrite sur
   la copie fait tout sauf copier.
   ⛔ Ni `consigne` ni `legende` sur ces dessins : l'énoncé numéroté la porte
   déjà, et la répéter sous les lignes fait deux lectures pour une instruction. */

const exLettresRondes = lignes({ modele: "a c d o q", aRepasser: true, largeur: 300 });
const exLettresQuiMontent = lignes({ modele: "l b h k", aRepasser: true, largeur: 300 });
const exLettreQuiDescend = lignes({ modele: "le jardin", aRepasser: true, largeur: 300 });
const exMotParMorceaux = lignes({ modele: "margouillat", aRepasser: true, largeur: 300 });
const exPhraseEntiere = lignes({ modele: "Le margouillat dort.", aRepasser: true, largeur: 320 });
const exDate = lignes({ modele: "lundi", aRepasser: true, largeur: 260 });

const exLeMotOublie = perso({
  personnage: "nina",
  pose: "debout",
  expression: "surpris",
  mode: "couleur",
  bulle: { texte: "le margoullat" },
  largeur: 260,
});

const exRelire = perso({
  personnage: "zoe",
  pose: "montre",
  expression: "pense",
  bulle: { texte: "Et le point ?" },
  largeur: 230,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCopieCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "copie",
  titre: `Copier sans se tromper au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "Copier, ce n'est pas dessiner les lettres une par une. C'est en retenir un morceau, et l'écrire d'un trait.",
  // ⛔ VIDE EXPRÈS, comme sur la première fiche du cycle 2.
  identite: [],
  definition: {
    texte: [
      "Copier, c'est écrire ce qu'on voit, sans rien changer.",
      "Chaque lettre se trace toujours par le même chemin. C'est ce qui permettra, plus tard, de les attacher les unes aux autres.",
      "Et on ne regarde pas le modèle à chaque lettre : on en retient un morceau, on le garde dans sa tête, puis on l'écrit d'un trait.",
    ].join("\n\n"),
  },
  figure: {
    schema: laPhraseACopier,
  },
  proprietes: [
    {
      titre: "Chaque lettre a son chemin",
      texte: "On part toujours du même endroit, dans le même sens.",
      schema: leCheminDeLaLettre,
      micros: ["cp_copie_lettre"],
    },
    {
      titre: "Chaque lettre a sa taille",
      texte: "Certaines montent, une descend, les autres restent entre les deux.",
      schema: lesTroisHauteurs,
      micros: ["cp_copie_lettre"],
    },
    {
      titre: "On copie par morceaux",
      texte: "mar — gouil — lat : un morceau dans la tête, puis on écrit.",
      schema: parMorceaux,
      micros: ["cp_copie_strategie"],
    },
    {
      titre: "On se relit du doigt",
      texte: "Du début au point, mot par mot.",
      schema: seRelire,
      micros: ["cp_copie_relire"],
    },
  ],
  reel: {
    texte:
      "Tu copies tous les jours : la date, un mot du tableau, une phrase de ton cahier. Bien copier, c'est aller vite sans avoir à tout recommencer.",
  },
  // ⛔ VIDE EXPRÈS : l'histoire d'une notion ne parle pas à un enfant de six ans.
  historique: { texte: "" },
  methode: [
    {
      titre: "Je regarde, je cache, j'écris",
      texte: "Je lis un morceau, je le garde dans ma tête, je l'écris.",
      schema: lignes({
        modele: "le margouillat",
        aRepasser: true,
        consigne: "Un morceau, puis un autre.",
      }),
      micros: ["cp_copie_phrase", "cp_copie_strategie"],
    },
    {
      titre: "Je me relis du doigt",
      texte: "Je compare ma copie et le modèle, mot par mot.",
      schema: seRelire,
      micros: ["cp_copie_relire"],
    },
  ],
  // ⛔ VIDE, comme sur l'étalon du cycle 3.
  usages: [],
  exemples: [
    {
      titre: "Une lettre a disparu",
      donnees: "Le modèle est : « le margouillat ».",
      question: "Un élève a écrit « le margoullat ». Qu'a-t-il oublié ?",
      solution: "Le « i » de « gouil ». On le voit en comparant lettre à lettre.",
      schema: leModeleEtLaCopie,
      micros: ["cp_copie_mot"],
    },
    {
      titre: "En combien de morceaux ?",
      donnees: "le margouillat",
      question: "Comment le copier sans lever les yeux vingt fois ?",
      solution: "En trois morceaux : mar — gouil — lat.",
      schema: parMorceaux,
      micros: ["cp_copie_strategie"],
    },
  ],
  pieges: [
    "Copier lettre à lettre oblige à regarder le modèle vingt fois.",
    "Une lettre tracée à l'envers se lit, mais elle ne s'attachera pas à la suivante.",
  ],
  aRetenir: [
    "Chaque lettre se trace par le même chemin.",
    "Certaines lettres montent, d'autres descendent.",
    "On copie par morceaux, pas lettre à lettre.",
    "On se relit du doigt, du début au point.",
  ],
  /* ⭐ Dix exercices, huit avec un support. Six sont des RÉGLURES : sur une
     fiche de copie, l'exercice doit faire écrire. Les corrections s'impriment
     sur leur propre page. */
  entrainement: [
    {
      question: "Pars du point vert et repasse. Ces lettres commencent toutes par un petit tour.",
      correction: "a, c, d, o, q : on part en haut, on tourne à gauche, on revient.",
      schema: exLettresRondes,
      micros: ["cp_copie_lettre"],
    },
    {
      question: "Repasse ces lettres, puis écris-les seul. Que font-elles toutes ?",
      correction: "Elles montent au-dessus des autres : l, b, h, k.",
      schema: exLettresQuiMontent,
      micros: ["cp_copie_lettre"],
    },
    {
      question: "Copie « le jardin », puis entoure la lettre qui descend sous la ligne.",
      correction: "Le « j » de jardin. Les autres restent entre les deux lignes.",
      schema: exLettreQuiDescend,
      micros: ["cp_copie_lettre"],
    },
    {
      question: "Pour copier une lettre, qu'est-ce qui compte le plus ?",
      correction: "La former dans le bon sens du tracé — sinon elle ne s'attachera pas à la suivante.",
      micros: ["cp_copie_lettre"],
    },
    {
      question: "Copie « margouillat » en trois fois, un morceau à la fois.",
      correction: "mar — gouil — lat. Un morceau dans la tête, puis on écrit sans regarder.",
      schema: exMotParMorceaux,
      micros: ["cp_copie_strategie", "cp_copie_mot"],
    },
    {
      question: "Tu copies « le margouillat ». Quelle est la façon la plus rapide ?",
      correction: "Le prendre par morceaux : mar — gouil — lat. On regarde le modèle trois fois, pas onze.",
      micros: ["cp_copie_strategie"],
    },
    {
      question: "Modèle : « le margouillat ». Que manque-t-il dans ce que dit Nina ?",
      correction: "Le « i » de « gouil » : elle a écrit « margoullat ».",
      schema: exLeMotOublie,
      micros: ["cp_copie_mot"],
    },
    {
      question: "Copie la phrase entière, sans rien oublier.",
      correction: "« Le margouillat dort. » — la majuscule au début, et le point à la fin.",
      schema: exPhraseEntiere,
      micros: ["cp_copie_phrase"],
    },
    {
      question: "Suis ta phrase du doigt. Que vérifie-t-on en se relisant ?",
      correction: "Sa copie et le modèle, mot par mot, du début au point.",
      schema: exRelire,
      micros: ["cp_copie_relire"],
    },
    {
      question: "Copie le jour de la semaine. Qu'est-ce qu'on oublie souvent à la fin d'une phrase ?",
      correction: "Le point. On le cherche en dernier, avec le doigt.",
      schema: exDate,
      micros: ["cp_copie_phrase", "cp_copie_relire"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesCopieCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Copier - CP",
    section: {
      type: "objectif",
      phrase: "On copie par morceaux",
      sousPhrase: "Un morceau dans la tête, puis on l'écrit d'un trait.",
      encadre: { titre: "L'idée", texte: "Regarder moins souvent, écrire mieux." },
    },
  },
  {
    titre: "Chaque lettre a son chemin",
    badge: "Copier - CP",
    section: {
      type: "etapes",
      etapes: [
        "Je pars du point de départ.",
        "Je suis toujours le même chemin.",
        "C'est ainsi que les lettres s'attacheront.",
      ],
    },
    schema: leCheminDeLaLettre,
  },
  {
    titre: "mar — gouil — lat",
    badge: "Copier - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Lettre à lettre", texte: "On lève les yeux vingt fois." },
        { titre: "Par morceaux", texte: "On lève les yeux trois fois." },
        { titre: "Se relire", texte: "Du doigt, du début au point." },
      ],
    },
    schema: parMorceaux,
  },
  {
    titre: "À vous",
    badge: "Copier - CP",
    section: {
      type: "exercice",
      enonce: "Le modèle est « le margouillat ». Un élève a écrit « le margoullat ».",
      question: "Qu'a-t-il oublié ?",
      indice: "Compare lettre à lettre, de gauche à droite.",
      correction: "Le « i » de « gouil ».",
    },
    schema: leModeleEtLaCopie,
  },
];
