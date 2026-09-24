// ─── Fiche d'exercices : les probabilités (3e) — 20 exercices corrigés ─────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-probabilites.tsx` et sur
// les huit micros du coach de 3e (notionId proba_experience). L'angle de la 3e :
// les expériences à DEUX épreuves (interdites en 4e) — deux dés, deux tirages
// avec ou sans remise, une roue tournée deux fois, deux tirs au but.
// ⛔ Programme de 3e : pas de probabilité conditionnelle, pas de formule
// P(A ∪ B). L'arbre ne porte que des épreuves successives, lues par le produit.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni le sac de 3 rouges et
// 5 bleues, ni « gagner ou perdre », ni les deux lancers d'une pièce, ni le
// menu du snack, ni « au moins 5 » avec un dé.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : un par corrigé, 20/20 —
// la roue, l'urne, le dé, le tableau 6 × 6 des deux dés (cases favorables
// surlignées), l'arbre. ⛔ L'arbre du canvas n'a que DEUX niveaux.
//
// ⛔ LES PIÈGES NOMMÉS : les couleurs ne sont pas équiprobables, les boules le
// sont (2) ; « après 5 faces, pile est dû » (8) ; les 11 sommes de deux dés ne
// sont pas équiprobables, 7 est six fois plus probable que 2 (9, 20) ;
// ADDITIONNER le long d'une branche au lieu de multiplier (10, 17, 18) ; garder
// l'urne intacte dans un tirage SANS remise (11) ; 1/6 + 1/6 pour « au moins un
// 6 » (15) ; confondre fréquence et probabilité (13).
//
// Les chiffres du monde, et d'où ils viennent :
// - environ 105 garçons pour 100 filles à la naissance en France (Insee, rapport
//   de masculinité à la naissance) — ex. 6 ;
// - tir au but marqué avec la probabilité 0,75 : un ARRONDI de l'ordre de
//   grandeur des grandes compétitions (⚠️ À VÉRIFIER avant de citer un chiffre
//   précis ; l'énoncé dit « on admet ») — ex. 17 ;
// - groupe O : 42 % de la population (Établissement français du sang, même
//   chiffre que la feuille de seconde) — ex. 19.
//
// Les corrigés sont écrits à la première personne, comme les autres feuilles
// de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-probabilites-3e.mjs` —
// chaque probabilité est retrouvée en ÉNUMÉRANT les issues (boules une à une,
// cases des deux dés, chemins de l'arbre), puis les schémas sont relus.
//
// Micro-compétences : proba_vocabulaire (1, 8, 11, 13), proba_issue (1, 2, 7,
// 14), proba_equiprobabilite (2, 3, 6, 8, 13), proba_evenement (4, 5, 14),
// proba_calculer (2, 5, 9, 12, 16, 19), proba_evenement_contraire (6, 10, 15,
// 17, 18, 19), proba_deux_epreuve (7, 9, 10, 11, 12, 14 à 20), proba_defi (15,
// 17, 18, 20). 8/8.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre, billes, de, diagramme, roue, tableauProba } from "@/lib/fiches-exercices/figures";

const R = "#dc2626", B = "#2563eb", V = "#059669", J = "#eab308";

export const exercicesProbabilites3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "proba-experience",
  titre: "Les probabilités",
  accroche:
    "Vingt exercices, du geste seul au problème de brevet : issues et événements, équiprobabilité, événement contraire, puis les expériences à deux épreuves — deux dés, deux tirages avec ou sans remise, une roue de loterie tournée deux fois. Une séance de tirs au but, la météo du week-end, deux donneurs de sang. Chaque corrigé a son schéma : roue, urne, dé, tableau des deux dés ou arbre. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/proba-experience", titre: "Probabilités : issues, événements et deux épreuves" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : lister les issues, compter, passer au contraire.",
      rappel: [
        "Une ISSUE est un résultat possible d'une expérience aléatoire. Un ÉVÉNEMENT est un ensemble d'issues.",
        "Une probabilité est un nombre entre $0$ (événement impossible) et $1$ (événement certain).",
        "Si les issues sont ÉQUIPROBABLES : $P(A) = \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre total d'issues}}$.",
        "Le CONTRAIRE : $P(\\text{non } A) = 1 - P(A)$.",
      ],
      exercices: [
        {
          enonce:
            "Une roue est partagée en $8$ secteurs de même taille, numérotés de $1$ à $8$. On la fait tourner et on lit le numéro devant le repère.\na) Pourquoi est-ce une expérience aléatoire ? Quelles sont ses issues ?\nb) Pour chaque événement, dire s'il est impossible, certain ou ni l'un ni l'autre, et donner les issues qui le réalisent.\n$A$ : « obtenir $9$ » ; $B$ : « obtenir un nombre inférieur ou égal à $8$ » ; $C$ : « obtenir $5$ » ; $D$ : « obtenir un multiple de $3$ ».\nc) Lequel est un événement élémentaire ?",
          correction:
            "a) Je connais tous les résultats possibles, mais je ne peux pas prévoir lequel sortira : c'est une expérience aléatoire. Ses issues sont les $8$ numéros, de $1$ à $8$.\nb) $A$ : aucun secteur ne porte le $9$, aucune issue ne le réalise. $A$ est IMPOSSIBLE : $P(A) = 0$.\n$B$ : les $8$ issues le réalisent. $B$ est CERTAIN : $P(B) = 1$.\n$C$ : une seule issue, le $5$.\n$D$ : les multiples de $3$ sur la roue sont $3$ et $6$ : deux issues.\nc) $C$ est réalisé par une seule issue : c'est un événement élémentaire.\n⛔ Le piège au $D$ : oublier le $6$, ou compter le $9$, qui n'est pas sur la roue.\nRéponse : $A$ impossible, $B$ certain, $C$ élémentaire, $D$ réalisé par $3$ et $6$.",
          schema: roue([{ label: "1", poids: 1, couleur: R }, { label: "2", poids: 1, couleur: B }, { label: "3", poids: 1, couleur: V }, { label: "4", poids: 1, couleur: J }, { label: "5", poids: 1, couleur: R }, { label: "6", poids: 1, couleur: B }, { label: "7", poids: 1, couleur: V }, { label: "8", poids: 1, couleur: J }]),
          micros: ["proba_vocabulaire", "proba_issue"],
        },
        {
          enonce:
            "Une urne contient $4$ boules bleues, $3$ rouges et $1$ verte, indiscernables au toucher. On tire une boule au hasard.\na) Combien cette expérience a-t-elle d'issues ?\nb) Léo dit : « trois couleurs, donc une chance sur trois d'avoir la verte ». A-t-il raison ?\nc) Calculer la probabilité de chaque couleur.",
          correction:
            "a) Chaque BOULE est une issue, même quand deux boules ont la même couleur : $4 + 3 + 1 = 8$ issues. Tirées au hasard, elles ont toutes la même chance, $\\dfrac{1}{8}$ chacune.\nb) Non. Ce sont les boules qui sont équiprobables, pas les couleurs : la verte n'est qu'une boule sur huit, alors que le bleu en a quatre.\nc) $P(\\text{bleue}) = \\dfrac{4}{8} = \\dfrac{1}{2}$ ; $P(\\text{rouge}) = \\dfrac{3}{8}$ ; $P(\\text{verte}) = \\dfrac{1}{8}$.\n⭐ Contrôle : $\\dfrac{4}{8} + \\dfrac{3}{8} + \\dfrac{1}{8} = 1$.\n⛔ Le piège : compter $3$ issues, une par couleur. Trois couleurs ne veulent pas dire trois chances égales.\nRéponse : $8$ issues ; $P(\\text{verte}) = \\dfrac{1}{8}$, pas $\\dfrac{1}{3}$.",
          schema: billes([{ couleur: B }, { couleur: B }, { couleur: B }, { couleur: B }, { couleur: R }, { couleur: R }, { couleur: R }, { couleur: V }]),
          micros: ["proba_issue", "proba_equiprobabilite", "proba_calculer"],
        },
        {
          enonce:
            "Dans chaque situation, les issues sont-elles équiprobables ? Justifier.\na) On lance un dé cubique équilibré.\nb) On fait tourner une roue partagée en trois secteurs : rouge ($200°$), bleu ($100°$) et vert ($60°$).\nc) On lance une punaise : elle retombe pointe en l'air ou couchée sur le côté.\nd) On tire au sort le nom d'un élève parmi les $25$ de la classe.\ne) Pour la roue du b), calculer la probabilité d'obtenir rouge.",
          correction:
            "a) Oui : le dé est équilibré, aucune face n'est favorisée. Chaque face a la probabilité $\\dfrac{1}{6}$.\nb) Non : le secteur rouge est deux fois plus grand que le bleu. La probabilité d'une couleur est proportionnelle à l'angle de son secteur.\nc) Non : rien ne dit que les deux positions ont la même chance, la forme de la punaise en favorise une. Seule l'expérience répétée le dira.\nd) Oui : un tirage au sort donne à chaque nom la même chance, $\\dfrac{1}{25}$.\ne) Le tour complet fait $360°$ : $P(\\text{rouge}) = \\dfrac{200}{360} = \\dfrac{5}{9}$.\n⛔ Le piège au c) : « deux issues, donc $\\dfrac{1}{2}$ chacune ». Deux issues ne font pas deux chances égales.\nRéponse : a) oui ; b) non ; c) non ; d) oui ; $P(\\text{rouge}) = \\dfrac{5}{9}$.",
          schema: roue([{ label: "rouge 200°", poids: 200, couleur: R }, { label: "bleu 100°", poids: 100, couleur: B }, { label: "vert 60°", poids: 60, couleur: V }]),
          micros: ["proba_equiprobabilite"],
        },
        {
          enonce:
            "On lance un dé équilibré à six faces. $A$ : « obtenir un diviseur de $6$ » ; $B$ : « obtenir un nombre premier ».\na) Donner les issues qui réalisent $A$, puis celles qui réalisent $B$.\nb) Quelles issues réalisent $A$ et $B$ à la fois ?\nc) Décrire par une phrase l'événement réalisé par les issues $1$, $3$ et $5$.",
          correction:
            "a) Les diviseurs de $6$ sont les nombres qui divisent $6$ exactement : $1$, $2$, $3$ et $6$. $A$ est réalisé par $4$ issues.\nUn nombre premier a exactement deux diviseurs, $1$ et lui-même : sur le dé, ce sont $2$, $3$ et $5$. $B$ est réalisé par $3$ issues.\nb) Je cherche les issues présentes dans les deux listes : $2$ et $3$.\nc) $1$, $3$ et $5$ sont les nombres impairs du dé : c'est l'événement « obtenir un nombre impair ».\n⛔ Le piège au a) : oublier $1$ et $6$ parmi les diviseurs de $6$ — ou compter $1$ comme premier, alors qu'il n'a qu'un seul diviseur.\nRéponse : $A$ : $1$, $2$, $3$, $6$ ; $B$ : $2$, $3$, $5$ ; les deux à la fois : $2$ et $3$.",
          schema: de([1, 2, 3, 6]),
          micros: ["proba_evenement"],
        },
        {
          enonce:
            "Pour une tombola, on place dans un sac $20$ jetons numérotés de $1$ à $20$. On en tire un au hasard.\na) Calculer la probabilité d'obtenir un multiple de $5$.\nb) Calculer la probabilité d'obtenir un nombre supérieur ou égal à $15$.\nc) Calculer la probabilité d'obtenir un multiple de $5$ supérieur ou égal à $15$.",
          correction:
            "Les $20$ jetons ont la même chance d'être tirés : je compte les issues favorables et je divise par $20$.\na) Les multiples de $5$ : $5$, $10$, $15$ et $20$, soit $4$ jetons. $P = \\dfrac{4}{20} = \\dfrac{1}{5}$.\nb) De $15$ à $20$ : $15$, $16$, $17$, $18$, $19$ et $20$, soit $6$ jetons. $P = \\dfrac{6}{20} = \\dfrac{3}{10}$.\nc) Seuls $15$ et $20$ sont dans les deux listes : $P = \\dfrac{2}{20} = \\dfrac{1}{10}$.\n⛔ Le piège au b) : compter $20 - 15 = 5$ jetons. On oublie le $15$ : de $15$ à $20$, il y a $6$ nombres.\nRéponse : $\\dfrac{1}{5}$ ; $\\dfrac{3}{10}$ ; $\\dfrac{1}{10}$.",
          // Les 20 jetons rangés par cinq : les multiples de 5 tombent tous dans
          // la dernière colonne, surlignée.
          schema: tableauProba(["Rangée", "1", "2", "3", "4", "5"], [["A", "1", "2", "3", "4", "5"], ["B", "6", "7", "8", "9", "10"], ["C", "11", "12", "13", "14", "15"], ["D", "16", "17", "18", "19", "20"]], [[0, 5], [1, 5], [2, 5], [3, 5]]),
          micros: ["proba_calculer", "proba_evenement"],
        },
        {
          enonce:
            "En France, il naît environ $105$ garçons pour $100$ filles (Insee). On choisit un nouveau-né au hasard.\na) Montrer que la probabilité que ce soit un garçon vaut environ $0{,}512$.\nb) En déduire la probabilité que ce soit une fille.\nc) « Garçon » et « fille » sont-ils équiprobables ?",
          correction:
            "a) Sur $105 + 100 = 205$ naissances, $105$ sont des garçons : $P(G) = \\dfrac{105}{205} \\approx 0{,}512$.\nb) « Fille » est l'événement contraire de « garçon » : l'un ou l'autre arrive, jamais les deux. $P(F) = 1 - 0{,}512 = 0{,}488$.\nc) Presque, mais pas tout à fait : $0{,}512$ contre $0{,}488$. Sur des centaines de milliers de naissances chaque année, l'écart se voit nettement.\n⛔ Le piège au a) : calculer $\\dfrac{105}{100}$, qui dépasse $1$. Une probabilité compare au TOTAL, pas à l'autre groupe.\nRéponse : $P(G) \\approx 0{,}512$ et $P(F) \\approx 0{,}488$.",
          schema: roue([{ label: "garçon 0,512", poids: 512, couleur: B }, { label: "fille 0,488", poids: 488, couleur: J }]),
          micros: ["proba_evenement_contraire", "proba_equiprobabilite"],
        },
        {
          enonce:
            "On lance une pièce, puis un dé équilibré. Une issue s'écrit par exemple P4 (pile, puis $4$).\na) Combien y a-t-il d'issues ? Les présenter dans un tableau.\nb) Calculer la probabilité d'obtenir « pile et $6$ ».\nc) Calculer la probabilité d'obtenir « face et un nombre pair ».",
          correction:
            "a) La pièce donne $2$ résultats, et pour CHACUN le dé en donne $6$ : $2 \\times 6 = 12$ issues, de P1 à F6. Pièce et dé sont équilibrés : les $12$ issues sont équiprobables.\nb) Une seule case, P6 : $P = \\dfrac{1}{12}$.\nc) Trois cases, F2, F4 et F6 : $P = \\dfrac{3}{12} = \\dfrac{1}{4}$.\n⛔ Le piège au a) : additionner $2 + 6 = 8$ issues. Chaque résultat de la pièce se combine avec chaque résultat du dé : on MULTIPLIE.\nRéponse : $12$ issues ; $\\dfrac{1}{12}$ ; $\\dfrac{1}{4}$.",
          schema: tableauProba(["", "1", "2", "3", "4", "5", "6"], [["Pile", "P1", "P2", "P3", "P4", "P5", "P6"], ["Face", "F1", "F2", "F3", "F4", "F5", "F6"]], [[1, 2], [1, 4], [1, 6]]),
          micros: ["proba_deux_epreuve", "proba_issue"],
        },
        {
          enonce:
            "Une pièce équilibrée vient de tomber $5$ fois de suite sur face. Tom affirme : « au prochain lancer, pile est presque sûr, il est dû ».\na) Quelle est la probabilité d'obtenir pile au sixième lancer ?\nb) Qu'en penser ?",
          correction:
            "a) La pièce n'a pas de mémoire : elle ne sait pas ce qu'elle a donné avant. Au sixième lancer, comme à chaque lancer, $P(\\text{pile}) = \\dfrac{1}{2}$.\nb) Tom se trompe : les lancers précédents ne changent pas la probabilité du suivant. Cinq faces de suite, c'est rare ; mais une fois arrivé, c'est du passé.\n⭐ Sur des milliers de lancers, la fréquence de pile se rapproche bien de $\\dfrac{1}{2}$ — non parce que la pièce « rattrape », mais parce que $5$ lancers pèsent de moins en moins parmi des milliers.\n⛔ Le piège : « après $5$ faces, pile est dû ». C'est l'erreur du joueur de casino qui mise sur le numéro « en retard ».\nRéponse : $P(\\text{pile}) = \\dfrac{1}{2}$, comme à chaque lancer.",
          schema: arbre([{ label: "Pile", proba: "1/2" }, { label: "Face", proba: "1/2" }]),
          micros: ["proba_vocabulaire", "proba_equiprobabilite"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux épreuves, comme au brevet : un tableau ou un arbre, puis le calcul.",
      rappel: [
        "Deux épreuves : je range les issues dans un TABLEAU (deux dés) ou un ARBRE (deux tirages). À chaque nœud, les branches font $1$.",
        "Le long d'un chemin, je MULTIPLIE les probabilités ; entre deux chemins différents, j'ADDITIONNE.",
        "SANS remise, l'urne a changé au second tirage : je recompte les boules.",
        "La FRÉQUENCE est observée, la PROBABILITÉ est théorique. Sur un grand nombre d'essais, la fréquence se rapproche de la probabilité.",
      ],
      exercices: [
        {
          enonce:
            "On lance deux dés équilibrés et on additionne les deux nombres.\na) Construire le tableau des sommes. Combien a-t-il de cases ?\nb) Calculer la probabilité d'obtenir une somme de $7$, puis une somme de $2$.\nc) Nina dit : « les sommes vont de $2$ à $12$, elles ont toutes la même chance ». Qu'en penser ?",
          correction:
            "a) Je croise le premier dé (lignes) et le second (colonnes) : $6 \\times 6 = 36$ cases. Ce sont les CASES qui sont équiprobables, $\\dfrac{1}{36}$ chacune.\nb) La somme $7$ occupe $6$ cases : $1 + 6$, $2 + 5$, $3 + 4$, $4 + 3$, $5 + 2$ et $6 + 1$. $P(7) = \\dfrac{6}{36} = \\dfrac{1}{6}$.\nLa somme $2$ n'occupe qu'une case, $1 + 1$ : $P(2) = \\dfrac{1}{36}$.\nc) Nina se trompe : $7$ est SIX fois plus probable que $2$. Les $11$ sommes ne sont pas équiprobables.\n⛔ Le piège : répondre $\\dfrac{1}{11}$ pour chaque somme. On compte les $36$ cases, pas les $11$ sommes.\nRéponse : $P(7) = \\dfrac{1}{6}$ et $P(2) = \\dfrac{1}{36}$.",
          schema: tableauProba(
            ["+", "1", "2", "3", "4", "5", "6"],
            [
              ["1", "2", "3", "4", "5", "6", "7"],
              ["2", "3", "4", "5", "6", "7", "8"],
              ["3", "4", "5", "6", "7", "8", "9"],
              ["4", "5", "6", "7", "8", "9", "10"],
              ["5", "6", "7", "8", "9", "10", "11"],
              ["6", "7", "8", "9", "10", "11", "12"],
            ],
            [[0, 6], [1, 5], [2, 4], [3, 3], [4, 2], [5, 1]],
          ),
          micros: ["proba_deux_epreuve", "proba_calculer"],
        },
        {
          enonce:
            "Une urne contient $3$ boules bleues et $1$ rouge. On tire une boule, on note sa couleur, on la REMET, puis on en tire une seconde.\na) Construire l'arbre des tirages.\nb) Calculer la probabilité de tirer deux boules bleues.\nc) Calculer la probabilité de tirer au moins une boule rouge.",
          figure: billes([{ couleur: B }, { couleur: B }, { couleur: B }, { couleur: R }]),
          correction:
            "a) Avec remise, l'urne est la même aux deux tirages : à chaque fois, bleue $\\dfrac{3}{4}$ et rouge $\\dfrac{1}{4}$.\nb) Le chemin « bleue puis bleue » : je MULTIPLIE les probabilités le long des branches. $P(BB) = \\dfrac{3}{4} \\times \\dfrac{3}{4} = \\dfrac{9}{16}$.\nc) Le contraire de « au moins une rouge » est « deux bleues » : $P = 1 - \\dfrac{9}{16} = \\dfrac{7}{16}$.\n⭐ Contrôle par les chemins : $\\dfrac{3}{16} + \\dfrac{3}{16} + \\dfrac{1}{16} = \\dfrac{7}{16}$ (BR, RB et RR).\n⛔ Le piège au b) : ADDITIONNER le long du chemin, $\\dfrac{3}{4} + \\dfrac{3}{4} = \\dfrac{6}{4}$, plus que $1$ : impossible pour une probabilité. Le long d'une branche, on multiplie.\nRéponse : $P(BB) = \\dfrac{9}{16}$ et $P(\\text{au moins une rouge}) = \\dfrac{7}{16}$.",
          schema: arbre([
            { label: "B", proba: "3/4", enfants: [{ label: "B", proba: "3/4" }, { label: "R", proba: "1/4" }] },
            { label: "R", proba: "1/4", enfants: [{ label: "B", proba: "3/4" }, { label: "R", proba: "1/4" }] },
          ]),
          micros: ["proba_deux_epreuve", "proba_evenement_contraire"],
        },
        {
          enonce:
            "Même urne ($3$ boules bleues et $1$ rouge), mais cette fois on ne remet PAS la première boule avant de tirer la seconde.\na) Construire l'arbre des tirages.\nb) Calculer la probabilité de tirer deux boules bleues.\nc) Quelle est la probabilité de tirer deux boules rouges ? Comment appelle-t-on un tel événement ?\nd) Comparer avec l'exercice précédent.",
          correction:
            "a) Au premier tirage : bleue $\\dfrac{3}{4}$, rouge $\\dfrac{1}{4}$. Au second, il ne reste que $3$ boules. Après une bleue : $2$ bleues et $1$ rouge, donc $\\dfrac{2}{3}$ et $\\dfrac{1}{3}$. Après la rouge : $3$ bleues, donc bleue $\\dfrac{3}{3} = 1$ et rouge $0$.\nb) $P(BB) = \\dfrac{3}{4} \\times \\dfrac{2}{3} = \\dfrac{6}{12} = \\dfrac{1}{2}$.\nc) Il n'y a qu'une rouge : une fois sortie, elle ne peut pas ressortir. $P(RR) = \\dfrac{1}{4} \\times 0 = 0$ : c'est un événement IMPOSSIBLE.\nd) Avec remise, $P(BB) = \\dfrac{9}{16}$ ; sans remise, $\\dfrac{1}{2} = \\dfrac{8}{16}$. Sans remise, deux bleues sont un peu moins probables : la première bleue sortie en laisse moins.\n⛔ Le piège au a) : garder $\\dfrac{3}{4}$ au second tirage. Sans remise, l'urne a CHANGÉ : il faut recompter.\nRéponse : $P(BB) = \\dfrac{1}{2}$ et $P(RR) = 0$.",
          schema: arbre([
            { label: "B", proba: "3/4", enfants: [{ label: "B", proba: "2/3" }, { label: "R", proba: "1/3" }] },
            { label: "R", proba: "1/4", enfants: [{ label: "B", proba: "1" }, { label: "R", proba: "0" }] },
          ]),
          micros: ["proba_deux_epreuve", "proba_vocabulaire"],
        },
        {
          enonce:
            "À la fête foraine, une roue de loterie a un secteur « gagné » de $120°$ et un secteur « perdu » de $240°$. On la fait tourner deux fois.\na) Quelle est la probabilité de « gagné » en un tour ?\nb) Construire l'arbre des deux tours.\nc) Calculer la probabilité de gagner deux fois, puis celle de gagner exactement une fois.\nd) Calculer la probabilité de ne jamais gagner.",
          figure: roue([{ label: "gagné 120°", poids: 120, couleur: V }, { label: "perdu 240°", poids: 240, couleur: R }]),
          correction:
            "a) La probabilité est proportionnelle à l'angle : $P(G) = \\dfrac{120}{360} = \\dfrac{1}{3}$, et $P(\\text{perdu}) = \\dfrac{240}{360} = \\dfrac{2}{3}$.\nb) Chaque tour est une nouvelle épreuve, avec les mêmes probabilités : l'arbre porte $\\dfrac{1}{3}$ et $\\dfrac{2}{3}$ à chaque nœud.\nc) $P(GG) = \\dfrac{1}{3} \\times \\dfrac{1}{3} = \\dfrac{1}{9}$.\nExactement une fois : deux chemins, G puis P et P puis G. $\\dfrac{1}{3} \\times \\dfrac{2}{3} + \\dfrac{2}{3} \\times \\dfrac{1}{3} = \\dfrac{2}{9} + \\dfrac{2}{9} = \\dfrac{4}{9}$.\nd) $P(PP) = \\dfrac{2}{3} \\times \\dfrac{2}{3} = \\dfrac{4}{9}$.\n⭐ Contrôle : $\\dfrac{1}{9} + \\dfrac{4}{9} + \\dfrac{4}{9} = 1$.\n⛔ Le piège au c) : oublier un des deux chemins de « exactement une fois ». Gagner au premier tour ou au second, ce sont deux issues différentes.\nRéponse : $\\dfrac{1}{9}$ ; $\\dfrac{4}{9}$ ; $\\dfrac{4}{9}$.",
          schema: arbre([
            { label: "G", proba: "1/3", enfants: [{ label: "G", proba: "1/3" }, { label: "P", proba: "2/3" }] },
            { label: "P", proba: "2/3", enfants: [{ label: "G", proba: "1/3" }, { label: "P", proba: "2/3" }] },
          ]),
          micros: ["proba_deux_epreuve", "proba_calculer"],
        },
        {
          enonce:
            "Yanis lance un dé $50$ fois. Le $1$ sort $7$ fois, le $2$ sort $9$ fois, le $3$ sort $8$ fois, le $4$ sort $6$ fois, le $5$ sort $8$ fois et le $6$ sort $12$ fois.\na) Calculer la fréquence d'apparition du $6$.\nb) Si le dé est équilibré, quelle est la probabilité d'obtenir $6$ ? En donner une valeur approchée au centième.\nc) Yanis conclut : « mon dé est truqué ». Peut-on l'affirmer ? Que faudrait-il faire ?",
          correction:
            "a) Fréquence = effectif ÷ effectif total : $\\dfrac{12}{50} = 0{,}24$.\nb) Six faces équiprobables : $P(6) = \\dfrac{1}{6} \\approx 0{,}17$.\nc) Non. La fréquence est ce qu'on a OBSERVÉ sur $50$ lancers ; la probabilité est ce qu'on attend en théorie. Sur si peu de lancers, la fréquence varie beaucoup autour de la probabilité.\nIl faudrait lancer le dé des milliers de fois : si la fréquence du $6$ restait loin de $0{,}17$, on pourrait soupçonner le dé.\n⛔ Le piège : confondre fréquence et probabilité. La fréquence change d'une série de lancers à l'autre ; la probabilité, non.\nRéponse : fréquence $0{,}24$, probabilité $\\dfrac{1}{6} \\approx 0{,}17$ ; $50$ lancers ne suffisent pas pour conclure.",
          schema: diagramme("barres", [{ label: "1", value: 7 }, { label: "2", value: 9 }, { label: "3", value: 8 }, { label: "4", value: 6 }, { label: "5", value: 8 }, { label: "6", value: 12 }], 5),
          micros: ["proba_vocabulaire", "proba_equiprobabilite"],
        },
        {
          enonce:
            "Léa et Hugo jouent à pierre-feuille-ciseaux. Chacun choisit son geste au hasard. La pierre bat les ciseaux, les ciseaux battent la feuille, la feuille bat la pierre ; deux gestes identiques font égalité.\na) Combien la partie a-t-elle d'issues ? Les présenter dans un tableau.\nb) Calculer la probabilité d'une égalité.\nc) Calculer la probabilité que Léa gagne.",
          correction:
            "a) Léa a $3$ gestes, et pour chacun Hugo en a $3$ : $3 \\times 3 = 9$ issues, équiprobables puisque chacun joue au hasard.\nb) L'égalité occupe la diagonale du tableau : $3$ cases. $P(\\text{égalité}) = \\dfrac{3}{9} = \\dfrac{1}{3}$.\nc) Léa gagne dans $3$ cases : pierre contre ciseaux, feuille contre pierre, ciseaux contre feuille. $P(\\text{Léa gagne}) = \\dfrac{3}{9} = \\dfrac{1}{3}$.\n⭐ Hugo gagne aussi dans $3$ cases : le jeu est équitable, et $\\dfrac{1}{3} + \\dfrac{1}{3} + \\dfrac{1}{3} = 1$.\n⛔ Le piège : dire « trois résultats (Léa, Hugo, égalité), donc $\\dfrac{1}{3}$ » sans le prouver. Ici c'est juste, mais c'est le tableau des $9$ cases qui le PROUVE.\nRéponse : $9$ issues ; $\\dfrac{1}{3}$ ; $\\dfrac{1}{3}$.",
          // Lignes : le geste de Léa ; colonnes : celui de Hugo ; case : le gagnant.
          schema: tableauProba(["Léa / Hugo", "Pierre", "Feuille", "Ciseaux"], [["Pierre", "=", "Hugo", "Léa"], ["Feuille", "Léa", "=", "Hugo"], ["Ciseaux", "Hugo", "Léa", "="]], [[0, 3], [1, 1], [2, 2]]),
          micros: ["proba_issue", "proba_evenement", "proba_deux_epreuve"],
        },
        {
          enonce:
            "On lance deux dés équilibrés.\na) Combien de cases du tableau des $36$ issues ne contiennent AUCUN $6$ ?\nb) En déduire la probabilité d'obtenir au moins un $6$.\nc) Sam propose : « $\\dfrac{1}{6} + \\dfrac{1}{6} = \\dfrac{2}{6}$ ». Où est son erreur ?",
          correction:
            "a) Sans $6$, chaque dé n'a plus que $5$ résultats possibles : $5 \\times 5 = 25$ cases.\nb) « Au moins un $6$ » est le contraire de « aucun $6$ » : $P = 1 - \\dfrac{25}{36} = \\dfrac{11}{36}$.\n⭐ Contrôle sur le tableau : $6$ cases dans la dernière ligne, $6$ dans la dernière colonne, mais la case du double $6$ est dans les deux. $6 + 6 - 1 = 11$ cases surlignées.\nc) $\\dfrac{2}{6} = \\dfrac{12}{36}$ : Sam compte DEUX fois le double $6$, une fois pour chaque dé.\n⛔ Le piège : ajouter les probabilités de deux événements qui peuvent arriver ensemble. Le double $6$ est dans les deux.\nRéponse : $P(\\text{au moins un } 6) = \\dfrac{11}{36}$.",
          // Lignes : premier dé ; colonnes : second dé. Surlignées : les 11 cases avec au moins un 6.
          schema: tableauProba(
            ["", "1", "2", "3", "4", "5", "6"],
            [
              ["1", "1;1", "1;2", "1;3", "1;4", "1;5", "1;6"],
              ["2", "2;1", "2;2", "2;3", "2;4", "2;5", "2;6"],
              ["3", "3;1", "3;2", "3;3", "3;4", "3;5", "3;6"],
              ["4", "4;1", "4;2", "4;3", "4;4", "4;5", "4;6"],
              ["5", "5;1", "5;2", "5;3", "5;4", "5;5", "5;6"],
              ["6", "6;1", "6;2", "6;3", "6;4", "6;5", "6;6"],
            ],
            [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6]],
          ),
          micros: ["proba_evenement_contraire", "proba_deux_epreuve", "proba_defi"],
        },
        {
          enonce:
            "L'urne $U_1$ contient $2$ boules rouges et $1$ bleue ; l'urne $U_2$ contient $1$ boule rouge et $3$ bleues. On tire une boule au hasard dans chaque urne.\na) Construire l'arbre (d'abord $U_1$, puis $U_2$).\nb) Calculer la probabilité de tirer deux boules rouges.\nc) Calculer la probabilité de tirer deux boules de la même couleur.",
          correction:
            "a) Dans $U_1$ : rouge $\\dfrac{2}{3}$, bleue $\\dfrac{1}{3}$. Dans $U_2$, quelle que soit la première boule : rouge $\\dfrac{1}{4}$, bleue $\\dfrac{3}{4}$ — les deux urnes ne se mélangent pas.\nb) $P(RR) = \\dfrac{2}{3} \\times \\dfrac{1}{4} = \\dfrac{2}{12} = \\dfrac{1}{6}$.\nc) Deux chemins : RR et BB. $P(BB) = \\dfrac{1}{3} \\times \\dfrac{3}{4} = \\dfrac{3}{12}$. Donc $P = \\dfrac{2}{12} + \\dfrac{3}{12} = \\dfrac{5}{12}$.\n⭐ Le long d'UN chemin, je multiplie ; entre deux chemins DIFFÉRENTS, j'additionne.\n⛔ Le piège : verser les deux urnes dans une seule de $7$ boules. Les tirages se font dans deux urnes distinctes, chacune avec ses probabilités.\nRéponse : $P(RR) = \\dfrac{1}{6}$ et $P(\\text{même couleur}) = \\dfrac{5}{12}$.",
          schema: arbre([
            { label: "R", proba: "2/3", enfants: [{ label: "R", proba: "1/4" }, { label: "B", proba: "3/4" }] },
            { label: "B", proba: "1/3", enfants: [{ label: "R", proba: "1/4" }, { label: "B", proba: "3/4" }] },
          ]),
          micros: ["proba_deux_epreuve", "proba_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : je dessine l'arbre, je calcule, puis une phrase de réponse.",
      rappel: [
        "Je nomme les événements, je dessine l'arbre et je vérifie qu'à chaque nœud les branches font $1$.",
        "« Au moins un » : je passe par le contraire, « aucun ».",
        "Je contrôle toujours : une probabilité est entre $0$ et $1$, et les chemins de l'arbre font $1$ en tout.",
      ],
      exercices: [
        {
          titre: "La séance de tirs au but",
          enonce:
            "Lors d'une séance de tirs au but, on admet que chaque tir est marqué avec la probabilité $0{,}75$ — environ trois sur quatre, l'ordre de grandeur des grandes compétitions —, indépendamment des autres. Deux joueurs d'une même équipe tirent l'un après l'autre.\na) Construire l'arbre (M : marqué, R : raté).\nb) Calculer la probabilité que les deux marquent.\nc) Calculer la probabilité qu'exactement un des deux marque.\nd) Calculer la probabilité qu'au moins un des deux rate.",
          correction:
            "a) Chaque tir : M avec $0{,}75$, R avec $1 - 0{,}75 = 0{,}25$. Le second tir ne dépend pas du premier : mêmes probabilités à chaque nœud.\nb) $P(MM) = 0{,}75 \\times 0{,}75 = 0{,}5625$.\nc) Deux chemins, MR et RM : $0{,}75 \\times 0{,}25 + 0{,}25 \\times 0{,}75 = 0{,}1875 + 0{,}1875 = 0{,}375$.\nd) « Au moins un raté » est le contraire de « les deux marquent » : $1 - 0{,}5625 = 0{,}4375$.\n⭐ Contrôle : $P(RR) = 0{,}25 \\times 0{,}25 = 0{,}0625$, et $0{,}5625 + 0{,}375 + 0{,}0625 = 1$.\n⛔ Le piège au b) : additionner, $0{,}75 + 0{,}75 = 1{,}5$. Une probabilité ne dépasse jamais $1$ : le long d'une branche, on MULTIPLIE.\nRéponse : $0{,}5625$ ; $0{,}375$ ; $0{,}4375$ — un peu moins d'une chance sur deux que l'un des deux rate.",
          schema: arbre([
            { label: "M", proba: "0,75", enfants: [{ label: "M", proba: "0,75" }, { label: "R", proba: "0,25" }] },
            { label: "R", proba: "0,25", enfants: [{ label: "M", proba: "0,75" }, { label: "R", proba: "0,25" }] },
          ]),
          micros: ["proba_deux_epreuve", "proba_evenement_contraire", "proba_defi"],
        },
        {
          titre: "Le week-end pluvieux",
          enonce:
            "Le bulletin météo annonce une probabilité de pluie de $30$ % pour samedi et de $60$ % pour dimanche. On suppose que le temps d'un jour ne dépend pas de celui de la veille.\na) Que signifie « $30$ % de probabilité de pluie » ?\nb) Construire l'arbre des deux jours.\nc) Calculer la probabilité qu'il ne pleuve ni samedi ni dimanche.\nd) Calculer la probabilité qu'il pleuve au moins un des deux jours. Est-ce $0{,}3 + 0{,}6$ ?",
          correction:
            "a) Sur un grand nombre de jours annoncés à $30$ %, il pleut environ $3$ jours sur $10$. Ce n'est pas « il pleuvra $30$ % de la journée ».\nb) Samedi : pluie $0{,}3$, sec $0{,}7$. Dimanche, après chacune des deux branches : pluie $0{,}6$, sec $0{,}4$.\nc) Le chemin « sec puis sec » : $0{,}7 \\times 0{,}4 = 0{,}28$.\nd) C'est le contraire du c) : $1 - 0{,}28 = 0{,}72$.\nCe n'est pas $0{,}3 + 0{,}6 = 0{,}9$ : cette somme compte deux fois le cas où il pleut les DEUX jours, de probabilité $0{,}3 \\times 0{,}6 = 0{,}18$.\n⛔ Le piège : ajouter les probabilités des deux jours. Avec $60$ % et $70$ %, on trouverait $1{,}3$ : absurde.\nRéponse : $0{,}28$ sans pluie du tout, $0{,}72$ avec au moins un jour de pluie.",
          schema: arbre([
            { label: "Pluie", proba: "0,3", enfants: [{ label: "Pluie", proba: "0,6" }, { label: "Sec", proba: "0,4" }] },
            { label: "Sec", proba: "0,7", enfants: [{ label: "Pluie", proba: "0,6" }, { label: "Sec", proba: "0,4" }] },
          ]),
          micros: ["proba_deux_epreuve", "proba_evenement_contraire", "proba_defi"],
        },
        {
          titre: "Deux donneurs de sang",
          enonce:
            "En France, $42$ % des personnes sont du groupe sanguin O (Établissement français du sang). Un centre de collecte reçoit deux donneurs choisis au hasard, indépendamment l'un de l'autre.\na) Construire l'arbre (O ou « non O » pour chaque donneur).\nb) Calculer la probabilité que les deux soient du groupe O.\nc) Calculer la probabilité qu'aucun ne soit du groupe O, puis qu'au moins un le soit.\nd) Calculer la probabilité qu'exactement un des deux soit du groupe O.",
          correction:
            "a) Pour chaque donneur : O avec $0{,}42$, non O avec $1 - 0{,}42 = 0{,}58$.\nb) $P(\\text{O et O}) = 0{,}42 \\times 0{,}42 = 0{,}1764$.\nc) Aucun : $0{,}58 \\times 0{,}58 = 0{,}3364$. Au moins un, c'est le contraire : $1 - 0{,}3364 = 0{,}6636$.\nd) Deux chemins : $0{,}42 \\times 0{,}58 + 0{,}58 \\times 0{,}42 = 0{,}2436 + 0{,}2436 = 0{,}4872$.\n⭐ Contrôle : $0{,}1764 + 0{,}4872 + 0{,}3364 = 1$.\n⛔ Le piège au b) : répondre $0{,}42$, comme pour un seul donneur. Il faut que le premier soit O, PUIS que le second le soit aussi : je multiplie, et la probabilité baisse.\nRéponse : $0{,}1764$ ; $0{,}3364$ et $0{,}6636$ ; $0{,}4872$.",
          schema: arbre([
            { label: "O", proba: "0,42", enfants: [{ label: "O", proba: "0,42" }, { label: "non O", proba: "0,58" }] },
            { label: "non O", proba: "0,58", enfants: [{ label: "O", proba: "0,42" }, { label: "non O", proba: "0,58" }] },
          ]),
          micros: ["proba_deux_epreuve", "proba_evenement_contraire", "proba_calculer"],
        },
        {
          titre: "Le jeu est-il équitable ?",
          enonce:
            "Alice et Bruno lancent deux dés équilibrés et font la somme. Alice gagne si la somme vaut $6$, $7$ ou $8$ ; sinon, c'est Bruno.\na) Bruno proteste : « Alice n'a que $3$ sommes sur $11$, c'est moi qui suis avantagé ». Calculer la probabilité qu'Alice gagne.\nb) Le jeu est-il équitable ? Qui est avantagé ?\nc) Proposer une règle qui donne à Alice et à Bruno exactement la même chance, et le prouver.",
          correction:
            "a) Je compte les cases du tableau des $36$ issues : la somme $6$ occupe $5$ cases, la somme $7$ en occupe $6$, la somme $8$ en occupe $5$. $5 + 6 + 5 = 16$ cases : $P(\\text{Alice}) = \\dfrac{16}{36} = \\dfrac{4}{9}$.\nb) $P(\\text{Bruno}) = 1 - \\dfrac{16}{36} = \\dfrac{20}{36} = \\dfrac{5}{9}$. Bruno gagne un peu plus souvent : le jeu n'est pas équitable, mais l'écart est bien plus petit que Bruno ne le croit.\nc) Par exemple : Alice gagne si la somme est PAIRE. Une somme est paire quand les deux dés sont tous deux pairs ou tous deux impairs : $3 \\times 3 + 3 \\times 3 = 18$ cases, et $\\dfrac{18}{36} = \\dfrac{1}{2}$.\n⛔ Le piège au a) : calculer $\\dfrac{3}{11}$. Les sommes du milieu occupent bien plus de cases que $2$ ou $12$ : on compte les $36$ cases, pas les $11$ sommes.\nRéponse : $P(\\text{Alice}) = \\dfrac{4}{9}$ ; Bruno est avantagé ; « somme paire » rend le jeu équitable.",
          // Les 16 cases d'Alice (somme 6, 7 ou 8), surlignées.
          schema: tableauProba(
            ["+", "1", "2", "3", "4", "5", "6"],
            [
              ["1", "2", "3", "4", "5", "6", "7"],
              ["2", "3", "4", "5", "6", "7", "8"],
              ["3", "4", "5", "6", "7", "8", "9"],
              ["4", "5", "6", "7", "8", "9", "10"],
              ["5", "6", "7", "8", "9", "10", "11"],
              ["6", "7", "8", "9", "10", "11", "12"],
            ],
            [[0, 5], [0, 6], [1, 4], [1, 5], [1, 6], [2, 3], [2, 4], [2, 5], [3, 2], [3, 3], [3, 4], [4, 1], [4, 2], [4, 3], [5, 1], [5, 2]],
          ),
          micros: ["proba_deux_epreuve", "proba_defi"],
        },
      ],
    },
  ],
};
