// ─── Guide de survie · Maths 5e ─────────────────────────────────────────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/maths/5e/notions.ts
// - checklists     = micro-compétences de microSkills.ts (BO cycle 4)
// - test de survie = items "fixed" puisés dans les banques du coach
// Condensés écrits par 13 rédacteurs parallèles (workflow du 26/07) puis VÉRIFIÉS
// à la main contre le BO cycle 4 et les banques (exactitude des exemples, périmètre
// 5e strict — pas de débordement 4e/3e/lycée, couverture des micros).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/5e/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { nombresRelatifsBank } from "@/lib/tutor-v4/questionBank/5e/maths/nombres-relatifs.bank";
import { operationsRelatifsBank } from "@/lib/tutor-v4/questionBank/5e/maths/operations-relatifs.bank.ts";
import { fractionsBank } from "@/lib/tutor-v4/questionBank/5e/maths/fractions.bank";
import { proportionnaliteBank } from "@/lib/tutor-v4/questionBank/5e/maths/proportionnalite.bank";
import { calculLitteralBank } from "@/lib/tutor-v4/questionBank/5e/maths/calcul-litteral.bank";
import { anglesBank } from "@/lib/tutor-v4/questionBank/5e/maths/angles.bank";
import { trianglesBank } from "@/lib/tutor-v4/questionBank/5e/maths/triangles.bank";
import { symetrieCentraleBank } from "@/lib/tutor-v4/questionBank/5e/maths/symetrie_centrale.bank";
import { airesBank } from "@/lib/tutor-v4/questionBank/5e/maths/aires.bank";
import { volumesBank } from "@/lib/tutor-v4/questionBank/5e/maths/volumes.bank";
import { statistiquesBank } from "@/lib/tutor-v4/questionBank/5e/maths/statistiques.bank";
import { probabilitesBank } from "@/lib/tutor-v4/questionBank/5e/maths/probabilites.bank";
import { algorithmiqueBank } from "@/lib/tutor-v4/questionBank/5e/maths/algorithmique.bank";
import type { KitData, KitNotion } from "@/components/kit/types";

// Checklists + tests dérivés du coach (module partagé par tous les guides).
const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  {
    id: "relatif_nombre",
    emoji: "🌡️",
    titre: "Nombres relatifs",
    domaine: "Nombres et calculs",
    essentiel:
      "Un **nombre relatif** a un **signe** : positif ($+$) ou négatif ($-$) ; $0$ n'est ni l'un ni l'autre. On les range sur une **droite graduée** : plus on va vers la **droite**, plus le nombre est grand ($-5 < -2 < 3$). Chaque nombre a un **opposé** (même distance à $0$, signe changé) et une **valeur absolue** (sa distance à $0$, toujours positive).",
    formules: [
      { label: "Lire et écrire un relatif (le signe)", latex: "au-dessus de zéro $\\to$ positif ($+4$) ; au-dessous de zéro $\\to$ négatif ($-7$)" },
      { label: "Comparer avec la droite graduée", latex: "le plus à droite est le plus grand : $-5 < -2 < 0 < 3$" },
      { label: "Comparer deux nombres négatifs", latex: "le plus proche de $0$ est le plus grand (ex. $-4 > -7$)" },
      { label: "Opposé (même distance à $0$, signe changé)", latex: "l'opposé de $+7$ est $-7$ ; l'opposé de $-3$ est $+3$" },
      { label: "Valeur absolue = distance à $0$", latex: "la valeur absolue de $-5$ est $5$ ; celle de $+8$ est $8$" },
    ],
    reflexes: [
      { si: "« ranger » ou « comparer » des relatifs", alors: "les placer sur la droite graduée : le plus à droite est le plus grand" },
      { si: "deux nombres négatifs à comparer", alors: "le plus proche de $0$ est le plus grand : $-4 > -7$" },
      { si: "« l'opposé de… »", alors: "garder la distance à $0$ et changer le signe : $-6 \\to +6$" },
      { si: "« valeur absolue » ou « distance à $0$ »", alors: "enlever le signe : la valeur absolue de $-9$ est $9$" },
    ],
    pieges: [
      "Croire que $-8 > -2$ : sur la droite, $-8$ est à GAUCHE de $-2$, donc $-8 < -2$.",
      "Oublier que la valeur absolue est toujours positive : la valeur absolue de $-5$ est $5$, jamais $-5$.",
      "Penser qu'un seul nombre a pour valeur absolue $4$ : il y en a deux, $-4$ et $+4$.",
    ],
    reel: "Au Maïdo, il fait $-1$ °C le matin et $+6$ °C l'après-midi : comme $-1 < +6$, c'est l'après-midi qu'il fait le plus chaud.",
  },
  {
    id: "relatif_operation",
    emoji: "➕",
    titre: "Additions et soustractions de relatifs",
    domaine: "Nombres et calculs",
    essentiel:
      "En 5e, on **additionne** et on **soustrait** des nombres relatifs (positifs ou négatifs). La règle d'or : **soustraire, c'est ajouter l'opposé**. Quand il y a plusieurs signes, on **simplifie les doubles signes** puis on calcule **de gauche à droite**.",
    formules: [
      { label: "Opposé (même distance à 0, signe changé)", latex: "l'opposé de $+6$ est $-6$ ; l'opposé de $-4$ est $+4$" },
      { label: "Additionner deux nombres de même signe", latex: "on ajoute les distances à $0$ et on garde le signe (ex. $(-4)+(-3)=-7$)" },
      { label: "Additionner deux signes contraires", latex: "on soustrait, on garde le signe du plus éloigné de $0$ (ex. $(-8)+5=-3$)" },
      { label: "Soustraire = ajouter l'opposé", latex: "$a-b=a+(-b)$ (ex. $4-(-3)=4+3=7$)" },
      { label: "Enchaîner (on calcule de gauche à droite)", latex: "$-6-(-2)+1=-6+2+1=-3$" },
    ],
    reflexes: [
      { si: "une soustraction, surtout d'un nombre négatif", alors: "la changer en addition de l'opposé : $-(-2)$ devient $+2$" },
      { si: "une addition de deux relatifs", alors: "mêmes signes → on ajoute les distances ; signes contraires → on soustrait" },
      { si: "un calcul avec plusieurs signes", alors: "simplifier d'abord les doubles signes, puis avancer de gauche à droite" },
      { si: "un problème (température, solde, profondeur)", alors: "traduire : baisser / descendre / perdre $\\to$ soustraire ; monter / gagner $\\to$ ajouter" },
    ],
    pieges: [
      "Oublier que soustraire un négatif augmente : $-7-(-4)=-3$, et non $-11$.",
      "Se tromper en additionnant deux négatifs : $(-4)+(-3)=-7$, et non $-1$.",
      "Croire que $-5+2$ reste très négatif : on soustrait les distances, $-5+2=-3$.",
    ],
    reel: "Un plongeur à La Réunion est à $-6$ m ; il remonte de $2$ m puis redescend de $5$ m : $-6+2-5=-9$ m.",
  },
  {
    id: "fraction_nombre",
    emoji: "➗",
    titre: "Fractions",
    domaine: "Nombres et calculs",
    essentiel:
      "Une **fraction** $\\dfrac{a}{b}$ est un **partage** (ou un quotient). Deux fractions sont **égales** si on passe de l'une à l'autre en multipliant (ou divisant) le **numérateur** et le **dénominateur** par le **même nombre** : c'est ce qui sert à **simplifier** et à **comparer**. En 5e, on apprend aussi à **additionner**, **soustraire**, **multiplier** et **diviser** des fractions.",
    formules: [
      { label: "Fractions égales et simplifier (même nombre en haut et en bas)", latex: "$\\dfrac{a}{b}=\\dfrac{a\\times k}{b\\times k}$ (ex. $\\dfrac{3}{4}=\\dfrac{6}{8}$ ; on simplifie $\\dfrac{6}{8}=\\dfrac{3}{4}$)" },
      { label: "Additionner ou soustraire (d'abord le même dénominateur)", latex: "$\\dfrac{a}{d}+\\dfrac{b}{d}=\\dfrac{a+b}{d}$ (ex. $\\dfrac{1}{2}+\\dfrac{1}{3}=\\dfrac{3}{6}+\\dfrac{2}{6}=\\dfrac{5}{6}$)" },
      { label: "Multiplier (haut par haut, bas par bas)", latex: "$\\dfrac{a}{b}\\times\\dfrac{c}{d}=\\dfrac{a\\times c}{b\\times d}$ (ex. $\\dfrac{2}{3}\\times\\dfrac{3}{4}=\\dfrac{6}{12}=\\dfrac{1}{2}$)" },
      { label: "Inverse et diviser (multiplier par l'inverse)", latex: "l'inverse de $\\dfrac{a}{b}$ est $\\dfrac{b}{a}$ ; $\\dfrac{a}{b}\\div\\dfrac{c}{d}=\\dfrac{a}{b}\\times\\dfrac{d}{c}$" },
      { label: "Fraction d'une quantité et opposé", latex: "$\\dfrac{a}{b}$ de $N=N\\times\\dfrac{a}{b}$ (ex. $\\dfrac{3}{4}$ de $20=15$) ; l'opposé de $\\dfrac{a}{b}$ est $-\\dfrac{a}{b}$" },
    ],
    reflexes: [
      { si: "« comparer » ou « ranger » des fractions", alors: "les mettre au même dénominateur (comparer les numérateurs), ou faire le produit en croix : $\\dfrac{2}{3}$ vs $\\dfrac{3}{5}$ donne $2\\times5=10>3\\times3=9$, donc $\\dfrac{2}{3}>\\dfrac{3}{5}$" },
      { si: "additionner ou soustraire avec des dénominateurs différents", alors: "d'abord le même dénominateur, puis on ajoute (ou enlève) seulement les numérateurs" },
      { si: "« diviser par une fraction »", alors: "multiplier par son inverse : on retourne la 2e fraction" },
      { si: "« $\\dfrac{a}{b}$ de… » une quantité", alors: "multiplier la quantité par la fraction" },
    ],
    pieges: [
      "Additionner les dénominateurs : $\\dfrac{1}{2}+\\dfrac{1}{3}\\neq\\dfrac{2}{5}$. Il faut le même dénominateur, et le résultat est $\\dfrac{5}{6}$.",
      "Croire que $\\dfrac{1}{4}>\\dfrac{1}{3}$ : plus le dénominateur est grand, plus les parts sont petites, donc $\\dfrac{1}{4}<\\dfrac{1}{3}$.",
      "Mettre au même dénominateur pour MULTIPLIER : inutile, on multiplie directement en haut et en bas ($\\dfrac{2}{3}\\times\\dfrac{3}{4}=\\dfrac{6}{12}=\\dfrac{1}{2}$).",
    ],
    reel: "Un gâteau patate partagé à Saint-Denis : Inès en mange $\\dfrac{1}{4}$ le matin puis $\\dfrac{1}{2}$ à midi, soit $\\dfrac{1}{4}+\\dfrac{2}{4}=\\dfrac{3}{4}$ du gâteau.",
  },
  {
    id: "prop_proportionnalite",
    emoji: "⚖️",
    titre: "Proportionnalité",
    domaine: "Fonctions et proportionnalité",
    essentiel:
      "Une situation est **proportionnelle** si on passe d'une grandeur à l'autre en multipliant toujours par le **même nombre**, appelé le **coefficient**. Un **pourcentage** est une proportion sur $100$ : prendre $t\\,\\%$, c'est multiplier par $\\dfrac{t}{100}$. Un **ratio** $2{:}3$ se lit « $2$ pour $3$ » et se conserve en multipliant les deux nombres par le même facteur.",
    formules: [
      { label: "Coefficient de proportionnalité", latex: "$k=\\dfrac{y}{x}$ (ex. $4\\to 20$ : $k=\\dfrac{20}{4}=5$)" },
      { label: "Quatrième proportionnelle (produit en croix)", latex: "$\\dfrac{a}{b}=\\dfrac{c}{d}\\Rightarrow d=\\dfrac{b\\times c}{a}$ ; ou passage à l'unité" },
      { label: "Prendre $t\\,\\%$ d'un nombre", latex: "$\\times\\dfrac{t}{100}$ (ex. $20\\,\\%$ de $50=0{,}2\\times 50=10$)" },
      { label: "Garder un ratio $a{:}b$", latex: "on multiplie les deux nombres par le même facteur (ex. $2{:}3$ devient $8{:}12$ en $\\times 4$)" },
      { label: "Coefficient multiplicateur", latex: "hausse de $t\\,\\%$ : $\\times\\left(1+\\dfrac{t}{100}\\right)$ ; baisse : $\\times\\left(1-\\dfrac{t}{100}\\right)$ (ex. $+20\\,\\%\\to\\times 1{,}2$)" },
    ],
    reflexes: [
      { si: "un tableau, « est-ce proportionnel ? »", alors: "chercher un coefficient constant : $\\dfrac{y}{x}$ identique partout" },
      { si: "3 valeurs connues sur 4 en proportion", alors: "produit en croix, ou passage à l'unité (prix de $1$, puis $\\times$ la quantité)" },
      { si: "« $t\\,\\%$ de… »", alors: "multiplier par $\\dfrac{t}{100}$" },
      { si: "une hausse ou une baisse de $t\\,\\%$", alors: "utiliser le coefficient multiplicateur $1+\\dfrac{t}{100}$ ou $1-\\dfrac{t}{100}$" },
    ],
    pieges: [
      "Confondre proportionnalité (on MULTIPLIE par le même nombre) et « ajouter toujours le même nombre ».",
      "Pour une hausse de $20\\,\\%$, multiplier par $0{,}2$ au lieu de $1{,}2$ : on garde les $100\\,\\%$ de départ.",
      "Se tromper de sens dans le produit en croix, ou inverser l'ordre d'un ratio $a{:}b$.",
    ],
    reel: "Au marché de Saint-Pierre, si $4$ samoussas coûtent $8$ €, alors $1$ samoussa coûte $2$ € et $10$ samoussas coûtent $10\\times 2=20$ €.",
  },
  {
    id: "litteral_calcul",
    emoji: "🔤",
    titre: "Calcul littéral",
    domaine: "Nombres et calculs",
    essentiel:
      "En **calcul littéral**, une **lettre** remplace un nombre qu'on ne connaît pas encore. Un nombre **collé** à une lettre veut dire **multiplier** : $4x=4\\times x$. En 5e, on apprend à **traduire** une phrase en expression, à **remplacer** la lettre par une valeur (**substituer**) et à **réduire** en regroupant les termes de même lettre.",
    formules: [
      { label: "Un nombre collé à une lettre = multiplication", latex: "$4x=4\\times x$ ; $ab=a\\times b$" },
      { label: "Traduire les mots-clés d'une phrase", latex: "double $\\to 2x$ ; augmenté de $5\\to +5$ ; diminué de $4\\to -4$" },
      { label: "Substituer (remplacer la lettre par sa valeur)", latex: "pour $x=6$ : $3x-2=3\\times 6-2=16$" },
      { label: "Réduire les termes semblables (même lettre)", latex: "$3x+2x=5x$ ; $4x-x=3x$" },
      { label: "Multiplier une lettre par elle-même", latex: "$x\\times x=x^2$" },
    ],
    reflexes: [
      { si: "un nombre collé à une lettre, comme $4x$", alors: "le lire comme une multiplication : $4x=4\\times x$" },
      { si: "une phrase à traduire (« double de… », « augmenté de… »)", alors: "repérer les mots-clés : double $\\to\\times 2$, augmenté de $\\to +$, diminué de $\\to -$" },
      { si: "« calcule pour $x=\\dots$ »", alors: "remplacer la lettre par sa valeur (parenthèses si elle est négative) puis calculer" },
      { si: "« réduis »", alors: "regrouper seulement les termes de même lettre en additionnant leurs coefficients" },
    ],
    pieges: [
      "Confondre addition et multiplication en réduisant : $2x+3x=5x$ (on additionne les coefficients), et non $5x^2$.",
      "Vouloir réduire $3x+2$ : $3x$ (avec la lettre) et $2$ (constant) ne sont pas semblables, donc ça reste $3x+2$.",
      "Oublier les parenthèses en remplaçant un négatif : pour $x=-3$, $2x+5=2\\times(-3)+5=-1$, et non $2\\times 3+5$.",
    ],
    reel: "Au parc du Maïdo, si l'entrée coûte $x$ € par personne, un groupe de $4$ paie $4x$ : pour $x=6$ €, cela fait $4\\times 6=24$ €.",
  },
  {
    id: "angle_mesure",
    emoji: "📐",
    titre: "Angles",
    domaine: "Espace et géométrie",
    essentiel:
      "Un **angle** mesure l'**ouverture** entre deux demi-droites qui partent d'un même point, le **sommet**. On le note avec **trois lettres** (ex. $\\widehat{AOB}$), la lettre du **milieu** étant le sommet. On mesure un angle en **degrés** ($^\\circ$) avec un **rapporteur**, et on le range par famille : **aigu**, **droit** ($90^\\circ$), **obtus** ou **plat** ($180^\\circ$).",
    formules: [
      { label: "Les 4 angles à reconnaître", latex: "aigu $<90^\\circ$ ; droit $=90^\\circ$ ; obtus entre $90^\\circ$ et $180^\\circ$ ; plat $=180^\\circ$" },
      { label: "Mesurer/tracer au rapporteur", latex: "centre sur le **sommet**, le $0$ aligné sur un côté, on lit la graduation du 2e côté" },
      { label: "Angles complémentaires (total $90^\\circ$)", latex: "complément de $a$ : $90^\\circ-a$ (ex. $90^\\circ-70^\\circ=20^\\circ$)" },
      { label: "Angles supplémentaires (total $180^\\circ$)", latex: "supplément de $a$ : $180^\\circ-a$ (ex. $180^\\circ-110^\\circ=70^\\circ$)" },
      { label: "Angles adjacents (côte à côte)", latex: "on **additionne** : $40^\\circ+50^\\circ=90^\\circ$" },
    ],
    reflexes: [
      { si: "« mesurer » ou « tracer » un angle", alors: "poser le rapporteur : centre sur le sommet, le $0$ sur un côté, puis lire/marquer les degrés" },
      { si: "« quel type ? » (aigu, droit, obtus, plat)", alors: "comparer à $90^\\circ$ et $180^\\circ$ : plus petit que $90^\\circ$ = aigu, entre les deux = obtus" },
      { si: "« complément » ou « supplément »", alors: "faire $90^\\circ-a$ pour le complément, $180^\\circ-a$ pour le supplément" },
      { si: "deux angles adjacents (qui se touchent)", alors: "additionner leurs mesures pour avoir l'angle total" },
    ],
    pieges: [
      "Mal placer le rapporteur : le centre doit être sur le **sommet** et le $0$ sur un côté, sinon la mesure lue est fausse.",
      "Confondre **complément** (total $90^\\circ$) et **supplément** (total $180^\\circ$) : pour $70^\\circ$, le complément est $20^\\circ$ mais le supplément est $110^\\circ$.",
      "Se tromper de famille : $100^\\circ$ est **obtus** (plus grand que $90^\\circ$), pas aigu ; $90^\\circ$ pile est **droit**.",
    ],
    reel: "Sur une horloge à Saint-Denis, à $3$ h la petite et la grande aiguille forment un quart de tour, soit un angle **droit** de $90^\\circ$.",
  },
  {
    id: "triangle_figure",
    emoji: "🔺",
    titre: "Triangles",
    domaine: "Espace et géométrie",
    essentiel:
      "Un **triangle** est une figure à **3 côtés**, **3 sommets** et **3 angles**. On le range selon sa **nature** : **isocèle** (deux côtés égaux), **équilatéral** (trois côtés égaux) ou **rectangle** (un angle droit). La règle clé de 5e : dans **tout** triangle, la **somme des trois angles vaut $180^\\circ$**.",
    formules: [
      { label: "Somme des angles d'un triangle", latex: "angle A $+$ angle B $+$ angle C $=180^\\circ$" },
      { label: "Trouver l'angle manquant", latex: "angle manquant $=180^\\circ-$ (somme des deux angles connus)" },
      { label: "Reconnaître la nature", latex: "isocèle $=2$ côtés égaux ; équilatéral $=3$ côtés égaux (et $3$ angles de $60^\\circ$) ; rectangle $=$ un angle de $90^\\circ$" },
      { label: "Peut-on construire le triangle ? (inégalité triangulaire)", latex: "oui si le plus grand côté $<$ somme des deux autres (ex. $2+3=5<8\\Rightarrow$ impossible)" },
      { label: "Angles de base d'un triangle isocèle", latex: "angle de base $=\\dfrac{180^\\circ-\\text{angle au sommet}}{2}$" },
    ],
    reflexes: [
      { si: "« quelle est la nature ? » avec une figure codée", alors: "lire les codages : $2$ côtés égaux → isocèle ; $3$ côtés égaux → équilatéral ; petit carré d'angle droit → rectangle" },
      { si: "« peut-on construire ce triangle ? » avec $3$ longueurs", alors: "comparer le plus grand côté à la somme des deux autres ; s'il est plus grand ou égal, c'est impossible" },
      { si: "on connaît deux angles et on cherche le troisième", alors: "calculer $180^\\circ-$ (somme des deux angles connus)" },
      { si: "triangle isocèle avec l'angle au sommet donné", alors: "les deux angles de base sont égaux : $(180^\\circ-\\text{sommet})\\div 2$" },
    ],
    pieges: [
      "Croire que la somme des angles vaut $360^\\circ$ : dans un triangle, elle vaut toujours $180^\\circ$.",
      "Oublier de vérifier la constructibilité : avec $2$ cm, $3$ cm et $8$ cm, comme $2+3=5<8$, le triangle est impossible.",
      "Dire qu'un triangle est rectangle parce qu'un côté est horizontal : il faut un angle de $90^\\circ$, l'orientation ne compte pas.",
    ],
    reel: "Sur un plan de randonnée à La Réunion, trois chemins forment un triangle : si deux angles mesurent $35^\\circ$ et $85^\\circ$, le troisième vaut $180^\\circ-35^\\circ-85^\\circ=60^\\circ$.",
  },
  {
    id: "sym_centrale",
    emoji: "🔄",
    titre: "Symétrie centrale",
    domaine: "Espace et géométrie",
    essentiel:
      "La **symétrie centrale** de centre $O$ est un **demi-tour** (rotation de $180^\\circ$) autour du point $O$. L'image $A'$ d'un point $A$ est de l'**autre côté** de $O$, à la même distance : $O$ est le **milieu** de $[AA']$, donc $A$, $O$, $A'$ sont **alignés**. Elle **ne déforme rien** : elle conserve les longueurs, les angles et l'aire.",
    formules: [
      { label: "Image d'un point (règle de base)", latex: "$A$, $O$, $A'$ alignés et $O$ milieu de $[AA']$, donc $OA=OA'$" },
      { label: "Coordonnées de l'image dans un repère", latex: "$x'=2\\times x_O - x$ ; $y'=2\\times y_O - y$ (ex. $O(4;4)$, $A(1;2)\\to A'(7;6)$)" },
      { label: "Image d'une figure", latex: "on construit l'image de chaque sommet ($A\\to A'$, $B\\to B'$…), puis on relie $A'B'C'$" },
      { label: "Ce qui est conservé", latex: "les longueurs, les angles, l'alignement, le parallélisme et l'aire" },
      { label: "Point invariant", latex: "seul le centre ne bouge pas : l'image de $O$ est $O$" },
    ],
    reflexes: [
      { si: "« construire l'image d'un point $A$ »", alors: "tracer la droite $(AO)$, puis reporter $OA$ de l'autre côté de $O$ pour que $OA'=OA$" },
      { si: "« image d'un triangle / polygone »", alors: "construire l'image de chaque sommet, puis relier les images dans le même ordre" },
      { si: "« retrouver le centre $O$ »", alors: "$O$ est le milieu de $[AA']$, entre un point et son image" },
      { si: "on demande une longueur, un angle ou une aire de l'image", alors: "c'est identique à la figure de départ (la symétrie conserve tout)" },
    ],
    pieges: [
      "Confondre symétrie **centrale** (un demi-tour autour d'un point) et symétrie **axiale** (un miroir avec un axe) : ici c'est un centre, pas un axe.",
      "Placer $A'$ à la bonne distance de $O$ mais oublier l'alignement : $A$, $O$ et $A'$ doivent être **alignés**.",
      "Croire que le centre bouge : $O$ est **invariant**, son image est $O$ lui-même.",
    ],
    reel: "Sur un motif de carrelage à Saint-Pierre, un point $A$ est à $3$ cm du centre $O$ : son image $A'$ est aussi à $3$ cm de $O$, mais de l'autre côté, alignée avec $A$ et $O$.",
  },
  {
    id: "aire_surface",
    emoji: "🟦",
    titre: "Aires",
    domaine: "Grandeurs et mesures",
    essentiel:
      "L'**aire** mesure la **surface** occupée par une figure (son **intérieur**), à ne pas confondre avec le **périmètre** (le tour). Elle s'exprime dans une **unité carrée** comme cm² ou m². Chaque forme a **sa formule**, et une figure compliquée se **découpe** en formes simples.",
    formules: [
      { label: "Aire d'un rectangle", latex: "$\\text{longueur}\\times\\text{largeur}$ (ex. $6\\times 4=24$, en cm²)" },
      { label: "Aire d'un triangle (attention au ÷ 2)", latex: "$\\dfrac{\\text{base}\\times\\text{hauteur}}{2}$ (ex. $8\\times 5\\div 2=20$)" },
      { label: "Aire d'un parallélogramme (pas de ÷ 2)", latex: "$\\text{base}\\times\\text{hauteur}$ (ex. $8\\times 5=40$)" },
      { label: "Figure composée", latex: "on la découpe en formes simples, puis on additionne les aires trouvées" },
      { label: "L'unité d'une aire", latex: "une unité de longueur au carré : $\\text{cm}^2$, $\\text{m}^2$, $\\text{km}^2$" },
    ],
    reflexes: [
      { si: "on te demande l'aire d'un triangle", alors: "faire base $\\times$ hauteur, puis $\\div 2$ (ne jamais oublier le $\\div 2$)" },
      { si: "on te demande l'aire d'un parallélogramme", alors: "faire base $\\times$ hauteur, SANS diviser par $2$" },
      { si: "la figure est bizarre (en forme de L, avec un morceau en plus)", alors: "la découper en rectangles et triangles, calculer chaque aire, puis additionner" },
      { si: "on compte sur un quadrillage", alors: "compter les carreaux de l'intérieur : chaque carreau $=1$ unité d'aire" },
    ],
    pieges: [
      "Confondre aire et périmètre : additionner tous les côtés donne le périmètre (le tour), PAS l'aire (l'intérieur).",
      "Oublier le $\\div 2$ du triangle : base $8$ cm et hauteur $5$ cm donnent $8\\times 5\\div 2=20$ cm², et non $40$.",
      "Prendre le côté oblique au lieu de la hauteur : la hauteur doit être perpendiculaire à la base ; le côté penché ne compte pas.",
    ],
    reel: "Pour carreler une terrasse rectangulaire de $4$ m sur $3$ m à Saint-Pierre, on calcule son aire $4\\times 3=12$ m² : il faut donc prévoir $12$ m² de carrelage.",
  },
  {
    id: "volume_solide",
    emoji: "📦",
    titre: "Volumes",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Le **volume** mesure la place qu'un solide occupe dans l'espace ; il s'exprime en **unités cubes** (cm³, dm³, m³). Pour un **pavé droit**, on multiplie les **trois dimensions**. Pour un **prisme droit** ou un **cylindre**, on multiplie l'**aire de base** par la **hauteur**.",
    formules: [
      { label: "Volume d'un pavé droit", latex: "$V = L\\times l\\times h$ (ex. $6\\times 4\\times 3 = 72$ cm³)" },
      { label: "Volume d'un prisme droit ou d'un cylindre", latex: "$V = \\text{aire de base}\\times h$" },
      { label: "Aire de base d'un cylindre (disque)", latex: "aire $=\\pi\\times r^2$ (ex. $r=3$ : $\\pi\\times 3^2 = 9\\pi$ cm²)" },
      { label: "Volume d'un assemblage (on additionne)", latex: "$V_{\\text{total}} = V_1 + V_2$" },
      { label: "Unités de volume", latex: "$1$ L $=1$ dm³ ; $1$ dm³ $=1\\,000$ cm³ ; $1$ m³ $=1\\,000$ L" },
    ],
    reflexes: [
      { si: "un pavé droit (une boîte, un carton)", alors: "multiplier les trois dimensions : $V=L\\times l\\times h$" },
      { si: "un prisme droit ou un cylindre", alors: "faire aire de base $\\times$ hauteur ; pour un cylindre, base $=\\pi\\times r^2$" },
      { si: "un solide en plusieurs morceaux (assemblage)", alors: "calculer chaque volume, puis les additionner" },
      { si: "changer d'unité (L, dm³, cm³, m³)", alors: "utiliser $1$ L $=1$ dm³ et $1$ dm³ $=1\\,000$ cm³" },
    ],
    pieges: [
      "Additionner les dimensions du pavé au lieu de les multiplier : $5\\times 4\\times 3 = 60$ cm³, et non $5+4+3=12$.",
      "Cylindre : oublier le carré du rayon. $V=\\pi\\times r^2\\times h$, pas $\\pi\\times r\\times h$ ; et le rayon vaut la moitié du diamètre.",
      "Convertir comme une longueur : $1$ dm³ $=1\\,000$ cm³ (car $10\\times 10\\times 10$), et non $10$ cm³.",
    ],
    reel: "Une cuve d'eau de pluie à La Réunion, en forme de pavé de $2$ m $\\times 1$ m $\\times 0{,}5$ m, a un volume de $2\\times 1\\times 0{,}5 = 1$ m³, soit $1\\,000$ L d'eau stockée.",
  },
  {
    id: "stat_statistique",
    emoji: "📊",
    titre: "Statistiques",
    domaine: "Statistiques et probabilités",
    essentiel:
      "Les **statistiques** servent à organiser et résumer des données. L'**effectif** compte combien de fois une valeur apparaît ; la **fréquence** est sa part sur le total : $\\dfrac{\\text{effectif}}{\\text{effectif total}}$. On lit les données dans un **tableau** ou un **graphique** (barres, circulaire), et on résume la série par sa **moyenne**.",
    formules: [
      { label: "Effectif d'une valeur", latex: "c'est le nombre de fois qu'elle apparaît (ex. rouge, bleu, rouge $\\to$ effectif de rouge $=2$)" },
      { label: "Effectif total", latex: "on additionne tous les effectifs (ex. $8+6+4=18$)" },
      { label: "Fréquence (part sur le total)", latex: "$f=\\dfrac{\\text{effectif}}{\\text{effectif total}}$ (ex. $\\dfrac{10}{25}=0{,}4$), toujours entre $0$ et $1$" },
      { label: "Fréquence en pourcentage", latex: "on multiplie par $100$ (ex. $0{,}4=40\\,\\%$)" },
      { label: "Moyenne", latex: "$\\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs}}$ (ex. $\\dfrac{10+12+14}{3}=12$)" },
    ],
    reflexes: [
      { si: "« combien de fois… » ou « effectif de… »", alors: "compter les apparitions ; si on demande le « total », additionner tous les effectifs" },
      { si: "« quelle fréquence ? » ou « quel pourcentage ? »", alors: "diviser l'effectif par l'effectif total ; pour le %, multiplier par $100$" },
      { si: "« moyenne des notes/valeurs »", alors: "additionner toutes les valeurs, puis diviser par leur nombre" },
      { si: "« quel graphique choisir ? »", alors: "comparer des catégories $\\to$ diagramme en barres ; parts d'un tout $\\to$ diagramme circulaire" },
    ],
    pieges: [
      "Confondre effectif et fréquence : l'effectif est un comptage (un nombre entier), la fréquence est une part comprise entre $0$ et $1$.",
      "S'arrêter à la somme pour la moyenne : $10+12+14=36$ n'est PAS la moyenne ; il faut encore diviser par $3$ ($36\\div 3=12$).",
      "Annoncer une fréquence plus grande que $1$ : une part ne peut pas dépasser le total, donc on a toujours $f\\le 1$.",
    ],
    reel: "En SVT à Saint-Denis, une classe ramasse $12$ plastiques, $8$ verres et $10$ papiers : l'effectif total est $12+8+10=30$, et la fréquence du plastique vaut $\\dfrac{12}{30}=0{,}4$, soit $40\\,\\%$.",
  },
  {
    id: "proba_experience",
    emoji: "🎲",
    titre: "Probabilités",
    domaine: "Statistiques et probabilités",
    essentiel:
      "Une **expérience aléatoire** est une expérience dont on ne connaît pas le résultat à l'avance (lancer un dé, tirer une bille). Chaque résultat possible est une **issue** ; un **événement** peut regrouper plusieurs issues (ex. « pair » $=2,4,6$). La **probabilité** mesure la chance qu'un événement se produise : c'est un nombre entre $0$ et $1$, égal au nombre d'**issues favorables** divisé par le nombre d'**issues possibles**.",
    formules: [
      { label: "Probabilité (issues également possibles)", latex: "$P=\\dfrac{\\text{issues favorables}}{\\text{issues possibles}}$ (ex. dé : $P(3)=\\dfrac{1}{6}$)" },
      { label: "Une probabilité est toujours entre 0 et 1", latex: "$0\\le P\\le 1$ ; impossible $=0$, certain $=1$" },
      { label: "Équiprobabilité ($n$ issues, même chance)", latex: "chaque issue vaut $\\dfrac{1}{n}$ (dé : $\\dfrac{1}{6}$ ; pièce : $\\dfrac{1}{2}$)" },
      { label: "Tirage (billes, fruits) : voulus sur total", latex: "$\\dfrac{\\text{objets voulus}}{\\text{total}}$ (ex. $3$ rouges sur $5$ : $\\dfrac{3}{5}$)" },
    ],
    reflexes: [
      { si: "« quelle est la probabilité de… »", alors: "compter les issues favorables, puis les issues possibles, et écrire la fraction $\\dfrac{\\text{favorables}}{\\text{possibles}}$" },
      { si: "« dé équilibré », « pièce », « au hasard » avec des parts égales", alors: "c'est de l'équiprobabilité : chaque issue vaut $\\dfrac{1}{n}$" },
      { si: "« ne pas obtenir… »", alors: "compter les issues qui conviennent, puis $dfrac{\text{favorables}}{\text{possibles}}$" },
      { si: "on te parle d'« issue » ou d'« événement »", alors: "issue = un seul résultat ; événement = peut regrouper plusieurs issues (ex. « pair » $=2,4,6$)" },
    ],
    pieges: [
      "Confondre issue et événement : « obtenir un nombre pair » n'est pas UNE issue, c'est un événement qui regroupe $2$, $4$ et $6$.",
      "Se fier au mot au lieu de compter : la probabilité d'un nombre pair est $\\dfrac{3}{6}$ (issues $2,4,6$), et non $\\dfrac{2}{6}$.",
      "Donner une probabilité impossible : elle reste entre $0$ et $1$ ; une valeur comme $4$ est un effectif, jamais une probabilité.",
    ],
    reel: "Dans un panier créole avec $4$ mangues, $3$ ananas et $2$ letchis, soit $9$ fruits, prendre une mangue au hasard a une probabilité de $\\dfrac{4}{9}$.",
  },
  {
    id: "algo_programmation",
    emoji: "🐍",
    titre: "Algorithmique et programmation",
    domaine: "Algorithmique et programmation",
    essentiel:
      "Un **programme** est une suite d'**instructions** exécutées **dans l'ordre**, de haut en bas (une **séquence**). Une **variable** garde une valeur qu'on peut **modifier**. On peut **répéter** des blocs avec une **boucle** (« répéter … fois »), faire un **test** (**si … alors …**), traduire une **formule** en blocs et **calculer** la valeur d'une expression en remplaçant $x$ par un nombre.",
    formules: [
      { label: "Séquence : les blocs se lisent dans l'ordre", latex: "de haut en bas, à partir du drapeau vert : bloc $1$, puis $2$, puis $3$" },
      { label: "Variable : « mettre à » et « ajouter à »", latex: "« mettre score à $0$ » fixe la valeur ; « ajouter $5$ à score » donne $0+5=5$" },
      { label: "Boucle « répéter $n$ fois »", latex: "répéter $n$ fois « avancer de $p$ » $\\Rightarrow$ distance $=n\\times p$ (ex. $4\\times 20=80$)" },
      { label: "Calculer une expression (remplacer $x$)", latex: "on remplace $x$ par sa valeur, $\\times$ avant $+$ (ex. $x=4$ : $3\\times x+2=3\\times 4+2=14$)" },
      { label: "Test « si … alors … »", latex: "l'action n'est faite que si la condition est vraie (ex. si $note\\geq 10$ alors « dire Bravo »)" },
    ],
    reflexes: [
      { si: "on demande « dans quel ordre » ou la première action", alors: "lire les blocs de haut en bas, en partant du drapeau vert" },
      { si: "un bloc « répéter $n$ fois »", alors: "multiplier : effet total $=n\\times$ (effet d'un seul tour)" },
      { si: "« si $x$ vaut … » ou calculer une expression", alors: "remplacer chaque $x$ par sa valeur, puis calculer ($\\times$ avant $+$)" },
      { si: "on change un paramètre (distance, coefficient, nombre de répétitions)", alors: "refaire le calcul avec la NOUVELLE valeur, le reste ne bouge pas" },
    ],
    pieges: [
      "Croire que l'ordre des blocs n'a pas d'importance : « mettre score à $0$ » PUIS « ajouter $5$ » ne donne pas la même chose que l'inverse.",
      "Oublier les priorités : pour $x=4$, $3\\times x+2=14$ (et non $18$), car on multiplie AVANT d'ajouter.",
      "Confondre « ajouter $b$ à $x$ puis multiplier par $a$ » $=(x+b)\\times a$ avec $x+b\\times a$ : sans parenthèses, le résultat change.",
    ],
    reel: "Une caisse au marché de Saint-Pierre est un petit programme : elle demande le prix (**entrée**), calcule le total dans une variable, puis affiche la somme à rendre (**sortie**).",
  },
];

const BANQUES: Record<string, TutorBankItemV4[]> = {
  relatif_nombre: nombresRelatifsBank,
  relatif_operation: operationsRelatifsBank,
  fraction_nombre: fractionsBank,
  prop_proportionnalite: proportionnaliteBank,
  litteral_calcul: calculLitteralBank,
  angle_mesure: anglesBank,
  triangle_figure: trianglesBank,
  sym_centrale: symetrieCentraleBank,
  aire_surface: airesBank,
  volume_solide: volumesBank,
  stat_statistique: statistiquesBank,
  proba_experience: probabilitesBank,
  algo_programmation: algorithmiqueBank,
};

export const KIT_MATHS_CINQUIEME: KitData = {
  slug: "maths-cinquieme",
  titre: "Guide de survie · Maths 5e",
  baseline:
    "Les 13 chapitres du programme de 5e en 13 fiches : les formules qui sauvent, les réflexes, les pièges qui coûtent des points — et un test corrigé par chapitre. À imprimer, à glisser dans le classeur.",
  matiere: "maths",
  classeLabel: "Cinquième",
  coachClasse: "5e",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
