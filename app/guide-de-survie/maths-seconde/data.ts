// ─── Guide de survie · Maths Seconde ────────────────────────────────────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/maths/seconde/notions.ts
// - checklists     = micro-compétences de microSkills.ts (BO 2019)
// - test de survie = items "fixed" puisés dans les banques du coach
// Condensés écrits par 22 agents parallèles (workflow du 26/07) puis VÉRIFIÉS
// à la main contre le BO 2019 et les banques (exactitude, périmètre seconde,
// couverture des micros) — patch appliqué : échantillonnage allégé (1/√n en
// simple repère, réflexe [m−2s;m+2s] retiré, frontière de programme).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/seconde/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { reelsIntervallesBank } from "@/lib/tutor-v4/questionBank/seconde/maths/reels-intervalles.bank";
import { arithmetiqueEntiersBank } from "@/lib/tutor-v4/questionBank/seconde/maths/arithmetique-entiers.bank";
import { puissancesBank } from "@/lib/tutor-v4/questionBank/seconde/maths/puissances.bank";
import { racineCarreeBank } from "@/lib/tutor-v4/questionBank/seconde/maths/racine-carree.bank";
import { developpementFactorisationBank } from "@/lib/tutor-v4/questionBank/seconde/maths/developpement-factorisation.bank";
import { identitesRemarquablesBank } from "@/lib/tutor-v4/questionBank/seconde/maths/identites-remarquables.bank";
import { expressionsLitteralesBank } from "@/lib/tutor-v4/questionBank/seconde/maths/expressions-litterales.bank";
import { equationsInequationsBank } from "@/lib/tutor-v4/questionBank/seconde/maths/equations-inequations.bank";
import { vecteursPlanBank } from "@/lib/tutor-v4/questionBank/seconde/maths/vecteurs-plan.bank";
import { repereCoordonneesBank } from "@/lib/tutor-v4/questionBank/seconde/maths/repere-coordonnees.bank";
import { droitesPlanBank } from "@/lib/tutor-v4/questionBank/seconde/maths/droites-plan.bank";
import { geometrieProblemesPlanBank } from "@/lib/tutor-v4/questionBank/seconde/maths/geometrie-problemes-plan.bank";
import { fonctionVocabulaireBank } from "@/lib/tutor-v4/questionBank/seconde/maths/fonction-vocabulaire.bank";
import { fonctionVariationsBank } from "@/lib/tutor-v4/questionBank/seconde/maths/fonction-variations.bank";
import { fonctionsAffinesBank } from "@/lib/tutor-v4/questionBank/seconde/maths/fonctions-affines.bank";
import { fonctionsReferenceBank } from "@/lib/tutor-v4/questionBank/seconde/maths/fonctions-reference.bank";
import { informationChiffreeBank } from "@/lib/tutor-v4/questionBank/seconde/maths/information-chiffree.bank";
import { statistiquesDescriptivesBank } from "@/lib/tutor-v4/questionBank/seconde/maths/statistiques-descriptives.bank";
import { probabilitesBank } from "@/lib/tutor-v4/questionBank/seconde/maths/probabilites.bank";
import { echantillonnageBank } from "@/lib/tutor-v4/questionBank/seconde/maths/echantillonnage.bank";
import { algorithmiquePythonBank } from "@/lib/tutor-v4/questionBank/seconde/maths/algorithmique-python.bank";
import { logiqueEnsemblesBank } from "@/lib/tutor-v4/questionBank/seconde/maths/logique-ensembles.bank";
import type { KitData, KitNotion } from "@/components/kit/types";

// Checklists + tests dérivés du coach (module partagé par tous les guides).
const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  {
    id: "reels_intervalles",
    emoji: "📏",
    titre: "Nombres réels et intervalles",
    domaine: "Nombres et calculs",
    essentiel:
      "Tous les nombres vivent sur la même **droite graduée** — chaque réel est un point — et les ensembles s'emboîtent comme des poupées russes : $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{D}\\subset\\mathbb{Q}\\subset\\mathbb{R}$. Un **intervalle** décrit d'un seul coup tous les réels entre deux bornes : le sens du **crochet** dit si la borne est prise ou exclue. Et la **valeur absolue** $|x-a|$, c'est simplement la **distance** entre $x$ et $a$.",
    formules: [
      { label: "Ensembles emboîtés", latex: "$\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{D}\\subset\\mathbb{Q}\\subset\\mathbb{R}$ (naturels, relatifs, décimaux, rationnels, réels)" },
      { label: "Inégalité → intervalle", latex: "$a\\le x\\le b\\iff x\\in[a\\,;b]$ — large ($\\le$) : crochet fermé ; stricte ($<$) : ouvert" },
      { label: "Bornes infinies", latex: "$x\\ge a\\iff x\\in[a\\,;+\\infty[$ — vers $\\pm\\infty$, crochet TOUJOURS ouvert" },
      { label: "Valeur absolue", latex: "$|x|$ = distance de $x$ à $0$ ; $|x-a|$ = distance entre $x$ et $a$" },
      { label: "Distance au plus $r$", latex: "$|x-a|\\le r\\iff x\\in[a-r\\,;a+r]$" },
      { label: "Encadrer une racine", latex: "$1{,}4^2=1{,}96<2<2{,}25=1{,}5^2$ donc $1{,}4<\\sqrt{2}<1{,}5$" },
    ],
    reflexes: [
      { si: "« le plus petit ensemble auquel appartient… ? »", alors: "simplifier D'ABORD ($\\frac{6}{2}=3\\in\\mathbb{N}$), puis tester du plus petit au plus grand" },
      { si: "traduire $x\\ge 2$ ou $-1<x\\le 3$ en intervalle", alors: "chaque borne suit SON inégalité : $[2\\,;+\\infty[$ et $]-1\\,;3]$" },
      { si: "« $x$ appartient-il à $[a\\,;b[$ ? »", alors: "vérifier $a\\le x<b$ ($a$ pris, $b$ exclu)" },
      { si: "$|x-a|\\le r$", alors: "lire « à distance au plus $r$ de $a$ » : intervalle $[a-r\\,;a+r]$" },
    ],
    pieges: [
      "Croire que $\\frac{1}{3}$ est décimal : $0{,}333\\dots$ ne s'arrête jamais — $\\frac{1}{3}\\in\\mathbb{Q}$ mais $\\frac{1}{3}\\notin\\mathbb{D}$.",
      "Écrire $5\\in[-2\\,;5[$ : le crochet ouvert EXCLUT sa borne ($-2$ est pris, $5$ non) — et $[2\\,;+\\infty]$ n'existe pas.",
      "Oublier la solution négative de $|x|=5$ : deux nombres sont à distance $5$ de $0$, donc $x=5$ OU $x=-5$.",
    ],
    reel: "Le bulletin météo « houle de 2 à 3 m » sur les plages de l'Ouest : un intervalle, $[2\\,;3]$ — tu en lis tous les jours sans le savoir.",
  },
  {
    id: "arithmetique_entiers",
    emoji: "🔢",
    titre: "Multiples, diviseurs et nombres premiers",
    domaine: "Nombres et calculs",
    essentiel:
      "Tout le chapitre tient dans une égalité : $b = a \\times k$ avec $k$ entier — alors $b$ est un **multiple** de $a$, et $a$ un **diviseur** de $b$ : la même information, lue dans les deux sens. Un **nombre premier** a exactement **deux diviseurs**, $1$ et lui-même. De là découlent les critères de divisibilité, les fractions irréductibles et les partages « sans reste ».",
    formules: [
      { label: "Multiple et diviseur", latex: "$b=a\\times k$ ($k$ entier) : $b$ est un multiple de $a$, et $a$ un diviseur de $b$" },
      { label: "Pair / impair", latex: "pair : $n=2k$ ; impair : $n=2k+1$" },
      { label: "Critères de divisibilité", latex: "par $2$ : finit par $0,2,4,6,8$ ; par $5$ : finit par $0$ ou $5$ ; par $3$ (ou $9$) : somme des chiffres divisible par $3$ (ou $9$)" },
      { label: "Nombre premier", latex: "exactement deux diviseurs, $1$ et lui-même : $2,\\ 3,\\ 5,\\ 7,\\ 11,\\ 13,\\dots$" },
      { label: "Test de primalité", latex: "tester les diviseurs premiers jusqu'à $\\sqrt{n}$ : pour $97$, $\\sqrt{97}\\approx 9{,}8$ → tester $2, 3, 5, 7$ suffit" },
      { label: "Fraction irréductible", latex: "$\\dfrac{a}{b}$ irréductible ⟺ $a$ et $b$ premiers entre eux (seul diviseur commun : $1$)" },
    ],
    reflexes: [
      { si: "« répartir en parts égales, sans reste »", alors: "possible ⟺ le total est un multiple de la taille des parts (sinon, le reste dit ce qui dépasse)" },
      { si: "« $n$ est-il premier ? »", alors: "tester les diviseurs premiers $2, 3, 5, 7,\\dots$ jusqu'à $\\sqrt{n}$ seulement" },
      { si: "« rendre la fraction irréductible »", alors: "diviser le haut ET le bas par un diviseur commun, et recommencer tant que c'est possible" },
      { si: "« montrer que c'est un multiple de $7$ »", alors: "factoriser : $7a+7b=7(a+b)$" },
    ],
    pieges: [
      "Croire que $1$ est premier : il n'a qu'UN diviseur, or il en faut exactement deux — et à l'inverse, oublier que $2$ est premier (le seul pair).",
      "Déclarer un nombre premier sans tester : $51$ a l'air premier, mais $5+1=6$ donc $51=3\\times 17$. Même piège avec $91=7\\times 13$.",
      "S'arrêter en route : $\\dfrac{24}{36}=\\dfrac{6}{9}$ n'est pas fini, il reste un diviseur commun ($3$) — la forme irréductible est $\\dfrac{2}{3}$.",
    ],
    reel: "Le cadenas de ton paiement en ligne : multiplier deux nombres premiers géants est facile, retrouver lesquels à partir du produit est quasi impossible.",
  },
  {
    id: "puissances_2de",
    emoji: "⚡",
    titre: "Puissances",
    domaine: "Nombres et calculs",
    essentiel:
      "Une puissance est un **produit répété** : $a^n$, c'est $n$ facteurs égaux à $a$ — jamais $a\\times n$. Trois règles font tout le chapitre : produit de même base → on **additionne** les exposants, quotient → on **soustrait**, puissance de puissance → on **multiplie**. Et l'exposant négatif donne l'**inverse** : $a^{-n}=\\dfrac{1}{a^n}$.",
    formules: [
      { label: "Définition", latex: "$a^n=a\\times a\\times\\dots\\times a$ ($n$ facteurs) ; $a^1=a$ ; $a^0=1$ (si $a\\neq 0$)" },
      { label: "Produit (même base)", latex: "$a^m\\times a^n=a^{m+n}$ (on additionne)" },
      { label: "Quotient (même base)", latex: "$\\dfrac{a^m}{a^n}=a^{m-n}$ (on soustrait ; $a\\neq 0$)" },
      { label: "Puissance de puissance", latex: "$(a^m)^n=a^{m\\times n}$ (on multiplie)" },
      { label: "Exposant négatif", latex: "$a^{-n}=\\dfrac{1}{a^n}$ ; en particulier $a^{-1}=\\dfrac{1}{a}$ (l'inverse)" },
      { label: "Base négative", latex: "exposant pair → résultat positif, impair → négatif : $(-2)^2=4$ mais $(-2)^3=-8$" },
    ],
    reflexes: [
      { si: "produit ou quotient de puissances de même base", alors: "× → additionner les exposants, ÷ → les soustraire (et $a$ seul se lit $a^1$)" },
      { si: "puissance de puissance $(a^m)^n$", alors: "multiplier les exposants — le bloc $a^m$ est répété $n$ fois" },
      { si: "exposant négatif", alors: "passer à l'inverse : $2^{-3}=\\dfrac{1}{8}$, un nombre positif" },
      { si: "puissance de 10", alors: "$10^n$ = 1 suivi de $n$ zéros ; $10^{-n}$ = $n$ rangs après la virgule ($10^{-2}=0{,}01$)" },
    ],
    pieges: [
      "Confondre $(a^2)^3=a^6$ (on multiplie) et $a^2\\times a^3=a^5$ (on additionne) : deux règles, deux résultats.",
      "Croire qu'un exposant négatif rend le nombre négatif : $2^{-3}=\\dfrac{1}{8}$, pas $-8$ — l'inverse, jamais l'opposé.",
      "Calculer $a^n$ comme $a\\times n$ : $2^3=8$, pas $6$ — l'exposant compte des facteurs, pas un multiplicateur.",
    ],
    reel: "Ton forfait mobile compte en puissances de 10 : 1 Go $=10^9$ octets, un 1 suivi de neuf zéros.",
  },
  {
    id: "racine_carree_2de",
    emoji: "🌱",
    titre: "Racine carrée",
    domaine: "Nombres et calculs",
    essentiel:
      "$\\sqrt{a}$ est **le nombre positif dont le carré vaut $a$** : $\\sqrt{49}=7$ car $7^2=49$. Une racine carrée n'est **jamais négative** — et un nombre négatif n'a pas de racine carrée. La règle d'or : la racine se distribue sur les **produits** ($\\sqrt{ab}=\\sqrt{a}\\,\\sqrt{b}$), jamais sur les sommes — c'est elle qui simplifie $\\sqrt{50}$ en $5\\sqrt{2}$.",
    formules: [
      { label: "Définition", latex: "$\\sqrt{a}$ : le nombre positif dont le carré vaut $a$ (ex. $\\sqrt{49}=7$)" },
      { label: "Carré et racine", latex: "$(\\sqrt{a})^2=a$ (si $a\\geqslant 0$) ; $\\sqrt{a^2}=|a|$ (pour tout réel $a$)" },
      { label: "Produit", latex: "$\\sqrt{ab}=\\sqrt{a}\\times\\sqrt{b}$ (si $a\\geqslant 0$ et $b\\geqslant 0$)" },
      { label: "Simplification", latex: "$\\sqrt{k^2\\,b}=k\\sqrt{b}$ — ex. $\\sqrt{50}=\\sqrt{25\\times 2}=5\\sqrt{2}$" },
      { label: "Encadrement", latex: "$k^2<n<(k+1)^2 \\Rightarrow k<\\sqrt{n}<k+1$" },
      { label: "Carrés parfaits", latex: "$4,\\ 9,\\ 16,\\ 25,\\ 36,\\ 49,\\ 64,\\ 81,\\ 100$ — à repérer sous la racine" },
    ],
    reflexes: [
      { si: "« simplifier $\\sqrt{75}$ »", alors: "extraire le plus grand carré parfait : $\\sqrt{25\\times 3}=5\\sqrt{3}$" },
      { si: "somme de racines ($\\sqrt{18}+\\sqrt{2}$)", alors: "simplifier d'abord, puis regrouper : $3\\sqrt{2}+\\sqrt{2}=4\\sqrt{2}$" },
      { si: "« entre quels entiers se trouve $\\sqrt{30}$ ? »", alors: "encadrer par deux carrés parfaits : $25<30<36$ donc $5<\\sqrt{30}<6$" },
      { si: "$\\sqrt{a^2}$ avec $a$ de signe inconnu", alors: "réponse $|a|$ — jamais $a$ tout seul" },
    ],
    pieges: [
      "Écrire $\\sqrt{a+b}=\\sqrt{a}+\\sqrt{b}$ : FAUX — $\\sqrt{4+4}=\\sqrt{8}\\approx 2{,}83$, alors que $\\sqrt{4}+\\sqrt{4}=4$. Le produit oui, la somme jamais.",
      "Écrire $\\sqrt{a^2}=a$ : pour $a=-3$, $\\sqrt{(-3)^2}=\\sqrt{9}=3$, pas $-3$ — la bonne formule est $\\sqrt{a^2}=|a|$.",
      "Chercher $\\sqrt{-4}$ : aucun carré n'est négatif, donc un nombre négatif n'a pas de racine carrée.",
    ],
    reel: "La feuille A4 de cette fiche : son grand côté vaut $\\sqrt{2}$ fois le petit — pliée en deux, elle garde exactement ses proportions.",
  },
  {
    id: "developpement_factorisation_2de",
    emoji: "↔️",
    titre: "Développement et factorisation",
    domaine: "Nombres et calculs",
    essentiel:
      "Une même expression a deux visages : **développée** (une somme de termes) et **factorisée** (un produit de facteurs). Développer, c'est **distribuer** ; factoriser, c'est repérer un **facteur commun** ou une **identité remarquable**. Le point stratégique du chapitre : **choisir la forme** qui rend la question facile — factorisée pour résoudre, développée pour calculer et réduire.",
    formules: [
      { label: "Distributivité", latex: "$k(a+b)=ka+kb$" },
      { label: "Double distributivité", latex: "$(a+b)(c+d)=ac+ad+bc+bd$" },
      { label: "Facteur commun", latex: "$ka+kb=k(a+b)$" },
      { label: "Carrés (identités)", latex: "$(a+b)^2=a^2+2ab+b^2$ ; $(a-b)^2=a^2-2ab+b^2$" },
      { label: "Différence de carrés", latex: "$a^2-b^2=(a-b)(a+b)$" },
      { label: "Produit nul", latex: "$A\\times B=0\\iff A=0$ ou $B=0$" },
    ],
    reflexes: [
      { si: "« développe et réduis »", alors: "distribuer chaque terme, puis regrouper les termes semblables" },
      { si: "« factorise »", alors: "facteur commun d'abord ; sinon, chercher une identité remarquable" },
      { si: "la même parenthèse apparaît deux fois", alors: "c'est le facteur commun — la mettre en évidence comme un simple nombre" },
      { si: "résoudre $(x-2)(x+5)=0$", alors: "produit nul : $x-2=0$ ou $x+5=0$ — surtout ne pas développer" },
    ],
    pieges: [
      "Distribuer un facteur négatif à moitié : $-2(x-3)=-2x+6$, jamais $-2x-6$ — le signe « moins » s'applique aux DEUX termes.",
      "Écrire $(a+b)^2=a^2+b^2$ : FAUX, il manque le double produit — $(x+3)^2=x^2+6x+9$, pas $x^2+9$.",
      "Oublier le $1$ en factorisant : $4x^2-2x=2x(2x-1)$, pas $2x\\cdot 2x$ — un terme sorti en entier laisse un $1$ dans la parenthèse.",
    ],
    reel: "Calculer $98\\times 102$ de tête au marché forain : $(100-2)(100+2)=10\\,000-4=9\\,996$ — la différence de carrés va plus vite que le téléphone.",
  },
  {
    id: "identites_remarquables_2de",
    emoji: "🧩",
    titre: "Identités remarquables",
    domaine: "Nombres et calculs",
    essentiel:
      "Trois égalités **vraies pour tous les nombres**, à lire dans les deux sens : de gauche à droite on **développe**, de droite à gauche on **factorise**. La signature à repérer : le **double produit** $2ab$ entre les deux carrés. Bien en main, elles rendent le calcul mental rapide : $101^2=(100+1)^2=10\\,201$.",
    formules: [
      { label: "Carré d'une somme", latex: "$(a+b)^2=a^2+2ab+b^2$" },
      { label: "Carré d'une différence", latex: "$(a-b)^2=a^2-2ab+b^2$" },
      { label: "Différence de deux carrés", latex: "$a^2-b^2=(a-b)(a+b)$" },
      { label: "Avec un coefficient", latex: "$(2x+3)^2=(2x)^2+2\\times 2x\\times 3+3^2=4x^2+12x+9$" },
      { label: "Avec des racines", latex: "$(\\sqrt a)^2=a$ : $(\\sqrt3+1)^2=3+2\\sqrt3+1=4+2\\sqrt3$" },
    ],
    reflexes: [
      { si: "« développe $(x+5)^2$ »", alors: "trois termes : $x^2+10x+25$ — jamais deux" },
      { si: "factoriser $x^2-49$ ou $4x^2-9$ (deux carrés, un moins)", alors: "différence de carrés : $(x-7)(x+7)$, $(2x-3)(2x+3)$" },
      { si: "factoriser $x^2+8x+16$ (trois termes)", alors: "carré parfait : vérifier $16=4^2$ ET $8x=2\\times 4\\times x$ → $(x+4)^2$" },
      { si: "$101^2$, $99^2$ ou $51\\times 49$ de tête", alors: "décomposer : $(100+1)^2$, $(100-1)^2$, $(50+1)(50-1)=2500-1$" },
    ],
    pieges: [
      "Écrire $(a+b)^2=a^2+b^2$ : FAUX, le double produit manque. Test : $(1+2)^2=9$ mais $1^2+2^2=5$.",
      "Croire que le carré d'une différence finit par un moins : $(x-3)^2=x^2-6x+9$ — le dernier terme est $+9$, jamais $-9$.",
      "Oublier de mettre TOUT le terme au carré : $(2x)^2=4x^2$, pas $2x^2$.",
    ],
    reel: "Agrandir de $b$ mètres un carré de jardin de côté $a$ : la surface gagnée n'est pas $b^2$ mais $2ab+b^2$ — c'est le dessin même de $(a+b)^2$.",
  },
  {
    id: "expressions_litterales_2de",
    emoji: "🔤",
    titre: "Expressions littérales",
    domaine: "Nombres et calculs",
    essentiel:
      "Une lettre représente **n'importe quel nombre** : une expression littérale, c'est un calcul écrit **une fois pour toutes les valeurs**. Trois gestes font le chapitre : **traduire** une situation en expression, **réduire puis substituer**, et **isoler une variable** dans une formule ($U=RI$, $d=vt$…) avec les opérations inverses.",
    formules: [
      { label: "Écrire sans ×", latex: "$2\\times x=2x$ ; $x\\times x=x^2$ ; $x+x=2x$" },
      { label: "Réduire", latex: "$2x+3+x-1=3x+2$ : les $x$ ensemble, les nombres ensemble" },
      { label: "Isoler dans un produit", latex: "$U=RI \\Rightarrow I=\\dfrac{U}{R}$ ; $d=vt \\Rightarrow t=\\dfrac{d}{v}$ ; $V=abc \\Rightarrow c=\\dfrac{V}{ab}$" },
      { label: "Soustraire, puis diviser", latex: "$y=ax+b \\Rightarrow x=\\dfrac{y-b}{a}$ ; $ax+by=c \\Rightarrow y=\\dfrac{c-ax}{b}$ (si $a\\neq 0$, $b\\neq 0$)" },
      { label: "Substituer", latex: "remplacer la lettre par sa valeur ENTRE PARENTHÈSES : $x=-2$ → $x^2=(-2)^2=4$" },
    ],
    reflexes: [
      { si: "« le double de… », « augmenté de… » (une phrase à traduire)", alors: "suivre l'ordre des mots ; « la somme de » se met entre parenthèses" },
      { si: "« exprime $t$ en fonction de… » dans une formule", alors: "opérations inverses : ce qui multiplie se retire en divisant, ce qui s'ajoute en soustrayant" },
      { si: "« calcule l'expression pour $x=-2$ »", alors: "réduire d'abord, remplacer ensuite — toujours entre parenthèses" },
      { si: "« entiers consécutifs »", alors: "les nommer $n$, $n+1$, $n+2$ : une seule lettre suffit" },
    ],
    pieges: [
      "Oublier les parenthèses en traduisant : « le double de la somme de $x$ et $3$ » = $2(x+3)$, pas $2x+3$ (sinon seul $x$ est doublé).",
      "Tout additionner : $3x+2$ ne fait PAS $5x$ — seuls les termes semblables se regroupent ; et $x+x=2x$, jamais $x^2$.",
      "Isoler dans le désordre : dans $y=2x+3$, on obtient $x=\\dfrac{y-3}{2}$ — diviser avant d'avoir soustrait donne le faux $\\dfrac{y}{2}-3$.",
    ],
    reel: "Sur la route des Tamarins, $d=vt$ : la même formule, retournée en $t=\\dfrac{d}{v}$, te dit si tu seras à l'heure au lycée.",
  },
  {
    id: "equations_inequations_1er_degre",
    emoji: "⚖️",
    titre: "Équations et inéquations du premier degré",
    domaine: "Nombres et calculs",
    essentiel:
      "Une équation est une **balance** : pour isoler $x$, on applique la **même opération aux deux membres**. Une inéquation se résout exactement pareil, à **une règle près** : multiplier ou diviser par un **nombre négatif retourne le sens** de l'inégalité. Autre différence : ses solutions forment un **intervalle**, pas un nombre unique.",
    formules: [
      { label: "Équation type", latex: "$ax+b=c \\Rightarrow ax=c-b \\Rightarrow x=\\dfrac{c-b}{a}$ (si $a\\neq0$)" },
      { label: "Inéquation, coefficient positif", latex: "$2x+1>7 \\Rightarrow x>3$ (le sens ne bouge pas)" },
      { label: "Inéquation, coefficient négatif", latex: "$-2x>6 \\Rightarrow x<-3$ (le sens change !)" },
      { label: "Traduction en intervalle", latex: "$x>3$ → $]3\\,;+\\infty[$ ; $x\\leqslant-2$ → $]-\\infty\\,;-2]$" },
      { label: "Comparer $A$ et $B$", latex: "signe de $A-B$ ; ou, si $A,B>0$, $\\dfrac{A}{B}$ face à $1$" },
    ],
    reflexes: [
      { si: "des $x$ dans les deux membres", alors: "regrouper : les $x$ d'un côté, les nombres de l'autre" },
      { si: "un énoncé en mots (« le double…, augmenté de… »)", alors: "poser $x$ = le nombre cherché, puis traduire mot à mot" },
      { si: "tu multiplies ou divises par un négatif", alors: "retourner le sens de l'inégalité" },
      { si: "« l'ensemble des solutions »", alors: "répondre en intervalle : inégalité stricte → crochet ouvert, large → fermé" },
    ],
    pieges: [
      "Diviser par un négatif sans retourner l'inégalité : $-2x>6$ donne $x<-3$, jamais $x>-3$.",
      "Faire passer un terme de l'autre côté sans changer son signe : dans $3x+4=19$, le $+4$ devient $19-4$, jamais $19+4$.",
      "Confondre les crochets : $x>3$ → $]3\\,;+\\infty[$ (3 exclu) mais $x\\geqslant3$ → $[3\\,;+\\infty[$ ; et côté $+\\infty$, crochet toujours ouvert.",
    ],
    reel: "Abonnement bus à 25 € ou ticket à 1,50 € : l'abonnement devient gagnant dès que $1{,}50x>25$ — au 17ᵉ trajet du mois.",
  },
  {
    id: "vecteurs_plan",
    emoji: "🧭",
    titre: "Vecteurs du plan",
    domaine: "Géométrie",
    essentiel:
      "Un vecteur code un **déplacement** (une translation) : une **direction**, un **sens**, une **norme** — peu importe le point de départ. Dans un repère, tout devient du calcul : $\\vec{AB}$ a pour coordonnées $(x_B-x_A\\,;y_B-y_A)$, **« arrivée moins départ »**. Deux outils font presque tout le chapitre : la **relation de Chasles** pour enchaîner les déplacements, le **déterminant** pour prouver alignements et parallélismes.",
    formules: [
      { label: "Coordonnées de $\\vec{AB}$", latex: "$\\vec{AB}(x_B-x_A\\,;y_B-y_A)$ — « arrivée moins départ »" },
      { label: "Égalité de vecteurs", latex: "$\\vec u=\\vec v\\iff$ mêmes coordonnées ; $ABCD$ parallélogramme $\\iff\\vec{AB}=\\vec{DC}$" },
      { label: "Relation de Chasles", latex: "$\\vec{AB}+\\vec{BC}=\\vec{AC}$ ; $\\vec{AB}+\\vec{BA}=\\vec 0$" },
      { label: "Calculs en coordonnées", latex: "$\\vec u+\\vec v\\,(x+x'\\,;y+y')$ ; $k\\vec u\\,(kx\\,;ky)$" },
      { label: "Norme (repère orthonormé)", latex: "$\\lVert\\vec u\\rVert=\\sqrt{x^2+y^2}$" },
      { label: "Colinéarité (déterminant)", latex: "$\\vec u(x\\,;y)$ et $\\vec v(x'\\,;y')$ colinéaires $\\iff xy'-yx'=0$" },
    ],
    reflexes: [
      { si: "« montrer que $ABCD$ est un parallélogramme »", alors: "prouver $\\vec{AB}=\\vec{DC}$ (mêmes coordonnées)" },
      { si: "« points alignés ? » / « droites parallèles ? »", alors: "déterminant nul (alignement : $\\vec{AB}$ et $\\vec{AC}$ colinéaires)" },
      { si: "somme du type $\\vec{AB}+\\vec{BC}$", alors: "Chasles : le point relais s'efface → $\\vec{AC}$" },
      { si: "« calculer la longueur $AB$ »", alors: "norme : $\\lVert\\vec{AB}\\rVert=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$" },
    ],
    pieges: [
      "Inverser « arrivée moins départ » : avec $A(-2\\,;3)$ et $B(1\\,;-1)$, $\\vec{AB}(3\\,;-4)$ — calculer $x_A-x_B$ donne le vecteur opposé $\\vec{BA}$.",
      "« $ABCD$ parallélogramme » se traduit par $\\vec{AB}=\\vec{DC}$ : écrire $\\vec{AB}=\\vec{CD}$ décrit un quadrilatère croisé — l'ordre des lettres décide de tout.",
      "Confondre direction et sens : $\\vec{AB}$ et $\\vec{BA}$ ont même direction et même norme, mais des sens opposés — $\\vec{BA}=-\\vec{AB}$.",
    ],
    reel: "Les flèches de vent sur la carte d'un cyclone : des vecteurs — direction, sens, et la norme pour la force des rafales.",
  },
  {
    id: "repere_coordonnees",
    emoji: "📍",
    titre: "Repère et coordonnées",
    domaine: "Géométrie",
    essentiel:
      "Un repère transforme chaque point du plan en un couple de nombres : $M(x\\,;y)$, **abscisse** d'abord (axe horizontal), **ordonnée** ensuite (axe vertical). La géométrie devient alors du calcul : une **moyenne** donne le milieu, **Pythagore** caché sous une racine donne la distance.",
    formules: [
      { label: "Un point = deux nombres", latex: "$M(x\\,;y)$ : abscisse $x$ sur l'axe horizontal, ordonnée $y$ sur l'axe vertical" },
      { label: "Origine", latex: "$O(0\\,;0)$ : le croisement des deux axes" },
      { label: "Milieu de $[AB]$", latex: "$x_M=\\dfrac{x_A+x_B}{2}$ et $y_M=\\dfrac{y_A+y_B}{2}$" },
      { label: "Distance (repère orthonormé)", latex: "$AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$" },
      { label: "Segment horizontal / vertical", latex: "même ordonnée : $AB=|x_B-x_A|$ ; même abscisse : $AB=|y_B-y_A|$" },
    ],
    reflexes: [
      { si: "« lis / place le point »", alors: "premier nombre = abscisse (horizontal), second = ordonnée (vertical)" },
      { si: "« milieu de $[AB]$ »", alors: "moyenne des abscisses ET moyenne des ordonnées (jamais de soustraction)" },
      { si: "« distance $AB$ », « longueur »", alors: "écarts au carré, somme, racine — et repère orthonormé obligatoire (Pythagore)" },
      { si: "« nature du triangle $ABC$ ? »", alors: "calculer les trois distances $AB$, $AC$, $BC$ puis comparer" },
    ],
    pieges: [
      "Inverser abscisse et ordonnée : pour $(2\\,;5)$, on avance de 2 puis on monte de 5 — pas l'inverse.",
      "Dans la distance, additionner les écarts sans les élever au carré : pour des écarts de 3 et 4, $AB=\\sqrt{3^2+4^2}=5$, jamais $3+4=7$ — et ne pas oublier la racine à la fin.",
      "Perdre un signe dans le milieu : entre $-2$ et $4$, la moyenne est $\\dfrac{-2+4}{2}=1$, pas $3$.",
    ],
    reel: "Une position GPS, c'est un couple de coordonnées — deux nombres suffisent pour désigner n'importe quel point de l'île.",
  },
  {
    id: "droites_plan",
    emoji: "📏",
    titre: "Droites du plan",
    domaine: "Géométrie",
    essentiel:
      "Une droite non verticale, c'est une équation $y=ax+b$ : $a$ est le **coefficient directeur** (la pente — de combien $y$ monte quand $x$ avance de 1), $b$ l'**ordonnée à l'origine** (là où la droite coupe l'axe des $y$). La forme **cartésienne** $ax+by+c=0$ décrit toutes les droites, même les verticales $x=k$. Pentes égales → parallèles ; pentes différentes → un unique point d'intersection : résoudre le **système**.",
    formules: [
      { label: "Équation réduite", latex: "$y=ax+b$ : $a$ = coefficient directeur (pente), $b$ = ordonnée à l'origine" },
      { label: "Pente par deux points", latex: "$a=\\dfrac{y_B-y_A}{x_B-x_A}$ (avec $x_A\\neq x_B$)" },
      { label: "Vecteur directeur", latex: "$\\vec{u}(1\\,;a)$ pour $y=ax+b$ ; $\\vec{u}(-b\\,;a)$ pour $ax+by+c=0$" },
      { label: "Verticale / horizontale", latex: "$x=k$ (verticale — pas de forme réduite) ; $y=k$ (horizontale, pente nulle)" },
      { label: "Parallélisme", latex: "$d\\parallel d'\\iff$ même coefficient directeur (vecteurs directeurs colinéaires)" },
      { label: "Intersection (système)", latex: "$ax+b=a'x+b'$ → $x$, puis reporter dans une équation → $y$" },
    ],
    reflexes: [
      { si: "« le point est-il sur la droite ? »", alors: "remplacer $x$ et $y$ par ses coordonnées : équation vérifiée = il y est" },
      { si: "équation de droite par deux points", alors: "calculer la pente $\\dfrac{y_B-y_A}{x_B-x_A}$, puis trouver $b$ avec l'un des points" },
      { si: "« parallèles, confondues ou sécantes ? »", alors: "comparer les pentes : égales → parallèles (et mêmes $b$ : confondues) ; différentes → sécantes" },
      { si: "« point d'intersection » / système 2×2", alors: "égaler les deux expressions de $y$ (substitution), trouver $x$, reporter pour $y$" },
    ],
    pieges: [
      "Inverser la formule de la pente : $a=\\dfrac{y_B-y_A}{x_B-x_A}$, les écarts d'ordonnées AU-DESSUS — de $A(1\\,;2)$ à $B(3\\,;8)$, $a=3$ et non $\\frac{1}{3}$.",
      "Chercher $y=ax+b$ pour une droite verticale : elle n'en a pas — une verticale s'écrit $x=k$ (seule la forme cartésienne la couvre).",
      "Résoudre le système, trouver $x$… et s'arrêter : la solution est un COUPLE $(x\\,;y)$ — reporter $x$ dans une équation pour calculer $y$.",
    ],
    reel: "Le panneau « 10 % » dans la montée du Maïdo : une pente de 0,10 — on s'élève de 10 m tous les 100 m horizontaux, le coefficient directeur de la route.",
  },
  {
    id: "geometrie_problemes_plan",
    emoji: "📐",
    titre: "Problèmes de géométrie plane",
    domaine: "Géométrie",
    essentiel:
      "La géométrie du collège devient une **boîte à outils** pour résoudre de vrais problèmes : **Pythagore** pour les longueurs, **SOH-CAH-TOA** pour les angles, les formules d'aires pour les surfaces. La nouveauté : le **projeté orthogonal** de $M$ sur une droite $d$ est le point de $d$ **le plus proche** de $M$ — c'est lui qui donne la distance d'un point à une droite. Et quand l'énoncé veut « le plus grand possible », on modélise par une **fonction** : c'est l'optimisation.",
    formules: [
      { label: "Projeté orthogonal", latex: "$H$ = pied de la perpendiculaire à $d$ passant par $M$ ; distance de $M$ à $d$ : $MH$" },
      { label: "SOH-CAH-TOA", latex: "$\\sin\\hat A=\\dfrac{\\text{opposé}}{\\text{hypoténuse}}$ ; $\\cos\\hat A=\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ ; $\\tan\\hat A=\\dfrac{\\text{opposé}}{\\text{adjacent}}$" },
      { label: "Identité fondamentale", latex: "$\\cos^2\\alpha+\\sin^2\\alpha=1$ (elle découle de Pythagore)" },
      { label: "Pythagore", latex: "triangle rectangle en $B$ : $AC^2=AB^2+BC^2$" },
      { label: "Aires", latex: "triangle : $\\dfrac{b\\times h}{2}$ ; rectangle : $L\\times\\ell$ ; carré : $c^2$ ; disque : $\\pi r^2$" },
    ],
    reflexes: [
      { si: "« distance d'un point à une droite »", alors: "la perpendiculaire : c'est $MH$, où $H$ est le projeté orthogonal de $M$" },
      { si: "triangle rectangle, un angle et un côté connus", alors: "SOH-CAH-TOA — repérer hypoténuse, opposé, adjacent AVANT de choisir sin, cos ou tan" },
      { si: "$\\cos\\alpha$ connu, $\\sin\\alpha$ cherché", alors: "$\\sin^2\\alpha=1-\\cos^2\\alpha$, puis racine (angle aigu → résultat positif)" },
      { si: "« le plus grand / le plus petit possible »", alors: "exprimer la grandeur comme fonction d'UNE variable, puis tableau de variations (à périmètre fixé, le carré a l'aire maximale)" },
    ],
    pieges: [
      "Confondre opposé et adjacent : ils dépendent de l'angle choisi — pour $\\hat A$, l'opposé est le côté qui ne touche pas $A$ ; seule l'hypoténuse ne change jamais.",
      "Projeter $M(3\\,;2)$ sur l'axe des abscisses et répondre $(0\\,;2)$ : FAUX — on garde l'abscisse, l'ordonnée devient $0$ : le projeté est $(3\\,;0)$.",
      "Écrire $\\cos\\alpha+\\sin\\alpha=1$ : FAUX — la relation porte sur les CARRÉS : $\\cos^2\\alpha+\\sin^2\\alpha=1$.",
    ],
    reel: "Estimer la hauteur d'une cascade sans y grimper : une distance au sol, un angle de visée, et la tangente fait le reste.",
  },
  {
    id: "fonction_vocabulaire_2de",
    emoji: "🎢",
    titre: "Fonctions : vocabulaire et représentations",
    domaine: "Fonctions",
    essentiel:
      "Une fonction $f$, c'est une machine : tu entres un nombre $x$, il ressort **un seul** nombre $f(x)$. Tout le chapitre est un aller-retour : **image** de $a$ → calculer $f(a)$ ; **antécédent** de $k$ → résoudre $f(x)=k$. La **courbe** rassemble tous les points $(x\\,;f(x))$ : chaque question a sa version graphique.",
    formules: [
      { label: "Image de $a$", latex: "calculer $f(a)$ : remplacer $x$ par $a$ dans la formule — l'image est toujours unique" },
      { label: "Antécédent de $k$", latex: "résoudre l'équation $f(x)=k$ — il peut y en avoir $0$, $1$ ou plusieurs" },
      { label: "Courbe représentative", latex: "$M(x\\,;y)$ est sur la courbe ⟺ $y=f(x)$ : c'est l'ensemble des points $(x\\,;f(x))$" },
      { label: "Résolution graphique", latex: "$f(x)=k$ : droite horizontale $y=k$ → abscisses des intersections ; $f(x)<0$ : courbe sous l'axe des abscisses" },
      { label: "Produit nul & signes", latex: "$A\\times B=0 \\iff A=0$ ou $B=0$ ; inéquation produit/quotient → tableau de signes (dénominateur jamais nul)" },
      { label: "Parité", latex: "paire : $f(-x)=f(x)$ (symétrie axe des ordonnées) ; impaire : $f(-x)=-f(x)$ (symétrie origine)" },
    ],
    reflexes: [
      { si: "« calculer l'image de $a$ » / « $f(a)$ »", alors: "remplacer $x$ par $a$ partout — parenthèses obligatoires si $a$ est négatif" },
      { si: "« antécédent(s) de $k$ »", alors: "résoudre l'équation $f(x)=k$ (surtout pas calculer $f(k)$)" },
      { si: "« résoudre graphiquement $f(x)=k$ »", alors: "tracer $y=k$ et lire les abscisses des points d'intersection" },
      { si: "« $(x-3)(x+2)=0$ » ou « $>0$ »", alors: "équation : un facteur nul suffit ; inéquation : tableau de signes" },
    ],
    pieges: [
      "Confondre image et antécédent : si $f(3)=7$, alors $7$ est l'image de $3$ et $3$ est un antécédent de $7$ — jamais l'inverse.",
      "Oublier les parenthèses : pour $f(x)=x^2+1$, $f(-2)=(-2)^2+1=5$, pas $-2^2+1=-3$.",
      "Répondre les ordonnées en résolvant $f(x)=k$ graphiquement : les solutions sont les ABSCISSES des points d'intersection ($9$ a d'ailleurs deux antécédents par la fonction carré : $3$ et $-3$).",
    ],
    reel: "Le graphique de la houle à Saint-Pierre : « quelle hauteur à 14 h ? », c'est une image ; « à quelle heure 2 m ? », c'est un antécédent.",
  },
  {
    id: "fonction_variations_extremums",
    emoji: "🎢",
    titre: "Variations et extremums",
    domaine: "Fonctions",
    essentiel:
      "Décrire une fonction, c'est dire où elle **monte** et où elle **descend** : croissante = quand $x$ augmente, $f(x)$ augmente ; décroissante = $f(x)$ diminue. Le **tableau de variations** résume tout : une flèche par intervalle, les valeurs aux bornes. Tout en haut le **maximum**, tout en bas le **minimum** — des valeurs de $f(x)$, jamais de $x$.",
    formules: [
      { label: "Croissante sur $I$", latex: "$u\\leqslant v \\Rightarrow f(u)\\leqslant f(v)$ : l'ordre est conservé" },
      { label: "Décroissante sur $I$", latex: "$u\\leqslant v \\Rightarrow f(u)\\geqslant f(v)$ : l'ordre est renversé" },
      { label: "Maximum en $x_0$", latex: "$f(x)\\leqslant f(x_0)$ pour tout $x$ de $I$ — le max est la valeur $f(x_0)$ (minimum : idem avec $\\geqslant$)" },
      { label: "Tableau de variations", latex: "$\\nearrow$ = croissante, $\\searrow$ = décroissante ; les extremums sont aux pointes des flèches" },
      { label: "Affine $f(x)=ax+b$", latex: "croissante si $a>0$, décroissante si $a<0$ : le signe de $a$ décide" },
      { label: "Carré $f(x)=x^2$", latex: "$\\searrow$ sur $]-\\infty\\,;0]$, $\\nearrow$ sur $[0\\,;+\\infty[$ ; minimum $0$ atteint en $x=0$" },
    ],
    reflexes: [
      { si: "« croissante ou décroissante sur $[a\\,;b]$ ? »", alors: "suivre la courbe de gauche à droite : ça monte → croissante, ça descend → décroissante" },
      { si: "la fonction monte puis descend", alors: "maximum au sommet (descend puis monte : minimum au creux)" },
      { si: "« quel est le maximum ? » / « en quelle valeur est-il atteint ? »", alors: "deux réponses différentes : la valeur $f(x_0)$, puis l'abscisse $x_0$ — lire la question" },
      { si: "un carré du type $(x-3)^2$", alors: "toujours $\\geqslant 0$, minimal quand la parenthèse s'annule : minimum en $x=3$" },
    ],
    pieges: [
      "Confondre le minimum (une valeur de $f(x)$) et l'endroit où il est atteint (une valeur de $x$) : pour $f(x)=(x-2)^2$, le minimum est $0$, atteint en $x=2$.",
      "Confondre « croissante » et « positive » : une fonction peut monter en restant négative. Le tableau de variations (flèches) n'est pas le tableau de signes (+/−).",
      "Annoncer « $x^2$ est croissante » sans intervalle : elle décroît sur $]-\\infty\\,;0]$ et croît sur $[0\\,;+\\infty[$ — un sens de variation se donne toujours sur un intervalle.",
    ],
    reel: "La hauteur d'eau au port de Saint-Pierre : elle monte, atteint son maximum à marée haute, puis redescend — un tableau de variations grandeur nature.",
  },
  {
    id: "fonctions_affines_2de",
    emoji: "📏",
    titre: "Fonctions affines",
    domaine: "Fonctions",
    essentiel:
      "Une fonction affine s'écrit $f(x)=ax+b$ : sa courbe est une **droite**. Deux nombres commandent tout : $a$, le **coefficient directeur** (la pente — ce que gagne $f$ quand $x$ augmente de 1), et $b$, l'**ordonnée à l'origine** (la droite coupe l'axe vertical en $b$, car $f(0)=b$). Les lire, les calculer, en déduire variations et signe : c'est tout le chapitre.",
    formules: [
      { label: "Forme", latex: "$f(x)=ax+b$ ; linéaire si $b=0$, constante si $a=0$ (les deux restent affines)" },
      { label: "Coefficient directeur", latex: "$a=\\dfrac{y_B-y_A}{x_B-x_A}$ (deux points connus)" },
      { label: "Ordonnée à l'origine", latex: "$b=f(0)$" },
      { label: "Sens de variation", latex: "$a>0$ → croissante ; $a<0$ → décroissante ; $a=0$ → constante" },
      { label: "Zéro", latex: "$ax+b=0 \\iff x=-\\dfrac{b}{a}$ (si $a\\neq 0$)" },
      { label: "Signe", latex: "signe de $a$ après $-\\dfrac{b}{a}$, signe de $-a$ avant" },
    ],
    reflexes: [
      { si: "« calculer l'image de 3 »", alors: "remplacer $x$ par 3 dans la formule : $f(3)$" },
      { si: "« antécédent de 9 »", alors: "résoudre l'équation $ax+b=9$" },
      { si: "deux points ou deux images connus", alors: "$a=\\dfrac{y_B-y_A}{x_B-x_A}$, puis $b$ avec $f(0)$ ou un point" },
      { si: "« signe de $f$ » / inéquation $ax+b>0$", alors: "chercher le zéro, puis tableau de signes selon le signe de $a$" },
    ],
    pieges: [
      "Confondre image et antécédent : l'antécédent de 9 s'obtient en résolvant $f(x)=9$, jamais en calculant $f(9)$.",
      "Inverser le taux d'accroissement : les $y$ en haut, les $x$ en bas — $a=\\dfrac{y_B-y_A}{x_B-x_A}$ — et dans le même ordre en haut et en bas.",
      "Oublier de retourner l'inégalité en divisant par un nombre négatif : $-2x+4\\geqslant 0$ donne $x\\leqslant 2$, pas $x\\geqslant 2$.",
    ],
    reel: "Une course en taxi : prise en charge fixe + prix au kilomètre — le total $ax+b$ est affine ; la prise en charge, c'est $b=f(0)$.",
  },
  {
    id: "fonctions_reference_2de",
    emoji: "🎢",
    titre: "Fonctions de référence",
    domaine: "Fonctions",
    essentiel:
      "Quatre courbes à connaître **par cœur** : le carré $x^2$ (parabole), l'inverse $\\frac{1}{x}$ (hyperbole), la racine carrée $\\sqrt{x}$ et le cube $x^3$. Pour chacune, trois questions : où est-elle définie ? à quoi ressemble sa courbe ? dans quel sens varie-t-elle ? Le **sens de variation** fait tout le reste : comparer des images sans calculer et compter les solutions de $f(x)=k$.",
    formules: [
      { label: "Carré (parabole)", latex: "$f(x)=x^2$ : décroît sur $]-\\infty\\,;0]$, croît sur $[0\\,;+\\infty[$ ; minimum $0$ en $x=0$" },
      { label: "Inverse (hyperbole)", latex: "$f(x)=\\dfrac{1}{x}$, définie pour $x\\neq 0$ : décroissante sur $]-\\infty\\,;0[$ ET sur $]0\\,;+\\infty[$ (séparément)" },
      { label: "Racine carrée", latex: "$f(x)=\\sqrt{x}$, définie pour $x\\geqslant 0$ : croissante sur $[0\\,;+\\infty[$" },
      { label: "Cube", latex: "$f(x)=x^3$, définie sur $\\mathbb{R}$ : croissante ; $x^3$ a le signe de $x$" },
      { label: "Parité", latex: "carré : paire ($f(-x)=f(x)$) ; inverse et cube : impaires ($f(-x)=-f(x)$)" },
      { label: "Solutions de $x^2=k$", latex: "$k>0$ : $\\sqrt{k}$ et $-\\sqrt{k}$ ; $k=0$ : $0$ seul ; $k<0$ : aucune" },
    ],
    reflexes: [
      { si: "« comparer $f(a)$ et $f(b)$ » sans calculer", alors: "sens de variation : croissante conserve l'ordre, décroissante l'inverse" },
      { si: "équation $x^2=k$", alors: "regarder le signe de $k$ : 2, 1 ou 0 solutions — ne jamais oublier $-\\sqrt{k}$" },
      { si: "$\\sqrt{x}=k$ ($k\\geqslant 0$) ou $\\dfrac{1}{x}=k$ ($k\\neq 0$)", alors: "une seule solution : $x=k^2$ ; $x=\\dfrac{1}{k}$" },
      { si: "équation $x^3=k$", alors: "une seule solution, du signe de $k$ (le cube est strictement croissant)" },
    ],
    pieges: [
      "Résoudre $x^2=9$ en ne donnant que $x=3$ : il y a DEUX solutions, $3$ et $-3$.",
      "Ranger les carrés comme les nombres : $-5<2$, pourtant $(-5)^2=25>4=2^2$ — avec des négatifs, calcule les images.",
      "Confondre l'inverse et l'opposé : l'inverse de $4$ est $\\dfrac{1}{4}$, pas $-4$.",
    ],
    reel: "La distance de freinage grandit comme le carré de la vitesse : rouler deux fois plus vite sur la route des Tamarins, c'est freiner quatre fois plus loin.",
  },
  {
    id: "information_chiffree_evolutions",
    emoji: "🏷️",
    titre: "Information chiffrée : proportions et évolutions",
    domaine: "Statistiques et probabilités",
    essentiel:
      "Une **proportion** compare une partie à un total : $\\dfrac{\\text{partie}}{\\text{total}}$. Une **évolution** de $t\\,\\%$ tient tout entière dans son **coefficient multiplicateur** ($1{,}2$ pour $+20\\,\\%$, $0{,}8$ pour $-20\\,\\%$) : c'est lui qui permet d'enchaîner les évolutions et de revenir en arrière. Règle d'or : des évolutions successives se **multiplient** (coefficient par coefficient), leurs taux ne s'additionnent jamais.",
    formules: [
      { label: "Proportion", latex: "$p=\\dfrac{\\text{effectif de la partie}}{\\text{effectif total}}$ ; en % : $\\times\\,100$" },
      { label: "Pourcentage de pourcentage", latex: "on multiplie les décimaux : $30\\,\\%$ de $50\\,\\%$ = $0{,}3\\times0{,}5=0{,}15$, soit $15\\,\\%$" },
      { label: "Variation absolue / relative", latex: "absolue : $V_f-V_i$ (en unités) ; relative : $\\dfrac{V_f-V_i}{V_i}\\times100$ (en %)" },
      { label: "Taux ↔ coefficient", latex: "hausse : $CM=1+\\dfrac{t}{100}$ ; baisse : $CM=1-\\dfrac{t}{100}$ ; retour au taux : $t=(CM-1)\\times100$" },
      { label: "Évolutions successives", latex: "$CM_{\\text{global}}=CM_1\\times CM_2$ (ex. $+10\\,\\%$ puis $+20\\,\\%$ : $1{,}1\\times1{,}2=1{,}32$)" },
      { label: "Évolution réciproque", latex: "$CM_{\\text{réciproque}}=\\dfrac{1}{CM}$ (annuler $+25\\,\\%$ : $\\dfrac{1}{1{,}25}=0{,}8$, soit $-20\\,\\%$)" },
    ],
    reflexes: [
      { si: "« quelle proportion / quel pourcentage ? »", alors: "$\\dfrac{\\text{partie}}{\\text{total}}\\times100$ — bien identifier le total" },
      { si: "« $20\\,\\%$ des élèves… et $30\\,\\%$ d'entre eux »", alors: "pourcentage de pourcentage : multiplier les décimaux ($0{,}2\\times0{,}3$, soit $6\\,\\%$)" },
      { si: "« augmente / diminue de $t\\,\\%$ »", alors: "coefficient multiplicateur : $\\times\\,1{,}08$ pour $+8\\,\\%$, $\\times\\,0{,}92$ pour $-8\\,\\%$" },
      { si: "des évolutions qui s'enchaînent", alors: "multiplier les coefficients — jamais additionner les taux" },
    ],
    pieges: [
      "Additionner des taux successifs : $+10\\,\\%$ puis $+10\\,\\%$, c'est $\\times\\,1{,}1\\times1{,}1=\\times\\,1{,}21$, donc $+21\\,\\%$ — pas $+20\\,\\%$.",
      "Croire qu'une hausse de $20\\,\\%$ s'annule par une baisse de $20\\,\\%$ : $1{,}2\\times0{,}8=0{,}96$, il reste une baisse de $4\\,\\%$.",
      "Mettre la valeur finale au dénominateur du taux : de $80$ à $100$, c'est $\\dfrac{20}{80}=25\\,\\%$ de hausse (pas $\\dfrac{20}{100}=20\\,\\%$).",
    ],
    reel: "Le billet d'avion Réunion–métropole prend $25\\,\\%$ pour les fêtes : pour retrouver son prix d'avant, il devra baisser de $20\\,\\%$ — pas de $25$.",
  },
  {
    id: "statistiques_descriptives",
    emoji: "📊",
    titre: "Statistiques descriptives",
    domaine: "Statistiques et probabilités",
    essentiel:
      "Résumer une série de données, c'est donner **deux** nombres : un indicateur de **position** (moyenne, médiane) pour situer le centre, et un indicateur de **dispersion** (étendue, écart interquartile, écart type) pour dire si les valeurs sont regroupées ou étalées. Deux séries peuvent avoir la même moyenne et des profils opposés — sans la dispersion, on ne voit rien.",
    formules: [
      { label: "Moyenne", latex: "$\\bar{x}=\\dfrac{\\text{somme des valeurs}}{\\text{effectif total}}$ ; à l'envers : somme $=\\bar{x}\\times$ effectif" },
      { label: "Moyenne pondérée", latex: "$\\bar{x}=\\dfrac{n_1x_1+n_2x_2+\\dots}{n_1+n_2+\\dots}$ (diviser par la somme des effectifs ou coefficients)" },
      { label: "Fréquence", latex: "$f=\\dfrac{\\text{effectif de la valeur}}{\\text{effectif total}}$ ; toujours entre $0$ et $1$, la somme des fréquences fait $1$ (soit $100\\,\\%$)" },
      { label: "Médiane", latex: "série ORDONNÉE coupée en deux moitiés — effectif impair : valeur du milieu ; effectif pair : moyenne des deux valeurs centrales" },
      { label: "Quartiles", latex: "$Q_1$ : au moins $25\\,\\%$ des valeurs $\\leqslant Q_1$ ; $Q_3$ : au moins $75\\,\\%$ ; écart interquartile $=Q_3-Q_1$ (les $50\\,\\%$ centraux)" },
      { label: "Dispersion", latex: "étendue $=\\max-\\min$ ; écart type $\\sigma\\geqslant 0$ : étalement autour de $\\bar{x}$, nul si toutes les valeurs sont égales (calculatrice ou Python)" },
    ],
    reflexes: [
      { si: "« quelle est la médiane ? »", alors: "ordonner la série D'ABORD, puis prendre le milieu (effectif pair : moyenne des deux centrales)" },
      { si: "notes à coefficients, valeurs avec effectifs", alors: "moyenne pondérée : $\\dfrac{n_1x_1+n_2x_2+\\dots}{n_1+n_2+\\dots}$" },
      { si: "« comparer deux séries »", alors: "un indicateur de position ET un de dispersion (moyenne + écart type, ou médiane + $Q_3-Q_1$)" },
      { si: "« plus régulier / plus stable ? »", alors: "regarder la dispersion : écart type le plus petit = plus régulier (à moyennes proches)" },
    ],
    pieges: [
      "Chercher la médiane sans ordonner la série : pour $9$, $2$, $5$, la médiane est $5$ (série ordonnée : $2$, $5$, $9$), pas $2$.",
      "Moyenne pondérée : diviser par le nombre de valeurs au lieu de la somme des coefficients — $12$ (coef $1$) et $8$ (coef $3$) donnent $\\dfrac{12+24}{4}=9$, pas $10$.",
      "Croire la moyenne toujours « représentative » : une seule valeur extrême la fait bondir, alors que la médiane ne bouge pas — d'où étendue sensible aux extrêmes, mais $Q_3-Q_1$ robuste.",
    ],
    reel: "Salaire « moyen » contre salaire « médian » : quelques très hauts salaires gonflent la moyenne — la médiane, elle, dit ce que gagne la moitié des gens.",
  },
  {
    id: "probabilites_ensemble_fini",
    emoji: "🎲",
    titre: "Probabilités sur un ensemble fini",
    domaine: "Statistiques et probabilités",
    essentiel:
      "Le hasard se modélise : l'**univers** liste toutes les issues possibles, et chacune reçoit une probabilité — le total fait toujours **1**. Un **événement** est un paquet d'issues, et sa probabilité est la **somme** des probabilités de ses issues. Cas roi, l'**équiprobabilité** (dé équilibré, tirage au hasard) : compter les cas favorables, diviser par le total.",
    formules: [
      { label: "Loi de probabilité", latex: "chaque $p_i \\in [0\\,;1]$ et $p_1+p_2+\\dots+p_n=1$" },
      { label: "Équiprobabilité", latex: "$P(A)=\\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre total d'issues}}$" },
      { label: "Événement contraire", latex: "$P(\\overline{A})=1-P(A)$" },
      { label: "Réunion (formule du crible)", latex: "$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$" },
      { label: "Incompatibles", latex: "$A\\cap B=\\varnothing$ : $P(A\\cap B)=0$ et $P(A\\cup B)=P(A)+P(B)$" },
      { label: "Arbre / tableau (2 étapes)", latex: "le long d'un chemin on multiplie ; entre plusieurs chemins on additionne" },
    ],
    reflexes: [
      { si: "« équilibré », « au hasard », « indiscernables »", alors: "équiprobabilité : $P=\\dfrac{\\text{favorables}}{\\text{total}}$" },
      { si: "« au moins un… »", alors: "passer par le contraire « aucun » : $P=1-P(\\text{aucun})$" },
      { si: "« $A$ ou $B$ » / « $A$ et $B$ »", alors: "réunion $A\\cup B$ / intersection $A\\cap B$, puis formule du crible" },
      { si: "expérience à deux étapes (deux lancers, deux tirages)", alors: "arbre ou tableau à double entrée pour lister TOUTES les issues" },
    ],
    pieges: [
      "Écrire $P(A\\cup B)=P(A)+P(B)$ quand $A$ et $B$ ont des issues communes : l'intersection est comptée deux fois — il faut retirer $P(A\\cap B)$.",
      "Utiliser « favorables sur total » avec un dé truqué : cette formule ne vaut QUE si toutes les issues sont équiprobables.",
      "Confondre incompatibles et contraires : incompatibles = jamais ensemble ($P(A\\cap B)=0$) ; contraires = en plus, l'un des deux se réalise forcément.",
    ],
    reel: "La roue de la kermesse du collège : 8 secteurs identiques dont 2 gagnants — $P(\\text{gagner})=\\dfrac{2}{8}=\\dfrac{1}{4}$, l'équiprobabilité en vrai.",
  },
  {
    id: "echantillonnage_simulation",
    emoji: "🪙",
    titre: "Échantillonnage et simulation",
    domaine: "Statistiques et probabilités",
    essentiel:
      "Refais la même expérience avec deux échantillons : les résultats diffèrent — c'est la **fluctuation d'échantillonnage**. Quand la taille $n$ grandit, la fréquence observée $f$ se stabilise près de la probabilité $p$ : c'est la **loi des grands nombres**. La **simulation** (Python, tableur) répète l'expérience des milliers de fois en une seconde — parfait pour voir tout ça sans lancer une seule pièce.",
    formules: [
      { label: "Fréquence observée", latex: "$f=\\dfrac{\\text{nombre de succès}}{n}$" },
      { label: "Loi des grands nombres", latex: "quand $n$ est grand, $f$ est proche de $p$ (sauf exception)" },
      { label: "Estimation", latex: "$p$ inconnue $\\approx f$ mesurée sur un GRAND échantillon" },
      { label: "Repère d'ordre de grandeur", latex: "l'écart $|f-p|$ est le plus souvent de l'ordre de $\\dfrac{1}{\\sqrt{n}}$ ($n=100$ → $\\approx 0{,}1$)" },
      { label: "Simuler pile ou face", latex: "`randint(0,1)` (module `random`), répété avec une boucle `for`" },
    ],
    reflexes: [
      { si: "« un autre échantillon donnera-t-il pareil ? »", alors: "non : fluctuation d'échantillonnage — d'autant plus faible que $n$ est grand" },
      { si: "probabilité inconnue à estimer", alors: "fréquence observée sur un GRAND échantillon (loi des grands nombres)" },
      { si: "« pièce ou dé truqués ? »", alors: "comparer $|f-p|$ à $\\dfrac{1}{\\sqrt{n}}$ : écart au-delà = suspect" },
      { si: "« la fréquence vaudra-t-elle exactement $p$ ? »", alors: "non — mais l'écart se réduit quand $n$ grandit : refais la simulation avec $n$ plus grand" },
    ],
    pieges: [
      "Attendre le compte théorique exact : sur $50$ lancers d'une pièce équilibrée, le nombre de piles est PROCHE de $25$, pas forcément égal à $25$.",
      "Conclure au truquage sur un petit échantillon : $4$ piles sur $5$ lancers ($f=0{,}8$) n'a rien d'anormal — un écart n'est suspect que s'il dépasse $\\dfrac{1}{\\sqrt{n}}$ sur un grand échantillon.",
      "S'étonner que deux simulations du même programme diffèrent : le hasard change à chaque exécution — fréquences proches, jamais garanties identiques.",
    ],
    reel: "La marge « ± 3 points » des sondages vient de là : pour 1 000 personnes interrogées, $\\dfrac{1}{\\sqrt{1000}}\\approx 0{,}03$.",
  },
  {
    id: "algorithmique_python_2de",
    emoji: "🐍",
    titre: "Algorithmique et Python",
    domaine: "Algorithmique et programmation",
    essentiel:
      "Un programme s'exécute **ligne à ligne**, dans l'ordre. Quatre briques suffisent : les **variables** (mémoriser une valeur), les **conditions** `if` (choisir), les **boucles** `for`/`while` (répéter), les **fonctions** `def` (emballer un calcul). Pour prédire ce qu'un code affiche : dérouler les instructions une à une, en suivant chaque variable.",
    formules: [
      { label: "Affectation", latex: "`x = 5` range 5 dans x ; dans `x = x + 2`, la droite se calcule avec l'ANCIENNE valeur de x" },
      { label: "Types", latex: "`7` entier (int) ; `2.5` flottant (float) ; `\"7\"` chaîne (str) ; `True` booléen (bool) — et `\"2\" + \"3\"` donne `\"23\"`" },
      { label: "Condition", latex: "`if` … `elif` … `else` ; un test (`x > 3`, `x == 5`) renvoie `True` ou `False`" },
      { label: "Boucle bornée", latex: "`for i in range(n):` répète $n$ fois, $i$ allant de $0$ à $n-1$ ; `range(a,b)` va de $a$ à $b-1$" },
      { label: "Boucle non bornée", latex: "`while condition:` répète tant que la condition est vraie — le bloc doit la faire évoluer (sinon boucle infinie)" },
      { label: "Fonction", latex: "`def f(x): return 2*x + 1` — une fonction RENVOIE avec `return` ; `f(3)` vaut alors 7" },
    ],
    reflexes: [
      { si: "« que vaut x à la fin ? »", alors: "dérouler le code ligne à ligne, un tableau de valeurs par variable" },
      { si: "nombre de tours connu d'avance", alors: "`for` ; « tant que… » sans nombre connu → `while`" },
      { si: "« simuler » un dé, une pièce", alors: "`random.randint(1,6)` dans un `for`, un `if` qui compte ; fréquence = succès ÷ essais" },
      { si: "deux codes donnent le même résultat", alors: "choisir celui qui fait le moins d'opérations (plus rapide, moins d'énergie)" },
    ],
    pieges: [
      "Écrire `if x = 5` : FAUX — `=` affecte, `==` teste. Un seul signe égal n'est jamais une comparaison.",
      "`range(5)` produit 5 valeurs mais s'arrête à 4 : c'est 0, 1, 2, 3, 4 — jamais 5.",
      "Confondre `print` (afficher à l'écran) et `return` (renvoyer une valeur réutilisable) : sans `return`, la fonction ne renvoie rien.",
    ],
    reel: "La trajectoire d'un cyclone se prévoit en répétant des milliers de simulations : le principe de ta boucle `for` qui lance 1 000 dés.",
  },
  {
    id: "logique_ensembles",
    emoji: "🧩",
    titre: "Ensembles et logique",
    domaine: "Vocabulaire ensembliste et logique",
    essentiel:
      "Deux symboles à ne pas confondre : $\\in$ relie un **élément** à un ensemble, $\\subset$ relie **deux ensembles**. Ensuite tout se traduit : « et » = intersection $\\cap$, « ou » (toujours **inclusif**) = réunion $\\cup$. Pour raisonner : une implication a un **sens**, la réciproque l'échange — et un seul **contre-exemple** suffit à prouver qu'une affirmation est fausse.",
    formules: [
      { label: "Appartenance / inclusion", latex: "$3\\in\\{1,2,3\\}$ (élément) ; $\\{1,2\\}\\subset\\{1,2,3\\}$ (ensemble)" },
      { label: "Emboîtement des nombres", latex: "$\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{D}\\subset\\mathbb{Q}\\subset\\mathbb{R}$" },
      { label: "« et » = intersection", latex: "$x\\in A\\cap B$ ⟺ $x\\in A$ ET $x\\in B$ (les deux vraies)" },
      { label: "« ou » = réunion", latex: "$x\\in A\\cup B$ ⟺ $x\\in A$ OU $x\\in B$ (au moins l'un)" },
      { label: "Complémentaire", latex: "$\\overline{A}$ = les éléments de $E$ qui ne sont PAS dans $A$" },
      { label: "Implication, équivalence", latex: "$P\\Rightarrow Q$ : « si $P$ alors $Q$ » ; $P\\Leftrightarrow Q$ : les deux sens (« si et seulement si »)" },
    ],
    reflexes: [
      { si: "un élément face à un ensemble", alors: "$\\in$ ; entre deux ensembles : $\\subset$" },
      { si: "« les deux à la fois » / « au moins l'un des deux »", alors: "intersection $A\\cap B$ / réunion $A\\cup B$" },
      { si: "« montrer que l'affirmation est fausse »", alors: "un seul contre-exemple suffit (ex. $2$ pour « tous les premiers sont impairs »)" },
      { si: "« énoncer la réciproque »", alors: "échanger hypothèse et conclusion — puis la tester : elle peut être fausse" },
    ],
    pieges: [
      "Confondre $\\in$ et $\\subset$ : $2\\in\\{1,2\\}$ mais $\\{2\\}\\subset\\{1,2\\}$ — l'élément appartient, l'ensemble est inclus.",
      "Nier « $x>0$ » par « $x<0$ » : FAUX, la négation est $x\\leqslant 0$ — le cas $x=0$ doit être couvert.",
      "Croire qu'une implication vraie rend sa réciproque vraie : « $x=2\\Rightarrow x^2=4$ » est vraie, « $x^2=4\\Rightarrow x=2$ » est fausse ($x=-2$ convient aussi).",
    ],
    reel: "Filtrer les annonces de location « meublé ET moins de 600 € » : une intersection ; élargir à « Saint-Pierre OU Le Tampon » : une réunion.",
  },
];

const BANQUES: Record<string, TutorBankItemV4[]> = {
  reels_intervalles: reelsIntervallesBank,
  arithmetique_entiers: arithmetiqueEntiersBank,
  puissances_2de: puissancesBank,
  racine_carree_2de: racineCarreeBank,
  developpement_factorisation_2de: developpementFactorisationBank,
  identites_remarquables_2de: identitesRemarquablesBank,
  expressions_litterales_2de: expressionsLitteralesBank,
  equations_inequations_1er_degre: equationsInequationsBank,
  vecteurs_plan: vecteursPlanBank,
  repere_coordonnees: repereCoordonneesBank,
  droites_plan: droitesPlanBank,
  geometrie_problemes_plan: geometrieProblemesPlanBank,
  fonction_vocabulaire_2de: fonctionVocabulaireBank,
  fonction_variations_extremums: fonctionVariationsBank,
  fonctions_affines_2de: fonctionsAffinesBank,
  fonctions_reference_2de: fonctionsReferenceBank,
  information_chiffree_evolutions: informationChiffreeBank,
  statistiques_descriptives: statistiquesDescriptivesBank,
  probabilites_ensemble_fini: probabilitesBank,
  echantillonnage_simulation: echantillonnageBank,
  algorithmique_python_2de: algorithmiquePythonBank,
  logique_ensembles: logiqueEnsemblesBank,
};

export const KIT_MATHS_SECONDE: KitData = {
  slug: "maths-seconde",
  titre: "Guide de survie · Maths Seconde",
  baseline:
    "Tout le programme de seconde en 22 fiches : les formules qui sauvent, les réflexes devant un énoncé, les pièges qui coûtent des points — et un test corrigé par chapitre. À imprimer, à glisser dans le classeur.",
  matiere: "maths",
  classeLabel: "Seconde",
  coachClasse: "seconde",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
