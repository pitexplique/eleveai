// ─── Guide de survie · Maths 6e (entrée au collège) ─────────────────────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/maths/6e/notions.ts
// - checklists     = micro-compétences de microSkills.ts (BO cycle 3)
// - test de survie = items "fixed" puisés dans les banques du coach
// Condensés écrits par 18 rédacteurs parallèles (workflow du 26/07) puis VÉRIFIÉS
// à la main contre le BO cycle 3 et les banques (exactitude des exemples, périmètre
// 6e strict — pas de débordement 5e, couverture des micros).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/6e/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { entiersBank } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";
import { decimauxBank } from "@/lib/tutor-v4/questionBank/6e/maths/decimaux.bank";
import { fractionsBank } from "@/lib/tutor-v4/questionBank/6e/maths/fractions.bank";
import { pourcentagesBank } from "@/lib/tutor-v4/questionBank/6e/maths/pourcentages.bank";
import { calculMentalBank } from "@/lib/tutor-v4/questionBank/6e/maths/calcul-mental.bank";
import { calculPoseBank } from "@/lib/tutor-v4/questionBank/6e/maths/calcul-pose.bank";
import { proportionnaliteBank } from "@/lib/tutor-v4/questionBank/6e/maths/proportionnalite.bank";
import { longueursBank } from "@/lib/tutor-v4/questionBank/6e/maths/longueurs.bank";
import { perimetresBank } from "@/lib/tutor-v4/questionBank/6e/maths/perimetres.bank";
import { airesBank } from "@/lib/tutor-v4/questionBank/6e/maths/aires.bank";
import { volumesBank } from "@/lib/tutor-v4/questionBank/6e/maths/volumes.bank";
import { anglesBank } from "@/lib/tutor-v4/questionBank/6e/maths/angles.bank";
import { trianglesBank } from "@/lib/tutor-v4/questionBank/6e/maths/triangles.bank";
import { quadrilateresBank } from "@/lib/tutor-v4/questionBank/6e/maths/quadrilateres.bank";
import { symetrieBank } from "@/lib/tutor-v4/questionBank/6e/maths/symetrie.bank";
import { donneesBank } from "@/lib/tutor-v4/questionBank/6e/maths/donnees.bank";
import { probabilitesBank } from "@/lib/tutor-v4/questionBank/6e/maths/probabilites.bank";
import { algorithmiqueBank } from "@/lib/tutor-v4/questionBank/6e/maths/algorithmique.bank";
import type { KitData, KitNotion } from "@/components/kit/types";

// Checklists + tests dérivés du coach (module partagé par tous les guides).
const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  {
    id: "entier_nombre",
    emoji: "🔢",
    titre: "Nombres entiers",
    domaine: "Nombres et calculs",
    essentiel:
      "Un **nombre entier** sert à **compter** ($12$ élèves) ou à **ranger** (le $3$ᵉ). Dans un nombre, chaque **chiffre** occupe une **place** : unités, dizaines, centaines, milliers... et cette place donne sa **valeur** (dans $352$, le $5$ vaut $50$). Pour **comparer**, on regarde d'abord **combien il y a de chiffres**, puis on compare chiffre par chiffre **de gauche à droite**.",
    formules: [
      { label: "Les rangs (de droite à gauche)", latex: "unités, dizaines, centaines, milliers, dizaines de mille..." },
      { label: "Valeur d'un chiffre selon sa place", latex: "dans $352$, le $5$ est au rang des dizaines : il vaut $50$" },
      { label: "Décomposer un nombre", latex: "$352 = 300 + 50 + 2$" },
      { label: "Comparer deux entiers", latex: "le plus de chiffres l'emporte ; à égalité, chiffre par chiffre de gauche à droite" },
      { label: "Encadrer entre deux dizaines", latex: "$40 < 47 < 50$" },
    ],
    reflexes: [
      { si: "« quel est le chiffre des dizaines (ou centaines) ? »", alors: "on compte les rangs depuis la droite : unités, puis dizaines, puis centaines" },
      { si: "comparer deux nombres", alors: "d'abord le nombre de chiffres ; à égalité, on compare de gauche à droite" },
      { si: "« décompose » ou « quelle est la valeur du chiffre... »", alors: "chaque chiffre vaut selon sa place : $300 + 50 + 2$" },
      { si: "« encadre entre deux dizaines (ou centaines) »", alors: "on cherche la dizaine (ou centaine) juste avant et juste après" },
    ],
    pieges: [
      "Confondre le **chiffre** et sa **valeur** : dans $352$, le chiffre des dizaines est $5$, mais il représente $50$.",
      "Comparer sans regarder les rangs : pour $2350$ et $2305$, les centaines sont égales, puis $5$ dizaines $> 0$ dizaine, donc $2350$ est le plus grand.",
      "Oublier un zéro en écrivant : « cinq mille soixante » s'écrit $5060$ (et non $560$), car il n'y a aucune centaine.",
    ],
    reel: "Le Piton des Neiges culmine à $3069$ m : on lit « trois mille soixante-neuf », soit $3$ milliers, $0$ centaine, $6$ dizaines et $9$ unités.",
  },
  {
    id: "decimal_nombre",
    emoji: "🪙",
    titre: "Nombres décimaux",
    domaine: "Nombres et calculs",
    essentiel:
      "Un **nombre décimal** a une **partie entière** et une **partie décimale**, séparées par une **virgule** ($3{,}47$). Juste après la virgule viennent les **dixièmes**, puis les **centièmes**, puis les **millièmes**. On peut ajouter des **zéros inutiles à droite** sans changer le nombre ($0{,}5 = 0{,}50$) : très pratique pour comparer et poser les calculs.",
    formules: [
      { label: "Les rangs après la virgule", latex: "dixièmes, centièmes, millièmes (dans $3{,}47$ : $4$ dixièmes, $7$ centièmes)" },
      { label: "Fraction sur $10$ et décimal", latex: "$7/10 = 0{,}7$ ($7$ dixièmes) ; $25/10 = 2{,}5$" },
      { label: "Comparer deux décimaux", latex: "d'abord la partie entière, puis rang par rang après la virgule" },
      { label: "Additionner ou soustraire (en colonnes)", latex: "on aligne les virgules l'une sous l'autre" },
      { label: "Multiplier ou diviser par un entier", latex: "$2{,}4 \\times 3 = 7{,}2$ ; $3{,}6 \\div 2 = 1{,}8$" },
    ],
    reflexes: [
      { si: "on te donne une fraction sur $10$ (ou $100$)", alors: "$7/10 = 0{,}7$, $23/100 = 0{,}23$ : autant de chiffres après la virgule que de zéros" },
      { si: "comparer deux décimaux", alors: "partie entière d'abord ; à égalité, compléter par des zéros et comparer rang par rang" },
      { si: "poser une addition ou une soustraction", alors: "aligner les virgules (ajouter des zéros si besoin, ex. $1{,}7 = 1{,}70$)" },
      { si: "multiplier ou diviser par un entier", alors: "compter en dixièmes : $4{,}8 \\div 4 = 48$ dixièmes $\\div 4 = 12$ dixièmes $= 1{,}2$" },
    ],
    pieges: [
      "Croire que $0{,}5 < 0{,}45$ parce que « $45 > 5$ » : on compare rang par rang, et $0{,}50 > 0{,}45$.",
      "Oublier d'aligner les virgules dans une addition posée : pour $3{,}45 + 1{,}7$, écris $1{,}70$ pour bien aligner.",
      "Un zéro à droite ne change rien ($0{,}5 = 0{,}50$), mais $0{,}05$ est différent : ici le zéro est ENTRE la virgule et le $5$.",
    ],
    reel: "Au marché de Saint-Pierre, un fruit à $2{,}5$ € coûte plus cher qu'un fruit à $2{,}45$ € car $2{,}50 > 2{,}45$.",
  },
  {
    id: "fraction_nombre",
    emoji: "🍕",
    titre: "Fractions",
    domaine: "Nombres et calculs",
    essentiel:
      "Une **fraction** partage un tout en **parts égales**. On écrit deux nombres séparés par un trait : en bas le **dénominateur** (le nombre total de parts), en haut le **numérateur** (le nombre de parts prises). Dans $\\frac{3}{4}$, on a **3 parts sur 4**.",
    formules: [
      { label: "Lire une fraction", latex: "$\\dfrac{\\text{parts prises}}{\\text{parts en tout}}$ : dans $\\frac{3}{4}$, 3 parts sur 4" },
      { label: "Fraction d'une quantité", latex: "la moitié de 10 = $10 \\div 2 = 5$ ; le quart de 20 = $20 \\div 4 = 5$" },
      { label: "Fractions à connaître en décimal", latex: "$\\frac{1}{2}=0{,}5$ ; $\\frac{1}{4}=0{,}25$ ; $\\frac{3}{4}=0{,}75$ ; $\\frac{1}{5}=0{,}2$" },
      { label: "Comparer avec le même dénominateur", latex: "on compare les numérateurs : $\\frac{3}{5} > \\frac{1}{5}$" },
    ],
    reflexes: [
      { si: "« ... parts sur ... parts égales », colorier une figure", alors: "le nombre du haut = parts prises, le nombre du bas = parts en tout" },
      { si: "« la moitié de », « le quart de », « les $\\frac{2}{3}$ de »", alors: "je divise par le nombre du bas, puis je multiplie par le nombre du haut" },
      { si: "on demande une écriture décimale", alors: "je repère la fraction connue : $\\frac{1}{2}=0{,}5$, $\\frac{1}{4}=0{,}25$, $\\frac{3}{4}=0{,}75$" },
      { si: "comparer deux fractions qui ont le même dénominateur", alors: "la plus grande est celle qui a le plus grand numérateur" },
    ],
    pieges: [
      "Croire que $\\frac{1}{4}$ est plus grand que $\\frac{1}{2}$ parce que « 4 est plus grand que 2 » : plus on partage en parts, plus chaque part est petite, donc $\\frac{1}{4} < \\frac{1}{2}$.",
      "Confondre le haut et le bas : dans $\\frac{2}{5}$, on prend 2 parts, pas 5.",
      "Oublier que les parts doivent être ÉGALES : une figure coupée en morceaux inégaux ne sert pas à lire une fraction.",
    ],
    reel: "Une pizza est coupée en 8 parts égales à Saint-Pierre ; si tu en manges 4, tu as mangé $\\frac{4}{8}$, c'est-à-dire la moitié de la pizza.",
  },
  {
    id: "pourcentage_nombre",
    emoji: "💯",
    titre: "Pourcentages",
    domaine: "Nombres et calculs",
    essentiel:
      "Un **pourcentage** ($t\\,\\%$), c'est une part **sur 100** : $25\\,\\%$ veut dire **$25$ sur $100$**. On peut l'écrire en **fraction** ($\\frac{25}{100}$) ou en **décimal** ($0{,}25$). Sur un groupe de $100$, le pourcentage donne **directement le nombre** : $30\\,\\%$ de $100$ élèves, c'est **$30$ élèves**.",
    formules: [
      { label: "Le sens du symbole $\\%$", latex: "$t\\,\\% = t$ sur $100 = \\dfrac{t}{100}$ (par exemple $25\\,\\% = \\dfrac{25}{100}$)" },
      { label: "Passer en décimal (diviser par $100$)", latex: "$50\\,\\% = 0{,}5$ ; $25\\,\\% = 0{,}25$ ; $10\\,\\% = 0{,}1$" },
      { label: "Les pourcentages à connaître par coeur", latex: "$50\\,\\% =$ la moitié, $25\\,\\% =$ le quart, $10\\,\\% =$ le dixième" },
      { label: "Sur un groupe de $100$", latex: "le pourcentage donne le nombre : $40\\,\\%$ de $100 = 40$" },
    ],
    reflexes: [
      { si: "tu vois le symbole $\\%$", alors: "lis « sur $100$ » : $t\\,\\%$, c'est $t$ sur $100$" },
      { si: "on demande $50\\,\\%$, $25\\,\\%$ ou $10\\,\\%$ d'un nombre", alors: "prends la moitié, le quart ou le dixième" },
      { si: "on part d'un groupe de $100$", alors: "le pourcentage EST le nombre : $15\\,\\%$ de $100 = 15$" },
      { si: "on demande la fraction ou le décimal", alors: "écris sur $100$ : $t\\,\\% = \\dfrac{t}{100}$, puis en décimal on divise par $100$" },
    ],
    pieges: [
      "Oublier que $\\%$ veut dire « sur $100$ » : $30\\,\\%$, c'est $\\frac{30}{100}$, pas $\\frac{30}{10}$ ni $\\frac{30}{1000}$.",
      "Se tromper en passant en décimal : $5\\,\\% = 0{,}05$ (et non $0{,}5$), car $5\\,\\% = \\frac{5}{100}$.",
      "Croire que « le pourcentage » et « le nombre d'objets » sont pareils quand le groupe n'a pas $100$ éléments : $50\\,\\%$ de $18$ vaut $9$, pas $50$.",
    ],
    reel: "Pendant les soldes à Saint-Pierre, une paire de sandales à $20$ € affiche $-50\\,\\%$ : on enlève la moitié, donc elle coûte $20 \\div 2 = 10$ €.",
  },
  {
    id: "entier_calcul_mental",
    emoji: "🧠",
    titre: "Calcul mental",
    domaine: "Nombres et calculs",
    essentiel:
      "Le **calcul mental**, c'est trouver un résultat **sans poser l'opération** et sans calculatrice. On ne calcule pas au hasard : on **choisit une astuce** (passer par la dizaine, arrondir puis corriger, utiliser les tables, décaler la virgule). Plus on connaît ses **tables de multiplication**, plus c'est rapide.",
    formules: [
      { label: "Passer par la dizaine (addition)", latex: "$68 + 7$ : d'abord $68 + 2 = 70$, puis $+ 5 = 75$" },
      { label: "Arrondir puis corriger (soustraction)", latex: "$121 - 38$ : $121 - 40 = 81$, puis $+ 2 = 83$" },
      { label: "Multiplier ou diviser par $10$, $100$", latex: "on décale la virgule ($4{,}23 \\times 10 = 42{,}3$ ; $645 \\div 10 = 64{,}5$)" },
      { label: "Multiplier par $5$", latex: "$\\times 10$ puis prendre la moitié ($18 \\times 5 = 90$)" },
      { label: "Double, moitié, quart", latex: "$\\times 2$, $\\div 2$, $\\div 4$ (double de $35 = 70$)" },
    ],
    reflexes: [
      { si: "un des nombres est proche d'une dizaine ou d'une centaine ($99$, $38$…)", alors: "arrondir, calculer, puis corriger ($99 + 47 = 100 + 47 - 1 = 146$)" },
      { si: "multiplier ou diviser par $10$, $100$, $1000$", alors: "décaler la virgule d'autant de rangs (jamais « ajouter un zéro » à un décimal)" },
      { si: "une division comme $56 \\div 8$", alors: "chercher dans la table : quel nombre $\\times 8 = 56$ ? C'est $7$" },
      { si: "« le double », « la moitié », « le quart »", alors: "$\\times 2$, $\\div 2$, $\\div 4$" },
    ],
    pieges: [
      "Arrondir mais oublier de corriger : pour $121 - 38$, on enlève $40$ puis on rajoute $2$ (résultat $83$), on ne s'arrête pas à $81$.",
      "« Ajouter un zéro » pour multiplier un décimal par $10$ : $4{,}23 \\times 10 = 42{,}3$, et non $4{,}230$. On décale la virgule.",
      "Confondre le double ($\\times 2$) et la moitié ($\\div 2$).",
    ],
    reel: "Pour payer $4$ crêpes à $5$ € sur un stand à Saint-Pierre, on calcule de tête $4 \\times 5 = 20$ €, sans poser l'opération.",
  },
  {
    id: "entier_calcul_pose",
    emoji: "✏️",
    titre: "Calcul posé",
    domaine: "Nombres et calculs",
    essentiel:
      "**Poser un calcul**, c'est écrire les nombres **en colonnes** pour calculer les grands nombres sans se tromper. La règle d'or : **on aligne les chiffres de même rang** (unités sous unités, dizaines sous dizaines). On calcule **colonne par colonne**, en pensant aux **retenues**, puis on **vérifie** le résultat.",
    formules: [
      { label: "Addition et soustraction posées", latex: "on aligne les unités sous les unités, puis on calcule colonne par colonne" },
      { label: "Multiplication par un chiffre", latex: "on multiplie chaque chiffre par le chiffre du bas, en reportant les retenues" },
      { label: "Multiplier par $10$ ou $100$", latex: "pour un entier, on ajoute un ou deux zéros ($23 \\times 10 = 230$)" },
      { label: "Division euclidienne", latex: "dividende $=$ diviseur $\\times$ quotient $+$ reste, avec reste $<$ diviseur" },
      { label: "Vérifier avec l'opération inverse", latex: "$37 = 5 \\times 7 + 2$ vérifie que $37 \\div 5 = 7$ reste $2$" },
    ],
    reflexes: [
      { si: "« calcule », « pose l'opération » sur de grands nombres", alors: "on écrit en colonnes et on aligne les chiffres de même rang" },
      { si: "« partager », « répartir », un reste, un quotient", alors: "c'est une division : reste $=$ dividende $-$ diviseur $\\times$ quotient, et reste $<$ diviseur" },
      { si: "« vérifie ton calcul »", alors: "on utilise l'opération inverse (l'addition vérifie la soustraction, la multiplication vérifie la division)" },
      { si: "un résultat semble bizarre", alors: "on estime d'abord un ordre de grandeur ($198 \\times 4$ proche de $200 \\times 4 = 800$)" },
    ],
    pieges: [
      "Oublier une retenue : elle change toute la colonne suivante et rend le résultat faux.",
      "Écrire un reste plus grand ou égal au diviseur : le reste doit toujours être **plus petit** que le diviseur ($47 \\div 5$ ne peut pas faire reste $7$).",
      "Mal aligner les chiffres : les unités doivent être sous les unités, sinon on additionne des rangs différents.",
    ],
    reel: "Au marché de Saint-Pierre, un vendeur écoule $126$ mangues le matin et $248$ l'après-midi : en posant l'addition, $126 + 248 = 374$ mangues au total.",
  },
  {
    id: "prop_proportionnalite",
    emoji: "⚖️",
    titre: "Proportionnalité",
    domaine: "Fonctions et proportionnalité",
    essentiel:
      "Deux grandeurs sont **proportionnelles** quand on **multiplie toujours par le même nombre** : si la quantité est $\\times 3$, le prix est aussi $\\times 3$. Le **coefficient**, c'est le prix pour **un seul** objet. L'astuce reine, c'est de **passer à l'unité** (trouver le prix de $1$), puis de multiplier.",
    formules: [
      { label: "Passer à l'unité (prix de 1)", latex: "prix d'un objet $=$ prix total $\\div$ nombre d'objets" },
      { label: "Coefficient de proportionnalité", latex: "c'est le prix pour $1$ seul objet (le prix à l'unité)" },
      { label: "Compléter un tableau", latex: "on multiplie les DEUX lignes par le même nombre" },
      { label: "Trouver un prix", latex: "prix d'un objet $\\times$ nombre d'objets" },
      { label: "Reconnaître", latex: "si la quantité est $\\times 3$, le prix doit être aussi $\\times 3$" },
    ],
    reflexes: [
      { si: "« si on double la quantité, le prix double », le même coefficient partout", alors: "c'est proportionnel ; si le prix ne suit pas, ce n'est pas proportionnel" },
      { si: "on connaît le prix de plusieurs objets et on cherche celui d'un seul", alors: "on divise : c'est le passage à l'unité" },
      { si: "on connaît le prix de $1$ et on veut le prix de plusieurs", alors: "on multiplie le prix d'un objet par la quantité" },
      { si: "compléter un tableau de proportionnalité", alors: "chercher par combien on multiplie une ligne, appliquer le même nombre à l'autre" },
    ],
    pieges: [
      "Dire « c'est proportionnel » sans vérifier : si on double la quantité mais que le prix ne double pas exactement, ce n'est PAS proportionnel.",
      "Vouloir passer de $4$ objets à $7$ objets d'un coup : il faut d'abord trouver le prix de $1$ (passage à l'unité), puis multiplier par $7$.",
      "Ne multiplier qu'une seule ligne du tableau : dans un tableau de proportionnalité, on multiplie les deux lignes par le même nombre.",
    ],
    reel: "Au marché de Saint-Pierre, si $3$ mangues coûtent $6$ €, alors $1$ mangue coûte $6 \\div 3 = 2$ €, et $5$ mangues coûtent $5 \\times 2 = 10$ €.",
  },
  {
    id: "aire_longueur",
    emoji: "📏",
    titre: "Longueurs",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Une **longueur**, c'est une **distance** ou la **taille** d'un objet. On la mesure avec une **règle** et on choisit une **unité** adaptée : le **mm** pour ce qui est très fin, le **cm** ou le **m** pour les objets, le **km** pour les grandes distances. Pour **comparer** ou **calculer**, on met toujours les longueurs dans la **même unité**.",
    formules: [
      { label: "Les unités, de la plus grande à la plus petite", latex: "km, m, dm, cm, mm" },
      { label: "Les relations à connaître", latex: "$1$ km $= 1000$ m ; $1$ m $= 100$ cm ; $1$ cm $= 10$ mm" },
      { label: "Convertir vers une unité plus petite (m $\\to$ cm)", latex: "on multiplie ($2$ m $= 2 \\times 100 = 200$ cm)" },
      { label: "Convertir vers une unité plus grande (cm $\\to$ m)", latex: "on divise ($300$ cm $= 300 \\div 100 = 3$ m)" },
      { label: "Comparer deux longueurs", latex: "on les met dans la même unité, puis on compare les nombres" },
    ],
    reflexes: [
      { si: "« quelle unité pour mesurer... »", alors: "petit objet $\\to$ mm ou cm ; grande distance $\\to$ m ou km" },
      { si: "convertir vers une unité plus petite (m vers cm)", alors: "on multiplie par $10$, $100$ ou $1000$" },
      { si: "comparer deux longueurs dans des unités différentes", alors: "tout convertir dans la même unité, puis comparer les nombres" },
      { si: "un problème (ajouter, couper, partager)", alors: "même unité d'abord, puis additionner, soustraire ou diviser" },
    ],
    pieges: [
      "Comparer $2$ m et $150$ cm en regardant juste les nombres : $2$ m $= 200$ cm, donc $2$ m est plus grand que $150$ cm.",
      "Se tromper de sens : de m vers cm on MULTIPLIE ; de cm vers m on DIVISE.",
      "Additionner des longueurs sans les mettre dans la même unité : $2$ km $+ 1500$ m se calcule en mètres, $2000 + 1500 = 3500$ m.",
    ],
    reel: "Sur un sentier de La Réunion de $2$ km, après $1500$ m de marche il reste $2000 - 1500 = 500$ m à parcourir.",
  },
  {
    id: "aire_perimetre",
    emoji: "⭕",
    titre: "Périmètres",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Le **périmètre** d'une figure, c'est la **longueur de son contour** : on fait le tour et on **additionne toutes les longueurs**. C'est une longueur, donc en **cm, m ou km** (jamais en cm²). Pour le carré et le rectangle il y a une formule ; pour les autres figures, on additionne simplement tous les côtés.",
    formules: [
      { label: "Carré (côté $c$)", latex: "$P = 4 \\times c$ (les $4$ côtés sont égaux)" },
      { label: "Rectangle (longueur $L$, largeur $l$)", latex: "$P = 2 \\times (L + l)$" },
      { label: "Figure quelconque", latex: "on additionne tous les côtés, un par un" },
      { label: "Retrouver le côté d'un carré", latex: "$c = P \\div 4$" },
    ],
    reflexes: [
      { si: "« clôturer », « faire le tour », « longueur de grillage »", alors: "c'est un périmètre : on additionne le tour, en cm ou m" },
      { si: "un carré", alors: "$P = 4 \\times$ côté ; pour un rectangle : $P = 2 \\times (L+l)$" },
      { si: "une figure qui n'est ni carré ni rectangle (ou sur quadrillage)", alors: "additionner tous les côtés du contour, un par un" },
      { si: "on connaît le périmètre d'un carré", alors: "un côté vaut $P \\div 4$" },
    ],
    pieges: [
      "Confondre le périmètre (le tour, en cm) et l'aire (l'intérieur, en cm²) : pour un rectangle $8 \\times 3$, le périmètre vaut $22$ cm, pas $24$.",
      "Pour le rectangle, calculer $L + l$ au lieu de $2 \\times (L+l)$ : il y a DEUX longueurs et DEUX largeurs.",
      "Sur un quadrillage, compter des côtés à l'intérieur : seul le contour extérieur compte.",
    ],
    reel: "Pour poser du grillage autour d'un jardin rectangulaire de $8$ m sur $3$ m à Saint-Pierre, il faut $2 \\times (8+3) = 22$ m.",
  },
  {
    id: "aire_surface",
    emoji: "🟦",
    titre: "Aires",
    domaine: "Grandeurs et mesures",
    essentiel:
      "L'**aire** d'une figure, c'est la **surface qu'elle occupe**, tout **l'intérieur** (pas le tour). Une aire se mesure en **cm² ou m²**, jamais en cm. Pour le **rectangle** et le **carré** il y a une formule ; pour les autres figures, on **compte les carreaux** ou on **découpe** la figure en rectangles.",
    formules: [
      { label: "Rectangle (longueur $L$, largeur $l$)", latex: "$A = L \\times l$ (longueur fois largeur)" },
      { label: "Carré (côté $c$)", latex: "$A = c \\times c$ (le côté multiplié par lui-même)" },
      { label: "Sur un quadrillage", latex: "on compte les carreaux unités ($1$ carreau $= 1$ unité d'aire)" },
      { label: "Figure composée (en L…)", latex: "on la découpe en rectangles, puis on additionne les aires" },
      { label: "Comparer deux aires", latex: "même unité, puis on compare les nombres" },
    ],
    reflexes: [
      { si: "un rectangle, une parcelle, une pièce", alors: "$A = L \\times l$ : on multiplie la longueur par la largeur" },
      { si: "un carré", alors: "$A = c \\times c$ : le côté multiplié par lui-même" },
      { si: "une figure sur quadrillage, « des carreaux »", alors: "on compte les carreaux unités remplis" },
      { si: "une figure en L, ni carré ni rectangle", alors: "on la découpe en rectangles et on additionne les aires" },
    ],
    pieges: [
      "Confondre l'aire (l'intérieur, en cm²) et le périmètre (le tour, en cm).",
      "Écrire une aire en cm au lieu de cm² : une aire se mesure toujours en unités carrées.",
      "Pour le rectangle, additionner $L + l$ au lieu de multiplier $L \\times l$.",
    ],
    reel: "Pour carreler une terrasse rectangulaire de $4$ m sur $3$ m à Saint-Pierre, il faut couvrir $4 \\times 3 = 12$ m² de carrelage.",
  },
  {
    id: "volume_solide",
    emoji: "📦",
    titre: "Volumes",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Le **volume** d'un solide, c'est la **place qu'il occupe dans l'espace** (en trois dimensions). Il se mesure en **unités cubes** : $\\mathrm{cm}^3$, $\\mathrm{m}^3$. Pour le trouver, on **compte les petits cubes** qui remplissent le solide, ou on multiplie les dimensions d'un pavé.",
    formules: [
      { label: "Unité de volume", latex: "en $\\mathrm{cm}^3$, $\\mathrm{m}^3$ (le petit $3$ = trois dimensions : longueur, largeur, hauteur)" },
      { label: "Compter les cubes", latex: "volume = nombre de petits cubes unités ($1$ cube $= 1$ unité de volume)" },
      { label: "Assembler deux solides", latex: "on additionne les volumes ($4$ cubes $+ 3$ cubes $= 7$ cubes)" },
      { label: "Pavé droit (longueur $L$, largeur $l$, hauteur $h$)", latex: "$V = L \\times l \\times h$ (cube : arête $\\times$ arête $\\times$ arête)" },
      { label: "Comparer deux volumes", latex: "même unité, on compare les nombres (le plus grand nombre = le plus grand volume)" },
    ],
    reflexes: [
      { si: "« combien de petits cubes », « remplir la boîte »", alors: "on compte les cubes : chaque petit cube vaut $1$ unité de volume" },
      { si: "on colle, on réunit ou on assemble deux solides", alors: "on additionne leurs volumes" },
      { si: "un pavé droit (ou une boîte) avec longueur, largeur et hauteur", alors: "on multiplie : $V = L \\times l \\times h$" },
      { si: "comparer deux volumes donnés dans la même unité", alors: "on compare simplement les nombres" },
    ],
    pieges: [
      "Confondre les unités : une longueur est en cm, une aire en $\\mathrm{cm}^2$, un volume en $\\mathrm{cm}^3$ (le petit $3$ = trois dimensions).",
      "Pour un pavé droit, additionner $L + l + h$ au lieu de multiplier $L \\times l \\times h$.",
      "Croire que deux solides de formes différentes ont forcément des volumes différents : s'ils ont le même nombre de cubes, ils ont le même volume.",
    ],
    reel: "Pour remplir une boîte de $5$ cm sur $3$ cm sur $2$ cm avec des cubes de sucre de $1\\,\\mathrm{cm}^3$, il en faut $5 \\times 3 \\times 2 = 30$.",
  },
  {
    id: "angle_mesure",
    emoji: "📐",
    titre: "Angles",
    domaine: "Espace et géométrie",
    essentiel:
      "Un **angle**, c'est l'**ouverture** entre **deux demi-droites** qui partent d'un même point : ce point s'appelle le **sommet**. On mesure un angle en **degrés** ($^\\circ$) avec un **rapporteur**. L'angle de référence, c'est l'**angle droit**, qui mesure toujours $90^\\circ$ (le coin d'une feuille).",
    formules: [
      { label: "Ce qu'est un angle", latex: "deux demi-droites qui partent du même point ; ce point est le **sommet**" },
      { label: "Angle droit", latex: "$90^\\circ$ (le coin d'un carré, d'un rectangle, d'une feuille)" },
      { label: "Comparer deux angles", latex: "on compare leurs mesures : plus de degrés $=$ angle plus ouvert" },
      { label: "Rapporteur", latex: "on mesure et on trace en degrés ; le centre du rapporteur va sur le sommet" },
      { label: "Se repérer", latex: "aigu $< 90^\\circ <$ obtus ; l'angle plat mesure $180^\\circ$" },
    ],
    reflexes: [
      { si: "on parle de l'ouverture entre deux traits qui partent du même point", alors: "c'est un angle ; ce point commun s'appelle le sommet" },
      { si: "il faut mesurer ou tracer un angle", alors: "on prend le rapporteur et on lit la mesure en degrés ($^\\circ$)" },
      { si: "comparer deux angles donnés en degrés", alors: "le plus grand est celui qui a le plus de degrés ($80^\\circ > 30^\\circ$)" },
      { si: "comparer un angle à un angle droit", alors: "moins de $90^\\circ$ = plus petit ; $90^\\circ$ = droit ; plus de $90^\\circ$ = plus grand" },
    ],
    pieges: [
      "Croire qu'un angle est plus grand parce que ses côtés sont plus longs : c'est l'ouverture qui compte, pas la longueur des traits.",
      "Poser le rapporteur n'importe comment : le centre du rapporteur doit être sur le sommet, et un côté sur le $0$.",
      "Lire la mauvaise graduation : le rapporteur a deux échelles (de $0$ à $180$ et de $180$ à $0$) ; il faut partir du côté placé sur le $0$.",
    ],
    reel: "Quand tu ouvres une paire de ciseaux ou un compas, les branches forment un angle : plus tu ouvres, plus l'angle grandit, même si les branches gardent la même longueur.",
  },
  {
    id: "triangle_figure",
    emoji: "🔺",
    titre: "Triangles",
    domaine: "Espace et géométrie",
    essentiel:
      "Un **triangle** est une figure à **3 côtés**, **3 sommets** et **3 angles**. On le **nomme par ses trois sommets** : le **triangle $ABC$**. On le range selon ses **côtés** (isocèle, équilatéral) ou selon ses **angles** (rectangle). Dans **tous** les triangles, la **somme des trois angles vaut $180^\\circ$**.",
    formules: [
      { label: "Nommer un triangle", latex: "$3$ sommets, $3$ côtés : on l'appelle triangle $ABC$ (les côtés sont $[AB]$, $[BC]$, $[CA]$)" },
      { label: "Type selon les côtés", latex: "$2$ côtés égaux $\\rightarrow$ isocèle ; $3$ côtés égaux $\\rightarrow$ équilatéral" },
      { label: "Type selon les angles", latex: "un angle droit ($90^\\circ$) $\\rightarrow$ triangle rectangle" },
      { label: "Somme des angles", latex: "la somme des trois angles vaut toujours $180^\\circ$ ; angle manquant $= 180^\\circ$ moins les deux autres" },
      { label: "Triangle possible ?", latex: "possible si la somme de deux côtés est plus grande que le troisième" },
    ],
    reflexes: [
      { si: "« deux côtés égaux » ou un même codage sur deux côtés", alors: "c'est un triangle isocèle ; si les trois côtés sont égaux, il est équilatéral" },
      { si: "un petit carré ou « angle droit » dans le triangle", alors: "c'est un triangle rectangle" },
      { si: "on connaît deux angles et on cherche le troisième", alors: "faire $180^\\circ$ moins les deux angles connus" },
      { si: "on donne trois longueurs et on demande si le triangle existe", alors: "vérifier que la somme des deux plus petits côtés dépasse le plus grand" },
    ],
    pieges: [
      "Confondre côté et sommet : dans le triangle $ABC$, les sommets sont $A$, $B$, $C$ (des points) et les côtés sont $[AB]$, $[BC]$, $[CA]$ (des segments).",
      "Oublier que la somme des angles vaut $180^\\circ$ (et croire que c'est $90^\\circ$ ou $360^\\circ$).",
      "Croire qu'on peut toujours faire un triangle avec trois longueurs : si la somme de deux côtés n'est pas plus grande que le troisième (ex. $2+3 < 6$), c'est impossible.",
    ],
    reel: "Le panneau routier « danger » que l'on voit sur la route de Cilaos est un triangle équilatéral : ses trois côtés ont la même longueur.",
  },
  {
    id: "quadrilatere_figure",
    emoji: "🔷",
    titre: "Quadrilatères",
    domaine: "Espace et géométrie",
    essentiel:
      "Un **quadrilatère** est une figure à **$4$ côtés** et **$4$ sommets**. Certains ont un nom spécial selon leurs propriétés : le **rectangle** ($4$ angles droits), le **losange** ($4$ côtés égaux), le **carré** (les deux à la fois) et le **parallélogramme** (côtés opposés parallèles). Pour reconnaître la figure, on lit les **codages** du dessin : petits carrés (angles droits), traits (côtés égaux), flèches (côtés parallèles).",
    formules: [
      { label: "Rectangle", latex: "$4$ angles droits (les côtés opposés sont égaux)" },
      { label: "Losange", latex: "$4$ côtés égaux" },
      { label: "Carré", latex: "$4$ angles droits ET $4$ côtés égaux (rectangle et losange à la fois)" },
      { label: "Parallélogramme", latex: "les côtés opposés sont parallèles deux à deux" },
      { label: "Les diagonales", latex: "elles relient deux sommets opposés ; un quadrilatère en a $2$" },
    ],
    reflexes: [
      { si: "on voit « $4$ angles droits » (petits carrés codés)", alors: "c'est un rectangle ; si en plus les $4$ côtés sont égaux, c'est un carré" },
      { si: "on voit « $4$ côtés égaux » sans aucun angle droit", alors: "c'est un losange" },
      { si: "les côtés opposés sont parallèles deux à deux", alors: "c'est un parallélogramme" },
      { si: "on doit nommer la figure", alors: "on donne les $4$ sommets dans l'ordre autour du contour (ABCD)" },
    ],
    pieges: [
      "Confondre carré et losange : les deux ont $4$ côtés égaux, mais seul le carré a aussi $4$ angles droits.",
      "Confondre carré et rectangle : les deux ont $4$ angles droits, mais seul le carré a ses $4$ côtés égaux.",
      "Confondre une diagonale (qui relie deux sommets opposés) et un côté (le bord de la figure).",
    ],
    reel: "Sur le sol d'une case à Saint-Pierre, un carreau carré a ses $4$ côtés égaux et ses $4$ angles droits ; une porte, elle, est un rectangle : $4$ angles droits mais plus haute que large.",
  },
  {
    id: "sym_axiale",
    emoji: "🪞",
    titre: "Symétrie axiale",
    domaine: "Espace et géométrie",
    essentiel:
      "La **symétrie axiale**, c'est le **reflet dans un miroir** : le miroir est une droite appelée l'**axe**. L'image d'un point $A$ se note $A'$ ; elle est de l'**autre côté de l'axe, à la même distance**. La symétrie **ne déforme rien** : la figure et son image ont la même forme et la même taille.",
    formules: [
      { label: "Image d'un point $A$", latex: "on place $A'$ de l'autre côté de l'axe, à la même distance" },
      { label: "Propriété clé (l'axe est la médiatrice de $[AA']$)", latex: "$[AA']$ est perpendiculaire à l'axe, et l'axe coupe $[AA']$ en son milieu" },
      { label: "Image d'une figure", latex: "on construit l'image de chaque sommet, puis on relie les points" },
      { label: "Ce que la symétrie conserve", latex: "les longueurs, les angles et les aires (donc aussi le périmètre)" },
      { label: "Nombre d'axes", latex: "carré : $4$ ; rectangle non carré : $2$ ; triangle équilatéral : $3$" },
    ],
    reflexes: [
      { si: "« miroir », « reflet », « axe », un motif replié en deux", alors: "c'est une symétrie axiale ; l'axe joue le rôle du miroir" },
      { si: "construire l'image d'un point $A$", alors: "tracer perpendiculairement à l'axe et reporter la même distance de l'autre côté" },
      { si: "construire l'image d'une figure (triangle, quadrilatère)", alors: "faire l'image de chaque sommet, puis relier $A'$, $B'$, $C'$" },
      { si: "« combien d'axes de symétrie ? »", alors: "chercher tous les pliages qui superposent la figure (attention : la diagonale d'un rectangle non carré n'en est pas un)" },
    ],
    pieges: [
      "Placer $A'$ du bon côté mais pas à la même distance : $A$ et $A'$ sont toujours à distance égale de l'axe.",
      "Oublier que $[AA']$ doit être perpendiculaire à l'axe : le reflet est en face, pas de travers.",
      "Croire que la diagonale d'un rectangle est un axe de symétrie : c'est faux, on ne peut plier proprement que le carré selon ses diagonales.",
    ],
    reel: "Sur un carrelage de case créole à Saint-Pierre, la moitié gauche du motif est le reflet exact de la moitié droite : le joint du milieu est l'axe de symétrie.",
  },
  {
    id: "stat_donnee",
    emoji: "📊",
    titre: "Données (statistiques)",
    domaine: "Statistiques et probabilités",
    essentiel:
      "Des **données**, ce sont des nombres rangés dans un **tableau** ou dans un **graphique** (barres ou diagramme circulaire). **Lire une donnée**, c'est repérer la bonne case et lire la valeur. On peut ensuite **comparer** (le plus, le moins) et **conclure**, mais toujours en s'appuyant sur les nombres, pas sur l'impression.",
    formules: [
      { label: "Lire un tableau", latex: "la valeur se trouve au **croisement** de la bonne ligne et de la bonne colonne" },
      { label: "Lire un graphique en barres", latex: "la **hauteur** du bâton donne le nombre (on lit sur l'axe)" },
      { label: "Lire un diagramme circulaire", latex: "la **plus grande part** = la catégorie choisie par le plus de monde" },
      { label: "Comparer", latex: "le plus grand nombre = le plus choisi ; écart $=$ grande valeur $-$ petite valeur" },
      { label: "Effectif total", latex: "on **additionne** tous les effectifs ($8 + 12 + 5 = 25$)" },
    ],
    reflexes: [
      { si: "« combien de… », « quelle valeur »", alors: "repérer la ligne ET la colonne, lire le nombre au croisement" },
      { si: "« le plus », « le moins », « quelle activité gagne »", alors: "comparer les nombres : le plus grand est le plus choisi" },
      { si: "« en tout », « au total », « combien ont répondu »", alors: "additionner tous les effectifs" },
      { si: "un diagramme circulaire (camembert)", alors: "plus la part est grande, plus la catégorie est fréquente" },
    ],
    pieges: [
      "Se fier à l'impression : un bâton qui « paraît » plus haut peut valoir moins. On lit toujours les nombres.",
      "Se tromper de ligne ou de colonne dans un tableau à deux entrées : la bonne donnée est au croisement des deux.",
      "Généraliser trop vite : si le sondage porte sur une classe, on ne peut pas conclure pour tout le collège.",
    ],
    reel: "Un sondage dans une classe de Saint-Pierre indique $8$ élèves à pied, $12$ en bus et $5$ en voiture : en tout $8 + 12 + 5 = 25$ élèves ont répondu, et le bus est le moyen le plus utilisé.",
  },
  {
    id: "proba_experience",
    emoji: "🎲",
    titre: "Probabilités",
    domaine: "Statistiques et probabilités",
    essentiel:
      "En **probabilités**, on regarde une **expérience au hasard** (lancer un dé, tirer une bille). Un événement peut être **certain** (il arrive toujours), **possible** (il peut arriver) ou **impossible** (il n'arrive jamais). Pour savoir quel événement est le **plus probable**, on **compte les issues favorables** : plus il y en a, plus il a de chances de se produire.",
    formules: [
      { label: "Le vocabulaire", latex: "**certain** = arrive toujours ; **possible** = peut arriver ; **impossible** = n'arrive jamais" },
      { label: "L'échelle des probabilités", latex: "de $0$ (impossible) à $1$ (certain) ; entre les deux, c'est possible" },
      { label: "Lister les issues", latex: "tous les résultats possibles (un dé : $1,2,3,4,5,6$, donc $6$ issues)" },
      { label: "Comparer deux événements", latex: "on compte les **issues favorables** ; le plus grand nombre = le plus probable" },
      { label: "Proche de $0$ ou de $1$", latex: "peu de chances $\\to$ proche de $0$ ; beaucoup de chances $\\to$ proche de $1$" },
    ],
    reflexes: [
      { si: "« cela ne peut jamais arriver »", alors: "c'est impossible : la probabilité vaut $0$" },
      { si: "« cela arrive à tous les coups »", alors: "c'est certain : la probabilité vaut $1$" },
      { si: "« lequel est le plus probable ? »", alors: "compter les issues favorables de chacun ; le plus grand nombre gagne" },
      { si: "« combien de résultats possibles ? »", alors: "lister toutes les issues une par une, sans en oublier" },
    ],
    pieges: [
      "Confondre **possible** et **certain** : obtenir $6$ avec un dé est possible, mais pas certain (il y a $5$ autres faces).",
      "Croire qu'une probabilité peut dépasser $1$ : elle va seulement de $0$ à $1$.",
      "Oublier une issue en faisant la liste (par exemple oublier le $6$ du dé) : la comparaison devient fausse.",
    ],
    reel: "Dans un sac avec $7$ billes rouges et $1$ bille bleue, tirer une bille rouge est presque certain (proche de $1$), alors que tirer la bleue est possible mais peu probable (proche de $0$).",
  },
  {
    id: "algo_programmation",
    emoji: "🐢",
    titre: "Algorithmique et programmation",
    domaine: "Algorithmique et programmation",
    essentiel:
      "Un **programme** est une **suite d'instructions** exécutées **dans l'ordre**, de haut en bas. Dans **Scratch**, le lutin peut **avancer** (il change de position) ou **tourner** (il change de direction). Le bloc **répéter** refait plusieurs fois les mêmes actions.",
    formules: [
      { label: "Lire un programme", latex: "on lit les blocs de haut en bas, un par un ; l'ordre compte" },
      { label: "Avancer ou tourner", latex: "avancer $=$ changer de position ; tourner $=$ changer de direction" },
      { label: "Répéter (boucle)", latex: "« répéter $4$ fois » exécute $4$ fois les blocs placés à l'intérieur" },
      { label: "Distance dans une boucle", latex: "distance $=$ nombre de tours $\\times$ pas (ex. $4 \\times 10 = 40$)" },
      { label: "Tracer un carré", latex: "répéter $4$ fois : avancer, puis tourner de $90^circ$" },
    ],
    reflexes: [
      { si: "on demande la première action ou l'ordre des blocs", alors: "lire de haut en bas ; changer l'ordre peut changer le résultat" },
      { si: "il y a un bloc « répéter $n$ fois »", alors: "les blocs dedans sont refaits $n$ fois : on multiplie (pas $\\times$ $n$)" },
      { si: "on veut tracer un carré", alors: "répéter $4$ fois avancer puis tourner de $90^circ$ ; pour un triangle équilatéral, $3$ fois avec $120^circ$" },
      { si: "on demande la distance ou l'angle total", alors: "additionner les « avancer » (ou les « tourner »), sans compter le drapeau vert" },
    ],
    pieges: [
      "Croire que le bloc dans « répéter 4 fois » n'est fait qu'une seule fois : il est bien exécuté 4 fois.",
      "Confondre avancer (bouger) et tourner (changer de direction) : tourner de 90° ne fait pas avancer de 90 pas.",
      "Oublier la boucle : « avancer de 10 » répété 4 fois donne 40 pas, pas 10.",
    ],
    reel: "Pour dessiner un carré avec un robot ou dans Scratch, on lui dit $4$ fois « avance, puis tourne d'un quart de tour » ($90^circ$).",
  },
];

const BANQUES: Record<string, TutorBankItemV4[]> = {
  entier_nombre: entiersBank,
  decimal_nombre: decimauxBank,
  fraction_nombre: fractionsBank,
  pourcentage_nombre: pourcentagesBank,
  entier_calcul_mental: calculMentalBank,
  entier_calcul_pose: calculPoseBank,
  prop_proportionnalite: proportionnaliteBank,
  aire_longueur: longueursBank,
  aire_perimetre: perimetresBank,
  aire_surface: airesBank,
  volume_solide: volumesBank,
  angle_mesure: anglesBank,
  triangle_figure: trianglesBank,
  quadrilatere_figure: quadrilateresBank,
  sym_axiale: symetrieBank,
  stat_donnee: donneesBank,
  proba_experience: probabilitesBank,
  algo_programmation: algorithmiqueBank,
};

export const KIT_MATHS_SIXIEME: KitData = {
  slug: "maths-sixieme",
  titre: "Guide de survie · Maths 6e",
  baseline:
    "Les 18 chapitres du programme de 6e en 18 fiches : l'essentiel, les réflexes, les pièges qui coûtent des points — et un test corrigé par chapitre. Pour bien démarrer le collège. À imprimer, à glisser dans le classeur.",
  matiere: "maths",
  classeLabel: "Sixième",
  coachClasse: "6e",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
