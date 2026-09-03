// ─── Fiche de cours : statistiques (3e) ───────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/statistiques.bank.ts, notionId `stat_statistique`, 73 items).
//
// ⛔⛔ AUCUNE MICRO N'EST PROPRE À LA 3e — et c'est la seule notion de la classe
// dans ce cas. Le recouvrement a été mesuré sur toutes les classes, pas sur le
// seul homonyme de 4e :
//     stat_lire_tableau       déjà en 5e ET en 4e
//     stat_lire_graphique     déjà en 5e ET en 4e
//     stat_effectif_frequence déjà en 5e
//     stat_moyenne            déjà en 5e ET en 4e
//     stat_mediane            déjà en 4e
//     stat_etendue            déjà en 4e
//     stat_interpreter        déjà en 4e
//     stat_defi               déjà en 5e ET en 4e
// ⚠️ La 4e range d'ailleurs la lecture de tableaux et de graphiques dans une
// notion SÉPARÉE, `stat_donnee` : comparer notion à notion aurait fait croire
// que ces deux micros étaient neuves. Elles ne le sont pas.
//
// ⭐⭐ L'ANGLE NE VIENT DONC PAS DES MICROS, IL VIENT DES ÉNONCÉS — et ils sont
// sans ambiguïté. `stat_interpreter` et `stat_defi` posent :
//   « pour décrire le salaire TYPIQUE d'une entreprise où quelques dirigeants
//     gagnent énormément, quel indicateur est le plus pertinent ? »
//   « une valeur très grande apparaît : quel indicateur est le plus modifié ? »
//   « deux classes ont la même moyenne de 12, mais des étendues de 4 et de 16 :
//     dans laquelle les notes sont-elles les plus homogènes ? »
//   « une grande étendue indique surtout… »
// 👉 LA THÈSE DE LA FICHE : LA MOYENNE SEULE MENT. Deux séries de même moyenne
// peuvent être radicalement différentes, et il faut un second indicateur pour
// dire la dispersion. La médiane, elle, RÉSISTE aux valeurs extrêmes là où la
// moyenne y cède. Calculer les trois est de la 4e ; savoir lequel CHOISIR et ce
// qu'il dit, c'est le travail de la 3e — et c'est de la culture citoyenne, pas
// seulement une technique.
//
// ⛔ QUATRE FAUSSES AFFIRMATIONS DE LA BANQUE, RECOPIÉES DANS LES PIÈGES :
//     « 12 élèves sur 30 font du basket, donc la fréquence est 12 »
//     « la moyenne de 5 ; 10 ; 15 est 30 »
//     « pour la série 5 ; 8 ; 12, l'étendue est 5 + 8 + 12 = 25 »
//     la médiane trouvée SANS ranger la série — bonne réponse, méthode fausse
//
// ⚠️ Les libellés des dessins sont en écriture simple : ils sont tracés en
// <text> SVG, où du LaTeX s'afficherait en clair.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut porter du LaTeX.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⚠️ Aucun emplacement de fiche ne dépasse 225 px à 375, ni 300 px à 1280 —
// mesuré par `scripts/mesurer-largeurs-blocs.mjs`.
const tableau = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" | "formule" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "tableau_donnees",
        display: { compact: true, striped: true },
        size: {
          width: bloc === "exemple" ? 200 : bloc === "formule" ? 216 : 222,
        },
        ...data,
      } as never
    }
  />
);

/**
 * Une série mise en image.
 * ⚠️ Les étiquettes tiennent à ~7 signes quand il y a quatre barres dans 222 px
 * — mesuré sur la fiche des puissances, où « leur somme » chevauchait ses
 * voisines.
 */
const graphique = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "stat_graph",
        graphType: "barres",
        size: { width: bloc === "exemple" ? 200 : 222, height: 180 },
        display: { showValues: true, showLabels: true },
        ...data,
      } as never
    }
  />
);

export const ficheStatistiques3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "stat-statistique",
  titre: "Statistiques : lire une série, et choisir ce qui la résume",
  accroche:
    "« Le salaire moyen de cette entreprise est de 4 000 € ». La phrase est peut-être exacte, et pourtant presque personne n'y gagne cette somme — il suffit que trois dirigeants tirent la moyenne vers le haut. Calculer une moyenne, une médiane et une étendue, vous savez le faire. Ce que la troisième ajoute est plus difficile et plus utile : savoir LEQUEL de ces trois nombres dit la vérité sur une série, et ce que chacun cache.",
  identite: [
    { label: "La moyenne", valeur: "La somme divisée par l'effectif — sensible aux valeurs extrêmes" },
    { label: "La médiane", valeur: "La valeur qui coupe la série en deux moitiés — elle, résiste" },
    { label: "L'étendue", valeur: "La plus grande moins la plus petite : elle mesure la DISPERSION" },
  ],
  definition: {
    texte:
      "Une série statistique est un ensemble de valeurs relevées sur une population. Pour la résumer, on dispose de deux sortes d'indicateurs, et il faut les distinguer. Les indicateurs de POSITION — la moyenne et la médiane — donnent une valeur centrale, autour de laquelle la série se tient. L'indicateur de DISPERSION — l'étendue — dit au contraire à quel point les valeurs s'écartent les unes des autres. Un seul de ces nombres ne suffit jamais à décrire une série : il en faut au moins un de chaque sorte.",
  },
  figure: {
    schema: graphique({
      title: "Activités choisies",
      data: [
        { label: "foot", value: 18 },
        { label: "danse", value: 12 },
        { label: "judo", value: 9 },
        { label: "tennis", value: 6 },
      ],
    }),
    legende:
      "La hauteur de chaque barre est un EFFECTIF : le nombre d'élèves qui ont choisi l'activité. L'effectif total vaut $18 + 12 + 9 + 6 = 45$ élèves.",
  },
  proprietes: [
    {
      titre: "Effectif et fréquence ne sont pas le même nombre",
      texte:
        "L'EFFECTIF est un comptage : 12 élèves font du basket. La FRÉQUENCE est une proportion : ces 12 élèves rapportés au total. Dans une classe de 30, la fréquence vaut $\\dfrac{12}{30} = 0{,}4$, soit $40\\,\\%$. ⛔ Répondre « la fréquence est 12 » confond les deux — et le contrôle est immédiat, puisqu'une fréquence est toujours comprise entre 0 et 1.",
      schema: legende(
        tableau({
          headers: ["", "ce que c'est", "exemple"],
          rows: [
            { values: ["effectif", "un comptage", "12 élèves"] },
            { values: ["fréquence", "une proportion", "12/30 = 0,4"] },
            { values: ["en %", "× 100", "40 %"] },
          ],
          highlight: { row: 1 },
          caption: "une fréquence tient entre 0 et 1",
        }),
        "Un effectif se compte en individus ; une fréquence n'a pas d'unité."
      ),
      micros: ["stat_effectif_frequence"],
    },
    {
      titre: "Lire un tableau, lire un graphique",
      texte:
        "Dans un tableau, chaque colonne porte une catégorie et son effectif ; l'effectif total est la somme de tous. Dans un diagramme en barres, c'est la HAUTEUR qui porte l'effectif — la barre la plus haute désigne la catégorie la plus représentée, la plus basse la moins choisie. Un diagramme circulaire, lui, montre des PARTS, donc des fréquences plutôt que des effectifs.",
      schema: legende(
        tableau({
          headers: ["représentation", "ce qu'on lit"],
          rows: [
            { values: ["tableau", "des effectifs"] },
            { values: ["barres", "la hauteur = l'effectif"] },
            { values: ["camembert", "des parts, donc des %"] },
          ],
          caption: "chaque forme dit autre chose",
        }),
        "Le camembert compare des proportions ; les barres comparent des nombres."
      ),
      micros: ["stat_lire_tableau", "stat_lire_graphique"],
    },
    {
      titre: "La moyenne : tout partager également",
      texte:
        "On additionne toutes les valeurs, puis on divise par leur nombre. Pour $8$, $10$ et $12$ : la somme vaut $30$, et $30 \\div 3 = 10$. ⛔ Répondre $30$ oublie la division — et une moyenne plus grande que toutes les valeurs de la série est impossible. Quand une valeur se répète, on la compte autant de fois : dix élèves à $12$ et cinq à $18$ donnent $\\dfrac{10 \\times 12 + 5 \\times 18}{15} = 14$.",
      schema: legende(
        tableau({
          headers: ["étape", "calcul"],
          rows: [
            { values: ["la somme", "8 + 10 + 12 = 30"] },
            { values: ["le nombre", "3 valeurs"] },
            { values: ["la moyenne", "30 ÷ 3 = 10"] },
          ],
          highlight: { row: 2 },
          caption: "la division n'est pas facultative",
        }),
        "Une moyenne tombe toujours ENTRE la plus petite et la plus grande valeur."
      ),
      micros: ["stat_moyenne"],
    },
    {
      titre: "La médiane : couper la série en deux",
      texte:
        "La médiane est la valeur qui partage la série en deux groupes de même effectif. ⛔ Elle exige de RANGER les valeurs d'abord — sans quoi le résultat n'a aucune raison d'être juste, même s'il l'est parfois par chance. Une fois rangée : si le nombre de valeurs est impair, la médiane est celle du milieu ; s'il est pair, c'est la moyenne des deux valeurs centrales.",
      schema: legende(
        tableau({
          headers: ["série rangée", "médiane"],
          rows: [
            { values: ["4 ; 7 ; 9 ; 12 ; 15", "9 — celle du milieu"] },
            { values: ["4 ; 8 ; 10 ; 14", "(8+10)÷2 = 9"] },
          ],
          caption: "impair : une valeur · pair : leur moyenne",
        }),
        "Ranger d'abord : c'est la seule étape qu'on saute, et celle qui rend la méthode juste."
      ),
      micros: ["stat_mediane"],
    },
    {
      titre: "L'étendue : mesurer l'écart, pas le centre",
      texte:
        "L'étendue est la différence entre la plus grande et la plus petite valeur : pour $4$, $7$, $9$ et $15$, elle vaut $15 - 4 = 11$. ⛔ Ce n'est pas une somme — écrire $5 + 8 + 12 = 25$ pour la série $5$, $8$, $12$ additionne ce qu'il fallait soustraire. Et l'étendue ne dit rien du centre : elle dit si les valeurs sont RESSERRÉES ou ÉTALÉES.",
      schema: legende(
        tableau({
          headers: ["série", "étendue", "ce qu'elle dit"],
          rows: [
            { values: ["10 ; 11 ; 12", "2", "très régulière"] },
            { values: ["2 ; 11 ; 20", "18", "très dispersée"] },
          ],
          highlight: { row: 1 },
          caption: "même centre, dispersion opposée",
        }),
        "Ces deux séries ont la même moyenne, $11$ — et n'ont rien à voir."
      ),
      micros: ["stat_etendue"],
    },
    {
      titre: "La moyenne seule ment",
      texte:
        "C'est le cœur du chapitre. Deux classes peuvent avoir exactement la même moyenne de $12$ et des résultats totalement différents : si la première a une étendue de $4$, ses notes sont groupées entre $10$ et $14$ ; si la seconde a une étendue de $16$, elle mêle des $4$ et des $20$. La moyenne ne distingue pas ces deux situations. Il faut donc TOUJOURS l'accompagner d'un indicateur de dispersion.",
      schema: legende(
        tableau({
          headers: ["classe", "moyenne", "étendue"],
          rows: [
            { values: ["A", "12", "4 — homogène"] },
            { values: ["B", "12", "16 — éclatée"] },
          ],
          highlight: { row: 1 },
          caption: "la moyenne ne les distingue pas",
        }),
        "Un seul nombre ne décrit jamais une série : il en faut deux."
      ),
      micros: ["stat_defi", "stat_interpreter"],
    },
    {
      titre: "La médiane résiste, la moyenne cède",
      texte:
        "Une valeur extrême — un très gros salaire, une note aberrante — déplace fortement la MOYENNE, car elle entre dans la somme avec tout son poids. La MÉDIANE, elle, ne compte que les rangs : une valeur énorme reste une valeur parmi d'autres, et ne décale la coupure que d'un cran. C'est pourquoi on parle du salaire MÉDIAN quand on veut décrire ce que gagne une personne ordinaire.",
      schema: legende(
        graphique({
          title: "Cinq salaires, en milliers",
          data: [
            { label: "A", value: 18 },
            { label: "B", value: 19 },
            { label: "C", value: 20 },
            { label: "D", value: 21 },
            { label: "E", value: 122 },
          ],
        }),
        "Moyenne : $40$. Médiane : $20$. Quatre personnes sur cinq gagnent moins que la moyenne."
      ),
      micros: ["stat_interpreter"],
    },
    {
      titre: "Choisir son indicateur selon la question",
      texte:
        "Chaque indicateur répond à une question différente, et l'énoncé indique laquelle. « Quel est le total réparti également ? » appelle la moyenne. « Quelle valeur partage la population en deux moitiés ? » appelle la médiane. « Les valeurs sont-elles regroupées ou étalées ? » appelle l'étendue. Prendre le mauvais indicateur donne un nombre exact qui répond à côté.",
      schema: legende(
        tableau({
          headers: ["la question", "l'indicateur"],
          rows: [
            { values: ["le total partagé", "la moyenne"] },
            { values: ["couper en deux", "la médiane"] },
            { values: ["étalé ou groupé ?", "l'étendue"] },
            { values: ["une valeur extrême", "plutôt la médiane"] },
          ],
          highlight: { row: 3 },
          caption: "le verbe de la question tranche",
        }),
        "Un nombre juste qui répond à la mauvaise question reste une mauvaise réponse."
      ),
      micros: ["stat_interpreter", "stat_defi"],
    },
  ],
  reel: {
    texte:
      "L'écart entre moyenne et médiane est l'un des chiffres les plus politiques qui soient. Quand on annonce le « revenu moyen » des ménages, quelques très hauts revenus suffisent à le tirer vers le haut, et il devient supérieur à ce que gagne la majorité ; le revenu MÉDIAN, lui, désigne la personne exactement au milieu, et il est toujours plus bas. Les deux chiffres sont exacts, et ils racontent deux histoires différentes — savoir lequel on vous présente est donc une compétence de citoyen autant que de mathématicien. La même prudence vaut pour une moyenne de classe, une durée moyenne de trajet, ou le prix moyen d'un logement à Saint-Denis.",
  },
  historique: {
    texte:
      "La médiane apparaît tardivement, et c'est révélateur : jusqu'au XIXᵉ siècle, la moyenne règne seule, parce qu'on la croyait toujours représentative. C'est Francis Galton, vers 1880, qui popularise l'idée qu'une valeur centrale de RANG peut mieux décrire une population qu'une valeur centrale de somme. L'histoire donne d'ailleurs raison à cette prudence par un contre-exemple célèbre : le statisticien belge Adolphe Quetelet avait construit un « homme moyen » à partir de moyennes de tailles, de poids et de mesures diverses — un individu qui n'existait nulle part, et qui ne ressemblait à personne.",
  },
  formule: {
    contexte: "Les trois indicateurs, et ce que chacun mesure",
    expression:
      "\\text{moyenne} = \\dfrac{\\text{somme des valeurs}}{\\text{effectif total}} \\qquad \\text{étendue} = \\text{max} - \\text{min}",
    legende:
      "La médiane, elle, ne se calcule pas par une formule : elle se LIT sur la série rangée, à la position du milieu. ⚠️ C'est justement ce qui la rend insensible aux valeurs extrêmes — elle ne regarde que les rangs, jamais les montants.",
    schema: legende(
      tableau(
        {
          headers: ["indicateur", "il mesure"],
          rows: [
            { values: ["moyenne", "une position"] },
            { values: ["médiane", "une position"] },
            { values: ["étendue", "une dispersion"] },
          ],
          highlight: { row: 2 },
          caption: "deux positions, une dispersion",
        },
        "formule"
      ),
      "Il faut un indicateur de chaque sorte pour décrire honnêtement une série."
    ),
  },
  methode: [
    {
      titre: "Ranger avant toute médiane",
      texte:
        "C'est l'étape qu'on saute, et elle n'est pas facultative. Une médiane trouvée sur une série non rangée peut tomber juste par hasard, mais la méthode est fausse — et elle échouera à la question suivante.",
      micros: ["stat_mediane"],
    },
    {
      titre: "Contrôler une moyenne par encadrement",
      texte:
        "Une moyenne tombe toujours entre la plus petite et la plus grande valeur de la série. Si le résultat sort de cet intervalle, c'est qu'on a oublié de diviser, ou mal compté l'effectif.",
      micros: ["stat_moyenne"],
    },
    {
      titre: "Compter les valeurs répétées autant de fois",
      texte:
        "Quand un tableau donne des effectifs, chaque valeur pèse selon le sien : on multiplie avant d'additionner, et l'on divise par l'effectif TOTAL, pas par le nombre de lignes du tableau.",
      micros: ["stat_moyenne"],
    },
    {
      titre: "Vérifier qu'une fréquence tient entre 0 et 1",
      texte:
        "Une fréquence est une proportion : elle ne peut ni dépasser 1, ni être négative. Un résultat supérieur à 1 signale qu'on a divisé à l'envers, ou donné l'effectif à la place.",
      micros: ["stat_effectif_frequence"],
    },
    {
      titre: "Se demander ce que la question veut savoir",
      texte:
        "Avant de calculer, on identifie s'il s'agit d'une position ou d'une dispersion. Et s'il y a une valeur manifestement extrême, on préfère la médiane — ou l'on donne les deux, en disant pourquoi elles diffèrent.",
      micros: ["stat_interpreter"],
    },
  ],
  usages: [
    {
      titre: "On me demande une valeur « typique »",
      detail:
        "Moyenne s'il n'y a pas de valeur extrême, médiane s'il y en a une. Et je peux dire pourquoi.",
      micros: ["stat_interpreter"],
    },
    {
      titre: "On me demande si les valeurs sont regroupées",
      detail: "C'est l'étendue : la plus grande moins la plus petite.",
      micros: ["stat_etendue"],
    },
    {
      titre: "On me donne un tableau d'effectifs",
      detail:
        "Je multiplie chaque valeur par son effectif, j'additionne, puis je divise par l'effectif total.",
      micros: ["stat_moyenne", "stat_lire_tableau"],
    },
    {
      titre: "On me demande une proportion",
      detail:
        "C'est une fréquence : l'effectif de la catégorie divisé par l'effectif total, éventuellement multiplié par 100.",
      micros: ["stat_effectif_frequence"],
    },
    {
      titre: "On me donne un graphique",
      detail:
        "Je lis les hauteurs comme des effectifs, et je peux en tirer le total, la plus grande valeur, ou l'étendue.",
      micros: ["stat_lire_graphique"],
    },
  ],
  exemples: [
    {
      titre: "Moyenne, médiane et étendue d'une même série",
      donnees: "Les notes d'un élève : $6$ ; $9$ ; $9$ ; $12$ ; $14$.",
      question: "Calculer les trois indicateurs.",
      solution:
        "La série est déjà rangée, ce qu'il faut vérifier avant tout. La MOYENNE : la somme vaut $6 + 9 + 9 + 12 + 14 = 50$, et il y a $5$ notes, donc $50 \\div 5 = 10$. La MÉDIANE : cinq valeurs, donc un nombre impair — c'est celle du milieu, la troisième, soit $9$. L'ÉTENDUE : $14 - 6 = 8$. On remarque que moyenne et médiane diffèrent d'un point : la série penche légèrement vers le haut, parce que le $14$ tire la moyenne sans déplacer la coupure.",
      schema: legende(
        tableau(
          {
            headers: ["indicateur", "valeur"],
            rows: [
              { values: ["moyenne", "50 ÷ 5 = 10"] },
              { values: ["médiane", "9"] },
              { values: ["étendue", "14 − 6 = 8"] },
            ],
            caption: "trois nombres, trois questions",
          },
          "exemple"
        ),
        "Moyenne et médiane ne coïncident presque jamais."
      ),
      micros: ["stat_moyenne", "stat_mediane", "stat_etendue"],
    },
    {
      titre: "Une moyenne avec des effectifs",
      donnees: "Dans une classe, $10$ élèves ont eu $12/20$ et $5$ élèves ont eu $18/20$.",
      question: "Quelle est la moyenne de la classe ?",
      solution:
        "Chaque note compte autant de fois qu'il y a d'élèves qui l'ont obtenue. La somme vaut donc $10 \\times 12 + 5 \\times 18 = 120 + 90 = 210$. L'effectif TOTAL est de $10 + 5 = 15$ élèves — et non $2$, qui serait le nombre de lignes du tableau. La moyenne vaut $210 \\div 15 = 14$. Contrôle : $14$ est bien compris entre $12$ et $18$, et plus proche de $12$, ce qui est cohérent puisque deux fois plus d'élèves ont eu cette note.",
      micros: ["stat_moyenne", "stat_lire_tableau"],
    },
    {
      titre: "Le salaire typique",
      donnees:
        "Cinq salaires mensuels dans une petite entreprise : $1\\,800$ € ; $1\\,900$ € ; $2\\,000$ € ; $2\\,100$ € ; $12\\,200$ €.",
      question: "Quel indicateur décrit le mieux ce qu'on y gagne ?",
      solution:
        "La moyenne vaut $\\dfrac{1800 + 1900 + 2000 + 2100 + 12200}{5} = \\dfrac{20\\,000}{5} = 4\\,000$ €. Or QUATRE personnes sur cinq gagnent moins de la moitié de cette somme : la moyenne ne décrit personne, parce que le salaire du dirigeant entre dans la somme avec tout son poids. La MÉDIANE, elle, est la troisième valeur de la série rangée, soit $2\\,000$ € — et celle-là décrit bien la situation ordinaire. C'est donc la médiane qu'il faut annoncer, et l'écart entre les deux chiffres est lui-même une information : il signale la présence d'une valeur extrême.",
      micros: ["stat_interpreter", "stat_mediane"],
    },
    {
      titre: "Deux classes, une même moyenne",
      donnees: "La classe A a une moyenne de $12$ et une étendue de $4$. La classe B a la même moyenne, mais une étendue de $16$.",
      question: "Dans laquelle les notes sont-elles les plus homogènes ?",
      solution:
        "Dans la classe A. L'étendue mesure l'écart entre la meilleure et la moins bonne note : $4$ points seulement en A, ce qui signifie des notes groupées — par exemple entre $10$ et $14$. En B, $16$ points d'écart laissent supposer des $4$ et des $20$ dans la même classe. ⭐ Les deux moyennes sont pourtant identiques : cet exemple montre qu'une moyenne, seule, ne permet PAS de décrire une série. Il faut toujours l'accompagner d'un indicateur de dispersion.",
      micros: ["stat_defi", "stat_etendue"],
    },
  ],
  pieges: [
    "Confondre effectif et fréquence : $12$ élèves sur $30$ donnent une fréquence de $0{,}4$, pas de $12$. Une fréquence tient toujours entre 0 et 1.",
    "Oublier de diviser : la moyenne de $5$ ; $10$ ; $15$ vaut $10$, pas $30$. Une moyenne ne dépasse jamais la plus grande valeur.",
    "Additionner pour trouver l'étendue. C'est une SOUSTRACTION : la plus grande moins la plus petite.",
    "Chercher la médiane sans ranger la série. La réponse peut tomber juste par hasard, mais la méthode est fausse.",
    "Diviser par le nombre de lignes du tableau au lieu de l'effectif total, quand des valeurs se répètent.",
    "Croire que la moyenne décrit toujours la situation ordinaire. Une seule valeur extrême suffit à la rendre trompeuse.",
    "Donner un seul indicateur. Une position sans dispersion ne dit rien de la forme de la série.",
  ],
  aRetenir: [
    "Effectif : un comptage. Fréquence : une proportion, entre 0 et 1.",
    "Moyenne : la somme divisée par l'effectif total — jamais le nombre de lignes.",
    "Médiane : la valeur du milieu, sur la série RANGÉE.",
    "Étendue : la plus grande moins la plus petite. Elle mesure la dispersion.",
    "Une valeur extrême déplace la moyenne, mais presque pas la médiane.",
    "Deux séries de même moyenne peuvent tout avoir de différent : il faut deux indicateurs.",
  ],
  entrainement: [
    {
      question: "Dans un tableau statistique, que représente l'effectif d'une catégorie ?",
      correction:
        "Le nombre d'individus qui appartiennent à cette catégorie. C'est un comptage, pas une proportion.",
      micros: ["stat_lire_tableau"],
    },
    {
      question:
        "Dans une classe de $25$ élèves, $10$ pratiquent un sport. Quelle est la fréquence sous forme décimale ?",
      correction:
        "$\\dfrac{10}{25} = 0{,}4$. Elle est bien comprise entre 0 et 1, ce qui est le contrôle à faire.",
      micros: ["stat_effectif_frequence"],
    },
    {
      question:
        "Un élève dit : « dans une classe de $30$ élèves, $12$ font du basket, donc la fréquence est $12$ ». A-t-il raison ?",
      correction:
        "Non : $12$ est l'EFFECTIF. La fréquence est $\\dfrac{12}{30} = 0{,}4$, soit $40\\,\\%$. Une fréquence ne dépasse jamais 1.",
      micros: ["stat_effectif_frequence"],
    },
    {
      question: "Quelle est la moyenne de $8$ ; $10$ ; $12$ ?",
      correction: "La somme vaut $30$, il y a $3$ valeurs, donc la moyenne est $30 \\div 3 = 10$.",
      micros: ["stat_moyenne"],
    },
    {
      question: "Quelle est la médiane de la série rangée $4$ ; $7$ ; $9$ ; $12$ ; $15$ ?",
      correction:
        "Cinq valeurs, donc un nombre impair : la médiane est celle du milieu, soit $9$. Deux valeurs se trouvent en dessous, deux au-dessus.",
      micros: ["stat_mediane"],
    },
    {
      question: "Quelle est la médiane de la série rangée $4$ ; $8$ ; $10$ ; $14$ ?",
      correction:
        "Quatre valeurs, donc un nombre pair : la médiane est la moyenne des deux valeurs centrales, $(8 + 10) \\div 2 = 9$.",
      micros: ["stat_mediane"],
    },
    {
      question: "Quelle est l'étendue de la série $4$ ; $7$ ; $9$ ; $15$ ?",
      correction:
        "$15 - 4 = 11$. C'est une soustraction entre la plus grande et la plus petite valeur, jamais une somme.",
      micros: ["stat_etendue"],
    },
    {
      question:
        "Série A : $10$ ; $11$ ; $12$. Série B : $2$ ; $11$ ; $20$. Laquelle est la plus régulière ?",
      correction:
        "La série A, dont l'étendue vaut $2$ contre $18$ pour la série B. Leurs moyennes sont pourtant identiques, toutes deux égales à $11$ : c'est bien la dispersion qui les distingue.",
      micros: ["stat_etendue", "stat_defi"],
    },
    {
      question:
        "Dans une série, une valeur très grande apparaît. Quel indicateur est le plus modifié ?",
      correction:
        "La moyenne, car cette valeur entre dans la somme avec tout son poids. La médiane ne compte que les rangs : elle ne se décale que d'un cran.",
      micros: ["stat_interpreter"],
    },
    {
      question:
        "Pour décrire le salaire typique d'une entreprise où quelques dirigeants gagnent énormément, quel indicateur choisir ?",
      correction:
        "La médiane. La moyenne serait tirée vers le haut par les hauts salaires et ne décrirait la situation de personne. La médiane désigne la personne exactement au milieu.",
      micros: ["stat_interpreter"],
    },
  ],
  coachHref: "/coach?matiere=maths&classe=3e&notion=stat_statistique",
};

// ─── Mode classe ───────────────────────────────────────────────────────────────
// ⛔ AUCUN LaTeX DANS CES DIAPOSITIVES. `ModeClasse` ne rend pas KaTeX : une
// formule écrite entre dollars s'afficherait EN CLAIR sur le tableau de la
// classe, code compris. Tout s'écrit donc en toutes lettres.

export const slidesStatistiques3e: ClasseSlide[] = [
  {
    titre: "Une moyenne peut ne décrire personne",
    badge: "Ce qu'on va comprendre",
    section: {
      type: "objectif",
      phrase: "Le salaire moyen de cette entreprise est de quatre mille euros",
      sousPhrase:
        "La phrase est peut-être exacte, et pourtant presque personne n'y gagne cette somme. Il suffit que quelques dirigeants tirent la moyenne vers le haut.",
      encadre: {
        titre: "Ce que la troisième ajoute",
        texte:
          "Calculer une moyenne, une médiane et une étendue, vous savez le faire. Savoir LEQUEL des trois dit la vérité sur une série, c'est le travail de cette année.",
      },
    },
  },
  {
    titre: "Deux sortes d'indicateurs",
    badge: "Le vocabulaire",
    teinte: "essentiel",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "La position",
        contenu:
          "La moyenne et la médiane. Elles donnent une valeur centrale, autour de laquelle la série se tient.",
      },
      droite: {
        variante: "info",
        titre: "La dispersion",
        contenu:
          "L'étendue. Elle dit au contraire à quel point les valeurs s'écartent les unes des autres. Il faut toujours un indicateur de chaque sorte.",
      },
    },
  },
  {
    titre: "Effectif ou fréquence",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on lit sur les copies",
        contenu:
          "Douze élèves sur trente font du basket, donc la fréquence est douze.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qui est vrai",
        contenu:
          "Douze est l'EFFECTIF, un comptage. La fréquence est douze sur trente, soit zéro virgule quatre, ou quarante pour cent. Une fréquence tient toujours entre zéro et un.",
      },
    },
  },
  {
    titre: "Calculer les trois",
    badge: "Les gestes",
    section: {
      type: "etapes",
      etapes: [
        "La MOYENNE : j'additionne toutes les valeurs, puis je divise par leur nombre. Elle tombe toujours entre la plus petite et la plus grande.",
        "La MÉDIANE : je RANGE d'abord la série. C'est l'étape qu'on saute, et sans elle la méthode est fausse.",
        "Nombre impair de valeurs : la médiane est celle du milieu. Nombre pair : c'est la moyenne des deux valeurs centrales.",
        "L'ÉTENDUE : la plus grande moins la plus petite. Une soustraction, jamais une somme.",
      ],
    },
  },
  {
    titre: "La moyenne seule ment",
    badge: "Le cœur du chapitre",
    teinte: "essentiel",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Classe A",
        contenu:
          "Moyenne de douze, étendue de quatre. Les notes sont groupées, entre dix et quatorze par exemple.",
      },
      droite: {
        variante: "info",
        titre: "Classe B",
        contenu:
          "La MÊME moyenne de douze, mais une étendue de seize. Il y a donc des quatre et des vingt dans la même classe. La moyenne ne distingue pas ces deux situations.",
      },
    },
  },
  {
    titre: "La médiane résiste, la moyenne cède",
    badge: "Les valeurs extrêmes",
    teinte: "essentiel",
    section: {
      type: "objectif",
      phrase: "Cinq salaires : mille huit cents, mille neuf cents, deux mille, deux mille cent, et douze mille deux cents",
      sousPhrase:
        "La moyenne vaut quatre mille euros. Or quatre personnes sur cinq gagnent moins de la moitié de cette somme : le salaire du dirigeant entre dans la somme avec tout son poids.",
      encadre: {
        titre: "Pourquoi la médiane tient",
        texte:
          "Elle ne compte que les RANGS, jamais les montants. Ici elle vaut deux mille euros — et celle-là décrit bien la situation ordinaire.",
      },
    },
  },
  {
    titre: "Un chiffre politique",
    badge: "À quoi ça sert vraiment",
    section: {
      type: "objectif",
      phrase: "Revenu moyen, ou revenu médian ?",
      sousPhrase:
        "Les deux chiffres sont exacts, et ils racontent deux histoires différentes. Le revenu moyen est tiré vers le haut par quelques très hauts revenus ; le revenu médian désigne la personne exactement au milieu, et il est toujours plus bas.",
      encadre: {
        titre: "La compétence de citoyen",
        texte:
          "Savoir lequel des deux on vous présente. C'est une question de mathématiques, et c'en est aussi une de lecture de l'information.",
      },
    },
  },
  {
    titre: "Choisir selon la question",
    badge: "La méthode",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Le total partagé également",
          texte:
            "C'est la moyenne. Elle répond à : si l'on redistribuait tout à parts égales, combien chacun aurait-il ?",
        },
        {
          titre: "Couper la population en deux",
          texte:
            "C'est la médiane. Autant d'individus en dessous qu'au-dessus. C'est elle qu'on choisit s'il y a une valeur extrême.",
        },
        {
          titre: "Étalé ou regroupé",
          texte:
            "C'est l'étendue. Elle ne dit rien du centre : elle dit seulement si les valeurs sont proches ou éloignées.",
        },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce: "Dans une classe, dix élèves ont eu douze sur vingt, et cinq élèves ont eu dix-huit sur vingt.",
      question: "Quelle est la moyenne de la classe ?",
      correction:
        "Chaque note compte autant de fois qu'il y a d'élèves qui l'ont obtenue. La somme vaut donc dix fois douze, soit cent vingt, plus cinq fois dix-huit, soit quatre-vingt-dix : deux cent dix en tout. L'effectif TOTAL est de quinze élèves — et non deux, qui serait le nombre de lignes du tableau. C'est l'erreur habituelle. La moyenne vaut donc deux cent dix divisé par quinze, soit quatorze. Et l'on contrôle : quatorze est bien compris entre douze et dix-huit, et plus proche de douze, ce qui est cohérent puisque deux fois plus d'élèves ont eu cette note.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce:
        "La série A vaut dix, onze, douze. La série B vaut deux, onze, vingt.",
      question: "Calculez leur moyenne à chacune, puis leur étendue. Que remarquez-vous ?",
      indice: "Commencez par les moyennes, et comparez-les avant de calculer les étendues.",
      correction:
        "Pour la série A : dix plus onze plus douze font trente-trois, divisé par trois, soit onze. Pour la série B : deux plus onze plus vingt font trente-trois également, donc onze aussi. Les deux moyennes sont IDENTIQUES. Passons aux étendues. Pour A : douze moins dix, soit deux. Pour B : vingt moins deux, soit dix-huit. Cette fois tout les sépare. La leçon est là : deux séries qui n'ont rien à voir peuvent avoir exactement la même moyenne. Un seul indicateur ne décrit jamais une série — il en faut un de position et un de dispersion.",
    },
  },
];
