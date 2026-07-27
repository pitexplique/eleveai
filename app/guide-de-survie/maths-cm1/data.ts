// ─── Guide de survie · Maths CM1 (avant-dernière année de primaire) ───────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/maths/cm1/notions.ts
// - checklists     = micro-compétences de microSkills.ts (BO cycle 3)
// - test de survie = items "fixed" (sans canvas/audio) puisés dans les banques du coach
// Condensés écrits par 27 rédacteurs parallèles (workflow) puis VÉRIFIÉS à la main
// contre le BO cycle 3 et les banques (exactitude des exemples, périmètre CM1 strict).
// Banques importées BRUTES : le coach leur applique applyMathsKeyboardFree, inutile ici.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/cm1/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { nombresEntiersBank } from "@/lib/tutor-v4/questionBank/cm1/maths/nombres-entiers.bank";
import { suitesBank } from "@/lib/tutor-v4/questionBank/cm1/maths/suites.bank";
import { MultiplicationTablesBank } from "@/lib/tutor-v4/questionBank/cm1/maths/multiplication-table.bank";
import { multiplicationBank } from "@/lib/tutor-v4/questionBank/cm1/maths/multiplication.bank";
import { divisionBank } from "@/lib/tutor-v4/questionBank/cm1/maths/division.bank";
import { fractionsBank } from "@/lib/tutor-v4/questionBank/cm1/maths/fractions.bank";
import { decimauxBank } from "@/lib/tutor-v4/questionBank/cm1/maths/decimaux.bank";
import { calculBank } from "@/lib/tutor-v4/questionBank/cm1/maths/calcul.bank";
import { problemesBank } from "@/lib/tutor-v4/questionBank/cm1/maths/problemes.bank";
import { algebreBank } from "@/lib/tutor-v4/questionBank/cm1/maths/algebre.bank";
import { proportionnaliteBank } from "@/lib/tutor-v4/questionBank/cm1/maths/proportionnalite.bank";
import { longueurBank } from "@/lib/tutor-v4/questionBank/cm1/maths/longueur.bank";
import { masseBank } from "@/lib/tutor-v4/questionBank/cm1/maths/masse.bank";
import { contenanceBank } from "@/lib/tutor-v4/questionBank/cm1/maths/contenance.bank";
import { dureesBank } from "@/lib/tutor-v4/questionBank/cm1/maths/durees.bank";
import { perimetresBank } from "@/lib/tutor-v4/questionBank/cm1/maths/perimetres.bank";
import { airesBank } from "@/lib/tutor-v4/questionBank/cm1/maths/aires.bank";
import { anglesBank } from "@/lib/tutor-v4/questionBank/cm1/maths/angles.bank";
import { reperageBank } from "@/lib/tutor-v4/questionBank/cm1/maths/reperage.bank";
import { droitesBank } from "@/lib/tutor-v4/questionBank/cm1/maths/droites.bank";
import { symetrieBank } from "@/lib/tutor-v4/questionBank/cm1/maths/symetrie.bank";
import { figuresPlanesBank } from "@/lib/tutor-v4/questionBank/cm1/maths/figures-planes.bank";
import { solidesBank } from "@/lib/tutor-v4/questionBank/cm1/maths/solides.bank";
import { tableauxBank } from "@/lib/tutor-v4/questionBank/cm1/maths/tableaux.bank";
import { graphiquesBank } from "@/lib/tutor-v4/questionBank/cm1/maths/graphiques.bank";
import { probabilitesBank } from "@/lib/tutor-v4/questionBank/cm1/maths/probabilites.bank";
import { algorithmiqueBank } from "@/lib/tutor-v4/questionBank/cm1/maths/algorithmique.bank";
import type { KitData, KitNotion } from "@/components/kit/types";

// Checklists + tests dérivés du coach (module partagé par tous les guides).
const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  {
    id: "nombre_entier",
    emoji: "🔢",
    titre: "Nombres entiers",
    domaine: "Nombres et calculs",
    essentiel:
      "Un **nombre entier** s'écrit avec des chiffres. Chaque chiffre a une **valeur** selon sa **position** : unités, dizaines, centaines, milliers, dizaines de milliers. Le **zéro** garde une colonne vide.",
    formules: [
      { label: "Décomposer un nombre", latex: "$45\\,208 = 40\\,000 + 5\\,000 + 200 + 8$" },
      { label: "Comparer", latex: "le plus de chiffres = le plus grand ; sinon de gauche à droite ($8\\,607 < 8\\,760$)" },
      { label: "Le zéro tient la place", latex: "$12\\,030$ : le $0$ dit « pas de centaine »" },
      { label: "Arrondir à la centaine", latex: "regarde les dizaines : $4\\,682 \\to 4\\,700$ (car $8 \\geq 5$)" },
      { label: "Reconnaître un multiple", latex: "$42 = 6 \\times 7$, donc $42$ est multiple de $6$" },
    ],
    reflexes: [
      { si: "« range du plus petit au plus grand » (ordre croissant)", alors: "compare chiffre par chiffre en partant de la gauche" },
      { si: "« environ », « à peu près »", alors: "il faut arrondir : regarde le chiffre juste après le rang demandé ($\\geq 5$ on monte)" },
      { si: "« dans la table de », « groupes de »", alors: "cherche un multiple : $6 \\times ? = $ le nombre" },
      { si: "un zéro au milieu du nombre", alors: "garde-le : il tient une colonne vide" },
    ],
    pieges: [
      "Oublier un zéro : « douze mille trente » s'écrit $12\\,030$, pas $1\\,230$ ; le $0$ tient la place des centaines.",
      "Croire qu'un nombre est plus grand parce qu'il a un gros chiffre : $8\\,076$ n'est pas plus grand que $8\\,607$, on compare position par position.",
      "Pour arrondir à la centaine, regarder les unités au lieu des dizaines : dans $8\\,549$ le chiffre des dizaines est $4$, donc $8\\,500$ (pas $8\\,600$).",
    ],
    reel: "Au marché de Saint-Pierre, une caisse contient $2\\,540$ letchis : un nombre entre $2\\,500$ et $2\\,600$, et multiple de $10$ car il se termine par $0$.",
  },
  {
    id: "suite",
    emoji: "🔗",
    titre: "Suites de nombres",
    domaine: "Nombres et calculs",
    essentiel:
      "Une **suite** est une **liste de nombres** rangés selon une **règle**. Pour la **continuer**, on cherche ce qui change entre deux nombres voisins. Si les nombres **montent**, elle est **croissante** ; s'ils **descendent**, elle est **décroissante**.",
    formules: [
      { label: "Une suite suit une règle", latex: "$2 ; 4 ; 6 ; 8 ; ?$" },
      { label: "Continuer = garder le même écart", latex: "$8 + 2 = 10$" },
      { label: "Trouver la règle : voisin suivant moins précédent", latex: "$7 - 4 = 3$, on ajoute $3$" },
      { label: "Croissante : les nombres montent", latex: "$3 < 6 < 9 < 12$" },
      { label: "Décroissante : les nombres descendent", latex: "$30 > 25 > 20 > 15$" },
    ],
    reflexes: [
      { si: "« continue la suite », un « ? » à la fin", alors: "trouve l'écart entre deux nombres voisins, puis ajoute-le au dernier" },
      { si: "« quelle est la règle ? »", alors: "calcule le nombre suivant moins le précédent (ex. $10 - 5 = 5$)" },
      { si: "un trou au milieu, comme $5 ; 10 ; ? ; 20$", alors: "applique la même règle depuis le nombre d'avant" },
      { si: "« croissante ou décroissante ? »", alors: "regarde si ça monte (croissante) ou si ça descend (décroissante)" },
    ],
    pieges: [
      "Ne regarder que le premier écart : dans $10 ; 20 ; 40 ; 80$ ce n'est pas $+10$, on multiplie par $2$.",
      "Croire que $7 ; 7 ; 7 ; 7$ est croissante : rester pareil, ce n'est ni monter ni descendre.",
      "Comparer seulement le premier et le dernier nombre : $4 ; 8 ; 6 ; 10$ monte puis descend, donc ni croissante ni décroissante.",
    ],
    reel: "Sur un sentier de La Réunion, les balises sont posées tous les $5$ m : $5 ; 10 ; 15 ; 20$, alors la 6e balise est à $30$ m",
  },
  {
    id: "tables_multiplication",
    emoji: "🔟",
    titre: "Tables de multiplication",
    domaine: "Nombres et calculs",
    essentiel:
      "Une **table de multiplication**, c'est compter des **groupes égaux**. $6 \\times 4$, c'est **4 groupes de 6**. On peut **changer l'ordre** des facteurs : $6 \\times 4 = 4 \\times 6$. Bien connue, une table te donne la réponse **sans compter**.",
    formules: [
      { label: "Multiplier, c'est répéter un groupe", latex: "$6 \\times 4 = 6+6+6+6 = 24$" },
      { label: "On peut changer l'ordre", latex: "$8 \\times 7 = 7 \\times 8 = 56$" },
      { label: "Table de 9 : $\\times 10$ puis on enlève", latex: "$9 \\times 7 = 70 - 7 = 63$" },
      { label: "Facteur manquant", latex: "$6 \\times ? = 42$ donne $? = 7$" },
      { label: "Table et division vont ensemble", latex: "$5 \\times 7 = 35$ donc $35 \\div 5 = 7$" },
    ],
    reflexes: [
      { si: "« chacun », « dans chaque », des groupes égaux", alors: "on multiplie, on n'additionne pas : $9$ sachets de $8$ billes $= 9 \\times 8$" },
      { si: "table de $5$", alors: "le résultat finit toujours par $0$ ou par $5$" },
      { si: "table de $9$ difficile", alors: "faire $\\times 10$ puis enlever le nombre : $9 \\times 8 = 80 - 8 = 72$" },
      { si: "un trou : $6 \\times ? = 42$", alors: "chercher dans la table de $6$ le nombre qui donne $42$" },
    ],
    pieges: [
      "Additionner au lieu de multiplier : $9$ sachets de $8$ billes, ce n'est pas $9 + 8 = 17$ mais $9 \\times 8 = 72$.",
      "Se tromper d'un cran : dire $2 \\times 9 = 16$ est faux, le double de $9$ est $18$.",
      "Répondre le résultat au lieu du facteur : dans $6 \\times ? = 42$, la réponse est $7$, pas $42$.",
    ],
    reel: "Au marché de Saint-Pierre, $6$ paniers avec $8$ letchis chacun font $6 \\times 8 = 48$ letchis en tout.",
  },
  {
    id: "multiplication",
    emoji: "✖️",
    titre: "Multiplication",
    domaine: "Nombres et calculs",
    essentiel:
      "**Multiplier**, c'est **additionner plusieurs fois** le même nombre. Le résultat s'appelle le **produit**. On peut **changer l'ordre** des nombres : $4 \\times 8 = 8 \\times 4$.",
    formules: [
      { label: "Multiplier, c'est additionner", latex: "$4 \\times 3 = 4 + 4 + 4 = 12$" },
      { label: "On peut échanger l'ordre", latex: "$6 \\times 7 = 7 \\times 6 = 42$" },
      { label: "Par 10, 100, 1 000 : on ajoute des zéros", latex: "$34 \\times 10 = 340$ ; $56 \\times 100 = 5\\,600$" },
      { label: "Par 5 : faire $\\times 10$ puis la moitié", latex: "$24 \\times 5 = 240 \\div 2 = 120$" },
      { label: "Décomposer pour calculer de tête", latex: "$14 \\times 6 = 10 \\times 6 + 4 \\times 6 = 84$" },
    ],
    reflexes: [
      { si: "« combien en tout », « chacun », des groupes de même taille", alors: "c'est une multiplication" },
      { si: "« $\\times 10$ », « $\\times 100$ » ou « $\\times 1\\,000$ » (nombre entier)", alors: "j'écris autant de zéros à droite" },
      { si: "« $\\times 5$ »", alors: "je fais $\\times 10$ puis je prends la moitié" },
      { si: "« $\\times 9$ »", alors: "je fais $\\times 10$ puis j'enlève une fois le nombre" },
    ],
    pieges: [
      "Ajouter un seul zéro pour $\\times 100$ : $73 \\times 100 = 7\\,300$, et non $730$.",
      "Oublier une retenue dans la multiplication posée : la colonne d'après devient fausse.",
      "Supprimer le zéro du milieu : dans $306 \\times 5$, le $0$ garde sa place, donc $306 \\times 5 = 1\\,530$.",
    ],
    reel: "Au marché de Saint-Pierre, $8$ paniers avec $6$ letchis chacun : $8 \\times 6 = 48$ letchis en tout.",
  },
  {
    id: "division",
    emoji: "➗",
    titre: "Division",
    domaine: "Nombres et calculs",
    essentiel:
      "**Diviser**, c'est **partager** en parts égales, ou faire des **groupes** de même taille. Le résultat est le **quotient**. Souvent il reste des objets : le **reste**, toujours **plus petit** que le diviseur.",
    formules: [
      { label: "Diviser, c'est partager", latex: "$12 \\div 3 = 4$" },
      { label: "La division retrouve un facteur", latex: "$6 \\times 4 = 24$ donc $24 \\div 6 = 4$" },
      { label: "Chercher une multiplication à trou", latex: "$56 \\div 8$ : je cherche $8 \\times ? = 56$" },
      { label: "Division avec reste", latex: "$38 = 6 \\times 6 + 2$ : diviseur $\\times$ quotient $+$ reste" },
      { label: "Le reste est toujours petit", latex: "reste $<$ diviseur" },
    ],
    reflexes: [
      { si: "« partager », « distribuer », « chacun reçoit »", alors: "c'est une division" },
      { si: "« combien de sachets », « combien de groupes de… »", alors: "je divise le total par la taille du groupe" },
      { si: "je dois calculer une division", alors: "je cherche une multiplication à trou dans les tables" },
      { si: "on demande des groupes complets", alors: "je ne compte pas le reste comme un groupe" },
    ],
    pieges: [
      "Écrire un reste plus grand que le diviseur : $38 \\div 6 = 5$ reste $8$ est faux, car $8$ est plus grand que $6$.",
      "Confondre partager et multiplier : « partager $30$ cartes entre $5$ » donne $30 \\div 5 = 6$, pas $30 \\times 5$.",
      "Compter le reste comme un groupe : avec $29$ letchis en sachets de $4$, on fait $7$ sachets complets, pas $8$.",
    ],
    reel: "Au marché de Saint-Pierre, ranger $36$ letchis dans des sachets de $4$ : $36 \\div 4 = 9$ letchis par sachet",
  },
  {
    id: "fraction",
    emoji: "🍕",
    titre: "Fractions",
    domaine: "Nombres et calculs",
    essentiel:
      "Une **fraction** partage une **unité** en parts **égales**. Le **numérateur** (en haut) compte les parts prises. Le **dénominateur** (en bas) dit en combien de parts on a coupé. $\\frac{3}{4}$ se lit **trois quarts**.",
    formules: [
      { label: "Lire une fraction", latex: "$\\frac{3}{4}$ = $3$ parts prises sur $4$ parts égales" },
      { label: "Égale à 1 ou plus grande que 1", latex: "$\\frac{4}{4} = 1$ ; si le haut > le bas, plus grand que $1$ ($\\frac{5}{4} > 1$)" },
      { label: "Comparer", latex: "même bas : compare le haut ; même haut : petit bas gagne ($\\frac{1}{4} > \\frac{1}{8}$)" },
      { label: "Fractions égales", latex: "$\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6}$ : $\\times$ le haut ET le bas par le même nombre" },
      { label: "Fraction décimale", latex: "le bas est $10$, $100$ ou $1000$ : $0{,}7 = \\frac{7}{10}$" },
    ],
    reflexes: [
      { si: "« on colorie … parts sur … »", alors: "parts coloriées en haut, parts totales en bas" },
      { si: "les fractions ont le même bas (dénominateur)", alors: "je compare seulement les nombres du haut" },
      { si: "le haut est $1$ des deux côtés ($\\frac{1}{4}$ ou $\\frac{1}{8}$)", alors: "le plus petit bas donne la plus grande part" },
      { si: "le bas est $10$, $100$ ou $1000$", alors: "c'est une fraction décimale ($0{,}7 \\to \\frac{7}{10}$)" },
    ],
    pieges: [
      "Inverser le haut et le bas : dans $\\frac{4}{9}$, le dénominateur est $9$ (le nombre du bas), pas $4$.",
      "Croire que $\\frac{1}{8}$ est plus grand que $\\frac{1}{4}$ car $8 > 4$ : c'est faux, plus il y a de parts, plus chaque part est petite, donc $\\frac{1}{8} < \\frac{1}{4}$.",
      "Croire qu'une fraction est décimale à cause d'un $10$ en haut : $\\frac{10}{3}$ n'est pas décimale ; on regarde le nombre du bas.",
    ],
    reel: "Un ananas Victoria de La Réunion coupé en $10$ morceaux égaux : si on en mange $7$, il reste $\\frac{3}{10}$ de l'ananas.",
  },
  {
    id: "nombre_decimal",
    emoji: "🪙",
    titre: "Nombres décimaux",
    domaine: "Nombres et calculs",
    essentiel:
      "Un **nombre décimal** a une **virgule**. Avant, la **partie entière** ; après, les **dixièmes** (1er chiffre) puis les **centièmes** (2e chiffre). On peut aussi l'écrire en fraction : $0{,}7 = \\frac{7}{10}$.",
    formules: [
      { label: "Lire les rangs", latex: "$0{,}7 =$ sept dixièmes ; $0{,}23 =$ vingt-trois centièmes" },
      { label: "Fraction décimale = décimal", latex: "$\\frac{7}{10} = 0{,}7$ et $\\frac{5}{100} = 0{,}05$" },
      { label: "Comparer", latex: "la partie entière d'abord, puis les dixièmes : $3{,}8 > 3{,}45$" },
      { label: "Arrondir à l'unité", latex: "$4{,}7 \\to 5$ ; $6{,}3 \\to 6$ (on regarde les dixièmes)" },
      { label: "Le zéro utile", latex: "$5{,}03 \\neq 5{,}3$ : le $0$ garde la place des dixièmes" },
    ],
    reflexes: [
      { si: "« dixièmes » ou 1 seul chiffre après la virgule", alors: "penser $\\frac{n}{10}$ : $0{,}7 = \\frac{7}{10}$" },
      { si: "« range du plus petit au plus grand »", alors: "comparer la partie entière d'abord, puis les chiffres après la virgule" },
      { si: "« arrondir à l'unité »", alors: "regarder le chiffre des dixièmes : $5$ ou plus, on monte" },
      { si: "« place le nombre » sur une droite de $0$ à $1$ en 10 parts", alors: "chaque trait vaut $0{,}1$" },
    ],
    pieges: [
      "Croire que $3{,}45 > 3{,}8$ parce que $45 > 8$ : on compare les rangs, et $8$ dixièmes est plus grand que $4$ dixièmes, donc $3{,}8 > 3{,}45$.",
      "Oublier le zéro : cinq unités et trois centièmes s'écrit $5{,}03$ et non $5{,}3$.",
      "Confondre $\\frac{5}{10}$ et $\\frac{5}{100}$ : $0{,}5 = \\frac{5}{10}$ (dixièmes), pas $\\frac{5}{100}$.",
    ],
    reel: "Au marché de Saint-Pierre, un letchi à $2{,}50$ € : le $5$ après la virgule vaut cinq dixièmes d'euro, soit $50$ centimes.",
  },
  {
    id: "calcul",
    emoji: "🧮",
    titre: "Calculs",
    domaine: "Nombres et calculs",
    essentiel:
      "**Calculer**, c'est trouver un résultat. En tête pour les nombres simples, **posé en colonnes** pour les grands nombres. On **aligne** toujours les chiffres de même rang, et pour les décimaux on **aligne les virgules**.",
    formules: [
      { label: "Multiplier par 10, par 100", latex: "$37 \\times 10 = 370$ ; $37 \\times 100 = 3700$" },
      { label: "Par 5 : faire ×10 puis la moitié", latex: "$32 \\times 5 = 320 \\div 2 = 160$" },
      { label: "Poser en colonnes : aligner les rangs", latex: "unités sous unités ; retenue si la colonne dépasse $9$" },
      { label: "Décimaux : aligner les virgules", latex: "$4{,}2 + 3{,}5 = 7{,}7$" },
      { label: "Priorités : le × avant le + et le −", latex: "$4 + 3 \\times 5 = 19$ (d'abord $3 \\times 5 = 15$)" },
    ],
    reflexes: [
      { si: "« combien en tout », « total », « en plus »", alors: "c'est une **addition** : on additionne les quantités" },
      { si: "un $\\times 5$ ou un $\\times 9$ à faire de tête", alors: "passe par $\\times 10$, puis prends la moitié ($\\times 5$) ou enlève le nombre ($\\times 9$)" },
      { si: "il y a une **virgule** dans le calcul", alors: "aligne les virgules ; tu peux écrire $4{,}2 = 4{,}20$ pour bien aligner" },
      { si: "un $+$ ou un $-$ ET un $\\times$ dans le même calcul", alors: "fais **d'abord** la multiplication" },
    ],
    pieges: [
      "Dire que $43 \\times 10 = 4300$ : multiplier un entier par $10$ ajoute **un seul** zéro, donc $430$.",
      "Oublier une **retenue** en posant l'opération : la colonne d'à côté devient fausse.",
      "Calculer de gauche à droite : $4 + 3 \\times 5 = 35$ est faux, le $\\times$ passe avant, donc $19$.",
    ],
    reel: "Au marché de Saint-Pierre, $4$ barquettes de letchis à $3$ € : de tête, $4 \\times 3 = 12$ €",
  },
  {
    id: "probleme",
    emoji: "🧩",
    titre: "Problèmes",
    domaine: "Nombres et calculs",
    essentiel:
      "Un **problème**, c'est une **histoire** à résoudre. On **choisit la bonne opération**, on fait le **calcul**, puis on écrit une **phrase-réponse** avec son **unité**. Parfois il faut **plusieurs étapes**, dans le bon ordre.",
    formules: [
      { label: "Réunir, ajouter → addition", latex: "$120 + 45 = 165$" },
      { label: "Enlever, reste, écart → soustraction", latex: "$200 - 60 = 140$" },
      { label: "Groupes égaux (« chacun ») → multiplication", latex: "$6 \\times 8 = 48$" },
      { label: "Partager en parts égales → division", latex: "$48 \\div 6 = 8$" },
      { label: "Plusieurs étapes : dans l'ordre", latex: "$120 + 85 = 205$ puis $205 - 96 = 109$" },
    ],
    reflexes: [
      { si: "« en tout », « au total », « en plus »", alors: "on réunit → addition" },
      { si: "« reste », « combien de plus », « on utilise »", alors: "on enlève → soustraction" },
      { si: "« chacun », « chaque », des groupes identiques", alors: "on répète → multiplication" },
      { si: "« partager », « distribuer en parts égales »", alors: "on partage → division" },
    ],
    pieges: [
      "Additionner au lieu de multiplier : « 6 boîtes de 8 » ne fait pas $6 + 8 = 14$ mais $6 \\times 8 = 48$.",
      "Répondre par un nombre tout seul : il faut une **phrase** avec l'**unité** (Il reste $9$ letchis).",
      "Oublier de vérifier : si on ajoute, le résultat doit être **plus grand** ; si on enlève, il doit être **plus petit**.",
    ],
    reel: "Au marché de Saint-Pierre, $4$ paniers de $9$ mangues font $4 \\times 9 = 36$ mangues, et non $13$.",
  },
  {
    id: "algebre",
    emoji: "❓",
    titre: "Nombre inconnu et égalités",
    domaine: "Algèbre",
    essentiel:
      "Le signe **=** est une **balance** : les deux côtés valent **pareil**. Pour trouver un **nombre caché**, on fait l'**opération inverse**. Un **schéma en barres** montre le **tout** et ses **parties**.",
    formules: [
      { label: "Le = est une balance", latex: "$8 + 4 = 10 + 2$ car chaque côté vaut $12$" },
      { label: "Nombre inconnu (addition)", latex: "$? + 12 = 40$ donne $40 - 12 = 28$" },
      { label: "Nombre inconnu (multiplication)", latex: "$6 \\times ? = 42$ donne $42 \\div 6 = 7$" },
      { label: "Schéma en barres", latex: "tout $-$ partie connue $=$ partie manquante : $50 - 18 = 32$" },
      { label: "Motif : le même saut à chaque fois", latex: "$4 ; 7 ; 10 ; 13 ; 16$ (on ajoute $3$)" },
    ],
    reflexes: [
      { si: "« je pense à un nombre, j'ajoute … » ou « j'enlève … »", alors: "opération inverse : soustraire ce qu'on a ajouté, ajouter ce qu'on a enlevé" },
      { si: "il manque un nombre dans une égalité (un côté est complet)", alors: "calcule d'abord le côté complet, puis cherche ce qui manque de l'autre côté" },
      { si: "on connaît le tout et une seule partie", alors: "schéma en barres : $tout - partie connue = partie manquante$" },
      { si: "une suite comme $5 ; 10 ; 15 ; \\ldots$", alors: "trouve le saut qui se répète, puis continue" },
    ],
    pieges: [
      "Confondre le total et le nombre manquant : dans $18 + ? = 25$, répondre $25$ est faux, la réponse est $7$.",
      "Croire que le signe $=$ veut dire « écris le résultat » : il veut dire « même valeur des deux côtés ».",
      "Additionner au lieu de multiplier dans une relation : $5$ boîtes de $8$ crayons font $5 \\times 8 = 40$, pas $5 + 8 = 13$.",
    ],
    reel: "Au marché de Saint-Pierre, un panier de $30$ fruits avec $12$ mangues cache les letchis : $30 - 12 = 18$ letchis",
  },
  {
    id: "proportionnalite",
    emoji: "⚖️",
    titre: "Proportionnalité",
    domaine: "Proportionnalité",
    essentiel:
      "La **proportionnalité**, c'est quand on **multiplie toujours par le même nombre**. **2 fois plus** d'objets, c'est **2 fois plus** cher. **2 fois moins** d'objets, c'est **2 fois moins** cher.",
    formules: [
      { label: "Fois plus : je multiplie", latex: "$2$ objets $\\to 6$ €, donc $4$ objets $\\to 6 \\times 2 = 12$ €" },
      { label: "Fois moins : je divise", latex: "$6$ objets $\\to 18$ €, donc $3$ objets $\\to 18 \\div 2 = 9$ €" },
      { label: "Le prix de 1 d'abord", latex: "$3$ kg $\\to 12$ €, donc $1$ kg $\\to 12 \\div 3 = 4$ €" },
      { label: "Tableau : chaque colonne pareil", latex: "$1 \\to 3$, $2 \\to 6$, $3 \\to 9$ : toujours $\\times 3$" },
      { label: "Coefficient = le même nombre", latex: "$1$ panier $\\to 8$ fruits : coefficient $\\times 8$" },
    ],
    reflexes: [
      { si: "« au même prix », « identiques », « chaque panier pareil »", alors: "c'est de la proportionnalité : on multiplie ou on divise par le même nombre" },
      { si: "« 2 fois plus », « le double », « le triple »", alors: "je multiplie la valeur par $2$, par $3$…" },
      { si: "« 2 fois moins », « la moitié »", alors: "je divise la valeur par $2$, par $3$…" },
      { si: "je ne vois pas le lien direct entre les deux nombres", alors: "je cherche d'abord la valeur de $1$, puis je multiplie" },
    ],
    pieges: [
      "Ajouter au lieu de multiplier : pour passer de $2$ à $4$ objets on multiplie par $2$, on n'ajoute pas $2$.",
      "Multiplier par le mauvais nombre : de $3$ à $6$ objets on multiplie par $2$ (car $6 = 3 \\times 2$), pas par $3$.",
      "Oublier de faire la même chose sur les deux lignes : si on divise le haut par $2$, on divise aussi le bas par $2$.",
    ],
    reel: "Au marché de Saint-Pierre, $3$ kg de letchis coûtent $12$ €, donc $1$ kg coûte $12 \\div 3 = 4$ € et $5$ kg coûtent $5 \\times 4 = 20$ €.",
  },
  {
    id: "longueur",
    emoji: "📏",
    titre: "Longueurs",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Une **longueur** se mesure avec une **unité** : mm, cm, m, km. Pour **comparer** ou **additionner**, il faut d'abord la **même unité**. Sur une **droite graduée**, la longueur est l'**écart** entre les deux points.",
    formules: [
      { label: "Les 3 échelles à connaître", latex: "$1$ cm $= 10$ mm, $1$ m $= 100$ cm, $1$ km $= 1000$ m" },
      { label: "Vers une plus petite unité : on multiplie", latex: "$3$ m $= 3 \\times 100 = 300$ cm" },
      { label: "Vers une plus grande unité : on divise", latex: "$250$ cm $= 250 \\div 100 = 2{,}5$ m" },
      { label: "Longueur sur une droite graduée", latex: "$AB = $ position de $B - $ position de $A$" },
      { label: "Additionner deux longueurs (même unité)", latex: "$2$ km $+ 750$ m $= 2000 + 750 = 2750$ m" },
    ],
    reflexes: [
      { si: "« quel trajet est le plus long ? » avec des km et des m mélangés", alors: "tout mettre en mètres, puis comparer les nombres" },
      { si: "on passe d'une grande unité à une petite (m vers cm)", alors: "on multiplie (par $10$, $100$ ou $1000$)" },
      { si: "on passe d'une petite unité à une grande (cm vers m)", alors: "on divise (par $10$, $100$ ou $1000$)" },
      { si: "« quelle est la longueur AB ? » sur une droite graduée", alors: "faire grande position moins petite position" },
    ],
    pieges: [
      "Sur une droite graduée, additionner les positions : si A est à $2$ et B à $8$, écrire $2 + 8 = 10$ est faux. On soustrait : $8 - 2 = 6$.",
      "Comparer les nombres sans convertir : croire que $80$ cm est plus grand que $1$ m. Or $1$ m $= 100$ cm, donc $1$ m gagne.",
      "Se tromper de sens : pour aller des cm aux m, on divise par $100$, on ne multiplie pas. $300$ cm $= 3$ m.",
    ],
    reel: "Sur un sentier de La Réunion, marcher $2$ km le matin puis $750$ m l'après-midi fait $2000 + 750 = 2750$ m en tout",
  },
  {
    id: "masse",
    emoji: "🏋️",
    titre: "Masses",
    domaine: "Grandeurs et mesures",
    essentiel:
      "La **masse**, c'est **combien pèse** un objet. On la mesure surtout en **grammes (g)** et en **kilogrammes (kg)**. La règle qui sauve : **1 kg = 1000 g**.",
    formules: [
      { label: "La règle à connaître par cœur", latex: "$1 \\text{ kg} = 1000 \\text{ g}$" },
      { label: "Des kilos vers les grammes ($\\times 1000$)", latex: "$3 \\text{ kg} = 3 \\times 1000 = 3000 \\text{ g}$" },
      { label: "Des grammes vers les kilos ($\\div 1000$)", latex: "$2500 \\text{ g} = 2500 \\div 1000 = 2{,}5 \\text{ kg}$" },
      { label: "La tonne, pour le très lourd", latex: "$1 \\text{ t} = 1000 \\text{ kg}$" },
      { label: "Comparer : même unité d'abord", latex: "$1 \\text{ kg} = 1000 \\text{ g} > 750 \\text{ g}$" },
    ],
    reflexes: [
      { si: "des **kg** et des **g** sont mélangés", alors: "convertis **tout en grammes**, puis compare les nombres" },
      { si: "on passe des **kilos aux grammes**", alors: "on **multiplie par 1000**" },
      { si: "on passe des **grammes aux kilos**", alors: "on **divise par 1000**" },
      { si: "petit objet (pomme, gomme) / gros engin (camion)", alors: "petit = **grammes**, gros = **tonnes**" },
    ],
    pieges: [
      "Comparer les nombres sans regarder l'unité : croire que $750 \\text{ g}$ est plus lourd que $1 \\text{ kg}$ parce que $750 > 1$. Faux : $1 \\text{ kg} = 1000 \\text{ g}$.",
      "Confondre $\\times$ et $\\div$ : pour passer de $\\text{kg}$ à $\\text{g}$ on **multiplie** par $1000$, on ne divise pas.",
      "Choisir une unité absurde : dire qu'une pomme pèse $15 \\text{ kg}$. Une pomme, ça se pèse en **grammes** (environ $150 \\text{ g}$).",
    ],
    reel: "Au marché de Saint-Pierre, un ananas de $1 \\text{ kg}$ et un sac de $500 \\text{ g}$ de letchis pèsent en tout $1 \\text{ kg}$ et $500 \\text{ g}$, soit $1500 \\text{ g}$.",
  },
  {
    id: "contenance",
    emoji: "🧴",
    titre: "Contenances",
    domaine: "Grandeurs et mesures",
    essentiel:
      "La **contenance**, c'est la quantité de liquide qu'un récipient peut tenir. On la mesure en **litre (L)**, **centilitre (cL)** et **millilitre (mL)**. Pour **comparer** ou **calculer**, il faut d'abord la **même unité**.",
    formules: [
      { label: "Litre et centilitre", latex: "$1$ L $= 100$ cL" },
      { label: "Litre et millilitre", latex: "$1$ L $= 1000$ mL" },
      { label: "Centilitre et millilitre", latex: "$1$ cL $= 10$ mL" },
      { label: "Vers la petite unité, on multiplie", latex: "$3$ L $= 3 \\times 100 = 300$ cL" },
      { label: "Vers la grande unité, on divise", latex: "$3000$ mL $= 3000 \\div 1000 = 3$ L" },
    ],
    reflexes: [
      { si: "« quel récipient contient le plus ? », « range »", alors: "mets la même unité, puis compare les nombres" },
      { si: "« combien de cL dans ... L ? », « convertis »", alors: "vers une plus petite unité on multiplie, vers une plus grande on divise" },
      { si: "« gourde », « verre », « cuillère », « baignoire »", alors: "estime : cuillère en mL, verre en cL, gourde et baignoire en L" },
      { si: "« quantité totale », « il reste »", alors: "convertis tout dans la même unité AVANT d'additionner ou de soustraire" },
    ],
    pieges: [
      "Additionner sans convertir : $2$ L $+ 50$ cL $= 52$ cL est faux. Il faut $2$ L $= 200$ cL, donc $200 + 50 = 250$ cL.",
      "Comparer les nombres en oubliant l'unité : croire que $75$ cL est plus grand que $1$ L parce que $75 > 1$. Or $1$ L $= 100$ cL, donc $1$ L gagne.",
      "Se tromper de sens : vers le litre (unité plus grande) on divise, donc $3000$ mL $= 3000 \\div 1000 = 3$ L, pas plus.",
    ],
    reel: "Pour une randonnée au Piton de la Fournaise, Noa prend une gourde de $1$ L et une bouteille de $50$ cL : en tout $100 + 50 = 150$ cL d'eau",
  },
  {
    id: "duree",
    emoji: "⏱️",
    titre: "Durées",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Sur une horloge, la **petite aiguille** montre les **heures**, la **grande** les **minutes**. Une **durée**, c'est le **temps écoulé** entre un début et une fin. Attention : on compte par **60**, pas par 10.",
    formules: [
      { label: "Les mesures qui sauvent", latex: "$1$ h $= 60$ min, $1$ min $= 60$ s" },
      { label: "Quart, demie, trois quarts", latex: "quart $= 15$ min, demie $= 30$ min, trois quarts $= 45$ min" },
      { label: "Calculer une durée : fin moins début", latex: "$8$ h $45 - 8$ h $00 = 45$ min" },
      { label: "Trouver l'heure de fin : début plus durée", latex: "$10$ h $15 + 30$ min $= 10$ h $45$" },
      { label: "Convertir en minutes : fois 60", latex: "$2$ h $= 2 \\times 60 = 120$ min" },
    ],
    reflexes: [
      { si: "« combien de temps dure », « quelle durée »", alors: "calculer l'écart : heure de fin $-$ heure de début" },
      { si: "« à quelle heure se termine », « sera prêt »", alors: "ajouter la durée à l'heure de début" },
      { si: "« dans combien de minutes », « temps d'attente »", alors: "compter les minutes entre maintenant et le départ" },
      { si: "« en minutes » ou « en secondes »", alors: "penser à $60$ et multiplier" },
    ],
    pieges: [
      "Compter par 10 au lieu de 60 : après $59$ min, c'est l'heure suivante, pas « $0$ h $90$ ».",
      "Confondre les aiguilles : la petite donne les heures, la grande donne les minutes.",
      "Oublier le passage d'heure : $8$ h $50 + 20$ min $= 9$ h $10$, pas $8$ h $70$.",
    ],
    reel: "Au marché de Saint-Pierre, il est $7$ h $10$ et le car part à $7$ h $25$ : tu attends $7$ h $25 - 7$ h $10 = 15$ min",
  },
  {
    id: "perimetre",
    emoji: "⭕",
    titre: "Périmètres",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Le **périmètre**, c'est le **tour** d'une figure : la longueur de son **contour**. Pour le trouver, on **additionne tous les côtés**. C'est une **longueur**, on la mesure en cm ou en m.",
    formules: [
      { label: "Le périmètre, c'est le tour", latex: "on additionne tous les côtés : $4 + 5 + 6 = 15$" },
      { label: "Périmètre d'un carré", latex: "$4$ côtés égaux : $4 \\times 5 = 20$ cm" },
      { label: "Périmètre d'un rectangle", latex: "$2$ longueurs $+$ $2$ largeurs : $6 + 3 + 6 + 3 = 18$" },
      { label: "Périmètre d'un triangle", latex: "les $3$ côtés : $a + b + c$" },
      { label: "Sur quadrillage", latex: "on compte seulement les côtés du contour extérieur" },
    ],
    reflexes: [
      { si: "« clôture », « faire le tour », « contour »", alors: "c'est le périmètre : additionne tous les côtés" },
      { si: "« carré »", alors: "multiplie le côté par $4$" },
      { si: "« rectangle »", alors: "additionne $2$ longueurs et $2$ largeurs" },
      { si: "figure sur un quadrillage", alors: "compte seulement les petits côtés du contour extérieur" },
    ],
    pieges: [
      "Confondre périmètre et aire : $8 \\times 3 = 24$ donne l'aire, PAS le périmètre. Pour le périmètre, on additionne les côtés.",
      "Oublier un côté : pour un triangle de côtés $4$, $5$ et $6$, faire seulement $4 + 5$ est faux, il faut les trois.",
      "Sur un quadrillage, compter les côtés collés entre deux cases : ils sont à l'intérieur, on ne les compte pas.",
    ],
    reel: "Pour clôturer un petit jardin de $8$ m sur $5$ m à Saint-Pierre, on calcule le périmètre : $8 + 5 + 8 + 5 = 26$ m de grillage",
  },
  {
    id: "aire",
    emoji: "🟦",
    titre: "Aires",
    domaine: "Grandeurs et mesures",
    essentiel:
      "L'**aire**, c'est la **surface à l'intérieur** d'une figure (pas le tour, qui est le **périmètre**). On la mesure en **comptant les carreaux**. Pour un **rectangle** ou un **carré**, on multiplie les **rangées** par les **colonnes**.",
    formules: [
      { label: "Compter les carreaux", latex: "$1$ carreau rempli $= 1$ carreau unité" },
      { label: "Aire du rectangle (rangées × colonnes)", latex: "$3$ rangées de $4$ carreaux $: 3 \\times 4 = 12$" },
      { label: "Aire du carré (côté × côté)", latex: "$5 \\times 5 = 25$ carreaux" },
      { label: "Figure découpée : on additionne", latex: "$5$ carreaux $+ 3$ carreaux $= 8$" },
      { label: "Unité d'aire = unité carrée", latex: "en carreaux, en cm² ou en m²" },
    ],
    reflexes: [
      { si: "« surface », « à l'intérieur », « place occupée »", alors: "c'est l'aire (le contour, ce serait le périmètre)" },
      { si: "« combien de carreaux »", alors: "je compte tous les carreaux remplis" },
      { si: "« ... rangées de ... carreaux »", alors: "je multiplie rangées $\\times$ colonnes" },
      { si: "figure bizarre ou en escalier", alors: "je découpe en parties et j'additionne les aires" },
    ],
    pieges: [
      "Confondre aire et périmètre : faire le tour de la figure au lieu de compter l'intérieur.",
      "Additionner au lieu de multiplier : pour un rectangle de $4$ sur $3$, écrire $4 + 3 = 7$ est faux, il faut $4 \\times 3 = 12$.",
      "Oublier l'unité carrée : écrire $12$ cm au lieu de $12$ cm² (le cm mesure une longueur, pas une surface).",
    ],
    reel: "Un petit potager à Saint-Pierre découpé en carrés de $1$ m², avec $5$ rangées de $4$ carrés, a une aire de $5 \\times 4 = 20$ m²",
  },
  {
    id: "angle",
    emoji: "📐",
    titre: "Angles",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Un **angle**, c'est une **ouverture** entre deux **côtés** (deux traits) qui partent du même point : le **sommet**. Le repère, c'est le **coin d'un carré** : l'**angle droit** ($90^\\circ$). Plus fermé que lui, l'angle est **aigu** ; plus ouvert, il est **obtus**.",
    formules: [
      { label: "L'angle droit, le repère", latex: "angle droit $= 90^\\circ$ = coin d'un carré" },
      { label: "Angle aigu (fermé)", latex: "aigu $<$ droit, donc moins de $90^\\circ$" },
      { label: "Angle obtus (ouvert)", latex: "obtus $>$ droit, donc plus de $90^\\circ$" },
      { label: "Comparer deux angles", latex: "on compare l'ouverture : $120^\\circ > 45^\\circ$" },
      { label: "Vérifier un angle droit", latex: "l'équerre ou le coin d'une feuille" },
    ],
    reflexes: [
      { si: "« le coin d'un carré, d'une feuille, de l'équerre »", alors: "c'est un angle droit, $90^\\circ$" },
      { si: "« plus petit / plus fermé que l'angle droit »", alors: "l'angle est aigu" },
      { si: "« plus grand / plus ouvert que l'angle droit »", alors: "l'angle est obtus" },
      { si: "« quel angle est le plus grand ? »", alors: "je compare les ouvertures, pas la longueur des côtés dessinés" },
    ],
    pieges: [
      "Croire qu'un angle est plus grand parce que ses côtés sont dessinés plus longs : c'est l'**ouverture** qui compte, pas la longueur des traits.",
      "Dire qu'un angle de $95^\\circ$ est droit « parce que c'est presque $90^\\circ$ » : un angle droit mesure **exactement** $90^\\circ$.",
      "Confondre un angle et une longueur : un angle mesure une **ouverture**, pas des centimètres.",
    ],
    reel: "Sur une case créole de Saint-Pierre, le coin d'une fenêtre forme un angle droit, alors qu'un portail à peine poussé forme un petit angle aigu.",
  },
  {
    id: "reperage",
    emoji: "📍",
    titre: "Repérage",
    domaine: "Espace et géométrie",
    essentiel:
      "Sur un **quadrillage**, un point se repère avec **deux nombres** : ses **coordonnées**. On lit **toujours l'horizontal** (gauche-droite) d'abord, puis le **vertical** (haut-bas). On écrit $(x ; y)$.",
    formules: [
      { label: "Un point = 2 nombres", latex: "$A(3 ; 2)$ : $3$ vers la droite, puis $2$ vers le haut" },
      { label: "L'ordre de lecture", latex: "$(x ; y)$ = (horizontal ; vertical)" },
      { label: "Se déplacer à droite ou à gauche", latex: "droite : $x$ augmente · gauche : $x$ diminue" },
      { label: "Se déplacer en haut ou en bas", latex: "haut : $y$ augmente · bas : $y$ diminue" },
      { label: "Ne pas inverser", latex: "$(2 ; 4) \\neq (4 ; 2)$" },
    ],
    reflexes: [
      { si: "« lis les coordonnées du point »", alors: "d'abord le nombre horizontal (gauche-droite), puis le vertical (haut-bas)" },
      { si: "« il va à droite / à gauche »", alors: "seul le 1er nombre change" },
      { si: "« il monte / il descend »", alors: "seul le 2e nombre change" },
      { si: "« place le trésor / le lieu »", alors: "on va au croisement des deux nombres" },
    ],
    pieges: [
      "Inverser les deux nombres : écrire $(4 ; 2)$ au lieu de $(2 ; 4)$, ce n'est pas le même point.",
      "Donner un seul nombre : il en faut toujours deux pour repérer un point.",
      "Se tromper de nombre : à droite ou à gauche c'est le 1er qui change, en haut ou en bas c'est le 2e.",
    ],
    reel: "Sur une carte au trésor quadrillée de La Réunion, la plage est en $(1 ; 1)$ et le volcan en $(4 ; 4)$ : pour le trésor, on avance de $4$ cases vers la droite puis on monte de $4$ cases.",
  },
  {
    id: "droite",
    emoji: "🛤️",
    titre: "Droites",
    domaine: "Espace et géométrie",
    essentiel:
      "Une **droite** se prolonge **sans fin** des deux côtés. Un **segment** $[AB]$ s'arrête à ses **deux extrémités**. Deux droites sont **parallèles** si elles gardent le **même écart**, **perpendiculaires** si elles se coupent en formant un **angle droit**.",
    formules: [
      { label: "Les 3 objets", latex: "$(AB)$ droite · $[AB]$ segment · $[AB)$ demi-droite" },
      { label: "Parallèles", latex: "$(d) \\parallel (e)$ : même écart, ne se coupent jamais" },
      { label: "Perpendiculaires", latex: "$(d) \\perp (e)$ : se coupent en angle droit $90^\\circ$" },
      { label: "Sécantes", latex: "elles se coupent en $1$ point, mais sans angle droit" },
      { label: "Les bons outils", latex: "règle $=$ tracer droit · équerre $=$ angle droit" },
    ],
    reflexes: [
      { si: "« ne se coupent jamais », « même écart »", alors: "ce sont des droites parallèles" },
      { si: "« angle droit », ou un petit carré codé au croisement", alors: "ce sont des droites perpendiculaires" },
      { si: "on demande de tracer une perpendiculaire", alors: "on prend l'équerre, qui a un angle droit" },
      { si: "une notation avec des crochets, comme $[AB]$", alors: "c'est un segment : il s'arrête en A et en B" },
    ],
    pieges: [
      "Croire qu'un segment continue sans fin : le segment $[AB]$ a deux extrémités, il s'arrête en A et en B. Seule la droite se prolonge sans fin.",
      "Croire que deux droites qui se croisent sont perpendiculaires : elles sont sécantes ; il faut un angle droit ($90^\\circ$) pour être perpendiculaires.",
      "Croire que la couleur prouve le parallélisme : la couleur aide à lire, mais on regarde la direction et l'écart pour décider.",
    ],
    reel: "Sur un plan de Saint-Pierre, deux rues qui gardent toujours le même écart sans jamais se croiser sont parallèles, comme les deux rails du p'tit train d'autrefois.",
  },
  {
    id: "symetrie",
    emoji: "🪞",
    titre: "Symétrie",
    domaine: "Espace et géométrie",
    essentiel:
      "La **symétrie axiale**, c'est le **miroir**. Un **axe** (une droite) sépare la figure et son **image**. Le point image est **de l'autre côté**, à la **même distance** de l'axe.",
    formules: [
      { label: "Même distance de l'axe", latex: "$3$ carreaux d'un côté $\\to$ $3$ carreaux de l'autre" },
      { label: "Axe vertical : l'ordonnée ne bouge pas", latex: "avec l'axe $x = 4$ : $(2 ; 3) \\to (6 ; 3)$" },
      { label: "Axe horizontal : l'abscisse ne bouge pas", latex: "avec l'axe $y = 4$ : $(5 ; 2) \\to (5 ; 6)$" },
      { label: "Point posé sur l'axe", latex: "il reste sur place : $(4 ; 5) \\to (4 ; 5)$" },
      { label: "Méthode", latex: "compter les carreaux jusqu'à l'axe, puis reporter de l'autre côté" },
    ],
    reflexes: [
      { si: "l'axe est vertical (une droite $x = \\ldots$)", alors: "l'ordonnée reste la même, seule l'abscisse change" },
      { si: "l'axe est horizontal (une droite $y = \\ldots$)", alors: "l'abscisse reste la même, seule l'ordonnée change" },
      { si: "le point est déjà posé sur l'axe", alors: "son image, c'est lui-même : il ne bouge pas" },
      { si: "« complète la figure » ou « trouve l'image »", alors: "compte les carreaux jusqu'à l'axe, puis reporte la même distance de l'autre côté" },
    ],
    pieges: [
      "Placer l'image trop loin ou trop près : il faut la **même distance** à l'axe des deux côtés.",
      "Changer les deux nombres : avec un axe vertical ($x = 4$), l'ordonnée ne change pas, seule l'abscisse bouge.",
      "Croire qu'un point posé sur l'axe se déplace : il reste exactement au même endroit.",
    ],
    reel: "Sur le lagon de l'Ermitage, un cocotier se reflète dans l'eau calme : l'arbre et son image sont à la même distance de la surface, comme de part et d'autre d'un axe de symétrie.",
  },
  {
    id: "figure_plane",
    emoji: "🔺",
    titre: "Figures planes",
    domaine: "Espace et géométrie",
    essentiel:
      "On reconnaît une **figure plane** à ses **côtés** et ses **angles**. Le **triangle** a $3$ côtés ; le **carré**, le **rectangle** et le **losange** en ont $4$. Le **cercle** regroupe tous les points à la **même distance** du **centre**.",
    formules: [
      { label: "Le triangle", latex: "$3$ côtés et $3$ sommets" },
      { label: "Le carré", latex: "$4$ côtés égaux $+$ $4$ angles droits" },
      { label: "Le rectangle", latex: "$4$ angles droits, côtés opposés égaux" },
      { label: "Le losange", latex: "$4$ côtés égaux (pas forcément d'angle droit)" },
      { label: "Le cercle", latex: "diamètre $= 2 \\times$ rayon (rayon $4 \\to$ diamètre $8$ cm)" },
    ],
    reflexes: [
      { si: "la figure a $3$ côtés", alors: "c'est un triangle : cherche l'angle droit (rectangle) ou les côtés égaux (isocèle, équilatéral)" },
      { si: "la figure a $4$ côtés", alors: "regarde les angles droits et les côtés égaux (carré, rectangle, losange)" },
      { si: "on donne le rayon et on demande le diamètre", alors: "multiplie par $2$" },
      { si: "« tracer un cercle » ou « un angle droit »", alors: "compas pour le cercle (centre $+$ rayon), équerre pour l'angle droit" },
    ],
    pieges: [
      "Confondre rayon et diamètre : le diamètre est deux fois le rayon. Rayon $4$ cm donne diamètre $8$ cm, pas $2$ cm.",
      "Confondre le cercle (le contour, le trait) et le disque (toute la surface coloriée à l'intérieur).",
      "Croire qu'un triangle rectangle a plusieurs angles droits : il n'en a qu'un seul.",
    ],
    reel: "Autour du Piton de la Fournaise, la zone à $5$ km du cratère dessine un cercle : tous ses points sont à la même distance du centre.",
  },
  {
    id: "solide",
    emoji: "🧊",
    titre: "Solides",
    domaine: "Espace et géométrie",
    essentiel:
      "Un **solide** est un objet en volume. On le décrit par ses **faces** (surfaces plates), ses **arêtes** (les bords) et ses **sommets** (les coins). Le **patron** est le solide **déplié à plat** : replié, il redonne le solide.",
    formules: [
      { label: "Cube et pavé droit", latex: "$6$ faces, $8$ sommets, $12$ arêtes" },
      { label: "Face, arête, sommet", latex: "face $=$ surface plate ; arête $=$ bord ; sommet $=$ coin" },
      { label: "Pyramide à base carrée", latex: "$1$ carré $+ 4$ triangles $= 5$ faces, $5$ sommets" },
      { label: "Cylindre et cône", latex: "cylindre $= 2$ cercles ; cône $= 1$ cercle $+$ pointe" },
      { label: "Boule", latex: "$0$ face plate, $0$ arête, $0$ sommet : elle roule partout" },
    ],
    reflexes: [
      { si: "« toutes les faces sont des carrés »", alors: "c'est un cube" },
      { si: "« il roule dans tous les sens »", alors: "c'est une boule" },
      { si: "« déplié à plat », « en carton à replier »", alors: "on parle du patron" },
      { si: "« 1 carré et 4 triangles »", alors: "c'est une pyramide" },
    ],
    pieges: [
      "Confondre l'**arête** (le bord entre deux faces) et le **sommet** (le coin pointu).",
      "Croire qu'un **cylindre** a des faces rectangulaires : ses deux bases sont des **cercles**.",
      "Oublier de compter les **cubes cachés** derrière, dans un assemblage de cubes.",
    ],
    reel: "Sur le marché de Saint-Paul, une boîte de conserve de letchis a la forme d'un cylindre, et le cornet de glace, lui, est un cône",
  },
  {
    id: "tableau",
    emoji: "📋",
    titre: "Tableaux",
    domaine: "Données",
    essentiel:
      "Un **tableau** range des nombres en **lignes** et en **colonnes**. Pour lire une case, on **croise** la bonne **ligne** et la bonne **colonne**. Une **ligne** ou une **colonne** entière, on peut l'**additionner** pour trouver un **total**.",
    formules: [
      { label: "Lire une case", latex: "case = croisement d'une **ligne** et d'une **colonne**" },
      { label: "Total d'une ligne", latex: "$18 + 12 + 25 = 55$" },
      { label: "Valeur manquante avec le total", latex: "$40 - (15 + 10) = 15$" },
      { label: "Comparer deux cases (différence)", latex: "$26 - 22 = 4$ de plus" },
      { label: "Le plus / le moins", latex: "plus grand nombre = le plus ; plus petit = le moins" },
    ],
    reflexes: [
      { si: "« combien de … pour … ? »", alors: "croiser la bonne ligne et la bonne colonne" },
      { si: "« en tout », « au total »", alors: "additionner toutes les cases demandées" },
      { si: "« combien de plus », « combien de moins »", alors: "faire une soustraction entre les deux nombres" },
      { si: "« le plus choisi », « le moins choisi »", alors: "chercher le plus grand ou le plus petit nombre" },
    ],
    pieges: [
      "Se tromper de croisement : lire la case d'à côté au lieu de croiser la bonne ligne ET la bonne colonne.",
      "Coller les chiffres au lieu d'additionner : $12$ et $18$ font $30$, pas $1218$.",
      "Pour une valeur manquante, oublier le total : il faut $40 - (15 + 10) = 15$, on ne fait pas juste $15 + 10$.",
    ],
    reel: "Au marché de Saint-Pierre, un tableau note les mangues, ananas et bananes du matin et de l'après-midi : on lit chaque case et on additionne une ligne pour connaître le total de la journée.",
  },
  {
    id: "graphique",
    emoji: "📊",
    titre: "Graphiques et diagrammes",
    domaine: "Données",
    essentiel:
      "Un **graphique** montre des données avec des **barres**, des **bâtons** ou un **camembert**. Chaque **barre** correspond à une **valeur** : plus la barre est **haute**, plus le nombre est **grand**. On sait ainsi **lire**, **comparer** et **calculer** vite.",
    formules: [
      { label: "Lire une barre", latex: "hauteur de la barre $=$ la valeur (barre Basket $= 14$)" },
      { label: "Total : on additionne toutes les barres", latex: "$12 + 8 + 10 + 14 = 44$" },
      { label: "Combien de plus : on soustrait", latex: "$16 - 9 = 7$" },
      { label: "Barre manquante : total moins ce qu'on connaît", latex: "$40 - 27 = 13$" },
      { label: "Le plus / le moins", latex: "barre la plus haute $=$ plus grande valeur" },
    ],
    reflexes: [
      { si: "« le plus », « la plus haute barre », « le plus choisi »", alors: "cherche la **plus grande** valeur (barre la plus haute)" },
      { si: "« combien de plus », « différence », « écart »", alors: "fais une **soustraction**" },
      { si: "« en tout », « le total »", alors: "**additionne** toutes les barres" },
      { si: "« combien manque-t-il », « compléter jusqu'à »", alors: "soustrais ce qu'on connaît au **total**" },
    ],
    pieges: [
      "Lire la valeur d'une barre voisine : bien suivre le nom sous la bonne barre.",
      "Pour « combien de plus », additionner au lieu de soustraire : $16 - 9 = 7$, pas $25$.",
      "Oublier une barre en calculant le total : il faut ajouter TOUTES les barres.",
    ],
    reel: "Au marché de Saint-Pierre, un graphique en barres compare les ventes de fruits : la barre des bananes qui monte le plus haut, à $25$, montre le fruit le plus vendu de la journée.",
  },
  {
    id: "probabilite",
    emoji: "🎲",
    titre: "Probabilités simples",
    domaine: "Données",
    essentiel:
      "En **probabilités**, on dit si un événement est **certain** (toujours), **possible** (parfois) ou **impossible** (jamais). Une situation de **hasard**, c'est quand on ne connaît pas le résultat à l'avance. Pour **comparer les chances**, on **compte** : le plus nombreux a le plus de chances.",
    formules: [
      { label: "Les trois mots", latex: "**certain** = toujours · **possible** = parfois · **impossible** = jamais" },
      { label: "Sur un dé (faces 1 à 6)", latex: "obtenir $7$ est impossible · un nombre de $1$ à $6$ est certain" },
      { label: "Comparer, c'est compter", latex: "$3$ rouges et $1$ verte : rouge a le plus de chances" },
      { label: "Autant de chances", latex: "$2$ rouges, $2$ bleues, $2$ vertes : c'est pareil" },
      { label: "Sur une roue", latex: "la plus **grande part** a le plus de chances de sortir" },
    ],
    reflexes: [
      { si: "« on ne sait pas à l'avance » (dé, roue, sac, tombola)", alors: "c'est une situation de hasard" },
      { si: "un nombre qui n'est pas sur le dé ($7$, $8$, $10$)", alors: "c'est impossible" },
      { si: "« quelle couleur a le plus de chances ? »", alors: "compter chaque couleur, la plus nombreuse gagne" },
      { si: "même nombre de billes de chaque couleur", alors: "elles ont autant de chances" },
    ],
    pieges: [
      "Croire qu'obtenir $7$ sur un dé est possible : le dé ne va que de $1$ à $6$, donc c'est impossible.",
      "Dire « c'est pareil » quand les nombres sont différents : $3$ rouges et $1$ verte, ce n'est pas pareil.",
      "Confondre possible et certain : obtenir un nombre pair est possible ($2$, $4$ ou $6$), pas certain, car on peut aussi avoir $1$, $3$ ou $5$.",
    ],
    reel: "À la kermesse de l'école à Saint-Pierre, une roue a $3$ parts rouges et $1$ part bleue : le rouge a le plus de chances de sortir.",
  },
  {
    id: "algorithmique",
    emoji: "🐢",
    titre: "Algorithmique",
    domaine: "Algorithmique",
    essentiel:
      "Un **programme**, c'est une **suite d'instructions**. On les lit **de haut en bas**, une par une. **Répéter** sert à refaire la même chose sans tout réécrire.",
    formules: [
      { label: "L'ordre compte", latex: "on lit et on exécute **de haut en bas**, une instruction à la fois" },
      { label: "Répéter, c'est multiplier", latex: "$3$ fois « Avancer $10$ » $= 3 \\times 10 = 30$ pas" },
      { label: "Tourner ne déplace pas", latex: "$4$ cases $+$ tourner $+$ $3$ cases $= 7$ cases" },
      { label: "Dessiner un carré", latex: "$4$ côtés : répéter $4$ fois « Avancer · Tourner $90^\\circ$ »" },
      { label: "Suite logique", latex: "$2, 4, 6, 8, \\dots$ : règle $+2$, donc $10$" },
    ],
    reflexes: [
      { si: "« combien de pas / de cases en tout »", alors: "additionne les avancées, oublie les tournants" },
      { si: "« Répéter N fois »", alors: "multiplie : $N \\times$ les pas de la boucle" },
      { si: "« quelle figure dessine le robot »", alors: "compte les répétitions : c'est le nombre de côtés ($4 \\to$ carré)" },
      { si: "« Si … sinon … »", alors: "regarde si la condition est vraie, puis choisis la bonne action" },
    ],
    pieges: [
      "Compter un tournant comme un déplacement : tourner change la **direction** mais ne fait pas avancer.",
      "Oublier de multiplier : « Répéter $3$ fois Avancer $10$ » fait $30$ pas, pas $10$.",
      "Lire les instructions dans le désordre : un programme se lit toujours **de haut en bas**.",
    ],
    reel: "Pour guider un robot du port de Saint-Pierre au marché, tu écris un algorithme : avance de $3$ cases, tourne à droite, avance de $2$ cases",
  },
];

const BANQUES: Record<string, TutorBankItemV4[]> = {
  nombre_entier: nombresEntiersBank,
  suite: suitesBank,
  tables_multiplication: MultiplicationTablesBank,
  multiplication: multiplicationBank,
  division: divisionBank,
  fraction: fractionsBank,
  nombre_decimal: decimauxBank,
  calcul: calculBank,
  probleme: problemesBank,
  algebre: algebreBank,
  proportionnalite: proportionnaliteBank,
  longueur: longueurBank,
  masse: masseBank,
  contenance: contenanceBank,
  duree: dureesBank,
  perimetre: perimetresBank,
  aire: airesBank,
  angle: anglesBank,
  reperage: reperageBank,
  droite: droitesBank,
  symetrie: symetrieBank,
  figure_plane: figuresPlanesBank,
  solide: solidesBank,
  tableau: tableauxBank,
  graphique: graphiquesBank,
  probabilite: probabilitesBank,
  algorithmique: algorithmiqueBank,
};

export const KIT_MATHS_CM1: KitData = {
  slug: "maths-cm1",
  titre: "Guide de survie · Maths CM1",
  baseline:
    "Les 27 chapitres du programme de CM1 en 27 fiches : l'essentiel, les réflexes, les pièges — et un test corrigé par chapitre. Pour bien avancer en primaire et préparer le CM2. À imprimer, à glisser dans le cahier.",
  matiere: "maths",
  classeLabel: "CM1",
  coachClasse: "cm1",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
