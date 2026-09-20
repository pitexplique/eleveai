// ─── Fiche de cours : pourcentages et évolutions (2de) ────────────────────────
//
// Seizième fiche de seconde (20/09/2026). Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/information-chiffree.bank.ts
// (notion information_chiffree_evolutions), renforcée le même jour de huit
// énoncés « fiche de paie ». Elle va avec la feuille
// lib/fiches-exercices/maths-seconde-information-chiffree.tsx et avec le short
// « fiche de paie : −47 % ou +89 % ? » — le trio de la Une.
//
// ⭐⭐ L'IDÉE DIRECTRICE : UN POURCENTAGE NE DIT RIEN SANS SON TOTAL. Le même
// bulletin de paie donne 47 % (du coût) et 89 % (du net), et les deux sont
// justes. Toute la fiche pose la même question avant chaque calcul : « pour
// cent de QUOI ? ». Les évolutions en découlent : −47 % à l'aller, +89 % au
// retour, parce que le total a changé entre les deux.
//
// ⭐ L'EXEMPLE FIL ROUGE a des nombres ronds, choisis pour tomber juste : coût
// 5 000 €, net 2 650 €, donc 47 % exactement et un coefficient de 0,53. C'est
// proche du salaire moyen français de 2025 selon l'OCDE (5 223 € et 2 759 € par
// mois, 47,2 %). Les VRAIS chiffres sont dans la feuille d'exercices, avec leurs
// sources en tête de fichier.
//
// ⛔ LA FICHE CALCULE, ELLE NE JUGE PAS : les prélèvements financent la
// retraite, la santé, le chômage. Aucune phrase ne dit « trop » ni « pas assez ».
//
// ⛔ Aucun calcul de la feuille d'exercices n'est repris ici.
//
// ⛔ Écrit simplement (règle de la fille de Frédéric, en tête de types.ts) : une
// phrase par idée, le mot de la classe.
//
// Micro-compétences couvertes :
// - info_proportion                  → définition, figure, propriété 1, exemple 1, exos 1-2, 10
// - info_pourcentage_de_pourcentage  → propriété 2, exo 3
// - info_variation_absolue_relative  → propriété 3, exemple 2, exos 4-5
// - info_taux_evolution              → propriété 4, méthode, exos 6, 9
// - info_evolutions_successives      → propriété 5, exemples 3-4, exo 7
// - info_evolution_reciproque        → propriété 6, exemple 1, exos 8, 10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/**
 * Un tableau — HTML, donc lisible même dans un bloc de 80 px.
 * ⛔ Du texte NU, sans un seul dollar : `TexteMath` ne traverse pas les données
 * d'une figure. ⛔ Deux colonnes de valeurs, jamais trois : à 375 px la
 * troisième sort de la carte.
 */
function tableau(
  headers: [string, string],
  rows: { label: string; values: [string | number, string | number] }[],
  title?: string,
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        title,
        headers,
        rows,
        display: { striped: true, compact: true },
      }}
    />
  );
}

export const ficheInformationChiffreeSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "information-chiffree-evolutions",
  titre: "Pourcentages et évolutions",
  accroche:
    "Sur une fiche de paie, les mêmes euros font 47 % ou 89 %, et les deux sont justes. Tout le chapitre tient dans une question à poser avant chaque calcul : pour cent de QUOI ?",
  identite: [
    { label: "Mots clés", valeur: "Proportion, total de référence, point, taux d'évolution, coefficient multiplicateur" },
    { label: "Le secret", valeur: "Avant de calculer, écrire le total : « en pourcentage de … »" },
    { label: "Outil", valeur: "Le coefficient multiplicateur : on multiplie, on ne soustrait plus" },
  ],

  definition: {
    texte:
      "La PROPORTION d'une partie dans un total est le quotient $\\dfrac{\\text{partie}}{\\text{total}}$. C'est un nombre entre $0$ et $1$, qu'on écrit souvent en pourcentage : $0{,}47 = 47\\,\\%$. Le total s'appelle l'ENSEMBLE DE RÉFÉRENCE. Si on change de total, on change de pourcentage, même si la partie reste la même.",
  },

  figure: {
    schema: tableau(
      ["du coût : 5 000 €", "du net : 2 650 €"],
      [{ label: "2 350 € font", values: ["47 %", "88,7 %"] }],
      "Le même bulletin, deux pourcentages",
    ),
    legende:
      "Un salarié coûte 5 000 € à son employeur et touche 2 650 € net. Les prélèvements font 2 350 €. Rapportés au coût : 47 %. Rapportés au net : 88,7 %. Les deux nombres sont justes : ils n'ont pas le même total.",
  },

  proprietes: [
    {
      titre: "Une proportion a toujours un total",
      texte:
        "$\\text{proportion} = \\dfrac{\\text{partie}}{\\text{total}}$. Pour les mêmes $2\\,350\\,€$ : $\\dfrac{2\\,350}{5\\,000} = 47\\,\\%$ du coût, et $\\dfrac{2\\,350}{2\\,650} \\approx 88{,}7\\,\\%$ du net. ⛔ Un pourcentage donné sans son total ne veut rien dire.",
      schema: tableau(
        ["Total choisi", "Pourcentage"],
        [
          { label: "du coût", values: ["5 000 €", "47 %"] },
          { label: "du net", values: ["2 650 €", "88,7 %"] },
        ],
        "La partie ne change pas : 2 350 €",
      ),
      micros: ["info_proportion"],
    },
    {
      titre: "Proportion de proportion : on MULTIPLIE",
      texte:
        "Si $40\\,\\%$ des élèves sont en seconde et si $25\\,\\%$ de ces élèves font du latin, alors les latinistes de seconde sont $0{,}40 \\times 0{,}25 = 0{,}10 = 10\\,\\%$ de tous les élèves. ⛔ Les $25\\,\\%$ portent sur les secondes, pas sur tout le lycée.",
      schema: tableau(
        ["Proportion", "de quel total ?"],
        [
          { label: "Secondes", values: ["40 %", "du lycée"] },
          { label: "Latinistes", values: ["25 %", "des secondes"] },
          { label: "Donc", values: ["10 %", "du lycée"] },
        ],
        "On multiplie : 0,40 × 0,25",
      ),
      micros: ["info_pourcentage_de_pourcentage"],
    },
    {
      titre: "Variation absolue, variation relative, et les POINTS",
      texte:
        "Absolue : $V_A - V_D$, dans l'unité des valeurs. Relative : $\\dfrac{V_A - V_D}{V_D}$, en pourcentage de la valeur de DÉPART. ⚠️ Entre deux pourcentages, la variation absolue se dit en POINTS : de $50\\,\\%$ à $45\\,\\%$, c'est $-5$ points, et $\\dfrac{-5}{50} = -10\\,\\%$ en relatif.",
      schema: tableau(
        ["en points", "en relatif"],
        [{ label: "de 50 % à 45 %", values: ["−5 points", "−10 %"] }],
        "Deux nombres pour le même fait",
      ),
      micros: ["info_variation_absolue_relative"],
    },
    {
      titre: "Taux d'évolution et coefficient multiplicateur",
      texte:
        "Augmenter de $t\\,\\%$, c'est multiplier par $CM = 1 + \\dfrac{t}{100}$. Baisser de $t\\,\\%$, c'est multiplier par $CM = 1 - \\dfrac{t}{100}$. Dans l'autre sens : $t = (CM - 1) \\times 100$. Un $CM$ plus grand que $1$ est une hausse ; plus petit que $1$, une baisse.",
      schema: tableau(
        ["Évolution", "Coefficient"],
        [
          { label: "hausse", values: ["+20 %", "× 1,20"] },
          { label: "baisse", values: ["−22 %", "× 0,78"] },
          { label: "baisse", values: ["−47 %", "× 0,53"] },
        ],
        "Du taux au coefficient",
      ),
      micros: ["info_taux_evolution"],
    },
    {
      titre: "Évolutions successives : on MULTIPLIE les coefficients",
      texte:
        "Deux évolutions à la suite : $CM_{\\text{global}} = CM_1 \\times CM_2$. Une hausse de $20\\,\\%$ puis une baisse de $20\\,\\%$ donnent $1{,}2 \\times 0{,}8 = 0{,}96$, soit $-4\\,\\%$. ⛔ Les pourcentages ne s'additionnent pas : le second porte sur une valeur déjà modifiée.",
      schema: tableau(
        ["Coefficient", "Valeur"],
        [
          { label: "départ", values: ["", "100 €"] },
          { label: "+20 %", values: ["× 1,2", "120 €"] },
          { label: "−20 %", values: ["× 0,8", "96 €"] },
        ],
        "+20 % puis −20 % : on perd 4 %",
      ),
      micros: ["info_evolutions_successives"],
    },
    {
      titre: "Évolution réciproque : on prend l'INVERSE",
      texte:
        "Pour revenir à la valeur de départ, on multiplie par $\\dfrac{1}{CM}$. Après une baisse de $47\\,\\%$ : $\\dfrac{1}{0{,}53} \\approx 1{,}887$, soit une hausse de $88{,}7\\,\\%$. C'est le bulletin de la figure : $-47\\,\\%$ du coût au net, $+88{,}7\\,\\%$ du net au coût.",
      schema: tableau(
        ["Coefficient", "Taux"],
        [
          { label: "coût → net", values: ["× 0,53", "−47 %"] },
          { label: "net → coût", values: ["× 1,887", "+88,7 %"] },
        ],
        "L'aller et le retour n'ont pas le même taux",
      ),
      micros: ["info_evolution_reciproque"],
    },
  ],

  reel: {
    texte:
      "Une fiche de paie est un empilement de pourcentages. La CSG vaut $9{,}2\\,\\%$ d'une base qui vaut elle-même $98{,}25\\,\\%$ du brut : un pourcentage de pourcentage. Du coût pour l'employeur au brut, puis du brut au net : deux évolutions successives. Et quand un journal écrit « la moitié du salaire part en prélèvements » pendant qu'un autre écrit « presque le double du net », ils lisent le même bulletin avec deux totaux différents. Ces prélèvements paient la retraite, la santé et le chômage ; les maths ne disent pas si c'est trop ou pas assez. Elles disent ce que chaque nombre mesure.",
  },

  historique: {
    texte:
      "Au XVe siècle, les marchands italiens calculent leurs intérêts et leurs taxes « per cento », pour cent. À force d'être abrégée dans les livres de comptes, l'expression devient un signe : $\\%$. Plus près de nous, la CSG est créée en France en 1991, au taux de $1{,}1\\,\\%$. Elle est à $9{,}2\\,\\%$ sur les salaires depuis 2018 : $8{,}1$ points de plus, et un taux multiplié par plus de $8$. Deux façons justes de dire la même histoire.",
  },

  methode: [
    {
      titre: "1. Écrire le total",
      texte:
        "Avant tout calcul, on complète la phrase : « en pourcentage de … ». Du coût ou du net ? De la valeur de départ ou d'arrivée ? Des cadres ou de tous les salariés ? La moitié des erreurs du chapitre se règlent ici.",
      micros: ["info_proportion"],
    },
    {
      titre: "2. Passer au coefficient",
      texte:
        "On traduit chaque pourcentage d'évolution en coefficient : $+8\\,\\%$ devient $\\times 1{,}08$, $-35\\,\\%$ devient $\\times 0{,}65$. Ensuite on ne fait plus que des multiplications et des divisions.",
      micros: ["info_taux_evolution"],
    },
    {
      titre: "3. Multiplier pour avancer, diviser pour revenir",
      texte:
        "Valeur d'arrivée $=$ valeur de départ $\\times\\ CM$. Valeur de départ $=$ valeur d'arrivée $\\div\\ CM$. Plusieurs évolutions : on multiplie les coefficients entre eux.",
      micros: ["info_evolutions_successives", "info_evolution_reciproque"],
    },
    {
      titre: "4. Conclure avec l'unité",
      texte:
        "On revient au taux : $t = (CM - 1) \\times 100$. Et on écrit l'unité : des euros, des pour cent, ou des points quand on compare deux pourcentages.",
      micros: ["info_variation_absolue_relative"],
    },
  ],

  usages: [
    {
      titre: "On cherche une part",
      detail: "On divise la partie par le total, et on nomme le total. $\\dfrac{2\\,350}{5\\,000} = 47\\,\\%$ du coût.",
      micros: ["info_proportion"],
    },
    {
      titre: "On cherche une évolution",
      detail: "On divise l'arrivée par le départ : c'est le coefficient. $\\dfrac{2\\,650}{5\\,000} = 0{,}53$, donc $-47\\,\\%$.",
      micros: ["info_taux_evolution"],
    },
    {
      titre: "On cherche la valeur de départ",
      detail: "On divise l'arrivée par le coefficient. Net de $2\\,650\\,€$ après $-47\\,\\%$ : $\\dfrac{2\\,650}{0{,}53} = 5\\,000\\,€$.",
      micros: ["info_evolution_reciproque"],
    },
  ],

  exemples: [
    {
      titre: "Le bulletin à deux pourcentages",
      donnees: "Un salarié coûte $5\\,000\\,€$ par mois à son employeur. Il touche $2\\,650\\,€$ net.",
      question: "Exprimer les prélèvements en pourcentage du coût, puis du net. Quel lien avec l'évolution réciproque ?",
      solution:
        "Prélèvements : $5\\,000 - 2\\,650 = 2\\,350\\,€$. Du coût : $\\dfrac{2\\,350}{5\\,000} = 47\\,\\%$. Du net : $\\dfrac{2\\,350}{2\\,650} \\approx 88{,}7\\,\\%$. Du coût au net, on multiplie par $0{,}53$ ; du net au coût, par $\\dfrac{1}{0{,}53} \\approx 1{,}887$, soit $+88{,}7\\,\\%$. C'est le même nombre : la part des prélèvements dans le net EST le taux du chemin retour.",
      schema: tableau(
        ["Coefficient", "Taux"],
        [
          { label: "coût → net", values: ["× 0,53", "−47 %"] },
          { label: "net → coût", values: ["× 1,887", "+88,7 %"] },
        ],
      ),
      micros: ["info_proportion", "info_evolution_reciproque"],
    },
    {
      titre: "Des points ou des pour cent ?",
      donnees: "En 2018, le taux de la CSG sur les salaires est passé de $7{,}5\\,\\%$ à $9{,}2\\,\\%$.",
      question: "Donner la variation en points, puis la variation relative.",
      solution:
        "En points : $9{,}2 - 7{,}5 = 1{,}7$ point. En relatif : $\\dfrac{1{,}7}{7{,}5} \\approx 0{,}227$, soit $+22{,}7\\,\\%$. Dire « la CSG a augmenté de $1{,}7\\,\\%$ » est faux : c'est $1{,}7$ POINT, ou $22{,}7\\,\\%$.",
      schema: tableau(
        ["en points", "en relatif"],
        [{ label: "de 7,5 % à 9,2 %", values: ["+1,7 point", "+22,7 %"] }],
      ),
      micros: ["info_variation_absolue_relative"],
    },
    {
      titre: "Du coût au net, en deux étapes",
      donnees: "Du coût pour l'employeur au salaire brut, on retire $25\\,\\%$. Du brut au net, on retire $22\\,\\%$.",
      question: "Quel pourcentage a-t-on retiré en tout ?",
      solution:
        "On passe aux coefficients : $0{,}75$ puis $0{,}78$. On multiplie : $0{,}75 \\times 0{,}78 = 0{,}585$. Il reste $58{,}5\\,\\%$ du coût : on a retiré $41{,}5\\,\\%$. ⛔ Et non $25 + 22 = 47\\,\\%$ : les $22\\,\\%$ portent sur le brut, qui est plus petit que le coût.",
      schema: tableau(
        ["Coefficient", "Il reste"],
        [
          { label: "coût", values: ["", "100 %"] },
          { label: "brut", values: ["× 0,75", "75 %"] },
          { label: "net", values: ["× 0,78", "58,5 %"] },
        ],
      ),
      micros: ["info_evolutions_successives"],
    },
    {
      titre: "Un salaire et des prix",
      donnees: "En vingt ans, un salaire a augmenté de $50\\,\\%$ et les prix de $38\\,\\%$.",
      question: "De combien le pouvoir d'achat de ce salaire a-t-il augmenté ?",
      solution:
        "On divise les coefficients : $\\dfrac{1{,}50}{1{,}38} \\approx 1{,}087$. Le pouvoir d'achat a augmenté d'environ $8{,}7\\,\\%$. ⛔ Et non $50 - 38 = 12\\,\\%$ : on ne soustrait pas deux pourcentages qui n'ont pas le même total.",
      micros: ["info_evolutions_successives"],
    },
  ],

  pieges: [
    "Donner un pourcentage sans dire de quoi. « $47\\,\\%$ de prélèvements » : du coût, ou du net ? Les deux phrases sont justes, et elles ne disent pas la même chose.",
    "Confondre points et pour cent. De $50\\,\\%$ à $45\\,\\%$ : $-5$ points, mais $-10\\,\\%$.",
    "Additionner des pourcentages d'évolution. $+20\\,\\%$ puis $-20\\,\\%$ ne font pas $0$ : $1{,}2 \\times 0{,}8 = 0{,}96$.",
    "Croire que $-47\\,\\%$ s'annule par $+47\\,\\%$. Il faut $+88{,}7\\,\\%$ : le total a changé entre l'aller et le retour.",
    "Diviser par la valeur d'arrivée. Le taux d'évolution se rapporte toujours à la valeur de DÉPART.",
  ],

  aRetenir: [
    "Proportion $= \\dfrac{\\text{partie}}{\\text{total}}$. On nomme toujours le total.",
    "Proportion de proportion : on multiplie.",
    "Entre deux pourcentages, l'écart se compte en points.",
    "$CM = 1 + \\dfrac{t}{100}$ ; et $t = (CM - 1) \\times 100$.",
    "Évolutions successives : on multiplie les $CM$. Évolution réciproque : on prend $\\dfrac{1}{CM}$.",
  ],

  entrainement: [
    {
      question: "Dans une classe de $24$ élèves, $18$ ont un abonnement de bus. Quelle proportion, en pourcentage ?",
      correction: "$\\dfrac{18}{24} = 0{,}75$, soit $75\\,\\%$ des élèves de la classe.",
      micros: ["info_proportion"],
    },
    {
      question: "Une prime vaut $15\\,\\%$ d'un salaire de $3\\,200\\,€$. Calculer la prime.",
      correction: "$3\\,200 \\times 0{,}15 = 480\\,€$.",
      micros: ["info_proportion"],
    },
    {
      question: "$60\\,\\%$ des élèves d'un lycée sont demi-pensionnaires, et $25\\,\\%$ des demi-pensionnaires choisissent le menu végétarien. Quelle part de tous les élèves cela représente-t-il ?",
      correction: "$0{,}60 \\times 0{,}25 = 0{,}15$, soit $15\\,\\%$ des élèves du lycée. Les $25\\,\\%$ portaient sur les demi-pensionnaires seulement.",
      micros: ["info_pourcentage_de_pourcentage"],
    },
    {
      question: "Un loyer passe de $600\\,€$ à $642\\,€$. Donner la variation absolue, puis la variation relative.",
      correction: "Absolue : $642 - 600 = 42\\,€$. Relative : $\\dfrac{42}{600} = 0{,}07$, soit $+7\\,\\%$.",
      micros: ["info_variation_absolue_relative"],
    },
    {
      question: "Le taux de réussite à un examen passe de $80\\,\\%$ à $84\\,\\%$. Donner la hausse en points, puis en pourcentage.",
      correction: "En points : $84 - 80 = 4$ points. En relatif : $\\dfrac{4}{80} = 0{,}05$, soit $+5\\,\\%$.",
      micros: ["info_variation_absolue_relative"],
    },
    {
      question: "a) Quel coefficient correspond à une baisse de $35\\,\\%$ ? b) Quelle évolution correspond au coefficient $1{,}08$ ?",
      correction: "a) $1 - 0{,}35 = 0{,}65$. b) $1{,}08 - 1 = 0{,}08$ : une hausse de $8\\,\\%$.",
      micros: ["info_taux_evolution"],
    },
    {
      question: "Un prix augmente de $30\\,\\%$, puis baisse de $30\\,\\%$. Quelle est l'évolution globale ?",
      correction: "$1{,}3 \\times 0{,}7 = 0{,}91$ : une baisse de $9\\,\\%$. Les deux pourcentages ne se compensent pas.",
      micros: ["info_evolutions_successives"],
    },
    {
      question: "Un prix a augmenté de $25\\,\\%$. Quelle baisse le ramène à sa valeur de départ ?",
      correction: "$\\dfrac{1}{1{,}25} = 0{,}8$ : une baisse de $20\\,\\%$.",
      micros: ["info_evolution_reciproque"],
    },
    {
      question: "Après une hausse de $15\\,\\%$, un article coûte $69\\,€$. Quel était son prix avant la hausse ?",
      correction: "On divise par le coefficient : $\\dfrac{69}{1{,}15} = 60\\,€$. ⛔ Retirer $15\\,\\%$ de $69\\,€$ donnerait $58{,}65\\,€$ : c'est faux.",
      micros: ["info_taux_evolution", "info_evolution_reciproque"],
    },
    {
      question: "Un salarié coûte $3\\,200\\,€$ à son employeur et touche $2\\,000\\,€$ net. a) Exprimer les prélèvements en pourcentage du coût, puis du net. b) De quel pourcentage faut-il augmenter le net pour retrouver le coût ?",
      correction: "a) Prélèvements : $1\\,200\\,€$. Du coût : $\\dfrac{1\\,200}{3\\,200} = 37{,}5\\,\\%$. Du net : $\\dfrac{1\\,200}{2\\,000} = 60\\,\\%$. b) Coefficient du coût au net : $\\dfrac{2\\,000}{3\\,200} = 0{,}625$. L'inverse : $\\dfrac{1}{0{,}625} = 1{,}6$, soit $+60\\,\\%$. C'est le même nombre qu'au a) : ce n'est pas un hasard.",
      micros: ["info_proportion", "info_evolution_reciproque"],
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesInformationChiffreeSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Pourcentages et évolutions - 2de",
    section: {
      type: "objectif",
      phrase: "Avant chaque pourcentage, poser la question : pour cent de QUOI ?",
      sousPhrase:
        "Le même bulletin de paie donne 47 % ou 89 % selon le total choisi. Proportions, points, coefficients : tout le chapitre en découle.",
    },
  },
];
