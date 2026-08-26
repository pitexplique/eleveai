// ─── Fiche de cours : les probabilités (4e) ────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach (4e/maths/probabilites.bank.ts).
//
// ⚠️ CETTE NOTION AVAIT DÉJÀ UNE FICHE, ÉTEINTE LE 21/08 (commit fc495175) :
// « pas une propriété illustrée, aucun dessin hors des exemples ». Celle-ci est
// écrite au standard du 19/08, et son adresse sort du redirect de
// `next.config.ts` dans le même commit — c'était la dernière des quatre de 4e.
//
// Micro-compétences couvertes (les 8 de la banque) → blocs :
//   proba_vocabulaire       → Définition, figure, méthode « Lister »
//   proba_issue             → Propriété « Les issues », méthode « Lister », exemple 1
//   proba_evenement         → Propriété « De l'impossible au certain », exercice 2
//   proba_equiprobabilite   → Propriété « Quand ce n'est PAS équiprobable »
//   proba_calculer_fraction → Propriété « Favorables sur possibles », formule, usage 2, exemple 1
//   proba_convertir         → Propriété « Trois écritures, une seule valeur », exemple 2
//   proba_comparer          → Usage 3, méthode « Contrôler », exercice 3
//   proba_defi              → Exemple 3, exercice 4
//
// ⛔ ET CE QUI N'Y EST PAS, PARCE QUE LA BANQUE NE LE TRAVAILLE PAS : les
// expériences à DEUX ÉPREUVES et l'arbre pondéré. Un premier jet en portait un ;
// les huit énoncés de `proba_defi` ne parlent que de l'événement contraire et des
// bornes 0 et 1, et les attendus de fin d'année de 4e s'arrêtent au même endroit.
// ⭐ LA RÈGLE QUI EN SORT (Frédéric, 26/08) : « avant de faire la fiche il faut
// bien lire les micro id des notions » — et leurs énoncés, surtout pour les micros
// nommées `*_defi` ou `*_probleme`, dont le nom ne dit pas le contenu.
//
// ⭐ SEPT CANVAS DIFFÉRENTS, ET QUATRE VARIANTES DU MÊME. Frédéric, 26/08 :
// « utilise tous les canvas possibles ». Les probabilités sont la notion qui s'y
// prête le mieux, parce que le matériel EST le sujet :
//   · le dé, l'urne, la roue, le tableau à double entrée → `probabilites`, ses
//     quatre variantes, une par situation ;
//   · l'échelle de 0 à 1                                 → `number_line` ;
//   · « favorables sur possibles » est une fraction      → `fraction` ;
//   · trois écritures d'une même valeur                  → `tableau_donnees` ;
//   · la part favorable dans le tout                     → `schema_barre` ;
//   · le calcul lui-même                                 → `calcul_pose` ;
//   · un événement et son contraire, qui se partagent le tout → `fraction`,
//     modèle `compare`.
// (`arbre_proba` existe et il est prêt — il servira à la fiche de 3e.)
//
// ⭐ ET LE CONTRE-EXEMPLE EST UNE ROUE À SECTEURS INÉGAUX. Tout le cours suppose
// l'équiprobabilité ; on ne comprend cette hypothèse qu'en voyant le cas où elle
// est fausse — et là, compter les issues ne suffit plus.
//
// Les nombres sont ceux de la banque : le dé équilibré et ses trois faces paires
// (3/6), le sac de billes, et la roue pondérée.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";
const VERT = "#16a34a";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ⚠️ Le matériel du coach, aux quatre variantes. Largeur 228 pour une carte de
// propriété (222 px mesurés), 208 pour un exemple (200 px mesurés).
const materiel = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "probabilites",
        size: { width: bloc === "exemple" ? 208 : 228, height: 170 },
        ...data,
      } as never
    }
  />
);

// ⭐ L'ÉCHELLE DES PROBABILITÉS, DE 0 À 1. C'est le dessin fondamental de la
// notion : impossible à gauche, certain à droite, et tout le reste entre les
// deux. Un événement et son contraire y sont symétriques par rapport au milieu,
// puisque leur somme vaut 1.
// ⚠️ Six graduations : à `step: 0,1` elles se touchent (note du 24/08).
const echelleDesProbas = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 1,
      step: 0.2,
      // ⚠️ ÉTIQUETTES COURTES AUX EXTRÉMITÉS, ET C'EST MESURÉ : une étiquette de
      // point est CENTRÉE sur sa valeur. « impossible » posé sur 0, qui est au
      // ras du bord gauche, sortait du cadre de la moitié de sa largeur. Les mots
      // passent dans la légende, qui est du texte HTML sous le dessin et ne
      // déborde jamais.
      points: [
        { value: 0, label: "0", color: ROUGE },
        { value: 0.5, label: "1 sur 2", color: BLEU },
        { value: 1, label: "1", color: VERT },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: { width: 228, height: 95 },
    }}
  />,
  "0 = impossible · 1 = certain"
);

// « FAVORABLES SUR POSSIBLES » EST UNE FRACTION, et une fraction se dessine.
// Trois faces paires sur six faces : la moitié du disque est coloriée, et le
// quotient cesse d'être une formule.
const troisSixiemes = legende(
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "circle",
      size: { width: 200, height: 165 },
      fraction: { numerator: 3, denominator: 6, label: "3/6" },
    }}
  />,
  "3 faces paires sur 6 faces"
);

// TROIS ÉCRITURES, UNE SEULE VALEUR. C'est le tableau qui le montre, pas un
// dessin : ce sont trois façons d'écrire le même nombre, et l'élève doit savoir
// passer de l'une à l'autre dans les deux sens.
const troisEcritures = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["fraction", "décimal", "pourcentage"],
      rows: [
        { values: ["3/6", "0,5", "50 %"] },
        { values: ["1/4", "0,25", "25 %"] },
        { values: ["1/5", "0,2", "20 %"] },
      ],
      highlight: { row: 0 },
      caption: "on divise, puis on multiplie par 100",
      display: { compact: true, striped: true },
    }}
  />
);

// LA PART FAVORABLE DANS LE TOUT. `schema_barre` dit ce que la fraction calcule :
// les cas favorables occupent une part des cas possibles, et la probabilité
// mesure cette part.
// ⚠️ Hauteur 200 : les étiquettes de parts sont posées à 144 px du haut et la
// phrase du bas à 18 px du bas — sous 180, elles se frôlent (mesuré en 1280).
const partFavorable = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 228, height: 200 },
      total: "6 issues",
      parts: [
        { label: "pairs", value: "3", color: BLEU },
        { label: "impairs", value: "3", color: "#e2e8f0" },
      ],
      questionLabel: "3 sur 6, soit 0,5",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// LE CALCUL, POSÉ. Une probabilité est un quotient, et c'est la division qui
// donne l'écriture décimale — celle qu'on compare le plus facilement.
const probaPosee = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: [],
      division: { dividende: "3", diviseur: "6", quotient: "0,5" },
      display: { showResult: true, compact: true },
      questionLabel: "favorables ÷ possibles",
    }}
  />
);

// ⛔ PAS D'ARBRE DE PROBABILITÉS SUR CETTE FICHE, ET C'EST UNE VÉRIFICATION, PAS
// UN OUBLI. Un premier jet portait un `arbre_proba` à deux lancers de pièce.
// Frédéric, 26/08 : « en 4e il y a des arbres de probabilités ? » — les attendus
// de fin d'année de 4e s'arrêtent avant : vocabulaire, événement contraire,
// calcul d'une probabilité, l'intervalle [0 ; 1] et les diverses écritures.
// Ni arbre, ni expérience à deux épreuves. C'est la 3e qui les porte — et le
// nouveau programme (arrêté du 18/02/2026) les fera descendre en 4e, mais
// seulement à la rentrée 2027. Le canvas `arbre_proba` existe et il est prêt :
// il servira à la fiche de 3e, pas à celle-ci.

// UN ÉVÉNEMENT ET SON CONTRAIRE SE PARTAGENT LE TOUT. Le modèle `compare` de
// `fraction` pose les deux l'un sous l'autre : on voit que 4/10 et 6/10
// remplissent ensemble exactement une unité.
const gagnerOuPerdre = legende(
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "compare",
      // ⚠️ 200 de haut et non 165 : en mode `compare`, l'étiquette de la seconde
      // fraction est posée sous sa barre, à une hauteur qui ne dépend pas de la
      // `size` demandée. À 165 elle sortait du cadre de 29,7 px — le mot n'était
      // pas trop long, c'est le cadre qui était trop court.
      size: { width: 208, height: 200 },
      // Étiquettes courtes pour la même raison qu'à la droite graduée : elles
      // sont posées sur la barre et « perdre » en sortait.
      fractions: [
        { numerator: 4, denominator: 10, label: "gagne" },
        { numerator: 6, denominator: 10, label: "perd" },
      ],
    }}
  />,
  "0,4 et 0,6 : ensemble, ils font 1"
);

const pieges = [
  "Compter les issues sans vérifier qu'elles ont la même chance : sur une roue à secteurs inégaux, « une chance sur trois » est faux même s'il y a trois couleurs.",
  "Écrire une probabilité supérieure à 1 : c'est impossible, les cas favorables sont toujours moins nombreux que les cas possibles. C'est le signe d'un quotient inversé.",
  "Oublier que la somme des probabilités de toutes les issues vaut 1 : c'est le contrôle le plus rapide quand on a calculé plusieurs probabilités sur la même expérience.",
];

const aRetenir = [
  "Une probabilité mesure la chance qu'un événement se produise : c'est un nombre compris entre 0 (impossible) et 1 (certain).",
  "Quand toutes les issues ont la même chance, la probabilité est le nombre de cas favorables divisé par le nombre de cas possibles.",
  "Un événement et son contraire ont pour somme 1 : connaître l'un, c'est connaître l'autre.",
];

export const ficheProbabilites4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "proba-experience",
  titre: "Les probabilités",
  accroche:
    "On ne sait pas ce que va donner un lancer de dé, mais on sait exactement quelles sont ses chances. Une probabilité met un nombre sur le hasard — entre 0, l'impossible, et 1, le certain.",
  identite: [
    { label: "L'échelle", valeur: "De 0, impossible, à 1, certain" },
    { label: "La condition", valeur: "Des issues qui ont toutes la même chance" },
    { label: "Le calcul", valeur: "Cas favorables ÷ cas possibles" },
  ],
  definition: {
    texte:
      "Une expérience aléatoire est une expérience dont on connaît tous les résultats possibles, mais pas celui qui va sortir. Chaque résultat possible s'appelle une issue. Un événement est un ensemble d'issues — par exemple « obtenir un nombre pair » réunit les issues 2, 4 et 6. La probabilité d'un événement mesure ses chances de se produire.",
  },
  figure: {
    schema: materiel({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6] } }),
    legende: "Un dé a six issues. « Obtenir un nombre pair » est un événement qui en réunit trois.",
  },
  proprietes: [
    {
      titre: "Les issues, c'est tout ce qui peut sortir",
      micros: ["proba_issue"],
      texte:
        "Avant de calculer, on liste ce qui peut arriver. Dans ce sac, les issues sont « rouge », « bleue » et « verte » — mais elles n'ont pas le même nombre de billes derrière elles.",
      schema: materiel({
        variant: "billes",
        billes: {
          elements: [
            { couleur: ROUGE },
            { couleur: ROUGE },
            { couleur: ROUGE },
            { couleur: BLEU },
            { couleur: BLEU },
            { couleur: VERT },
          ],
        },
      }),
    },
    {
      titre: "De l'impossible au certain",
      micros: ["proba_evenement"],
      texte:
        "Une probabilité vaut 0 si l'événement ne peut pas se produire, 1 s'il se produit à coup sûr. Un événement et son contraire se répondent : leurs probabilités font 1 ensemble.",
      schema: echelleDesProbas,
    },
    {
      titre: "Quand ce n'est PAS équiprobable",
      micros: ["proba_equiprobabilite"],
      texte:
        "Sur cette roue, trois couleurs mais des secteurs inégaux : « une chance sur trois » serait faux. Compter les issues ne suffit que si elles ont toutes la même chance.",
      schema: legende(
        materiel({
          variant: "roue",
          roue: {
            segments: [
              { label: "Rouge", poids: 4, couleur: ROUGE },
              { label: "Bleu", poids: 2, couleur: BLEU },
              { label: "Vert", poids: 1, couleur: VERT },
            ],
          },
        }),
        "3 couleurs, mais 4 chances sur 7 pour le rouge"
      ),
    },
    {
      titre: "Favorables sur possibles",
      micros: ["proba_calculer_fraction"],
      texte:
        "Quand les issues ont la même chance, la probabilité est le quotient du nombre de cas favorables par le nombre de cas possibles. Sur un dé, « pair » vaut 3 sur 6.",
      schema: troisSixiemes,
    },
    {
      titre: "Trois écritures, une seule valeur",
      micros: ["proba_convertir"],
      texte:
        "La même probabilité s'écrit en fraction, en décimal ou en pourcentage. On divise pour passer à la forme décimale, puis on multiplie par 100 pour le pourcentage.",
      schema: troisEcritures,
    },
  ],
  reel: {
    texte:
      "À La Réunion, la probabilité se lit tous les jours dans le bulletin de Météo-France : « 70 % de risque de pluie sur les Hauts » n'est pas une prévision, c'est une probabilité — sur cent journées semblables, il a plu sur soixante-dix. C'est aussi ce qui fixe le prix d'une assurance contre les cyclones, ce qui décide du niveau d'alerte d'un volcan, et ce qui explique pourquoi une loterie reste une mauvaise affaire même quand le gros lot est énorme.",
  },
  historique: {
    texte:
      "Les probabilités naissent en 1654 d'une question de jeu : le chevalier de Méré demande à Blaise Pascal comment partager équitablement les mises quand une partie de dés s'interrompt avant la fin. Pascal en discute par lettres avec Pierre de Fermat, et les deux inventent en quelques échanges les bases du calcul des probabilités. Une théorie mathématique entière est née d'un problème de joueurs.",
  },
  formule: {
    contexte: "Quand toutes les issues ont la même chance",
    expression: "P(événement) = cas favorables ÷ cas possibles",
    legende:
      "Le résultat est toujours entre 0 et 1, puisque les cas favorables sont un sous-ensemble des cas possibles.",
    schema: partFavorable,
  },
  methode: [
    {
      titre: "Lister",
      micros: ["proba_vocabulaire", "proba_issue"],
      // ⛔ Ce tableau listait d'abord les sommes de DEUX dés — une expérience à
      // deux épreuves, qui n'est pas au programme de 4e (voir l'en-tête). Il liste
      // maintenant les issues d'UNE expérience avec leurs effectifs, ce que les
      // attendus demandent bien : « quelles sont les issues possibles ? ».
      texte:
        "On écrit d'abord toutes les issues possibles, sans en oublier, et le nombre de cas derrière chacune. C'est ce tableau qui donne le dénominateur — le total — et il évite l'erreur de compter les couleurs au lieu des boules.",
      schema: legende(
        materiel({
          variant: "tableau",
          tableau: {
            entetes: ["issue", "nombre de boules"],
            lignes: [
              ["rouge", "1"],
              ["orange", "4"],
              ["total", "5"],
            ],
            casesSurlignees: [[2, 1]],
          },
        }),
        "2 issues, mais 5 cas possibles"
      ),
    },
    {
      titre: "Compter et diviser",
      micros: ["proba_calculer_fraction"],
      texte:
        "On compte les cas favorables, puis les cas possibles, et on divise. On garde la fraction si elle est demandée, sinon on donne la forme décimale ou le pourcentage.",
      schema: probaPosee,
    },
    {
      titre: "Contrôler",
      micros: ["proba_comparer"],
      // Un bloc peut rester sans dessin quand le dessin redirait le texte
      // (arbitrage de Frédéric, 25/08) : l'intervalle [0 ; 1] est déjà dessiné
      // sur l'échelle des probabilités, deux blocs plus haut.
      texte:
        "Trois contrôles, tous de tête. Le résultat est-il entre 0 et 1 ? La somme des probabilités de toutes les issues fait-elle 1 ? Et l'événement le plus probable a-t-il bien le plus grand nombre ?",
    },
  ],
  usages: [
    {
      titre: "Décrire l'expérience",
      micros: ["proba_vocabulaire", "proba_issue"],
      detail:
        "On nomme l'expérience aléatoire, on liste ses issues, puis on décrit l'événement demandé comme l'ensemble des issues qui le réalisent.",
      schema: materiel({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6], surligne: [2, 4, 6] } }),
    },
    {
      titre: "Calculer une probabilité",
      micros: ["proba_calculer_fraction", "proba_convertir"],
      detail:
        "On divise le nombre de cas favorables par le nombre de cas possibles, puis on donne le résultat dans l'écriture demandée — fraction, décimal ou pourcentage.",
      schema: troisSixiemes,
    },
    {
      titre: "Comparer deux événements",
      micros: ["proba_comparer"],
      detail:
        "On calcule les deux probabilités et on compare les nombres. Le plus grand désigne l'événement le plus probable — c'est plus sûr que l'intuition.",
      schema: echelleDesProbas,
    },
  ],
  exemples: [
    {
      titre: "Le dé et les nombres pairs",
      micros: ["proba_issue", "proba_calculer_fraction"],
      donnees: "On lance un dé équilibré à six faces.",
      question: "Quelle est la probabilité d'obtenir un nombre pair ?",
      schema: materiel(
        { variant: "de", de: { faces: [1, 2, 3, 4, 5, 6], surligne: [2, 4, 6] } },
        "exemple"
      ),
      solution:
        "Les issues sont 1, 2, 3, 4, 5 et 6 : il y a 6 cas possibles. L'événement « nombre pair » est réalisé par 2, 4 et 6 : 3 cas favorables. Le dé est équilibré, donc les six issues ont la même chance, et la probabilité vaut 3 ÷ 6 = 0,5. Contrôle : 0,5 est bien entre 0 et 1.",
    },
    {
      titre: "De l'urne au pourcentage",
      micros: ["proba_convertir"],
      // ⭐ L'ÉNONCÉ EST CELUI DES ATTENDUS DE FIN D'ANNÉE DE 4e, mot pour mot :
      // « Une urne contient 1 boule rouge et 4 boules oranges. Combien y a-t-il de
      // chances de tirer une boule orange ? À quelle probabilité cela
      // correspond-il ? » — et leur exemple de réussite verbalise les 80 %.
      donnees: "Une urne contient 1 boule rouge et 4 boules oranges.",
      question:
        "Combien y a-t-il de chances de tirer une boule orange, et à quelle probabilité cela correspond-il ?",
      schema: materiel(
        {
          variant: "billes",
          billes: {
            elements: [
              { couleur: ROUGE },
              { couleur: "#ea580c" },
              { couleur: "#ea580c" },
              { couleur: "#ea580c" },
              { couleur: "#ea580c" },
            ],
          },
        },
        "exemple"
      ),
      solution:
        "L'urne contient 1 + 4 = 5 boules, donc 5 cas possibles, et 4 d'entre eux sont favorables : il y a 4 chances sur 5 de tirer une boule orange. Cela correspond à la probabilité 4/5. En décimal, 4 ÷ 5 = 0,8, et en pourcentage 80 %. ⚠️ Ce sont trois écritures du même nombre, pas trois résultats différents.",
    },
    {
      titre: "Gagner, donc perdre",
      micros: ["proba_evenement", "proba_defi"],
      // Énoncé de la banque (`proba_defi_tpl_4_contraire`) et des attendus :
      // « Sachant que la probabilité de gagner à un jeu est égale à 0,4, calcule
      // la probabilité de perdre. »
      donnees: "La probabilité de gagner à un jeu est égale à 0,4.",
      question: "Quelle est la probabilité de perdre ?",
      schema: gagnerOuPerdre,
      solution:
        "Gagner et perdre sont deux événements contraires : ensemble, ils couvrent toutes les issues, donc leurs probabilités ont pour somme 1. On calcule 1 − 0,4 = 0,6. La probabilité de perdre vaut 0,6, soit 60 %. ⭐ C'est souvent le calcul le plus rapide : quand un événement est compliqué à compter, on compte son contraire.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "On lance un dé équilibré. Quelle est la probabilité d'obtenir un nombre supérieur à 4 ?",
      correction:
        "Les issues favorables sont 5 et 6 : 2 cas favorables sur 6 possibles. La probabilité vaut 2 ÷ 6, soit environ 0,33 ou 33 %. Contrôle : c'est bien entre 0 et 1, et c'est plus petit que la probabilité d'obtenir un nombre pair, ce qui est logique.",
      micros: ["proba_calculer_fraction"],
    },
    {
      question:
        "La probabilité qu'un événement se produise est 0,3. Quelle est la probabilité qu'il ne se produise PAS ?",
      correction:
        "Un événement et son contraire ont pour somme 1. Donc la probabilité du contraire vaut 1 − 0,3 = 0,7. C'est souvent le calcul le plus rapide : quand l'événement est compliqué à compter, on compte son contraire.",
      micros: ["proba_evenement"],
    },
    {
      question:
        "Sur une roue, il y a trois couleurs. Peut-on en conclure que chaque couleur a une chance sur trois ?",
      correction:
        "Non, pas sans vérifier que les trois secteurs ont la même taille. Compter les issues ne donne la probabilité que dans une situation d'équiprobabilité. Si le rouge occupe la moitié de la roue, sa probabilité est 0,5 et non 1/3.",
      micros: ["proba_equiprobabilite", "proba_comparer"],
    },
    {
      question:
        "On lance un dé. La probabilité d'obtenir « pair » est 3/6. Quelle est la probabilité d'obtenir « impair », et pourquoi peut-on le dire sans compter ?",
      correction:
        "« Impair » est l'événement contraire de « pair » : ensemble ils couvrent les six issues. Leur somme vaut donc 1, et la probabilité d'obtenir un nombre impair est 1 − 3/6 = 3/6, soit 0,5. On n'a eu besoin de compter aucune face. Contrôle : la somme des probabilités de toutes les issues d'une expérience vaut toujours 1.",
      micros: ["proba_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesProbabilites4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les probabilités - 4e",
    section: {
      type: "objectif",
      phrase: "Mettre un nombre sur le hasard",
      sousPhrase:
        "Une probabilité mesure les chances d'un événement, entre 0 — impossible — et 1 — certain.",
      encadre: {
        titre: "L'idée",
        texte: "Cas favorables ÷ cas possibles, à condition que toutes les issues aient la même chance.",
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
          "« 70 % de risque de pluie sur les Hauts » : sur cent journées semblables, il a plu sur soixante-dix. Le prix d'une assurance cyclone, le niveau d'alerte d'un volcan.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Tout est né en 1654 d'une question de joueur posée à Pascal : comment partager les mises quand une partie de dés s'arrête avant la fin ?",
      },
    },
  },
  {
    titre: "La condition qu'on oublie",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Compter les issues ne suffit pas toujours",
      sousPhrase:
        "« Favorables sur possibles » ne vaut que si toutes les issues ont la même chance. Sur une roue à secteurs inégaux, c'est faux.",
      encadre: {
        titre: "Contrôle rapide",
        texte: "Une probabilité est toujours comprise entre 0 et 1.",
      },
    },
  },
  {
    titre: "Trois écritures, une valeur",
    badge: "3 repères",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Fraction", texte: "3/6 — la forme du comptage : favorables sur possibles." },
        { titre: "Décimal", texte: "0,5 — la forme qu'on compare le plus facilement." },
        { titre: "Pourcentage", texte: "50 % — la forme des bulletins météo et des sondages." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheProbabilites4e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheProbabilites4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "De l'urne au pourcentage",
    section: {
      type: "exemple",
      enonce: "Une urne contient 1 boule rouge et 4 boules oranges.",
      question: "Quelle est la probabilité de tirer une boule orange ?",
      correction:
        "4 chances sur 5, soit la probabilité 4/5 — c'est-à-dire 0,8, ou 80 %.",
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
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "La probabilité d'un événement vaut 0,3.",
      question: "Quelle est celle de son contraire ?",
      indice: "Ensemble, ils couvrent toutes les issues.",
      correction: "1 − 0,3 = 0,7.",
    },
  },
];
