// ─── Fiche de cours : les temps simples (CM1) ─────────────────────────────────
// VINGT-TROISIÈME FICHE DU CHANTIER CM1, première des trois de conjugaison.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année » : « Conjugaisons à
// mémoriser et à maitriser : présent de l'indicatif, imparfait, futur, passé
// composé des verbes être et avoir, des verbes du premier et du deuxième groupe
// et des verbes irréguliers du troisième groupe (faire, aller, dire, venir,
// pouvoir, voir, vouloir, prendre) ».
//
// ⛔⛔ LE BO EST LE MÊME QU'AU CM2, MOT POUR MOT. La séparation ne peut donc pas
// venir du programme, et elle ne vient pas non plus des micros, qui portent les
// mêmes libellés. Elle vient de l'ANGLE :
//
//   | | CM1 (ici) | CM2 |
//   |---|---|---|
//   | le fil | ⭐ trouve l'INFINITIF, et tu as la clé des trois temps | voir ce qui bouge et ce qui ne bouge pas dans le tableau |
//   | le dessin qui porte | les WAGONS, un verbe à la fois | le TABLEAU des six personnes |
//
// ⛔ NE PAS REDIRE : « l'infinitif se cache dans le radical » est une légende du
// CM2, et « conjuguer, c'est voir ce qui bouge et ce qui ne bouge pas » est la
// raison d'être de son mode tableau. Le radical et la terminaison, eux,
// appartiennent à la notion SUIVANTE du CM1 (`conjugaison_formes`) : ne pas les
// développer ici.
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE FAIT DE L'INFINITIF UNE CLÉ PLUTÔT QU'UNE ÉTIQUETTE :
// AU FUTUR, L'INFINITIF EST ENCORE LÀ, EN ENTIER. « jouer » → « je jouERAI » ;
// « finir » → « je finIRAI ». L'enfant voit le mot du dictionnaire dans la forme
// conjuguée, ce qui rend le futur presque gratuit une fois l'infinitif trouvé.
// ⭐ Et à l'imparfait, l'autre moitié du cadeau : LES TERMINAISONS SONT LES MÊMES
// POUR TOUS LES VERBES — ais, ais, ait, ions, iez, aient. Sans exception.
//
// ⚠️⚠️ ET LA FICHE DIT OÙ LA RÈGLE S'ARRÊTE, comme celle des homophones l'a fait
// pour « ou / où » : le futur en infinitif entier ne vaut PAS pour les
// irréguliers que le BO nomme — « aller » donne « j'irai », pas « j'allerai ».
// Une règle qui prétend tout couvrir se fait démentir au premier contre-exemple,
// et l'élève cesse d'y croire. Le contre-exemple est donc DANS la fiche.
//
// ⭐ SIXIÈME GESTE DE L'ANNÉE, et il prolonge la grammaire : pour trouver
// l'infinitif, ON DIT « IL FAUT … ». Les cinq précédents étaient encadrer,
// enlever et déplacer, mettre au pluriel, réduire, mettre à l'imparfait.
//
// ⚠️ Le helper `train` n'écrit JAMAIS de couleur : `role` suffit, et la palette
// du canvas fait le reste. Convention reprise des fiches de conjugaison du CM2.
//
// Alignée sur le moteur paramétrique conjugationEngine.ts (présent / imparfait /
// futur / infinitif) et sur les verbes que le BO nomme.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// Micro-compétences couvertes (les 5 de la notion `conjugaison_temps_simples`) :
// - cm1_conj_infinitif_groupe → figure, propriétés 1 et 2, méthode 1, exemple 1
// - cm1_conj_present          → propriété 5, méthode 3, exemple 4
// - cm1_conj_imparfait        → propriété 4, méthode 2, exemple 3
// - cm1_conj_futur            → propriété 3, exemple 2
// - cm1_conj_simples_defi     → propriété 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { ConjugaisonLigne, ConjugaisonSegment } from "@/lib/tutor-v4/types";

/** Les wagons d'un verbe conjugué. ⚠️ N'écrit jamais de couleur : `role` suffit. */
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

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE DE RÉFÉRENCE : l'infinitif entier, visible dans le futur.
const futurDeJouer = train({
  infinitif: "jouer",
  pronom: "je",
  segments: [
    { texte: "jouer", role: "radical", note: "l'infinitif entier" },
    { texte: "ai", role: "personne", note: "je" },
  ],
  legende: "Au futur, le mot du dictionnaire est encore là en entier.",
});

const tableauImparfait = tableau({
  temps: "jouer, à l'imparfait",
  lignes: [
    { pronom: "je", radical: "jou", terminaison: "ais" },
    { pronom: "tu", radical: "jou", terminaison: "ais" },
    { pronom: "il", radical: "jou", terminaison: "ait" },
    { pronom: "nous", radical: "jou", terminaison: "ions" },
    { pronom: "vous", radical: "jou", terminaison: "iez" },
    { pronom: "ils", radical: "jou", terminaison: "aient" },
  ],
  legende: "Ces six fins sont les mêmes pour tous les verbes.",
});

const ilFautJouer = train({
  infinitif: "jouer",
  pronom: "il faut",
  segments: [{ texte: "jouer", role: "radical", note: "l'infinitif" }],
  legende: "Dis « il faut … » : ce qui suit est l'infinitif.",
});

const futurDeFinir = train({
  infinitif: "finir",
  pronom: "je",
  segments: [
    { texte: "finir", role: "radical", note: "l'infinitif entier" },
    { texte: "ai", role: "personne", note: "je" },
  ],
  legende: "Même chose pour le deuxième groupe : finir donne je finirai.",
});

const allerNObeitPas = train({
  infinitif: "aller",
  pronom: "j'",
  segments: [
    { texte: "ir", role: "radical", note: "pas « aller »" },
    { texte: "ai", role: "personne", note: "je" },
  ],
  legende: "« Aller » n'obéit pas : on dit « j'irai », jamais « j'allerai ».",
});

const tableauPresentFinir = tableau({
  temps: "finir, au présent",
  lignes: [
    { pronom: "je", radical: "fin", terminaison: "is" },
    { pronom: "tu", radical: "fin", terminaison: "is" },
    { pronom: "il", radical: "fin", terminaison: "it" },
    { pronom: "nous", radical: "finiss", terminaison: "ons", alerte: true },
    { pronom: "vous", radical: "finiss", terminaison: "ez", alerte: true },
    { pronom: "ils", radical: "finiss", terminaison: "ent", alerte: true },
  ],
  legende: "Le deuxième groupe ajoute « -iss- » au pluriel.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheConjugaisonTempsSimplesCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "conjugaison-temps-simples",
  titre: `Les temps simples en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Regarde bien « je jouerai » : le mot « jouer » est encore là, en entier. Trouve l'infinitif d'un verbe, et le futur ne te demande presque plus rien.",
  identite: [
    { label: "Mots clés", valeur: "Infinitif, groupe, présent" },
    { label: "Le secret", valeur: "L'infinitif est la clé des trois temps" },
    { label: "Outil", valeur: "Dis « il faut … »" },
  ],
  definition: {
    texte: [
      "Un verbe change d'habit à chaque phrase : je prends, nous prenions, il prendra. Mais c'est toujours le même verbe.",
      "Son vrai nom, celui du dictionnaire, s'appelle l'infinitif. Pour le trouver, dis « il faut … » : « il faut prendre ».",
      "La fin de l'infinitif donne son groupe : en -er pour le premier, en -ir qui fait « nous finissons » pour le deuxième, tout le reste pour le troisième.",
      "Et l'infinitif sert bien plus qu'à ranger : au futur, il est encore là en entier. « jouer » donne « je jouerai », « finir » donne « je finirai ».",
      "À l'imparfait, c'est encore plus simple : les six fins sont les mêmes pour tous les verbes — ais, ais, ait, ions, iez, aient.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(futurDeJouer, tableauImparfait),
  },
  proprietes: [
    {
      titre: "L'infinitif est le nom du verbe",
      texte: "C'est la forme du dictionnaire. Dis « il faut … » et tu l'as.",
      schema: ilFautJouer,
      micros: ["cm1_conj_infinitif_groupe"],
    },
    {
      titre: "La fin de l'infinitif donne le groupe",
      texte: "-er au premier, -ir qui fait « finissons » au deuxième, le reste au troisième.",
      schema: futurDeFinir,
      micros: ["cm1_conj_infinitif_groupe"],
    },
    {
      titre: "Au futur, l'infinitif est encore là",
      texte: "« jouer » donne « je jouerai ». Le mot entier est resté dedans.",
      schema: futurDeJouer,
      micros: ["cm1_conj_futur"],
    },
    {
      titre: "À l'imparfait, les fins ne changent jamais",
      texte: "ais, ais, ait, ions, iez, aient. Pour tous les verbes, sans exception.",
      schema: tableauImparfait,
      micros: ["cm1_conj_imparfait"],
    },
    {
      titre: "Au présent, il faut regarder de près",
      texte: "C'est là que les verbes se distinguent : « finir » ajoute -iss- au pluriel.",
      schema: tableauPresentFinir,
      micros: ["cm1_conj_present"],
    },
    {
      titre: "Le défi : huit verbes n'obéissent pas",
      texte: "faire, aller, dire, venir, pouvoir, voir, vouloir, prendre. Ceux-là s'apprennent.",
      schema: allerNObeitPas,
      micros: ["cm1_conj_simples_defi"],
    },
  ],
  reel: {
    texte:
      "Un ami s'habille autrement selon le jour, et tu le reconnais quand même. Un verbe fait pareil : « je vais », « nous allions », « il ira » sont trois habits, et dessous il n'y a qu'un seul verbe — aller.",
  },
  historique: {
    texte:
      "Le mot infinitif vient du latin infinitivus : qui n'est pas limité. Les autres formes disent qui parle et quand ; celle-là ne dit ni l'un ni l'autre. C'est pour ça qu'elle sert de nom au verbe dans le dictionnaire.",
  },
  methode: [
    {
      titre: "Dis « il faut … » pour trouver l'infinitif",
      texte: "« Nous finissons » donne « il faut finir ». Ce qui suit est l'infinitif.",
      schema: ilFautJouer,
      micros: ["cm1_conj_infinitif_groupe"],
    },
    {
      titre: "À l'imparfait, colle toujours les mêmes fins",
      texte: "Trouve le radical, puis ajoute ais, ais, ait, ions, iez, aient.",
      schema: tableauImparfait,
      micros: ["cm1_conj_imparfait"],
    },
    {
      titre: "Au présent, vérifie le pluriel",
      texte: "C'est au pluriel que les verbes du deuxième groupe se trahissent.",
      schema: tableauPresentFinir,
      micros: ["cm1_conj_present"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Nous finissons notre travail",
      donnees: "« Nous finissons notre travail. »",
      schema: ilFautJouer,
      question: "Quel est l'infinitif ?",
      solution:
        "« Finir ». Dis « il faut finir » : ça se dit. Et comme « nous finissons » fait -iss-, c'est un verbe du deuxième groupe.",
      micros: ["cm1_conj_infinitif_groupe"],
    },
    {
      titre: "Demain, je…",
      donnees: "Mets « jouer » au futur, avec « je ».",
      schema: futurDeJouer,
      question: "Qu'écris-tu ?",
      solution:
        "« Je jouerai ». Tu écris l'infinitif en entier, puis tu ajoutes -ai. Rien à retenir de plus.",
      micros: ["cm1_conj_futur"],
    },
    {
      titre: "Trois verbes, mêmes fins",
      donnees: "jouer, finir, prendre — à l'imparfait, avec « nous ».",
      schema: tableauImparfait,
      question: "Qu'ont-ils en commun ?",
      solution:
        "La fin : nous jouions, nous finissions, nous prenions. Trois verbes de groupes différents, et la même terminaison -ions.",
      micros: ["cm1_conj_imparfait"],
    },
    {
      titre: "Le verbe qui n'obéit pas",
      donnees: "Mets « aller » au futur, avec « je ».",
      schema: allerNObeitPas,
      question: "Peux-tu écrire l'infinitif entier ?",
      solution:
        "Non : on dit « j'irai », pas « j'allerai ». « Aller » fait partie des huit verbes que le programme demande d'apprendre par cœur.",
      micros: ["cm1_conj_simples_defi"],
    },
  ],
  pieges: [
    "Chercher l'infinitif au hasard au lieu de dire « il faut … ».",
    "Écrire « j'allerai » en appliquant la règle du futur à « aller ».",
    "Oublier le -iss- au pluriel des verbes du deuxième groupe.",
    "Changer les terminaisons de l'imparfait d'un verbe à l'autre.",
    "Confondre le groupe et le temps : ce sont deux questions différentes.",
  ],
  aRetenir: [
    "L'infinitif est le nom du verbe : dis « il faut … ».",
    "Sa fin donne le groupe : -er, -ir, le reste.",
    "Au futur, l'infinitif est encore là en entier.",
    "À l'imparfait : ais, ais, ait, ions, iez, aient.",
    "Huit verbes n'obéissent pas et s'apprennent par cœur.",
  ],
  entrainement: [
    {
      question: "Quel est l'infinitif de « nous finissons » ?",
      correction: "Finir.",
      micros: ["cm1_conj_infinitif_groupe"],
    },
    {
      question: "Mets « jouer » au futur avec « je ».",
      correction: "Je jouerai.",
      micros: ["cm1_conj_futur"],
    },
    {
      question: "Quelles sont les six terminaisons de l'imparfait ?",
      correction: "ais, ais, ait, ions, iez, aient.",
      micros: ["cm1_conj_imparfait"],
    },
    {
      question: "Que se passe-t-il au pluriel de « finir » au présent ?",
      correction: "Le verbe ajoute -iss- : nous finissons.",
      micros: ["cm1_conj_present"],
    },
    {
      question: "Pourquoi « j'allerai » est-il faux ?",
      correction: "« Aller » est irrégulier : on dit « j'irai ».",
      micros: ["cm1_conj_simples_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesConjugaisonTempsSimplesCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les temps simples - CM1",
    section: {
      type: "objectif",
      phrase: "L'infinitif est la clé",
      sousPhrase: "Dans « je jouerai », le mot « jouer » est encore là, en entier.",
      encadre: { titre: "L'idée", texte: "Dis « il faut … » et tu le trouves." },
    },
  },
  {
    titre: "Trois temps, trois façons",
    badge: "Les temps simples - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le futur", texte: "L'infinitif entier, puis -ai." },
        { titre: "L'imparfait", texte: "ais, ais, ait, ions, iez, aient." },
        { titre: "Le présent", texte: "C'est là qu'il faut regarder." },
      ],
    },
    schema: futurDeJouer,
  },
  {
    titre: "Comme un ami",
    badge: "Les temps simples - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Il s'habille autrement selon le jour.",
        "Tu le reconnais quand même.",
        "« je vais », « nous allions », « il ira » : un seul verbe.",
      ],
    },
    schema: ilFautJouer,
  },
  {
    titre: "À vous",
    badge: "Les temps simples - CM1",
    section: {
      type: "exercice",
      enonce: "Mets « aller » au futur, avec « je ».",
      question: "Peux-tu écrire l'infinitif entier ?",
      indice: "Essaie « j'allerai » à voix haute.",
      correction: "Non : on dit « j'irai ». C'est un des huit verbes à apprendre.",
    },
    schema: allerNObeitPas,
  },
];
