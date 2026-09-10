// ─── Fiche de cours : développement et factorisation (2de) ────────────────────
//
// Quatorzième fiche de seconde. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/developpement-factorisation.bank.ts
// (notion developpement_factorisation_2de), et sur la 5e comme étalon.
//
// ⭐⭐ FRÉDÉRIC, 10/09/2026, ET C'EST LE FIL DE TOUTE LA FICHE : « surtout
// explique bien que c'est pour RÉSOUDRE une équation produit nul ». Le coach
// n'avait AUCUN item dessus — mesuré sur le fichier entier. On ne factorise pas
// pour faire joli : on factorise parce qu'un produit nul se résout et qu'une
// somme ne se résout pas. Sans ce « pourquoi », l'élève apprend une
// transformation sans savoir ce qu'elle lui achète.
//
// ⭐ ET UN TROISIÈME USAGE, qu'il a ajouté : « on factorise aussi pour SIMPLIFIER
// UNE FRACTION, mais plus rare ». Il est dans les usages, à sa juste place —
// après résoudre, avant rien.
//
// ⭐ LE SCHÉMA QU'IL A DEMANDÉ : « Factorisation (produit) ⟷ Développement
// (addition) ». Il ouvre la fiche, parce qu'il dit d'un coup d'œil ce que les
// deux mots recouvrent et qu'ils vont dans des sens opposés.
//
// ⛔ LE PIÈGE CENTRAL : soustraire une parenthèse. $5 - (x + 3)$ vaut $2 - x$ et
// non $2 + x$ — le signe moins change TOUS les termes. Zéro item au coach avant
// aujourd'hui, alors que l'erreur survit jusqu'en terminale.
//
// Micro-compétences couvertes :
// - devfac_developper_simple    → propriété « Développer », le piège du moins, exos 1-2
// - devfac_developper_double    → propriété « La double distributivité », exemple 1, exos 3-4
// - devfac_facteur_commun       → propriété « Factoriser », usages « Simplifier », exos 5-6
// - devfac_factoriser_identite  → propriété « Les identités », exemple 3, exos 7-8
// - devfac_choisir_forme        → figure, usages « Résoudre », exemples 2 et 4, exos 9-10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import TexteMath from "@/components/fiches/TexteMath";
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
 * ⭐ LE SCHÉMA DEMANDÉ PAR FRÉDÉRIC : deux formes, deux sens.
 *
 * Une double flèche entre la forme FACTORISÉE (un produit) et la forme
 * DÉVELOPPÉE (une somme). C'est la carte du chapitre : tout le reste consiste à
 * savoir dans quel sens aller, et pourquoi.
 *
 * ⚠️ Les deux blocs s'empilent en poche (`flex-col sm:flex-row`) — la leçon des
 * cartes de `cas`, qui tombaient à 93 px sur un téléphone.
 */
function deuxSens(
  produit: string,
  somme: string,
  legende?: string,
) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <div className="flex-1 rounded-lg bg-white px-2 py-3 text-center ring-1 ring-slate-200">
          <div className="text-base text-slate-900">
            <TexteMath>{`$${produit}$`}</TexteMath>
          </div>
          <div className="mt-1 text-xs font-bold" style={{ color: BLEU }}>
            FACTORISÉE — un produit
          </div>
        </div>

        <div className="flex flex-col items-center px-1 text-slate-400">
          <span className="text-lg leading-none">⟶</span>
          <span className="my-0.5 text-[10px] font-semibold uppercase tracking-wide">
            développer
          </span>
          <span className="text-lg leading-none">⟵</span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide">
            factoriser
          </span>
        </div>

        <div className="flex-1 rounded-lg bg-white px-2 py-3 text-center ring-1 ring-slate-200">
          <div className="text-base text-slate-900">
            <TexteMath>{`$${somme}$`}</TexteMath>
          </div>
          <div className="mt-1 text-xs font-bold" style={{ color: ROUGE }}>
            DÉVELOPPÉE — une somme
          </div>
        </div>
      </div>
      {legende ? (
        <p className="mt-2 text-center text-xs leading-5 text-slate-500">{legende}</p>
      ) : null}
    </div>
  );
}

export const ficheDevFacSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "developpement-factorisation-2de",
  titre: "Développement et factorisation",
  accroche:
    "Deux écritures pour la même expression, et deux sens pour passer de l'une à l'autre. Ce n'est pas un exercice de style : on choisit la forme selon ce qu'on veut FAIRE. Et la raison numéro un de factoriser, c'est de résoudre — parce qu'un produit nul se résout, alors qu'une somme ne se résout pas.",
  identite: [
    { label: "Mots clés", valeur: "Produit, somme, facteur commun, parenthèses" },
    { label: "Le secret", valeur: "Un produit qui vaut zéro, c'est l'un de ses morceaux qui vaut zéro" },
    { label: "Outil", valeur: "Deux écritures, et on prend celle qui rend la question facile" },
  ],

  definition: {
    texte:
      "DÉVELOPPER, c'est transformer un PRODUIT en SOMME : $3(x+2) = 3x + 6$. FACTORISER, c'est le chemin inverse — transformer une somme en produit : $3x + 6 = 3(x+2)$. Les deux écritures désignent exactement le même nombre pour chaque valeur de $x$ ; seule leur FORME change, et c'est la forme qui décide de ce qu'on peut en faire.",
  },

  figure: {
    schema: deuxSens(
      "(x - 2)(x + 5)",
      "x^2 + 3x - 10",
      "La même expression, écrite de deux façons. À gauche on voit les SOLUTIONS ; à droite on voit le coefficient de x² et le nombre constant.",
    ),
    legende:
      "⭐ On ne factorise pas par principe, et on ne développe pas par principe : on choisit le sens selon la question. Résoudre demande la gauche ; calculer une image ou reconnaître un degré demande la droite.",
  },

  proprietes: [
    {
      titre: "⭐ Pourquoi on factorise : le produit nul",
      texte:
        "Un produit est nul SI ET SEULEMENT SI l'un au moins de ses facteurs est nul. C'est la seule règle du programme qui transforme une équation en deux équations faciles — et elle ne s'applique QU'À UN PRODUIT. Voilà à quoi sert la factorisation.",
      schema: egalites(
        [
          `(x - ${enBleu("2")})(x + ${enRouge("5")}) = 0`,
          `x - ${enBleu("2")} = 0 \\quad \\text{ou} \\quad x + ${enRouge("5")} = 0`,
          `x = ${enBleu("2")} \\quad \\text{ou} \\quad x = ${enRouge("-5")}`,
        ],
        "⛔ Sur la forme développée x² + 3x − 10 = 0, aucune règle de seconde ne s'applique. C'est pour ça qu'on factorise.",
      ),
    },
    {
      titre: "Développer : chacun avec chacun",
      texte:
        "$k(a+b) = ka + kb$ : le facteur devant multiplie CHAQUE terme. Pour un produit de deux parenthèses, quatre produits à faire — et les deux termes du milieu se regroupent.",
      schema: egalites(
        [
          `(2x + 3)(x + 4)`,
          `2x^2 + ${enVert("8x")} + ${enVert("3x")} + 12`,
          `2x^2 + ${enRouge("11x")} + 12`,
        ],
        "Les deux produits croisés, en vert, se regroupent : c'est là qu'on oublie un terme.",
      ),
    },
    {
      titre: "⛔ Le moins devant la parenthèse",
      texte:
        "Un signe moins devant une parenthèse change le signe de TOUS les termes qu'elle contient : $-(A + B) = -A - B$. C'est l'erreur de signe la plus tenace du lycée, et elle ne se corrige qu'en la voyant écrite.",
      schema: egalites(
        [
          `5 - (x + 3)`,
          `5 - x ${enRouge("- 3")}`,
          `= ${enVert("2 - x")}`,
        ],
        "⛔ Et non 2 + x : le +3 devient −3 lui aussi.",
      ),
    },
    {
      titre: "Factoriser : chercher le facteur commun",
      texte:
        "On repère ce qui apparaît dans TOUS les termes — un nombre, une lettre, ou une parenthèse entière — et on le met devant. $6x^2 + 9x = 3x(2x + 3)$ : ici $3x$ est commun aux deux.",
      schema: egalites(
        [
          `6x^2 + 9x`,
          `${enBleu("3x")} \\times 2x + ${enBleu("3x")} \\times 3`,
          `${enBleu("3x")}(2x + 3)`,
        ],
        "On écrit chaque terme comme un produit AVANT de mettre le facteur en évidence.",
      ),
    },
    {
      titre: "Factoriser avec une identité",
      texte:
        "Quand on reconnaît $a^2 - b^2$, on écrit $(a-b)(a+b)$ : c'est la différence de deux carrés. ⭐ Elle sert précisément à résoudre $x^2 = k$, qui n'a pas de méthode directe en seconde.",
      schema: egalites(
        [
          `x^2 - 49 = 0`,
          `(x - ${enBleu("7")})(x + ${enBleu("7")}) = 0`,
          `x = ${enBleu("7")} \\quad \\text{ou} \\quad x = ${enRouge("-7")}`,
        ],
        "⛔ Deux solutions, pas une : un carré ne distingue pas les deux signes.",
      ),
    },
  ],

  reel: {
    texte:
      "Un jardin rectangulaire mesure $x$ mètres sur $x + 4$. Son aire vaut $x(x+4)$, forme FACTORISÉE, ou $x^2 + 4x$, forme développée. Si l'on demande « pour quelle largeur l'aire est-elle nulle ? », la forme factorisée répond en une ligne. Si l'on demande « quelle est l'aire pour $x = 6$ ? », la forme développée va aussi vite. ⭐ Aucune des deux n'est meilleure dans l'absolu : c'est la QUESTION qui choisit.",
  },

  historique: {
    texte:
      "Distribuer une multiplication sur une addition est un geste que les Babyloniens pratiquaient déjà, en découpant des rectangles. Mais il a fallu attendre le calcul littéral de Viète, à la fin du XVIᵉ siècle, pour qu'on puisse l'écrire une fois pour toutes sous la forme $k(a+b) = ka + kb$ — et donc l'appliquer sans redessiner. Le mot « factoriser » vient de facteur, au sens de « celui qui fait » : les facteurs sont les morceaux qui FONT le produit.",
  },

  methode: [
    {
      titre: "Je regarde ce qu'on me demande",
      texte:
        "Résoudre une équation égale à zéro ? Il me faut un PRODUIT, donc je factorise. Calculer une image, comparer des degrés ? Il me faut une SOMME, donc je développe.",
      schema: cas(
        [
          { formule: "\\text{résoudre } f(x) = 0", verdict: "FACTORISER", couleur: BLEU },
          { formule: "\\text{calculer } f(3)", verdict: "DÉVELOPPER", couleur: ROUGE },
        ],
        "La question dit le sens. On ne choisit jamais au hasard.",
      ),
    },
    {
      titre: "Pour factoriser, je cherche le commun",
      texte:
        "J'écris chaque terme comme un produit, puis je repère ce qui revient partout. ⚠️ Le facteur commun peut être une PARENTHÈSE entière : dans $(x+1)(x+3) + (x+1)$, c'est $(x+1)$.",
      schema: egalite(
        `(x+1)(x+3) + (x+1) = ${enBleu("(x+1)")}\\big[(x+3) + 1\\big] = ${enBleu("(x+1)")}(x+4)`,
        "Le second terme vaut (x+1) × 1 : c'est ce « 1 » qu'on oublie.",
      ),
    },
    {
      titre: "Je vérifie en repartant dans l'autre sens",
      texte:
        "Une factorisation se contrôle en développant le résultat : on doit retomber sur l'expression de départ. ⭐ Le contrôle coûte dix secondes et attrape presque toutes les erreurs de signe.",
      schema: egalite(
        `3x(2x + 3) = 6x^2 + 9x \\;\\checkmark`,
        "On repart du produit et on retrouve la somme initiale.",
      ),
    },
  ],

  usages: [
    {
      titre: "⭐ Résoudre une équation",
      detail:
        "C'est l'usage numéro un, et la raison d'être du chapitre. On amène tout d'un côté pour avoir $= 0$, on factorise, puis on annule chaque facteur.",
      schema: egalites(
        [
          `3x^2 + 12x = 0`,
          `${enBleu("3x")}(x + 4) = 0`,
          `x = 0 \\quad \\text{ou} \\quad x = -4`,
        ],
        "⛔ Diviser par x ferait PERDRE la solution 0 : on factorise, on ne divise pas.",
      ),
    },
    {
      titre: "Choisir la forme qui va vite",
      detail:
        "La forme factorisée montre les solutions ; la forme développée montre le degré et l'ordonnée à l'origine. Les deux disent la même chose, pas de la même façon.",
      schema: cas(
        [
          { formule: "(x-3)(x+3)", verdict: "les solutions : $3$ et $-3$", couleur: BLEU },
          { formule: "x^2 - 9", verdict: "$f(0) = -9$", couleur: ROUGE },
        ],
      ),
    },
    {
      titre: "Simplifier une fraction",
      detail:
        "Plus rare, mais c'est un vrai usage : on ne simplifie une fraction que sur des FACTEURS. Il faut donc factoriser le numérateur avant de pouvoir barrer quoi que ce soit.",
      schema: egalites(
        [
          `\\dfrac{4x + 12}{4} = \\dfrac{${enBleu("4")}(x + 3)}{${enBleu("4")}}`,
          `= x + 3`,
        ],
        "⛔ Sans factoriser, on serait tenté de barrer le 4 du seul premier terme — et ce serait faux.",
      ),
    },
  ],

  exemples: [
    {
      titre: "Développer un produit double",
      donnees: "$(3x + 2)(x + 5)$.",
      question: "Développer et réduire.",
      schema: egalites(
        [
          `3x^2 + ${enVert("15x")} + ${enVert("2x")} + 10`,
          `3x^2 + ${enRouge("17x")} + 10`,
        ],
      ),
      solution:
        "Quatre produits : $3x \\times x = 3x^2$, $3x \\times 5 = 15x$, $2 \\times x = 2x$, $2 \\times 5 = 10$. Les deux termes en $x$ se regroupent : $15x + 2x = 17x$. Résultat : $3x^2 + 17x + 10$. ⛔ Oublier l'un des deux produits croisés donnerait $3x^2 + 10$, qui est faux pour toute valeur non nulle.",
    },
    {
      titre: "⭐ Factoriser pour résoudre",
      donnees: "$5x^2 - 20x = 0$.",
      question: "Résoudre cette équation.",
      schema: egalites(
        [
          `${enBleu("5x")}(x - 4) = 0`,
          `x = ${enBleu("0")} \\quad \\text{ou} \\quad x = ${enRouge("4")}`,
        ],
      ),
      solution:
        "Le facteur commun est $5x$ : $5x^2 - 20x = 5x(x - 4)$. Le produit est nul si $5x = 0$, donc $x = 0$, ou si $x - 4 = 0$, donc $x = 4$. ⛔ La tentation est de diviser les deux membres par $x$ pour obtenir $5x - 20 = 0$ : on trouve alors $4$ et on PERD la solution $0$. On ne divise jamais par une quantité qui peut être nulle.",
    },
    {
      titre: "Une différence de deux carrés",
      donnees: "$x^2 - 36 = 0$.",
      question: "Résoudre.",
      schema: egalites(
        [
          `(x - ${enBleu("6")})(x + ${enBleu("6")}) = 0`,
          `x = ${enBleu("6")} \\quad \\text{ou} \\quad x = ${enRouge("-6")}`,
        ],
      ),
      solution:
        "On reconnaît $a^2 - b^2$ avec $a = x$ et $b = 6$, donc $x^2 - 36 = (x-6)(x+6)$. Le produit s'annule pour $x = 6$ ou $x = -6$. ⭐ Sans la factorisation, la seconde ne saurait pas résoudre cette équation : c'est l'identité qui ouvre la porte.",
    },
    {
      titre: "⛔ Le moins devant la parenthèse",
      donnees: "$7 - (2x + 5)$.",
      question: "Développer et réduire.",
      schema: egalites(
        [`7 - 2x ${enRouge("- 5")}`, `= ${enVert("-2x + 2")}`],
      ),
      solution:
        "Le signe moins porte sur toute la parenthèse : $7 - 2x - 5$, soit $-2x + 2$. ⛔ L'erreur presque universelle est d'écrire $7 - 2x + 5 = -2x + 12$ : le $+5$ doit devenir $-5$. Le contrôle est immédiat — avec $x = 0$, l'expression de départ vaut $7 - 5 = 2$, et non $12$.",
    },
  ],

  pieges: [
    "⛔ Un signe moins devant une parenthèse change le signe de TOUS les termes : $5 - (x+3) = 2 - x$, jamais $2 + x$.",
    "⛔ Dans un produit double, il y a QUATRE produits. Oublier les deux termes croisés est l'erreur la plus fréquente.",
    "⛔ Pour résoudre $ax^2 + bx = 0$, on factorise — on ne divise pas par $x$. Diviser fait perdre la solution $x = 0$.",
    "⛔ Un produit nul donne « ou », pas « et » : une seule des deux conditions suffit à annuler le produit.",
    "⛔ $x^2 - 36 = 0$ a DEUX solutions, $6$ et $-6$. N'en donner qu'une est l'oubli classique.",
    "⛔ On ne simplifie une fraction que sur des FACTEURS. Dans $\\dfrac{4x+12}{4}$, on ne peut rien barrer avant d'avoir factorisé.",
  ],

  aRetenir: [
    "Développer : produit $\\rightarrow$ somme. Factoriser : somme $\\rightarrow$ produit.",
    "⭐ On factorise POUR RÉSOUDRE : un produit nul se résout, une somme non.",
    "Un produit est nul si l'un AU MOINS de ses facteurs est nul.",
    "$-(A + B) = -A - B$ : le moins change tous les signes.",
    "$a^2 - b^2 = (a-b)(a+b)$, et c'est ce qui permet de résoudre $x^2 = k$.",
    "Une factorisation se vérifie en développant : on doit retrouver le départ.",
  ],

  entrainement: [
    {
      question: "Développer $4(x + 7)$.",
      correction: "$4x + 28$. Le $4$ multiplie les DEUX termes.",
    },
    {
      question: "Développer et réduire $9 - (3x + 4)$.",
      correction:
        "$9 - 3x - 4 = -3x + 5$. ⛔ Le $+4$ devient $-4$ : le moins porte sur toute la parenthèse.",
    },
    {
      question: "Développer et réduire $(x + 3)(x + 6)$.",
      correction:
        "$x^2 + 6x + 3x + 18 = x^2 + 9x + 18$. Les deux produits croisés se regroupent.",
    },
    {
      question: "Développer et réduire $(2x + 1)(3x + 4)$.",
      correction:
        "$6x^2 + 8x + 3x + 4 = 6x^2 + 11x + 4$.",
    },
    {
      question: "Factoriser $8x + 12$.",
      correction: "$4(2x + 3)$. Le facteur commun est $4$, le plus grand qui divise les deux.",
    },
    {
      question: "Factoriser $7x^2 - 21x$.",
      correction:
        "$7x(x - 3)$. Le facteur commun contient la lettre aussi : $7x$, et non seulement $7$.",
    },
    {
      question: "Factoriser $x^2 - 25$.",
      correction:
        "$(x - 5)(x + 5)$ : une différence de deux carrés, avec $25 = 5^2$.",
    },
    {
      question: "Résoudre $x^2 - 81 = 0$.",
      correction:
        "$(x-9)(x+9) = 0$, donc $x = 9$ ou $x = -9$. Deux solutions.",
    },
    {
      question: "Résoudre $(x - 6)(x + 2) = 0$.",
      correction:
        "Le produit est nul si $x - 6 = 0$ ou $x + 2 = 0$, donc $x = 6$ ou $x = -2$.",
    },
    {
      question: "Résoudre $4x^2 + 8x = 0$.",
      correction:
        "On factorise : $4x(x + 2) = 0$, donc $x = 0$ ou $x = -2$. ⛔ Diviser par $x$ aurait fait perdre la solution $0$.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesDevFacSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Développement et factorisation - 2de",
    section: {
      type: "objectif",
      phrase: "Choisir la forme selon ce qu'on veut faire",
      sousPhrase:
        "Développer donne une somme, factoriser donne un produit. Et on factorise POUR RÉSOUDRE : un produit nul se résout, une somme non.",
    },
  },
];
