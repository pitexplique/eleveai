/* -------------------------------------------------------------------------- */
/*  Données du cahier de vacances « En route vers le Bac +1 » (Tle → post-bac).*/
/*  Angle fort (demande fondateur) : INVENTER LES SOLUTIONS DE DEMAIN.         */
/*  Aboutissement de la collection : on passe d'APPRENDRE à CRÉER. Le toolkit  */
/*  de l'innovateur — poser le problème, modéliser, imaginer, prototyper,      */
/*  s'attaquer aux grands défis, lancer son projet.                            */
/*  Niveau Terminale → début du supérieur : maths APPLIQUÉES (estimation,      */
/*  optimisation, données, exponentielle, proba, R0, bilan carbone…),          */
/*  méthode de l'innovateur (colonne « français »), gestes = outils tech du    */
/*  créateur. Défis ★★★★★ = problèmes ouverts / estimation de Fermi / énigmes. */
/*  Moteur d'affichage commun : components/cahier/CahierVacances.tsx.          */
/* -------------------------------------------------------------------------- */

import type { Etape, Jour } from "@/components/cahier/types";

/** Les 6 étapes pour inventer les solutions de demain (une par semaine). */
export const parcours: Etape[] = [
  { semaine: 1, etape: 1, emoji: "🧭", lieu: "Bien poser le problème", intro: "Inventer commence par comprendre le vrai problème à résoudre." },
  { semaine: 2, etape: 2, emoji: "📐", lieu: "Modéliser et comprendre", intro: "Les maths et les données pour décrire et prévoir le réel." },
  { semaine: 3, etape: 3, emoji: "💡", lieu: "Imaginer des solutions", intro: "Générer des idées, penser autrement, relier les domaines." },
  { semaine: 4, etape: 4, emoji: "🛠️", lieu: "Prototyper et tester", intro: "Construire vite, tester, échouer, recommencer en mieux." },
  { semaine: 5, etape: 5, emoji: "🌍", lieu: "Les grands défis du monde", intro: "Énergie, climat, santé, eau, espace : chiffrer pour agir." },
  { semaine: 6, etape: 6, emoji: "🚀", lieu: "Lancer ton projet", intro: "Entreprendre, convaincre, mesurer l'impact. Cap sur le Bac +1 !" },
];

export const jours: Jour[] = [
  /* ===================== SEMAINE 1 · Bien poser le problème ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Détective des problèmes",
    maths: {
      calcul: [
        { q: "x + 2x = 30 → x =", r: "10" },
        { q: "3x − 5 = 16 → x =", r: "7" },
        { q: "15 % de 200 =", r: "30" },
        { q: "12 × 8 =", r: "96" },
        { q: "100 − 37 =", r: "63" },
      ],
      probleme: {
        enonce: "À la cantine, 200 repas/jour, dont 15 % jetés. Pour chiffrer le problème : combien de repas gaspillés par jour ?",
        correction: "15 % de 200 = 30 repas gaspillés par jour. Un problème chiffré est déjà à moitié résolu.",
      },
      illu: { emoji: "🧭", label: "boussole" },
    },
    francais: {
      regleTitre: "Définir le problème",
      regle:
        "Avant de chercher des solutions, on définit précisément le problème — le vrai, pas un symptôme.",
      consigne: "Problème bien posé ou trop vague ?",
      items: ["« Les gens gaspillent. »", "« 30 % des repas de la cantine sont jetés chaque midi. »"],
      correction: "trop vague — bien posé (précis et mesurable).",
    },
    mot: {
      mot: "Modélisation",
      nature: "nom, méthode",
      definition: "Traduire un problème réel en chiffres, équations ou schémas pour le comprendre.",
      exemple: "« 15 % de 200 repas » chiffre le gaspillage.",
    },
    geste: {
      titre: "Les outils de recherche académique",
      texte: "Pour s'informer sérieusement, on utilise des sources fiables : articles, données officielles, publications.",
    },
    defi: {
      enonce: "Reformule en question chiffrée : « il y a trop de déchets ».",
      correction: "Par exemple : « Combien de kg de déchets par personne et par jour ? » Bien poser, c'est mesurer.",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "Explorateur des besoins",
    maths: {
      calcul: [
        { q: "10^3 × 10^3 =", r: "10^6" },
        { q: "365 × 24 =", r: "8760" },
        { q: "60 × 60 =", r: "3600" },
        { q: "1,5 × 365 ≈", r: "550" },
        { q: "2^10 =", r: "1024" },
      ],
      probleme: {
        enonce: "Estimation : combien de litres d'eau bois-tu environ par an ? (≈ 1,5 L/jour × 365)",
        correction: "≈ 550 L par an. Savoir estimer un ordre de grandeur évite de partir dans le faux.",
      },
      illu: { emoji: "❤️", label: "besoin / empathie" },
    },
    francais: {
      regleTitre: "Comprendre les besoins",
      regle:
        "Une bonne solution part du besoin réel des personnes (l'empathie), pas de notre idée préconçue.",
      consigne: "Vrai ou faux : on conçoit mieux en partant de son idée qu'en écoutant les usagers ?",
      items: ["« Les gens veulent un trou, pas une perceuse. »"],
      correction: "Faux : on part du besoin réel (le trou), pas de l'objet (la perceuse).",
    },
    mot: {
      mot: "Ordre de grandeur",
      nature: "expression, maths",
      definition: "Une estimation à la puissance de 10 près, pour cadrer un problème sans tout calculer.",
      exemple: "Boire ≈ 550 L d'eau par an : ordre de grandeur 10^2 à 10^3 L.",
    },
    geste: {
      titre: "Citer et la propriété intellectuelle",
      texte: "On cite ses sources et on respecte le travail des autres : c'est la base de l'honnêteté et de la création.",
    },
    defi: {
      enonce: "Estime le nombre de battements de cœur en une journée (≈ 70/min).",
      correction: "≈ 100 000 (70 × 60 × 24 ≈ 100 800).",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Enquêteur de terrain",
    maths: {
      calcul: [
        { q: "200 + 25 % =", r: "250" },
        { q: "× 1,1 = hausse de", r: "10 %" },
        { q: "1,1² =", r: "1,21" },
        { q: "150 × 2 =", r: "300" },
        { q: "× 0,8 = baisse de", r: "20 %" },
      ],
      probleme: {
        enonce: "Une start-up gagne soit +100 utilisateurs/mois (linéaire), soit +10 %/mois (exponentiel). Lequel grandit le plus vite à long terme ?",
        correction: "L'exponentiel (× 1,1 chaque mois) finit toujours par dépasser le linéaire, et de très loin.",
      },
      illu: { emoji: "🔎", label: "enquête" },
    },
    francais: {
      regleTitre: "Observer et enquêter",
      regle: "On enquête sur le terrain (observer, interroger, mesurer) avant de conclure.",
      consigne: "Vrai ou faux : on peut tout concevoir depuis son bureau ?",
      items: ["Concevoir une solution sans observer les usagers ?"],
      correction: "Faux : observer le réel évite de résoudre un faux problème.",
    },
    mot: {
      mot: "Taux de croissance",
      nature: "expression, maths",
      definition: "Le pourcentage d'augmentation par période ; une croissance en % est exponentielle.",
      exemple: "+10 %/mois = × 1,1 chaque mois.",
    },
    geste: {
      titre: "Le tableur pour modéliser",
      texte: "Un tableur teste des scénarios en un instant : on change une hypothèse, tout se recalcule.",
    },
    defi: {
      enonce: "Un indicateur croît de 10 %/an. En combien d'années double-t-il environ ? (règle des 70)",
      correction: "≈ 7 ans (70 ÷ 10).",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "Esprit logique",
    maths: {
      calcul: [
        { q: "si A → B et A vrai, alors", r: "B" },
        { q: "vrai ET faux =", r: "faux" },
        { q: "vrai OU faux =", r: "vrai" },
        { q: "2^3 =", r: "8" },
        { q: "non (non A) =", r: "A" },
      ],
      probleme: {
        enonce: "« Tous les innovateurs sont curieux. Léa est innovatrice. » Que peut-on conclure logiquement ?",
        correction: "Léa est curieuse (c'est une déduction valide).",
      },
      illu: { emoji: "🧠", label: "logique" },
    },
    francais: {
      regleTitre: "Le raisonnement structuré",
      regle:
        "On argumente avec des faits et une logique claire, en distinguant cause et conséquence.",
      consigne: "Argument solide ou faible ?",
      items: ["« C'est vrai car tout le monde le dit. »", "« Les données montrent une baisse de 20 %. »"],
      correction: "faible (appel à la majorité) — solide (preuve chiffrée).",
    },
    mot: {
      mot: "Raisonnement",
      nature: "nom, méthode",
      definition: "Enchaîner des idées logiquement pour aboutir à une conclusion fiable.",
      exemple: "Si A → B et A est vrai, alors B est vrai.",
    },
    geste: {
      titre: "Bien gérer ses sources / la veille",
      texte: "Suivre régulièrement un sujet (sources fiables) te rend expert et nourrit tes idées.",
    },
    defi: {
      enonce: "« Pas de pluie → sécheresse. » Il y a sécheresse : peut-on conclure qu'il n'a pas plu ?",
      correction: "Non : la sécheresse peut avoir d'autres causes. La réciproque d'une implication n'est pas toujours vraie.",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Synthétiseur",
    maths: {
      calcul: [
        { q: "(10 + 20 + 30) ÷ 3 =", r: "20" },
        { q: "médiane de 4, 7, 9 =", r: "7" },
        { q: "350 / 500 =", r: "70 %" },
        { q: "8 × 9 =", r: "72" },
        { q: "1/4 de 80 =", r: "20" },
      ],
      probleme: {
        enonce: "Sur 500 réponses à un sondage, 350 sont « oui ». Quel pourcentage de « oui » ?",
        correction: "350 / 500 = 0,70 = 70 %.",
      },
      illu: { emoji: "🗂️", label: "synthèse" },
    },
    francais: {
      regleTitre: "Synthétiser l'information",
      regle: "Trier l'essentiel, écarter le bruit, résumer en quelques points clairs.",
      consigne: "Vrai ou faux : plus c'est long, mieux c'est ?",
      items: ["Un bon résumé est-il forcément long ?"],
      correction: "Faux : la clarté et la concision valent mieux que la longueur.",
    },
    mot: {
      mot: "Donnée",
      nature: "nom, méthode",
      definition: "Une information mesurée qui, bien analysée, éclaire une décision.",
      exemple: "350 « oui » sur 500 réponses = 70 %.",
    },
    geste: {
      titre: "La data visualisation",
      texte: "Un bon graphique fait comprendre une idée en un coup d'œil — à condition de ne pas tromper.",
    },
    defi: {
      enonce: "Une moyenne peut-elle cacher de grandes différences ? Donne un exemple.",
      correction: "Oui : 0 € et 200 € donnent une moyenne de 100 €, comme 100 € et 100 €. La moyenne masque la dispersion.",
    },
  },

  /* ===================== SEMAINE 2 · Modéliser et comprendre ===================== */
  {
    numero: 6,
    semaine: 2,
    badge: "Modélisateur",
    maths: {
      calcul: [
        { q: "dérivée de x² =", r: "2x" },
        { q: "f'(3) pour f(x) = x² =", r: "6" },
        { q: "dérivée de 3x =", r: "3" },
        { q: "2 × 5 =", r: "10" },
        { q: "7 × 8 =", r: "56" },
      ],
      probleme: {
        enonce: "La position d'un drone est p(t) = t² (m). Sa vitesse est la dérivée p'(t) = 2t. Quelle vitesse à t = 5 s ?",
        correction: "p'(5) = 2 × 5 = 10 m/s. La dérivée mesure la vitesse de variation.",
      },
      illu: { emoji: "📐", label: "modèle" },
    },
    francais: {
      regleTitre: "Modéliser une situation",
      regle:
        "Un modèle simplifie le réel pour le comprendre et le prévoir (équation, schéma, simulation).",
      consigne: "Quel modèle pour…",
      items: ["la croissance d'utilisateurs", "la position d'un drone qui accélère"],
      correction: "fonction exponentielle (ou affine) — fonction du temps (ici t²).",
    },
    mot: {
      mot: "Dérivée",
      nature: "nom, maths",
      definition: "La dérivée mesure la vitesse de variation d'une grandeur (vitesse, croissance, pente).",
      exemple: "Position t² → vitesse 2t.",
    },
    geste: {
      titre: "Le no-code (créer sans coder)",
      texte: "Des outils permettent de créer une appli ou un site sans programmer : idéal pour prototyper vite.",
    },
    defi: {
      enonce: "Que mesure la dérivée d'une fonction ?",
      correction: "La vitesse de variation : le taux de changement instantané.",
    },
  },
  {
    numero: 7,
    semaine: 2,
    badge: "Stratège des contraintes",
    maths: {
      calcul: [
        { q: "x(20 − x) maximal pour x =", r: "10" },
        { q: "10 × 10 =", r: "100" },
        { q: "périmètre 40 → aire carré max =", r: "100" },
        { q: "5 × 5 =", r: "25" },
        { q: "dérivée nulle →", r: "extremum" },
      ],
      probleme: {
        enonce: "Avec une ressource fixe, on veut maximiser l'effet. Deux nombres de somme 20 : quel produit maximal ?",
        correction: "100 (10 et 10). Le maximum est « au milieu » — c'est l'idée de l'optimisation.",
      },
      illu: { emoji: "⚖️", label: "contraintes" },
    },
    francais: {
      regleTitre: "Décider sous contrainte",
      regle:
        "On choisit en tenant compte des contraintes (budget, temps, ressources) : optimiser, pas tout vouloir.",
      consigne: "Quelle contrainte ?",
      items: ["« On n'a que 1000 €. »", "« Il reste 2 semaines. »"],
      correction: "budget — temps.",
    },
    mot: {
      mot: "Optimisation",
      nature: "nom, maths",
      definition: "Trouver la meilleure solution (max ou min) en respectant des contraintes.",
      exemple: "Produit maximal de deux nombres de somme 20 : 100.",
    },
    geste: {
      titre: "Coder pour prototyper (Python)",
      texte: "Quelques lignes de Python suffisent à tester une idée, simuler, ou automatiser une tâche.",
    },
    defi: {
      enonce: "Deux nombres de somme 30 : quel produit maximal ?",
      correction: "225 (15 et 15).",
    },
  },
  {
    numero: 8,
    semaine: 2,
    badge: "Visionnaire des scénarios",
    maths: {
      calcul: [
        { q: "e^0 =", r: "1" },
        { q: "ln(1) =", r: "0" },
        { q: "2^5 =", r: "32" },
        { q: "ln(e) =", r: "1" },
        { q: "10^3 =", r: "1000" },
      ],
      probleme: {
        enonce: "Une technologie double ses capacités tous les 2 ans (loi de Moore). En 10 ans, par combien est-elle multipliée ?",
        correction: "2^5 = 32 (cinq doublements en 10 ans). La croissance exponentielle est spectaculaire.",
      },
      illu: { emoji: "🔮", label: "scénarios" },
    },
    francais: {
      regleTitre: "Anticiper (scénarios)",
      regle:
        "On imagine plusieurs scénarios (optimiste, réaliste, pessimiste) pour ne pas être pris au dépourvu.",
      consigne: "Scénario optimiste ou pessimiste ?",
      items: ["« Tout marche du premier coup. »", "« Le serveur tombe le jour du lancement. »"],
      correction: "optimiste — pessimiste.",
    },
    mot: {
      mot: "Croissance exponentielle",
      nature: "expression, maths",
      definition: "Une grandeur multipliée par un même facteur à chaque période : lente au début, puis explosive.",
      exemple: "Doubler tous les 2 ans : ×32 en 10 ans.",
    },
    geste: {
      titre: "Les bases de données",
      texte: "Une base de données range et relie d'énormes quantités d'informations, qu'on interroge à la demande.",
    },
    defi: {
      enonce: "Combien de doublements pour multiplier par environ 1000 ?",
      correction: "≈ 10 (2^10 = 1024).",
    },
  },
  {
    numero: 9,
    semaine: 2,
    badge: "Gardien des risques",
    maths: {
      calcul: [
        { q: "P(succès) = 0,7 → P(échec) =", r: "0,3" },
        { q: "0,4 × 0,4 =", r: "0,16" },
        { q: "1 − 0,16 =", r: "0,84" },
        { q: "P(2 piles) =", r: "1/4" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "Un projet réussit avec p = 0,6. Si on lance 2 projets indépendants, quelle probabilité qu'au moins un réussisse ?",
        correction: "1 − (0,4 × 0,4) = 1 − 0,16 = 0,84, soit 84 %.",
      },
      illu: { emoji: "⚠️", label: "risque" },
    },
    francais: {
      regleTitre: "Évaluer les risques",
      regle:
        "Un risque se mesure par sa probabilité ET sa gravité. On traite d'abord les plus graves et probables.",
      consigne: "Priorité haute ou basse ?",
      items: ["panne probable et grave", "bug rare et sans conséquence"],
      correction: "haute — basse.",
    },
    mot: {
      mot: "Probabilité",
      nature: "nom, maths",
      definition: "Mesure de la chance qu'un événement se produise, entre 0 et 1.",
      exemple: "Au moins un succès sur deux projets à 60 % : 0,84.",
    },
    geste: {
      titre: "L'open source et la collaboration",
      texte: "Beaucoup d'outils sont gratuits et ouverts : on peut les utiliser, les améliorer et partager en retour.",
    },
    defi: {
      enonce: "Lancer plusieurs projets augmente-t-il les chances qu'au moins un réussisse ? Pourquoi ?",
      correction: "Oui : la probabilité qu'au moins un réussisse augmente (on diversifie le risque).",
    },
  },
  {
    numero: 10,
    semaine: 2,
    badge: "Lecteur de données",
    maths: {
      calcul: [
        { q: "1000 × 1/6 ≈", r: "167" },
        { q: "grand échantillon →", r: "plus fiable" },
        { q: "1/2 de 500 =", r: "250" },
        { q: "9 × 9 =", r: "81" },
        { q: "60 % de 500 =", r: "300" },
      ],
      probleme: {
        enonce: "Pour tester une appli, vaut-il mieux 5 ou 500 utilisateurs testeurs ? Pourquoi ?",
        correction: "500 : plus l'échantillon est grand, plus les résultats sont fiables et représentatifs.",
      },
      illu: { emoji: "📊", label: "données" },
    },
    francais: {
      regleTitre: "Lire les données avec esprit critique",
      regle:
        "On se méfie des graphiques trompeurs, des moyennes qui cachent tout, et de la confusion corrélation/causalité.",
      consigne: "Fiable ou trompeur ?",
      items: ["un graphique dont l'axe ne part pas de 0", "des données sourcées et complètes"],
      correction: "trompeur — fiable.",
    },
    mot: {
      mot: "Échantillon",
      nature: "nom, maths",
      definition: "Un sous-groupe étudié pour estimer un comportement plus large ; plus il est grand, plus il est fiable.",
      exemple: "500 testeurs valent mieux que 5.",
    },
    geste: {
      titre: "Le versioning (Git)",
      texte: "Garder l'historique de toutes les versions d'un projet permet de revenir en arrière et de travailler à plusieurs.",
    },
    defi: {
      enonce: "Pourquoi un sondage sur 10 amis est-il peu fiable ?",
      correction: "Échantillon trop petit et non représentatif : forte marge d'erreur et biais.",
    },
  },

  /* ===================== SEMAINE 3 · Imaginer des solutions ===================== */
  {
    numero: 11,
    semaine: 3,
    badge: "Générateur d'idées",
    maths: {
      calcul: [
        { q: "3! =", r: "6" },
        { q: "4! =", r: "24" },
        { q: "5 × 4 =", r: "20" },
        { q: "3 × 2 × 1 =", r: "6" },
        { q: "2^4 =", r: "16" },
      ],
      probleme: {
        enonce: "Avec 4 fonctionnalités, combien d'ordres possibles pour les développer (4!) ?",
        correction: "24 ordres (4 × 3 × 2 × 1).",
      },
      illu: { emoji: "💭", label: "idées" },
    },
    francais: {
      regleTitre: "Brainstormer (générer des idées)",
      regle: "On génère beaucoup d'idées sans juger (la quantité d'abord), puis on trie.",
      consigne: "Phase de divergence ou de tri ?",
      items: ["« Notez TOUTES les idées, même folles. »", "« Gardons les 3 meilleures. »"],
      correction: "divergence — tri (convergence).",
    },
    mot: {
      mot: "Combinatoire",
      nature: "nom, maths",
      definition: "L'art de compter les possibilités (ordres, choix, combinaisons).",
      exemple: "4 éléments à ordonner : 4! = 24 façons.",
    },
    geste: {
      titre: "L'IA générative comme assistant",
      texte: "Une IA aide à explorer des idées et des pistes — on vérifie, on trie, et on crée avec, sans copier.",
    },
    defi: {
      enonce: "Combien de façons de classer 3 idées par priorité ?",
      correction: "6 (3!).",
    },
  },
  {
    numero: 12,
    semaine: 3,
    badge: "Penseur latéral",
    maths: {
      calcul: [
        { q: "2^3 (oui/non sur 3 options) =", r: "8" },
        { q: "paires parmi 3 (AB, AC, BC) =", r: "3" },
        { q: "10 × 10 =", r: "100" },
        { q: "choisir 2 parmi 4 =", r: "6" },
        { q: "5 + 5 =", r: "10" },
      ],
      probleme: {
        enonce: "5 personnes génèrent chacune 8 idées. Combien d'idées au total ? Puis que fait-on (diverger puis… ) ?",
        correction: "40 idées générées. Ensuite on converge : on trie et on garde les meilleures.",
      },
      illu: { emoji: "🔄", label: "pensée latérale" },
    },
    francais: {
      regleTitre: "Penser autrement (pensée latérale)",
      regle:
        "On contourne les évidences : et si on inversait le problème ? Et si la contrainte devenait une force ?",
      consigne: "Idée classique ou latérale ?",
      items: ["« faire payer l'utilisateur »", "« le rendre gratuit et se financer autrement »"],
      correction: "classique — latérale.",
    },
    mot: {
      mot: "Pensée divergente",
      nature: "expression, méthode",
      definition: "Produire de nombreuses idées variées, sans se brider, avant de sélectionner.",
      exemple: "40 idées d'abord, le tri ensuite.",
    },
    geste: {
      titre: "Vérifier et fact-checker l'IA",
      texte: "Une IA peut inventer du faux : on recoupe systématiquement ses réponses avec des sources fiables.",
    },
    defi: {
      enonce: "Avec 3 ingrédients A, B, C, combien de paires différentes ?",
      correction: "3 (AB, AC, BC).",
    },
  },
  {
    numero: 13,
    semaine: 3,
    badge: "Bâtisseur de ponts",
    maths: {
      calcul: [
        { q: "5 personnes, poignées de main = 5×4/2 =", r: "10" },
        { q: "6 × 5 / 2 =", r: "15" },
        { q: "n liens : n(n−1)/2", r: "oui" },
        { q: "4 × 3 / 2 =", r: "6" },
        { q: "7 × 8 =", r: "56" },
      ],
      probleme: {
        enonce: "Dans un réseau de 6 personnes toutes connectées, combien de liens (connexions) en tout ?",
        correction: "6 × 5 / 2 = 15. (Chaque lien relie 2 personnes, d'où la division par 2.)",
      },
      illu: { emoji: "🌉", label: "réseau" },
    },
    francais: {
      regleTitre: "Relier des domaines",
      regle:
        "Les meilleures innovations relient des domaines éloignés (la nature inspire la technique : le biomimétisme).",
      consigne: "Quel croisement ?",
      items: ["s'inspirer du vol des oiseaux pour concevoir un avion"],
      correction: "biologie + ingénierie (biomimétisme).",
    },
    mot: {
      mot: "Graphe (réseau)",
      nature: "nom, maths",
      definition: "Des points (sommets) reliés par des liens (arêtes) : modèle des réseaux, du web, des transports.",
      exemple: "Réseau de 6 personnes : 15 liens possibles.",
    },
    geste: {
      titre: "Le prototypage (Figma, maquette)",
      texte: "On dessine une maquette de l'idée (écrans, parcours) avant de la construire : moins cher, plus rapide à corriger.",
    },
    defi: {
      enonce: "Combien de liens dans un réseau de 4 personnes toutes connectées ?",
      correction: "6 (4 × 3 / 2).",
    },
  },
  {
    numero: 14,
    semaine: 3,
    badge: "Découpeur de complexité",
    maths: {
      calcul: [
        { q: "2^10 ≈", r: "1000" },
        { q: "dichotomie : couper en 2 à chaque fois", r: "oui" },
        { q: "log2(1024) =", r: "10" },
        { q: "2^4 =", r: "16" },
        { q: "10 × 10 =", r: "100" },
      ],
      probleme: {
        enonce: "Pour trouver un mot dans un dico de 1000 pages : page par page, ou couper en deux à chaque fois (dichotomie) ? Combien d'étapes par dichotomie ?",
        correction: "Environ 10 étapes (2^10 ≈ 1000), bien plus rapide que 1000 ! C'est la puissance de l'algorithme.",
      },
      illu: { emoji: "🧩", label: "décomposer" },
    },
    francais: {
      regleTitre: "Décomposer un problème complexe",
      regle: "On découpe un gros problème en sous-problèmes plus simples (diviser pour résoudre).",
      consigne: "Vrai ou faux : un gros problème se résout d'un seul bloc ?",
      items: ["Attaquer un projet géant d'un coup ?"],
      correction: "Faux : on le découpe en étapes gérables.",
    },
    mot: {
      mot: "Algorithme",
      nature: "nom, maths",
      definition: "Une suite d'instructions précises pour résoudre un problème de façon sûre et efficace.",
      exemple: "La dichotomie trouve un élément dans 1000 en ~10 étapes.",
    },
    geste: {
      titre: "Tester avec des utilisateurs",
      texte: "On observe de vrais usagers utiliser le prototype : leurs blocages révèlent ce qu'il faut corriger.",
    },
    defi: {
      enonce: "Chercher par dichotomie dans 1024 éléments triés : combien d'étapes au maximum ?",
      correction: "10 (log base 2 de 1024).",
    },
  },
  {
    numero: 15,
    semaine: 3,
    badge: "Architecte de solutions",
    maths: {
      calcul: [
        { q: "tableau 3 lignes × 4 colonnes =", r: "12 cases" },
        { q: "matrice 2 × 2 =", r: "4 nombres" },
        { q: "5 × 5 =", r: "25 cases" },
        { q: "5 × 6 =", r: "30" },
        { q: "8 × 8 =", r: "64" },
      ],
      probleme: {
        enonce: "Un tableau de données a 3 produits (lignes) et 4 mois (colonnes). Combien de cases (valeurs) ?",
        correction: "3 × 4 = 12 cases.",
      },
      illu: { emoji: "🏗️", label: "structurer" },
    },
    francais: {
      regleTitre: "Structurer une solution",
      regle: "Une solution claire a un objectif, des étapes, des moyens et un résultat attendu.",
      consigne: "Quel élément manque souvent ?",
      items: ["une idée sans étapes ni mesure du résultat"],
      correction: "les étapes concrètes et la mesure du résultat.",
    },
    mot: {
      mot: "Matrice (tableau)",
      nature: "nom, maths",
      definition: "Un tableau de nombres rangés en lignes et colonnes ; base de l'algèbre, des données et de l'IA.",
      exemple: "3 lignes × 4 colonnes = 12 valeurs.",
    },
    geste: {
      titre: "La gestion de projet (agile)",
      texte: "On avance par petits cycles courts, en livrant souvent et en s'adaptant aux retours.",
    },
    defi: {
      enonce: "Une matrice 5 × 5 contient combien de nombres ?",
      correction: "25.",
    },
  },

  /* ===================== SEMAINE 4 · Prototyper et tester ===================== */
  {
    numero: 16,
    semaine: 4,
    badge: "Prototypeur express",
    maths: {
      calcul: [
        { q: "80 ÷ 2 =", r: "40" },
        { q: "40 ÷ 2 =", r: "20" },
        { q: "20 ÷ 2 =", r: "10" },
        { q: "100 ÷ 2 ÷ 2 =", r: "25" },
        { q: "2^5 =", r: "32" },
      ],
      probleme: {
        enonce: "Chaque nouvelle version du prototype réduit l'erreur de moitié. L'erreur initiale est 80. Combien après 3 versions ?",
        correction: "80 → 40 → 20 → 10. L'erreur vaut 10 après 3 itérations.",
      },
      illu: { emoji: "🛠️", label: "prototype" },
    },
    francais: {
      regleTitre: "Prototyper vite (le MVP)",
      regle:
        "Le MVP (produit minimum viable) est la version la plus simple qui permet de tester l'idée auprès des vrais usagers.",
      consigne: "MVP ou produit final ?",
      items: ["une maquette en carton testée en 1 jour", "un produit « parfait » après 2 ans"],
      correction: "MVP — produit final (trop tard pour apprendre).",
    },
    mot: {
      mot: "Itération",
      nature: "nom, méthode",
      definition: "Répéter un cycle (tester, mesurer, corriger) pour s'améliorer pas à pas.",
      exemple: "Erreur divisée par 2 à chaque version.",
    },
    geste: {
      titre: "Le cloud et les outils collaboratifs",
      texte: "Documents partagés, sauvegarde en ligne : on travaille à plusieurs, partout, sans rien perdre.",
    },
    defi: {
      enonce: "Erreur 100, divisée par 2 à chaque essai. Après 4 essais ?",
      correction: "6,25.",
    },
  },
  {
    numero: 17,
    semaine: 4,
    badge: "Testeur d'hypothèses",
    maths: {
      calcul: [
        { q: "1000 × 1/6 ≈", r: "167" },
        { q: "simuler = imiter le hasard", r: "oui" },
        { q: "600 × 1/6 =", r: "100" },
        { q: "6 × 6 =", r: "36" },
        { q: "plus d'essais →", r: "plus précis" },
      ],
      probleme: {
        enonce: "Sans formule, on peut SIMULER : lancer 1000 fois et compter. Sur 1000 lancers d'un dé, combien de 6 environ ?",
        correction: "Environ 167 (1000 × 1/6). Simuler beaucoup donne une bonne estimation (méthode de Monte Carlo).",
      },
      illu: { emoji: "🧪", label: "test / simulation" },
    },
    francais: {
      regleTitre: "Tester une hypothèse",
      regle: "On formule une hypothèse (« si… alors… ») et on la teste par une expérience mesurable.",
      consigne: "Hypothèse testable ?",
      items: ["« Si je simplifie le formulaire, plus de gens s'inscriront. »"],
      correction: "Oui : testable, on mesure les inscriptions avant / après.",
    },
    mot: {
      mot: "Simulation",
      nature: "nom, maths",
      definition: "Imiter un phénomène (souvent avec du hasard) pour l'étudier sans formule, grâce à de nombreux essais.",
      exemple: "1000 lancers simulés ≈ 167 « 6 ».",
    },
    geste: {
      titre: "Présenter avec un diaporama efficace",
      texte: "Une idée par diapo, des visuels forts, peu de texte : le diaporama soutient ta parole, il ne la remplace pas.",
    },
    defi: {
      enonce: "Pourquoi simuler 10 000 fois plutôt que 10 ?",
      correction: "Plus d'essais = estimation plus précise (loi des grands nombres).",
    },
  },
  {
    numero: 18,
    semaine: 4,
    badge: "Apprenti de l'échec",
    maths: {
      calcul: [
        { q: "|3 − 5| =", r: "2" },
        { q: "20 / 200 =", r: "10 %" },
        { q: "erreur relative = erreur / valeur", r: "oui" },
        { q: "10 % de 50 =", r: "5" },
        { q: "8 × 7 =", r: "56" },
      ],
      probleme: {
        enonce: "On prévoit 220, la vraie valeur est 200. Quelle est l'erreur, et l'erreur en pourcentage (relative) ?",
        correction: "Erreur = 20 ; erreur relative = 20 / 200 = 10 %.",
      },
      illu: { emoji: "🔁", label: "apprendre de l'échec" },
    },
    francais: {
      regleTitre: "Apprendre de l'échec",
      regle:
        "Échouer vite et pas cher fait partie de l'innovation : chaque échec enseigne quelque chose.",
      consigne: "Bonne ou mauvaise attitude ?",
      items: ["cacher ses erreurs", "analyser pourquoi ça a échoué"],
      correction: "mauvaise — bonne.",
    },
    mot: {
      mot: "Erreur relative",
      nature: "expression, maths",
      definition: "L'écart rapporté à la valeur (en %), pour juger si une erreur est grande ou négligeable.",
      exemple: "Erreur de 20 sur 200 : 10 %.",
    },
    geste: {
      titre: "La cybersécurité de base",
      texte: "Mots de passe forts, double authentification, méfiance des pièges : on protège son projet et ses données.",
    },
    defi: {
      enonce: "Prévu 105, réel 100 : erreur relative ?",
      correction: "5 %.",
    },
  },
  {
    numero: 19,
    semaine: 4,
    badge: "Maître de l'itération",
    maths: {
      calcul: [
        { q: "bénéfice = recettes − coûts", r: "oui" },
        { q: "1000 − 800 =", r: "200" },
        { q: "200 / 800 =", r: "25 %" },
        { q: "650 − 500 =", r: "150" },
        { q: "10 × 10 =", r: "100" },
      ],
      probleme: {
        enonce: "Un projet coûte 800 € et rapporte 1000 €. Quel est le bénéfice, et le retour sur investissement (bénéfice ÷ coût) ?",
        correction: "Bénéfice = 200 € ; ROI = 200 / 800 = 25 %.",
      },
      illu: { emoji: "⚙️", label: "itérer" },
    },
    francais: {
      regleTitre: "Itérer et améliorer",
      regle: "On améliore par petites boucles : tester, mesurer, corriger, recommencer.",
      consigne: "Vrai ou faux : la 1re version doit être parfaite ?",
      items: ["Viser la perfection dès la version 1 ?"],
      correction: "Faux : on améliore version après version.",
    },
    mot: {
      mot: "ROI (retour sur investissement)",
      nature: "expression, méthode",
      definition: "Le gain rapporté au coût : dit si un projet « vaut le coup ».",
      exemple: "Bénéfice 200 € pour 800 € investis : ROI 25 %.",
    },
    geste: {
      titre: "Protéger ses données et son projet",
      texte: "Sauvegardes, droits d'accès, confidentialité : on protège son travail et celui des utilisateurs.",
    },
    defi: {
      enonce: "Coût 500, recettes 650. Quel bénéfice ?",
      correction: "150.",
    },
  },
  {
    numero: 20,
    semaine: 4,
    badge: "Passeur à l'échelle",
    maths: {
      calcul: [
        { q: "100 → 1 000 000 : facteur =", r: "10 000" },
        { q: "10^2 × 10^4 =", r: "10^6" },
        { q: "1000 × 1000 =", r: "10^6" },
        { q: "10^6 ÷ 10^2 =", r: "10^4" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "Une appli marche pour 100 utilisateurs. Pour passer à 1 000 000, par combien faut-il multiplier ?",
        correction: "× 10 000. Passer à l'échelle oblige souvent à repenser toute l'architecture (scalabilité).",
      },
      illu: { emoji: "📈", label: "passage à l'échelle" },
    },
    francais: {
      regleTitre: "Passer à l'échelle",
      regle:
        "Une solution qui marche pour 10 personnes doit être repensée pour en servir des millions (technique, coûts, organisation).",
      consigne: "Question de scalabilité ?",
      items: ["« Comment servir 1 million d'usagers sans tout casser ? »"],
      correction: "Oui : c'est l'enjeu du passage à l'échelle.",
    },
    mot: {
      mot: "Scalabilité",
      nature: "nom, méthode",
      definition: "La capacité d'une solution à grandir (beaucoup plus d'usagers) sans s'effondrer.",
      exemple: "Passer de 100 à 1 000 000 d'utilisateurs.",
    },
    geste: {
      titre: "Mesurer avec des capteurs (IoT)",
      texte: "Des objets connectés mesurent le réel (température, énergie, eau) et alimentent les modèles en données.",
    },
    defi: {
      enonce: "De 1 000 à 1 000 000 d'utilisateurs : quel facteur de multiplication ?",
      correction: "× 1000.",
    },
  },

  /* ===================== SEMAINE 5 · Les grands défis du monde ===================== */
  {
    numero: 21,
    semaine: 5,
    badge: "Ami de la planète",
    maths: {
      calcul: [
        { q: "1000 W pendant 1 h =", r: "1 kWh" },
        { q: "300 × 5 =", r: "1500" },
        { q: "20 × 50 =", r: "1000" },
        { q: "10000 ÷ 400 =", r: "25" },
        { q: "10 × 10 =", r: "100" },
      ],
      probleme: {
        enonce: "Un panneau solaire produit 300 W. En 5 heures de soleil, quelle énergie (en Wh) ?",
        correction: "300 × 5 = 1500 Wh = 1,5 kWh.",
      },
      illu: { emoji: "⚡", label: "énergie" },
    },
    francais: {
      regleTitre: "Comprendre un enjeu mondial",
      regle:
        "Les grands défis (climat, eau, santé) se comprennent avec des chiffres et des systèmes, pas des slogans.",
      consigne: "Slogan ou analyse ?",
      items: ["« Sauvons la planète ! »", "« Réduire de 2 t à 1 t de CO2 par personne et par an »"],
      correction: "slogan — analyse chiffrée.",
    },
    mot: {
      mot: "Rendement (énergie)",
      nature: "nom, sciences",
      definition: "L'énergie utile produite ; le kWh est l'unité d'énergie (1000 W pendant 1 h).",
      exemple: "300 W × 5 h = 1,5 kWh.",
    },
    geste: {
      titre: "Les données ouvertes (open data)",
      texte: "Des données publiques gratuites (énergie, transport, santé) permettent de bâtir des solutions utiles.",
    },
    defi: {
      enonce: "Une maison consomme 10 000 kWh/an ; un panneau produit 400 kWh/an. Combien de panneaux pour couvrir la conso ?",
      correction: "25 panneaux.",
    },
  },
  {
    numero: 22,
    semaine: 5,
    badge: "Compteur de carbone",
    maths: {
      calcul: [
        { q: "6 × 2,3 =", r: "13,8" },
        { q: "1000 kg =", r: "1 tonne" },
        { q: "2,3 × 10 =", r: "23" },
        { q: "1000 / 500 =", r: "2" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "Une voiture émet ≈ 2,3 kg de CO2 par litre d'essence et consomme 6 L pour 100 km. Combien de CO2 pour 100 km ?",
        correction: "6 × 2,3 = 13,8 kg de CO2 pour 100 km.",
      },
      illu: { emoji: "🌱", label: "bilan carbone" },
    },
    francais: {
      regleTitre: "Mesurer l'impact environnemental",
      regle: "On chiffre l'empreinte (CO2, eau, déchets) pour comparer et améliorer.",
      consigne: "Mesurable ou flou ?",
      items: ["« c'est écolo »", "« −30 % de CO2 par produit »"],
      correction: "flou — mesurable.",
    },
    mot: {
      mot: "Bilan carbone",
      nature: "expression, sciences",
      definition: "La quantité de CO2 émise par une activité, pour la comparer et la réduire.",
      exemple: "100 km en voiture ≈ 13,8 kg de CO2.",
    },
    geste: {
      titre: "L'éthique de la tech",
      texte: "Une technologie n'est jamais neutre : on se demande qui elle aide, qui elle peut nuire, et comment l'encadrer.",
    },
    defi: {
      enonce: "10 L d'essence : combien de kg de CO2 (≈ 2,3/L) ?",
      correction: "23 kg.",
    },
  },
  {
    numero: 23,
    semaine: 5,
    badge: "Stratège de la santé",
    maths: {
      calcul: [
        { q: "R0 = 2 → 1, 2, 4, 8…", r: "double" },
        { q: "2^5 =", r: "32" },
        { q: "R0 < 1 →", r: "s'éteint" },
        { q: "2^4 =", r: "16" },
        { q: "1+2+4+8 =", r: "15" },
      ],
      probleme: {
        enonce: "Une maladie a R0 = 2 (chaque malade en contamine 2). À partir de 1, combien de nouveaux cas à la 5e génération (2^5) ?",
        correction: "2^5 = 32. Si R0 < 1, l'épidémie décroît et s'éteint.",
      },
      illu: { emoji: "🩺", label: "santé" },
    },
    francais: {
      regleTitre: "Communiquer une idée complexe",
      regle: "On explique simplement, avec une image ou un exemple, pour être compris de tous.",
      consigne: "Clair ou jargon ?",
      items: ["« optimisation multi-objectif sous contraintes »", "« faire mieux avec moins, sans tout casser »"],
      correction: "jargon — clair.",
    },
    mot: {
      mot: "Taux de reproduction (R0)",
      nature: "expression, sciences",
      definition: "Le nombre moyen de personnes contaminées par un malade ; R0 > 1 → épidémie, R0 < 1 → extinction.",
      exemple: "R0 = 2 : 1 → 2 → 4 → 8…",
    },
    geste: {
      titre: "Le numérique responsable (écologie)",
      texte: "Stockage, streaming, IA consomment de l'énergie : on conçoit des solutions sobres et utiles.",
    },
    defi: {
      enonce: "Pourquoi les masques et vaccins visent-ils à rendre R0 < 1 ?",
      correction: "Pour que l'épidémie décroisse au lieu de croître.",
    },
  },
  {
    numero: 24,
    semaine: 5,
    badge: "Gardien de l'eau",
    maths: {
      calcul: [
        { q: "150 × 4 =", r: "600" },
        { q: "20 % de 600 =", r: "120" },
        { q: "600 × 365 ≈", r: "219000" },
        { q: "150 × 365 ≈", r: "54750" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "Une famille de 4 consomme 150 L/personne/jour. Combien de litres d'eau par jour ?",
        correction: "150 × 4 = 600 L/jour.",
      },
      illu: { emoji: "💧", label: "eau" },
    },
    francais: {
      regleTitre: "Convaincre et mobiliser",
      regle:
        "On convainc par la raison (faits, chiffres) ET on mobilise par l'émotion (une vision, un récit).",
      consigne: "Raison ou émotion ?",
      items: ["« les données prouvent que… »", "« imaginez un monde où… »"],
      correction: "raison — émotion.",
    },
    mot: {
      mot: "Gestion des ressources",
      nature: "expression, méthode",
      definition: "Chiffrer une consommation pour la réduire et la partager équitablement.",
      exemple: "Famille de 4 : 600 L d'eau/jour.",
    },
    geste: {
      titre: "Construire son réseau pro (LinkedIn)",
      texte: "Un réseau de contacts (mentors, pairs) aide à apprendre, trouver des stages et porter ses projets.",
    },
    defi: {
      enonce: "Réduire de 20 % une conso de 600 L : combien d'économisé par jour ?",
      correction: "120 L.",
    },
  },
  {
    numero: 25,
    semaine: 5,
    badge: "Explorateur de l'espace",
    maths: {
      calcul: [
        { q: "20000 × 10 =", r: "200000" },
        { q: "300000 × 60 =", r: "18000000" },
        { q: "50000 × 24 =", r: "1200000" },
        { q: "3 × 10^8 (m/s) =", r: "vitesse lumière" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "Une sonde voyage à 20 000 km/h. Quelle distance parcourt-elle en 10 h ?",
        correction: "20 000 × 10 = 200 000 km.",
      },
      illu: { emoji: "🚀", label: "espace" },
    },
    francais: {
      regleTitre: "Travailler en équipe",
      regle: "Une équipe complémentaire (profils variés) va plus loin qu'un génie solitaire.",
      consigne: "Vrai ou faux : mieux vaut tout faire seul ?",
      items: ["Innover seul dans son coin ?"],
      correction: "Faux : la diversité des compétences est une force.",
    },
    mot: {
      mot: "Modèle physique",
      nature: "expression, sciences",
      definition: "Des équations (vitesse, distance, énergie) qui prévoient le comportement du réel.",
      exemple: "Distance = vitesse × temps.",
    },
    geste: {
      titre: "Le financement participatif / les aides",
      texte: "Un projet peut être financé par beaucoup de soutiens (crowdfunding) ou par des aides et concours.",
    },
    defi: {
      enonce: "À 50 000 km/h, quelle distance en 24 h ?",
      correction: "1 200 000 km.",
    },
  },

  /* ===================== SEMAINE 6 · Lancer ton projet ===================== */
  {
    numero: 26,
    semaine: 6,
    badge: "Bâtisseur de modèles",
    maths: {
      calcul: [
        { q: "15 − 5 (marge) =", r: "10" },
        { q: "1000 ÷ 10 =", r: "100" },
        { q: "seuil = coûts fixes ÷ marge", r: "oui" },
        { q: "2000 ÷ 20 =", r: "100" },
        { q: "10 × 10 =", r: "100" },
      ],
      probleme: {
        enonce: "Tu vends un produit 15 €, qui coûte 5 € à fabriquer. Marge par unité ? Avec 1000 € de coûts fixes, combien d'unités pour atteindre l'équilibre (seuil de rentabilité) ?",
        correction: "Marge = 10 € ; seuil = 1000 ÷ 10 = 100 unités.",
      },
      illu: { emoji: "💼", label: "modèle économique" },
    },
    francais: {
      regleTitre: "Construire un modèle économique",
      regle:
        "Un projet dure s'il est viable : qui paie, combien, pour quel coût ? (le seuil de rentabilité)",
      consigne: "Quel élément du modèle ?",
      items: ["« qui sont les clients ? »", "« quel est le coût par unité ? »"],
      correction: "les revenus (clients) — les coûts.",
    },
    mot: {
      mot: "Seuil de rentabilité",
      nature: "expression, méthode",
      definition: "Le nombre de ventes à partir duquel un projet ne perd plus d'argent (coûts fixes ÷ marge).",
      exemple: "Coûts fixes 1000 €, marge 10 € : seuil 100 unités.",
    },
    geste: {
      titre: "Le pitch deck",
      texte: "Une présentation courte (problème, solution, marché, équipe, chiffres) pour convaincre un soutien.",
    },
    defi: {
      enonce: "Marge 5 €/unité, coûts fixes 500 € : quel seuil de rentabilité ?",
      correction: "100 unités.",
    },
  },
  {
    numero: 27,
    semaine: 6,
    badge: "Financier malin",
    maths: {
      calcul: [
        { q: "1000 × 1,05 =", r: "1050" },
        { q: "1,05² =", r: "1,1025" },
        { q: "100 × 1,1 =", r: "110" },
        { q: "70 ÷ 7 =", r: "10" },
        { q: "8 × 9 =", r: "72" },
      ],
      probleme: {
        enonce: "Tu places 1000 € à 5 %/an pour financer ton projet dans 2 ans. Combien auras-tu (intérêts composés) ?",
        correction: "1000 × 1,05 × 1,05 = 1102,50 €.",
      },
      illu: { emoji: "💰", label: "financement" },
    },
    francais: {
      regleTitre: "Pitcher son projet",
      regle:
        "Un pitch dit en 1 minute : le problème, la solution, pour qui, et pourquoi toi / maintenant.",
      consigne: "Bon pitch ou mauvais ?",
      items: ["« voici 40 slides techniques »", "« un problème, une solution, un chiffre clé »"],
      correction: "mauvais — bon.",
    },
    mot: {
      mot: "Intérêts composés",
      nature: "expression, maths",
      definition: "Les intérêts s'ajoutent au capital et produisent à leur tour des intérêts.",
      exemple: "1000 € à 5 % sur 2 ans : 1102,50 €.",
    },
    geste: {
      titre: "Les indicateurs (dashboard)",
      texte: "Un tableau de bord suit en direct quelques chiffres clés pour piloter un projet.",
    },
    defi: {
      enonce: "Règle des 70 : à 7 %/an, en combien d'années un capital double-t-il ?",
      correction: "≈ 10 ans (70 ÷ 7).",
    },
  },
  {
    numero: 28,
    semaine: 6,
    badge: "Mesureur d'impact",
    maths: {
      calcul: [
        { q: "(200 − 150) / 200 =", r: "25 %" },
        { q: "(80 − 60) / 80 =", r: "25 %" },
        { q: "10 % de 10000 =", r: "1000" },
        { q: "9 × 9 =", r: "81" },
        { q: "1/4 de 200 =", r: "50" },
      ],
      probleme: {
        enonce: "Ton projet fait passer le gaspillage de 200 à 150 kg. Quelle réduction en % (ton indicateur d'impact) ?",
        correction: "(200 − 150) / 200 = 25 % de réduction.",
      },
      illu: { emoji: "🎯", label: "impact" },
    },
    francais: {
      regleTitre: "Mesurer le succès (indicateurs)",
      regle: "On choisit quelques indicateurs clés (KPI) qui disent vraiment si ça marche.",
      consigne: "Vrai KPI d'impact ou indicateur de vanité ?",
      items: ["« nombre de likes »", "« nombre de personnes réellement aidées »"],
      correction: "vanité — vrai KPI d'impact.",
    },
    mot: {
      mot: "Indicateur (KPI)",
      nature: "expression, méthode",
      definition: "Un chiffre clé qui mesure vraiment le succès ou l'impact d'un projet.",
      exemple: "−25 % de gaspillage : un bon KPI d'impact.",
    },
    geste: {
      titre: "Apprendre en continu (autoformation)",
      texte: "Tutoriels, cours en ligne, projets perso : à l'ère de l'IA, savoir apprendre seul est une super-compétence.",
    },
    defi: {
      enonce: "Faire passer une valeur de 80 à 60 : quelle baisse en % ?",
      correction: "25 %.",
    },
  },
  {
    numero: 29,
    semaine: 6,
    badge: "Presque innovateur",
    maths: {
      calcul: [
        { q: "30 % de 200 =", r: "60" },
        { q: "60 × 365 ≈", r: "21900" },
        { q: "10 % de 10000 =", r: "1000" },
        { q: "300 × 5 =", r: "1500" },
        { q: "2^5 =", r: "32" },
      ],
      probleme: {
        enonce: "Ton idée réduit de 30 % un gaspillage de 200 kg/jour. Combien de kg économisés par jour ? Et par an ?",
        correction: "60 kg/jour (30 % de 200) ; ≈ 21 900 kg/an (60 × 365). Une idée chiffrée devient un projet.",
      },
      illu: { emoji: "🌍", label: "solution chiffrée" },
    },
    francais: {
      regleTitre: "La posture de l'innovateur",
      regle:
        "Curiosité, audace, humilité, éthique et persévérance : l'état d'esprit compte autant que les compétences.",
      consigne: "Quelle qualité ?",
      items: ["oser tester une idée folle", "reconnaître qu'on s'est trompé"],
      correction: "audace — humilité.",
    },
    mot: {
      mot: "Solution chiffrée",
      nature: "expression, méthode",
      definition: "Une idée dont on mesure l'effet par des chiffres : c'est ce qui la rend crédible.",
      exemple: "−30 % de gaspillage = 21 900 kg économisés/an.",
    },
    geste: {
      titre: "Devenir un acteur du changement",
      texte: "On ne subit pas le numérique et le monde : on s'en empare pour créer des solutions utiles.",
    },
    defi: {
      enonce: "Réduire de 10 % une conso annuelle de 10 000 kWh : combien économisé ?",
      correction: "1000 kWh.",
    },
  },
  {
    numero: 30,
    semaine: 6,
    badge: "Inventeur de demain ! 🎓",
    maths: {
      calcul: [
        { q: "11 × 30 =", r: "330" },
        { q: "e^0 + ln(e) =", r: "2" },
        { q: "dérivée de x² en 5 =", r: "10" },
        { q: "2^10 =", r: "1024" },
        { q: "racine de 144 =", r: "12" },
      ],
      probleme: {
        enonce: "Du CE2 au Bac +1, Ti Margo t'a accompagné dans 11 cahiers de 30 jours. Combien de jours d'aventure en tout ?",
        correction: "11 × 30 = 330 jours.",
      },
      illu: { emoji: "🎓", label: "diplôme" },
    },
    francais: {
      regleTitre: "Présenter sa vision : inventer demain",
      regle:
        "Une vision relie un problème réel, une solution créative et un impact mesurable, portés par des valeurs.",
      consigne: "Écris ta vision en 3 phrases : le problème, ton idée, l'impact visé.",
      items: ["(à toi d'inventer !)"],
      correction: "Réponse libre — un problème clair, une idée originale, un chiffre d'impact. Inventer demain commence par l'oser.",
    },
    mot: {
      mot: "Innovation",
      nature: "nom",
      definition: "Une idée nouvelle ET utile, mise en œuvre pour résoudre un vrai problème.",
      exemple: "Du jardin du CE2 à inventer les solutions de demain.",
    },
    geste: {
      titre: "Inventer les solutions de demain",
      texte: "Poser le problème, modéliser, imaginer, prototyper, mesurer : tu as tout le toolkit de l'innovateur. À toi de jouer !",
    },
    defi: {
      enonce: "Quelle est la première étape pour changer le monde ?",
      correction: "Bien poser le problème — puis oser inventer, prototyper, mesurer et persévérer. Le monde a besoin de tes idées !",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Défis ★★★★★ (niveau expert) — problèmes ouverts, estimations de Fermi,    */
/*  énigmes de raisonnement. Pas toujours une réponse unique : la démarche    */
/*  compte autant que le résultat (esprit de l'innovateur).                   */
/* -------------------------------------------------------------------------- */
export const defisExpert: Record<number, { enonce: string; correction: string }> = {
  1: {
    enonce: "Estime combien de pizzas sont mangées en France en un jour. Explique ta démarche (estimation de Fermi).",
    correction: "Ordre de grandeur : ~67 M d'habitants, ~1 pizza/personne/semaine → ~10 M/jour. Toute démarche cohérente est valable : c'est le raisonnement qui compte.",
  },
  2: {
    enonce: "Estime le nombre de professeurs de maths en France. Détaille ton raisonnement.",
    correction: "~12 M d'élèves au secondaire, ~25/classe, un prof voit ~6 classes → ordre de 30 000 à 80 000. L'important est la démarche, pas le chiffre exact.",
  },
  3: {
    enonce: "Une bactérie double chaque heure ; le bocal est plein à minuit. À quelle heure était-il à moitié plein ?",
    correction: "À 23 h : en doublant, il passe de la moitié au plein en une seule heure. (La croissance exponentielle surprend toujours.)",
  },
  4: {
    enonce: "Trois boîtes mal étiquetées (« pommes », « oranges », « mélange »), TOUTES les étiquettes sont fausses. En tirant un seul fruit, peux-tu tout réétiqueter ?",
    correction: "Oui : tire dans « mélange » (forcément fausse, donc pure) ; le fruit obtenu donne son vrai contenu, puis on déduit les deux autres par élimination.",
  },
  5: {
    enonce: "La moyenne de 10 et 10 vaut 10 ; celle de 0 et 20 aussi. Quel indicateur les distingue, et pourquoi ?",
    correction: "L'écart-type (ou l'étendue) : nul pour 10 et 10, grand pour 0 et 20. Il mesure la dispersion que la moyenne cache.",
  },
  6: {
    enonce: "Une voiture fait l'aller à 60 km/h et le retour (même trajet) à 20 km/h. Quelle vitesse moyenne ?",
    correction: "30 km/h (et non 40 !). C'est la moyenne harmonique : pour 60 km, 1 h + 3 h = 4 h pour 120 km → 30 km/h.",
  },
  7: {
    enonce: "Avec 100 m de clôture le long d'une rivière (on ne clôture que 3 côtés), quelle aire rectangulaire maximale ?",
    correction: "1250 m² : 50 m le long de la rivière × 25 m de profondeur (la longueur optimale vaut la moitié de la clôture).",
  },
  8: {
    enonce: "Loi de Moore : ×2 tous les 2 ans. Par combien la puissance est-elle multipliée en 20 ans ?",
    correction: "×1024 (2^10, soit 10 doublements).",
  },
  9: {
    enonce: "Tu lances 3 projets indépendants, chacun réussit avec p = 0,5. Probabilité qu'au moins un réussisse ?",
    correction: "7/8 = 0,875 (1 − 0,5³ = 1 − 1/8).",
  },
  10: {
    enonce: "Un sondage annonce « 60 % ± 3 % ». Que signifie le « ± 3 % » ?",
    correction: "La marge d'erreur : la vraie valeur est probablement entre 57 % et 63 %. Plus l'échantillon est grand, plus cette marge est petite.",
  },
  11: {
    enonce: "Combien de codes à 4 chiffres existe-t-il ? Et à 4 caractères avec chiffres ET lettres (36 symboles) ?",
    correction: "10^4 = 10 000 codes ; et 36^4 = 1 679 616. (D'où l'intérêt de mots de passe longs et variés.)",
  },
  12: {
    enonce: "Tu dois choisir 3 fonctionnalités parmi 5 (l'ordre ne compte pas). Combien de choix possibles ?",
    correction: "10 (le nombre de combinaisons de 3 parmi 5).",
  },
  13: {
    enonce: "À une fête de 10 personnes, chacun trinque une fois avec chacun. Combien de « tchin » ?",
    correction: "45 (10 × 9 / 2).",
  },
  14: {
    enonce: "Trouver un élément dans une liste triée d'un million par dichotomie : combien d'étapes au maximum ?",
    correction: "~20 (2^20 ≈ 1 000 000). La dichotomie est d'une efficacité spectaculaire.",
  },
  15: {
    enonce: "Une transformation double toutes les coordonnées d'une figure. Par combien son aire est-elle multipliée ?",
    correction: "Par 4 (chaque longueur ×2 → aire ×2² = ×4).",
  },
  16: {
    enonce: "Un prototype réduit son erreur de 30 % à chaque itération (×0,7). Après combien d'itérations l'erreur passe-t-elle sous 10 % de l'initiale ?",
    correction: "7 itérations (0,7^7 ≈ 0,082 < 0,1).",
  },
  17: {
    enonce: "Pour estimer π, on lance des points au hasard dans un carré et on compte ceux tombés dans le cercle inscrit. Quelle proportion tombe dans le cercle ?",
    correction: "π/4 ≈ 0,785. C'est la méthode de Monte Carlo : le hasard mesure π !",
  },
  18: {
    enonce: "Tu mesures 3 fois : 9,8 / 10,1 / 10,2. Quelle est ta meilleure estimation, et pourquoi ?",
    correction: "La moyenne ≈ 10,03 : moyenner plusieurs mesures réduit l'erreur aléatoire.",
  },
  19: {
    enonce: "Projet A : coûte 100, rapporte 150. Projet B : coûte 500, rapporte 600. Lequel a le meilleur ROI ?",
    correction: "A : ROI 50 % (50/100), contre B 20 % (100/500). Le plus gros gain n'est pas le meilleur ROI.",
  },
  20: {
    enonce: "Une appli a un coût serveur de 0,01 €/utilisateur. Coût pour 1 million d'utilisateurs ? Viable si chacun rapporte 0,02 € ?",
    correction: "Coût 10 000 € ; recettes 20 000 € → viable (bénéfice 10 000 €).",
  },
  21: {
    enonce: "Une maison consomme 10 000 kWh/an. Un panneau produit 400 kWh/an et coûte 250 €. Coût pour couvrir toute la conso ?",
    correction: "25 panneaux (10 000 ÷ 400), soit 25 × 250 = 6250 €.",
  },
  22: {
    enonce: "Un aller-retour transatlantique en avion émet ≈ 1 tonne de CO2/personne. Le « budget » soutenable est ≈ 2 t/personne/an. Combien de tels trajets épuisent ce budget ?",
    correction: "2 trajets : on atteint déjà la limite annuelle. De quoi inventer des alternatives !",
  },
  23: {
    enonce: "Une rumeur a R0 = 3. Combien de personnes informées en tout après 4 générations (à partir de 1) ?",
    correction: "121 (1 + 3 + 9 + 27 + 81).",
  },
  24: {
    enonce: "Réduire de 25 % une consommation de 600 L/jour : combien d'eau économisée par an ?",
    correction: "150 L/jour × 365 ≈ 54 750 L/an.",
  },
  25: {
    enonce: "La lumière met 8 min du Soleil à la Terre. Combien de temps, environ, pour atteindre Mars (en moyenne ~1,5 fois plus loin) ?",
    correction: "≈ 12 min (8 × 1,5). La distance varie selon les positions des planètes.",
  },
  26: {
    enonce: "Coûts fixes 2000 €, produit vendu 25 € coûtant 5 €. Combien d'unités pour être rentable ? Et pour gagner 1000 € de bénéfice ?",
    correction: "Seuil : 2000 ÷ 20 = 100 unités ; pour +1000 € : 150 unités.",
  },
  27: {
    enonce: "Tu places 1000 € à 6 %/an. Avec la règle des 70, en combien d'années double-t-il ? Vérifie avec 1,06^12.",
    correction: "≈ 12 ans (70 ÷ 6 ≈ 11,7 ; et 1,06^12 ≈ 2,01).",
  },
  28: {
    enonce: "Ton projet aide 50 personnes le 1er mois, puis croît de 20 %/mois. Combien environ au bout de 6 mois ?",
    correction: "≈ 124 (50 × 1,2^5 ≈ 124).",
  },
  29: {
    enonce: "Choisis un Objectif de Développement Durable (eau, énergie, éducation…) et formule une solution + UN chiffre d'impact visé.",
    correction: "Réponse libre — par exemple : « Installer 10 fontaines pour donner accès à l'eau potable à 5000 personnes. » Une vision + un chiffre = un projet.",
  },
  30: {
    enonce: "En une phrase : quelle solution voudrais-tu inventer pour le monde de demain, et comment en mesurer l'impact ?",
    correction: "Réponse libre — l'essentiel : un problème clair, une idée, et un indicateur d'impact. Le monde t'attend.",
  },
};

/* Le carnet de Ti Margo — récit inspirant : d'apprendre à inventer. */
export const carnet: Record<number, string> = {
  1: "Nouvelle aventure, et pas des moindres : après avoir tout appris, il est temps de CRÉER. Cet été, on apprend à inventer les solutions de demain. Première leçon : bien poser le problème. Tu inventes avec moi ?",
  2: "Avant de foncer, je me demande : de quoi les gens ont-ils VRAIMENT besoin ? Écouter, observer… une bonne solution commence toujours par l'empathie.",
  3: "Je vais sur le terrain, j'observe, je questionne. On ne résout bien que les problèmes qu'on a pris le temps de comprendre.",
  4: "Je trie le vrai du faux, les faits des opinions. Raisonner clairement, c'est déjà la moitié du chemin.",
  5: "Trop d'informations ! Je résume en trois points clés. Synthétiser, c'est voir l'essentiel.",
  6: "Je traduis le réel en modèle : une courbe, une équation. Comprendre comment ça évolue, c'est pouvoir agir dessus.",
  7: "Budget limité, temps compté : j'optimise. Faire le maximum avec le minimum, voilà l'art de l'ingénieur.",
  8: "Une petite croissance qui se répète devient énorme : l'exponentielle. Les grandes idées se propagent comme ça.",
  9: "Rien n'est sûr à 100 %. J'évalue les risques, je calcule les chances. Décider, c'est avancer malgré l'incertitude.",
  10: "Je regarde les données avec méfiance : un beau graphique peut mentir. L'esprit critique est mon meilleur outil.",
  11: "Place à l'imagination ! Je note toutes les idées, même les plus folles. La quantité d'abord, le tri ensuite.",
  12: "Et si on retournait le problème ? Penser à l'envers ouvre des portes que personne ne voyait.",
  13: "Je relie des mondes : la nature inspire la technique (le biomimétisme). Les meilleures idées naissent aux croisements.",
  14: "Le problème est énorme ? Je le découpe en petits morceaux. Diviser pour mieux résoudre.",
  15: "Je structure ma solution : un but, des étapes, des moyens. Une idée sans plan reste un rêve.",
  16: "Je fabrique un prototype tout simple, en une journée. Pas besoin qu'il soit parfait : il faut qu'il soit testable !",
  17: "Je teste une hypothèse, je mesure. Ce sont les faits, pas les opinions, qui me disent si j'ai raison.",
  18: "Ça a raté ? Tant mieux : j'ai appris quelque chose. Échouer vite et pas cher, c'est avancer.",
  19: "Je recommence, en mieux. Tester, corriger, recommencer : l'itération est le secret des grandes réussites.",
  20: "Mon idée marche pour 10 personnes. Et pour un million ? Passer à l'échelle, c'est tout repenser.",
  21: "Je m'attaque aux vrais défis : l'énergie. Combien de panneaux solaires pour mon lycée ? Je chiffre, donc j'agis.",
  22: "Le climat en chiffres : chaque litre d'essence, chaque trajet compte. Mesurer, c'est pouvoir réduire.",
  23: "Une épidémie obéit aux maths (le fameux R0). Comprendre, c'est pouvoir protéger.",
  24: "L'eau est précieuse. Je calcule ce qu'on consomme et ce qu'on peut économiser. De petites idées, de grands effets.",
  25: "Je rêve d'espace : distances, vitesses, énergie. Les maths nous emmènent jusqu'aux étoiles.",
  26: "Mon projet doit tenir : qui paie, à quel coût ? Je calcule mon seuil de rentabilité. Une bonne idée doit aussi être viable.",
  27: "Avec un peu d'épargne et des intérêts, je finance mon projet. La patience compose les grandes choses.",
  28: "Je choisis mes indicateurs : pas les « likes », mais les gens vraiment aidés. On mesure ce qui compte vraiment.",
  29: "Je rassemble tout : un problème, une solution, un chiffre d'impact. Mon projet prend forme !",
  30: "Quel chemin, du jardin du CE2 jusqu'à inventer demain ! Tu sais apprendre, raisonner, créer. Le monde a des problèmes immenses — et il a besoin de tes idées. À toi de jouer, inventeur ! Merci d'avoir grandi avec moi : le futur t'appartient ! 🎓",
};

/* « Le savais-tu ? » — inventeurs, méthodes et solutions (local 🌺 / monde 🌍). */
export const leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }> = {
  1: { portee: "monde", texte: "On prête à Einstein l'idée de passer l'essentiel de son temps à bien comprendre le problème, et très peu à le résoudre : poser la bonne question est l'étape clé." },
  2: { portee: "monde", texte: "« Les gens ne veulent pas une perceuse, mais un trou » : cette phrase résume le design — pars du besoin, pas de l'objet." },
  3: { portee: "monde", texte: "Les meilleurs innovateurs passent des heures à observer les usagers avant de concevoir : c'est le « design thinking »." },
  4: { portee: "monde", texte: "Distinguer corrélation et causalité a évité bien des erreurs en médecine, en économie et dans l'IA." },
  5: { portee: "monde", texte: "Savoir résumer une idée complexe en une phrase est une compétence rare et très recherchée." },
  6: { portee: "monde", texte: "Modéliser a permis de prévoir le retour des comètes… et la trajectoire des fusées." },
  7: { portee: "monde", texte: "L'optimisation est partout : itinéraires GPS, réseaux électriques, livraisons, énergie." },
  8: { portee: "monde", texte: "La loi de Moore (puissance des puces ×2 tous les 2 ans) a tenu près de 50 ans : une croissance exponentielle." },
  9: { portee: "monde", texte: "Le calcul des risques est né de l'assurance maritime : on a appris à chiffrer l'incertitude." },
  10: { portee: "monde", texte: "Un graphique dont l'axe ne part pas de zéro peut exagérer une tendance : prudence avec les chiffres !" },
  11: { portee: "monde", texte: "Avec seulement 10 objets, on peut former plus de 3 millions d'ordres différents (10! = 3 628 800)." },
  12: { portee: "monde", texte: "Le Post-it est né d'une colle « ratée » : un échec transformé en invention géniale (pensée latérale)." },
  13: { portee: "local", texte: "À La Réunion, l'étude du corail et des espèces locales inspire des solutions nouvelles (le biomimétisme)." },
  14: { portee: "monde", texte: "Décomposer un problème en sous-problèmes est au cœur de l'informatique : « diviser pour régner »." },
  15: { portee: "monde", texte: "Les matrices font tourner les images 3D des jeux vidéo et structurent les calculs de l'IA." },
  16: { portee: "monde", texte: "Les fusées de SpaceX ont explosé plusieurs fois avant de réussir : itérer, c'est accepter d'échouer pour progresser." },
  17: { portee: "monde", texte: "La méthode de Monte Carlo estime des probabilités en simulant le hasard des milliers de fois." },
  18: { portee: "monde", texte: "James Dyson a réalisé 5 126 prototypes ratés avant son aspirateur : la persévérance paie." },
  19: { portee: "monde", texte: "Améliorer par petites boucles (itérations) est la base des méthodes « agiles » des entreprises tech." },
  20: { portee: "monde", texte: "Passer de 100 à un million d'utilisateurs oblige souvent à tout réécrire : c'est le défi de la scalabilité." },
  21: { portee: "local", texte: "À La Réunion, le solaire et la géothermie sont des pistes pour une île plus autonome en énergie." },
  22: { portee: "monde", texte: "Un aller-retour transatlantique en avion émet environ une tonne de CO2 par passager." },
  23: { portee: "monde", texte: "Le « R0 » d'une maladie dit si une épidémie grandit (R0 > 1) ou s'éteint (R0 < 1)." },
  24: { portee: "local", texte: "La gestion de l'eau est un enjeu majeur à La Réunion, entre saisons sèches et fortes pluies." },
  25: { portee: "monde", texte: "Une sonde spatiale calcule sa trajectoire des années à l'avance, à partir des lois de la physique." },
  26: { portee: "monde", texte: "Beaucoup de start-up échouent non par manque d'idée, mais par manque de modèle économique viable." },
  27: { portee: "monde", texte: "Grâce aux intérêts composés, épargner tôt — même peu — peut financer de grands projets plus tard." },
  28: { portee: "monde", texte: "Choisir les bons indicateurs (KPI) évite de courir après des chiffres trompeurs (les « vanity metrics »)." },
  29: { portee: "monde", texte: "Les 17 Objectifs de Développement Durable de l'ONU listent les grands défis à résoudre d'ici 2030." },
  30: { portee: "monde", texte: "« La meilleure façon de prédire l'avenir, c'est de l'inventer » (Alan Kay). À toi de jouer !" },
};
