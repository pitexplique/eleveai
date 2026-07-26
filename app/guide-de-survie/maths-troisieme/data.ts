// ─── Guide de survie · Maths 3e (spécial brevet) ────────────────────────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/maths/3e/notions.ts
// - checklists     = micro-compétences de microSkills.ts (BO cycle 4)
// - test de survie = items "fixed" puisés dans les banques du coach
// Condensés écrits par 22 rédacteurs parallèles (workflow du 26/07) puis VÉRIFIÉS
// à la main contre le BO cycle 4 et les banques (exactitude des exemples, périmètre
// 3e strict — pas de débordement vers le lycée, couverture des micros).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/3e/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { nombresRationnelsBank } from "@/lib/tutor-v4/questionBank/3e/maths/nombres_rationnels.bank";
import { puissancesBank } from "@/lib/tutor-v4/questionBank/3e/maths/puissances.bank";
import { racineCarreeBank } from "@/lib/tutor-v4/questionBank/3e/maths/racine_carree.bank";
import { arithmetiqueBank } from "@/lib/tutor-v4/questionBank/3e/maths/arithmetique.bank";
import { calculLitteralBank } from "@/lib/tutor-v4/questionBank/3e/maths/calcul_litteral.bank";
import { equationsBank } from "@/lib/tutor-v4/questionBank/3e/maths/equations.bank";
import { proportionnaliteBank } from "@/lib/tutor-v4/questionBank/3e/maths/proportionnalite.bank";
import { fonctionsBank } from "@/lib/tutor-v4/questionBank/3e/maths/fonctions.bank";
import { affineBank } from "@/lib/tutor-v4/questionBank/3e/maths/affine.bank";
import { trianglesBank } from "@/lib/tutor-v4/questionBank/3e/maths/triangles.bank";
import { pythagore3eBank } from "@/lib/tutor-v4/questionBank/3e/maths/pythagore.bank";
import { thalesBank } from "@/lib/tutor-v4/questionBank/3e/maths/thales.bank";
import { trigonometrieBank } from "@/lib/tutor-v4/questionBank/3e/maths/trigonometrie.bank";
import { transformationsBank } from "@/lib/tutor-v4/questionBank/3e/maths/transformations.bank";
import { geometrieEspaceBank } from "@/lib/tutor-v4/questionBank/3e/maths/geometrie-espace.bank";
import { sectionsSolidesBank } from "@/lib/tutor-v4/questionBank/3e/maths/sections_solides.bank";
import { perimetresBank } from "@/lib/tutor-v4/questionBank/3e/maths/perimetres.bank";
import { airesBank } from "@/lib/tutor-v4/questionBank/3e/maths/aires.bank";
import { volumesBank } from "@/lib/tutor-v4/questionBank/3e/maths/volumes.bank";
import { statistiquesBank } from "@/lib/tutor-v4/questionBank/3e/maths/statistiques.bank";
import { probabilitesBank } from "@/lib/tutor-v4/questionBank/3e/maths/probabilites.bank";
import { algorithmiqueBank } from "@/lib/tutor-v4/questionBank/3e/maths/algorithmique.bank";
import type { KitData, KitNotion } from "@/components/kit/types";

// Checklists + tests dérivés du coach (module partagé par tous les guides).
const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  {
    id: "fraction_rationnel",
    emoji: "➗",
    titre: "Nombres rationnels",
    domaine: "Nombres et calculs",
    essentiel:
      "Un **nombre rationnel** est un nombre qui peut s'écrire sous forme de **fraction** $\\dfrac{a}{b}$ avec $a$ et $b$ **entiers** et $b\\neq 0$ : les entiers, les décimaux et les fractions sont tous rationnels. Pour **additionner** ou **soustraire**, on met au **même dénominateur** ; pour **multiplier**, on multiplie en ligne ; pour **diviser**, on multiplie par l'**inverse**.",
    formules: [
      { label: "Un rationnel", latex: "$\\dfrac{a}{b}$ avec $a$, $b$ entiers et $b\\neq 0$ (ex. $0{,}25=\\dfrac{25}{100}=\\dfrac{1}{4}$)" },
      { label: "Additionner (même dénominateur)", latex: "$\\dfrac{a}{c}+\\dfrac{b}{c}=\\dfrac{a+b}{c}$ (ex. $\\dfrac{1}{2}+\\dfrac{1}{3}=\\dfrac{3}{6}+\\dfrac{2}{6}=\\dfrac{5}{6}$)" },
      { label: "Multiplier", latex: "$\\dfrac{a}{b}\\times\\dfrac{c}{d}=\\dfrac{a\\times c}{b\\times d}$ (ex. $\\dfrac{3}{4}\\times\\dfrac{2}{5}=\\dfrac{6}{20}=\\dfrac{3}{10}$)" },
      { label: "Diviser (= multiplier par l'inverse)", latex: "$\\dfrac{a}{b}\\div\\dfrac{c}{d}=\\dfrac{a}{b}\\times\\dfrac{d}{c}$" },
      { label: "Comparer (produits en croix)", latex: "$\\dfrac{a}{b}$ et $\\dfrac{c}{d}$ : comparer $a\\times d$ et $b\\times c$" },
    ],
    reflexes: [
      { si: "« additionner / soustraire » des fractions", alors: "même dénominateur d'abord, puis on ajoute les numérateurs SEULEMENT" },
      { si: "« multiplier » des fractions", alors: "numérateurs entre eux, dénominateurs entre eux (pas besoin du même dénominateur)" },
      { si: "« diviser » par une fraction", alors: "multiplier par l'inverse : $\\div\\dfrac{c}{d}$ devient $\\times\\dfrac{d}{c}$" },
      { si: "« comparer » deux fractions", alors: "produits en croix, ou passer à l'écriture décimale ($\\dfrac{3}{4}=0{,}75$)" },
    ],
    pieges: [
      "Additionner les dénominateurs : $\\dfrac{1}{2}+\\dfrac{1}{3}\\neq\\dfrac{2}{5}$. On met au même dénominateur : $\\dfrac{3}{6}+\\dfrac{2}{6}=\\dfrac{5}{6}$.",
      "Croire qu'il faut le même dénominateur pour MULTIPLIER : faux, on multiplie directement ($\\dfrac{3}{4}\\times\\dfrac{2}{5}=\\dfrac{6}{20}$).",
      "Comparer les négatifs à l'envers : $-\\dfrac{3}{4}=-0{,}75$ est plus PETIT que $-\\dfrac{1}{2}=-0{,}5$.",
    ],
    reel: "Une recette de gâteau patate à Saint-Pierre demande $\\dfrac{3}{4}$ de tasse de sucre ; pour une demi-recette on calcule $\\dfrac{3}{4}\\times\\dfrac{1}{2}=\\dfrac{3}{8}$ de tasse.",
  },
  {
    id: "entier_puissance",
    emoji: "🔟",
    titre: "Puissances",
    domaine: "Nombres et calculs",
    essentiel:
      "Une **puissance** $a^n$ est une **multiplication répétée** : on multiplie la base $a$ par elle-même autant de fois que l'indique l'**exposant** $n$. Les **puissances de $10$** servent à écrire très grands et très petits nombres, ce qui donne l'**écriture scientifique** $a\\times 10^n$ (avec $1\\le a<10$), très utile au brevet.",
    formules: [
      { label: "Définition", latex: "$a^n = a\\times a\\times\\cdots\\times a$ ($n$ facteurs) ; $a^1=a$" },
      { label: "Puissances de $10$", latex: "$10^n = 1$ suivi de $n$ zéros ; $10^{-n}=\\dfrac{1}{10^n}$ (ex. $10^{-2}=0{,}01$)" },
      { label: "Règles (même base)", latex: "$a^m\\times a^n=a^{m+n}$ ; $\\dfrac{a^m}{a^n}=a^{m-n}$ ; $(a^m)^n=a^{m\\times n}$" },
      { label: "Exposant négatif", latex: "$a^{-n}=\\dfrac{1}{a^n}$" },
      { label: "Écriture scientifique", latex: "$a\\times 10^n$ avec $1\\le a<10$ (ex. $5\\,600=5{,}6\\times 10^3$)" },
    ],
    reflexes: [
      { si: "on voit $3^2$", alors: "c'est $3\\times 3=9$, pas $3\\times 2$" },
      { si: "même base, on **multiplie** ou on **divise**", alors: "on **additionne** ou on **soustrait** les exposants" },
      { si: "un très grand ou très petit nombre à écrire", alors: "écriture scientifique $a\\times 10^n$, virgule après le 1ᵉʳ chiffre non nul ($1\\le a<10$)" },
      { si: "un exposant négatif comme $10^{-3}$", alors: "on passe à l'inverse : $\\dfrac{1}{10^3}$" },
    ],
    pieges: [
      "$3^2=9$ (c'est $3\\times 3$), surtout pas $6$ ($3\\times 2$) : l'exposant n'est pas un facteur.",
      "Les règles sur les exposants marchent pour un **produit** ou un **quotient**, jamais une somme : $10^3+10^2=1\\,100$, pas $10^5$.",
      "En écriture scientifique, le nombre devant doit être entre $1$ et $10$ : $42\\times 10^3$ n'est pas correct (on écrit $4{,}2\\times 10^4$).",
    ],
    reel: "La population de La Réunion, environ $870\\,000$ habitants, s'écrit $8{,}7\\times 10^5$ en écriture scientifique.",
  },
  {
    id: "entier_racine_carree",
    emoji: "🧮",
    titre: "Racine carrée",
    domaine: "Nombres et calculs",
    essentiel:
      "La **racine carrée** de $a$ (avec $a\\ge 0$), notée $\\sqrt{a}$, est le nombre **positif** dont le **carré** vaut $a$. Elle « défait » le carré : $(\\sqrt{a})^2=a$ et $\\sqrt{a^2}=a$. Un **carré parfait** est le carré d'un entier ($1,4,9,16,25,\\dots$) : sa racine est un entier ; sinon on **encadre** $\\sqrt{a}$ entre deux entiers.",
    formules: [
      { label: "Définition", latex: "$\\sqrt{a}=b$ signifie $b\\ge 0$ et $b^2=a$" },
      { label: "Carré et racine s'annulent", latex: "$(\\sqrt{a})^2=a$ et $\\sqrt{a^2}=a$ (pour $a\\ge 0$)" },
      { label: "Carrés parfaits à connaître", latex: "$1,4,9,16,25,36,49,64,81,100,121,144,169$" },
      { label: "Encadrement", latex: "si $k^2<a<(k+1)^2$ alors $k<\\sqrt{a}<k+1$" },
    ],
    reflexes: [
      { si: "on demande $\\sqrt{a}$ avec $a$ carré parfait", alors: "chercher l'entier dont le carré vaut $a$ ($\\sqrt{49}=7$)" },
      { si: "« entre quels entiers se trouve $\\sqrt{a}$ ? »", alors: "encadrer $a$ par les deux carrés parfaits voisins" },
      { si: "aire d'un carré $=A$, on cherche le côté", alors: "côté $=\\sqrt{A}$" },
      { si: "on voit $\\sqrt{a+b}$", alors: "calculer d'abord $a+b$ SOUS la racine, sans séparer" },
    ],
    pieges: [
      "Croire que $\\sqrt{a}=a\\div 2$ : c'est faux, $\\sqrt{16}=4$ (car $4^2=16$), pas $8$.",
      "Séparer la racine d'une somme : $\\sqrt{9+16}=\\sqrt{25}=5$, alors que $\\sqrt{9}+\\sqrt{16}=3+4=7$.",
      "Confondre carré et racine : $\\sqrt{5}\\approx 2{,}2$ n'est pas un entier, mais $5^2=25$.",
    ],
    reel: "Un carreleur à Saint-Pierre pose une terrasse carrée de $36\\ \\text{m}^2$ : le côté mesure $\\sqrt{36}=6$ m.",
  },
  {
    id: "entier_arithmetique",
    emoji: "🔢",
    titre: "Multiples et diviseurs",
    domaine: "Nombres et calculs",
    essentiel:
      "**$b$ divise $a$** (ou : $a$ est un **multiple** de $b$) quand la division $a\\div b$ tombe juste, sans reste : $a=b\\times k$. Un **nombre premier** a exactement **deux diviseurs**, $1$ et lui-même. **Décomposer** un entier en **produit de facteurs premiers**, c'est sa carte d'identité : ça sert à **simplifier une fraction** ou à repérer tous ses diviseurs.",
    formules: [
      { label: "Multiple / diviseur", latex: "$a=b\\times k$ ($k$ entier) : $a$ est un multiple de $b$, $b$ un diviseur de $a$" },
      { label: "Critères de divisibilité", latex: "par $2$ (finit par $0,2,4,6,8$), $5$ ($0$ ou $5$), $10$ ($0$) ; par $3$ ou $9$ : somme des chiffres divisible par $3$ ou $9$" },
      { label: "Nombre premier", latex: "exactement $2$ diviseurs : $1$ et lui-même ($1$ n'est pas premier ; $2$ est le seul pair premier)" },
      { label: "Décomposition en facteurs premiers", latex: "$12=2^2\\times 3$, $\\;60=2^2\\times 3\\times 5$" },
      { label: "Simplifier une fraction", latex: "$\\dfrac{60}{36}=\\dfrac{2^2\\times 3\\times 5}{2^2\\times 3^2}=\\dfrac{5}{3}$" },
    ],
    reflexes: [
      { si: "« $a$ est-il un multiple / un diviseur de… ? »", alors: "poser la division : reste $0$ $\\Rightarrow$ oui" },
      { si: "« divisible par $3$ ou $9$ ? »", alors: "additionner les chiffres ; par $2$, $5$, $10$ : regarder le dernier chiffre" },
      { si: "« $n$ est-il premier ? »", alors: "tester $2,3,5,7,\\dots$ tant que (diviseur)$^2\\le n$" },
      { si: "une fraction ne se simplifie pas à l'œil", alors: "décomposer le haut et le bas en facteurs premiers, puis barrer les communs" },
    ],
    pieges: [
      "Croire que $1$ est premier : faux, il n'a qu'un seul diviseur. En revanche $2$ est bien premier (le seul pair).",
      "Confondre multiple et diviseur : $12$ est un multiple de $3$, tandis que $3$ est un diviseur de $12$.",
      "Décomposition non terminée : $30=2\\times 15$ ne suffit pas car $15$ n'est pas premier ; il faut aller jusqu'à $30=2\\times 3\\times 5$.",
    ],
    reel: "Ranger $48$ letchis en paquets tous identiques sans reste : chaque taille de paquet possible est un diviseur de $48=2^4\\times 3$ ($2$, $3$, $4$, $6$, $8$, $12$, $16$, $24$…).",
  },
  {
    id: "litteral_calcul",
    emoji: "🔤",
    titre: "Calcul littéral",
    domaine: "Nombres et calculs",
    essentiel:
      "Le **calcul littéral**, c'est calculer avec des **lettres** qui représentent des nombres (attention : $4x$ veut dire $4\\times x$). **Développer**, c'est enlever les parenthèses en **distribuant** la multiplication ; **factoriser**, c'est l'inverse, transformer une somme en **produit** grâce à un **facteur commun**. **Réduire** = regrouper les **termes semblables** (même lettre, même puissance).",
    formules: [
      { label: "Développer (simple distributivité)", latex: "$k(a+b)=ka+kb$" },
      { label: "Double distributivité", latex: "$(a+b)(c+d)=ac+ad+bc+bd$" },
      { label: "Carré d'une somme / d'une différence", latex: "$(a+b)^2=a^2+2ab+b^2$ ; $(a-b)^2=a^2-2ab+b^2$" },
      { label: "Différence de deux carrés", latex: "$a^2-b^2=(a-b)(a+b)$" },
      { label: "Factoriser (facteur commun)", latex: "$ka+kb=k(a+b)$" },
    ],
    reflexes: [
      { si: "des parenthèses à faire disparaître", alors: "développer en distribuant à CHAQUE terme" },
      { si: "un facteur commun ou « écris sous forme d'un produit »", alors: "factoriser : $ka+kb=k(a+b)$" },
      { si: "on voit $(a\\pm b)^2$ ou $a^2-b^2$", alors: "appliquer une identité remarquable (plus rapide que la double distributivité)" },
      { si: "« calculer la valeur pour $x=\\dots$ »", alors: "remplacer $x$, le nombre négatif entre parenthèses : $2\\times(-3)$" },
    ],
    pieges: [
      "Oublier le double produit : $(x+3)^2 = x^2+6x+9$, et surtout PAS $x^2+9$.",
      "Ne distribuer qu'à moitié : $4(x+3)=4x+12$ (le $4$ multiplie AUSSI le $3$), pas $4x+3$.",
      "Réduire des termes non semblables : $3x+2\\neq 5x$ et $2x+3x^2\\neq 5x^2$ ($x$ et $x^2$ ne se regroupent pas).",
    ],
    reel: "Un terrain carré de côté $(x+5)$ m à Saint-Pierre : son aire est $(x+5)^2 = x^2+10x+25$ m$^2$.",
  },
  {
    id: "equation_resolution",
    emoji: "🟰",
    titre: "Équations",
    domaine: "Nombres et calculs",
    essentiel:
      "Une **équation** est une **égalité** qui contient une **inconnue** (souvent $x$). La **résoudre**, c'est trouver la ou les valeurs de $x$ qui rendent l'égalité **vraie**. Règle d'or : on effectue **la même opération des deux côtés** pour **isoler $x$**. Cas spécial du brevet : si un **produit est nul**, alors **l'un des facteurs est nul**.",
    formules: [
      { label: "Résoudre $ax+b=c$ (isoler $x$)", latex: "$ax+b=c \\Rightarrow ax=c-b \\Rightarrow x=\\dfrac{c-b}{a}$" },
      { label: "Développer avant de résoudre", latex: "$a(x+b)=c \\Rightarrow ax+ab=c$" },
      { label: "$x$ des deux côtés", latex: "$ax+b=cx+d \\Rightarrow (a-c)x=d-b$" },
      { label: "Équation produit nul", latex: "$A\\times B=0 \\Rightarrow A=0 \\text{ ou } B=0$" },
      { label: "Vérifier une solution", latex: "on remplace $x$ par la valeur : l'égalité doit être vraie" },
    ],
    reflexes: [
      { si: "des parenthèses, ex. $3(x+4)=25$", alors: "développer d'abord, puis isoler $x$" },
      { si: "un produit égal à $0$, ex. $(x-3)(x+5)=0$", alors: "annuler chaque facteur : $x-3=0$ ou $x+5=0$" },
      { si: "$x$ apparaît des deux côtés", alors: "tout regrouper : les $x$ d'un côté, les nombres de l'autre" },
      { si: "un problème en français (« un nombre... »)", alors: "poser $x$, traduire en équation, résoudre, répondre par une phrase" },
    ],
    pieges: [
      "Opération inverse ratée : pour enlever $+6$ on SOUSTRAIT ($x+6=14 \\Rightarrow x=14-6=8$), on n'écrit jamais $x=14+6$.",
      "Développer à moitié : $3(x+4)=3x+12$, PAS $3x+4$ — le facteur multiplie TOUS les termes de la parenthèse.",
      "Produit nul et signes : $(x-4)(x+2)=0$ donne $x=4$ ET $x=-2$ (car $x+2=0 \\Rightarrow x=-2$, pas $2$).",
    ],
    reel: "À Saint-Pierre, des samoussas à $3$ € pièce plus $2$ € de boisson coûtent $17$ € : on pose $3x+2=17$, donc $3x=15$ et $x=5$ samoussas.",
  },
  {
    id: "prop_proportionnalite",
    emoji: "⚖️",
    titre: "Proportionnalité",
    domaine: "Fonctions et proportionnalité",
    essentiel:
      "Une situation est **proportionnelle** si on passe d'une grandeur à l'autre en multipliant toujours par le **même nombre** (le coefficient) ; graphiquement, c'est une **droite passant par l'origine**. Un **pourcentage** est une proportion sur $100$ : prendre $t\\,\\%$, c'est multiplier par $\\dfrac{t}{100}$. **Augmenter** de $t\\,\\%$, c'est multiplier par $1+\\dfrac{t}{100}$ ; **diminuer**, par $1-\\dfrac{t}{100}$.",
    formules: [
      { label: "Coefficient de proportionnalité", latex: "$k=\\dfrac{y}{x}$ puis $y=k\\times x$ (même $k$ partout)" },
      { label: "Quatrième proportionnelle (produit en croix)", latex: "$\\dfrac{a}{b}=\\dfrac{c}{d}\\Rightarrow d=\\dfrac{b\\times c}{a}$" },
      { label: "Pourcentage : prendre $t\\,\\%$ / calculer un taux", latex: "$t\\,\\%$ de $N=\\dfrac{t}{100}\\times N$ ; taux $=\\dfrac{\\text{partie}}{\\text{total}}\\times 100$" },
      { label: "Augmenter / diminuer de $t\\,\\%$", latex: "$\\times\\left(1+\\dfrac{t}{100}\\right)$ / $\\times\\left(1-\\dfrac{t}{100}\\right)$" },
      { label: "Vitesse, débit, densité", latex: "$v=\\dfrac{d}{t}$ ; débit $=\\dfrac{\\text{volume}}{\\text{temps}}$ ; densité $=\\dfrac{\\text{nombre}}{\\text{surface}}$" },
    ],
    reflexes: [
      { si: "un tableau, « est-ce proportionnel ? »", alors: "vérifier que le rapport $\\dfrac{y}{x}$ est le même dans chaque colonne (ou : droite passant par l'origine)" },
      { si: "3 valeurs connues sur 4 en proportion", alors: "produit en croix" },
      { si: "« $+15\\,\\%$ », « $-20\\,\\%$ »", alors: "multiplier par $1{,}15$ ou par $0{,}8$" },
      { si: "des km et des h (ou des L et des min)", alors: "vitesse $=\\dfrac{\\text{distance}}{\\text{temps}}$, débit $=\\dfrac{\\text{volume}}{\\text{temps}}$" },
    ],
    pieges: [
      "Croire qu'augmenter de $20\\,\\%$ puis diminuer de $20\\,\\%$ revient au départ : $\\times 1{,}2\\times 0{,}8=0{,}96$, on perd $4\\,\\%$.",
      "Ajouter les pourcentages pour deux évolutions successives au lieu de multiplier les coefficients : $+10\\,\\%$ puis $+20\\,\\%$ donne $\\times 1{,}32$, soit $+32\\,\\%$ (pas $+30\\,\\%$).",
      "Diviser dans le mauvais sens : la vitesse, c'est distance $\\div$ temps, jamais temps $\\div$ distance (les unités doivent donner des km/h).",
    ],
    reel: "Au marché de Saint-Paul, si $3$ mangues coûtent $6$ €, alors $5$ mangues coûtent $5\\times 2=10$ € : le prix est proportionnel à la quantité (coefficient $=2$ € la mangue).",
  },
  {
    id: "fonction_generalite",
    emoji: "📊",
    titre: "Fonctions",
    domaine: "Fonctions et proportionnalité",
    essentiel:
      "Une **fonction** $f$ est une machine à calculer : à un nombre de départ (l'**antécédent**) elle associe un seul résultat (l'**image**). On note $f(x)$ « $f$ de $x$ ». Calculer une **image**, c'est remplacer $x$ par un nombre ; chercher un **antécédent** de $y$, c'est résoudre l'équation $f(x)=y$. Cas particuliers : la fonction **linéaire** $f(x)=ax$ et la fonction **affine** $f(x)=ax+b$, dont la représentation graphique est une **droite**.",
    formules: [
      { label: "Calculer une image (remplacer $x$)", latex: "$f(x)=2x+3\\Rightarrow f(4)=2\\times 4+3=11$" },
      { label: "Chercher un antécédent de $y$", latex: "résoudre $f(x)=y$ (ex. $2x+1=9\\Rightarrow x=4$)" },
      { label: "Fonction linéaire", latex: "$f(x)=ax$ (droite passant par l'origine, $a=$ coefficient)" },
      { label: "Fonction affine", latex: "$f(x)=ax+b$ ($a=$ coeff. directeur, $b=$ ordonnée à l'origine)" },
      { label: "Lecture graphique", latex: "image : de $x$ on monte vers la droite ; antécédent : de $y$ on rejoint la droite" },
    ],
    reflexes: [
      { si: "« calcule $f(3)$ » ou « image de $3$ »", alors: "remplacer $x$ par $3$ dans la formule" },
      { si: "« antécédent de $7$ » ou « pour quel $x$ a-t-on $f(x)=7$ ? »", alors: "résoudre l'équation $f(x)=7$" },
      { si: "la droite passe par l'origine $(0\\,;0)$", alors: "fonction linéaire $f(x)=ax$ ; sinon affine $ax+b$" },
      { si: "un tableau de valeurs", alors: "1ʳᵉ ligne $=$ les $x$, 2ᵉ ligne $=$ les images $f(x)$" },
    ],
    pieges: [
      "Confondre image et antécédent : l'image est le RÉSULTAT (on donne $x$), l'antécédent est le DÉPART (on cherche $x$ tel que $f(x)=y$).",
      "Sur un graphique, inverser les lectures : pour une image on part de l'axe horizontal (les $x$), pour un antécédent on part de l'axe vertical (les $y$).",
      "Croire que toute droite est linéaire : $f(x)=ax$ passe par l'origine, mais $f(x)=ax+b$ (avec $b\\neq 0$) ne passe pas par $(0\\,;0)$.",
    ],
    reel: "Un food truck à Saint-Pierre vend les tacos avec $f(x)=2x+3$ (en €) : $4$ tacos coûtent $f(4)=2\\times 4+3=11$ € ; et avec $11$ € on peut en prendre $4$ (l'antécédent de $11$).",
  },
  {
    id: "affine_fonction",
    emoji: "📈",
    titre: "Fonctions affines",
    domaine: "Fonctions et proportionnalité",
    essentiel:
      "Une **fonction affine** s'écrit $f(x)=ax+b$ ; sa représentation graphique est une **droite**. Le nombre $a$ est le **coefficient directeur** (la pente : de combien monte ou descend la droite quand $x$ augmente de $1$) et $b$ est l'**ordonnée à l'origine** (là où la droite coupe l'axe vertical, c'est-à-dire $f(0)$). Si $b=0$, la fonction est **linéaire** : $f(x)=ax$, elle passe par l'origine (proportionnalité).",
    formules: [
      { label: "Forme d'une fonction affine", latex: "$f(x)=ax+b$ ($a$ = coeff. directeur, $b$ = ordonnée à l'origine)" },
      { label: "Calculer une image", latex: "on remplace $x$ : $f(4)=2\\times 4+3=11$" },
      { label: "Coefficient directeur avec deux points", latex: "$a=\\dfrac{y_B-y_A}{x_B-x_A}$ (variation de $y$ $\\div$ variation de $x$)" },
      { label: "Ordonnée à l'origine", latex: "$b=f(0)$ (point où la droite coupe l'axe des ordonnées)" },
      { label: "Cas linéaire", latex: "$f(x)=ax$ (c'est $b=0$ : la droite passe par l'origine)" },
    ],
    reflexes: [
      { si: "on demande le « coefficient directeur »", alors: "c'est le nombre **devant** $x$, avec son signe (dans $-3x+2$, $a=-3$)" },
      { si: "on demande l'« ordonnée à l'origine »", alors: "c'est $b$, soit $f(0)$, là où la droite coupe l'axe vertical" },
      { si: "on connaît deux points de la droite", alors: "$a=\\dfrac{y_B-y_A}{x_B-x_A}$, puis $b=f(0)$" },
      { si: "un problème avec « prix fixe + prix par unité »", alors: "prix fixe $=b$, prix par unité $=a$ : $f(x)=ax+b$" },
    ],
    pieges: [
      "Inverser $a$ et $b$ : le coefficient directeur est **devant** $x$, l'ordonnée à l'origine est le nombre **seul** (dans $6x-2$, $a=6$ et $b=-2$).",
      "Oublier que $2x$ signifie $2\\times x$ : $f(3)=2\\times 3+5=11$, et **non** $2+3+5=10$.",
      "Oublier le signe du coefficient : dans $f(x)=-3x+5$, on garde le $-3$, donc $f(2)=-3\\times 2+5=-1$.",
    ],
    reel: "Un taxi à Saint-Pierre facture $5$ € de prise en charge puis $3$ € par km : $f(x)=3x+5$, donc $4$ km coûtent $3\\times 4+5=17$ €.",
  },
  {
    id: "triangle_figure",
    emoji: "🔺",
    titre: "Triangles",
    domaine: "Espace et géométrie",
    essentiel:
      "Un **triangle** se reconnaît à ses côtés et à ses angles : **équilatéral** (3 côtés égaux, 3 angles de $60^\\circ$), **isocèle** (au moins 2 côtés égaux, donc 2 angles égaux), **rectangle** (un angle de $90^\\circ$), sinon **quelconque**. Deux règles servent tout le temps : la **somme des angles** vaut toujours $180^\\circ$, et un triangle **existe** seulement si son plus grand côté est **strictement inférieur** à la somme des deux autres (**inégalité triangulaire**).",
    formules: [
      { label: "Somme des angles", latex: "$\\widehat{A}+\\widehat{B}+\\widehat{C}=180^\\circ$ (angle manquant $=180-$ les deux connus)" },
      { label: "Inégalité triangulaire (le triangle existe)", latex: "plus grand côté $<$ somme des deux autres (ex. $3+4=7$ : pas de triangle)" },
      { label: "Triangle rectangle : angles aigus", latex: "les deux angles aigus sont complémentaires : $\\widehat{B}=90-\\widehat{A}$" },
      { label: "Triangle isocèle : angles à la base", latex: "chaque angle à la base $=\\dfrac{180-\\text{angle au sommet}}{2}$" },
      { label: "Équilatéral", latex: "3 côtés égaux $\\Leftrightarrow$ 3 angles de $60^\\circ$" },
    ],
    reflexes: [
      { si: "deux angles connus, on cherche le troisième", alors: "$180 -$ la somme des deux ($180-A-B$)" },
      { si: "« peut-on construire ce triangle ? » (3 longueurs)", alors: "comparer le plus grand côté à la somme des deux autres" },
      { si: "triangle isocèle, angle au sommet donné", alors: "chaque angle à la base $=\\dfrac{180-\\text{sommet}}{2}$" },
      { si: "triangle rectangle, un angle aigu donné", alors: "l'autre aigu $=90-$ cet angle" },
    ],
    pieges: [
      "Écrire que la somme des angles fait $360^\\circ$ : c'est $180^\\circ$ pour un triangle ($360^\\circ$, c'est le tour complet ou le quadrilatère).",
      "Oublier que l'inégalité est STRICTE : avec $3$, $4$ et $7$ on a $3+4=7$, les points sont alignés, ce n'est PAS un triangle.",
      "Croire que deux côtés égaux rendent le triangle équilatéral : deux côtés égaux $=$ isocèle seulement ; il en faut trois pour équilatéral.",
    ],
    reel: "Tracer un parcours triangulaire dans une cour à Saint-Pierre : avant de planter les piquets, on vérifie l'inégalité triangulaire, sinon les trois longueurs se retrouvent alignées et il n'y a pas de triangle.",
  },
  {
    id: "pythagore_theoreme",
    emoji: "📐",
    titre: "Théorème de Pythagore",
    domaine: "Espace et géométrie",
    essentiel:
      "Dans un triangle **rectangle**, le carré de l'**hypoténuse** (le plus grand côté, opposé à l'angle droit) est égal à la **somme des carrés** des deux autres côtés. Le théorème sert à **calculer une longueur** manquante ; sa **réciproque** sert à **prouver qu'un triangle est rectangle** (ou non) à partir de ses trois longueurs.",
    formules: [
      { label: "Théorème (rectangle en $A$)", latex: "$BC^2 = AB^2 + AC^2$" },
      { label: "Chercher l'hypoténuse", latex: "$BC = \\sqrt{AB^2 + AC^2}$" },
      { label: "Chercher un côté de l'angle droit", latex: "$AB = \\sqrt{BC^2 - AC^2}$" },
      { label: "Réciproque", latex: "si $BC^2 = AB^2 + AC^2$ alors le triangle est rectangle en $A$" },
      { label: "Triplets à repérer (gain de temps)", latex: "$3,4,5$ — $6,8,10$ — $5,12,13$" },
    ],
    reflexes: [
      { si: "triangle rectangle + 2 longueurs connues", alors: "Pythagore pour trouver la 3ᵉ" },
      { si: "on cherche un côté de l'angle droit", alors: "on SOUSTRAIT : $BC^2 - AC^2$" },
      { si: "« ce triangle est-il rectangle ? » (3 longueurs)", alors: "réciproque : comparer le carré du plus grand côté avec la somme des deux autres carrés" },
      { si: "il faut rédiger", alors: "commencer par « Dans le triangle $ABC$ rectangle en $A$, d'après le théorème de Pythagore… »" },
    ],
    pieges: [
      "Se tromper d'hypoténuse : c'est TOUJOURS le plus grand côté, celui opposé à l'angle droit.",
      "Additionner au lieu de soustraire quand on cherche un côté de l'angle droit ($BC^2-AC^2$, pas $BC^2+AC^2$).",
      "Oublier la racine carrée : si $BC^2 = 25$ alors $BC = 5$, et non $25$.",
    ],
    reel: "Une échelle de $5$ m posée contre un mur à Saint-Pierre, le pied à $3$ m du mur, atteint $\\sqrt{5^2-3^2}=\\sqrt{16}=4$ m de haut.",
  },
  {
    id: "thales_theoreme",
    emoji: "📏",
    titre: "Théorème de Thalès",
    domaine: "Espace et géométrie",
    essentiel:
      "Le théorème de **Thalès** s'utilise dans une configuration où deux droites **parallèles** sont coupées par deux droites **sécantes** (le plus souvent un triangle $ABC$ avec $M$ sur $[AB]$, $N$ sur $[AC]$ et $(MN)\\,//\\,(BC)$). Il donne des **rapports de longueurs égaux** pour **calculer une longueur** manquante. Sa **réciproque** sert à **prouver que deux droites sont parallèles**.",
    formules: [
      { label: "Théorème (les 3 rapports égaux)", latex: "$\\dfrac{AM}{AB}=\\dfrac{AN}{AC}=\\dfrac{MN}{BC}$" },
      { label: "Calculer une longueur (produit en croix)", latex: "$\\dfrac{AM}{AB}=\\dfrac{AN}{AC}\\Rightarrow AC=\\dfrac{AB\\times AN}{AM}$" },
      { label: "Réciproque (prouver le parallélisme)", latex: "si $A,M,B$ et $A,N,C$ alignés dans le même ordre et $\\dfrac{AM}{AB}=\\dfrac{AN}{AC}$, alors $(MN)\\,//\\,(BC)$" },
      { label: "Rédiger avant de calculer", latex: "citer : points alignés $+$ $(MN)\\,//\\,(BC)$, PUIS écrire les rapports" },
    ],
    reflexes: [
      { si: "$(MN)\\,//\\,(BC)$ + 3 longueurs connues", alors: "écrire $\\dfrac{AM}{AB}=\\dfrac{AN}{AC}=\\dfrac{MN}{BC}$ puis produit en croix" },
      { si: "« prouver que $(MN)\\,//\\,(BC)$ »", alors: "réciproque : comparer $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$" },
      { si: "on utilise la réciproque", alors: "vérifier d'abord que les points sont alignés dans le même ordre" },
      { si: "une rédaction est demandée", alors: "citer alignements + parallélisme AVANT d'écrire les rapports" },
    ],
    pieges: [
      "Écrire les rapports dans le désordre : chaque côté va avec son correspondant ($AM$ avec $AB$, $AN$ avec $AC$), jamais $\\dfrac{AM}{AN}$.",
      "Sauter la justification (points alignés + droites parallèles) avant les calculs : c'est ce qui rapporte les points en rédaction.",
      "Appliquer la réciproque « parce que ça a l'air parallèle » sur le dessin : il faut comparer les rapports PAR LE CALCUL et vérifier l'ordre des points.",
    ],
    reel: "Mesurer la hauteur d'un arbre à Saint-Pierre sans grimper : un bâton de $1$ m donne une ombre de $2$ m, l'arbre une ombre de $12$ m ; les rayons du soleil étant parallèles, hauteur $=\\dfrac{12\\times 1}{2}=6$ m.",
  },
  {
    id: "trigo_trigonometrie",
    emoji: "🧭",
    titre: "Trigonométrie",
    domaine: "Espace et géométrie",
    essentiel:
      "Dans un triangle **rectangle**, on relie un **angle aigu** à deux de ses côtés grâce à trois rapports : le **cosinus**, le **sinus** et la **tangente** (moyen mnémotechnique **SOH-CAH-TOA**). Ça sert à **calculer une longueur** quand on connaît un angle, ou à **calculer un angle** quand on connaît deux côtés. On repère d'abord l'**hypoténuse** (face à l'angle droit), puis le côté **opposé** et le côté **adjacent** à l'angle étudié.",
    formules: [
      { label: "Cosinus (CAH)", latex: "$\\cos(\\theta)=\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$" },
      { label: "Sinus (SOH)", latex: "$\\sin(\\theta)=\\dfrac{\\text{opposé}}{\\text{hypoténuse}}$" },
      { label: "Tangente (TOA)", latex: "$\\tan(\\theta)=\\dfrac{\\text{opposé}}{\\text{adjacent}}$" },
      { label: "Chercher une longueur", latex: "opposé $=$ hypoténuse $\\times\\sin(\\theta)$ ; adjacent $=$ hypoténuse $\\times\\cos(\\theta)$" },
      { label: "Chercher un angle", latex: "$\\theta=\\cos^{-1}(\\dots)$, $\\sin^{-1}(\\dots)$ ou $\\tan^{-1}(\\dots)$ à la calculatrice" },
    ],
    reflexes: [
      { si: "on a (ou on cherche) **adjacent + hypoténuse**", alors: "cosinus (CAH)" },
      { si: "on a (ou on cherche) **opposé + hypoténuse**", alors: "sinus (SOH)" },
      { si: "on a (ou on cherche) **opposé + adjacent** (pas d'hypoténuse)", alors: "tangente (TOA)" },
      { si: "c'est l'**angle** qui est inconnu", alors: "la fonction inverse : $\\cos^{-1}$, $\\sin^{-1}$ ou $\\tan^{-1}$" },
    ],
    pieges: [
      "Calculatrice en **radians** : pour un angle en degrés, elle doit être en mode DEG, sinon le résultat est faux.",
      "Confondre opposé et adjacent : ils dépendent de l'angle choisi, alors que l'hypoténuse ne change jamais.",
      "Se tromper de sens : pour trouver l'hypoténuse on DIVISE (ex. hypoténuse $=\\dfrac{\\text{adjacent}}{\\cos(\\theta)}$), on ne multiplie pas.",
    ],
    reel: "Mesurer la hauteur d'un cocotier à Saint-Pierre sans grimper : à $20$ m du pied, on vise le sommet sous un angle de $30^\\circ$, donc hauteur $=20\\times\\tan(30^\\circ)\\approx 11{,}5$ m.",
  },
  {
    id: "sym_transformation",
    emoji: "🔄",
    titre: "Transformations (dont homothéties)",
    domaine: "Espace et géométrie",
    essentiel:
      "Quatre transformations gardent la figure **identique** (même taille) : la **translation** (glisser), la **rotation** (tourner autour d'un centre), la **symétrie axiale** (miroir) et la **symétrie centrale** (demi-tour). L'**homothétie** est la seule qui **agrandit ou réduit** : elle a un **centre** $O$ et un **rapport** $k$. Les longueurs sont multipliées par $k$, mais les **aires par $k^2$** et les **volumes par $k^3$**.",
    formules: [
      { label: "Rapport d'une homothétie", latex: "$k=\\dfrac{OA'}{OA}$ (distance image $\\div$ distance de départ)" },
      { label: "Longueur image (construire / calculer)", latex: "$OA'=k\\times OA$" },
      { label: "Effets d'une homothétie de rapport $k$", latex: "longueurs $\\times k$ · aires $\\times k^2$ · volumes $\\times k^3$" },
      { label: "Reconnaître une homothétie", latex: "$O$, $A$, $A'$ **alignés** ; $k>1$ agrandit, $0<k<1$ réduit" },
      { label: "Isométries (ne déforment pas)", latex: "translation, rotation, symétrie : longueurs et angles **inchangés**" },
    ],
    reflexes: [
      { si: "on connaît $OA$ et $OA'$, « quel est le rapport ? »", alors: "on DIVISE : $k=\\dfrac{OA'}{OA}$" },
      { si: "une figure est agrandie / réduite depuis un point", alors: "homothétie ; $O$, $A$ et $A'$ sont alignés" },
      { si: "aire ou volume après un rapport $k$", alors: "aire $\\times k^2$, volume $\\times k^3$ (jamais $\\times k$)" },
      { si: "translation, rotation ou symétrie", alors: "la figure garde ses longueurs et ses angles" },
    ],
    pieges: [
      "Pour le rapport on DIVISE, on n'additionne pas : avec $OA=3$ et $OA'=9$, $k=\\dfrac{9}{3}=3$, pas $9+3=12$.",
      "Multiplier l'aire par $k$ au lieu de $k^2$, ou le volume par $k$ au lieu de $k^3$ : rapport $2$ donne aire $\\times 4$ et volume $\\times 8$.",
      "Placer $A'$ à la bonne distance mais hors de la droite $(OA)$ : $O$, $A$ et $A'$ doivent être ALIGNÉS.",
    ],
    reel: "Agrandir un logo pour une banderole à Saint-Pierre : doubler les côtés (rapport $2$) rend le dessin $2$ fois plus large mais $2^2=4$ fois plus gourmand en encre.",
  },
  {
    id: "volume_geometrie_espace",
    emoji: "🧊",
    titre: "Géométrie dans l’espace",
    domaine: "Espace et géométrie",
    essentiel:
      "Un **solide** occupe l'espace : il a **trois dimensions**. On le **reconnaît** à ses faces et ses bases (cube, pavé, cylindre, cône, pyramide, boule), on l'imagine **coupé par un plan** — c'est la **section** — et on le dessine en **perspective cavalière**. Attention : le dessin **déforme** les faces, mais le solide reste ce qu'il est.",
    formules: [
      { label: "Cube (et pavé droit)", latex: "$6$ faces, $12$ arêtes, $8$ sommets" },
      { label: "Pyramide à base carrée", latex: "$5$ faces ($1$ carré $+\\,4$ triangles), $8$ arêtes, $5$ sommets" },
      { label: "Section parallèle à la base / à une face", latex: "même forme que la base (cube $\\to$ carré, cylindre $\\to$ disque, cône $\\to$ cercle)" },
      { label: "Section d'un cylindre par un plan contenant l'axe", latex: "un rectangle (hauteur $\\times$ diamètre)" },
      { label: "Perspective cavalière", latex: "arêtes cachées en pointillés ; parallélisme conservé ; fuyantes réduites" },
    ],
    reflexes: [
      { si: "« combien de faces / arêtes / sommets ? »", alors: "compter méthodiquement (haut $+$ bas $+$ verticales) ; cube et pavé $= 6$ / $12$ / $8$" },
      { si: "« on coupe par un plan parallèle à la base »", alors: "la section a la MÊME forme que la base (réduite pour pyramide et cône)" },
      { si: "on coupe un cylindre dans le sens de la hauteur (plan par l'axe)", alors: "la section est un rectangle" },
      { si: "sur un dessin, une face carrée ressemble à un parallélogramme", alors: "c'est la perspective qui déforme : le solide reste un cube" },
    ],
    pieges: [
      "Confondre le DESSIN et la RÉALITÉ : en perspective une face carrée est dessinée penchée (parallélogramme), mais elle reste un carré.",
      "Oublier les éléments cachés en comptant : un cube a toujours $6$ faces et $8$ sommets, même si on n'en voit que $3$ et $7$ sur le dessin.",
      "Croire qu'une section parallèle à la base d'une pyramide (ou d'un cône) est identique à la base : c'est la même forme, mais RÉDUITE.",
    ],
    reel: "Une boîte de conserve de letchis à Saint-Pierre (un cylindre) : la tranche posée à plat donne un **disque**, la coupe verticale par le milieu donne un **rectangle**.",
  },
  {
    id: "sections_solides",
    emoji: "✂️",
    titre: "Sections planes de solides",
    domaine: "Espace et géométrie",
    essentiel:
      "Une **section plane**, c'est la **figure plane** obtenue quand un **plan coupe** un solide. Sa forme dépend **du solide** ET de **la position du plan**. Quand la coupe est **parallèle à une face** (ou à la base), la section a la **même forme** que cette face (plus petite pour un cône ou une pyramide).",
    formules: [
      { label: "Cube / pavé droit, plan // à une face", latex: "section de même forme que la face : rectangle (un carré pour le cube)" },
      { label: "Cylindre", latex: "plan // base $\\rightarrow$ disque ; plan // axe $\\rightarrow$ rectangle" },
      { label: "Cône / pyramide, plan // à la base", latex: "réduction de la base : cône $\\rightarrow$ disque ; pyramide $\\rightarrow$ même polygone en plus petit" },
      { label: "Cône / pyramide, plan passant par le sommet", latex: "section $=$ triangle" },
      { label: "Longueur dans une section rectangulaire (Pythagore)", latex: "$d=\\sqrt{L^2+\\ell^2}$" },
    ],
    reflexes: [
      { si: "« coupe parallèle à une face / à la base »", alors: "même forme que cette face ou cette base (plus petite pour cône/pyramide)" },
      { si: "cylindre coupé « le long de l'axe » (verticalement)", alors: "penser rectangle, PAS disque" },
      { si: "on demande une longueur ou une diagonale dans la section", alors: "repérer un triangle rectangle et appliquer Pythagore" },
      { si: "cône ou pyramide coupé par un plan qui passe par le sommet", alors: "la section est un triangle" },
    ],
    pieges: [
      "Croire qu'une section de cylindre ou de cône est toujours un disque : ça dépend du plan. Le long de l'axe on obtient un rectangle (cylindre) ou un triangle (cône).",
      "Additionner les côtés pour trouver la diagonale : $6+8=14$ est FAUX. Il faut Pythagore : $\\sqrt{6^2+8^2}=\\sqrt{100}=10$ cm.",
      "Confondre la section (figure PLANE, en 2 dimensions) et le solide : la coupe donne une figure plane, jamais un volume.",
    ],
    reel: "Sur un chantier à Saint-Pierre, scier tout droit un tuyau cylindrique donne une tranche en forme de disque ; le scier dans la longueur donnerait un rectangle.",
  },
  {
    id: "aire_perimetre",
    emoji: "⭕",
    titre: "Périmètres",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Le **périmètre** est la longueur du **contour** d'une figure : on en fait le tour et on **additionne** toutes les longueurs du bord. C'est une **longueur** (en cm, m…), à ne jamais confondre avec l'**aire** qui mesure la surface (en $\\text{cm}^2$). Pour un cercle, ce tour a une formule spéciale : $2\\pi r$.",
    formules: [
      { label: "Rectangle et carré", latex: "$P_{\\text{rect}} = 2\\times(L+l)$ ; $P_{\\text{carré}} = 4\\times c$" },
      { label: "Longueur d'un cercle (rayon $r$, diamètre $d$)", latex: "$\\mathcal{L} = 2\\pi r = \\pi d$" },
      { label: "Arc d'un demi-cercle", latex: "$\\pi r$ (la moitié de $2\\pi r$)" },
      { label: "Valeur exacte / approchée", latex: "exacte : on garde $\\pi$ ($6\\pi$) ; approchée : $\\pi\\approx 3{,}14$" },
      { label: "Figure composée", latex: "additionner UNIQUEMENT les segments et arcs du contour extérieur" },
    ],
    reflexes: [
      { si: "« clôturer », « faire le tour », « longueur du bord »", alors: "c'est un **périmètre**, on additionne le contour" },
      { si: "un cercle avec le **rayon** $r$", alors: "$2\\pi r$ ; si on donne le **diamètre** $d$, alors $\\pi d$" },
      { si: "une figure composée (rectangle + demi-cercle…)", alors: "on suit le contour : segments visibles $+$ arc, jamais l'intérieur" },
      { si: "« valeur exacte »", alors: "on garde $\\pi$ dans le résultat ; « environ » → $\\pi\\approx 3{,}14$" },
    ],
    pieges: [
      "Confondre périmètre et aire : pour un rectangle $8\\times 5$, faire $8\\times 5=40$ donne l'**aire** ; le périmètre est $2\\times(8+5)=26$.",
      "Pour un cercle, utiliser $\\pi r^2$ (c'est l'aire du disque) ou mettre le **diamètre** dans $2\\pi r$ au lieu du rayon.",
      "Dans une figure composée, oublier de suivre seulement le **contour extérieur** (compter une longueur intérieure ou additionner des aires).",
    ],
    reel: "Un rond-point à La Réunion de diamètre $30$ m : un tour complet mesure $\\pi\\times 30 = 30\\pi \\approx 94{,}2$ m.",
  },
  {
    id: "aire_surface",
    emoji: "🟦",
    titre: "Aires",
    domaine: "Grandeurs et mesures",
    essentiel:
      "L'**aire** mesure la **surface** occupée par une figure ; le contour, lui, c'est le **périmètre** (à ne pas confondre). Une aire s'exprime toujours dans une **unité au carré** : $\\text{cm}^2$, $\\text{m}^2$… Pour une forme compliquée, on la **découpe** en figures simples dont on connaît la formule, puis on **ajoute** (ou on **retire**) les aires.",
    formules: [
      { label: "Rectangle et carré", latex: "$\\mathcal{A}_{\\text{rect}}=L\\times \\ell$ ; $\\mathcal{A}_{\\text{carré}}=c\\times c=c^2$" },
      { label: "Triangle (base $b$, hauteur associée $h$)", latex: "$\\mathcal{A}=\\dfrac{b\\times h}{2}$" },
      { label: "Disque de rayon $r$", latex: "$\\mathcal{A}=\\pi\\times r^2$ (si on donne le diamètre : $r=\\dfrac{d}{2}$)" },
      { label: "Figure composée", latex: "on additionne / soustrait les aires simples : $\\mathcal{A}=\\mathcal{A}_1+\\mathcal{A}_2-\\dots$" },
      { label: "Agrandissement / réduction de rapport $k$", latex: "les longueurs $\\times k$, mais l'aire $\\times k^2$" },
    ],
    reflexes: [
      { si: "un triangle avec base et hauteur", alors: "$\\dfrac{b\\times h}{2}$ — ne jamais oublier le $\\div 2$" },
      { si: "un disque / rond-point, on te donne le **diamètre**", alors: "d'abord $r=\\dfrac{d}{2}$, puis $\\pi r^2$" },
      { si: "une forme bizarre (jardin, terrain, L)", alors: "la découper en rectangle + triangle + disque, puis additionner" },
      { si: "une figure « agrandie / réduite de rapport $k$ »", alors: "l'aire est multipliée par $k^2$ (pas par $k$)" },
    ],
    pieges: [
      "Oublier de diviser par $2$ pour le triangle : $8\\times 5=40$ n'est PAS l'aire, il faut $8\\times 5\\div 2 = 20\\ \\text{cm}^2$.",
      "Mettre le diamètre à la place du rayon dans $\\pi r^2$ : si $d=10$, alors $r=5$, donc $\\mathcal{A}=25\\pi$ (et non $100\\pi$).",
      "Croire que doubler les longueurs double l'aire : avec $k=2$, l'aire est $\\times k^2 = 4$.",
    ],
    reel: "Le gazon d'un rond-point de rayon $5$ m à Saint-Pierre : $\\mathcal{A}=\\pi\\times 5^2 = 25\\pi \\approx 78{,}5\\ \\text{m}^2$ de pelouse à tondre.",
  },
  {
    id: "volume_solide",
    emoji: "📦",
    titre: "Volumes",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Le **volume** mesure la place qu'un solide occupe dans l'espace ; il s'exprime en **unités cubes** ($\\text{cm}^3$, $\\text{dm}^3$, $\\text{m}^3$). Pour un solide à section constante (**pavé, prisme, cylindre**), $V=\\text{aire de base}\\times\\text{hauteur}$ ; s'il se termine en **pointe** (**pyramide, cône**), on multiplie ce résultat par $\\dfrac{1}{3}$ ; la **boule** a sa propre formule.",
    formules: [
      { label: "Pavé, prisme droit, cylindre (base empilée sur $h$)", latex: "$V=\\text{aire de base}\\times h$ ; cylindre : $V=\\pi r^2 h$" },
      { label: "Pyramide et cône (pointe : penser au $\\times\\frac{1}{3}$)", latex: "$V=\\dfrac{1}{3}\\times\\text{aire de base}\\times h$" },
      { label: "Boule de rayon $r$", latex: "$V=\\dfrac{4}{3}\\pi r^3$" },
      { label: "Agrandissement / réduction de rapport $k$", latex: "aires $\\times k^2$, volumes $\\times k^3$" },
      { label: "Conversions", latex: "$1\\,\\text{L}=1\\,\\text{dm}^3$ ; $1\\,\\text{dm}^3=1000\\,\\text{cm}^3$ ; $1\\,\\text{m}^3=1000\\,\\text{L}$" },
    ],
    reflexes: [
      { si: "pavé, prisme ou cylindre (même section sur toute la hauteur)", alors: "$V=\\text{aire de base}\\times h$ (cylindre : $\\pi r^2\\times h$)" },
      { si: "pyramide ou cône (le solide se termine en pointe)", alors: "même calcul, mais $\\times\\dfrac{1}{3}$" },
      { si: "l'énoncé donne le diamètre", alors: "prendre la moitié : $r=d\\div 2$ avant de calculer" },
      { si: "agrandissement / réduction de rapport $k$", alors: "le volume est $\\times k^3$ (jamais $\\times k$)" },
    ],
    pieges: [
      "Oublier le $\\dfrac{1}{3}$ pour une pyramide ou un cône : leur volume vaut le tiers du prisme ou cylindre de même base et même hauteur.",
      "Utiliser le diamètre au lieu du rayon dans $\\pi r^2 h$ ou $\\dfrac{4}{3}\\pi r^3$ : la formule prend toujours le rayon.",
      "Lors d'un agrandissement de rapport $k$, multiplier le volume par $k$ au lieu de $k^3$ (rapport $2\\Rightarrow$ volume $\\times 8$).",
    ],
    reel: "Une cuve d'eau cylindrique de rayon $1$ m et de hauteur $2$ m contient $\\pi\\times 1^2\\times 2 = 2\\pi \\approx 6{,}28$ m³, soit environ $6\\,280$ litres (car $1$ m³ $=1000$ L).",
  },
  {
    id: "stat_statistique",
    emoji: "📉",
    titre: "Statistiques",
    domaine: "Statistiques et probabilités",
    essentiel:
      "Une série de données se résume avec des **indicateurs**. La **moyenne** et la **médiane** donnent une valeur « centrale » de la série ; l'**étendue** mesure la **dispersion** (l'écart entre les extrêmes). La **fréquence** dit quelle **part** représente une catégorie : $f=\\dfrac{\\text{effectif}}{\\text{effectif total}}$.",
    formules: [
      { label: "Moyenne", latex: "$m=\\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs}}$ (ex. $\\dfrac{8+10+12}{3}=10$)" },
      { label: "Médiane (série RANGÉE)", latex: "nombre impair $\\to$ valeur centrale ; nombre pair $\\to$ moyenne des deux valeurs du milieu" },
      { label: "Étendue", latex: "$\\text{étendue}=\\text{max}-\\text{min}$ (ex. $15-4=11$)" },
      { label: "Fréquence (et pourcentage)", latex: "$f=\\dfrac{\\text{effectif}}{\\text{effectif total}}$ puis $\\times 100$ (ex. $\\dfrac{10}{25}=0{,}4=40\\,\\%$)" },
      { label: "Valeur manquante", latex: "somme totale $=$ moyenne $\\times$ nombre de valeurs" },
    ],
    reflexes: [
      { si: "« quelle part ? », « quel pourcentage ? »", alors: "fréquence : effectif $\\div$ effectif total, puis $\\times 100$ pour le $\\%$" },
      { si: "on demande la **médiane**", alors: "RANGER la série d'abord, puis prendre la valeur centrale (nombre pair $\\to$ moyenne des deux du milieu)" },
      { si: "moyenne connue + une valeur manquante $x$", alors: "somme $=$ moyenne $\\times$ nombre, puis on enlève les valeurs connues" },
      { si: "« valeur typique » avec une valeur extrême (salaires…)", alors: "préférer la **médiane** : la moyenne est tirée par les extrêmes" },
    ],
    pieges: [
      "Oublier de RANGER la série avant la médiane : dans $12\\,;\\,4\\,;\\,9\\,;\\,7\\,;\\,15$, ce n'est $9$ qu'une fois rangée en $4\\,;\\,7\\,;\\,9\\,;\\,12\\,;\\,15$.",
      "Confondre effectif et fréquence : $12$ élèves n'est PAS une fréquence ; la fréquence, c'est $12\\div\\text{effectif total}$.",
      "Additionner pour l'étendue au lieu de soustraire ($\\text{max}-\\text{min}$) ; et pour un effectif pair, la médiane est la moyenne des DEUX valeurs centrales.",
    ],
    reel: "Températures relevées à Saint-Pierre sur la semaine : la plus chaude $31$ °C, la plus froide $22$ °C. L'étendue vaut $31-22=9$ °C : c'est l'écart de la semaine.",
  },
  {
    id: "proba_experience",
    emoji: "🎲",
    titre: "Probabilités",
    domaine: "Statistiques et probabilités",
    essentiel:
      "La **probabilité** d'un événement mesure sa chance de se produire : c'est un nombre entre $0$ (événement **impossible**) et $1$ (événement **certain**). En situation d'**équiprobabilité** (toutes les issues ont la même chance), on compte : $P=\\dfrac{\\text{cas favorables}}{\\text{cas possibles}}$. Pour une expérience à **deux épreuves**, on liste toutes les issues avec un **arbre** ou un **tableau**.",
    formules: [
      { label: "Probabilité (équiprobabilité)", latex: "$P(A)=\\dfrac{\\text{cas favorables}}{\\text{cas possibles}}$" },
      { label: "Une probabilité est toujours…", latex: "$0\\le P(A)\\le 1$ (impossible $=0$, certain $=1$)" },
      { label: "Événement contraire", latex: "$P(\\overline{A})=1-P(A)$, et $P(A)+P(\\overline{A})=1$" },
      { label: "Deux épreuves : nombre d'issues", latex: "issues$_1\\times$ issues$_2$ (menu : $3$ entrées $\\times 2$ plats $=6$)" },
      { label: "Lancer une pièce deux fois", latex: "$4$ issues : PP, PF, FP, FF" },
    ],
    reflexes: [
      { si: "« quelle est la probabilité de… » (dé, billes, roue équilibrés)", alors: "compter : $\\dfrac{\\text{favorables}}{\\text{total}}$" },
      { si: "« ne pas… », ou on connaît déjà $P(A)$", alors: "événement contraire : $P(\\overline{A})=1-P(A)$" },
      { si: "deux lancers, deux tirages, un menu (entrée + plat)", alors: "arbre ou tableau, on MULTIPLIE le nombre d'issues" },
      { si: "on demande la probabilité « simplifiée »", alors: "réduire la fraction (ex. $\\dfrac{3}{6}=\\dfrac{1}{2}$)" },
    ],
    pieges: [
      "Se tromper de dénominateur : c'est le nombre TOTAL d'issues. Avec $3$ rouges et $5$ bleues, $P(\\text{rouge})=\\dfrac{3}{8}$, pas $\\dfrac{3}{5}$.",
      "Donner une probabilité $>1$ ou négative : elle est TOUJOURS entre $0$ et $1$.",
      "Oublier l'ordre à deux épreuves : PF et FP sont deux issues différentes, il y en a $4$ (pas $3$).",
    ],
    reel: "À la tombola de la kermesse à Saint-Pierre : si $20$ billets sur $200$ sont gagnants, ta chance de gagner est $\\dfrac{20}{200}=\\dfrac{1}{10}$.",
  },
  {
    id: "algo_programmation",
    emoji: "🐍",
    titre: "Algorithmique et programmation",
    domaine: "Algorithmique et programmation",
    essentiel:
      "Un **programme** exécute des instructions **dans l'ordre**. Une **variable** garde une valeur (score, compteur), une **boucle** répète des actions, une **condition** « si… alors… sinon » choisit quoi faire. **Généraliser**, c'est remplacer le nombre choisi par une **variable $x$** et traduire chaque étape en une **expression** — en respectant l'ordre des opérations.",
    formules: [
      { label: "Variable : « mettre à » n'est pas « ajouter »", latex: "« mettre score à $5$ » $\\Rightarrow$ score $=5$ ; « ajouter $5$ » $\\Rightarrow$ score $=$ score $+\\,5$" },
      { label: "Boucle « répéter $n$ fois : ajouter $r$ »", latex: "valeur finale $=$ départ $+\\,n\\times r$" },
      { label: "Condition « si … alors … sinon »", latex: "test **vrai** $\\to$ bloc « alors » ; test **faux** $\\to$ bloc « sinon »" },
      { label: "Traduire un programme de calcul", latex: "$\\times a$ puis $+b \\Rightarrow ax+b$ ; $+b$ puis $\\times a \\Rightarrow a(x+b)$" },
      { label: "Comparaisons dans une condition", latex: "« ET » : les deux vraies ; $>$ exclut la borne, $\\ge$ l'inclut" },
    ],
    reflexes: [
      { si: "« on répète $n$ fois : ajouter $r$ » à partir d'un départ", alors: "valeur finale $=$ départ $+\\,n\\times r$" },
      { si: "on ajoute PUIS on multiplie", alors: "il faut des parenthèses : $a(x+b)$" },
      { si: "« le résultat affiché est $\\dots$, quel nombre a-t-on choisi ? »", alors: "résoudre l'équation $ax+b=\\text{résultat}$" },
      { si: "le bloc dit « mettre … à »", alors: "l'ancienne valeur est effacée, pas additionnée" },
    ],
    pieges: [
      "Confondre « mettre à » (remplace la valeur) et « ajouter » (cumule) : après « mettre score à $5$ », score vaut $5$, peu importe avant.",
      "Oublier les parenthèses : ajouter $b$ PUIS multiplier par $a$ donne $a(x+b)$, pas $ax+b$.",
      "Confondre $>$ (strict, exclut la borne) et $\\ge$ (inclut) : « score $>10$ » refuse la valeur $10$.",
    ],
    reel: "Une carte de fidélité au supermarché de Saint-Pierre : à chaque passage on ajoute des points (boucle), et si le total dépasse un seuil on gagne un bon (condition). Départ $0$, $+2$ points sur $5$ passages : $0+5\\times 2=10$ points.",
  },
];

const BANQUES: Record<string, TutorBankItemV4[]> = {
  fraction_rationnel: nombresRationnelsBank,
  entier_puissance: puissancesBank,
  entier_racine_carree: racineCarreeBank,
  entier_arithmetique: arithmetiqueBank,
  litteral_calcul: calculLitteralBank,
  equation_resolution: equationsBank,
  prop_proportionnalite: proportionnaliteBank,
  fonction_generalite: fonctionsBank,
  affine_fonction: affineBank,
  triangle_figure: trianglesBank,
  pythagore_theoreme: pythagore3eBank,
  thales_theoreme: thalesBank,
  trigo_trigonometrie: trigonometrieBank,
  sym_transformation: transformationsBank,
  volume_geometrie_espace: geometrieEspaceBank,
  sections_solides: sectionsSolidesBank,
  aire_perimetre: perimetresBank,
  aire_surface: airesBank,
  volume_solide: volumesBank,
  stat_statistique: statistiquesBank,
  proba_experience: probabilitesBank,
  algo_programmation: algorithmiqueBank,
};

export const KIT_MATHS_TROISIEME: KitData = {
  slug: "maths-troisieme",
  titre: "Guide de survie · Maths 3e",
  baseline:
    "Les 22 chapitres du programme de 3e en 22 fiches : les formules qui sauvent, les réflexes, les pièges qui coûtent des points au brevet — et un test corrigé par chapitre. À imprimer, à glisser dans le classeur.",
  matiere: "maths",
  classeLabel: "Troisième · brevet",
  coachClasse: "3e",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
