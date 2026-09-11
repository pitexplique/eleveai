// ─── Fiche de cours : statistiques descriptives (2de) ─────────────────────────
//
// Quinzième fiche de seconde. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/statistiques-descriptives.bank.ts
// (notion statistiques_descriptives), renforcée le 11/09/2026 de quatorze items
// — quartiles à déterminer, série en désordre, effectifs cumulés, et le
// diagramme en boîte, qui n'existait nulle part.
//
// ⭐⭐ LE FIL DE LA FICHE : UN SEUL NOMBRE NE RÉSUME JAMAIS UNE SÉRIE. Deux
// classes de même moyenne peuvent n'avoir rien à voir. Il en faut donc DEUX —
// un qui dit OÙ se tient la série, un qui dit DE COMBIEN elle s'étale — et les
// deux vont par couples qui ne se mélangent pas :
//
//     moyenne  ↔  écart type          médiane  ↔  quartiles
//
// C'est la seule idée de tout le chapitre, et c'est elle qui explique pourquoi
// on apprend deux indicateurs de position au lieu d'un.
//
// ⭐ LE DESSIN QUI PORTE LA FICHE : le diagramme en boîte, posé le 11/09/2026
// (canvas `diagramme_boite`). Il montre CINQ nombres d'un coup d'œil, et
// surtout il rend la comparaison de deux séries immédiate — c'est ce qu'aucun
// tableau ne fait.
//
// ⛔ LE PIÈGE CENTRAL : lire la médiane sans ranger la série. L'élève prend la
// valeur du milieu de la liste telle qu'elle arrive. Le coach n'avait aucun
// item dessus avant aujourd'hui : ses deux gabarits servaient une suite
// arithmétique déjà ordonnée, donc jamais le geste « j'ordonne d'abord ».
//
// Micro-compétences couvertes :
// - stat_lire_serie          → définition, figure, usages « Lire un diagramme », exo 1
// - stat_moyenne             → propriété « La moyenne », exemple 1, exos 2-3
// - stat_moyenne_ponderee    → propriété « La moyenne », méthode, exo 4
// - stat_mediane_quartiles   → propriétés « La médiane » et « Les quartiles », exemples 2-3, exos 5-7
// - stat_frequence           → définition, exo 8
// - stat_ecart_interquartile → propriété « La dispersion », figure, exemple 4, exo 9
// - stat_ecart_type          → propriété « La dispersion », usages « Comparer », exo 10
// - stat_linearite_moyenne   → usages « Changer d'unité »
// - stat_interpreter         → le réel, usages « Comparer », pièges

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import DiagrammeBoiteCanvas from "@/lib/canvas/DiagrammeBoiteCanvas";
import {
  egalite,
  egalites,
  cas,
  enBleu,
  enRouge,
  enVert,
  BLEU,
  ROUGE,
  VERT,
} from "@/lib/fiches/schemas";

/**
 * Un diagramme en boîte tel qu'il tient dans une carte de fiche.
 *
 * ⚠️ `size.width` reste à 320 : le SVG se met à la largeur de sa carte, donc un
 * cadre plus large RÉTRÉCIT le texte d'autant. En poche, une carte de fiche à
 * deux colonnes descend sous 320 px — on ne lui donne pas de quoi rétrécir en
 * plus.
 */
function boite(
  series: {
    label?: string;
    min: number;
    q1: number;
    mediane: number;
    q3: number;
    max: number;
    couleur?: string;
  }[],
  options?: {
    titre?: string;
    min?: number;
    max?: number;
    step?: number;
    ecart?: boolean;
  },
) {
  return (
    <DiagrammeBoiteCanvas
      figure={{
        kind: "diagramme_boite",
        series,
        titre: options?.titre,
        min: options?.min,
        max: options?.max,
        step: options?.step,
        size: { width: 320 },
        display: { showEcartInterquartile: options?.ecart },
      }}
    />
  );
}

/**
 * ⭐ LE SCHÉMA CENTRAL : les deux couples qui ne se mélangent pas.
 *
 * Chaque indicateur de position va avec SON indicateur de dispersion. Un élève
 * qui écrit « médiane 12, écart type 3 » a mélangé deux langues : ça n'est pas
 * faux au sens du calcul, mais ça ne se lit pas ensemble.
 */
function deuxCouples() {
  return (
    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
      {[
        {
          position: "Moyenne",
          dispersion: "Écart type",
          couleur: BLEU,
          quand: "série sans valeur extrême",
        },
        {
          position: "Médiane",
          dispersion: "Écart interquartile",
          couleur: VERT,
          quand: "série avec valeurs extrêmes",
        },
      ].map((c) => (
        <div
          key={c.position}
          className="flex-1 rounded-xl border-2 bg-white p-3 text-center"
          style={{ borderColor: c.couleur }}
        >
          <p className="text-sm font-black" style={{ color: c.couleur }}>
            {c.position}
          </p>
          <p className="my-1 text-lg leading-none text-slate-400">↕</p>
          <p className="text-sm font-black" style={{ color: c.couleur }}>
            {c.dispersion}
          </p>
          <p className="mt-2 text-xs text-slate-600">{c.quand}</p>
        </div>
      ))}
    </div>
  );
}

export const ficheStatistiquesSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "statistiques-descriptives-2de",
  titre: "Les statistiques descriptives",
  accroche:
    "Deux classes ont la même moyenne de 12. Dans l'une, tout le monde est entre 11 et 13 ; dans l'autre, la moitié est à 5 et l'autre à 19. Un seul nombre ne résume donc jamais une série : il en faut DEUX — un qui dit où elle se tient, un qui dit de combien elle s'étale.",
  identite: [
    {
      label: "Mots clés",
      valeur: "Effectif, fréquence, moyenne, médiane, quartiles, dispersion",
    },
    {
      label: "Le secret",
      valeur:
        "Un indicateur de position ne vaut rien sans son indicateur de dispersion",
    },
    {
      label: "Outil",
      valeur: "Le diagramme en boîte : cinq nombres, un seul coup d'œil",
    },
  ],

  definition: {
    texte:
      "Une SÉRIE STATISTIQUE, ce sont des valeurs relevées sur un ensemble d'individus, avec leurs EFFECTIFS — combien de fois chaque valeur apparaît. La FRÉQUENCE d'une valeur est son effectif divisé par l'effectif total : c'est une proportion, donc un nombre entre $0$ et $1$, souvent donné en pourcentage. Résumer la série, c'est en tirer deux sortes de nombres : des indicateurs de POSITION (moyenne, médiane), qui disent autour de quoi elle se tient, et des indicateurs de DISPERSION (étendue, écart interquartile, écart type), qui disent de combien elle s'étale.",
  },

  figure: {
    schema: boite([{ min: 4, q1: 9, mediane: 12, q3: 15, max: 20 }], {
      titre: "Les notes d'une classe",
      min: 0,
      max: 20,
      step: 2,
      ecart: true,
    }),
    legende:
      "⭐ Le diagramme en boîte porte CINQ nombres : les deux bouts des moustaches sont le minimum et le maximum ; les deux bords de la boîte sont Q₁ et Q₃ ; le trait rouge à l'intérieur est la médiane. La boîte contient donc la MOITIÉ CENTRALE de la classe — ici, la moitié des élèves ont entre 9 et 15.",
  },

  proprietes: [
    {
      titre: "La moyenne : on partage tout également",
      texte:
        "On additionne toutes les valeurs et on divise par l'effectif. Quand les valeurs se répètent, on pondère par les effectifs. ⛔ La moyenne est SENSIBLE aux valeurs extrêmes : une seule valeur très grande la tire vers le haut, même si elle ne concerne qu'un individu.",
      schema: egalites(
        [
          `\\bar{x} = \\dfrac{\\text{somme des valeurs}}{${enBleu("\\text{effectif total}")}}`,
          `\\bar{x} = \\dfrac{3 \\times 8 + 5 \\times 12}{${enBleu("8")}} = 10{,}5`,
        ],
        "⛔ On divise par l'effectif TOTAL (8 ici), pas par le nombre de valeurs différentes (2).",
      ),
    },
    {
      titre: "La médiane : elle coupe l'effectif en deux",
      texte:
        "La médiane partage la série ORDONNÉE en deux groupes de même effectif : au moins la moitié des valeurs lui sont inférieures ou égales, au moins la moitié lui sont supérieures ou égales. ⭐ Elle RÉSISTE aux valeurs extrêmes — changer la plus grande valeur ne la déplace pas.",
      schema: egalites(
        [
          `7 \\;\\; 9 \\;\\; ${enRouge("12")} \\;\\; 15 \\;\\; 19`,
          `7 \\;\\; 9 \\;\\; ${enRouge("12")} \\;\\; 15 \\;\\; 1000`,
        ],
        "⭐ Le maximum passe de 19 à 1000 : la médiane ne bouge pas. La moyenne, elle, passe de 12,4 à 205,6.",
      ),
    },
    {
      titre: "Les quartiles : on coupe en quatre",
      texte:
        "$Q_1$ est la plus petite valeur telle qu'AU MOINS un quart de la série lui soit inférieur ou égal ; $Q_3$, celle telle qu'au moins trois quarts le soient. Sur une série ordonnée de $N$ valeurs, on lit $Q_1$ au rang $N \\div 4$ et $Q_3$ au rang $3N \\div 4$, chaque rang arrondi à l'entier SUPÉRIEUR.",
      schema: egalites(
        [
          `\\text{Pour } N = 14 \\,:`,
          `\\tfrac{14}{4} = 3{,}5 \\;\\to\\; ${enBleu("Q_1 \\text{ au rang } 4")}`,
          `\\tfrac{42}{4} = 10{,}5 \\;\\to\\; ${enVert("Q_3 \\text{ au rang } 11")}`,
        ],
        "⛔ On arrondit toujours AU-DESSUS, jamais au plus proche : il faut AU MOINS un quart des valeurs en dessous.",
      ),
    },
    {
      titre: "⭐ La dispersion : deux couples, jamais mélangés",
      texte:
        "L'ÉTENDUE (max $-$ min) se calcule vite mais dépend entièrement des deux valeurs extrêmes. L'ÉCART INTERQUARTILE ($Q_3 - Q_1$) mesure l'étalement de la moitié centrale et ignore les extrêmes. L'ÉCART TYPE mesure l'écart moyen à la moyenne. ⭐ Chaque indicateur de position va avec le sien.",
      schema: deuxCouples(),
    },
  ],

  reel: {
    texte:
      "En France, le salaire MOYEN à temps plein tourne autour de 2 600 € nets par mois, mais le salaire MÉDIAN autour de 2 100 €. L'écart n'est pas une erreur : les très hauts salaires tirent la moyenne vers le haut sans déplacer la médiane. Dire « le salaire médian est de 2 100 € » signifie qu'une personne sur deux gagne moins que ça — c'est une information que la moyenne ne donne pas. ⭐ C'est pour cette raison que l'INSEE publie les deux, et que les journalistes qui ne citent que la moyenne racontent une autre histoire que celle des données.",
  },

  historique: {
    texte:
      "Le mot « statistique » vient du latin status, l'État : pendant des siècles, compter, c'était compter les sujets et les impôts. Au XIXᵉ siècle, le Belge Adolphe Quetelet invente « l'homme moyen » et fait de la moyenne le résumé roi — au point qu'on a longtemps cru qu'elle suffisait. Le diagramme en boîte est bien plus récent : l'Américain John Tukey le publie en 1977, précisément pour qu'on VOIE la dispersion au lieu de la calculer, et pour qu'on puisse comparer plusieurs séries d'un seul regard.",
  },

  methode: [
    {
      titre: "1. Je range la série",
      texte:
        "⛔ Avant toute médiane et tout quartile, j'ordonne les valeurs dans l'ordre croissant. C'est l'erreur numéro un : lire la valeur du milieu de la liste telle qu'elle arrive.",
      schema: egalites(
        [
          `12 \\;\\; 7 \\;\\; 19 \\;\\; 9 \\;\\; 15`,
          `7 \\;\\; 9 \\;\\; ${enRouge("12")} \\;\\; 15 \\;\\; 19`,
        ],
        "Sans ranger, on aurait lu 19 : la 3ᵉ valeur de la liste d'origine, qui ne veut rien dire.",
      ),
    },
    {
      titre: "2. Je choisis mon couple",
      texte:
        "Y a-t-il des valeurs très à l'écart des autres ? Si oui, je prends médiane et quartiles, qui y résistent. Sinon, moyenne et écart type disent tout, et se calculent plus vite.",
      schema: cas(
        [
          { formule: "\\text{valeurs extrêmes}", verdict: "MÉDIANE", couleur: VERT },
          { formule: "\\text{série régulière}", verdict: "MOYENNE", couleur: BLEU },
        ],
        "La forme de la série décide, pas l'habitude.",
      ),
    },
    {
      titre: "3. Je vérifie l'ordre de grandeur",
      texte:
        "Une moyenne et une médiane sont toujours comprises entre le minimum et le maximum. Un résultat qui sort de la série est faux, sans avoir besoin de refaire le calcul.",
      schema: egalite(
        `\\text{min} \\;\\leqslant\\; ${enBleu("\\bar{x}")} \\;\\text{ et }\\; ${enVert("\\text{Me}")} \\;\\leqslant\\; \\text{max}`,
        "Le contrôle de vraisemblance qui coûte trois secondes.",
      ),
    },
  ],

  usages: [
    {
      titre: "⭐ Comparer deux séries",
      detail:
        "C'est l'usage numéro un du diagramme en boîte : on empile les deux boîtes sur le même axe et la comparaison se lit sans calcul. Une boîte plus à droite, c'est une médiane plus élevée. Une boîte plus étroite, c'est une série plus régulière.",
      schema: boite(
        [
          { label: "2de A", min: 4, q1: 8, mediane: 12, q3: 16, max: 20 },
          {
            label: "2de B",
            min: 7,
            q1: 11,
            mediane: 12,
            q3: 13,
            max: 18,
            couleur: "#059669",
          },
        ],
        { min: 0, max: 20, step: 4 },
      ),
    },
    {
      titre: "Repérer une valeur qui détonne",
      detail:
        "Quand la moyenne et la médiane s'écartent beaucoup, c'est le signe qu'une poignée de valeurs extrêmes tire la série. La médiane dit alors mieux « le cas courant » que la moyenne.",
      schema: egalites(
        [
          `${enBleu("\\bar{x}")} = 205{,}6 \\qquad ${enVert("\\text{Me}")} = 12`,
        ],
        "Un tel écart ne se discute pas : il faut regarder la série avant de conclure.",
      ),
    },
    {
      titre: "Changer d'unité sans tout recalculer",
      detail:
        "Si l'on ajoute la même valeur à toutes les données, la moyenne augmente d'autant. Si on les multiplie toutes par un même nombre, la moyenne est multipliée par ce nombre. C'est la LINÉARITÉ de la moyenne, et elle évite de refaire la somme.",
      schema: egalites(
        [
          `y_i = a x_i + b \\;\\longrightarrow\\; \\bar{y} = a\\bar{x} + b`,
          `\\bar{x} = 12 \\;\\longrightarrow\\; \\overline{2x + 3} = ${enRouge("27")}`,
        ],
        "⚠️ L'écart type, lui, est multiplié par |a| — mais le +3 ne le change pas.",
      ),
    },
  ],

  exemples: [
    {
      titre: "Une moyenne pondérée",
      donnees:
        "Dans une classe de $25$ élèves : $5$ ont eu $8$, $12$ ont eu $12$, $8$ ont eu $16$.",
      question: "Calculer la moyenne de la classe.",
      schema: egalites([
        `\\dfrac{5 \\times 8 + 12 \\times 12 + 8 \\times 16}{${enBleu("25")}}`,
        `\\dfrac{40 + 144 + 128}{25} = \\dfrac{312}{25} = ${enRouge("12{,}48")}`,
      ]),
      solution:
        "On multiplie chaque note par son effectif, on additionne, et on divise par l'effectif TOTAL : $25$ et non $3$. La moyenne vaut $12{,}48$. ⛔ Diviser par $3$ — le nombre de notes différentes — donnerait $104$, un résultat hors de la série : la vérification de l'étape 3 l'aurait attrapé.",
    },
    {
      titre: "Une médiane sur une série en désordre",
      donnees: "Les temps (en min) de $7$ coureurs : $32$, $28$, $41$, $25$, $36$, $30$, $45$.",
      question: "Déterminer la médiane.",
      schema: egalites([
        `25 \\;\\; 28 \\;\\; 30 \\;\\; ${enRouge("32")} \\;\\; 36 \\;\\; 41 \\;\\; 45`,
      ]),
      solution:
        "On range d'abord. Il y a $7$ valeurs, donc la médiane est la $4^e$ : $32$ min. La moitié des coureurs ont mis moins de $32$ min. ⛔ Sans ranger, la $4^e$ valeur de la liste d'origine était $25$ — le minimum, pris pour la médiane.",
    },
    {
      titre: "Les quartiles d'une série de 10 valeurs",
      donnees:
        "Série ordonnée : $3$, $5$, $6$, $8$, $9$, $11$, $12$, $14$, $17$, $20$.",
      question: "Déterminer $Q_1$, la médiane et $Q_3$.",
      schema: egalites([
        `Q_1 : \\dfrac{10}{4} = 2{,}5 \\;\\longrightarrow\\; \\text{rang } 3 \\;\\longrightarrow\\; ${enBleu("6")}`,
        `\\text{Me} : \\dfrac{9 + 11}{2} = ${enRouge("10")}`,
        `Q_3 : \\dfrac{30}{4} = 7{,}5 \\;\\longrightarrow\\; \\text{rang } 8 \\;\\longrightarrow\\; ${enVert("14")}`,
      ]),
      solution:
        "$Q_1 = 6$, médiane $= 10$, $Q_3 = 14$. ⚠️ L'effectif est PAIR : la médiane est la moyenne des $5^e$ et $6^e$ valeurs, et elle ne fait pas partie de la série. Les quartiles, eux, sont toujours des valeurs de la série.",
    },
    {
      titre: "Lire un diagramme en boîte",
      donnees:
        "Le diagramme résume les âges des adhérents d'un club.",
      question:
        "Quel est l'écart interquartile, et que dit-il ?",
      schema: boite([{ min: 12, q1: 18, mediane: 25, q3: 34, max: 61 }], {
        min: 10,
        max: 65,
        step: 10,
        ecart: true,
      }),
      solution:
        "$Q_3 - Q_1 = 34 - 18 = 16$ ans : c'est la largeur de la boîte, donc l'étalement de la MOITIÉ CENTRALE des adhérents. L'étendue, elle, vaut $61 - 12 = 49$ ans — trois fois plus, parce qu'elle dépend entièrement de l'adhérent le plus jeune et du plus âgé. ⭐ L'écart interquartile décrit le club ; l'étendue décrit ses deux cas isolés.",
    },
  ],

  pieges: [
    "⛔ Lire la médiane sans RANGER la série : c'est l'erreur numéro un, et elle donne une valeur qui n'a aucun sens.",
    "⛔ Diviser par le nombre de valeurs DIFFÉRENTES au lieu de l'effectif total dans une moyenne pondérée.",
    "⛔ Arrondir le rang d'un quartile au plus proche : on arrondit toujours à l'entier SUPÉRIEUR.",
    "⛔ Confondre $Q_1$ (bord de la boîte) et le minimum (bout de la moustache) sur un diagramme en boîte.",
    "⛔ Croire qu'une même moyenne signifie deux séries semblables : sans la dispersion, la moyenne ne dit presque rien.",
    "⚠️ La moyenne n'est pas toujours une valeur de la série ($12{,}48$ n'est la note de personne) ; les quartiles, eux, en sont toujours.",
  ],

  aRetenir: [
    "⭐ Un indicateur de POSITION ne va jamais sans un indicateur de DISPERSION.",
    "Moyenne ↔ écart type. Médiane ↔ quartiles. On ne mélange pas les deux couples.",
    "La médiane résiste aux valeurs extrêmes, la moyenne non.",
    "Rang de $Q_1$ : $N \\div 4$ arrondi au-dessus. Rang de $Q_3$ : $3N \\div 4$ arrondi au-dessus.",
    "Écart interquartile $= Q_3 - Q_1$ : c'est la largeur de la boîte.",
    "Le diagramme en boîte porte cinq nombres : min, $Q_1$, médiane, $Q_3$, max.",
  ],

  coachHref: "/coach-ia/maths?classe=seconde",

  entrainement: [
    {
      question:
        "Série : $4$, $7$, $7$, $9$, $13$. Calculer la moyenne et l'étendue.",
      correction:
        "Moyenne $= \\dfrac{4+7+7+9+13}{5} = \\dfrac{40}{5} = 8$. Étendue $= 13 - 4 = 9$.",
    },
    {
      question:
        "Dans une classe, $8$ élèves ont $10$, $10$ élèves ont $14$ et $2$ élèves ont $18$. Quelle est la moyenne ?",
      correction:
        "$\\dfrac{8 \\times 10 + 10 \\times 14 + 2 \\times 18}{20} = \\dfrac{80 + 140 + 36}{20} = \\dfrac{256}{20} = 12{,}8$. ⛔ On divise par $20$, l'effectif total.",
    },
    {
      question: "Quelle est la médiane de la série : $15$, $9$, $22$, $11$, $17$ ?",
      correction:
        "On range : $9$, $11$, $15$, $17$, $22$. Il y a $5$ valeurs, la médiane est la $3^e$ : $15$.",
    },
    {
      question:
        "Série ordonnée de $6$ valeurs : $2$, $5$, $8$, $12$, $14$, $19$. Quelle est la médiane ?",
      correction:
        "L'effectif est pair : c'est la moyenne des $3^e$ et $4^e$ valeurs, $\\dfrac{8 + 12}{2} = 10$. La médiane n'est pas une valeur de la série.",
    },
    {
      question:
        "Série ordonnée de $11$ valeurs. À quels rangs lit-on $Q_1$ et $Q_3$ ?",
      correction:
        "$\\dfrac{11}{4} = 2{,}75 \\rightarrow$ rang $3$ pour $Q_1$. $\\dfrac{33}{4} = 8{,}25 \\rightarrow$ rang $9$ pour $Q_3$. On arrondit au-dessus dans les deux cas.",
    },
    {
      question:
        "Une série a $Q_1 = 14$ et $Q_3 = 23$. Quel est l'écart interquartile ?",
      correction:
        "$23 - 14 = 9$. La moitié centrale de la série s'étale sur $9$ unités.",
    },
    {
      question:
        "Le tableau donne le nombre de frères et sœurs de $21$ élèves : $0$ pour $4$ élèves, $1$ pour $7$, $2$ pour $6$, $3$ pour $4$. Quelle est la médiane ?",
      correction:
        "Effectif total $21$, impair : la médiane est la $11^e$ valeur. Effectifs cumulés : $4$, $11$, $17$, $21$. Le premier qui atteint $11$ correspond à la valeur $1$. La médiane vaut $1$.",
    },
    {
      question:
        "Sur $200$ personnes interrogées, $46$ font du vélo. Quelle est la fréquence, en pourcentage ?",
      correction:
        "$\\dfrac{46}{200} = 0{,}23$, soit $23\\ \\%$.",
    },
    {
      question:
        "Sur un diagramme en boîte, la boîte va de $18$ à $34$ et les moustaches de $12$ à $61$. Quelle est l'étendue ?",
      correction:
        "$61 - 12 = 49$. ⛔ Ce n'est pas $34 - 18 = 16$, qui est l'écart interquartile : l'étendue se lit d'un bout de moustache à l'autre.",
    },
    {
      question:
        "Une série a pour moyenne $12$. On ajoute $3$ à toutes les valeurs, puis on double le tout. Quelle est la nouvelle moyenne ?",
      correction:
        "$(12 + 3) \\times 2 = 30$. La moyenne suit la même transformation que les données : c'est la linéarité de la moyenne.",
    },
  ],
};

export const slidesStatistiquesSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Statistiques descriptives - 2de",
    section: {
      type: "objectif",
      phrase: "Résumer une série par DEUX nombres, jamais un seul",
      sousPhrase:
        "Un indicateur de position dit où la série se tient ; un indicateur de dispersion dit de combien elle s'étale. Moyenne va avec écart type, médiane va avec quartiles.",
    },
  },
];
