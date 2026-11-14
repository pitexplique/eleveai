// lib/tutor-v4/questionBank/ce2/maths/masse.bank.ts
//
// Les masses du CE2, écrites à la main. Même histoire que les longueurs : les
// sept micro-compétences passaient par le constructeur commun, qui aiguille sur
// la NOTION. « Comparer des masses » et « estimer la masse d'un objet »
// recevaient la même question, et le CE1 leur servait même un ruban en
// centimètres.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : les unités g, kg et t, et
// les relations 1 kg = 1000 g, 1 t = 1000 kg. Deux interdits du texte :
//   — pas de tableau de conversion : on passe par les relations connues ;
//   — pas d'écriture à virgule pour les masses. On écrit « 2 kg 500 g », et
//     jamais « 2,5 kg ». La virgule est réservée à la monnaie.
// Et le nombre reste sous 10 000 : on ne demande donc jamais le nombre de
// grammes dans une tonne.
//
// LE PIÈGE DE LA NOTION : le même que pour les longueurs, en plus sournois,
// parce qu'ici l'élève a l'objet en tête. « 900 g est plus lourd que 1 kg,
// parce que 900 est plus grand que 1. » Et son cousin, la tare : la boîte
// pleine pèse la boîte PLUS ce qu'il y a dedans.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type { MasseCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { choix, gabarit, maj, pick, pl, quelquun, rint, type Etoile, type Q } from "./outils-mesures-ce2";
import { choisirUnite, comparer, ecrire, estimer, relations, unites, type Grandeur } from "./grandeurs-ce2";

function masseCanvas(data: Omit<MasseCanvasData, "kind">): MasseCanvasData {
  return { kind: "masse", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const masseBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_MASSE_UNITES — connaître g, kg et t
     Trois unités seulement au cycle 2, et le même « kilo »
     que dans kilomètre : mille.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_unites_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Parmi le gramme, le kilogramme et la tonne, quelle est la plus PETITE unité de masse ?",
    format: "qcm",
    choices: ["le gramme", "le kilogramme", "la tonne", "elles sont pareilles"],
    expected: ["le gramme"],
    comparator: "mcq_exact",
    hint: "On pèse une plume avec laquelle de ces trois unités ?",
    explanation: exp(
      "Les trois unités de masse du CE2 se rangent dans cet ordre : gramme, kilogramme, tonne.",
      "On se rappelle qu'il faut mille grammes pour faire un kilogramme.",
      "1 kg = 1000 g, et 1 t = 1000 kg. Le gramme est donc tout en bas : c'est lui la plus petite.",
      "La plus petite est le gramme.",
    ),
    tags: ["ce2", "masse", "unites", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_unites_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_unites",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le mot « kilogramme », que veut dire « kilo » ?",
    format: "qcm",
    choices: ["mille", "cent", "dix", "un million"],
    expected: ["mille"],
    comparator: "mcq_exact",
    hint: "C'est le même « kilo » que dans kilomètre.",
    explanation: exp(
      "« Kilo » est un mot grec qui veut dire mille.",
      "On lit le début du mot pour savoir combien de fois l'unité est répétée.",
      "Un kilogramme, c'est mille grammes. C'est le même « kilo » que dans kilomètre, qui vaut mille mètres.",
      "« Kilo » veut dire mille.",
    ),
    tags: ["ce2", "masse", "unites", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_unites_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_unites",
    difficulty: 3,
    theme: "reunion",
    text: "À l'usine sucrière, on pèse les camions de canne à sucre. Avec quelle unité ?",
    format: "qcm",
    choices: ["la tonne", "le kilogramme", "le gramme", "le mètre"],
    expected: ["la tonne"],
    comparator: "mcq_exact",
    hint: "Un camion chargé pèse plus de dix mille kilogrammes.",
    explanation: exp(
      "La tonne sert à peser ce qui est très lourd : elle vaut 1000 kg.",
      "On imagine le nombre obtenu avec chaque unité et on garde celle qui donne le plus court.",
      "Un camion de canne pèse une vingtaine de tonnes. En kilogrammes, cela ferait 20 000 kg, et en grammes un nombre à huit chiffres.",
      "On pèse les camions de canne en tonnes.",
    ),
    tags: ["ce2", "masse", "unites", "reunion", "qcm"],
  },

  /* =========================================================
     CE2_MASSE_RELATIONS — 1 kg = 1000 g, 1 t = 1000 kg
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_relations_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_relations",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de grammes dans 1 kilogramme ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "« Kilo » veut dire mille.",
    explanation: exp(
      "1 kilogramme vaut 1000 grammes.",
      "On lit le début du mot : « kilo » annonce mille.",
      "Un paquet de sucre de 1 kg, c'est le même que celui marqué 1000 g : les deux étiquettes disent la même masse.",
      "1 kg = 1000 g.",
    ),
    tags: ["ce2", "masse", "relations", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_relations_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_relations",
    difficulty: 2,
    theme: "neutral",
    text: "Combien pèse un demi-kilogramme, en grammes ?",
    format: "short",
    expected: ["500"],
    comparator: "number_equal",
    hint: "La moitié de 1000.",
    explanation: exp(
      "Un demi-kilogramme, c'est la moitié de 1000 grammes.",
      "On partage 1000 en deux parts égales.",
      "1000 ÷ 2 = 500. Un paquet marqué 500 g pèse donc un demi-kilo : c'est la même chose.",
      "Un demi-kilogramme pèse 500 g.",
    ),
    tags: ["ce2", "masse", "relations", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_relations_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_relations",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « 1 kg = 100 g ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 kg = 1000 g",
      "oui",
      "non, 1 kg = 10 g",
      "non, 1 kg = 100 t",
    ],
    expected: ["non, 1 kg = 1000 g"],
    comparator: "mcq_exact",
    hint: "100 g, c'est à peine une petite pomme. Un kilo, c'est bien plus.",
    explanation: exp(
      "1 kilogramme vaut 1000 grammes.",
      "On vérifie avec un objet connu : une petite pomme pèse environ 100 g.",
      "Il a confondu avec « centi ». Un kilo, ce n'est pas une pomme : il en faudrait dix pour l'atteindre. 1 kg = 1000 g.",
      "Non : 1 kg = 1000 g.",
    ),
    tags: ["ce2", "masse", "relations", "piege", "qcm"],
  },

  /* =========================================================
     CE2_MASSE_COMPARER — comparer des masses
     LE piège : comparer les nombres au lieu des masses.
     900 g contre 1 kg, et l'élève choisit 900.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_comparer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus lourd : 1 kg ou 900 g ?",
    format: "qcm",
    choices: ["1 kg", "900 g", "c'est pareil", "on ne peut pas savoir"],
    expected: ["1 kg"],
    comparator: "mcq_exact",
    hint: "Écris les deux masses dans la même unité avant de comparer.",
    explanation: exp(
      "On ne compare deux masses qu'après les avoir écrites dans la même unité.",
      "On choisit la plus petite unité des deux et on convertit.",
      "1 kg = 1000 g. Or 1000 g est plus lourd que 900 g. Le nombre 900 est plus grand que 1, mais il compte des grammes, pas des kilos.",
      "1 kg est plus lourd que 900 g.",
    ),
    // ⛔ Pas de canvas balance ici : le fléau penche tout seul selon `grammes`,
    // et l'élève lirait la réponse sur le dessin sans jamais convertir. Le
    // piège de cette question est justement de devoir passer par 1 kg = 1000 g.
    tags: ["ce2", "masse", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_comparer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Balance à deux plateaux : un paquet de 1 kg d'un côté, 1000 g de l'autre. Que se passe-t-il ?",
    format: "qcm",
    choices: [
      "la balance reste en équilibre",
      "le côté du 1000 g descend",
      "le côté du 1 kg descend",
      "la balance ne peut pas peser des grammes",
    ],
    expected: ["la balance reste en équilibre"],
    comparator: "mcq_exact",
    hint: "1 kg et 1000 g, est-ce que ça pèse pareil ?",
    explanation: exp(
      "Une balance à deux plateaux reste en équilibre quand les deux masses sont égales.",
      "On écrit les deux masses dans la même unité, puis on compare.",
      "1 kg = 1000 g : les deux paquets pèsent exactement la même chose. Deux écritures différentes, une seule masse.",
      "La balance reste en équilibre.",
    ),
    // ⛔ Idem : le canvas afficherait « même masse » en toutes lettres.
    tags: ["ce2", "masse", "comparer", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_comparer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus lourd : 1 kg de plumes ou 1 kg de cailloux ?",
    format: "qcm",
    choices: [
      "c'est pareil, les deux pèsent 1 kg",
      "les cailloux",
      "les plumes",
      "on ne peut pas savoir",
    ],
    expected: ["c'est pareil, les deux pèsent 1 kg"],
    comparator: "mcq_exact",
    hint: "Ne regarde pas la taille du tas : lis la masse écrite.",
    explanation: exp(
      "La masse ne dépend pas de la place que prend l'objet.",
      "On lit la masse annoncée, sans se laisser tromper par le volume.",
      "Le tas de plumes est énorme et celui de cailloux tout petit, mais les deux pèsent 1 kg. La balance ne voit pas la taille, elle voit la masse.",
      "C'est pareil : les deux pèsent 1 kg.",
    ),
    tags: ["ce2", "masse", "comparer", "piege", "qcm"],
  },

  /* =========================================================
     CE2_MASSE_CHOISIR_UNITE — l'unité la mieux adaptée
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_choisir_unite_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_choisir_unite",
    difficulty: 1,
    theme: "reunion",
    text: "Avec quelle unité pèse-t-on un letchi ?",
    format: "qcm",
    choices: ["le gramme", "le kilogramme", "la tonne", "le litre"],
    expected: ["le gramme"],
    comparator: "mcq_exact",
    hint: "Un letchi tient au creux de la main.",
    explanation: exp(
      "On choisit l'unité qui donne le nombre le plus simple à dire.",
      "On imagine l'objet dans la main, puis on essaie chaque unité.",
      "Un letchi pèse environ 20 g. En kilogrammes, il faudrait écrire une virgule et beaucoup de zéros.",
      "On pèse un letchi en grammes.",
    ),
    tags: ["ce2", "masse", "choisir_unite", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_choisir_unite_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_choisir_unite",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « mon cartable pèse 3 t ». Quelle unité aurait-il dû écrire ?",
    format: "qcm",
    choices: ["kg", "g", "t", "km"],
    expected: ["kg"],
    comparator: "mcq_exact",
    hint: "3 tonnes, c'est trois voitures sur ton dos.",
    explanation: exp(
      "Une unité mal choisie rend la phrase absurde, même si le nombre est juste.",
      "On compare avec un objet connu : une voiture pèse environ 1 t.",
      "Un cartable plein pèse environ 3 kg. Avec 3 t, il pèserait autant que trois voitures : personne ne le soulèverait.",
      "Il fallait écrire 3 kg.",
    ),
    tags: ["ce2", "masse", "choisir_unite", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_choisir_unite_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_choisir_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Avec quelle unité pèse-t-on un camion ?",
    format: "qcm",
    choices: ["la tonne", "le kilogramme", "le gramme", "le mètre"],
    expected: ["la tonne"],
    comparator: "mcq_exact",
    hint: "Cherche l'unité qui donne le nombre le plus court.",
    explanation: exp(
      "La tonne sert à peser ce qui est très lourd : 1 t = 1000 kg.",
      "On imagine le nombre obtenu avec chaque unité.",
      "Un camion pèse une dizaine de tonnes. En kilogrammes, cela ferait 10 000 kg, et en grammes un nombre à huit chiffres.",
      "On pèse un camion en tonnes.",
    ),
    tags: ["ce2", "masse", "choisir_unite", "qcm"],
  },

  /* =========================================================
     CE2_MASSE_ESTIMER — estimer à partir de références
     Les repères qu'on fabrique en classe : la brique de lait,
     le paquet de sucre, l'élève sur la balance.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_estimer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Environ combien pèse un élève de CE2 ?",
    format: "qcm",
    choices: ["25 kg", "25 g", "250 kg", "25 t"],
    expected: ["25 kg"],
    comparator: "mcq_exact",
    hint: "Souviens-toi de la balance de l'infirmerie.",
    explanation: exp(
      "Estimer, c'est comparer à une masse qu'on connaît déjà.",
      "On prend une référence sûre : un adulte pèse environ 70 kg.",
      "Un élève de CE2 pèse à peu près le tiers d'un adulte, donc environ 25 kg. 25 g, ce serait une gomme ; 250 kg, ce serait quatre adultes.",
      "Un élève de CE2 pèse environ 25 kg.",
    ),
    tags: ["ce2", "masse", "estimer", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_estimer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que sa gomme pèse 1 kg. Qu'aurait-il dû dire ?",
    format: "qcm",
    choices: ["15 g", "1 t", "150 kg", "1500 g"],
    expected: ["15 g"],
    comparator: "mcq_exact",
    hint: "Un kilo, c'est une brique de lait. Ta gomme est-elle aussi lourde ?",
    explanation: exp(
      "Une bonne référence permet de repérer tout de suite une estimation absurde.",
      "On compare la gomme à un objet dont on connaît la masse : une brique de lait pèse 1 kg.",
      "Une gomme pèse environ 15 g. Il en faudrait plus de soixante pour faire 1 kg : on ne remplirait pas une trousse.",
      "Il aurait dû dire environ 15 g.",
    ),
    tags: ["ce2", "masse", "estimer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_estimer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_estimer",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché forain, un sac de 5 mangues pèse environ 2 kg. Combien pèse une mangue ?",
    format: "qcm",
    choices: ["400 g", "4 g", "4 kg", "40 kg"],
    expected: ["400 g"],
    comparator: "mcq_exact",
    hint: "2 kg partagés entre 5 mangues. Convertis d'abord en grammes.",
    explanation: exp(
      "Pour estimer la masse d'un objet, on partage la masse du lot par le nombre d'objets.",
      "On convertit d'abord en grammes, puis on partage.",
      "2 kg = 2000 g. Puis 2000 ÷ 5 = 400. Une mangue pèse donc environ 400 g, soit un peu moins d'un demi-kilo.",
      "Une mangue pèse environ 400 g.",
    ),
    tags: ["ce2", "masse", "estimer", "reunion", "qcm"],
  },

  /* =========================================================
     CE2_MASSE_PROBLEME — un problème de masses
     La tare est ici : la boîte pleine pèse la boîte PLUS ce
     qu'il y a dedans.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_probleme_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_probleme",
    difficulty: 2,
    theme: "reunion",
    text: "Maman achète 2 kg de letchis et 750 g de mangues. Combien pèse son panier, en grammes ?",
    format: "short",
    expected: ["2750"],
    comparator: "number_equal",
    hint: "Mets les deux masses en grammes avant d'additionner.",
    explanation: exp(
      "On n'additionne des masses que si elles sont écrites dans la même unité.",
      "On convertit d'abord, on additionne ensuite.",
      "2 kg = 2000 g. Puis 2000 + 750 = 2750.",
      "Le panier pèse 2750 g, soit 2 kg 750 g.",
    ),
    tags: ["ce2", "masse", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_probleme_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Boîte vide : 300 g. Pleine de billes : 1 kg 200 g. Combien de grammes pèsent les billes ?",
    format: "short",
    expected: ["900"],
    comparator: "number_equal",
    hint: "La boîte pleine, c'est la boîte PLUS les billes.",
    explanation: exp(
      "Quand on pèse un objet dans un récipient, la balance affiche les deux ensemble.",
      "On convertit la masse totale en grammes, puis on retire la masse de la boîte vide.",
      "1 kg 200 g = 1200 g. Puis 1200 - 300 = 900. Les billes seules pèsent 900 g.",
      "Les billes pèsent 900 g.",
    ),
    tags: ["ce2", "masse", "probleme", "piege", "tare"],
  },

  /* =========================================================
     CE2_MASSE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_masse_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Léa, Kevin et Malia pèsent le même paquet. Voici ce qu'ils écrivent. Qui a raison ?",
    canvas: masseCanvas({
      variant: "objets",
      objets: [
        { label: "Léa", icon: "📦", masse: "1 kg 500 g" },
        { label: "Kevin", icon: "📦", masse: "1500 g" },
        { label: "Malia", icon: "📦", masse: "un kilo et demi" },
      ],
      display: { showMasses: true, showLabels: true },
    }),
    format: "qcm",
    choices: [
      "les trois : c'est la même masse",
      "Léa seulement",
      "Kevin seulement",
      "Léa et Kevin seulement",
    ],
    expected: ["les trois : c'est la même masse"],
    comparator: "mcq_exact",
    hint: "Écris les trois masses en grammes.",
    explanation: exp(
      "Une même masse peut s'écrire de plusieurs façons.",
      "On ramène tout à la même unité, ici le gramme.",
      "1 kg 500 g = 1000 + 500 = 1500 g. Et un kilo et demi, c'est 1 kg plus un demi-kilo, soit 1000 + 500 = 1500 g. Les trois écritures donnent la même chose.",
      "Les trois ont raison.",
    ),
    tags: ["ce2", "masse", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_masse_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "masse",
    microId: "ce2_masse_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un paquet est en équilibre avec 500 g et deux masses de 200 g. Combien pèse-t-il, en grammes ?",
    format: "short",
    expected: ["900"],
    comparator: "number_equal",
    hint: "Il y a DEUX masses de 200 g, pas une.",
    explanation: exp(
      "Une balance en équilibre annonce que les deux plateaux pèsent pareil.",
      "On additionne toutes les masses posées sur l'autre plateau, sans en oublier.",
      "500 + 200 + 200 = 900. Le piège est de ne compter qu'un seul poids de 200 g et de répondre 700.",
      "Le paquet pèse 900 g.",
    ),
    tags: ["ce2", "masse", "defi", "piege"],
  },
];

/* =========================================================
   LES GABARITS (10/11/2026)
   ⛔ Avant : une phrase par gabarit, 6 à 17 squelettes par micro,
   11 à 18 répétitions sur 20. Les familles communes aux trois
   grandeurs sont dans `grandeurs-ce2.ts` ; ici, la fiche de la
   masse (unités, ce qu'un enfant pèse) et les problèmes.
========================================================= */

const MASSE: Grandeur = {
  notionId: "masse",
  mot: "masse",
  laGrandeur: "une masse",
  unites: [
    { sym: "g", nom: "gramme", le: "le gramme", base: 1 },
    { sym: "kg", nom: "kilogramme", le: "le kilogramme", base: 1000 },
    { sym: "t", nom: "tonne", le: "la tonne", base: 1000000 },
  ],
  instrument: "une balance",
  verbe: "pèse",
  infinitif: "peser",
  avecQuelle: "Avec quelle unité pèse-t-on",
  sup: { m: "le plus lourd", f: "la plus lourde" },
  questionPlus: "Qu'est-ce qui est le plus lourd",
  supports: [
    { le: "le sac de pommes", un: "un sac de pommes", icon: "🍎", grand: "kg", petit: "g", max: 5 },
    { le: "le paquet de farine", un: "un paquet de farine", icon: "📦", grand: "kg", petit: "g", max: 3 },
    { le: "la pastèque", un: "une pastèque", f: true, icon: "🍉", grand: "kg", petit: "g", max: 6 },
    { le: "le panier de légumes", un: "un panier de légumes", icon: "🧺", grand: "kg", petit: "g", max: 6 },
    { le: "le cartable", un: "un cartable", icon: "🎒", grand: "kg", petit: "g", max: 5 },
    { le: "la citrouille", un: "une citrouille", f: true, icon: "🎃", grand: "kg", petit: "g", max: 8 },
    { le: "le carton de livres", un: "un carton de livres", icon: "📚", grand: "kg", petit: "g", max: 9 },
    { le: "le gâteau d'anniversaire", un: "un gâteau d'anniversaire", icon: "🎂", grand: "kg", petit: "g", max: 3 },
    { le: "le chiot", un: "un chiot", icon: "🐶", grand: "kg", petit: "g", max: 9 },
    { le: "la valise", un: "une valise", f: true, icon: "🧳", grand: "kg", petit: "g", max: 9 },
    { le: "le colis", un: "un colis", icon: "📦", grand: "kg", petit: "g", max: 9 },
    { le: "le sac de graines de Pic", un: "un sac de graines", icon: "🌻", grand: "kg", petit: "g", max: 4 },
    { le: "l'éléphant du zoo", un: "un éléphant", icon: "🐘", grand: "t", petit: "kg", max: 6 },
    { le: "le camion de pompiers", un: "un camion de pompiers", icon: "🚒", grand: "t", petit: "kg", max: 9 },
    { le: "le tracteur de la ferme", un: "un tracteur", icon: "🚜", grand: "t", petit: "kg", max: 5 },
    { le: "l'hippopotame", un: "un hippopotame", icon: "🦛", grand: "t", petit: "kg", max: 3 },
  ],
  objets: [
    { nom: "un œuf", quoi: "un œuf", valeur: 60, unite: "g", icon: "🥚" },
    { nom: "une pomme", quoi: "une pomme", valeur: 150, unite: "g", icon: "🍎" },
    { nom: "une pastèque", quoi: "une pastèque", valeur: 4, unite: "kg", icon: "🍉" },
    { nom: "un chat", quoi: "un chat", valeur: 4, unite: "kg", icon: "🐈" },
    { nom: "un éléphant", quoi: "un éléphant", valeur: 5, unite: "t", icon: "🐘" },
    { nom: "une voiture", quoi: "une voiture", valeur: 1, unite: "t", icon: "🚗" },
    { nom: "un crayon", quoi: "un crayon", valeur: 10, unite: "g", icon: "✏️" },
    { nom: "un cahier", quoi: "un cahier", valeur: 100, unite: "g", icon: "📒" },
    { nom: "un vélo", quoi: "un vélo", valeur: 12, unite: "kg", icon: "🚲" },
    { nom: "un enfant de CE2", quoi: "un enfant de CE2", valeur: 25, unite: "kg", icon: "🧒" },
    { nom: "une plume", quoi: "une plume", valeur: 1, unite: "g", icon: "🪶" },
    { nom: "une banane", quoi: "une banane", valeur: 120, unite: "g", icon: "🍌" },
    { nom: "un camion", quoi: "un camion", valeur: 10, unite: "t", icon: "🚚" },
    { nom: "une fraise", quoi: "une fraise", valeur: 15, unite: "g", icon: "🍓" },
    { nom: "un ballon de football", quoi: "un ballon de football", valeur: 400, unite: "g", icon: "⚽" },
    { nom: "un chiot", quoi: "un chiot", valeur: 3, unite: "kg", icon: "🐶" },
    { nom: "un hippopotame", quoi: "un hippopotame", valeur: 2, unite: "t", icon: "🦛" },
    { nom: "une baguette de pain", quoi: "une baguette de pain", valeur: 250, unite: "g", icon: "🥖" },
    { nom: "un dictionnaire", quoi: "un gros dictionnaire", valeur: 2, unite: "kg", icon: "📕" },
    { nom: "une citrouille", quoi: "une grosse citrouille", valeur: 6, unite: "kg", icon: "🎃" },
  ],
  cartes: (items) =>
    masseCanvas({
      variant: "objets",
      objets: items.map((i) => ({ label: i.label, icon: i.icon, masse: i.valeur })),
      display: { showMasses: items.some((i) => i.valeur), showLabels: true },
    }),
};

/* ---------------------------------------------------------
   PROBLÈMES DE MASSES
--------------------------------------------------------- */

const ACHATS: readonly { lieu: string; gros: string; petit: string; icon: string; icon2: string }[] = [
  { lieu: "Au marché", gros: "pommes de terre", petit: "fraises", icon: "🥔", icon2: "🍓" },
  { lieu: "À l'épicerie", gros: "riz", petit: "bonbons", icon: "🍚", icon2: "🍬" },
  { lieu: "Chez la boulangère", gros: "farine", petit: "chocolat", icon: "🌾", icon2: "🍫" },
  { lieu: "À la ferme", gros: "carottes", petit: "cerises", icon: "🥕", icon2: "🍒" },
  { lieu: "Au marché", gros: "pommes", petit: "champignons", icon: "🍎", icon2: "🍄" },
  { lieu: "Au jardin", gros: "tomates", petit: "radis", icon: "🍅", icon2: "🌱" },
  { lieu: "À la fête", gros: "pommes d'amour", petit: "pop-corn", icon: "🍎", icon2: "🍿" },
  { lieu: "Chez le fromager", gros: "fromage", petit: "beurre", icon: "🧀", icon2: "🧈" },
  { lieu: "À l'animalerie", gros: "croquettes", petit: "graines", icon: "🦴", icon2: "🌻" },
  { lieu: "Au verger", gros: "poires", petit: "prunes", icon: "🍐", icon2: "🍑" },
];

function masseTotale(e: Etoile): Q {
  const a = ACHATS[rint(0, ACHATS.length - 1)];
  const p = quelquun();
  const kg = rint(1, e === 2 ? 3 : 5);
  const g = e === 2 ? pick([100, 200, 250, 300, 400, 500, 600, 750, 800]) : rint(11, 98) * 10 + pick([0, 5]);
  const total = kg * 1000 + g;
  const bonne = `${total} g`;
  return {
    text: pick([
      `${p.nom} achète ${kg} kg de ${a.gros} et ${g} g de ${a.petit}. Combien de grammes en tout ?`,
      `${a.lieu} : ${kg} kg de ${a.gros} et ${g} g de ${a.petit}. Combien de grammes en tout ?`,
      `Le panier de ${p.nom} : ${kg} kg de ${a.gros} et ${g} g de ${a.petit}. Combien pèse-t-il, en grammes ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, [`${kg + g} g`, `${Number(`${kg}${g}`)} g`, `${total + 1000} g`, `${kg * 100 + g} g`, `${total + 100} g`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour additionner deux masses, on les écrit dans la même unité. 1 kg = 1000 g.",
      "On change les kilogrammes en grammes, puis on ajoute.",
      `${kg} kg = ${kg * 1000} g ; ${kg * 1000} + ${g} = ${total}.`,
      `Ses achats pèsent ${bonne}.`,
    ),
    canvas: MASSE.cartes!([
      { label: a.gros, icon: a.icon, valeur: `${kg} kg` },
      { label: a.petit, icon: a.icon2, valeur: `${g} g` },
    ]),
  };
}

const RECIPIENTS_VIDES: readonly { vide: string; plein: string; contenu: string; icon: string }[] = [
  { vide: "Une boîte vide", plein: "Pleine de billes", contenu: "les billes", icon: "📦" },
  { vide: "Un seau vide", plein: "Plein de sable", contenu: "le sable", icon: "🪣" },
  { vide: "Un panier vide", plein: "Plein de champignons", contenu: "les champignons", icon: "🧺" },
  { vide: "Un coffre vide", plein: "Plein de pièces d'or", contenu: "les pièces d'or", icon: "🪙" },
  { vide: "Un aquarium vide", plein: "Plein de cailloux", contenu: "les cailloux", icon: "🐠" },
  { vide: "Un cartable vide", plein: "Plein de livres", contenu: "les livres", icon: "🎒" },
  { vide: "Une brouette vide", plein: "Pleine de terre", contenu: "la terre", icon: "🌱" },
  { vide: "Un bocal vide", plein: "Plein de bonbons", contenu: "les bonbons", icon: "🍬" },
  { vide: "Une caisse vide", plein: "Pleine de mangues", contenu: "les mangues", icon: "🥭" },
  { vide: "Un sac vide", plein: "Plein de goûter", contenu: "le goûter", icon: "🎒" },
];

function masseDuContenu(): Q {
  const r = pick(RECIPIENTS_VIDES);
  const vide = pick([200, 300, 400, 500, 600, 800]);
  const kg = rint(1, 5);
  const g = pick([0, 100, 200, 300, 400, 500, 600, 700, 900]);
  const plein = kg * 1000 + g;
  if (plein <= vide + 100) return masseDuContenu();
  const contenu = plein - vide;
  const bonne = `${contenu} g`;
  return {
    text: pick([
      `${r.vide} : ${vide} g. ${r.plein} : ${ecrire(kg, "kg", g, "g")}. Combien ${r.contenu.startsWith("les") ? "pèsent" : "pèse"} ${r.contenu}, en grammes ?`,
      `${r.vide} pèse ${vide} g. ${r.plein} : ${ecrire(kg, "kg", g, "g")}. Que ${r.contenu.startsWith("les") ? "pèsent" : "pèse"} ${r.contenu} ?`,
    ]),
    format: "qcm",
    choices: choix(bonne, [`${plein + vide} g`, `${kg * 1000 + g - vide / 10} g`, `${contenu + 100} g`, `${contenu - 100} g`, `${Math.abs(kg * 1000 - vide)} g`].filter((x) => x !== bonne)),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "La masse du contenu, c'est la masse pleine MOINS la masse vide.",
      "On écrit tout en grammes, puis on soustrait.",
      `${ecrire(kg, "kg", g, "g")} = ${plein} g ; ${plein} − ${vide} = ${contenu}.`,
      `${r.contenu.charAt(0).toUpperCase() + r.contenu.slice(1)} pèse${r.contenu.startsWith("les") ? "nt" : ""} ${bonne}.`,
    ),
    canvas: MASSE.cartes!([
      { label: "vide", icon: r.icon, valeur: `${vide} g` },
      { label: "plein", icon: r.icon, valeur: ecrire(kg, "kg", g, "g") },
    ]),
  };
}

const RECETTES: readonly { quoi: string; ingr: string }[] = [
  { quoi: "des crêpes", ingr: "farine" },
  { quoi: "un gâteau", ingr: "sucre" },
  { quoi: "des cookies", ingr: "farine" },
  { quoi: "une tarte", ingr: "farine" },
  { quoi: "des confitures", ingr: "sucre" },
  { quoi: "des gaufres", ingr: "farine" },
  { quoi: "des beignets", ingr: "sucre" },
  { quoi: "des pains", ingr: "farine" },
];

function resteDuPaquet(): Q {
  const r = pick(RECETTES);
  const kg = pick([1, 1, 2]);
  const u1 = pick([150, 200, 250, 300, 350]);
  const u2 = pick([100, 125, 150, 200, 250]);
  const reste = kg * 1000 - u1 - u2;
  const chef = pick(["Mamie", "Papi", "Nina", "Téo", "Lina", "Malo"]);
  const bonne = `${reste} g`;
  return {
    text: `${chef} a ${kg} kg de ${r.ingr}. ${pick(["On prend", "On utilise"])} ${u1} g, puis ${u2} g pour ${r.quoi}. Combien en reste-t-il ?`,
    format: "qcm",
    choices: choix(bonne, [`${kg * 1000 - u1} g`, `${kg * 100 - u1 - u2 > 0 ? kg * 100 - u1 - u2 : reste + 50} g`, `${reste + 100} g`, `${u1 + u2} g`, `${reste - 10} g`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "1 kg = 1000 g.",
      "On écrit le paquet en grammes, puis on enlève ce qu'on a pris.",
      `${kg} kg = ${kg * 1000} g ; ${kg * 1000} − ${u1} − ${u2} = ${reste}.`,
      `Il reste ${bonne}.`,
    ),
    canvas: MASSE.cartes!([{ label: r.ingr, icon: "📦", valeur: `${kg} kg` }]),
  };
}

function balanceEquilibre(): Q {
  const choses = pick([
    { label: "un paquet", le: "le paquet", icon: "📦", il: "il" },
    { label: "une citrouille", le: "la citrouille", icon: "🎃", il: "elle" },
    { label: "un melon", le: "le melon", icon: "🍈", il: "il" },
    { label: "un chou", le: "le chou", icon: "🥬", il: "il" },
    { label: "un ananas", le: "l'ananas", icon: "🍍", il: "il" },
    { label: "un ours en peluche", le: "l'ours en peluche", icon: "🧸", il: "il" },
    { label: "un coffre", le: "le coffre", icon: "🪙", il: "il" },
    { label: "un œuf de dinosaure", le: "l'œuf de dinosaure", icon: "🥚", il: "il" },
  ]);
  const gros = pick([500, 1000, 1000, 2000]);
  const petite = pick([100, 200, 50]);
  const nb = rint(2, 4);
  const total = gros + petite * nb;
  const p = quelquun();
  const desc = `${gros >= 1000 ? `${gros / 1000} kg` : `${gros} g`} et ${nb} masses de ${petite} g`;
  return {
    text: pick([
      `En équilibre : ${choses.le} contre ${desc}. Combien pèse-t-${choses.il}, en grammes ?`,
      `${p.nom} équilibre ${choses.le} avec ${desc}. Combien pèse-t-${choses.il}, en grammes ?`,
    ]),
    format: "qcm",
    choices: choix(`${total} g`, [`${gros + petite} g`, `${gros + nb} g`, `${total + petite} g`, `${2 * total} g`, `${gros * nb + petite} g`]),
    expected: [`${total} g`],
    comparator: "mcq_exact",
    explanation: exp(
      "Quand la balance est en équilibre, les deux plateaux portent la même masse.",
      "On additionne toutes les masses marquées, en grammes.",
      `${gros} + ${Array.from({ length: nb }, () => petite).join(" + ")} = ${total}.`,
      `${choses.le.charAt(0).toUpperCase() + choses.le.slice(1)} pèse ${total} g.`,
    ),
    canvas: masseCanvas({
      variant: "balance",
      gauche: { label: choses.label, icon: choses.icon, grammes: total },
      droite: { label: `${gros >= 1000 ? `${gros / 1000} kg` : `${gros} g`} + ${nb} × ${petite} g`, icon: "⚖️", grammes: total },
      display: { showMasses: false, showLabels: true, showComparison: true },
    }),
  };
}

function objetsIdentiques(): Q {
  const c = pick([
    { objet: "cageots de pommes", icon: "🍎" },
    { objet: "sacs de riz", icon: "🍚" },
    { objet: "caisses de mangues", icon: "🥭" },
    { objet: "sacs de croquettes", icon: "🦴" },
    { objet: "cartons de livres", icon: "📚" },
    { objet: "sacs de sable", icon: "🪣" },
    { objet: "paniers de champignons", icon: "🧺" },
    { objet: "sacs de graines", icon: "🌻" },
  ]);
  const un = pick([2, 3, 4, 5]);
  const nb = rint(3, 8);
  const emporte = rint(2, nb - 1);
  const total = un * nb;
  const p = quelquun();
  if (Math.random() < 0.5) {
    return {
      text: `${nb} ${c.objet} identiques pèsent ${total} kg en tout. ${p.nom} en emporte ${emporte}. Combien de kilogrammes emporte-t-${p.il} ?`,
      format: "qcm",
      choices: choix(`${un * emporte} kg`, [`${total - emporte} kg`, `${un * emporte + un} kg`, `${un} kg`, `${total - un * emporte} kg`]),
      expected: [`${un * emporte} kg`],
      comparator: "mcq_exact",
      explanation: exp(
        "Des objets identiques ont tous la même masse.",
        "On cherche d'abord la masse d'un seul en partageant, puis on multiplie.",
        `Un seul : ${total} ÷ ${nb} = ${un} kg. Pour ${emporte} : ${un} × ${emporte} = ${un * emporte} kg.`,
        `${p.nom} emporte ${un * emporte} kg.`,
      ),
    };
  }
  const g = pick([200, 250, 500]);
  const n = rint(2, 4);
  const total2 = n * (un * 1000 + g);
  return {
    text: `${p.nom} porte ${n} ${c.objet} de ${un} kg ${g} g chacun. ${pick(["Combien de grammes en tout ?", `Combien de grammes porte-t-${p.il} ?`])}`,
    format: "qcm",
    choices: choix(`${total2} g`, [`${n * un * 1000 + g} g`, `${n * (un + g)} g`, `${total2 + 1000} g`, `${un * 1000 + g} g`]),
    expected: [`${total2} g`],
    comparator: "mcq_exact",
    explanation: exp(
      "1 kg = 1000 g.",
      "On écrit la masse d'un objet en grammes, puis on la multiplie par le nombre d'objets.",
      `${un} kg ${g} g = ${un * 1000 + g} g ; ${un * 1000 + g} × ${n} = ${total2}.`,
      `Il porte ${total2} g.`,
    ),
    canvas: MASSE.cartes!(Array.from({ length: n }, () => ({ label: c.objet.split(" ")[0].replace(/s$/, ""), icon: c.icon, valeur: `${un} kg ${g} g` }))),
  };
}

/* ---------------------------------------------------------
   LES GABARITS, micro par micro
--------------------------------------------------------- */

function gab(id: string, microId: string, difficulty: Etoile, hint: string, tags: string[], generate: () => Q) {
  return gabarit({ id, notionId: "masse", microId, difficulty, hint, tags }, generate);
}

const M_UNI = "ce2_masse_unites";
const M_REL = "ce2_masse_relations";
const M_CMP = "ce2_masse_comparer";
const M_CHO = "ce2_masse_choisir_unite";
const M_EST = "ce2_masse_estimer";
const M_PRO = "ce2_masse_probleme";
const M_DEF = "ce2_masse_defi";

masseBank.push(
  gab(`${M_UNI}_tpl_3`, M_UNI, 1, "Du plus petit au plus grand : g, kg, t. On pèse avec une balance.", ["unites"], () => unites(MASSE, 1)),
  gab(`${M_UNI}_tpl_1`, M_UNI, 2, "g = gramme, kg = kilogramme, t = tonne.", ["unites", "canvas"], () => unites(MASSE, 2)),
  gab(`${M_UNI}_tpl_2`, M_UNI, 3, "Du plus petit au plus grand : g, kg, t.", ["unites"], () => unites(MASSE, 3)),

  gab(`${M_REL}_tpl_4`, M_REL, 1, "1 kg = 1000 g ; 1 t = 1000 kg.", ["relations"], () => relations(MASSE, 1)),
  gab(`${M_REL}_tpl_1`, M_REL, 2, "Chaque kilogramme vaut 1000 grammes : on multiplie par 1000.", ["relations", "canvas"], () => relations(MASSE, 2)),
  gab(`${M_REL}_tpl_2`, M_REL, 3, "Combien de fois 1000 dans ce nombre ?", ["relations", "canvas"], () => relations(MASSE, 3)),
  gab(`${M_REL}_tpl_3`, M_REL, 4, "4 kg 33 g, ce n'est pas 433 g : 4 kg = 4000 g, puis on ajoute 33.", ["relations", "piege", "canvas"], () => relations(MASSE, 4)),

  gab(`${M_CMP}_tpl_3`, M_CMP, 2, "Écris les deux masses en grammes avant de comparer.", ["comparer", "canvas"], () => comparer(MASSE, 2)),
  gab(`${M_CMP}_tpl_1`, M_CMP, 3, "1 kg = 1000 g : compare les nombres seulement quand l'unité est la même.", ["comparer", "canvas"], () => comparer(MASSE, 3)),
  gab(`${M_CMP}_tpl_2`, M_CMP, 4, "Écris toutes les masses en grammes, puis range-les.", ["comparer", "canvas"], () => comparer(MASSE, 4)),

  gab(`${M_CHO}_tpl_3`, M_CHO, 1, "Léger : le gramme. Lourd comme un enfant : le kilogramme. Énorme : la tonne.", ["choisir_unite", "canvas"], () => choisirUnite(MASSE, 1)),
  gab(`${M_CHO}_tpl_1`, M_CHO, 2, "Choisis l'unité qui donne un nombre ni trop grand, ni trop petit.", ["choisir_unite", "canvas"], () => choisirUnite(MASSE, 2)),
  gab(`${M_CHO}_tpl_2`, M_CHO, 3, "Imagine la mesure : est-ce possible ?", ["choisir_unite", "canvas"], () => choisirUnite(MASSE, 3)),

  gab(`${M_EST}_tpl_3`, M_EST, 1, "Une pomme pèse environ 150 g, un enfant de CE2 environ 25 kg.", ["estimer", "canvas"], () => estimer(MASSE, 1)),
  gab(`${M_EST}_tpl_1`, M_EST, 2, "Regarde d'abord l'unité : grammes, kilogrammes ou tonnes ?", ["estimer", "canvas"], () => estimer(MASSE, 2)),
  gab(`${M_EST}_tpl_4`, M_EST, 3, "Compare avec des objets que tu connais.", ["estimer", "canvas"], () => estimer(MASSE, 3)),
  gab(`${M_EST}_tpl_2`, M_EST, 4, "Écris le total en grammes, puis cherche combien de fois le petit paquet y tient.", ["estimer"], () => combienDePaquets()),

  gab(`${M_PRO}_tpl_3`, M_PRO, 2, "Écris tout en grammes, puis additionne.", ["probleme", "canvas"], () => masseTotale(2)),
  gab(`${M_PRO}_tpl_1`, M_PRO, 3, "1 kg = 1000 g : change les kilogrammes en grammes, puis calcule.", ["probleme", "canvas"], () =>
    Math.random() < 0.6 ? masseTotale(3) : resteDuPaquet(),
  ),
  gab(`${M_PRO}_tpl_2`, M_PRO, 4, "Le contenu, c'est le plein moins le vide.", ["probleme", "canvas"], () =>
    Math.random() < 0.6 ? masseDuContenu() : resteDuPaquet(),
  ),

  gab(`${M_DEF}_tpl_1`, M_DEF, 5, "En équilibre, les deux plateaux portent la même masse.", ["defi", "balance", "canvas"], balanceEquilibre),
  gab(`${M_DEF}_tpl_2`, M_DEF, 5, "Cherche d'abord la masse d'un seul objet.", ["defi", "canvas"], objetsIdentiques),
);

function combienDePaquets(): Q {
  const c = pick([
    { quoi: "Un paquet de sucre", pese: 500, pour: "la kermesse", u: ["paquet", "paquets"], icon: "🍬" },
    { quoi: "Une boîte de conserve", pese: 250, pour: "la cantine", u: ["boîte", "boîtes"], icon: "🥫" },
    { quoi: "Un sachet de graines", pese: 100, pour: "le jardin", u: ["sachet", "sachets"], icon: "🌻" },
    { quoi: "Un pot de confiture", pese: 500, pour: "le goûter géant", u: ["pot", "pots"], icon: "🍯" },
    { quoi: "Une plaquette de beurre", pese: 250, pour: "la boulangerie", u: ["plaquette", "plaquettes"], icon: "🧈" },
    { quoi: "Un sac de billes", pese: 200, pour: "le concours", u: ["sac", "sacs"], icon: "🔮" },
    { quoi: "Un paquet de pâtes", pese: 500, pour: "les pirates", u: ["paquet", "paquets"], icon: "🍝" },
    { quoi: "Une boîte de croquettes", pese: 250, pour: "le refuge", u: ["boîte", "boîtes"], icon: "🦴" },
  ] as const);
  const kg = rint(1, 5);
  const nb = (kg * 1000) / c.pese;
  const p = quelquun();
  return {
    text: `${c.quoi} pèse ${c.pese} g. ${pick([
      `Pour ${c.pour}, il faut ${kg} kg. Combien de ${c.u[1]} ?`,
      `${p.nom} en veut ${kg} kg. Combien de ${c.u[1]} lui faut-il ?`,
      `Combien de ${c.u[1]} pour faire ${kg} kg ?`,
    ])}`,
    format: "qcm",
    choices: choix(pl(nb, c.u[0], c.u[1]), [nb * 10, nb + 1, kg * 10, nb / 2 >= 1 && Number.isInteger(nb / 2) ? nb / 2 : nb + 2, kg].map((x) => pl(x, c.u[0], c.u[1]))),
    expected: [pl(nb, c.u[0], c.u[1])],
    comparator: "mcq_exact",
    explanation: exp(
      "1 kg = 1000 g.",
      "On écrit la masse voulue en grammes, puis on cherche combien de fois le petit paquet y tient.",
      `${kg} kg = ${kg * 1000} g ; ${c.pese} × ${nb} = ${kg * 1000}.`,
      `Il en faut ${nb}.`,
    ),
    canvas: MASSE.cartes!([{ label: maj(c.u[0]), icon: c.icon, valeur: `${c.pese} g` }]),
  };
}
