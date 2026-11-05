// ─── Fiche d'exercices : fractions, puissances et écritures (STMG) — 20 exercices
//
// Notion auto_fractions_puissances du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/automatismes-calcul.bank.ts` et son renfort
// `questionBank/puissances-automatismes-lycee.ts`, générateurs de
// `puissances-regles-commun.ts`). C'est de l'ENTRETIEN : additionner deux
// fractions, en prendre une partie, la priorité du produit, la fraction d'une
// fraction, comparer ; produit, quotient et puissance de puissance, $a^0$ et
// exposant négatif ; passer d'une écriture à l'autre, et le produit ou le quotient
// en écriture scientifique, qu'il faut parfois remettre en forme. Rien de plus.
//
// ⭐ LES SEULES DONNÉES RÉELLES, sourcées (ex. 15) :
//   · distance Terre-Soleil ≈ 1,5 × 10⁸ km (unité astronomique : 149 597 870,7 km,
//     Union astronomique internationale, 2012) ;
//   · vitesse de la lumière ≈ 3 × 10⁵ km/s (299 792,458 km/s, Bureau international
//     des poids et mesures).
// Tout le reste est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus ou presque (ex. 1 à 8, avec une fromagerie à
// l'ex. 2) ; voile (trésorier de club), vélos en libre-service (gestionnaire), tir
// à l'arc (archers), élection de délégués (ex. 12), photographie numérique
// (technicien), biologie (biologiste), astronomie (astronome), énergie
// (statisticienne) ; médiathèque (directrice), déchets (technicienne), centre de
// données (ingénieur), laboratoire (technicienne).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-1.mjs`.
//
// Micro-compétences : auto_num_fractions_operations (1, 2, 9, 10, 17, 18),
// auto_num_fractions_comparer (3, 11, 12, 17, 18), auto_num_puissances (4, 5, 6, 13,
// 14, 19, 20), auto_num_ecritures (7, 8, 15, 16, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/** Une fraction en `exact` : tapée « 5/6 » ou avec la touche a⁄b, qui écrit « (5)/(6) ». */
const fraction = (a: number, b: number): string[] => [`${a}/${b}`, `(${a})/(${b})`];

export const exercicesAutoFractionsPuissancesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-fractions-puissances",
  titre: "Fractions, puissances et écritures",
  accroche:
    "Vingt exercices pour remettre les gestes en place : additionner et comparer des fractions, en prendre une partie, calculer avec des puissances, passer à l'écriture scientifique et en revenir. Un parc de vélos, une colonie de bactéries, la lumière du Soleil, le budget d'une médiathèque, un centre de données. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : additionner, comparer, calculer une puissance ou changer d'écriture.",
      rappel: [
        "Pour additionner deux fractions, il faut le même dénominateur. Pour en prendre une partie, on multiplie : $\\dfrac{2}{5}$ de $20$, c'est $20 \\div 5 \\times 2 = 8$.",
        "Pour comparer deux fractions : même dénominateur, ou écritures décimales.",
        "Mêmes bases : $a^m \\times a^n = a^{m+n}$. Et $a^0 = 1$ ; $a^{-n} = \\dfrac{1}{a^n}$ : un exposant négatif donne un inverse, pas un nombre négatif.",
        "Écriture scientifique : $a \\times 10^n$ avec $1 \\leqslant a < 10$, un seul chiffre non nul avant la virgule. Une fraction est un quotient : $\\dfrac{1}{4} = 1 \\div 4 = 0{,}25$.",
      ],
      exercices: [
        {
          enonce: "Calcule $\\dfrac{1}{2} + \\dfrac{1}{3}$. Donne le résultat sous forme d'une fraction irréductible.",
          reponses: [{ attendu: fraction(5, 6), exact: true }],
          correction:
            "Il faut le même dénominateur. Ici, $6$ convient.\n$\\dfrac{1}{2} = \\dfrac{3}{6}$ et $\\dfrac{1}{3} = \\dfrac{2}{6}$.\nOn additionne les numérateurs : $\\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$.\n⛔ Le piège : additionner les numérateurs et les dénominateurs, et trouver $\\dfrac{2}{5}$.\nRéponse : $\\dfrac{5}{6}$.",
          micros: ["auto_num_fractions_operations"],
        },
        {
          enonce: "Une fromagerie a $120$ fromages en cave. Les $\\dfrac{3}{4}$ sont affinés. Combien de fromages sont affinés ?",
          reponses: [{ attendu: "90" }],
          correction:
            "Prendre une fraction d'une quantité, c'est multiplier.\nOn divise par le dénominateur : $120 \\div 4 = 30$.\nOn multiplie par le numérateur : $30 \\times 3 = 90$.\n⛔ Le piège : s'arrêter à $30$, qui n'est que le quart.\nRéponse : 90 fromages.",
          micros: ["auto_num_fractions_operations"],
        },
        {
          enonce: "Quelle est la plus grande de ces deux fractions : $\\dfrac{3}{4}$ ou $\\dfrac{5}{8}$ ? Écris-la, avec une barre de fraction.",
          reponses: [{ attendu: fraction(3, 4), exact: true }],
          correction:
            "On prend le même dénominateur : $\\dfrac{3}{4} = \\dfrac{6}{8}$.\nOn compare $\\dfrac{6}{8}$ et $\\dfrac{5}{8}$ : $6$ est plus grand que $5$.\nLa plus grande est donc $\\dfrac{3}{4}$.\n⛔ Le piège : choisir $\\dfrac{5}{8}$ parce que $5$ et $8$ sont plus grands que $3$ et $4$. Seuls les numérateurs de même dénominateur se comparent.\nRéponse : $\\dfrac{3}{4}$.",
          micros: ["auto_num_fractions_comparer"],
        },
        {
          enonce: "Écris $2^3 \\times 2^4$ sous la forme d'une seule puissance de $2$.",
          reponses: [{ attendu: "2^7", exact: true }],
          correction:
            "Mêmes bases, on garde la base et on additionne les exposants.\n$3 + 4 = 7$, donc $2^3 \\times 2^4 = 2^7$.\n⛔ Le piège : multiplier les exposants ($2^{12}$), ou multiplier les bases ($4^7$).\nRéponse : $2^7$.",
          micros: ["auto_num_puissances"],
        },
        {
          enonce: "Calcule $10^5 \\times 10^{-2}$ et donne le résultat en écriture décimale.",
          reponses: [{ attendu: "1 000", exact: true }],
          correction:
            "On additionne les exposants, avec leur signe : $5 + (-2) = 3$.\n$10^5 \\times 10^{-2} = 10^3 = 1\\,000$.\n⛔ Le piège : calculer $5 \\times (-2) = -10$. Pour un produit, les exposants s'ajoutent.\nRéponse : 1 000.",
          micros: ["auto_num_puissances"],
        },
        {
          enonce: "Donne la valeur de chaque nombre, sans puissance.\na) $7^0$\nb) $2^{-3}$",
          reponses: [
            { question: "a)", attendu: "1", exact: true },
            { question: "b)", attendu: [...fraction(1, 8), "0,125"], exact: true },
          ],
          correction:
            "a) Tout nombre non nul à la puissance $0$ vaut $1$.\nb) Un exposant négatif donne l'inverse : $2^{-3} = \\dfrac{1}{2^3} = \\dfrac{1}{8} = 0{,}125$.\n⛔ Le piège au b) : répondre $-8$ ou $-6$. Un exposant négatif ne rend pas le nombre négatif.\nRéponse : a) 1 ; b) $\\dfrac{1}{8}$, soit 0,125.",
          micros: ["auto_num_puissances"],
        },
        {
          enonce: "Écris $34\\,000$ en écriture scientifique.",
          reponses: [{ attendu: "3,4×10^4", exact: true }],
          correction:
            "On place la virgule après le premier chiffre non nul : $3{,}4$.\nOn compte les rangs déplacés : $34\\,000$ est égal à $3{,}4 \\times 10\\,000$, soit $3{,}4 \\times 10^4$.\n⛔ Le piège : écrire $34 \\times 10^3$. La valeur est juste, mais il y a deux chiffres avant la virgule.\nRéponse : $3{,}4 \\times 10^4$.",
          micros: ["auto_num_ecritures"],
        },
        {
          enonce: "Donne l'écriture décimale de $\\dfrac{3}{8}$.",
          reponses: [{ attendu: "0,375", exact: true }],
          correction:
            "Une fraction est un quotient : on effectue $3 \\div 8$.\n$3 \\div 8 = 0{,}375$.\n⛔ Le piège : écrire $3{,}8$ en collant les deux nombres, ou diviser $8$ par $3$.\nRéponse : 0,375.",
          micros: ["auto_num_ecritures"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : un calcul court à chaque étape.",
      rappel: [
        "Le produit passe avant la somme : dans $\\dfrac{1}{3} + \\dfrac{1}{2} \\times \\dfrac{1}{4}$, on calcule d'abord le produit.",
        "« Les $\\dfrac{3}{4}$ des $\\dfrac{2}{7}$ » : on MULTIPLIE les deux fractions. Numérateurs ensemble, dénominateurs ensemble.",
        "Quotient : $a^m \\div a^n = a^{m-n}$. Puissance de puissance : $(a^m)^n = a^{m \\times n}$.",
        "En écriture scientifique : on multiplie ou on divise les nombres devant, on calcule la puissance de $10$, puis on remet un seul chiffre non nul avant la virgule.",
      ],
      exercices: [
        {
          enonce:
            "Le trésorier d'un club de voile répartit son budget (modèle). Un quart va aux bateaux. Un cinquième va aux salaires, dont la moitié pour le moniteur.\na) Quelle part du budget va au moniteur ? Calcule $\\dfrac{1}{2} \\times \\dfrac{1}{5}$.\nb) Quelle part va aux bateaux et au moniteur ensemble ? Calcule $\\dfrac{1}{4} + \\dfrac{1}{2} \\times \\dfrac{1}{5}$. Donne une fraction irréductible.",
          reponses: [
            { question: "a)", attendu: [...fraction(1, 10), "0,1"], exact: true },
            { question: "b)", attendu: fraction(7, 20), exact: true },
          ],
          correction:
            "a) On multiplie : $\\dfrac{1 \\times 1}{2 \\times 5} = \\dfrac{1}{10}$, soit $0{,}1$.\nb) Le produit passe d'abord, il vaut $\\dfrac{1}{10}$.\nPuis $\\dfrac{1}{4} + \\dfrac{1}{10} = \\dfrac{5}{20} + \\dfrac{2}{20} = \\dfrac{7}{20}$, soit $0{,}35$.\n⛔ Le piège au b) : additionner avant de multiplier. $\\left(\\dfrac{1}{4} + \\dfrac{1}{2}\\right) \\times \\dfrac{1}{5} = \\dfrac{3}{20}$, ce n'est pas le même nombre.\nRéponse : a) $\\dfrac{1}{10}$ ; b) $\\dfrac{7}{20}$.",
          micros: ["auto_num_fractions_operations"],
        },
        {
          enonce:
            "Un gestionnaire de vélos en libre-service a $300$ vélos (modèle). Les $\\dfrac{2}{3}$ sont électriques, et parmi eux, $\\dfrac{1}{4}$ sont en réparation.\na) Combien y a-t-il de vélos électriques ?\nb) Combien de vélos électriques sont en réparation ?\nc) Quelle fraction de tous les vélos cela représente-t-il ? Donne une fraction irréductible.",
          reponses: [
            { question: "a)", attendu: "200" },
            { question: "b)", attendu: "50" },
            { question: "c)", attendu: fraction(1, 6), exact: true },
          ],
          correction:
            "a) $300 \\div 3 \\times 2 = 200$ vélos électriques.\nb) Le tout est maintenant $200$ : $200 \\div 4 = 50$.\nc) On multiplie les deux fractions : $\\dfrac{2}{3} \\times \\dfrac{1}{4} = \\dfrac{2}{12} = \\dfrac{1}{6}$.\nVérification : $50 \\div 300 = \\dfrac{1}{6}$. ✔\n⛔ Le piège au c) : additionner $\\dfrac{2}{3}$ et $\\dfrac{1}{4}$. La seconde fraction porte sur les vélos électriques, pas sur tous les vélos.\nRéponse : a) 200 ; b) 50 ; c) $\\dfrac{1}{6}$.",
          micros: ["auto_num_fractions_operations"],
        },
        {
          enonce:
            "Au tir à l'arc, Noa touche la cible avec $\\dfrac{7}{10}$ de ses flèches et Malik avec $\\dfrac{2}{3}$ des siennes.\na) Écris ces deux fractions avec le dénominateur $30$. Donne les deux numérateurs, celui de Noa puis celui de Malik, séparés par un point-virgule.\nb) Qui est le plus adroit ? Écris son prénom.",
          reponses: [
            { question: "a)", attendu: "21 ; 20", ordre: true },
            { question: "b)", attendu: "Noa" },
          ],
          correction:
            "a) $\\dfrac{7}{10} = \\dfrac{7 \\times 3}{10 \\times 3} = \\dfrac{21}{30}$ et $\\dfrac{2}{3} = \\dfrac{2 \\times 10}{3 \\times 10} = \\dfrac{20}{30}$.\nb) $21$ est plus grand que $20$ : Noa est le plus adroit.\n⛔ Le piège : comparer sans calcul. Les deux fractions sont très proches, l'œil ne suffit pas.\nRéponse : a) 21 ; 20 ; b) Noa.",
          micros: ["auto_num_fractions_comparer"],
        },
        {
          enonce:
            "Pour une élection de délégués (situation fictive), quatre candidats ont obtenu ces parts des voix dans leur classe : $\\dfrac{3}{8}$, $\\dfrac{5}{9}$, $\\dfrac{3}{5}$ et $\\dfrac{7}{10}$.\nUne seule part est INFÉRIEURE à $\\dfrac{1}{2}$. Écris-la, avec une barre de fraction.",
          reponses: [{ attendu: fraction(3, 8), exact: true }],
          correction:
            "On compare chaque fraction à la moitié : le numérateur vaut-il plus ou moins que la moitié du dénominateur ?\n$\\dfrac{3}{8}$ : la moitié de $8$ est $4$, et $3$ est plus petit. Elle est inférieure à $\\dfrac{1}{2}$.\n$\\dfrac{5}{9}$ : la moitié de $9$ est $4{,}5$, et $5$ est plus grand. $\\dfrac{3}{5}$ : la moitié de $5$ est $2{,}5$, et $3$ est plus grand. $\\dfrac{7}{10}$ : la moitié de $10$ est $5$, et $7$ est plus grand.\n⛔ Le piège : ne regarder que le numérateur, et choisir une fraction parce que son numérateur est petit. $\\dfrac{3}{5}$ a le même numérateur que $\\dfrac{3}{8}$ et dépasse la moitié.\nRéponse : $\\dfrac{3}{8}$.",
          micros: ["auto_num_fractions_comparer"],
        },
        {
          enonce:
            "Un technicien photo a une carte mémoire de $2^{30}$ octets. Chaque photo occupe $2^{20}$ octets (modèle).\na) Combien de photos la carte contient-elle ? Écris le résultat sous la forme d'une seule puissance de $2$.\nb) Donne ce nombre en écriture décimale.",
          reponses: [
            { question: "a)", attendu: "2^10", exact: true },
            { question: "b)", attendu: "1 024", exact: true },
          ],
          correction:
            "a) Combien de fois $2^{20}$ dans $2^{30}$ : on divise. $2^{30} \\div 2^{20} = 2^{30 - 20} = 2^{10}$.\nb) $2^{10} = 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 = 1\\,024$.\n⛔ Le piège au a) : diviser les exposants et écrire $2^{1{,}5}$, ou répondre $1^{10}$ en divisant les bases. On garde la base et on retranche les exposants.\nRéponse : a) $2^{10}$ ; b) 1 024.",
          micros: ["auto_num_puissances"],
        },
        {
          enonce:
            "Une biologiste suit une colonie de bactéries (modèle). Chaque heure, la colonie est multipliée par $2^3$. Au bout de $4$ heures, elle est donc multipliée par $(2^3)^4$. Puis un traitement la divise par $2^5$.\na) Écris $(2^3)^4$ sous la forme d'une seule puissance de $2$.\nb) Écris $(2^3)^4 \\div 2^5$ sous la forme d'une seule puissance de $2$.\nc) Par quel nombre la colonie est-elle multipliée au total ? Donne-le en écriture décimale.",
          reponses: [
            { question: "a)", attendu: "2^12", exact: true },
            { question: "b)", attendu: "2^7", exact: true },
            { question: "c)", attendu: "128", exact: true },
          ],
          correction:
            "a) Puissance de puissance : on multiplie les exposants. $(2^3)^4 = 2^{3 \\times 4} = 2^{12}$.\nb) Quotient : on retranche les exposants. $2^{12} \\div 2^5 = 2^{12 - 5} = 2^7$.\nc) $2^7 = 128$.\n⛔ Le piège au a) : additionner les exposants et écrire $2^7$. L'addition, c'est pour un produit de deux puissances.\nRéponse : a) $2^{12}$ ; b) $2^7$ ; c) 128.",
          micros: ["auto_num_puissances"],
        },
        {
          enonce:
            "Une astronome rappelle deux ordres de grandeur. Le Soleil est à environ $150\\,000\\,000$ km de la Terre. La lumière parcourt environ $3 \\times 10^5$ km par seconde.\na) Écris $150\\,000\\,000$ en écriture scientifique.\nb) Combien de secondes la lumière du Soleil met-elle pour arriver sur Terre ? Calcule $150\\,000\\,000 \\div (3 \\times 10^5)$ et donne une écriture décimale.",
          reponses: [
            { question: "a)", attendu: ["1,5×10^8", "1,5×10^8 km"], exact: true },
            { question: "b)", attendu: "500 s", exact: true },
          ],
          correction:
            "a) La virgule se place après le $1$ et recule de $8$ rangs : $1{,}5 \\times 10^8$.\nb) On divise les nombres devant : $1{,}5 \\div 3 = 0{,}5$.\nOn divise les puissances de $10$ : $10^8 \\div 10^5 = 10^3$.\n$0{,}5 \\times 10^3 = 500$ secondes, soit un peu plus de $8$ minutes.\n⛔ Le piège au a) : écrire $15 \\times 10^7$. La valeur est juste, mais ce n'est pas une écriture scientifique.\nRéponse : a) $1{,}5 \\times 10^8$ ; b) 500 s.",
          micros: ["auto_num_ecritures"],
        },
        {
          enonce:
            "Une statisticienne de l'énergie estime qu'un pays a $6 \\times 10^6$ foyers, et que chaque foyer consomme $2{,}5 \\times 10^3$ kWh par an (modèle).\na) Combien vaut $6 \\times 2{,}5$ ?\nb) Donne la consommation totale en écriture scientifique, en kWh.",
          reponses: [
            { question: "a)", attendu: "15", exact: true },
            { question: "b)", attendu: ["1,5×10^10", "1,5×10^10 kWh"], exact: true },
          ],
          correction:
            "a) $6 \\times 2{,}5 = 15$.\nb) Les puissances de $10$ : $10^6 \\times 10^3 = 10^9$. Le total vaut $15 \\times 10^9$.\nCe n'est pas encore une écriture scientifique : $15 = 1{,}5 \\times 10$.\nDonc $15 \\times 10^9 = 1{,}5 \\times 10 \\times 10^9 = 1{,}5 \\times 10^{10}$.\n⛔ Le piège au b) : écrire $1{,}5 \\times 10^9$. On a déplacé la virgule sans ajouter $1$ à l'exposant.\nRéponse : a) 15 ; b) $1{,}5 \\times 10^{10}$ kWh.",
          micros: ["auto_num_ecritures"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : garder les fractions le plus longtemps possible, et vérifier avec les quantités.",
      rappel: [
        "Le reste d'un tout : on part de $1$, c'est-à-dire de la fraction entière, et on retire les parts.",
        "Avant chaque fraction, on se demande : de quel tout parle-t-on ?",
        "Un résultat comme $0{,}4 \\times 10^6$ se remet en forme : $0{,}4 \\times 10^6 = 4 \\times 10^5$.",
      ],
      exercices: [
        {
          titre: "Le budget de la médiathèque",
          enonce:
            "La directrice d'une médiathèque dispose de $48\\,000$ € (modèle). Un tiers va aux livres, un quart au numérique, le reste aux animations.\na) Quelle part va aux livres et au numérique ensemble ? Donne une fraction irréductible.\nb) Quelle part va aux animations ? Donne une fraction irréductible.\nc) Quel est le montant des animations ?\nd) Quel poste reçoit le plus ? Écris : livres, numérique ou animations.",
          reponses: [
            { question: "a)", attendu: fraction(7, 12), exact: true },
            { question: "b)", attendu: fraction(5, 12), exact: true },
            { question: "c)", attendu: "20 000 €" },
            { question: "d)", attendu: ["animations", "les animations", "animation"] },
          ],
          correction:
            "a) $\\dfrac{1}{3} + \\dfrac{1}{4} = \\dfrac{4}{12} + \\dfrac{3}{12} = \\dfrac{7}{12}$.\nb) Le reste : $1 - \\dfrac{7}{12} = \\dfrac{5}{12}$.\nc) $48\\,000 \\div 12 \\times 5 = 4\\,000 \\times 5 = 20\\,000$ €.\nd) Avec le dénominateur $12$ : livres $\\dfrac{4}{12}$, numérique $\\dfrac{3}{12}$, animations $\\dfrac{5}{12}$. Les animations reçoivent le plus.\nVérification : $16\\,000 + 12\\,000 + 20\\,000 = 48\\,000$. ✔\n⛔ Le piège au a) : écrire $\\dfrac{2}{7}$ en additionnant numérateurs et dénominateurs.\nRéponse : a) $\\dfrac{7}{12}$ ; b) $\\dfrac{5}{12}$ ; c) 20 000 € ; d) animations.",
          micros: ["auto_num_fractions_operations", "auto_num_fractions_comparer"],
        },
        {
          titre: "Le tri des déchets",
          enonce:
            "Une technicienne de l'environnement suit $3\\,200$ tonnes de déchets d'une ville (modèle). Les $\\dfrac{5}{8}$ sont triés, et parmi les déchets triés, les $\\dfrac{3}{5}$ sont recyclés.\na) Combien de tonnes sont triées ?\nb) Combien de tonnes sont recyclées ?\nc) Quelle fraction de tous les déchets est recyclée ? Donne une fraction irréductible.\nd) La ville vise au moins la moitié de déchets recyclés. L'objectif est-il atteint ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "2 000 t" },
            { question: "b)", attendu: "1 200 t" },
            { question: "c)", attendu: fraction(3, 8), exact: true },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $3\\,200 \\div 8 \\times 5 = 400 \\times 5 = 2\\,000$ tonnes.\nb) Le tout est maintenant $2\\,000$ : $2\\,000 \\div 5 \\times 3 = 1\\,200$ tonnes.\nc) $\\dfrac{5}{8} \\times \\dfrac{3}{5} = \\dfrac{15}{40} = \\dfrac{3}{8}$.\nVérification : $1\\,200 \\div 3\\,200 = 0{,}375$, et $\\dfrac{3}{8} = 0{,}375$. ✔\nd) La moitié, c'est $\\dfrac{4}{8}$, et $\\dfrac{3}{8}$ est plus petit : l'objectif n'est pas atteint.\n⛔ Le piège au b) : calculer les $\\dfrac{3}{5}$ de $3\\,200$. Le mot « parmi » dit que le tout, ici, c'est les $2\\,000$ tonnes triées.\nRéponse : a) 2 000 t ; b) 1 200 t ; c) $\\dfrac{3}{8}$ ; d) non.",
          micros: ["auto_num_fractions_operations", "auto_num_fractions_comparer"],
        },
        {
          titre: "Le centre de données",
          enonce:
            "Un ingénieur gère un centre de données (modèle) de $2 \\times 10^4$ serveurs, qui stockent chacun $5 \\times 10^{12}$ octets. Une vidéo occupe $2 \\times 10^9$ octets.\na) Donne la capacité totale en écriture scientifique, en octets.\nb) Combien de vidéos peut-on stocker ? Donne le résultat en écriture scientifique.\nc) Écris ce nombre de vidéos en écriture décimale.",
          reponses: [
            { question: "a)", attendu: ["1×10^17", "10^17", "1×10^17 octets", "10^17 octets"], exact: true },
            { question: "b)", attendu: ["5×10^7", "5×10^7 vidéos"], exact: true },
            { question: "c)", attendu: "50 000 000", exact: true },
          ],
          correction:
            "a) $2 \\times 5 = 10$ et $10^4 \\times 10^{12} = 10^{16}$. Le total vaut $10 \\times 10^{16} = 1 \\times 10^{17}$.\nb) $(1 \\times 10^{17}) \\div (2 \\times 10^9)$ : $1 \\div 2 = 0{,}5$ et $10^{17} \\div 10^9 = 10^8$.\nDonc $0{,}5 \\times 10^8 = 5 \\times 10^7$.\nc) $5 \\times 10^7 = 50\\,000\\,000$ : cinquante millions de vidéos.\n⛔ Le piège au b) : s'arrêter à $0{,}5 \\times 10^8$. Avant la virgule, il faut un chiffre non nul.\nRéponse : a) $1 \\times 10^{17}$ ; b) $5 \\times 10^7$ ; c) 50 000 000.",
          micros: ["auto_num_puissances", "auto_num_ecritures"],
        },
        {
          titre: "Au microscope",
          enonce:
            "Une technicienne de laboratoire observe une cellule de $0{,}000\\,005$ mètre de large (modèle).\na) Écris cette largeur en écriture scientifique.\nb) Un centimètre vaut $0{,}01$ mètre. Écris $0{,}01$ sous la forme d'une puissance de $10$.\nc) Combien de ces cellules, côte à côte, tiennent sur un centimètre ? Divise le centimètre par la largeur d'une cellule, avec les écritures trouvées, et donne une écriture décimale.",
          reponses: [
            { question: "a)", attendu: ["5×10^-6", "5×10^-6 m", "5×10^-6 mètre", "5×10^-6 mètres"], exact: true },
            { question: "b)", attendu: "10^-2", exact: true },
            { question: "c)", attendu: "2 000", exact: true },
          ],
          correction:
            "a) La virgule avance de $6$ rangs vers la droite : $5 \\times 10^{-6}$.\nb) $0{,}01 = \\dfrac{1}{100} = 10^{-2}$.\nc) On calcule $10^{-2} \\div (5 \\times 10^{-6})$.\nOn divise les nombres devant : $1 \\div 5 = 0{,}2$.\nOn retranche les exposants, avec leur signe : $-2 - (-6) = -2 + 6 = 4$.\nDonc $0{,}2 \\times 10^4 = 2\\,000$ cellules.\n⛔ Le piège au c) : écrire $-2 - 6 = -8$. Retrancher $-6$, c'est ajouter $6$.\nRéponse : a) $5 \\times 10^{-6}$ ; b) $10^{-2}$ ; c) 2 000.",
          micros: ["auto_num_puissances", "auto_num_ecritures"],
        },
      ],
    },
  ],
};
