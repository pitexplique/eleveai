// ─── Guide de survie · Maths 4e ─────────────────────────────────────────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/maths/4e/notions.ts
// - checklists     = micro-compétences de microSkills.ts (BO cycle 4)
// - test de survie = items "fixed" puisés dans les banques du coach
// Condensés écrits par 19 rédacteurs parallèles (workflow du 26/07) puis VÉRIFIÉS
// à la main contre le BO cycle 4 et les banques (exactitude des exemples, périmètre
// 4e strict — pas de débordement 3e/lycée, couverture des micros).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/4e/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { operationsRelatifsBank } from "@/lib/tutor-v4/questionBank/4e/maths/operations-relatifs.bank";
import { fractionsBank } from "@/lib/tutor-v4/questionBank/4e/maths/fractions.bank";
import { proportionnaliteBank } from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";
import { expressionsLitteralesBank } from "@/lib/tutor-v4/questionBank/4e/maths/expressions-litterales.bank";
import { distributiviteBank } from "@/lib/tutor-v4/questionBank/4e/maths/distributivite.bank";
import { identitesRemarquablesBank } from "@/lib/tutor-v4/questionBank/4e/maths/identites-remarquables.bank";
import { factorisationBank } from "@/lib/tutor-v4/questionBank/4e/maths/factorisation.bank";
import { equationsBank } from "@/lib/tutor-v4/questionBank/4e/maths/equations.bank";
import { pythagoreBank } from "@/lib/tutor-v4/questionBank/4e/maths/pythagore.bank";
import { thalesBank } from "@/lib/tutor-v4/questionBank/4e/maths/thales.bank";
import { cosinusBank } from "@/lib/tutor-v4/questionBank/4e/maths/cosinus.bank";
import { parallelogrammesBank } from "@/lib/tutor-v4/questionBank/4e/maths/parallelogrammes.bank";
import { transformationsBank } from "@/lib/tutor-v4/questionBank/4e/maths/transformations.bank";
import { perimetresBank } from "@/lib/tutor-v4/questionBank/4e/maths/perimetres.bank";
import { airesBank } from "@/lib/tutor-v4/questionBank/4e/maths/aires.bank";
import { volumesBank } from "@/lib/tutor-v4/questionBank/4e/maths/volumes.bank";
import { statistiquesBank } from "@/lib/tutor-v4/questionBank/4e/maths/statistiques.bank";
import { probabilitesBank } from "@/lib/tutor-v4/questionBank/4e/maths/probabilites.bank";
import { algorithmiqueBank } from "@/lib/tutor-v4/questionBank/4e/maths/algorithmique.bank";
import type { KitData, KitNotion } from "@/components/kit/types";

// Checklists + tests dérivés du coach (module partagé par tous les guides).
const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  {
    id: "relatif_operation",
    emoji: "🌡️",
    titre: "Nombres relatifs",
    domaine: "Nombres et calculs",
    essentiel:
      "Un **nombre relatif** est un nombre avec un signe, $+$ ou $-$. Pour l'**addition** et la **soustraction**, on avance (pour $+$) ou on recule (pour $-$) sur la droite graduée, et **soustraire revient à ajouter l'opposé**. Pour la **multiplication** et la **division**, on applique la **règle des signes** : deux nombres de **même signe** donnent un résultat **positif**, deux nombres de **signes contraires** un résultat **négatif**.",
    formules: [
      { label: "Additionner (signes contraires)", latex: "$-5+8=3$ : on soustrait, on garde le signe du plus éloigné de $0$" },
      { label: "Soustraire = ajouter l'opposé", latex: "$a-b=a+(-b)$ (ex. $5-(-3)=5+3=8$)" },
      { label: "Règle des signes ($\\times$ et $\\div$)", latex: "même signe $\\rightarrow +$ ; signes contraires $\\rightarrow -$ (ex. $(-3)\\times(-4)=12$)" },
      { label: "Priorités", latex: "$\\times$ et $\\div$ avant $+$ et $-$ (ex. $(-3)\\times 4+5=-12+5=-7$)" },
    ],
    reflexes: [
      { si: "deux nombres de même signe à additionner", alors: "on additionne les distances à $0$ et on garde le signe" },
      { si: "un signe $-$ devant une parenthèse négative, comme $-(-3)$", alors: "soustraire un négatif, c'est ajouter : ça augmente le résultat" },
      { si: "un produit ou un quotient", alors: "on cherche le signe (règle des signes) PUIS on multiplie/divise les nombres" },
      { si: "un calcul mêle $\\times$, $\\div$ et $+$, $-$", alors: "on fait les $\\times$ et $\\div$ d'abord (priorités), jamais de gauche à droite" },
    ],
    pieges: [
      "Confondre addition et multiplication de deux négatifs : $(-4)+(-3)=-7$, mais $(-4)\\times(-3)=+12$.",
      "Oublier que soustraire un négatif augmente : $5-(-3)=8$, et non $2$.",
      "Ne pas respecter les priorités : $-3\\times 4+5=-7$, et non $-27$ (on ne calcule pas de gauche à droite).",
    ],
    reel: "Au sommet du Piton des Neiges à La Réunion, il fait $-2$ °C avant le lever du soleil ; la température monte de $7$ °C dans la matinée : $-2+7=5$ °C.",
  },
  {
    id: "fraction_nombre",
    emoji: "➗",
    titre: "Fractions",
    domaine: "Nombres et calculs",
    essentiel:
      "Une **fraction** est un quotient : $\\dfrac{a}{b}$, c'est $a\\div b$. On ne change pas sa valeur en **multipliant ou divisant le haut ET le bas par le même nombre** (fractions égales, simplification). Pour **additionner**, il faut d'abord le **même dénominateur** ; pour **multiplier**, on calcule en ligne (haut $\\times$ haut, bas $\\times$ bas) ; **diviser**, c'est **multiplier par l'inverse**.",
    formules: [
      { label: "Fractions égales / simplifier", latex: "$\\dfrac{a}{b}=\\dfrac{a\\times k}{b\\times k}=\\dfrac{a\\div k}{b\\div k}$ (ex. $\\dfrac{6}{8}=\\dfrac{3}{4}$)" },
      { label: "Additionner (au même dénominateur)", latex: "$\\dfrac{a}{c}+\\dfrac{b}{c}=\\dfrac{a+b}{c}$ (ex. $\\dfrac{1}{2}+\\dfrac{1}{3}=\\dfrac{3}{6}+\\dfrac{2}{6}=\\dfrac{5}{6}$)" },
      { label: "Multiplier (en ligne)", latex: "$\\dfrac{a}{b}\\times\\dfrac{c}{d}=\\dfrac{a\\times c}{b\\times d}$ (ex. $\\dfrac{2}{3}\\times\\dfrac{3}{5}=\\dfrac{6}{15}=\\dfrac{2}{5}$)" },
      { label: "Inverse et diviser", latex: "inverse de $\\dfrac{a}{b}$ $=\\dfrac{b}{a}$ ; $\\dfrac{a}{b}\\div\\dfrac{c}{d}=\\dfrac{a}{b}\\times\\dfrac{d}{c}$" },
      { label: "Opposé et écriture décimale", latex: "opposé de $\\dfrac{a}{b}$ $=-\\dfrac{a}{b}$ ; $\\dfrac{a}{b}=a\\div b$ (ex. $\\dfrac{1}{4}=0{,}25$)" },
    ],
    reflexes: [
      { si: "« additionner » avec des dénominateurs différents", alors: "mettre au même dénominateur d'abord, puis additionner les numérateurs" },
      { si: "« diviser par une fraction »", alors: "on retourne la 2ᵉ et on multiplie : $\\div\\dfrac{c}{d}$ devient $\\times\\dfrac{d}{c}$" },
      { si: "« comparer » deux fractions", alors: "même dénominateur, ou produit en croix ($a\\times d$ contre $c\\times b$)" },
      { si: "« simplifier » ou « sont-elles égales ? »", alors: "diviser haut et bas par le même nombre" },
    ],
    pieges: [
      "Additionner les dénominateurs : $\\dfrac{1}{2}+\\dfrac{1}{3}\\neq\\dfrac{2}{5}$. Il faut le même dénominateur, ça donne $\\dfrac{5}{6}$.",
      "Chercher un dénominateur commun pour une MULTIPLICATION : inutile, on multiplie directement en ligne, haut $\\times$ haut et bas $\\times$ bas.",
      "Confondre l'inverse de $\\dfrac{3}{5}$ (c'est $\\dfrac{5}{3}$, on retourne) et son opposé (c'est $-\\dfrac{3}{5}$, on change le signe).",
    ],
    reel: "Au marché de Saint-Pierre, sur un cageot de $20$ mangues, les $\\dfrac{3}{4}$ sont mûres : $20\\times\\dfrac{3}{4}=15$ mangues à vendre aujourd'hui.",
  },
  {
    id: "prop_proportionnalite",
    emoji: "⚖️",
    titre: "Proportionnalité",
    domaine: "Fonctions et proportionnalité",
    essentiel:
      "Une situation est **proportionnelle** si on passe d'une grandeur à l'autre en multipliant toujours par le **même nombre**, appelé le **coefficient**. Un **pourcentage** est une proportion sur $100$ : prendre $t\\,\\%$, c'est multiplier par $\\dfrac{t}{100}$. Pour une **évolution**, augmenter de $t\\,\\%$ c'est multiplier par $1+\\dfrac{t}{100}$, diminuer c'est multiplier par $1-\\dfrac{t}{100}$.",
    formules: [
      { label: "Coefficient de proportionnalité", latex: "$k=\\dfrac{y}{x}$ (ex. $4\\to 20$ : $k=\\dfrac{20}{4}=5$)" },
      { label: "Quatrième proportionnelle (produit en croix)", latex: "$\\dfrac{a}{b}=\\dfrac{c}{d}\\Rightarrow d=\\dfrac{b\\times c}{a}$" },
      { label: "Prendre $t\\,\\%$ d'un nombre", latex: "$\\times\\dfrac{t}{100}$ (ex. $25\\,\\%$ de $80=0{,}25\\times 80=20$)" },
      { label: "Augmenter / diminuer de $t\\,\\%$", latex: "$\\times\\left(1+\\dfrac{t}{100}\\right)$ / $\\times\\left(1-\\dfrac{t}{100}\\right)$ (ex. $+20\\,\\%:\\times 1{,}2$ ; $-30\\,\\%:\\times 0{,}7$)" },
      { label: "Taux d'évolution", latex: "$t=\\dfrac{\\text{finale}-\\text{initiale}}{\\text{initiale}}\\times 100$" },
    ],
    reflexes: [
      { si: "un tableau, « est-ce proportionnel ? »", alors: "chercher un coefficient constant : $\\dfrac{y}{x}$ identique partout" },
      { si: "3 valeurs connues sur 4 en proportion", alors: "produit en croix, ou passage à l'unité (prix de $1$)" },
      { si: "« $+15\\,\\%$ », « $-20\\,\\%$ »", alors: "multiplier par $1{,}15$ ou par $0{,}8$" },
      { si: "« le prix passe de $a$ à $b$ », « quel pourcentage ? »", alors: "calculer $\\dfrac{b-a}{a}\\times 100$" },
    ],
    pieges: [
      "Confondre « $30\\,\\%$ de $80$ » $(=24)$ et « $80$ augmenté de $30\\,\\%$ » $(=104)$.",
      "Croire qu'augmenter de $20\\,\\%$ c'est $\\times 0{,}2$ : c'est $\\times 1{,}2$ (et une baisse de $20\\,\\%$ c'est $\\times 0{,}8$, pas $\\times 0{,}2$).",
      "Confondre proportionnalité et « ajouter toujours le même nombre » : proportionnel = MULTIPLIER par le même coefficient.",
    ],
    reel: "Au marché de Saint-Pierre, si $3$ kg de letchis coûtent $9$ €, alors $1$ kg coûte $3$ € et $5$ kg coûtent $5\\times 3=15$ €.",
  },
  {
    id: "litteral_expression",
    emoji: "🔤",
    titre: "Expressions littérales",
    domaine: "Nombres et calculs",
    essentiel:
      "Une **expression littérale** utilise des **lettres** pour représenter des nombres. Écrire $4x$, c'est écrire $4\\times x$ : $4$ est le **coefficient**, et dans $4x+7$ le $7$ est le **terme constant**. Deux gestes de base : **substituer** (remplacer la lettre par une valeur pour calculer) et **réduire** (regrouper les **termes semblables**, ceux qui ont la même lettre).",
    formules: [
      { label: "Notation : une lettre = un nombre", latex: "$4x = 4\\times x$ ; dans $4x+7$, $4$ = coefficient, $7$ = terme constant" },
      { label: "Traduire une phrase", latex: "« double de $x$ » $=2x$ ; « $x$ augmenté de $4$ » $=x+4$ ; « $x$ diminué de $5$ » $=x-5$" },
      { label: "Somme entre parenthèses", latex: "« le double de la somme de $x$ et $5$ » $=2(x+5)$" },
      { label: "Substituer (donner une valeur)", latex: "$3x+2$ pour $x=4$ : $3\\times 4+2 = 14$" },
      { label: "Réduire (termes semblables)", latex: "$3x+2x = 5x$ ; $2x+5+3x = 5x+5$" },
    ],
    reflexes: [
      { si: "un nombre collé à une lettre ($4x$)", alors: "c'est une multiplication : $4\\times x$" },
      { si: "on donne une valeur à la lettre", alors: "on remplace (substitue) puis on calcule en respectant les priorités" },
      { si: "des termes avec la MÊME lettre ($3x$ et $2x$)", alors: "on additionne/soustrait les coefficients : $3x+2x=5x$" },
      { si: "« le double/triple DE la somme »", alors: "on met des parenthèses : $2(x+5)$, pas $2x+5$" },
    ],
    pieges: [
      "Réduire $2x+3$ en $5x$ : impossible. $2x$ (avec lettre) et $3$ (nombre seul) ne sont PAS des termes semblables.",
      "Oublier le signe en substituant : $2x+5$ pour $x=-3$ donne $2\\times(-3)+5 = -1$, pas $11$.",
      "Confondre multiplier et additionner : $3x\\times 2 = 6x$ (on multiplie le coefficient), pas $5x$.",
    ],
    reel: "Un vendeur au marché de Saint-Pierre : $x$ mangues à $2$ € plus $3$ € de cageot, le total est $2x+3$ €. Pour $x=5$ mangues : $2\\times 5+3 = 13$ €.",
  },
  {
    id: "litteral_distributivite",
    emoji: "🧩",
    titre: "Distributivité",
    domaine: "Nombres et calculs",
    essentiel:
      "**Développer**, c'est transformer un **produit** en **somme** en enlevant les parenthèses : le facteur devant la parenthèse **multiplie CHAQUE terme** à l'intérieur. Avec deux parenthèses, on fait les **4 produits**. **Réduire**, c'est ensuite regrouper les termes semblables (les $x$ avec les $x$, les nombres avec les nombres).",
    formules: [
      { label: "Distributivité simple", latex: "$k(a+b)=ka+kb$ (ex. $3(x+4)=3x+12$)" },
      { label: "Signe négatif devant la parenthèse", latex: "$-k(a+b)=-ka-kb$ (ex. $-2(x+5)=-2x-10$)" },
      { label: "Double distributivité (les 4 produits)", latex: "$(a+b)(c+d)=ac+ad+bc+bd$" },
      { label: "Développer puis réduire", latex: "$(x+2)(x+3)=x^2+3x+2x+6=x^2+5x+6$" },
      { label: "Réduire = regrouper les termes semblables", latex: "$2x+5+3x=5x+5$" },
    ],
    reflexes: [
      { si: "« développer $k(a+b)$ »", alors: "multiplier le coefficient par CHAQUE terme, pas seulement le premier" },
      { si: "un signe $-$ devant la parenthèse", alors: "il se distribue aussi et change TOUS les signes à l'intérieur" },
      { si: "« développer $(a+b)(c+d)$ »", alors: "faire les 4 produits, n'en oublier aucun" },
      { si: "après développement il reste des $x$ et des nombres séparés", alors: "réduire en regroupant les termes semblables" },
    ],
    pieges: [
      "Oublier de multiplier le 2ᵉ terme : $3(x+4)=3x+4$ est FAUX, c'est $3x+12$.",
      "Ne pas distribuer le signe moins : $-2(x+5)=-2x+10$ est FAUX, c'est $-2x-10$.",
      "Oublier un produit dans la double distributivité : il y en a 4, pas 2 ni 3.",
    ],
    reel: "Au marché de Saint-Pierre, $4$ cagettes contenant chacune $x$ mangues et $3$ letchis : le total se calcule d'un coup, $4(x+3)=4x+12$, au lieu de tout additionner.",
  },
  {
    id: "litteral_identite_remarquable",
    emoji: "⭐",
    titre: "Identités remarquables",
    domaine: "Nombres et calculs",
    essentiel:
      "Une **identité remarquable** n'est pas une formule magique : c'est un **raccourci** de la **double distributivité** pour trois formes précises. Le **carré d'une somme** et le **carré d'une différence** gardent un **double produit** $2ab$ ; le produit d'une somme par une différence donne une **différence de deux carrés**. Développer un carré, c'est d'abord l'écrire comme un produit par lui-même.",
    formules: [
      { label: "Carré d'une somme", latex: "$(a+b)^2 = a^2 + 2ab + b^2$" },
      { label: "Carré d'une différence", latex: "$(a-b)^2 = a^2 - 2ab + b^2$" },
      { label: "Différence de deux carrés", latex: "$(a-b)(a+b) = a^2 - b^2$" },
      { label: "Origine : la double distributivité", latex: "$(x+3)^2 = (x+3)(x+3) = x^2 + 6x + 9$" },
    ],
    reflexes: [
      { si: "une parenthèse au carré, $(x+a)^2$ ou $(x-a)^2$", alors: "identité $(a\\pm b)^2 = a^2 \\pm 2ab + b^2$, sans oublier le $2ab$" },
      { si: "$(x-a)(x+a)$, mêmes nombres, un « $+$ » et un « $-$ »", alors: "différence de deux carrés $= x^2 - a^2$ (les termes en $x$ s'annulent)" },
      { si: "deux parenthèses différentes, ex. $(x+2)(x+5)$", alors: "PAS d'identité : double distributivité classique" },
      { si: "« développer $(x+3)^2$ »", alors: "écrire d'abord $(x+3)(x+3)$, puis les 4 produits" },
    ],
    pieges: [
      "Écrire $(a+b)^2 = a^2 + b^2$ : FAUX, on oublie le double produit. $(x+5)^2 = x^2 + 10x + 25$, pas $x^2 + 25$.",
      "Se tromper de signe dans $(a-b)^2$ : le double produit est négatif mais le $b^2$ reste positif : $(x-4)^2 = x^2 - 8x + 16$.",
      "Confondre $(x-4)^2 = x^2 - 8x + 16$ (carré d'une différence) et $(x-4)(x+4) = x^2 - 16$ (différence de deux carrés).",
    ],
    reel: "Calcul de tête malin : $101^2 = (100+1)^2 = 100^2 + 2\\times 100 + 1 = 10\\,201$, bien plus rapide que de poser la multiplication.",
  },
  {
    id: "litteral_factorisation",
    emoji: "🧲",
    titre: "Factorisation",
    domaine: "Nombres et calculs",
    essentiel:
      "**Factoriser**, c'est transformer une **somme** (ou une différence) en **produit** : c'est le chemin **inverse du développement**. On commence toujours par chercher un **facteur commun** (un nombre ou la lettre $x$) que l'on met devant une parenthèse. Quand il n'y en a pas, on essaie de reconnaître une **identité remarquable** « à l'envers ».",
    formules: [
      { label: "Facteur commun (le réflexe de base)", latex: "$ka+kb=k(a+b)$ ; ex. $3x+12=3(x+4)$" },
      { label: "Facteur commun avec une lettre", latex: "$x^2+6x=x(x+6)$" },
      { label: "Carré d'une somme / d'une différence", latex: "$a^2\\pm 2ab+b^2=(a\\pm b)^2$ ; ex. $x^2+6x+9=(x+3)^2$" },
      { label: "Différence de deux carrés", latex: "$a^2-b^2=(a-b)(a+b)$ ; ex. $x^2-25=(x-5)(x+5)$" },
      { label: "Vérifier", latex: "développer le produit obtenu doit redonner l'expression de départ" },
    ],
    reflexes: [
      { si: "une somme où un même nombre (ou $x$) apparaît dans chaque terme", alors: "mettre ce facteur commun devant une parenthèse : $ka+kb=k(a+b)$" },
      { si: "$x^2\\pm \\ldots x+\\ldots$ avec un carré parfait à la fin ($9,16,25$)", alors: "tester l'identité $(a\\pm b)^2$" },
      { si: "$x^2-$ un carré (ex. $x^2-36$)", alors: "différence de deux carrés : $(x-6)(x+6)$" },
      { si: "on n'est pas sûr d'une factorisation", alors: "la développer pour vérifier qu'on retombe sur le départ" },
    ],
    pieges: [
      "Oublier de diviser le nombre : $5x+20=5(x+20)$ est FAUX car $20=5\\times 4$, donc $5(x+4)$.",
      "Confondre différence de carrés et carré : $x^2-25=(x-5)(x+5)$ mais $x^2-10x+25=(x-5)^2$.",
      "Ne pas factoriser jusqu'au bout : $2x^2+6x=2(x^2+3x)$ n'est pas fini, le vrai facteur commun est $2x$, d'où $2x(x+3)$.",
    ],
    reel: "Pour une sortie au volcan, $4$ groupes prennent chacun $x$ bouteilles d'eau et $3$ fruits : le total $4x+12$ s'écrit $4(x+3)$, soit $4$ paquets identiques.",
  },
  {
    id: "equation_resolution",
    emoji: "🟰",
    titre: "Équations",
    domaine: "Nombres et calculs",
    essentiel:
      "Une **équation** est une **égalité** qui contient une **inconnue** (souvent $x$). La **résoudre**, c'est trouver la valeur de $x$ qui rend l'égalité **vraie**. La règle d'or : on garde l'égalité **équilibrée** en faisant la **même opération des deux côtés** pour **isoler** $x$.",
    formules: [
      { label: "Isoler x (garder l'équilibre)", latex: "$x+a=b \\Rightarrow x=b-a$ ; ex. $x+4=9 \\Rightarrow x=5$" },
      { label: "Cas $ax=b$ (on divise)", latex: "$ax=b \\Rightarrow x=\\dfrac{b}{a}$ ; ex. $3x=15 \\Rightarrow x=5$" },
      { label: "Réduire d'abord les termes en $x$", latex: "$2x+3x=5x$ ; donc $5x=15 \\Rightarrow x=3$" },
      { label: "Distributivité (enlever la parenthèse)", latex: "$k(x+b)=kx+kb$ ; ex. $2(x+3)=2x+6$" },
      { label: "Vérifier une solution", latex: "on remplace $x$ ; $x=4$ dans $x+3=7$ : $4+3=7$ vrai" },
    ],
    reflexes: [
      { si: "$x+a=b$ ou $x-a=b$", alors: "faire l'opération inverse des deux côtés (soustraire ou ajouter $a$)" },
      { si: "$ax=b$ (un coefficient devant $x$)", alors: "diviser les deux côtés par $a$" },
      { si: "des termes en $x$ se répètent ($2x+3x$)", alors: "réduire AVANT de résoudre" },
      { si: "une parenthèse $k(x+b)$", alors: "développer avec la distributivité (ou diviser par $k$)" },
    ],
    pieges: [
      "Ne faire l'opération que d'un seul côté : l'égalité n'est plus équilibrée, la solution est fausse.",
      "Pour $ax=b$, soustraire $a$ au lieu de diviser : $3x=15$ donne $x=5$, surtout pas $x=12$.",
      "« Vérifier » en additionnant les nombres au lieu de remplacer $x$ : dans $2x+3$, si $x=4$ c'est $2\\times 4+3$, pas $2+3+4$.",
    ],
    reel: "Au marché de Saint-Pierre, des mangues à $3$ € l'unité, on paie $18$ € : on pose $3x=18$, donc $x=6$ mangues.",
  },
  {
    id: "pythagore_theoreme",
    emoji: "📐",
    titre: "Théorème de Pythagore",
    domaine: "Espace et géométrie",
    essentiel:
      "Dans un triangle **rectangle**, le carré de l'**hypoténuse** (le plus grand côté, en face de l'angle droit) est égal à la **somme des carrés** des deux autres côtés. Le théorème sert à **calculer une longueur** manquante ; sa **réciproque** sert à **prouver qu'un triangle est rectangle** (ou non) en comparant les carrés.",
    formules: [
      { label: "Théorème (angle droit en $A$)", latex: "$BC^2 = AB^2 + AC^2$" },
      { label: "Chercher l'hypoténuse", latex: "$BC = \\sqrt{AB^2 + AC^2}$" },
      { label: "Chercher un côté de l'angle droit", latex: "$AB = \\sqrt{BC^2 - AC^2}$" },
      { label: "Réciproque", latex: "si $BC^2 = AB^2 + AC^2$ alors rectangle en $A$" },
    ],
    reflexes: [
      { si: "triangle rectangle + $2$ longueurs connues", alors: "Pythagore pour trouver la $3^\\text{e}$" },
      { si: "on cherche l'hypoténuse (le plus grand côté)", alors: "on ADDITIONNE : $\\sqrt{AB^2 + AC^2}$" },
      { si: "on cherche un côté de l'angle droit", alors: "on SOUSTRAIT : $\\sqrt{BC^2 - AC^2}$" },
      { si: "« le triangle est-il rectangle ? »", alors: "comparer $BC^2$ (plus grand côté) et $AB^2 + AC^2$ (réciproque)" },
    ],
    pieges: [
      "Se tromper d'hypoténuse : c'est TOUJOURS le plus grand côté, en face de l'angle droit.",
      "Additionner au lieu de soustraire quand on cherche un côté de l'angle droit.",
      "Oublier la racine carrée : si $BC^2 = 25$ alors $BC = 5$, pas $25$.",
    ],
    reel: "L'échelle posée contre un mur à Saint-Pierre : le pied à $1{,}5$ m du mur, l'échelle mesure $2{,}5$ m, alors elle monte à $\\sqrt{2{,}5^2 - 1{,}5^2} = \\sqrt{4} = 2$ m.",
  },
  {
    id: "thales_theoreme",
    emoji: "📏",
    titre: "Théorème de Thalès",
    domaine: "Espace et géométrie",
    essentiel:
      "Le théorème de **Thalès** s'utilise quand une droite est **parallèle à un côté** d'un triangle : elle découpe des longueurs **proportionnelles**, ce qui donne trois **rapports égaux**. On l'utilise pour **calculer une longueur** (quand on sait que c'est parallèle) ; sa **réciproque** sert à **prouver que deux droites sont parallèles** en comparant des rapports.",
    formules: [
      { label: "Configuration ($M\\in[AB]$, $N\\in[AC]$, $(MN)\\parallel(BC)$)", latex: "$\\dfrac{AM}{AB}=\\dfrac{AN}{AC}=\\dfrac{MN}{BC}$" },
      { label: "Calculer une longueur (produit en croix)", latex: "$\\dfrac{AM}{AB}=\\dfrac{AN}{AC}\\Rightarrow AC=\\dfrac{AB\\times AN}{AM}$" },
      { label: "Astuce du coefficient", latex: "grand côté $=$ petit côté $\\times k$ (ex. $\\dfrac{3}{6}=\\dfrac{1}{2}$ donc $k=2$)" },
      { label: "Réciproque (prouver le parallélisme)", latex: "si $\\dfrac{AM}{AB}=\\dfrac{AN}{AC}$ (points dans le même ordre) alors $(MN)\\parallel(BC)$" },
    ],
    reflexes: [
      { si: "un triangle avec une droite **parallèle** à un côté", alors: "configuration de Thalès : écrire $\\dfrac{AM}{AB}=\\dfrac{AN}{AC}=\\dfrac{MN}{BC}$" },
      { si: "3 longueurs connues, le parallélisme donné, on cherche la 4ᵉ", alors: "produit en croix sur $\\dfrac{AM}{AB}=\\dfrac{AN}{AC}$" },
      { si: "« les droites sont-elles parallèles ? »", alors: "**réciproque** : comparer $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$" },
      { si: "il faut rédiger", alors: "commencer par « Dans le triangle $ABC$, $M\\in[AB]$, $N\\in[AC]$ et $(MN)\\parallel(BC)$, d'après Thalès… »" },
    ],
    pieges: [
      "Mélanger les longueurs : on met **petit sur grand**, et les deux longueurs d'une même demi-droite ensemble ($\\dfrac{AM}{AB}$, jamais $\\dfrac{AM}{AN}$).",
      "Inverser un rapport : écrire $\\dfrac{AB}{AM}$ au lieu de $\\dfrac{AM}{AB}$ fausse tout le calcul.",
      "Croire que « les longueurs sont dans un triangle donc Thalès » : sans le **parallélisme**, on ne peut PAS appliquer le théorème.",
    ],
    reel: "Mesurer un arbre par son ombre à Saint-Pierre : un poteau de $2$ m fait une ombre de $3$ m ; au même moment l'arbre a une ombre de $12$ m, donc il mesure $2\\times 4 = 8$ m (coefficient $12\\div 3 = 4$).",
  },
  {
    id: "trigo_cosinus",
    emoji: "🧭",
    titre: "Cosinus (triangle rectangle)",
    domaine: "Espace et géométrie",
    essentiel:
      "Dans un triangle **rectangle**, le **cosinus** d'un angle aigu relie le côté **adjacent** (celui qui touche l'angle, sans être l'hypoténuse) et l'**hypoténuse** : $\\cos(\\theta)=\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ (moyen « **CAH** »). On s'en sert pour **calculer une longueur** quand on connaît l'angle, ou pour **calculer un angle** avec la touche $\\cos^{-1}$ de la calculatrice.",
    formules: [
      { label: "Définition (moyen « CAH »)", latex: "$\\cos(\\theta)=\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$" },
      { label: "Chercher le côté adjacent", latex: "$\\text{adjacent}=\\text{hypoténuse}\\times\\cos(\\theta)$" },
      { label: "Chercher l'hypoténuse", latex: "$\\text{hypoténuse}=\\dfrac{\\text{adjacent}}{\\cos(\\theta)}$" },
      { label: "Chercher l'angle", latex: "$\\theta=\\cos^{-1}\\!\\left(\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}\\right)$" },
      { label: "Valeurs à connaître", latex: "$\\cos(0^\\circ)=1$ ; $\\cos(60^\\circ)=0{,}5$" },
    ],
    reflexes: [
      { si: "on connaît l'angle et l'hypoténuse, on cherche le côté adjacent", alors: "multiplier : $\\text{adjacent}=\\text{hypoténuse}\\times\\cos(\\theta)$" },
      { si: "on connaît le côté adjacent et l'hypoténuse, on cherche l'angle", alors: "faire le rapport $\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ puis $\\cos^{-1}$" },
      { si: "« quel est le côté adjacent à cet angle ? »", alors: "celui qui touche l'angle sans être l'hypoténuse (il change si on change d'angle)" },
      { si: "un des deux angles aigus est connu", alors: "l'autre vaut $90^\\circ$ moins celui-ci (ils sont complémentaires)" },
    ],
    pieges: [
      "Confondre adjacent et opposé : l'adjacent est celui qui **touche** l'angle, et il change quand on change d'angle.",
      "Inverser le rapport : $\\cos=\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$, jamais l'hypoténuse au-dessus. Un cosinus d'angle aigu est toujours compris entre $0$ et $1$.",
      "Chercher l'angle en tapant $\\cos$ au lieu de $\\cos^{-1}$, ou oublier de mettre la calculatrice en mode « degré ».",
    ],
    reel: "Une échelle de $6$ m appuyée contre un mur à Saint-Pierre, inclinée à $60^\\circ$ avec le sol : son pied est à $6\\times 0{,}5=3$ m du mur.",
  },
  {
    id: "quadrilatere_parallelogramme",
    emoji: "🔷",
    titre: "Parallélogrammes",
    domaine: "Espace et géométrie",
    essentiel:
      "Un **parallélogramme** est un quadrilatère dont les **côtés opposés sont parallèles** deux à deux. On en déduit trois propriétés : les côtés opposés sont **de même longueur**, les **angles opposés sont égaux** (et deux angles qui se suivent ont pour somme $180^\\circ$), et les **diagonales se coupent en leur milieu**. Son **aire** se calcule avec la **base** et la **hauteur**, jamais avec le côté incliné.",
    formules: [
      { label: "Côtés opposés (dans $ABCD$)", latex: "$AB = CD$ et $BC = DA$ (parallèles et de même longueur)" },
      { label: "Diagonales (milieu $O$)", latex: "elles se coupent en leur milieu : $AO = OC$ et $BO = OD$" },
      { label: "Angles", latex: "opposés égaux $\\widehat{A}=\\widehat{C}$ ; consécutifs $\\widehat{A}+\\widehat{B}=180^\\circ$" },
      { label: "Aire", latex: "$\\text{aire} = \\text{base}\\times\\text{hauteur}$ (hauteur $\\perp$ base)" },
      { label: "Prouver que c'est un parallélogramme", latex: "côtés opposés parallèles, ou côtés opposés égaux, ou diagonales de même milieu $\\Rightarrow$ parallélogramme" },
    ],
    reflexes: [
      { si: "« côtés opposés parallèles » OU « côtés opposés égaux » OU « diagonales de même milieu »", alors: "on peut conclure : c'est un parallélogramme" },
      { si: "on connaît un côté et on cherche le côté opposé", alors: "il a la même longueur : $AB = CD$" },
      { si: "on cherche l'aire", alors: "$\\text{base}\\times\\text{hauteur}$, avec la hauteur perpendiculaire, pas le côté incliné" },
      { si: "on connaît une diagonale (ou sa moitié)", alors: "le milieu la partage en deux moitiés égales" },
    ],
    pieges: [
      "Prendre le **côté incliné** au lieu de la **hauteur** pour l'aire : la hauteur est perpendiculaire à la base.",
      "Croire que des **diagonales égales** suffisent : c'est faux (un trapèze isocèle a des diagonales égales sans être un parallélogramme). Il faut qu'elles se coupent en leur **milieu**.",
      "Confondre les figures : un rectangle est **toujours** un parallélogramme, mais un parallélogramme n'a **pas forcément** d'angles droits.",
    ],
    reel: "Une parcelle de canne à sucre à Saint-Louis a la forme d'un parallélogramme de base $20$ m et de hauteur $8$ m : sa surface vaut $20\\times 8 = 160$ m².",
  },
  {
    id: "sym_transformation",
    emoji: "🔄",
    titre: "Transformations",
    domaine: "Espace et géométrie",
    essentiel:
      "En 4e, quatre transformations **déplacent** une figure sans jamais la **déformer** : la **symétrie axiale** (comme un miroir, par rapport à une droite), la **symétrie centrale** (demi-tour autour d'un point), la **translation** (un glissement) et la **rotation** (on tourne autour d'un centre d'un certain angle). Toutes **conservent les longueurs, les angles, l'alignement et le parallélisme** : la figure image a exactement la **même forme et la même taille** que la figure de départ.",
    formules: [
      { label: "Symétrie axiale (miroir)", latex: "l'axe est la médiatrice de $[AA']$ : perpendiculaire à $[AA']$ et passant par son milieu" },
      { label: "Symétrie centrale (demi-tour)", latex: "$O$ est le milieu de $[AA']$ ; donc $A$, $O$, $A'$ sont alignés et $OA = OA'$" },
      { label: "Translation (glisser)", latex: "tous les points subissent le même déplacement : même direction, même sens, même longueur" },
      { label: "Rotation (tourner)", latex: "définie par un centre $O$ et un angle ; la distance au centre est conservée : $OA = OA'$" },
      { label: "Ce que les 4 conservent", latex: "longueurs, angles, alignement et parallélisme : $180^\\circ$ = symétrie centrale" },
    ],
    reflexes: [
      { si: "« la figure glisse sans tourner »", alors: "translation (même déplacement pour tous les points)" },
      { si: "« demi-tour autour d'un point » ou « rotation de $180^\\circ$ »", alors: "symétrie centrale de centre $O$" },
      { si: "« retournée comme dans un miroir par rapport à une droite »", alors: "symétrie axiale (l'axe est la médiatrice de $[AA']$)" },
      { si: "on demande une longueur ou un angle APRÈS transformation", alors: "il ne change pas : $OA = OA'$, angle image = angle de départ" },
    ],
    pieges: [
      "Confondre symétrie AXIALE (un axe, une droite) et symétrie CENTRALE (un point, le centre $O$) : « axiale » vient d'axe, « centrale » de centre.",
      "Croire qu'une de ces transformations agrandit ou déforme la figure : NON, les longueurs et les angles sont toujours conservés ($OA = OA'$).",
      "En symétrie axiale, croire que $A$, $A'$ et l'axe sont alignés : l'axe est PERPENDICULAIRE à $[AA']$ et passe par son milieu (c'est la médiatrice).",
    ],
    reel: "Le reflet du Piton des Neiges dans l'eau calme d'un bassin : c'est une symétrie axiale, la surface de l'eau joue le rôle de l'axe (le miroir).",
  },
  {
    id: "aire_perimetre",
    emoji: "⭕",
    titre: "Périmètres",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Le **périmètre** d'une figure, c'est la **longueur de son contour** : le tour complet. On l'exprime en **cm, m, km** (jamais en $\\text{cm}^2$, ça c'est l'aire). Pour un polygone on **additionne tous les côtés** ; pour les figures usuelles on a des formules, et pour le **cercle** on utilise $\\pi$.",
    formules: [
      { label: "Rectangle (longueur $L$, largeur $l$)", latex: "$P = 2\\times(L+l)$" },
      { label: "Carré (côté $c$)", latex: "$P = 4\\times c$" },
      { label: "Triangle / polygone", latex: "$P = c_1 + c_2 + c_3$ (on additionne tous les côtés)" },
      { label: "Cercle (rayon $r$, diamètre $d=2r$)", latex: "$P = 2\\pi r = \\pi d$" },
      { label: "Retrouver un côté à partir de $P$", latex: "carré : $c=\\dfrac{P}{4}$ ; rectangle : $l=\\dfrac{P}{2}-L$" },
    ],
    reflexes: [
      { si: "on veut clôturer, entourer, border, faire le tour d'une figure", alors: "c'est un **périmètre** : une longueur en cm ou m, jamais en $\\text{cm}^2$" },
      { si: "un **rectangle** ou un **carré**", alors: "$2\\times(L+l)$ ou $4\\times c$" },
      { si: "un **cercle**, une roue, un rond", alors: "longueur $=2\\pi r=\\pi d$" },
      { si: "on connaît $P$ et il manque un côté", alors: "on **inverse** : on divise ou on soustrait ($c=\\dfrac{P}{4}$)" },
    ],
    pieges: [
      "Confondre **périmètre** (le contour, en cm) et **aire** (la surface, en $\\text{cm}^2$).",
      "Oublier le $\\times 2$ du rectangle : $P=2\\times(L+l)$ et non $L+l$ (avec $5$ et $3$ on obtient $16$, pas $8$).",
      "Mélanger rayon et diamètre : $2\\pi r$ se calcule avec le **rayon**, $\\pi d$ avec le **diamètre**, et $d=2r$.",
    ],
    reel: "Pour clôturer un terrain rectangulaire de $25$ m sur $15$ m à Saint-Pierre, il faut $2\\times(25+15)=80$ m de grillage.",
  },
  {
    id: "aire_surface",
    emoji: "🟦",
    titre: "Aires",
    domaine: "Grandeurs et mesures",
    essentiel:
      "L'**aire** mesure la **surface** occupée par une figure (son intérieur), pas son contour : on l'exprime en **unités carrées** ($\\text{cm}^2$, $\\text{m}^2$). Chaque figure simple a sa **formule** ; pour une **figure composée**, on la **découpe** en rectangles ou triangles et on **additionne** les aires.",
    formules: [
      { label: "Rectangle (longueur × largeur)", latex: "$A = L \\times l$" },
      { label: "Carré (côté × côté)", latex: "$A = c \\times c = c^2$" },
      { label: "Triangle", latex: "$A = \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$" },
      { label: "Parallélogramme (hauteur, pas le côté incliné)", latex: "$A = \\text{base} \\times \\text{hauteur}$" },
      { label: "Figure composée", latex: "on découpe en figures simples, puis on additionne les aires" },
    ],
    reflexes: [
      { si: "« quelle surface ? », « combien de $\\text{m}^2$ de carrelage / de peinture ? »", alors: "c'est une aire, pas un périmètre" },
      { si: "un triangle", alors: "base $\\times$ hauteur, puis on divise par $2$" },
      { si: "un parallélogramme", alors: "base $\\times$ hauteur (perpendiculaire), jamais le côté incliné" },
      { si: "une figure en L ou composée", alors: "découper en rectangles/triangles et additionner les aires" },
    ],
    pieges: [
      "Confondre aire et périmètre : l'aire c'est l'intérieur (en $\\text{cm}^2$), le périmètre c'est le tour (en cm).",
      "Parallélogramme : prendre le côté incliné au lieu de la hauteur. La hauteur est perpendiculaire à la base.",
      "Triangle : oublier de diviser par $2$. Un triangle, c'est la moitié d'un rectangle de même base et même hauteur.",
    ],
    reel: "Carreler une terrasse à Saint-Pierre de $5$ m sur $4$ m : il faut couvrir $5 \\times 4 = 20\\ \\text{m}^2$ de carrelage.",
  },
  {
    id: "volume_solide",
    emoji: "📦",
    titre: "Volumes",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Le **volume** mesure la place occupée par un solide dans l'espace ; il se mesure en unités **au cube** ($\\text{cm}^3$, $\\text{m}^3$). Pour un **prisme droit** ou un **cylindre**, on empile toujours la même base : **$V = \\text{aire de base} \\times \\text{hauteur}$**. Le **pavé droit** n'est qu'un cas particulier où la base est un rectangle.",
    formules: [
      { label: "Formule reine (prisme droit, cylindre)", latex: "$V = \\text{aire de base} \\times \\text{hauteur}$" },
      { label: "Pavé droit", latex: "$V = L \\times l \\times h$ (les trois dimensions)" },
      { label: "Cylindre (rayon $r$)", latex: "$V = \\pi \\times r^2 \\times h$" },
      { label: "Retrouver une donnée manquante", latex: "$\\text{aire de base} = \\dfrac{V}{h}$ ; $h = \\dfrac{V}{\\text{aire de base}}$" },
      { label: "Conversions", latex: "$1\\,\\text{dm}^3 = 1000\\,\\text{cm}^3$ ; $1\\,\\text{L} = 1\\,\\text{dm}^3$ ; $1\\,\\text{m}^3 = 1000\\,\\text{L}$" },
    ],
    reflexes: [
      { si: "un pavé droit, une boîte, une caisse", alors: "multiplier les trois dimensions : $L \\times l \\times h$" },
      { si: "un prisme droit ou un cylindre", alors: "calculer l'aire de la base, puis $\\times$ la hauteur" },
      { si: "un cylindre avec le **diamètre** donné", alors: "d'abord $r = d \\div 2$, puis $\\pi r^2 h$" },
      { si: "on connaît le volume et la hauteur", alors: "diviser : $\\text{aire de base} = V \\div h$" },
    ],
    pieges: [
      "Additionner les dimensions au lieu de les multiplier : $5\\times 4\\times 3 = 60$, et non $5+4+3 = 12$.",
      "Confondre rayon et diamètre du cylindre : si le diamètre vaut $8$ cm, alors $r = 4$ cm (on divise par $2$).",
      "Rater la conversion : $1\\,\\text{dm}^3 = 1000\\,\\text{cm}^3$ (pas $10$ ni $100$), car on cube les trois dimensions ($10^3$).",
    ],
    reel: "Une cuve de récupération d'eau de pluie à Saint-Pierre, cubique de $1$ m de côté, a un volume de $1\\,\\text{m}^3 = 1000$ L d'eau.",
  },
  {
    id: "stat_statistique",
    emoji: "📊",
    titre: "Statistiques",
    domaine: "Statistiques et probabilités",
    essentiel:
      "Les **statistiques** résument une série de données avec quelques nombres clés. L'**effectif** compte les individus, la **fréquence** donne leur part, la **moyenne** et la **médiane** situent le centre de la série, et l'**étendue** mesure sa **dispersion** (l'écart entre les extrêmes).",
    formules: [
      { label: "Effectif total", latex: "$\\text{effectif total} = $ somme de tous les effectifs" },
      { label: "Fréquence", latex: "$f = \\dfrac{\\text{effectif}}{\\text{effectif total}}$ ($\\times 100$ pour un $\\%$)" },
      { label: "Moyenne", latex: "$m = \\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs}}$" },
      { label: "Médiane", latex: "valeur centrale de la série **rangée** ; si nombre pair, moyenne des deux centrales" },
      { label: "Étendue", latex: "$\\text{étendue} = \\text{max} - \\text{min}$" },
    ],
    reflexes: [
      { si: "« combien en tout ? », effectif total", alors: "additionner tous les effectifs" },
      { si: "« part », « proportion », « fréquence »", alors: "$\\dfrac{\\text{effectif}}{\\text{total}}$, puis $\\times 100$ pour un $\\%$" },
      { si: "on cherche la médiane", alors: "RANGER la série, puis prendre la valeur du milieu" },
      { si: "on cherche la moyenne", alors: "somme des valeurs $\\div$ nombre de valeurs" },
    ],
    pieges: [
      "Chercher la médiane sans avoir **rangé** la série : la valeur du milieu n'est plus la bonne.",
      "Confondre somme et moyenne : $5+10+15=30$ est la somme ; la moyenne est $30\\div 3 = 10$.",
      "Médiane avec un nombre **pair** de valeurs : prendre la moyenne des DEUX valeurs centrales, pas une seule (ex. $4;8;10;14 \\Rightarrow (8+10)\\div 2 = 9$).",
    ],
    reel: "Sur $25$ élèves d'une classe à Saint-Pierre, $10$ font du sport le mercredi : la fréquence est $\\dfrac{10}{25} = 0{,}4$, soit $40\\,\\%$.",
  },
  {
    id: "proba_experience",
    emoji: "🎲",
    titre: "Probabilités",
    domaine: "Statistiques et probabilités",
    essentiel:
      "Une **probabilité** mesure la **chance** qu'un événement se produise : c'est un nombre compris entre $0$ (impossible) et $1$ (certain). Quand toutes les **issues** ont la même chance (**équiprobabilité** : dé, pièce, billes identiques), on calcule $P=\\dfrac{\\text{cas favorables}}{\\text{cas possibles}}$. Une probabilité s'écrit en **fraction**, en **décimal** ou en **pourcentage**.",
    formules: [
      { label: "Probabilité (situation équiprobable)", latex: "$P=\\dfrac{\\text{nombre de cas favorables}}{\\text{nombre de cas possibles}}$" },
      { label: "Bornes et cas particuliers", latex: "$0\\le P\\le 1$ ; certain : $P=1$ ; impossible : $P=0$" },
      { label: "Événement contraire", latex: "$P(\\overline{A})=1-P(A)$" },
      { label: "Fraction, décimal, pourcentage", latex: "$\\dfrac{1}{2}=0{,}5=50\\,\\%$ (multiplier par $100$)" },
      { label: "Comparer (numérateur égal)", latex: "$\\dfrac{1}{2}>\\dfrac{1}{4}$ : plus petit dénominateur = plus grande probabilité" },
    ],
    reflexes: [
      { si: "situation équiprobable (dé, pièce, sac de billes)", alors: "compter les cas favorables sur les cas possibles" },
      { si: "« ne pas... » ou « événement contraire »", alors: "utiliser $P(\\overline{A})=1-P(A)$" },
      { si: "« certain » ou « impossible »", alors: "$P=1$ ou $P=0$, sans calcul" },
      { si: "comparer deux probabilités", alors: "les mettre au même dénominateur ou les passer en $\\%$" },
    ],
    pieges: [
      "Confondre une **issue** (un seul résultat, ex. « obtenir $4$ ») et un **événement** (plusieurs issues, ex. « obtenir un pair »).",
      "Annoncer une probabilité supérieure à $1$ : elle est TOUJOURS comprise entre $0$ et $1$.",
      "Inverser la fraction : c'est cas favorables $\\div$ cas possibles, jamais le total au numérateur.",
    ],
    reel: "Au marché de Saint-Pierre, un panier contient $3$ mangues parmi $8$ fruits : la probabilité d'en attraper une au hasard est $\\dfrac{3}{8}$, soit environ $37{,}5\\,\\%$.",
  },
  {
    id: "algo_programmation",
    emoji: "🐍",
    titre: "Algorithmique et programmation",
    domaine: "Algorithmique et programmation",
    essentiel:
      "Une **variable** stocke une valeur qui peut **changer** (score, vie…). Une **condition** est un test qui vaut **vrai** ou **faux** (ex. $\\text{score} > 10$). Le bloc **si… alors… sinon** exécute des instructions selon que la condition est vraie ou fausse. Programmer, c'est **choisir et ordonner les blocs** pour atteindre un objectif.",
    formules: [
      { label: "Comparer (une condition est vraie ou fausse)", latex: "$>$ ; $<$ ; $=$ ; $\\geq$ ; $\\leq$ (ex. $\\text{score} > 10$)" },
      { label: "Si… alors", latex: "si $\\text{condition}$ alors (bloc exécuté SEULEMENT si elle est vraie)" },
      { label: "Si… alors… sinon", latex: "une SEULE branche s'exécute : vraie $\\to$ 1re, fausse $\\to$ 2e" },
      { label: "Mettre à / ajouter à", latex: "mettre $x$ à $5$ REMPLACE ; ajouter $5$ à $x$ MODIFIE : $x \\to x+5$" },
      { label: "Répéter $n$ fois « ajouter $a$ »", latex: "ajoute $n\\times a$ en tout (ex. $3$ fois $+2 \\to +6$)" },
    ],
    reflexes: [
      { si: "« faire quelque chose seulement dans un cas »", alors: "un bloc si… alors" },
      { si: "« sinon », deux issues possibles (une OU l'autre)", alors: "si… alors… sinon (une seule branche s'exécute)" },
      { si: "« ajouter / enlever » des points à une variable", alors: "ajouter à (on garde l'ancienne valeur), pas mettre à" },
      { si: "on répète $n$ fois la même modification", alors: "multiplier l'ajout par $n$" },
    ],
    pieges: [
      "$>$ est STRICT : si score vaut $10$, la condition « score $> 10$ » est FAUSSE (il faut $\\geq$).",
      "Confondre « mettre $x$ à $2$ » (qui remplace : $x=2$) et « ajouter $2$ à $x$ » (qui modifie).",
      "Croire que les deux branches d'un si… sinon s'exécutent : NON, une seule est choisie.",
    ],
    reel: "Dans un jeu vidéo, la variable vie démarre à $3$ ; à chaque chute on exécute « ajouter $-1$ à vie », et si vie $= 0$ alors afficher « Perdu ».",
  },
];

const BANQUES: Record<string, TutorBankItemV4[]> = {
  relatif_operation: operationsRelatifsBank,
  fraction_nombre: fractionsBank,
  prop_proportionnalite: proportionnaliteBank,
  litteral_expression: expressionsLitteralesBank,
  litteral_distributivite: distributiviteBank,
  litteral_identite_remarquable: identitesRemarquablesBank,
  litteral_factorisation: factorisationBank,
  equation_resolution: equationsBank,
  pythagore_theoreme: pythagoreBank,
  thales_theoreme: thalesBank,
  trigo_cosinus: cosinusBank,
  quadrilatere_parallelogramme: parallelogrammesBank,
  sym_transformation: transformationsBank,
  aire_perimetre: perimetresBank,
  aire_surface: airesBank,
  volume_solide: volumesBank,
  stat_statistique: statistiquesBank,
  proba_experience: probabilitesBank,
  algo_programmation: algorithmiqueBank,
};

export const KIT_MATHS_QUATRIEME: KitData = {
  slug: "maths-quatrieme",
  titre: "Guide de survie · Maths 4e",
  baseline:
    "Les 19 chapitres du programme de 4e en 19 fiches : les formules qui sauvent, les réflexes, les pièges qui coûtent des points — et un test corrigé par chapitre. À imprimer, à glisser dans le classeur.",
  matiere: "maths",
  classeLabel: "Quatrième",
  coachClasse: "4e",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
