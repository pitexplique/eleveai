// ─── Guide de survie · Maths CM2 (dernière année de primaire) ────────────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/maths/cm2/notions.ts
// - checklists     = micro-compétences de microSkills.ts (BO cycle 3)
// - test de survie = items "fixed" puisés dans les banques du coach
// Condensés écrits par 28 rédacteurs parallèles (workflow du 27/07) puis VÉRIFIÉS
// à la main contre le BO cycle 3 et les banques (exactitude des exemples, périmètre
// CM2 strict — pas de débordement collège, couverture des micros).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/cm2/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { nombresEntiersBank } from "@/lib/tutor-v4/questionBank/cm2/maths/nombres-entiers.bank";
import { suitesBank } from "@/lib/tutor-v4/questionBank/cm2/maths/suites.bank";
import { multiplicationBank } from "@/lib/tutor-v4/questionBank/cm2/maths/multiplication.bank";
import { divisionBank } from "@/lib/tutor-v4/questionBank/cm2/maths/division.bank";
import { fractionsBank } from "@/lib/tutor-v4/questionBank/cm2/maths/fractions.bank";
import { nombresDecimauxBank } from "@/lib/tutor-v4/questionBank/cm2/maths/nombres-decimaux.bank";
import { calculBank } from "@/lib/tutor-v4/questionBank/cm2/maths/calcul.bank";
import { problemeBank } from "@/lib/tutor-v4/questionBank/cm2/maths/probleme.bank";
import { algebreBank } from "@/lib/tutor-v4/questionBank/cm2/maths/algebre.bank";
import { proportionnaliteBank } from "@/lib/tutor-v4/questionBank/cm2/maths/proportionnalite.bank";
import { pourcentagesBank } from "@/lib/tutor-v4/questionBank/cm2/maths/pourcentages.bank";
import { echellesBank } from "@/lib/tutor-v4/questionBank/cm2/maths/echelles.bank";
import { longueursBank } from "@/lib/tutor-v4/questionBank/cm2/maths/longueurs.bank";
import { massesBank } from "@/lib/tutor-v4/questionBank/cm2/maths/masses.bank";
import { contenancesBank } from "@/lib/tutor-v4/questionBank/cm2/maths/contenance.bank";
import { dureesBank } from "@/lib/tutor-v4/questionBank/cm2/maths/durees.bank";
import { perimetresBank } from "@/lib/tutor-v4/questionBank/cm2/maths/perimetres.bank";
import { airesBank } from "@/lib/tutor-v4/questionBank/cm2/maths/aires.bank";
import { anglesBank } from "@/lib/tutor-v4/questionBank/cm2/maths/angles.bank";
import { reperageBank } from "@/lib/tutor-v4/questionBank/cm2/maths/reperage.bank";
import { droitesBank } from "@/lib/tutor-v4/questionBank/cm2/maths/droites.bank";
import { symetrieBank } from "@/lib/tutor-v4/questionBank/cm2/maths/symetrie.bank";
import { figuresPlanesBank } from "@/lib/tutor-v4/questionBank/cm2/maths/figures-planes.bank";
import { solidesBank } from "@/lib/tutor-v4/questionBank/cm2/maths/solides.bank";
import { tableauxBank } from "@/lib/tutor-v4/questionBank/cm2/maths/tableaux.bank";
import { graphiquesBank } from "@/lib/tutor-v4/questionBank/cm2/maths/graphiques.bank";
import { probabilitesBank } from "@/lib/tutor-v4/questionBank/cm2/maths/probabilites.bank";
import { algorithmiqueBank } from "@/lib/tutor-v4/questionBank/cm2/maths/algorithmique.bank";
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
      "Un **nombre entier** s'écrit avec des chiffres, et chaque chiffre a une **valeur** selon sa **position** : unités, dizaines, centaines, milliers. On apprend à le **lire**, le **comparer**, le **décomposer**, l'**arrondir** et à reconnaître ses **multiples**.",
    formules: [
      { label: "Décomposer un nombre", latex: "on écrit la valeur de chaque chiffre : $4582 = 4000 + 500 + 80 + 2$" },
      { label: "Comparer deux nombres", latex: "celui qui a le plus de chiffres est le plus grand ; sinon on compare de gauche à droite ($45098 < 45908$)" },
      { label: "Arrondir à la centaine", latex: "on regarde les dizaines : $5$ ou plus on monte ($4682 \\to 4700$)" },
      { label: "Arrondir au millier", latex: "on regarde les centaines : moins de $5$ on garde ($73249 \\to 73000$)" },
      { label: "Reconnaître un multiple", latex: "un multiple est dans la table : $42 = 6 \\times 7$, donc $42$ est un multiple de $6$" },
    ],
    reflexes: [
      { si: "« range du plus petit au plus grand », « ordre croissant »", alors: "comparer les nombres chiffre par chiffre en partant de la gauche" },
      { si: "« environ », « à peu près », « arrondir »", alors: "regarder le chiffre juste après le rang demandé" },
      { si: "« est-ce un multiple de 6 ? », « dans la table »", alors: "chercher le nombre dans la table de multiplication" },
      { si: "« décompose ce nombre »", alors: "donner la valeur de chaque chiffre selon sa position" },
    ],
    pieges: [
      "Oublier un zéro en écrivant : « quarante-huit mille sept » s'écrit 48 007, et non 4 807.",
      "Croire qu'un nombre est plus grand parce qu'il contient un gros chiffre : on compare position par position.",
      "Se tromper de rang pour arrondir : pour la centaine on regarde les dizaines, pour le millier on regarde les centaines.",
    ],
    reel: "Le Piton de la Fournaise mesure 2 632 m ; arrondi à la centaine près, on dit qu'il fait environ 2 600 m.",
  },
  {
    id: "suite",
    emoji: "🔗",
    titre: "Suites de nombres",
    domaine: "Nombres et calculs",
    essentiel:
      "Une **suite**, c'est une liste de nombres rangés selon une **règle**. Pour la continuer, on cherche ce qui change d'un nombre au suivant, puis on **refait pareil**. Une suite **croissante** monte, une suite **décroissante** descend.",
    formules: [
      { label: "Continuer une suite", latex: "on trouve l'écart, puis on refait pareil (ex. $4 ; 8 ; 12 ; 16$, on ajoute $4$, ensuite $20$)" },
      { label: "Trouver la règle", latex: "on compare deux nombres voisins (ex. $7-4=3$, la règle est « ajouter $3$ »)" },
      { label: "Parfois on multiplie", latex: "la règle n'est pas toujours $+$ (ex. $2 ; 4 ; 8 ; 16$, on multiplie par $2$)" },
      { label: "Croissante ou décroissante", latex: "croissante = les nombres montent ; décroissante = ils descendent" },
      { label: "Avec des décimaux aussi", latex: "ex. $0{,}5 ; 1 ; 1{,}5 ; 2$, on ajoute $0{,}5$ à chaque fois" },
    ],
    reflexes: [
      { si: "« continue la suite », « nombre suivant »", alors: "trouver l'écart entre deux nombres voisins, puis refaire pareil" },
      { si: "« quelle est la règle »", alors: "calculer un écart : le nombre suivant moins le précédent" },
      { si: "l'écart n'est pas toujours le même", alors: "essayer de multiplier par le même nombre" },
      { si: "« croissante ou décroissante »", alors: "regarder si les nombres montent (croissante) ou descendent (décroissante)" },
    ],
    pieges: [
      "Regarder un seul écart : la règle doit marcher entre TOUS les nombres voisins, pas juste les deux premiers.",
      "Croire que c'est toujours une addition : parfois on multiplie ($2 ; 4 ; 8 ; 16$, c'est $\\times 2$).",
      "Regarder seulement le premier et le dernier nombre pour dire « croissante » : il faut vérifier chaque passage.",
    ],
    reel: "Sur un sentier de randonnée à La Réunion, on place une balise tous les $5$ m : $5 ; 10 ; 15 ; 20$, la suivante sera à $25$ m.",
  },
  {
    id: "multiplication",
    emoji: "✖️",
    titre: "Multiplication",
    domaine: "Nombres et calculs",
    essentiel:
      "**Multiplier**, c'est additionner plusieurs fois le même nombre : $4 \\times 3$, c'est $3+3+3+3$. On apprend ses **tables** par cœur pour aller vite. Pour les grands nombres, on **pose** la multiplication en colonnes, sans oublier les **retenues**.",
    formules: [
      { label: "Les tables par cœur", latex: "de $2$ à $9$ (ex. $6 \\times 7 = 42$)" },
      { label: "L'ordre ne change rien", latex: "$8 \\times 5 = 5 \\times 8 = 40$" },
      { label: "Multiplier par 10, 100, 1000", latex: "on ajoute $1$, $2$ ou $3$ zéros (ex. $34 \\times 100 = 3400$)" },
      { label: "Astuce pour multiplier par 5", latex: "$\\times 10$ puis la moitié (ex. $24 \\times 5 = 240 \\div 2 = 120$)" },
      { label: "Multiplication posée", latex: "on multiplie chiffre par chiffre, on aligne, on ajoute les retenues" },
    ],
    reflexes: [
      { si: "« combien en tout », « chaque », « fois »", alors: "c'est souvent une multiplication" },
      { si: "multiplier par $10$, $100$ ou $1000$", alors: "ajouter le bon nombre de zéros" },
      { si: "un grand nombre à multiplier", alors: "poser l'opération en colonnes" },
      { si: "multiplier par $5$", alors: "faire $\\times 10$ puis prendre la moitié" },
    ],
    pieges: [
      "Oublier une retenue dans la multiplication posée : tout le résultat devient faux.",
      "Se tromper dans les tables de $6$, $7$ et $8$ : ce sont les plus oubliées, il faut les réviser.",
      "Croire que multiplier par $100$ ajoute un seul zéro : il en faut deux (ex. $73 \\times 100 = 7300$).",
    ],
    reel: "Pour acheter $6$ sacs de $8$ letchis au marché de Saint-Pierre, on calcule $6 \\times 8 = 48$ letchis.",
  },
  {
    id: "division",
    emoji: "➗",
    titre: "Division",
    domaine: "Nombres et calculs",
    essentiel:
      "**Diviser**, c'est **partager** en parts égales, ou faire des **groupes** de même taille. Le résultat s'appelle le **quotient**. Souvent il reste quelques objets : c'est le **reste**, et il est toujours **plus petit** que le diviseur.",
    formules: [
      { label: "Diviser, c'est partager", latex: "$24 \\div 6 = 4$ (24 objets partagés entre 6)" },
      { label: "La division vérifie la multiplication", latex: "$24 \\div 6 = 4$ car $6 \\times 4 = 24$" },
      { label: "Les mots de la division", latex: "dividende $\\div$ diviseur $=$ quotient (et reste)" },
      { label: "Division avec reste", latex: "$37 = 5 \\times 7 + 2$ : diviseur $\\times$ quotient $+$ reste" },
      { label: "Le reste est petit", latex: "le reste est toujours plus petit que le diviseur" },
    ],
    reflexes: [
      { si: "« partager », « distribuer », « chacun reçoit »", alors: "c'est une division" },
      { si: "« combien de paquets / de groupes de … »", alors: "c'est aussi une division" },
      { si: "on ne connaît pas le quotient", alors: "chercher dans les tables : diviseur $\\times$ ? $=$ dividende" },
      { si: "il reste des objets", alors: "vérifier que le reste est plus petit que le diviseur" },
    ],
    pieges: [
      "Écrire un reste plus grand que le diviseur : $38 \\div 6 = 5$ reste $8$ est faux, car $8$ est plus grand que $6$ (on peut encore faire un groupe).",
      "Oublier le reste dans un problème : pour $29$ élèves dans des voitures de $4$ places, $29 \\div 4 = 7$ reste $1$, donc il faut $8$ voitures, pas $7$.",
      "Inverser les deux nombres : partager $20$ billes entre $5$ enfants, c'est $20 \\div 5$, jamais $5 \\div 20$.",
    ],
    reel: "Au marché de Saint-Pierre, pour partager $36$ letchis dans $4$ sachets, on calcule $36 \\div 4 = 9$ letchis par sachet.",
  },
  {
    id: "fraction",
    emoji: "🍕",
    titre: "Fractions",
    domaine: "Nombres et calculs",
    essentiel:
      "Une **fraction**, c'est une ou plusieurs **parts égales** d'un tout. Le nombre du **haut** (le numérateur) dit combien de parts on prend. Le nombre du **bas** (le dénominateur) dit en combien de parts égales on a partagé. Une fraction est aussi un **nombre** : on peut la placer sur une **droite graduée**.",
    formules: [
      { label: "Lire une fraction", latex: "le haut $=$ les parts prises, le bas $=$ les parts égales du tout ($\\frac{3}{4}$ : $3$ parts sur $4$)" },
      { label: "Placer sur une droite graduée", latex: "partager l'unité en autant de parts que le nombre du bas, puis avancer du nombre du haut" },
      { label: "Fraction égale à 1", latex: "quand le haut est égal au bas (ex. $\\frac{4}{4} = 1$)" },
      { label: "Fractions égales (équivalentes)", latex: "on multiplie le haut ET le bas par le même nombre : $\\frac{1}{2} = \\frac{2}{4} = \\frac{5}{10}$" },
      { label: "Fraction décimale", latex: "son dénominateur est $10$, $100$ ou $1000$ (ex. $\\frac{7}{10}$)" },
    ],
    reflexes: [
      { si: "« quelle fraction est coloriée / représentée »", alors: "parts coloriées $/$ nombre total de parts égales" },
      { si: "placer une fraction sur une droite", alors: "partager l'unité selon le nombre du bas, avancer du nombre du haut" },
      { si: "comparer deux fractions qui ont le même bas", alors: "la plus grande est celle qui a le plus grand haut" },
      { si: "le bas est $10$, $100$ ou $1000$", alors: "c'est une fraction décimale" },
    ],
    pieges: [
      "Inverser le haut et le bas : écrire $\\frac{4}{3}$ au lieu de $\\frac{3}{4}$.",
      "Oublier que les parts doivent être **égales** : sinon ce n'est pas une vraie fraction.",
      "Croire que $\\frac{1}{4}$ est plus grand que $\\frac{1}{2}$ parce que $4 > 2$ : plus le bas est grand, plus les parts sont petites.",
    ],
    reel: "Pour une tarte à la banane partagée en $4$ parts égales à Saint-Pierre, si on en mange $3$, on a mangé les $\\frac{3}{4}$ de la tarte.",
  },
  {
    id: "nombre_decimal",
    emoji: "🪙",
    titre: "Nombres décimaux",
    domaine: "Nombres et calculs",
    essentiel:
      "Un **nombre décimal**, c'est un nombre avec une **virgule** : $3{,}6$. Avant la virgule, la **partie entière** ; juste après, les **dixièmes**, puis les **centièmes**. C'est la **place** de chaque chiffre qui donne sa valeur.",
    formules: [
      { label: "Une fraction décimale s'écrit avec une virgule", latex: "$\\frac{7}{10} = 0{,}7$ et $\\frac{34}{100} = 0{,}34$" },
      { label: "Chaque chiffre a sa place après la virgule", latex: "1er rang = dixièmes, 2e rang = centièmes (dans $8{,}36$, le $6$ vaut des centièmes)" },
      { label: "Comparer deux décimaux", latex: "on ajoute des zéros pour avoir autant de chiffres : $0{,}7 = 0{,}70 > 0{,}65$" },
      { label: "Arrondir à l'unité la plus proche", latex: "dixième $5$ ou plus : on monte ; sinon on garde ($3{,}6 \\to 4$ ; $7{,}2 \\to 7$)" },
      { label: "Un zéro tout au bout ne change rien", latex: "$2{,}5 = 2{,}50$" },
    ],
    reflexes: [
      { si: "« combien de dixièmes », « chiffre des centièmes »", alors: "regarder après la virgule : 1er rang = dixièmes, 2e = centièmes" },
      { si: "une fraction sur $10$ ou sur $100$", alors: "l'écrire avec une virgule ($\\frac{6}{100} = 0{,}06$)" },
      { si: "« le plus grand », « range dans l'ordre »", alors: "mettre le même nombre de chiffres après la virgule, puis comparer" },
      { si: "« arrondir à l'unité »", alors: "regarder le chiffre des dixièmes ($5$ ou plus, on monte)" },
    ],
    pieges: [
      "Croire que $0{,}65$ est plus grand que $0{,}7$ parce que $65 > 7$ : il faut comparer rang par rang, et $0{,}7 = 0{,}70$.",
      "Confondre dixièmes et centièmes : $5$ centièmes s'écrivent $0{,}05$, et non $0{,}5$.",
      "Lire la virgule comme une séparation entre deux nombres entiers : dans $3{,}6$ le $6$ ce sont des dixièmes, pas six unités.",
    ],
    reel: "Au marché de Saint-Pierre, un fruit à $2{,}50$ € coûte pareil qu'un fruit à $2{,}5$ € : le zéro au bout ne change rien.",
  },
  {
    id: "calcul",
    emoji: "🧮",
    titre: "Calculs",
    domaine: "Nombres et calculs",
    essentiel:
      "**Calculer**, c'est trouver le résultat d'une opération. Les petits calculs se font **de tête** (doubles, compléments à $100$). Pour les grands nombres, on **pose** l'opération en colonnes : on aligne bien les chiffres et on n'oublie pas les **retenues**.",
    formules: [
      { label: "Calculer de tête", latex: "double de $25 = 50$ ; complément : $37 + 63 = 100$" },
      { label: "Poser une opération", latex: "on aligne les unités sous les unités, sans oublier les retenues" },
      { label: "Multiplier par 10 ou 100", latex: "on ajoute $1$ ou $2$ zéros ($23 \\times 10 = 230$)" },
      { label: "Additionner ou soustraire des décimaux", latex: "on aligne les virgules ($4{,}5 = 4{,}50$)" },
      { label: "Priorités", latex: "$\\times$ avant $+$ ; parenthèses d'abord ($4 + 3 \\times 5 = 19$)" },
    ],
    reflexes: [
      { si: "« double », « moitié », « $\\times 10$ », « $\\times 100$ »", alors: "on calcule de tête, pas besoin de poser" },
      { si: "de grands nombres à additionner ou soustraire", alors: "on pose en colonnes en alignant les rangs" },
      { si: "il y a des virgules dans le calcul", alors: "on aligne les virgules (on ajoute des zéros si besoin)" },
      { si: "il y a un $\\times$ et un $+$ dans le même calcul", alors: "on fait la multiplication d'abord" },
    ],
    pieges: [
      "Oublier une retenue quand on pose l'opération : tout le résultat devient faux.",
      "Coller les décimaux à droite au lieu d'aligner les virgules : $4{,}5 + 2{,}35$ se pose $4{,}50 + 2{,}35$.",
      "Faire l'addition avant la multiplication dans $4 + 3 \\times 5$ : la multiplication passe toujours en premier.",
    ],
    reel: "Au marché de Saint-Pierre, un ananas à $3{,}50$ € et des letchis à $2{,}25$ € : on aligne les virgules et $3{,}50 + 2{,}25 = 5{,}75$ €.",
  },
  {
    id: "probleme",
    emoji: "🧩",
    titre: "Problèmes",
    domaine: "Nombres et calculs",
    essentiel:
      "Un **problème**, c'est une petite histoire avec une **question**. Il faut choisir la bonne **opération** : $+$, $-$, $\\times$ ou $\\div$. Parfois il y a **plusieurs étapes** : on calcule dans l'ordre, une étape après l'autre. À la fin, on écrit une **phrase réponse** avec l'**unité**.",
    formules: [
      { label: "On réunit / il y a en tout", latex: "addition $+$ (ex. il gagne, il reçoit)" },
      { label: "On enlève / il reste", latex: "soustraction $-$ (ex. il donne, il vend)" },
      { label: "Des groupes identiques", latex: "multiplication $\\times$ (ex. $6$ boîtes de $8 = 6 \\times 8$)" },
      { label: "On partage en parts égales", latex: "division $\\div$ (ex. $36$ bonbons pour $4 = 36 \\div 4$)" },
      { label: "Problème à plusieurs étapes", latex: "calculer dans l'ordre : d'abord $3 \\times 8 = 24$, puis $24 + 6 = 30$" },
    ],
    reflexes: [
      { si: "« en tout », « au total », « il gagne », « il reçoit »", alors: "penser à l'addition $+$" },
      { si: "« il reste », « il donne », « il en vend »", alors: "penser à la soustraction $-$" },
      { si: "« combien de bus », un partage qui laisse un reste", alors: "diviser, puis regarder le reste (souvent $1$ de plus)" },
      { si: "on a trouvé le résultat", alors: "écrire une phrase réponse avec l'unité" },
    ],
    pieges: [
      "Choisir l'opération juste sur un mot (« partage » $\\to$ division) sans lire toute l'histoire : parfois le mot trompe.",
      "Dans un problème à plusieurs étapes, calculer dans l'ordre des nombres au lieu de l'ordre logique : d'abord multiplier, ensuite ajouter.",
      "Répondre seulement « 42 » sans phrase ni unité : on ne sait pas si c'est $42$ euros, $42$ km ou $42$ élèves.",
    ],
    reel: "Au marché de Saint-Pierre, Léa achète $3$ sachets de letchis à $5$ € et un jus à $2$ € : $3 \\times 5 = 15$, puis $15 + 2 = 17$ €.",
  },
  {
    id: "algebre",
    emoji: "❓",
    titre: "Nombre inconnu et égalités",
    domaine: "Algèbre",
    essentiel:
      "Le signe **égal** ne veut pas dire « ça donne le résultat ». Il veut dire que c'est **pareil des deux côtés**. Pour trouver un **nombre mystère** (une case ou un $?$), on fait l'**opération inverse**. Une **suite** de nombres suit une **règle** qui se répète : il faut la trouver, puis la continuer.",
    formules: [
      { label: "Le signe = veut dire « pareil des deux côtés »", latex: "$8 + 4 = 6 + 6$ est vrai car $12 = 12$" },
      { label: "Compléter une addition (nombre manquant)", latex: "$7 + ? = 12$ : on fait $12 - 7 = 5$" },
      { label: "Nombre mystère : l'opération inverse", latex: "si on a $\\times$, on fait $\\div$ : $? \\times 4 = 36$ donne $36 \\div 4 = 9$" },
      { label: "Schéma en barres", latex: "la grande barre $=$ le total ; on la coupe en parties, puis on soustrait" },
      { label: "Motif (suite de nombres)", latex: "$3, 6, 9, 12$ : on ajoute $3$ à chaque fois, donc ensuite $15$" },
    ],
    reflexes: [
      { si: "« je pense à un nombre », « nombre mystère », une case à trouver", alors: "faire l'opération inverse (si on a ajouté, on soustrait ; si on a multiplié, on divise)" },
      { si: "une égalité à compléter comme $8 + ? = 20$", alors: "calculer le côté connu, puis chercher ce qui manque" },
      { si: "un total et une seule partie connue", alors: "dessiner un schéma en barres et soustraire pour trouver l'autre partie" },
      { si: "une suite comme $2, 4, 6, 8$", alors: "chercher la règle qui se répète, puis la continuer" },
    ],
    pieges: [
      "Croire que le signe $=$ veut dire « ça donne » : il veut dire « c'est pareil des deux côtés ».",
      "Pour $? - 5 = 8$, croire que le nombre mystère est petit : on cherche le départ, donc $8 + 5 = 13$.",
      "Continuer une suite sans vérifier la règle sur tous les nombres (dire $+2$ alors que c'était $\\times 2$).",
    ],
    reel: "Tu as $20$ € en poche au marché de Saint-Pierre. Après avoir acheté un pain bouchon, il te reste $12$ €. Le nombre mystère (le prix) se trouve avec $20 - 12 = 8$ €.",
  },
  {
    id: "proportionnalite",
    emoji: "⚖️",
    titre: "Proportionnalité",
    domaine: "Proportionnalité",
    essentiel:
      "Une situation est **proportionnelle** quand on multiplie toujours par le **même nombre** : si on prend 2 fois plus d'objets, on paie 2 fois plus. Ce nombre magique s'appelle le **coefficient**. Pour trouver une valeur qui manque, on passe souvent par le **prix d'un seul objet** (le passage à l'unité).",
    formules: [
      { label: "Le coefficient", latex: "on multiplie toujours par le même nombre (ex. $3 \\times 4 = 12$)" },
      { label: "Le trouver", latex: "on divise l'arrivée par le départ ($12 \\div 3 = 4$)" },
      { label: "Passage à l'unité", latex: "prix de 1 objet, puis on multiplie ($18 \\div 3 = 6$, puis $5 \\times 6 = 30$)" },
      { label: "Linéarité", latex: "2 fois plus d'objets $=$ 2 fois plus cher" },
      { label: "Tableau", latex: "chaque colonne garde le même rapport" },
    ],
    reflexes: [
      { si: "« au même prix », « combien pour... »", alors: "c'est de la proportionnalité" },
      { si: "on connaît le prix de plusieurs objets", alors: "chercher d'abord le prix d'UN seul (÷)" },
      { si: "on passe d'un nombre à un autre dans un tableau", alors: "chercher le coefficient (÷)" },
      { si: "2 fois plus d'objets", alors: "2 fois plus cher (on double)" },
    ],
    pieges: [
      "Additionner au lieu de multiplier : si 1 mangue coûte $2$ €, 3 mangues coûtent $3 \\times 2 = 6$ €, pas $2+3$.",
      "Oublier le passage à l'unité et multiplier n'importe comment sans chercher le prix d'un seul objet.",
      "Croire que c'est proportionnel alors que ça ne l'est pas : il faut vérifier que doubler la quantité double bien le prix.",
    ],
    reel: "Au marché de Saint-Pierre, 3 kg de letchis coûtent $12$ €. Pour 5 kg, on calcule $12 \\div 3 = 4$ € le kilo, puis $5 \\times 4 = 20$ €.",
  },
  {
    id: "pourcentage",
    emoji: "💯",
    titre: "Pourcentages simples",
    domaine: "Proportionnalité",
    essentiel:
      "Un **pourcentage**, c'est une part **sur 100** : $50\\%$, c'est $50$ sur $100$. Certains reviennent tout le temps : **50 % = la moitié**, **25 % = un quart**, **10 % = un dixième**. Pour en calculer un, on prend cette part de la quantité.",
    formules: [
      { label: "Un pourcentage, c'est « sur 100 »", latex: "$25\\% = \\frac{25}{100}$" },
      { label: "50 %, c'est la moitié", latex: "$50\\% = \\frac{1}{2} = 0{,}5$ (on divise par $2$)" },
      { label: "25 % un quart, 75 % trois quarts", latex: "$25\\% = \\frac{1}{4}$ et $75\\% = \\frac{3}{4}$" },
      { label: "10 %, c'est un dixième", latex: "$10\\% = \\frac{1}{10}$ (on divise par $10$)" },
      { label: "Calculer un pourcentage", latex: "$50\\%$ de $80 = 80 \\div 2 = 40$" },
    ],
    reflexes: [
      { si: "le symbole %", alors: "remplace-le par « sur 100 » ($30\\% = \\frac{30}{100}$)" },
      { si: "« 50 % de »", alors: "prends la moitié : divise par $2$" },
      { si: "« 25 % de »", alors: "prends un quart : divise par $4$ ; « 10 % de » : divise par $10$" },
      { si: "« réduction », « en moins »", alors: "calcule le pourcentage, puis enlève-le du prix" },
    ],
    pieges: [
      "Croire que % veut dire « sur 10 » : $30\\%$, c'est $30$ sur $100$, jamais $30$ sur $10$.",
      "Répondre le pourcentage lui-même : $25\\%$ de $80$ n'est pas $25$, mais $80 \\div 4 = 20$.",
      "Confondre la réduction et le nouveau prix : $-25\\%$ sur $40$ € enlève $10$ €, donc il reste $30$ €, pas $25$ €.",
    ],
    reel: "Au marché de Saint-Pierre, un panier gourmand à $40$ € affiché $-25\\%$ : on enlève $40 \\div 4 = 10$ €, il reste $30$ € à payer.",
  },
  {
    id: "echelle",
    emoji: "🗺️",
    titre: "Échelles simples",
    domaine: "Proportionnalité",
    essentiel:
      "Une **échelle** relie une distance sur le **plan** (ou la carte) à la distance dans la **vraie vie**. « $1$ cm $\\rightarrow$ $10$ m » veut dire que $1$ cm dessiné, c'est $10$ m en vrai. Pour trouver la distance **réelle**, on **multiplie** ; pour la distance **sur le plan**, on **divise**.",
    formules: [
      { label: "Lire une échelle", latex: "$1$ cm $\\rightarrow$ $10$ m : $1$ cm sur le plan, c'est $10$ m en vrai" },
      { label: "Distance réelle (du plan vers le vrai)", latex: "mesure sur le plan $\\times$ ce que vaut $1$ cm (ex. $3 \\times 10 = 30$ m)" },
      { label: "Distance sur le plan (du vrai vers le plan)", latex: "distance réelle $\\div$ ce que vaut $1$ cm (ex. $30 \\div 10 = 3$ cm)" },
      { label: "On multiplie ou on divise, jamais on additionne", latex: "avec $1$ cm $\\rightarrow$ $10$ m, $3$ cm font $30$ m, pas $13$ m" },
      { label: "Ça marche aussi avec les nombres à virgule", latex: "$2{,}5 \\times 10 = 25$ m ; $25 \\div 10 = 2{,}5$ cm" },
    ],
    reflexes: [
      { si: "« combien ça fait en vrai », « distance réelle »", alors: "je multiplie la mesure du plan par ce que vaut $1$ cm" },
      { si: "« quelle longueur sur le plan », « sur la carte »", alors: "je divise la distance réelle par ce que vaut $1$ cm" },
      { si: "je vois une écriture « $1$ cm $\\rightarrow$ ... »", alors: "je la lis de gauche (le plan) vers la droite (le vrai)" },
    ],
    pieges: [
      "Additionner au lieu de multiplier : avec $1$ cm $\\rightarrow$ $10$ m, $3$ cm font $30$ m (soit $3 \\times 10$), surtout pas $13$ m.",
      "Oublier l'unité ou la confondre : la distance réelle est en mètres (le vrai), pas en cm.",
      "Se tromper de sens : on multiplie pour aller du plan vers le vrai, on divise pour aller du vrai vers le plan.",
    ],
    reel: "Sur une carte d'un sentier à La Réunion, $1$ cm $\\rightarrow$ $100$ m ; le chemin vers la plage mesure $5$ cm sur la carte, donc en vrai $5 \\times 100 = 500$ m.",
  },
  {
    id: "longueur",
    emoji: "📏",
    titre: "Longueurs",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Une **longueur**, c'est une **distance** : on la mesure en **km**, **m**, **cm** ou **mm**. Pour **comparer** deux longueurs ou les additionner, on les met d'abord dans la **même unité**. On **convertit** en multipliant (vers une plus petite unité) ou en divisant (vers une plus grande).",
    formules: [
      { label: "À savoir par cœur", latex: "$1$ km $= 1000$ m ; $1$ m $= 100$ cm ; $1$ cm $= 10$ mm" },
      { label: "Vers une unité plus petite", latex: "on multiplie (ex. $3$ m $= 3 \\times 100 = 300$ cm)" },
      { label: "Vers une unité plus grande", latex: "on divise (ex. $250$ cm $= 250 \\div 100 = 2{,}5$ m)" },
      { label: "Pour comparer", latex: "on met tout dans la même unité, puis on compare les nombres" },
      { label: "Choisir la bonne unité", latex: "mm et cm pour les petits objets, m et km pour les grandes distances" },
    ],
    reflexes: [
      { si: "on te demande de comparer deux longueurs", alors: "convertis-les d'abord dans la même unité" },
      { si: "tu passes vers une plus petite unité (m vers cm)", alors: "tu multiplies (par $10$, $100$ ou $1000$)" },
      { si: "tu passes vers une plus grande unité (cm vers m)", alors: "tu divises (par $10$, $100$ ou $1000$)" },
      { si: "on te demande d'estimer ou de choisir l'unité", alors: "compare avec un objet que tu connais" },
    ],
    pieges: [
      "Comparer les nombres sans regarder les unités : $80$ cm n'est pas plus grand que $1$ m, car $1$ m $= 100$ cm.",
      "Se tromper dans les zéros : $5$ m $= 500$ cm, et non $50$ cm.",
      "Multiplier au lieu de diviser : vers une plus petite unité on multiplie, vers une plus grande on divise.",
    ],
    reel: "En randonnée à La Réunion, $3$ km le matin et $1500$ m l'après-midi font $3000 + 1500 = 4500$ m en tout.",
  },
  {
    id: "masse",
    emoji: "🏋️",
    titre: "Masses",
    domaine: "Grandeurs et mesures",
    essentiel:
      "La **masse**, c'est ce qui dit si un objet est **lourd** ou **léger**. On la mesure en **grammes** (g) et en **kilogrammes** (kg). La règle à connaître par cœur : $1$ kg $= 1000$ g.",
    formules: [
      { label: "La relation à connaître", latex: "$1$ kg $= 1000$ g (et $1$ t $= 1000$ kg)" },
      { label: "Des kg vers les g", latex: "on multiplie par $1000$ (ex. $2$ kg $= 2000$ g)" },
      { label: "Des g vers les kg", latex: "on divise par $1000$ (ex. $1500$ g $= 1{,}5$ kg)" },
      { label: "Comparer deux masses", latex: "on met la même unité, puis on compare les nombres" },
      { label: "Estimer une masse", latex: "une pomme fait environ $150$ g, un cartable environ $3$ kg" },
    ],
    reflexes: [
      { si: "« le plus lourd », « le plus léger », « range du plus léger au plus lourd »", alors: "on compare les masses, dans la même unité" },
      { si: "passer des kg aux g", alors: "multiplier par $1000$ (ajouter $3$ zéros)" },
      { si: "passer des g aux kg", alors: "diviser par $1000$" },
      { si: "« quelle masse semble raisonnable »", alors: "on estime : on choisit le bon ordre de grandeur" },
    ],
    pieges: [
      "Comparer les nombres sans regarder les unités : croire que $500$ g est plus lourd que $1$ kg. Faux, car $1$ kg $= 1000$ g.",
      "Se tromper de zéros en convertissant : écrire $2$ kg $= 200$ g au lieu de $2000$ g.",
      "Confondre la taille et la masse : le plus gros objet n'est pas toujours le plus lourd.",
    ],
    reel: "Au marché de Saint-Pierre, un ananas de $1{,}2$ kg pèse $1200$ g : de quoi bien remplir le sac.",
  },
  {
    id: "contenance",
    emoji: "🧴",
    titre: "Contenances",
    domaine: "Grandeurs et mesures",
    essentiel:
      "La **contenance**, c'est la quantité de **liquide** qu'un récipient peut contenir. On la mesure en **litres (L)** et en **millilitres (mL)**. Pour comparer deux contenances, on les met d'abord dans la **même unité**, puis on compare les nombres.",
    formules: [
      { label: "Le litre et ses parts", latex: "$1$ L $= 10$ dL $= 100$ cL $= 1000$ mL" },
      { label: "Des litres vers les millilitres", latex: "on multiplie par $1000$ (ex. $2$ L $= 2000$ mL)" },
      { label: "Des millilitres vers les litres", latex: "on divise par $1000$ (ex. $1500$ mL $= 1{,}5$ L)" },
      { label: "Un demi-litre", latex: "$0{,}5$ L $= 500$ mL (la moitié de $1$ L)" },
      { label: "Comparer deux contenances", latex: "même unité, puis on compare les nombres" },
    ],
    reflexes: [
      { si: "des litres et des millilitres mélangés", alors: "tout convertir dans la même unité avant de comparer" },
      { si: "passer des litres aux millilitres", alors: "multiplier par $1000$ (ajouter $3$ zéros)" },
      { si: "estimer un verre, une gourde ou un seau", alors: "petit récipient en mL, grand récipient en L" },
    ],
    pieges: [
      "Croire que $500$ mL est plus grand que $1$ L parce que $500 >1$ : il faut d'abord convertir ($1$ L $= 1000$ mL).",
      "Oublier un zéro en convertissant : $2$ L, c'est $2000$ mL et pas $200$ mL.",
      "Confondre la contenance (en L ou mL) avec la masse (en kg) ou la longueur (en m).",
    ],
    reel: "À Saint-Pierre, une gourde d'élève contient $500$ mL et une grande bouteille $1{,}5$ L, soit $1500$ mL : la bouteille contient donc trois fois plus.",
  },
  {
    id: "duree",
    emoji: "⏱️",
    titre: "Durées",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Une **durée**, c'est un **temps qui passe** entre un début et une fin. On lit l'heure sur une **horloge** (petite aiguille = heures, grande aiguille = minutes) ou sur un affichage. Attention : le temps compte par **paquets de 60** ($1$ h $= 60$ min), jamais par 100.",
    formules: [
      { label: "Les repères à connaître", latex: "$1$ h $= 60$ min et $1$ min $= 60$ s" },
      { label: "Passer en minutes", latex: "on multiplie par $60$ (ex. $2$ h $= 2 \\times 60 = 120$ min)" },
      { label: "Calculer une durée", latex: "heure de fin $-$ heure de début (ex. de $8$ h $00$ à $9$ h $00 \\to 60$ min)" },
      { label: "Trouver l'heure de fin", latex: "heure de début $+$ durée (ex. $17$ h $40 + 1$ h $50 = 19$ h $30$)" },
      { label: "Bien écrire", latex: "dès $60$ min, on fait $1$ h (ex. $90$ min $= 1$ h $30$)" },
    ],
    reflexes: [
      { si: "« combien de minutes », « combien de secondes »", alors: "convertir en multipliant par $60$" },
      { si: "« ça dure... », « à quelle heure ça finit »", alors: "ajouter la durée à l'heure de début" },
      { si: "« combien de temps entre... et... »", alors: "calculer l'écart entre les deux horaires" },
      { si: "plusieurs étapes ou une pause", alors: "additionner toutes les durées avant d'ajouter à l'heure de départ" },
    ],
    pieges: [
      "Compter le temps comme des nombres normaux : de $8$ h $50$ à $9$ h $10$, il n'y a pas $60$ min mais $20$ min.",
      "Écrire une durée avec plus de $60$ minutes : $90$ minutes, ce n'est pas $1$ h $90$ mais $1$ h $30$.",
      "Croire qu'une heure vaut $100$ minutes : une heure, c'est toujours $60$ minutes.",
    ],
    reel: "À l'arrêt de bus de Saint-Pierre, il est $7$ h $10$ et le prochain bus part à $7$ h $25$ : il faut donc attendre $15$ minutes.",
  },
  {
    id: "perimetre",
    emoji: "⭕",
    titre: "Périmètres",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Le **périmètre**, c'est la longueur du **tour** d'une figure, tout son **contour**. Pour le trouver, on **additionne** les longueurs de tous les **côtés**. C'est une longueur : on la mesure en **cm** ou en **m** (jamais en cm², ça c'est l'aire).",
    formules: [
      { label: "Périmètre d'un polygone (règle générale)", latex: "on additionne les longueurs de tous les côtés" },
      { label: "Périmètre d'un triangle", latex: "côté $+$ côté $+$ côté (ex. $4+5+6=15$ cm)" },
      { label: "Périmètre d'un carré", latex: "$4 \\times$ côté (ex. $4 \\times 6 = 24$ cm)" },
      { label: "Périmètre d'un rectangle", latex: "$2 \\times ($longueur $+$ largeur$)$ (ex. $2 \\times (8+5) = 26$ cm)" },
      { label: "Sur un quadrillage", latex: "on compte seulement le contour extérieur" },
    ],
    reflexes: [
      { si: "« faire le tour », « clôture », « grillage », « bordure »", alors: "c'est un périmètre, en cm ou en m" },
      { si: "un carré", alors: "$4 \\times$ côté ; pour un rectangle : $2 \\times ($L $+$ l$)$" },
      { si: "on connaît le périmètre d'un carré et on cherche le côté", alors: "on divise le périmètre par $4$" },
      { si: "une figure sur quadrillage", alors: "compter le contour extérieur, pas les traits à l'intérieur" },
    ],
    pieges: [
      "Confondre le périmètre (le tour, en cm) et l'aire (l'intérieur, en cm²).",
      "Pour un rectangle, faire longueur $\\times$ largeur : ça donne l'aire, pas le périmètre. Il faut additionner les 4 côtés.",
      "Oublier un côté en additionnant, ou compter les traits qui sont à l'intérieur d'une figure sur quadrillage.",
    ],
    reel: "Pour clôturer un jardin rectangulaire de $10$ m sur $4$ m à Saint-Pierre, il faut $2 \\times (10+4) = 28$ m de grillage.",
  },
  {
    id: "aire",
    emoji: "🟦",
    titre: "Aires",
    domaine: "Grandeurs et mesures",
    essentiel:
      "L'**aire**, c'est la **surface** qu'occupe une figure, toute la place à l'**intérieur**. On la mesure en **carreaux** ou en **cm²** (jamais en cm : ça, c'est le tour). Pour un **rectangle**, on multiplie la **longueur par la largeur**.",
    formules: [
      { label: "Aire d'un rectangle", latex: "longueur $\\times$ largeur (ex. $4 \\times 3 = 12$ cm²)" },
      { label: "Aire d'un carré", latex: "côté $\\times$ côté (ex. $5 \\times 5 = 25$ cm²)" },
      { label: "Aire d'un triangle rectangle", latex: "c'est la moitié d'un rectangle : base $\\times$ hauteur $\\div 2$ (ex. $6 \\times 4 = 24$, puis $24 \\div 2 = 12$ cm²)" },
      { label: "Par comptage", latex: "on compte les carreaux à l'intérieur ($1$ carreau $= 1$ unité d'aire)" },
      { label: "Figure composée", latex: "on la découpe en rectangles ou triangles, puis on additionne les aires" },
    ],
    reflexes: [
      { si: "« surface », « recouvrir », « place à l'intérieur »", alors: "c'est une aire, en cm² ou m²" },
      { si: "un rectangle ou un carré", alors: "on multiplie les deux côtés (longueur $\\times$ largeur)" },
      { si: "un triangle rectangle", alors: "base $\\times$ hauteur, puis on divise par $2$" },
      { si: "une figure en forme de L", alors: "la découper en rectangles et additionner les aires" },
    ],
    pieges: [
      "Confondre l'aire (l'intérieur, en cm²) et le périmètre (le tour, en cm) : pour un rectangle de $8$ sur $3$, l'aire est $8 \\times 3 = 24$, pas $2 \\times (8+3) = 22$.",
      "Écrire une aire en cm au lieu de cm² : une aire se mesure toujours en unités carrées.",
      "Oublier de diviser par $2$ pour le triangle rectangle : $8 \\times 5 = 40$ donne le rectangle, l'aire du triangle est $40 \\div 2 = 20$ cm².",
    ],
    reel: "À La Réunion, pour connaître la surface d'un petit potager de $7$ m sur $4$ m, on calcule $7 \\times 4 = 28$ m².",
  },
  {
    id: "angle",
    emoji: "📐",
    titre: "Angles",
    domaine: "Grandeurs et mesures",
    essentiel:
      "Un **angle**, c'est l'**ouverture** entre deux **demi-droites** (les **côtés**) qui partent du même point : le **sommet**. On le mesure en **degrés** (°) avec un **rapporteur**. L'**angle droit** ($90^\\circ$), le coin d'un carré, sert de repère pour comparer les autres.",
    formules: [
      { label: "Angle droit", latex: "$90^\\circ$ : le coin d'un carré ou d'une feuille" },
      { label: "Angle aigu", latex: "plus petit qu'un angle droit ($<90^\\circ$)" },
      { label: "Angle obtus", latex: "entre l'angle droit et l'angle plat ($90^\\circ$ à $180^\\circ$)" },
      { label: "Angle plat", latex: "$180^\\circ$ : les deux côtés forment une ligne droite" },
      { label: "Mesurer au rapporteur", latex: "centre sur le **sommet**, un côté sur le $0$, on lit les degrés" },
    ],
    reflexes: [
      { si: "un coin de carré, de feuille ou de fenêtre", alors: "c'est un angle droit, $90^\\circ$" },
      { si: "l'ouverture est plus petite que le coin (< $90^\\circ$)", alors: "l'angle est aigu" },
      { si: "l'ouverture est plus grande que le coin (> $90^\\circ$)", alors: "l'angle est obtus" },
      { si: "on doit mesurer un angle", alors: "on prend le rapporteur, centre sur le sommet" },
    ],
    pieges: [
      "Mesurer un angle en cm : un angle se mesure en degrés (°), pas en centimètres (ça, c'est une longueur).",
      "Croire qu'un angle de $90^\\circ$ est aigu : un angle aigu est plus petit que $90^\\circ$, $90^\\circ$ est pile l'angle droit.",
      "Mal poser le rapporteur : il faut mettre son centre sur le sommet, pas sur un côté au hasard.",
    ],
    reel: "Quand tu ouvres une porte, elle forme un angle avec le mur ; le coin d'une fenêtre de case créole à Saint-Pierre est un angle droit de $90^\\circ$.",
  },
  {
    id: "reperage",
    emoji: "📍",
    titre: "Repérage",
    domaine: "Espace et géométrie",
    essentiel:
      "Se **repérer**, c'est dire où se trouve un point sur un **quadrillage**. On donne deux nombres : les **coordonnées**. On lit **toujours** le premier nombre sur l'axe **horizontal** (gauche-droite), puis le deuxième sur l'axe **vertical** (haut-bas).",
    formules: [
      { label: "Écrire des coordonnées", latex: "on écrit deux nombres : $(x ; y)$, par exemple $(2 ; 3)$" },
      { label: "L'ordre : d'abord horizontal", latex: "le 1er nombre = gauche-droite, le 2e nombre = haut-bas" },
      { label: "Placer un point", latex: "on avance jusqu'au 1er nombre, puis on monte jusqu'au 2e" },
      { label: "Se déplacer sur le quadrillage", latex: "à droite ou en haut $\\to$ le nombre augmente ; à gauche ou en bas $\\to$ il diminue" },
    ],
    reflexes: [
      { si: "« quelles sont les coordonnées »", alors: "lis d'abord horizontal, puis vertical, et écris $(x ; y)$" },
      { si: "« place le point » ou « où est le trésor »", alors: "avance d'abord, puis monte jusqu'au croisement" },
      { si: "« va à droite / à gauche »", alors: "c'est le 1er nombre (horizontal) qui change" },
      { si: "« monte / descend »", alors: "c'est le 2e nombre (vertical) qui change" },
    ],
    pieges: [
      "Inverser les deux nombres : $(2 ; 3)$ n'est pas au même endroit que $(3 ; 2)$.",
      "Croire qu'un seul nombre suffit : pour repérer un point il en faut deux.",
      "Se tromper de sens dans un déplacement : à droite on augmente, à gauche on diminue.",
    ],
    reel: "Sur une carte au trésor quadrillée de La Réunion, le volcan est en $(4 ; 4)$ : on avance de 4 cases, puis on monte de 4 cases pour le trouver.",
  },
  {
    id: "droite",
    emoji: "🛤️",
    titre: "Droites",
    domaine: "Espace et géométrie",
    essentiel:
      "Une **droite** est une ligne bien droite qui se prolonge **sans fin** des deux côtés ; on la note $(AB)$. Un **segment** $[AB]$ a **deux extrémités**, une **demi-droite** $[AB)$ a **une origine** et continue d'un seul côté. Deux droites **parallèles** ne se **coupent jamais** ; deux droites **perpendiculaires** se coupent en formant un **angle droit**.",
    formules: [
      { label: "Les trois objets", latex: "droite $(AB)$ sans fin, segment $[AB]$ à deux bouts, demi-droite $[AB)$ à un départ" },
      { label: "Droites parallèles", latex: "elles gardent le même écart et ne se coupent jamais (symbole $//$)" },
      { label: "Droites perpendiculaires", latex: "elles se coupent en formant un angle droit de $90^\\circ$ (petit carré)" },
      { label: "Tracer", latex: "la règle pour une droite, l'équerre pour une parallèle ou une perpendiculaire" },
    ],
    reflexes: [
      { si: "« se prolonge sans fin », « des deux côtés »", alors: "c'est une droite $(AB)$" },
      { si: "« deux bouts », « deux extrémités » ou « une seule origine »", alors: "c'est un segment $[AB]$ ou une demi-droite $[AB)$" },
      { si: "un petit carré à l'endroit où elles se croisent", alors: "les droites sont perpendiculaires (angle droit)" },
      { si: "tracer une parallèle ou une perpendiculaire", alors: "prendre l'équerre, pas seulement la règle" },
    ],
    pieges: [
      "Confondre les trois : la droite n'a pas de bout, le segment en a deux, la demi-droite en a un seul.",
      "Croire que deux droites sont parallèles juste parce qu'elles se ressemblent : il faut vérifier qu'elles ne se coupent jamais.",
      "Dire « perpendiculaires » sans vérifier l'angle droit à l'équerre : deux droites qui se coupent ne forment pas toujours un angle droit.",
    ],
    reel: "Les deux rails d'une voie forment deux droites parallèles : ils gardent toujours le même écart et ne se croisent jamais.",
  },
  {
    id: "symetrie",
    emoji: "🪞",
    titre: "Symétrie",
    domaine: "Espace et géométrie",
    essentiel:
      "La **symétrie**, c'est comme un **miroir**. L'**axe de symétrie** est une **droite** : si on **plie** la figure dessus, les deux parties se **superposent** exactement. Chaque point a son **symétrique** de l'autre côté de l'axe, à la **même distance**.",
    formules: [
      { label: "Axe de symétrie", latex: "c'est une droite : on plie dessus et les deux parties se superposent" },
      { label: "Symétrique d'un point", latex: "de l'autre côté de l'axe, à la même distance (à $3$ carreaux $\\to$ $3$ carreaux)" },
      { label: "Point posé sur l'axe", latex: "il ne bouge pas : son symétrique, c'est lui-même" },
      { label: "Construire une figure", latex: "on place le symétrique de chaque sommet, puis on relie les points" },
      { label: "Nombre d'axes", latex: "carré $=4$, rectangle $=2$, triangle équilatéral $=3$" },
    ],
    reflexes: [
      { si: "« plier », « miroir », « se superposent »", alors: "c'est un axe de symétrie" },
      { si: "compléter ou construire une figure", alors: "même distance à l'axe, de l'autre côté" },
      { si: "un point est posé sur l'axe", alors: "il reste à la même place" },
      { si: "vérifier une construction", alors: "regarder TOUS les sommets, pas un seul" },
    ],
    pieges: [
      "Ne pas garder la même distance : le point symétrique doit être aussi loin de l'axe que le point de départ.",
      "Croire que la diagonale d'un rectangle (non carré) est un axe : quand on plie dessus, les deux parties ne se superposent pas.",
      "Vérifier un seul sommet : il suffit qu'un point soit mal placé pour que toute la figure soit fausse.",
    ],
    reel: "Sur un motif de carrelage à Saint-Pierre, une droite partage le dessin en deux moitiés identiques : c'est un axe de symétrie, et une moitié suffit pour redessiner l'autre.",
  },
  {
    id: "figure_plane",
    emoji: "🔺",
    titre: "Figures planes",
    domaine: "Espace et géométrie",
    essentiel:
      "Une **figure plane**, c'est un dessin tout plat. On la reconnaît en **comptant ses côtés** : $3$ côtés, c'est un **triangle** ; $4$ côtés, c'est un **quadrilatère** (carré, rectangle, losange...). Le **cercle**, lui, est un contour tout **rond** autour d'un point du milieu, le **centre**.",
    formules: [
      { label: "Compter les côtés", latex: "triangle $= 3$ côtés ; quadrilatère $= 4$ côtés" },
      { label: "Carré et rectangle", latex: "les deux ont $4$ angles droits ; le carré a en plus ses $4$ côtés égaux" },
      { label: "Losange", latex: "$4$ côtés égaux, mais pas toujours d'angle droit" },
      { label: "Cercle", latex: "diamètre $= 2 \\times$ rayon (ex. rayon $4$ cm $\\to$ diamètre $8$ cm)" },
      { label: "Pour construire", latex: "la règle pour les côtés, l'équerre pour l'angle droit, le compas pour le cercle" },
    ],
    reflexes: [
      { si: "on te demande « combien de côtés »", alors: "$3$ = triangle, $4$ = quadrilatère" },
      { si: "la figure a $4$ angles droits", alors: "c'est un rectangle (et un carré si les $4$ côtés sont égaux)" },
      { si: "on parle d'un rond, d'un centre, d'un rayon", alors: "pense cercle : rayon, diamètre, corde" },
      { si: "on te donne le rayon", alors: "le diamètre est deux fois plus grand" },
    ],
    pieges: [
      "Confondre le cercle (juste le contour) et le disque (tout l'intérieur en plus du contour).",
      "Croire qu'un carré n'est pas un rectangle : si ! Il a $4$ angles droits, c'est un rectangle particulier (et aussi un losange, car $4$ côtés égaux).",
      "Confondre un côté et une diagonale : la diagonale relie deux sommets opposés, elle ne fait pas le tour.",
    ],
    reel: "La roue d'un vélo sur le front de mer de Saint-Pierre est un cercle : chaque rayon métallique relie le centre au contour.",
  },
  {
    id: "solide",
    emoji: "🧊",
    titre: "Solides",
    domaine: "Espace et géométrie",
    essentiel:
      "Un **solide**, c'est une figure en **trois dimensions** : il prend de la place, il a du **volume** (pas comme une figure plate sur la feuille). On regarde ses **faces** (les surfaces), ses **arêtes** (les bords) et ses **sommets** (les coins). Certains solides sont **ronds** : cylindre, cône, boule.",
    formules: [
      { label: "Le cube", latex: "$6$ faces carrées, $8$ sommets, $12$ arêtes" },
      { label: "Le pavé droit (une boîte)", latex: "$6$ faces rectangulaires, $8$ sommets, $12$ arêtes" },
      { label: "Les 3 mots à connaître", latex: "face $=$ une surface, arête $=$ un bord, sommet $=$ un coin" },
      { label: "Le patron", latex: "la figure à plat qui, pliée, donne le solide (patron du cube $=$ $6$ carrés)" },
      { label: "Les solides ronds", latex: "cylindre, cône et boule ont une surface courbe" },
    ],
    reflexes: [
      { si: "« toutes les faces sont des carrés »", alors: "c'est un cube ($6$ faces, $8$ sommets, $12$ arêtes)" },
      { si: "« une boîte », des faces rectangulaires", alors: "c'est un pavé droit" },
      { si: "on parle d'un coin, d'un bord ou d'une surface", alors: "coin $=$ sommet, bord $=$ arête, surface $=$ face" },
      { si: "une figure à plat qu'on découpe et qu'on plie", alors: "c'est un patron de solide" },
    ],
    pieges: [
      "Confondre les trois mots : la face est une surface, l'arête est un bord, le sommet est un coin (un point).",
      "Dire qu'un cube a $6$ sommets : il a $6$ faces, mais $8$ sommets et $12$ arêtes.",
      "Se tromper dans le patron du cube : il faut exactement $6$ carrés (pas $4$, pas $8$), sinon le cube ne se referme pas.",
    ],
    reel: "Un dé classique est un cube : $6$ faces carrées, $8$ coins (les sommets) et $12$ arêtes.",
  },
  {
    id: "tableau",
    emoji: "📋",
    titre: "Tableaux",
    domaine: "Données",
    essentiel:
      "Un **tableau** range des informations en **lignes** et en **colonnes**. Pour trouver une valeur, on **croise** la bonne ligne et la bonne colonne : la réponse est dans la **case**. On peut aussi **compléter** une case qui manque, ou **comparer** les nombres pour répondre à une question.",
    formules: [
      { label: "Lire une case", latex: "on croise la ligne et la colonne : la valeur est au croisement" },
      { label: "Compléter une case", latex: "on lit le titre de sa ligne ET de sa colonne, puis on écrit la bonne valeur" },
      { label: "Calculer un total", latex: "on additionne les nombres d'une ligne ou d'une colonne (ex. $18+30+12=60$)" },
      { label: "Comparer des données", latex: "le plus grand nombre = le plus ; le plus petit = le moins" },
      { label: "Combien de plus ?", latex: "on soustrait les deux nombres (ex. $12-7=5$)" },
    ],
    reflexes: [
      { si: "« combien de… », une valeur à trouver dans le tableau", alors: "croiser la bonne ligne et la bonne colonne" },
      { si: "« au total », « en tout »", alors: "additionner les nombres de la ligne ou de la colonne" },
      { si: "« le plus », « le moins »", alors: "comparer les nombres et repérer le plus grand ou le plus petit" },
      { si: "« combien de plus », « combien de moins »", alors: "soustraire les deux nombres" },
    ],
    pieges: [
      "Se tromper de ligne ou de colonne : on lit alors la mauvaise case (ex. les bananes au lieu des ananas).",
      "Écrire un nombre au hasard dans une case vide sans lire son titre de ligne et de colonne.",
      "Oublier une valeur en additionnant un total : il faut compter tous les nombres de la ligne ou de la colonne.",
    ],
    reel: "Au marché de Saint-Pierre, un tableau note les fruits vendus : pour connaître les ananas du mardi, on croise la ligne « Ananas » et la colonne « Mardi », et on lit $24$.",
  },
  {
    id: "graphique",
    emoji: "📊",
    titre: "Graphiques et diagrammes",
    domaine: "Données",
    essentiel:
      "Un **graphique** (en barres, en bâtons ou **circulaire**) montre des **données** en images pour les lire d'un coup d'œil. La **barre la plus haute**, c'est la plus grande valeur. On peut **lire** une valeur, **compléter** une barre qui manque, ou **interpréter** pour comparer et calculer.",
    formules: [
      { label: "Lire une valeur", latex: "on repère l'étiquette, puis on lit la hauteur de la barre" },
      { label: "Le plus / le moins", latex: "barre la plus haute $=$ le plus ; barre la plus basse $=$ le moins" },
      { label: "Le total", latex: "on additionne toutes les valeurs (ex. $12+9+7+10=38$)" },
      { label: "Combien de plus (écart)", latex: "on soustrait (ex. $12-7=5$)" },
      { label: "La valeur qui manque", latex: "total $-$ valeurs connues (ex. $30-24=6$)" },
    ],
    reflexes: [
      { si: "« combien de… », « quelle valeur »", alors: "je lis la hauteur de la bonne barre" },
      { si: "« le plus », « le moins », « le plus choisi »", alors: "je cherche la barre la plus haute ou la plus basse" },
      { si: "« en tout », « au total »", alors: "j'additionne toutes les valeurs" },
      { si: "« combien de plus », « écart »", alors: "je soustrais la petite valeur à la grande" },
    ],
    pieges: [
      "Lire la mauvaise barre : bien vérifier l'étiquette avant de donner la valeur.",
      "Compléter une barre au hasard : la hauteur doit correspondre à la vraie donnée.",
      "Oublier une barre quand on calcule le total : il faut toutes les additionner.",
    ],
    reel: "Au marché de Saint-Pierre, un graphique montre les fruits vendus : $24$ ananas et $28$ bananes, soit $28-24=4$ bananes de plus.",
  },
  {
    id: "probabilite",
    emoji: "🎲",
    titre: "Probabilités simples",
    domaine: "Données",
    essentiel:
      "En probabilité, on parle de ce qui peut **arriver** ou non. Un événement est **certain** (il arrive toujours), **impossible** (il n'arrive jamais) ou **possible** (il peut arriver, mais pas à tous les coups). Dans une **situation de hasard**, on ne connaît pas le résultat à l'avance : on peut seulement dire qui a **plus de chances** ou **moins de chances**.",
    formules: [
      { label: "Certain", latex: "l'événement arrive à coup sûr (obtenir un nombre de $1$ à $6$ avec un dé)" },
      { label: "Impossible", latex: "l'événement n'arrive jamais (obtenir $7$ avec un dé)" },
      { label: "Possible", latex: "l'événement peut arriver, mais pas à tous les coups (obtenir un nombre pair avec un dé)" },
      { label: "Comparer les chances", latex: "plus il y a de cases favorables, plus il y a de chances ($3$ billes rouges sur $6$ ont plus de chances qu'$1$ verte)" },
      { label: "Situation de hasard", latex: "on ne connaît pas le résultat à l'avance (lancer un dé, tourner une roue, tirer une bille)" },
    ],
    reflexes: [
      { si: "« à coup sûr », « toujours »", alors: "l'événement est certain" },
      { si: "« ça ne peut pas arriver », une couleur absente du sac", alors: "l'événement est impossible" },
      { si: "on ne sait pas le résultat avant de jouer", alors: "c'est une situation de hasard" },
      { si: "« quelle couleur a le plus de chances »", alors: "compter les cases (ou la place) de chaque couleur et comparer" },
    ],
    pieges: [
      "Croire que, parce qu'une couleur est sur la roue, on tombera forcément dessus : c'est possible, pas certain.",
      "Oublier de compter TOUTES les billes du sac avant de comparer les chances.",
      "Confondre certain (arrive toujours) et possible (peut arriver, mais pas à tous les coups).",
    ],
    reel: "À la tombola de l'école à Saint-Pierre, on ne sait pas quel ticket sera tiré : c'est le hasard, et plus on achète de tickets, plus on a de chances de gagner.",
  },
  {
    id: "algorithmique",
    emoji: "🐢",
    titre: "Algorithmique",
    domaine: "Algorithmique",
    essentiel:
      "Un **programme**, c'est une **suite d'instructions** que l'ordinateur exécute **dans l'ordre**, de haut en bas. Sur **Scratch**, on **avance**, on **tourne**, ou on **répète** plusieurs fois les mêmes blocs. Pour trouver la suite d'un motif, on cherche la **règle** qui se répète.",
    formules: [
      { label: "Lire un programme", latex: "on suit les blocs de haut en bas, un par un" },
      { label: "Avancer ou tourner", latex: "avancer déplace le personnage ; tourner change sa direction ($90^\\circ$ = quart de tour)" },
      { label: "Répéter N fois", latex: "le bloc à l'intérieur est exécuté $N$ fois" },
      { label: "Distance dans une boucle", latex: "nombre de fois $\\times$ pas (ex. $4 \\times 10 = 40$ pas)" },
      { label: "Tracer un carré", latex: "répéter $4$ fois : avancer, puis tourner de $90^\\circ$" },
    ],
    reflexes: [
      { si: "« que se passe-t-il ensuite », un programme à lire", alors: "lire les blocs dans l'ordre, de haut en bas" },
      { si: "« complète la suite », un motif qui se répète", alors: "chercher la règle, puis continuer le motif" },
      { si: "« répéter … fois », une boucle", alors: "multiplier le nombre de fois par ce que fait chaque tour" },
      { si: "tracer un carré ou un chemin fermé", alors: "répéter 4 fois : avancer puis tourner de $90^\\circ$" },
    ],
    pieges: [
      "Lire le programme de bas en haut : on lit toujours de haut en bas, dans l'ordre.",
      "Croire que le bloc dans « répéter 5 fois » n'est fait qu'une seule fois : il est fait 5 fois.",
      "Confondre avancer (qui déplace) et tourner (qui change juste la direction, sans avancer).",
    ],
    reel: "Sur Scratch, pour faire tracer un carré au margouillat, on écrit « répéter $4$ fois : avancer de $50$, tourner de $90^\\circ$ » : il parcourt $4 \\times 50 = 200$ pas.",
  },
];

const BANQUES: Record<string, TutorBankItemV4[]> = {
  nombre_entier: nombresEntiersBank,
  suite: suitesBank,
  multiplication: multiplicationBank,
  division: divisionBank,
  fraction: fractionsBank,
  nombre_decimal: nombresDecimauxBank,
  calcul: calculBank,
  probleme: problemeBank,
  algebre: algebreBank,
  proportionnalite: proportionnaliteBank,
  pourcentage: pourcentagesBank,
  echelle: echellesBank,
  longueur: longueursBank,
  masse: massesBank,
  contenance: contenancesBank,
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

export const KIT_MATHS_CM2: KitData = {
  slug: "maths-cm2",
  titre: "Guide de survie · Maths CM2",
  baseline:
    "Les 28 chapitres du programme de CM2 en 28 fiches : l'essentiel, les réflexes, les pièges — et un test corrigé par chapitre. Pour réussir la fin du primaire et bien préparer la 6e. À imprimer, à glisser dans le cahier.",
  matiere: "maths",
  classeLabel: "CM2",
  coachClasse: "cm2",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
