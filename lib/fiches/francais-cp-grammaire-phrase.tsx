// ─── Fiche de cours : la phrase (CP) ──────────────────────────────────────────
// PREMIÈRE FICHE DU CYCLE 2. C'est un ESSAI DE FORMAT autant qu'une fiche :
// avant elle, le site comptait 0 fiche sur les 45 notions de CP, CE1 et CE2.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ CE QUE CETTE FICHE TESTE, ET QUI N'EST PAS SON CONTENU
//
// 1. ⛔ ON LAISSE TOMBER DES BLOCS. Le gabarit du cycle 3 en remplit neuf ; ici
//    `historique`, `usages` et `identite` sont VIDES, et le rendu les masque
//    tout seul (`FicheCoursClient` : `if (!fiche.historique.texte.trim()) return null`).
//    Un enfant de six ans n'a que faire de l'histoire d'une notion ni d'une
//    carte d'identité — ce sont des objets d'adulte. Alléger les mots ne
//    suffisait pas : c'est le NOMBRE DE BLOCS qui faisait la densité.
//
// 2. ⭐ LE DESSIN PORTE LA LEÇON, PAS LE TEXTE — parce qu'un CP NE PEUT PAS LIRE
//    SA FICHE. Chaque bloc porte un `personnage`, et la consigne du dessin est
//    l'exercice lui-même. Le texte est là pour l'adulte qui lit à voix haute.
//
// 3. ⭐ LE MODÈLE EST EN COULEUR, L'EXERCICE EST EN NOIR ET BLANC. La figure de
//    référence montre la phrase finie ; les dessins que l'enfant travaille sont
//    en `coloriage`, prêts à photocopier. C'est le même canvas, un seul réglage.
//
// 4. ⚠️ ON VARIE LES DESSINS. La fiche CM1 avait tiré 27 dessins de 2 kinds :
//    c'est la monotonie autant que la densité qui la rendait « chargée ». Ici
//    trois formes de bulle (parole, cri, pensée), quatre personnages, et le
//    canvas `phrase` pour l'ordre des mots.
//
// ⭐ LA DÉCOUVERTE EST DANS LA DÉFINITION : une phrase SE RECONNAIT À SES DEUX
// BOUTS. C'est ce qu'un enfant peut vérifier seul, sans savoir lire le milieu.
//
// ⭐⭐ LA NOTION `grammaire_phrase` DU CP PORTE 11 MICROS, ET CE N'EST PAS UN
// OBJET COHÉRENT — c'est son GRAPHE DE PRÉRÉQUIS qui le dit, pas une impression.
// Toutes descendent de `cp_gram_phrase_reconnaitre`, qui a DEUX enfants que
// rien ne relie ensuite :
//
//   branche PHRASE  : majuscule_point → types_phrases → forme_negative
//                     · forme_exclamative, et ordonner_phrase
//   branche MOTS    : nom_verbe → determinant · adjectif · pronom
//
// Elles ne se rejoignent qu'au `cp_gram_defi` final. Savoir où une phrase
// commence et finit, et savoir nommer les mots qui la composent, sont deux
// leçons.
//
// ✅ LA NOTION A ÉTÉ DÉCOUPÉE LE 02/09/2026, sur décision de Frédéric. Les cinq
// micros de la branche MOTS (nom_verbe, determinant, adjectif, pronom, defi)
// vivent maintenant sous `classes_mots`. ⭐ Et ce n'était pas une invention :
// le CE1 et le CE2 ont `classes_mots` depuis toujours, même libellé, même
// prérequis — le CP était la seule classe à ne pas séparer les deux.
// ⚠️ Les identifiants des micros n'ont PAS changé (`cp_gram_*`) : seul leur
// `notionId` a bougé, ce qui laisse intacts la banque et cette fiche.
//
// Cette fiche couvre donc TOUTE sa notion (6 micros sur 6) :
// - cp_gram_phrase_reconnaitre → définition, propriété 1, exemple 1
// - cp_gram_majuscule_point    → figure, propriété 2, méthode 2, exemple 1
// - cp_gram_types_phrases      → propriété 3
// - cp_gram_forme_exclamative  → propriété 3
// - cp_gram_forme_negative     → propriété 4, à retenir, entrainement 5
// - cp_gram_ordonner_phrase    → méthode 1, exemple 2
//
// ⚠️ La notion `classes_mots` du CP (nom, verbe, déterminant, adjectif, pronom,
// défi) attend SA fiche — 5 micros, 11 énoncés déjà dans la banque, et le coach
// l'ouvre correctement (96/96 micros vérifiées le 02/09).

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

// ─── Les dessins ──────────────────────────────────────────────────────────────

/** ⭐ LE MODÈLE : la phrase entière, ses deux bouts entourés. */
const modeleCouleur = perso({
  personnage: "nina",
  pose: "montre",
  expression: "sourire",
  mode: "couleur",
  bulle: { texte: "Le chat dort.", marques: ["majuscule", "point"] },
  largeur: 320,
});

/**
 * ⛔ LE MÊME MODÈLE, AU TRAIT, POUR LE PAPIER — et c'est le PDF qui l'a montré.
 *
 * À l'écran et en mode classe, Nina en couleur est le modèle fini : voilà à
 * quoi ressemble une phrase. Mais « les profs n'ont pas d'imprimante couleur » :
 * photocopiée, elle devient un aplat gris où la robe, la peau et le pantalon se
 * confondent. Sur le papier, le modèle sort donc au trait comme les exercices —
 * et l'enfant peut le colorier lui aussi.
 */
const modeleColoriage = perso({
  personnage: "nina",
  pose: "montre",
  expression: "sourire",
  mode: "coloriage",
  bulle: { texte: "Le chat dort.", marques: ["majuscule", "point"] },
  largeur: 320,
});

/**
 * ⭐ LE QUATRIÈME GESTE DE LA FEUILLE : TRACER. Frédéric, en posant le format du
 * cycle 2 : « avec l'importance aussi de la calligraphie ». La phrase modèle est
 * juste au-dessus ; l'enfant la repasse en pointillé, puis l'écrit seul.
 * Interligne de 3 mm, celui du cahier de CP.
 */
const laLigneAEcrire = (
  <div className="reglure">
    <CanvasRenderer
      figure={{
        kind: "reglure",
        modele: "Le chat dort.",
        lignes: 3,
        interligne: 3,
        aRepasser: true,
        depart: true,
        consigne: "Repasse, puis écris la phrase tout seul.",
        size: { width: 320 },
      }}
    />
  </div>
);

const laPhraseModele = (
  <div className="grid gap-3">
    <div className="print:hidden">{modeleCouleur}</div>
    <div className="hidden print:block">{modeleColoriage}</div>
    {laLigneAEcrire}
  </div>
);

const direQuelqueChose = perso({
  personnage: "teo",
  pose: "marche",
  expression: "sourire",
  bulle: { texte: "Je range mes billes." },
  consigne: "Colorie Téo. Il dit une phrase entière.",
});

const lesDeuxBouts = perso({
  personnage: "zoe",
  pose: "debout",
  expression: "sourire",
  bulle: { texte: "Ma tortue mange.", marques: ["majuscule", "point"] },
  consigne: "Colorie la grande lettre en bleu, le point en rouge.",
});

const leCri = perso({
  personnage: "ravi",
  pose: "bras_leves",
  expression: "rire",
  bulle: { texte: "Quelle belle mangue !", forme: "cri", marques: ["point"] },
  consigne: "Ici le point crie. Colorie-le en rouge.",
});

/**
 * ⭐ « ne … pas » — la seule micro de la branche PHRASE qui manquait.
 * Le dessin ne pouvait pas s'en charger seul : `marques` n'entoure que la
 * majuscule et le point. C'est donc la CONSIGNE qui porte l'exercice, et elle
 * demande un geste précis — colorier deux mots, pas « repérer la négation ».
 */
const direNon = perso({
  personnage: "nina",
  pose: "debout",
  expression: "surpris",
  bulle: { texte: "Je ne dors pas !", forme: "cri" },
  consigne: "Colorie les deux petits mots qui disent non.",
});

const laQuestion = perso({
  personnage: "zoe",
  pose: "debout",
  expression: "pense",
  bulle: { texte: "Où est mon cartable ?", forme: "pensee", marques: ["point"] },
  consigne: "Ici le point demande. Entoure-le.",
});

const picRelit = perso({
  personnage: "pic",
  mode: "couleur",
  bulle: { texte: "Je relis tout haut.", marques: ["majuscule", "point"] },
});

const motsMelanges = (
  <CanvasRenderer
    figure={{
      kind: "phrase",
      mots: [{ texte: "dort" }, { texte: "chat" }, { texte: "Le" }],
      largeurMax: 200,
    }}
  />
);

const motsRemis = (
  <CanvasRenderer
    figure={{
      kind: "phrase",
      mots: [{ texte: "Le" }, { texte: "chat" }, { texte: "dort" }],
      largeurMax: 200,
    }}
  />
);

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const fichePhraseCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "grammaire-phrase",
  titre: `La phrase au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "Une phrase se reconnait à ses deux bouts : une grande lettre au début, un point à la fin.",
  // ⛔ VIDE EXPRÈS. Une « carte d'identité » de la notion est un objet d'adulte.
  identite: [],
  definition: {
    texte: [
      "Quand tu racontes quelque chose, tu fais une phrase.",
      "Une phrase dit quelque chose en entier. On la comprend toute seule.",
      "Sur le papier, tu la vois tout de suite : elle commence par une grande lettre, et elle finit par un point.",
    ].join("\n\n"),
  },
  figure: {
    schema: laPhraseModele,
  },
  proprietes: [
    {
      titre: "Une phrase dit quelque chose",
      texte: "On la comprend sans rien ajouter.",
      schema: direQuelqueChose,
      micros: ["cp_gram_phrase_reconnaitre"],
    },
    {
      titre: "Une grande lettre, puis un point",
      texte: "Le début et la fin se voient d'un coup d'œil.",
      schema: lesDeuxBouts,
      micros: ["cp_gram_majuscule_point"],
    },
    {
      titre: "Le point peut crier ou demander",
      texte: "Avec un !, on est content. Avec un ?, on demande.",
      schema: leCri,
      micros: ["cp_gram_types_phrases", "cp_gram_forme_exclamative"],
    },
    {
      titre: "Pour dire non, deux petits mots",
      texte: "« ne » devant le verbe, « pas » derrière.",
      schema: direNon,
      micros: ["cp_gram_forme_negative"],
    },
  ],
  reel: {
    texte:
      "Tu fais des phrases toute la journée en parlant. Sur le papier, la grande lettre et le point montrent où elles commencent et où elles s'arrêtent.",
  },
  // ⛔ VIDE EXPRÈS : l'histoire d'une notion ne parle pas à un enfant de six ans.
  historique: { texte: "" },
  methode: [
    {
      titre: "Je remets les mots dans l'ordre",
      texte: "Je les dis tout haut. Ça doit vouloir dire quelque chose.",
      schema: motsMelanges,
      micros: ["cp_gram_ordonner_phrase"],
    },
    {
      titre: "Je regarde les deux bouts",
      texte: "Une grande lettre au début. Un point à la fin.",
      schema: picRelit,
      micros: ["cp_gram_majuscule_point"],
    },
  ],
  // ⛔ VIDE, comme sur l'étalon du cycle 3.
  usages: [],
  exemples: [
    {
      titre: "Une vraie phrase",
      donnees: "Ma tortue mange.",
      question: "Est-ce une phrase ?",
      solution: "Oui. Elle dit quelque chose, elle a une grande lettre et un point.",
      schema: laQuestion,
      micros: ["cp_gram_phrase_reconnaitre", "cp_gram_majuscule_point"],
    },
    {
      titre: "Des mots en désordre",
      donnees: "dort chat Le",
      question: "Remets les mots dans l'ordre.",
      solution: "Le chat dort.",
      schema: motsRemis,
      micros: ["cp_gram_ordonner_phrase"],
    },
  ],
  pieges: [
    "Un mot tout seul n'est pas une phrase.",
    "Sans point, on ne sait pas où la phrase s'arrête.",
  ],
  aRetenir: [
    "Une phrase dit quelque chose en entier.",
    "Elle commence par une grande lettre.",
    "Elle finit par un point.",
    "Pour dire non : ne … pas.",
  ],
  entrainement: [
    {
      question: "Par quoi commence une phrase ?",
      correction: "Par une grande lettre.",
      micros: ["cp_gram_majuscule_point"],
    },
    {
      question: "Par quoi finit une phrase ?",
      correction: "Par un point.",
      micros: ["cp_gram_majuscule_point"],
    },
    {
      question: "« chat » est-il une phrase ?",
      correction: "Non. Un mot tout seul ne dit pas quelque chose en entier.",
      micros: ["cp_gram_phrase_reconnaitre"],
    },
    {
      question: "Remets dans l'ordre : dort chat Le",
      correction: "Le chat dort.",
      micros: ["cp_gram_ordonner_phrase"],
    },
    {
      question: "Comment dit-on non dans une phrase ?",
      correction: "Avec deux petits mots : ne … pas.",
      micros: ["cp_gram_forme_negative"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesPhraseCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "La phrase - CP",
    section: {
      type: "objectif",
      phrase: "Une phrase a deux bouts",
      sousPhrase: "Une grande lettre au début, un point à la fin.",
      encadre: { titre: "L'idée", texte: "On la voit avant de la lire." },
    },
  },
  {
    titre: "Une phrase dit quelque chose",
    badge: "La phrase - CP",
    section: {
      type: "etapes",
      etapes: [
        "Je dis la phrase tout haut.",
        "Est-ce que ça veut dire quelque chose ?",
        "Alors c'est une phrase.",
      ],
    },
    schema: modeleCouleur,
  },
  {
    titre: "Le point crie, ou il demande",
    badge: "La phrase - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le point", texte: "On raconte." },
        { titre: "Le point qui crie", texte: "On est content." },
        { titre: "Le point qui demande", texte: "On pose une question." },
      ],
    },
    schema: leCri,
  },
  {
    titre: "À vous",
    badge: "La phrase - CP",
    section: {
      type: "exercice",
      enonce: "dort chat Le",
      question: "Remets les mots dans l'ordre.",
      indice: "Dis-les tout haut. Ça doit vouloir dire quelque chose.",
      correction: "Le chat dort.",
    },
    schema: motsRemis,
  },
];
