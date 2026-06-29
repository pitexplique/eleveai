/* -------------------------------------------------------------------------- */
/*  Données du cahier de vacances « En route vers la 1re » (2nde → 1re géné.). */
/*  Angle fort (demande fondateur) : LA CRÉATIVITÉ EST UNE FORCE POUR CHANGER  */
/*  LE MONDE. Chaque semaine montre que créer / inventer compte en maths, en   */
/*  sciences, en écriture, en art, face aux grands défis — et invite l'élève   */
/*  à imaginer SON projet utile.                                               */
/*  Accroche concrète demandée : la trajectoire d'un ballon (Mbappé au foot,   */
/*  Tony Parker au basket, Antoine Dupont au rugby) est une PARABOLE, donc une */
/*  fonction du SECOND DEGRÉ. → exemple-vedette de la semaine « sciences ».    */
/*  Niveau 2nde : révision + avant-goût de la 1re spé maths (second degré,     */
/*  dérivation, suites, produit scalaire, probas). Gestes = créer avec le      */
/*  numérique de façon responsable. Défis ★★★★★ = ouverts / créatifs (HPI).    */
/*  Moteur d'affichage commun : components/cahier/CahierVacances.tsx.          */
/* -------------------------------------------------------------------------- */

import type { Etape, Jour, MondeDemain } from "@/components/cahier/types";

/** Les 6 terrains de la créativité (un par semaine). */
export const parcours: Etape[] = [
  { semaine: 1, etape: 1, emoji: "🧮", lieu: "La créativité en mathématiques", intro: "L'été créatif commence : en maths, il y a mille chemins à inventer !" },
  { semaine: 2, etape: 2, emoji: "🔬", lieu: "La créativité en sciences", intro: "Modéliser le réel… même la trajectoire d'un ballon de Mbappé !" },
  { semaine: 3, etape: 3, emoji: "✍️", lieu: "La créativité dans l'écriture", intro: "Le bac de français : analyser et écrire avec sa propre voix." },
  { semaine: 4, etape: 4, emoji: "🎨", lieu: "La créativité dans les arts", intro: "Nombre d'or, symétries : quand les maths rencontrent la beauté." },
  { semaine: 5, etape: 5, emoji: "💡", lieu: "La créativité face aux grands défis", intro: "Climat, énergie, santé : créer des solutions pour le monde." },
  { semaine: 6, etape: 6, emoji: "🚀", lieu: "Ton projet pour changer le monde", intro: "Dernière étape : imagine ton projet, puis cap sur la 1re !" },
];

export const jours: Jour[] = [
  /* ===================== SEMAINE 1 · La créativité en mathématiques ===================== */
  {
    numero: 1,
    semaine: 1,
    badge: "Esprit curieux",
    maths: {
      calcul: [
        { q: "25 × 4 =", r: "100" },
        { q: "99 + 99 =", r: "198" },
        { q: "12 × 11 =", r: "132" },
        { q: "17 + 8 =", r: "25" },
        { q: "5 × 5 × 4 =", r: "100" },
      ],
      probleme: {
        enonce: "Calcule 1 + 2 + 3 + … + 10 de façon astucieuse (sans tout additionner un par un).",
        correction: "55. On apparie : 1+10, 2+9, … = 11, et il y a 5 paires : 5 × 11 = 55.",
      },
      illu: { emoji: "🧮", label: "calcul créatif" },
    },
    francais: {
      regleTitre: "Les 4 objets d'étude du bac de français",
      regle:
        "En 1re, on étudie : la poésie, le roman, le théâtre et la littérature d'idées.",
      consigne: "Quel objet d'étude ?",
      items: ["un recueil de poèmes", "une pièce de Molière", "un essai philosophique"],
      correction: "la poésie — le théâtre — la littérature d'idées.",
    },
    mot: {
      mot: "Conjecture",
      nature: "nom, maths",
      definition: "Une conjecture est une idée qu'on pense vraie, mais qu'il reste à démontrer.",
      exemple: "Avant de prouver, le mathématicien conjecture : il imagine.",
    },
    geste: {
      titre: "L'IA comme outil de création",
      texte: "Une IA peut aider à explorer des idées, mais on ne copie pas : on comprend, on vérifie et on crée avec ses propres mots.",
    },
    defi: {
      enonce: "Calcule rapidement 1 + 2 + … + 20.",
      correction: "210 (10 paires de 21).",
    },
  },
  {
    numero: 2,
    semaine: 1,
    badge: "Chercheur de chemins",
    maths: {
      calcul: [
        { q: "x² − 4 =", r: "(x − 2)(x + 2)" },
        { q: "x² − 9 =", r: "(x − 3)(x + 3)" },
        { q: "x² = 16 → x =", r: "4 ou −4" },
        { q: "(x − 1)(x − 2) → racines", r: "1 et 2" },
        { q: "3² + 4² =", r: "25" },
      ],
      probleme: {
        enonce: "L'équation x² − 5x + 6 = 0 se factorise (x − 2)(x − 3) = 0. Quelles sont ses solutions ?",
        correction: "x = 2 ou x = 3 : un produit est nul si l'un des facteurs est nul.",
      },
      illu: { emoji: "✖️", label: "factorisation" },
    },
    francais: {
      regleTitre: "La poésie",
      regle: "La poésie joue avec les sons, les images et le rythme pour créer de l'émotion.",
      consigne: "Quel procédé poétique ?",
      items: ["« la mer, ce miroir d'argent »", "des vers qui riment", "« ô temps ! »"],
      correction: "métaphore — rimes — apostrophe lyrique.",
    },
    mot: {
      mot: "Équation du second degré",
      nature: "expression, maths",
      definition: "Une équation où l'inconnue est au carré : ax² + bx + c = 0.",
      exemple: "x² − 5x + 6 = 0 a pour solutions 2 et 3.",
    },
    geste: {
      titre: "Recouper et vérifier l'information",
      texte: "Une info se confirme en la retrouvant dans plusieurs sources sérieuses et indépendantes.",
    },
    defi: {
      enonce: "Résous (x − 4)(x + 1) = 0.",
      correction: "x = 4 ou x = −1.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    badge: "Briseur d'équations",
    maths: {
      calcul: [
        { q: "x² − 1 = 0 → x =", r: "1 ou −1" },
        { q: "x² − 25 = 0 → x =", r: "5 ou −5" },
        { q: "x² = 0 → x =", r: "0" },
        { q: "racine de 49 =", r: "7" },
        { q: "7 × 7 =", r: "49" },
      ],
      probleme: {
        enonce: "Combien de solutions a l'équation x² + 4 = 0 ? Justifie.",
        correction: "Aucune : un carré est toujours positif ou nul, donc x² + 4 ≥ 4, jamais nul.",
      },
      illu: { emoji: "🟰", label: "racines" },
    },
    francais: {
      regleTitre: "Le roman et ses personnages",
      regle:
        "Le roman raconte une histoire ; le narrateur est une voix créée par l'auteur, même quand il dit « je ».",
      consigne: "Vrai ou faux : le narrateur est toujours l'auteur ?",
      items: ["Le narrateur = l'auteur ?"],
      correction: "Faux : le narrateur est une voix inventée, distincte de l'auteur.",
    },
    mot: {
      mot: "Racine",
      nature: "nom, maths",
      definition: "Une racine d'une équation est une valeur qui la rend vraie (une solution).",
      exemple: "Les racines de x² − 25 = 0 sont 5 et −5.",
    },
    geste: {
      titre: "Citer ses sources",
      texte: "Indiquer d'où vient une idée (auteur, date, lien) est une preuve d'honnêteté et de sérieux.",
    },
    defi: {
      enonce: "Résous x² = 36.",
      correction: "x = 6 ou x = −6.",
    },
  },
  {
    numero: 4,
    semaine: 1,
    badge: "Maître des systèmes",
    maths: {
      calcul: [
        { q: "x + y = 10 et x − y = 2 → x =", r: "6" },
        { q: "… → y =", r: "4" },
        { q: "2x = 12 → x =", r: "6" },
        { q: "x + 5 = 9 → x =", r: "4" },
        { q: "3 × 4 =", r: "12" },
      ],
      probleme: {
        enonce: "Résous le système : x + y = 7 et x − y = 1.",
        correction: "En additionnant les deux : 2x = 8, donc x = 4 ; puis y = 3.",
      },
      illu: { emoji: "🔗", label: "système" },
    },
    francais: {
      regleTitre: "Le théâtre",
      regle: "Au théâtre, tout passe par la parole et la mise en scène (didascalies, registres).",
      consigne: "Comique ou tragique ?",
      items: ["un quiproquo qui fait rire", "un héros condamné par le destin"],
      correction: "comique — tragique.",
    },
    mot: {
      mot: "Système d'équations",
      nature: "expression, maths",
      definition: "Plusieurs équations à résoudre ensemble pour trouver plusieurs inconnues.",
      exemple: "x + y = 7 et x − y = 1 donnent x = 4, y = 3.",
    },
    geste: {
      titre: "La recherche documentaire efficace",
      texte: "On part de mots-clés précis, on compare plusieurs résultats et on privilégie les sources d'autorité.",
    },
    defi: {
      enonce: "Résous : x + y = 8 et x − y = 4.",
      correction: "x = 6, y = 2.",
    },
  },
  {
    numero: 5,
    semaine: 1,
    badge: "Démonstrateur élégant",
    maths: {
      calcul: [
        { q: "3 + 5 =", r: "8" },
        { q: "7 + 9 =", r: "16" },
        { q: "11 + 13 =", r: "24" },
        { q: "5² =", r: "25" },
        { q: "6² =", r: "36" },
      ],
      probleme: {
        enonce: "Conjecture : la somme de deux nombres impairs est-elle toujours paire ? Teste, puis explique.",
        correction: "Oui (3+5=8, 7+9=16…). Un impair s'écrit 2k+1 ; deux impairs : 2k+1 + 2m+1 = 2(k+m+1), un nombre pair.",
      },
      illu: { emoji: "💭", label: "démonstration" },
    },
    francais: {
      regleTitre: "La littérature d'idées",
      regle:
        "Elle défend des idées (essai, fable, conte philosophique) pour faire réfléchir et changer le monde.",
      consigne: "Argumentation directe ou indirecte ?",
      items: ["un conte philosophique de Voltaire", "un discours engagé"],
      correction: "indirecte — directe.",
    },
    mot: {
      mot: "Démonstration",
      nature: "nom, maths",
      definition: "Démontrer, c'est prouver qu'une affirmation est vraie dans tous les cas, pas seulement sur des exemples.",
      exemple: "On démontre que la somme de deux impairs est paire.",
    },
    geste: {
      titre: "Le tableur pour modéliser",
      texte: "Un tableur teste des hypothèses en un instant : on change une valeur, et tout se recalcule.",
    },
    defi: {
      enonce: "La somme de deux nombres pairs est-elle paire ? Justifie.",
      correction: "Oui : 2k + 2m = 2(k + m).",
    },
  },

  /* ===================== SEMAINE 2 · La créativité en sciences (les sportifs !) ===================== */
  {
    numero: 6,
    semaine: 2,
    badge: "Modélisateur du réel",
    maths: {
      calcul: [
        { q: "f(x) = 2x + 3 ; f(4) =", r: "11" },
        { q: "f(0) =", r: "3" },
        { q: "f(x) = −x + 5 ; f(2) =", r: "3" },
        { q: "5 × 6 =", r: "30" },
        { q: "100 − 37 =", r: "63" },
      ],
      probleme: {
        enonce: "Un abonnement coûte C(n) = 5n + 20 (n = nombre de mois). Combien pour 6 mois ?",
        correction: "5 × 6 + 20 = 50. Cinquante euros.",
      },
      illu: { emoji: "📈", label: "modèle" },
    },
    francais: {
      regleTitre: "Les figures de style",
      regle:
        "Métaphore, comparaison, personnification, oxymore, hyperbole, antithèse… elles créent des images.",
      consigne: "Nomme la figure.",
      items: ["« un silence assourdissant »", "« des milliers de soleils »", "« la nature pleure »"],
      correction: "oxymore — hyperbole — personnification.",
    },
    mot: {
      mot: "Modéliser",
      nature: "verbe, maths",
      definition: "Modéliser, c'est décrire une situation réelle par une fonction ou une équation.",
      exemple: "Le coût d'un abonnement : C(n) = 5n + 20.",
    },
    geste: {
      titre: "Créer un graphique qui parle",
      texte: "Le bon graphique (barres, courbe, secteurs) rend une idée claire en un coup d'œil.",
    },
    defi: {
      enonce: "Pour C(n) = 5n + 20, combien de mois pour 70 € ?",
      correction: "10 mois (5n = 50).",
    },
  },
  {
    numero: 7,
    semaine: 2,
    badge: "Dompteur de paraboles",
    maths: {
      calcul: [
        { q: "−5 × 0² + 20 × 0 =", r: "0" },
        { q: "−5 × 4² + 20 × 4 =", r: "0" },
        { q: "−5 × 2² + 20 × 2 =", r: "20" },
        { q: "−5t(t − 4) = 0 → t =", r: "0 ou 4" },
        { q: "20 ÷ 2 =", r: "10" },
      ],
      probleme: {
        enonce: "La trajectoire d'un ballon frappé par Mbappé est une parabole : h(t) = −5t² + 20t (hauteur en m, t en s). À quel instant le ballon retombe-t-il au sol (h = 0) ?",
        correction: "h(t) = −5t(t − 4) = 0 → t = 0 (la frappe) ou t = 4. Le ballon retombe au bout de 4 secondes.",
      },
      illu: { emoji: "⚽", label: "trajectoire de ballon" },
    },
    francais: {
      regleTitre: "Les registres littéraires",
      regle: "Lyrique, épique, tragique, comique, pathétique, satirique, ironique.",
      consigne: "Quel registre ?",
      items: ["se moquer pour critiquer", "exprimer ses sentiments intimes", "émouvoir par le malheur"],
      correction: "satirique — lyrique — pathétique.",
    },
    mot: {
      mot: "Parabole",
      nature: "nom, maths",
      definition: "La parabole est la courbe d'une fonction du second degré (ax² + bx + c).",
      exemple: "La trajectoire d'un ballon est une parabole.",
    },
    geste: {
      titre: "Coder pour créer (Python)",
      texte: "Avec quelques lignes de Python, on peut tracer une parabole, simuler une trajectoire, créer un jeu.",
    },
    defi: {
      enonce: "Quelle hauteur maximale atteint ce ballon ? (le sommet est en t = 2)",
      correction: "h(2) = −5 × 4 + 40 = 20 m.",
    },
  },
  {
    numero: 8,
    semaine: 2,
    badge: "As de la vitesse",
    maths: {
      calcul: [
        { q: "100 m en 10 s = ? m/s", r: "10" },
        { q: "8 × 3 =", r: "24" },
        { q: "90 ÷ 2 =", r: "45" },
        { q: "7 × 8 =", r: "56" },
        { q: "1/2 de 60 =", r: "30" },
      ],
      probleme: {
        enonce: "Au basket, un ballon lancé par Tony Parker part à 8 m/s. Combien de temps pour parcourir 6 m jusqu'au cercle (en ligne droite, simplifié) ?",
        correction: "6 ÷ 8 = 0,75. Trois quarts de seconde.",
      },
      illu: { emoji: "🏀", label: "panier de basket" },
    },
    francais: {
      regleTitre: "Le commentaire littéraire",
      regle:
        "On analyse un texte : un procédé relevé, puis son interprétation (l'effet produit).",
      consigne: "Procédé ou interprétation ?",
      items: ["« l'anaphore de \"je me souviens\" »", "« qui traduit l'obsession du passé »"],
      correction: "procédé — interprétation.",
    },
    mot: {
      mot: "Vitesse moyenne",
      nature: "expression, maths",
      definition: "Vitesse moyenne = distance ÷ durée (en m/s ou km/h).",
      exemple: "100 m en 10 s : 10 m/s, soit 36 km/h.",
    },
    geste: {
      titre: "La pensée algorithmique",
      texte: "Découper un problème en étapes claires, dans l'ordre : c'est penser comme un programmeur.",
    },
    defi: {
      enonce: "Un sprinteur court 100 m en 10 s. Quelle vitesse en km/h ?",
      correction: "36 km/h (10 m/s × 3,6).",
    },
  },
  {
    numero: 9,
    semaine: 2,
    badge: "Lecteur d'évolutions",
    maths: {
      calcul: [
        { q: "100 + 20 % =", r: "120" },
        { q: "× 1,2 = augmentation de", r: "20 %" },
        { q: "× 0,9 = baisse de", r: "10 %" },
        { q: "1,2 × 0,9 =", r: "1,08" },
        { q: "8 × 9 =", r: "72" },
      ],
      probleme: {
        enonce: "Le nombre de licenciés d'un club passe de 200 à 250. Quel est le taux d'évolution en pourcentage ?",
        correction: "(250 − 200) ÷ 200 = 50 ÷ 200 = 0,25 = +25 %.",
      },
      illu: { emoji: "📊", label: "évolution" },
    },
    francais: {
      regleTitre: "La dissertation",
      regle:
        "On répond à une question par un plan argumenté (souvent thèse / antithèse / dépassement).",
      consigne: "Thèse, antithèse ou synthèse ?",
      items: ["« Certes, le roman divertit… »", "« … mais il instruit aussi. »", "« Ainsi, il fait les deux. »"],
      correction: "thèse — antithèse — synthèse.",
    },
    mot: {
      mot: "Taux d'évolution",
      nature: "expression, maths",
      definition: "Taux = (valeur d'arrivée − valeur de départ) ÷ valeur de départ, en pourcentage.",
      exemple: "De 200 à 250 : +25 %.",
    },
    geste: {
      titre: "Créer un visuel",
      texte: "Une infographie claire fait passer une idée mieux qu'un long texte : la forme sert le fond.",
    },
    defi: {
      enonce: "Un prix passe de 80 € à 100 €. Quelle hausse en % ?",
      correction: "+25 %.",
    },
  },
  {
    numero: 10,
    semaine: 2,
    badge: "Voyageur des échelles",
    maths: {
      calcul: [
        { q: "3 × 10^8 (=) chiffres", r: "300000000" },
        { q: "10^6 × 10^3 =", r: "10^9" },
        { q: "1,5 × 10^8 × 2 =", r: "3 × 10^8" },
        { q: "racine de 144 =", r: "12" },
        { q: "9 × 9 =", r: "81" },
      ],
      probleme: {
        enonce: "La vitesse de la lumière est 3 × 10^8 m/s. Quelle distance parcourt-elle en 2 secondes ?",
        correction: "3 × 10^8 × 2 = 6 × 10^8 m (six cents millions de mètres).",
      },
      illu: { emoji: "🔬", label: "échelles" },
    },
    francais: {
      regleTitre: "L'explication linéaire (oral du bac)",
      regle:
        "À l'oral, on explique un texte au fil de sa lecture, en montrant comment il est construit.",
      consigne: "Vrai ou faux : on suit l'ordre du texte ?",
      items: ["L'explication linéaire suit l'ordre du texte ?"],
      correction: "Vrai : on avance pas à pas, mouvement par mouvement.",
    },
    mot: {
      mot: "Ordre de grandeur",
      nature: "expression, maths",
      definition: "L'ordre de grandeur est la puissance de 10 la plus proche d'un nombre.",
      exemple: "La vitesse de la lumière : ordre de grandeur 10^8 m/s.",
    },
    geste: {
      titre: "Le droit d'auteur et les licences",
      texte: "Pour réutiliser une œuvre, on vérifie sa licence (libre ou non) et on cite son auteur.",
    },
    defi: {
      enonce: "Écris 45 000 000 en notation scientifique.",
      correction: "4,5 × 10^7.",
    },
  },

  /* ===================== SEMAINE 3 · La créativité dans l'écriture ===================== */
  {
    numero: 11,
    semaine: 3,
    badge: "Tisseur de suites",
    maths: {
      calcul: [
        { q: "3, 7, 11, 15 → suivant", r: "19" },
        { q: "raison de 3, 7, 11 =", r: "4" },
        { q: "5 + 5 × 3 =", r: "20" },
        { q: "10 − 4 =", r: "6" },
        { q: "7 × 7 =", r: "49" },
      ],
      probleme: {
        enonce: "Une suite : 5, 8, 11, 14… Quelle est sa raison, et son 6e terme ?",
        correction: "Raison +3 (suite arithmétique) ; 6e terme = 5 + 5 × 3 = 20.",
      },
      illu: { emoji: "🔢", label: "suite" },
    },
    francais: {
      regleTitre: "La question de grammaire (oral)",
      regle:
        "À l'oral, on analyse une phrase : nature, fonction, propositions, négation, interrogation.",
      consigne: "Analyse : « Je me demande s'il viendra. »",
      items: ["Quelle est la nature de « s'il viendra » ?"],
      correction: "Une proposition subordonnée interrogative indirecte.",
    },
    mot: {
      mot: "Suite arithmétique",
      nature: "expression, maths",
      definition: "Une suite où l'on ajoute toujours le même nombre (la raison).",
      exemple: "5, 8, 11, 14… : raison +3.",
    },
    geste: {
      titre: "Publier et protéger sa création",
      texte: "En publiant un texte ou une image, on choisit sa licence pour dire ce que les autres ont le droit d'en faire.",
    },
    defi: {
      enonce: "Suite 2, 5, 8, 11… Quel est le 5e terme ?",
      correction: "14.",
    },
  },
  {
    numero: 12,
    semaine: 3,
    badge: "Maître des suites",
    maths: {
      calcul: [
        { q: "2, 6, 18 → suivant", r: "54" },
        { q: "raison de 2, 6, 18 =", r: "3" },
        { q: "2^5 =", r: "32" },
        { q: "3 × 3 × 3 =", r: "27" },
        { q: "100 ÷ 4 =", r: "25" },
      ],
      probleme: {
        enonce: "Une suite : 1, 2, 4, 8… Quelle est sa règle, et son 7e terme ?",
        correction: "On multiplie par 2 (suite géométrique de raison 2) ; 7e terme = 2^6 = 64.",
      },
      illu: { emoji: "📈", label: "croissance" },
    },
    francais: {
      regleTitre: "L'analyse de la phrase",
      regle:
        "Une phrase complexe enchaîne des propositions par juxtaposition, coordination ou subordination.",
      consigne: "Combien de propositions, et comment reliées ?",
      items: ["Il crée, il rature, il recommence.", "Il écrit parce qu'il aime ça."],
      correction: "3 (juxtaposition) — 2 (subordination : parce que).",
    },
    mot: {
      mot: "Suite géométrique",
      nature: "expression, maths",
      definition: "Une suite où l'on multiplie toujours par le même nombre (la raison).",
      exemple: "2, 6, 18, 54… : raison ×3.",
    },
    geste: {
      titre: "Un diaporama qui convainc",
      texte: "Peu de texte, une idée par diapo, des visuels forts : un bon diaporama soutient la parole, il ne la remplace pas.",
    },
    defi: {
      enonce: "Suite 3, 6, 12, 24… Quel est le terme suivant ?",
      correction: "48.",
    },
  },
  {
    numero: 13,
    semaine: 3,
    badge: "Statisticien éclairé",
    maths: {
      calcul: [
        { q: "médiane de 4, 7, 9 =", r: "7" },
        { q: "moyenne de 10, 20, 30 =", r: "20" },
        { q: "étendue de 5 et 18 =", r: "13" },
        { q: "(8 + 12) ÷ 2 =", r: "10" },
        { q: "8 × 8 =", r: "64" },
      ],
      probleme: {
        enonce: "Notes : 8, 11, 12, 14, 15. Donne la médiane et la moyenne.",
        correction: "Médiane = 12 (valeur du milieu) ; moyenne = 60 ÷ 5 = 12.",
      },
      illu: { emoji: "📊", label: "statistiques" },
    },
    francais: {
      regleTitre: "Les propositions subordonnées",
      regle: "Relative, conjonctive complétive, circonstancielle, interrogative indirecte.",
      consigne: "Quel type ?",
      items: ["Le poème que j'écris.", "Je crois qu'il a raison.", "Je me demande pourquoi il part."],
      correction: "relative — complétive — interrogative indirecte.",
    },
    mot: {
      mot: "Quartile",
      nature: "nom, maths",
      definition: "Les quartiles partagent une série rangée en quatre quarts (Q1, médiane, Q3).",
      exemple: "Q1 sépare le premier quart des valeurs.",
    },
    geste: {
      titre: "Collaborer en ligne sur un projet",
      texte: "Plusieurs personnes peuvent écrire le même document ; on se répartit les rôles et on garde une trace des idées.",
    },
    defi: {
      enonce: "Quelle est la médiane de 6, 9, 9, 13, 20 ?",
      correction: "9.",
    },
  },
  {
    numero: 14,
    semaine: 3,
    badge: "Stratège du hasard",
    maths: {
      calcul: [
        { q: "P(pile) =", r: "1/2" },
        { q: "P(2 piles) =", r: "1/4" },
        { q: "P(6 sur un dé) =", r: "1/6" },
        { q: "1/2 × 1/2 =", r: "1/4" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "On lance 2 fois une pièce. Quelle est la probabilité d'obtenir 2 fois pile ?",
        correction: "1/4 (PP parmi PP, PF, FP, FF).",
      },
      illu: { emoji: "🌳", label: "arbre de probabilité" },
    },
    francais: {
      regleTitre: "Négation et interrogation",
      regle:
        "Négation totale (ne… pas) ou partielle (ne… que). Interrogation totale (oui/non) ou partielle (qui, où…).",
      consigne: "Totale ou partielle ?",
      items: ["Viendras-tu ?", "Qui a écrit cela ?"],
      correction: "interrogation totale — interrogation partielle.",
    },
    mot: {
      mot: "Arbre de probabilité",
      nature: "expression, maths",
      definition: "Un schéma qui montre toutes les issues possibles et leurs probabilités.",
      exemple: "Pour 2 pièces : 4 branches (PP, PF, FP, FF).",
    },
    geste: {
      titre: "Gérer les versions d'un projet",
      texte: "On garde « v1 », « v2 »… ou un historique : si on se trompe, on revient en arrière.",
    },
    defi: {
      enonce: "On lance une pièce 2 fois. Probabilité d'au moins un pile ?",
      correction: "3/4 (tous les cas sauf FF).",
    },
  },
  {
    numero: 15,
    semaine: 3,
    badge: "Expérimentateur",
    maths: {
      calcul: [
        { q: "600 × 1/6 ≈", r: "100" },
        { q: "1000 × 1/2 =", r: "500" },
        { q: "1/4 de 200 =", r: "50" },
        { q: "9 × 7 =", r: "63" },
        { q: "racine de 81 =", r: "9" },
      ],
      probleme: {
        enonce: "Sur 600 lancers d'un dé équilibré, environ combien de fois sort le 4 ?",
        correction: "Environ 100 fois (600 × 1/6). Plus il y a de lancers, plus la fréquence s'approche de 1/6.",
      },
      illu: { emoji: "🎲", label: "échantillon" },
    },
    francais: {
      regleTitre: "Les connecteurs et la cohérence",
      regle:
        "Les connecteurs logiques organisent un raisonnement : d'abord, cependant, donc, en effet.",
      consigne: "Quel lien ?",
      items: ["néanmoins", "par conséquent", "de surcroît"],
      correction: "opposition — conséquence — addition.",
    },
    mot: {
      mot: "Échantillon",
      nature: "nom, maths",
      definition: "Un échantillon est un petit groupe étudié pour estimer un comportement plus large.",
      exemple: "Plus l'échantillon est grand, plus l'estimation est fiable.",
    },
    geste: {
      titre: "La veille sur un sujet",
      texte: "Suivre régulièrement un thème qui te passionne (sources fiables) te rend expert peu à peu.",
    },
    defi: {
      enonce: "Sur 1000 lancers d'une pièce, environ combien de piles ?",
      correction: "Environ 500.",
    },
  },

  /* ===================== SEMAINE 4 · La créativité dans les arts ===================== */
  {
    numero: 16,
    semaine: 4,
    badge: "Ami du nombre d'or",
    maths: {
      calcul: [
        { q: "nombre d'or ≈", r: "1,618" },
        { q: "8 + 13 =", r: "21" },
        { q: "13 + 21 =", r: "34" },
        { q: "10 × 1,6 =", r: "16" },
        { q: "5 × 5 =", r: "25" },
      ],
      probleme: {
        enonce: "Un rectangle d'or a une largeur de 10 cm ; sa longueur est largeur × nombre d'or (≈ 1,618). Quelle longueur (arrondie) ?",
        correction: "10 × 1,618 ≈ 16,2 cm.",
      },
      illu: { emoji: "🐚", label: "nombre d'or" },
    },
    francais: {
      regleTitre: "Le lexique et l'étymologie",
      regle:
        "Connaître les racines (grec, latin) éclaire le sens et enrichit l'expression.",
      consigne: "Que signifie la racine ?",
      items: ["créa-", "poï- (du grec)", "graph-"],
      correction: "créer / faire naître — faire / fabriquer — écrire.",
    },
    mot: {
      mot: "Nombre d'or",
      nature: "nom, maths",
      definition: "Un nombre (≈ 1,618) lié à des proportions jugées harmonieuses, présent dans l'art et la nature.",
      exemple: "Le rapport de deux termes de Fibonacci s'en approche.",
    },
    geste: {
      titre: "Distinguer information et opinion",
      texte: "Une information se vérifie (des faits, des chiffres) ; une opinion s'argumente. On ne les confond pas.",
    },
    defi: {
      enonce: "Suite de Fibonacci : 5, 8, 13, 21, … Quel est le terme suivant ?",
      correction: "34 (13 + 21).",
    },
  },
  {
    numero: 17,
    semaine: 4,
    badge: "Géomètre inspiré",
    maths: {
      calcul: [
        { q: "milieu de 2 et 8 =", r: "5" },
        { q: "(1 + 5) ÷ 2 =", r: "3" },
        { q: "3² + 4² =", r: "25" },
        { q: "racine de 25 =", r: "5" },
        { q: "7 × 7 =", r: "49" },
      ],
      probleme: {
        enonce: "Dans un repère, A(1 ; 1) et B(5 ; 4). Quelle est la distance AB ?",
        correction: "AB = racine de ((5 − 1)² + (4 − 1)²) = racine de (16 + 9) = racine de 25 = 5.",
      },
      illu: { emoji: "📐", label: "repère" },
    },
    francais: {
      regleTitre: "La modalisation et le point de vue",
      regle:
        "Modaliser, c'est marquer son jugement (sans doute, hélas, il semble) ; le point de vue oriente le récit.",
      consigne: "Souligne le mot qui modalise.",
      items: ["Ce roman est sans doute un chef-d'œuvre.", "Hélas, le héros échoue."],
      correction: "sans doute — Hélas.",
    },
    mot: {
      mot: "Coordonnées",
      nature: "nom, maths",
      definition: "Dans un repère, un point est repéré par son abscisse (x) et son ordonnée (y).",
      exemple: "A(1 ; 1) a pour abscisse 1 et ordonnée 1.",
    },
    geste: {
      titre: "Repérer les biais d'un algorithme",
      texte: "Un algorithme reflète les données qui l'ont entraîné : il peut reproduire des erreurs ou des injustices. On garde l'œil critique.",
    },
    defi: {
      enonce: "Quel est le milieu de A(0 ; 0) et B(6 ; 8) ?",
      correction: "(3 ; 4).",
    },
  },
  {
    numero: 18,
    semaine: 4,
    badge: "Pilote de vecteurs",
    maths: {
      calcul: [
        { q: "u(2;1) + v(3;4) =", r: "(5 ; 5)" },
        { q: "2 × u(3;1) =", r: "(6 ; 2)" },
        { q: "u(1;0) + v(0;1) =", r: "(1 ; 1)" },
        { q: "5 + 5 =", r: "10" },
        { q: "8 × 6 =", r: "48" },
      ],
      probleme: {
        enonce: "Les vecteurs u(2 ; 3) et v(4 ; 1). Quelles sont les coordonnées de u + v ?",
        correction: "On additionne coordonnée par coordonnée : (2 + 4 ; 3 + 1) = (6 ; 4).",
      },
      illu: { emoji: "➡️", label: "vecteur" },
    },
    francais: {
      regleTitre: "L'énonciation",
      regle:
        "L'énonciation, c'est qui parle, à qui, où et quand : « je », « tu », les marques de temps et de lieu.",
      consigne: "Repère les marques d'énonciation.",
      items: ["« Ici, ce soir, je vous écris. »"],
      correction: "« je » (et « vous ») ; « ici », « ce soir » situent l'énonciation.",
    },
    mot: {
      mot: "Vecteur",
      nature: "nom, maths",
      definition: "Un vecteur représente un déplacement : une direction, un sens et une longueur.",
      exemple: "u(2 ; 3) avance de 2 vers la droite et 3 vers le haut.",
    },
    geste: {
      titre: "L'IA générative : forces et limites",
      texte: "Une IA crée vite (textes, images), mais peut se tromper ou copier : elle inspire, elle ne remplace pas ton jugement.",
    },
    defi: {
      enonce: "u(5 ; 2) + v(−2 ; 3) = ?",
      correction: "(3 ; 5).",
    },
  },
  {
    numero: 19,
    semaine: 4,
    badge: "Danseur du cercle",
    maths: {
      calcul: [
        { q: "cos 0° =", r: "1" },
        { q: "cos 90° =", r: "0" },
        { q: "cos 180° =", r: "−1" },
        { q: "sin 90° =", r: "1" },
        { q: "sin 0° =", r: "0" },
      ],
      probleme: {
        enonce: "Sur le cercle trigonométrique, que valent cos 0°, cos 90° et cos 180° ?",
        correction: "cos 0° = 1 ; cos 90° = 0 ; cos 180° = −1.",
      },
      illu: { emoji: "⭕", label: "cercle trigonométrique" },
    },
    francais: {
      regleTitre: "Créer une image : métaphore et comparaison",
      regle:
        "La comparaison rapproche avec un outil (comme) ; la métaphore sans outil. Une image bien choisie rend l'écriture vivante.",
      consigne: "Comparaison ou métaphore ?",
      items: ["« ses idées, des étoiles filantes »", "« créatif comme un feu d'artifice »"],
      correction: "métaphore — comparaison.",
    },
    mot: {
      mot: "Cercle trigonométrique",
      nature: "expression, maths",
      definition: "Un cercle de rayon 1 où l'on lit le cosinus (en x) et le sinus (en y) d'un angle.",
      exemple: "cos 90° = 0 et sin 90° = 1.",
    },
    geste: {
      titre: "Bien formuler une demande (prompt)",
      texte: "Plus une consigne donnée à une IA est précise (contexte, but, format), meilleur est le résultat.",
    },
    defi: {
      enonce: "Que vaut sin 90° ?",
      correction: "1.",
    },
  },
  {
    numero: 20,
    semaine: 4,
    badge: "Architecte des formes",
    maths: {
      calcul: [
        { q: "axes de symétrie d'un carré =", r: "4" },
        { q: "axes d'un triangle équilatéral =", r: "3" },
        { q: "un tour complet =", r: "360°" },
        { q: "un demi-tour =", r: "180°" },
        { q: "6 × 6 =", r: "36" },
      ],
      probleme: {
        enonce: "Combien d'axes de symétrie possède un hexagone régulier ?",
        correction: "6 axes de symétrie.",
      },
      illu: { emoji: "🔷", label: "transformation" },
    },
    francais: {
      regleTitre: "La versification : créer un rythme",
      regle:
        "Le mètre (alexandrin = 12 syllabes), les rimes et les coupes créent une musique.",
      consigne: "Combien de syllabes pour…",
      items: ["un alexandrin →", "un décasyllabe →", "un octosyllabe →"],
      correction: "12 — 10 — 8.",
    },
    mot: {
      mot: "Transformation",
      nature: "nom, maths",
      definition: "Une transformation déplace une figure : symétrie, translation, rotation.",
      exemple: "L'hexagone régulier a 6 axes de symétrie.",
    },
    geste: {
      titre: "Vérifier ce que produit une IA",
      texte: "Une IA peut inventer des faits avec aplomb : on recoupe toujours ses réponses avec une source fiable.",
    },
    defi: {
      enonce: "Combien d'axes de symétrie a un cercle ?",
      correction: "Une infinité (tout diamètre est un axe).",
    },
  },

  /* ===================== SEMAINE 5 · La créativité face aux grands défis ===================== */
  {
    numero: 21,
    semaine: 5,
    badge: "Explorateur des pentes",
    maths: {
      calcul: [
        { q: "dérivée de x² = 2x ; en 3 →", r: "6" },
        { q: "en 5 →", r: "10" },
        { q: "en 0 →", r: "0" },
        { q: "2 × 4 =", r: "8" },
        { q: "7 × 8 =", r: "56" },
      ],
      probleme: {
        enonce: "Pour f(x) = x², le nombre dérivé en a (la pente de la tangente) vaut 2a. Que vaut-il en 4 ?",
        correction: "2 × 4 = 8.",
      },
      illu: { emoji: "📉", label: "pente" },
    },
    francais: {
      regleTitre: "Écrire un texte argumentatif",
      regle:
        "Une thèse claire, des arguments hiérarchisés, des exemples précis, des connecteurs.",
      consigne: "Argument ou exemple ?",
      items: ["« L'art ouvre l'esprit. »", "« Ainsi, Picasso a réinventé la peinture. »"],
      correction: "argument — exemple.",
    },
    mot: {
      mot: "Nombre dérivé",
      nature: "expression, maths",
      definition: "Le nombre dérivé en un point mesure la vitesse de variation d'une fonction (la pente de la tangente).",
      exemple: "Pour x², le nombre dérivé en 4 vaut 8.",
    },
    geste: {
      titre: "Ton empreinte numérique et Parcoursup",
      texte: "Ce que tu publies aujourd'hui peut compter demain : on soigne son image en ligne dès le lycée.",
    },
    defi: {
      enonce: "Quel est le nombre dérivé de x² en 7 ?",
      correction: "14 (2 × 7).",
    },
  },
  {
    numero: 22,
    semaine: 5,
    badge: "Maître des tangentes",
    maths: {
      calcul: [
        { q: "pente en 2 de x² = 2 × 2 →", r: "4" },
        { q: "f(2) = 2² =", r: "4" },
        { q: "4(x − 2) + 4 = 4x −", r: "4" },
        { q: "3 × 4 =", r: "12" },
        { q: "10 − 6 =", r: "4" },
      ],
      probleme: {
        enonce: "La tangente à la courbe y = x² au point d'abscisse 2 a une pente de 4 et passe par (2 ; 4). Donne son équation.",
        correction: "y = 4(x − 2) + 4 = 4x − 4.",
      },
      illu: { emoji: "📏", label: "tangente" },
    },
    francais: {
      regleTitre: "L'art de l'introduction",
      regle:
        "Une introduction = accroche + présentation du sujet + problématique + annonce du plan.",
      consigne: "Quel élément ?",
      items: ["« La créativité fascine depuis toujours… »", "« Mais à quoi sert-elle vraiment ? »"],
      correction: "accroche — problématique.",
    },
    mot: {
      mot: "Tangente",
      nature: "nom, maths",
      definition: "La tangente est la droite qui « épouse » la courbe en un point ; sa pente est le nombre dérivé.",
      exemple: "Tangente à y = x² en x = 2 : y = 4x − 4.",
    },
    geste: {
      titre: "Construire une identité numérique positive",
      texte: "Partager ses projets, ses passions, ses réussites : on choisit ce qu'on montre de soi en ligne.",
    },
    defi: {
      enonce: "Quelle est la pente de la tangente à y = x² en x = 3 ?",
      correction: "6 (2 × 3).",
    },
  },
  {
    numero: 23,
    semaine: 5,
    badge: "Optimiseur pour la planète",
    maths: {
      calcul: [
        { q: "x(20 − x) max pour x =", r: "10" },
        { q: "10 × 10 =", r: "100" },
        { q: "5 × 5 =", r: "25" },
        { q: "périmètre 20, carré de côté", r: "5" },
        { q: "8 × 8 =", r: "64" },
      ],
      probleme: {
        enonce: "Pour économiser le grillage (et la matière), on cherche le rectangle d'aire maximale ayant un périmètre de 20 m. Quelles dimensions ?",
        correction: "Un carré de 5 m × 5 m, d'aire 25 m². À périmètre fixé, le carré donne toujours l'aire maximale.",
      },
      illu: { emoji: "🌍", label: "optimiser" },
    },
    francais: {
      regleTitre: "L'art de la conclusion",
      regle:
        "Une conclusion = bilan des idées + réponse à la problématique + ouverture.",
      consigne: "Bilan ou ouverture ?",
      items: ["« En somme, la créativité est essentielle. »", "« Et l'IA, sera-t-elle créative un jour ? »"],
      correction: "bilan — ouverture.",
    },
    mot: {
      mot: "Optimisation",
      nature: "nom, maths",
      definition: "Optimiser, c'est trouver le meilleur résultat possible (le plus grand, le plus petit, le moins coûteux).",
      exemple: "À périmètre fixé, le carré a l'aire maximale.",
    },
    geste: {
      titre: "Le numérique au service de la planète",
      texte: "Capteurs, données, modèles aident à économiser l'eau et l'énergie : le numérique peut aider l'écologie.",
    },
    defi: {
      enonce: "Deux nombres ont pour somme 10. Quel est leur produit maximal ?",
      correction: "25, pour 5 et 5.",
    },
  },
  {
    numero: 24,
    semaine: 5,
    badge: "Géomètre des forces",
    maths: {
      calcul: [
        { q: "u(3;0)·v(0;4) = 3×0 + 0×4 =", r: "0" },
        { q: "u(1;2)·v(2;1) = 1×2 + 2×1 =", r: "4" },
        { q: "u(2;0)·v(3;0) = 2×3 =", r: "6" },
        { q: "perpendiculaires → produit =", r: "0" },
        { q: "5 × 5 =", r: "25" },
      ],
      probleme: {
        enonce: "Les vecteurs u(3 ; 0) et v(0 ; 4). Calcule leur produit scalaire u·v = (3 × 0) + (0 × 4). Que peux-tu en déduire ?",
        correction: "u·v = 0 : les deux vecteurs sont perpendiculaires.",
      },
      illu: { emoji: "🧲", label: "forces" },
    },
    francais: {
      regleTitre: "Réécrire pour améliorer",
      regle:
        "Le brouillon n'est jamais la version finale : on relit, on coupe, on précise. Réécrire, c'est créer.",
      consigne: "Améliore : « Le truc était bien. »",
      items: ["« Le truc était bien. » →"],
      correction: "Par exemple : « Cette œuvre, audacieuse et lumineuse, m'a profondément marqué. »",
    },
    mot: {
      mot: "Produit scalaire",
      nature: "expression, maths",
      definition: "Un calcul entre deux vecteurs : u·v = x·x' + y·y'. S'il vaut 0, les vecteurs sont perpendiculaires.",
      exemple: "u(3 ; 0)·v(0 ; 4) = 0.",
    },
    geste: {
      titre: "Mesurer son empreinte numérique écologique",
      texte: "Streaming, stockage, mails consomment de l'énergie : trier et limiter le superflu, c'est un geste pour la planète.",
    },
    defi: {
      enonce: "u(1 ; 2)·v(3 ; 1) = ?",
      correction: "5 (1 × 3 + 2 × 1).",
    },
  },
  {
    numero: 25,
    semaine: 5,
    badge: "Inventeur de modèles",
    maths: {
      calcul: [
        { q: "x + 2x + 3x =", r: "6x" },
        { q: "6x = 36 → x =", r: "6" },
        { q: "2x + 10 = 30 → x =", r: "10" },
        { q: "3 × 7 =", r: "21" },
        { q: "100 − 45 =", r: "55" },
      ],
      probleme: {
        enonce: "Un village plante des arbres : chaque famille en plante x, l'association en plante 50 de plus, total 410. Avec 36 familles, trouve x (mets en équation).",
        correction: "36x + 50 = 410 → 36x = 360 → x = 10 arbres par famille.",
      },
      illu: { emoji: "💡", label: "idée" },
    },
    francais: {
      regleTitre: "Trouver sa voix d'auteur",
      regle:
        "Le style, c'est une voix : le choix des mots, du rythme, des images, propre à chacun.",
      consigne: "Vrai ou faux : bien écrire, c'est imiter parfaitement les autres ?",
      items: ["Bien écrire = imiter ?"],
      correction: "Faux : on s'inspire, mais on cherche sa propre voix, sa créativité.",
    },
    mot: {
      mot: "Mise en équation",
      nature: "expression, maths",
      definition: "Traduire un problème réel par une équation, pour le résoudre.",
      exemple: "« 36 familles, 50 de plus, total 410 » → 36x + 50 = 410.",
    },
    geste: {
      titre: "Un projet utile : l'entrepreneuriat social",
      texte: "Créer une activité qui résout un problème de société (accès à l'eau, à l'école, au tri…), c'est l'entrepreneuriat social.",
    },
    defi: {
      enonce: "Le double d'un nombre, plus 5, égale 25. Quel est ce nombre ?",
      correction: "10.",
    },
  },

  /* ===================== SEMAINE 6 · Ton projet pour changer le monde ===================== */
  {
    numero: 26,
    semaine: 6,
    badge: "Maître du second degré",
    maths: {
      calcul: [
        { q: "x² − 5x + 6 = 0 → x =", r: "2 ou 3" },
        { q: "x² − x − 6 = 0 → x =", r: "3 ou −2" },
        { q: "somme 5, produit 6 →", r: "2 et 3" },
        { q: "racine de 1 =", r: "1" },
        { q: "5 × 5 =", r: "25" },
      ],
      probleme: {
        enonce: "Résous x² − 5x + 6 = 0 (cherche deux nombres de somme 5 et de produit 6).",
        correction: "x = 2 ou x = 3 (car 2 + 3 = 5 et 2 × 3 = 6).",
      },
      illu: { emoji: "✳️", label: "second degré" },
    },
    francais: {
      regleTitre: "Citer et analyser",
      regle:
        "Dans un commentaire, on cite le texte (guillemets) puis on l'analyse, sans paraphraser.",
      consigne: "Citation analysée ou paraphrase ?",
      items: ["« Le poète écrit \"la nuit\", ce qui évoque la peur. »", "« Le poète parle de la nuit. »"],
      correction: "citation analysée — paraphrase (à éviter).",
    },
    mot: {
      mot: "Discriminant",
      nature: "nom, maths",
      definition: "Le discriminant Δ = b² − 4ac dit combien de solutions a une équation du second degré.",
      exemple: "Si Δ > 0, deux solutions ; Δ = 0, une ; Δ < 0, aucune.",
    },
    geste: {
      titre: "Présenter son projet (le pitch)",
      texte: "Un bon pitch dit en 1 minute : le problème, la solution, pour qui, et pourquoi toi. Clair et convaincant.",
    },
    defi: {
      enonce: "Résous x² − 7x + 12 = 0.",
      correction: "x = 3 ou x = 4.",
    },
  },
  {
    numero: 27,
    semaine: 6,
    badge: "Stratège des décisions",
    maths: {
      calcul: [
        { q: "P(rouge ; 3 sur 5) =", r: "3/5" },
        { q: "1 − 3/5 =", r: "2/5" },
        { q: "P(2 dés, somme 7) =", r: "1/6" },
        { q: "6 × 6 =", r: "36" },
        { q: "1/2 de 1/2 =", r: "1/4" },
      ],
      probleme: {
        enonce: "Un projet a 3 chances sur 5 de réussir. Quelle est la probabilité d'échec ?",
        correction: "2/5 (1 − 3/5).",
      },
      illu: { emoji: "🎯", label: "décision" },
    },
    francais: {
      regleTitre: "L'entretien (oral du bac)",
      regle:
        "On présente une œuvre qu'on a aimée, on la justifie, on dialogue. La sincérité et la curiosité comptent.",
      consigne: "Bonne ou mauvaise idée pour l'entretien ?",
      items: ["choisir une œuvre qu'on aime vraiment", "réciter sans l'avoir lue"],
      correction: "bonne idée — mauvaise idée.",
    },
    mot: {
      mot: "Probabilité",
      nature: "nom, maths",
      definition: "La probabilité mesure la chance qu'un événement se produise, entre 0 et 1.",
      exemple: "Réussite 3/5 → échec 2/5.",
    },
    geste: {
      titre: "Financer une idée (le financement participatif)",
      texte: "Une plateforme de financement participatif permet à beaucoup de gens de soutenir un projet utile.",
    },
    defi: {
      enonce: "Une urne : 4 boules vertes, 6 rouges. Quelle est la probabilité de tirer une verte ?",
      correction: "4/10 = 2/5.",
    },
  },
  {
    numero: 28,
    semaine: 6,
    badge: "Bâtisseur d'avenir",
    maths: {
      calcul: [
        { q: "100 × 1,05 =", r: "105" },
        { q: "100 × 1,05² =", r: "110,25" },
        { q: "1,05² =", r: "1,1025" },
        { q: "1000 × 1,1 =", r: "1100" },
        { q: "8 × 9 =", r: "72" },
      ],
      probleme: {
        enonce: "On place 100 € à 5 % par an pour financer un projet. Combien après 2 ans (intérêts composés) ?",
        correction: "100 × 1,05 × 1,05 = 100 × 1,1025 = 110,25 €.",
      },
      illu: { emoji: "💰", label: "intérêts composés" },
    },
    francais: {
      regleTitre: "Révision : la méthode du bac",
      regle:
        "Commentaire, dissertation, explication linéaire, entretien : chacun a sa méthode, mais tous demandent rigueur ET créativité.",
      consigne: "Quelle épreuve ?",
      items: ["analyser un texte au fil de la lecture", "répondre à une question par un plan"],
      correction: "explication linéaire — dissertation.",
    },
    mot: {
      mot: "Intérêts composés",
      nature: "expression, maths",
      definition: "Les intérêts s'ajoutent au capital, puis produisent eux-mêmes des intérêts.",
      exemple: "100 € à 5 % sur 2 ans : 110,25 €.",
    },
    geste: {
      titre: "Mesurer l'impact d'un projet",
      texte: "Un projet utile se mesure : litres d'eau économisés, personnes aidées, CO2 évité. Les chiffres rendent l'impact réel.",
    },
    defi: {
      enonce: "On place 1000 € à 10 % par an. Combien après 1 an ?",
      correction: "1100 €.",
    },
  },
  {
    numero: 29,
    semaine: 6,
    badge: "Presque en 1re",
    maths: {
      calcul: [
        { q: "10 × 10 =", r: "100" },
        { q: "4 × 25 =", r: "100" },
        { q: "5 × 20 =", r: "100" },
        { q: "2 × 50 =", r: "100" },
        { q: "100 ÷ 4 =", r: "25" },
      ],
      probleme: {
        enonce: "Trouve au moins trois façons d'écrire 100 comme produit de deux entiers. (La créativité, c'est explorer plusieurs chemins !)",
        correction: "Par exemple 10 × 10, 4 × 25, 5 × 20, 2 × 50, 1 × 100… Plusieurs solutions sont valables.",
      },
      illu: { emoji: "🧩", label: "plusieurs chemins" },
    },
    francais: {
      regleTitre: "La créativité dans l'écriture",
      regle:
        "Créer, c'est relier des idées que personne n'avait reliées, avec sa propre voix.",
      consigne: "Vrai ou faux : la créativité, ça se travaille ?",
      items: ["La créativité se travaille ?"],
      correction: "Vrai : plus on s'entraîne, on lit, on ose, plus on devient créatif.",
    },
    mot: {
      mot: "Créativité",
      nature: "nom",
      definition: "La créativité, c'est inventer des idées nouvelles et utiles, souvent en reliant des choses inattendues.",
      exemple: "Un même problème, plusieurs solutions : c'est créatif.",
    },
    geste: {
      titre: "Garder son esprit critique",
      texte: "Face à une info, une IA, une pub : on se demande qui parle, dans quel but, avec quelles preuves.",
    },
    defi: {
      enonce: "Donne deux façons différentes d'obtenir 24 avec des nombres et des opérations.",
      correction: "Par exemple 4 × 6, ou 3 × 8, ou 20 + 4. Plusieurs réponses possibles !",
    },
  },
  {
    numero: 30,
    semaine: 6,
    badge: "Prêt pour la 1re ! 🎓",
    maths: {
      calcul: [
        { q: "9 × 30 =", r: "270" },
        { q: "x² − 4 = 0 → x =", r: "2 ou −2" },
        { q: "−5 × 2² + 20 × 2 =", r: "20" },
        { q: "10 paires de 21 =", r: "210" },
        { q: "racine de 169 =", r: "13" },
      ],
      probleme: {
        enonce: "Du CE2 à la 1re, Ti Margo t'a accompagné dans 9 cahiers de 30 jours. Combien de jours d'aventure en tout ?",
        correction: "9 × 30 = 270 jours.",
      },
      illu: { emoji: "🎓", label: "diplôme" },
    },
    francais: {
      regleTitre: "Le grand bilan : un projet créatif",
      regle:
        "Tu as les outils d'analyse ET la liberté de créer. La créativité bien guidée peut changer le monde.",
      consigne: "Écris un court texte (5-6 lignes) qui défend cette idée : « La créativité s'apprend et se travaille. »",
      items: ["(à toi de créer !)"],
      correction: "Réponse libre — une thèse, des arguments, une image forte, ta propre voix. Ose !",
    },
    mot: {
      mot: "Bilan",
      nature: "nom",
      definition: "Faire le bilan, c'est mesurer le chemin parcouru… et imaginer la suite.",
      exemple: "Du jardin du CE2 à la 1re : quel beau voyage, et le plus beau reste à inventer.",
    },
    geste: {
      titre: "Devenir un créateur numérique responsable",
      texte: "Créer, vérifier, citer, respecter, protéger la planète : tu as tout pour inventer un monde meilleur. À toi de jouer !",
    },
    defi: {
      enonce: "Imagine un problème du monde (climat, eau, santé…) et la question mathématique qu'il faudrait résoudre pour aider.",
      correction: "Réponse libre — par exemple : « Combien de panneaux solaires pour alimenter mon lycée ? » La créativité commence par poser les bonnes questions.",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Défis ★★★★★ (niveau expert) — ouverts, créatifs et exigeants (HPI lycée). */
/*  Plusieurs ont plusieurs solutions : la créativité est valorisée.          */
/* -------------------------------------------------------------------------- */
export const defisExpert: Record<number, { enonce: string; correction: string }> = {
  1: {
    enonce: "Calcule 1 + 2 + 3 + … + 100. Trouve une méthode astucieuse, comme le petit Gauss à 7 ans.",
    correction: "5050. On apparie 1+100, 2+99… = 101, et il y a 50 paires : 50 × 101 = 5050.",
  },
  2: {
    enonce: "Deux nombres ont pour somme 10. Quel est leur produit maximal, et pour quelles valeurs ?",
    correction: "25, pour 5 et 5. (Le produit x(10 − x) est maximal au milieu.)",
  },
  3: {
    enonce: "Combien de solutions ont les équations x² = −4, x² = 0 et x² = 9 ?",
    correction: "x² = −4 : aucune ; x² = 0 : une (x = 0) ; x² = 9 : deux (x = 3 ou −3).",
  },
  4: {
    enonce: "Résous le système : 2x + y = 11 et x + y = 7.",
    correction: "En soustrayant : x = 4 ; puis y = 3.",
  },
  5: {
    enonce: "Montre que le carré d'un nombre impair est toujours impair.",
    correction: "(2k + 1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, qui est impair.",
  },
  6: {
    enonce: "Une fonction affine passe par (0 ; 3) et (2 ; 7). Donne f(x), et le point où elle coupe l'axe des abscisses.",
    correction: "f(x) = 2x + 3 ; elle coupe l'axe des x en x = −1,5.",
  },
  7: {
    enonce: "Un lancer de Tony Parker au basket suit h(t) = −5t² + 10t + 2 (m). De quelle hauteur le ballon part-il (t = 0), et où est-il à t = 1 s ?",
    correction: "Départ : h(0) = 2 m (les mains du joueur) ; à t = 1 : −5 + 10 + 2 = 7 m.",
  },
  8: {
    enonce: "Un sprinteur fait 200 m en 20 s, un autre 100 m en 11 s. Lequel court le plus vite ? (attention au piège !)",
    correction: "Le 1er : 10 m/s, contre 100 ÷ 11 ≈ 9,1 m/s. Plus court ne veut pas dire plus rapide !",
  },
  9: {
    enonce: "Un prix augmente de 25 % puis baisse de 20 %. Quelle est la variation globale ?",
    correction: "0 % : on retrouve le prix de départ. (× 1,25 × 0,8 = 1.)",
  },
  10: {
    enonce: "Le Soleil pèse environ 2 × 10^30 kg, la Terre environ 6 × 10^24 kg. Combien de fois le Soleil est-il plus lourd ?",
    correction: "Environ 3,3 × 10^5, soit à peu près 330 000 fois.",
  },
  11: {
    enonce: "Une suite arithmétique a pour premier terme 5 et pour raison 4. Que vaut son 20e terme ?",
    correction: "u20 = 5 + 19 × 4 = 81.",
  },
  12: {
    enonce: "Une feuille de 0,1 mm d'épaisseur est pliée en deux 10 fois (suite géométrique de raison 2). Quelle épaisseur ?",
    correction: "Environ 10 cm. (0,1 × 2^10 = 0,1 × 1024 ≈ 102 mm.)",
  },
  13: {
    enonce: "La moyenne de 5 notes est 12. Quelle 6e note pour que la moyenne monte à 13 ?",
    correction: "18. (Le total doit passer de 60 à 78.)",
  },
  14: {
    enonce: "On lance 3 pièces. Quelle est la probabilité d'obtenir exactement 2 piles ?",
    correction: "3/8. (PPF, PFP, FPP sur 8 issues possibles.)",
  },
  15: {
    enonce: "Dans une classe de 30 élèves, est-il sûr que deux aient leur anniversaire le même mois ? Justifie.",
    correction: "Oui, c'est certain : 30 élèves pour 12 mois → au moins deux partagent un mois (principe des tiroirs).",
  },
  16: {
    enonce: "Deux termes consécutifs de Fibonacci : 21 et 34. Calcule 34 ÷ 21. De quel nombre célèbre s'approche-t-on ?",
    correction: "≈ 1,619, très proche du nombre d'or (≈ 1,618).",
  },
  17: {
    enonce: "Dans un repère, A(1 ; 2), B(4 ; 6). Calcule la longueur AB.",
    correction: "5. (racine de (3² + 4²) = racine de 25.)",
  },
  18: {
    enonce: "Trois points : A(0 ; 0), B(4 ; 0), C(0 ; 3). Quelle est l'aire du triangle ABC ?",
    correction: "6. (base 4 × hauteur 3 ÷ 2.)",
  },
  19: {
    enonce: "Sur le cercle trigonométrique, pour quel angle entre 0° et 180° a-t-on cos = 0 ?",
    correction: "90°.",
  },
  20: {
    enonce: "Un flocon a 6 axes de symétrie. Combien de fois se superpose-t-il à lui-même en un tour complet par rotation ?",
    correction: "6 fois (tous les 60°).",
  },
  21: {
    enonce: "Pour f(x) = x², en quel point la tangente est-elle horizontale (pente nulle) ?",
    correction: "En x = 0, le sommet de la parabole.",
  },
  22: {
    enonce: "La tangente à y = x² en x = 3 a pour pente 6 et passe par (3 ; 9). Où coupe-t-elle l'axe des abscisses ?",
    correction: "Son équation est y = 6x − 9 ; elle coupe l'axe en x = 1,5.",
  },
  23: {
    enonce: "Avec 40 m de grillage et un mur sur un côté (on grille 3 côtés), quelle est l'aire maximale d'un enclos rectangulaire ?",
    correction: "200 m² (20 m le long du mur × 10 m de profondeur).",
  },
  24: {
    enonce: "Deux vecteurs u(2 ; 3) et v(3 ; −2). Calcule u·v. Que peux-tu en déduire ?",
    correction: "u·v = 6 − 6 = 0 : les vecteurs sont perpendiculaires.",
  },
  25: {
    enonce: "La somme de trois entiers consécutifs vaut 72. Lesquels ? Et trois entiers PAIRS consécutifs valant 72 ?",
    correction: "23, 24, 25 ; et 22, 24, 26.",
  },
  26: {
    enonce: "Résous x² − 5x + 6 = 0, puis x² + x − 6 = 0.",
    correction: "{2 ; 3} ; et {2 ; −3}.",
  },
  27: {
    enonce: "Un test détecte une maladie très rare. Un résultat positif est-il forcément fiable ? Réfléchis.",
    correction: "Non : si la maladie est très rare, beaucoup de « positifs » sont en fait des faux positifs. C'est l'idée des probabilités conditionnelles.",
  },
  28: {
    enonce: "On place 1000 € à 10 % par an. Au bout de combien d'années la somme dépasse-t-elle 1300 € ?",
    correction: "3 ans (1000 → 1100 → 1210 → 1331).",
  },
  29: {
    enonce: "Trouve trois façons différentes d'atteindre exactement 100 en n'utilisant que des sauts de +10 et de +25.",
    correction: "Par exemple : dix fois +10 ; quatre fois +25 ; ou +25 +25 +10 +10 +10 +10 +10. Plusieurs chemins valables !",
  },
  30: {
    enonce: "Imagine un défi du monde réel (climat, eau, santé, énergie…) et formule UNE question mathématique qu'il faudrait résoudre pour aider. (Pas de réponse unique !)",
    correction: "Réponse libre — par exemple : « Combien d'arbres planter pour absorber le CO2 de ma ville ? » Bien poser le problème, c'est déjà commencer à le résoudre.",
  },
};

/* Le carnet de Ti Margo — récit inspirant : créer pour changer le monde. */
export const carnet: Record<number, string> = {
  1: "Voici la dernière aventure, et la plus inspirante : explorer la créativité, cette force qui permet d'inventer, d'imaginer… et de changer le monde. On commence par les maths. Tu crées avec moi ?",
  2: "En maths, il y a souvent plusieurs chemins vers la solution. Choisir le plus élégant, c'est déjà créer ! Résoudre, c'est inventer.",
  3: "Je « casse » une équation en deux morceaux : (x − 2)(x − 3). Comme un magicien qui démonte son tour. Quelle satisfaction !",
  4: "Deux équations, deux inconnues, et hop, je démêle tout. J'adore quand les pièces s'emboîtent parfaitement.",
  5: "Je fais une conjecture, puis je la démontre. Deviner, c'est créatif ; prouver, c'est rigoureux. Les deux ensemble : magique.",
  6: "Les maths décrivent le réel : un coût, une distance, une croissance. Modéliser, c'est traduire la vie en équations.",
  7: "Incroyable : quand Mbappé frappe le ballon, sa trajectoire dessine une parabole — une fonction du second degré ! Le sport cache des maths.",
  8: "Pareil pour Tony Parker au basket et Antoine Dupont au rugby : leurs ballons suivent des courbes que je sais calculer. Le terrain devient un cahier géant !",
  9: "Je calcule l'évolution d'un club, en pourcentage. Les nombres racontent des histoires de progrès.",
  10: "Du Soleil à l'atome, je manie des nombres immenses et minuscules. La science aussi est une grande création de l'esprit.",
  11: "Une suite de nombres, c'est un motif, un rythme. 5, 8, 11, 14… j'entends presque la musique des maths.",
  12: "Une suite qui double sans cesse grimpe à une vitesse folle. Petite graine, grande forêt : tout commence petit.",
  13: "Je range des données, je calcule médiane et moyenne. Mettre de l'ordre dans le réel, c'est le début de la décision juste.",
  14: "Avec un arbre de probabilités, j'imagine tous les possibles. Anticiper, c'est déjà préparer l'avenir.",
  15: "Plus je fais d'essais, plus la fréquence s'approche de la probabilité. La patience révèle les lois cachées.",
  16: "Le nombre d'or se cache dans les coquillages, les fleurs, les tableaux ! La nature et l'art partagent les mêmes secrets.",
  17: "Je place des points, je mesure des distances. La géométrie, c'est dessiner avec des nombres.",
  18: "Avec des vecteurs, je donne une direction à mes idées. Avancer, c'est choisir un cap.",
  19: "Le cercle trigonométrique tourne, et le cosinus danse de 1 à −1. Tant de beauté dans un simple cercle.",
  20: "Symétries, rotations : l'art et les maths construisent l'harmonie ensemble.",
  21: "Je découvre la dérivée : la vitesse du changement. Comprendre comment les choses évoluent, c'est essentiel pour agir.",
  22: "Je trace une tangente : la direction de l'instant. Savoir où l'on va, même un instant, ça compte.",
  23: "J'optimise : faire mieux avec moins. Économiser la matière, l'énergie, le CO2… les maths peuvent protéger la planète !",
  24: "Le produit scalaire me dit si deux forces vont ensemble ou se contrent. Comprendre les forces, c'est pouvoir les guider.",
  25: "Je transforme un problème réel en équation : planter des arbres, partager l'eau. Les maths au service des autres, voilà qui me passionne.",
  26: "Le second degré n'a plus de secret. Avec ces outils, je peux modéliser presque tout ce qui m'entoure.",
  27: "Je calcule des risques, des chances. Décider, ce n'est pas deviner : c'est créer avec lucidité.",
  28: "Avec les intérêts composés, je vois comment une petite épargne finance un grand projet. Patience et stratégie !",
  29: "Un même problème, plein de chemins : c'est ça, la créativité. Oser explorer, oser se tromper, recommencer.",
  30: "Quel voyage, du jardin du CE2 jusqu'ici ! J'ai appris à calculer, à écrire, à créer. Maintenant, à toi : invente, ose, et sers-toi de tout ça pour changer un peu le monde. Merci d'avoir créé avec moi — et le plus beau reste à inventer ! 🎓",
};

/* « Le savais-tu ? » — créateurs et idées qui changent le monde (local 🌺 / monde 🌍). */
export const leSaviasTu: Record<number, { portee: "local" | "monde"; texte: string }> = {
  1: { portee: "monde", texte: "Les plus grandes découvertes naissent souvent d'une idée folle au départ : la créativité, c'est oser penser autrement." },
  2: { portee: "monde", texte: "Le petit Gauss, à 7 ans, aurait additionné 1 + 2 + … + 100 en quelques secondes grâce à une astuce : la créativité bat le calcul brut !" },
  3: { portee: "monde", texte: "Résoudre des équations, c'est ce que font les ingénieurs pour bâtir des ponts, des fusées et des hôpitaux." },
  4: { portee: "monde", texte: "Les systèmes d'équations servent à optimiser presque tout : trajets, énergie, production." },
  5: { portee: "monde", texte: "En maths, rien n'est vrai tant qu'on ne l'a pas démontré : c'est l'école de l'esprit critique." },
  6: { portee: "local", texte: "Modéliser sert à La Réunion pour prévoir les cyclones et gérer l'eau et l'énergie de l'île." },
  7: { portee: "monde", texte: "La trajectoire d'un tir de Mbappé au football est une parabole : exactement la courbe d'une fonction du second degré !" },
  8: { portee: "monde", texte: "Au basket (Tony Parker) comme au rugby (Antoine Dupont), le ballon suit une parabole. Le sport, c'est des maths en mouvement !" },
  9: { portee: "monde", texte: "Comprendre les pourcentages, c'est savoir lire le monde : économie, climat, santé, élections." },
  10: { portee: "monde", texte: "Marie Curie, deux fois prix Nobel, a transformé la science et la médecine par sa curiosité et son audace." },
  11: { portee: "monde", texte: "Les suites modélisent la croissance d'une population, d'une épargne… ou la propagation d'une idée." },
  12: { portee: "monde", texte: "Une croissance qui double sans cesse explique aussi bien les réseaux sociaux que la diffusion d'une innovation." },
  13: { portee: "monde", texte: "Les statistiques aident à mieux décider : en médecine, elles sauvent des vies chaque jour." },
  14: { portee: "monde", texte: "Les probabilités, nées des jeux de dés, servent aujourd'hui à la météo, la finance et l'intelligence artificielle." },
  15: { portee: "monde", texte: "Plus un échantillon est grand, plus il est fiable : c'est la base des sondages et des essais scientifiques." },
  16: { portee: "monde", texte: "Le nombre d'or se retrouve dans le Parthénon, les œuvres de Léonard de Vinci et les coquillages : maths et beauté réunies." },
  17: { portee: "monde", texte: "La géométrie dans un repère fait fonctionner les GPS, les jeux vidéo et la robotique." },
  18: { portee: "monde", texte: "Les vecteurs décrivent les forces et les vitesses : indispensables en physique, en aviation, en animation 3D." },
  19: { portee: "monde", texte: "La trigonométrie a permis de mesurer la Terre, puis la distance des étoiles, bien avant les fusées." },
  20: { portee: "local", texte: "Les artistes de La Réunion mêlent symétries et couleurs créoles dans les cases, les tissus et le street art." },
  21: { portee: "monde", texte: "La dérivée mesure la vitesse du changement : elle aide à comprendre la fonte des glaces ou la croissance d'une maladie." },
  22: { portee: "monde", texte: "Newton et Leibniz ont inventé le calcul des dérivées il y a plus de 300 ans : une révolution pour toute la science." },
  23: { portee: "monde", texte: "Optimiser, c'est faire mieux avec moins : moins d'énergie, moins de gaspillage. Les maths sont une alliée de l'écologie." },
  24: { portee: "monde", texte: "Le produit scalaire sert en physique, en robotique, et même en IA pour « mesurer » des ressemblances." },
  25: { portee: "monde", texte: "Mettre un problème en équation, c'est la première étape pour le résoudre : ainsi s'attaque-t-on aux défis du monde." },
  26: { portee: "monde", texte: "Le second degré décrit les trajectoires, les ponts suspendus, les antennes paraboliques… et les tirs de Mbappé !" },
  27: { portee: "monde", texte: "Bien évaluer un risque est essentiel en médecine, en sécurité et pour oser entreprendre." },
  28: { portee: "monde", texte: "Comprendre les intérêts composés aide à épargner, à investir… et à financer un projet qui aide les autres." },
  29: { portee: "local", texte: "De jeunes Réunionnais créent des projets pour le tri des déchets, l'énergie solaire ou l'aide aux aînés : la créativité change déjà l'île." },
  30: { portee: "monde", texte: "Albert Einstein disait : « L'imagination est plus importante que le savoir. » En 1re et au-delà, ose imaginer le monde de demain !" },
};

/* « Comprendre le monde » — un thème par jour (Histoire des inventions / Écologie /
   Futur), calé sur l'arc de la créativité qui change le monde. Niveau 1re. */
export const mondeDemain: Record<number, MondeDemain> = {
  // Semaine 1 — la créativité en mathématiques (les grandes idées)
  1: { theme: "histoire", titre: "Le zéro, une invention", texte: "Le zéro, qui nous semble évident, fut une révolution née en Inde au Vᵉ siècle : sans lui, ni informatique, ni calcul moderne ne seraient possibles.", question: "Quelle idée « évidente » d'aujourd'hui pourrait avoir tout changé en son temps ?" },
  2: { theme: "ecologie", titre: "Calculer pour le climat", texte: "Modéliser la hausse des températures repose sur des équations : les mathématiques sont devenues une arme essentielle contre le dérèglement climatique.", question: "En quoi un bon modèle mathématique peut-il aider à protéger la planète ?" },
  3: { theme: "futur", titre: "L'intelligence artificielle", texte: "Derrière chaque IA se cachent des fonctions et des probabilités : comprendre les maths, c'est garder la main sur les outils qui façonnent demain.", question: "Préfères-tu subir une technologie ou la comprendre pour mieux la guider ?" },
  4: { theme: "histoire", titre: "L'imprimerie de Gutenberg", texte: "Vers 1450, l'imprimerie a permis de copier les idées par milliers : une invention créative qui a diffusé le savoir dans tout le monde.", question: "Quelle invention récente diffuse les idées aussi vite aujourd'hui ?" },
  5: { theme: "ecologie", titre: "L'économie circulaire", texte: "Plutôt que jeter, on répare, on recycle, on réutilise : repenser tout un système de production, c'est de la créativité au service de la Terre.", question: "Quel objet du quotidien pourrais-tu réparer plutôt que remplacer ?" },

  // Semaine 2 — la créativité en sciences
  6: { theme: "futur", titre: "Les énergies marines", texte: "À La Réunion, on imagine produire de l'électricité grâce à la chaleur et aux courants de l'océan : une énergie propre et quasi inépuisable.", question: "Quelle ressource naturelle de ton île reste encore à exploiter intelligemment ?" },
  7: { theme: "histoire", titre: "Newton et la gravité", texte: "En comprenant que la même force fait tomber une pomme et tient la Lune, Newton a inventé une physique qui décrit aussi la trajectoire d'un ballon.", question: "Pourquoi relier deux phénomènes éloignés est-il un acte créatif ?" },
  8: { theme: "ecologie", titre: "Le sport bas carbone", texte: "Stades alimentés au solaire, équipements recyclés : le sport de demain cherche à réduire son empreinte sans rien perdre de la performance.", question: "Comment un grand évènement sportif pourrait-il polluer moins ?" },
  9: { theme: "futur", titre: "Les capteurs partout", texte: "Des capteurs mesurent en direct l'air, l'eau ou le trafic ; ces données, bien analysées, permettent d'inventer des villes plus vivables.", question: "Quelle donnée de ta ville aimerais-tu mesurer pour l'améliorer ?" },
  10: { theme: "histoire", titre: "Mesurer la lumière", texte: "Déterminer la vitesse de la lumière a demandé des siècles d'ingéniosité ; cette quête a ouvert la voie à la relativité et à la physique moderne.", question: "Pourquoi une mesure très précise peut-elle changer toute une science ?" },

  // Semaine 3 — la créativité dans l'écriture
  11: { theme: "ecologie", titre: "Écrire pour alerter", texte: "Des récits et des essais ont éveillé les consciences sur la nature ; bien écrire reste l'un des moyens les plus puissants de changer les regards.", question: "Un texte t'a-t-il déjà fait changer d'avis sur un sujet ?" },
  12: { theme: "futur", titre: "Écrire avec l'IA", texte: "Les IA génèrent désormais des textes en quelques secondes ; à toi d'en faire un outil de création, sans jamais y abandonner ta propre voix.", question: "Où s'arrête l'aide d'une machine et où commence ta créativité ?" },
  13: { theme: "histoire", titre: "Des chiffres qui parlent", texte: "Dès le XIXᵉ siècle, présenter les données sous forme de graphiques a aidé à convaincre les gouvernants d'agir, notamment en santé publique.", question: "Pourquoi un bon graphique convainc-il parfois mieux qu'un long discours ?" },
  14: { theme: "ecologie", titre: "La langue de la nature", texte: "Décrire précisément un écosystème, nommer les espèces, c'est déjà les protéger : on ne défend bien que ce que l'on sait nommer.", question: "Connais-tu le nom d'une espèce menacée près de chez toi ?" },
  15: { theme: "futur", titre: "Vérifier l'information", texte: "Face au flot de contenus et de fausses nouvelles, savoir recouper ses sources devient une compétence clé du citoyen de demain.", question: "Quel réflexe adoptes-tu avant de croire une information en ligne ?" },

  // Semaine 4 — la créativité dans les arts
  16: { theme: "histoire", titre: "Le nombre d'or des artistes", texte: "Du Parthénon à Léonard de Vinci, des créateurs ont cherché des proportions harmonieuses : preuve que maths et beauté avancent souvent ensemble.", question: "Une règle mathématique peut-elle vraiment guider la beauté ?" },
  17: { theme: "ecologie", titre: "L'art avec ce qu'on jette", texte: "Des artistes transforment déchets et plastiques en œuvres puissantes pour interpeller sur la pollution : la création donne une seconde vie à la matière.", question: "Quel déchet pourrais-tu transformer en objet utile ou beau ?" },
  18: { theme: "futur", titre: "L'art génératif", texte: "Avec quelques lignes de code, on crée aujourd'hui images, musiques et animations : programmer devient un nouveau pinceau pour les artistes.", question: "Coderais-tu une œuvre, ou préfères-tu la créer à la main ?" },
  19: { theme: "histoire", titre: "La perspective", texte: "À la Renaissance, des peintres ont inventé la perspective grâce à la géométrie, donnant l'illusion de la profondeur sur une toile plate.", question: "Comment une découverte technique peut-elle révolutionner un art ?" },
  20: { theme: "ecologie", titre: "Les symétries du vivant", texte: "Fleurs, coquillages, flocons : la nature regorge de symétries que l'art imite ; s'en inspirer, c'est créer en respectant le monde vivant.", question: "Quelle forme de la nature t'inspirerait pour créer un objet ?" },

  // Semaine 5 — la créativité face aux grands défis
  21: { theme: "futur", titre: "Optimiser l'énergie", texte: "La dérivée sert à trouver le meilleur réglage d'un moteur ou d'un panneau solaire : optimiser, c'est obtenir plus en consommant moins.", question: "Où, dans ta vie, pourrais-tu obtenir mieux avec moins de moyens ?" },
  22: { theme: "histoire", titre: "Soigner par la science", texte: "Vaccins et antibiotiques, fruits d'une recherche créative et tenace, ont sauvé des centaines de millions de vies au cours du dernier siècle.", question: "Pourquoi la persévérance compte-t-elle autant que l'idée de départ ?" },
  23: { theme: "ecologie", titre: "Faire mieux avec moins", texte: "Optimiser un emballage, une tournée de livraison ou un réseau d'eau permet d'économiser matière et énergie : les maths sont une alliée de l'écologie.", question: "Quel gaspillage du quotidien aimerais-tu réduire par une idée simple ?" },
  24: { theme: "futur", titre: "Les métiers de demain", texte: "Ingénieur en énergies propres, data scientist, bioinformaticien : beaucoup des métiers de 2040 mêleront sciences, créativité et utilité sociale.", question: "Quel métier 'utile au monde' aimerais-tu inventer ou exercer ?" },
  25: { theme: "histoire", titre: "L'eau, défi de toujours", texte: "Aqueducs romains, puits, barrages : amener l'eau a toujours stimulé l'ingéniosité humaine, un défi encore brûlant à La Réunion comme ailleurs.", question: "Comment apporterais-tu de l'eau potable à un village isolé ?" },

  // Semaine 6 — ton projet pour changer le monde
  26: { theme: "ecologie", titre: "Modéliser pour décider", texte: "Le second degré décrit des trajectoires, mais aussi des courbes de pollution ou de coût : bien modéliser, c'est mieux décider pour la planète.", question: "Quel problème de ton île aimerais-tu mettre en équation ?" },
  27: { theme: "futur", titre: "Décider sous incertitude", texte: "Lancer un projet, c'est accepter une part de hasard ; les probabilités aident à choisir lucidement plutôt qu'à parier à l'aveugle.", question: "Comment évalues-tu un risque avant de te lancer dans un projet ?" },
  28: { theme: "histoire", titre: "L'entrepreneuriat social", texte: "Des pionniers ont prouvé qu'on peut créer une activité rentable ET utile : microcrédit, accès à l'eau, à l'école… changer le monde devient un métier.", question: "Quelle activité créerais-tu pour résoudre un problème de société ?" },
  29: { theme: "ecologie", titre: "Mesurer son impact", texte: "Litres d'eau économisés, tonnes de CO₂ évitées, personnes aidées : chiffrer son projet le rend crédible et montre qu'il change vraiment les choses.", question: "Par quel chiffre prouverais-tu que ton idée est utile ?" },
  30: { theme: "futur", titre: "Le monde de demain, c'est toi", texte: "Tu as désormais les outils pour analyser le réel ET la liberté de créer : la créativité bien guidée est ta force pour inventer un monde meilleur.", question: "Quel défi du monde rêves-tu de relever dans ta vie ?" },
};
